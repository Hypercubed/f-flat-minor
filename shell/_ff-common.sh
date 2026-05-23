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
    python|ruby|dart|deno|node|bun|go|racket|cpp) return 0 ;;
    *) return 1 ;;
  esac
}

is_preprocessor() {
  case "${1-}" in
    go|deno|bun|node) return 0 ;;
    *) return 1 ;;
  esac
}

is_compiler() {
  case "${1-}" in
    deno|node|bun|go|racket) return 0 ;;
    *) return 1 ;;
  esac
}

is_executor() {
  case "${1-}" in
    deno|node|bun|go|racket) return 0 ;;
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

ff_interpret() {
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
    racket)
      runner_cmd=(racket "$REPO_ROOT/racket/main.rkt")
      if [ "$input" = "-" ]; then
        print_command "${runner_cmd[@]}" "-"
        exec "${runner_cmd[@]}" "-"
      fi
      print_command "${runner_cmd[@]}" "$input"
      exec "${runner_cmd[@]}" "$input"
      ;;
    cpp)
      runner_cmd=("$REPO_ROOT/cpp/build/run")
      if [ "$input" = "-" ]; then
        print_command "${runner_cmd[@]}"
        exec "${runner_cmd[@]}"
      fi
      print_command "${runner_cmd[@]}" "$input"
      exec "${runner_cmd[@]}" "$input"
      ;;
  esac
}

ff_execute() {
  local executor="$1"
  local input="$2"

  case "$executor" in
    deno)
      print_command "$REPO_ROOT/deno/build/ff-execute" "$input"
      exec "$REPO_ROOT/deno/build/ff-execute" "$input"
      ;;
    node)
      print_command \
        mise exec -- \
        node \
        --experimental-transform-types \
        --disable-warning=ExperimentalWarning \
        -- \
        "$REPO_ROOT/node/bin/ff-execute.ts" \
        "$input"
      exec mise exec -- \
        node \
        --experimental-transform-types \
        --disable-warning=ExperimentalWarning \
        -- \
        "$REPO_ROOT/node/bin/ff-execute.ts" \
        "$input"
      ;;
    bun)
      print_command mise exec -- bun -- "$REPO_ROOT/bun/bin/ff-execute.ts" "$input"
      exec mise exec -- bun -- "$REPO_ROOT/bun/bin/ff-execute.ts" "$input"
      ;;
    go)
      print_command "$REPO_ROOT/go/build/execute" --in "$input"
      exec "$REPO_ROOT/go/build/execute" --in "$input"
      ;;
    racket)
      if [ "$input" = "-" ]; then
        print_command racket "$REPO_ROOT/racket/main.rkt" "-b" "-"
        exec racket "$REPO_ROOT/racket/main.rkt" "-b" "-"
      else
        print_command racket "$REPO_ROOT/racket/main.rkt" "$input"
        exec racket "$REPO_ROOT/racket/main.rkt" "$input"
      fi
      ;;
  esac
}

ff_compile() {
  local compiler="$1"
  local input="$2"
  local no_preprocess="$3"
  local opt="$4"
  local compile_cmd=()

  case "$compiler" in
    deno)
      compile_cmd=(mise exec -- deno run --no-check --allow-read --allow-env "$REPO_ROOT/deno/bin/ff-compile.ts")
      [ "$no_preprocess" = "true" ] && compile_cmd+=("--no-preprocess")
      [ "$opt" = "true" ] && compile_cmd+=("--opt")
      compile_cmd+=("$input")
      print_command "${compile_cmd[@]}"
      exec "${compile_cmd[@]}"
      ;;
    node)
      compile_cmd=(mise exec -- node --experimental-transform-types --disable-warning=ExperimentalWarning -- "$REPO_ROOT/node/bin/ff-compile.ts")
      [ "$no_preprocess" = "true" ] && compile_cmd+=("--no-preprocess")
      [ "$opt" = "true" ] && compile_cmd+=("--opt")
      compile_cmd+=("$input")
      print_command "${compile_cmd[@]}"
      exec "${compile_cmd[@]}"
      ;;
    bun)
      compile_cmd=(mise exec -- bun -- "$REPO_ROOT/bun/bin/ff-compile.ts")
      [ "$no_preprocess" = "true" ] && compile_cmd+=("--no-preprocess")
      [ "$opt" = "true" ] && compile_cmd+=("--opt")
      compile_cmd+=("$input")
      print_command "${compile_cmd[@]}"
      exec "${compile_cmd[@]}"
      ;;
    go)
      compile_cmd=("$REPO_ROOT/go/build/compile" --in "$input")
      print_command "${compile_cmd[@]}"
      exec "${compile_cmd[@]}"
      ;;
    racket)
      if [ "$input" = "-" ]; then
        local tmp_file
        tmp_file="$(mktemp "$REPO_ROOT/.racket-compile-XXXXXX.ff")"
        cat > "$tmp_file"
        trap 'rm -f "$tmp_file"' EXIT INT TERM
        compile_cmd=(racket "$REPO_ROOT/racket/main.rkt")
        [ "$no_preprocess" = "true" ] && compile_cmd+=("--no-pp")
        compile_cmd+=("--compile" "$tmp_file")
        print_command "${compile_cmd[@]}"
        "${compile_cmd[@]}"
        rm -f "$tmp_file"
        trap - EXIT INT TERM
      else
        compile_cmd=(racket "$REPO_ROOT/racket/main.rkt")
        [ "$no_preprocess" = "true" ] && compile_cmd+=("--no-pp")
        compile_cmd+=("--compile" "$input")
        print_command "${compile_cmd[@]}"
        exec "${compile_cmd[@]}"
      fi
      ;;
  esac
}
