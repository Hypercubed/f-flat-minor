#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

die() {
  printf '%s\n' "$*" >&2
  exit 1
}

trace_enabled() {
  [ "${FF_SHELL_TRACE:-1}" != "0" ]
}

print_command() {
  local arg

  trace_enabled || return 0

  printf '+' >&2
  for arg in "$@"; do
    printf ' %q' "$arg" >&2
  done
  printf '\n' >&2
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
      print_command "$REPO_ROOT/go/build/preprocess" --in "$file"
      exec "$REPO_ROOT/go/build/preprocess" --in "$file"
      ;;
    deno)
      print_command "$REPO_ROOT/deno/build/ff-preprocess" "$file"
      exec "$REPO_ROOT/deno/build/ff-preprocess" "$file"
      ;;
    bun)
      print_command mise exec -- bun -- "$REPO_ROOT/bun/bin/ff-preprocess.ts" "$file"
      exec mise exec -- bun -- "$REPO_ROOT/bun/bin/ff-preprocess.ts" "$file"
      ;;
    node)
      print_command \
        mise exec -- \
        node \
        --experimental-transform-types \
        --disable-warning=ExperimentalWarning \
        -- \
        "$REPO_ROOT/node/bin/ff-preprocess.ts" \
        "$file"
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
        print_command "${runner_cmd[@]}"
        exec "${runner_cmd[@]}"
      fi
      print_command cat "$input" "|" "${runner_cmd[@]}"
      cat "$input" | "${runner_cmd[@]}"
      ;;
    ruby)
      runner_cmd=(ruby "$REPO_ROOT/ruby/execute.rb")
      if [ "$input" = "-" ]; then
        print_command "${runner_cmd[@]}"
        exec "${runner_cmd[@]}"
      fi
      print_command cat "$input" "|" "${runner_cmd[@]}"
      cat "$input" | "${runner_cmd[@]}"
      ;;
    dart)
      runner_cmd=("$REPO_ROOT/dart/bin/dart.exe")
      if [ "$input" = "-" ]; then
        print_command "${runner_cmd[@]}"
        exec "${runner_cmd[@]}"
      fi
      print_command cat "$input" "|" "${runner_cmd[@]}"
      cat "$input" | "${runner_cmd[@]}"
      ;;
    deno)
      print_command "$REPO_ROOT/deno/build/ff-run" --no-preprocess "$input"
      exec "$REPO_ROOT/deno/build/ff-run" --no-preprocess "$input"
      ;;
    node)
      print_command \
        mise exec -- \
        node \
        --experimental-transform-types \
        --disable-warning=ExperimentalWarning \
        -- \
        "$REPO_ROOT/node/bin/ff-run.ts" \
        --no-preprocess \
        "$input"
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
      print_command mise exec -- bun -- "$REPO_ROOT/bun/bin/ff-run.ts" --no-preprocess "$input"
      exec mise exec -- bun -- "$REPO_ROOT/bun/bin/ff-run.ts" --no-preprocess "$input"
      ;;
    go)
      print_command "$REPO_ROOT/go/build/run" --in "$input"
      exec "$REPO_ROOT/go/build/run" --in "$input"
      ;;
  esac
}
