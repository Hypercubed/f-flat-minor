# Proposal

## Why

`generate.py`'s expression emitter maintains a per-function mapping table: `gcd(A,B)`→`igcd`, `sqrt(N)`→`fsqrt`, `fact(N)`→`fact` (passthrough), `min(a,b)`→application, each with arity validation and its own branch. Every new spec function adds a row. But the mapping exists only because Lean-side names *differ* from effect spellings. If Lean defs are named exactly what effects say, the whole table collapses into the generic call case (already working for `min`/`fact`): parse `name(args)`, emit `name args`, done. This is the same "move complexity to Lean" thesis as the `⌊⌋` notation — applied to the bigger, duller half of the emitter.

## What Changes

- Rename Lean-side spec helpers to their effect spellings, `Fbm`-namespaced to avoid core clashes: `igcd`→`Fbm.gcd`, `fsqrt`→`Fbm.sqrt` (keeping computational `isqrt` as-is), plus `Fbm`-scoped `⌊e⌋` notation elaborating to the floor application.
- Delete the per-function mapping branches in the emitter; calls pass through generically with arity checked structurally (argument count vs binder count, not per-name tables).
- Effect authors write `gcd(A,B)`, `sqrt(X)` (always under `⌊...⌋`), `fact(N)`; bare-`sqrt` and legacy `isqrt(`/`floor(` spellings become clean problems.
- No proof changes: renames are statement-level; `floor_sqrt`-style simp bridges move with their defs; TAP text changes (effect bodies unchanged — only Lean-side names).

## Capabilities

### Modified Capabilities
- `lean-effect-prover`: effect-spelling/Lean-def name identity (pass-through calls, `Fbm`-scoped notation), enforced by translator rejection of legacy spellings.

## Impact

- `lean-proof/Fbm/Arith.lean` (renames + `⌊⌋` notation, `Fbm` namespace), `lean-proof/Fbm/Interp.lean` (no renames needed — operator helpers already match — but confirm `Fbm` qualification doesn't break `step`).
- `lean-proof/generate.py` (delete mapping branches; generic call emission; legacy-spelling rejections).
- `ff/lib/math/*` (landed effect-text change: 5 effect lines in `sqrt.ffp` migrated to the canonical `⌊sqrt(...)⌋` spelling — 6 occurrences including `isqrtrem`'s two — plus matching plain comments; follow-up renames the surface to `⌊...⌋₀` for toward-zero truncation; Lean-side targets moved to `Fbm.*` otherwise).
- `lean-proof/HELP.md` (spelling-canonical docs: one way to write each call).
- Gate: parsed-equal TAP (modulo Lean-side name changes in diagnostics, documented).
