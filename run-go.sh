cd ./go
rm -f ./output.*
rm -f ./execute

echo "Deno Compile and Execute"

go build
time ./execute > output.txt

echo ""

if cmp --silent -- "./output.txt" "../output.txt"; then
  echo "OK"
else
  echo "outputs differ"
  exit 1
fi

echo ""

