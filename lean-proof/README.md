# F♭m → Lean generator (prototype)

Feed it a `.ff` file containing definitions with `@effect` stack
comments, and it spits out Lean that proves the effects.

The generator is a pure translator: it parses, inlines, and emits
Lean. It runs no tests and has no interpreter of its own —
testing belongs to the interpreters and the unit tests, which
can run anywhere. (Nov 18, 2026 decision; the Nov 17 prototype
concrete-checked each effect in Python first and refused to emit
a theorem on failure. That mirror is gone: a wrong effect now
produces a theorem that Lean fails to prove, and the failure is
ambiguous — wrong effect, or true effect with a proof too hard
for the ladder. See `PLAN.md` §4.)

## Usage

```sh
python3 generate.py examples/shuffles.ff out.lean
lake env lean out.lean
```

Or pipe straight to Lean (output goes to stdout when no output
file is given; the summary goes to stderr, so stdout stays pure
Lean — Lean reads stdin with `--stdin`):

```sh
python3 generate.py examples/shuffles.ff | lake env lean --stdin
```

`lean` exiting 0 with no output means every emitted theorem is
proved.

The same works on the repo's primitive test file, which carries
the same `@effect` comments plus the TAP tests (the generator
reads the effects and ignores the rest — the `.import`, the
`TAP-VERSION`, the subtests). From the repo root on the PC
(Lean 4.36.0 via elan, verified Nov 20, 2026):

```sh
cd lean-proof && lake build
python3 lean-proof/generate.py ff/__tests__/primitives.test.ffp | (cd lean-proof && lake env lean --stdin)
```

Expected: exit 0, 34 theorems, no output. Note `lake`/`lean` are not
on `PATH` in a non-login shell — use the full `~/.elan/bin/lake`
/`~/.elan/bin/lean` paths (or add `~/.elan/bin` to `PATH`). Generated
files start with `import Fbm.Prover`, so they must be checked via
`lake env lean` from `lean-proof/` (which sets `LEAN_PATH` to the
cached `.olean`s); run `lake build` first so the oleans are fresh.
And do not merge the generator's stderr into the pipe (`2>&1`):
the summary line ("generator: wrote stdout …") is not Lean and
breaks parsing.

Or run it via chomp from this directory — `lean-proof/` has
its own `chompfile.toml` with a `test:lean` task (also the
default task, so bare `chomp` works there). It runs
`prove --exec "python3 check.py"` over the test file
and `ff/lib/core/core.ff`, so the summary is prove's quick
one (one TAP test per theorem); run `check.py` by hand for
the detail behind a failure:

```sh
cd lean-proof && chomp test:lean
```

For readable failures, use `check.py` instead of the raw pipe
(see below) — it reports each failure against the `.ff`
statement it came from, not a line in a temp file:

```sh
python3 check.py ff/lib/core/core.ff
```

## Files

- `generate.py` — the generator (v22). A pure translator: `parse_args`
  / `extract_effects` / `parse_definitions` / `inline_word` do the
  input side; per-effect emission is an `EmitCtx` (a dataclass:
  `prepare()` validates and computes the derived Lean fragments,
  `emit()` dispatches to one `emit_*` function per word kind —
  `exit`, `rand`, `clock`, `getc`, error, `where`, normal). A new
  word kind is a new `emit_*` function plus one dispatch line.
  `generate.py --help` prints the short usage. Since v21 every
  theorem carries a `-- src: <file>:<line> <effect>` marker above
  it, so a Lean error can be traced back to the statement. Since
  v22 `⊕` is a bitwise-xor operator in effects (translated to
  `xor`, defined in `Fbm/Interp.lean`), and the prefix operators
  (`tmod`/`tdiv`/`land`/`lor`/`xor`/`shl`/`shr`) emit their
  operands parenthesised, so nested `&`/`|` expressions parse.
  Since v23 each bitwise/shift/power operation has three
  spellings in effects — the F♭m symbol (`&`), Lean's operator
  (`&&&`), and the f() form (`land(a,b)`) — all three emitting
  the same helper (see the synonyms paragraph in the notation
  section below).
- `check.py` — the checker (v21). Runs the generator, passes the
  output to `lake env lean --json` (from `lean-proof/`), and reports
each result as a TAP
  version 13 test, one per emitted theorem, named
  `<effect> (<file>:<line>)`, with the Lean message as `#`
  diagnostics. Exit 0 when every theorem proves, 1
  otherwise. The generator stays a pure translator — all Lean
  invocation and error mapping lives here. TAP is the only
  output (no flag, no friendly report) — that is what the
  `test:lean` chomp task consumes via `prove`.
- `Fbm/Interp.lean` — the Lean interpreter (`Tok`, `step`, `exec`,
  `run`, `Outcome`, helpers, `Defs`, `lookup`, `execQ`, `runQ`) with
  zero prover dependencies; import it alone to run the model.
- `Fbm/Prover.lean` — proof infrastructure: the `Spec` / `SpecErr`
  predicate layer over `execQ` (frame-polymorphic pre/post
  conditions quantifying over stack, queue, input, oracle,
  actions, and `defs`), the `Spec.*_head` continuation lemmas,
  and the `fbm_verify` tactic that discharges `Spec` goals by
  head-peeling. Generated files start with `import Fbm.Prover`.

## Emission (Phase B, 2026-11-22): compositional `Spec` theorems

Defined words emit a `Prog` definition composed with `++` over
callee `Prog`s (e.g. `def slipProg : List Tok := [Tok.qpush] ++
[Tok.eval] ++ [Tok.qpull]`), plus one `Spec` (or `SpecErr`, for
`else ERROR` branches) theorem per `@effect`, proved by uniform
`by fbm_verify [...]` with already-emitted callee `Spec`s as
deps. `defs` never changes inside a quotation body, so every
generated post pins `d' = defs` concretely (no `defs'` binder);
post `if`-terms are lifted to fresh variables with equality
hypotheses, except bare-variable tests (`if (b ≠ 0) then …`).
Words touching non-frame-polymorphic primitives (`clr`,
`depth`, `.`, `getc`, `rand`, `clock`, `exit`) keep the old
direct `run … = Outcome.ok …` theorems. Recursive words stay
out of scope: they need human induction (`@rec-effect` /
`@proof` territory, see `PLAN.md` §3.5).
- `Fbm/Main.lean` — standalone executable entrypoint importing only
  `Fbm.Interp` (sample program printing its `Outcome`); build with
  `lake build fbm-interp`, run with `lake exe fbm-interp`.
- `lakefile.toml` / `lean-toolchain` — Lake package (core Lean 4 only,
  no Mathlib) pinning `leanprover/lean4:v4.36.0`; run `lake build`
  from `lean-proof/` before checking.
- `HELP.md` — the generator manual (notation, scope, IO, `ensures`/
  `requires`, the proof ladder). Moved out of the module docstring
  (v19); the docstring is now a short pointer.
- `PLAN.md` — the design, phases, and open decisions.
- `queue-syntax-decision.md` — the queue-syntax decision
  note (2026-11-19/20).
- `examples/` — `.ff` inputs; `outputs/generated-*.lean` are
  the outputs (regenerate with `generate.py` into `outputs/`).

## Notation decisions — 2026-11-19/20 (decided; partly in the generator since v20)

Decided in the main chat Nov 19, recorded in `PLAN.md`
Appendix. Since v20 (Nov 20) the generator accepts the new
syntax — `word:` prefix, `requires` / `ensures` — alongside
the old spellings (`when` / `where`, word in postfix
position); `primitives.ff` is written in the new syntax.
Quotations, `.unsafe`, and `+Fail` / `+IO` are still Phase 8
/ open, and HELP.md documents both spellings.

- **`requires` / `ensures` replace `when` / `where`.** Pure
  rename, same Lean. **Outer parens dropped.** **`word:`**
  pins the word name outside the effect, dissolving the
  separator collision. **`==` kept** (`--` collides with
  decrement). **`[ ]` for inner quotation effects**, rest
  inferred inside brackets; a literal's effect is named by
  its code (`[swap]`), a variable quotation stays
  `[ ..R -- ..S ]`. The `quot:` label is dropped.
- **Statable, Phase 8:** `eval` / `?` via nested `[ ]`
  effects; `cons` as `..R A [B] == ..R [A B]` (needs effect
  composition to *use*); fold words are recursive, and a
  definition containing a fold can be proven by applying
  the fold's proven effect as a lemma instead of inlining
  it (generator support for lemma application still to be
  built; `@proof` is today's workaround).
- **Probably no queue effects at all** (leaning, not
  decided): most words are balanced by design; unbalanced
  queue ops get marked `.unsafe`. Still open: what
  `.unsafe` means for the generator (recommended: the word
  gets no effect at all), and what "balanced" means
  precisely (recommended: matched push/pull at the tail,
  queue unchanged — not just net-zero count).
  `+Fail` / `+IO` still open.

## Input format

Definitions as usual, with the effect in the existing typed-order
convention (bottom-to-top, top rightmost, exactly as typed) and
an `@effect` tag:

```forth
/* @effect A B C rot == C B A */
rot: bury swap ;
/* @effect N -- == N-1 */
--: 1 - ;
/* @effect ... A B C rot == ... C B A */
rot: bury swap ;
```

- An effect attaches by the word it names, not by position —
  the definition can come before or after the effect, anywhere
  in the file. A primitive needs no definition at all; a bare
  effect is a complete file:

```forth
/* @effect A dup == A A */
```

- The rest of the stack is implied by default (preserved):
  `A dup == A A` means the rest is there underneath,
  unchanged — you do not need to write it. `...` at the far
  left (or the Unicode `…`, what the library comments use)
  makes it explicit. `∅` at the far left means no rest on
  that side ("the stack is exactly this"). The output rest is
  preserved unless the input explicitly wrote `...` without
  the output doing so — that is a whole-stack word (clr,
  sum!): the rest goes in and does not come back out. So
  `… clr ==` and `clr == ∅` mean the same thing: the stack
  ends up exactly empty. `∅` is only allowed at the far left
  (the rest position).
- Output elements are variables, or Int expressions written
  **without spaces** (`n-1`, `a*b`). Spaces separate stack
  elements, so `n - 1` would be read as three elements.
  Two operators mean F♭m's operators, not Lean's, and are
  translated: `%` is truncating mod (sign follows the dividend;
  Lean's `%` is Euclidean) and becomes the `tmod` helper, `&`
  is bitwise and (Lean core has no Int `&`) and becomes the
  `land` helper. `!=` becomes `≠` and `==` becomes `=` (Lean's
  `!=` / `==` are boolean, not propositions). A call like
  `min(a,b)` is translated to Lean application (`min a b`).
- An effect may carry a `when` condition on its inputs:
  `/* @effect A B % == A%B when B != 0 */`. It becomes A
  hypothesis `(hw : ...)` in the theorem (the name `hw` is
  reserved — do not use it as a stack variable), and the proof
  ladder passes it to `simp`. `%` needs its `when`: the engine
  throws on division by zero, so the effect is only true when
  `b != 0`. A `when` may end in `else ERROR`
  (`/* @effect A B ^ == A^B when 0 <= B else ERROR */`): the
  word fails when the condition does NOT hold. It desugars
  into two theorems (success with `when <cond>`, error with
  `when` the negated condition — `B != 0` becomes `B == 0`,
  `0 <= b` becomes `b < 0`, a `¬ X` drops the `¬`), numbered
  `_1`/`_2` in order. `else` with anything but `ERROR` is
  not supported.
- A word may have several `@effect` comments, one per case;
  each becomes a theorem, named `<word>_effect_1`,
  `<word>_effect_2`, ... in file order (a single effect is just
  `<word>_effect`). The program is shared.
- An effect whose whole output is `ERROR` states that the word
  fails: `/* @effect A B % == ERROR when B == 0 */` becomes
  `exec ... = none`. `ERROR` must be the whole output — it is
  never a stack value, and it cannot appear in the inputs.
- An output expression may refer to `<name>.length` — the
  length of the named rest `..name`:
  `/* @effect depth: ..R == ..R #R */`. `#R` is shorthand for
  `R.length` (v27, Nov 21, 2026); both spellings emit
  `(R.length : Int)`. The rest list
  is bound as `(<name> : Stack)`; a `.length` base (or the
  name after `#`) must be
  that name. The old `rest.length` spelling is dropped (v20):
  `rest` and `rest.length` are clean problems now — name the
  rest with `..R` and use `#R` (or `R.length`). Any other `.` form is
  rejected. Note `#R` counts only what is in the named
  rest, not the whole stack: `..R a b depth` pushes
  `#R+2`, not `#R`.
- An effect may carry a `where` clause on its outputs
  (`ensures` in the new syntax):
  `/* @effect depth: ..R == ..R N ensures N = R.length */`. Only
  equations `var = expr` are supported (the equational case):
  the variable becomes an existential (`∃ n`), the expression
  is its witness, and the theorem is
  `∃ n, (n = <expr>) ∧ exec ... = some (...)`. Several equations
  join with `∧` (`where n = b ∧ m = a`). Each witness may only
  mention the inputs (and the named rest, as `<name>.length`); a `where` cannot constrain
  an input variable (use `when` for that), and every output
  variable not in the inputs must be constrained by the clause.
  Inequalities (e.g. isqrt's `r^2 <= n ∧ n < (r+1)^2`) are not
  supported yet — there is no witness to supply.
- Comparisons (`<`, `=`, `>`) push 1 or 0 (an `Int`, not a
  boolean): the step is `if a < b then 1 else 0` (and the
  analogues for `=`/`>`). An if-then-else cannot be written
  as an output element (spaces separate stack elements), so
  the effect uses a `where` clause:
  `/* @effect A B < == F where F = if A < B then 1 else 0 */`.
  (A spaceless form also works, with the branches in
  parentheses: `if(a<b)then(1)else(0)`.) The keywords
  `if`/`then`/`else` are never stack variables.
- Bitwise (`|`, `~`) and power (`^`): `|` is two's-complement
  OR, defined from `land` by De Morgan
  (`lor a b = -(land (-a-1) (-b-1)) - 1`, verified against
  JS BigInt); `~` is bitwise NOT, `~a = -a - 1`, so the effect
  is `/* @effect A ~ == ~A */`; `^` is power with A Nat
  exponent, so the effect is `/* @effect A B ^ == A^B when
  0 <= b */` and a negative exponent is an error
  (`/* @effect A B ^ == ERROR when B < 0 */`). The translator
  understands `~` (unary), `|` (to `lor`), and `^` (to
  `a ^ b.toNat`, since Lean's `^` on `Int` takes a `Nat`).
  A guarded primitive whose `when` is not the guard itself
  gets a `have hguard : ¬ <guard> := by omega` before the
  ladder (the `^` success case: `0 ≤ b` does not discharge
  `if b < 0` inside the `exec` match, because simp cannot
  simplify an `ite` that is the scrutinee of a `match` from
  a merely-equivalent hypothesis -- only from the guard
  itself or its exact `¬` form).
- Synonyms (v23): every bitwise/shift/power operation can be
  written three ways in an effect — the F♭m symbol, Lean's
  operator, or the f() form — and all three emit the same helper:
  `&` / `&&&` / `land(a,b)` → `land`; `|` / `|||` / `lor(a,b)` →
  `lor`; `⊕` / `^^^` / `xor(a,b)` → `xor`; `~` / `~~~` /
  `lnot(a)` → `lnot`; `<<` / `<<<` / `shl(a,b)` → `shl`;
  `>>` / `>>>` / `shr(a,b)` → `shr`; `^` / `pow(a,b)` → power
  (`a ^ b.toNat`). `and(a,b)` and `or(a,b)` are NOT available:
  Lean core's Bool `and`/`or` make bare `and`/`or` ambiguous as
  function names, so `&`/`|` keep the `land`/`lor` names (which
  are also Lean's `Nat.land`/`Nat.lor`). In a direct output the
  expression is one whitespace-free token, so an f() call takes
  no space after the comma (`land(a,b)`); in an `ensures`
  clause spaces are fine. `examples/synonyms.ff` (12 theorems)
  proves every spelling. The old symbol spellings keep working.
- Quotations (v24; queue-polymorphic since v28): no `Val` type; the stack stays `List Int`.
  The preamble gains a `userDefs` table (`Defs := List (List
  Tok)`, fresh code = `defs.length`) and a fuelled, defs-aware
  interpreter `execQ` / `runQ` alongside the untouched `exec` /
  `run`. Effects write a quotation slot as `[..R -- ..S]` (a
  pointer whose body has that effect), `[B]` (a plain quotation
  variable), or `[a B]` (cons's output). `eval` and the `?` run
  case are conditional on the body (`lookup defs q = some body`
  and `execQ fuel body r qq ... = ok s qq` as hypotheses, with
  the queue `qq` universally quantified since v28 so the theorem
  can be used when the queue is non-empty); `cons`
  states the fresh code and the new table entry directly.
  `cons`, `eval`, and `?` are all live in primitives.ff (34
  theorems); `?` takes one quotation plus a flag, and the
  corrected forms are the ones that prove.
- Quotation composition (v29, Phase 6; literals v30; `?` v31; direct-simp v32; nested literal v33; general composer v34): a defined word whose
  inlined program contains `eval` gets a runQ theorem
  (execQ with a queue variable `qq`), proved by
  `execQ_append` joining the body's effect and the suffix
  after `eval`. The preamble carries the two lemmas this
  needs — `execQ_ok_mono` (fuel monotonicity) and
  `execQ_append` (running `p1 ++ p2` is running `p1`,
  then `p2`). Fuel is `fuel + len(prefix) + len(suffix)
  + 2`. Only one `eval`; `cons` in a defined word,
  a `where`/`when` clause (for `eval` words), more than one `eval`, and a
  literal naming a word that itself contains a literal are
  clean problems. A quotation literal (`[X]`) run by a
  single `eval` works since v30: the literal is a code
  variable with a `lookup` hypothesis, and the simulator
  expands it at its `eval`. A single `?` (cond) works
  since v31: the proof case-splits on the flag (a bare
  variable, or the condition inside a computed flag like
  `A > B`), the output is the direct `where`-substituted
  form, and the fuel is fixed. A word with one `?` and
  one `eval` (the `?` running a concrete literal, the
  `eval` last on a variable quotation) works since v32
  by direct simp: inline everything, let `simp` reduce
  the program, close with the body's effect (the discard
  case needs an `execQ_ok_mono` lift). A word with one
  literal `[W]` where W itself contains a `?` works
  since v33 by direct simp with a trichotomy case split
  on the computed flag vs the where-clause outer
  condition; fuel is fixed (`len(outer) + len(W) +
  len(cond body)`). A word with two evals on variable
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
  behavior (the theorem is silent). `slip`, `dip`, `run`,
  `sip`, `sipd`, `dipd`, `sort2`, `choose`, `branch`, `between?`, `bi`, `bi2`, `or_else`, `and_also` now prove as `@effect` in core.ff
  (45 theorems — all non-recursive core words).
- Division (`/`) is truncating, like `%`: `tdiv a b = (a - tmod
  a b) / b` (the Euclidean `/` is exact there because `a - tmod
  a b` is divisible by `b`), verified against JS BigInt. The
  effect is `/* @effect A B / == A/B when B != 0 else ERROR */`.
  Note the trap: before `/` was a primitive, `a/b` in an output
  expression passed through raw as Lean's Euclidean `/`
  (`-3/2 = -2` instead of `-1`), because `/` was not in the
  translator at all. Now `/` is translated to `tdiv`.
- IO effects (v16): Lean says a word has an IO effect by putting
  it in the type. The interpreter returns an action trace
  (`IOAction`: `putc` / `putn` / `print`) and an `Outcome`
  (`ok` / `err` / `exit`); nondeterministic words draw from an
  oracle stream so `exec` stays a function. Theorems are stated
  with `run` and `Outcome.ok` / `Outcome.err` / `Outcome.exit`.
  The six forms: `N putc == { prints char(N) }`,
  `N putn == { prints N }` (no newline -- the doc's
  `{prints N, newline}` is wrong), `… . == … { prints stack }`,
  `N exit == { exits with code N }` (short-circuits the rest of
  the program), `max rand == N when 0 < max where
  0 <= n ∧ n < max` (the range is the only inequality `where`
  the generator proves, with witness `o % max`; the `when` is
  load-bearing and the lower bound is `<=` because rand can
  push 0), `clock == T { pushes the current time T }`.
  A `{...}` note is a human note, not parsed: the generator
  strips it (`{` is `/--`, `}` is `-/`), so all note variants
  produce the same theorem, and the note is preserved in the
  doc comment above the theorem. A defined word that inlines an
  IO token is refused (only a bare effect on the IO primitive
  itself works). `getc` is not supported yet.
- Shifts (v17): `<<` and `>>` are the JS BigInt shifts. A
  NEGATIVE count does NOT throw -- it reverses direction
  (`5 << -1 = 2`, `5 >> -1 = 10`), so there is no guard and no
  `when` is needed; the helpers `shl` / `shr` reverse instead.
  `>>>` is Lean's arithmetic shift right; `<<<` does not exist
  for Int, so `<<` is multiplication by `2^b`. In an output
  expression, `<<` / `>>` become `shl` / `shr`.
- `getc` (v17): reads one byte from the input stream and pushes
  it (EOF pushes 0). The form is `getc == N {reads char}`; the
  output variable is the head of the input stream, so it is a
  binder, not an existential. The byte range (v18): a byte is
  0..255, so the form is `getc == N {reads char} where
  0 <= n ∧ n < 256` (or `n <= 255`); the `where` becomes a
  hypothesis on the binder (`_hbyte`), not an existential.
  The EOF case (empty input pushes 0) needs a way to say the
  input stream is empty, which the notation does not have yet.
- No `Int` annotations anywhere in the `.ff` file: every value
  is an Int by default. The generated Lean says `(a b c : Int)`
  once, in the binder line, and the body has no type annotations.

## What it does, step by step

1. Parses definitions and `@effect` comments.
2. For each effect, finds the program: a primitive is its own
   single token; a defined word is inlined. A recursive call is
   refused (see below) — the word gets a comment in the output,
   not a theorem.
3. Emits a self-contained Lean file: a fuel-free interpreter
   (`run` over `exec`, recursion on the program list only), each inlined
   program as data, and a theorem per effect. The proof attempt
   is `first | rfl | (simp [run, exec, step, <prog>, hw?]; try omega)`.
   `simp` needs `run` unfolded (the theorems are stated with it),
   the program unfolded (it cannot see through the
   `def`) and the `hw` hypothesis to discharge the div-by-zero
   guard in the `%` step. The `try` is load-bearing: `simp`
   sometimes closes the goal outright, and a bare `omega` after
   that fails with "no goals to be solved". There is deliberately
   no bare `simp` alternative: `first` takes the first tactic
   that does not fail, and a bare `simp` that leaves a goal
   (e.g. `n + 1 + 1 = n + 2` for a word computing `n+1+1` while
   the effect claims `n+2`) counts as success and shadows the
   `omega` alternative, leaving the theorem unproven.
4. Lean compiles it. A clean compile is the "yes".

## Verified (2026-11-17, Lean 4.22.0, core only)

| file | result |
|---|---|
| `examples/shuffles.ff` | 7 theorems (`swapd`, `bury`, `rot`, `dig`, `dupd`, `over`, `dup2`), `lean` exit 0 |
| `examples/arith.ff` | 5 theorems (`--` → `dec`, `++` → `inc`, `%` → `mod_effect_1` with `when b != 0` and `mod_effect_2` with `ERROR when b == 0`, `&` → `land`), `lean` exit 0, `#print axioms` = `[propext]` only |
| `examples/rest.ff` | 3 theorems with `... rest`, `lean` exit 0 |
| `examples/dup.ff` | bare effect, no definition: 1 theorem (`dup`), `lean` exit 0 |
| `examples/depth.ff` | 1 theorem (`depth` via `..R` / `R.length`), `lean` exit 0 |
| `examples/where.ff` | 3 theorems (`depth`, `swap`, `%` via `where`, incl. `when` + `where`), `lean` exit 0 |
| `examples/comparisons.ff` | 3 theorems (`<`, `=`, `>` via `where` with `if-then-else` witnesses), `lean` exit 0 |
| `examples/bitwise.ff` | 4 theorems (`|`, `~`, `^` success + `^` ERROR), `lean` exit 0 |
| `examples/synonyms.ff` | 12 theorems (every bitwise/shift/power op in its Lean-operator and f() spellings: `&&&`/`land(a,b)`, `|||`/`lor(a,b)`, `^^^`/`xor(a,b)`, `~~~`/`lnot(a)`, `<<<`/`shl(a,b)`, `>>>`/`shr(a,b)`, `pow(a,b)`), `lean` exit 0 |
| `examples/else-error.ff` | 8 theorems (`%`, `^`, and `/` via `when ... else ERROR`, incl. a `where` + `else ERROR` form), `lean` exit 0 |
| `examples/io.ff` | 6 theorems (`putc`, `putn`, `.`, `exit`, `rand`, `clock`), `lean` exit 0, `#print axioms` = `[propext]` (rand: `[propext, Quot.sound]`) |
| `examples/shifts.ff` | 3 theorems (`<<`, `>>`, and a defined word `dbl` using `<<`), `lean` exit 0 |
| `examples/getc.ff` | 1 theorem (`getc == n {reads char} where 0 <= n ∧ n < 256`), `lean` exit 0 |
| `examples/wrong.ff` | `rot` claimed as `b c a`: the theorem is now emitted (no concrete check any more) and `lean` rejects it — the failure is ambiguous, which is the known tradeoff of removing the mirror (see above) |

Generated outputs are saved under `outputs/` as
`generated-shuffles.lean`, `generated-arith.lean`,
`generated-rest.lean`, and so on — every `generated-*.lean`
file is a regenerated test output, not a source: edit the
`.ff` input and regenerate, never the output by hand
(`generated-arith.lean` is the one exception, carrying five
hand-appended `#print axioms` lines at the end, which
regeneration wipes — re-append and re-verify them after
regenerating arith).

Note on axioms: since the `%` step was added, generated
theorems depend on `[propext]` (only). The `if b = 0` guard in
the `%` step pulls `propext` into `step`/`exec` through the
equation compiler, and every theorem mentions `exec` (via
`run`). `propext` is one of Lean's three standard axioms (with
`Classical.choice` and `Quot.sound`); no theorem depends on
`sorryAx`. `rand` also depends on `Quot.sound` (from the
`Int.emod` lemmas its range proof uses).

## Scope / what it refuses

- Body tokens: integers, `nop clr dup swap drop q< q> + - * / % & depth < = > | ~ ^ << >> putc putn . exit rand clock getc`, and calls
  to words in the same file. Nothing else yet.
- Non-recursive words only: calls are inlined. A recursive word
  (e.g. `fact`) needs fuel + induction, as in `Fact.lean` — the
  generator does not do that, and says so.
- Quotations (`[A]`, `?`, `dip`, …) are refused: a quotation's
  effect has to be given as a hypothesis first (the `where`
  form discussed in chat), which the prototype does not parse.
- IO inside a defined word is refused: only a bare `@effect` on
  an IO primitive itself works (the trace for a composed IO word
  is not computed yet). The EOF case of `getc` (empty input
  pushes 0) is not expressible yet (it needs a way to say the
  input stream is empty). A bare `q<` / `q>` effect is not
  expressible yet either: the generator does not parse the queue
  part (after `|`), so `A Q< == | A` is a clean problem. `Q<` /
  `q>` work inside defined words whose net queue change is zero
  (e.g. `swapd: q< swap q>`), because the queue ends up empty
  and the theorem states `Outcome.ok (stack) [] []`.
  An inequality `where` is only supported for `rand` (the range)
  and `getc` (the byte range); the general case (isqrt, gcd)
  is Phase 3.
- Vague effects (`min max`, `flag`, `x'`, `a*`) are not
  formalised: `min`/`max` work as Lean functions if written
  `min(a,b)` / `max(a,b)`; `flag` and `a*` do not yet.

## Two Lean lexer traps found while building this

- `def --Prog` is not a name: `--` starts a Lean line comment.
  Symbolic words are mapped to readable names (`--` → `dec`,
  `++` → `inc`) in the generated Lean.
- `/-- --: ... -/` breaks Lean's comment lexer. Doc comments
  use the sanitised name.
- `n-1 :: []` parses as `n - (1 :: [])`. Every list element is
  parenthesised in the generated code.
