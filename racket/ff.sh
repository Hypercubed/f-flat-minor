name="temp.ff"
echo "#lang reader \"ff.rkt\"" | cat - $@ > $name
racket $name
