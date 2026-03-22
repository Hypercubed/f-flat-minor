# Plan: Add `cons` parity to Racket

## Status
ready — 2026-03-22

## Summary
Implement the `cons` system primitive in the Racket runtime so it matches the existing TypeScript behavior and can run `ff/lib/seq/*.ffp` programs that depend on `cons`.

## Context
The repo already has a language-level design for `cons` in `_plans/ffm-better-strings.md`, and the TypeScript core already implements `cons` as opcode `,` / ASCII `44`.

Racket still fails on `cons`-using programs with an unknown user opcode error because `cons` is still being treated as a user symbol instead of a system primitive. The failing shared-library entrypoint is visible in `ff/lib/seq/seq.ffp`, and the existing regression coverage lives in `ff/lib/seq/__tests__/seq.ffp`.

## Approach
Reserve opcode `,` / ASCII `44` as `cons` in Racket so it matches the TypeScript opcode table exactly.

For Racket:
- Add `op_cons` in `racket/private/ops.rkt`.
- Add `"cons"` to `system_symbols` in `racket/private/symbols.rkt` so lexer/parser/expander paths resolve it as a system word.
- Add runtime support in `racket/private/engine.rkt`:
  - pop `y`, then `x`
  - allocate a fresh anonymous definition containing `x` as a push and `y` as a call
  - push the resulting anonymous pointer
  - if executed during nested quote/definition construction, mirror anonymous-quote behavior so the pointer is captured as data, not executed

Testing:
- Add focused `cons` semantics checks for Racket covering:
  - `0 eval depth 1`
  - `4 [ ] cons eval` leaves `4`
  - `4 0 cons eval` leaves `4`
  - `1 [ 2 + ] cons eval` leaves `3`
  - `4 [ dup * ] cons eval` leaves `16`
- Run `ff/lib/seq/__tests__/seq.ffp` through Racket as the main regression test proving library compatibility.
- Re-run Racket’s existing compile/execute/interpret test tasks to catch opcode table regressions.

## Decisions already made
- Scope is limited to adding `cons` support for Racket.
- `cons` must match the existing TypeScript implementation exactly.
- Opcode value is ASCII `,` / `44`.
- `cons` allocates a new anonymous word with body `[ PUSH x, CALL y ]`.
- This plan does not include `concat`, string-literal desugaring, `first`, `rest`, or broader string/list features.

## Open questions
None — ready to implement.

## Out of scope
- Adding `concat`
- Changing string literal compilation
- Adding list/string inspection primitives such as `first` or `rest`
- Updating other language implementations beyond Racket

## Dependencies
- `_plans/ffm-better-strings.md`

## References
- `_plans/ffm-better-strings.md`
- `typescript/core/src/opcodes.ts`
- `typescript/core/src/engine.ts`
- `ff/lib/seq/seq.ffp`
- `ff/lib/seq/__tests__/seq.ffp`
