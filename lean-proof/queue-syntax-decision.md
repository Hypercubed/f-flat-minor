# Queue effects: syntax decision note

Draft prepared 2026-11-19 (evening) for the user's decision. Nothing here
is decided and nothing in the generator changes until he says so.

## Update — user's calls, 2026-11-19 evening

- **Outer parens dropped.** His call: if every effect needs them, none
  do. The `|` already scopes the two `==`s (split on `|` first, then
  each picture on its first `==`), and the `@effect` tag delimits the
  effect. The forms below are as drafted — read them with their outer
  parens removed, e.g. `/* @effect q<: ..r a == ..r | ..q == ..q a */`.
  The two-paren-groups alternative is dead with the parens.
- **Queue pictures probably unnecessary.** Most words are balanced by
  design, so their effects never need a queue picture. Unbalanced
  queue operations get marked `.unsafe` instead. Engine-checked: the
  only words whose *effects* touch the data queue are the four
  primitives (`q<`, `q>`, `(`, `)`); the other queue operations in the
  engine are the interpreter's own control-flow machinery (CALL/DEF/
  KET/BRA/MARK, IF) or the execution loop, not words with effects.
  The four primitives are hand-proven in the preamble and never go
  through the effect parser, so the generator may never need to parse
  a queue picture at all — balanced words just need the general-`q`
  theorem (queue binder in, same queue out), which `swapd` already
  verified by `rfl`.
- **Open:** what `.unsafe` means for the generator — a marked word gets
  no effect (its queue behavior is out of scope), or it gets a queue
  picture as the exception? And "balanced" needs a precise meaning:
  matched push/pull at the tail, so the queue is unchanged — not just
  a net-zero count.
- **requires/ensures decided** (2026-11-19 evening, after the `?` forms
  used `when`): `when` → `requires`, `where` → `ensures`, a pure
  rename — same translation, same Lean. The `where len = …` in the
  `(`/`)` forms below reads `ensures len = …`.
- **Overnight, 2026-11-19/20 (after this note was written):** rest is
  inferred inside brackets too (`[ a b -- b a ]`, no `..r` needed
  unless the effect refers to it); a literal quotation's effect can be
  named by its code (`[swap]` instead of the full picture), while a
  variable quotation stays a bare-shape hypothesis (`[ ..r -- ..s ]`);
  `eval` and `?` are statable with nested `[ ]` effects (pending Phase 8
  generator support); `cons` is statable (`..r a [B] == ..r [a B]`)
  but needs effect composition, also Phase 8; the fold words are
  recursive through self-calling helpers, and a definition containing
  a fold can be proven by applying the fold's proven effect as a lemma
  instead of inlining it — generator support for lemma application
  still to be built, `@proof` is today's workaround.

## Where this stands

- 2026-11-19, main chat: he likes the direction — the effect syntax is
  converging on F♭m itself. Open decision: the syntax for queue effects.
- Already settled in that thread and reused here, not reopened:
  - `word:` prefix pins the word name, so the separator can't collide with
    a word name (his point, 2026-11-19 21:57 UTC).
  - `[ ]` for inner quotation effects (his proposal, same message).
  - `==` kept as the separator (he prefers the existing syntax; `--`
    collides with the real decrement word). `when`/`where` replaced by
    `requires`/`ensures` (decided 2026-11-19 evening, see Update above).
  - Named row variable `..r` for the stack rest (from the
    concatenative-languages research page, 2026-11-19).

## Three checked facts that constrain the choice

### 1. The existing `|` notation contradicts itself on `q>`

The docs give (README vocabulary table, `_docs/supplemental/stack-notation.md`,
`_docs/reference/core-primitives.md`):

```
/* a q< == | …a */   /* q> == a | a… */
```

and the notation doc states its own rule: "the queue is written
left-to-right in push order; `q>` pops from the right (LIFO)."

- The `q<` row follows that rule: after `q<`, queue is old rest `…` plus
  the pushed `a` at the right (newest/top) end. This matches the Lean
  model (`preamble.lean`: `qpush, v :: s, q => (s, v :: q)`) and the
  engine (`typescript/core/src/engine.ts`: `queuePush` appends;
  `FastQueue.pop` takes from the tail).
- The `q>` row does not follow it under any consistent reading. If the
  `|` side is the queue *after*, it should be just `…` — `a` is gone,
  it is on the stack. If it is the queue *before*, it should be `…a`
  (top at the right). `a…` is neither: it puts `a` at the left (oldest)
  end. One of the two rows is wrong; the `q>` row is the one that
  disagrees with the doc's own stated rule and with the Lean step.

So the old form can't just be carried over: it also can't express `q>`
at all without showing the queue *before* as well as after, because
`q>` removes from the queue. Any queue syntax needs an in/out pair for
the queue, the way the stack already has one.

### 2. `(` / `)` are not pure whole-stack moves — there is a length marker

`typescript/core/src/engine.ts` (STASH/FETCH):

```ts
// STASH `(`: stash whole stack, then push its length on top
const stash = this.stack.splice(0, len);
stash.forEach((value) => this.queuePush(Q_LITERAL, value));
this.queuePush(Q_LITERAL, BigInt(len));

// FETCH `)`: pop length first, then that many values, restore at the BOTTOM
const [, lenRaw] = this.queuePop();
for (let i = 0; i < len; i++) { const [, value] = this.queuePop(); fetch.unshift(value); }
this.stack.unshift(...fetch);
```

Consequences for the notation:

- `(` does not just move the stack to the queue: the queue gains an
  extra element, the length, on top (pop-first). An effect that says
  "stack moves to queue" and omits it is wrong and unprovable.
- `)` restores the stashed values *under* the current stack
  (`unshift` = index 0 = bottom), not on top of it. In the normal
  `(` … `)` use the stack is empty at `)`, so it makes no difference —
  but the effect has to state the general case correctly.
- The Lean model (`preamble.lean`) has no stash/fetch `Tok` cases yet,
  and its queue is values-only (the engine's `Q_LITERAL` tags are
  abstracted away), so the length marker appears as a plain `Int` in
  the model. That is a generator change, not a notation problem.

Derived Lean forms (from the engine code above, **not yet compiled** —
no stash/fetch step exists to check them against yet):

```lean
-- stack r (head-on-top), queue q: `(` empties the stack, queue gains
-- the stashed stack with its length on top (pop-first)
exec [.stash] r q = Outcome.ok [] ((r.length : Int) :: r ++ q) []
-- queue (len :: s ++ q), stack r: `)` restores s underneath r
exec [.fetch] r ((s.length : Int) :: s ++ q) = Outcome.ok (r ++ s) q []
```

### 3. One `…` can't serve both rests

Once a word touches the queue, `…` is ambiguous: is it the stack rest
or the queue rest, and whose length does `rest.length` mean? The queue
form forces named rests: `..r` for the stack, `..q` for the queue
(both become real `List Int` binders in Lean, as `..r` already was in
the research page). `r.length` / `q.length` replace `rest.length`
whenever a queue picture is present.

## Recommendation

> Superseded by the no-parens / probably-no-queue-pictures calls in the
> Update above: the one-paren-group form below is kept as the record of
> what was checked (the Lean verifications still stand), not as the
> live recommendation. If queue pictures ever return as the `.unsafe`
> exception, this is the form to revisit.

One paren group, `==` inside each picture, `|` between the pictures:

```
/* @effect word: ( stack-in == stack-out | queue-in == queue-out ) */
```

- `|` keeps the meaning it already has in snapshots and the old
  notation — "everything left of `|` is stack, right of `|` is queue" —
  one rule everywhere. A snapshot is the same shape with single
  pictures and no `==`: `/* ..r a b | ..q a */`.
- The parens, which looked superfluous for stack-only effects, now
  earn their keep: they scope the two `==`s, so the parser splits
  positionally (first `==` in the stack picture, second in the queue
  picture) instead of splitting on a separator globally.
- `|` as a standalone token can't be the OR word: OR only appears
  glued into output expressions (`a|b`, no spaces), never as a bare
  token in a picture. This is the same positional argument that
  dissolved the `--`/`==` collision once the word is pinned by `:`.
  Honest downside: `|` *is* a real word (OR, op 124), so it reads
  oddly at first glance. The alternative below avoids it at the cost
  of heavier parens.
- A word that doesn't touch the queue omits the `| …` part entirely,
  so stack-only effects look exactly like today plus parens. Omitting
  the queue picture means "queue unchanged" — a claim the generator
  must prove (with a `q` binder), not assume.

Worked forms:

```forth
/* @effect q<: ( ..r a == ..r | ..q == ..q a ) */
/* @effect q>: ( ..r == ..r a | ..q a == ..q ) */
/* @effect (:  ( ..r == | ..q == ..q ..r len ) where len = r.length */
/* @effect ):  ( ..r == ..s ..r | ..q ..s len == ..q ) where len = s.length */

/* queue-safe: no queue picture, queue is preserved */
/* @effect swapd: ( ..r a b c == ..r b a c ) */
swapd: q< swap q> ;

/* snapshot with queue state, same `|` rule */
/* ..r a b | ..q a */
```

Notes on the `(`/`)` forms: `..r` / `..s` spliced into a picture is a
list splice (the stack rest as a sequence, in bottom-to-top order),
and `len` is tied down by the `where`. That splice is the one notation
extension beyond `q<`/`q>`; everything else reuses machinery that
already exists. If the splice feels like too much for now, `(`/`)`
can be deferred and `q<`/`q>` decided first — they need no splice.

## Lean translations (q<, q>, swapd — verified)

Checked 2026-11-19 against `preamble.lean` with Lean 4.22.0
(`~/.elan/bin/lean`, theorems appended to a copy of the preamble;
all three prove by `rfl`, no axioms beyond the file's own):

```lean
theorem qpush_effect (a : Int) (r q : List Int) :
    exec [.qpush] (a :: r) q [] [] [] = Outcome.ok r (a :: q) [] := rfl

theorem qpull_effect (a : Int) (r q : List Int) :
    exec [.qpull] r (a :: q) [] [] [] = Outcome.ok (a :: r) q [] := rfl

theorem swapd_effect (a b c : Int) (r q : List Int) :
    exec [.qpush, .swap, .qpull] (c :: b :: a :: r) q [] [] [] =
      Outcome.ok (c :: a :: b :: r) q [] := rfl
```

Two things the check caught / forced:

- The `swapd` statement has to take the incoming queue `q` as a binder
  and return it unchanged — the current generator's `run` fixes the
  queue to `[]`, so queue effects need general-`q` theorems, not `run`.
  That is the Phase 8 generator change (PLAN.md already lists queue
  parsing as "Phase 1 work extended to the queue component").
- My first draft of the `swapd` output was wrong (`a :: b :: c :: r`);
  `rfl` refused it and the correct output is `c :: a :: b :: r`
  (typed `..r b a c`). The check earns its keep here.

The `(`/`)` Lean forms in §2 are derived, not compiled — they need
stash/fetch step cases added to the model first.

## Alternative: two paren groups, no `|`

```
/* @effect q<: ( ..r a == ..r ) ( ..q == ..q a ) */
```

- Upside: no `|` anywhere, so no OR-word reading at all.
- Downside: heavier, and the outer parens reuse `(`/`)`, which are
  themselves STASH/FETCH words — the same readability objection the
  single-group form gets for `|`, in a place that is harder to
  wave away positionally, since the groups *are* the delimiters.
  Snapshots would still need `|` (or a second group) for their queue
  picture, so the two notations would diverge.

## Decisions left to him

> Mostly dissolved by the no-parens / probably-no-queue-pictures calls:
> Q1–Q3 below only matter if queue pictures come back. What remains
> live are the two pin-downs in the Update above — what `.unsafe`
> means for the generator, and what "balanced" means precisely.

1. `|` between pictures (recommended) or two paren groups?
2. Named rests `..r` / `..q` — required once queue pictures exist
   (`rest.length` is ambiguous with two rests); accept the pair?
3. `(`/`)` now (splice + `where len = …` as above) or defer them and
   decide only `q<`/`q>` first?
4. Anything here that should also fix the docs: the `q>` row in the
   README vocabulary table, `_docs/supplemental/stack-notation.md`,
   and `_docs/reference/core-primitives.md` is wrong as written
   (§1) and should be corrected to the new form once decided —
   not silently left contradicting the notation doc's own rule.

## What this does not do

- No generator change, no PLAN.md / README.md edit, no migration of
  existing effects. The `(`/`)` Lean forms are stated as derived
  claims awaiting step cases, not as verified theorems.
- `--` vs `==`, UPPERCASE + `↦`, and `.effect` are all untouched —
  this decides only the queue syntax, on top of the syntax as it
  stands. (`requires`/`ensures` vs `when`/`where` has since been
  decided in favour of `requires`/`ensures` — see Update above.)
