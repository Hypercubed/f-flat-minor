# Spec Delta

## Purpose

Split the fused `check.py` (generate + verify + attribute) at the
generate|check seam: emission moves to cached chomp targets,
`check.py` keeps verify+attribute on a `.lean` file, keeping TAP
output identical.

## ADDED Requirements

### Requirement: Verify+attribute check on a Lean file
The system SHALL provide `check.py GEN.LEAN`, which reads the file
off disk, runs `lake env lean --json` on it, attributes errors to
theorems via the `/-- word: @effect ... -/` doc comments, and emits
TAP. One subprocess (the verifier); no generator spawn, no temp
files, no `--stdin` mode, no `--json` flag.

#### Scenario: Checking a cached generated file
- **WHEN** `python3 check.py ./build/prelude.gen.lean` runs
- **THEN** TAP on stdout matches the fused run's TAP (parsed
  equality: test number, status, first diagnostic line)

### Requirement: Cached generated Lean
The system SHALL cache generated Lean as chomp artifacts (`:gen-lean`
targets for prelude + prim) rebuilt only when inputs change, so
unchanged input skips regeneration.

#### Scenario: No-op re-run
- **WHEN** `test:lean` re-runs with no source changes
- **THEN** generation is a cache hit; only verify+attribute execute

## MODIFIED Requirements

### Requirement: test:lean pipeline shape
`test:lean` SHALL verify the two cached `.gen.lean` files with one
`prove --exec "python3 check.py"` invocation, with TAP output
parsed-equal to the fused runs.
