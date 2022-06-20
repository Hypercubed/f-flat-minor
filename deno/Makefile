include ../defs.mk

.DEFAULT_GOAL := build

.PHONY : clean
clean:
	$(RM) ./build

.PHONY : test

test:	ff compile execute interpret

build: build/execute build/compile build/run build/preprocess

# Steps

build/%: ./**/*.ts
	deno compile --unstable --allow-env --allow-read -o ./build/$* ./bin/ff-$*.ts

.PHONY : compile
compile: build/compile
	@printf "** Deno Compiler **"
	@time ./build/compile ../ff/example.ff \
		| cmp --s - "../fixtures/example.ffb" && $(CHECK)
	@echo ""
	@echo ""

.PHONY : execute
execute: build/execute 
	@printf "** Deno Executer **"
	@time ./build/execute ../fixtures/example.ffb \
		| cmp -s - "../ff/example.out" && $(CHECK)
	@echo ""
	@echo ""

.PHONY : interpret
interpret: build/run
	@printf "** Deno Interpreter **"
	@time ./build/run ../ff/example.ff \
		| cmp -s - "../ff/example.out" && $(CHECK)
	@echo ""
	@echo ""

.PHONY : ff
ff: build/run
	@printf "** Deno FF Tests **"
	@echo ""
	@cd ..; \
		for f in ${FF}; do \
			out=$${f%.*}.out; \
			if [ -f "$${out}" ]; then \
				printf "$${f} "; \
				./deno/build/run $${f} 2>/dev/null | cmp - $${out} -s && $(CHECK); \
				./deno/build/run $${f} --opt 2>/dev/null | cmp - $${out} -s && $(CHECK); \
				echo ""; \
			fi \
		done
	@echo ""

.PHONY : reset
reset: build/run
	@cd ..; \
		for f in ${FF}; do \
			out=$${f%.*}.out; \
			if [ -f "$${out}" ]; then \
				echo "Reseting $${f} $${out}"; \
				./deno/build/run $${f} > $${out} \
				echo ""; \
			fi \
		done

