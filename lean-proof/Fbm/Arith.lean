/- Fbm.Arith: proven-once computational arithmetic identities.

   Home for ALL computational arithmetic identities (`int_pow_two`,
   `int_shl_one`, ...) that generated `@effect` proofs need. It
   imports only `Fbm.Interp` (for `shl` etc.) and core Lean -- NEVER
   `Fbm.Prover`, never Mathlib. Generated files carry
   `import Fbm.Arith` (see `LEAN_HEADER` in `generate.py`); also home
   for opaque spec-side helpers (`igcd`, `isqrt`, `fsqrt`, `floor`)
   that effects name
   but `step` never computes. When
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

/-- Greatest common divisor on Int (F♭m `gcd(A,B)` in effects).
    Defined from `Nat.gcd` on magnitudes; `igcd` is the Lean-side
    name so the `gcd(...)` effect spelling has a target (same
    pattern as `land`/`lor`). Not `@[simp]`: it is an opaque spec
    function for assumed/proved lemmas, not computed by `step`. -/
def igcd (a b : Int) : Int := (Nat.gcd a.natAbs b.natAbs : Int)

/-- Integer square root on Int (F♭m `isqrt(N)` in effects;
    prefer `floor(sqrt(N))` for the integer root). Defined from
    `Nat.sqrt` on `toNat`; callers require `0 ≤ n` so the conversion
    is exact. Same pattern as `igcd`: an opaque spec function for
    assumed/proved lemmas, not computed by `step`, hence not
    `@[simp]`. -/
def isqrt (a : Int) : Int := (Nat.sqrt a.toNat : Int)

/-- Exact (real) square root at spec level (F♭m `sqrt(N)` in effects;
    write `floor(sqrt(N))` for the integer root). Lean core has no
    `Real`, so the real-number meaning is carried by documentation
    plus `floor_sqrt` below, not by computation: `fsqrt` unfolds to
    `isqrt`, and the floor is taken explicitly at each use site.
    Same pattern as `igcd`/`isqrt`: opaque spec function, never
    computed by `step`, hence not `@[simp]`. -/
def fsqrt (a : Int) : Int := isqrt a

/-- Floor at spec level: takes the floor of an exact-root spec
    function. On `Int` this is the identity — it exists so the
    `floor(...)` effect spelling has a target and the exact-vs-floored
    distinction is explicit in effect text. Not `@[simp]`; rewrite
    via `floor_sqrt`. -/
def floor (a : Int) : Int := a

/-- Connecting lemma: flooring the exact root is the integer root.
    Marked `@[simp]` so the `fbm_verify` closer rewrites stated
    `floor (fsqrt X)` goals to the `isqrt X` form the composition
    lemmas produce. Axioms: standard only. -/
@[simp] theorem floor_sqrt (a : Int) : floor (fsqrt a) = isqrt a := rfl

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

/-- Binary log on Nat by countdown (`ilb` spec): `ilbNat n = 0` for
    `n < 2`, else `ilbNat (n/2)+1`. Mirrors the F♭m `ilb` recursion
    (`1 >> ilb ++`) on `toNat` (see `shr_toNat` below). Terminates
    since `n/2 < n` for `n ≥ 2` (`omega`). Axioms: standard only. -/
def ilbNat (n : Nat) : Nat :=
  if n < 2 then 0 else ilbNat (n / 2) + 1
termination_by n
decreasing_by simp_wf; omega

/-- Decimal log on Nat by countdown (`ilog` spec): `ilog10Nat n = 0`
    for `n < 10`, else `ilog10Nat (n/10)+1`. Mirrors the F♭m `ilog`
    recursion (`10 / ilog ++`) on `toNat` (see `tdiv_toNat` below).
    Axioms: standard only. -/
def ilog10Nat (n : Nat) : Nat :=
  if n < 10 then 0 else ilog10Nat (n / 10) + 1
termination_by n
decreasing_by simp_wf; omega

/-- Binary log on Int (F♭m `ilog2(X)` in effects). Defined from
    `ilbNat` on `toNat`; callers require `0 ≤ X` so the conversion
    is exact. Same pattern as `isqrt`/`igcd`. -/
def ilog2 (a : Int) : Int := (ilbNat a.toNat : Int)

/-- Decimal log on Int (F♭m `ilog10(X)` in effects). Defined from
    `ilog10Nat` on `toNat`; callers require `0 ≤ X`. -/
def ilog10 (a : Int) : Int := (ilog10Nat a.toNat : Int)

/-- Unfold for `ilbNat`: mirrors the program branch. -/
theorem ilbNat_unfold (n : Nat) :
    ilbNat n = if n < 2 then 0 else ilbNat (n / 2) + 1 := by
  unfold ilbNat
  rw [ilbNat.eq_def]

/-- Unfold for `ilog10Nat`. -/
theorem ilog10Nat_unfold (n : Nat) :
    ilog10Nat n = if n < 10 then 0 else ilog10Nat (n / 10) + 1 := by
  unfold ilog10Nat
  rw [ilog10Nat.eq_def]

/-- `shr a 1` on `toNat` is `a.toNat / 2` for `0 ≤ a` (program
    `1 >>` meets spec `n/2`). Via `shiftRight_eq_div_pow` + the
    `natCast_ediv` bridge. Axioms: standard only. -/
@[simp] theorem shr_toNat (a : Int) (h : 0 ≤ a) :
    (shr a 1).toNat = a.toNat / 2 := by
  unfold shr
  simp only [show (0 : Int) ≤ 1 by decide, ite_true]
  have h1 : (1 : Int).toNat = 1 := rfl
  rw [h1, Int.shiftRight_eq_div_pow]
  simp
  have h2 : ((2 : Nat) : Int) = (2 : Int) := by norm_cast
  rw [← h2]
  have ha : a = (a.toNat : Int) := (Int.toNat_of_nonneg h).symm
  rw [ha, ← Int.natCast_ediv, Int.toNat_natCast, Int.toNat_natCast]

/-- `tmod a 10 = a % 10` (emod) for `0 ≤ a`: trunc mod meets
    Euclidean mod on nonneg. Via `natCast_emod`. Axioms: standard. -/
theorem tmod10_eq (a : Int) (h : 0 ≤ a) :
    tmod a 10 = a % 10 := by
  unfold tmod
  have hn : ¬ a < 0 := by omega
  simp only [hn, ite_false]
  have ha : ((a.natAbs : Nat) : Int) = a := Int.natAbs_of_nonneg h
  have h10 : (10 : Int).natAbs = 10 := rfl
  rw [h10]
  have hcast : ((Nat.mod a.natAbs 10 : Nat) : Int)
      = ((a.natAbs : Int) % ((10 : Nat) : Int)) := by
    show ((a.natAbs % 10 : Nat) : Int) = _
    rw [Int.natCast_emod]
  rw [hcast, ha]
  norm_cast

/-- Our `tdiv a 10 = a / 10` (ediv) for `0 ≤ a`. Via `tmod10_eq`
    + the `emod_add_mul_ediv` roundtrip. Axioms: standard only. -/
theorem tdiv10_eq (a : Int) (h : 0 ≤ a) :
    tdiv a 10 = a / 10 := by
  unfold tdiv
  simp only [show (10 : Int) ≠ 0 by decide, ite_false]
  rw [tmod10_eq a h]
  have hround : a % 10 + 10 * (a / 10) = a := Int.emod_add_mul_ediv a 10
  have hsub : a - a % 10 = 10 * (a / 10) := by omega
  rw [hsub, Int.mul_comm]
  exact Int.mul_ediv_cancel _ (by decide : (10 : Int) ≠ 0)

/-- `tdiv a 10` on `toNat` is `a.toNat / 10` for `0 ≤ a` (program
    `10 /` meets spec `n/10`). Via `tdiv10_eq` + the `natCast_ediv`
    bridge. Axioms: standard only. -/
@[simp] theorem tdiv10_toNat (a : Int) (h : 0 ≤ a) :
    (tdiv a 10).toNat = a.toNat / 10 := by
  rw [tdiv10_eq a h]
  have ha : a = (a.toNat : Int) := (Int.toNat_of_nonneg h).symm
  rw [ha]
  have h10 : (10 : Int) = ((10 : Nat) : Int) := by norm_cast
  rw [h10, ← Int.natCast_ediv, Int.toNat_natCast, Int.toNat_natCast]


/-- `0 ≤ shr a 1` for `0 ≤ a`: the countdown stays nonneg. `@[simp]`
    so `simp_all` discharges the `shr_toNat` side condition in
    decrease goals. -/
@[simp] theorem shr_nonneg (a : Int) (h : 0 ≤ a) : 0 ≤ shr a 1 := by
  unfold shr
  simp only [show (0 : Int) ≤ 1 by decide, ite_true]
  have h1 : (1 : Int).toNat = 1 := rfl
  rw [h1]
  exact Int.le_shiftRight_of_nonneg h

/-- `0 ≤ tdiv a 10` for `0 ≤ a`. -/
@[simp] theorem tdiv10_nonneg (a : Int) (h : 0 ≤ a) : 0 ≤ tdiv a 10 := by
  rw [tdiv10_eq a h]
  exact Int.ediv_nonneg h (by decide : (0 : Int) ≤ 10)

/-- Decrease for the `ilb` countdown: `shr a 1` shrinks `toNat`
    for `2 ≤ a`. Via `shr_toNat` + `Nat.div_lt_self`. -/
theorem shr_toNat_lt (a : Int) (h0 : 0 ≤ a) (h2 : 2 ≤ a) :
    (shr a 1).toNat < a.toNat := by
  rw [shr_toNat a h0]
  have hpos : 0 < a.toNat := by omega
  have := Nat.div_lt_self hpos (by decide : 1 < 2)
  omega

/-- Decrease for the `ilog` countdown: `tdiv a 10` shrinks `toNat`
    for `10 ≤ a`. -/
theorem tdiv10_toNat_lt (a : Int) (h0 : 0 ≤ a) (h10 : 10 ≤ a) :
    (tdiv a 10).toNat < a.toNat := by
  rw [tdiv10_toNat a h0]
  have hpos : 0 < a.toNat := by omega
  have := Nat.div_lt_self hpos (by decide : 1 < 10)
  omega

/-- `ilog2` unfold on Int (for `fbm_verify` `tryArithUnfold`):
    pushes the `if` through `toNat`. -/
theorem ilog2_unfold (a : Int) (h0 : 0 ≤ a) :
    ilog2 a = if a < 2 then 0 else ilog2 (shr a 1) + 1 := by
  unfold ilog2
  rw [ilbNat_unfold]
  by_cases hc : a.toNat < 2
  · have hcond : a < 2 := by omega
    simp [hcond, hc]
  · have hcond : ¬ a < 2 := by omega
    simp [hcond, hc, shr_toNat a h0]

/-- `ilog10` unfold on Int. -/
theorem ilog10_unfold (a : Int) (h0 : 0 ≤ a) :
    ilog10 a = if a < 10 then 0 else ilog10 (tdiv a 10) + 1 := by
  unfold ilog10
  rw [ilog10Nat_unfold]
  by_cases hc : a.toNat < 10
  · have hcond : a < 10 := by omega
    simp [hcond, hc]
  · have hcond : ¬ a < 10 := by omega
    simp [hcond, hc, tdiv10_toNat a h0]
