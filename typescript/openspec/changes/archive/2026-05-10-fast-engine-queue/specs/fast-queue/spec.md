# FastQueue (Ring Buffer Deque)

## ADDED Requirements

### Requirement: O(1) Deque API
The queue must implement O(1) operations for both ends of the buffer (`shift`, `unshift`, `push`, `pop`).

#### Scenario: Prepending code to the execution stream
- **WHEN** the engine unshifts a user word definition into the queue
- **THEN** the elements are written to the head of the circular buffer without shifting existing elements in memory.

#### Scenario: Reading the next instruction
- **WHEN** the engine shifts an element from the queue
- **THEN** the head pointer is advanced and the element is returned without shifting existing elements in memory.

#### Scenario: Buffer Expansion
- **WHEN** the `unshift` or `push` operation exceeds the current capacity
- **THEN** the queue automatically allocates a new buffer of double the capacity, aligns the elements linearly, and continues execution.
