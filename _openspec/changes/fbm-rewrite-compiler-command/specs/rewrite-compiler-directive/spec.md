## ADDED Requirements - PHASE A (Basic Rewrite Rules)

### Requirement: .rewrite Directive Syntax (Phase A)
The compiler SHALL support the `.rewrite` compiler directive at compile-time. A `.rewrite` line SHALL be followed by exactly two space-separated, bracket-enclosed quotations:
1. A **Pattern** quotation (defining the structural IR sequence to match).
2. A **Replacement** quotation (defining the code generation logic).

#### Scenario: Parsing a valid basic rewrite rule
- **WHEN** the compiler encounters `.rewrite [ _a 0 + ] [ _a ]`
- **THEN** it registers a basic rewrite rule with the respective pattern and replacement quotations

### Requirement: Wildcard Variable Binding (Phase A)
The compiler SHALL treat any symbol within a `.rewrite` pattern quotation that begins with an underscore (`_`) as a wildcard pattern variable (e.g. `_a`, `_b`). Wildcard variables SHALL dynamically match and bind any numeric literal or symbol from the matched instruction stream.

#### Scenario: Successful wildcard binding
- **WHEN** the pattern `[ _a 0 + ]` is matched against the instruction stream `[ 42 0 + ]`
- **THEN** the wildcard `_a` is successfully bound to the literal value `42` in the rule evaluation context

### Requirement: VM-Assisted Replacement Evaluation & Shared Scope (Phase A)
The compiler SHALL evaluate the replacement quotation of a matched rule by executing the replacement inside a temporary, isolated instance of the f-flat-minor Virtual Machine. To enable the execution of user-land library words at compile-time, the compiler SHALL share its active symbol definition dictionary (`defs` map) with the compile-time VM instance.

#### Scenario: Executing a basic rewrite replacement
- **WHEN** a match completes with `_a = 42` and the replacement quotation is `[ _a ]`
- **THEN** the VM executes with the shared `defs` dictionary loaded, returning the literal `42` as the folded output instruction


## ADDED Requirements - PHASE B (Conditional Guards - Deferred)

### Requirement: 3-Quotation Guard Syntax (Phase B)
The compiler SHALL support an optional third space-separated, bracket-enclosed **Guard** quotation on a `.rewrite` line (defining compile-time boolean constraints): `.rewrite [pattern] [replacement] [guard]`.

#### Scenario: Parsing a valid conditional rewrite rule
- **WHEN** the compiler encounters `.rewrite [ _a _b * ] [ _a _b log2 [ << ] cons cons ] [ _b dup dup 1 - & 0 = swap 0 > & ]`
- **THEN** it successfully parses and registers a conditional rewrite rule with the respective pattern, replacement, and guard quotations

### Requirement: Guard Evaluation (Phase B)
If a guard quotation is provided, the compiler SHALL evaluate it inside the compile-time VM with all bound wildcard variables pushed onto the VM stack prior to execution. The rewrite SHALL only be applied if the guard evaluates to a non-zero (true) value.

#### Scenario: Successful wildcard binding and guard execution
- **WHEN** the pattern `[ _a _b * ]` and guard `[ _b dup dup 1 - & 0 = swap 0 > & ]` are matched against the stream `[ 5 8 * ]`
- **THEN** wildcard variables are bound (`_a = 5`, `_b = 8`), and executing the guard on the VM with stack `[ 8 ]` returns `1` (true), committing the match


