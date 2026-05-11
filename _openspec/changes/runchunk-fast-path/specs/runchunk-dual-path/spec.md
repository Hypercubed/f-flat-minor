## ADDED Requirements

### Requirement: Dual Execution Path Selection
The engine SHALL provide two private execution methods — `runChunkFast` and `runChunkInstrumented` — and the `runChunk` dispatcher SHALL select between them once per invocation based on the current instrumentation state.

#### Scenario: No instrumentation enabled
- **WHEN** `runChunk` is called and `traceOn`, `statsOn`, and `profileOn` are all `false`
- **THEN** the engine MUST delegate to `runChunkFast`, which contains zero instrumentation branches, no `stack.slice()` calls, no `Math.max` tracking, no trace event emission, and no profile timing.

#### Scenario: Any instrumentation enabled
- **WHEN** `runChunk` is called and any of `traceOn`, `statsOn`, or `profileOn` is `true`
- **THEN** the engine MUST delegate to `runChunkInstrumented`, which preserves the full current behavior including stack snapshots, stats counters, profile timing, and trace event emission.

#### Scenario: Mode changes between async chunks
- **WHEN** `traceOn` is toggled between `runAsync` yield points
- **THEN** the next `runChunk` invocation SHALL select the appropriate path based on the new state, allowing instrumentation to be enabled or disabled mid-execution at chunk boundaries.

### Requirement: Fast Path Step Counter
The fast execution path SHALL NOT maintain a per-iteration `step` counter variable. It MUST compute its return value as `initialStep + stepsRun`.

#### Scenario: Step count return from fast path
- **WHEN** `runChunkFast` completes after executing N steps
- **THEN** it returns `initialStep + N`, producing the same value that the instrumented path would return.

### Requirement: Shared Error Helpers
Both execution paths MUST use shared private helper methods for undefined-opcode errors to avoid duplicating error message formatting.

#### Scenario: Undefined system opcode in fast path
- **WHEN** `runChunkFast` encounters a system opcode with no definition in `sysDefs`
- **THEN** it calls the shared `throwUndefinedSysOp` helper, which throws an `Error` with the message `Call: undefined system op "<name>"`.

#### Scenario: Undefined user opcode in instrumented path
- **WHEN** `runChunkInstrumented` encounters a user opcode with no definition in `userDefs`
- **THEN** it calls the same shared `throwUndefinedUserOp` helper, producing an identical error message to what the fast path would produce.

### Requirement: Behavioral Equivalence
Both execution paths MUST produce identical stack and queue state for any given input program. The fast path differs from the instrumented path only in the absence of side effects to trace output, stats counters, and profile records.

#### Scenario: Identical stack result
- **WHEN** a program is executed with all instrumentation disabled
- **THEN** the resulting stack MUST be identical to executing the same program with instrumentation enabled.

#### Scenario: No stats mutation in fast path
- **WHEN** `runChunkFast` executes
- **THEN** it MUST NOT read or write the `stats` object, the `profile` object, or call any trace methods.
