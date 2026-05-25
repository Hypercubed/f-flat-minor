## Context

f-flat-minor compiles preprocessed source code to variable-length quantity (VLQ) base64 bytecode payloads (`.ffb`). Standard compiler optimizations (like constant folding, algebraic simplification, and strength reduction) are currently hardcoded in the Deno TypeScript implementation. Duplicating these rules across Go, Racket, and future C++ compiler runtimes leads to severe duplication, maintenance overhead, and risk of divergence.

The `.rewrite` compiler directive enables **library-driven, declarative optimizations**. Rather than hardcoding rewrites into each compiler's source code, authors declare rules in standard F♭m source files, and compilers dynamically load, match, and evaluate them.

---

## Goals / Non-Goals

**Goals:**
*   Eliminate duplicate optimization codebases by providing a unified, declarative rule syntax using `.rewrite`.
*   Establish a highly portable matching algorithm that any host compiler can implement with minimal code.
*   Leverage each compiler's existing VM to perform arbitrary-precision constant folding at compile-time, eliminating the need to write separate expression evaluators.

**Non-Goals:**
*   Developing a new compile-time macro language; the system relies strictly on standard F♭m syntax and VM execution.
*   Moving structural or graph-based optimization passes (such as recursive subroutine inlining or dead-code elimination) into rewrite rules; these remain native compiler passes.

---

## Decisions

### Decision 1: Direct VM-Assisted Replacement Execution
To evaluate the replacement quotation of a matched rewrite rule, the compiler SHALL spin up a lightweight, isolated instance of its own F♭m Virtual Machine at compile-time:
*   **How it works:** Wildcard variables matched in the pattern are bound to their runtime literal values. Prior to executing the replacement, the compiler pushes these bound literals to the VM stack, loads the replacement quotation, and runs the VM. The resultant stack values are harvested as the optimized IR output.
*   **Rationale:** Reuses the existing arbitrary-precision VM (`ff.cpp` / `engine.ts`) to handle all mathematical and logical evaluations. We write **zero** math expression parsers or evaluators inside the compiler.
*   **Alternatives Considered:** Writing a custom mathematical expression evaluator in the compiler. Rejected because it duplicates the VM's existing math code and fails to support arbitrary precision out-of-the-box.

### Decision 2: Wildcard Identifiers via Symbol Pattern Prefix
Wildcards in rewrite patterns are designated by any standard F♭m word identifier that begins with a leading underscore (e.g. `_a`, `_b`, `_c`).
*   **How it works:** When parsing `.rewrite` pattern quotations, any symbol starting with `_` is registered as a wildcard placeholder rather than a static word call.
*   **Rationale:** Under F♭m rules, word identifiers are arbitrary strings. An identifier starting with `_` is already parsed perfectly by the existing tokenizer and lexer as a standard symbol. This avoids **any** changes to the lexer or parser grammar.
*   **Alternatives Considered:** Designing a new wildcard token format (e.g., `?a`, `$a`). Rejected because it requires altering the parser grammar and lexer rules across all implementation runtimes.

### Decision 3: Phase-Ordering & Definition-Level Optimization
To prevent automatic inlining from prematurely expanding high-level subroutine calls and destroying match patterns (e.g. expanding `sq` to `dup *` before a `.rewrite [ _a sq ]` rule can match), the compiler SHALL execute optimization and rewrite rules directly on individual subroutine definitions inside the symbol definition dictionary (`defs` map) prior to inlining them.
*   **How it works:** Before executing the `inlineWords` pass, the compiler runs a complete rewrite/optimization pass over each independent subroutine definition. Only after these definitions have been fully optimized are they inlined into parent subroutines or the main program stream.
*   **Rationale:** Resolves the compiler phase-ordering problem elegantly. It guarantees that high-level rewrite patterns are matched and folded inside subroutines, while keeping compiler state tracking minimal.
*   **Alternatives Considered:** Refusing to inline rewrite target words until post-optimization (Solution B). Rejected because it adds complex state tracking to the inliner and requires a separate post-optimization cleanup inlining pass.

### Decision 4: Multi-Quotation Guard Syntax (The "Where" Clause) - **Phase B (Deferred)**
To handle conditional matches without syntactic ambiguity (e.g. distinguishing a literal quotation in a pattern from a wildcard's condition), the `.rewrite` compiler directive SHALL eventually support a **3-quotation syntax**: `.rewrite [pattern] [replacement] [guard]` in Phase B.
*   **How it works:** The first quotation specifies the structural pattern. The second quotation specifies the replacement code generator. The optional third quotation specifies a guard expression. The compile-time VM evaluates this guard with all matched wildcards pushed to the stack. If it returns `0` (false), the match is aborted.
*   **Rationale:** Avoids all syntax clashes and leaves F♭m's core tokenizer and lexer 100% unaltered.


### Decision 5: Shared Compilation VM Definitions (User-Land Word Scopes)
To enable compile-time evaluation of user-defined words (such as recursive `log2` helper words) inside guard and replacement quotations, the host compiler SHALL share its active symbol definition map (`defs` map) with the compile-time mini-VM instance.
*   **How it works:** Prior to running a guard or replacement quotation, the compiler shares its active subroutine definition dictionary reference with the mini-VM's internal `defs` lookup table.
*   **Rationale:** Gives the compile-time VM instant, zero-cost access to all libraries (like `core.ff`) and user definitions currently in scope.

---

## Risks / Trade-offs

*   **[Risk] Infinite Loop of Recursive Rewrite Rules**
    *   *Mitigation:* The optimizer pipeline is bounded to a maximum of 20 passes. If a circular rewrite pattern is registered (e.g., `rule A -> B` and `rule B -> A`), the compiler halts optimization safely once the pass limit is hit.
*   **[Risk] Side Effects in Compile-Time VM Runs**
    *   *Mitigation:* F♭m is side-effect free except for system words like `putc`, `getc`, and `exit`. The compiler's mini-VM instance strictly restricts execution of system opcodes during macro/rewrite runs (raising an error if a rewrite rule attempts to read stdin or exit the process).
