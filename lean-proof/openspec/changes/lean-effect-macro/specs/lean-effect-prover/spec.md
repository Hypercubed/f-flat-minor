# Spec Delta

## ADDED Requirements

### Requirement: Lean 4 fbm_effect macro for Spec theorem synthesis
The system SHALL provide an `fbm_effect` Lean 4 macro/elaborator in `Fbm` that expands concise F♭m-oriented effect declarations (word program, stack inputs/outputs, optional `requires` / `ensures` / `error` / IO / quotation-slot parameters, and dependency list) into full `Spec` / `SpecErr` / `SpecExit` theorems proved by `fbm_verify` (or an explicit `@by-proof` override).

#### Scenario: Expanding a straight-line or conditional fbm_effect declaration
- **WHEN** a Lean file declares an `fbm_effect` for a word such as `rot` or `choose`
- **THEN** Lean expands it into the corresponding `Spec` theorem and discharges it with `fbm_verify`

#### Scenario: Thin generate.py emission via fbm_effect
- **WHEN** `generate.py` processes `ff/__tests__/primitives.test.ffp` and `ff/lib/core/core.ff`
- **THEN** it emits `Prog` definitions and `fbm_effect` declarations without constructing `Spec` lambda predicates by Python string interpolation, and `chomp test:lean` passes all theorems
