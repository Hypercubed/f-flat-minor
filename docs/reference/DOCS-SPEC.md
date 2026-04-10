# F♭m reference documentation model

This document locks in the **documentation model** for source-driven reference material (Phase 1 of the source-driven reference manual plan). Tooling in later phases must map source annotations to this model; it may extend details but should not contradict the ownership and attachment rules here.

## 1. Manual documentation vs generated reference

| Kind | Owner | Typical content | Examples |
|------|--------|-----------------|----------|
| **Manual** | Human-authored Markdown (or site pages) under `docs/manual/` | Introduction, language overview, syntax and semantics, tutorials, design and implementation notes, guided examples | `introduction.md`, `syntax.md`, `semantics.md`, `tutorials/*` |
| **Generated reference** | Produced from annotated F♭m source | Core word entries, `ff/lib` module pages, word and module indexes, machine-derived summaries | `docs/reference/generated/core-words.md`, `docs/reference/generated/lib/*.md` |

**Rules**

- Conceptual “why” and teaching material live in **manual** docs.
- Factual “what does this word do, where is it, what is its stack effect” live in **generated** reference, sourced from annotations.
- Existing narrative docs under `_docs/` remain the project’s long-form design and tutorial corpus; the new tree under `docs/` is the **publishable, site-oriented** layout. Manual pages may link to `_docs/` where appropriate until content is migrated.

## 2. Information architecture (initial)

Top-level user-facing structure (one documentation area, mixed sources):

1. **Introduction** — manual  
2. **Language** — manual (syntax, semantics) + generated (**core words** as reference)  
3. **Library** — generated module index + per-module reference pages for `ff/lib`  
4. **Tutorials** — manual  
5. **Design / implementation notes** — manual (may start as links into `_docs/`)

Repository layout (draft; see also `docs/DRAFT-DOCS-TREE.md`):

```text
docs/
  manual/
    introduction.md
    syntax.md
    semantics.md
    tutorials/
  reference/
    DOCS-SPEC.md           # this file — model, not end-user tutorial
    index.md               # reference landing (manual stub until generation exists)
    examples/              # non-normative annotated samples for authors
    generated/             # build output; may be gitignored later
      core-words.md
      lib/
        math.md
        seq.md
        ...
```

## 3. Public surface: “documented means public”

- There is **no** `@public` (or similar) marker.
- A **word** that carries a **reference doc block** (see §4) is treated as **public** for the generated reference and **must** be stable API for its module.
- Words **without** such a block are **internal**: they may appear in source for implementers but are **omitted** from generated public reference lists.
- **Modules** (files) may have a **module doc block**; that file is then a documented public module for reference purposes. Undocumented library files are omitted from the module index until annotated.

## 4. Annotation shape (F♭m comments)

F♭m uses C-style comments. For **reference** material (distinct from inline stack hints), use a **block comment** opened with `/**` and closed with `*/` (JSDoc-style opener) so authors and tools can distinguish long-form docs from short `/* … */` stack-effect notes.

**Word reference block (recommended shape)**

```text
/**
 * One-line summary (imperative or third person, sentence case).
 *
 * Optional longer description in Markdown-friendly prose.
 * Stack effect line should follow project notation (see _docs/stack-notation.md).
 *
 * Stack: ( inputs -- outputs )
 * (Or: Stack: see inline /* ... */ on the definition line.)
 */
```

**Module reference block**

```text
/**
 * Module: relative/path/to/file.ffp
 * One-line summary of the module.
 *
 * Optional overview: purpose, main entry words, relationship to other modules.
 */
```

**Plain `/* */` without `/**`**

- Still valid F♭m; may be used for **short stack effects** on the same line or adjacent line (existing style in `ff/lib`).
- Phase 2 tooling (`cdoc`) may treat all block comments similarly; the **authoring convention** for **public reference** is `/** … */` for blocks that should become reference entries.

**Line comments `//`**

- Not used for normative reference blocks in this model (optional for scratch notes; excluded from public reference unless a later tool explicitly includes them).

## 5. Attachment rules

Comments attach to **the next syntactic definition** that follows them, with only **whitespace** and **other comments** between.

- A **word definition** is a line matching: `name: … ;` (definition may span lines; the **name** is the token before `:` at the start of the definition).
- The **attached** reference block is the **last** contiguous `/** … */` (or, if tooling merges, the immediately preceding block comment group) with no non-comment code between that block and the definition’s `name:` line.

**Module-level attachment**

- A **module doc block** is a `/** … */` that appears **at the beginning of the file**: after optional whitespace, before any **non-comment** line that is **not** an `.import` or `.include` directive.
- Consecutive `.import` / `.include` lines (and blank lines) may follow the module block without breaking module attachment; the **first** `name:` definition after those imports begins the word-level region of the file.
- If the first documentation in a file is immediately followed only by imports, then another `/** … */` appears before the first word, the **first** block is the **module** doc and the **second** attaches to the **first** defined word (or solely to the module if no word doc is intended — authors should avoid ambiguous double blocks at file top without a definition in between).

**Order**

- Module doc: at most one primary module block per file (first qualifying position).
- Word docs: one block per public word, immediately above `name:`.

## 6. Module-level vs word-level doc blocks

| Level | Position | Describes |
|-------|----------|-----------|
| **Module** | Start of file (see §5) | The file as a library unit: purpose, grouping, key words, import expectations |
| **Word** | Immediately before `name:` | That word’s behavior, stack effect narrative, warnings |

Internal helper words should have **no** `/**` reference block so they stay out of the public reference.

## 7. Minimum content for a documented public word

Each public word’s reference block **should** include:

1. **Summary line** — short description of what the word does.  
2. **Stack effect** — either in the block as a `Stack:` line using notation from `_docs/stack-notation.md`, or a clear pointer that the canonical stack comment is on the definition line (for generated output, tooling should merge inline `/* … */` when present).  
3. **Module/file identity** — supplied by the generator from path, not necessarily repeated in every block.

**Should** when practical:

- One **example** (inline code or description).  
- **Errors / preconditions** (e.g. queue balance, empty stack).  
- **See also** related words (manual cross-links in early phases; automated links later).

## 8. Relationship to existing stack-effect comments

Many definitions use inline `/* inputs word == outputs */` per `_docs/stack-notation.md`. That convention **remains** valid. Public words **additionally** use `/** … */` when prose reference is needed. Generators should prefer the **inline** comment for machine-readable stack layout when both exist and agree; conflict is a **validation** error in later phases.

## 9. Normative references

- Stack notation: `_docs/stack-notation.md`  
- Core vocabulary (conceptual, not generated): `_docs/core-vocabulary.md`  
- Plan and later phases: `_plans/f-flat-minor/source-driven-reference-manual.md`
