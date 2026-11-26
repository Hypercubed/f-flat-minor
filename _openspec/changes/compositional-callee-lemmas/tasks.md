# Tasks

## 1. Emission: callee-Prog boundaries for annotated words

- [ ] 1.1 Generalize the inlining frontier in `lean-proof/generate.py`
  (`_inline_tokens`/`inline_word`, currently `_compute_rec_frontier`)
  so calls to annotated (effect-carrying) words emit boundary
  references to their callee `Prog`s via `++`, keeping the `Tok.call`
  path for recursive words and full inlining for unannotated words.
  Verify `clampProg` references `maxProg`/`minProg` with no `?` at
  `clamp`'s own level in the generated Lean.
- [ ] 1.2 Order `Prog` emission topologically by the call graph
  (already computed for dep lists) so callee `Prog`s are defined
  before use. Verify `lake build` green.

## 2. Tactic: conditional-hypothesis splitting

- [ ] 2.1 Extend `fbm_verify` in `lean-proof/Fbm/Prover.lean` to
  `by_cases`-split when an applied callee lemma's post contains an
  `if` the goal depends on, with atomic rollback per split and a
  depth cap (2–3) that degrades to a clean "needs `@by-proof`"
  problem. Verify against the existing `sort2`/`between?` unit
  theorems (no regressions).
- [ ] 2.2 Verify `clamp` (rewritten effect from a hand trace:
  `if X < LO then LO else if HI < X then HI else X`, input order
  checked against `dig max min`) proves with `by fbm_verify [...]`
  and no `@by-proof`.

## 3. abs reassessment + regression

- [ ] 3.1 Reassess `abs` against the new machinery: either it proves
  via callee composition (`negitive?_effect` at the `?`-prefix
  boundary) or land a `@by-proof` hand-assembly over existing
  lemmas. Unpark (`-effect` → `@effect`) whichever way works.
- [ ] 3.2 Full regression: `chomp test:lean` green, all suite counts
  identical plus `clamp` (and `abs` if unparked). Document the
  generalized boundary rule + depth cap in `lean-proof/HELP.md`.
