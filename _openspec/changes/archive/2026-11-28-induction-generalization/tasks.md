# Tasks

## 1. ilb + ilog (acceptance)

- [x] 1.1 Hand-prove `ilb` via `@by-proof` (strong induction on `N.toNat`, call site `N>>1`), transplant the motive/call-site inference into the `@by-induction` skeleton (new countdown pattern), shrink `ilb` to the clause. TAP byte-identical for `ilb`.
- [x] 1.2 Apply the same pattern to `ilog` (`x/10` countdown). Expect it free; if the guard shape differs, generalize once.
- [x] 1.3 Regression: full math suite + primitives + prelude green, `!`/`nck` unaffected. Document the new pattern(s) in HELP.md.

## 2. __tail_loop stretch (unlocks the wrapper chains)

- [ ] 2.1 PARKED `__tail_loop` (atan core) with explicit-measure clause (measure `odd`, countdown by 2, accumulator state). Four induction attempts: (i) partial `ih_call` (all vars free) misfires at the top-level goal and strands `m = m - 2`; (ii) full application pins accumulators to rigid fvars that never match the computed call-site expressions (also found the nonneg motive premise is false for a by-2 step: `ODD = 1` recurses at `-1`); (iii) measure-first partial `ih_call` reaches the call site but the composer doom-loops over the 3-level-nested dip quotations (`iteration limit, 13 goals`, `Stack` goals, unassigned `S`/`defs'` midpoint metas). Proven in isolation: WF model `tailP`/`tailQ` + split-free base/step unfolds (kept in `atan-core.ffp` `@lean`), explicit motive, base arm green. Blockers for resume: single-word-literal rule forces helper inlining (quotation-manipulating helpers cannot take plain `@effect`s — runQ demands slots); composer must learn the nested-dip case. Do NOT attempt atanh core until atan core lands.
- [x] 2.2 Parked with reason (see 2.1, design.md Risks, HELP.md by-2 status); change closes on step 1 (`ilb`/`ilog` green, suite green, no new assumptions).

## 3. gcd attempt (time-boxed, optional)

- [ ] 3.1 Attempt well-founded induction for `gcd` reusing `Nat.gcd`-adjacent relations. On success, delete the `@assume` clause; on resistance, leave assumed with no TAP change. Either outcome closes the task.
