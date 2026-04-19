---
status: ready
status_date: 2026-04-17
creator: composer
---

# Plan: More efficient F-flat-minor trace output

## Summary

Reduce the size, parse cost, and memory pressure of recorded VM traces (today: verbose JSONL on stderr) while keeping a clear path for tools, the VS Code trace viewer, and optional human/LLM-friendly output.

## Context

- The TypeScript engine emits one trace record per VM step when `--trace --trace-format jsonl` is used (`typescript/core/src/engine.ts`). Records repeat long field names and embed `stack_before`, optional `stack_after`, `queue_preview`, and stringified numeric tokens.
- Long runs produce **very large stderr**: Node `execFile` buffers per stream; the VS Code extension mitigates this with a configurable `maxBuffer`, but the underlying issue is **volume**, not only the buffer cap.
- `_plans/done/trace-output-human-llm-format.md` established JSONL for agents; this plan **does not** remove that option—it adds **tighter** paths for integrated tools and large traces.

## Goals (measurable)

1. **Bytes per step:** target order-of-magnitude reduction for typical traces (e.g. 3–10×) before binary formats;10×+ with binary or delta encoding where acceptable.
2. **Parse cost:** avoid full-string `JSON.parse` per multi-megabyte line where possible for the primary tool path (or stream-parse).
3. **Memory:** support **streaming** consumption (line-by-line or framed records) and optionally **trace-to-file** so parent processes never need a single huge stderr string.
4. **Compatibility:** existing JSONL remains available; new modes are additive behind flags.

## Approach

### Phase 0 — Instrument and baseline

- Add a small **diagnostic mode** or one-off script: given a representative trace, report **bytes/step**, field contribution (e.g. stack vs queue vs keys), and line length distribution.
- Document2–3 **fixture programs** (short, medium, huge step count) for regression.

### Phase 1 — Compact JSONL (low risk, quick win)

Implement `--trace-format jsonl-compact` (name TBD) or a flag `--trace-jsonl-minify` that emits the **same logical schema** with:

- **Short, stable keys** (e.g. `sb` / `sa` / `qp` / `qd`) and a **version field** (`v: 1`) on each line or once in a header line (if header is allowed—prefer per-line self-description for streamability).
- **Omit empty/default fields** (e.g. skip `stack_after` unless verbose; skip `stdout_since_last` when absent).
- **Numeric tokens as JSON numbers** where safe (today many values are strings for BigInt—evaluate bigint-safe compact encoding: decimal string only when needed).
- Optional **shorter queue preview** cap already exists (`--trace-queue-max`); document interaction.

Deliverables: engine write path, `ff-run` flag wiring (Node/Bun/Deno as applicable), parser in VS Code extension accepting both canonical and compact JSONL, tests with golden output size comparison.

### Phase 2 — Streaming trace file (decouples size from stderr)

- Add `--trace-out <path>` (or write to temp when flag set): engine writes trace records to a **file** as they are emitted; stderr stays small (errors + human messages only) or receives a **single** “trace written to …” line.
- VS Code extension: when capturing trace, prefer **file** + read stream or mmap-friendly chunked read for the viewer model build.
- Keeps JSONL or compact JSONL **inside the file** first; binary can reuse the same path in Phase 3.

Deliverables: cross-platform path handling, cleanup on failure, extension capture path updated, docs.

### Phase 3 — Binary framed trace (optional, larger win)

Choose **one** binary encoding for the “efficient default” tool path:

- **CBOR** (RFC 8949) or **MessagePack**: one **length-prefixed** record per step (or newline-framed CBOR for simplicity). Good balance of standards, library support, and size.
- **Protocol Buffers**: if the repo is willing to maintain a `.proto` and codegen for TS + other runtimes.

Schema should mirror the logical trace event (step, immediate, tag/value, bounded stack/queue, optional stdout chunk). Version the schema (`trace_v1`).

Deliverables: `--trace-format cbor` (example), decode in extension, CLI tests, size/speed benchmarks vs JSONL.

### Phase 4 — Semantic compression (optional, advanced)

Only if traces remain too large after Phases 1–3:

- **Delta stacks:** emit full `stack_before` every *N* steps or on change magnitude; intermediate steps carry **run-length** or **diff** ops (define a small opcode sub-language).
- **Intern strings:** dictionary table for repeated `action` / literal values (first occurrence full, later **id**).
- **Columnar batching:** batch *K* steps into one Arrow/Parquet-style block—better for offline analysis than live stepping unless the viewer reads batch index.

Treat as **separate** format version so parsers stay explicit.

## Decisions already made

- **JSONL stays** as a supported, human/LLM-oriented format; efficiency work is **additive**.
- **Primary pain** is volume on stderr and in-memory buffering, not JSON syntax alone.
- **Streaming and/or trace file** are in scope; they are the most reliable fix for `maxBuffer`-class failures.

## Open questions

- **Compact JSON vs binary first:** Phase 1 is cheaper; skip to Phase 3 if maintainers prefer fewer text formats.
- **BigInt in JSON:** remain decimal strings everywhere for safety, or allow JSON numbers when `|n| < 2^53`?
- **Single runtime package:** confirm whether Node-only efficiency is enough for v1 or Bun/Deno must ship the same flags day one.
- **Viewer strategy:** full trace in memory vs lazy index (byte offsets per step) for huge files.

## Out of scope

- Changing VM execution semantics solely to shrink traces.
- Replacing trace with full DAP / Chrome trace format as the **only** output.
- Cross-language parity (Go/Racket/Ruby) unless explicitly requested later.

## Dependencies

- `_plans/done/trace-output-human-llm-format.md` — current JSONL shape and CLI flags.
- `typescript/core/src/engine.ts` — trace emission.
- `node/bin/ff-run.ts` (and siblings) — flag plumbing.
- `vscode-f-flat-minor/src/extension.ts` — capture and parse.

## References

- `typescript/core/src/engine.ts` — `TraceEvent`, `createTraceEvent`, JSONL write path.
- `vscode-f-flat-minor/src/extension.ts` — `parseTrace`, `execFileMaxBufferBytes`.
- CBOR: RFC 8949; MessagePack: <https://msgpack.org/>
