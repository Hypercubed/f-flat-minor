import Fbm.Interp

/- README example:
     [(fact)] : dup 1 - fact * ;
     [fact]   : dup 1 - [(fact)] ? ;
     100 fact .
   Definition table indices: 0 = (fact), 1 = fact. -/
def readmeDefs : Defs :=
  [ [.dup, .push 1, .sub, .call 1, .mul]   -- 0: (fact)
  , [.dup, .push 1, .sub, .push 0, .cond]  -- 1: fact
  ]

def readmeProg : List Tok :=
  [.push 100, .call 1, .print]

def factNat : Nat → Int
  | 0 => 1
  | n + 1 => (n + 1 : Int) * factNat n

set_option maxRecDepth 8192 in
theorem readme_fact_100 :
    (runQ 2000 readmeProg [] [] [] readmeDefs).1 =
      Outcome.ok [factNat 100] [] [IOAction.print [factNat 100]] := by
  rfl

theorem fact_execQ :
    ∀ (k : Nat) (f : Nat) (ts : List Tok) (s q : Stack) (inp : In) (orc : Oracle) (acts : List IOAction),
      execQ (f + 10 * (k + 1)) (.call 1 :: ts) ((k + 1 : Int) :: s) q inp orc acts readmeDefs =
      execQ (f + 4) ts (factNat (k + 1) :: s) q inp orc acts readmeDefs := by
  intro k
  induction k with
  | zero =>
    intro f ts s q inp orc acts
    simp [execQ, lookup, readmeDefs, step, factNat]
  | succ m ih =>
    intro f ts s q inp orc acts
    have heq : (m + 1 + 1 : Int) - 1 = (m + 1 : Int) := by omega
    have hnz : (m + 1 : Int) ≠ 0 := by omega
    rw [show f + 10 * (m + 1 + 1) = (f + 1 + 10 * (m + 1)) + 9 from by omega]
    simp [execQ, lookup, readmeDefs, step, heq, hnz]
    have hIH := ih (f + 1) (.mul :: ts) ((m + 1 + 1 : Int) :: s) q inp orc acts
    simp only [readmeDefs] at hIH
    rw [hIH]
    simp [execQ, step, factNat, Int.mul_comm]

theorem fact_spec (n : Int) (hn : 1 ≤ n) (rest : Stack) :
    ∃ fuel, (runQ fuel [.call 1] (n :: rest) [] [] readmeDefs).1 =
      Outcome.ok (factNat n.toNat :: rest) [] [] := by
  obtain ⟨k, hk⟩ : ∃ k : Nat, n = (k + 1 : Int) := ⟨(n - 1).toNat, by omega⟩
  refine ⟨10 * (k + 1), ?_⟩
  have h := fact_execQ k 0 [] rest [] [] [] []
  simp only [Nat.zero_add] at h
  rw [hk, show (k + 1 : Int).toNat = k + 1 from by omega]
  simp [runQ, h, execQ]

def main : IO Unit := do
  let (out, _) := runQ 2000 readmeProg [] [] [] readmeDefs
  IO.println (repr out)
