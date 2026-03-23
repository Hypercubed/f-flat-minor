---
status: done
status_date: 2026-03-22
creator: unknown
---

# Plan: Precision-Driven `nexp` Without Fixed `e`

## Summary
Replace the current `nexp` implementation in `ff/lib/math/exp.ffp` with a precision-driven algorithm that computes `floor(10^n * e^x)` directly from an integer-only exponential series. The new design removes the fixed `__exp__e` precision ceiling and makes correctness depend on the caller’s requested `n`.

Implemented in `ff/lib/math/exp.ffp` with focused regression coverage in `ff/lib/math/__tests__/exp.ffp`.

## Context
The current implementation derives `nexp` from a baked constant `__exp__e = floor(e * 10^150)`. That makes `nexp` fundamentally limited to about `x * 150` meaningful digits for integer `x`, even if the caller requests a larger `n`. The existing math-library plan in `_plans/ffm-math-library.md` already points toward a two-layer design where internal `-parts` words return rational `p q`, and user-facing words scale once at the end with `p/q*S`.

This plan applies that design to exponential evaluation, starting with `nexp` while shaping the internals so future `qexp` / `nqexp` can reuse the same machinery.

## Approach
Implement `nexp` as a thin wrapper over a new internal rational exponential evaluator.

### 1. Replace fixed-constant evaluation with rational parts
Add an internal word in `ff/lib/math/exp.ffp` equivalent to:

- `__exp__parts ( n u v -- p q )`

Its contract is: approximate `exp(u/v)` as rational `p/q` with enough internal precision to support a final `n`-digit scaled result.

Do not keep `__exp__e` in the runtime path. It may be removed entirely if no other word still depends on it.

### 2. Use precision helpers local to `exp.ffp`
Define or reuse internal helpers for:

- `10^n`
- `K` term-count selection
- `floor(p * 10^n / q)`

Use the same conservative term-count policy as the math plan:

- `n_work = n + 20`
- `K = ceil(6 * n_work / 5) + 10`

Guard digits are part of the implementation, not the public API.

### 3. Reduce the argument by repeated halving
Before running the series, reduce `u/v` until the magnitude is small:

- While `abs(u) > v`, replace `(u, v)` with `(u, 2*v)`
- Count the number of halvings as `m`

This yields `r = u / (v * 2^m)` with `|r| <= 1`, which keeps the Taylor series practical and stable.

This reduction must work for positive and negative `u`. The sign stays in `u`; only `v` grows.

### 4. Evaluate the exponential series directly
For the reduced rational input `r = u/v`, compute `p q` using the exponential-series recurrence from the math plan:

- Initialize:
  - `q = 1`
  - `p = 1`
  - `t = u`
- For `k = 1..K`:
  - `q = q * k * v`
  - `p = p * k * v + t`
  - `t = t * u`

This is the exact integer recurrence for the truncated series `1 + u/v + u^2/(2! v^2) + ...`.

Use stack shapes and queue balancing carefully; keep `p`, `q`, and `t` in separate focused helpers where practical, following the guidance in `_plans/ffm-math-library.md`.

### 5. Undo range reduction with exact squaring
After evaluating `exp(r) ≈ p/q`, reconstruct the original value:

- Repeat `m` times:
  - `p = p * p`
  - `q = q * q`

This uses the identity `exp(x) = exp(x / 2^m)^(2^m)`.

After each squaring step, reduce the fraction with `gcd`:

- `g = gcd(p, q)`
- `p = p / g`
- `q = q / g`

This reduction is required to prevent numerator/denominator growth from becoming unnecessarily explosive during repeated squaring.

### 6. Public wrapper shape
Keep the public API:

- `nexp ( n x -- y )`

Implement it as:

- Treat integer `x` as rational `x / 1`
- Call `__exp__parts`
- Scale once at the end: `floor(p * 10^n / q)`

If `iexp` remains public, redefine it as a wrapper over `nexp` with `n = 0`, or over the same internal parts path with final scale `10^0`.

## Decisions Already Made
- The new implementation must not depend on a fixed-size precomputed `e`.
- `nexp` remains the public entrypoint with stack effect `( n x -- y )`.
- The internal algorithm should be shaped for future rational exponential words, not as a one-off integer-only trick.
- Range reduction is done by repeated halving, not by splitting into integer and fractional parts and multiplying by a precomputed `e^i`.
- Final decimal scaling happens exactly once, at the boundary.
- Guard digits default to `20`.
- Fraction reduction via `gcd` is included after each squaring step.

## Open Questions
None — ready to implement.

## Out of Scope
- Adding public `qexp` or `nqexp` in this change
- Reworking the full math library to the complete two-layer architecture in one pass
- Performance optimization beyond the halving + series + squaring approach
- Binary splitting or asymptotically faster exponential evaluation

## Dependencies
- Existing `gcd` helper in `ff/lib/math/gcd.ffp`
- Existing stack/core helpers from `ff/lib/core/core.ff`
- Guidance and recurrence definitions in `_plans/ffm-math-library.md`

## Test Plan
Add or update focused tests in `ff/lib/math/__tests__/exp.ffp` to cover:

- Existing sanity cases:
  - `0 0 nexp == 1`
  - `0 1 nexp == 2`
  - `5 1 nexp == 271828`
- Higher-precision cases that exceed the old fixed-150-digit limit:
  - choose at least one case with `n > 150` and small positive `x`
  - verify the result has the expected decimal length / prefix behavior
- Negative exponent cases:
  - `0 -1 nexp`
  - `5 -1 nexp`
- Larger positive `x` that forces halving/squaring:
  - at least one case where `|x| > 1`
- Consistency checks:
  - for the same `x`, the `n+Δ` result should extend the `n`-digit result rather than contradict it
- `iexp` compatibility checks if `iexp` remains exported

## References
- `_plans/ffm-math-library.md`
- `_docs/math-naming-convention.md`
- `ff/lib/math/exp.ffp`
