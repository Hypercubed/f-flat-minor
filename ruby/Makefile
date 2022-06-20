SHELL := /bin/bash
RED = \033[0;31m
NC = \033[0m
GRN = \033[0;32m

define CHECK =
	printf "${GRN}OK${NC} " || printf "${RED}FAILED${NC} "
endef

.PHONY : clean 
clean:
	@rm -f ./example.*

.PHONY : test
test:	ff example

.PHONY : ./artifacts/example.txt
./artifacts/example.txt:
	@printf "** Ruby Run **"
	@time cat ../ff/example.ff | ruby ./execute.rb > ./artifacts/example.txt

.PHONY : example
example: ./artifacts/example.txt
	@cmp --silent -- "./artifacts/example.txt" "../ff/example.out" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""

FF = ./ff{,/*}/*.{ff,ffp}

.PHONY : ff
ff:
	@printf "** Deno Execute FF Files **"
	@echo ""
	@cd ..; \
		for f in ${FF}; do \
			out=$${f%.*}.out; \
			if [ -f "$${out}" ]; then \
				printf "cmp $${f} $${out} "; \
				./deno/build/preprocess $${f} | ruby ./ruby/execute.rb 2>/dev/null | cmp - $${out} -s && $(CHECK); \
				echo ""; \
			fi \
		done
	@echo ""