## Why

The `runChunk` hot loop currently evaluates 5–7 conditional branches per iteration for tracing, stats, and profiling — even when none are enabled. These branches occupy instruction cache, prevent the JIT from seeing a tight inner loop, and include a `this.stack.slice()` ternary that keeps a costly code path warm. Splitting into a dedicated fast path eliminates all instrumentation overhead from the common case.

## What Changes

- Split `runChunk` into two methods: `runChunkFast` (zero instrumentation) and `runChunkInstrumented` (full trace/stats/profile support).
- `runChunk` becomes a thin dispatcher that checks `traceOn || statsOn || profileOn` once and delegates.
- Extract cold-path error helpers (`throwUndefinedSysOp`, `throwUndefinedUserOp`) to share between both paths.
- `runChunkFast` omits: `stackBefore` copy, `statsOn` branches, `profileOn` timing, `traceOn` event emission, and per-iteration `Math.max` calls.
- `runChunkFast` derives the step count from `initialStep + stepsRun` rather than maintaining a `step` variable.

## Capabilities

### New Capabilities

- `runchunk-dual-path`: Engine provides two execution paths — a fast path with zero instrumentation overhead and an instrumented path with full trace/stats/profile support — selected once per `runChunk` invocation.

### Modified Capabilities

- `engine-execution`: The `runChunk` Inline Opcode Routing requirement now applies to *both* paths. The dispatch shape (system vs user lookup, depth gating, immediate detection) is preserved identically in both methods.

## Impact

- **Code**: `typescript/core/src/engine.ts` — `runChunk` refactored into three methods (~40 lines shared shape duplicated, ~10 lines of shared error helpers extracted).
- **Behavioral**: Zero observable change — the fast path produces identical stack/queue state. Tracing, stats, and profile output are unchanged when enabled.
- **Performance**: Estimated 5–15% improvement on tight compute loops (e.g., Euler 14) by eliminating dead branches and instruction cache pressure from instrumentation code.
- **Risk**: Low — the two paths share the same dispatch logic shape; divergence is the main maintenance risk, mitigated by the existing test suite.
