---
status: in-progress
status_date: 2026-04-11
creator: kilo
---

# Plan: Expand TypeScript Optimizer Peephole Rules

## Summary

Document a practical shortlist of additional peephole optimizations for [`typescript/core/src/optimizer.ts`](typescript/core/src/optimizer.ts), prioritizing rules that are semantics-preserving, cheap to match, and consistent with the current IR rule style.

## Context

The current optimizer already handles basic null sequences, direct-call lowering, arithmetic folding for `+ - * /`, a small amount of algebraic simplification, simple `IF` pruning, empty quotation folding, and small-word inlining. Since this plan was created, the safe constant-folding, identity-rule, and commutativity-cleanup tranches have been implemented. The opcode set in [`typescript/core/src/opcodes.ts`](typescript/core/src/opcodes.ts) and runtime behavior in [`typescript/core/src/engine.ts`](typescript/core/src/engine.ts) still leave several obvious gaps:

- no follow-on control-flow rules that collapse already-folded conditions into `IF`

## Approach

Implement candidates in priority order, starting with rules that mirror existing arithmetic folds and require no optimizer architecture changes.

1. Done — add safe constant-folding rules for previously uncovered pure ops.

   Completed on 2026-04-11 in [`typescript/core/src/optimizer.ts`](typescript/core/src/optimizer.ts), with focused coverage in [`deno/src/optimizer_test.ts`](deno/src/optimizer_test.ts), optimizer reference updates in [`_docs/reference/optimized-compiler.md`](_docs/reference/optimized-compiler.md), and Codetta score recalculation.

   Implemented additions:

   - `a b MOD` -> `push(a % b)` with `b != 0`
   - `a b SHIFTL` -> `push(a << b)`
   - `a b SHIFTR` -> `push(a >> b)`
   - `a b AND` -> `push(a & b)`
   - `a b OR` -> `push(a | b)`
   - `a NOT` -> `push(~a)`
   - `a b LT` -> `push(a < b ? 1 : 0)`
   - `a b EQ` -> `push(a === b ? 1 : 0)`
   - `a b GT` -> `push(a > b ? 1 : 0)`
   - `a b POW` -> `push(a ** b)` with `b >= 0`

   Notes:

   - `%` should explicitly guard zero divisors just like `/` already does.
   - `^` should guard negative exponents because JS `bigint ** bigint` rejects them.
   - Shifts should only be added if the optimizer can safely mirror runtime semantics for all allowed `bigint` shift counts.

2. Done — add simple algebraic identity rules that preserve stack shape.

   Completed on 2026-04-11 in [`typescript/core/src/optimizer.ts`](typescript/core/src/optimizer.ts), with focused coverage in [`deno/src/optimizer_test.ts`](deno/src/optimizer_test.ts), optimizer reference updates in [`_docs/reference/optimized-compiler.md`](_docs/reference/optimized-compiler.md), and Codetta score recalculation.

   Implemented additions that fit the existing 1- or 2-instruction replacement model:

   - `0 OR` -> no-op (`a 0 | == a`)
   - `0 SHIFTL` -> no-op (`a 0 << == a`)
   - `0 SHIFTR` -> no-op (`a 0 >> == a`)
   - `1 POW` -> no-op (`a 1 ^ == a`)
   - `0 POW` -> `push 1` is covered for constant left operands by the safe constant-folding rule above.

   Important constraint:

   - Rules like `a 0 * -> 0` or `a 0 & -> 0` cannot be expressed as the current 2-instruction identity form unless the left operand is also matched, otherwise the original `a` would be left on the stack.

3. Done — add commutativity-based cleanup rules similar to existing `swap ADD` and `swap MUL`.

   Completed on 2026-04-11 in [`typescript/core/src/optimizer.ts`](typescript/core/src/optimizer.ts), with focused coverage in [`deno/src/optimizer_test.ts`](deno/src/optimizer_test.ts), optimizer reference updates in [`_docs/reference/optimized-compiler.md`](_docs/reference/optimized-compiler.md), and Codetta score recalculation.

   Implemented additions:

   - `swap AND` -> `AND`
   - `swap OR` -> `OR`
   - `swap EQ` -> `EQ`

   These improve canonicalization and can expose later constant folds or inlining opportunities.

4. Add short control-flow chain reductions now that comparison folds exist.

   Useful follow-ons:

   - `a b LT [Q] IF` -> remove branch or direct-call quote when `LT` folds to `0/1`
   - `a b EQ [Q] IF` -> same
   - `a b GT [Q] IF` -> same
   - `a NOT [Q] IF` -> same when `a` is constant and `NOT` folds first

   Implementation detail:

   - These do not need dedicated 4-instruction rules if the peephole loop keeps iterating; adding the constant folds may already make the existing `0 &b IF` and `!0 &b IF` rules trigger on the next pass.

5. Consider small structural additions after the arithmetic/logical rules are in place.

   Lower-priority candidates:

   - replace empty named or anonymous defs with a direct `NOP`/empty quotation strategy, matching the existing TODO in [`typescript/core/src/optimizer.ts`](typescript/core/src/optimizer.ts)
   - fold quotation literals that immediately become direct calls beyond the current `push-any CALL` rule when metadata can be preserved safely
   - collapse repeated identity chains such as multiple trailing no-op shifts after earlier folds

6. Validate each addition against runtime semantics, not just mathematical intuition.

   For every new rule, confirm behavior against [`typescript/core/src/engine.ts`](typescript/core/src/engine.ts), especially for:

   - divide/mod by zero behavior
   - negative exponent behavior for `POW`
   - truthiness conventions for `<`, `=`, `>`, and `IF` (`0` false, nonzero true)
   - `bigint` shift semantics for unusual counts

## Decisions already made

- The safe constant-folding tranche for pure deterministic ops has been implemented.
- The algebraic identity tranche for `0 |`, zero shifts, and `1 ^` has been implemented.
- The commutativity cleanup tranche for `swap &`, `swap |`, and `swap =` has been implemented.
- Guarded rules are preferable to broader but partial rewrites; optimizer rules should never introduce runtime behavior that differs from the engine.
- Commutativity cleanup should be limited to ops that are truly symmetric in the engine (`ADD`, `MUL`, `AND`, `OR`, `EQ`).
- Comparison folding is worthwhile because it composes with the existing `IF` rewrites without needing a more advanced optimizer.
- Stack-shape-sensitive simplifications such as `a 0 * -> 0` need wider patterns than the current 2-instruction identities.

## Open questions

- None - ready to implement.

## Out of scope

- Reworking the optimizer into a dataflow or stack-abstract-interpretation pass.
- Adding non-local optimizations that need full-program analysis beyond the current `defs`/inlining logic.
- Changing runtime semantics in [`typescript/core/src/engine.ts`](typescript/core/src/engine.ts) to make new peephole rules possible.

## Dependencies

- None

## References

- [`typescript/core/src/optimizer.ts`](typescript/core/src/optimizer.ts)
- [`typescript/core/src/opcodes.ts`](typescript/core/src/opcodes.ts)
- [`typescript/core/src/engine.ts`](typescript/core/src/engine.ts)
- [`_docs/reference/core-primitives.md`](_docs/reference/core-primitives.md)
