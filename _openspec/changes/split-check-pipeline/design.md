# Design

## Context

See `proposal.md`. Today `check.py::main` does: `run_generator`
(`generate.py` subprocess) -> write temp file -> `run_lean`
(`lake env lean --json` subprocess) -> `parse_theorems` /
`theorem_for` / `emit_tap` (pure text processing). The generator
half moves to the chomp layer (cached `:gen-lean` targets); the
verify+attribute half stays because `prove --exec "cmd" f1 f2`
runs one command per file.

## Goals / Non-Goals

**Goals:**
- `check.py GEN.LEAN` reads the file off disk, verifies it with
  `lake env lean --json`, writes TAP. One subprocess (the
  verifier). No generator spawn, no temp files in Python.
- Generated Lean cached as real artifacts: unchanged inputs skip
  regeneration (chomp mtime caching).
- TAP output parsed-equal to today for green and failing runs
  (same theorem order, same `#` diagnostics, same exit codes).
- `test:lean` is one `prove` over the two `.gen.lean` files.

**Non-Goals:**
- Changing theorem emission, `fbm_verify`, attribution rules, or
  TAP format (parsed-equal output is the acceptance gate).
- Changing `generate.py` semantics (its `--stdin`/file modes stay;
  chomp calls it, not check.py).

## Decisions

- **Real seam is generate|check**: `check.py` keeps the verifier
  (`run_lean`, `resolve_lean/lake`) because prove's exec model
  demands one command per file. What gets deleted is the
  generator half: `run_generator*`, `--stdin` input mode,
  temp-file creation for generated output. No `--json` flag, no
  `ff-verify.sh` wrapper, no stream inputs -- the file arg is
  the interface, as today.
- **Stage caching**: `:prelude` (flat, exists) -> `:gen-lean` x2
  (prelude + prim generated Lean, rebuilt when inputs change)
  -> `test:lean` is
  `prove --exec "python3 check.py" ./build/prelude.gen.lean ./build/prim.gen.lean`.
  A no-op edit re-runs only verify+attribute on unchanged Lean.

## Risks / Trade-offs

- **Risk**: two cached generated-Lean artifacts instead of one
  fused command. -> **Mitigation**: each stage is one line, each
  independently re-runnable by hand for debugging (which is the
  point -- today a failure hides inside the generator subprocess).
- **Risk**: TAP gate fails on whitespace/ordering trivia.
  -> **Mitigation**: gate on parsed TAP equality (test number +
  status + first `#` line), not raw bytes; document any accepted
  cosmetic diff.
- **Risk**: memoization (prerequisite) changes generation timing
  but not output; the gate is taken AFTER it, so the baseline
  already includes it. -> **Mitigation**: sequence stated in tasks.
