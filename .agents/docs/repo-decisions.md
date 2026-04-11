# Repository Decisions

## TypeScript Runtime Stdlib Root Discovery

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

## Agent Knowledge Starter Kit Merge

### Decision

Adopt the Agent-Knowledge-Starter-Kit knowledge-layer structure by merging its
scaffold into the existing `.agents/` tree instead of replacing current files.

### Status

Accepted

### Context

This repository already had `.agents/rules/`, `.agents/playbooks/`, and
`.agents/skills/` with F-flat-minor-specific runtime, authoring, testing, and
planning guidance. The starter kit recommends copying `scaffold/` into
`.agents/`, with careful merging when `.agents/` already exists.

### Rationale

The existing F-flat-minor guidance is more specific than the starter templates
for rules, playbooks, and domain skills. The useful new pieces are the
knowledge-layer maintenance model: durable docs, role notes, local session
bundles, closeout, distillation, and lint workflows.

### Consequences

Future agents should preserve existing F-flat-minor-specific guidance and add
durable lessons to the narrowest appropriate `.agents/` file. Temporary evidence
belongs under `.agents/sessions/` and should not be committed.

## Entry Template

### Decision

Describe the decision.

### Status

Accepted | superseded | provisional

### Context

Why this decision was needed.

### Rationale

Why this approach was chosen.

### Consequences

What future agents should keep in mind.
