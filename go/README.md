# Go Implementation

This directory contains the Go implementation of f-flat-minor.

Current scope:
- Compiler CLI in [`go/cmd/compile`](go/cmd/compile)
- Bytecode executor in [`go/cmd/execute`](go/cmd/execute)
- Source preprocessor in [`go/cmd/preprocess`](go/cmd/preprocess)
- Source runner in [`go/cmd/run`](go/cmd/run)
- REPL in [`go/cmd/repl`](go/cmd/repl)

## Tooling

Use the repo-level [`mise.toml`](../mise.toml) and [`mise.lock`](../mise.lock) when running Go or `chomp` commands for this project.

- Prefer activating the repo toolchain in your shell before running commands in [`go/`](.)
- If your shell is not activated, use `mise exec -- ...`

This ensures `chomp` is available and `go` matches the version required by [`go/go.mod`](go.mod).

## Quick Start

From the repo root:

```bash
mise exec -- go run ./go/cmd/run --in ./ff/golf/hello_world.ff
```

Preprocess an `.ffp` source file without running it:

```bash
mise exec -- go run ./go/cmd/preprocess --in ./ff/lib/math/atan.ffp
```

Build the Go binaries:

```bash
cd go && mise exec -- chomp build
```

Run the example pipeline checks for the Go project:

```bash
cd go && mise exec -- chomp test
```

Run the Go unit tests directly:

```bash
cd go && mise exec -- go test ./...
```

## Commands

- [`go/cmd/run`](go/cmd/run) runs source files such as `.ff` and `.ffp`
- [`go/cmd/preprocess`](go/cmd/preprocess) expands `.load` and `.import` into flat source
- [`go/cmd/compile`](go/cmd/compile) compiles source to bytecode
- [`go/cmd/execute`](go/cmd/execute) executes compiled bytecode
- [`go/cmd/repl`](go/cmd/repl) starts the interactive REPL
