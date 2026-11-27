# FastQueue (Ring Buffer Deque)

## Purpose
The FastQueue provides an efficient double-ended queue (deque) implementation optimized for f-flat-minor stack-based execution engines.
## Requirements
### Requirement: O(1) Deque API
The queue MUST implement O(1) operations for both ends of the buffer (`shift`, `unshift`, `push`, `pop`). All index arithmetic SHALL use bitwise AND with a precomputed mask (`& this._mask`) instead of modulo, requiring that the buffer capacity always be a power of 2.

#### Scenario: Prepending code to the execution stream
- **WHEN** the engine unshifts a user word definition into the queue
- **THEN** the elements are written to the head of the circular buffer without shifting existing elements in memory.

#### Scenario: Reading the next instruction
- **WHEN** the engine shifts an element from the queue
- **THEN** the head pointer is advanced and the element is returned without shifting existing elements in memory.

#### Scenario: Buffer Expansion
- **WHEN** the `unshift` or `push` operation exceeds the current capacity
- **THEN** the queue automatically allocates a new buffer of double the capacity, aligns the elements linearly, recomputes the bitmask, and continues execution.

#### Scenario: Index arithmetic uses bitmask
- **WHEN** the head or tail pointer is updated during any queue operation
- **THEN** the index wrapping SHALL be computed as `index & this._mask` where `_mask = buffer.length - 1`, avoiding modulo division.

### Requirement: Go FastQueue implementation
The Go engine VM SHALL implement a fast deque structure using a circular ring buffer that matches the language specifications of the TypeScript implementation.

#### Scenario: Prepending bytecode array
- **WHEN** the Go engine VM executes a user word or quotation call
- **THEN** it SHALL unshift the definition array into the front of the FastQueue in $O(1)$ amortized time.

