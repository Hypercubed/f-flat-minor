---
status: in-progress
status_date: 2026-04-10
creator: anthropic/claude-sonnet-4.6
---

# Plan: F♭m Language Server (VSCode Extension)

## Summary
Build a future `typescript/language-server/` package on top of the already-landed
shared `typescript/compile-service/` foundation, then optionally migrate the
existing `vscode-f-flat-minor/` extension from direct VS Code providers and
commands to an LSP client for `.ff` and `.ffp` files.

## Implementation status

- **Phase 0** (2026-04-10): **Largely complete / foundation in place** — `typescript/compile-service/` now exists and already contains `compile-service.ts`, `analyzer.ts`, `word-signatures.ts`, `source-map.ts`, `tokenizer.ts`, `compiler.ts`, and `mod.ts`. The shared compile/analyze/source-map layer this plan depended on has effectively landed.
- **Phase 1**: **Not started** — there is still no `typescript/language-server/` package in the repo.
- **Phase 2**: **Existing non-LSP extension in place** — the repo already ships `vscode-f-flat-minor/`, but it is a direct VS Code extension with handwritten providers/commands (for example import-path navigation, core-vocabulary hover, and ERS audit integration), not a `vscode-languageclient`-based LSP client.
- **Phase 3**: **Not started** — no language-server build/publish wiring exists yet because the server package does not exist.

## Context
Three workstreams converge here:

- `web-editor-word-inspector.md` — the source-range and definition-inspection work
  motivated the shared compile/analyze/source-map layer.
- `static-code-analysis.md` — the analyzer and diagnostics model also feed the same
  shared layer.
- That shared layer is no longer hypothetical: it now lives in
  `typescript/compile-service/` and can be treated as the starting point rather
  than the first deliverable.

The remaining language-server work is now mostly packaging and protocol wiring:
wrap `compile-service` in LSP, then decide whether `vscode-f-flat-minor/` should
stay partly bespoke, become a thin LSP client, or use a hybrid approach.

## Approach

### Phase 0: Extract `compile-service` package

Status: complete enough to serve as the foundation for the rest of this roadmap.

`typescript/compile-service/` already exists as a standalone package within the
monorepo.

**Current repo shape:**

```
typescript/compile-service/
  src/
    tokenizer.ts
    compiler.ts
    analyzer.ts
    word-signatures.ts
    source-map.ts
    compile-service.ts
    mod.ts
  package.json
```

`compile-service.ts` already exposes a `compileSource()` entry point and returns
definitions, diagnostics, source-map data, tokens, and IR. `source-map.ts`
already supports token lookup by position/offset and `wordAt(position)`, which is
the key primitive needed by hover/definition/completion handlers.

**Phase 0 follow-up, if needed:**

- Tighten package metadata / build wiring as needed for downstream consumers.
- Confirm the public API shape is stable enough for both web and LSP callers.
- Avoid re-embedding compiler/analyzer logic elsewhere.

**Representative API shape today:**

```typescript
export interface CompileResult {
  definitions: Map<string, Definition>;
  diagnostics: Diagnostic[];
  sourceMap: SourceMap;
  tokens: SourceToken[];
  ir: IrInstruction[];
}

export function compileSource(source: string, uri?: string): CompileResult;
```

**Consumers:**
- Existing and future TypeScript tooling can import from this package.
- The future language server (Phase 1 below) should import from this package.

The main Phase 0 objective is no longer extraction; it is preserving this package
as the shared implementation boundary.

### Phase 1: Language server package

Create `typescript/language-server/` as a new package.

```
typescript/language-server/
  src/
    server.ts       # Entry point: LSP initialization and capability registration
    handlers.ts     # One function per LSP request type
    documents.ts    # TextDocuments manager / compile-result cache
  package.json      # depends on @f-flat-minor/compile-service, vscode-languageserver
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

### Phase 2: VS Code client integration

Do not assume a new `vscode-extension/` package is needed. The repo already has
`vscode-f-flat-minor/`, and that package is the natural place for client-side
editor integration unless there is a strong reason to split it.

```
vscode-f-flat-minor/
  src/
    extension.ts    # Existing direct providers/commands; possible future client activation point
  package.json      # Already declares language, file associations, commands, grammar
  tsconfig.json
  .vscodeignore
```

**Current status:**

- `vscode-f-flat-minor/` already contributes the `f-flat-minor` language,
  grammar, and language configuration.
- It currently registers direct VS Code providers rather than using
  `vscode-languageclient`.
- It also includes extension-specific functionality that may remain client-side
  even after an LSP migration, such as ERS command wiring.

**Future direction:**

- Keep the existing contributions package and add a `LanguageClient` there once
  `typescript/language-server/` exists.
- Migrate features that belong in a reusable language server (diagnostics,
  definition lookup, completions, generic hovers) behind LSP.
- Evaluate whether extension-specific features such as ERS commands should remain
  bespoke in `vscode-f-flat-minor/`.

**Existing `package.json` contributions remain the baseline:**

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

**`language-configuration.json`** already exists in `vscode-f-flat-minor/` and
should continue to live there.

**Future `extension.ts` direction:**

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

That code is illustrative future-state wiring, not current repo state.

### Phase 3: Build and packaging

- Add `compile-service` and `language-server` build targets to the monorepo
  build (alongside existing `typescript/core`).
- Update `vscode-f-flat-minor/package.json` so its publish/build flow also builds
  the language server before packaging, if the extension becomes an LSP client.
- Publish to the VSCode Marketplace as a separate step (out of scope for this plan).

## Decisions already made

- **Shared `compile-service` package** — both web inspector and language server
  import from it; logic is never duplicated. This has effectively landed.
- **LSP wire protocol handled by `vscode-languageserver-node`** — do not
  implement JSON-RPC manually.
- **Current VS Code package is `vscode-f-flat-minor/`** — future client work
  should start there rather than assuming a brand-new repo-root extension package.
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

- Should the eventual LSP client fully replace the bespoke providers in
  `vscode-f-flat-minor/`, or should some features remain direct extension code
  (for example ERS-specific commands and hover affordances)?
- Should `typescript/compile-service/` gain its own build/test/publish metadata,
  or remain an internal monorepo package consumed by source imports?

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

- `_plans/web-editor-word-inspector.md` — relevant background for why the shared
  compile/source-map layer exists, but no longer a blocker for Phase 0.
- `_plans/static-code-analysis.md` — relevant background for analyzer and
  signatures work that now feeds `typescript/compile-service/`.
- Phase 1 depends primarily on stabilizing and consuming the existing
  `typescript/compile-service/` package.

## References

- `_plans/web-editor-word-inspector.md` — source of `definition-compiler.ts`,
  `DefinitionState`, debounce strategy, and source range mapping design
- `_plans/static-code-analysis.md` — source of `analyzer.ts`, `Diagnostic`,
  `word-signatures.ts`, and `AbstractValue` type
- `typescript/compile-service/src/compile-service.ts` — current shared compile API
- `typescript/compile-service/src/source-map.ts` — current position/word lookup API
- `vscode-f-flat-minor/src/extension.ts` — current direct VS Code integration path
- `vscode-f-flat-minor/package.json` — current extension packaging and contributed capabilities
- `typescript/core/src/compiler.ts` — compiler pipeline being wrapped
- `typescript/core/src/ir.ts` — IR structure consumed by the analyzer
- `typescript/core/src/engine.ts` lines 278–315 — engine inspection API
  (runtime defs, not used here but referenced for context)
- [vscode-languageserver-node](https://github.com/microsoft/vscode-languageserver-node) — LSP library
- [Language Server Protocol specification](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/)
