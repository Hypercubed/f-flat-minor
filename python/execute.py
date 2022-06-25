#!/usr/bin/env python3

# f-flat-minor v0

import random
import sys
import time

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
    defs[o]()

def callUser(o):
  global queue
  if o in defs:
    queue = defs[o] + queue

def callOp(o):
  if o <= systemOps:
    callSystem(o)
  else:
    callUser(o)

def call():
  callOp(stack.pop())

def swap():
  a = stack[-1]
  stack[-1] = stack[-2]
  stack[-2] = a

def q():
  a = stack.pop()
  if (stack.pop() != 0):
    callOp(a)

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
# stash
# fetch
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

def run():
  while len(queue) > 0:
    s = queue.pop(0)
    
    if s.lstrip("-").isnumeric():
      stack.append(int(s))
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
    elif s.endswith(':'):
      n = s[:-1]
      d = []
      while len(queue) > 0:
        ss = queue.pop(0)
        d.append(ss)
        if queue[0] == ';':
          queue.pop(0)
          break
      define(n, d)
    elif s == '[':
      o = nextOp()
      d = []
      dep = 1
      while len(queue) > 0 and dep > 0:
        ss = queue.pop(0)
        if ss == ']':
          dep -= 1
        if ss == '[':
          dep += 1
        if dep > 0:
          d.append(ss)
      defs[o] = d
      stack.append(o)
    elif s == "/*":
      while len(queue) > 0:
        if queue.pop(0) == '*/':
          break
    else:
      if s in ops:
        callOp(ops[s])
      else:
        print('undefined', s)
        exit()

lines = sys.stdin.readlines()
code = ' '.join(lines)

queue = code.split()
run()
