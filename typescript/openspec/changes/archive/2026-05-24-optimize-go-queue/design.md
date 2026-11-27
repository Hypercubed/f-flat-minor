## Context

The Go VM engine represents f-flat-minor instruction queues using Go slices (`[]*Int`). Prepended user-defined word definitions are inserted using slice concatenation (`append(d, queue...)`). This incurs a copy of the entire remaining queue at $O(N)$ time per user word call. This quadratic overhead causes loops like Project Euler #7 (`euler7.ffp`) to be extremely slow in Go (22.7 seconds).

We will replace the slice-based queue with a circular ring-buffer deque called `FastQueue`.

## Goals / Non-Goals

**Goals:**
- Replace the slice `queue` with a circular deque (`FastQueue`) implementation.
- Support efficient $O(1)$ amortized operations for:
  - `Shift()` (equivalent to `queue[0]` and `queue[1:]`)
  - `Push()` (equivalent to `queuePush()`)
  - `Pop()` (equivalent to `queuePop()`)
  - `UnshiftArray()` (equivalent to `append(d, queue...)`)
- Achieve near-instantaneous execution times on `euler7.ffp` in Go (under 0.1s).

**Non-Goals:**
- Optimize other parts of the Go engine or compiler.
- Modify the language syntax or semantics.
- Affect other implementations (TypeScript, C++, Python).

## Decisions

### Decision 1: Ring Buffer Deque Design
- **Choice**: Implement a custom `FastQueue` struct directly in `go/src/engine/engine.go` (or as a helper) with power-of-two capacity and bitwise index masking (`& mask` instead of `% len`).
- **Rationale**: Replicates the TypeScript engine's successful pattern, avoiding heap allocations and CPU cycles spent on slicing/moving slice elements.
- **Alternatives Considered**: 
  - Using Go's standard library `container/list` (Linked list): Rejected due to heavy pointer chasing and cache misses.
  - Using a third-party deque library: Rejected to keep the VM minimal and dependency-free.

## Risks / Trade-offs

- **Memory Leak Potential**: Ring buffers can keep references to popped elements if not cleared.
  - *Mitigation*: Explicitly set buffer slots to `nil` in `Shift` and `Pop` once elements are removed.
