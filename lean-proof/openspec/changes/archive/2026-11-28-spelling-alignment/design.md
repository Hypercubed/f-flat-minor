# Design

## Context

Emitter today (`generate.py` ~640-680): per-name `if ast[1] in (...)` branches for `gcd`, `sqrt`, `isqrt`, `floor`, each with hand-written arity checks and target names. Generic call emission already exists (used by `min(a,b)`, `fact(N)`): parse name + args, emit application. The branches survive only because targets differ from spellings (`igcd`, `fsqrt`).

## Goals / Non-Goals

**Goals:** renames (`Fbm`-scoped), `⌊⌋` notation, branch deletion, legacy rejections, parsed-equal TAP gate.
**Non-Goals:** operator mappings (`%`→`tmod` etc. — genuinely F♭m-specific spellings with no Lean counterpart, stay); rest/quotation structure; routing (thin-generator's job); proof changes (renames only move statement text).

## Decisions

- **`Fbm` namespace, not globals**: `Fbm.gcd`, `Fbm.sqrt` avoid clashes with core/`Nat.gcd`/future Mathlib. Generated files already import `Fbm.Arith`; qualification is mechanical. `isqrt` (computational helper, no effect spelling after this change) stays unscoped or moves wherever its users live per the lib-cleanup rule.
- **`⌊e⌋₀` as `Fbm`-scoped notation** elaborating to the floor application (existing `floor` def, possibly renamed `Fbm.floor` for uniformity). Truncation toward zero (F♭m-native) — bare `⌊e⌋` without ₀ means floor toward -inf and stays reserved/rejected. Scoped so a future Mathlib import doesn't collide; migration then means deleting ours. Verify the exact `notation`/`syntax` form against Lean 4.36.0 and note the `source.lean`-version-style scope string in a comment (same practice as the lean-highlight change).
- **Arity checked structurally**: generic emission compares argument count to the target's binder count (available from the environment at emission time, or a small static table of `Fbm.*` specs — NOT per-spelling code paths). Wrong arity stays a clean problem.
- **Order with lib-cleanup handoff**: the handoff moves single-file helpers into `@lean` blocks. If it lands first, renames apply to the moved locations; if this lands first, the handoff moves the renamed defs. Either order works — coordinate on `Arith.lean` contents at build time, don't duplicate.
- **TAP gate modulo names**: TAP names effect text (unchanged — effects already read this way), but `#` diagnostics may show Lean-side names. Gate on test number + status + first diagnostic *stem* (modulo `Fbm.` qualification), documenting the accepted diff.

## Risks / Trade-offs

- **Risk**: `Fbm.` qualification breaks `step` or simp-normal forms that match on unqualified names. → **Mitigation**: renames are textual; `lake build` + full suite is the gate. `@[simp]` bridges move with their defs.
- **Risk**: `notation` precedence/associativity surprises in generated output. → **Mitigation**: `⌊e⌋` is a closed bracket form — no precedence interaction by construction. Probe in `/tmp` before editing the emitter.
