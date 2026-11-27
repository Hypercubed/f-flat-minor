# Spec Delta

## ADDED Requirements

### Requirement: Doc-block normalization in the preprocessor
The system SHALL rewrite a block comment opening with `/**` to `/*` in preprocessor output, copying the body verbatim with no directive processing and no nesting support.

#### Scenario: Normalizing a doc block
- **WHEN** the preprocessor reads `/** @effect dup: A == A A */`
- **THEN** it emits `/* @effect dup: A == A A */` (opener rewritten, body byte-identical)

#### Scenario: Directives inside doc blocks stay inert
- **WHEN** a `/** ... */` block contains a directive-looking line
- **THEN** the line is copied verbatim and never executed

#### Scenario: Ordinary blocks unchanged
- **WHEN** the preprocessor reads `/* plain comment */`
- **THEN** output is byte-identical to current behavior
