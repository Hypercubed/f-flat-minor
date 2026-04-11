---
name: knowledge-lint
description: Check the `.agents/` knowledge layer for duplication, contradiction, staleness, oversized guidance, missing links, and uncategorized knowledge. Use as a periodic maintenance pass.
---

# Knowledge Lint

## Goal

Keep the compiled repo knowledge layer coherent, minimal, and current.

## Inputs

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

## Checks

- duplicate guidance
- contradictions
- stale or superseded rules
- oversized high-level guidance
- missing index coverage
- troubleshooting entries that should be decisions or playbooks
- decisions that should be compressed into AGENTS guidance
- skills that duplicate rules or playbooks instead of referencing them

## Output

Produce:

- a lint report
- optional minimal edits
- a log entry in `.agents/docs/log.md` when edits are made

## Constraints

- Prefer reclassification and compression over adding more text.
- Do not modify source code.
- Do not delete knowledge without explicit justification.
