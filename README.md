# f-flat-minor

f-flat-minor is a tiny toy language and baby brother to [f-flat](https://github.com/Hypercubed/f-flat_node#readme).  It is meant to be a tiny stack-oriented language used for learning new languages.  The challenge is to implement f-flat-minor in as many languages as possible within the rules listed below.
## Rules

* Minimal dependencies (try to limit to the standard library for each language)
* Parsing should be as simple as splitting on whitespace.
* The stack should consist of only big integers.
* Each implementation should generate and execute the same bytecode.
* Each implementation should generate the same output.

## The Language

Each implementation should compile and execute the following code:

```forth
/* common definitions */

--: 1 - ;
not: 0 = ;
rot: &swap dip swap ;
choose: &swap ? drop ;
ifte: rot choose call ;

/* factorial */

fact_t: drop 1 ;
fact_f: dup -- fact * ;
fact: dup &fact_t &fact_f ifte ;

/* string printing */

print_f: putc print ;
print: dup &drop &print_f ifte ;
println: print 10 putc ;

0 32 'Factorial print
0 '100 println

100 fact .
```

with the following output:

```
Factorial 100
[93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000]
```

## Phased Approach

For each target language first implement a proof-of-concept in an online code runner ([replit](replit.com/) for example).  Then, if satisfied, split the POC into a compiler and runner within this repo.

## Progress

| Language | POC | Compiler | Runner |
| --- | ----------- | --- | --- |
| Typescript/Deno | https://replit.com/@Hypercubed/f-flat-minor-TS 😀 | ✔ | ✔ |
| Go | https://replit.com/@Hypercubed/f-flat-minor-Go 😀 | ✔ | ✔ |
| Rust | https://replit.com/@Hypercubed/f-flat-minor-Rust 😔 |
| Python | https://replit.com/@Hypercubed/f-flat-minor-Python 😀 |
| C/C++/C#/LLVM |  TBD |
| Ruby | https://replit.com/@Hypercubed/f-flat-minor-Ruby 😐 |
| Lisp/Clojure/Racket | TBD |
| Haskell | TBD |
| Julia | TBD |
| Dart | TBD |
| Erlang/BEAM | TBD |
| Perl/Raku | TBD |
| WebAssembly/AssemblyScript | TBD |

License

This project is licensed under the MIT License - see the LICENSE file for details
