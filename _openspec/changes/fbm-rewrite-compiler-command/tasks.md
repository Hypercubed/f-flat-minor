# PHASE A: Basic Rewrite Rules (Without Guards)

## 1. Specifications & Documentation (Phase A)

- [ ] 1.1 Update `README.md` to document the basic `.rewrite [pattern] [replacement]` compiler command (2-quotation syntax) under the _F♭m⁺_ compiler command table.
- [ ] 1.2 Document wildcard pattern variables (leading underscore variables) and basic compile-time VM replacement folding inside the language reference manuals.

## 2. Compiler & Parser Modifications (Phase A - TypeScript)

- [ ] 2.1 Update `typescript/core/src/preprocess.ts` to parse the 2-quotation `.rewrite` directive and its pattern/replacement blocks from source files.
- [ ] 2.2 Add handler inside `typescript/core/src/compiler.ts` to extract `.rewrite` pattern and replacement IR instruction blocks during IR generation.
- [ ] 2.3 Enforce compile-time validation to verify that basic rewrite patterns contain only valid literals, system opcodes, and wildcards.

## 3. Rewrite Matcher & VM Evaluator (Phase A - TypeScript)

- [ ] 3.1 Implement a linear sequence matcher in `typescript/core/src/optimizer.ts` to scan and compare target program IR against active 2-quotation rewrite patterns.
- [ ] 3.2 Implement a wildcard variable binder that extracts and binds matched literals (e.g., `_a` -> `42`).
- [ ] 3.3 Add VM-assisted execution in the optimizer: spin up a temporary `Engine` instance with shared definition scope, push bound literals, execute the replacement quotation, and harvest stack outputs.
- [ ] 3.4 Integrate the basic rewrite rule evaluation pass into the compiler's primary `optLoop` optimization pass, respecting loop limits.
- [ ] 3.5 Implement definition-level optimization passes to optimize independent subroutines in the symbol dictionary (`defs`) prior to executing `inlineWords`.

## 4. Cross-Language Porting (Phase A - Go & C++)

- [ ] 4.1 Update Go preprocessor and compiler (`go/src/compiler/compiler.go`) to support parsing basic `.rewrite` directives and executing VM-assisted replacements via Go's internal engine.
- [ ] 4.2 Update C++ compiler (`cpp/run.cpp` and `cpp/execute.cpp`) to support parsing basic `.rewrite` directives and executing VM-assisted replacements via C++'s internal `ff.cpp` VM.

## 5. Verification & Standard Library Integration (Phase A)

- [ ] 5.1 Create standard compiler integration tests under `ff/lib/__tests__/rewrite.test.ffp` to assert correct compile-time folding of basic 2-quotation rewrite rules.
- [ ] 5.2 Add standard algebraic and constant folding rules (such as `_a 0 + -> _a` and `_a 1 * -> _a`) directly as basic `.rewrite` directives inside `ff/lib/core.ff`.


# PHASE B: Conditional Rewrite Rules (With Guards) - Deferred

## 6. Specifications & Documentation (Phase B)

- [ ] 6.1 Update `README.md` and reference manuals to document the optional 3-quotation conditional rewrite syntax: `.rewrite [pattern] [replacement] [guard]`.

## 7. Matcher & Guard Evaluation (Phase B - TypeScript/Go/C++)

- [ ] 7.1 Update `typescript/core/src/preprocess.ts` and `compiler.ts` to parse the optional 3rd guard quotation block.
- [ ] 7.2 Implement guard execution in `optimizer.ts`: spin up the compile-time VM, push bound wildcards to the stack, execute the guard, and only commit the match if the VM returns a non-zero (true) value.
- [ ] 7.3 Update Go and C++ preprocessor/compiler engines to support 3-quotation conditional rules.
- [ ] 7.4 Add strength-reduction rules (such as power-of-2 multiplication to shift left) as conditional `.rewrite` directives inside `<core.ff>`.
