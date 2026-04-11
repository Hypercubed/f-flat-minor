# Agent Knowledge Maintenance

## Purpose

This file defines the schema and maintenance policy for the compiled knowledge
layer under `.agents/`.

## Knowledge Model

- Session bundles under `.agents/sessions/` are raw evidence.
- Files outside `.agents/sessions/` are synthesized durable knowledge.
- Durable knowledge should be incremental, concise, and reviewable.

## File Roles

### Root `AGENTS.md`

Repo entry point and navigation for agent-facing guidance.

### `.agents/AGENTS.md`

Compact description of the `.agents/` knowledge layer and its maintenance rules.

### `.agents/rules/`

Normative repo and authoring constraints.

### `.agents/playbooks/`

Durable multi-step procedures.

### `.agents/skills/`

Reusable task workflows.

### `.agents/docs/repo-decisions.md`

Durable rationale, tradeoffs, and architectural choices.

### `.agents/docs/troubleshooting.md`

Recurring issue patterns, causes, fixes, and validations.

### `.agents/docs/index.md`

Catalog of durable knowledge assets.

### `.agents/docs/log.md`

Append-only record of knowledge-layer maintenance.

## Distillation Policy

A lesson belongs in root `AGENTS.md` or `.agents/AGENTS.md` only if it is:

- stable
- concise
- broadly applicable
- actionable
- high confidence

Use more specific files when possible:

- rationale goes in `docs/repo-decisions.md`
- recurring failures go in `docs/troubleshooting.md`
- procedures go in `playbooks/`
- normative authoring or runtime constraints go in `rules/`
- reusable agent workflows go in `skills/`

## Task Bundle Policy

Task bundles live in `.agents/sessions/` and are temporary.

After closeout, treat bundles as immutable except for status fields in
`summary.json`.

Keep bundle subfolders under `.agents/sessions/` gitignored. This repo tracks
only `.agents/sessions/README.md` for human-facing guidance.

Use one session folder per task-closeout bundle and name folders with a sortable
pattern such as `YYYYMMDD-HHMMSS-short-topic`.

## Logging Policy

Each successful distillation or knowledge-lint cleanup should append a concise
entry to `.agents/docs/log.md`.

## Lint Policy

Periodically review `.agents/` for:

- duplication
- contradictions
- stale entries
- oversized high-level guidance
- missing index coverage
- misplaced content
