# Spec Delta

## ADDED Requirements

### Requirement: Verbatim Lean blocks via @lean
The system SHALL support `/* @lean ... */` comment blocks in `.ff` / `.ffp` files, pasting them verbatim in file order into the generated Lean module while rejecting `sorry`, `admit`, or `axiom` tokens up front.

#### Scenario: Defining a helper or custom theorem with @lean
- **WHEN** a `.ff` file contains a `/* @lean ... */` block defining a helper function, lemma, or custom theorem without `sorry`, `admit`, or `axiom`
- **THEN** `generate.py` emits the block verbatim in file order and Lean typechecks it alongside generated `@effect` theorems

#### Scenario: Rejecting unsafe axioms in @lean
- **WHEN** a `/* @lean ... */` block contains `sorry`, `admit`, or `axiom`
- **THEN** `generate.py` refuses to emit the theorem file and reports an error naming the source location

### Requirement: Self-contained @by-proof and @by-induction clauses on @effect
The system SHALL support optional `@by-proof <tactic>` and `@by-induction <pattern>` clauses at the tail of an `@effect` annotation (rejecting `sorry`, `admit`, or `axiom` up front) so recursive or complex cases remain position-independent and self-contained.

#### Scenario: Overriding a proof with @by-proof
- **WHEN** an `@effect` annotation ends with `@by-proof <tactic>` (without `sorry`, `admit`, or `axiom`)
- **THEN** `generate.py` emits the `@effect` theorem with that tactic block as its proof body instead of `by fbm_verify [...]`

#### Scenario: Rejecting unsafe axioms in @by-proof
- **WHEN** a `@by-proof` clause contains `sorry`, `admit`, or `axiom`
- **THEN** `generate.py` refuses to emit the theorem file and reports an error naming the source location

#### Scenario: Annotating a recursive case with @by-induction
- **WHEN** a recursive word's `@effect` annotation includes `@by-induction <pattern>`
- **THEN** `generate.py` validates the recursion pattern against the word body, emits the induction skeleton, and discharges base and inductive steps with `fbm_verify`

### Requirement: Recursive word emission via Tok.call and black-box callee reuse
The system SHALL emit recursive word definitions using `Tok.call` with `lookup defs` hypotheses instead of infinite `++` expansion, and SHALL allow non-recursive callers to compose proven recursive `@effect` theorems via `fbm_verify`.

#### Scenario: Non-recursive wrapper over a recursive word
- **WHEN** `loop` calls `_loop` (whose `@effect` is proven)
- **THEN** `loop`'s `@effect` proof composes `_loop_effect` via `fbm_verify` without repeating the induction

### Requirement: Arbitrary-position rest variables and list-valued stack outputs
The system SHALL support `..R` in non-leading stack positions (such as `..R A == A ..R`) and list-valued stack splices in `@effect` outputs (such as variable-length ranges pushed onto `..R`).

#### Scenario: Whole-stack rotation in pushtop
- **WHEN** `pushtop` is annotated with `/* @effect pushtop: ..R A == A ..R ... */`
- **THEN** `generate.py` translates the output stack to `R ++ [A]` in Lean's top-first representation

#### Scenario: Variable-length list output in range and count
- **WHEN** `range` or `count` specifies a list-valued stack output spliced onto `..R`
- **THEN** `generate.py` translates the output stack using list append (`xs ++ R`) and verifies it against `Spec`

### Requirement: Complete @effect verification of ff/lib/core/core.ff
The system SHALL verify `@effect` annotations for all words in `ff/lib/core/core.ff`, including `pushtop`, `_loop`, `loop`, `times`, `seq`, `range`, and `count`, under `chomp test:lean`.

#### Scenario: Running chomp test:lean on fully annotated core.ff
- **WHEN** `chomp test:lean` is run in `lean-proof/`
- **THEN** all theorems in `ff/__tests__/primitives.test.ffp` and `ff/lib/core/core.ff` (including the 7 newly annotated words) compile and pass
