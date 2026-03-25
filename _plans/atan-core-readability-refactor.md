---
status: ready
status_date: 2026-03-24
creator: codex
---

# Plan: Atan Core Readability Refactor

## Summary
Refactor `ff/lib/math/atan-core.ffp` for readability without changing behavior. The work should make the Taylor-series setup and tail iteration easier to understand by reusing existing helpers where possible and introducing small module-private words for intent-revealing steps.

## Context
`ff/lib/math/atan-core.ffp` contains the shared arctan Taylor core used by both `atan.ffp` and `pi.ffp`. The current implementation works, but the longest words are difficult to follow because they combine multiple queue and stack transformations into dense sequences.

The hardest-to-read sections are:

- `__atan__parts`, which builds the initial Taylor state
- `__atan_core__tail_loop`, which advances the recursive series state

This plan is for readability only. It should preserve the current math behavior, stack effects, and private/public module boundaries.

## Approach
Use the existing `sqr` helper from `ff/lib/math/arith.ffp` anywhere `atan-core.ffp` currently spells squaring as `dup *`.

Replace or rename `__atan_core__m2` with a clearer module-private helper name that describes its actual purpose rather than its implementation shorthand.

Split `__atan__parts` into smaller local helpers so the top-level word reads as a sequence of intentions instead of raw stack choreography. At minimum:

- one helper for deriving the Taylor term budget / initial odd value from `n`
- one helper for building the squared inputs and seed numerator/denominator state

Refactor the tail recursion so `__atan_core__tail_loop` reads in terms of a single “advance one Taylor step” helper rather than directly composing `__atan_core__newq_stack` and `__atan_core__u2_newp_stack` inline.

Keep the queue-heavy helpers private to `atan-core.ffp`. Do not promote queue-specific helper words into shared math modules unless, after the local refactor, one is clearly generic and broadly useful outside the arctan implementation.

Preserve and improve stack-effect comments so each helper documents both:

- its stack contract
- its mathematical role in the Taylor-series computation

## Decisions already made
- This is a readability and maintainability refactor only; behavior must remain unchanged.
- New helper words should stay local to `ff/lib/math/atan-core.ffp` unless they are obviously reusable beyond `atan`.
- Existing shared helpers already worth using here include `sqr`, `n->K`, and `p/q*S`.
- No public API changes should be made to `iatan`, `natan`, `qatan`, `atan-inv`, or `npi`.

## Open questions
None -- ready to implement.

## Out of scope
- Changing the numerical algorithm or convergence behavior
- Adding new public math vocabulary
- Refactoring unrelated trig/math modules beyond any tiny shared-helper reuse already present
- Changing test expectations or precision semantics

## Dependencies
- `ff/lib/math/atan-core.ffp`
- `ff/lib/math/arith.ffp`
- `ff/lib/math/precision.ffp`
- `ff/lib/math/atan.ffp`
- `ff/lib/math/pi.ffp`
- `_docs/math-naming-internal.md`

## References
- `ff/lib/math/atan-core.ffp`
- `ff/lib/math/atan.ffp`
- `ff/lib/math/pi.ffp`
- `_plans/done/atan-precision-refactor.md`
- `_docs/math-naming-internal.md`
