include ../defs.mk

.DEFAULT_GOAL := build

.PHONY : clean 
clean:
	@rm -f ./build

build/%: ./cmd/**/*.go ./src/**/*.go
	go build -o ./build/$* ./cmd/$*

build: build/compile build/execute build/run build/repl

.PHONY : test
test:	ff compile execute interpret

.PHONY : compile
compile: build/compile
	@printf "** Go Compiler **"
	@time ./build/compile -in ../ff/example.ff \
		| cmp -s -- "../fixtures/example.ffb" && $(CHECK)
	@echo ""
	@echo ""

.PHONY : execute
execute: build/execute
	@printf "** Go Executer **"
	@time cat ../fixtures/example.ffb \
		| ./build/execute \
		| cmp -s -- "../ff/example.out" && $(CHECK)
	@echo ""
	@echo ""

.PHONY : interpret
interpret: build/run
	@printf "** Go Interpreter **"
	@time ./build/run -in ../ff/example.ff \
		| cmp -s -- "../ff/example.out" && $(CHECK)
	@echo ""
	@echo ""

.PHONY : ff
ff: build/run
	@printf "** Go FF Tests **"
	@echo ""
	@cd ..; \
		for f in ${FF}; do \
			out=$${f%.*}.out; \
			if [ -f "$${out}" ]; then \
				printf "cmp $${f} $${out} "; \
				./go/build/run -in $${f} 2>/dev/null | cmp - $${out} -s && $(CHECK); \
				./deno/build/compile $${f} --opt | ./go/build/execute 2>/dev/null | cmp - $${out} -s && $(CHECK); \
				echo ""; \
			fi \
		done
	@echo ""
