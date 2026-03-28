---
status: done
status_date: 2026-03-25
creator: codex
---

# Plan: Improve trace output for humans and LLM agents

## Summary
Redesign tracing output to provide a concise default human-readable format and an optional machine-readable JSONL mode for LLM/agent tooling. Keep backwards compatibility via opt-in flags and preserve existing tracing semantics.

## Context
Current tracing prints a single line containing stack, action token, and a character-sliced queue preview. This output is hard to scan for humans during large traces and hard to parse deterministically for LLM workflows. Recent discussion clarified preferred human ordering as `step | stack_before | action | queue_next`, with `stack_after` considered optional/redundant in default mode.

## Approach
1. **Define trace formats and flags**
   - Keep `--trace` as the main switch.
   - Add `--trace-format` with values:
     - `human` (default when `--trace` is on)
     - `jsonl` (machine-readable, one object per line)
   - Add `--trace-verbose` for additional human fields (`stack_after`, depth, flags).
   - Add `--trace-queue-max` and `--trace-stack-max` for bounded output.

2. **Introduce a trace event model in TypeScript core engine**
   - Build a structured event object per step before logging:
     - `step`
     - `immediate`
     - `tag`
     - `value`
     - `action` (resolved symbolic name when available)
     - `stack_before`
     - `stack_after` (computed only if verbose/jsonl)
     - `queue_preview` (token-aware preview, not string slice)
     - `queue_depth`
   - Ensure queue preview is derived from token pairs (`[tag,value]`) and rendered semantically.

3. **Human formatter implementation**
   - Default line format: `step | stack_before | action | queue_next`.
   - Verbose format appends selected internals: `| stack_after | flags | depths`.
   - Use stable delimiters and avoid decorative symbols that are hard to parse in long output.

4. **JSONL formatter implementation**
   - Emit one JSON object per step.
   - BigInt values serialized as decimal strings.
   - Keep key ordering stable for diffability and deterministic agent parsing.

5. **CLI plumbing across runtimes**
   - Wire new trace options in Node, Bun, and Deno CLIs that use the shared TypeScript core.
   - Ensure defaults are consistent across runtimes.

6. **Tests and fixtures**
   - Add/adjust unit tests for:
     - token-aware queue preview
     - human default format ordering
     - verbose human fields
     - JSONL schema and BigInt serialization
   - Add snapshot-style tests for representative traces.

7. **Documentation updates**
   - Update runtime README files with new trace flags and examples.
   - Document recommended usage:
     - humans: default `--trace`
     - agents/tooling: `--trace --trace-format jsonl`

## Decisions already made
- Human default ordering should be: `step | stack_before | action | queue_next`.
- `stack_after` should not be required in default human output.
- Action display belongs between stack state and queue preview.
- A dedicated machine-readable mode is desirable for agent workflows.

## Open questions
None — implemented with `--trace` as the primary switch, JSONL including symbolic/raw fields, and bounded defaults.

## Out of scope
- Changing VM execution semantics or performance optimizations unrelated to tracing.
- Adding source-level file/line mapping for trace events.
- Reworking non-TypeScript implementations (Go/Racket/Ruby) in this iteration.

## Dependencies
- None

## References
- typescript/core/src/engine.ts (current trace function and queue logging behavior)
- Discussion on preferred human trace ordering and verbosity

## Outcome
- Added structured trace events in the shared TypeScript engine and formatter support for human and JSONL outputs.
- Refined the human formatter to use terminal-width-aware layout with centered actions, aligned/truncated stack and queue previews, padded bracketed rendering, and clearer fixed-width action spacing.
- Routed trace output to `stderr` so traced runs keep program output on `stdout`, with terminal-width detection preferring `stderr` when available.
- Wired trace formatting options across Node, Bun, and Deno CLI entrypoints.
- Updated runtime READMEs plus agent guidance (`AGENTS.md` and `.agent/skills/ff-code-authoring/SKILL.md`) to document human vs JSONL trace usage.
