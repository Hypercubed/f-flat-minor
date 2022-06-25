include ../defs.mk

.PHONY : test
test:	ff interpret

.PHONY : interpret
interpret:
	@printf "** Python Interpreter **"
	@time cat ../ff/example.ff \
		| ./execute.py \
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
			if [ -f "$${out}" ]; \
			then \
				printf "cmp $${f} $${out} "; \
				if [ "$${f: -4}" == ".ffp" ]; \
				then \
					./deno/build/preprocess $${f} | ./python/execute.py 2>/dev/null | cmp - $${out} -s && $(CHECK); \
				else \
					cat $${f} | ./python/execute.py 2>/dev/null | cmp - $${out} -s && $(CHECK); \
				fi; \
				echo ""; \
			fi \
		done
	@echo ""