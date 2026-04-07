---
status: ready
status_date: 2026-04-07
creator: cloud-agent
---

# Plan: F♭m Codetta — Coda Études Platform

## Summary

**F♭m Codetta** is a lightweight, serverless platform for the **Coda Études** — byte-count minimization challenges for the F♭m language. Players try to beat the current best solution per étude; submissions use GitHub Issue or PR, with validation and scoring in CI and a human merge. No database, backend, or accounts beyond GitHub. Implementation is phased (UI → guided submission → CI → bot PRs); each phase ships independently.

## Context

The platform grows only if early phases attract submissions. Terminology, repository layout, byte-count rules, UI mockups, `etudes.json` shape, and four implementation phases are specified below.

---

# F♭m Codetta — Design Plan

## Overview

**F♭m Codetta** is a lightweight, serverless platform for the **Coda Études** — a series of
byte-count minimization challenges for the F♭m language. Players attempt to beat the current
best solution for each étude. Submissions are made via GitHub Issue or Pull Request.
Validation and scoring are handled by CI — a human performs the final merge.

No database. No backend. No accounts beyond GitHub.

The platform is designed to be built incrementally across four phases. Each phase ships
independently and adds value on its own. Later phases are only worth building if earlier
phases attract submissions.

### Terminology

| Term | Meaning |
|---|---|
| **Codetta** | The platform as a whole |
| **Coda Études** | The challenge series |
| **Étude** | A single challenge |
| **Leader** | The current record holder for an étude |
| **Score** | Byte count of the winning `solution.ff` — lower is better |

---

## Repository Structure

```
ff/
  études/
    fibonacci/
      README.md          ← étude description + metadata
      solution.ff        ← current winning implementation
      expected.txt       ← canonical expected output
      history.json       ← record of all past leaders (added in Phase 3)
    hello-world/
      README.md
      solution.ff
      expected.txt
    ...
  lib/
    core.ff              ← shared library (counts toward byte score)
```

### Étude README.md format

Each étude README uses YAML frontmatter for machine-readable metadata, followed by a
human-readable description:

````markdown
---
etude: fibonacci
title: "Fibonacci Sequence"
leader: hypercubed
bytes: 42
date: 2026-03-01
---

# Fibonacci Sequence

Print the first 20 Fibonacci numbers, one per line.

## Expected Output

```
1
1
2
3
...
```
````

The `bytes` field counts only the bytes in `solution.ff`. Any words defined in `ff/lib/` are
included in the compiled output and will naturally inflate the byte count, so there is no
separate accounting needed — using the standard library is permitted but not free.

---

## Byte Counting Rules

These rules apply in all phases.

- Count raw UTF-8 bytes of `solution.ff` only.
- Whitespace counts. Comments count.
- Words from `ff/lib/core.ff` are permitted but their definitions inflate
  the compiled output naturally — no special penalty or bonus needed.
- The Deno interpreter is the canonical implementation for validation.
- Hard-coding output is permitted. If a literal is shorter than a computation, that is
  a valid (if unsatisfying) technique. Étude design mitigates this — see notes
  on fixed vs parameterized études below.

---

## UI Design

The UI consists of two screens, shared across all phases. The Submit button behaviour
changes per phase.

### Screen 1 — Étude List

```
╔══════════════════════════════════════════════════════════════════╗
║  F♭m Codetta  ◆  Coda Études                                     ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  Étude                  Leader          Bytes    Last Updated    ║
║  ─────────────────────────────────────────────────────────────   ║
║  › Hello World          hypercubed        18     2026-02-01      ║
║  › Fibonacci            alice             38     2026-03-12      ║
║  › Factorial 100        hypercubed        42     2026-01-20      ║
║  › FizzBuzz             bob               71     2026-03-28      ║
║  › ROT13                alice            103     2026-02-14      ║
║                                                                  ║
║  [ + Suggest an étude ]                                          ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

Clicking a row opens the étude detail and playground.

---

### Screen 2 — Étude Detail + Playground

```
╔══════════════════════════════════════════════════════════════════╗
║  ← Études   F♭m Codetta  ◆  Fibonacci                            ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  ÉTUDE                             CURRENT BEST                  ║
║  ──────────────────────────────     ─────────────────────────    ║
║  Print the first 20 Fibonacci       Leader:  alice               ║
║  numbers, one per line.             Bytes:   38                  ║
║                                     Date:    2026-03-12          ║
║  Expected output:                                                ║
║  ┌──────────────┐                                                ║
║  │ 1            │                                                ║
║  │ 1            │                                                ║
║  │ 2            │                                                ║
║  │ 3            │                                                ║
║  │ ...          │                                                ║
║  └──────────────┘                                                ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║  YOUR ATTEMPT                              [ Load Current Best ] ║
║  ─────────────────────────────────────────────────────────────   ║
║  ┌────────────────────────────────────────────────────────────┐  ║
║  │                                                            │  ║
║  │  fib: dup 2 < [ dup 1 - fib swap 2 - fib + ] ? ;          │  ║
║  │  1 20 [ dup fib putn 10 putc 1 + ] times                   │  ║
║  │                                                            │  ║
║  └────────────────────────────────────────────────────────────┘  ║
║  Bytes: 71   ← over current best (38)                            ║
║                                                                  ║
║  [ ▶ Run ]                                                       ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║  OUTPUT                                                          ║
║  ─────────────────────────────────────────────────────────────   ║
║  ┌────────────────────────────────────────────────────────────┐  ║
║  │ 1                                                          │  ║
║  │ 1                                                          │  ║
║  │ 2  ✓ Output matches expected                               │  ║
║  │ ...                                                        │  ║
║  └────────────────────────────────────────────────────────────┘  ║
║                                                                  ║
║  [ Submit ]  ← disabled (not a new record)                       ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

When output matches AND byte count is strictly less than the current best, the bottom
panel changes to indicate a new record and the Submit button becomes active:

```
╠══════════════════════════════════════════════════════════════════╣
║  OUTPUT                                                          ║
║  ─────────────────────────────────────────────────────────────   ║
║  ┌────────────────────────────────────────────────────────────┐  ║
║  │ ✓ Output matches expected                                  │  ║
║  └────────────────────────────────────────────────────────────┘  ║
║                                                                  ║
║  Bytes: 35  ← new record! (current best: 38)                     ║
║                                                                  ║
║  ╔══════════════════════════════════════════════════════════╗    ║
║  ║  🏆  New record! Ready to submit?                        ║    ║
║  ║                                                          ║    ║
║  ║  [ ✦ Submit ]                                            ║    ║
║  ╚══════════════════════════════════════════════════════════╝    ║
╚══════════════════════════════════════════════════════════════════╝
```

What the Submit button does varies by phase — see below.

---

## Adding New Études

An étude is just a folder with three files. No platform code changes are needed.

```
ff/études/my-etude/
  README.md       ← frontmatter + description + expected output
  solution.ff     ← reference/seed solution (sets the opening baseline)
  expected.txt    ← raw expected output used by CI for diffing
```

The Codetta UI reads the étude list from a static `etudes.json` generated at build
time by walking the `ff/études/` directory.

### Fixed vs Parameterized Études

Fixed output études (print hello world, print the first N primes) are trivial to
validate — one expected output string. Hard-coding is technically valid but rarely
competitive when the output is large enough.

Parameterized études (nth Fibonacci given N as input) require a defined convention
for how input is provided to the program. This is deferred — for Phase 1 all études
should be fixed output.

---

## Open Questions

- **Hosting:** Does Codetta live on `hypercubed.github.io/f-flat-minor/codetta`
  alongside the existing playground, or as a separate page?
- **Ties:** If two submissions have the same byte count, first-merged wins (GitHub timestamp).
- **Multiple études per submission:** Not supported — one étude per issue or PR
  keeps validation simple.
- **Std lib contributions:** Users who want to add words to `ff/lib/` submit a regular PR.
  This is a separate flow from Coda Études submissions and warrants normal code review.

---

# Implementation Phases

---

## Phase 1 — UI Only

**Goal:** Get something in front of people. Validate that the concept is interesting
before investing in any automation.

### What Ships

- Étude list page with current leader, byte count, and date per étude
- Étude detail page with description and expected output panel
- Playground editor with live byte counter
- Run button that executes code in the browser using the existing WASM/JS interpreter
- Output panel that diffs actual vs expected and shows a pass/fail indicator
- Submit button that is active only when output matches AND byte count beats the record —
  in Phase 1 it reveals manual submission instructions inline (no redirect)
- "Load Current Best" button that populates the editor with the current winning solution

### Submission UX in Phase 1

When the user hits Submit, the panel expands to show manual instructions with
a pre-formatted issue body they can copy:

```
╔══════════════════════════════════════════════════════════════════╗
║  🏆  New record! (35 bytes, current best: 38)                    ║
║                                                                  ║
║  To submit your étude, open an issue or PR on GitHub.            ║
║  Copy the text below and use it as your issue body:              ║
║                                                                  ║
║  Issue title:  codetta: fibonacci (35 bytes)                     ║
║  ┌────────────────────────────────────────────────────────────┐  ║
║  │ Étude: fibonacci                                            │  ║
║  │ Bytes: 35                                                   │  ║
║  │ Handle: (your name or GitHub handle)                        │  ║
║  │                                                             │  ║
║  │ ```                                                         │  ║
║  │ fib: dup 1 - dup 1 - fib swap fib + 2 < ? ;                │  ║
║  │ ```                                                         │  ║
║  └────────────────────────────────────────────────────────────┘  ║
║  [ Copy ]   [ Open GitHub Issues ↗ ]                             ║
╚══════════════════════════════════════════════════════════════════╝
```

The "Open GitHub Issues" link navigates to
`github.com/Hypercubed/f-flat-minor/issues/new` with no pre-fill — the user
pastes the copied text manually. Pre-filling is Phase 2.

### Data Source

Étude data is loaded from a static `etudes.json` generated at build time by walking
`ff/études/`. Each entry embeds the fields needed by the UI:

```json
[
  {
    "id": "fibonacci",
    "title": "Fibonacci Sequence",
    "leader": "alice",
    "bytes": 38,
    "date": "2026-03-12",
    "description": "Print the first 20 Fibonacci numbers, one per line.",
    "expected": "1\n1\n2\n3\n5\n...",
    "solution": "fib: dup 2 < ..."
  }
]
```

`solution.ff` content is embedded so the "Load Current Best" button works without
a server round-trip.

### Interpreter Integration

The playground already runs the F♭m interpreter in the browser. The Codetta UI
wraps this — it passes the user's code to the existing interpreter, captures stdout,
and compares it against the `expected` string from `etudes.json`.

Byte count is calculated client-side:

```javascript
new TextEncoder().encode(code).length
```

### Out of Scope for Phase 1

- Any GitHub automation
- Issue or PR pre-filling
- History tracking
- Parameterized études
- CI of any kind

---

## Phase 2 — Guided Submission

**Goal:** Reduce submission friction. Users submit with one click and no copy-pasting.

**What changes:**

- The Submit button navigates directly to the GitHub new issue page with title and body
  pre-filled via URL parameters:
  `github.com/Hypercubed/f-flat-minor/issues/new?title=codetta%3A+fibonacci+(35+bytes)&body=...`
- Body includes étude name, byte count, and the user's code in a fenced code block,
  URL-encoded into the query string
- User still needs a GitHub account and clicks "Submit new issue" themselves —
  no authentication required from the Codetta UI

**Still manual:** A maintainer reads passing issues and applies winning solutions
to the repo by hand.

---

## Phase 3 — CI Validation

**Goal:** Automate correctness and scoring checks so the maintainer only reviews
submissions already verified as valid new records.

**What's added:**

- GitHub Action triggers on new issues matching the `codetta:` title pattern
- Bot extracts code from the issue body
- Runs code through the Deno interpreter, diffs against `expected.txt`
- Checks byte count against `README.md` frontmatter
- Posts a structured pass/fail comment back to the issue
- On passing: bot opens a PR containing the new `solution.ff`, updated `README.md`
  frontmatter, and a new entry appended to `history.json`
- Post-merge Action finalises all changes on `main`

**`history.json` format (one file per étude):**

```json
[
  { "leader": "alice", "bytes": 35, "date": "2026-04-01", "issue": 87 },
  { "leader": "hypercubed", "bytes": 38, "date": "2026-03-12", "issue": 71 },
  { "leader": "bob", "bytes": 51, "date": "2026-01-20", "issue": 43 }
]
```

The issue number links back to the full submission thread — code, discussion,
and CI output all in one place with no extra storage needed.

---

## Phase 4 — Bot-Created PRs

**Goal:** Remove all manual maintainer effort except the final merge decision.

**What's added:**

- On a passing issue validation, the bot automatically creates a branch, commits
  `solution.ff`, updated frontmatter, and the history entry, and opens a PR
  referencing the original issue
- Maintainer receives a PR that is already validated, already has all metadata
  updated, and needs only a merge decision
- The final merge remains human — intentionally

**The complete end-to-end flow at Phase 4:**

```
User beats score in Codetta playground
  → clicks Submit
  → GitHub issue opens pre-filled (one click to submit)
  → CI validates: correctness + byte count
  → bot comments with results
  → if passing: bot opens PR with all file changes
  → maintainer reviews and merges
  → post-merge Action finalises history.json on main
```

---

## Decisions already made

- Byte score is raw UTF-8 length of `solution.ff` only (whitespace and comments count).
- Deno is the canonical validator for CI; browser WASM/JS for the playground.
- Stdlib use is allowed; compiled size reflects `ff/lib` inclusion — no separate accounting.
- Ties: first merged wins (GitHub timestamp).
- One étude per issue or PR; stdlib changes use the normal PR flow, not Codetta.
- Phase 1 études are fixed-output only; parameterized input convention is deferred.

## Out of scope (whole platform)

- Dedicated accounts, database, or custom backend beyond GitHub + static hosting + CI.

## Dependencies

- Existing web playground / WASM interpreter for in-browser run (Phase 1).
- Deno test runner / interpreter for canonical validation (later phases).

## References

- `_docs/` for language and playground context as needed during implementation.
- Repository layout under `ff/études/` and build-time `etudes.json` generation as specified above.
