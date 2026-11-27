# Tasks

## 1. Grammar scoping

- [ ] 1.1 In `syntaxes/ff.tmLanguage.json`, add the `/**` documentation rule ahead of the `/*`-`@effect` rule, including `#effectInner` for `@effect` bodies. Remove-or-keep the custom outer scope per review (keep if themes key off it; the goal is stock themes render well).
- [ ] 1.2 Verify by opening a sample file with `/**`-documented effects in stock themes (Dark+, Light+): doc styling on the frame, effect highlighting inside, `/*` blocks unchanged.
