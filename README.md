# f-flat-minor

f-flat-minor is a tiny toy language and baby brother to [f-flat](https://github.com/Hypercubed/f-flat_node#readme). It is meant to be a tiny stack-oriented language used for learning new languages. The challenge is to implement f-flat-minor in as many languages as possible within the rules listed below.

## The Rules

- Minimal dependencies (try to limit to the standard library for each language)
- Parsing should be as simple as splitting on whitespace.
- The stack should consist of only big integers.
- Each implementation should generate and execute the same "bytecode".
- Each implementation should generate the same output.

## The Target

### F♭m<sup>o</sup>

The most basic implementations of f-flat-minor (dubbed F♭m<sup>o</sup>) has a limited vocabulary necessary to calculate the factorial of 100.

```forth
[(fact)] : dup 1 - fact * ;
[fact] : dup 1 - [(fact)] ? ;

100 fact .
```

### F♭m

F♭m adds compiler sugar for comments, strings, and quotes as well as additional words (shown in the table below).

```forth
/* factorial */

fact: dup 1 > [ dup 1 - fact * ] ? ;

/* string printing */

(prints): dup [ putc (prints) ] ? ;
prints: (prints) drop ;
println: prints 10 putc ;

0 32 'Factorial' prints
0 '100:' println

100 fact .
```

with the following output:

```
Factorial 100:
[ 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000 ]
```

## The Approach

For each target language first implement a proof-of-concept interpreter either in this repo of in an online code runner ([replit](replit.com/) for example). Then, if satisfied, built a full fledged a compiler and runner within this repo. Each language should run the example above and pass the test suite; possibly with the help of a preprocessor.

## Progress

| Language              | Version                                                       | Interpreter | Compiler/Executer | REPL |
| --------------------- | ------------------------------------------------------------- | ----------- | ----------------- | ---- |
| Typescript/Deno       | F♭m                                                           | ✓           | ✓                 | ✓    |
| Go                    | F♭m                                                           | ✓           | ✓                 | ✓    |
| Python                | F♭m                                                           | ✓           |
| Ruby                  | F♭m                                                           | ✓           |
| Dart                  | F♭m                                                           | ✓           |
| AssemblyScript        | F♭m<sup>o</sup>                                               | ✓           |
| C++                   | F♭m<sup>o</sup>                                               | ✓           |
| Rust                  | [ POC 😔 ](https://replit.com/@Hypercubed/f-flat-minor-Rust)  |
| Swift                 | [ POC 😐 ](https://replit.com/@Hypercubed/f-flat-minor-Swift) |
| LLVM                  |
| F#                    |
| Lisp/Clojure/Racket   |
| Haskell               |
| Julia                 |
| Lua                   |
| Erlang/BEAM           |
| Perl/Raku             |
| Java/Scala/Kotlin/JVM |
| Forth/Factor/Cat      |
| F-flat                |

## The Language

`f-flat-minor` is a minimal implementation of [f-flat](https://github.com/Hypercubed/f-flat_node#readme).

Key features:

- Only one type (big integer)
- Only one data stack
- One return stack (many implementations use the queue as a return stack)
- Minimal set of system instructions
- "Infinite" stack and user vocabulary
- Compiles to "bytecode" (actually base64 VLQ encoded big integers)

Since the data stack consists of only big integers, each value can be both a number or a pointer to an operation (either system or user defined). "strings" are a sequence of characters (ascii value) on the stack in reverse order for easy printing. Programming in f-flat-minor is done by pushing values onto the data stack and then calling an operation. These includes operations that extends the vocabulary of the language. The built-in operations and core vocabulary are similar to it's older brother [f-flat](https://github.com/Hypercubed/f-flat_node#readme) inspired by HP RPL, Forth, Joy, Factor, XY and others.

I won't cover the basics of stack based contaminative programming here. The system vocabulary below is similar to other such languages. See [here](https://en.wikipedia.org/wiki/Concatenative_programming_language) and [here](https://en.wikipedia.org/wiki/Stack-oriented_programming) for more information on concatenative and Stack-oriented programming languages. Briefly, f-flat-minor has no variables, only instructions that manipulate the stack, the queue, and the vocabulary. For example `6 7 dup * -` results in `-43` on the bottom of the stack. The command `.` prints the stack to the terminal.

> Note: In this doc I refer to operations occurring on the "bottom" of the data stack. When printed the stack is printed left to right as top to bottom. For the queue, words are executed left to right (from top to bottom), the tail of the queue is last and is often uses as the return stack.

A few peculiarities are:

### F♭m<sup>o</sup>

_Values_ - When a token is encountered that can be parsed as a integer, that value is pushed to the stack. All other tokens are considered to be words.

_Booleans_ - There is not a boolean type in f-flat-minor. Instead, `0` is interpreted as false and all other values are truthy.

_Words_ - When a token is encountered that is not a number, the operation is called with the stack as its arguments. Words can use any non-whitespace character but note the special definitions for words starting with `'`, `[`, or `.` and ending with `:` below.

_Pointers_ - When a word is encountered that starts with an `[` symbol the operation is not called but instead the numeric value of the operation is pushed to the stack. For example `[+] eval` is the same `43 eval` which is the same as as calling `+` directly. If a token is encountered that is not a known word or a definition a new _pointer_ is pushed to the stack. If the executer attempts to evaluate a pointer that is not a valid operation the executer will throw an error.

_Definitions_ - The words `:` and `;` indicate a definition. A definition is started with `:` and terminated by `;`. The definition is removed from the stack (or queue depending on specific implementation) and assigned to the last symbol on the stack (before `:`). Definitions cannot be mutated or overridden.

Let's show a "Hello World" example in F♭m<sup>o</sup>:

```forth
[prints_loop] : q< prints q> putc ;
[prints] : dup [prints_loop] ? ;

0 'Hello\sWorld!\n' prints drop
```

- `drop` - Pops an element off the stack.
- `?` - Pops a _pointer_ off the stack and then a _value_. If the value is truthy (not zero) the pointer is executed. If the value is false (zero) the pointer is ignored.
- `putc` - Pops a _character_ off the stack and prints it.

### F♭m

_Definition Shorthand_ - Words ending with a colon (`:`) push a symbol to the stack and the word `:` to the queue. As such `word: a b c ;` is sugar for `[word] : a b c ;`

_Quotes_ - The words `[` and `]` indicate a quote. When the word `[` is encountered, words between the brackets are not executed. When the word `]` is encountered the words between the brackets are popped off the stack (or queue depending on specific implementation) and stored as an unnamed word and it's pointer is pushed to the stack. This is very similar to a definition expect a pointer is left on the stack. Unlike a definition, a quote can be nested. Notice that white space inside the quotes are required.

> Note: `[ word ]` and `[word]` behave similarly. However, `[ word ]` is a quote and `[word]` is a pointer. `[ word ]` adds an extra user definition. An optimized compiler can convert `[ word ]` to `[word]`.

_Strings_ - When the compiler/interpreter encounters a string (a sequence of non-white space characters starting with single quote `'`) it will push the string's characters onto the data stack (trailing quote, if present is ignored). Since the parsing of f-flat-minor is done by splitting on all whitespace, the string cannot have whitespace but can include escape sequences such as `\s`, `\n` for space and newline respectively.

_Comments_ - All text between a `/*` and `*/` is ignored. Comments cannot be nested.

Let's show a "Hello World" example in F♭m:

```forth
prints: dup [ q< prints q> putc ] ? ;

0 'Hello\sWorld!\n' prints drop
```

### Vocabulary

| Mnemonic | Syntax |  Op (Ascii)   |     Version     |
| -------- | :----: | :-----------: | :-------------: |
| NOP      |  nop   |   0 (null)    | F♭m<sup>o</sup> |
| EVAL     |  eval  |       1       | F♭m<sup>o</sup> |
| PUTC     |  putc  |       2       |       F♭m       |
| GETC     |  getc  |       3       |       F♭m       |
| PRINT    | print  |       5       |       F♭m       |
| CLOCK    | clock  |       6       |       F♭m       |
| DROP     |  drop  | 8 (backspace) | F♭m<sup>o</sup> |
| PUSHR    |   q<   |      14       | F♭m<sup>o</sup> |
| PULLR    |   q>   |      15       | F♭m<sup>o</sup> |
| SHIFTL   |   <<   |      16       |       F♭m       |
| SHIFTR   |   >>   |      17       |       F♭m       |
| CLR      |  clr   |      24       |       F♭m       |
| RAND     |  rand  |      26       |       F♭m       |
| EXIT     |  exit  |   27 (ESC)    |       F♭m       |
| DUP      |  dup   |    33 (!)     | F♭m<sup>o</sup> |
| DEPTH    | depth  |    35 (#)     |       F♭m       |
| SWAP     |  swap  |    36 ($)     | F♭m<sup>o</sup> |
| MOD      |   %    |    37 (%)     |       F♭m       |
| AND      |   &    |    38 (&)     |       F♭m       |
| STASH    |   (    |    40 (()     |       F♭m       |
| FETCH    |   )    |    41 ())     |       F♭m       |
| MUL      |   \*   |    42 (\*)    | F♭m<sup>o</sup> |
| ADD      |   +    |    43 (+)     | F♭m<sup>o</sup> |
| SUB      |   -    |    45 (-)     | F♭m<sup>o</sup> |
| DUMP     |   .    |    46 (.)     | F♭m<sup>o</sup> |
| DIV      |   /    |    47 (/)     | F♭m<sup>o</sup> |
| MARK     |   :    |    58 (:)     | F♭m<sup>o</sup> |
| DEF      |   ;    |    59 (;)     | F♭m<sup>o</sup> |
| LT       |   <    |    60 (<)     |       F♭m       |
| EQ       |   =    |    61 (=)     |       F♭m       |
| GT       |   >    |    62 (>)     |       F♭m       |
| WHEN     |   ?    |    63 (?)     | F♭m<sup>o</sup> |
| BRA      |   [    |    91 ([)     |       F♭m       |
| KET      |   ]    |    93 (])     |       F♭m       |
| POW      |   ^    |    94 (^)     |       F♭m       |
| OR       |   \|   |   124 (\|)    |       F♭m       |
| NOT      |   ~    |    126 (~)    |       F♭m       |

### Compiler/Preprocessor commands

A word starting with a period `.` (other than `.` itself) is a compiler or preprocessor command. Unlike other words the compiler/preprocessor commands are never pushed to the stack. If a implementation does not support a compiler/preprocessor command it should ignore it. The following commands are supported:

_.load_ - loads another file in place
_.include_ - loads another file in place (same as `.load` except a file will not be imported twice)
_.m_ - macro command, the rest of the line will be executed at compile time and included in the output. The macro command is only supported in the preprocessor.

Currently the preprocessor is written in Deno. Other implementations should use the Deno preprocessor or implement compiler commands directly.

### Standard Library

[core.ff](./ff/lib/core.ff) Contains definitions of commonly used f-flat words. This can be included in other files by using the `.include` command or using the preprocessor implement in Deno.

## License

This project is licensed under the MIT License - see the LICENSE file for details
