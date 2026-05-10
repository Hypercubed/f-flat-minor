## ADDED Requirements

### Requirement: O(1) System Operations Dispatch
The execution engine must retrieve system operation functions (0-255) using an O(1) array index instead of a hash map lookup.

#### Scenario: Dispatching a known system operation
- **WHEN** the engine's `callOp` is invoked with a code <= 255
- **THEN** it must execute the corresponding function from the `sysDefs` array without invoking Map lookups.
