---
name: plans
description: "Use this skill whenever working with files in _plans/. Covers reading an existing plan before starting implementation, creating a new plan file, and updating a plan's status or content during or after implementation. Trigger when a user asks to plan something for later, scope deferred work, check what's planned, or record a plan. Also trigger at the start of any implementation task to check whether a plan already exists."
---

# Plans

Deferred implementation plans — work that has been scoped and decided but not yet
implemented. Each file is self-contained and provides enough context to implement
without needing to reconstruct intent from scratch.

## Quick Reference

| Action             | When                                              |
|--------------------|---------------------------------------------------|
| Read a plan        | Before starting any implementation task          |
| Create a plan      | When scoping work to be implemented later        |
| Update a plan      | When status changes or open questions are resolved|

---

## Reading a plan

Before starting implementation on any feature or subsystem:

1. Check whether a relevant plan exists in `_plans/`.
2. Read the YAML frontmatter first, especially `status`, `status_date`, and `creator`.
3. If found, treat it as the authoritative starting point.
4. Do **not** relitigate anything listed in **Decisions already made**.
5. Check **Open questions** — if any are unresolved and blocking, surface them
   to the user before proceeding.
6. Check **Dependencies** — confirm prerequisite plans or work are complete.

---

## Creating a plan

Use the template below. Save the file under `_plans/` using kebab-case, scoped
to the relevant subsystem:

```
_plans/
  f-flat-minor/
    fold-foldR-reverse.md
  kroz/
    level-gen-api.md
  angular/
    block-editor-migration.md
```

### Template

```markdown
---
# draft | ready | in-progress | done | abandoned
status: draft
status_date: YYYY-MM-DD
# Use a human name or agent identifier. If backfilling an older plan and the
# original author is unclear, use `unknown`.
creator: codex
---

# Plan: [Short descriptive title]

## Summary
<!-- One or two sentences. What will this plan accomplish when implemented? -->

## Context
<!-- Why does this plan exist? What decisions or discussions led here?
     Link to relevant _docs/ entries if applicable. -->

## Approach
<!-- The actual plan. Be specific enough that an agent or human can implement
     this without needing to ask clarifying questions. -->

## Decisions already made
<!-- List things that are settled and should NOT be relitigated during implementation. -->
-

## Open questions
<!-- What still needs resolution before or during implementation?
     If none, write "None — ready to implement." -->
-

## Out of scope
<!-- Explicitly state what this plan does NOT cover to prevent scope creep. -->
-

## Dependencies
<!-- Other plans, docs, or external work that must be completed first. -->
- None

## References
<!-- Links to relevant _docs/, external resources, or prior discussion. -->
-
```

### Tips for writing a good plan

- **Approach** should be specific enough that an agent can implement it without
  asking clarifying questions. Vague plans produce vague implementations.
- **Decisions already made** is the most important section for agents. Explicitly
  settled decisions prevent scope re-exploration.
- **Out of scope** prevents agents (and humans) from expanding scope when a plan
  is underspecified.

---

## Updating a plan

| Situation                              | Action                                                        |
|----------------------------------------|---------------------------------------------------------------|
| Status changes                         | Update `status` and `status_date` in frontmatter              |
| Open question resolved                 | Move resolution to **Decisions already made**, remove from **Open questions** |
| Plan fully implemented                 | Set `status: done`, update `status_date`, add a brief note on outcome |
| Plan will not be implemented           | Set `status: abandoned`, update `status_date`, record why     |

Do **not** delete done or abandoned plans. They serve as a lightweight decision
log — future agents and collaborators can understand why something was done a
certain way by reading what was planned and what changed.

---

## Frontmatter fields

| Field         | Meaning                                                         |
|---------------|-----------------------------------------------------------------|
| `status`      | Current lifecycle state of the plan                             |
| `status_date` | Date the current status was set                                 |
| `creator`     | Human name or agent identifier that originally authored the plan |

---

## Status values

| Status        | Meaning                                               |
|---------------|-------------------------------------------------------|
| `draft`       | Still being written, not ready for implementation     |
| `ready`       | Fully scoped, implementation can begin                |
| `in-progress` | Actively being implemented                            |
| `done`        | Implemented                                           |
| `abandoned`   | Will not be implemented; reason recorded in file      |
