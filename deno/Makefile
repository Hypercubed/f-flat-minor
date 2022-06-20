SHELL := /bin/bash
RED=\033[0;31m
NC=\033[0m
GRN=\033[0;32m

.DEFAULT_GOAL := build

define CHECK =
	printf "${GRN}OK${NC} " || printf "${RED}FAILED${NC} "
endef

.PHONY : clean
clean:
	$(RM) ./artifacts ./build

.PHONY : test
test:	ff test-compile test-execute

build: build/execute build/compile build/run build/preprocess

# Steps

build/%: ./**/*.ts
	deno compile --unstable --allow-env --allow-read -o ./build/$* ./bin/ff-$*.ts

.PHONY : test-compile
test-compile: ./artifacts/example.ffb
	@printf "** Deno Compile **"
	@time ./build/compile ../ff/example.ff > ./artifacts/example.ffb
	@cmp --silent -- "./artifacts/example.ffb" "../fixtures/example.ffb" && $(CHECK)
	@echo ""
	@echo ""

.PHONY : test-execute
test-execute: ./artifacts/example.txt
	@printf "** Deno Execute **"
	@time ./build/execute ./artifacts/example.ffb > ./artifacts/example.txt
	@cmp --silent -- "./artifacts/example.txt" "../ff/example.ff.test" && $(CHECK)
	@echo ""
	@echo ""

FF = ./ff{,/*}/*.{ff,ffp}

.PHONY : ff
ff: build/run
	@printf "** Deno Execute FF Files **"
	@echo ""
	@cd ..; \
		for f in ${FF}; do \
			if [ -f $${f}.test ]; then \
				printf "$${f} "; \
				./deno/build/run $${f} 2>/dev/null | cmp - $${f}.test -s && $(CHECK); \
				./deno/build/run $${f} --opt 2>/dev/null | cmp - $${f}.test -s && $(CHECK); \
				echo ""; \
			fi \
		done
	@echo ""

