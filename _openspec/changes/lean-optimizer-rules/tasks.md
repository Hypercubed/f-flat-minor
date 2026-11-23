# Tasks

## 1. `opt_rule` Macro and Module Setup

- [ ] 1.1 Create `lean-proof/Fbm/Optimizer.lean` importing `Fbm.Interp`, implement the `opt_rule` macro (supporting stack-item binders `(a b ...)`, optional `when <cond>` preconditions, and optional custom tactic override), and verify `lake build Fbm.Optimizer` compiles cleanly.
- [ ] 1.2 Wire `Fbm.Optimizer` into `lean-proof/Fbm.lean` and `lean-proof/chompfile.toml` (`deps` of `test:lean`), and verify `lake build` builds `Fbm.Optimizer` automatically.

## 2. Verify Optimizer Rewrite Rules

- [ ] 2.1 Add `opt_rule` soundness proofs in `lean-proof/Fbm/Optimizer.lean` for the peephole rules in `typescript/core/src/optimizer.ts` (null sequences, `n EVAL -> CALL n`, constant folding, algebraic/bitwise/shift identities, and conditional/oracle-consuming rules with explicit preconditions), and verify `lake build` succeeds with zero `sorry`s and standard axioms only.
- [ ] 2.2 Document `Fbm/Optimizer.lean` and how to add/verify new rewrite rules in `lean-proof/README.md`, and verify `cd lean-proof && chomp test:lean` passes.
