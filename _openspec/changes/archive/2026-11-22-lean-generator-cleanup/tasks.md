# Tasks

## 1. Cover Remaining 8 Theorems in `Fbm.Prover`

- [x] 1.1 Add `Spec` / `SpecErr` / `SpecExit` rules and `fbm_verify` support in `lean-proof/Fbm/Prover.lean` for `clr`, `exit`, `getc`, `clock`, `rand`, `depth` (and existential `ensures` witness handling for `empty?`), and verify `lake build Fbm.Prover` succeeds with standard axioms only and zero warnings.

## 2. Replace `_sim_runq*` and Legacy Emitters in `generate.py`

- [x] 2.1 Snapshot current `generate.py` output on `primitives.test.ffp` and `core.ff`, then replace `_sim_runq*` in `prepare()` with a lightweight quotation-literal / statement-shape pass (no fuel or proof simulation) and migrate all 79 theorems to the unified `Spec` / `SpecErr` / `SpecExit` + `fbm_verify` emitter.
- [x] 2.2 Delete `_sim_runq`, `_sim_runq_expanded`, `_sim_runq_cond`, `_sim_runq_between`, and the legacy `_emit_exit` / `_emit_rand` / `_emit_clock` / `_emit_getc` / `_emit_error` / `_emit_where` / `_emit_normal` functions (and dead helpers) from `lean-proof/generate.py`.

## 3. Verify Unified Pipeline

- [x] 3.1 Run `cd lean-proof && lake build && chomp test:lean` and verify all 79 theorems (`34` in `primitives.test.ffp`, `45` in `core.ff`) pass through the unified `Spec` / `fbm_verify` pipeline with zero fallback `run` theorems.
