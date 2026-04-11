# Repo runtime and execution invariants

Apply this rule when choosing runtimes, running tests, or invoking repo-managed tools.

## Toolchain

- Prefer `mise exec -- ...` for commands that depend on repo-managed tools such as `chomp`, `go`, `deno`, `node`, `bun`, and `npm`.
- If a shell is already activated and the tool resolves correctly, bare commands may work, but `mise exec -- ...` is the stable default for agent-facing instructions.
- This is especially important for repo-level `chomp` tasks and Go commands, because running outside the pinned toolchain can miss `chomp` or pick an incompatible Go version for `go/go.mod`.

## File-type runtime constraints

- Use Python only for `.ff` source files.
- Do not use `python/execute.py` for `.ffp` files; `.ffp` requires a preprocessor-capable runtime.
- For `.ffp`, use Deno, Node, Bun, or Go according to the task and the relevant runtime README.

## Test runner defaults

- Treat `mise exec -- chomp test:deno` as the primary and most complete repo test suite.
- Treat `cd bun && mise exec -- chomp test:tap` as the default TAP runner for `ff/lib/**/__tests__/*.test.ffp`.
- Do not bounce between runtimes for TAP library tests unless the documented Bun TAP path is failing.
- For Go tests, run from `go/` or use `mise exec -- ...`; the repo root has no `go.mod`.

## Runtime and import invariants

- f-flat-minor uses source-file-relative imports for `./`, `../`, `/`, and legacy bare paths.
- Stdlib-relative imports use angle brackets such as `.import <prelude>`.
- TypeScript runtimes search stdlib roots in this order: built-in `ff/lib`, then `FBM_STDLIB_PATH`, then repeated `--stdlib-root` flags.

## Trace invariants for TypeScript runtimes

- Node, Bun, and Deno support `--trace` with structured output modes.
- `--trace --trace-format human` is the default human-readable trace mode.
- `--trace --trace-format jsonl` is the preferred machine-readable mode for agent or LLM inspection.
- `--trace-verbose` adds additional per-step detail.
- `--trace-queue-max` and `--trace-stack-max` bound trace output size.
- Trace output is written to `stderr`; normal program output remains on `stdout`.

## Environment notes

- The VM/bootstrap flow installs runtimes and tools with `mise install`, plus `npm install` for the web playground.
- `mise.toml` may specify some tools as `latest`; installed versions can differ slightly from `mise.lock` and this is expected.
- `nvm` may also be present, but repo guidance should continue to assume the `mise`-managed toolchain.
