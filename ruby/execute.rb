#!/usr/bin/env ruby

require 'date'

# f-flat-minor v0

$stack = Array.new
$queue = Array.new

$op = -1
$syms = Hash.new
$defs = Hash.new

$systemOps = 0

def getSym(name)
  if !$syms.has_key?(name)
    $op = $op + 1
    $syms[name] = $op
  end
  return $syms[name]
end

def defineSystem(name, d)
  $op = getSym(name)
  $syms[name] = $op
  $defs[$op] = d
end

def defineUser(op, d)
  if $defs[op]
    puts "User word already defined"
    exit
  end
  $defs[op] = d
end

def is_integer? (str)
  str.to_i.to_s == str
end

def callSystem(o)
  if f = $defs[o]
    f.()
  else
    puts "Error: undefined system operation #{o}"
    exit
  end
end

def callUser(o)
  if f = $defs[o]
    $queue = f + $queue
  else
    puts "Error: undefined user operation #{o}"
    exit
  end
end

def callOp (o)
  if o <= $systemOps
    callSystem(o)
  else
    callUser(o)
  end
end

def unescape (text)
  text.gsub("\\n", "\n").gsub("\\s", " ")
end

def parseInteger (str)
  begin
    str = str.gsub('_', '')
    if str.include? "e" or str.include? "E"
      return Integer(Float(str))
    end
    return Integer(str)
  rescue ArgumentError
    return nil
  end
end

def run ()
  while $queue.length() > 0
    item = $queue.shift

    if item.is_a?(Numeric)
      $stack.push item
    elsif item[0] == "." && item.length() > 1
      # no-op
    elsif item[0] == "'"
      e = item[-1] == "'" ? item[1..-2] : item[1..-1]
      unescape(e).each_byte do |c|
        $stack.push c
      end
    elsif item[0] == "[" && item[-1] == "]"
      $stack.push getSym(item[1..-2])
    elsif item[-1] == ":" && item.length() > 1
      n = item[0..-2]
      $stack.push getSym(n)
      $queue.unshift ':'
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
      defineUser(o, d)
      $stack.push o
    elsif item == "/*"
      while $queue.length() > 0
        if $queue.shift == '*/'
          break
        end
      end
    elsif o = $syms[item]
      callOp o
    else
      print('undefined call to ', item)
      exit
    end
  end
end

def token (x)
  n = parseInteger x
  if n != nil
    return n
  end
  return x
end

def tokenize (str)
  return str.gsub(/\s+/m, ' ').strip.split(" ").map { |s| token(s) }
end

defineSystem('nop', lambda {||

})

defineSystem('eval', lambda {||
  callOp $stack.pop
})

defineSystem('putc', lambda {||
  putc $stack.pop
})

defineSystem('print', lambda {||
  print $stack.pop
})

# getc

defineSystem('clock', lambda {||
  $stack.push Date.today.to_time.to_i
})

defineSystem('drop', lambda {||
  $stack.pop
})

defineSystem('q<', lambda {||
  $queue.push $stack.pop
})

defineSystem('q>', lambda {||
  $stack.push $queue.pop
})

defineSystem('clr', lambda {||
  $stack.clear
})

defineSystem('dup', lambda {||
  $stack.push $stack[-1]
})

defineSystem('depth', lambda {||
  $stack.push $stack.length()
})

defineSystem('swap', lambda {||
  a = $stack[-1]
  $stack[-1] = $stack[-2]
  $stack[-2] = a
})

defineSystem('%', lambda {||
  a = $stack.pop
  $stack[-1] %= a
})

defineSystem('(', lambda {||
  l = $stack.length
  $queue = $queue + $stack
  $stack.clear
  $queue.push l
})

defineSystem(')', lambda {||
  l = $queue.pop
  $stack = $queue[-l..$queue.length] + $stack
  $queue = $queue[0..-l-1]
})

defineSystem('*', lambda {||
  a = $stack.pop
  $stack[-1] *= a
})

defineSystem('+', lambda {||
  a = $stack.pop
  $stack[-1] += a
})

defineSystem('-', lambda {||
  a = $stack.pop
  $stack[-1] -= a
})

defineSystem('.', lambda {||
  puts "[ " + $stack.join(" ") + " ]"
})

defineSystem('/', lambda {||
  a = $stack.pop
  $stack[-1] /= a
})

defineSystem('>>', lambda {||
  a = $stack.pop
  $stack[-1] >>= a
})

defineSystem('<<', lambda {||
  a = $stack.pop
  $stack[-1] <<= a
})

defineSystem(':', lambda {||
  o = $stack.pop
  d = Array.new
  while $queue.length() > 0
    s = $queue.shift
    if s == ';'
      break
    end
    d.push s
  end
  defineUser(o, d)
});

defineSystem('<', lambda {||
  a = $stack.pop
  $stack[-1] = ($stack[-1] < a) && 1 || 0
})

defineSystem('=', lambda {||
  a = $stack.pop
  $stack[-1] = ($stack[-1] == a) && 1 || 0
})

defineSystem('>', lambda {||
  a = $stack.pop
  $stack[-1] = ($stack[-1] > a) && 1 || 0
})

defineSystem('?', lambda {||
  a = $stack.pop
  b = $stack.pop
  if b != 0
    callOp(a)
  end
})

# bra
# ket

defineSystem('^', lambda {||
  a = $stack.pop
  $stack[-1] = $stack[-1]**a
})

defineSystem('&', lambda {||
  a = $stack.pop
  $stack[-1] &= a
})

defineSystem('rand', lambda {||
  $stack[-1] = rand($stack[-1])
})

defineSystem(124.chr, lambda {||
  a = $stack.pop
  $stack[-1] |= a
})

defineSystem('~', lambda {||
  $stack[-1] = ~$stack[-1]
})

$systemOps = $op

$code = ARGF.read
$queue = tokenize($code)
run()
