#!/usr/bin/env python3
"""
Rank docs sections from docs-search-index.json using simple token overlap + regex.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from pathlib import Path
from typing import Any

INDEX_NAMES = ("docs-search-index.json", "wiki-index.json")


def _find_agents_root(start: Path) -> Path | None:
    p = start.resolve()
    for candidate in [p, *p.parents]:
        agents = candidate / ".agents"
        if agents.is_dir():
            return agents
    return None


def _resolve_agents_root(args_agents_root: Path | None) -> Path | None:
    raw: Path | None = args_agents_root
    if raw is None and "AGENTS_ROOT" in os.environ:
        raw = Path(os.environ["AGENTS_ROOT"])
    if raw is not None:
        candidate = raw.expanduser().resolve()
        return candidate if candidate.name == ".agents" else candidate / ".agents"
    return _find_agents_root(Path.cwd())


def _load_index(skill_dir: Path) -> dict[str, Any]:
    for name in INDEX_NAMES:
        path = skill_dir / name
        if path.is_file():
            return json.loads(path.read_text(encoding="utf-8"))
    print(
        "ERROR: no search index found. Run:\n"
        "       python3 .agents/skills/docs-search/scripts/index-docs.py",
        file=sys.stderr,
    )
    sys.exit(2)


def _index_dir_for_search(
    *,
    script_skill_dir: Path,
    agents_root: Path | None,
) -> Path:
    """
    Prefer the repo-local index written by index-docs.py under
    <repo>/.agents/skills/docs-search/ so search stays repo-scoped even when
    this script is executed from a global or agent-specific skill copy.
    """
    if agents_root is not None and agents_root.is_dir():
        repo_skill_dir = agents_root / "skills" / "docs-search"
        if any((repo_skill_dir / name).is_file() for name in INDEX_NAMES):
            return repo_skill_dir
        print(
            "ERROR: no search index under this repo's .agents/skills/docs-search/.\n"
            "       Run: python3 .agents/skills/docs-search/scripts/index-docs.py\n"
            "       (Index output is always repo-scoped next to that repo's .agents/.)",
            file=sys.stderr,
        )
        sys.exit(2)
    return script_skill_dir


def _tokenize(q: str) -> list[str]:
    q = q.casefold()
    return [t for t in re.split(r"[^a-z0-9_]+", q) if len(t) >= 2]


def _score_section(query: str, tokens: list[str], sec: dict[str, Any]) -> float:
    docs_path = sec.get("docs_path", sec.get("wiki_path", ""))
    hay = " ".join(
        [
            str(sec.get("title", "")),
            str(sec.get("description", "")),
            str(sec.get("path", "")),
            str(docs_path),
            str(sec.get("folder", "")),
        ]
    ).casefold()

    score = 0.0
    if query.casefold() in hay:
        score += 12.0
    for tok in tokens:
        if tok in hay:
            score += 3.0
        try:
            if re.search(re.escape(tok), hay):
                score += 1.0
        except re.error:
            pass
    return score


def _folder_display(folder: str, repo_path: str) -> str:
    if repo_path.startswith(".agents/playbooks/"):
        return ".agents/playbooks/"
    if repo_path == ".agents/AGENTS.md":
        return ".agents/"
    if not folder:
        return ".agents/docs/"
    return f".agents/docs/{folder}/"


def main() -> int:
    parser = argparse.ArgumentParser(description="Search docs-search-index.json.")
    parser.add_argument("query", help="Free-text query")
    parser.add_argument(
        "-n",
        "--limit",
        type=int,
        default=5,
        help="Max results (default: 5)",
    )
    parser.add_argument(
        "--agents-root",
        type=Path,
        default=None,
        help=(
            "Path to the target repo's .agents directory (same as index-docs.py). "
            "If omitted, use AGENTS_ROOT or walk up from the current working directory."
        ),
    )
    args = parser.parse_args()

    script_skill_dir = Path(__file__).resolve().parent.parent
    agents_root = _resolve_agents_root(args.agents_root)
    skill_dir = _index_dir_for_search(
        script_skill_dir=script_skill_dir, agents_root=agents_root
    )
    data = _load_index(skill_dir)
    sections = data.get("sections")
    if not isinstance(sections, list):
        print("ERROR: invalid index: missing sections[]", file=sys.stderr)
        return 1

    query = args.query.strip()
    if not query:
        print("ERROR: empty query", file=sys.stderr)
        return 1

    tokens = _tokenize(query)
    ranked: list[tuple[float, dict[str, Any]]] = []
    for sec in sections:
        if not isinstance(sec, dict):
            continue
        s = _score_section(query, tokens, sec)
        if s > 0:
            ranked.append((s, sec))
    ranked.sort(key=lambda x: (-x[0], str(x[1].get("path", ""))))

    limit = max(1, args.limit)
    top = ranked[:limit]

    print("🏷️ TOP MATCHES:\n")
    if not top:
        print("(no matches — run index-docs.py first or broaden your query)")
        return 0

    for _score, sec in top:
        title = sec.get("title", "(untitled)")
        desc = str(sec.get("description", "")).strip()
        docs_path = sec.get("docs_path", sec.get("wiki_path", ""))
        repo_path = str(sec.get("path", ""))
        folder = str(sec.get("folder", ""))
        rel_from_skill = f"../../../{repo_path}" if repo_path else "../../docs/index.md"
        print(f"📁 {_folder_display(folder, repo_path)}")
        print(f"   {title}")
        if desc:
            short = desc if len(desc) <= 220 else desc[:217] + "..."
            print(f"   {short}")
        print(f"   📄 {rel_from_skill}")
        print()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
