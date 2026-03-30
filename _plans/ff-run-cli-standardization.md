---
status: ready
status_date: 2026-03-29
creator: codex
---

# Plan: Standardize `ff-run` CLI Across Deno, Node, and Bun

## Summary

Standardize the three `ff-run` entrypoints so Deno, Node, and Bun expose the same CLI contract and observable behavior. Use the current Deno implementation as the canonical reference, while preserving only unavoidable runtime-specific differences and updating the runtime READMEs to describe one shared `ff-run` interface.

## Context

The three `ff-run` files are already close, but they still define their own local argument interfaces and parser wiring. Deno is the most complete documented reference for `ff-run`, while Node and Bun are still documented as primarily `ff-run`-focused runtimes and have README text that no longer fully matches the current CLI surface.

Relevant current state:
- `deno/bin/ff-run.ts` is the most complete reference for flag names, aliases, defaults, and control flow.
- `node/bin/ff-run.ts` and `bun/bin/ff-run.ts` are near-parity ports with runtime-specific parser and argv handling.
- Shared argument interfaces already exist in `typescript/core/src/args.ts`, but `ff-run` does not yet use them directly.

## Approach

### 1. Make Deno the canonical `ff-run` contract

Treat `deno/bin/ff-run.ts` as the source of truth for:
- supported long flags and short aliases
- default values
- positional file argument behavior
- numeric coercion for `base`, `trace-queue-max`, and `trace-stack-max`
- pipeline order and exit behavior
- stats/profile output wording

The canonical `ff-run` behavior should remain:
1. Read source from `file` or stdin.
2. Optionally preprocess.
3. Compile to IR.
4. Optionally validate.
5. Optionally print `hlir`.
6. Optionally optimize.
7. Optionally print `llir`, `ir`, or `disassemble`.
8. Optionally emit encoded bytecode with `--enc`.
9. Otherwise execute in the VM.
10. Optionally print stats and profile output.

### 2. Replace per-file argument typing with the shared `RunArgs` type

Update all three `ff-run` files to import and use `RunArgs` from the shared TypeScript core args module via each runtime's `src/args.ts` re-export.

This should remove the duplicated local `Arguments` interfaces in:
- `deno/bin/ff-run.ts`
- `node/bin/ff-run.ts`
- `bun/bin/ff-run.ts`

If `RunArgs` is missing fields needed by the current Deno contract, extend `typescript/core/src/args.ts` first and then use that type everywhere.

### 3. Centralize `ff-run` option metadata and normalization

Introduce a shared internal helper under `typescript/core/src` for the `ff-run` CLI contract.

This helper should define:
- the supported `ff-run` options
- the canonical defaults
- the canonical alias mapping
- normalization rules for positionals and typed numeric values

Runtime-specific entrypoints should remain responsible for invoking their platform parser:
- Deno uses `std/cli/parse_args.ts`
- Node uses `node:util.parseArgs`
- Bun uses `node:util.parseArgs` plus the existing `Bun.argv` workaround

But all three parsers should adapt into the same normalized `RunArgs` shape through shared logic, rather than re-encoding defaults and conversions separately in each file.

### 4. Keep runtime-specific code only where required

Do not force textual identity between the three files. Preserve runtime-specific differences only in:
- shebangs
- module imports
- file/path helpers
- stdin/stdout APIs
- `Deno.exit(...)` vs `process.exit(...)`
- Bun's `getRuntimeArgs()` handling for `bun run`

All other behavior should be aligned to the canonical Deno flow, including validation gating, stats reporting, trace setup, and encoded output behavior.

### 5. Update documentation to describe one shared `ff-run` interface

Update the three runtime READMEs so they no longer describe drifting `ff-run` behavior.

Documentation changes:
- Keep `deno/README.md` as the fullest behavioral reference for `ff-run`.
- Update `node/README.md` and `bun/README.md` to describe the same `ff-run` flag contract as Deno, while still documenting runtime-specific invocation/build/test details.
- Remove or rephrase stale Node/Bun wording that implies only `ff-run` exists or that other runtime CLIs are absent, but keep this plan scoped to standardizing `ff-run` only.
- Clarify that the contract is shared across Deno, Node, and Bun.

## Decisions already made

- Scope is limited to `ff-run`; this plan does not standardize `ff-compile`, `ff-execute`, `ff-preprocess`, or `ff-repl`.
- Deno is the canonical behavioral reference for `ff-run`.
- Shared argument definitions should come from `typescript/core/src/args.ts`, not per-runtime local interfaces.
- Shared option metadata and normalization are preferred over keeping three duplicated parser definitions in sync manually.
- Runtime-specific differences are allowed only where platform APIs require them.

## Open questions

None — ready to implement.

## Out of scope

- Adding a top-level `ff` command router for Node or Bun.
- Standardizing non-`ff-run` CLIs in the same change.
- Changing build/test/bench scope outside what is needed to verify `ff-run` parity.
- Refactoring unrelated runtime internals or shared compiler/engine behavior that does not affect `ff-run` parity.

## Dependencies

- `typescript/core/src/args.ts`
- `deno/bin/ff-run.ts`
- `node/bin/ff-run.ts`
- `bun/bin/ff-run.ts`
- `deno/README.md`
- `node/README.md`
- `bun/README.md`

## References

- `deno/bin/ff-run.ts`
- `node/bin/ff-run.ts`
- `bun/bin/ff-run.ts`
- `typescript/core/src/args.ts`
- `deno/README.md`
- `node/README.md`
- `bun/README.md`
- `_plans/done/node-chomp-build-test-bench.md`
