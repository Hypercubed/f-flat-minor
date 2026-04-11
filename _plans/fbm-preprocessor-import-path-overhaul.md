---
status: done
status_date: 2026-04-11
creator: Kilo
---

# Plan: FBM Preprocessor Import Path Overhaul

## Summary

Implemented a two-tier import resolver for the FBM preprocessor: explicit file-relative imports keep current behavior, while angle-bracket imports resolve through a configurable standard-library search path. The shipped shared resolver also includes same-name directory-index resolution, so directory loads like `math -> math/math.ffp` landed as part of this work.

## Context

Today `.import` and `.load` resolve only relative to the file being preprocessed (`typescript/core/src/preprocess.ts:109`, `go/src/preprocess/preprocess.go:227`, `racket/private/preprocess.rkt:7`). That makes stdlib imports verbose and location-sensitive: examples and tutorials use paths like `../lib/prelude.ffp` or `../../lib/prelude.ffp` even though they are conceptually importing from the FBM standard library.

Existing systems suggest a clear direction:

- C/C++ separates local-first includes (`"..."`) from system includes (`<...>`) and allows extra include roots with ordered flags like `-I`, `-iquote`, and `-isystem`.
- Node distinguishes relative/absolute paths from bare package names and resolves package roots via an ordered search algorithm.
- Python exposes a flexible path list, but its global mutability and shadowing behavior are a cautionary example.
- Go favors canonical package paths and reproducibility over heuristic path walking.

FBM should keep its current source-file-relative semantics for local imports, add an explicit syntax for stdlib imports, and keep search-path configuration deterministic and small in scope.

## Approach

### 1. Adopt explicit import classes

Treat import targets as one of three classes:

1. `./foo`, `../foo`, `/abs/path` -> filesystem imports, resolved exactly as today relative to the importing file or absolute path.
2. `<prelude>`, `<math/sqrt>`, `<seq/seq.ffp>` -> stdlib-path imports, resolved against an ordered list of standard-library roots.
3. Anything else -> preserve current behavior for backward compatibility in the first implementation by treating it like a filesystem-relative import; do not introduce Node-style bare-specifier package lookup yet.

Recommended surface syntax:

```fbm
.import <prelude>
.import <math/sqrt>
.import ./local-helper.ffp
.load ../shared/common.ffp
```

Rationale:

- Matches the user's stated analogy to the C preprocessor.
- Avoids ambiguity because the repo currently has no bare `.import foo` style imports in `ff/**/*.ffp`.
- Preserves every existing relative import unchanged.

### 2. Define deterministic resolution rules

Implement one shared resolution algorithm in the TypeScript core preprocessor and mirror it in Go and Racket.

#### Filesystem imports (`./`, `../`, `/`)

- Keep current current-file-relative behavior.
- Canonicalize the resolved path before using it as an import-dedup key.

#### Stdlib imports (`<...>`)

Given a specifier like `<math/sqrt>` and an ordered list of stdlib roots:

1. Strip the angle brackets to get the logical stdlib path.
2. For each stdlib root in order, try candidates in this order:
   - `<root>/<logical-path>` if it already names a file
   - `<root>/<logical-path>.ffp`
   - `<root>/<logical-path>.ff`
   - if `<root>/<logical-path>` is a directory, apply the existing directory-index proposal from `_plans/directory-loading.md` and try `<root>/<logical-path>/<basename>.ffp`, then optionally `.ff`
3. Return the first match.
4. If no root matches, raise a clear error that includes the original specifier and the searched roots.

Important constraints:

- No parent-directory walking like `node_modules`.
- No implicit cwd-based fallback for stdlib imports.
- No silent shadowing of stdlib imports by relative files.
- Import dedup and privacy mangling must use the fully resolved canonical file path, not the raw specifier.

### 3. Extend preprocessor host/runtime APIs

The TypeScript core preprocessor currently knows only `readTextFile`, `fileExists`, and a small `path` API (`typescript/core/src/platform.ts:19`). Extend that API so the resolver can support stdlib roots and directory checks cleanly.

Recommended changes:

- Add preprocessor constructor options such as:
  - `stdlibRoots?: string[]`
  - `appendStdlibRoots?: string[]` only if the codebase benefits from distinguishing replacement vs append; otherwise a single ordered `stdlibRoots` list is enough.
- Extend `PreprocessHost` with a directory predicate, e.g. `directoryExists(path: string): boolean`, so directory-index resolution is not implemented via exception-driven file reads.
- Keep canonicalization in the resolver so Deno/Node/Bun/Web/Go/Racket all use the same dedup key semantics.

Runtime-specific default stdlib roots:

- Deno/Node/Bun CLIs: seed with the repo/runtime stdlib location equivalent to `ff/lib`.
- Web playground: seed with `/lib`, matching the virtual filesystem already used by `web/src/client/program-runner.ts:131` and `web/src/client/repl-session.ts:69`.
- Go CLI: seed with repo `ff/lib` equivalent for the executable layout.
- Racket: seed with the installed repo stdlib path in the same spirit as the other runtimes.

### 4. Add configuration knobs for stdlib search roots

Expose a minimal, ordered configuration model.

Recommended user-facing knobs:

- CLI repeatable flag: `--stdlib-root <path>`
- Environment variable: `FBM_STDLIB_PATH`, path-delimited (`:` on POSIX, `;` on Windows)
- Programmatic constructor option for embedded callers/tests/web

Resolution order recommendation:

1. Built-in default stdlib root
2. Environment-provided extra roots
3. CLI-provided extra roots in given order

If an explicit replacement mode is needed later, add `--no-default-stdlib` or `--stdlib-root-only`; do not start with replacement semantics unless there is a concrete use case.

This meets the user's goal of allowing settings or additions to the stdlib import path without making resolution globally unpredictable.

### 5. Update CLI parsing and call sites

Touch all preprocessing entrypoints that instantiate a preprocessor:

- `deno/bin/ff-preprocess.ts`
- `deno/bin/ff-run.ts`
- `deno/bin/ff-compile.ts`
- `deno/bin/ff-repl.ts`
- `node/bin/ff-preprocess.ts`
- `node/bin/ff-run.ts`
- `node/bin/ff-compile.ts`
- `node/bin/ff-repl.ts`
- `bun/bin/ff-preprocess.ts`
- `bun/bin/ff-run.ts`
- `bun/bin/ff-compile.ts`
- `bun/bin/ff-repl.ts`
- `go/cmd/preprocess/preprocess.go`
- any Go run/compile commands that preprocess
- web playground/session construction sites

Also update shared arg types in `typescript/core/src/args.ts` for the TypeScript CLIs.

### 6. Preserve backward compatibility while enabling migration

Do not rewrite the repo in the same change as the resolver unless the implementation remains small and low-risk. Recommended rollout:

1. Implement new syntax and configuration.
2. Add tests proving old relative imports still work.
3. Optionally migrate obvious stdlib imports later, starting with:
   - `ff/hello.ffp`
   - tutorial/codetta entrypoints
   - examples using `../lib/...`

This keeps the feature additive and reduces churn.

### 7. Testing plan

Add resolver tests in all supported implementations:

#### TypeScript/Deno core tests

- Existing relative import behavior is unchanged.
- `.import <prelude>` resolves through the default stdlib root.
- `.import <math/sqrt>` and `.import <core/core.ff>` resolve correctly.
- Multiple stdlib roots respect left-to-right precedence.
- Missing stdlib import reports searched roots.
- Resolved stdlib files dedup correctly across equivalent spellings.
- Imported private-word mangling still keys off the resolved absolute path.

Use in-memory host tests where possible by extending the memory host with directory awareness.

#### Go tests

- Mirror the same cases in `go/src/preprocess/preprocess_test.go`.
- Cover environment/flag parsing separately in CLI tests if present.

#### Racket tests

- Add at least smoke coverage for one relative import and one stdlib import.

#### End-to-end tests

- Preprocess or run a small file containing `.import <prelude>`.
- Verify web playground bootstrapping still resolves `/lib/prelude.ffp` after the resolver changes.

### 8. Documentation updates

Update docs to describe the new import model and configuration:

- `README.md` Fbm+ preprocessor section
- `AGENTS.md` import-path note
- runtime README files if they document preprocessing flags

Document the resolution model plainly:

- `./` and `../` are source-file-relative
- `<...>` is stdlib-relative
- `--stdlib-root` appends additional stdlib roots
- stdlib imports are searched in order and are not resolved relative to the importing file

## Decisions already made

- Keep current file-relative semantics for local imports.
- Add an explicit stdlib import syntax rather than overloading current relative imports.
- Use angle brackets for stdlib imports as the primary new syntax.
- Use an ordered stdlib root list with a built-in default plus user-configurable additions.
- Keep resolution deterministic; do not add Python-style global hook complexity or Node-style parent-directory walking.
- Canonical resolved file paths remain the source of truth for `.import` deduplication and imported-symbol privacy mangling.
- `_plans/directory-loading.md` was folded into this implementation so directory-index resolution shipped once inside the shared resolver.

## Open questions

- None - ready to implement.

## Out of scope

- Full Go-like package/module naming beyond filesystem-backed stdlib roots.
- Remote import fetching or package registries.
- Arbitrary user-defined import hooks.
- Broad source migration of all existing relative imports in the same change.
- Reworking macro semantics beyond ensuring `.m`/`.ff`/`.ffp` still preprocess through the same resolver.

## Dependencies

- `_plans/directory-loading.md` was folded into this implementation, since both features modified the same path-resolution layer and shipped together.

## References

- `typescript/core/src/preprocess.ts:109`
- `typescript/core/src/platform.ts:19`
- `go/src/preprocess/preprocess.go:227`
- `racket/private/preprocess.rkt:7`
- `ff/lib/prelude.ffp:1`
- `web/src/client/program-runner.ts:131`
- `web/src/client/repl-session.ts:69`
- `_plans/directory-loading.md`
- GCC CPP manual, "Search Path"
- Go language/tooling docs on imports and modules
- Python language reference, "The import system"
- Node.js docs, "Modules: CommonJS modules"
