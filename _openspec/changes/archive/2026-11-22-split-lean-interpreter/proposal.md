# Proposal

## Why

The F♭m interpreter (`Tok`, `step`, `exec`, `execQ`, `run`, `runQ`, and arithmetic/bitwise helpers) is currently embedded inside `lean-proof/preamble.lean` alongside proof lemmas (`execQ_ok_mono`, `execQ_append`), and `generate.py` prepends the entire file as raw text before piping to `lean --stdin`. Separating the interpreter into its own Lean module in a Lake package lets the interpreter be imported and executed independently of the prover, establishes a clean trusted-computing-base boundary before refactoring the prover, and eliminates redundant re-typechecking of the preamble on every `check.py` run.

## What Changes

- Split `lean-proof/preamble.lean` along its natural boundary into two Lean 4 modules under a Lake package in `lean-proof/`:
  - `Fbm/Interp.lean`: pure F♭m semantic model and interpreter (`Tok`, `Stack`, `In`, `Oracle`, `IOAction`, `Outcome`, bitwise/truncating helpers, `step`, `exec`, `run`, `Defs`, `lookup`, `execQ`, `runQ`), with zero proof dependencies.
  - `Fbm/Prover.lean`: imports `Fbm.Interp` and holds proof-only lemmas (`execQ_ok_mono`, `execQ_append`).
- Add `lean-proof/lakefile.toml` (core Lean 4 only, no Mathlib) and `lean-proof/lean-toolchain` (matching the installed Lean 4.36.0) so `Fbm.Interp` and `Fbm.Prover` compile to cached `.olean` files via `lake build`.
- Add a minimal `Fbm/Main.lean` executable entrypoint (or `#eval` / CLI runner target) that imports only `Fbm.Interp`, demonstrating standalone interpreter use without pulling in `Fbm.Prover`.
- Update `lean-proof/generate.py` and `lean-proof/check.py` so generated Lean files `import Fbm.Prover` and run via `lake env lean` instead of string-concatenating `preamble.lean`.
- Update `lean-proof/chompfile.toml` to ensure `lake build` runs before `check.py`.

## Capabilities

### New Capabilities
- `lean-interpreter`: Standalone Lean 4 F♭m interpreter module (`Fbm.Interp`) and Lake package layout, usable independently of the effect prover via `import Fbm.Interp` or a standalone executable target.

### Modified Capabilities

## Impact

- `lean-proof/preamble.lean` (replaced/split into `Fbm/Interp.lean` and `Fbm/Prover.lean`)
- `lean-proof/lakefile.toml`, `lean-proof/lean-toolchain`, `lean-proof/Fbm/Main.lean` (new)
- `lean-proof/generate.py`, `lean-proof/check.py`, `lean-proof/chompfile.toml` (updated to `import Fbm.Prover` and invoke `lake env lean`)
- Existing `@effect` test suites (`ff/__tests__/primitives.test.ffp`, `ff/lib/core/core.ff`) continue to pass with unchanged `@effect` syntax and theorem semantics.
