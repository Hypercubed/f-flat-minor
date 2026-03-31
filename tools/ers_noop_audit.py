#!/usr/bin/env python3
"""Lightweight audit for words previously marked "no-op" by ERS.

This script is intentionally conservative: it only checks a small set of
high-confidence redex patterns that should be considered during expand-reduce.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path


RULES = {
    # file -> list[(regex, guidance)]
    "ff/lib/math/gcd.ffp": [
        (r"\bdup\s+bury\b", "consider `tuck` canonicalization"),
    ],
    "ff/lib/math/pi.ffp": [
        (r"\b1\s*<<\s+10\s*/", "consider integer simplification to `/ 5`"),
    ],
}


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    failures: list[str] = []

    for rel, checks in RULES.items():
        path = root / rel
        text = path.read_text(encoding="utf-8")
        for pattern, guidance in checks:
            if re.search(pattern, text):
                failures.append(f"{rel}: matched `{pattern}` ({guidance})")

    if failures:
        print("ERS no-op audit failed:")
        for item in failures:
            print(f" - {item}")
        return 1

    print("ERS no-op audit passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
