# Proposal

## Why

Tetration (`^^`) and pentation (`^^^`) are parked with "hyperoperation spec inexpressible in effect expr language": effects can name single iteration (`iterates(F,N,A)` sugar over `SpecHist2`) but not iterated iteration — "apply (x ↦ A^x), B-1 times, from A" has no spelling. The proof side (nested induction) is separate tactic curriculum; but the *statement* side is a pure language gap, closable translator-only with no prover changes. Unblocking the statement lets `^^`'s effect be written, its proof attempted (via `@by-proof` hand-assembly or a future `@by-axiom` assumption), and the park reason narrowed to the tactic half.

## What Changes

- Add a power-tower spelling to the effect expression language with a Lean-side helper (same one-line translator pattern as `gcd`/`igcd`, `sqrt`/`isqrt`): a named function denoting the tower, defined once in `Fbm/Arith.lean` (or in-file `@lean` if word-local wins).
- Explore notation options (see Design) and pick one; the translator maps the chosen spelling(s), the effect for `^^` is rewritten to use it, and HELP.md documents it.
- No prover changes; no new clause kinds; no statement-shape changes. `^^^` follows the same pattern once `^^`'s spelling lands (pentation is `^^` iterated; out of scope for the first edit, noted as follow-up).

## Capabilities

### Modified Capabilities
- `lean-effect-prover`: power-tower expression spelling in `@effect` outputs with Lean-side denotation, so hyperoperation effects are statable.

## Impact

- `lean-proof/generate.py` (one translator mapping + tests).
- `lean-proof/Fbm/Arith.lean` (one helper def; or `num.ffp` `@lean` block if word-local).
- `ff/lib/math/num.ffp` (`^^` effect rewritten to the new spelling; stays parked on the tactic half with updated reason).
- `lean-proof/HELP.md` (tower spelling docs).
