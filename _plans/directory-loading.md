# Plan: Directory Loading for `.import`

## Goal

When `.import math` is encountered and `math` is a directory (not a file), the preprocessor should automatically resolve it to `math/math.ffp` — the same-named index file inside that directory.

## Current Behavior

`.import` resolves a path to a file and loads it. If the path does not resolve to an existing file, it is an error.

## Desired Behavior

`.import <path>` resolution order:

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

This logic belongs in the preprocessor's import resolver, before the file is opened for reading. No changes are needed to the parser, tokenizer, or VM.

### Extension stripping (optional)

If `.import math.ffp` and `.import math` should both work, the resolver can additionally try stripping the `.ffp` extension and retrying as a directory lookup. Suggested resolution order if this is desired:

1. Exact file match
2. Exact file match with `.ffp` appended (if no extension given)
3. Directory index (`<path>/<basename>.ffp`)
4. Error

## Guard: already-loaded files

Directory resolution should participate in the existing already-loaded guard (if one exists) so that `.import seq` and `.import seq/seq.ffp` in the same session do not load the file twice. The canonical key should be the fully resolved absolute path after directory expansion.

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
