#!/usr/bin/env bats

setup() {
  load '../node_modules/bats-support/load'
  load '../node_modules/bats-assert/load'

  export PATH="$PWD:$PATH"
}

run_wat() {
  # chomp "$1" | grep -v [▶√]
  gpp -U "#" "" "(" "," ")" "(" ")" "#" "" -M "#" "\n" " " " " "\n" "(" ")" +s "\"" "\"" ";;" < "$1" | wasmtime -
}

@test "addition using mp" {
  run run_wat ./test/add.wat
  assert_output < "./test/add.out"
}

@test "runs example" {
  run run_wat ./test/example.wat
  assert_output < "./test/example.out"
}
