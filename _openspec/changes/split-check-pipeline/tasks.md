# Tasks

## 0. Prerequisite (separate, do first)

- [ ] 0.1 Land the frontier-memoization fix (compute
  `_compute_rec_frontier` once per run). The TAP-equality baseline
  for this change is taken AFTER it.

## 1. check.py becomes GEN.LEAN -> TAP (cut the generator half)

- [ ] 1.1 Rewrite `check.py` as `check.py GEN.LEAN`: read the file
  off disk, run `lake env lean --json` on it, attribute via doc
  comments, emit TAP. Delete `run_generator*`, the `--stdin`
  input mode, and temp-file creation for generated output in the
  same edit. KEEP `run_lean`, `resolve_lean/lake` (prove's exec
  model needs one command per file). No parallel paths, no
  `--json` flag, no wrapper scripts.
- [ ] 1.2 Drop the canned-input unit test idea (it belonged to the
  dead pure-filter shape -- with the verifier inside check.py
  there is no JSON-stdin mode to feed canned output to). The
  suite itself is the test: parsed-TAP gate below covers green
  + failing cases.

## 2. Pipeline + cache (`:gen-lean` targets, one prove)

- [ ] 2.1 chompfile: `:prelude` (exists) -> new `:gen-lean`
  (cached `prelude.gen.lean` from flat + generator) + `:gen-prim`
  (cached `prim.gen.lean` from primitives test file + generator).
  `test:lean` is one prove:
  `prove --exec "python3 check.py" ./build/prelude.gen.lean ./build/prim.gen.lean`.
  No wrapper scripts, no bare verify pipes in task bodies, no
  `s1`/`s2` capture -- prove owns aggregation and exit codes.
  `check` task: flatten `$FILE` via shell helper to temp Lean,
  then `python3 check.py` on it (temp via mktemp + trap in
  chomp, not Python).
- [ ] 2.2 Parsed-equal TAP gate: full suite via pipeline vs the
  pre-change fused baseline, green and failing cases. Fix
  discrepancies, documenting any accepted cosmetic diff.
- [ ] 2.3 Update HELP.md + README.md pipeline docs. Full
  regression green.
