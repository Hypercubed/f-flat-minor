# Tasks

## 1. Lake Package and Module Split

- [x] 1.1 Create `lean-proof/lean-toolchain` (pinning `leanprover/lean4:v4.36.0`) and `lean-proof/lakefile.toml` with library target `Fbm` and executable target `fbm-interp`, and verify `lake env lean --version` succeeds in `lean-proof/`.
- [x] 1.2 Extract lines 1–274 of `lean-proof/preamble.lean` into `lean-proof/Fbm/Interp.lean` (pure interpreter types, helpers, `step`, `exec`, `run`, `Defs`, `lookup`, `execQ`, `runQ`), and verify `lake build Fbm.Interp` succeeds with zero proof/prover imports.
- [x] 1.3 Extract lines 275–449 of `lean-proof/preamble.lean` into `lean-proof/Fbm/Prover.lean` importing `Fbm.Interp`, remove `lean-proof/preamble.lean`, and verify `lake build Fbm.Prover` succeeds.

## 2. Standalone Interpreter Target

- [x] 2.1 Add `lean-proof/Fbm/Main.lean` importing only `Fbm.Interp` to execute a sample program and print its `Outcome`, and verify `lake build fbm-interp` and `lake exe fbm-interp` succeed.

## 3. Generator, Checker, and Chomp Integration

- [x] 3.1 Update `lean-proof/generate.py` to emit `import Fbm.Prover` instead of prepending `preamble.lean`, and verify generated output compiles under `lake env lean --stdin` in `lean-proof/`.
- [x] 3.2 Update `lean-proof/check.py` to resolve `lake` (with `~/.elan/bin/lake` fallback) and run `lake env lean --json` from `lean-proof/`, and verify `python3 check.py ../ff/__tests__/primitives.test.ffp` exits 0.
- [x] 3.3 Update `lean-proof/chompfile.toml` (dependencies and `lake build` step) and `lean-proof/README.md`, and verify `cd lean-proof && chomp test:lean` passes all theorems in `primitives.test.ffp` and `core.ff`.
