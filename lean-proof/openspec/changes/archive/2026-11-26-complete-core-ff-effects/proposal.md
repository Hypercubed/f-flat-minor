# Proposal

## Why

`ff/lib/core/core.ff` currently has 45 proven `@effect` theorems (covering lines 1–86 through `empty?`), but the final 7 words (`pushtop`, `_loop`, `loop`, `times`, `seq`, `range`, `count`)—as well as the generic short-circuiting forms of `or_else` and `and_also`—cannot yet be annotated or verified because they require recursion (`Tok.call` + induction), `..R` in non-leading positions, list-valued stack outputs, and proof/theorem escape hatches. Adding `@lean`, `@by-proof`, and `@by-induction` in three progressive phases completes `core.ff` and establishes the full 3-tier verification ladder from `PLAN.md`.

## What Changes

- **Phase 1 (`@lean` + recursive/list foundations)**:
  - Add `/* @lean ... */` verbatim comment blocks in `.ff` / `.ffp` files (pasted in file order, rejecting `sorry` / `admit` / `axiom` up front) so `.ff` files can define helper predicates/theorems (including generic short-circuiting `or_else` / `and_also` forms).
  - Add `SpecIter` and `intRange` helpers in `lean-proof/Fbm/Prover.lean`.
  - Support recursive word definitions in `lean-proof/generate.py` via `Tok.call` + `lookup defs` hypotheses (instead of infinite `++` expansion), and allow non-recursive callers to compose proven recursive `@effect` theorems via `fbm_verify`.
  - Extend `@effect` stack-picture translation in `lean-proof/generate.py` for non-leading `..R` (`..R A == A ..R` -> `R ++ [A]`) and list-valued stack splices (`..R xs` -> `xs ++ R`).
- **Phase 2 (`@by-proof` on `@effect`)**:
  - Add an optional `@by-proof <tactic>` clause at the tail of `@effect` annotations (rejecting `sorry` / `admit` / `axiom`) so `@effect` generates the theorem statement and the author supplies only the tactic body.
- **Phase 3 (`@by-induction` on `@effect` + full `core.ff`)**:
  - Add an optional `@by-induction <pattern>` clause at the tail of `@effect` annotations (e.g. `strong on N, recursive call on N - 1`, `strong on R.length, recursive call on R.tail`) that verifies the recursion pattern against the word body, emits the induction skeleton, and discharges base/step goals with `fbm_verify`.
  - Annotate and verify all 7 remaining words in `ff/lib/core/core.ff` (`pushtop`, `_loop`, `loop`, `times`, `seq`, `range`, `count`) under `chomp test:lean`.

## Capabilities

### New Capabilities

### Modified Capabilities
- `lean-effect-prover`: Extend `@effect` syntax and Lean emission/verification in three phases with `@lean` verbatim blocks, `@by-proof` and `@by-induction` clauses on `@effect`, recursive `Tok.call` definitions, non-leading `..R` / list-splice stack outputs, and `SpecIter` / `intRange` support so all of `ff/lib/core/core.ff` can be annotated and verified.

## Impact

- `lean-proof/Fbm/Prover.lean` (adds `SpecIter`, `intRange`, and list-append/depth helper lemmas)
- `lean-proof/generate.py` (`@lean` directive parser, `@by-proof` / `@by-induction` clause parsing, recursive `Tok.call` + `lookup defs` emission, arbitrary-position `..R` and list-splice stack translation, `sorry`/`admit`/`axiom` guard)
- `ff/lib/core/core.ff` (adds `@effect` annotations for `pushtop`, `_loop`, `loop`, `times`, `seq`, `range`, `count`)
- `lean-proof/README.md` and `lean-proof/HELP.md` (documents `@lean`, `@by-proof`, `@by-induction`, non-leading `..R`, and list-splice syntax)
