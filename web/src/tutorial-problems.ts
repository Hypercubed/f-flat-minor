export interface TutorialProblem {
  id: string;
  order: number;
  title: string;
  goal: string;
  concepts: string[];
  source: string;
  expected?: string;
  note?: string;
  stdin?: string;
}

export const TUTORIAL_PROBLEMS: TutorialProblem[] = [
  {
    id: "square",
    order: 1,
    title: "Square",
    goal: "Define `square` and print the square of one number.",
    concepts: ["definitions", "dup", "*", "putn", "cr"],
    source: String.raw`.load /lib/core.ff

square: dup * ;

6 square dup putn cr drop
`,
    expected: "36",
    note: "`dup` keeps the original input around so `*` can use it twice.",
  },
  {
    id: "message-and-value",
    order: 2,
    title: "Print a Message and a Value",
    goal: "Print a short literal message followed by a computed number.",
    concepts: ["strings", "prints", "definitions", "putn", "cr"],
    source: String.raw`.load /lib/core.ff

square: dup * ;

0 'Square\sof\s7:\s' prints
7 square putn cr
`,
    expected: "Square of 7: 49",
    note: "`\\s` is how F-flat-minor writes spaces inside a string literal.",
  },
  {
    id: "abs",
    order: 3,
    title: "Absolute Value",
    goal: "Build an absolute-value word and show it on a negative input.",
    concepts: ["comparisons", "?", "arithmetic", "small helper words"],
    source: String.raw`.load /lib/core.ff

my-abs: dup 0 < [ -1 * ] ? ;

-42 my-abs dup putn cr drop
`,
    expected: "42",
    note: "Only negative numbers need work, so the false path can be \"do nothing.\"",
  },
  {
    id: "even",
    order: 4,
    title: "Even?",
    goal: "Return `1` for even numbers and `0` for odd ones.",
    concepts: ["%", "=", "booleans", "reusable predicates"],
    source: String.raw`.load /lib/core.ff

my-even?: 2 % 0 = ;

14 my-even? dup putn cr drop
`,
    expected: "1",
    note: "Even numbers are exactly the ones where dividing by `2` leaves a remainder of `0`.",
  },
  {
    id: "countdown",
    order: 5,
    title: "Countdown",
    goal: "Print the numbers from `n` down to `0`.",
    concepts: ["recursion", "branch", "output", "base cases"],
    source: String.raw`.load /lib/core.ff

countdown:
  dup putn
  dup 0 >
  [ sp -- countdown ]
  [ cr drop ]
  branch
;

5 countdown
`,
    expected: "5 4 3 2 1 0",
    note: "Printing before the recursive call makes the sequence descend.",
  },
  {
    id: "sum-to",
    order: 6,
    title: "Sum 1..n",
    goal: "Sum every integer from `1` through `n`.",
    concepts: ["recursion", "+", "implicit base cases"],
    source: String.raw`.load /lib/core.ff

sum-to:
  dup
  [ dup -- sum-to + ]
  ?
;

8 sum-to dup putn cr drop
`,
    expected: "36",
    note: "When `n` reaches `0`, the quote is skipped and that `0` becomes the base value.",
  },
  {
    id: "factorial",
    order: 7,
    title: "Factorial",
    goal: "Compute `n!`.",
    concepts: ["recursion", "branch", "multiplication"],
    source: String.raw`.load /lib/core.ff

fact: dup [ dup -- fact * ] [ drop 1 ] branch ;

6 fact dup putn cr drop
`,
    expected: "720",
    note: "The whole base case is `drop 1`: when the input is `0`, replace it with `1`.",
  },
  {
    id: "fibonacci",
    order: 8,
    title: "Fibonacci",
    goal: "Compute the nth Fibonacci number.",
    concepts: ["two recursive calls", "base cases", "stack reuse"],
    source: String.raw`.load /lib/core.ff

fib: dup 2 < [ ] [ -- dup fib swap -- fib + ] branch ;

10 fib dup putn cr drop
`,
    expected: "55",
    note: "0 and 1 are already their own Fibonacci answers, so the true branch can stay empty.",
  },
  {
    id: "gcd",
    order: 9,
    title: "GCD",
    goal: "Find the greatest common divisor of two integers.",
    concepts: ["Euclid's algorithm", "%", "recursion", "tuck"],
    source: String.raw`.load /lib/core.ff

gcd: dup [ tuck % gcd ] [ drop ] branch ;

84 30 gcd dup putn cr drop
`,
    expected: "6",
    note: "Each step replaces `(a, b)` with `(b, a % b)` until `b` becomes `0`.",
  },
  {
    id: "reverse-digits",
    order: 10,
    title: "Reverse Digits",
    goal: "Reverse the decimal digits of a positive integer.",
    concepts: ["divrem", "queue helpers", "accumulators", "recursion"],
    source: String.raw`.load /lib/core.ff

rev-step:
  over
  [ swap 10 divrem q< swap 10 * q> + rev-step ]
  [ nip ]
  branch
;

reverse-digits: 0 rev-step ;

12034 reverse-digits dup putn cr drop
`,
    expected: "43021",
    note: "The accumulator builds the answer as the input shrinks, and numeric leading zeros disappear naturally.",
  },
  {
    id: "numeric-palindrome",
    order: 11,
    title: "Numeric Palindrome",
    goal: "Test whether a number reads the same forward and backward.",
    concepts: ["helper reuse", "=", "decomposition by digits"],
    source: String.raw`.load /lib/core.ff

rev-step:
  over
  [ swap 10 divrem q< swap 10 * q> + rev-step ]
  [ nip ]
  branch
;

reverse-digits: 0 rev-step ;
palindrome?: dup reverse-digits = ;

12321 palindrome? dup putn cr drop
`,
    expected: "1",
    note: "This is a good reminder that a small helper like `reverse-digits` pays off immediately.",
  },
  {
    id: "fizzbuzz",
    order: 12,
    title: "FizzBuzz",
    goal: "Print the FizzBuzz sequence from `1` to `n`.",
    concepts: ["nested branching", "%", "recursion", "visible output"],
    source: String.raw`.load /lib/core.ff

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
`,
    expected: String.raw`1
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
FizzBuzz`,
    note: "This version recurses first and prints second, so the output comes out in ascending order.",
  },
  {
    id: "collatz-steps",
    order: 13,
    title: "Collatz Step Count",
    goal: "Count how many Collatz steps it takes to reach `1`.",
    concepts: ["helper words", "branching", "recursive counting"],
    source: String.raw`.load /lib/core.ff

next-collatz: dup even? [ 2 / ] [ 3 * 1 + ] branch ;
collatz-steps: dup 1 > [ next-collatz collatz-steps ++ ] [ drop 0 ] branch ;

12 collatz-steps dup putn cr drop
`,
    expected: "9",
    note: "`next-collatz` holds the rule, and `collatz-steps` only has to count one step at a time.",
  },
  {
    id: "prime",
    order: 14,
    title: "Prime?",
    goal: "Ask whether a number is prime.",
    concepts: ["library loading", "predicates", "reuse"],
    source: String.raw`.load /lib/primes.ffp

29 prime? dup putn cr drop
`,
    expected: "1",
    note: "This is a good place to reuse `/lib/primes.ffp` instead of squeezing a long primality test into the starter editor.",
  },
  {
    id: "pascal-row",
    order: 15,
    title: "Pascal Row",
    goal: "Print one row of Pascal's triangle.",
    concepts: ["recursion", "formatting", "nck"],
    source: String.raw`.load /lib/core.ff

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
`,
    expected: "1 5 10 10 5 1",
    note: "`nck` does the math for each entry; the recursion only controls left-to-right order.",
  },
];
