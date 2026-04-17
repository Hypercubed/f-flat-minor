---
status: ready
status_date: 2026-04-17
creator: GPT-5.4
---

# Plan: VSCode Time-Travel Debugger for F-flat-minor

## Summary

Build a time-travel debugger for the TypeScript F-flat-minor runtime and ship it primarily as a VS Code debugger extension, with the debugger powered by a new shared debug-session layer in `typescript/core` rather than by ad hoc UI-specific tracing.

## Context

The repo already has three useful foundations:

1. `typescript/core/src/engine.ts` can already emit per-step trace events with stack-before/after, queue preview, action name, and step index.
2. `web/src/client/program-runner.ts` and the playground worker already compile to IR, expose IR text, and run the shared engine asynchronously in the browser.
3. `vscode-f-flat-minor/` already ships a VS Code language extension, but it has no Debug Adapter Protocol implementation yet.

That means a debugger is feasible, but not by wiring the current trace output directly into a UI:

- the current trace is write-only stderr/console output, not a reusable session object
- it does not expose a stable runtime instruction pointer
- it only shows queue preview, not full queue state
- it does not model call frames, so step-into / step-over are not yet first-class
- it does not record dictionary mutations or nondeterministic effects needed for reliable reverse execution

The best product surface is still VS Code because the user wants an editor-integrated debugger and the repo already has a VS Code extension package to extend. The easiest place to prototype interaction remains the shared TypeScript runtime, with optional lightweight harnesses in CLI or web only as development aids.

## Approach

### Phase 0: Define the debugger contract in the TypeScript runtime

Create a new debugger-facing API in `typescript/core` instead of trying to scrape existing trace output.

Add a shared model such as:

- `DebugProgram`
  - source text
  - preprocessed text
  - IR with stable instruction ids
  - optional source-map data
- `DebugSession`
  - ordered `DebugStep[]`
  - initial state
  - final state
  - indexed lookup by step id / instruction id / source span
- `DebugStep`
  - step number
  - runtime phase (`load`, `execute`, `enter-word`, `exit-word`, `define-word`, `io`, ...)
  - IR instruction id and source location when known
  - full stack state or a reversible delta
  - full queue state or a reversible delta
  - dictionary delta / definition snapshot reference
  - call-frame depth and active word

Do not make the debugger depend on stderr JSONL parsing. The existing trace formatting stays as a CLI/debugging output mode, but debugger consumers use the new structured API directly.

### Phase 1: Make execution addressable and source-aware

Extend the runtime so each queued operation can be related back to a stable logical instruction id.

Required work:

- Preserve IR instruction identity when `Engine.loadIR(...)` enqueues work.
- Track a debugger-visible logical instruction pointer, even though the runtime is queue-driven.
- Attach source/IR metadata to queued user-word expansions so stepping can highlight either raw source or IR.
- Reuse or partially implement `_plans/typescript-debug-source-maps.md` so runtime steps can map back to source spans instead of only symbol names.

This is the main architectural dependency. Without instruction identity and source mapping, the debugger can only show anonymous queue churn.

### Phase 2: Add reversible execution state

Support stepping backward by recording replayable state transitions.

Recommended strategy:

- Record per-step reversible deltas for stack, queue, depth, and dictionary changes.
- Also take periodic full checkpoints to avoid O(n) rewind cost for long sessions.
- Record nondeterministic effects (`RAND`, `CLOCK`, input reads) as explicit events so replay remains deterministic.

V1 should prefer correctness over compactness. Full snapshots for every step are acceptable for small programs during initial development, but the API should allow checkpoint + delta storage so the debugger can scale beyond toy examples.

### Phase 3: Model call frames and debugger stepping semantics

Add explicit debugger frame tracking for user-word calls and quoted execution so the debugger can implement:

- step into
- step over
- step out
- reverse step

Current execution expands user words directly into the queue, so the debugger must synthesize frame boundaries itself. Add debug-only enter/exit events around user-word expansion/execution and keep a call-frame stack that is independent from the data stack.

Stepping rules:

- **Step into**: advance to the next executable event, entering called user words.
- **Step over**: if the current event calls a user word, run until its matching exit event at the same frame depth.
- **Step out**: run until the current frame exits.
- **Reverse step**: restore the previous step state from delta/checkpoint data.

### Phase 4: Build a reusable debug harness before the VS Code UI

Before implementing the VS Code adapter, add a thin non-product harness to exercise the debug API end-to-end.

Good options:

- a new TypeScript test helper in `typescript/core` that records sessions for fixtures
- an internal CLI command such as `ff-debug` or a `--debug-session json` mode
- a very small web-only viewer hidden behind a development flag

This phase is not the final product. Its purpose is to validate:

- source/IR correlation
- reverse stepping correctness
- frame semantics
- dictionary mutation capture
- performance and session size

### Phase 5: Implement a VS Code debug adapter

Extend `vscode-f-flat-minor/` with real Debug Adapter Protocol support instead of creating a separate unrelated extension first.

Add:

- `debuggers` contribution in `vscode-f-flat-minor/package.json`
- `DebugConfigurationProvider`
- debug adapter entrypoint (Node process or inline adapter)
- launch config for `.ff` / `.ffp` files

The adapter should drive the shared debug-session engine, not shell out to text traces.

Suggested DAP surface:

- normal stepping controls map to session navigation
- stack frames represent debugger call frames, not data-stack items
- variables tree exposes:
  - data stack
  - queue
  - dictionary
  - current word / frame metadata
- a custom read-only panel or virtual document shows:
  - raw source
  - preprocessed source
  - IR
  - current highlighted instruction

Use the existing `typescript/compile-service/` only for editor-side source lookups and non-runtime conveniences. Runtime state remains owned by the debug-session layer.

### Phase 6: Polish the debugger UX in VS Code

Once the adapter works, add user-facing debugger features:

- toggle between raw source and IR view
- inline current-step annotation
- dictionary browsing with jump-to-definition
- breakpoints on source lines and, optionally later, on IR instructions
- session-size safeguards for very long-running programs
- clearer handling for preprocessor-expanded code and generated spans

## Decisions already made

- **Primary product surface:** VS Code debugger extension.
- **Execution/runtime target:** TypeScript implementation only for v1.
- **Architecture:** build a shared runtime debug-session API first; the VS Code adapter consumes it.
- **Current trace output is insufficient as the debugger backend.**
- **Reverse stepping must be deterministic, not best-effort.**
- **The web app and CLI may be used as prototype harnesses, but they are not the primary shipped debugger surface.**

## Open questions

- Should the default code pane show raw source, preprocessed source, or source with an IR toggle?
- For long runs, what checkpoint cadence keeps reverse stepping responsive without using too much memory?
- Should dictionary state be shown as full snapshots each step, or as current dictionary plus per-step mutation log in the UI?
- In optimized runs, should the debugger step through pre-optimization IR, optimized IR, or expose both modes?

## Out of scope

- Debugging non-TypeScript implementations (Go, Ruby, Racket, Python)
- Full language-server work beyond what already exists or is planned
- Replacing the existing trace CLI modes
- Cross-editor debugger support outside VS Code
- Changing the `.ffb` bytecode format

## Dependencies

- `_plans/typescript-debug-source-maps.md` — required in full or in part for source-aware runtime stepping
- `typescript/core/src/engine.ts` runtime instrumentation and session capture work
- `vscode-f-flat-minor/` debug adapter wiring
- Optional but useful: `typescript/compile-service/` for editor-side source range lookup and code navigation helpers

## References

- `typescript/core/src/engine.ts`
- `typescript/core/src/ir.ts`
- `typescript/core/src/source-maps.ts`
- `typescript/compile-service/src/compile-service.ts`
- `typescript/compile-service/src/source-map.ts`
- `web/src/client/program-runner.ts`
- `web/src/client/ff-playground-worker.ts`
- `web/src/client/playground-worker-client.ts`
- `vscode-f-flat-minor/package.json`
- `vscode-f-flat-minor/src/extension.ts`
- `_plans/typescript-debug-source-maps.md`
- `_plans/language-server.md`
