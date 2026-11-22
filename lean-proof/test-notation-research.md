# Tests / laws about sequences: the placeholder problem — research

Written Nov 20, 2026 (evening), at the user's direction, while be-quite-900
is shut down. No implementation. No sync. This is research for a decision
to be made another day.

## The problem

The user wants to write tests (laws) about *sequences*, e.g.:

```
/* A B swap == B A dup drop */
```

Two problems, both about the same thing — a token in a statement can be
either a value (placeholder/variable) or a word, and nothing in the
syntax says which:

1. **The `==` delimiter.** `==` is itself a word (the equality primitive),
   so `==` as a separator collides with `==` as a word. (Already known;
   `:->` was the candidate replacement, but see §5.)
2. **Placeholders are indistinguishable from words.** In `a b swap`,
   is `b` a value (push `b`) or a word (call `b`)? If a word named `b`
   exists in the file, the maximal-suffix rule reads it as a word;
   if not, as a value. Defining a word named `b` later silently
   re-parses every statement that used `b` as a value. The same
   ambiguity blocks `@law` and blocks the `:->` unification of effect
   and law (recorded in `law-design.md`).

### What the example means

`A B swap == B A dup drop` is best read as an **equation between two
sequences**: the left sequence (`a b swap` — push `a`, push `b`, swap)
and the right sequence (`b a dup drop` — push `b`, push `a`, dup, drop)
evaluate to the same stack (`b a`). It is not a single-word effect
(the output side contains words, `dup drop`, not just values), and it
is not an input/sequence/output effect either. It is a *test* asserting
program equivalence — the kind of thing a TAP test or a law would state.
That is why it needs both a delimiter *and* a way to mark placeholders:
every token on both sides is either a placeholder, a literal, or a word,
and the parser must tell them apart without consulting the file's
definitions.

## The `.` prefix proposal (user's best idea)

```
/* .a .b swap .= .b .a dup drop */
```

`.a` and `.b` are placeholders. `swap`, `dup`, `drop` are words.
`.=` is the delimiter. The rule is: **any token starting with `.`
(and longer than one character) is a placeholder or a delimiter,
never a word.**

### Why it works (verified against the compiler)

In F♭m's `compileToIR` (`typescript/core/src/compiler.ts`), a token
starting with `.` and longer than one character is a **directive**
(`.push`, `.call`, `.inline`, `.unsafe`, `.pointer`, `.exit`,
`.symbols`, `.words`) — it is never treated as a word call. So a
`.a` token *cannot* be an F♭m word (in the usable sense: you can
define `.a:` but you cannot call `.a`, because using it triggers the
directive branch, which throws for an unknown directive). That is a
language-level guarantee, not a convention: the `.` prefix is
unavailable as a word name, so the generator can safely treat every
`.x` token as a placeholder and `.=` as a delimiter, without looking
up the file's definitions. The placeholder/word split becomes purely
syntactic (does the token start with `.`?), which is exactly what the
maximal-suffix rule could not deliver.

The bare `.` (one character) is still the print word, so the rule
has a length-1 exception: `.` alone is a word, `.a` is a placeholder.
The generator would need to encode that distinction (it already
distinguishes tokens by exact match for primitives, so this is a
small, explicit rule, not a new ambiguity).

### Pros

- Solves **both** issues with one device: the delimiter (`.=`) and
  the placeholders (`.a`, `.b`) are both marked by the same prefix,
  and neither can be a word.
- The guarantee is enforced by the F♭m compiler itself, not by a
  naming convention the reader has to remember — a `.x` token is
  *incapable* of being a word, so there is no silent re-parse if
  someone defines a word later.
- Numbers stay unmarked (a literal `1` is a number, not a word and
  not a placeholder — the compiler's `toNumber` already separates
  them), so tests with literals need no prefix: `1 2 swap .= 2 1`.
- Quotations are unaffected (`[...]` is already a distinct syntactic
  form).

### Cons / open questions

- **It looks like a directive.** `.a` visually resembles `.push` /
  `.call`, and a reader may first read it as a directive rather than
  a variable. In a comment the F♭m engine never sees it, so it is
  only a readability concern, but it is a real one — the prefix is
  borrowed from a namespace (directives) that already has a meaning.
- **The `.=` delimiter is a new symbol.** It is unambiguous (starts
  with `.`), but it is not the `:->` already chosen for laws, so
  adopting it for tests/laws means either two delimiters (`.=` for
  tests, `:->` for effects/laws) or replacing `:->` with `.=` (and
  re-deciding the law separator). The cleanest reading is that `.=`
  is the *equation* delimiter (between two sequences) while `:->`
  is the *effect* delimiter (input/sequence to output) — two different
  relations, two different symbols — but that is a decision, not a
  given.
- **Lean identifier mapping.** `.` is not a valid Lean identifier
  character. The generator's `lean_name` already sanitises
  non-alphanumeric characters to `_` (so `.a` would become `_a`),
  but a placeholder `.a` should become a Lean *binder* named `a`
  (stripping the `.`), not `_a`. That is a small generator change
  (strip a leading `.` when the token is a placeholder), but it must
  be decided explicitly — the sanitiser alone would produce the
  wrong name.
- **What about a placeholder that is a quotation?** A test may need
  a placeholder standing for a quotation (e.g. `.[Q]`?). The `.`
  prefix composes with brackets in principle (`. [Q]` is ambiguous
  as written; `.[Q]` is a single token starting with `.`), but no
  form has been proposed or tested. This is an open question, not a
  blocker for the plain-value case.

## The "new F♭m restriction" alternative

Instead of marking placeholders with a prefix, change F♭m so that
some class of tokens *cannot* be word names, and use that class for
placeholders. Candidates:

| Restriction | Would it work? | Cost |
|---|---|---|
| No single lowercase-letter word names (`a`, `b`, … are always variables) | Yes for the common case. **No single lowercase-letter word is defined in the stdlib** (grep for `[a-z]:` in `ff/lib/` returns nothing; the single letters in `core.ff` are variables in effect comments, not definitions). So it would not break the stdlib. | **A language change.** It must be added to the F♭m compiler (reject a definition whose name is a single lowercase letter), documented, and accepted upstream. It also forbids users from defining such words in their own code — a real, if small, restriction on the language. And it only covers single letters; a placeholder named `foo` would still be ambiguous. |
| No word names starting with a given character (e.g. `$`, `@`, `#`) | Yes, if the character is chosen so it cannot appear in a word name. But **no character is currently forbidden** in a word name except whitespace and the leading-`.`/`'` rules (see §5) — so this *is* the `.` proposal, just with a different character, and any new character would need the same compiler change as above. | Same language-change cost, with no advantage over `.` (which is already forbidden by the existing directive rule). |
| Generator-level convention only (e.g. "in `@effect`/`@law` comments, single lowercase letters are always variables") | Works until it doesn't. It is **not** enforced by F♭M, so if someone defines a word `B`, the generator misparses every statement using `B` as a value — silently, with no error. This is the maximal-suffix rule's failure mode, restated as a convention. | No language change, but no guarantee either. It is strictly weaker than the `.` prefix (which the compiler enforces). |

**Assessment:** a new F♭m restriction is a heavier lift than the `.`
prefix for no additional guarantee. The `.` prefix already *is* a
restriction (the directive rule) that F♭m enforces today — it just
repurposes it inside comments. A new restriction only makes sense if
the `.` prefix is rejected on readability grounds and a *different*
guaranteed-unavailable character is wanted; in that case the cheapest
such character is one F♭m already reserves, and `.` is the only one
that is both reserved and ASCII.

## Prior art: how other languages tell variables from words

From `research_notes/concatenative-stack-effects-20261119-0426/report.md`
(§2–§3, §7) — all of these are *naming conventions*, not compiler
enforcement, and none of them has a law/equation notation:

- **Factor** avoids the problem for effects by pinning the word
  *outside* the effect: `: sq ( x -- x^2 ) dup * ;` — the word name
  is before the parens, the names inside are documentation only.
  Factor has no law/equation form, so it never needs to distinguish
  a variable from a word *inside* a sequence.
- **Joy** rewrite rules use **case**: uppercase letters are variables,
  lowercase are words — `[B] [A] swap == [A] [B]`, where `[A]`/`[B]`
  are quotation variables and `swap` is a word. The case distinction
  is the disambiguator. (Note: Joy's `==` is its own rewrite symbol,
  a reason F♭M should not reuse `==` as a separator.)
- **Cat** uses a **prefix + case**: `'a` is a value type variable,
  `'A` is a stack (row) variable — `'` marks "this is a variable",
  case marks "value vs. stack". The `'` prefix is the closest prior
  art to the `.` prefix: a short marker that says "this token is a
  variable, not a word".
- **Kitten / Mirth** use types in the slots (`Int32`, `*a`), so the
  variable/word distinction does not arise — the slot contents are
  types, not values or words.

**What this means for F♭m:** the `.` prefix is in the same family as
Cat's `'` prefix (a marker that says "variable") and Joy's case
distinction (a visual rule that separates variables from words). The
difference is that `.` is *enforced* by F♭m's directive rule, while
`'` and case are conventions. Of the three, `.` is the strongest
guarantee and the most F♭m-native (it reuses a rule F♭m already has);
`'` would be a new reservation and collides with F♭m's string
syntax (a token starting with `'` is a string literal); uppercase
variables would collide with F♭m's case-insensitivity (the compiler
lowercases every name via `getSymbol`, so `A` and `a` are the same
word — case cannot distinguish them in F♭m).

## Delimiter candidates (for the equation between two sequences)

| Delimiter | Can it be a word? | Verdict |
|---|---|---|
| `==` | **Yes — it is one** (equality primitive). | Rejected (the original problem). |
| `:->` | Theoretically yes (someone could define `:->:`); not a standard word, so unlikely. | Safe in practice, not guaranteed. Already chosen for laws/effects, but does not solve the placeholder split. |
| `.=` | **No** — starts with `.`, so it is a directive, never a word call. | Guaranteed unambiguous. Pairs naturally with `.a`/`.b` placeholders (same prefix, one rule). New symbol; relationship to `:->` undecided. |
| `:=`, `=>`, `-->` | Theoretically yes (not standard words, unlikely to be defined). | Same class as `:->`: safe in practice, not guaranteed. No advantage over `:->`. |
| `{=}`, `{->}` | Yes (`{`/`}` are ordinary characters in word names — no special handling in the compiler). Also **bad for the generator**: `{...}` is the human-note syntax, so the generator would strip the delimiter as a note. | Rejected. |
| `.->` | No (starts with `.`). | Guaranteed unambiguous, same class as `.=`. `.=` reads more as "equals"; `.->` reads more as "maps to". Aesthetic choice between them. |

## The uppercase proposal (user, Nov 21 morning)

**Correction to this document:** the "Prior art" section says case
cannot distinguish variables from words in F♭m because `getSymbol`
lowercases every name. That is true for F♭m *code*, but it does not
apply to the *notation*: the generator reads the raw comment text,
where case is preserved, so the generator *can* distinguish `X`
from `x` in an effect/law. The case rule would be a **notation rule
enforced by the generator** (words are lowercase, variables are
uppercase in effects/laws), not an F♭m language rule. F♭m's
lowercasing is consistent with it — a word defined as `X:` is the
word `x`, and the notation writes it as `x`.

The user's proposal:

- **Words are lowercase, variables are uppercase** in effects and
  laws (a notation rule, generator-enforced).
- **`X` (an uppercase letter alone) is a variable integer** — a
  value, a Lean binder.
- **`[X]` (an uppercase letter in brackets) is a quote** — a
  quotation variable. This matches the existing `[B]` in `cons`
  (which is already uppercase).
- **`..X` or `X*` is the effect of applying the quote** — the result
  of running `[X]`, i.e. the stack produced when the quotation `X`
  is evaluated. This is the notation for the quotation *result*,
  the piece that was open in the `[S]`/`*` thread (Nov 20) — the
  `*` form was rejected then because `a*` already means Kleene star
  in `seq.ffp`, but see below.

### `..X` vs `X*` for the quotation result

- **`X*` collides with Kleene star, but case disambiguates it.**
  In `seq.ffp`, `a*` (lowercase) means a sequence of `a`s (zero or
  more). `X*` (uppercase) would mean the result of running quotation
  `X`. The `*` suffix would mean two different things depending on
  case — "sequence" for lowercase, "quotation result" for uppercase.
  It is parseable (the generator can branch on case), but it is
  confusing to read: the same suffix, two meanings, distinguished
  only by the case of the letter before it.
- **`..X` avoids the collision entirely.** The `..` prefix already
  denotes a list/stack (`..R` is a rest variable, a `List Int`), and
  the result of running a quotation *is* a stack, so `..X` fits the
  `..` pattern. Uppercase `X` distinguishes it from a rest variable
  (`..R`, `..S` are lowercase). No existing use of `..` + uppercase
  conflicts with it.
- **Recommendation within the proposal: prefer `..X`.** It reuses
  an existing prefix with a consistent meaning (a list), it does not
  touch `*` (leaving Kleene star unambiguous), and it is visually
  distinct from both rest variables and quotation variables.

### What the case rule would require

- **Generator enforcement.** The generator must reject (as a clean
  problem, not a silent misparse) a lowercase token in a variable
  position and an uppercase token in a word position — otherwise the
  rule is a convention, not a guarantee. Concretely: in `parse_effect`
  / the law parser, a bare single uppercase letter is a variable;
  a bare single lowercase letter is a word (looked up); a bare
  multi-letter lowercase token is a word; a bare uppercase multi-letter
  token is an error (or a named variable — undecided).
- **Quotation slots.** Inside brackets, `[X]` (uppercase) is a
  quotation variable; `[x]` (lowercase) would be a quotation literal
  containing the word `x` (or an error if `x` is not a word). The
  current `_parse_quot_slot` treats any `[name]` as a variable;
  under the case rule it must branch on case.
- **Migration.** Every existing effect uses lowercase variables
  (`A B swap == B A`, `A B C == C A B`, …). Switching to uppercase
  variables means rewriting all of them (`A B swap == B A`, …) in
  `primitives.ff`, `core.ff`, and the examples — a mechanical but
  total migration, or dual support during a transition (the generator
  accepting lowercase variables as deprecated).
- **Symbolic words are unaffected.** `+`, `-`, `*`, `/`, `&`, `|`,
  `~`, `^`, `<`, `=`, `>`, `.`, `?`, `<<`, `>>` have no case, so
  the rule does not touch them. A symbolic word is a word regardless
  of case.
- **The delimiter is still separate.** The case rule solves the
  placeholder/word split, but not the delimiter: `==` is still a word
  (equality), so the equation/effect delimiter still needs to be
  `:->`, `.=`, or another unambiguous symbol. The case rule and the
  delimiter choice are independent decisions that compose (e.g.
  `A B swap :-> B A` or `.A .B swap .= .B .A` — the latter is
  redundant, since case already marks the variables).

### How it composes with the `.` prefix

The case rule and the `.` prefix solve the same problem two different
ways; they are alternatives, not complements. Using both (`.A`) is
redundant. The case rule is more readable (no extra punctuation on
every variable) and matches prior art (Joy's case distinction, Cat's
`'a`/`'A`); the `.` prefix is more robust (it cannot be defeated by
a word defined with an uppercase letter, because F♭m lowercases it
anyway — but that is exactly why the case rule also cannot be defeated:
a word defined as `X:` *is* the word `x`, so an uppercase `X` in a
comment can never refer to a word, only to a variable). On that
point the two are equivalent: both give a guarantee, not just a
convention. The case rule wins on readability; the `.` prefix wins on
being explicit about *which* tokens are placeholders even to a reader
who has not learned the case rule.

## Decisions (user, Nov 21 morning)

- **Laws emit `example`, not `theorem`.** A law is a checked-but-unnamed
  result (Lean `example` — checked, not stored, not referenceable).
  Effects still emit named `theorem`s (they are referenced by name,
  e.g. as lemmas for Phase 6 composition).
- **Uppercase variables for both effects and laws.** The case rule
  (words lowercase, variables uppercase) is adopted for both tags.
  This is a migration (all existing effects use lowercase variables)
  or dual support during a transition — not yet decided which.
- **Delimiter for laws still open.** The `==` vs `:->` vs `.=` choice
  for the law/equation delimiter is not decided.

## Quotation notation in laws: is `[ ..A -- ..X ]` ambiguous?

**Short answer: potentially, but resolvable by contents — and the
`..` prefix is what resolves it.**

`[ ..A -- ..X ]` has two readings:

1. **A quote containing the word `--`** (decrement): the brackets
   hold a program, and `--` is the decrement word.
2. **A quote effect**: the brackets hold a specification — a
   quotation that maps rest `..A` to rest `..X`, where `--` is the
   separator between input and output (Factor's `( ..a -- ..b )`
   form, in brackets instead of parens).

The `--` is both a F♭m word (decrement, `--` = `dec`) and the effect
separator, so inside brackets it is genuinely ambiguous *in the
abstract*. In practice it is resolved by what else is in the
brackets:

- If the brackets contain a **`..` rest variable** (`..A`, `..X`),
  it is an effect. Rest variables are notation, not F♭m words — they
  cannot appear in a quotation literal (a literal contains words,
  not rest variables). So the `--` between two `..` rests must be
  the separator. The generator's rule: if the bracket content
  contains `..`, split on the first `--` as the separator.
- If the brackets contain only **lowercase words** (`[swap]`,
  `[dup drop]`), it is a quotation literal. No `--` separator is
  present (unless one of the words *is* `--` — see below).
- The genuinely ambiguous case is a bracket containing `--` and
  nothing that disambiguates it: `[--]` (just decrement) or
  `[A --]` (a variable and decrement). `[--]` is a literal (the
  decrement word in a quotation); it contains no `..`, so the
  `..`-check correctly classifies it as a literal, not an effect.
  `[A --]` is a literal too (a variable `A` and the word `--`) —
  but a variable cannot be *pushed* inside a quotation literal in
  F♭m, so `[A --]` is not a meaningful F♭m program; it would only
  arise if a law tried to write a quotation literal containing a
  variable, which the notation does not support (a quotation
  containing a variable is written as a quotation *variable* `[A]`,
  not as a literal). So the ambiguous forms do not occur in
  well-formed laws.

In short: the `..` prefix is the disambiguator. A bracket with `..`
inside is an effect; a bracket without it is a literal. The
generator already implements this shape of rule in `_parse_quot_slot`
(it splits the inner content on `--`), and the case rule makes it
robust: a literal contains lowercase words, an effect contains
uppercase rest variables with `..`. The one thing the generator must
*not* do is split on `--` unconditionally — it must check for `..`
first, so that a literal `[--]` (or a literal containing `--` among
words, e.g. `[swap --]`) is not misread as an effect with an empty
side.

## Recommendation (updated Nov 21)

There are now two strong proposals, and they solve the same problem
two different ways. They are alternatives, not complements — using
both (`.A`) is redundant.

**The case rule (uppercase variables, lowercase words)** is the more
readable option and the better fit with prior art (Joy's case
distinction, Cat's `'a`/`'A`). It gives the same guarantee as the
`.` prefix (an uppercase `X` in a comment can never refer to a word,
because F♭m lowercases every word name — a word defined as `X:` *is*
the word `x`), without extra punctuation on every variable. It also
supplies the missing piece for quotations: `[X]` is a quotation
variable and `..X` is the result of running it, which resolves the
open `*`/`[S]` question from Nov 20 in favour of `..X` (leaving
Kleene star `a*` unambiguous). Its cost is a total migration of
existing effects (lowercase variables → uppercase) and generator
enforcement of the rule (reject a lowercase token in a variable
position, and an uppercase token in a word position, as a clean
problem).

**The `.` prefix** is the more explicit option: it marks every
placeholder visibly, so a reader does not need to have learned the
case rule to tell a variable from a word. It is enforced by the F♭m
compiler's directive rule rather than by the generator, but that
distinction does not matter in practice — both give a guarantee.
Its cost is noise (a `.` on every variable) and a resemblance to
directives (`.push`, `.call`).

The remaining decisions are:

1. **Case rule vs `.` prefix** — pick one as the variable marker.
   (Recommendation: the case rule, for readability and for the
   `..X` quotation-result notation it enables.)
2. **`.=` vs `:->` for the equation delimiter** — and whether the
   equation (test/law, two sequences) and the effect (input/sequence
   to output) should share one delimiter or have two (`.=` for
   equations, `:->` for effects). Two delimiters for two relations
   is defensible; one delimiter for both is simpler but conflates
   "these two sequences are equal" with "this sequence maps this
   input to this output".
3. **Placeholder quotations** — `[X]` is a quotation variable and
   `..X` is its result; whether a placeholder can also stand for a
   quotation *literal* (e.g. `[x]`) and how the generator
   distinguishes the two by case.
4. **Whether `@law` and `@effect` stay separate tags** — the
   variable marker (case or `.`) makes the *parsing* unambiguous
   but does not by itself unify the tags. The tag question (one tag
   vs two) is still open and is now separable from the parsing
   question.

## What was checked (VM only, Nov 20 evening)

- `compileToIR` branches (`typescript/core/src/compiler.ts`): number,
  directive (`.` + length > 1), string (`'` + length > 1), definition
  (ends with `:`, length > 1), comment (`/*`/`*/`), symbol (`[...]`),
  else word call via `getSymbol`. No handling of `{`/`}` — they are
  ordinary word-name characters.
- `getSymbol` lowercases every name — so case cannot distinguish
  variables from words in F♭m (rules out Joy's uppercase convention).
- No single lowercase-letter word defined in `ff/lib/` (grep for
  `[a-z]:` empty); the single letters in `core.ff` are variables in
  effect comments.
- Generator `lean_name` sanitises non-alphanumeric characters to `_`
  — a `.a` placeholder would need explicit stripping to become the
  Lean binder `a`, not `_a`.
- Prior art from the Nov 19 concatenative report (§2 Factor, §3
  Joy/Cat, §7) — see "Prior art" above. No new web research was
  needed; the report already covers the relevant conventions.

## Status

Research only. Nothing implemented, nothing synced (be-quite-900 is
shutting down). Next step, when the user returns: decide the four
open questions above (§ Recommendation), then update `law-design.md`
and, if directed, implement the `.` prefix in the generator
(`parse_effect` / a new `parse_law` or `parse_test`) and migrate or
dual-support the existing forms.
