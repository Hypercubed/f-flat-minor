# Tasks

## 1. Lean-side renames + notation

- [x] 1.1 Rename spec helpers to effect spellings under `Fbm` (`igcd`→`Fbm.gcd`, `fsqrt`→`Fbm.sqrt`; confirm `isqrt`'s post-cleanup home per the lib-cleanup rule). Add `Fbm`-scoped `⌊e⌋₀` truncation notation to the floor application (corrected from bare `⌊e⌋`: F♭m arithmetic truncates toward zero; bare `⌊⌋` means floor toward -inf and stays reserved). `lake build` clean.
- [x] 1.2 Probe `⌊...⌋₀` elaboration in `/tmp` (generated-shaped snippet) before touching the emitter.

## 2. Emitter pass-through + rejections

- [x] 2.1 Delete the per-function mapping branches; calls emit generically with structural arity checks. Reject `isqrt(`, bare `floor(`, bare `sqrt(`, bare `⌊...⌋` (without ₀), legacy `igcd(` with clean canonical-form problems (`⌊...⌋₀` canonical; `⌊...⌋` reserved for true floor).
- [x] 2.2 Full suite green, parsed-equal TAP gate (modulo documented `Fbm.`-qualification diffs in diagnostics). Primitives + prelude unchanged.

## 3. Docs

- [x] 3.1 HELP.md spelling-canonical docs (one way per call, with the legacy→canonical table; truncation-vs-floor distinction prominent: `⌊x⌋₀` house notation defined, `⌊x⌋` reserved).
