import time

stack = []
ops = {}
defs = {}
op = -1

def nextOp():
  global op
  op = op + 1
  return op

def define(name, item):
  o = nextOp()
  ops[name] = o
  defs[o] = item

def push(x):
  stack.append(int(x))

def pop():
  return stack.pop()

def nop():
  return

def add():
  a = stack.pop()
  stack[-1] += a

def sub():
  a = stack.pop()
  stack[-1] -= a

def mul():
  a = stack.pop()
  stack[-1] *= a

def div():
  a = stack.pop()
  stack[-1] = int(stack[-1] / a)

def eq():
  a = stack.pop()
  stack[-1] = int(stack[-1] == a)

def printStack():
  print(stack)

def callOp(o):
  if o in defs:
    f = defs[o]
    if isinstance(f, list):
      ev(f)
    else:
      defs[o]()

def call():
  o = stack.pop()
  callOp(o)

def swap():
  a = stack.pop()
  b = stack.pop()
  push(a)
  push(b)

def q():
  a = stack.pop()
  b = stack.pop()
  if (b != 0):
    callOp(a)

def dup():
  a = stack[-1]
  push(a)

def dip():
  a = stack.pop()
  b = stack.pop()
  callOp(a)
  push(b)

def putc():
  a = stack.pop()
  print(chr(a), end='')

def drop():
  stack.pop()

define('nop', nop)
define('call', call)
define('+', add)
define('-', sub)
define('*', mul)
define('/', div)
define('.', printStack)
define('=', eq)
define('swap', swap)
define('?', q)
define('dup', dup)
define('dip', dip)
define('drop', lambda: stack.pop() )
define('putc', putc)

def ev(t):
  i = 0
  l = len(t)
  while i < l:
    s = t[i]
    i += 1
    if s.isnumeric():
      push(s)
    elif s.startswith('&'):
      n = s[1:]
      if n in ops:
        push(ops[n])
    elif s.startswith('\''):
      n = s[1:][::-1]
      stack.extend([ord(c) for c in n])
    elif s.endswith(':'):
      n = s[:-1]
      d = []
      while i < l:
        ss = t[i]
        d.append(ss)
        i += 1
        if t[i] == ';':
          i += 1
          break
      define(n, d)
    elif s == "/*":
      while i < l:
        i += 1
        if t[i] == '*/':
          i += 1
          break
    else:
      if s in ops:
        callOp(ops[s])
      else:
        print('undefined', s)
        exit()

ev("""

  /* common definitions */
  --: 1 - ;
  not: 0 = ;
  rot: &swap dip swap ;
  choose: &swap ? drop ;
  ifte: rot choose call ;

  /* define factorial */
  fact_t: drop 1 ;
  fact_f: dup -- fact * ;
  fact: dup &fact_t &fact_f ifte ;

  /* string printing */
  print_t: drop ;
  print_f: putc print ;
  print: dup &print_t &print_f ifte ;
  println: print 10 putc ;

  0 'Factorial print
  32 putc
  0 '100: println

  100 fact .

""".split())
