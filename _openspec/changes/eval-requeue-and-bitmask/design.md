## Context

The F♭m engine's hot execution loop (`runChunk`) processes ~967M dispatches for euler14. Two sources of per-instruction overhead have been identified through profiling:

1. The `eval` system opcode (CALL, 48.8M calls at 5,012 ops/ms — the slowest system op) uses `callOp(x)` which re-enters the dispatch chain through `callSystem`/`callUser` function calls, bypassing `runChunk`'s inlined optimizations.
2. `FastQueue` uses modulo arithmetic (`% this.buffer.length`) for every head/tail index update despite always having power-of-2 capacity, where bitwise AND would suffice.

## Goals / Non-Goals

**Goals:**
- Eliminate nested dispatch overhead from `eval` by re-enqueuing its operand for the main loop to handle.
- Replace modulo operations in `FastQueue` with bitwise AND using a precomputed mask.
- Maintain identical functional semantics — no behavioral changes.

**Non-Goals:**
- No new opcodes or language-level changes.
- No changes to the queue's API contract.

## Decisions

### 1. Eval Re-enqueue via `queueUnshift`
Change the CALL opcode from `this.callOp(x)` to `this.queueUnshift(Q_CALL, x)`.

- **Rationale**: `callOp` performs a bigint range check and then delegates to `callSystem`/`callUser` — logic already inlined in `runChunk`. Re-enqueuing lets the next loop iteration handle it through the optimized path. This also reduces the JS call stack depth during eval (3 frames vs 5).
- **Trade-off**: Each `eval` now costs 2 loop iterations instead of 1. The saved overhead (no `callOp` → `callUser` nesting, no redundant bigint comparison) should outweigh the extra iteration.
- **Alternative**: Inline `callOp` logic directly inside the eval closure. Rejected because it duplicates the already-complex `runChunk` dispatch and would diverge over time.

### 2. FastQueue Bitmask
Store `_mask = buffer.length - 1` and replace all `% this.buffer.length` with `& this._mask`.

- **Rationale**: Bitwise AND is a single CPU instruction vs modulo which requires integer division. At ~680M queue operations per euler14 run, this is measurable.
- **Constraint**: Capacity must always be a power of 2. This is already the case (initial=16, doubles on expand).

## Risks / Trade-offs

- **[Risk] Eval re-enqueue adds a loop iteration** → Mitigated by eliminating heavier work (function calls, bigint comparison). Net effect is positive based on profiling data showing `eval` at 5K ops/ms vs 14K+ for other ops.
- **[Risk] FastQueue bitmask assumes power-of-2 capacity** → Already guaranteed by constructor (16) and `expand()` (doubles). Add a debug assertion if desired.
