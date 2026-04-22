---
name: docs-search
description: Search `.agents/` durable knowledge using a local JSON index generated from markdown sources. Use `index-docs.py` to refresh search data, and optionally run docs-compile when you also want durable section index files regenerated.
---

# Docs search

Search durable guidance under `.agents/` with a local JSON index.

## Requirements

- Python 3.9+
- PyYAML (`pip install pyyaml`)

## Quickstart

From the target repository (or any subdirectory under it):

```bash
python3 .agents/skills/docs-search/scripts/index-docs.py
python3 .agents/skills/docs-search/scripts/search-docs.py "auth troubleshooting"
```

If the optional `docs-compile` skill is installed, you can refresh durable section indexes and search index together:

```bash
bash .agents/skills/docs-compile/scripts/docs-compile.sh
```

Default search output lists up to **5** matches; use `--limit 3` for top-3.

## Agent workflow (3 steps)

1. **Index** — Run `index-docs.py` so `docs-search-index.json` reflects every `*.md` under `.agents/docs/` (plus playbooks and `AGENTS.md` as before).
2. **Search** — Run `search-docs.py "<query>"` to get ranked results (title, short description, path).
3. **Read** — Open the reported file paths for full content.

## Example queries

- `deployment steps`
- `auth errors`
- `knowledge lint`

## Index refresh

- **Required:** `python3 .agents/skills/docs-search/scripts/index-docs.py`.
- **Optional convenience:** `bash .agents/skills/docs-compile/scripts/docs-compile.sh` (if installed; see [`.agents/skills/docs-compile/SKILL.md`](../docs-compile/SKILL.md)).

## Command options

- `index-docs.py --dry-run` prints sample JSON only and does not write `docs-search-index.json`.
- `index-docs.py --agents-root /path/to/.agents` overrides auto-discovery (equivalent to `AGENTS_ROOT=/path/to/.agents`).
- `search-docs.py --agents-root /path/to/.agents` matches the indexer when the skill runs from outside that repo's `.agents/skills/docs-search/`.
- `search-docs.py --limit 3` returns fewer matches (default is 5).

## Constraints

- Search is **heuristic** (token overlap + substring), not semantic embeddings.
- `docs-search-index.json` is a **repo-local** cache under the target checkout's `.agents/skills/docs-search/` (written by `index-docs.py`). `search-docs.py` loads that path when it can resolve that checkout's `.agents/` from the working directory or `AGENTS_ROOT` / `--agents-root`, so search stays scoped to the repo even if the skill definition lives elsewhere.
- `docs-search-index.json` should remain gitignored.
