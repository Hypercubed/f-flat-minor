## 1. Implement FastQueue Unshift Array

- [x] 1.1 Add `unshiftArray(items: bigint[])` method to `FastQueue` in `fast-queue.ts`. It should ensure the buffer is expanded enough to hold the new items, adjust the `head` pointer by the length of `items`, and copy the items into the circular buffer.
- [x] 1.2 Update the `engine.ts` execution loop to use `this.queue.unshiftArray(r)` instead of `this.queue.unshift(...r)` when queuing a user-defined function's execution array.
- [x] 1.3 Validate that `fast-queue.ts` tests still pass or add a unit test for `unshiftArray`.

## 2. Inline Opcode Routing in Engine

- [x] 2.1 Refactor `runChunk` in `engine.ts` to replace the `this.callOp(value)` with an inline check.
- [x] 2.2 Define `const MAX_SYS_OP = BigInt(MAX_SYSTEM_OP_CODE);` inside or accessible to `runChunk`.
- [x] 2.3 Inside the `if (isCall && immediate)` block, check if `value > -1n && value <= MAX_SYS_OP`. If true, call `this.sysDefs[Number(value)]!()` inline (after checking if it exists).
- [x] 2.4 If it's not a system opcode, look up the user definition with `this.defs.get(value)`. If it's an array, queue it with `unshiftArray`.
- [x] 2.5 Run the f-flat-minor test suite to verify the VM behaves correctly.
