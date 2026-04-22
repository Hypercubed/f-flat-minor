---
id: typescript-debug-source-maps
title: "TypeScript Debug Traceability (Compile + Runtime)"
last_updated: 2026-04-10
description: >
  Add source-level debugging metadata to the TypeScript implementations so
   compile-time diagnostics and runtime faults can be traced back to sourc
  e file and line/column, without changing emitted .ffb bytecode payloads.
tags: [debugging, plans, typescript]
status: active
kind: initiative
author_kind: ai
prompter: "GPT-5.3-Codex"
---
# Plan: TypeScript Debug Traceability (Compile + Runtime)

## Status

ready — 2026-03-24

## Summary

Add source-level debugging metadata to the TypeScript implementations so compile-time diagnostics and runtime faults can be traced back to source file and line/column, without changing emitted `.ffb` bytecode payloads.

## Context

Current TypeScript paths (core + Node/Bun/Deno/Web runners) preserve symbol names and filenames in places, but they do not consistently preserve token-level source spans through preprocessing, compilation, optimization, and execution. This makes debugging hard because users often get generic errors without precise locations.

The architecture already has useful hooks:
- IR metadata fields (`filename`, `line`, `uid`) in `IrInstruction.meta`
- `SourceMap` and `Engine.loadSourceMap(...)` extension points
- integrated executors (`ff-run` and web playground) that can consume richer diagnostic data without altering bytecode output

## Approach

### Step 1 — Position-aware tokenization in the compiler

Introduce a location-preserving token stream in `typescript/core/src/compiler.ts`.

- Add a token type containing at least: token text/value, file, line, column, and stable span id.
- Add tokenizer/API variants that preserve positions while keeping existing non-position API behavior backward compatible.
- Ensure all IR instructions emitted by `compileToIR` receive source location metadata (filename + line/col + span id).

Deliverables:
- New token/location types
- New tokenizer and compiler entrypoint for position-aware compilation
- Tests covering literals, words, strings, comments, definition markers, and directives

### Step 2 — Preprocessor provenance mapping

Upgrade preprocessing in `typescript/core/src/preprocess.ts` so transformed output lines map back to original source origins.

- Emit preprocessing output plus provenance map from generated lines/tokens to source file/line/col.
- Preserve provenance across `.load`, `.import`, and `.m` expansion boundaries.
- Mark generated/expanded segments explicitly so diagnostics can say “generated from ...” when applicable.

Deliverables:
- Preprocessor result type with `code` + provenance metadata
- Mapping logic for nested imports/loads
- Tests for nested `.import` and macro expansion mapping

### Step 3 — Source map v2 schema and adapters

Evolve `typescript/core/src/source-maps.ts` from symbol-only data to instruction/source mapping while keeping backward compatibility.

- Define SourceMap v2: sources/names/mappings + existing symbol support.
- Add helpers to build source maps from IR metadata + preprocessing provenance.
- Keep compatibility path so old symbol-only maps still load.

Deliverables:
- Versioned source map schema
- Builder + parser/lookup utilities
- Compatibility tests (v1 symbol-only and v2 mapping)

### Step 4 — Runtime fault context and mapping in Engine

Improve `typescript/core/src/engine.ts` runtime errors to include execution context and resolved source location.

- Add structured runtime fault type (operation, value/name, stack/queue depth, source location).
- Track current instruction context during execution.
- Resolve runtime location through loaded source map v2.

Deliverables:
- Structured runtime error/fault API
- Source-aware fault formatting hooks
- Tests for stack underflow, undefined op, and user-op failures with mapped file/line

### Step 5 — Unified diagnostics formatter for integrated executors

Adopt a shared formatter in runners/UI so compile/runtime diagnostics use a consistent shape.

- Format diagnostics as: `file:line:column: <severity> <message>`.
- Include optional source excerpt/caret when source text is available.
- Wire into `deno/bin/ff-run.ts`, `deno/bin/ff-compile.ts`, `node/bin/ff-run.ts`, `bun/bin/ff-run.ts`, and web runner/repl error paths.

Deliverables:
- Shared diagnostic format helper
- CLI integration (Node/Bun/Deno)
- Web integration (program runner + REPL)

### Step 6 — Optional external JS source-map library integration

Use an existing JS source-map library for map generation/trace lookups if it reduces complexity.

- Evaluate `@jridgewell/gen-mapping` + `@jridgewell/trace-mapping` (or equivalent).
- Keep this optional behind an internal adapter layer.
- Emit sidecar debug map artifact for integrated executors (e.g. `.ffb.map.json`) when requested.

Deliverables:
- Adapter abstraction and selected implementation
- Optional sidecar map emission path
- Compatibility note for environments without sidecar maps

### Step dependency graph

- Step 1: no internal dependencies
- Step 2: depends on Step 1
- Step 3: depends on Steps 1 and 2
- Step 4: depends on Step 3
- Step 5: depends on Steps 3 and 4
- Step 6: depends on Step 3 (can run in parallel with Steps 4/5 once Step 3 is complete)

### Milestone slicing

- Milestone A (usable compile-time locations): Steps 1 + 2 + minimal Step 5 compile formatter
- Milestone B (runtime mapped faults): Steps 3 + 4 + remaining Step 5 runtime integration
- Milestone C (ecosystem hardening): Step 6 + documentation/examples

## Decisions already made

- Bytecode output format remains unchanged.
- Mapping/debug metadata is for integrated executors and debug tooling only.
- Source traceability must include file and line number; column is included where practical.
- Existing behavior remains available; richer diagnostics are additive.

## Open questions

- Should debug maps be generated by default in `ff-run` or only via a flag?
- For optimized IR, should diagnostics map to pre-optimization source, post-optimization IR, or both?
- What is the minimum source excerpt/caret behavior expected in web UI vs CLI?

## Out of scope

- Changing `.ffb` binary format or encoded payload.
- Full language-server features (hover/go-to-definition/etc.).
- Rewriting optimizer semantics.
- Non-TypeScript implementations (Go/Racket/Ruby/etc.).

## Dependencies

- Internal:
  - `typescript/core/src/compiler.ts` location metadata work
  - `typescript/core/src/preprocess.ts` provenance work
  - `typescript/core/src/source-maps.ts` schema evolution
  - `typescript/core/src/engine.ts` runtime error context
- External (optional):
  - JS source-map library (`@jridgewell/*` family or equivalent)

## References

- `typescript/core/src/compiler.ts`
- `typescript/core/src/preprocess.ts`
- `typescript/core/src/source-maps.ts`
- `typescript/core/src/engine.ts`
- `deno/bin/ff-run.ts`
- `node/bin/ff-run.ts`
- `bun/bin/ff-run.ts`
- `web/src/program-runner.ts`
- `web/src/repl-session.ts`
- `static-code-analysis.md`
