# Design

## Context

See `proposal.md` for motivation. Currently `lean-proof/generate.py` (5,221 lines) emits `Spec` + `fbm_verify` for 71/79 theorems, while `empty?` (in `core.ff`) and 7 primitive/IO/error theorems (in `primitives.test.ffp`) still fall back to legacy `run` emitters, and `prepare()` still calls `_sim_runq*` to compute quotation-literal parameters (`lit0..litN`), branch variables, and stack shapes.

## Goals / Non-Goals

**Goals:**
- Bring the remaining 8 theorems (`empty?`, `getc`, `clock`, `rand`, `clr`, `exit`, and guarded `ERROR` cases) onto `Spec` / `SpecErr` / `SpecExit` + `fbm_verify`.
- Replace `_sim_runq*` in `prepare()` with a lightweight quotation-literal / statement-shape pass that does not simulate fuel or proof steps.
- Delete `_sim_runq*` and all legacy `run` emitters (`_emit_exit`, `_emit_rand`, `_emit_clock`, `_emit_getc`, `_emit_error`, `_emit_where`, `_emit_normal`) from `generate.py`.

**Non-Goals:**
- Changing `@effect` syntax or adding `@lean` / `@by-proof` / `@by-induction` / `core.ff` recursive words (handled in `complete-core-ff-effects`).

## Decisions

- **Covering the last 8 cases in `Fbm.Prover`**:
  - `clr`: `Spec` rule setting output stack `s' = []` while preserving `q'`, `acts'`, `d'`.
  - `exit`: `SpecExit` predicate over `execQ` returning `Outcome.exit code acts'`.
  - `getc`, `clock`, `rand`: `Spec` (or `SpecIO` / input-oracle-indexed `Spec` variants) constraining the head of `inp` (`N :: inp'`) or `orc` (`o :: orc'`) rather than quantifying away the input/oracle stream.
  - `empty?` (`ensures` with `#R`): `Spec.depth_head` + existential witness in `fbm_verify` (or `refine ⟨..., rfl, ?_⟩; fbm_verify [...]`).
- **Lightweight literal discovery instead of `_sim_runq*`**: `prepare()` only needs to collect quotation literals (`[ ... ]`) in the word's AST/tokens (allocating `lit0..litN` and their `lookup defs` hypotheses) and extract stack/queue slot names from `@effect`—none of which requires running a symbolic stack/fuel simulator.

## Risks / Trade-offs

- **Risk**: Subtle statement-shape differences for `or_else` / `and_also` / `between?` / `bi2` when replacing `_sim_runq*` in `prepare()`. → **Mitigation**: Snapshot the emitted Lean output of `generate.py` on `primitives.test.ffp` and `core.ff` before deleting `_sim_runq*`, and diff the generated `Prog` and theorem signatures to ensure zero regressions.
