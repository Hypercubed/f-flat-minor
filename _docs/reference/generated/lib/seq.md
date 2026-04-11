---
title: Sequence library
summary: Reference for quotation-backed sequence construction, traversal, and reduction words exported by the top-level `seq` module.
order: 113
---

# Sequence library reference

This page lists the public words currently defined in the top-level `seq` library module.

## `seq.ffp`

Source: `ff/lib/seq/seq.ffp`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `unit` | `a -- [a]` | Wraps a single value as a one-item quotation. |
| `stack` | `.. -- [..]` | Captures the current stack as a quotation. |
| `in` | `.. [Q] -- ..'` | Evaluates a quotation against a captured stack value layout. |
| `pair` | `a b -- [a b]` | Wraps two values as a quotation pair. |
| `compose` | `[A] [B] -- [A then B]` | Composes two quotations into one quotation. |
| `map!` | `a* [B] -- b*` | Applies a quotation to each stack item in place. |
| `reduce!` | `a+ [B] -- r` | Reduces stack items with a quoted reducer. |
| `head!` | `a+ -- a` | Returns the first item from a non-empty stack sequence. |
| `tail!` | `a+ -- a*` | Returns all but the first item from a non-empty stack sequence. |
| `last!` | `.. a -- a` | Returns the last item from the current stack sequence. |
| `reduce_r!` | `a+ [B] -- r` | Reduces stack items from the right. |
| `foldr!` | `a* [B] z -- r` | Right-folds stack items with an explicit seed. |
| `reduce_l!` | `a+ [B] -- r` | Reduces stack items from the left. |
| `foldl!` | `a* [B] z -- r` | Left-folds stack items with an explicit seed. |
| `reverse!` | `a* -- a*` | Reverses a stack-backed sequence in place. |
| `filter!` | `a* [B] -- a*` | Keeps only the items whose predicate quotation is truthy. |
| `map` | `[A] [B] -- [C]` | Builds a mapped quotation from an input quotation and mapper. |
| `first` | `[A] -- a` | Returns the first element of a quoted sequence. |
| `tail` | `[A] -- [B]` | Returns a quoted sequence without its first element. |
| `last` | `[A] -- a` | Returns the last element of a quoted sequence. |
| `foldr` | `[A] [B] z -- r` | Right-folds a quoted sequence with a seed value. |
| `foldl` | `[A] [B] z -- r` | Left-folds a quoted sequence with a seed value. |
| `reverse` | `[A] -- [B]` | Reverses a quoted sequence. |
| `filter` | `[A] [B] -- [C]` | Filters a quoted sequence with a predicate quotation. |
| `sum!` | `.. -- n` | Sums the current stack sequence. |
| `product!` | `.. -- n` | Multiplies the current stack sequence. |
| `sum` | `[A] -- n` | Sums a quoted sequence. |
| `product` | `[A] -- n` | Multiplies a quoted sequence. |
| `length` | `[A] -- n` | Returns the number of elements in a quoted sequence. |
| `emptyq?` | `[A] -- flag` | Tests whether a quoted sequence is empty. |
| `seq=` | `[A] [B] -- flag` | Tests quoted sequences for element-wise equality. |
