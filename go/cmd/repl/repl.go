package main

import (
	"fmt"
	"m/src/compiler"
	"m/src/engine"

	"github.com/c-bata/go-prompt"
)

func executor(code string) {
	tokens := compiler.Tokenize(code)
	ir := compiler.CompileToIR(tokens)
	bigInt := compiler.CompileToBigIntArray(ir)
	engine.ExecuteBigIntCode(bigInt)
	engine.Print()
}

func completer(d prompt.Document) []prompt.Suggest {
	return nil
}

func main() {
	compiler.Setup()
	engine.Setup()

	fmt.Println("\nF♭ minor")

	executor(".load ./ff/core.ff")

	p := prompt.New(
		executor,
		completer,
		prompt.OptionPrefix("F♭> "),
	)
	p.Run()
}
