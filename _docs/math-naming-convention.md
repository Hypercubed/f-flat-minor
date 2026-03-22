# f-flat-minor Math Library Naming Convention

## Core Principle
All mathematical functions follow a consistent naming pattern using **prefixes** to indicate transformation variants. Since f-flat-minor uses integers only, all functions return integer results.

## Naming Patterns

### 1. Base Functions
| Function | Description | File |
|--------|-------------|------|
| `log` | Natural logarithm | `ff/lib/math/log.ffp` |
| `ln` | Alias for `log` | `ff/lib/math/ln.ffp` |
| `exp` | Exponential function | `ff/lib/math/exp.ffp` |
| `sqrt` | Square root | `ff/lib/math/sqrt.ffp` |
| `cbrt` | Cube root | `ff/lib/math/cbrt.ffp` |

### 2. Integer (Floor) Versions
Prefix with `i` to indicate floor of the result.
- `ilog` → `floor(log(x))`
- `iln` → `floor(ln(x))`
- `iexp` → `floor(exp(x))`

**Stack effect:** `(x -- n)`

### 3. Scaled Versions (10^n)
Prefix with `n` to indicate multiplication by 10^n.
- `nlog` → `10^n * log(x)`
- `nln` → `10^n * ln(x)`
- `nexp` → `10^n * exp(x)`

**Stack effect:** `(n x -- y)`

### 4. Ratio (2-Argument) Versions
Prefix with `q` (for **q**uotient) to indicate u/v input.
- `qlog` → `floor(log(u/v))`
- `qln` → `floor(ln(u/v))`
- `qexp` → `floor(exp(u/v))`

**Stack effect:** `(u v -- n)`

### 5. Scaled Ratio Versions
Combine `n` and `q` prefixes: `nq`
- `nqlog` → `10^n * log(u/v)`
- `nqln` → `10^n * ln(u/v)`
- `nqexp` → `10^n * exp(u/v)`

**Stack effect:** `(n u v -- y)`

## Prefix Ordering
Prefixes always come **before** the function name, in this order:
1. `n` (scaled) if present
2. `q` (ratio) if present
3. Function name (`log`, `ln`, `exp`, etc.)

Examples:
- `ilog` (i + log)
- `nlog` (n + log)
- `qlog` (q + log)
- `nqlog` (n + q + log)

## Example File Structure
```
ff/lib/math/
├── log.ffp
├── ln.ffp
├── exp.ffp
├── ilog.ffp
├── nlog.ffp
├── qlog.ffp
├── nqlog.ffp
└── __tests__/
    ├── ilog_test.ffp
    ├── nlog_test.ffp
    ├── qlog_test.ffp
    └── nqlog_test.ffp
```

## Import Conventions
All math modules import from `./<function_name>` to maintain stack‑based semantics.
Example:
```forth
.import ./ilog
```

## Internal Naming
Internal constants and helper words use `__{filename}__{name}` pattern to avoid global namespace collisions.
Example: `__log__n`, `__exp__e`

See: `_docs/math-naming-internal.md`

---  
*Adhering to this convention ensures discoverability, consistency, and clear documentation of the mathematical library's capabilities.*