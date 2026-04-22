---
id: web-editor-word-inspector
title: "Editor Word Inspector Panel"
last_updated: 2026-03-21
description: >
  Add a word definition inspector panel to the Playground and Tutorial cod
  e editors, similar to the existing REPL inspector. Phase A enables inspe
  ction after program execution. Phase B adds live compile-on-change for i
  mmediate definition updates without execution.
tags: [plans, vscode, web]
status: active
kind: initiative
author_kind: human
prompter: "kilo-auto/balanced"
---
# Plan: Editor Word Inspector Panel

## Summary
Add a word definition inspector panel to the Playground and Tutorial code editors, similar to the existing REPL inspector. Phase A enables inspection after program execution. Phase B adds live compile-on-change for immediate definition updates without execution.

## Context
The REPL tab has a sophisticated word inspection system where users can click stack values to view word definitions with nested navigation. Users want similar functionality in the Playground and Tutorial code editors. The challenge is that word definitions only exist after code execution (the engine's `defs` map is populated during runtime).

This plan addresses:
1. How to make core words inspectable always (they're hardcoded)
2. How to make user-defined words inspectable after execution
3. How to handle code changes that invalidate the execution state
4. (Phase B) How to provide immediate definition feedback via compile-on-change

## Approach

### Phase A: Available After Run

**Goal:** Basic inspector panel that works after program execution.

**Implementation Steps:**

1. **Add Inspector Panel to UI** (`web/src/templates/app-shell.html`)
   - Add inspector panel alongside the editor in the Playground tab
   - Reuse CSS classes from REPL inspector (`.repl-inspect-panel`, `.inspect-token`, etc.)
   - Include Back/Close controls and navigation history

2. **Create Editor Inspection Module** (`web/src/editor-inspector.ts`)
   ```typescript
   export interface EditorInspector {
     show(): void;
     hide(): void;
     inspectWord(wordName: string): void;
     setEngine(engine: Engine | null): void;
     markStale(): void;
   }
   ```

3. **Extend Editor with Click Handler** (`web/src/editor.ts`)
   - Add CodeMirror `click` handler to detect word clicks
   - Expose `onWordClick` callback in `SourceEditor` interface
   - Use `view.state.wordAt(pos)` to extract clicked word

4. **Modify Program Runner** (`web/src/program-runner.ts`)
   - Return the `Engine` instance in `RunResult` so it can be used for inspection
   - Engine contains populated `defs` map after execution

5. **Integrate with App** (`web/src/app.ts`)
   - Track engine instance and source hash after successful runs
   - On code edit: compare hash, mark inspector as stale if changed
   - Wire editor click → inspector lookup flow

6. **Core Words Support** (always available)
   - Hardcode system word list from `systemWords` in opcodes.ts
   - Show definition as "system word" with brief description
   - No nested inspection for core words (they're native)

7. **User Words Support** (after execution only)
   - Use `engine.inspectValue(value)` to get definition
   - Render definition tokens with click handlers for nesting
   - Show "Run program to inspect user-defined words" placeholder before first run

8. **Stale State Handling**
   - Hash source code on every edit (FNV-1a or similar fast hash)
   - Compare to hash from last successful execution
   - Show "Code changed - run to refresh definitions" warning
   - Gray out user word inspection when stale

### Phase B: Compile-on-Change

**Goal:** Provide immediate definition inspection without requiring execution.

**Implementation Steps:**

1. **Create Compile-Only Service** (`web/src/definition-compiler.ts`)
   ```typescript
   export function extractDefinitions(source: string): Map<string, Definition> {
     // Fast compile without preprocessing or execution
     const tokens = Compiler.tokenize(source);
     const ir = compiler.compileToIR(tokens, "/main.ffp");
     
     // Extract definition regions from IR (between MARK and DEF opcodes)
     return mapIRDefsToSource(ir, source);
   }
   ```

2. **Debounce Integration** (`web/src/app.ts`)
   - Add 300ms debounced compile on editor changes
   - Skip compile if code unchanged or empty
   - Update inspector definitions on successful compile

3. **Source Range Mapping**
   - Store token positions during compile
   - Map IR definition ranges back to source text
   - Enable "click definition to jump to source" feature

4. **Definition State Management**
   ```typescript
   interface DefinitionState {
     coreWords: Map<string, CoreWordInfo>;      // Static
     currentFileDefs: Map<string, Definition>;  // From compile-on-change
     runtimeDefs: Map<string, Definition> | null;  // From last execution
     status: 'core-only' | 'live' | 'runtime' | 'stale';
   }
   ```

5. **UI State Transitions**
   | Status | Core | File | Runtime | Display |
   |--------|------|------|---------|---------|
   | Initial | ✅ | ❌ | ❌ | "Type to see definitions" |
   | Compiling | ✅ | ⏳ | ❌ | "Compiling..." |
   | Live (B) | ✅ | ✅ | ❌ | Current file definitions |
   | Runtime (A) | ✅ | ✅ | ✅ | All available definitions |
   | Stale (A) | ✅ | ⚠️ | ⚠️ | "Run to refresh" |

6. **Performance Optimization**
   - Compile in Web Worker if UI thread stutters
   - Cache compiled results per source hash
   - Skip compile on lines that only changed whitespace

## Decisions already made

1. **Use inspector panel (not tooltips):** Matches REPL UX, supports nesting better
2. **Core words always inspectable:** Hardcoded list from opcodes.ts
3. **User words require execution (Phase A):** Engine's `defs` map is source of truth
4. **Hash-based staleness detection (Phase A):** Simple and reliable
5. **Skip preprocessor in Phase B compile:** File I/O too slow for real-time; definitions from includes shown as "available after run"
6. **Debounced compile at 300ms:** Balance responsiveness with CPU usage
7. **Reuse REPL inspector CSS:** Consistent styling across the app

## Open questions

None — ready to implement.

## Out of scope

- Hover tooltips (replaced by panel approach)
- Goto definition (jump to source location) - can be added in Phase B extension
- Auto-complete based on definitions
- Inspector in Tutorial tab (Phase A focuses on Playground; Tutorial uses similar pattern)

## Dependencies

- None

## References

- REPL inspector implementation: `web/src/app.ts` lines 276-334
- REPL inspector CSS: `web/src/style.css` lines 896-1091
- Engine inspection: `typescript/core/src/engine.ts` lines 278-315
- Compiler: `typescript/core/src/compiler.ts`
- IR format: `typescript/core/src/ir.ts`
