# Tasks

## 1. Preprocessor normalization

- [ ] 1.1 Implement the `/**` → `/*` prefix check in each comment-forwarding path (shell helper + backends that forward comments). Verbatim body, no directive processing, no nesting.
- [ ] 1.2 Shared test: flatten a `/**`-spelled file and its `/*`-spelled twin under each `--pp` backend; assert byte-identical output. Edge cases: `/**/`, `/*** ... */`, unclosed `/**` (same error as `/*`).

## 2. Docs

- [ ] 2.1 Document the `/**` form + restrictions (verbatim, inert, no nesting) in the preprocessor/shell README or relevant docs.
