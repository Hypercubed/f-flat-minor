SHELL := /bin/bash
RED=\033[0;31m
NC=\033[0m
GRN=\033[0;32m

.PHONY : clean example run test example.bin example.txt

clean:
	@rm -f ./example.*

example:
	cat ../ff/example.ff | deno run ./cmds/compile.ts | deno run ./cmds/execute.ts

run: clean example

test:	example.bin example.txt

example.bin:
	@printf "** Deno Compile **"
	@time cat ../ff/example.ff | deno run ./cmds/compile.ts > ./example.bin
	@cmp --silent -- "./example.bin" "../fixtures/example.bin" && printf "${GRN}OK${NC}\n" || printf "${RED}bins differ${NC}\n"
	@echo ""

example.txt:
	@echo "** Deno Execute **"
	@time cat ./example.bin | deno run ./cmds/execute.ts > ./example.txt
	@cmp --silent -- "./example.txt" "../fixtures/example.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""
