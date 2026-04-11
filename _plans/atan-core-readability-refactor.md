---
status: in-progress
status_date: 2026-03-30
creator: codex
---

# Plan: Atan Core Readability Refactor

## Summary
Improve readability and safety of `ff/lib/math/atan-core.ffp` and `ff/lib/math/atan.ffp` by
eliminating `.unsafe` usage, improving helper naming, and adding per-line stack-effect annotations.

## Invariant

All words in `atan-core.ffp` must be queue-safe: every word starts and ends with an unknown and
inconsequential queue. No word may implicitly consume or rewrite items left in the queue by a
caller.

## Completed Work

### atan-core.ffp

1. **`.unsafe` eliminated** — `__u2_newp` previously consumed `v2` implicitly from the queue.
   It now accepts `v2` explicitly on the stack. All words are now queue-safe.

2. **`__over3` extracted** — the pattern `q< q< over q> q> dig` was named and documented.
   Stack effect: `x a b c __over3 == x a b c x`.

3. **Per-line stack-effect annotations** — `__u2_newp` and `__newq_stack` now have a comment
   after every line showing the stack state (and queue state after `|`) at that point.

4. **`__m2` removed** — replaced inline by `* *` at call sites (it was `.inline` anyway).

5. **Helper decomposition** — `__parts` composes from focused helpers (`__odd_from_precision`,
   `__seed_taylor_state`, `__tail_loop`, `__scale_tail_result`).

6. **`sqr` adoption** — `__seed_taylor_state` uses `sqr` from `arith.ffp`.

7. **Naming alignment** — helpers follow the `_{filename}__{name}` pattern from
   `_docs/supplemental/math-naming-internal.md` where appropriate.

## Remaining Work

### 1. Simplify `atan.ffp`

`atan.ffp` contains several helpers (`__abs_scaled`, `__finite`, `__den_zero`, `__num_zero`)
with complex queue usage. Review for:
- Queue safety (same invariant as atan-core.ffp)
- Per-line stack-effect annotations
- Opportunities to simplify or rename helpers for clarity

### 2. Consider renaming `__m2`

Already removed in atan-core.ffp. Verify no other files reference it.

## Approach

1. Audit `atan.ffp` helpers for queue safety and clarity
2. Add per-line annotations where queue operations are non-trivial
3. Run the math test suite after each change to verify no behavioral changes

## Decisions already made

- This is a readability and maintainability refactor only; behavior must remain unchanged.
- Helpers stay local to their respective files unless obviously reusable.
- Public API (`iatan`, `natan`, `qatan`, `atan-inv`, `npi`) must not change.
- Queue-safe invariant: all words treat the incoming queue as unknown and inconsequential.

## Out of scope

- Changing the numerical algorithm or convergence behavior
- Adding new public math vocabulary
- Refactoring unrelated trig/math modules
- Changing test expectations or precision semantics

## Dependencies

- `ff/lib/math/atan-core.ffp`
- `ff/lib/math/atan.ffp`
- `ff/lib/math/arith.ffp`
- `ff/lib/math/precision.ffp`
- `ff/lib/math/pi.ffp`
- `_docs/supplemental/math-naming-internal.md`

## References

- `ff/lib/math/atan-core.ffp`
- `ff/lib/math/atan.ffp`
- `ff/lib/math/pi.ffp`
- `_plans/done/atan-precision-refactor.md`
- `_docs/supplemental/math-naming-internal.md`
