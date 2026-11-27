## Why

The Go engine VM currently uses a standard Go slice (`[]*Int`) to represent the instruction queue. When executing user-defined words or loop constructs, it prepends the word's bytecode definition to the front of the queue using `queue = append(d, queue...)`. This triggers a full allocation and copy of the entire remaining queue (an $O(N)$ operation), leading to quadratic performance scaling and severe memory allocation overhead on long-running loops like `euler7.ffp`.

## What Changes

- Modify `go/src/engine/engine.go` to replace the slide-copying queue mechanism with a circular ring buffer deque implementation.
- Introduce a custom `FastQueue` (or optimized struct) in the Go engine to support true $O(1)$ front insertion (`unshiftArray`) and pop/shift operations, aligning the Go engine with the TypeScript `FastQueue` implementation.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- None

## Impact

- `go/src/engine/engine.go`: Replace queue variable type and operations with the new fast queue implementation.
- Improve performance and memory profile of all recursive calls and loops executed via the Go bytecode VM. No behavioral or API changes to users of f-flat-minor.
