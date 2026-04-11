---
title: String library
summary: Reference for the character and string-printing words exported by the top-level `string` module.
order: 112
---

# String library reference

This page lists the public words currently defined in the top-level `string` library module.

## `char.ffp`

Source: `ff/lib/string/char.ffp`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `space` | `-- 32` | Pushes the ASCII code for a space. |
| `newline` | `-- 10` | Pushes the ASCII code for a newline. |
| `sp` | `-- {prints char(32)}` | Prints a single space character. |
| `cr` | `-- {prints char(10)}` | Prints a newline character. |
| `tab` | `-- {prints char(9)}` | Prints a tab character. |
| `lower?` | `n -- flag` | Tests whether a character code is lowercase ASCII. |
| `upper?` | `n -- flag` | Tests whether a character code is uppercase ASCII. |
| `ucase` | `n -- n'` | Converts a lowercase ASCII character code to uppercase. |
| `lcase` | `n -- n'` | Converts an uppercase ASCII character code to lowercase. |

## `str.ffp`

Source: `ff/lib/string/str.ffp`

| Word | Stack effect | Description |
|------|--------------|-------------|
| `prints` | `0 n* -- {prints chars}` | Prints a null-terminated stack string. |
| `println` | `0 n* -- {prints chars, newline}` | Prints a stack string followed by a newline. |
| `sprint` | `[S] -- {prints string}` | Evaluates and prints a quoted string. |
| `sprintln` | `[S] -- {prints string, newline}` | Evaluates and prints a quoted string with a trailing newline. |
| `slen` | `[S] -- n` | Returns the length of a quoted string. |
| `scat` | `[A] [B] -- [A+B]` | Concatenates two quoted strings. |
| `sjoin` | `[A] [Sep] [B] -- [A Sep B]` | Joins two quoted strings with a separator. |
| `cjoin` | `[A] c [B] -- [A c B]` | Joins two quoted strings with a single character. |
