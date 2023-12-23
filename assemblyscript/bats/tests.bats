#!/usr/bin/env bats

setup() {
  load '../node_modules/bats-support/load'
  load '../node_modules/bats-assert/load'

  export PATH="$PWD:$PATH"
}

@test "to-string" {
  wasmtime ./build/bats/to-string.wasm
}

@test "addition/subtraction using mp" {
  wasmtime ./build/bats/add-sub.wasm
}

@test "multiplication using mp" {
  wasmtime ./build/bats/mul-div.wasm
}

@test "inv using mp" {
  wasmtime ./build/bats/inv.wasm
}

@test "mod using mp" {
  wasmtime ./build/bats/mod.wasm
}

@test "factorial using mp" {
  wasmtime ./build/bats/fact.wasm
}

@test "shift using mp" {
  wasmtime ./build/bats/shift.wasm
}

@test "pow using mp" {
  wasmtime ./build/bats/pow.wasm
}
