---
status: in-progress
status_date: 2026-04-10
creator: GPT-5.4
---

# Plan: VSCode ERS Definition Commands

## Summary
Add three VSCode commands — `Expand Current Definition`, `Collapse Current Definition`, and `Audit Current Definition` — that operate on the definition under the cursor by delegating analysis and rewrites to the ERS toolchain rather than requiring a full language server.

## Progress (as of 2026-04-02)

### Shipped in `vscode-f-flat-minor`

- **`f-flat-minor.auditCurrentDefinition`** — Runs `ers audit` on the saved file using the cursor’s **1-based** line/character; writes to output channel **F-flat-minor ERS**. Output format follows setting **`f-flat-minor.ersOutputFormat`** (`text` | `json`).
- **ERS CLI resolution** — Bundled **`out/ers-cli.mjs`** (esbuild bundle of `node/bin/ers.ts`) ships in the `.vsix` so audit works without a monorepo checkout; optional **`f-flat-minor.ersScript`** override; fallback discovery via workspace roots / walk-up from the open file for `node/bin/ers.ts`.
- **Definition hover (ERS summary)** — When **`f-flat-minor.ersHover`** is true, hovering a **`word:`** definition name (regex-based span detection) runs `ers audit --word … --json`, caches by `(uri, version, word)`, and shows **definition body**, **safety verdict**, and **reasons** in the hover markdown.
- **Hover action: Run ERS audit** — The hover ends with a trusted markdown link **`[Run ERS audit](command:…)`** that invokes **`f-flat-minor.auditDefinitionByWord`** with `[documentUri.toString(), word]`, so the full audit (respecting `ersOutputFormat`) opens in the output channel **without** relying on cursor position. `MarkdownString.isTrusted` uses **`enabledCommands: ['f-flat-minor.auditDefinitionByWord']`** only.
- **Command palette** also lists **Audit Definition by Word**; if invoked without arguments, shows a hint to use the hover link or Audit Current Definition.

### Not started (this plan)

- **Expand / Collapse current definition** commands (Phases 3–4).
- **Phase 1 as originally written** — Extension does not yet call `compileSource` to resolve the current definition; the audit command delegates line/character to the ERS CLI, and hover uses `--word` after regex detection.

### Pattern for future ERS commands (expand, collapse, suggest, …)

Reuse the same two integration styles:

1. **Palette / context menu** — Command with cursor-based targeting (eventually: shared `CurrentDefinitionTarget` from compile-service when implemented).
2. **Hover (or later: diagnostics)** — Trusted **`command:`** link in `MarkdownString` with **`enabledCommands`** listing only the new command ID; handler accepts **(uri string, word string)** (and any extra args later) so behavior matches the palette flow without depending on selection.

Keep **one implementation** per operation (shared function that runs ERS / applies edits); hover links only serialize **uri + word** (or equivalent stable args) into the query string.

## Context
The hybrid ERS plan already defines the right semantic substrate for auditing and rewriting a single F-flat-minor definition: a parser/analyzer that can target one word, a rewrite engine with exact spans and before/after edits, and a CLI-oriented command surface (`ers audit`, `ers rewrite`, `ers suggest`). That plan explicitly treats the tool as the mechanical layer and keeps judgment-heavy choices outside the core engine.

Separately, the existing VSCode extension is a direct extension, not an LSP client. It already registers providers directly against the VSCode API and therefore can host editor commands without first implementing the full language server. The new `typescript/compile-service` foundation can already compile a buffer, recover current-file definition ranges, and map cursor positions to source words. That is enough to identify “the current definition” and hand it off to ERS.

This plan is intentionally about command UX and editor wiring. It depends on the hybrid ERS implementation for the actual audit/rewrite semantics and only uses compile-service for definition selection and range targeting.

## Approach

### Phase 0: Define the editor/ERS contract

Freeze the contract between the VSCode extension and the ERS tool before implementing any command UI.

Create a reusable TypeScript-facing ERS entrypoint with two possible adapters:

- **Preferred:** importable library API under `tools/ers/`
- **Acceptable fallback:** CLI wrapper that shells out to `ers ... --json`

Required operations:

```typescript
interface ErsAuditParams {
  file: string;
  word: string;
  mode: "full-floor" | "structural";
}

interface ErsRewriteParams extends ErsAuditParams {
  rewriteMode: "expand" | "collapse";
  applySafeLocalClosure?: boolean;
}

interface ErsAuditResult {
  word: string;
  file: string;
  resolvedBody: string;
  definitionRange?: SourceRange;
  queueRegions: QueueRegion[];
  pointerCandidates: PointerCandidate[];
  rewrites: RewriteCandidate[];
  safety: {
    verdict: "safe-local" | "safe-with-analysis" | "review-required" | "unsafe" | "blocked";
    reasons: string[];
  };
  diagnostics: Diagnostic[];
}

interface ErsRewriteResult extends ErsAuditResult {
  changed: boolean;
  replacement: string;
  editRange: SourceRange;
  appliedRules: AppliedRewrite[];
}
```

The VSCode layer must not re-derive ERS logic. It only:

1. resolves the active definition
2. invokes ERS
3. displays audit output or applies the returned edit

### Phase 1: Resolve “current definition” in the editor

Add an extension helper that determines the definition under the current cursor/selection.

Implementation outline:

1. Get the active `TextEditor`.
2. Compile the current document text with `compileSource(document.getText(), document.uri.fsPath)`.
3. Search `CompileResult.definitions` for the non-core definition whose `range` contains the cursor.
4. If the cursor is not inside a user definition:
   - show a friendly message: “Place the cursor inside a user-defined word.”
   - do not invoke ERS.
5. Resolve the target as:

```typescript
interface CurrentDefinitionTarget {
  uri: vscode.Uri;
  word: string;
  range: vscode.Range;
  bodyRange: vscode.Range | null;
}
```

Important details:

- Ignore core-word pseudo-definitions from compile-service (their zero ranges are placeholders, not editable source).
- Restrict the initial implementation to saved file-backed documents.
- Restrict the initial implementation to current-file definitions only; no cross-`.import` or included-file ownership.

### Phase 2: Add `Audit Current Definition` — **partially done**

Implement `f-flat-minor.auditCurrentDefinition` first because it is read-only and matches Phase 1 of the hybrid ERS plan.

Command flow:

1. Resolve the current definition target. **Current implementation:** pass cursor line/character to `ers audit` (CLI resolves the word). **Planned refinement:** resolve via `compileSource` in the extension as in Phase 1.
2. Invoke ERS audit in default mode `full-floor`.
3. Present the result in a deterministic, reviewable UI.

**Also done:** hover summary + **Run ERS audit** link (see **Progress** above).

Initial UI:

- `window.createOutputChannel("F-flat-minor ERS")`
- write:
  - target word + file
  - resolved body
  - safety verdict
  - safety reasons
  - queue inventory
  - pointer inventory
  - candidate rewrites
  - blocked conditions

Enhancements allowed later:

- `TreeDataProvider` panel for audit details
- diagnostic decorations on risky spans
- code lenses showing safety verdict inline

Audit semantics:

- “Audit” means “attempt to determine rewrite safety for this definition,” not “prove semantic correctness.”
- The command should surface the ERS verdict categories directly (`safe-local`, `safe-with-analysis`, `review-required`, `unsafe`, `blocked`) rather than inventing editor-specific equivalents.
- If ERS cannot fully classify a definition, the command still succeeds and shows the blocked/review-required reasons.

### Phase 3: Add `Expand Current Definition`

Implement `f-flat-minor.expandCurrentDefinition` as a command that rewrites only the current definition region.

Behavior:

1. Resolve current definition.
2. Invoke ERS rewrite with:
   - `rewriteMode: "expand"`
   - `mode: "full-floor"`
3. Require ERS to return:
   - `editRange`
   - replacement text
   - applied rule list
   - safety verdict / reasons
4. If ERS reports `review-required`, `unsafe`, or `blocked`:
   - do not auto-apply
   - show the audit output and tell the user why expansion was withheld
5. If ERS reports a safe applicable rewrite:
   - preview the edit if practical
   - otherwise apply a `WorkspaceEdit` directly to just the definition range
   - preserve undo/redo as one editor action

Initial scope:

- one definition at a time
- one file at a time
- no batch project rewrite
- no auto-save side effects beyond the normal editor state

### Phase 4: Add `Collapse Current Definition`

Implement `f-flat-minor.collapseCurrentDefinition` in the same pattern as expand, but targeting resynthesis / reduction.

Behavior:

1. Resolve current definition.
2. Invoke ERS rewrite with:
   - `rewriteMode: "collapse"`
   - default `mode: "structural"` or `full-floor` depending on what the ERS API standardizes
3. Apply only safe rewrites automatically.
4. If ERS returns review-required suggestions:
   - show them
   - do not apply them automatically

The collapse command should be conservative:

- safe-local closure can auto-apply
- safe-with-analysis can auto-apply only if the ERS engine returns a positive proof-backed verdict
- review-required never auto-applies in the first version

### Phase 5: Add preview, confirmation, and failure UX

Before broadening scope, make the command UX trustworthy.

Required UX behavior:

- If no active editor or unsupported document type: show a concise error.
- If the cursor is outside a user definition: show a concise info message.
- If ERS returns “no changes”: show “No expandable/collapsible rewrite found.”
- If ERS reports blocked/unsafe: show the audit output and do not modify the document.
- If an edit is available:
  - show a preview diff if practical
  - otherwise show a confirmation message including the number of rules applied

The editor must never partially apply a rewrite:

- either one coherent `WorkspaceEdit` is applied
- or nothing is changed

### Phase 6: Optional command surfacing improvements

Once the core commands work, improve discoverability:

- add command palette titles:
  - `F-flat-minor: Audit Current Definition` *(done)*
  - `F-flat-minor: Audit Definition by Word` *(done; primarily for hover link invocation)*
  - `F-flat-minor: Expand Current Definition`
  - `F-flat-minor: Collapse Current Definition`
- add editor context-menu entries when the active language is `f-flat-minor`
- optionally add code actions that invoke the same command implementations
- **Hover command links** for audit are implemented; repeat the same **`command:` + `enabledCommands`** pattern for expand/collapse when those commands exist.

These improvements should reuse the exact same backend command handlers. Do not fork behavior between command palette, context menu, code action entrypoints, or hover links.

## Decisions already made

- **No full language server required for v1.** Implement these as direct VSCode extension commands first.
- **ERS is the source of truth for audit/rewrite semantics.** The extension must not encode rewrite rules itself.
- **compile-service is only the definition locator.** It identifies the current definition and its source range; it does not decide rewrite safety.
- **Commands are single-definition only.** They operate on the definition containing the cursor, not the whole file or project.
- **Audit ships before rewrite commands.** Read-only audit is the first command because it matches the hybrid ERS plan and reduces risk.
- **Unsafe or review-required rewrites do not auto-apply.** The initial implementation is conservative.
- **Current-file only for v1.** Cross-file ownership and included-file rewrites are deferred.
- **VSCode-only integration is acceptable.** Cross-editor support can wait for future LSP/code-action work.

## Open questions

- Should `Collapse Current Definition` default to `structural` mode while `Expand Current Definition` defaults to `full-floor`, or should both commands use `full-floor` initially for consistency?
- Should the first implementation use an importable ERS library API, or is a JSON-speaking CLI wrapper acceptable as the initial integration point?
- Is a preview diff required for v1, or is a single confirmation prompt enough if the rewrite result is fully auditable in the output channel?

## Out of scope

- Full language-server or LSP implementation for these commands
- Batch expand/collapse across multiple definitions or files
- Automatic application of `review-required` rewrites
- Rename/references/completion features *(ERS-backed **definition-name hover** and **run-audit from hover** are in scope for audit only; import-aware hover at use sites remains deferred.)*
- Rewriting definitions in imported or included files from the current editor buffer
- Runtime-aware or engine-state-aware auditing
- Encoding the full ERS skill inside the VSCode extension

## Dependencies

- `_plans/hybrid_ers_implementation_plan.md` — provides the required ERS analyzer/rewrite architecture, safety model, and command surface
- `_plans/language-server.md` Phase 0 / `typescript/compile-service` — provides current-file definition discovery and source mapping used to resolve the active definition

## References

- `_plans/hybrid_ers_implementation_plan.md`
- `_plans/language-server.md`
- `vscode-f-flat-minor/src/extension.ts`
- `vscode-f-flat-minor/package.json`
- `typescript/compile-service/src/compile-service.ts`
