# Design

## Context

Mirrors the existing `@effect` rule in the same file: `begin: (/\*\s*)(@lean)\b` capturing the directive as `keyword.directive`, interior including the foreign grammar. TextMate `include: source.lean` resolves via the Lean extension when installed; when absent the include silently matches nothing, leaving the block's own comment scope — the graceful fallback is structural, not coded.

## Goals / Non-Goals

**Goals:** readable `@lean` blocks with Lean installed; invisible degradation without it; same treatment inside `/**` doc blocks.

**Non-Goals:** Lean IntelliSense inside blocks (hover, go-to-def — separate extension work); validating block contents (generator's `sorry`-rejection owns that).

## Decisions

- **Same pattern as `@effect`**: one rule, directive capture, foreign-grammar include. Proven in-file precedent, ~15 lines.
- **No dependency on the Lean extension**: `source.lean` include is best-effort by TextMate design. Never add an `extensionDependencies` entry — the F♭m extension must install cleanly without Lean.

## Risks / Trade-offs

- **Risk**: `source.lean` scope name differs across Lean extension versions. → **Mitigation**: verify against the current Lean extension's grammar scope at build time; note the scope string in a comment so future updates know what to check.
