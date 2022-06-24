#!/usr/bin/env ruby

require 'date'

# f-flat-minor v0

$stack = Array.new
$queue = Array.new

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
      $queue = f + $queue
    else
      f.()
    end
  end
end

def unescape (text)
  text.gsub("\\n", "\n").gsub("\\s", " ")
end

def run ()
  while $queue.length() > 0
    item = $queue.shift

    if is_integer?(item)
      push item.to_i
    elsif item[0] == "." && item.length() > 1
      # no-op
    elsif item[0] == "'"
      e = item[-1] == "'" ? item[1..-2] : item[1..-1]
      unescape(e).reverse!.each_byte do |c|
        push(c)
      end
    elsif item[0] == "&" && item.length() > 1
      if o = $syms[item[1..-1]]
        push(o)
      end
    elsif item[-1] == ":"
      d = Array.new
      while $queue.length() > 0
        s = $queue.shift
        if s == ';'
          break
        end
        d.push(s)
      end
      define(item[0..-2], d)
    elsif item[-1] == "["
      d = Array.new
      o = $op = $op + 1
      dep = 1
      while $queue.length() > 0 && dep > 0
        s = $queue.shift
        if s == '['
          dep += 1
        end
        if s == ']'
          dep -= 1
        end
        if dep > 0
          d.push(s)
        end
      end
      $defs[o] = d
      push(o)
    elsif item == "/*"
      while $queue.length() > 0
        if $queue.shift == '*/'
          break
        end
      end
    elsif o = $syms[item]
      callOp(o)
    else
      print('undefined call to ', item)
      exit()
    end
  end
end

def tokenize (str)
  str.gsub(/\s+/m, ' ').strip.split(" ")
end

define('nop', lambda {||
})

define('eval', lambda {||
  o = pop()
  callOp(o)
})

define('putc', lambda {||
  a = pop()
  putc a
})

# getc

define('clock', lambda {||
  push Date.today.to_time.to_i
})

define('drop', lambda {||
  pop
})

define('q<', lambda {||
  a = pop()
  $queue.push(a)
})

define('q>', lambda {||
  a = $queue.pop
  push a
})

define('clr', lambda {||
  $stack.clear
})

define('dup', lambda {||
  push($stack[-1])
})

define('depth', lambda {||
  push($stack.length())
})

define('swap', lambda {||
  a = pop()
  b = pop()
  push(a)
  push(b)
})

define('%', lambda {||
  a = pop()
  $stack[-1] %= a
})

# stash
# fetch

define('*', lambda {||
  a = pop()
  $stack[-1] *= a
})

define('+', lambda {||
  a = pop()
  $stack[-1] += a
})

define('-', lambda {||
  a = pop()
  $stack[-1] -= a
})

define('.', lambda {||
  puts "[ " + $stack.join(" ") + " ]"
})

define('/', lambda {||
  a = pop()
  $stack[-1] /= a
})

define('>>', lambda {||
  a = pop()
  $stack[-1] >>= a
})

define('<<', lambda {||
  a = pop()
  $stack[-1] <<= a
})

# mark
# def

define('<', lambda {||
  a = pop()
  $stack[-1] = ($stack[-1] < a) && 1 || 0
})

define('=', lambda {||
  a = pop()
  $stack[-1] = ($stack[-1] == a) && 1 || 0
})

define('>', lambda {||
  a = pop()
  $stack[-1] = ($stack[-1] > a) && 1 || 0
})

define('?', lambda {||
  a = pop()
  b = pop()
  if b != 0
    callOp(a)
  end
})

# bra
# ket

define('^', lambda {||
  a = pop()
  $stack[-1] = $stack[-1]**a
})

define('&', lambda {||
  a = pop()
  $stack[-1] &= a
})

define('rand', lambda {||
  $stack[-1] = rand($stack[-1])
})

define(124.chr, lambda {||
  a = pop()
  $stack[-1] |= a
})

define('~', lambda {||
  $stack[-1] = ~$stack[-1]
})

$code = ARGF.read
$queue = tokenize($code)
run()
