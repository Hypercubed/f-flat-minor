## 1. Core State Setup

- [x] 1.1 Add `private readonly sysDefs: (((() => void)) | undefined)[] = new Array(MAX_SYSTEM_OP_CODE + 1);` to the `Engine` class.

## 2. Dispatch Path Updates

- [x] 2.1 Update `defineSystem` to throw if `this.sysDefs[code]` is defined, and set `this.sysDefs[code] = fn;` otherwise.
- [x] 2.2 Update `callSystem` to execute `this.sysDefs[Number(code)]` and handle undefined gracefully.

## 3. Peripheral Updates

- [x] 3.1 Update `inspectValue` to consult `sysDefs` when `isSystem` is true.
- [x] 3.2 Verify test suite passes with `mise exec -- chomp test:deno`.
