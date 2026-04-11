# f-flat-minor

f-flat-minor (_F♭m_ for short) is a tiny toy language and baby brother to [f-flat](https://github.com/Hypercubed/f-flat_node#readme). It is meant to be a tiny stack-oriented language used for learning new languages. The challenge is to implement f-flat-minor in as many languages as possible within the rules listed below.

## AI Disclaimer

_F♭m_ (the language) was all designed by me, a human.  Almost all of the implementations of _F♭m_ were implemented before modern AI tools were widely available.  The only exception so far is the separation of the TypeScript core from the original Deno runtime.  Some implementations of _F♭m_ were later refactored with the help of AI tools.  I have used AI tools extensively for planning, documentation, tooling, testing, and constructing the website.  _F♭m_ has always been a learning project and hobby for me.  Learning how to use AI tools effectively is part of the fun and learning experience.  I understand that some people may have strong feelings about the use of AI tools in open source projects.  If you think this project is slop purely because some of it was AI-generated, that's on you. If you think it's slop because it's sloppy, that's on me.

## The Rules

- Minimal dependencies (standard library for each language)
- Parsing should be as simple as splitting on whitespace.
- The stack should consist of only big integers.
- Each implementation should generate and execute the same "bytecode".
- Each implementation should generate the same output.

## The Approach

For each target language first implement a proof-of-concept interpreter either in this repo of in an online code runner ([replit](replit.com/) for example). Then, if satisfied, built a full fledged a compiler and runner within this repo. Each language should run the example above and pass the test suite; possibly with the help of a preprocessor.

## Progress

| Language                     | Support                                                                | Interpreter | "ByteCode" | REPL |
| ---------------------------- | ---------------------------------------------------------------------- | ----------- | ---------- | ---- |
| Typescript (deno, node, bun) | F♭m<sup>+</sup>                                                        | ✓           | ✓          | ✓    |
| Go                           | F♭m<sup>+</sup>                                                        | ✓           | ✓          | ✓    |
| Racket                       | F♭m<sup>+</sup>                                                        | ✓           |            | ✓    |
| Python                       | F♭m                                                                    | ✓           |
| Ruby                         | F♭m                                                                    | ✓           |
| Dart                         | F♭m                                                                    | ✓           |
| AssemblyScript               | F♭m                                                                    | ✓           |            | ✓    |
| C++                          | F♭m<sup>o</sup>                                                        | ✓           |
| Rust                         | F♭m<sup>o</sup>                                                        | ✓           |
| Swift                        | [ F♭m<sup>-</sup> ](https://replit.com/@Hypercubed/f-flat-minor-Swift) | ✓           |
| Wolfram Language             | F♭m<sup>-</sup>                                                        |
| Haskell                      | F♭m<sup>-</sup>                                                        |
| WASM (wat)                   | F♭m<sup>-</sup>                                                        |
| Julia                        |
| LLVM                         |
| F#                           |
| Lua                          |
| Erlang/BEAM                  |
| Perl/Raku                    |
| Java/Scala/Kotlin/JVM        |
| Forth/Factor/Cat             |
| F-flat                       |

## Tooling

This repo ships with [`mise.toml`](mise.toml) and [`mise.lock`](mise.lock) for pinned development tools.

- Prefer activating the repo toolchain in your shell before running repo commands.
- If your shell is not activated, prefix commands with `mise exec -- ...`.
- Use the [`mise.toml`](mise.toml) environment for repo tools such as `chomp` and for Go commands that must match the version required by [`go/go.mod`](go/go.mod).

This avoids failures where `chomp` is not on `PATH` or `go` resolves to an incompatible version.

## The Language

`f-flat-minor` is a minimal implementation of [f-flat](https://github.com/Hypercubed/f-flat_node#readme).

### F♭m vs F-flat

While _F♭m_ code looks very similar to _F-flat_ code they are almost opposite in their philosophy. The main concept of _F-flat_ is that all system defined words should apply logically to all data types. For example `+` operator is addition, concatenation, or logical OR depending on the data types. In _F♭m_ there is only one data type (big integer) and, therefore, all operators have one meaning. Even with that limitation the resulting language is very similar.

### Features

- Only one type (big integer)
- Only one data stack
- One return stack (many implementations use the queue as a return stack)
- Minimal set of system instructions, no scopes
- "Infinite" stack and user vocabulary
- Compiles to "bytecode" (actually base64 VLQ encoded big integers)

Since the data stack consists of only big integers, each value can be both a number or a pointer to an operation (either system or user defined). Programming in f-flat-minor is done by pushing values onto the data stack and then calling an operation. These includes operations that extends the vocabulary of the language. The built-in operations and core vocabulary are similar to it's older brother [f-flat](https://github.com/Hypercubed/f-flat_node#readme) inspired by HP RPL, Forth, Joy, Factor, XY and others.

I won't cover the basics of stack based contaminative programming here. The system vocabulary below is similar to other such languages. See [here](https://en.wikipedia.org/wiki/Concatenative_programming_language) and [here](https://en.wikipedia.org/wiki/Stack-oriented_programming) for more information on concatenative and Stack-oriented programming languages. Briefly, f-flat-minor has no variables, only instructions that manipulate the stack, the queue, and the vocabulary. For example `6 7 dup * -` results in `-43` on the bottom of the stack. The command `.` prints the stack to the terminal.

> Note: In this doc I refer to operations occurring on the "bottom" of the data stack. When printed the stack is printed left to right as top to bottom. For the queue, words are executed left to right (from top to bottom), the tail of the queue is last and is often uses as the return stack.

### _F♭m<sup>o</sup>_

The most basic implementations of f-flat-minor (dubbed _F♭m<sup>o</sup>_) has a limited vocabulary necessary to calculate the factorial of 100.

> Note: _F♭m<sup>-</sup>_ indicates a version that lacks big integer support or otherwise not fully implemented.

```forth
[(fact)] : dup 1 - fact * ;
[fact] : dup 1 - [(fact)] ? ;

100 fact .
```

with the following output:

```
[ 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000 ]
```

- _Values_ - When a token is encountered that can be parsed as a integer, that value is pushed to the stack. All other tokens are considered to be words.

- _Booleans_ - There is not a boolean type in f-flat-minor. Instead, `0` is interpreted as false and all other values are truthy.

- _Words_ - When a token is encountered that is not a number, the operation is called with the stack (and queue) as its arguments. Words can use any non-whitespace character but note the special definitions for words starting with `'`, `[`, or `.` and ending with `:` below.

- _Pointers_ - When a word is encountered that starts with an `[` symbol the operation is not called but instead the numeric value of the operation is pushed to the stack. For example `[+] eval` is the same `43 eval` which is the same as as calling `+` directly. If a token is encountered that is not a known word or a definition a new _pointer_ is pushed to the stack. If the executer attempts to evaluate a pointer that is not a valid operation the executer will throw an error.

- _Definitions_ - The words `:` and `;` indicate a definition. A definition is started with `:` and terminated by `;`. The definition is removed from the stack (or queue depending on specific implementation) and assigned to the last symbol on the stack (before `:`). Definitions cannot be mutated or overridden.

### _F♭m_

_F♭m_ adds compiler sugar for comments, strings, and quotes as well as additional words (shown in the table below).

```forth
/* factorial */

fact: dup 1 > [ dup 1 - fact * ] ? ;

/* string printing */

(prints): dup [ q< (prints) q> putc ] ? ;
prints: (prints) drop ;

0 'Factorial' 32 '100:' 10 prints

100 fact .
```

with the following output:

```
Factorial 100:
[ 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000 ]
```

- _Definition Shorthand_ - Words ending with a colon (`:`) push a symbol to the stack and the word `:` to the queue. As such `word: a b c ;` is sugar for `[word] : a b c ;`

- _Quotes_ - The words `[` and `]` indicate a quote. When the word `[` is encountered, words between the brackets are not executed. When the word `]` is encountered the words between the brackets are popped off the stack (or queue depending on specific implementation) and stored as an unnamed word and it's pointer is pushed to the stack. This is very similar to a definition expect a pointer is left on the stack. Unlike a definition, quotes can be nested. Notice that white space inside the quotes are required.

> Note: `[ word ]` and `[word]` behave similarly. However, `[ word ]` is a quote and `[word]` is a pointer. `[ word ]` adds an extra user definition. An optimized compiler can convert `[ word ]` to `[word]`.

- _Strings_ - When the compiler/interpreter encounters a string (a sequence of non-white space characters starting with single quote `'`) it will push the string's characters onto the data stack (trailing quote, if present is ignored). Since the parsing of f-flat-minor is done by splitting on all whitespace, the string cannot have whitespace but can include escape sequences such as `\s`, `\n` for space and newline respectively.

- _Comments_ - All text between a `/*` and `*/` is ignored. Comments cannot be nested.

### Vocabulary

See [F♭m by example](./_docs/supplemental/fbm-by-example.md) for a more detailed explanation of the vocabulary. A reusable copy of this table also lives in
[> \_docs/core-vocabulary.md](./_docs/core-vocabulary.md)

<!-- BEGIN mdsh -->

| Mnemonic | Syntax | Stack Effect                         |  Op (Ascii)   |     Version     |
| -------- | :----: | ------------------------------------ | :-----------: | :-------------: |
| NOP      |  nop   | `… nop == …`                         |   0 (null)    |       F♭m       |
| EVAL     |  eval  | `[A] eval == a*`                     |       1       |       F♭m       |
| PUTC     |  putc  | `n putc == {prints char(n)}`         |       2       |       F♭m       |
| GETC     |  getc  | `getc == n {reads char}`             |       3       |       F♭m       |
| PUTN     |  putn  | `n putn == {prints n}`               |       5       |       F♭m       |
| CLOCK    | clock  | `clock == n {reads clock}`           |       6       |       F♭m       |
| DROP     |  drop  | `a drop ==`                          | 8 (backspace) |       F♭m       |
| PUSHR    |   q<   | `a q< == \| …a`                      |      14       |       F♭m       |
| PULLR    |   q>   | `q> == a \| a…`                      |      15       |       F♭m       |
| SHIFTL   |   <<   | `a b << == n`                        |      16       |       F♭m       |
| SHIFTR   |   >>   | `a b >> == n`                        |      17       |       F♭m       |
| CLR      |  clr   | `… clr ==`                           |      24       |       F♭m       |
| RAND     |  rand  | `n rand == r {0 <= r < n}`           |      26       |       F♭m       |
| EXIT     |  exit  | `n exit == {exits with code n}`      |   27 (ESC)    |       F♭m       |
| DUP      |  dup   | `a dup == a a`                       |    33 (!)     | F♭m<sup>o</sup> |
| DEPTH    | depth  | `… depth == … n`                     |    35 (#)     |       F♭m       |
| SWAP     |  swap  | `a b swap == b a`                    |    36 ($)     |       F♭m       |
| MOD      |   %    | `a b % == r {a = b*trunc(a/b)+r}`    |    37 (%)     |       F♭m       |
| AND      |   &    | `a b & == n`                         |    38 (&)     |       F♭m       |
| STASH    |   (    | `… ( == {moves stack to queue}`      |    40 (()     |       F♭m       |
| FETCH    |   )    | `) == … {restores stack from queue}` |    41 ())     |       F♭m       |
| MUL      |   \*   | `a b * == n`                         |    42 (\*)    | F♭m<sup>o</sup> |
| ADD      |   +    | `a b + == n`                         |    43 (+)     | F♭m<sup>o</sup> |
| SUB      |   -    | `a b - == n`                         |    45 (-)     | F♭m<sup>o</sup> |
| DUMP     |   .    | `… . == … {prints stack}`            |    46 (.)     | F♭m<sup>o</sup> |
| DIV      |   /    | `a b / == trunc(a/b)`                |    47 (/)     | F♭m<sup>o</sup> |
| MARK     |   :    | `n : == {begin definition(n)}`       |    58 (:)     | F♭m<sup>o</sup> |
| DEF      |   ;    | `; == {end definition}`              |    59 (;)     | F♭m<sup>o</sup> |
| LT       |   <    | `a b < == flag`                      |    60 (<)     |       F♭m       |
| EQ       |   =    | `a b = == flag`                      |    61 (=)     |       F♭m       |
| GT       |   >    | `a b > == flag`                      |    62 (>)     |       F♭m       |
| WHEN     |   ?    | `flag [A] ? == a*`                   |    63 (?)     | F♭m<sup>o</sup> |
| BRA      |   [    | `[ == {begin quotation}`             |    91 ([)     |       F♭m       |
| KET      |   ]    | `] == [A] {end quotation}`           |    93 (])     |       F♭m       |
| POW      |   ^    | `a b ^ == n`                         |    94 (^)     |       F♭m       |
| OR       |   \|   | `a b \| == n`                        |   124 (\|)    |       F♭m       |
| NOT      |   ~    | `a ~ == n'`                          |    126 (~)    |       F♭m       |

<!-- END mdsh -->

Division note: the language docs define `/` as integer division truncated toward zero, with `%` as the matching remainder. That means `-3 2 /` is `-1`, not `-2`, and `-3 2 %` is `-1`.

Implementation status: Deno, Node, and Bun match that `/` and `%` rule today. Python and Racket truncate `/` toward zero, but `%` still follows divisor-signed modulo. Go currently uses Euclidean division for negative operands, and Ruby currently uses floor division/modulo for negative operands.

### _F♭m<sup>+</sup>_

_F♭m<sup>+</sup>_ adds a preprocessor and compiler commands. A word starting with a period `.` (other than `.` itself) is a compiler or preprocessor command. Unlike other words the compiler/preprocessor commands are never pushed to the stack. If an implementation does not support a compiler/preprocessor command it should ignore it. The following commands are supported:

| Command   |                                           Description                                            |       Support       |
| --------- | :----------------------------------------------------------------------------------------------: | :-----------------: |
| `.load`   |                                   loads another file in place                                    | Deno, Node, Bun, Go and Racket |
| `.import` | loads another file in place only once (same as `.load` except a file will not be imported twice) | Deno, Node, Bun, Go and Racket |
| `.m`      | macro command, the rest of the line will be executed at compile time and included in the output. |      Deno, Go       |
| `.inline` |      indicates that a previous definition is safe for inlining (using during optimization)       |        Deno         |
| `.unsafe` |    indicates that a previous definition is not safe for inlining (using during optimization)     |        Deno         |

### Standard Library and Preprocessor

[core.ff](./ff/lib/core.ff) Contains definitions of commonly used _F♭m_ words. This can be included in other files by using the `.load` or `.import` command in implementations that support _F♭m<sup>+</sup>_. By convention _F♭m_ files that require the preprocessor have the `.ffp` extension.

Import resolution rules:

- `./foo`, `../foo`, `/abs/path`, and legacy bare paths like `lib/helper.ffp` stay file-relative to the importing source file.
- `<prelude>`, `<math/sqrt>`, and other angle-bracket imports resolve through the ordered stdlib search path.
- Stdlib imports search the built-in stdlib root first, then any `FBM_STDLIB_PATH` entries, then repeatable `--stdlib-root` CLI entries.
- Directory imports resolve through same-name index files such as `math/math.ffp` or `math/math.ff`.

For implementations that don't support _F♭m<sup>+</sup>_ compiler commands, the source file can be preprocessed using Deno, Go, or Racket. Example:

```sh
mise exec -- go run ./go/cmd/preprocess --in my_file.ffp | ./python/execute.py
```

or

```sh
./racket/main.rkt --pp-only ./ff/fact.ffp | ./python/execute.py
```

### Building, Testing and Benchmarking

For build and testing we use [chomp](https://chompbuild.com/). To build all projects run:

Before running repo build or test commands, activate the repo [`mise.toml`](mise.toml) environment. If you do not activate your shell, use `mise exec -- ...` explicitly.

```sh
mise exec -- chomp build:
```

> Note: this assumes you have the necessary runtimes and compilers installed or available through [`mise.toml`](mise.toml). The locked toolchain in [`mise.lock`](mise.lock) is the intended environment for repo tasks.

or to build only one project run:

```sh
mise exec -- chomp build:{name}
```

Where `{name}` is the name of the project (i.e. `deno`, `cpp`, `racket`).

To test all projects run:

```sh
mise exec -- chomp test:
```

or to test only one project run:

```sh
mise exec -- chomp test:{name}
```

For benchmarking run you will need to install [hyperfine](https://github.com/sharkdp/hyperfine) then run:

```sh
mise exec -- chomp bench
```

For Go-specific usage, quick-start commands, and tests, see [`go/README.md`](go/README.md).

## License

[> LICENSE](LICENSE)

<!-- BEGIN mdsh -->

(The MIT License)

Copyright (c) 2021 Jayson Harshbarger

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<!-- END mdsh -->
