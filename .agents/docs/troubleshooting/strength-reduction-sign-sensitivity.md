---
id: strength-reduction-sign-sensitivity
title: "Strength reduction sign-sensitivity"
last_updated: 2026-05-23
description: >
  Automated DIV to SHIFTR and MOD to AND optimizations fail for negative numbers due to truncating vs floor division semantics.
tags: [optimizer, arithmetic, testing]
---

#### Symptom

After applying automated optimizer peephole rules or compiling library/application code, math operations (like those in `math/exp` or other negative-number tests) produce unexpected results or fail assertions.

#### Likely causes

- The optimizer lowered a division by a power of two to a right-shift (e.g., `a 2 /` -> `a 1 SHIFTR`) or a modulo by a power of two to a bitwise AND (e.g., `a 2 MOD` -> `a 1 AND`).
- In F♭m, big integers utilize **truncating division** (truncating toward zero), whereas right-shift (`SHIFTR`) and bitwise AND (`AND`) operate on two's complement representations (effectively floor division). For negative operands, these semantics diverge:
  - `-5 / 2 = -2`
  - `-5 >> 1 = -3`
  - `-5 % 2 = -1`
  - `-5 & 1 = 1`

#### Fix

- Never automate `DIV -> SHIFTR` or `MOD -> AND` strength-reductions unless the operand is statically proven to be non-negative.
- Use manual bitwise tricks (`1 >>`, `1 &`) only within code blocks or functions that are known to receive only non-negative inputs.
- Keep `MUL -> SHIFTL` optimizations, as left-shifting is sign-preserving and always safe for two's complement numbers.

#### Validation

Rerun the full test suite (`mise exec -- chomp test:deno`) and check math library tests involving negative numbers (e.g., `cd bun && mise exec -- chomp test:tap`).
