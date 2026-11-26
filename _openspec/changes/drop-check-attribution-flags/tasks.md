# Tasks

## 1. Remove the flags and markers

- [ ] 1.1 Remove `--pp` / `--label` from `lean-proof/check.py`
  (flags, `run_preprocessor`, `run_generator_stdin`, marker regex +
  `parse_markers` / `marker_for` / grouping-by-marker — regroup
  Lean errors by emitted-theorem order instead), and `--stdin`
  from `lean-proof/generate.py` (arg parsing + stdin read + both
  `-- src:` emission sites). Verify `--help` on both shows one
  input path.
- [ ] 1.2 Retarget TAP output to effect-text-only failures (no
  `(file:line)` suffix), keeping Lean `#` diagnostics. Verify by
  breaking one effect on purpose and reading the TAP.

## 2. test:lean without flattening

- [ ] 2.1 Rewrite `lean-proof/chompfile.toml` `test:lean` to list
  real files (primitives + every annotated lib file, e.g. core.ff,
  pred.ffp, arith.ffp as they land). Decide keep-vs-delete for the
  `:prelude` cache task and justify it in the report.
- [ ] 2.2 Resolve the import-visibility question FIRST: prove that
  raw `check.py ../ff/lib/math/pred.ffp` sees `core.ff` definitions
  (it did partially before — `negitive?`/`positive?` emitted), or
  implement the minimal include mechanism and document it. The
  check path must not depend on a flat file either way.
- [ ] 2.3 Full regression: every suite green with correct counts;
  HELP.md `--pp`/`--label` paragraphs deleted; README example
  outputs updated if they show markers.
