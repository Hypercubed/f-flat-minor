#!/usr/bin/env python3
"""Generate Lean proofs from an .ff file with @effect comments.

Usage:  python3 generate.py in.ff [out.lean]
        python3 generate.py --stdin [out.lean] < flattened.ff
        python3 generate.py in.ff | lean --stdin

A pure translator: it parses, inlines, and emits Lean. It runs no
tests and has no interpreter of its own. The full manual (notation,
scope, IO, where/when, the proof ladder) is in HELP.md; the
user-facing guide is README.md; the design and phases are PLAN.md.
The Lean interpreter and prover live in Fbm/Interp.lean and
Fbm/Prover.lean (generated files import Fbm.Prover).
"""
import re, sys
from dataclasses import dataclass, field
from pathlib import Path

def _rename_ast_vars(ast, mapping):
    """(v36) Rename the variables in a parsed expression AST
    according to `mapping` (a {old_name: new_name} dict). Used
    to map single-value quotation-slot outputs (B, C) to their
    Lean binder names (b, c) in a `where` / `ensures` clause.
    Function names and rest names are left alone."""
    kind = ast[0]
    if kind == "var":
        return ("var", mapping.get(ast[1], ast[1]))
    if kind in ("neg", "not", "lnot"):
        return (kind, _rename_ast_vars(ast[1], mapping))
    if kind == "bin":
        return ("bin", ast[1], _rename_ast_vars(ast[2], mapping),
                _rename_ast_vars(ast[3], mapping))
    if kind == "if":
        return ("if", _rename_ast_vars(ast[1], mapping),
                _rename_ast_vars(ast[2], mapping),
                _rename_ast_vars(ast[3], mapping))
    if kind == "call":
        return ("call", ast[1],
                [_rename_ast_vars(a, mapping) for a in ast[2]])
    if kind == "tonat":
        return ("tonat", mapping.get(ast[1], ast[1]))
    return ast


def _ast_var_names(ast):
    """(v36) The set of variable names in a parsed expression
    AST (for validating that a `where` clause only mentions
    variables the proof puts in scope)."""
    kind = ast[0]
    if kind == "var":
        return {ast[1]}
    if kind in ("restlen", "tonat"):
        return {ast[1]}
    if kind in ("neg", "not", "lnot"):
        return _ast_var_names(ast[1])
    if kind == "bin":
        return _ast_var_names(ast[2]) | _ast_var_names(ast[3])
    if kind == "if":
        return (_ast_var_names(ast[1]) | _ast_var_names(ast[2])
                | _ast_var_names(ast[3]))
    if kind == "call":
        names = set()
        for a in ast[2]:
            names |= _ast_var_names(a)
        return names
    return set()


PRIMS = {
    "nop": "Tok.nop", "clr": "Tok.clr",
    "dup": "Tok.dup", "swap": "Tok.swap", "drop": "Tok.drop",
    "q<": "Tok.qpush", "q>": "Tok.qpull",
    "+": "Tok.add", "-": "Tok.sub", "*": "Tok.mul",
    "%": "Tok.mod", "&": "Tok.land", "depth": "Tok.depth",
    "/": "Tok.div",
    "<": "Tok.lt", "=": "Tok.eq", ">": "Tok.gt",
    "|": "Tok.lor", "~": "Tok.lnot", "^": "Tok.pow",
    "putc": "Tok.putc", "putn": "Tok.putn", ".": "Tok.print",
    "exit": "Tok.exit", "rand": "Tok.rand", "clock": "Tok.clock",
    "getc": "Tok.getc",
    "<<": "Tok.shl", ">>": "Tok.shr",
    "eval": "Tok.eval", "?": "Tok.cond", "cons": "Tok.cons",
}

# IO words (v16): primitives whose effect is visible in the type
# (an action trace, an Outcome, or an oracle draw), not just the
# stack. Their theorems are stated with `run` and `Outcome`, and
# a defined word that inlines an IO token is refused (the trace
# for a composed IO word is not computed yet).
IO_PRIMS = {"putc", "putn", ".", "exit", "rand", "clock", "getc"}
ORACLE_PRIMS = {"rand", "clock"}  # draw from the oracle stream

LEAN_NAMES = {"--": "dec", "++": "inc", "+": "add", "-": "sub",
              "*": "mul", "/": "div", "%": "mod", "=": "eq",
              "<": "lt", ">": "gt", "<=": "le", ">=": "ge",
              "&": "land", "?": "cond", ".": "print",
              "|": "lor", "~": "lnot", "^": "pow",
              "<<": "shl", ">>": "shr"}

# Guarded primitives: the step fails on a condition about the top
# input element, `{top}`. `%` fails when the divisor is zero;
# `^` fails when the exponent is negative. The guard is written
# in terms of the top input variable (the last input, in typed
# order). A `when` hypothesis discharges the guard in the ladder
# only when it IS the guard (the error case) or its exact `¬`
# form; any other equivalent form (e.g. `0 ≤ b` for the guard
# `b < 0`) does not -- simp leaves the `match (if ...)` goal
# because it cannot simplify an `ite` that is the scrutinee of
# a `match` from a merely-equivalent hypothesis (verified with
# `^`). So for a guarded primitive with a `when` that is not
# the guard, the generator emits a `have` deriving `¬ guard`
# from `hw` by omega, and passes it to simp.
GUARDS = {"%": "{top} = 0", "^": "{top} < 0", "/": "{top} = 0"}

def lean_name(word):
    """A Lean identifier for an Fbm word. Symbolic words get a
    readable name (-- -> dec, ++ -> inc); anything else is
    sanitised, because e.g. `--` starts a Lean line comment."""
    if word in LEAN_NAMES:
        return LEAN_NAMES[word]
    name = re.sub(r"[^A-Za-z0-9_']", "_", word)
    if not name or not (name[0].isalpha() or name[0] == "_"):
        name = "w_" + name
    return name

LEAN_HEADER = "import Fbm.Prover\nimport Fbm.Arith\nopen scoped Fbm"

def _rest(tok):
    """The rest-of-stack marker, in either spelling: the Unicode
    ellipsis `…` (what the library comments use), or ASCII `...`.
    Both mean the same thing; the generator canonicalises to
    `...`. (`..` is deliberately NOT a rest marker.)"""
    return "..." if tok in ("…", "...") else tok

def _strip_brace_note(text):
    """Remove `{ ... }` notes from an @effect body. A `{...}` is a
    human note (the readable form of a Lean comment: `{` is `/--`,
    `}` is `-/` -- chosen because `/-- ... -/` nested inside
    `/* */` piles up slashes). It is NOT parsed: the IO it
    describes comes from the interpreter, so all variants of a
    note (`{}`, `{IO}`, `{prints char(n)}`, `{blah blah}`, no
    note) parse to the same effect. An unclosed `{` or a stray
    `}` is a clean problem, not a silent drop."""
    out = []
    i = 0
    while True:
        j = text.find("{", i)
        if j < 0:
            out.append(text[i:])
            break
        k = text.find("}", j + 1)
        if k < 0:
            raise ValueError(f"unclosed '{{' in @effect: {text!r}")
        out.append(text[i:j])
        i = k + 1
    cleaned = "".join(out)
    if "}" in cleaned:
        raise ValueError(f"stray '}}' in @effect: {text!r}")
    return cleaned

def _split_bracketed(text):
    """Split on whitespace, keeping `[...]` groups as SINGLE tokens
    with DEPTH COUNTING (so `[ [dup2] dip eval bury ]` is one token,
    `[sip]` is one token). A `[` starts a group even mid-token (as
    in _split_elems). Raises ValueError on an unclosed `[`."""
    out = []
    i, n = 0, len(text)
    while i < n:
        while i < n and text[i].isspace():
            i += 1
        if i >= n:
            break
        if text[i] == "[":
            depth = 0
            j = i
            while j < n:
                if text[j] == "[":
                    depth += 1
                elif text[j] == "]":
                    depth -= 1
                    if depth == 0:
                        break
                j += 1
            if depth != 0:
                raise ValueError(f"unclosed '[' in: {text!r}")
            out.append(text[i:j + 1])
            i = j + 1
        else:
            j = i
            while j < n and not text[j].isspace() and text[j] != "[":
                j += 1
            out.append(text[i:j])
            i = j
    return out


def _split_elems(text):
    """Split effect elements on whitespace, keeping a bracketed
    quotation `[ ... ]` (which may contain spaces and `--`, and
    may nest) as a single element. Unbracketed text splits exactly
    like str.split(). A `[` only ever starts an element (brackets
    are standalone stack elements, e.g. `[B]` or `[..r -- ..s]`)."""
    return _split_bracketed(text)


def _literal_inner_tokens(tok):
    """A literal token `[ ... ]` (balanced) -> the inner raw tokens
    (str/int, int when matching `-?\\d+`). The outer brackets are
    stripped; the inner string is split with _split_bracketed, so
    nested literals stay single tokens."""
    inner = tok[1:-1].strip()
    out = []
    for t in _split_bracketed(inner):
        if re.fullmatch(r"-?\d+", t):
            out.append(int(t))
        else:
            out.append(t)
    return out


def _parse_quot_slot(elem):
    """Parse a bracketed quotation element. Returns:
    ("ptr", in_rest, out_rest) for `[..r -- ..s]` -- a pointer
    whose body has effect `[..r -- ..s]` (the rests are the raw
    tokens, e.g. `..r`, `..s`);
    ("var", name) for `[B]` -- a plain quotation variable;
    ("cons_out", a, b) for `[a B]` -- cons's output, a quotation
    built from value `a` and quotation `B`;
    ("fun", x, f) for `[X -- F X]` -- a functional slot: the
    quotation maps `X :: R` to `(F X) :: X :: R` (pushes `F X`
    on top, preserves `X`, the rest, and the queue -- the
    contract of `_loop`-family bodies like `succ`). The output
    side must be exactly `F X` (two bare identifiers, the second
    repeating the input side). `F` becomes an `(F : Int → Int)`
    binder; `X` is universally quantified inside the body
    hypothesis.
    Returns None when the element is not bracketed, and
    ("bad", inner) when it is bracketed but unrecognised."""
    if not (elem.startswith("[") and elem.endswith("]")):
        return None
    inner = elem[1:-1].strip()
    if "--" in inner:
        left, right = inner.split("--", 1)
        left, right = left.strip(), right.strip()
        # (v36) A bare uppercase value on the output side is a
        # single-value slot: `[..r a -- B]` means the quotation
        # takes (.., a) and produces the single value B (the
        # contract for or_else / and_also, whose effects need
        # the quotation's single result as a variable). The
        # output side must be exactly one bare uppercase
        # identifier; a rest (`..s`) is the ("ptr", ...) form
        # below, and anything else falls through to it (where
        # the caller's rest parsing rejects it as a clean
        # problem).
        if re.fullmatch(r"[A-Z][A-Za-z0-9_]*", right):
            return ("ptr_val", left, right)
        mfun = re.fullmatch(r"([A-Za-z_][A-Za-z0-9_']*)\s+([A-Za-z_][A-Za-z0-9_']*)", right)
        if mfun and mfun.group(2) == left.strip() and re.fullmatch(
                r"[A-Za-z_][A-Za-z0-9_']*", left.strip()):
            return ("fun", left.strip(), mfun.group(1))
        return ("ptr", left, right)
    parts = inner.split()
    if len(parts) == 1:
        return ("var", parts[0])
    if len(parts) == 2:
        return ("cons_out", parts[0], parts[1])
    return ("bad", inner)


def parse_effect(text, word=None):
    """'a b c rot == c b a' -> (['a','b','c'], ['c','b','a'], None, None, False).
    The word name sits between the inputs and '==', exactly as
    typed in the .ff file; it is stripped here. '...' is kept.
    A trailing ' when <cond>' is split off as the third element:
    'a b % == a%b when b != 0' -> (['a','b'], ['a%b'], 'b != 0', None, False).
    A trailing ' where <prop>' is split off as the fourth element
    (it comes after `when`, if both are present):
    '..r depth == ..r r.length' -> (['..r'], ['..r', 'r.length'], None, None, False).
    A trailing ' else ERROR' on the `when` condition is split off
    as the fifth element: 'a b ^ == a^b when 0 <= b else ERROR'
    -> (['a','b'], ['a^b'], '0 <= b', None, True). It means the
    word fails when the condition does NOT hold (the error case);
    the generator desugars it into two effects (success with
    `when <cond>`, error with `when` the negated condition).
    New syntax (v20, Nov 20, 2026): the word may sit outside the
    effect as a `word:` prefix (stripped by main() before this is
    called), and `requires` / `ensures` are aliases for `when` /
    `where` -- they are normalised to `when` / `where` here, so
    the old spellings still work. A `{...}` note is stripped first
    (see _strip_brace_note) -- it is a human note, not part of the
    effect."""
    text = _strip_brace_note(text)
    text = re.sub(r"\brequires\b", "when", text)
    text = re.sub(r"\bensures\b", "where", text)
    if "==" not in text:
        raise ValueError(f"@effect needs '==': {text!r}")
    left, right = text.split("==", 1)
    if " where " in right:
        right, where_text = right.split(" where ", 1)
        where_text = where_text.strip()
    else:
        where_text = None
    if " when " in right:
        right, cond = right.split(" when ", 1)
        cond = cond.strip()
    else:
        cond = None
    else_error = False
    if cond is not None:
        m = re.search(r"\s+else\s+ERROR\s*$", cond)
        if m:
            else_error = True
            cond = cond[:m.start()].strip()
            if not cond:
                raise ValueError("@effect needs a condition before 'else ERROR'")
    ins = [_rest(t) for t in _split_elems(left)]
    outs = [_rest(t) for t in _split_elems(right)]
    if word is not None and ins and ins[-1] == word:
        ins = ins[:-1]
    elif ins and ins[-1] in ("--", "++"):
        ins = ins[:-1]
    return ins, outs, cond, where_text, else_error

def _effect_vars(elems):
    """Variables in first-seen order from effect elements. An identifier
    followed by `(` is a function call, not a variable; an identifier
    after a `.` is a field name (`length` in `r.length`), not a
    variable. `hw` is the `when` hypothesis name and `rest` is the
    rest list, so neither is ever a variable here. (A named rest's
    `r` in `r.length` IS collected here -- it is the rest binder's
    name, and prepare() excludes it from the Int binders.)"""
    seen = []
    for e in elems:
        for m in re.finditer(r"[A-Za-z_][A-Za-z0-9_]*", e):
            v = m.group(0)
            if e[m.end():].lstrip().startswith("("):
                continue
            if m.start() > 0 and e[m.start() - 1] == ".":
                continue
            if v not in ("ERROR", "hw", "rest", "hguard", "if", "then", "else") and v not in seen:
                seen.append(v)
    return seen

def parse_where_clauses(text):
    """'n = rest.length ∧ m = a+b' -> [('n', 'rest.length'), ('m', 'a+b')].
    Only equations `var = expr` are supported (the equational
    case, Nov 18, 2026, generator v11): the variable becomes an
    existential and the expression is its witness. Anything else
    -- an inequality, a non-variable left-hand side -- is a clean
    problem, not a theorem. The `∧` separator is the same one the
    library's `where` examples use."""
    out = []
    for part in text.split("∧"):
        part = part.strip()
        if not part:
            raise ValueError("empty conjunct in where clause")
        # Split on a bare `=` (not part of `==`, `!=`, `<=`, `>=`).
        m = re.split(r"(?<![=!<>])=(?![=])", part, maxsplit=1)
        if len(m) != 2:
            raise ValueError(
                f"where clause must be equations var = expr; {part!r} is not "
                f"an equation (inequalities are not supported yet)")
        lhs, rhs = m[0].strip(), m[1].strip()
        if not re.fullmatch(r"[A-Za-z_][A-Za-z0-9_]*", lhs):
            raise ValueError(
                f"where left-hand side must be a variable; {lhs!r} is not one")
        if not rhs:
            raise ValueError(f"where equation for {lhs!r} has no right-hand side")
        out.append((lhs, rhs))
    return out

def lean_list_bottom_to_top(elems, rest_var):
    """Bottom-to-top element list -> Lean head-top list expression.
    elems are Lean expressions (variables or arithmetic). rest_var is
    None, or the name of the rest-of-stack variable (always at the
    bottom, i.e. first in typed order, written as '...')."""
    # head-top list is the reverse of the typed order, consed onto rest
    exprs = list(reversed(elems))
    if rest_var is None:
        if not exprs:
            return "[]"
        return " :: ".join(exprs) + " :: []" if False else _cons_chain(exprs, "[]")
    return _cons_chain(exprs, rest_var)

# (v37) Calls returning a Stack (list splice) in `@effect` outputs.
# An output element that is a call to one of these is a list-valued
# splice (multiple values), not a single Int. `intRange` is defined in
# `Fbm/Prover.lean`; others may come from `@lean` blocks.
KNOWN_LIST_FUNCS = {"intRange", "SpecIter", "SpecHist2", "iterates"}

def _is_list_splice_elem(elem):
    """True when an output element (Lean-translated) is a list-valued
    splice (v37): a call to a known list function (`intRange(A,B)`),
    or a bare lowercase identifier (`xs`). Int singles (uppercase vars,
    numbers, arithmetic) return False. Rest markers are not passed here."""
    e = elem.strip()
    if re.fullmatch(r"[a-z][A-Za-z0-9_']*", e):
        return True
    m = re.match(r"^([A-Za-z_][A-Za-z0-9_']*)\s*\(", e)
    if m and m.group(1) in KNOWN_LIST_FUNCS:
        return True
    # Lean-application form (translated from `f(A,B, ...)`): head
    # is a known list function (`intRange A B`, `SpecHist2 F ...`).
    m = re.match(r"^([A-Za-z_][A-Za-z0-9_']*)\s+\S", e)
    if m and m.group(1) in KNOWN_LIST_FUNCS:
        return True
    return False

def _splice_consumes_rest(elem, rest_name):
    """True when a list splice element already has the rest of stack
    incorporated into its tail (e.g. `SpecHist2 F N.toNat A R0`).
    In that case, lean_output_stack should not append `(rest_name)`."""
    if not rest_name:
        return False
    e = elem.strip().lstrip("(").rstrip(")")
    m = re.match(r"^([A-Za-z_][A-Za-z0-9_']*)\b", e)
    if m and m.group(1) in ("SpecHist2", "iterates"):
        return True
    return False

def lean_output_stack(out_elems, rest_name):
    """Output stack (bottom-to-top, possibly with `..R` anywhere and
    list splices) -> Lean top-first list expression (v37).
    `out_elems` are Lean-translated elements plus at most one `..R`
    rest marker (`..` + rest_name); `rest_name` may be None (no rest).
    List splices (see `_is_list_splice_elem`) are only allowed at/above
    the rest (the top part); the bottom part (below the rest) must be
    Int singles. Returns a `++`-chain (e.g. `R ++ [(A)]`, `xs ++ R`)."""
    rest_tok = f"..{rest_name}" if rest_name else None
    if rest_tok and rest_tok in out_elems:
        idx = out_elems.index(rest_tok)
        bottom = out_elems[:idx]
        top = out_elems[idx + 1:]
    else:
        bottom, top = [], list(out_elems)
    for b in bottom:
        if _is_list_splice_elem(b):
            raise ValueError(
                f"list splice {b!r} below the rest is not supported "
                f"(put list outputs above `..{rest_name}`)")
    # Top-first order: reverse(top) ++ [R] ++ reverse(bottom).
    segs = []
    for e in reversed(top):
        if _is_list_splice_elem(e):
            segs.append(f"({e})")
        else:
            segs.append(f"[({e})]")
    rest_consumed = bool(top) and _splice_consumes_rest(top[0], rest_name)
    if rest_name and not rest_consumed:
        segs.append(f"({rest_name})")
    for e in reversed(bottom):
        segs.append(f"[({e})]")
    if not segs:
        return "[]"
    if len(segs) == 1:
        s = segs[0]
        # `[(x)]` is a singleton; keep the `++`-free form when it is
        # the whole stack (avoids `R`-less chains like `[(A)]`).
        return s
    return " ++ ".join(segs)

def _cons_chain(exprs, tail):
    # Each element is parenthesised: without it, `n-1 :: []` parses
    # as `n - (1 :: [])` in Lean (verified by the error it produced).
    out = tail
    for e in reversed(exprs):
        out = f"({e}) :: {out}"
    return out

class ExprError(Exception):
    """An effect expression the translator cannot handle."""

_EXPR_TOKEN_RE = re.compile(r"""
    \s*(?:
      (?P<num>\d+)
    | (?P<ident>[A-Za-z_][A-Za-z0-9_']*)
    | (?P<hash>\#[A-Za-z_][A-Za-z0-9_']*)
    | (?P<op>!=|==|<=|>=|&&&|\|\|\||\^\^\^|<<<|>>>|~~~|<<|>>|\+|-|/|\*|%|&|<|=|>|\||∧|∨|¬|~|\^|⊕)
    | (?P<lpar>\()
    | (?P<rpar>\))
    | (?P<comma>,)
    | (?P<dot>\.)
    | (?P<lfloor>⌊)
    | (?P<rfloor0>⌋₀)
    | (?P<rfloor>⌋)
    )""", re.VERBOSE)

_BINPREC = {"^": 80, "*": 70, "/": 70, "%": 70, "&": 70, "&&&": 70,
            "<<": 70, "<<<": 70, ">>": 70, ">>>": 70,
            "+": 65, "-": 65, "⊕": 65, "^^^": 65, "|": 60, "|||": 60,
            "<": 50, "=": 50, ">": 50, "<=": 50, ">=": 50,
            "!=": 50, "==": 50,
            "∧": 35, "∨": 30}

def _tokenize_expr(s):
    toks = []
    i = 0
    while i < len(s):
        m = _EXPR_TOKEN_RE.match(s, i)
        if not m or m.end() == i:
            raise ExprError(f"cannot parse {s!r} at {s[i:]!r}")
        i = m.end()
        # The group text, not group(0): group(0) includes the
        # leading whitespace the `\s*` consumed.
        toks.append((m.lastgroup, m.group(m.lastgroup)))
    return toks

def _parse_expr(s):
    """Pratt parser for effect expressions: atoms, calls, parens,
    unary - / ¬, binary ops with Lean's precedences, if-then-else.
    Returns an AST: ("num"/"var", text), ("call", name, [args]),
    ("neg"/"not", e), ("bin", op, l, r), ("if", c, t, e)."""
    toks = _tokenize_expr(s)
    pos = [0]

    def peek():
        return toks[pos[0]] if pos[0] < len(toks) else (None, None)

    def next_tok():
        t = peek()
        pos[0] += 1
        return t

    def parse(min_prec):
        kind, val = next_tok()
        if kind == "num":
            left = ("num", val)
        elif kind == "hash":
            # `#R` is shorthand for `R.length`, the length of the
            # named rest `..R` (v26, Nov 21, 2026). Same AST node as
            # the `.length` form, so it emits `(R.length : Int)`.
            # Whether `R` is actually the rest binder is checked in
            # prepare(); here it is just parsed.
            left = ("restlen", val[1:])
        elif kind == "ident":
            if val == "if":
                cond = parse(0)
                k2, v2 = next_tok()
                if k2 != "ident" or v2 != "then":
                    raise ExprError(f"expected 'then' in {s!r}")
                t = parse(0)
                k3, v3 = next_tok()
                if k3 != "ident" or v3 != "else":
                    raise ExprError(f"expected 'else' in {s!r}")
                e = parse(0)
                left = ("if", cond, t, e)
            elif peek() == ("lpar", "("):
                next_tok()
                args = []
                if peek() != ("rpar", ")"):
                    args.append(parse(0))
                    while peek() == ("comma", ","):
                        next_tok()
                        args.append(parse(0))
                k2, v2 = next_tok()
                if k2 != "rpar":
                    raise ExprError(f"expected ')' in {s!r}")
                left = ("call", val, args)
            else:
                left = ("var", val)
                # Dot access: `<name>.length` is the length of the
                # named rest `..name` (v20: `..r` + `r.length`
                # replaces the old `rest.length`, which is dropped),
                # and `<name>.toNat` is `Int.toNat` (v37: needed by
                # `SpecIterN` witnesses over an `Int` counter).
                # Anything else with a dot is rejected: stack
                # variables are Ints, only a rest list has a length.
                # Whether `val` is actually the rest binder is
                # checked in prepare(); here it is just parsed.
                if peek() == ("dot", "."):
                    next_tok()
                    k2, v2 = next_tok()
                    if k2 == "ident" and v2 == "toNat":
                        left = ("tonat", val)
                    else:
                        if k2 != "ident" or v2 != "length":
                            raise ExprError(f"unsupported field access in {s!r}")
                        left = ("restlen", val)
        elif kind == "op" and val == "-":
            left = ("neg", parse(80))
        elif kind == "op" and val == "¬":
            left = ("not", parse(80))
        elif kind == "op" and val in ("~", "~~~"):
            # Bitwise NOT: ~x = -x - 1 (two's complement).
            # `~~~` is Lean's complement spelling (v23).
            left = ("lnot", parse(80))
        elif kind == "lfloor":
            # `⌊E⌋₀` truncation notation: a closed bracket atom like
            # parens; the inside parses as a full expression so
            # `⌊sqrt(X*10^(2*N))⌋₀` works. Bare `⌊E⌋` (floor toward
            # -inf, reserved) is a clean problem naming the canonical
            # `⌊...⌋₀` spelling.
            inner = parse(0)
            k2, v2 = next_tok()
            if k2 == "rfloor":
                raise ExprError(
                    "bare ⌊...⌋ without the ₀ subscript is not an effect spelling: "
                    "write ⌊...⌋₀ for the toward-zero truncation")
            if k2 != "rfloor0":
                raise ExprError(f"expected '⌋₀' in {s!r}")
            left = ("floorn", inner)
        elif kind == "lpar":
            left = parse(0)
            k2, v2 = next_tok()
            if k2 != "rpar":
                raise ExprError(f"expected ')' in {s!r}")
        else:
            raise ExprError(f"unexpected {val!r} in {s!r}")
        while True:
            kind, val = peek()
            if kind != "op" or val not in _BINPREC:
                break
            prec = _BINPREC[val]
            if prec < min_prec:
                break
            next_tok()
            right = parse(prec + 1)
            left = ("bin", val, left, right)
        return left

    ast = parse(0)
    if pos[0] != len(toks):
        raise ExprError(f"trailing tokens in {s!r}")
    return ast

def _emit_expr(ast, rest_name=None, in_floor=False):
    kind = ast[0]
    if kind in ("num", "var"):
        return ast[1]
    if kind == "restlen":
        # `<name>.length` is a Nat (List.length); the stack holds
        # Ints, so the cast is part of the translation. `name` must
        # be the effect's rest binder (checked in prepare()).
        return f"({ast[1]}.length : Int)"
    if kind == "tonat":
        # `<name>.toNat` is `Int.toNat` (a Nat). `name` must be an
        # `Int` stack variable (checked in prepare()).
        return f"({ast[1]}.toNat)"
    if kind == "floorn":
        # `⌊E⌋₀` emits the `Fbm`-scoped truncation notation (enabled
        # via `open scoped Fbm` in the header), which elaborates to
        # `Fbm.floor E` -- generated and hand-written Lean share
        # the spelling. The inside is the truncation context licensing
        # `sqrt` below it.
        return f"⌊{_emit_expr(ast[1], rest_name=rest_name, in_floor=True)}⌋₀"
    if kind == "call":
        # Lean application is space-separated, not f(a, b):
        # `min(a,b)` in an effect means `min a b` in Lean.
        if ast[1] == "iterates":
            if len(ast[2]) != 3:
                raise ExprError(f"iterates(F,N,A) takes exactly 3 arguments, got {len(ast[2])}")
            f_ast, n_ast, a_ast = ast[2]
            f_lean = _emit_expr(f_ast, rest_name=rest_name, in_floor=in_floor)
            if n_ast[0] == "tonat":
                n_lean = f"{n_ast[1]}.toNat"
            else:
                n_raw = _emit_expr(n_ast, rest_name=rest_name, in_floor=in_floor)
                n_lean = f"{n_raw}.toNat"
            a_lean = _emit_expr(a_ast, rest_name=rest_name, in_floor=in_floor)
            rn = rest_name or "rest"
            return f"SpecHist2 {f_lean} {n_lean} {a_lean} {rn}"
        if not ast[2]:
            return ast[1]
        if ast[1] in _FBM_SPECS:
            # Spelling-aligned `Fbm.*` spec helper: emit the qualified
            # target with its arity checked structurally (argument
            # count vs the table's binder count), not via a per-name
            # branch. `sqrt` additionally requires the `⌊...⌋₀`
            # truncation context; bare `sqrt(` names the canonical form.
            target, want = _FBM_SPECS[ast[1]]
            if len(ast[2]) != want:
                raise ExprError(
                    f"{ast[1]} takes exactly {want} argument(s), "
                    f"got {len(ast[2])}")
            if ast[1] == "sqrt" and not in_floor:
                raise ExprError(
                    "bare sqrt(...) without an enclosing ⌊...⌋₀: "
                    "wrap in ⌊...⌋₀ or document exact-root intent")
            return (f"({target} "
                    + " ".join(f"({_emit_expr(a, rest_name=rest_name, in_floor=in_floor)})"
                                 for a in ast[2]) + ")")
        if ast[1] in ("isqrt", "fsqrt"):
            # Neither `isqrt(X)` nor the pre-rename `fsqrt(X)` is an
            # effect spelling (the Lean-side `isqrt` is the
            # computational helper `floor_sqrt` names). A clean
            # problem telling the author to write `⌊sqrt(X)⌋₀`.
            raise ExprError(
                f"{ast[1]}(...) is not an effect spelling: "
                "write ⌊sqrt(...)⌋₀ for the integer root")
        if ast[1] in ("igcd",):
            # Legacy `igcd(...)` is not an effect spelling (the
            # Lean-side `isqrt`-style computational name is gone;
            # `Fbm.gcd` is the spec helper). A clean problem naming
            # the canonical `gcd(...)` form.
            raise ExprError(
                "igcd(...) is not an effect spelling: "
                "write gcd(...) for the spec helper")
        if ast[1] in ("floor",):
            # `floor(...)` is not an effect spelling: the canonical
            # form is the `⌊...⌋₀` truncation notation. A clean problem
            # naming it (this keeps the one-way-per-call rule so the
            # exact-vs-truncated distinction stays visible).
            raise ExprError(
                "floor(...) is not an effect spelling: "
                "write ⌊...⌋₀ for the truncated form")
        return ast[1] + " " + " ".join(_emit_expr(a, rest_name=rest_name, in_floor=in_floor) for a in ast[2])
    if kind == "neg":
        return f"(-{_emit_expr(ast[1], rest_name=rest_name, in_floor=in_floor)})"
    if kind == "not":
        return f"(¬ {_emit_expr(ast[1], rest_name=rest_name, in_floor=in_floor)})"
    if kind == "lnot":
        # `lnot` in the preamble (v23, @[simp]); `~` and `~~~`
        # both emit it, as does the `lnot(a)` call form.
        return f"(lnot ({_emit_expr(ast[1], rest_name=rest_name, in_floor=in_floor)}))"
    if kind == "if":
        return (f"(if {_emit_expr(ast[1], rest_name=rest_name, in_floor=in_floor)} then {_emit_expr(ast[2], rest_name=rest_name, in_floor=in_floor)} "
                f"else {_emit_expr(ast[3], rest_name=rest_name, in_floor=in_floor)})")
    if kind == "bin":
        op, l, r = ast[1], ast[2], ast[3]
        # Prefix operators (tmod/tdiv/land/lor/xor/lnot/shl/shr) take
        # their operands parenthesised (v22): without parens a
        # nested application misparses -- `land lor a b ...` reads
        # as `((land lor) a) b`, a type error. The whole
        # application is parenthesised too, matching `!=`/`==`/`^`.
        # (v23) Each operation has three spellings in effects: the
        # F♭m symbol (`&`), Lean's operator (`&&&`), and the f()
        # form (`land(a, b)`); all three emit the same helper.
        if op == "%":
            return f"(tmod ({_emit_expr(l, rest_name=rest_name, in_floor=in_floor)}) ({_emit_expr(r, rest_name=rest_name, in_floor=in_floor)}))"
        if op == "/":
            return f"(tdiv ({_emit_expr(l, rest_name=rest_name, in_floor=in_floor)}) ({_emit_expr(r, rest_name=rest_name, in_floor=in_floor)}))"
        if op in ("&", "&&&"):
            return f"(land ({_emit_expr(l, rest_name=rest_name, in_floor=in_floor)}) ({_emit_expr(r, rest_name=rest_name, in_floor=in_floor)}))"
        if op == "!=":
            return f"({_emit_expr(l, rest_name=rest_name, in_floor=in_floor)} ≠ {_emit_expr(r, rest_name=rest_name, in_floor=in_floor)})"
        if op == "==":
            return f"({_emit_expr(l, rest_name=rest_name, in_floor=in_floor)} = {_emit_expr(r, rest_name=rest_name, in_floor=in_floor)})"
        if op in ("|", "|||"):
            return f"(lor ({_emit_expr(l, rest_name=rest_name, in_floor=in_floor)}) ({_emit_expr(r, rest_name=rest_name, in_floor=in_floor)}))"
        if op in ("⊕", "^^^"):
            # Bitwise xor (v22): `xor` in the preamble, defined
            # as (a & ~b) | (b & ~a), `@[simp]` so the ladder
            # unfolds it. `^` in F♭m is power, so xor is `⊕`
            # (also `^^^`, Lean's Nat xor, and `xor(a, b)`).
            return f"(xor ({_emit_expr(l, rest_name=rest_name, in_floor=in_floor)}) ({_emit_expr(r, rest_name=rest_name, in_floor=in_floor)}))"
        if op == "^":
            # Lean's `^` on Int takes a Nat exponent; the effect
            # writes an Int exponent, so it is converted here.
            # A numeric literal is already Nat, so it is emitted bare.
            if r[0] == "num":
                return f"({_emit_expr(l, rest_name=rest_name, in_floor=in_floor)} ^ {_emit_expr(r, rest_name=rest_name, in_floor=in_floor)})"
            return f"({_emit_expr(l, rest_name=rest_name, in_floor=in_floor)} ^ ({_emit_expr(r, rest_name=rest_name, in_floor=in_floor)}).toNat)"
        if op in ("<<", "<<<"):
            return f"(shl ({_emit_expr(l, rest_name=rest_name, in_floor=in_floor)}) ({_emit_expr(r, rest_name=rest_name, in_floor=in_floor)}))"
        if op in (">>", ">>>"):
            return f"(shr ({_emit_expr(l, rest_name=rest_name, in_floor=in_floor)}) ({_emit_expr(r, rest_name=rest_name, in_floor=in_floor)}))"
        return f"({_emit_expr(l, rest_name=rest_name, in_floor=in_floor)} {op} {_emit_expr(r, rest_name=rest_name, in_floor=in_floor)})"
    raise ExprError(f"bad AST node {ast!r}")

# Lean-side `Fbm.*` spec helpers named exactly as effect spellings
# invoke them (spelling-alignment): effect name -> (Lean target,
# arity). A call to one emits the qualified target with its arity
# checked structurally (argument count vs binder count) -- one code
# path, no per-name branches. `sqrt` additionally requires the
# `⌊...⌋₀` truncation context (bare `sqrt(` is a clean problem).
# Legacy `igcd(` is rejected in `_emit_expr`, not mapped here.
_FBM_SPECS = {"gcd": ("Fbm.gcd", 2),
              "sqrt": ("Fbm.sqrt", 1)}

_CMP_OPS = {"=", "==", "!=", "<", "<=", ">", ">="}

def _needs_translation(e):
    """True when an output element contains operators, length/call
    syntax, or comparisons that must be translated to Lean."""
    # (v23) `⊕` is the only operator that needs naming: the Lean
    # operators (`&&&`, `|||`, `^^^`, `<<<`, `>>>`, `~~~`) all contain
    # their ASCII operator as a substring, so the checks below already
    # catch them; comparisons (`=`, `==`, `!=`, `<`, `<=`, `>`, `>=`)
    # all contain `=`, `<`, or `>`; every f() form is caught by the
    # call regex.
    return ("%" in e or "/" in e or "&" in e or "|" in e or "^" in e or "~" in e
            or "⊕" in e or "#" in e or "⌊" in e or "⌋" in e
            or "<<" in e or ">>" in e or "." in e
            or "=" in e or "<" in e or ">" in e
            or re.search(r"[A-Za-z_][A-Za-z0-9_']*\s*\(", e) is not None)

def translate_expr(s, coerce_cmp=False, rest_name=None, in_floor=False):
    """Translate an effect expression to Lean. `%` and `&` mean
    F♭m's operators (truncating mod, bitwise and), not Lean's
    (Euclidean `%`, no Int `&`), so they become the `tmod` /
    `land` helpers; `!=` becomes `≠` and `==` becomes `=`,
    because Lean's `!=` / `==` are boolean, not propositions.
    When `coerce_cmp` is True (whole output elements), a top-level
    comparison node `("bin", op, l, r)` is wrapped as
    `(if <cond> then 1 else 0)`.
    Raises ExprError on anything it cannot translate."""
    ast = _parse_expr(s)
    lean = _emit_expr(ast, rest_name=rest_name, in_floor=in_floor)
    if coerce_cmp and ast[0] == "bin" and ast[1] in _CMP_OPS:
        return f"(if {lean} then 1 else 0)"
    return lean

_NEGATE_OP = {"!=": "==", "==": "!=", "<": ">=", "<=": ">",
              ">": "<=", ">=": "<"}

def _negate_ast(ast):
    """Negate a condition AST. A simple comparison swaps its
    operator; a `¬ X` drops the `¬`; anything else is wrapped
    in `¬ (...)`. The swapped operator is normalised to the
    `<`/`<=` form with flipped operands (`a <= b` negates to
    `b < a`, not `a > b`), because the guards simp discharges
    are written with `<` and `=`."""
    kind = ast[0]
    if kind == "bin" and ast[1] in _NEGATE_OP:
        new_op = _NEGATE_OP[ast[1]]
        l, r = ast[2], ast[3]
        if new_op == ">":
            return ("bin", "<", r, l)
        if new_op == ">=":
            return ("bin", "<=", r, l)
        return ("bin", new_op, l, r)
    if kind == "not":
        return ast[1]
    return ("not", ast)

def negate_cond(cond):
    """Negate a `when` condition, for the `else ERROR` error
    case: the error theorem's hypothesis is the negation of
    the success condition (`b != 0` becomes `b == 0`,
    `0 <= b` becomes `b < 0`). Returns the negated condition
    as a Lean string (already translated). Raises ExprError
    if the condition cannot be parsed."""
    return _emit_expr(_negate_ast(_parse_expr(cond)))

def parse_args(argv):
    """Parse command-line args: generate.py in.ff [out.lean|-].
    Returns (src_path, out_path, from_stdin) where out_path is None
    for stdout. `--help` prints the short usage; the full manual
    is HELP.md. With `--stdin` there is no LABEL: the program text
    is read from stdin (already-flattened preprocessor output --
    all definitions present, no `.import` walking) and `<stdin>` is
    used as the provenance marker (in `@lean`/`-- src` comments and
    problem messages). Without `--stdin`, in.ff is a real
    standalone file on disk (raw `.ff` / `.ffp` with no lib imports
    needing flattening); its definitions are parsed as-is."""
    args = list(argv)
    from_stdin = False
    if "--stdin" in args[1:]:
        from_stdin = True
        args = [args[0]] + [a for a in args[1:] if a != "--stdin"]
    if len(args) == 2 and args[1] in ("-h", "--help"):
        print("usage: generate.py in.ff [out.lean|-]")
        print("       generate.py --stdin [out.lean|-] < flattened.ff")
        print("       out.lean omitted (or '-') writes Lean to stdout")
        print("       --stdin reads the program from stdin; stdin is stdin (no LABEL)")
        print("       full manual: HELP.md (notation, scope, IO, requires/ensures)")
        sys.exit(0)
    if from_stdin:
        if len(args) > 2:
            print("usage: generate.py --stdin [out.lean|-] < flattened.ff", file=sys.stderr)
            sys.exit(2)
        src_path = Path("<stdin>")
        out_arg = args[1] if len(args) == 2 else None
    else:
        if len(args) < 2 or len(args) > 3:
            print("usage: generate.py in.ff [out.lean|-]", file=sys.stderr)
            sys.exit(2)
        src_path = Path(args[1])
        out_arg = args[2] if len(args) == 3 else None
    out_path = None if out_arg in (None, "-") else Path(out_arg)
    return src_path, out_path, from_stdin


# Tokens forbidden in verbatim Lean blocks and @by-proof / @by-induction
# clauses (v37): they would smuggle an unproved claim past the
# checker. The generator rejects them up front; Lean's `#print
# axioms` is the backstop, not the only line of defence.
_FORBIDDEN_LEAN_RE = re.compile(r"\b(sorry|admit|axiom)\b")

def _check_lean_safe(body, where):
    """Raise ValueError when a verbatim Lean block contains
    `sorry`, `admit`, or `axiom` (v37)."""
    m = _FORBIDDEN_LEAN_RE.search(body)
    if m:
        raise ValueError(
            f"{where} contains forbidden token {m.group(1)!r} "
            f"(no sorry / admit / axiom in verbatim Lean)")

def _split_proof_clauses(body):
    """Split trailing `@by-proof` / `@by-induction` / `@assume` clauses
    off an `@effect` body (v37 + assumed-effects). Returns
    `(core, by_proof, by_induction, assume)`. Clauses must be at the
    tail (`@by-proof <tactic>`, `@by-induction <pattern>`,
    `@assume <justification>`); at most one clause per effect.
    Raises ValueError on duplicates, empty clauses, mixed clauses,
    or forbidden `sorry`/`admit`/`axiom` tokens."""
    marks = [(m.start(), m.end(), m.group(1))
             for m in re.finditer(r"\s@(by-proof|by-induction|assume)\b", body)]
    if not marks:
        return body, None, None, None
    marks.sort()
    core = body[:marks[0][0]].strip()
    clauses = {}
    for i, (s, e, kind) in enumerate(marks):
        nxt = marks[i + 1][0] if i + 1 < len(marks) else len(body)
        text = body[e:nxt].strip()
        if not text:
            raise ValueError(f"@{kind} clause has no body")
        if kind in clauses:
            raise ValueError(f"duplicate @{kind} clause")
        clauses[kind] = text
    if len(clauses) > 1:
        raise ValueError("at most one of @by-proof / @by-induction / @assume per @effect")
    by_proof = clauses.get("by-proof")
    by_ind = clauses.get("by-induction")
    assume = clauses.get("assume")
    # Newlines are never significant in the `;`-separated tactic grammar,
    # so collapse every run of whitespace containing a newline to one space.
    if by_proof is not None:
        by_proof = re.sub(r"\s*\n\s*", " ", by_proof)
    if by_ind is not None:
        by_ind = re.sub(r"\s*\n\s*", " ", by_ind)
    if assume is not None:
        assume = re.sub(r"\s*\n\s*", " ", assume)
    if by_proof is not None:
        _check_lean_safe(by_proof, "@by-proof clause")
    if by_ind is not None:
        _check_lean_safe(by_ind, "@by-induction clause")
    if assume is not None:
        _check_lean_safe(assume, "@assume clause")
    if not core:
        raise ValueError("@effect has no effect before @by-proof / @by-induction / @assume")
    return core, by_proof, by_ind, assume

def extract_effects(text):
    """Strip ordinary /* */ comments, keeping @effect bodies.
    Returns (effects_list, lean_blocks, text_without_comments):
    effects_list is a list of (source line, @effect body) in file
    order (the body without the '@effect' tag); lean_blocks is a
    list of (source line, @lean body) in file order (the body
    without the '@lean' tag, emitted verbatim); the returned text
    has every comment replaced by a single space so definitions
    still parse. The source line is reported in generator problem
    messages and in the `/-- word: @effect ... -/` doc comment above
    each emitted theorem (which is also what check.py names TAP
    tests by)."""
    effects_list = []
    lean_blocks = []
    for m in re.finditer(r"/\*(.*?)\*/", text, flags=re.S):
        body = m.group(1).strip()
        if body.startswith("@effect"):
            line = text.count("\n", 0, m.start()) + 1
            effects_list.append((line, body[len("@effect"):].strip()))
        elif body.startswith("@lean"):
            line = text.count("\n", 0, m.start()) + 1
            lean_body = body[len("@lean"):].strip()
            try:
                _check_lean_safe(lean_body, f"@lean block (line {line})")
            except ValueError as ex:
                # Record as problem later via main(); keep marker.
                lean_blocks.append((line, f"-- ERROR: {ex}"))
                continue
            lean_blocks.append((line, lean_body))
    text2 = re.sub(r"/\*(.*?)\*/", " ", text, flags=re.S)
    return effects_list, lean_blocks, text2


def parse_definitions(text):
    """Parse `name: body ;` definitions. Returns {name: [tokens]}
    where integers are int and everything else is a str."""
    defs = {}
    for m in re.finditer(r"([^\s:;]+)\s*:\s*([^;]*);", text):
        name, body = m.group(1), m.group(2)
        toks = []
        for tok in _split_bracketed(body):
            if re.fullmatch(r"-?\d+", tok):
                toks.append(int(tok))
            else:
                toks.append(tok)
        defs[name] = toks
    return defs


def _tok_lean(tok):
    """A program token (int, primitive name, ("lit", k) marker, or
    ("call", word) marker) as a Lean Tok expression. A literal marker
    becomes a push of its code variable (`Tok.push lit{k}`); a call
    marker (v37, recursive call) becomes `Tok.call self_<word>`."""
    if isinstance(tok, int):
        # A negative literal needs parentheses: `Tok.push -1` parses as
        # `HSub (Tok.push) 1`. Non-negatives keep their exact form so
        # existing generated files stay byte-identical.
        if tok < 0:
            return f"Tok.push ({tok})"
        return f"Tok.push {tok}"
    if isinstance(tok, tuple) and tok[0] == "lit":
        return f"Tok.push lit{tok[1]}"
    if isinstance(tok, tuple) and tok[0] == "call":
        return f"Tok.call {_self_var(tok[1])}"
    return PRIMS[tok]


def _tok_lean_renamed(tok, lit_prefix):
    """`_tok_lean` with literal markers pushed as `{lit_prefix}{k}`
    (for a callee's literal codes bound in the caller's theorem,
    e.g. `_loop_lit0` when proving `loop`). Call markers already
    render as the callee's own `Tok.call self_*`."""
    if isinstance(tok, tuple) and tok[0] == "lit":
        return f"Tok.push {lit_prefix}{tok[1]}"
    return _tok_lean(tok)


def _self_var(word):
    """The Lean code variable for a recursive word's own defs-table
    entry (v37): `self_<lean_name>`, shared by all references to that
    word's code (direct `Tok.call` and single-word `[W]` literals
    that resolve through it)."""
    return f"self_{lean_name(word)}"

def _is_rec_single_word(raw, body_prog, defs, frontier=None):
    """True when a literal should be emitted via its inlined body (with
    `Tok.call self_*`) instead of a `WProg` reference (v37): the raw is a
    single defined word `W` and either the inlined body contains a
    recursive-call marker or `W` itself is on the rec-reaching frontier
    (its `WProg` reference would be underapplied -- frontier Prog defs
    take `self_*` params -- or circular)."""
    if not (len(raw) == 1 and isinstance(raw[0], str)
            and raw[0] in defs and raw[0] not in PRIMS):
        return False
    if any(isinstance(t, tuple) and t[0] == "call" for t in body_prog):
        return True
    if frontier is None:
        frontier = _compute_rec_frontier(defs)
    return raw[0] in frontier

def _compute_rec_frontier(defs, rec_words=None, succ=None):
    """Words that can reach a recursive word (including recursive
    words themselves). The generator keeps call boundaries opaque
    at this frontier (a `Tok.call` marker instead of inlining or
    delegating through): fbm_verify then composes the callee's
    proven effect lemma instead of re-peeling its body (which
    needs the callee's own induction). Words outside the frontier
    inline and delegate exactly as before."""
    if rec_words is None or succ is None:
        if succ is None:
            succ = _succ_map(defs)
        if rec_words is None:
            rec_words = _compute_rec_words(defs, succ)
    return {w for w in defs if _rec_deps_of(w, defs, rec_words, succ)}

def _direct_callees_of_tokens(tokens, defs):
    """Direct callee words referenced by a raw token list (v37): bare
    word tokens plus words named inside `[...]` literals (recursively).
    Used to compute the raw call graph for recursion detection."""
    out = set()
    for tok in tokens:
        if isinstance(tok, str) and tok.startswith("["):
            try:
                inner = _literal_inner_tokens(tok)
            except ValueError:
                continue
            for t in inner:
                if isinstance(t, str) and t in defs:
                    out.add(t)
                if isinstance(t, str) and t.startswith("["):
                    out |= _direct_callees_of_tokens([t], defs)
        elif isinstance(tok, str) and tok in defs:
            out.add(tok)
    return out

def _succ_map(defs):
    """The raw call-graph successor map (v37, perf): {word: direct
    callees}. Computed ONCE per run in main() and threaded through
    as an explicit argument; helpers accept it via `succ=None`
    (None means build it, exactly as before). Same contents as the
    inline loop `_compute_rec_words` used to build per call."""
    succ = {}
    for w, toks in defs.items():
        succ[w] = _direct_callees_of_tokens(toks, defs)
    return succ


def _compute_gen_frontier(defs, annotated):
    """The generalized compositional frontier: every annotated
    (effect-carrying) word defined in this run. Computed ONCE per run
    in main() and shared across entries (same `effects` for the whole
    run), the line the rec-cache memoization anticipated. A call to a
    frontier word emits a callee-`Prog` `++` boundary reference instead
    of flattening the callee (see `_comp_prog_lean` and the cond-path
    region test); unannotated callees still inline, and recursive words
    keep their `Tok.call` path untouched."""
    return {w for w in annotated if w in defs}

def _compute_rec_words(defs, succ=None):
    """The set of recursive words (v37): words that can reach themselves
    through the raw call graph (bare tokens and literal contents)."""
    if succ is None:
        succ = _succ_map(defs)
    rec = set()
    for w in defs:
        # DFS from w looking for w.
        stack = list(succ.get(w, ()))
        seen_dfs = set()
        while stack:
            v = stack.pop()
            if v == w:
                rec.add(w)
                break
            if v in seen_dfs:
                continue
            seen_dfs.add(v)
            stack.extend(succ.get(v, ()))
    return rec

def _rec_deps_of(word, defs, rec_words=None, succ=None):
    """Recursive words reachable from `word` (v37, including itself
    when recursive): the `self_*` params its Prog/def needs."""
    if rec_words is None or succ is None:
        if succ is None:
            succ = _succ_map(defs)
        if rec_words is None:
            rec_words = _compute_rec_words(defs, succ)
    out = set()
    stack = [word]
    seen_dfs = set()
    while stack:
        v = stack.pop()
        if v in seen_dfs:
            continue
        seen_dfs.add(v)
        if v in rec_words:
            out.add(v)
        stack.extend(succ.get(v, ()))
    return out

def _inline_tokens(tokens, defs, seen, frontier=None):
    """Inline a token list (a definition body or a literal's
    contents). Returns (prog, lits, raw_lits): prog is the flat
    token list (ints, primitive names, ("lit", k) markers for
    quotation literals, ("call", word) markers for recursive calls);
    lits is the list of literal-body programs (inlined, in the same
    format), collected INNERMOST-FIRST (when inlining a literal,
    its contents are inlined first -- which may append inner
    literals -- then this literal's body); raw_lits is the list of
    raw inner-token lists, parallel to lits (raw_lits[k] is the tokens
    as written inside literal k's brackets -- needed to tell a
    single-word literal `[sip]` from a multi-token one). A literal's
    markers are remapped to their positions in the outer `lits` as
    they are collected. (v37) A call to a word already on the `seen`
    stack (a recursive call) emits a ("call", word) marker for
    `Tok.call self_<word>` instead of raising ValueError.
    `frontier` (default: the rec-reaching words) also emits call
    markers instead of inlining: fbm_verify composes the callee's
    proven lemma at the call boundary rather than re-peeling a
    body whose induction lives elsewhere."""
    if frontier is None:
        frontier = _compute_rec_frontier(defs)
    out = []
    lits = []
    raw_lits = []
    for tok in tokens:
        if isinstance(tok, str) and tok.startswith("["):
            inner = _literal_inner_tokens(tok)
            body_prog, body_lits, body_raws = _inline_tokens(inner, defs, seen, frontier)
            base = len(lits)
            lits.extend(body_lits)
            raw_lits.extend(body_raws)
            remapped = []
            for t in body_prog:
                if isinstance(t, tuple) and t[0] == "lit":
                    remapped.append(("lit", base + t[1]))
                else:
                    remapped.append(t)
            lits.append(remapped)
            raw_lits.append(inner)
            out.append(("lit", len(lits) - 1))
        elif isinstance(tok, int) or tok in PRIMS:
            out.append(tok)
        elif isinstance(tok, str) and tok in defs:
            if tok in seen or tok in frontier:
                out.append(("call", tok))
            else:
                sub_prog, sub_lits, sub_raws = inline_word(tok, defs, seen, frontier)
                base = len(lits)
                lits.extend(sub_lits)
                raw_lits.extend(sub_raws)
                for t in sub_prog:
                    if isinstance(t, tuple) and t[0] == "lit":
                        out.append(("lit", base + t[1]))
                    else:
                        out.append(t)
        else:
            raise ValueError(f"unsupported token {tok!r}")
    return out, lits, raw_lits


def inline_word(name, defs, seen=(), frontier=None):
    """Inline a defined word. Returns (prog, lits, raw_lits)
    (see _inline_tokens). (v37) Recursive calls (a word already on
    `seen`, or on the rec-reaching `frontier`) emit ("call", word)
    markers instead of raising ValueError. (v30: the third element,
    the raw inner-token lists, is what the runQ path uses to tell a
    single-word literal `[sip]` -- whose body is the word's `Prog`
    def -- from a multi-token literal, whose body is a literal
    list.)"""
    if frontier is None:
        frontier = _compute_rec_frontier(defs)
    if name in seen:
        # (v37) Recursive call: a marker for `Tok.call self_<name>`
        # instead of infinite inlining. The caller (`_inline_tokens`)
        # normally intercepts this case first (including frontier
        # words, which always emit call markers there); this branch
        # covers direct calls.
        return [("call", name)], [], []
    if name not in defs:
        raise ValueError(f"unknown word {name!r}")
    return _inline_tokens(defs[name], defs, seen + (name,), frontier)


QUOT_TOKENS = ("eval", "?", "cons")


def _tokens_use_quot(tokens, defs, seen):
    """True when a token list (a definition body or a literal's
    contents) transitively contains a quotation token (eval / ? /
    cons). Literals are searched recursively (v30); recursion is
    ignored here -- `inline_word` in the runQ path refuses it as a
    clean problem. `seen` is the words already on the recursion
    stack (their names)."""
    for tok in tokens:
        if isinstance(tok, str) and tok in QUOT_TOKENS:
            return True
        if isinstance(tok, str) and tok.startswith("["):
            try:
                inner = _literal_inner_tokens(tok)
            except ValueError:
                continue
            if _tokens_use_quot(inner, defs, seen):
                return True
            continue
        if isinstance(tok, int) or tok in PRIMS:
            continue
        if isinstance(tok, str) and tok in defs and _uses_quot_token(tok, defs, seen):
            return True
    return False


def _uses_quot_token(name, defs, seen=()):
    """True when a defined word's transitive definition contains a
    quotation token (eval / ? / cons). Used to route such words to
    the runQ path before the standard rest validation, which would
    reject their differing input/output rests. Quotation literals
    are searched too (v30) -- a literal containing eval routes the
    word to runQ. Recursion is ignored here -- `inline_word` in
    the runQ path refuses it as a clean problem."""
    if name in seen or name not in defs:
        return False
    return _tokens_use_quot(defs[name], defs, seen + (name,))


# Tokens the runQ prefix/suffix simulator understands. These only
# shuffle the stack or move a value between the stack and the
# queue; they never compute a new value, draw from the oracle, or
# perform IO. Any other token in a runQ prefix/suffix is a clean
# problem (the simulator cannot name the value it would push).
# (An inlined program contains only primitives and ints, so
# `over`/`rot`/`nip`/`tuck` never appear here -- they are defined
# words, inlined away to `swap`/`dup`/`drop`/`q<`/`q>`.)
_RUNQ_SIM_TOKENS = {
    "swap", "dup", "drop",
    "q<", "q>", "nop",
}


# Comparison tokens the shape pass understands:
# they pop two values and push a Lean if-expression, `(if a < b
# then 1 else 0)` -- the flag a `?` splits on. Only `<`, `=`,
# `>` can appear in an inlined program (they are the F♭m
# comparison primitives); `<=`, `>=`, `!=` are accepted for
# completeness. The Lean operators are the pretty forms (`≤`,
# `≥`, `≠`); `<=`/`>=` would also parse, but `!=` in Lean is
# boolean, not the proposition, so it is never emitted here.
_COND_CMP_OPS = {
    "<": "<", "=": "=", ">": ">",
    "<=": "≤", ">=": "≥", "!=": "≠",
}


def _shape_runq(tokens, stack, stack_rest, queue, queue_tail):
    """Track the statement shape of `tokens` on a symbolic stack
    and queue (lean-generator-cleanup: a fuel-free statement-shape
    pass). Handles only stack shuffles, `q<` / `q>`,
    and literals -- the tokens allowed in a runQ prefix/suffix.
    Returns (stack, stack_rest, queue, queue_tail). Raises
    ValueError for an unsupported token or an underflow. No fuel
    is counted and no proof steps are simulated."""
    stack = list(stack)
    queue = list(queue)
    for tok in tokens:
        if isinstance(tok, int):
            stack.append(str(tok))
            continue
        if tok == "nop":
            continue
        if tok == "swap":
            if len(stack) < 2:
                raise ValueError("swap underflows the stack in a runQ prefix/suffix")
            stack[-1], stack[-2] = stack[-2], stack[-1]
            continue
        if tok == "dup":
            if not stack:
                raise ValueError("dup underflows the stack in a runQ prefix/suffix")
            stack.append(stack[-1])
            continue
        if tok == "drop":
            if not stack:
                raise ValueError("drop underflows the stack in a runQ prefix/suffix")
            stack.pop()
            continue
        if tok == "q<":
            if not stack:
                raise ValueError("q< underflows the stack in a runQ prefix/suffix")
            queue.insert(0, stack.pop())
            continue
        if tok == "q>":
            if not queue:
                raise ValueError("q> underflows the queue in a runQ prefix/suffix")
            stack.append(queue.pop(0))
            continue
        raise ValueError(
            f"token {tok!r} is not supported in a runQ prefix/suffix "
            f"(only stack shuffles, q< / q>, and literals are)")
    return stack, stack_rest, queue, queue_tail


def _shape_runq_expanded(tokens, lits, stack, stack_rest, queue, queue_tail):
    """Track the statement shape with literal splicing
    (lean-generator-cleanup: a fuel-free statement-shape pass).
    `tokens` may contain ("lit", k)
    markers; when `eval` dispatches on one, the literal's body
    is spliced in front of the remaining tokens and    tracking
    continues. Stops at the first `eval` whose stack top is a
    variable. Returns (stack, stack_rest, queue, queue_tail,
    steps, remaining): the state at the dispatch point (the
    quotation code still on top) and the tokens not yet consumed
    (the suffix). `steps` is always 0 (fuel counting was removed;
    kept only so call sites keep their tuple shape). Raises
    ValueError for an unsupported token, an underflow, or no
    eval on a variable quotation."""
    stack = list(stack)
    queue = list(queue)
    rest = list(tokens)
    lit_names = {f"lit{k}" for k in range(len(lits))}
    while True:
        if not rest:
            raise ValueError(
                "the expanded program has no eval on a variable "
                "quotation (the eval dispatches only on literals)")
        tok = rest.pop(0)
        if tok == "eval":
            if not stack:
                raise ValueError("eval underflows the stack in a runQ prefix")
            top = stack[-1]
            if top in lit_names:
                k = int(top[3:])
                stack.pop()
                rest = list(lits[k]) + rest
                continue
            if top.lstrip("-").isdigit():
                raise ValueError(
                    "eval on an integer in a runQ prefix (the quotation "
                    "code must be a variable or a literal)")
            return stack, stack_rest, queue, queue_tail, 0, rest
        if isinstance(tok, tuple) and tok[0] == "lit":
            stack.append(f"lit{tok[1]}")
            continue
        if isinstance(tok, int):
            stack.append(str(tok))
            continue
        if tok == "nop":
            continue
        if tok == "swap":
            if len(stack) < 2:
                raise ValueError("swap underflows the stack in a runQ prefix")
            stack[-1], stack[-2] = stack[-2], stack[-1]
            continue
        if tok == "dup":
            if not stack:
                raise ValueError("dup underflows the stack in a runQ prefix")
            stack.append(stack[-1])
            continue
        if tok == "drop":
            if not stack:
                raise ValueError("drop underflows the stack in a runQ prefix")
            stack.pop()
            continue
        if tok == "q<":
            if not stack:
                raise ValueError("q< underflows the stack in a runQ prefix")
            queue.insert(0, stack.pop())
            continue
        if tok == "q>":
            if not queue:
                raise ValueError("q> underflows the queue in a runQ prefix")
            stack.append(queue.pop(0))
            continue
        raise ValueError(
            f"token {tok!r} is not supported in a runQ prefix/suffix "
            f"(only stack shuffles, q< / q>, and literals are)")


def _shape_runq_cond(tokens, stack, stack_rest, queue, queue_tail, stop_at_cond=True):
    """Track the statement shape with comparisons (lean-generator-
    cleanup: a fuel-free statement-shape pass).
    Like `_shape_runq`, but comparison tokens push a Lean
    if-expression, total arithmetic/bitwise tokens push a Lean
    expression, and literal markers push their code variables.
    With stop_at_cond it stops at the first `?` and returns
    (stack, stack_rest, queue, queue_tail, steps, remaining).
    With stop_at_cond False it tracks the whole list (a `?`
    there is a ValueError) and returns the same tuple with
    remaining []. `steps` is always 0 (fuel counting was
    removed; kept only so call sites keep their tuple shape).
    Raises ValueError for an unsupported token or an
    underflow."""
    stack = list(stack)
    queue = list(queue)
    for i, tok in enumerate(tokens):
        if tok == "?":
            if stop_at_cond:
                return (stack, stack_rest, queue, queue_tail, 0,
                        list(tokens[i + 1:]))
            raise ValueError(
                "? is not supported in a runQ cond body/suffix "
                "(one ? at a time)")
        if isinstance(tok, tuple) and tok[0] == "lit":
            stack.append(f"lit{tok[1]}")
        elif isinstance(tok, int):
            stack.append(str(tok))
        elif tok == "nop":
            pass
        elif tok == "swap":
            if len(stack) < 2:
                raise ValueError("swap underflows the stack in a runQ cond prefix")
            stack[-1], stack[-2] = stack[-2], stack[-1]
        elif tok == "dup":
            if not stack:
                raise ValueError("dup underflows the stack in a runQ cond prefix")
            stack.append(stack[-1])
        elif tok == "drop":
            if not stack:
                raise ValueError("drop underflows the stack in a runQ cond prefix")
            stack.pop()
        elif tok == "q<":
            if not stack:
                raise ValueError("q< underflows the stack in a runQ cond prefix")
            queue.insert(0, stack.pop())
        elif tok == "q>":
            if not queue:
                raise ValueError("q> underflows the queue in a runQ cond prefix")
            stack.append(queue.pop(0))
        elif isinstance(tok, str) and tok in _COND_CMP_OPS:
            if len(stack) < 2:
                raise ValueError(f"{tok} underflows the stack in a runQ cond prefix")
            b = stack.pop()
            a = stack.pop()
            stack.append(f"(if {a} {_COND_CMP_OPS[tok]} {b} then 1 else 0)")
        elif tok == "~":
            # Total arithmetic/bitwise ops (compositional-callee-lemmas):
            # they pop values and push a Lean expression, exactly as
            # `_emit_expr` renders them, so a `?` body like `[-1 *]`
            # simulates. Only total ops qualify: `/`, `%`, `^` are
            # guarded (fail on zero/negative) and stay unsupported.
            if not stack:
                raise ValueError("~ underflows the stack in a runQ cond prefix")
            a = stack.pop()
            stack.append(f"(lnot ({a}))")
        elif tok in ("+", "-", "*", "&", "|", "<<", ">>"):
            if len(stack) < 2:
                raise ValueError(f"{tok} underflows the stack in a runQ cond prefix")
            b = stack.pop()
            a = stack.pop()
            if tok == "+":
                stack.append(f"({a} + {b})")
            elif tok == "-":
                stack.append(f"({a} - {b})")
            elif tok == "*":
                stack.append(f"({a} * {b})")
            elif tok == "&":
                stack.append(f"(land ({a}) ({b}))")
            elif tok == "|":
                stack.append(f"(lor ({a}) ({b}))")
            elif tok == "<<":
                stack.append(f"(shl ({a}) ({b}))")
            else:
                stack.append(f"(shr ({a}) ({b}))")
        else:
            raise ValueError(
                f"token {tok!r} is not supported in a runQ cond prefix "
                f"(only stack shuffles, q< / q>, comparisons, total "
                f"arithmetic/bitwise ops, and literals are)")
    if stop_at_cond:
        raise ValueError(
            "the program has no ? dispatch (the cond path needs one)")
    return stack, stack_rest, queue, queue_tail, 0, []


def _shape_runq_between(tokens, lits, stack, stack_rest, queue, queue_tail):
    """Track the statement shape with literal splicing up to `?`
    (lean-generator-cleanup: a fuel-free statement-shape pass).
    Like `_shape_runq_cond`, but `eval`
    on a literal splices that literal's body in front of the
    remaining tokens (like `_shape_runq_expanded`). Returns
    (stack, stack_rest, queue, queue_tail, steps, remaining,
    eval_lit). `steps` is always 0 (fuel counting was removed;
    kept only so call sites keep their tuple shape). Raises
    ValueError for an unsupported token, an underflow, an eval
    on a variable quotation, or no `?` dispatch."""
    stack = list(stack)
    queue = list(queue)
    rest = list(tokens)
    eval_lit = None
    lit_names = {f"lit{k}" for k in range(len(lits))}
    while True:
        if not rest:
            raise ValueError(
                "the program has no ? dispatch (the between? path "
                "needs one inside the literal body)")
        tok = rest.pop(0)
        if tok == "?":
            return (stack, stack_rest, queue, queue_tail, 0, rest,
                    eval_lit)
        if tok == "eval":
            if not stack:
                raise ValueError("eval underflows the stack in a runQ between prefix")
            top = stack[-1]
            if top in lit_names:
                eval_lit = int(top[3:])
                stack.pop()
                rest = list(lits[eval_lit]) + rest
                continue
            if top.lstrip("-").isdigit():
                raise ValueError(
                    "eval on an integer in a runQ between prefix (the "
                    "quotation code must be a literal)")
            raise ValueError(
                "eval on a variable quotation in a runQ between prefix "
                "(the eval must run a literal)")
        if isinstance(tok, tuple) and tok[0] == "lit":
            stack.append(f"lit{tok[1]}")
            continue
        if isinstance(tok, int):
            stack.append(str(tok))
            continue
        if tok == "nop":
            continue
        if tok == "swap":
            if len(stack) < 2:
                raise ValueError("swap underflows the stack in a runQ between prefix")
            stack[-1], stack[-2] = stack[-2], stack[-1]
            continue
        if tok == "dup":
            if not stack:
                raise ValueError("dup underflows the stack in a runQ between prefix")
            stack.append(stack[-1])
            continue
        if tok == "drop":
            if not stack:
                raise ValueError("drop underflows the stack in a runQ between prefix")
            stack.pop()
            continue
        if tok == "q<":
            if not stack:
                raise ValueError("q< underflows the stack in a runQ between prefix")
            queue.insert(0, stack.pop())
            continue
        if tok == "q>":
            if not queue:
                raise ValueError("q> underflows the queue in a runQ between prefix")
            stack.append(queue.pop(0))
            continue
        if isinstance(tok, str) and tok in _COND_CMP_OPS:
            if len(stack) < 2:
                raise ValueError(f"{tok} underflows the stack in a runQ between prefix")
            b = stack.pop()
            a = stack.pop()
            stack.append(f"(if {a} {_COND_CMP_OPS[tok]} {b} then 1 else 0)")
            continue
        raise ValueError(
            f"token {tok!r} is not supported in a runQ between prefix "
            f"(only stack shuffles, q< / q>, comparisons, and literals are)")


def _stack_lean(elems, rest):
    """A simulated stack (bottom-to-top elements + rest name or
    None) as a Lean list expression."""
    return lean_list_bottom_to_top(elems, rest)


def _queue_lean(front, tail):
    """A simulated queue (head-first elements + tail variable) as
    a Lean list expression."""
    if not front:
        return tail
    return _cons_chain(front, tail)


@dataclass
class EmitCtx:
    """Per-effect state for theorem emission.

    `prepare()` runs the validations (ERROR, where, rest, if/then/else,
    translation, witnesses) and computes the program and the derived
    Lean fragments; it returns False when a clean problem was recorded
    (no theorem for this effect). `emit()` writes the program def
    (once per word), the doc comment, and the theorem, dispatching on
    the word/effect kind; it returns True when a theorem was emitted.
    A new word kind is a new `emit_*` function plus one dispatch line.
    """
    # Inputs (one entry).
    name: str
    idx: int
    n_effects: int
    in_elems: list
    out_elems: list
    cond: str | None
    where_text: str | None
    effect_body: str
    src_line: int
    src_path: str
    src_effect: str
    # Shared state (mutated across entries).
    defs: dict
    progs: dict
    prog_tokens: dict
    prog_lits: dict
    prog_raw_lits: dict
    prog_lit_params: dict
    prog_self_vars: dict
    failed: set
    prog_emitted: set
    out_lines: list
    problems: list
    # Rec-call-graph cache, computed ONCE per run in main() and shared
    # across entries (same defs for the whole run). None means "not
    # provided": _rec_cache() computes it lazily, exactly as before.
    rec_words: set | None = None
    rec_frontier: set | None = None
    rec_succ: dict | None = None
    # Generalized compositional frontier, computed ONCE per run in main()
    # and shared across entries (same effects for the whole run): every
    # word carrying an @effect. A `?` inlined from an annotated callee
    # stays behind that callee's `Prog ++` boundary (the cond-path region
    # test consults this); the `Tok.call` path for recursive words is a
    # separate frontier for a separate reason (induction, not reuse).
    annotated: set | None = None
    # Computed by prepare().
    ln: str = ""
    is_error: bool = False
    where_eqs: list | None = None
    rand_where_text: str | None = None
    getc_where_text: str | None = None
    in_vars: list = field(default_factory=list)
    out_vars: list = field(default_factory=list)
    cond_lean: str | None = None
    witnesses: list | None = None
    in_rest: bool = True
    out_rest: bool = True
    out_rest_idx: int | None = None
    in_lean: str = ""
    existential: list = field(default_factory=list)
    binder_part: str = ""
    rest_binder: str = ""
    rest_name: str = "rest"
    hw_binder: str = ""
    simp_args: str = ""
    hguard_line: str | None = None
    oracle_binder: str = ""
    oracle_arg: str = "[]"
    suffix: str = ""
    # (v37) Proof-clause overrides from `@by-proof` / `@by-induction`
    # (+ assumed-effects `@assume` justification).
    by_proof: str | None = None
    by_induction: str | None = None
    by_assume: str | None = None
    # Computed by _prepare_recursive() (recursive words only).
    is_recursive: bool = False
    rec_self_vars: list = field(default_factory=list)
    rec_lit_bodies: list = field(default_factory=list)
    rec_lit_words: list = field(default_factory=list)
    rec_deps_sorted: list = field(default_factory=list)
    rec_frontier_sorted: list = field(default_factory=list)
    rec_fun_slots: list = field(default_factory=list)
    # Computed by prepare_quot() (quotation words only).
    is_quot: bool = False
    quot_kind: str = ""
    quot_q: str = ""
    quot_body: str = ""
    quot_a: str = ""
    quot_b: str = ""
    quot_flag: str = ""
    quot_in_rest: str = ""
    quot_out_rest: str = ""
    quot_cond_lean: str | None = None
    quot_in_stack: str = ""
    quot_out_stack: str = ""
    quot_defs_prime: str = ""
    quot_hyps: list = field(default_factory=list)
    quot_intro: str | None = None
    quot_simp: str = ""
    quot_finish: str | None = None
    # Computed by _prepare_runq() (defined words containing a
    # quotation token, Phase 6). The theorem is a runQ theorem
    # (execQ with a queue variable `qq`), proved by applying the
    # callee's quotation theorem as a lemma via execQ_append.
    is_runq: bool = False
    runq_quot_tok: str = ""
    runq_q: str = ""
    runq_body: str = ""
    runq_in_stack: str = ""
    runq_out_stack: str = ""
    runq_body_in_stack: str = ""
    runq_body_out_rest: str = ""
    runq_queue_dispatch: str = ""
    runq_suffix_lean: str = ""
    runq_suffix_len: int = 0
    runq_total_fuel: str = ""
    runq_binders: str = ""
    runq_hyps: list = field(default_factory=list)
    runq_intro: str = ""
    runq_proof: list = field(default_factory=list)
    # Computed by _prepare_runq() (v30): the literal bodies of
    # this word's program, the code variables bound for them,
    # and the Prog application in the theorem's conclusion
    # (`sipdProg lit0` when there are literals, `slipProg` when
    # there are none).
    runq_lits: list = field(default_factory=list)
    runq_lit_vars: list = field(default_factory=list)
    runq_prog_app: str = ""
    # Words named by single-word literal bodies (v30): their Prog
    # defs are emitted alongside this theorem's Prog def, even when
    # they have no effect of their own.
    runq_lit_words: list = field(default_factory=list)
    # Computed by _prepare_runq_cond() (defined words containing
    # `?`, v31). Like is_runq, but the theorem has a fixed fuel
    # (no fuel binder), no body binder or hypothesis, and a
    # by_cases proof. The runQ input/output stacks, literal
    # variables, and Prog application are reused from the runQ
    # fields above.
    is_runq_cond: bool = False
    runq_cond_fuel: int = 0
    runq_cond_binders: str = ""
    runq_cond_hyps: list = field(default_factory=list)
    runq_cond_intro: str = ""
    runq_cond_proof: list = field(default_factory=list)
    # Computed by _prepare_runq_direct() (defined words containing
    # `?` and `eval`, v32). Like is_runq_cond, but the theorem is
    # proved by direct simp (the cond reduces via the literal
    # lookup, the eval dispatch via the quotation lookup), with a
    # fuel binder and body hypotheses for the two variable
    # quotations. The runQ input/output stacks, literal
    # variables, and Prog application are reused from the runQ
    # fields above.
    is_runq_direct: bool = False
    runq_direct_fuel: str = ""
    runq_direct_binders: str = ""
    runq_direct_hyps: list = field(default_factory=list)
    runq_direct_intro: str = ""
    runq_direct_proof: list = field(default_factory=list)
    runq_direct_in_stack: str = ""
    runq_direct_out_stack: str = ""
    # Computed by _prepare_runq_between() (a defined word that
    # runs a literal [W] via eval, where W itself contains one
    # `?`, v33). Like is_runq_cond, but the theorem is proved by
    # direct simp with a trichotomy case split on the `?`'s
    # computed flag, and the `?` lives inside W's program (which
    # is spliced in at the eval). The runQ input/output stacks,
    # literal variables, and Prog application are reused from
    # the runQ fields above.
    is_runq_between: bool = False
    runq_between_fuel: int = 0
    runq_between_binders: str = ""
    runq_between_hyps: list = field(default_factory=list)
    runq_between_intro: str = ""
    runq_between_proof: list = field(default_factory=list)
    runq_between_in_stack: str = ""
    runq_between_out_stack: str = ""
    # Computed by _prepare_runq_compose() (a defined word with
    # exactly TWO evals on variable quotations, v34). The general
    # composer: the program is split at each eval into segments,
    # each eval's body becomes a `p1` in an execQ_append
    # application, and the remainder (including later evals) is
    # `p2`, proved by a nested application. The body hypotheses
    # are universally quantified over the leftover input/oracle
    # (they run mid-program, so execQ_append's h1 needs them at
    # the current inp/orc). Defs are unchanged (no cons in the
    # bodies). The Rest1 def (the program after the first eval's
    # body) is emitted alongside the Prog defs.
    is_runq_compose: bool = False
    runq_compose_total_fuel: str = ""
    runq_compose_binders: str = ""
    runq_compose_hyps: list = field(default_factory=list)
    runq_compose_intro: str = ""
    runq_compose_proof: list = field(default_factory=list)
    runq_compose_in_stack: str = ""
    runq_compose_out_stack: str = ""
    runq_compose_rest_name: str = ""
    runq_compose_rest_lean: str = ""
    # Computed by _prepare_runq_computed_flag() (a defined word
    # that runs a quotation B via a [sip swap]-style dip, then a
    # branch whose flag is B's single output value, where one
    # branch arm is a concrete literal and the other is [eval]
    # running C, v36). The theorem's conclusion carries the
    # `where` if-expression directly (no runQ rest), and the
    # proof is an execQ_append for B, a by_cases on the flag,
    # and either a direct simp (concrete arm) or a second
    # execQ_append for C (the [eval] arm). The runQ input/output
    # stacks, literal variables, and Prog application are reused
    # from the runQ fields above.
    is_runq_computed_flag: bool = False
    runq_cf_total_fuel: str = ""
    runq_cf_binders: str = ""
    runq_cf_hyps: list = field(default_factory=list)
    runq_cf_intro: str = ""
    runq_cf_proof: list = field(default_factory=list)
    runq_cf_in_stack: str = ""
    runq_cf_out_stack: str = ""

    def problem(self, msg):
        """Record a clean problem for this effect: a comment in place
        of a theorem, plus a stderr note. Returns False."""
        self.problems.append(f"{self.name}: {msg}")
        self.out_lines.append(f"-- {self.ln}: no theorem emitted (src {self.src_path}:{self.src_line}): {msg}")
        self.out_lines.append("")
        return False

    def _rec_cache(self, rec_words=None, frontier=None, succ=None):
        """The run's (succ, rec_words, frontier), preferring explicit
        args, then the shared main() cache, computing (and NOT storing
        per-effect) only what is still missing. Never raises: on
        error each missing piece falls back to empty, matching the
        old per-effect try/except call sites."""
        s = succ if succ is not None else self.rec_succ
        r = rec_words if rec_words is not None else self.rec_words
        f = frontier if frontier is not None else self.rec_frontier
        try:
            if s is None:
                s = _succ_map(self.defs)
            if r is None:
                r = _compute_rec_words(self.defs, s)
            if f is None:
                f = _compute_rec_frontier(self.defs, r, s)
        except Exception:
            if s is None:
                s = {}
            if r is None:
                r = set()
            if f is None:
                f = set()
        return s, r, f

    def _frontier_cached(self):
        """The run's rec-reaching frontier (cached; computed lazily
        only when main() did not provide it)."""
        return self._rec_cache()[2]

    def _gen_frontier_cached(self):
        """The run's generalized compositional frontier (cached): words
        carrying an @effect in this run. Calls to these words emit
        callee-`Prog` `++` references (see `_comp_prog_lean`); the
        cond-path region test treats a `?` inlined from one as staying
        behind its boundary. Unannotated callees stay fully inlined
        (transparent to the simulators); recursive words keep their
        `Tok.call` path via the rec frontier above."""
        return self.annotated if self.annotated is not None else set()

    def _compute_prog(self, name):
        """Build and cache a word's program (v30). Returns
        (prog, lits, raw_lits), or None after recording a clean
        problem. The Lean list string, the literal bodies, the raw
        literal tokens, and the Prog-def parameter string are cached
        alongside (progs / prog_tokens / prog_lits / prog_raw_lits /
        prog_lit_params). A literal marker in the program becomes
        `Tok.push lit{k}` in the Lean list."""
        if name in self.progs:
            return (self.prog_tokens[name], self.prog_lits[name],
                    self.prog_raw_lits[name])
        if name in self.defs:
            try:
                prog, lits, raw_lits = inline_word(name, self.defs, frontier=self._frontier_cached())
            except ValueError as ex:
                self.failed.add(name)
                self.problem(str(ex))
                return None
        elif name in PRIMS:
            prog, lits, raw_lits = [name], [], []
        else:
            self.failed.add(name)
            self.problem(
                "unknown word -- no definition in this file and not a primitive")
            return None
        self.prog_tokens[name] = prog
        self.prog_lits[name] = lits
        self.prog_raw_lits[name] = raw_lits
        try:
            comp = self._comp_prog_lean(name)
        except ValueError as ex:
            self.failed.add(name)
            self.problem(str(ex))
            return None
        self.progs[name] = comp
        # (v37) Prog defs whose compositional body mentions a recursive
        # `self_*` code variable (a frontier call kept opaque) take those
        # as `(self_* : Int)` params ahead of the lit params.
        self_vars = sorted(set(re.findall(r"self_[A-Za-z0-9_']+", comp)))
        self_part = "".join(f" ({v} : Int)" for v in self_vars)
        self.prog_self_vars[name] = self_vars
        self.prog_lit_params[name] = self_part + (
            f" ({' '.join(f'lit{i}' for i in range(len(lits)))} : Int)"
            if lits else "")
        return prog, lits, raw_lits

    def _comp_prog_lean(self, name):
        """Compositional Prog expression (Phase B): `++` over
        callee `Prog` defs instead of a flat token list. Each raw
        definition token becomes one segment: a literal `[...]`
        becomes `[Tok.push lit{k}]` (its self index, after its
        inner literals, matching `_inline_tokens` order); an int
        or primitive becomes its singleton; a defined word `W`
        becomes `WProg` applied to `W`'s share of the outer lit
        variables (in order) plus `W`'s own `self_*` params (same
        global names, bound by every frontier caller). Primitive
        words are singletons. (v37) A direct self-reference
        (`tok == name`, a bare recursive call at top level), or any
        callee on the rec-reaching frontier, becomes
        `[Tok.call self_<tok>]` instead of delegating: fbm_verify
        composes the callee's proven lemma at the opaque call
        boundary rather than re-peeling a body whose induction
        lives elsewhere. The generalized frontier (annotated words)
        needs no separate marker here: every non-frontier defined
        callee emits a callee-`Prog` `++` reference, which is exactly
        the boundary the generalized rule requires; unannotated
        callees (no lemma to compose) still get that `Prog` boundary
        while staying fully inlined at the flat simulation level."""
        if name in PRIMS:
            return f"[{PRIMS[name]}]"
        try:
            frontier = self._frontier_cached()
        except Exception:
            frontier = set()
        parts = []
        next_lit = 0
        for tok in self.defs[name]:
            if isinstance(tok, str) and tok.startswith("["):
                inner = _literal_inner_tokens(tok)
                # (v37) Count inner lits with `name` on the seen stack so
                # recursive `[name]` inside matches the inlined program
                # (call marker, not full inlining).
                _, inner_lits, _ = _inline_tokens(inner, self.defs, (name,), frontier)
                m = len(inner_lits)
                parts.append(f"[Tok.push lit{next_lit + m}]")
                next_lit += m + 1
            elif isinstance(tok, int) or tok in PRIMS:
                parts.append(f"[{_tok_lean(tok)}]")
            elif isinstance(tok, str) and tok in self.defs:
                if tok == name or tok in frontier:
                    parts.append(f"[Tok.call {_self_var(tok)}]")
                    continue
                got_w = self._compute_prog(tok)
                if got_w is None:
                    raise ValueError(f"cannot build program for {tok!r}")
                _, wlits, _ = got_w
                m = len(wlits)
                wln = lean_name(tok)
                wself = " ".join(self.prog_self_vars.get(tok, []))
                if m:
                    args = " ".join(f"lit{next_lit + k}" for k in range(m))
                    parts.append(f"{wln}Prog" + (f" {wself}" if wself else "") + f" {args}")
                else:
                    parts.append(f"{wln}Prog" + (f" {wself}" if wself else ""))
                next_lit += m
            else:
                raise ValueError(f"unsupported token {tok!r}")
        if next_lit != len(self.prog_lits[name]):
            raise ValueError(
                f"literal count mismatch for {name!r}: "
                f"{next_lit} walked vs {len(self.prog_lits[name])} inlined")
        return " ++ ".join(parts)

    def _prepare_recursive(self, rec_words=None, frontier=None, succ=None):
        """Recursive word (v37): `Tok.call` + `lookup defs` hypotheses,
        arbitrary-position `..R` / list-splice outputs, `@by-proof` /
        `@by-induction` proofs. No shape simulation (the proof is manual).
        Supports one functional quotation slot `[X -- F X]` (the
        `_loop` family): `B` maps `X :: R` to `(F X) :: X :: R`.
        Other slot forms (runQ-style) stay clean problems. Returns
        True when ready to emit."""
        name = self.name
        in_elems, out_elems = self.in_elems, self.out_elems
        cond, where_text = self.cond, self.where_text
        if self.is_error:
            return self.problem("a recursive effect cannot be an ERROR effect")
        fun_slots = []  # (elem, X, F) for input functional slots, in order
        for e in in_elems:
            s = _parse_quot_slot(e)
            if s is not None:
                if s[0] != "fun":
                    return self.problem(
                        f"recursive effect slot {e!r} is not a functional "
                        f"`[X -- F X]` slot (runQ-style slots are not supported "
                        f"on recursive words)")
                _, X, F = s
                if X == F:
                    return self.problem(
                        f"functional slot {e!r} needs distinct names "
                        f"(`[X -- F X]` with X ≠ F)")
                fun_slots.append((e, X, F))
        if len(fun_slots) > 1:
            return self.problem(
                "a recursive effect takes at most one functional slot yet")
        fun_elems = {e for e, _, _ in fun_slots}
        for e in out_elems:
            s = _parse_quot_slot(e)
            if s is not None:
                if s[0] != "fun" or e not in fun_elems:
                    return self.problem(
                        "a recursive output slot must repeat an input "
                        f"functional slot (found {e!r})")
                continue
            if e.startswith("["):
                return self.problem(
                    f"a recursive effect takes no quotation element {e!r}")
        self.rec_fun_slots = []
        if fun_slots:
            used_q = set(_effect_vars(in_elems + out_elems + ([cond] if cond else [])
                                     + ([where_text] if where_text else [])))
            # Uppercase: a lowercase code variable would be misread as
            # a list splice (bare lowercase identifier) in outputs.
            q_var = "Q"
            while q_var in used_q:
                q_var += "_"
            body_var = "body"
            while body_var in used_q:
                body_var += "_"
            e, X, F = fun_slots[0]
            self.rec_fun_slots = [(q_var, body_var, X, F)]
        if name in self.failed:
            return False
        got = self._compute_prog(name)
        if got is None:
            return False
        prog, lits, raw_lits = got
        # Rest validation (v37 output rules: input far-left only, output
        # anywhere; named rest required for non-leading outputs).
        def named_rest(tok):
            m = re.fullmatch(r"\.\.([A-Za-z_][A-Za-z0-9_]*)", tok or "")
            return m.group(1) if m else None
        in_first = in_elems[0] if in_elems else None
        out_first = out_elems[0] if out_elems else None
        in_empty = in_first == "∅"
        out_empty = out_first == "∅"
        if "∅" in in_elems[1:] or "∅" in out_elems[1:]:
            return self.problem("∅ is only allowed at the far left (the rest position)")
        if any(named_rest(e) is not None for e in in_elems[1:]):
            return self.problem("a named rest (..r) is only allowed at the far left on the input")
        if any(e == "..." for e in out_elems[1:]):
            return self.problem("'...' is only allowed at the far left (the rest position)")
        in_named = named_rest(in_first)
        out_nameds = [named_rest(e) for e in out_elems if named_rest(e) is not None]
        if len(out_nameds) > 1:
            return self.problem("the output names more than one rest")
        out_named = out_nameds[0] if out_nameds else None
        if out_named is not None and in_named is None and not in_empty:
            return self.problem(
                f"the output names a rest ..{out_named} that the input does not name")
        if in_named is not None and out_named is not None and in_named != out_named:
            return self.problem(
                f"the rest is named ..{in_named} on the input and ..{out_named} on the output")
        self.rest_name = in_named or out_named or "rest"
        self.in_rest = not in_empty
        self.out_rest = (out_first == "..." or out_named is not None) or (
            not out_empty and not in_empty and not (in_first == "..." or in_named is not None))
        self.out_rest_idx = None
        if out_named is not None:
            for _i, _e in enumerate(out_elems):
                if named_rest(_e) == out_named:
                    self.out_rest_idx = _i
                    break
        is_rest_tok = lambda e: e in ("...", "∅") or named_rest(e) is not None
        fun_q = self.rec_fun_slots[0][0] if self.rec_fun_slots else None
        self.in_vars = [(fun_q if e in fun_elems else e) for e in in_elems
                        if not is_rest_tok(e)]
        self.out_vars = [(fun_q if e in fun_elems else e) for e in out_elems
                         if not is_rest_tok(e)]
        # Length / where / translation (mirrors the standard path, v37
        # output rules for list splices).
        for e in self.out_vars + ([cond] if cond else []) + ([where_text] if where_text else []):
            for m in re.finditer(r"([A-Za-z_][A-Za-z0-9_]*)\s*\.\s*length\b", e):
                if m.group(1) != self.rest_name or self.rest_name == "rest":
                    return self.problem(f"{m.group(1)}.length is not the length of a named rest")
            for m in re.finditer(r"#([A-Za-z_][A-Za-z0-9_]*)", e):
                if m.group(1) != self.rest_name or self.rest_name == "rest":
                    return self.problem(f"#{m.group(1)} is not the length of a named rest")
        if where_text is not None:
            try:
                self.where_eqs = parse_where_clauses(where_text)
            except ValueError as ex:
                return self.problem(str(ex))
        else:
            self.where_eqs = None
        try:
            if not self.is_error:
                self.out_vars = [
                    translate_expr(e, coerce_cmp=True, rest_name=self.rest_name) if _needs_translation(e) else e
                    for e in self.out_vars]
            self.cond_lean = translate_expr(cond) if cond is not None else None
        except ExprError as ex:
            return self.problem(f"cannot translate expression: {ex}")
        if self.where_eqs is not None:
            input_vars = _effect_vars(in_elems + ([cond] if cond else []))
            # A functional slot's `X` is universally quantified inside
            # the body hypothesis, not a statement-level input: a
            # witness mentioning it would leave `X` unbound.
            for _fe, _fX, _fF in fun_slots:
                if _fX in input_vars:
                    input_vars.remove(_fX)
            if self.in_rest and self.rest_name not in input_vars:
                input_vars.append(self.rest_name)
            output_vars = _effect_vars(out_elems)
            lhs_set, bad = set(), None
            for lhs, _rhs in self.where_eqs:
                if lhs in lhs_set:
                    bad = f"where constrains {lhs!r} twice"
                    break
                lhs_set.add(lhs)
                if lhs in input_vars:
                    bad = f"where cannot constrain {lhs!r}, which is an input"
                    break
                if lhs not in output_vars:
                    bad = f"where constrains {lhs!r}, which is not an output variable"
                    break
            if bad is None:
                for v in output_vars:
                    if v not in input_vars and v not in lhs_set:
                        bad = f"output variable {v!r} is not determined by the inputs or the where clause"
                        break
            if bad is None:
                witnesses = []
                for lhs, rhs in self.where_eqs:
                    for v in _effect_vars([rhs]):
                        if v not in input_vars:
                            bad = f"where witness for {lhs!r} mentions {v!r}, which is not an input"
                            break
                    if bad is not None:
                        break
                    try:
                        witnesses.append(translate_expr(rhs))
                    except ExprError as ex:
                        bad = f"cannot translate where witness {rhs!r}: {ex}"
                        break
                if bad is None:
                    self.witnesses = witnesses
            if bad is not None:
                return self.problem(bad)
        # Program already computed; IO check (recursive words with IO
        # inside are refused like the standard path).
        io_used = [t for t in prog if isinstance(t, str) and t in IO_PRIMS]
        if io_used:
            self.failed.add(name)
            return self.problem(f"IO word {io_used[0]!r} cannot be used inside a defined word yet")
        # Binders (mirrors `_emit_spec_normal`/`_exact` inputs). A
        # functional slot's `X` is universally quantified inside the
        # body hypothesis (never a binder); its `F` gets an
        # `(F : Int → Int)` binder below; the code variable `q`
        # joins the Int binders.
        self.existential = [lhs for lhs, _ in self.where_eqs] if self.where_eqs is not None else []
        fun_xs = {X for _, X, _ in fun_slots}
        fun_fs = [F for _, _, F in fun_slots]
        seen_vars = [v for v in _effect_vars(in_elems + out_elems + ([cond] if cond else []))
                     if v not in self.existential and v != self.rest_name
                     and v not in fun_xs and v not in fun_fs]
        # Lowercase list-splice variables bound by `where` are already in
        # `existential`; a bare lowercase output spliced without `where`
        # was rejected above as undetermined.
        if fun_q is not None:
            seen_vars.append(fun_q)
        binders = " ".join(seen_vars)
        self.in_lean = lean_list_bottom_to_top(
            self.in_vars, self.rest_name if self.in_rest else None)
        if self.in_rest or (self.out_rest and not self.is_error):
            self.rest_binder = f" ({self.rest_name} : Stack)"
        else:
            self.rest_binder = ""
        self.binder_part = f" ({binders} : Int)" if binders else ""
        for qv, bv, _X, F in self.rec_fun_slots:
            self.binder_part += f" ({F} : Int → Int) ({bv} : List Tok)"
        self.hw_binder = f" (hw : {self.cond_lean})" if self.cond_lean is not None else ""
        self.simp_args = f"run, exec, step, {self.ln}Prog" + (", hw" if self.cond_lean is not None else "")
        self.suffix = "" if self.n_effects == 1 else f"_{self.idx + 1}"
        # Recursive hypotheses: self code + lookup + literal lookups (with
        # `Tok.call self_*` bodies where applicable, v37).
        _succ, _rec_words_eff, _frontier_eff = self._rec_cache(rec_words, frontier, succ)
        rec_deps = sorted(_rec_deps_of(name, self.defs, _rec_words_eff, _succ))
        # Frontier deps: every rec-reaching word reachable from here
        # (including non-recursive intermediaries like `loop` on the
        # way to `_loop`). The proof composes their effect lemmas at
        # the opaque call boundaries, so each needs a self code and a
        # lookup hypothesis.
        frontier = _frontier_eff
        seen_dfs, stack_dfs, frontier_reached = set(), [name], set()
        while stack_dfs:
            v = stack_dfs.pop()
            if v in seen_dfs:
                continue
            seen_dfs.add(v)
            if v in frontier:
                frontier_reached.add(v)
            stack_dfs.extend(_succ.get(v, ()))
        rec_frontier = sorted(frontier_reached)
        self.rec_self_vars = [_self_var(r) for r in rec_frontier]
        # Literal bodies (same single-word logic as runQ, with v37
        # recursive override via `_is_rec_single_word`).
        lit_body_lean, lit_words = [], []
        for k, raw in enumerate(raw_lits):
            body_prog = lits[k]
            if (len(raw) == 1 and isinstance(raw[0], str)
                    and raw[0] in self.defs and raw[0] not in PRIMS):
                w = raw[0]
                if _is_rec_single_word(raw, body_prog, self.defs, self._frontier_cached()):
                    lit_body_lean.append(
                        "[" + ", ".join(_tok_lean(t) for t in body_prog) + "]")
                    if self._compute_prog(w) is None:
                        return False
                    lit_words.append(w)
                    continue
                if any(isinstance(t, tuple) and t[0] == "lit" for t in body_prog):
                    return self.problem(
                        f"a literal naming {w!r}, which itself contains a literal, is not supported yet")
                lit_body_lean.append(f"{lean_name(w)}Prog")
                if self._compute_prog(w) is None:
                    return False
                lit_words.append(w)
            elif len(raw) == 1 and isinstance(raw[0], str) and raw[0] in PRIMS:
                lit_body_lean.append(f"[{PRIMS[raw[0]]}]")
            else:
                lit_body_lean.append(
                    "[" + ", ".join(_tok_lean(t) for t in body_prog) + "]")
        self.rec_lit_bodies = lit_body_lean
        self.rec_lit_words = lit_words
        self.rec_deps_sorted = rec_deps
        self.rec_frontier_sorted = rec_frontier
        self.is_recursive = True
        return True

    def prepare_quot(self):
        """Quotation words (eval, ?, cons): validate the bracket
        slots and compute the runQ fragments. The standard rest
        validation does not apply here -- the input rest and the
        output rest are DIFFERENT (the body transforms one stack
        into another) -- so this runs instead of it, right after
        the ERROR checks. Returns True when ready to emit."""
        name = self.name
        in_elems, out_elems = self.in_elems, self.out_elems
        cond, where_text = self.cond, self.where_text
        if where_text is not None:
            return self.problem("a quotation effect takes no where clause")
        if self.is_error:
            return self.problem("a quotation effect cannot be an ERROR effect")
        if name in self.failed:
            return False
        if self._compute_prog(name) is None:
            return False
        self.is_quot = True
        self.quot_kind = name
        self.suffix = "" if self.n_effects == 1 else f"_{self.idx + 1}"
        used = set(_effect_vars(in_elems + out_elems + ([cond] if cond else [])))
        q_var = "q"
        while q_var in used:
            q_var += "_"
        body_var = "body"
        while body_var in used:
            body_var += "_"
        self.quot_q = q_var
        self.quot_body = body_var
        if name == "eval":
            return self._prepare_quot_eval(in_elems, out_elems, cond)
        if name == "cons":
            return self._prepare_quot_cons(in_elems, out_elems, cond)
        if name == "?":
            return self._prepare_quot_cond(in_elems, out_elems, cond)
        return self.problem(f"not a quotation word: {name!r}")

    def _prepare_runq(self):
        """A defined word whose (inlined) program contains a
        quotation token (Phase 6, composition). The theorem is a
        runQ theorem (execQ with a queue variable `qq`), proved by
        applying the callee's quotation theorem as a lemma via
        `execQ_append`. Only `eval` is supported (one occurrence);
        `?` and `cons` in a defined word, a `where`/`when` clause,
        and an ERROR effect are clean problems for now.
        (v30: the program may contain quotation literals, which
        are bound as `lit{k}` code variables. The program is
        simulated from the start with the literal-expanding
        simulator, which splices literal bodies in when eval
        dispatches on them and stops at the first eval on a
        variable quotation; the tokens after that point are the
        suffix.) The prefix is simulated on the symbolic
        stack/queue to find the stack and queue at the dispatch
        point, and the suffix is simulated (from the body's output)
        to find the final stack/queue. Both must match the effect.
        Fuel: `fuel + steps + len(suffix) + 2` (each expanded-prefix
        step 1, the dispatch 1, the body `fuel`, the suffix
        `len(suffix)`, plus `execQ_append`'s +1 slack)."""
        name = self.name
        in_elems, out_elems = self.in_elems, self.out_elems
        cond, where_text = self.cond, self.where_text
        if where_text is not None:
            return self.problem("a runQ effect takes no where clause yet")
        if cond is not None:
            return self.problem("a runQ effect takes no when clause yet")
        if self.is_error:
            return self.problem("a runQ effect cannot be an ERROR effect")
        if name in self.failed:
            return False
        # The program (computed once per word, cached). A word
        # whose program cannot be built (recursion, IO) is a clean
        # problem, as in the standard path. (v30: the program may
        # contain ("lit", k) markers for quotation literals.)
        got = self._compute_prog(name)
        if got is None:
            return False
        prog, lits, raw_lits = got
        io_used = [t for t in prog if isinstance(t, str) and t in IO_PRIMS]
        if io_used:
            self.failed.add(name)
            return self.problem(
                f"IO word {io_used[0]!r} cannot be used inside a defined "
                f"word yet (only a bare @effect on the IO primitive itself)")
        self.runq_lits = lits
        self.runq_lit_vars = [f"lit{i}" for i in range(len(lits))]
        # A lit variable must not collide with an effect variable
        # (the expanding simulator distinguishes them by name).
        used_names = set(_effect_vars(in_elems + out_elems))
        if any(v in used_names for v in self.runq_lit_vars):
            return self.problem(
                "an effect variable is named like a literal code "
                "(lit0, lit1, ...); rename it")
        # Find the quotation token(s). Only one `eval` is supported.
        quot_idx = [i for i, t in enumerate(prog) if isinstance(t, str) and t in QUOT_TOKENS]
        if not quot_idx:
            return self.problem("runQ path reached with no quotation token")
        if len(quot_idx) > 1:
            return self.problem(
                "a defined word with more than one quotation token is "
                "not supported yet (one eval at a time)")
        qi = quot_idx[0]
        quot_tok = prog[qi]
        if quot_tok != "eval":
            return self.problem(
                f"a defined word containing {quot_tok!r} is not supported yet "
                f"(only eval)")
        # The body Lean expression for each literal (v30). A
        # literal whose raw contents are a single defined word W
        # is the word's program def (`WProg`, which the proof's
        # simp set unfolds); a single primitive is a one-element
        # list; anything else is the inlined body as a literal
        # list. A literal naming a word that itself contains a
        # literal is not supported yet (its Prog takes lit params
        # this theorem does not have).
        lit_body_lean = []
        lit_prog_defs = []
        lit_words = []
        for k, raw in enumerate(raw_lits):
            body_prog = lits[k]
            if (len(raw) == 1 and isinstance(raw[0], str)
                    and raw[0] in self.defs and raw[0] not in PRIMS):
                w = raw[0]
                if _is_rec_single_word(raw, body_prog, self.defs, self._frontier_cached()):
                    # (v37) Recursive single-word literal `[W]`: emit the
                    # inlined body (with `Tok.call self_W`) directly instead
                    # of a `WProg` reference (which would be underapplied /
                    # circular). Ensure `WProg` exists for `hself`.
                    lit_body_lean.append(
                        "[" + ", ".join(_tok_lean(t) for t in body_prog) + "]")
                    lit_prog_defs.append(None)
                    if self._compute_prog(w) is None:
                        return False
                    lit_words.append(w)
                    continue
                if any(isinstance(t, tuple) and t[0] == "lit" for t in body_prog):
                    return self.problem(
                        f"a literal naming {w!r}, which itself contains a "
                        f"literal, is not supported yet")
                lit_body_lean.append(f"{lean_name(w)}Prog")
                lit_prog_defs.append(f"{lean_name(w)}Prog")
                # The word's Prog def must exist in the output even
                # when the word has no effect of its own (as in a
                # test file with only sipd's effect): the lookup
                # hypothesis names it and the proof's simp set
                # unfolds it. Build it now; emit() writes it.
                if self._compute_prog(w) is None:
                    return False
                lit_words.append(w)
            elif (len(raw) == 1 and isinstance(raw[0], str)
                    and raw[0] in PRIMS):
                lit_body_lean.append(f"[{PRIMS[raw[0]]}]")
                lit_prog_defs.append(None)
            else:
                lit_body_lean.append(
                    "[" + ", ".join(_tok_lean(t) for t in body_prog) + "]")
                lit_prog_defs.append(None)
        self.runq_lit_words = lit_words
        self.spec_lit_bodies = lit_body_lean
        # The quotation slot: the input element that is a pointer
        # slot `[..r ... -- ..s ...]`. Its sides are the body's
        # input and output stacks (a rest plus extra elements).
        slot_pos = None
        slot = None
        for i, e in enumerate(in_elems):
            s = _parse_quot_slot(e)
            if s is not None and s[0] == "ptr":
                slot_pos, slot = i, s
                break
        if slot is None:
            return self.problem(
                "a runQ effect needs a quotation slot `[..r -- ..s]` in its inputs")

        def parse_side(side):
            """A slot side (`..r`, `..r a`, `..r a b`) -> (rest, extra
            elements bottom-to-top). The first element must be a
            named rest; the rest are stack variables."""
            parts = side.split()
            if not parts:
                return None, None
            r = self._quot_rest_name(parts[0])
            if r is None:
                return None, None
            return r, parts[1:]

        body_in_rest, body_in_extra = parse_side(slot[1])
        body_out_rest, body_out_extra = parse_side(slot[2])
        if body_in_rest is None or body_out_rest is None:
            return self.problem(
                f"the quotation slot {in_elems[slot_pos]!r} must start each side "
                f"with a named rest")
        # The effect's input rest must be the slot's input rest
        # (or implied, in which case the slot names it).
        in_first = in_elems[0] if in_elems else None
        in_rest = self._quot_rest_name(in_first) if in_first else None
        if in_rest is not None and in_rest != body_in_rest:
            return self.problem(
                f"the input rest ..{in_rest} does not match the quotation "
                f"slot's input rest ..{body_in_rest}")
        # The effect's output rest must be the slot's output rest
        # (or implied).
        out_first = out_elems[0] if out_elems else None
        out_rest = self._quot_rest_name(out_first) if out_first else None
        if out_rest is not None and out_rest != body_out_rest:
            return self.problem(
                f"the output rest ..{out_rest} does not match the quotation "
                f"slot's output rest ..{body_out_rest}")
        in_rest_name = in_rest or body_in_rest
        out_rest_name = out_rest or body_out_rest
        # Input/output variables (non-rest elements), with the
        # quotation slot replaced by the code variable `q`. An
        # output slot must be the same quotation (the preserved
        # quote, as in `run`).
        used = set(_effect_vars(in_elems + out_elems))
        q_var = "q"
        while q_var in used:
            q_var += "_"
        body_var = "body"
        while body_var in used:
            body_var += "_"
        self.runq_q, self.runq_body = q_var, body_var
        self.runq_quot_tok = quot_tok
        is_rest_tok = lambda e: e in ("...", "∅") or self._quot_rest_name(e) is not None
        in_vars = []
        for e in in_elems:
            if is_rest_tok(e):
                continue
            if _parse_quot_slot(e) is not None:
                in_vars.append(q_var)
            else:
                in_vars.append(e)
        out_vars = []
        for e in out_elems:
            if is_rest_tok(e):
                continue
            s = _parse_quot_slot(e)
            if s is not None:
                if s[0] != "ptr" or e != in_elems[slot_pos]:
                    return self.problem(
                        "a runQ output slot must be the same quotation as the input slot")
                out_vars.append(q_var)
            else:
                out_vars.append(e)
        # The input stack (bottom-to-top) and the output stack.
        self.runq_in_stack = lean_list_bottom_to_top(in_vars, in_rest_name)
        self.runq_out_stack = lean_list_bottom_to_top(out_vars, out_rest_name)
        # Simulate the (literal-expanding) prefix on the input
        # stack/queue (v30). The expanding simulator follows the
        # program from the start, splicing literal bodies in when
        # eval dispatches on them, and stops at the first eval on
        # a variable quotation. The stack is bottom-to-top
        # elements; the rest sits underneath them. The queue
        # starts as the ambient `qq`.
        try:
            p_stack, p_rest, p_queue, p_tail, steps, remaining = _shape_runq_expanded(
                prog, lits, list(in_vars), in_rest_name, [], "qq")
        except ValueError as ex:
            return self.problem(str(ex))
        # At the dispatch point the quotation code must be on top
        # of the stack; popping it leaves the body's input stack,
        # which must equal the slot's input side.
        if not p_stack or p_stack[-1] != q_var:
            return self.problem(
                "the quotation code is not on top of the stack when eval runs "
                "(the prefix must leave it there)")
        body_in_elems = p_stack[:-1]
        body_in_stack = _stack_lean(body_in_elems, p_rest)
        body_in_expected = lean_list_bottom_to_top(body_in_extra, body_in_rest)
        if body_in_stack != body_in_expected:
            return self.problem(
                f"the stack below the quotation at eval time is {body_in_stack}, "
                f"but the quotation slot expects {body_in_expected}")
        body_out_stack = lean_list_bottom_to_top(body_out_extra, body_out_rest)
        self.runq_body_in_stack = body_in_stack
        self.runq_body_out_rest = body_out_rest
        self.runq_body_out_stack = body_out_stack
        self.runq_queue_dispatch = _queue_lean(p_queue, p_tail)
        # The suffix (the tokens after the dispatch) runs on the
        # body's output (queue unchanged by the body) and must land
        # on the effect's output stack with the ambient queue
        # restored. A second eval here is a clean problem (the
        # plain simulator refuses it).
        try:
            s_stack, s_rest, s_queue, s_tail = _shape_runq(
                remaining, list(body_out_extra), body_out_rest, list(p_queue), p_tail)
        except ValueError as ex:
            return self.problem(str(ex))
        final_stack = _stack_lean(s_stack, s_rest)
        final_queue = _queue_lean(s_queue, s_tail)
        if final_stack != self.runq_out_stack:
            return self.problem(
                f"after the suffix the stack is {final_stack}, but the effect "
                f"says {self.runq_out_stack}")
        if final_queue != "qq":
            return self.problem(
                f"after the suffix the queue is {final_queue}, but it must be "
                f"restored to the ambient queue qq")
        self.runq_suffix_lean = "[" + ", ".join(_tok_lean(t) for t in remaining) + "]"
        self.runq_suffix_len = len(remaining)
        # Fuel: expanded-prefix steps (each token 1, each
        # literal-eval dispatch 1) + the dispatch (1) + the body
        # (`fuel`) + the suffix (`len(remaining)`) + append's +1.
        total = steps + len(remaining) + 2
        self.runq_total_fuel = f"(fuel + {total})"
        # Hypotheses: first the literal lookups (in lit index
        # order), then the variable quotation's lookup and the
        # body's effect (with the queue at dispatch time, which
        # may hold stashed values). Stack/queue expressions are
        # parenthesised where they are passed as arguments: `::`
        # binds less tightly than function application, so an
        # unparenthesised `(B) :: qq` would parse as
        # `execQ ... (B)` applied, then `:: qq`.
        qd = self.runq_queue_dispatch
        qdp = f"({qd})"
        bis = f"({body_in_stack})"
        bos = f"({body_out_stack})"
        lit_hyps = [
            f"lookup defs lit{k} = some {lit_body_lean[k]}"
            for k in range(len(lits))]
        self.runq_hyps = lit_hyps + [
            f"lookup defs {q_var} = some {body_var}",
            f"execQ fuel {body_var} {bis} {qdp} [] [] [] defs = "
            f"(Outcome.ok {bos} {qdp} [], defs')"]
        lit_intro = " ".join(f"hlookupLit{k}" for k in range(len(lits)))
        self.runq_intro = (
            f"intro {lit_intro} hlookup hbody" if lit_intro
            else "intro hlookup hbody")
        # Proof: the suffix runs (one step per token, by simp);
        # `execQ_append` joins the body and the suffix; simp
        # unfolds the prefix and dispatches eval, leaving exactly
        # the append result. The final simp also unfolds the
        # single-word literal bodies (their Prog defs) so the
        # literal evals splice in.
        ros = f"({self.runq_out_stack})"
        simp_parts = (["execQ", "step"]
                      + [f"hlookupLit{k}" for k in range(len(lits))]
                      + ["hlookup"]
                      + [d for d in lit_prog_defs if d is not None])
        self.runq_proof = [
            f"  have hsuffix : ∀ (inp1 : In) (orc1 : Oracle),",
            f"      execQ {self.runq_suffix_len} {self.runq_suffix_lean} "
            f"{bos} {qdp} inp1 orc1 [] defs' = "
            f"(Outcome.ok {ros} qq [], defs') := by",
            f"    intro inp1 orc1",
            f"    simp [execQ, step]",
            f"  have happ := execQ_append (F1 := fuel) (F2 := {self.runq_suffix_len}) "
            f"(p2 := {self.runq_suffix_lean})",
            f"    (s2 := {ros}) (q2 := qq) (acts2 := []) (defs2 := defs')",
            f"    {body_var} {bis} {qdp} [] [] [] defs {bos} {qdp} [] defs' hbody hsuffix",
            f"  simp only [{self.ln}Prog]",
            f"  simp [{', '.join(simp_parts)}]",
            f"  exact happ",
        ]
        # Binders: defs, the literal codes, the input variables
        # (the quotation code included), the body, the rests,
        # defs', fuel, qq.
        seen_b = []
        for v in in_vars:
            if v not in seen_b:
                seen_b.append(v)
        bvars = " ".join(seen_b)
        rests = [in_rest_name] if in_rest_name == out_rest_name else [in_rest_name, out_rest_name]
        lit_binder = (f" ({' '.join(self.runq_lit_vars)} : Int)"
                      if self.runq_lit_vars else "")
        self.runq_binders = (
            f" (defs : Defs)"
            + lit_binder
            + (f" ({bvars} : Int)" if bvars else "")
            + f" ({body_var} : List Tok)"
            + f" ({' '.join(rests)} : Stack)"
            + f" (defs' : Defs) (fuel : Nat) (qq : Stack)")
        self.runq_prog_app = (
            f"{self.ln}Prog"
            + (f" {' '.join(self.runq_lit_vars)}" if self.runq_lit_vars else ""))
        self.is_runq = True
        self.suffix = "" if self.n_effects == 1 else f"_{self.idx + 1}"
        return True

    def _cond_lit_bodies(self, lits, raw_lits):
        """The Lean body per quotation literal (shared cond-path helper,
        as in v30). A literal whose raw contents are a single defined
        word W is the word's program def (`WProg`); a single primitive
        is a one-element list; anything else is the inlined body as a
        literal list. A literal naming a word that itself contains a
        literal is not supported yet. Returns (lit_body_lean,
        lit_prog_defs, lit_words), or None after recording a clean
        problem."""
        lit_body_lean = []
        lit_prog_defs = []
        lit_words = []
        for k, raw in enumerate(raw_lits):
            body_prog = lits[k]
            if (len(raw) == 1 and isinstance(raw[0], str)
                    and raw[0] in self.defs and raw[0] not in PRIMS):
                w = raw[0]
                if _is_rec_single_word(raw, body_prog, self.defs, self._frontier_cached()):
                    # (v37) Recursive single-word literal `[W]`: emit the
                    # inlined body (with `Tok.call self_W`) directly instead
                    # of a `WProg` reference (which would be underapplied /
                    # circular). Ensure `WProg` exists for `hself`.
                    lit_body_lean.append(
                        "[" + ", ".join(_tok_lean(t) for t in body_prog) + "]")
                    lit_prog_defs.append(None)
                    if self._compute_prog(w) is None:
                        return None
                    lit_words.append(w)
                    continue
                if any(isinstance(t, tuple) and t[0] == "lit" for t in body_prog):
                    self.problem(
                        f"a literal naming {w!r}, which itself contains a "
                        f"literal, is not supported yet")
                    return None
                lit_body_lean.append(f"{lean_name(w)}Prog")
                lit_prog_defs.append(f"{lean_name(w)}Prog")
                if self._compute_prog(w) is None:
                    return None
                lit_words.append(w)
            elif (len(raw) == 1 and isinstance(raw[0], str)
                    and raw[0] in PRIMS):
                lit_body_lean.append(f"[{PRIMS[raw[0]]}]")
                lit_prog_defs.append(None)
            else:
                lit_body_lean.append(
                    "[" + ", ".join(_tok_lean(t) for t in body_prog) + "]")
                lit_prog_defs.append(None)
        return lit_body_lean, lit_prog_defs, lit_words

    def _cond_rest_vars(self, in_elems, out_elems):
        """Rest handling for the cond path (shared helper; mirrors the
        standard path, but the rest must be preserved: the word cannot
        drop it or conjure one). Unnamed, it defaults to `R` (as in the
        hand-proofs for sort2/choose), collision-avoided. Returns
        (in_vars, out_vars, rest_name), or None after recording a clean
        problem."""
        is_rest_tok = lambda e: e in ("...", "∅") or self._quot_rest_name(e) is not None
        if any(is_rest_tok(e) for e in in_elems[1:] + out_elems[1:]):
            self.problem(
                "a rest token is only allowed at the far left (the rest position)")
            return None
        in_first = in_elems[0] if in_elems else None
        out_first = out_elems[0] if out_elems else None
        in_empty = in_first == "∅"
        out_empty = out_first == "∅"
        if in_empty != out_empty:
            self.problem(
                "the rest must be preserved by a runQ cond word "
                "(it cannot be dropped or conjured)")
            return None
        in_named = self._quot_rest_name(in_first)
        out_named = self._quot_rest_name(out_first)
        if in_named is not None and out_named is not None and in_named != out_named:
            self.problem(
                f"the rest is named ..{in_named} on the input and ..{out_named} "
                f"on the output; use the same name on both sides")
            return None
        rest_name = in_named or out_named
        if rest_name is None and not in_empty:
            used_names = set(_effect_vars(in_elems + out_elems))
            rest_name = "R"
            while rest_name in used_names or rest_name in self.runq_lit_vars:
                rest_name += "_"
        in_vars = [e for e in in_elems if not is_rest_tok(e)]
        out_vars = [e for e in out_elems if not is_rest_tok(e)]
        return in_vars, out_vars, rest_name

    def _cond_where_rhs(self, where_text, in_vars, out_vars, rest_name):
        """The `where` equations in direct form (shared cond-path helper):
        each output variable gets its right-hand side substituted into
        the output stack. Returns the {lhs: lean_rhs} dict, or None
        after recording a clean problem."""
        where_rhs = {}
        if where_text is not None:
            try:
                where_eqs = parse_where_clauses(where_text)
            except ValueError as ex:
                self.problem(str(ex))
                return None
            for lhs, rhs in where_eqs:
                if lhs not in out_vars:
                    self.problem(
                        f"where equation for {lhs!r}, which is not an output variable")
                    return None
                try:
                    rhs_lean = translate_expr(rhs)
                except ExprError as ex:
                    self.problem(str(ex))
                    return None
                rhs_vars = _effect_vars([rhs])
                bad = [v for v in rhs_vars
                       if v not in in_vars and v != rest_name]
                if bad:
                    self.problem(
                        f"where right-hand side mentions {bad[0]!r}, which is "
                        f"not an input variable")
                    return None
                where_rhs[lhs] = rhs_lean
        return where_rhs

    def _prepare_runq_cond(self):
        """A defined word whose (inlined) program contains exactly
        one `?` (v31, Phase 6). The theorem is a runQ theorem
        (execQ with a queue variable `qq`) with a FIXED fuel -- no
        fuel binder, no body hypothesis -- proved by a case split
        on the flag and pure simp. The `?` must dispatch on a
        quotation literal (a concrete program); a variable
        quotation is a clean problem. The output is the direct
        form: the `where` equations are substituted into the
        output stack, so the output holds the if-expressions
        (e.g. sort2's `X = if A < B then A else B`). A `when`
        clause or an ERROR effect is a clean problem. Fuel is
        `len(prefix) + 1 + len(body) + len(suffix)`: each prefix
        token 1, the dispatch 1, the body `len(body)`, the suffix
        `len(suffix)` -- no append slack, because no execQ_append
        is used (the proof is pure simp, and the discard branch
        needs less fuel than the run branch, which extra fuel
        does not hurt)."""
        name = self.name
        in_elems, out_elems = self.in_elems, self.out_elems
        cond, where_text = self.cond, self.where_text
        if self.is_error:
            return self.problem("a runQ cond effect cannot be an ERROR effect")
        if name in self.failed:
            return False
        # The program (computed once per word, cached). A word
        # whose program cannot be built (recursion, IO) is a clean
        # problem, as in the standard path.
        got = self._compute_prog(name)
        if got is None:
            return False
        prog, lits, raw_lits = got
        io_used = [t for t in prog if isinstance(t, str) and t in IO_PRIMS]
        if io_used:
            self.failed.add(name)
            return self.problem(
                f"IO word {io_used[0]!r} cannot be used inside a defined "
                f"word yet (only a bare @effect on the IO primitive itself)")
        self.runq_lits = lits
        self.runq_lit_vars = [f"lit{i}" for i in range(len(lits))]
        # A lit variable must not collide with an effect variable.
        used_names = set(_effect_vars(in_elems + out_elems))
        if any(v in used_names for v in self.runq_lit_vars):
            return self.problem(
                "an effect variable is named like a literal code "
                "(lit0, lit1, ...); rename it")
        # Exactly one `?` in the program, and no other quotation
        # token (the router already ensured `?` is the only
        # quotation token anywhere, including inside literals;
        # here it must be a top-level program token, exactly once).
        quot_idx = [i for i, t in enumerate(prog) if isinstance(t, str) and t in QUOT_TOKENS]
        if len(quot_idx) >= 2 and all(prog[i] == "?" for i in quot_idx):
            # Two or more sequential `?`s: the compositional multi path
            # (each dispatching on a literal, each `?` from an annotated
            # callee's boundary). Unlike the single path below, a `when`
            # clause is accepted (it becomes an `hw` hypothesis).
            return self._prepare_runq_cond_multi(
                prog, lits, raw_lits, quot_idx)
        if len(quot_idx) != 1 or prog[quot_idx[0]] != "?":
            return self.problem(
                "a runQ cond effect needs exactly one ? in its program")
        if cond is not None:
            return self.problem("a runQ cond effect takes no when clause yet")
        # The body Lean expression for each literal (shared helper).
        _bodies = self._cond_lit_bodies(lits, raw_lits)
        if _bodies is None:
            return False
        lit_body_lean, lit_prog_defs, lit_words = _bodies
        self.runq_lit_words = lit_words
        self.spec_lit_bodies = lit_body_lean
        # No quotation slot in the inputs or outputs: the `?`
        # dispatches on a literal from the definition, not on a
        # variable quotation, so a bracketed element here would
        # have no meaning (and would not be a Lean expression).
        for e in in_elems + out_elems:
            if _parse_quot_slot(e) is not None:
                return self.problem(
                    f"a runQ cond effect takes no quotation element {e!r} "
                    f"(the ? dispatches on a literal from the definition)")
        # Rest handling + `where` equations (shared helpers).
        _rest = self._cond_rest_vars(in_elems, out_elems)
        if _rest is None:
            return False
        in_vars, out_vars, rest_name = _rest
        where_rhs = self._cond_where_rhs(where_text, in_vars, out_vars, rest_name)
        if where_rhs is None:
            return False
        # Simulate the prefix up to the `?` dispatch. The stack
        # is bottom-to-top elements; the rest sits underneath
        # them. The queue starts as the ambient `qq`.
        try:
            p_stack, p_rest, p_queue, p_tail, steps, remaining = _shape_runq_cond(
                prog, list(in_vars), rest_name, [], "qq", stop_at_cond=True)
        except ValueError as ex:
            return self.problem(str(ex))
        # At the dispatch point the quotation code must be on top
        # of the stack (a literal code, not a variable or an
        # integer), with the flag below it.
        if not p_stack:
            return self.problem(
                "the stack is empty when ? runs (a quotation code and a "
                "flag are needed)")
        top = p_stack[-1]
        if not (isinstance(top, str) and re.fullmatch(r"lit\d+", top)):
            return self.problem(
                "the ? must dispatch on a quotation literal "
                f"(the stack top at ? time is {top!r}, not a literal code)")
        lit_k = int(top[3:])
        if len(p_stack) < 2:
            return self.problem(
                "the stack has a quotation code but no flag when ? runs")
        flag_expr = p_stack[-2]
        stack_below = p_stack[:-2]
        # The case split, from the flag's form. A bare variable
        # splits on `F = 0` (run when `F ≠ 0`); a comparison's
        # if-expression splits on its condition (run when it
        # holds, when the flag is 1). Anything else is a clean
        # problem.
        m_if = re.fullmatch(r"\(if (.+) then 1 else 0\)", flag_expr)
        if m_if is not None:
            case_cond = m_if.group(1)
            case_binder = "h"
        elif re.fullmatch(r"[A-Za-z_][A-Za-z0-9_]*", flag_expr) is not None:
            if flag_expr not in in_vars:
                return self.problem(
                    f"the ? flag {flag_expr!r} is not an input variable")
            case_cond = f"{flag_expr} = 0"
            case_binder = "hf"
        else:
            return self.problem(
                f"the ? flag {flag_expr!r} is not supported (a bare variable "
                f"or an if-expression from a comparison)")
        # The dispatched literal's body: a concrete program of
        # primitives/shuffles/comparisons only (no quotation
        # token, no nested literal, no IO).
        body_prog = lits[lit_k]
        for t in body_prog:
            if isinstance(t, tuple):
                return self.problem(
                    "a literal inside the ? body is not supported yet")
            if isinstance(t, str) and t in QUOT_TOKENS:
                return self.problem(
                    f"the ? body contains {t!r}, which is not supported yet")
            if isinstance(t, str) and t in IO_PRIMS:
                return self.problem(
                    f"the ? body contains IO word {t!r}")
            if isinstance(t, str) and t not in PRIMS:
                return self.problem(
                    f"the ? body contains unknown token {t!r}")
        # Both branches: the run branch runs the body on the
        # stack below the flag, then the suffix; the discard
        # branch runs only the suffix. The queue must be restored
        # to the ambient `qq` on both branches.
        try:
            b_stack, _, b_queue, _, _, _ = _shape_runq_cond(
                body_prog, list(stack_below), p_rest, list(p_queue), p_tail,
                stop_at_cond=False)
            run_stack, _, run_queue, _, _, _ = _shape_runq_cond(
                remaining, list(b_stack), p_rest, list(b_queue), p_tail,
                stop_at_cond=False)
            disc_stack, _, disc_queue, _, _, _ = _shape_runq_cond(
                remaining, list(stack_below), p_rest, list(p_queue), p_tail,
                stop_at_cond=False)
        except ValueError as ex:
            return self.problem(str(ex))
        if _queue_lean(run_queue, p_tail) != "qq" or _queue_lean(disc_queue, p_tail) != "qq":
            return self.problem(
                "after the ? the queue is not restored to the ambient queue qq")
        # Both branches must land on the effect's output arity.
        if len(run_stack) != len(out_vars) or len(disc_stack) != len(out_vars):
            return self.problem(
                f"after the ? the stack has {len(run_stack)} element(s) on the "
                f"run branch and {len(disc_stack)} on the discard branch, but "
                f"the effect says {len(out_vars)}")
        # The output stack (direct form): the `where` equations
        # substituted in. With no `where` clause the two branches
        # must agree, and the agreement must be exactly the
        # effect's output.
        self.runq_in_stack = lean_list_bottom_to_top(in_vars, rest_name)
        if where_text is not None:
            out_direct = [where_rhs.get(v, v) for v in out_vars]
            self.runq_out_stack = lean_list_bottom_to_top(out_direct, rest_name)
        else:
            if run_stack != disc_stack:
                return self.problem(
                    "the run and discard branches leave different stacks, "
                    "so the effect needs a where clause to state the output")
            if run_stack != list(out_vars):
                return self.problem(
                    f"after the ? the stack is {_stack_lean(run_stack, rest_name)}, "
                    f"but the effect says "
                    f"{lean_list_bottom_to_top(out_vars, rest_name)}")
            self.runq_out_stack = lean_list_bottom_to_top(out_vars, rest_name)
        # Fuel: prefix tokens + the dispatch (1) + the body +
        # the suffix. This is the run case's total; the discard
        # case needs less, and extra fuel is harmless (the
        # empty-program case matches any fuel).
        self.runq_cond_fuel = steps + 1 + len(body_prog) + len(remaining)
        # Hypotheses: only the literal lookups (in lit index
        # order). There is no variable quotation, so no hlookup
        # and no hbody.
        self.runq_cond_hyps = [
            f"lookup defs lit{k} = some {lit_body_lean[k]}"
            for k in range(len(lits))]
        lit_intro = " ".join(f"hlookupLit{k}" for k in range(len(lits)))
        self.runq_cond_intro = f"intro {lit_intro}" if lit_intro else ""
        # Proof: case split on the flag, then simp in both
        # branches (with `<;> omega`: simp leaves arithmetic
        # residual goals about the if-expressions, as in sort2).
        simp_parts = (["execQ", "step", f"{self.ln}Prog"]
                      + [f"hlookupLit{k}" for k in range(len(lits))]
                      + [d for d in lit_prog_defs if d is not None]
                      + [case_binder])
        simp_line = f"  · simp [{', '.join(simp_parts)}] <;> omega"
        self.runq_cond_proof = [
            f"  by_cases {case_binder} : {case_cond}",
            simp_line,
            simp_line,
        ]
        # Binders: defs, the input variables and literal codes
        # (one Int group, as in the hand-proofs), the rest, qq.
        # No fuel binder, no body binder.
        seen_b = []
        for v in in_vars + self.runq_lit_vars:
            if v not in seen_b:
                seen_b.append(v)
        bvars = " ".join(seen_b)
        self.runq_cond_binders = (
            f" (defs : Defs)"
            + (f" ({bvars} : Int)" if bvars else "")
            + (f" ({rest_name} : Stack)" if rest_name is not None else "")
            + f" (qq : Stack)")
        self.runq_prog_app = (
            f"{self.ln}Prog"
            + (f" {' '.join(self.runq_lit_vars)}" if self.runq_lit_vars else ""))
        self.is_runq_cond = True
        self.suffix = "" if self.n_effects == 1 else f"_{self.idx + 1}"
        return True

    def _prepare_runq_cond_multi(self, prog, lits, raw_lits, quot_idx):
        """A defined word whose (inlined) program contains TWO OR MORE
        sequential `?`s (compositional-callee-lemmas, the compositional
        multi path). Each `?` must dispatch on a quotation literal with
        an analyzable flag (a bare input variable or an if-expression
        from a comparison), and every `?` must sit inside an annotated
        callee's inlined region (the generalized boundary rule: the
        word's own body and unannotated callees are quot-free, so the
        `Prog` stays a `++` over callee `Prog`s with no `?` at this
        word's own level). The simulation branches at each `?` (run vs
        discard) and every leaf must restore the queue and land on the
        effect's output arity. A `when` clause is accepted (it becomes
        an `hw` hypothesis); an ERROR effect is refused by the caller.
        Emission reuses the cond shape (literal binders + lookups +
        lifted post, proved by uniform `fbm_verify [deps]`)."""
        name = self.name
        in_elems, out_elems = self.in_elems, self.out_elems
        cond, where_text = self.cond, self.where_text
        gen = self._gen_frontier_cached()
        # --- Region test (the generalized boundary rule). ---
        # The word's own raw body carries no quotation token: each `?`
        # arrives via an annotated callee. (A word mixing its own `?`
        # with callee `?`s keeps today's single-`?` refusal.)
        for tok in self.defs.get(name, []):
            if isinstance(tok, str) and tok in QUOT_TOKENS:
                return self.problem(
                    "a runQ cond effect needs exactly one ? in its program")
            if isinstance(tok, str) and tok.startswith("["):
                try:
                    inner = _literal_inner_tokens(tok)
                except ValueError:
                    continue
                if _tokens_use_quot(inner, self.defs, ()):
                    return self.problem(
                        "a runQ cond effect needs exactly one ? in its program")
        # No call markers (a recursive word routes to _prepare_recursive
        # before reaching here; defensive).
        for t in prog:
            if isinstance(t, tuple) and t[0] == "call":
                return self.problem(
                    "a runQ cond effect cannot compose a recursive call yet")
        # Direct callees: quot-free, or annotated with an only-`?`
        # program (their own proof handles their dispatches; our proof
        # re-peels them through the `++` composition). An unannotated
        # quot-carrying callee, or an annotated callee running `eval` /
        # `cons` / recursion, is a clean problem.
        for tok in self.defs.get(name, []):
            if isinstance(tok, str) and tok.startswith("["):
                continue
            if not (isinstance(tok, str) and tok in self.defs
                    and tok not in PRIMS):
                continue
            if not _uses_quot_token(tok, self.defs):
                continue
            if tok not in gen:
                return self.problem(
                    "a runQ cond effect needs exactly one ? in its program")
            got_w = self._compute_prog(tok)
            if got_w is None:
                return False
            wprog, _, _ = got_w
            for t in wprog:
                if isinstance(t, tuple) and t[0] == "call":
                    return self.problem(
                        "a runQ cond effect cannot compose a recursive call yet")
                if isinstance(t, str) and t in ("eval", "cons"):
                    return self.problem(
                        f"a runQ cond callee {tok!r} runs {t!r} "
                        f"(only single-? callees compose)")
        # Literal bodies (shared helper): every literal's code is bound
        # and pinned, exactly as on the single path.
        _bodies = self._cond_lit_bodies(lits, raw_lits)
        if _bodies is None:
            return False
        lit_body_lean, lit_prog_defs, lit_words = _bodies
        self.runq_lit_words = lit_words
        self.spec_lit_bodies = lit_body_lean
        # No quotation slot in the inputs or outputs (as on the single
        # path: each `?` dispatches on a literal from the definition).
        for e in in_elems + out_elems:
            if _parse_quot_slot(e) is not None:
                return self.problem(
                    f"a runQ cond effect takes no quotation element {e!r} "
                    f"(the ? dispatches on a literal from the definition)")
        # Rest handling + `where` equations (shared helpers).
        _rest = self._cond_rest_vars(in_elems, out_elems)
        if _rest is None:
            return False
        in_vars, out_vars, rest_name = _rest
        where_rhs = self._cond_where_rhs(where_text, in_vars, out_vars, rest_name)
        if where_rhs is None:
            return False
        # A `when` clause becomes an `hw` hypothesis (the single path
        # refuses it; the multi path accepts it for bound-ordered
        # words like clamp).
        hw_binder = ""
        if cond is not None:
            try:
                cond_lean = translate_expr(cond)
            except ExprError as ex:
                return self.problem(f"cannot translate expression: {ex}")
            hw_binder = f" (hw : {cond_lean})"
        # --- Branching shape simulation (one `?` at a time, per leaf).
        # Segments between the top-level `?`s are simulated under every
        # leaf state; each `?` branches into its run/disc continuations.
        # Literal-interior `?`s were refused by the region test above,
        # so `stop_at_cond=False` doubling as a no-`?` assertion holds.
        try:
            states = [(list(in_vars), rest_name, [], "qq")]
            prev = 0
            for qpos in quot_idx:
                seg = prog[prev:qpos]
                new_states = []
                for (st, rst, qu, tail) in states:
                    p_stack, p_rest, p_queue, p_tail, _, _ = _shape_runq_cond(
                        seg, st, rst, list(qu), tail, stop_at_cond=False)
                    if not p_stack:
                        raise ValueError(
                            "the stack is empty when ? runs (a quotation code "
                            "and a flag are needed)")
                    top = p_stack[-1]
                    if not (isinstance(top, str) and re.fullmatch(r"lit\d+", top)):
                        raise ValueError(
                            "the ? must dispatch on a quotation literal "
                            f"(the stack top at ? time is {top!r}, not a literal code)")
                    lit_k = int(top[3:])
                    if len(p_stack) < 2:
                        raise ValueError(
                            "the stack has a quotation code but no flag when ? runs")
                    flag_expr = p_stack[-2]
                    stack_below = p_stack[:-2]
                    m_if = re.fullmatch(r"\(if (.+) then 1 else 0\)", flag_expr)
                    if m_if is not None:
                        pass
                    elif re.fullmatch(r"[A-Za-z_][A-Za-z0-9_]*", flag_expr) is not None:
                        if flag_expr not in in_vars:
                            raise ValueError(
                                f"the ? flag {flag_expr!r} is not an input variable")
                    else:
                        raise ValueError(
                            f"the ? flag {flag_expr!r} is not supported (a bare "
                            f"variable or an if-expression from a comparison)")
                    body_prog = lits[lit_k]
                    for t in body_prog:
                        if isinstance(t, tuple):
                            raise ValueError(
                                "a literal inside the ? body is not supported yet")
                        if isinstance(t, str) and t in QUOT_TOKENS:
                            raise ValueError(
                                f"the ? body contains {t!r}, which is not supported yet")
                        if isinstance(t, str) and t in IO_PRIMS:
                            raise ValueError(
                                f"the ? body contains IO word {t!r}")
                        if isinstance(t, str) and t not in PRIMS:
                            raise ValueError(
                                f"the ? body contains unknown token {t!r}")
                    b_stack, b_rest, b_queue, b_tail, _, _ = _shape_runq_cond(
                        body_prog, list(stack_below), p_rest, list(p_queue), p_tail,
                        stop_at_cond=False)
                    new_states.append((b_stack, b_rest, b_queue, b_tail))
                    new_states.append((list(stack_below), p_rest, list(p_queue), p_tail))
                states = new_states
                prev = qpos + 1
            leaves = []
            for (st, rst, qu, tail) in states:
                f_stack, _, f_queue, f_tail, _, _ = _shape_runq_cond(
                    prog[prev:], st, rst, list(qu), tail, stop_at_cond=False)
                if _queue_lean(f_queue, f_tail) != "qq":
                    raise ValueError(
                        "after the ? the queue is not restored to the ambient queue qq")
                if len(f_stack) != len(out_vars):
                    raise ValueError(
                        f"after the ?s the stack has {len(f_stack)} element(s) on "
                        f"some branch, but the effect says {len(out_vars)}")
                leaves.append(f_stack)
        except ValueError as ex:
            return self.problem(str(ex))
        # The output stack (direct form): the `where` equations
        # substituted in. With no `where` clause every leaf must
        # agree, and the agreement must be exactly the effect's
        # output.
        self.runq_in_stack = lean_list_bottom_to_top(in_vars, rest_name)
        if where_text is not None:
            out_direct = [where_rhs.get(v, v) for v in out_vars]
            self.runq_out_stack = lean_list_bottom_to_top(out_direct, rest_name)
        else:
            first = leaves[0]
            if any(lf != first for lf in leaves):
                return self.problem(
                    "the ? branches leave different stacks, so the effect "
                    "needs a where clause to state the output")
            if first != list(out_vars):
                return self.problem(
                    f"after the ?s the stack is {_stack_lean(first, rest_name)}, "
                    f"but the effect says "
                    f"{lean_list_bottom_to_top(out_vars, rest_name)}")
            self.runq_out_stack = lean_list_bottom_to_top(out_vars, rest_name)
        # Hypotheses: only the literal lookups (in lit index order).
        # Binders: defs, the input variables and literal codes, the
        # rest, an optional `hw`, qq. No fuel binder, no body binder.
        self.runq_cond_hyps = [
            f"lookup defs lit{k} = some {lit_body_lean[k]}"
            for k in range(len(lits))]
        lit_intro = " ".join(f"hlookupLit{k}" for k in range(len(lits)))
        self.runq_cond_intro = f"intro {lit_intro}" if lit_intro else ""
        seen_b = []
        for v in in_vars + self.runq_lit_vars:
            if v not in seen_b:
                seen_b.append(v)
        bvars = " ".join(seen_b)
        self.runq_cond_binders = (
            f" (defs : Defs)"
            + (f" ({bvars} : Int)" if bvars else "")
            + (f" ({rest_name} : Stack)" if rest_name is not None else "")
            + hw_binder
            + f" (qq : Stack)")
        self.runq_prog_app = (
            f"{self.ln}Prog"
            + (f" {' '.join(self.runq_lit_vars)}" if self.runq_lit_vars else ""))
        self.is_runq_cond = True
        self.suffix = "" if self.n_effects == 1 else f"_{self.idx + 1}"
        return True

    def _prepare_runq_direct(self):
        """A defined word whose (inlined) program contains exactly
        one `?` and exactly one `eval`, with the eval last (v32,
        Phase 6). The `?` runs a concrete literal body (as in v31);
        the eval runs a variable quotation (one of the two
        quotation slots in the effect's input). The theorem is a
        runQ theorem proved by direct simp: everything is inlined,
        the cond reduces via the literal lookup, and the eval
        dispatch reduces via the quotation lookup to the body's
        hypothesis. The run case matches the hypothesis exactly;
        the discard case needs one extra fuel (the cond does not
        run the body), lifted by execQ_ok_mono. The word has TWO
        @effect statements (one per case, distinguished by the
        when clause); each becomes its own theorem. A where clause
        or an ERROR effect is a clean problem. Fuel is the
        run-case total: len(inlined program) + len(cond literal
        body) -- every program token (including the cond and the
        eval) plus the cond body's tokens; the eval dispatch is
        already counted as one of the program tokens, so there is
        no extra +1 (branch: 9 + 1 = 10)."""
        name = self.name
        in_elems, out_elems = self.in_elems, self.out_elems
        cond, where_text = self.cond, self.where_text
        if cond is None:
            return self.problem(
                "a runQ direct effect needs a when clause: "
                "`requires F != 0` (run) or `requires F == 0` (discard)")
        if self.is_error:
            return self.problem("a runQ direct effect cannot be an ERROR effect")
        if where_text is not None:
            return self.problem("a runQ direct effect takes no where clause yet")
        if name in self.failed:
            return False
        got = self._compute_prog(name)
        if got is None:
            return False
        prog, lits, raw_lits = got
        io_used = [t for t in prog if isinstance(t, str) and t in IO_PRIMS]
        if io_used:
            self.failed.add(name)
            return self.problem(
                f"IO word {io_used[0]!r} cannot be used inside a defined "
                f"word yet (only a bare @effect on the IO primitive itself)")
        self.runq_lits = lits
        self.runq_lit_vars = [f"lit{i}" for i in range(len(lits))]
        used_names = set(_effect_vars(in_elems + out_elems))
        if any(v in used_names for v in self.runq_lit_vars):
            return self.problem(
                "an effect variable is named like a literal code "
                "(lit0, lit1, ...); rename it")
        # Top-level quotation shape: exactly one `?` and exactly
        # one `eval`, the `?` before the eval, the eval last, no
        # `cons`. (The router already ensured the token set is
        # {"?", "eval"}; here the shape must be top-level and
        # ordered.)
        quot_idx = [i for i, t in enumerate(prog) if isinstance(t, str) and t in QUOT_TOKENS]
        if len(quot_idx) != 2:
            return self.problem(
                "a runQ direct effect needs exactly one ? and one eval "
                "in its program")
        if prog[quot_idx[0]] != "?" or prog[quot_idx[1]] != "eval":
            return self.problem(
                "a runQ direct effect needs the ? before the eval")
        if quot_idx[1] != len(prog) - 1:
            return self.problem(
                "a runQ direct effect needs the eval as the last token")
        if any(isinstance(t, str) and t == "cons" for t in prog):
            return self.problem(
                "a runQ direct effect cannot contain cons")
        # No quotation token inside any literal body (the router
        # counts those too; a quot token in an un-run literal
        # would break the one-of-each shape).
        for body_prog in lits:
            for t in body_prog:
                if isinstance(t, str) and t in QUOT_TOKENS:
                    return self.problem(
                        f"a literal body contains {t!r}, which is not "
                        f"supported in a runQ direct word yet")
        # The body Lean expression for each literal (as in v30/v31).
        # A literal whose raw contents are a single defined word W
        # is the word's program def (`WProg`); a single primitive
        # is a one-element list; anything else is the inlined body
        # as a literal list. A literal naming a word that itself
        # contains a literal is not supported yet.
        lit_body_lean = []
        lit_prog_defs = []
        lit_words = []
        for k, raw in enumerate(raw_lits):
            body_prog = lits[k]
            if (len(raw) == 1 and isinstance(raw[0], str)
                    and raw[0] in self.defs and raw[0] not in PRIMS):
                w = raw[0]
                if _is_rec_single_word(raw, body_prog, self.defs, self._frontier_cached()):
                    # (v37) Recursive single-word literal `[W]`: emit the
                    # inlined body (with `Tok.call self_W`) directly instead
                    # of a `WProg` reference (which would be underapplied /
                    # circular). Ensure `WProg` exists for `hself`.
                    lit_body_lean.append(
                        "[" + ", ".join(_tok_lean(t) for t in body_prog) + "]")
                    lit_prog_defs.append(None)
                    if self._compute_prog(w) is None:
                        return False
                    lit_words.append(w)
                    continue
                if any(isinstance(t, tuple) and t[0] == "lit" for t in body_prog):
                    return self.problem(
                        f"a literal naming {w!r}, which itself contains a "
                        f"literal, is not supported yet")
                lit_body_lean.append(f"{lean_name(w)}Prog")
                lit_prog_defs.append(f"{lean_name(w)}Prog")
                if self._compute_prog(w) is None:
                    return False
                lit_words.append(w)
            elif (len(raw) == 1 and isinstance(raw[0], str)
                    and raw[0] in PRIMS):
                lit_body_lean.append(f"[{PRIMS[raw[0]]}]")
                lit_prog_defs.append(None)
            else:
                lit_body_lean.append(
                    "[" + ", ".join(_tok_lean(t) for t in body_prog) + "]")
                lit_prog_defs.append(None)
        self.runq_lit_words = lit_words
        self.spec_lit_bodies = lit_body_lean
        # Input/output shape: a rest, a flag variable, two
        # quotation slots; a single output rest. The slots are
        # `[..R -- ..S]` and `[..R -- ..T]` (both from the input
        # rest); the output rest is one of the two slot outputs.
        if len(in_elems) != 4 or len(out_elems) != 1:
            return self.problem(
                "a runQ direct effect needs `..R F [..R -- ..S] "
                "[..R -- ..T] == ..S` (or `..T`)")
        in_first = in_elems[0]
        flag_var = in_elems[1]
        if not re.fullmatch(r"[A-Za-z_][A-Za-z0-9_]*", flag_var or ""):
            return self.problem(
                f"the flag {flag_var!r} must be a variable")
        slot1 = _parse_quot_slot(in_elems[2])
        slot2 = _parse_quot_slot(in_elems[3])
        if slot1 is None or slot1[0] != "ptr" or slot2 is None or slot2[0] != "ptr":
            return self.problem(
                "a runQ direct effect needs two quotation slots "
                "`[..R -- ..S] [..R -- ..T]` in its input")
        in_rest = self._quot_rest_name(in_first)
        if in_rest is None:
            if in_first == "...":
                in_rest = "R"
                while in_rest in used_names or in_rest in self.runq_lit_vars:
                    in_rest += "_"
            else:
                return self.problem(
                    "a runQ direct effect needs a named input rest "
                    "`..R` (or `...`)")
        if slot1[1] != f"..{in_rest}" or slot2[1] != f"..{in_rest}":
            return self.problem(
                "both quotation slots must start from the input rest "
                f"..{in_rest}")
        out_rest1 = self._quot_rest_name(slot1[2])
        out_rest2 = self._quot_rest_name(slot2[2])
        if out_rest1 is None or out_rest2 is None:
            return self.problem(
                "both quotation slots must name their output rest "
                "(`[..R -- ..S]`, not `[..R -- ...]`)")
        out_rest = self._quot_rest_name(out_elems[0])
        if out_rest is None:
            return self.problem(
                "a runQ direct effect needs a named output rest "
                "(`..S` or `..T`)")
        # The when clause decides run vs discard. Run: the `?`
        # runs, the FIRST quotation (QB) is chosen, body B1,
        # output S. Discard: the `?` discards, the SECOND
        # quotation (QC) is chosen, body C1, output T.
        # (translate_expr parenthesises a comparison, so the
        # condition arrives as `(F ≠ 0)` / `(F = 0)`.)
        try:
            cond_lean = translate_expr(cond)
        except ExprError as ex:
            return self.problem(f"cannot translate expression: {ex}")
        if cond_lean == f"({flag_var} ≠ 0)":
            is_run = True
            code_var, body_var = "QB", "B1"
            case_out_rest = out_rest1
        elif cond_lean == f"({flag_var} = 0)":
            is_run = False
            code_var, body_var = "QC", "C1"
            case_out_rest = out_rest2
        else:
            return self.problem(
                f"a runQ direct effect needs `requires {flag_var} != 0` "
                f"(run) or `requires {flag_var} == 0` (discard)")
        if out_rest != case_out_rest:
            return self.problem(
                f"the output rest ..{out_rest} does not match the "
                f"{'run' if is_run else 'discard'} case "
                f"(..{case_out_rest})")
        # The two code/body variable names (QB/QC, B1/C1) must not
        # collide with an effect variable.
        code1, code2, body1, body2 = "QB", "QC", "B1", "C1"
        if any(v in used_names for v in (code1, code2, body1, body2)):
            return self.problem(
                "an effect variable is named QB, QC, B1, or C1; rename it")
        # Simulate the prefix up to the `?` dispatch. The input
        # stack is the flag and the two codes, on the input rest.
        try:
            p_stack, p_rest, p_queue, p_tail, steps, remaining = _shape_runq_cond(
                prog, [flag_var, code1, code2], in_rest, [], "qq",
                stop_at_cond=True)
        except ValueError as ex:
            return self.problem(str(ex))
        if not p_stack:
            return self.problem(
                "the stack is empty when ? runs (a quotation code and a "
                "flag are needed)")
        top = p_stack[-1]
        if not (isinstance(top, str) and re.fullmatch(r"lit\d+", top)):
            return self.problem(
                "the ? must dispatch on a quotation literal "
                f"(the stack top at ? time is {top!r}, not a literal code)")
        lit_k = int(top[3:])
        if len(p_stack) < 2:
            return self.problem(
                "the stack has a quotation code but no flag when ? runs")
        flag_expr = p_stack[-2]
        if flag_expr != flag_var:
            return self.problem(
                f"the ? flag is {flag_expr!r}, but the when clause is "
                f"about {flag_var!r}")
        stack_below = p_stack[:-2]
        # The dispatched literal's body (as in v31): a concrete
        # program of primitives/shuffles/comparisons only (no
        # quotation token, no nested literal, no IO).
        body_prog = lits[lit_k]
        for t in body_prog:
            if isinstance(t, tuple):
                return self.problem(
                    "a literal inside the ? body is not supported yet")
            if isinstance(t, str) and t in QUOT_TOKENS:
                return self.problem(
                    f"the ? body contains {t!r}, which is not supported yet")
            if isinstance(t, str) and t in IO_PRIMS:
                return self.problem(
                    f"the ? body contains IO word {t!r}")
            if isinstance(t, str) and t not in PRIMS:
                return self.problem(
                    f"the ? body contains unknown token {t!r}")
        # The suffix: everything after the `?`, which must end in
        # the eval. Simulate the part before the eval, on the
        # post-cond stack (run: body first, then suffix; discard:
        # suffix only). The stack must end as just the chosen code
        # on the input rest, and the queue restored to `qq`.
        if not remaining or remaining[-1] != "eval":
            return self.problem(
                "a runQ direct effect needs the eval as the last token")
        suffix_pre = remaining[:-1]
        try:
            if is_run:
                b_stack, _, b_queue, _, _, _ = _shape_runq_cond(
                    body_prog, list(stack_below), p_rest, list(p_queue),
                    p_tail, stop_at_cond=False)
                f_stack, _, f_queue, _, _, _ = _shape_runq_cond(
                    suffix_pre, list(b_stack), p_rest, list(b_queue),
                    p_tail, stop_at_cond=False)
            else:
                f_stack, _, f_queue, _, _, _ = _shape_runq_cond(
                    suffix_pre, list(stack_below), p_rest, list(p_queue),
                    p_tail, stop_at_cond=False)
        except ValueError as ex:
            return self.problem(str(ex))
        if f_stack != [code_var] or p_rest != in_rest:
            return self.problem(
                f"after the ? and the suffix the stack is "
                f"{_stack_lean(f_stack, p_rest)}, but the eval must "
                f"run {code_var} on the input rest ..{in_rest}")
        if _queue_lean(f_queue, p_tail) != "qq":
            return self.problem(
                "after the ? and the suffix the queue is not restored "
                "to the ambient queue qq")
        # Fuel: the run-case total -- every inlined program token
        # (including the cond and the eval) plus the cond body's
        # tokens. The discard case needs one less (no body), and
        # extra fuel is harmless.
        fuel_n = len(prog) + len(body_prog)
        self.runq_direct_fuel = f"(fuel + {fuel_n})"
        # Stacks: the input (flag, both codes, on the input rest)
        # and the output (the case's rest alone -- the body's
        # output replaces the input rest).
        self.runq_direct_in_stack = lean_list_bottom_to_top(
            [flag_var, code1, code2], in_rest)
        self.runq_direct_out_stack = case_out_rest
        # Hypotheses: the when condition, the literal lookups,
        # the two quotation lookups, and the body's effect (with
        # the queue at dispatch time, which is the ambient qq).
        self.runq_direct_hyps = (
            [cond_lean]
            + [f"lookup defs lit{k} = some {lit_body_lean[k]}"
               for k in range(len(lits))]
            + [f"lookup defs {code1} = some {body1}",
               f"lookup defs {code2} = some {body2}",
               f"execQ fuel {body_var} {in_rest} qq [] [] [] defs = "
               f"(Outcome.ok {case_out_rest} qq [], defs')"])
        lit_intro = " ".join(f"hlookupLit{k}" for k in range(len(lits)))
        if lit_intro:
            self.runq_direct_intro = (
                f"intro hf {lit_intro} hlookup{code1} hlookup{code2} hbody")
        else:
            self.runq_direct_intro = (
                f"intro hf hlookup{code1} hlookup{code2} hbody")
        # Proof: simp reduces the inlined program (the cond via
        # the literal lookup, the eval via the quotation lookup),
        # then the body's hypothesis closes it. The run case
        # matches exactly; the discard case's body gets one extra
        # fuel (the cond did not run the literal body), lifted by
        # execQ_ok_mono.
        simp_parts = (["execQ", "step", f"{self.ln}Prog"]
                      + [f"hlookupLit{k}" for k in range(len(lits))]
                      + [d for d in lit_prog_defs if d is not None]
                      + [f"hlookup{code_var}", "hf"])
        simp_line = f"  simp [{', '.join(simp_parts)}]"
        if is_run:
            self.runq_direct_proof = [
                simp_line,
                "  exact hbody",
            ]
        else:
            self.runq_direct_proof = [
                simp_line,
                f"  exact execQ_ok_mono (fuel := fuel) (fuel' := fuel + 1) "
                f"(by omega) {body_var} {in_rest} qq [] [] [] defs "
                f"{case_out_rest} qq [] defs' hbody",
            ]
        # Binders: defs, the flag / codes / literal codes (one Int
        # group), the two bodies, the three rests, defs', fuel, qq.
        seen_b = []
        for v in [flag_var, code1, code2] + self.runq_lit_vars:
            if v not in seen_b:
                seen_b.append(v)
        bvars = " ".join(seen_b)
        self.runq_direct_binders = (
            f" (defs : Defs)"
            + (f" ({bvars} : Int)" if bvars else "")
            + f" ({body1} {body2} : List Tok)"
            + f" ({in_rest} {out_rest1} {out_rest2} : Stack)"
            + f" (defs' : Defs) (fuel : Nat) (qq : Stack)")
        self.runq_prog_app = (
            f"{self.ln}Prog"
            + (f" {' '.join(self.runq_lit_vars)}" if self.runq_lit_vars else ""))
        self.runq_direct_spec = (cond_lean, in_rest, case_out_rest,
                                 flag_var, code1, code2, body1, body2,
                                 code_var, body_var)
        self.is_runq_direct = True
        self.suffix = "" if self.n_effects == 1 else f"_{self.idx + 1}"
        return True

    def _prepare_runq_between(self):
        """A defined word that runs a literal [W] via eval, where
        W is a defined word whose own program contains exactly
        one `?` running a concrete literal (v33, Phase 6). The
        theorem is a runQ theorem with a FIXED fuel (no fuel
        binder, no body hypothesis), proved by direct simp with a
        trichotomy case split on the `?`'s computed flag. The
        `?`'s flag is a comparison (e.g. `LO > HI`); the where
        clause's output is a top-level if whose condition is the
        opposite strict comparison (e.g. `LO < HI`). The three
        cases (flag / ¬flag ∧ outer / ¬flag ∧ ¬outer) cover the
        space; in each, simp reduces the inlined program (the
        eval splices W's program in, the cond runs the concrete
        literal) and omega resolves the if-expressions. The word
        has ONE @effect with a `where` clause (no `when`, no
        ERROR). Fuel is FIXED: len(outer program) + len(W
        program) + len(cond body) (between?: 20 + 11 + 1 = 32).
        The `?` lives inside W's program, so the flag is found
        by simulating the expanded program (the eval splices W's
        body in) up to the `?`."""
        name = self.name
        in_elems, out_elems = self.in_elems, self.out_elems
        cond, where_text = self.cond, self.where_text
        if cond is not None:
            return self.problem("a runQ between effect takes no when clause yet")
        if self.is_error:
            return self.problem("a runQ between effect cannot be an ERROR effect")
        if where_text is None:
            return self.problem(
                "a runQ between effect needs a where clause stating the output")
        if name in self.failed:
            return False
        got = self._compute_prog(name)
        if got is None:
            return False
        prog, lits, raw_lits = got
        io_used = [t for t in prog if isinstance(t, str) and t in IO_PRIMS]
        if io_used:
            self.failed.add(name)
            return self.problem(
                f"IO word {io_used[0]!r} cannot be used inside a defined "
                f"word yet (only a bare @effect on the IO primitive itself)")
        self.runq_lits = lits
        self.runq_lit_vars = [f"lit{i}" for i in range(len(lits))]
        used_names = set(_effect_vars(in_elems + out_elems))
        if any(v in used_names for v in self.runq_lit_vars):
            return self.problem(
                "an effect variable is named like a literal code "
                "(lit0, lit1, ...); rename it")
        # No quotation slot in the inputs or outputs (as in v31):
        # the quotations are literals from the definition, not
        # variable slots in the effect.
        for e in in_elems + out_elems:
            if _parse_quot_slot(e) is not None:
                return self.problem(
                    f"a runQ between effect takes no quotation element {e!r} "
                    f"(the quotations are literals from the definition)")
        # Rest handling (as in v31): the rest must be preserved.
        # Unnamed, it defaults to `R`.
        is_rest_tok = lambda e: e in ("...", "∅") or self._quot_rest_name(e) is not None
        if any(is_rest_tok(e) for e in in_elems[1:] + out_elems[1:]):
            return self.problem(
                "a rest token is only allowed at the far left (the rest position)")
        in_first = in_elems[0] if in_elems else None
        out_first = out_elems[0] if out_elems else None
        in_empty = in_first == "∅"
        out_empty = out_first == "∅"
        if in_empty != out_empty:
            return self.problem(
                "the rest must be preserved by a runQ between word "
                "(it cannot be dropped or conjured)")
        in_named = self._quot_rest_name(in_first)
        out_named = self._quot_rest_name(out_first)
        if in_named is not None and out_named is not None and in_named != out_named:
            return self.problem(
                f"the rest is named ..{in_named} on the input and ..{out_named} "
                f"on the output; use the same name on both sides")
        rest_name = in_named or out_named
        if rest_name is None and not in_empty:
            rest_name = "R"
            while rest_name in used_names or rest_name in self.runq_lit_vars:
                rest_name += "_"
        in_vars = [e for e in in_elems if not is_rest_tok(e)]
        out_vars = [e for e in out_elems if not is_rest_tok(e)]
        if len(out_vars) != 1:
            return self.problem(
                "a runQ between effect needs exactly one output value")
        # The `where` clause: a single equation `F = <if-expr>`.
        # (parse_where_clauses splits on `∧`, which breaks here --
        # the if-expression itself contains `∧` -- so this path
        # parses the single equation directly.)
        m_eq = re.split(r"(?<![=!<>])=(?![=])", where_text, maxsplit=1)
        if len(m_eq) != 2:
            return self.problem(
                "a runQ between effect needs a where clause `F = <if-expr>`")
        where_lhs, where_rhs = m_eq[0].strip(), m_eq[1].strip()
        if where_lhs != out_vars[0]:
            return self.problem(
                f"a runQ between effect needs a where equation for its "
                f"output {out_vars[0]!r} (got {where_lhs!r})")
        try:
            rhs_lean = translate_expr(where_rhs)
            rhs_ast = _parse_expr(where_rhs)
        except ExprError as ex:
            return self.problem(f"cannot translate where right-hand side: {ex}")
        rhs_vars = _effect_vars([where_rhs])
        bad = [v for v in rhs_vars if v not in in_vars and v != rest_name]
        if bad:
            return self.problem(
                f"where right-hand side mentions {bad[0]!r}, which is "
                f"not an input variable")
        if rhs_ast[0] != "if":
            return self.problem(
                "a runQ between effect needs the where right-hand side "
                "to be a top-level if-expression")
        outer_cond_ast = rhs_ast[1]
        outer_cond_lean = _emit_expr(outer_cond_ast)
        # Find the outer literal [W]: a program literal whose raw
        # contents are a single defined word W that itself
        # contains exactly one `?` (and no other quotation
        # token). There must be exactly one such literal, and
        # exactly one literal marker in the outer program total
        # (the [W] one).
        outer_marks = [t[1] for t in prog
                       if isinstance(t, tuple) and t[0] == "lit"]
        if len(outer_marks) != 1:
            return self.problem(
                "a runQ between effect needs exactly one literal in "
                "its program (the [W] literal)")
        outer_lit_k = outer_marks[0]
        outer_raw = raw_lits[outer_lit_k]
        if not (len(outer_raw) == 1 and isinstance(outer_raw[0], str)
                and outer_raw[0] in self.defs and outer_raw[0] not in PRIMS):
            return self.problem(
                "a runQ between effect needs its literal to be a "
                "single defined word [W] (e.g. [sort2])")
        w_name = outer_raw[0]
        wgot = self._compute_prog(w_name)
        if wgot is None:
            return False
        w_prog, w_lits, w_raw = wgot
        w_quot_top = [x for x in w_prog
                      if isinstance(x, str) and x in QUOT_TOKENS]
        if w_quot_top != ["?"]:
            return self.problem(
                f"the literal word {w_name!r} must contain exactly one "
                f"? and no other quotation token")
        for wl in w_lits:
            for x in wl:
                if isinstance(x, str) and x in QUOT_TOKENS:
                    return self.problem(
                        f"a literal inside {w_name!r} contains {x!r}, "
                        f"which is not supported yet")
        # W's program: exactly one literal marker (the one its ?
        # runs). Its outer index is read off W's body as embedded
        # in this word's lits (markers are remapped to outer
        # indices when the literal is inlined).
        w_body = lits[outer_lit_k]
        inner_marks = [t[1] for t in w_body
                       if isinstance(t, tuple) and t[0] == "lit"]
        if len(inner_marks) != 1:
            return self.problem(
                f"the literal word {w_name!r} must contain exactly one "
                f"literal (the one its ? runs)")
        inner_lit_k = inner_marks[0]
        if len(lits) != 2:
            return self.problem(
                "a runQ between effect needs exactly two literals "
                "(the [W] literal and the literal inside W)")
        # Outer program: exactly one `eval` (top-level), no
        # top-level `?` or `cons`.
        outer_quot = [x for x in prog
                      if isinstance(x, str) and x in QUOT_TOKENS]
        if outer_quot != ["eval"]:
            return self.problem(
                "a runQ between effect needs exactly one eval and no "
                "other top-level quotation token in its program")
        # The `?`'s body (the literal inside W): a concrete
        # program of primitives only (no quotation token, no
        # nested literal, no IO).
        inner_body = lits[inner_lit_k]
        for t in inner_body:
            if isinstance(t, tuple):
                return self.problem(
                    "a literal inside the ? body is not supported yet")
            if isinstance(t, str) and t in QUOT_TOKENS:
                return self.problem(
                    f"the ? body contains {t!r}, which is not supported yet")
            if isinstance(t, str) and t in IO_PRIMS:
                return self.problem(
                    f"the ? body contains IO word {t!r}")
            if isinstance(t, str) and t not in PRIMS:
                return self.problem(
                    f"the ? body contains unknown token {t!r}")
        # Simulate the expanded program up to the `?` (the eval
        # splices W's body in). The flag is the stack element
        # below the quotation code.
        try:
            p_stack, p_rest, p_queue, p_tail, steps, remaining, eval_lit = (
                _shape_runq_between(prog, lits, list(in_vars), rest_name,
                                  [], "qq"))
        except ValueError as ex:
            return self.problem(str(ex))
        if eval_lit is None:
            return self.problem(
                "the ? was reached without an eval (the eval must run "
                "the [W] literal)")
        if eval_lit != outer_lit_k:
            return self.problem(
                f"the eval runs literal lit{eval_lit}, but the [W] "
                f"literal is lit{outer_lit_k}")
        if not p_stack:
            return self.problem(
                "the stack is empty when ? runs (a quotation code and a "
                "flag are needed)")
        top = p_stack[-1]
        if not (isinstance(top, str) and re.fullmatch(r"lit\d+", top)):
            return self.problem(
                "the ? must dispatch on a quotation literal "
                f"(the stack top at ? time is {top!r}, not a literal code)")
        if int(top[3:]) != inner_lit_k:
            return self.problem(
                f"the ? dispatches on lit{top[3:]}, but the literal "
                f"inside {w_name!r} is lit{inner_lit_k}")
        if len(p_stack) < 2:
            return self.problem(
                "the stack has a quotation code but no flag when ? runs")
        flag_expr = p_stack[-2]
        m_if = re.fullmatch(r"\(if (.+) then 1 else 0\)", flag_expr)
        if m_if is None:
            return self.problem(
                f"the ? flag {flag_expr!r} is not supported (a comparison "
                f"if-expression)")
        flag_cond_str = m_if.group(1)
        # Trichotomy: the flag condition and the where
        # if-condition must be opposite strict comparisons on the
        # same two values (e.g. `LO > HI` vs `LO < HI`), so the
        # three cases (flag / ¬flag ∧ outer / ¬flag ∧ ¬outer)
        # cover the space and each determines both the program's
        # path and the output if-expression.
        def _cmp_parts(cond_str):
            try:
                ast = _parse_expr(cond_str)
            except ExprError:
                return None
            if ast[0] != "bin" or ast[1] not in (
                    "<", ">", "=", "<=", ">=", "!="):
                return None
            return (ast[1], _emit_expr(ast[2]), _emit_expr(ast[3]))
        flag_parts = _cmp_parts(flag_cond_str)
        outer_parts = None
        if (outer_cond_ast[0] == "bin" and outer_cond_ast[1] in (
                "<", ">", "=", "<=", ">=", "!=")):
            outer_parts = (outer_cond_ast[1], _emit_expr(outer_cond_ast[2]),
                           _emit_expr(outer_cond_ast[3]))
        if flag_parts is None or outer_parts is None:
            return self.problem(
                "the ? flag and the where if-condition must both be "
                "comparisons")
        f_op, f_a, f_b = flag_parts
        o_op, o_a, o_b = outer_parts
        if {f_a, f_b} != {o_a, o_b} or {f_op, o_op} != {"<", ">"}:
            return self.problem(
                f"the ? flag ({flag_cond_str}) and the where "
                f"if-condition ({outer_cond_lean}) must be opposite "
                f"strict comparisons on the same two values "
                f"(e.g. `LO > HI` vs `LO < HI`)")
        flag_cond_lean = _emit_expr(_parse_expr(flag_cond_str))
        # Fuel: the run-case total -- every outer program token
        # (including the eval dispatch), plus W's program tokens
        # (spliced in at the eval, including the cond dispatch),
        # plus the cond body's tokens (spliced in at the cond in
        # the run case). The discard case needs one less, and
        # extra fuel is harmless.
        fuel_n = len(prog) + len(w_body) + len(inner_body)
        self.runq_between_fuel = fuel_n
        # Stacks: the input (bottom-to-top) and the output (the
        # direct form -- the where right-hand side on the rest).
        self.runq_between_in_stack = lean_list_bottom_to_top(in_vars, rest_name)
        self.runq_between_out_stack = lean_list_bottom_to_top([rhs_lean], rest_name)
        # Hypotheses (in lit index order): the inner literal's
        # concrete body, and the outer literal's body, which is
        # W's Prog applied to the inner lit variable. W's Prog
        # def is emitted alongside (runq_lit_words), reusing the
        # one from W's own effect when it exists.
        w_ln = lean_name(w_name)
        inner_body_lean = ("[" + ", ".join(_tok_lean(t) for t in inner_body) + "]")
        # Parenthesised: `some sort2Prog lit0` misparses as
        # `(some sort2Prog) lit0` (`some` binds tighter than
        # application of the Prog def to its lit argument).
        outer_body_lean = f"({w_ln}Prog lit{inner_lit_k})"
        lit_hyp = {
            inner_lit_k: f"lookup defs lit{inner_lit_k} = some {inner_body_lean}",
            outer_lit_k: f"lookup defs lit{outer_lit_k} = some {outer_body_lean}",
        }
        self.runq_between_hyps = [lit_hyp[k] for k in range(len(lits))]
        lit_intro = " ".join(f"hlookupLit{k}" for k in range(len(lits)))
        self.runq_between_intro = f"intro {lit_intro}" if lit_intro else ""
        # Proof: trichotomy on the flag, then on the outer
        # if-condition; simp reduces the inlined program in each
        # branch and omega resolves the if-expressions.
        hgt = "hgt"
        while hgt in used_names or hgt in self.runq_lit_vars:
            hgt += "_"
        hlt = "hlt"
        while hlt in used_names or hlt in self.runq_lit_vars or hlt == hgt:
            hlt += "_"
        simp_base = (["execQ", "step", f"{self.ln}Prog", f"{w_ln}Prog"]
                     + [f"hlookupLit{k}" for k in range(len(lits))])
        simp_run = f"  · simp [{', '.join(simp_base + [hgt])}] <;> omega"
        simp_nested = f"    · simp [{', '.join(simp_base + [hgt, hlt])}] <;> omega"
        self.runq_between_proof = [
            f"  by_cases {hgt} : {flag_cond_lean}",
            simp_run,
            f"  · by_cases {hlt} : {outer_cond_lean}",
            simp_nested,
            simp_nested,
        ]
        # Binders: defs, the input variables and literal codes
        # (one Int group, as in the hand-proof), the rest, qq.
        # No fuel binder, no body binder.
        seen_b = []
        for v in in_vars + self.runq_lit_vars:
            if v not in seen_b:
                seen_b.append(v)
        bvars = " ".join(seen_b)
        self.runq_between_binders = (
            f" (defs : Defs)"
            + (f" ({bvars} : Int)" if bvars else "")
            + (f" ({rest_name} : Stack)" if rest_name is not None else "")
            + f" (qq : Stack)")
        self.runq_prog_app = (
            f"{self.ln}Prog"
            + (f" {' '.join(self.runq_lit_vars)}" if self.runq_lit_vars else ""))
        self.runq_lit_words = [w_name]
        self.is_runq_between = True
        self.suffix = "" if self.n_effects == 1 else f"_{self.idx + 1}"
        return True

    def _prepare_runq_compose(self):
        """A defined word with exactly TWO evals on variable
        quotations (v34, Phase 6: the general composer). The
        program is split at each eval into segments; each eval's
        body becomes a `p1` in an execQ_append application, and
        the remainder (including the later eval) is `p2`, proved
        by a nested application. This handles ANY number of evals
        by nesting (only two are implemented and tested here;
        three or more are a clean problem for now). The body
        hypotheses are universally quantified over the leftover
        input/oracle (they run mid-program, so execQ_append's h1
        needs them at the current inp/orc -- a hypothesis about
        `[] []` cannot be used here, as the first hand-proof
        attempt showed). Defs are unchanged (a body containing
        `cons` is a clean problem). Fuel is `fuelB + fuelC +
        (P + M + S + 2)` where P/M are the prefix/middle lengths
        (including each eval dispatch), S the suffix length, and
        2 the execQ_append slack (one per application). The word
        has ONE @effect with no `where`, no `when`, no ERROR, and
        exactly two quotation slots `[..r <vals> -- ..s]` in its
        inputs (one per eval, run in input order); each slot's
        output side must be a bare rest `..s` (a single value,
        named by lowercasing the rest); the output is the two
        slot output rests in order. (bi is the first word:
        `bi:..R A [..R A --..S] [..R A --..T] ==..S ..T`.)
        (v35: the dispatch stack may have extra elements below
        the slot's input values -- a "prefix" the body
        preserves. bi2's [dup2] doubles (A, B) before the eval,
        so C runs on (B)::(A)::(B)::(A)::R. The body's input
        is the full dispatch stack, its output is the prefix
        plus the single output value; the following simulations
        start from the full output, not just the value. A
        literal body may contain an eval and/or a nested
        literal: the simulator splices it (v30) and the eval
        inside counts as one of the two variable evals.)"""
        name = self.name
        in_elems, out_elems = self.in_elems, self.out_elems
        cond, where_text = self.cond, self.where_text
        if where_text is not None:
            return self.problem("a runQ compose effect takes no where clause yet")
        if cond is not None:
            return self.problem("a runQ compose effect takes no when clause yet")
        if self.is_error:
            return self.problem("a runQ compose effect cannot be an ERROR effect")
        if name in self.failed:
            return False
        got = self._compute_prog(name)
        if got is None:
            return False
        prog, lits, raw_lits = got
        io_used = [t for t in prog if isinstance(t, str) and t in IO_PRIMS]
        if io_used:
            self.failed.add(name)
            return self.problem(
                f"IO word {io_used[0]!r} cannot be used inside a defined "
                f"word yet (only a bare @effect on the IO primitive itself)")
        self.runq_lits = lits
        self.runq_lit_vars = [f"lit{i}" for i in range(len(lits))]
        used_names = set(_effect_vars(in_elems + out_elems))
        if any(v in used_names for v in self.runq_lit_vars):
            return self.problem(
                "an effect variable is named like a literal code "
                "(lit0, lit1, ...); rename it")
        # No `?`/`cons` anywhere (top-level or in a literal body):
        # this path is eval-only. (The routing already ensures
        # this; re-check for a clear message.)
        for _t in prog:
            if isinstance(_t, str) and _t in ("?", "cons"):
                return self.problem(
                    f"a runQ compose word cannot contain {_t!r}")
        for _lit in lits:
            for _t in _lit:
                if isinstance(_t, str) and _t in ("?", "cons"):
                    return self.problem(
                        f"a runQ compose word cannot contain {_t!r} "
                        f"(in a literal body)")
        # The literal bodies (v30 logic, copied): a single defined
        # word W is W's Prog def; a single primitive is a
        # one-element list; anything else is the inlined body as a
        # literal list. A literal naming a word that itself
        # contains a literal is not supported (its Prog takes lit
        # params this theorem does not have). A literal body
        # containing an eval is FINE (it is spliced in and
        # simulated -- that is how bi's [sip] contributes the
        # first eval).
        lit_body_lean = []
        lit_prog_defs = []
        lit_words = []
        for k, raw in enumerate(raw_lits):
            body_prog = lits[k]
            if (len(raw) == 1 and isinstance(raw[0], str)
                    and raw[0] in self.defs and raw[0] not in PRIMS):
                w = raw[0]
                if _is_rec_single_word(raw, body_prog, self.defs, self._frontier_cached()):
                    # (v37) Recursive single-word literal `[W]`: emit the
                    # inlined body (with `Tok.call self_W`) directly instead
                    # of a `WProg` reference (which would be underapplied /
                    # circular). Ensure `WProg` exists for `hself`.
                    lit_body_lean.append(
                        "[" + ", ".join(_tok_lean(t) for t in body_prog) + "]")
                    lit_prog_defs.append(None)
                    if self._compute_prog(w) is None:
                        return False
                    lit_words.append(w)
                    continue
                if any(isinstance(t, tuple) and t[0] == "lit" for t in body_prog):
                    return self.problem(
                        f"a literal naming {w!r}, which itself contains a "
                        f"literal, is not supported yet")
                lit_body_lean.append(f"{lean_name(w)}Prog")
                lit_prog_defs.append(f"{lean_name(w)}Prog")
                if self._compute_prog(w) is None:
                    return False
                lit_words.append(w)
            elif (len(raw) == 1 and isinstance(raw[0], str)
                    and raw[0] in PRIMS):
                lit_body_lean.append(f"[{PRIMS[raw[0]]}]")
                lit_prog_defs.append(None)
            else:
                lit_body_lean.append(
                    "[" + ", ".join(_tok_lean(t) for t in body_prog) + "]")
                lit_prog_defs.append(None)
        self.runq_lit_words = lit_words
        self.spec_lit_bodies = lit_body_lean
        # The two quotation slots in the inputs. Each is a
        # pointer slot `[..r <vals> -- ..s]`; the output side
        # must be a bare rest `..s` (a single value). Any other
        # bracketed input element is not a slot.
        slot_pos = []
        slots = []
        for i, e in enumerate(in_elems):
            s = _parse_quot_slot(e)
            if s is not None:
                if s[0] != "ptr":
                    return self.problem(
                        f"a runQ compose input element {e!r} is not a "
                        f"quotation slot `[..r -- ..s]`")
                slot_pos.append(i)
                slots.append(s)
        if len(slots) != 2:
            return self.problem(
                "a runQ compose effect needs exactly two quotation "
                f"slots `[..r -- ..s]` in its inputs (found {len(slots)})")

        def parse_side(side):
            """A slot side (`..r`, `..r a`, `..r a b`) -> (rest,
            extra elements bottom-to-top). The first element must
            be a named rest."""
            parts = side.split()
            if not parts:
                return None, None
            r = self._quot_rest_name(parts[0])
            if r is None:
                return None, None
            return r, parts[1:]

        slot_in = []
        slot_out_rest = []
        for s in slots:
            in_rest, in_extra = parse_side(s[1])
            out_rest, out_extra = parse_side(s[2])
            if in_rest is None:
                return self.problem(
                    f"the quotation slot {s!r} must start its input "
                    f"side with a named rest")
            if out_rest is None or out_extra:
                return self.problem(
                    f"the quotation slot {s!r} must have a bare rest "
                    f"`..x` as its output side (a single value)")
            slot_in.append((in_rest, in_extra))
            slot_out_rest.append(out_rest)
        # The input rest: from the first input element, or from
        # the slots (both slots must agree with it).
        in_first = in_elems[0] if in_elems else None
        in_rest = self._quot_rest_name(in_first) if in_first else None
        if in_rest is None:
            in_rest = slot_in[0][0]
        if slot_in[0][0] != in_rest or slot_in[1][0] != in_rest:
            return self.problem(
                "both quotation slots must start from the input rest "
                f"..{in_rest}")
        in_rest_name = in_rest
        # The output elements must be exactly the two slot output
        # rests, in order.
        if len(out_elems) != 2:
            return self.problem(
                "a runQ compose effect needs exactly two output "
                "elements (the two slot output rests)")
        out_rests = []
        for e in out_elems:
            r = self._quot_rest_name(e)
            if r is None:
                return self.problem(
                    f"a runQ compose output element {e!r} must be a "
                    f"rest `..x` (a slot output rest)")
            out_rests.append(r)
        if out_rests != slot_out_rest:
            return self.problem(
                f"the output rests {out_rests} must be the slot "
                f"output rests {slot_out_rest} in order")
        # Names for the two quotations (first/second, as in the
        # old comment `a [B] [C] bi == b c`): code, body, fuel,
        # and the single output value (the output rest name,
        # lowercased). Collision-free against the effect variables.
        def fresh(base):
            n = base
            while n in used_names:
                n += "_"
            used_names.add(n)
            return n
        code1 = fresh("QB")
        body1 = fresh("B_body")
        fuel1 = fresh("fuelB")
        letter1 = "B"
        code2 = fresh("QC")
        body2 = fresh("C_body")
        fuel2 = fresh("fuelC")
        letter2 = "C"
        out_val1 = fresh(slot_out_rest[0].lower())
        out_val2 = fresh(slot_out_rest[1].lower())
        # Input variables (non-rest elements), with each slot
        # replaced by its code variable. Output values, in order.
        is_rest_tok = lambda e: e in ("...", "∅") or self._quot_rest_name(e) is not None
        in_vars = []
        slot_i = 0
        for e in in_elems:
            if is_rest_tok(e):
                continue
            s = _parse_quot_slot(e)
            if s is not None:
                in_vars.append(code1 if slot_i == 0 else code2)
                slot_i += 1
            else:
                in_vars.append(e)
        out_values = [out_val1, out_val2]
        self.runq_compose_in_stack = lean_list_bottom_to_top(in_vars, in_rest_name)
        self.runq_compose_out_stack = lean_list_bottom_to_top(out_values, in_rest_name)
        # Body input/output stacks (v35: prefix-aware). Each body
        # runs on the slot's input side, BUT the dispatch stack
        # may have extra elements below the slot's values (a
        # "prefix" the body preserves). bi2's [dup2] doubles
        # (A, B) before the eval, so C runs on
        # (B)::(A)::(B)::(A)::R and produces (c)::(B)::(A)::R:
        # the prefix is (A, B). The prefix is extracted from the
        # simulated dispatch stack (which must end with the
        # slot's input values); the body's input is the full
        # dispatch stack, its output is the prefix plus the
        # single output value. (v34 required the dispatch stack
        # to equal the slot's input side exactly -- the
        # empty-prefix case, e.g. bi.)
        def split_prefix(dispatch_elems, slot_vals, out_val, which):
            """Split a simulated dispatch stack (bottom-to-top,
            code popped) into (prefix, body_in_stack,
            body_out_stack). The stack must end with the slot's
            input values; the elements below them are the prefix
            the body preserves. Returns None after recording a
            clean problem when the stack does not end with the
            values."""
            if slot_vals:
                if (len(dispatch_elems) < len(slot_vals)
                        or dispatch_elems[-len(slot_vals):] != slot_vals):
                    self.problem(
                        f"the stack below the {which} quotation at eval "
                        f"time is {_stack_lean(dispatch_elems, in_rest_name)}, "
                        f"but it must end with the quotation slot's input "
                        f"values {slot_vals}")
                    return None
                prefix = dispatch_elems[:-len(slot_vals)]
            else:
                prefix = list(dispatch_elems)
            body_in = _stack_lean(dispatch_elems, in_rest_name)
            body_out = lean_list_bottom_to_top(
                prefix + [out_val], in_rest_name)
            return prefix, body_in, body_out
        # --- First simulation: program start to the first
        # variable eval. ---
        try:
            p_stack, p_rest, p_queue, p_tail, steps1, remaining1 = _shape_runq_expanded(
                prog, lits, list(in_vars), in_rest_name, [], "qq")
        except ValueError as ex:
            return self.problem(str(ex))
        if not p_stack or p_stack[-1] != code1:
            return self.problem(
                "the first eval does not run the first quotation "
                f"(the stack top at eval time is "
                f"{p_stack[-1] if p_stack else None!r}, not {code1!r})")
        body1_in_elems = p_stack[:-1]
        _split1 = split_prefix(
            body1_in_elems, slot_in[0][1], out_val1, "first")
        if _split1 is None:
            return False
        prefix1, body1_in_stack, body1_out_stack = _split1
        queue1 = _queue_lean(p_queue, p_tail)
        # The program after the first eval's body is a Rest def
        # (it must contain no literal marker -- a literal there
        # would need lit params on the Rest def).
        if any(isinstance(t, tuple) for t in remaining1):
            return self.problem(
                "a literal in the program after the first eval is "
                "not supported yet")
        rest_name = f"{self.ln}Rest1"
        rest1_lean = "[" + ", ".join(_tok_lean(t) for t in remaining1) + "]"
        self.runq_compose_rest_name = rest_name
        self.runq_compose_rest_lean = rest1_lean
        # --- Second simulation: Rest1 from body1's output to the
        # second variable eval. The start stack is body1's full
        # output (its prefix plus the output value), not just the
        # output value alone (v35: bi2's prefix (A, B) is still
        # on the stack here). ---
        try:
            m_stack, m_rest, m_queue, m_tail, steps2, remaining2 = _shape_runq_expanded(
                remaining1, lits, prefix1 + [out_val1], in_rest_name, list(p_queue), p_tail)
        except ValueError as ex:
            return self.problem(str(ex))
        if not m_stack or m_stack[-1] != code2:
            return self.problem(
                "the second eval does not run the second quotation "
                f"(the stack top at eval time is "
                f"{m_stack[-1] if m_stack else None!r}, not {code2!r})")
        body2_in_elems = m_stack[:-1]
        _split2 = split_prefix(
            body2_in_elems, slot_in[1][1], out_val2, "second")
        if _split2 is None:
            return False
        prefix2, body2_in_stack, body2_out_stack = _split2
        queue2 = _queue_lean(m_queue, m_tail)
        # The suffix (tokens after the second eval). A third eval
        # here is a clean problem (the plain simulator refuses it).
        if any(isinstance(t, tuple) for t in remaining2):
            return self.problem(
                "a literal in the program after the second eval is "
                "not supported yet")
        suffix_lean = "[" + ", ".join(_tok_lean(t) for t in remaining2) + "]"
        # --- Third simulation: the suffix from body2's output
        # (again the full output: prefix plus value, v35). ---
        try:
            f_stack, f_rest, f_queue, f_tail = _shape_runq(
                remaining2, prefix2 + [out_val2], in_rest_name, list(m_queue), m_tail)
        except ValueError as ex:
            return self.problem(str(ex))
        final_stack = _stack_lean(f_stack, f_rest)
        final_queue = _queue_lean(f_queue, f_tail)
        if final_stack != self.runq_compose_out_stack:
            return self.problem(
                f"after the suffix the stack is {final_stack}, but the effect "
                f"says {self.runq_compose_out_stack}")
        if final_queue != "qq":
            return self.problem(
                f"after the suffix the queue is {final_queue}, but it must be "
                f"restored to the ambient queue qq")
        # --- Fuel. --- P/M are the prefix/middle lengths
        # (including each eval dispatch), S the suffix length, E
        # = 2 the execQ_append slack (one per application).
        P = steps1 + 1
        M = steps2 + 1
        S = len(remaining2)
        E = 2
        total_N = P + M + S + E
        total_fuel = f"({fuel1} + {fuel2} + {total_N})"
        # Fuel for Rest1 (the F2 of the first append) and for
        # (C_body ++ suffix) (the fuel at the second append).
        f2_1 = f"{fuel2} + {M + S + E - 1}"
        fuel_cplus = f"{fuel2} + {S + E - 1}"
        f2_2 = S
        self.runq_compose_total_fuel = total_fuel
        # --- Hypotheses (in order): literal lookups, the two
        # quotation lookups, then the two body effects in the
        # ∀-over-inp/orc form (they run mid-program). ---
        q1p, q2p = f"({queue1})", f"({queue2})"
        b1is, b1os = f"({body1_in_stack})", f"({body1_out_stack})"
        b2is, b2os = f"({body2_in_stack})", f"({body2_out_stack})"
        lit_hyps = [
            f"lookup defs lit{k} = some {lit_body_lean[k]}"
            for k in range(len(lits))]
        self.runq_compose_hyps = lit_hyps + [
            f"lookup defs {code1} = some {body1}",
            f"lookup defs {code2} = some {body2}",
            f"(∀ (inp : In) (orc : Oracle), execQ {fuel1} {body1} {b1is} {q1p} inp orc [] defs = (Outcome.ok {b1os} {q1p} [], defs))",
            f"(∀ (inp : In) (orc : Oracle), execQ {fuel2} {body2} {b2is} {q2p} inp orc [] defs = (Outcome.ok {b2os} {q2p} [], defs))",
        ]
        lit_intro = " ".join(f"hlookupLit{k}" for k in range(len(lits)))
        intro_parts = (([lit_intro] if lit_intro else [])
                       + [f"hlookup{code1}", f"hlookup{code2}",
                          f"hbody{letter1}", f"hbody{letter2}"])
        self.runq_compose_intro = "intro " + " ".join(intro_parts)
        # --- Proof: nested execQ_append (the hand-proof shape). ---
        # (The Prog application is set here, before the proof
        # lines use it -- it is also needed by _emit_runq_compose.)
        self.runq_prog_app = (
            f"{self.ln}Prog"
            + (f" {' '.join(self.runq_lit_vars)}" if self.runq_lit_vars else ""))
        outp = f"({self.runq_compose_out_stack})"
        in_stack_p = f"({self.runq_compose_in_stack})"
        prog_app_p = f"({self.runq_prog_app})"
        simp_prefix = (["execQ", "step", f"{self.ln}Prog"]
                       + [d for d in lit_prog_defs if d is not None]
                       + [rest_name]
                       + [f"hlookupLit{k}" for k in range(len(lits))]
                       + [f"hlookup{code1}"])
        self.runq_compose_proof = [
            f"  have hprefix : execQ {total_fuel} {prog_app_p} {in_stack_p} qq [] [] [] defs = execQ ({fuel1} + {fuel2} + {total_N - P}) ({body1} ++ {rest_name}) {b1is} {q1p} [] [] [] defs := by",
            f"    simp [{', '.join(simp_prefix)}]",
            f"  rw [hprefix]",
            f"  have happ := execQ_append (F2 := {f2_1}) (p2 := {rest_name}) (s2 := {outp}) (q2 := qq) (acts2 := []) (defs2 := defs)",
            f"    {fuel1} {body1} {b1is} {q1p} [] [] [] defs {b1os} {q1p} [] defs (hbody{letter1} [] [])",
            f"  apply happ",
            f"  intro inp1 orc1",
            f"  have hrest1 : execQ ({f2_1}) {rest_name} {b1os} {q1p} inp1 orc1 [] defs = execQ ({fuel_cplus}) ({body2} ++ {suffix_lean}) {b2is} {q2p} inp1 orc1 [] defs := by",
            f"    simp [execQ, step, {rest_name}, hlookup{code2}]",
            f"  rw [hrest1]",
            f"  have happ2 := execQ_append (F2 := {f2_2}) (p2 := {suffix_lean}) (s2 := {outp}) (q2 := qq) (acts2 := []) (defs2 := defs)",
            f"    {fuel2} {body2} {b2is} {q2p} inp1 orc1 [] defs {b2os} {q2p} [] defs (hbody{letter2} inp1 orc1)",
            f"  apply happ2",
            f"  intro inp2 orc2",
            f"  simp [execQ, step]",
        ]
        # --- Binders: defs, the literal codes, the input
        # variables (the quotation codes included), the two
        # bodies, the two output values, the rest, the two fuels,
        # qq. No defs' binder (defs unchanged). ---
        seen_b = []
        for v in in_vars:
            if v not in seen_b:
                seen_b.append(v)
        in_bvars = " ".join(seen_b)
        lit_binder = (f" ({' '.join(self.runq_lit_vars)} : Int)"
                      if self.runq_lit_vars else "")
        self.runq_compose_binders = (
            f" (defs : Defs)"
            + lit_binder
            + (f" ({in_bvars} : Int)" if in_bvars else "")
            + f" ({body1} {body2} : List Tok)"
            + f" ({out_val1} {out_val2} : Int)"
            + f" ({in_rest_name} : Stack)"
            + f" ({fuel1} {fuel2} : Nat) (qq : Stack)")
        self.runq_compose_spec = (body1_in_stack, body1_out_stack, queue1,
                                  code1, body1, body2_in_stack,
                                  body2_out_stack, queue2, code2, body2,
                                  fuel1, fuel2)
        self.is_runq_compose = True
        self.suffix = "" if self.n_effects == 1 else f"_{self.idx + 1}"
        return True

    def _prepare_runq_computed_flag(self):
        """(v36) A defined word whose program runs a quotation B
        (a single-value slot `[..r <vals> -- B]`) via a
        [sip swap]-style dip, then a branch (choose + eval)
        whose flag is B's single output value b, where one
        branch arm is a concrete literal and the other is [eval]
        (running C). The `where` clause is a single
        if-expression on b. The theorem is proved by
        execQ_append for B, a by_cases on b, then either a
        direct simp (the concrete arm) or a second execQ_append
        for C (the [eval] arm). The Rest1 (the program after
        B's eval) is an inline Lean list, not a def (it contains
        pushes of the branch literals). Defs are unchanged.
        The shape is detected generally (two variable evals, a
        `?` whose flag is the first eval's single output, one
        concrete arm and one [eval] arm); anything else is a
        clean problem, not a fallthrough to v32."""
        # --- Guards: no when, no ERROR, a where clause is
        # required. ---
        if self.cond is not None:
            return self.problem(
                "computed-flag path: 'when' not supported")
        if self.where_text is None:
            return self.problem(
                "computed-flag path: needs a where clause (a single "
                "if on the computed flag)")
        if self.is_error:
            return self.problem(
                "computed-flag path: ERROR not supported")
        # --- Program, IO, literals (the v30 logic, as in v34).
        # ---
        got = self._compute_prog(self.name)
        if got is None:
            return False
        prog, lits, raw_lits = got
        in_elems = self.in_elems
        out_elems = self.out_elems
        io_used = [t for t in prog if isinstance(t, str) and t in IO_PRIMS]
        if io_used:
            return self.problem(
                f"computed-flag path: IO word {io_used[0]!r} cannot be "
                f"used inside a defined word yet")
        for _lit in lits:
            io_used = [t for t in _lit if isinstance(t, str) and t in IO_PRIMS]
            if io_used:
                return self.problem(
                    f"computed-flag path: IO word {io_used[0]!r} cannot be "
                    f"used inside a defined word yet (in a literal body)")
        n_lits = len(lits)
        if n_lits == 0:
            return self.problem(
                "computed-flag path: no quotation literals")
        self.runq_lit_vars = [f"lit{i}" for i in range(n_lits)]
        lit_body_lean = []
        lit_prog_defs = []
        lit_words = []
        for k, raw in enumerate(raw_lits):
            body_prog = lits[k]
            if (len(raw) == 1 and isinstance(raw[0], str)
                    and raw[0] in self.defs and raw[0] not in PRIMS):
                w = raw[0]
                if _is_rec_single_word(raw, body_prog, self.defs, self._frontier_cached()):
                    lit_body_lean.append(
                        "[" + ", ".join(_tok_lean(t) for t in body_prog) + "]")
                    lit_prog_defs.append(None)
                    if self._compute_prog(w) is None:
                        return False
                    lit_words.append(w)
                    continue
                if any(isinstance(t, tuple) and t[0] == "lit" for t in body_prog):
                    return self.problem(
                        f"computed-flag path: a literal naming {w!r}, which "
                        f"itself contains a literal, is not supported yet")
                lit_body_lean.append(f"{lean_name(w)}Prog")
                lit_prog_defs.append(f"{lean_name(w)}Prog")
                if self._compute_prog(w) is None:
                    return False
                lit_words.append(w)
            elif (len(raw) == 1 and isinstance(raw[0], str)
                    and raw[0] in PRIMS):
                lit_body_lean.append(f"[{PRIMS[raw[0]]}]")
                lit_prog_defs.append(None)
            else:
                lit_body_lean.append(
                    "[" + ", ".join(_tok_lean(t) for t in body_prog) + "]")
                lit_prog_defs.append(None)
        self.runq_lits = lit_body_lean
        self.runq_lit_words = lit_words
        self.spec_lit_bodies = lit_body_lean
        # --- The two single-value slots. ---
        def parse_slot_side(side):
            """A slot input side (`..r`, `..r a`, `..r a b`) ->
            (rest, extra elements bottom-to-top). The first
            element must be a named rest."""
            parts = side.split()
            if not parts:
                return None, None
            r = self._quot_rest_name(parts[0])
            if r is None:
                return None, None
            return r, parts[1:]
        slot_elems = [e for e in in_elems if e.startswith("[")]
        if len(slot_elems) != 2:
            return self.problem(
                "computed-flag path: needs exactly two quotation "
                f"slots `[..r <vals> -- B]` in its inputs "
                f"(found {len(slot_elems)})")
        parsed = []
        for e in slot_elems:
            s = _parse_quot_slot(e)
            if s is None or s[0] != "ptr_val":
                return self.problem(
                    f"computed-flag path: {e} is not a single-value "
                    f"quotation slot `[..r <vals> -- B]`")
            in_rest, in_extra = parse_slot_side(s[1])
            if in_rest is None:
                return self.problem(
                    f"computed-flag path: the slot {e} must start its "
                    f"input side with a named rest")
            parsed.append(((in_rest, in_extra), s[2]))
        (rest1, vals1), valB = parsed[0]
        (rest2, vals2), valC = parsed[1]
        if rest1 != rest2 or vals1 != vals2:
            return self.problem(
                "computed-flag path: the two slots must take the same "
                "input (same rest and values)")
        if valB == valC:
            return self.problem(
                "computed-flag path: the two slots must produce "
                "different output values")
        # --- The rest and the output. ---
        if len(out_elems) != 2 or not out_elems[0].startswith(".."):
            return self.problem(
                "computed-flag path: the outputs must be a rest and "
                "one value (..r F)")
        out_rest_name = self._quot_rest_name(out_elems[0])
        out_var = out_elems[1]
        if out_rest_name is None or out_rest_name != rest1:
            return self.problem(
                "computed-flag path: the output rest must be the "
                "slots' input rest")
        if not re.fullmatch(r"[A-Z][A-Za-z0-9_]*", out_var):
            return self.problem(
                "computed-flag path: the output value must be a bare "
                "uppercase name")
        # --- The input rest and the input values. ---
        if not in_elems or not in_elems[0].startswith(".."):
            return self.problem(
                "computed-flag path: the inputs must start with a "
                "named rest")
        in_rest_name = self._quot_rest_name(in_elems[0])
        if in_rest_name is None or in_rest_name != rest1:
            return self.problem(
                "computed-flag path: the input rest must be the "
                "slots' rest")
        in_vals = []
        for e in in_elems[1:]:
            if e.startswith("["):
                continue
            if not re.fullmatch(r"[A-Z][A-Za-z0-9_]*", e):
                return self.problem(
                    f"computed-flag path: input {e!r} is not a bare "
                    f"uppercase value")
            in_vals.append(e)
        if in_vals != vals1:
            return self.problem(
                "computed-flag path: the input values must be the "
                "slots' input values")
        if len(set(in_vals)) != len(in_vals):
            return self.problem(
                "computed-flag path: duplicate input value")
        # --- Fresh names (collision-free against every effect
        # variable, including the where clause's). ---
        used_names = set(_effect_vars(in_elems + out_elems))
        used_names |= set(_effect_vars([self.where_text]))
        used_names |= set(self.runq_lit_vars)
        def fresh(base):
            n = base
            while n in used_names:
                n += "_"
            used_names.add(n)
            return n
        code1 = fresh("QB")
        code2 = fresh("QC")
        body1 = fresh("B_body")
        body2 = fresh("C_body")
        fuel1 = fresh("fuelB")
        fuel2 = fresh("fuelC")
        out_val1 = fresh(valB.lower())
        out_val2 = fresh(valC.lower())
        hb = fresh("hb")
        hb0 = fresh("hb0")
        # The input values in the program (the slot codes replace
        # the bracketed elements, in order). The rest element is
        # not a value -- it is the stack's tail, tracked
        # separately as in_rest_name (as in v34).
        is_rest_tok = lambda e: e in ("...", "∅") or self._quot_rest_name(e) is not None
        in_vars = []
        j = 0
        for e in in_elems:
            if is_rest_tok(e):
                continue
            s = _parse_quot_slot(e)
            if s is not None:
                in_vars.append(code1 if j == 0 else code2)
                j += 1
            else:
                in_vars.append(e)
        # --- The where clause: a single if on the flag. ---
        where = self.where_text.strip()
        if "=" not in where:
            return self.problem(
                "computed-flag path: the where clause must be an "
                "equation F = if ...")
        lhs, rhs = where.split("=", 1)
        lhs = lhs.strip()
        rhs = rhs.strip()
        if lhs != out_var:
            return self.problem(
                "computed-flag path: the where clause must assign "
                "the output value")
        try:
            rhs_ast = _parse_expr(rhs)
        except ValueError as ex:
            return self.problem(
                f"computed-flag path: where clause does not parse ({ex})")
        if rhs_ast[0] != "if":
            return self.problem(
                "computed-flag path: the where clause must be a "
                "single if-expression")
        cond_ast, then_ast, else_ast = rhs_ast[1], rhs_ast[2], rhs_ast[3]
        # The condition must be the flag compared to 0.
        # (`_parse_expr` keeps numbers as strings: ("num", "0").)
        def _is_zero(node):
            return node[0] == "num" and str(node[1]) == "0"
        flag_nonzero = None
        if cond_ast[0] == "bin" and cond_ast[1] in ("!=", "=="):
            l, r = cond_ast[2], cond_ast[3]
            if l == ("var", valB) and _is_zero(r):
                flag_nonzero = cond_ast[1] == "!="
            elif r == ("var", valB) and _is_zero(l):
                flag_nonzero = cond_ast[1] == "!="
        if flag_nonzero is None:
            return self.problem(
                "computed-flag path: the where condition must be the "
                "flag compared to 0")
        # One arm is the second slot's output C, the other a
        # concrete integer literal.
        c_arm_where = None
        conc_ast = None
        if then_ast == ("var", valC):
            c_arm_where = "then"
            conc_ast = else_ast
        elif else_ast == ("var", valC):
            c_arm_where = "else"
            conc_ast = then_ast
        if c_arm_where is None or conc_ast[0] != "num":
            return self.problem(
                "computed-flag path: the where arms must be C and a "
                "concrete integer")
        conc_val = conc_ast[1]
        # The where clause may only mention the input values, the
        # two slot outputs, and the output value.
        allowed = set(in_vals) | {valB, valC, out_var}
        where_vars = _ast_var_names(rhs_ast)
        bad = sorted(v for v in where_vars if v not in allowed)
        if bad:
            return self.problem(
                "computed-flag path: the where clause mentions "
                f"unknown variables {bad}")
        rename = {valB: out_val1, valC: out_val2}
        rhs_renamed = _rename_ast_vars(rhs_ast, rename)
        rhs_lean = _emit_expr(rhs_renamed)
        # The then-arm is the cond's RUN arm iff the condition is
        # `B != 0` (the cond runs the literal when the flag is
        # nonzero).
        then_is_run = flag_nonzero
        # --- Simulate the prefix to B's eval. ---
        try:
            (p_stack, p_rest, p_queue, p_tail, steps1,
             remaining1) = _shape_runq_expanded(
                prog, lits, list(in_vars), in_rest_name, [], "qq")
        except ValueError as ex:
            return self.problem(
                f"computed-flag path: prefix simulation failed ({ex})")
        if not p_stack or p_stack[-1] != code1:
            return self.problem(
                "computed-flag path: the first eval does not dispatch "
                "on the first quotation")
        b_below = p_stack[:-1]
        if vals1:
            if (len(b_below) < len(vals1)
                    or b_below[-len(vals1):] != vals1):
                return self.problem(
                    "computed-flag path: the first quotation's input "
                    "values are not the dispatch stack's top")
            b_prefix = b_below[:-len(vals1)]
        else:
            b_prefix = list(b_below)
        if p_rest != in_rest_name:
            return self.problem(
                "computed-flag path: the first quotation's input rest "
                "is not the input rest")
        b_in_stack = lean_list_bottom_to_top(b_below, p_rest)
        b_out_elems = b_prefix + [out_val1]
        b_out_stack = lean_list_bottom_to_top(b_out_elems, p_rest)
        q1p = _queue_lean(p_queue, p_tail)
        steps_dispatch_B = steps1 + 1
        rest1_lean = "[" + ", ".join(_tok_lean(t) for t in remaining1) + "]"
        len_rest1 = len(remaining1)
        # --- Simulate Rest1 to the cond. ---
        try:
            (c_stack, c_rest, c_queue, c_tail, _steps_cond,
             remaining_after) = _shape_runq_cond(
                remaining1, b_out_elems, p_rest, p_queue, p_tail,
                stop_at_cond=True)
        except ValueError as ex:
            return self.problem(
                f"computed-flag path: Rest1 simulation failed ({ex})")
        if len(c_stack) < 2:
            return self.problem(
                "computed-flag path: the cond has no flag and "
                "literal below it")
        def _lit_index(elem):
            m = re.fullmatch(r"lit(\d+)", elem or "")
            return int(m.group(1)) if m else None
        litS = _lit_index(c_stack[-1])
        flag_tok = c_stack[-2]
        if litS is None:
            return self.problem(
                "computed-flag path: the cond does not dispatch on "
                "a literal")
        if flag_tok != out_val1:
            return self.problem(
                "computed-flag path: the cond's flag is not the "
                "first quotation's output value")
        litS_body = lits[litS]
        if _tokens_use_quot(litS_body, self.defs, ()):
            return self.problem(
                "computed-flag path: the cond literal's body uses a "
                "quotation token")
        if any(isinstance(t, tuple) for t in litS_body):
            return self.problem(
                "computed-flag path: the cond literal's body contains "
                "a nested literal")
        if any(isinstance(t, str) and t in IO_PRIMS for t in litS_body):
            return self.problem(
                "computed-flag path: the cond literal's body uses IO")
        s_elems = c_stack[:-2]
        s_rest = c_rest
        s_queue, s_tail = c_queue, c_tail
        if not remaining_after or remaining_after[-1] != "eval":
            return self.problem(
                "computed-flag path: the program after the cond must "
                "end with an eval")
        pre_eval = remaining_after[:-1]
        # --- Simulate both arms of the cond to find the [eval]
        # arm and the concrete arm. ---
        def _sim_arm(arm_elems, arm_rest, arm_queue, arm_tail, run):
            elems, rest, queue, tail = arm_elems, arm_rest, arm_queue, arm_tail
            if run:
                try:
                    (elems, rest, queue, tail, _s, _r) = _shape_runq_cond(
                        litS_body, elems, rest, queue, tail,
                        stop_at_cond=False)
                except ValueError as ex:
                    raise ValueError(f"cond body simulation failed ({ex})")
            try:
                (elems, rest, queue, tail, _s, _r) = _shape_runq_cond(
                    pre_eval, elems, rest, queue, tail,
                    stop_at_cond=False)
            except ValueError as ex:
                raise ValueError(f"post-cond simulation failed ({ex})")
            return elems, rest, queue, tail
        try:
            (run_elems, run_rest, run_queue, run_tail) = _sim_arm(
                s_elems, s_rest, s_queue, s_tail, run=True)
            (disc_elems, disc_rest, disc_queue, disc_tail) = _sim_arm(
                s_elems, s_rest, s_queue, s_tail, run=False)
        except ValueError as ex:
            return self.problem(
                f"computed-flag path: arm simulation failed ({ex})")
        if not run_elems or not disc_elems:
            return self.problem(
                "computed-flag path: a branch arm leaves an empty stack")
        run_lit = _lit_index(run_elems[-1])
        disc_lit = _lit_index(disc_elems[-1])
        if run_lit is None or disc_lit is None:
            return self.problem(
                "computed-flag path: a branch arm does not end with "
                "a literal")
        if run_lit == disc_lit:
            return self.problem(
                "computed-flag path: both branch arms push the same "
                "literal")
        # Exactly one arm is [eval] (a single eval token) and the
        # other is concrete (no quotation token, no nested
        # literal, no IO).
        def _is_eval_lit(k):
            return lits[k] == ["eval"]
        def _is_concrete_lit(k):
            body = lits[k]
            if _tokens_use_quot(body, self.defs, ()):
                return False
            if any(isinstance(t, tuple) for t in body):
                return False
            if any(isinstance(t, str) and t in IO_PRIMS for t in body):
                return False
            return True
        run_is_eval = _is_eval_lit(run_lit)
        disc_is_eval = _is_eval_lit(disc_lit)
        run_is_conc = _is_concrete_lit(run_lit)
        disc_is_conc = _is_concrete_lit(disc_lit)
        if run_is_eval and disc_is_conc:
            c_arm, conc_arm = "run", "discard"
            c_lit, conc_lit = run_lit, disc_lit
            c_elems, c_rest, c_queue, c_tail = run_elems, run_rest, run_queue, run_tail
            conc_elems, conc_rest, conc_queue, conc_tail = disc_elems, disc_rest, disc_queue, disc_tail
        elif disc_is_eval and run_is_conc:
            c_arm, conc_arm = "discard", "run"
            c_lit, conc_lit = disc_lit, run_lit
            c_elems, c_rest, c_queue, c_tail = disc_elems, disc_rest, disc_queue, disc_tail
            conc_elems, conc_rest, conc_queue, conc_tail = run_elems, run_rest, run_queue, run_tail
        else:
            return self.problem(
                "computed-flag path: one branch arm must be [eval] "
                "and the other a concrete literal")
        # The where clause's C arm must be the [eval] arm.
        c_where_arm = "then" if (then_is_run == (c_arm == "run")) else "else"
        if c_where_arm != c_arm_where:
            return self.problem(
                "computed-flag path: the where clause puts C in the "
                "wrong branch arm")
        # --- Simulate C's dispatch and the concrete arm. ---
        if not c_elems or _lit_index(c_elems[-1]) != c_lit:
            return self.problem(
                "computed-flag path: the [eval] arm does not end "
                "with its literal")
        c_below = c_elems[:-1]
        if not c_below or c_below[-1] != code2:
            return self.problem(
                "computed-flag path: the [eval] arm does not dispatch "
                "on the second quotation")
        c_in_below = c_below[:-1]
        if vals2:
            if (len(c_in_below) < len(vals2)
                    or c_in_below[-len(vals2):] != vals2):
                return self.problem(
                    "computed-flag path: the second quotation's input "
                    "values are not the dispatch stack's top")
            c_prefix = c_in_below[:-len(vals2)]
        else:
            c_prefix = list(c_in_below)
        if c_rest != in_rest_name:
            return self.problem(
                "computed-flag path: the second quotation's input "
                "rest is not the input rest")
        c_in_stack = lean_list_bottom_to_top(c_in_below, c_rest)
        c_out_elems = c_prefix + [out_val2]
        c_out_stack = lean_list_bottom_to_top(c_out_elems, c_rest)
        q2p = _queue_lean(c_queue, c_tail)
        # The concrete arm: simulate its body on the stack below
        # its literal; it must leave the where clause's concrete
        # value on the rest, with the queue restored.
        if not conc_elems or _lit_index(conc_elems[-1]) != conc_lit:
            return self.problem(
                "computed-flag path: the concrete arm does not end "
                "with its literal")
        conc_below = conc_elems[:-1]
        try:
            (conc_out, conc_out_rest, conc_out_q, conc_out_t,
             _s, _r) = _shape_runq_cond(
                lits[conc_lit], conc_below, conc_rest, conc_queue,
                conc_tail, stop_at_cond=False)
        except ValueError as ex:
            return self.problem(
                f"computed-flag path: concrete arm simulation failed ({ex})")
        if len(conc_out) != 1 or conc_out[0] != str(conc_val):
            return self.problem(
                "computed-flag path: the concrete arm does not "
                "produce the where clause's concrete value")
        if conc_out_rest != in_rest_name:
            return self.problem(
                "computed-flag path: the concrete arm does not leave "
                "the input rest")
        if _queue_lean(conc_out_q, conc_out_t) != "qq":
            return self.problem(
                "computed-flag path: the concrete arm does not "
                "restore the queue")
        # --- Fuel: the prefix to B's eval, Rest1, the concrete
        # body, and the two append slacks. ---
        len_conc = len(lits[conc_lit])
        total_n = steps_dispatch_B + len_rest1 + len_conc + 2
        total_fuel = f"({fuel1} + {fuel2} + {total_n})"
        f2n = len_rest1 + len_conc + 1
        f2 = f"{fuel2} + {f2n}"
        # The C case's remaining fuel after Rest1, the cond body
        # (if the C arm is the run arm), and the [eval] literal's
        # own body have run.
        cond_runs_c = len(litS_body) if c_arm == "run" else 0
        len_eval_body = len(lits[c_lit])
        m = f2n - (len_rest1 + cond_runs_c + len_eval_body)
        if m < 1:
            return self.problem(
                "computed-flag path: the C case has no fuel left for "
                "its body")
        # --- Hypotheses (in order): the literal lookups, the
        # two quotation lookups, and the two body hypotheses
        # (universally quantified over the leftover input /
        # oracle, as in v34/v35). The stacks and queues are
        # parenthesised where they are arguments to execQ (as in
        # v34): an unparenthesised `::` chain would parse as
        # application to its head (`execQ fuelB B_body (QB) :: ...`
        # is `(execQ fuelB B_body QB) :: ...`).
        in_stack = lean_list_bottom_to_top(in_vars, in_rest_name)
        out_stack = lean_list_bottom_to_top([rhs_lean], in_rest_name)
        b_in_p = f"({b_in_stack})"
        b_out_p = f"({b_out_stack})"
        q1_p = f"({q1p})"
        c_in_p = f"({c_in_stack})"
        c_out_p = f"({c_out_stack})"
        q2_p = f"({q2p})"
        hyps = []
        for k in range(n_lits):
            hyps.append(
                f"(hlookupLit{k} : lookup defs lit{k} = some {self.runq_lits[k]})")
        hyps.append(f"(hlookup{code1} : lookup defs {code1} = some {body1})")
        hyps.append(f"(hlookup{code2} : lookup defs {code2} = some {body2})")
        hyps.append(
            f"(hbodyB : ∀ (inp orc : Stack), execQ {fuel1} {body1} {b_in_p} {q1_p} inp orc [] defs = (Outcome.ok {b_out_p} {q1_p} [], defs))")
        hyps.append(
            f"(hbodyC : ∀ (inp orc : Stack), execQ {fuel2} {body2} {c_in_p} {q2_p} inp orc [] defs = (Outcome.ok {c_out_p} {q2_p} [], defs))")
        intro = "intro " + " ".join(
            [f"hlookupLit{k}" for k in range(n_lits)]
            + [f"hlookup{code1}", f"hlookup{code2}", "hbodyB", "hbodyC"])
        # --- The proof. ---
        # (The Prog application is set here, before the proof
        # lines use it -- it is also needed by
        # _emit_runq_computed_flag.)
        self.runq_prog_app = (
            f"{self.ln}Prog"
            + (f" {' '.join(self.runq_lit_vars)}" if self.runq_lit_vars else ""))
        prog_app_p = f"({self.runq_prog_app})"
        in_stack_p = f"({in_stack})"
        outp = f"({out_stack})"
        simp_terms = (["execQ", "step", f"{self.ln}Prog"]
                      + [d for d in lit_prog_defs if d is not None]
                      + [f"hlookupLit{k}" for k in range(n_lits)])
        simp_all = ", ".join(simp_terms)
        # The hypothesis that selects the C arm (run arm: b ≠ 0;
        # discard arm: b = 0) and the concrete arm.
        c_hyp = hb if c_arm == "run" else hb0
        conc_hyp = hb if conc_arm == "run" else hb0
        proof = [
            f"  have hprefix : execQ {total_fuel} {prog_app_p} {in_stack_p} qq [] [] [] defs = execQ ({fuel1} + {fuel2} + {total_n - steps_dispatch_B}) ({body1} ++ {rest1_lean}) {b_in_p} {q1_p} [] [] [] defs := by",
            f"    simp [{simp_all}, hlookup{code1}]",
            f"  rw [hprefix]",
            f"  have happ := execQ_append (F2 := {f2}) (p2 := {rest1_lean}) (s2 := {outp}) (q2 := qq) (acts2 := []) (defs2 := defs)",
            f"    {fuel1} {body1} {b_in_p} {q1_p} [] [] [] defs {b_out_p} {q1_p} [] defs (hbodyB [] [])",
            f"  apply happ",
            f"  intro inp1 orc1",
            f"  by_cases {hb} : {out_val1} ≠ 0",
        ]
        # Each by_cases branch: the run arm first, then the
        # discard arm. A concrete arm closes by direct simp; the
        # [eval] arm reduces Rest1 to C_body ++ [] and appends C.
        # The first line of a branch carries the bullet (run arm)
        # or follows the hb0 have (discard arm); the remaining
        # lines sit at the 4-space continuation indent.
        def _concrete_branch(first, hyp):
            return [f"{first}simp [{simp_all}, hlookup{code2}, {hyp}]"]
        def _c_branch(first, hyp):
            return [
                f"{first}have hrest1 : execQ ({f2}) {rest1_lean} {b_out_p} {q1_p} inp1 orc1 [] defs = execQ ({fuel2} + {m}) ({body2} ++ []) {c_in_p} {q2_p} inp1 orc1 [] defs := by",
                f"      simp [{simp_all}, hlookup{code2}, {hyp}]",
                f"    rw [hrest1]",
                f"    have hif : {rhs_lean} = {out_val2} := by simp [{hyp}]",
                f"    rw [hif]",
                f"    have happ2 := execQ_append (F2 := 0) (p2 := []) (s2 := {c_out_p}) (q2 := qq) (acts2 := []) (defs2 := defs)",
                f"      {fuel2} {body2} {c_in_p} {q2_p} inp1 orc1 [] defs {c_out_p} {q2_p} [] defs (hbodyC inp1 orc1) (fun _ _ => rfl)",
                f"    have happ2' := execQ_ok_mono (fuel := {fuel2} + 1) (fuel' := {fuel2} + {m}) (by omega) ({body2} ++ []) {c_in_p} {q2_p} inp1 orc1 [] defs {c_out_p} {q2_p} [] defs happ2",
                f"    exact happ2'",
            ]
        if conc_arm == "run":
            proof += _concrete_branch("  · ", hb)
        else:
            proof += _c_branch("  · ", hb)
        proof.append(f"  · have {hb0} : {out_val1} = 0 := by omega")
        if conc_arm == "discard":
            proof += _concrete_branch("    ", hb0)
        else:
            proof += _c_branch("    ", hb0)
        # --- Binders: defs, the literal codes, the input
        # variables (the quotation codes included), the two
        # bodies, the two output values, the rest, the two fuels,
        # qq. No defs' binder (defs unchanged). ---
        seen_b = []
        for v in in_vars:
            if v not in seen_b:
                seen_b.append(v)
        in_bvars = " ".join(seen_b)
        lit_binder = (f" ({' '.join(self.runq_lit_vars)} : Int)"
                      if self.runq_lit_vars else "")
        self.runq_cf_binders = (
            f" (defs : Defs)"
            + lit_binder
            + (f" ({in_bvars} : Int)" if in_bvars else "")
            + f" ({body1} {body2} : List Tok)"
            + f" ({out_val1} {out_val2} : Int)"
            + f" ({in_rest_name} : Stack)"
            + f" ({fuel1} {fuel2} : Nat) (qq : Stack)")
        self.runq_cf_spec = (b_in_stack, b_out_stack, q1p, code1, body1,
                             c_in_stack, c_out_stack, q2p, code2, body2,
                             fuel1, fuel2, in_rest_name)
        self.runq_cf_total_fuel = total_fuel
        self.runq_cf_hyps = hyps
        self.runq_cf_intro = intro
        self.runq_cf_proof = proof
        self.runq_cf_in_stack = in_stack
        self.runq_cf_out_stack = out_stack
        self.is_runq_computed_flag = True
        self.suffix = "" if self.n_effects == 1 else f"_{self.idx + 1}"
        return True

    def _quot_rest_name(self, tok):
        m = re.fullmatch(r"\.\.([A-Za-z_][A-Za-z0-9_]*)", tok or "")
        return m.group(1) if m else None

    def _quot_rest_or(self, tok, fallback):
        """A rest name for a quotation effect: a named rest `..x`
        gives `x`; the anonymous rest `...` takes `fallback`
        (the slot's rest name for eval/?, an invented `r` for
        cons). Anything else is not a rest."""
        name = self._quot_rest_name(tok)
        if name is not None:
            return name
        if tok == "...":
            return fallback
        return None

    def _prepare_quot_eval(self, in_elems, out_elems, cond):
        if cond is not None:
            return self.problem("eval takes no when clause")
        if len(in_elems) != 2 or len(out_elems) != 1:
            return self.problem(
                "eval needs `..r [..r -- ..s] == ..s` (a rest, "
                "a pointer slot, and an output rest; `...` is "
                "accepted as an unnamed rest)")
        slot = _parse_quot_slot(in_elems[1])
        if slot is None or slot[0] != "ptr":
            return self.problem(
                "eval needs `..r [..r -- ..s] == ..s` (a rest, "
                "a pointer slot, and an output rest; `...` is "
                "accepted as an unnamed rest)")
        in_rest = self._quot_rest_or(in_elems[0], slot[1][2:])
        out_rest = self._quot_rest_or(out_elems[0], slot[2][2:])
        if in_rest is None or out_rest is None:
            return self.problem(
                "eval needs `..r [..r -- ..s] == ..s` (a rest, "
                "a pointer slot, and an output rest; `...` is "
                "accepted as an unnamed rest)")
        if slot[1] != f"..{in_rest}" or slot[2] != f"..{out_rest}":
            return self.problem(
                f"the pointer slot {in_elems[1]!r} does not match the "
                f"rests ..{in_rest} and ..{out_rest}")
        self.quot_in_rest, self.quot_out_rest = in_rest, out_rest
        self.quot_in_stack = f"({self.quot_q} :: {in_rest})"
        self.quot_out_stack = out_rest
        self.quot_defs_prime = "defs'"
        self.quot_hyps = [
            f"lookup defs {self.quot_q} = some {self.quot_body}",
            f"execQ fuel {self.quot_body} {in_rest} qq [] [] [] defs = "
            f"(Outcome.ok {out_rest} qq [], defs')"]
        self.quot_intro = "intro hlookup hbody"
        self.quot_simp = f"simp [execQ, {self.ln}Prog, hlookup]"
        self.quot_finish = "exact hbody"
        return True

    def _prepare_quot_cons(self, in_elems, out_elems, cond):
        if cond is not None:
            return self.problem("cons takes no when clause")
        if len(in_elems) != 3 or len(out_elems) != 2:
            return self.problem(
                "cons needs `..r a [B] == ..r [a B]` (a rest, "
                "a value, a quotation, and the built quotation; "
                "`...` is accepted as an unnamed rest)")
        slot = _parse_quot_slot(in_elems[2])
        out_slot = _parse_quot_slot(out_elems[1])
        if (slot is None or slot[0] != "var"
                or out_slot is None or out_slot[0] != "cons_out"):
            return self.problem(
                "cons needs `..r a [B] == ..r [a B]` (a rest, "
                "a value, a quotation, and the built quotation; "
                "`...` is accepted as an unnamed rest)")
        a_var, b_var = in_elems[1], slot[1]
        if out_slot[1] != a_var or out_slot[2] != b_var:
            return self.problem(
                f"cons's output {out_elems[1]!r} must be built from "
                f"the input value {a_var!r} and quotation {b_var!r}")
        # An anonymous rest `...` takes an invented name `r`,
        # collision-free against the value, the quotation, and
        # the fixed `defs`/`fuel` binders.
        rest = "r"
        while rest in (a_var, b_var, "defs", "fuel"):
            rest += "_"
        in_rest = self._quot_rest_or(in_elems[0], rest)
        out_rest = self._quot_rest_or(out_elems[0], rest)
        if in_rest is None or out_rest is None or in_rest != out_rest:
            return self.problem(
                "cons needs `..r a [B] == ..r [a B]` (a rest, "
                "a value, a quotation, and the built quotation; "
                "`...` is accepted as an unnamed rest)")
        self.quot_in_rest, self.quot_out_rest = in_rest, out_rest
        self.quot_a, self.quot_b = a_var, b_var
        self.quot_in_stack = f"({b_var} :: {a_var} :: {in_rest})"
        self.quot_out_stack = f"((defs.length : Int) :: {in_rest})"
        self.quot_defs_prime = (
            f"defs ++ [[Tok.push {a_var}, Tok.call {b_var}]]")
        self.quot_hyps = []
        self.quot_intro = None
        self.quot_simp = f"simp [execQ, {self.ln}Prog]"
        self.quot_finish = None
        return True

    def _prepare_quot_cond(self, in_elems, out_elems, cond):
        if cond is None:
            return self.problem(
                "? needs a when clause: `requires f != 0` (run) or "
                "`requires f == 0` (discard)")
        if len(in_elems) != 3 or len(out_elems) != 1:
            return self.problem(
                "? needs `..r f [..r -- ..s] == ..s` (run) or "
                "`..r f [..r -- ..s] == ..r` (discard); `...` is "
                "accepted as an unnamed rest")
        slot = _parse_quot_slot(in_elems[2])
        if slot is None or slot[0] != "ptr":
            return self.problem(
                "? needs `..r f [..r -- ..s] == ..s` (run) or "
                "`..r f [..r -- ..s] == ..r` (discard); `...` is "
                "accepted as an unnamed rest")
        in_rest = self._quot_rest_or(in_elems[0], slot[1][2:])
        if in_rest is None:
            return self.problem(
                "? needs `..r f [..r -- ..s] == ..s` (run) or "
                "`..r f [..r -- ..s] == ..r` (discard); `...` is "
                "accepted as an unnamed rest")
        if slot[1] != f"..{in_rest}":
            return self.problem(
                f"the pointer slot {in_elems[2]!r} does not start "
                f"from the input rest ..{in_rest}")
        flag = in_elems[1]
        try:
            cond_lean = translate_expr(cond)
        except ExprError as ex:
            return self.problem(f"cannot translate expression: {ex}")
        # The output rest: a named rest `..x` gives `x`; the
        # anonymous rest `...` means "the slot's output" in the
        # run case and "the input rest, unchanged" in the
        # discard case.
        if "≠" in cond_lean:
            out_rest = self._quot_rest_or(out_elems[0], slot[2][2:])
        else:
            out_rest = self._quot_rest_or(out_elems[0], in_rest)
        if out_rest is None:
            return self.problem(
                "? needs `..r f [..r -- ..s] == ..s` (run) or "
                "`..r f [..r -- ..s] == ..r` (discard); `...` is "
                "accepted as an unnamed rest")
        self.quot_in_rest, self.quot_out_rest = in_rest, out_rest
        self.quot_flag = flag
        self.quot_cond_lean = cond_lean
        self.quot_in_stack = f"({self.quot_q} :: {flag} :: {in_rest})"
        if out_rest != in_rest:
            # Run case: the body transforms ..r into ..s, and the
            # when clause must say the flag is non-zero.
            if slot[2] != f"..{out_rest}" or "≠" not in cond_lean:
                return self.problem(
                    "? run case needs `..r f [..r -- ..s] == ..s "
                    "requires f != 0`")
            self.quot_out_stack = out_rest
            self.quot_defs_prime = "defs'"
            self.quot_hyps = [
                cond_lean,
                f"lookup defs {self.quot_q} = some {self.quot_body}",
                f"execQ fuel {self.quot_body} {in_rest} qq [] [] [] defs = "
                f"(Outcome.ok {out_rest} qq [], defs')"]
            self.quot_intro = "intro hf hlookup hbody"
            self.quot_simp = f"simp [execQ, {self.ln}Prog, hf, hlookup]"
            self.quot_finish = "exact hbody"
        else:
            # Discard case: the quotation is dropped, the stack is
            # unchanged, and the when clause must say the flag is 0.
            if "= 0" not in cond_lean:
                return self.problem(
                    "? discard case needs `..r f [..r -- ..s] == ..r "
                    "requires f == 0`")
            self.quot_out_stack = in_rest
            self.quot_defs_prime = "defs"
            self.quot_hyps = [cond_lean]
            self.quot_intro = "intro hf"
            self.quot_simp = f"simp [execQ, {self.ln}Prog, hf]"
            self.quot_finish = None
        return True

    def prepare(self):
        """Run the validations and compute the derived Lean fragments.
        Returns True when the effect is ready to emit."""
        name = self.name
        self.ln = lean_name(name)
        in_elems, out_elems = self.in_elems, self.out_elems
        cond, where_text = self.cond, self.where_text
        # ERROR: the word fails. It must be the whole output;
        # anything else with ERROR is malformed, and ERROR in
        # the inputs is meaningless.
        if "ERROR" in in_elems:
            return self.problem("ERROR is only allowed as the whole output")
        if "ERROR" in out_elems and out_elems != ["ERROR"]:
            return self.problem("ERROR must be the whole output")
        self.is_error = out_elems == ["ERROR"]
        # (v37) Recursive words (self-reachable through the call graph)
        # run their own preparation: `Tok.call` + `lookup defs` hypotheses,
        # arbitrary-position `..R` / list-splice outputs, and `@by-proof` /
        # `@by-induction` proofs (fbm_verify cannot do induction).
        # Callers that transitively reach a recursive word (e.g. `loop`
        # via `_loop`) join them: their proofs compose the callee's
        # effect lemma, so they need the same `Tok.call`/`lookup`
        # hypotheses (plus the callee's literal-code binders).
        try:
            _succ_p, _rec_words, _frontier_p = self._rec_cache()
            _rec_reached = _rec_deps_of(name, self.defs, _rec_words, _succ_p) if name in self.defs else set()
        except Exception:
            _rec_words, _rec_reached = set(), set()
            _frontier_p, _succ_p = set(), {}
        if name in _rec_words or _rec_reached:
            return self._prepare_recursive(_rec_words, _frontier_p, _succ_p)
        # Quotation words run their own preparation (the standard
        # rest validation does not apply -- the input and output
        # rests differ, and a quotation effect takes no where).
        if name in ("eval", "?", "cons"):
            return self.prepare_quot()
        # A defined word whose program contains a quotation token
        # (Phase 6, composition) runs its own preparation too --
        # the standard rest validation would reject its differing
        # input/output rests, and its theorem is a runQ theorem
        # proved by lemma application, not a `run` theorem.
        if name in self.defs and _uses_quot_token(name, self.defs):
            # Which quotation token(s)? A word whose only
            # quotation token is `?` goes to the cond path (v31);
            # anything else goes to the eval path, which refuses
            # non-eval tokens as a clean problem. The tokens are
            # collected from the inlined program and its literal
            # bodies (a `?` inside an un-run literal still counts
            # here -- the cond path then refuses it, because the
            # dispatch must be a top-level program token).
            got = self._compute_prog(name)
            if got is None:
                return False
            _prog, _lits, _raw = got
            # (v33) A literal [W] naming a defined word W that
            # itself contains `?` routes to the between? path,
            # which validates the shape (one [W] literal, one
            # eval, W with exactly one `?` running a concrete
            # literal) and reports violations as clean problems.
            # Anything without such a literal falls through to
            # the token-set dispatch below.
            _has_between_lit = False
            for _t in _prog:
                if isinstance(_t, tuple) and _t[0] == "lit":
                    _r = _raw[_t[1]]
                    if (len(_r) == 1 and isinstance(_r[0], str)
                            and _r[0] in self.defs and _r[0] not in PRIMS):
                        _wgot = self._compute_prog(_r[0])
                        if _wgot is None:
                            return False
                        _wprog, _wlits, _wraw = _wgot
                        _wtoks = set()
                        for _x in _wprog:
                            if isinstance(_x, str) and _x in QUOT_TOKENS:
                                _wtoks.add(_x)
                        for _wl in _wlits:
                            for _x in _wl:
                                if isinstance(_x, str) and _x in QUOT_TOKENS:
                                    _wtoks.add(_x)
                        if _wtoks == {"?"}:
                            _has_between_lit = True
                            break
            if _has_between_lit:
                return self._prepare_runq_between()
            _toks = set()
            for _t in _prog:
                if isinstance(_t, str) and _t in QUOT_TOKENS:
                    _toks.add(_t)
            for _lit in _lits:
                for _t in _lit:
                    if isinstance(_t, str) and _t in QUOT_TOKENS:
                        _toks.add(_t)
            # (v34) Two top-level `eval`s and no other quotation
            # token: the compose path (nested execQ_append for
            # two variable evals). _prepare_runq_compose
            # validates the full shape (exactly two variable
            # evals, run in slot order) and reports violations
            # as clean problems.
            if _toks == {"eval"} and sum(
                    1 for _t in _prog if _t == "eval") == 2:
                return self._prepare_runq_compose()
            # (v36) Two top-level `eval`s and a `?`: the
            # computed-flag path -- the first eval runs a
            # single-value quotation whose output is the flag
            # for the `?`, one arm concrete and the other
            # [eval]. _prepare_runq_computed_flag validates the
            # full shape and reports violations as clean
            # problems. (One top-level `eval` with a `?` is
            # the v32 direct path below.)
            if _toks == {"?", "eval"} and sum(
                    1 for _t in _prog if _t == "eval") == 2:
                return self._prepare_runq_computed_flag()
            if _toks == {"?", "eval"}:
                return self._prepare_runq_direct()
            if _toks == {"?"}:
                return self._prepare_runq_cond()
            return self._prepare_runq()
        # `where`: a property of the outputs, as equations var = expr
        # (the equational case). Each variable becomes an existential
        # and its expression is the witness; the theorem is
        # `∃ vars, (where-prop) ∧ run ... = Outcome.ok (...)`. A `where`
        # on an error effect is meaningless (there is no output).
        # `rand` is the exception: its `where` is a range
        # (`0 <= n ∧ n < max`), an inequality, not an equation --
        # so it is not parsed here at all. It is validated and
        # emitted by the rand-specific path below (the witness is
        # the oracle value `o % max`, and the range is proved by
        # the Int.emod lemmas). Any other inequality `where` is
        # still a clean problem (the general inequality case is
        # Phase 3).
        if where_text is not None:
            if self.is_error:
                return self.problem("where cannot be used with ERROR")
            if " when " in where_text:
                return self.problem(
                    "when must come before where (... when <cond> where <prop>)")
            if name == "rand":
                self.rand_where_text = where_text
            elif name == "getc":
                self.getc_where_text = where_text
            else:
                try:
                    self.where_eqs = parse_where_clauses(where_text)
                except ValueError as ex:
                    return self.problem(str(ex))
        # `rest` is dropped (v20): the anonymous rest has no name
        # to write, so `rest` and `rest.length` are both clean
        # problems now. Name the rest with `..r` (far left) and
        # use `r.length` for its length. A bare `rest` used as a
        # stack variable would be unbound in the theorem, so it
        # is a clean problem here instead of a confusing Lean
        # error.
        rest_reserved = any(
            re.search(r"(?<![A-Za-z0-9_.])rest(?![A-Za-z0-9_])", e)
            for e in in_elems + out_elems + ([cond] if cond else [])
            + ([where_text] if where_text else []))
        if rest_reserved:
            return self.problem(
                "'rest' / 'rest.length' are no longer supported; "
                "name the rest with ..r and use r.length")
        # An if-then-else cannot be written as a stack element:
        # spaces separate stack elements, so `if a < b then 1 else 0`
        # arrives here as eight elements (`if`, `a`, `<`, ...), and
        # `if`/`then`/`else` are keywords, not stack values. The
        # readable form is a `where` clause, whose right-hand side
        # is a single expression (spaces allowed):
        # `... == f where f = if a < b then 1 else 0`.
        if any(e in ("if", "then", "else") for e in in_elems + out_elems):
            return self.problem(
                "an if-then-else cannot be an output element (spaces "
                "separate stack elements); use a where clause, e.g. "
                "`... == f where f = if a < b then 1 else 0`")
        # Rest, three states per side, plus a name. The rest is
        # implied by default (preserved): `a dup == a a` means
        # the rest is there underneath, unchanged. `...`/`…`
        # written at the far left makes it explicit. `∅` at the
        # far left means no rest on that side ("the stack is
        # exactly this"). A named rest `..r` at the far left
        # (v20) names the rest list `r` in Lean, so an output
        # can refer to it (`..r depth == ..r r.length`); the
        # name must be the same on both sides when it appears
        # on both, and an output may not name a rest the input
        # did not name. The output rest is preserved unless the
        # input explicitly wrote `...` (or `..r`) without the
        # output doing so -- that is a whole-stack word (clr,
        # sum!): the rest goes in and does not come back out.
        # `… clr ==` and `clr == ∅` mean the same thing.
        def named_rest(tok):
            m = re.fullmatch(r"\.\.([A-Za-z_][A-Za-z0-9_]*)", tok or "")
            return m.group(1) if m else None
        in_first = in_elems[0] if in_elems else None
        out_first = out_elems[0] if out_elems else None
        in_empty = in_first == "∅"
        out_empty = out_first == "∅"
        if "∅" in in_elems[1:] or "∅" in out_elems[1:]:
            return self.problem("∅ is only allowed at the far left (the rest position)")
        # (v37) Named rest: input still far-left only; output may place
        # `..R` in any position (e.g. `..R A == A ..R`). `...` stays
        # far-left only (it has no name to reference elsewhere).
        if any(named_rest(e) is not None for e in in_elems[1:]):
            return self.problem("a named rest (..r) is only allowed at the far left on the input")
        if any(e == "..." for e in out_elems[1:]):
            return self.problem("'...' is only allowed at the far left (the rest position)")
        in_named = named_rest(in_first)
        out_nameds = [named_rest(e) for e in out_elems
                      if named_rest(e) is not None]
        if len(out_nameds) > 1:
            return self.problem("the output names more than one rest (only one `..R` allowed)")
        out_named = out_nameds[0] if out_nameds else None
        if out_named is not None and in_named is None and not in_empty:
            return self.problem(
                f"the output names a rest ..{out_named} that the input does not name")
        if in_named is not None and out_named is not None and in_named != out_named:
            return self.problem(
                f"the rest is named ..{in_named} on the input and ..{out_named} "
                f"on the output; use the same name on both sides")
        self.rest_name = in_named or out_named or "rest"
        in_explicit = in_first == "..." or in_named is not None
        # (v37) `out_named` may sit anywhere in the output, so the
        # explicit-rest check looks at the whole output side.
        out_explicit = out_first == "..." or out_named is not None
        self.in_rest = not in_empty
        self.out_rest = out_explicit or (not out_empty and not in_empty and not in_explicit)
        # (v37) Position of `..R` in the output (None when absent);
        # used by `lean_output_stack` for non-leading rests.
        self.out_rest_idx = None
        if out_named is not None:
            for _i, _e in enumerate(out_elems):
                if named_rest(_e) == out_named:
                    self.out_rest_idx = _i
                    break
        is_rest_tok = lambda e: e in ("...", "∅") or named_rest(e) is not None
        self.in_vars = [e for e in in_elems if not is_rest_tok(e)]
        self.out_vars = [e for e in out_elems if not is_rest_tok(e)]
        # A `.length` base must be the rest binder: `r.length`
        # is only meaningful for the named rest `..r`. Anything
        # else (a stack variable's `.length`, or a name that was
        # never bound as a rest) is a clean problem here, not a
        # Lean error about an unbound variable. The same rule
        # applies to the `#R` shorthand for `R.length` (v26):
        # `#R` is only meaningful for the named rest `..R`.
        for e in self.out_vars + ([cond] if cond else []) + ([where_text] if where_text else []):
            for m in re.finditer(r"([A-Za-z_][A-Za-z0-9_]*)\s*\.\s*length\b", e):
                if m.group(1) != self.rest_name or self.rest_name == "rest":
                    return self.problem(
                        f"{m.group(1)}.length is not the length of a named rest; "
                        f"name the rest with ..{m.group(1)} and write it on both sides, "
                        f"e.g. `..{m.group(1)} depth == ..{m.group(1)} {m.group(1)}.length`")
            for m in re.finditer(r"#([A-Za-z_][A-Za-z0-9_]*)", e):
                if m.group(1) != self.rest_name or self.rest_name == "rest":
                    return self.problem(
                        f"#{m.group(1)} is not the length of a named rest; "
                        f"name the rest with ..{m.group(1)} and write it on both sides, "
                        f"e.g. `..{m.group(1)} depth == ..{m.group(1)} #{m.group(1)}`")
        # `%` and `&` in an output expression mean F♭m's operators,
        # so they are translated to the tmod/land helpers; a call
        # like `min(a,b)` is translated to Lean application
        # (`min a b` -- Lean has no f(a, b) syntax). Anything
        # untranslatable is a clean problem, not a theorem.
        # A `when` condition is always translated (`!=` -> `≠`,
        # `==` -> `=`).
        try:
            # An error effect has no output expression to translate.
            if not self.is_error:
                self.out_vars = [
                    translate_expr(e, coerce_cmp=True, rest_name=self.rest_name) if _needs_translation(e) else e
                    for e in self.out_vars]
            self.cond_lean = translate_expr(cond) if cond is not None else None
        except ExprError as ex:
            return self.problem(f"cannot translate expression: {ex}")
        # `where` validation and witness translation (equational case).
        # Each left-hand side must be an output variable that is not
        # an input (an input is already determined; `where` cannot
        # constrain it -- that is what `when` is for). Each witness
        # may only mention the inputs (and `rest`), not another
        # existential variable. And every output variable that is
        # not an input must be constrained by the `where` clause --
        # otherwise it would be an unconstrained existential, a
        # statement too weak to be worth proving.
        if self.where_eqs is not None:
            input_vars = _effect_vars(in_elems + ([cond] if cond else []))
            # The named rest is an input too: a witness may mention
            # it as `<name>.length` (e.g. `n = r.length`).
            if self.in_rest and self.rest_name not in input_vars:
                input_vars.append(self.rest_name)
            output_vars = _effect_vars(out_elems)
            lhs_set = set()
            bad = None
            for lhs, _rhs in self.where_eqs:
                if lhs in lhs_set:
                    bad = f"where constrains {lhs!r} twice"
                    break
                lhs_set.add(lhs)
                if lhs in input_vars:
                    bad = (f"where cannot constrain {lhs!r}, which is an input; "
                           f"use when for a precondition on inputs")
                    break
                if lhs not in output_vars:
                    bad = (f"where constrains {lhs!r}, "
                           f"which is not an output variable")
                    break
            if bad is None:
                for v in output_vars:
                    if v not in input_vars and v not in lhs_set:
                        bad = (f"output variable {v!r} is not determined by the "
                               f"inputs or the where clause")
                        break
            if bad is None:
                witnesses = []
                for lhs, rhs in self.where_eqs:
                    for v in _effect_vars([rhs]):
                        if v not in input_vars:
                            bad = (f"where witness for {lhs!r} mentions {v!r}, "
                                   f"which is not an input (each witness must "
                                   f"only mention the inputs)")
                            break
                    if bad is not None:
                        break
                    try:
                        witnesses.append(translate_expr(rhs))
                    except ExprError as ex:
                        bad = f"cannot translate where witness {rhs!r}: {ex}"
                        break
                if bad is None:
                    self.witnesses = witnesses
            if bad is not None:
                return self.problem(bad)
        # The program is computed once per word and cached; a word
        # whose program cannot be built is reported once, and its
        # other effects are skipped (their own effect-level problems
        # above were still reported). The raw token list is kept
        # alongside the Lean string: the trace (for IO words) and
        # the oracle check need to see the tokens, not just the
        # emitted list. A defined word that inlines an IO token
        # (putc, putn, `.`, exit, rand, clock) is refused: the
        # trace for a composed IO word is not computed yet, so
        # only a bare effect on the IO primitive itself works.
        if name in self.failed:
            return False
        got = self._compute_prog(name)
        if got is None:
            return False
        prog, lits, _raw_lits = got
        if lits:
            # A quotation literal in a plain `run` theorem: the
            # literal is a code, not a program, so `run` cannot
            # step through it. Only the runQ path (which threads
            # the defs table) supports literals so far.
            self.failed.add(name)
            return self.problem(
                "a quotation literal is not supported in a plain run "
                "theorem yet (only in the runQ path)")
        # A defined word that inlines an IO token is refused (the
        # trace for a composed IO word is not computed yet). A bare
        # @effect on the IO primitive itself (prog == [name]) is
        # fine -- the check is only for defined words.
        io_used = [t for t in prog if isinstance(t, str) and t in IO_PRIMS] \
            if name in self.defs else []
        if io_used:
            self.failed.add(name)
            return self.problem(
                f"IO word {io_used[0]!r} cannot be used inside a defined "
                f"word yet (only a bare @effect on the IO primitive itself)")
        # Emit Lean. Theorems are stated with `run` (the entry
        # point: empty queue, input, oracle, trace) and `Outcome`
        # (`ok` / `err` / `exit`), not `exec` / `some` / `none`.
        # Variables in first-seen order, for binders. Output variables
        # constrained by a `where` clause are existential, not bound
        # here -- they are bound by the `∃` in the theorem instead.
        # (`rand` and `clock` are special cases below: their output
        # is an oracle draw, so it is existential even with no
        # `where` clause.)
        self.existential = [lhs for lhs, _ in self.where_eqs] if self.where_eqs is not None else []
        if name in ("rand", "clock"):
            # The output of an oracle word is an existential (the
            # oracle draw), not a binder: it is bound by the `∃`
            # in the theorem. Without this it would be bound twice
            # -- once in `(vars : Int)` and once by the `∃` -- and
            # the outer one would be unused (and shadowed).
            for v in self.out_vars:
                if v not in ("...", "∅") and v not in self.existential:
                    self.existential.append(v)
        seen_vars = [v for v in _effect_vars(in_elems + out_elems
                                             + ([cond] if cond else []))
                     if v not in self.existential and v != self.rest_name]
        binders = " ".join(seen_vars)
        self.in_lean = lean_list_bottom_to_top(
            self.in_vars, self.rest_name if self.in_rest else None)
        # If there is a rest, the theorem quantifies over it; else rest is [].
        # For an error effect there is no output list, so the output
        # rest is meaningless and only the input rest counts.
        if self.in_rest or (self.out_rest and not self.is_error):
            self.rest_binder = f" ({self.rest_name} : Stack)"
        else:
            self.rest_binder = ""
        # The input/output Lean lists already end in rest or [] via
        # lean_list_bottom_to_top; when there is no rest we used [].
        # An effect with no variables at all (e.g. `... nop == ...`)
        # has no Int binder: emitting `( : Int)` is a Lean syntax
        # error, so the binder is omitted entirely in that case.
        self.binder_part = f" ({binders} : Int)" if binders else ""
        # The oracle: `rand` and `clock` draw from an oracle stream,
        # so their theorems bind the oracle head `o` and the rest
        # `orc`, and pass `(o :: orc)` to `run`. Every other word
        # passes `[]` (no oracle draw).
        uses_oracle = name in ORACLE_PRIMS
        self.oracle_binder = " (o : Int) (orc : Oracle)" if uses_oracle else ""
        self.oracle_arg = "(o :: orc)" if uses_oracle else "[]"
        # A `when` condition becomes a hypothesis named `hw`. The
        # ladder must pass `run` (the theorems are stated with it),
        # the program, and `hw` to simp: simp cannot unfold `run`
        # or the program def or discharge the div-by-zero guard
        # without them.
        self.hw_binder = f" (hw : {self.cond_lean})" if self.cond_lean is not None else ""
        self.simp_args = f"run, exec, step, {self.ln}Prog" + (", hw" if self.cond_lean is not None else "")
        # Guard `have` (see GUARDS): for a guarded primitive with a
        # `when` that is not the guard itself, derive `¬ guard` from
        # `hw` by omega and pass it to simp. Skipped for error
        # effects (the claim is the guard holding, not its negation)
        # and when the `when` IS the guard (hw already is the guard).
        # The top input is the last input variable, in typed order.
        in_vars_only = _effect_vars(in_elems)
        self.hguard_line = None
        if name in GUARDS and not self.is_error and self.cond_lean is not None:
            top_var = in_vars_only[-1] if in_vars_only else None
            if top_var is not None:
                guard = f"({GUARDS[name].format(top=top_var)})"
                norm = lambda s: s.replace(" ", "")
                if norm(self.cond_lean) != norm(guard):
                    self.hguard_line = f"  have hguard : ¬ {guard} := by omega"
                    # hguard subsumes hw for simp (it is the guard in
                    # the form simp can use); hw is still used by the
                    # omega in the `have`. Passing both makes simp
                    # warn that hw is unused.
                    self.simp_args = f"run, exec, step, {self.ln}Prog, hguard"
        # One effect keeps the plain name; several are numbered in
        # file order.
        self.suffix = "" if self.n_effects == 1 else f"_{self.idx + 1}"
        return True

    # ---- Compositional Spec emission (Phase B) ----
    # Every Spec-capable effect becomes:
    #   theorem {ln}_effect{suffix}{binders} :
    #       Spec ({prog_app}) {pre} {post} := by
    #     fbm_verify [{deps}]
    # (or SpecErr for `else ERROR` branches). `by fbm_verify [...]`
    # is the UNIFORM proof: head-peeling via Spec.*_head lemmas,
    # callee-Spec dep application, cond splits, quotation-slot
    # assumption closure, nil_close + simp_all/omega leaves.
    # Frame-polymorphic prims (stack/arithmetic/bitwise/shift,
    # putc/putn, guarded div/mod/pow) and all pure/slot/cond
    # defined words use it. NOT frame-polymorphic (clr, depth,
    # print, getc, rand, clock, exit) keep the old direct `run`
    # theorems via the fallback in emit().

    # NOTE: the pre-lambda stack/queue binders are `st`/`qu`, NOT
    # `s`/`q`: several theorems bind an Int quotation code named
    # `q`, and a lambda `q` would shadow it (the `(q :: R)` in the
    # pre would then read the queue, not the code). The tactic
    # reads these positions structurally, so the names are free.
    def _spec_pre(self, in_stack):
        return (f"(fun st qu _ _ acts d => st = {in_stack} ∧ qu = qq ∧ "
                f"acts = [] ∧ d = defs)")

    def _spec_post(self, out_stack, trace="[]", defs_out="defs"):
        return (f"(fun s' q' acts' d' => s' = {out_stack} ∧ q' = qq ∧ "
                f"acts' = {trace} ∧ d' = {defs_out})")

    def _spec_hbody(self, hname, body, b_in, qd, b_out):
        # Bodies never change `defs` (no `cons` in quotation
        # bodies): pre and post both pin concrete `defs`, so no
        # `defs'` binder is needed anywhere in generated theorems.
        # (A `defs'` ghost would float free: `eval_head` grounds
        # its midpoints from the hypothesis, and a rigid
        # autoimplicit `defs'` can never unify with `defs`.)
        return (f"({hname} : Spec {body} "
                f"(fun st qu _ _ acts d => st = {b_in} ∧ qu = {qd} ∧ "
                f"acts = [] ∧ d = defs) "
                f"(fun s' q' acts' d' => s' = {b_out} ∧ q' = {qd} ∧ "
                f"acts' = [] ∧ d' = defs))")

    def _spec_prog_app(self):
        lits = self.prog_lits.get(self.name, [])
        self_args = "".join(f" {v}" for v in self.prog_self_vars.get(self.name, []))
        lit_args = "".join(f" lit{i}" for i in range(len(lits)))
        return f"{self.ln}Prog{self_args}{lit_args}"

    def _spec_lit_hyps(self):
        return [f"(hlookupLit{k} : lookup defs lit{k} = some {b})"
                for k, b in enumerate(self.spec_lit_bodies)]

    def _lift_post_conditionals(self, post, hyps, binders):
        """Replace each `(if ...)` term in a Spec post with a fresh
        stack variable plus an equality hypothesis (`(hCk : Ck =
        (if ...))`). `fbm_verify`'s `splitSingle` only fires when
        an `ite` appears on exactly one side of the goal: a
        computed `cond` flag lives in the (mid) pre, so the
        statement post must not repeat `if` terms inline (as
        `sort2`'s `ensures` would render them). Returns the new
        `(post, hyps, binders)`."""
        import re as _re
        taken = binders + " " + post + " " + " ".join(hyps)

        def fresh(base):
            k = 0
            while _re.search(rf"\b{base}{k}\b", taken):
                k += 1
            return k

        new_hyps = list(hyps)
        new_binders = binders
        out = post
        cursor = 0
        while True:
            start = out.find("(if ", cursor)
            if start < 0:
                break
            depth = 0
            end = None
            for i in range(start, len(out)):
                if out[i] == "(":
                    depth += 1
                elif out[i] == ")":
                    depth -= 1
                    if depth == 0:
                        end = i + 1
                        break
            if end is None:
                break
            ite = out[start:end]
            # A bare-variable test (`if (V ≠ 0) then X else Y`
            # with `if`-free branches) stays inline: the `cond`
            # flag is the free variable itself, and
            # `splitCondFlag` (`by_cases V = 0`) plus the branch
            # hypothesis closes it -- exactly the shape of the
            # hand-written `choose`/`or_else`/`and_also` tests.
            # Lifting it would poison `splitCondFlag`'s
            # already-decided guard (the hyp mentions both the
            # flag and a `0` literal).
            m = _re.fullmatch(
                r"\(if \(([A-Za-z_][A-Za-z0-9_']*) (≠|=) 0\) "
                r"then (.*) else (.*)\)", ite, _re.DOTALL)
            if (m is not None and "(if " not in m.group(3)
                    and "(if " not in m.group(4)):
                cursor = end
                continue
            k = fresh("C")
            var = f"C{k}"
            hyp = f"hC{k}"
            taken += f" {var} {hyp}"
            out = out[:start] + var + out[end:]
            new_hyps.append(f"({hyp} : {var} = {ite})")
            new_binders += f" ({var} : Int)"
            cursor = start + len(var)
        return out, new_hyps, new_binders

    def _out_stack_lean(self, wit):
        """Output stack Lean expression (v37): legacy cons-chain unless
        the output needs the new translation (non-leading `..R` or a
        list-valued splice), in which case `lean_output_stack`. `wit`
        maps where-variables to their (translated) witnesses."""
        ctx = self
        out_sub = [wit.get(e, e) for e in ctx.out_vars]
        needs_new = False
        if ctx.out_rest_idx is not None and ctx.out_rest_idx != 0:
            needs_new = True
        if any(_is_list_splice_elem(e) for e in out_sub):
            needs_new = True
        if not needs_new:
            return lean_list_bottom_to_top(
                out_sub, ctx.rest_name if ctx.out_rest else None)
        # Build the full bottom-to-top list with `..R` at its recorded
        # position (normalising `...` to `..R`). `out_vars` are the
        # translated non-rest elements in order; substitute witnesses.
        rest_tok = f"..{ctx.rest_name}" if ctx.out_rest else None
        full = []
        vi = 0
        for i, e in enumerate(ctx.out_elems):
            is_rest = (ctx.out_rest_idx is not None and i == ctx.out_rest_idx)
            if e in ("...", "∅") and ctx.out_rest and ctx.out_rest_idx is None:
                # Legacy anonymous rest at far left (should not reach here
                # via needs_new unless list splices present).
                continue
            if is_rest:
                full.append(rest_tok)
                continue
            # Non-rest original element: take next translated var.
            # (`...`/`∅` at far left with out_rest_idx None are skipped
            # above; named rests elsewhere are caught by is_rest.)
            if e in ("...", "∅"):
                continue
            if vi >= len(ctx.out_vars):
                raise ValueError("output element alignment failed")
            t = ctx.out_vars[vi]
            vi += 1
            full.append(wit.get(t, t))
        # Anonymous `...` rest at far left (list-splice case with no
        # named rest): prepend `..rest`.
        if ctx.out_rest and rest_tok not in full:
            full = [rest_tok] + full
        return lean_output_stack(full, ctx.rest_name if ctx.out_rest else None)

    def _spec_emit(self, pre, post, hyps, binders, prog_app, deps,
                    is_specerr=False, head=None):
        """Write the doc comment and the Spec-family theorem with
        a uniform `by fbm_verify [...]` proof (or a custom `@by-proof`
        tactic / `@by-induction` skeleton when present). Records the
        theorem name for downstream dep computation. `head` selects the
        predicate (`Spec`, `SpecExact`, `SpecIO`, `SpecExit`);
        `is_specerr` selects `SpecErr` (pre only). The `/-- ... -/`
        doc comment carries the effect text (it is also what
        check.py names TAP tests by); there are no `-- src:`
        file:line markers."""
        self.out_lines.append(f"/-- {self.name}: @effect {self.effect_body} -/")
        if head is None:
            head = "SpecErr" if is_specerr else "Spec"
        if head == "Spec" and not is_specerr:
            post, hyps, binders = self._lift_post_conditionals(
                post, hyps, binders)
        hyp_binders = "".join(f" {h}" for h in hyps)
        if self.by_assume is not None:
            # Assumed lemma: statement-identical axiom. The `Spec`
            # statement is built by the existing path above; only the
            # proof body differs (`axiom` vs `theorem ... := by ...`).
            # check.py detects the `-- ASSUMED` marker above the axiom.
            if head == "SpecErr":
                stmt = f"{head} ({prog_app}) {pre}"
            else:
                stmt = f"{head} ({prog_app}) {pre} {post}"
            self.out_lines.append(f"-- ASSUMED: {self.by_assume}")
            self.out_lines.append(
                f"axiom {self.ln}_effect{self.suffix} : "
                f"∀{binders}{hyp_binders}, {stmt}")
            self.was_spec = True
            return True
        if head == "SpecErr":
            concl = f"    {head} ({prog_app}) {pre} := by"
        else:
            concl = f"    {head} ({prog_app}) {pre} {post} := by"
        self.out_lines.append(
            f"theorem {self.ln}_effect{self.suffix}{binders}{hyp_binders} :")
        self.out_lines.append(concl)
        if self.by_proof is not None:
            # (v37) Custom tactic body from `@by-proof`. Accept with or
            # without a leading `by`; emit indented under the `:= by`.
            tac = self.by_proof.strip()
            if tac.startswith("by\n") or tac.startswith("by "):
                tac = tac[2:].strip()
            elif tac == "by":
                tac = ""
            if "\n" in tac:
                for line in tac.split("\n"):
                    self.out_lines.append(f"  {line}" if line.strip() else "")
            else:
                self.out_lines.append(f"  {tac}" if tac else "  skip")
            self.was_spec = True
            return True
        if self.by_induction is not None:
            return self._emit_induction_skeleton(
                pre, post, hyps, binders, prog_app, deps,
                is_specerr=is_specerr, head=head)
        self.out_lines.append(f"  fbm_verify [{', '.join(deps)}]")
        self.was_spec = True
        return True

    def _emit_spec_normal(self, deps):
        """Pure / where / guarded-prim success case."""
        ctx = self
        wit = {}
        if ctx.where_eqs is not None:
            wit = dict(zip([lhs for lhs, _ in ctx.where_eqs], ctx.witnesses))
        out_stack = self._out_stack_lean(wit)
        trace = "[]"
        if ctx.name in ("putc", "putn"):
            top = ctx.in_vars[-1]
            trace = f"[] ++ [IOAction.{ctx.name} ({top})]"
        pre = self._spec_pre(ctx.in_lean)
        post = self._spec_post(out_stack, trace)
        binders = (f" (defs : Defs){ctx.binder_part}{ctx.rest_binder}"
                   f"{ctx.hw_binder} (qq : Stack)")
        return self._spec_emit(pre, post, [], binders,
                               self._spec_prog_app(), deps)

    def _emit_spec_error(self, deps):
        """`else ERROR` branch of a guarded prim: SpecErr."""
        ctx = self
        pre = self._spec_pre(ctx.in_lean)
        binders = (f" (defs : Defs){ctx.binder_part}{ctx.rest_binder}"
                   f"{ctx.hw_binder} (qq : Stack)")
        return self._spec_emit(pre, "", [], binders,
                               self._spec_prog_app(), deps, is_specerr=True)

    def _emit_spec_exact(self, deps):
        """Exact-stack words (`clr`, `depth`, `print`, `empty?`):
        `SpecExact` with pre/post from the @effect (where
        witnesses substituted inline, as in `_emit_spec_normal`)."""
        ctx = self
        wit = {}
        if ctx.where_eqs is not None:
            wit = dict(zip([lhs for lhs, _ in ctx.where_eqs], ctx.witnesses))
        out_stack = self._out_stack_lean(wit)
        trace = "[]"
        if ctx.name == ".":
            trace = f"[] ++ [IOAction.print ({ctx.rest_name})]"
        pre = self._spec_pre(ctx.in_lean)
        post = self._spec_post(out_stack, trace)
        binders = (f" (defs : Defs){ctx.binder_part}{ctx.rest_binder}"
                   f"{ctx.hw_binder} (qq : Stack)")
        return self._spec_emit(pre, post, [], binders,
                               self._spec_prog_app(), deps, head="SpecExact")

    def _emit_spec_io(self, deps):
        """Input/oracle words (`getc`, `clock`, `rand`): `SpecIO`
        pinning the stream head in the pre."""
        ctx = self
        prog_app = self._spec_prog_app()
        if ctx.name == "getc":
            out_only = [e for e in ctx.out_vars if e not in ("...", "∅")]
            if len(out_only) != 1:
                return ctx.problem("getc pushes exactly one output")
            out_var = out_only[0]
            pre = (f"(fun st qu inp _ acts d => st = {ctx.in_lean} ∧ "
                   f"qu = qq ∧ inp = {out_var} :: tail ∧ "
                   f"acts = [] ∧ d = defs)")
            post = self._spec_post(f"{out_var} :: {ctx.in_lean}")
            binders = (f" (defs : Defs){ctx.binder_part}{ctx.rest_binder}"
                       f" (tail : In)"
                       f" (_hbyte : 0 <= {out_var} ∧ {out_var} < 256)"
                       f" (qq : Stack)")
            return self._spec_emit(pre, post, [], binders, prog_app,
                                   deps, head="SpecIO")
        if ctx.name == "clock":
            out_only = [e for e in ctx.out_vars if e not in ("...", "∅")]
            if len(out_only) != 1:
                return ctx.problem("clock pushes exactly one output")
            pre = (f"(fun st qu _ orc acts d => st = {ctx.in_lean} ∧ "
                   f"qu = qq ∧ orc = o :: tail ∧ "
                   f"acts = [] ∧ d = defs)")
            post = self._spec_post(f"o :: {ctx.in_lean}")
            binders = (f" (defs : Defs){ctx.rest_binder}"
                       f" (o : Int) (tail : Oracle) (qq : Stack)")
            return self._spec_emit(pre, post, [], binders, prog_app,
                                   deps, head="SpecIO")
        if ctx.name == "rand":
            if ctx.cond_lean is None:
                return ctx.problem(
                    "rand needs `when 0 < max`: the range is only "
                    "true for a positive max")
            if ctx.rand_where_text is None:
                return ctx.problem(
                    "rand needs a where clause giving the range, "
                    "e.g. `where 0 <= n ∧ n < max`")
            out_only = [e for e in ctx.out_vars if e not in ("...", "∅")]
            in_only = [e for e in ctx.in_vars if e not in ("...", "∅")]
            if len(out_only) != 1 or len(in_only) != 1:
                return ctx.problem(
                    "rand takes exactly one input (the max) and "
                    "pushes exactly one output")
            max_var = in_only[0]
            rest = ctx.rest_name if ctx.in_rest else "[]"
            pre = (f"(fun st qu _ orc acts d => st = {ctx.in_lean} ∧ "
                   f"qu = qq ∧ orc = o :: tail ∧ "
                   f"acts = [] ∧ d = defs)")
            post = (f"(fun s' q' acts' d' => s' = (o % {max_var}) :: {rest} ∧ "
                    f"q' = qq ∧ acts' = [] ∧ d' = defs ∧ "
                    f"0 <= o % {max_var} ∧ o % {max_var} < {max_var})")
            binders = (f" (defs : Defs){ctx.binder_part}{ctx.rest_binder}"
                       f" (o : Int) (tail : Oracle){ctx.hw_binder} (qq : Stack)")
            return self._spec_emit(pre, post, [], binders, prog_app,
                                   deps, head="SpecIO")
        return ctx.problem(f"not an IO word: {ctx.name!r}")

    def _emit_spec_exit(self, deps):
        """`exit` halts with the top input as the code: `SpecExit`."""
        ctx = self
        in_vars_only = _effect_vars(ctx.in_elems)
        top_var = in_vars_only[-1] if in_vars_only else None
        if top_var is None:
            return ctx.problem("exit needs an input (the exit code)")
        pre = self._spec_pre(ctx.in_lean)
        post = (f"(fun code acts' d' => code = {top_var} ∧ "
                f"acts' = [] ∧ d' = defs)")
        binders = (f" (defs : Defs){ctx.binder_part}{ctx.rest_binder}"
                   f" (qq : Stack)")
        return self._spec_emit(pre, post, [], binders,
                               self._spec_prog_app(), deps, head="SpecExit")

    def _emit_spec_quot(self, deps):
        """`eval` / `cons` / `?` primitives: direct corollaries of
        the Spec.eval / Spec.cons / Spec.cond lemmas."""
        ctx = self
        prog_app = self._spec_prog_app()
        if ctx.quot_kind == "eval":
            q, body = ctx.quot_q, ctx.quot_body
            ir, orr = ctx.quot_in_rest, ctx.quot_out_rest
            pre = self._spec_pre(ctx.quot_in_stack)
            post = self._spec_post(ctx.quot_out_stack)
            binders = (f" (defs : Defs) ({q} : Int) ({body} : List Tok)"
                       f" ({ir} {orr} : Stack) (qq : Stack)")
            hyps = [f"(hlookup : lookup defs {q} = some {body})",
                    self._spec_hbody("hbody", body, ir, "qq", orr)]
            return self._spec_emit(pre, post, hyps, binders, prog_app,
                                   deps)
        if ctx.quot_kind == "cons":
            pre = self._spec_pre(ctx.quot_in_stack)
            post = self._spec_post(ctx.quot_out_stack, "[]",
                                   ctx.quot_defs_prime)
            binders = (f" (defs : Defs) ({ctx.quot_a} {ctx.quot_b} : Int)"
                       f" ({ctx.quot_in_rest} : Stack) (qq : Stack)")
            return self._spec_emit(pre, post, [], binders, prog_app,
                                   deps)
        if ctx.quot_kind == "?":
            q, body = ctx.quot_q, ctx.quot_body
            flag, ir, orr = ctx.quot_flag, ctx.quot_in_rest, ctx.quot_out_rest
            pre = self._spec_pre(ctx.quot_in_stack)
            post = self._spec_post(ctx.quot_out_stack)
            if orr != ir:
                binders = (f" (defs : Defs) ({q} : Int) "
                           f"({body} : List Tok) ({flag} : Int) "
                           f"({ir} {orr} : Stack) (qq : Stack)")
                hyps = [f"(hf : {ctx.quot_cond_lean})",
                        f"(hlookup : lookup defs {q} = some {body})",
                        self._spec_hbody("hbody", body, ir, "qq", orr)]
            else:
                binders = (f" (defs : Defs) ({q} : Int) ({flag} : Int) "
                           f"({ir} : Stack) (qq : Stack)")
                hyps = [f"(hf : {ctx.quot_cond_lean})"]
            return self._spec_emit(pre, post, hyps, binders, prog_app,
                                   deps)
        return self.problem(f"not a quotation word: {ctx.quot_kind!r}")

    def _emit_spec_runq(self, deps):
        """One variable eval (slip/dip/run/sip/...)."""
        ctx = self
        binders = self.runq_binders.replace(" (fuel : Nat)", "").replace(
            " (defs' : Defs)", "")
        hyps = (self._spec_lit_hyps()
                + [f"(hlookup : lookup defs {self.runq_q} = "
                   f"some {self.runq_body})"]
                + [self._spec_hbody("hbody", self.runq_body,
                                     self.runq_body_in_stack,
                                     self.runq_queue_dispatch,
                                     self.runq_body_out_stack)])
        pre = self._spec_pre(self.runq_in_stack)
        post = self._spec_post(self.runq_out_stack)
        return self._spec_emit(pre, post, hyps, binders,
                               self.runq_prog_app, deps)

    def _emit_spec_cond(self, deps):
        """One `?` on a literal (sort2/choose)."""
        ctx = self
        hyps = self._spec_lit_hyps()
        pre = self._spec_pre(self.runq_in_stack)
        post = self._spec_post(self.runq_out_stack)
        return self._spec_emit(pre, post, hyps, self.runq_cond_binders,
                               self.runq_prog_app, deps)

    def _emit_spec_direct(self, deps):
        """`?` + trailing eval (branch): one theorem per case."""
        ctx = self
        (cond_lean, in_rest, case_out, _flag_var, code1, code2,
         body1, body2, code_var, body_var) = self.runq_direct_spec
        binders = self.runq_direct_binders.replace(" (fuel : Nat)", "").replace(
            " (defs' : Defs)", "")
        hyps = ([f"(hf : {cond_lean})"]
                + self._spec_lit_hyps()
                + [f"(hlookup{code1} : lookup defs {code1} = some {body1})",
                   f"(hlookup{code2} : lookup defs {code2} = some {body2})",
                   self._spec_hbody("hbody", body_var, in_rest, "qq",
                                     case_out)])
        pre = self._spec_pre(self.runq_direct_in_stack)
        post = self._spec_post(case_out)
        return self._spec_emit(pre, post, hyps, binders,
                               self.runq_prog_app, deps)

    def _emit_spec_between(self, deps):
        """Literal [W] via eval, W with one `?` (between?)."""
        ctx = self
        hyps = [f"(hlookupLit{k} : {h})"
                for k, h in enumerate(self.runq_between_hyps)]
        pre = self._spec_pre(self.runq_between_in_stack)
        post = self._spec_post(self.runq_between_out_stack)
        return self._spec_emit(pre, post, hyps, self.runq_between_binders,
                               self.runq_prog_app, deps)

    def _emit_spec_compose(self, deps):
        """Two variable evals (bi/bi2)."""
        ctx = self
        (b1in, b1out, q1, code1, body1, b2in, b2out, q2, code2, body2,
         fuel1, fuel2) = self.runq_compose_spec
        binders = self.runq_compose_binders.replace(
            f" ({fuel1} {fuel2} : Nat)", "")
        hyps = (self._spec_lit_hyps()
                + [f"(hlookup{code1} : lookup defs {code1} = some {body1})",
                   f"(hlookup{code2} : lookup defs {code2} = some {body2})",
                   self._spec_hbody("hbodyB", body1, b1in, q1, b1out),
                   self._spec_hbody("hbodyC", body2, b2in, q2, b2out)])
        pre = self._spec_pre(self.runq_compose_in_stack)
        post = self._spec_post(self.runq_compose_out_stack)
        return self._spec_emit(pre, post, hyps, binders,
                               self.runq_prog_app, deps)

    def _emit_spec_cf(self, deps):
        """Computed-flag branch (or_else/and_also)."""
        ctx = self
        (b_in, b_out, q1, code1, body1, c_in, c_out, q2, code2, body2,
         fuel1, fuel2, _in_rest) = self.runq_cf_spec
        binders = self.runq_cf_binders.replace(
            f" ({fuel1} {fuel2} : Nat)", "")
        hyps = (self._spec_lit_hyps()
                + [f"(hlookup{code1} : lookup defs {code1} = some {body1})",
                   f"(hlookup{code2} : lookup defs {code2} = some {body2})",
                   self._spec_hbody("hbodyB", body1, b_in, q1, b_out),
                   self._spec_hbody("hbodyC", body2, c_in, q2, c_out)])
        pre = self._spec_pre(self.runq_cf_in_stack)
        post = self._spec_post(self.runq_cf_out_stack)
        return self._spec_emit(pre, post, hyps, binders,
                               self.runq_prog_app, deps)

    def _emit_spec_recursive(self, deps):
        """Recursive word (v37): Spec (or SpecExact when the flat program
        touches a non-frame-polymorphic primitive like `depth`) with self
        code + lookup hypotheses and literal-lookup hypotheses. A word
        that is itself recursive needs `@by-proof` / `@by-induction`
        (fbm_verify cannot do induction); without either, this is a clean
        problem. A non-recursive caller of a recursive word composes the
        callee's effect lemma, so plain `fbm_verify` suffices (no clause)."""
        ctx = self
        is_self_rec = ctx.name in ctx.rec_deps_sorted
        if is_self_rec and ctx.by_proof is None and ctx.by_induction is None and ctx.by_assume is None:
            return ctx.problem(
                f"recursive word {ctx.name!r} needs `@by-proof`, `@by-induction`, or `@assume` "
                f"(fbm_verify cannot prove recursion; see HELP.md)")
        wit = {}
        if ctx.where_eqs is not None:
            wit = dict(zip([lhs for lhs, _ in ctx.where_eqs], ctx.witnesses))
        out_stack = self._out_stack_lean(wit)
        trace = "[]"
        pre = self._spec_pre(ctx.in_lean)
        post = self._spec_post(out_stack, trace)
        # Frame-polymorphic unless the flat program touches exact-only
        # prims (depth etc.), like the standard dispatch. Computed first:
        # functional-slot body hypotheses use the same head.
        flat = [t for t in self.prog_tokens.get(self.name, []) if isinstance(t, str)]
        head = "SpecExact" if any(t in ("clr", "depth", ".", "getc", "rand",
                                          "clock", "exit") for t in flat) else "Spec"
        # Self binders + lookup hypotheses (one per frontier dep: every
        # rec-reaching word reachable from here, v37).
        self_binders = "".join(f" ({v} : Int)" for v in ctx.rec_self_vars)
        # The `hself` hypothesis pins each self code to its Prog. The Prog
        # application needs its self args (frontier call params, same
        # global names, bound above) plus its lit args.
        prog_app = self._spec_prog_app()
        hself_hyps = []
        # Literal lookups (bodies may contain `Tok.call self_*`).
        hlit_hyps = []
        for k, b in enumerate(ctx.rec_lit_bodies):
            hlit_hyps.append(f"(hlookupLit{k} : lookup defs lit{k} = some {b})")
        # Lit code binders (the word's own lit vars).
        lit_binders = ""
        n_lits = len(ctx.rec_lit_bodies)
        if n_lits:
            lit_binders = f" ({' '.join(f'lit{k}' for k in range(n_lits))} : Int)"
        # Non-self frontier deps with literal codes (e.g. `_loop`'s two
        # lits when proving `loop`): the caller binds `{r}_lit{k}` codes
        # and pins them to the callee's literal bodies (with `lit` refs
        # renamed to the caller's `{r}_lit{j}` binders).
        for r, v in zip(ctx.rec_frontier_sorted, ctx.rec_self_vars):
            rln = lean_name(r)
            got_r = self._compute_prog(r)
            if got_r is None:
                return False
            _r_prog, r_lits, r_raw_lits = got_r
            r_self_args = "".join(f" {s}" for s in self.prog_self_vars.get(r, []))
            if r == ctx.name:
                n_lits_self = len(ctx.rec_lit_bodies)
                lit_args = "".join(f" lit{k}" for k in range(n_lits_self))
                hself_hyps.append(
                    f"(hself_{rln} : lookup defs {v} = some ({rln}Prog{r_self_args}{lit_args}))")
                continue
            r_prefix = f"{rln}_lit"
            r_bodies = []
            for k, raw in enumerate(r_raw_lits):
                body_prog = r_lits[k]
                if (len(raw) == 1 and isinstance(raw[0], str)
                        and raw[0] in self.defs and raw[0] not in PRIMS):
                    w = raw[0]
                    if _is_rec_single_word(raw, body_prog, self.defs, self._frontier_cached()):
                        r_bodies.append(
                            "[" + ", ".join(_tok_lean_renamed(t, r_prefix)
                                            for t in body_prog) + "]")
                        if self._compute_prog(w) is None:
                            return False
                        continue
                    if any(isinstance(t, tuple) and t[0] == "lit" for t in body_prog):
                        return self.problem(
                            f"a literal naming {w!r}, which itself contains a literal, "
                            f"is not supported yet")
                    r_bodies.append(f"{lean_name(w)}Prog")
                    if self._compute_prog(w) is None:
                        return False
                    continue
                elif len(raw) == 1 and isinstance(raw[0], str) and raw[0] in PRIMS:
                    r_bodies.append(f"[{PRIMS[raw[0]]}]")
                else:
                    r_bodies.append(
                        "[" + ", ".join(_tok_lean_renamed(t, r_prefix)
                                        for t in body_prog) + "]")
            r_args = "".join(f" {r_prefix}{k}" for k in range(len(r_bodies)))
            hself_hyps.append(
                f"(hself_{rln} : lookup defs {v} = some ({rln}Prog{r_self_args}{r_args}))")
            for k, b in enumerate(r_bodies):
                hlit_hyps.append(
                    f"(hlookup{rln}Lit{k} : lookup defs {r_prefix}{k} = some {b})")
            if r_bodies:
                lit_binders += f" ({' '.join(f'{r_prefix}{k}' for k in range(len(r_bodies)))} : Int)"
        binders = (f" (defs : Defs){ctx.binder_part}{ctx.rest_binder}"
                   f"{ctx.hw_binder}{self_binders}{lit_binders} (qq : Stack)")
        hyps = hself_hyps + hlit_hyps
        # Functional slots: the body's universally-quantified contract
        # (`B` maps `X :: R` to `(F X) :: X :: R`) plus the code lookup.
        # The caller's own body hypothesis discharges the callee lemma's
        # body premise by assumption when the shapes match.
        for qv, bv, X, F in ctx.rec_fun_slots:
            hyps.append(
                f"(hbody{qv} : ∀ (X : Int) (R qr : Stack), {head} {bv} "
                f"(fun st q0 _ _ acts d => st = X :: R ∧ q0 = qr ∧ "
                f"acts = [] ∧ d = defs) "
                f"(fun s' q' acts' d' => s' = ({F} X) :: X :: R ∧ q' = qr ∧ "
                f"acts' = [] ∧ d' = defs))")
            hyps.append(f"(hlookup{qv} : lookup defs {qv} = some {bv})")
        return self._spec_emit(pre, post, hyps, binders, prog_app, deps, head=head)

    def _emit_induction_skeleton(self, pre, post, hyps, binders, prog_app, deps,
                                 is_specerr=False, head=None):
        """Induction skeleton for `@by-induction <pattern>` (v37).
        Validates the pattern against the word body, then emits an induction
        tactic over the target with `fbm_verify` discharging base/step goals.
        Two shapes (the core.ff catalogue): List induction on the rest `R`
        (`R.length` / `R.tail` patterns, e.g. `pushtop`) and strong Nat
        induction on `N.toNat` (`N - 1` patterns, e.g. `_loop`). Anything else
        is a clean problem."""
        pat = (self.by_induction or "").strip()
        low = pat.lower()
        if is_specerr:
            return self.problem("@by-induction cannot be used on an ERROR effect")
        # Find the induction target: `R` (list) or `N` (int counter).
        is_list = ("r.length" in low or "r.tail" in low or " on r" in low
                   or low.startswith("r ") or " on r," in low)
        is_nat = ("n - 1" in low or "n-1" in low or " on n" in low
                  or "strong on n" in low)
        # Countdown induction (induction-generalization): strong induction
        # on `X.toNat` for division countdown (`X>>1`, `X/10` as in
        # `ilb`/`ilog`) and countdown-by-k with accumulator state (as in
        # `__tail_loop`). Patterns: `countdown on X`, `strong countdown
        # on X`, `X >> 1`, `X / 10`, or explicit-measure
        # `@by-induction <pattern> on <measure>` (measure = target var).
        # Emits `Nat.strongRecOn` so the IH applies to any smaller
        # measure (not just the predecessor). Division countdown
        # (`>>1`/`/10`) pre-builds a specialized `ih_call` (no `<`
        # side goal at apply time) so `fbm_verify` closes the
        # recursive arm via plain `assumption`; the base arm closes by
        # peeling. Explicit-motive shape (`have key` + `intro m` +
        # `induction m` + `intro N qq ...`): no `generalizing`, so `e`
        # and `ih` stay concrete (the `generalizing N qq` form left
        # `_fvar` metavars in `e`/`ih` when the motive mentions
        # `branchProg` + `lookup` context, stalling `fbm_verify`).
        is_countdown = ("countdown" in low or ">> 1" in low or ">>1" in low
                        or "/ 10" in low or "/10" in low or "shr" in low
                        or "tdiv" in low or " on x" in low)
        if is_list and not is_nat:
            target = self.rest_name
            # Validate: word must be recursive and body must mention a
            # self-call (directly or via a literal). The generator already
            # routed here via `_prepare_recursive`, so recursion holds; check
            # the pattern names the rest.
            if target == "rest" or target not in pat:
                # Fall back to `R` when the pattern says `R.length`.
                if "R" not in pat and "r" not in low:
                    return self.problem(
                        f"@by-induction pattern {pat!r} does not name the rest R")
                target = self.rest_name if self.rest_name != "rest" else "R"
            # Header (`theorem ... := by`) already emitted by `_spec_emit`;
            # append only the induction skeleton. `generalizing qq`: the
            # self-call runs under a `qpush`-extended queue (`dip` saves
            # the kept element on `q`), so `ih` must be usable at any
            # ambient queue — otherwise `apply ih` fails to match and
            # `fbm_verify` re-peels the body forever.
            self.out_lines.append(f"  induction {target} generalizing qq with")
            self.out_lines.append(f"  | nil => fbm_verify [{', '.join(deps)}]")
            self.out_lines.append(
                f"  | cons a {target} ih => fbm_verify [{', '.join(deps + ['ih'])}]")
            self.was_spec = True
            return True
        if is_countdown and not is_list:
            # Countdown induction: strong induction on `target.toNat`
            # via `Nat.strongRecOn`, so the IH applies to any smaller
            # measure (division countdown `>>1`/`/10`, countdown-by-k).
            # Target inference: explicit `on <measure>` wins (escape hatch
            # for accumulator loops like `__tail_loop`); else the sole Int
            # var; else a whole-word match in the pattern; else clean
            # problem asking for `on <measure>`.
            import re as _re2
            cands = _effect_vars([self.src_effect])
            # Int binders only (filter rest/quot vars): in_vars holds Ints.
            int_vars = [v for v in self.in_vars if _re2.fullmatch(r"[A-Za-z_][A-Za-z0-9_']*", v)]
            target = None
            m = _re2.search(r"\bon\s+([A-Za-z_][A-Za-z0-9_']*)", low)
            if m:
                want = m.group(1)
                for v in int_vars:
                    if v.lower() == want.lower():
                        target = v
                        break
                if target is None:
                    # `on <measure>` names something not in the effect:
                    # clean problem (explicit measure must name an input).
                    return self.problem(
                        f"@by-induction pattern {pat!r} names unknown measure "
                        f"{m.group(1)!r}; expected one of {int_vars}")
            if target is None:
                if len(int_vars) == 1:
                    target = int_vars[0]
                else:
                    # Whole-word match in the original pattern (case-sensitive
                    # first, then case-insensitive) so `N >> 1` finds `N`.
                    found = None
                    for v in int_vars:
                        if _re2.search(r"\b" + _re2.escape(v) + r"\b", pat):
                            found = v
                            break
                    if found is None:
                        for v in int_vars:
                            if _re2.search(r"\b" + _re2.escape(v) + r"\b", low, _re2.IGNORECASE):
                                found = v
                                break
                    if found is not None:
                        target = found
                    else:
                        return self.problem(
                            f"@by-induction pattern {pat!r} is ambiguous for inputs "
                            f"{int_vars}; write `@by-induction countdown on <measure>`")
            # Countdown generalizing: `qq` + other Int inputs, but NOT `rest`
            # (frame fixed; `Spec` already quantifies the frame internally.
            # Generalizing `rest` with `strongRecOn` leaves `e`/`ih` mentioning
            # metavars instead of `N`/`n`, stalling `fbm_verify` on
            # `_fvar = _fvar/2`-style goals. N-1/R.length keep `rest`.)
            gen_extra = ["qq"]
            fun_qs = {qv for qv, _, _, _ in self.rec_fun_slots}
            for v in self.in_vars:
                if (v != target and v not in fun_qs and v not in gen_extra
                        and _re2.fullmatch(r"[A-Za-z_][A-Za-z0-9_']*", v)):
                    gen_extra.append(v)
            gen_list = " ".join([target] + gen_extra)
            hbodies = [f"hbody{qv}" for qv, _, _, _ in self.rec_fun_slots]
            all_deps = deps + hbodies + ["ih"]
            # Threshold-specific countdown for division (ilb/ilog):
            # `>>1`/`shr` recurses on `shr TARGET 1` (guard `1 < TARGET`);
            # `/10`/`tdiv` recurses on `tdiv TARGET 10` (guard `10 <= TARGET`).
            # Pre-build a specialized `ih_call` (no `<` side goal at apply
            # time) so `fbm_verify` closes the recursive arm via plain
            # `assumption`; the base arm closes by peeling. Generic
            # `countdown` (e.g. `__tail_loop` accumulator loops) falls back
            # to the general `ih` (may need parking per tasks 2.2).
            is_shr_pat = (">> 1" in low or ">>1" in low or "shr" in low)
            is_tdiv_pat = ("/ 10" in low or "/10" in low or "tdiv" in low)
            single_var = (len(int_vars) == 1 and not hbodies)
            # Arm-filtered deps for the division countdown skeletons:
            # `by_cases` decides the branch flag, so each arm passes
            # only its live arm lemma. The dead arm lemma's conclusion
            # is fully general (`R S T` metas), so unconditional `apply`
            # unifies and walks a doomed path that burns heartbeats in
            # `whnf`/`isDefEq` instead of failing fast. True/nonzero arm
            # (`1 < X`, `10 ≤ X`) needs `branch_effect_1`; false/zero arm
            # needs `branch_effect_2`.
            rec_deps = ([d for d in deps + hbodies if d != "branch_effect_2"]
                        + ["ih_call", "ih"])
            base_deps = [d for d in deps + hbodies if d != "branch_effect_1"]
            if single_var and is_shr_pat and not is_tdiv_pat:
                self.out_lines.append(f"  have hnn : 0 \u2264 {target} := by omega")
                self.out_lines.append(
                    f"  have key : ∀ (m : Nat) ({target} : Int) (qq : Stack), 0 \u2264 {target} \u2192 {target}.toNat = m \u2192 Spec ({prog_app}) {pre} {post} := by")
                self.out_lines.append(f"    intro m")
                self.out_lines.append(f"    induction m using Nat.strongRecOn with")
                self.out_lines.append(f"    | ind m ih =>")
                self.out_lines.append(f"      intro {target} qq hnn0 e")
                self.out_lines.append(f"      by_cases h : 1 < {target}")
                self.out_lines.append(f"      \u00b7 have h_lt : (shr {target} 1).toNat < m := by")
                self.out_lines.append(f"          have h1 : (shr {target} 1).toNat = {target}.toNat / 2 := shr_toNat {target} hnn0")
                self.out_lines.append(f"          omega")
                self.out_lines.append(f"        have h_nn2 : 0 \u2264 shr {target} 1 := shr_nonneg {target} hnn0")
                self.out_lines.append(f"        have ih_call := ih ((shr {target} 1).toNat) h_lt (shr {target} 1) qq h_nn2 rfl")
                self.out_lines.append(f"        fbm_verify [{', '.join(rec_deps)}]")
                self.out_lines.append(f"      \u00b7 fbm_verify [{', '.join(base_deps)}]")
                self.out_lines.append(f"  exact key {target}.toNat {target} qq hnn rfl")
                self.was_spec = True
                return True
            if single_var and is_tdiv_pat and not is_shr_pat:
                self.out_lines.append(f"  have hnn : 0 \u2264 {target} := by omega")
                self.out_lines.append(
                    f"  have key : ∀ (m : Nat) ({target} : Int) (qq : Stack), 0 \u2264 {target} \u2192 {target}.toNat = m \u2192 Spec ({prog_app}) {pre} {post} := by")
                self.out_lines.append(f"    intro m")
                self.out_lines.append(f"    induction m using Nat.strongRecOn with")
                self.out_lines.append(f"    | ind m ih =>")
                self.out_lines.append(f"      intro {target} qq hnn0 e")
                self.out_lines.append(f"      by_cases h : 10 \u2264 {target}")
                self.out_lines.append(f"      \u00b7 have h_lt : (tdiv {target} 10).toNat < m := by")
                self.out_lines.append(f"          have h1 : (tdiv {target} 10).toNat = {target}.toNat / 10 := tdiv10_toNat {target} hnn0")
                self.out_lines.append(f"          omega")
                self.out_lines.append(f"        have h_nn2 : 0 \u2264 tdiv {target} 10 := tdiv10_nonneg {target} hnn0")
                self.out_lines.append(f"        have ih_call := ih ((tdiv {target} 10).toNat) h_lt (tdiv {target} 10) qq h_nn2 rfl")
                self.out_lines.append(f"        fbm_verify [{', '.join(rec_deps)}]")
                self.out_lines.append(f"      \u00b7 fbm_verify [{', '.join(base_deps)}]")
                self.out_lines.append(f"  exact key {target}.toNat {target} qq hnn rfl")
                self.was_spec = True
                return True
            # Explicit-measure countdown-by-2 with accumulator state
            # (first user: `__tail_loop`, measure `ODD`). Trigger:
            # multi-var countdown with an explicit `by 2` step and an
            # `on <measure>` target. Explicit motive (`have key` +
            # `Nat.strongRecOn`, no `generalizing`) so `e`/`ih` stay
            # concrete; `ih_call` is `ih` applied to the measure step
            # (`(TARGET - 2).toNat`, `h_lt`) with the measure ground
            # but the accumulators free -- they unify from the
            # call-site goal when `fbm_verify` applies it, and the
            # ground measure blocks premature application at the
            # top-level goal (a partial application unifies anywhere
            # and strands a bogus side goal). No nonneg premise: the
            # step can go negative (`ODD = 1` recurses at `-1`), so
            # the motive carries only the `toNat` equation (closed by
            # `rfl`). Requires file-local `sub2_toNat` (decrease)
            # plus split-free base/step spec helpers for
            # `tryArithUnfold`. Contract: guard `0 < MEASURE`, step
            # `MEASURE - 2`, `requires 0 <= MEASURE`.
            is_by2_pat = ("by 2" in low or "by2" in low)
            has_explicit_on = bool(_re2.search(
                r"\bon\s+[A-Za-z_][A-Za-z0-9_']*", low))
            if (not single_var and is_countdown and is_by2_pat
                    and has_explicit_on and not hbodies):
                acc_vars = [v for v in self.in_vars
                            if _re2.fullmatch(
                                r"[A-Za-z_][A-Za-z0-9_']*", v)]
                rec2_deps = ([d for d in deps + hbodies
                              if d != "branch_effect_2"]
                             + ["ih_call"])
                # Motive order is measure-first: the recursive call
                # keeps every accumulator but steps the measure, so
                # `ih` applied to the measure step alone leaves the
                # accumulators free to unify from the call-site goal,
                # while the ground measure blocks premature
                # application at the top-level goal. (Applying all
                # vars pins accumulators to rigid fvars that never
                # match the computed call-site expressions; applying
                # none unifies anywhere and strands a bogus goal.)
                key_vars = " ".join([target] + [v for v in acc_vars
                                                if v != target])
                self.out_lines.append(
                    f"  have key : \u2200 (m : Nat) ({key_vars} : Int) (qq : Stack), {target}.toNat = m \u2192 Spec ({prog_app}) {pre} {post} := by")
                self.out_lines.append(f"    intro m")
                self.out_lines.append(
                    f"    induction m using Nat.strongRecOn with")
                self.out_lines.append(f"    | ind m ih =>")
                self.out_lines.append(
                    f"      intro {key_vars} qq e")
                self.out_lines.append(f"      by_cases h : 0 < {target}")
                self.out_lines.append(
                    f"      \u00b7 have h_sub2 : ({target} - 2).toNat = {target}.toNat - 2 := sub2_toNat {target} h")
                self.out_lines.append(
                    f"        have h_lt : ({target} - 2).toNat < m := by omega")
                self.out_lines.append(
                    f"        have ih_call := ih (({target} - 2).toNat) h_lt ({target} - 2)")
                self.out_lines.append(
                    f"        fbm_verify [{', '.join(rec2_deps)}]")
                self.out_lines.append(
                    f"      \u00b7 fbm_verify [{', '.join(base_deps)}]")
                self.out_lines.append(
                    f"  exact key {target}.toNat {key_vars} qq rfl")
                self.was_spec = True
                return True
            self.out_lines.append(f"  have hnn : 0 \u2264 {target} := by omega")
            self.out_lines.append(
                f"  induction e : {target}.toNat using Nat.strongRecOn generalizing {gen_list} with")
            self.out_lines.append(f"  | ind n ih =>")
            self.out_lines.append(f"    fbm_verify [{', '.join(all_deps)}]")
            self.was_spec = True
            return True
        if is_nat and not is_list:
            # Strong induction on N.toNat. Requires a nonneg hypothesis:
            # `hw : 0 ≤ N` (from `when`) or an explicit `0 ≤ N` in pat.
            # Validate the body recurses (already true via routing).
            # Find the Int binder for N: first Int binder that appears in pat
            # (case-insensitive `n`). Fall back to `N`.
            target = "N"
            for v in _effect_vars([self.src_effect]):
                if v.lower() == "n" or v == "N":
                    # Prefer the exact binder spelling from the effect.
                    target = v
                    break
                if "n" in low and v.lower().startswith("n"):
                    target = v
                    break
            # Header already emitted by `_spec_emit`; append only the skeleton.
            # The theorem binders include `(N : Int)` via binder_part.
            # `generalizing`: the self-call runs under a `qpush`-extended
            # queue (`dip` saves the kept element on `q`) and with a
            # decremented counter and extended history, so `ih` must be
            # usable at any ambient queue, rest, counter, and accumulator
            # (`pushtop`'s List skeleton generalises only `qq`; the Nat
            # skeleton also generalises the rest and the other Int inputs).
            # Every name here must be a theorem binder with no undischarged
            # hypothesis mentioning it (else it is reverted as a premise and
            # `apply ih` leaves a side goal) -- see HELP.md.
            gen_extra = ["qq"]
            if self.in_rest or self.out_rest:
                gen_extra.append(self.rest_name)
            fun_qs = {qv for qv, _, _, _ in self.rec_fun_slots}
            for v in self.in_vars:
                if (v != target and v not in fun_qs and v not in gen_extra
                        and re.fullmatch(r"[A-Za-z_][A-Za-z0-9_']*", v)):
                    gen_extra.append(v)
            gen_list = " ".join([target] + gen_extra)
            # Functional-slot body hypotheses must be `apply`able (a
            # `∀`-hypothesis is invisible to `assumption`): they join
            # the lemma list so the body's `Spec` side goal unifies,
            # assigning the accumulator/rest/value metas. Words without
            # functional slots are unaffected (empty list).
            hbodies = [f"hbody{qv}" for qv, _, _, _ in self.rec_fun_slots]
            zero_deps = deps + hbodies
            succ_deps = deps + hbodies + ["ih"]
            self.out_lines.append(f"  have hnn : 0 ≤ {target} := by omega")
            self.out_lines.append(
                f"  induction e : {target}.toNat generalizing {gen_list} with")
            # The `cond` flag (`dup`ed counter) is a free variable here:
            # `condOk` fires `cond_zero` only on an `Eq flag 0` decision
            # (and `splitCondFlag` refuses when any hyp mentions both the
            # flag and a zero literal, as `hnn` does), so the zero case
            # derives the equation first; dually the step case derives
            # `≠ 0` so `cond_nonzero` fires (`by omega` uses `hnn`, `e`).
            self.out_lines.append(f"  | zero =>")
            self.out_lines.append(
                f"    have hN0 : {target} = 0 := by omega")
            self.out_lines.append(f"    fbm_verify [{', '.join(zero_deps)}]")
            self.out_lines.append(f"  | succ k ih =>")
            self.out_lines.append(
                f"    have hNe : {target} ≠ 0 := by omega")
            self.out_lines.append(
                f"    fbm_verify [{', '.join(succ_deps)}]")
            self.was_spec = True
            return True
        return self.problem(
            f"@by-induction pattern {pat!r} not recognised (expected an `R.length` "
            f"/ `R.tail` list pattern, an `N - 1` strong pattern, or a countdown "
            f"pattern `countdown on X` / `X >> 1` / `X / 10`)")

    def _transitive_words(self):
        """Defined words referenced by this word: executed callee
        tokens plus single-word literal targets, transitively."""
        out = []
        visited = {self.name}

        def visit(w):
            raw = self.defs.get(w)
            if raw is None:
                return
            for t in raw:
                if isinstance(t, str) and t.startswith("["):
                    try:
                        inner = _literal_inner_tokens(t)
                    except ValueError:
                        continue
                    if (len(inner) == 1 and isinstance(inner[0], str)
                            and inner[0] in self.defs
                            and inner[0] not in PRIMS):
                        if inner[0] not in visited:
                            visited.add(inner[0])
                            out.append(inner[0])
                            visit(inner[0])
                elif (isinstance(t, str) and t in self.defs
                        and t not in PRIMS):
                    if t not in visited:
                        visited.add(t)
                        out.append(t)
                        visit(t)

        visit(self.name)
        return out

    def emit(self, deps):
        """Write the doc comment and the theorem. Returns True when
        a theorem was emitted. `deps` are the `fbm_verify` dep
        names (own Prog def plus already-emitted callee Specs)."""
        ln = self.ln
        name = self.name
        # Prog defs are emitted up front by main(), in dependency
        # order (compositional `++` over callee Progs).
        # Non-frame-polymorphic prims go through the Spec family:
        # `exit` via `SpecExit`, `getc`/`clock`/`rand` via `SpecIO`,
        # the rest (`clr`/`depth`/`print`) via `SpecExact` below.
        if self.name == "exit":
            return self._emit_spec_exit(deps)
        if self.name == "rand":
            return self._emit_spec_io(deps)
        if self.name == "clock":
            return self._emit_spec_io(deps)
        if self.name == "getc":
            return self._emit_spec_io(deps)
        # Quotation primitives: direct Spec corollaries.
        if getattr(self, "is_quot", False):
            return self._emit_spec_quot(deps)
        # Defined words with quotation structure: Spec forms.
        if getattr(self, "is_runq", False):
            return self._emit_spec_runq(deps)
        if getattr(self, "is_runq_cond", False):
            return self._emit_spec_cond(deps)
        if getattr(self, "is_runq_direct", False):
            return self._emit_spec_direct(deps)
        if getattr(self, "is_runq_between", False):
            return self._emit_spec_between(deps)
        if getattr(self, "is_runq_compose", False):
            return self._emit_spec_compose(deps)
        if getattr(self, "is_runq_computed_flag", False):
            return self._emit_spec_cf(deps)
        # (v37) Recursive words: Spec/SpecExact with self + lit hyps,
        # proved via @by-proof / @by-induction (fbm_verify cannot do
        # induction, so a missing clause is a clean problem).
        if getattr(self, "is_recursive", False):
            return self._emit_spec_recursive(deps)
        # Guarded-prim `else ERROR` branches: SpecErr.
        if self.is_error:
            return self._emit_spec_error(deps)
        # Plain words: Spec, unless the flat program touches a
        # non-frame-polymorphic primitive (clr/depth/print/getc/
        # rand/clock/exit), which goes through the Spec family
        # (`SpecExact` for stack-observing words like `empty?`).
        flat = [t for t in self.prog_tokens.get(self.name, [])
                if isinstance(t, str)]
        if any(t in ("clr", "depth", ".", "getc", "rand", "clock",
                      "exit") for t in flat):
            return self._emit_spec_exact(deps)
        return self._emit_spec_normal(deps)


def main():
    src_path, out_path, from_stdin = parse_args(sys.argv)
    text = sys.stdin.read() if from_stdin else src_path.read_text()
    effects_list, lean_blocks, text2 = extract_effects(text)
    defs = parse_definitions(text2)
    # Rec-call-graph cache, computed ONCE per run (not per effect).
    # Same sets the per-effect code computed before; only the count
    # changes (1 run, not 61). Failures fall back to empty, matching
    # the old per-effect try/except call sites.
    try:
        _rec_succ = _succ_map(defs)
    except Exception:
        _rec_succ = {}
    try:
        _rec_words_run = _compute_rec_words(defs, _rec_succ)
    except Exception:
        _rec_words_run = set()
    try:
        _rec_frontier_run = _compute_rec_frontier(defs, _rec_words_run, _rec_succ)
    except Exception:
        _rec_frontier_run = set()

    # Attach @effect comments to words by the word named in the
    # effect itself: the last token before '==', in postfix
    # position, exactly as typed -- or an explicit `word:` prefix.
    # No definition is required: a primitive word stands alone,
    # a defined word is looked up by name anywhere in the input
    # (flattened preprocessor output carries every definition;
    # a raw standalone file carries its own).
    # Several effects for the same word are kept, in file order.
    # Output lines and problems are initialised here (before the
    # effect-attachment loop) so a malformed @effect can be
    # recorded as a problem comment without crashing the run.
    out_lines = [LEAN_HEADER]
    problems = []
    # (v37) Verbatim @lean blocks, in file order, right after the
    # header so helper definitions/lemmas are in scope for the
    # theorems below. Each carries its source line for traceback.
    for lean_line, lean_body in lean_blocks:
        if lean_body.startswith("-- ERROR:"):
            problems.append(f"@lean block (line {lean_line}): {lean_body[len('-- ERROR: '):]}")
            out_lines.append(f"-- @lean from {src_path}:{lean_line} REJECTED: {lean_body}")
            out_lines.append("")
            continue
        out_lines.append(f"-- @lean from {src_path}:{lean_line}, pasted verbatim")
        out_lines.append(lean_body)
        out_lines.append("")
    effects = {}  # word -> [(in_elems, out_elems, cond, where_text), ...] in file order
    effect_text = {}  # word -> [effect text, ...] in file order
    effect_line = {}  # word -> [source line, ...] in file order
    effect_full = {}  # word -> [full @effect text as written, ...] in file order
    for src_line, e in effects_list:
        # New syntax (v20): `word:` prefix -- the word name is the
        # first token, ending in `:`, before the effect. Any single
        # token works here, including symbolic words (`%:`, `<<:`,
        # `.:`, `~:`). Old syntax (word in postfix position before
        # `==`) is still accepted when there is no prefix.
        # DOTALL: the body may span lines (multi-line @by-proof /
        # @by-induction); without it `$` cannot anchor past the
        # first newline and the match fails, misreading the word.
        m = re.match(r"^([^\s:]+):\s+(.*)$", e, re.DOTALL)
        if m:
            word, body = m.group(1), m.group(2)
        else:
            body = e
            left = body.split("==", 1)[0].split()
            if not left:
                raise ValueError(f"@effect has no inputs and no word: {e!r}")
            word = left[-1]
        # (v37) Split trailing `@by-proof` / `@by-induction` clauses
        # before parsing the stack picture; they ride along into
        # EmitCtx and select the proof body at emission.
        try:
            core_body, by_proof, by_ind, by_assume = _split_proof_clauses(body)
        except ValueError as ex:
            problems.append(f"{word} (line {src_line}): {ex}")
            out_lines.append(f"-- {lean_name(word)}: no theorem emitted (src {src_path}:{src_line}): {ex}")
            out_lines.append("")
            continue
        # A malformed effect (unclosed `{`, stray `}`, missing
        # `==`) is a clean problem, not a crash: it is recorded
        # here and reported with the rest, so one bad effect does
        # not lose the whole file.
        try:
            parsed = parse_effect(core_body, word=word)
        except ValueError as ex:
            problems.append(f"{word}: {ex}")
            out_lines.append(f"-- {lean_name(word)}: no theorem emitted (src {src_path}:{src_line}): {ex}")
            out_lines.append("")
            continue
        in_elems, out_elems, cond, where_text, else_error = parsed
        if else_error and (by_proof is not None or by_ind is not None or by_assume is not None):
            msg = "@by-proof / @by-induction / @assume cannot be combined with `else ERROR`"
            problems.append(f"{word} (line {src_line}): {msg}")
            out_lines.append(f"-- {lean_name(word)}: no theorem emitted (src {src_path}:{src_line}): {msg}")
            out_lines.append("")
            continue
        effects.setdefault(word, []).append(
            (in_elems, out_elems, cond, where_text, else_error, by_proof, by_ind, by_assume))
        effect_text.setdefault(word, []).append(core_body)
        effect_line.setdefault(word, []).append(src_line)
        # The doc comment is a Lean line comment: it must stay on
        # one line even when the @effect was written multi-line.
        effect_full.setdefault(word, []).append(re.sub(r"\s*\n\s*", " ", e))


    # One entry per effect, in file order; a word's effects share
    # its program, computed once (below) and cached in `progs`.
    # An `else ERROR` effect expands into two entries BEFORE
    # numbering, so the two theorems are numbered `_1`/`_2` in
    # order: the success case with `when <cond>`, and the error
    # case (`== ERROR`) with `when` the negated condition. The
    # error entry's `where` is dropped (there is no output to
    # constrain); its doc comment marks it as the else branch.
    # Assumed-effects: two effects on one word must not mix assumed
    # and proven clauses (an axiom and a theorem would collide on the
    # same `<name>_effect` lemma). Report once per word and drop the
    # word's effects.
    for name in list(effects):
        has_assume = any(t[7] is not None for t in effects[name])
        has_proven = any(t[7] is None for t in effects[name])
        if has_assume and has_proven and len(effects[name]) > 1:
            msg = f"{name}: cannot mix @assume and proven clauses on one word"
            problems.append(msg)
            out_lines.append(f"-- {lean_name(name)}: no theorem emitted: {msg}")
            out_lines.append("")
            del effects[name]
    entries = []
    for name in effects:
        expanded = []
        for idx, (in_elems, out_elems, cond, where_text, else_error, by_proof, by_ind, by_assume) in enumerate(effects[name]):
            body = effect_text[name][idx]
            src_line = effect_line[name][idx]
            full = effect_full[name][idx]
            if else_error:
                expanded.append((in_elems, out_elems, cond, where_text, body, src_line, full, by_proof, by_ind, by_assume))
                try:
                    neg = negate_cond(cond)
                except ExprError:
                    # Unparseable condition: fall back to `¬ (cond)`
                    # and let the main loop report it as a problem
                    # for the error effect (the success effect's own
                    # translation fails the same way).
                    neg = f"¬ ({cond})"
                expanded.append((in_elems, ["ERROR"], neg, None, body + " [else ERROR]", src_line, full + " [else ERROR]", None, None, None))
            else:
                expanded.append((in_elems, out_elems, cond, where_text, body, src_line, full, by_proof, by_ind, by_assume))
        for idx, (in_elems, out_elems, cond, where_text, body, src_line, full, by_proof, by_ind, by_assume) in enumerate(expanded):
            entries.append((name, idx, len(expanded), in_elems,
                            out_elems, cond, where_text, body, src_line, full,
                            by_proof, by_ind, by_assume))
    # Generalized compositional frontier, computed ONCE per run (not per
    # effect): every word carrying an @effect in this run. Same sharing
    # shape as the rec-call-graph cache above (1 run, not 61). Falls back
    # to empty, matching the old per-effect try/except call sites.
    try:
        _gen_frontier_run = _compute_gen_frontier(defs, set(effects))
    except Exception:
        _gen_frontier_run = set()
    emitted = 0
    progs = {}
    prog_tokens = {}  # word -> raw token list (for the trace / oracle checks)
    prog_lits = {}  # word -> literal-body programs (v30)
    prog_raw_lits = {}  # word -> raw inner-token lists, parallel to prog_lits (v30)
    prog_lit_params = {}  # word -> " (lit0 lit1 : Int)" or "" (v30)
    prog_self_vars = {}  # word -> [self_* vars] (frontier call params, v37)
    failed = set()
    prog_emitted = set()
    ctxs = []
    for name, idx, n_effects, in_elems, out_elems, cond, where_text, effect_body, src_line, src_effect, by_proof, by_ind, by_assume in entries:
        ctx = EmitCtx(name=name, idx=idx, n_effects=n_effects,
                      in_elems=in_elems, out_elems=out_elems, cond=cond,
                      where_text=where_text, effect_body=effect_body,
                      src_line=src_line, src_path=str(src_path),
                      src_effect=src_effect,
                      by_proof=by_proof, by_induction=by_ind, by_assume=by_assume,
                      rec_words=_rec_words_run, rec_frontier=_rec_frontier_run,
                      rec_succ=_rec_succ, annotated=_gen_frontier_run,
                      defs=defs, progs=progs, prog_tokens=prog_tokens,
                      prog_lits=prog_lits, prog_raw_lits=prog_raw_lits,
                      prog_lit_params=prog_lit_params,
                      prog_self_vars=prog_self_vars,
                      failed=failed, prog_emitted=prog_emitted,
                      out_lines=out_lines, problems=problems)
        if not ctx.prepare():
            continue
        ctxs.append(ctx)
    # Phase B: emit all Prog defs up front, in dependency order
    # (callee before caller), as compositional `++` over callee
    # Progs. Words are raw definition tokens plus single-word
    # literal targets, transitively.
    order = []
    visit_state = {}

    def visit(w):
        st = visit_state.get(w)
        if st == "done" or st == "doing":
            return
        if w in PRIMS:
            visit_state[w] = "done"
            order.append(w)
            return
        visit_state[w] = "doing"
        for t in defs.get(w, []):
            if isinstance(t, str) and t.startswith("["):
                try:
                    inner = _literal_inner_tokens(t)
                except ValueError:
                    continue
                if (len(inner) == 1 and isinstance(inner[0], str)
                        and inner[0] in defs and inner[0] not in PRIMS):
                    visit(inner[0])
            elif isinstance(t, str) and t in defs and t not in PRIMS:
                visit(t)
        visit_state[w] = "done"
        order.append(w)
    for _ctx in ctxs:
        visit(_ctx.name)
    if ctxs:
        for w in order:
            if w in failed or w in progs:
                continue
            ctxs[0]._compute_prog(w)
    for w in order:
        if w not in progs or w in prog_emitted:
            continue
        out_lines.append(
            f"def {lean_name(w)}Prog{prog_lit_params.get(w, '')} : "
            f"List Tok := {progs[w]}")
        prog_emitted.add(w)
    # Theorems in file order (check.py maps Lean errors back by
    # emitted-theorem order, naming TAP tests by the `/-- ... -/`
    # doc comment above each theorem). Deps for `fbm_verify [...]` are the
    # word's own Prog plus already-emitted transitive callee
    # Spec theorems (same-word siblings excluded: each case
    # proves itself by peeling).
    emitted_spec = {}
    for ctx in ctxs:
        deps = [f"{ctx.ln}Prog"]
        for w in ctx._transitive_words():
            if w == ctx.name:
                continue
            for t in emitted_spec.get(w, []):
                if t not in deps:
                    deps.append(t)
        if ctx.emit(deps):
            out_lines.append('')
            emitted += 1
            if getattr(ctx, "was_spec", False):
                emitted_spec.setdefault(ctx.name, []).append(
                    f"{ctx.ln}_effect{ctx.suffix}")

    if problems:
        print("generator: problems (no theorem emitted for these):", file=sys.stderr)
        for p in problems:
            print(f"  - {p}", file=sys.stderr)
    output = "\n".join(out_lines)
    if out_path is None:
        sys.stdout.write(output)
    else:
        out_path.write_text(output)
    # Summary always goes to stderr, so stdout stays pure Lean
    # for piping (`generate.py in.ff | lean`).
    where = "stdout" if out_path is None else str(out_path)
    print(f"generator: wrote {where} ({emitted} theorem(s) emitted, {len(problems)} problem(s))", file=sys.stderr)

if __name__ == "__main__":
    main()
