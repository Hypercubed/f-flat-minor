---
status: done
status_date: 2026-04-01
creator: codex
---

# Plan: Web Playground Async Runner and Worker Cancellation

## Summary
Prevent browser freezes from non-halting programs by adding cooperative async execution in the shared engine, then moving playground execution to a Web Worker with explicit cancellation and hard-stop termination.

## Context
The current web playground execution path compiles and runs programs on the main thread. `Engine.run()` is synchronous and processes the queue in a tight loop, so non-halting programs block the UI thread.

This plan stages the work so we can land low-risk cooperative yielding first, then migrate to worker isolation for reliable stop/kill behavior from the main thread.

## Approach
### Phase 1 — Cooperative async execution in core + web hookup
- Add a chunked async execution API in `typescript/core/src/engine.ts` that runs up to `N` VM cycles, then awaits a scheduler callback.
- Keep existing synchronous `run()` unchanged for backwards compatibility and non-browser runtimes.
- Extend `web/src/program-runner.ts` with `executeAsync(...)` while preserving existing synchronous `execute()`.
- Update web UI execution paths (`web/src/app.ts`, `web/src/tutorial.ts`) to use `await executeAsync(...)`.
- Add targeted tests covering async execution parity and scheduler chunking behavior.

### Phase 2 — Worker-backed runner
- Create a dedicated worker entrypoint for preprocess + compile + execute.
- Define request/response protocol (`RUN`, `RESULT`, `ERROR`, optional `PROGRESS`, `CANCEL`).
- Route playground execution through worker by default while retaining a fallback mode.

### Phase 3 — Cancellation semantics
- Implement soft cancellation via protocol message checks between chunks.
- Implement hard cancellation by terminating and recreating the worker.
- Ensure stale run results are ignored using run IDs.

### Phase 4 — Surface controls and observability
- Add Run/Cancel control state in the playground UI.
- Report terminal run state (`done`, `cancelled`, `error`) consistently in summary output.
- Add lightweight timing/cycle diagnostics to aid chunk-size tuning.

## Decisions already made
- We will keep `Engine.run()` as the synchronous compatibility API.
- Cooperative yielding lands before worker migration.
- Worker mode must include preprocess/compile and execute, not only execute.
- Main-thread hard stop will rely on worker termination.
- Existing playground summary UI remains; behavior changes should fit current structure.

## Open questions
- What default chunk size (`yieldEvery`) gives good UI responsiveness without excessive overhead across tutorial/playground workloads?
- Should REPL execution move to the async API in the same worker migration or as a follow-up phase?

## Out of scope
- Optimizer algorithm changes.
- General playground UI redesign unrelated to execution control.
- Cross-runtime process-level cancellation for CLI tools.

## Dependencies
- None

## References
- `typescript/core/src/engine.ts`
- `typescript/core/src/preprocess.ts`
- `web/src/program-runner.ts`
- `web/src/app.ts`
- `web/src/tutorial.ts`
