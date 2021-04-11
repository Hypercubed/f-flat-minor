SHELL := /bin/bash
RED=\033[0;31m
NC=\033[0m
GRN=\033[0;32m

.PHONY : clean example run test example.bin example.txt

clean:
	@rm -f ./example.*

run:
	./bin/ff.ts compile ../ff/example2.ff | ./bin/ff.ts execute

test:	example.bin example.txt

example.bin:
	@printf "** Deno Compile **"
	@time ./bin/ff2ffb.ts ../ff/example2.ff > ./example2.bin
	@cmp --silent -- "./example2.bin" "../fixtures/example2.bin" && printf "${GRN}OK${NC}\n" || printf "${RED}bins differ${NC}\n"
	@echo ""

example.txt:
	@echo "** Deno Execute **"
	@time ./bin/ffb-interp.ts ./example2.bin > ./example.txt
	@cmp --silent -- "./example.txt" "../fixtures/example.txt" && printf "${GRN}OK${NC}\n" || printf "${RED}outouts differ${NC}\n"
	@echo ""
