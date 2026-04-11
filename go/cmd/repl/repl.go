package main

import (
	"flag"
	"fmt"
	"m/cmd/internal/stdlibroots"
	"m/src/compiler"
	"m/src/engine"
	"m/src/preprocess"

	"github.com/c-bata/go-prompt"
)

func executor(code string, options preprocess.Options) {
	filepath := "repl.ffp"
	tokens := compiler.Tokenize(code)
	ir := compiler.CompileToIRWithOptions(tokens, filepath, options)
	bigInt := compiler.CompileToBigIntArray(ir)
	engine.Run(bigInt)
	engine.Print()
}

func completer(d prompt.Document) []prompt.Suggest {
	return nil
}

func main() {
	compiler.Setup()
	engine.Setup()
	var stdlibRootFlags stdlibroots.Flag
	flag.Var(&stdlibRootFlags, "stdlib-root", "append a standard library search root")
	flag.Parse()
	stdlibOptions := preprocess.Options{
		StdlibRoots: preprocess.BuildStdlibRoots(stdlibRootFlags.Values()),
	}

	fmt.Println("\nF♭ minor")

	executor(".load <core/core.ff>", stdlibOptions)

	p := prompt.New(
		func(code string) { executor(code, stdlibOptions) },
		completer,
		prompt.OptionPrefix("F♭> "),
	)
	p.Run()
}
