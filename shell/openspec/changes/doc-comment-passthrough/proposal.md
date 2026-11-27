# Proposal

## Why

F♭m has one comment form (`/* ... */`), stripped or processed by every interpreter and tool. Documentation comments (`/** ... */`, JSDoc-style) would render better in editors (theme-native doc styling, folding, hover) — but teaching every interpreter a second comment form forks the grammar. The narrow fix: only the preprocessor learns `/**`, and it *normalizes* doc blocks to ordinary `/*` blocks downstream. No interpreter, flattener, or extractor ever sees `/**`.

## What Changes

- `shell/ff-preprocess.sh` + the TS/Go/Deno/Bun/Ruby/Python/C++ comment handling (whichever strip or forward comments): a block opening with `/**` is copied to output verbatim with the opener rewritten to `/*` (body untouched, directives inside NOT processed, no nesting). `/*` blocks behave exactly as today.
- Dual-accept falls out: downstream tools (`extract_effects` in `generate.py`, flatteners, runtimes) keep parsing `/*` only — they already handle the normalized output. No downstream changes.
- Restriction (documented, enforced): no directive processing inside `/**`, no nested comments. A `/**` block containing a directive line is still copied verbatim (directive inert) — never executed.

## Capabilities

### New Capabilities
- `doc-comment-passthrough`: `/** ... */` doc blocks normalized to `/* ... */` by the preprocessor with verbatim bodies.

## Impact

- Preprocessor implementations (shell helper + each backend's comment path that forwards comments).
- No changes to interpreters, `generate.py`, flatteners, or the extension (those consume `/*` as today).
- Test: flatten a file using `/**` blocks, diff against the `/*`-spelled equivalent — byte-identical output.
