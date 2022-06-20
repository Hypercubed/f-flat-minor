SHELL := /bin/bash
RED = \033[0;31m
NC = \033[0m
GRN = \033[0;32m

define CHECK =
	printf "${GRN}OK${NC} " || printf "${RED}FAILED${NC} "
endef

.PHONY : test
test:	ff interpret

.PHONY : interpret
interpret:
	@printf "** Python Interpreter **"
	@time cat ../ff/example.ff \
		| python3 ./execute.py \
		| cmp -s - "../ff/example.out" && $(CHECK)
	@echo ""
	@echo ""

FF = ./ff{,/*}/*.{ff,ffp}

.PHONY : ff
ff:
	@printf "** Python FF Tests **"
	@echo ""
	@cd ..; \
		for f in ${FF}; do \
			out=$${f%.*}.out; \
			if [ -f "$${out}" ]; then \
				printf "cmp $${f} $${out} "; \
				cat $${f} | python3 ./python/execute.py 2>/dev/null | cmp - $${out} -s && $(CHECK); \
				./deno/build/preprocess $${f} | python3 ./python/execute.py 2>/dev/null | cmp - $${out} -s && $(CHECK); \
				echo ""; \
			fi \
		done
	@echo ""