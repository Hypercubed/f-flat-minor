---
id: tech
title: "Tech Stack & Build System"
last_updated: 2026-05-25
description: "Details on toolchain management with mise, the Chomp build system, language execution runtimes, testing, and formatting."
tags: [build, toolchain, testing, runtime]
---

# Tech Stack & Build System

## Toolchain Management

All repo-managed tools are pinned via **mise** (`mise.toml` / `mise.lock`).

- Always prefix commands with `mise exec -- ...` unless your shell is already activated with the repo toolchain.
- Key managed tools: `chomp`, `deno` (2.7.5), `node` (24.x), `bun`, `go`, `dart`, `ghc`, `rust`, `hyperfine`, `mdsh`.

## Build System

**[Chomp](https://chompbuild.com/)** (`chompfile.toml`) is the primary task runner.

```bash
mise exec -- chomp build:          # build all projects
mise exec -- chomp build:{name}    # build one project (deno, go, bun, cpp, etc.)
mise exec -- chomp test:           # test all projects
mise exec -- chomp test:{name}     # test one project
mise exec -- chomp bench           # run benchmarks (requires hyperfine)
```

Sub-projects each have their own `chompfile.toml`; the root delegates to them.

## Implementations & Languages

| Directory | Language | Notes |
|-----------|----------|-------|
| `typescript/core/` | TypeScript | Shared core (compiler, VM, optimizer, preprocessor) |
| `deno/` | TypeScript/Deno | Most complete; reference for F♭m<sup>+</sup> |
| `node/` | TypeScript/Node | Shares `typescript/core` |
| `bun/` | TypeScript/Bun | Shares `typescript/core` |
| `go/` | Go | Full F♭m<sup>+</sup> implementation |
| `python/` | Python | F♭m only (no preprocessor) |
| `ruby/` | Ruby | F♭m only |
| `dart/` | Dart | F♭m only |
| `racket/` | Racket | Full F♭m<sup>+</sup> |
| `cpp/` | C++ | F♭m only |
| `rust/` | Rust | F♭m<sup>o</sup> |
| `ghc/` | Haskell | F♭m<sup>o</sup> |
| `assemblyscript/` | AssemblyScript | F♭m |
| `web/` | TypeScript/Vite | Web playground |

## TypeScript Shared Core (`typescript/core/src/`)

Key modules:
- `compiler.ts` — source → IR
- `engine.ts` — VM execution
- `optimizer.ts` — peephole optimizer
- `preprocess.ts` — `.load` / `.import` / `.m` macro expansion
- `ir.ts` — IR types
- `vlq.ts` — base64 VLQ bytecode encoding/decoding
- `opcodes.ts` — opcode constants

## Running Code

```bash
# .ff files — Python is fine
cat ff/example.ff | python3 python/execute.py

# .ffp files — need a preprocessor-capable runtime
mise exec -- node node/bin/ff-run.ts <file>.ffp
mise exec -- deno run -A deno/bin/ff-run.ts <file>.ffp

# With tracing (TypeScript runtimes; trace goes to stderr)
mise exec -- node node/bin/ff-run.ts --trace --trace-format jsonl <file>.ffp
```

**Do not use Python for `.ffp` files** — it has no preprocessor.

## Testing

```bash
# Primary / fullest suite
mise exec -- chomp test:deno

# TAP tests for ff/lib/**/__tests__/*.test.ffp
cd bun && mise exec -- chomp test:tap

# Go tests
cd go && mise exec -- go test ./...

# Individual runtime suites
mise exec -- chomp test:{deno,node,bun,python,ruby}
```

## Web Playground

```bash
cd web && mise exec -- npm run dev    # dev server
cd web && mise exec -- npm run build  # production build
```

## Linting

```bash
cd deno && mise exec -- deno lint
```

Note: Deno lint may report expected `no-import-prefix` warnings on inline URL imports. Some `vitest` web tests fail due to a pre-existing `path.relative` issue in the browser preprocessor host — both are known and non-blocking.

## Benchmarking

Requires `hyperfine` (installed via mise):

```bash
mise exec -- chomp bench
```

## README Generation

`mdsh` expands `<!-- BEGIN mdsh --> ... <!-- END mdsh -->` blocks in `README.md`:

```bash
mise exec -- mdsh   # or: mise run readme
```
