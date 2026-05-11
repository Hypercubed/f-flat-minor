## MODIFIED Requirements

### Requirement: Inline Opcode Routing
The core VM loop `runChunk` MUST perform direct numeric evaluation and lookup for opcodes, skipping function wrappers like `callOp` and `callSystem`. This inline dispatch logic MUST be present in both `runChunkFast` and `runChunkInstrumented`, preserving identical dispatch semantics across both paths.

#### Scenario: Executing a system opcode
- **WHEN** an instruction with the `Q_CALL` tag is popped from the execution queue and its value is less than or equal to `MAX_SYSTEM_OP_CODE`
- **THEN** the engine immediately retrieves the appropriate predefined function directly from the `sysDefs` array map using the numeric value and calls it, avoiding extraneous function boundaries and `bigint`-to-`Number` conversions on the hot path

#### Scenario: Executing a user-defined opcode
- **WHEN** an instruction with the `Q_CALL` tag is popped from the execution queue and its value is greater than `MAX_SYSTEM_OP_CODE`
- **THEN** the engine immediately retrieves the definition from the `userDefs` array using the offset numeric value and processes it (either by calling the function or unshifting the array into the queue), bypassing `Map.get` calls and `bigint`-to-`Number` conversion overhead.

#### Scenario: Dispatch consistency across paths
- **WHEN** the same opcode sequence is executed via `runChunkFast` and `runChunkInstrumented`
- **THEN** both paths MUST use the same dispatch logic: identical `sysDefs` array lookup for system ops and identical `userDefs` array lookup with `USER_OP_CODE_OFFSET` for user ops, producing the same call sequence.
