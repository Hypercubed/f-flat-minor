---
name: ff-euler-ffp
description: Use when editing or debugging Project Euler programs in ff/euler/*.ffp, including preserving prompt data, implementing algorithmic solutions, and validating with the Node/Deno preprocessor runtime.
---

# f-flat-minor Euler Workflow

Use this skill for work in `ff/euler/*.ffp`.

## Core rules

1. Always solve algorithmically.
- Do not replace a Project Euler solution with a precomputed constant.
- Keep the original constraints and implement the actual algorithm in f-flat-minor words.

2. Verify the exact prompt and input data first.
- Confirm the exact Euler problem statement and required literals before editing.
- Preserve long digit/grid content exactly, including ordering.

3. Run `.ffp` with Node or Deno.
- Python `python/execute.py` does not preprocess `.ffp`.
- Preferred commands:
```bash
node node/bin/ff-run.ts ff/euler/<file>.ffp
node node/bin/ff-run.ts -t ff/euler/<file>.ffp
```

## Runtime gotchas

- Avoid multiline string literals in Euler files; keep long numeric strings as a single quoted token.
- `pick` is not guaranteed in core; implement a local equivalent if needed.
- Queue behavior is fragile in deep helpers: `q<` moves top of stack to queue, `q>` restores from queue.

## Debugging workflow

1. Validate helper stack effects in tiny probes (for example, temporary files in `/tmp`).
2. Prove helper words independently before full-scan recursion.
3. Use trace mode for stack underflow and ordering bugs:
```bash
node node/bin/ff-run.ts -t ff/euler/<file>.ffp
```
4. In scan solutions, confirm cleanup only drops dataset values, not the computed result.
5. If preserving a result across bulk `drop`, move it aside with `q< ... q>`.

## Build order for scan-style solutions

1. Parse/representation helpers
2. Single-position directional checks
3. Max-update logic with explicit stack-shape checks
4. Full scan recursion
5. Final cleanup and output
