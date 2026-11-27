## MODIFIED Requirements

### Requirement: Inline Opcode Routing
The core VM loop `runChunk` MUST perform direct numeric evaluation and lookup for opcodes, skipping function wrappers like `callOp` and `callSystem`.

#### Scenario: Executing a system opcode
- **WHEN** an instruction with the `Q_CALL` tag is popped from the execution queue and its value is less than or equal to `MAX_SYSTEM_OP_CODE`
- **THEN** the engine immediately retrieves the appropriate predefined function directly from the `sysDefs` array map using the numeric value and calls it, avoiding extraneous function boundaries and `bigint`-to-`Number` conversions on the hot path

#### Scenario: Executing a user-defined opcode
- **WHEN** an instruction with the `Q_CALL` tag is popped from the execution queue and its value is greater than `MAX_SYSTEM_OP_CODE`
- **THEN** the engine immediately retrieves the definition from the `userDefs` array using the offset numeric value and processes it (either by calling the function or unshifting the array into the queue), bypassing `Map.get` calls and `bigint`-to-`Number` conversion overhead.

#### Scenario: Eval (CALL opcode) dispatches via re-enqueue
- **WHEN** the `eval` system opcode is executed
- **THEN** it SHALL pop TOS and unshift `(Q_CALL, value)` onto the execution queue, allowing the next `runChunk` iteration to handle dispatch through the inlined path, rather than calling `callOp` to re-enter the dispatch chain.
