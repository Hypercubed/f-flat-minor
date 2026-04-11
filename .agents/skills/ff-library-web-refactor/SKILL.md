---
name: ff-library-web-refactor
description: Use when refactoring non-Euler ff/*.ffp code into reusable ff/lib modules and when wiring libraries/examples into the web playground.
---

# f-flat-minor Library + Web Refactor Workflow

Use this skill for reusable non-Euler `ff/*.ffp` work and web playground integration.

## Tool bootstrap

- Use `mise x -- ...` for commands that depend on repo-managed tools such as `node`, `bun`, `deno`, `npm`, and `chomp`.
- If a managed tool is missing, run `mise install` once from the repo root, then retry the command with `mise x -- ...`.
- Do not switch runtimes just because a bare command is missing from `PATH`.

## Library extraction rules

1. Move reusable words from `ff/<name>.ffp` to `ff/lib/<name>.ffp`.
2. In library files, prefer:
```ff
.import ./core.ff
```
3. In top-level demos, prefer:
```ff
.load ./lib/<name>.ffp
```
4. Keep top-level files focused on demonstration/output after loading the library.

## Naming rules

- Public API words should be short and intention-revealing (for example `atan`, `atan2`, `atan-inv`).
- Internal helpers should use underscore prefixes (for example `_atan2-core`).
- Export only required public words and collapse redundant wrappers.

## Debugging stack-heavy words

1. Validate stack effects with tiny probes before broad refactors.
2. Use trace mode to localize underflows and ordering bugs:
```bash
mise x -- node node/bin/ff-run.ts -t <file>.ffp
```
3. Remember queue behavior: `q<` pops from stack into queue; `q>` restores in FIFO order.

## Web playground wiring checklist

When adding or renaming libraries/examples used in web:

1. Update `web/src/app.ts` raw imports.
2. Update `createVirtualFiles(...)` VFS map entries (for `/lib/...` and related files).
3. Update `EXAMPLES` map entries for new examples.
4. Update example `<select>` options.
5. Verify build:
```bash
mise x -- npm --prefix web run build
```

## Example documentation standard

- Every file surfaced in the web example dropdown should include a short description comment near the top.
- Place the comment immediately after `.load`/`.import` and before definitions.
- Prefer one-line “what this program does” phrasing.
