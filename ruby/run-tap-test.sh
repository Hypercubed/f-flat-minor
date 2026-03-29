#!/usr/bin/env sh
set -eu

../go/build/run --preprocess --in "$1" | ruby ./execute.rb
