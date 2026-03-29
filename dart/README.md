# Dart Implementation

This directory contains the Dart implementation of f-flat-minor.

Current scope:
- Compiled CLI entrypoint in [`dart/bin/dart.dart`](bin/dart.dart)
- Shared shell helpers in [`shell/ff-run.sh`](../shell/ff-run.sh)
- Dart package configuration in [`dart/pubspec.yaml`](pubspec.yaml)

## Tooling

Use the repo-level [`mise.toml`](../mise.toml) and [`mise.lock`](../mise.lock) when running `chomp` tasks for this project.

- Prefer activating the repo toolchain in your shell before running commands in [`dart/`](.)
- If your shell is not activated, use `mise exec -- ...`

This ensures `chomp` and other pinned tools are available.

## Quick Start

Build the Dart executable:

```bash
cd dart && mise exec -- chomp build
```

From the repo root, run a source file with the built executable:

```bash
cat ff/example_v0.ff | dart/bin/dart.exe
```

Run the Dart project checks:

```bash
cd dart && mise exec -- chomp test
```

Run TAP-style library tests with the Dart runtime:

```bash
cd dart && mise exec -- chomp test:tap
```

## Commands

- [`dart/bin/dart.dart`](bin/dart.dart) is the main Dart runtime entrypoint
- [`dart/chompfile.toml`](chompfile.toml) defines build/test tasks for this runtime
- [`shell/ff-run.sh`](../shell/ff-run.sh) preprocesses when needed and executes via the selected runtime
