# f-flat-minor Math Library Internal Naming Convention

## Purpose
This document describes the current soft-private naming convention for internal constants and helper words in the f-flat-minor math library.

## Naming Pattern
Soft-private definitions use the pattern: `_{filename}__{name}`

### Components
1. **Single underscore prefix** (`_`) - Signals a soft-private/internal word
2. **Filename** (without extension) - Provides module-specific namespace
3. **Double underscore separator** (`__`) - Separates namespace from identifier
4. **Descriptive name** - Clear indication of the constant's purpose

## Examples

### From `log.ffp`
```forth
_log__n: 20 ; /* number of digits for fixed-point calculations */
_log__s: 100000000000000000000 ; /* 10^n scale factor */
_log__ln2: 69314718055994530941 ; /* floor(ln(2)*10^n) */
_log__log2: 30102999566398119521 ; /* floor(log(2)*10^n) */
```

### From `exp.ffp`
```forth
_exp__n: 150 ; /* number of digits for fixed-point calculations */
_exp__e: 2718281828459045235360287471352662497757247093699959574966967627724076630353547594571382178525166427427466391932003059921817413596629043572900334295260 ; /* floor(e*10^n) */
```

## Benefits
1. **Collision Prevention**: Reduces accidental collisions across modules
2. **Self-Documenting**: Makes the module association obvious
3. **Consistent**: Applies the same pattern throughout the codebase
4. **Explicit Scope**: Visually distinguishes internal helpers from public API

## Public API vs Internal
- **Public API**: Uses variant prefixes (`i`, `n`, `q`) - e.g., `ilog`, `nlog`, `qlog`
- **Soft-private**: Uses `_{filename}__{name}` - e.g., `_log__n`, `_exp__e`
- **Reserved for future preprocessing privacy**: `__...`

## Application
When creating new math modules (e.g., `atan.ffp`, `sqrt.ffp`):
1. Define soft-private internals: `_atan__precision`, `_atan__pi`
2. Define public API: `iatan`, `natan`, `qatan`

This convention keeps internal helpers predictable while reserving the `__` prefix for future preprocessor-scoped privacy.
