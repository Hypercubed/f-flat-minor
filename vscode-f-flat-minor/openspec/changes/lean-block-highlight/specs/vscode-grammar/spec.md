# Spec Delta

## ADDED Requirements

### Requirement: Lean highlighting inside @lean blocks
The system SHALL highlight the interior of `/* @lean ... */` blocks (and `@lean` sections inside `/** ... */` doc blocks) with the Lean grammar when available, falling back to comment styling when not.

#### Scenario: Reading an @lean helper
- **WHEN** a file contains a `/* @lean ... */` block with the Lean extension installed
- **THEN** the block interior renders with Lean syntax highlighting under the `@lean` directive frame

#### Scenario: Graceful fallback without the Lean grammar
- **WHEN** the Lean extension (or its grammar) is absent
- **THEN** the block renders as an ordinary comment, with no broken scopes or errors
