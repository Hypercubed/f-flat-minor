# Proposal

## Why

The seq-split keystone (`@by-induction N - 1`, landed) covers only recursion where the recursive call is on `N-1`. The seq-split worker's stretch attempt confirmed the boundary: `ilb`/`ilog` (recurse on `x>>1` / `x/10`), `__tail_loop` (atan/atanh cores, `odd` countdown by 2 with accumulator state), exp series loops, and `gcd` (well-founded remainder decrease) all refuse the `N-1` IH. These are the highest-yield unproven words in the library — `__tail_loop` alone unlocks `__parts` → `_atan__core_scaled` → the `npi`/atan/log/`nexp` wrapper chains.

## What Changes

- Generalize the `@by-induction` skeleton in `lean-proof/Fbm/Prover.lean` beyond the two current patterns (`N - 1`, `R.length`): strong induction over a decreasing measure inferred from the recursive call site (division countdown, countdown-by-k, accumulator-carrying loops), plus well-founded induction for remainder-decrease (`gcd`).
- Acceptance: `ilb` + `ilog` prove via the generalized skeleton (same shape as the seq-split acceptance: `!` shrank to a clause, TAP byte-identical); stretch: `__tail_loop` (atan core) proves, unlocking `__parts`.
- No new clause kinds; no statement-shape changes; follows the transplant-then-generalize pattern (hand-proof the first instance, generalize the reasoning).

## Capabilities

### Modified Capabilities
- `lean-effect-prover`: generalized induction skeletons (measure-based strong induction + well-founded induction) in `fbm_verify`.

## Impact

- `lean-proof/Fbm/Prover.lean` (induction skeleton generalization; new measure inference).
- `ff/lib/math/log.ffp` (`ilb`, `ilog` effects), `ff/lib/math/atan-core.ffp` + `atanh-core.ffp` (`__tail_loop` stretch), `ff/lib/math/gcd.ffp` (`gcd` — replaces its `@assume` with a real proof if well-founded lands, else stays assumed).
- `lean-proof/HELP.md` (new patterns documented).
- Downstream unlocks (no changes in this edit, listed as follow-ups): `iln`, `nln2` (via `ilb`), `npi` → atan/log/exp wrapper chains (via `__tail_loop`).
