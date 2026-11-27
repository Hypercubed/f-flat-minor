# Spec Delta

## Purpose

Remove preprocessor invocation and file:line markers from the Lean
check path; check via file/stdin inputs with effect-text-only
failure attribution; flatten in chomp tasks.

## ADDED Requirements

### Requirement: Stdin pipe mode
The system SHALL accept an already-flattened program on stdin
(`check.py --stdin`, `generate.py --stdin`) for piped workflows,
with `<stdin>` as the provenance marker.

#### Scenario: Piped single-file check
- **WHEN** `shell/ff-preprocess.sh --pp node arith.ffp | check.py --stdin` runs
- **THEN** the 4 arith theorems verify with effect-text TAP names

## REMOVED Requirements

### Requirement: Preprocessor invocation inside check.py
The system SHALL NOT offer `check.py --pp` / `--node`, SHALL NOT
spawn node, and SHALL contain no `NODE_CANDIDATES` /
`resolve_node` / `run_preprocessor`.

#### Scenario: No node in Python
- **WHEN** `grep -rni "node\|mise" lean-proof/*.py` runs
- **THEN** no matches (generate.py `--stdin` help excepted)

### Requirement: No file:line markers in generated Lean
Generated `.lean` SHALL NOT contain `-- src: <file>:<line>`
markers. TAP failures SHALL name the effect text (which includes
the word name) with Lean diagnostics beneath, and no file:line
parenthetical.

#### Scenario: Failing theorem attribution
- **WHEN** a theorem fails under `check.py` (file or stdin mode)
- **THEN** TAP prints `not ok N - <effect text>` with `#` Lean
  diagnostics, and no `(file:line)` suffix

## MODIFIED Requirements

### Requirement: test:lean covers the library via the flat prelude
`test:lean` SHALL verify `./build/prelude.flat.ff` (chomp-cached
via `shell/ff-preprocess.sh`, rebuilt when lib/preprocessor/shell
change) plus raw `primitives.test.ffp` in one `prove` invocation.
The `check` task SHALL flatten any `$FILE` via the shell helper
and pipe to `check.py --stdin` with no extension branching.
