# lean-effect-prover Specification

## Purpose

Provides compositional `Spec`-based `@effect` verification in Lean 4 (`Fbm.Prover`) using reusable structural lemmas and a Lean verification tactic, eliminating per-word Python proof synthesis.

## Requirements

### Requirement: Fuel-abstracted compositional specification relation
The system SHALL define a compositional specification relation in `Fbm.Prover` over `Fbm.Interp.execQ` that hides explicit fuel arithmetic behind existential quantification and universally quantifies over frame stack, queue, input, oracle, and `defs`.

#### Scenario: Composing two sequential programs
- **WHEN** two subprograms each satisfy their `Spec` obligations
- **THEN** their concatenation satisfies the composed `Spec` via a single reusable sequence lemma without manual fuel arithmetic

### Requirement: Word-level composition instead of whole-word inlining
The system SHALL allow a defined word's `@effect` proof to apply the proven `@effect` theorems of the words it calls rather than inlining every callee down to raw primitive tokens.

#### Scenario: Composing combinators in core.ff
- **WHEN** a combinator such as `branch`, `bi`, `bi2`, `or_else`, or `and_also` calls words that already have proven `@effect` theorems
- **THEN** its proof applies those callee theorems compositionally

### Requirement: Uniform Lean verification tactic for @effect theorems
The system SHALL provide a Lean 4 tactic (`fbm_verify`) in `Fbm.Prover` that discharges non-recursive `@effect` goals—including primitives, defined-word calls, quotation literals, `eval`, and `?` (`cond`) branches—without per-word Python proof scripts.

#### Scenario: Verifying a non-recursive @effect word
- **WHEN** `generate.py` emits an `@effect` theorem for a non-recursive word using `by fbm_verify [...]`
- **THEN** Lean verifies the theorem uniformly across straight-line, conditional, and quotation-composing words

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
