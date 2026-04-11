# Test and dev workflows playbook

Use this playbook for common repo execution workflows after code changes.

## Core test choices

1. Run the primary/fullest suite when validating broad changes:

```bash
mise exec -- chomp test:deno
```

2. Run TAP library tests for `ff/lib/**/__tests__/*.test.ffp` work:

```bash
cd bun && mise exec -- chomp test:tap
```

3. Run Go tests from `go/`:

```bash
cd go && mise exec -- go test ./...
```

## Common service and dev commands

- Web playground dev server:

```bash
cd web && mise exec -- npm run dev
```

- Web build:

```bash
cd web && mise exec -- npm run build
```

- Deno lint:

```bash
cd deno && mise exec -- deno lint
```

- Individual runtime test suites:

```bash
mise exec -- chomp test:{deno,node,bun,python,ruby}
```

## Quick selection guide

- Editing language/runtime behavior broadly: run `mise exec -- chomp test:deno`.
- Editing TAP-style library tests or helpers: run `cd bun && mise exec -- chomp test:tap`.
- Editing Go implementation: run `cd go && mise exec -- go test ./...`.
- Editing web playground integration: run the relevant `web` build or dev command.

## Known environment notes

- Some `vitest` web tests fail due to a pre-existing missing `path.relative` in the browser preprocessor host.
- Deno lint may report expected `no-import-prefix` warnings on inline URL imports.
