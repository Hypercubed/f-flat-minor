---
id: wsl-interop-ape-executable-intercept
title: "WSL interop Cosmopolitan APE binary intercepts"
last_updated: 2026-05-25
description: >
  Symptom and fix for Cosmopolitan Actually Portable Executable (APE) binary execution failures inside WSL or sandbox environments.
tags: [build, wsl, sandboxing]
---

#### Symptom

When compiling or executing binaries built with the Cosmopolitan Compiler toolchain (`cosmocc`/`cosmoc++`) inside Windows Subsystem for Linux (WSL) or restricted Sandbox environments without root/sudo privileges, execution fails with the error:

```
error: APE is running on WIN32 inside WSL. You need to run:
sudo sh -c 'echo -1 > /proc/sys/fs/binfmt_misc/WSLInterop'
```

#### Likely causes

- Cosmopolitan `binfmt_misc` registration conflicts with the Windows-interop layer `WSLInterop` in WSL.
- Because `WSLInterop` intercepts PE-formatted (`MZ` header) binaries to execute them natively on the Windows host, the system attempts to run the Cosmopolitan binary as a Win32 executable instead of recognizing it as a Linux-compatible Actually Portable Executable (APE).
- Disabling the interop registry intercept globally requires `sudo` access, which is unavailable in standard sandboxed CI/CD or agent execution environments.

#### Fix

Instead of requiring root access or modifying system-wide `binfmt_misc` settings, use a hermetic, path-independent wrapper strategy to force execution via the native APE loader (`ape-x86_64.elf`):

1. For each executable/compiler toolchain binary in the Cosmopolitan path (including internal subprocess compilers like `cc1plus` and `collect2`), rename the raw PE binary from `<name>` to `<name>.ape`.
2. In place of the original binary, write a lightweight shell script wrapper:
   ```bash
   #!/bin/sh
   exec /path/to/ape-x86_64.elf "$0.ape" "$@"
   ```
3. Mark the shell script wrapper as executable. This transparently delegates execution to the correct APE loader, bypassing the `WSLInterop` shell intercepts cleanly and hermetically.

#### Validation

Run `cosmocc` or standard compiled C++ APE binaries from inside the sandboxed shell wrapper and verify they execute successfully without interop intercept crashes.
