## Context

F♭m executes instructions through the `Engine.callOp(code)` method, where `code` is a BigInt. Currently, this method resolves the instruction implementation by querying a `Map<bigint, (() => void) | bigint[]>` named `this.defs`. While V8 maps are fast, hashing a BigInt and retrieving a value is slower than accessing a contiguous array by index. Since system operations (0-255) represent the bulk of hot-path execution, replacing their map lookup with an array lookup offers a substantial performance win.

## Goals / Non-Goals

**Goals:**
- Eliminate `Map.get(bigint)` overhead for system operations in `engine.ts`.
- Ensure execution behavior and stack traces remain completely unaffected.

**Non-Goals:**
- Refactoring how custom user words (anon ops, defined words) are stored. They will continue using the existing `this.defs` map since their codes are sparse and unbounded.
- Refactoring `callUser` or `defineUser` logic.

## Decisions

- **Use a dedicated Array for system operations:** We will introduce `private readonly sysDefs: (((() => void)) | undefined)[] = new Array(MAX_SYSTEM_OP_CODE + 1);`.
- **Lookups:** `callSystem` will use `const r = this.sysDefs[Number(code)]`. Converting small bigints to numbers is highly optimized in V8.
- **Definition:** `defineSystem` will assign directly to `this.sysDefs[Number(code)] = fn`.
- **Inspection:** `inspectValue` will check `this.sysDefs` if the value is `<= MAX_SYSTEM_OP_CODE`.

## Risks / Trade-offs

- **Risk:** Type casting overhead (BigInt to Number).
  - **Mitigation:** Extensive profiling in JS VMs shows `Number(bigint)` for small bigints is a simple bitwise shift and vastly faster than BigInt hashing.
- **Risk:** Subtle bugs if `callOp` logic incorrectly routes a user op to the system array.
  - **Mitigation:** The routing logic is already safe `if (code > -1n && code <= MAX_SYSTEM_OP_CODE)`.
