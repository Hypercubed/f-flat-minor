---
name: docs-compile
description: Regenerate optional durable docs indexes and rebuild docs-search cache from local markdown sources. Use after editing `.agents/docs/` (any section), and before maintenance passes that validate index alignment.
---

# Docs Compile

## Goal

Regenerate derived documentation artifacts from `.agents/` markdown.

## What it does

1. Regenerates optional durable `index.md` files — one per **immediate subdirectory** of `.agents/docs/` (for example `decisions/`, `troubleshooting/`, and any future top-level sections).
2. Rebuilds `.agents/skills/docs-search/docs-search-index.json`.

## Command

From the target repository (or any subdirectory under it):

```bash
bash .agents/skills/docs-compile/scripts/docs-compile.sh
```

Auto-discovery uses the nearest parent containing `.agents/`. Override with `AGENTS_ROOT=/path/to/.agents` when needed.

## Notes

- `docs-search` does not require durable `index.md` files; this compile step is optional for search correctness.
- `knowledge-lint` and `learning-distill` should run this when available to keep human-oriented indexes fresh.

## When to run

- After **learning-distill** adds, removes, or renames durable docs under `.agents/docs/`.
- Before **knowledge-lint** when you want optional durable `index.md` files kept fresh.
- After changing section `index.md` files under `.agents/docs/` if you rely on human index navigation.
