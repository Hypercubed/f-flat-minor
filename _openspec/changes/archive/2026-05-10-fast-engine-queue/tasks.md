## 1. Implement FastQueue Class

- [x] 1.1 Create the `FastQueue` class in `typescript/core/src/engine.ts`.
- [x] 1.2 Implement internal Ring Buffer state (`head`, `tail`, `capacity`, `buffer` array).
- [x] 1.3 Implement $O(1)$ operations: `shift()`, `unshift(...items)`, `push(...items)`, `pop()`, and `get length()`.
- [x] 1.4 Implement dynamic buffer expansion (doubling capacity and realigning elements) when the queue is full.
- [x] 1.5 Implement `get(index: number)` to allow logical index-based reads from `head` to `tail` without exposing internal state.

## 2. Refactor Engine

- [x] 2.1 Replace `private readonly queue: bigint[] = [];` with `private readonly queue = new FastQueue();`.
- [x] 2.2 Update internal queue manipulations in `engine.ts` (like `queuePush`, `queueUnshift`, `queuePop`, `queueShift`, `loadBigIntCode`, `loadIR`) to invoke the new `FastQueue` API.
- [x] 2.3 Update `getQueuePreview()` to use `queue.get(i)` instead of raw array indexing (`this.queue[i]`).
- [x] 2.4 Verify no raw array methods (like `.slice()`, `.map()`, `.forEach()`) are being used directly on `this.queue`.

## 3. Testing and Validation

- [x] 3.1 Run the full test suite (`mise exec -- chomp test:deno`) to ensure exact semantic parity and no regressions.
- [x] 3.2 Run a trace and manually verify that `queue_preview` correctly reflects the queue state.
- [x] 3.3 Execute a complex script (like a Project Euler script) to verify the performance improvement and confirm the absence of $O(N^2)$ execution scaling.
