## Why

Currently, optimization rules in f-flat-minor (F♭m) are hardcoded into specific runtime compilers (such as the TypeScript optimizer in `typescript/core/src/optimizer.ts`). When porting the language to new environments (like C++ or Go), developers are forced to manually duplicate dozens of constant folding, algebraic simplification, and strength reduction rules. This duplication is highly error-prone, hard to maintain, and leads to semantic divergence across language implementations.

To solve this, we are introducing the `.rewrite` compiler directive in the _F♭m⁺_ specification. This directive allows library authors to declare optimization rules directly inside the library source code (such as `<core.ff>`). When a compiler imports a library, it dynamically registers these rewrite rules and evaluates them during compile-time optimization.

This design draws inspiration from significant prior art in language optimization systems:
*   **GHC (Glasgow Haskell Compiler) RULES Pragma:** Haskell libraries declare term-rewriting rules directly in source code (e.g., fusion rules like `map f (map g xs) = map (f . g) xs`), which GHC applies during its optimization passes.
*   **Common Lisp Macros:** Executes user-defined code during macro-expansion to dynamically substitute expressions.
*   **Forth Immediate Words:** Executes stack code during compilation to dynamically build and rewrite target code.

## What Changes

*   **Compiler Directives:** Adds `.rewrite` as a standard compiler directive in the _F♭m⁺_ specification.
*   **IR Representation:** Adds support for wildcard tokens (such as symbol names starting with an underscore: `_a`, `_b`) to act as pattern match variables.
*   **Optimizer Flow:** Integrates pattern matching and evaluation into the compiler's post-parsing optimization pipeline.
*   **Documentation:** Updates specifications and manuals to document the syntax and behavioral expectations of the `.rewrite` directive.

## Capabilities

### New Capabilities
- `rewrite-compiler-directive`: Defines the syntax, parser semantics, wildcard binding model, and VM-assisted evaluation flow for the new `.rewrite` compiler command.
- `compiler-optimizations`: Standardizes the compiler optimizations pipeline, integrating dynamic `.rewrite` rule execution alongside hardcoded optimization passes.

### Modified Capabilities
<!-- Existing capabilities whose REQUIREMENTS are changing (not just implementation).
     Only list here if spec-level behavior changes. Each needs a delta spec file.
     Use existing spec names from openspec/specs/. Leave empty if no requirement changes. -->

## Impact

*   **Affected Code:** Preprocessors and compilers across all runtimes (Deno, Node, Bun, Go, Racket, and future C++ toolchains) that implement _F♭m⁺_.
*   **APIs & CLI:** The `ff compile` command will dynamically register and run rewrites during compilation.
*   **Libraries:** Core standard libraries (specifically `ff/lib/core.ff`) will be updated to ship algebraic and simplification rules alongside their word definitions.
