# F♭m Arbitrary Precision Math Library

## Design Plan and Mathematical Foundations

---

## Remember This — F♭m Language Notes

> These notes were added based on implementation experience. They document F♭m behaviors that
> differ from standard Forth assumptions, and should be kept in mind when writing any series loop.

### Stack Words

| Word | Signature | Notes |
|------|-----------|-------|
| `rot` | `a b c -- c b a` | ⚠️ **Reverses** top three — NOT Forth's `a b c -- b c a` |
| `dig` | `a b c -- b c a` | This is what Forth calls `rot` |
| `bury` | `a b c -- c a b` | Inverse of `dig` |
| `swap` | `a b -- b a` | Standard |
| `dup` | `a -- a a` | Standard |
| `drop` | `a -- ` | Standard |
| `over` | `a b -- a b a` | Defined as `dupd swap` |
| `dup2` | `a b -- a b a b` | ⚠️ Use `dup2`, NOT `2dup` |
| `nip` | `a b -- b` | Defined as `swap drop` |
| `tuck` | `a b -- b a b` | Defined as `swap over` |
| `swapd` | `a b c -- b a c` | Swap second and third |
| `dupd` | `a b -- a a b` | Dup second item |
| `drop2` | `a b -- ` | Drop top two |

### Queue Words

| Word | Signature | Notes |
|------|-----------|-------|
| `q<` | `a -- ` | Push top of stack to queue |
| `q>` | ` -- a` | Pop from queue to top of stack |

> ⚠️ `q<` and `q>` **must always be balanced within a word**. Unbalanced calls corrupt queue
> state across word boundaries and produce silent wrong results.

### Combinators

| Word | Signature | Notes |
|------|-----------|-------|
| `times` | `a [B] n times` | ⚠️ Order is `[B] n`, NOT `n [B]` |
| `loop` | `a [B] loop` | Loop until false |
| `branch` | `a [B] [C] branch` | If/else |
| `slip` | `[A] b -- b a*` | Eval `[A]`, restore `b` |
| `dip` | `a [B] -- a b*` | Eval `[B]`, restore `a` |
| `sip` | `a [B] -- a b* a` | Eval `[B]` with `a`, restore `a` |
| `run` | `[A] -- a* [A]` | Eval `[A]`, keep `[A]` on stack |
| `bi` | `a [B] [C] -- b c` | Apply both to `a` |

### Other Primitives

- `^` — integer exponentiation (available as primitive)
- `>>` — arithmetic right shift
- `.` — print full stack without consuming (for debugging)

### Key Idioms for Loop State

When using `times`, `K` must be stashed before pushing initial loop state:

```f-flat-minor
word: q< <initial state> [step] q> times <extract result> ;
```

When carrying two values `A` and `x` through a loop where `A` is used to update `x`, prefer
`A x` order (parameter below value) so `over` copies `A`:

```f-flat-minor
/* ( A x -- A' x' ) */
step: over * ... swap <update A> ;
```

Use `nip` (not `drop`) to discard the parameter after `times`, keeping the result:

```f-flat-minor
word: q< A x0 [step] q> times nip ;
```

---

## Overview

This document describes a plan for implementing arbitrary precision transcendental math functions in F♭m — a minimal concatenative stack-based language using big integers as its single numeric type.

The approach is based on classical arbitrary-precision techniques: integer-only series recurrences, range reduction to small rational arguments, and a single scaled division at the end of each computation. No floating-point arithmetic is used at any stage.

All functions accept `n` — the number of decimal digits — as their sole precision argument, making all functions variable-precision rather than fixed to a global precision constant. Derived quantities `S = 10^n` and `K` (term count) are computed internally and never appear at the user level.

---

## Design Goals

* **Pure integer arithmetic** throughout — no floating point, no intermediate rounding
* **Variable precision** — every function takes `n` (decimal digits) as its sole precision argument
* **Rational inputs** — functions accept exact rational `u/v` arguments, avoiding precision coupling between caller and callee
* **Minimal primitives** — the entire library reduces to two series loop shapes plus integer algebra
* **Compositional** — higher functions are thin wrappers over the same core loop

---

## Two-Layer Design

The library is structured in two layers with different calling conventions.

### Layer 1 — Internal (parts) Layer

Words that return an unscaled rational `p q`, where the true value ≈ `p/q`. No division is performed. These are used when composing functions internally — e.g. implementing `log` from two `ln` calls — so that scaling happens only once at the outermost boundary.

Internal words may accept `n`, `S`, or `K` as needed. These are implementation details not exposed to the user.

```
n u v    exp-parts    \ ( n u v -- p q )   exp(u/v) ≈ p/q
n u v    ln-parts     \ ( n u v -- p q )   ln(u/v)  ≈ p/q
n u v    atan-parts   \ ( n u v -- p q )   atan(u/v) ≈ p/q
n u v    sin-parts    \ ( n u v -- p q )
n u v    cos-parts    \ ( n u v -- p q )
```

### Layer 2 — User-Facing (scaled) Layer

Words that return a scaled integer `S·x = 10^n · x`, truncated. These are thin wrappers: call the corresponding `-parts` word then apply `p/q*S` once.

```
n        e        \ ( n -- scaled )        e to n decimal digits
n u v    exp      \ ( n u v -- scaled )    exp(u/v) to n digits
n u v    ln       \ ( n u v -- scaled )    ln(u/v) to n digits
n u v    log      \ ( n u v -- scaled )    log₁₀(u/v) to n digits
n        pi       \ ( n -- scaled )        π to n digits
n u v    atan2    \ ( n u v -- scaled )    atan(u/v) to n digits
n u v    sin      \ ( n u v -- scaled )    sin(u/v) to n digits
n u v    cos      \ ( n u v -- scaled )    cos(u/v) to n digits
```

For example, `10 e` returns `27182818284`, representing `2.7182818284`.

### Why Rational In, Scaled Out

Inputs are exact rationals `u/v` — precision-independent, no approximation attached. Outputs are scaled integers — approximate, precision-dependent. The function boundary is exactly where the transition from exact to approximate occurs, which is what the function *is*. Making this explicit in the signature is correct.

### Composing Across Layers

When a scaled output needs to feed into another function as a rational input, the bridge is trivial: the scaled result becomes `u` and `S = 10^n` becomes `v`. Since `n` is available, `S` can be reconstructed at any point:

```
: scale->uv ( scaled n -- u v )   n->S ;   \ u = scaled, v = 10^n
```

Chaining `ln` into `exp`:

```
n u v ln-parts      \ n p q   (p/q ≈ ln(u/v))
rot                 \ p q n
dup n->S            \ p q n S   — reconstruct S for use as v
rot rot             \ n p S     — p is u, S is v
exp-parts           \ p' q'
n n->S p/q*S        \ final scaled result
```

Scaling happens exactly once regardless of how many functions are composed.

---

## Precision Helpers

These are internal words, not part of the user-facing API:

```
n->S   ( n -- S )            S = 10^n
n->K   ( n -- K )            K = ⌈n × 6/5⌉ + 10
p/q*S  ( p q n -- scaled )   (p · 10^n) / q   — the one division
```

Note: `p/q*S` takes `n` rather than `S` directly, deriving `S` internally. This keeps `n` as the single precision token threaded through all levels.

### Why `K = ⌈n × 6/5⌉ + 10`

For `e = Σ 1/k!`, the remainder after `K` terms is bounded by `1/K!`. We need `K! > 10^n`:

```
log₁₀(K!) ≈ K·log₁₀(K/e)  >  n
```

Solving gives `K` sublinear in `n`. The formula `⌈n × 6/5⌉ + 10` is a conservative closed-form overestimate that requires no logarithm to compute — important since `ln` is not yet available when bootstrapping. It wastes a few iterations but is always safe.

Reference term counts:

| digits `n` | terms `K` |
| --- | --- |
| 10 | 22 |
| 100 | 130 |
| 1000 | 1210 |
| 10000 | 12010 |

For the atanh/atan family (linear convergence), the same `K` is sufficient because range reduction brings the argument small enough that convergence is comparable to the exponential series.

### Implemented Definitions

```f-flat-minor
/* ( n -- 10^n ) */
n->S: 10 swap ^ ;

/* ( n -- K ) */
n->K: 6 * 4 + 5 / 10 + ;

/* ( p q n -- floor(p * 10^n / q) ) */
p/q*S: n->S swap rot * swap / ;
```

> **Derivation note for `p/q*S`**: F♭m's `rot` is `a b c -- c b a` (reversal of top three).
> Working trace with `1 2 1 p/q*S` (expect 5):
> ```
> 1 2 1
> n->S        → 1 2 10    ( p q S )
> swap        → 1 10 2    ( p S q )
> rot         → 2 10 1    ( q S p )   — rot reverses top three
> *           → 2 10      ( q p*S )
> swap        → 10 2      ( p*S q )
> /           → 5         ✓
> ```

> **Verified test cases**:
> ```
> 1 2 1 p/q*S  →  5
> 1 2 2 p/q*S  →  50
> 1 3 3 p/q*S  →  333
> 2 3 3 p/q*S  →  666
> 1 1 4 p/q*S  →  10000
> ```

---

## The Two Series Shapes

Every function reduces to one of two series structures.

### Shape 1 — Exponential Family

```
f(x) = Σ_{k=0}^{∞}  xᵏ / k!
```

Covers: `exp(x)`, `cosh(x)`, `sinh(x)`, `cos(x)`, `sin(x)`

**Recurrences** for `x = u/v`:

```
q₀ = 1
p₀ = 1
t₀ = u                    (running power of u)

qₙ₊₁ = qₙ · (n+1) · v
pₙ₊₁ = pₙ · (n+1) · v  +  sign(n) · tₙ
tₙ₊₁ = tₙ · u
```

* `sign(n) = 1` always for `exp`, `cosh`, `sinh`
* `sign(n) = (-1)^n` for `cos` (even terms), `sin` (odd terms)
* `cosh` keeps only even-index terms; `sinh` keeps only odd-index terms

For `e` specifically, `u = v = 1` and the `t` tracker is not needed:

```
q₀ = 1,  qₙ₊₁ = qₙ · (n+1)        →  qₖ = K!
p₀ = 1,  pₙ₊₁ = pₙ · (n+1) + 1
```

### Shape 2 — Atanh/Atan Family

```
f(x) = 2 · Σ_{k=0}^{∞}  x^(2k+1) / (2k+1)
```

Covers: `atanh(x)` (→ `ln`), `atan(x)` (→ `π`, trig inverse functions)

The factor of 2 is absorbed into `p₀`. Let the argument be `c/d`:

```
q₀ = d
p₀ = 2c
t₀ = c³                   (running odd power of c, starting at c³)

qₙ₊₁ = qₙ · (2n+3) · d²
pₙ₊₁ = pₙ · (2n+3) · d²  +  sign(n) · 2 · tₙ
tₙ₊₁ = tₙ · c²
```

* `sign(n) = 1` always for `atanh`
* `sign(n) = (-1)^n` for `atan`

The key structural difference from Shape 1: the denominator multiplier is `(2n+3) · d²` (quadratic step), and only odd powers of `c` appear.

---

## The Generic Loop Structure

Both shapes fit one generic recurrence:

```
qₙ₊₁ = qₙ · Aₙ
pₙ₊₁ = pₙ · Aₙ + Bₙ · tₙ
tₙ₊₁ = tₙ · C
```

Where `Aₙ`, `Bₙ`, `C` are function-specific integer sequences:

| Function | `Aₙ` | `Bₙ` | `C` |
| --- | --- | --- | --- |
| `e` | `n` | `1` | `1` |
| `exp(u/v)` | `n · v` | `1` | `u` |
| `cos(u/v)` | `n(n-1) · v²` | `(-1)^n` | `u²` |
| `sin(u/v)` | `n(n-1) · v²` | `(-1)^n` | `u²` |
| `atanh(c/d)` | `(2n+3) · d²` | `2` | `c²` |
| `atan(c/d)` | `(2n+3) · d²` | `2·(-1)^n` | `c²` |

**Critical property**: `p` and `q` are independent loops — `p`'s recurrence does not depend on `q`'s current value and vice versa. They share only the loop counter `n`. This means they can be computed in separate words with no inter-loop stack shuffling.

The `t` tracker lives only inside the `p` loop.

> **Implementation note**: Rather than tracking the step index `n` to recompute `Aₙ` each step,
> carry `A` directly on the stack and increment it by a fixed delta. For the atanh family with
> `d²=9`: `A₀=27, A₁=45, A₂=63, ...` — each step adds `18`. This avoids needing `n` on the
> stack entirely and simplifies the loop body significantly.

---

## The Final Division

At the end of either series, the result is:

```
result_scaled = (p · S) / q
```

This is the **only division** in the entire computation. All intermediate steps are integer multiply and add only.

For `e`, the exact identity is `e = 1 + p/q`, but since `p₀ = 1` and `q₀ = 1` with the recurrence given above, the leading 1 is already absorbed and `e = p/q` directly at the end.

---

## Separate `p` and `q` Loops

Rather than a single interleaved loop carrying four values (`p`, `q`, `t`, `n`), the design separates computation into two independent words:

```
: compute-q ( ... K -- q )   \ product recurrence only
: compute-p ( ... K -- p )   \ sum recurrence, carries t internally
```

This eliminates the main source of stack shuffling. Each word has a clean, single-purpose loop.

For `e`:

```
compute-q ( K -- q ):
    q = 1
    n = K downto 1: q = q * n     \ = K!  (order doesn't matter)

compute-p ( K -- p ):
    p = 1
    n = 1 upto K: p = p * n + 1  \ order matters — must count up
```

Note: `q` is a pure product and can count in either direction. `p` must count upward because the recurrence is defined left-to-right.

For `exp(u/v)`:

```
compute-q ( v K -- q ):
    q = 1
    n = 1 upto K: q = q * n * v

compute-p ( u v K -- p ):
    p = 1,  t = u
    n = 1 upto K:
        p = p * n * v + t
        t = t * u
```

For `atanh(c/d)` / `atan(c/d)`:

```
compute-q ( d K -- q ):
    q = d
    n = 0 upto K-1: q = q * (2n+3) * d * d

compute-p ( c d K -- p ):
    p = 2*c,  t = c*c*c
    n = 0 upto K-1:
        p = p * (2n+3) * d * d + 2 * t    \ atanh: always +
        p = p * (2n+3) * d * d + sign * 2 * t  \ atan: alternating
        t = t * c * c
```

---

## Range Reduction

Direct series evaluation is only efficient when the argument is small. Range reduction maps any argument to a small rational before calling the series.

### For `exp(u/v)`

Decompose `x = u/v` into integer and fractional parts:

```
i = floor(u/v)          (integer part, computed by integer division)
f = u/v - i = (u - i*v) / v    (fractional part, rational, 0 ≤ f < 1)

exp(x) = exp(f) · eⁱ
```

* `exp(f)` via the exponential series — fast since `|f| < 1`
* `eⁱ` via repeated squaring on the precomputed constant `e`

**Dependency**: `exp` depends on `e` being available.

### For `ln(u/v)`

Extract the power of 2:

```
find k such that: u/v = 2ᵏ · m,  m ∈ [1, 2)
k = floor(log₂(u/v))   (found by bit-shifting u/v as integers)
m = (u/v) / 2ᵏ          (rational, stays in [1,2))

ln(u/v) = k · ln(2) + ln(m)
```

Then compute `ln(m)` via the atanh series with argument `t = (m-1)/(m+1) ∈ [0, 1/3)`:

```
ln(m) = 2 · atanh((m-1)/(m+1))
```

For `m ∈ [1,2)`, the argument `t = (m-1)/(m+1) ∈ [0, 1/3)`, so `t² < 1/9`. Convergence is fast.

**Dependency**: `ln` depends on `ln(2)` being available.

### For `atan(u/v)`

Reduce to `|argument| ≤ tan(π/8) ≈ 0.414` using identities:

```
if |u/v| > 1:
    atan(u/v) = π/2 - atan(v/u)          (swap u and v)

if |u/v| > tan(π/8):
    atan(u/v) = π/4 - atan((v-u)/(v+u))  (Machin-style step)
```

These reductions use only integer arithmetic on `u` and `v`. The `π/2` and `π/4` constants added at the end are themselves computed from `atan`.

**Note**: No circular dependency — the reductions shrink the argument algebraically before any series is called.

### For `sin(u/v)` and `cos(u/v)`

Reduce to `[0, π/4]` using:

```
sin(x + π/2) = cos(x)
sin(π - x)   = sin(x)
sin(x + π)   = -sin(x)
```

Find how many multiples of `π/4` fit in `x`, then reduce to the first octant.

**Dependency**: `sin`/`cos` depend on `π` being available.

---

## Precomputed Constants

These are computed on demand at the requested precision `n`:

### `ln(2)`

Use `atanh` directly at the rational argument `1/3`:

```
ln(2) = 2 · atanh(1/3)
      = 2 · Σ_{k=0}^{∞} (1/3)^(2k+1) / (2k+1)
```

`c = 1, d = 3` — entirely integer. Convergence fast since `t = 1/9` per step.

> **Special case — `t` drops out**: Since `c=1`, the `t` tracker is always `1` and drops out
> entirely. The recurrence simplifies to just `p` and `q` with shared multiplier `A = (2n+3)·9`:
>
> ```
> p₀ = 2,  q₀ = 3
> A₀ = 27, Aₙ₊₁ = Aₙ + 18
>
> pₙ₊₁ = pₙ · A + 2
> qₙ₊₁ = qₙ · A
> ```
>
> **Carry `A` not `n`**: Rather than tracking step index `n` and recomputing `A = (2n+3)·9`,
> carry `A` on the stack and add `18` each step. Use `A x` order (not `x A`) so that `over`
> copies `A` for the multiply while leaving `x` on top.
>
> **Implemented definitions**:
>
> ```f-flat-minor
> /* ( A q -- A' q' ) */
> ln2-q-step: over * swap 18 + ;
>
> /* ( A p -- A' p' ) */
> ln2-p-step: over * 2 + swap 18 + swap ;
>
> /* ( K -- q ) */
> ln2-q: q< 27 3 [ ln2-q-step ] q> times nip ;
>
> /* ( K -- p ) */
> ln2-p: q< 27 2 [ ln2-p-step ] q> times nip ;
>
> /* ( n -- p q ) */
> ln2-parts: n->K dup ln2-p swap ln2-q ;
>
> /* ( n -- floor(ln(2) * 10^n) ) */
> ln2: dup ln2-parts swap rot p/q*S ;
> ```
>
> **Verified step tests**:
> ```
> 27 3 ln2-q-step  →  45 81     ✓
> 45 81 ln2-q-step →  63 3645   ✓
> 27 2 ln2-p-step  →  45 56     ✓
> 45 56 ln2-p-step →  63 2522   ✓
> ```
>
> ⚠️ **Open issue — integer growth**: `p` and `q` grow very large during the loop because each
> step multiplies by `A` which itself grows. For modest `n` this is fine, but for larger `n`
> intermediate BigInts become slow in Deno/JS. Possible solutions:
> 1. Scale by `S` incrementally during the loop rather than multiplying at the end
> 2. Sum scaled terms directly instead of tracking `p/q` as exact rationals
> 3. Binary splitting (see section below — asymptotically better)
> 4. Periodically divide `p` and `q` by their GCD to control growth

### `atanh(u/v)`

> **Dependency inversion**: The original plan derives `atanh` as the primitive series and `ln`
> from it. In practice it is simpler to implement `ln2` first (via the simplified series above)
> and then derive `atanh` as a thin wrapper using the identity:
>
> ```
> atanh(u/v) = (1/2) · ln((v+u)/(v-u))
> ```
>
> This means `ln` should be implemented first, then `atanh` derived from it — inverting the
> dependency from the original plan.

### `π` via Machin's Formula

```
π/4 = 4·atan(1/5) - atan(1/239)
π   = 16·atan(1/5) - 4·atan(1/239)
```

Both arguments are small rationals — two `atan-series` calls, no range reduction needed. Machin's formula is preferred over Gregory-Leibniz (`π/4 = atan(1)`) because `1/5` and `1/239` converge far faster than `1`.

### `ln(10)`

```
\ Simplest: direct atanh series after range reduction
ln(10) = 3·ln(2) + ln(10/8)
       = 3·ln(2) + ln(1.25)
       = 3·ln(2) + 2·atanh(1/9)
```

`c = 1, d = 9` for the atanh call — fast convergence.

### `e`

```
e = compute-p(K) / compute-q(K)
```

No range reduction needed. Direct series.

---

## Integer Floor Logarithms

> These were derived as useful helpers for range reduction and `iln`:

```f-flat-minor
/* floor(log2(x)) — count right shifts */
ilb: dup 1 > [ 1 >> ilb ++ ] [ drop 0 ] branch ;

/* floor(log10(x)) — count divisions by 10 */
/* Note: uses >= not > because 10/10=1 (not 0), so > would not terminate on multiples of 10 */
ilg: dup 10 >= [ 10 / ilg ++ ] [ drop 0 ] branch ;

/* floor(ln(x)) approximation via change of base: ln(x) = log2(x) * ln(2) ≈ log2(x) * 20/29 */
/* Uses rational approximation ln(2) ≈ 20/29 (error ~0.04%) */
iln: ilb 20 * 29 / ;
```

---

## Dependency Graph

```
integer arithmetic (*, +, -, /, **)
        │
        ├─── n->K, n->S          (precision helpers)        [IMPLEMENTED ✓]
        ├─── p/q*S               (the one division)         [IMPLEMENTED ✓]
        │
        ├─── atanh-family        (Shape 2 loop, no alternating sign)
        │       ├── ln2          (c=1, d=3, t drops out)    [IMPLEMENTED ✓, perf issue ⚠️]
        │       └── ln(u/v)      (range reduce → atanh → add k·ln2)
        │               └── log(u/v, base)   ln(u/v) / ln(base)
        │
        ├─── atanh(u/v)          [derive from ln, not the other way around]
        │       atanh(u/v) = (1/2) · ln((v+u)/(v-u))
        │
        ├─── exp-series          (Shape 1 loop)
        │       ├── e            (u=1, v=1)
        │       ├── exp(u/v)     (range reduce → series → e^i by squaring)
        │       ├── cosh(u/v)    (exp(x) + exp(-x)) / 2
        │       └── sinh(u/v)    (exp(x) - exp(-x)) / 2
        │
        └─── atan-family         (Shape 2 loop, alternating sign)
                ├── pi           (Machin: 16·atan(1/5) - 4·atan(1/239))
                ├── atan2(u/v)   (range reduce → series)
                ├── sin(u/v)     (range reduce using π → sin-series)
                └── cos(u/v)     (range reduce using π → cos-series)

        (separate)
        └─── sqrt(u/v)           (Newton's method, not a series)
                 xₙ₊₁ = (xₙ + (u/v)/xₙ) / 2
```

Build order respects the dependency arrows:
`n->K, n->S` → `ln2` → `ln` → `atanh` → `log` → `exp-series` → `e` → `exp` → `cosh, sinh` → `atan-family` → `pi` → `atan2` → `sin, cos` → `sqrt`

---

## Relationship to Binary Splitting

The recurrence approach described here and binary splitting are **two evaluation strategies for the same mathematical object**.

The recurrence evaluates `Σ aₖ` left-to-right, accumulating `p` and `q` iteratively. Binary splitting evaluates the same sum by recursively splitting `[0, K]` into two halves, computing `[P, Q]` pairs for each half, and combining:

```
P(a,b) = P(a,m)·Q(m,b) + P(m,b)
Q(a,b) = Q(a,m)·Q(m,b)
```

**Complexity comparison**:

| Method | Multiplications | Operand sizes |
| --- | --- | --- |
| Recurrence (left-to-right) | O(K) multiplications | Growing: small × large |
| Binary splitting | O(K) multiplications | Balanced: equal-sized pairs |

Binary splitting is asymptotically faster because balanced multiplications are cheaper than unbalanced ones when using sub-quadratic multiplication (Karatsuba, FFT). For `n` digits:

* Recurrence: `O(n²)` with naive multiplication
* Binary splitting: `O(M(n) · log n)` where `M(n)` is the cost of one `n`-bit multiply

For modest precision (hundreds of digits), the recurrence is simpler and performance is acceptable. For very high precision (thousands of digits), binary splitting should be considered. The mathematical content is identical — only the scheduling of multiplications changes.

> ⚠️ **Note from implementation**: The integer growth problem observed with `ln2` in Deno/JS
> suggests binary splitting may be needed sooner than expected, even for modest `n`. The
> recurrence's unbalanced multiplications (small `A` × growing `p`) are particularly costly.

---

## Notes on Convergence and Term Count

### Exponential series

The tail after `K` terms is bounded by `|x|^K / K!`. After range reduction to `|x| ≤ 1`:

```
|x|^K / K! ≤ 1/K! < 10^{-n}  iff  K! > 10^n
```

K grows sublinearly: approximately `K ≈ n · ln(10) / ln(K/e)`.

### Atanh/atan series (odd-power series)

The tail after `K` terms is bounded by `|t|^{2K+1} / (2K+1)` where `t` is the reduced argument. After range reduction:

* For `atanh` (`ln`): `t ≤ 1/3`, so `t² ≤ 1/9`. Tail shrinks geometrically as `(1/9)^K`.
* For `atan`: `t ≤ tan(π/8) ≈ 0.414`, so `t² ≤ 0.17`. Tail shrinks as `0.17^K`.

Both require roughly `K ≈ n · ln(10) / |ln(t²)|` terms:

* `atanh` at `t=1/3`: `K ≈ n · 1.05`
* `atan` at `t=0.414`: `K ≈ n · 1.28`

The same `K = ⌈n × 6/5⌉ + 10` covers all cases conservatively.

### Guard digits

In practice, add a small number of extra digits (4–8) to `n` before computing, then truncate at the end. This absorbs any residual error from truncating the final division and from argument reconstruction in range reduction.

---

## Notes on Integer Growth

During the loops, `p` and `q` grow to approximately `n · log₂(10) ≈ 3.32n` bits — the same size as the final result. The intermediate product `p · S` in the final step temporarily doubles this to `~6.64n` bits before the division reduces it back. This is expected and unavoidable.

The `t` tracker in the `p` loop grows at the same rate as `p`. No value in any loop exceeds `O(n)` bits.

---

## Alternatives Considered

### Binary splitting

As described above — same mathematics, better asymptotic complexity for very high precision. The recurrence approach is preferred for initial implementation due to simplicity.

### AGM (Arithmetic-Geometric Mean)

Quadratically convergent algorithms for `ln` and `π` exist based on the AGM of two numbers. These require `sqrt` as a primitive and have more complex argument reconstruction. Asymptotically faster than either approach above for very high precision, but significantly harder to implement correctly. Not recommended for initial implementation.

### CORDIC

Shift-and-add algorithms requiring only bitshifts. Converges at O(n) steps — too slow for growing-precision integers. Well-suited for fixed hardware word sizes, not for F♭m's big integers.

### Rational arithmetic throughout

Representing all intermediate values as exact `p/q` pairs. Avoids all rounding but denominators explode in size. Practical only for the series term computation itself (which this design already does implicitly by keeping `p` and `q` separate).

---

## Helper Words

These words form the vocabulary that the series loops and function wrappers are built from. They eliminate repeated patterns and give names to the key operations.

### Precision

These are internal words. `n` is the only precision token that crosses the user boundary; `S` and `K` are derived inside the library.

```
n->S      ( n -- S )             S = 10^n               scale factor
n->K      ( n -- K )             K = ⌈n×6/5⌉ + 10      term count
p/q*S     ( p q n -- scaled )    (p · 10^n) / q         the one division
scale->uv ( scaled n -- u v )    n->S                   bridge: scaled → rational
```

`p/q*S` is the only place integer division appears in the entire library. It takes `n` — not `S` — so that `n` remains the single precision token at all levels; `S` is derived internally within the word.

`scale->uv` is just `n->S` — it leaves `scaled` as `u` and computes `S` as `v`. This is the bridge between layers when composing functions.

### Scaled Arithmetic

For operating on two scaled values at the same precision. Both values represent `10^n · x` and `10^n · y`:

```
s+   ( a b   -- a+b )        plain +          scales cancel, no n needed
s-   ( a b   -- a-b )        plain -          scales cancel, no n needed
s*   ( a b n -- a*b/S )      */               de-scale after multiply
s/   ( a b n -- a*S/b )      swap * swap /    re-scale before divide
```

`s*` is the key observation: multiplying two scaled values gives a double-scaled result, so one division by `S` normalises it. The word `*/` does exactly this (`a b S */` = `a*b/S`), making `s*` simply a rename of `*/` — though `*/` is itself a defined word in F♭m, not a VM primitive. For `s*` and `s/`, `n` is passed and `S` derived internally, consistent with the rest of the library.

### Rational Arithmetic on `p/q` Pairs

For composing at the internal (parts) layer without scaling. All operations are multiply and add only — no division.

```
r*      ( p1 q1 p2 q2 -- p q )    (p1·p2) / (q1·q2)             rational multiply
r/      ( p1 q1 p2 q2 -- p q )    (p1·q2) / (q1·p2)             rational divide
r+      ( p1 q1 p2 q2 -- p q )    (p1·q2 + p2·q1) / (q1·q2)    rational add
r-      ( p1 q1 p2 q2 -- p q )    (p1·q2 - p2·q1) / (q1·q2)    rational subtract
rneg    ( p q -- -p q )            negate numerator
rrecip  ( p q -- q p )             swap                           reciprocal is free
```

`rrecip` costs nothing — it is literally `swap`. `r/` is `rrecip` then `r*`. This means `log(x, base) = ln(x) / ln(base)` costs no more than `r*` once the two `ln-parts` results are on the stack.

Note: `r+` and `r-` do not reduce the fraction. If GCD reduction matters for keeping intermediate values small, a `rgcd` step can be applied selectively, but for `K`-term series at `n` digits the growth is bounded and reduction is typically unnecessary.

### Range Reduction

```
ilog2     ( u v -- k )           floor(log₂(u/v)) by bit-length of u and v
isplit    ( u v -- i fu fv )     integer part i = floor(u/v), fraction fu/fv = u/v - i
ireduce   ( u v -- u' v' )       atanh range: map x to (x-1)/(x+1) ∈ [0,1/3)
```

`ilog2` is pure integer: `k = bit_length(u) - bit_length(v)`, adjusted by one if needed. No logarithm required.

`isplit` uses integer division: `i = u / v` (truncated), `fu = u - i·v`, `fv = v`.

`ireduce` for `ln`: given `x = u/v` with `x ∈ [1,2)`, returns `t = (u-v)/(u+v)` as the atanh argument.

### Sign Helpers for Alternating Series

```
sign-init   ( -- s )        1                    positive start
sign-flip   ( s -- -s )     negate               flip each iteration
sign-apply  ( x s -- x' )   over 0 < [ ] [ neg ] if   apply sign to value
```

These are used in the `p` loop of `atan-parts` and `cos-parts`/`sin-parts` to alternate the addend sign each step.

### Key Observations

* **`rrecip` = `swap`** — reciprocal of a rational pair is free. `r/` costs the same as `r*`.
* **`s*` = `*/`** — the word `*/` does exactly scaled multiply. The entire scaled arithmetic layer is thin naming around it, though `*/` is itself a defined word, not a VM primitive.
* **`p/q*S` is the only division** — all rational helpers are multiply-and-add. The single division is isolated at the output boundary.
* **`n` is the only precision token** — `S` and `K` are always derived internally. The user passes `n` once; everything else flows from it.

---

## Summary

The complete math library rests on:

1. **Two series loop words** — `exp-parts` (Shape 1) and `atanh-parts`/`atan-parts` (Shape 2, sign flag distinguishes them)
2. **Two layers** — internal `-parts` words return `p q`; user-facing words apply `p/q*S` once at the boundary
3. **Single precision token** — users pass only `n` (decimal digits); `S = 10^n` and `K` are always derived internally
4. **Precision helpers** — `n->S`, `n->K`, `p/q*S`, `scale->uv`; internal use only
5. **Rational helpers** — `r*`, `r/`, `r+`, `r-`, `rrecip` for composing at the parts layer; all multiply-and-add, no division
6. **Scaled helpers** — `s*` (= `*/`), `s/` for operating on two scaled values at the same `n`
7. **Range reduction** — `ilog2`, `isplit`, `ireduce`; pure integer operations on `u` and `v`
8. **Four computed constants** — `e`, `ln2`, `π`, `ln10`, each a thin wrapper over the series words

Everything else — `exp`, `ln`, `log`, `sin`, `cos`, `tan`, `atan2`, `cosh`, `sinh` — performs range reduction, calls one or both `-parts` words, combines results with rational helpers, and scales once at the end.

No floating point. No global precision state. No circular dependencies. Two series shapes, one division per output, `n` as the single precision token throughout.
