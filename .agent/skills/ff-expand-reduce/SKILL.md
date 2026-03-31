---
name: ff-expand-reduce
description: >-
  Expand a complex F♭m word to primitives (optionally showing queue form), apply stack-rewrite
  reductions, then resynthesize names—including new helpers when patterns repeat. Use when asked to
  "perform expand-reduce on word YYY" or refactor queue-heavy or deeply nested dip code.
---

# Expand–reduce–resynthesize (F♭m stack refactor)

**Invocation:** Tell the agent: **"Perform expand-reduce on `WordName` in `path/to/file.ffp`."**  
Short alias: **ERS** (Expand → Reduce → Resynthesize).

## When to use

- A word mixes **`dip`**, **nested quotations**, and/or **`q<` / `q>`**.
- You want the **simplest equivalent** under project rewrite rules before naming or extracting helpers.
- You are **reviewing** whether a shuffle is redundant (e.g. unary + `dup` + `drop` under `dip`).

## Phase 1 — Expand (substitute toward primitives)

1. Resolve the word body; follow `.import` chains from the **source file’s directory**.
2. **Recursively inline** user/library words until you hit the **primitive floor** (typically [`ff/lib/core/core.ff`](../../../ff/lib/core/core.ff)), unless the user caps depth or asks to keep a helper black-boxed.
3. **Optional but useful for analysis:** expand **`[ X ] dip` → `q< X q>`** (inverse of the mechanical rule in [`_docs/stack-rewrites-and-annotations.md`](../../../_docs/stack-rewrites-and-annotations.md)). Nested `dip` becomes nested `q<` / `q>`. This makes queue behavior **visible** for pairing and `.unsafe` review.
4. **`dip` definition:** `swap slip` with `slip` = `q< eval q>` — full expand may show raw queue ops.

## Phase 2 — Reduce (apply documented rewrites)

Before **every** nontrivial rewrite: write **before/after stack effects** (full depth; include **queue** if `q<`/`q>` appear). If the replacement needs a **different input shape**, it is invalid.

Apply reductions from [`_docs/stack-rewrites-and-annotations.md`](../../../_docs/stack-rewrites-and-annotations.md), including:

- No-ops (`swap swap`, `q< q>`, `dup drop`, …), collapses (`drop2`, `nip`), **core canonicalizations** (`rot swapd` → `dig`, …).
- **Queue ↔ `dip`:** usually **reduce** by **`q< X q>` → `[ X ] dip`** on **innermost** pairs (inside-out); respect `.unsafe` rules for cross-word queue.
- **Unary / redundant `dup`** under `dip` (see doc subsection).
- **Branch** simplifications where applicable.

**Direction:** Expand often **materializes** queue; reduce often **prefers** readable `dip` / core words when the queue region is local.

## Phase 3 — Resynthesize (names and optional new words)

1. Match the reduced sequence against **existing** words in `core.ff` and imports (prefer **longest** readable match).
2. **Extract new** `__` helpers or **core** words when the **same** reduced pattern **repeats** or clarifies intent (e.g. `dipd` for `swap q< swap q< eval q> q>`). Follow [`ff-math-internal-naming`](../ff-math-internal-naming/SKILL.md) in `ff/lib/math/`.
3. Do **not** add new **public** API names without an explicit product decision.

## Pitfalls

- **Integer-scaled** pipelines: `floor(a) - floor(b)` ≠ `floor(a - b)` in general — tests must match the **implementation’s** truncation model, not a single float `floor`.
- **Branch tests:** identities can hide wrong branches — cover **each** code path with distinct goldens.
- **`.unsafe`:** unbalanced queue across **callers**; **balanced** `q<`…`q>` **inside** a word (e.g. `dipd`) is **not** unsafe.

## Verification

Run relevant [`ff/lib/**/__tests__/*.test.ffp`](../../../ff/lib/math/__tests__/) or `chomp test:tap` / `chomp test:deno` per [`AGENTS.md`](../../../AGENTS.md).

## References

- [`_docs/stack-rewrites-and-annotations.md`](../../../_docs/stack-rewrites-and-annotations.md)
- [`_docs/stack-notation.md`](../../../_docs/stack-notation.md)
- [`_docs/core-vocabulary.md`](../../../_docs/core-vocabulary.md)

## Pilot example (exp)

`__parts` in [`ff/lib/math/exp.ffp`](../../../ff/lib/math/exp.ffp): nested `[ [ __terms ] dip ] dip` on `n u v` is equivalent to **`[ __terms ] dipd`** (core `dipd` = stash top two, run quotation on `n`). One-line resynthesis; behavior unchanged through `nexp` / tests.
