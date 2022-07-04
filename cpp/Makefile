include ../defs.mk

.DEFAULT_GOAL := build/run

build/run: run.cpp
	g++ run.cpp -o build/run -O -lgmp

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

.PHONY : ff
ff: build/run
	@printf "** C++ FF Tests **"
	@echo ""
	@cd ..; \
		for f in ${FF}; do \
			out=$${f%.*}.out; \
			if [ -f "$${out}" ]; \
			then \
				printf "cmp $${f} $${out} "; \
				if [ "$${f: -4}" == ".ffp" ]; \
				then \
					./deno/build/preprocess $${f} | ./cpp/build/run 2>/dev/null | cmp - $${out} -s && $(CHECK); \
				else \
					cat $${f} | ./cpp/build/run 2>/dev/null | cmp - $${out} -s && $(CHECK); \
				fi; \
				./deno/build/compile $${f} --opt --disassemble | ./cpp/build/run 2>/dev/null | cmp - $${out} -s && $(CHECK); \
				echo ""; \
			fi \
		done
	@echo ""