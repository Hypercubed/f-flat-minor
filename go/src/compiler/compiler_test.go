package compiler

import (
	. "m/src/utils"
	"math/big"
	"os"
	"path/filepath"
	"testing"
)

func resetCompilerStateForTest() {
	symbolMap = make(map[string]int64)
	code = -1
}

func TestCompileDoubleQuotedStringAsQuotation(t *testing.T) {
	resetCompilerStateForTest()
	Setup()

	irDQ := CompileToIR(Tokenize(`"hi"`), "")
	irBQ := CompileToIR(Tokenize("[ 'hi' ]"), "")
	if len(irDQ) != len(irBQ) {
		t.Fatalf("expected same IR length, got %d vs %d", len(irDQ), len(irBQ))
	}
	for i := range irDQ {
		if irDQ[i].op != irBQ[i].op || irDQ[i].value.Cmp(irBQ[i].value) != 0 {
			t.Fatalf("IR mismatch at %d: %+v vs %+v", i, irDQ[i], irBQ[i])
		}
	}
	if len(irDQ) != 4 || irDQ[0].op != "call" || irDQ[0].value.Cmp(big.NewInt(OP_BRA)) != 0 ||
		irDQ[3].op != "call" || irDQ[3].value.Cmp(big.NewInt(OP_KET)) != 0 {
		t.Fatalf("expected BRA push push KET, got %+v", irDQ)
	}
}

func TestCompileEmptyDoubleQuotedString(t *testing.T) {
	resetCompilerStateForTest()
	Setup()

	ir := CompileToIR(Tokenize(`""`), "")
	if len(ir) != 2 || ir[0].op != "call" || ir[0].value.Cmp(big.NewInt(OP_BRA)) != 0 ||
		ir[1].op != "call" || ir[1].value.Cmp(big.NewInt(OP_KET)) != 0 {
		t.Fatalf("expected empty quote BRA KET, got %+v", ir)
	}
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

func TestCompileToIRManglesImportedPrivateWords(t *testing.T) {
	resetCompilerStateForTest()
	Setup()

	tmpDir := t.TempDir()
	mainFile := filepath.Join(tmpDir, "main.ffp")
	firstPrivate := filepath.Join(tmpDir, "a-b", "private.ffp")
	secondPrivate := filepath.Join(tmpDir, "a", "b-private.ffp")

	check(os.MkdirAll(filepath.Dir(firstPrivate), 0o755))
	check(os.MkdirAll(filepath.Dir(secondPrivate), 0o755))
	check(os.WriteFile(
		mainFile,
		[]byte(".import ./a-b/private.ffp\n.import ./a/b-private.ffp\n"),
		0o644,
	))
	check(os.WriteFile(firstPrivate, []byte("__hidden: 1 ;\n"), 0o644))
	check(os.WriteFile(secondPrivate, []byte("__hidden: 2 ;\n"), 0o644))

	defer func() {
		if r := recover(); r != nil {
			t.Fatalf("expected mangled imports to avoid symbol collisions, got panic: %v", r)
		}
	}()

	ir := CompileToIR(
		Tokenize(".import ./a-b/private.ffp\n.import ./a/b-private.ffp\n"),
		mainFile,
	)
	if len(ir) == 0 {
		t.Fatalf("expected compiled IR for imported files")
	}
}
