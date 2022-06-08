SHELL := /bin/bash
RED = \033[0;31m
NC = \033[0m
GRN = \033[0;32m

.DEFAULT_GOAL := build
.PHONY : clean example run repl test example.bin example.txt ff-tests

clean:
	@rm -f ./artifacts ./build

build/%: ./cmd/compile/*.go ./src/**/*.go
	go build -o ./build/$* ./cmd/$*

build: build/compile build/execute build/run build/repl

test:	build ff-tests example.bin example.txt 

ff-tests: build/run
	@printf "** Go FF Test **"
	@cd ..; time cat ./ff/tests.ff | ./go/build/run && printf "${GRN}OK${NC}\n" || printf "${RED}FAILED${NC}\n"
	@echo ""

example.bin: build/compile
	@printf "** Go Compile **"
	@time cat ../ff/example_v2.ff | ./build/compile > ./artifacts/example.bin
	@cmp --silent -- "./artifacts/example.bin" "../fixtures/example_v2.bin" && printf "${GRN}OK${NC}\n" || printf "${RED}bins differ${NC}\n"
	@echo ""

example.txt: build/execute
	@printf "** Go Execute **"
	@time cat ./artifacts/example.bin | ./build/execute > ./artifacts/example.txt
	@cmp --silent -- "./artifacts/example.txt" "../fixtures/example.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""
