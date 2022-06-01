SHELL := /bin/bash
RED = \033[0;31m
NC = \033[0m
GRN = \033[0;32m

.DEFAULT_GOAL := default
.PHONY : clean example run test example.bin example.txt ff-tests

clean:
	@rm -f ./example.*

compile: ./cmd/compile/*.go ./src/**/*.go
	go build ./cmd/compile

execute: ./cmd/execute/*.go ./src/**/*.go
	go build ./cmd/execute

default: compile execute

run: compile execute
	cat ../ff/example_v2.ff | ./compile | ./execute

test:	compile execute ff-tests example.bin example.txt 

ff-tests: compile execute
	@echo "** Go FF Test **"
	@cd ..; cat ./ff/tests.ff | ./go/compile | ./go/execute && printf "${GRN}OK${NC}\n" || printf "${RED}FAIL${NC}\n"
	@echo ""

example.bin: compile
	@echo "** Go Compile **"
	@time cat ../ff/example_v2.ff | ./compile > ./example.bin
	@cmp --silent -- "./example.bin" "../fixtures/example_v2.bin" && printf "${GRN}OK${NC}\n" || printf "${RED}bins differ${NC}\n"
	@echo ""

example.txt: execute
	@echo "** Go Execute **"
	@time cat ./example.bin | ./execute > ./example.txt
	@cmp --silent -- "./example.txt" "../fixtures/example.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""
