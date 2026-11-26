# Spec Delta

## Purpose

Extend word-boundary lemma composition from the recursive frontier to
all annotated callees, so non-recursive words whose inlined bodies
contain multiple `?` dispatches (or defined-word calls in `?`
prefixes) prove by composing callee `@effect` theorems instead of
being refused by the runQ router.

## ADDED Requirements

### Requirement: Callee-Prog references for annotated callees
The system SHALL emit `Prog` definitions as `++`-compositions
referencing the `Prog`s of annotated callees rather than inlining
their bodies to primitive tokens. Unannotated callees SHALL still
inline; recursive words SHALL keep their existing `Tok.call` path.

#### Scenario: clamp references max/min instead of flattening sort2
- **WHEN** `clamp` (`dig max min`) is emitted and `max`/`min` carry
  proven `@effect` theorems
- **THEN** `clampProg` references `maxProg`/`minProg` via `++` and
  the flattened program contains no `?` at `clamp`'s own level

### Requirement: Conditional-hypothesis splitting in fbm_verify
The system SHALL split the goal per case when an applied callee
lemma's postcondition contains an `if` the goal depends on, up to a
bounded depth, and SHALL emit a clean "needs `@by-proof`" problem
beyond that depth rather than exploring further.

#### Scenario: Composing two conditional lemmas
- **WHEN** `clamp`'s proof applies `max_effect` and `min_effect`,
  each with an `if`-post
- **THEN** `fbm_verify` closes all four case combinations without
  human tactics

### Requirement: clamp proves without @by-proof
The system SHALL verify `/* @effect clamp: LO HI X == Y ensures ... */`
(correct nested-if shape from a hand trace) via callee composition,
with `chomp test:lean` green and all pre-existing theorem counts
identical.

#### Scenario: Full-suite regression
- **WHEN** `chomp test:lean` runs after the change
- **THEN** core.ff (52), primitives (34), pred (5), and all other
  annotated suites pass with the same counts, plus `clamp`
