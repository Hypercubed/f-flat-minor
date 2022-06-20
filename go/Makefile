SHELL := /bin/bash
RED = \033[0;31m
NC = \033[0m
GRN = \033[0;32m

.DEFAULT_GOAL := build

define CHECK =
	printf "${GRN}OK${NC} " || printf "${RED}FAILED${NC} "
endef

.PHONY : clean 
clean:
	@rm -f ./build

build/%: ./cmd/compile/*.go ./src/**/*.go
	go build -o ./build/$* ./cmd/$*

build: build/compile build/execute build/run build/repl

.PHONY : test
test:	ff compile execute interpret

.PHONY : compile
compile: build/compile
	@printf "** Go Compiler **"
	@time cat ../ff/example.ff \
		| ./build/compile \
		| cmp -s -- "./artifacts/example.ffb" "../fixtures/example.ffb" && $(CHECK)
	@echo ""
	@echo ""

.PHONY : execute
execute: build/execute
	@printf "** Go Executer **"
	@time cat ../fixtures/example.ffb \
		| ./build/execute \
		| cmp -s -- "./artifacts/example.txt" "../ff/example.out" && $(CHECK)
	@echo ""
	@echo ""

.PHONY : interpret
interpret: build/run
	@printf "** Go Interpreter **"
	@time cat ../ff/example.ff \
		| ./build/run \
		| cmp -s -- "./artifacts/example.txt" "../ff/example.out" && $(CHECK)
	@echo ""
	@echo ""

FF = ./ff{,/*}/*.{ff,ffp}

.PHONY : ff
ff: build/run
	@printf "** Go FF Tests **"
	@echo ""
	@cd ..; \
		for f in ${FF}; do \
			out=$${f%.*}.out; \
			if [ -f "$${out}" ]; then \
				printf "cmp $${f} $${out} "; \
				cat $${f} | ./go/build/run 2>/dev/null | cmp - $${out} -s && $(CHECK); \
				echo ""; \
			fi \
		done
	@echo ""
