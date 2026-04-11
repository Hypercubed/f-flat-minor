# Troubleshooting

Use this file for recurring issue patterns and validated recoveries that are too
detailed for high-level agent guidance.

## Compiled Bun Stdlib Imports

### Symptom

A compiled Bun executable fails on `.import <prelude>` with an error such as
`Stdlib import not found: <prelude>`, and the searched roots include `/ff/lib`.

### Likely Causes

- the executable is using a stale stdlib-root resolver based on Bun's virtual
  compiled executable module URL
- the command is running from a directory that does not expose a discoverable
  repo-relative `ff/lib`

### Fix

Rebuild after the TypeScript stdlib-root resolver fix. As a temporary
workaround, pass `--stdlib-root ../ff/lib` from the runtime directory or set
`FBM_STDLIB_PATH` to the repo's `ff/lib` path.

### Validation

Run the exact compiled executable from the user's working directory and confirm
that `.import <prelude>` succeeds. If it still fails, inspect the searched roots
printed in the thrown error.

## Repo Tool Resolution

### Symptom

A repo-managed tool such as `chomp`, `deno`, `node`, `bun`, `npm`, or `go` is
missing, resolves to the wrong version, or behaves differently than documented.

### Likely Causes

- the shell was not initialized with repo-managed tool versions
- the command was run outside the runtime-specific directory expected by the repo
- Go commands were run at the repo root, which has no `go.mod`

### Fix

Prefer `mise exec -- ...` for repo-managed tools. Run Go commands from `go/` or
through `mise exec -- ...`.

### Validation

Rerun the intended command through the documented playbook in
`.agents/playbooks/test-and-dev-workflows.md` or `.agents/playbooks/run-code.md`.

## Entry Template

### Symptom

Describe the visible failure.

### Likely Causes

- Cause 1
- Cause 2

### Fix

Describe the known recovery steps.

### Validation

How to confirm the problem is resolved.
