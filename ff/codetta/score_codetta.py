#!/usr/bin/env python3
"""
Regenerate ff/codetta/SCORECARD.md with source metrics and Codetta compiled-byte scores.

Run from the repository root:

    python3 ff/codetta/score_codetta.py

Requires the repo compiler helpers. Optimized bytecode size uses shell/ff-compile.sh,
which emits the full .ffb payload: the FbAbbCb header plus base64 bytecode.
"""

from __future__ import annotations

import os
import argparse
import subprocess
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parent.parent.parent
CODETTA_DIR = Path(__file__).resolve().parent
FF_COMPILE_SH = REPO_ROOT / "shell" / "ff-compile.sh"
README_FILENAME = "README.md"
EXPECTED_FILENAME = "solution.out"
SOLUTION_FILENAMES = ("solution.ff", "solution.ffp")


def _parse_readme_frontmatter(readme_path: Path) -> dict[str, str]:
    text = readme_path.read_text(encoding="utf-8").replace("\r\n", "\n")

    if not text.startswith("---\n"):
        raise RuntimeError(f"Missing frontmatter in {readme_path.relative_to(REPO_ROOT)}")

    end = text.find("\n---\n", 4)
    if end < 0:
        raise RuntimeError(f"Unterminated frontmatter in {readme_path.relative_to(REPO_ROOT)}")

    values: dict[str, str] = {}
    for line in text[4:end].split("\n"):
        colon = line.find(":")
        if colon < 0:
            continue
        key = line[:colon].strip()
        raw_value = line[colon + 1 :].strip()
        if raw_value.startswith('"') and raw_value.endswith('"'):
            raw_value = raw_value[1:-1]
        values[key] = raw_value
    return values


def _parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--update-readme-bytes",
        action="store_true",
        help="update Codetta README frontmatter bytes fields to the compiled score",
    )
    return parser.parse_args(argv)


def _update_readme_bytes(readme_path: Path, compiled_bytes: int) -> None:
    text = readme_path.read_text(encoding="utf-8")

    if not text.startswith("---\n"):
        raise RuntimeError(f"Missing frontmatter in {readme_path.relative_to(REPO_ROOT)}")

    end = text.find("\n---\n", 4)
    if end < 0:
        raise RuntimeError(f"Unterminated frontmatter in {readme_path.relative_to(REPO_ROOT)}")

    frontmatter = text[4:end].split("\n")
    for index, line in enumerate(frontmatter):
        if line.startswith("bytes:"):
            frontmatter[index] = f"bytes: {compiled_bytes}"
            updated_frontmatter = "\n".join(frontmatter)
            readme_path.write_text(f"---\n{updated_frontmatter}\n---\n{text[end + 5:]}", encoding="utf-8")
            return

    raise RuntimeError(f"Missing README bytes field in {readme_path.relative_to(REPO_ROOT)}")


def _compile_optimized(source_path: Path) -> bytes:
    rel = source_path.relative_to(REPO_ROOT)
    env = {**os.environ, "FF_SHELL_TRACE": "0"}
    proc = subprocess.run(
        ["/bin/bash", str(FF_COMPILE_SH), str(rel)],
        cwd=REPO_ROOT,
        capture_output=True,
        check=False,
        env=env,
    )
    if proc.returncode != 0:
        err = proc.stderr.decode("utf-8", errors="replace").strip()
        raise RuntimeError(f"compile failed for {rel} (exit {proc.returncode}): {err}")
    return proc.stdout


def _find_solution(etude_dir: Path) -> Path:
    matches = [etude_dir / name for name in SOLUTION_FILENAMES if (etude_dir / name).is_file()]
    if not matches:
        raise RuntimeError(f"Missing solution.ff or solution.ffp in {etude_dir.relative_to(REPO_ROOT)}")
    if len(matches) > 1:
        names = ", ".join(path.name for path in matches)
        raise RuntimeError(f"Multiple Codetta solutions in {etude_dir.relative_to(REPO_ROOT)}: {names}")
    return matches[0]


def main() -> int:
    args = _parse_args(sys.argv[1:])

    if not FF_COMPILE_SH.is_file():
        print(f"Missing {FF_COMPILE_SH}", file=sys.stderr)
        return 1

    etude_dirs = sorted(path for path in CODETTA_DIR.iterdir() if path.is_dir())
    rows: list[tuple[str, str, int, int, int, int]] = []
    mismatches: list[str] = []

    for etude_dir in etude_dirs:
        readme_path = etude_dir / README_FILENAME
        expected_path = etude_dir / EXPECTED_FILENAME
        if not readme_path.is_file():
            raise RuntimeError(f"Missing {README_FILENAME} in {etude_dir.relative_to(REPO_ROOT)}")
        if not expected_path.is_file():
            raise RuntimeError(f"Missing {EXPECTED_FILENAME} in {etude_dir.relative_to(REPO_ROOT)}")

        solution_path = _find_solution(etude_dir)
        frontmatter = _parse_readme_frontmatter(readme_path)
        readme_bytes_text = frontmatter.get("bytes")
        if readme_bytes_text is None:
            raise RuntimeError(f"Missing README bytes field in {readme_path.relative_to(REPO_ROOT)}")

        try:
            readme_bytes = int(readme_bytes_text)
        except ValueError as exc:
            raise RuntimeError(
                f"Invalid README bytes field in {readme_path.relative_to(REPO_ROOT)}: {readme_bytes_text}"
            ) from exc

        raw = solution_path.read_bytes()
        text = raw.decode("utf-8")
        src_bytes = len(raw)
        src_chars = len(text)
        compiled_bytes = len(_compile_optimized(solution_path))

        if args.update_readme_bytes and compiled_bytes != readme_bytes:
            _update_readme_bytes(readme_path, compiled_bytes)
            readme_bytes = compiled_bytes

        if compiled_bytes != readme_bytes:
            mismatches.append(
                f"{etude_dir.name}: README bytes={readme_bytes}, compiled bytes={compiled_bytes}"
            )

        rows.append((etude_dir.name, solution_path.name, src_bytes, src_chars, compiled_bytes, readme_bytes))

    lines = [
        "<!-- AUTO-GENERATED by `python3 ff/codetta/score_codetta.py` - do not edit by hand -->",
        "",
        "| etude | solution | source bytes (UTF-8) | source chars (code points) | optimized .ffb bytes | README bytes |",
        "| --- | --- | ---: | ---: | ---: | ---: |",
    ]
    for slug, solution_name, src_bytes, src_chars, compiled_bytes, readme_bytes in rows:
        lines.append(
            f"| `{slug}` | `{solution_name}` | {src_bytes} | {src_chars} | {compiled_bytes} | {readme_bytes} |"
        )

    lines.extend(
        [
            "",
            "The **optimized .ffb bytes** column is the Codetta score.",
            "It is the byte length of stdout from `FF_SHELL_TRACE=0 ./shell/ff-compile.sh <file>`.",
            "That output includes the `FbAbbCb` header plus the base64-encoded bytecode payload.",
            "The `README bytes` column is expected to match the compiled-byte score for every shipped etude.",
        ]
    )

    scorecard = CODETTA_DIR / "SCORECARD.md"
    scorecard.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote {scorecard.relative_to(REPO_ROOT)}")

    if mismatches:
        print("README byte mismatches detected:", file=sys.stderr)
        for mismatch in mismatches:
            print(f"- {mismatch}", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
