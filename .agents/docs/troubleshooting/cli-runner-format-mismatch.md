---
id: cli-runner-format-mismatch
title: "CLI runner format mismatch"
last_updated: 2026-05-23
description: >
  Passing wrong file formats to interpret vs execute shell wrappers causes syntax or VM errors.
tags: [tooling, shell, debug]
---

#### Symptom

Running `./shell/ff-interpret.sh` on a compiled `.ffb` bytecode file, or `./shell/ff-execute.sh` on a raw `.ff`/`.ffp` source file, leads to severe parsing or execution failures (e.g. base64 decoding errors, VM crashes, or syntax errors).

#### Likely causes

- Raw source interpreters and bytecode VM executors are strictly partitioned by file format:
  - `ff interpret` / `ff-interpret.sh` expects raw, unpreprocessed `.ff` source code.
  - `ff execute` / `ff-execute.sh` expects base64 VLQ-encoded `.ffb` compiled bytecode.

#### Fix

- Strictly separate your workflows based on the target format:
  - Use `ff-interpret.sh` only for `.ff` files.
  - Use `ff-execute.sh` only for `.ffb` files.
  - For `.ffp` files (which require preprocessing), preprocess first (`ff-preprocess.sh`) or compile (`ff-compile.sh`) to `.ffb` before running `ff-execute.sh`.

#### Validation

Verify you are using the correct command wrapper for your file type by consulting `_docs/supplemental/run-code.md` or checking the file extensions.
