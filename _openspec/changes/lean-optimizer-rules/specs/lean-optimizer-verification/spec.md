# Spec Delta

## Purpose

Provides machine-checked soundness proofs for F♭m compiler peephole optimization rules over `Fbm.Interp`, expressed via a concise `opt_rule` Lean 4 macro.

## ADDED Requirements

### Requirement: Readable opt_rule macro for peephole rewrite soundness
The system SHALL provide an `opt_rule` Lean 4 macro in `Fbm.Optimizer` that expands a concise rule declaration (name, assumed stack variables, optional precondition, LHS tokens, RHS tokens) into a theorem over `Fbm.Interp.execQ` preserving stack, queue, IO actions, definitions, and error behavior.

#### Scenario: Proving an unconditional peephole cancellation rule
- **WHEN** an `opt_rule` declaration specifies a valid cancellation such as `[.swap, .swap] => []` with stack items `(a b)`
- **THEN** the macro expands to a Lean theorem and verifies it against `Fbm.Interp.execQ`

#### Scenario: Proving a conditional peephole rule with preconditions
- **WHEN** an `opt_rule` declaration includes a `when` precondition (such as `0 < M` for `rand drop` or `b ≠ 0` for division identities)
- **THEN** the macro includes that precondition as a theorem hypothesis and verifies equivalence under it

### Requirement: Soundness coverage for existing compiler optimizer rules
The system SHALL verify the peephole rewrite rules from `typescript/core/src/optimizer.ts` in `Fbm.Optimizer` (or explicitly document any rule whose preconditions differ from `Fbm.Interp`, such as oracle-advancing `clock`/`rand` drops).

#### Scenario: Building and checking optimizer proofs in CI
- **WHEN** `lake build` or `chomp test:lean` is run in `lean-proof/`
- **THEN** `Fbm.Optimizer` compiles with zero errors and zero `sorry`s
