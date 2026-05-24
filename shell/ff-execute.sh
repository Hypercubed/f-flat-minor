#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_ff-common.sh"

DEFAULT_EXECUTOR="bun"

usage() {
  cat <<'EOF' >&2
Usage:
  ./shell/ff-execute.sh [--quiet] [--run <executor>] <file.ffb|->

Execute compiled f-flat-minor bytecode (.ffb) directly in the VM.

Examples:
  ./shell/ff-execute.sh ff/example.ffb
  ./shell/ff-execute.sh --quiet ff/example.ffb
  ./shell/ff-execute.sh --run go ff/example.ffb
  ./shell/ff-execute.sh --run racket -

Executors:
  deno
  node
  bun (default)
  go
  racket
  cpp

Input:
  Use a .ffb file for bytecode execution, or '-' to read compiled bytecode
  from stdin.
EOF
}

executor="$DEFAULT_EXECUTOR"
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
    --run|--executor)
      [ "$#" -ge 2 ] || die "Missing value for $1"
      executor="$2"
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

if ! is_executor "$executor"; then
  usage
  die "Unknown executor preset: $executor"
fi

if [ "$file" = "-" ]; then
  ff_execute "$executor" "$file"
fi

[ -f "$file" ] || die "Input file not found: $file"

case "$file" in
  *.ffb) ;;
  *)
    usage
    die "Expected a .ffb input file or '-', got: $file"
    ;;
esac

ff_execute "$executor" "$file"
