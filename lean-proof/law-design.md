# Law design (DRAFT — not solid yet, for review)

A **law** is a standalone theorem about a word *sequence* — not a
single word's effect. It states that running a sequence on an input
stack produces an output stack. It is the generated form of the
hand-written peephole rules in `Swap.lean` (`dup_drop`,
`swap_swap`).

Status: draft, Nov 20, 2026. The name ("law") and the order
(input, sequence, `:->`, output) are decided. The parsing details
are not solid yet — see Open questions.

**Update (Nov 20 evening): the input/sequence split is the
blocker, and it is the same ambiguity for `@law` and for the
`@effect` unification.** `:->` fixes the *separator* (it is
unambiguous — not a F♭m word, not a Lean token), but it does not
fix the *split*. In `a b dup`, `:->` tells you where the left
side ends, but not where the input ends and the sequence begins:
`b` could be a value (push `b`) or a word (call `b`), and the
"maximal suffix of known words" rule just pushes the question to
"is `b` a known word?" — which depends on what is defined in the
file, so defining a word named `b` later would silently re-parse
every `a b dup`. The `word:` prefix was the thing that fixed
this for effects, by pinning the word outside the effect. Any
unified `:->` form (effect = law) needs an equivalent fix for
the split, or effects and laws stay separate notations. See Open
question 1.

## Syntax (proposed)

```
/* @law <input> <sequence> :-> <output> */
```

- `<input>` — a stack: F♭m values, space-separated, top rightmost
  (same as the left side of an `@effect`).
- `<sequence>` — F♭m words, space-separated. Primitives and defined
  words (defined words would be inlined, as `@effect` does).
- `:->` — the separator. An arrow, "maps to". Distinct from `:` (the
  F♭M definition marker), from `==` (the effect split in `@effect`),
  and from `::` (see Collisions).
- `<output>` — either a direct stack (F♭m values) or a Lean
  expression for a single computed value (see Sides).

Examples (the two the user gave):

```
/* @law A dup drop :-> A */
/* @law A 0 + :-> A */
```

The second example's sequence is `0 +` — push the literal `0`,
then `+`. Its program is `[Tok.push 0, Tok.add]`.

A Lean-expression output (the user's `a^b+c` question, corrected
for stack order — see Sides):

```
/* @law A B C ^ + :-> A + B^C */
```

## Sides: F♭m or Lean?

The two sides are **not** the same kind of thing.

- **Left side is F♭m.** The input is a stack and the sequence is
  F♭m words. That is what the interpreter runs.
- **Right side is F♭m by default, but it can be a Lean
  expression.** A direct stack (`a`) is the plain form. A Lean
  expression (`a + b^c`) is the computed-value form — the same split
  as `@effect`, where a direct output is a stack and an `ensures`
  clause carries Lean expressions. A Lean-expression output means
  the output stack is the single value it denotes.

Stack order matters for the expression. `a b c ^ +` does **not**
give `a^b + c`. `^` pops the top two (`b` base, `c` exponent) and
pushes `b^c`, leaving `a (b^c)`; `+` then gives `a + (b^c)`. So
the law is `a b c ^ + :-> a + b^c`, not `a b c ^ + :-> a^b + c`.
The right side has to match what the sequence actually computes —
that is the whole point of the law.

## Semantics

A law claims:

```
run <prog> <in_stack> [] [] = Outcome.ok <out_stack> [] []
```

where `<prog>` is the sequence's tokens, `<in_stack>` is the input
stack (top first, as a `List Int`), and `<out_stack>` is the output
stack — either the direct stack, or a single-element list
containing the Lean expression's value.

## What the generator would emit (verified by hand)

Both examples below were checked by hand against `preamble.lean`
(Lean 4.22.0, VM, Nov 20, 2026) and prove with the standard ladder
(`first | rfl | (simp [run, exec, step, ...]; try omega)`).

**Law 1** — `a dup drop :-> a`:

```lean
theorem law_dup_drop (a : Int) (rest : Stack) :
    run [Tok.dup, Tok.drop] (a :: rest) [] [] = Outcome.ok (a :: rest) [] [] := by
  first | rfl | (simp [run, exec, step]; try omega)
```

Proves. This is the `dup_drop` peephole rule from `Swap.lean`,
generated instead of hand-written.

**Law 2** — `a 0 + :-> a` (the user's second example):

```lean
theorem law_add_zero (a : Int) (rest : Stack) :
    run [Tok.push 0, Tok.add] (a :: rest) [] [] = Outcome.ok (a :: rest) [] [] := by
  first | rfl | (simp [run, exec, step]; try omega)
```

Proves. No precondition needed — `+` never errors.

**Law 3** — `a b c ^ + :-> a + b^c` (Lean-expression output):

```lean
theorem law_pow_add_req (a b c : Int) (hc : 0 ≤ c) (rest : Stack) :
    run [Tok.pow, Tok.add] (c :: b :: a :: rest) [] [] =
      Outcome.ok ((a + pow b c) :: rest) [] [] := by
  have hguard : ¬ (c < 0) := by omega
  first | rfl | (simp [run, exec, step, pow, hguard]; try omega)
```

Proves — **but only with the precondition `0 ≤ c`**. Without it,
the law is false: `^` errors on a negative exponent, so for
`c < 0` the sequence gives `Outcome.err`, not `ok`. The plain
`a b c ^ + :-> a + b^c` (no precondition) does **not** prove, and
should not — the generator must reject it or require the guard.
The `hguard` pattern is the same one the generator already uses
for guarded primitives (`%`, `/`, `^`): a `have hguard : ¬ (guard)`
proved by `omega`, passed to `simp`.

Consequence: **laws need a `requires` clause**, the same
precondition mechanism as `@effect`. Placement undecided — the
natural form is after the output, as in `@effect`
(`a b c ^ + :-> a + b^c requires 0 <= c`).

## Prior art: Bend's `law`

Bend is the source of the name. Bend writes (verified from
`bend2.dev` and the Bend repo, Nov 20, 2026):

```
law add_zero:
  for x: Nat
  {Nat.add(X, 0N) == X : Nat}
```

"For every nat x, x + 0 equals x" — the user's second example,
in Bend form. A same-named `def` supplies the proof; a law with
no `def` is an open claim. Differences from ours: Bend names its
laws (`add_zero`, `cancel_idempotent`) with a single `:` after the
name, and Bend's laws are about expressions, not stack effects.
Ours are anonymous (the sequence is the subject) and about a
word sequence running on a stack.

## Collisions

- **`::` (earlier idea, set aside).** `::` appears nowhere in the
  F♭m codebase (engine or `.ff` comments). In Lean, `::` is list
  cons (`x :: xs`). That would not collide in practice (the law's
  separator is consumed by the generator, never emitted), but the
  user preferred `:->`, and `:->` reads as an arrow rather than a
  cons.
- **`:->` (current separator).** Not used in F♭m: no `::` or `:->`
  in the engine or in any `.ff` comment; a single `:` is the
  definition marker (`name: body;`), but `:->` is not an operator.
  In Lean, `:->` is not a token ( `:` is ascription, `->` is the
  function arrow); the generator consumes it from the comment, so
  it never reaches Lean. A law comment is top-level, so it passes
  through the F♭m preprocessor byte-identical (as `@effect`
  comments do).
- **`==`.** Still the effect split inside `@effect`; a law does
  not use it. No conflict.

## Open questions (why it is not solid yet)

1. **Input/sequence split — the biggest gap.** In
   `a dup drop :-> a`, the left side is `a dup drop`. How does
   the parser know `a` is the input (a value) and `dup drop` is
   the sequence (words)? The tokens are indistinguishable by
   shape. Options:
   - (a) Look each token up: a known word (primitive or defined)
     is part of the sequence; anything else is a value. The split
     is "values until the first word, then words". Fragile if a
     value is ever named the same as a word.
   - (b) A delimiter between input and sequence
     (e.g. `a | dup drop :-> a`), at the cost of a second
     separator.
   - (c) Bracket the sequence (`a [dup drop] :-> a`), but `[...]`
     already means quotation in F♭m, so that reads wrong.
   - (D) Put the sequence first (`dup drop :: A == A`), which
     pins it — but the user rejected that order.
   No option chosen yet.
2. **Output: stack or expression?** In `a + b^c`, how does the
   parser know it is one Lean expression and not three stack
   elements (`a`, `+`, `b^c`)? In `@effect`, a direct output is
   whitespace-split and an `ensures` clause carries expressions.
   For a law, the output needs a rule — e.g. "contains an
   operator, so it is an expression" (heuristic), or "an
   unspaced single token is an expression" (as `@effect` requires
   for `a⊕b` / `land(a,b)` in a direct output), or an explicit
   marker. No rule chosen yet.
3. **Naming.** Currently anonymous — the sequence is the subject.
   Bend names its laws. If two different laws ever need to be
   stated about the same sequence, a name would be needed. Can
   be added later without changing the shape.
4. **`requires` placement and form.** The `^` example proves a
   law can need a precondition. The natural form is after the
   output (`... :-> ... requires 0 <= C`), mirroring `@effect`.
   Whether `else ERROR` makes sense for a law (a law about a
   failing sequence) is open.
5. **Defined words in a sequence.** Should work by inlining (as
   `@effect` does for a defined word's body), but not verified.
   A sequence containing a quotation literal or a recursive word
   would be refused, as `@effect` refuses them.
6. **Proof strength.** The standard ladder closes the two
   examples above, but the `^` case needed the `hguard` pattern
   (already in the generator for guarded primitives). Laws that
   combine several guarded words, or that need a value-level
   argument beyond `omega`, may need more. Not yet explored.
7. **Theorem naming.** A generated law theorem needs a Lean name.
   The natural name derives from the sequence (`law_dup_drop`,
   `law_add_zero`), but collisions (two laws, same sequence
   shape) and sanitising symbolic words (`^`, `+`) need a rule.
   The `@effect` `lean_name` mapping is the starting point.

## What is NOT decided

- No implementation. No generator change. No new file or test.
  This document is the design to review; implementation waits for
  the user's direction (as with every other step here).
- The `::` separator is recorded but set aside in favour of
  `:->`; if the user prefers `::` on review, the separator is a
  one-token change in the parser.
