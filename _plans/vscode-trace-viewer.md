---
status: ready
status_date: 2026-04-17
creator: GPT-5.4
---

# Plan: VSCode Trace Viewer for F-flat-minor

## Summary

Build a VS Code trace viewer for the TypeScript F-flat-minor runtime that runs existing `.ff` / `.ffp` programs, captures a recorded execution trace, and lets the user move forward and backward through the trace while viewing IR, stack state, and queue state.

## Context

The repo already has the key ingredients for a recorded-trace explorer:

1. `typescript/core/src/engine.ts` already emits structured per-step trace events.
2. `node/bin/ff-run.ts` already exposes `--trace --trace-format jsonl`.
3. `web/src/client/program-runner.ts` already compiles to IR, can optionally optimize it, and runs the shared engine.
4. `vscode-f-flat-minor/` already exists as the natural VS Code package for commands and UI, even though it does not yet contain debugger contributions.

This is the fastest path to a useful debugging experience because it avoids the hardest parts of a full debugger:

- no live VM control
- no Debug Adapter Protocol on day one
- no call-frame modeling for step-over / step-out
- no runtime reverse execution or checkpointing

The core idea is to treat the first version as an execution explorer, not a full live debugger. Users navigate a completed trace rather than pausing and resuming a running VM.

## Approach

### Phase 0: Define the v1 trace-viewer product boundary

Keep the prototype intentionally narrow.

V1 user workflow:

1. Open a saved `.ff` or `.ffp` file in VS Code.
2. Run a command such as `F-flat-minor: Open Trace Viewer`.
3. The extension runs the TypeScript runtime against the current file.
4. The extension captures:
   - preprocessed source
   - formatted IR
   - optionally optimized IR
   - JSONL trace events
5. A VS Code webview opens and allows trace navigation.

V1 viewer panes:

- code pane: IR first
- step list or scrubber
- stack pane
- queue pane
- run metadata (file, optimized/unoptimized, step count, exit code)

### Phase 1: Add a trace-capture backend in the extension

Implement the backend in `vscode-f-flat-minor/` first, reusing the existing runtime instead of inventing a new execution stack.

Recommended implementation order:

1. Add a command in `vscode-f-flat-minor/package.json`.
2. In `vscode-f-flat-minor/src/extension.ts`, run the Node TypeScript runtime for the active file.
3. Invoke the runtime with machine-readable trace flags:
   - `--trace`
   - `--trace-format jsonl`
   - optional `-O` for optimized runs
4. Capture:
   - trace JSONL
   - normal program output
   - process exit code
5. Parse the JSONL trace into a typed session model local to the extension.

The extension may initially shell out to the existing runtime rather than introducing a new core debug API. That is acceptable for this plan because the goal is fast product feedback.

### Phase 2: Normalize trace data into a viewer session model

Convert CLI trace output into a UI-friendly structure.

Suggested model:

- `TraceRun`
  - source file path
  - preprocessed text when available
  - IR text
  - optimized flag
  - exit code
  - stdout/stderr summaries
  - `TraceStep[]`
- `TraceStep`
  - step
  - action
  - tag
  - value
  - immediate
  - stack before
  - stack after
  - queue preview
  - queue depth

If the trace omits `stack_after`, derive it from the next event's `stack_before` where possible. Preserve the raw event as well so the UI can explain when a value is inferred rather than directly recorded.

### Phase 3: Build the VS Code webview UI

Implement the first UI as a webview, not a debug adapter.

Required controls:

- previous step
- next step
- jump to first step
- jump to last step
- step index input or slider

Required displays:

- highlighted current IR line or instruction
- stack at the selected step
- queue preview and queue depth at the selected step
- current action metadata
- program output / exit status summary

UI guidance:

- prefer IR over raw source in the first version because IR is already readily available
- keep the UI read-only
- keep rendering simple; correctness and responsiveness matter more than polish in v1

### Phase 4: Improve trace/code correlation enough for a good prototype

The first version does not need full source-level debugging, but it does need understandable code correlation.

Minimum viable correlation:

- show the formatted IR that was actually executed
- highlight the current trace step by best-effort mapping to an IR instruction index

If the current trace data is not sufficient to map cleanly to an IR line, add only the smallest runtime extensions needed, such as:

- stable instruction ids on trace events
- explicit load/execute phase markers
- optional user-word enter/exit markers for readability

Do not block v1 on the broader source-map plan unless source view becomes a hard requirement.

### Phase 5: Add carefully scoped enhancements after the first usable viewer

Once the basic viewer works, consider these follow-ups in order:

1. toggle between unoptimized and optimized IR
2. optional raw/preprocessed source pane
3. fuller queue inspection beyond preview-only data
4. dictionary pane backed by compile-time definitions or explicit runtime dictionary events
5. small search/filter features for long traces

These are enhancements, not blockers for the first prototype.

## Decisions already made

- **Primary goal:** fastest useful VS Code prototype.
- **Execution/runtime target:** TypeScript implementation only.
- **Architecture for this plan:** recorded trace viewer, not a live debugger.
- **Initial UI surface:** VS Code command plus webview inside `vscode-f-flat-minor/`.
- **Initial code pane:** IR first; raw source is optional later.
- **Backward stepping:** playback over recorded trace, not VM reverse execution.
- **DAP is out of scope for this plan.**

## Open questions

- Should optimized IR be a run option in v1 or a later enhancement?
- Is queue preview plus depth sufficient for the first user test, or should the runtime be extended for fuller queue inspection immediately?
- Should the first viewer show preprocessed source at all, or only IR?

## Out of scope

- Debug Adapter Protocol integration
- breakpoints
- pause / continue of a live VM
- step over / step out semantics
- deterministic time travel / reverse execution
- non-TypeScript runtimes
- changing the `.ffb` bytecode format

## Dependencies

- `_plans/done/trace-output-human-llm-format.md` — existing trace JSONL format and flags
- `node/bin/ff-run.ts` and the shared TypeScript engine trace support
- Optional later dependency: `_plans/typescript-debug-source-maps.md` if source-level correlation becomes necessary

## References

- `typescript/core/src/engine.ts`
- `typescript/core/src/ir.ts`
- `node/bin/ff-run.ts`
- `node/README.md`
- `web/src/client/program-runner.ts`
- `vscode-f-flat-minor/package.json`
- `vscode-f-flat-minor/src/extension.ts`
- `_plans/done/trace-output-human-llm-format.md`
