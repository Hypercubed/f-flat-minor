# Stack Rewrites And Annotations

This document describes two related practices for f-flat-minor code:

1. adding per-line stack-effect annotations while refactoring
2. simplifying stack code with safe rewrite rules

The model example is `ff/lib/math/atan-core.ffp`, where the queue-sensitive Taylor helpers were
rewritten into queue-safe stack code with line-by-line comments.

## Why annotate line by line

Per-line stack comments are most useful when:

- a word mixes queue operations and stack shuffles
- a helper has a non-obvious state machine
- a refactor changes structure without changing behavior
- you are checking whether a rewrite preserves the exact stack effect

The point is not to comment every trivial arithmetic line in the repo. The point is to make subtle
transforms locally checkable.

## Annotation format

Use normal multiline comments:

```ff
/* u² p q odd v² */
```

For queue-sensitive words, show queue state after `|`:

```ff
/* stack | queue */
```

The queue is LIFO:

- `q<` pushes to the back/right
- `q>` pops from the back/right

## Process for adding per-line annotations

1. Start with the word-level contract.

```ff
/* u v odd __seed_taylor_state == u v u2 p q odd v2 */
```

2. Write the incoming stack just before the body.

```ff
__seed_taylor_state: /* u v odd */
```

3. After each non-trivial line, write the new stack state.

```ff
dup                      /* u v odd odd */
__dbl1                   /* u v odd (2*odd+1) */
```

4. If a line uses `dip`, `q<`, `q>`, `dig`, `bury`, or a local helper, annotate it even if the
line looks short.

5. When a sequence becomes stable and obvious, you can keep only the higher-value comments instead
of commenting every trivial operation forever.

## What makes a good annotation

Good annotations:

- preserve naming across lines
- reflect the real order, not the intended order
- use the same symbolic names across a helper
- include duplicated values explicitly
- prefer semantic names like `u²`, `v²`, `odd`, `p`, `q`

Bad annotations:

- silently rename values between lines
- omit preserved deeper items
- describe intent instead of the actual stack
- hide queue state when queue behavior matters

## Rewrite discipline

All whitespace — including newlines — is a word boundary. "Adjacent" means two words with only
whitespace between them, regardless of line breaks. All rewrite rules in this document apply across
lines.

Every rewrite must preserve the full stack effect, not just the visible top few words.

Before accepting a rewrite:

1. write the before stack effect
2. write the after stack effect
3. include preserved deeper items
4. if queue is involved, include queue state too

If the replacement needs a different shape of input than the original sequence, it is not a valid
rewrite.

## No-op rewrites

These can be removed when they operate on the same value / same local stack region:

- `swap swap`
- `q< q>`
- `q> q<`
- `dup drop`
- `++ --`
- `-- ++`

These can be collapsed to named words:

- `drop drop` -> `drop2`
- `drop drop drop` -> `drop2 drop`
- `swap drop` -> `nip`

## Core canonicalizations

Prefer existing core words over equivalent expansions from `ff/lib/core/core.ff`.

- `swapd swap` -> `dig`
- `swap swapd` -> `bury`
- `swap swapd swap` -> `rot`
- `rot swapd` -> `dig`
- `rot dig` -> `swapd`
- `dupd swap` -> `over`
- `swap drop` -> `nip`
- `swap over` -> `tuck`

Apply these even when the component words are split across lines.

Semantic normalizations are also worth applying when they improve readability without changing the
stack shape:

- `0 =` -> `zero?`
- `0 !=` -> `nz?`

Use these when the compared value is already on top and the surrounding code is not relying on the
literal `0` for emphasis.

## Rewrites under `dip`

Quoted shuffles under `dip` are often the cleanest way to express a deeper transform.

- `[ nip ] dip`
- `[ dig ] dip`
- `[ bury ] dip`
- `[ swapd ] dip`

These are useful when you want to rewrite a suffix of the stack while keeping one value parked on
top.

### Unary words and redundant `dup` / inner `drop`

Words like `sgn`, `abs`, and many others **consume** their operand. A sequence such as
`dup` *unary* `[ drop ... ] dip` can look like it is “dup to compute, then drop the spare under
`dip`,” but the spare may exist only because of `dup`. If *unary* alone on the same inputs already
removes that operand, try the version **without** `dup` and **without** the leading `drop` in the
quotation: the stack under `dip` may already be what you need (for example `n sgn(u)` instead of
`n u sgn(u)` after `dup sgn`).

**Sanity check:** from the real inputs, write the stack after the unary word by itself. If the
value you meant to `drop` is already gone, the `dup`/`drop` pair is likely redundant—re-derive from
the word contract instead of trusting the historical shape of the code.

### Tested example

In `atan-core`, this terminal cleanup:

```ff
drop
drop
dig
drop
```

was rewritten as:

```ff
drop2
[ nip ] dip
```

Both map:

```ff
u v u2 p q odd v2 -> u v p q
```

## Queue-to-`dip` rewrites

The most important queue simplification is:

```ff
q< X q>  ==  [ X ] dip
```

This is the key move when converting queue-local code into queue-safe stack code.

Another common queue pattern is the queue-preserving peek:

```ff
q> dup q<
```

This means "read the queued top value while preserving it in the queue". Treat it as a recognizable
pattern when reviewing queue-heavy code.

### Collapsing pattern

```ff
dup q< [ X ] dip q>
```

can become:

```ff
dup [ [ X ] dip ] dip
```

Two nested queue saves collapse similarly:

```ff
q< q< X q> q>
```

can become:

```ff
[ [ X ] dip ] dip
```

### Mechanical substitution

The rewrite is a direct text substitution:

- `q<` → `[`
- `q>` → `] dip`

Apply this mechanically at every nesting level without analyzing stack effects. The equivalence is
definitional.

When a `q< ... q>` pair spans multiple lines, both the opening `q<` and the closing `q>` must be
replaced. Do not only edit the line containing `q<` — the `q>` on a later line must also become
`] dip`.

For words marked `.unsafe`, the substitution can still be applied to innermost pairs. Work
inside-out and stop when no matching pairs remain — the leftover `q<`/`q>` are the ones that share
queue state with the caller and must stay as-is.

### `.unsafe` migration while inlining

When queue operations are moved from helper `A` into caller `B` (for example by inlining), move the
`.unsafe` marker with them.

- If `A` no longer contains `q<`/`q>`, remove `.unsafe` from `A`.
- If `B` now contains queue operations (or calls queue-using words in an unsafe context), add
  `.unsafe` to `B`.
- Keep `.unsafe` on the smallest word that still directly owns the unsafe queue behavior.

### Identifying innermost pairs

When tracing pairs, match `q<` with its closest unmatched `q>`. Multiple queue operations on the
same line can belong to different pairs — do not treat all `q>` on a line as belonging to the same
pair. A `q>` that is the closing half of a pair is not "between" that pair.

A pair is innermost if and only if the content between its `q<` and `q>` contains no other `q<` or
`q>`. If the content has any queue operations, the pair is not innermost — find a different one.

### Apply inside-out

If multiple nested `q< ... q>` regions exist, collapse the innermost one first, then re-scan for
the next innermost pair. Each replacement changes the content between remaining pairs, so always
re-evaluate after every step.

Only replace what is between the pair's own `q<` and `q>`. When pairs are adjacent (not nested),
each pair's content is separate — do not pull content from an adjacent pair into the replacement.

## Branch simplifications

When one branch is empty, prefer `?` over `branch`.

```ff
cond [ X ] [ ] branch
```

becomes:

```ff
cond [ X ] ?
```

The dual form is:

```ff
cond [ ] [ X ] branch
```

which can become:

```ff
cond not [ X ] ?
```

Only apply the dual rewrite when introducing `not` is genuinely clearer than leaving the original
branch form.

## Extract vs reuse

Before creating a helper:

1. check `ff/lib/core/core.ff`
2. check imported modules
3. check nearby math helpers

Prefer reuse over local aliases.

Example:

- `sqr2` already exists in `ff/lib/math/arith.ffp`

Do not create a local helper with a similar name unless it has a genuinely different stack effect.

## Watch for false friends

Two sequences can look similar while having very different stack effects.

- `over sqr over sqr` / `sqr2` means:

```ff
a b -> a b a² b²
```

- `* [ * ] dip` means:

```ff
a b c d -> a*b c*d
```

Both mention two multiplications. They are not interchangeable.

## Lessons from `ff/lib/math/atan.ffp` (scaled range reduction)

This refactor is a good end-to-end example of stack annotations, testing, and when queue-backed
helpers are worth centralizing.

### `dipd` vs nested `dip` + `dup` of the deep cell

When the stack is `a b c [Q]` (quotation on top) and the quotation must run **only on `a`** while
temporarily parking `b` and `c`, use core `dipd`:

```ff
dipd: swap q< swap q< eval q> q> ; /* stash top two; run [Q] on third; unstash */
```

It replaces ad hoc `__dup3`-style shuffles plus nested `dip` for patterns like “duplicate precision
`n`, build `π/2` or `π/4` from `n`, then call `_atan__scaled` on the full ratio triple.” Prefer
**one** named combinator in `ff/lib/core/core.ff` over repeating the queue sequence in each caller.

`dipd` is **not** `.unsafe`: the queue use is **balanced**—the definition begins with `q<` and ends
with matching `q>` so no queue state leaks to the caller. Unsafe patterns are those where queue
operations pair across word boundaries or leave unmatched `q<`/`q>` relative to the caller.

### Integer-scaled subtraction is not `floor` of a real difference

The implementation often computes **`floor(10ⁿ·offset) − floor(10ⁿ·atan(⋯))`** (two truncations), not
**`floor(10ⁿ·(offset − atan(⋯)))`**. Goldens taken from `math.atan` in one step can disagree by **1**
with the library’s integer path—**tests must use the same truncation model** as the code (or derive
expected values from the same scaled words), not a single `floor(10ⁿ * atan(…))` from a float.

### Branch coverage and mathematical identities

Some ratios sit on **identities** that make two different reduction formulas yield the **same**
scaled integer (for example `atan(1/2)` and complementary-angle rearrangements). Tests that only
check those values **do not** distinguish half-π, quarter-π, and Taylor-only branches. Add **at
least one golden per distinct code path** (e.g. `u > v`, `u ≤ v` with π/8 reduction, and a ratio that
stays in the Taylor core).

### Per-line annotations where `n` disappears

After `_atan__scaled` (or any word that consumes the precision cell `n`), **do not** carry `n` in
subsequent line comments—re-derive the stack from the word’s contract. Misleading `n` in comments
was a recurring slip during review.

## Suggested workflow

1. Write the word-level stack contract.
2. Add per-line annotations to the unstable or subtle region.
3. Canonicalize obvious core-word expansions.
4. Collapse queue-local regions into `dip` where possible.
5. Re-check the full stack effect.
6. Run the relevant test suite.
7. Remove only the comments that no longer carry their weight.

## References

- `ff/lib/core/core.ff`
- `ff/lib/math/atan.ffp` (scaled `dipd` range reduction, TAP branch coverage)
- `ff/lib/math/atan-core.ffp`
- `_docs/stack-notation.md`
- `_docs/core-vocabulary.md`
