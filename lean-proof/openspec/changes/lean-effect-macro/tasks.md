# Tasks

## 1. `fbm_effect` Macro / Elaborator in Lean

- [ ] 1.1 Create `lean-proof/Fbm/EffectMacro.lean` (exported via `Fbm.Prover` / `Fbm.lean`) implementing `fbm_effect` as a Lean 4 command elaborator supporting bottom-to-top stack inputs/outputs, `..R`, `requires`/`ensures`, `error`, IO actions, quotation slots, the `@by-proof` / `@by-induction` / `@by-axiom` clause family (third-clause spelling per the assumed-effects rename decision — do not bake in `@assume` if the rename lands first), `@lean`-block scope (verbatim helpers and `open scoped Fbm` notation emitted ahead of theorems must be visible to expansion; see `LEAN_HEADER`), and verify with unit declarations in `lake build`. No dependency-list parameter: the tactic resolves callees itself (whnf + `refine`; precedent: `nck` proves with plain `fbm_verify`), so the elaborator takes no deps.

## 2. Thin `generate.py` Emitter

- [ ] 2.1 Update `lean-proof/generate.py` to emit `fbm_effect` declarations instead of constructing `Spec` / `SpecErr` / `SpecExit` theorem strings in Python, and remove the now-redundant Python theorem-string builders. Emission becomes program + statement + `by fbm_verify` (no dep lists — see 1.1).
- [ ] 2.2 Verify `check.py` TAP theorem counting/naming works unchanged on `fbm_effect` output, and run `cd lean-proof && lake build && chomp test:lean` to confirm all theorems in `primitives.test.ffp` and `core.ff` pass.
- [ ] 2.3 Document `fbm_effect` macro syntax in `lean-proof/README.md` and `lean-proof/HELP.md`.
