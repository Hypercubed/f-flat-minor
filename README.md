# f-flat-minor

f-flat-minor is a tiny toy language and baby brother to [f-flat](https://github.com/Hypercubed/f-flat_node#readme). It is meant to be a tiny stack-oriented language used for learning new languages. The challenge is to implement f-flat-minor in as many languages as possible within the rules listed below.

## The Rules

- Minimal dependencies (try to limit to the standard library for each language)
- Parsing should be as simple as splitting on whitespace.
- The stack should consist of only big integers.
- Each implementation should generate and execute the same "bytecode".
- Each implementation should generate the same output.

## The Target

Each implementation should compile and execute the following code:

```forth
/* common definitions */

--: 1 - ;
rot: swap q< swap q> swap ;
choose: rot [ swap ] ? drop ;
branch: choose eval ;

/* factorial */

fact: dup [ dup -- fact * ] [ drop 1 ] branch ;

/* string printing */

prints: dup [ putc prints ] [ drop ] branch ;
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

<details>
  <summary>For an initial POC an interpreter can implement v0 (neglecting quotes) generating the same output</summary>
  
```forth
/* common definitions */

--: 1 - ;
rot: swap q< swap q> swap ;
choose: rot [swap] ? drop ;
branch: choose eval ;

/* factorial */

fact_t: dup -- fact * ;
fact_f: drop 1 ;
fact: dup [fact_t] [fact_f] branch ;

/* string printing */

print_t: putc prints ;
prints: dup [print_t] [drop] branch ;
println: prints 10 putc ;

0 32 'Factorial prints
0 '100: println

100 fact .
```

</details>

## The Approach

For each target language first implement a proof-of-concept interpreter either in this repo of in an online code runner ([replit](replit.com/) for example). Then, if satisfied, built a full fledged a compiler and runner within this repo.  Each language should run the example above and pass the test suite; possibly with the help of a preprocessor.

## Progress

| Language              | POC                                                        | Interpreter | Compiler/Executer | REPL |
| --------------------- | ---------------------------------------------------------- | ----------- | ----------------- | ---- |
| Typescript/Deno       | [ 😀 ](https://replit.com/@Hypercubed/f-flat-minor-TS)     | ✓           | ✓                 | ✓    |
| Go                    | [ 😀 ](https://replit.com/@Hypercubed/f-flat-minor-Go)     | ✓           | ✓                 | ✓    |
| Python                | [ 😀 ](https://replit.com/@Hypercubed/f-flat-minor-Python) | ✓           |
| Ruby                  | [ 😀 ](https://replit.com/@Hypercubed/f-flat-minor-Ruby)   | ✓           |
| Dart                  | [ 😀 ](https://replit.com/@Hypercubed/f-flat-minor-Dart)   | ✓           |
| AssemblyScript        | [ 😐 ](https://tinyurl.com/yc3wn325)                       | ✓           |
| Rust                  | [ 😔 ](https://replit.com/@Hypercubed/f-flat-minor-Rust)   |
| Swift                 | [ 😐 ](https://replit.com/@Hypercubed/f-flat-minor-Swift)  |
| C/C++/LLVM            |
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

Since the data stack consists of only big integers, each value can be both a number or a pointer to an operation (either system or user defined).  "strings" are a sequence of characters (ascii value) on the stack in reverse order for easy printing.  Programming in f-flat-minor is done by pushing values onto the data stack and then calling an operation.  These includes operations that extends the vocabulary of the language.  The built-in operations and core vocabulary are similar to it's older brother [f-flat](https://github.com/Hypercubed/f-flat_node#readme) inspired by HP RPL, Forth, Joy, Factor, XY and others.

I won't cover the basics of stack based contaminative programming here.  The system vocabulary below is similar to other such languages.  See [here](https://en.wikipedia.org/wiki/Concatenative_programming_language) and [here](https://en.wikipedia.org/wiki/Stack-oriented_programming) for more information on concatenative and Stack-oriented programming languages.  Briefly, f-flat-minor has no variables, only instructions that manipulate the stack, the queue, and the vocabulary.  For example `6 7 dup * -` results in `-43` on the bottom of the stack.  The command `.` prints the stack to the terminal.

> Note: In this doc I refer to operations occurring on the "bottom" of the data stack.  When printed the stack is printed left to right as top to bottom.  For the queue, words are executed left to right (from top to bottom), the tail of the queue is last and is often uses as the return stack.

A few peculiarities are:

*Values* - When a token is encountered that can be parsed as a integer, that value is pushed to the stack.  All other tokens are considered to be words.

*Booleans* - There is not a boolean type in f-flat-minor.  Instead, `0` is interpreted as false and all other values are truthy.

*Words* - When a token is encountered that is not a number, the operation is called with the stack as its arguments.  Words can use any non-whitespace character but note the special definitions for words starting with `'`, `[`, or `.` and ending with `:` below.

*Pointers* - When a word is encountered that starts with an `[` symbol the operation is not called but instead the numeric value of the operation is pushed to the stack.  For example `[+] eval` is the same `43 eval` which is the same as as calling `+` directly.  If a token is encountered that is not a known word or a definition a new *pointer* is pushed to the stack.  If the executer attempts to evaluate a pointer that is not a valid operation the executer will throw an error.

*Definitions* - The words `:` and `;` indicate a definition.  When a word is encountered that ends with a `:` symbol the operation is not called but instead starts a new definition.  The definition is terminated by `;` and the definition is removed from the stack (or queue depending on specific implementation).  The starting word (text before `:`) is the key for the new definition.  Definitions can be recursive but cannot be nested.  Definitions cannot be mutated or overridden.

> Note: `word: a b c ;` is sugar for `[word] : a b c ;`

*Quotes* - The words `[` and `]` indicate a quote.  When the word `[` is encountered, words between the brackets are not executed but instead pushed to the stack.  When the word `]` is encountered the words between the brackets are popped off the stack and stored as an unnamed word and it's pointer is pushed to the stack.  This is very similar to a definition expect a pointer is left on the stack.  Unlike a definition, a quote can be nested.  Notice that white space inside the quotes are required.

> Note: `[ word ]` and `[word]` behave similarly.  However, `[ word ]` is a quote and `[word]` is a pointer.  `[ word ]` adds an extra user definition.  An optimized compiler can convert `[ word ]` to `[word]`.

*Strings* - When the compiler/interpreter encounters a string (a sequence of non-white space characters starting with single quote `'`) it will push the string's characters onto the data stack (trailing quote, if present is ignored).  The characters are pushed in reverse order.  This is because the string is printed in order from the bottom of the stack.  Since the parsing of f-flat-minor is done by splitting on all whitespace, the string cannot have whitespace but can include escape sequences such as `\s`, `\n` for space and newline respectively.

*Comments* - All text between a `/*` and `*/` is ignored.  Comments cannot be nested.

Let's show a "Hello World" example:

```forth
rot: swap q< swap q> swap ;
choose: rot [swap] ? drop ;
branch: choose eval ;

say: dup [ putc say ] [drop] branch ;

0 'Hello\sWorld!\n' say
```

The first three lines define words that help manage the stack.  The fifth line defines a word `say` that recursively prints characters from the stack until a zero is encountered.  The last line pushes a zero onto the stack, then the ascii characters of `Hello World!\n` (in reverse order) and then the `say` word is called to print the string.  A few explanations of the words used here:

- `drop` - Pops an element off the stack.
- `swap` - Swaps last two elements on the stack.
- `q<` - Pops an element off the stack and pushes it to the end of the queue.
- `q>` - Pops an element off the end of the queue and pushes it onto the stack.
- `?` - Pops a *pointer* off the stack and then a *value*.  If the value is truthy (not zero) the pointer is executed.  If the value is false (zero) the pointer is ignored.
- `eval` - Pops an *pointer* off the stack and executes it.
- `putc` - Pops a *character* off the stack and prints it.

### Vocabulary

| Mnemonic | Syntax |  Op (Ascii)   | Version |
| -------- | :----: | :-----------: | :-----: |
| NOP      |  nop   |   0 (null)    |   v0    |
| CALL     |  eval  |       1       |   v0    |
| PUTC     |  putc  |       2       |   v0    |
| GETC     |  getc  |       3       |   v1    |
| PRINT    |  print  |       5       |   v1    |
| CLOCK    | clock  |       6       |   v1    |
| DROP     |  drop  | 8 (backspace) |   v0    |
| PUSHR    |   q<   |      14       |   v0    |
| PULLR    |   q>   |      15       |   v0    |
| SHIFTL   |   <<   |      16       |   v1    |
| SHIFTR   |   >>   |      17       |   v1    |
| CLR      |  clr   |      24       |   v1    |
| RAND     |  rand   |      26       |   v1    |
| EXIT     |  exit  |   27 (ESC)    |   v1    |
| DUP      |  dup   |    33 (!)     |   v0    |
| DEPTH    | depth  |    35 (#)     |   v1    |
| SWAP     |  swap  |    36 ($)     |   v0    |
| MOD      |   %    |    37 (%)     |   v1    |
| AND      |   &    |    38 (&)     |   v1    |
| STASH    |   (    |    40 (()     |   v1    |
| FETCH    |   )    |    41 ())     |   v1    |
| MUL      |   \*   |    42 (\*)    |   v0    |
| ADD      |   +    |    43 (+)     |   v0    |
| SUB      |   -    |    45 (-)     |   v0    |
| PRN      |   .    |    46 (.)     |   v0    |
| DIV      |   /    |    47 (/)     |   v0    |
| MARK     |   :    |    58 (:)     |   v0    |
| DEF      |   ;    |    59 (;)     |   v0    |
| LT       |   <    |    60 (<)     |   v1    |
| EQ       |   =    |    61 (=)     |   v0    |
| GT       |   >    |    62 (>)     |   v1    |
| WHEN     |   ?    |    63 (?)     |   v0    |
| BRA      |   [    |    91 ([)     |   v1    |
| KET      |   ]    |    93 (])     |   v1    |
| POW      |   ^    |    94 (^)     |   v1    |
| OR       |   \|   |   124 (\|)    |   v1    |
| NOT      |   ~    |    126 (~)    |   v1    |

### Compiler/Preprocessor commands

A word starting with a period `.` (other than `.` itself) is a compiler or preprocessor command.  Unlike other words the compiler/preprocessor commands are never pushed to the stack. If a implementation does not support a compiler/preprocessor command it should ignore it.  The following commands are supported:

*.load* - loads another file in place
*.include* - loads another file in place (same as `.load` except a file will not be imported twice)
*.m* - macro command, the rest of the line will be executed at compile time and included in the output.  The macro command is only supported in the preprocessor.

Currently the preprocessor is written in Deno.  Other implementations should use the Deno preprocessor or implement compiler commands directly.

### Standard Library

[core.ff](./ff/lib/core.ff) Contains definitions of commonly used f-flat words.  This can be included in other files by using the `.include` command or using the preprocessor implement in Deno.

## License

This project is licensed under the MIT License - see the LICENSE file for details
```
