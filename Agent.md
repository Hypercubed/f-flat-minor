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

### File Types
- `.ff` - Basic f-flat-minor source files
- `.ffp` - Source files requiring preprocessor (use Deno for these)
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
