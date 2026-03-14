# Agent Guide

## Project Overview

f-flat-minor (F♭m) is a minimal stack-oriented programming language. It features:
- Only one data type: big integers
- Stack-based execution model
- Compiles to "bytecode" (base64 VLQ encoded big integers)
- Multiple implementations in different languages (Deno/TypeScript, Go, Python, Ruby, etc.)

## Running Code

The simplest way to run f-flat-minor code is using the Python interpreter:

```bash
cat <file>.ff | python3 python/execute.py
```

For example, to run the factorial example:
```bash
cat ff/example_v0.ff | python3 python/execute.py
```

### Running .ffp Files (with preprocessor)

The Python interpreter doesn't support `.ffp` files (which require preprocessing). Use Deno instead:

```bash
cd deno
deno task run <file>.ffp
```

For example:
```bash
cd deno
deno task run ../ff/hello.ffp
```

### Using deno task Commands

The project includes several npm-like scripts defined in `deno/deno.json`:

```bash
cd deno
deno task run <file.ffp>   # Run a source file (preprocesses + executes)
deno task compile <file.ffp> # Compile to bytecode
deno task execute <file.ffb> # Execute compiled bytecode
deno task preprocess <file.ffp> # Only preprocess (show macros expanded)
deno task repl              # Start interactive REPL
```

### File Types
- `.ff` - Basic f-flat-minor source files (works with Python or Deno)
- `.ffp` - Source files requiring preprocessor (use Deno)
- `.ffb` - Compiled bytecode files

### Other Implementations
- **Deno/TypeScript**: Most complete implementation with preprocessor support
- **Go**: Full implementation with compiler
- **Ruby**: Basic interpreter
- **Racket**: Full implementation

To use other implementations, install the respective runtime and use the `chomp` build tool:
```bash
chomp build   # Build all projects
chomp test    # Run tests
```

## Deno Implementation Notes

### Current Version
The Deno implementation has been migrated to Deno 2.x (latest stable). The original code used Deno 1.12.0.

### Running Deno Code

The recommended command to run `.ffp` files:
```bash
cd deno
deno run --no-check --allow-read --allow-env bin/ff-run.ts <file>.ffp
```

Key flags:
- `--no-check` - Skip TypeScript type checking (faster startup)
- `--allow-read` - Required to read source files
- `--allow-env` - Required for environment variables
- Note: `--allow-hrtime` is no longer needed (deprecated in Deno 2)
