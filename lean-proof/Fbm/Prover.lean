import Fbm.Interp
import Lean

/- Phase 6 composition lemmas (Nov 21, 2026):
   `execQ_ok_mono` — fuel monotonicity: a program that
   succeeds with `fuel` succeeds with the same result with
   any larger fuel. `execQ_append` — running `p1 ++ p2`
   is running `p1`, then `p2` on the result. Both are
   proved by induction (on fuel / on `p1`); the case split
   follows `execQ`'s cases. `execQ_append`'s second
   hypothesis is universally quantified over the leftover
   input/oracle, because `execQ`'s `ok` result does not
   return them (so `p1`'s consumption of input/oracle is
   invisible to the conclusion). Axioms: [propext,
   Classical.choice, Quot.sound] (standard only). -/
theorem execQ_ok_mono {fuel fuel' : Nat} (h : fuel ≤ fuel') :
    ∀ (prog : List Tok) (s q : Stack) (inp : In) (orc : Oracle) (acts : List IOAction) (defs : Defs)
      (s' q' : Stack) (acts' : List IOAction) (defs' : Defs),
    execQ fuel prog s q inp orc acts defs = (Outcome.ok s' q' acts', defs') →
    execQ fuel' prog s q inp orc acts defs = (Outcome.ok s' q' acts', defs') := by
  revert h fuel'
  induction fuel with
  | zero =>
    intro fuel' hle prog s q inp orc acts defs s' q' acts' defs' hok
    cases prog with
    | nil => simpa [execQ] using hok
    | cons t ts => simp [execQ] at hok
  | succ n ih =>
    intro fuel' hle prog s q inp orc acts defs s' q' acts' defs' hok
    obtain ⟨m, rfl⟩ : ∃ m, fuel' = m + 1 := ⟨fuel' - 1, by omega⟩
    cases prog with
    | nil => simpa [execQ] using hok
    | cons t ts =>
      cases t
      case exit =>
        cases s with
        | nil => simp [execQ] at hok
        | cons x xs => simp [execQ] at hok
      case eval =>
        cases s with
        | nil => simp [execQ] at hok
        | cons q0 s0 =>
          cases hlk : lookup defs q0 with
          | none => simp [execQ, hlk] at hok
          | some body =>
            simp only [execQ, hlk] at hok ⊢
            exact ih (fuel' := m) (by omega) _ _ _ _ _ _ _ _ _ _ _ hok
      case call code =>
        cases hlk : lookup defs code with
        | none => simp [execQ, hlk] at hok
        | some body =>
          simp only [execQ, hlk] at hok ⊢
          exact ih (fuel' := m) (by omega) _ _ _ _ _ _ _ _ _ _ _ hok
      case cons =>
        cases s with
        | nil => simp [execQ] at hok
        | cons b s1 =>
          cases s1 with
          | nil => simp [execQ] at hok
          | cons a s0 =>
            simp only [execQ] at hok ⊢
            exact ih (fuel' := m) (by omega) _ _ _ _ _ _ _ _ _ _ _ hok
      case cond =>
        cases s with
        | nil => simp [execQ] at hok
        | cons q0 s1 =>
          cases s1 with
          | nil => simp [execQ] at hok
          | cons f s0 =>
            by_cases hf : f ≠ 0
            · cases hlk : lookup defs q0 with
              | none => simp [execQ, hlk, hf] at hok
              | some body =>
                simp [execQ, hlk, hf] at hok ⊢
                exact ih (fuel' := m) (by omega) _ _ _ _ _ _ _ _ _ _ _ hok
            · have hf0 : f = 0 := by omega
              simp [execQ, hf0] at hok ⊢
              exact ih (fuel' := m) (by omega) _ _ _ _ _ _ _ _ _ _ _ hok
      all_goals (
        simp only [execQ] at hok ⊢
        split at hok <;> first
          | exact hok
          | exact ih (fuel' := m) (by omega) _ _ _ _ _ _ _ _ _ _ _ hok)

theorem execQ_append {F2 : Nat} {p2 : List Tok}
    {s2 q2 : Stack} {acts2 : List IOAction} {defs2 : Defs} :
    ∀ (F1 : Nat) (p1 : List Tok) (s q : Stack) (inp : In) (orc : Oracle)
      (acts : List IOAction) (defs : Defs)
      (s1 q1 : Stack) (acts1 : List IOAction) (defs1 : Defs),
    execQ F1 p1 s q inp orc acts defs = (Outcome.ok s1 q1 acts1, defs1) →
    (∀ (inp1 : In) (orc1 : Oracle),
      execQ F2 p2 s1 q1 inp1 orc1 acts1 defs1 = (Outcome.ok s2 q2 acts2, defs2)) →
    execQ (F1 + F2 + 1) (p1 ++ p2) s q inp orc acts defs = (Outcome.ok s2 q2 acts2, defs2) := by
  intro F1
  induction F1 with
  | zero =>
    intro p1 s q inp orc acts defs s1 q1 acts1 defs1 h1 h2
    cases p1 with
    | nil =>
      simp only [execQ, Prod.mk.injEq, Outcome.ok.injEq] at h1
      obtain ⟨⟨rfl, rfl, rfl⟩, rfl⟩ := h1
      simp only [List.nil_append]
      exact execQ_ok_mono (fuel := F2) (fuel' := 0 + F2 + 1) (by omega) p2 s q inp orc acts defs s2 q2 acts2 defs2 (h2 inp orc)
    | cons t ts =>
      simp [execQ] at h1
  | succ n ih =>
    intro p1 s q inp orc acts defs s1 q1 acts1 defs1 h1 h2
    cases p1 with
    | nil =>
      simp only [execQ, Prod.mk.injEq, Outcome.ok.injEq] at h1
      obtain ⟨⟨rfl, rfl, rfl⟩, rfl⟩ := h1
      simp only [List.nil_append]
      exact execQ_ok_mono (fuel := F2) (fuel' := (n + 1) + F2 + 1) (by omega) p2 s q inp orc acts defs s2 q2 acts2 defs2 (h2 inp orc)
    | cons t ts =>
      rw [show (n + 1) + F2 + 1 = (n + F2 + 1) + 1 from by omega]
      cases t
      case exit =>
        cases s with
        | nil => simp [execQ] at h1
        | cons x xs => simp [execQ] at h1
      case eval =>
        cases s with
        | nil => simp [execQ] at h1
        | cons q0 s0 =>
          cases hlk : lookup defs q0 with
          | none => simp [execQ, hlk] at h1
          | some body =>
            simp only [execQ, hlk] at h1
            have hIH := ih (body ++ ts) s0 q inp orc acts defs s1 q1 acts1 defs1 h1 h2
            rw [List.append_assoc] at hIH
            simp only [List.cons_append, execQ, hlk]
            exact hIH
      case call code =>
        cases hlk : lookup defs code with
        | none => simp [execQ, hlk] at h1
        | some body =>
          simp only [execQ, hlk] at h1
          have hIH := ih (body ++ ts) s q inp orc acts defs s1 q1 acts1 defs1 h1 h2
          rw [List.append_assoc] at hIH
          simp only [List.cons_append, execQ, hlk]
          exact hIH
      case cons =>
        cases s with
        | nil => simp [execQ] at h1
        | cons b s1 =>
          cases s1 with
          | nil => simp [execQ] at h1
          | cons a s0 =>
            simp only [execQ] at h1
            have hIH := ih ts ((defs.length : Int) :: s0) q inp orc acts (defs ++ [[Tok.push a, Tok.call b]]) s1 q1 acts1 defs1 h1 h2
            simp only [List.cons_append, execQ]
            exact hIH
      case cond =>
        cases s with
        | nil => simp [execQ] at h1
        | cons q0 s1 =>
          cases s1 with
          | nil => simp [execQ] at h1
          | cons f s0 =>
            by_cases hf : f ≠ 0
            · cases hlk : lookup defs q0 with
              | none => simp [execQ, hlk, hf] at h1
              | some body =>
                simp [execQ, hlk, hf] at h1
                have hIH := ih (body ++ ts) s0 q inp orc acts defs s1 q1 acts1 defs1 h1 h2
                rw [List.append_assoc] at hIH
                simp [List.cons_append, execQ, hlk, hf]
                exact hIH
            · have hf0 : f = 0 := by omega
              simp [execQ, hf0] at h1
              have hIH := ih ts s0 q inp orc acts defs s1 q1 acts1 defs1 h1 h2
              simp [List.cons_append, execQ, hf0]
              exact hIH
      all_goals (
        simp only [List.cons_append, execQ] at h1 ⊢
        split at h1 <;> first
          | exact absurd h1 (by simp)
          | exact ih _ _ _ _ _ _ _ _ _ _ _ h1 h2)

/- Compositional Spec layer (compositional-lean-prover Phase A):
   `Spec prog pre post` hides explicit fuel: `pre` describes the
   initial top-of-stack/queue (plus input, oracle, trace, and
   `defs`), `post` describes the final top-of-stack/queue/trace
   and the `defs` threading (`defs0` initial, `defs'` final).
   Ghost variables (e.g. `A B R`) are bound *outside* `Spec`, so
   `pre` and `post` share them by closure. The definition
   universally quantifies over the frame (`R` deeper stack, `qq`
   deeper queue) plus `inp`, `orc`, `acts`, and `defs`, and
   requires frame preservation as suffixes (`s1 ++ R`,
   `q1 ++ qq`): a program satisfying `Spec` works under any
   deeper stack/queue. Crucially, the conclusion is uniform in
   the leftover input/oracle (`∀ inp1 orc1`): `p1`'s consumption
   of input/oracle is invisible to the conclusion, so a second
   program must succeed for *every* leftover `inp1`/`orc1` —
   true for the pure stack combinators, which never consult
   `inp`/`orc`. `clr` (which wipes `R`) has no `Spec`; it keeps
   its direct `run` theorem. `SpecErr` is the `ERROR`
   counterpart: the program fails (`Outcome.err`) under the
   framed preconditions. Axioms: standard only. -/
def Spec (prog : List Tok)
    (pre : Stack → Stack → In → Oracle → List IOAction → Defs → Prop)
    (post : Stack → Stack → List IOAction → Defs → Prop) : Prop :=
  ∀ (R qq : Stack) (inp : In) (orc : Oracle) (acts : List IOAction) (defs : Defs)
    (s0 q0 : Stack),
    pre s0 q0 inp orc acts defs →
    ∃ (fuel : Nat) (s1 q1 : Stack) (acts1 : List IOAction) (defs1 : Defs),
      post s1 q1 acts1 defs1 ∧
      ∀ (inp1 : In) (orc1 : Oracle),
      execQ fuel prog (s0 ++ R) (q0 ++ qq) inp1 orc1 acts defs =
        (Outcome.ok (s1 ++ R) (q1 ++ qq) acts1, defs1)

def SpecErr (prog : List Tok)
    (pre : Stack → Stack → In → Oracle → List IOAction → Defs → Prop) : Prop :=
  ∀ (R qq : Stack) (inp : In) (orc : Oracle) (acts : List IOAction) (defs : Defs)
    (s0 q0 : Stack),
    pre s0 q0 inp orc acts defs →
    ∃ (fuel : Nat) (defs' : Defs),
      execQ fuel prog (s0 ++ R) (q0 ++ qq) inp orc acts defs = (Outcome.err, defs')

/-- `SpecExact`: exact-stack spec for words that observe or
    wipe the whole stack (`clr` wipes, `depth` pushes the
    length, `print` traces the whole stack, `empty?` tests
    emptiness). No `R` frame: the program runs on exactly
    `s0`, so length-observing words hold. Queue stays framed
    (`qq`), input/oracle ignored (`∀ inp1 orc1`) like `Spec`.
    Axioms: standard only. -/
def SpecExact (prog : List Tok)
    (pre : Stack → Stack → In → Oracle → List IOAction → Defs → Prop)
    (post : Stack → Stack → List IOAction → Defs → Prop) : Prop :=
  ∀ (qq : Stack) (inp : In) (orc : Oracle) (acts : List IOAction) (defs : Defs)
    (s0 q0 : Stack),
    pre s0 q0 inp orc acts defs →
    ∃ (fuel : Nat) (s1 q1 : Stack) (acts1 : List IOAction) (defs1 : Defs),
      post s1 q1 acts1 defs1 ∧
      ∀ (inp1 : In) (orc1 : Oracle),
      execQ fuel prog s0 (q0 ++ qq) inp1 orc1 acts defs =
        (Outcome.ok s1 (q1 ++ qq) acts1, defs1)

/-- `SpecIO`: input/oracle-threading spec for `getc` (reads
    the input head), `clock`/`rand` (draw the oracle head).
    Stack/queue stay framed (`R`/`qq`); the given `inp`/`orc`
    (not fresh `∀`) is used, so the pre can pin `N :: tail`
    / `o :: tail`. The leftover stream is invisible in
    `Outcome.ok`, so the post only pins stacks/trace/defs.
    Axioms: standard only. -/
def SpecIO (prog : List Tok)
    (pre : Stack → Stack → In → Oracle → List IOAction → Defs → Prop)
    (post : Stack → Stack → List IOAction → Defs → Prop) : Prop :=
  ∀ (R qq : Stack) (acts : List IOAction) (defs : Defs)
    (s0 q0 : Stack) (inp : In) (orc : Oracle),
    pre s0 q0 inp orc acts defs →
    ∃ (fuel : Nat) (s1 q1 : Stack) (acts1 : List IOAction) (defs1 : Defs),
      post s1 q1 acts1 defs1 ∧
      execQ fuel prog (s0 ++ R) (q0 ++ qq) inp orc acts defs =
        (Outcome.ok (s1 ++ R) (q1 ++ qq) acts1, defs1)

/-- `SpecExit`: exit spec for `exit`. The program halts with
    `Outcome.exit code acts'`; the frame is discarded (like a
    wipe) and remaining tokens never run. Framed in input
    (`R`/`qq` quantified) but the post pins only the code,
    trace, and defs. Axioms: standard only. -/
def SpecExit (prog : List Tok)
    (pre : Stack → Stack → In → Oracle → List IOAction → Defs → Prop)
    (post : Int → List IOAction → Defs → Prop) : Prop :=
  ∀ (R qq : Stack) (inp : In) (orc : Oracle) (acts : List IOAction) (defs : Defs)
    (s0 q0 : Stack),
    pre s0 q0 inp orc acts defs →
    ∃ (fuel : Nat) (code : Int) (acts1 : List IOAction) (defs1 : Defs),
      post code acts1 defs1 ∧
      ∀ (inp1 : In) (orc1 : Oracle),
      execQ fuel prog (s0 ++ R) (q0 ++ qq) inp1 orc1 acts defs =
        (Outcome.exit code acts1, defs1)

/-- `Spec.seq`: compose two specs directly. The intermediate
    state is pinned by explicit equalities over `s1 q1 acts1 d1`
    (kept as `seq` implicits so `apply` unifies them): `h1`
    ends there, `h2` starts there. No explicit fuels appear:
    each spec supplies its own, combined via `execQ_append`.
    Stating the midpoint explicitly (instead of a bare `mid`
    predicate) keeps every leaf goal a concrete equality
    lambda, which is what `apply Spec.eval`/prims unify with.
    Posts take a single `Defs` (the final one); the initial
    `defs` is referenced through ghosts, so no threading is
    needed and `hp` fits the goal directly. -/
theorem Spec.seq {p1 p2 : List Tok}
    {pre : Stack → Stack → In → Oracle → List IOAction → Defs → Prop}
    {post : Stack → Stack → List IOAction → Defs → Prop}
    {s1 q1 : Stack} {acts1 : List IOAction} {d1 : Defs}
    (h1 : Spec p1 pre
      (fun s' q' acts' d' => s' = s1 ∧ q' = q1 ∧ acts' = acts1 ∧ d' = d1))
    (h2 : Spec p2
      (fun s q _ _ acts defs => s = s1 ∧ q = q1 ∧ acts = acts1 ∧ defs = d1)
      post) :
    Spec (p1 ++ p2) pre post := by
  intro R qq inp orc acts defs s q hpre
  obtain ⟨f1, t1, u1, b1, e1, hm, hu1⟩ := h1 R qq inp orc acts defs s q hpre
  rw [hm.1, hm.2.1, hm.2.2.1, hm.2.2.2] at hu1
  obtain ⟨f2, s2, q2, a2, d2, hp, hu2⟩ :=
    h2 R qq inp orc acts1 d1 s1 q1 ⟨rfl, rfl, rfl, rfl⟩
  exact ⟨f1 + f2 + 1, s2, q2, a2, d2, hp, fun inp1 orc1 =>
    execQ_append f1 p1 (s ++ R) (q ++ qq) inp1 orc1 acts defs
      (s1 ++ R) (q1 ++ qq) acts1 d1 (hu1 inp1 orc1) (fun i o => hu2 i o)⟩

/-- `Spec.conseq`: consequence rule — strengthen the
    precondition / weaken the postcondition around a spec.
    Available for manual reconciliation; `fbm_verify` does not
    fire it (its `hmain` subgoal would carry bare midpoint
    metavariables that no leaf can ground). -/
theorem Spec.conseq {prog : List Tok}
    {pre mid : Stack → Stack → In → Oracle → List IOAction → Defs → Prop}
    {post mid' : Stack → Stack → List IOAction → Defs → Prop}
    (h : Spec prog mid mid')
    (hpre : ∀ (s q : Stack) (inp : In) (orc : Oracle) (acts : List IOAction) (defs : Defs),
      pre s q inp orc acts defs → mid s q inp orc acts defs)
    (hpost : ∀ (s' q' : Stack) (acts' : List IOAction) (d' : Defs),
      mid' s' q' acts' d' → post s' q' acts' d') :
    Spec prog pre post := by
  intro R qq inp orc acts defs s0 q0 hpre0
  obtain ⟨f, s1, q1, a1, d1, hm, hu⟩ :=
    h R qq inp orc acts defs s0 q0 (hpre s0 q0 inp orc acts defs hpre0)
  exact ⟨f, s1, q1, a1, d1, hpost s1 q1 a1 d1 hm, hu⟩

/-- `Spec.nil`: the empty program preserves everything. Fires
    when `Spec.seq` splits off a trailing `[]`. -/
theorem Spec.nil {s0 q0 : Stack} {a0 : List IOAction} {d0 : Defs} :
    Spec []
    (fun s q _ _ acts defs => s = s0 ∧ q = q0 ∧ acts = a0 ∧ defs = d0)
    (fun s' q' acts' d' => s' = s0 ∧ q' = q0 ∧ acts' = a0 ∧ d' = d0) := by
  intro R qq inp orc acts defs s q hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨0, s0, q0, a0, d0, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ]⟩

/-- `Spec.frame`: a `Spec` already holds under any frame, so it
    holds under an extended frame by reassociation
    (`(s0 ++ R) ++ R' = s0 ++ (R ++ R')`). -/
theorem Spec.frame {prog : List Tok} {pre post}
    (h : Spec prog pre post) :
    Spec prog
      (fun s q inp orc acts defs =>
        ∃ s0 q0 R qq, s = s0 ++ R ∧ q = q0 ++ qq ∧ pre s0 q0 inp orc acts defs)
      (fun s' q' acts' d' =>
        ∃ s1 q1 R qq, s' = s1 ++ R ∧ q' = q1 ++ qq ∧ post s1 q1 acts' d') := by
  intro R qq inp orc acts defs s q hpre
  obtain ⟨s0, q0, R0, qq0, rfl, rfl, hpre0⟩ := hpre
  obtain ⟨fuel, s1, q1, acts1, defs1, hpost, hexec⟩ :=
    h (R0 ++ R) (qq0 ++ qq) inp orc acts defs s0 q0 hpre0
  exact ⟨fuel, s1 ++ R0, q1 ++ qq0, acts1, defs1,
    ⟨s1, q1, R0, qq0, rfl, rfl, hpost⟩, by
    intro inp1 orc1
    simpa [List.append_assoc] using hexec inp1 orc1⟩

/-- `Spec.eval`: running `[Tok.eval]` on a quotation code.
    The body must satisfy a `Spec` (uniform in leftover
    input/oracle, so it composes under `Spec.seq`). -/
theorem Spec.eval {qv : Int} {body : List Tok}
    {R S qq : Stack} {acts : List IOAction} {defs defs' : Defs}
    (hlookup : lookup defs qv = some body)
    (hbody : Spec body
      (fun s q _ _ acts' d => s = R ∧ q = qq ∧ acts' = acts ∧ d = defs)
      (fun s' q' acts' d' => s' = S ∧ q' = qq ∧ acts' = acts ∧ d' = defs')) :
    Spec [Tok.eval]
    (fun s q _ _ acts' d => s = qv :: R ∧ q = qq ∧ acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = S ∧ q' = qq ∧ acts' = acts ∧ d' = defs') := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  obtain ⟨fb, s1, q1, a1, d1, hpost, hue⟩ :=
    hbody Rr qq2 inp orc acts defs R qq ⟨rfl, rfl, rfl, rfl⟩
  refine ⟨fb + 1, s1, q1, a1, d1, hpost, ?_⟩
  intro inp1 orc1
  have hstack : ((qv :: R) ++ Rr) = (qv :: (R ++ Rr)) := by simp
  rw [hstack]
  simp only [execQ, hlookup]
  simpa using hue inp1 orc1

/-- `Spec.cons`: running `[Tok.cons]` allocates a fresh quotation
    `[push A, call B]` and pushes its code. Quotation literals
    in `@effect` words compile to `push lit` of a pre-allocated
    entry; `cons` itself keeps a direct `Spec` for the one word
    that allocates at runtime. -/
theorem Spec.cons {A B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.cons]
    (fun s q _ _ acts' d => s = B :: A :: R ∧ q = qq ∧ acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = (defs.length : Int) :: R ∧ q' = qq ∧ acts' = acts ∧
      d' = defs ++ [[Tok.push A, Tok.call B]]) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, (defs.length : Int) :: R, qq, acts, defs ++ [[Tok.push A, Tok.call B]],
    ⟨rfl, rfl, rfl, rfl⟩, by intro inp1 orc1; simp [execQ]⟩

/-- `Spec.call`: running `[Tok.call code]` splices the looked-up
    body. Uniform in leftover input/oracle when the body is. -/
theorem Spec.call {code : Int} {body : List Tok}
    {R S qq : Stack} {acts : List IOAction} {defs defs' : Defs}
    (hlookup : lookup defs code = some body)
    (hbody : Spec body
      (fun s q _ _ acts' d => s = R ∧ q = qq ∧ acts' = acts ∧ d = defs)
      (fun s' q' acts' d' => s' = S ∧ q' = qq ∧ acts' = acts ∧ d' = defs')) :
    Spec [Tok.call code]
    (fun s q _ _ acts' d => s = R ∧ q = qq ∧ acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = S ∧ q' = qq ∧ acts' = acts ∧ d' = defs') := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  obtain ⟨fb, s1, q1, a1, d1, hpost, hue⟩ :=
    hbody Rr qq2 inp orc acts defs R qq ⟨rfl, rfl, rfl, rfl⟩
  refine ⟨fb + 1, s1, q1, a1, d1, hpost, ?_⟩
  intro inp1 orc1
  simp only [execQ, hlookup]
  simpa using hue inp1 orc1

/-- Primitive `Spec` lemmas (Phase A): one token, fuel 1,
    equality pre/post. `apply Spec.push` etc. discharges leaves;
    computed comparisons (`gt`/`lt`/`eq`) pin the result inline
    as an `if` so `split` can reconcile downstream. -/
theorem Spec.push {n : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.push n]
    (fun s q _ _ acts' defs' => s = R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = n :: R ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, n :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem Spec.dup {A : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.dup]
    (fun s q _ _ acts' defs' => s = A :: R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = A :: A :: R ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, A :: A :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem Spec.swap {X Y : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.swap]
    (fun s q _ _ acts' defs' => s = Y :: X :: R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = X :: Y :: R ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, X :: Y :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem Spec.drop {A : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.drop]
    (fun s q _ _ acts' defs' => s = A :: R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = R ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem Spec.qpush {B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.qpush]
    (fun s q _ _ acts' defs' => s = B :: R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = R ∧ q' = B :: qq ∧ acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, R, B :: qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem Spec.qpull {B : Int} {S qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.qpull]
    (fun s q _ _ acts' defs' => s = S ∧ q = B :: qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = B :: S ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, B :: S, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem Spec.gt {A B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.gt]
    (fun s q _ _ acts' defs' => s = B :: A :: R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = (if A > B then 1 else 0) :: R ∧ q' = qq ∧
      acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, (if A > B then 1 else 0) :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem Spec.lt {A B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.lt]
    (fun s q _ _ acts' defs' => s = B :: A :: R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = (if A < B then 1 else 0) :: R ∧ q' = qq ∧
      acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, (if A < B then 1 else 0) :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem Spec.eq {A B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.eq]
    (fun s q _ _ acts' defs' => s = B :: A :: R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = (if A = B then 1 else 0) :: R ∧ q' = qq ∧
      acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, (if A = B then 1 else 0) :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem Spec.mul {A B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.mul]
    (fun s q _ _ acts' defs' => s = B :: A :: R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = (A * B) :: R ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, (A * B) :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

/-- Remaining pure-stack / arithmetic / bitwise / shift prims
    (Phase B): one token, fuel 1, equality pre/post. `add` /
    `sub` / `land` / `lor` / `shl` / `shr` compute via the
    `Interp` helpers (which `step` calls directly, so `simp`
    closes); `lnot` pins `-a - 1` (what `step` computes).
    `nop` preserves the stack. -/
theorem Spec.nop {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.nop]
    (fun s q _ _ acts' defs' => s = R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = R ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem Spec.add {A B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.add]
    (fun s q _ _ acts' defs' => s = B :: A :: R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = (A + B) :: R ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, (A + B) :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem Spec.sub {A B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.sub]
    (fun s q _ _ acts' defs' => s = B :: A :: R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = (A - B) :: R ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, (A - B) :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem Spec.land {A B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.land]
    (fun s q _ _ acts' defs' => s = B :: A :: R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = (_root_.land A B) :: R ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, (_root_.land A B) :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem Spec.lor {A B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.lor]
    (fun s q _ _ acts' defs' => s = B :: A :: R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = (_root_.lor A B) :: R ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, (_root_.lor A B) :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem Spec.lnot {A : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.lnot]
    (fun s q _ _ acts' defs' => s = A :: R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = (-A - 1) :: R ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, (-A - 1) :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem Spec.shl {A B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.shl]
    (fun s q _ _ acts' defs' => s = B :: A :: R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = (_root_.shl A B) :: R ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, (_root_.shl A B) :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem Spec.shr {A B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.shr]
    (fun s q _ _ acts' defs' => s = B :: A :: R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = (_root_.shr A B) :: R ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, (_root_.shr A B) :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

/-- `putc` / `putn`: pop the top value into the trace. The
    trace extension mentions only the popped value, so the
    spec stays frame-polymorphic (`acts ++ [putc N]`). -/
theorem Spec.putc {N : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.putc]
    (fun s q _ _ acts' defs' => s = N :: R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = R ∧ q' = qq ∧ acts' = acts ++ [IOAction.putc N] ∧
      d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, R, qq, acts ++ [IOAction.putc N], defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem Spec.putn {N : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    Spec [Tok.putn]
    (fun s q _ _ acts' defs' => s = N :: R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = R ∧ q' = qq ∧ acts' = acts ++ [IOAction.putn N] ∧
      d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, R, qq, acts ++ [IOAction.putn N], defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

/-- Guarded arithmetic (Phase B): `div` / `mod` fail on a zero
    divisor, `pow` on a negative exponent. The success specs
    take the discharged guard (`hne` / `hle`) like
    `Spec.cond_nonzero` takes `hf`; the `SpecErr` companions
    below prove the `else ERROR` branch. -/
theorem Spec.div {A B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs}
    (hne : B ≠ 0) :
    Spec [Tok.div]
    (fun s q _ _ acts' defs' => s = B :: A :: R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = (tdiv A B) :: R ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, (tdiv A B) :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step, hne]⟩

theorem Spec.mod {A B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs}
    (hne : B ≠ 0) :
    Spec [Tok.mod]
    (fun s q _ _ acts' defs' => s = B :: A :: R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = (tmod A B) :: R ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, (tmod A B) :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step, hne]⟩

theorem Spec.pow {A B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs}
    (hle : 0 ≤ B) :
    Spec [Tok.pow]
    (fun s q _ _ acts' defs' => s = B :: A :: R ∧ q = qq ∧ acts' = acts ∧ defs' = defs)
    (fun s' q' acts' d' => s' = (A ^ B.toNat) :: R ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  have hlt : ¬ B < 0 := by omega
  exact ⟨1, (A ^ B.toNat) :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step, hlt]⟩

/-- `SpecErr` leaves for the three guarded prims: with the
    guard holding (zero divisor / negative exponent) the
    single token fails. `clr`/`depth`/`print`/`empty?` use
    `SpecExact`, `getc`/`clock`/`rand` use `SpecIO`, and
    `exit` uses `SpecExit` (see above). -/
theorem SpecErr.div_err {A B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs}
    (h : B = 0) :
    SpecErr [Tok.div]
      (fun s q _ _ acts' defs' => s = B :: A :: R ∧ q = qq ∧ acts' = acts ∧
        defs' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd, h]
  exact ⟨1, defs, by simp [execQ, step]⟩

theorem SpecErr.mod_err {A B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs}
    (h : B = 0) :
    SpecErr [Tok.mod]
      (fun s q _ _ acts' defs' => s = B :: A :: R ∧ q = qq ∧ acts' = acts ∧
        defs' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd, h]
  exact ⟨1, defs, by simp [execQ, step]⟩

theorem SpecErr.pow_err {A B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs}
    (h : B < 0) :
    SpecErr [Tok.pow]
      (fun s q _ _ acts' defs' => s = B :: A :: R ∧ q = qq ∧ acts' = acts ∧
        defs' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, defs, by simp [execQ, step, h]⟩

/-- `SpecExact.seq`: compose two exact specs. The midpoint is
    pinned by explicit equalities (like `Spec.seq`); only the
    queue threads a frame (`qq`), the stack is exact. -/
theorem SpecExact.seq {p1 p2 : List Tok}
    {pre : Stack → Stack → In → Oracle → List IOAction → Defs → Prop}
    {post : Stack → Stack → List IOAction → Defs → Prop}
    {s1 q1 : Stack} {acts1 : List IOAction} {d1 : Defs}
    (h1 : SpecExact p1 pre
      (fun s' q' acts' d' => s' = s1 ∧ q' = q1 ∧ acts' = acts1 ∧ d' = d1))
    (h2 : SpecExact p2
      (fun s q _ _ acts defs => s = s1 ∧ q = q1 ∧ acts = acts1 ∧ defs = d1)
      post) :
    SpecExact (p1 ++ p2) pre post := by
  intro qq inp orc acts defs s q hpre
  obtain ⟨f1, t1, u1, b1, e1, hm, hu1⟩ := h1 qq inp orc acts defs s q hpre
  rw [hm.1, hm.2.1, hm.2.2.1, hm.2.2.2] at hu1
  obtain ⟨f2, s2, q2, a2, d2, hp, hu2⟩ :=
    h2 qq inp orc acts1 d1 s1 q1 ⟨rfl, rfl, rfl, rfl⟩
  exact ⟨f1 + f2 + 1, s2, q2, a2, d2, hp, fun inp1 orc1 =>
    execQ_append f1 p1 s (q ++ qq) inp1 orc1 acts defs
      s1 (q1 ++ qq) acts1 d1 (hu1 inp1 orc1) (fun i o => hu2 i o)⟩

/-- `SpecExact.nil`: the empty program preserves everything. -/
theorem SpecExact.nil {s0 q0 : Stack} {a0 : List IOAction} {d0 : Defs} :
    SpecExact []
    (fun s q _ _ acts defs => s = s0 ∧ q = q0 ∧ acts = a0 ∧ defs = d0)
    (fun s' q' acts' d' => s' = s0 ∧ q' = q0 ∧ acts' = a0 ∧ d' = d0) := by
  intro qq inp orc acts defs s q hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨0, s0, q0, a0, d0, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ]⟩

/-- Exact-stack leaves: `clr` wipes, `depth` pushes the
    length, `print` traces the whole stack. `push`/`eq` are
    also exact (for peeling `empty?` = `depth` + `push 0` +
    `eq` entirely within `SpecExact`). -/
theorem SpecExact.clr {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    SpecExact [Tok.clr]
    (fun s q _ _ acts' d => s = R ∧ q = qq ∧ acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = [] ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, [], qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem SpecExact.depth {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    SpecExact [Tok.depth]
    (fun s q _ _ acts' d => s = R ∧ q = qq ∧ acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = ((R.length : Int) :: R) ∧ q' = qq ∧
      acts' = acts ∧ d' = defs) := by
  intro qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, ((R.length : Int) :: R), qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem SpecExact.print {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    SpecExact [Tok.print]
    (fun s q _ _ acts' d => s = R ∧ q = qq ∧ acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = R ∧ q' = qq ∧
      acts' = acts ++ [IOAction.print R] ∧ d' = defs) := by
  intro qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, R, qq, acts ++ [IOAction.print R], defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem SpecExact.push {n : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    SpecExact [Tok.push n]
    (fun s q _ _ acts' d => s = R ∧ q = qq ∧ acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = n :: R ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, n :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem SpecExact.eq {A B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    SpecExact [Tok.eq]
    (fun s q _ _ acts' d => s = B :: A :: R ∧ q = qq ∧ acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = (if A = B then 1 else 0) :: R ∧ q' = qq ∧
      acts' = acts ∧ d' = defs) := by
  intro qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, (if A = B then 1 else 0) :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

/-- `SpecIO.getc`: push the input head. Holds for any `N`
    (the byte range `0 <= N ∧ N < 256` rides along as an
    unused `_hbyte` hypothesis in generated theorems). -/
theorem SpecIO.getc {N : Int} {R qq : Stack} {tail : In}
    {acts : List IOAction} {defs : Defs} :
    SpecIO [Tok.getc]
    (fun s q inp _ acts' d => s = R ∧ q = qq ∧ inp = N :: tail ∧
      acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = N :: R ∧ q' = qq ∧ acts' = acts ∧
      d' = defs) := by
  intro Rr qq2 acts0 defs0 s0 q0 inp0 orc0 hpre
  obtain ⟨hs, hq, hi, ha, hd⟩ := hpre
  rw [hs, hq, hi, ha, hd]
  exact ⟨1, N :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by simp [execQ, step]⟩

/-- `SpecIO.clock`: push the oracle head. -/
theorem SpecIO.clock {o : Int} {R qq : Stack} {tail : Oracle}
    {acts : List IOAction} {defs : Defs} :
    SpecIO [Tok.clock]
    (fun s q _ orc acts' d => s = R ∧ q = qq ∧ orc = o :: tail ∧
      acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = o :: R ∧ q' = qq ∧ acts' = acts ∧
      d' = defs) := by
  intro Rr qq2 acts0 defs0 s0 q0 inp0 orc0 hpre
  obtain ⟨hs, hq, ho, ha, hd⟩ := hpre
  rw [hs, hq, ho, ha, hd]
  exact ⟨1, o :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by simp [execQ, step]⟩

/-- `SpecIO.rand`: push `o % max` with its range. The guard
    `0 < max` arrives as an explicit hypothesis (closed from
    the outer `hw` by `assumption`/`omega`); the range rides
    in the post, proved once here by the `Int.emod` lemmas. -/
theorem SpecIO.rand {M o : Int} {R qq : Stack} {tail : Oracle}
    {acts : List IOAction} {defs : Defs} (h : 0 < M) :
    SpecIO [Tok.rand]
    (fun s q _ orc acts' d => s = M :: R ∧ q = qq ∧ orc = o :: tail ∧
      acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = (o % M) :: R ∧ q' = qq ∧ acts' = acts ∧
      d' = defs ∧ 0 ≤ o % M ∧ o % M < M) := by
  intro Rr qq2 acts0 defs0 s0 q0 inp0 orc0 hpre
  obtain ⟨hs, hq, ho, ha, hd⟩ := hpre
  rw [hs, hq, ho, ha, hd]
  have hne : M ≠ 0 := by omega
  have hnonneg : 0 ≤ o % M := Int.emod_nonneg o hne
  have hlt : o % M < M := by
    have h := Int.emod_lt o hne
    rwa [Int.natAbs_of_nonneg (by omega : 0 ≤ M)] at h
  exact ⟨1, (o % M) :: R, qq, acts, defs,
    ⟨rfl, rfl, rfl, rfl, hnonneg, hlt⟩,
    by simp [execQ, step]⟩

/-- `SpecExit.exit`: halt with the top input as the code. -/
theorem SpecExit.exit {N : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    SpecExit [Tok.exit]
    (fun s q _ _ acts' d => s = N :: R ∧ q = qq ∧ acts' = acts ∧ d = defs)
    (fun code acts' d' => code = N ∧ acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, N, acts, defs, ⟨rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ]⟩

/-- `Spec.cond` (nonzero): `?` runs the quotation body when the
    flag is decided nonzero. -/
theorem Spec.cond_nonzero {qv F : Int} {body : List Tok}
    {R S qq : Stack} {acts : List IOAction} {defs defs' : Defs}
    (hf : F ≠ 0) (hlookup : lookup defs qv = some body)
    (hbody : Spec body
      (fun s q _ _ acts' d => s = R ∧ q = qq ∧ acts' = acts ∧ d = defs)
      (fun s' q' acts' d' => s' = S ∧ q' = qq ∧ acts' = acts ∧ d' = defs')) :
    Spec [Tok.cond]
    (fun s q _ _ acts' d => s = qv :: F :: R ∧ q = qq ∧ acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = S ∧ q' = qq ∧ acts' = acts ∧ d' = defs') := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  obtain ⟨fb, s1, q1, a1, d1, hpost, hue⟩ :=
    hbody Rr qq2 inp orc acts defs R qq ⟨rfl, rfl, rfl, rfl⟩
  refine ⟨fb + 1, s1, q1, a1, d1, hpost, ?_⟩
  intro inp1 orc1
  have hstack : ((qv :: F :: R) ++ Rr) = (qv :: F :: (R ++ Rr)) := by simp
  rw [hstack]
  simp [execQ, hlookup, hf]
  simpa using hue inp1 orc1

/-- `Spec.cond` (zero): `?` drops the quotation and keeps `R`
    when the flag is decided zero. -/
theorem Spec.cond_zero {qv F : Int} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} (hf : F = 0) :
    Spec [Tok.cond]
    (fun s q _ _ acts' d => s = qv :: F :: R ∧ q = qq ∧ acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = R ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  refine ⟨1, R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩, ?_⟩
  intro inp1 orc1
  have hstack : ((qv :: F :: R) ++ Rr) = (qv :: F :: (R ++ Rr)) := by simp
  rw [hstack]
  simp [execQ, hf]

/-- `Spec.cond_if`: `?` on a computed flag. The flag value is an
    `if` inline (produced by a comparison prim upstream); the
    post pins both branches inline. Proved once by `by_cases`
    on the condition; `fbm_verify` just applies it, reconciling
    the `if`-shaped post via `Spec.conseq`. -/
theorem Spec.cond_if {qv : Int} {c : Prop} [Decidable c] {body : List Tok}
    {R S qq : Stack} {acts : List IOAction} {defs defs' : Defs}
    (hlookup : lookup defs qv = some body)
    (hbody : Spec body
      (fun s q _ _ acts' d => s = R ∧ q = qq ∧ acts' = acts ∧ d = defs)
      (fun s' q' acts' d' => s' = S ∧ q' = qq ∧ acts' = acts ∧ d' = defs')) :
    Spec [Tok.cond]
    (fun s q _ _ acts' d => s = qv :: (if c then 1 else 0) :: R ∧ q = qq ∧ acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = (if c then S else R) ∧ q' = qq ∧ acts' = acts ∧
      d' = (if c then defs' else defs)) := by
  intro Rr qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  by_cases hc : c
  · have hflag : (if c then (1 : Int) else 0) = 1 := by simp [hc]
    have hS : (if c then S else R) = S := by simp [hc]
    have hD : (if c then defs' else defs) = defs' := by simp [hc]
    obtain ⟨fb, s1, q1, a1, d1, hpost, hue⟩ :=
      hbody Rr qq2 inp orc acts defs R qq ⟨rfl, rfl, rfl, rfl⟩
    rw [hflag]
    refine ⟨fb + 1, s1, q1, a1, d1, ?_, ?_⟩
    · rw [hS, hD]; exact hpost
    · intro inp1 orc1
      have hstack : ((qv :: (1 : Int) :: R) ++ Rr) = (qv :: 1 :: (R ++ Rr)) := by simp
      rw [hstack]
      simp [execQ, hlookup]
      simpa using hue inp1 orc1
  · have hflag : (if c then (1 : Int) else 0) = 0 := by simp [hc]
    have hS : (if c then S else R) = R := by simp [hc]
    have hD : (if c then defs' else defs) = defs := by simp [hc]
    rw [hflag]
    refine ⟨1, R, qq, acts, defs, ?_, ?_⟩
    · rw [hS, hD]; exact ⟨rfl, rfl, rfl, rfl⟩
    · intro inp1 orc1
      have hstack : ((qv :: (0 : Int) :: R) ++ Rr) = (qv :: 0 :: (R ++ Rr)) := by simp
      rw [hstack]
      simp [execQ]

/- Head-peeling continuation lemmas (deterministic forward
   `fbm_verify`): each peels one head token `[t]` off
   `([t] ++ rest)`, computing the exact concrete mid-state from
   the pre, and leaves a single `Spec rest mid post` subgoal
   with zero metavariables. No implicit midpoints: every ghost
   (`A`, `R`, `S`, ...) is pinned by the pre (prims) or shared
explicitly between the two `Spec` premises (`eval`/`call`/
   nonzero-`cond`, whose body proof grounds them). All are
   one-line `Spec.seq` compositions over the leaf lemmas. -/
theorem Spec.push_head {n : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = n :: R ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    Spec ([Tok.push n] ++ rest)
      (fun s q _ _ a d => s = R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.push h

theorem Spec.dup_head {A : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = A :: A :: R ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    Spec ([Tok.dup] ++ rest)
      (fun s q _ _ a d => s = A :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.dup h

theorem Spec.swap_head {X Y : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = X :: Y :: R ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    Spec ([Tok.swap] ++ rest)
      (fun s q _ _ a d => s = Y :: X :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.swap h

theorem Spec.drop_head {A : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = R ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    Spec ([Tok.drop] ++ rest)
      (fun s q _ _ a d => s = A :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.drop h

theorem Spec.qpush_head {B : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = R ∧ q = B :: qq ∧ a = acts ∧ d = defs) post) :
    Spec ([Tok.qpush] ++ rest)
      (fun s q _ _ a d => s = B :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.qpush h

theorem Spec.qpull_head {B : Int} {rest : List Tok} {S qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = B :: S ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    Spec ([Tok.qpull] ++ rest)
      (fun s q _ _ a d => s = S ∧ q = B :: qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.qpull h

theorem Spec.gt_head {A B : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = (if A > B then 1 else 0) :: R ∧ q = qq ∧
        a = acts ∧ d = defs) post) :
    Spec ([Tok.gt] ++ rest)
      (fun s q _ _ a d => s = B :: A :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.gt h

theorem Spec.lt_head {A B : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = (if A < B then 1 else 0) :: R ∧ q = qq ∧
        a = acts ∧ d = defs) post) :
    Spec ([Tok.lt] ++ rest)
      (fun s q _ _ a d => s = B :: A :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.lt h

theorem Spec.eq_head {A B : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = (if A = B then 1 else 0) :: R ∧ q = qq ∧
        a = acts ∧ d = defs) post) :
    Spec ([Tok.eq] ++ rest)
      (fun s q _ _ a d => s = B :: A :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.eq h

theorem Spec.mul_head {A B : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = (A * B) :: R ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    Spec ([Tok.mul] ++ rest)
      (fun s q _ _ a d => s = B :: A :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.mul h

theorem Spec.nop_head {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = R ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    Spec ([Tok.nop] ++ rest)
      (fun s q _ _ a d => s = R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.nop h

theorem Spec.add_head {A B : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = (A + B) :: R ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    Spec ([Tok.add] ++ rest)
      (fun s q _ _ a d => s = B :: A :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.add h

theorem Spec.sub_head {A B : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = (A - B) :: R ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    Spec ([Tok.sub] ++ rest)
      (fun s q _ _ a d => s = B :: A :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.sub h

theorem Spec.land_head {A B : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = (_root_.land A B) :: R ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    Spec ([Tok.land] ++ rest)
      (fun s q _ _ a d => s = B :: A :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.land h

theorem Spec.lor_head {A B : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = (_root_.lor A B) :: R ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    Spec ([Tok.lor] ++ rest)
      (fun s q _ _ a d => s = B :: A :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.lor h

theorem Spec.lnot_head {A : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = (-A - 1) :: R ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    Spec ([Tok.lnot] ++ rest)
      (fun s q _ _ a d => s = A :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.lnot h

theorem Spec.shl_head {A B : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = (_root_.shl A B) :: R ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    Spec ([Tok.shl] ++ rest)
      (fun s q _ _ a d => s = B :: A :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.shl h

theorem Spec.shr_head {A B : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = (_root_.shr A B) :: R ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    Spec ([Tok.shr] ++ rest)
      (fun s q _ _ a d => s = B :: A :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.shr h

theorem Spec.putc_head {N : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = R ∧ q = qq ∧ a = acts ++ [IOAction.putc N] ∧
        d = defs) post) :
    Spec ([Tok.putc] ++ rest)
      (fun s q _ _ a d => s = N :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.putc h

theorem Spec.putn_head {N : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = R ∧ q = qq ∧ a = acts ++ [IOAction.putn N] ∧
        d = defs) post) :
    Spec ([Tok.putn] ++ rest)
      (fun s q _ _ a d => s = N :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.putn h

theorem Spec.div_head {A B : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (hne : B ≠ 0)
    (h : Spec rest
      (fun s q _ _ a d => s = (tdiv A B) :: R ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    Spec ([Tok.div] ++ rest)
      (fun s q _ _ a d => s = B :: A :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq (Spec.div hne) h

theorem Spec.mod_head {A B : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (hne : B ≠ 0)
    (h : Spec rest
      (fun s q _ _ a d => s = (tmod A B) :: R ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    Spec ([Tok.mod] ++ rest)
      (fun s q _ _ a d => s = B :: A :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq (Spec.mod hne) h

theorem Spec.pow_head {A B : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (hle : 0 ≤ B)
    (h : Spec rest
      (fun s q _ _ a d => s = (A ^ B.toNat) :: R ∧ q = qq ∧ a = acts ∧
        d = defs) post) :
    Spec ([Tok.pow] ++ rest)
      (fun s q _ _ a d => s = B :: A :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq (Spec.pow hle) h

theorem Spec.cons_head {A B : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : Spec rest
      (fun s q _ _ a d => s = (defs.length : Int) :: R ∧ q = qq ∧ a = acts ∧
        d = defs ++ [[Tok.push A, Tok.call B]]) post) :
    Spec ([Tok.cons] ++ rest)
      (fun s q _ _ a d => s = B :: A :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq Spec.cons h

theorem Spec.eval_head {qv : Int} {body rest : List Tok}
    {R S qq : Stack} {acts : List IOAction} {defs defs' : Defs} {post}
    (hlookup : lookup defs qv = some body)
    (hbody : Spec body
      (fun s q _ _ a d => s = R ∧ q = qq ∧ a = acts ∧ d = defs)
      (fun s' q' a d => s' = S ∧ q' = qq ∧ a = acts ∧ d = defs'))
    (hrest : Spec rest
      (fun s q _ _ a d => s = S ∧ q = qq ∧ a = acts ∧ d = defs') post) :
    Spec ([Tok.eval] ++ rest)
      (fun s q _ _ a d => s = qv :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq (Spec.eval hlookup hbody) hrest

theorem Spec.call_head {code : Int} {body rest : List Tok}
    {R S qq : Stack} {acts : List IOAction} {defs defs' : Defs} {post}
    (hlookup : lookup defs code = some body)
    (hbody : Spec body
      (fun s q _ _ a d => s = R ∧ q = qq ∧ a = acts ∧ d = defs)
      (fun s' q' a d => s' = S ∧ q' = qq ∧ a = acts ∧ d = defs'))
    (hrest : Spec rest
      (fun s q _ _ a d => s = S ∧ q = qq ∧ a = acts ∧ d = defs') post) :
    Spec ([Tok.call code] ++ rest)
      (fun s q _ _ a d => s = R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq (Spec.call hlookup hbody) hrest

theorem Spec.cond_zero_head {qv F : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post} (hf : F = 0)
    (hrest : Spec rest
      (fun s q _ _ a d => s = R ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    Spec ([Tok.cond] ++ rest)
      (fun s q _ _ a d => s = qv :: F :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq (Spec.cond_zero hf) hrest

theorem Spec.cond_nonzero_head {qv F : Int} {body rest : List Tok}
    {R S qq : Stack} {acts : List IOAction} {defs defs' : Defs} {post}
    (hf : F ≠ 0) (hlookup : lookup defs qv = some body)
    (hbody : Spec body
      (fun s q _ _ a d => s = R ∧ q = qq ∧ a = acts ∧ d = defs)
      (fun s' q' a d => s' = S ∧ q' = qq ∧ a = acts ∧ d = defs'))
    (hrest : Spec rest
      (fun s q _ _ a d => s = S ∧ q = qq ∧ a = acts ∧ d = defs') post) :
    Spec ([Tok.cond] ++ rest)
      (fun s q _ _ a d => s = qv :: F :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  Spec.seq (Spec.cond_nonzero hf hlookup hbody) hrest

/-- `SpecExact` head-peeling continuations (for `fbm_verify`):
    peel one head token off `([t] ++ rest)`, computing the
    exact mid-state from the pre. -/
theorem SpecExact.clr_head {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : SpecExact rest
      (fun s q _ _ a d => s = [] ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    SpecExact ([Tok.clr] ++ rest)
      (fun s q _ _ a d => s = R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  SpecExact.seq SpecExact.clr h

theorem SpecExact.depth_head {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : SpecExact rest
      (fun s q _ _ a d => s = ((R.length : Int) :: R) ∧ q = qq ∧
        a = acts ∧ d = defs) post) :
    SpecExact ([Tok.depth] ++ rest)
      (fun s q _ _ a d => s = R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  SpecExact.seq SpecExact.depth h

theorem SpecExact.print_head {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : SpecExact rest
      (fun s q _ _ a d => s = R ∧ q = qq ∧
        a = acts ++ [IOAction.print R] ∧ d = defs) post) :
    SpecExact ([Tok.print] ++ rest)
      (fun s q _ _ a d => s = R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  SpecExact.seq SpecExact.print h

theorem SpecExact.push_head {n : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : SpecExact rest
      (fun s q _ _ a d => s = n :: R ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    SpecExact ([Tok.push n] ++ rest)
      (fun s q _ _ a d => s = R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  SpecExact.seq SpecExact.push h

theorem SpecExact.eq_head {A B : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : SpecExact rest
      (fun s q _ _ a d => s = (if A = B then 1 else 0) :: R ∧ q = qq ∧
        a = acts ∧ d = defs) post) :
    SpecExact ([Tok.eq] ++ rest)
      (fun s q _ _ a d => s = B :: A :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  SpecExact.seq SpecExact.eq h

/-- `SpecExact` leaves and heads for frame-polymorphic tokens used inside
    exact programs (v37, `pushtop`): `gt` (branch flag), `swap`/`qpush` /
    `qpull` (queue shuffles), `eval` / `call` (quotation recursion), and
    `cond` (branch). Proved like their `Spec` counterparts but for
    `SpecExact` (exact stack, framed queue). Axioms: standard only. -/
theorem SpecExact.gt {A B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    SpecExact [Tok.gt]
    (fun s q _ _ acts' d => s = B :: A :: R ∧ q = qq ∧ acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = (if A > B then 1 else 0) :: R ∧ q' = qq ∧
      acts' = acts ∧ d' = defs) := by
  intro qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, (if A > B then 1 else 0) :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem SpecExact.gt_head {A B : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : SpecExact rest
      (fun s q _ _ a d => s = (if A > B then 1 else 0) :: R ∧ q = qq ∧
        a = acts ∧ d = defs) post) :
    SpecExact ([Tok.gt] ++ rest)
      (fun s q _ _ a d => s = B :: A :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  SpecExact.seq SpecExact.gt h

theorem SpecExact.swap {X Y : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    SpecExact [Tok.swap]
    (fun s q _ _ acts' d => s = Y :: X :: R ∧ q = qq ∧ acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = X :: Y :: R ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, X :: Y :: R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem SpecExact.swap_head {X Y : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : SpecExact rest
      (fun s q _ _ a d => s = X :: Y :: R ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    SpecExact ([Tok.swap] ++ rest)
      (fun s q _ _ a d => s = Y :: X :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  SpecExact.seq SpecExact.swap h

theorem SpecExact.qpush {B : Int} {R qq : Stack} {acts : List IOAction} {defs : Defs} :
    SpecExact [Tok.qpush]
    (fun s q _ _ acts' d => s = B :: R ∧ q = qq ∧ acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = R ∧ q' = B :: qq ∧ acts' = acts ∧ d' = defs) := by
  intro qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, R, B :: qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem SpecExact.qpush_head {B : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post}
    (h : SpecExact rest
      (fun s q _ _ a d => s = R ∧ q = B :: qq ∧ a = acts ∧ d = defs) post) :
    SpecExact ([Tok.qpush] ++ rest)
      (fun s q _ _ a d => s = B :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  SpecExact.seq SpecExact.qpush h

theorem SpecExact.qpull {B : Int} {S qq : Stack} {acts : List IOAction} {defs : Defs} :
    SpecExact [Tok.qpull]
    (fun s q _ _ acts' d => s = S ∧ q = B :: qq ∧ acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = B :: S ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  exact ⟨1, B :: S, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩,
    by intro inp1 orc1; simp [execQ, step]⟩

theorem SpecExact.qpull_head {B : Int} {S qq : Stack} {rest : List Tok}
    {acts : List IOAction} {defs : Defs} {post}
    (h : SpecExact rest
      (fun s q _ _ a d => s = B :: S ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    SpecExact ([Tok.qpull] ++ rest)
      (fun s q _ _ a d => s = S ∧ q = B :: qq ∧ a = acts ∧ d = defs) post :=
  SpecExact.seq SpecExact.qpull h

theorem SpecExact.eval {qv : Int} {body : List Tok}
    {R S qq : Stack} {acts : List IOAction} {defs defs' : Defs}
    (hlookup : lookup defs qv = some body)
    (hbody : SpecExact body
      (fun s q _ _ acts' d => s = R ∧ q = qq ∧ acts' = acts ∧ d = defs)
      (fun s' q' acts' d' => s' = S ∧ q' = qq ∧ acts' = acts ∧ d' = defs')) :
    SpecExact [Tok.eval]
    (fun s q _ _ acts' d => s = qv :: R ∧ q = qq ∧ acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = S ∧ q' = qq ∧ acts' = acts ∧ d' = defs') := by
  intro qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  obtain ⟨fb, s1, q1, a1, d1, hpost, hue⟩ :=
    hbody qq2 inp orc acts defs R qq ⟨rfl, rfl, rfl, rfl⟩
  refine ⟨fb + 1, s1, q1, a1, d1, hpost, ?_⟩
  intro inp1 orc1
  have hstack : ((qv :: R) ++ []) = (qv :: (R ++ [])) := by simp
  simp only [execQ, hlookup]
  simpa using hue inp1 orc1

theorem SpecExact.eval_head {qv : Int} {body rest : List Tok}
    {R S qq : Stack} {acts : List IOAction} {defs defs' : Defs} {post}
    (hlookup : lookup defs qv = some body)
    (hbody : SpecExact body
      (fun s q _ _ a d => s = R ∧ q = qq ∧ a = acts ∧ d = defs)
      (fun s' q' a d => s' = S ∧ q' = qq ∧ a = acts ∧ d = defs'))
    (hrest : SpecExact rest
      (fun s q _ _ a d => s = S ∧ q = qq ∧ a = acts ∧ d = defs') post) :
    SpecExact ([Tok.eval] ++ rest)
      (fun s q _ _ a d => s = qv :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  SpecExact.seq (SpecExact.eval hlookup hbody) hrest

theorem SpecExact.call {code : Int} {body : List Tok}
    {R S qq : Stack} {acts : List IOAction} {defs defs' : Defs}
    (hlookup : lookup defs code = some body)
    (hbody : SpecExact body
      (fun s q _ _ acts' d => s = R ∧ q = qq ∧ acts' = acts ∧ d = defs)
      (fun s' q' acts' d' => s' = S ∧ q' = qq ∧ acts' = acts ∧ d' = defs')) :
    SpecExact [Tok.call code]
    (fun s q _ _ acts' d => s = R ∧ q = qq ∧ acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = S ∧ q' = qq ∧ acts' = acts ∧ d' = defs') := by
  intro qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  obtain ⟨fb, s1, q1, a1, d1, hpost, hue⟩ :=
    hbody qq2 inp orc acts defs R qq ⟨rfl, rfl, rfl, rfl⟩
  refine ⟨fb + 1, s1, q1, a1, d1, hpost, ?_⟩
  intro inp1 orc1
  simp only [execQ, hlookup]
  simpa using hue inp1 orc1

theorem SpecExact.call_head {code : Int} {body rest : List Tok}
    {R S qq : Stack} {acts : List IOAction} {defs defs' : Defs} {post}
    (hlookup : lookup defs code = some body)
    (hbody : SpecExact body
      (fun s q _ _ a d => s = R ∧ q = qq ∧ a = acts ∧ d = defs)
      (fun s' q' a d => s' = S ∧ q' = qq ∧ a = acts ∧ d = defs'))
    (hrest : SpecExact rest
      (fun s q _ _ a d => s = S ∧ q = qq ∧ a = acts ∧ d = defs') post) :
    SpecExact ([Tok.call code] ++ rest)
      (fun s q _ _ a d => s = R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  SpecExact.seq (SpecExact.call hlookup hbody) hrest

theorem SpecExact.cond_nonzero {qv F : Int} {body : List Tok}
    {R S qq : Stack} {acts : List IOAction} {defs defs' : Defs}
    (hf : F ≠ 0) (hlookup : lookup defs qv = some body)
    (hbody : SpecExact body
      (fun s q _ _ acts' d => s = R ∧ q = qq ∧ acts' = acts ∧ d = defs)
      (fun s' q' acts' d' => s' = S ∧ q' = qq ∧ acts' = acts ∧ d' = defs')) :
    SpecExact [Tok.cond]
    (fun s q _ _ acts' d => s = qv :: F :: R ∧ q = qq ∧ acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = S ∧ q' = qq ∧ acts' = acts ∧ d' = defs') := by
  intro qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  obtain ⟨fb, s1, q1, a1, d1, hpost, hue⟩ :=
    hbody qq2 inp orc acts defs R qq ⟨rfl, rfl, rfl, rfl⟩
  refine ⟨fb + 1, s1, q1, a1, d1, hpost, ?_⟩
  intro inp1 orc1
  simp [execQ, hlookup, hf]
  simpa using hue inp1 orc1

theorem SpecExact.cond_zero {qv F : Int} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} (hf : F = 0) :
    SpecExact [Tok.cond]
    (fun s q _ _ acts' d => s = qv :: F :: R ∧ q = qq ∧ acts' = acts ∧ d = defs)
    (fun s' q' acts' d' => s' = R ∧ q' = qq ∧ acts' = acts ∧ d' = defs) := by
  intro qq2 inp orc acts0 defs0 s0 q0 hpre
  obtain ⟨hs, hq, ha, hd⟩ := hpre
  rw [hs, hq, ha, hd]
  refine ⟨1, R, qq, acts, defs, ⟨rfl, rfl, rfl, rfl⟩, ?_⟩
  intro inp1 orc1
  simp [execQ, hf]

theorem SpecExact.cond_nonzero_head {qv F : Int} {body rest : List Tok}
    {R S qq : Stack} {acts : List IOAction} {defs defs' : Defs} {post}
    (hf : F ≠ 0) (hlookup : lookup defs qv = some body)
    (hbody : SpecExact body
      (fun s q _ _ a d => s = R ∧ q = qq ∧ a = acts ∧ d = defs)
      (fun s' q' a d => s' = S ∧ q' = qq ∧ a = acts ∧ d = defs'))
    (hrest : SpecExact rest
      (fun s q _ _ a d => s = S ∧ q = qq ∧ a = acts ∧ d = defs') post) :
    SpecExact ([Tok.cond] ++ rest)
      (fun s q _ _ a d => s = qv :: F :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  SpecExact.seq (SpecExact.cond_nonzero hf hlookup hbody) hrest

theorem SpecExact.cond_zero_head {qv F : Int} {rest : List Tok} {R qq : Stack}
    {acts : List IOAction} {defs : Defs} {post} (hf : F = 0)
    (hrest : SpecExact rest
      (fun s q _ _ a d => s = R ∧ q = qq ∧ a = acts ∧ d = defs) post) :
    SpecExact ([Tok.cond] ++ rest)
      (fun s q _ _ a d => s = qv :: F :: R ∧ q = qq ∧ a = acts ∧ d = defs) post :=
  SpecExact.seq (SpecExact.cond_zero hf) hrest

/-- Base case: the empty program preserves everything, so a
    `Spec []` goal follows from the pure implication
    `pre → post`. `fbm_verify` discharges the implication by
    intro + `assumption`/`simp_all`/`omega`/`decide` (branch
    decisions in context reconcile computed vs stated posts). -/
theorem Spec.nil_close {pre : Stack → Stack → In → Oracle → List IOAction → Defs → Prop}
    {post : Stack → Stack → List IOAction → Defs → Prop}
    (h : ∀ (s q : Stack) (inp : In) (orc : Oracle) (acts : List IOAction) (defs : Defs),
      pre s q inp orc acts defs → post s q acts defs) :
    Spec [] pre post := by
  intro R qq inp orc acts defs s q hpre
  exact ⟨0, s, q, acts, defs, h s q inp orc acts defs hpre,
    by intro inp1 orc1; simp [execQ]⟩

/-- Base case for `SpecExact`: `SpecExact []` follows from
    `pre → post` (same dischargers as `Spec.nil_close`). -/
theorem SpecExact.nil_close
    {pre : Stack → Stack → In → Oracle → List IOAction → Defs → Prop}
    {post : Stack → Stack → List IOAction → Defs → Prop}
    (h : ∀ (s q : Stack) (inp : In) (orc : Oracle) (acts : List IOAction) (defs : Defs),
      pre s q inp orc acts defs → post s q acts defs) :
    SpecExact [] pre post := by
  intro qq inp orc acts defs s q hpre
  exact ⟨0, s, q, acts, defs, h s q inp orc acts defs hpre,
    by intro inp1 orc1; simp [execQ]⟩

/- Iteration and range helpers (complete-core-ff-effects Phase 1):
   `_loop` executes an arbitrary quotation `[B]` `N` times (`N ≥ 0`).
   `SpecIter` folds a Lean endofunction on stacks `n` times so
   `_loop_effect`, `loop_effect`, `times_effect`, and `seq_effect`
   state clean contracts; `intRange` builds the concrete integer
   lists that `range_effect` and `count_effect` instantiate with
   `succ`. Axioms: standard only. -/
def SpecIter : Nat → (Stack → Stack) → Stack → Stack
  | 0, _, s => s
  | n + 1, f, s => f (SpecIter n f s)

theorem SpecIter_zero (f : Stack → Stack) (s : Stack) :
    SpecIter 0 f s = s := rfl

theorem SpecIter_succ (n : Nat) (f : Stack → Stack) (s : Stack) :
    SpecIter (n + 1) f s = f (SpecIter n f s) := rfl

theorem SpecIter_add (m n : Nat) (f : Stack → Stack) (s : Stack) :
    SpecIter (m + n) f s = SpecIter m f (SpecIter n f s) := by
  induction m generalizing s with
  | zero => simp [SpecIter]
  | succ k ih =>
    have h : k + 1 + n = (k + n) + 1 := by omega
    rw [h]
    simp [SpecIter_succ, ih]

/-- `SpecIterN f n a` iterates a single-value map `f : Int → Int`
    `n` times starting from `a`. This is the form `_loop`'s
    contract uses: the quotation `[B]` maps the accumulator `X`
    to `f X` (rest and queue preserved), so after `N` iterations
    the accumulator is `SpecIterN f N.toNat A`. -/
def SpecIterN (f : Int → Int) : Nat → Int → Int
  | 0, a => a
  | n + 1, a => f (SpecIterN f n a)

theorem SpecIterN_zero (f : Int → Int) (a : Int) :
    SpecIterN f 0 a = a := rfl

theorem SpecIterN_succ (n : Nat) (f : Int → Int) (a : Int) :
    SpecIterN f (n + 1) a = f (SpecIterN f n a) := rfl

/-- One `_loop` iteration step on stacks: `B` maps `X :: r` to
    `(F X) :: X :: r` (pushes `F X` on top, preserves `X` and the
    rest — the contract of a functional quotation slot
    `[X -- F X]`, e.g. `succ`). -/
def SpecPush1 (F : Int → Int) : Stack → Stack
  | [] => []
  | x :: r => (F x) :: x :: r

/-- `_loop`'s accumulator history: `n` iterations of `B` starting
    from `A :: R0`, outermost-first. `SpecHist2 F 0 A R0 = [A] ++ R0`
    and each step pushes the next value on top, so
    `SpecHist2 succ 4 3 [] = [7, 6, 5, 4, 3]` (top-first), i.e.
    `range 3 7` pushes `3, 4, 5, 6, 7`. -/
def SpecHist2 (F : Int → Int) (n : Nat) (A : Int) (R0 : Stack) : Stack :=
  SpecIter n (SpecPush1 F) (A :: R0)

@[simp] theorem SpecHist2_zero (F : Int → Int) (A : Int) (R0 : Stack) :
    SpecHist2 F 0 A R0 = A :: R0 := rfl

@[simp] theorem SpecHist2_succ (F : Int → Int) (n : Nat) (A : Int) (R0 : Stack) :
    SpecHist2 F (n + 1) A R0 =
      SpecPush1 F (SpecHist2 F n A R0) := rfl

/-- `SpecIter` commutes with one more application on the left:
    iterating `n` times starting from `s x` is one step applied
    to iterating `n` times from `x`. -/
theorem SpecIter_step_comm (n : Nat) (s : Stack → Stack) (x : Stack) :
    SpecIter n s (s x) = s (SpecIter n s x) := by
  induction n generalizing x with
  | zero => rfl
  | succ k ih => simp [SpecIter_succ, ih]

/-- The `_loop` assembly equation: one outer iteration from `A`
    is `k` iterations starting from the pushed value `F A` on top
    of `A :: R0`. Closes the inductive step of `_loop`/`loop`/`times`/
    `seq` when `simp` rewrites with it. -/
@[simp] theorem SpecHist2_shift (F : Int → Int) (k : Nat) (A : Int) (R0 : Stack) :
    SpecHist2 F (k + 1) A R0 =
      SpecHist2 F k (F A) (A :: R0) :=
  (SpecIter_step_comm k _ _).symm

/-- Assembly in pushed form: `k` iterations from the pushed value
    `(F X) :: X :: R` is one `SpecPush1` step applied to `k`
    iterations from `X :: R`. This is the exact shape fbm_verify's
    final reconciliation needs after the body hypothesis assigns
    the accumulator and rest metas. -/
@[simp] theorem SpecHist2_push (F : Int → Int) (k : Nat) (X : Int) (R : Stack) :
    SpecHist2 F k (F X) (X :: R) =
      SpecPush1 F (SpecHist2 F k X R) :=
  SpecIter_step_comm k (SpecPush1 F) (X :: R)


/-- `intRange lo hi` is `[hi-1, ..., lo]` (top-first order: the head
    is the top of the pushed range). Empty when `hi ≤ lo`. Defined by
    recursion on the Nat distance so `range`/`count` specs compute it
    directly from `A`, `B` inputs; `..R (intRange A B)` then means
    `intRange A B ++ R`. -/
def intRangeAux : Nat → Int → List Int
  | 0, _ => []
  | n + 1, lo => (lo + (n : Int)) :: intRangeAux n lo

def intRange (lo hi : Int) : List Int :=
  intRangeAux ((hi - lo).toNat) lo

theorem intRange_of_le (lo hi : Int) (h : hi ≤ lo) :
    intRange lo hi = [] := by
  have h0 : (hi - lo).toNat = 0 := by omega
  simp [intRange, intRangeAux, h0]

@[simp] theorem intRange_succ_of_le (lo hi : Int) (h : lo ≤ hi) :
    intRange lo (hi + 1) = hi :: intRange lo hi := by
  have hge : (0 : Int) ≤ hi - lo := by omega
  have h1 : hi + 1 - lo = (hi - lo) + 1 := by omega
  have h2 : ((hi + 1 - lo).toNat) = ((hi - lo).toNat + 1) := by
    rw [h1, Int.toNat_add hge (by omega : (0 : Int) ≤ 1)]
    rfl
  have hcast : (Nat.cast ((hi - lo).toNat) : Int) = hi - lo :=
    Int.toNat_of_nonneg hge
  simp only [intRange, h2, intRangeAux]
  congr 1
  omega

/-- List-append / depth helpers for rotation and range posts:
    `R ++ [A]` length, cons-append reassociation, and
    `List.length` casting used by `pushtop`/`depth` reasoning. -/
theorem append_singleton_length (R : Stack) (A : Int) :
    (R ++ [A]).length = R.length + 1 := by
  simp

theorem cons_append_singleton (A : Int) (R : Stack) (B : Int) :
    (A :: R) ++ [B] = A :: (R ++ [B]) := by
  rfl

theorem length_cons_add_one (A : Int) (R : Stack) :
    (A :: R).length = R.length + 1 := by
  simp

/-- History of `succ` iterations is the integer range: `n`
    iterations from `A` push `A, ..., A+n`, i.e. `intRange`.
    Connects `seq`-based proofs (`range`, `count`) to `intRange` posts. -/
@[simp]
theorem SpecHist2_succ_range (n : Nat) (A : Int) (R0 : Stack) :
    SpecHist2 (fun x => x + 1) n A R0 = intRange A (A + (n : Int) + 1) ++ R0 := by
  induction n generalizing A with
  | zero =>
    have h : (A + 1 - A).toNat = 1 := by omega
    simp [SpecHist2, SpecIter, intRange, h, intRangeAux]
  | succ k ih =>
    have h1 : A ≤ A + (k : Int) := by omega
    have h2 : A ≤ A + ((k + 1 : Nat) : Int) := by omega
    have e1 := intRange_succ_of_le A (A + (k : Int)) h1
    have e2 := intRange_succ_of_le A (A + ((k + 1 : Nat) : Int)) h2
    have e1b : intRange A (A + ((k + 1 : Nat) : Int)) =
        (A + (k : Int)) :: intRange A (A + (k : Int)) := by
      have ce : A + ((k + 1 : Nat) : Int) = A + (k : Int) + 1 := by omega
      rw [ce]; exact e1
    have key : (A + (k : Int)) + 1 = A + ((k + 1 : Nat) : Int) := by omega
    simp only [SpecHist2_succ]
    rw [ih, e2, e1b, e1]
    simp only [List.cons_append, SpecPush1]
    rw [key]

open Lean Elab Tactic Meta in
section
/- `fbm_verify` automation (compositional-lean-prover Phase A):
   discharges `Spec` goals directly: unfolds `++` `Prog`
   definitions, splits `p1 ++ p2` via `Spec.seq`, discharges
   primitives via the `Spec.*` prim lemmas, `eval`/`call` via
   quotation-slot hypotheses, `cond` via `Spec.cond_if`
   (computed flags) / `cond_nonzero` / `cond_zero` (decided
   flags), allocates quotation literals via `Spec.cons`,
   applies callee `Spec` lemmas passed in `[...]`, reconciles
   postconditions via `Spec.conseq`, and closes arithmetic
   with `split`/`omega`/`decide`. Uniform proof for
   non-recursive `@effect` goals; recursive words stay
   `@rec-effect` with human induction. -/
syntax "fbm_verify" ("[" term,* "]")? : tactic

/-- Goal type with `mdata` stripped. A `have` (like the decision
    facts the `@by-induction` Nat skeleton emits) can wrap the
    goal's type in `mdata`, which `getAppFn` / `getAppArgs` /
    `isConstOf` do not see through (empty args, wrapper head).
    Every top-level goal-type dissection must use this. -/
def FbmVerify.goalTy (mvar : MVarId) : TacticM Expr := do
  return (← instantiateMVars (← mvar.getType)).consumeMData

def FbmVerify.falsePresent : TacticM Bool := do
  try
    for g in (← getGoals) do
      if (← FbmVerify.goalTy g).isConstOf `False then return true
    return false
  catch _ => return false

/-- Run `act`, rolling back on failure (`false` or exception).
    Uses full `saveState`/`restoreState` (not just goals+mctx):
    a failing `exact`/`apply` can otherwise leak postponed
    elaboration, caches, or error state that poison later
    attempts on the same goal. -/
def FbmVerify.atomic (act : TacticM Bool) : TacticM Bool := do
  let saved ← saveState
  try
    if ← act then return true
    else
      restoreState saved
      return false
  catch e =>
    restoreState saved
    throw e

def FbmVerify.tryApply (stx : TSyntax `tactic) : TacticM Bool := do
  FbmVerify.atomic do
    try
      let hadFalse ← FbmVerify.falsePresent
      (try evalTactic stx catch e => throw e)
      -- A step that simplifies some goal to `False` (`simp_all`
      -- refuting via a hyp) is a vacuous branch if the `False`
      -- closes, else a wrong grounding that must not count as
      -- progress: abandon it (the throw backtracks goals and
      -- metas) so the underlying mismatch stays loud.
      if !hadFalse then
        if ← FbmVerify.falsePresent then
          -- Vacuous branch: close it as real progress.
          try evalTactic (← `(tactic| contradiction)) catch _ => pure ()
          try evalTactic (← `(tactic| omega)) catch _ => pure ()
          if ← FbmVerify.falsePresent then
            logInfo m!"fbm_verify: abandoning refuting step {stx}"
            throwError "fbm_verify: step produced unclosable False"
      return true
    catch _ => return false

/-- Closer: run `stx` on the focused goal, succeeding only if the
    focused goal is discharged (assigned). Anything else —
    simplify-without-close, new side goals — is rolled back, so a
    heavy tactic like `simp_all` can never mangle a live `Spec`
    goal. Used for contradictory branches (dead `cond` arms after
    `splitSingle`): `contradiction`/`simp_all`/`omega` derive
    `False` from the branch hyps and close any goal. -/
def FbmVerify.tryClose (stx : TSyntax `tactic) : TacticM Bool := do
  FbmVerify.atomic do
    try
      let mvar ← getMainGoal
      evalTactic stx
      return (← mvar.isAssigned)
    catch _ => return false

/-- Per-hypothesis atomic `assumption`: for each local
    hypothesis (most recent first), `isDefEq`-unify its type
    against the goal and `assign` on success, rolling back
    after every failed hypothesis. Uses the hypothesis `Expr`
    directly (no name resolution, no elaborator): `exact h`
    via syntax can miss hyps that iteration sees when the
    ambient context lags the goal's. A bare `assumption`
    leaves partial assignments from one failed hypothesis
    behind, poisoning the next attempt when several
    `Spec`/`lookup` hyps share side-goal metavariables
    (`?body`, midpoints). -/
def FbmVerify.atomicAssumption : TacticM Bool := do
  try
    let mut decls : Array LocalDecl := #[]
    for ldecl in (← getLCtx) do decls := decls.push ldecl
    for ldecl in decls.reverse do
      if ldecl.isImplementationDetail then continue
      let ok ← FbmVerify.atomic do
        let hty ← instantiateMVars (← inferType ldecl.toExpr)
        let mvar ← getMainGoal
        let gty ← instantiateMVars (← mvar.getType)
        if ← isDefEq hty gty then
          mvar.assign ldecl.toExpr
          return true
        else return false
      if ok then return true
    return false
  catch _ => return false

def FbmVerify.introFresh : TacticM Bool := do
  try
    let mvar ← getMainGoal
    let ty ← FbmVerify.goalTy mvar
    -- Do not intro into a `Spec`: `seq`/`eval`/prims apply at
    -- `Spec` level; the `∃ fuel` inside is supplied by lemmas.
    -- Do not intro a negation (`F ≠ 0`, `¬P`): that masks an
    -- unprovable side-goal as `⊢ False` instead of leaving it
    -- for `assumption`/`omega`/`decide`. (`whnfR` is
    -- reducible-only and need not unfold `Ne`/`Not`, so check
    -- the heads before unfolding too.)
    if ty.getAppFn.isConstOf `Ne then return false
    if ty.getAppFn.isConstOf `Not then return false
    let tyWhnf ← whnfR ty
    if tyWhnf.getAppFn.isConstOf `Spec then return false
    if tyWhnf.getAppFn.isConstOf `SpecExact then return false
    if tyWhnf.getAppFn.isConstOf `SpecIO then return false
    if tyWhnf.getAppFn.isConstOf `SpecExit then return false
    if tyWhnf.getAppFn.isConstOf `Ne then return false
    if tyWhnf.isForall then
      let (_, body) ← forallTelescope tyWhnf fun xs b =>
        return (xs, b)
      if body.isConstOf `False then return false
    let n ← mkFreshUserName `h
    return ← FbmVerify.atomic do
      evalTactic (← `(tactic| intro $(mkIdent n):ident))
      return true
  catch _ => return false

def FbmVerify.isZeroLit : Expr → Bool
  | .lit (.natVal 0) => true
  | e =>
    e.getAppFn.isConstOf `OfNat.ofNat &&
    e.getAppArgs.any fun a => match a with
      | .lit (.natVal 0) => true
      | _ => false

/-- Match `s = qv :: F :: rest` (up to reducible unfolding),
    returning the flag `F`. -/
def FbmVerify.flagOfStackEq (s : Expr) (h : Expr) : MetaM (Option Expr) := do
  if !h.getAppFn.isConstOf `Eq then return none
  let args := h.getAppArgs
  if args.size != 3 then return none
  if args[1]! != s then return none
  let rhsWhnf ← whnf args[2]!
  let a1 := rhsWhnf.getAppArgs
  if a1.size < 3 then return none
  let restWhnf ← whnf a1[2]!
  let a2 := restWhnf.getAppArgs
  if a2.size < 3 then return none
  return some a2[1]!

/-- Extract the `cond` flag `F` from a `Spec [Tok.cond]` goal
    (`s = qv :: F :: rest` in the pre), if the goal has that
    shape. -/
def FbmVerify.condGoalFlag : TacticM (Option Expr) := do
  try
    let mvar ← getMainGoal
    let ty ← FbmVerify.goalTy mvar
    if !(ty.getAppFn.isConstOf `Spec || ty.getAppFn.isConstOf `SpecExact) then return none
    let args := ty.getAppArgs
    if args.size != 3 then return none
    let progWhnf ← whnf args[0]!
    if !progWhnf.getAppFn.isConstOf `List.cons then return none
    let pargs := progWhnf.getAppArgs
    if pargs.size < 3 then return none
    if pargs[1]! != mkConst `Tok.cond then return none
    let pre := args[1]!
    forallTelescope (← inferType pre) fun xs _ => do
      if xs.size < 6 then return none
      let body ← whnf (mkAppN pre xs)
      let mut conj := body
      let mut found : Option Expr := none
      for _ in List.range 8 do
        if found.isSome then break
        if conj.getAppFn.isConstOf `And then
          let cargs := conj.getAppArgs
          if cargs.size != 2 then break
          if let some F ← FbmVerify.flagOfStackEq xs[0]! cargs[0]! then
            found := some F
          conj := cargs[1]!
        else
          if let some F ← FbmVerify.flagOfStackEq xs[0]! conj then
            found := some F
          break
      return found
  catch _ => return none

/-- Head token constructor of the goal program: unfolds `Prog`
    definitions and `++` via `whnf`. Returns `` `nil `` for the
    empty program, the `Tok.*` constructor name for a head
    token, or `none` when the head is stuck (neutral/metas).
    `refine` + `isDefEq` replays the same unfolding when the
    head lemma is applied, so no goal rewriting is needed. -/
def FbmVerify.headTok : TacticM (Option Name) := do
  try
    let mvar ← getMainGoal
    let ty ← FbmVerify.goalTy mvar
    let fn := ty.getAppFn
    if !(fn.isConstOf `Spec || fn.isConstOf `SpecExact ||
         fn.isConstOf `SpecIO || fn.isConstOf `SpecExit) then return none
    let args := ty.getAppArgs
    -- `Spec`/`SpecExact`/`SpecIO`/`SpecExit` goals carry
    -- `(prog, pre, post)`; `SpecErr` goals carry `(prog, pre)`.
    -- Either way the program is `args[0]`.
    if args.size != 3 && args.size != 2 then return none
    let prog ← instantiateMVars args[0]!
    if prog.hasMVar then return none
    let pw ← whnf prog
    if pw.getAppFn.isConstOf `List.nil then return some `nil
    -- `List.cons {α} head tail`: head is args[1] (args[0] is `α`).
    if !pw.isAppOfArity `List.cons 3 then return none
    let t ← whnf (pw.getAppArgs[1]!)
    if t.hasMVar then return none
    match t.getAppFn with
    | .const n _ => return some n
    | _ => return none
  catch _ => return none

/-- Head of the pre stack (`qv` in `s = qv :: R`), if the goal
has that shape. -/
def FbmVerify.preHeadQv : TacticM (Option Expr) := do
  try
    let mvar ← getMainGoal
    let ty ← FbmVerify.goalTy mvar
    if !(ty.getAppFn.isConstOf `Spec || ty.getAppFn.isConstOf `SpecExact) then return none
    let args := ty.getAppArgs
    if args.size != 3 then return none
    let pre := args[1]!
    forallTelescope (← inferType pre) fun xs _ => do
      if xs.size < 6 then return (none : Option Expr)
      let body ← whnf (mkAppN pre xs)
      let mut conj := body
      let mut result : Option Expr := none
      for _ in List.range 8 do
        if result.isSome then break
        if conj.getAppFn.isConstOf `And then
          let cargs := conj.getAppArgs
          if cargs.size != 2 then break
          let h := cargs[0]!
          if h.getAppFn.isConstOf `Eq then
            let ha := h.getAppArgs
            if ha.size == 3 && ha[1]! == xs[0]! then
              let rhs ← whnf ha[2]!
              let a1 := rhs.getAppArgs
              if a1.size >= 3 then result := some a1[1]!
          conj := cargs[1]!
        else
          if conj.getAppFn.isConstOf `Eq then
            let ha := conj.getAppArgs
            if ha.size == 3 && ha[1]! == xs[0]! then
              let rhs ← whnf ha[2]!
              let a1 := rhs.getAppArgs
              if a1.size >= 3 then result := some a1[1]!
          break
      return result
  catch _ => return none

/-- Whether `Spec.eval` / `Spec.call` may fire: the quotation
    slot `qv` (head of the pre stack) must be determined, else
    the `hlookup` subgoal's `assumption` first-matches a wrong
    hypothesis and poisons `?body`. -/
def FbmVerify.qvOk : TacticM Bool := do
  try
    let some qv ← FbmVerify.preHeadQv | return false
    let qvi ← instantiateMVars qv
    return !qvi.hasMVar
  catch _ => return false

/-- Whether `Spec.cond_nonzero` (`nonzero = true`) or
    `Spec.cond_zero` may fire on the current goal. Blocks when
    the goal is `Spec [Tok.cond]` with a flag that must take the
    other branch: a contrary hypothesis in context (`F = 0`
    blocks nonzero; `F ≠ 0` blocks zero, including negated
    forms from `split`), a computed (`if`) flag (which belongs
    to `split`), or a literal flag taking the other branch. A
    free flag variable with no deciding hypothesis defers to
    `splitCondFlag` (`by_cases`); anything else unrecognized
    allows the apply. -/
def FbmVerify.condOk (nonzero : Bool) : TacticM Bool := do
  try
    let some F ← FbmVerify.condGoalFlag
      | return false
    -- Ungrounded (metavariable-containing) flags must wait: firing
    -- `cond_nonzero`/`cond_zero` now would orphan `hf` as an
    -- unclosable term goal and `isDefEq` probes below could assign
    -- the shared `seq` midpoint metas as a side effect.
    if F.hasMVar then return false
    let Fr ← whnfR F
    if Fr.getAppFn.isConstOf `ite || Fr.getAppFn.isConstOf `dite then
      return false
    -- Literal flags decide directly: zero blocks nonzero and
    -- any nonzero literal blocks zero. Check both raw and
    -- unfolded forms: `whnfR` can reduce `OfNat.ofNat` to
    -- `Int.ofNat`, hiding the literal from `isZeroLit`.
    let isNz : Expr → Bool := fun e => match e with
      | .lit (.natVal n) => n != 0
      | _ => (e.getAppFn.isConstOf `OfNat.ofNat ||
          e.getAppFn.isConstOf `Int.ofNat) &&
        e.getAppArgs.any fun a => match a with
          | .lit (.natVal n) => n != 0
          | _ => false
    if FbmVerify.isZeroLit F || FbmVerify.isZeroLit Fr then
      -- Literal zero: decided; allow iff this is the zero lemma.
      return !nonzero
    if isNz F || isNz Fr then
      -- Literal nonzero: decided; allow iff this is the nonzero lemma.
      return nonzero
    -- A free flag variable with no decision in context must wait
    -- for `splitCondFlag` (`by_cases`): firing a `cond_*` lemma
    -- now would orphan an unprovable `hf` side goal. Track
    -- whether any hypothesis actually decides the flag.
    let mut decided := false
    for ldecl in (← getLCtx) do
      if ldecl.isImplementationDetail then continue
      let ht ← instantiateMVars (← inferType ldecl.toExpr)
      -- Full `whnf` (not `whnfR`): `Ne`/`Not` are not reducible,
      -- so `whnfR` leaves `¬(F = 0)` as a `Not`-app and the
      -- negated-form checks below never fire.
      let hr ← whnf ht
      -- Direct: `Eq F 0` blocks nonzero, decides zero.
      if hr.isAppOfArity `Eq 3 then
        let ha := hr.getAppArgs
        if (← isDefEq ha[1]! F) && FbmVerify.isZeroLit ha[2]! then
          if nonzero then return false
          else decided := true
      -- Direct: `Ne F 0` blocks zero (if `Ne` survived `whnfR`),
      -- decides nonzero.
      if hr.isAppOfArity `Ne 3 then
        let ha := hr.getAppArgs
        if (← isDefEq ha[0]! F) && FbmVerify.isZeroLit ha[1]! then
          if !nonzero then return false
          else decided := true
      -- Negated: `¬P` shape (`∀ _ : P, False`).
      if hr.isForall then
        let (xs, body) ← forallTelescope hr fun xs b => return (xs, b)
        if body.isConstOf `False && xs.size == 1 then
          let P ← whnf xs[0]!
          -- `¬(F = 0)` blocks zero, decides nonzero.
          if P.isAppOfArity `Eq 3 then
            let pa := P.getAppArgs
            if (← isDefEq pa[1]! F) && FbmVerify.isZeroLit pa[2]! then
              if !nonzero then return false
              else decided := true
          -- `¬(F ≠ 0)` blocks nonzero, decides zero.
          if P.isAppOfArity `Ne 3 then
            let pa := P.getAppArgs
            if (← isDefEq pa[0]! F) && FbmVerify.isZeroLit pa[1]! then
              if nonzero then return false
              else decided := true
          if P.isForall then
            let (ys, yb) ← forallTelescope P fun ys b => return (ys, b)
            if yb.isConstOf `False && ys.size == 1 then
              let Q ← whnf ys[0]!
              if Q.isAppOfArity `Eq 3 then
                let qa := Q.getAppArgs
                if (← isDefEq qa[1]! F) && FbmVerify.isZeroLit qa[2]! then
                  if nonzero then return false
                  else decided := true
    if F.isFVar && !decided then return false
    return true
  catch _ => return true

/-- If the main goal is `Spec [Tok.cond]` whose pinned stack has
    a free flag variable with no decision in context, case-split
    on it. Computed (`if`) flags go through `Spec.cond_if`
    instead; decided flags through `cond_nonzero`/`cond_zero`. -/
def FbmVerify.splitCondFlag : TacticM Bool := do
  try
    let mvar ← getMainGoal
    let ty ← FbmVerify.goalTy mvar
    if !(ty.getAppFn.isConstOf `Spec || ty.getAppFn.isConstOf `SpecExact) then return false
    let args := ty.getAppArgs
    if args.size != 3 then return false
    let progWhnf ← whnf args[0]!
    if !progWhnf.getAppFn.isConstOf `List.cons then return false
    let pargs := progWhnf.getAppArgs
    if pargs.size < 3 then return false
    if pargs[1]! != mkConst `Tok.cond then return false
    let pre := args[1]!
    let found ← forallTelescope (← inferType pre) fun xs _ => do
      if xs.size < 6 then return (none : Option Expr)
      let body ← whnf (mkAppN pre xs)
      let mut conj := body
      let mut result : Option Expr := none
      for _ in List.range 8 do
        if result.isSome then break
        if conj.getAppFn.isConstOf `And then
          let cargs := conj.getAppArgs
          if cargs.size != 2 then break
          if let some F ← FbmVerify.flagOfStackEq xs[0]! cargs[0]! then
            result := some F
          conj := cargs[1]!
        else
          if let some F ← FbmVerify.flagOfStackEq xs[0]! conj then
            result := some F
          break
      return result
    let some F := found | return false
    let .fvar fid := F | return false
    for ldecl in (← getLCtx) do
      let ht ← instantiateMVars (← inferType ldecl.toExpr)
      if (ht.find? (· == F)).isSome && (ht.find? FbmVerify.isZeroLit).isSome then
        return false
    let uname ← fid.getUserName
    let hname := mkIdent (← mkFreshUserName `hflag)
    return ← FbmVerify.atomic do
      evalTactic (← `(tactic| by_cases $hname:ident : $(mkIdent uname):ident = 0))
      return true
  catch _ => return false

def FbmVerify.splitConjHyp : TacticM Bool := do
  try
    for ldecl in (← getLCtx) do
      if ldecl.isImplementationDetail then continue
      let ty ← instantiateMVars (← inferType ldecl.toExpr)
      if (← whnfR ty).isAppOfArity `And 2 then
        return ← FbmVerify.atomic do
          evalTactic (← `(tactic| cases $(mkIdent ldecl.userName):ident))
          return true
    return false
  catch _ => return false

/-- First `ite`/`dite` under the `Spec` pre/post lambdas, if
    any. Searched after `forallTelescope`, so conditions may
    mention the bound stack/queue/ghost variables as fvars. -/
def FbmVerify.findIte (p : Expr) : TacticM (Option Expr) := do
  try
    -- NOTE: `p` is a *lambda*, not a pi type: apply it to the
    -- telescoped binders and `whnf` (beta) to expose the body.
    -- `forallTelescope`'s own `body` would just be `Prop`.
    forallTelescope (← inferType p) fun xs _ => do
      let body ← whnf (mkAppN p xs)
      let bodyI ← instantiateMVars body
      return bodyI.find? fun e =>
        e.getAppFn.isConstOf `ite || e.getAppFn.isConstOf `dite
  catch _ => return none

/-- `split`, but only when the `Spec` goal contains exactly one
    `ite`/`dite` across pre and post. Unrestricted `split` on
    multi-`ite` goals branches exponentially (`2^n` goals) and
    burns the heartbeat budget in `whnf`. Multi-`ite` goals must
    first be decomposed by `seq` (or discharged per-branch after
    a single split higher up). -/
def FbmVerify.splitSingle : TacticM Bool := do
  try
    let mvar ← getMainGoal
    let ty ← FbmVerify.goalTy mvar
    if !(ty.getAppFn.isConstOf `Spec || ty.getAppFn.isConstOf `SpecExact) then return false
    -- No `hasMVar` gate: the flag itself was already checked
    -- concrete by the caller; pre/post midpoint metas are safely
    -- carried into both `split` branches and ground later.
    let args := ty.getAppArgs
    if args.size != 3 then return false
    let preIte ← FbmVerify.findIte args[1]!
    let postIte ← FbmVerify.findIte args[2]!
    match preIte, postIte with
    | none, none => return false
    | some _, some _ => return false
    | some ite, none =>
      -- No second `ite` anywhere else: neither in the other
      -- predicate nor nested inside this `ite`'s branches.
      let rest := ite.getAppArgs[3:].toArray        if rest.any (fun a => (a.find? fun e =>
          e.getAppFn.isConstOf `ite || e.getAppFn.isConstOf `dite).isSome) then
          return false
    | none, some ite =>
      let rest := ite.getAppArgs[3:].toArray        if rest.any (fun a => (a.find? fun e =>
          e.getAppFn.isConstOf `ite || e.getAppFn.isConstOf `dite).isSome) then
          return false
    return ← FbmVerify.atomic do
      evalTactic (← `(tactic| split))
      return true
  catch _ => return false

/-- First `ite`/`dite` condition with no metavariables and no nested
    `ite`/`dite` inside it, if any (preorder, so the outermost
    split candidate wins). Returns the condition, not the `ite`. -/
def FbmVerify.firstSplitCond (e : Expr) : Option Expr := do
  let s ← e.find? fun s =>
    if s.getAppFn.isConstOf `ite || s.getAppFn.isConstOf `dite then
      let a := s.getAppArgs
      if a.size < 2 then false
      else
        let c := a[1]!
        if c.hasMVar then false
        else !(((c.find? fun t =>
          t.getAppFn.isConstOf `ite || t.getAppFn.isConstOf `dite).isSome))
    else false
  let a := s.getAppArgs
  if a.size < 2 then none else some a[1]!

/-- Whether two expressions share a free variable. A hypothesis
    sharing no free variable with the goal cannot be an `if` the
    goal depends on. -/
def FbmVerify.sharesFVar (a b : Expr) : Bool :=
  ((a.find? fun e => match e with
    | .fvar _ => (b.find? fun x => x == e).isSome
    | _ => false).isSome)

/-- Dual comparisons of `c`: expressions `d` with `d ↔ ¬c` (empty
    unless `c` is a comparison). Needed because the round-robin
    `simp_all` rewrites split hypotheses via `not_lt`/`not_le`, so a
    negative branch `¬(X < 0)` appears in context as `0 ≤ X` — neither
    syntactically `¬c` nor defeq to `c`. Rebuilt with `mkAppM` so
    instance arguments are fresh unification variables. -/
def FbmVerify.dualConds (c : Expr) : TacticM (Array Expr) := do
  try
    let fn := c.getAppFn
    let args := c.getAppArgs
    if fn.isConstOf `LT.lt && args.size == 4 then
      return #[← mkAppM `LE.le #[args[3]!, args[2]!]]
    if fn.isConstOf `LE.le && args.size == 4 then
      return #[← mkAppM `LT.lt #[args[3]!, args[2]!]]
    if fn.isConstOf `GT.gt && args.size == 4 then
      return #[← mkAppM `GE.ge #[args[3]!, args[2]!]]
    if fn.isConstOf `GE.ge && args.size == 4 then
      return #[← mkAppM `GT.gt #[args[3]!, args[2]!]]
    if fn.isConstOf `Eq && args.size == 3 then
      return #[← mkAppM `Ne #[args[1]!, args[2]!]]
    if fn.isConstOf `Ne && args.size == 3 then
      return #[← mkAppM `Eq #[args[1]!, args[2]!]]
    return #[]
  catch _ => return #[]

/-- Whether `c` is already decided in context. Uses `isDefEq` (never
    syntactic `==`: elaborated hypothesis types can carry metadata or
    different-but-equal instances that `==` misses, which would loop
    the splitter on an already-decided condition). Each probe runs
    inside `atomic`, so a failed unification rolls back any partial
    midpoint assignments. Covers `c`, `¬c`, comparison duals (see
    `dualConds`), and `¬`-of-dual. -/
def FbmVerify.condDecided (c : Expr) : TacticM Bool := do
  try
    let notc := mkApp (mkConst `Not) c
    let mut duals : Array Expr := #[notc]
    for d in ← FbmVerify.dualConds c do
      duals := duals.push d
      duals := duals.push (mkApp (mkConst `Not) d)
    for ldecl in (← getLCtx) do
      if ldecl.isImplementationDetail then continue
      let hty ← instantiateMVars (← inferType ldecl.toExpr)
      if ← FbmVerify.atomic do pure (← isDefEq hty c) then return true
      for d in duals do
        if ← FbmVerify.atomic do pure (← isDefEq hty d) then return true
    return false
  catch _ => return false

/-- This branch's conditional-splitting depth: each split adds one
    `hsplit`-named hypothesis, so their count in context is the
    depth. Per-branch (contexts are branch-local), no threading. -/
def FbmVerify.splitDepth : TacticM Nat := do
  try
    let mut depth := 0
    for ldecl in (← getLCtx) do
      if ldecl.userName.toString.startsWith "hsplit" then depth := depth + 1
    return depth
  catch _ => return 0

/-- Split conditions worth a `by_cases`: the goal's first splittable
    `if` condition, then relevant hypotheses' (sharing a free
    variable with the goal), deduplicated, undecided ones only.
    Empty means no split applies (the caller reports stuck). -/
def FbmVerify.splitCandidates (ty : Expr) : TacticM (Array Expr) := do
  try
    let mut cands : Array Expr := #[]
    if let some c := FbmVerify.firstSplitCond ty then
      cands := cands.push c
    for ldecl in (← getLCtx) do
      if ldecl.isImplementationDetail then continue
      let hty ← instantiateMVars (← inferType ldecl.toExpr)
      if !FbmVerify.sharesFVar hty ty then continue
      if let some c := FbmVerify.firstSplitCond hty then
        if !cands.any (· == c) then cands := cands.push c
    let mut todo : Array Expr := #[]
    for c in cands do
      if !(← FbmVerify.condDecided c) then todo := todo.push c
    return todo
  catch _ => return #[]

/-- `by_cases` on one stuck-goal `if` condition, if any. Atomic
    rollback per split: a failing elaboration leaves no trace.
    Depth-capped (see `FbmVerify.splitDepth`): beyond the cap the
    goal genuinely needs human tactics, reported as a clean
    `needs @by-proof` problem rather than explored further. -/
def FbmVerify.splitOneStuck : TacticM Bool := do
  let mvar ← getMainGoal
  let ty ← FbmVerify.goalTy mvar
  if (← inferType ty) != mkSort Level.zero then return false
  let cands ← FbmVerify.splitCandidates ty
  if cands.isEmpty then return false
  let depth ← FbmVerify.splitDepth
  if depth >= 3 then
    throwError m!"fbm_verify: conditional splitting needs `@by-proof` (depth {depth} on {cands[0]!}); prove this goal by hand over the callee lemmas (see HELP.md)"
  for c in cands do
    let ok ← FbmVerify.atomic do
      try
        let hname := mkIdent (← mkFreshUserName `hsplit)
        let t ← Lean.PrettyPrinter.delab c
        evalTactic (← `(tactic| by_cases $hname:ident : $t:term))
        return true
      catch _ => return false
    if ok then return true
  return false

/-- Last-resort conditional splitting over the active goals: try
    `splitOneStuck` on each active `Prop` goal in order, keeping
    the first success. Runs only after a full round with zero
    progress (see `FbmVerify.run`), so proofs that close without
    it never observe it. Restores the goal list on failure. -/
def FbmVerify.lastResortSplit (active : Array MVarId) : TacticM Bool := do
  let saved ← getGoals
  for g in active do
    if ← g.isAssigned then continue
    let isP ← g.withContext do
      try
        let gty ← instantiateMVars (← g.getType)
        pure ((← inferType gty) == mkSort Level.zero)
      catch _ => pure false
    if !isP then continue
    setGoals (g :: (active.toList.filter (· != g)))
    let done ← g.withContext FbmVerify.splitOneStuck
    if done then
      let now ← getGoals
      -- Reassemble: the split branches first, then every other
      -- still-unassigned goal from before (the split goal `g` is
      -- assigned by `by_cases`).
      let mut others : List MVarId := []
      for h in saved do
        if h == g then continue
        if ← h.isAssigned then continue
        others := others ++ [h]
      setGoals (now ++ others)
      return true
    setGoals saved
  setGoals saved
  return false

def FbmVerify.run (_deps : Array Term) : TacticM Unit := do
  -- Callee `Prog` definitions unfold by definitional unfolding
  -- (`whnf` inspection + `refine` unification), so the `deps`
  -- list is accepted but unused: every head is peeled by a
  -- `Spec.*_head` continuation lemma with zero shared metas.
  -- `apply` (not `refine`) throughout: when the goal pre/post
  -- still contains unassigned midpoint metas, a head lemma's
  -- implicits absorb them, and `refine` errors with "don't
  -- know how to synthesize" while `apply` defers them as new
  -- goals (closed as side effects later).
  let nilCloseTac ← `(tactic| apply Spec.nil_close)
  let exactNilCloseTac ← `(tactic| apply SpecExact.nil_close)
  let exactClrTac ← `(tactic| apply SpecExact.clr_head)
  let exactDepthTac ← `(tactic| apply SpecExact.depth_head)
  let exactPrintTac ← `(tactic| apply SpecExact.print_head)
  let exactPushTac ← `(tactic| apply SpecExact.push_head)
  let exactEqTac ← `(tactic| apply SpecExact.eq_head)
  let exactGtTac ← `(tactic| apply SpecExact.gt_head)
  let exactSwapTac ← `(tactic| apply SpecExact.swap_head)
  let exactQpushTac ← `(tactic| apply SpecExact.qpush_head)
  let exactQpullTac ← `(tactic| apply SpecExact.qpull_head)
  let exactEvalTac ← `(tactic| apply SpecExact.eval_head)
  let exactCallTac ← `(tactic| apply SpecExact.call_head)
  let exactZeroTac ← `(tactic| apply SpecExact.cond_zero_head)
  let exactNonzeroTac ← `(tactic| apply SpecExact.cond_nonzero_head)
  let ioGetcTac ← `(tactic| apply SpecIO.getc)
  let ioClockTac ← `(tactic| apply SpecIO.clock)
  let ioRandTac ← `(tactic| apply SpecIO.rand)
  let exitTac ← `(tactic| apply SpecExit.exit)
  let pushTac ← `(tactic| apply Spec.push_head)
  let dupTac ← `(tactic| apply Spec.dup_head)
  let swapTac ← `(tactic| apply Spec.swap_head)
  let dropTac ← `(tactic| apply Spec.drop_head)
  let qpushTac ← `(tactic| apply Spec.qpush_head)
  let qpullTac ← `(tactic| apply Spec.qpull_head)
  let gtTac ← `(tactic| apply Spec.gt_head)
  let ltTac ← `(tactic| apply Spec.lt_head)
  let eqTac ← `(tactic| apply Spec.eq_head)
  let mulTac ← `(tactic| apply Spec.mul_head)
  let nopTac ← `(tactic| apply Spec.nop_head)
  let addTac ← `(tactic| apply Spec.add_head)
  let subTac ← `(tactic| apply Spec.sub_head)
  let landTac ← `(tactic| apply Spec.land_head)
  let lorTac ← `(tactic| apply Spec.lor_head)
  let lnotTac ← `(tactic| apply Spec.lnot_head)
  let shlTac ← `(tactic| apply Spec.shl_head)
  let shrTac ← `(tactic| apply Spec.shr_head)
  let putcTac ← `(tactic| apply Spec.putc_head)
  let putnTac ← `(tactic| apply Spec.putn_head)
  let divTac ← `(tactic| apply Spec.div_head)
  let modTac ← `(tactic| apply Spec.mod_head)
  let powTac ← `(tactic| apply Spec.pow_head)
  let divErrTac ← `(tactic| apply SpecErr.div_err)
  let modErrTac ← `(tactic| apply SpecErr.mod_err)
  let powErrTac ← `(tactic| apply SpecErr.pow_err)
  let consTac ← `(tactic| apply Spec.cons_head)
  -- `apply` (not `refine`): `body` is undetermined by the
  -- conclusion, so it (plus the `S`/`defs'` midpoints) becomes
  -- deferred type-valued goals, solved as side effects when
  -- `assumption` closes the `hlookup`/`hbody` side goals.
  let evalTac ← `(tactic| apply Spec.eval_head)
  let callTac ← `(tactic| apply Spec.call_head)
  let zeroTac ← `(tactic| apply Spec.cond_zero_head)
  -- `apply`: `body`/`S`/`defs'` are undetermined by the
  -- conclusion (as with `eval_head`).
  let nonzeroTac ← `(tactic| apply Spec.cond_nonzero_head)
  -- Normalize `++`: right-associate and eliminate `[]`. Includes
  -- `List.append` itself: `refine` unification exposes raw
  -- `List.append` heads (delta-unfolding `HAppend` instances)
  -- which the `HAppend`-stated lemmas cannot match. Goal-only,
  -- cheap, idempotent; `Prog` defs unfold by `whnf`/`isDefEq`.
  let normTac ← `(tactic| set_option linter.unusedSimpArgs false in
    simp only [List.append_assoc, List.nil_append, List.cons_append, List.append])
  -- Full `simp_all` for pure (non-`Spec`) goals: branch
  -- decisions in context reconcile computed vs stated posts.
  -- No `execQ` appears in these goals, so this is cheap.
  let simpAllTac ← `(tactic| simp_all)
  let rflTac ← `(tactic| rfl)
  let contradictionTac ← `(tactic| contradiction)
  let omegaTac ← `(tactic| omega)
  -- Congruence-then-arithmetic: `omega` treats uninterpreted
  -- applications (`intRange`, `++`) as opaque atoms, so an equation
  -- like `intRange A X = intRange A Y` (or under `++ R0`) defeats
  -- it even when `X = Y` is linear arithmetic (`hw` in context).
  -- Peel up to three congruence levels, then `omega` on the
  -- arithmetic leaves. Tried only after plain `omega` fails, and
  -- as a must-close (atomic rollback), so over-decomposition can
  -- never mangle a live goal.
  let congrOmegaTac ← `(tactic| first | (congr 1 <;> omega) | (congr 1 <;> congr 1 <;> omega) | (congr 1 <;> congr 1 <;> congr 1 <;> omega))
  let decideTac ← `(tactic| decide)
  -- One pass over the current main goal. Returns true on progress.
  -- Single focus (no round-robin): every head lemma consumes its
  -- head token (or closes its goal), side conditions are `Prop`s
  -- closed immediately, and continuations queue behind in order.
  let stepOnce : TacticM Bool := do
    -- Never touch a bare-metavariable goal.
    let isBare ← (try do
      let mvar ← getMainGoal
      let ty ← FbmVerify.goalTy mvar
      pure ty.isMVar
    catch _ => pure false)
    if isBare then return false
    -- Non-`Spec` goals are always `Prop`s here (side conditions
    -- `hlookup`/`hf`, pure `nil_close` implications): closers,
    -- intro (for the implications), then arithmetic.
    do
      let mvar ← getMainGoal
      let ty ← FbmVerify.goalTy mvar
      -- `SpecErr` goals: close by assumption, then the three
      -- guarded-prim error leaves (side condition `h` closes by
      -- assumption/omega like the success guards).
      if ty.getAppFn.isConstOf `SpecErr then
        if ← FbmVerify.atomicAssumption then return true
        if ← FbmVerify.tryApply divErrTac then return true
        if ← FbmVerify.tryApply modErrTac then return true
        if ← FbmVerify.tryApply powErrTac then return true
        if ← FbmVerify.tryApply simpAllTac then return true
        if ← FbmVerify.tryApply omegaTac then return true
        if ← FbmVerify.tryApply decideTac then return true
        return false
      let _fn := ty.getAppFn
      if !(_fn.isConstOf `Spec || _fn.isConstOf `SpecExact ||
           _fn.isConstOf `SpecIO || _fn.isConstOf `SpecExit) then
        if (← inferType ty) == mkSort Level.zero then
          if ← FbmVerify.tryApply rflTac then return true
          if ← FbmVerify.atomicAssumption then return true
          if ← FbmVerify.tryApply contradictionTac then return true
          if ← FbmVerify.introFresh then return true
          if ← FbmVerify.splitConjHyp then return true
          if ← FbmVerify.tryApply simpAllTac then return true
          if ← FbmVerify.tryApply omegaTac then return true
          if ← FbmVerify.tryClose congrOmegaTac then return true
          if ← FbmVerify.tryApply decideTac then return true
        return false
    -- `Spec` goals: per-hyp atomic `assumption` first. This
    -- closes body-spec subgoals against the context `Spec`
    -- hyps (assigning shared midpoint metas from the matching
    -- hyp) and exact duplicates; each failed hypothesis is
    -- rolled back, so a wrong hyp never poisons the right one.
    if ← FbmVerify.atomicAssumption then return true
    -- Callee `Spec` lemmas (`dip_spec`, `sort2_spec`, ...): close
    -- hbody goals compositionally. Bare-peeling a
    -- cond-containing callee with a midpoint-meta post shares
    -- those metas across `split` branches: the first branch to
    -- close grounds them and dooms the other. A callee lemma's
    -- concrete (branch-aware) post grounds the midpoint once,
    -- correctly. Non-theorem deps (`Prog` defs) fail `apply`
    -- harmlessly inside `atomic`.
    for dep in _deps do
      let applied ← FbmVerify.atomic do
        try
          evalTactic (← `(tactic| apply $dep))
          return true
        catch _ => return false
      if applied then return true
    if ← FbmVerify.tryApply normTac then return true
    let some hd ← FbmVerify.headTok | return false
    match hd with
    | `nil =>
        if ← FbmVerify.tryApply nilCloseTac then return true
        if ← FbmVerify.tryApply exactNilCloseTac then return true
    | `Tok.push =>
        if ← FbmVerify.tryApply pushTac then return true
        if ← FbmVerify.tryApply exactPushTac then return true
    | `Tok.dup => if ← FbmVerify.tryApply dupTac then return true
    | `Tok.swap =>
        if ← FbmVerify.tryApply swapTac then return true
        if ← FbmVerify.tryApply exactSwapTac then return true
    | `Tok.drop => if ← FbmVerify.tryApply dropTac then return true
    | `Tok.qpush =>
        if ← FbmVerify.tryApply qpushTac then return true
        if ← FbmVerify.tryApply exactQpushTac then return true
    | `Tok.qpull =>
        if ← FbmVerify.tryApply qpullTac then return true
        if ← FbmVerify.tryApply exactQpullTac then return true
    | `Tok.gt =>
        if ← FbmVerify.tryApply gtTac then return true
        if ← FbmVerify.tryApply exactGtTac then return true
    | `Tok.lt => if ← FbmVerify.tryApply ltTac then return true
    | `Tok.eq =>
        if ← FbmVerify.tryApply eqTac then return true
        if ← FbmVerify.tryApply exactEqTac then return true
    | `Tok.clr => if ← FbmVerify.tryApply exactClrTac then return true
    | `Tok.depth => if ← FbmVerify.tryApply exactDepthTac then return true
    | `Tok.print => if ← FbmVerify.tryApply exactPrintTac then return true
    | `Tok.getc => if ← FbmVerify.tryApply ioGetcTac then return true
    | `Tok.clock => if ← FbmVerify.tryApply ioClockTac then return true
    | `Tok.rand => if ← FbmVerify.tryApply ioRandTac then return true
    | `Tok.exit => if ← FbmVerify.tryApply exitTac then return true
    | `Tok.mul => if ← FbmVerify.tryApply mulTac then return true
    | `Tok.nop => if ← FbmVerify.tryApply nopTac then return true
    | `Tok.add => if ← FbmVerify.tryApply addTac then return true
    | `Tok.sub => if ← FbmVerify.tryApply subTac then return true
    | `Tok.land => if ← FbmVerify.tryApply landTac then return true
    | `Tok.lor => if ← FbmVerify.tryApply lorTac then return true
    | `Tok.lnot => if ← FbmVerify.tryApply lnotTac then return true
    | `Tok.shl => if ← FbmVerify.tryApply shlTac then return true
    | `Tok.shr => if ← FbmVerify.tryApply shrTac then return true
    | `Tok.putc => if ← FbmVerify.tryApply putcTac then return true
    | `Tok.putn => if ← FbmVerify.tryApply putnTac then return true
    | `Tok.div => if ← FbmVerify.tryApply divTac then return true
    | `Tok.mod => if ← FbmVerify.tryApply modTac then return true
    | `Tok.pow => if ← FbmVerify.tryApply powTac then return true
    | `Tok.cons => if ← FbmVerify.tryApply consTac then return true
    | `Tok.eval =>
        if ← FbmVerify.qvOk then
          if ← FbmVerify.tryApply evalTac then return true
        if ← FbmVerify.qvOk then
          if ← FbmVerify.tryApply exactEvalTac then return true
    | `Tok.call =>
        if ← FbmVerify.qvOk then
          if ← FbmVerify.tryApply callTac then return true
        if ← FbmVerify.qvOk then
          if ← FbmVerify.tryApply exactCallTac then return true
    | `Tok.cond => do
        let some F ← FbmVerify.condGoalFlag | return false
        let Fi ← instantiateMVars F
        if Fi.hasMVar then return false
        let Fr ← whnfR Fi
        -- Computed flag: split the single `if` first; the two
        -- branches get literal flags handled below.
        if Fr.getAppFn.isConstOf `ite || Fr.getAppFn.isConstOf `dite then
          if ← FbmVerify.splitSingle then return true
          else return false
        if ← FbmVerify.condOk true then
          if ← FbmVerify.tryApply nonzeroTac then return true
          if ← FbmVerify.tryApply exactNonzeroTac then return true
        if ← FbmVerify.condOk false then
          if ← FbmVerify.tryApply zeroTac then return true
          if ← FbmVerify.tryApply exactZeroTac then return true
        -- Free undecided flag: case-split, then decide per branch.
        if ← FbmVerify.splitCondFlag then return true
        pure ()
    | _ => pure ()
    -- Contradictory-branch closers (dead `cond` arms after
    -- `splitSingle`): sound, and rolled back unless the focused
    -- goal is discharged. `contradiction` first (cheap), then
    -- `omega` (arithmetic refutation), then `simp_all` (heavy:
    -- evaluates lengths, substitutes equations, refutes).
    if ← FbmVerify.tryClose contradictionTac then return true
    if ← FbmVerify.tryClose omegaTac then return true
    if ← FbmVerify.tryClose simpAllTac then return true
    return false
  -- Single-focus loop over `Prop` goals: each iteration closes
  -- or transforms the focused goal (head peels strictly shrink
  -- the main line; side conditions are `Prop`s discharged
  -- immediately). Deferred type-valued goals (`⊢ Stack` /
  -- `⊢ Defs` / `⊢ List Tok` from `apply Spec.eval_head`) are
  -- skipped: they are assigned as side effects when per-hyp
  -- `assumption` closes the `hlookup`/`hbody` side goals. A
  -- `false` step means the goal is stuck: report it loudly via
  -- `MessageData`, so fvars pretty-print with their names.
  for _ in List.range 512 do
    let gs ← getGoals
    let mut active : Array MVarId := #[]
    for g in gs do
      if !(← g.isAssigned) then active := active.push g
    if active.isEmpty then
      setGoals []
      return
    setGoals active.toList
    -- Round-robin over `Prop` goals: the first `Prop` goal may
    -- be temporarily stuck (e.g. a `cond` whose post still has
    -- midpoint metas that a later hrest goal will assign), so
    -- try each in order until one progresses. Every mutating
    -- step is atomic, so failed attempts leave no trace.
    let mut props : Array MVarId := #[]
    for g in active do
      let isProp ← g.withContext do
        let ty ← instantiateMVars (← g.getType)
        pure ((← inferType ty) == mkSort Level.zero)
      if isProp then props := props.push g
    if props.isEmpty then
      -- Dead branch whose `Prop` goals all closed by refutation,
      -- leaving only deferred (`Stack`/`Defs`) goals: close them by
      -- the same refutation. Anything unclosable restores state and
      -- throws exactly as before (no behavior change for live
      -- proofs: closers fail on consistent hyps and roll back).
      let saved ← saveState
      let mut allClosed := true
      for g in active do
        setGoals [g]
        let closed ← g.withContext do
          if ← FbmVerify.tryClose contradictionTac then return true
          if ← FbmVerify.tryClose omegaTac then return true
          if ← FbmVerify.tryClose simpAllTac then return true
          return false
        if !closed then allClosed := false; break
      if allClosed then continue
      restoreState saved
      throwError m!"fbm_verify: stuck with only deferred type goals"
    let mut progressed := false
    for f in props do
      setGoals (f :: (active.toList.filter (· != f)))
      -- Run the step inside the focused goal's own local context:
      -- ambient `getLCtx` would otherwise see a frozen outer
      -- context (missing branch hyps like `hflag`), causing
      -- endless `by_cases` re-splits and invisible `exact`s.
      if ← f.withContext stepOnce then progressed := true; break
    if progressed then continue
    else
      -- Last resort (compositional callee composition): a full round
      -- with zero progress. One conditional-hypothesis split over
      -- the active goals; proofs that close without it never
      -- observe it. On failure the original stuck report below
      -- fires unchanged.
      let splitDone ← FbmVerify.lastResortSplit active
      if splitDone then continue
      let gs2 ← getGoals
      let mut msg : MessageData :=
        m!"fbm_verify: no progress, {gs2.length} goals:"
      for g in gs2 do
        let ty ← g.withContext (instantiateMVars (← g.getType))
        msg := msg ++ m!"\nGOAL: {ty}"
        let cmsg ← g.withContext do
          let mut m : MessageData := m!""
          let ctx ← getLCtx
          for ldecl in ctx do
            if ldecl.isImplementationDetail then continue
            let lty ← instantiateMVars ldecl.type
            m := m ++ m!"\n  {ldecl.userName} : {lty}"
          return m
        msg := msg ++ cmsg
      throwError msg
  let gsEnd ← getGoals
  let mut msgEnd : MessageData :=
    m!"fbm_verify: iteration limit, {gsEnd.length} goals:"
  for g in gsEnd.take 3 do
    let ty ← instantiateMVars (← g.getType)
    msgEnd := msgEnd ++ m!"\nGOAL: {ty}"
  throwError msgEnd


elab_rules : tactic
  | `(tactic| fbm_verify) => FbmVerify.run #[]
  | `(tactic| fbm_verify [$deps:term,*]) => FbmVerify.run deps.getElems

end

