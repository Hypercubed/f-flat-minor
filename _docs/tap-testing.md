# Fbm TAP Testing

This document describes the TAP-style test helper in [`ff/lib/tap.ffp`](../ff/lib/tap.ffp) and the current `.test.ffp` convention used for library tests.

## Overview

`ff/lib/tap.ffp` emits TAP version 14 style output that works with the current Bun TAP runner:

```bash
cd bun && chomp test:tap
```

This is the recommended way to run TAP-style library tests in this repo. Future agents should prefer this path instead of trying multiple runtimes for the same TAP file.

The helper is intentionally small. It gives you:

- `TAP-VERSION` to start a TAP file
- `TEST` to print a subtest header
- `OK` to print `ok` or `not ok`
- `#SKIP` to print a skipped assertion
- `#TODO` to print a TODO assertion
- `SKIP-ALL` to skip an entire TAP file with a reason
- `PLAN` to print `1..n` and return whether emitted assertion count matched `n` and failure count is zero

`OK`, `PLAN`, `#SKIP`, and `#TODO` self-indent from TAP depth. For assertion and plan emission, the helper computes:

- `indent_level = (depth - 3) / 2`
- `4` spaces per indentation level

## String Notes

Current TAP tests should use explicit Fbm string literals for anything printed by the helper.

- Start printed test strings with `\0`.
- Escape spaces as `\s`.

Examples:

```ff
'\0Logical' TEST
'\0Control\sFlow' TEST
'\0&\s(and)' TEST
```

Until string handling is improved, treat this as the default convention for TAP labels and other printed strings in `.test.ffp` files.

## Public Words

### `TAP-VERSION`

Prints `TAP version 14`, clears the stack first, and resets the top-level TAP counters. This is important because TAP output should not be mixed with leftover stack state.

### `OK`

Consumes the top stack item, treats it as a boolean, increments the assertion counter, and prints:

- `ok <index>` when the value is truthy
- `not ok <index>` when the value is zero

It also leaves a boolean result on the stack:

- `true` for pass
- `false` for fail

When the assertion fails, `OK` increments the internal failure counter.

Inside flattened subtests, use plain `OK`; it indents itself based on TAP depth.

### `PLAN`

Prints `1..n`, where `n` is the expected number of emitted assertions, then compares `n` against the internal assertion counter.

Important details:

- `PLAN` counts emitted TAP points (`OK`, `#SKIP`, and `#TODO`), not just passing assertions.
- `PLAN` decides whether the current TAP scope passes.
- It leaves a boolean on the stack indicating both of the following are true:
  - emitted count matched `n`
  - failure count is zero

Inside flattened subtests, use plain `PLAN`; it indents itself based on TAP depth.

### `#SKIP`

Consumes the current assertion result, increments the assertion counter, and prints:

```text
ok <index> # SKIP
```

It ignores the assertion result for pass/fail accounting: the TAP point is emitted as `ok`, and it does not contribute a failure to `PLAN`.

This means `#SKIP` is meant to be a drop-in replacement for `OK` on the same assertion line when you want to record a skipped check without failing the current TAP scope. Like `OK`, it self-indents inside subtests.

### `#TODO`

Consumes the current assertion result and prints either:

```text
ok <index> # TODO
```

or:

```text
not ok <index> # TODO
```

`#TODO` does not contribute a failure to `PLAN`.

This matches the current helper design: TAP still shows whether the TODO currently passes or fails, but the suite does not fail because of that line.

This means `#TODO` is also meant to be a drop-in replacement for `OK` on the same assertion line. Like `OK`, it self-indents inside subtests.

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

`TEST` prints the header and resets the subtest TAP counters.

In the current known-good pattern, the subtest body should usually be flattened directly under `TEST` without `(` ... `)` wrappers.

## Recommended Shape

The current known-good pattern is:

1. Print `TAP-VERSION`.
2. For each subtest:
   - print a label with `TEST`
   - run a series of `OK` checks
   - optionally use `#SKIP` or `#TODO` inside the subtest
   - finish with `PLAN`
   - collapse the subtest result with top-level `OK`
3. For the top-level suite:
   - finish with `PLAN`

Prefer flattened subtests by default:

```ff
TAP-VERSION

'\0example' TEST
  1 1 = OK
  1 PLAN OK

1 PLAN
```

Keep the subtest assertion lines visually indented in source for readability; emitted TAP indentation now comes from the helper itself.

Use `(` ... `)` only when you actually need stack or queue isolation for the test body. That is an escape hatch, not the recommended shape for normal TAP files.

### Legacy Wrapped Shape

Older TAP files used a wrapped subtest shape:

1. Print `TAP-VERSION`.
2. For each subtest:
   - print a label with `TEST`
   - enter `(` to stash the outer stack
    - run a series of `OK` checks
    - optionally use `#SKIP` or `#TODO` inside the subtest
    - finish with `PLAN`
   - leave `)` and collapse the subtest result with `OK`
3. For the top-level suite:
   - run subtests and top-level `OK` lines
   - finish with `PLAN`

The `(` and `)` words are core STASH/FETCH operations. In this pattern they park the outer stack on the queue while the subtest tracks its own TAP counters.

That wrapped form may still be useful in unusual cases, but it is no longer the default recommendation and should not be presented as the normal subtest structure. Avoid nested STASH/FETCH or manual `q<` / `q>` in the test body unless you are specifically testing queue behavior or there is no simpler way to express the post-condition.

## Example

This is the current known-good flattened structure used in [`ff/lib/math/__tests__/sqrt.test.ffp`](../ff/lib/math/__tests__/sqrt.test.ffp) and [`ff/lib/math/__tests__/math.test.ffp`](../ff/lib/math/__tests__/math.test.ffp):

```ff
.import ../sqrt.ffp
.import ../../tap.ffp

TAP-VERSION

'\0isqrt' TEST
  0 isqrt 0 = OK
  1 isqrt 1 = OK
  2 PLAN OK

1 PLAN
```

What happens here:

- `TAP-VERSION` initializes the top-level TAP counters before the first subtest
- `TEST` starts each subtest at `0 failures, 0 assertions`
- each `OK` emits one TAP point and increments the assertion counter
- `PLAN` prints the inner plan and verifies both emitted subtest TAP point count and zero recorded failures
- outer `OK` prints the subtest result
- final `PLAN` validates both the number of emitted top-level test points and zero recorded failures

This flattened form is currently known good and should be preferred for new TAP files unless stack isolation is required.

## Asserting Stack Shape

Older `testing.ffp` tests often assert a whole stack shape by consuming values one at a time with `assert_eq`. When converting them to TAP, the simplest approach is usually to turn the full post-condition into one boolean and feed that into `OK`.

For single-result words, prefer direct comparisons:

```ff
5 false [ 3 + ] [ 3 - ] branch 2 = OK
```

For multi-value stack results, compare from the top of the stack downward and combine the checks with `and`:

```ff
3 5 dup2 5 = swap 3 = and swap 5 = and swap 3 = and OK
```

Another example:

```ff
1 2 3 bury 2 = swap 1 = and swap 3 = and OK
```

Practical hints:

- Prefer one `OK` per logical post-condition, not one per stack item, when the word leaves several values.
- Check values in the order they are naturally available from the stack top.
- Use `swap` to bring the next pending value into position before the next comparison.
- Collapse intermediate booleans with `and`.
- Prefer this direct style over queue plumbing in tests.
- If the expression becomes hard to read, split the original test group into smaller TAP subtests instead of introducing manual `q<` / `q>`.

## Zero-Test Cases

Zero-test plans are supported because `PLAN` checks emitted assertion count directly.

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
'\0empty' TEST
  0 PLAN OK
1 PLAN
```

This prints a passing empty subtest and a passing top-level plan.

## Skip And TODO Examples

Skip one assertion inside a subtest:

```ff
'\0feature\sflags' TEST
  2 2 + 5 = #SKIP
  1 PLAN OK
1 PLAN
```

Mark one assertion as TODO:

```ff
'\0future\sbehavior' TEST
  2 2 + 5 = #TODO
  1 PLAN OK
1 PLAN
```

Skip an entire file:

```ff
TAP-VERSION
'\0ncos\sand\snsin\snot\simplemented' SKIP-ALL
```

## Current Conventions And Limitations

- `PLAN` validates emitted TAP point count against `n` and also requires zero failures in the current TAP scope.
- `TEST` prints the subtest header and resets subtest counters; in the normal flattened style, `PLAN OK` determines subtest success.
- `TAP-VERSION` owns top-level reset and `TEST` owns subtest reset.
- `#SKIP` and `#TODO` emit assertion points and increment assertion count.
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
