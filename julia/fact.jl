function fact(n::BigInt)
  n < 0 && return zero(n)
  f = one(n)
  for i in 2:n
      f *= i
  end
  return f
end

println("Factorial 100:\n[ ", fact(BigInt(100)), " ]")