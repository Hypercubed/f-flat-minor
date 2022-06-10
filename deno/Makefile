SHELL := /bin/bash
RED=\033[0;31m
NC=\033[0m
GRN=\033[0;32m

.DEFAULT_GOAL := build

.PHONY : clean
clean:
	$(RM) ./artifacts ./build

.PHONY : test
test:	ff-tests test-compile test-execute test-optimized

build: build/execute build/compile build/run build/preprocess

# Steps

build/%: ./**/*.ts
	deno compile --unstable --allow-env --allow-read -o ./build/$* ./bin/ff-$*.ts

.PHONY : ff-tests
ff-tests: build/run
	@printf "** Deno FF Test **"
	@cd ..; time ./deno/build/run ./ff/tests.ffp > /dev/null && printf "${GRN}OK${NC}\n" || printf "${RED}FAILED${NC}\n"
	@echo ""

.PHONY : ./artifacts/%.ffb
./artifacts/%.ffb: build/compile
	@printf "** Deno Compile **"
	@time ./build/compile ../ff/$*.ff > ./artifacts/$*.ffb

.PHONY : test-compile
test-compile: ./artifacts/example.ffb
	@cmp --silent -- "./artifacts/example.ffb" "../fixtures/example.ffb" && printf "${GRN}OK${NC}\n" || printf "${RED}bins differ${NC}\n"
	@echo ""

.PHONY : ./artifacts/example.txt
./artifacts/example.txt: build/execute
	@printf "** Deno Execute **"
	@time ./build/execute ./artifacts/example.ffb > ./artifacts/example.txt

.PHONY : test-execute
test-execute: ./artifacts/example.txt
	@cmp --silent -- "./artifacts/example.txt" "../fixtures/example.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""

.PHONY : ./artifacts/optimized.txt
./artifacts/optimized.txt: build/run
	@printf "** Deno Execute Optimized **"
	@time ./build/run ../ff/example.ff --opt > ./artifacts/optimized.txt

.PHONY : test-optimized
test-optimized: ./artifacts/optimized.txt
	@cmp --silent -- "./artifacts/optimized.txt" "../fixtures/example.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""
