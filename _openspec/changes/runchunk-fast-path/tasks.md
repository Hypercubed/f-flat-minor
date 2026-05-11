## 1. Extract Shared Helpers

- [ ] 1.1 Add `throwUndefinedSysOp(code: bigint): never` private method to `Engine`
- [ ] 1.2 Add `throwUndefinedUserOp(code: bigint): never` private method to `Engine`
- [ ] 1.3 Update existing `runChunk` inline throws to call the new helpers (verify tests still pass)

## 2. Create Fast Path

- [ ] 2.1 Add `runChunkFast(maxSteps: number, initialStep: number): number` private method — copy the dispatch loop from `runChunk`, remove all `traceOn`, `statsOn`, `profileOn` branches, `stackBefore` copy, `Math.max` tracking, and trace event emission
- [ ] 2.2 Replace `step++` / `traceStep` with a simple `stepsRun++` counter, return `initialStep + stepsRun`
- [ ] 2.3 Use shared `throwUndefinedSysOp` / `throwUndefinedUserOp` for error paths

## 3. Create Instrumented Path

- [ ] 3.1 Rename current `runChunk` loop body into `runChunkInstrumented(maxSteps: number, initialStep: number): number`
- [ ] 3.2 Update its error throws to use the shared helpers from step 1

## 4. Wire Dispatcher

- [ ] 4.1 Replace `runChunk` body with: check `traceOn || statsOn || profileOn` once, delegate to `runChunkFast` or `runChunkInstrumented`
- [ ] 4.2 Verify `run()` and `runAsync()` call sites unchanged (they call `runChunk` which dispatches internally)

## 5. Validation

- [ ] 5.1 Run `mise exec -- chomp test:deno` — full Deno test suite passes
- [ ] 5.2 Run `cd bun && mise exec -- chomp test:tap` — TAP tests pass
- [ ] 5.3 Run Euler 14 benchmark with `--trace` and `--stats` flags — output identical to pre-change baseline
- [ ] 5.4 Run Euler 14 benchmark without flags — verify performance improvement (target: ≥5% faster)
