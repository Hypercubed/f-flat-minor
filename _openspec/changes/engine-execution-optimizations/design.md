## Context

The Ffm typescript runtime engine (`engine.ts`) execution loop has significant performance bottlenecks in its tightest loop. Specifically, `FastQueue` currently relies on the spread operator (`...r`) to push definition arrays onto the queue, which causes implicit array allocations during function expansion. Additionally, the instruction routing in `runChunk` goes through several layers of abstraction (`callOp` -> `callSystem`), which also casts `bigint` opcodes to `Number` on every call, contributing to substantial function call overhead.

## Goals / Non-Goals

**Goals:**
- Eliminate implicit array allocations when adding definitions to the `FastQueue`.
- Reduce call stack overhead by inlining the opcode routing and dispatch directly within `runChunk`.
- Improve total execution time by optimizing the tightest loops of the VM.

**Non-Goals:**
- Changing the compiler output or compilation optimizations.
- Changing the fundamental type of values in the queue from `bigint`.
- Implementing further optimizations to user-defined functions or caching mechanism in the engine.

## Decisions

1. **Add `unshiftArray(items: bigint[])` to `FastQueue`**: We will modify `fast-queue.ts` to include a method that natively handles pushing an entire array to the queue. This prevents the VM from using `this.queue.unshift(...r)` and avoids the V8 engine creating a temporary arguments array from the spread operation.

2. **Inline Opcode Dispatch**: We will remove `this.callOp(value)` calls inside `runChunk` and directly handle dispatch. We will use `MAX_SYSTEM_OP_CODE` as a `bigint` constant. If `value <= 255n`, we will look it up directly in `this.sysDefs[Number(value)]` and call it. Otherwise, we will retrieve the definition from `this.defs` and push it to the queue using the new `unshiftArray` method. 

## Risks / Trade-offs

**Risks:**
- Inlining functions increases the complexity of `runChunk`, making it slightly harder to read and trace. 

**Trade-offs:**
- Bypassing the abstract `callOp` method trades encapsulation for raw execution speed.
