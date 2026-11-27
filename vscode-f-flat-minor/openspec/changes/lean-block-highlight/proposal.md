# Proposal

## Why

`/* @lean ... */` blocks (v37, first real use: `fact` in `num.ffp`) contain Lean 4 code but render as undifferentiated comment grey — the generator's most powerful escape hatch is invisible in the editor. Highlighting it as Lean (when the Lean extension's grammar is available) makes `@lean` blocks readable and signals "this is code, not prose."

## What Changes

- `vscode-f-flat-minor/syntaxes/ff.tmLanguage.json`: a `comment.block.lean.f-flat-minor` rule matching `(/\*\s*)(@lean)\b` (and `@lean` inside `/**` doc blocks), whose interior includes the Lean grammar (`source.lean` when available, graceful fallback to comment scope when not).
- Independent of `doc-comment-passthrough` and `doc-comment-scoping` (same file, non-overlapping rules; composes with both).

## Capabilities

### New Capabilities
- `vscode-lean-embed`: Lean syntax highlighting inside `@lean` blocks.

## Impact

- `vscode-f-flat-minor/syntaxes/ff.tmLanguage.json` only.
- Degrades gracefully when the Lean extension is absent (falls back to comment styling).
