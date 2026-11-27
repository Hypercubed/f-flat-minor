# Design

## Context

Effects today have three expression families: (1) arithmetic/bitwise via symbolic operators translated to helpers (`&`→`land`, `^`→power with `.toNat`), (2) named calls mapped one-to-one to Lean helpers (`min(a,b)`, `gcd(A,B)`→`igcd`, `sqrt(N)`→`isqrt`, `intRange(A,B)`), (3) `iterates(F,N,A)` sugar for single iteration over `SpecHist2`. Tetration needs a fourth shape: the iterated *function* is itself parameterized by the base. Precedent closest in kind: `iterates` (takes F, N, A) — but F there is a bare function variable, not a function *expression*.

## Goals / Non-Goals

**Goals:** pick one spelling, implement the mapping + helper, rewrite `^^`'s effect, document. Translator-only; proof stays parked on the tactic half.

**Non-Goals:** pentation spelling (follow-up; likely falls out as tower-of-towers or a rank parameter — decide after `^^` lands), proof machinery, new clause kinds.

## Decisions

Candidate notations to explore (pick one; criteria: parses in the spaceless effect grammar, reads as mathematics, extends to rank):

- **Option A — `tower(A,B)`**: plain named call, consistent with `gcd(A,B)`/`intRange(A,B)`. Reads as "power tower of A of height B". Pentation later: `tower(tower(A,B),...)` nests poorly (that's not what pentation *is*); more likely a second helper or rank arg. Simplest, least expressive.
- **Option B — `A^^B` in effects**: reuse the F♭m operator spelling inside effect outputs (the def already writes `^^`; the effect language already special-cases operator translation for `^`). Most faithful: the effect says what the word says. Cost: the expression grammar treats `^^` (and `^^^`) as new operators needing precedence/associativity entries; spaceless parsing of `A^^B` vs `A^ ^B` must be unambiguous.
- **Option C — rank-parameterized `hyper(R,A,B)`**: `hyper(2,A,B) = A^B`, `hyper(3,A,B) = A^^B`, `hyper(4,A,B) = A^^^B`. Generalizes to the whole Knuth family in one spelling; `__F_4`/`__F_5`/`^^`/`^^^` all become instances. Cost: the rank is a new kind of argument (a small literal, not a stack value); Lean-side needs the rank-indexed definition, the most machinery of the three.
- **Recommendation**: A for the first edit (one mapping, one helper, `^^` statable this session), with C noted as the direction if pentation + `__F` family ever unpark — B's grammar cost buys little over A's call form since effects already use f() spellings (`land(a,b)`) alongside symbols.

Lean-side helper shape (for A): `tower : Int → Int → Int` with `tower a 0 = 1`, `tower a (b+1) = a ^ (tower a b).toNat` — check slice direction against the def (`-- dup ... times` counts down from B; seed/edge cases `B = 0` must match what the word computes, verified on the interpreter before writing the effect).

## Risks / Trade-offs

- **Risk**: helper's edge cases disagree with the word (tower height 0/negative). → **Mitigation**: interpreter-probe the word on edge inputs first; `requires` guards the effect to the agreeing domain (same pattern as `/`'s `B ≠ 0`).
- **Risk**: picking A then wanting C later costs a rewrite. → **Mitigation**: A's mapping is ~5 lines; the rewrite is mechanical. C stays a documented option, not a commitment.
