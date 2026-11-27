## 1. Engine Structure Refactoring

- [x] 1.1 Replace `defs` Map with `userDefs` array in `typescript/core/src/engine.ts`
- [x] 1.2 Update `defineUser` to store definitions in the `userDefs` array using `Number(code) - 256` as the index
- [x] 1.3 Update `inspectValue` and `parseDefinitionTokens` to retrieve definitions from the `userDefs` array
- [x] 1.4 Update `getNextAnonOp` to check for definition existence in the `userDefs` array

## 2. Execution Loop Optimization

- [x] 2.1 Inline user definition lookup in `runChunk` to use direct `userDefs` indexing
- [x] 2.2 Verify and clean up any remaining references to the old `defs` Map

## 3. Verification and Benchmarking

- [x] 3.1 Run `euler14.ffp` to verify correct output and measure performance improvement
- [x] 3.2 Run the full repository test suite: `mise exec -- chomp test:deno`
