# Tasks

## 1. Explore + pick notation

- [ ] 1.1 Probe `^^` on the interpreter for edge inputs (0, 1, negatives for A and B) and record what the word actually computes; this fixes the helper's edge semantics and the `requires` domain.
- [ ] 1.2 Pick one of A/B/C (recommendation: A, `tower(A,B)`); record the pick + one-line rationale in design.md.

## 2. Implement spelling

- [ ] 2.1 Add the translator mapping in `lean-proof/generate.py` (same pattern as `gcd`/`igcd`); add the Lean-side helper (`Fbm/Arith.lean`, or in-file `@lean` if word-local wins — same decision rule as `fact`).
- [ ] 2.2 Rewrite `^^`'s effect to the new spelling (keep it parked with updated reason: statement now expressible, proof needs nested induction). Verify the statement emits and parses (`lake env lean` accepts the generated file; proof expected to fail — statability is the gate, not green).
- [ ] 2.3 Document the spelling in `lean-proof/HELP.md` (with the A-vs-C note for pentation).

## 3. Regression

- [ ] 3.1 Full math suite green with no count change (new statement must not alter other theorems); primitives + prelude unchanged.
