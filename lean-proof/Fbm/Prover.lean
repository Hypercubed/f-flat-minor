import Fbm.Interp

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
