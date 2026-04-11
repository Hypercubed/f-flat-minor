# Draft documentation tree (manual + generated)

Normative rules: [../../.agent/rules/ff-lib-source-docs.md](../../.agent/rules/ff-lib-source-docs.md).  
Plan: [`_plans/source-driven-reference-manual.md`](../../_plans/source-driven-reference-manual.md).

```text
docs/
├── DRAFT-DOCS-TREE.md          # this file
├── manual/
│   ├── introduction.md         # (placeholder — to be written)
│   ├── syntax.md             # (placeholder)
│   ├── semantics.md          # (placeholder)
│   └── tutorials/
│       └── README.md         # (placeholder)
└── reference/
    ├── index.md                # reference landing
    ├── examples/               # authoring samples (not generated)
    │   ├── annotated-sample.ff
    │   └── annotated-module-sample.ffp
    └── generated/              # build output (Phase 2+)
        ├── core-words.md       # from annotated core/runtime sources
        └── lib/
            ├── math.md
            ├── seq.md
            ├── string.md
            ├── time.md
            └── ...             # one page per documented ff/lib unit
```

**Legend**

- **manual/** — hand-written; stable paths for the site.
- **reference/generated/** — produced by the doc pipeline; may be gitignored once CI regenerates it.
- **reference/examples/** — normative examples for comment style only.
- **.agent/rules/ff-lib-source-docs.md** — normative authoring rule for source doc blocks in `ff/lib`.
