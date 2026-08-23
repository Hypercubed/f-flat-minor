# Fbm0 interpreter in Tungsten
# Faithful port of python/execute.py (f-flat-minor v0)
# Usage: tungsten -o fbm main.w && ./fbm < input.ff

stack = []
queue = []
names = []
codes = []
defs = []
op_cell = [-1]

-> epoch_millis
  File.write("/tmp/.fbm-clock", "t")
  st = File.stat("/tmp/.fbm-clock")
  if st == nil
    return 0
  end
  ms = st.mtime_ns / 1000000
  ret2 = ms
  ret2

rng_cell = [(epoch_millis() * 2685821657736338717 + 12345) % 11400714819323198485]

SYSTEM_WORDS = ["nop", "eval", "putc", "putn", "drop", "q<", "q>", "clock",
  "clr", "rand", "dup", "depth", "swap", "%", "(", ")", "*", "+", "cons",
  "-", ".", "/", ":", "<<", ">>", "<", "=", ">", "?", "^", "|", "&", "~"]


system_count_cell = [32]

-> next_op
  op_cell[0] += 1
  op_cell[0]

-> names_has(n)
  i = 0
  while i < names.size
    if names[i] == n
      return true
    end
    i += 1
  end
  false

-> sym(name)
  n = name.downcase
  i = 0
  while i < names.size
    if names[i] == n
      return codes[i]
    end
    i += 1
  end
  o = next_op()
  names.push(n)
  codes.push(o)
  o

-> fail(msg)
  print(msg)
  exit(1)

-> next_rand
  rng_cell[0] = (rng_cell[0] + epoch_millis() % 4096) * 6364136223846793005 + 1442695040888963407
  r = rng_cell[0]
  if r < 0
    r = -r
  end
  r

# ---- string helpers (dodge revision gaps; no range slices) ----

-> starts_with(s, p)
  if p.size > s.size
    return false
  end
  i = 0
  while i < p.size
    if s[i] != p[i]
      return false
    end
    i += 1
  end
  true

-> ends_with(s, p)
  if p.size > s.size
    return false
  end
  i = s.size - p.size
  j = 0
  while j < p.size
    if s[i] != p[j]
      return false
    end
    i += 1
    j += 1
  end
  true

-> slice_from(s, start)
  out = ""
  i = start
  while i < s.size
    out += s[i]
    i += 1
  end
  out

-> slice_to(s, stop)
  slice_between(s, 0, stop)

-> slice_between(s, a, b)
  out = ""
  i = a
  while i < b
    out += s[i]
    i += 1
  end
  out

-> is_digit(c)
  c >= "0" && c <= "9"

-> digits_only(t)
  if t.size == 0
    return false
  end
  i = 0
  while i < t.size
    if !is_digit(t[i])
      return false
    end
    i += 1
  end
  true

-> hex_digits(h)
  if h.size == 0
    return false
  end
  i = 0
  while i < h.size
    c = h[i]
    if !is_digit(c) && !(c >= "a" && c <= "f")
      return false
    end
    i += 1
  end
  true

-> bits_only(b)
  if b.size == 0
    return false
  end
  i = 0
  while i < b.size
    c = b[i]
    if c != "0" && c != "1"
      return false
    end
    i += 1
  end
  true

-> oct_digits(o2)
  if o2.size == 0
    return false
  end
  i = 0
  while i < o2.size
    c = o2[i]
    if c < "0" || c > "7"
      return false
    end
    i += 1
  end
  true

-> has_scientific(t)
  pos = -1
  i = 0
  while i < t.size
    if t[i] == "e" || t[i] == "E"
      if pos >= 0
        return false
      end
      pos = i
    end
    i += 1
  end
  if pos <= 0 || pos == t.size - 1
    return false
  end
  mant = slice_to(t, pos)
  exp = slice_from(t, pos + 1)
  seen_digit = false
  j = 0
  while j < mant.size
    c = mant[j]
    if is_digit(c)
      seen_digit = true
    elsif !(c == "." || c == "_")
      return false
    end
    j += 1
  end
  if !seen_digit
    return false
  end
  if exp[0] == "+" || exp[0] == "-"
    exp = slice_from(exp, 1)
  end
  digits_only(exp.delete("_"))

-> strip_underscores(t)
  a = 0
  while a < t.size && t[a] == "_"
    a += 1
  end
  b = t.size
  while b > a && t[b - 1] == "_"
    b -= 1
  end
  slice_between(t, a, b)

# Port of execute.py number(): ints only, prefixes, scientific via float.
-> number(text)
  t = strip_underscores(text)
  neg = false
  if t.size > 0 && t[0] == "-"
    neg = true
    t = slice_from(t, 1)
  elsif t.size > 0 && t[0] == "+"
    t = slice_from(t, 1)
  end
  if t.size == 0
    return nil
  end
  v = nil
  if starts_with(t, "0x") || starts_with(t, "0X")
    h = slice_from(t, 2).downcase.delete("_")
    if !hex_digits(h)
      return nil
    end
    v = h.to_i(16)
  elsif starts_with(t, "0b") || starts_with(t, "0B")
    b = slice_from(t, 2).delete("_")
    if !bits_only(b)
      return nil
    end
    v = b.to_i(2)
  elsif starts_with(t, "0o") || starts_with(t, "0O")
    o2 = slice_from(t, 2).delete("_")
    if !oct_digits(o2)
      return nil
    end
    v = o2.to_i(8)
  elsif has_scientific(t)
    v = t.delete("_").to_f.to_i
  else
    d = t.delete("_")
    if !digits_only(d)
      return nil
    end
    v = d.to_i(10)
  end
  if neg
    ret = -v
  else
    ret = v
  end
  ret

# '...' token: push character codes (minimal unescape).
-> push_string(tok)
  body = slice_from(tok, 1)
  if ends_with(body, "'")
    body = slice_to(body, body.size - 1)
  end
  i = 0
  while i < body.size
    c = body[i]
    if c == "\\" && i + 1 < body.size
      i += 1
      e = body[i]
      if e == "n"
        stack.push(10)
      elsif e == "t"
        stack.push(9)
      elsif e == "r"
        stack.push(13)
      elsif e == "0"
        stack.push(0)
      elsif e == "b"
        stack.push(8)
      elsif e == "v"
        stack.push(11)
      elsif e == "f"
        stack.push(12)
      elsif e == "s"
        stack.push(32)
      elsif e == "\\"
        stack.push(92)
      elsif e == "'"
        stack.push(39)
      elsif e == "\""
        stack.push(34)
      else
        stack.push(e[0].ord)
      end
    else
      stack.push(c[0].ord)
    end
    i += 1
  end

# ---- queue/stack splicing (globals are mutated, never rebound) ----

-> splice_front(body)
  j = body.size - 1
  while j >= 0
    queue.unshift(body[j])
    j -= 1
  end

-> ensure_def(o)
  while defs.size <= o
    defs.push(nil)
  end
  defs


-> call_dispatch(o)
  if o <= system_count_cell[0]
    call_system(o)
  else
    ensure_def(o)
    body = defs[o]
    if body == nil
      print("undefined user call " + o.to_s + "\n")
      exit(0)
    end
    splice_front(body)
  end

# System operations; opcode = position in the defineSystem order of
# python/execute.py: nop eval putc putn drop q< q> clock clr rand dup depth
# swap % ( ) * + cons - . / : << >> < = > ? ^ | & ~
-> call_system(o)
  if o == 0
    print("")
  elsif o == 1
    call_dispatch(stack.pop())
  elsif o == 2
    print(stack.pop().chr)
  elsif o == 3
    print(stack.pop().to_s)
  elsif o == 4
    stack.pop()
  elsif o == 5
    queue.push(stack.pop())
  elsif o == 6
    stack.push(queue.pop())
  elsif o == 7
    stack.push(epoch_millis() / 1000)
  elsif o == 8
    stack.clear
  elsif o == 9
    n = stack.pop()
    if n < 0
      fail("rand: negative range")
    end
    stack.push(next_rand() % (n + 1))
  elsif o == 10
    stack.push(stack.last)
  elsif o == 11
    stack.push(stack.size)
  elsif o == 12
    a = stack.pop()
    b = stack.pop()
    stack.push(a)
    stack.push(b)
  elsif o == 13
    a = stack.pop()
    b = stack.pop()
    stack.push(b % a)
  elsif o == 14
    l = stack.size
    k = 0
    while k < l
      queue.push(stack[k])
      k += 1
    end
    queue.push(l)
    stack.clear
  elsif o == 15
    l = queue.pop()
    moved = []
    while moved.size < l && queue.size > 0
      moved.push(queue.pop())
    end
    i2 = 0
    while i2 < moved.size
      stack.unshift(moved[i2])
      i2 += 1
    end
  elsif o == 16
    a = stack.pop()
    b = stack.pop()
    stack.push(b * a)
  elsif o == 17
    a = stack.pop()
    b = stack.pop()
    stack.push(b + a)
  elsif o == 18
    y = stack.pop()
    x = stack.pop()
    o2 = next_op()
    ensure_def(o2)
    defs[o2] = [x, y, "eval"]
    stack.push(o2)
  elsif o == 19
    a = stack.pop()
    b = stack.pop()
    stack.push(b - a)
  elsif o == 20
    out = "\["
    k = 0
    while k < stack.size
      out = out + " " + stack[k].to_s
      k += 1
    end
    out = out + " ]"
    print(out + "\n")
  elsif o == 21
    a = stack.pop()
    b = stack.pop()
    stack.push(b / a)
  elsif o == 22
    oname = stack.pop()
    ensure_def(oname)
    if defs[oname] != nil
      print("User word already defined" + "\n")
      exit(0)
    end
    body = []
    while queue.size > 0
      item = queue.shift()
      if item == ";"
        break
      end
      body.push(item)
    end
    defs[oname] = body
  elsif o == 23
    a = stack.pop()
    b = stack.pop()
    stack.push(b << a)
  elsif o == 24
    a = stack.pop()
    b = stack.pop()
    stack.push(b >> a)
  elsif o == 25
    a = stack.pop()
    b = stack.pop()
    if b < a
      stack.push(1)
    else
      stack.push(0)
    end
  elsif o == 26
    a = stack.pop()
    b = stack.pop()
    if b == a
      stack.push(1)
    else
      stack.push(0)
    end
  elsif o == 27
    a = stack.pop()
    b = stack.pop()
    if b > a
      stack.push(1)
    else
      stack.push(0)
    end
  elsif o == 28
    quot = stack.pop()
    flag = stack.pop()
    if flag != 0
      call_dispatch(quot)
    end
  elsif o == 29
    a = stack.pop()
    b = stack.pop()
    stack.push(b ** a)
  elsif o == 30
    a = stack.pop()
    b = stack.pop()
    stack.push(b | a)
  elsif o == 31
    a = stack.pop()
    b = stack.pop()
    stack.push(b & a)
  elsif o == 32
    v = stack.pop()
    stack.push(-v - 1)
  else
    fail("undefined system call")
  end

# Execute one token (port of run()'s branch order).
-> exec_token(t)
  if t.is_a?(Integer)
    stack.push(t)
    return
  end
  s = t
  if s.size > 1 && s[0] == "."
    return
  end
  if starts_with(s, "'")
    push_string(s)
    return
  end
  if s.size >= 2 && s[0] == "\[" && s[s.size - 1] == "]"
    stack.push(sym(slice_from(slice_to(s, s.size - 1), 1)))
    return
  end
  if s.size > 1 && s[s.size - 1] == ":"
    stack.push(sym(slice_to(s, s.size - 1)))
    queue.unshift(":")
    return
  end
  if s == "\["
    o = next_op()
    ensure_def(o)
    d = []
    dep = 1
    while queue.size > 0 && dep > 0
      ss = queue.shift()
      if ss == "\]"
        dep -= 1
      elsif ss == "\["
        dep += 1
      end
      if dep > 0
        d.push(ss)
      end
    end
    defs[o] = d
    stack.push(o)
    return
  end
  if s == ":"
    call_system(22)
    return
  end
  if s == "/*"
    while queue.size > 0
      if queue.shift() == "*/"
        break
      end
    end
    return
  end
  lw = s.downcase
  if !names_has(lw)
    File.write("/dev/stderr", "KeyError: " + lw + "\n")
    exit(1)
  end
  o = sym(lw)
  call_dispatch(o)

# ---- main ----

# Register system words first so they claim opcodes 0..32 in the same
# order as python/execute.py's defineSystem calls.
si = 0
while si < SYSTEM_WORDS.size
  sym(SYSTEM_WORDS[si])
  si += 1
end

lines = []
while true
  l = gets
  if l == nil
    break
  end
  lines.push(l)
end
code = lines.join(" ")

# Whitespace tokenizer (strings are NOT protected from splitting,
# matching execute.py's text.split()).
tokens = []
cur = ""
i = 0
while i < code.size
  c = code[i]
  cp = c[0].ord
  if cp == 32 || (cp >= 9 && cp <= 13)
    if cur.size > 0
      num = number(cur)
      if num != nil
        tokens.push(num)
      else
        tokens.push(cur)
      end
      cur = ""
    end
  else
    cur = cur + c
  end
  i += 1
end
if cur.size > 0
  num = number(cur)
  if num != nil
    tokens.push(num)
  else
    tokens.push(cur)
  end
end

k = 0
while k < tokens.size
  queue.push(tokens[k])
  k += 1
end

while queue.size > 0
  exec_token(queue.shift())
end
