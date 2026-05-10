## ADDED Requirements

### Requirement: O(1) User Definition Lookup
The engine SHALL store user-defined and anonymous operations in a flat array (`userDefs`) indexed by `(code - 256)` to allow O(1) direct numeric lookup.

#### Scenario: Defining a user word
- **WHEN** a new word is defined
- **THEN** it is placed into the `userDefs` array at the index corresponding to its assigned bigint code, ensuring that the array is resized if necessary.

## MODIFIED Requirements

### Requirement: Inline Opcode Routing
The core VM loop `runChunk` MUST perform direct numeric evaluation and lookup for opcodes, skipping function wrappers like `callOp` and `callSystem`.

#### Scenario: Executing a system opcode
- **WHEN** an instruction with the `Q_CALL` tag is popped from the execution queue and its value is less than or equal to `MAX_SYSTEM_OP_CODE`
- **THEN** the engine immediately retrieves the appropriate predefined function directly from the `sysDefs` array map using the numeric value and calls it, avoiding extraneous function boundaries and `bigint`-to-`Number` conversions on the hot path

#### Scenario: Executing a user-defined opcode
- **WHEN** an instruction with the `Q_CALL` tag is popped from the execution queue and its value is greater than `MAX_SYSTEM_OP_CODE`
- **THEN** the engine immediately retrieves the definition from the `userDefs` array using the offset numeric value and processes it (either by calling the function or unshifting the array into the queue), bypassing `Map.get` calls and `bigint`-to-`Number` conversion overhead.
