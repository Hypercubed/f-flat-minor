## Context

The F-flat-minor execution engine currently stores user-defined and anonymous operations in a `Map<bigint, bigint[] | (() => void)>`. During execution, the `runChunk` loop frequently calls `this.defs.get(value)` for every non-system word. Profiling shows that this Map lookup is a significant performance bottleneck.

Since user and anonymous operations are assigned sequential IDs starting at `MAX_SYSTEM_OP_CODE + 1` (256), we can move to a flat array for these definitions, similar to the recent optimization for system operations (`sysDefs`).

## Goals / Non-Goals

**Goals:**
- Replace the `defs` Map with a flat array for O(1) lookup of user/anon operations.
- Eliminate V8 Map lookup overhead from the hot execution loop.
- Maintain existing functionality for user word definition and inspection.

**Non-Goals:**
- This change does not aim to optimize the storage of literals or system opcodes (which are already handled).
- No changes to the F-flat-minor language syntax or semantics.

## Decisions

### 1. Replace `defs` Map with `userDefs` Array
We will replace `this.defs: Map<bigint, bigint[] | (() => void)>` with `private readonly userDefs: ((() => void) | bigint[] | undefined)[] = []`.
- **Rationale**: Arrays provide O(1) access compared to Map lookup overhead.
- **Alternatives**: Keeping the Map but caching lookups (more complex and still has initial overhead).

### 2. Indexing by `(code - 256)`
User-defined words start at 256. We will use `Number(code) - 256` as the index into `userDefs`.
- **Rationale**: Minimal arithmetic needed to map a bigint code to an array index.

### 3. Inlining in `runChunk`
We will update the VM loop to directly check if `value > MAX_SYSTEM_OP_CODE` and access `userDefs[Number(value) - 256]`.
- **Rationale**: Bypassing the `callUser` function wrapper further reduces overhead.

## Risks / Trade-offs

- **[Risk] Memory Usage** → If a program defines a very large number of words or has a very high anonymous op count, the `userDefs` array could grow large. However, in practice, Ffm programs have a manageable number of definitions, and JS arrays handle sparsity/growth efficiently.
- **[Trade-off] Sparsity** → If there are large gaps in opcode assignment (unlikely with the current sequential `nextAnonOp` logic), the array could be sparse. JS engines optimize for this.
