# Proposal

## Why

`check.py --pp` and the `-- src: <file>:<line>` markers were built
for a flattened pipeline where attribution could name a real
location. It cannot: for preprocessed runs the line number is the
flattened stream's and the file is the importer, not the file
holding the word (`prelude.ffp:183` opens nothing). A marker that
cannot be opened is worse than no marker: it sends the reader to
the wrong place instead of saying "grep for it".

Separately, running the TS preprocessor from inside `check.py`
put toolchain orchestration (node) in the wrong layer:flattening
belongs in the chomp tasks, which already cache the flat prelude.

## What Changes

- Remove `check.py --pp` (all node spawning, `NODE_CANDIDATES`,
  `resolve_node`, `run_preprocessor`). `check.py` never invokes
  the preprocessor; the chomp layer flattens.
- Remove `-- src: <file>:<line>` markers from generated Lean and
  the `MARKER_RE` / `marker_for` machinery in `check.py`. TAP
  tests are named by effect text
  (`not ok 61 - abs: token ...`); the word name in the effect
  text is unique per suite and `grep -rn` finds it in seconds.
  Attribution is by `/-- word: @effect ... -/` doc comment,
  effect text only, no file:line claims.
- Two input modes, both preprocess-free inside the tools:
  `check.py FILE` (a real file on disk: the cached flat prelude
  or a standalone file) and `check.py --stdin` (already-flattened
  program piped in, e.g. from `shell/ff-preprocess.sh`).
  `generate.py --stdin` is the matching pipe input; its `LABEL`
  arg is gone (stdin is stdin, `<stdin>` provenance marker).
- `chompfile.toml`: `test:lean` is one `prove` over two files —
  the cached `:prelude` flat file plus raw primitives.
  `check` flattens any `$FILE` via `shell/ff-preprocess.sh
  --pp node` and pipes to `check.py --stdin` (no extension
  branching). `:prelude` cache task stays (rebuilt when lib,
  preprocessor, or shell helper change).
- Keep the preprocessor knowledge where it belongs: a source-map
  design (flattened-line → origin file:line, emitted by the TS
  preprocessor) is explicitly future work, not this change.

## Capabilities

### New Capabilities

### Modified Capabilities

- `lean-effect-prover`: `check.py` has two preprocess-free input
  modes (file, stdin); preprocessing lives in chomp tasks;
  failure attribution is effect-text only, with no file:line
  claims on flattened output.

## Impact

- `lean-proof/check.py` (`--pp`/node removal, marker machinery
  → doc-comment attribution, `--stdin` pipe mode + file mode).
- `lean-proof/generate.py` (`--stdin` keeps working, `LABEL` arg
  removed; `-- src:` emission removed).
- `lean-proof/chompfile.toml` (`test:lean` = flat prelude +
  primitives via one `prove`; `check` = flatten-pipe-stdin).
- `lean-proof/HELP.md`, `README.md` (pipeline docs).
- `shell/_ff-common.sh` (mise fallback for bun/node backends).
