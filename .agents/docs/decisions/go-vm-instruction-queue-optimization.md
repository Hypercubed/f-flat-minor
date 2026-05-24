---
id: go-vm-instruction-queue-optimization
title: "Optimize Go VM instruction queue with circular ring buffer"
last_updated: 2026-05-24
description: >
  Replacing the slide-copying slice implementation with a custom ring buffer deque (FastQueue)
  in the Go VM instruction queue to improve performance from O(N^2) to amortized O(N),
  along with micro-optimizations to eliminate heap allocations in the VM hot loop.
tags: [go, performance, engine, architecture]
status: accepted
---

## Context

The f-flat-minor (F♭m) Go VM instruction execution queue was previously implemented using a slice where prepending operations was done via `queue = append(newOps, queue...)`. Under recursive loops or heavy user word calls, this slice-copying approach triggered a full heap allocation and an $O(N)$ copy of the entire remaining queue, leading to quadratic $O(N^2)$ performance and heavy garbage collection overhead.

Additionally, hot VM loop executions repeatedly allocated heap-bound objects (such as allocating `*big.Int` pointers on every instruction lookup with `op.Cmp(NewInt(0)) == 0` or boundary checks with `NewInt(int64(MAX_SYSTEM_OP_CODE))`), causing significant memory churn and allocation overhead.

## Decision

1. **Circular Ring Buffer Deque (`FastQueue`)**: We replaced the slide-copying slice queue in the Go runtime VM engine with a custom circular ring buffer deque (`FastQueue`). It uses a power-of-two capacity and bitwise index masking (`& mask`) to achieve amortized $O(1)$ front insertion (`UnshiftArray`), tail popping/pushing, and front shifting.
2. **Zero-Allocation Zero-Literals Check**: Replaced `op.Cmp(NewInt(0)) == 0` with `op.Sign() == 0` inside the hot VM loop to completely avoid heap allocations when checking for zero-literals in Go's `big.Int` representation.
3. **Pre-allocated VM Constants**: Pre-allocated boundary variables (like `maxSystemOp` initialized via `big.NewInt(int64(MAX_SYSTEM_OP_CODE))`) instead of recreating them on every user-word call check.
4. **Memory Leak Prevention**: Cleared removed queue items (`nil` out shifted/popped slots) in `FastQueue` to avoid lingering references preventing garbage collection.

## Consequences

- **Performance**: Dramatically improved Go VM execution times (e.g., dropping `euler7.ffp` execution time from over 22.7 seconds to 14.189 seconds), resulting in better scaling and significantly lower GC overhead.
- **Complexity**: Adds a custom ring buffer implementation (`fast_queue.go`), which introduces minimal implementation complexity compared to standard Go slices, but provides large computational complexity improvements ($O(N)$ vs $O(N^2)$ overall queue-manipulation cost).
