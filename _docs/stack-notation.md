# F♭m Stack Notation Standard

This document defines the standard notation for documenting stack effects in f-flat-minor code.

## Overview

Stack effect comments describe how a word transforms the stack. The notation follows rewrite-rule semantics inspired by Joy, with explicit variadic markers from regex notation.

## Basic Form

```
/* inputs word == outputs */
```

- `/* */` delimit the comment (parentheses are reserved for STASH/FETCH)
- `==` separates inputs from outputs (read as "rewrites to")
- The word appears in its natural postfix position
- Stack top is rightmost on both sides

## Values

| Notation | Meaning |
|----------|---------|
| `a`, `b`, `n`, `x` | Exactly one value |
| `n'` | Modified version of same value |
| `…` | The rest of the stack (row variable). Use only for whole-stack words. ASCII fallback: `..` |

## Regex-Style Quantifiers (Quantitative Notation)

| Notation | Meaning | Example |
|----------|---------|---------|
| `a` | Exactly one | `/* a b swap == b a */` |
| `a*` | Zero or more | `/* [A] eval == a* */` |
| `a+` | One or more | `/* … [A] each == a+ */` |
| `a?` | Zero or one (optional) | `/* a b? opt == a or a b */` |
| `a{2,4}` | Between 2 and 4 | `/* n{2,4} pack == packed */` |

The quantifier applies to the preceding value name. When applied to quotation results (`a*`, `A+`), the lowercase letter matches the uppercase quotation name.

## Quotations

| Notation | Meaning |
|----------|---------|
| `[A]` | Quotation pointer, unevaluated |
| `a*` | Results of evaluating `[A]` (zero or more) |
| `A+` | Results of evaluating `[A]` (one or more) |

The case correspondence links quotation to result: `[Foo]` produces `foo*` or `foo+`.

## Side Effects

Side effects are enclosed in `{ }` (curly braces), which are unused in F♭m syntax:

```
/* n putc == {prints char(n)} */
/* getc == n {reads char} */
/* clock == n {reads clock} */
/* n exit == {exits with code n} */
```

Multiple effects are comma-separated:
```
/* n putn == {prints n, newline} */
```

## Whole-Stack Words

Words that operate on the entire stack use `…` (the row variable):

```
/* … clr == */                 Remove all items
/* … depth == … n */           Push count of items
/* … sum! == n */              Sum all items
/* … [A] map! == a* */         Transform each item
/* … reverse! == …' */         Reverse order (primed = rearranged)
```

## Queue Effects

For words with persistent queue effects, append `|` with queue state:

```
/* a q< == | …a */             Move to queue tail
/* q> == a | a… */             Restore from queue tail
/* … (spigot-step) == …' | …' */   Queue state transforms too
```

## Mid-Body Snapshots

Within word bodies, use stack pictures without `==`:

```ff
(_isqrt_newton):
  dup2 / over + 1 >>  /* x guess' */
  dup2 >              /* x guess' flag */
  [ nip (_isqrt_newton) ] ? ;
```

## Examples

```ff
/* a dup == a a */
/* a b swap == b a */
/* a drop == */
/* a b + == n */
/* a b = == flag */
/* a b < == flag */

/* [A] eval == a* */
/* flag [A] ? == a* */
/* a [B] dip == b* a */
/* a [B] sip == a b* a */
/* flag [A] [B] branch == a* or b* */

/* a b c rot == c b a */
/* a b over == a b a */
/* n ! == n! */
/* n k nck == C(n,k) */
/* n isqrt == floor(sqrt(n)) */
/* scale num den atan2 == floor(10^scale*atan(num/den)) */

/* n putc == {prints char(n)} */
/* … . == … {prints stack} */
```

## References

- Joy (von Thun): Rewrite-rule semantics with `==` separator
- Cat (Diggins): Row variables for stack polymorphism  
- Factor (Pestov): Explicit stack effect declarations
- Forth (ANS): Traditional `( before -- after )` form (adapted for F♭m)
