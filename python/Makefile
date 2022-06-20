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
	@printf "** Python Run **"
	@time cat ../ff/example.ff | python3 ./execute.py > ./artifacts/example.txt

.PHONY : example
example: ./artifacts/example.txt
	@cmp -s -- "./artifacts/example.txt" "../fixtures/example.txt" && $(CHECK)
	@echo ""

FF = ./ff{,/*}/*.{ff,ffp}

.PHONY : ff
ff:
	@printf "** Deno Execute FF Files **"
	@echo ""
	@cd ..; \
		for f in ${FF}; do \
			if [ -f $${f}.test ]; then \
				printf "$${f} "; \
				./deno/build/preprocess $${f} | python3 ./python/execute.py 2>/dev/null | cmp - $${f}.test -s && $(CHECK); \
				echo ""; \
			fi \
		done
	@echo ""