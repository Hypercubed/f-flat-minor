---
status: ready
status_date: 2026-03-24
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
- Python truncates `/` toward zero, but `%` still uses Python's divisor-signed modulo.
- Racket truncates `/` toward zero, but `%` still uses `modulo`, which is also divisor-signed.
- Go is already aligned with the desired semantics: `/` uses `big.Int.Quo`, `%` uses
  `big.Int.Rem`, and regression coverage already exists in `go/src/engine/engine_test.go`.
- Ruby uses `/` and `%` directly on `Integer`, which gives floor division/modulo for negative operands.

This mismatch is now documented in [README.md](/home/jmh/workspace/projects/f-flat-minor/README.md)
and [_docs/core-vocabulary.md](/home/jmh/workspace/projects/f-flat-minor/_docs/core-vocabulary.md).
The math library already contains code comments that assume truncate-toward-zero division, for
example [ff/lib/math/exp.ffp](/home/jmh/workspace/projects/f-flat-minor/ff/lib/math/exp.ffp).

During design review, the alternatives considered were:

- Euclidean division/modulo: mathematically clean, but it would require redefining the shared
  TypeScript core behavior and revisiting docs/tests that already treat the TS runtime as the
  reference implementation.
- Floor division/modulo: familiar in Python/Ruby, but it would also require changing the current
  TS-core behavior and would not match the math-library assumptions already encoded in the repo.

The chosen direction is therefore to keep the existing TS-core rule and align the drifting
implementations to it.

## Approach

1. Define the canonical regression cases for both `/` and `%`.
   Add shared expectations for at least:
   - `-3 2 / == -1`
   - `-3 2 % == -1`
   - `3 -2 / == -1`
   - `3 -2 % == 1`
   - `-3 -2 / == 1`
   - `-3 -2 % == -1`

2. Fix the runtimes that currently drift.
   - Ruby: stop delegating directly to Ruby's `/` and `%` for negative integer division. Add a
      helper that computes truncate-toward-zero quotient and remainder as a pair from integer-only
      operations, then use it for both words.
   - Python: replace `int(lhs / rhs)` and `%=` with an integer-only helper that computes the
     truncate-toward-zero quotient and remainder together. This avoids both the semantic mismatch
     and the current large-integer float-conversion risk.
   - Racket: replace `modulo` with `remainder` so `%` matches `quotient`, or switch both words to a
     single paired helper if that keeps the intent clearer.

3. Add or expand implementation-level tests.
   - Shared corpus test for the language-level behavior once all runtimes are fixed.
   - Runtime-local tests where helpful in the remaining drifting runtimes. Go already has
     regression coverage for truncate-toward-zero division semantics in `go/src/engine/engine_test.go`.
   - Python test coverage should include very large integers to verify the new helper does not rely
     on floating-point conversion.

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
- Documentation should describe the canonical semantics now, while also noting implementation drift
  until the code is aligned.

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

- [README.md](/home/jmh/workspace/projects/f-flat-minor/README.md)
- [_docs/core-vocabulary.md](/home/jmh/workspace/projects/f-flat-minor/_docs/core-vocabulary.md)
- [_docs/fbm-by-example.md](/home/jmh/workspace/projects/f-flat-minor/_docs/fbm-by-example.md)
- [typescript/core/src/engine.ts](/home/jmh/workspace/projects/f-flat-minor/typescript/core/src/engine.ts)
- [python/execute.py](/home/jmh/workspace/projects/f-flat-minor/python/execute.py)
- [ruby/execute.rb](/home/jmh/workspace/projects/f-flat-minor/ruby/execute.rb)
- [racket/private/engine.rkt](/home/jmh/workspace/projects/f-flat-minor/racket/private/engine.rkt)
- [go/src/engine/engine.go](/home/jmh/workspace/projects/f-flat-minor/go/src/engine/engine.go)
