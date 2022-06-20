SHELL := /bin/bash
RED=\033[0;31m
NC=\033[0m
GRN=\033[0;32m

SUBDIRS := deno go python ruby dart
FF = ./ff{,/*}/*.{ff,ffp}

define FOREACH
	@for DIR in $(SUBDIRS);\
	do \
		$(MAKE) -s -C $$DIR $(1) --no-print-directory; \
	done
endef

define CHECK
	printf "${GRN}OK${NC} " || printf "${RED}FAILED${NC} "
endef