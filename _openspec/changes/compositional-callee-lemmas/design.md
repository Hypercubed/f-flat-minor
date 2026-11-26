# Design

## Context

See `proposal.md` for motivation. This change builds on
`compositional-lean-prover` (archived 2026-11-22), which introduced
`Spec`/`Spec.seq`/`Spec.cond`, the `fbm_verify` tactic, `++`-composed
`Prog` emission, and the `("call", word)` marker mechanism — currently
gated to the rec-reaching frontier (`_compute_rec_frontier`).

Today: `_inline_tokens` unfolds every non-recursive call. `clamp`
(`dig max min`) flattens through `max`/`min`/`sort2` to primitives with
two `?`s; the runQ router's "exactly one `?`" rule fires. `abs`'s
`?`-prefix contains the call `negitive?`, which the cond-prefix
simulator (`_RUNQ_SIM_TOKENS` + `_COND_CMP_OPS` only) cannot name.

## Goals / Non-Goals

**Goals:**
- Emit callee-`Prog` `++` references for all *annotated* callees, not
  just rec-frontier words.
- Teach `fbm_verify` to split on `if`s in an applied callee lemma's
  post (conditional-hypothesis splitting).
- Prove `clamp` with no `@by-proof`; reassess `abs` (same machinery
  or `@by-proof` over `negitive?_effect`).

**Non-Goals:**
- `divrem`'s compose-path `ensures` (separate change: `_prepare_runq_compose`
  refuses `where`/`ensures` — new proof machinery, not composition).
- Recursive words (already work via `Tok.call`).
- Unannotated callees (still inline — no lemma exists to compose).
- Changing `@effect` syntax.

## Decisions

- **`++` over callee `Prog`s, not `Tok.call`**: reuses the existing
  `execQ_append`/`Spec.seq` path; no `defs` threading, no numeric
  opcodes. Directly per the archived Nov 22 decision. Recursive
  words keep their existing `Tok.call` + `lookup defs` path untouched.
- **Frontier = all annotated words**: a callee with an `@effect`
  (hence a proven lemma) emits a boundary reference; unannotated
  callees inline as today. The rec frontier becomes a special case of
  this rule (its `Tok.call` emission stays — different mechanism for
  a different reason: induction, not reuse).
- **Conditional-hypothesis splitting is the only new tactic work**:
  unconditional composition already works (`loop` over `_loop_effect`
  proves it). When `apply $dep` leaves an `if` in a hypothesis that
  the goal depends on, `by_cases` on the condition and close each
  branch. Bounded depth (2–3 splits); beyond that, emit a clean
  problem ("needs `@by-proof`") rather than exploring.
- **`@by-proof` stays a valid fallback**: hand-assembly over existing
  lemmas (the `range` pattern: `have` the bridge facts, then
  `fbm_verify [...]`) works before, during, and after this change.

## Risks / Trade-offs

- **Risk**: case-splitting on hypothesis `if`s blows up on deeply
  nested conditionals (2 callees = 4 cases, 3 = 8). → **Mitigation**:
  atomic rollback per split (existing `fbm_verify` pattern); hard
  depth cap with a clean "needs `@by-proof`" problem beyond it.
- **Risk**: `Prog`-references-callee-`Prog` creates emission-ordering
  constraints. → **Mitigation**: topological order by the call graph
  (already computed for `fbm_verify` dep lists).
- **Risk**: `clamp`'s parked text is itself malformed (outer `if`
  lacks a final `else`; correct shape is
  `if X < LO then LO else if HI < X then HI else X`) and its
  `LO HI X` input order needs a trace check against `dig max min`.
  → **Mitigation**: rewrite the effect from a hand trace as part of
  the change; the trace is acceptance evidence.
