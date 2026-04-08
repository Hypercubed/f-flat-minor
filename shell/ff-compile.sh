#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_ff-common.sh"

DEFAULT_PREPROCESSOR="bun"

usage() {
  cat <<'EOF' >&2
Usage:
  ./shell/ff-compile.sh [--quiet] [--pp <preprocessor>] <file.ff|file.ffp>

Compile to .ffb on stdout (ASCII header + base64 bytecode), with the IR
optimizer enabled (same as deno/bin/ff-compile.ts --opt).

For .ffp files, preprocessing uses shell/ff-preprocess.sh (default --pp bun),
then deno ff-compile reads the expanded source from stdin with --no-preprocess.

For .ff files, deno ff-compile reads the file directly (its own preprocessor).

Preprocessors (for .ffp only):
  go
  deno
  bun (default)
  node

Examples:
  ./shell/ff-compile.sh ff/example.ff > out.ffb
  ./shell/ff-compile.sh --pp deno ff/hello.ffp > out.ffb
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

FF_COMPILE_TS="$REPO_ROOT/deno/bin/ff-compile.ts"

deno_opt() {
  print_command mise exec -- deno run --no-check --allow-read "$FF_COMPILE_TS" "$@"
  exec mise exec -- deno run --no-check --allow-read "$FF_COMPILE_TS" "$@"
}

case "$file" in
  *.ff)
    deno_opt --opt "$file"
    ;;
  *.ffp)
    print_command \
      "$REPO_ROOT/shell/ff-preprocess.sh" \
      --quiet \
      --pp \
      "$preprocessor" \
      "$file" \
      "|" \
      mise exec -- \
      deno run --no-check --allow-read "$FF_COMPILE_TS" \
      --no-preprocess \
      --opt \
      -
    "$REPO_ROOT/shell/ff-preprocess.sh" --quiet --pp "$preprocessor" "$file" | \
      mise exec -- deno run --no-check --allow-read "$FF_COMPILE_TS" --no-preprocess --opt -
    ;;
esac
