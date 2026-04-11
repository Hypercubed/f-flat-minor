# Knowledge Maintenance Log

### 2026-04-11 session-batch-distillation
Outcome: updated
Files: `.agents/docs/repo-decisions.md`; `.agents/docs/troubleshooting.md`; `.agents/playbooks/test-and-dev-workflows.md`
Accepted: TypeScript runtime stdlib root discovery should search multiple stable anchors; compiled Bun `/ff/lib` import failures have a documented workaround; optimizer peepholes need IR, runtime, and negative/nonconstant validation coverage
Rejected: one-off task-closeout sandbox failures; duplicated optimizer reference and Codetta score guidance already captured in the test playbook; low-signal per-task implementation history
Notes: distilled six ready session bundles from `.agents/sessions/` dated 2026-04-11.

### 2026-04-11 compiler-reference-doc-workflow
Outcome: updated
Files: `.agents/playbooks/test-and-dev-workflows.md`
Accepted: compiler and optimizer behavior changes require checking and updating `_docs/reference/optimized-compiler.md`
Rejected: none
Notes: keeps the optimized compiler reference synchronized with implementation changes.

### 2026-04-11 optimizer-codetta-score-workflow
Outcome: updated
Files: `.agents/playbooks/test-and-dev-workflows.md`
Accepted: optimizer changes require recalculating Codetta optimized compiled-byte scores and verifying README byte frontmatter with `ff/codetta/score_codetta.py`
Rejected: none
Notes: this preserves Codetta leaderboard values after optimizer peephole changes.

### 2026-04-11 knowledge-layer-adoption
Outcome: updated
Files: `AGENTS.md`; `.gitignore`; `.agents/AGENTS.md`; `.agents/.gitignore`; `.agents/agents/`; `.agents/docs/`; `.agents/playbooks/README.md`; `.agents/sessions/README.md`; `.agents/skills/task-closeout/`; `.agents/skills/learning-distill/`; `.agents/skills/knowledge-lint/`
Accepted: adopted Agent-Knowledge-Starter-Kit scaffold concepts and merged them into the existing F-flat-minor `.agents` tree
Rejected: direct scaffold overwrite of existing `.agents/rules`, `.agents/playbooks`, and `.agents/skills`
Notes: existing F-flat-minor-specific rules, playbooks, and skills remain authoritative for repo behavior.
