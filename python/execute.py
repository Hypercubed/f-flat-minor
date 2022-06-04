#!/usr/bin/env python3

# f-flat-minor v0

import sys
import time

stack = []
r_stack = []
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

def mod():
  a = stack.pop()
  stack[-1] %= a

def band():
  a = stack.pop()
  stack[-1] = stack[-1] & a

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

def printStack():
  print('[ ', end='')
  for i in range(len(stack)):
    print(stack[i], end='')
  print(' ]')

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

def pushq():
  a = stack.pop()
  r_stack.append(a)

def popq():
  a = r_stack.pop()
  stack.append(a)

define('nop', nop)
define('eval', call)
define('putc', putc)
# getc
define('drop', lambda: stack.pop() )
define('q<', pushq)
define('q>', popq)
# clr
define('dup', dup)
# depth
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

def ev(t):
  i = 0
  l = len(t)
  while i < l:
    s = t[i]
    i += 1
    if s.lstrip("-").isnumeric():
      push(s)
    elif s.startswith('&') and len(s) > 1:
      n = s[1:]
      if n in ops:
        push(ops[n])
    elif s.startswith('\''):
      n = s[1:-1][::-1] if s.endswith('\'') else s[1:][::-1]
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
    elif s == '[':
      o = nextOp()
      d = []
      dep = 1
      while i < l and dep > 0:
        if t[i] == ']':
          dep -= 1
        if t[i] == '[':
          dep += 1
        if dep > 0:
          d.append(t[i])
        i += 1
      defs[o] = d
      push(o)
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

lines = sys.stdin.readlines()
code = ' '.join(lines)

ev(code.split())
