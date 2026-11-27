# Design

## Context

See `proposal.md`. This change adds the smallest mechanism that unblocks
non-recursive callers of unproven recursive words: an explicit,
auditable assumption recorded in the DSL itself.

Today `_split_proof_clauses` (generate.py) splits a trailing
`@by-proof <tactic>` / `@by-induction <pattern>` off the effect body
(at most one; combined use is an error; `sorry`/`admit`/`axiom`
rejected up front). `EmitCtx.emit` then selects the proof body:
custom tactic, induction skeleton, or uniform `fbm_verify [...]`.
A recursive word without either clause is a clean problem ("needs
`@by-proof` or `@by-induction`"), and its callers cannot cross its
`Tok.call` boundary (no lemma exists). The staging hack — annotate
`gcd`, let it fail, apply the failed theorem from `lcm` — works
mechanically but keeps the suite red and erases the
assumed-vs-broken distinction.

## Goals / Non-Goals

**Goals:**
- `@by-axiom` clause parsed, recorded, and emitted as an axiom with
  justification; `Prog` + caller deps unchanged; TAP green with
  ASSUMED marker; `gcd`/`lcm` as first users.
- Assumption-to-proof upgrade path is deletion-only (remove the
  clause; everything downstream recompiles unchanged).

**Non-Goals:**
- New induction machinery (assumed words stay assumed until a later
  change proves them; `gcd`'s well-founded induction is separate work).
- General `axiom` support (`@lean` blocks and `@by-proof` still
  reject them; only the generator's own axiom emission is allowed).
- Spec-expression extensions (the assumed `Spec` statement is built
  by the existing emission path, not new syntax).

## Decisions

- **Clause, not comment flag**: `@by-axiom` rides the existing
  proof-clause slot (`_split_proof_clauses`, one-clause rule) so it
  composes with `requires`/`ensures` and gets the same safety
  rejection. A parked `-effect` stays "not yet specified"; `@by-axiom`
  means "specified, proof deferred" — different states, different
  markers. Naming: `@by-proof` / `@by-induction` are proof-body
  selectors answering "how is this theorem discharged?"; `@by-axiom`
  is the fourth answer ("by axiom") in the same family, so it inherits
  the one-clause rule, tail position, and `sorry`/`admit`/`axiom`
  rejection for free instead of re-specing parallel behavior.
- **Statement-identical axioms**: the axiom carries exactly the
  `Spec` statement `emit` would have proven, built by the same code
  path up to proof-body selection. Callers, dep lists, `fbm_verify`
  application, and check.py theorem attribution all work unchanged;
  only the proof body differs (`axiom` vs `theorem ... := by ...`).
- **TAP `ok` + ASSUMED diagnostic**: an axiom is accepted by Lean
  silently, so check.py detects the generator's `-- ASSUMED`
  marker above the axiom and appends `# ASSUMED: <justification>`.
  Suite stays green (assumptions are declared debt, not failures);
  `grep ASSUMED` / `grep axiom` audits them. A future strict mode
  (`--no-assume`) can fail on markers without changing emission.
- **No Prover changes**: `fbm_verify` applies an axiom-named lemma
  the same as a theorem-named one (both are just environment
  entries); nothing in `Fbm/Prover.lean` needs to know.
- **First users are `gcd`/`lcm`**: `gcd` gets
  `@by-axiom remainder-decrease needs well-founded induction beyond
  N-1/R.length patterns`; `lcm` gets a plain `@effect`
  (`L = A*B/gcd(A,B)` over the assumed lemma, straight-line
  shuffles). Proves the mechanism end to end on the motivating case.

## Risks / Trade-offs

- **Risk**: a false assumption makes downstream proofs green
  vacuously. → **Mitigation**: justification text mandatory (empty
  `@by-axiom` is a parse error); audit convention (`grep axiom`);
  assumed words listed in HELP.md until discharged; archive review
  treats open assumptions as debt, not done.
- **Risk**: axiom vs theorem name collision if a word is both
  assumed and proven in one run. → **Mitigation**: one-clause rule
  already forbids `@by-axiom` + `@by-proof`/`@by-induction` on the
  same effect; generator errors if two effects on one word mix
  assumed and proven clauses.
- **Risk**: `lcm`'s `ensures` needs a `gcd(A,B)` function spelling
  the translator may not know. → **Mitigation**: one-line mapping
  in the expression emitter (same pattern as `land`/`lor` helpers),
  translating to a Lean-side `Nat.gcd`-based helper; falls back to
  a clean problem naming the missing mapping if it proves awkward.
