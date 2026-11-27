# lean-interpreter Specification

## Purpose

Provides a standalone Lean 4 F♭m semantic interpreter module (`Fbm.Interp`) and Lake package so the F♭m execution model can be imported, built, and run independently of the effect prover.

## Requirements

### Requirement: Standalone interpreter module without prover dependencies
The system SHALL expose the pure F♭m interpreter (`Tok`, `Stack`, `In`, `Oracle`, `IOAction`, `Outcome`, integer/bitwise helpers, `step`, `exec`, `run`, `Defs`, `lookup`, `execQ`, and `runQ`) in `Fbm.Interp` with no dependency on prover lemmas or tactics.

#### Scenario: Importing Fbm.Interp alone
- **WHEN** a Lean 4 file imports `Fbm.Interp`
- **THEN** it compiles and can evaluate `run` and `runQ` without importing `Fbm.Prover` or any proof lemmas

### Requirement: Lake package build for interpreter and prover
The system SHALL provide a `lakefile.toml` (core Lean 4 only, no Mathlib) in `lean-proof/` that builds `Fbm.Interp` and `Fbm.Prover` as cached `.olean` modules.

#### Scenario: Building the Lake package
- **WHEN** `lake build` is run in `lean-proof/`
- **THEN** both `Fbm.Interp` and `Fbm.Prover` compile cleanly with zero errors and no Mathlib dependency

### Requirement: Standalone interpreter executable entrypoint
The system SHALL provide an executable target in `lean-proof/` that depends only on `Fbm.Interp` so the Lean F♭m interpreter can be invoked separately from the prover.

#### Scenario: Running the standalone interpreter target
- **WHEN** the standalone interpreter executable is built and run on a sample F♭m token sequence
- **THEN** it executes the program using `Fbm.Interp` and reports the resulting `Outcome` without invoking `Fbm.Prover`

### Requirement: Prover module imports interpreter and preserves existing checks
The system SHALL place proof infrastructure in `Fbm.Prover` (importing `Fbm.Interp`), and `generate.py` / `check.py` SHALL emit `import Fbm.Prover` and invoke Lean via the Lake environment rather than concatenating `preamble.lean`.

#### Scenario: Existing @effect suites pass after module split
- **WHEN** `chomp test:lean` is run in `lean-proof/` after the split
- **THEN** all existing `@effect` theorems in `ff/__tests__/primitives.test.ffp` and `ff/lib/core/core.ff` pass
