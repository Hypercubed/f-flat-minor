---
id: compiled-bun-stdlib-imports
title: "Compiled Bun stdlib imports"
last_updated: 2026-04-22
description: >
  Prelude import failures from Bun-built binaries when stdlib roots include
  /ff/lib; points to resolver and workaround steps.
tags: [bun, stdlib, typescript, build]
---

#### Symptom

A compiled Bun executable fails on `.import <prelude>` with an error such as
`Stdlib import not found: <prelude>`, and the searched roots include `/ff/lib`.

#### Likely causes

- the executable is using a stale stdlib-root resolver based on Bun's virtual
  compiled executable module URL
- the command is running from a directory that does not expose a discoverable
  repo-relative `ff/lib`

#### Fix

Rebuild after the TypeScript stdlib-root resolver fix. As a temporary
workaround, pass `--stdlib-root ../ff/lib` from the runtime directory or set
`FBM_STDLIB_PATH` to the repo's `ff/lib` path.

#### Validation

Run the exact compiled executable from the user's working directory and confirm
that `.import <prelude>` succeeds. If it still fails, inspect the searched roots
printed in the thrown error.
