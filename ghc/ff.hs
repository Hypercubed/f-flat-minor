import Control.Monad.State
import Data.Map (Map) 
import qualified Data.Map as Map

type Stack = [Integer]
data EngineState = EngineState {
  stack :: Stack,
  queue :: Stack,
  defs :: Map Integer Stack
}

t = [  -- (FACT)
    33,1,   -- dup
    1,0,    -- 1
    45,1,   -- -
    -2,1,   -- fact
    42,1    -- *
  ]

t2 = [ -- FACT
    33,1,  -- dup
    1,0,   -- 1
    45,1,  -- -
    -1,0,  -- fact   
    63,1   -- ?
  ]

s = Map.fromList [(-1, t), (-2, t2)]

initState = EngineState [] [] s

type EngineStateM a = StateT EngineState IO a

push :: Integer -> EngineStateM ()
push x = do
  state <- get
  xs  <- gets stack
  put $ state { stack = (x:xs) }

pop :: EngineStateM Integer
pop = do
  state <- get
  xs  <- gets stack
  put $ state { stack = (tail xs) }
  return (head xs)

peek :: EngineStateM Integer
peek = do
  xs  <- gets stack
  return (head xs)

qpop :: EngineStateM Integer
qpop = do
  state <- get
  xs  <- gets queue
  put $ state { queue = (tail xs) }
  return (head xs)

qpush :: Integer -> EngineStateM ()
qpush x = do
  state <- get
  xs  <- gets queue
  put $ state { queue = (x:xs) }

call :: Integer -> EngineStateM ()
call x =
  if x < 0
    then callUser x
    else callOp x

run [] = return ()
run xs = do
  let x = (head xs)
  let y = (head (tail xs))
  if y == 0
    then push x
    else call x
  run (tail (tail xs))

callUser :: Integer -> EngineStateM ()
callUser x = do
  defs <- gets defs
  run (defs Map.! x)

callOp :: Integer -> EngineStateM ()
callOp x =
  case x of
    0 -> return ()
    1 -> return ()
    14 -> pushr
    15 -> pullr
    33 -> dup
    43 -> add
    45 -> sub
    42 -> mul
    46 -> dump
    63 -> wh
    _ -> error ("unknown opcode: " ++ show x)

-- engine

add = do
  x <- pop
  y <- pop
  push (x + y)

mul = do
  x <- pop
  y <- pop
  push (y * x)

sub = do 
  x <- pop
  y <- pop
  push (y - x)

dump = do
  stack <- gets stack
  liftIO $ print (reverse stack)

eval = do
  op <- pop
  call op

pushr = do
  x <- pop
  qpush x

pullr = do
  x <- qpop
  push x

dup = do
  x <- peek
  push x

wh = do
  a <- pop
  b <- pop
  if b /= 0
    then call a
    else return ()

-- Program

prog :: EngineStateM ()
prog = do
  push 100
  call (-2)
  call 46

main = runStateT prog initState

-- PUSH   -1         ; (FACT)
-- CALL   58         ; :
-- CALL   33         ; DUP
-- PUSH   1
-- CALL   45         ; -
-- CALL   -2         ; FACT
-- CALL   42         ; *
-- CALL   59         ; ;

-- PUSH   -2         ; FACT
-- CALL   58         ; :
-- CALL   33         ; DUP
-- PUSH   1
-- CALL   45         ; -
-- PUSH   -1         ; (FACT)
-- CALL   63         ; ?
-- CALL   59         ; ;

-- PUSH   100
-- CALL   -2         ; FACT
-- CALL   46         ; .