# Repository Decisions

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
