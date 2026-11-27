# Spec Delta

## ADDED Requirements

### Requirement: Ensures on the runQ compose path
The system SHALL accept `ensures` (`where`) clauses on words routed to the runQ composer (two evals on variable quotations, including `dip`-nested bodies as in `__tail_loop`), threading each slot's output witnesses through the nested `execQ_append` composition instead of refusing with "takes no where clause yet".

#### Scenario: Tail loop with accumulator ensures
- **WHEN** `__tail_loop` carries an `ensures` on its queued accumulator state
- **THEN** the generator emits the composed `Spec` with bound witnesses per eval boundary, and `fbm_verify` closes it via the explicit-measure induction skeleton

#### Scenario: Clean failure beyond two evals preserved
- **WHEN** a word with three or more evals and an `ensures` clause is processed
- **THEN** the generator still reports a clean problem (this change extends the two-eval path only)
