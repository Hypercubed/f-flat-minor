#!/usr/bin/env python3
"""Double-quoted sugar: tokenizer keeps \"...\" as one token; run() expands to [ '...' ]."""
import importlib.util
import io
import sys
from pathlib import Path

root = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("ff_execute", root / "execute.py")
mod = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(mod)

# Tokenizer must not expand double quotes
assert mod.tokenize('"hi"') == ['"hi"'], mod.tokenize('"hi"')
assert mod.tokenize('a "x" b') == ['a', '"x"', 'b']

# Runner expands and executes like [ 'hi' ] eval ...
old_stdout = sys.stdout
sys.stdout = buf = io.StringIO()
try:
    mod.queue = mod.tokenize('"hi" eval dup putn swap putn')
    mod.run()
finally:
    sys.stdout = old_stdout
assert buf.getvalue() == "105104", repr(buf.getvalue())
print("ok")
