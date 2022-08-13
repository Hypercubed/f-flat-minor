#!/usr/bin/env ruby

def fact(n)
  n.zero? ? 1 : n * fact(n - 1)
end

puts(fact(100))