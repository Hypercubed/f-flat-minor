# F♭m source documentation spec

This spec defines a **source-native documentation format** for F♭m library files that is readable in the source tree, extractable into published documentation, and flexible enough to support future word cards, module pages, and combinator-atlas views.

The design goal is to make `ff/lib` feel like a flat-file wiki **without** turning the source into literate programming.

**Publishing context:** Hand-written conceptual docs live under `docs/manual/` and `_docs/`. This spec governs **annotations in `.ff` / `.ffp` source** that a future pipeline turns into generated reference under `docs/reference/generated/` (see `docs/DRAFT-DOCS-TREE.md` and `_plans/f-flat-minor/source-driven-reference-manual.md`).

**Syntax note:** F♭m definitions use `name: … ;` (name, colon, body, semicolon). Examples below use that form. Some older Forth-oriented docs use a leading `:` before the name; that is **not** F♭m syntax.

---

## Goals

The format should:

- make `ff/lib` files readable as documentation in plain source view,
- keep public reference information close to the code,
- distinguish public surface from internal helpers without a separate visibility flag,
- extract cleanly into Markdown and web documentation,
- support future structured views such as:
  - module pages,
  - word cards,
  - related-word groupings,
  - family indexes,
  - combinator atlas pages.

---

## Core rules

### 1. Documented means public

A documented module or word is considered part of the public reference.

Undocumented words are treated as internal by default and should not appear in generated public reference output.

There is no separate `@public` tag.

### 2. Source is the canonical editorial layer

The source file should already be useful as documentation before any generator runs.

Extraction and publishing should preserve and reorganize this content, not replace it with a separate authoring system.

### 3. Module docs and word docs use different styles

Use two related but distinct block styles:

- **module blocks** use readable labeled fields
- **word blocks** use a summary paragraph plus F♭m-specific tagged fields

This keeps file headers wiki-like and word entries compact and structured.

### 4. Documentation attaches by position

A documentation block attaches to the next meaningful definition or module context.

This means the word name does not need to be repeated in word metadata.

### 5. JS-style multiline comments only

Documentation blocks use JS-style multiline comments.

Preferred form:

```text
/**
 * ...
 */
```

Single-line comments should not be treated as public documentation blocks.

---

## File-level structure

Each `ff/lib` file should follow this general structure:

1. module dossier
2. optional overview or algorithm notes
3. documented public words
4. internal helper section
5. optional implementation notes

Recommended shape:

```text
/**
 * Module: math/atanh-core
 * Summary: Integer-only fixed-point kernels for atanh-derived logarithmic functions.
 *
 * Family: math, series, fixed-point
 * Depends on: precision, division, fraction reduction
 * Related:
 *   - math/ln
 *   - math/fixed
 */

/* ============================================================================
 * Public API
 * ============================================================================
 */

/**
 * Returns a fixed-point decimal approximation of ln(2).
 *
 * @stack n -- floor(10^n * ln(2))
 * @family math logarithms
 * @kind derived
 * @example 3 ln2 => 693
 * @see atanh-core-scaled
 * @see ln
 */
ln2: /* ... */
;

/* ============================================================================
 * Internal helpers
 * ============================================================================
 */

__series-loop: /* ... */
;
```

After the module dossier, `.import` / `.include` lines are allowed before the first public definition; they do not cancel the module block (see **Placement** under module blocks).

---

## Module documentation blocks

### Purpose

A module block documents the file as a whole.

It should read like the header of a wiki page or manual entry.

### Placement

A module block should appear near the top of the file, before the first public definition.

There should be at most **one** primary module block per file.

It may be followed by blank lines, other comments, and `.import` / `.include` lines before the first `name:` definition.

### Format

Module blocks use readable labeled fields.

### Required fields

- `Module:`
- `Summary:`

### Recommended fields

- `Family:`
- `Depends on:`
- `Related:`

### Optional fields

- `Status:`
- `Public words:`
- `Notes:`
- `Invariants:`
- `See also:`

### Example

```text
/**
 * Module: seq/fold
 * Summary: Sequence reduction and accumulation words.
 *
 * Family: sequence, reduction
 * Depends on: quote, eval, recursion
 * Related:
 *   - seq/map
 *   - seq/length
 *   - core/quote
 *
 * Notes:
 *   This module contains public reduction operators and supporting patterns
 *   used by other sequence modules.
 */
```

---

## Word documentation blocks

### Purpose

A word block documents the next public word definition.

It should read as a compact word card in source form.

### Placement

A word block must appear **immediately above** the word definition it documents.

Only **blank lines** are allowed between the block and the definition line that starts with `name:`.

### Format

A word block has:

1. a first paragraph containing the summary
2. zero or more tagged metadata lines

The first paragraph is the canonical short description.

The structured metadata is expressed using F♭m-specific tags.

### Required parts

- summary paragraph
- `@stack`

### Recommended tags

- `@family`
- `@kind`
- `@example`
- `@see`

### Optional tags

- `@pre`
- `@post`
- `@derived-from`
- `@equivalent`
- `@law`
- `@note`
- `@status`
- `@related`

### Example

```text
/**
 * Builds a two-item quoted pair.
 *
 * @stack x y -- [x y]
 * @family quote construction
 * @kind derived
 * @derived-from unit cons
 * @see unit
 * @see cons
 * @example 2 3 pair => [2 3]
 */
pair: unit cons ;
```

---

## Tag reference

### `@stack`

Required for public words.

Describes the stack effect using F♭m stack notation (see `_docs/stack-notation.md`).

Example:

```text
@stack x y -- [x y]
```

### `@family`

Recommended.

Assigns the word to one or more conceptual families. This is intended to support future family browsing and combinator-atlas views.

Use space-separated terms on one line, or a short conceptual phrase.

Examples:

```text
@family quote construction
@family sequence reduction
@family math logarithms
@family stack shuffle
```

### `@kind`

Recommended.

Describes the role of the word.

Suggested values:

- `primitive`
- `derived`
- `kernel`
- `helper`
- `alias`
- `experimental`

Example:

```text
@kind derived
```

### `@example`

Recommended.

Provides a short example of behavior.

Multiple `@example` tags are allowed.

Examples:

```text
@example 3 ln2 => 693
@example [1 2 3] length => 3
```

### `@see`

Recommended.

Adds related words or modules.

Multiple `@see` tags are allowed.

Examples:

```text
@see fold
@see map
@see seq/fold
```

### `@pre`

Optional.

Describes preconditions or expected input assumptions.

Examples:

```text
@pre n >= 0
@pre quote must be well-formed
```

### `@post`

Optional.

Describes postconditions or guarantees.

Example:

```text
@post result is a normalized positive fraction
```

### `@derived-from`

Optional.

Used when the word is conceptually defined from other words or a known basis.

Examples:

```text
@derived-from unit cons
@derived-from eval dip cons
```

### `@equivalent`

Optional.

Used to record an equivalent definition or canonical expansion.

Example:

```text
@equivalent 0 swap [drop 1 +] fold
```

### `@law`

Optional.

Used for important semantic laws, identities, or rewrite rules.

Multiple `@law` tags are allowed.

Examples:

```text
@law [P] [Q] cons == [[P] [Q] eval]
@law length == 0 swap [drop 1 +] fold
```

### `@note`

Optional.

Used for important implementation or usage notes that do not fit another tag.

Multiple `@note` tags are allowed.

Example:

```text
@note Uses integer-only fixed-point arithmetic.
```

### `@status`

Optional.

Indicates maturity or support level.

Suggested values:

- `stable`
- `experimental`
- `internal-public`
- `deprecated`

Example:

```text
@status stable
```

### `@related`

Optional.

Broader related concepts where `@see` is too narrow.

Example:

```text
@related fixed-point series kernels
```

---

## Summary paragraph rules

The summary paragraph should:

- be short,
- describe what the word does,
- avoid repeating the stack effect,
- read well in both source and generated docs.

Good:

```text
/**
 * Returns a fixed-point decimal approximation of ln(2).
 *
 * @stack n -- floor(10^n * ln(2))
 */
```

Less good:

```text
/**
 * ln2 takes n and returns floor(10^n * ln(2)).
 *
 * @stack n -- floor(10^n * ln(2))
 */
```

The second repeats the stack effect and is less readable.

---

## Multiple paragraphs

Word blocks may contain additional prose paragraphs after the summary and before or after tags, but this should be used sparingly.

For most public words, keep the block compact.

Use longer prose mainly for:

- tricky combinators,
- math kernels,
- subtle semantics,
- words with important caveats.

Example:

```text
/**
 * Folds a sequence from left to right using a quoted reducer.
 *
 * This word is intended as the primary reduction entry point for sequence-like
 * values represented in quoted form.
 *
 * @stack init seq [step] -- result
 * @family sequence reduction
 * @kind derived
 * @see map
 * @see length
 */
foldl-example: /* ... */
;
```

---

## Internal helpers

Internal helpers should usually remain undocumented.

When a helper needs a local explanation, use a normal multiline comment or a very small note block, but **do not** treat it as public documentation (avoid `/**` “word card” blocks above internal words).

Example:

```text
/* Internal: advances the series accumulator by one odd denominator step. */
__odd-next: /* ... */
;
```

This may still be useful to readers, but should not be extracted into the public reference.

---

## Section markers

Use regular section markers to make files easier to skim in source view.

Recommended pattern:

```text
/* ============================================================================
 * Public API
 * ============================================================================
 */
```

Other recommended section names:

- `Overview`
- `Algorithm notes`
- `Public API`
- `Internal helpers`
- `Implementation notes`

These markers are useful both for source readability and future extraction.

---

## Public word ordering

Within a module, public documented words should appear before internal helpers where practical.

Recommended order:

1. public entry points
2. closely related public words
3. internal helpers
4. low-level kernels if not intended as user-facing

This helps the file read more like a manual page and less like an implementation dump.

---

## Family vocabulary

The `@family` field is strategically important because it can power future conceptual navigation.

Use a controlled vocabulary where possible.

Suggested family roots:

- `stack`
- `quote`
- `sequence`
- `math`
- `logic`
- `comparison`
- `io`
- `time`
- `parsing`
- `formatting`
- `evaluation`
- `derivation`

Examples of family phrases:

- `stack shuffle`
- `quote construction`
- `quote elimination`
- `sequence reduction`
- `sequence transformation`
- `math series`
- `math logarithms`
- `evaluation control`

Try to reuse existing terms consistently rather than inventing new variants casually.

---

## Kind vocabulary

Use a small stable set of `@kind` values.

Recommended values:

- `primitive`
- `derived`
- `kernel`
- `alias`
- `experimental`

Avoid over-expanding this list early.

If a word is internal and undocumented, it does not need a `@kind`.

---

## Extraction rules

A future extractor should follow these rules:

### Module blocks

A block near the top of a file containing `Module:` is treated as the module dossier for that file.

### Word blocks

A multiline documentation block immediately above a definition line `name:` … is treated as the documentation block for that word if:

- it contains a summary paragraph, and
- it contains at least one structured tag, preferably `@stack`.

### Public visibility

Only documented words should be emitted into public reference output.

### Undocumented helpers

Undocumented definitions should be ignored for public docs.

### Source of name

The word name should be taken from the following definition, not repeated in metadata.

### Inline stack comments

Existing one-line stack-effect comments using `/* inputs word == outputs */` (`_docs/stack-notation.md`) may still appear on definition lines. They are **not** a substitute for `@stack` on public words. If both exist, generators should require agreement or emit a validation warning.

---

## Minimal authoring standard for early adoption

To keep Phase 1 and 2 manageable, use this minimum standard:

### For every documented module

Include:

- `Module:`
- `Summary:`
- `Family:`
- `Related:`

### For every documented public word

Include:

- summary paragraph
- `@stack`
- `@family`
- `@kind`
- `@see` or `@example`

This is enough to make source files meaningfully self-documenting and enough to seed later generated docs.

---

## Example module

```text
/**
 * Module: math/ln
 * Summary: Public logarithm words built on fixed-point kernels.
 *
 * Family: math, logarithms
 * Depends on: math/atanh-core, math/fixed
 * Related:
 *   - math/atanh-core
 *   - math/log10
 */

/* ============================================================================
 * Public API
 * ============================================================================
 */

/**
 * Returns a fixed-point decimal approximation of ln(2).
 *
 * @stack n -- floor(10^n * ln(2))
 * @family math logarithms
 * @kind derived
 * @derived-from atanh-core-scaled
 * @example 3 ln2 => 693
 * @see ln
 * @see atanh-core-scaled
 */
ln2: /* ... */
;

/**
 * Returns a fixed-point decimal approximation of the natural logarithm.
 *
 * @stack n x -- floor(10^n * ln(x))
 * @family math logarithms
 * @kind derived
 * @pre x > 0
 * @see ln2
 */
ln: /* ... */
;

/* ============================================================================
 * Internal helpers
 * ============================================================================
 */

__ln-normalize: /* ... */
;
```

---

## Design rationale

This spec deliberately avoids two extremes:

### Not raw ad hoc comments

Purely freeform comments are easy to write but hard to keep consistent and hard to extract reliably.

### Not full literate programming

A fully literate style would place too much narrative pressure on source files and can make normal source reading harder.

Instead, this format aims for a middle path:

- readable in raw source,
- structured enough for extraction,
- compact enough for normal development,
- expressive enough for future rich documentation interfaces.

---

## Intended future uses

This source format should translate cleanly into:

- Markdown module pages
- Markdown word cards
- reference indexes
- family indexes
- related-word navigation
- combinator atlas views
- playground side panels
- hover documentation
- notebook or trace-based interfaces later

The source format should therefore remain stable even as the published documentation becomes more ambitious.

---

## Initial recommendation

Adopt this spec first in a small number of representative `ff/lib` files:

- one core conceptual module
- one sequence module
- one math module

Use those files to refine wording conventions, family vocabulary, and extraction assumptions before rolling the format across the full library.

---

## See also

- `_docs/stack-notation.md` — stack effect notation
- `_docs/core-vocabulary.md` — conceptual core vocabulary
- `_plans/f-flat-minor/source-driven-reference-manual.md` — phased rollout plan
