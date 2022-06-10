SHELL := /bin/bash
RED = \033[0;31m
NC = \033[0m
GRN = \033[0;32m

.DEFAULT_GOAL := build
.PHONY : example.bin example.txt ff-tests

.PHONY : clean 
clean:
	@rm -f ./artifacts ./build

build/%: ./cmd/compile/*.go ./src/**/*.go
	go build -o ./build/$* ./cmd/$*

build: build/compile build/execute build/run build/repl

.PHONY : test
test:	build ff-tests ./artifacts/example.ffb ./artifacts/example.txt

ff-tests: build/run
	@printf "** Go FF Test **"
	@cd ..; time cat ./ff/tests.ffp | ./go/build/run && printf "${GRN}OK${NC}\n" || printf "${RED}FAILED${NC}\n"
	@echo ""

.PHONY : ./artifacts/example.ffb
./artifacts/example.ffb: build/compile
	@printf "** Go Compile **"
	@time cat ../ff/example.ff | ./build/compile > ./artifacts/example.ffb
	@cmp --silent -- "./artifacts/example.ffb" "../fixtures/example.ffb" && printf "${GRN}OK${NC}\n" || printf "${RED}bins differ${NC}\n"
	@echo ""

.PHONY : ./artifacts/example.txt
./artifacts/example.txt: build/execute
	@printf "** Go Execute **"
	@time cat ./artifacts/example.ffb | ./build/execute > ./artifacts/example.txt
	@cmp --silent -- "./artifacts/example.txt" "../fixtures/example.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""
