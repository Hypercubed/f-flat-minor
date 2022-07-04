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

def getSym(n):
  if n not in ops:
    ops[n] = nextOp()
  return ops[n]
  
def defineSystem(name, item):
  o = getSym(name)
  ops[name] = o
  defs[o] = item

def defineUser(o, item):
  if o in defs:
    print('User word already defined')
    exit()
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

def printNumber():
  print(stack.pop(), end='')

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

def mark():
  global stack
  o = stack.pop()
  d = []
  while len(queue):
    ss = queue.pop(0)
    if ss == ';':
      break
    d.append(ss)
  defineUser(o, d)

defineSystem('nop', nop)
defineSystem('eval', call)
defineSystem('putc', putc)
# getc
defineSystem('print', printNumber)
defineSystem('drop', lambda: stack.pop() )
defineSystem('q<', pushq)
defineSystem('q>', popq)
defineSystem('clock', clock)
defineSystem('clr', clr)
defineSystem('rand', rand)
defineSystem('dup', dup)
defineSystem('depth', depth)
defineSystem('swap', swap)
defineSystem('%', mod)
defineSystem('(', stash)
defineSystem(')', fetch)
defineSystem('*', mul)
defineSystem('+', add)
defineSystem('-', sub)
defineSystem('.', printStack)
defineSystem('/', div)
defineSystem(':', mark)
# def
defineSystem('<<', lsh)
defineSystem('>>', rsh)
defineSystem('<', lt)
defineSystem('=', eq)
defineSystem('>', gt)
defineSystem('?', q)
# bra
# ket
defineSystem('^', pow)
defineSystem('|', bor)
defineSystem('&', band)
defineSystem('~', bnot)

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

def token(s):
  sn = number(s)
  if sn != None:
    return sn
  else:
    return s

def tokenize(text):
  a = text.split()
  return list(map(token, a))

def run():
  global queue
  
  while len(queue) > 0:
    s = queue.pop(0)
    
    if type(s) == int:
      stack.append(s)
    elif s.startswith('.') and len(s) > 1:
      continue
    elif s.startswith('[') and s.endswith(']'):
      n = s[1:-1]
      stack.append(getSym(n))
    elif s.startswith('\''):
      n = s[1:-1] if s.endswith('\'') else s[1:]
      n = unescape(n)
      stack.extend([ord(c) for c in n])
    elif s.endswith(':') and len(s) > 1:
      n = s[:-1]
      stack.append(getSym(n))
      queue = [':'] + queue
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

  queue = tokenize(code)

  for opt, _ in opts:
    if opt in ("-s", "--stats"):
      import cProfile
      cProfile.run('run()')
      return

  run()

if __name__ == "__main__":
    main()