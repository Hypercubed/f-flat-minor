---
name: write-plan
description: Scaffold a new maintainer plan under `.agents/docs/plans/<id>.md` with valid YAML frontmatter, collision-checked ids, optional body stub sections (link decisions in a ## Related decisions section per CONTRACT). Use when starting a tracked initiative that should appear in docs-search.
---

# Write plan

## Goal

Create a **plan-only** markdown file under `.agents/docs/plans/` that matches the **plan frontmatter contract** shipped with this skill ([`CONTRACT.md`](CONTRACT.md)), without hand-copying YAML. The repo’s normative copy of the same rules lives under [Frontmatter contract (plans) in `MAINTENANCE.md`](../../docs/MAINTENANCE.md#frontmatter-contract-plans). For how plans are organized and retired, see [plans index](../../docs/plans/index.md) and the [plans skill](../plans/SKILL.md). If `CONTRACT.md` ever disagrees with `MAINTENANCE.md`, treat **`MAINTENANCE.md` as authoritative** until the skill contract is updated.

## When to use

- A multi-step initiative needs a durable roadmap (not a session bundle, not an ADR).
- You want the plan indexed by **docs-search** immediately after creation.

## Inputs (collect before running)

Gather from the maintainer or task context:

1. **`id`** — stable slug, lowercase `[a-z0-9_-]`, **must equal** the filename stem (`<id>.md`) with **no type prefix in the filename** (see [Entry `id` and qualified graph references](../../docs/MAINTENANCE.md#entry-id-and-qualified-graph-references) in `MAINTENANCE.md`). Must **not** collide with any other plan `id` under `.agents/docs/plans/` or `.agents/docs/plans/archive/` (retired plans keep their ids).
2. **`title`** — short human title.
3. **`description`** — one or two sentences (machine-oriented; docs-search shows this).
4. **`tags`** — non-empty list of lowercase `[a-z0-9_-]` labels.
5. **`status`** — one of `draft`, `active`, `paused`, `completed`, `cancelled`, `superseded`, `archived` (plans only; do not reuse decision status strings).
6. Optional: **`kind`** (`initiative` \| `meta` \| `exploration`), **`consumer_portable`** (boolean; default false for maintainer-only roadmaps). Link to decisions or troubleshooting in the plan **body** (`## Related decisions`), not in frontmatter.

## Procedure

1. Resolve the repository root (directory containing `.agents/`).

2. Choose `id` and confirm it is not already used under **plans only**:
   - Search filenames under `.agents/docs/plans/` and `.agents/docs/plans/archive/` (ignore `plans/index.md`).
   - If unsure, run the script once with `--dry-run` after picking a candidate id; collisions exit with an error.

The generated body comes from the scaffold template [`bootstrap/plan-body.md`](bootstrap/plan-body.md) in this skill (placeholders `{{title}}` and `{{related_decisions_section}}` are replaced). Edit that file to change default sections for all new plans.

3. Optionally infer **related decision refs** (`decisions/<slug>`) by skimming nearby decisions whose titles overlap the plan topic; pass `--auto-related` so the script emits **`## Related decisions`** bullet **links** in the body (never YAML `related_decisions`).

4. Generate the file from the repo root:

   ```bash
   python3 .agents/skills/write-plan/scripts/write-plan.py \
     --id "<slug>" \
     --title "<title>" \
     --description "<one or two sentences>" \
     --tags "tag-one,tag-two" \
     --status draft \
     --kind initiative \
     --auto-related
   ```

   Add explicit **body** links to decisions or troubleshooting when you already know the ids (repeat `--related` for each):

   ```bash
   python3 .agents/skills/write-plan/scripts/write-plan.py \
     --id "example-initiative" \
     --title "Example initiative" \
     --description "Short machine-oriented summary for search results." \
     --tags "docs,plans" \
     --related decisions/single-tree-architecture-agents
   ```

5. Open the new file and replace the **TODO** sections (Goal, Scope, Approach, milestones, success criteria, risks, knowledge routing). Keep **`## Related decisions`** as the home for cross-links; add or edit bullet links there instead of frontmatter.

6. Refresh indexes so humans see it in `plans/index.md`:

   ```bash
   bash .agents/skills/docs-compile/scripts/docs-compile.sh
   ```

## Script reference

- `--dry-run` — print the markdown that would be written; do not create the file.
- `--force` — overwrite an existing `.agents/docs/plans/<id>.md` only (still refuses collisions with other plan ids).
- `--agents-root` — path to `.agents` when running outside the usual layout.

## Constraints

- **Plan-only:** creating or editing a plan does **not** authorize changing shipped skill behavior; implementation still needs an explicit maintainer request.
- **Qualified graph edges:** use `decisions/<slug>` or `troubleshooting/<slug>` in YAML where the target kind is not obvious (`depends_on`, plan `outcome_decisions`, etc.); see `MAINTENANCE.md`.

## Related

- [docs-search](../docs-search/SKILL.md) — refresh `docs-search-index.json` after substantive plan edits.
- [docs-compile](../docs-compile/SKILL.md) — regenerate `plans/index.md` and the search index together.
