name="temp.ff"
echo "#lang reader \"ff.rkt\"" > $name
cat - $@ >> $name
racket $name
