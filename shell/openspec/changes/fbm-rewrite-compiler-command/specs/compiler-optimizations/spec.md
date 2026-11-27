## ADDED Requirements

### Requirement: The Optimization Pipeline
The compiler SHALL execute a multi-pass optimization pipeline during compilation. This pipeline SHALL iteratively apply peephole optimization, definition extraction, automatic inlining, and dynamic rewrite rules until the instruction stream size stabilizes or a maximum limit of 20 passes is reached.

#### Scenario: Running the optimization pipeline
- **WHEN** a compiled program containing `.rewrite` rules is optimized
- **THEN** the compiler applies the rewrite rules repeatedly over multiple passes until no further instruction shrinkage occurs

### Requirement: Soundness Constraints on Shift Strength Reduction
The compiler SHALL enforce strict algebraic correctness constraints during strength reduction optimization passes. Modulo `%` or division `/` by a power of two MUST NOT be converted to bitwise shifts or AND operations unless sign analysis can prove the dividend is non-negative.

#### Scenario: Correct division semantics
- **WHEN** the compiler optimizes the code `-1 2 /`
- **THEN** it keeps the division intact to evaluate to `-1` instead of flooring to `-1 >> 1 == -1`, preserving standard F♭m truncating division semantics

### Requirement: Definition-Level Pre-Inlining Optimization
To prevent automatic inlining from prematurely expanding high-level subroutine calls and destroying match patterns (the phase-ordering conflict), the compiler SHALL execute a complete rewrite and optimization pass directly on each independent subroutine definition (inside the symbol definition map) prior to executing any automatic subroutine inlining.

#### Scenario: Pre-inlining optimization of nested user-land calls
- **WHEN** the compiler has loaded a definition `[ 5 sq 1 + ] foo: ;` and a rewrite rule `.rewrite [ _a sq ] [ _a _a * ]`
- **THEN** it optimizes the definition of `foo` first, folding the nested `sq` call to `25 1 +` (and eventually `26`) before inlining `foo` into any other code block

