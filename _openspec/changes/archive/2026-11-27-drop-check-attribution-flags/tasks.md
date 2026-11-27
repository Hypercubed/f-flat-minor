# Tasks

## 1. Remove preprocessor invocation + file:line markers

- [x] 1.1 Remove `check.py --pp` / `--node` (node spawning,
  `NODE_CANDIDATES`, `resolve_node`, `run_preprocessor`).
  Verify `grep -rni "node\|mise" lean-proof/*.py` is clean.
- [x] 1.2 Remove `-- src:` emission from `generate.py` and the
  `MARKER_RE` / `marker_for` machinery from `check.py`;
  attribute by `/-- word: @effect ... -/` doc comment
  (effect text only). `generate.py --stdin` keeps working;
  its `LABEL` arg is deleted.
- [x] 1.3 Retarget TAP output to effect-text-only failures (no
  `(file:line)` suffix), keeping Lean `#` diagnostics. Verify
  by breaking one effect on purpose and reading the TAP.

## 2. test:lean over the flat prelude + raw primitives

- [x] 2.1 Restore the `:prelude` cache task flattening via
  `shell/ff-preprocess.sh --pp node` (deps: prelude.ffp, lib
  globs, preprocessor sources, shell helper); add the
  `run_managed`/`print_managed` mise fallback in
  `shell/_ff-common.sh` so mise-less boxes work.
- [x] 2.2 `test:lean` = one `prove` over `./build/prelude.flat.ff`
  + `primitives.test.ffp`; `check` task = flatten any `$FILE`
  via the shell helper, pipe to `check.py --stdin`, no
  extension branching.
- [x] 2.3 Full regression green with correct counts (52 core +
  5 pred + 4 arith incl. sqr + 34 primitives); HELP.md/README.md
  pipeline docs updated; intentionally-broken-effect TAP test
  performed and reverted.
