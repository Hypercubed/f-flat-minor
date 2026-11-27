# Design

## Context

Each backend strips or forwards `/* ... */` on its own path (shell helper orchestrates; TS/Go/etc. implement). The change adds one prefix check before the normal comment path: does the block open with `/**` (exactly slash-star-star, not slash-star)? If yes, emit `/*` + rest-verbatim. The check must run before directive detection so `/**` blocks never enter directive processing.

## Goals / Non-Goals

**Goals:** one prefix check per comment-forwarding implementation; byte-identical downstream output for equivalent spellings; documented restriction (no directives, no nesting).

**Non-Goals:** teaching any interpreter `/**`; changing `extract_effects` or flatteners; migrating existing `/*` comments; nested or unclosed doc blocks (same error behavior as `/*` today).

## Decisions

- **Normalize, don't fork**: output is always `/*`. Downstream never branches on comment kind — the property that makes this change safe across N implementations.
- **Verbatim body, inert directives**: the body is not re-scanned. A `.import` line inside `/**` is documentation, not an import. This is load-bearing for the safety argument (no execution-semantics change possible).
- **Per-backend implementation, shared test**: each comment-forwarding path implements the check; one shared test (flatten `/**` file vs `/*` file, byte-identical) covers all backends via `--pp` switching.

## Risks / Trade-offs

- **Risk**: a backend's stripper doesn't forward comments at all (drops them). → **Mitigation**: nothing to do there — dropped is dropped for both spellings identically. Only forwarding paths change.
- **Risk**: `/**/` (empty) or `/***` edge spellings. → **Mitigation**: `/**` prefix check covers `/***/` etc. as doc blocks (harmless — same normalization); `/**/` (no third char + close) is an ordinary empty block. Document both.
