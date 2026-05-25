---
id: cpp-vm-recursion-stack-overflow
title: "C++ VM recursion stack overflow"
last_updated: 2026-05-25
description: >
  Symptom and fix for C++ stack frame accumulation leading to segmentation faults (stack overflow) under recursive F♭m word calls.
tags: [cpp, engine, recursion]
---

#### Symptom

Deep recursion or complex F♭m program execution on the C++ runner crashes with a segmentation fault (stack overflow), even when the F♭m program itself is theoretically tail-recursive or has moderate stack requirements. This may manifest as partial standard output followed by a crash, or immediate segfaults in deep-recursion/library tests.

#### Likely causes

- System opcode execution functions like `callSystem(op_eval)` or `callSystem(op_when)` invoking the VM's dispatch loop recursively via direct calls to `callOp()` or similar.
- Each nested evaluation or word invocation pushes a new C++ compiler stack frame. Because stack size limits on host operating systems are relatively small compared to heap allocations, rapid nesting of recursive F♭m words runs out of system stack space quickly.

#### Fix

Never invoke the VM's main dispatch or operator-evaluation routines recursively from inside system opcode execution handlers. Instead, transition from direct synchronous invocation to iterative queue dispatch:

1. System opcodes (such as `eval` or `when`) must enqueue their target tokens, opcodes, or definitions onto the front of the main execution queue (e.g., `queue.push_front()`).
2. Allow control to return back to the iterative VM `run()` dispatch loop.
3. The `run()` loop will then iteratively pop and execute these prepended instructions stack-safely without growing the C++ runtime call stack.
4. When dealing with sequential or multiple enqueued items, ensure proper evaluation ordering to avoid double-reversal bugs (e.g. account for stack reversal by pushing the definition's tokens in reverse, or ensuring standard evaluation sequence).

#### Validation

Compile the C++ VM with `g++` and run recursion tests (e.g., `seq` or `string` library words) to verify they execute iteratively without stack overflow.
