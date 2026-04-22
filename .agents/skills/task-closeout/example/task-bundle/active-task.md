# Active Task

## Task ID

`t-20260407-143210-monaco`

## Agent

`example-agent`

## Agent Session ID

`example-session-id`

## Goal

Fix Monaco JSON worker setup in the ESM build.

## Outcome

completed

## Files Changed

- src/editor/monaco.ts
- vite.config.ts

## Commands Run

- npm test
- npm run build

## Validation

- build succeeded
- JSON editor loads without runtime error

## Remaining Work

- none

## Notes

- partial ESM Monaco imports did not expose the required JSON defaults in this repo
