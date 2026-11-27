# Spec Delta

## ADDED Requirements

### Requirement: Power-tower expression spelling in effects
The system SHALL accept a power-tower spelling in `@effect` output expressions denoting iterated exponentiation, translating it to a Lean-side helper with the same one-line mapping pattern as `gcd`/`igcd`.

#### Scenario: Stating tetration
- **WHEN** `^^`'s effect is written with the chosen tower spelling
- **THEN** the generator emits the Lean-side tower application and the statement parses (proof may still need `@by-proof` or `@by-axiom`; statability is the requirement)

#### Scenario: Rejecting malformed tower arity
- **WHEN** the tower spelling is given the wrong number of arguments
- **THEN** the generator reports a clean problem naming the source location (same as `sqrt` arity handling)
