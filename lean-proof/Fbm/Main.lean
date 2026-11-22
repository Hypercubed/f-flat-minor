import Fbm.Interp

def sample : List Tok := [.push 2, .push 3, .add]

def main : IO Unit := do
  let out := run sample [] [] []
  IO.println (repr out)
