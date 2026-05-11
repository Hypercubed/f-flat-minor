## Context

The `runChunk` method in `engine.ts` is the VM's innermost execution loop. It currently contains interleaved instrumentation for three optional features: **tracing** (`traceOn`), **statistics** (`statsOn`), and **profiling** (`profileOn`). In the common production case, none of these are enabled, yet every iteration evaluates 5–7 conditional branches and keeps costly code paths (e.g., `this.stack.slice()`) warm in the JIT.

The existing `engine-execution` spec requires inline opcode routing within `runChunk`. This change preserves that requirement while splitting the loop body into two variants selected *before* the loop begins.

## Goals / Non-Goals

**Goals:**
- Eliminate all instrumentation overhead from the common (no-trace, no-stats, no-profile) execution path.
- Preserve identical observable behavior — stack state, queue state, trace output, stats output, and profile output remain unchanged.
- Minimize code divergence between the two paths to reduce maintenance risk.
- Mode selection occurs once per `runChunk` invocation, not once per step.

**Non-Goals:**
- Runtime toggling of trace/stats mid-chunk (the mode is checked once at chunk entry, not per-step). Mid-run toggling still works at `runAsync` chunk boundaries.
- Reducing the instrumented path's overhead — that path keeps its current behavior.
- Refactoring `callSystem`/`callUser` helper methods (those are already bypassed by inline dispatch in `runChunk`).

## Decisions

### Decision 1: Two Concrete Methods, Not Callbacks

**Choice**: Create `runChunkFast` and `runChunkInstrumented` as separate private methods.

**Alternatives considered**:
- *Callback/hooks pattern* (`runChunkWith(hooks)`): Rejected because callback invocation inside the hot loop adds per-iteration overhead that defeats the purpose.
- *Code generation* (`new Function`): Rejected due to CSP issues, debugging difficulty, and disproportionate complexity.
- *Single method with early flag checks*: The current approach — rejected because branches inside the loop are what we're eliminating.

**Rationale**: Full method duplication gives the JIT compiler two separate, independently optimizable code paths. The fast path compiles to a tight loop with no dead branches.

### Decision 2: Shared Error Helpers for Cold Paths

**Choice**: Extract `throwUndefinedSysOp(code)` and `throwUndefinedUserOp(code)` as shared private methods.

**Rationale**: Error-throwing is a cold path. Sharing it avoids duplicating string formatting and `getName` lookups across both methods. The JIT won't inline these anyway since they always throw, so there's no penalty.

### Decision 3: Step Counter Optimization in Fast Path

**Choice**: `runChunkFast` does not maintain a per-iteration `step` variable. It returns `initialStep + stepsRun`.

**Rationale**: The `step` variable exists for trace event numbering. The fast path never traces, so it only needs `stepsRun` to report back to `runAsync`. Computing the return value from `initialStep + stepsRun` eliminates one variable from the hot loop.

### Decision 4: Mode Selection Granularity

**Choice**: Check `traceOn || statsOn || profileOn` once at the top of `runChunk`, not once per `run()`/`runAsync()` call.

**Rationale**: Checking per-chunk allows toggling trace mode between async yield points (e.g., from a debugger), while adding only one branch per chunk (negligible). This preserves the current expectation that setting `engine.traceOn = true` mid-execution takes effect.

### Decision 5: `ioWriteStdout` Left Unchanged

**Choice**: The `ioWriteStdout` method's `traceOn && traceFormat === "jsonl"` check stays as-is.

**Rationale**: `ioWriteStdout` is called from system word handlers (PUTC, PUTN, PRN), not from the hot loop directly. I/O cost dominates the branch cost. No benefit to splitting it.

## Risks / Trade-offs

- **Code divergence** → Mitigated by: (a) the two methods share the same structural shape — the diff between them is purely additive lines in the instrumented path; (b) shared error helpers reduce surface area; (c) existing test suite covers both paths (tests run with trace/stats off by default, plus dedicated trace tests).
- **Subtle behavioral drift** → Mitigated by: the instrumented path is a strict superset of the fast path (same dispatch logic + instrumentation). Any dispatch change must be made in both methods, which the test suite will catch.
- **JIT not optimizing as expected** → Low risk. Removing branches and dead code from a loop is well within what V8/JSC/SpiderMonkey optimize. The improvement may be larger or smaller than estimated 5–15% depending on the benchmark, but it cannot regress.
