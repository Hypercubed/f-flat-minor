# Spec Delta

## ADDED Requirements

### Requirement: Documentation scoping for doc blocks
The system SHALL scope `/** ... */` blocks as documentation comments so stock themes render them with documentation styling, while applying the existing effect-inner highlighting to `@effect` bodies inside them.

#### Scenario: Viewing a documented effect
- **WHEN** a file contains `/** @effect dup: A == A A */`
- **THEN** the block renders with the theme's documentation-comment style and the effect body keeps word/clause/separator highlighting

#### Scenario: Plain blocks unchanged
- **WHEN** a file contains `/* plain comment */`
- **THEN** it scopes as an ordinary block comment exactly as today
