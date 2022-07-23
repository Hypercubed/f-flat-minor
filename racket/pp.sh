#!/bin/bash

../deno/build/preprocess $1 | racket ./main.rkt -