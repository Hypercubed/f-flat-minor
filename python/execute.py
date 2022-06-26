#!/usr/bin/env python3

# f-flat-minor v0

import random
import sys
import time
import getopt

stack = []
queue = []

ops = {}
defs = {}
op = -1
systemOps = 0

def nextOp():
  global op
  op = op + 1
  return op

def define(name, item):
  o = nextOp()
  ops[name] = o
  defs[o] = item

def clr():
  return stack.clear()

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

def mod():
  a = stack.pop()
  stack[-1] %= a

def band():
  a = stack.pop()
  stack[-1] &= a

def bor():
  a = stack.pop()
  stack[-1] |= a

def bnot():
  stack[-1] = ~stack[-1]

def pow():
  a = stack.pop()
  stack[-1] = stack[-1]**a

def div():
  a = stack.pop()
  stack[-1] = int(stack[-1] / a)

def eq():
  a = stack.pop()
  stack[-1] = int(stack[-1] == a)

def lt():
  a = stack.pop()
  stack[-1] = int(stack[-1] < a)

def gt():
  a = stack.pop()
  stack[-1] = int(stack[-1] > a)

def rsh():
  a = stack.pop()
  stack[-1] = int(stack[-1] >> a)

def lsh():
  a = stack.pop()
  stack[-1] = int(stack[-1] << a)

def clock():
  stack.append(int(time.time()))

def depth():
  stack.append(int(len(stack)))

def printStack():
  print('[ ', end='')
  for i in range(len(stack)):
    print(f'{stack[i]} ', end='')
  print(']')

def callSystem(o):
  if o in defs:
    return defs[o]()
  else:
    print('undefined system call', o)
    exit()

def callUser(o):
  global queue
  if o in defs:
    queue = defs[o] + queue
    return
  else:
    print('undefined user call', o)
    exit()

def call():
  o = stack.pop()
  if o <= systemOps:
    return callSystem(o)
  else:
    return callUser(o)

def swap():
  a = stack[-1]
  stack[-1] = stack[-2]
  stack[-2] = a

def q():
  o = stack.pop()
  if (stack.pop() != 0):
    if o <= systemOps:
      return callSystem(o)
    else:
      return callUser(o)

def dup():
  stack.append(stack[-1])

def putc():
  print(chr(stack.pop()), end='')

def drop():
  stack.pop()

def pushq():
  queue.append(stack.pop())

def popq():
  stack.append(queue.pop())

def rand():
  stack.append(random.randint(0, stack.pop()))

def stash():
  l = len(stack)
  queue.extend(stack)
  del stack[:]
  queue.append(l)

def fetch():
  global stack
  l = queue.pop()
  stack = queue[-l:] + stack
  del queue[-l:]

define('nop', nop)
define('eval', call)
define('putc', putc)
# getc
define('drop', lambda: stack.pop() )
define('q<', pushq)
define('q>', popq)
define('clock', clock)
define('clr', clr)
define('rand', rand)
define('dup', dup)
define('depth', depth)
define('swap', swap)
define('%', mod)
define('(', stash)
define(')', fetch)
define('*', mul)
define('+', add)
define('-', sub)
define('.', printStack)
define('/', div)
# mark
# def
define('<<', lsh)
define('>>', rsh)
define('<', lt)
define('=', eq)
define('>', gt)
define('?', q)
# bra
# ket
define('^', pow)
define('|', bor)
define('&', band)
define('~', bnot)

systemOps = op

def unescape(text):
  return text.replace('\\n', '\n').replace('\\s', ' ')

def number(text):
  text = text.strip("_")
  try:
    if text.startswith("0x"):
      return int(text, 16)
    elif text.startswith("0b"):
      return int(text, 2)
    elif text.startswith("0o"):
      return int(text, 8)
    elif "e" in text or "E" in text:
      return int(float(text))
    else:
      return int(text)
  except:
    return None

def run():
  while len(queue) > 0:
    s = queue.pop(0)
    sn = number(s)
    
    if sn != None:
      stack.append(sn)
    elif s.startswith('.') and len(s) > 1:
      continue
    elif s.startswith('&') and len(s) > 1:
      n = s[1:]
      if n in ops:
        stack.append(ops[n])
    elif s.startswith('\''):
      n = s[1:-1] if s.endswith('\'') else s[1:]
      n = unescape(n)
      stack.extend([ord(c) for c in n[::-1]])
    elif s.endswith(':') and len(s) > 1:
      n = s[:-1]
      d = []
      while len(queue):
        ss = queue.pop(0)
        if ss == ';':
          break
        d.append(ss)
      define(n, d)
    elif s == '[':
      o = nextOp()
      d = []
      dep = 1
      while len(queue) and dep:
        ss = queue.pop(0)
        if ss == ']':
          dep -= 1
        elif ss == '[':
          dep += 1
        if dep > 0:
          d.append(ss)
      defs[o] = d
      stack.append(o)
    elif s == "/*":
      while len(queue):
        if queue.pop(0) == '*/':
          break
    else:
      o = ops[s]
      if o <= systemOps:
        callSystem(o)
      else:
        callUser(o)

def main():
  global queue

  try:
    opts, _ = getopt.getopt(sys.argv[1:], "s", ["stats"])
  except:
    sys.exit(2)

  lines = sys.stdin.readlines()
  code = ' '.join(lines)

  queue = code.split()

  for opt, _ in opts:
    if opt in ("-s", "--stats"):
      import cProfile
      cProfile.run('run()')
      return

  run()

if __name__ == "__main__":
    main()