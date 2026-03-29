#!/usr/bin/env sh
set -eu

../go/build/preprocess --in "$1" | python3 ./execute.py
