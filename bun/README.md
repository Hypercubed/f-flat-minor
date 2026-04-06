# Bun Implementation

This directory contains the Bun/TypeScript implementation of f-flat-minor.

Current scope:
- Shared-core runtime/compiler/preprocessor wiring for Bun
- `ff-run` source runner in `bun/bin`
- Bun platform shims in `bun/src`

## Quick Start

From this directory:

```bash
npm run run -- ../ff/golf/hello.ffp
bun run bin/ff-run.ts ../ff/golf/hello.ffp
```

Both commands:
1. Read source from a file or stdin
2. Preprocess `.ffp` directives
3. Compile to IR
4. Optionally validate/optimize/disassemble
5. Execute in the VM

## What Each `bun/bin` File Does

### `bin/ff-run.ts`

Full pipeline runner for source code:
1. Reads source from `file` or stdin (`-`)
2. Preprocesses macros/includes
3. Compiles to IR
4. Optionally validates/optimizes/disassembles/encodes
5. Executes with the VM

Primary use: run `.ff` and `.ffp` source directly under Bun.

> **Note:** The `ff-run` CLI interface is standardized across Deno, Node, and Bun. All three runtimes support the same flags, aliases, and behavior. See `deno/README.md` for the full flag reference.

Common flags:
- `-f, --file` — Source file to run (or `-` for stdin)
- `-s, --stats` — Print compilation and execution statistics
- `-V, --validate` / `--no-validate` — Enable/disable IR validation (default: enabled)
- `-O, --opt` — Run the optimizer before execution
- `-h, --hlir` — Print high-level IR and exit
- `-l, --llir` — Print low-level IR and exit
- `-i, --ir` — Print FF-compatible IR text and exit
- `-d, --disassemble` — Disassemble to bytecode and exit
- `-e, --enc` — Emit encoded bytecode with header instead of executing
- `-t, --trace` — Enable VM execution tracing
- `-T, --trace-format` — Trace format: `human` or `jsonl` (default: `human`)
- `--trace-verbose` — Include additional details in trace output
- `--trace-queue-max` — Limit trace output for the queue
- `--trace-stack-max` — Limit trace output for the stack
- `-p, --profile` — Enable profiling output
- `-E, --preprocess` / `--no-preprocess` — Enable/disable preprocessing (default: enabled)
- `-P, --preprocessor-prelude, --prelude` — Load the preprocessor prelude macros
- `--base` — Numeric base for output (default: 10)

## What Each `bun/src` File Does

### `src/runtime.ts`

Defines the Bun host/platform shims used by the shared TypeScript core:
- stdout/stderr writing
- stdin byte reads
- raw-mode toggling for terminal input
- file/path helpers for preprocessing
- host logging and process exit hooks

### `src/engine.ts`

Bun wrapper around the shared core VM engine. It injects the Bun platform implementation from `src/runtime.ts`.

### `src/compiler.ts`

Bun wrapper around the shared core compiler. It injects Bun-specific host hooks.

### `src/preprocess.ts`

Bun wrapper around the shared core preprocessor. It wires together the Bun host, compiler, and engine.

### `src/read.ts`

Small stdin helper for reading raw bytes from standard input.

### `src/ir.ts`

Re-exports shared IR utilities and configures IR output to write through Bun stdout.

### `src/constants.ts`

Re-exports shared constants from the TypeScript core.

### `src/optimizer.ts`

Re-exports the shared optimizer from the TypeScript core.

## Notes

- The Bun implementation focuses on `ff-run`, sharing the same CLI contract as Deno and Node.
- Shared language logic lives in `typescript/core/src`.
- Bun support is intentionally scoped like Node: no Bun-specific compile, execute, preprocess, or REPL commands are included here.
