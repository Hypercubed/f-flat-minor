---
id: vscode-full-dap-debugger
title: "VSCode Full DAP Debugger for F-flat-minor"
last_updated: 2026-04-17
description: >
  Build a real VS Code debugger for the TypeScript F-flat-minor runtime us
  ing the Debug Adapter Protocol, after the trace-viewer prototype has val
  idated the core UX and runtime metadata needs.
tags: [debugging, plans, vscode]
status: active
kind: initiative
author_kind: ai
prompter: "GPT-5.4"
---
# Plan: VSCode Full DAP Debugger for F-flat-minor

## Summary

Build a real VS Code debugger for the TypeScript F-flat-minor runtime using the Debug Adapter Protocol, after the trace-viewer prototype has validated the core UX and runtime metadata needs.

## Context

The repo already has a VS Code language extension in `vscode-f-flat-minor/`, but it does not contribute a debugger or ship a Debug Adapter Protocol implementation yet. The TypeScript runtime can already emit structured step traces, but the trace output is not a sufficient backend for a full debugger because it is write-oriented, lacks a stable runtime instruction pointer, does not model call frames, and does not expose full runtime state transitions. `typescript/compile-service/` can help with editor-side source lookups, but it is static tooling, not the runtime execution model.

The new trace-viewer plan is the intended precursor. It should establish:

- the desired code/IR viewer UX
- whether source view, preprocessed view, or IR view should be primary
- whether queue preview and stack state are enough or whether fuller runtime state is needed
- what runtime metadata is missing for eventual debugger semantics

This plan starts after that prototype exists and the project is ready to move from recorded trace exploration to a real debugger session model.

## Approach

### Phase 0: Reconfirm scope after the trace viewer

Before implementing DAP, review the finished trace-viewer work and freeze the debugger v1 scope.

Decide:

- whether the first DAP version is forward-only or includes reverse execution
- whether the primary stepping surface is raw source, preprocessed source, or IR
- whether breakpoints target source lines, IR instructions, or both
- whether dictionary inspection is required at launch or can remain a later enhancement

Do not start DAP wiring until those decisions are explicit. The trace viewer exists to reduce uncertainty here.

### Phase 1: Introduce a reusable runtime debug-session API

Add a debugger-facing API in `typescript/core` rather than building the adapter on top of parsed CLI trace output.

Add models such as:

- `DebugProgram`
  - source text
  - preprocessed text
  - IR with stable instruction ids
  - optional source-map data
- `DebugSession`
  - current state
  - stepping operations
  - session lifecycle hooks
  - indexed lookup by step id / instruction id / source span
- `DebugState`
  - logical program counter / active instruction
  - stack
  - queue
  - dictionary state or snapshot handle
  - current frame stack

The API must support incremental debugger control:

- start
- continue
- pause
- step into
- step over
- step out

If reverse stepping is in scope for the first DAP version, include reverse navigation methods here as well. Otherwise keep the initial session model forward-only and add reverse semantics later.

### Phase 2: Make runtime execution addressable

Extend execution so the debugger can identify where it is in logical program space.

Required work:

- preserve IR instruction identity through `Engine.loadIR(...)`
- track a debugger-visible logical instruction pointer, even though execution is queue-driven
- keep source/IR metadata attached to enqueued user-word expansions
- connect runtime instruction identity to source locations when available

This is required for:

- highlighted current instruction
- breakpoint resolution
- sensible stepping semantics
- correlating runtime state with code shown in the editor

This phase likely depends on some or all of `typescript-debug-source-maps.md`.

### Phase 3: Add explicit debugger frame semantics

The runtime currently expands user words directly into the queue, so debugger call frames are not first-class today.

Add debugger-visible frame tracking so the adapter can expose:

- stack frames in the DAP call stack
- step over
- step out
- frame-aware current word metadata

Add debug-only enter/exit events for:

- user-word calls
- quoted execution where it should surface as a logical frame
- dictionary-definition boundaries when helpful for user understanding

Stepping rules:

- **Step into** enters called user words
- **Step over** runs until the matching exit of the current call site
- **Step out** runs until the current frame exits

### Phase 4: Add breakpoint support

Once runtime addressability and frame tracking exist, add breakpoints.

Recommended v1:

- source-line breakpoints if source mapping is sufficiently reliable
- otherwise IR-instruction breakpoints with a code lens or secondary UI

Breakpoint work includes:

- mapping requested editor locations to runtime instruction ids
- reporting verified vs unverified breakpoints
- deciding behavior for preprocessor-generated or optimized code
- documenting how breakpoints behave when no exact runtime mapping exists

Do not promise source breakpoints before runtime/source mapping quality is proven.

### Phase 5: Implement the VS Code debug adapter

Extend `vscode-f-flat-minor/` with real Debug Adapter Protocol support rather than creating a separate unrelated extension.

Add:

- `debuggers` contribution in `vscode-f-flat-minor/package.json`
- `DebugConfigurationProvider`
- debug adapter entrypoint (Node process or inline adapter)
- launch configuration for `.ff` / `.ffp`

The adapter should consume the shared runtime debug-session API directly.

Suggested DAP surface:

- call stack = debugger frames, not data stack items
- variables tree exposes:
  - data stack
  - queue
  - dictionary
  - current word metadata
  - selected frame metadata
- stepping commands map to runtime debug-session methods
- pause/continue operate on the live session, not on a recorded trace file

### Phase 6: Add debugger-oriented code views

Build the code presentation layer in VS Code once the adapter can drive live state.

Support:

- raw source view
- preprocessed source view if needed for imported/expanded code
- IR view
- highlighted current instruction
- optional toggle between views

This may be implemented with:

- virtual documents
- webviews
- custom editor decorations
- a mix of native editor surfaces plus one supplemental panel

The code viewer must clearly indicate what execution is actually stepping through, especially when source and runtime order differ.

### Phase 7: Add reverse execution if still desired

If the project still wants true time travel after the forward debugger ships, add deterministic reverse execution on top of the live session model.

Recommended strategy:

- record per-step reversible deltas for stack, queue, depth, and dictionary changes
- take periodic full checkpoints
- record nondeterministic effects such as `RAND`, `CLOCK`, and input reads

This phase should be kept separate from the first live DAP launch unless there is a strong reason to combine them.

## Decisions already made

- **Primary product surface:** VS Code debugger extension.
- **Execution/runtime target:** TypeScript implementation only for v1.
- **DAP should build on a shared runtime debug-session API, not on parsed stderr trace output.**
- **The trace-viewer prototype is the intended precursor and risk-reduction step.**
- **Call stack in DAP represents debugger frames, not the F-flat-minor data stack.**
- **The existing VS Code package `vscode-f-flat-minor/` is the place to add debugger support.**

## Open questions

- Should the first DAP release be forward-only, with reverse execution deferred?
- Should breakpoints be source-line based, IR based, or both in the initial release?
- Which code pane should be primary by default: source, preprocessed source, or IR?
- How should optimized execution be presented: separate mode, separate view, or not supported initially?

## Out of scope

- Debugging non-TypeScript implementations (Go, Ruby, Racket, Python)
- Replacing the existing trace CLI modes
- Cross-editor debugger support outside VS Code
- Changing the `.ffb` bytecode format
- Full language-server work beyond what already exists or is separately planned
- Re-implementing compile-time editor tooling that already belongs in `typescript/compile-service/`

## Dependencies

- `vscode-trace-viewer.md` — intended precursor for validating debugger UX and metadata needs
- `typescript-debug-source-maps.md` — required in full or in part for source-aware stepping and breakpoints
- `typescript/core/src/engine.ts` runtime debug-session and instrumentation work
- `vscode-f-flat-minor/` debug adapter wiring
- Optional but useful: `typescript/compile-service/` for editor-side source lookup helpers

## References

- `typescript/core/src/engine.ts`
- `typescript/core/src/ir.ts`
- `typescript/core/src/source-maps.ts`
- `typescript/compile-service/src/compile-service.ts`
- `typescript/compile-service/src/source-map.ts`
- `vscode-f-flat-minor/package.json`
- `vscode-f-flat-minor/src/extension.ts`
- `vscode-trace-viewer.md`
- `typescript-debug-source-maps.md`
- `language-server.md`
