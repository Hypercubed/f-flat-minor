## Why

Currently, the Ffm engine uses a `Map<bigint, bigint[] | (() => void)>` to store user-defined and anonymous operations. Profiling reveals that V8's map lookup (`FindOrderedHashMapEntry`) consumes significant time (~6.3% of total execution) in the hot execution loop. Since user and anonymous operations are assigned sequential IDs starting from 256, we can achieve $O(1)$ lookup performance by switching to a flat array.

## What Changes

- Refactor `Engine` to use a flat array for user and anonymous operations (`defs`) instead of a `Map`.
- Modify the operation lookup logic in the `runChunk` loop to perform direct array indexing for user operations (above opcode 255).
- Update operation definition and inspection logic to work with the array-based storage.

## Capabilities

### New Capabilities
<!-- No new functional capabilities, this is a performance optimization of existing behavior -->

### Modified Capabilities
- `engine-execution`: Requirements for how operations are stored and retrieved during execution will be updated to mandate O(1) flat array lookups for user-defined words.

## Impact

- **Affected Code**: `typescript/core/src/engine.ts`
- **Performance**: Reduced CPU cycles per instruction for user-defined words; elimination of `Map` lookup overhead.
- **Memory**: Slight increase in memory usage for the pre-allocated or sparse array, offset by the removal of the `Map` structure.
