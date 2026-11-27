# Tasks

## 1. Grammar rule

- [ ] 1.1 In `syntaxes/ff.tmLanguage.json`, add the `@lean` rule (directive capture + `source.lean` include with comment fallback), covering both `/* @lean */` and `@lean` inside `/** */`.
- [ ] 1.2 Verify with and without the Lean extension installed: Lean highlighting with, plain comment styling without, no scope errors either way. Confirm the `source.lean` scope string against the installed Lean extension version.
