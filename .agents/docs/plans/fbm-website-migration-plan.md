---
id: fbm-website-migration-plan
title: "Fbm Website Migration Plan"
last_updated: 2026-04-11
description: >
  ## Goal Document the current state of the Fbm website migration, capture
   what has already landed, and keep the remaining work focused on future
  embeddable playground and REPL web components. ## Implementation Status
  - **Stage 1 — `lit-html`...
tags: [compiler, plans, web]
status: active
kind: initiative
author_kind: human
prompter: "kilo"
---
# Fbm Website Migration Plan

## Goal

Document the current state of the Fbm website migration, capture what has already landed, and keep the remaining work focused on future embeddable playground and REPL web components.

## Implementation Status

- **Stage 1 — `lit-html` migration:** effectively complete
- **Stage 2 — shared internal UI modules:** substantially complete
- **Stage 3 — Astro routing/layouts/page management:** effectively complete; now exercised by the shipped `/reference/` docs section backed by Astro content
- **Stage 4 — public embeddable web components:** not implemented yet; this is the active roadmap

## Guiding Principles

- Solve the current pain first: shared UI and duplicated rendering logic.
- Avoid introducing routing/framework changes until page management becomes the real bottleneck.
- Keep the path open for future portable web components.
- Prefer incremental migration over a full rewrite.

---

## Migration Order and Current Status

1. Convert hard-coded HTML strings to `lit-html` - effectively done
2. Extract shared internal UI modules - substantially done
3. Add Astro for routing, layouts, and page management - effectively done
4. Promote selected pieces into shareable web components - not started yet

---

## Stage 1 — Convert Hard-Coded HTML Strings to `lit-html`

### Status

Completed in practice. Keep this stage as historical context and as a reference for the architectural intent that now underpins the current site.

### Objective

Replace large raw HTML template strings and manual `innerHTML` rendering with `lit-html` templates and `render()`.

### Why first

- Lowest-risk improvement
- Keeps the current app structure mostly intact
- Improves readability and maintainability immediately
- Creates a clean foundation for later component extraction
- Does **not** require committing to Lit components or Shadow DOM yet

### Scope

- Replace raw imported HTML templates where practical
- Replace inline HTML string construction with `html``...```
- Replace imperative full-section re-rendering with targeted `lit-html` rendering
- Keep current app flow, event wiring, and page structure as intact as possible

### Deliverables

- `lit-html` added to the site
- Main shell and repeated UI rendered through template functions
- Reduced `innerHTML` usage
- Clear separation between:
  - render logic
  - event logic
  - application state

### Notes

At this stage, `lit-html` is only a rendering engine.  
Do **not** introduce custom elements, Shadow DOM, or major app restructuring yet.

### Outcome

This stage no longer represents planned work. It describes the rendering shift that made later internal module extraction and Astro integration feasible.

---

## Stage 2 — Extract Shared Internal UI Modules

### Status

Substantially complete. Shared internal modules and boundaries now exist to a meaningful degree, though minor cleanup and refinement can continue opportunistically as part of normal feature work.

### Objective

Identify the duplicated UI and behavior shared between the playground, codettas, and REPL-like surfaces, and extract them into reusable internal modules.

### Why second

Once rendering is moved to `lit-html`, repeated UI becomes easier to identify and extract without changing the site architecture.

### Candidate Extractions

- editor/panel shell
- toolbar / run controls
- output panel
- status / error display
- example/snippet selector
- shared form controls
- code/result layout wrappers

### Recommended Form

At this stage, prefer lightweight reusable modules such as:

- template functions
- render helpers
- state helpers
- small controller modules

These do **not** need to be web components yet.

### Deliverables

- Shared internal UI modules used by multiple pages/surfaces
- Less duplication between playground and codettas
- Clearer boundaries between:
  - shared UI
  - surface-specific behavior
  - execution/runtime logic

### Notes

Focus on reuse inside the app first.  
Do not optimize yet for third-party embedding.

### Outcome

This stage should now be treated as mostly-established architecture rather than a major pending migration track.

---

## Stage 3 — Add Astro for Routing, Layouts, and Page Management

### Status

Effectively complete. Astro now serves the role this stage envisioned, so this section primarily documents the architectural boundary between site-level page management and client-side interactive surfaces. The docs/content architecture is also now exercised in production by the `/reference/` section, with repo docs synced into `web/src/content/docs/` via `web/scripts/sync-docs.mjs`, wired through `web/package.json`, and rendered under `/reference/` by `web/src/pages/reference/index.astro` and `web/src/pages/reference/[...slug].astro`.

### Objective

Introduce Astro once the site has enough pages and content that routing, layout reuse, and content organization are becoming difficult to manage in the current structure.

### Why after component extraction

The current primary pain is duplicated UI, not routing.  
If Astro is introduced too early, the migration mixes two concerns:

- rendering/componentization
- page architecture/content structure

Handling those separately reduces risk.

### What Astro Should Own

- page routing
- shared layouts
- site chrome
- navigation
- docs/tutorial/reference pages
- static content organization

### What Should Stay Client-Side

- playground UI
- REPL UI
- codetta interactivity
- any runtime/editor experience that remains highly interactive

### Migration Approach

- Create Astro layouts and page structure
- Move static/help/reference content into Astro pages
- Embed the existing interactive app surfaces inside Astro pages
- Reuse the internal `lit-html` modules from earlier stages for client-side interactive areas

### Deliverables

- Astro-based page structure
- file-based routing
- shared layout system
- cleaner separation between:
  - content pages
  - interactive tools
  - shared site shell

### Notes

Astro should be added when page management becomes painful enough to justify it.  
It should not be introduced just because it is available.

### Outcome

This stage is no longer an active migration item; it is the current baseline for the website structure. Generated stdlib reference pages for `core`, `math`, `string`, `seq`, and `time` now flow through that Astro/content path as a concrete proof point, not just a planned architecture.

---

## Stage 4 — Promote Selected Pieces into Shareable Web Components

### Status

Not implemented yet. This is the remaining active roadmap item.

### Objective

After the site structure is stable under Astro, identify which parts should become portable components that third parties can embed into other sites.

### Why last

By this point:

- the rendering model is already improved
- shared UI boundaries are clearer
- page architecture is stable
- it is easier to choose which pieces are truly worth making portable

This avoids prematurely forcing web-component concerns onto the whole site.

### Likely Candidates

- `<fbm-playground>`
- `<fbm-repl>`
- `<fbm-code-example>`
- `<fbm-output-panel>`

### Current Focus

- Identify which existing internal modules are stable enough to harden into public APIs
- Decide the minimum embeddable surface area instead of exporting the whole internal UI model
- Preserve the current Astro-hosted site architecture while extracting portable components selectively
- Treat internal module reuse as a prerequisite, not as work that still needs to be invented from scratch

### Decisions to Make at This Stage

- whether a component should use Shadow DOM
- whether light DOM is preferable for styling/integration
- what public API should look like
- what attributes/properties/events external users need
- what embed story should be supported:
  - custom element
  - script initializer
  - iframe fallback

### Deliverables

- one or more reusable public-facing web components
- a documented embed API
- example third-party embed usage
- separation between:
  - internal app modules
  - public embeddable components

### Notes

Only promote components that have a clear external use case.  
Not every internal shared module needs to become a public web component.

---

## Summary of the Strategy

### Immediate priority
Complete Stage 4 by turning selected, already-stabilized internal UI pieces into public embeddable components.

### Mid-term priority
Define a documented embed API and packaging story that works outside the main site.

### Long-term priority
Publish and support selected embeddable playground/REPL components for external use.

---

## Final Recommendation

Treat this plan as a current-state plus remaining-work document:

1. **Keep Stage 1 as completed historical context for the rendering model**
2. **Keep Stage 2 as mostly-complete guidance for internal UI boundaries and cleanup**
3. **Keep Stage 3 as completed architectural context for Astro-based site structure**
4. **Use Stage 4 as the active roadmap for public embeddable web components**

This framing preserves the original staged reasoning, reflects the repo's current state, and keeps the remaining effort focused on external embedding rather than repeating already-completed migration work.
