# Design

## Context

See `proposal.md` for motivation. After `compositional-lean-prover`, `ff/lib/core/core.ff` has 45 passing `@effect` theorems (lines 1–86), leaving 7 unannotated words at the bottom of `core.ff`:
- `pushtop: depth 1 > [ swap [pushtop] dip ] ? ;` (line 87)
- `_loop: dup [ -- [ dup slip ] dip _loop ] ? ;` (line 91)
- `loop: _loop drop ;` (line 92)
- `times: loop drop ;` (line 94)
- `seq: swap times ;` (line 95)
- `range: over - [succ] seq ;` (line 97)
- `count: 0 swap ++ [succ] seq drop ;` (line 98)

## Goals / Non-Goals

**Goals:**
- Deliver the 3-tier proof ladder in three progressive phases:
  1. Phase 1 (`@lean` + recursive/list foundations): `@lean` verbatim blocks, `SpecIter` / `intRange` in `Fbm/Prover.lean`, `Tok.call` + `lookup defs` for recursive words, non-leading `..R`, and list-splice stack outputs.
  2. Phase 2 (`@by-proof`): `@effect ... @by-proof <tactic>` so `@effect` generates the theorem statement and authors supply only the tactic body.
  3. Phase 3 (`@by-induction` + full `core.ff`): `@effect ... @by-induction <pattern>` for standard recursion patterns (`N - 1`, `R.length`), plus full annotation and verification of all 7 remaining words in `ff/lib/core/core.ff`.

**Non-Goals:**
- Automatic loop-invariant synthesis for arbitrary recursive words without `@by-induction` or `@by-proof`.
- TypeScript `ff-preprocess` integration (deferred to `lean-ts-preprocessor-frontend`).
- Stripping `_sim_runq*` from `generate.py` (deferred to `lean-generator-cleanup`).

## Decisions

- **Progressive 3-phase delivery (`@lean` -> `@by-proof` -> `@by-induction`)**: Implementing `@lean` first gives an immediate working escape hatch for recursive theorems and generic specs (like short-circuiting `or_else`/`and_also`); `@by-proof` removes the boilerplate of hand-writing `Spec` theorem headers; `@by-induction` automates the common `N - 1` and `R.length` induction skeletons on top of `fbm_verify`.
- **`@by-proof` and `@by-induction` as `@effect` clauses rather than separate `@rec-effect` / `@proof` tags**: Keeping proof modifiers at the tail of `@effect` preserves `word:`-based position independence and avoids splitting recursive vs. non-recursive cases of the same word across two tag types.
- **`Tok.call` for recursive words vs. `++` for DAG words**: Non-recursive words continue to emit finite `++` `Prog` lists; recursive words emit a `Prog` body plus `Tok.call` for self-calls with a `lookup defs` hypothesis so `Spec.call_head` can unfold one step in the inductive proof.
- **Higher-order iteration helper (`SpecIter`) in `Fbm.Prover`**: `_loop` executes an arbitrary quotation `[B]` `N` times (`N >= 0`). Defining `SpecIter` and `intRange` in `Fbm/Prover.lean` lets `_loop_effect`, `loop_effect`, `times_effect`, and `seq_effect` state clean contracts, which `range_effect` and `count_effect` instantiate with `succ_effect`.

## Risks / Trade-offs

- **Risk**: `generate.py` parser ambiguity between expressions in `ensures` and `@by-proof` / `@by-induction` clauses. → **Mitigation**: Require `@by-proof` and `@by-induction` to appear at the tail of `@effect` after `requires` / `ensures`, delimited by the `@` prefix.
- **Risk**: `pushtop`'s `depth 1 >` operates on `R.length` while recursing via `[pushtop] dip`, which changes the stack underneath `A`. → **Mitigation**: Prove `pushtop_effect` by induction on `R.length` (via `@by-proof` in Phase 2, then `@by-induction` in Phase 3), using `dip_effect` + the IH on `R` of length `k`, then verify `R ++ [A]` equality.
