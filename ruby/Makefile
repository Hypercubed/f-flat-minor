SHELL := /bin/bash
RED = \033[0;31m
NC = \033[0m
GRN = \033[0;32m

.PHONY : clean example run test example.txt

clean:
	@rm -f ./example.*

example:
	cat ../ff/example_v2.ff | ruby ./execute.rb

run: clean example

test:	example.txt

example.txt:
	@echo "** Ruby Compile and Execute **"
	@time cat ../ff/example_v2.ff | ruby ./execute.rb > example.txt
	@cmp --silent -- "./example.txt" "../fixtures/example.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""