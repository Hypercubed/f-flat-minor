# Python Implementation

This directory contains the Python implementation of f-flat-minor.

Current scope:
- Bytecode/source executor in [`python/execute.py`](execute.py)
- Shared shell helpers in [`shell/ff-run.sh`](../shell/ff-run.sh)
- Example script in [`python/fact.py`](fact.py)

## Tooling

Use the repo-level [`mise.toml`](../mise.toml) and [`mise.lock`](../mise.lock) when running `chomp` tasks for this project.

- Prefer activating the repo toolchain in your shell before running commands in [`python/`](.)
- If your shell is not activated, use `mise exec -- ...`

This ensures `chomp` and other pinned tools are available.

## Quick Start

From the repo root, run a source file through the Python interpreter:

```bash
cat ff/example_v0.ff | python3 python/execute.py
```

Run the Python project checks:

```bash
cd python && mise exec -- chomp test
```

Run TAP-style library tests with the Python runtime:

```bash
cd python && mise exec -- chomp test:tap
```

## Commands

- [`python/execute.py`](execute.py) executes f-flat-minor programs from `stdin`
- [`python/chompfile.toml`](chompfile.toml) defines build/test tasks for this runtime
- [`shell/ff-run.sh`](../shell/ff-run.sh) preprocesses when needed and executes via the selected runtime
