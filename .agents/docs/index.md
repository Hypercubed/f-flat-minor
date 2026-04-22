# Knowledge Index

## Entry Points

- `AGENTS.md`: repo-wide operational guidance and navigation.
- `.agents/AGENTS.md`: concise knowledge-layer purpose and maintenance rules.
- `.agents/docs/MAINTENANCE.md`: schema and policy for maintaining `.agents/` (durable entry contracts, logging, lint hygiene).

## Rules

- `.agents/rules/repo-runtime-invariants.md`: stable runtime, test, import, and trace constraints.
- `.agents/rules/ff-lib-source-docs.md`: source documentation rules for `ff/lib/**/*.ff` and `ff/lib/**/*.ffp`.

## Playbooks

- `.agents/playbooks/README.md`: playbook directory purpose.
- `.agents/playbooks/run-code.md`: choose a runtime and run `.ff` or `.ffp` code.
- `.agents/playbooks/test-and-dev-workflows.md`: common test, lint, and service commands.

## Skills

- `.agents/skills/ff-code-authoring/SKILL.md`: general `.ff` and `.ffp` authoring.
- `.agents/skills/ff-euler-ffp/SKILL.md`: Project Euler `.ffp` work.
- `.agents/skills/ff-library-web-refactor/SKILL.md`: reusable library and web playground refactors.
- `.agents/skills/ff-math-internal-naming/SKILL.md`: math internal helper naming.
- `.agents/skills/ff-lib-word-rankings/SKILL.md`: regenerate library word definition rankings.
- `.agents/skills/ff-expand-reduce/SKILL.md`: expand, reduce, and resynthesize stack-heavy words.
- `.agents/skills/plans/SKILL.md`: maintainer plan lifecycle under `.agents/docs/plans/`.
- `.agents/skills/write-plan/SKILL.md`: scaffold new plans with valid CONTRACT frontmatter.
- `.agents/docs/plans/index.md`: active and archived initiative plans (write-plan contract).
- `.agents/skills/task-closeout/SKILL.md`: create local task-closeout bundles.
- `.agents/skills/learning-distill/SKILL.md`: distill session bundles into durable knowledge.
- `.agents/skills/knowledge-lint/SKILL.md`: check `.agents/` for duplication, contradictions, and stale guidance.

## Durable Docs

- `.agents/docs/decisions/`: one markdown file per accepted architectural or policy decision; [index](decisions/index.md).
- `.agents/docs/troubleshooting/`: one markdown file per recurring failure pattern; [index](troubleshooting/index.md).
- `.agents/docs/plans/`: maintainer initiatives; [active index](plans/index.md), [archive](plans/archive/index.md).
- `.agents/docs/log.md`: append-only knowledge maintenance log (see Logging policy in `MAINTENANCE.md`).

## Temporary Evidence

- `.agents/sessions/README.md`: explains local task-closeout bundle storage.
- `.agents/sessions/*`: local-only bundles, ignored by git.
