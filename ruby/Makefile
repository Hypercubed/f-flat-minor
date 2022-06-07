SHELL := /bin/bash
RED = \033[0;31m
NC = \033[0m
GRN = \033[0;32m

.PHONY : clean example run test example.txt ff-tests

clean:
	@rm -f ./example.*

example:
	cat ../ff/example_v2.ff | ruby ./execute.rb

run: clean example

test:	ff-tests example.txt

ff-tests:
	@printf "** Ruby FF Test **"
	@cd ..; time ./deno/ff-preprocess ./ff/tests.ff | ruby ./ruby/execute.rb > /dev/null && printf "${GRN}OK${NC}\n" || printf "${RED}FAILED${NC}\n"
	@echo ""

example.txt:
	@printf "** Ruby Compile and Execute **"
	@time cat ../ff/example_v2.ff | ruby ./execute.rb > example.txt
	@cmp --silent -- "./example.txt" "../fixtures/example.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""