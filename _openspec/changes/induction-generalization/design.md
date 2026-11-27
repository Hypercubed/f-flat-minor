# Design

## Context

`@by-induction` today (Prover.lean induction skeleton): `N - 1` (strong Nat induction on `N.toNat`, generalizing queue/rest/inputs, needs nonneg) and `R.length` (List induction on the rest). The seq-split keystone added `Spec.seq`-splitting at `Tok.call` + branch backtracking, which made `N - 1` work for tail-plus-combine recursion (`!`). What remains is the *motive generalization*: which decreasing quantity the induction is over, and how the IH instantiates at the call site.

## Goals / Non-Goals

**Goals:** `ilb` + `ilog` green via generalized skeleton (acceptance); `__tail_loop` (both cores) as stretch; `gcd` via well-founded induction if it falls out, else stays `@assume`d.
**Non-Goals:** double/lexicographic recursion (`ack` — clean failure); composer `ensures`; statement-shape changes; touching the `N-1`/`R.length` paths (regression-gated).

## Decisions

- **Transplant-then-generalize (seq-split pattern)**: hand-prove `ilb` once via `@by-proof` (division-countdown induction is standard: strong induction on `N.toNat`, call site `N>>1 < N` for `N ≥ 2` by `omega`), then lift the motive/call-site inference into the skeleton. `ilb` is the `!` of this pass.
- **Measure inference from the call site**: the skeleton already walks to the `Tok.call` (seq-split); extend it to read the *argument expression* at the call (`N>>1`, `N/10`, `odd-2`) and the *guard* that ensures decrease (`1 >` branch condition, `positive?` test), proposing the decreasing measure + side-goal. Where inference is ambiguous, an explicit-measure clause (`@by-induction <pattern> on <measure>`) beats guessing — same escape-hatch philosophy as the closers' positivity hook.
- **`gcd` via `Nat.gcd`-adjacent well-founded induction**: Lean core has `Nat.gcd` + `Nat.mod_lt`-style lemmas; the F♭m `__t` step (`tuck %`) mirrors `Nat.gcd`'s recursion. If the skeleton can reuse that well-founded relation, `gcd`'s `@assume` deletes. If not, `gcd` stays assumed — explicitly out of the acceptance gate, attempt-only.
- **Acceptance order**: `ilb` → `ilog` (same shape, second word free) → `__tail_loop` stretch → `gcd` attempt. Each step parsed-equal TAP gated; `!`/`nck`/suites stay green throughout.

## Risks / Trade-offs

- **Risk**: measure inference misfires on accumulator loops (`__tail_loop` carries `u v p q` state; the decreasing thing is `odd`, not the stack). → **Mitigation**: explicit-measure clause from the start for accumulator words; inference only for single-argument countdowns.
- **Risk**: `gcd` well-founded attempt burns the pass. → **Mitigation**: time-boxed attempt-only; `@assume` remains a supported state, not a failure.
