#!/usr/bin/env ruby

$stack = Array.new

$op = -1
$syms = Hash.new
$defs = Hash.new

def define (str, d)
  $op = $op + 1
  $syms[str] = $op
  $defs[$op] = d
end

def is_integer? (str)
  str.to_i.to_s == str
end

def push(a)
  $stack.push(a)
end

def pop()
  $stack.pop
end

def callOp (o)
  if f = $defs[o]
    if f.kind_of?(Array)
      ev(f)
    else
      f.()
    end
  end
end

def ev (arr)
  l = arr.length()
  i = 0
  while i < l
    item = arr[i]
    if is_integer?(item)
      push item.to_i
    elsif item[0] == "'"
      item[1..-1].reverse!.each_byte do |c|
        push(c)
      end
    elsif item[0] == "&"
      if o = $syms[item[1..-1]]
        push(o)
      end
    elsif item[-1] == ":"
      d = Array.new
      while i < l
        i += 1
        if arr[i] == ';'
          break
        end
        d.push(arr[i])
      end
      define(item[0..-2], d)
    elsif item == "/*"
      while i < l
        i += 1
        if arr[i] == '*/'
          break
        end
      end
    elsif o = $syms[item]
      callOp(o)
    end
    i += 1
  end
end

def tokenize (str)
  str.gsub(/\s+/m, ' ').strip.split(" ")
end

define('nop', lambda {||
})

define('.', lambda {||
  puts $stack.inspect
})

define('+', lambda {||
  a = pop()
  $stack[-1] += a
})

define('-', lambda {||
  a = pop()
  $stack[-1] -= a
})

define('*', lambda {||
  a = pop()
  $stack[-1] *= a
})

define('/', lambda {||
  a = pop()
  $stack[-1] /= a
})

define('drop', lambda {||
  pop
})

define('=', lambda {||
  a = pop()
  $stack[-1] = ($stack[-1] == a) && 1 || 0
})

define('swap', lambda {||
  a = pop()
  b = pop()
  push(a)
  push(b)
})

define('dip', lambda {||
  a = pop()
  b = pop()
  callOp(a)
  push(b)
})

define('dup', lambda {||
  push($stack[-1])
})

define('call', lambda {||
  o = pop()
  callOp(o)
})

define('?', lambda {||
  a = pop()
  b = pop()
  if b != 0
    callOp(a)
  end
})

define('putc', lambda {||
  a = pop()
  putc a
})

$code = ARGF.read

ev(tokenize($code))
