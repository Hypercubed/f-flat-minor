# Proposal

## Why

After `compositional-lean-prover`, `lean-proof/generate.py` grew from 4,981 to 5,221 lines because it still operates as a hybrid: `_sim_runq*` was kept for `prepare()`'s theorem-statement shape inference, and 8 theorems (`empty?` in `core.ff` plus `getc`, `clock`, `rand`, `clr`, `exit`, and `SpecErr` / `where` fallbacks in `primitives.test.ffp`) still emit legacy `run`-based proofs instead of `Spec` / `fbm_verify`. Removing the legacy path and `_sim_runq*` now leaves a single, clean parser/emitter before `complete-core-ff-effects` adds new features on top of `generate.py`.

## What Changes

- Extend `lean-proof/Fbm/Prover.lean` (`Spec` / `SpecErr` / `SpecExit` and `fbm_verify`) so the remaining 8 theorems (`empty?`, `getc`, `clock`, `rand`, `clr`, `exit`, and guarded `requires ... else ERROR` cases) prove through the compositional `Spec` pipeline rather than legacy `run` fallbacks.
- Replace `_sim_runq`, `_sim_runq_expanded`, `_sim_runq_cond`, and `_sim_runq_between` in `lean-proof/generate.py` with a small statement-shape / quotation-literal discovery pass in `prepare()` (no fuel or proof simulation).
- Delete `_sim_runq*`, legacy `_emit_exit` / `_emit_rand` / `_emit_clock` / `_emit_getc` / `_emit_error` / `_emit_where` / `_emit_normal` fallbacks, and any dead helper functions in `lean-proof/generate.py` so 100% of `@effect` theorems emit via the unified `Spec` / `fbm_verify` path.

## Capabilities

### New Capabilities

### Modified Capabilities
- `lean-effect-prover`: Complete the migration of `lean-proof/generate.py` to a single `Spec` / `fbm_verify` emission path (79/79 theorems) and remove `_sim_runq*` and legacy `run` proof emitters.

## Impact

- `lean-proof/Fbm/Prover.lean` (adds `SpecExit` / `Spec` rules for `getc`, `clock`, `rand`, `clr`, `exit`, `depth`, and `ensures`-where witness handling in `fbm_verify`)
- `lean-proof/generate.py` (removes `_sim_runq*` and legacy `_emit_*` fallbacks; significantly shrinks file size)
- `ff/__tests__/primitives.test.ffp` and `ff/lib/core/core.ff` (all 79 theorems pass through the unified `Spec` / `fbm_verify` pipeline under `chomp test:lean`)
