---
status: ready
status_date: 2026-03-22
creator: kilo-auto/balanced
---

# Plan: Static Code Analysis for f-flat-minor

## Summary
Add a static code analysis pass that operates on the IR (Intermediate Representation) before bytecode generation, using the existing `pointer` metadata to detect type errors like calling `eval` on a literal number instead of a pointer to code.

## Context

The TypeScript compiler (`typescript/core/src/compiler.ts`) generates IR with metadata including `pointer: boolean` indicating whether a pushed value is a code pointer or a numeric literal. This metadata is currently lost during bytecode encoding (`compileToBase64`).

The language has a clear distinction between:
- **Literals** (big integers, data)
- **Pointers** (quotations, references to code that can be evaluated)

Certain words expect pointers, notably `eval` which executes a quotation. Calling `eval` on a literal is always an error but currently only caught at runtime.

Stack effect comments exist in source (e.g., `/* n sqr == n^2 */`) but are not parsed or verified.

## Approach

### Phase 1: IR-Level Type Analysis (MVP)

Add an analysis pass that runs on the IR before `compileToBase64()`.

**File:** `typescript/core/src/analyzer.ts` (new)

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
Create a map in `typescript/core/src/word-signatures.ts`:
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
  filename?: string;
  line?: number;
  column?: number;
}
```

**Integration point:**
In `compiler.ts`, add optional analysis before bytecode generation:
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
2. **Non-breaking addition** — analysis is opt-in via flag, doesn't change bytecode
3. **Pointer vs Literal is the primary type distinction** — this matches the existing metadata
4. **Word signatures are explicit, not inferred** — for system words, hardcode signatures; user words can be annotated

## Open questions

None — ready to implement.

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
- `typescript/core/src/compiler.ts:46-54` — where metadata is lost in `compileToBase64()`
- `_docs/stack-notation.md` — stack effect comment syntax (for future Phase 2)
