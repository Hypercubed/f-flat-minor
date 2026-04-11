package main

import (
	"flag"
	"io/ioutil"
	"m/cmd/internal/stdlibroots"
	"m/src/compiler"
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

	inFlagPtr := flag.String("in", "-", "the input file")
	var stdlibRootFlags stdlibroots.Flag
	flag.Var(&stdlibRootFlags, "stdlib-root", "append a standard library search root")
	flag.Parse()

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

	tokens := compiler.Tokenize(code)

	ir := compiler.CompileToIRWithOptions(tokens, *inFlagPtr, preprocess.Options{
		StdlibRoots: preprocess.BuildStdlibRoots(stdlibRootFlags.Values()),
	})

	base64Code := compiler.CompileToBase64(ir)

	header := []byte("FbAbbCb")

	os.Stdout.Write(header)
	os.Stdout.Write([]byte(base64Code))
}
