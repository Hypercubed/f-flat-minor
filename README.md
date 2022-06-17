# f-flat-minor

f-flat-minor is a tiny toy language and baby brother to [f-flat](https://github.com/Hypercubed/f-flat_node#readme). It is meant to be a tiny stack-oriented language used for learning new languages. The challenge is to implement f-flat-minor in as many languages as possible within the rules listed below.

## Rules

- Minimal dependencies (try to limit to the standard library for each language)
- Parsing should be as simple as splitting on whitespace.
- The stack should consist of only big integers.
- Each implementation should generate and execute the same "bytecode".
- Each implementation should generate the same output.

## The Language

Each implementation should compile and execute the following code:

```forth
/* common definitions */

--: 1 - ;
rot: swap q< swap q> swap ;
choose: rot  [ swap ] ? drop ;
branch: choose eval ;

/* factorial */

fact: dup [ dup -- fact * ] [ drop 1 ] branch ;

/* string printing */

print: dup [ putc print ] [ drop ] branch ;
println: print 10 putc ;

0 32 'Factorial' print
0 '100:' println

100 fact .
```

with the following output:

```
Factorial 100:
[ 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000 ]
```

## Phased Approach

For each target language first implement a proof-of-concept in an online code runner ([replit](replit.com/) for example). Then, if satisfied, split the POC into a compiler and runner within this repo.

## Progress

| Language            | POC                                                        | Interpreter | Compiler | REPL |
| ------------------- | ---------------------------------------------------------- | ----------- | -------- | ---- |
| Typescript/Deno     | [ 😀 ](https://replit.com/@Hypercubed/f-flat-minor-TS)     | ✓           | ✓        | ✓    |
| Go                  | [ 😀 ](https://replit.com/@Hypercubed/f-flat-minor-Go)     | ✓           | ✓        | ✓    |
| Python              | [ 😀 ](https://replit.com/@Hypercubed/f-flat-minor-Python) | ✓           |
| Ruby                | [ 😀 ](https://replit.com/@Hypercubed/f-flat-minor-Ruby)   | ✓           |
| Rust                | [ 😔 ](https://replit.com/@Hypercubed/f-flat-minor-Rust)   |
| Dart                | [ 😀 ](https://replit.com/@Hypercubed/f-flat-minor-Dart)   | ✓           |
| AssemblyScript      | [ 😐 ](https://tinyurl.com/yc3wn325)                       | ✓           |
| Swift               | [ 😐 ](https://replit.com/@Hypercubed/f-flat-minor-Swift)  |
| C/C++/C#/LLVM       |
| Lisp/Clojure/Racket |
| Haskell             |
| Julia               |
| Erlang/BEAM         |
| Perl/Raku           |
| Java/Scala          |

## Vocabulary

| Mnemonic | Syntax |  Op (Ascii)   | Version |
| -------- | :----: | :-----------: | :-----: |
| NOP      |  nop   |   0 (null)    |   v0    |
| CALL     |  eval  |       1       |   v0    |
| PUTC     |  putc  |       2       |   v0    |
| GETC     |  getc  |       3       |   v1    |
| PUT      |  put   |       4       |   v1    |
| CLOCK    | clock  |       5       |   v1    |
| DROP     |  drop  | 8 (backspace) |   v0    |
| PUSHR    |   q<   |      14       |   v0    |
| PULLR    |   q>   |      15       |   v0    |
| SHIFTL   |   <<   |      16       |   v1    |
| SHIFTR   |   >>   |      17       |   v1    |
| CLR      |  clr   |      24       |   v1    |
| RND      |  rnd   |      26       |   v1    |
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

## License

This project is licensed under the MIT License - see the LICENSE file for details
