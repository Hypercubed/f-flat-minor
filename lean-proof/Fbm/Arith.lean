/- Fbm.Arith: proven-once computational arithmetic identities.

   Home for ALL computational arithmetic identities (`int_pow_two`,
   `int_shl_one`, ...) that generated `@effect` proofs need. It
   imports only `Fbm.Interp` (for `shl` etc.) and core Lean -- NEVER
   `Fbm.Prover`, never Mathlib. Generated files carry
   `import Fbm.Arith` (see `LEAN_HEADER` in `generate.py`); when
   Mathlib arrives, that import line switches to the Mathlib import,
   `ring` replaces these lemmas, and this file is deleted.

   Each lemma is `@[simp]` so the existing `simp_all` closer in
   `fbm_verify` picks it up with zero tactic changes. Each proof
   closes with core-Lean-only tactics (no Mathlib, no new solvers).

   Left out as needing-Mathlib: the `tdiv`/`tmod` roundtrip
   (`tdiv a b * b + tmod a b = a`) needs divisibility reasoning
   beyond `simp`/`omega`/`decide` (verified: `simp_all` makes no
   progress on the unfolded goal). -/
import Fbm.Interp

/-- `N ^ 2 = N * N` (unblocks `sqr: N == N^2`, whose ladder leaves
    `(N * N) :: rest` against the stated `(N ^ 2) :: rest`).
    Proved by two core `Int.pow` rewrites; the `[simp]` direction is
    `^`-to-`*` (the direction core `Int.pow_*` lemmas unfold), and no
    core simp lemma matches a literal `^ 2`, so it cannot loop with
    them. Axioms: standard only. -/
@[simp] theorem int_pow_two (N : Int) : N ^ 2 = N * N := by
  rw [Int.pow_succ, Int.pow_one]

/-- `shl N 1 = N * 2` (for the coming `<<1` family: one left shift
    is doubling). `Interp.shl` computes `N * (2 ^ (1).toNat)` here;
    `simp` discharges the `0 ≤ 1` guard and the literal
    `toNat` / `^` reductions. Axioms: standard only. -/
@[simp] theorem int_shl_one (N : Int) : shl N 1 = N * 2 := by
  unfold shl
  simp

/-- `N + N = 2 * N` (for the coming doubling family: `dup +`
    leaves `N + N` where effects state `2 * N`). Linear, so `omega`
    closes it. Axioms: standard only. -/
@[simp] theorem int_double (N : Int) : N + N = 2 * N := by
  omega
