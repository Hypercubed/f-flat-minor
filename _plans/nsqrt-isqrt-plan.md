# `nsqrt` and `isqrt` follow-up plan

## Context

Current integer square root behavior lives in [`ff/lib/math/sqrt.ffp`](ff/lib/math/sqrt.ffp), where [`isqrt`](ff/lib/math/sqrt.ffp:52) uses the recursive digit-by-digit helper [`__sqrt__next`](ff/lib/math/sqrt.ffp:40). Older alternatives [`isqrt_newton`](ff/lib/math/sqrt.ffp:16) and [`isqrt_jarvis`](ff/lib/math/sqrt.ffp:32) are still present as exploratory implementations.

The broader math plan in [`_plans/ffm-math-library.md`](_plans/ffm-math-library.md) currently places sqrt in the separate non-series branch and describes it as Newton-based in the dependency graph section at [`_plans/ffm-math-library.md`]( _plans/ffm-math-library.md:632 ). That no longer matches the active implementation.

The requested public API direction for this follow-up is:

- [`nsqrt`](ff/lib/math/sqrt.ffp) should be planned as `n x -- floor(10^n*sqrt(x))`
- this should match the public wrapper style used by [`nexp`](ff/lib/math/exp.ffp:121)

## Recommendation on `isqrt`

Do **not** switch active [`isqrt`](ff/lib/math/sqrt.ffp:52) back to Newton as the first step.

Reasoning:

- The current recursive digit-by-digit implementation computes exact floor integer square roots directly, which is exactly what [`isqrt`](ff/lib/math/sqrt.ffp:52) promises.
- The plan file explicitly treats sqrt as a separate track from the series-based transcendental work, so there is no design pressure to force it into the same recurrence style as [`exp`](ff/lib/math/exp.ffp:99) or [`atan2`](ff/lib/math/atan.ffp:190).
- For [`nsqrt`](ff/lib/math/sqrt.ffp), an exact integer-root primitive is the most useful base operation, because scaled square root can be reduced to integer square root of a scaled radicand.
- The existing Newton version in [`isqrt_newton`](ff/lib/math/sqrt.ffp:16) lacks an explicit convergence/initial-guess strategy tuned to the precision-wrapper use case, while the active implementation is already exact and simpler to reason about for flooring semantics.

## Planned design

### 1. Update the math plan to reflect reality

Adjust the sqrt notes in [`_plans/ffm-math-library.md`](_plans/ffm-math-library.md) so they no longer imply that the active square-root path is Newton-only.

Proposed plan update:

- describe [`isqrt`](ff/lib/math/sqrt.ffp:52) as the exact integer primitive already available
- describe [`nsqrt`](ff/lib/math/sqrt.ffp) as a scaled wrapper built on integer square root
- keep Newton as an optional future optimization strategy rather than the defining API model

### 2. Keep one canonical exact integer-root path

Refactor [`ff/lib/math/sqrt.ffp`](ff/lib/math/sqrt.ffp) so the intended production path is unambiguous.

Implementation direction:

- keep [`isqrt`](ff/lib/math/sqrt.ffp:52) and [`isqrtrem`](ff/lib/math/sqrt.ffp:58) as the canonical public integer-root words
- decide whether [`isqrt_newton`](ff/lib/math/sqrt.ffp:16) and [`isqrt_jarvis`](ff/lib/math/sqrt.ffp:32) should remain as documented alternatives or be removed to reduce ambiguity
- if retained, mark them clearly as experimental or reference implementations in comments

### 3. Add scaled-radicand helpers in [`ff/lib/math/precision.ffp`](ff/lib/math/precision.ffp)

To support [`nsqrt`](ff/lib/math/sqrt.ffp) cleanly, add small internal helpers in [`ff/lib/math/precision.ffp`](ff/lib/math/precision.ffp) rather than embedding all scaling logic into [`ff/lib/math/sqrt.ffp`](ff/lib/math/sqrt.ffp).

Helpers to add:

- `n->S2` with stack effect `n -- 10^(2n)`
- optionally `scale-squared` with stack effect `x n -- x*10^(2n)` if that improves readability in the eventual [`nsqrt`](ff/lib/math/sqrt.ffp) body

Rationale:

- [`nsqrt`](ff/lib/math/sqrt.ffp) for integer `x` can use the identity `floor(10^n*sqrt(x)) = isqrt(x*10^(2n))`
- [`n->S`](ff/lib/math/precision.ffp:4) already exists, but a named helper for `10^(2n)` avoids repeated `2 *` stack noise and makes tests/documentation clearer
- keeping this in [`ff/lib/math/precision.ffp`](ff/lib/math/precision.ffp) matches the existing role of shared scaling helpers like [`p/q*S`](ff/lib/math/precision.ffp:6)

### 4. Implement [`nsqrt`](ff/lib/math/sqrt.ffp)

Primary implementation target:

```f-flat-minor
/* n x -- floor(10^n*sqrt(x)) */
nsqrt: dup 0 < [ 1 0 / ] ?  swap n->S2 * isqrt ;
```

This exact stack sketch should be validated against real stack order during implementation, but the algorithm should be:

1. reject negative input consistently with [`isqrt`](ff/lib/math/sqrt.ffp:53)
2. compute `10^(2n)` via a shared precision helper
3. multiply the radicand by that scale
4. run [`isqrt`](ff/lib/math/sqrt.ffp:52)

This gives correct floor semantics for perfect and imperfect squares without introducing rational arithmetic.

### 5. Decide whether [`isqrt`](ff/lib/math/sqrt.ffp:52) needs internal changes for `nsqrt`

Likely answer: only minimal cleanup, not algorithm replacement.

Possible updates:

- add a short note that [`isqrt`](ff/lib/math/sqrt.ffp:52) is now the base primitive for [`nsqrt`](ff/lib/math/sqrt.ffp)
- confirm behavior for edge cases `0` and `1`
- confirm that recursion depth is acceptable for scaled radicands produced by [`nsqrt`](ff/lib/math/sqrt.ffp)

Only if testing reveals performance or recursion issues should implementation switch back to a Newton variant.

### 6. Add focused tests

Add or extend math tests to cover:

- [`isqrt`](ff/lib/math/sqrt.ffp:52): `0`, `1`, non-squares, large perfect squares, negative-input failure behavior
- [`isqrtrem`](ff/lib/math/sqrt.ffp:58): remainder correctness on representative values
- [`nsqrt`](ff/lib/math/sqrt.ffp):
  - `0 0 nsqrt -> 0`
  - `0 2 nsqrt -> 1`
  - `1 2 nsqrt -> 14`
  - `3 2 nsqrt -> 1414`
  - perfect-square cases such as `2 81 nsqrt -> 900`
- helper coverage for any new words in [`ff/lib/math/precision.ffp`](ff/lib/math/precision.ffp)

## Actionable implementation checklist

- [x] Update `_plans/ffm-math-library.md` sqrt section so it matches the actual integer-root-first design
- [x] Add shared scale helpers in [`ff/lib/math/precision.ffp`](ff/lib/math/precision.ffp)
- [x] Simplify comments in [`ff/lib/math/sqrt.ffp`](ff/lib/math/sqrt.ffp) to identify canonical vs experimental implementations
- [x] Add [`nsqrt`](ff/lib/math/sqrt.ffp) as `n x -- floor(10^n*sqrt(x))`
- [x] Add or update math tests for [`isqrt`](ff/lib/math/sqrt.ffp:52), [`isqrtrem`](ff/lib/math/sqrt.ffp:58), and [`nsqrt`](ff/lib/math/sqrt.ffp)
- [x] Run the sqrt math tests and verify the new [`nsqrt`](ff/lib/math/sqrt.ffp) cases pass in the intended implementation(s)
- [ ] Add explicit negative-input failure coverage for [`isqrt`](ff/lib/math/sqrt.ffp:52) and [`nsqrt`](ff/lib/math/sqrt.ffp)
- [ ] Reassess recursion depth and performance for scaled radicands used by [`nsqrt`](ff/lib/math/sqrt.ffp)
- [ ] Decide whether any Newton-based implementation should be kept only after correctness and stack clarity are verified

## Notes for implementation mode

The highest-confidence first pass is **not** Newton-based [`nsqrt`](ff/lib/math/sqrt.ffp). It is an exact scaling wrapper around [`isqrt`](ff/lib/math/sqrt.ffp:52). That keeps the public API simple, matches the current exact-integer design, and stays aligned with the plan's statement that sqrt is a separate family outside the series machinery.
