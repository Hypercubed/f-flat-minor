# Tasks

## 1. `fbm_effect` Macro / Elaborator in Lean

- [ ] 1.1 Create `lean-proof/Fbm/EffectMacro.lean` (exported via `Fbm.Prover` / `Fbm.lean`) implementing `fbm_effect` as a Lean 4 command elaborator supporting bottom-to-top stack inputs/outputs, `..R`, `requires`/`ensures`, `error`, IO actions, quotation slots, and `fbm_verify` dependency lists, and verify with unit declarations in `lake build`.

## 2. Thin `generate.py` Emitter

- [ ] 2.1 Update `lean-proof/generate.py` to emit `fbm_effect` declarations instead of constructing `Spec` / `SpecErr` / `SpecExit` theorem strings in Python, and remove the now-redundant Python theorem-string builders.
- [ ] 2.2 Verify `check.py` TAP theorem counting/naming works unchanged on `fbm_effect` output, and run `cd lean-proof && lake build && chomp test:lean` to confirm all theorems in `primitives.test.ffp` and `core.ff` pass.
- [ ] 2.3 Document `fbm_effect` macro syntax in `lean-proof/README.md` and `lean-proof/HELP.md`.
