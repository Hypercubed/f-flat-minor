# Spec Delta

## MODIFIED Requirements

### Requirement: Pure parser and emitter in generate.py
The system SHALL restrict `lean-proof/generate.py` to parsing `@effect` annotations and definitions, discovering quotation-literal / statement-shape parameters, and emitting `Spec` / `SpecErr` / `SpecExit` Lean declarations proved by `fbm_verify`, with no `_sim_runq*` symbolic simulators or legacy `run` proof emitters remaining.

#### Scenario: Regression check on existing @effect suites
- **WHEN** `chomp test:lean` is run across `ff/__tests__/primitives.test.ffp` and `ff/lib/core/core.ff`
- **THEN** all existing `@effect` theorems pass using the compositional prover

#### Scenario: Unified Spec emission across all 79 theorems
- **WHEN** `chomp test:lean` is run across `ff/__tests__/primitives.test.ffp` and `ff/lib/core/core.ff`
- **THEN** all 34 primitive theorems and all 45 core theorems emit through the `Spec` / `SpecErr` / `SpecExit` + `fbm_verify` pipeline and pass

#### Scenario: No legacy simulation or fallback emitters in generate.py
- **WHEN** `lean-proof/generate.py` is inspected after cleanup
- **THEN** `_sim_runq*` and the legacy `run`-based `_emit_exit` / `_emit_rand` / `_emit_clock` / `_emit_getc` / `_emit_error` / `_emit_where` / `_emit_normal` functions are removed
