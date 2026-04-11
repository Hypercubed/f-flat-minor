---
name: learning-distill
description: Read a completed temporary session bundle from `.agents/sessions/` and distill durable repo knowledge into `.agents/` files. Use only after task-closeout has produced a bundle and when the goal is to separate stable guidance from temporary task notes.
---

# Learning Distill

## Goal

Convert raw task evidence into concise, durable repo knowledge.

## Inputs

- session bundle directory under `.agents/sessions/`
- root `AGENTS.md`
- `.agents/AGENTS.md`
- `.agents/docs/MAINTENANCE.md`
- `.agents/docs/index.md`
- `.agents/docs/log.md`
- `.agents/docs/repo-decisions.md`
- `.agents/docs/troubleshooting.md`
- `.agents/rules/`
- `.agents/playbooks/`
- `.agents/skills/`

## Classification Categories

Classify each candidate lesson as one of:

- ephemeral
- AGENTS guidance
- troubleshooting
- repo decision
- rule
- playbook
- skill

## Distillation Rules

- Preserve only stable, reusable knowledge.
- Do not copy task history into root `AGENTS.md` or `.agents/AGENTS.md`.
- Use `.agents/docs/repo-decisions.md` for rationale and nuance.
- Use `.agents/docs/troubleshooting.md` for recurring failures and fixes.
- Use `.agents/playbooks/` for durable multi-step procedures.
- Use `.agents/rules/` for normative constraints.
- Use `.agents/skills/` for reusable agent workflows.
- Add to high-level AGENTS files only if the lesson is broad, stable, concise, and actionable.
- Reject low-confidence or one-off lessons.

## Procedure

1. Read the session bundle.
2. Compare candidates against the existing `.agents/` files and root `AGENTS.md`.
3. Remove duplication.
4. Classify each lesson.
5. Draft minimal updates to the appropriate file or files.
6. Update `.agents/docs/index.md` if durable knowledge structure changed.
7. Append a concise entry to `.agents/docs/log.md`.
8. Mark the session bundle as distilled when possible.

## Constraints

- Do not modify source code.
- Do not invent new repo rules unsupported by task evidence.
- Do not expand high-level AGENTS files with rationale or narrative.
- Prefer small edits over large rewrites.

## AGENTS Criteria

A lesson belongs in root `AGENTS.md` or `.agents/AGENTS.md` only if it is:

- high confidence
- broadly useful in this repo
- likely to recur
- concise
- actionable
