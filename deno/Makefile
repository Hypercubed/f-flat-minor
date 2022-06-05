SHELL := /bin/bash
RED=\033[0;31m
NC=\033[0m
GRN=\033[0;32m

.DEFAULT_GOAL := default
.PHONY : clean example run test ff-tests example.bin example.txt

clean:
	@rm -f ./example.*

test:	ff-tests example.bin example.txt

ff-compile: ./bin/*.ts
	deno compile --unstable --allow-env --allow-read ./bin/ff-compile.ts

ff-execute: ./bin/*.ts
	deno compile --unstable --allow-env --allow-read ./bin/ff-execute.ts

ff-run: ./bin/*.ts
	deno compile --unstable --allow-env --allow-read ./bin/ff-run.ts

default: ff-execute ff-compile ff-run

ff-tests: ff-run
	@printf "** Deno FF Test **"
	@cd ..; time ./deno/ff-run ./ff/tests.ff > /dev/null && printf "${GRN}OK${NC}\n" || printf "${RED}FAILED${NC}\n"
	@echo ""

example.bin: ff-compile
	@printf "** Deno Compile **"
	@time ./ff-compile ../ff/example_v2.ff > ./example.bin
	@cmp --silent -- "./example.bin" "../fixtures/example_v2.bin" && printf "${GRN}OK${NC}\n" || printf "${RED}bins differ${NC}\n"
	@echo ""

example.txt:
	@echo "** Deno Execute **"
	@time ./ff-execute ./example.bin > ./example.txt
	@cmp --silent -- "./example.txt" "../fixtures/example.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""
