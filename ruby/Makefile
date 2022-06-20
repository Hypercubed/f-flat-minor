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
	@printf "** Ruby Interpreter **"
	@time cat ../ff/example.ff \
		| ruby ./execute.rb \
		| cmp -s - "./artifacts/example.txt" && $(CHECK);
	@echo ""
	@echo ""

FF = ./ff{,/*}/*.{ff,ffp}

.PHONY : ff
ff:
	@printf "** Ruby FF Tests **"
	@echo ""
	@cd ..; \
		for f in ${FF}; do \
			out=$${f%.*}.out; \
			if [ -f "$${out}" ]; then \
				printf "cmp $${f} $${out} "; \
				cat $${f} | ruby ./ruby/execute.rb 2>/dev/null | cmp - $${out} -s && $(CHECK); \
				./deno/build/preprocess $${f} | ruby ./ruby/execute.rb 2>/dev/null | cmp - $${out} -s && $(CHECK); \
				echo ""; \
			fi \
		done
	@echo ""