#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_ff-common.sh"

DEFAULT_ENGINE="cpp"

usage() {
  cat <<'EOF' >&2
Usage:
  ./shell/ff-pack.sh [--quiet] [--engine <engine>] [--compiler <compiler>] [--pp <preprocessor>] <file.ff|file.ffp|file.ffb|-> [output_file]

Pack f-flat-minor bytecode into a self-executing binary. If a source file (.ff or .ffp)
is provided, it is first compiled to bytecode (.ffb) using shell/ff-compile.sh.

If output_file is specified, the packed binary is written there and made
executable. Otherwise, the output is written to stdout.

Examples:
  ./shell/ff-pack.sh ff/example.ffb myapp
  ./shell/ff-pack.sh ff/example.ff myapp
  ./shell/ff-pack.sh --compiler go ff/example.ffp myapp
  ./shell/ff-pack.sh --engine cpp ff/example.ffb myapp
  cat ff/example.ffb | ./shell/ff-pack.sh - myapp

Options:
  --engine, --run <engine>   The execution engine to prepend (default: cpp).
                             Supported: cpp
  --compiler <compiler>      The compiler engine to use for .ff or .ffp files (default: deno).
                             Supported: deno, node, bun, go, racket
  --pp <preprocessor>        The preprocessor engine to use for .ffp files (default: bun).
                             Supported: go, deno, bun, node
  --quiet                    Disable command tracing (sets FF_SHELL_TRACE=0).
  --help, -h                 Show this help message.
EOF
}

engine="$DEFAULT_ENGINE"
compiler=""
preprocessor=""
file=""
output_file=""

if [ "$#" -lt 1 ]; then
  usage
  exit 1
fi

while [ "$#" -gt 0 ]; do
  case "$1" in
    --quiet)
      export FF_SHELL_TRACE=0
      shift
      ;;
    --engine|--run)
      [ "$#" -ge 2 ] || die "Missing value for $1"
      engine="$2"
      shift 2
      ;;
    --compiler)
      [ "$#" -ge 2 ] || die "Missing value for --compiler"
      compiler="$2"
      shift 2
      ;;
    --pp)
      [ "$#" -ge 2 ] || die "Missing value for --pp"
      preprocessor="$2"
      shift 2
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    --)
      shift
      if [ -n "$file" ]; then
        [ "$#" -eq 1 ] || die "Expected exactly one output file after --"
        output_file="$1"
        shift
      else
        [ "$#" -le 2 ] || die "Expected at most two arguments after --"
        [ "$#" -ge 1 ] || die "Missing input file"
        file="$1"
        shift
        if [ "$#" -eq 1 ]; then
          output_file="$1"
          shift
        fi
      fi
      ;;
    -*)
      usage
      die "Unknown option: $1"
      ;;
    *)
      if [ -z "$file" ]; then
        file="$1"
      elif [ -z "$output_file" ]; then
        output_file="$1"
      else
        usage
        die "Expected at most two positional arguments, got: $file, $output_file, and $1"
      fi
      shift
      ;;
  esac
done

[ -n "$file" ] || die "Missing input file"

if [ "$file" != "-" ]; then
  [ -f "$file" ] || die "Input file not found: $file"
  case "$file" in
    *.ffb|*.ff|*.ffp) ;;
    *)
      usage
      die "Expected a .ffb, .ff, or .ffp input file, or '-', got: $file"
      ;;
  esac
fi

if [ -n "$compiler" ]; then
  is_compiler "$compiler" || die "Unknown compiler preset: $compiler"
fi
if [ -n "$preprocessor" ]; then
  is_preprocessor "$preprocessor" || die "Unknown preprocessor preset: $preprocessor"
fi

temp_ffb=""
cleanup() {
  if [ -n "$temp_ffb" ] && [ -f "$temp_ffb" ]; then
    rm -f "$temp_ffb"
  fi
}
trap cleanup EXIT

case "$file" in
  *.ff|*.ffp)
    temp_ffb="$(mktemp)"
    compile_args=()
    if [ "${FF_SHELL_TRACE:-1}" = "0" ]; then
      compile_args+=("--quiet")
    fi
    if [ -n "$compiler" ]; then
      compile_args+=("--compiler" "$compiler")
    fi
    if [ -n "$preprocessor" ]; then
      compile_args+=("--pp" "$preprocessor")
    fi
    print_command "$REPO_ROOT/shell/ff-compile.sh" "${compile_args[@]}" "$file" ">" "$temp_ffb"
    "$REPO_ROOT/shell/ff-compile.sh" "${compile_args[@]}" "$file" > "$temp_ffb" || exit 1
    file="$temp_ffb"
    ;;
esac

case "$engine" in
  cpp)
    EXECUTOR_BIN="$REPO_ROOT/cpp/build/execute"
    ENGINE_NAME="C++"
    ;;
  *)
    usage
    die "Engine '$engine' is not supported for packing. Currently supported: cpp"
    ;;
esac

[ -f "$EXECUTOR_BIN" ] || die "$ENGINE_NAME executor binary not found at $EXECUTOR_BIN. Please build it first."

if [ -n "$output_file" ]; then
  print_command cat "$EXECUTOR_BIN" "$file" ">" "$output_file"
  if [ "$file" = "-" ]; then
    cat "$EXECUTOR_BIN" - > "$output_file"
  else
    cat "$EXECUTOR_BIN" "$file" > "$output_file"
  fi
  print_command chmod +x "$output_file"
  chmod +x "$output_file"
else
  # Output to stdout
  if [ "$file" = "-" ]; then
    cat "$EXECUTOR_BIN" -
  else
    cat "$EXECUTOR_BIN" "$file"
  fi
fi

