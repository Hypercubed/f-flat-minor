#!/usr/bin/env python3
"""
Regenerate index.md in each immediate subdirectory of `.agents/docs/` from sibling
entry YAML frontmatter.

Default targets are every child directory of `<agents-root>/docs/` (for example
`decisions/`, `troubleshooting/`, and any future sections). See
`.agents/docs/MAINTENANCE.md` for entry shape.

Requirements:
  - Python 3.9+
  - PyYAML (`pip install pyyaml` or your distro package)

Usage:
  python3 .agents/skills/docs-compile/scripts/generate-durable-indexes.py
  python3 .agents/skills/docs-compile/scripts/generate-durable-indexes.py --agents-root path/to/.agents
  python3 .agents/skills/docs-compile/scripts/generate-durable-indexes.py --target .agents/docs/decisions
  python3 .agents/skills/docs-compile/scripts/generate-durable-indexes.py -t foo/bar -t other/baz
"""

from __future__ import annotations

import argparse
import datetime as _dt
import json
import re
import sys
from pathlib import Path
from typing import Any

try:
    import yaml
except ImportError:  # pragma: no cover
    print(
        "ERROR: PyYAML is required. Install with: pip install pyyaml",
        file=sys.stderr,
    )
    sys.exit(1)


_SLUG_RE = re.compile(r"^[a-z0-9_-]+$")

DECISIONS_BLURB = (
    "One file per durable architectural or policy decision. New entries: "
    "follow [Entry shape](../MAINTENANCE.md#entry-shape) in `MAINTENANCE.md`, "
    "then add a row below."
)

TROUBLESHOOTING_BLURB = (
    "One file per recurring issue pattern. New entries: follow "
    "[Entry shape](../MAINTENANCE.md#entry-shape) in `MAINTENANCE.md`, "
    "then add a row below."
)

PLANS_BLURB = (
    "One file per maintainer initiative or roadmap. New entries: follow the plan contract "
    "in [write-plan CONTRACT](../skills/write-plan/CONTRACT.md), then add a row below. "
    "Retired plans: [archive/](archive/index.md)."
)


def _read_frontmatter_block(path: Path) -> tuple[dict[str, Any], str]:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        return {}, text
    end = text.find("\n---\n", 4)
    if end == -1:
        return {}, text
    block = text[4:end]
    body = text[end + 5 :]
    data = yaml.safe_load(block)
    fm = data if isinstance(data, dict) else {}
    return fm, body


def _read_frontmatter(path: Path) -> dict[str, Any]:
    fm, _body = _read_frontmatter_block(path)
    return fm


def _normalize_title(raw: Any) -> str:
    if raw is None:
        return ""
    if not isinstance(raw, str):
        return str(raw)
    return " ".join(raw.split())


def _today_iso() -> str:
    return _dt.date.today().isoformat()


def _yaml_title_line(title: str) -> str:
    return f"title: {json.dumps(title, ensure_ascii=False)}"


def _index_body_lines(
    heading: str, blurb: str, entries: list[tuple[str, str]]
) -> list[str]:
    lines: list[str] = [
        f"# {heading}",
        "",
        blurb,
        "",
        "## Index",
        "",
    ]
    for title, filename in entries:
        lines.append(f"- [{title}]({filename})")
    lines.append("")
    return lines


def _render_index(
    *,
    index_id: str,
    index_title: str,
    heading: str,
    blurb: str,
    entries: list[tuple[str, str]],
    last_updated: str,
) -> str:
    body = "\n".join(_index_body_lines(heading, blurb, entries))
    header = "\n".join(
        [
            "---",
            f"id: {index_id}",
            _yaml_title_line(index_title),
            f"last_updated: {last_updated}",
            "---",
        ]
    )
    return header + "\n\n" + body.lstrip("\n")


def _infer_kind(folder: Path) -> str:
    name = folder.name.casefold()
    if name == "decisions":
        return "decisions"
    if name == "troubleshooting":
        return "troubleshooting"
    if name == "plans":
        return "plans"
    return "generic"


def _slug_for_index_id(folder: Path) -> str:
    base = folder.name.lower()
    base = re.sub(r"[^a-z0-9_-]+", "-", base)
    base = re.sub(r"-{2,}", "-", base).strip("-")
    return base or "folder"


def _default_heading(folder: Path) -> str:
    return folder.name.replace("-", " ").replace("_", " ").title()


def _default_generic_blurb(folder: Path) -> str:
    maint = folder.parent / "MAINTENANCE.md"
    if maint.is_file():
        return (
            "Each topic is a sibling markdown file (except this index). New entries: "
            "follow [Entry shape](../MAINTENANCE.md#entry-shape) in `MAINTENANCE.md`, "
            "then add a row below."
        )
    return (
        "Each topic is a sibling markdown file (except this index). "
        "Add YAML frontmatter on each entry file (at least `id` and `title`), "
        "then add a row below."
    )


def _default_doc_section_folders(docs_root: Path) -> list[Path]:
    """Immediate subdirectories of docs_root that should get an index.md."""
    if not docs_root.is_dir():
        return []
    return sorted(
        p for p in docs_root.iterdir() if p.is_dir() and not p.name.startswith(".")
    )


def _parse_heading_and_blurb(body: str) -> tuple[str | None, str | None]:
    lines = body.lstrip("\n").splitlines()
    i = 0
    while i < len(lines) and not lines[i].strip():
        i += 1
    if i >= len(lines):
        return None, None
    heading: str | None = None
    if lines[i].startswith("# "):
        heading = lines[i][2:].strip()
        i += 1
    buf: list[str] = []
    while i < len(lines):
        stripped = lines[i].strip()
        if stripped == "## Index":
            break
        buf.append(lines[i])
        i += 1
    blurb = "\n".join(buf).strip()
    return heading, blurb or None


def _parse_existing_index(index_path: Path) -> dict[str, str | None]:
    out: dict[str, str | None] = {
        "index_id": None,
        "index_title": None,
        "heading": None,
        "blurb": None,
    }
    if not index_path.is_file():
        return out
    fm, body = _read_frontmatter_block(index_path)
    idx = fm.get("id")
    if isinstance(idx, str) and idx:
        out["index_id"] = idx
    tit = fm.get("title")
    if isinstance(tit, str) and tit.strip():
        out["index_title"] = _normalize_title(tit)
    h, b = _parse_heading_and_blurb(body)
    out["heading"] = h
    out["blurb"] = b
    return out


def _collect_entries(folder: Path, kind: str) -> list[tuple[Path, dict[str, Any]]]:
    out: list[tuple[Path, dict[str, Any]]] = []
    for path in sorted(folder.glob("*.md")):
        if path.name == "index.md":
            continue
        fm = _read_frontmatter(path)
        entry_id = fm.get("id")
        title = _normalize_title(fm.get("title"))
        if not title:
            print(f"WARN: missing title in {path}", file=sys.stderr)
            title = path.stem.replace("-", " ")
        if entry_id is not None and isinstance(entry_id, str):
            if entry_id != path.stem:
                print(
                    f"WARN: frontmatter id {entry_id!r} != filename stem "
                    f"{path.stem!r} ({path})",
                    file=sys.stderr,
                )
            if not _SLUG_RE.match(entry_id):
                print(
                    f"WARN: id {entry_id!r} should match [a-z0-9_-]+ ({path})",
                    file=sys.stderr,
                )
        if kind == "decisions":
            status = fm.get("status")
            if status not in ("accepted", "superseded", "provisional"):
                print(
                    f"WARN: expected status accepted|superseded|provisional "
                    f"in {path}, got {status!r}",
                    file=sys.stderr,
                )
        elif kind == "troubleshooting" and "status" in fm:
            print(
                f"WARN: troubleshooting entry should not have status ({path})",
                file=sys.stderr,
            )
        out.append((path, fm))
    return out


def _build_sorted_links(
    entries: list[tuple[Path, dict[str, Any]]],
) -> list[tuple[str, str]]:
    decorated: list[tuple[str, str, str]] = []
    for path, fm in entries:
        title = _normalize_title(fm.get("title")) or path.stem.replace("-", " ")
        decorated.append((title.casefold(), title, path.name))
    decorated.sort(key=lambda t: (t[0], t[2]))
    return [(t[1], t[2]) for t in decorated]


def _resolve_last_updated(
    path: Path, new_body: str, candidate_last_updated: str
) -> str:
    if not path.exists():
        return candidate_last_updated
    old_fm, old_body = _read_frontmatter_block(path)
    if old_body.lstrip("\n") == new_body.lstrip("\n"):
        prev = old_fm.get("last_updated")
        if isinstance(prev, str) and prev:
            return prev
    return candidate_last_updated


def _write_if_changed(path: Path, content: str, dry_run: bool) -> bool:
    if path.exists() and path.read_text(encoding="utf-8") == content:
        print(f"OK: unchanged {path}")
        return False
    print(f"WRITE: {path}")
    if not dry_run:
        path.write_text(content, encoding="utf-8", newline="\n")
    return True


def _resolve_index_template(folder: Path, kind: str) -> tuple[str, str, str, str]:
    parsed = _parse_existing_index(folder / "index.md")
    if kind == "decisions":
        return (
            "decisions-index",
            "Decisions index",
            "Decisions",
            DECISIONS_BLURB,
        )
    if kind == "troubleshooting":
        return (
            "troubleshooting-index",
            "Troubleshooting index",
            "Troubleshooting",
            TROUBLESHOOTING_BLURB,
        )
    if kind == "plans":
        return (
            "plans-index",
            "Plans index",
            "Plans",
            PLANS_BLURB,
        )
    slug = _slug_for_index_id(folder)
    heading = parsed["heading"] or _default_heading(folder)
    blurb = parsed["blurb"] or _default_generic_blurb(folder)
    index_id = parsed["index_id"] or f"{slug}-index"
    index_title = parsed["index_title"] or f"{heading} index"
    return index_id, index_title, heading, blurb


def regenerate_folder_index(folder: Path, *, today: str, dry_run: bool) -> bool:
    folder = folder.expanduser()
    try:
        folder = folder.resolve()
    except OSError as exc:
        print(f"ERROR: could not resolve path {folder}: {exc}", file=sys.stderr)
        return False

    if not folder.is_dir():
        print(f"ERROR: not a directory: {folder}", file=sys.stderr)
        return False

    kind = _infer_kind(folder)
    entries = _collect_entries(folder, kind)
    links = _build_sorted_links(entries)
    index_id, index_title, heading, blurb = _resolve_index_template(folder, kind)
    body = "\n".join(_index_body_lines(heading, blurb, links))
    index_path = folder / "index.md"
    last_updated = _resolve_last_updated(index_path, body, today)
    content = _render_index(
        index_id=index_id,
        index_title=index_title,
        heading=heading,
        blurb=blurb,
        entries=links,
        last_updated=last_updated,
    )
    return _write_if_changed(index_path, content, dry_run)


def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Regenerate index.md from YAML frontmatter on sibling *.md entry files."
        )
    )
    parser.add_argument(
        "--agents-root",
        type=Path,
        default=Path(".agents"),
        help=(
            "Path to the .agents directory when using default targets "
            "(default: ./.agents)"
        ),
    )
    parser.add_argument(
        "--target",
        "-t",
        action="append",
        type=Path,
        metavar="DIR",
        help=(
            "Directory whose index.md should be regenerated (repeatable). "
            "When omitted, defaults to every immediate subdirectory of "
            "<agents-root>/docs/."
        ),
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print actions only; do not write files.",
    )
    args = parser.parse_args()
    today = _today_iso()
    explicit = bool(args.target)

    if explicit:
        folder_paths = [Path(p) for p in args.target]
    else:
        agents_root = args.agents_root
        docs = agents_root / "docs"
        if not docs.is_dir():
            print(
                f"ERROR: docs directory not found for default targets: {docs}",
                file=sys.stderr,
            )
            return 1
        folder_paths = _default_doc_section_folders(docs)

    changed = False
    had_error = False

    for raw in folder_paths:
        folder = raw.expanduser()
        if not explicit:
            if not folder.is_dir():
                print(f"WARN: skipping missing directory {folder}", file=sys.stderr)
                continue
        else:
            if not folder.exists() or not folder.is_dir():
                print(f"ERROR: not a directory: {folder}", file=sys.stderr)
                had_error = True
                continue

        if regenerate_folder_index(folder, today=today, dry_run=args.dry_run):
            changed = True

    if had_error:
        return 1
    if changed and args.dry_run:
        print("\nDry run: one or more indexes would change.", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
