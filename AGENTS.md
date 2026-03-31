# Agent Guide

## Project Overview

f-flat-minor (F♭m) is a minimal stack-oriented programming language. It features:
- Only one data type: big integers
- Stack-based execution model
- Compiles to "bytecode" (base64 VLQ encoded big integers)
- Multiple implementations in different languages (Deno/TypeScript, Go, Python, Ruby, etc.)

## Development Tools

This repo includes [`mise.toml`](mise.toml) and [`mise.lock`](mise.lock) for pinned development tools.

- Prefer activating the repo toolchain in your shell before running repo commands so tools like `chomp` and `go` resolve to the versions locked for this workspace.
- If your shell is not activated, use `mise exec -- ...` for commands that depend on the pinned toolchain.
- This is especially important for repo-level `chomp` tasks and for Go commands, because running outside the [`mise.toml`](mise.toml) environment can miss `chomp` entirely or pick an incompatible Go version for [`go/go.mod`](go/go.mod).

## Running Code

The simplest way to run f-flat-minor code is using the Python interpreter:

```bash
cat <file>.ff | python3 python/execute.py
```

For example, to run the factorial example:
```bash
cat ff/example_v0.ff | python3 python/execute.py
```

### Running .ffp Files (with preprocessor)

The Python interpreter doesn't support `.ffp` files (which require preprocessing).

Use an implementation with preprocessor support:
- `deno/README.md` for the Deno implementation
- `node/README.md` for the Node implementation
- `bun/README.md` for the Bun implementation
- `go/README.md` for the Go implementation

### Running Tests

The most complete test set is the deno tests. From the project root:

```bash
mise exec -- chomp test:deno
```

This runs all `.ff` and `.ffp` tests, comparing output to corresponding `.out` files.

**Note:** f-flat-minor uses relative `.import` directives that are resolved from the source file's directory, not the current working directory. For individual test files, run from the test directory:

```bash
cd ff/lib/math/__tests__ && cat sqrt.ffp | deno run - ../../../../deno/bin/ff-run.ts
```

Or use the chomp build system inside the activated [`mise.toml`](mise.toml) environment, which handles paths correctly.

### File Types
- `.ff` - Basic f-flat-minor source files (works with Python, Deno, Node, or Bun)
- `.ffp` - Source files requiring preprocessor (use Deno, Node, Bun, or Go)
- `.ffb` - Compiled bytecode files

### Other Implementations
- **Deno/TypeScript**: Most complete implementation with preprocessor support
- **Node/TypeScript**: Shared-core implementation with `ff-run`
- **Bun/TypeScript**: Shared-core implementation with `ff-run`
- **Go**: Full implementation with compiler and preprocessor
- **Ruby**: Basic interpreter
- **Racket**: Full implementation

To use other implementations, activate the repo [`mise.toml`](mise.toml) environment and use the `chomp` build tool:
```bash
chomp build   # Build all projects
chomp test    # Run tests
```

If your shell is not activated, run the same commands with `mise exec -- ...`.

## Testing

The most complete test set is the deno tests. To run the deno tests you can run:
```bash
mise exec -- chomp test:deno
```

TAP-style library tests now also exist under `ff/lib/**/__tests__/*.test.ffp`.
See `_docs/tap-testing.md` for the helper API and conventions, and run them with:
```bash
cd bun && mise exec -- chomp test:tap
```

Treat [`cd bun && mise exec -- chomp test:tap`](AGENTS.md) as the default TAP runner for `.test.ffp` library tests. Do not try multiple runtimes first unless this documented path is failing.

## Trace output modes (TypeScript runtimes)

Node, Bun, and Deno support structured tracing:
- `--trace --trace-format human` (default) for concise human-readable traces.
- `--trace --trace-format jsonl` for one JSON object per VM step (recommended for agents/LLM tooling).
- `--trace-verbose` to include additional per-step details.
- `--trace-queue-max` and `--trace-stack-max` to bound trace output size.
- Trace output is written to `stderr`, so normal program output remains on `stdout`.

## Documentation

- Language examples and tutorials: `_docs/fbm-by-example.md`
- Stack effect notation standard: `_docs/stack-notation.md`
- Core words and their stack effects: `_docs/core-vocabulary.md`
- TAP-style testing helper and `.test.ffp` conventions: `_docs/tap-testing.md`
- Math library naming conventions: `_docs/math-naming-convention.md`
- Math library internal naming: `_docs/math-naming-internal.md`

## Deno Implementation Notes

For Deno-specific usage, tasks, CLI entrypoints, and implementation notes, see `deno/README.md`.

## Node Implementation Notes

For Node-specific usage, entrypoints, and implementation notes, see `node/README.md`.

## Bun Implementation Notes

For Bun-specific usage, entrypoints, and implementation notes, see `bun/README.md`.

## Go Implementation Notes

For Go-specific usage, entrypoints, and testing notes, see [`go/README.md`](go/README.md).

## Project Skills

Reusable agent workflows have been extracted into local skills:

- `.agent/skills/ff-code-authoring/SKILL.md`
- `.agent/skills/ff-euler-ffp/SKILL.md`
- `.agent/skills/ff-library-web-refactor/SKILL.md`
- `.agent/skills/ff-math-internal-naming/SKILL.md` (see `_docs/math-naming-internal.md`)
- `.agent/skills/ff-lib-word-rankings/SKILL.md` (see `_docs/ff-lib-word-definition-rankings.md`)
- `.agent/skills/ff-expand-reduce/SKILL.md` (expand → reduce → resynthesize stack refactors; see `_docs/stack-rewrites-and-annotations.md`)

Use these when the task involves:

- Project Euler work in `ff/euler/*.ffp`
- General f-flat-minor coding in `.ff` and `.ffp` files
- Refactoring reusable words into `ff/lib/*.ffp`
- Wiring examples/libs into the web playground
- Defining internal math functions with proper naming conventions
- Regenerating the ff/lib word definition rankings table
- Simplifying or auditing stack-heavy words (expand–reduce–resynthesize)

## Plans

`_plans` contains deferred implementation plans — work that has been scoped and decided but not yet
implemented. Before starting any implementation task, check whether a relevant
plan exists here.

See `.agent/skills/plans/SKILL.md` for how to read, create, and update plan files.
