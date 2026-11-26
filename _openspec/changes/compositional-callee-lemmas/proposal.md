# Proposal

## Why

`lean-proof/generate.py` inlines all non-recursive word calls to flat
primitive tokens. A word like `clamp` (`dig max min` in
`ff/lib/math/arith.ffp`) arrives at the runQ router as 40+ primitives
containing two `?` dispatches (one each from `max`/`min` via `sort2`),
and the router refuses it ("a runQ cond effect needs exactly one `?`
in its program"). The same wall blocks `abs`
(`dup negitive? [ -1 * ] ?` — the cond-prefix simulator cannot name a
value pushed by a defined-word call).

The 2026-11-22 `compositional-lean-prover` change already decided the
cure — *apply dependency lemmas at word boundaries instead of
inlining* — but built it only for the recursive frontier
(`loop`/`times`/`seq` via `_loop`, using `("call", word)` markers and
`Tok.call` + `lookup defs`). This change extends that mechanism to all
annotated callees.

## What Changes

- `generate.py` emits `Prog` definitions as `++`-compositions
  referencing annotated callee `Prog`s (e.g.
  `clampProg := digProg ++ maxProg ++ minProg`-shaped) instead of
  flattening them, per the archived Nov 22 decision (`branchProg :=
  chooseProg ++ [Tok.eval]`, never `Tok.call` opcodes).
- `Fbm/Prover.lean` (`fbm_verify`): when an applied callee lemma's
  post contains an `if` (conditional callee: `sort2`, `max`, `min`),
  split the goal per case instead of requiring a concrete flag.
- Acceptance: `clamp` proves with no `@by-proof`; `abs` reassessed
  against the new machinery (same machinery or `@by-proof` over
  existing lemmas); all existing suites green with identical counts.

## Capabilities

### New Capabilities

- `lean-callee-composition`: Non-recursive `@effect` proofs compose
  annotated callee theorems at word boundaries instead of inlining
  callee bodies to primitives.

### Modified Capabilities

## Impact

- `lean-proof/generate.py` (Prog emission: callee-`Prog` `++`
  references, generalized frontier).
- `lean-proof/Fbm/Prover.lean` (`fbm_verify`: conditional-hypothesis
  splitting).
- `ff/lib/math/arith.ffp` (`clamp`, possibly `abs`: `-effect` to
  `@effect`).
