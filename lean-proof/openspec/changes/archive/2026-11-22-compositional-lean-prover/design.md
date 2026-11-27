# Design

## Context

See `proposal.md` for motivation. This change builds on `split-lean-interpreter`, which provides `Fbm.Interp` (pure semantics) and `Fbm.Prover` (Lean module for proof infrastructure) in a Lake package.

Currently, `lean-proof/generate.py` (~4,981 lines) inlines all word calls to `Tok.*` and uses ~3,300 lines of Python symbolic execution (`_sim_runq*`, `_emit_runq*`) to emit bespoke Lean proof scripts for each control-flow combination (`eval`, `?`, nested literals, branching on quotation results).

## Goals / Non-Goals

**Goals:**
- Define `Spec` (and `SpecErr` for `ERROR` cases) in `Fbm.Prover` abstracting `execQ` fuel, frame stack, queue, input, oracle, and `defs`.
- Prove structural rules once in `Fbm.Prover`: sequence (`p1 ++ p2`), frame preservation, `eval`, `cond` (`?`), `cons`, and `call` / dependency lemma application.
- Implement a Lean 4 tactic (`fbm_verify`) in `Fbm.Prover` that peels program tokens, applies primitive step simplification or dependency `Spec` lemmas, splits on `?` conditions (`by_cases`), and resolves `eval` from quotation-slot hypotheses.
- Simplify `generate.py` to emit `Prog` definitions and `theorem ... := by fbm_verify [...]` without Python symbolic simulation.

**Non-Goals:**
- Automatic loop-invariant synthesis for recursive words (`_loop`, `loop`, `times`, `seq`, `pushtop`, `isqrt`). Those remain `@rec-effect` / `@proof` territory requiring human induction.
- Changing `@effect` comment syntax in `.ff` / `.ffp` files.

## Decisions

- **Relational `Spec` over `execQ` vs. redefining the interpreter**: Keep `Fbm.Interp.execQ` as the sole operational semantics and define `Spec` as a predicate on top of `execQ`. This guarantees zero semantic drift between the standalone interpreter and the prover. Alternative: a separate big-step `Inductive` semantics (would require proving equivalence to `execQ` anyway).
- **Compose callee programs via `++` rather than `Tok.call`**: `generate.py` should emit `Prog` definitions as list concatenations referencing already-annotated callee `Prog`s (e.g. `branchProg := chooseProg ++ [Tok.eval]`) rather than flattening all tokens or emitting `Tok.call code`. Because `execQ_append` already splits on `p1 ++ p2`, `Spec.seq` can apply `choose_effect` directly to the `chooseProg` sublist without allocating numeric opcodes in `defs` or threading `lookup defs` hypotheses for every defined word.
- **Lean tactic (`macro_rules` / `Lean.Elab.Tactic`) vs. `aesop`**: Core Lean 4 only (no Mathlib/Aesop dependency, matching `lakefile.toml` and `Fbm/Interp.lean` / `Fbm/Prover.lean`). A small custom `Lean.Elab.Tactic` or `macro_rules` loop over `first | ...` is self-contained and fast.
- **Gradual migration of `generate.py`**: Keep existing `@effect` theorem signatures compatible (or provide a thin bridge from `Spec` to `runQ`/`Outcome.ok`) so `primitives.test.ffp` and `core.ff` stay green throughout the transition.

## Risks / Trade-offs

- **Risk**: `fbm_verify` tactic backtracking or slow `simp` on deeply nested combinators (e.g., `between?`, `bi2`, `or_else`). → **Mitigation**: Keep `simp only [...]` tightly scoped to `Spec` lemmas and `step` rather than global `@[simp]`, and apply dependency lemmas directly at word boundaries instead of inlining.
- **Risk**: Some edge-case `ensures` / `requires` arithmetic (e.g. `tmod`, `land`, `lor`, `shl`, `shr`) needs helper lemmas beyond `omega`. → **Mitigation**: Keep the existing `have hguard` / `Int.emod` helper lemmas in `Fbm.Prover` and invoke `omega` / `decide` inside `fbm_verify`.
