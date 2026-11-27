# Proposal

## Why

Two completed changes converge on the same missing capability from opposite sides. The callee-lemmas change scoped it out ("`divrem`'s compose-path `ensures`... new proof machinery, not composition"). The induction-generalization `__tail_loop` park diagnosed it precisely: the induction skeleton is ready (explicit measure, arm-filtered deps, base arm green), but the recursive arm crosses 3-level-nested `dip` quotations the composer cannot carry `ensures` through — `_prepare_runq_compose` refuses any `where`/`ensures` outright ("a runQ compose effect takes no where clause yet"). This blocks `__tail_loop` → `__parts` → `_atan__core_scaled` → the `npi`/atan/log/`nexp` wrapper chains: the highest-yield unlock in the library.

## What Changes

- Teach the runQ composer (`_prepare_runq_compose` + `_emit_spec_compose` in `generate.py`, plus `fbm_verify`'s `execQ_append` application path) to carry `ensures` witnesses through eval boundaries: each quotation slot's output binds its `where`-equation witnesses, threaded through the nested `execQ_append` composition instead of refused.
- Acceptance: `__tail_loop` (atan core) proves via its explicit-measure clause with an `ensures` on the queued state; `__parts` lifts as follow-up (not in-gate).
- Extends the existing two-eval composer; three-or-more evals stay a clean problem; `dip`-nested quotations (the `__tail_loop` shape) are the target, not arbitrary nesting.

## Capabilities

### Modified Capabilities
- `lean-effect-prover`: `ensures`/`where` support on the runQ compose path (eval-boundary witness threading).

## Impact

- `lean-proof/generate.py` (`_prepare_runq_compose`, `_emit_spec_compose`: witness threading, replacing the `where` refusal).
- `lean-proof/Fbm/Prover.lean` (composer-side `execQ_append` application carrying existential witnesses — as needed; straight-line `Spec.seq` splitting already lands there).
- `ff/lib/math/atan-core.ffp` (`__tail_loop` effect with `ensures`; model lemmas already in-file and green).
- `lean-proof/HELP.md` (compose-path `ensures` docs).
- Follow-ups (not in this change): `__parts`, `_atan__core_scaled`, wrapper chains; atanh core (explicitly after atan core lands — same rule as induction-generalization 2.1).
