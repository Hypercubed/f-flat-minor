## Why

Currently, preprocessor macro commands (`.m`, `.ff`, `.ffp`) in the _F♭m⁺_ specification are strictly line-based, meaning they are limited to a single line of execution. This prevents authors from writing readable, structured, and complex compile-time loops or algorithms, forcing them to squeeze everything onto a single, hard-to-read line. 

To solve this, we are proposing **consecutive-line preprocessor macro merging**. Under this feature, multiple consecutive lines starting with the same macro directive (`.m`, `.ff`, or `.ffp`) will be automatically accumulated by the preprocessor and executed as a single, multi-line macro block. This provides full multiline macro capabilities while maintaining the line-based design boundaries of the preprocessor.

## What Changes

*   **Consecutive Line Merging:** Preprocessor lines starting with `.m`, `.ff`, or `.ffp` that are directly adjacent in the source file will be joined (using newlines) into a single macro string.
*   **Unified Execution:** The accumulated multi-line macro is executed in the compile-time VM as a single execution run.
*   **Block Replacement:** The entire block of consecutive macro lines is replaced in the output stream with the combined space-separated stack outputs of the VM run.

## Capabilities

### New Capabilities
- `multiline-preprocessor-macros`: Defines the preprocessor sequence parsing rules, line-joining behavior, and replacement mechanics for consecutive `.m`, `.ff`, and `.ffp` lines.

### Modified Capabilities
<!-- Existing capabilities whose REQUIREMENTS are changing (not just implementation).
     Only list here if spec-level behavior changes. Each needs a delta spec file.
     Use existing spec names from openspec/specs/. Leave empty if no requirement changes. -->

## Impact

*   **Affected Code:** The preprocessor implementations across all active runtimes (TypeScript/Deno/Node/Bun in `preprocess.ts`, Go in `preprocess.go`, Racket in `preprocess.rkt`).
*   **Compatiblity:** Fully backward-compatible. Single-line macros behave exactly the same way, while consecutive lines are now cleanly optimized into a single compile-time execution pass.
