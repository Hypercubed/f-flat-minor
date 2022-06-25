include ../defs.mk

.PHONY : test
test:	ff interpret

.PHONY : interpret
interpret:
	@printf "** Ruby Interpreter **"
	@time cat ../ff/example.ff \
		| ./execute.rb \
		| cmp -s - "./artifacts/example.txt" && $(CHECK);
	@echo ""
	@echo ""

.PHONY : ff
ff:
	@printf "** Ruby FF Tests **"
	@echo ""
	@cd ..; \
		for f in ${FF}; do \
			out=$${f%.*}.out; \
			if [ -f "$${out}" ]; \
			then \
				printf "cmp $${f} $${out} "; \
				if [ "$${f: -4}" == ".ffp" ]; \
				then \
					./deno/build/preprocess $${f} | ./ruby/execute.rb 2>/dev/null | cmp - $${out} -s && $(CHECK); \
				else \
					cat $${f} | ./ruby/execute.rb 2>/dev/null | cmp - $${out} -s && $(CHECK); \
				fi; \
				echo ""; \
			fi \
		done
	@echo ""