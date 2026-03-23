---
status: draft
status_date: 2026-03-23
creator: anthropic/claude-sonnet-4.6
---

# Plan: F♭m Language Server (VSCode Extension)

## Summary
Extract a shared `compile-service` package from the web editor's definition
compiler and static analyzer, then wrap it in an LSP-compliant language server
and a minimal VSCode extension — providing go-to-definition, hover docs,
diagnostics, and word completion for `.ff` and `.ffp` files.

## Context
Three plans converge here:

- `web-editor-word-inspector.md` — Phase B introduces `definition-compiler.ts`,
  which tokenizes source, compiles to IR, extracts definition ranges, and maps
  them back to source positions. This is the core of what a language server needs.
- `static-code-analysis.md` — introduces `analyzer.ts` and a `Diagnostic` type
  that is structurally identical to LSP's `Diagnostic`. The analyzer runs on the
  same IR that `definition-compiler.ts` produces.
- Prior discussion established that both pieces should live in a shared package
  consumed by both the web inspector and the language server, rather than being
  embedded in the web app.

The language server is a thin LSP wrapper around those two existing subsystems.
No new language logic is required; the work is extraction, packaging, and wiring.

## Approach

### Phase 0: Extract `compile-service` package

Create `typescript/compile-service/` as a standalone package within the monorepo.

**Move/refactor from planned web inspector work:**

```
typescript/compile-service/
  src/
    tokenizer.ts        # Must emit { line, character, length } spans per token
    compiler.ts         # Re-export / thin wrapper of typescript/core compiler
    analyzer.ts         # Moved from static-code-analysis plan (unchanged)
    word-signatures.ts  # Moved from static-code-analysis plan (unchanged)
    source-map.ts       # Token-position → IR-range → source-range mapping
    compile-service.ts  # Public API (see below)
  package.json
  tsconfig.json
```

**Public API (`compile-service.ts`):**

```typescript
export interface CompileResult {
  definitions: Map<string, Definition>;  // word name → { body, range: SourceRange }
  diagnostics: Diagnostic[];             // from analyzer.ts
  sourceMap: SourceMap;                  // token offset ↔ { line, character }
}

export interface SourceRange {
  start: { line: number; character: number };
  end:   { line: number; character: number };
}

// Diagnostic already defined in static-code-analysis plan;
// extend end position here:
export interface Diagnostic {
  severity: 'error' | 'warning';
  message: string;
  range: SourceRange;   // replaces bare line/column from analyzer plan
}

export function compileSource(source: string, uri?: string): CompileResult;
```

**Consumers:**
- `web/src/definition-compiler.ts` (Phase B of word inspector) imports from this package
- Language server (Phase 1 below) imports from this package

The web app and language server never diverge — they share one implementation.

### Phase 1: Language server package

Create `typescript/language-server/` as a new package.

```
typescript/language-server/
  src/
    server.ts       # Entry point: LSP initialization and capability registration
    handlers.ts     # One function per LSP request type
    documents.ts    # TextDocuments manager (vscode-languageserver/node)
  package.json      # depends on compile-service, vscode-languageserver
  tsconfig.json
```

**Initialization (`server.ts`):**

```typescript
import { createConnection, TextDocuments, ProposedFeatures } from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

connection.onInitialize(() => ({
  capabilities: {
    textDocumentSync: TextDocumentSyncKind.Incremental,
    hoverProvider: true,
    definitionProvider: true,
    completionProvider: { triggerCharacters: [] },
  },
}));
```

**On document change — push diagnostics:**

```typescript
documents.onDidChangeContent(({ document }) => {
  const { diagnostics } = compileSource(document.getText(), document.uri);
  connection.sendDiagnostics({
    uri: document.uri,
    diagnostics: diagnostics.map(toLspDiagnostic),
  });
});
```

**`textDocument/hover` handler:**

1. Get word token at `params.position` via `sourceMap.wordAt(position)`.
2. Look up word in `definitions`.
3. Return `MarkupContent` with the definition body formatted as an F♭m code block,
   plus the word's stack effect comment if present (from future Phase 2 of static
   analysis plan).
4. For core words: return the description from `word-signatures.ts` (same source
   the web inspector uses for "system word" display).

**`textDocument/definition` handler:**

1. Get word token at `params.position`.
2. Look up word in `definitions` → `definition.range`.
3. Return `LocationLink` with `targetUri = document.uri`, `targetRange = definition.range`.
4. For core words: return `null` (no source location available).

**`textDocument/completion` handler:**

1. Return all keys of `definitions` (both core and user-defined) as `CompletionItem[]`.
2. `kind`: `Function` for user-defined words, `Keyword` for core words.
3. `detail`: stack effect string if available, else omit.

All three handlers re-use the cached `CompileResult` from the last `didChange`
event for the document — do not re-compile per request.

### Phase 2: VSCode extension

Create `vscode-extension/` at the repo root.

```
vscode-extension/
  src/
    extension.ts    # Activate: spawn server, connect LanguageClient
  package.json      # Declares language, file associations, contributes
  tsconfig.json
  .vscodeignore
```

**`package.json` contributions:**

```json
{
  "contributes": {
    "languages": [{
      "id": "f-flat-minor",
      "aliases": ["F♭m", "f-flat-minor"],
      "extensions": [".ff", ".ffp"],
      "configuration": "./language-configuration.json"
    }]
  }
}
```

**`language-configuration.json`** — bracket pairs `[ ]`, line comment `/**/`
(block only), word pattern matching F♭m word characters including `-`, `?`, `!`.

**`extension.ts`** (~40 lines):

```typescript
import { LanguageClient, ServerOptions, TransportKind } from 'vscode-languageclient/node';

export function activate(context: ExtensionContext) {
  const serverModule = context.asAbsolutePath(
    path.join('..', 'typescript', 'language-server', 'dist', 'server.js')
  );
  const client = new LanguageClient(
    'ffm-language-server',
    'F♭m Language Server',
    { run: { module: serverModule, transport: TransportKind.ipc } },
    { documentSelector: [{ scheme: 'file', language: 'f-flat-minor' }] }
  );
  client.start();
  context.subscriptions.push(client);
}
```

### Phase 3: Build and packaging

- Add `compile-service` and `language-server` build targets to the monorepo
  build (alongside existing `typescript/core`).
- Add `vscode:prepublish` script to `vscode-extension/package.json` that builds
  the language server before packaging.
- Publish to the VSCode Marketplace as a separate step (out of scope for this plan).

## Decisions already made

- **Shared `compile-service` package** — both web inspector and language server
  import from it; logic is never duplicated.
- **LSP wire protocol handled by `vscode-languageserver-node`** — do not
  implement JSON-RPC manually.
- **`Diagnostic.range` replaces bare `line/column`** — the static analysis plan's
  `Diagnostic` type is extended here to carry a full `SourceRange`; the analyzer
  itself is otherwise unchanged.
- **One `CompileResult` cached per open document** — handlers read from cache,
  not re-compiled per request.
- **Core words always available** — sourced from `word-signatures.ts`
  (static-code-analysis plan); no runtime engine needed.
- **Multi-file / `include` resolution deferred** — definitions from included
  files are not resolved statically; consistent with the word inspector plan's
  decision to defer this.
- **No debug adapter** — runtime defs (from an executing engine) are out of scope;
  this is a static-only language server.
- **File extensions `.ff` and `.ffp`** — language ID `f-flat-minor`.

## Open questions

- Does the existing tokenizer in `typescript/core` emit token positions
  (`line`, `character`) or only raw offsets? If only offsets, a position-tracking
  wrapper must be added as part of Phase 0 before anything else can proceed.
- Should `vscode-extension/` live at the repo root or under a `tools/` or
  `editor/` subdirectory? (Aesthetic choice — doesn't affect implementation.)

## Out of scope

- Semantic rename (`textDocument/rename`)
- Find all references (`textDocument/references`)
- Multi-file / cross-`include` definition resolution
- Debug adapter protocol (runtime stack inspection in the editor)
- Editors other than VSCode (the LSP server itself is editor-agnostic, but the
  extension package targets VSCode only)
- Publishing to the VSCode Marketplace
- Stack effect inference beyond what the static analysis plan already provides

## Dependencies

- `_plans/web-editor-word-inspector.md` — Phase B (`definition-compiler.ts` and
  source range mapping) must be designed concurrently with Phase 0 of this plan,
  since `compile-service` is the extraction of that work.
- `_plans/static-code-analysis.md` — `analyzer.ts` and `word-signatures.ts` must
  exist before Phase 1 diagnostics can be wired up. Phase 1 can proceed without
  them (diagnostics simply return empty) but full value requires them.

## References

- `_plans/web-editor-word-inspector.md` — source of `definition-compiler.ts`,
  `DefinitionState`, debounce strategy, and source range mapping design
- `_plans/static-code-analysis.md` — source of `analyzer.ts`, `Diagnostic`,
  `word-signatures.ts`, and `AbstractValue` type
- `typescript/core/src/compiler.ts` — compiler pipeline being wrapped
- `typescript/core/src/ir.ts` — IR structure consumed by the analyzer
- `typescript/core/src/engine.ts` lines 278–315 — engine inspection API
  (runtime defs, not used here but referenced for context)
- [vscode-languageserver-node](https://github.com/microsoft/vscode-languageserver-node) — LSP library
- [Language Server Protocol specification](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/)
