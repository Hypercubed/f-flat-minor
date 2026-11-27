# Proposal

## Why

The vscode extension scopes `@effect` blocks with a custom TextMate scope (`comment.block.effect.f-flat-minor`) that no theme special-cases — blocks render as generic comments, worse than JSDoc-style documentation in every stock theme (which get italic doc-green, folding, and hover affordances for free). The `#effectInner` sub-grammar already provides the semantic highlighting inside the block; only the outer frame needs to change.

## What Changes

- `vscode-f-flat-minor/syntaxes/ff.tmLanguage.json`: `/** ... */` blocks scope as documentation comments (theme-native rendering); `@effect` inside them keeps the existing `#effectInner` treatment. The custom outer scope is removed in favor of the standard documentation scope.
- Independent of `doc-comment-passthrough` (works on `/**` blocks as typed, regardless of what the preprocessor does with them) and of `lean-block-highlight` (same file, non-overlapping rules).

## Capabilities

### Modified Capabilities
- `vscode-grammar`: documentation-comment scoping for `/**` blocks with retained inner effect highlighting.

## Impact

- `vscode-f-flat-minor/syntaxes/ff.tmLanguage.json` only.
- No repo-wide effects; no preprocessor/generator/interpreter changes.
