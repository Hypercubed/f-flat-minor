## 1. Specifications & Documentation

- [ ] 1.1 Update `README.md` to document consecutive-line macro merging for `.m`, `.ff`, and `.ffp` directives under the _F♭m⁺_ preprocessor command table.
- [ ] 1.2 Update preprocessor manuals to provide example usage of multiline macros without continuation slashes.

## 2. Preprocessor Implementation (TypeScript)

- [ ] 2.1 Refactor `preprocessLines` in `typescript/core/src/preprocess.ts` to transition from an independent line mapper loop to an iterative lookahead scanner loop.
- [ ] 2.2 Implement lookahead accumulation for consecutive adjacent lines that share the exact same macro directive (`.m`, `.ff`, or `.ffp`).
- [ ] 2.3 Integrate VM execution of the combined multiline macro and verify the block-replacement output.

## 3. Preprocessor Implementation (Go & Racket)

- [ ] 3.1 Update Go preprocessor (`go/src/preprocess/`) to support consecutive-line lookahead merging and block execution.
- [ ] 3.2 Update Racket preprocessor (`racket/private/preprocess.rkt`) to support consecutive-line lookahead merging and block execution.

## 4. Verification & Integration Tests

- [ ] 4.1 Add Deno preprocessor integration tests in `deno/src/preprocess_test.ts` to assert that multiline `.m`, `.ff`, and `.ffp` blocks merge and evaluate correctly.
- [ ] 4.2 Add Go preprocessor integration tests to assert that multiline macro blocks compile with correct parity.
