#!/usr/bin/env python3
"""Verify @effect statements via Lean, emitting TAP.

    python3 check.py in.ff [--lean LEAN_BIN]
    ../shell/ff-preprocess.sh --pp BACKEND FILE | python3 check.py --stdin [--lean LEAN_BIN]

Two input modes: a real file on disk (read directly -- the flat
prelude cache and standalone files like the primitives test), or
the already-flattened program on stdin (the shell helper inlines
all definitions; the chomp layer runs it, never this file).
check.py pipes the text via `generate.py` (file arg or `--stdin`
to match) and uses `<stdin>` as the provenance marker for piped
input.

Runs the generator on the file, passes the generated Lean to
`lake env lean --json`, and reports each result as a TAP version
13 test -- one per emitted theorem, in file order, named by the
effect text -- so `prove` can run it:

    prove --exec "python3 check.py" in.ff

The generator emits a `/-- word: @effect <effect> -/` doc comment
above every theorem. check.py finds the nearest doc comment above
each Lean error's line in the generated file (theorem order), so a
failing test reads e.g.:

    not ok 11 - bury: a b c == c a b
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

THEOREM_RE = re.compile(r"^theorem (\S+)")
DOC_RE = re.compile(r"^/-- (.*) -/$")
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


def resolve_lake(explicit):
    """Find the Lake binary: --lake, PATH, or ~/.elan/bin/lake."""
    if explicit:
        return explicit
    found = shutil.which("lake")
    if found:
        return found
    elan = Path.home() / ".elan" / "bin" / "lake"
    if elan.exists():
        return str(elan)
    return None


def run_generator(src_path):
    """Run generate.py on src_path. Returns (lean_text, stderr, returncode)."""
    proc = subprocess.run(
        [sys.executable, str(GENERATOR), str(src_path)],
        capture_output=True, text=True)
    return proc.stdout, proc.stderr, proc.returncode


def run_generator_stdin(flat_text):
    """Run generate.py --stdin on flattened text (read from stdin).
    The theorems are named by effect text; provenance comments
    use generate.py's `<stdin>` marker. Returns (lean_text,
    stderr, returncode)."""
    proc = subprocess.run(
        [sys.executable, str(GENERATOR), "--stdin"],
        input=flat_text, capture_output=True, text=True)
    return proc.stdout, proc.stderr, proc.returncode


def run_lean(lake_bin, lean_bin, lean_path):
    """Run `lake env lean --json` on lean_path from lean-proof/. Returns (errors, raw_stdout, returncode).

    errors is a list of (line, column, message) for severity == "error".
    A line that is not JSON is kept as a raw message (defensive: Lean
    should only emit one JSON object per line with --json)."""
    proc = subprocess.run(
        [lake_bin, "env", lean_bin, "--json", str(lean_path)],
        capture_output=True, text=True, cwd=str(HERE))
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


def parse_theorems(lean_text):
    """Emitted theorems in file order.

    Returns a list of (gen_line, theorem, name). The name is the
    effect text from the nearest `/-- word: @effect <effect> -/`
    doc comment above the theorem (the `@effect ` tag word is
    stripped so it reads as the effect text); when no doc comment
    is found (e.g. a multi-line effect body), the name falls back
    to the theorem name."""
    lines = lean_text.splitlines()
    theorems = []
    for i, line in enumerate(lines):
        m = THEOREM_RE.match(line)
        if not m:
            continue
        theorem = m.group(1)
        name = theorem
        for back in lines[max(0, i - 6):i]:
            d = DOC_RE.match(back)
            if d and ": @effect " in d.group(1):
                name = d.group(1).replace(": @effect ", ": ", 1)
        theorems.append((i + 1, theorem, name))
    return theorems


def theorem_for(theorems, gen_line):
    """The nearest theorem at or above gen_line (tolerant of Lean's
    line numbering being off by one from the file's)."""
    best = None
    for theorem in theorems:
        if theorem[0] <= gen_line + 1:
            best = theorem
        else:
            break
    return best


def emit_tap(theorems, grouped, problem_lines, unmapped):
    """Print pure TAP version 13 to stdout: one test per emitted
    theorem in file order, named by effect text, generator problems
    as extra `not ok` tests after them, and unmapped errors (no
    theorem above them) last. Lean messages become `#` diagnostics
    under their failing test. Returns the number of failed tests.
    Nothing but TAP goes to stdout."""
    n = 0
    failed = 0
    for _gen, theorem, name in theorems:
        n += 1
        messages = grouped.get(theorem)
        if messages:
            failed += 1
            print(f"not ok {n} - {name}")
            for message in messages:
                first, *rest = message.splitlines() or [""]
                header = f"{theorem}: {first}" if theorem else first
                print(f"# {header}")
                for line in rest:
                    print(f"#   {line}")
        else:
            print(f"ok {n} - {name}")
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
    parser.add_argument("input", nargs="?",
                        help=".ff / .ffp file with @effect comments "
                             "(a flat prelude cache or a standalone file; "
                             "omit with --stdin)")
    parser.add_argument("--stdin", action="store_true",
                        help="read the already-flattened program from stdin "
                             "instead of a file")
    parser.add_argument("--lean", default=None,
                        help="Lean binary (default: lean on PATH, else ~/.elan/bin/lean)")
    parser.add_argument("--lake", default=None,
                        help="Lake binary (default: lake on PATH, else ~/.elan/bin/lake)")
    args = parser.parse_args()

    if args.stdin:
        flat_text = sys.stdin.read()
        lean_text, gen_stderr, gen_rc = run_generator_stdin(flat_text)
    else:
        if not args.input:
            print("usage: python3 check.py in.ff | "
                  "../shell/ff-preprocess.sh --pp BACKEND FILE | "
                  "python3 check.py --stdin", file=sys.stderr)
            return 2
        src_path = Path(args.input)
        if not src_path.exists():
            print(f"check: no such file: {src_path}", file=sys.stderr)
            return 1
        lean_text, gen_stderr, gen_rc = run_generator(src_path)

    lean_bin = resolve_lean(args.lean)
    if lean_bin is None:
        print("check: Lean not found (not on PATH, no ~/.elan/bin/lean); "
              "pass --lean PATH", file=sys.stderr)
        return 1

    lake_bin = resolve_lake(args.lake)
    if lake_bin is None:
        print("check: Lake not found (not on PATH, no ~/.elan/bin/lake); "
              "pass --lake PATH", file=sys.stderr)
        return 1

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

    errors, _raw, _lean_rc = run_lean(lake_bin, lean_bin, lean_path)
    theorems = parse_theorems(lean_text)

    # Group errors by theorem (several Lean errors can come from
    # one theorem, e.g. bxor's two type mismatches plus the
    # unsolved goal left behind).
    grouped = {}  # theorem -> [messages]
    unmapped = []
    for gen_line, _col, message in errors:
        hit = theorem_for(theorems, gen_line)
        if hit is None:
            unmapped.append((gen_line, message))
            continue
        _gen, theorem, _name = hit
        grouped.setdefault(theorem, []).append(message)

    # Pure TAP on stdout (the plan, then one test per theorem
    # in file order, problems and unmapped errors after them).
    # Nothing else may go to stdout or prove cannot parse it;
    # the temp-file path goes to stderr instead.
    total = len(theorems) + len(problem_lines) + len(unmapped)
    print("TAP version 13")
    print(f"1..{total}")
    _n, tap_failed = emit_tap(theorems, grouped, problem_lines, unmapped)
    if tap_failed:
        print(f"generated Lean kept at {lean_path}", file=sys.stderr)
        return 1
    lean_path.unlink(missing_ok=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
