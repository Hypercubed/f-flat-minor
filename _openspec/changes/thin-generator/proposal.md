# Proposal

## Why

`lean-proof/generate.py` is two tools sharing a file: a `.ff` parser/emitter and a proof-shape classifier. The classifier (`prepare()` dispatch: rec-reaching → `_prepare_recursive`; quotation tokens → six `_prepare_runq_*` paths; `where` → existential form; else straight-line) decides per word *which theorem shape to emit and which proof strategy it needs*, in Python, before Lean ever runs. Every new word shape has therefore cost changes on both sides of the seam: new Python routing plus new tactic capability, coupled. The `lean-effect-macro` change moves statement synthesis into the `fbm_effect` elaborator but leaves this routing intact — the generator still decides *how* each word proves.

## What Changes

- Generator emits a uniform shape for every word: `def ...Prog`, one `fbm_effect ...` declaration carrying the effect text, and `by fbm_verify` with no dependency list and no path selection. The `_prepare_*` dispatch (recursive / six runQ paths / quot-primitive / where-existential / straight-line) is deleted, not moved; shape-specific validation becomes tactic errors.
- `fbm_verify` resolves callees, splits (`Spec.seq` at `Tok.call`, branch/cond backtracking already landed), and closes — or fails with a clean `needs @by-proof`-style error naming the word and the missing reasoning. Uncovered shapes stay uncovered, raised from Lean instead of Python: graceful degradation, no regressions.
- `check.py` maps tactic failures back to TAP via the existing doc-comment attribution, unchanged.
- Gated after `lean-effect-macro` (this change consumes the `fbm_effect` elaborator; statement-shape logic moves there first, routing deletion second).
- Explicit non-gate: the tactic's full repertoire is NOT required first. New reasoning continues to land as tactic extensions with the words that need them as tests; the Python shape code shrinks monotonically as each path's tactic equivalent lands.

## Capabilities

### Modified Capabilities
- `lean-effect-prover`: uniform emission (program + effect declaration + `by fbm_verify`, no deps, no routing) with tactic-resolved proofs and clean tactic-raised failures for uncovered shapes.

## Impact

- `lean-proof/generate.py` (delete `_prepare_*` dispatch + shape-specific emitters, ~2000+ lines; keep parser, `Prog` emission, `fbm_effect` emission).
- `lean-proof/Fbm/Prover.lean` (callee resolution + clean-failure errors in `fbm_verify`).
- `lean-proof/check.py` (no change expected; failure attribution already doc-comment based).
- `lean-proof/README.md` / `lean-proof/HELP.md` (uniform pipeline docs; "clean problem" now means a Lean error, not a generator refusal).
- All `@effect` suites must pass unchanged under `chomp test:lean` (parsed-equal TAP gate).
