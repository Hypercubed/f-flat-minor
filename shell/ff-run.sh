#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

DEFAULT_RUNNER="python"
DEFAULT_PREPROCESSOR="go"

usage() {
  cat <<'EOF' >&2
Usage:
  ./shell/ff-run.sh [--run <runner>] [--pp <preprocessor>] <file.ff|file.ffp>

Examples:
  ./shell/ff-run.sh ff/example.ff
  ./shell/ff-run.sh ff/hello.ffp
  ./shell/ff-run.sh --run ruby ff/hello.ffp
  ./shell/ff-run.sh --run node --pp deno ff/hello.ffp

Runners:
  python (default)
  ruby
  dart
  deno
  node
  bun
  go

Preprocessors:
  go (default)
  deno
  bun
  node

Note:
  .ff files run directly unless --pp is explicitly provided.
  .ffp files always go through the selected/default preprocessor first.
EOF
}

die() {
  printf '%s\n' "$*" >&2
  exit 1
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
  exec "$REPO_ROOT/shell/ff-execute.sh" --run "$runner" "$file"
fi

"$REPO_ROOT/shell/ff-preprocess.sh" --pp "$preprocessor" "$file" | \
  "$REPO_ROOT/shell/ff-execute.sh" --run "$runner" -
