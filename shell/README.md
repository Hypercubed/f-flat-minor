# F-Flat Minor Shell Helpers

This directory contains shell script helpers to simplify running, preprocessing, compiling, and executing f-flat-minor (`.ff` and `.ffp`) programs using different runtime engines, compilers, and preprocessors.

## Table of Contents

- [The Unified CLI Entry Point (`ff`)](#the-unified-cli-entry-point-ff)
- [Support Matrix](#support-matrix)
- [Shell Command Reference](#shell-command-reference)
  - [`ff run` / `ff-run.sh`](#ff-run--ff-runsh)
  - [`ff compile` / `ff-compile.sh`](#ff-compile--ff-compilesh)
  - [`ff execute` / `ff-execute.sh`](#ff-execute--ff-executesh)
  - [`ff interpret` / `ff-interpret.sh`](#ff-interpret--ff-interpretsh)
  - [`ff preprocess` / `ff-preprocess.sh`](#ff-preprocess--ff-preprocesssh)
  - [`ff pack` / `ff-pack.sh`](#ff-pack--ff-packsh)
  - [Common Utilities (`_ff-common.sh`)](#common-utilities-_ff-commonsh)
- [Troubleshooting & Environment Variables](#troubleshooting--environment-variables)

---

## The Unified CLI Entry Point (`ff`)

The [`ff`](file:///home/jmh/workspace/projects/f-flat-minor/shell/ff) script acts as a central front-end dispatch. It dynamically lists available commands by looking for any `ff-*.sh` scripts in the `shell/` directory, and forwards arguments to them.

### Usage
```bash
./shell/ff <command> [args...]
```

### Examples
Instead of executing `./shell/ff-run.sh example.ffp`, you can run:
```bash
./shell/ff run example.ffp
```

---

## Support Matrix

Different language implementations of f-flat-minor support different capabilities. Below is the support status for each engine:

| Engine | Interpreter (Runner) | Preprocessor | Compiler | Bytecode Executor | Notes / Execution Method |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **python** | Yes | No | No | No | `python3 python/execute.py` |
| **ruby** | Yes | No | No | No | `ruby ruby/execute.rb` |
| **dart** | Yes | No | No | No | `dart/bin/dart.exe` |
| **deno** | Yes | Yes | Yes | Yes | Node/Deno/Bun shared-core, compiled outputs in `deno/build/` |
| **node** | Yes | Yes | Yes | Yes | Deno/Node/Bun shared-core, utilizes `node --experimental-transform-types` |
| **bun** | **Yes** *(default)* | **Yes** *(default)* | Yes | Yes | Deno/Node/Bun shared-core (default engine for run and preprocess) |
| **go** | Yes | Yes | Yes | Yes | Executable binaries compiled in `go/build/` |
| **racket** | Yes | No | Yes | Yes | Racket compiler supports passing source from stdin or file |
| **cpp** | Yes | No | No | No | Executable binary compiled in `cpp/build/` |

---

## Shell Command Reference

### `ff run` / `ff-run.sh`

Preprocesses (if necessary or requested) and executes an f-flat-minor program.

- `.ff` source files are executed directly by the selected runner unless `--pp` is explicitly set.
- `.ffp` files (preprocessor sources) are always preprocessed first using the selected/default preprocessor, and the resulting intermediate code is then executed.

> [!NOTE]
> `ff run` and `ff preprocess` only accept physical files, not standard input (`-`). This is because macro expansion and import resolution (e.g. `%import "./other.ff"`) require a physical file path to determine relative directory locations.
>
> If you have already-preprocessed code and want to pipe it via standard input, use the low-level interpreter/executor commands:
> - `cat source.ff | ff interpret -`
> - `cat bytecode.ffb | ff execute -`

#### Usage
```bash
./shell/ff-run.sh [--quiet] [--run <runner>] [--pp <preprocessor>] <file.ff|file.ffp>
# Or via the unified entry point:
./shell/ff run [--quiet] [--run <runner>] [--pp <preprocessor>] <file.ff|file.ffp>
```

#### Flags
- `--run <runner>`: Select the execution engine (default: `bun`).
- `--pp <preprocessor>`: Select the preprocessor engine (default: `bun`).
- `--quiet`: Disables execution tracing output (sets `FF_SHELL_TRACE=0`).
- `--help` / `-h`: Display command usage details.

#### Examples
```bash
# Run with default bun runner & bun preprocessor
./shell/ff run ff/hello.ffp

# Run using the Ruby runner and Deno preprocessor
./shell/ff run --run ruby --pp deno ff/hello.ffp

# Run a plain .ff file directly with Python
./shell/ff run --run python ff/example.ff
```

---

### `ff compile` / `ff-compile.sh`

Compiles an f-flat-minor source file (or preprocessed input from stdin) into bytecode (`.ffb`), which consists of an ASCII header followed by base64 VLQ-encoded big integers. The bytecode is written to `stdout`.

- For `.ffp` files, the source is first preprocessed, and the expanded code is piped to the compiler.
- For `.ff` files, the compiler processes the file directly.
- For `-`, already-preprocessed f-flat-minor source code is read from `stdin`.

#### Usage
```bash
./shell/ff-compile.sh [--quiet] [--compiler <compiler>] [--pp <preprocessor>] <file.ff|file.ffp|->
# Or via the unified entry point:
./shell/ff compile [--quiet] [--compiler <compiler>] [--pp <preprocessor>] <file.ff|file.ffp|->
```

#### Flags
- `--compiler <compiler>` (or `--run <compiler>`): Choose the compiler engine (default: `deno`). Options: `deno`, `node`, `bun`, `go`, `racket`.
- `--pp <preprocessor>`: Choose the preprocessor engine (default: `bun`). Options: `go`, `deno`, `bun`, `node`.
- `--quiet`: Disables execution tracing output.
- `--help` / `-h`: Display command usage details.

#### Examples
```bash
# Compile a .ff file with Deno and save to bytecode
./shell/ff compile ff/example.ff > out.ffb

# Compile with Go compiler
./shell/ff compile --compiler go ff/example.ff > out.ffb

# Compile from stdin
cat preprocessed.ff | ./shell/ff compile --compiler bun - > out.ffb
```

---

### `ff execute` / `ff-execute.sh`

Executes compiled f-flat-minor bytecode (`.ffb`) directly in the VM engine. Unlike `ff run`, it does not interpret source files.

#### Usage
```bash
./shell/ff-execute.sh [--quiet] [--run <executor>] <file.ffb|->
# Or via the unified entry point:
./shell/ff execute [--quiet] [--run <executor>] <file.ffb|->
```

#### Flags
- `--run <executor>` (or `--executor <executor>`): Select the bytecode execution engine (default: `bun`). Options: `deno`, `node`, `bun`, `go`, `racket`.
- `--quiet`: Disables execution tracing output.
- `--help` / `-h`: Display command usage details.

#### Examples
```bash
# Execute prepared bytecode from stdin
cat out.ffb | ./shell/ff execute --run node -

# Direct execution of a .ffb bytecode file using Go
./shell/ff execute --run go ff/example.ffb
```

---

### `ff interpret` / `ff-interpret.sh`

Runs already-preprocessed or raw f-flat-minor source code (`.ff`) directly with a stack interpreter. Unlike `ff run`, it does not perform any preprocessor macro expansion for `.ffp` files.

#### Usage
```bash
./shell/ff-interpret.sh [--quiet] [--run <runner>] <file.ff|->
# Or via the unified entry point:
./shell/ff interpret [--quiet] [--run <runner>] <file.ff|->
```

#### Flags
- `--run <runner>`: Select the execution engine (default: `bun`). Options: `python`, `ruby`, `dart`, `deno`, `node`, `bun`, `go`, `racket`, `cpp`.
- `--quiet`: Disables execution tracing output.
- `--help` / `-h`: Display command usage details.

#### Examples
```bash
# Interpret prepared program from stdin
cat preprocessed.ff | ./shell/ff interpret --run node -

# Direct interpretation of a .ff file using Ruby
./shell/ff interpret --run ruby ff/example.ff
```

---

### `ff preprocess` / `ff-preprocess.sh`

Resolves macros, imports, and other preprocessor directives in a `.ff` or `.ffp` file, writing the fully expanded output to `stdout`.

#### Usage
```bash
./shell/ff-preprocess.sh [--quiet] [--pp <preprocessor>] <file.ff|file.ffp>
# Or via the unified entry point:
./shell/ff preprocess [--quiet] [--pp <preprocessor>] <file.ff|file.ffp>
```

#### Flags
- `--pp <preprocessor>`: Select the preprocessor engine (default: `bun`). Options: `go`, `deno`, `bun`, `node`.
- `--quiet`: Disables execution tracing output.
- `--help` / `-h`: Display command usage details.

#### Examples
```bash
# Preprocess with default Bun preprocessor
./shell/ff preprocess ff/hello.ffp > expanded.ff

# Preprocess with Deno
./shell/ff preprocess --pp deno ff/hello.ffp > expanded.ff
```

---

### `ff pack` / `ff-pack.sh`

Packs compiled f-flat-minor bytecode (`.ffb`) into a self-executing binary by prepending a configurable execution engine (defaulting to C++).

#### Usage
```bash
./shell/ff-pack.sh [--quiet] [--engine <engine>] <file.ffb|-> [output_file]
# Or via the unified entry point:
./shell/ff pack [--quiet] [--engine <engine>] <file.ffb|-> [output_file]
```

#### Flags
- `--engine <engine>` (or `--run <engine>`): The execution engine to prepend (default: `cpp`). Options: `cpp`, `go`.
- `<file.ffb|->`: The input `.ffb` bytecode file, or `-` to read bytecode from `stdin`.
- `[output_file]`: Optional path where the output self-executing binary will be saved and made executable. If not specified, the output is written to `stdout`.
- `--quiet`: Disables execution tracing output.
- `--help` / `-h`: Display command usage details.

#### Examples
```bash
# Pack a bytecode file into a self-executing binary using C++ (default)
./shell/ff pack ff/example.ffb myapp

# Pack using the Go execution engine
./shell/ff pack --engine go ff/example.ffb myapp-go

# Pack from stdin and redirect to output
cat ff/example.ffb | ./shell/ff pack - > myapp
```

---

### Common Utilities (`_ff-common.sh`)

The script [`_ff-common.sh`](file:///home/jmh/workspace/projects/f-flat-minor/shell/_ff-common.sh) is a shared library sourced by all other helper scripts in this directory. It defines:
- **`is_runner`**, **`is_preprocessor`**, **`is_compiler`**, and **`is_executor`** constraints.
- Shared path configuration (`REPO_ROOT` and `SCRIPT_DIR`).
- Command echoing and tracing logic controlled by `FF_SHELL_TRACE`.
- Common execution dispatch helpers: `ff_preprocess`, `ff_interpret`, `ff_execute`, and `ff_compile` to interface with runtime environments across Go, Deno, Node, Bun, Python, Ruby, Dart, Racket, and C++.

---

## Troubleshooting & Environment Variables

### Tracing Execution
By default, the helper scripts print the underlying commands they are executing to `stderr` (e.g. `+ exec bun ...`).
- To disable this globally, set the environment variable `FF_SHELL_TRACE=0` in your shell.
- Alternatively, pass the `--quiet` flag to any of the helper scripts to disable tracing for that invocation.
