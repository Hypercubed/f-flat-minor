---
id: git-restore-loses-uncommitted-knowledge-edits
title: "Git restore drops uncommitted edits under `.agents/`"
last_updated: 2026-04-22
description: >
  Running git checkout or git restore from HEAD on paths under `.agents/`
  replaces working-tree files and discards uncommitted markdown edits done earlier in the session.
tags: [git, docs, knowledge]
---

#### Symptom

After `git checkout HEAD -- <path>` or `git restore --source=HEAD -- <path>` for one or more paths under `.agents/` (for example `docs/plans/*.md`, `AGENTS.md`, or a whole subtree), files match `HEAD` but **no longer contain edits you had only in the working tree** from the current session.

#### Likely causes

- Restore/checkout intentionally resets tracked paths to the committed snapshot.
- A missing directory or bad merge was fixed by restoring a subtree from git without capturing local-only changes first.

#### Fix

1. Identify which paths were restored (`git status`, or your shell history).
2. Re-apply intentional edits (re-diff against a stash if you created one, or re-implement from session notes / closeout bundle).
3. Prefer **scoped** paths (single file or small folder) instead of restoring all of `.agents/` unless you mean to discard everything under that path.

#### Validation

- `git diff` shows the intended content again for the affected paths, or changes are committed on a branch you can merge.
