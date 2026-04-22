---
id: directory-loading
title: "Directory Loading for `.import`"
last_updated: 2026-04-11
description: >
  Directory index resolution when `.import` names a folder; implemented
  alongside `fbm-preprocessor-import-path-overhaul.md` in the shared import
  resolver.
tags: [plans]
status: completed
kind: initiative
author_kind: ai
prompter: "GPT-5.4"
---
# Plan: Directory Loading for `.import`

Implemented as part of `fbm-preprocessor-import-path-overhaul.md` via the shared import resolver.

## Goal

When `.import math` is encountered and `math` is a directory (not a file), the preprocessor automatically resolves it to `math/math.ffp` — the same-named index file inside that directory.

## Current Behavior

`.import` resolves a path to a file and loads it. If the path does not resolve to an existing file, it is an error.

## Desired Behavior

`.import <path>` resolution order is:

1. If `<path>` exists as a file → load it (current behavior, unchanged)
2. If `<path>` is a directory → resolve to `<path>/<basename>.ffp` and load that
3. Otherwise → error: file not found

Where `basename` is the last path segment. Examples:

| Directive | Resolves to |
|---|---|
| `.import math` | `math/math.ffp` |
| `.import seq` | `seq/seq.ffp` |
| `.import lib/math` | `lib/math/math.ffp` |
| `.import math/math.ffp` | `math/math.ffp` (unchanged) |
| `.import seq/fold.ffp` | `seq/fold.ffp` (unchanged) |

## Implementation

### Pseudocode

```
function resolveImport(rawPath, baseDir):
  resolved = join(baseDir, rawPath)

  if isFile(resolved):
    return resolved                          -- exact file match

  if isDirectory(resolved):
    basename = lastSegment(resolved)         -- e.g. "math"
    indexFile = join(resolved, basename + ".ffp")
    if isFile(indexFile):
      return indexFile                       -- directory index
    else:
      error: "directory has no index file: " + indexFile

  error: "import not found: " + resolved
```

### Integration point

This logic now lives in the preprocessor's import resolver, before the file is opened for reading. No changes were needed to the parser, tokenizer, or VM.

### Extension stripping (optional)

If `.import math.ffp` and `.import math` both need to work, the resolver can additionally try stripping the `.ffp` extension and retrying as a directory lookup. Suggested resolution order for that optional behavior is:

1. Exact file match
2. Exact file match with `.ffp` appended (if no extension given)
3. Directory index (`<path>/<basename>.ffp`)
4. Error

## Guard: already-loaded files

Directory resolution participates in the existing already-loaded guard so that `.import seq` and `.import seq/seq.ffp` in the same session do not load the file twice. The canonical key is the fully resolved absolute path after directory expansion.

## Error messages

| Situation | Message |
|---|---|
| Directory exists but no index file | `import error: 'math' is a directory but 'math/math.ffp' was not found` |
| Neither file nor directory | `import error: 'foo' not found` |
| Circular import | `import error: circular import detected: 'seq/fold.ffp'` |

## Tests

- `.import math` → loads `math/math.ffp` ✓
- `.import math/` (trailing slash) → same result ✓
- `.import math/math.ffp` → unchanged behavior ✓
- `.import math` where `math/` exists but `math/math.ffp` does not → clear error ✓
- `.import math` twice in same session → loads once ✓
- `.import nonexistent` → clear error ✓
