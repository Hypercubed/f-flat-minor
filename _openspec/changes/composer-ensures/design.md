# Design

## Context

`_prepare_runq_compose` (generate.py:3859): splits the program at each of two evals, each body becoming a `p1` in an `execQ_append` application, remainder as `p2`, nested. Body hypotheses are universally quantified over leftover input/oracle. Currently gates `where_text is not None → problem`. The induction-generalization park showed the rest works: explicit-measure motive, `ih_call`, base arm all close; only the witness-carrying recursive arm fails (composer doom-loop: `iteration limit, 13 goals`, unassigned `S`/`defs'` midpoint metas — the midpoints existentially bound by `ensures` have nowhere to go through `execQ_append`).

## Goals / Non-Goals

**Goals:** `ensures` witnesses bound per eval slot, threaded through the nested append; `__tail_loop` green via clause; parsed-equal TAP throughout.
**Non-Goals:** 3+-eval composer; arbitrary nesting (target is the `dip`-nested two-eval shape); statement-shape changes; `__parts`/wrappers (follow-ups).

## Decisions

- **Witnesses as slot-scoped existentials**: each quotation slot's `where`-equations become existentials bound at that slot's `p1`/`p2` boundary (same equational witness mechanism as straight-line `where`, but scoped per eval instead of per theorem). The nested append composes them outward; the outer theorem's `ensures` is the conjunction the final post already states.
- **Reuse the induction skeleton's explicit measure**: `__tail_loop` already has a working explicit-measure motive + base arm (landed, in-file). This change supplies only the missing recursive-arm crossing — no induction work.
- **Acceptance order**: `__tail_loop` (atan core) → atanh core explicitly after (same rule as before) → `__parts` as follow-up change, not here.
- **Transplant pattern again**: hand-write the witness threading for `__tail_loop`'s shape first (in `/tmp` probes), then generalize to the two-eval path. Same playbook as seq-split and countdown.

## Risks / Trade-offs

- **Risk**: midpoint metas (`S`, `defs'`) unassignable through nested appends — the observed doom-loop. → **Mitigation**: slot-scoped existentials pin each midpoint at its own boundary (the doom-loop came from unscoped midpoints with nowhere to unify); atomic rollback per split already bounds exploration.
- **Risk**: `dip`-nested bodies need deeper surgery than two-level append nesting. → **Mitigation**: probe-first (hand-write for `__tail_loop`'s exact shape); if the shape needs more than witness threading + existing append nesting, park with the precise missing lemma named.
