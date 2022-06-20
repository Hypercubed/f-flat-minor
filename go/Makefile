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
	@rm -f ./artifacts ./build

build/%: ./cmd/compile/*.go ./src/**/*.go
	go build -o ./build/$* ./cmd/$*

build: build/compile build/execute build/run build/repl

.PHONY : test
test:	build ff ./artifacts/example.ffb ./artifacts/example.txt

.PHONY : ./artifacts/example.ffb
./artifacts/example.ffb: build/compile
	@printf "** Go Compile **"
	@time cat ../ff/example.ff | ./build/compile > ./artifacts/example.ffb
	@cmp --silent -- "./artifacts/example.ffb" "../fixtures/example.ffb" && $(CHECK)
	@echo ""
	@echo ""

.PHONY : ./artifacts/example.txt
./artifacts/example.txt: build/execute
	@printf "** Go Execute **"
	@time cat ./artifacts/example.ffb | ./build/execute > ./artifacts/example.txt
	@cmp --silent -- "./artifacts/example.txt" "../ff/example.out" && $(CHECK)
	@echo ""
	@echo ""

FF = ./ff{,/*}/*.{ff,ffp}

.PHONY : ff
ff: build/run
	@printf "** Deno Execute FF Files **"
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
