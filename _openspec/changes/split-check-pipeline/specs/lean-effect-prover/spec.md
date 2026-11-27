# Spec Delta

## Purpose

Split the fused `check.py` (generate + verify + attribute) into an
explicit staged pipeline with a pure attribution filter, keeping
TAP output identical.

## ADDED Requirements

### Requirement: Pure attribution filter
The system SHALL provide a `check.py` mode that reads a generated
`.lean` file plus a `lean --json` stream and emits TAP, spawning
no subprocesses.

#### Scenario: Attributing canned output
- **WHEN** `python3 check.py gen.lean --json lean-out.json` runs
  on saved outputs
- **THEN** TAP on stdout matches the fused run's TAP (parsed
  equality: test number, status, first diagnostic line)

### Requirement: Independently runnable stages
The system SHALL allow running flatten, generate, verify, and
attribute by hand as separate commands, each with observable
inputs/outputs and timing.

#### Scenario: Timing one stage
- **WHEN** an operator runs any single stage with `time`
- **THEN** only that stage executes (no hidden regeneration or
  re-verification inside another tool)

### Requirement: Cached generated Lean
The system SHALL cache generated Lean as a chomp artifact rebuilt
only when its inputs (flat file, generator) change, so unchanged
input skips regeneration.

#### Scenario: No-op re-run
- **WHEN** `test:lean` re-runs with no source changes
- **THEN** only attribution executes (~0.1s); generation and
  Lean verification are cache hits

## MODIFIED Requirements

### Requirement: test:lean pipeline shape
`test:lean` SHALL run flatten → generate → verify → attribute as
explicit chomp stages (cached intermediates) instead of one fused
`check.py` invocation per file, with TAP output parsed-equal to
the fused runs.
