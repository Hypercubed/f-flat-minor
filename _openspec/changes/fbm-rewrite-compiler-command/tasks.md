# PHASE A: JSON-Configured TS Optimizer (TypeScript Only)

## 1. Rules Extraction & Loader

- [ ] 1.1 Create `typescript/core/src/rules.json` and extract all 36+ hardcoded optimization rules into a structured JSON schema where pattern, replacement, and optional guard are standard F♭m stack-code sequences.
- [ ] 1.2 Implement a JSON loader and pattern compiler in `Optimizer` (`typescript/core/src/optimizer.ts`) to dynamically compile pattern string tokens (like `"+"`, `"$0"`) into matching function predicates at startup.
- [ ] 1.3 Implement compile-time VM-assisted evaluation in the optimizer: spin up a temporary, isolated `Engine` instance. If a guard is present, substitute wildcard values into the guard F♭m stack-code array, execute it on the VM, and only proceed if the VM returns a non-zero (true) value. Then, substitute wildcards into the replacement F♭m stack-code array, execute it on the VM, and harvest resulting stack values as folded IR instructions.

## 2. Rule Matcher & Rewriter

- [ ] 2.1 Refactor `peepholeOptimization` inside `optimizer.ts` to dynamically match compiler instruction streams against the compiled JSON patterns, bind matched values to positional wildcard variables in a linear array, and invoke the VM-assisted guard and replacement evaluator.
- [ ] 2.2 Verify complete test parity of the TS compiler using the existing test suite:
  ```bash
  mise exec -- chomp test:deno
  ```
  ensuring all optimizations produce identical outputs.


# PHASE B: Basic Rewrite Rules (TS, Go, C++)

## 3. Specifications & Documentation

- [ ] 3.1 Update `README.md` to document the basic `.rewrite [pattern] [replacement]` compiler command (2-quotation syntax) under the _F♭m⁺_ compiler command table.
- [ ] 3.2 Document wildcard pattern variables (leading question mark variables) and basic compile-time VM replacement folding inside the language reference manuals.

## 4. Compiler & Parser Modifications (TypeScript)

- [ ] 4.1 Update `typescript/core/src/preprocess.ts` to parse the 2-quotation `.rewrite` directive and its pattern/replacement blocks from source files.
- [ ] 4.2 Add handler inside `typescript/core/src/compiler.ts` to extract `.rewrite` pattern and replacement IR instruction blocks during IR generation.
- [ ] 4.3 Enforce compile-time validation to verify that basic rewrite patterns contain only valid literals, system opcodes, and wildcards.

## 5. VM-Assisted Matcher & Evaluator (TypeScript)

- [ ] 5.1 Implement a linear sequence matcher in `optimizer.ts` to scan and compare target program IR against active 2-quotation rewrite patterns loaded from source files.
- [ ] 5.2 Add VM-assisted execution in the optimizer: spin up a temporary F♭m VM (`Engine` instance) with shared definition scope, push bound literals, execute the replacement quotation, and harvest stack outputs.
- [ ] 5.3 Integrate the basic rewrite rule evaluation pass into the compiler's primary `optLoop` optimization pass, respecting loop limits.
- [ ] 5.4 Implement definition-level optimization passes to optimize independent subroutines in the symbol dictionary (`defs`) prior to executing `inlineWords`.

## 6. Cross-Language Porting (Go & C++)

- [ ] 6.1 Update Go preprocessor and compiler (`go/src/compiler/compiler.go`) to support parsing basic `.rewrite` directives and executing VM-assisted replacements via Go's internal engine.
- [ ] 6.2 Update C++ compiler (`cpp/run.cpp` and `cpp/execute.cpp`) to support parsing basic `.rewrite` directives and executing VM-assisted replacements via C++'s internal `ff.cpp` VM.

## 7. Verification & Standard Library Integration

- [ ] 7.1 Create standard compiler integration tests under `ff/lib/__tests__/rewrite.test.ffp` to assert correct compile-time folding of basic 2-quotation rewrite rules.
- [ ] 7.2 Add standard algebraic and constant folding rules (such as `?a 0 + -> ?a` and `?a 1 * -> ?a`) directly as basic `.rewrite` directives inside `ff/lib/core.ff`.


# PHASE C: Conditional Rewrite Rules (With Guards) - Deferred

## 8. Specifications & Documentation (Phase C)

- [ ] 8.1 Update `README.md` and reference manuals to document the optional 3-quotation conditional rewrite syntax: `.rewrite [pattern] [replacement] [guard]`.

## 9. Matcher & Guard Evaluation (Phase C - TS/Go/C++)

- [ ] 9.1 Update `typescript/core/src/preprocess.ts` and `compiler.ts` to parse the optional 3rd guard quotation block.
- [ ] 9.2 Implement guard execution in `optimizer.ts`: spin up the compile-time VM, push bound wildcards to the stack, execute the guard, and only commit the match if the VM returns a non-zero (true) value.
- [ ] 9.3 Update Go and C++ preprocessor/compiler engines to support 3-quotation conditional rules.
- [ ] 9.4 Add strength-reduction rules (such as power-of-2 multiplication to shift left) as conditional `.rewrite` directives inside `<core.ff>`.
