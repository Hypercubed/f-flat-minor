# Fbm TAP Testing

This document describes the TAP-style test helper in [`ff/lib/tap.ffp`](../ff/lib/tap.ffp) and the current `.test.ffp` convention used for library tests.

## Overview

`ff/lib/tap.ffp` emits TAP version 14 style output that works with the current Bun TAP runner:

```bash
cd bun && chomp test:tap
```

The helper is intentionally small. It gives you:

- `TAP-VERSION` to start a TAP file
- `TEST` to print a subtest header
- `OK` / `@OK` to print `ok` or `not ok`
- `#SKIP` / `@#SKIP` to print a skipped assertion
- `#TODO` / `@#TODO` to print a TODO assertion
- `SKIP-ALL` to skip an entire TAP file with a reason
- `PLAN` / `@PLAN` to print `1..n` and return whether the pass count matched `n`

## String Notes

Current TAP tests should use explicit Fbm string literals for anything printed by the helper.

- Start printed test strings with `\0`.
- Escape spaces as `\s`.

Examples:

```ff
'\0Logical' TEST (
'\0Control\sFlow' TEST (
'\0&\s(and)' TEST (
```

Until string handling is improved, treat this as the default convention for TAP labels and other printed strings in `.test.ffp` files.

## Public Words

### `TAP-VERSION`

Prints `TAP version 14` and clears the stack first. This is important because TAP output should not be mixed with leftover stack state.

### `OK`

Consumes the top stack item, treats it as a boolean, and prints:

- `ok` when the value is truthy
- `not ok` when the value is zero

It also leaves a boolean result on the stack:

- `true` for pass
- `false` for fail

`@OK` is the indented form used inside subtests.

### `PLAN`

Prints `1..n`, where `n` is the expected number of passing checks, then compares `n` against the sum of the boolean results currently on the stack.

Important details:

- `PLAN` counts passed `OK` results, not total assertions executed.
- It seeds `sum!` with `0`, so `0 PLAN` is supported.
- It leaves a boolean on the stack indicating whether the pass count matched `n`.

`@PLAN` is the indented form used inside subtests.

### `#SKIP`

Consumes the current assertion result and prints:

```text
ok #SKIP
```

It leaves `true` on the stack so the current `PLAN` logic counts the skip as satisfied.

This means `@#SKIP` is meant to be a drop-in replacement for `@OK` on the same assertion line.

`@#SKIP` is the indented form used inside subtests.

### `#TODO`

Consumes the current assertion result and prints either:

```text
ok # TODO
```

or:

```text
not ok # TODO
```

`#TODO` always leaves `true` on the stack so the current `PLAN` logic treats TODO assertions as satisfied either way.

This matches the current helper design: TAP still shows whether the TODO currently passes or fails, but the suite does not fail because of that line.

This means `@#TODO` is also meant to be a drop-in replacement for `@OK` on the same assertion line.

`@#TODO` is the indented form used inside subtests.

### `SKIP-ALL`

Takes a reason string and prints a whole-file skip plan:

```text
1..0 # SKIP <reason>
```

Use this when a TAP file should exist but the underlying feature is not implemented yet.

### `TEST`

Prints a subtest header in the form:

```text
# Subtest: <description>
```

`TEST` only prints the header. The enclosing `(` ... `)` group and trailing `OK` determine whether the whole subtest passes.

## Recommended Shape

The current pattern is:

1. Print `TAP-VERSION`.
2. For each subtest:
   - print a label with `TEST`
   - enter `(` to stash the outer stack
   - run a series of `@OK` checks
   - optionally use `@#SKIP` or `@#TODO` inside the subtest
   - finish with `@PLAN`
   - leave `)` and collapse the subtest result with `OK`
3. Finish the file with a top-level `PLAN`

The `(` and `)` words are core STASH/FETCH operations. In this pattern they park the outer stack on the queue while the subtest accumulates its own assertion booleans.

In normal TAP tests, prefer one `(` ... `)` wrapper per subtest. Avoid nested STASH/FETCH or manual `q<` / `q>` in the test body unless you are specifically testing queue behavior or there is no simpler way to express the post-condition.

## Example

This is the same structure used in [`ff/lib/core/__tests__/bitwise.test.ffp`](../ff/lib/core/__tests__/bitwise.test.ffp):

```ff
.import ../core.ff
.import ../../tap.ffp

TAP-VERSION

'\0&\s(and)' TEST (
  0 0 & 0 = @OK
  0 1 & 0 = @OK
  1 0 & 0 = @OK
  1 1 & 1 = @OK
  6 @PLAN
) OK

1 PLAN
```

What happens here:

- each `@OK` pushes a pass/fail boolean for one assertion
- `@PLAN` prints the inner `1..6` line and returns whether all six assertions passed
- `)` restores the outer stack
- outer `OK` prints the subtest result
- final `PLAN` counts passed subtests

## Asserting Stack Shape

Older `testing.ffp` tests often assert a whole stack shape by consuming values one at a time with `assert_eq`. When converting them to TAP, the simplest approach is usually to turn the full post-condition into one boolean and feed that into `@OK`.

For single-result words, prefer direct comparisons:

```ff
5 false [ 3 + ] [ 3 - ] branch 2 = @OK
```

For multi-value stack results, compare from the top of the stack downward and combine the checks with `and`:

```ff
3 5 dup2 5 = swap 3 = and swap 5 = and swap 3 = and @OK
```

Another example:

```ff
1 2 3 bury 2 = swap 1 = and swap 3 = and @OK
```

Practical hints:

- Prefer one `@OK` per logical post-condition, not one per stack item, when the word leaves several values.
- Check values in the order they are naturally available from the stack top.
- Use `swap` to bring the next pending value into position before the next comparison.
- Collapse intermediate booleans with `and`.
- Prefer this direct style over queue plumbing in tests.
- If the expression becomes hard to read, split the original test group into smaller TAP subtests instead of introducing manual `q<` / `q>`.

## Zero-Test Cases

Zero-test plans are supported because `PLAN` uses `0 sum!`.

Examples:

```ff
TAP-VERSION
0 PLAN
```

prints:

```text
TAP version 14
1..0
```

An empty subtest is also valid:

```ff
TAP-VERSION
'\0empty' TEST (
  0 @PLAN
) OK
1 PLAN
```

This prints a passing empty subtest and a passing top-level plan.

## Skip And TODO Examples

Skip one assertion inside a subtest:

```ff
'\0feature\sflags' TEST (
  2 2 + 5 = @#SKIP
  1 @PLAN
) OK
1 PLAN
```

Mark one assertion as TODO:

```ff
'\0future\sbehavior' TEST (
  2 2 + 5 = @#TODO
  1 @PLAN
) OK
1 PLAN
```

Skip an entire file:

```ff
TAP-VERSION
'\0ncos\sand\snsin\snot\simplemented' SKIP-ALL
```

## Current Conventions And Limitations

- `PLAN` is a pass-count check, not an independent TAP assertion counter.
- `TEST` only prints the subtest header; `(...) OK` determines subtest success.
- Inner `@PLAN` counts passed assertions within one subtest.
- Outer `PLAN` counts passed subtests.
- `#SKIP` and `#TODO` consume the current assertion result, then leave `true` so they integrate with the current pass-count-based `PLAN`.
- `SKIP-ALL` replaces the usual final `PLAN` line for a whole-file skip.
- Printed TAP labels currently need explicit string-literal handling such as `'\0Control\sFlow'`.
- Migrating older stack-shape tests may require rewriting an `assert_eq` chain into one boolean expression with `swap`, `=`, and `and`.
- The output is compatible with `prove -v --exec ./build/ff-run ...` from the `bun/` directory.
- The current convention is to place TAP-style files under `ff/lib/**/__tests__/*.test.ffp`.

## Runner Commands

Run all TAP tests with Bun:

```bash
cd bun && chomp test:tap
```

Run a single TAP file directly with Node:

```bash
node node/bin/ff-run.ts ff/lib/core/__tests__/bitwise.test.ffp
```

Run a single TAP file through `prove` from `bun/`:

```bash
prove -v --exec ./build/ff-run ../ff/lib/core/__tests__/bitwise.test.ffp
```
