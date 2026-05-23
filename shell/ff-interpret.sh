#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_ff-common.sh"

DEFAULT_RUNNER="bun"

usage() {
  cat <<'EOF' >&2
Usage:
  ./shell/ff-interpret.sh [--quiet] [--run <runner>] <file.ff|->

Run raw (un-preprocessed) source code directly.

Examples:
  ./shell/ff-interpret.sh ff/example.ff
  ./shell/ff-interpret.sh --quiet ff/example.ff
  ./shell/ff-interpret.sh --run ruby ff/example.ff
  ./shell/ff-interpret.sh --run node -

Runners:
  python
  ruby
  dart
  deno
  node
  bun (default)
  go
  racket
  cpp

Input:
  Use a .ff file for direct interpretation, or '-' to read from stdin.
EOF
}

runner="$DEFAULT_RUNNER"
file=""

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
    --run)
      [ "$#" -ge 2 ] || die "Missing value for --run"
      runner="$2"
      shift 2
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    --)
      shift
      [ "$#" -le 1 ] || die "Expected exactly one input file after --"
      [ "$#" -eq 1 ] || die "Missing input file"
      file="$1"
      shift
      ;;
    -)
      if [ -n "$file" ]; then
        usage
        die "Expected exactly one input file, got: $file and $1"
      fi
      file="$1"
      shift
      ;;
    -*)
      usage
      die "Unknown option: $1"
      ;;
    *)
      if [ -n "$file" ]; then
        usage
        die "Expected exactly one input file, got: $file and $1"
      fi
      file="$1"
      shift
      ;;
  esac
done

[ -n "$file" ] || die "Missing input file"

if ! is_runner "$runner"; then
  usage
  die "Unknown runner preset: $runner"
fi

if [ "$file" = "-" ]; then
  ff_interpret "$runner" "$file"
fi

[ -f "$file" ] || die "Input file not found: $file"

case "$file" in
  *.ff) ;;
  *)
    usage
    die "Expected a .ff input file or '-', got: $file"
    ;;
esac

ff_interpret "$runner" "$file"
