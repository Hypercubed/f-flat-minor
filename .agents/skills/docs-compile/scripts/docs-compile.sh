#!/usr/bin/env bash
# Refresh derived docs artifacts (optional durable indexes + docs-search cache).
# Run from anywhere inside the repository.
set -euo pipefail

find_agents_root() {
  local dir="$PWD"
  while [[ "$dir" != "/" ]]; do
    if [[ -d "$dir/.agents" ]]; then
      printf '%s\n' "$dir/.agents"
      return 0
    fi
    dir="$(dirname "$dir")"
  done
  return 1
}

if [[ -n "${AGENTS_ROOT:-}" ]]; then
  candidate="$AGENTS_ROOT"
  if [[ "$(basename "$candidate")" != ".agents" ]]; then
    candidate="$candidate/.agents"
  fi
  if [[ -d "$candidate" ]]; then
    agents_root="$(cd "$candidate" && pwd)"
  else
    echo "ERROR: AGENTS_ROOT does not resolve to a .agents directory: $AGENTS_ROOT" >&2
    exit 1
  fi
else
  agents_root="$(find_agents_root)" || {
    echo "ERROR: docs-compile.sh could not locate .agents. Set AGENTS_ROOT or run inside a repo tree." >&2
    exit 1
  }
fi
repo_root="$(dirname "$agents_root")"
cd "$repo_root"

if [[ -f ".agents/skills/docs-compile/scripts/generate-durable-indexes.py" ]]; then
  python3 ".agents/skills/docs-compile/scripts/generate-durable-indexes.py"
else
  echo "docs-compile: durable index generator not found, skipping."
fi

if [[ -f ".agents/skills/docs-search/scripts/index-docs.py" ]]; then
  python3 ".agents/skills/docs-search/scripts/index-docs.py"
else
  echo "docs-compile: docs-search indexer not found, skipping."
fi

echo "docs-compile: done."
