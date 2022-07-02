include ../defs.mk

.DEFAULT_GOAL := build/run

build/run: run.cpp
	g++ run.cpp -o build/run

.PHONY : test
test:	interpret

.PHONY : interpret
interpret: build/run
	@printf "** C++ Interpreter **"
	@time cat ../ff/example_v0.ff \
		| ./build/run \
		| cmp -s -- "../ff/example_v0.out" && $(CHECK);
	@echo ""
	@echo ""