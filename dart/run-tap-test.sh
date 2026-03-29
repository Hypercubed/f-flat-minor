#!/usr/bin/env sh
set -eu

../go/build/preprocess --in "$1" | ./bin/dart.exe
