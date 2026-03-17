# F-flat-minor starter problem set

This page picks up right after [fbm-by-example](./fbm-by-example.md). The order is
intentional: define small words first, use booleans and branching next, lean on
recursion in the middle, and save the more sequence-shaped problems for the end.

Each solution below is a self-contained `.ffp` snippet for the web playground. Paste
the whole block into the editor and run it. The last line of each block is the sample
invocation used for the expected result. Problems 3 and 4 use `my-abs` and
`my-even?` so the snippets stay self-contained even though `/lib/core.ff` already
ships `abs` and `even?`.

## Selected for Web Tutorial v1

Render these exact starter problems, in this order:

1. `square`
2. print a literal message plus a computed value
3. `abs`
4. `even?`
5. countdown
6. sum `1..n`
7. factorial
8. Fibonacci
9. `gcd`
10. reverse digits
11. numeric palindrome
12. FizzBuzz
13. Collatz step count
14. `prime?`
15. Pascal row

## Core Tutorial Problems

### Problem 1: Square

**Goal** Define `square` and print the square of one number.

**Concepts** definitions, `dup`, `*`, `putn`, `cr`

**Solution**

```ff
.load /lib/core.ff

square: dup * ;

6 square dup putn cr drop
```

**Try it** `6 square dup putn cr drop`; then replace `6` with `9`.

**Expected result** `36`

**Note** `dup` keeps the original input around so `*` can use it twice.

### Problem 2: Print a Message and a Value

**Goal** Print a short literal message followed by a computed number.

**Concepts** strings, `prints`, definitions, `putn`, `cr`

**Solution**

```ff
.load /lib/core.ff

square: dup * ;

0 'Square\sof\s7:\s' prints
7 square putn cr
```

**Try it** `0 'Square\sof\s7:\s' prints 7 square putn cr`; then change both `7`s to `12`.

**Expected result** `Square of 7: 49`

**Note** `\s` is how F-flat-minor writes spaces inside a string literal.

### Problem 3: Absolute Value

**Goal** Build an absolute-value word and show it on a negative input.

**Concepts** comparisons, `?`, arithmetic, small helper words

**Solution**

```ff
.load /lib/core.ff

my-abs: dup 0 < [ -1 * ] ? ;

-42 my-abs dup putn cr drop
```

**Try it** `-42 my-abs dup putn cr drop`; then try `19 my-abs dup putn cr drop`.

**Expected result** `42`

**Note** Only negative numbers need work, so the false path can be "do nothing."

### Problem 4: Even?

**Goal** Return `1` for even numbers and `0` for odd ones.

**Concepts** `%`, `=`, booleans, reusable predicates

**Solution**

```ff
.load /lib/core.ff

my-even?: 2 % 0 = ;

14 my-even? dup putn cr drop
```

**Try it** `14 my-even? dup putn cr drop`; then replace `14` with `15`.

**Expected result** `1`

**Note** Even numbers are exactly the ones where dividing by `2` leaves a remainder of `0`.

### Problem 5: Countdown

**Goal** Print the numbers from `n` down to `0`.

**Concepts** recursion, `branch`, output, base cases

**Solution**

```ff
.load /lib/core.ff

countdown:
  dup putn
  dup 0 >
  [ sp -- countdown ]
  [ cr drop ]
  branch
;

5 countdown
```

**Try it** `5 countdown`; then replace `5` with `7`.

**Expected result** `5 4 3 2 1 0`

**Note** Printing before the recursive call makes the sequence descend.

### Problem 6: Sum 1..n

**Goal** Sum every integer from `1` through `n`.

**Concepts** recursion, `+`, implicit base cases

**Solution**

```ff
.load /lib/core.ff

sum-to:
  dup
  [ dup -- sum-to + ]
  ?
;

8 sum-to dup putn cr drop
```

**Try it** `8 sum-to dup putn cr drop`; then replace `8` with `10`.

**Expected result** `36`

**Note** When `n` reaches `0`, the quote is skipped and that `0` becomes the base value.

### Problem 7: Factorial

**Goal** Compute `n!`.

**Concepts** recursion, `branch`, multiplication

**Solution**

```ff
.load /lib/core.ff

fact: dup [ dup -- fact * ] [ drop 1 ] branch ;

6 fact dup putn cr drop
```

**Try it** `6 fact dup putn cr drop`; then replace `6` with `8`.

**Expected result** `720`

**Note** The whole base case is `drop 1`: when the input is `0`, replace it with `1`.

### Problem 8: Fibonacci

**Goal** Compute the nth Fibonacci number.

**Concepts** two recursive calls, base cases, stack reuse

**Solution**

```ff
.load /lib/core.ff

fib: dup 2 < [ ] [ -- dup fib swap -- fib + ] branch ;

10 fib dup putn cr drop
```

**Try it** `10 fib dup putn cr drop`; then replace `10` with `12`.

**Expected result** `55`

**Note** `0` and `1` are already their own Fibonacci answers, so the true branch can stay empty.

### Problem 9: GCD

**Goal** Find the greatest common divisor of two integers.

**Concepts** Euclid's algorithm, `%`, recursion, `tuck`

**Solution**

```ff
.load /lib/core.ff

gcd: dup [ tuck % gcd ] [ drop ] branch ;

84 30 gcd dup putn cr drop
```

**Try it** `84 30 gcd dup putn cr drop`; then try `109876463 177777648 gcd dup putn cr drop`.

**Expected result** `6`

**Note** Each step replaces `(a, b)` with `(b, a % b)` until `b` becomes `0`.

### Problem 10: Reverse Digits

**Goal** Reverse the decimal digits of a positive integer.

**Concepts** `divrem`, queue helpers, accumulators, recursion

**Solution**

```ff
.load /lib/core.ff

rev-step:
  over
  [ swap 10 divrem q< swap 10 * q> + rev-step ]
  [ nip ]
  branch
;

reverse-digits: 0 rev-step ;

12034 reverse-digits dup putn cr drop
```

**Try it** `12034 reverse-digits dup putn cr drop`; then try `9070 reverse-digits dup putn cr drop`.

**Expected result** `43021`

**Note** The accumulator builds the answer as the input shrinks, and numeric leading zeros disappear naturally.

### Problem 11: Numeric Palindrome

**Goal** Test whether a number reads the same forward and backward.

**Concepts** helper reuse, `=`, decomposition by digits

**Solution**

```ff
.load /lib/core.ff

rev-step:
  over
  [ swap 10 divrem q< swap 10 * q> + rev-step ]
  [ nip ]
  branch
;

reverse-digits: 0 rev-step ;
palindrome?: dup reverse-digits = ;

12321 palindrome? dup putn cr drop
```

**Try it** `12321 palindrome? dup putn cr drop`; then replace `12321` with `12345`.

**Expected result** `1`

**Note** This is a good reminder that a small helper like `reverse-digits` pays off immediately.

### Problem 12: FizzBuzz

**Goal** Print the FizzBuzz sequence from `1` to `n`.

**Concepts** nested branching, `%`, recursion, visible output

**Solution**

```ff
.load /lib/core.ff

fizzbuzz-line:
  dup 15 % 0 =
  [ drop 0 'FizzBuzz' println ]
  [
    dup 3 % 0 =
    [ drop 0 'Fizz' println ]
    [
      dup 5 % 0 =
      [ drop 0 'Buzz' println ]
      [ putn cr ]
      branch
    ]
    branch
  ]
  branch
;

fizzbuzz:
  dup 1 >
  [ dup -- fizzbuzz ]
  ?
  fizzbuzz-line
;

15 fizzbuzz
```

**Try it** `15 fizzbuzz`; then replace `15` with `20`.

**Expected result**

```text
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
```

**Note** This version recurses first and prints second, so the output comes out in ascending order.

### Problem 13: Collatz Step Count

**Goal** Count how many Collatz steps it takes to reach `1`.

**Concepts** helper words, branching, recursive counting

**Solution**

```ff
.load /lib/core.ff

next-collatz: dup even? [ 2 / ] [ 3 * 1 + ] branch ;
collatz-steps: dup 1 > [ next-collatz collatz-steps ++ ] [ drop 0 ] branch ;

12 collatz-steps dup putn cr drop
```

**Try it** `12 collatz-steps dup putn cr drop`; then try `27 collatz-steps dup putn cr drop`.

**Expected result** `9`

**Note** `next-collatz` holds the rule, and `collatz-steps` only has to count one step at a time.

### Problem 14: Prime?

**Goal** Ask whether a number is prime.

**Concepts** library loading, predicates, reuse

**Solution**

```ff
.load /lib/primes.ffp

29 prime? dup putn cr drop
```

**Try it** `29 prime? dup putn cr drop`; then replace `29` with `30`.

**Expected result** `1`

**Note** This is a good place to reuse `/lib/primes.ffp` instead of squeezing a long primality test into the starter editor.

### Problem 15: Pascal Row

**Goal** Print one row of Pascal's triangle.

**Concepts** recursion, formatting, `nck`

**Solution**

```ff
.load /lib/core.ff

print-entry:
  dup 0 > [ sp ] ?
  over over nck putn
;

row-step:
  dup 0 >
  [ over over -- row-step ]
  ?
  print-entry
  drop2
;

pascal-row: dup row-step cr ;

5 pascal-row
```

**Try it** `5 pascal-row`; then replace `5` with `6`.

**Expected result** `1 5 10 10 5 1`

**Note** `nck` does the math for each entry; the recursion only controls left-to-right order.

## Stretch and Milestone Problems

Once these 15 feel comfortable, the next good additions are:

- `cube`, `inc`, and `dec`
- `odd?`, `divisible?`, `min2`, and `max2`
- `lcm`
- sum of digits
- nth prime
- Project Euler problem 1

These keep the same stack-and-number focus while asking learners to combine the
starter patterns in slightly larger programs.

## Deferred Until Data-Structure Chapters

The following classic L-99-style prompts are worth saving for later, after the tutorial
introduces a concrete list or tree representation:

- last element of a list
- flatten a nested list
- run-length encoding
- splitting and rotating list data
- sorting symbolic values

F-flat-minor can absolutely solve those, but they teach data representation choices
more than the core stack language.
