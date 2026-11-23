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
The system SHALL restrict `lean-proof/generate.py` to parsing `@effect` annotations and definitions and emitting Lean declarations, without Python-side symbolic stack simulation or per-shape proof-script emitters.

#### Scenario: Regression check on existing @effect suites
- **WHEN** `chomp test:lean` is run across `ff/__tests__/primitives.test.ffp` and `ff/lib/core/core.ff`
- **THEN** all existing `@effect` theorems pass using the compositional prover
