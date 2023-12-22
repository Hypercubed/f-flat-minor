#!/usr/bin/env bats

setup() {
  load '../node_modules/bats-support/load'
  load '../node_modules/bats-assert/load'

  export PATH="$PWD:$PATH"
}

run_wasm() {
  chomp build:./bats/$1
  wasmtime ./build/bats/$1.wasm
}

@test "to-string" {
  run_wasm to-string
}

@test "addition/subtraction using mp" {
  run_wasm add-sub
}

@test "multiplication using mp" {
  run_wasm mul-div
}

@test "inv using mp" {
  run_wasm inv
}

@test "mod using mp" {
  run_wasm mod
}

@test "factorial using mp" {
  run_wasm fact
}

@test "shift using mp" {
  run_wasm shift
}

@test "pow using mp" {
  run_wasm pow
}
