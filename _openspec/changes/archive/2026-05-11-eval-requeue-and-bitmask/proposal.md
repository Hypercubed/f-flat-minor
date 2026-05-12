## Why

Profiling euler14 reveals two sources of per-instruction overhead in the engine hot path. First, the `eval` system opcode (48.8M calls) uses `callOp` to re-enter the dispatch chain, bypassing the inlined optimizations in `runChunk` and adding unnecessary function frames. Second, the `FastQueue` uses modulo (`%`) for every head/tail update (~680M operations), when its power-of-2 capacity allows bitwise AND instead.

## What Changes

- Refactor the `eval` (CALL) opcode to re-enqueue its operand as `(Q_CALL, x)` instead of calling `callOp(x)` directly, allowing the `runChunk` main loop to handle dispatch through its optimized inline path.
- Replace all `% this.buffer.length` operations in `FastQueue` with `& this._mask` using a precomputed bitmask, and ensure capacity always remains a power of 2.

## Capabilities

### New Capabilities
<!-- None — these are performance optimizations of existing behavior -->

### Modified Capabilities
- `engine-execution`: The `eval` opcode dispatch path changes from nested `callOp` to queue re-insertion.
- `fast-queue`: Queue index arithmetic changes from modulo to bitwise AND.

## Impact

- **Affected Code**: `typescript/core/src/engine.ts` (eval opcode), `typescript/core/src/fast-queue.ts` (all index arithmetic)
- **Performance**: Estimated 10-15% speedup from eval change, 5-10% from bitmask. Combined ~15-20%.
- **Semantics**: No functional change. `eval` still pops TOS and calls it; the only difference is dispatch happens on the next loop iteration instead of nested.
