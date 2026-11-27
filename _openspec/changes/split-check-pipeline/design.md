# Design

## Context

See `proposal.md`. Today `check.py::main` does: `run_generator`
(`generate.py` subprocess) → write temp file → `run_lean`
(`lake env lean --json` subprocess) → `parse_theorems` /
`theorem_for` / `emit_tap` (pure text processing). Only the last
step is check.py's real job; the first two are orchestration that
belongs in the chomp layer, next to the `:prelude` flatten cache
that already lives there.

## Goals / Non-Goals

**Goals:**
- `check.py` reads Lean source and `lean --json` output, writes
  TAP. Zero subprocesses. Unit-testable with canned inputs.
- Each pipeline stage independently runnable by hand and
  independently timed (the stage-timing question answers itself).
- Generated Lean cached as a real artifact: unchanged `.ff`
  input skips regeneration (chomp mtime caching).
- TAP output byte-identical to today for green and failing runs
  (same theorem order, same `#` diagnostics, same exit codes).

**Non-Goals:**
- Changing theorem emission, `fbm_verify`, attribution rules, or
  TAP format (byte-identical output is the acceptance gate).
- Changing `generate.py` semantics (its `--stdin`/file modes stay;
  only its caller changes).
- Removing the fused mode before the pipeline is green (keep
  `check.py <file>` working until cutover; delete after).

## Decisions

- **Filter shape**: `check.py` takes the Lean source and the JSON
  stream as its two inputs. Concretely: `check.py GEN.LEAN` reads
  `< GEN.LEAN.json`... no — simpler: `check.py` keeps ONE arg, the
  generated `.lean` path, plus `--json PATH` for the
  `lean --json` output (default: `-` stdin). So the pipe is
  `... | lake env lean --json | python3 check.py gen.lean --json -`
  and the by-hand form is
  `python3 check.py gen.lean --json lean-out.json`. Rationale:
  the `.lean` file is needed anyway (theorem order comes from
  parsing it); only the JSON moves to a stream.
- **Temp-file ownership moves to chomp**: `lake env lean`
  needs a seekable path (process substitution is unreliable for
  JSON line numbers). The chomp task holds a mktemp (or cached
  target) for the generated Lean — the same layer that already
  holds `./build/prelude.flat.ff`. No temp files in Python.
- **Keep-then-cut**: the fused `check.py <file>` path keeps
  working (it becomes: read file → run_generator → write temp →
  run_lean → attribute, i.e. today's code minus nothing) until
  the pipeline passes the byte-identical TAP gate; then delete
  the subprocess halves. Never two supported ways to run the
  suite.
- **Stage caching**: `:prelude` (flat, exists) → new `:gen-lean`
  (generated Lean from flat, rebuilt when flat/generator change)
  → `test:lean` runs `lake env lean --json` on the cached Lean
  and pipes to `check.py`. A no-op edit re-runs only attribution
  (~0.07s).

## Risks / Trade-offs

- **Risk**: four-stage pipe is more moving parts in chompfile.toml
  than one command. → **Mitigation**: each stage is one line, each
  independently re-runnable by hand for debugging (which is the
  point — today a failure hides inside Python subprocess calls).
- **Risk**: TAP byte-identical gate fails on whitespace/ordering
  trivia. → **Mitigation**: gate on parsed TAP equality (test
  number + status + first `#` line), not raw bytes; document any
  accepted cosmetic diff.
- **Risk**: memoization (prerequisite) changes generation timing
  but not output; the byte-identical gate is taken AFTER it, so
  the baseline already includes it. → **Mitigation**: sequence
  stated in tasks.
