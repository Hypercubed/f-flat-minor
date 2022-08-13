function fact(n) {
  return (n < 2n) ? 1n : n * fact(n - 1n);
}

console.log(fact(100n));