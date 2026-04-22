---
id: typescript-runtime-stdlib-root-discovery
title: "TypeScript runtime stdlib root discovery"
last_updated: 2026-04-22
description: >
  Node, Bun, and Deno should discover the built-in stdlib root by searching
  upward for ff/lib from stable anchors so compiled executables and varied CWDs work.
tags: [typescript, runtime, stdlib, bun, deno, node]
status: accepted
---

### Decision

Node, Bun, and Deno CLI defaults should discover the built-in stdlib root by
searching upward for `ff/lib` from stable anchors such as module location,
current working directory, and executable directory.

### Status

Accepted

### Context

Bun compiled executables can report `import.meta.url` from a virtual executable
filesystem. A resolver based only on source module location can then derive an
invalid built-in stdlib root such as `/ff/lib`, breaking `.import <prelude>`.

### Rationale

Searching multiple anchors matches the Deno resolver model and keeps compiled
and source TypeScript entrypoints usable from both runtime subdirectories and
the repo root.

### Consequences

Keep `FBM_STDLIB_PATH` and repeated `--stdlib-root` values as additional roots
after the discovered built-in stdlib root. Apply stdlib resolver fixes across
Node and Bun together unless there is a runtime-specific reason not to.
