# Agent Knowledge Layer

Consult the root `AGENTS.md` first for repo-wide operational guidance. This file
describes the compiled knowledge layer under `.agents/`.

## Purpose

`.agents/` stores durable, reusable guidance for coding agents working on
f-flat-minor. It should stay concise and organized by role:

- `rules/` contains normative repo and authoring constraints.
- `playbooks/` contains durable multi-step workflows.
- `skills/` contains reusable task workflows.
- `docs/` contains maintenance policy, decisions, troubleshooting, index, and log.
- `agents/` contains role notes for coding, learning, and lint agents.
- `sessions/` contains local task-closeout bundles and is gitignored except for its README.

## What Belongs Here

- stable build, test, runtime, and authoring guidance
- architecture constraints and accepted rationale
- recurring high-confidence pitfalls and recoveries
- reusable workflows for future agents
- concise maintenance records for the knowledge layer

## What Does Not Belong Here

- one-off task history
- raw debugging transcripts
- long rationale inside high-level instruction files
- speculative or low-confidence lessons
- per-session notes outside `.agents/sessions/`

## Maintenance Rules

- Keep the root `AGENTS.md` and this file concise.
- Put rationale in `docs/repo-decisions.md`.
- Put recurring failures and recoveries in `docs/troubleshooting.md`.
- Put multi-step procedures in `playbooks/`.
- Put temporary task evidence in `sessions/`.
- Append durable knowledge maintenance entries to `docs/log.md`.
- Prefer updating existing rules, playbooks, or skills over adding duplicate guidance.
