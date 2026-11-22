#!/usr/bin/env python3
"""Verify @effect statements via Lean, emitting TAP.

    python3 check.py in.ff [--lean LEAN_BIN]

Runs the generator on an .ff file, passes the generated Lean to
Lean, and reports each result as a TAP version 13 test -- one per
emitted theorem, in file order, named `<effect> (<file>:<line>)`,
with generator problems as extra `not ok` tests -- so `prove`
can run it:

    prove --exec "python3 check.py" in.ff

The generator (v21+) emits a `-- src: <file>:<line> <effect>`
marker above every theorem. check.py runs `lean --json`, and for
each error finds the nearest marker above the error's line in the
generated file, so a failing test reads e.g.:

    not ok 11 - bury: a b c == c a b (ff/lib/core/core.ff:31)
    # bury_effect: unsolved goals
    #   a b c : Int
    #   rest : Stack
    #   ⊢ b = a ∧ a = b

TAP is the only output (there is no --tap flag and no friendly
report): stdout is pure TAP, so `prove` and `chomp` can consume
it directly. Exit code 0 when every emitted theorem proves and
the generator reported no problems, 1 otherwise. The generated
Lean is kept in a temp file (its path is printed to stderr when
anything fails) so the reported statement can be opened at the
failing theorem.

This file is the checker; the generator stays a pure translator
(no Lean invocation, no JSON parsing in generate.py).
"""

import argparse
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
GENERATOR = HERE / "generate.py"

MARKER_RE = re.compile(r"^-- src: (\S+):(\d+) (.*)$")
THEOREM_RE = re.compile(r"^theorem (\S+)")
SUMMARY_RE = re.compile(r"(\d+) theorem\(s\) emitted, (\d+) problem\(s\)")


def resolve_lean(explicit):
    """Find the Lean binary: --lean, PATH, or ~/.elan/bin/lean."""
    if explicit:
        return explicit
    found = shutil.which("lean")
    if found:
        return found
    elan = Path.home() / ".elan" / "bin" / "lean"
    if elan.exists():
        return str(elan)
    return None


def run_generator(src_path):
    """Run generate.py on src_path. Returns (lean_text, stderr, returncode)."""
    proc = subprocess.run(
        [sys.executable, str(GENERATOR), str(src_path)],
        capture_output=True, text=True)
    return proc.stdout, proc.stderr, proc.returncode


def run_lean(lean_bin, lean_path):
    """Run `lean --json` on lean_path. Returns (errors, raw_stdout, returncode).

    errors is a list of (line, column, message) for severity == "error".
    A line that is not JSON is kept as a raw message (defensive: Lean
    should only emit one JSON object per line with --json)."""
    proc = subprocess.run(
        [lean_bin, "--json", str(lean_path)],
        capture_output=True, text=True)
    errors = []
    for line in proc.stdout.splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            obj = json.loads(line)
        except json.JSONDecodeError:
            errors.append((0, 0, line))
            continue
        if obj.get("severity") == "error":
            pos = obj.get("pos") or {}
            errors.append((pos.get("line", 0), pos.get("column", 0),
                           obj.get("data", "")))
    return errors, proc.stdout, proc.returncode


def parse_markers(lean_text):
    """Map generated-file line numbers to source markers.

    Returns a list of (gen_line, src, src_line, effect, theorem)
    in file order. theorem is the name from the `theorem X` line
    following the marker, or "" when it cannot be found."""
    lines = lean_text.splitlines()
    markers = []
    for i, line in enumerate(lines):
        m = MARKER_RE.match(line)
        if not m:
            continue
        theorem = ""
        for following in lines[i + 1:i + 6]:
            t = THEOREM_RE.match(following)
            if t:
                theorem = t.group(1)
                break
        markers.append((i + 1, m.group(1), int(m.group(2)), m.group(3), theorem))
    return markers


def marker_for(markers, gen_line):
    """The nearest marker at or above gen_line (tolerant of Lean's
    line numbering being off by one from the file's)."""
    best = None
    for marker in markers:
        if marker[0] <= gen_line + 1:
            best = marker
        else:
            break
    return best


def emit_tap(markers, grouped, problem_lines, unmapped):
    """Print pure TAP version 13 to stdout: one test per emitted
    theorem in file order, named `<effect> (<file>:<line>)`,
    generator problems as extra `not ok` tests after them, and
    unmapped errors (no marker above them) last. Lean messages
    become `#` diagnostics under their failing test. Returns the
    number of failed tests. Nothing but TAP goes to stdout."""
    n = 0
    failed = 0
    for marker in markers:
        _gen, src, src_line, effect, theorem = marker
        n += 1
        key = (src, src_line, effect, theorem)
        messages = grouped.get(key)
        if messages:
            failed += 1
            print(f"not ok {n} - {effect} ({src}:{src_line})")
            for message in messages:
                first, *rest = message.splitlines() or [""]
                header = f"{theorem}: {first}" if theorem else first
                print(f"# {header}")
                for line in rest:
                    print(f"#   {line}")
        else:
            print(f"ok {n} - {effect} ({src}:{src_line})")
    for line in problem_lines:
        n += 1
        failed += 1
        desc = line.strip()
        if desc.startswith("- "):
            desc = desc[2:].strip()
        print(f"not ok {n} - {desc}")
    for gen_line, message in unmapped:
        n += 1
        failed += 1
        print(f"not ok {n} - (generated Lean, line {gen_line})")
        for line in message.splitlines():
            print(f"# {line}")
    return n, failed


def main():
    parser = argparse.ArgumentParser(
        description="Verify @effect statements via Lean, emitting "
                    "TAP version 13 on stdout.")
    parser.add_argument("input", help=".ff file with @effect comments")
    parser.add_argument("--lean", default=None,
                        help="Lean binary (default: lean on PATH, else ~/.elan/bin/lean)")
    args = parser.parse_args()

    src_path = Path(args.input)
    if not src_path.exists():
        print(f"check: no such file: {src_path}", file=sys.stderr)
        return 1

    lean_bin = resolve_lean(args.lean)
    if lean_bin is None:
        print("check: Lean not found (not on PATH, no ~/.elan/bin/lean); "
              "pass --lean PATH", file=sys.stderr)
        return 1

    lean_text, gen_stderr, gen_rc = run_generator(src_path)
    if gen_rc != 0:
        print("check: generator failed:", file=sys.stderr)
        print(gen_stderr, file=sys.stderr)
        return 1

    # Generator problems (statements dropped before Lean ever saw
    # them) are reported as-is; the Lean run below still checks
    # the theorems that were emitted.
    n_theorems = n_problems = None
    summary = SUMMARY_RE.search(gen_stderr)
    if summary:
        n_theorems, n_problems = int(summary.group(1)), int(summary.group(2))
    problem_lines = [l for l in gen_stderr.splitlines()
                     if l.strip().startswith("- ")]

    with tempfile.NamedTemporaryFile(prefix="lean-check-", suffix=".lean",
                                     mode="w", delete=False) as f:
        f.write(lean_text)
        lean_path = Path(f.name)

    errors, _raw, _lean_rc = run_lean(lean_bin, lean_path)
    markers = parse_markers(lean_text)

    # Group errors by source statement (several Lean errors can
    # come from one theorem, e.g. bxor's two type mismatches plus
    # the unsolved goal left behind).
    grouped = {}  # (src, src_line, effect, theorem) -> [messages]
    order = []
    unmapped = []
    for gen_line, _col, message in errors:
        marker = marker_for(markers, gen_line)
        if marker is None:
            unmapped.append((gen_line, message))
            continue
        _gen, src, src_line, effect, theorem = marker
        key = (src, src_line, effect, theorem)
        if key not in grouped:
            grouped[key] = []
            order.append(key)
        grouped[key].append(message)

    # Pure TAP on stdout (the plan, then one test per theorem
    # in file order, problems and unmapped errors after them).
    # Nothing else may go to stdout or prove cannot parse it;
    # the temp-file path goes to stderr instead.
    total = len(markers) + len(problem_lines) + len(unmapped)
    print("TAP version 13")
    print(f"1..{total}")
    _n, tap_failed = emit_tap(markers, grouped, problem_lines, unmapped)
    if tap_failed:
        print(f"generated Lean kept at {lean_path}", file=sys.stderr)
        return 1
    lean_path.unlink(missing_ok=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
