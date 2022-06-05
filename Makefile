SHELL := /bin/bash

.DEFAULT_GOAL := test
.PHONY : test

test:
	@make -C ./deno test clean --no-print-directory
	@make -C ./go test clean --no-print-directory
	@make -C ./python test clean --no-print-directory
	@make -C ./ruby test clean --no-print-directory