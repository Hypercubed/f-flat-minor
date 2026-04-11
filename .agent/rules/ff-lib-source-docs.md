# F♭m ff/lib source docs rule

Apply this rule when editing or adding `ff/lib/**/*.ff` and `ff/lib/**/*.ffp` files that should participate in the source-driven reference manual.

## Intent

- Keep library source readable as source and as documentation.
- Treat source doc blocks as the canonical editorial layer for generated reference output.
- Preserve the public/internal split by documentation presence rather than a separate visibility flag.

## Public vs internal

- A documented module or word is public reference surface.
- Undocumented words are internal by default and should stay out of generated public reference output.
- Do not invent an `@public` tag or any parallel visibility mechanism.

## Comment forms

- Public documentation blocks must use JS-style multiline doc comments: `/** ... */`.
- Do not use single-line comments as public documentation blocks.
- Internal helper notes should use ordinary comments such as `/* ... */`, not `/** ... */` word-card blocks.

## File structure for `ff/lib` modules

Prefer this order when practical:

1. one module dossier near the top of the file
2. optional overview or algorithm notes
3. documented public words
4. internal helper section
5. optional implementation notes

Use section markers to keep source skimmable, for example:

```text
/* ============================================================================
 * Public API
 * ============================================================================
 */
```

Recommended section names: `Overview`, `Algorithm notes`, `Public API`, `Internal helpers`, `Implementation notes`.

## Module dossier rules

- Use at most one primary module dossier per file.
- Place it near the top of the file, before the first public definition.
- `.import` and `.include` lines may appear after the dossier and still belong to that module context.
- Use labeled fields rather than `@tags`.

Required fields:

- `Module:`
- `Summary:`

Recommended fields:

- `Family:`
- `Depends on:`
- `Related:`

Optional fields:

- `Status:`
- `Public words:`
- `Notes:`
- `Invariants:`
- `See also:`

## Public word block rules

- A public word block documents the next `name:` definition by position.
- Place it immediately above the definition; only blank lines may appear in between.
- Do not repeat the word name inside metadata.
- Start with a short summary paragraph that explains behavior without restating the stack effect.
- Keep most word blocks compact; add extra prose only for tricky combinators, math kernels, subtle semantics, or important caveats.

Required parts:

- summary paragraph
- `@stack`

Recommended tags:

- `@family`
- `@kind`
- `@example`
- `@see`

Optional tags:

- `@pre`
- `@post`
- `@derived-from`
- `@equivalent`
- `@law`
- `@note`
- `@status`
- `@related`

## Authoring defaults

- For early-adoption public words, include at minimum: summary paragraph, `@stack`, `@family`, `@kind`, and at least one of `@see` or `@example`.
- For documented modules, include at minimum: `Module:`, `Summary:`, `Family:`, and `Related:`.
- Put documented public entry points before internal helpers where practical.
- If a definition also has an inline stack-effect comment like `/* ... == ... */`, keep it consistent with `@stack`; mismatches should be treated as a validation problem.

## Controlled vocabulary

Prefer stable family roots such as `stack`, `quote`, `sequence`, `math`, `logic`, `comparison`, `io`, `time`, `parsing`, `formatting`, `evaluation`, and `derivation`.

Prefer stable `@kind` values:

- `primitive`
- `derived`
- `kernel`
- `alias`
- `experimental`

Reuse existing family phrases when possible instead of inventing near-duplicates.

## Agent checklist

When an agent edits documented `ff/lib` code, it should:

- preserve existing public doc blocks unless the code contract changes
- add or update module dossiers and word blocks using the format above
- avoid creating `/**` blocks for internal helpers
- keep summary text readable in raw source and generated docs
- ensure documentation still attaches correctly by position

## Related references

- `_docs/supplemental/stack-notation.md`
- `_docs/core-vocabulary.md`
- `_plans/source-driven-reference-manual.md`
