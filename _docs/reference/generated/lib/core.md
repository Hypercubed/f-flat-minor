---
title: Core library
summary: Reference for the derived stack, logic, and control-flow words exported by `ff/lib/core/core.ff`.
order: 110
---

# Core library reference

This page lists the public words currently defined in the top-level `core` library module.

## `core.ff`

Source: `ff/lib/core/core.ff`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `true` | `-- 1` | Pushes the canonical true value. |
| `false` | `-- 0` | Pushes the canonical false value. |
| `--` | `n -- n-1` | Decrements an integer by one. |
| `++` | `n -- n+1` | Increments an integer by one. |
| `pred` | `n -- n n-1` | Duplicates a value and pushes its predecessor. |
| `succ` | `n -- n n+1` | Duplicates a value and pushes its successor. |
| `slip` | `[A] b -- a* b` | Runs a quotation under the top value and restores that value afterward. |
| `swapd` | `a b c -- b a c` | Swaps the lower two items of the top three. |
| `dupd` | `a b -- a a b` | Duplicates the second item while leaving the top item in place. |
| `drop2` | `a b --` | Drops the top two values. |
| `dip` | `a [B] -- b* a` | Runs a quotation while temporarily stashing the top item. |
| `dipd` | `a b [B] -- b* a b` | Runs a quotation under the top two items. |
| `dig` | `a b c -- b c a` | Rotates the third item to the top. |
| `bury` | `a b c -- c a b` | Rotates the top item below the next two items. |
| `rot` | `a b c -- c b a` | Reorders the top three values by reversing their outer positions. |
| `over` | `a b -- a b a` | Copies the second item to the top. |
| `dup2` | `a b -- a b a b` | Duplicates the top pair. |
| `run` | `[A] -- a* [A]` | Evaluates a quotation while leaving the quotation on the stack. |
| `nip` | `a b -- b` | Removes the second item from the top pair. |
| `tuck` | `a b -- b a b` | Copies the top item beneath the next item. |
| `sip` | `a [B] -- a b* a` | Runs a quotation with a copy of the preserved top item. |
| `sipd` | `a [B] c -- a b* a c` | Runs `sip` one level deeper under the top item. |
| `bi` | `a [B] [C] -- b c` | Applies two quotations to the same input value. |
| `bi2` | `a b [C] [D] -- c d` | Applies two quotations to the same input pair. |
| `zero?` | `n -- flag` | Tests whether a value is zero. |
| `not` | `flag -- flag'` | Logical negation for truthy/falsey integer flags. |
| `nz?` | `n -- flag` | Tests whether a value is non-zero. |
| `truthy?` | `n -- flag` | Normalizes a value to a truthiness flag. |
| `falsey?` | `n -- flag` | Tests whether a value is falsey. |
| `!=` | `a b -- flag` | Tests whether two values differ. |
| `<=` | `a b -- flag` | Tests whether `a` is less than or equal to `b`. |
| `>=` | `a b -- flag` | Tests whether `a` is greater than or equal to `b`. |
| `sort2` | `a b -- min max` | Orders a pair from smaller to larger. |
| `between?` | `lo hi n -- flag` | Tests whether a value lies between two bounds. |
| `bxor` | `a b -- n` | Computes bitwise exclusive-or. |
| `and` | `a b -- flag` | Returns a truthy flag when both inputs are truthy. |
| `or` | `a b -- flag` | Returns a truthy flag when either input is truthy. |
| `nand` | `a b -- flag` | Returns the negation of `and`. |
| `nor` | `a b -- flag` | Returns the negation of `or`. |
| `or_else` | `a [B] [C] -- flag` | Short-circuits to true or evaluates a fallback quotation. |
| `and_also` | `a [B] [C] -- flag` | Short-circuits to false or evaluates a continuation quotation. |
| `choose` | `a b flag -- a or b` | Selects one of two values based on a flag. |
| `branch` | `a flag [B] [C] -- b* or c*` | Evaluates one of two quotations based on a flag. |
| `empty?` | `.. -- .. flag` | Tests whether the data stack is empty. |
| `pushtop` | `.. a -- a ..` | Moves the top item to the bottom of the current stack. |
| `loop` | `a [B] n -- a b* [B]` | Repeats a quotation `n` times, leaving the quotation. |
| `times` | `a [B] n -- a b*` | Repeats a quotation `n` times and discards the quotation. |
| `seq` | `a n [B] -- a b*` | Builds a sequence of repeated quotation applications from a seed value. |
| `range` | `a b -- a..b` | Expands an inclusive integer range. |
| `count` | `n -- 1..n` | Pushes the integers from `1` through `n`. |
