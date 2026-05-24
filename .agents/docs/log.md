# Knowledge Maintenance Log

### 2026-05-23 cpp-bytecode-final
Outcome: updated
Files: `.agents/docs/troubleshooting/repo-tool-resolution.md`; `.agents/playbooks/test-and-dev-workflows.md`
Accepted: troubleshooting guide for `mise exec` hanging in offline/sandboxed/network-restricted environments with `MISE_OFFLINE=1` resolution; updated test-and-dev playbook environment notes.
Rejected: none
Notes: task_id `t-20260523-230300-cpp-bytecode-final` distilled from `.agents/sessions/20260523-230300-cpp-bytecode-final/`.

### 2026-05-24 optimize-go-queue
Outcome: updated
Files: `.agents/docs/decisions/go-vm-instruction-queue-optimization.md`; `.agents/docs/decisions/index.md`
Accepted: documented decision to optimize the Go VM instruction queue using a custom circular ring buffer deque (`FastQueue`) and related zero-allocation VM loop micro-optimizations.
Rejected: none
Notes: task_id `t-20260524-010100-optimize-go-queue` distilled from `.agents/sessions/20260524-010100-optimize-go-queue/`.

### 2026-05-23 session-batch-distillation
Outcome: updated
Files: `AGENTS.md`; `.agents/rules/repo-runtime-invariants.md`; `.agents/docs/plans/typescript-optimizer-peephole-candidates.md`; `.agents/docs/decisions/cli-compilation-execution-routing.md`; `.agents/docs/troubleshooting/strength-reduction-sign-sensitivity.md`; `.agents/docs/troubleshooting/racket-compiler-stdin-unsupported.md`; `.agents/docs/troubleshooting/cli-runner-format-mismatch.md`
Accepted: unified CLI routing of compiler and executor commands in the shell directory; decision documented to unify low-level compiler routing under shell wrappers; troubleshooting note for Racket compiler's lack of native stdin support with tempfile fallback; separate interpret vs execute CLI format constraints documented; sign-safety constraints on division/modulo optimizations documented.
Rejected: none
Notes: distilled three ready session bundles (`multi-compiler-compile`, `unify-runners`, and `euler14-optimization-fix`) from `.agents/sessions/`.

### 2026-05-11 runchunk-fast-path
Outcome: updated
Files: `.agents/AGENTS.md`; `.agents/docs/decisions/runchunk-fast-path.md`; `.agents/docs/troubleshooting/benchmark-profiling-stuck-processes.md`
Accepted: reminder added to avoid `browser_subagent` for local filesystem workflows; decision documented to maintain separate fast/instrumented runChunk paths; troubleshooting note added for stray benchmark processes skewing performance results.
Rejected: none
Notes: task_id `runchunk-fast-path` from session closeout.

### 2026-04-22 distill-20260422-173841-agents-knowledge-layer
Outcome: updated
Files: `.agents/docs/troubleshooting/git-restore-agents-role-files.md`; `.agents/docs/troubleshooting/index.md` (via docs-compile); `.agents/skills/docs-search/docs-search-index.json`
Accepted: durable troubleshooting entry for losing uncommitted `.agents/agents/` edits after `git checkout` restore; session bundle marked distilled
Rejected: optional knowledge-lint helper script (stay one-off until maintainer asks); duplicate bullets in `MAINTENANCE.md` when troubleshooting entry suffices
Notes: task_id `20260422-173841-agents-knowledge-layer` from session closeout; evidence in `learning-candidate.md` / `active-task.md`.

### 2026-04-22 agents-docs-per-entry-migration
Outcome: updated
Files: `.agents/docs/MAINTENANCE.md`; `.agents/docs/index.md`; `.agents/AGENTS.md`; `.agents/docs/decisions/*`; `.agents/docs/troubleshooting/*`; removed `.agents/docs/repo-decisions.md` and `.agents/docs/troubleshooting.md`
Accepted: durable decisions and troubleshooting moved to per-entry markdown with YAML frontmatter under `docs/decisions/` and `docs/troubleshooting/` per updated knowledge-lint and learning-distill skills
Rejected: none
Notes: structural migration only; substantive text preserved from the prior monolithic files.

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
