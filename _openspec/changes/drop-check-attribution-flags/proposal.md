# Proposal

## Why

`check.py --pp` / `--label` and the `-- src: <file>:<line>` markers
were built for a flattened pipeline where attribution could name a
real location. It cannot: for preprocessed runs the line number is the
flattened stream's and the file is the importer, not the file holding
the word (`prelude.ffp:183` opens nothing). The flags add three code
paths and two config spellings in exchange for actively misleading
output. A marker that cannot be opened is worse than no marker: it
sends the reader to the wrong place instead of saying "grep for it".

## What Changes

- Remove `--pp`, `--label` from `check.py`; remove `--stdin` from
  `generate.py` (one input path: raw file, as before Phase 7 lite).
- Remove `-- src: <file>:<line>` markers from generated Lean and the
  `MARKER_RE` / `marker_for` machinery in `check.py`. TAP tests are
  named by effect text (`not ok 61 - abs: token ...`), and Lean
  diagnostics already print under them; the word name in the effect
  text is unique per suite and `grep -rn` finds it in seconds.
- `chompfile.toml`: `test:lean` goes back to listing real files.
  Prelude coverage is kept by listing the annotated files (or a
  generated list), each verified raw — no flattening in the check
  path at all. The `:prelude` cache task and `:build` stamp task
  (landed with the `--pp` work) stay if useful, go if not; the
  agent decides and justifies it.
- Keep the preprocessor knowledge where it belongs: a source-map
  design (flattened-line → origin file:line, emitted by the TS
  preprocessor) is explicitly future work, not this change.

## Capabilities

### New Capabilities

### Modified Capabilities

- `lean-effect-prover`: `check.py` has one input path (raw file);
  failure attribution is effect-text only, with no file:line claims
  on flattened output.

## Impact

- `lean-proof/check.py` (flag removal, marker machinery removal).
- `lean-proof/generate.py` (`--stdin` removal, marker emission
  removal).
- `lean-proof/chompfile.toml` (`test:lean` roots back to real
  files).
- `lean-proof/HELP.md` (remove `--pp`/`--label` docs).
