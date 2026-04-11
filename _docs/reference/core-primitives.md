---
title: Core primitives
summary: VM primitive words, opcode table, stack effects, and runtime implementation coverage.
order: 20
---

# Core primitives reference

This page lists the **VM primitive words**.

## Core primitives

| Syntax | Mnemonic | Opcode | Stack effect | Description |
|--------|----------|--------|--------------|-------------|
| `nop` | `NOP` | `0` | `... nop == ...` | No operation; does nothing. |
| `eval` | `EVAL` | `1` | `[A] eval == a*` | Evaluates a quotation, executing its contents. |
| `putc` | `PUTC` | `2` | `n putc == {prints char(n)}` | Prints a character given by its numeric code. |
| `getc` | `GETC` | `3` | `getc == n {reads char}` | Reads a single character from input and pushes its code. |
| `putn` | `PUTN` | `5` | `n putn == {prints n}` | Prints a number to output. |
| `clock` | `CLOCK` | `6` | `clock == n {reads clock}` | Returns the current time as a Unix timestamp. |
| `drop` | `DROP` | `8` | `a drop ==` | Removes the top value from the stack. |
| `q<` | `PUSHR` | `14` | `a q< == | ...a` | Pushes a value onto the return stack. |
| `q>` | `PULLR` | `15` | `q> == a | a...` | Pops a value from the return stack onto the main stack. |
| `<<` | `SHIFTL` | `16` | `a b << == n` | Left-shifts `a` by `b` bits. |
| `>>` | `SHIFTR` | `17` | `a b >> == n` | Right-shifts `a` by `b` bits. |
| `clr` | `CLR` | `24` | `... clr ==` | Clears the entire stack. |
| `rand` | `RAND` | `26` | `n rand == r {0 <= r < n}` | Generates a random number between `0` and `n-1`. |
| `exit` | `EXIT` | `27` | `n exit == {exits with code n}` | Exits the program with the given exit code. |
| `dup` | `DUP` | `33` | `a dup == a a` | Duplicates the top value on the stack. |
| `depth` | `DEPTH` | `35` | `... depth == ... n` | Pushes the current stack depth. |
| `swap` | `SWAP` | `36` | `a b swap == b a` | Swaps the top two values on the stack. |
| `%` | `MOD` | `37` | `a b % == n` | Computes the remainder of `a` divided by `b`. |
| `&` | `AND` | `38` | `a b & == n` | Bitwise AND of `a` and `b`. |
| `(` | `STASH` | `40` | `... ( == {moves stack to queue}` | Moves values from the stack to the queue. |
| `)` | `FETCH` | `41` | `) == ... {restores stack from queue}` | Moves values from the queue back to the stack. |
| `*` | `MUL` | `42` | `a b * == n` | Multiplies `a` by `b`. |
| `+` | `ADD` | `43` | `a b + == n` | Adds `a` and `b` together. |
| `cons` | `CONS` | `44` | `x y cons == q` | Builds an anonymous quotation from two stack values. |
| `-` | `SUB` | `45` | `a b - == n` | Subtracts `b` from `a`. |
| `.` | `DUMP` | `46` | `... . == ... {prints stack}` | Prints the entire stack to output. |
| `/` | `DIV` | `47` | `a b / == n` | Divides `a` by `b` using integer division. |
| `:` | `MARK` | `58` | `n : == {begin definition(n)}` | Begins a new word definition with name `n`. |
| `;` | `DEF` | `59` | `; == {end definition}` | Ends the current word definition. |
| `<` | `LT` | `60` | `a b < == flag` | Pushes true if `a` is less than `b`. |
| `=` | `EQ` | `61` | `a b = == flag` | Pushes true if `a` equals `b`. |
| `>` | `GT` | `62` | `a b > == flag` | Pushes true if `a` is greater than `b`. |
| `?` | `WHEN` | `63` | `flag [A] ? == a*` | Executes the quotation if `flag` is true. |
| `[` | `BRA` | `91` | `[ == {begin quotation}` | Begins a quotation (anonymous code block). |
| `]` | `KET` | `93` | `] == [A] {end quotation}` | Ends a quotation and pushes it to the stack. |
| `^` | `POW` | `94` | `a b ^ == n` | Computes `a` raised to the power of `b`. |
| `|` | `OR` | `124` | `a b | == n` | Bitwise OR of `a` and `b`. |
| `~` | `NOT` | `126` | `a ~ == n'` | Bitwise NOT of `a`. |

---

## Alphabetical entries

### `(` (STASH)

**Stack:** `… ( == {moves stack to queue}` (see `_docs/supplemental/stack-notation.md` for queue notation).

**Implements:** TypeScript, Go, Python, Ruby — **Yes**. Racket — **No** (commented out in `racket/private/engine.rkt`).

---

### `)` (FETCH)

**Stack:** `) == … {restores stack from queue}`.

**Implements:** TypeScript, Go, Python, Ruby — **Yes**. Racket — **No**.

---

### `+` (ADD)

**Stack:** `a b + == n`.

**Implements:** All listed runtimes — **Yes**.

---

### `cons` (CONS / `,`)

**Stack:** `x y cons == q` — builds an anonymous quotation from two stack values (see `_docs/core-vocabulary.md`).

**Implements:** TypeScript, Go, Python, Ruby, Racket — **Yes** (Racket: `op_cons`). In source, use the word **`cons`**; the underlying opcode is **44** (comma).

---

### `-` (SUB)

**Stack:** `a b - == n`.

**Implements:** All listed runtimes — **Yes**.

---

### `.` (DUMP / PRN)

**Stack:** `… . == … {prints stack}`.

**Implements:** All listed runtimes — **Yes**.

---

### `/` (DIV)

**Stack:** `a b / == trunc(a/b)` (truncation toward zero in the spec; see division note above).

**Implements:** All listed runtimes — **Yes**.

---

### `:` (MARK)

**Stack:** `n : == {begin definition(n)}`.

**Implements:** All listed runtimes — **Yes**.

---

### `;` (DEF)

**Stack:** `; == {end definition}`.

**Implements:** TypeScript, Go, Racket — **Yes**. Python and Ruby — **No** (no `defineSystem(';', …)` / no `systemWords` entry; user definitions are not closed the same way as in the full VM).

---

### `<` `=` `>` (LT / EQ / GT)

**Stack:** `a b < == flag`, `a b = == flag`, `a b > == flag`.

**Implements:** All listed runtimes — **Yes**.

---

### `?` (WHEN / IF)

**Stack:** `flag [A] ? == a*`.

**Implements:** All listed runtimes — **Yes**.

---

### `[` `]` (BRA / KET)

**Stack:** `[ == {begin quotation}`, `] == [A] {end quotation}`.

**Implements:** TypeScript, Go, Racket — **Yes** (dedicated opcodes). Python, Ruby — **Lexer** (quotations are collected in `run()` / `run` without registering `[`/`]` as system ops).

---

### `^` (POW)

**Stack:** `a b ^ == n`.

**Implements:** All listed runtimes — **Yes**.

---

### `<<` / `>>` (SHIFTL / SHIFTR)

**Stack:** `a b << == n`, `a b >> == n`.

**Implements:** All listed runtimes — **Yes**.

---

### `clr`

**Stack:** `… clr ==`.

**Implements:** All listed runtimes — **Yes**.

---

### `clock`

**Stack:** `clock == n {reads clock}`.

**Implements:** TypeScript, Go, Python, Ruby — **Yes**. Racket — **No** (`;;; clock` in `racket/private/engine.rkt`).

---

### `depth`

**Stack:** `… depth == … n`.

**Implements:** All listed runtimes — **Yes**.

---

### `drop`

**Stack:** `a drop ==`.

**Implements:** All listed runtimes — **Yes**.

---

### `dup`

**Stack:** `a dup == a a`.

**Implements:** All listed runtimes — **Yes**.

---

### `eval`

**Stack:** `[A] eval == a*`.

**Implements:** All listed runtimes — **Yes**.

---

### `exit`

**Stack:** `n exit == {exits with code n}`.

**Implements:** TypeScript, Go — **Yes**. Python, Ruby, Racket — **No**.

---

### `getc`

**Stack:** `getc == n {reads char}`.

**Implements:** TypeScript, Go — **Yes**. Python, Ruby, Racket — **No** (commented / omitted in `python/execute.py`, `ruby/execute.rb`, `racket/private/engine.rkt`).

---

### `nop`

**Stack:** `… nop == …`.

**Implements:** All listed runtimes — **Yes**.

---

### `putc`

**Stack:** `n putc == {prints char(n)}`.

**Implements:** All listed runtimes — **Yes**.

---

### `putn`

**Stack:** `n putn == {prints n}`.

**Implements:** All listed runtimes — **Yes**.

---

### `q<` / `q>` (PUSHR / PULLR)

**Stack:** `a q< == \| …a`, `q> == a \| a…`.

**Implements:** All listed runtimes — **Yes**.

---

### `rand`

**Stack:** `n rand == r {0 <= r < n}`.

**Implements:** All listed runtimes — **Yes**.

---

### `swap`

**Stack:** `a b swap == b a`.

**Implements:** All listed runtimes — **Yes**.

---

### `%` (MOD)

**Stack:** `a b % == r` (see division note).

**Implements:** All listed runtimes — **Yes**.

---

### `&` (AND)

**Stack:** `a b & == n`.

**Implements:** All listed runtimes — **Yes**.

---

### `*` (MUL)

**Stack:** `a b * == n`.

**Implements:** All listed runtimes — **Yes**.

---

### `|` (OR)

**Stack:** `a b | == n`.

**Implements:** All listed runtimes — **Yes**.

---

### `~` (NOT)

**Stack:** `a ~ == n'`.

**Implements:** All listed runtimes — **Yes**.
