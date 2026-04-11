---
title: Math library
summary: Reference for the numeric, transcendental, number-theory, and formatting words exported by the top-level `math` module.
order: 111
---

# Math library reference

This page groups the public words from the files imported by `ff/lib/math/math.ffp`.

## `pred.ffp`

Source: `ff/lib/math/pred.ffp`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `negitive?` | `n -- flag` | Tests whether a number is negative. |
| `positive?` | `n -- flag` | Tests whether a number is positive. |
| `divisor?` | `n d -- flag` | Tests whether `d` divides `n` evenly. |
| `even?` | `n -- flag` | Tests whether a number is even. |
| `odd?` | `n -- flag` | Tests whether a number is odd. |

## `arith.ffp`

Source: `ff/lib/math/arith.ffp`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `sgn` | `n -- -1 or 0 or 1` | Returns the sign of a number. |
| `abs` | `n -- |n|` | Returns the absolute value. |
| `sqr` | `n -- n^2` | Squares a number. |
| `min` | `a b -- min` | Returns the smaller of two values. |
| `max` | `a b -- max` | Returns the larger of two values. |
| `clamp` | `lo hi n -- n'` | Constrains a value to an inclusive range. |
| `divrem` | `a b -- q r` | Returns quotient and remainder together. |

## `num.ffp`

Source: `ff/lib/math/num.ffp`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `!` | `n -- n!` | Computes factorial. |
| `nck` | `n k -- C(n,k)` | Computes a binomial coefficient. |
| `^^` | `a b -- n` | Applies Knuth up-arrow tetration. |
| `^^^` | `a b -- n` | Applies the next higher Knuth hyper-operator. |

## `atan.ffp`

Source: `ff/lib/math/atan.ffp`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `iatan` | `x -- floor(atan(x))` | Integer arctangent with zero decimal places. |
| `natan` | `n x -- floor(10^n*atan(x))` | Fixed-point arctangent at decimal precision `n`. |
| `qatan` | `u v -- floor(atan(u/v))` | Integer arctangent of a rational input. |
| `atan-inv` | `n x -- floor(10^n*atan(1/x))` | Fixed-point arctangent of the reciprocal input. |

## `atanh.ffp`

Source: `ff/lib/math/atanh.ffp`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `iatanh` | `x -- floor(atanh(x))` | Integer inverse hyperbolic tangent with zero decimal places. |
| `natanh` | `n x -- floor(10^n*atanh(x))` | Fixed-point inverse hyperbolic tangent at decimal precision `n`. |
| `qatanh` | `u v -- floor(atanh(u/v))` | Integer inverse hyperbolic tangent of a rational input. |
| `atanh-inv` | `n x -- floor(10^n*atanh(1/x))` | Fixed-point inverse hyperbolic tangent of the reciprocal input. |

## `sqrt.ffp`

Source: `ff/lib/math/sqrt.ffp`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `isqrt` | `x -- floor(sqrt(x))` | Returns the integer square root of a non-negative input. |
| `isqrtrem` | `x -- floor(sqrt(x)) x-floor(sqrt(x))^2` | Returns the integer square root and leftover remainder. |
| `nsqrt` | `n x -- floor(10^n*sqrt(x))` | Returns a fixed-point square root with `n` decimal digits. |

## `cbrt.ffp`

Source: `ff/lib/math/cbrt.ffp`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `icbrt` | `x -- trunc(cbrt(x))` | Returns the integer cube root, truncated toward zero. |

## `gcd.ffp`

Source: `ff/lib/math/gcd.ffp`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `gcd` | `a b -- gcd` | Computes the greatest common divisor. |
| `lcm` | `a b -- lcm` | Computes the least common multiple. |

## `ack.ffp`

Source: `ff/lib/math/ack.ffp`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `ack` | `m n -- ack(m,n)` | Computes the Ackermann function, with fast paths for small `m`. |

## `primes.ffp`

Source: `ff/lib/math/primes.ffp`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `maybe_prime?` | `n -- flag` | Probabilistic Miller-Rabin primality screen. |
| `prime?` | `n -- flag` | Exact primality test using the screen plus trial division. |
| `next-prime` | `n -- p` | Returns the smallest prime greater than or equal to `n`. |
| `th-prime` | `n -- p` | Returns the `n`th prime by repeated search. |

## `log.ffp`

Source: `ff/lib/math/log.ffp`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `nln2` | `n -- floor(10^n*ln(2))` | Computes a fixed-point approximation of `ln(2)`. |
| `ilb` | `x -- floor(log2(x))` | Returns the integer base-2 logarithm. |
| `ilog` | `x -- floor(log10(x))` | Returns the integer base-10 logarithm. |
| `iln` | `x -- floor(ln(x))` | Returns an integer natural logarithm approximation. |

## `exp.ffp`

Source: `ff/lib/math/exp.ffp`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `iexp` | `x -- floor(e^x)` | Computes a floored integer exponential using a fixed fast path. |
| `nexp` | `n x -- floor(10^n*e^x)` | Computes a fixed-point exponential at decimal precision `n`. |
| `ncosh` | `n x -- floor(cosh(x)*10^n)` | Computes fixed-point hyperbolic cosine. |
| `nsinh` | `n x -- floor(sinh(x)*10^n)` | Computes fixed-point hyperbolic sine. |
| `icosh` | `x -- floor(cosh(x))` | Integer hyperbolic cosine wrapper around `ncosh`. |
| `isinh` | `x -- floor(sinh(x))` | Integer hyperbolic sine wrapper around `nsinh`. |

## `pi.ffp`

Source: `ff/lib/math/pi.ffp`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `npi` | `n -- floor(10^n*pi)` | Computes `pi` to `n` decimal places in fixed-point form. |
| `tau` | `n -- floor(10^n*2*pi)` | Computes `tau` to `n` decimal places in fixed-point form. |
| `half_pi` | `n -- floor(10^n*pi/2)` | Computes `pi/2` to `n` decimal places in fixed-point form. |

## `trig.ffp`

Source: `ff/lib/math/trig.ffp`

This file is currently a placeholder and does not define public words yet.

## `prn.ffp`

Source: `ff/lib/math/prn.ffp`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `nputn` | `n x -- {prints x with n fractional digits}` | Prints a fixed-point decimal with zero-padded fractional digits. |
| `qputn` | `p q -- {prints reduced p/q}` | Prints a reduced rational number as `p/q`. |
