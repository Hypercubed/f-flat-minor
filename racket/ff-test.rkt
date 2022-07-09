#lang reader "ff.rkt"

[--] : 1 - ;
[(fact)] : dup 1 - fact * ;
[fact] : dup 1 - [(fact)] ? ;

100 fact .