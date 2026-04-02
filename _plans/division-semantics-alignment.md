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
- Racket: **`%` now uses `remainder`** (paired with `quotient`) in [`racket/private/engine.rkt`](racket/private/engine.rkt); unit tests cover the canonical cases.
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
- Documentation should describe the canonical semantics now, while only noting any remaining
  implementation drift until each runtime is aligned.

## WASM / AssemblyScript (code review, no runtime tests relied on)

### WebAssembly (`wasm/`)

- [`wasm/include/core.wat`](wasm/include/core.wat) / [`wasm/build/interpret.wat`](wasm/build/interpret.wat): **`/`** is implemented with **`i64.div_s`**: divisor is popped first, dividend is `peek`, so the operation is signed division with **truncate toward zero** (WebAssembly semantics). **There is no `%` opcode** in the `elem` table (no `OP_MOD`; ASCII `%` / 37 is not wired). Programs that use `%` are not supported by this interpreter at all.
- If **`%`** is added, it must use **`i64.rem_s`** with the **same `(dividend, divisor)` order** as **`i64.div_s`** so quotient and remainder stay paired.

### AssemblyScript (`assemblyscript/`)

- [`assemblyscript/assembly/mp.ts`](assemblyscript/assembly/mp.ts): **`MpZ.div`** implements truncate-toward-zero via unsigned magnitude division and sign XOR; **`MpZ.mod`** derives a remainder from **`q = div`** using **`_usub`** / **`rhs._umul(q)`** plus a sign adjustment. **`MpZ.rem`** is **`this.sub(rhs.mul(q))`**, i.e. **`a - b*q`**, which is the canonical paired remainder. By inspection the **`div`/`mod`** pair is intended to match that rule; **`mod`** is harder to audit than **`rem`** because **`_umul`** is magnitude-only.
- [`assemblyscript/assembly/vm.ts`](assemblyscript/assembly/vm.ts): **`div`** / **`mod`** pop **`rhs`** then **`lhs`** and call **`MpZ.div`** / **`MpZ.mod`**, consistent with other runtimes.
- [`assemblyscript/assembly/__tests__/mod.spec.ts`](assemblyscript/assembly/__tests__/mod.spec.ts): Negative cases include **`// TODO: check this`** comments; the six canonical plan cases are not spelled out as named assertions.

### Todos (WASM / AssemblyScript)

- [ ] **WASM**: Implement **`%`** (e.g. **`OP_MOD`** + **`$MOD`** using **`i64.rem_s`**, mirroring **`$DIV`** stack order). Rebuild or sync **`wasm/build/interpret.wat`** if it is generated from includes.
- [ ] **AssemblyScript**: Add explicit regression coverage for the six canonical **`/`** / **`%`** cases on **`MpZ`** (and/or resolve the **`TODO`** comments in **`mod.spec.ts`**). Optionally **rewrite `MpZ.mod`** to delegate to **`rem`** (or **`this.sub(rhs.mul(this.div(rhs)))`**) so **`%`** matches one obvious definition and stays in lockstep with **`div`**.

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
- [`wasm/include/core.wat`](wasm/include/core.wat)
- [`assemblyscript/assembly/mp.ts`](assemblyscript/assembly/mp.ts)
- [`assemblyscript/assembly/vm.ts`](assemblyscript/assembly/vm.ts)
