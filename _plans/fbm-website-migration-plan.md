# Fbm Website Migration Plan

## Goal

Improve componentization of the current Fbm website without forcing a full rewrite up front, while preserving a path toward future embeddable playground and REPL web components.

## Guiding Principles

- Solve the current pain first: shared UI and duplicated rendering logic.
- Avoid introducing routing/framework changes until page management becomes the real bottleneck.
- Keep the path open for future portable web components.
- Prefer incremental migration over a full rewrite.

---

## Proposed Order

1. Convert hard-coded HTML strings to `lit-html`
2. Extract shared internal UI modules
3. Add Astro for routing, layouts, and page management
4. Promote selected pieces into shareable web components

---

## Stage 1 — Convert Hard-Coded HTML Strings to `lit-html`

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

---

## Stage 2 — Extract Shared Internal UI Modules

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

---

## Stage 3 — Add Astro for Routing, Layouts, and Page Management

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

---

## Stage 4 — Promote Selected Pieces into Shareable Web Components

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
Improve rendering and internal reuse.

### Mid-term priority
Improve site structure and page management.

### Long-term priority
Publish selected embeddable playground/REPL components for external use.

---

## Final Recommendation

Use this order:

1. **Convert raw HTML rendering to `lit-html`**
2. **Extract shared internal UI modules**
3. **Adopt Astro for pages, layouts, and routing**
4. **Promote selected interactive pieces into shareable web components**

This sequence keeps the migration incremental, reduces risk, and preserves flexibility for both internal maintainability and future third-party embedding.
