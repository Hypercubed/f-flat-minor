# f-flat-minor Math Library Internal Naming Convention

## Purpose
This document describes the naming convention for internal constants and helper words in the f-flat-minor math library to prevent global namespace collisions.

## Naming Pattern
All internal definitions use the pattern: `__{filename}__{name}`

### Components
1. **Double underscore prefix** (`__`) - Signals module-private/internal scope
2. **Filename** (without extension) - Provides module-specific namespace
3. **Double underscore separator** (`__`) - Separates namespace from identifier
4. **Descriptive name** - Clear indication of the constant's purpose

## Examples

### From `log.ffp`
```forth
__log__n: 20 ; /* number of digits for fixed-point calculations */
__log__s: 100000000000000000000 ; /* 10^n scale factor */
__log__ln2: 69314718055994530941 ; /* floor(ln(2)*10^n) */
__log__log2: 30102999566398119521 ; /* floor(log(2)*10^n) */
```

### From `exp.ffp`
```forth
__exp__n: 150 ; /* number of digits for fixed-point calculations */
__exp__e: 2718281828459045235360287471352662497757247093699959574966967627724076630353547594571382178525166427427466391932003059921817413596629043572900334295260 ; /* floor(e*10^n) */
```

## Benefits
1. **Collision Prevention**: Guarantees uniqueness across all modules
2. **Self-Documenting**: Clear which module a constant belongs to
3. **Consistent**: Same pattern applied throughout the codebase
4. **Explicit Scope**: Visually distinguishes internal from public API

## Public API vs Internal
- **Public API**: Uses variant prefixes (`i`, `s`, `q`) - e.g., `ilog`, `slog`, `qlog`
- **Internal**: Uses `__filename__name` pattern - e.g., `__log__n`, `__exp__e`

## Application
When creating new math modules (e.g., `atan.ffp`, `sqrt.ffp`):
1. Define internals: `__atan__precision`, `__atan__pi`
2. Define public API: `iatn`, `satan`, `qatan` (following your convention)

This convention ensures that as the math library grows, internal definitions won't accidentally collide while maintaining a clean, predictable naming scheme.