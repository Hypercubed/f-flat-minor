# Design

## Context

See `proposal.md`. `generate.py::EmitCtx.prepare()` (~line 5130) is the dispatch: rec-reaching words → `_prepare_recursive`; `eval`/`?`/`cons` → `prepare_quot`; quotation-token sets → six `_prepare_runq_*` variants (cond, multi, direct, between, compose, computed-flag); `where` → existential form; else straight-line. Each path builds a different theorem statement *and* bakes in a different proof strategy (dep lists from Python's call-graph walk, fuel choices, case-split shapes). `fbm_verify` then executes the pre-chosen strategy.

## Goals / Non-Goals

**Goals:**
- One emission path: parse → `Prog` → `fbm_effect` → `by fbm_verify`. No deps, no routing.
- Tactic resolves callees (already does: dep lists are accepted-but-unused since the whnf change), splits, backtracks, or fails clean naming the gap.
- Monotonic deletion: each `_prepare_*` path deleted when its tactic equivalent lands with the words that need it as tests; parsed-equal TAP gate at every step.

**Non-Goals:**
- Full tactic repertoire up front (explicit non-gate; repertoire grows inside Lean).
- Changing statement synthesis (belongs to `lean-effect-macro`, the gate).
- Changing `check.py` attribution (doc-comment based, routing-agnostic).

## Decisions

- **Gate after `lean-effect-macro`, not after full repertoire**: the macro absorbs statement-shape logic (a); this change absorbs proof-strategy routing (b). (b) degrades gracefully — uncovered shapes fail clean in Lean — so it needs only clean-failure behavior, not full coverage.
- **Delete, don't move**: the `_prepare_*` methods encode proof strategy in Python; moving them preserves the seam. Their knowledge transfers as tactic capability (seq-split landed this way: hand-proof → tactic feature), then the Python is deleted.
- **Suggested deletion order** (easiest tactic-equivalent first): straight-line (already uniform) → cond/direct (branch backtracking landed) → recursive (seq-split + induction landed for N-1) → compose/computed-flag/between (composer `ensures` still open — these delete last) → `where`-existential (statement shape, likely moves to macro).
- **No dep lists**: the tactic already ignores them (whnf + `refine` unification); deletion only removes the Python that computes them. The topological `Prog`-emission order stays (Lean needs defs before use).

## Risks / Trade-offs

- **Risk**: deleting a path before its tactic equivalent lands turns green theorems red. → **Mitigation**: parsed-equal TAP gate at every deletion step; each deletion paired with the tactic feature + words-as-tests in the same edit.
- **Risk**: tactic-resolved callee search loops or explodes on deeply-nested conditionals. → **Mitigation**: existing depth caps (`splitDepth` 3) and atomic rollback already bound exploration; clean failure beyond caps is the specified behavior.
- **Risk**: `fbm_effect` elaborator (gate dependency) slips, blocking this change. → **Mitigation**: no shared code — this change only consumes the elaborator's output shape; spec and design stand alone.
