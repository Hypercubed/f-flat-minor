# Tasks

## 0. Prerequisite (separate, do first)

- [ ] 0.1 Land the frontier-memoization fix (compute
  `_compute_rec_frontier` once per run). The TAP-equality baseline
  for this change is taken AFTER it.

## 1. Attribution filter

- [ ] 1.1 Add `check.py GEN.LEAN --json PATH|-` mode: parse
  theorems from GEN.LEAN, read the JSON stream, emit TAP.
  Zero subprocesses on this path. Keep the fused
  `check.py <file>` / `--stdin` paths working untouched.
- [ ] 1.2 Unit test with canned inputs: save one green and one
  failing (generated Lean + JSON) pair, assert parsed-TAP
  equality with the fused run's TAP.

## 2. Pipeline + cache

- [ ] 2.1 chompfile: `:prelude` (exists) → new `:gen-lean`
  (cached generated Lean from flat + generator) → `test:lean`
  runs `lake env lean --json` on the cached Lean, pipes JSON +
  Lean path into `check.py`. Same for the `check` task
  (flatten-or-raw → temp/cached Lean → verify → attribute).
- [ ] 2.2 Byte-identical (parsed-equal) TAP gate: full suite via
  pipeline vs fused, green and failing cases. Fix discrepancies,
  documenting any accepted cosmetic diff.
- [ ] 2.3 Delete the fused subprocess halves from `check.py`
  (keep arg parsing errors sensible). Update HELP.md + README.md
  pipeline docs. Full regression green.
