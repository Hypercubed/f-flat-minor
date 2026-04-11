# F♭m Standard Library

This directory contains the shared library files used by the F♭m examples, tests, and playground. The layout is smaller and flatter than an idealized layered module tree: today there is one plain core file, a handful of top-level entry points, and a `math/` subdirectory that is split into several implementation files.

## Current Structure

```text
lib/
├── core/
│   └── core.ff             -- core derived words built on VM primitives
├── math/
│   ├── math.ffp            -- main math entry point
│   ├── precision.ffp       -- shared variable-precision math helpers
│   ├── pred.ffp            -- sign and divisibility predicates
│   ├── arith.ffp           -- abs, sgn, sqr, min/max, clamp, divrem
│   ├── num.ffp             -- factorial, combinations, Knuth operators
│   ├── atan.ffp            -- arctangent helpers
│   ├── sqrt.ffp            -- integer square root words
│   ├── cbrt.ffp            -- integer cube root words
│   ├── gcd.ffp             -- gcd and lcm
│   ├── ack.ffp             -- Ackermann function
│   ├── primes.ffp          -- primality and next-prime helpers
│   ├── primes-encoded.ff   -- prime lookup table data used by primes.ffp
│   └── encode-primes.ffp   -- utility to regenerate primes-encoded.ff
├── seq/
│   └── seq.ffp             -- sequence and quotation helpers
├── string/
│   └── string.ffp          -- character and string helpers
├── prelude.ffp             -- loads the main library modules
└── testing.ffp             -- testing helpers used by ff/tests/*
```

## Entry Points

- `core/core.ff` is the foundational library layer. Other library files import it directly.
- `math/math.ffp` is the main math entry point. It is now an import-only index file and loads the math definition files listed above, except `encode-primes.ffp`.
- `seq/seq.ffp` and `string/string.ffp` are currently single-file modules rather than directories of submodules.
- `prelude.ffp` loads the usual working set: `core`, `math`, `string`, and `seq`.
- `testing.ffp` loads `core` and `string`, then defines assertions and a few testing utilities.

## Loading

Library files are loaded with the `.import` preprocessor directive.

From a file in `ff/`, typical imports look like this:

```forth
.import <prelude>
.import ./lib/math/math.ffp
.import ./lib/string/string.ffp
.import ./lib/testing.ffp
```

From within `ff/lib/`, the library files use relative imports such as:

```forth
.import ../core/core.ff
.import ./math.ffp
.import ./primes-encoded.ff
```

Directory loading is not implemented yet, so `.import ./lib/math` does not currently resolve to `./lib/math/math.ffp`. Always import the concrete file you want.

## Dependency Notes

- `prelude.ffp` imports:
  - `./core/core.ff`
  - `./math/math.ffp`
  - `./string/string.ffp`
  - `./seq/seq.ffp`
- `string/string.ffp` depends only on `core/core.ff`.
- `seq/seq.ffp` depends only on `core/core.ff`.
- `math/pred.ffp` depends on `core/core.ff`.
- `math/arith.ffp` depends on `math/pred.ffp`.
- `math/num.ffp` depends on `core/core.ff`.
- `math/math.ffp` is an import-only index over the math definition files and the math subfiles.
- `math/primes.ffp` additionally loads `math/primes-encoded.ff`.
- `math/encode-primes.ffp` is a maintenance utility for rebuilding the encoded-prime data file; it is not loaded by `prelude.ffp` or `math/math.ffp`.

Direct math subfile imports are intentionally kept working. Files such as `atan.ffp`, `cbrt.ffp`, `ack.ffp`, and `primes.ffp` now import the smaller definition files they actually need instead of depending on `math/math.ffp` as a combined definitions-and-index file.

## Conventions

- Words returning booleans generally end in `?`.
- `.ffp` files use the preprocessor and can `.import` other files.
- `.ff` files are plain source files; for example, `core/core.ff` and `math/primes-encoded.ff`.
- The current library structure is still evolving. If this README and the on-disk layout disagree, treat the on-disk files as authoritative and update this document.
