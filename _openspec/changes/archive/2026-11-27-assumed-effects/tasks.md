# Tasks

## 1. Parser: @by-axiom clause

- [x] 1.1 Extend `_split_proof_clauses` in `lean-proof/generate.py` to accept a trailing `@by-axiom <justification>` as a fourth clause alternative (same one-clause rule, same `sorry`/`admit`/`axiom` rejection, non-empty justification required). Carry it into `EmitCtx` alongside `by_proof`/`by_ind`.
- [x] 1.2 Error when two effects on one word mix assumed and proven clauses.

## 2. Emission: axiom path + caller deps

- [x] 2.1 In `EmitCtx.emit`, when the effect carries `@by-axiom`: build the `Spec` statement via the existing path, emit it as `axiom <name>_effect : <statement>` with a `-- ASSUMED: <justification>` comment above (for check.py), and keep `Prog` emission unchanged. Verify the generated file parses (`lake env lean` accepts the axiom).
- [x] 2.2 Add the `gcd(A,B)` (or agreed spelling) mapping in the expression emitter to a Lean-side helper (same pattern as `land`/`lor`); fall back to a clean problem if awkward.
- [x] 2.3 Annotate `gcd` with `@by-axiom remainder-decrease needs well-founded induction beyond N-1/R.length patterns` and `lcm` with a plain `@effect` (`dup2 gcd / *`, `L = A*B/gcd(A,B)` shape with `requires` guards as needed). Verify `lcm` proves via `fbm_verify [..., gcd_effect, ...]` and TAP shows it `ok` with the ASSUMED diagnostic on `gcd`.

## 3. Checker: ASSUMED TAP marker

- [x] 3.1 In `lean-proof/check.py`, detect the `-- ASSUMED` marker above an axiom and emit `ok N - <effect text>` with `# ASSUMED: <justification>` diagnostics. Verify the suite stays green with the assumption visible.
- [x] 3.2 Full regression: flattened `math.ffp` suite green (96+ new theorems, 0 `not ok`); primitives + prelude counts unchanged.

## 4. Docs

- [x] 4.1 Document the `@by-axiom` lifecycle in `lean-proof/HELP.md` (assume now → prove later → delete the clause; audit via `grep axiom` / `grep ASSUMED`; open assumptions are debt at archive review).
