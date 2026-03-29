# Core (Primitive) Word Audit — 2026-03-29

## Scope

This audit compares core/system word coverage across the major runnable implementations:

- TypeScript core (used by Deno, Node, Bun)
- Go
- Python
- Ruby
- Racket
- Dart

Reference set: `systemWords` in `typescript/core/src/opcodes.ts`.

## Canonical core set (TypeScript core)

Count: **39** words

`nop eval ; : clr rand exit . putc getc putn clock drop swap dup << >> + - cons * / < = > ? % & ( ) q< q> depth ^ [ ] | ~ \\`

## Results

| Implementation | Status vs canonical set | Missing words | Extra words |
| --- | --- | --- | --- |
| TypeScript core (Deno/Node/Bun) | Exact match | _none_ | _none_ |
| Go | 1 missing | `\\` | _none_ |
| Python | 6 missing | `;`, `[`, `]`, `\\`, `exit`, `getc` | _none_ |
| Ruby | 6 missing | `;`, `[`, `]`, `\\`, `exit`, `getc` | _none_ |
| Racket | 5 missing | `(`, `)`, `\\`, `clock`, `exit` | _none_ |
| Dart | 9 missing + 1 extra | `(`, `)`, `;`, `[`, `]`, `\\`, `clock`, `exit`, `getc` | `cls` |

## Notes

- Deno/Node/Bun all delegate to the same `typescript/core` engine/compiler/opcode layer, so they share one primitive set.
- Go includes the standard `OP_*` constants and symbols for nearly all words, but has no `\\`/RAT word.
- Python and Ruby are older F♭m-level interpreters; both currently omit `getc`, `exit`, explicit `;`, and quote opcodes `[ ]`, and `\\`.
- Racket provides `getc` but intentionally lacks stack stash/fetch primitives `(` and `)` in its symbol table.
- Dart is currently the furthest from parity and also defines non-canonical `cls` alias in addition to `clr`.

## Repro command

```bash
python3 - <<'PY'
import re, pathlib
root=pathlib.Path('.')
text=(root/'typescript/core/src/opcodes.ts').read_text()
base=set(re.findall(r'"([^"]+)"\s*:', re.search(r'systemWords: Record<string, number> = \{(.*?)\n\};',text,re.S).group(1)))

def words(path, pat, extra=None):
    s=set(re.findall(pat,(root/path).read_text()))
    if extra:
        s|=set(extra)
    return s

sets={
 'go': words('go/src/utils/opcodes.go', r'SYM_\w+\s*=\s*"([^"]+)"'),
 'python': words('python/execute.py', r"defineSystem\('([^']+)'"),
 'ruby': words('ruby/execute.rb', r"defineSystem\('([^']+)'", extra=['|']),
 'racket': words('racket/private/symbols.rkt', r'"([^"]+)"\s+op_'),
 'dart': words('dart/bin/dart.dart', r"define\('([^']+)'"),
}
for k,s in sets.items():
    print(k, 'missing=',sorted(base-s), 'extra=',sorted(s-base))
PY
```
