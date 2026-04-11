# Core primitives reference

This page lists the **VM primitive words** documented in [`_docs/core-vocabulary.md`](../../_docs/core-vocabulary.md) (same set as [`_shared/core-vocabulary.json`](../../_shared/core-vocabulary.json)). It is hand-maintained; when you add a primitive, update the vocabulary doc, the shared JSON, and this file.

## How to read “implemented”

| Symbol | Meaning |
|--------|---------|
| **Yes** | The runtime exposes the word as a **system / primitive** operation (registered opcode or `defineSystem` / `systemWords` entry). |
| **Lexer** | **`[`** and **`]`** only: quotations are built by the **lexer / parser** in that runtime. There is no separate registered word named `[` or `]` (Python and Ruby). Behavior is still available. |
| **No** | Not wired as a primitive in that runtime (may be commented out or absent). |

**TypeScript** here means the shared core used by **Deno, Node, and Bun** (`typescript/core/src/opcodes.ts` → `systemWords`).

There is **no C implementation** in this repository; the matrix below covers only code that exists here.

## Division and modulo note

Integer `/` and `%` semantics for negative operands differ across runtimes. See the note at the bottom of [`_docs/core-vocabulary.md`](../../_docs/core-vocabulary.md).

---

## Summary by implementation

| Implementation | Full primitive set | Gaps (vs vocabulary) |
|----------------|-------------------|----------------------|
| **TypeScript** (Deno / Node / Bun) | Yes — all rows below are **Yes** | None |
| **Go** | Yes — all rows below are **Yes** | None |
| **Python** | Partial | Missing **`getc`**, **`exit`**, **`;`** (end definition). **`[`** / **`]`** via **Lexer** only. |
| **Ruby** | Partial | Missing **`getc`**, **`exit`**, **`;`**. **`[`** / **`]`** via **Lexer** only. |
| **Racket** | Partial | Missing **`getc`**, **`clock`**, **`exit`**, **`(`** (STASH), **`)`** (FETCH). |

---

## Per-word reference

Stack effects are quoted from `_docs/core-vocabulary.md` (ASCII forms; the doc table may use `|` for queue state).

### Coverage matrix

| Word | Opcode (dec) | Stack effect (summary) | TS | Go | Python | Ruby | Racket |
|------|-------------|-------------------------|:--:|:--:|:------:|:----:|:------:|
| `nop` | 0 | `… nop == …` | Yes | Yes | Yes | Yes | Yes |
| `eval` | 1 | `[A] eval == a*` | Yes | Yes | Yes | Yes | Yes |
| `putc` | 2 | `n putc == {prints char(n)}` | Yes | Yes | Yes | Yes | Yes |
| `getc` | 3 | `getc == n {reads char}` | Yes | Yes | No | No | No |
| `putn` | 5 | `n putn == {prints n}` | Yes | Yes | Yes | Yes | Yes |
| `clock` | 6 | `clock == n {reads clock}` | Yes | Yes | Yes | Yes | No |
| `drop` | 8 | `a drop ==` | Yes | Yes | Yes | Yes | Yes |
| `q<` | 14 | `a q< == \| …a` | Yes | Yes | Yes | Yes | Yes |
| `q>` | 15 | `q> == a \| a…` | Yes | Yes | Yes | Yes | Yes |
| `<<` | 16 | `a b << == n` | Yes | Yes | Yes | Yes | Yes |
| `>>` | 17 | `a b >> == n` | Yes | Yes | Yes | Yes | Yes |
| `clr` | 24 | `… clr ==` | Yes | Yes | Yes | Yes | Yes |
| `rand` | 26 | `n rand == r {0 <= r < n}` | Yes | Yes | Yes | Yes | Yes |
| `exit` | 27 | `n exit == {exits with code n}` | Yes | Yes | No | No | No |
| `dup` | 33 | `a dup == a a` | Yes | Yes | Yes | Yes | Yes |
| `depth` | 35 | `… depth == … n` | Yes | Yes | Yes | Yes | Yes |
| `swap` | 36 | `a b swap == b a` | Yes | Yes | Yes | Yes | Yes |
| `%` | 37 | `a b % == r` | Yes | Yes | Yes | Yes | Yes |
| `&` | 38 | `a b & == n` | Yes | Yes | Yes | Yes | Yes |
| `(` | 40 | `… ( == {moves stack to queue}` | Yes | Yes | Yes | Yes | No |
| `)` | 41 | `) == … {restores stack from queue}` | Yes | Yes | Yes | Yes | No |
| `*` | 42 | `a b * == n` | Yes | Yes | Yes | Yes | Yes |
| `+` | 43 | `a b + == n` | Yes | Yes | Yes | Yes | Yes |
| `cons` | 44 | `x y cons == q` | Yes | Yes | Yes | Yes | Yes |
| `-` | 45 | `a b - == n` | Yes | Yes | Yes | Yes | Yes |
| `.` | 46 | `… . == … {prints stack}` | Yes | Yes | Yes | Yes | Yes |
| `/` | 47 | `a b / == trunc(a/b)` | Yes | Yes | Yes | Yes | Yes |
| `:` | 58 | `n : == {begin definition(n)}` | Yes | Yes | Yes | Yes | Yes |
| `;` | 59 | `; == {end definition}` | Yes | Yes | No | No | Yes |
| `<` | 60 | `a b < == flag` | Yes | Yes | Yes | Yes | Yes |
| `=` | 61 | `a b = == flag` | Yes | Yes | Yes | Yes | Yes |
| `>` | 62 | `a b > == flag` | Yes | Yes | Yes | Yes | Yes |
| `?` | 63 | `flag [A] ? == a*` | Yes | Yes | Yes | Yes | Yes |
| `[` | 91 | `[ == {begin quotation}` | Yes | Yes | Lexer | Lexer | Yes |
| `]` | 93 | `] == [A] {end quotation}` | Yes | Yes | Lexer | Lexer | Yes |
| `^` | 94 | `a b ^ == n` | Yes | Yes | Yes | Yes | Yes |
| `\|` | 124 | `a b \| == n` | Yes | Yes | Yes | Yes | Yes |
| `~` | 126 | `a ~ == n'` | Yes | Yes | Yes | Yes | Yes |

**`cons` opcode:** TypeScript `OpCodes` name this **`CONS`** with value **ASCII 44** (comma `,`). In source you typically write the word `cons`, not the `,` token.

---

## Alphabetical entries

### `(` (STASH)

**Stack:** `… ( == {moves stack to queue}` (see `_docs/stack-notation.md` for queue notation).

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

---

## Source map (for maintainers)

| Runtime | Where primitives are wired |
|---------|------------------------------|
| TypeScript | `typescript/core/src/opcodes.ts` (`OpCodes`, `systemWords`) |
| Go | `go/src/engine/engine.go` (`defSystem` in `Setup`), opcodes in `go/src/utils/opcodes.go` |
| Python | `python/execute.py` (`defineSystem`) |
| Ruby | `ruby/execute.rb` (`defineSystem`) |
| Racket | `racket/private/engine.rkt` (`system_defs`), constants in `racket/private/ops.rkt` |

---

## See also

- [`_docs/core-vocabulary.md`](../../_docs/core-vocabulary.md) — canonical table and division note  
- [`_docs/stack-notation.md`](../../_docs/stack-notation.md) — stack / queue effect notation  
- [`typescript/core/src/opcodes.ts`](../../typescript/core/src/opcodes.ts) — opcode values and names  
