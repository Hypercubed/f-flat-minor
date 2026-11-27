# generate.py — help

This is the generator manual (the module docstring, moved here).
For the user-facing guide, see README.md. For the design and
phases, see PLAN.md.

Generate Lean proofs from an .ff file with @effect comments.

Usage:  python3 generate.py in.ff [out.lean]
        python3 generate.py in.ff | lean --stdin

If out.lean is omitted (or `-`), the Lean goes to stdout, so it
can be piped straight to the `lean` CLI or saved independently.

The generator is a pure translator: it parses, inlines, and emits
Lean. It runs no tests and has no interpreter of its own — testing
belongs to the interpreters and the unit tests, which can run
anywhere. (Nov 18, 2026 decision; the Nov 17 prototype had a
Python mirror interpreter that concrete-checked each effect first
and refused to emit a theorem on failure. That is gone: a wrong
effect now produces a theorem that Lean fails to prove, and the
failure is ambiguous — wrong effect, or true effect with a proof
too hard for the ladder. See PLAN.md §4 for the tradeoff and the
`#eval` option that would put the check back into the generated
Lean instead of the generator.)

Scope (prototype, deliberately small):
  * Input is one .ff file with `/* @effect <in> == <out> */`
    comments. An effect names its word in postfix position,
    exactly as typed (`A B C rot == C B A`), or outside the
    effect as a `word:` prefix (v20, Nov 20, 2026:
    `/* @effect dup: A == A A */`); the generator attaches it
    by that name -- a definition is not required.
    If the word is a primitive (nop, clr, dup, swap, drop, q<, q>, +, -, *, /, %, &, depth, <, =, >, |, ~, ^,
    putc, putn, ., exit, rand, clock),
    the program is that one token, so a bare effect is enough:
    `/* @effect A dup == A A */` proves dup with no definition.
    If the word is defined in the file, its body is inlined.
    A word may have several `@effect` comments, one per case;
    each becomes a theorem, named `<word>_effect_1`,
    `<word>_effect_2`, ... in file order (a single effect is
    just `<word>_effect`, as before). The program is shared.
    An effect whose whole output is `ERROR` states that the
    word fails: `/* @effect A B % == ERROR when B == 0 */`
    becomes `run ... = Outcome.err` (and `ERROR` must be the whole
    output -- it is never a stack value).
  * An effect may carry a `{...}` note after the output:
    `/* @effect N putc == { prints char(N) } */`. It is a human
    note (the readable form of a Lean comment: `{` is `/--`,
    `}` is `-/`), NOT parsed: the generator strips it before
    parsing, so `{}` / `{IO}` / `{prints char(n)}` / `{blah
    blah}` / no note all produce the same theorem, and a wrong
    note is not caught. The note is preserved in the doc
    comment above the theorem, for documentation. An unclosed
    `{` or a stray `}` is a clean problem.
  * IO words (v16): Lean says a word has an IO effect by putting
    it in the type -- the interpreter returns an action trace
    (`IOAction`: `putc` / `putn` / `print`) and an `Outcome`
    (`ok` / `err` / `exit`), and nondeterministic words draw
    from an oracle stream so `exec` stays a function. Theorems
    are stated with `run` (empty queue, input, oracle, trace)
    and `Outcome.ok` / `Outcome.err` / `Outcome.exit`, not
    `exec` / `some` / `none`. `putc` / `putn` / `.` record one
    action; `exit` halts with a code (`Outcome.exit n []`) and
    short-circuits the rest of the program; `rand` pushes some
    `n` in `[0, max)` (for `max > 0`, so it needs `when 0 < max`
    and `where 0 <= n ∧ n < max` -- the only inequality `where`
    the generator proves, with witness `o % max` and the
    Int.emod lemmas; the general inequality case is Phase 3);
    `clock` pushes some `t` (witness: the oracle head `o`).
    `getc` reads one byte from the input stream and pushes it
    (EOF pushes 0): its theorem binds the input-stream head as
    the output variable and the tail as `(inp : In)`, so it is
    `run getcProg (rest) (n :: inp) [] = Outcome.ok (n :: rest)
    [] []`. The EOF case (empty input pushes 0) needs a way to
    say the input stream is empty, which the notation does not
    have yet. A defined word that inlines an IO token is refused
    -- the trace for a composed IO word is not computed yet, so
    only a bare effect on the IO primitive itself works.
  * Stack effects are written in typed order: bottom-to-top,
    top rightmost, exactly as you type the program.
    Example:  /* @effect A B C rot == C B A */
  * The rest of the stack is implied by default (preserved):
    `A dup == A A` means the rest is there underneath,
    unchanged -- you do not need to write it. `...` (or `…`)
    at the far left makes it explicit. `∅` at the far left
    means no rest on that side ("the stack is exactly this").
    A named rest `..R` at the far left (v20) names the rest
    list `r`, so an output can refer to it:
    `/* @effect depth: ..R == ..R R.length */`. The name must
    be the same on both sides when it appears on both. Since
    v37 the rest may sit anywhere in the output (`..R A == A
    ..R` emits `R ++ [A]`), and a list-valued call may be
    spliced onto it (`..R0 intRange(A,B+1)` emits
    `intRange A (B+1) ++ R0`). For loop trajectories,
    `iterates(F,N,A)` is surface sugar for
    `SpecHist2 F N.toNat A <rest>`: it takes three arguments
    (function value `F`, Int counter `N`, and Int seed `A`), with
    no spaces after commas (same convention as `intRange(A,B+1)`).
    The generator automatically applies `.toNat` to `N` and
    mechanically threads the effect's named rest (`R0` in practice)
    as the fourth argument, splicing directly without appending a
    duplicate rest.
    The output rest is preserved unless the input explicitly
    wrote `...` (or `..R`) without the output doing so -- that is a
    whole-stack word (clr, sum!): the rest goes in and does
    not come back out. So `… clr ==` and `clr == ∅` mean the
    same thing: the stack ends up exactly empty.
  * Body tokens supported: integers, nop clr dup swap drop q< q> + - * / % & depth < = > | ~ ^ << >> putc putn . exit rand clock getc,
    and calls to other words defined in the same file.
  * Shifts (v17): `<<` and `>>` are the JS BigInt shifts. A
    NEGATIVE count does NOT throw -- it reverses direction
    (`5 << -1 = 2`, `5 >> -1 = 10`), so there is no guard and
    no `when` is needed; the helpers `shl` / `shr` reverse
    instead (`shl a b = if 0 ≤ b then a * 2^b.toNat else
    a >>> (-b).toNat`; `shr` the mirror image). `>>>` is Lean's
    arithmetic shift right (Int, Nat count); `<<<` does not
    exist for Int, so `<<` is multiplication. In an output
    expression, `<<` / `>>` become `shl` / `shr`.
  * Recursive words are supported (v37): a word that reaches
    itself through the call graph is not inlined forever — the
    call boundary stays opaque as `Tok.call self_<word>` with
    `(self_<word> : Int)` and `lookup defs` hypotheses, and the
    proof composes the callee's proven effect lemma at that
    boundary. Callers reaching a recursive word work the same
    way (their `Prog` takes the callee's `self_*` params, and
    `fbm_verify` applies the callee lemma where the `Tok.call`
    peels). A directly self-recursive word needs `@by-proof`
    or `@by-induction` — `fbm_verify` alone cannot do
    induction. Mutual recursion is refused.
  * Output elements are either variables or Lean Int expressions
    in the input variables, written without spaces, e.g. `n-1`,
    `a*b`, `min(a,b)`. (Spaces separate stack elements, so an
    expression with spaces would be read as several elements.)
    Two operators mean F♭m's operators, not Lean's, and are
    translated: `%` is truncating mod (sign follows the
    dividend; Lean's `%` is Euclidean) and becomes the `tmod`
    helper, `&` is bitwise and (Lean core has no Int `&`) and
    becomes the `land` helper. `!=` becomes `≠`, `==` becomes
    `=` (Lean's `!=`/`==` are boolean, not propositions).
    Since v23 every bitwise/shift/power operation has three
    spellings — the F♭m symbol, Lean's operator, and the f()
    form — all emitting the same helper: `&` / `&&&` /
    `land(a,b)` → `land`; `|` / `|||` / `lor(a,b)` → `lor`;
    `⊕` / `^^^` / `xor(a,b)` → `xor`; `~` / `~~~` / `lnot(a)`
    → `lnot`; `<<` / `<<<` / `shl(a,b)` → `shl`; `>>` /
    `>>>` / `shr(a,b)` → `shr`; `^` / `pow(a,b)` → power.
    `and(a,b)` / `or(a,b)` are not available (Lean core's Bool
    `and`/`or` make bare `and`/`or` ambiguous). An f() call in
    a direct output takes no space after the comma
    (`land(a,b)`); in an `ensures` clause spaces are fine.

    Comparison-coercion sugar: any whole output element whose
    top-level operator is a comparison (`=`, `==`, `!=`, `<`,
    `<=`, `>`, `>=`, written without spaces) automatically
    coerces to `(if <cond> then 1 else 0)` inline in the
    postcondition, with no existential or `ensures` clause
    needed. For example, `/* @effect empty?: ..R == ..R #R=0 */`
    is sugar for `/* @effect empty?: ..R == ..R F ensures F =
    if #R = 0 then 1 else 0 */`, `/* @effect zero?: N == N=0 */`
    for `N == F ensures F = if N = 0 then 1 else 0`, and
    `/* @effect <: A B == A<B */` for `A B == F ensures F = if
    A<B then 1 else 0`. Scope limits: coercion applies ONLY to
    whole output elements whose top AST node is one of those
    seven comparisons — nested comparisons inside larger
    expressions (e.g. `(#R=0)+1`, `A<B<C`) stay in `Prop`
    position and surface as Lean type errors; logical operators
    (`∧`, `∨`, `¬`) are never coerced; `requires` / `when`
    conditions stay propositions; and the explicit `ensures` /
    `where` form continues to work unchanged.
    Quotations (v24): a quotation slot is written in brackets.
    `[..R -- ..S]` is a pointer whose body has effect
    `[..R -- ..S]`; `[B]` is a plain quotation variable; `[a B]`
    is cons's output (a quotation built from value `a` and
    quotation `B`). A functional slot `[X -- F X]` (v37) is a
    quotation whose body maps `X :: R` to `(F X) :: X :: R`:
    the theorem binds `(F : Int → Int)` and the body's
    universally-quantified contract (so it is `apply`able,
    unlike an assumption). There is no `Val` type — the stack stays
    `List Int`, and the model gains a `userDefs` table plus a
    fuelled, defs-aware interpreter (`execQ` / `runQ`) alongside the
    ordinary `run`. `eval` and the `?` run case are conditional
    on the body (the theorem takes `lookup defs q = some body`
    and `execQ fuel body r qq ... = ok s qq` as hypotheses, with
    the queue `qq` universally quantified since v28 so the theorem
    can be used when the queue is non-empty); `cons`
    states the fresh code and the new table entry directly.
    `?` takes ONE quotation plus a flag (the runtime's `IF`):
    `..R F [..R -- ..S] == ..S requires F != 0` runs it,
    `..R F [..R -- ..S] == ..R requires F == 0` discards it.
    Quotation composition (v29, Phase 6; literals v30; `?` v31; direct-simp v32; nested literal v33; general composer v34): a defined word
    whose inlined program contains `eval` gets a runQ theorem
    (execQ with a queue variable `qq`), proved by
    `execQ_append` joining the body's effect and the suffix
    after `eval`; the preamble carries `execQ_ok_mono` and
    `execQ_append` for this. Fuel is `fuel + len(prefix) +
    len(suffix) + 2`. Only one `eval`; `cons` in a defined
    word, a `where`/`when` clause (for `eval` words), more than one `eval`, and a
    literal naming a word that itself contains a literal are
    clean problems. A quotation literal (`[X]`) run by a single
    `eval` works since v30: the literal is a code variable with
    a `lookup` hypothesis, and the simulator expands it at its
    `eval`. A single `?` (cond) works since v31: the proof
    case-splits on the flag (a bare variable, or the condition
    inside a computed flag like `A > B`), the output is the
    direct `where`-substituted form, and the fuel is fixed.
    A word with one `?` and one `eval` (the `?` running a
    concrete literal, the `eval` last on a variable
    quotation) works since v32 by direct simp: inline
    everything, let `simp` reduce the program, close with
    the body's effect (the discard case needs an
    `execQ_ok_mono` lift). A word with one literal `[W]`
    where W itself contains a `?` works since v33 by
    direct simp with a trichotomy case split on the
    computed flag vs the where-clause outer condition;
    fuel is fixed (`len(outer) + len(W) + len(cond
    body)`). A word with two evals on variable
    quotations works since v34 by nested `execQ_append`
    (the general composer): the program is split at each
    eval, each body becomes a separate `p1`, the remainder
    is `p2`, proven by a nested application; body effects
    are universally quantified over input/oracle, and
    `defs` is unchanged. Since v35 the composer is
    prefix-aware: the stack at an eval dispatch need not
    equal the slot's input side — it must END with it,
    and the elements below are a prefix the body
    preserves (its output is prefix + the output value);
    a literal whose body contains an `eval` and/or a
    nested literal also works (the literal is expanded
    recursively and the inner eval counts as one of the
    composer's evals). A word whose program runs a
    quotation B and then case-splits on B's RESULT
    (a computed flag) works since v36: the proof runs
    B by `execQ_append`, `by_cases` on the flag, and
    takes the concrete arm by direct simp or the `[eval]`
    arm by a second append + mono lift. This needs a
    SINGLE-VALUE quotation slot `[..R A -- B]` — a
    bare uppercase value (not a rest) naming the one
    value the quotation produces, in scope for the
    `ensures` clause; other cases are undefined
    behavior (the theorem is silent). `slip`, `dip`, `run`, `sip`,
    `sipd`, `dipd`, `sort2`, `choose`, `branch`, `between?`, `bi`, `bi2`, `or_else`, `and_also` now prove
    as `@effect` in core.ff (45 theorems — all non-recursive core words).
    An output expression may refer to `<name>.length` — the
    length of the named rest `..name`:
    `/* @effect depth: ..R == ..R #R */`. `#R` is shorthand for
    `R.length` (v27, Nov 21, 2026); both spellings emit
    `(R.length : Int)`. The rest list
    is bound as `(<name> : Stack)`; a `.length` base (or the
    name after `#`) must be
    that name, and `length` after a `.` is a field name, not a
    variable. The old `rest.length` spelling is dropped (v20):
    the anonymous rest has no name to write, so `rest` and
    `rest.length` are clean problems now — name the rest with
    `..R` and use `#R` (or `R.length`). Any other `.` form is rejected.
  * An effect may carry a `when` condition on its inputs
    (`requires` in the new syntax, v20 — the two spellings are
    aliases):
    `/* @effect A B % == A%B when B != 0 */`. It becomes A
    hypothesis `(hw : ...)` in the theorem (the name `hw` is
    reserved), and the proof ladder passes it to `simp`, which
    is what discharges the div-by-zero guard in the `%` step.
    `%` needs its `when`: the engine throws on division by
    zero, so the effect is only true when `b != 0`. A `when`
    may end in `else ERROR` (`/* @effect A B ^ == A^B when
    0 <= b else ERROR */`): the word fails when the condition
    does NOT hold. It desugars into two theorems (success with
    `when <cond>`, error with `when` the negated condition,
    `b < 0` from `0 <= b`), numbered `_1`/`_2` in order.
    `else` with anything but `ERROR` is not supported.
  * An effect may carry a `where` clause on its outputs
    (`ensures` in the new syntax, v20 — the two spellings are
    aliases):
    `/* @effect depth: ..R == ..R N ensures N = #R */`.
    Only equations `var = expr` are supported (the equational
    case): the variable becomes an existential (`∃ n`), the
    expression is its witness, and the theorem is
    `∃ n, (n = <expr>) ∧ exec ... = some (...)`. Several
    equations join with `∧` (`where n = b ∧ m = a`), one
    witness and one `rfl` per equation. Each witness may only
    mention the inputs (and the named rest, as `<name>.length`); a `where` cannot constrain
    an input variable (that is what `when` is for), and every
    output variable not in the inputs must be constrained by
    the `where` clause. Inequalities (e.g. isqrt's
    `r^2 <= n ∧ n < (r+1)^2`) are not supported yet -- there
    is no witness to supply, so that is the full Phase 3.

What the generator does:
  1. Parses definitions and @effect comments.
  2. For each effect, finds the program: a primitive is its own
     single token; a defined word is inlined (non-recursive only).
  3. Emits a Lean file: a fuel-free interpreter
     (recursion on the program list only, no fuel), the inlined
     program as data, and a theorem whose proof is tried as
     `rfl`, then `simp` with `run`, the program (and any `when`
     hypothesis) unfolded, then `omega` on whatever `simp`
     leaves. The ladder is `first | rfl | (simp [run, exec, step,
     <prog>, hw?{, hguard}]; try omega)`. The `try` is load-bearing:
     `simp` sometimes closes the goal outright, and a bare
     `omega` after that fails with "no goals to be solved".
     There is deliberately NO bare `simp` alternative: `first`
     takes the first tactic that does not fail, and a bare
     `simp` that leaves a goal (e.g. `n + 1 + 1 = n + 2` for a
     word computing `n+1+1` while the effect claims `n+2`)
     counts as success and shadows the `omega` alternative,
     leaving the theorem unproven. If Lean compiles it with
     no errors, that is the definite "yes". A guarded primitive
     (`%`, `^`) whose `when` is not the guard itself gets a
     `have hguard : ¬ <guard> := by omega` before the ladder
     (see GUARDS): simp cannot discharge an `if` that is the
     scrutinee of a `match` from a merely-equivalent hypothesis.
     Theorems are stated with `run` and `Outcome` (v16): the
     `run` in the simp set is what unfolds the `run` wrapper
     (without it, simp reports every argument unused and leaves
     the goal -- verified). The axioms baseline is now
     `[propext]` for every theorem (the `if` in the guarded
     steps pulls it into `exec`), with `rand` also depending
     on `Quot.sound` (from the `Int.emod` lemmas); no `sorryAx`.

Phase B emission (v34, Nov 22, 2026): defined words instead emit
a `Prog` composed with `++` over callee `Prog`s and a `Spec` /
`SpecErr` theorem proved by uniform `by fbm_verify [...]`
(`Fbm/Prover.lean`: `Spec` predicates, `Spec.*_head`
continuation lemmas, `fbm_verify` tactic). The old `run`-ladder
theorems above remain only for words touching
non-frame-polymorphic primitives (`clr`, `depth`, `.`, `getc`,
`rand`, `clock`, `exit`). Recursive words (v37) keep an opaque
`Tok.call` boundary and compose the callee's proven lemma;
self-recursive words need `@by-proof` or `@by-induction`
(below) since `fbm_verify` cannot do induction.

Generalized compositional boundary (v38): the inlining frontier is
now every ANNOTATED word, not just recursive ones — the
generalized frontier is computed once per run and every call to
an annotated callee emits a `calleeProg ... ++` reference in the
caller's `Prog` instead of flattening the callee (e.g.
`clampProg := digProg ++ maxProg lit0 ++ minProg lit1`: no `?`
at clamp's level; the `?`-prefix and literal threads of each
callee boundary are checked at the callee's own level). The
`Tok.call` path for recursive words is untouched, and
unannotated callees still inline. Last-resort conditional
splitting: when a full round makes zero progress on a `Prop`
goal whose statement carries `if`s from applied callee lemmas,
`fbm_verify` `by_cases`-splits one undecided `if` condition
(atomic per split, hypotheses named `hsplit`), then resumes the
round-robin — closer tactics (`simp_all`, `omega`, congr-closure)
get first crack at each branch. Depth cap 3 per branch: beyond
it the goal genuinely needs human tactics and fails clean as a
`needs @by-proof` problem naming the condition (prove it by
hand over the callee lemmas). The decided-check covers the
condition itself, its negation, comparison duals (`simp`
rewrites `¬(X < LO)` to `LO ≤ X` via `not_lt`, so duals are
compared too), and `Eq`/`Ne` pairs. The step fires only after
a zero-progress round, so proofs that close without it (all of
`sort2`/`between?`, `abs`, `clamp`) never observe it.

Proof clauses (v37, at the tail of an `@effect`, at most one of
the three; `sorry`/`admit`/`axiom` rejected up front):
`@by-proof <tactic>` replaces the `fbm_verify [...]` proof
with the given tactic body — an arithmetic bridge (`have` +
`fbm_verify`), an explicit normalisation (`simp_all`) before
it, or a hand-written induction. The `fbm_verify` dependency
list must then be written by hand (copy it from the
plain-emission output). `@by-induction <pattern>` generates an
induction skeleton with `fbm_verify` discharging base and step
goals: `N - 1` (strong induction on `N.toNat`, generalising the
queue, rest, and other inputs; needs nonneg — `when 0 <= N`)
or `R.length` (List induction on the rest). Anything else is a
clean problem. Single-line rule: `;` separates tactics, but a
`by <tac>` block absorbs a following `;` into itself —
parenthesise it (`:= (by omega); fbm_verify ...`).
`@assume <justification>` records the word as an assumed lemma:
the generator emits its `Spec` statement as a Lean `axiom`
(statement-identical to the theorem it would have proven, with
a `-- ASSUMED: <justification>` comment above it) instead of a
`theorem ... := by fbm_verify`; `Prog` emission and caller dep
lists work unchanged, so callers compose over the assumed lemma
via `fbm_verify [..., <word>_effect, ...]` exactly as if it were
proven. The justification is mandatory (empty `@assume` is a
parse error); mixing `@assume` and proven clauses on one word
is an error (the axiom and theorem would collide). Lifecycle:
assume now → prove later → delete the clause; everything
downstream recompiles unchanged when the assumption is
discharged. Audit with `grep axiom` (open assumptions in
generated Lean) or `grep ASSUMED` (TAP + generator output);
open assumptions are declared debt at archive review, not done.
First users: `gcd` (assumed remainder-decrease) with `lcm`
proved over it.

`@lean` blocks (v37): `/* @lean ... */` is emitted verbatim
in file order (same `sorry`/`admit`/`axiom` rejection).

## Checking: check.py (v21)

`generate.py` is a pure translator — it never runs Lean. `check.py`
is the driver that does: it runs the generator, passes the output
to `lean --json`, and reports each failure against the `.ff`
statement it came from:

```sh
python3 check.py ff/lib/core/core.ff
```

It works because every theorem the generator emits carries a
`/-- word: @effect <effect> -/` doc comment above it, naming
the word and the statement as written. For each Lean error,
check.py finds the nearest theorem at or above the error's line
in the generated file and emits a TAP version 13 test for that
statement -- `not ok N - <effect text>`, with the Lean message
and goal as `#` diagnostics under it. There are no file:line
claims anywhere: the word name in the effect text is unique per
suite, and `grep -rn` finds it in seconds. Errors from one
theorem are grouped under its statement; generator problems
become extra `not ok` tests. Assumed axioms report as passing
tests with the assumption visible: `ok N - <effect text>` plus
a `# ASSUMED: <justification>` diagnostic (the suite stays green
while every open assumption is named). TAP is the only output
(no flag, no friendly report), so `prove` can run it directly.
Exit 0 when every emitted theorem proves and the generator
reported no problems, 1 otherwise. The generated Lean is kept
in a temp
file (path printed to stderr on failure) so the failing theorem
can be opened. Lean is resolved as `lean` on PATH, else
`~/.elan/bin/lean`, else `--lean PATH`.

One path, split across the chomp/Python boundary: the shell
flattens (`shell/ff-preprocess.sh --pp node`, backend selectable:
go|deno|bun|node — every file, `.ff` and `.ffp` alike, since the
preprocessor walks directive-free files as a no-op), the pipe
carries the flat text, and check.py verifies (`... | python3
check.py --stdin`, which reads the program from stdin and forwards
it via `generate.py --stdin`; provenance comments use the
`<stdin>` marker). TAP names the effect text from the `/-- word:
@effect ... -/` doc comments and nothing names a file. check.py
has NO `--pp` flag and spawns no preprocessor — an old check.py
`--pp` once meant "use preprocessor", while the shell's `--pp`
selects a backend; do not "restore compatibility" by adding one.
`test:lean` is two roots: the `:prelude`-cached flat file via
stdin (`python3 check.py --stdin < ./build/prelude.flat.ff` — the
whole library in one run; new annotated lib files ride the prelude
imports, no chomp change) plus the primitives test file through
the identical pipe. Single file: `chomp check -- <file>` (from
lean-proof/) pipes the file the same way, always reruns, and a
failing proof fails the task; `:build` keeps the oleans fresh.
