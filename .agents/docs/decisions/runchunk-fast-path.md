---
id: runchunk-fast-path
title: Maintain separate fast and instrumented runChunk paths
status: accepted
date: 2026-05-11
---

## Context

The F♭m execution engine hot loop (`runChunk`) was heavily burdened with diagnostic boolean checks (`this.traceOn`, `this.statsOn`, `this.profileOn`) and the associated data preparation (e.g., copying the stack for tracing). This prevented the JIT compiler from optimally compiling the hot path and incurred per-instruction overhead.

## Decision

We maintain separate `runChunkFast` and `runChunkInstrumented` class methods. The main `runChunk` method dispatches once per chunk invocation based on the current instrumentation state. `runChunkFast` removes all diagnostic branch statements and related code. 

## Consequences

- **Performance**: Provides a consistent performance boost (measured at ~10% for Euler 14 in Bun).
- **Maintenance**: Error handling is centralized in shared helpers (`throwUndefinedSysOp`, `throwUndefinedUserOp`) to keep both paths DRY, but any changes to opcode dispatch logic must be duplicated across both loops.
