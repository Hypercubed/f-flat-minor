---
name: ff-expand-reduce
description: >-
  Expand a complex F♭m word to primitives (or core normal form), reduce with stack-safe rewrites,
  then resynthesize to canonical readable words. Supports autonomous multi-word passes with
  success/failure tracking and iteration.
---

# Expand–reduce–resynthesize (F♭m stack refactor)

**Invocation:** Tell the agent: **"Perform expand-reduce on `WordName` in `path/to/file.ffp`."**  
Short alias: **ERS** (Expand → Reduce → Resynthesize).

## When to use

- You want the **simplest equivalent** under project rewrite rules before naming or extracting helpers.
- You are **reviewing** whether a shuffle is redundant (e.g. unary + `dup` + `drop` under `dip`).
- You want an **autonomous cleanup pass** over several words with minimal human intervention.

## Output contract (always)

For each target word, return:
1. Original body and contract.
2. Expanded form (or explicit reason expansion stopped early).
3. Reduction log (each nontrivial rewrite + stack-effect check).
4. Final resynthesized body.
5. Verification result (tests/probes run).
6. `status: success|blocked` with blocker reason.

## Phase 1 — Expand (substitute toward primitives)

1. Resolve the word body; follow `.import` chains from the **source file’s directory**.
2. Expansion modes (pick one and state it):
   - **full-floor (default):** recursively inline user/library words until the floor is reached.
   - **structural:** inline only combinators/shuffles and keep math/algorithm helpers opaque by contract. Use this only when the user explicitly wants a lighter review or when full-floor expansion would bury the relevant local transform.
3. Primitive floor guidance:
   - Treat VM primitives and true irreducible core floor words as floor (including combinators like `?` that may not live in `core.ff`).
   - Core convenience words such as `rot`, `dig`, `bury`, `over`, `nip`, `tuck`, `dip`, and `dipd` are **not** floor in full-floor mode; expand them when possible.
   - Do **not** stop at readable core aliases in full-floor mode; the point is to expose hidden stack shuffles before reduction.
4. **Optional queue view:** expand **`[ X ] dip` → `q< X q>`** (inverse of mechanical rewrite in [`_docs/stack-rewrites-and-annotations.md`](../../../_docs/stack-rewrites-and-annotations.md)). Use this when queue pairing or `.unsafe` review matters.
5. **`dip` definition:** `swap slip` with `slip` = `q< eval q>` — full expand may expose raw queue ops.
6. In full-floor mode, continue expansion through convenience shuffles until reaching only floor words or an explicit stop boundary (`.unsafe`, user-capped depth, or black-boxed helper).
7. **Single-word pointer normalization (expand phase):** when a pointer token is written as `[X]` (single word only, e.g. `[eval]`), normalize it to `[ X ]` before applying additional expansion rules.
   - Apply only when the interior is exactly one word token.
   - If the body has whitespace, nested quotes, or multiple words (e.g. `[ dig ... ]`, `[ * * ]`), this is **not** a pointer form and must remain a normal quotation.

## Phase 2 — Reduce (apply documented rewrites)

Before **every** nontrivial rewrite: write **before/after stack effects** (full depth; include **queue** if `q<`/`q>` appear). If the replacement needs a **different input shape**, it is invalid.

Apply reductions from [`_docs/stack-rewrites-and-annotations.md`](../../../_docs/stack-rewrites-and-annotations.md), including:

- No-ops (`swap swap`, `q< q>`, `dup drop`, …), collapses (`drop2`, `nip`), **core canonicalizations** (`rot swapd` → `dig`, …).
- **Queue ↔ `dip`:** usually **reduce** by **`q< X q>` → `[ X ] dip`** on **innermost** pairs (inside-out); respect `.unsafe` rules for cross-word queue.
- **Unary / redundant `dup`** under `dip` (see doc subsection).
- **Branch** simplifications where applicable.
- Empirical canonicalizations found during skill validation: `dup bury` -> `tuck`, integer `1 << 10 /` -> `/ 5` when the intermediate value is known integer-scaled.

Also run a **compiler-parity peephole pass** (inspired by `typescript/core/src/optimizer.ts`) when source-level equivalents are obvious and stack-safe:
- Commutative canonicalization: `swap +` -> `+`, `swap *` -> `*`.
- Literal algebraic simplifications: `0 +` -> no-op, `1 *` -> no-op, `1 /` -> no-op, `0 -` -> no-op (for `x 0 -` shape).
- Constant folding: literal-literal arithmetic (`+ - * /` with nonzero divisor) -> single literal.
- Direct-call canonicalization: pointer+eval/call forms that directly name a known word -> direct call of that word.
- Local queue shuffle canonicalization (balanced local region only): `a q< b q>` -> `b a`.

Do not import VM/IR-only rewrites that have no source-level equivalent (for example, internal `BRA/KET` pointer encoding transforms).

**Direction:** Expand often **materializes** queue; reduce often **prefers** readable `dip` / core words when the queue region is local.

### Mechanical-substitution exception

For purely mechanical `q< ... q>` ↔ `[ ... ] dip` conversion on a **balanced local pair**, you may skip full re-derivation line-by-line, but still provide a short effect sanity check at the pair boundary.

### Canonical preference order (deterministic tie-break)

When multiple equivalent outputs exist, choose by:
1. Preserves exact stack/queue contract.
2. Uses existing **core combinators** (`dipd`, `dig`, `bury`, `over`, `nip`, `drop2`, etc.).
3. Fewer queue words (`q<`/`q>`) when queue is local.
4. Fewer total tokens.
5. Better readability of intent (named words over ad hoc shuffles).

If still tied, keep the current source form.

### Common deep-stash canonicalization

Prefer `dipd` over nested `dip` when equivalent:
- `[ [ X ] dip ] dip` -> `[ X ] dipd`
- Queue view: `q< q< X q> q>` -> `[ X ] dipd`

Use this when the quotation acts on the third stack item while top two are temporarily stashed/restored.

### Report intermediate states when useful

When a user is evaluating the skill itself, explicitly report:
1. original body
2. after full-floor expansion
3. after reduction (before resynthesis)
4. final resynthesized body

Do not skip these intermediate forms just because the final answer is a no-op.

### `.unsafe` queue guidance (critical)

Use this checklist whenever queue words cross word boundaries or the word starts with `q>`.

1. Classify queue usage first:
   - **local-balanced:** all `q<`/`q>` pairs close within the same word body.
   - **cross-boundary (`.unsafe`):** the word consumes queue set by caller, leaves queue for caller, or starts with `q>`.
2. For local-balanced regions, normal ERS queue↔`dip` rewrites are allowed.
3. For cross-boundary regions:
   - Do **not** rewrite away boundary queue ops as if they were local pairs.
   - Only rewrite fully self-contained innermost pairs that remain inside the same boundary context.
   - Preserve entry/exit queue contract exactly (include queue state in before/after effects).
4. Start-with-`q>` rule:
   - Treat leading `q>` as explicit dependency on caller queue state.
   - Mark/keep `.unsafe` unless a full refactor makes queue balanced internally.
   - Any rewrite that removes or reorders this dependency is invalid unless equivalence is proven with boundary-aware tests.
5. Inlining rule:
   - If queue ops move from callee to caller during inlining, move `.unsafe` ownership to the smallest word still owning cross-boundary behavior.
6. Stop condition:
   - If queue ownership becomes ambiguous, stop and return `status: blocked` with the ambiguous region called out.

## Phase 3 — Resynthesize (names and optional new words)

1. Match the reduced sequence against **existing** words in `core.ff` and imports (prefer **longest** readable match).
2. **Extract new** `__` helpers or **core** words when the **same** reduced pattern **repeats** or clarifies intent (e.g. `dipd` for `swap q< swap q< eval q> q>`). Follow [`ff-math-internal-naming`](../ff-math-internal-naming/SKILL.md) in `ff/lib/math/`.
3. Do **not** add new **public** API names without an explicit product decision.
4. Stop when any of these is true:
   - No legal rewrite improves canonical preference order.
   - Rewrites oscillate between two equivalent forms.
   - Further expansion would cross chosen mode boundary (structural/full-floor).
5. Inline policy parity with compiler optimizer:
   - Prefer inlining tiny helpers or words marked inline.
   - Do **not** inline across `.unsafe` ownership boundaries.
   - Do **not** inline recursive cycles.
6. **Single-word pointer normalization (resynthesis phase):** when the reduced output contains `[ X ]` with exactly one word token inside, you may resynthesize it to `[X]`.
   - Never compact quotes that contain multiple words, nested quotes, or interior whitespace-separated tokens.
   - Invalid examples (must stay quoted): `[ dig [ * * ] dip ]`, `[ * * ]`, `[ rot __parts ]`.
7. **Required pointer inventory pass (before final output):**
   - For each touched word/file, enumerate every single-word quote candidate in source form (`[ x ]` or `[x]` where `x` is one token).
   - Mark each candidate as `normalized` or `kept` with a one-line reason.
   - Do not return success if any eligible single-word candidate is omitted from this checklist.

## Pitfalls

- **Integer-scaled** pipelines: `floor(a) - floor(b)` ≠ `floor(a - b)` in general — tests must match the **implementation’s** truncation model, not a single float `floor`.
- **Branch tests:** identities can hide wrong branches — cover **each** code path with distinct goldens.
- **`.unsafe`:** unbalanced queue across **callers**; **balanced** `q<`…`q>` **inside** a word (e.g. `dipd`) is **not** unsafe.
- Start-with-`q>` words are boundary-dependent by default; do not treat them as local queue words during reduction.
- Spelling is semantic (`negitive?` etc.): never "correct" symbol names during rewrite unless intentionally renaming API.

## Verification

Run relevant [`ff/lib/**/__tests__/*.test.ffp`](../../../ff/lib/math/__tests__/) or `chomp test:tap` / `chomp test:deno` per [`AGENTS.md`](../../../AGENTS.md).

For autonomous passes, use this minimum verification:
1. Run nearest TAP test file(s) for touched library area.
2. Add one tiny direct probe for each rewritten word if no tests cover it.
3. Mark result `blocked` if verification cannot be executed.

For a `no-op` verdict, add one more check:
4. Run a small redex audit over the target word/file for known high-confidence patterns before declaring it reduction-free.

If that audit finds a candidate pattern, downgrade the result from `success/no-op` to `needs review` unless you can explain why the pattern is intentionally unreduced.

### Required pre-`no-op` checklist

Before returning `success/no-op`, include this explicit checklist in the report:

1. **Queue pair inventory:** list every local-balanced `q< ... q>` region seen in the target word/body.
2. **Disposition for each pair:** mark each inventory item as either:
   - `rewritten` -> show the exact `q< ... q>` -> `[ ... ] dip` (or equivalent canonical) replacement, or
   - `kept-intentionally` -> give a one-line reason (for example cross-boundary ownership, readability tie-break, or proven canonical fixed point).
3. **No silent omissions:** if any local-balanced pair is neither rewritten nor explicitly justified, the verdict is not `no-op`; return `needs review`.
4. **Boundary sanity:** for every `kept-intentionally` item, state whether it is local-balanced or cross-boundary and why `.unsafe` rules prevent/allow rewrite.

Legacy/non-TAP guidance:
- If the area uses legacy `.ffp` golden/print tests, run the documented runtime via `mise exec -- chomp ...` for that area (see `AGENTS.md`), and compare produced output to expected `.out`/golden behavior.
- If no harness exists, run a minimal direct invocation probe and report it explicitly as weaker evidence.

## Autonomous mode (multi-word, low-touch)

Use when asked to improve many words with minimal intervention.

1. Build candidate list (queue-heavy, nested `dip`, repeated shuffles, `.unsafe` boundaries).
2. Run ERS on 3-5 words in parallel.
3. Score each result: `passed tests`, `simpler canonical form`, `no contract drift`.
4. Keep wins, revert/no-op losses, record failure reasons.
5. Update this skill with the new failure pattern + guardrail.
6. Repeat once more on a fresh batch.

When a file is judged `no-op`, do not trust a single agent pass blindly. Prefer either:
- a second independent review, or
- a lightweight static audit for known patterns.

This is a local "best-of-n" heuristic inspired by:
- peephole optimization in stack languages (local pattern reduction),
- equality-saturation thinking (consider multiple equivalent forms before picking),
- superoptimization practice (optimize only when equivalence is validated).

## References

- [`_docs/stack-rewrites-and-annotations.md`](../../../_docs/stack-rewrites-and-annotations.md)
- [`_docs/stack-notation.md`](../../../_docs/stack-notation.md)
- [`_docs/core-vocabulary.md`](../../../_docs/core-vocabulary.md)

## Pilot example (exp)

`__parts` in [`ff/lib/math/exp.ffp`](../../../ff/lib/math/exp.ffp): nested `[ [ __terms ] dip ] dip` on `n u v` is equivalent to **`[ __terms ] dipd`** (core `dipd` = stash top two, run quotation on `n`). One-line resynthesis; behavior unchanged through `nexp` / tests.
