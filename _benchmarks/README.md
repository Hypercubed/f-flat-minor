# F-Flat Minor Benchmark Suite

This directory contains Markdown-formatted benchmark results exported using [Hyperfine](https://github.com/sharkdp/hyperfine). These benchmarks compare the performance of f-flat-minor implementations across different platforms, executors, interpreters, preprocessors, and compilers.

---

## Generated Benchmark Files

### 1. [`native.md`](file:///home/jmh/workspace/projects/f-flat-minor/_benchmarks/native.md) (`bench:native`)
*   **What it measures**: Raw, native execution performance of compiled binaries and interpreters running directly without intermediate script or helper startup overhead.
*   **Components compared**: Direct low-level compiled executables (like Rust, C++, GHC, and Go executables), raw VM binaries (Deno/Bun bytecode executors), and direct interpreter entry points (Python, Ruby, AssemblyScript).
*   **Key purpose**: Serves as a reference for the absolute speed limits of each language platform.

### 2. [`run.md`](file:///home/jmh/workspace/projects/f-flat-minor/_benchmarks/run.md) (`bench:run`)
*   **What it measures**: Performance of full source code interpretation through the unified CLI helper script [`ff run`](file:///home/jmh/workspace/projects/f-flat-minor/shell/ff-run.sh).
*   **Components compared**: All 9 language runner platforms (Deno, Node, Bun, Go, Dart, Python, Ruby, Racket, C++).
*   **Key purpose**: Compares end-to-end source-to-execution times (including preprocessing where required).

### 3. [`execute.md`](file:///home/jmh/workspace/projects/f-flat-minor/_benchmarks/execute.md) (`bench:execute`)
*   **What it measures**: Direct execution speed of pre-compiled bytecode (`.ffb`) loaded and executed in the VM engine using the unified helper [`ff execute`](file:///home/jmh/workspace/projects/f-flat-minor/shell/ff-execute.sh).
*   **Components compared**: The 5 language platforms that implement VM engines supporting bytecode execution (Deno, Node, Bun, Go, Racket).
*   **Key purpose**: Isolates VM execution and instruction dispatch performance, bypassing preprocessing, parsing, and source compilation.

### 4. [`compile.md`](file:///home/jmh/workspace/projects/f-flat-minor/_benchmarks/compile.md) (`bench:compile`)
*   **What it measures**: Compiler performance compiling f-flat-minor source files to bytecode (`.ffb`) using the unified helper [`ff compile`](file:///home/jmh/workspace/projects/f-flat-minor/shell/ff-compile.sh).
*   **Components compared**: The 5 platforms implementing compilers (Deno, Node, Bun, Go, Racket).
*   **Key purpose**: Highlights compilation efficiency and startup latency of the compilers.

### 5. [`preprocess.md`](file:///home/jmh/workspace/projects/f-flat-minor/_benchmarks/preprocess.md) (`bench:preprocess`)
*   **What it measures**: Preprocessor performance resolving macros, imports, and source directives using the unified helper [`ff preprocess`](file:///home/jmh/workspace/projects/f-flat-minor/shell/ff-preprocess.sh).
*   **Components compared**: The 4 platforms implementing preprocessors (Deno, Node, Bun, Go).
*   **Key purpose**: Highlights preprocessor tokenization, expansion, and file-resolution performance.

---

## How to Run & Regenerate Benchmarks

All benchmarks are managed through [Chomp](https://chomp.build/) and run via the root [`chompfile.toml`](file:///home/jmh/workspace/projects/f-flat-minor/chompfile.toml).

### Regenerating All Benchmarks
To run the full suite and export all markdown files at once:
```bash
mise exec -- chomp bench
```

### Regenerating Specific Targets
You can execute individual benchmark targets using Chomp:
```bash
# Regenerate native benchmarks (exports to native.md)
mise exec -- chomp bench:native

# Regenerate run benchmarks (exports to run.md)
mise exec -- chomp bench:run

# Regenerate execute benchmarks (exports to execute.md)
mise exec -- chomp bench:execute

# Regenerate compile benchmarks (exports to compile.md)
mise exec -- chomp bench:compile

# Regenerate preprocess benchmarks (exports to preprocess.md)
mise exec -- chomp bench:preprocess
```

### Custom Benchmark Inputs
All unified runner benchmarks (`run`, `execute`, `compile`, and `preprocess`) are parameterized. You can benchmark custom input files by appending the path as a chomp parameter (Note: these do not overwrite the default markdown files):
```bash
# Run source benchmarks on a specific file
mise exec -- chomp bench:run:ff/hello.ffp

# Run bytecode execute benchmarks on a specific bytecode file
mise exec -- chomp bench:execute:ff/example.ffb

# Run compile benchmarks on a specific source file
mise exec -- chomp bench:compile:ff/hello.ffp
```
