# Web Implementation

The `web/` directory contains a browser SPA for F-flat-minor built with Vite and plain TypeScript.

## What it does

- Reuses the shared TypeScript core in `typescript/core/src`
- Preprocesses `.ffp` source in the browser
- Bundles a small virtual filesystem so `.load ./lib/core.ff` works
- Compiles and executes F-flat-minor code without a server
- Includes a persistent browser REPL
- Includes a built-in help page with language and preprocessor details

## Commands

```bash
cd web
npm install
npm run dev
```

For a production build:

```bash
cd web
npm run build
```

Run web-specific tests:

```bash
cd web
npm run test
```

## Notes

- The app currently ships with `ff/hello.ffp` as the starter example.
- Browser stdin is provided by the text input in the UI.
- stdout is captured in the output panel.
- Some engine diagnostics that use `console.log` are also captured and shown in the output area.
- The REPL keeps compiler symbols, engine state, and imported files until you use `.reset`.
- Shared URLs support `txt.`, `b64.`, and `c64.` code payloads.
