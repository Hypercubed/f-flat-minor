#!/bin/bash
cd "$(dirname "$0")"

rm -f ./output.*

echo "** Ruby Compile and Execute **"

time cat ../ff/fact.ff | ruby ./execute.rb > output.txt

echo ""

if cmp --silent -- "./output.txt" "../output.txt"; then
  echo "OK"
else
  echo "outputs differ"
  exit 1
fi

echo ""