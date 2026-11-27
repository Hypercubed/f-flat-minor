# Spec Delta

## ADDED Requirements

### Requirement: Measure-based induction skeletons
The system SHALL support `@by-induction` patterns beyond `N - 1` and `R.length` that perform strong induction over a decreasing measure inferred from the word's recursive call site — including division countdown (`x>>1`, `x/10` as in `ilb`/`ilog`) and countdown-by-k with accumulator state (as in `__tail_loop`).

#### Scenario: Proving ilb by countdown induction
- **WHEN** `ilb` (`dup 1 > [ 1 >> ilb ++ ] [ drop 0 ] branch`) is annotated with the generalized induction pattern
- **THEN** `fbm_verify` discharges it by strong induction on the decreasing argument, with TAP showing `ok` and no hand `@by-proof`

#### Scenario: Clean failure for unsupported recursion shapes
- **WHEN** a word's recursion matches no available induction pattern (e.g. double recursion as in `ack`)
- **THEN** the tactic fails with a clean word-naming error (existing `needs @by-proof` style), not a loop or fuel-limit stall

### Requirement: Well-founded induction for remainder-decrease
The system SHALL support well-founded induction over remainder decrease so `gcd` (`tuck % dup [ __t ] ?`) proves without its current `@assume` clause.

#### Scenario: Proving gcd by well-founded induction
- **WHEN** `gcd` is annotated with the well-founded induction pattern
- **THEN** its proof closes (replacing the `@assume remainder-decrease` clause), `lcm`'s composition over `gcd_effect` is unaffected, and TAP stays green
