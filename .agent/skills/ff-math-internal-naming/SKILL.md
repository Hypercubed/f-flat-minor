---
name: ff-math-internal-naming
description: Use when defining internal constants and helper words in f-flat-minor math library modules to avoid global namespace collisions.
---

# f-flat-minor Math Library Internal Naming

Use this skill when implementing internal constants and helper words in math library modules (`ff/lib/math/*.ffp`).

## Naming Convention

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

## Public API vs Internal

- **Public API**: Uses variant prefixes (`i`, `n`, `q`) - e.g., `ilog`, `nlog`, `qlog`
- **Internal**: Uses `__filename__name` pattern - e.g., `__log__n`, `__exp__e`

## When Creating New Math Modules

For a new module `atan.ffp`:
1. Define internal constants: `__atan__precision`, `__atan__pi`
2. Define public API: `iatan`, `natan`, `qatan` (following the public naming convention)

## Benefits

1. **Collision Prevention**: Guarantees uniqueness across all modules
2. **Self-Documenting**: Clear which module a constant belongs to
3. **Consistent**: Same pattern applied throughout the codebase
4. **Explicit Scope**: Visually distinguishes internal from public API

## Reference

- Full documentation: `_docs/supplemental/math-naming-internal.md`
- Public API convention: `_docs/supplemental/math-naming-convention.md`