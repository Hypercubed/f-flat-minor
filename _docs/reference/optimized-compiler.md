---
title: Optimized compiler
summary: Current shared TypeScript compiler pipeline, optimizer passes, inlining rules, and peephole optimizations.
order: 30
---

# Optimized compiler

The current optimized compiler is the shared TypeScript compiler plus the
shared TypeScript optimizer. Deno, Node, Bun, and the web playground all use the
same core implementation from `typescript/core/src/compiler.ts` and
`typescript/core/src/optimizer.ts`.

Optimization is optional in the command-line tools. Pass `--opt` or `-O` to run
it:

```sh
deno task compile --opt program.ffp
node node/bin/ff-compile.ts --opt program.ffp
bun bun/bin/ff-compile.ts --opt program.ffp
```

The web playground exposes the same optimizer through its optimize toggle.

## Pipeline

The optimized compile path is:

1. Preprocess `.ffp` input with `.load`, `.import`, `.m`, and stdlib support.
2. Tokenize the preprocessed source on whitespace.
3. Compile tokens to IR.
4. Validate the unoptimized IR unless validation is disabled.
5. Run the optimizer when `--opt` / `-O` is enabled.
6. Print IR, disassemble, or encode optimized IR to `.ffb` bytecode.

The optimizer does not change the language frontend. It receives ordinary IR
instructions:

```ts
{ op: "push" | "call", value: bigint, meta?: {...} }
```

During bytecode encoding, a `push` becomes `value << 1` and a `call` becomes
`(value << 1) | 1`. Calls to opcode `0` (`nop`) are dropped by the encoder.

## IR Metadata

The compiler attaches metadata that the optimizer uses:

| Metadata  | Source                                       | Optimizer meaning                                                                      |
| --------- | -------------------------------------------- | -------------------------------------------------------------------------------------- |
| `name`    | word names, pointers, strings, special forms | Preserves readable names in IR and direct-call lowering.                               |
| `pointer` | `[word]`, definition names, `.pointer`       | Marks a pushed integer as a word pointer. Referenced pointer definitions are retained. |
| `inline`  | `.inline`                                    | Forces inlining for the marked call or definition.                                     |
| `unsafe`  | `.unsafe`                                    | Prevents optimizer inlining for queue-sensitive calls or definitions.                  |
| `uid`     | optimizer-created anonymous definitions      | Gives a stable synthetic word id to a quotation.                                       |

Compiler directives apply to the previous IR instruction. For example,
`.inline` marks the previous instruction as safe to inline, and `.unsafe` marks
the previous instruction as unsafe for optimizer inlining.

## Optimizer Passes

`Optimizer.optimize()` resets state, records the pre-optimization IR size, and
then runs repeated optimization loops.

Each optimization loop does three things:

1. Run all peephole rules until no peephole rule matches.
2. Scan definitions and quotations into an internal definition map.
3. Inline eligible user-defined words.

The optimizer runs at least two loops and at most twenty loops. After the loop,
it pulls user definitions out of the main IR, replaces quotations with pointer
pushes, and then adds back only definitions still referenced by the optimized
main program or by other retained definitions.

The retained definition pass matters because F-flat-minor definitions are
runtime values: a word can be called directly or pushed as a pointer and later
evaluated. The optimizer keeps definitions that remain reachable through either
calls or pointer pushes.

## Peephole Optimizations

Peephole rules match short adjacent IR windows. The peephole engine scans from
left to right, applies the first matching rule, rewinds a little, and repeats
until a full scan makes no changes.

The current rules are listed below using source-level notation. These are
descriptions of the IR transformations, not a separate surface syntax.

### No-Op Removal

| Pattern | Replacement | Effect                        |
| ------- | ----------- | ----------------------------- |
| `nop`   | empty       | Removes explicit no-op calls. |

### Null Sequences

| Pattern      | Replacement | Effect                                                                   |
| ------------ | ----------- | ------------------------------------------------------------------------ |
| `swap swap`  | empty       | Swapping twice restores the original stack.                              |
| `dup drop`   | empty       | Duplicating and immediately discarding restores the original stack.      |
| `q< q>`      | empty       | Moving the top stack value to the queue and immediately back is a no-op. |
| `clock drop` | empty       | Reads the clock and discards the result.                                 |
| `rand drop`  | empty       | Reads a random value and discards the result.                            |
| `depth drop` | empty       | Reads stack depth and discards the result.                               |
| `~ ~`        | empty       | Bitwise NOT twice restores the original integer.                         |
| `n drop`     | empty       | Pushes a constant or pointer and immediately discards it.                |
| `0 eval`     | empty       | Evaluating pointer `0` is treated as a no-op.                            |

The `clock drop` and `rand drop` rules remove observable reads whose result is
unused. That is consistent with the optimizer's current treatment of those
words as removable when their value is immediately discarded.

### Direct-Call Lowering

| Pattern       | Replacement | Effect                                                                    |
| ------------- | ----------- | ------------------------------------------------------------------------- |
| `[word] eval` | `word`      | Converts an indirect call through a pushed pointer into a direct IR call. |

This also works for any pushed integer followed by `eval`; the replacement is a
direct `call` to that integer value. If the pushed pointer had a readable name,
the optimizer strips a leading `&` from that name for the resulting call
metadata.

### Constant Folding

| Pattern   | Replacement | Effect                                             |
| --------- | ----------- | -------------------------------------------------- |
| `a b +`   | `a+b`       | Folds addition of two pushed constants.            |
| `a b -`   | `a-b`       | Folds subtraction of two pushed constants.         |
| `a b *`   | `a*b`       | Folds multiplication of two pushed constants.      |
| `a b /`   | `a/b`       | Folds integer division when `b` is nonzero.        |
| `a b %`   | `a%b`       | Folds remainder when `b` is nonzero.               |
| `a b <<`  | `a<<b`      | Folds left shifts.                                 |
| `a b >>`  | `a>>b`      | Folds right shifts.                                |
| `a b &`   | `a&b`       | Folds bitwise AND.                                 |
| `a b \|`  | `a\|b`      | Folds bitwise OR.                                  |
| `a ~`     | `~a`        | Folds bitwise NOT.                                 |
| `a b <`   | `flag`      | Folds less-than comparisons to `1` or `0`.         |
| `a b =`   | `flag`      | Folds equality comparisons to `1` or `0`.          |
| `a b >`   | `flag`      | Folds greater-than comparisons to `1` or `0`.      |
| `a b ^`   | `a^b`       | Folds exponentiation when `b` is nonnegative.      |
| `a dup`   | `a a`       | Propagates a pushed constant through `dup`.        |

The `/` and `%` folds guard zero divisors. The `^` constant fold guards
negative exponents because native `bigint` exponentiation rejects them. The
`1 ^` identity is still safe for nonconstant bases because exponent `1` does
not trigger that runtime error.

### Algebraic Simplification

| Pattern  | Replacement | Effect                                                     |
| -------- | ----------- | ---------------------------------------------------------- |
| `0 +`    | empty       | Rewrites `a 0 +` to `a`.                                   |
| `swap +` | `+`         | Addition is commutative, so the swap is unnecessary.       |
| `0 -`    | empty       | Rewrites `a 0 -` to `a`.                                   |
| `1 *`    | empty       | Rewrites `a 1 *` to `a`.                                   |
| `swap *` | `*`         | Multiplication is commutative, so the swap is unnecessary. |
| `1 /`    | empty       | Rewrites `a 1 /` to `a`.                                   |
| `0 \|`   | empty       | Rewrites `a 0 \|` to `a`.                                  |
| `0 <<`   | empty       | Rewrites `a 0 <<` to `a`.                                  |
| `0 >>`   | empty       | Rewrites `a 0 >>` to `a`.                                  |
| `1 ^`    | empty       | Rewrites `a 1 ^` to `a`.                                   |
| `swap &` | `&`         | Bitwise AND is commutative, so the swap is unnecessary.     |
| `swap \|` | `\|`       | Bitwise OR is commutative, so the swap is unnecessary.      |
| `swap =` | `=`         | Equality is commutative, so the swap is unnecessary.        |

These are local stack-shape rewrites. For example, `0 +` means the adjacent
instructions `push 0` then `call +`; the left operand remains earlier in the IR.

### Control Flow

| Pattern                 | Replacement | Effect                                                          |
| ----------------------- | ----------- | --------------------------------------------------------------- |
| `0 [quote] ?`           | empty       | Removes a statically false conditional branch.                  |
| `n [quote] ?`, `n != 0` | `quote`     | Converts a statically true conditional branch to a direct call. |

The true-branch rule calls the pushed quotation pointer directly. It relies on
the same truth convention as the runtime: `0` is false and any nonzero integer
is true.

### Quotation Compaction

| Pattern    | Replacement | Effect                                                   |
| ---------- | ----------- | -------------------------------------------------------- |
| `[ ]`      | `[0]`       | Replaces an empty quotation with pointer `0`.            |
| `[ word ]` | `[word]`    | Replaces a single-word quotation with that word pointer. |

This works with the `0 eval` rule: an empty quotation that is immediately
evaluated can disappear after repeated peephole passes.

The single-word rule only compacts quotations whose body is one call
instruction. Numeric quotations such as `[ 1 ]` remain anonymous definitions.

## Inlining

After each peephole phase, the optimizer records user definitions and inlines
eligible calls.

A user word is inlined when:

- the call itself is not marked `.unsafe`;
- the target definition exists in the optimizer's definition map;
- the optimizer is not already inlining that same word recursively;
- the definition terminator is not marked `.unsafe`;
- either the call or definition is marked `.inline`, or the definition is small.

Small definitions are currently inlined when the full stored definition length
is at most `7` IR instructions. Stored definitions include the pointer, `:`,
body, and `;`, so this corresponds to a body of four IR instructions or fewer.

When `.inline` is present on the call or definition, the optimizer inlines the
definition body with an effectively unlimited length limit. Recursive inlining
is still blocked by the `seen` list.

The body inserted during inlining excludes the definition wrapper:

```text
[word] : body... ;
```

becomes:

```text
body...
```

## Definition Pulling And Retention

The optimizer separates definitions from the main program after its repeated
passes:

- Named definitions are removed from the main IR and stored by word id.
- Anonymous quotations are assigned synthetic ids above the system opcode range.
- Anonymous quotations are converted into named-definition-shaped IR internally.
- The main program receives a pointer push where the quotation originally was.
- Only definitions referenced by calls or pointer pushes are added back to the
  front of the optimized IR.

This final layout keeps bytecode compact by dropping dead definitions while
preserving words that are still callable or evaluable through pointers.

## Statistics

When `--stats` is used with `--opt`, the CLI prints optimizer counters:

| Counter                       | Meaning                                       |
| ----------------------------- | --------------------------------------------- |
| `pre_optimization_ir_size`    | Input IR instruction count.                   |
| `post_optimization_ir_size`   | Final optimized IR instruction count.         |
| `user_defined_anon_defs`      | Anonymous quotations found on the first pass. |
| `user_defined_named_defs`     | Named definitions found on the first pass.    |
| `post_optimization_user_defs` | Definitions retained after optimization.      |
| `inlined_calls`               | Calls replaced with definition bodies.        |
| `peephole_optimizations`      | Peephole rule applications.                   |
| `optimization_passes`         | Whole optimizer loop count.                   |

## Current Limits

The optimizer is intentionally local and simple. It is not a dataflow optimizer,
does not infer stack effects, and does not prove general equivalences.

Notable current gaps:

- no stack-effect-aware rewrites beyond fixed adjacent instruction windows;
- no general dead-code analysis inside retained definitions;
- no replacement of empty named definitions with a direct no-op strategy.

See [`.agents/docs/plans/typescript-optimizer-peephole-candidates.md`](../../.agents/docs/plans/typescript-optimizer-peephole-candidates.md) for planned peephole
extensions that are not part of the current optimizer yet.
