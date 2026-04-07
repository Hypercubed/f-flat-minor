#!/usr/bin/env ruby
# frozen_string_literal: true
# encoding: UTF-8

require 'date'

# f-flat-minor v0

$stack = Array.new
$queue = Array.new

$op = -1
$syms = Hash.new
$defs = Hash.new

$systemOps = 0

def getSym(name)
  name = name.downcase
  if !$syms.has_key?(name)
    $op = $op + 1
    $syms[name] = $op
  end
  return $syms[name]
end

def defineSystem(name, d)
  name = name.downcase
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

def hex2char(hex)
  n = hex.to_i(16)
  if n <= 0xffff
    n.chr('UTF-8')
  elsif n <= 0x10ffff
    adjusted = n - 0x10000
    high = 0xd800 | (adjusted >> 10)
    low = 0xdc00 | (adjusted & 0x3ff)
    high.chr('UTF-8') + low.chr('UTF-8')
  else
    "[hex error: #{hex}]"
  end
end

def unescape(text)
  # Handle \UXXXXXXXX (8 hex digits) first
  text = text.gsub(/\\U([0-9a-fA-F]{8})/) { |_| hex2char($1) }
  # Handle \uXXXX (4 hex digits)
  text = text.gsub(/\\u([0-9a-fA-F]{4})/) { |_| hex2char($1) }
  # Handle standard escapes
  text.gsub("\\0", "\0")
    .gsub("\\b", "\b")
    .gsub("\\t", "\t")
    .gsub("\\n", "\n")
    .gsub("\\v", "\v")
    .gsub("\\f", "\f")
    .gsub("\\r", "\r")
    .gsub("\\'", "'")
    .gsub('\\"', '"')
    .gsub("\\s", " ")
    .gsub("\\\\", "\\")
end

def trunc_divmod(lhs, rhs)
  q = lhs.abs / rhs.abs
  q = -q if (lhs < 0) != (rhs < 0)
  r = lhs - rhs * q
  [q, r]
end

def parseInteger (str)
  begin
    str = str.delete('_')
    sign = 1
    if str.start_with?('-')
      sign = -1
      str = str[1..]
    end
    if str.start_with?('0x') || str.start_with?('0X')
      return sign * Integer(str, 16)
    elsif str.start_with?('0b') || str.start_with?('0B')
      return sign * Integer(str, 2)
    elsif str.start_with?('0o') || str.start_with?('0O')
      return sign * Integer(str, 8)
    elsif str.include?('e') || str.include?('E')
      return sign * Float(str).to_i
    else
      return sign * Integer(str)
    end
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
    elsif o = $syms[item.downcase]
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

def expand_double_quoted_string_token(s)
  # Sugar: "..." is [ '...' ] — '[', char codes, ']'
  return [s] unless s.is_a?(String) && s.length > 1 && s.start_with?('"') && s.end_with?('"')
  inner = unescape(s[1..-2])
  ['['] + inner.each_char.map(&:ord) + [']']
end

def tokenize (str)
  str = str.dup.force_encoding(Encoding::UTF_8)
  parts = str.gsub(/\s+/m, ' ').strip.split(' ')
  parts.flat_map { |s| expand_double_quoted_string_token(s) }.map do |x|
    x.is_a?(String) ? token(x) : x
  end
end

defineSystem('nop', lambda {||

})

defineSystem('eval', lambda {||
  callOp $stack.pop
})

defineSystem('putc', lambda {||
  putc $stack.pop
})

defineSystem('putn', lambda {||
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
  _, r = trunc_divmod($stack[-1], a)
  $stack[-1] = r
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
  q, _ = trunc_divmod($stack[-1], a)
  $stack[-1] = q
})

defineSystem('cons', lambda {||
  y = $stack.pop
  x = $stack.pop
  o = $op = $op + 1
  $defs[o] = [x, y, 'eval']
  $stack.push o
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
