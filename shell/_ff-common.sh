#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

die() {
  printf '%s\n' "$*" >&2
  exit 1
}

is_runner() {
  case "${1-}" in
    python|ruby|dart|deno|node|bun|go) return 0 ;;
    *) return 1 ;;
  esac
}

is_preprocessor() {
  case "${1-}" in
    go|deno|bun|node) return 0 ;;
    *) return 1 ;;
  esac
}

ff_preprocess() {
  local preprocessor="$1"
  local file="$2"

  case "$preprocessor" in
    go)
      exec "$REPO_ROOT/go/build/preprocess" --in "$file"
      ;;
    deno)
      exec "$REPO_ROOT/deno/build/ff-preprocess" "$file"
      ;;
    bun)
      exec mise exec -- bun -- "$REPO_ROOT/bun/bin/ff-preprocess.ts" "$file"
      ;;
    node)
      exec mise exec -- \
        node \
        --experimental-transform-types \
        --disable-warning=ExperimentalWarning \
        -- \
        "$REPO_ROOT/node/bin/ff-preprocess.ts" \
        "$file"
      ;;
  esac
}

ff_execute() {
  local runner="$1"
  local input="$2"
  local runner_cmd

  case "$runner" in
    python)
      runner_cmd=(python3 "$REPO_ROOT/python/execute.py")
      if [ "$input" = "-" ]; then
        exec "${runner_cmd[@]}"
      fi
      cat "$input" | "${runner_cmd[@]}"
      ;;
    ruby)
      runner_cmd=(ruby "$REPO_ROOT/ruby/execute.rb")
      if [ "$input" = "-" ]; then
        exec "${runner_cmd[@]}"
      fi
      cat "$input" | "${runner_cmd[@]}"
      ;;
    dart)
      runner_cmd=("$REPO_ROOT/dart/bin/dart.exe")
      if [ "$input" = "-" ]; then
        exec "${runner_cmd[@]}"
      fi
      cat "$input" | "${runner_cmd[@]}"
      ;;
    deno)
      exec "$REPO_ROOT/deno/build/ff-run" --no-preprocess "$input"
      ;;
    node)
      exec mise exec -- \
        node \
        --experimental-transform-types \
        --disable-warning=ExperimentalWarning \
        -- \
        "$REPO_ROOT/node/bin/ff-run.ts" \
        --no-preprocess \
        "$input"
      ;;
    bun)
      exec mise exec -- bun -- "$REPO_ROOT/bun/bin/ff-run.ts" --no-preprocess "$input"
      ;;
    go)
      exec "$REPO_ROOT/go/build/run" --in "$input"
      ;;
  esac
}
