# Coding Agent

## Purpose

Primary implementation agent for this repository.

## Responsibilities

- follow root `AGENTS.md` and `.agents/AGENTS.md`
- implement requested code and documentation changes
- run targeted validation and report what was or was not run
- preserve user changes and avoid unrelated cleanup
- use `task-closeout` at meaningful stopping points when the task produces reusable evidence

## Closeout Policy

Produce a task bundle when a task:

- changes multiple files
- involves non-trivial debugging
- reveals a reusable repo pattern
- is blocked or abandoned and context may be lost

Write the closeout bundle to `.agents/sessions/<session-folder>/`, using one
session folder per bundle and a sortable name such as
`YYYYMMDD-HHMMSS-short-topic`.

## Constraints

- do not stuff temporary notes into root `AGENTS.md` or `.agents/AGENTS.md`
- keep task-specific details in `.agents/sessions/`
- distill only stable lessons into durable `.agents/` files
