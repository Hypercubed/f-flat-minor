# F♭m String Design: `cons` and `concat`

## Overview

Double-quoted strings (e.g. `"hello"`) are compiler sugar for a **quote that pushes character codes**. They are first-class values — a single pointer on the stack, like any other quote.

\```
"hi"  ≡  [ 'h' 'i' ]  ≡  [ 104 105 ]
\```

The empty string is `0` — the same `0` that already means NOP/nil throughout the language. This gives strings a natural null terminator with no new machinery.

---

## Internal Representation

Strings are built from **cons cells**, directly analogous to Lisp. Each cons cell is a two-instruction quote body:

\```
x y cons  →  ptr,  body: [ PUSH x, CALL y ]
\```

A string is a linked chain of cons cells terminating at `0`:

\```
"hi"  →  ptrH,  body: [ PUSH 104, CALL ptrI ]
          ptrI,  body: [ PUSH 105, CALL 0    ]
\```

Eval'ing the head pointer walks the chain, pushing each character code in order.

---

## New Primitives (opcodes)

Two new system opcodes are added:

### `cons` — construct a cell

\```
x y cons  →  ptr
\```

Allocates a new quote whose body pushes `x` then calls `y`. The value `x` is always
treated as **data** (a push), never as a call. `y` is the tail — either another cons
cell pointer or `0`.

### `concat` — compose two quotes

\```
ptrA ptrB concat  →  ptr
\```

Allocates a new quote equivalent to `[ ptrA eval ptrB eval ]`. When eval'd, runs
`ptrA` then `ptrB` in sequence. This is **function composition**, not list walking —
no `first`/`rest` needed.

---

## Compiler Sugar

`"hello"` is desugared at compile time to a right-to-left chain of `swons` calls
terminating at `0`:

\```
"hi"  →  0 105 swons 104 swons
\```

So eval'ing the result pushes `104` then `105` — left to right. ✓

---

## Defined Words

These require no new opcodes — all derived from `cons`, `concat`, and `0`:

| Word         | Definition              | Stack effect       |
|--------------|-------------------------|--------------------|
| `null`       | `0 =`                   | `ptr -- bool`      |
| `swons`      | `swap cons`             | `y x -- ptr`       |
| `unit`       | `0 swons`               | `x -- ptr`         |
| `strnil`     | `0`                     | `-- ptr`           |
| `strconcat`  | `concat`                | `ptrA ptrB -- ptr` |
| `strappend`  | `unit concat`           | `ptr char -- ptr`  |
| `strprepend` | `swap unit swap concat` | `char ptr -- ptr`  |
| `prints`     | `dup eval _prints drop` | `ptr --`           |
| `println`    | `prints cr`             | `ptr --`           |

`prints` bridges old and new: eval'ing a cons-string flattens chars onto the stack
above the `0` tail, which the existing `_prints` sentinel loop already handles
correctly.

---

## Deferred (requires `first`/`rest`)

| Word       | Stack effect      |
|------------|-------------------|
| `strlen`   | `ptr -- n`        |
| `strequal` | `ptr ptr -- bool` |

These need to **inspect** a cons chain without eval'ing it flat. They are
straightforward to add once `first` and `rest` opcodes are introduced, following
the same recursive pattern as Lisp's `car`/`cdr`.