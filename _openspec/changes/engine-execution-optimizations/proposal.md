## Why

The Ffm typescript runtime engine execution loop has significant performance bottlenecks in its tightest loop, primarily due to unnecessary garbage collection pressure and multiple layers of function call indirection during instruction routing. By optimizing the engine's operation lookup and `FastQueue`'s interaction with definition arrays, we can drastically reduce the number of objects allocated during execution and decrease the overall function call stack depth, leading to a much faster VM.

## What Changes

- `FastQueue` will be augmented with an `unshiftArray(items: bigint[])` method to allow pushing an array of tokens into the queue directly without expanding them via spread syntax.
- The `engine.ts` core execution loop (`runChunk`) will be refactored to inline the opcode lookup logic. Instead of calling `callOp` which then calls `callSystem` or `callUser`, `runChunk` will perform a fast numeric bounds check for system opcodes and execute them directly from the `sysDefs` pre-allocated array map, significantly reducing function call overhead.

## Capabilities

### New Capabilities

- `engine-execution`: Performance-optimized instruction routing and queue operations in the core VM loop.

### Modified Capabilities

None.

## Impact

- `typescript/core/src/engine.ts`: Core execution loop (`runChunk`) routing logic.
- `typescript/core/src/fast-queue.ts`: Queue behavior (addition of `unshiftArray`).
