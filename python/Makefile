SHELL := /bin/bash
RED = \033[0;31m
NC = \033[0m
GRN = \033[0;32m

.PHONY : clean example run test example.txt ff-tests

clean:
	@rm -f ./example.*

example:
	cat ../ff/example_v2.ff | python3 ./execute.py

run: clean example

test:	ff-tests example.txt

ff-tests:
	@printf "** Python FF Test **"
	@cd ..; time ./deno/build/preprocess ./ff/tests.ff | python3 ./python/execute.py > /dev/null && printf "${GRN}OK${NC}\n" || printf "${RED}FAILED${NC}\n"
	@echo ""

example.txt:
	@printf "** Python Compile and Execute **"
	@time cat ../ff/example_v2.ff | python3 ./execute.py > ./artifacts/example.txt
	@cmp --silent -- "./artifacts/example.txt" "../fixtures/example.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""