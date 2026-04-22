---
id: hybrid_ers_implementation_plan
title: "Hybrid ERS Implementation Plan"
last_updated: 2026-04-10
description: >
  Below is a concrete implementation plan for a **hybrid ERS system**: a s
  mall static tool handles the deterministic expand/reduce/resynthesize st
  eps, while the skill remains responsible for ambiguous choices, reportin
  g, and higher-level revi...
tags: [plans]
status: active
kind: initiative
author_kind: ai
prompter: "GPT-5.4"
---
# Hybrid ERS Implementation Plan

Below is a concrete implementation plan for a **hybrid ERS system**: a small static tool handles the deterministic expand/reduce/resynthesize steps, while the skill remains responsible for ambiguous choices, reporting, and higher-level review.

## Progress vs this document (as of 2026-04-02)

### In repo today

- **Phase 1 (read-only analyzer) — partially implemented**
  - **`ers audit`** exists: `tools/ers/` (`auditSource`, safety model, inventories, JSON + human CLI output via `node/bin/ers.ts` and Deno `deno/bin/ers.ts`).
  - **Single-file analysis:** implementation uses `typescript/compile-service` **`compileSource`** on one buffer; **import resolution and cross-file symbol tables are not yet implemented** in the shipped analyzer (still listed under *Target architecture* / Milestone 1).
  - **Tests:** e.g. `deno/src/ers_audit_test.ts` exercises audit behavior.
- **Phase 2+ (rewrite / closure / suggest)** — not implemented as CLI commands yet; plan below remains the target.
- **Editor integration:** VS Code extension can run the bundled audit CLI; see **`vscode-ers-definition-commands.md`** for command + hover UX (**Progress** section there).

### Gaps called out in this plan but not done

- Import-following analyzer outputs (“imports followed from source directory”) and unified definition/reference model.
- `ers rewrite`, `ers suggest`, `ers check`, closure passes, CI enforcing mode — all still future work.

## Target architecture

### Goal
Build an `ers` toolchain with three layers:

1. **Parser + analyzer**
   - Parse `.ff` / `.ffp`
   - Resolve imports
   - Build word definitions and references
   - Annotate queue usage, quote shapes, and primitive/core/helper classifications

2. **Deterministic rewrite engine**
   - Expand selected forms
   - Apply proven local rewrites
   - Re-run to closure
   - Produce a machine-readable audit log

3. **Agent skill on top**
   - Chooses mode (`full-floor` vs `structural`)
   - Decides whether to accept or reject lower-confidence rewrites
   - Decides helper extraction / naming
   - Summarizes blocked regions and test evidence

This split keeps the mechanical parts in a tool and the judgment-heavy parts in the skill.

## Scope split

### Put into the tool first
Start with the parts that are explicit, local, and deterministic:

- single-word pointer normalization (`[ X ]` ↔ `[X]` for one token only)
- local balanced `q< ... q>` inventory
- local queue-to-`dip` rewrite
- wrapper-use canonicalization (`q< eval q>` → `slip`, etc.)
- canonical preference for named combinators like `dipd`
- basic peepholes and no-op reductions
- mandatory multi-pass closure loop
- required inventories for `no-op` or `success` verdicts

### Leave in the skill
Keep these in the agent skill:

- whether to run `full-floor` or `structural`
- whether readability justifies a change
- whether to extract a `__` helper
- whether a boundary-dependent case is safely provable
- how to explain a blocked region
- how much verification is sufficient when the harness is weak

## Implementation plan

### Phase 0 — Freeze the rewrite contract
Create a versioned spec document, separate from the skill, that lists:

- rewrite names
- match conditions
- preconditions
- proof obligations
- whether each rule is:
  - `safe-local`
  - `safe-with-analysis`
  - `review-required`

Example categories:

| Category | Examples |
|---|---|
| safe-local | `[ X ]` → `[X]`, `swap +` → `+`, `q< X q>` → `[X] dip` for local balanced region |
| safe-with-analysis | `[[ X ] dip ] dip` → `[X] dipd`, wrapper-use canonicalization, direct-call canonicalization |
| review-required | helper extraction, structural/full-floor stop, `.unsafe` ownership refactors |

This prevents the skill from turning into an optimizer spec.

### Phase 1 — Build a read-only ERS analyzer
Implement `ers audit` first. Do **not** rewrite anything yet.

#### Inputs
- file path(s)
- target word(s)
- mode flag: `full-floor` or `structural`

#### Outputs
JSON plus human-readable report:

- resolved word body
- imports followed from source directory
- queue inventory
- single-word pointer inventory
- candidate rewrite list
- boundary classification:
  - local-balanced
  - cross-boundary
  - starts with `q>`
- primitive/core/helper classification
- closure estimate: “N obvious rewrites found”

#### Why first
It gives immediate value in CI and lets the agent use the tool before autofix exists.

#### Minimum internal model
You do **not** need full semantic understanding on day one. The analyzer only needs:

- token stream
- quotation nesting
- word definition boundaries
- import resolution
- queue balance tracking inside a word
- symbol table with a few classifications:
  - primitive
  - semantic-anchor
  - core alias
  - user/helper

### Phase 2 — Implement safe-local rewrites
Add `ers rewrite --safe-local`.

#### Initial rewrite set
Implement only high-confidence, syntax-local rules:

1. **Single-word pointer normalization**
   - expand-side normalize `[X]` → `[ X ]`
   - resynthesis-side compact `[ X ]` → `[X]`
   - only when interior is exactly one token

2. **Balanced local queue pair to `dip`**
   - `q< X q>` → `[X] dip`
   - only for local balanced regions
   - preserve cross-boundary regions

3. **Named wrapper-use canonicalization**
   - `q< eval q>` → `slip`
   - `q< dup q>` → `dupd`
   - `q< swap q>` → `swapd`
   - only for uses, not definitions of primitive wrappers

4. **Peephole algebra**
   - `swap +` → `+`
   - `swap *` → `*`
   - `0 +` no-op
   - `1 *` no-op
   - constant folding on literal-literal arithmetic

5. **Simple no-op reductions**
   - `swap swap`
   - `q< q>`
   - `dup drop`
   - other already-documented local redexes

#### Output
Every rewrite should emit:
- rule id
- exact span
- before
- after
- short safety reason

### Phase 3 — Add closure and inventories
Add fixed-point rewriting and mandatory inventories.

#### Commands
- `ers rewrite --safe-local --closure`
- `ers audit --require-clean`

#### Behavior
- run pass 1
- rebuild inventories
- run pass N
- stop only when a pass produces zero rewrites
- emit `pass1=... pass2=... pass3=0`

#### CI checks
Add two CI modes:

- **advisory**
  - report missed rewrites
- **enforcing**
  - fail if high-confidence rewrites remain

This reduces the number of ERS misses the agent has to catch manually.

### Phase 4 — Add lightweight stack/queue legality checks
Now upgrade from syntax-only to proof-assisted rewrites.

#### Needed for
- `dipd` canonicalization
- `dig` / `bury` / `tuck` class rewrites
- direct-call canonicalization
- some branch simplifications

#### Approach
Do not aim for a full theorem prover. Use a small effect system:

- each primitive/core word gets declared stack effect metadata
- quotes can carry effect summaries when single-word or known
- balanced local queue regions get queue effect summaries
- rewrite rules declare required shape constraints

Then require effect equality at the rewrite boundary.

### Phase 5 — Add review-required suggestions
Now support the agent without auto-applying.

#### `ers suggest`
Return candidates such as:

- `[[ X ] dip ] dip` ⇒ candidate `[X] dipd`
- repeated reduced pattern ⇒ candidate helper extraction
- equivalent longest-match resynthesis candidates
- “blocked due to ambiguous `.unsafe` ownership”

The tool should **not** apply these automatically unless explicitly told. The agent skill reads the suggestions and decides.

### Phase 6 — Integrate into the skill
Refactor the skill so the agent calls the tool rather than re-deriving everything by hand.

#### Revised skill flow
1. Run `ers audit`
2. If only safe-local rewrites are present, run `ers rewrite --safe-local --closure`
3. Re-run `ers audit`
4. If remaining suggestions are review-required:
   - explain them
   - choose or decline them
5. Run tests
6. Report outcome

#### Net effect
The skill becomes shorter and higher-value:

- less “remember every local redex”
- more “decide what to do with ambiguous cases”

## Suggested command surface

A small CLI is enough:

```bash
ers audit ff/lib/math/exp.ffp --word __series_loop --mode full-floor
ers rewrite ff/lib/seq/seq.ffp --word reverse! --safe-local --closure
ers suggest ff/lib/core/core.ff --word dipd
ers check ff/lib/**/*.ffp --changed-only
```

### Machine-readable output
Prefer JSON like:

```json
{
  "word": "__series_loop",
  "mode": "full-floor",
  "queue_regions": [
    {"kind": "local-balanced", "span": "...", "disposition": "rewritable"}
  ],
  "pointer_candidates": [
    {"text": "[ __series_step ]", "normalized": true}
  ],
  "rewrites": [
    {"rule": "nested-dip-to-dipd", "confidence": "review-required"}
  ],
  "passes": [
    {"pass": 1, "applied": 1},
    {"pass": 2, "applied": 0}
  ]
}
```

## Recommended repo layout

```text
tools/ers/
  parser/
  ast/
  symbols/
  effects/
  rules/
    safe_local/
    safe_with_analysis/
    review_required/
  cli/
  tests/
_docs/
  ers-rewrite-spec.md
  ers-rule-catalog.md
.agents/skills/
  ff-expand-reduce/SKILL.md
```

## Testing strategy

### 1. Golden rewrite tests
For each rule:
- input source
- expected rewritten source
- expected inventories

### 2. Negative tests
Especially for:
- `.unsafe`
- cross-boundary queue
- starts-with-`q>`
- primitive wrapper definitions
- multi-token quotes that must not compact

### 3. Equivalence tests
For rules with effect validation:
- before/after stack probes
- TAP tests for touched library areas
- targeted regression suites such as `core.test.ffp` and `sqrt.test.ffp`

### 4. No-op honesty tests
Assert that a tool claiming `success/no-op` must include:
- queue inventory
- pointer inventory
- disposition for every candidate

## Delivery order

### Milestone 1 — Useful quickly
- parser *(compile-service tokenize + compile path in use for audit)*
- import resolution *(deferred; audit is single-file today)*
- queue inventory *(present in audit output)*
- pointer inventory *(present in audit output)*
- advisory audit command *(**done:** `ers audit`)*

### Milestone 2 — Immediate ROI
- safe-local rewrites
- closure loop
- autofix mode
- CI check for missed high-confidence rewrites

### Milestone 3 — Hybrid becomes real
- effect metadata
- safe-with-analysis rules
- suggest mode for review-required candidates

### Milestone 4 — Agent simplification
- shrink the ERS skill
- make the tool the default first step
- use the skill only for judgment-heavy cases

## Best first rules to implement

Start with these ten:

1. `[ X ]` ↔ `[X]` single-token normalization
2. local balanced `q< X q>` → `[X] dip`
3. wrapper-use canonicalization to `slip` / `dupd` / `swapd`
4. `swap +` → `+`
5. `swap *` → `*`
6. `0 +` no-op
7. `1 *` no-op
8. literal-literal constant folding
9. queue pair inventory with disposition reporting
10. mandatory closure loop with pass counts

These have the best ratio of safety to implementation cost.

## Recommendation

Do **not** start by trying to encode the full ERS skill in a compiler-grade optimizer. Start with:

- **audit**
- **safe-local autofix**
- **closure**
- **machine-readable inventories**

That gives the agent a reliable substrate for the “basic expand, replace, resynthesize steps” while preserving the current skill for the parts that still require judgment.
