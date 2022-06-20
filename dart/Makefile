SHELL := /bin/bash
RED = \033[0;31m
NC = \033[0m
GRN = \033[0;32m

define CHECK =
	printf "${GRN}OK${NC} " || printf "${RED}FAILED${NC} "
endef

.PHONY : test
test:	interpret

build: bin/dart.exe

bin/%.exe: ./bin/*.dart
	dart compile exe bin/$*.dart

.PHONY : interpret
interpret: bin/dart.exe
	@printf "** Dart Interpreter **"
	@time cat ../ff/example_v0.ff \
		| ./bin/dart.exe \
		| cmp -s - "../ff/example.out" && $(CHECK)
	@echo ""
	@echo ""

FF = ./ff{,/*}/*.{ff,ffp}

.PHONY : ff
ff:
	@printf "** Dart FF Tests **"
	@echo ""
	@cd ..; \
		for f in ${FF}; do \
			out=$${f%.*}.out; \
			if [ -f "$${out}" ]; then \
				printf "cmp $${f} $${out} "; \
				cat $${f} | ./dart/bin/dart.exe 2>/dev/null | cmp - $${out} -s && $(CHECK); \
				./deno/build/preprocess $${f} | ./dart/bin/dart.exe 2>/dev/null | cmp - $${out} -s && $(CHECK); \
				echo ""; \
			fi \
		done
	@echo ""
