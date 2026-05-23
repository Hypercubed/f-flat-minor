#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_ff-common.sh"

DEFAULT_COMPILER="deno"
DEFAULT_PREPROCESSOR="bun"

usage() {
  cat <<'EOF' >&2
Usage:
  ./shell/ff-compile.sh [--quiet] [--compiler <compiler>] [--pp <preprocessor>] <file.ff|file.ffp|->

Compile to .ffb on stdout (ASCII header + base64 bytecode), with the IR
optimizer enabled for the TS implementations (same as --opt).

For .ffp files, preprocessing uses shell/ff-preprocess.sh (default --pp bun),
then the selected compiler reads the expanded source from stdin.

For .ff files, the selected compiler reads the file directly.

For '-', the compiler reads already-preprocessed f-flat-minor from stdin.

Compilers:
  deno (default)
  node
  bun
  go
  racket

Preprocessors (for .ffp only):
  go
  deno
  bun (default)
  node

Examples:
  ./shell/ff-compile.sh ff/example.ff > out.ffb
  ./shell/ff-compile.sh --compiler go ff/example.ff > out.ffb
  ./shell/ff-compile.sh --compiler racket --pp deno ff/hello.ffp > out.ffb
  ./shell/ff-compile.sh --compiler bun - < preprocessed.ff > out.ffb
EOF
}

compiler="$DEFAULT_COMPILER"
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
    --compiler|--run)
      [ "$#" -ge 2 ] || die "Missing value for $1"
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

if [ "$file" != "-" ]; then
  [ -f "$file" ] || die "Input file not found: $file"
fi

case "$file" in
  *.ff|*.ffp|-) ;;
  *)
    usage
    die "Expected a .ff or .ffp input file, or '-', got: $file"
    ;;
esac

if ! is_compiler "$compiler"; then
  usage
  die "Unknown compiler preset: $compiler"
fi

if ! is_preprocessor "$preprocessor"; then
  usage
  die "Unknown preprocessor preset: $preprocessor"
fi

case "$file" in
  -)
    ff_compile "$compiler" "-" "true" "true"
    ;;
  *.ff)
    ff_compile "$compiler" "$file" "false" "true"
    ;;
  *.ffp)
    print_command \
      "$REPO_ROOT/shell/ff-preprocess.sh" \
      --quiet \
      --pp \
      "$preprocessor" \
      "$file" \
      "|" \
      "$REPO_ROOT/shell/ff-compile.sh" \
      --compiler \
      "$compiler" \
      -
    "$REPO_ROOT/shell/ff-preprocess.sh" --quiet --pp "$preprocessor" "$file" | \
      ff_compile "$compiler" "-" "true" "true"
    ;;
esac
