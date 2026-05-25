---
id: structure
title: "Project Structure"
last_updated: 2026-05-25
description: "A comprehensive guide to the root directory layout, compiler, standard library, and per-runtime workspace layout."
tags: [structure, workspace, layout]
---

# Project Structure

## Root Layout

```
f-flat-minor/
├── ff/                     # Language source files (shared across all implementations)
├── typescript/core/        # Shared TypeScript compiler/VM/optimizer/preprocessor
├── deno/                   # Deno implementation (most complete, F♭m⁺ reference)
├── node/                   # Node.js implementation (shares typescript/core)
├── bun/                    # Bun implementation (shares typescript/core)
├── go/                     # Go implementation (full F♭m⁺)
├── python/                 # Python implementation (F♭m only)
├── ruby/                   # Ruby implementation (F♭m only)
├── dart/                   # Dart implementation (F♭m only)
├── racket/                 # Racket implementation (full F♭m⁺)
├── cpp/                    # C++ implementation (F♭m⁰)
├── rust/                   # Rust implementation (F♭m⁰)
├── ghc/                    # Haskell implementation (F♭m⁰)
├── assemblyscript/         # AssemblyScript implementation
├── wasm/                   # WASM/WAT implementation
├── wolfram/                # Wolfram Language implementation
├── web/                    # Web playground (Vite + TypeScript)
├── shell/                  # Shell helper scripts (e.g. ff-run.sh)
├── tools/                  # Repo tooling utilities
├── _docs/                  # Documentation (manual, reference, supplemental)
├── _benchmarks/            # Benchmark results (markdown)
├── _shared/                # Shared assets across implementations
├── _openspec/              # OpenSpec change tracking
├── .agents/                # Agent knowledge layer (rules, playbooks, skills, sessions)
├── .kiro/steering/         # Kiro steering files (this directory)
├── chompfile.toml          # Root Chomp build/test task definitions
├── mise.toml               # Pinned toolchain (deno, node, bun, go, etc.)
└── README.md               # Project overview and vocabulary reference
```

## F♭m Source Files (`ff/`)

```
ff/
├── lib/                    # Standard library
│   ├── core/core.ff        # Core derived words (foundational layer)
│   ├── math/               # Math library (sqrt, gcd, primes, atan, etc.)
│   ├── seq/seq.ffp         # Sequence and quotation helpers
│   ├── string/string.ffp   # Character and string helpers
│   ├── time/               # Time helpers
│   ├── prelude.ffp         # Loads core + math + string + seq
│   ├── testing.ffp         # Test assertion helpers
│   ├── tap.ffp             # TAP test runner helpers
│   └── __tests__/          # TAP-style library tests (*.test.ffp)
├── euler/                  # Project Euler solutions (*.ffp)
├── examples/               # Standalone examples (sqrt, gcd, pi, etc.)
├── codetta/                # Codetta challenge solutions + scoring
├── tutorial/               # Tutorial exercises by topic
├── tests/                  # Core language test suite
├── experimental/           # Experimental/WIP code
├── turing/                 # Turing machine examples
├── example.ff              # Canonical example (used in benchmarks)
└── example.ffb             # Compiled bytecode of example.ff
```

## TypeScript Shared Core (`typescript/core/src/`)

All three TypeScript runtimes (Deno, Node, Bun) share this core:

- `compiler.ts` — tokenizer + compiler (source → IR)
- `engine.ts` — VM (executes IR)
- `optimizer.ts` — peephole optimizer
- `preprocess.ts` — macro/import preprocessor
- `ir.ts` — IR type definitions
- `opcodes.ts` — opcode numeric constants
- `vlq.ts` — base64 VLQ encode/decode
- `ff-run-args.ts` — shared CLI flag definitions

## Per-Runtime Layout (Deno/Node/Bun pattern)

```
{runtime}/
├── bin/                    # CLI entrypoints
│   ├── ff-run.ts           # Full pipeline: preprocess → compile → execute
│   ├── ff-compile.ts       # Compile to .ffb bytecode
│   ├── ff-execute.ts       # Execute .ffb bytecode
│   ├── ff-preprocess.ts    # Preprocess only
│   └── ff-repl.ts          # Interactive REPL
├── src/                    # Runtime-specific source (if any)
├── chompfile.toml          # Runtime-specific build/test tasks
└── README.md               # Runtime-specific docs
```

## Documentation (`_docs/`)

```
_docs/
├── manual/introduction.md          # Language introduction
├── reference/
│   ├── core-primitives.md          # Built-in opcode reference
│   ├── optimized-compiler.md       # Optimizer pipeline docs (keep in sync with optimizer.ts)
│   ├── quickhelp.md                # Quick reference
│   └── generated/                  # Auto-generated reference output
└── supplemental/
    ├── fbm-by-example.md           # Language tutorial by example
    ├── stack-notation.md           # Stack effect notation standard
    ├── tap-testing.md              # TAP test conventions
    ├── math-naming-convention.md   # Public math word naming rules
    └── math-naming-internal.md     # Internal math helper naming rules
```

## Agent Knowledge Layer (`.agents/`)

```
.agents/
├── rules/          # Normative constraints (runtime invariants, lib source docs)
├── playbooks/      # Step-by-step operational workflows
├── skills/         # Reusable task-specific agent workflows
├── docs/           # Durable decisions, troubleshooting, plans, maintenance log
└── sessions/       # Local task-closeout bundles (gitignored)
```

## File Type Conventions

| Extension | Description | Runtimes |
|-----------|-------------|----------|
| `.ff` | Plain F♭m source | All runtimes |
| `.ffp` | F♭m source requiring preprocessor | Deno, Node, Bun, Go, Racket |
| `.ffb` | Compiled bytecode (base64 VLQ) | All runtimes |
| `.test.ffp` | TAP-style test file | Bun TAP runner |

## Key Conventions

- **Standard library imports** use angle brackets: `.import <prelude>`, `.import <math/sqrt>`
- **Relative imports** use `./` or `../` paths; legacy bare paths are also supported
- **Public library words** use `/** ... */` doc blocks; internal helpers use `/* ... */`
- **Boolean-returning words** end in `?` (e.g. `prime?`, `even?`)
- **Definitions are immutable** — no word can be redefined after definition
- **Go commands** must be run from `go/` (no `go.mod` at repo root)
- **Optimizer changes** require updating `_docs/reference/optimized-compiler.md` to stay in sync
