SHELL := /bin/bash
RED=\033[0;31m
NC=\033[0m
GRN=\033[0;32m

.PHONY : clean example run test example.bin example.txt ff-tests

clean:
	@rm -f ./example.*

run:
	./bin/ff run ../ff/example.ff

test:	ff-tests example.bin example.txt

ff-tests:
	@echo "** Deno FF Test **"
	@cd ..; cat ./ff/tests.ff | ./deno/bin/ff run && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""

example.bin:
	@printf "** Deno Compile **"
	@time cat ../ff/example_v2.ff | ./bin/ff compile > ./example.bin
	@cmp --silent -- "./example.bin" "../fixtures/example_v2.bin" && printf "${GRN}OK${NC}\n" || printf "${RED}bins differ${NC}\n"
	@echo ""

example.txt:
	@echo "** Deno Execute **"
	@time cat ./example.bin | ./bin/ff execute > ./example.txt
	@cmp --silent -- "./example.txt" "../fixtures/example.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""
