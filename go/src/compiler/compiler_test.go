package compiler

import (
	. "m/src/utils"
	"math/big"
	"testing"
)

func resetCompilerStateForTest() {
	symbolMap = make(map[string]int64)
	code = -1
	imported = make(map[string]bool)
}

func TestCompileConsAsSystemWord(t *testing.T) {
	resetCompilerStateForTest()
	Setup()

	ir := CompileToIR(Tokenize("cons"), "")
	if len(ir) != 1 {
		t.Fatalf("expected 1 IR instruction, got %d", len(ir))
	}

	if ir[0].op != "call" {
		t.Fatalf("expected cons to compile as call, got %q", ir[0].op)
	}

	if ir[0].value.Cmp(big.NewInt(OP_CONS)) != 0 {
		t.Fatalf("expected cons opcode %d, got %s", OP_CONS, ir[0].value.String())
	}
}
