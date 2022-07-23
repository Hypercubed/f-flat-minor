# f-flat-minor in Racket

This library implements [f-flat-minor](../README.md) in Racket.

## Getting Started

First [install Racket](https://docs.racket-lang.org/getting-started/index.html).

In this directory (./racket) run `raco pkg install`.  After setup finishes, you will be able to use _F♭m_ with `#lang ff`.

## Usage as a language

include `#lang ff` in your source file to use the language.  Example:

```
#lang reader ff

/* factorial */

fact: dup 1 > [ dup 1 - fact * ] ? ;

/* string printing */

(prints): dup [ q< (prints) q> putc ] ? ;
prints: (prints) drop ;

0 'Factorial' 32 '100:' 10 prints

100 fact .
```

and run with:

```sh
racket example.rkt
```

## Usage as an interpreter

The `main.rkt` file can run `ff` files directly.  No need to add the `#lang ff` directive.  Example:

```sh
racket main.rkt example.ff
```

or using stdin

```
cat example.ff | racket main.rkt -
```

## Usage with deno preprocessor

First you will need to ensure the deno preprocessor is built.  In the `deno` project folder run:

```sh
chomp build:preprocess
```

Then in the Racket project folder us the shell script `pp.sh` to run the preprocessor.  Example:

```sh
./pp.sh example.ffp
```

## Usage in a REPL

```sh
racket main.rkt
```

## License

This project is licensed under the MIT License - see the LICENSE file for details