---
id: racket-compiler-stdin-unsupported
title: "Racket compiler stdin unsupported"
last_updated: 2026-05-23
description: >
  Racket's compiler does not natively support compiling from standard input.
tags: [racket, compiler, tooling, shell]
---

#### Symptom

Piping preprocessed source code to the Racket compiler (e.g., via `ff-preprocess.sh | ff-compile.sh --compiler racket -`) fails or hangs.

#### Likely causes

- The Racket compiler (`go/` or native implementation) requires a file path and has no native support for standard input (`-`) streams.

#### Fix

- In compilation scripts, intercept the `-` input path when using Racket.
- Write standard input to a randomized, workspace-local temporary file (e.g., `.racket-compile-XXXXXX.ff`).
- Compile using the temporary file.
- Register signal and execution exit `trap`s to clean up the temporary file on success, failure, or interruption:
  ```bash
  trap 'rm -f "$TEMP_FILE"' EXIT TERM INT HUP
  ```

#### Validation

Run compilation via `./shell/ff-compile.sh --compiler racket -` with a piped source stream and verify the output is compiled correctly and the temporary file is deleted.
