include ../defs.mk

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