# Tasks

## 0. Gate (do first)

- [ ] 0.1 Verify `lean-effect-macro` is archived (its `fbm_effect` elaborator is consumed by task 1). If not archived, stop — this change waits.

## 1. Uniform emission + clean failures

- [ ] 1.1 In `lean-proof/Fbm/Prover.lean`, verify `fbm_verify` fails clean (word-naming `needs @by-proof`-style error) on every currently-parked shape; add missing clean errors where the tactic currently stalls or loops. Gate: parked words fail identically before/after (TAP `not ok` with clean message, no hangs).
- [ ] 1.2 In `lean-proof/generate.py`, replace the `prepare()` dispatch with the uniform path (parse → `Prog` → `fbm_effect` → `by fbm_verify`, no deps). Delete `_prepare_*` methods in the suggested order (straight-line → cond/direct → recursive → compose/computed-flag/between → where-existential), running the parsed-equal TAP gate after each deletion: all previously-green theorems identical, parked words parked via tactic errors.
- [ ] 1.3 Delete the Python call-graph dep-list computation (topological `Prog`-emission order stays). Verify no emitted file references removed helpers.

## 2. Regression + docs

- [ ] 2.1 Full regression: `chomp test:lean` green, parsed-equal TAP vs pre-change baseline (green + parked, all suites: core, primitives, math, prelude).
- [ ] 2.2 Update `lean-proof/README.md` + `lean-proof/HELP.md`: uniform pipeline docs; "clean problem" redefined as a Lean error (word-naming, tactic-raised) rather than a generator refusal; deletion-order table for future repertoire additions.
