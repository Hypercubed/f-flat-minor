/- Fbm.Arith: proven-once computational arithmetic identities.

   Home for the shared computational arithmetic identities
   (`int_pow_two`, `int_shl_one`, `int_double`) that generated
   `@effect` proofs need,    plus the opaque spec-side helper shared across files (`Fbm.gcd`). It imports only `Fbm.Interp` (for `shl`
   etc.) and core Lean -- NEVER `Fbm.Prover`, never Mathlib.
   Generated files carry `import Fbm.Arith` (see `LEAN_HEADER` in
   `generate.py`). When Mathlib arrives, that import line switches
   to the Mathlib import, `ring` replaces these lemmas, and this
   file is deleted.

   Single-file helpers live in their files' `@lean` blocks, not
   here (precedent: `factNat`/`fact` + helpers in `num.ffp`): the
   `ilog` cluster (`ilbNat`/`ilog10Nat`/`ilog2`/`ilog10` + unfolds,
   bridges, decrease lemmas) lives in `ff/lib/math/log.ffp`; the
   sqrt cluster (`isqrt`/`Fbm.sqrt`/`Fbm.floor`/`floor_sqrt` +
   `⌊e⌋₀` notation) lives in `ff/lib/math/sqrt.ffp`. Each lemma
   moved there is `@[simp]` or plain exactly as it was here, and
   `tryArithUnfold` picks up file-local `Eq` helpers generically,
   so no tactic changes were needed. Spelling-aligned calls
   (`gcd`→`Fbm.gcd`, `sqrt`→`Fbm.sqrt` under `⌊...⌋₀`) resolve via
   the emitter's `_FBM_SPECS` table
   (generated files carry `@lean` blocks verbatim and
   `open scoped Fbm`), so no import changes were needed either.

   Each lemma is `@[simp]` so the existing `simp_all` closer in
   `fbm_verify` picks it up with zero tactic changes. Each proof
   closes with core-Lean-only tactics (no Mathlib, no new solvers).

   Left out as needing-Mathlib: the `tdiv`/`tmod` roundtrip
   (`tdiv a b * b + tmod a b = a`) needs divisibility reasoning
   beyond `simp`/`omega`/`decide` (verified: `simp_all` makes no
   progress on the unfolded goal). -/
import Fbm.Interp

/- `Fbm`-scoped spec helper(s). The namespace exists so generated
   files can `open scoped Fbm` (see `LEAN_HEADER` in `generate.py`);
   the `⌊e⌋₀` truncation notation itself lives with its `Fbm.floor`
   target in `sqrt.ffp`'s `@lean` block, where it resolves at
   definition site. Bare `⌊e⌋` (floor toward -inf) is reserved. -/
namespace Fbm
/-- Greatest common divisor on Int (F♭m `gcd(A,B)` in effects).
    Defined from `Nat.gcd` on magnitudes; `Fbm.gcd` is the Lean-side
    name so the `gcd(...)` effect spelling emits with no per-function
    mapping branch (same pattern as `land`/`lor`). Not `@[simp]`: it
    is an opaque spec function for assumed/proved lemmas, not
    computed by `step`. -/
def gcd (a b : Int) : Int := (Nat.gcd a.natAbs b.natAbs : Int)
end Fbm

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
