SHELL := /bin/bash
RED = \033[0;31m
NC = \033[0m
GRN = \033[0;32m

.PHONY : clean example run test output.bin output.txt

clean:
	@rm -f ./output.*

compile: ./cmd/compile
	go build ./cmd/compile

execute: ./cmd/execute
	go build ./cmd/execute

example:
	cat ../ff/example.ff | ./compile | ./execute

run: compile execute example

test:	compile execute output.bin output.txt

output.bin:
	@echo "** Go Compile **"
	@time cat ../ff/example.ff | ./compile > ./output.bin
	@cmp --silent -- "./output.bin" "../output.bin" && printf "${GRN}OK${NC}\n" || printf "${RED}bins differ${NC}\n"
	@echo ""

output.txt:
	@echo "** Go Execute **"
	@time cat ./output.bin | ./execute > ./output.txt
	@cmp --silent -- "./output.txt" "../output.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""
