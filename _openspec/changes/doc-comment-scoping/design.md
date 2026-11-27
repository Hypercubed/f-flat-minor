# Design

## Context

`ff.tmLanguage.json` `comments.patterns[0]` matches `(/\*\s*)(@effect)\b` and scopes the block `comment.block.effect.f-flat-minor` with `#effectInner` inside. The change adds a sibling rule for `/**` matched first (TextMate picks the earliest `begin`), scoping the frame as the standard documentation scope and including the same `#effectInner` for `@effect` bodies.

## Goals / Non-Goals

**Goals:** theme-native doc rendering for `/**`; zero change to `/*` handling; `#effectInner` reuse, not duplication.

**Non-Goals:** changing what counts as an effect (generator's job); hover/IntelliSense (separate extension features); migrating existing comments.

## Decisions

- **Standard scope, custom interior**: frame uses the stock documentation-comment scope every theme already styles; interior reuses `#effectInner` verbatim. No per-theme F♭m work, ever.
- **Rule order**: the `/**` rule precedes the `/*`-`@effect` rule so the longer opener wins. `/*`-`@effect` blocks keep their current scope (unchanged behavior for the existing library).

## Risks / Trade-offs

- **Risk**: a theme renders documentation comments poorly for this language. → **Mitigation**: stock VSCode themes all style doc comments distinctly; fallback is today's generic comment look — strictly no worse.
