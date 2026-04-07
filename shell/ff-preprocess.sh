#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_ff-common.sh"

DEFAULT_PREPROCESSOR="bun"

usage() {
  cat <<'EOF' >&2
Usage:
  ./shell/ff-preprocess.sh [--quiet] [--pp <preprocessor>] <file.ff|file.ffp>

Examples:
  ./shell/ff-preprocess.sh ff/example.ff
  ./shell/ff-preprocess.sh --quiet ff/example.ff
  ./shell/ff-preprocess.sh --pp deno ff/golf/hello.ffp

Preprocessors:
  go
  deno
  bun (default)
  node

Output:
  Writes the preprocessed program to stdout.
EOF
}

preprocessor="$DEFAULT_PREPROCESSOR"
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
      [ "$#" -le 1 ] || die "Expected exactly one input file after --"
      [ "$#" -eq 1 ] || die "Missing input file"
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
[ -f "$file" ] || die "Input file not found: $file"

case "$file" in
  *.ff|*.ffp) ;;
  *)
    usage
    die "Expected a .ff or .ffp input file, got: $file"
    ;;
esac

if ! is_preprocessor "$preprocessor"; then
  usage
  die "Unknown preprocessor preset: $preprocessor"
fi

ff_preprocess "$preprocessor" "$file"
