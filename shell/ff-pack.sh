#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_ff-common.sh"

DEFAULT_ENGINE="cpp"

usage() {
  cat <<'EOF' >&2
Usage:
  ./shell/ff-pack.sh [--quiet] [--engine <engine>] <file.ffb|-> [output_file]

Pack compiled f-flat-minor bytecode (.ffb) into a self-executing binary
by prepending the specified execution engine.

If output_file is specified, the packed binary is written there and made
executable. Otherwise, the output is written to stdout.

Examples:
  ./shell/ff-pack.sh ff/example.ffb myapp
  ./shell/ff-pack.sh --engine go ff/example.ffb myapp
  ./shell/ff-pack.sh ff/example.ffb > myapp
  cat ff/example.ffb | ./shell/ff-pack.sh - myapp

Options:
  --engine, --run <engine>   The execution engine to prepend (default: cpp).
                             Supported: cpp, go
  --quiet                    Disable command tracing (sets FF_SHELL_TRACE=0).
  --help, -h                 Show this help message.
EOF
}

engine="$DEFAULT_ENGINE"
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
    *.ffb) ;;
    *)
      usage
      die "Expected a .ffb input file or '-', got: $file"
      ;;
  esac
fi

case "$engine" in
  cpp)
    EXECUTOR_BIN="$REPO_ROOT/cpp/build/execute"
    ENGINE_NAME="C++"
    ;;
  go)
    EXECUTOR_BIN="$REPO_ROOT/go/build/execute"
    ENGINE_NAME="Go"
    ;;
  *)
    usage
    die "Engine '$engine' is not supported for packing. Currently supported: cpp, go"
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

