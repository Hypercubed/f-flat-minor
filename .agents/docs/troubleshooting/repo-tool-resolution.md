---
id: repo-tool-resolution
title: "Repo tool resolution"
last_updated: 2026-04-22
description: >
  Wrong or missing repo-managed tools (chomp, deno, node, bun, npm, go);
  prefer mise exec and correct working directories.
tags: [tooling, mise, go, shell]
---

#### Symptom

A repo-managed tool such as `chomp`, `deno`, `node`, `bun`, `npm`, or `go` is
missing, resolves to the wrong version, or behaves differently than documented.

#### Likely causes

- the shell was not initialized with repo-managed tool versions
- the command was run outside the runtime-specific directory expected by the repo
- Go commands were run at the repo root, which has no `go.mod`

#### Fix

Prefer `mise exec -- ...` for repo-managed tools. Run Go commands from `go/` or
through `mise exec -- ...`.

#### Validation

Rerun the intended command through the documented playbook in
`.agents/playbooks/test-and-dev-workflows.md` or `.agents/playbooks/run-code.md`.
