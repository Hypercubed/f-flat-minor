# Tasks

## 1. Phase 1 — `@lean` and Recursive / List Foundations

- [x] 1.1 Add `/* @lean ... */` block parsing and in-order verbatim emission to `lean-proof/generate.py` (rejecting `sorry`, `admit`, or `axiom` tokens up front), and verify a sample `.ff` file with a `@lean` helper/theorem compiles via `lake env lean --stdin`.
- [x] 1.2 Add `SpecIter`, `intRange`, and any needed list-append/depth helper lemmas to `lean-proof/Fbm/Prover.lean`, and verify `lake build Fbm.Prover` succeeds with standard axioms only and zero warnings.
- [x] 1.3 Support recursive word definitions in `lean-proof/generate.py` using `Tok.call` + `lookup defs` hypotheses (instead of infinite `++` expansion), and allow non-recursive callers to reference proven recursive `@effect` theorems in `fbm_verify [...]`.
- [x] 1.4 Extend `@effect` stack-picture translation in `lean-proof/generate.py` to support `..R` in non-leading output positions (`..R A == A ..R` -> `R ++ [A]`) and list-valued stack splices (`..R xs` -> `xs ++ R`), and verify both parse and typecheck under `lake env lean --stdin`.

## 2. Phase 2 — `@by-proof` Clause on `@effect`

- [x] 2.1 Add `@by-proof <tactic>` clause parsing at the tail of `@effect` annotations in `lean-proof/generate.py` (rejecting `sorry`, `admit`, or `axiom` tokens up front), and verify `@effect ... @by-proof ...` emits and passes `lake env lean --stdin` on `pushtop` and `_loop`.

## 3. Phase 3 — `@by-induction` Clause and Full `core.ff`

- [x] 3.1 Add `@by-induction <pattern>` clause parsing and pattern validation (`N - 1`, `R.length`) at the tail of `@effect` annotations in `lean-proof/generate.py`, generating the induction skeleton + `fbm_verify` base/step discharge, and verify on `pushtop` and `_loop`.
- [x] 3.2 Annotate `pushtop`, `_loop`, `loop`, `times`, `seq`, `range`, and `count` in `ff/lib/core/core.ff`, and verify `cd lean-proof && lake build && chomp test:lean` passes all theorems in `primitives.test.ffp` and `core.ff`.
- [x] 3.3 Document `@lean`, `@by-proof`, `@by-induction`, non-leading `..R`, and list-splice syntax in `lean-proof/README.md` and `lean-proof/HELP.md`.
