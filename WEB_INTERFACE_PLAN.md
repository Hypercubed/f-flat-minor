# Plan: Web Interface for f-flat-minor

## Goal
Create a browser-based interface for the f-flat-minor concatenative programming language using the AssemblyScript implementation (which has arbitrary-precision integer support).

## Engine Choice
**AssemblyScript** (`assemblyscript/assembly/vm.ts`) - has bigint support via MpZ, compiles to WASM, full F♭m vocabulary.

---

## Phase 1: Compile AssemblyScript to Browser WASM

### 1.1 Create browser build configuration
- Create `assemblyscript/web/asconfig.json` or modify existing build to output browser-compatible WASM
- Ensure the output exports `PUSH`, `CALL`, `reset`, `dump`, `getError`, `clearError` functions
- Verify WASM works with `WebAssembly.instantiate`

### 1.2 Test the compiled WASM
- Build: `npm run build` or similar
- Verify output file exists in `build/` directory

---

## Phase 2: Create Tokenizer in JavaScript

### 2.1 Create `web/tokenizer.js`
Port the tokenizer from `python/execute.py` (lines 233-261) to JavaScript:
- `unescape(text)` - handle `\n`, `\s` escapes
- `number(text)` - parse integers (hex, binary, octal, decimal, scientific)
- `token(s)` - classify as number or word
- `tokenize(text)` - split on whitespace, map to tokens

### 2.2 Test tokenizer
- Verify `"100 fact ."` → `[100, "fact", "."]`
- Verify `"0xFF"` → `255`

---

## Phase 3: Build Token-to-Bytecode Encoder

### 3.1 Create `web/encoder.js`
The VM expects bytecode: each instruction is a pair `[value, operation]` where operation is:
- `0` = PUSH (push value to stack)
- `1` = CALL (call operation)

Build symbol table mapping words to opcodes:
- From `assemblyscript/assembly/consts.ts` get opcode values
- System ops: `NOP=0, CALL=1, PUTC=2, PUTN=5, DROP=8, DUP=33, DEPTH=35, SWAP=36, MUL=42, ADD=43, SUB=45, DUMP=46, DIV=47, MARK=58, DEF=59, LT=60, EQ=61, GT=62, WHEN=63, BRA=91, KET=93, POW=94`

### 3.2 Implement encoder
- Parse tokens sequentially
- Numbers → `[value, 0]` (PUSH)
- Words → lookup opcode, emit `[opcode, 1]` (CALL)
- Track user definitions (`:`, `;`, `[`, `]`) to assign codes

---

## Phase 4: Create Web Interface

### 4.1 Create `web/index.html`
```html
<!DOCTYPE html>
<html>
<head>
  <title>f-flat-minor</title>
  <style>
    /* minimal styling */
  </style>
</head>
<body>
  <h1>f-flat-minor</h1>
  <textarea id="code" placeholder="Enter f-flat-minor code..."></textarea>
  <button id="run">Run</button>
  <pre id="output"></pre>
  <script type="module" src="main.js"></script>
</body>
</html>
```

### 4.2 Create `web/main.js`
- Load WASM module
- Initialize VM with `reset()`
- On Run click:
  1. Get code from textarea
  2. Tokenize with `tokenize()`
  3. Encode to bytecode with `encode()`
  4. Execute by iterating bytecode, calling `PUSH()` and `CALL()`
  5. Capture output (replace `process.stdout.write` in VM with string builder)
  6. Display result in output element

### 4.3 Handle I/O
The AS VM uses `process.stdout.write`. For browser:
- Option A: Modify AS source to use callback for output
- Option B: Capture writes via custom stream (if using Node-compatible build)
- Option C: Return output as string from VM (best approach)

Recommended: Modify `vm.ts` to collect output in a string buffer that can be retrieved after execution.

---

## Phase 5: Test and Refine

### 5.1 Test programs
```forth
/* Test 1: Basic arithmetic */
6 7 dup * - .
/* Expected: [-43] */

/* Test 2: Factorial */
[(fact)] : dup 1 - fact * ;
[fact] : dup 1 - [(fact)] ? ;
100 fact .
/* Expected: [93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000] */

/* Test 3: String output */
"Hello" putc putc putc putc putc
/* Expected: Hello */
```

### 5.2 Fix issues
- Handle errors (stack underflow, undefined words)
- Add error display in UI

---

## Files to Create/Modify

```
assemblyscript/
├── web/
│   ├── index.html      # NEW
│   ├── main.js         # NEW - UI logic
│   ├── tokenizer.js    # NEW - port from Python
│   ├── encoder.js      # NEW - token to bytecode
│   ├── asconfig.json   # NEW or MODIFY - browser build config
│   └── build/
│       └── index.wasm  # OUTPUT - compiled engine
└── assembly/
    └── vm.ts           # MODIFY - add output capture
```

---

## Effort Summary

| Phase | Hours |
|-------|-------|
| Phase 1: Compile WASM | 0.5 |
| Phase 2: Tokenizer | 1.0 |
| Phase 3: Encoder | 1.5 |
| Phase 4: Web UI | 1.5 |
| Phase 5: Testing | 1.0 |
| **Total** | **5.5 hours** |

---

## Notes

- The AS implementation uses `MpZ` for arbitrary precision integers
- Output capture requires modifying `vm.ts` to accumulate strings instead of writing to stdout
- Consider adding example programs dropdown for quick testing
