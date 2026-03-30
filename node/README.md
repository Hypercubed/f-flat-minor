# Node Implementation

This directory contains the Node.js/TypeScript implementation of f-flat-minor.

Current scope:
- Shared-core runtime/compiler/preprocessor wiring for Node
- `ff-run` source runner in `node/bin`
- Node platform shims in `node/src`

## Quick Start

From this directory:

```bash
npm run run -- ../ff/hello.ffp
node bin/ff-run.ts ../ff/hello.ffp
```

Both commands:
1. Read source from a file or stdin
2. Preprocess `.ffp` directives
3. Compile to IR
4. Optionally validate/optimize/disassemble
5. Execute in the VM

## Build, Test, and Benchmark

These tasks cover the `ff-run` source runner. The Node implementation focuses on `ff-run`, which shares the same CLI contract as Deno and Bun.

### Build

```bash
chomp build:node
```

Produces the `node/build/ff-run` wrapper artifact. The wrapper invokes `node --experimental-transform-types` on `bin/ff-run.ts` so downstream tasks have a stable built path. The build is invalidated when `bin/ff-run.ts`, `src/**/*.ts`, or the shared TypeScript core changes.

### Test

```bash
chomp test:node
```

Runs the full test suite in this order:
1. Builds `node/build/ff-run`
2. Smoke-tests `ff-run` against `../ff/example.ff` and `../ff/hello.ffp`
3. Runs the full corpus of `../ff/*.ff` and `../ff/*.ffp` files, including the `--opt` path for each

### Benchmark

```bash
chomp -c node/ bench
```

Runs a local [hyperfine](https://github.com/sharkdp/hyperfine) benchmark against `./build/ff-run` (both with and without `--opt`). Depends on `build`.

### Clean

```bash
chomp -c node/ clean
```

Removes `./build`.

## What Each `node/bin` File Does

### `bin/ff-run.ts`

Full pipeline runner for source code:
1. Reads source from `file` or stdin (`-`)
2. Preprocesses macros/includes
3. Compiles to IR
4. Optionally validates/optimizes/disassembles/encodes
5. Executes with the VM

Primary use: run `.ff` and `.ffp` source directly under Node.

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

## What Each `node/src` File Does

### `src/runtime.ts`

Defines the Node host/platform shims used by the shared TypeScript core:
- stdout/stderr writing
- stdin byte reads
- raw-mode toggling for terminal input
- file/path helpers for preprocessing
- host logging and process exit hooks

### `src/engine.ts`

Node wrapper around the shared core VM engine. It injects the Node platform implementation from `src/runtime.ts`.

### `src/compiler.ts`

Node wrapper around the shared core compiler. It injects Node-specific host hooks.

### `src/preprocess.ts`

Node wrapper around the shared core preprocessor. It wires together the Node host, compiler, and engine.

### `src/read.ts`

Small stdin helper for reading raw bytes from standard input.

### `src/ir.ts`

Re-exports shared IR utilities and configures IR output to write through Node stdout.

### `src/constants.ts`

Re-exports shared constants from the TypeScript core.

### `src/optimizer.ts`

Re-exports the shared optimizer from the TypeScript core.

## Notes

- The Node implementation focuses on `ff-run`, sharing the same CLI contract as Deno and Bun.
- Shared language logic lives in `typescript/core/src`.
- This implementation uses only erasable TypeScript syntax, so it can run directly on modern Node without `--experimental-transform-types`.
