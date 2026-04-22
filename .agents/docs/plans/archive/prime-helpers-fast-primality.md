---
id: prime-helpers-fast-primality
title: "Add Public `maybe_prime?` and Accelerate Prime Helpers"
last_updated: 2026-03-23
description: >
  Add a public Miller–Rabin-based maybe_prime? to ff/lib/math/primes.ffp,
  and use it internally to speed up prime? and next-prime without changing
   their exact result contracts. Outcome: implemented in ff/lib/math/prime
  s.ffp and covered by the updated primes test file. The shared...
tags: [plans]
status: completed
kind: initiative
author_kind: ai
prompter: "openai/gpt-5.4"
---
# Plan: Add Public `maybe_prime?` and Accelerate Prime Helpers

## Summary

Add a public Miller–Rabin-based `maybe_prime?` to `ff/lib/math/primes.ffp`, and use it internally to speed up `prime?` and `next-prime` without changing their exact result contracts.

Outcome: implemented in `ff/lib/math/primes.ffp` and covered by the updated primes test file. The shared-library version kept the experimental Miller–Rabin structure, but its power-mod step was cleaned up to use modular repeated squaring so the large-number cases run successfully.

## Context

The current shared library implementation in `ff/lib/math/primes.ffp` relies on exact trial division through `__primes__trial` and candidate iteration through `__primes__next`. This is correct but slow for larger inputs, especially for large primes and `next-prime` searches near them.

There are two experimental directions in the repo:

- `ff/experimental/primes-test.ffp` contains several primality tests, including a Miller–Rabin-based `maybe_prime?`
- `ff/experimental/primes.ffp` contains a bitmap lookup for small primes using `ff/experimental/primes-encoded.ff`

The bitmap approach is not a good fit for the shared library under the current constraint that any bundled lookup stay under 200 decimal digits. In this encoding that only gives about 661 bits, which reaches odd values only up to about 1323. That is too small to justify adding a generated data file and extra lookup logic.

The chosen direction is therefore to expose Miller–Rabin publicly as `maybe_prime?`, keep `prime?` exact, and use `maybe_prime?` only as a fast internal screen before exact confirmation.

## Approach

Implement the following changes in `ff/lib/math/primes.ffp`:

1. Add a new public word `maybe_prime?`
- Contract:
  - `false` means definitely composite
  - `true` means probably prime
- Behavior:
  - for `n < 4`, return `n > 1`
  - reject values divisible by `2` or `3` exactly before Miller–Rabin
  - for odd `n >= 5`, run a 2-round Miller–Rabin screen with random bases in `[2, n - 2]`

2. Add private Miller–Rabin helpers in `ff/lib/math/primes.ffp`
- `__primes__factor_by_2` to split `n - 1` into `d * 2^s`
- `__primes__powmod` using repeated squaring with modulo reduction at each step
- `__primes__mr_witness?` for a single witness check
- `__primes__mr_screen?` for the 2-round screen
- Keep helper names private using the `__primes__...` convention

3. Do not port the experimental `^mod: swap ^ over %` implementation directly
- The library implementation should use real modular exponentiation, not plain exponentiation followed by `%`
- This avoids enormous intermediate values and is the main reason to reimplement MR cleanly in the shared library

4. Keep `prime?` exact
- Preserve the current small-number handling and `__primes__simple-composite?` front-end
- For odd `n >= 5`:
  - call `maybe_prime?`
  - if `maybe_prime?` returns `false`, return `false` immediately
  - if `maybe_prime?` returns `true`, fall through to exact `__primes__trial`
- This keeps the public result deterministic and exact while rejecting many composites early

5. Leave `next-prime` and `th-prime` exact
- Keep `__primes__next` structurally the same
- Let `next-prime` inherit the speedup through the updated `prime?`
- Keep `th-prime` unchanged except for the indirect performance gain through `next-prime`

6. Do not add the experimental bitmap lookup to the shared library
- Do not import or create a shared-library equivalent of `ff/experimental/primes-encoded.ff`
- Do not add `_prime-lookup`, `small-next-prime`, or related lookup-only paths to `ff/lib/math/primes.ffp`
- If desired later, revisit lookup only if the size limit changes or a different compact representation is chosen

7. Add concise comments documenting the public contract
- `maybe_prime?` should be documented as probabilistic
- `prime?` should remain documented as exact
- Internal comments should make it clear that Miller–Rabin is a screen, not the final proof step for `prime?`

8. Update or extend tests in `ff/lib/math/__tests__/primes.ffp`
- Add exact-result checks for `prime?` over:
  - `0..10`
  - `221`
  - `561`
  - `2147483651`
  - `2147483647`
- Add exact-result checks for `next-prime`, including `2147483647 -> 2147483659`
- Keep the current `th-prime` checks
- Add stable `maybe_prime?` assertions only for values whose results are deterministic under the planned flow:
  - `0`, `1`, `2`, `3`, `4`, `6`, `8`, `9`, `10`
  - known primes such as `5`, `29`, `97`, `2147483647`
- Avoid strict pass/fail assertions for odd nontrivial composites that would depend on random witness selection unless implementation later switches to fixed bases

9. Run verification after implementation
- Run `node node/bin/ff-run.ts ff/lib/math/__tests__/primes.ffp`
- Run a dependent smoke test such as `ff/factors.ffp` to confirm exact callers still behave correctly
- Record before/after timings for:
  - `2147483651 prime?`
  - `2147483647 prime?`
  - `2147483647 next-prime`

## Decisions already made

- `maybe_prime?` should be exposed publicly in the shared library
- `prime?` must remain exact
- `next-prime` must remain exact
- `th-prime` remains derived from `next-prime`
- The shared-library implementation should use Miller–Rabin, not Fermat or Wilson
- The shared-library Miller–Rabin should use real modular exponentiation
- The shared library should not use the experimental bitmap lookup under the current `< 200` decimal-digit limit
- The initial Miller–Rabin configuration should use 2 rounds

## Open questions

None — ready to implement.

## Out of scope

- Updating `ff/experimental/primes.ffp` or `ff/experimental/primes-test.ffp` for parity
- Designing a new compressed small-prime table format
- Making `prime?` probabilistic
- Changing the public semantics of `next-prime` or `th-prime`
- Broad README cleanup except where directly necessary for touched code or tests

## Dependencies

- None

## References

- `ff/lib/math/primes.ffp`
- `ff/lib/math/__tests__/primes.ffp`
- `ff/experimental/primes-test.ffp`
- `ff/experimental/primes.ffp`
- `.agents/skills/plans/SKILL.md`
