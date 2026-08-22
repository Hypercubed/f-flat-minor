# F♭m in Tungsten

This directory contains an F♭m interpreter written in [Tungsten](https://tungsten-lang.org/).

## Features

F♭m0 support (basic stack operations, math, quotations):

| Category | Words | Description |
|----------|-------|-------------|
| Stack | `dup`, `drop`, `swap`, `clr`, `depth` | Stack manipulation |
| Math | `+`, `-`, `*`, `/`, `%`, `^` | Arithmetic operations |
| Bitwise | `&`, `|`, `~`, `<<`, `>>` | Bitwise operations |
| Comparison | `<`, `=`, `>` | Comparison returning 0/1 |
| Queue | `q<`, `q>` | Queue stack operations |
| Extended | `(`, `)` | Stash/fetch stack to queue |
| Definition | `:`, `;` | Define user words |
| Quotations | `[ ... ]` | Anonymous functions |
| Conditionals | `?` | When (conditional execution) |
| I/O | `.`, `putc`, `putn` | Print stack, character, number |
| Misc | `rand`, `clock` | Random, time |
| Eval | `eval`, `[name]` | Execute by opcode, word reference |

## Usage

Run F♭m code:

```sh
tungsten main.w < input.ff
```

Or pipe preprocessed F♭m:

```sh
cat input.ff | tungsten main.w
```

## Requirements

- Tungsten compiler (install from https://tungsten-lang.org/)
- clang/LLVM

## Status

Preview implementation matching F♭m0 core vocabulary.

## Examples

Factorial (100!):

```sh
echo '[(fact)] : dup 1 - fact * ;
[fact] : dup 1 - [(fact)] ? ;
100 fact .' | tungsten main.w
```

Expected output: The factorial of 100 (approximately 9.33 × 10^157)

Simple arithmetic:

```sh
echo '5 3 + .' | tungsten main.w
# Output: [ 8 ]

echo '10 3 - .' | tungsten main.w  
# Output: [ 7 ]

echo '4 5 * .' | tungsten main.w
# Output: [ 20 ]

echo '17 3 % .' | tungsten main.w
# Output: [ 2 ]
```

## Implementation Notes

- F♭m uses big integers; all values on the data stack are arbitrarily large
- Division truncates toward zero (matching the language spec)
- Modulo follows the same sign rule as division
- Words are case-insensitive (lowercase internally)
- `[word]` pushes the opcode of `word` onto the stack (word reference)
- `word:` is syntactic sugar for `[word] :` (start definition)
- User definitions can call other user definitions recursively