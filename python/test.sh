#!/bin/bash
cd "$(dirname "$0")"

rm -f ./output.*

echo "** Python Compile and Execute **"

time cat ../ff/example.ff | python3 ./execute.py > output.txt

echo ""

if cmp --silent -- "./output.txt" "../output.txt"; then
  echo "OK"
else
  echo "outputs differ"
  exit 1
fi

echo ""