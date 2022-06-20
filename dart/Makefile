include ../defs.mk

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

.PHONY : ff
ff: bin/dart.exe
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
