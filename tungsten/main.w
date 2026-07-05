# F♭m Interpreter in Tungsten
# Interprets F♭m0 stack-based language (minimal subset)
# Usage: tungsten main.w < input.ff

# Global state
stack = []
queue = []
defs = {}
ops = {}
op = 0

# Operation symbol table - returns opcode for a word name
getSym = -> (name)
  n = name.lowercase
  if n not in ops
    ops[n] = op
    op = op + 1
  ops[n]

# Tokenize F♭m source - split on whitespace
tokenize = -> (text)
  result = []
  current = ""
  inString = false
  inComment = false
  i = 0
  while i < text.length
    c = text[i]
    if inComment
      if c == "*" and i + 1 < text.length and text[i+1] == "/"
        inComment = false
        i = i + 1
      i = i + 1
      continue
    if inString
      current = current + c
      if c == "'"
        inString = false
        if current.length > 1
          result.append(current)
        current = ""
      i = i + 1
      continue
    if c == "'"
      inString = true
      current = c
      i = i + 1
      continue
    if c == "/" and i + 1 < text.length and text[i+1] == "*"
      inComment = true
      i = i + 2
      continue
    if c.isWhitespace
      if current.length > 0
        result.append(current)
        current = ""
    else
      current = current + c
    i = i + 1
  if current.length > 0
    result.append(current)
  result

# Execute a single token
executeToken = -> (t)
  if t is Integer
    stack.append(t)
  elif t startsWith "." and t.length > 1
    return
  else
    if t startsWith "[" and t.endsWith "]"
      stack.append(getSym(t[1:-1]))
    elif t endsWith ":"
      stack.append(getSym(t[0:-1]))
      queue = [":"] + queue
    elif t == "["
      body = []
      depth = 1
      while queue.length > 0 and depth > 0
        item = queue.pop(0)
        if item == "]"
          depth = depth - 1
        elif item == "["
          depth = depth + 1
        if depth > 0
          body.append(item)
      op = op + 1
      defs[op] = body
      stack.append(op)
    elif t == ":"
      o = stack.pop
      body = []
      while queue.length > 0
        item = queue.pop(0)
        if item == ";"
          break
        body.append(item)
      defs[o] = body
    else
      o = getSym(t)
      if o in defs
        body = defs[o]
        if body is Function
          body()
        else
          queue = body + queue
      else
        << "Error: undefined operation " + t
        exit(1)

# Main execution loop
run = -> ()
  while queue.length > 0
    executeToken(queue.pop(0))

# Execute a quoted body (for conditionals)
executeQuote = -> (body)
  if body is List
    body.each(-> item
      executeToken(item)
    )

# System operation implementations
nop = -> ()

eval = -> ()
  o = stack.pop
  body = defs[o]
  if body is Function
    body()
  else
    queue = body + queue

putc = -> ()
  << stack.pop.char

putn = -> ()
  << stack.pop

drop = -> ()
  stack.pop

pushq = -> ()
  queue.append(stack.pop)

popq = -> ()
  stack.append(queue.pop)

rand = -> ()
  n = stack.pop
  stack.append(random.int(0, n))

clr = -> ()
  stack.clear

dup = -> ()
  stack.append(stack.last)

depth = -> ()
  stack.append(stack.length)

swap = -> ()
  a = stack.pop
  b = stack.pop
  stack.append(a)
  stack.append(b)

mod = -> ()
  a = stack.pop
  b = stack.pop
  r = b % a
  if (b < 0) != (a < 0) and r != 0
    r = r + a
  stack.append(r)

band = -> ()
  a = stack.pop
  b = stack.pop
  stack.append(b & a)

stash = -> ()
  queue.extend(stack)
  queue.append(stack.length)
  stack.clear

fetch = -> ()
  l = queue.pop
  stack = queue.last(l) + stack
  queue = queue.take(queue.length - l)

mul = -> ()
  a = stack.pop
  b = stack.pop
  stack.append(b * a)

add = -> ()
  a = stack.pop
  b = stack.pop
  stack.append(b + a)

sub = -> ()
  a = stack.pop
  b = stack.pop
  stack.append(b - a)

printStack = -> ()
  << "[" + stack.map(-> x -> x.toString).join(" ") + "]"

div = -> ()
  a = stack.pop
  b = stack.pop
  q = b / a
  if (b < 0) != (a < 0) and b % a != 0
    q = q - 1
  stack.append(q)

lt = -> ()
  a = stack.pop
  b = stack.pop
  stack.append(if b < a then 1 else 0)

eq = -> ()
  a = stack.pop
  b = stack.pop
  stack.append(if b == a then 1 else 0)

gt = -> ()
  a = stack.pop
  b = stack.pop
  stack.append(if b > a then 1 else 0)

pow = -> ()
  a = stack.pop
  b = stack.pop
  stack.append(b ** a)

bor = -> ()
  a = stack.pop
  b = stack.pop
  stack.append(b | a)

bnot = -> ()
  stack.append(~stack.pop)

rshift = -> ()
  a = stack.pop
  b = stack.pop
  stack.append(b >> a)

lshift = -> ()
  a = stack.pop
  b = stack.pop
  stack.append(b << a)

mark = -> ()
  o = stack.pop
  body = []
  while queue.length > 0
    ss = queue.pop(0)
    if ss == ";"
      break
    body.append(ss)
  defs[o] = body

when = -> ()
  flag = stack.pop
  quot = stack.pop
  if flag != 0
    executeQuote(quot)

# Initialize system operations (opcodes from F♭m spec)
defs[0] = nop
defs[1] = eval
defs[2] = putc
defs[5] = putn
defs[8] = drop
defs[14] = pushq
defs[15] = popq
defs[20] = rand
defs[24] = clr
defs[33] = dup
defs[35] = depth
defs[36] = swap
defs[37] = mod
defs[38] = band
defs[40] = stash
defs[41] = fetch
defs[42] = mul
defs[43] = add
defs[45] = sub
defs[46] = printStack
defs[47] = div
defs[58] = mark
defs[60] = lt
defs[61] = eq
defs[62] = gt
defs[94] = pow
defs[124] = bor
defs[126] = bnot

# Main entry - read stdin and execute
lines = io.read_all
code = lines.join(" ")
queue = tokenize(code)
run()
printStack()