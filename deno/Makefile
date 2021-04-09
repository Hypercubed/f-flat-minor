SHELL := /bin/bash
RED=\033[0;31m
NC=\033[0m
GRN=\033[0;32m

.PHONY : clean example run test output.bin output.txt

clean:
	@rm -f ./output.*

example:
	cat ../ff/example.ff | deno run ./cmds/compile.ts | deno run ./cmds/execute.ts

run: clean example

test:	output.bin output.txt

output.bin:
	@printf "** Deno Compile **"
	@time cat ../ff/example.ff | deno run ./cmds/compile.ts > ./output.bin
	@cmp --silent -- "./output.bin" "../output.bin" && printf "${GRN}OK${NC}\n" || printf "${RED}bins differ${NC}\n"
	@echo ""

output.txt:
	@echo "** Deno Execute **"
	@time cat ./output.bin | deno run ./cmds/execute.ts > ./output.txt
	@cmp --silent -- "./output.txt" "../output.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""
