/- Fbm.Interp: pure F♭m semantic model and interpreter.
   Handwritten source module (split from preamble.lean).
   Lean 4 core only, no Mathlib. -/

inductive Tok where
  | push : Int → Tok
  | nop : Tok
  | clr : Tok
  | dup : Tok
  | swap : Tok
  | drop : Tok
  | add : Tok
  | sub : Tok
  | mul : Tok
  | mod : Tok
  | div : Tok
  | land : Tok
  | depth : Tok
  | lt : Tok
  | eq : Tok
  | gt : Tok
  | lor : Tok
  | lnot : Tok
  | pow : Tok
  | qpush : Tok
  | qpull : Tok
  | putc : Tok
  | putn : Tok
  | print : Tok
  | exit : Tok
  | rand : Tok
  | clock : Tok
  | getc : Tok
  | shl : Tok
  | shr : Tok
  | eval : Tok
  | cond : Tok
  | cons : Tok
  | call : Int → Tok
deriving DecidableEq, Repr

abbrev Stack := List Int
abbrev In := List Int
abbrev Oracle := List Int

/-- The output actions a program performs, in order. Lean says a
    word has an IO effect by putting it in the type: the
    interpreter returns the trace of actions, so the theorem
    states exactly what the program printed. -/
inductive IOAction where
  | putc : Int → IOAction
  | putn : Int → IOAction
  | print : Stack → IOAction
deriving DecidableEq, Repr

/-- How a program ends: `ok` finished normally (stack, queue,
    trace), `err` failed (stack underflow, division by zero),
    `exit` halted with a code (and the trace of what ran before
    it). `none` already means failure, so `exit` needs its own
    outcome -- that is why `exec` returns `Outcome`, not `Option`. -/
inductive Outcome where
  | ok : Stack → Stack → List IOAction → Outcome
  | err : Outcome
  | exit : Int → List IOAction → Outcome
deriving DecidableEq, Repr

/-- Bitwise AND on Int, two's-complement semantics (JS BigInt `&`).
    Lean core has no Int bitwise ops (only Nat.land/lor), so this
    is built from Nat.land on magnitudes: a non-negative operand
    AND a negative one is `a - (a & (m-1))`, and two negatives
    are `-(((n-1) | (m-1)) + 1)`. -/
def land (a b : Int) : Int :=
  if 0 ≤ a then
    if 0 ≤ b then ((a.natAbs &&& b.natAbs : Nat) : Int)
    else ((a.natAbs - (a.natAbs &&& (b.natAbs - 1)) : Nat) : Int)
  else
    if 0 ≤ b then ((b.natAbs - (b.natAbs &&& (a.natAbs - 1)) : Nat) : Int)
    else (-((Nat.lor (a.natAbs - 1) (b.natAbs - 1) + 1 : Nat) : Int))

/-- Bitwise OR on Int, two's-complement semantics (JS BigInt `|`).
    De Morgan over land: a | b = ~(~a & ~b), and ~x = -x - 1,
    so this is `-(land (-a-1) (-b-1)) - 1`. -/
def lor (a b : Int) : Int :=
  -(land (-a - 1) (-b - 1)) - 1

/-- Bitwise XOR on Int, two's-complement semantics. The standard
    definition in terms of land/lor: a ⊕ b = (a & ~b) | (b & ~a).
    F♭m has no xor operator (`^` is power), so effects write it
    as `⊕`, `^^^`, or `xor(a, b)`. Marked `@[simp]` so the proof
    ladder unfolds it: `simp` does not unfold a plain `def` unless
    it is in the simp set, and the ladder only passes
    `run, exec, step, <prog>`. -/
@[simp]
def xor (a b : Int) : Int :=
  lor (land a (-b - 1)) (land b (-a - 1))

/-- Bitwise NOT on Int (F♭m `~`, also `~~~` and `lnot(a)` in
    effects). ~x = -x - 1 (two's complement). Marked `@[simp]`
    so the ladder unfolds it: the program computes `-a - 1`
    directly (v23). -/
@[simp]
def lnot (a : Int) : Int := -a - 1

/-- Power on Int (F♭m `^`, also `pow(a, b)` in effects). Lean's
    `^` takes a Nat exponent; the effect writes an Int exponent,
    so it is converted here. Marked `@[simp]` so the ladder
    unfolds it: the program computes `a ^ b.toNat` directly
    (v23). -/
@[simp]
def pow (a b : Int) : Int := a ^ b.toNat

/-- Truncating mod on Int (F♭m / JS BigInt semantics: the sign
    follows the dividend, so -3 % 2 = -1). Lean's `%` on Int is
    Euclidean (-3 % 2 = 1), so this is defined from Nat.mod on
    magnitudes instead. -/
def tmod (a b : Int) : Int :=
  if a < 0 then -((Nat.mod a.natAbs b.natAbs : Nat) : Int)
  else ((Nat.mod a.natAbs b.natAbs : Nat) : Int)

/-- Truncating div on Int (F♭m / JS BigInt semantics: rounds
    toward zero, so -3 / 2 = -1). Lean's `/` on Int is Euclidean
    (-3 / 2 = -2), so this is defined from the truncating
    remainder: a = tdiv*b + tmod, hence tdiv = (a - tmod)/b, and
    the Euclidean `/` is exact there because a - tmod a b is
    divisible by b. (Verified against JS BigInt.) -/
def tdiv (a b : Int) : Int :=
  if b = 0 then 0 else (a - tmod a b) / b

/-- Shifts on Int (v17, F♭m / JS BigInt semantics). A NEGATIVE
    count does NOT throw -- it reverses direction (5n << -1n =
    2n, 5n >> -1n = 10n), so there is no guard; the helpers
    reverse instead. `>>>` is Lean's arithmetic shift right
    (Int, Nat count); `<<<` does not exist for Int, so `<<` is
    multiplication by 2^b. (Verified against JS BigInt.) -/
def shl (a b : Int) : Int :=
  if 0 ≤ b then a * (2 ^ b.toNat) else a >>> (-b).toNat
def shr (a b : Int) : Int :=
  if 0 ≤ b then a >>> b.toNat else a * (2 ^ (-b).toNat)

def step : Tok → Stack → Stack → In → Oracle → List IOAction →
    Option (Stack × Stack × In × Oracle × List IOAction)
  | .push n, s, q, inp, orc, acts => some ((n :: s), q, inp, orc, acts)
  | .nop, s, q, inp, orc, acts => some (s, q, inp, orc, acts)
  | .clr, _, q, inp, orc, acts => some ([], q, inp, orc, acts)
  | .dup, v :: s, q, inp, orc, acts => some ((v :: v :: s), q, inp, orc, acts)
  | .dup, [], _, _, _, _ => none
  | .swap, y :: x :: s, q, inp, orc, acts => some ((x :: y :: s), q, inp, orc, acts)
  | .swap, _, _, _, _, _ => none
  | .drop, _ :: s, q, inp, orc, acts => some (s, q, inp, orc, acts)
  | .drop, [], _, _, _, _ => none
  | .add, b :: a :: s, q, inp, orc, acts => some (((a + b) :: s), q, inp, orc, acts)
  | .add, _, _, _, _, _ => none
  | .sub, b :: a :: s, q, inp, orc, acts => some (((a - b) :: s), q, inp, orc, acts)
  | .sub, _, _, _, _, _ => none
  | .mul, b :: a :: s, q, inp, orc, acts => some (((a * b) :: s), q, inp, orc, acts)
  | .mul, _, _, _, _, _ => none
  | .mod, b :: a :: s, q, inp, orc, acts => if b = 0 then none else some (((tmod a b) :: s), q, inp, orc, acts)
  | .mod, _, _, _, _, _ => none
  | .div, b :: a :: s, q, inp, orc, acts => if b = 0 then none else some (((tdiv a b) :: s), q, inp, orc, acts)
  | .div, _, _, _, _, _ => none
  | .land, b :: a :: s, q, inp, orc, acts => some (((land a b) :: s), q, inp, orc, acts)
  | .land, _, _, _, _, _ => none
  | .depth, s, q, inp, orc, acts => some ((((s.length : Int) :: s)), q, inp, orc, acts)
  | .lt, b :: a :: s, q, inp, orc, acts => some (((if a < b then 1 else 0) :: s), q, inp, orc, acts)
  | .lt, _, _, _, _, _ => none
  | .eq, b :: a :: s, q, inp, orc, acts => some (((if a = b then 1 else 0) :: s), q, inp, orc, acts)
  | .eq, _, _, _, _, _ => none
  | .gt, b :: a :: s, q, inp, orc, acts => some (((if a > b then 1 else 0) :: s), q, inp, orc, acts)
  | .gt, _, _, _, _, _ => none
  | .lor, b :: a :: s, q, inp, orc, acts => some (((lor a b) :: s), q, inp, orc, acts)
  | .lor, _, _, _, _, _ => none
  | .lnot, a :: s, q, inp, orc, acts => some (((-a - 1) :: s), q, inp, orc, acts)
  | .lnot, _, _, _, _, _ => none
  | .pow, b :: a :: s, q, inp, orc, acts => if b < 0 then none else some (((a ^ b.toNat) :: s), q, inp, orc, acts)
  | .pow, _, _, _, _, _ => none
  | .qpush, v :: s, q, inp, orc, acts => some (s, (v :: q), inp, orc, acts)
  | .qpush, [], _, _, _, _ => none
  | .qpull, s, v :: q, inp, orc, acts => some ((v :: s), q, inp, orc, acts)
  | .qpull, _, [], _, _, _ => none
  | .putc, n :: s, q, inp, orc, acts => some (s, q, inp, orc, acts ++ [IOAction.putc n])
  | .putc, [], _, _, _, _ => none
  | .putn, n :: s, q, inp, orc, acts => some (s, q, inp, orc, acts ++ [IOAction.putn n])
  | .putn, [], _, _, _, _ => none
  | .print, s, q, inp, orc, acts => some (s, q, inp, orc, acts ++ [IOAction.print s])
  | .exit, _, _, _, _, _ => none
  | .rand, max :: s, q, inp, o :: orc, acts => some (((o % max) :: s), q, inp, orc, acts)
  | .rand, _, _, _, _, _ => none
  | .clock, s, q, inp, o :: orc, acts => some ((o :: s), q, inp, orc, acts)
  | .clock, _, _, _, _, _ => none
  | .getc, s, q, c :: inp, orc, acts => some ((c :: s), q, inp, orc, acts)
  | .getc, s, q, [], orc, acts => some ((0 :: s), q, [], orc, acts)
  | .shl, b :: a :: s, q, inp, orc, acts => some (((shl a b) :: s), q, inp, orc, acts)
  | .shl, _, _, _, _, _ => none
  | .shr, b :: a :: s, q, inp, orc, acts => some (((shr a b) :: s), q, inp, orc, acts)
  | .shr, _, _, _, _, _ => none
  | .eval, _, _, _, _, _ => none
  | .cond, _, _, _, _, _ => none
  | .cons, _, _, _, _, _ => none
  | .call _, _, _, _, _, _ => none

/-- `exit` short-circuits: it does not go through `step`, and the
    remaining tokens never run. `run` is the entry point the
    theorems use: empty queue, empty input, empty oracle, empty
    trace. -/
def exec : List Tok → Stack → Stack → In → Oracle → List IOAction → Outcome
  | [], s, q, _, _, acts => Outcome.ok s q acts
  | .exit :: _, n :: _, _, _, _, acts => Outcome.exit n acts
  | .exit :: _, [], _, _, _, _ => Outcome.err
  | t :: ts, s, q, inp, orc, acts =>
    match step t s q inp orc acts with
    | none => Outcome.err
    | some (s', q', inp', orc', acts') => exec ts s' q' inp' orc' acts'

def run (prog : List Tok) (s : Stack) (inp : In) (orc : Oracle) : Outcome :=
  exec prog s [] inp orc []

/-- A `userDefs` table: the program for op code `c` is `defs[c]`
    (a list of tokens). A quotation is an `Int` op code; the
    fresh code for a new quotation is `defs.length`. There is no
    `Val` type -- the stack stays `List Int`, and the model gains
    only this table plus pointer-ness (a slot `[..r -- ..s]` in
    an effect is a pointer-marked integer with a known effect). -/
abbrev Defs := List (List Tok)

/-- Look up the program for an op code. A negative code, or one
    past the end of the table, is not a quotation. -/
def lookup (defs : Defs) (code : Int) : Option (List Tok) :=
  if 0 ≤ code then defs[code.toNat]? else none

/-- The quotation-aware interpreter. Like `exec`, but it threads
    the `userDefs` table and runs `eval` / `call` / `cond` /
    `cons` -- words the structural `exec` cannot run, because
    `eval` splices a looked-up body into the program, and a
    quotation can call itself, so the run is not structural on
    the program list. Fuel bounds the total steps (one per token
    consumed, including the `eval` / `call` / `cond` dispatch
    itself); out of fuel is `err`. `runQ` is the entry point the
    quotation theorems use. `step` (above) returns `none` for
    these four tokens, so the old interpreter never runs them;
    `execQ` handles them itself and calls `step` for the rest. -/
def execQ : Nat → List Tok → Stack → Stack → In → Oracle → List IOAction → Defs → (Outcome × Defs)
  | _, [], s, q, _, _, acts, defs => (Outcome.ok s q acts, defs)
  | 0, _, _, _, _, _, _, defs => (Outcome.err, defs)
  | _fuel + 1, .exit :: _, n :: _, _, _, _, acts, defs => (Outcome.exit n acts, defs)
  | _fuel + 1, .exit :: _, [], _, _, _, _, defs => (Outcome.err, defs)
  | fuel + 1, .eval :: ts, q :: s, qq, inp, orc, acts, defs =>
    match lookup defs q with
    | none => (Outcome.err, defs)
    | some body => execQ fuel (body ++ ts) s qq inp orc acts defs
  | _fuel + 1, .eval :: _, [], _, _, _, _, defs => (Outcome.err, defs)
  | fuel + 1, .call code :: ts, s, qq, inp, orc, acts, defs =>
    match lookup defs code with
    | none => (Outcome.err, defs)
    | some body => execQ fuel (body ++ ts) s qq inp orc acts defs
  | fuel + 1, .cons :: ts, b :: a :: s, qq, inp, orc, acts, defs =>
    let c := defs.length
    let body := [Tok.push a, Tok.call b]
    execQ fuel ts ((c : Int) :: s) qq inp orc acts (defs ++ [body])
  | _fuel + 1, .cons :: _, _, _, _, _, _, defs => (Outcome.err, defs)
  | fuel + 1, .cond :: ts, q :: f :: s, qq, inp, orc, acts, defs =>
    if f != 0 then
      match lookup defs q with
      | none => (Outcome.err, defs)
      | some body => execQ fuel (body ++ ts) s qq inp orc acts defs
    else
      execQ fuel ts s qq inp orc acts defs
  | _fuel + 1, .cond :: _, _, _, _, _, _, defs => (Outcome.err, defs)
  | fuel + 1, t :: ts, s, qq, inp, orc, acts, defs =>
    match step t s qq inp orc acts with
    | none => (Outcome.err, defs)
    | some (s', qq', inp', orc', acts') => execQ fuel ts s' qq' inp' orc' acts' defs

def runQ (fuel : Nat) (prog : List Tok) (s : Stack) (inp : In) (orc : Oracle) (defs : Defs) : Outcome × Defs :=
  execQ fuel prog s [] inp orc [] defs

