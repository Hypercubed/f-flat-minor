# Agent Guide

## Project Overview

f-flat-minor (F♭m) is a minimal stack-oriented programming language. It features:
- Only one data type: big integers
- Stack-based execution model
- Compiles to "bytecode" (base64 VLQ encoded big integers)
- Multiple implementations in different languages (Deno/TypeScript, Go, Python, Ruby, etc.)

## Development Tools

This repo includes a `mise.toml` for managing development tools. Using `mise` is optional, but it helps keep tool versions consistent across the different implementations.

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

Use one of the TypeScript implementations instead:
- `deno/README.md` for the Deno implementation
- `node/README.md` for the Node implementation
- `bun/README.md` for the Bun implementation

### Running Tests

The most complete test set is the deno tests. From the project root:

```bash
cd deno && chomp test:ff
```

This runs all `.ff` and `.ffp` tests, comparing output to corresponding `.out` files.

**Note:** f-flat-minor uses relative `.import` directives that are resolved from the source file's directory, not the current working directory. For individual test files, run from the test directory:

```bash
cd ff/lib/math/__tests__ && cat sqrt.ffp | deno run - ../../../../deno/bin/ff-run.ts
```

Or use the chomp build system which handles paths correctly.

### File Types
- `.ff` - Basic f-flat-minor source files (works with Python, Deno, Node, or Bun)
- `.ffp` - Source files requiring preprocessor (use Deno, Node, or Bun)
- `.ffb` - Compiled bytecode files

### Other Implementations
- **Deno/TypeScript**: Most complete implementation with preprocessor support
- **Node/TypeScript**: Shared-core implementation with `ff-run`
- **Bun/TypeScript**: Shared-core implementation with `ff-run`
- **Go**: Full implementation with compiler
- **Ruby**: Basic interpreter
- **Racket**: Full implementation

To use other implementations, install the respective runtime and use the `chomp` build tool:
```bash
chomp build   # Build all projects
chomp test    # Run tests
```

## Testing

The most complete test set is the deno tests. To run the deno tests you can run:
```bash
chomp test:deno
```

TAP-style library tests now also exist under `ff/lib/**/__tests__/*.test.ffp`.
See `_docs/tap-testing.md` for the helper API and conventions, and run them with:
```bash
cd bun && chomp test:tap
```

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
_
## Deno Implementation Notes

For Deno-specific usage, tasks, CLI entrypoints, and implementation notes, see `deno/README.md`.

## Node Implementation Notes

For Node-specific usage, entrypoints, and implementation notes, see `node/README.md`.

## Bun Implementation Notes

For Bun-specific usage, entrypoints, and implementation notes, see `bun/README.md`.

## Project Skills

Reusable agent workflows have been extracted into local skills:

- `.agent/skills/ff-code-authoring/SKILL.md`
- `.agent/skills/ff-euler-ffp/SKILL.md`
- `.agent/skills/ff-library-web-refactor/SKILL.md`
- `.agent/skills/ff-math-internal-naming/SKILL.md` (see `_docs/math-naming-internal.md`)

Use these when the task involves:

- Project Euler work in `ff/euler/*.ffp`
- General f-flat-minor coding in `.ff` and `.ffp` files
- Refactoring reusable words into `ff/lib/*.ffp`
- Wiring examples/libs into the web playground
- Defining internal math functions with proper naming conventions

## Plans

`_plans` contains deferred implementation plans — work that has been scoped and decided but not yet
implemented. Before starting any implementation task, check whether a relevant
plan exists here.

See `.agent/skills/plans/SKILL.md` for how to read, create, and update plan files.
