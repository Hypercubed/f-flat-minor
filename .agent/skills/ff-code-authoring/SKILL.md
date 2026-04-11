---
name: ff-code-authoring
description: Use when writing, debugging, or refactoring f-flat-minor programs (.ff or .ffp), including syntax rules, stack-effect-first design, control flow, and runtime-specific validation.
---

# f-flat-minor Code Authoring

Use this skill when the task is to implement or fix f-flat-minor code.

## Tool bootstrap

- Use `mise x -- ...` for commands that depend on repo-managed tools such as `node`, `bun`, `deno`, `npm`, and `chomp`.
- If a managed tool is missing, run `mise install` once from the repo root, then retry the command with `mise x -- ...`.
- Do not switch runtimes just because a bare command is missing from `PATH`.

## Pick the right runtime first

- Use Python for `.ff`:
```bash
cat <file>.ff | python3 python/execute.py
```
- Use Node or Deno for `.ffp` (preprocessor required):
```bash
mise x -- node node/bin/ff-run.ts <file>.ffp
mise x -- node node/bin/ff-run.ts -t <file>.ffp
```
- Do not use Python for `.ffp`.

## Fbm+ preprocessor and compiler commands

- By convention, files requiring preprocessing use `.ffp`.
- Words starting with `.` (except `.` itself) are compiler/preprocessor commands.
- Compiler/preprocessor commands are not pushed to the data stack.
- If an implementation does not support a command, it should ignore it.

Common commands:
- `.load`: load another file in place
- `.include`: like `.load`, but only once per file
- `.m`: compile-time macro execution (line remainder is executed and emitted)
- `.inline`: mark previous definition as safe to inline
- `.unsafe`: mark previous definition as not safe to inline

Practical preprocessing pipelines from `README.md`:
```bash
mise x -- deno run -A deno/bin/ff-preprocess.ts my_file.ffp | ./ccp/build/run
./racket/main.rkt --pp-only ./ff/fact.ffp | python3 python/execute.py
```

## Authoring workflow

1. Write the target stack effect before implementing a word.
- Use the standard notation from `_docs/supplemental/stack-notation.md`:
```ff
/* n ! == n! */
/* a [B] dip == b* a */
/* … sum! == n */
```

2. Build small helpers first, then compose.
- Define words with `name: ... ;`.
- Keep helpers focused on one stack transform.

3. Validate incrementally.
- Run tiny probes before integrating into larger programs.
- For stack-order bugs, use trace mode:
```bash
mise x -- node node/bin/ff-run.ts -t <file>.ffp
```
- For LLM/agent parsing, prefer machine-readable traces:
```bash
mise x -- node node/bin/ff-run.ts -t --trace-format jsonl <file>.ffp
```
- Add `--trace-verbose` for extra fields, and bound output with
  `--trace-queue-max` / `--trace-stack-max` when debugging large programs.
- Trace output is written to `stderr`, so normal program output remains on `stdout`.

4. Confirm end-state correctness.
- Verify final stack shape matches expected output contract.
- Ensure cleanup removes temporaries but preserves the result.

## Language essentials

- Everything is an integer (big integer semantics).
- Booleans are numeric: `0` is false, non-zero is true.
- Math is reverse polish: `a b +`, `a b -`, `a b *`, `a b /`, `a b %`, `a b ^`.
- Control flow uses quotation + `?`: `test [ ... ] ?`.
- Quotations require whitespace padding around brackets: `[ 1 2 + ]`.
- `[ word ]` is a quote; `[word]` is a pointer to a word.
- Strings push character codes; spaces inside strings use `\s`.
- Definitions are created with `name: ... ;` and cannot be mutated/overridden.

## Core words to reach for

- Stack: `dup`, `swap`, `drop`, `depth`, `clr`.
- Queue: `q<`, `q>`.
- Comparison: `=`, `<`, `>`.
- IO: `.`, `putc`, `putn`.

## Queue safety

- Treat queue usage as fragile.
- Pair every `q<` with a matching `q>` on all execution paths.
- Re-check ordering when queue ops are mixed with recursion or nested helpers.
- **Queue-safe invariant**: all public words treat the incoming queue as unknown and
  inconsequential. A word must not implicitly consume or rewrite items left in the queue
  by a caller.
- Words that violate this must be marked `.unsafe`.
- Show queue state inline after `|` in per-line annotations: `/* stack | queue */`.
  The queue is LIFO: `q<` pushes to back (right), `q>` pops from back (right).

## Rewriting techniques

- Use `_docs/supplemental/stack-rewrites-and-annotations.md` as the canonical guide for:
  - per-line stack-effect comments
  - queue-state annotation with `| queue`
  - no-op removal
  - core-word canonicalization
  - `q< ... q>` to `dip` rewrites
  - helper extraction vs reuse
  - full stack-effect verification before accepting a rewrite
- For substantial refactors, follow that document’s workflow: annotate first, rewrite second,
  then verify with tests.

## Style and reliability notes

- Use multiline comments: `/* ... */`.
- Comments cannot be nested.
- For large numeric literals, use underscores for readability.
- Prefer readable, intention-revealing word names for public words.
- Keep stack discipline explicit: if a transform is subtle, split it into a helper word.

## Reference

- Language examples: `_docs/supplemental/fbm-by-example.md`
- Stack notation: `_docs/supplemental/stack-notation.md`
- Stack rewrites and annotations: `_docs/supplemental/stack-rewrites-and-annotations.md`
