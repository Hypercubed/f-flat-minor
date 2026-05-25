# C++ Implementation of f-flat-minor

This directory contains the core C++ implementation of the minimal stack-oriented f-flat-minor (F♭m) programming language. 

The implementation features an arbitrary-precision virtual machine (VM) and interpreter designed for extreme speed and cross-platform portability.

## Features & Architecture

* **Pure Header-Only arbitrary precision:** Utilizing `boost::multiprecision::cpp_int` to compute large integers natively in C++ without relying on external compiled libraries like GNU Multiple Precision Arithmetic Library (`libgmp`).
* **Small-Value Optimization (SVO):** Avoids dynamic memory heap allocation overhead for typical integer ranges, yielding significant performance gains over traditional wrappers.
* **Actually Portable Executable (APE) Support:** Built with the **Cosmopolitan** compiler toolchain (`cosmoc++`) to generate a single universal binary that runs natively on Linux, Windows, macOS, FreeBSD, and OpenBSD.
* **Bytecode Execution:** Full support for decoding and running compiled VLQ-encoded bytecode payload files (`.ffb`).

---

## Directory Structure

* [ff.h](ff.h): Main header containing VM state definitions, opcodes, core execution signatures, and `cpp_int` type aliases.
* [ff.cpp](ff.cpp): Core Virtual Machine execution loop, opcode dispatcher, scientific parsing, and base-independent arbitrary base numeric parsers (base 2, 8, 10, 16).
* [run.cpp](run.cpp): Source compiler and interpreter entry point. Researches and builds parse-time symbols, then launches the VM.
* [execute.cpp](execute.cpp): Bytecode compiler executor. Reads, decodes, and runs VLQ payload files directly. Supports stdin pipe and embedded/self-executing binaries.
* [fact.cpp](fact.cpp): Standalone factorial math library validation file.
* [chompfile.toml](chompfile.toml): Build system file managing clean, test, benchmark, and release tasks.

---

## Getting Started

### Prerequisites
The build system relies on **`mise`** and **`chomp`** to automatically resolve toolchains and build tasks.

1. Bootstrapping dependencies:
   ```bash
   mise install
   ```
   This will automatically download and install `bun`, `node`, `deno`, and the **Cosmopolitan C++ Toolchain** (`http:cosmocc`) version `4.0.2` into your global `mise` workspace cache.

---

## Build Commands

We maintain a dual-target build system to balance local development constraints under WSL/Sandbox environments with production portability requirements:

### 1. Development Build & Tests (Assimilated)
By default, the standard compiler rules use `cosmoc++` and immediately run **`assimilate`** to convert the output binaries into native Linux ELF executables. This ensures that the local test suites and debuggers run natively out of the box in WSL environments without format intercepts:
```bash
# Clean the previous build targets
mise exec -- chomp clean

# Build and run the entire C++ test suite
mise exec -- chomp test
```
This builds `./build/run` and `./build/execute` as native ELF binaries and executes 75 integration and preprocessor tests.

### 2. Universal Production Release (APE)
To compile a universal portable binary that you can distribute to other platforms (such as running natively on Windows or macOS), compile using the `release` target. This builds the raw polyglot binaries **without** running the assimilation step:
```bash
mise exec -- chomp release
```
This generates the following files in the `./build/` directory:
* `run.com` (universal VM interpreter)
* `execute.com` (universal bytecode VM executor)
* `fact.com` (universal math benchmark binary)

---

## Execution Examples

### Running on Linux
To run a source file directly using the compiled VM interpreter:
```bash
./build/run ../ff/example.ff
```

### Running on Windows
Copy the compiled **`run.com`** directly to your Windows system. Inside PowerShell or Command Prompt, run it natively as a 64-bit console application:
```powershell
.\run.com ..\ff\example.ff
```

---

## Self-Executing APE Binaries (Bytecode Embedding)

f-flat-minor supports packaging your compiled programs directly inside the executable itself. This generates a single, self-contained, self-executing binary that runs natively on Windows, Linux, and macOS without needing external `.ff` or `.ffb` source files.

### How it works:
1. **The Executor Binary:** The compiler executor (`execute.cpp` / `execute.com`) has a built-in fallback mode. If no source files or input pipelines are provided, it automatically opens its own binary file, scans backwards for the magic bytecode header `FbAbbCb`, and extracts and executes the trailing payload.
2. **Concatenation:** Because APE executables are robust to trailing overlay data, you can simply append any compiled `.ffb` bytecode directly to the end of the compiled executor!

### Step-by-Step Guide:

1. **Compile the bytecode payload:**
   Using the compiler script (runs the preprocessor and compiler), generate the `.ffb` bytecode from your source `.ff` or `.ffp` file:
   ```bash
   ./shell/ff compile ../ff/example.ff > ../ff/example.ffb
   ```
   This generates `../ff/example.ffb`.

2. **Generate the Universal Executor (`execute.com`):**
   Run the release build to compile the unassimilated portable executor:
   ```bash
   mise exec -- chomp release:execute
   ```
   This generates `./build/execute.com`.

3. **Concatenate the Bytecode Payload:**
   Copy the executor and append the compiled `.ffb` bytecode directly to its end:
   ```bash
   # Copy the base executor to your new target name
   cp ./build/execute.com ./build/my_app.com
   
   # Append the compiled ffb bytecode to the tail of the copy
   cat ../ff/example.ffb >> ./build/my_app.com
   ```

4. **Run anywhere:**
   The resulting **`my_app.com`** is now a fully self-executing standalone program! 
   * On Linux/macOS: Run it directly (e.g., `./build/my_app.com`).
   * On Windows: Copy it over and execute it directly in PowerShell or cmd (e.g., `.\my_app.com`).

---

## Benchmarks

A quick performance benchmark on `example.ff` (arbitrary factorial computations) highlights the speed gains of this header-only architecture compared to the legacy GMP-linked C wrapper:

| Binary / Toolchain            | Code Base / Backend     | Mean Execution Time | Performance         |
| :---------------------------- | :---------------------- | :------------------ | :------------------ |
| **Cosmopolitan (`cosmoc++`)** | `cpp_int` (Header-only) | **788.7 µs**        | **1.00x** (Fastest) |
| **GNU GCC (`g++`)**           | `cpp_int` (Header-only) | **959.6 µs**        | **1.22x slower**    |
| **GNU GCC (`g++`)**           | `mpz_int` (GMP-linked)  | **1.2 ms**          | **1.52x slower**    |
