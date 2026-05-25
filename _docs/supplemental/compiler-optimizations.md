# Compiler Optimizations in f-flat-minor

This document provides a comprehensive technical reference for the optimization passes and peephole rewrite rules implemented in the f-flat-minor compiler (specifically in `typescript/core/src/optimizer.ts`). 

These optimizations are crucial for converting human-readable, highly structured source code into extremely compact and fast-executing bytecode (`.ffb`). Understanding these rules is a prerequisite for implementing optimization parity in other compiler runtimes (e.g. C++ or Go).

---

## 1. The Optimization Pipeline

The compiler's `Optimizer` executes in a loop (`optLoop()`) that runs repeatedly until the IR size stabilizes, or until the compiler reaches a maximum limit of **20 passes** (safeguarded by a minimum limit of **2 passes**):

```
                   [ High-Level IR (IrInstruction[]) ]
                                   │
                                   ▼
                 ┌───────────────────────────────────┐
                 │    Pass 1: Peephole Optimizer     │
                 └───────────────────────────────────┘
                                   │
                                   ▼
                 ┌───────────────────────────────────┐
                 │   Pass 2: Definition Extraction   │
                 └───────────────────────────────────┘
                                   │
                                   ▼
                 ┌───────────────────────────────────┐
                 │     Pass 3: Word Inlining         │
                 └───────────────────────────────────┘
                                   │
                    Has size shrunk? (Max 20 passes)
                                   ├─ Yes ──► Loop Again
                                   │
                                   ▼
                 ┌───────────────────────────────────┐
                 │   Pass 4: Dead Code Elimination   │
                 └───────────────────────────────────┘
                                   │
                                   ▼
                       [ Optimized Bytecode IR ]
```

### The Key Phases:
1.  **Peephole Optimization:** Scans the instruction stream linearly and matches fixed-width patterns to apply algebraic simplification, constant folding, strength reduction, and dead code removal.
2.  **Definition Extraction (`getDefs` and `pullDefs`):** Identifies named definitions (delimited by `:` and `;`) and anonymous definitions (quotations delimited by `[` and `]`), mapping their instruction vectors to unique definition IDs.
3.  **Automatic Word Inlining (`inlineWords`):** Automatically expands calls to definitions in-place if they are marked with `.inline` or if they contain **4 or fewer** instructions.
4.  **Dead Code Elimination (`addReferencedWords`):** Recursively traces all referenced definitions (both direct calls and pushed word-pointers) starting from the `main` program block, and discards all unused definitions.

---

## 2. Complete Peephole Rewrite Rules Reference

Every peephole rule consists of a sequence pattern (the target sequence of IR instructions) and a replacement logic. Below is the complete catalog of all 35 rules defined in the compiler.

### Dead Instruction Elimination & Null Sequences

These rules remove redundant, self-canceling, or useless operations to shrink bytecode size and reduce queue churn at runtime.

| Sequence Pattern | Replacement | Name / Description |
| :--- | :--- | :--- |
| `NOP` | `(none)` | Removes empty no-ops. |
| `SWAP SWAP` | `(none)` | Eliminates back-to-back swaps. |
| `DUP DROP` | `(none)` | Eliminates duplicate followed by immediate drop. |
| `PUSHR PULLR` | `(none)` | Eliminates queue-move roundtrips. |
| `CLOCK DROP` | `(none)` | Removes discarded timestamp fetches. |
| `RAND DROP` | `(none)` | Removes discarded random generations. |
| `DEPTH DROP` | `(none)` | Removes discarded stack depth checks. |
| `NOT NOT` | `(none)` | Eliminates double bitwise negations. |
| `0 eval` (Push `0` + `CALL`) | `(none)` | A call to literal 0 is a NOP. |
| `[literal] DROP` | `(none)` | Pushing a literal and immediately dropping it is a no-op. |

---

### Constant Folding

Evaluates mathematical, logical, and bitwise operations at compile-time when all operands are statically known literals.

| Sequence Pattern | Evaluated Replacement | Notes / Constraints |
| :--- | :--- | :--- |
| `a b ADD` | `a + b` | Native arbitrary-precision addition. |
| `a b SUB` | `a - b` | Native arbitrary-precision subtraction. |
| `a b MUL` | `a * b` | Native arbitrary-precision multiplication. |
| `a b DIV` | `a / b` | Folded only when `b != 0`. |
| `a b MOD` | `a % b` | Folded only when `b != 0`. |
| `a b SHIFTL` | `a << b` | Left bit-shift. |
| `a b SHIFTR` | `a >> b` | Right bit-shift. |
| `a b AND` | `a & b` | Bitwise AND. |
| `a b OR` | `a \| b` | Bitwise OR. |
| `a NOT` | `~a` | Bitwise NOT. |
| `a b LT` | `a < b ? 1 : 0` | Folded to boolean `1` or `0`. |
| `a b EQ` | `a == b ? 1 : 0` | Folded to boolean `1` or `0`. |
| `a b GT` | `a > b ? 1 : 0` | Folded to boolean `1` or `0`. |
| `a b POW` | `a ** b` | Folded only when `b >= 0`. |

---

### Algebraic Simplification

Simplifies expressions containing identities (e.g., identity elements of arithmetic operations) and swaps.

| Sequence Pattern | Simplified Replacement | Name / Description |
| :--- | :--- | :--- |
| `0 ADD` | `(none)` | Adding 0 is a no-op. |
| `swap ADD` | `ADD` | `x y swap +` is equivalent to `x y +`. |
| `0 SUB` | `(none)` | Subtracting 0 is a no-op. |
| `1 MUL` | `(none)` | Multiplying by 1 is a no-op. |
| `swap MUL` | `MUL` | Multiplication is commutative. |
| `swap AND` | `AND` | Bitwise AND is commutative. |
| `swap OR` | `OR` | Bitwise OR is commutative. |
| `swap EQ` | `EQ` | Equality comparison is commutative. |
| `0 OR` | `(none)` | Bitwise OR with 0 is an identity operation. |
| `0 SHIFTL` | `(none)` | Shifting by 0 is a no-op. |
| `0 SHIFTR` | `(none)` | Shifting by 0 is a no-op. |
| `1 POW` | `(none)` | Raising a number to power of 1 is a no-op. |
| `1 DIV` | `(none)` | Dividing by 1 is a no-op. |

---

### Strength Reduction

Converts computationally heavy operations into faster bitwise operations.

| Sequence Pattern | Replacement | Description |
| :--- | :--- | :--- |
| `[power_of_2] MUL` | `log2([power_of_2]) SHIFTL` | E.g., `x 8 MUL` simplifies to `x 3 <<`. |

> [!WARNING]
> **Soundness Constraints on Division/Modulo Strength Reduction:**
> Under f-flat-minor semantics (which matches ECMAScript BigInt semantics), arithmetic division `/` and modulo `%` utilize **truncating division** (truncating toward zero). Bitwise shifts `>>` and bitwise `&` utilize floor division.
> 
> *   `-1 / 2 == 0` (truncating), but `-1 >> 1 == -1` (floor).
> *   `-1 % 2 == -1` (truncating), but `-1 & 1 == 1` (floor).
> 
> Therefore, strength reduction for `DIV` or `MOD` by a power of 2 is **UNSOUND** for negative numbers. Unless sign analysis can statically prove that the dividend is strictly non-negative, the compiler must **never** optimize division or modulo by a power of 2 into bitwise operations. `MUL -> SHIFTL` remains 100% sound for all positive and negative integers.

---

### Flows-Of-Control & Conditionals

Optimizes jump conditions and turns indirect subroutine calls into direct calls.

*   **Indirect Call Optimization (`n EVAL`):**
    If a literal word pointer is pushed and immediately followed by a `CALL` (eval/evaluate opcode), it is folded into a direct static word call.
    *   Pattern: `[PushAny, Call(OpCodes.CALL)]`
    *   Replacement: `Call([value])`
*   **Unreachable Code (`0 &block IF`):**
    If a conditional check is statically known to be `0` (false), the branch execution is discarded.
    *   Pattern: `Push(0) [PushAny] Call(OpCodes.IF)`
    *   Replacement: `(none)` (both block pointer and `IF` call are removed).
*   **Forced Conditional Inlining (`!0 &block IF`):**
    If a conditional check is statically known to be non-zero (true), the block is executed unconditionally.
    *   Pattern: `PushNz [PushAny] Call(OpCodes.IF)`
    *   Replacement: `Call([block_pointer])` (directly evaluates the block, removing the condition and `IF`).

---

### Quotation & List Optimizations

Simplifies list formatting, converting quotations to simple pointer pushes where applicable.

*   **Empty List (`[ ]`):**
    Collapses empty brackets to a literal push of `0` marked as a word pointer, representing a null pointer.
    *   Pattern: `Call(OpCodes.BRA) Call(OpCodes.KET)`
    *   Replacement: `Push(0)` (metadata: `pointer = true`).
*   **Single-Word Quote (`[ word ]`):**
    If a quotation only contains a single static word call (and no brackets or definitions), it collapses the entire quotation into a simple push of that word pointer.
    *   Pattern: `Call(OpCodes.BRA) [SingleWordCall] Call(OpCodes.KET)`
    *   Replacement: `Push([word_id])` (metadata: `pointer = true`).

---

### Constant Propagation

*   **Duplicate Literal Push (`a DUP`):**
    If a literal is pushed and followed by `DUP`, the compiler duplicates the literal push in the instruction stream to avoid running a runtime `DUP` instruction.
    *   Pattern: `PushAny Call(OpCodes.DUP)`
    *   Replacement: `Push(a) Push(a)`

---

## 3. Definition Inlining System

Definition inlining replaces a subroutine call with the actual instructions of that subroutine, eliminating call stack overhead. 

The inliner (`inlineWords`) traverses the instruction stream and recursively expands eligible subroutine calls.

### Inlining Rules:
1.  **Strict Unsafe Guards:** Any user definition containing the `.unsafe` metadata flag (or any call utilizing `.unsafe` contexts) is **never** inlined.
2.  **Explicit Inlining:** Any call or definition marked with the `.inline` compiler directive is inlined regardless of size.
3.  **Heuristic Inlining:** Any user definition containing **4 or fewer** instructions is automatically inlined.
4.  **Recursion/Cycle Protection:** The inliner tracks previously expanded subroutines in a `seen` recursion stack. If a word call matches an ID currently in the `seen` stack, the inliner halts expansion on that branch to prevent infinite compiler recursion.

---

## 4. Dead Code Elimination (DCE)

Once optimization loops finish, the compiler strips out all unused subroutines via `addReferencedWords`.

### The DCE Algorithm:
1.  Initialize an empty `calledWords` set.
2.  Traverse the `main` instruction block. For every instruction:
    *   If it is a static subroutine `Call(word_id)`, add `word_id` to `calledWords`.
    *   If it is a pointer push `Push(word_id)` (with `pointer: true`), add `word_id` to `calledWords`.
3.  For each newly added `word_id` in `calledWords`, fetch its definition vector and recursively repeat the traversal to capture nested calls.
4.  Once tracing is complete, all definitions that do not exist in the final `calledWords` set are **completely stripped** from the final bytecode file. Only referenced user-defined subroutines are compiled into the `.ffb` output.
