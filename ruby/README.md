# Ruby Implementation

This directory contains the Ruby implementation of f-flat-minor.

Current scope:
- Bytecode/source executor in [`ruby/execute.rb`](execute.rb)
- TAP test runner wrapper in [`ruby/run-tap-test.sh`](run-tap-test.sh)
- Example script in [`ruby/fact.rb`](fact.rb)

## Tooling

Use the repo-level [`mise.toml`](../mise.toml) and [`mise.lock`](../mise.lock) when running `chomp` tasks for this project.

- Prefer activating the repo toolchain in your shell before running commands in [`ruby/`](.)
- If your shell is not activated, use `mise exec -- ...`

This ensures `chomp` and other pinned tools are available.

## Quick Start

From the repo root, run a source file through the Ruby interpreter:

```bash
cat ff/example_v0.ff | ruby ruby/execute.rb
```

Run the Ruby project checks:

```bash
cd ruby && mise exec -- chomp test
```

Run TAP-style library tests with the Ruby runtime:

```bash
cd ruby && mise exec -- chomp test:tap
```

## Commands

- [`ruby/execute.rb`](execute.rb) executes f-flat-minor programs from `stdin`
- [`ruby/chompfile.toml`](chompfile.toml) defines build/test tasks for this runtime
- [`ruby/run-tap-test.sh`](run-tap-test.sh) adapts TAP tests to the Ruby interpreter
