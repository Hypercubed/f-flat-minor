#!/usr/bin/env python3
"""Regenerate _docs/supplemental/ff-lib-word-definition-rankings.md from ff/lib sources."""

import os
import re
import sys
from datetime import date

LIB_DIR = "ff/lib"
OUTPUT = "_docs/supplemental/ff-lib-word-definition-rankings.md"


def parse_words(lib_dir):
    """Parse all word definitions from .ff/.ffp files under lib_dir."""
    results = []

    for root, dirs, files in os.walk(lib_dir):
        if "__tests__" in root:
            continue
        dirs.sort()
        for fname in sorted(files):
            if not (fname.endswith(".ff") or fname.endswith(".ffp")):
                continue
            fpath = os.path.join(root, fname)
            with open(fpath) as f:
                content = f.read()

            # Remove block comments  /* ... */
            content_nc = re.sub(r"/\*.*?\*/", "", content, flags=re.DOTALL)

            lines = content_nc.split("\n")
            i = 0
            while i < len(lines):
                line = lines[i].strip()
                # Remove inline comments
                line_clean = re.sub(r"//.*$", "", line).strip()
                if not line_clean:
                    i += 1
                    continue

                # Match word definition: wordname: body... ;
                m = re.match(r"^([^\s;]+)\s*:\s*(.*)$", line_clean)
                if m:
                    word_name = m.group(1)
                    rest = m.group(2).strip()

                    body_parts = []
                    found_semi = False
                    end_line = i

                    # Check if ; appears on the first line of the body
                    if rest:
                        semi_idx = rest.find(";")
                        if semi_idx >= 0:
                            body_text = rest[:semi_idx].strip()
                            if body_text:
                                body_parts.append(body_text)
                            found_semi = True
                            end_line = i
                        else:
                            body_parts.append(rest)

                    # If no ; found, continue reading subsequent lines
                    if not found_semi:
                        j = i + 1
                        while j < len(lines):
                            l = lines[j].strip()
                            l_clean = re.sub(r"//.*$", "", l).strip()
                            if not l_clean:
                                j += 1
                                continue
                            semi_idx = l_clean.find(";")
                            if semi_idx >= 0:
                                body_text = l_clean[:semi_idx].strip()
                                if body_text:
                                    body_parts.append(body_text)
                                found_semi = True
                                end_line = j
                                break
                            else:
                                body_parts.append(l_clean)
                            j += 1

                    if found_semi:
                        body = " ".join(body_parts).strip()
                        tokens = len(body.split()) if body else 0
                        results.append((word_name, tokens, fpath))
                        i = end_line + 1
                        continue
                i += 1

    return results


def render_markdown(results, today):
    """Render the results as a markdown table."""
    results.sort(key=lambda x: -x[1])

    lines = [
        f"# ff/lib word rankings by definition length ({today})",
        "",
        "Ranking is by whitespace-separated token count in each word body "
        "(text between `name:` and trailing `;`), across `.ff` and `.ffp` "
        "files under `ff/lib`, excluding `__tests__`.",
        "",
        "> Regenerate with: `python3 .agent/skills/ff-lib-word-rankings/generate-rankings.py`",
        "",
        "| Rank | Word | Tokens in definition | File |",
        "|---:|---|---:|---|",
    ]
    for rank, (word, tokens, fpath) in enumerate(results, 1):
        lines.append(f"| {rank} | `{word}` | {tokens} | `{fpath}` |")

    return "\n".join(lines) + "\n"


def main():
    today = date.today().isoformat()
    results = parse_words(LIB_DIR)
    md = render_markdown(results, today)

    out_path = OUTPUT
    if len(sys.argv) > 1:
        out_path = sys.argv[1]

    with open(out_path, "w") as f:
        f.write(md)

    print(f"Wrote {len(results)} words to {out_path}")


if __name__ == "__main__":
    main()
