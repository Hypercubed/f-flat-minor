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
deno run --allow-read --allow-env deno/bin/ff-run.ts <file>.ffp
```

For example:
```bash
deno run --allow-read --allow-env deno/bin/ff-run.ts ff/hello.ffp
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
The Deno implementation has been migrated to Deno 1.46.3. The original code used Deno 1.12.0.

### Running Deno Code

The recommended command to run `.ffp` files:
```bash
cd deno
deno run --no-check --allow-read --allow-env --allow-hrtime bin/ff-run.ts <file>.ffp
```

Key flags:
- `--no-check` - Skip TypeScript type checking (faster startup)
- `--allow-read` - Required to read source files
- `--allow-env` - Required for environment variables
- `--allow-hrtime` - Required for high-resolution timing (used in benchmarks)

### Known Issues / Future Work

1. **Deno 2.x Migration**: The code needs further updates for Deno 2.x:
   - Remove `--allow-hrtime` flag (deprecated in Deno 2)
   - Remove `allowJs` from `deno/deno.json` compilerOptions
   - May need to update `Deno.stdin.readSync` to async version in `deno/src/read.ts`

2. **ff-repl.ts**: The REPL has a custom `readLines` implementation since `std/io/read_lines` was removed from std library

3. **Positional Arguments**: When using `std/cli/parseArgs`, positional arguments are stored in `argv._` array, not in the named parameter. Code like this is needed:
   ```typescript
   if (argv._ && argv._.length > 0 && typeof argv._[0] === "string") {
     argv.file = argv._[0] as string;
   }
   ```
