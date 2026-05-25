---
id: product
title: "Product Overview"
last_updated: 2026-05-25
description: "Foundational concepts, core properties, language tiers, and semantics of the f-flat-minor stack-oriented programming language."
tags: [architecture, overview, semantics]
---

# F♭m — Product Overview

**f-flat-minor** (F♭m) is a minimal stack-oriented programming language and a multi-language implementation challenge. It is a baby brother to [f-flat](https://github.com/Hypercubed/f-flat_node#readme).

## Core Language Properties

- **One data type**: big integers only (no floats, strings, booleans — everything is a big integer)
- **Stack-based execution**: values are pushed onto a data stack; words manipulate the stack
- **Concatenative**: programs are sequences of words; composition is juxtaposition
- **Bytecode**: compiles to base64 VLQ-encoded big integers (`.ffb` files)
- **Minimal vocabulary**: ~40 built-in operations; user words defined with `:` / `;`

## Language Tiers

| Tier | Description |
|------|-------------|
| F♭m<sup>o</sup> | Minimal subset — enough to compute factorial of 100 |
| F♭m | Adds strings, quotes `[ ]`, comments `/* */`, and more words |
| F♭m<sup>+</sup> | Adds preprocessor (`.load`, `.import`, `.m`, `.inline`, `.unsafe`) |

## Key Semantics

- `0` is false; all other values are truthy
- `/` is truncated-toward-zero integer division; `%` is the matching remainder
- Definitions are immutable — words cannot be redefined
- `[word]` is a pointer (numeric value pushed); `[ word ]` is a quotation (new definition)
- Strings like `'Hello'` push character code points onto the stack

## Purpose

The project exists as a learning exercise: implement F♭m in as many languages as possible. Implementations must produce identical bytecode and identical output. The TypeScript (Deno/Node/Bun) and Go implementations are the most complete reference implementations.
