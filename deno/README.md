# Deno Implementation

This directory contains the Deno/TypeScript implementation of f-flat-minor, including:
- CLI entrypoints in `deno/bin`
- runtime/compiler/preprocessor sources in `deno/src`
- Deno tasks in `deno/deno.json`

## Quick Start

From this directory:

```bash
deno task run ../ff/golf/hello.ffp
deno task compile ../ff/golf/hello.ffp > out.ffb
deno task execute out.ffb
deno task preprocess ../ff/golf/hello.ffp
deno task repl
```

## What Each `deno/bin` File Does

### `bin/ff`

Top-level command router (yargs-based CLI). It dispatches to subcommands:
- `ff preprocess [file]`
- `ff compile [file]`
- `ff execute [file]`
- `ff run [file]`
- `ff repl [--no-core]`

It dynamically imports and calls the corresponding `run(...)` function from the scripts below.

### `bin/ff-run.ts`

Full pipeline runner for source code:
1. Reads source from `file` or stdin (`-`)
2. Preprocesses macros/includes
3. Compiles to IR
4. Optionally validates/optimizes/disassembles/encodes
5. Executes with the VM

Primary use: run `.ff` and `.ffp` source directly.

> **Note:** The `ff-run` CLI interface is standardized across Deno, Node, and Bun. All three runtimes support the same flags, aliases, and behavior documented below.

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

### `bin/ff-compile.ts`

Compiler CLI for source code:
1. Reads source from `file` or stdin (`-`)
2. Optionally preprocesses
3. Compiles to IR
4. Optionally validates/optimizes/disassembles/prints debug formats
5. Writes compiled `.ffb` bytecode stream (header + base64 payload) to stdout

Primary use: produce bytecode artifacts.

Common flags:
- `-f, --file`
- `-E, --preprocess` / `--no-preprocess`
- `-s, --stats`
- `-V, --validate` / `--no-validate`
- `-O, --opt`
- `-h, --hlir`
- `-l, --llir`
- `-i, --ir` (FF-compatible IR text)
- `-l, --llir`
- `-d, --disassemble`
- `-c, --dc` (print decimal code)
- `-b, --bc` (print bytecode bytes as hex)
- `--dump`

### `bin/ff-execute.ts`

Bytecode executor for compiled `.ffb` files:
1. Reads binary input from `file` or stdin (`-`)
2. Verifies the f-flat-minor file header
3. Decodes base64 payload into VM code
4. Optionally dumps/disassembles/prints IR
5. Executes in the VM

Primary use: run precompiled bytecode.

Common flags:
- `-f, --file`
- `--dump`
- `-h, --hlir`
- `-i, --ir` (FF-compatible IR text)
- `-d, --disassemble`
- `-t, --trace`
- `--trace-format` (`human` or `jsonl`)
- `--trace-verbose`
- `--trace-queue-max`
- `--trace-stack-max`
- `-s, --stats`
- `-p, --profile`
- `-b, --base`

### `bin/ff-preprocess.ts`

Preprocessor-only CLI:
1. Reads source from `file` or stdin (`-`)
2. Expands preprocessor directives/macros/includes
3. Writes transformed source to stdout

Primary use: inspect/debug preprocessing without compiling/executing.

Common flags:
- `-f, --file`

### `bin/ff-repl.ts`

Interactive REPL:
- Initializes compiler + engine + preprocessor state
- Loads `ff/lib/core.ff` by default
- Reads and executes one line at a time
- Prints VM stack after each line

Supports REPL commands:
- `.reset` (recreate compiler/engine/preprocessor state)
- `.exit` or `.quit` (leave REPL)

Flags:
- `--no-core` / `-nc` (skip loading `core.ff`)

## Deno Tasks (`deno.json`)

- `deno task run <file.ffp>`: run source
- `deno task compile <file.ffp>`: compile source to bytecode (stdout)
- `deno task execute <file.ffb>`: execute compiled bytecode
- `deno task preprocess <file.ffp>`: preprocess only
- `deno task repl`: start REPL
- `deno task test`: run Deno tests
