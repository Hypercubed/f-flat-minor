---
id: cli-compilation-execution-routing
title: Unify compilation and execution routing under shell helper scripts
last_updated: 2026-05-25
description: >
  Unify low-level compiler routing, bytecode execution, and binary packaging under common shell scripts
  to ensure robust runtime routing and maintain conceptual parity with engine VMs.
tags: [tooling, shell, architecture]
status: accepted
---

## Context

F♭m has multiple runtime implementations (Deno, Node, Bun, Go, Racket). Historically, executing benchmarks, running test suites, and performing raw compilation required invoking runtime-specific command structures. This introduced significant repetition in task runners like `chompfile.toml` and made it easy for execution behaviors (e.g. standard input handling or env var configuration) to drift between runtimes.

Additionally, raw source interpretation and compiled bytecode execution were conflated, leading to confusion about which tool executes what format.

## Decision

1. **Unified Compilation Routing**: Route all compiler invocations through `./shell/ff-compile.sh` and the internal `ff_compile` utility in `_ff-common.sh`. This includes supporting standard input `-` as a compilation source across all Deno, Node, Bun, Go, and Racket backends.
2. **Temporary File Fallback**: Since the Racket compiler does not natively support stdin compilation, the wrapper intercepts `-` and transparently routes compilation through a workspace-local temporary file (`.racket-compile-XXXXXX.ff`), utilizing shell `trap`s for cleanup.
3. **Partitioned Interpreters and Executors**:
   - `ff interpret` / `ff-interpret.sh` is strictly for raw, unpreprocessed `.ff` source code.
   - `ff execute` / `ff-execute.sh` is strictly for direct execution of compiled `.ffb` base64 VLQ bytecode on the underlying engine VMs.
   - All bytecode execution is unified under `ff_execute` in `_ff-common.sh`.
4. **Dynamic Subcommand Dispatch & Packaging**: The central front-end dispatch (`shell/ff`) dynamically registers and exposes any executable matching the naming pattern `shell/ff-*.sh` as a CLI subcommand (e.g., `ff <name>`). Sourcing `./_ff-common.sh` provides standard environment detection, logging functions, and argument-parsing helpers. We introduced the `ff pack` command (`shell/ff-pack.sh`) to package compiled bytecode (`.ffb`) into a self-executing binary by prepending a configurable execution engine (C++ or Go) and making it executable.

## Consequences

- **DRY Benchmarks**: Chomp benchmark targets are fully parameterized and significantly simplified by calling the unified shell runners instead of duplicating runtime commands.
- **Robust Cleanup**: The use of temporary files for Racket stdin is robust against early termination, execution errors, and signals.
- **Strict Format Separation**: Reduces user/agent error by failing fast when the wrong format (source vs compiled bytecode) is passed to interpreters or executors.
- **Dynamic CLI Extensibility**: Creating new subcommands is entirely modular: adding a `shell/ff-<cmd>.sh` script that follows the common wrapper template dynamically registers the command without editing the central dispatcher.
- **Self-Executing Binaries**: Empowers users to bundle compiled F♭m applications cleanly into portable native executables.
