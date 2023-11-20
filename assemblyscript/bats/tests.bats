#!/usr/bin/env bats

setup() {
  load '../node_modules/bats-support/load'
  load '../node_modules/bats-assert/load'

  export PATH="$PWD:$PATH"
}

run_ts() {
  chomp build:./bats/$1
  run wasmtime ./build/bats/$1.wasm
  assert_output - < ./bats/fixtures/$1.out
}

@test "integers using mp" {
  run_ts int
}

@test "addition using mp" {
  run_ts add
}

@test "subtraction using mp" {
  run_ts sub
}

@test "multiplication using mp" {
  run_ts mul
}

@test "factorial using mp" {
  run_ts fact
}

@test "interp mp" {
  chomp build:./src/interp-mp
  run wasmtime ./build/src/interp-mp.wasm
  assert_output - < "./bats/fixtures/interp-mp.out"
}