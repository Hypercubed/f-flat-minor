# F♭m by example

This is a small F♭m tutorial.  The code snippets below are meant to demonstrate input and outputs in the f-flat-minor repl.  Lines starting with `F♭m>` are user input followed by output.  The output by the repl is the current stack.  The stack is always displayed in brackets.  For example:

```
Welcome to F♭A𝄫C♭
F♭m> 3 2 + 0 'Hello\sWorld' println   /* user input */
Hello World                           /* text printed to the console */
[ 5 ]                                 /* the current stack */
```

For most examples it is assumed that the current stack is clear. The stack can be cleared between examples by typing `clr`.

## Syntax

The syntax of `F♭m` is similar to Forth.  All programming in `F♭m` is done by manipulating the stack.

```
F♭m> 5 2 3 56 76 23 65  /* push values onto the stack */
[ 5 2 3 56 76 23 65 ]
```

```
/* Multiline comments start with slash-star,
   and end with star-slash,
   there are no inline comments */
```

White space does not matter.  Brackets require whitespace padding.

```
F♭m> [ 1 2 3 ] /* valid */
[ 1 2 3 ]

F♭m> [1 2 3]   /* invalid */
Error
```

## Types

### Integers

in `F♭m` everything is a integer (more specifically big integers).

```
F♭m> 15              /* a number */
[ 15 ]

F♭m> 1_000_000       /* Use underscores to improve readability! */
[ 1000000 ]
```

Binary, octal, and hex values ca be entered using 0b, 0o, and 0x notation.

```
F♭m> 0b111             /* binary */
[ 7 ]

F♭m> 0o111             /* octal */
[ 73 ]

F♭m> 0x111             /* hexadecimal */
[ 273 ]
```

### Booleans

`F♭m` treats the integer `0` as false and all other values as true.

```
F♭m> 5 7 >
[ 0 ]

F♭m> 7 7 =
[ 1 ]
```

### Strings

Strings are created with `'`.  When a string is encountered the ascii value of each character is pushed onto the stack.  White space in strings is not allowed.  Use `\s` to represent a space.

```
F♭m> 'abc'
[ 97 98 99 ]

F♭m> 'Hello\sWorld'
[ 72 101 108 108 111 32 87 111 114 108 100 ]
```

### Words

```
F♭m> thing         /* a word that is executed immediately unless enclosed in an brackets */
[ ??? ]

F♭m> thing:        /* this is a definition key, it starts a new definition */
[ thing: ]

F♭m> [thing]       /*  this is a key reference, it pushes the key reference onto the stack */
[ -15 ]
```

### Quotations

Words (and values) within an brackets are not evaluated, instead a reference to the word is pushed onto the stack.

```
F♭m> [ 1 2 3 ]
[ 290 ]

F♭m> [ 1 2 + ]
[ 291 ]
```

## Definitions

```
//   name    body  define
//   ------- ----- -
F♭m> square: dup * ;
[ ]

// apply functions by invoking the word
F♭m> 5 square
[ 25 ]

F♭m> x: 1 ;                /* creates a function that always returns 1 */
[ ]
```

## Base Words

### Stack Operations

```
F♭m> 3 dup     /* `dup`licate the bottom (last) item */
[ 3 3 ]

F♭m> 2 5 swap  /* `swap` the bottom with the second element */
[ 5 2 ]

F♭m> 4 0 drop  /* `drop` the bottom item */
[ 4 ]

F♭m> 4 0 depth  /* gets the `depth` of the stack */
[ 4 0 2 ]

F♭m> 1 2 clr   /* wipe out the entire stack */
[ ]
```

### Queue Operations

The queue stack is used to the hold values when executing other words.  Because `F♭m` uses the queue to hold values,  `q<` should always be followed by `q>`.

```
F♭m> 3 2 1 0 q< + q>
[ 3 3 0 ]
```

### Math is reverse polish

```
F♭m> 6 7 *
[ 42 ]

F♭m> 1360 23 -
[ 1337 ]

F♭m> 12 4 /   /* integer division, truncates toward 0 */
[ 3 ]

F♭m> 13 2 %   /* modulo */
[ 1 ]

F♭m> -13 5 /  /* negative division still truncates toward 0 */
[ -2 ]

F♭m> -13 5 %  /* matching remainder */
[ -3 ]

F♭m> 2 3 ^    /* power function */
[ 8 ]
```

These negative-operand examples show the documented language semantics. Some runtimes are still being aligned; see [`_docs/core-vocabulary.md`](./core-vocabulary.md) for the current implementation status.

### Bitwise operations

```
F♭m> 0xFF 0xF0 &
[ 240 ]

F♭m> 0x0F 0xF0 |
[ 255 ]

F♭m> 0xF0 ~  /* bitwise not */
[ -241 ]

F♭m> 0xF0 1 >> /* right shift */
[ 120 ]

F♭m> 0xF0 2 <<  /* left shift */
[ 960 ]
```

### Comparisons

```
F♭m> 1 1 =              /* Equality */
[ 1 ]

F♭m> 1 2 =
[ 0 ]

F♭m> 3 dup =
[ 1 ]

F♭m> 'a' 'b' <          /* Compare with `<` and `>` */
[ 1 ]

F♭m> 'a' 'b' >
[ 0 ]

F♭m> 3 5 <
[ 1 ]
```

### Control Flow

```
//  test  if true            
//  ----  --------------
F♭m> 1    [ 1 2 + ] ?
[ 3 ]

F♭m> 0    [ 1 2 + ] ?
[ ]
```

### IO

```
F♭m> 'H' '\n' .
[ 72 10 ]  /* Prints the stack */
[ 72 10 ]  /* The repl automatically prints the stack after user input */

F♭m> 'H' putc '\n' putc
H   /* `putc` prints a character to the console */
[  ]

F♭m> 'H' putn '\n' putc
72   /* `putn` prints a number to the console */
[  ]
```
