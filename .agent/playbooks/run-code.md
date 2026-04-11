# Running code playbook

Use this playbook when you need to choose a runtime and execute F-flat-minor source.

## 1. Identify the file type

- `.ff`: run with Python unless the task specifically needs another runtime.
- `.ffp`: run with a preprocessor-capable runtime; do not use Python.

## 2. Run `.ff` files

```bash
cat <file>.ff | python3 python/execute.py
```

Example:

```bash
cat ff/example_v0.ff | python3 python/execute.py
```

## 3. Run `.ffp` files

Start with the runtime documented for the subsystem you are working in.

Common TypeScript entrypoints:

```bash
mise exec -- node node/bin/ff-run.ts <file>.ffp
mise exec -- deno run -A deno/bin/ff-run.ts <file>.ffp
```

For trace/debug runs:

```bash
mise exec -- node node/bin/ff-run.ts --trace <file>.ffp
mise exec -- node node/bin/ff-run.ts --trace --trace-format jsonl <file>.ffp
```

## 4. When imports are involved

- Prefer documented repo tasks or runtime README commands when import resolution matters.
- For individual test-like runs, run from the test or source directory when the docs for that area require it.

## 5. Escalate to runtime-specific docs when needed

- `deno/README.md`
- `node/README.md`
- `bun/README.md`
- `go/README.md`
