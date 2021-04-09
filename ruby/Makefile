SHELL := /bin/bash
RED = \033[0;31m
NC = \033[0m
GRN = \033[0;32m

.PHONY : clean example run test output.txt

clean:
	@rm -f ./output.*

example:
	cat ../ff/example.ff | ruby ./execute.rb

run: clean example

test:	output.txt

output.txt:
	@echo "** Ruby Compile and Execute **"
	@time cat ../ff/example.ff | ruby ./execute.rb > output.txt
	@cmp --silent -- "./output.txt" "../output.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""