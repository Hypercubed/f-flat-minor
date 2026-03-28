---
status: ready
status_date: 2026-03-28
creator: codex
---

# Plan: Make Local Agent Skills `mise`-First for Runtime and Test Commands

## Summary

Update the local agent skill docs so agents stop assuming `node`, `bun`, `npm`, and `chomp` are already on `PATH`. The skills should teach a `mise`-first workflow, with `mise x -- ...` as the default execution pattern and `mise install` as the one-time bootstrap when tools are not yet installed.

## Context

Current local skills teach bare runtime commands such as `node node/bin/ff-run.ts ...` and verification commands such as `npm --prefix web run build`. That works in shells that already inherit the workspace toolchain, but it fails in fresh agent sessions where the `mise`-managed tools are not active. The repo already has a `mise.toml`, but the targeted skills do not present `mise` as the first-line solution.

This plan is intentionally limited to local agent skill docs only.

## Approach

Update `.agent/skills/ff-code-authoring/SKILL.md`:
- Add a top-level rule that runtime-dependent commands should be run with `mise x -- ...`.
- Add a one-time bootstrap note: if the requested tool is missing, run `mise install` and retry.
- Replace direct `.ffp` examples using bare `node` with `mise x -- node ...`.
- Replace direct trace examples using bare `node` with `mise x -- node ...`.
- Keep the Python `.ff` guidance, but clarify that `mise` is the default solution for managed tools rather than switching runtimes blindly.
- Adjust any build-artifact examples so they are not framed as the first thing an agent should try in a fresh workspace.

Update `.agent/skills/ff-euler-ffp/SKILL.md`:
- Add the same `mise` bootstrap rule near the top.
- Replace all direct Node runner examples with `mise x -- node node/bin/ff-run.ts ...`.
- Preserve the existing Euler workflow and runtime preference; change only the tool bootstrap path.

Update `.agent/skills/ff-library-web-refactor/SKILL.md`:
- Add the same `mise` bootstrap rule near the top or before the debugging/build commands.
- Replace `node node/bin/ff-run.ts -t <file>.ffp` with `mise x -- node node/bin/ff-run.ts -t <file>.ffp`.
- Replace `npm --prefix web run build` with `mise x -- npm --prefix web run build`.

Do not update:
- `AGENTS.md`
- `README.md`
- `bun/README.md`
- `deno/README.md`
- `node/README.md`
- `.agent/skills/ff-math-internal-naming/SKILL.md`

## Decisions already made

- Scope is local agent skill docs only.
- Use `mise x -- ...` as the canonical command form because it does not depend on shell activation.
- Document `mise install` as the one-time remediation step when tools are not yet installed.
- Keep existing runtime preferences in the skills; this is a bootstrap/documentation fix, not a runtime-policy change.

## Open questions

None -- ready to implement.

## Out of scope

- Human-facing repo docs
- Runtime README updates
- Changes to the actual `mise.toml`
- Fixing existing test failures unrelated to missing tools, including the current `trig.test.ffp` failure

## Dependencies

- None

## References

- `mise.toml`
- `.agent/skills/ff-code-authoring/SKILL.md`
- `.agent/skills/ff-euler-ffp/SKILL.md`
- `.agent/skills/ff-library-web-refactor/SKILL.md`
