## Codetta submission

- Etude: `ff/codetta/<slug>/` (`<title>`)
- Leader: `@github-handle` or name for `README.md`
- Updated score: `<bytes>` compiled bytes (`.ffb`, including `FbAbbCb`)

## Validation

- Expected output: `matches solution.out`
- Previous score: `<old-bytes>`
- New score: `<new-bytes>`
- Validation notes:
  - compiler/runtime used:
  - how output was checked:
  - how compiled byte length was checked:

## Files changed

- `ff/codetta/<slug>/README.md`
- `ff/codetta/<slug>/solution.out`
- `ff/codetta/<slug>/solution.ff` or `ff/codetta/<slug>/solution.ffp`

## Checklist

- [ ] This PR updates exactly one Codetta etude under `ff/codetta/<slug>/`.
- [ ] The submitted program matches `ff/codetta/<slug>/solution.out`.
- [ ] The updated `README.md` `bytes:` value is the optimized compiled `.ffb` byte length, including `FbAbbCb`.
- [ ] The new score is strictly lower than the previous `README.md` `bytes:` value.
- [ ] The source file keeps the expected Codetta filename: `solution.ff` or `solution.ffp`.
- [ ] Any README metadata changed in this PR reflects the new winning submission.
