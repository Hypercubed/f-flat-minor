# Tasks

## 1. Witness threading (acceptance: __tail_loop)

- [ ] 1.1 Probe-first: hand-write the witness-threaded composition for `__tail_loop`'s shape in `/tmp` probes (slot-scoped existentials per eval boundary, nested `execQ_append`), confirming the midpoint metas pin.
- [ ] 1.2 Generalize into `_prepare_runq_compose` / `_emit_spec_compose` (replace the `where` refusal for the two-eval path; three-or-more stays a clean problem) + any `fbm_verify` composer-side application support needed. Annotate `__tail_loop` with its `ensures` + explicit-measure clause; TAP `ok`, suite green, `!`/`nck`/`ilb`/`ilog` unaffected.
- [ ] 1.3 Document compose-path `ensures` in HELP.md (slot-scoped witness rule, two-eval limit, clean-problem boundary).

## 2. Regression

- [ ] 2.1 Full suite green (math + primitives + prelude), parsed-equal TAP except the new `__tail_loop` theorem. `__parts` and atanh core explicitly out of scope (follow-ups).
