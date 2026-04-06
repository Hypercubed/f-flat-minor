---
status: ready
status_date: 2026-03-21
creator: openai/gpt-5.4
---

# Plan: Node Chomp Build, Test, and Benchmark Support

## Summary
Add first-class `chomp` support for the existing Node implementation so the repo can run `build`, `test`, and `bench` workflows for Node in the same style as other runtimes. This plan intentionally scopes Node support to the current `ff-run` source runner and does not expand Node's CLI surface.

## Context
The repo-wide `chomp` workflow expects implementations to expose per-runtime `build`, `test`, and optionally `bench` tasks through a local `chompfile.toml`. Most runtimes already do this, and the root `chompfile.toml` already knows how to dispatch `build:{name}` and `test:{name}` when a runtime-specific chompfile exists.

The recently added Node implementation currently provides only `node/bin/ff-run.ts` plus minimal `package.json` wiring. There is no `node/chompfile.toml`, no `chomp build:node` or `chomp test:node`, and Node is absent from the repo benchmark tasks. This plan fills that gap without introducing `ff-compile`, `ff-execute`, `ff-preprocess`, or REPL support for Node.

## Approach
- Add `node/chompfile.toml` with the standard task shape used elsewhere in the repo: `build`, `build:run`, `test`, `test:interpret`, `test:ff`, `bench`, and `clean`.
- Implement `build:run` as a lightweight artifact-producing step that writes an executable wrapper to `node/build/ff-run`. The wrapper should invoke `node --experimental-transform-types` on `node/bin/ff-run.ts` so downstream tasks can use a stable built path like other runtimes do.
- Make `build:run` depend on `node/bin/ff-run.ts`, `node/src/**/*.ts`, and `../typescript/core/src/**/*.ts` so changes in the shared TypeScript core invalidate the Node build as expected.
- Define `test:interpret` as a smoke test against `../ff/example.ff`, comparing the runner output with `../ff/example.out` using the existing `cmp` template pattern from other runtimes.
- Add one explicit `.ffp` smoke test, using a fixture such as `../ff/golf/hello.ffp`, so preprocessing support is covered directly rather than only through the corpus loop.
- Define `test:ff` in the same style as `deno/chompfile.toml`: iterate `../ff/##.out`, run matching `.ff` and `.ffp` sources through `./build/ff-run`, and also run the `--opt` variant for each matching source.
- Keep `test` as a serial aggregate of `build`, the smoke tests, and the corpus test so `chomp test:node` behaves consistently with the other implementations.
- Add a Node-local `bench` task that depends on `build:run` and benchmarks `./build/ff-run ../ff/example.ff` plus `./build/ff-run ../ff/example.ff --opt` with `hyperfine`.
- Update the root `chompfile.toml` so Node is included in the mixed `bench` command and the interpreter-focused `bench:interp` command. Do not add Node to `bench:execute` or `bench:compile`, because this plan does not add execute-only or compile-only Node CLIs.
- Update `node/README.md` to document `chomp build:node`, `chomp test:node`, and `chomp -c node/ bench`, and to clarify that these tasks cover the existing `ff-run` implementation only.

## Decisions already made
- Scope is chomp-only around the existing Node `ff-run` entrypoint.
- Node should gain `build`, `test`, and `bench` task support without adding new `node/bin` commands.
- The Node build should produce a stable wrapper artifact in `node/build/ff-run` rather than using a no-op build.
- Corpus testing should cover both `.ff` and `.ffp` files and also exercise the `--opt` path, matching the stronger Deno-style coverage rather than a minimal smoke-only test.
- Root benchmark integration should include Node only in the mixed benchmark and interpreter benchmark families.

## Open questions
None — ready to implement.

## Out of scope
- Adding `node/bin/ff-compile.ts`, `node/bin/ff-execute.ts`, `node/bin/ff-preprocess.ts`, or a Node REPL.
- Bringing Node to full Deno CLI parity.
- Changing the shared TypeScript core behavior.
- Expanding `node/package.json` scripts beyond what is needed for existing Node usage.

## Dependencies
- None

## References
- `node/README.md`
- `deno/chompfile.toml`
- `chompfile.toml`
- `.agent/skills/plans/SKILL.md`
