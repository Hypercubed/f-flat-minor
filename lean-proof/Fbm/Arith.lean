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
