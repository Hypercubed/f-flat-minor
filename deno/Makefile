SHELL := /bin/bash
RED=\033[0;31m
NC=\033[0m
GRN=\033[0;32m

.DEFAULT_GOAL := build
.PHONY : clean example run test ff-tests example.bin example.txt build optimized

clean:
	@rm -f ./artifacts ./build

test:	ff-tests example.bin example.txt optimized

build/%: ./**/*.ts
	deno compile --unstable --allow-env --allow-read -o ./build/$* ./bin/ff-$*.ts

build: build/execute build/compile build/run build/preprocess

ff-tests: build/run
	@printf "** Deno FF Test **"
	@cd ..; time ./deno/build/run ./ff/tests.ff > /dev/null && printf "${GRN}OK${NC}\n" || printf "${RED}FAILED${NC}\n"
	@echo ""

example.bin: build/compile
	@printf "** Deno Compile **"
	@time ./build/compile ../ff/example_v2.ff > ./artifacts/example.bin
	@cmp --silent -- "./artifacts/example.bin" "../fixtures/example_v2.bin" && printf "${GRN}OK${NC}\n" || printf "${RED}bins differ${NC}\n"
	@echo ""

example.txt: build/execute
	@printf "** Deno Execute **"
	@time ./build/execute ./artifacts/example.bin > ./artifacts/example.txt
	@cmp --silent -- "./artifacts/example.txt" "../fixtures/example.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""

optimized: build/run
	@printf "** Deno Execute Optimized **"
	@time ./build/run ../ff/example_v2.ff --opt > ./artifacts/example.txt
	@cmp --silent -- "./artifacts/example.txt" "../fixtures/example.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""
