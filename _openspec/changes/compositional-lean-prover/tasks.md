# Tasks

## 1. Compositional Spec Layer in Fbm.Prover

- [ ] 1.1 Define `Spec` (and `SpecErr` for `Outcome.err`) in `lean-proof/Fbm/Prover.lean` over `Fbm.Interp.execQ`, hiding explicit fuel and quantifying over frame stack, queue, input, oracle, and `defs`, and verify `lake build Fbm.Prover` compiles.
- [ ] 1.2 Prove the core structural lemmas in `lean-proof/Fbm/Prover.lean` (`Spec.seq` via `execQ_append`, `Spec.frame`, `Spec.eval`, `Spec.cond`, `Spec.cons`, and `Spec.call`), and verify `lake build Fbm.Prover` compiles with only standard Lean axioms.

## 2. Lean Verification Tactic

- [ ] 2.1 Implement the `fbm_verify` tactic in `lean-proof/Fbm/Prover.lean` to peel primitive steps, apply dependency `Spec` lemmas, case-split on `?` (`cond`) flags, and discharge `eval` via quotation-slot hypotheses, and verify with unit test theorems in `Fbm.Prover` covering `slip`, `dip`, `branch`, `bi2`, `between?`, `or_else`, and `and_also`.

## 3. Simplify generate.py and Verify Suites

- [ ] 3.1 Update `lean-proof/generate.py` to emit `Prog` definitions (preserving calls to annotated words) and uniform `by fbm_verify [...]` theorem proofs, removing the `_sim_runq*` / `_emit_runq*` Python symbolic simulators, and verify `python3 generate.py ../ff/lib/core/core.ff` emits clean Lean.
- [ ] 3.2 Run `cd lean-proof && chomp test:lean` and verify all `@effect` theorems in `ff/__tests__/primitives.test.ffp` and `ff/lib/core/core.ff` pass, and update `lean-proof/HELP.md` / `lean-proof/README.md` to document `fbm_verify` and `@rec-effect` boundaries.
