# Proposal

## Why

`lean-proof/check.py` is two tools wearing a trenchcoat: it shells
out to `generate.py` (Lean emission), then verifies the output
with `lake env lean --json` and attributes errors to TAP. But
`prove --exec "cmd" f1 f2` runs one command per file -- so the
check step must stay a single command taking a file. The real seam
is generate|check, not verify|attribute: emission belongs in
chomp (cached `:gen-lean` targets); `check.py GEN.LEAN` verifies
that file and attributes the errors. The pipeline:

```
shell/ff-preprocess.sh --pp node prelude.ffp > build/prelude.flat.ff   # :prelude (cached)
python3 generate.py --stdin < build/prelude.flat.ff > build/prelude.gen.lean  # :gen-lean (cached)
prove --exec "python3 check.py" ./build/prelude.gen.lean ./build/prim.gen.lean  # test:lean
```

## What Changes

- `check.py GEN.LEAN`: reads the generated file off disk (no
  generator spawn, no `--stdin` input mode, no temp-file
  creation), runs `lake env lean --json` on it (the ONE kept
  subprocess -- prove's exec model demands one command per
  file), attributes errors to theorems, prints TAP.
- `generate.py` unchanged (stdin->stdout and file modes stay;
  chomp calls it, not check.py).
- `ff-preprocess.sh` unchanged (already stdout).
- `chompfile.toml` owns flatten + generate as cached targets
  (`:prelude` -> `:gen-lean` x2: prelude + prim); `test:lean`
  is one `prove` over the two `.gen.lean` files.
- Sequenced AFTER the frontier-memoization fix (which shrinks
  generation from ~58s to single digits and removes the
  performance pressure, so this split is judged on architecture).

## Capabilities

### New Capabilities

- `lean-check-pipeline`: staged verify pipeline with cached
  flatten / generate steps and a verify+attribute check step
  per generated file.

### Modified Capabilities

## Impact

- `lean-proof/check.py` (generator spawn, `--stdin` mode, temp
  files deleted; verifier + attribution kept).
- `lean-proof/chompfile.toml` (`:gen-lean` cached targets;
  `test:lean` = one `prove` over the two `.gen.lean` files).
- `lean-proof/HELP.md`, `README.md` (pipeline docs).
