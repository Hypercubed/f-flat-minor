---
status: done
status_date: 2026-03-22
creator: unknown
---

# Plan: Precision-Helper `atan` Refactor

Implemented in `ff/lib/math/atan.ffp`, with `pi` callers migrated to `_atan__scaled`
and dedicated `atan` coverage added under `ff/lib/math/__tests__/atan.ffp`.

## Summary
Refactor `ff/lib/math/atan.ffp` away from its current ad hoc `scale`-driven public API and toward the library’s newer precision-helper pattern. This change introduces public `iatan`, `natan`, and `qatan`, keeps an internal scaled helper for `pi.ffp`, retains `atan-inv` as a helper alias, and removes the public `atan2` / `atan` names.

## Context
`ff/lib/math/atan.ffp` currently exposes a scaled API directly:

- `atan2 ( n u v -- scaled )`
- `atan ( n x -- scaled )`
- `atan-inv ( n x -- scaled )`

This predates the newer precision-helper layer now present in `ff/lib/math/precision.ffp`, and it still derives the scale factor inline with `10 swap ^` instead of using `n->S`, `n->K`, and `p/q*S`.

The current repo also has two structural facts that affect the refactor:

- there is no dedicated `atan` test file yet
- `ff/lib/math/pi.ffp` currently depends directly on the public `atan2` API

The implementation does already preserve the right high-level behaviors we want to keep:

- signed ratio inputs
- `u = 0` returning `0`
- `v = 0` returning `sign(u) * pi/2`
- complementary-angle handling when `|u| > |v|`

### Lessons learned from `exp`

The recent `exp` work exposed several implementation lessons that should shape this refactor:

- Keep the internal implementation layer and the public wrapper layer separate. Public wrappers are convenient API entrypoints, but they are a poor foundation for later composition.
- Prefer shared precision helpers over inline scale logic. The precision token should stay `n`, with `n->S`, `n->K`, and `p/q*S` as the common boundary vocabulary.
- Keep one internal helper for repo-internal dependents. `pi.ffp` needs scaled arctangent results; the cleanest way to avoid a public `nqatan` in this pass is an internal scaled helper.
- Add a dedicated test file before broad refactors. `exp` was much easier to change safely once it had focused tests rather than only caller-level coverage.
- Be cautious with queue-heavy recursion and boundary arithmetic. Any new loop or scaling helper should keep stack effects explicit and avoid hidden assumptions about truncation or queue state.

## Approach
Implement the refactor in three layers.

### 1. Public API reshape
Replace the public entrypoints in `ff/lib/math/atan.ffp` with:

- `iatan ( x -- y )`
- `natan ( n x -- y )`
- `qatan ( u v -- y )`
- `atan-inv ( n x -- y )` as a retained helper alias

Do not preserve public `atan2` or `atan` compatibility names in this refactor.

### 2. Internal precision-driven helper
Introduce one internal shared helper:

- `_atan__scaled ( n u v -- scaled )`

This helper becomes the implementation target used by:

- `iatan` via `0 x 1 _atan__scaled`
- `natan` via `n x 1 _atan__scaled`
- `qatan` via `0 u v _atan__scaled`
- `atan-inv` via `n 1 x _atan__scaled`
- `ff/lib/math/pi.ffp`

`_atan__scaled` must:

- use `n->S` rather than raw `10 swap ^`
- use `n->K` to determine the Taylor term budget
- use `p/q*S` at the final scaling boundary
- preserve the existing signed-ratio behavior from `atan2`

This pass does not need to expose a public `nqatan`.

### 3. Preserve existing math behavior
Keep the current behavioral branches, but re-home them behind the new internal helper:

- `u = 0` returns `0`
- `v = 0` returns `sign(u) * floor(pi/2)` at the requested precision
- signed inputs are normalized with the existing absolute-value plus sign-restoration pattern
- when `|u| > |v|`, continue to use the complementary-angle identity instead of forcing the Taylor loop to converge on a large-magnitude ratio

The current recursive Taylor core can be reworked as needed, but the public semantics above are fixed and should not be relitigated during implementation.

## Decisions Already Made
- Public API becomes `iatan`, `natan`, and `qatan`.
- `atan-inv` remains as a helper alias, even though it is not part of the main naming family.
- Public `atan2` and `atan` are removed, and repo callers are updated accordingly.
- `ff/lib/math/pi.ffp` is updated to call the new internal scaled helper instead of the old public `atan2`.
- The refactor must use `n->S`, `n->K`, and `p/q*S`.
- No public `nqatan` is added in this pass.
- The full general rational-helper layer (`r*`, `r-`, etc.) is out of scope for this change.

## Open Questions
None — ready to implement.

## Out of Scope
- Adding public `nqatan`
- Reworking `pi.ffp` to use full rational `atan-parts` composition
- Refactoring the rest of the atan/trig family in the same change
- Preserving public `atan2` / `atan` compatibility aliases
- Implementing the full rational-helper layer from `_plans/ffm-math-library.md`

## Dependencies
- `ff/lib/math/precision.ffp`
- `ff/lib/math/pi.ffp`
- `_plans/ffm-math-library.md`
- `_docs/math-naming-convention.md`

## Test Plan
Add a new dedicated test file for `atan`, since none exists today.

Cover:

- exact/small cases for `iatan`:
  - `iatan 0`
  - `iatan 1`
  - `iatan -1`
- exact/small cases for `qatan`:
  - `qatan 0 1`
  - `qatan 1 1`
  - `qatan -1 1`
  - `qatan 1 -1`
  - denominator-zero behavior for `qatan 1 0` and `qatan -1 0`
- scaled cases for `natan`:
  - `natan 5 1`
  - at least one higher-precision regression case with baked reference digits
- consistency checks:
  - `0 x natan == x iatan`
  - `x 1 qatan == x iatan`
  - `n x atan-inv == n 1 x _atan__scaled` behavior through the public alias
- unchanged `pi` coverage:
  - run existing `ff/lib/math/__tests__/pi.ffp` unchanged after the caller migration

Reference values should be generated from a high-precision external calculation and baked into the new test file so later implementation changes can preserve behavior without re-deciding expected outputs.

## References
- `_plans/ffm-math-library.md`
- `_plans/nexp-implementation.md`
- `_docs/math-naming-convention.md`
- `ff/lib/math/atan.ffp`
- `ff/lib/math/pi.ffp`
