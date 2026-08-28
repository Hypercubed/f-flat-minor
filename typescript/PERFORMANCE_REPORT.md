# Ffm Runtime Performance Improvement Report

This report outlines 6 specific improvements that can be made to the F-flat-minor TypeScript implementation to significantly improve runtime performance.

## Execution Engine Improvements

**1. Move `this.stack.slice()` out of the hot loop**
In `engine.ts`'s `runChunk()`, `const stackBefore = this.stack.slice()` executes unconditionally on every VM step. This creates a new array copy each time, even when tracing is disabled (`this.traceOn = false`). Moving this inside a check for `this.traceOn` will drastically reduce memory allocation and garbage collection overhead in the execution hot path.

**2. Replace `IMMEDIATE_WORDS.includes(value)` with direct checks**
In `engine.ts`'s `runChunk()`, the condition `IMMEDIATE_WORDS.includes(value)` scans an array linearly on every step. Converting this to a direct equality check (e.g., `value === DEF || value === KET || value === MARK || value === BRA`) avoids the overhead of iteration and array prototype method calls.

**3. Eliminate O(N) Array Operations on the Execution Queue**
The engine manages its execution using `this.queue.shift()` to pull the next instruction and `this.queue.unshift(...r)` to expand user functions into the queue. Array `shift` and `unshift` operations are `O(N)` in JavaScript/TypeScript. Refactoring the engine to use a stack of execution pointers (a true call stack of `[instruction_array, index]` frames) instead of modifying a single flat array will change these critical operations from `O(N)` to `O(1)`.

**4. Optimize Random BigInt Generation**
In `engine.ts`, the `generateRandomBigInt()` function converts `Math.random()` to a string, splits on `"."`, and concatenates strings to generate large random numbers. This string manipulation approach is incredibly slow and allocates many temporary objects. Rewriting this to use mathematical bitwise operations on 32-bit integer chunks (or better, using Crypto APIs if available) will vastly speed up the `RAND` opcode.

**5. Use Flat Arrays for System Opcode Lookups**
In `engine.ts`, `this.defs` is a `Map<bigint, (() => void) | bigint[]>` that maps all operations to their implementations. Map lookups are relatively slow in tight loops. Since system opcodes are tightly packed small integers (from 0 to `MAX_SYSTEM_OP_CODE`), `engine.ts` should store system operations in a simple, pre-allocated flat array. This allows system opcode resolution to be a lightning-fast `O(1)` array index access, falling back to the Map only for custom user words.

## Compiler Optimizations (Impacting Runtime)

**6. Implement Strength Reduction in the Optimizer**
The optimizer (`optimizer.ts`) currently has commented-out placeholders for "Strength reduction". Adding peephole optimization rules to replace multiplications and divisions by constant powers of 2 with their corresponding bitwise shift equivalents (e.g., replacing `2 MUL` with `1 SHIFTL`, or `4 DIV` with `2 SHIFTR`) will yield faster executed code. Bitwise operations are computationally cheaper than multiplication and division at runtime.
