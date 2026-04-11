---
name: ff-lib-word-rankings
description: Regenerate _docs/supplemental/ff-lib-word-definition-rankings.md — a table ranking every word in ff/lib by definition token count.
---

# ff/lib Word Definition Rankings

Use this skill when the task is to update `_docs/supplemental/ff-lib-word-definition-rankings.md`.

## How it works

The script `.agents/skills/ff-lib-word-rankings/generate-rankings.py`:

1. Walks `ff/lib` (skipping `__tests__/` dirs) for `.ff` and `.ffp` files.
2. Strips block (`/* ... */`) and line (`// ...`) comments.
3. Parses every `name: body ;` definition.
4. Counts whitespace-separated tokens in the body.
5. Writes a markdown table to `_docs/supplemental/ff-lib-word-definition-rankings.md` sorted descending by token count, with today's date in the title.

## Regenerate

```bash
python3 .agents/skills/ff-lib-word-rankings/generate-rankings.py
```

Optionally specify a different output path:

```bash
python3 .agents/skills/ff-lib-word-rankings/generate-rankings.py path/to/output.md
```
