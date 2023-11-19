#!/usr/bin/env bats

setup_file() {
  chomp clean
}

setup() {
  load '../node_modules/bats-support/load'
  load '../node_modules/bats-assert/load'

  export PATH="$PWD:$PATH"
}

run_ts() {
  asc ./bats/$1.ts --target release --optimize --outFile ./build/$1.wasm --textFile ./build/$1.wat 2> /dev/null && \
  wasmtime ./build/$1.wasm
}

@test "integers using mp" {
  run run_ts int
  assert_output - < "./bats/fixtures/int.out"
}

@test "addition using mp" {
  run run_ts add
  assert_output - < "./bats/fixtures/add.out"
}

@test "subtraction using mp" {
  run run_ts sub
  assert_output - < "./bats/fixtures/sub.out"
}

@test "multiplication using mp" {
  run run_ts mul
  assert_output - < "./bats/fixtures/mul.out"
}

@test "factorial using mp" {
  run run_ts fact
  assert_output - < "./bats/fixtures/fact.out"
}