# Design

## Context

See `proposal.md` for motivation. This change is designed to follow `lean-generator-cleanup` (and optionally `complete-core-ff-effects`).

Currently `lean-proof/generate.py` parses `.ff` files and emits raw Lean `theorem` declarations containing full `Spec ... (fun st qu _ _ acts d => ...) (fun s' q' acts' d' => ...)` lambdas, `hlookup` / `hbody` quotation hypotheses, and explicit `Int` / `Stack` / `Defs` binders.

## Goals / Non-Goals

**Goals:**
- Move `Spec` theorem-signature assembly (binders, stack reversal from bottom-to-top F♭m order to top-first Lean `List Int`, queue/action/defs plumbing, quotation-slot `lookup` + `Spec` hypotheses, `requires`/`ensures`) into a Lean 4 `fbm_effect` macro/elaborator.
- Keep `generate.py` as a minimal `.ff` tokenizer/parser that handles F♭m-specific lexical quirks (`--` decrement vs Lean comment, `N-1` without spaces, `..R`, `{ prints ... }`) and emits `def ...Prog` + `fbm_effect ...`.
- Preserve full compatibility with `check.py` (TAP theorem counting/naming) and `chomp test:lean`.

**Non-Goals:**
- Re-implementing `.ff` comment/token lexing inside Lean 4 (Python/TS handles `.ff` file parsing; Lean handles `Spec` theorem synthesis).

## Decisions

- **Keep `.ff` lexing in Python while moving `Spec` synthesis to Lean**: Lean's lexer treats `--` as a comment and `N-1` as a single identifier, so keeping `.ff` tokenization in a thin `generate.py` avoids fighting Lean's lexer while still eliminating all Python `Spec` theorem-string construction.
- **Preserve theorem names (`<word>_effect`)**: `fbm_effect` takes the theorem name (e.g. `rot_effect`) so `check.py` TAP reporting and downstream `fbm_verify [..., rot_effect]` dependency lists work unchanged.

## Risks / Trade-offs

- **Risk**: Complex higher-order quotation slots (`bi2`, `or_else`, `and_also`) have nested stack/queue signatures that are trickier to express in a simple `syntax` macro. → **Mitigation**: Use a `Lean.Elab.Command` elaborator (rather than `macro_rules` alone) so arbitrary quotation-slot shapes, `requires`/`ensures`, and `++` stack splices expand cleanly.
