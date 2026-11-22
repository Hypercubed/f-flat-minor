# F♭m → Lean: a more powerful typechecker for F♭m

Design notes and implementation plan. Written 2026-11-17, after the
prototype was built and verified, so we can experiment with it over
the weekend of 2026-11-21/22.

## 1. The idea in one paragraph

F♭m's stack-effect comments are its type system. Today they are
informal documentation, checked by nothing. The `@effect`
notation makes them precise enough to be checked: a stack effect
is a *type* — a proposition about the stack before and after a
word — the word's body is the term that is supposed to inhabit
that type, and Lean is the typechecker that decides whether it
does. A generator reads `.ff` files, turns each `@effect` into a
Lean theorem about an interpreter running the word's definition,
and Lean says yes (it compiles), no (a concrete counterexample),
or "I don't know" (the statement is checkable but the proof needs
a human). The same move extends to snapshots in the middle of a
word (`@snapshot`), to conditional effects (`when` / `where`),
and to recursive words (`@rec-effect`).

Framing, agreed 2026-11-17: this is a **typechecker with proof
obligations** — like Dafny / F* / Liquid Haskell — not a plain
decidable typechecker. It can fail to prove something true, and
when it does it hands you a proof obligation instead of an error.
The other framing that fits is *contracts*: `when` is a
precondition, the output plus `where` is a postcondition.

## 2. What exists now (prototype, verified 2026-11-17)

Files live in `~/workspace/fbm-lean-proof/` on the VM, Lean
4.22.0, core Lean only, no Mathlib:

| File | What it is |
|---|---|
| `generate.py` | The generator (Python). Parses `.ff` + `@effect`, inlines non-recursive calls, concrete-tests each effect, emits self-contained Lean. |
| `README.md` | Generator usage, scope, and verified results. |
| `Fact.lean` | Hand-written proof that the README naive factorial works. Fuelled interpreter, strong induction. `n ≥ 1` only — `fact 0` genuinely diverges. Axioms: only `[propext, Quot.sound]`. |
| `Rot.lean` | Hand-written, fuel-free proof of `rot`. Proved by `rfl`, no axioms at all. |
| `Swap.lean` | Hand-written proofs of the primitives `swap`, `dup`, `drop` (fuelled interpreter, `List Int` stack). `swap_spec`, peephole rules `swap_swap` and `dup_drop`, failure cases. Axioms: only `[propext, Quot.sound]`. |
| `Isqrt.lean` | Hand-written proof that `isqrt` in `ff/lib/math/sqrt.ffp` works (added 2026-11-18). Fuelled interpreter over the actual `__base` / `__pick` / `__next` definitions; `isqrt_works` (leaves `⌊sqrt(n)⌋` for all `n ≥ 0`), `isqrt_spec` (`r² ≤ n < (r+1)²`, the `where` form of §3.2), `isqrt_neg` (negative input errors via `1 0 /`). Axioms: only `[propext, Quot.sound]`. |
| `Snapshot.lean` | Proof of concept for mid-body snapshots (see §3.3). Proves a snapshot inside `rot` and the final effect *through* it, using a proved chaining lemma `exec_append`. |
| `examples/` | `shuffles.ff`, `arith.ff`, `rest.ff`, `wrong.ff`, `recursive.ff`. |
| `outputs/generated-*.lean` | Verified generated outputs for shuffles / arith / rest (regenerated test outputs, not sources — see §9). |

Verified results (all `lean` exit 0):

- 7 shuffle theorems: `swapd`, `bury`, `rot`, `dig`, `dupd`, `over`, `dup2`.
- 2 arithmetic theorems: `--` → `dec`, `++` → `inc`. `#print axioms` = **no axioms at all**.
- 3 theorems with `... rest` (rest of the stack underneath).
- Wrong effect caught: `rot` claimed as `b c a` gives counterexample `a=1, b=2, c=3` (got `[1,2,3]`, effect says `[1,3,2]`); no theorem is emitted for it, the other words in the file still prove.
- `isqrt` proved by hand (2026-11-18, `Isqrt.lean`): the interpreter running the real `sqrt.ffp` definitions matches the TAP cases (0, 1, 2, 3, 4, 25, 125348, `100^8 * 2` → 141421356) and the negative case errors; the proof is strong induction on `n` with the `n / 4` step, fuel bound `20 * (n + 1) + 10`. This is the hand-written version of the Phase 3 (`where`) + Phase 4 (`@rec-effect`, fuelled) work — the generator does not yet emit it.
- Recursive word refused: `fact` (quotation `[(fact)]` not supported in the prototype).

## 3. The notation

### 3.1 Ground rules (decided, do not change without discussion)

1. **Typed order, always.** Stacks are written bottom-to-top,
   top rightmost, exactly as you type the program. `x y ^`
   has effect `X Y ^ == X^Y`, never `Y :: X`. Lean's
   head-on-top lists are an internal representation; the
   generator does the reversal, and you never see it.
2. **No `Int` annotations.** Everything is an `Int` by
   default. The `.ff` file has no types in it at all; the
   generated Lean says `(a b c : Int)` once, in the binder
   line, and the theorem body has no type annotations.
3. **The comment is the statement.** An `@effect` comment is
   Lean syntax for the stack part (variables, arithmetic
   expressions, `min`/`max`, `if`), plus the keywords in
   §3.2–§3.5. There is no second translation step to drift.
4. **A tag is a commitment.** An untagged comment is a note.
   A tagged comment (`@effect`, `@snapshot`, …) is a claim
   Lean is going to check. If it is wrong, the failure names
   that claim.

### 3.2 `@effect` — one case of a word's contract

```forth
/* @effect A B C rot == C B A */
rot: bury swap ;
```

- One comment = one case = one Lean theorem.
- An effect attaches by the word it names, not by position:
  the definition can sit anywhere in the file, before or after
  the effect. A primitive (`dup`, `swap`, ...) needs no
  definition at all — a bare `/* @effect A dup == A A */` is
  a complete file. (Nov 18, 2026: the prototype used to attach
  by definition order, which forced the `dup: dup ;` ceremony.)
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
  **without spaces** (`n-1`, `a*b`, `min(a,b)`). Spaces
  separate stack elements, so `n - 1` would be read as
  three elements. An output expression may refer to
  `rest.length` — the number of elements below the listed
  ones (the `…`): `/* @effect … depth == … rest.length */`
  (Nov 18, 2026, generator v10). `rest` is reserved (it names
  the stack below the listed elements); only `rest.length` is
  supported. Note `rest.length` counts only what is below the
  listed elements: `a b depth` pushes `rest.length+2`, not
  `rest.length`.
- A `where` clause constrains the outputs:
  `/* @effect … depth == … N where N = rest.length */`.
  Only equations `var = expr` are supported (the
  equational case, Nov 18, 2026, generator v11): the
  variable becomes an existential, its expression is the
  witness. Several equations join with `∧`. Inequalities
  are not supported yet (Phase 3 remainder).
- Queue state, when a word uses the queue, goes after `|`:
  `/* @effect A Q< == | …A */` (existing notation, not yet
  parsed by the generator — see Phase 8).

Generated Lean (from the prototype):

```lean
theorem rot_effect (a b c : Int) :
    exec rotProg (c :: b :: a :: []) [] = some ((a :: b :: c :: []), []) := by
  first | rfl | (simp [exec, step, rotProg]; try omega)
```

### 3.3 `@snapshot` — a claim in the middle of a word

Decided 2026-11-17: snapshots need their own `@` directive,
so the generator does not have to guess which comments are
snapshots. Syntax is the existing mid-body snapshot notation
from `_docs/supplemental/stack-notation.md`, plus the tag:

```forth
rot: bury /* @snapshot c a b */ swap ;
```

```forth
__isqrt_newton:
  dup2 / over + 1 >>  /* @snapshot x guess' */
  dup2 >              /* @snapshot x guess' flag */
  [ nip (__isqrt_newton) ] ? ;
```

Rules:

- It appears **inside the body, in order**. Each `@snapshot`
  splits the body at that point. The generator emits one
  lemma per snapshot, named by position
  (`rot_snapshot_1`, `rot_snapshot_2`), and chains them
  with `exec_append` to prove the final `@effect`.
- The picture is the existing notation, unchanged:
  bottom-to-top, `...` for rest, `|` for queue state.
  No `==`, no word name — it is A claim about the stack
  *at that point*, not about a word.
- **Primed variables** (`guess'`) are fresh names in the
  weak form: the snapshot says the stack is `[x, guess']`
  for *some* `guess'`. That catches shape errors (wrong
  number/order of values) and is provable by `rfl`/`simp`.
  The strong form adds a `where` clause giving the
  relation, e.g. `/* @snapshot x guess' where
  guess' = (x / guess + guess) / 2 */`, and catches value
  errors too.

Why it matters beyond proving: a wrong snapshot fails on
*that snapshot's* lemma, so you know the bug is in the
segment *before* it — not just "the final effect is wrong
somewhere in this 20-token body". Snapshots break a long
word into checkable steps, which is also how a proof that
is too big for `rfl`/`simp` in one go becomes a chain of
small ones.

Verified in `Snapshot.lean`: `rot_snapshot_bury` (after
`bury`, stack is `c a b`) by `rfl`, no axioms; final effect
proved through it using the proved chaining lemma
`exec_append` (`exec (p1 ++ p2) = exec p2 ∘ exec p1`,
axioms `[propext]` only).

### 3.4 Multiple effects and conditionals

A definition may have **multiple `@effect` comments**, one
per case, each becoming its own theorem:

```forth
/* @effect N abs == N when 0 <= N */
/* @effect N abs == 0-N when N < 0 */
abs: dup 0 < [ 0 swap - ]? ;
```

Two new keywords, both mapping directly onto Lean:

- **`when <condition>`** — a condition on the *inputs*.
  In Lean it becomes a hypothesis: `(hn : 0 ≤ n)`.
  The generator's concrete check only tests values that
  satisfy it.
- **`where <property>`** — a property of the *outputs*,
  in terms of the inputs. In Lean it goes after a `∧`,
  and any output variable that is not a formula in the
  inputs becomes an existential (`∃ r`).

The `isqrt` case, which is where an effect stops being a
formula and becomes a specification:

```forth
/* @effect N isqrt == R when 0 <= N where R^2 <= N ∧ N < (R+1)^2 */
/* @effect N isqrt == ERROR when N < 0 */
```

```lean
theorem isqrt_effect (n : Int) (hn : 0 ≤ n) (rest : Stack) :
    ∃ r : Int, exec isqrtProg (n :: rest) [] = some ((r :: rest), [])
      ∧ r^2 ≤ n ∧ n < (r+1)^2

theorem isqrt_effect_neg (n : Int) (hn : n < 0) (rest : Stack) :
    exec isqrtProg (n :: rest) [] = none
```

The second theorem matters as much as the first: the
definition guards negative input with a deliberate
division by zero (`1 0 /`), so the honest statement is
that it *fails* on negative input. Other specification
examples: `sort2` (`min(a,b) max(a,b)`, a formula, no
`when`/`where` needed), `gcd` (`g` with `g ∣ a ∧ g ∣ b ∧
∀ d, d ∣ a → d ∣ b → d ≤ g` — an `∃ g`, same shape as
`isqrt`).

A single effect can also carry an `if` in the output
instead of two cases: `/* @effect A B < == if A < B
then 1 else 0 */` — that is Lean's `if`, verbatim.

### 3.5 `@rec-effect` — recursive words (proposed, not built)

A different tag for recursive words, because they need a
different interpreter and a different proof shape:

```forth
/* @rec-effect N fact == N! when 1 <= N */
```

What the tag would mean:

- Use the **fuelled** interpreter from `Fact.lean`
  instead of the fuel-free one, and emit a theorem with a
  fuel bound, e.g. "for all `n ≥ 1`, any fuel `≥ 9*n`,
  `run fuel [call fact] [n] = [factNat n]`".
- The generator can **measure** a candidate bound — run
  the Python mirror on `n = 1..6`, count steps, fit the
  linear bound — but measuring gives a candidate, not a
  proof that it always suffices.
- The proof still needs **induction** (strong induction
  on `n`, fragment lemmas for one unfolding of the body,
  as in `Fact.lean`). For one pattern — recursion on
  `n-1` — that induction structure is templatable, and a
  generator could plausibly emit it. For recursion in
  general, it cannot; the induction is the human part.
- So `@rec-effect` means "emit the fuelled theorem and
  the induction skeleton, and tell me where the human
  proof goes", not "prove this automatically".

### 3.6 `@given` — variables outside a definition body (proposed)

Inside a definition, the `@effect` binds the variables.
Outside a definition there is nothing doing that binding,
so a snapshot like `/* @snapshot c a b */` on top-level
code is meaningless on its own. Two cases:

- **Concrete** (the common one): the snapshot is just
  literals, and needs no binder at all:
  `1 2 3 rot /* @snapshot 3 2 1 */ .` — the generator
  checks it directly, and Lean proves it by `rfl` with
  no binders. (This is also what the TAP tests already
  are, for the final stack; this lets you put one in the
  middle.)
- **Symbolic**: you need a binder. Proposed directive,
  mirroring Lean's own `variable` command:
  ```forth
  /* @given a b c : Int */
  /* @given rest : Stack */
  a b c rot /* @snapshot c b a */
  ```
  In Lean that becomes the binder line, exactly as
  `@effect` produces it.

Open decision (see §7): scope of `@given`. Proposal:
whole-file from that point on, reset by a new `@given`
(the Lean `variable` rule). Alternative: applies only
to the next snapshot/effect. The proposal is simpler
and matches Lean; the alternative is more explicit.

### 3.7 `@induction` and `@lean` — the proof skeleton and the primitive (decided 2026-11-18)

**The inversion (decided 2026-11-18):** the primitive
is *verbatim Lean in a comment*, and every other
directive is sugar over it. A user can add full Lean
code in a comment (with a tag) that is embedded
verbatim into the Lean output; `@effect`, `@snapshot`,
`@step`, `@induction`, `@given` are sugar — they
desugar into the Lean the generator would have
written by hand. The generator is therefore two
things: a *macro expander* for the sugar, and a
*paster* for the verbatim code. There is no cliff: a
user who outgrows the sugar does not leave the system,
they just write more verbatim Lean. The `.ff` file is
a surface over Lean, and Lean is the IR — this is the
earlier "Lean is the checker/IR" decision carried
through. The sugar is checked because its expansion
is checked; the verbatim code is checked because Lean
checks it. Everything in the `.lean` file is Lean,
and Lean checks all of it.

**`@lean`** is the primitive tag (it names the
language, not a role — the content can be a
definition, a helper lemma, a theorem statement, a
proof, anything). It is pasted verbatim into the
generated `.lean` file, in file order, at the point
where it appears relative to definitions, marked with
a comment `-- @lean from <file>:<line>, pasted
verbatim`, so it can be traced back.

**`@proof`** is now *sugar* on top of `@lean`, not a
separate mechanism: a `@proof` block immediately
following a definition with an `@effect` *replaces*
the generated proof attempt for that word's theorem.
Its content is the proof body for the theorem the
`@effect` generated — a tactic block, starting with
`by` (or tactic lines the generator wraps in `by`).

**`@induction`** names the induction pattern for a
recursive word, as a claim the generator verifies
against the body (it checks the recursive call really
gets that argument; a wrong pattern fails fast). It is
a name from a fixed catalogue of templates the
generator knows, not a free-form description:

```forth
/* @rec-effect N fact == N! when 1 <= N */
/* @induction strong on n, recursive call on n - 1 */
fact: dup 1 - [(fact)] ? ;
```

```forth
/* @induction strong on n, recursive call on n / 4 */
```

The pattern says: which variable to induct on, which
principle (ordinary vs strong), and what argument the
recursive call gets. The hand work is once per
*pattern*, not once per word — ten words recursing on
`n - 1` share one template. The generator could also
infer the pattern from the body, but writing it down
makes it a checked claim visible to the reader, and it
resolves ambiguity (a word with two recursive calls on
different arguments).

How the sugar desugars (each of these is already
visible in the generated output today, which is what
makes the sugar transparent — the `.lean` file *is*
the documentation of what the sugar expands to):

- `@effect` → a theorem statement (from the effect
  notation) + a proof attempt (the ladder).
- `@snapshot` → a lemma about the prefix program +
  the chaining step (`exec_append`).
- `@step` → an equation / lemma used in the proof.
- `@induction` → the induction tactic invocation +
  the induction-hypothesis application (the template).
- `@given` → binder lines.

```forth
/* @effect X Y swap == Y X */
/* @proof
  by
  intro fuel hf
  obtain ⟨f, rfl⟩ : ∃ f, fuel = f + 1 := ⟨fuel - 1, by omega⟩
  simp [run]
*/
```

(That is the real proof body of `swap_spec` from
`Swap.lean`, shown here as the shape a `@proof`
block takes; the generated ladder already proves
`swap`, so this is illustrative, not needed.)

Rules for the verbatim code (carried over from the
earlier `@proof` design, and now applying to `@lean`
too):

- The generator does **no** checking of the Lean
  content itself — it pastes it, and Lean checks it.
  A wrong proof fails to compile, same as a wrong
  effect. Nothing in the `.ff` file is ever trusted.
- The verbatim author needs to know the generated
  names: the theorem's binders, the interpreter
  (`run` / `exec`), the program name (`<word>Prog`).
  Those names are part of the generator's contract
  and must be documented where the generator is
  documented, not left to be guessed. This matters
  *more* now than it did for the escape hatch, because
  writing Lean against the generated code is routine,
  not an emergency — which also means the generated
  Lean must stay clean and readable, not compact
  machine output.
- **No `sorry` / `admit` / `axiom` in verbatim
  blocks.** The generator rejects them up front
  (and refuses to emit the file), so the verbatim
  mechanism cannot smuggle an unproved claim past
  the checker. Lean's `#print axioms` is the
  backstop, not the only line of defence.
- Keep the Lean in the `.ff` file **short**. If a
  proof is long, it belongs in a separate `.lean`
  file that the generated file imports, not in a
  comment. The verbatim mechanism is for a tactic
  block or a helper lemma, not for a whole
  development. (A later extension: a reference form,
  e.g. an `@lean-file`, for long code — not needed
  now.)
- When a word has both a generated proof attempt and
  a `@proof` block, the `@proof` wins, and the
  generator reports "using hand-written proof for
  `<word>`" so it is visible, not silent.

Discipline, so `.ff` files do not fill up with Lean:
use the highest-level sugar that works, and drop down
only when it does not — generated ladder first, then
the structured skeleton (`@induction` + `@snapshot` +
`@step`), then `@lean` / `@proof`. The generated file
staying readable is what lets a user learn, from the
expansion, what to write by hand when they outgrow
the sugar.

## 4. The pipeline

```
.ff files  →  [parse]  →  Tok lists + dictionary
@effect    →  [parse]  →  Lean theorem statement
```

The generator is two things (decided 2026-11-18):
a *macro expander* for the sugar directives, and a
*paster* for verbatim `@lean` blocks. Each directive
expands into the Lean it stands for (see §3.7 for the
desugaring table), the `@lean` blocks are pasted
verbatim in file order at the point where they
appear, and the two are concatenated into the
`.lean` output.

Steps, in order:

1. **Parse** definitions and `@effect` / `@snapshot` /
   `@given` comments. (Prototype: Python, in
   `generate.py`. Long term: read the TypeScript
   preprocessor's flattened output instead of raw `.ff`
   files — see Phase 7.)
2. **Inline** calls to other words defined in the same
   file. Non-recursive only; a recursive call is refused
   with a clear message.
3. **Emit** self-contained Lean: a fuel-free interpreter
   (`exec`, recursion on the program list only), each
   inlined program as data, and a theorem per effect /
   snapshot. Proof attempt, in order:
   `rfl`, then `simp [exec, step]`, then
   `(simp [exec, step]; omega)`.
4. **Lean checks it.** Clean compile = the definite
   "yes". `#print axioms` audits what the yes depended
   on; `sorry` / `sorryAx` anywhere is a red flag, and
   the generator never emits `sorry` as if it were a proof.

Design decision (Nov 18, 2026 — "at least for now"):
the generator is a **pure translator** and does not
mix in testing. There is no Python mirror interpreter
and no concrete check inside the generator (the
prototype built Nov 17 had one: `py_exec`, sample
values 1, 2, 3, …, counterexample, no theorem emitted
on failure). Testing belongs to the interpreters and
the unit tests, which can run anywhere — the TAP
tests, the real engines. The generator always
generates Lean for every word in the supported
fragment, and that Lean is piped to the `lean` CLI or
saved independently (`generate.py in.ff | lean`, or
`generate.py in.ff out.lean`).

Tradeoff, stated plainly: without the concrete check
the generator loses its definite "no". A wrong effect
now produces a theorem that Lean fails to prove, and
that failure is ambiguous — wrong effect, or true
effect with a proof too hard for the ladder — where
the mirror used to separate the two with a
counterexample. The check for a wrong effect is now
the unit tests (which check the program, not the
effect) and Lean itself. A later option that keeps
the separation: the generator emits `#eval` lines in
the Lean output that compute the program on sample
values, so the concrete check lives in the generated
Lean (visible, run by `lean`) rather than in the
generator — the generator still runs nothing, it
only writes Lean.

Trust boundary, stated plainly: the **parser is in the
trust base** for *what* is being proved — if it
mistranslates a definition, Lean will happily prove a
true statement about the wrong program. Lean checks the
*proof*, not the translation. That is why the generated
file is human-readable (inlined program as plain data,
original `@effect` as a comment above each theorem), so
the translation can be eyeballed. (The Nov 17 prototype
also had a Python concrete check as a second line of
defence for the translation; per the Nov 18 decision
the generator no longer runs one — see the design
decision above.)

The two interpreters:

- **Fuel-free `exec`** (prototype, `Rot.lean` /
  `generate.py`): recurses on the program list only.
  Only works for words whose inlined program is finite
  — i.e. non-recursive words. `rot` needs no fuel.
- **Fuelled `run`** (`Fact.lean`): takes a fuel
  countdown, returns `none` at 0. Needed because Lean
  requires every function to terminate, and calling a
  word can loop (`fact 0`). Fuel is a bound, not an
  exact count; running out gives `none`, never a wrong
  answer.

## 5. Implementation phases

### Phase 0 — Prototype (DONE, 2026-11-17)

Generator v1, `Fact.lean`, `Rot.lean`, `Snapshot.lean`
(proof of concept only). See §2 for the verified results.

### Phase 1 — `@snapshot` in definitions

Goal: snapshots inside a word body become provable lemmas,
and the final effect is proved through them.

- Parse `@snapshot` comments in a definition body; split
  the body into segments at each snapshot.
- Emit one lemma per snapshot (`<word>_snapshot_1`, …),
  each about the prefix up to that point; concrete-test
  each snapshot in Python first (same as effects), so a
  wrong snapshot gives a counterexample at that point.
- Emit the `exec_append` chaining lemma once per file,
  and prove the final `@effect` by rewriting with the
  snapshot lemmas in order.
- Weak form first: primed variables are fresh names.
  `where` on snapshots comes in Phase 3.
- Deliverable: `generate.py` v2 + a test `.ff` file with
  a two-snapshot word (e.g. `rot` with a snapshot after
  `bury`, then the existing `Snapshot.lean` regenerated
  by the generator instead of hand-written).
- Done when: the regenerated `Snapshot.lean` compiles
  clean, and a deliberately wrong snapshot fails with
  the failure naming that snapshot (not the final effect).

### Phase 2 — Multiple `@effect` + `when`

Goal: a word can have several cases, each conditional on
its inputs.

**`when` is DONE (Nov 18, generator v8, single-effect form):**
parse `when <cond>`, emit it as a hypothesis `(hw : <cond>)`
(the name `hw` is reserved), and pass `hw` to `simp` in the
proof ladder — `simp` needs it to discharge the div-by-zero
guard in the `%` step, and it needs the program `def` unfolded
too. The `if … then … else …` form in output expressions is
also done (the expression translator parses it).

**Multiple effects and `ERROR` are DONE (Nov 18, generator v9):**
a word may have several `@effect` comments, one per case; each
becomes a theorem, named `<word>_effect_1`, `<word>_effect_2`,
… in file order (a single effect is just `<word>_effect`), and
the program `def` is emitted once and shared. An effect whose
whole output is `ERROR` states the word fails
(`exec … = none`); `ERROR` must be the whole output and never
appears in the inputs. The `%` case is the proof: `mod_effect_1`
(`when B != 0`) and `mod_effect_2` (`ERROR when B == 0`), both
`lean` exit 0, axioms `[propext]` only. The ladder changed in
the same version to `first | rfl | (simp [exec, step, <prog>,
hw?]; try omega)` — see §4 for why there is no bare `simp`
alternative (it shadows the `omega` alternative) and why the
`try` is load-bearing (a bare `omega` after a closing `simp`
fails with "no goals to be solved"). What remains in this phase
is the test cases `abs` (two effects), `a b <` (needs `<` as a
primitive first), and the negative `isqrt` case (needs `/`
first). Comparisons `<`, `=`, `>` landed Nov 18, 2026
(generator v12): the step is `if a < b then 1 else 0`
(and the analogues), and the effect uses a `where`
clause (`/* @effect A B < == F where F = if A < B then 1
else 0 */`) because an if-then-else cannot be an output
element (spaces separate stack elements). The generator
now rejects `if`/`then`/`else` as stack elements with a
clean problem pointing at the `where` form, and never
treats those keywords as variables. Bitwise `|`/`~` and
power `^` landed Nov 18, 2026 (generator v13): `lor` is
De Morgan over `land` (verified against JS BigInt),
`~a = -a - 1`, `^` is `a ^ b.toNat` with a negative-exponent
guard. The `^` success case exposed a ladder limit: simp
cannot discharge an `if` that is the scrutinee of a `match`
from a merely-equivalent hypothesis (`0 ≤ b` vs the guard
`b < 0`), so guarded primitives whose `when` is not the
guard itself get a `have hguard : ¬ <guard> := by omega`
before the ladder (GUARDS table in generate.py). The
`have` is emitted only for a primitive word, not for a
defined word that happens to inline to a guarded token.
`when ... else ERROR` landed Nov 18, 2026 (generator
v14): a `when` may end in `else ERROR` (`/* @effect a b ^
== A^B when 0 <= B else ERROR */`), meaning the word
fails when the condition does NOT hold. It desugars into
two theorems (success with `when <cond>`, error with
`when` the negated condition), numbered `_1`/`_2`. The
negation swaps a simple comparison's operator (`b != 0`
→ `b == 0`, `0 <= b` → `b < 0`, normalised to the
`<`/`<=` form so it matches the guard), drops a `¬`, and
wraps anything else in `¬ (...)`. `else` with anything
but `ERROR` is not supported (a clean problem); `else
ERROR` with no `when` is also a clean problem. A `where`
on an `else ERROR` effect applies to the success case
only (the error case has no output). Division `/` landed
Nov 18, 2026 (generator v15): `tdiv a b = (a - tmod a b) / b`
(verified against JS BigInt on 10 values), the translator
maps `/` to `tdiv`, and `/` joins the GUARDS table (`{top}
= 0`). The effect is the one the user wrote:
`/* @effect A B / == A/B when B != 0 else ERROR */`. Two
things to note: before `/` was a primitive, `a/b` in an
output expression passed through raw as Lean's Euclidean
`/` (because `/` was not in the tokenizer or `_BINPREC`
at all, so `needs_translation` never fired) — a silent
mistranslation for negative operands; and adding `/` to
the tokenizer's op group briefly broke the regex (a
doubled backslash before `*`, caught by the error-case
test failing to parse `(b = 0)`). That closes the
`/`-dependent negative-isqrt test case in Phase 2; the
`abs` test case (quotations) remains.

Shifts + getc (DONE, generator v17, Nov 18, 2026): `<<`
and `>>` are the JS BigInt shifts. A negative count does
NOT throw — it reverses direction (`5 << -1 = 2`,
`5 >> -1 = 10`), verified against JS BigInt, so there is
no guard and no `when` is needed; the helpers `shl` /
`shr` reverse instead (`shl a b = if 0 ≤ b then
a * 2^b.toNat else a >>> (-b).toNat`, `shr` the mirror
image). `>>>` is Lean's arithmetic shift right (Int, Nat
count); `<<<` does NOT exist for Int, so `<<` is
multiplication. (An earlier note said negative shift
counts throw — that was wrong; the engine uses BigInt
`<<=` / `>>=`, which reverse.) `getc` reads one byte
from the input stream and pushes it (EOF pushes 0):
`getc == N {reads char}`; the output variable is the
head of the input stream, so it is a binder, not an
existential. The EOF case needs a way to say the input
stream is empty, which the notation does not have yet.
The byte range (v18, Nov 18, 2026): a byte is 0..255, so
the form is `getc == N {reads char} where 0 <= N ∧ N < 256`
(or `n <= 255`); the `where` becomes a hypothesis on the
binder (`_hbyte`, underscore-prefixed because the proof
does not use it -- the step pushes `n` regardless), not an
existential. A wrong range is a clean problem.
All primitives are now done except quotations and
STASH/FETCH (Phase 8).

Cleanup (v19, Nov 18, 2026, user-directed): the help
(module docstring) moved to `HELP.md` and the Lean preamble
(`LEAN_PREAMBLE`) moved to `preamble.lean` (loaded at runtime,
`{src}` replaced with the input filename); `main()` split
into `parse_args` / `extract_effects` / `parse_definitions` /
`inline_word` (top-level) plus an `EmitCtx` dataclass
(`prepare()` validates and computes the derived fragments,
`emit()` dispatches to one `emit_*` function per word kind)
and a `--help` flag. Dead code removed (`order` list,
`rest_arg`). No behavior change: all 12 example outputs are
byte-identical to v18, all prove, `wrong.ff` still fails,
`recursive.ff` still refused, and the known gaps are
unchanged (the `when`-placeholder silent bug and the `==`
word-name misparse are still present — they belong to the
pending cheap-vs-clean decision, §7 items 7–8).

Named rest + new syntax (v20, Nov 20, 2026, user-directed):
`rest.length` support is dropped — `rest` / `rest.length` in
an effect are now clean problems. The replacement is a named
rest `..R` at the far left (same name on both sides when it
appears on both; an output may not name a rest the input did
not name) plus `R.length` for its length, which translates to
`(R.length : Int)`; a `.length` base that is not the effect's
rest binder is a clean problem. The generator also accepts
the new syntax: a `word:` prefix (any token, including
symbolic words) and `requires`/`ensures` as aliases for
`when`/`where` (normalised in `parse_effect`); the old
spellings still work. `examples/depth.ff` and the first line
of `examples/where.ff` moved to `..R`/`R.length` (they used
`rest.length`); `primitives.ff` (27 effects) is now written
in the new syntax and generates 30 theorems, all proving.
All 12 examples still regenerate and prove, `wrong.ff`
still fails, `recursive.ff` still refused. `cons`/`eval`/`?`

Source markers + check.py (v21, Nov 20, 2026, user-directed):
the generator now records each @effect's source line
(`extract_effects` returns (line, body) pairs) and emits a
`-- src: <file>:<line> <effect>` marker above every theorem,
carrying the full statement as written. A separate driver,
`check.py`, runs the generator, passes the output to
`lean --json`, and maps each Lean error to the nearest marker
above its line, reporting failures as `<file>:<line>: <effect>`
plus the Lean message and goal (errors from one theorem
grouped under its statement). The generator stays a pure
translator -- no Lean invocation or JSON parsing in it. Exit 0
when every theorem proves, 1 otherwise. Verified Nov 20:
`check.py` on `ff/lib/core/core.ff` reports the two known
failures (bury, bxor) with their source lines; on
`primitives.ff` it reports 30/30 proved; all 12 examples
still prove with the same theorem counts, `wrong.ff` still
fails (1 failed), `recursive.ff` still refused (generator
problem, exit 1).

`--tap` (Nov 20, 2026, user-directed): `check.py --tap` emits
TAP version 13 on stdout instead of the friendly report -- one
test per emitted theorem in file order, named `<effect>
(<file>:<line>)`, generator problems as extra `not ok` tests,
Lean messages as `#` diagnostics -- so `prove` can run it
(`prove --exec "python3 check.py --tap" in.ff`). TAP version
13, not 14: this system's `prove` does not know 14 (the same
quirk as the `.ffp` TAP run under `prove -v`). The friendly
report stays the default for running by hand; in TAP mode the
temp-file path goes to stderr, never stdout. The `test:lean`
chomp task now runs `prove --exec "python3 check.py --tap"`
over `ff/__tests__/primitives.test.ffp` (same pattern as the
other chompfiles' `test:tap`), so its summary is prove's
quick one. Nov 20, 2026 (user-directed): `ff/lib/core/core.ff`
added to the same task, so `test:lean` now covers both files;
until bxor's fix lands the task fails on core.ff's test 25.
TAP-only (Nov 20, 2026, user-directed): `check.py` no longer
has a friendly report or a `--tap` flag -- TAP version 13 is
the only output, on stdout, with the temp-file path on stderr.
The `test:lean` chomp task now runs `prove --exec "python3
check.py" ...` (no flag). Running `check.py` by hand still
shows the failure detail, as `#` diagnostics under the failing
test's name.
`lxor` / `⊕` + the parenthesization fix (v22, Nov 20, 2026,
user-directed): the preamble gains `@[simp] def lxor (a b :
Int) : Int := lor (land a (-b - 1)) (land b (-a - 1))` -- the
standard xor definition in terms of land/lor (F♭m has no xor
operator; `^` is power). `@[simp]` matters: `simp` does not
unfold a plain `def` unless it is in the simp set, and the
ladder only passes `run, exec, step, <prog>`. The generator
learns `⊕` as an effect operator (precedence 65, same as
Lean's `^^^`; emitted as `lxor` with parenthesised operands),
and `_emit_expr`'s `"bin"` case now parenthesises the operands
of all six prefix operators (`tmod`/`tdiv`/`land`/`lor`/`shl`/
`shr`) -- without parens a nested application misparsed
(`land lor a b ...` read as `((land lor) a) b`, a type error).
`core.ff`'s bxor ensures becomes `x = a ⊕ b`. Verified Nov 20
on the VM: `a ⊕ b` translates to `(lxor (a) (b))`; `lxor 5 3
= 6` by `rfl`; `simp` unfolds `lxor` to the combination; the
VM's `core.ff` (old bxor ensures) now fails bxor as unsolved
goals (`lor (...) = land (lor a b) ...`, no more type
mismatch); all 12 examples still prove with the same counts,
`primitives.ff` 30/30, `wrong.ff` still 1 failed,
`recursive.ff` still refused.
 Verified on the VM: `prove` over `primitives.ff`
reports PASS (30 tests); over `core.ff` FAIL (2/30, tests 11
and 25 -- bury and bxor); over `recursive.ff` FAIL (1/1,
the generator problem as a `not ok` test).
Synonyms / f() forms + Lean operators (v23, Nov 20, 2026,
user-directed — "allow the f() forms and the LEAN
equivalents"): every bitwise/shift/power operation now has
three spellings in effects — the F♭m symbol, Lean's operator,
and the f() form — all emitting the same helper: `&`/`&&&`/
`land(a,b)` → `land`; `|`/`|||`/`lor(a,b)` → `lor`; `⊕`/`^^^`/
`xor(a,b)` → `xor`; `~`/`~~~`/`lnot(a)` → `lnot`; `<<`/`<<<`/
`shl(a,b)` → `shl`; `>>`/`>>>`/`shr(a,b)` → `shr`; `^`/`pow(a,b)`
→ power. The generator's tokenizer matches the three-character
Lean operators before their one-character prefixes (`&&&`
before `&`, `<<<` before `<<`, `~~~` before `~`), with the same
precedences as the F♭m symbols. `needs_translation` needed only
`⊕` added: the Lean operators all contain their ASCII operator
as a substring (so the existing checks catch them) and every
f() form is caught by the call regex. The preamble renames
`lxor`→`xor` and gains `@[simp] def pow` and `@[simp] def
lnot` (both load-bearing: the program computes `a ^ b.toNat` /
`-a - 1` directly, so the statement's `pow`/`lnot` must unfold).
`and`/`or` are NOT renamed: Lean core's Bool `and`/`or` make
bare `and`/`or` ambiguous as function names (the renamed
preamble failed to elaborate with "Ambiguous term and" — the
earlier def-only probe was misleading, it never tested a use),
so `land`/`lor` stay (they are also Lean's `Nat.land`/
`Nat.lor` names). In a direct output an f() call takes no space
after the comma (`land(a,b)` — the output is whitespace-split,
so `land(a, b)` would split into two elements); in an `ensures`
clause spaces are fine. `examples/synonyms.ff` (12 theorems,
one per spelling) proves; all 12 original examples still prove
with the same counts, `primitives.ff` 30/30, `wrong.ff` still 1
failed. The VM `core.ff` + two extra bxor effects (`a^^^b`,
`xor(a,b)`) checks 30/32 — the two new bxor spellings prove,
only bury and the old unprovable bxor form fail (pre-existing).
PC verification pending.
(Nov 20, user-directed): recorded in `primitives.ff` as
plain `effect` statements, NOT `@effect` — the generator
skips them, so the file keeps proving 30/30. UPDATE Nov 20 (evening): the model landed — `cons`, `eval`, and
`?` are all live `@effect` and prove (primitives.ff 34/34). The
`?` draft's TWO quotation slots were wrong: the runtime's `?`
(IF) takes ONE quotation + a flag (verified from engine.ts;
`sort2` uses it that way). The corrected one-quotation forms
(`..R F [..R -- ..S] == ..S requires F != 0`; `..R F [..R --
..S] == ..R requires F == 0`) were approved by the user Nov 20
evening (widget tap) and flipped the same night.

Quotation model (v24, Nov 20, 2026, user-directed — "Get
eval, ? and cons working"): NO `Val` type; the stack stays
`List Int`. The preamble gains a `userDefs` table (`Defs :=
List (List Tok)`; a quotation is an `Int` op code, the fresh
code is `defs.length`, `lookup` guards negative / out-of-range
codes) and a fuelled, defs-aware interpreter `execQ` / `runQ`
alongside the existing `exec` / `run` — the old interpreter is
untouched, so all 60 existing theorems still prove. `execQ`
recurses on fuel (a Nat): `eval` pops an op code and splices
its looked-up body into the program, `call` runs a literal
code, `cond` (`?`) pops a quotation + flag and runs the body
only when the flag is non-zero, `cons` pops `a` and `[B]`,
allocates a fresh code, stores `[push a, call B]`, and pushes
the code. `step` returns `none` for these four tokens (the old
interpreter never runs them). The empty-program case of `execQ`
matches ANY fuel (it is the first case) — an empty program
needs no fuel — so `execQ fuel [] ...` reduces for a variable
`fuel`, which the cons/discard proofs need. The generator
(v24) parses `[...]` slots bracket-aware (`_split_elems` keeps
a bracketed group as one element), adds `eval`/`?`/`cons` to
PRIMS, and emits runQ theorems: `eval` and the `?` run case
are conditional on the body (`lookup defs q = some body` and
`runQ fuel body r ... = ok s` as hypotheses, fuel universally
quantified, dispatch `fuel + 1`, body `fuel`); `cons` states
the fresh code and the new table entry directly; the `?`
discard case states the stack unchanged. Verified VM (Lean
4.22.0): `runQ` spot checks 7/7 (eval, cons, cond both
branches, unknown code, cons-body eval, out-of-fuel); the
four prototype theorems prove; a test file with all four
statements generates 4 theorems, 0 problems, Lean exit 0;
primitives.ff 34/34 (was 30/30; eval + cons flipped Nov 20
evening, `?` flipped the same night after the user approved
the corrected one-quotation forms); full regression green
(all examples at previous counts, wrong.ff 1 failure as
designed).

Quotation-slot shorthand (Nov 20 evening, user preference,
NOT implemented): `[..S]` means a quote that, when
evaluated, pushes the `s` values — body effect `[..R --
..R ..S]`, rest preserved. `[S]` (bare capital) is shorthand
for `[..R -- ..S]` — the body maps `..R` to `..S`, rest
replaced. So `eval` is `..R [S] == ..S`, and the `?` run
case is `..R F [S] == ..S requires F != 0`. This resolves
the `[A]` ambiguity: `[A] == ..A` read as "pushes" (giving
`..R ..a`) was the wrong expansion for eval; the "pushes"
meaning now belongs to `[..S]`, and `[S]` is the
replacement form. Open: `[B]` in `cons` would now also read
as `[..R -- ..b]`, so `cons`'s theorem would carry B's
body-effect as a premise (still true, weaker than the
current no-premise form) — whether that is acceptable is
undecided. `[a B]` (Nov 20 evening, user): `cons`'s output
quotation, shorthand for `[a [..R -- ..b] eval]` — body is
push `a`, push B, eval (the engine's `[push a, call B]`),
with B's effect `[..R -- ..b]` stated. As a quotation its
effect is `[..R -- ..S]`-shaped, `[..R -- ..b]`. The first
guess `[a ..R -- ..b]` was wrong (it would make `a` an
input, but `a` is pushed by the body). Implementation note:
the shorthand nests brackets, and the generator's
`_split_elems` finds the first `]` (no depth counting), so
it would mis-split today — the notation is right, the
parser would need a depth-counting matcher.

Notation decision (Nov 20 evening, user-directed): keep
the EXPLICIT `[..R -- ..S]` notation for now — no `*`,
no `[S]` shorthand. The user suspects `seq` will need a
new notation there too; revisit when reaching `seq`.

`...` as an unnamed rest in quotations (v25, Nov 20
evening, user-directed): `...` was already accepted as an
unnamed rest in regular effects (`_rest` canonicalises
`…` and `...` to `"..."`), but the quotation path
(`prepare_quot`) required a NAMED rest (`..R`) — `eval:
... [..R -- ..S] == ..S` was a clean problem ("eval
needs `..R [..R -- ..S] == ..S`"). V25 accepts `...` in
quotation effects too, via a new `_quot_rest_or(tok,
fallback)`: a named rest `..x` gives `x`; `...` takes the
fallback. For `eval`/`?` the fallback is the slot's rest
name (input slot rest for the input, output slot rest for
the output); for `?` the output `...` is disambiguated by
the `when` clause — run (`f != 0`) takes the slot's output
rest, discard (`F == 0`) takes the input rest (unchanged).
For `cons` there is no slot rest to borrow, so `...` takes
an invented name `r`, collision-free against the value,
the quotation, and the fixed `defs`/`fuel` binders
(`r`, `r_`, ...). The error messages now say "`...` is
accepted as an unnamed rest". Verified (VM, Lean 4.22.0):
all five `...` forms generate and prove — `eval` with
`...` input, `eval` with `...` input and output, `?` run
with `...` input, `?` discard with `...` input and output,
`cons` with `...` input and output — 5 theorems, 0
problems, Lean exit 0. Full regression GREEN under v25:
primitives 34, arith 5, bitwise 4, comparisons 3, depth
1, dup 1, else-error 8, getc 1, io 6, rest 3, shifts 3,
shuffles 7, synonyms 12, where 3 — all lean_exit=0;
recursive 0 (1 problem, as designed); wrong.ff 3
theorems lean_exit=1 (1 failure, as designed). `cons`
strength (Nov 20 evening): `cons`'s theorem states the
body `[push a, call B]` explicitly in the `defs` entry,
so it is strong enough to derive composite effects by
unfolding. `1 [B] cons eval` has effect `..R == ..B` (B's
result when run on `..R 1`) — the same as `1 [B] eval`.
Verified in Lean (VM): with B's body `[push 5]`, `runQ`
on `[push 1, push B, cons, eval]` gives `[5, 1]`, the same
as running B's body on `[1]`, and the resulting `defs`
shows the fresh body `[push 1, call B]`.

Uppercase variables (v26, Nov 21, 2026, user-directed): variables
are UPPERCASE, words are lowercase, in `@effect` and `@law` (a
notation rule, generator-enforced in future; the generator already
accepts uppercase names). `X` alone is a variable integer; `[X]` is
a quotation variable; `..X` is the effect/result of applying the
quote `[X]` (preferred over `X*`, which collides with Kleene star
`a*` in `seq.ffp` — case disambiguates it, but the same suffix with
two meanings is confusing). Laws emit Lean `example` (checked,
unnamed, not stored); effects still emit named `theorem`s. The case
rule is what makes the placeholder/word split unambiguous without a
delimiter or a `.` prefix: an uppercase `X` in a comment can never
refer to a word, because F♭m lowercases every word name (a word
defined as `X:` *is* the word `x`). Migration: `primitives.ff`
(34 theorems) and `ff/lib/core/core.ff` (30 theorems) rewritten
with uppercase value variables (`A`, `B`, `N`, `F`, …) and rest
variables (`..R`, `..S`, `R.length`); the plain `effect` statements
in `core.ff` (slip, dip, run, sip, sipd, sort2, between?, choose,
branch) likewise; the old-syntax comments (`[A] b slip == a* b`,
etc.) left alone. The `q<`/`q>` words stay lowercase (they are words,
not variables). Also fixed (v26, found while testing the uppercase
forms): a pre-existing `UnboundLocalError` crash in `prepare()` —
`in_empty` was used at the rest-naming check before it was assigned
(a malformed effect whose output names a rest the input does not
name crashed instead of returning a clean problem). `in_empty` /
`out_empty` are now assigned before the check; the malformed case
returns the clean problem "the output names a rest ..S that the
input does not name". Full regression GREEN under v26 (VM):
primitives 34, core 30, all examples as under v25, Lean exit 0.
The `examples/` files still use lowercase variables (not migrated);
the generator accepts both cases, so they still pass.

`#R` shorthand for `R.length` (v27, Nov 21, 2026, user-directed):
`#R` means the length of the named rest `..R`, i.e. `(R.length : Int)`
in Lean. It works as a direct output (`depth: ..R == ..R #R`) and
inside expressions (`empty?: ..R == ..R F ensures F = if #R = 0 then
1 else 0`). Implemented in the expression tokenizer (a `hash` token,
`#` + identifier — the `#` is escaped in the `re.VERBOSE` pattern,
where a bare `#` starts a comment) and the Pratt parser (a `hash`
token becomes the same `restlen` AST node as `R.length`); `#` was
added to `needs_translation`, and the rest-binder validation now
checks `#Name` the same way it checks `Name.length` (a `#X` whose
`X` is not the effect's named rest, or a `#R` with no named rest,
is a clean problem, not a Lean error). `depth` (primitives.ff) and
`empty?` (core.ff) now use `#R`; `R.length` still works as the long
form. Verified (VM): `depth` and `empty?` with `#R` generate and
prove; the two bad cases give clean problems. Full regression GREEN
under v27 (VM): primitives 34, core 30, all examples as under v25,
Lean exit 0.

Queue-polymorphic quotation theorems (v28, Nov 21, 2026,
Phase 6 foundation): `eval` / `?` / `cons` are now stated
with `execQ` and a universally quantified queue variable
`qq` instead of `runQ` with an empty queue. The body
hypothesis is `execQ fuel body R qq [] [] [] defs =
(Outcome.ok S qq [], defs')` and the conclusion is
`execQ (fuel + 1) <word>Prog <in-stack> qq [] [] []
defs = (Outcome.ok <out-stack> qq [], <defs'>)`; the
proofs are the same shape as before (`simp [execQ,
<word>Prog, ...]`, `exact hbody` where there is a body).
The old `runQ` form is the `qq = []` special case. This
is the foundation for quotation composition (Phase 6
lemma application): a word like `slip` (`q< eval q>`)
stashes a value on the queue while `eval` runs the body,
so the body's effect must be usable with a non-empty
queue — which the old empty-queue form could not do.
Verified (VM): the queue-polymorphic `eval`, `cons`,
`cond` run, and `cond` discard theorems all prove by
hand with the same proof shape; the generator's v28
output proves as well. Full regression GREEN under v28
(VM): primitives 34, core 30, all examples as under
v25, Lean exit 0; wrong.ff 3 theorems, Lean exit 1
(1 failure, as designed).

Phase 6 runQ path (v29, Nov 21, 2026): the two
composition lemmas are proven and in the preamble —
`execQ_ok_mono` (fuel monotonicity) and `execQ_append`
(running `p1 ++ p2` is running `p1`, then `p2` on the
result; its second hypothesis is universally quantified
over the leftover input/oracle, because `execQ`'s `ok`
result does not return them). Axioms for both: [propext,
Classical.choice, Quot.sound] (standard only). A defined
word whose inlined program contains `eval` now gets a
runQ theorem (execQ with a queue variable `qq`) instead
of a `run` theorem: the generator splits the program at
`eval` into a prefix and a suffix, simulates the prefix
on the symbolic stack/queue (shuffles and `q<`/`q>` only)
to find the stack and queue at the dispatch point, and
proves the theorem by `execQ_append` joining the body's
effect (the hypothesis, with the queue at dispatch time)
and the suffix. Fuel is `fuel + len(prefix) +
len(suffix) + 2` (each prefix token 1, the dispatch 1,
the body `fuel`, the suffix, plus `execQ_append`'s +1
slack) — so `slip` needs `fuel + 4`, not `fuel + 3`.
Only one `eval` is supported; `?`/`cons` in a defined
word, a `where`/`when` clause, an ERROR effect, and a
prefix/suffix token that computes a value are clean
problems. `core.ff` flipped (Nov 21): `slip`, `dip`,
`run`, `sip` are now `@effect` (34 theorems, up from
30), all proving. The remaining plain-effect words
(`sipd`, `sort2`, `choose`, `branch`, `between?`) and
the no-effect words (`dipd`, `bi`, `bi2`, `or_else`,
`and_also`) are blocked on quotation literals (`[X]`),
which `inline_word` still refuses. Full regression
GREEN under v29 (VM): primitives 34, core 34, all
examples as under v25, Lean exit 0; wrong.ff 3
theorems, Lean exit 1 (1 failure, as designed).

Quotation literals (v30, Nov 21, 2026): a defined word
whose inlined program contains a quotation literal
(`[X]`) now gets a runQ theorem too, provided the literal
is run by a single `eval`. The mechanism (validated by a
hand-proof of `sipd` first): each literal becomes a code
variable `litK` (a theorem binder) with a hypothesis
`lookup defs litK = some <body>` where `<body>` is the
literal's program (`sipProg` for a single-word literal
`[sip]`, a literal list for a multi-token one); the word's
`Prog` def takes the codes as parameters (`def sipdProg
(lit0 : Int) : List Tok`). The simulator expands a literal
at its `eval` — splicing the body's tokens into the stream
— and stops at the first `eval` on a variable quotation;
the body's effect is the hypothesis with the queue at that
inner dispatch point (for `sipd` the queue is `((A) ::
(C) :: qq)`, not the queue at the literal eval). Fuel is
`fuel + steps + len(suffix) + 2` where `steps` counts the
expanded prefix including literal-eval dispatches, so
`sipd` needs `fuel + 13` and `dipd` `fuel + 11`. Bracket
tokenization now counts depth (`[ [dup2] dip eval bury ]`
is one token). Still clean problems: `?`/`cons` in a
defined word, a `where`/`when` clause, more than one
`eval` (the suffix simulation refuses a second one), and
a literal naming a word that itself contains a literal.
`core.ff` flipped (Nov 21): `sipd` (its effect was already
written) and `dipd` (effect derived: `..R A B [..R --
..S] == ..S A B` — the quotation runs on the rest below
A and B, which come back in the same order) are now
`@effect` (36 theorems, up from 34), all proving, axioms
[propext, Classical.choice, Quot.sound]. Remaining
blocked words: `sort2`, `choose`, `branch`, `between?`
(need `?` composition), `bi`, `bi2`, `or_else`,
`and_also` (need multi-eval and/or multi-token literals).
Full regression GREEN under v30 (VM): primitives 34,
core 36, all examples as under v25, Lean exit 0;
wrong.ff 3 theorems, Lean exit 1 (1 failure, as
designed).

`?` composition (v31, Nov 21, 2026): a defined word
whose inlined program contains a single `?` (cond) now
gets a runQ theorem too, proved by a case split on the
flag instead of by `execQ_append`. The mechanism
(validated by hand-proofs of `sort2` and `choose`
first): the word's `?` must run a literal (a concrete
program — a variable quotation is a clean problem); the
simulator handles comparison tokens in the prefix,
producing a Lean if-expression for the flag (`>` gives
`(if A > B then 1 else 0)`); the case split is `by_cases
hf : F = 0` when the flag is a bare variable, or
`by_cases h : C` when the flag is `(if C then 1 else 0)`
(the run branch is `C`, the discard branch `¬C`); the
output is the direct form — the `where` RHS expressions
are substituted into the output stack, so the theorem
states `if`-expressions directly instead of an
existential. Fuel is FIXED (no `fuel` binder, no body
hypothesis): `len(prefix) + 1 + len(body) +
len(suffix)` — `sort2` needs 12, `choose` needs 9. Each
branch closes with `simp [execQ, step, <Prog>,
hlookupLit0, <binder>] <;> omega` (the `<;> omega` is
load-bearing for sort2: simp leaves arithmetic residual
goals about the if-expressions). `core.ff` flipped (Nov
21): `sort2` and `choose` are now `@effect` (38
theorems, up from 36), all proving, axioms standard
(sort2 [propext, Classical.choice, Quot.sound], choose
[propext, Quot.sound]). Remaining blocked words:
`between?` (literal `[sort2]` names a word containing
`?`), `branch` (program contains both `?` and `eval`),
`bi`, `bi2`, `or_else`, `and_also` (multi-eval and/or
multi-token literals) — all need lemma application
(using a proven effect as a black-box hypothesis) or
multi-quotation-token support, which is the next piece.
Full regression GREEN under v31 (VM): primitives 34,
core 38, all examples as under v25, Lean exit 0;
wrong.ff 3 theorems, Lean exit 1 (1 failure, as
designed).

Direct-simp composition (v32, Nov 21, 2026): a defined
word whose inlined program contains exactly one `?` and
one `eval` (the `?` running a concrete literal, the
`eval` last and running a variable quotation) now gets
runQ theorems proved by inlining everything and letting
`simp` reduce the whole program — no `execQ_append`, so
no ∀-over-input/oracle problem. Validated by a
hand-proof of `branch` (choose + eval) first. The word
has two `@effect` statements (one per `when`: `F != 0`
run, `F == 0` discard); each becomes its own theorem
with the `when` condition as hypothesis `hf`, the lit
lookup, both quotation lookups, and the chosen body's
effect as hypotheses. Fuel is `fuel + len(prog) +
len(cond_body)` — `branch` needs `fuel + 10` (9 inlined
tokens + 1 for the `[swap]` body the `?` runs); the
eval dispatch is already one of the inlined tokens, so
there is no extra `+1`. The run case closes with `simp
[execQ, step, <Prog>, hlookupLit0, hlookupQB, hf];
exact hbody`; the discard case needs an
`execQ_ok_mono` lift (the `?` does not run its body, so
the body gets `fuel + 1`, not `fuel`). `core.ff`
flipped (Nov 21): `branch` is now `@effect` (40
theorems, up from 38), both cases proving, axioms
standard (run [propext, Quot.sound], discard [propext,
Classical.choice, Quot.sound]). Remaining blocked
words: `bi` (two evals — direct simp fails: the first
eval sits mid-program, leaving `B_body ++ rest`, which
needs `execQ_append` composition), `bi2`, `or_else`,
`and_also` (multi-eval and/or multi-token literals).
Full regression GREEN under v32 (VM): primitives 34,
core 40, all examples as under v25, Lean exit 0;
wrong.ff 3 theorems, Lean exit 1 (1 failure, as
designed).

Nested-literal composition (v33, Nov 21, 2026):
`between?` — a defined word whose inlined program
contains one literal `[W]` where W itself contains a
`?` — now gets a runQ theorem by expanding W's program
inline at the eval and case-splitting on the computed
flag. Validated by a hand-proof first. The proof is a
TRICHOTOMY on the flag vs the where-clause outer
condition (here `LO > HI` vs `LO < HI`; the third case
is `LO = HI`): `by_cases hgt`, then in the ¬ branch
`by_cases hlt`, each bullet `simp [execQ, step, <Prog>,
<W>Prog, <lit hyps>, <case hyps>] <;> omega`. Fuel is
FIXED: `len(outer prog) + len(W prog) + len(cond
body)` — `between?` needs 32 (20 + 11 + 1). The `and`
at the end is `* truthy?` (multiplication + equality),
which `omega` handles after simp reduces the program —
had it been `Tok.land`, omega would treat it as opaque
and fail. The two lit binders are named by the Prog
def they belong to (lit0 = inner `[swap]`, lit1 =
outer `[sort2]`), reusing sort2's existing `sort2Prog`
def instead of emitting a second one (a duplicate def
would be a Lean error). `core.ff` flipped (Nov 21):
`between?` is now `@effect` (41 theorems, up from
40), proving, axioms standard ([propext,
Classical.choice, Quot.sound]). Remaining blocked:
`bi2`, `or_else`, `and_also`. Full regression GREEN
under v33 (VM): primitives 34, core 41, all examples
as under v25, Lean exit 0; wrong.ff 3 theorems, Lean
exit 1 (1 failure, as designed).

General composer (v34, Nov 21, 2026): a defined
word with TWO evals on variable quotations now gets
a runQ theorem by NESTED `execQ_append` — the
program is split at each eval, each body becomes a
separate `p1`, the remainder (including later evals)
is `p2`, proven by a nested application. Validated
by a hand-proof of `bi` first. This is the general
composition mechanism the earlier paths were
approximating: it handles any number of evals by
nesting, not a per-shape special case. Fuel is
`fuelB + fuelC + len(prefix) + len(middle) +
len(suffix) + (number of evals)` — `bi` needs
`fuelB + fuelC + 22` (10 + 8 + 2 + 2 slack). The
body hypotheses are UNIVERSALLY quantified over
input/oracle (`∀ inp orc, execQ fuelX ...`) — this
is load-bearing, because a body runs in the middle
and `execQ_append` needs its effect at the current
inp/orc (a hypothesis about `[] []` fails with a
type mismatch). The theorem uses `defs` throughout
(no `defs'` binder): bodies are assumed not to
change defs (no `cons` in a body is a clean
problem for this path). The `have` steps reduce a
prefix to `body ++ rest` by simp, then `apply` the
`execQ_append` application. `bi`'s `@effect` was
DERIVED from its old comment (`a [B] [C] bi == b
c`): `bi: ..R A [..R A --..S] [..R A --..T] ==..S
..T` (note the space after `bi:` — the `word:`
prefix regex requires it). `core.ff` flipped (Nov
21): `bi` is now `@effect` (42 theorems, up from
41), proving, axioms standard ([propext,
Classical.choice, Quot.sound]). Remaining blocked:
`bi2` (its literal body dups the inputs before the
eval, so the stack below the quotation is doubled
— the compose path's slot model does not fit),
`or_else`, `and_also` (literals containing `eval`).
Full regression GREEN under v34 (VM): primitives
34, core 42, all examples as under v25, Lean exit
0; wrong.ff 3 theorems, Lean exit 1 (1 failure, as
designed).

Prefix-aware slots / nested literals (v35, Nov 21,
2026): the compose path's slot model is
generalised — the simulated dispatch stack need
not EQUAL the slot's input side; it must END with
it, and the elements below are a PREFIX the body
preserves (its output is prefix + the single
output value). This was the ONLY blocker for
`bi2`: its literal body dups the inputs before the
eval, so the stack below the quotation is doubled
— the compose path's old slot model (exact
equality) did not fit.
Nested literal expansion and an eval inside a
literal body needed NO new code: the innermost-
first literal collection and the recursive splicing
in `_sim_runq_expanded` already handle them
(`bi2`'s outer literal `[ [dup2] dip eval bury ]`
inlines to an inline list with a `("lit", 0)`
marker for the nested `[dup2]`; the eval inside
the spliced body counts as one of the two variable
evals). Validated by a hand-proof of `bi2` first
(fuelC + fuelD + 26, nested execQ_append, axioms
standard). `bi2`'s `@effect` was DERIVED from its
old comment (`a b [C] [D] bi2 == c d`):
`bi2: ..R A B [..R A B --..S] [..R A B --..T]
==..S ..T` (note the space after `bi2:` — the
`word:` prefix regex requires it). `core.ff`
flipped (Nov 21): `bi2` is now `@effect` (43
theorems, up from 42), proving, axioms standard
([propext, Classical.choice, Quot.sound]). `bi`
still proves via the compose path (empty prefixes
— the change is backward-compatible). Remaining
blocked: `or_else`, `and_also` (their effects
involve the RESULTS of running quotations —
`if B(a) != 0 then 1 else C(a)` — which the
`@effect` notation cannot yet state; a notation
decision is needed). Full regression GREEN under
v35 (VM): primitives 34, core 43, all examples as
under v25, Lean exit 0; wrong.ff 3 theorems, Lean
exit 1 (1 failure, as designed).

Single-value quotation slots / computed-flag
case split (v36, Nov 21, 2026): `or_else` and
`and_also` are the last two non-recursive words in
core.ff. Their definitions do NOT restrict the
input quotations to returning one value, so their
effects are stated as a CONTRACT: IF B and C each
return exactly one value, THEN the word returns
the flag as described; other cases are undefined
behavior (the theorem is silent about them). The
user directed finishing them with this restriction
(Nov 21). The notation for it is a SINGLE-VALUE
quotation slot: `[..R A -- B]` means "a quotation
that takes (.., A) and produces the single value
B" (a bare uppercase value, not a rest `..S`) —
the same stack notation as the outer effect, with
a bare value on the output side and the rest
preserved below it. B is then a plain integer
variable in scope for the `ensures` clause.
Derived `@effect`s (from the old comments `a [B]
[C] or_else == flag` / `a [B] [C] and_also ==
flag` + the traces):
`or_else: ..R A [..R A -- B] [..R A -- C]
==..R F ensures F = if B != 0 then 1 else C`
and `and_also: ..R A [..R A -- B] [..R A -- C]
==..R F ensures F = if B != 0 then C else 0`.
The proof shape is new: run B first, then
case-split on B's RESULT (a computed flag, not an
input), then take the right branch. Validated by
hand-proofs first (both fuelB + fuelC + 30,
execQ_append for B, `by_cases` on b, concrete arm
by direct simp, C arm by a second execQ_append +
mono lift; axioms standard). Two subtleties the
hand-proofs found: B runs with queue (A)::(QC)::qq
(sip's qpush puts A on the queue), and the C-case
fuel M depends on whether the cond runs [swap] (1
token): M = fuelC + 3 when the cond discards
[swap] (or_else's C case, flag = 0), M = fuelC + 2
when it runs [swap] (and_also's C case, flag ≠ 0).
The generator derives M from the simulation.
`core.ff` flipped (Nov 21): `or_else` and
`and_also` are now `@effect` (45 theorems, up
from 43) — ALL non-recursive core words are now
proven. Remaining: recursive words (Phase 4
@rec-effect + @induction — folds, seq, loops,
pi.ffp). Full regression GREEN under v36 (VM):
primitives 34, core 45, all examples as under
v25, Lean exit 0; wrong.ff 3 theorems, Lean exit
1 (1 failure, as designed).

IO effects (DONE, generator v16, Nov 18, 2026): the
interpreter gains an action trace (`IOAction`: `putc` /
`putn` / `print`) and an `Outcome` return (`ok` / `err` /
`exit`), so `none` (failure) and `exit` (halt with a code)
stay distinct; nondeterministic words (`rand`, `clock`)
draw from an oracle stream so `exec` stays a function.
Lean says an IO effect by putting it in the type — there
is no annotation; the `IO` monad is for *running* IO, not
proving about it. The `{...}` note is a human note, NOT
parsed: the generator strips it (it is the readable form
of a Lean comment — `{` is `/--`, `}` is `-/` — chosen
because `/-- ... -/` nested inside `/* */` piles up
slashes). All variants of a note (`{}`, `{IO}`,
`{prints char(n)}`, `{blah blah}`, no note) produce the
same theorem (verified: identical theorems, only the doc
comment differs); a wrong note is not caught. The six
settled forms, now generated (`examples/io.ff`, 6 theorems,
all `lean` exit 0): `N putc == { prints char(N) }`,
`N putn == { prints N }` (no newline — the doc's
`{prints N, newline}` is wrong), `… . == … { prints stack }`,
`N exit == { exits with code N }`,
`max rand == N when 0 < max where 0 <= N ∧ N < max`
(the `when` is load-bearing: the range is false for
`max <= 0`; the lower bound is `<=` because rand can push
0; the chained `0 <= n < max` is not valid Lean — core
Lean has no chained comparisons, so it is the explicit
`∧` form), `clock == T { pushes the current time T }`.
`rand`/`clock` are existentials (`∃ r` in range /
`∃ t`); `rand`'s range is the only inequality `where` the
generator proves (witness `o % max`, `Int.emod` lemmas) —
the general inequality case (isqrt, gcd) is still the
Phase 3 remainder. `putn`'s digits and `.`'s `[ a b ]\n`
formatting (bottom-to-top) are functions of the traced
value/stack, so the trace records the value, not the bytes.
Two model-change notes: theorems are now stated with `run`
and `Outcome` (not `exec` / `some` / `none`), so every saved
output regenerated under v16 (same theorem counts, all
`lean` exit 0); the ladder's simp set now includes `run`
(without it, simp reports every argument unused and leaves
the goal — the theorems are stated with `run`). `getc` is
not supported yet; IO inside a defined word is refused.
Axioms baseline is now `[propext]` for every theorem
(`rand` also `Quot.sound`).

- Allow multiple `@effect` comments per word; emit
  `<word>_effect_1`, `<word>_effect_2`, … (naming to be
  confirmed — see §7; descriptive suffixes like
  `_effect_nonneg` would be nicer if the `when` clause
  can supply one, but numbered is the safe default).
- Parse `when <cond>`; emit it as a hypothesis
  `(h : <cond>)`; concrete-check only values satisfying
  it (for `n < 0` vs `0 <= n`, test negative and
  non-negative values respectively).
- Parse `if … then … else …` in output expressions
  (single-effect form of a conditional).
- Deliverable: generator v3 + test cases `abs`
  (two effects), `a b <` (two effects, and the `if`
  form), `isqrt` negative case
  (`exec … = none`, needs `/` with a zero divisor in
  the interpreter — check the interpreter returns
  `none` on division by zero, and add that behaviour
  if it does not already).
- Done when: `abs` proves both cases, and the negative
  `isqrt` case proves `none`.

### Phase 3 — `where` + output variables (specification form)

Goal: effects can *specify* an output instead of
computing it (`isqrt`, `gcd`).

- Parse `where <prop>`; any output variable not a
  formula in the inputs becomes an existential (`∃ r`)
  in the theorem, with the property after a `∧`.
- **Equational case DONE (Nov 18, 2026, generator v11):**
  `where` clauses that are conjunctions of equations
  `var = expr` (`where n = rest.length`,
  `where n = b ∧ m = a`) are parsed, each variable
  becomes an existential, its expression is the witness,
  and the theorem is
  `∃ vars, (where-prop) ∧ exec ... = some (...)`,
  proved by `refine ⟨witnesses, rfl, ?_⟩` (or
  `⟨rfl, rfl⟩` for several equations) plus the ladder.
  Works with `when` too (`when` before `where`).
  Misuse is a clean problem, not a theorem: inequalities
  (`r^2 <= n`), a `where` on an input variable or a
  non-output variable, an unconstrained output variable,
  a witness mentioning another existential, a `where`
  with `ERROR`, or `when` after `where`.
- What remains in this phase: the inequality case
  (`isqrt`'s `r^2 <= n ∧ n < (r+1)^2`) — there is no
  witness to supply, so the proof cannot be the
  equational `refine`; and `where` on `@snapshot`.
  (Exception, generator v16: `rand`'s range
  `where 0 <= n ∧ n < max` IS proved, as a special case --
  the witness is the oracle value `o % max` and the range
  follows from the `Int.emod` lemmas. That works because
  the witness is determined by the oracle, not by solving;
  `isqrt`/`gcd` have no such witness, so they still need
  the general inequality machinery.)
- Concrete check for an existential: run the program on
  concrete inputs, take the *actual* output value as
  `r`, and check the property holds for it. (The
  generator does not have to solve for `r`; the program
  does.)
- The proof for these theorems is **not** attempted
  automatically beyond the existing tactic ladder; if
  the ladder fails, the generator emits the *statement*
  in a clearly-marked template file (not as a checked
  theorem — never emit `sorry` as if it were a proof)
  and reports "statement generated, proof needs a
  human".
- `where` on `@snapshot` (strong form) comes in with
  this phase, same parsing.
- Deliverable: generator v4 + `isqrt_effect` and
  `gcd` statements generated and concrete-checked.
- Done when: the `isqrt` statement is generated, its
  concrete check passes on the TAP test values
  (0, 1, 2, 3, 4, 25, 125348), and the template file
  is clearly separated from checked theorems.

### Phase 4 — `@rec-effect` (recursive words)

Goal: recursive words get a fuelled theorem and an
induction skeleton.

- Add the fuelled interpreter (`run`, from `Fact.lean`)
  to the generated Lean, alongside the fuel-free one.
- Parse `@rec-effect`; measure a candidate fuel bound
  by running the Python mirror on `n = 1..k` and
  fitting a linear bound (e.g. `9*n` for `fact`);
  emit the bound in the theorem and report how it was
  measured (a candidate, not a proof).
- Emit the induction skeleton for the `n-1` recursion
  pattern: strong induction on `n`, fragment lemmas
  for one unfolding of the body. First example: `fact`,
  checked against `Fact.lean` (which was hand-written
  — the generated skeleton should match its structure).
- Anything outside the `n-1` pattern is refused with
  a clear message, not silently approximated.
- Done when: a generated `fact` file has the same
  theorem statement as `Fact.lean`, the measured bound
  matches `9*n`, and the skeleton's fragment lemmas
  compile.

### Phase 5 — `@given` + top-level snapshots / effects

Goal: snapshots and effects for code outside a
definition body.

- Concrete top-level snapshots first (literals only,
  no binder needed; theorem with no binders, proved
  by `rfl`). Test case: a top-level program fragment
  in a `.ff` file.
- Then `@given`: parse it, emit it as the binder line
  (Lean `variable` / explicit binders) for the
  snapshots and effects that follow, per the scope
  decision in §7.
- Deliverable: generator v5 + a top-level example file
  with a concrete snapshot and a symbolic one.
- Done when: both compile clean, and a `@given` that
  is changed mid-file correctly re-binds the variables
  for what follows.

### Phase 6 — Call-site checking and composition

Goal: the checker scales to a library instead of
re-proving every word from scratch.

- When a word calls another word that already has a
  proved `@effect`, the caller's proof uses the
  callee's *effect* (as a rewrite / lemma), not the
  callee's inlined body. This is the compositional
  step: concatenation is composition.
- Effect inference: for a word with no `@effect`, infer
  its stack shape (arity + `...` rest) from its body,
  and report it — the way Factor's stack checker
  infers effects. Full value inference is out of scope;
  shape inference is the goal.
- Report failures in Fbm terms: word name, file, line
  number, and which `@effect` / `@snapshot` failed —
  not Lean error text.
- Done when: a word calling `rot` proves its effect
  without inlining `rot`'s body, and the failure
  message for a wrong effect names the word and the
  directive.

#### Lemma application (quotation composition) — the blocker for core.ff

The first composition step is quotation composition:
a word whose body calls `eval` / `?` / `cons` is
proved by applying the callee's proven effect as a
black-box lemma, instead of inlining the callee's
body. This unblocks core.ff's 9 plain-`effect` words
(slip, dip, run, sip, sipd, sort2, between?, choose,
branch) and the 5 non-recursive no-effect words
(dipd, bi, bi2, or_else, and_also). The 7 recursive
words (pushtop, _loop, loop, times, seq, range,
count) need this PLUS `@rec-effect` / `@induction`
(Phase 4).

Scope decision (Nov 21, 2026, best judgement):
lemmas only where inlining fails. The generator keeps
inlining by default (the 30 theorems that prove today
do not change) and uses lemma application only for
words containing `eval` / `?` / `cons` (and later for
recursive words). Modular-by-default (never inline a
defined word) is deferred; it can be adopted later if
it proves better.

What is decided: the approach (black-box lemma
application, Nov 19), the model (userDefs +
pointer-ness, no Val), that `cons` is strong enough
(its theorem states the body explicitly), and the
unlocking order: slip, then dip / run / sip, then
sipd, then sort2 / choose, then branch, then
between?.

What the mechanism needs (worked out Nov 21, 2026,
starting from slip, `q< eval q>`, effect
`..R [..R -- ..S] B == ..S B`):

- A `runQ` path for defined words. Slip's program
  `[qpush, eval, qpull]` contains `eval`, which the
  plain `run`/`step` cannot handle (`step` returns
  `none` for it), so slip's theorem must be a `runQ`
  theorem (fuel, defs, defs'), not a `run` theorem.
  Fuel: the body needs `fuel`; slip needs `fuel + 4`
  (qpush 1 + eval dispatch 1 + body fuel + qpull 1,
  plus `execQ_append`'s +1 slack — the naive `fuel + 3`
  does not fit the append lemma's `F1 + F2 + 1` form).
- Queue-polymorphic quotation theorems (v28, DONE
  and verified — see the v28 paragraph below).
  `eval`/`?`/`cons` are now stated with `execQ` and
  a queue variable `qq` instead of `runQ` with an
  empty queue, so a body can be run with a non-empty
  queue — which is what slip needs, because it
  stashes `B` on the queue (`q<`) while `eval` runs
  the body, then pulls it back (`q>`). The old
  `runQ` form is the `qq = []` special case. Without
  this, the body's hypothesis (stated with an empty
  queue) cannot be used when the queue holds `[B]`.
  Verified Nov 21: the queue-polymorphic `eval`,
  `cons`, `cond` run, and `cond` discard theorems
  all prove with the same proof shape as before.
- Two preamble lemmas, PROVEN Nov 21, 2026 and in
  `preamble.lean` (v29):
  (1) Fuel monotonicity for `execQ` (`execQ_ok_mono`):
  if a program succeeds (`Outcome.ok`) with fuel `fuel`,
  it succeeds with the same result with any larger
  fuel. Needed because the body gets `fuel + 1` in
  slip's execution but its hypothesis states it with
  `fuel`, and because after the body there must be
  at least 1 fuel left for `qpull` — which follows
  only if the body consumes at most `fuel`.
  (2) `execQ_append`: running `p1 ++ p2` is running
  `p1`, then `p2` on the result. Needed because
  `eval` prepends the body to the trailing program,
  so slip's execution is `body ++ [qpull]`, and the
  body's standalone effect must be applied to the
  `body` part alone, then `qpull` handled separately.
  Its second hypothesis is universally quantified
  over the leftover input/oracle, because `execQ`'s
  `ok` result does not return them. Both are proved by
  induction (on fuel / on `p1`); the case split follows
  `execQ`'s cases (eval, call, cons, cond, exit,
  fallthrough). Axioms: [propext, Classical.choice,
  Quot.sound].
- The generator change (DONE, v29): for a defined
  word whose inlined program contains `eval`, emit a
  `runQ` theorem (fuel = body fuel + wrapper overhead)
  whose proof applies the body's effect via
  `execQ_append` instead of inlining the quotation
  token. The generator splits the program at `eval`,
  simulates the prefix (shuffles and `q<`/`q>` only)
  to find the stack/queue at dispatch, and checks the
  suffix lands on the effect's output with the queue
  restored. Only one `eval`; `?`/`cons`, `where`/
  `when`, ERROR, and computing prefix/suffix tokens
  are clean problems. `slip`, `dip`, `run`, `sip` now
  prove as `@effect` (core.ff 34 theorems). The
  remaining words (`sipd`, `sort2`, `choose`, `branch`,
  `between?`, `dipd`, `bi`, `bi2`, `or_else`, `and_also`)
  are blocked on quotation literals (`[X]`), which
  `inline_word` still refuses — a separate mechanism.
- Not blockers: the `[S]` shorthand question, the
  queue pin-downs (`.unsafe`, "balanced"), and
  `+Fail` / `+IO`. `@proof` (hand-written lemma
  application) is a separate path; if the generator
  does it automatically, `@proof` is not needed for
  this.

### Phase 7 — TypeScript front-end (reuse the preprocessor)

Goal: the generator's dictionary is exactly the one the
real implementation uses, instead of a second
implementation that can drift.

- The generator reads the TypeScript preprocessor's
  **flattened output** (definitions after `.import`,
  dedup, and `__` mangling) instead of raw `.ff` files.
  The Lean emission stays as it is.
- Per the Nov 18 decision the generator runs no
  concrete check at all — the Python mirror is removed,
  not replaced. (The earlier plan was to replace the
  mirror with the real engine; that is dropped, since
  testing now belongs to the interpreters and the unit
  tests, and the generator is a pure translator.)
- The Python prototype is kept for the design; the
  front end is what moves. Do not rewrite the Lean
  emission in TypeScript — generating Lean text is the
  same in either language, and a rewrite buys nothing.
- Done when: the generator, fed with preprocessor
  output for `core.ff`, produces the same theorems
  as the Python front-end did for the same words, and
  a definition that uses `.import` or a `__`-private
  name is handled correctly (these are the cases the
  Python front-end cannot do).

Preprocessor comment check (verified 2026-11-18 by
running `bun/bin/ff-preprocess.ts` on a test file —
the preprocessor *is* safe enough for the generator,
with two rules):

- Comments pass through the preprocessor as text: it
  is line-based and does not parse comments at all.
  Top-level comments come through byte-identical;
  multi-line comments survive line by line (verified:
  a 3-line `@lean` block came through intact). The
  compiler also preserves comments, as no-op
  instructions carrying the comment text in IR
  metadata — but it joins the comment tokens with
  single spaces, so a multi-line tactic block would
  collapse. **Rule 1: the generator reads the
  preprocessed text, not the IR.**
- The `__` mangler reaches *inside* comments in
  imported files: it splits lines on whitespace and
  prefixes every `__` token, with no awareness that
  it is inside a comment. Verified: `/* @effect n
  __base == ... */` in an imported file came out as
  `/* @effect N __lib_ff_1N9G9S3__base == ... */`.
  It is *consistent* — the definition on the next
  line got the same prefix — so an `@effect` still
  refers to the right (mangled) word, and the
  generator can use the flattened names as-is.
  **Rule 2: treat word names in `@effect` as the
  flattened (possibly mangled) names, and keep
  `__` references out of `@lean` blocks** — a
  `__` word mentioned inside a verbatim Lean block
  would be rewritten and the Lean would break.
  Un-mangling the prefix (it is deterministic per
  file: path + hash) to recover source names is a
  readability nicety for later, not a correctness
  requirement. The Go preprocessor has the same
  `mangleImportedLine` structure, so the same caveat
  applies there.
- Edge cases: the preprocessor has no notion of
  comments, so a line *inside* a multi-line comment
  starting with `.import`, `.load`, `.m`, `.ff`,
  `.ffp` or `.exit` is executed as a directive —
  keep such lines out of `@lean` blocks. And the
  compiler only recognises `/*` / `*/` as separate
  whitespace-delimited tokens, so comments need
  spaces around the delimiters (the existing
  convention; `/*comment*/` with no spaces is a word
  call, not a comment).

### Phase 8 — Later (not this weekend)

- **Quotations — revised model (Nov 20, 2026).** A quotation
  is an `Int`, not a separate value type: at runtime the stack
  holds only `BigInt`s, and `[ ... ]` (`KET`) defines the slice
  as an anonymous user word and pushes its op code
  (`engine.ts`, `KET` handler; `eval` is `CALL`, which pops the
  integer and dispatches on it — unknown code throws
  undefined-op). What makes an integer a quotation is
  compile-time `.pointer` marking on the push that produced it
  (`compiler.ts`, `ir.ts` `Meta.pointer`), plus the `userDefs`
  table mapping op code → token list. There is NO `Val` sum
  type in the model: the stack stays `List Int`, and the model
  gains (a) a `userDefs` mapping, with `KET` creating a fresh
  op and pushing it and `CALL` looking it up (undefined op →
  `Outcome.err`), and (b) pointer-ness, which propagates
  through shuffling words (`dup`/`swap`/`drop` pass it through
  unchanged — `unknown` in the analyzer's terms, below).
  `cons` creates a fresh op whose body is "push `a`, then call
  `B`" — the composition lives in that fresh definition, not
  in the stack value. The `effect` (not `@effect`) statements
  for `cons`/`eval`/`?` in `primitives.ff` (Nov 20) are the
  statable forms; flip the tag to `@effect` when this model
  lands. A `[..R -- ..S]` slot in an effect IS a pointer-marked
  integer with a known effect; a plain `Int` slot is not.
- **The compiler's own pointer discipline (Nov 20, 2026).**
  F♭m already has this distinction, as static analysis:
  `.agents/docs/plans/static-code-analysis.md`
  (2026-04-10, active) and `typescript/compile-service/src/`
  (`analyzer.ts`, `word-signatures.ts`) track abstract values
  `literal | pointer | unknown` over the IR — a push with
  `meta.pointer` is a pointer, anything else a literal — and
  `eval` is signed `inputs: ["pointer"]`, so `10 eval` is a
  compile-time diagnostic error (regression test in
  `deno/src/compile_service_test.ts`). Two limits, both
  recorded: it runs ONLY in the compile-service pipeline —
  the core compiler (`typescript/core/src/compiler.ts`) does
  not invoke it (integration "not landed"), and the pointer
  metadata is lost at bytecode encoding, so analysis must run
  before that step; and only `eval` has a pointer signature so
  far (`?`/`cons` are not in `word-signatures.ts`). The
  effects we prove assume this discipline (eval only on
  pointers); the guarantee holds on the compile-service path
  only. That plan's Phase 2 — parsing stack-effect comments
  and verifying them — is deferred there, and is what this
  generator does with stronger machinery (Lean instead of an
  abstract interpreter).
- **Quotation `where`-form** (`dip`, `sip`, `branch`,
  `?`): an effect with a hypothesis about what a
  quotation does, e.g. `/* @effect flag [A] [B]
  branch == xs when flag = 0 where exec A rest = xs */`.
  The named rest `..R` (v20) now supplies the piece this
  bullet used to say the notation lacked.
- **Whole-stack words** (`count`, `map`, `each`):
  effects whose output is a list variable, e.g.
  `/* @effect N count == xs where xs = List.range' 1 N */`.
- **Fixed-point words** (`exp`, `log`, `atan`, `pi`,
  `trig`): these are approximations, so "valid" is an
  error bound, not equality. The effect form is
  `|result - true_value| < ε`, which is a different
  kind of specification and needs Mathlib-style real
  analysis — explicitly out of scope for the prototype.
- **Queue snapshots** in the generator (`|` state):
  the notation exists; parsing it is Phase 1 work
  extended to the queue component of the interpreter
  result.
- **`flag`, `a*`, `x'`** as formal notions: `flag` is
  an `Int` that is 0 or 1 (state it as such when it
  matters); `a*` is a list variable spliced with `++`;
  `x'` is a fresh variable unless a `where` gives its
  relation (see §3.3).

## 6. Weekend experiment checklist

Things to try, in order, with the prototype as it stands:

1. Run the generator on the examples, and Lean on the output:
   `python3 generate.py examples/shuffles.ff out.lean`
   then `lean out.lean`. Expect exit 0, no output.
2. Write a new `.ff` file with a word you know, an
   `@effect`, and run it through. Then change the effect
   to something wrong and watch the counterexample.
3. Add a `@snapshot` comment (untagged, as in the
   existing notation) inside a long definition, and
   check by hand that the picture is right — Phase 1
   will make Lean check it, but the picture itself is
   worth getting right first.
4. Try `abs` with two `@effect` comments. It will not
   work yet (Phase 2) — note *how* it fails, so Phase 2
   fixes the right thing.
5. Read `Snapshot.lean` and `Fact.lean` side by side:
   the first is the chaining idea, the second is the
   induction idea. Those are the two proof shapes
   everything else is built from.

## 7. Open questions and decisions needed

1. **Scope of `@given`**: whole-file from that point
   (proposal, matches Lean's `variable`) vs only the
   next snapshot/effect. Needs a decision before
   Phase 5.
2. **Naming of multiple-effect theorems**: numbered
   (`_effect_1`, `_effect_2`) vs descriptive
   (`_effect_nonneg`, `_effect_neg`). Numbered is the
   safe default; descriptive is nicer if the `when`
   clause can supply the suffix.
3. **Snapshot lemma naming**: by position
   (`_snapshot_1`) vs by the segment it follows.
   Position is the proposal.
4. **When to move the front end to TypeScript**
   (Phase 7): after the notation settles (Phases 1–3),
   not before — otherwise the port chases a moving
   target.
5. **Whether `flag` needs a formal definition**: it is
   an `Int`; stating "flag is 0 or 1" where it matters
   may be enough, rather than a new type.
6. **Lean vs Bend, settled for now**: Lean is the
   checker/IR, because it has real `Int`, induction,
   and `omega`/`simp`, and it covers the recursive
   fragment as well as the easy one. Bend would need a
   second IR for the recursive/arithmetic cases. The
   surface is `@effect` in the `.ff` file, so the IR
   choice is about checker power, not readability.
   Revisit only if Lean's kernel becomes the bottleneck,
   which it is not at this scale.
7. **UPPERCASE keywords + `↦` separator (user leaning,
   Nov 18, 2026 — SUPERSEDED Nov 19, 2026, see Appendix)**:
   the user was leaning toward UPPERCASE keywords (`WHEN`,
   `WHERE`, `IF`, `THEN`, `ELSE`) and the `↦` separator
   instead of `==`. Why: F♭M is case-insensitive (the
   compiler lowercases symbol names), so UPPERCASE keywords
   in the generator (which reads the raw file) are
   unambiguous against lowercase user words/placeholders;
   and `↦` cannot be a word name the way `==` can (a word
   named `==` breaks `parse_effect`, which splits on the
   first `==`). Superseded Nov 19: the `word:` prefix pins
   the word name outside the effect, so the separator
   cannot collide with a word name, and `==` is KEPT (the
   user prefers the existing syntax; `--` collides with
   the real decrement word). No UPPERCASE migration.
   The cheap alternative (reserved-word fix for
   `when`/`where` and splitting on the last `==`) is
   likewise overtaken by the `word:` + `requires`/`ensures`
   rename — see Appendix.
8. **`.effect` parse command instead of `/* @effect */`
   comments (user proposal, Nov 18, 2026, NOT decided
   yet — DEFERRED, keep in mind)**: effects would be
   `.effect A B & == A&B` (A `.` directive line at column
   0) instead of a comment. Why: more idiomatic (a
   first-class command, like a Lean declaration, not a
   comment hack); the `/-- -/` doc-comment form was
   considered and rejected (looked bad). VERIFIED Nov 18,
   2026: the F♭m preprocessor silently drops unknown `.`
   directives (an unmatched `case` falls through to
   `return ""`), so `.effect` lines work TODAY with zero
   F♭m changes (live test: `.effect` lines became empty
   lines, `foo: 1 2 + ;` passed through, exit 0). The
   `switch` in `preprocessLines` is the natural hook for
   the parser to use `.effect` later (the typechecker
   framing: the parser reads `.effect` and checks the
   word against it). Constraint: `.effect` must be at
   column 0 (an indented line is not a directive).
   Generator change is small (extract the body after
   `.effect ` and feed it to the same `parse_effect`);
   both syntaxes can coexist during a transition.
   **BLOCKER (user catch, Nov 18, 2026): `.effect`
   lines do NOT survive the preprocessor — they are
   dropped (`return ""`), while `/* @effect */` comments
   DO survive (verified live: the comment came through
   byte-identical, the `.effect` line became empty).
   The generator reads the PREPROCESSED text (Phase 7,
   Rule 1), so it would never see the `.effect` lines.
   Using `.effect` would require changing the F♭m
   preprocessor to preserve them (a `case ".effect":`
   that returns the line) — a language change, not a
   generator change. So `.effect` is DEFERRED: keep the
   option in mind, but do NOT migrate until the
   preprocessor question is settled. The comment syntax
   stays.

## 8. Prior art (short version)

Searched 2026-11-17; no exact match found for "stack-effect
comments in a concatenative language, generated into
machine-checked proofs". Nearest neighbours:

- **Bitcoin Script in Agda** (Alhabardi, Beckmann, Lazar,
  Setzer, TYPES 2021, arXiv:2203.03054): a Forth-style
  stack machine, operational semantics in Agda, Hoare
  triples / weakest preconditions, human-readable specs.
  Hand-written proofs about two specific programs, not
  a generator for a whole library.
- **Dawn / UCC in Coq** (Danilafe, 2021): untyped
  concatenative calculus formalised in Coq, verified
  evaluator, extracted to Haskell. A proof about the
  calculus and its evaluator, not about individual
  library words.
- **Mathematical Foundations of Joy** (von Thun): a
  program denotes a stack→stack function, concatenation
  is composition (a homomorphism from a syntactic monoid
  to a semantic monoid). The theory that makes "the
  stack effect *is* the specification" coherent.
  Pen-and-paper, not machine-checked.
- **Stack-effect checking** (Factor, Cat, Seq, Forth):
  checks declared `( a -- b )` against the body — but
  only arity/shape, never values. Factor, for non-inline
  words: "only the number of inputs and outputs carries
  semantic meaning". The gap our `@effect` sits in is
  exactly that: same notation, with values and
  properties in it, checked by a proof kernel.

## 9. Files

Everything lives in `~/workspace/fbm-lean-proof/` on the VM:

- `PLAN.md` — this file.
- `README.md` — generator usage and verified results.
- `queue-syntax-decision.md` — the queue-syntax decision
  note (2026-11-19/20; see Appendix below).
- `generate.py` — the generator.
- `primitives.ff` — the 27 primitive effects in new syntax
  (v20), plus `outputs/generated-primitives.lean` (30 theorems, all
  proving). This file's working copy used to live only on
  be-quite-900; the VM copy is now the source, synced back.
- `Fact.lean`, `Rot.lean`, `Snapshot.lean` — hand-written
  proofs (factorial, rot, snapshots).
- `examples/` — `.ff` test inputs.
- `outputs/generated-*.lean` — verified generated outputs
  (regenerated test outputs, not sources; `outputs/` holds
  only these — edit the `.ff` input and regenerate).

Lean toolchain: `~/workspace/tools/lean/lean-4.22.0-linux/bin/lean`
(Lean 4.22.0, core only, no Mathlib).

## Appendix: Notation redesign — decisions of 2026-11-19/20 (main chat)

Recorded 2026-11-20 from the Nov 19 main-chat discussion (the
side chat had only the pre-research state). The concatenative
research page (`space:concatenative-stack-effects`, delivered
Nov 19) is the input this redesign reacts to: every surveyed
language is shape-only, so value conditions come from
F*/Liquid Haskell, not from Kitten/Factor/Joy.

**Status update (v20, Nov 20, 2026, user-directed): part of
this notation IS now in the generator.** `requires`/`ensures`
are accepted as aliases for `when`/`where`, the `word:`
prefix is accepted (including symbolic words: `%:`, `<<:`,
`.:`), and `..R`/`R.length` replace `rest.length` (see below).
The old spellings are still accepted alongside the new ones
(dual support, not a flag day); `primitives.ff` is written in
the new syntax, the other examples still use the old spellings
except `depth.ff`/`where.ff`, which had to move because
`rest.length` is dropped. `[ ]` quotation effects, `.unsafe`,
and `+Fail`/`+IO` are still NOT implemented. The queue
pin-downs below are still open.

### Decided

- **`requires` / `ensures` replace `when` / `where`**
  (2026-11-19 evening). Pure rename — same translation, same
  Lean, same proofs. `requires` = precondition on inputs,
  `ensures` = postcondition on outputs. The `?` forms that
  still used `when` were the trigger; the decision was
  recorded after that catch.
- **Outer parens dropped.** If every effect needs them, none
  do. The `@effect` tag delimits the effect and `|` scopes
  the two `==`S (split on `|` first, then each picture on
  its first `==`).
- **`word:` prefix pins the word name.** The word is written
  at the beginning as `word:`, outside the effect, so the
  separator cannot collide with a word name. This dissolves
  the `==`-as-A-word-name collision (§7 item 7) without
  UPPERCASE keywords or `↦`.
- **`==` kept as the separator.** The user prefers the
  existing syntax. `--` was rejected: it collides with the
  real decrement word (`n -- -- n-1`).
- **`[ ]` for inner quotation effects.** A quotation slot is
  written as a bracketed effect, e.g. `[ ..R a b -- ..R b a ]`.
  `[ ]` and `:` are not real words, so there is no name
  collision. Effects then read very similar to definitions.
  The `quot:` prefix from the research sketch is dropped —
  the brackets alone, in position, already say the slot is
  a quotation with this effect.
- **Rest is inferred inside brackets too.** `[ a b -- b a ]`
  means the same as `[ ..R a b -- ..R b a ]`. `..R` is only
  needed when the nested effect has to refer to the input
  rest (output mentions it, or a binding).
- **A word/literal name *is* the name of its effect.** No
  separate named-effect alias — no stdlib case for one.
  A literal quotation's effect can be named by its code:
  `[swap]` instead of the full picture, `[ 1 + ]`,
  `[sort2]`. A quotation *variable* stays a bare-shape
  hypothesis: `[ ..R -- ..S ]`. `requires`/`ensures`/IO
  attach inside the brackets. Parameters get short shape
  constraints, not long pictures.
- **The direction is settled in spirit:** the user likes it —
  the effect syntax is converging on F♭m itself.

### Statable now, generator support pending (Phase 8)

- **`eval` and `?` are statable** with nested `[ ]` effects:
  `eval: ..R quot:[ ..R -- ..S ] == ..S` (in the new form,
  the `quot:` label is dropped); `?` similarly with its two
  quotation branches. The nested effect's input rest is the
  same `..R` as the outer effect's rest, because the
  quotation operates on the stack below itself.
- **`cons` is statable:** `..R A [B] == ..R [A B]` (engine:
  cons builds a word that pushes `a` then calls the
  quotation). But the generator cannot *use* it yet: the
  output quotation's effect is push-`a` composed with B's
  effect. Revised Nov 20 (see Phase 8): the composition does
  NOT need a notation operator — it lives in the fresh op's
  definition (`cons` creates an op whose body is push-`a`
  then call `B`), so what the generator needs is the
  `userDefs` model, not a composition operator. The three
  statements are recorded as plain `effect` (not `@effect`)
  in `primitives.ff` until that model lands.
- **Fold words ARE recursive** (verified Nov 19 in
  `seq.ffp`/`core.ff`): `__map`, `__reduce_r`,
  `__reduce_l`, `__filter`, `_loop`, `reverse!`,
  `__seq=` all self-call, so `map`/`foldr`/`foldl`/
  `filter`/`reduce!`/`times`/`loop`/`seq`/`count`/`sum`/
  `product`/`seq=` are recursive. Precise effects need a
  fold/quantifier the notation lacks; proofs need
  `@rec-effect` + `@induction` (designed, not
  implemented). `last`/`length` are not recursive but
  still Phase 8 (`last` evals a composed quotation,
  `length` uses queue effects).
- **Lemma application (user proposal, Nov 19 evening):** a
  definition containing a fold can be proven using the
  fold's proven effect as a black-box lemma, without
  inlining the fold — the recursion is in the *proof* of
  the fold's effect, not in the effect itself. Needs (a)
  the fold's effect proven as a standalone theorem, (b)
  generator support for lemma application (effect as a
  simp rewrite) instead of always inlining. Open: lemmas
  only for recursive words (minimal) vs modular by
  default. Workaround today: `@proof`, hand-applying the
  lemma. This is the Phase 6 composition step, brought
  forward by the fold case.

### Leaning, not decided

- **Probably NO queue effects at all.** Most words are
  balanced by design, so their effects never need a queue
  picture. Unbalanced queue operations get marked
  `.unsafe` instead. Only the four primitives (`q<`, `q>`,
  `(`, `)`) touch the data queue in their effects; they
  are hand-proven in the preamble and never go through
  the effect parser. Balanced words just need the
  general-`q` theorem (queue binder in, same queue out),
  which `swapd` already verified by `rfl`. Full detail:
  `queue-syntax-decision.md`.
- **`+Fail` / `+IO` tags still open.** They look good, but
  it is not settled whether they actually translate to
  Lean and help the proof.

### Still open — the two queue pin-downs

Asked Nov 19/20, unanswered at last check (2026-11-20
09:06 MST, re-asked in the main chat):

1. What `.unsafe` means for the generator: a marked word
   gets no effect at all (its queue behaviour out of
   scope), vs it gets a queue picture as the exception.
   Recommended read: no effect at all — the mark is the
   point. Cost: an unbalanced user word cannot be proven
   through the generator at all.
2. What "balanced" means precisely: matched push/pull at
   the tail, so the queue is unchanged — not just a
   net-zero count. A word could pull a value, drop it,
   and push something else back, and counts would still
   balance while the queue changed.

If both are confirmed as recommended, the queue decision is
done: no queue syntax, only the general-`q` theorem and the
hand-proven primitives. If either is wrong, record the
alternative in `queue-syntax-decision.md` instead.

### Other Nov 19 findings recorded here

- Queue semantics (engine-checked): `q<` pushes the stack
  top onto the queue tail, `q>` pulls from the tail — both
  tail, LIFO; a queue picture reads front-to-back, tail
  rightmost, mirroring the stack.
- The old docs contradict themselves on `q>`: the README
  vocabulary table's `q>` row breaks the notation doc's
  own rule, and the old one-picture form cannot express
  `q>` without a queue in/out pair. Fixing that row is
  pending the queue decision (see
  `queue-syntax-decision.md` §1).
- `(`/`)` forms are derived from engine code, not compiled
  — no stash/fetch step cases exist in the model yet.
  STASH pushes the stack length as an extra queue element;
  FETCH restores the stashed values under the current
  stack, not on top. One `…` cannot serve both rests once
  the queue is involved — named rests `..R` / `..q` are
  forced if queue pictures ever return.
- `q<`, `q>`, `swapd` verified in Lean 4.22.0 by `rfl`
  (the check caught a wrong first draft of the `swapd`
  output). See `queue-syntax-decision.md` for the
  theorems.
