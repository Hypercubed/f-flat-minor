## Why

In `engine.ts`, `this.defs` is a `Map<bigint, (() => void) | bigint[]>` that maps all operations to their implementation or definition. Map lookups are relatively slow in tight loops because they involve hashing the BigInt key and bucket traversal.

System opcodes in F♭m are tightly packed small integers (from 0 to `MAX_SYSTEM_OP_CODE` = 255). Since they are executed far more frequently than user-defined words, retrieving their function pointers is a hot path. By storing system operations in a simple, pre-allocated flat array, system opcode resolution becomes a lightning-fast O(1) array index access, falling back to the Map only for custom user words. This optimization removes quadratic-like overhead in the engine's most frequently executed instruction paths.

## What Changes

- Create a new array `sysDefs` in `Engine` of size `MAX_SYSTEM_OP_CODE + 1`.
- `defineSystem` will populate `this.sysDefs[code]` instead of `this.defs.set(code)`.
- `callSystem` will execute the function from `this.sysDefs[Number(code)]` instead of `this.defs.get(code)`.
- Update `inspectValue` to check `sysDefs` when inspecting a system opcode.

## Capabilities

### New Capabilities
- `system-ops`: Performance optimization for system operations.

### Modified Capabilities

## Impact

- `typescript/core/src/engine.ts`: Core engine execution loop is modified for optimized system operation dispatch.
- Improved performance for all F♭m code execution in the TypeScript/JS runtimes (Node, Deno, Bun, Browser).
