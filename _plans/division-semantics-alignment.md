---
status: ready
status_date: 2026-03-29
creator: codex
---

# Plan: Align Division Semantics Across Runtimes

## Summary

Make all maintained F♭m runtimes implement the same negative-integer semantics for `/` and `%`.
The canonical rule is truncate-toward-zero division with the matching remainder:
`q = trunc(a / b)`, `r = a - b*q`.
This is an explicit project decision, not just a temporary reading of current runtime behavior.

## Context

Investigation on 2026-03-24 found that the runtimes did not all agree on division for
negative operands.

- Deno/Node/Bun already implement the desired pair through the shared TypeScript core.
- Python is now aligned in [`python/execute.py`](python/execute.py): it uses truncate-toward-zero division and matching remainder semantics via an integer-only helper, eliminating the prior large-integer float-conversion risk.
- Dart is now aligned in [`dart/bin/dart.dart`](dart/bin/dart.dart): `/` and `%` use paired truncate-toward-zero quotient and remainder logic matching the project rule.
- Racket truncates `/` toward zero, but `%` still uses `modulo`, which is also divisor-signed.
- Go is already aligned with the desired semantics: `/` uses `big.Int.Quo`, `%` uses
  `big.Int.Rem`, and regression coverage already exists in [`go/src/engine/engine_test.go`](go/src/engine/engine_test.go).
- Ruby is now aligned in [`ruby/execute.rb`](ruby/execute.rb): `/` and `%` use paired truncate-toward-zero quotient and remainder logic instead of raw Ruby floor-division behavior.

This mismatch is now documented in [`README.md`](README.md)
and [`_docs/core-vocabulary.md`](_docs/core-vocabulary.md).
The math library already contains code comments that assume truncate-toward-zero division, for
example [`ff/lib/math/exp.ffp`](ff/lib/math/exp.ffp).

During design review, the alternatives considered were:

- Euclidean division/modulo: mathematically clean, but it would require redefining the shared
  TypeScript core behavior and revisiting docs/tests that already treat the TS runtime as the
  reference implementation.
- Floor division/modulo: familiar in Python/Ruby, but it would also require changing the current
  TS-core behavior and would not match the math-library assumptions already encoded in the repo.

The chosen direction is therefore to keep the existing TS-core rule and align the remaining
drifting runtime to it.

## Approach

1. Define the canonical regression cases for both `/` and `%`.
   Add shared expectations for at least:
   - `-3 2 / == -1`
   - `-3 2 % == -1`
   - `3 -2 / == -1`
   - `3 -2 % == 1`
   - `-3 -2 / == 1`
   - `-3 -2 % == -1`

2. Finish aligning the remaining drifting runtime.
   - Racket: replace `modulo` with `remainder` so `%` matches `quotient`, or switch both words to a
     single paired helper if that keeps the intent clearer.

   Python, Ruby, and Dart are already aligned with paired quotient/remainder helpers, so they now
   mainly need to stay covered by regression tests and status documentation.

3. Add or expand implementation-level tests.
   - Shared corpus test for the language-level behavior once Racket is fixed.
   - Runtime-local tests where helpful in the remaining drifting runtime. Go already has
      regression coverage for truncate-toward-zero division semantics in [`go/src/engine/engine_test.go`](go/src/engine/engine_test.go).
   - Keep Python, Ruby, and Dart coverage focused on the paired-helper behavior, including Python
      cases with very large integers so the helper does not rely on floating-point conversion.

4. Re-run the relevant runtime test suites and refresh the docs status note.
   After alignment, remove the temporary implementation-drift note from the docs or rewrite it to
   state that all runtimes now match the documented semantics.

## Decisions already made

- Canonical semantics are:
  - `/` is integer division truncated toward zero.
  - `%` is the matching remainder, so `a = b * (a b /) + (a b %)` and the remainder keeps the sign
    of the dividend unless it is zero.
- Deno/Node/Bun shared TypeScript behavior is the target to align to.
- Go is already aligned with the canonical truncate-toward-zero `/` and matching `%` semantics and
  already has regression coverage for them.
- Euclidean and floor-division semantics were considered and rejected for this repo.
- Do not change the shared TypeScript core to match host-language defaults in Python, Ruby, Go, or
  Racket; change those runtimes to match the project rule instead.
- The plan covers `/` and `%` together. Fixing only `/` would keep `divrem` and related math words
  inconsistent.
- Documentation should describe the canonical semantics now, while only noting the remaining
  Racket implementation drift until that runtime is aligned.

## Open questions

None — ready to implement.

## Out of scope

- Changing the semantics of positive-operand division.
- Broader arithmetic redesign outside `/` and `%`.
- Changing higher-level math APIs except where they need comment or test updates because of the
  primitive fix.

## Dependencies

- None

## References

- [`README.md`](README.md)
- [`_docs/core-vocabulary.md`](_docs/core-vocabulary.md)
- [`_docs/fbm-by-example.md`](_docs/fbm-by-example.md)
- [`typescript/core/src/engine.ts`](typescript/core/src/engine.ts)
- [`python/execute.py`](python/execute.py)
- [`dart/bin/dart.dart`](dart/bin/dart.dart)
- [`ruby/execute.rb`](ruby/execute.rb)
- [`racket/private/engine.rkt`](racket/private/engine.rkt)
- [`go/src/engine/engine.go`](go/src/engine/engine.go)
