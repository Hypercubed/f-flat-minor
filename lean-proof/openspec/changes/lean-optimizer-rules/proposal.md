# Proposal

## Why

The F♭m compiler optimizer (`typescript/core/src/optimizer.ts` and `go/`) applies peephole rewrite rules (such as `SWAP SWAP -> []`, `DUP DROP -> []`, `n EVAL -> CALL n`, constant folding, and arithmetic identities), which are currently only checked by unit tests rather than proved sound. Using `Fbm.Interp` with a concise `opt_rule` Lean 4 macro lets us machine-check every existing and future rewrite rule—and explicitly record any required preconditions (such as stack depth, non-zero divisors, or positive `rand` bounds).

## What Changes

- Add `lean-proof/Fbm/Optimizer.lean` (importing `Fbm.Interp`) with a readable `opt_rule` Lean 4 macro (supporting stack-item assumptions and optional `when` preconditions) so each rewrite rule reads as a concise one-liner.
- Prove soundness theorems in `Fbm/Optimizer.lean` for the peephole rewrite rules from `typescript/core/src/optimizer.ts` (null sequences, indirect call `n EVAL -> CALL n`, constant folding, algebraic/bitwise identities), documenting any required preconditions (e.g. non-underflow, `M > 0` for `rand`, `b ≠ 0` for `/`/`%`).
- Register `Fbm.Optimizer` in `lean-proof/Fbm.lean` / `lean-proof/lakefile.toml` (and `chompfile.toml`) so `lake build` and `chomp test:lean` verify all optimizer rule proofs automatically.

## Capabilities

### New Capabilities
- `lean-optimizer-verification`: Machine-checked soundness proofs for F♭m compiler peephole optimization rules over `Fbm.Interp`, expressed via a concise `opt_rule` Lean 4 macro.

### Modified Capabilities

## Impact

- `lean-proof/Fbm/Optimizer.lean` (new module importing `Fbm.Interp`)
- `lean-proof/Fbm.lean` / `lean-proof/lakefile.toml` / `lean-proof/chompfile.toml` (includes `Fbm.Optimizer` in `lake build` and `test:lean`)
- `lean-proof/README.md` (documents how to add and verify new optimizer rules)
- Read-only reference: `typescript/core/src/optimizer.ts` (source of peephole rules; no compiler behavior changed unless a soundness bug is uncovered)
