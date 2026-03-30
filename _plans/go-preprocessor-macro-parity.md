# Go Preprocessor Macro Parity Plan

## Overview

This plan documents the comparison between the TypeScript and Go preprocessor implementations, identifies missing macro-related functionality in the Go implementation, and provides a step-by-step remediation plan.

## Files Analyzed

| File | Purpose |
|------|---------|
| [`typescript/core/src/preprocess.ts`](typescript/core/src/preprocess.ts) | Core TypeScript preprocessor implementation |
| [`deno/src/preprocess.ts`](deno/src/preprocess.ts) | Deno wrapper around core preprocessor |
| [`bun/src/preprocess.ts`](bun/src/preprocess.ts) | Bun wrapper around core preprocessor |
| [`go/src/preprocess/preprocess.go`](go/src/preprocess/preprocess.go) | Go preprocessor implementation |
| [`go/cmd/preprocess/preprocess.go`](go/cmd/preprocess/preprocess.go) | Go preprocess CLI command |
| [`go/cmd/run/run.go`](go/cmd/run/run.go) | Go run command (uses preprocessor) |
| [`ff/macros.ffp`](ff/macros.ffp) | Example macro usage |
| [`ff/lib/prelude.ffp`](ff/lib/prelude.ffp) | Library prelude (uses .import) |

## Comparison Summary

### TypeScript Preprocessor Actions

The TypeScript preprocessor (in [`typescript/core/src/preprocess.ts`](typescript/core/src/preprocess.ts:54-98)) handles these directives:

| Directive | Behavior |
|-----------|----------|
| `.exit` | Exits the preprocessor via host exit handler |
| `.load <file>` | Loads and preprocesses file (no dedup, no symbol mangling) |
| `.import <file>` | Imports file with deduplication and `__` symbol mangling |
| `.m <code>` | **Executes macro code at preprocess time**, outputs stack as numbers |
| `.ff <code>` | Alias for `.m` |
| `.ffp <code>` | Like `.m` but requires macro prelude to be loaded first |

### Go Preprocessor Actions

The Go preprocessor (in [`go/src/preprocess/preprocess.go`](go/src/preprocess/preprocess.go:90-136)) handles these directives:

| Directive | Behavior |
|-----------|----------|
| `.exit` | Calls `os.Exit(0)` |
| `.load <file>` | Loads and preprocesses file |
| `.import <file>` | Imports file with deduplication and `__` symbol mangling |
| `.m` | **Recognized but stripped** (returns empty string) |
| `.ff` | **Recognized but stripped** (returns empty string) |
| `.ffp` | **Recognized but stripped** (returns empty string) |

## Missing Features in Go

### Critical Missing Features

1. **`.m` Macro Execution** ([`typescript/core/src/preprocess.ts:84-86`](typescript/core/src/preprocess.ts:84-86))
   - TypeScript: Compiles and executes code via Engine, outputs stack values
   - Go: Returns empty string (line 129-130 in [`go/src/preprocess/preprocess.go`](go/src/preprocess/preprocess.go:126-130))
   - Impact: Breaks any `.ffp` file using inline macro computation

2. **`.ff` Macro Execution** ([`typescript/core/src/preprocess.ts:87-89`](typescript/core/src/preprocess.ts:87-89))
   - TypeScript: Same as `.m`
   - Go: Returns empty string
   - Impact: Same as `.m`

3. **`.ffp` Macro Execution with Prelude Check** ([`typescript/core/src/preprocess.ts:90-97`](typescript/core/src/preprocess.ts:90-97))
   - TypeScript: Same as `.m` but checks `macroPreludeReady` flag
   - Go: Returns empty string without prelude check
   - Impact: Files using `.ffp` expecting prelude fail silently

4. **Macro Engine Bootstrap** ([`typescript/core/src/preprocess.ts:125-146`](typescript/core/src/preprocess.ts:125-146))
   - TypeScript: Supports `bootstrapMacroEngine()` with isolated child preprocessor
   - Go: No equivalent functionality
   - Impact: Cannot load macro prelude files

5. **Macro Execution Infrastructure** ([`typescript/core/src/preprocess.ts:148-157`](typescript/core/src/preprocess.ts:148-157))
   - TypeScript: `runMacro()` method compiles code, runs engine, formats output
   - Go: No equivalent functionality
   - Impact: Cannot execute any macro code

### Secondary Issues

6. **`preserveCompilerDirectives` Handling** ([`go/src/preprocess/preprocess.go:121-136`](go/src/preprocess/preprocess.go:121-136))
   - Current implementation returns empty string for unknown directives when `preserveCompilerDirectives=false`
   - Should this preserve for compiler? The flag is passed but not fully utilized.

## Examples of Broken Functionality

### Example 1: Simple Macro (from [`ff/macros.ffp`](ff/macros.ffp:3-13))

```ffp
.m --: 1 - ;
.m 10 fact -1 *
```

**TypeScript output:** Compiles `--` macro, computes `10 fact -1 *` at preprocess time
**Go output:** Empty lines (macros stripped, no execution)

### Example 2: Precomputation (from [`ff/cbrt.ffp`](ff/cbrt.ffp:19))

```ffp
.m 999983 3 ^
```

**TypeScript output:** `99497011980594339432988984933376510154541822462955989002914226477142868292840988 /* .m 999983 3 ^ */`
**Go output:** Empty line

### Example 3: Inline Constants (from [`ff/pow.ffp`](ff/pow.ffp:4))

```ffp
.m 10 10 ^
```

**TypeScript output:** `10000000000 /* .m 10 10 ^ */`
**Go output:** Empty line

## Implementation Plan

### Phase 1: Core Macro Execution Infrastructure

1. **Add macro execution support to Go preprocessor**
   - Create `runMacro(code string, sourceLine string) string` method
   - Integrate with existing [`go/src/compiler`](go/src/compiler) package
   - Integrate with existing [`go/src/engine`](go/src/engine) package
   - Format output as: `<stack values> /* <source line> */`

2. **Implement `.m` directive handling**
   - Replace empty return with macro execution
   - Pass macro code to `runMacro()`

3. **Implement `.ff` directive handling**
   - Same as `.m`

### Phase 2: Prelude Support

4. **Add macro prelude bootstrap mechanism**
   - Add `macroPreludeReady` boolean flag to Processor struct
   - Add `bootstrapMacroEngine(filename string)` method
   - Support `macroEngineBootstrapFile` option in constructor

5. **Implement `.ffp` directive with prelude check**
   - Check `macroPreludeReady` flag before execution
   - Return error if prelude not ready
   - Execute macro if ready

### Phase 3: Integration

6. **Update CLI commands**
   - [`go/cmd/preprocess/preprocess.go`](go/cmd/preprocess/preprocess.go): Add `--macro-prelude` flag
   - [`go/cmd/run/run.go`](go/cmd/run/run.go): Wire up macro prelude bootstrap

7. **Ensure proper isolation**
   - Macro execution should not pollute import state
   - Use child preprocessor pattern like TypeScript
   - Engine state should be cleared after macro execution

### Phase 4: Testing

8. **Create test cases**
   - Simple macro: `.m 2 3 +` → `5`
   - Macro with definition: `.m square: dup * ; 5 square` → `25`
   - Multiple values: `.m 1 2 3` → `1 2 3`
   - `.ff` alias works same as `.m`
   - `.ffp` fails without prelude, works with prelude

9. **Validate existing `.ffp` files**
   - [`ff/macros.ffp`](ff/macros.ffp)
   - [`ff/cbrt.ffp`](ff/cbrt.ffp)
   - [`ff/pow.ffp`](ff/pow.ffp)
   - [`ff/time.ffp`](ff/time.ffp)
   - [`ff/euler/*.ffp`](ff/euler/) files

10. **Run full test suite**
    - `cd go && mise exec -- chomp test`
    - Compare output with TypeScript implementation

## Implementation Notes

### TypeScript `runMacro` Reference Implementation

From [`typescript/core/src/preprocess.ts:148-157`](typescript/core/src/preprocess.ts:148-157):

```typescript
private runMacro(macroCode: string, sourceLine: string) {
  const ir = this.compiler.compileToIR(
    Compiler.tokenize(macroCode),
  );
  this.engine.loadIR(ir);
  this.engine.run();
  const stack = this.engine.getStack();
  this.engine.clear();
  return stack.map(String).join(" ") + ` /* ${sourceLine} */`;
}
```

### Go Equivalent Skeleton

```go
func (p *Processor) runMacro(macroCode string, sourceLine string) string {
  tokens := compiler.Tokenize(macroCode)
  ir := compiler.CompileToIR(tokens, "")
  bigInts := compiler.CompileToBigIntArray(ir)
  
  // Need to run and capture stack
  // engine.Run(bigInts) - but this prints stack, need variant that returns it
  
  // Format: "<values> /* <sourceLine> */"
}
```

### Key Challenge: Engine Integration

The Go [`engine.Run()`](go/src/engine/engine.go) function currently:
1. Executes bytecode
2. Prints the final stack to stdout

For macro execution, we need:
1. Execute bytecode
2. Return the stack values (without printing)
3. Clear engine state

May need to add `engine.RunAndGetStack()` or modify existing function.

## Success Criteria

- [ ] `.m 2 3 +` outputs `5 /* .m 2 3 + */`
- [ ] `.ff 2 3 +` outputs same as `.m`
- [ ] `.ffp` works after prelude bootstrap
- [ ] [`ff/macros.ffp`](ff/macros.ffp) produces same output as TypeScript
- [ ] [`ff/cbrt.ffp`](ff/cbrt.ffp) preprocesses correctly
- [ ] All existing Go tests pass
- [ ] New macro-specific tests added and passing

## Future Considerations

- Error handling: TypeScript throws on `.ffp` without prelude; Go should match
- Performance: Macro execution at preprocess time may be slow for complex computations
- Stack overflow: Deeply nested macro calls need protection
- Debug output: Consider adding `--trace-preprocessor` flag for debugging macro execution
