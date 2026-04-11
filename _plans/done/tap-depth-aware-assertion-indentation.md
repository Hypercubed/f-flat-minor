---
status: done
status_date: 2026-03-28
creator: codex
---

# Plan: Depth-Aware TAP Indentation for Assertion and Plan Words

## Summary
Implement depth-derived indentation inside `OK`, `PLAN`, `#SKIP`, and `#TODO` in `ff/lib/tap.ffp`, and remove the `@OK`, `@PLAN`, `@#SKIP`, and `@#TODO` variants. Limit this change to assertion/plan emission only; do not change `TEST` yet because its call-site stack shape is not depth-stable while strings are non-atomic.

## Context
Current converted TAP tests show that assertion/plan words have stable stack shapes at their call sites:
- top-level `OK` / `PLAN` run at depth 3
- one-subtest-deep `OK` / `PLAN` run at depth 5
- deeper nesting should therefore continue in steps of 2 stack items per TAP scope

This makes assertion/plan indentation derivable from active TAP state on the stack. `TEST` does not share that property yet because the label string contributes variable stack depth.

## Approach
- Add one internal helper in `ff/lib/tap.ffp` that computes TAP indentation level for assertion/plan words from stack depth.
- Use the rule `indent_level = (depth - 3) / 2`.
- Emit `4` spaces per indentation level to match TAP14 subtest indentation rules.
- Call the helper at the start of `OK`, `PLAN`, `#SKIP`, and `#TODO` so each word self-indents.
- Remove `@OK`, `@PLAN`, `@#SKIP`, and `@#TODO` from `ff/lib/tap.ffp`.
- Update the currently converted TAP tests to use only base words:
  - `ff/lib/math/__tests__/sqrt.test.ffp`
  - `ff/lib/math/__tests__/math.test.ffp`
  - `ff/lib/math/__tests__/sqrt-flat.test.ffp`
- Update `_docs/supplemental/tap-testing.md` to document that assertion/plan words self-indent by depth and that the `@...` variants no longer exist.
- Leave `TEST` unchanged for now.

## Decisions already made
- Scope is limited to `OK`, `PLAN`, `#SKIP`, and `#TODO`.
- `TEST` is explicitly deferred.
- The `@...` assertion/plan helpers will be removed immediately rather than kept as aliases.
- TAP indentation must use `4` spaces per level, not tabs.
- Only the three currently converted TAP tests are in scope for update.

## Open questions
None — ready to implement.

## Out of scope
- Making `TEST` depth-aware.
- General string model changes or atomic-string work.
- Updating TAP files that are currently being converted by another agent.
- Broader TAP refactors beyond indentation and helper removal.

## Dependencies
- None

## References
- `ff/lib/tap.ffp`
- `_docs/supplemental/tap-testing.md`
- `ff/lib/math/__tests__/sqrt.test.ffp`
- `ff/lib/math/__tests__/math.test.ffp`
- `ff/lib/math/__tests__/sqrt-flat.test.ffp`
- TAP14 specification: https://testanything.org/tap-version-14-specification.html
