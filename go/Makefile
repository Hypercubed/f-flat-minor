SHELL := /bin/bash
RED = \033[0;31m
NC = \033[0m
GRN = \033[0;32m

.DEFAULT_GOAL := default
.PHONY : clean example run repl test example.bin example.txt ff-tests

clean:
	@rm -f ./example.*

compile: ./cmd/compile/*.go ./src/**/*.go
	go build ./cmd/compile

execute: ./cmd/execute/*.go ./src/**/*.go
	go build ./cmd/execute

run: ./cmd/run/*.go ./src/**/*.go
	go build ./cmd/run

repl: ./cmd/repl/*.go ./src/**/*.go
	go build ./cmd/repl

default: compile execute run repl

test:	compile execute ff-tests example.bin example.txt 

ff-tests: compile execute
	@printf "** Go FF Test **"
	@cd ..; time cat ./ff/tests.ff | ./go/compile | ./go/execute && printf "${GRN}OK${NC}\n" || printf "${RED}FAILED${NC}\n"
	@echo ""

example.bin: compile
	@printf "** Go Compile **"
	@time cat ../ff/example_v2.ff | ./compile > ./example.bin
	@cmp --silent -- "./example.bin" "../fixtures/example_v2.bin" && printf "${GRN}OK${NC}\n" || printf "${RED}bins differ${NC}\n"
	@echo ""

example.txt: execute
	@printf "** Go Execute **"
	@time cat ./example.bin | ./execute > ./example.txt
	@cmp --silent -- "./example.txt" "../fixtures/example.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""
