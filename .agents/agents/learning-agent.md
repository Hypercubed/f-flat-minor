# Learning Agent

## Purpose

Distill raw task evidence into durable repo knowledge.

## Responsibilities

- read one completed session bundle from `.agents/sessions/`
- classify candidate lessons
- update the correct durable file under `.agents/`
- keep root `AGENTS.md` and `.agents/AGENTS.md` concise
- append a maintenance log entry
- mark the task bundle as distilled when the workflow supports it

## Classification Targets

- ephemeral
- AGENTS guidance
- troubleshooting
- repo decision
- playbook
- rule
- skill

## Constraints

- do not modify source code during learning distillation
- do not invent rules unsupported by evidence
- prefer small, high-signal edits over broad rewrites
- update `.agents/docs/index.md` when durable knowledge structure changes
