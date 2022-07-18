package main

import (
	"bufio"
	"flag"
	"io"
	"io/ioutil"
	"m/src/engine"
	"os"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	engine.Setup()

	inFlagPtr := flag.String("in", "-", "the input file")
	flag.Parse()

	reader := bufio.NewReader(os.Stdin)

	if *inFlagPtr != "" && *inFlagPtr != "-" {
		f, err := os.Open(*inFlagPtr)
		check(err)
		reader = bufio.NewReader(f)
	}

	header := []byte("FbAbbCb")

	for i := 0; i < len(header); i++ {
		c, err := reader.ReadByte()
		if (err == io.EOF) || (c != header[i]) {
			panic("Invalid Header")
		}
	}

	buf, err := ioutil.ReadAll(reader)
	check(err)

	base64 := string(buf)
	bigint := engine.FromBase64(base64)
	engine.Run(bigint)
}
