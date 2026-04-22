---
id: ffm-better-strings
title: "F\u266dm String Design: `cons` and `concat`"
last_updated: 2026-04-10
description: >
  ## Overview Double-quoted strings (e.g. `"hello"`) are compiler sugar fo
  r a **quote that pushes character codes**. They are first-class values —
   a single pointer on the stack, like any other quote. ``` "hi" ≡ [ 'h' '
  i' ] ≡ [ 104 105 ] ``` T...
tags: [math, plans]
status: active
kind: initiative
author_kind: ai
prompter: "GPT-5.4"
---
# F♭m String Design: `cons` and `concat`

## Overview

Double-quoted strings (e.g. `"hello"`) are compiler sugar for a **quote that pushes character codes**. They are first-class values — a single pointer on the stack, like any other quote.

```
"hi"  ≡  [ 'h' 'i' ]  ≡  [ 104 105 ]
```

The empty string is `0` — the same `0` that already means NOP/nil throughout the language. This gives strings a natural null terminator with no new machinery.

---

## Internal Representation

Strings are built from **cons cells**, directly analogous to Lisp. Each cons cell is a two-instruction quote body:

```
x y cons  →  ptr,  body: [ PUSH x, CALL y ]
```

A string is a linked chain of cons cells terminating at `0`:

```
"hi"  →  ptrH,  body: [ PUSH 104, CALL ptrI ]
          ptrI,  body: [ PUSH 105, CALL 0    ]
```

Eval'ing the head pointer walks the chain, pushing each character code in order.

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

```
"hello"  →  desugared at compile time to 0 'o' swons 'l' swons 'l' swons 'e' swons 'h' swons
```

So eval'ing the result pushes characters left to order: `h`, `e`, `l`, `l`, `o`.

**Status: ❌ NOT IMPLEMENTED** - No implementation currently desugars `"..."` syntax.
Users must manually construct strings using `0` and `cons`/`swons`:
```
0 'i' swons 'h' swons   /* creates "hi" */
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
