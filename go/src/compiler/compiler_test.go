package compiler

import (
	"m/src/preprocess"
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

func TestCompileToIRResolvesStdlibImports(t *testing.T) {
	resetCompilerStateForTest()
	Setup()

	tmpDir := t.TempDir()
	mainFile := filepath.Join(tmpDir, "main.ffp")
	stdlibRoot := filepath.Join(tmpDir, "stdlib")
	stdlibFile := filepath.Join(stdlibRoot, "prelude.ffp")

	check(os.MkdirAll(filepath.Dir(stdlibFile), 0o755))
	check(os.WriteFile(stdlibFile, []byte("answer: 42 ;\n"), 0o644))

	ir := CompileToIRWithOptions(Tokenize(".import <prelude>\nanswer\n"), mainFile, preprocess.Options{
		StdlibRoots: []string{stdlibRoot},
	})
	if len(ir) == 0 {
		t.Fatalf("expected compiled IR for stdlib import")
	}
}

func TestCompileToIRDedupesCanonicalImportedPaths(t *testing.T) {
	resetCompilerStateForTest()
	Setup()

	tmpDir := t.TempDir()
	mainFile := filepath.Join(tmpDir, "main.ffp")
	importedFile := filepath.Join(tmpDir, "lib", "private.ffp")

	check(os.MkdirAll(filepath.Dir(importedFile), 0o755))
	check(os.WriteFile(importedFile, []byte("__hidden: 1 ;\n"), 0o644))

	ir := CompileToIR(Tokenize(".import ./lib/private.ffp\n.import ./lib/../lib/private.ffp\n"), mainFile)
	if len(ir) == 0 {
		t.Fatalf("expected compiled IR for canonical dedup test")
	}
}
