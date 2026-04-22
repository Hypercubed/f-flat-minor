---
name: plans
description: "Use whenever working with maintainer plans under .agents/docs/plans/. Covers reading a plan before implementation, creating or scaffolding a plan, and updating status or body during or after work. Trigger when the user asks to plan, scope deferred work, check what is planned, or record a plan. Also trigger at the start of implementation to see whether a plan already exists."
---

# Plans

Deferred implementation plans — scoped work not yet (fully) implemented. Each
file is self-contained so an agent can implement without reconstructing intent.

Plans live under **`.agents/docs/plans/`** (active) and **`plans/archive/`**
(completed or otherwise terminal). YAML frontmatter follows the
[write-plan CONTRACT](../write-plan/CONTRACT.md) (`id`, `title`, `last_updated`,
`description`, `tags`, `status`, optional graph keys).

## Quick reference

| Action        | When                                      |
|---------------|-------------------------------------------|
| Read a plan   | Before starting implementation            |
| Create a plan | When scoping work for later               |
| Update a plan | When status or blocking questions change  |

---

## Reading a plan

1. Scan [`.agents/docs/plans/index.md`](../../docs/plans/index.md) (or search under `plans/`).
2. Read YAML frontmatter first: `status`, `title`, `last_updated`, `tags`, optional `superseded_by` / `related_plans` (qualified `plans/<slug>` form per CONTRACT).
3. Treat the body as authoritative for approach and decisions already recorded.
4. Do **not** relitigate items under **Decisions already made** (or equivalent).
5. Resolve **Open questions** before driving implementation if they are blocking.
6. Check **Dependencies** / cross-links to other plans (`../other-plan.md`, `archive/other.md`).

**Legacy prose:** older plan bodies may still mention historical status words
(`ready`, `in-progress`, `done`). Prefer the frontmatter `status` field; map
roughly: `ready` / `in-progress` → treat as in-flight initiative; `done` →
completed work (often the file is under `archive/`).

---

## Creating a plan

Prefer scaffolding with valid CONTRACT metadata:

```bash
python3 .agents/skills/write-plan/scripts/write-plan.py --help
```

Otherwise create **`.agents/docs/plans/<id>.md`** where **`id`** matches the
filename stem (lowercase `[a-z0-9_-]` only). Then run
`bash .agents/skills/docs-compile/scripts/docs-compile.sh` so `plans/index.md`
and docs-search stay aligned.

### Template (body after CONTRACT frontmatter)

Use [write-plan CONTRACT](../write-plan/CONTRACT.md) for the YAML header. After
the closing `---`, start with `#` title, then sections such as:

```markdown
## Summary

## Context

## Approach

## Decisions already made

## Open questions

## Out of scope

## Dependencies

## References
```

Link to durable decisions or troubleshooting from the **body** using a
`## Related decisions` section and relative links (for example
`../decisions/<slug>.md`); do **not** use a `related_decisions` YAML list.

---

## Updating a plan

| Situation                    | Action                                                                 |
|-----------------------------|-------------------------------------------------------------------------|
| Status / scope change       | Bump `last_updated`; set `status` per CONTRACT vocabulary                 |
| Open question resolved      | Move answer into **Decisions already made**; trim **Open questions**   |
| Work finished               | Set `status: completed` (or `cancelled` / `superseded` as appropriate); `git mv` to `plans/archive/` when retiring from the active set; bump `last_updated` |
| Superseded by another plan  | Set `status: superseded` and `superseded_by: [plans/<other-id>, ...]`    |

Do **not** delete archived plans; they keep history. See CONTRACT **Archive**
section for the `git mv` convention.

---

## Status values (write-plan)

Use only CONTRACT `status` values in frontmatter: `draft`, `active`, `paused`,
`completed`, `cancelled`, `superseded`, `archived` (all lowercase). These
replace older informal labels such as `ready` / `in-progress` / `done` /
`abandoned` over time as plans are edited.
