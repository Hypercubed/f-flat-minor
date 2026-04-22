---
name: knowledge-lint
description: Check the `.agents/` knowledge layer for duplication, contradiction, staleness, oversized guidance, broken or stale links, missing index coverage, uncategorized or misplaced knowledge, and consistency between `decisions/` and `troubleshooting/` indexes and their entry files. Use as a periodic maintenance pass.
---

# Knowledge Lint

## Goal

Keep the compiled repo knowledge layer coherent, minimal, and current.

## Inputs

- `.agents/AGENTS.md`
- `.agents/docs/MAINTENANCE.md`
- `.agents/docs/index.md`
- `.agents/docs/log.md`
- `.agents/docs/decisions/` (including `index.md` and per-decision markdown files)
- `.agents/docs/troubleshooting/` (including `index.md` and per-pattern markdown files)
- `.agents/playbooks/`

## Skill initialization (before first lint pass)

Run this once per target repo after the skill files are present under `.agents/skills/knowledge-lint/`. Idempotent: safe to repeat.

**Bootstrap source:** this kit keeps a **single** copy of scaffold templates under **learning-distill** at `.agents/skills/learning-distill/bootstrap/`. Run **learning-distill** skill initialization first when that skill is present; do not duplicate those files under **knowledge-lint**. If `learning-distill/` is missing from `.agents/skills/`, install or copy that skill before lint initialization, or copy missing templates from an upstream kit checkout.

Let `LD` denote `.agents/skills/learning-distill`.

1. Resolve the repo root (the directory that contains `.git/` in normal layouts).
2. Ensure `.agents/` exists and `LD/bootstrap/` is present; otherwise stop and add **learning-distill** (see above).
3. Ensure `.agents/playbooks/` exists. If `.agents/playbooks/README.md` is missing, copy `LD/bootstrap/playbooks/README.md` into place.
4. Ensure `.agents/docs/` exists. For each of `index.md`, `MAINTENANCE.md`, and `log.md`, if the file is missing under `.agents/docs/`, copy it from `LD/bootstrap/docs/`. If `.agents/docs/decisions/index.md` or `.agents/docs/troubleshooting/index.md` is missing, copy the entire contents of `LD/bootstrap/docs/decisions/` or `LD/bootstrap/docs/troubleshooting/` respectively, creating only files that do not already exist (do not overwrite).
5. If `.agents/AGENTS.md` is missing, copy `LD/bootstrap/AGENTS.md` into place. If it already exists, do not overwrite it.

If `.agents/sessions/` or `.agents/.gitignore` session rules are missing, run **learning-distill** initialization steps for sessions and ignore rules, or **task-closeout** initialization when you need closeout-first layout.

## Derived indexes and search (before lint)

When `decisions/` or `troubleshooting/` entry files were added, removed, or renamed, attempt docs-compile first so optional durable indexes stay fresh:

`bash .agents/skills/docs-compile/scripts/docs-compile.sh`

If the `docs-compile` skill is not installed, continue linting and skip durable index freshness checks that depend on those optional index files.

See [`.agents/skills/docs-compile/SKILL.md`](../docs-compile/SKILL.md).

If docs-search is available and docs-compile was not run, refresh the index manually:

```bash
python3 .agents/skills/docs-search/scripts/index-docs.py
```

Use `search-docs.py "<topic>"` as a discovery tool during the checks below, particularly for duplicates, contradictions, and uncategorized knowledge.

## Checks

- **Duplicate guidance** — If docs-search is available, run `search-docs.py` for key terms from each major guidance block in `AGENTS.md`, `decisions/`, and `troubleshooting/`. Treat results with multiple high-ranked hits on the same topic as candidates for deduplication. Do not rely solely on manual reading.
- contradictions
- stale or superseded rules
- oversized AGENTS sections
- missing index coverage in `.agents/docs/index.md` for durable assets
- broken links in indexes and cross-links between docs
- when `decisions/index.md` or `troubleshooting/index.md` exists, verify listed files exist and align with entry files; always verify each entry file has frontmatter `id` aligned with its filename slug where applicable, **`id` values are unique within `decisions/` and within `troubleshooting/`**, and **`depends_on` entries use qualified `decisions/…` or `troubleshooting/…` form** (see [Entry `id` and qualified graph references](../../docs/MAINTENANCE.md#entry-id-and-qualified-graph-references) in `MAINTENANCE.md`)
- **Durable entry metadata contract:** each `decisions/*.md` and `troubleshooting/*.md` entry (excluding each folder’s `index.md`) follows `.agents/docs/MAINTENANCE.md` — required `id`, `title`, `last_updated`, `description`, and YAML list `tags`; `decisions/` entries also have `status` (`accepted`, `superseded`, or `provisional`); no `status` on troubleshooting entries; `tags` is never a single scalar string meant to hold a list; optional `depends_on` is a YAML list when present. Confirm by reading frontmatter, not only prose.
- troubleshooting entries that should be decisions or playbooks
- decisions that should be compressed into AGENTS guidance
- **Uncategorized knowledge** — For content with no clear home, run `search-docs.py "<content topic>"` to find semantically related existing entries. If a related entry exists, propose merging. If none exists, propose a new category.
- **Mechanical path hygiene (especially after migrations or Replace All):** search for doubled `.agents/` path segments (for example `.agents/.agents` in paths) under `.agents/`, `README.md`, `INSTALL.md`, and `docs/`. Hits usually mean a bad global replace or copy/paste error.

## Output

Produce:

- a lint report
- optional minimal edits

Do **not** append to `.agents/docs/log.md` as part of this skill unless the user explicitly asked for a log entry. Distillation logging belongs to **learning-distill**; see `.agents/docs/MAINTENANCE.md` (Logging policy).

## Constraints

- Prefer reclassification and compression over adding more text.
- Do not modify source code.
- Do not delete knowledge without explicit justification.
