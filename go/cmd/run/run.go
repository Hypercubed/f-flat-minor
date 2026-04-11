package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"m/cmd/internal/stdlibroots"
	"m/src/compiler"
	"m/src/engine"
	"m/src/preprocess"
	"os"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	compiler.Setup()
	engine.Setup()

	preprocessFlagPtr := flag.Bool("preprocess", false, "only preprocess, don't execute")
	inFlagPtr := flag.String("in", "-", "the input file")
	var stdlibRootFlags stdlibroots.Flag
	flag.Var(&stdlibRootFlags, "stdlib-root", "append a standard library search root")
	flag.Parse()
	stdlibOptions := preprocess.Options{
		StdlibRoots: preprocess.BuildStdlibRoots(stdlibRootFlags.Values()),
	}

	code := ""

	if *inFlagPtr != "" && *inFlagPtr != "-" {
		data, err := os.ReadFile(*inFlagPtr)
		check(err)
		code = string(data)
	} else {
		data, err := ioutil.ReadAll(os.Stdin)
		check(err)
		code = string(data)
	}

	if *preprocessFlagPtr {
		// Preprocess mode: resolve imports and output flat .ff source
		preprocessed := preprocess.NewWithOptions(*inFlagPtr, stdlibOptions).Process(code, *inFlagPtr)
		fmt.Println(preprocessed)
		return
	}

	tokens := compiler.Tokenize(code)

	ir := compiler.CompileToIRWithOptions(tokens, *inFlagPtr, stdlibOptions)

	bigInt := compiler.CompileToBigIntArray(ir)

	engine.Run(bigInt)
}
