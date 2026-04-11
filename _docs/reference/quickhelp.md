---
title: Quick help
summary: Compact language overview covering execution model, syntax, directives, common words, and examples.
order: 10
---

# Quick help

This page mirrors the current web help content in Markdown form. Use it as a compact reference for the execution model, syntax, preprocessor directives, common words, and example snippets.

## What F-flat-minor is

F-flat-minor is a tiny stack-oriented language built around one value type: big integers.

Programs manipulate a data stack, a queue used during execution, and a vocabulary of built-in and user-defined words.

The shared TypeScript core in this repo preprocesses source, compiles it to IR and bytecode, and executes the result.

## Core model

- Numbers are pushed onto the stack.
- Non-numeric tokens are treated as words and executed.
- The language compiles to base64 VLQ encoded big integers.
- Pointers to words are also just integers, so code and data share the same stack.

## Language details

### Numbers

`42`, `-3`, and other integers are pushed directly.

### Words

`dup`, `swap`, `+`, `putc`, and user definitions execute when encountered.

### Definitions

`fact: dup 1 - [ dup 1 - fact * ] ? ;` defines a new word.

### Quotes

`[ dup * ]` creates an unnamed word and leaves its pointer on the stack.

### Pointers

`[+]` pushes a pointer to a word instead of calling it.

### Strings

`'Hello\sWorld!\n'` expands to character codes on the stack.

## Supported directives

- `.load path`: inline another file every time it appears.
- `.import path`: inline a file once per preprocessor session.
- `.m ...`: evaluate a compile-time macro and splice the resulting stack values into the source.
- `.exit`: request termination from the host.

## Common vocabulary

For the full primitive list, see [Core primitives reference](./core-primitives.md).

| Word | Meaning |
|------|---------|
| `dup` | duplicate the top stack item |
| `swap` | swap the top two items |
| `drop` | discard the top item |
| `+` | add the top two values |
| `*` | multiply the top two values |
| `?` | conditional execution |
| `:` | begin a definition |
| `;` | end a definition |
| `putc` | print a character |
| `putn` | print a number in the current base |
| `.` | print the stack to the console/log channel |

## Examples

```text
'Hello\sWorld!\n' prints

fact: dup 1 - [ dup 1 - fact * ] ? ;
20 fact putn 10 putc

[ dup * ] 12 swap eval putn
```
