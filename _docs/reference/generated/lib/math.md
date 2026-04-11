---
title: Math library
summary: Reference for the numeric, transcendental, number-theory, and formatting words exported by the top-level `math` module.
order: 111
---

# Math library reference

This page groups the public words from the files imported by `ff/lib/math/math.ffp`.

## `pred.ffp`

Source: `ff/lib/math/pred.ffp`  
Import: `.import <math/pred>`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `negitive?` | `n -- flag` | Tests whether a number is negative. |
| `positive?` | `n -- flag` | Tests whether a number is positive. |
| `divisor?` | `n d -- flag` | Tests whether `d` divides `n` evenly. |
| `even?` | `n -- flag` | Tests whether a number is even. |
| `odd?` | `n -- flag` | Tests whether a number is odd. |

## `arith.ffp`

Source: `ff/lib/math/arith.ffp`  
Import: `.import <math/arith>`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `sgn` | `x -- sgn(x)` | Returns the sign of a number. |
| `abs` | `x -- \|x\|` | Returns the absolute value. |
| `sqr` | `x -- x²` | Squares a number. |
| `min` | `a b -- min` | Returns the smaller of two values. |
| `max` | `a b -- max` | Returns the larger of two values. |
| `clamp` | `lo hi x -- x'` | Constrains a value to an inclusive range. |
| `divrem` | `a b -- q r` | Returns quotient and remainder together. |

## `num.ffp`

Source: `ff/lib/math/num.ffp`  
Import: `.import <math/num>`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `!` | `n -- n!` | Computes factorial. |
| `nck` | `n k -- C(n,k)` | Computes a binomial coefficient. |
| `^^` | `a b -- a↑↑b` | Applies Knuth up-arrow tetration. |
| `^^^` | `a b -- a↑↑↑b` | Applies the next higher Knuth hyper-operator. |

## `atan.ffp`

Source: `ff/lib/math/atan.ffp`  
Import: `.import <math/atan>`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `iatan` | `x -- ⌊atan(x)⌋₀` | Integer arctangent with zero decimal places. |
| `natan` | `n x -- ⌊10ⁿ*atan(x)⌋₀` | Fixed-point arctangent at decimal precision `n`. |
| `qatan` | `u v -- ⌊atan(u/v)⌋₀` | Integer arctangent of a rational input. |
| `atan-inv` | `n x -- ⌊10ⁿ*atan(1/x)⌋₀` | Fixed-point arctangent of the reciprocal input. |

## `atanh.ffp`

Source: `ff/lib/math/atanh.ffp`  
Import: `.import <math/atanh>`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `iatanh` | `x -- ⌊atanh(x)⌋₀` | Integer inverse hyperbolic tangent with zero decimal places. |
| `natanh` | `n x -- ⌊10ⁿ*atanh(x)⌋₀` | Fixed-point inverse hyperbolic tangent at decimal precision `n`. |
| `qatanh` | `u v -- ⌊atanh(u/v)⌋₀` | Integer inverse hyperbolic tangent of a rational input. |
| `atanh-inv` | `n x -- ⌊10ⁿ*atanh(1/x)⌋₀` | Fixed-point inverse hyperbolic tangent of the reciprocal input. |

## `sqrt.ffp`

Source: `ff/lib/math/sqrt.ffp`  
Import: `.import <math/sqrt>`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `isqrt` | `x -- ⌊sqrt(x)⌋` | Returns the integer square root of a non-negative input. |
| `isqrtrem` | `x -- ⌊sqrt(x)⌋ x-⌊sqrt(x)⌋²` | Returns the integer square root and leftover remainder. |
| `nsqrt` | `n x -- ⌊10ⁿ*sqrt(x)⌋` | Returns a fixed-point square root with `n` decimal digits. |

## `cbrt.ffp`

Source: `ff/lib/math/cbrt.ffp`  
Import: `.import <math/cbrt>`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `icbrt` | `x -- ⌊cbrt(x)⌋₀` | Returns the integer cube root, truncated toward zero. |

## `gcd.ffp`

Source: `ff/lib/math/gcd.ffp`  
Import: `.import <math/gcd>`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `gcd` | `a b -- gcd` | Computes the greatest common divisor. |
| `lcm` | `a b -- lcm` | Computes the least common multiple. |

## `ack.ffp`

Source: `ff/lib/math/ack.ffp`  
Import: `.import <math/ack>`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `ack` | `m n -- ack(m,n)` | Computes the Ackermann function, with fast paths for small `m`. |

## `primes.ffp`

Source: `ff/lib/math/primes.ffp`  
Import: `.import <math/primes>`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `maybe_prime?` | `n -- flag` | Probabilistic Miller-Rabin primality screen. |
| `prime?` | `n -- flag` | Exact primality test using the screen plus trial division. |
| `next-prime` | `n -- p` | Returns the smallest prime greater than or equal to `n`. |
| `th-prime` | `n -- p` | Returns the `n`th prime by repeated search. |

## `log.ffp`

Source: `ff/lib/math/log.ffp`  
Import: `.import <math/log>`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `nln2` | `n -- ⌊10ⁿ*ln(2)⌋` | Computes a fixed-point approximation of `ln(2)`. |
| `ilb` | `x -- ⌊log2(x)⌋` | Returns the integer base-2 logarithm. |
| `ilog` | `x -- ⌊log10(x)⌋` | Returns the integer base-10 logarithm. |
| `iln` | `x -- ⌊ln(x)⌋` | Returns an integer natural logarithm approximation. |

## `exp.ffp`

Source: `ff/lib/math/exp.ffp`  
Import: `.import <math/exp>`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `iexp` | `x -- ⌊eˣ⌋` | Computes a floored integer exponential using a fixed fast path. |
| `nexp` | `n x -- ⌊10ⁿ*eˣ⌋` | Computes a fixed-point exponential at decimal precision `n`. |
| `ncosh` | `n x -- ⌊cosh(x)*10ⁿ⌋` | Computes fixed-point hyperbolic cosine. |
| `nsinh` | `n x -- ⌊sinh(x)*10ⁿ⌋` | Computes fixed-point hyperbolic sine. |
| `icosh` | `x -- ⌊cosh(x)⌋` | Integer hyperbolic cosine wrapper around `ncosh`. |
| `isinh` | `x -- ⌊sinh(x)⌋` | Integer hyperbolic sine wrapper around `nsinh`. |

## `pi.ffp`

Source: `ff/lib/math/pi.ffp`  
Import: `.import <math/pi>`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `npi` | `n -- ⌊10ⁿ*π⌋` | Computes `pi` to `n` decimal places in fixed-point form. |
| `tau` | `n -- ⌊10ⁿ*2*π⌋` | Computes `tau` to `n` decimal places in fixed-point form. |
| `half_pi` | `n -- ⌊10ⁿ*π/2⌋` | Computes `pi/2` to `n` decimal places in fixed-point form. |

## `trig.ffp`

Source: `ff/lib/math/trig.ffp`  
Import: `.import <math/trig>`

This file is currently a placeholder and does not define public words yet.

## `prn.ffp`

Source: `ff/lib/math/prn.ffp`  
Import: `.import <math/prn>`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `nputn` | `n x -- {prints x with n fractional digits}` | Prints a fixed-point decimal with zero-padded fractional digits. |
| `qputn` | `p q -- {prints reduced p/q}` | Prints a reduced rational number as `p/q`. |
