---
name: task-closeout
description: Capture the current task into a structured temporary session bundle under `.agents/sessions/` so a learning agent can later distill durable repo knowledge. Use for completed, blocked, or abandoned tasks with meaningful changes, debugging, validation, or reusable lessons.
---

# Task Closeout

## Goal

Create a temporary handoff packet for later learning extraction.

## Skill initialization (before first closeout)

Run this once per target repo after the skill files are present under `.agents/skills/task-closeout/` (for example after copying only that skill folder or after an `npx`/package install drops it there). Idempotent: safe to repeat.

1. Resolve the repo root (the directory that contains `.git/` in normal layouts).

2. Ensure `.agents/sessions/` exists.

3. If `.agents/sessions/README.md` is missing, create it from `bootstrap/sessions/README.md` in this skill folder.

4. Ensure `.agents/.gitignore` exists. If it is missing, create it with exactly:

   ```gitignore
   sessions/*
   !sessions/README.md
   ```

   If `.agents/.gitignore` already exists, merge these two lines if they are absent; do not remove unrelated ignore rules.

5. If the repo does not track `.agents/.gitignore` and the user relies on the repo root `.gitignore`, ensure equivalent patterns exist there: `.agents/sessions/*` and `!.agents/sessions/README.md`.

Do not create durable knowledge files (`AGENTS.md`, `docs/`, `playbooks/`) as part of this skill; those are owned by `learning-distill` initialization or a full kit merge.

## Output location

Write inside the repo to `.agents/sessions/<session-folder>/`.

The session folder name is a sortable storage label. The canonical task/session identifier is the `task_id` field inside the bundle's `summary.json`.

## Required outputs

- summary.json
- active-task.md
- learning-candidate.md
- changed-files.txt
- validation.txt

## Example bundle

Filled-in reference files live under `.agents/skills/task-closeout/example/task-bundle/` when this skill is installed under `.agents/skills/task-closeout/`.

## Rules

- Record only observable facts in active-task.md.
- Record only candidate lessons in learning-candidate.md.
- Distinguish clearly between what failed, what worked, and what is only a hypothesis.
- Do not update `.agents/AGENTS.md` or any other durable repo knowledge file.
- Do not write narrative summaries longer than necessary.
- Prefer concise bullet lists.

## Procedure

1. Determine or create `repo_id`.
2. Determine or create `task_id`.
3. Create a session folder using the pattern `YYYYMMDD-HHMMSS-short-topic`.
4. Keep one task-closeout bundle per session folder.
5. Collect changed files.
6. Collect commands run and validation results.
7. Write active-task.md.
8. Write learning-candidate.md.
9. Write summary.json with status, metadata, `repo_id`, `task_id`, and optional agent identifiers when available.
10. Mark the session bundle ready for distillation.

## Optional agent metadata

Record agent provenance whenever the active tool can supply it. Record session provenance whenever the active tool can supply a stable session identifier.

- In `summary.json`, add `agent` when the active agent/tool identity is known.
- In `summary.json`, add `agent_session_id` when the active agent/tool exposes a stable session ID.
- In `active-task.md`, add an Agent section when the agent/tool identity is known.
- In `active-task.md`, add an Agent Session ID section when the active agent/tool exposes a stable session ID.
- Treat `agent` and `agent_session_id` independently: record either one when available; omit only the specific field/section that is unavailable.
- Do not invent session IDs or require manual lookup outside the agent/tool's supported session history.

## Session folder naming

- Use a deterministic, sortable folder name such as `YYYYMMDD-HHMMSS-short-topic`.
- Keep the slug short, lowercase, and tied to the task goal.
- Reuse the same session folder only for the single task-closeout bundle it was created for.
- Do not treat the folder name as the canonical task identity; use the `task_id` field in `summary.json`.

## active-task.md sections

- Task ID
- Agent (optional)
- Agent Session ID (optional)
- Goal
- Outcome
- Files Changed
- Commands Run
- Validation
- Remaining Work
- Notes

## learning-candidate.md sections

- Task
- What failed
- What worked
- Reusable pattern
- Candidate `.agents/AGENTS.md` update
- Candidate troubleshooting note
- Candidate repo decision
- Candidate playbook
- Confidence
