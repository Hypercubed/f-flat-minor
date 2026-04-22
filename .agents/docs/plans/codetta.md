---
id: codetta
title: "F-flat-minor Codetta"
last_updated: 2026-04-10
description: >
  Codetta is now a shipped mode inside the existing web playground, not a
  separate app. It presents a curated set of Coda Etudes backed directly b
  y files in ff/codetta, lets players load the current best solution, run
  edits in the browser, inspect output and compiled bytecode, a...
tags: [plans]
status: active
kind: initiative
author_kind: ai
prompter: "cloud-agent"
---
# Plan: F-flat-minor Codetta

## Summary

Codetta is now a shipped mode inside the existing web playground, not a separate app. It presents a curated set of Coda Etudes backed directly by files in `ff/codetta`, lets players load the current best solution, run edits in the browser, inspect output and compiled bytecode, and open a guided submission flow when they beat the current score.

This plan records the implementation conventions already in use and narrows the remaining deferred work to repository automation around verification and contribution handling.

## Current Status

Codetta's shipped product surface is in place:

- web app integration is live
- file-driven etude loading from `ff/codetta` is live
- browser compile/run/output validation is live
- guided submission via prefilled GitHub issue URLs is live in `web/src/client/codetta.ts`

Remaining work is backend and repository automation:

- CI-side validation of submitted improvements
- assisted PR creation for accepted winning entries

## Current Repository Shape

Each etude lives in its own folder under `ff/codetta`:

```text
ff/codetta/
  99bottles/
    README.md
    solution.ffp
    solution.out
  e-digits/
    README.md
    solution.ffp
    solution.out
  fib/
    README.md
    solution.ffp
    solution.out
  fizzbuzz/
    README.md
    solution.ffp
    solution.out
  pi-digits/
    README.md
    solution.ffp
    solution.out
```

Per-etude conventions:

- `ff/codetta/<slug>/README.md`
- `ff/codetta/<slug>/solution.out`
- `ff/codetta/<slug>/solution.ff` or `ff/codetta/<slug>/solution.ffp`

The currently shipped Codetta set is:

- `99bottles`
- `e-digits`
- `fib`
- `fizzbuzz`
- `pi-digits`

The earlier draft mentioned `quine`, but the current shipped set excludes Quine.

## README Metadata

Each `README.md` uses frontmatter followed by the user-facing description:

````md
---
etude: fib
title: "Fibonacci"
leader: hypercubed
bytes: 74
date: 2026-04-07
---

Print the 31st Fibonacci number.
````

Current required fields:

- `etude`
- `title`
- `leader`
- `bytes`
- `date`

The frontmatter `bytes` value is the authoritative current-best score shown by the UI.

## Scoring Rules

Codetta now scores solutions by **optimized compiled `.ffb` byte length**, not raw source length.

- Score = length of the optimized compiled `.ffb` payload
- The count includes the ASCII `FbAbbCb` header
- The remainder of the count is the base64 VLQ bytecode emitted by the optimizer
- Source UTF-8 byte count and source character count are still useful reference metrics, but they are not the competitive Codetta score

This matches the current web implementation and the shipped README metadata.

## Data Loading

The original draft assumed a generated `etudes.json`. That is no longer the design.

Current implementation details:

- the web app loads Codetta content directly from `ff/codetta`
- `web/src/codetta-data.ts` uses `import.meta.glob()` to import every `README.md`, `solution.out`, and `solution.ff` / `solution.ffp`
- the app parses README frontmatter at build time in the frontend bundle
- there is no generated `etudes.json` layer in the current flow

This keeps content editing file-driven: adding or updating an etude means updating files in `ff/codetta`, not regenerating a manifest.

## Current UI

Codetta lives inside the existing web app shell as its own mode/tab.

Shipped UI behavior:

- list screen showing title, leader, compiled-byte score, and last-updated date
- detail screen with expected output and current-best metadata
- previous / next etude navigation in the detail header
- editor + inspect split layout
- output / bytecode tabs in the inspect panel
- compiled-byte status for the current attempt, including under / tied / over current best
- load-current-best action
- browser run flow using the existing playground/compiler pipeline
- guided submit flow that opens a prefilled GitHub issue URL when the attempt both matches output and beats the current best

The current submit UX already handles guided issue creation in the browser, but it does not yet validate submissions in CI or open PRs automatically.

## Validation Model In Use

The current browser experience validates an attempt by:

- compiling the attempt with optimization enabled
- calculating compiled bytes from the displayed bytecode plus the `FbAbbCb` header
- executing the attempt in-browser
- comparing stdout against `solution.out`

An attempt is submittable only when:

- output matches `solution.out`, and
- compiled bytes are strictly lower than the current README `bytes` value

Ties do not unlock submission.

## What Changed From The Earlier Draft

These earlier-plan assumptions are now outdated and should not guide further work:

- Codetta is not a separate site; it is part of the existing web app shell
- content is not stored under `ff/etudes`; it lives under `ff/codetta`
- expected output file is `solution.out`, not `expected.txt`
- the source file may be either `solution.ff` or `solution.ffp`
- score is not raw source UTF-8 bytes; it is optimized compiled `.ffb` bytes including `FbAbbCb`
- the frontend does not consume generated `etudes.json`; it imports the source files directly
- the shipped detail view is richer than the original mockup and already includes navigation, inspect tabs, and compiled-byte status

## Remaining Follow-On Work

The remaining roadmap is now incremental polish and automation on top of the shipped file/data model.

### Phase 2 — CI Validation

- validate issue or PR submissions against `solution.out`
- recompute optimized compiled-byte score using the canonical toolchain
- verify that updated README `bytes:` matches the compiled score
- reject ties and non-improvements automatically

### Phase 3 — Assisted PR Creation

- open a PR containing the updated `solution.ff` / `solution.ffp` and `README.md`
- keep the final merge decision with a human maintainer

## Maintenance Notes

- treat `ff/codetta` as the source of truth for shipped etudes
- keep README `bytes:` synchronized with the optimized compiled-byte score
- preserve the current file naming convention so `web/src/codetta-data.ts` continues to discover entries automatically
- keep score-related documentation and generated scorecards under `ff/codetta`
