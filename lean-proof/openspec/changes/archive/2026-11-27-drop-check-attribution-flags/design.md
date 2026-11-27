# Design

## Context

See `proposal.md`. The `--pp` plumbing landed as "Phase 7 lite" to
verify `pred.ffp` (which imports `core.ff`) through the real TS
preprocessor. The pipeline worked, but its attribution output
named a file and line that correspond to nothing the user can
open, and it put node orchestration inside the checker. This
change deletes the machinery from Python and owns flattening in
chomp, where the `:prelude` cache already lives.

## Goals / Non-Goals

**Goals:**
- No preprocessor invocation inside `check.py`/`generate.py`
  (grep-clean for node/mise in `*.py`).
- TAP failures named by effect text only; no file:line claims
  that cannot be opened.
- `test:lean` = one `prove` over the cached flat prelude + raw
  primitives; `check` = flatten-pipe-stdin for any file.

**Non-Goals:**
- Preprocessor source maps (flattened-line → origin). Explicitly
  deferred: when the annotated surface is large enough that
  `grep -rn <word>` feels slow, the TS preprocessor should emit
  the map and markers should carry it. Not this change.
- Changing theorem emission, `fbm_verify`, or any `.ff`/`.ffp`
  content.

## Decisions

- **Delete `--pp`, keep `--stdin`**: `--pp` (checker-spawns-node)
  goes entirely. `--stdin` (dumb pipe input, no subprocesses)
  stays in both tools — it is the seam the shell layer feeds.
  `generate.py --stdin`'s `LABEL` arg goes (stdin is stdin).
- **Effect text is the identifier**: `min: A B == X ensures ...`
  is unique per suite today. `test:lean` runs one `prove` per
  file, and suite context disambiguates the rest.
- **`:prelude` cache task stays**: rebuilt when lib,
  preprocessor, or shell helper change; the flat file is
  checked with plain `check.py <path>` (a file is a file —
  no label, no line mapping, no special mode).
- **Shell fallback over baked paths**: `bun`/`node` backends run
  via `mise exec` when present, bare tool on PATH otherwise
  (`run_managed`/`print_managed` in `_ff-common.sh`). Boxes with
  only a system node work with no configuration.
- **Keep-then-cut applied to markers**: the fused attribution
  (doc-comment scan) already replaced marker matching; the regex
  and grouping-by-marker code were deleted, not deprecated.

## Risks / Trade-offs

- **Risk**: the `check` task's always-flatten pipe pays a node
  boot per invocation even for directive-free files.
  → **Mitigation**: accepted as uniformity cost (one path, no
  extension branching); revisit with a fast-path only if
  measured, not speculated.
- **Risk**: deleting the only exercised flattened path rots the
  preprocessor-compat knowledge (comment safety, `__`-mangling
  caveats in PLAN.md Phase 7). → **Mitigation**: that knowledge
  lives in PLAN.md, untouched by this change. Flattening still
  runs every `test:lean` via `:prelude`, so the path stays
  exercised.
