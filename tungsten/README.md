# F♭m in Tungsten

An F♭m0 interpreter written in [Tungsten](https://tungsten-lang.org/),
porting `python/execute.py` (the reference F♭m0 interpreter) 1:1.

> **Note:** This interpreter is LLM-generated.

## Features

F♭m0 vocabulary (matching `python/execute.py` exactly):

| Category | Words | Description |
|----------|-------|-------------|
| Stack | `dup`, `drop`, `swap`, `clr`, `depth` | Stack manipulation |
| Math | `+`, `-`, `*`, `/`, `%`, `^` | Big-integer arithmetic; `/` truncates toward zero |
| Bitwise | `&`, `\|`, `~`, `<<`, `>>` | Bitwise operations |
| Comparison | `<`, `=`, `>` | Comparison returning 0/1 |
| Queue | `q<`, `q>` | Move between stack and queue |
| Stash | `(`, `)` | Stash/fetch the stack through the queue |
| Definition | `[name] : body ;`, `name:` | Word definitions (`word:` is sugar for `[word] :`) |
| Quotations | `[ ... ]`, `eval`, `cons` | Anonymous functions on the stack |
| Conditional | `flag [Q] ?` | Evaluate quotation when flag ≠ 0 |
| I/O | `.`, `putc`, `putn` | Print stack, character, number |
| Misc | `rand`, `clock` | RNG (LCG seeded from wall clock); Unix-time seconds |
| Strings | `'...'` | Push character codes (supports common `\` escapes) |

Opcodes are assigned sequentially in first-seen order, system words first
(`nop`=0 … `~`=32), exactly as in the Python interpreter. Integers are
arbitrary precision (Tungsten's default `Int`), so e.g. `100!` is exact.

Number literals accepted: decimal, `-42`, `+7`, `0x1f`, `0b101`, `0o17`,
`1_000`, scientific (`1e3`). Comments: `/* ... */`. Tokens starting with `.`
longer than one char (`.foo`) are skipped.

## Usage

Compile once, then feed it F♭m source on stdin:

```sh
tungsten -o fbm main.w
./fbm < input.ff
```

Or pipe code directly:

```sh
cat input.ff | ./fbm
```

Errors mirror the Python interpreter: unknown words abort with empty stdout;
redefining an existing word prints `User word already defined`.

## Requirements

- Tungsten toolchain (https://tungsten-lang.org/)
- clang/LLVM (Tungsten prerequisite)

> **Note (Linux):** as of 2026-08, Tungsten `main` does not self-host on
> Linux x86_64 (macOS/ARM-only asm leaves in its bigint core; upstream CI red).
> This interpreter was developed and verified against tungsten commit
> `54da5007` (2026-08-16), the last revision that bootstraps on Linux.
> Build with the native engine (`tungsten -o`); the cached quick-run engine
> hangs printing booleans at that revision.

## Examples

Factorial (100!):

```sh
$ cat fact.ff | ./fbm
[(fact)] : dup 1 - fact * ;
[fact] : dup 1 - [(fact)] ? ;
100 fact .
[ 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000 ]
```

Simple arithmetic:

```sh
$ echo '5 3 + .' | ./fbm
[ 8 ]

$ echo '10 3 - .' | ./fbm
[ 7 ]

$ echo '4 5 * .' | ./fbm
[ 20 ]

$ echo '17 3 % .' | ./fbm
[ 2 ]
```

Definitions and conditionals:

```sh
$ printf 'twice: dup * ;\n7 twice twice .\n' | ./fbm
[ 2401 ]
```

## Implementation notes

- Globals (stack, queue, symbol/definition tables) live in mutable holders:
  Tungsten methods can mutate but not rebind outer variables.
- Division/modulo map straight onto Tungsten's `/` and `%`, which already
  truncate toward zero with C-style remainders — matching F♭m0.
- Bitwise NOT uses `~x == -x - 1` (Tungsten has no prefix `~` operator).
- The queue doubles as the pending-token stream; `(` / `)` stash and fetch
  ride the same stream, exactly like the reference implementation.
