## 1. Engine Structure Refactoring

- [ ] 1.1 Replace `defs` Map with `userDefs` array in `typescript/core/src/engine.ts`
- [ ] 1.2 Update `defineUser` to store definitions in the `userDefs` array using `Number(code) - 256` as the index
- [ ] 1.3 Update `inspectValue` and `parseDefinitionTokens` to retrieve definitions from the `userDefs` array
- [ ] 1.4 Update `getNextAnonOp` to check for definition existence in the `userDefs` array

## 2. Execution Loop Optimization

- [ ] 2.1 Inline user definition lookup in `runChunk` to use direct `userDefs` indexing
- [ ] 2.2 Verify and clean up any remaining references to the old `defs` Map

## 3. Verification and Benchmarking

- [ ] 3.1 Run `euler14.ffp` to verify correct output and measure performance improvement
- [ ] 3.2 Run the full repository test suite: `mise exec -- chomp test:deno`
