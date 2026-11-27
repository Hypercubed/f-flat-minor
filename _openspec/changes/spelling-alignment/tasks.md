# Tasks

## 1. Lean-side renames + notation

- [ ] 1.1 Rename spec helpers to effect spellings under `Fbm` (`igcd`→`Fbm.gcd`, `fsqrt`→`Fbm.sqrt`; confirm `isqrt`'s post-cleanup home per the lib-cleanup rule). Add `Fbm`-scoped `⌊e⌋` notation to the floor application. `lake build` clean.
- [ ] 1.2 Probe `⌊...⌋` elaboration in `/tmp` (generated-shaped snippet) before touching the emitter.

## 2. Emitter pass-through + rejections

- [ ] 2.1 Delete the per-function mapping branches; calls emit generically with structural arity checks. Reject `isqrt(`, bare `floor(`, bare `sqrt(` with clean canonical-form problems.
- [ ] 2.2 Full suite green, parsed-equal TAP gate (modulo documented `Fbm.`-qualification diffs in diagnostics). Primitives + prelude unchanged.

## 3. Docs

- [ ] 3.1 HELP.md spelling-canonical docs (one way per call, with the legacy→canonical table).
