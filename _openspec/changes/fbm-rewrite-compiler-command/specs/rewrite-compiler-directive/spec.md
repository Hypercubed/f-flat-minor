## ADDED Requirements - PHASE A (JSON-Configured TS Optimizer)

### Requirement: Declarative JSON Rule Source (Phase A)
The Deno/TypeScript compiler optimizer SHALL support loading its optimization rules dynamically from a declarative JSON file (`rules.json`). Hardcoded array structures in `optimizer.ts` SHALL be replaced with this configuration-driven architecture.

#### Scenario: Loading rules from JSON file
- **WHEN** the compiler optimizer initializes
- **THEN** it loads the declarative rules from `rules.json` and parses them into internal matcher structures

### Requirement: JSON Rule Schema & Examples (Phase A)
The `rules.json` schema SHALL support specifying an array of rule objects, where each rule contains:
- `name`: A string identifier for the rule.
- `pattern`: A space-separated string representing a pure F♭m sequence to match (standard F♭m source words, literal values, or positional wildcards starting with `$` like `$0`, `$1`).
- `replacement`: A space-separated string representing standard F♭m stack-code to execute for generating the folded IR.
- `guards` (optional): An array of space-separated strings, each representing an F♭m guard quotation to execute sequentially for validating conditional constraints.

#### Sub-Requirement: Positional Wildcards (Phase A)
Wildcards within the Phase A `rules.json` file SHALL be represented using positional backreferences starting with `$` (e.g., `$0` for the first matched wildcard in the pattern sequence, `$1` for the second, etc.).

#### Sub-Requirement: Standard F♭m Token Mapping
Both the pattern and replacement strings in `rules.json` SHALL use standard F♭m source word names (e.g. `+`, `*`, `swap`, `dup`, `eval`, `,`) rather than internal compiler opcode identifiers (e.g. `ADD`, `MUL`, `SWAP`, `DUP`, `CALL`, `CONS`), maintaining complete alignment with F♭m source syntax.

#### Sub-Requirement: JSON Schema Structure Examples
The JSON rule file SHALL follow the structures in the following examples:

**Example 1: Constant Folding (Arithmetic)**
```json
{
  "name": "Constant Folding - a b ADD",
  "pattern": "$0 $1 +",
  "replacement": "$0 $1 +"
}
```

**Example 2: Algebraic Simplification (No-Op Removal)**
```json
{
  "name": "Algebraic Simplification - 0 ADD",
  "pattern": "0 +",
  "replacement": ""
}
```

**Example 3: Conditional Strength Reduction (Separate Guard & Quotation Construction)**
To produce delayed/non-evaluated output IR instructions (like `<<` in a shift strength reduction), the replacement quotation SHALL build and return a quotation using standard F♭m list-building primitives (e.g. `,` / `cons`):
```json
{
  "name": "Strength Reduction - Power of 2 MUL -> SHIFTL",
  "pattern": "$0 *",
  "guards": [
    "$0 dup dup 1 - & 0 = swap 0 > &"
  ],
  "replacement": "$0 log2 [ << ] ,"
}
```

### Requirement: VM-Assisted F♭m Guard & Replacement Evaluation (Phase A)
The optimizer SHALL scan the compiler's instruction stream and perform pattern matching against the loaded JSON rules. When a match is found, it SHALL:
1. Bind positional wildcards to their matched literal values in a linear array.
2. If `guards` are specified, substitute wildcards into each guard sequence, execute each sequentially on an isolated compile-time VM (`Engine`), and only commit the match if all guards return a non-zero (true) value.
3. Substitute wildcards into the `replacement` sequence, execute the F♭m quotation on the VM, and harvest the resulting stack values as the folded output IR.

#### Scenario: Successful conditional match and fold in the JSON optimizer
- **WHEN** the loaded rule is:
  - `name: "Constant Folding - a b DIV"`
  - `pattern: "$0 $1 /"`
  - `guards": [ "$1 0 !=" ]`
  - `replacement: "$0 $1 /"`
- **AND** the stream contains `[ 42 10 / ]`
- **THEN** the optimizer binds `$0 = 42`, `$1 = 10`, executes guard `[ 10 0 != ]` resulting in `1` (true), executes replacement `[ 42 10 / ]` on the VM, and replaces the matched stream with `[ 4 ]`


## ADDED Requirements - PHASE B (Basic Rewrite Rules)

### Requirement: .rewrite Directive Syntax (Phase B)
The compiler SHALL support the `.rewrite` compiler directive at compile-time. A `.rewrite` line SHALL be followed by exactly two space-separated, bracket-enclosed quotations:
1. A **Pattern** quotation (defining the structural IR sequence to match).
2. A **Replacement** quotation (defining the code generation logic).

#### Scenario: Parsing a valid basic rewrite rule
- **WHEN** the compiler encounters `.rewrite [ ?a 0 + ] [ ?a ]`
- **THEN** it registers a basic rewrite rule with the respective pattern and replacement quotations

### Requirement: Wildcard Variable Binding (Phase B)
The compiler SHALL treat symbols within a `.rewrite` pattern quotation that begin with a question mark (`?`) as a wildcard pattern variable (e.g. `?a`, `?b`). Wildcard variables SHALL dynamically match and bind any numeric literal or symbol from the matched instruction stream.

#### Scenario: Successful wildcard binding
- **WHEN** the pattern `[ ?a 0 + ]` is matched against the instruction stream `[ 42 0 + ]`
- **THEN** the wildcard `?a` is successfully bound to the literal value `42` in the rule evaluation context

### Requirement: VM-Assisted Replacement Evaluation & Shared Scope (Phase B)
The compiler SHALL evaluate the replacement quotation of a matched rule by executing the replacement inside a temporary, isolated instance of the f-flat-minor Virtual Machine. To enable the execution of user-land library words at compile-time, the compiler SHALL share its active symbol definition dictionary (`defs` map) with the compile-time VM instance.

#### Scenario: Executing a basic rewrite replacement
- **WHEN** a match completes with `?a = 42` and the replacement quotation is `[ ?a ]`
- **THEN** the VM executes with the shared `defs` dictionary loaded, returning the literal `42` as the folded output instruction


## ADDED Requirements - PHASE C (Conditional Guards - Deferred)

### Requirement: 3-Quotation Guard Syntax (Phase C)
The compiler SHALL support an optional third space-separated, bracket-enclosed **Guard** quotation on a `.rewrite` line (defining compile-time boolean constraints): `.rewrite [pattern] [replacement] [guard]`.

#### Scenario: Parsing a valid conditional rewrite rule
- **WHEN** the compiler encounters `.rewrite [ ?a ?b * ] [ ?a ?b log2 [ << ] cons cons ] [ ?b dup dup 1 - & 0 = swap 0 > & ]`
- **THEN** it successfully parses and registers a conditional rewrite rule with the respective pattern, replacement, and guard quotations

### Requirement: Guard Evaluation (Phase C)
If a guard quotation is provided, the compiler SHALL evaluate it inside the compile-time VM with all bound wildcard variables pushed onto the VM stack prior to execution. The rewrite SHALL only be applied if the guard evaluates to a non-zero (true) value.

#### Scenario: Successful wildcard binding and guard execution
- **WHEN** the pattern `[ ?a ?b * ]` and guard `[ ?b dup dup 1 - & 0 = swap 0 > & ]` are matched against the stream `[ 5 8 * ]`
- **THEN** wildcard variables are bound (`?a = 5`, `?b = 8`), and executing the guard on the VM with stack `[ 8 ]` returns `1` (true), committing the match
