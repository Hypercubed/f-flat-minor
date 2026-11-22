#!/usr/bin/env python3
"""Generate Lean proofs from an .ff file with @effect comments.

Usage:  python3 generate.py in.ff [out.lean]
        python3 generate.py in.ff | lean --stdin

A pure translator: it parses, inlines, and emits Lean. It runs no
tests and has no interpreter of its own. The full manual (notation,
scope, IO, where/when, the proof ladder) is in HELP.md; the
user-facing guide is README.md; the design and phases are PLAN.md.
The Lean preamble lives in preamble.lean.
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
    return ast


def _ast_var_names(ast):
    """(v36) The set of variable names in a parsed expression
    AST (for validating that a `where` clause only mentions
    variables the proof puts in scope)."""
    kind = ast[0]
    if kind == "var":
        return {ast[1]}
    if kind == "restlen":
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

def _load_preamble():
    """Load the Lean preamble from preamble.lean (same directory
    as this script). The file is the source of truth for the
    interpreter; edit it there, not here."""
    path = Path(__file__).resolve().parent / "preamble.lean"
    return path.read_text()

LEAN_PREAMBLE = _load_preamble()

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
    built from value `a` and quotation `B`.
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
                # replaces the old `rest.length`, which is dropped).
                # Anything else with a dot is rejected: stack
                # variables are Ints, only a rest list has a length.
                # Whether `val` is actually the rest binder is
                # checked in prepare(); here it is just parsed.
                if peek() == ("dot", "."):
                    next_tok()
                    k2, v2 = next_tok()
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

def _emit_expr(ast):
    kind = ast[0]
    if kind in ("num", "var"):
        return ast[1]
    if kind == "restlen":
        # `<name>.length` is a Nat (List.length); the stack holds
        # Ints, so the cast is part of the translation. `name` must
        # be the effect's rest binder (checked in prepare()).
        return f"({ast[1]}.length : Int)"
    if kind == "call":
        # Lean application is space-separated, not f(a, b):
        # `min(a,b)` in an effect means `min a b` in Lean.
        if not ast[2]:
            return ast[1]
        return ast[1] + " " + " ".join(_emit_expr(a) for a in ast[2])
    if kind == "neg":
        return f"(-{_emit_expr(ast[1])})"
    if kind == "not":
        return f"(¬ {_emit_expr(ast[1])})"
    if kind == "lnot":
        # `lnot` in the preamble (v23, @[simp]); `~` and `~~~`
        # both emit it, as does the `lnot(a)` call form.
        return f"(lnot ({_emit_expr(ast[1])}))"
    if kind == "if":
        return (f"(if {_emit_expr(ast[1])} then {_emit_expr(ast[2])} "
                f"else {_emit_expr(ast[3])})")
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
            return f"(tmod ({_emit_expr(l)}) ({_emit_expr(r)}))"
        if op == "/":
            return f"(tdiv ({_emit_expr(l)}) ({_emit_expr(r)}))"
        if op in ("&", "&&&"):
            return f"(land ({_emit_expr(l)}) ({_emit_expr(r)}))"
        if op == "!=":
            return f"({_emit_expr(l)} ≠ {_emit_expr(r)})"
        if op == "==":
            return f"({_emit_expr(l)} = {_emit_expr(r)})"
        if op in ("|", "|||"):
            return f"(lor ({_emit_expr(l)}) ({_emit_expr(r)}))"
        if op in ("⊕", "^^^"):
            # Bitwise xor (v22): `xor` in the preamble, defined
            # as (a & ~b) | (b & ~a), `@[simp]` so the ladder
            # unfolds it. `^` in F♭m is power, so xor is `⊕`
            # (also `^^^`, Lean's Nat xor, and `xor(a, b)`).
            return f"(xor ({_emit_expr(l)}) ({_emit_expr(r)}))"
        if op == "^":
            # Lean's `^` on Int takes a Nat exponent; the effect
            # writes an Int exponent, so it is converted here.
            return f"({_emit_expr(l)} ^ ({_emit_expr(r)}).toNat)"
        if op in ("<<", "<<<"):
            return f"(shl ({_emit_expr(l)}) ({_emit_expr(r)}))"
        if op in (">>", ">>>"):
            return f"(shr ({_emit_expr(l)}) ({_emit_expr(r)}))"
        return f"({_emit_expr(l)} {op} {_emit_expr(r)})"
    raise ExprError(f"bad AST node {ast!r}")

def translate_expr(s):
    """Translate an effect expression to Lean. `%` and `&` mean
    F♭m's operators (truncating mod, bitwise and), not Lean's
    (Euclidean `%`, no Int `&`), so they become the `tmod` /
    `land` helpers; `!=` becomes `≠` and `==` becomes `=`,
    because Lean's `!=` / `==` are boolean, not propositions.
    Raises ExprError on anything it cannot translate."""
    return _emit_expr(_parse_expr(s))

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

def _trace_for(name, prog, in_vars, in_lean):
    """The IO trace (a Lean list expression) for a theorem's
    `Outcome.ok` right-hand side. Only a bare effect on a single
    IO primitive has a non-empty trace: `putc`/`putn` record the
    value they print (the top input), `.` records the whole input
    stack. `exit`/`rand`/`clock` and every pure word record
    nothing (`[]`) -- `exit`'s outcome is `Outcome.exit`, not
    `ok`, and `rand`/`clock` perform no output. A defined word
    never has a trace here, because IO inside a defined word is
    refused before emission (see the program check in main)."""
    if len(prog) == 1 and prog[0] == name and name in IO_PRIMS:
        if name == "putc":
            top = in_vars[-1] if in_vars else None
            return f"[IOAction.putc {top}]" if top else "[]"
        if name == "putn":
            top = in_vars[-1] if in_vars else None
            return f"[IOAction.putn {top}]" if top else "[]"
        if name == ".":
            return f"[IOAction.print ({in_lean})]"
    return "[]"

def parse_args(argv):
    """Parse command-line args: generate.py in.ff [out.lean|-].
    Returns (src_path, out_path) where out_path is None for stdout.
    `--help` prints the short usage; the full manual is HELP.md."""
    if len(argv) == 2 and argv[1] in ("-h", "--help"):
        print("usage: generate.py in.ff [out.lean|-]")
        print("       out.lean omitted (or '-') writes Lean to stdout")
        print("       full manual: HELP.md (notation, scope, IO, requires/ensures)")
        sys.exit(0)
    if len(argv) < 2 or len(argv) > 3:
        print("usage: generate.py in.ff [out.lean|-]", file=sys.stderr)
        print("       out.lean omitted (or '-') writes Lean to stdout", file=sys.stderr)
        sys.exit(2)
    src_path = Path(argv[1])
    out_arg = argv[2] if len(argv) == 3 else None
    out_path = None if out_arg in (None, "-") else Path(out_arg)
    return src_path, out_path


def extract_effects(text):
    """Strip ordinary /* */ comments, keeping @effect bodies.
    Returns (effects_list, text_without_comments): effects_list is
    a list of (source line, @effect body) in file order (the body
    without the '@effect' tag); the returned text has every comment
    replaced by a single space so definitions still parse. The
    source line is what the `-- src:` marker in the generated Lean
    reports, so a Lean error can be traced back to the statement
    it came from."""
    effects_list = []
    for m in re.finditer(r"/\*(.*?)\*/", text, flags=re.S):
        body = m.group(1).strip()
        if body.startswith("@effect"):
            line = text.count("\n", 0, m.start()) + 1
            effects_list.append((line, body[len("@effect"):].strip()))
    text2 = re.sub(r"/\*(.*?)\*/", " ", text, flags=re.S)
    return effects_list, text2


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
    """A program token (int, primitive name, or ("lit", k) marker)
    as a Lean Tok expression. A literal marker becomes a push of
    its code variable (`Tok.push lit{k}`)."""
    if isinstance(tok, int):
        return f"Tok.push {tok}"
    if isinstance(tok, tuple) and tok[0] == "lit":
        return f"Tok.push lit{tok[1]}"
    return PRIMS[tok]


def _inline_tokens(tokens, defs, seen):
    """Inline a token list (a definition body or a literal's
    contents). Returns (prog, lits, raw_lits): prog is the flat
    token list (ints, primitive names, ("lit", k) markers for
    quotation literals); lits is the list of literal-body programs
    (inlined, in the same format), collected INNERMOST-FIRST
    (when inlining a literal, its contents are inlined first --
    which may append inner literals -- then this literal's body);
    raw_lits is the list of raw inner-token lists, parallel to
    lits (raw_lits[k] is the tokens as written inside literal k's
    brackets -- needed to tell a single-word literal `[sip]` from
    a multi-token one). A literal's markers are remapped to their
    positions in the outer `lits` as they are collected.
    Recursive calls are refused (ValueError)."""
    out = []
    lits = []
    raw_lits = []
    for tok in tokens:
        if isinstance(tok, str) and tok.startswith("["):
            inner = _literal_inner_tokens(tok)
            body_prog, body_lits, body_raws = _inline_tokens(inner, defs, seen)
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
            sub_prog, sub_lits, sub_raws = inline_word(tok, defs, seen)
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


def inline_word(name, defs, seen=()):
    """Inline a defined word. Returns (prog, lits, raw_lits)
    (see _inline_tokens). Recursive calls are refused
    (ValueError). (v30: the third element, the raw inner-token
    lists, is what the runQ path uses to tell a single-word
    literal `[sip]` -- whose body is the word's `Prog` def --
    from a multi-token literal, whose body is a literal list.)"""
    if name in seen:
        raise ValueError(f"recursive word {name!r} -- needs fuel + induction, not inlining")
    if name not in defs:
        raise ValueError(f"unknown word {name!r}")
    return _inline_tokens(defs[name], defs, seen + (name,))


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


def _sim_runq(tokens, stack, stack_rest, queue, queue_tail):
    """Simulate `tokens` on a symbolic stack and queue (Phase 6).
    `stack` is a list of Lean expressions, bottom-to-top (the last
    element is the top); `stack_rest` is the rest variable name or
    None. `queue` is a list of Lean expressions, head-first; the
    head is `queue[0]`, the tail is the variable `queue_tail`.
    Returns (stack, stack_rest, queue, queue_tail). Raises
    ValueError for an unsupported token or an underflow (a pop
    from the rest / from the ambient queue tail, whose head cannot
    be named)."""
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


def _sim_runq_expanded(tokens, lits, stack, stack_rest, queue, queue_tail):
    """Simulate `tokens` on a symbolic stack and queue (Phase 6,
    v30: the literal-expanding version of _sim_runq). `tokens` may
    contain ("lit", k) markers; when `eval` dispatches on a lit
    marker, the literal's body is spliced in front of the remaining
    tokens and simulation continues. Stops at the first `eval`
    whose stack top is a variable (not a lit marker). Returns
    (stack, stack_rest, queue, queue_tail, steps, remaining):
    the state at the dispatch point (the quotation code still on
    top of `stack`), the number of execQ steps consumed before
    the dispatch (each token processed counts 1, each literal-eval
    dispatch counts 1; the dispatch itself is NOT counted -- it is
    the +1 in the fuel formula), and the tokens not yet consumed
    (the suffix). Raises ValueError for an unsupported token, an
    underflow, or no eval on a variable quotation."""
    stack = list(stack)
    queue = list(queue)
    rest = list(tokens)
    steps = 0
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
                # Literal dispatch: pop the code, splice the
                # literal's body in front of the remaining tokens.
                k = int(top[3:])
                stack.pop()
                rest = list(lits[k]) + rest
                steps += 1
                continue
            if top.lstrip("-").isdigit():
                raise ValueError(
                    "eval on an integer in a runQ prefix (the quotation "
                    "code must be a variable or a literal)")
            # Variable quotation: the dispatch point. The code
            # stays on top; the caller pops it for the body's
            # input stack. The dispatch itself is not counted in
            # `steps` (it is the +1 in the fuel formula).
            return stack, stack_rest, queue, queue_tail, steps, rest
        steps += 1
        if isinstance(tok, tuple) and tok[0] == "lit":
            # A literal marker: push its code variable.
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


# Comparison tokens the runQ cond simulator understands (v31):
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


def _sim_runq_cond(tokens, stack, stack_rest, queue, queue_tail, stop_at_cond=True):
    """Simulate `tokens` on a symbolic stack and queue (Phase 6,
    v31: the cond variant of _sim_runq). Like _sim_runq, but it
    also handles comparison tokens by pushing a Lean
    if-expression, and literal markers by pushing their code
    variables. With stop_at_cond (the default) it stops at the
    first `?` and returns (stack, stack_rest, queue, queue_tail,
    steps, remaining): the state at the dispatch point (the
    quotation code on top, the flag below it), the number of
    tokens consumed before the dispatch, and the tokens after
    it. With stop_at_cond False it simulates the whole list (a
    `?` there is a ValueError -- one `?` at a time) and returns
    the same tuple with remaining []. Raises ValueError for an
    unsupported token (eval, cons, other computing words, IO)
    or an underflow."""
    stack = list(stack)
    queue = list(queue)
    steps = 0
    for i, tok in enumerate(tokens):
        if tok == "?":
            if stop_at_cond:
                return (stack, stack_rest, queue, queue_tail, steps,
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
        else:
            raise ValueError(
                f"token {tok!r} is not supported in a runQ cond prefix "
                f"(only stack shuffles, q< / q>, comparisons, and literals are)")
        steps += 1
    if stop_at_cond:
        raise ValueError(
            "the program has no ? dispatch (the cond path needs one)")
    return stack, stack_rest, queue, queue_tail, steps, []


def _sim_runq_between(tokens, lits, stack, stack_rest, queue, queue_tail):
    """Simulate `tokens` on a symbolic stack and queue (Phase 6,
    v33: the between? variant). Like _sim_runq_cond, but it also
    splices literal bodies in when `eval` dispatches on them
    (like _sim_runq_expanded), and stops at the first `?`. The
    `?` is inside the spliced literal body (a word like sort2);
    the tokens before it are only shuffles, q< / q>,
    comparisons, and literal markers, so any computing token
    before the `?` is a ValueError. Returns (stack, stack_rest,
    queue, queue_tail, steps, remaining, eval_lit): the state at
    the `?` dispatch (the quotation code on top, the flag below
    it), the number of tokens consumed before the dispatch (each
    token processed counts 1, each literal-eval dispatch counts
    1), the tokens not yet consumed, and the lit index the eval
    dispatched on (None when the `?` was reached without an
    eval). Raises ValueError for an unsupported token, an
    underflow, an eval on a variable quotation, or no `?`
    dispatch."""
    stack = list(stack)
    queue = list(queue)
    rest = list(tokens)
    steps = 0
    eval_lit = None
    lit_names = {f"lit{k}" for k in range(len(lits))}
    while True:
        if not rest:
            raise ValueError(
                "the program has no ? dispatch (the between? path "
                "needs one inside the literal body)")
        tok = rest.pop(0)
        if tok == "?":
            return (stack, stack_rest, queue, queue_tail, steps, rest,
                    eval_lit)
        if tok == "eval":
            if not stack:
                raise ValueError("eval underflows the stack in a runQ between prefix")
            top = stack[-1]
            if top in lit_names:
                eval_lit = int(top[3:])
                stack.pop()
                rest = list(lits[eval_lit]) + rest
                steps += 1
                continue
            if top.lstrip("-").isdigit():
                raise ValueError(
                    "eval on an integer in a runQ between prefix (the "
                    "quotation code must be a literal)")
            raise ValueError(
                "eval on a variable quotation in a runQ between prefix "
                "(the eval must run a literal)")
        steps += 1
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
    failed: set
    prog_emitted: set
    out_lines: list
    problems: list
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
    in_lean: str = ""
    existential: list = field(default_factory=list)
    binder_part: str = ""
    rest_binder: str = ""
    rest_name: str = "rest"
    hw_binder: str = ""
    simp_args: str = ""
    hguard_line: str | None = None
    trace: str = "[]"
    oracle_binder: str = ""
    oracle_arg: str = "[]"
    suffix: str = ""
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
                prog, lits, raw_lits = inline_word(name, self.defs)
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
        self.progs[name] = "[" + ", ".join(_tok_lean(t) for t in prog) + "]"
        self.prog_tokens[name] = prog
        self.prog_lits[name] = lits
        self.prog_raw_lits[name] = raw_lits
        self.prog_lit_params[name] = (
            f" ({' '.join(f'lit{i}' for i in range(len(lits)))} : Int)"
            if lits else "")
        return prog, lits, raw_lits

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
            p_stack, p_rest, p_queue, p_tail, steps, remaining = _sim_runq_expanded(
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
        self.runq_queue_dispatch = _queue_lean(p_queue, p_tail)
        # The suffix (the tokens after the dispatch) runs on the
        # body's output (queue unchanged by the body) and must land
        # on the effect's output stack with the ambient queue
        # restored. A second eval here is a clean problem (the
        # plain simulator refuses it).
        try:
            s_stack, s_rest, s_queue, s_tail = _sim_runq(
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
        if cond is not None:
            return self.problem("a runQ cond effect takes no when clause yet")
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
        if len(quot_idx) != 1 or prog[quot_idx[0]] != "?":
            return self.problem(
                "a runQ cond effect needs exactly one ? in its program")
        # The body Lean expression for each literal (as in v30).
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
        # No quotation slot in the inputs or outputs: the `?`
        # dispatches on a literal from the definition, not on a
        # variable quotation, so a bracketed element here would
        # have no meaning (and would not be a Lean expression).
        for e in in_elems + out_elems:
            if _parse_quot_slot(e) is not None:
                return self.problem(
                    f"a runQ cond effect takes no quotation element {e!r} "
                    f"(the ? dispatches on a literal from the definition)")
        # Rest handling (mirrors the standard path, but the rest
        # must be preserved: the word cannot drop it or conjure
        # one. Unnamed, it defaults to `R` (as in the hand-proofs
        # for sort2/choose), collision-avoided.
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
                "the rest must be preserved by a runQ cond word "
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
        # The `where` equations (the direct form): each output
        # variable gets its right-hand side substituted into the
        # output stack. A left-hand side that is not an output
        # variable, or a right-hand side mentioning anything but
        # input variables (and the rest), is a clean problem.
        where_rhs = {}
        if where_text is not None:
            try:
                where_eqs = parse_where_clauses(where_text)
            except ValueError as ex:
                return self.problem(str(ex))
            for lhs, rhs in where_eqs:
                if lhs not in out_vars:
                    return self.problem(
                        f"where equation for {lhs!r}, which is not an output variable")
                try:
                    rhs_lean = translate_expr(rhs)
                except ExprError as ex:
                    return self.problem(str(ex))
                rhs_vars = _effect_vars([rhs])
                bad = [v for v in rhs_vars
                       if v not in in_vars and v != rest_name]
                if bad:
                    return self.problem(
                        f"where right-hand side mentions {bad[0]!r}, which is "
                        f"not an input variable")
                where_rhs[lhs] = rhs_lean
        # Simulate the prefix up to the `?` dispatch. The stack
        # is bottom-to-top elements; the rest sits underneath
        # them. The queue starts as the ambient `qq`.
        try:
            p_stack, p_rest, p_queue, p_tail, steps, remaining = _sim_runq_cond(
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
            b_stack, _, b_queue, _, _, _ = _sim_runq_cond(
                body_prog, list(stack_below), p_rest, list(p_queue), p_tail,
                stop_at_cond=False)
            run_stack, _, run_queue, _, _, _ = _sim_runq_cond(
                remaining, list(b_stack), p_rest, list(b_queue), p_tail,
                stop_at_cond=False)
            disc_stack, _, disc_queue, _, _, _ = _sim_runq_cond(
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
            p_stack, p_rest, p_queue, p_tail, steps, remaining = _sim_runq_cond(
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
                b_stack, _, b_queue, _, _, _ = _sim_runq_cond(
                    body_prog, list(stack_below), p_rest, list(p_queue),
                    p_tail, stop_at_cond=False)
                f_stack, _, f_queue, _, _, _ = _sim_runq_cond(
                    suffix_pre, list(b_stack), p_rest, list(b_queue),
                    p_tail, stop_at_cond=False)
            else:
                f_stack, _, f_queue, _, _, _ = _sim_runq_cond(
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
                _sim_runq_between(prog, lits, list(in_vars), rest_name,
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
            p_stack, p_rest, p_queue, p_tail, steps1, remaining1 = _sim_runq_expanded(
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
            m_stack, m_rest, m_queue, m_tail, steps2, remaining2 = _sim_runq_expanded(
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
            f_stack, f_rest, f_queue, f_tail = _sim_runq(
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
             remaining1) = _sim_runq_expanded(
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
             remaining_after) = _sim_runq_cond(
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
                    (elems, rest, queue, tail, _s, _r) = _sim_runq_cond(
                        litS_body, elems, rest, queue, tail,
                        stop_at_cond=False)
                except ValueError as ex:
                    raise ValueError(f"cond body simulation failed ({ex})")
            try:
                (elems, rest, queue, tail, _s, _r) = _sim_runq_cond(
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
             _s, _r) = _sim_runq_cond(
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
        if any(named_rest(e) is not None for e in in_elems[1:] + out_elems[1:]):
            return self.problem("a named rest (..r) is only allowed at the far left (the rest position)")
        in_named = named_rest(in_first)
        out_named = named_rest(out_first)
        if out_named is not None and in_named is None and not in_empty:
            return self.problem(
                f"the output names a rest ..{out_named} that the input does not name")
        if in_named is not None and out_named is not None and in_named != out_named:
            return self.problem(
                f"the rest is named ..{in_named} on the input and ..{out_named} "
                f"on the output; use the same name on both sides")
        self.rest_name = in_named or out_named or "rest"
        in_explicit = in_first == "..." or in_named is not None
        out_explicit = out_first == "..." or out_named is not None
        self.in_rest = not in_empty
        self.out_rest = out_explicit or (not out_empty and not in_empty and not in_explicit)
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
        def needs_translation(e):
            # (v23) `⊕` is the only operator that needs naming: the
            # Lean operators (`&&&`, `|||`, `^^^`, `<<<`, `>>>`,
            # `~~~`) all contain their ASCII operator as a
            # substring, so the checks below already catch them,
            # and every f() form is caught by the call regex.
            return ("%" in e or "/" in e or "&" in e or "|" in e or "^" in e or "~" in e
                    or "⊕" in e or "#" in e
                    or "<<" in e or ">>" in e or "." in e
                    or re.search(r"[A-Za-z_][A-Za-z0-9_']*\s*\(", e) is not None)
        try:
            # An error effect has no output expression to translate.
            if not self.is_error:
                self.out_vars = [translate_expr(e) if needs_translation(e) else e
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
        # The trace for the `Outcome.ok` right-hand side: the
        # actions this word performs (a single action for a bare
        # IO primitive, `[]` otherwise).
        in_vars_only = _effect_vars(in_elems)
        self.trace = _trace_for(name, self.prog_tokens[name], in_vars_only, self.in_lean)
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

    def emit(self):
        """Write the program def (once per word), the doc comment,
        and the theorem. Returns True when a theorem was emitted."""
        ln = self.ln
        if self.name not in self.prog_emitted:
            params = self.prog_lit_params.get(self.name, "")
            self.out_lines.append(f"def {ln}Prog{params} : List Tok := {self.progs[self.name]}")
            self.prog_emitted.add(self.name)
        # Prog defs for words named by single-word literal bodies
        # (v30): they have no effect of their own, so their Prog
        # def is not emitted above, but this theorem's lookup
        # hypothesis names them and its proof's simp set unfolds
        # them. (A word that does have an effect emits its own Prog
        # def when its effect is processed; the guard skips it here
        # if that already happened.)
        for w in getattr(self, "runq_lit_words", []):
            if w not in self.prog_emitted:
                wln = lean_name(w)
                wparams = self.prog_lit_params.get(w, "")
                self.out_lines.append(f"def {wln}Prog{wparams} : List Tok := {self.progs[w]}")
                self.prog_emitted.add(w)
        # Rest def for the compose path (v34): the program after
        # the first eval's body (e.g. biRest1), referenced by the
        # theorem's `have` steps. Guarded like the Prog defs (a
        # second effect on the same word reuses it).
        if getattr(self, "is_runq_compose", False):
            rname = self.runq_compose_rest_name
            if rname not in self.prog_emitted:
                self.out_lines.append(
                    f"def {rname} : List Tok := {self.runq_compose_rest_lean}")
                self.prog_emitted.add(rname)
        # Doc comment uses the sanitised name: a raw `--` right after
        # `/-- ` breaks Lean's comment lexer (verified with a minimal
        # file). The effect text itself, after some text, is fine.
        # The doc comment keeps the original effect text, including
        # any `{...}` note (the note is stripped for parsing, not
        # for documentation). The `-- src:` marker above it is the
        # traceability link: it names the .ff file and line the
        # statement came from, so a Lean error at this theorem can
        # be mapped back (check.py reads it).
        self.out_lines.append(f"-- src: {self.src_path}:{self.src_line} {self.src_effect}")
        self.out_lines.append(f"/-- {ln}: @effect {self.effect_body} -/")
        if self.name == "exit":
            return _emit_exit(self)
        if self.name == "rand":
            return _emit_rand(self)
        if self.name == "clock":
            return _emit_clock(self)
        if self.name == "getc":
            return _emit_getc(self)
        if getattr(self, "is_quot", False):
            if self.quot_kind == "eval":
                return _emit_eval(self)
            if self.quot_kind == "cons":
                return _emit_cons(self)
            if self.quot_kind == "?":
                return _emit_cond(self)
        if getattr(self, "is_runq", False):
            return _emit_runq(self)
        if getattr(self, "is_runq_cond", False):
            return _emit_runq_cond(self)
        if getattr(self, "is_runq_direct", False):
            return _emit_runq_direct(self)
        if getattr(self, "is_runq_between", False):
            return _emit_runq_between(self)
        if getattr(self, "is_runq_compose", False):
            return _emit_runq_compose(self)
        if getattr(self, "is_runq_computed_flag", False):
            return _emit_runq_computed_flag(self)
        if self.is_error:
            return _emit_error(self)
        if self.where_eqs is not None:
            return _emit_where(self)
        return _emit_normal(self)


def _emit_quot_theorem(ctx, binders, hyps):
    """Shared tail for the quotation theorems: the header, the
    execQ conclusion, and the proof. `binders` is the binder
    string (starting with a space); each hypothesis becomes a
    `→` line before the conclusion. (v28: the theorems are
    queue-polymorphic — they use `execQ` with a queue variable
    `qq` instead of `runQ` with an empty queue — so a body can
    be run with a non-empty queue, which is what composition
    inside a word like `slip` (which stashes on the queue) needs.
    The old `runQ` form is the `qq = []` special case.)"""
    hyps_part = "".join(f"\n    {h} →" for h in hyps)
    ctx.out_lines.append(
        f"theorem {ctx.ln}_effect{ctx.suffix}{binders} :{hyps_part}")
    ctx.out_lines.append(
        f"    execQ (fuel + 1) {ctx.ln}Prog {ctx.quot_in_stack} qq [] [] [] defs = "
        f"(Outcome.ok {ctx.quot_out_stack} qq [], {ctx.quot_defs_prime}) := by")
    if ctx.quot_intro is not None:
        ctx.out_lines.append(f"  {ctx.quot_intro}")
    ctx.out_lines.append(f"  {ctx.quot_simp}")
    if ctx.quot_finish is not None:
        ctx.out_lines.append(f"  {ctx.quot_finish}")
    return True


def _emit_eval(ctx):
    """`eval` runs the body of a quotation: the theorem is
    conditional on the body having the stated effect (the
    hypothesis `execQ fuel body r qq ... = ok s qq`) and on the lookup
    (`lookup defs q = some body`). Fuel is universally
    quantified; the dispatch uses `fuel + 1`, the body `fuel`.
    The queue `qq` is universally quantified (v28) so the
    theorem can be used when the queue is non-empty."""
    binders = (f" (defs : Defs) ({ctx.quot_q} : Int) "
               f"({ctx.quot_body} : List Tok) "
               f"({ctx.quot_in_rest} {ctx.quot_out_rest} : Stack) "
               f"(defs' : Defs) (fuel : Nat) (qq : Stack)")
    return _emit_quot_theorem(ctx, binders, ctx.quot_hyps)


def _emit_cons(ctx):
    """`cons` builds a fresh quotation: the output top is the
    fresh code `defs.length`, and the table gains the body
    `[push a, call B]`. No hypotheses -- one step, no body to
    run."""
    binders = (f" (defs : Defs) ({ctx.quot_a} {ctx.quot_b} : Int) "
               f"({ctx.quot_in_rest} : Stack) (fuel : Nat) (qq : Stack)")
    return _emit_quot_theorem(ctx, binders, ctx.quot_hyps)


def _emit_cond(ctx):
    """`?` runs the quotation when the flag is non-zero, and
    discards it when the flag is zero. The run case is
    conditional on the body (like eval); the discard case only
    needs the flag hypothesis."""
    if ctx.quot_out_rest != ctx.quot_in_rest:
        binders = (f" (defs : Defs) ({ctx.quot_q} : Int) "
                   f"({ctx.quot_body} : List Tok) "
                   f"({ctx.quot_flag} : Int) "
                   f"({ctx.quot_in_rest} {ctx.quot_out_rest} : Stack) "
                   f"(defs' : Defs) (fuel : Nat) (qq : Stack)")
    else:
        binders = (f" (defs : Defs) ({ctx.quot_q} : Int) "
                   f"({ctx.quot_flag} : Int) "
                   f"({ctx.quot_in_rest} : Stack) (fuel : Nat) (qq : Stack)")
    return _emit_quot_theorem(ctx, binders, ctx.quot_hyps)


def _emit_runq(ctx):
    """A defined word containing `eval` (Phase 6): the theorem is
    a runQ theorem, conditional on the quotation's lookup and on
    the body's effect (with the queue at dispatch time), proved
    by `execQ_append` joining the body and the suffix."""
    hyps_part = "".join(f"\n    {h} →" for h in ctx.runq_hyps)
    ctx.out_lines.append(
        f"theorem {ctx.ln}_effect{ctx.suffix}{ctx.runq_binders} :{hyps_part}")
    # The stacks are parenthesised: `::` binds less tightly
    # than function application. The program application is
    # parenthesised too: `sipdProg lit0` as an argument to execQ
    # must read as one program, not as `sipdProg` followed by a
    # separate `lit0` argument.
    ctx.out_lines.append(
        f"    execQ {ctx.runq_total_fuel} ({ctx.runq_prog_app}) ({ctx.runq_in_stack}) qq [] [] [] defs = "
        f"(Outcome.ok ({ctx.runq_out_stack}) qq [], defs') := by")
    ctx.out_lines.append(f"  {ctx.runq_intro}")
    ctx.out_lines.extend(ctx.runq_proof)
    return True


def _emit_runq_cond(ctx):
    """A defined word containing `?` (Phase 6, v31): the theorem
    is a runQ theorem with a FIXED fuel (no fuel binder, no body
    hypothesis), proved by a case split on the flag and pure
    simp. The output is the direct form (the where equations
    substituted in)."""
    hyps_part = "".join(f"\n    {h} →" for h in ctx.runq_cond_hyps)
    ctx.out_lines.append(
        f"theorem {ctx.ln}_effect{ctx.suffix}{ctx.runq_cond_binders} :{hyps_part}")
    # The stacks and the program application are parenthesised:
    # `::` binds less tightly than function application, and
    # `sort2Prog lit0` as an argument to execQ must read as one
    # program, not as `sort2Prog` followed by a separate `lit0`
    # argument (as in _emit_runq).
    ctx.out_lines.append(
        f"    execQ {ctx.runq_cond_fuel} ({ctx.runq_prog_app}) ({ctx.runq_in_stack}) qq [] [] [] defs = "
        f"(Outcome.ok ({ctx.runq_out_stack}) qq [], defs) := by")
    if ctx.runq_cond_intro:
        ctx.out_lines.append(f"  {ctx.runq_cond_intro}")
    ctx.out_lines.extend(ctx.runq_cond_proof)
    return True


def _emit_runq_direct(ctx):
    """A defined word containing `?` and `eval` (Phase 6, v32):
    the theorem is a runQ theorem proved by direct simp -- the
    cond reduces via the literal lookup, the eval dispatch
    reduces via the quotation lookup to the body's hypothesis.
    The run case matches the hypothesis exactly; the discard
    case needs one extra fuel (the cond does not run the body),
    lifted by execQ_ok_mono."""
    hyps_part = "".join(f"\n    {h} →" for h in ctx.runq_direct_hyps)
    ctx.out_lines.append(
        f"theorem {ctx.ln}_effect{ctx.suffix}{ctx.runq_direct_binders} :{hyps_part}")
    # The stacks and the program application are parenthesised
    # (as in _emit_runq / _emit_runq_cond): `::` binds less
    # tightly than function application, and `branchProg lit0`
    # as an argument to execQ must read as one program.
    ctx.out_lines.append(
        f"    execQ {ctx.runq_direct_fuel} ({ctx.runq_prog_app}) ({ctx.runq_direct_in_stack}) qq [] [] [] defs = "
        f"(Outcome.ok ({ctx.runq_direct_out_stack}) qq [], defs') := by")
    ctx.out_lines.append(f"  {ctx.runq_direct_intro}")
    ctx.out_lines.extend(ctx.runq_direct_proof)
    return True


def _emit_runq_between(ctx):
    """A defined word that runs a literal [W] via eval, where W
    itself contains one `?` (Phase 6, v33): the theorem is a runQ
    theorem with a FIXED fuel (no fuel binder, no body
    hypothesis), proved by direct simp with a trichotomy case
    split on the `?`'s computed flag. The output is the direct
    form (the where right-hand side substituted in)."""
    hyps_part = "".join(f"\n    {h} →" for h in ctx.runq_between_hyps)
    ctx.out_lines.append(
        f"theorem {ctx.ln}_effect{ctx.suffix}{ctx.runq_between_binders} :{hyps_part}")
    # The stacks and the program application are parenthesised
    # (as in _emit_runq_cond): `::` binds less tightly than
    # function application, and `betweenProg lit0 lit1` as an
    # argument to execQ must read as one program.
    ctx.out_lines.append(
        f"    execQ {ctx.runq_between_fuel} ({ctx.runq_prog_app}) ({ctx.runq_between_in_stack}) qq [] [] [] defs = "
        f"(Outcome.ok ({ctx.runq_between_out_stack}) qq [], defs) := by")
    if ctx.runq_between_intro:
        ctx.out_lines.append(f"  {ctx.runq_between_intro}")
    ctx.out_lines.extend(ctx.runq_between_proof)
    return True


def _emit_runq_compose(ctx):
    """A defined word with exactly two evals on variable
    quotations (Phase 6, v34): the theorem is a runQ theorem
    with two fuel binders (one per eval body) and body
    hypotheses universally quantified over the leftover
    input/oracle, proved by nested execQ_append (the general
    composer). Defs are unchanged. The Rest1 def (the program
    after the first eval's body) is emitted by emit()."""
    hyps_part = "".join(f"\n    {h} →" for h in ctx.runq_compose_hyps)
    ctx.out_lines.append(
        f"theorem {ctx.ln}_effect{ctx.suffix}{ctx.runq_compose_binders} :{hyps_part}")
    # The stacks and the program application are parenthesised
    # (as in _emit_runq): `::` binds less tightly than
    # function application, and `biProg lit0` as an argument
    # to execQ must read as one program.
    ctx.out_lines.append(
        f"    execQ {ctx.runq_compose_total_fuel} ({ctx.runq_prog_app}) ({ctx.runq_compose_in_stack}) qq [] [] [] defs = "
        f"(Outcome.ok ({ctx.runq_compose_out_stack}) qq [], defs) := by")
    ctx.out_lines.append(f"  {ctx.runq_compose_intro}")
    ctx.out_lines.extend(ctx.runq_compose_proof)
    return True


def _emit_runq_computed_flag(ctx):
    """The computed-flag path (v36): a defined word that runs a
    quotation B, then branches on B's single output value, one
    arm concrete and the other [eval] running C. The theorem's
    conclusion carries the `where` if-expression directly (no
    runQ rest); the proof is an execQ_append for B, a by_cases
    on the flag, and either a direct simp (concrete arm) or a
    second execQ_append for C. Defs are unchanged. The Rest1
    is an inline list, so no Rest def is emitted."""
    hyps_part = "".join(f"\n    {h} →" for h in ctx.runq_cf_hyps)
    ctx.out_lines.append(
        f"theorem {ctx.ln}_effect{ctx.suffix}{ctx.runq_cf_binders} :{hyps_part}")
    # The stacks and the program application are parenthesised
    # (as in _emit_runq): `::` binds less tightly than
    # function application, and `orElseProg lit0` as an argument
    # to execQ must read as one program.
    ctx.out_lines.append(
        f"    execQ {ctx.runq_cf_total_fuel} ({ctx.runq_prog_app}) ({ctx.runq_cf_in_stack}) qq [] [] [] defs = "
        f"(Outcome.ok ({ctx.runq_cf_out_stack}) qq [], defs) := by")
    ctx.out_lines.append(f"  {ctx.runq_cf_intro}")
    ctx.out_lines.extend(ctx.runq_cf_proof)
    return True


def _emit_exit(ctx):
    """`exit` halts with a code: the outcome is `Outcome.exit n []`,
    not `ok` and not `err`. The code is the top input (the last
    input variable)."""
    in_vars_only = _effect_vars(ctx.in_elems)
    top_var = in_vars_only[-1] if in_vars_only else None
    if top_var is None:
        return ctx.problem("exit needs an input (the exit code)")
    ctx.out_lines.append(
        f"theorem {ctx.ln}_effect{ctx.suffix}{ctx.binder_part}{ctx.rest_binder}{ctx.hw_binder} :")
    ctx.out_lines.append(
        f"    run {ctx.ln}Prog ({ctx.in_lean}) [] [] = Outcome.exit {top_var} [] := by")
    ctx.out_lines.append(f"  first | rfl | (simp [{ctx.simp_args}]; try omega)")
    return True


def _emit_rand(ctx):
    """`rand` pushes some `n` in `[0, max)` (for `max > 0`).
    It needs a `when` (the positive-max guard) and a `where` (the
    range); both are validated here, and the proof supplies the
    witness `o % max` (the oracle head modulo the max) and proves
    the range by the Int.emod lemmas. This is the only inequality
    `where` the generator proves (the general case is Phase 3)."""
    rand_bad = None
    if ctx.cond_lean is None:
        rand_bad = ("rand needs `when 0 < max`: the range is only "
                    "true for a positive max")
    elif ctx.rand_where_text is None:
        rand_bad = ("rand needs a where clause giving the range, "
                    "e.g. `where 0 <= n ∧ n < max`")
    out_var = None
    max_var = None
    range_prop = None
    if rand_bad is None:
        # The output is a single variable; the input is a
        # single variable (the max).
        out_only = [e for e in ctx.out_vars if e not in ("...", "∅")]
        in_only = [e for e in ctx.in_vars if e not in ("...", "∅")]
        if len(out_only) != 1 or len(in_only) != 1:
            rand_bad = ("rand takes exactly one input (the max) and "
                        "pushes exactly one output")
        else:
            out_var, max_var = out_only[0], in_only[0]
            parts = [p.strip() for p in ctx.rand_where_text.split("∧")]
            if len(parts) != 2:
                rand_bad = ("rand's where clause must be a range of the form "
                            "`0 <= n ∧ n < max`")
            else:
                m1 = re.fullmatch(r"0\s*<=\s*([A-Za-z_][A-Za-z0-9_]*)", parts[0])
                m2 = re.fullmatch(
                    r"([A-Za-z_][A-Za-z0-9_]*)\s*<\s*([A-Za-z_][A-Za-z0-9_]*)",
                    parts[1])
                if (not m1 or m1.group(1) != out_var
                        or not m2 or m2.group(1) != out_var
                        or m2.group(2) != max_var):
                    rand_bad = ("rand's where clause must be a range of the form "
                                f"`0 <= {out_var} ∧ {out_var} < {max_var}`")
                else:
                    try:
                        range_prop = " ∧ ".join(
                            translate_expr(p) for p in parts)
                    except ExprError as ex:
                        rand_bad = f"cannot translate rand range: {ex}"
    if rand_bad is not None:
        return ctx.problem(rand_bad)
    # The range: `0 <= o % max` (Int.emod_nonneg) and
    # `o % max < max` (Int.emod_lt, via the absolute value).
    # Plain omega cannot prove `0 ≤ o % max` -- it treats the
    # modulo as opaque -- so the proof supplies the two bounds.
    ctx.out_lines.append(
        f"theorem {ctx.ln}_effect{ctx.suffix}{ctx.binder_part}{ctx.rest_binder}"
        f"{ctx.oracle_binder}{ctx.hw_binder} :")
    ctx.out_lines.append(
        f"    ∃ {out_var}, ({range_prop}) ∧ "
        f"run {ctx.ln}Prog ({ctx.in_lean}) [] {ctx.oracle_arg} = "
        f"Outcome.ok ({out_var} :: {ctx.rest_name}) [] [] := by")
    ctx.out_lines.append(f"  have hne : {max_var} ≠ 0 := by omega")
    ctx.out_lines.append(
        f"  have hnonneg : 0 ≤ o % {max_var} := Int.emod_nonneg o hne")
    ctx.out_lines.append(f"  have hlt : o % {max_var} < {max_var} := by")
    ctx.out_lines.append(f"    have h := Int.emod_lt o hne")
    ctx.out_lines.append(
        f"    rwa [Int.natAbs_of_nonneg (by omega : 0 ≤ {max_var})] at h")
    ctx.out_lines.append(f"  refine ⟨o % {max_var}, ⟨hnonneg, hlt⟩, ?_⟩")
    ctx.out_lines.append(f"  first | rfl | (simp [{ctx.simp_args}]; try omega)")
    return True


def _emit_clock(ctx):
    """`clock` pushes the current time: some Int, with nothing else
    sayable about it. The witness is the oracle head `o`; the output
    variable is an existential, not a binder."""
    out_only = [e for e in ctx.out_vars if e not in ("...", "∅")]
    if len(out_only) != 1:
        return ctx.problem("clock pushes exactly one output")
    out_var = out_only[0]
    ctx.out_lines.append(
        f"theorem {ctx.ln}_effect{ctx.suffix}{ctx.rest_binder}{ctx.oracle_binder}{ctx.hw_binder} :")
    ctx.out_lines.append(
        f"    ∃ {out_var}, run {ctx.ln}Prog ({ctx.in_lean}) [] {ctx.oracle_arg} = "
        f"Outcome.ok ({out_var} :: rest) [] [] := by")
    ctx.out_lines.append(f"  refine ⟨o, ?_⟩")
    ctx.out_lines.append(f"  first | rfl | (simp [{ctx.simp_args}]; try omega)")
    return True


def _emit_getc(ctx):
    """`getc` reads one byte from the input stream and pushes it (EOF
    pushes 0). The output variable is the head of the input stream,
    so it is a binder (not an existential): the theorem says for any
    byte `n` at the front of the input stream and any tail `inp`,
    getc pushes `n`. The EOF case (empty input pushes 0) needs a way
    to say the input stream is empty, which the notation does not
    have yet. A `where` clause constrains the byte:
    `where 0 <= n ∧ n < 256` (or `n <= 255`) -- it becomes a
    hypothesis on the binder, not an existential, because `n` is the
    input-stream head."""
    out_only = [e for e in ctx.out_vars if e not in ("...", "∅")]
    if len(out_only) != 1:
        return ctx.problem("getc pushes exactly one output")
    out_var = out_only[0]
    getc_hw = ""
    getc_simp = ctx.simp_args
    if ctx.getc_where_text is not None:
        parts = [p.strip() for p in ctx.getc_where_text.split("∧")]
        range_ok = False
        if len(parts) == 2:
            m1 = re.fullmatch(r"0\s*<=\s*([A-Za-z_][A-Za-z0-9_]*)", parts[0])
            m2 = re.fullmatch(
                r"([A-Za-z_][A-Za-z0-9_]*)\s*<\s*256", parts[1])
            m2b = re.fullmatch(
                r"([A-Za-z_][A-Za-z0-9_]*)\s*<=\s*255", parts[1])
            if (m1 and m1.group(1) == out_var
                    and ((m2 and m2.group(1) == out_var)
                         or (m2b and m2b.group(1) == out_var))):
                range_ok = True
        if not range_ok:
            return ctx.problem(
                f"getc's where clause must be the byte range "
                f"`0 <= {out_var} ∧ {out_var} < 256` (or `<= 255`)")
        try:
            range_prop = " ∧ ".join(
                translate_expr(p) for p in parts)
        except ExprError as ex:
            return ctx.problem(f"cannot translate getc range: {ex}")
        getc_hw = f" (_hbyte : {range_prop})"
        getc_simp = ctx.simp_args
    ctx.out_lines.append(
        f"theorem {ctx.ln}_effect{ctx.suffix}{ctx.binder_part}{ctx.rest_binder} (inp : In){getc_hw}{ctx.hw_binder} :")
    ctx.out_lines.append(
        f"    run {ctx.ln}Prog ({ctx.in_lean}) ({out_var} :: inp) [] = "
        f"Outcome.ok ({out_var} :: {ctx.rest_name}) [] [] := by")
    ctx.out_lines.append(f"  first | rfl | (simp [{getc_simp}]; try omega)")
    return True


def _emit_error(ctx):
    """An error effect: the word fails (`run ... = Outcome.err`)."""
    ctx.out_lines.append(f"theorem {ctx.ln}_effect{ctx.suffix}{ctx.binder_part}{ctx.rest_binder}{ctx.hw_binder} :")
    ctx.out_lines.append(f"    run {ctx.ln}Prog ({ctx.in_lean}) [] [] = Outcome.err := by")
    ctx.out_lines.append(f"  first | rfl | (simp [{ctx.simp_args}]; try omega)")
    return True


def _emit_where(ctx):
    """A `where` effect is an existential: the output variables it
    constrains are bound by `∃`, and the where property (a
    conjunction of `var = witness` equations) goes before the exec
    equation. The proof supplies the witnesses, proves the where
    property by `rfl` (each equation becomes `witness = witness`
    after substitution), and leaves the exec equation to the ladder."""
    out_lean = lean_list_bottom_to_top(
        ctx.out_vars, ctx.rest_name if ctx.out_rest else None)
    where_prop = " ∧ ".join(
        f"({lhs} = {w})" for (lhs, _), w in zip(ctx.where_eqs, ctx.witnesses))
    where_proof = ("rfl" if len(ctx.where_eqs) == 1
                   else "⟨" + ", ".join(["rfl"] * len(ctx.where_eqs)) + "⟩")
    ctx.out_lines.append(f"theorem {ctx.ln}_effect{ctx.suffix}{ctx.binder_part}{ctx.rest_binder}{ctx.hw_binder} :")
    ctx.out_lines.append(
        f"    ∃ {' '.join(ctx.existential)}, ({where_prop}) ∧ "
        f"run {ctx.ln}Prog ({ctx.in_lean}) [] {ctx.oracle_arg} = "
        f"Outcome.ok ({out_lean}) [] {ctx.trace} := by")
    if ctx.hguard_line is not None:
        ctx.out_lines.append(ctx.hguard_line)
    ctx.out_lines.append(
        f"  refine ⟨{', '.join(ctx.witnesses)}, {where_proof}, ?_⟩")
    ctx.out_lines.append(f"  first | rfl | (simp [{ctx.simp_args}]; try omega)")
    return True


def _emit_normal(ctx):
    """The ordinary case: `run ... = Outcome.ok (...)`."""
    out_lean = lean_list_bottom_to_top(
        ctx.out_vars, ctx.rest_name if ctx.out_rest else None)
    ctx.out_lines.append(f"theorem {ctx.ln}_effect{ctx.suffix}{ctx.binder_part}{ctx.rest_binder}{ctx.hw_binder} :")
    ctx.out_lines.append(
        f"    run {ctx.ln}Prog ({ctx.in_lean}) [] {ctx.oracle_arg} = "
        f"Outcome.ok ({out_lean}) [] {ctx.trace} := by")
    if ctx.hguard_line is not None:
        ctx.out_lines.append(ctx.hguard_line)
    ctx.out_lines.append(f"  first | rfl | (simp [{ctx.simp_args}]; try omega)")
    return True


def main():
    src_path, out_path = parse_args(sys.argv)
    text = src_path.read_text()
    effects_list, text2 = extract_effects(text)
    defs = parse_definitions(text2)

    # Attach @effect comments to words by the word named in the
    # effect itself: the last token before '==', in postfix
    # position, exactly as typed -- or an explicit `word:` prefix.
    # No definition is required: a primitive word stands alone,
    # a defined word is looked up by name anywhere in the file.
    # Several effects for the same word are kept, in file order.
    # Output lines and problems are initialised here (before the
    # effect-attachment loop) so a malformed @effect can be
    # recorded as a problem comment without crashing the run.
    out_lines = [LEAN_PREAMBLE.replace("{src}", src_path.name)]
    problems = []
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
        m = re.match(r"^([^\s:]+):\s+(.*)$", e)
        if m:
            word, body = m.group(1), m.group(2)
        else:
            body = e
            left = body.split("==", 1)[0].split()
            if not left:
                raise ValueError(f"@effect has no inputs and no word: {e!r}")
            word = left[-1]
        # A malformed effect (unclosed `{`, stray `}`, missing
        # `==`) is a clean problem, not a crash: it is recorded
        # here and reported with the rest, so one bad effect does
        # not lose the whole file.
        try:
            parsed = parse_effect(body, word=word)
        except ValueError as ex:
            problems.append(f"{word}: {ex}")
            out_lines.append(f"-- {lean_name(word)}: no theorem emitted (src {src_path}:{src_line}): {ex}")
            out_lines.append("")
            continue
        effects.setdefault(word, []).append(parsed)
        effect_text.setdefault(word, []).append(body)
        effect_line.setdefault(word, []).append(src_line)
        effect_full.setdefault(word, []).append(e)


    # One entry per effect, in file order; a word's effects share
    # its program, computed once (below) and cached in `progs`.
    # An `else ERROR` effect expands into two entries BEFORE
    # numbering, so the two theorems are numbered `_1`/`_2` in
    # order: the success case with `when <cond>`, and the error
    # case (`== ERROR`) with `when` the negated condition. The
    # error entry's `where` is dropped (there is no output to
    # constrain); its doc comment marks it as the else branch.
    entries = []
    for name in effects:
        expanded = []
        for idx, (in_elems, out_elems, cond, where_text, else_error) in enumerate(effects[name]):
            body = effect_text[name][idx]
            src_line = effect_line[name][idx]
            full = effect_full[name][idx]
            if else_error:
                expanded.append((in_elems, out_elems, cond, where_text, body, src_line, full))
                try:
                    neg = negate_cond(cond)
                except ExprError:
                    # Unparseable condition: fall back to `¬ (cond)`
                    # and let the main loop report it as a problem
                    # for the error effect (the success effect's own
                    # translation fails the same way).
                    neg = f"¬ ({cond})"
                expanded.append((in_elems, ["ERROR"], neg, None, body + " [else ERROR]", src_line, full + " [else ERROR]"))
            else:
                expanded.append((in_elems, out_elems, cond, where_text, body, src_line, full))
        for idx, (in_elems, out_elems, cond, where_text, body, src_line, full) in enumerate(expanded):
            entries.append((name, idx, len(expanded), in_elems,
                            out_elems, cond, where_text, body, src_line, full))
    emitted = 0
    progs = {}
    prog_tokens = {}  # word -> raw token list (for the trace / oracle checks)
    prog_lits = {}  # word -> literal-body programs (v30)
    prog_raw_lits = {}  # word -> raw inner-token lists, parallel to prog_lits (v30)
    prog_lit_params = {}  # word -> " (lit0 lit1 : Int)" or "" (v30)
    failed = set()
    prog_emitted = set()
    for name, idx, n_effects, in_elems, out_elems, cond, where_text, effect_body, src_line, src_effect in entries:
        ctx = EmitCtx(name=name, idx=idx, n_effects=n_effects,
                      in_elems=in_elems, out_elems=out_elems, cond=cond,
                      where_text=where_text, effect_body=effect_body,
                      src_line=src_line, src_path=str(src_path),
                      src_effect=src_effect,
                      defs=defs, progs=progs, prog_tokens=prog_tokens,
                      prog_lits=prog_lits, prog_raw_lits=prog_raw_lits,
                      prog_lit_params=prog_lit_params,
                      failed=failed, prog_emitted=prog_emitted,
                      out_lines=out_lines, problems=problems)
        if not ctx.prepare():
            continue
        if ctx.emit():
            out_lines.append('')
            emitted += 1

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
