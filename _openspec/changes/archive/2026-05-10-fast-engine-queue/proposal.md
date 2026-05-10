## Why

The TypeScript F-flat-minor VM execution engine currently uses a native JavaScript array (`this.queue`) as its primary execution deque. It uses `unshift(...items)` to load user-defined word definitions and `shift()` to read the next instruction. Because JavaScript arrays are optimized as contiguous memory vectors, these operations run in $O(N)$ time. When iterating over thousands of instructions in deeply nested programs, this generates a massive number of memory shifts, resulting in $O(N^2)$ execution time complexity.

## What Changes

We will replace the native `this.queue` array with a custom `FastQueue` class backed by a flat circular buffer (ring buffer). This class will provide an API identical to the required subset of Array methods (`shift`, `unshift`, `push`, `pop`, `length`), enabling true $O(1)$ operations at both ends of the queue. `this.stack` will remain a native array, as it primarily operates at the tail where native operations are highly optimized.

## Capabilities

### New Capabilities
- `fast-queue`: Implementation of an $O(1)$ circular buffer Deque designed for the VM's execution stream and auxiliary stack.

### Modified Capabilities
- `engine-execution`: Modifies the underlying data structure of the VM's execution queue without changing the engine's external API or language semantics.

## Impact

- **Affected Code**: `typescript/core/src/engine.ts`. We will instantiate `FastQueue` instead of `[]` and ensure all queue manipulations use the new class methods.
- **Performance**: Significant performance improvement for long-running or deeply nested F-flat-minor programs, eliminating the quadratic scaling bottleneck.
- **Compatibility**: 100% semantically compatible. The queue retains its dual nature as both the execution stream (front) and auxiliary stack (back).
