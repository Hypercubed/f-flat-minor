SHELL := /bin/bash
RED = \033[0;31m
NC = \033[0m
GRN = \033[0;32m

.PHONY : clean example run test example.bin example.txt

clean:
	@rm -f ./example.*

compile: ./cmd/compile/* ./utils/*
	go build ./cmd/compile

execute: ./cmd/execute/* ./utils/*
	go build ./cmd/execute

example:
	cat ../ff/example.ff | ./compile | ./execute

run: compile execute example

test:	compile execute example.bin example.txt

example.bin: compile
	@echo "** Go Compile **"
	@time cat ../ff/example2.ff | ./compile > ./example2.bin
	@cmp --silent -- "./example2.bin" "../fixtures/example2.bin" && printf "${GRN}OK${NC}\n" || printf "${RED}bins differ${NC}\n"
	@echo ""

example.txt: execute
	@echo "** Go Execute **"
	@time cat ./example2.bin | ./execute > ./example.txt
	@cmp --silent -- "./example.txt" "../fixtures/example.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""
