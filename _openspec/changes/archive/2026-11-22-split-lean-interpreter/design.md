# Design

## Context

See `proposal.md` for motivation. Currently `lean-proof/preamble.lean` (449 lines) mixes the F♭m semantic interpreter (lines 1–274) with `execQ_ok_mono` and `execQ_append` (lines 275–449). `lean-proof/generate.py` reads `preamble.lean` at startup and prepends it verbatim to every generated Lean file, which `lean-proof/check.py` pipes to `lean --stdin` / temp file.

The environment has Lean 4.36.0 and Lake 5.0.0 installed under `~/.elan/bin/`.

## Goals / Non-Goals

**Goals:**
- Separate `lean-proof/preamble.lean` into `Fbm/Interp.lean` (pure semantics) and `Fbm/Prover.lean` (proof lemmas, importing `Fbm.Interp`).
- Add `lean-proof/lakefile.toml` and `lean-proof/lean-toolchain` using core Lean 4 only (no Mathlib).
- Provide a minimal `Fbm/Main.lean` executable target importing only `Fbm.Interp`.
- Update `generate.py`, `check.py`, and `chompfile.toml` to use `import Fbm.Prover` and `lake env lean` (with `lake build` as a prerequisite).

**Non-Goals:**
- Changing `@effect` syntax, theorem statements, or the proof strategy in `generate.py` (deferred to `compositional-lean-prover`).
- Adding a full `.ff` preprocessor or `.ffb` VLQ bytecode decoder to `Fbm/Main.lean` beyond basic token execution / CLI wiring needed to run the interpreter standalone.

## Decisions

- **Use `lakefile.toml` over `lakefile.lean`**: `lakefile.toml` is declarative, zero-boilerplate, and standard in Lean 4.36 / Lake 5.0. Alternative: `lakefile.lean` (unnecessary unless custom build hooks are needed).
- **Invoke `lake env lean` in `check.py` (and `lean` PATH resolution)**: `lake env lean --json <tmp.lean>` automatically sets `LEAN_PATH` to the compiled `.olean`s in `.lake/build/lib/lean`, so generated files only need `import Fbm.Prover`. Alternative: passing `LEAN_PATH` manually in `check.py` (fragile if Lake's build layout changes).
- **Keep `preamble.lean` removed or as a thin deprecation note?**: Remove `preamble.lean` once split so there is a single source of truth (`Fbm/Interp.lean` and `Fbm/Prover.lean`).

## Risks / Trade-offs

- **Risk**: `lake` or `lean` is in `~/.elan/bin/` and not on `PATH` in non-login shells. → **Mitigation**: `check.py` already falls back to `~/.elan/bin/lean`; add the same fallback for `lake` (`~/.elan/bin/lake`), and document `PATH` in `chompfile.toml` / `README.md`.
- **Risk**: Stale `.olean` files if `Fbm/Interp.lean` or `Fbm/Prover.lean` is edited without rebuilding. → **Mitigation**: `chompfile.toml` runs `lake build` before `prove --exec "python3 check.py" ...` (or `check.py` can check/run `lake build` if `.olean` is missing).
