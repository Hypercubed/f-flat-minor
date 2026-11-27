# Proposal

## Why

`lean-proof/check.py` is three tools wearing a trenchcoat: it shells
out to `generate.py` (Lean emission), shells out to
`lake env lean --json` (verification), then maps errors to theorems
and prints TAP (attribution). The stages are independently useful
(generate without verifying, verify without regenerating, attribute
canned output in tests), independently cacheable (a no-op `.ff` edit
should not re-run a 58s generation), and independently timeable —
but fused, none of that is possible. The seams already exist
(`generate.py --stdin` reads stdin, emits Lean on stdout;
`lake env lean --json` is a bare CLI); this change makes them
explicit as a Unix pipeline:

```
shell/ff-preprocess.sh --pp node prelude.ffp \
  | python3 generate.py --stdin \
  | lake env lean --json \
  | python3 check.py
```

## What Changes

- `check.py` becomes a pure filter: Lean source + `lean --json`
  output in, TAP on stdout. No subprocesses (no generator spawn,
  no lake spawn). Testable with canned inputs.
- `generate.py` unchanged (already stdin→stdout).
- `ff-preprocess.sh` unchanged (already stdout).
- `chompfile.toml` owns the pipeline: flatten → generate →
  verify → attribute, with the generated Lean and flat file as
  separately cacheable artifacts.
- Sequenced AFTER the frontier-memoization fix (which shrinks
  generation from ~58s to single digits and removes the
  performance pressure, so this split is judged on architecture).

## Capabilities

### New Capabilities

- `lean-check-pipeline`: staged verify pipeline with independently
  runnable, cacheable, and timeable flatten / generate / verify /
  attribute steps.

### Modified Capabilities

## Impact

- `lean-proof/check.py` (slimmed to attribution-only filter).
- `lean-proof/chompfile.toml` (`test:lean` + `check` tasks become
  multi-stage pipes with cached intermediates).
- `lean-proof/HELP.md`, `README.md` (pipeline docs).
