# Proposal

## Why

`lean-proof/generate.py` has grown to ~4,981 lines because it performs whole-word inlining and constructs bespoke Lean proof scripts in Python for each new control-flow shape (`eval`, `?`, nested literals, branching on quotation results — versions v29 through v36). Almost every new combinator in `ff/lib/core/core.ff` (such as `between?`, `bi2`, `or_else`, `and_also`) has required a new custom Python symbolic simulator and Lean emitter, which will not scale to remaining words.

## What Changes

- Introduce a fuel-abstracted compositional specification predicate (`Spec` / `SpecErr`) in `Fbm/Prover.lean` (building on `split-lean-interpreter`) that wraps `execQ` and universally quantifies over frame/rest stack, queue, input, oracle, and `defs`.
- Prove the core structural composition rules once in `Fbm/Prover.lean`:
  - sequence rule (`p1 ++ p2`, wrapping `execQ_append`)
  - frame rule (preserving arbitrary deeper stack `..R` and queue `qq`)
  - primitive rules for `eval`, `cond` (`?`), `cons`, and arithmetic/stack/IO primitives
  - word-call rule so defined words apply already-proven `@effect` theorems instead of inlining their bodies down to raw tokens
- Implement a Lean 4 verification tactic (`fbm_verify`) in `Fbm/Prover.lean` that peels the head of a word's program, dispatches primitives, applies dependency `@effect` lemmas, splits on `?` flags, and matches `eval` against quotation-slot hypotheses.
- Refactor `lean-proof/generate.py` into a pure parser and emitter: emit `Prog` definitions (preserving calls to already-annotated words where possible), emit theorem statements, and emit a uniform `by fbm_verify [...]` proof body—removing the ~3,300 lines of Python symbolic execution and per-shape proof emitters (`_sim_runq*`, `_emit_runq*`).
- Keep custom human proofs (`@proof` / `@rec-effect`) strictly for recursive words (`_loop`, `times`, `seq`, `pushtop`) and non-trivial algorithmic invariants (`isqrt`, `gcd`).

## Capabilities

### New Capabilities
- `lean-effect-prover`: Compositional `Spec`-based `@effect` verification in Lean 4 (`Fbm.Prover`) using reusable composition lemmas and a Lean verification tactic (`fbm_verify`), replacing per-word Python proof generation.

### Modified Capabilities

## Impact

- Depends on `split-lean-interpreter` (`Fbm.Interp` and `Fbm.Prover` Lake package).
- `lean-proof/Fbm/Prover.lean` (adds `Spec`, structural rules, and `fbm_verify` tactic)
- `lean-proof/generate.py` (major simplification: removes `_sim_runq*` / `_emit_runq*` proof generators, keeps `@effect` parser and Lean emitter)
- `ff/__tests__/primitives.test.ffp` and `ff/lib/core/core.ff` (all existing `@effect` theorems remain valid and pass under `fbm_verify` without changing `@effect` syntax)
