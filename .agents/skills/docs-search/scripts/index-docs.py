#!/usr/bin/env python3
"""
Build docs-search-index.json from durable markdown sources.

Unlike docs-compile, this script does not require section index.md files.
It scans durable entry files directly so docs-search remains usable when
optional compile artifacts are absent.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

try:
    import yaml
except ImportError:  # pragma: no cover
    print("ERROR: PyYAML is required (`pip install pyyaml`).", file=sys.stderr)
    sys.exit(1)


def _find_agents_root(start: Path) -> Path | None:
    p = start.resolve()
    for candidate in [p, *p.parents]:
        agents = candidate / ".agents"
        if agents.is_dir():
            return agents
    return None


def _read_frontmatter_block(text: str) -> tuple[dict[str, Any], str]:
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


def _squish_ws(s: str) -> str:
    return " ".join(s.split())


def _first_markdown_paragraph(body: str) -> str:
    lines = body.lstrip("\n").splitlines()
    buf: list[str] = []
    in_fence = False
    for line in lines:
        if line.strip().startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        if line.startswith("#"):
            continue
        stripped = line.strip()
        if not stripped:
            if buf:
                break
            continue
        if stripped == "## Index":
            break
        buf.append(stripped)
    return _squish_ws(" ".join(buf))[:500]


def _first_h1_title(body: str) -> str | None:
    for line in body.lstrip("\n").splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return None


def _folder_label_for_docs_path(docs_root: Path, path: Path) -> str:
    """Immediate folder name under docs, or empty when the file lives at docs root."""
    try:
        rel = path.resolve().relative_to(docs_root.resolve())
    except ValueError:
        return ""
    parts = rel.parts
    if len(parts) <= 1:
        return ""
    return parts[0]


def _default_kind_for_docs_file(docs_root: Path, path: Path) -> str:
    """Infer search `kind` when frontmatter omits it (under `.agents/docs/` only)."""
    try:
        rel = path.resolve().relative_to(docs_root.resolve())
    except ValueError:
        return "markdown"
    parts = rel.parts
    if len(parts) == 1:
        return "docs"
    first = parts[0].casefold()
    if first == "decisions":
        return "decision"
    if first == "plans":
        return "plan"
    return parts[0]


def _record_for_file(
    *,
    docs_root: Path,
    repo_root: Path,
    path: Path,
    default_kind: str,
) -> dict[str, Any]:
    text = path.read_text(encoding="utf-8")
    fm, body = _read_frontmatter_block(text)
    title = fm.get("title")
    if isinstance(title, str) and title.strip():
        title_out = _squish_ws(title)
    else:
        h1 = _first_h1_title(body)
        title_out = h1 or path.stem.replace("-", " ").replace("_", " ").title()

    desc = fm.get("description")
    if isinstance(desc, str) and desc.strip():
        description = _squish_ws(desc)[:800]
    else:
        description = _first_markdown_paragraph(body)

    rel_repo = path.resolve().relative_to(repo_root.resolve())
    try:
        docs_relpath = path.resolve().relative_to(docs_root.resolve()).as_posix()
    except ValueError:
        docs_relpath = ""
    folder = _folder_label_for_docs_path(docs_root, path)
    entry_id = fm.get("id")
    if isinstance(entry_id, str) and entry_id.strip():
        stable_id = entry_id.strip()
    else:
        stable_id = path.stem

    kind = fm.get("kind")
    if not isinstance(kind, str) or not kind.strip():
        kind = default_kind

    return {
        "id": stable_id,
        "title": title_out,
        "description": description,
        "path": rel_repo.as_posix(),
        "docs_path": docs_relpath,
        "folder": folder,
        "kind": kind,
    }


def _collect_sections(docs_root: Path, repo_root: Path) -> list[dict[str, Any]]:
    sections: list[dict[str, Any]] = []
    # Every markdown file under `.agents/docs/` (including nested paths and index files).
    if docs_root.is_dir():
        for path in sorted(docs_root.rglob("*.md")):
            sections.append(
                _record_for_file(
                    docs_root=docs_root,
                    repo_root=repo_root,
                    path=path,
                    default_kind=_default_kind_for_docs_file(docs_root, path),
                )
            )

    # Include playbooks as searchable durable guidance.
    playbooks_root = repo_root / ".agents" / "playbooks"
    if playbooks_root.is_dir():
        for path in sorted(playbooks_root.glob("*.md")):
            sections.append(
                _record_for_file(
                    docs_root=docs_root,
                    repo_root=repo_root,
                    path=path,
                    default_kind="playbook",
                )
            )

    # Add AGENTS.md as a searchable operational summary when present.
    agents_md = repo_root / ".agents" / "AGENTS.md"
    if agents_md.is_file():
        sections.append(
            _record_for_file(
                docs_root=docs_root,
                repo_root=repo_root,
                path=agents_md,
                default_kind="agents",
            )
        )
    return sections


def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Build docs-search-index.json under the resolved .agents/skills/docs-search."
        )
    )
    parser.add_argument(
        "--agents-root",
        type=Path,
        default=None,
        help=(
            "Path to .agents directory. If omitted, use AGENTS_ROOT env var, "
            "then nearest .agents from current working directory."
        ),
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print sample JSON to stderr only; do not write docs-search-index.json.",
    )
    args = parser.parse_args()

    raw_agents_root: Path | None = args.agents_root
    if raw_agents_root is None:
        env_root = Path(os.environ["AGENTS_ROOT"]) if "AGENTS_ROOT" in os.environ else None
        raw_agents_root = env_root

    if raw_agents_root is not None:
        candidate = raw_agents_root.expanduser().resolve()
        agents_root = candidate if candidate.name == ".agents" else candidate / ".agents"
    else:
        agents_root = _find_agents_root(Path.cwd())

    if agents_root is None or not agents_root.is_dir():
        print(
            "ERROR: could not locate .agents directory. Pass --agents-root or set AGENTS_ROOT.",
            file=sys.stderr,
        )
        return 1

    repo_root = agents_root.parent
    docs_root = agents_root / "docs"
    if not docs_root.is_dir():
        print(f"ERROR: docs root not found: {docs_root}", file=sys.stderr)
        return 1

    sections = _collect_sections(docs_root, repo_root)
    payload = {
        "version": 2,
        "docs_root": ".agents/docs",
        "generated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "sections": sections,
    }

    out_path = agents_root / "skills" / "docs-search" / "docs-search-index.json"
    if args.dry_run:
        print(json.dumps(payload, indent=2)[:2000] + "\n...", file=sys.stderr)
        print(f"DRY-RUN: would write {out_path}", file=sys.stderr)
        return 0

    out_path.write_text(
        json.dumps(payload, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
        newline="\n",
    )
    print(f"Wrote {out_path} ({len(sections)} sections).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
