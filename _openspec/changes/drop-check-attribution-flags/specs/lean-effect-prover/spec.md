# Spec Delta

## Purpose

Remove the `--pp` / `--label` / `--stdin` plumbing and `-- src:`
file:line markers from the Lean check path, returning to one input
path (raw file) with effect-text-only failure attribution.

## ADDED Requirements

(none — this change removes behavior)

## REMOVED Requirements

### Requirement: Preprocessor-piped verification flags
The system SHALL NOT offer `check.py --pp`, `check.py --label`, or
`generate.py --stdin`. There SHALL be exactly one input path: a real
`.ff` / `.ffp` file on disk, read directly.

#### Scenario: Single input path
- **WHEN** `python3 check.py --pp anything` or `--label` or
  `generate.py --stdin` is invoked
- **THEN** usage error (unknown flag), not a fallback behavior

### Requirement: No file:line markers in generated Lean
Generated `.lean` SHALL NOT contain `-- src: <file>:<line>`
markers. TAP failures SHALL name the effect text (which includes
the word name) with Lean diagnostics beneath, and no file:line
parenthetical.

#### Scenario: Failing theorem attribution
- **WHEN** a theorem fails under `check.py`
- **THEN** TAP prints `not ok N - <effect text>` with `#` Lean
  diagnostics, and no `(file:line)` suffix

## MODIFIED Requirements

### Requirement: test:lean covers annotated files without flattening
`test:lean` SHALL verify every annotated file via raw-file checks
(one `prove` per file, as today for primitives), with no
preprocessing or cached flat file in the check path. Prelude
coverage (pred, arith, future math files) SHALL come from listing
them, which REQUIRES raw verification to resolve cross-file
definitions — if it cannot, this change SHALL include the minimal
include mechanism and document it, not silently keep flattening.
