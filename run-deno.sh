cd deno
rm -f ./output.*
rm -f ./compile
rm -f ./execute

# deno --unstable compile --lite --allow-read ./compile.ts
# echo ""

echo "Deno Compile"

# time ./compile > ./output.bin
time deno run --allow-read ./compile.ts > ./output.bin

echo ""

if cmp --silent -- "./output.bin" "../output.bin"; then
  echo "OK"
else
  echo "binarys differ"
  exit 1
fi

echo ""

# deno --unstable compile --lite --allow-read ./execute.ts
# echo ""

echo "Deno Execute"

# time ./execute > ./output.txt
time deno run --allow-read ./execute.ts > ./output.txt

echo ""

if cmp --silent -- "./output.txt" "../output.txt"; then
  echo "OK"
else
  echo "outputs differ"
  exit 1
fi

echo ""
