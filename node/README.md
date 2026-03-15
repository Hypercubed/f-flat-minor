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

## What Each `node/bin` File Does

### `bin/ff-run.ts`

Full pipeline runner for source code:
1. Reads source from `file` or stdin (`-`)
2. Preprocesses macros/includes
3. Compiles to IR
4. Optionally validates/optimizes/disassembles/encodes
5. Executes with the VM

Primary use: run `.ff` and `.ffp` source directly under Node.

Common flags:
- `-f, --file`
- `-s, --stats`
- `-V, --validate` / `--no-validate`
- `-O, --opt`
- `-h, --hlir`
- `-i, --ir`
- `-d, --disassemble`
- `-e, --enc`
- `-t, --trace`
- `-p, --profile`
- `--base`

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

- The Node implementation currently focuses on `ff-run`.
- Shared language logic lives in `typescript/core/src`.
- This implementation uses only erasable TypeScript syntax, so it can run directly on modern Node without `--experimental-transform-types`.
