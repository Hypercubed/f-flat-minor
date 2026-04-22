---
id: source-driven-reference-manual
title: "Source-Driven Reference Manual for F\u266dm"
last_updated: 2026-04-11
description: >
  Add a maintainable F♭m reference manual that defines a documentation mod
  el, prototypes extraction with cdoc, combines generated and hand-written
   documentation, and integrates into the web project as a new section.
tags: [plans]
status: active
kind: initiative
author_kind: ai
prompter: "cursor-agent"
---
# Plan: Source-Driven Reference Manual for F♭m

## Summary

Add a maintainable F♭m reference manual that defines a documentation model, prototypes extraction with `cdoc`, combines generated and hand-written documentation, and integrates into the web project as a new section.

## Implementation status

- **Phase 1** (2026-04-10): **Complete** — Landed under `_docs/` plus agent guidance under `.agents/`. Current artifacts include `.agents/rules/ff-lib-source-docs.md`, example snippets under `_docs/reference/examples/`, draft tree `_docs/supplemental/DRAFT-DOCS-TREE.md`, `_docs/reference/index.md`, and related reference/manual stubs. The rule now defines the **F♭m source documentation** format for agents (module labeled fields, `@stack` / `@family` / `@kind` word tags, section markers, extraction rules).
- **Phases 2-4** (2026-04-11): **Partially implemented / not closed** — Generated standard-library reference pages now exist under `_docs/reference/generated/lib/` for `core`, `math`, `string`, `seq`, and `time`, and `_docs/reference/index.md` links to those generated pages. This is meaningful progress on extraction/generation, output structure, and manual/generated composition, but it should be treated as a head start rather than a claim that the full prototype, pipeline design, or integration conventions are completely finished.
- **Phase 5** (2026-04-11): **Complete** — The web app now uses Astro content collections with synced docs under `web/src/content/docs/`, keeping `_docs/` as the source of truth. The old ad hoc runtime Markdown loader has been replaced, `/reference/` remains the stable landing route, manual intro content is live at `/reference/manual/introduction/`, the navigation/reference copy now describes the combined manual/reference docs area, docs syncing runs in watch mode during `npm run dev` with a one-shot sync for build, and generated synced docs under `web/src/content/docs/` are gitignored.
- **Phases 6-7**: **Partially started / not complete** — the shipped `/reference/` section plus synced generated stdlib pages provide a real end-to-end slice, but broader validation, fuller coverage, regeneration workflow definition, and contributor hardening remain open.

## Context

The language and `ff/lib` grow faster than ad hoc prose can stay accurate. Source-first reference documentation keeps public API details next to definitions while tutorials and semantics stay manually authored.

## Approach

Phased delivery as originally scoped:

1. **Phase 1 (done):** Document the model — manual vs generated, information architecture, annotation and attachment rules, module vs word docs, minimum fields for public words. Delivered in `.agents/rules/ff-lib-source-docs.md`, `_docs/reference/examples/`, `_docs/supplemental/DRAFT-DOCS-TREE.md`, `_docs/reference/index.md`, and related stubs.
2. **Phase 2:** Prototype extraction with `cdoc` on representative `.ff`/`.ffp` files; evaluate gaps. Partial progress is now visible through generated stdlib reference output under `_docs/reference/generated/lib/`, but the prototype/evaluation work is not yet closed here.
3. **Phase 3:** Design the end-state pipeline (extract → map → model → Markdown). Some pipeline intent is now exercised by the generated pages and site sync flow, but the explicit pipeline design milestone remains open.
4. **Phase 4:** Unify manual and generated content strategy, navigation, cross-linking. `_docs/reference/index.md` and the live `/reference/` section now provide a partial implementation of this integration, without closing the broader content-strategy work.
5. **Phase 5 (done 2026-04-11):** Web integration implemented in Astro (paths, sync/build flow, routes).
6. **Phase 6:** Thin end-to-end slice (one manual page, one core reference page, one lib module page, one site section).
7. **Phase 7:** Expand coverage, scripts, validation, contributor workflow.

## Decisions already made

- **Documented means public:** No separate `@public` marker. Words or files with documentation annotations intended for extraction are public reference; undocumented words are omitted from generated reference.
- **Source-first:** Reference content comes from source annotations; introductions, tutorials, semantics, and design notes remain hand-written.
- **Start simple:** Phase 2 uses `cdoc` as a low-friction prototype; migration to finer extractors is an implementation detail later.
- **Guiding split:** Manual docs own concepts; generated docs own core words, `ff/lib` modules, and indexes.

## Open questions

- Phase 2 extractor behavior when `@stack` disagrees with an inline `/* … == … */` comment on the same definition (spec: warn or require agreement).
- Finer rules for “primary module block” when multiple `Module:` blocks appear (should be validation error).

## Out of scope (until later phases)

- Final annotation syntax frozen in a parser grammar
- Full F♭m parser for docs
- Advanced cross-reference automation
- Complete web documentation UX redesign

## Dependencies

- Phase 1 has no dependencies.
- Phase 2 depends on Phase 1.

## References

- `_docs/supplemental/stack-notation.md` — stack effect notation for words
- `_docs/core-vocabulary.md` — core words (conceptual baseline)
- `.agents/rules/ff-lib-source-docs.md` — authoritative agent rule for the source documentation format (module dossier + `@tag` word blocks)

---

## Purpose (original plan)

This plan outlines a phased approach for adding a maintainable Fbm reference manual that:

- defines the documentation model,
- prototypes extraction using `cdoc` first,
- establishes a path to combine generated and manual documentation,
- and integrates the resulting docs into the web project as a new site section.

The goal is to create a documentation system that is practical to maintain, grows with the language, and fits naturally into the existing project structure.

---

## Goals

The documentation system should:

- provide a clear introduction to the Fbm language,
- document core words,
- document each module in `ff/lib`,
- keep public reference information close to the source,
- support generated Markdown output,
- coexist cleanly with hand-written conceptual and tutorial documentation,
- and be publishable inside the web project as a first-class documentation section.

---

## Guiding Principles

### Documented means public

There should be no separate `@public` marker.

Instead:

- words or modules with documentation annotations are considered public and part of the reference,
- internal/helper words remain undocumented,
- undocumented words are omitted from the generated reference.

This keeps the model simple and avoids maintaining two parallel visibility systems.

### Source-first maintenance

Reference content should come from source annotations wherever possible.

Conceptual material such as introductions, tutorials, semantics, and design notes should remain hand-written.

### Start simple, then refine

The first prototype should optimize for low friction and fast learning rather than perfect extraction.

For that reason, this plan begins with `cdoc` as the extraction prototype, with the option to move later to direct use of `multilang-extract-comments` if finer control is needed.

---

## Scope

This plan covers:

- the documentation model,
- the initial extraction prototype,
- the structure of generated and manual docs,
- and the path to add documentation to the web project.

This plan does not yet cover:

- final annotation syntax in detail,
- a full parser for Fbm syntax,
- advanced cross-reference features,
- or a complete redesign of the web project documentation UX.

Those can be addressed after the initial vertical slice is working.

---

## Proposed Documentation Model

The documentation system should be split into two broad categories:

### 1. Manual documentation

Hand-written documentation should be used for:

- introduction
- language overview
- syntax and semantics
- tutorials
- design notes
- implementation notes
- guides and examples

These pages explain how the language works and how to use it.

### 2. Generated reference documentation

Generated documentation should be used for:

- core word reference
- module reference for `ff/lib`
- word indexes
- module indexes
- other API-style reference pages

These pages answer questions like:

- what does this word do?
- what is its stack effect?
- what module is it defined in?
- what other related words exist?

### Recommended output structure

A combined structure like this is a good starting point:

```
_docs/
  manual/
    introduction.md
    syntax.md
    semantics.md
    tutorials/
  reference/
    index.md
    generated/
      core-words.md
      lib/
        math.md
        seq.md
        ...
```

This keeps the distinction clear while still allowing the final site to present both as one documentation system.

---

## Phase 1 — Define the Documentation Model

### Objective

Define the shape, ownership, and rules of the new documentation system before building extraction tooling.

### Tasks

- Define which content belongs in manual docs vs generated reference docs.
- Define the initial information architecture for the docs.
- Define the annotation model for Fbm source comments.
- Define the attachment rule between a documentation block and the code that follows it.
- Define what counts as a module-level doc block and what counts as a word-level doc block.
- Define the minimum information expected in documented public words.

### Key decisions to lock in

- documented words are public,
- internal words are left undocumented,
- generated pages are derived from annotations in source,
- conceptual docs remain manually authored.

### Deliverables

- `.agents/rules/ff-lib-source-docs.md`
- a short set of example annotated Fbm snippets
- a draft docs tree showing manual and generated content

**Status:** Delivered (2026-04-10). Current repo artifacts live under `_docs/` and `.agents/`, including `.agents/rules/ff-lib-source-docs.md`, `_docs/reference/examples/`, `_docs/supplemental/DRAFT-DOCS-TREE.md`, `_docs/reference/index.md`, and related stubs.

---

## Phase 2 — Prototype Extraction with `cdoc`

### Objective

Use `cdoc` as the first extraction prototype to validate the authoring model and see how well JS-style multiline doc comments work against Fbm source files.

### Why start with `cdoc`

`cdoc` is a useful low-friction starting point because it already works by extracting multiline comments from source files. Since Fbm uses JS-style comments, it provides a fast way to test the documentation approach without immediately building custom extraction logic.

This phase is not intended to prove that `cdoc` will be the final long-term extractor. Its purpose is to answer practical questions early.

### Questions this phase should answer

- Can Fbm doc comments be written in a clear, consistent form?
- Does `cdoc` extract the right blocks from `.ff` and `.ffp` files?
- Does the extracted output preserve enough context to be useful?
- Is the output file-oriented only, or can it support word-level mapping with acceptable effort?
- What gaps would require moving later to direct use of `multilang-extract-comments`?

### Tasks

- Run `cdoc` against a small representative set of Fbm source files.
- Add enough sample doc blocks to test module docs and word docs.
- Review the extracted output for clarity, completeness, and stability.
- Document where `cdoc` is sufficient and where it falls short.

### Deliverables

- a small proof-of-concept extraction run,
- example generated Markdown or extracted comment output,
- a short evaluation note describing:
  - what worked,
  - what did not,
  - and whether the next phase can proceed with `cdoc` or should prepare for a later switch

---

## Phase 3 — Define the Real Generation Pipeline

### Objective

Design the end-state generation pipeline, even if the first implementation uses a simpler prototype.

### Target pipeline

The long-term documentation pipeline should look like this:

1. extract documentation comments from source
2. map comment blocks to Fbm concepts
3. build a structured intermediate model
4. render Markdown reference pages

### Fbm-specific mapping responsibilities

The Fbm mapping layer should eventually determine:

- whether a doc block belongs to a module or a word
- the word name
- stack effect
- file ownership
- module ownership
- source location
- related metadata
- and any grouping needed for generated pages

### Why this phase matters

Without a clear pipeline, it is easy to end up with a prototype that produces extracted text but no durable reference structure.

This phase ensures the project is building toward a maintainable system rather than only generating raw comment dumps.

### Deliverables

- a pipeline design note
- an intermediate data model sketch
- a clear separation of responsibilities between:
  - extraction
  - Fbm mapping
  - rendering

---

## Phase 4 — Define How Generated and Manual Docs Fit Together

### Objective

Create a single documentation strategy that combines generated reference pages and hand-written prose without making them feel like separate systems.

### Recommended model

#### Manual documentation should own

- introduction
- tutorials
- syntax
- semantics
- conceptual explanations
- design rationale
- implementation notes
- larger examples

#### Generated documentation should own

- core words
- module reference for `ff/lib`
- word indexes
- module indexes
- machine-derived summary pages

### Integration strategy

The user should experience the docs as one documentation section, even if the content comes from different sources.

That means:

- manual pages should link into generated reference pages
- generated pages should link back to conceptual pages where useful
- the navigation should mix both content types in one hierarchy

### Suggested combined information architecture

A likely top-level documentation structure could be:

- Introduction
- Language
  - Syntax
  - Semantics
  - Core words
- Library
  - Module index
  - Individual module pages
- Tutorials
- Design notes

### Deliverables

- a content ownership map
- a proposed folder layout
- a navigation outline that combines manual and generated pages
- cross-linking conventions

---

## Phase 5 — Define the Web Project Integration Path

**Status:** Complete (2026-04-11). Astro integration is now in place: `_docs/` remains the source of truth, docs are synced into `web/src/content/docs/`, Astro content collections replaced the old runtime Markdown loader, `/reference/` remains the stable landing route, `/reference/manual/introduction/` now hosts the integrated manual intro content, generated stdlib pages are linked from `_docs/reference/index.md` and exposed in the site Reference section, site copy/navigation has been updated for the combined manual/reference area, dev uses live sync watch mode, build uses one-shot sync, and generated synced docs are gitignored.

### Objective

Plan how the docs become a new section inside the existing web project.

### Desired outcome

The site should gain a new documentation or reference section that includes both manual and generated content and can be rebuilt as the language evolves.

### Decisions to make

- where documentation source files live relative to the web project
- whether generated Markdown is written directly into the site content tree or copied there during build
- how the site discovers navigation for generated pages
- how rebuilds and regeneration fit into the existing project workflow
- whether docs are pre-generated before site build or generated as part of site build

### Recommended path

A practical approach is:

1. keep documentation source files in a stable docs directory
2. generate Markdown into a predictable generated-docs directory
3. expose both manual and generated docs to the web project
4. add a new site section for language docs/reference
5. build a navigation layer that treats them as one coherent documentation area

### Astro-correct architecture (preferred implementation)

For Astro specifically, prefer a content-collections pipeline rather than custom Markdown parsing in runtime code.

- Keep `_docs/` as the source-of-truth docs location.
- Add a prebuild sync step that copies relevant docs into `web/src/content/docs/` (or `web/src/content/reference/`).
- Define an Astro content collection schema in `web/src/content/config.ts` (for example: `title`, `summary`, `order`, `section`, `showInSidebar`).
- Use `getCollection()` and `getEntryBySlug()` in Astro routes to build docs pages and navigation.
- Render entries with Astro collection rendering (`<Content />`) rather than ad hoc Markdown-to-HTML transforms.

This keeps the repository-level docs layout stable while using Astro's native model for type-safe frontmatter, predictable routing, and maintainable navigation.

### Example integration pattern

```
_docs/
  manual/
  reference/
    generated/

web/
  src/
    ...
```

Possible build flow:

1. run docs generation
2. make generated Markdown available to the web project
3. build the site with a new Docs or Reference section

### Deliverables

- web integration design note
- route and navigation plan
- build-step plan for making generated docs visible to the site

---

## Phase 6 — Build a Thin End-to-End Prototype

### Objective

Validate the full workflow with a small vertical slice before scaling up.

### Prototype scope

Build a minimal but complete documentation slice that includes:

- one manual introduction page
- one generated core words page
- one generated `ff/lib` module page
- one new web-project route or section that renders the docs

### Why this matters

This phase validates:

- the authoring experience
- the extraction approach
- the generated/manual docs composition model
- and the site integration path

It is much better to prove this on a narrow slice first than to attempt full-library coverage before the system is working.

### Deliverables

- a working proof of concept
- sample annotated source
- sample generated reference output
- a visible documentation section in the web project

**Current note:** A meaningful thin slice now exists in practice via the shipped `/reference/` docs section and generated stdlib pages for `core`, `math`, `string`, `seq`, and `time`, but this plan still treats the phase as only partially satisfied until the slice is explicitly validated against the intended extraction/generation workflow.

---

## Phase 7 — Expand Coverage and Harden the Workflow

### Objective

After the vertical slice works, broaden documentation coverage and make the workflow reliable.

### Tasks

- annotate more core words
- annotate more `ff/lib` modules
- refine templates and page layouts
- improve cross-linking
- add validation for malformed or misplaced doc blocks
- add scripts for generation and verification
- define regeneration workflow for contributors

### Tooling evolution

This is also the phase where the team can decide whether `cdoc` remains sufficient or whether it is time to move to direct use of `multilang-extract-comments` for finer control.

That later migration should be treated as an implementation refinement, not as a change to the documentation model.

### Deliverables

- broader reference coverage
- stable generation scripts
- documented contributor workflow
- a clear migration path if extraction needs to become more precise

---

## Recommended Deliverables Summary

By the end of the initial effort, the project should have:

- a written documentation model
- a validated extraction prototype using `cdoc`
- a defined generation pipeline
- a content strategy for manual and generated docs
- a web integration plan
- a small end-to-end implementation slice

---

## Recommended Sequencing Summary

1. Define the documentation model.
2. Prototype extraction with `cdoc`.
3. Define the real generation pipeline.
4. Define how generated and manual docs fit together.
5. Define how docs enter the web project as a new section.
6. Build one end-to-end prototype slice.
7. Expand coverage and harden the workflow.

---

## Notes for Future Iteration

This plan intentionally begins with a practical prototype-first approach.

It does not assume that the first extraction tool is the final one. Instead, it prioritizes:

- getting annotations into source
- validating the doc model
- and proving the documentation can flow into the site

Once that is working, the project can improve extraction precision, rendering quality, and site UX without changing the overall documentation strategy.
