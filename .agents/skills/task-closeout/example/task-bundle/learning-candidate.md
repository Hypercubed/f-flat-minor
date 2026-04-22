# Learning Candidate

## Task

Fix Monaco JSON worker setup in the ESM build.

## What failed

- partial ESM Monaco imports left required JSON defaults unavailable

## What worked

- importing from the package root
- explicit worker wiring for editor and JSON workers

## Reusable pattern

- prefer package-root Monaco import in this repo when JSON defaults are required unless a narrower import path has been validated

## Candidate AGENTS update

- add a concise Monaco import rule under recurring pitfalls

## Candidate troubleshooting note

- document the symptom and validated fix for missing JSON defaults

## Candidate repo decision

- record why the repo uses the broader Monaco import shape despite bundle-size tradeoffs

## Candidate playbook

- none

## Confidence

high
