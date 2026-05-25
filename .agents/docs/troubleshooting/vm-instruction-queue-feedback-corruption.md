---
id: vm-instruction-queue-feedback-corruption
title: "VM instruction queue feedback and literal corruption"
last_updated: 2026-05-25
description: >
  Symptom and fix for stack underflows, token swallowing, and incorrect dynamic list evaluation in integer-dispatched VMs.
tags: [engine, go, cpp, list]
---

#### Symptom

VM crashes on basic stack operations (like `op_drop` segfaults due to empty stack), execution order becomes corrupted, or dynamically constructed lists (such as `[ 1 0 ]` built with `cons`) behave differently than static, parser-defined lists. The VM may swallow the token immediately following a dynamically enqueued command.

#### Likely causes

- Pushing system opcodes or literal-push markers (like the `0` token, which represents `nop` and serves as a prefix marker for literal values) back into the execution queue during dynamic evaluations.
- When the VM's `run()` loop encounters these raw markers in the main queue, it misinterprets them as active push-instructions, swallowing subsequent tokens as literal values rather than executing them as opcodes, or corrupting execution limits.
- Implementing list concatenation/construction (`cons`) using high-level dynamic evaluation wrappers or pushing raw `0` markers into the main interpreter queue, which shifts standard quotation structure out of alignment.

#### Fix

In stack-based, integer-dispatch VMs (such as Go and C++):

1. Keep system opcodes and literal-push markers strictly synchronous. System opcodes and literal markers must never be pushed back into the main execution queue for subsequent dispatch.
2. In dispatch helpers (like `enqueueOp`), evaluate system opcodes (`op_int < 256`) synchronously via the system opcode runner, and only delegate user opcodes (`op_int >= 256`) or standard symbols to the dispatch queue.
3. Align `op_cons` list-construction logic across VMs (matching Deno/Go): push `{0, x}` and then append `y` directly onto the definitions queue (e.g., `def.push_back(y)` when `y != 0`) rather than invoking dynamic `op_eval` evaluation or queuing raw push-markers.

#### Validation

Compile the VM and run tests that verify dynamic list manipulation and complex stack transitions (e.g., mathematical list benchmarks or recursive list folds).
