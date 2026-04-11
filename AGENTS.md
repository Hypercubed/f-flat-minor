# Agent Guide

## Project Overview

f-flat-minor (F♭m) is a minimal stack-oriented programming language. It features:
- Only one data type: big integers
- Stack-based execution model
- Compiles to "bytecode" (base64 VLQ encoded big integers)
- Multiple implementations in different languages (Deno/TypeScript, Go, Python, Ruby, etc.)

## Agent docs layout

- `AGENTS.md` — repo entry point and navigation
- `.agent/rules/` — normative repo and authoring constraints
- `.agent/playbooks/` — concise step-by-step operational workflows
- `.agent/skills/` — reusable task-specific agent workflows

Key rule and playbook entry points:

- `.agent/rules/repo-runtime-invariants.md`
- `.agent/rules/ff-lib-source-docs.md`
- `.agent/playbooks/run-code.md`
- `.agent/playbooks/test-and-dev-workflows.md`

## Critical repo guidance

- Prefer `mise exec -- ...` for repo-managed tools such as `chomp`, `go`, `deno`, `node`, `bun`, and `npm`.
- Use Python only for `.ff`; do not use `python/execute.py` for `.ffp`.
- Treat `mise exec -- chomp test:deno` as the primary/fullest repo test suite.
- Treat `cd bun && mise exec -- chomp test:tap` as the default TAP runner for `ff/lib/**/__tests__/*.test.ffp`.
- Run Go commands from `go/` or through `mise exec -- ...`; the repo root has no `go.mod`.
- TypeScript runtimes write trace output to `stderr`; use `--trace --trace-format jsonl` when machine-readable traces are useful.

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

## Rules

- `.agent/rules/repo-runtime-invariants.md` — stable execution, runtime, test, import, and trace constraints
- `.agent/rules/ff-lib-source-docs.md` — normative source-doc rule for `ff/lib/**/*.ff` and `ff/lib/**/*.ffp`

## Playbooks

- `.agent/playbooks/run-code.md` — choose a runtime and run `.ff` / `.ffp` code
- `.agent/playbooks/test-and-dev-workflows.md` — common test, lint, and service commands

## Documentation

- Language examples and tutorials: `_docs/supplemental/fbm-by-example.md`
- Stack effect notation standard: `_docs/supplemental/stack-notation.md`
- Core words and their stack effects: `_docs/core-vocabulary.md`
- TAP-style testing helper and `.test.ffp` conventions: `_docs/supplemental/tap-testing.md`
- Math library naming conventions: `_docs/supplemental/math-naming-convention.md`
- Math library internal naming: `_docs/supplemental/math-naming-internal.md`

## Runtime docs

- Deno: `deno/README.md`
- Node: `node/README.md`
- Bun: `bun/README.md`
- Go: `go/README.md`

## Project Skills

Reusable agent workflows live under `.agent/skills/`:

- `.agent/skills/ff-code-authoring/SKILL.md`
- `.agent/skills/ff-euler-ffp/SKILL.md`
- `.agent/skills/ff-library-web-refactor/SKILL.md`
- `.agent/skills/ff-math-internal-naming/SKILL.md` (see `_docs/supplemental/math-naming-internal.md`)
- `.agent/skills/ff-lib-word-rankings/SKILL.md` (see `_docs/supplemental/ff-lib-word-definition-rankings.md`)
- `.agent/skills/ff-expand-reduce/SKILL.md` (expand → reduce → resynthesize stack refactors; see `_docs/supplemental/stack-rewrites-and-annotations.md`)

Use these when the task involves:

- Project Euler work in `ff/euler/*.ffp`
- General f-flat-minor coding in `.ff` and `.ffp` files
- Refactoring reusable words into `ff/lib/*.ffp`
- Wiring examples/libs into the web playground
- Defining internal math functions with proper naming conventions
- Regenerating the ff/lib word definition rankings table
- Simplifying or auditing stack-heavy words (expand–reduce–resynthesize)

## Plans

- `_plans/` contains deferred implementation plans that should be checked before implementation work.
- Use `.agent/skills/plans/SKILL.md` for the plan workflow.

## Environment notes

- The environment bootstrap installs runtimes with `mise install` and runs `npm install` for the web playground.
- Some `vitest` web tests fail due to a pre-existing missing `path.relative` in the browser preprocessor host.
- Deno lint may report expected `no-import-prefix` warnings on inline URL imports.
- `mise.toml` may resolve some tools to versions newer than `mise.lock`; this is expected.
