# Tasks

## 1. ilb + ilog (acceptance)

- [ ] 1.1 Hand-prove `ilb` via `@by-proof` (strong induction on `N.toNat`, call site `N>>1`), transplant the motive/call-site inference into the `@by-induction` skeleton (new countdown pattern), shrink `ilb` to the clause. TAP byte-identical for `ilb`.
- [ ] 1.2 Apply the same pattern to `ilog` (`x/10` countdown). Expect it free; if the guard shape differs, generalize once.
- [ ] 1.3 Regression: full math suite + primitives + prelude green, `!`/`nck` unaffected. Document the new pattern(s) in HELP.md.

## 2. __tail_loop stretch (unlocks the wrapper chains)

- [ ] 2.1 Attempt `__tail_loop` (atan core) with explicit-measure clause (measure `odd`, countdown by 2, accumulator state). If it closes, repeat for atanh core; `__parts` + `_atan__core_scaled` lift as follow-ups (not in this change).
- [ ] 2.2 If the stretch resists after a few attempts, park with updated reason and close the change on step 1.

## 3. gcd attempt (time-boxed, optional)

- [ ] 3.1 Attempt well-founded induction for `gcd` reusing `Nat.gcd`-adjacent relations. On success, delete the `@assume` clause; on resistance, leave assumed with no TAP change. Either outcome closes the task.
