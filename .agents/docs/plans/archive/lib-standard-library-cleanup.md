---
id: lib-standard-library-cleanup
title: "Standard Library Cleanup"
last_updated: 2026-03-24
description: >
  Address redundancy, dead code, private re-implementations, and naming in
  consistencies found in ff/lib during a full library audit. All changes a
  re non-breaking except for the tail! rename, which has one external call
   site in ff/euler/euler3.ffp that must be updated in the same...
tags: [plans]
status: completed
kind: initiative
author_kind: human
prompter: "mayor-a54acc6b"
---
# Plan: Standard Library Cleanup

## Summary

Address redundancy, dead code, private re-implementations, and naming inconsistencies found
in `ff/lib` during a full library audit. All changes are non-breaking except for the `tail!`
rename, which has one external call site in `ff/euler/euler3.ffp` that must be updated in the
same step.

## Context

A thorough audit of `ff/lib` identified five categories of improvements:

1. Dead code (defined, never called)
2. A private re-implementation of a public word
3. A duplicate algorithm across two files
4. Confusing or non-standard names
5. A seed inconsistency between two parallel words

No new functionality is introduced. Every change is a simplification or a naming correction.

## Approach

### Area 1 — Dead Code Removal (`math/precision.ffp`, `core/core.ff`, `math/log.ffp`)

Remove three words/constants that are defined but have zero call sites anywhere in the repo:

- **`scale->uv`** in `math/precision.ffp:8`
  A single-word alias of `n->S` with no call sites. The `../ffm-math-library.md` plan
  mentions it as a bridge word but it was never wired up. Delete the definition.

- **`nz?`** in `core/core.ff:40`
  Byte-for-byte identical to `truthy?` (both expand to `zero? not`). Has no call sites outside
  its own definition line. Delete it.

- **`__log__log2`** in `math/log.ffp:6`
  A precomputed constant (`floor(log₁₀(2)·10^20)`) reserved for a `nlog` word that was never
  written. Delete it; it can be reintroduced when that word is actually implemented.

### Area 2 — Remove `__exp__abs` Private Re-implementation (`math/exp.ffp`)

`math/exp.ffp:8` defines:
```forth
__exp__abs: dup 0 < [ -1 * ] ? ;
```
This is identical to `abs` from `math/arith.ffp` (which is `dup negitive? [ -1 * ] ? ; .inline`).
The reason it exists is that `exp.ffp` does not import `arith.ffp`.

Fix:
1. Add `.import ./arith.ffp` to `exp.ffp` (after the existing imports)
2. Replace the single use of `__exp__abs` (at `exp.ffp:32`) with `abs`
3. Delete the `__exp__abs` definition

No import cycle is introduced: `arith.ffp` → `pred.ffp` → `core/core.ff`, and `exp.ffp`
already imports `core/core.ff` directly.

Side effect: `exp.ffp` gains free access to `sgn`, `min`, `max`, `clamp`, and `divrem`.

### Area 3 — Eliminate Duplicate Machin Formula (`math/pi.ffp` + `math/atan.ffp`)

`math/pi.ffp` re-implements the same Machin formula already present as `__atan__pi_scaled` in
`math/atan.ffp`. Both files:
- Add 20 guard digits
- Compute `4·atan(1/5) − atan(1/239)` scaled by `10^n`
- Divide off the guard digits at the end
- Return `floor(π·10^n)`

The only cosmetic differences are the guard-digit constant name and the atan dispatcher called
(`_atan__core_scaled` vs `_atan__scaled`) — functionally equivalent for these specific inputs.

Fix (two steps):

**Step 1 — Rename `__atan__pi_scaled` in `atan.ffp`:**
Rename `__atan__pi_scaled` to `__npi__` throughout `atan.ffp` to make the public/private split
explicit (the double-underscore signals private; a name derived from the public `npi` signals
intended ownership). Update all three internal call sites in `atan.ffp`:
- `atan.ffp:160`
- `atan.ffp:168`
- `atan.ffp:181`

**Step 2 — Replace `npi` body in `pi.ffp`:**
Rewrite `npi` as a thin public wrapper:
```forth
npi: __npi__ ;
```
Delete the old `npi` body (currently 8 lines) and delete the now-redundant `__pi__guard_digits`
constant. The `pi.ffp` file will become just the import and the one-line wrapper.

### Area 4 — Naming Fixes

**4a — `string.ffp`: Rename `ucase?` / `lcase?` predicates**

`ucase?` tests whether a character is in the lowercase range `a–z` (i.e. a candidate for
uppercasing). `lcase?` tests whether a character is in the uppercase range `A–Z`. The names
describe the *target case* of the conversion, not the current state of the character. This is
non-standard; conventional names are `lower?` (is currently lowercase) and `upper?` (is
currently uppercase).

Rename:
- `ucase?` → `lower?`
- `lcase?` → `upper?`

Update `ucase` and `lcase` to call the renamed predicates. Both predicates are used only
within `string.ffp` itself; no external call sites exist in `ff/`.

**4b — `seq.ffp`: Rename `tail!` to `last!`**

`tail!` (`q< clr q> `) returns the topmost stack item and discards everything else — i.e. it
returns the *last* element. In standard functional vocabulary, `tail` means "all elements
except the first." The word is correctly paired with the public `last`, which is built on it.

Rename `tail!` → `last!` in `seq.ffp` and update `last`'s definition accordingly.

Also update the one external call site: `ff/euler/euler3.ffp:20`.

### Area 5 — Fix `sum!` / `product!` Seed Inconsistency (`seq/seq.ffp`)

Current definitions:
```forth
sum!:     [+] reduce! ;        /* no seed — requires ≥1 item on stack */
product!: [*] 1 reduce! ;     /* seeds with 1 */
```

`product!` pushes `1` as an initial value before reduce, making it safe on an empty stack.
`sum!` does not, making it undefined on an empty stack. The quotation-based `sum` already
uses `0` as its identity seed (`sum: 0 [+] foldr ;`), so the inconsistency is clear.

All existing call sites of `sum!` in `ff/euler/` operate on stacks with at least one item, so
adding a `0` seed will not change their behavior.

Fix:
```forth
sum!: 0 swap [+] reduce_l! ;
```

This mirrors the structure of `product!` (`[*] 1 reduce_l! ;` — note: both should use
`reduce_l!` for consistency rather than mixing `reduce!` and `reduce_l!`).

## Decisions Already Made

- `scale->uv`, `nz?`, and `__log__log2` are deleted outright (not deprecated or aliased).
- `__atan__pi_scaled` is renamed to `__npi__` (not kept as-is); `npi` wraps it.
- `tail!` → `last!` rename includes `ff/euler/euler3.ffp`.
- `ucase?`/`lcase?` are renamed to `lower?`/`upper?` (not kept as aliases).

## Open Questions

None — ready to implement.

## Out of Scope

- Adding new math words (e.g. `nlog`, `floor/`, `floordiv2`) — those belong in a separate plan.
- Addressing the `not` / `zero?` overlap (both are `0 =`) — this is a deliberate naming
  convention and not a bug.
- The `falsey?` / `zero?` overlap — `falsey?` has one call site in `testing.ffp` and serves
  a distinct boolean-framing role; leaving it as-is is intentional.
- The `reduce!` / `reduce_l!` potential equivalence — audit deferred; not changing behavior.
- Any changes to the math series implementations (`exp.ffp`, `atan.ffp`, `sqrt.ffp`, etc.).

## Files Changed

| File | Change |
|---|---|
| `ff/lib/math/precision.ffp` | Delete `scale->uv` |
| `ff/lib/core/core.ff` | Delete `nz?` |
| `ff/lib/math/log.ffp` | Delete `__log__log2` |
| `ff/lib/math/exp.ffp` | Add `.import ./arith.ffp`; replace `__exp__abs` with `abs`; delete `__exp__abs` |
| `ff/lib/math/atan.ffp` | Rename `__atan__pi_scaled` → `__npi__` at definition and 3 call sites |
| `ff/lib/math/pi.ffp` | Delete old `npi` body + `__pi__guard_digits`; rewrite as `npi: __npi__ ;` |
| `ff/lib/string/string.ffp` | Rename `ucase?` → `lower?`, `lcase?` → `upper?`; update callers |
| `ff/lib/seq/seq.ffp` | Rename `tail!` → `last!`; update `last`; fix `sum!` seed |
| `ff/euler/euler3.ffp` | Update `tail!` → `last!` |

## Dependencies

None — all changes are isolated to `ff/lib` and `ff/euler/euler3.ffp`.

## References

- `ff/lib/README.md`
- `ff/lib/core/core.ff`
- `ff/lib/math/precision.ffp`
- `ff/lib/math/log.ffp`
- `ff/lib/math/exp.ffp`
- `ff/lib/math/arith.ffp`
- `ff/lib/math/atan.ffp`
- `ff/lib/math/pi.ffp`
- `ff/lib/seq/seq.ffp`
- `ff/lib/string/string.ffp`
- `ff/euler/euler3.ffp`
