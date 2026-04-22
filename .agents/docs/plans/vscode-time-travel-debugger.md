---
id: vscode-time-travel-debugger
title: "VSCode Time-Travel Debugger for F-flat-minor"
last_updated: 2026-04-17
description: >
  Superseded by two narrower plans: vscode-trace-viewer.md for the fast tr
  ace-viewer prototype and vscode-full-dap-debugger.md for the later full
  VS Code debugger / DAP work.
tags: [debugging, plans, vscode]
status: superseded
kind: initiative
superseded_by:
  - plans/vscode-trace-viewer
  - plans/vscode-full-dap-debugger
author_kind: ai
prompter: "GPT-5.4"
---
# Plan: VSCode Time-Travel Debugger for F-flat-minor

## Summary

Superseded by two narrower plans: `vscode-trace-viewer.md` for the fast trace-viewer prototype and `vscode-full-dap-debugger.md` for the later full VS Code debugger / DAP work.

## Context

This plan originally combined:

- a fast VS Code trace-viewer prototype based on recorded execution traces
- a later full debugger with richer runtime modeling and Debug Adapter Protocol integration

Follow-up scoping split those into two separate plans so the lower-risk prototype can advance without being blocked on the full debugger architecture.

## Approach

Do not implement from this plan directly. Use:

- `vscode-trace-viewer.md` for the first recorded-trace prototype
- `vscode-full-dap-debugger.md` for the later full debugger / DAP architecture

## Decisions already made

- **Primary product surface:** VS Code debugger extension.
- **Execution/runtime target:** TypeScript implementation only for v1.
- **Scope split:** the original umbrella roadmap is replaced by separate trace-viewer and full-DAP plans.
- **Trace-viewer first:** the lower-scope prototype should land before any full DAP work.
- **Reverse stepping for the full debugger must be deterministic, not best-effort.**

## Open questions

None — superseded by the child plans.

## Out of scope

- Direct implementation work. Use the replacement plans instead.

## Dependencies

- `vscode-trace-viewer.md`
- `vscode-full-dap-debugger.md`

## References

- `vscode-trace-viewer.md`
- `vscode-full-dap-debugger.md`
