# Spec Delta

## ADDED Requirements

### Requirement: Uniform emission with tactic-resolved proofs
The system SHALL emit for every annotated word exactly one `def ...Prog`, one `fbm_effect ...` declaration carrying the effect text, and `by fbm_verify` with no dependency list and no proof-path selection, regardless of word shape (recursive, quotation-carrying, conditional, straight-line).

#### Scenario: Straight-line word emits uniformly
- **WHEN** `generate.py` processes a straight-line word such as `divrem`
- **THEN** it emits `divremProg`, one `fbm_effect` declaration, and `by fbm_verify` with no dep list

#### Scenario: Recursive word emits uniformly
- **WHEN** `generate.py` processes a recursive word such as `!`
- **THEN** it emits the same uniform shape (opaque `Tok.call` boundary preserved); the tactic applies the induction hypothesis without generator-provided deps

### Requirement: Clean tactic-raised failures for uncovered shapes
The system SHALL fail with a clean, word-naming Lean error (in the existing `needs @by-proof` style) when `fbm_verify` cannot close a word's proof, rather than refusing emission in Python.

#### Scenario: Multi-eval composer word fails cleanly
- **WHEN** `fbm_verify` runs on a word whose shape needs not-yet-built reasoning (e.g. 6-eval `__series_step`)
- **THEN** Lean reports a clean error naming the word and the missing reasoning, and `check.py` attributes it to the word's TAP test as today

### Requirement: Parsed-equal TAP across the migration
The system SHALL keep `chomp test:lean` TAP output parsed-equal (test number, status, first diagnostic line) for every currently-green theorem throughout the routing deletion.

#### Scenario: Full-suite regression gate
- **WHEN** `chomp test:lean` runs after each routing-deletion step
- **THEN** all previously-green theorems pass with identical TAP, and previously-parked words remain parked (now via tactic errors instead of generator refusals)
