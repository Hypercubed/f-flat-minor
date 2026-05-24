---
id: repo-tool-resolution
title: "Repo tool resolution"
last_updated: 2026-05-23
description: >
  Wrong or missing repo-managed tools (chomp, deno, node, bun, npm, go);
  prefer mise exec and correct working directories.
tags: [tooling, mise, go, shell]
---

#### Symptom

A repo-managed tool such as `chomp`, `deno`, `node`, `bun`, `npm`, or `go` is
missing, resolves to the wrong version, or behaves differently than documented.
Or `mise exec` hangs indefinitely without executing the command.

#### Likely causes

- the shell was not initialized with repo-managed tool versions
- the command was run outside the runtime-specific directory expected by the repo
- Go commands were run at the repo root, which has no `go.mod`
- `mise exec` attempts network connection to fetch tool registry/metadata in a sandboxed, network-restricted, or offline environment, causing it to block indefinitely

#### Fix

Prefer `mise exec -- ...` for repo-managed tools. Run Go commands from `go/` or
through `mise exec -- ...`.

If `mise exec` hangs in an offline or sandboxed environment, run it with `MISE_OFFLINE=1` (e.g. `MISE_OFFLINE=1 mise exec -- ...`) to force offline mode and bypass tool registry queries.

#### Validation

Rerun the intended command through the documented playbook in
`.agents/playbooks/test-and-dev-workflows.md` or `.agents/playbooks/run-code.md`.
