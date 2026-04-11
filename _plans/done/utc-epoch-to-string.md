---
status: done
status_date: 2026-04-10
creator: cursor
---

# Plan: Add a UTC epoch-to-string utility to F♭m

## Summary

Add a small utility that converts a Unix timestamp in seconds into a UTC ISO-8601 string, for example `1712088000 -> 2024-04-02T12:00:00Z`, by splitting calendar arithmetic from output formatting.

## Context

Useful for logging, tests, and interoperability where fixed UTC strings are required. The design favors small, testable helpers and a clear boundary between “epoch → calendar parts” and “parts → string”.

## Approach

### 1. Define the core conversion boundary

Decide on the primary internal word shape:

- `epoch>utc` → converts epoch seconds into calendar parts
- optional printer word to render those parts as text

This keeps date arithmetic separate from output formatting.

### 2. Implement calendar helpers

Add small reusable helpers for:

- leap-year detection
- days in year
- days in month
- splitting seconds-of-day into hour/minute/second

These should be individually testable.

### 3. Implement day-count to calendar-date conversion

Convert whole days since `1970-01-01` into:

- year
- month
- day

Use the simplest correct approach first, favoring clarity over optimization.

### 4. Implement the full epoch conversion word

Combine:

- days / seconds-of-day split
- time-of-day conversion
- date conversion

Output should be the six UTC fields:

- year
- month
- day
- hour
- minute
- second

### 5. Add formatting/output word

Add a separate utility that prints or builds:

`YYYY-MM-DDTHH:MM:SSZ`

This layer should handle zero-padding and separators only.

### 6. Add tests

Cover at minimum:

- Unix epoch zero
- one day after epoch
- leap year boundaries
- month boundaries
- end/start of year boundaries
- several known real timestamps

Prefer fixed expected UTC outputs.

### 7. Document assumptions and limits

Document that the utility:

- expects Unix seconds
- uses the Gregorian calendar
- outputs UTC only
- does not support named timezones or DST

### Recommended delivery order

1. Core helpers
2. `epoch>utc`
3. Formatter/printer
4. Tests
5. Documentation

## Decisions already made

- UTC only; no local timezone support, DST, locale-specific formatting, or leap-second handling.
- Internal split: conversion to calendar parts (`epoch>utc`) vs. a separate formatting/printer word.
- Gregorian calendar; input is Unix seconds since 1970-01-01 UTC.
- Formatter produces `YYYY-MM-DDTHH:MM:SSZ` with zero-padding and separators only.

## Open questions

None — ready to implement.

## Out of scope

- Local timezone support
- DST handling
- Locale-specific formatting
- Leap-second support

## Dependencies

- None

## References

- `_docs/core-vocabulary.md` (stack effects and naming patterns for new words)
