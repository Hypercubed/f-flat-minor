---
status: draft
status_date: 2026-04-01
creator: cursor
---

# Plan: `ff/lib` TAP test coverage checklist

## Summary

Track **public** words in [`ff/lib/`](../ff/lib/) (excluding `_` / `__` prefixes) that **do not appear as literal tokens** in any [`ff/lib/**/__tests__/`](../ff/lib/) source (`.ffp` / `.ff`). Checking off items means a test file names the word in executable code (not only in comments).

## Context

Coverage was surveyed by:

1. Collecting `name:` definitions from all `ff/lib/**/*.ffp` and `ff/lib/**/*.ff` outside `__tests__/`.
2. Dropping names starting with `_` or `__`.
3. Concatenating test sources under `ff/lib/**/__tests__/` and tokenizing (whitespace, `[` / `]`, stripped string literals).

**Important:** This is **not** dynamic coverage. Words may still run as part of other definitions without ever being written in a test. Unchecked items are “no direct mention in `ff/lib` tests,” not “never executed.”

Recommended runner: [`cd bun && mise exec -- chomp test:tap`](../AGENTS.md) (see [`_docs/tap-testing.md`](../_docs/tap-testing.md)).

## Checklist

*Implicit coverage:* some words never appear as literal tokens in `ff/lib/**/__tests__/` but run as part of another word’s definition that *is* exercised by tests. Such cases are marked *(implicit: via `caller`)* (often one representative caller).

### Core ([`ff/lib/core/core.ff`](../ff/lib/core/core.ff))

- [ ] `--` *(implicit: via `lower?` / `upper?`, `ack`, `primes` / `__factor_by_2`)*
- [ ] `++` *(implicit: via `lower?` / `upper?`, `ack`, `primes` / `__factor_by_2`)*
- [ ] `pred` *(implicit: via `ack`, `primes` / `__witness_seed`)*
- [ ] `succ`
- [ ] `slip` *(implicit: via `bi`, `dip`, `seq` / `__map` & friends)*
- [ ] `swapd` *(implicit: via `dig`, `exp`, `atan`, …)*
- [ ] `dupd` *(implicit: via `between?`, `filter!` / `__filter`, …)*
- [ ] `dig` *(implicit: via `between?`, `clamp`, `sqrt` / `__pick`, `lower?` / `upper?`)*
- [ ] `dip` *(implicit: via `ack`, `tap`, `seq`, …)*
- [ ] `dipd` *(implicit: via `exp`, `atan`)*
- [ ] `over` *(implicit: via `ack`, `tap`, `seq` / `__seq=`, …)*
- [ ] `nip` *(implicit: via `ack`, `foldl!` branch, `gcd` / `__witness_composite`, …)*
- [ ] `tuck` *(implicit: via `isqrtrem`, `gcd` / `__t`, `prn` / `qputn`)*
- [ ] `sip` *(implicit: via `or_else` — e.g. `primes` / `__simple-composite?`)*
- [ ] `sipd` *(implicit: via `bi`)*
- [ ] `bi2` *(implicit: via `exp` / `ncosh`·`nsinh`, `primes` / `__(trial)`, `atan-core`, …)*
- [ ] `run`
- [ ] `zero?` *(implicit: via `divisor?`, `tap`, `ack`, `primes`, `seq` / `emptyq?`, …)*
- [ ] `nz?` *(implicit: via `primes` / `__powmod_loop`, `exp` / `__floor_half`)*
- [ ] `truthy?` *(implicit: via `tap`; `and` / `or`)*
- [ ] `falsey?`
- [ ] `sort2` *(implicit: via `min` / `max`, `between?`)*
- [ ] `nand`
- [ ] `nor`
- [ ] `or_else` *(implicit: via `primes` / Miller–Rabin & trial paths)*
- [ ] `and_also`
- [ ] `empty?`
- [ ] `pushtop` *(implicit: via `foldr!` / `foldl!`)*
- [ ] `loop` *(implicit: via `times` → `stack`)*
- [ ] `times` *(implicit: via `stack`)*
- [ ] `seq`
- [ ] `range`
- [ ] `count`

### Math — predicates ([`ff/lib/math/pred.ffp`](../ff/lib/math/pred.ffp))

- [ ] `negitive?` *(implicit: via `sgn`, `abs`)*
- [ ] `positive?` *(implicit: via `sgn`, `abs`)*

### Math — arithmetic / combinatorics ([`ff/lib/math/arith.ffp`](../ff/lib/math/arith.ffp), [`ff/lib/math/num.ffp`](../ff/lib/math/num.ffp))

- [ ] `divrem`
- [ ] `nck`
- [ ] `^^` *(implicit: via `ack` / `__F_4`)*
- [ ] `^^^` *(implicit: via `ack` / `__F_5`)*

### Math — gcd / cbrt ([`ff/lib/math/gcd.ffp`](../ff/lib/math/gcd.ffp), [`ff/lib/math/cbrt.ffp`](../ff/lib/math/cbrt.ffp))

- [ ] `gcd` *(implicit: via `exp` / `__frac_reduce`; `prn` / `qputn` if that path runs)*
- [ ] `lcm`
- [ ] `icbrt`

### Math — precision helpers ([`ff/lib/math/precision.ffp`](../ff/lib/math/precision.ffp))

*(May be covered indirectly via `ntrunc` / `nfrac`; checklist is for **naming** the word in tests.)*

- [ ] `n->S` *(implicit: via `ntrunc`, `nfrac`, `iexp`, …)*
- [ ] `n->S2` *(implicit: via `nsqrt`)*
- [ ] `n->K` *(implicit: via `exp` / `__terms`, `atan-core`)*
- [ ] `p/q*S` *(implicit: via `nexp`)*

### String ([`ff/lib/string/char.ffp`](../ff/lib/string/char.ffp), [`ff/lib/string/str.ffp`](../ff/lib/string/str.ffp))

- [ ] `sp`
- [ ] `tab`
- [ ] `println` *(implicit: via `tap` / `TAP-VERSION`, `SUBTEST`, …)*
- [ ] `slen`
- [ ] `scat`
- [ ] `sprint` *(implicit: via `sprintln` — [`str.ffp`](../ff/lib/string/__tests__/str.ffp) smoke)*

### Seq — imperative / `!` words ([`ff/lib/seq/seq.ffp`](../ff/lib/seq/seq.ffp))

- [ ] `map!` *(implicit: via `map`)*
- [ ] `reduce!` *(implicit: via `head!` → `first`)*
- [ ] `reduce_r!` *(implicit: via `foldr!` → `foldr`)*
- [ ] `reduce_l!` *(implicit: via `foldl!` → `foldl`)*
- [ ] `foldr!` *(implicit: via `foldr`)*
- [ ] `foldl!` *(implicit: via `foldl`)*
- [ ] `head!` *(implicit: via `first`)*
- [ ] `tail!` *(implicit: via `tail`)*
- [ ] `last!` *(implicit: via `last`)*
- [ ] `reverse!` *(implicit: via `reverse` / `tail!`)*
- [ ] `filter!` *(implicit: via `filter`)*
- [ ] `sum!`
- [ ] `product!`

### TAP ([`ff/lib/tap.ffp`](../ff/lib/tap.ffp))

- [ ] `SKIP-ALL`

### Legacy testing helpers ([`ff/lib/testing.ffp`](../ff/lib/testing.ffp))

*(Used elsewhere in the repo, not by `ff/lib/__tests__`.)*

- [ ] `assert`
- [ ] `assert_eq`
- [ ] `assert_false`
- [ ] `OK` *(distinct from [`tap.ffp`](../ff/lib/tap.ffp) `OK`)*
- [ ] `¶`

## Decisions already made

- Checklist items are **public** words only (`_` / `__` prefixes excluded).
- “Done” for an item means the word appears as a token in an `ff/lib/**/__tests__/**` source file after the survey methodology above.

## Open questions

- Whether to add a second pass using runtime/trace-based coverage (out of scope for this checklist).
- Whether `testing.ffp` should gain `ff/lib` TAP tests or remain documented as legacy-only.

## Dependencies

- None.
