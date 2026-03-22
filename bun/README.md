# Bun Implementation

This directory contains the Bun/TypeScript implementation of f-flat-minor.

Current scope:
- Shared-core runtime/compiler/preprocessor wiring for Bun
- `ff-run` source runner in `bun/bin`
- Bun platform shims in `bun/src`

## Quick Start

From this directory:

```bash
npm run run -- ../ff/hello.ffp
bun run bin/ff-run.ts ../ff/hello.ffp
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

Common flags:
- `-f, --file`
- `-s, --stats`
- `-V, --validate` / `--no-validate`
- `-O, --opt`
- `-h, --hlir`
- `-l, --llir`
- `-i, --ir` (FF-compatible IR text)
- `-d, --disassemble`
- `-e, --enc`
- `-t, --trace`
- `-p, --profile`
- `--base`

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

- The Bun implementation currently focuses on `ff-run`.
- Shared language logic lives in `typescript/core/src`.
- Bun support is intentionally scoped like Node, not Deno: no Bun-specific compile, execute, preprocess, or REPL commands are included here.
