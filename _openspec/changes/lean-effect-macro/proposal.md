# Proposal

## Why

Even after removing `_sim_runq*` in `lean-generator-cleanup`, `lean-proof/generate.py` still constructs verbose Lean `Spec` / `SpecErr` theorem signatures, binder lists, quotation-lookup hypotheses, and `fun st qu _ _ acts d => ...` predicates by Python string interpolation. Moving theorem construction into a Lean 4 macro (`fbm_effect`) lets `generate.py` emit concise, F♭m-readable declarations and shrinks Python to a thin `.ff` parser and `Prog` / macro emitter.

## What Changes

- Add `lean-proof/Fbm/EffectMacro.lean` (imported by `Fbm.Prover`, or defined inside `Fbm.Prover`) providing an `fbm_effect` Lean 4 macro / elaborator that expands concise stack-effect declarations (inputs, outputs, optional `requires` / `ensures` / `error` / IO / quotation slots, and dependency list) into full `Spec` / `SpecErr` / `SpecExit` theorems proved by `fbm_verify`.
- Support direct use of `fbm_effect` in handwritten `.lean` files as well as emitted `.lean` output from `generate.py`.
- Simplify `lean-proof/generate.py` (following `lean-generator-cleanup`) so `.ff` / `.ffp` parsing emits `def ...Prog` and `fbm_effect ...` declarations instead of building `Spec` theorem strings in Python.

## Capabilities

### New Capabilities

### Modified Capabilities
- `lean-effect-prover`: Move `Spec` theorem-signature synthesis from Python string interpolation into a Lean 4 `fbm_effect` macro/elaborator in `Fbm.Prover`, reducing `generate.py` to a thin `.ff` parser and `Prog` / `fbm_effect` emitter.

## Impact

- Depends on `lean-generator-cleanup` (single-path `generate.py` without `_sim_runq*`).
- `lean-proof/Fbm/EffectMacro.lean` (or `Fbm/Prover.lean`) and `lean-proof/Fbm.lean`
- `lean-proof/generate.py` (replaces Python `Spec` theorem-string builders with `fbm_effect` emissions)
- `lean-proof/README.md` / `lean-proof/HELP.md` (documents `fbm_effect` macro syntax)
- `ff/__tests__/primitives.test.ffp` and `ff/lib/core/core.ff` (all theorems continue to pass under `chomp test:lean`)
