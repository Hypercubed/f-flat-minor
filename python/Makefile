SHELL := /bin/bash
RED = \033[0;31m
NC = \033[0m
GRN = \033[0;32m

.PHONY : clean
clean:
	@rm -f ./example.*

.PHONY : test
test:	ff-tests example

.PHONY : ff-tests
ff-tests:
	@printf "** Python FF Test **"
	@cd ..; time ./deno/build/preprocess ./ff/tests.ffp | python3 ./python/execute.py > /dev/null && printf "${GRN}OK${NC}\n" || printf "${RED}FAILED${NC}\n"
	@echo ""

.PHONY : ./artifacts/example.txt
./artifacts/example.txt:
	@printf "** Python Run **"
	@time cat ../ff/example.ff | python3 ./execute.py > ./artifacts/example.txt

.PHONY : example
example: ./artifacts/example.txt
	@cmp --silent -- "./artifacts/example.txt" "../fixtures/example.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""