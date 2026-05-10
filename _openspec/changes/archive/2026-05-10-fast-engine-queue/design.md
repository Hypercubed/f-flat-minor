## Context

The f-flat-minor VM's core state is composed of two primary data structures: `this.stack` (the data stack) and `this.queue` (which operates as both the execution stream and the auxiliary return stack). 

Currently, `this.queue` is implemented as a standard native JavaScript array of `bigint`s. The execution engine pushes the instructions for a called user word onto the front of this array using `this.queue.unshift(...items)`, and consumes instructions from the front using `this.queue.shift()`.

Because JavaScript arrays are optimized as contiguous memory vectors, `unshift` and `shift` operations require moving every subsequent element in memory, leading to an $O(N)$ execution penalty for every single VM instruction. This turns the entire engine execution loop into an $O(N^2)$ algorithm, causing severe performance degradation for deeply nested loops or long-running programs.

## Goals / Non-Goals

**Goals:**
- Eliminate the $O(N^2)$ execution bottleneck by implementing an $O(1)$ circular buffer (Deque).
- Fully encapsulate the new data structure into a `FastQueue` class that serves as a seamless replacement for the current `this.queue` array.
- Retain exact semantic compatibility with the existing engine (i.e., the queue serves as both an execution stream and an auxiliary stack).

**Non-Goals:**
- Refactoring `this.stack`. The data stack primarily uses $O(1)$ `push`, `pop`, and index-based assignment operations, which native JS arrays handle exceptionally well.
- Changing the VM's architectural semantics (e.g. splitting the queue into a distinct call stack and auxiliary stack). The "one unified Deque" model will remain unchanged to guarantee behavioral parity.

## Decisions

- **FastQueue Implementation**: We will implement `FastQueue` as a Circular Buffer (Ring Buffer) backed by a native array. The capacity will default to a reasonably large power-of-two (e.g., 8192) and dynamically resize (by doubling and copying) when capacity is reached.
- **API Surface**: The `FastQueue` will export the subset of the standard Array API utilized by `engine.ts`:
  - `push(...items: bigint[]): void`
  - `pop(): bigint | undefined`
  - `shift(): bigint | undefined`
  - `unshift(...items: bigint[]): void`
  - `get length(): number`
- **Trace Compatibility**: To support `engine.ts`'s queue preview feature in the JSONL trace (`getQueuePreview`), `FastQueue` will expose a `get(index: number): bigint | undefined` method to allow iteration from `head` to `tail` without exposing internal buffer state.

## Risks / Trade-offs

- **Implementation Complexity**: Managing `head` and `tail` pointers across array boundaries with modulo arithmetic (or bitwise masking) is slightly more complex than calling native `Array.unshift`, but the logic is fully encapsulated and easily testable.
- **Refactoring Trace Modularity**: The `getQueuePreview` function will need to be modified slightly to iterate using `queue.get(i)` rather than raw array indexing. This is a very minor tradeoff for $O(1)$ performance.
