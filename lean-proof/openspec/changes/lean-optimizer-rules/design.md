# Design

## Context

See `proposal.md` for motivation. `Fbm.Interp` is now a standalone Lean 4 module in `lean-proof/`, completely independent of `Fbm.Prover` and `generate.py`. Peephole rewrite rules in `typescript/core/src/optimizer.ts` transform small instruction sequences (`NOP`, `SWAP SWAP`, `DUP DROP`, `PUSHR PULLR`, `NOT NOT`, `n EVAL -> CALL n`, constant folding, algebraic/bitwise identities).

## Goals / Non-Goals

**Goals:**
- Provide `lean-proof/Fbm/Optimizer.lean` importing `Fbm.Interp` (core Lean 4 only, no Mathlib).
- Define an `opt_rule` macro (with stack-item binders and optional `when` preconditions) so F♭m authors can read and add rules without writing boilerplate `execQ` theorem signatures.
- Prove soundness of the peephole rules in `typescript/core/src/optimizer.ts` and wire `Fbm.Optimizer` into `lake build` / `chomp test:lean`.

**Non-Goals:**
- Parsing `typescript/core/src/optimizer.ts` automatically from Python/TS (rules are listed cleanly in `Fbm/Optimizer.lean`).
- Changing `optimizer.ts` runtime behavior unless a genuine soundness bug is discovered during verification (any precondition/oracle subtlety is documented in `Fbm/Optimizer.lean`).

## Decisions

- **Import `Fbm.Interp` only**: `Fbm/Optimizer.lean` only needs `Fbm.Interp.execQ`, `step`, and `omega`/`Int` lemmas—keeping it decoupled from `Fbm.Prover` and `generate.py`.
- **Two `opt_rule` forms**:
  - Unconditional / stack-binder form: `opt_rule name (a b) : lhs => rhs`
  - Precondition form: `opt_rule name (a b) when cond : lhs => rhs`
  - Default proof body tries `intros; simp [execQ, step]; try omega` (with an optional custom `by ...` override for arithmetic identities like power-of-2 shifts or `Int.emod`).

## Risks / Trade-offs

- **Risk**: Rules like `CLOCK DROP => []` and `RAND DROP => []` consume one element from `Oracle` (`orc`) in `Fbm.Interp`, so `execQ ... [.clock, .drop] ... orc` is only equal to `execQ ... [] ... orc.tail` (not `orc`), and `RAND` requires `0 < M`. → **Mitigation**: Document oracle-consumption / non-underflow assumptions explicitly in `Fbm/Optimizer.lean` (or state them with `orc.tail` / `0 < M` hypotheses).
