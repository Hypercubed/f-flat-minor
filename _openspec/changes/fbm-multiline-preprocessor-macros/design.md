## Context

f-flat-minor's preprocessor (`preprocess.ts`) currently processes `.ffp` source files line-by-line using a standard array mapping loop. If a line starts with `.m`, `.ff`, or `.ffp`, it evaluates the macro on that single line in an isolated VM instance and replaces the line with the stack outputs. 

To support multiline macros without introducing syntax clashes (like trailing backslash continuation characters which collide with F♭m's identifier rules), we are implementing **consecutive-line preprocessor macro merging**. By automatically accumulating and executing adjacent macro lines together, we achieve full multiline macro capabilities while preserving the line-based design of the preprocessor.

---

## Goals / Non-Goals

**Goals:**
*   Implement clean, highly readable multiline macro capabilities by automatically merging adjacent `.m`, `.ff`, or `.ffp` lines.
*   Retain 100% backward compatibility: single-line macros behave exactly the same way.
*   Enforce a zero-syntax-clutter design that avoids adding escape characters or new token delimiters.

**Non-Goals:**
*   Altering the token-based compiler parser; this is strictly an enhancement to the line-based preprocessor phase.
*   Mixing different preprocessor directives (e.g., a `.m` line followed by a `.ffp` line will not be merged).

---

## Decisions

### Decision 1: Iterative Lookahead Line Scanning
Instead of processing each line independently via `lines.map(...)`, the preprocessor SHALL utilize an iterative loop (e.g., a `while` loop) over the array of source lines:
*   **How it works:** When the preprocessor encounters a line starting with `.m`, `.ff`, or `.ffp`, it initiates a lookahead scan to consume all consecutive adjacent lines that start with the **exact same** directive.
*   **Code Generation:** The contents of these consecutive lines are joined with `\n` to form a single multi-line macro block, which is executed as a single compile-time VM run. The entire block of source lines is replaced in the preprocessed output by the VM's stack outputs. The loop pointer is then advanced past the consumed block.
*   **Rationale:** Eliminates the need for any continuation characters (like `\`), avoiding syntax clashes with F♭m identifiers.
*   **Alternatives Considered:** Backslash line continuation (`\`). Rejected because `\` is a valid word name in F♭m, creating syntactic ambiguity.

### Decision 2: Direct-Type Matching Bounds
Consecutive macro lines SHALL only be merged if they share the exact same directive name.
*   **How it works:** A `.m` block cannot be merged with an adjacent `.ff` block. If the directive changes, the current block is immediately executed and closed.
*   **Rationale:** Keeps macro evaluation contexts clean and prevents accidental semantic blending between different macro engines (like `.ffp` prelude-enabled vs basic `.ff` runs).

---

## Risks / Trade-offs

*   **[Risk] Compile-Time VM Stack Contamination between Blocks**
    *   *Mitigation:* The preprocessor's compile-time VM strictly executes `this.engine.clear()` immediately after harvesting the stack outputs of each macro block, ensuring that stack pollution does not leak between adjacent macros.
