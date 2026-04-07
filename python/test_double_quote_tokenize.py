#!/usr/bin/env python3
"""Quick check: double-quoted strings tokenize like [ '...' ] with int codes."""
import importlib.util
from pathlib import Path

root = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("ff_execute", root / "execute.py")
mod = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(mod)

assert mod.tokenize('"hi"') == ["[", 104, 105, "]"], mod.tokenize('"hi"')
assert mod.tokenize('""') == ["[", "]"], mod.tokenize('""')
assert mod.tokenize('a "x" b') == ["a", "[", ord("x"), "]", "b"]
print("ok")
