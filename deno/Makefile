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
	@time cat ../ff/example2.ff | deno run ./cmds/compile.ts > ./example2.bin
	@cmp --silent -- "./example2.bin" "../fixtures/example2.bin" && printf "${GRN}OK${NC}\n" || printf "${RED}bins differ${NC}\n"
	@echo ""

example.txt:
	@echo "** Deno Execute **"
	@time cat ./example2.bin | deno run ./cmds/execute.ts > ./example.txt
	@cmp --silent -- "./example.txt" "../fixtures/example.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""
