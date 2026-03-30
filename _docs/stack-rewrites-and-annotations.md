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

These can be collapsed to named words:

- `drop drop` -> `drop2`
- `drop drop drop` -> `drop2 drop`
- `swap drop` -> `nip`

## Core canonicalizations

Prefer existing core words over equivalent expansions from `ff/lib/core/core.ff`.

- `swapd swap` -> `dig`
- `swap swapd` -> `bury`
- `swap swapd swap` -> `rot`
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

### Apply inside-out

If multiple nested `q< ... q>` regions exist, collapse the innermost one first, then re-evaluate
the outer layer.

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
- `ff/lib/math/atan-core.ffp`
- `_docs/stack-notation.md`
- `_docs/core-vocabulary.md`
