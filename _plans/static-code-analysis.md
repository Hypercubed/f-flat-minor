---
status: in-progress
status_date: 2026-04-10
creator: kilo-auto/balanced
---

# Plan: Static Code Analysis for f-flat-minor

## Summary
Static code analysis has partially landed via the TypeScript compile-service pipeline, where an IR-based analyzer uses `pointer` metadata to detect invalid calls such as `10 eval`. The remaining work is to integrate equivalent analysis into the compiler-level `typescript/core` flow so diagnostics are available outside the compile-service wrapper.

## Implementation Status

- Landed: IR-level analysis exists in `typescript/compile-service/src/analyzer.ts` with explicit signatures in `typescript/compile-service/src/word-signatures.ts`.
- Landed: `typescript/compile-service/src/compile-service.ts` runs the analyzer after IR generation and returns diagnostics alongside definitions, source maps, tokens, and IR.
- Landed: `deno/src/compile_service_test.ts` covers the static-analysis diagnostic path with a `10 eval` failure case.
- Not landed: the original compiler-level integration in `typescript/core/src/*` did not happen; `typescript/core/src/compiler.ts` still compiles without invoking static analysis.
- Deferred but still relevant: broader signature coverage, stack-effect verification, and any compiler-facing opt-in or reporting UX.

## Context

The TypeScript core compiler (`typescript/core/src/compiler.ts`) generates IR with metadata including `pointer: boolean` indicating whether a pushed value is a code pointer or a numeric literal. That metadata is still lost during bytecode encoding (`compileToBase64`), so analysis must run before bytecode generation.

The first implementation landed one layer above the core compiler, inside the compile-service package. That package already owns source-token spans, source maps, definition extraction, and diagnostic return values, so it became the initial integration point for IR analysis.

The language has a clear distinction between:
- **Literals** (big integers, data)
- **Pointers** (quotations, references to code that can be evaluated)

Certain words expect pointers, notably `eval` which executes a quotation. Calling `eval` on a literal is always an error but currently only caught at runtime.

Stack effect comments exist in source (e.g., `/* n sqr == n^2 */`) but are not parsed or verified.

## Approach

### Phase 1: IR-Level Type Analysis (MVP)

Status: partially implemented in compile-service; still missing compiler-level integration.

**Implemented files:**
- `typescript/compile-service/src/analyzer.ts`
- `typescript/compile-service/src/word-signatures.ts`
- `typescript/compile-service/src/compile-service.ts`

**Still-missing core integration target:**
- `typescript/core/src/compiler.ts`

**Abstract value type:**
```typescript
type AbstractValue = 
  | { type: 'literal', value: bigint }
  | { type: 'pointer', source?: string }
  | { type: 'unknown' };
```

**Analysis algorithm:**
1. Initialize empty abstract stack
2. For each IR instruction:
   - `push` with `meta.pointer: true` → push `{ type: 'pointer' }`
   - `push` with `meta.pointer: false` (or undefined) → push `{ type: 'literal', value }`
   - `call` → look up word's expected input types
     - If word expects pointer but stack has literal → ERROR
     - Pop inputs, push outputs (per word signature)

**Word type signatures:**
The current implementation keeps signatures in `typescript/compile-service/src/word-signatures.ts`:
```typescript
export const WORD_SIGNATURES: Record<string, {
  inputs: AbstractValue['type'][]
  outputs: AbstractValue['type'][]
}> = {
  'eval': { inputs: ['pointer'], outputs: [] },
  '+': { inputs: ['literal', 'literal'], outputs: ['literal'] },
  // etc.
}
```

**Error reporting:**
```typescript
interface Diagnostic {
  severity: 'error' | 'warning';
  message: string;
   range: SourceRange;
}
```

**Current integration point:**
In `typescript/compile-service/src/compile-service.ts`, analysis already runs after IR generation:
```typescript
const compiler = new Compiler();
const ir = compiler.compileToIR(tokens, uri);
const diagnostics = analyzeIr(ir);
```

**Planned compiler-level integration:**
`typescript/core/src/compiler.ts` still needs an analysis hook before bytecode generation so callers that do not use compile-service can also receive diagnostics:
```typescript
static compile(ir: IrInstruction[], options?: { analyze?: boolean }): string {
  if (options?.analyze) {
    const diagnostics = Analyzer.analyze(ir);
    reportDiagnostics(diagnostics);
  }
  return this.compileToBase64(ir);
}
```

### Phase 2: Stack Effect Verification (Future)

Parse stack effect comments and verify they match computed effects from analysis. This is lower priority as it requires more infrastructure (parsing stack effect notation).

## Decisions already made

1. **Analysis runs on IR, not source** — IR has the metadata we need
2. **Non-breaking addition** — current compile-service diagnostics do not change emitted bytecode; compiler-level integration should preserve that property
3. **Pointer vs Literal is the primary type distinction** — this matches the existing metadata
4. **Word signatures are explicit, not inferred** — for system words, hardcode signatures; user words can be annotated
5. **Compile-service was the first landing zone** — source ranges and diagnostics are already modeled there, even though the original plan targeted `typescript/core`

## Open questions

- How should compiler-level analysis be exposed in `typescript/core`: return diagnostics, throw on errors, or support both modes?
- Should `word-signatures.ts` remain owned by compile-service or move into a shared TypeScript package once core integration lands?

## Out of scope

- Full dependent type system
- Proving correctness of arbitrary quotations
- Changing bytecode format to preserve metadata
- Runtime type checking (this is static analysis only)
- Parsing stack effect comments (Phase 2 is deferred)
- Optimizations based on analysis results

## Dependencies

- None

## References

- `typescript/core/src/ir.ts` — IR structure with metadata
- `typescript/core/src/compiler.ts` — core compiler path that still lacks analyzer integration
- `typescript/compile-service/src/analyzer.ts` — current IR analyzer implementation
- `typescript/compile-service/src/word-signatures.ts` — current explicit word signatures
- `typescript/compile-service/src/compile-service.ts` — current analysis integration point
- `deno/src/compile_service_test.ts` — regression coverage for `10 eval`
- `_docs/supplemental/stack-notation.md` — stack effect comment syntax (for future Phase 2)
