# Learning Candidate

## Task

Fix Monaco JSON worker setup in the ESM build.

## What Failed

- partial ESM Monaco imports left required JSON defaults unavailable

## What Worked

- importing from the package root
- explicit worker wiring for editor and JSON workers

## Reusable Pattern

- prefer package-root Monaco import in this repo when JSON defaults are required unless a narrower import path has been validated

## Candidate AGENTS Update

- add a concise Monaco import rule under recurring pitfalls

## Candidate Troubleshooting Note

- document the symptom and validated fix for missing JSON defaults

## Candidate Repo Decision

- record why the repo uses the broader Monaco import shape despite bundle-size tradeoffs

## Candidate Playbook

- none

## Confidence

high
