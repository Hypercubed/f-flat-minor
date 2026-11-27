# Proposal

## Why

Recursive words like `gcd` need induction machinery that does not exist yet (`@by-induction` covers only `N - 1` and `R.length`; `gcd` needs well-founded remainder-decrease), but non-recursive callers such as `lcm` (`dup2 gcd / *`) are otherwise provable today — straight-line shuffles over a single opaque callee boundary. Without an explicit "assumed lemma" mechanism, `lcm` stays blocked behind `gcd`'s missing proof, and the only workaround is a failing `gcd` theorem that keeps the suite red and conflates "assumed" with "broken".

## What Changes

- Add an `@by-axiom <justification>` proof clause to the `@effect` DSL (fourth alternative alongside `@by-proof` / `@by-induction`, same one-clause rule and `sorry`/`admit`/`axiom` rejection).
- `generate.py` emits an assumed word's `Spec` statement as a Lean `axiom` (identical statement the prover would produce, with the justification in a comment) instead of a `theorem ... := by fbm_verify`; `Prog` emission and caller dep lists work unchanged.
- `check.py` reports assumed theorems as `ok ... # ASSUMED: <justification>` so the suite stays green with the assumption visible in TAP output.
- Document the `@by-axiom` lifecycle in `lean-proof/HELP.md` (assume now, prove later, delete the clause) and the audit convention (`grep axiom` lists open assumptions).
- First users: `@by-axiom` on `gcd` (well-founded remainder-decrease, beyond current induction patterns), proving `lcm` (`dup2 gcd / *`) compositionally over the assumed lemma.

## Capabilities

### Modified Capabilities
- `lean-effect-prover`: assumed-lemma emission and assumption-aware TAP reporting extend the `@effect` verification contract (new clause kind, new axiom emission path, new TAP marker).

## Impact

- `lean-proof/generate.py` (`_split_proof_clauses`, `EmitCtx.emit`: axiom path, ~50 lines).
- `lean-proof/check.py` (ASSUMED marker detection + TAP note, ~20 lines).
- `lean-proof/HELP.md` (assumption lifecycle + audit docs).
- `ff/lib/math/gcd.ffp` (`@by-axiom` on `gcd`, `@effect` on `lcm`: first assumed/proved pair).
- No `Fbm/Prover.lean` changes; no spec-language extensions; assumed lemmas are type-identical to proven ones, so replacing an assumption with a real proof recompiles all callers unchanged.
