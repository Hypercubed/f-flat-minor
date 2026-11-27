# Spec Delta

## ADDED Requirements

### Requirement: Assumed-lemma clause on @effect
The system SHALL support a trailing `@by-axiom <justification>` clause on an `@effect` annotation (as an alternative to `@by-proof` / `@by-induction`, at most one clause per effect), recording the justification text for the audit trail and rejecting `sorry`, `admit`, or `axiom` tokens up front.

#### Scenario: Annotating an unproven word as assumed
- **WHEN** an `@effect` annotation ends with `@by-axiom <justification>` (without `sorry`, `admit`, or `axiom`)
- **THEN** the generator records the word as assumed with that justification instead of attempting proof search

#### Scenario: Rejecting unsafe tokens in @by-axiom
- **WHEN** an `@by-axiom` clause contains `sorry`, `admit`, or `axiom`
- **THEN** the generator refuses to emit the theorem file and reports an error naming the source location

### Requirement: Axiom emission for assumed words
The system SHALL emit an assumed word's `Spec` / `SpecErr` / `SpecExit` statement as a Lean `axiom` (statement-identical to what the prover would produce, with the justification in a comment above it) instead of a `theorem ... := by fbm_verify`, while emitting its `Prog` definition and including the assumed lemma name in callers' dependency lists unchanged.

#### Scenario: Caller composes over an assumed lemma
- **WHEN** `lcm` (`dup2 gcd / *`) is emitted and `gcd` is assumed
- **THEN** `lcm`'s proof applies `gcd_effect` via `fbm_verify` exactly as if it were proven, and `gcd` itself emits an axiom rather than a failed theorem

### Requirement: Assumption-aware TAP reporting
The system SHALL report assumed theorems in TAP output as passing tests annotated with the assumption (`ok N - <effect text>` with an `# ASSUMED: <justification>` diagnostic), keeping the suite green while making every open assumption visible.

#### Scenario: Green suite with a visible assumption
- **WHEN** `chomp test:lean` runs with `gcd` assumed and `lcm` proved over it
- **THEN** all tests pass and the TAP output names the assumed word and its justification
