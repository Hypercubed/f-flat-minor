# Spec Delta

## ADDED Requirements

### Requirement: Name identity between effect calls and Lean defs
The system SHALL name Lean-side spec helpers exactly as effect spellings invoke them (`Fbm`-scoped where core clashes threaten), so the translator emits calls generically without per-function mapping branches.

#### Scenario: gcd passes through
- **WHEN** an effect writes `gcd(A,B)`
- **THEN** the generator emits `Fbm.gcd ...` with no `gcd`-specific branch in the emitter (arity checked structurally)

#### Scenario: Floor notation
- **WHEN** an effect writes `⌊sqrt(X)⌋`
- **THEN** the `Fbm`-scoped `⌊e⌋` notation elaborates to the floor application, and generated + hand-written Lean share the spelling

### Requirement: Rejection of legacy spellings
The system SHALL reject superseded call spellings (`isqrt(`, bare `floor(`, bare `sqrt(` unwrapped in `⌊⌋`) with clean problems naming the canonical form.

#### Scenario: Rejecting the old integer-root spelling
- **WHEN** an effect writes `isqrt(X)`
- **THEN** the generator reports a clean problem directing the author to `⌊sqrt(X)⌋`
