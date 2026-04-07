#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_ff-common.sh"

DEFAULT_RUNNER="bun"
DEFAULT_PREPROCESSOR="bun"

usage() {
  cat <<'EOF' >&2
Usage:
  ./shell/ff-run.sh [--quiet] [--run <runner>] [--pp <preprocessor>] <file.ff|file.ffp>

Examples:
  ./shell/ff-run.sh ff/example.ff
  ./shell/ff-run.sh --quiet ff/example.ff
  ./shell/ff-run.sh ff/golf/hello.ffp
  ./shell/ff-run.sh --run ruby ff/golf/hello.ffp
  ./shell/ff-run.sh --run node --pp deno ff/golf/hello.ffp

Runners:
  python
  ruby
  dart
  deno
  node
  bun (default)
  go

Preprocessors:
  go
  deno
  bun (default)
  node

Note:
  .ff files run directly unless --pp is explicitly provided.
  .ffp files always go through the selected/default preprocessor first.
EOF
}

runner="$DEFAULT_RUNNER"
preprocessor="$DEFAULT_PREPROCESSOR"
preprocessor_explicit=false
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
    --pp)
      [ "$#" -ge 2 ] || die "Missing value for --pp"
      preprocessor="$2"
      preprocessor_explicit=true
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
  *.ff) file_type="ff" ;;
  *.ffp) file_type="ffp" ;;
  *)
    usage
    die "Expected a .ff or .ffp input file, got: $file"
    ;;
esac

if ! is_runner "$runner"; then
  usage
  die "Unknown runner preset: $runner"
fi

if ! is_preprocessor "$preprocessor"; then
  usage
  die "Unknown preprocessor preset: $preprocessor"
fi

if [ "$file_type" = "ff" ] && ! $preprocessor_explicit; then
  print_command "$REPO_ROOT/shell/ff-execute.sh" --run "$runner" "$file"
  exec "$REPO_ROOT/shell/ff-execute.sh" --run "$runner" "$file"
fi

print_command \
  "$REPO_ROOT/shell/ff-preprocess.sh" \
  --pp \
  "$preprocessor" \
  "$file" \
  "|" \
  "$REPO_ROOT/shell/ff-execute.sh" \
  --run \
  "$runner" \
  -
"$REPO_ROOT/shell/ff-preprocess.sh" --pp "$preprocessor" "$file" | \
  "$REPO_ROOT/shell/ff-execute.sh" --run "$runner" -
