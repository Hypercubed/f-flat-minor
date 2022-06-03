package main

import (
	"bufio"
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

	reader := bufio.NewReader(os.Stdin)

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
	engine.ExecuteBigIntCode(bigint)
}
