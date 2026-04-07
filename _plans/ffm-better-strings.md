# F♭m String Design: `cons` and `concat`

## Overview

**Double-quoted** strings (e.g. `"hello"`) are compiler sugar for a **quote that contains a single single-quoted string literal**: the same characters appear inside `[ ... ]` as one `'...'` token.

**Single-quoted** strings (e.g. `'hi'`) are themselves sugar for **pushing each character as its own literal** (character codes / integers) in sequence.

Chaining those rules, all of the following are equivalent (same quote body after full desugar):

```
"hi"  ≡  [ 'hi' ]  ≡  [ 'h' 'i' ]  ≡  [ 104 105 ]
```

The **first** step for double quotes is still syntactic: `"hi"` becomes `[ 'hi' ]` — one string token inside the brackets, not two tokens `'h'` `'i'` at that stage. The equivalence to `[ 'h' 'i' ]` and `[ 104 105 ]` follows from how **single**-quoted strings desugar.

**Escaping** rules are unchanged between single- and double-quoted forms: whatever escapes apply inside `'...'` apply inside the text of `"..."` as well (the lexer/parser treats the payload the same; only the outer delimiters differ).

**No `0` on the double-quoted path:** desugaring `"..."` to `[ '...' ]` (and then to per-character pushes) does **not** add a `0` prefix or suffix. That is distinct from manually building a **nil-terminated cons chain** with `0 ... swons`, where `0` is the tail of the list — see Internal Representation.

The empty string: `""` ≡ `[ '' ]`, which desugars to an empty quote body `[]` (no pushes). Separately, **`0`** remains the language’s NOP/nil and the **terminator** of cons-chain string values when constructed with `cons`/`swons`; it is not inserted by the double-quote sugar itself.

---

## Internal Representation

Strings are built from **cons cells**, directly analogous to Lisp. Each cons cell is a two-instruction quote body:

```
x y cons  →  ptr,  body: [ PUSH x, CALL y ]
```

A **cons-chain string value** (what you hold on the stack after `0 ... swons`) is a linked list of cons cells terminating at `0`:

```
ptrH,  body: [ PUSH 104, CALL ptrI ]
ptrI,  body: [ PUSH 105, CALL 0    ]
```

Eval'ing the head pointer walks the chain, pushing each character code in order.

That shape is **not** the same token sequence as `"hi"` or `[ 'hi' ]` / `[ 104 105 ]`. The latter are **quotes** whose body (after desugar) is a flat sequence of pushes. Building a cons chain is still done manually (or by library words) with `0` and `cons`/`swons`. Double-quoted sugar never prepends or appends `0` to the quote body.

---

## Primitives (opcodes)

### `cons` — construct a cell

```
x y cons  →  ptr
```

Allocates a new quote whose body pushes `x` then calls `y`. The value `x` is always
treated as **data** (a push), never as a call. `y` is the tail — either another cons
cell pointer or `0`.

**Status: ✅ Implemented** (system opcode)

### `compose` / `concat` — compose two quotes

```
ptrA ptrB compose  →  ptr
```

Allocates a new quote equivalent to `[ ptrA eval ptrB eval ]`. When eval'd, runs
`ptrA` then `ptrB` in sequence. This is **function composition**, not list walking.

The plan originally called this `concat`, but the implementation uses `compose` 
(defined in `ff/lib/seq/seq.ffp` as `[ [eval] dip eval ] cons cons`).

**Status: ✅ Implemented** (defined word in seq.ffp)

---

## Compiler Sugar

### Double quotes → one single-quoted string inside a quote

```
"hello"  ≡  [ 'hello' ]
```

No `0` is added before or after the content when applying this rule.

### Single quotes → one push per character

A single-quoted string literal desugars to the same sequence of single-character literals (and thus to integer pushes) inside a quote:

```
'hello'  ≡  'h' 'e' 'l' 'l' 'o'   /* inside a quote body */
[ 'hello' ]  ≡  [ 'h' 'e' 'l' 'l' 'o' ]  ≡  [ 104 101 108 108 111 ]   /* example codes */
```

**Escaping:** the escape grammar for `'...'` and `"..."` stays the same; only the delimiters differ at the first double-quote step.

### Combined equivalence (example)

```
"hi"  ≡  [ 'hi' ]  ≡  [ 'h' 'i' ]  ≡  [ 104 105 ]
```

The compiler may fuse steps internally (e.g. emit numeric pushes directly) as long as the result matches the above.

### Cons-chain construction (unchanged, not the same as `"..."` desugar)

Manual nil-terminated string **values** are still built with `0` and `swons`, for example:

```
0 'o' swons 'l' swons 'l' swons 'e' swons 'h' swons
```

That produces a **single** cons-chain pointer on the stack, not the quote `[ 'hello' ]`. Library words such as `sprint` expect evaluable quote bodies or cons chains per existing conventions.

**Status: ✅ Implemented** — TypeScript core, **Go** (`go/src/compiler/compiler.go`), and **Racket** (`racket/private/lexer.rkt`, `parser.rkt`, `compiler.rkt`, `runner.rkt`, `expander.rkt`): `"..."` emits `BRA`, the same per-character pushes as `'...'`, then `KET`, matching tokenized `[ '...' ]`. Standalone `[` and `]` tokens are accepted in Go and Racket as well. Racket’s lexer now applies the same **ff-unescape** rules as Go/TS for both `'` and `"` payloads (`racket/private/unescape.rkt`).

Equivalent spellings and manual cons-chain construction:

```
[ 'hi' ]
[ 'h' 'i' ]
[ 104 105 ]
0 'i' swons 'h' swons     /* cons-chain "hi", includes terminating 0 */
```

---

## Defined Words

These are implemented in `ff/lib/string/str.ffp`:

| Word      | Definition               | Stack effect                        |
|-----------|--------------------------|-------------------------------------|
| `prints`  | `__prints drop`          | `0 n* prints == {prints chars}`     |
| `println` | `prints cr`              | `0 n* println == {prints chars, nl}`|
| `sprint`  | `0 swap eval prints`     | `[S] sprint == {prints string}`     |
| `sprintln`| `sprint cr`              | `[S] sprintln == {prints s, nl}`    |
| `slen`    | `0 swap eval __lens`     | `[S] slen == n`                     |
| `scat`    | `compose`                | `[A] [B] scat == [A+B]`             |
| `sjoin`   | `swap compose compose`   | `[A] [Sep] [B] sjoin == [A Sep B]`  |
| `cjoin`   | `swap cons compose`      | `[A] c [B] cjoin == [A c B]`        |

### Core seq words (from `ff/lib/seq/seq.ffp`):

| Word     | Definition              | Stack effect             |
|----------|-------------------------|--------------------------|
| `unit`   | `0 cons`                | `x unit == [x]`          |
| `swons`  | `swap cons` (use inline)| `y x swons == ptr`       |

---

## Deferred (requires `first`/`rest` opcodes)

| Word        | Stack effect      | Notes                                    |
|-------------|-------------------|------------------------------------------|
| `strlen`    | `[S] -- n`        | Non-destructive length (current `slen` uses eval) |
| `strequal`  | `[A] [B] -- flag` | Deep equality without eval'ing           |

These need to **inspect** a cons chain without eval'ing it flat. They are
straightforward to add once `first` and `rest` opcodes are introduced, following
the same recursive pattern as Lisp's `car`/`cdr`.

---

## Usage Examples

```ff
/* Building strings manually */
0 '!' swons 'd' swons 'l' swons 'r' swons 'o' swons 'W' swons ' ' swons 'o' swons 'l' swons 'l' swons 'e' swons 'H' swons
sprint   /* prints: Hello World! */

/* Concatenation */
[ 'Hello' ] [ 'World' ] scat sprintln

/* Join with separator */
[ 'foo' ] [ '-' ] [ 'bar' ] sjoin sprintln   /* prints: foo-bar */

/* Join with char separator */
[ 'path' ] '/' [ 'to' ] [ 'file' ] cjoin sprintln   /* prints: path/to/file */
```
