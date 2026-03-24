---
status: ready
status_date: 2026-03-23
creator: codex
---

# Plan: Web Playground Optimize Timing Diagnosis

## Summary
Add targeted diagnostics for the web playground so the repo can determine whether optimized runs are being timed incorrectly in the browser or whether optimized IR is genuinely slower for some workloads such as `ff/euler/euler7.ffp`.

## Context
The web playground reports separate compile and execute timings, and the current implementation measures `executeMs` only around `engine.run()`. In local investigation, that measurement path did not show an obvious web-only bookkeeping bug.

The more important finding is that the slowdown is not currently isolated to the web app: for `ff/euler/euler7.ffp`, a local Node CLI run also showed `--opt` executing slower in one run even though the optimizer substantially reduced IR size. Other workloads, such as `ff/lib/math/__tests__/primes.ffp`, did speed up with optimization. That points to a workload-dependent optimizer/runtime interaction rather than a blanket timer bug.

This plan captures the diagnostic work needed to make that difference visible in the playground and to create a reproducible comparison baseline between browser and CLI behavior.

## Approach
- Extend the playground runner in `web/src/program-runner.ts` to collect structured phase timings instead of only aggregate compile/execute totals.
- Record at least these phase timings:
  - `preprocessMs`
  - `compileIrMs`
  - `validateMs`
  - `optimizeMs`
  - `formatIrMs`
  - `encodeMs`
  - `loadIrMs`
  - `executeMs`
- Expand the playground result model to expose a nested metrics object on `PreparedProgram`, `ExecuteResult`, and `RunResult` rather than adding many new top-level scalar fields.
- Include engine/runtime diagnostic data in the results:
  - system instruction count
  - user instruction count
  - max stack depth
  - max queue depth
  - IR size after compile
  - IR size after optimization when optimization is enabled
  - optimizer stats when optimization is enabled
- Keep the existing summary bar in the Playground UI, but add a compact debug/details section that shows the phase timing breakdown and runtime stats for the last run.
- Make the UI wording explicit that optimization cost is compile-time work and should not be conflated with execute-time unless the diagnostics show a real runtime regression.
- Add a repo-local CLI benchmark or diagnostic entrypoint that runs the same shared TypeScript core on `ff/euler/euler7.ffp` with and without optimization and prints the same metrics schema as the web runner.
- Use that CLI output as the baseline artifact for comparing Chrome/Chromium behavior against Node for the same program.
- If the new diagnostics show that execute time is genuinely worse in both environments, follow up separately on optimizer heuristics or runtime behavior rather than changing the web timer code first.
- If the diagnostics show that only the browser regresses, follow up separately on browser-specific runtime behavior or UI-thread interference.

## Decisions already made
- Primary repro target is `ff/euler/euler7.ffp`.
- Primary browser target is Chrome/Chromium.
- The first step is diagnosis and observability, not changing optimizer behavior yet.
- The current web timing investigation should assume the existing `executeMs` boundary is probably correct unless new instrumentation proves otherwise.
- The plan should preserve the existing user-facing summary bar and add deeper diagnostics as a secondary view rather than replacing the current UI.

## Open questions
None -- ready to implement.

## Out of scope
- Changing optimizer rules or heuristics as part of this plan.
- Rewriting the engine queue model as part of this plan.
- Broad benchmark infrastructure changes outside the specific browser-vs-CLI diagnostic need.
- General playground UI redesign unrelated to performance diagnostics.

## Dependencies
- None

## References
- `web/src/program-runner.ts`
- `web/src/app.ts`
- `node/bin/ff-run.ts`
- `typescript/core/src/optimizer.ts`
- `typescript/core/src/engine.ts`
