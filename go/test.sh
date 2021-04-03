#!/bin/bash
cd "$(dirname "$0")"

rm -f ./output.*

echo "** Go Compile **"

go build ./cmd/compile
time ./compile > output.bin

echo ""

if cmp --silent -- "./output.bin" "../output.bin"; then
  echo "OK"
else
  echo "outputs differ"
  exit 1
fi

echo ""

echo "** Go Execute **"

go build ./cmd/execute
time ./execute > output.txt

echo ""

if cmp --silent -- "./output.txt" "../output.txt"; then
  echo "OK"
else
  echo "outputs differ"
  exit 1
fi

echo ""

