# Design

## Context

See `proposal.md`. The `--pp`/`--label`/`--stdin` plumbing and
`-- src:` markers landed as "Phase 7 lite" to verify `pred.ffp`
(which imports `core.ff`) through the real TS preprocessor. The
pipeline works, but its attribution output names a file and line
that correspond to nothing the user can open. This change deletes
the machinery and returns to per-file raw verification.

## Goals / Non-Goals

**Goals:**
- One input path in `check.py`/`generate.py`: a real file on disk.
- TAP failures named by effect text only; no file:line claims that
  cannot be opened.
- `test:lean` covers every annotated file with no flattening step.

**Non-Goals:**
- Preprocessor source maps (flattened-line → origin). Explicitly
  deferred: when the annotated surface is large enough that
  `grep -rn <word>` feels slow, the TS preprocessor should emit the
  map and markers should carry it. Not this change.
- Changing theorem emission, `fbm_verify`, or any `.ff`/`.ffp`
  content.

## Decisions

- **Delete, don't deprecate**: `--pp`, `--label`, `--stdin`, and the
  marker regex go entirely, including their HELP.md paragraphs and
  chompfile comments. Three input paths was the complexity being
  removed; leaving one "just in case" recreates it.
- **Effect text is the identifier**: `min: A B == X ensures ...` is
  unique per suite today. If two files ever annotate the same word,
  the suite filename in the TAP plan context disambiguates
  (`test:lean` runs one `prove` per file, as today).
- **`:prelude` cache task**: the agent decides keep-vs-delete. Keep
  iff the flat file serves another consumer (benchmarks, downstream
  tooling); the check path must not depend on it either way.

## Risks / Trade-offs

- **Risk**: losing the ability to check a file with unflattened
  imports (the original `--pp` motivation: `pred.ffp` needs
  `core.ff`'s `zero?`). → **Mitigation**: `test:lean` lists each
  annotated file, and `generate.py` already resolves the import
  chain by... (agent verifies this claim — if raw verification of
  `pred.ffp` genuinely cannot see `core.ff` definitions, the change
  must include the minimal include mechanism, e.g. reverted Route A
  multi-file mode, and say so explicitly rather than silently
  keeping flattening).
- **Risk**: deleting the only exercised flattened path rots the
  preprocessor-compat knowledge (comment safety, `__`-mangling
  caveats in PLAN.md Phase 7). → **Mitigation**: that knowledge
  lives in PLAN.md, untouched by this change.
