SHELL := /bin/bash
RED = \033[0;31m
NC = \033[0m
GRN = \033[0;32m

define CHECK =
	printf "${GRN}OK${NC} " || printf "${RED}FAILED${NC} "
endef

.PHONY : clean 
clean:
	@rm -f ./example.*

.PHONY : test
test:	example

build: bin/dart.exe

bin/%.exe: ./bin/*.dart
	dart compile exe bin/$*.dart

.PHONY : ./artifacts/example.txt
./artifacts/example.txt: bin/dart.exe
	@printf "** Dart Run **"
	@time cat ../ff/example_v0.ff | ./bin/dart.exe > ./artifacts/example.txt

.PHONY : example
example: ./artifacts/example.txt
	@cmp --silent -- "./artifacts/example.txt" "../ff/example.out" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""
