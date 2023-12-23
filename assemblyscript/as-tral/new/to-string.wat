(module
 (type $0 (func (param i32) (result i32)))
 (type $1 (func (param i32 i32) (result i32)))
 (type $2 (func (param i32 i32)))
 (type $3 (func))
 (type $4 (func (param i32)))
 (type $5 (func (param f64 f64) (result i32)))
 (type $6 (func (param i32 i32) (result f64)))
 (type $7 (func (param i32 f64) (result f64)))
 (type $8 (func (param i32 i32 i32)))
 (type $9 (func (param i32) (result f64)))
 (type $10 (func (result i32)))
 (type $11 (func (result f64)))
 (type $12 (func (param i32 i32 i32 i32)))
 (type $13 (func (param i32 i32 i64)))
 (type $14 (func (param i32 i32 i32) (result i32)))
 (type $15 (func (param f64 f64 i32 i32) (result f64)))
 (type $16 (func (param i32 f64 f64)))
 (type $17 (func (param f64 f64)))
 (type $18 (func (param i32 i32 i32 i32 i32)))
 (type $19 (func (param i32 i32 i32 i32) (result i32)))
 (type $20 (func (param i32 i32 i32 i32 i32 i32)))
 (type $21 (func (param i64) (result i64)))
 (type $22 (func (param f64 f64 f64)))
 (type $23 (func (param f64 f64 f64 f64)))
 (type $24 (func (param f64) (result i32)))
 (type $25 (func (param i32 i32) (result i64)))
 (type $26 (func (param i32 i32 f64)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (import "__astral__" "warmup" (func $~lib/__astral__/warmup (param i32)))
 (import "__astral__" "now" (func $~lib/__astral__/now (result f64)))
 (import "__astral__" "faultyConfig" (func $~lib/__astral__/faultyConfig (param i32 f64 f64)))
 (import "__astral__" "start" (func $~lib/__astral__/start (param f64 f64)))
 (import "__astral__" "faultyBenchmark" (func $~lib/__astral__/faultyBenchmark))
 (import "__astral__" "analyzing" (func $~lib/__astral__/analyzing))
 (import "env" "seed" (func $~lib/builtins/seed (result f64)))
 (import "__astral__" "result" (func $~lib/__astral__/result (param f64 f64 f64)))
 (import "__astral__" "change" (func $~lib/__astral__/change (param f64 f64 f64 f64)))
 (import "__astral__" "outliers" (func $~lib/__astral__/outliers (param i32 i32 i32 i32)))
 (global $~lib/__astral__/baselineIters i32 (i32.const 1152))
 (global $~lib/__astral__/baselineTimes i32 (i32.const 1952))
 (global $~lib/__astral__/flags (mut i32) (i32.const 0))
 (global $~lib/__astral__/meanLB (mut f64) (f64.const 0))
 (global $~lib/__astral__/meanHB (mut f64) (f64.const 0))
 (global $~lib/__astral__/meanPoint (mut f64) (f64.const 0))
 (global $~lib/__astral__/meanError (mut f64) (f64.const 0))
 (global $~lib/__astral__/medianLB (mut f64) (f64.const 0))
 (global $~lib/__astral__/medianHB (mut f64) (f64.const 0))
 (global $~lib/__astral__/medianPoint (mut f64) (f64.const 0))
 (global $~lib/__astral__/medianError (mut f64) (f64.const 0))
 (global $~lib/__astral__/MADLB (mut f64) (f64.const 0))
 (global $~lib/__astral__/MADHB (mut f64) (f64.const 0))
 (global $~lib/__astral__/MADPoint (mut f64) (f64.const 0))
 (global $~lib/__astral__/MADError (mut f64) (f64.const 0))
 (global $~lib/__astral__/slopeLB (mut f64) (f64.const 0))
 (global $~lib/__astral__/slopeHB (mut f64) (f64.const 0))
 (global $~lib/__astral__/slopePoint (mut f64) (f64.const 0))
 (global $~lib/__astral__/slopeError (mut f64) (f64.const 0))
 (global $~lib/__astral__/stdDevLB (mut f64) (f64.const 0))
 (global $~lib/__astral__/stdDevHB (mut f64) (f64.const 0))
 (global $~lib/__astral__/stdDevPoint (mut f64) (f64.const 0))
 (global $~lib/__astral__/stdDevError (mut f64) (f64.const 0))
 (global $assembly/mp/TO_DECIMAL_N (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/total (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/threshold (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/state (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/visitCount (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/pinSpace (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/iter (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/toSpace (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/white (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/fromSpace (mut i32) (i32.const 0))
 (global $~lib/rt/tlsf/ROOT (mut i32) (i32.const 0))
 (global $assembly/mp/TO_DECIMAL_P (mut i32) (i32.const 0))
 (global $assembly/mp/MpZ.A (mut i32) (i32.const 0))
 (global $assembly/mp/MpZ.B (mut i32) (i32.const 0))
 (global $~argumentsLength (mut i32) (i32.const 0))
 (global $assembly/mp/MpZ.ZERO (mut i32) (i32.const 0))
 (global $assembly/__benches__/to-string/input (mut i32) (i32.const 0))
 (global $~lib/math/random_seeded (mut i32) (i32.const 0))
 (global $~lib/math/random_state0_64 (mut i64) (i64.const 0))
 (global $~lib/math/random_state1_64 (mut i64) (i64.const 0))
 (global $~lib/math/random_state0_32 (mut i32) (i32.const 0))
 (global $~lib/memory/__stack_pointer (mut i32) (i32.const 42884))
 (global $~started (mut i32) (i32.const 0))
 (memory $0 1)
 (data $3 (i32.const 2764) "\1c")
 (data $3.1 (i32.const 2776) "\02\00\00\00\02\00\00\000")
 (data $4 (i32.const 2796) ",")
 (data $4.1 (i32.const 2808) "\02\00\00\00\1c\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00l\00e\00n\00g\00t\00h")
 (data $5 (i32.const 2844) ",")
 (data $5.1 (i32.const 2856) "\02\00\00\00\1c\00\00\00~\00l\00i\00b\00/\00s\00t\00r\00i\00n\00g\00.\00t\00s")
 (data $6 (i32.const 2892) "\1c")
 (data $6.1 (i32.const 2904) "\02")
 (data $7 (i32.const 2924) "<")
 (data $7.1 (i32.const 2936) "\02\00\00\00(\00\00\00A\00l\00l\00o\00c\00a\00t\00i\00o\00n\00 \00t\00o\00o\00 \00l\00a\00r\00g\00e")
 (data $8 (i32.const 2988) "<")
 (data $8.1 (i32.const 3000) "\02\00\00\00 \00\00\00~\00l\00i\00b\00/\00r\00t\00/\00i\00t\00c\00m\00s\00.\00t\00s")
 (data $11 (i32.const 3116) "<")
 (data $11.1 (i32.const 3128) "\02\00\00\00$\00\00\00I\00n\00d\00e\00x\00 \00o\00u\00t\00 \00o\00f\00 \00r\00a\00n\00g\00e")
 (data $12 (i32.const 3180) ",")
 (data $12.1 (i32.const 3192) "\02\00\00\00\14\00\00\00~\00l\00i\00b\00/\00r\00t\00.\00t\00s")
 (data $14 (i32.const 3260) "<")
 (data $14.1 (i32.const 3272) "\02\00\00\00\1e\00\00\00~\00l\00i\00b\00/\00r\00t\00/\00t\00l\00s\00f\00.\00t\00s")
 (data $15 (i32.const 3324) "<")
 (data $15.1 (i32.const 3336) "\02\00\00\00&\00\00\00~\00l\00i\00b\00/\00s\00t\00a\00t\00i\00c\00a\00r\00r\00a\00y\00.\00t\00s")
 (data $16 (i32.const 3388) "\9c")
 (data $16.1 (i32.const 3400) "\02\00\00\00\84\00\00\000\00x\00D\00E\00A\00D\00B\00E\00E\00F\00D\00E\00A\00D\00B\00E\00E\00F\00D\00E\00A\00D\00B\00E\00E\00F\00D\00E\00A\00D\00B\00E\00E\00F\00D\00E\00A\00D\00B\00E\00E\00F\00D\00E\00A\00D\00B\00E\00E\00F\00D\00E\00A\00D\00B\00E\00E\00F\00D\00E\00A\00D\00B\00E\00E\00F")
 (data $17 (i32.const 3548) "\1c")
 (data $17.1 (i32.const 3560) "\02\00\00\00\0c\00\00\00s\00t\00r\00i\00n\00g")
 (data $18 (i32.const 3580) "\1c")
 (data $18.1 (i32.const 3592) "\02\00\00\00\02\00\00\00-")
 (data $19 (i32.const 3612) "\1c")
 (data $19.1 (i32.const 3624) "\05\00\00\00\04")
 (data $20 (i32.const 3644) "|")
 (data $20.1 (i32.const 3656) "\02\00\00\00d\00\00\00t\00o\00S\00t\00r\00i\00n\00g\00(\00)\00 \00r\00a\00d\00i\00x\00 \00a\00r\00g\00u\00m\00e\00n\00t\00 \00m\00u\00s\00t\00 \00b\00e\00 \00b\00e\00t\00w\00e\00e\00n\00 \002\00 \00a\00n\00d\00 \003\006")
 (data $21 (i32.const 3772) "<")
 (data $21.1 (i32.const 3784) "\02\00\00\00&\00\00\00~\00l\00i\00b\00/\00u\00t\00i\00l\00/\00n\00u\00m\00b\00e\00r\00.\00t\00s")
 (data $22 (i32.const 3836) "\\")
 (data $22.1 (i32.const 3848) "\02\00\00\00H\00\00\000\001\002\003\004\005\006\007\008\009\00a\00b\00c\00d\00e\00f\00g\00h\00i\00j\00k\00l\00m\00n\00o\00p\00q\00r\00s\00t\00u\00v\00w\00x\00y\00z")
 (data $23 (i32.const 3932) "<")
 (data $23.1 (i32.const 3944) "\02\00\00\00&\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00d\00i\00g\00i\00t\00 \00c\00o\00d\00e\00 ")
 (data $24 (i32.const 3996) ",")
 (data $24.1 (i32.const 4008) "\02\00\00\00\1c\00\00\00a\00s\00s\00e\00m\00b\00l\00y\00/\00m\00p\00.\00t\00s")
 (data $25 (i32.const 4044) ",")
 (data $25.1 (i32.const 4056) "\02\00\00\00\1a\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00.\00t\00s")
 (data $26 (i32.const 4092) "L")
 (data $26.1 (i32.const 4104) "\02\00\00\002\00\00\00U\00n\00s\00u\00p\00p\00o\00r\00t\00e\00d\00 \00g\00e\00n\00e\00r\00i\00c\00 \00t\00y\00p\00e\00 ")
 (data $27 (i32.const 4172) "\1c")
 (data $27.1 (i32.const 4184) "\02\00\00\00\0c\00\00\00S\00t\00r\00i\00n\00g")
 (data $28 (i32.const 4204) "\1c")
 (data $28.1 (i32.const 4216) "\01\00\00\00\04")
 (data $29 (i32.const 4236) "|")
 (data $29.1 (i32.const 4248) "\02\00\00\00^\00\00\00U\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00\'\00n\00u\00l\00l\00\'\00 \00(\00n\00o\00t\00 \00a\00s\00s\00i\00g\00n\00e\00d\00 \00o\00r\00 \00f\00a\00i\00l\00e\00d\00 \00c\00a\00s\00t\00)")
 (data $30 (i32.const 4364) "\1c")
 (data $30.1 (i32.const 4376) "\n\00\00\00\08\00\00\00\01")
 (data $31 (i32.const 4396) "\1c")
 (data $31.1 (i32.const 4408) "\r\00\00\00\08\00\00\00\02")
 (data $32 (i32.const 4428) "\1c")
 (data $32.1 (i32.const 4440) "\0e\00\00\00\08\00\00\00\03")
 (data $33 (i32.const 4460) "\1c")
 (data $33.1 (i32.const 4472) "\02\00\00\00\06\00\00\000\00x\000")
 (data $34 (i32.const 4492) "L\03")
 (data $34.1 (i32.const 4504) "\0f\00\00\000\03\00\00\df\00S\00S\00\00\00I\01\bc\02N\00\00\00\f0\01J\00\0c\03\00\00\90\03\99\03\08\03\01\03\b0\03\a5\03\08\03\01\03\87\055\05R\05\00\00\96\1eH\001\03\00\00\97\1eT\00\08\03\00\00\98\1eW\00\n\03\00\00\99\1eY\00\n\03\00\00\9a\1eA\00\be\02\00\00P\1f\a5\03\13\03\00\00R\1f\a5\03\13\03\00\03T\1f\a5\03\13\03\01\03V\1f\a5\03\13\03B\03\80\1f\08\1f\99\03\00\00\81\1f\t\1f\99\03\00\00\82\1f\n\1f\99\03\00\00\83\1f\0b\1f\99\03\00\00\84\1f\0c\1f\99\03\00\00\85\1f\r\1f\99\03\00\00\86\1f\0e\1f\99\03\00\00\87\1f\0f\1f\99\03\00\00\88\1f\08\1f\99\03\00\00\89\1f\t\1f\99\03\00\00\8a\1f\n\1f\99\03\00\00\8b\1f\0b\1f\99\03\00\00\8c\1f\0c\1f\99\03\00\00\8d\1f\r\1f\99\03\00\00\8e\1f\0e\1f\99\03\00\00\8f\1f\0f\1f\99\03\00\00\90\1f(\1f\99\03\00\00\91\1f)\1f\99\03\00\00\92\1f*\1f\99\03\00\00\93\1f+\1f\99\03\00\00\94\1f,\1f\99\03\00\00\95\1f-\1f\99\03\00\00\96\1f.\1f\99\03\00\00\97\1f/\1f\99\03\00\00\98\1f(\1f\99\03\00\00\99\1f)\1f\99\03\00\00\9a\1f*\1f\99\03\00\00\9b\1f+\1f\99\03\00\00\9c\1f,\1f\99\03\00\00\9d\1f-\1f\99\03\00\00\9e\1f.\1f\99\03\00\00\9f\1f/\1f\99\03\00\00\a0\1fh\1f\99\03\00\00\a1\1fi\1f\99\03\00\00\a2\1fj\1f\99\03\00\00\a3\1fk\1f\99\03\00\00\a4\1fl\1f\99\03\00\00\a5\1fm\1f\99\03\00\00\a6\1fn\1f\99\03\00\00\a7\1fo\1f\99\03\00\00\a8\1fh\1f\99\03\00\00\a9\1fi\1f\99\03\00\00\aa\1fj\1f\99\03\00\00\ab\1fk\1f\99\03\00\00\ac\1fl\1f\99\03\00\00\ad\1fm\1f\99\03\00\00\ae\1fn\1f\99\03\00\00\af\1fo\1f\99\03\00\00\b2\1f\ba\1f\99\03\00\00\b3\1f\91\03\99\03\00\00\b4\1f\86\03\99\03\00\00\b6\1f\91\03B\03\00\00\b7\1f\91\03B\03\99\03\bc\1f\91\03\99\03\00\00\c2\1f\ca\1f\99\03\00\00\c3\1f\97\03\99\03\00\00\c4\1f\89\03\99\03\00\00\c6\1f\97\03B\03\00\00\c7\1f\97\03B\03\99\03\cc\1f\97\03\99\03\00\00\d2\1f\99\03\08\03\00\03\d3\1f\99\03\08\03\01\03\d6\1f\99\03B\03\00\00\d7\1f\99\03\08\03B\03\e2\1f\a5\03\08\03\00\03\e3\1f\a5\03\08\03\01\03\e4\1f\a1\03\13\03\00\00\e6\1f\a5\03B\03\00\00\e7\1f\a5\03\08\03B\03\f2\1f\fa\1f\99\03\00\00\f3\1f\a9\03\99\03\00\00\f4\1f\8f\03\99\03\00\00\f6\1f\a9\03B\03\00\00\f7\1f\a9\03B\03\99\03\fc\1f\a9\03\99\03\00\00\00\fbF\00F\00\00\00\01\fbF\00I\00\00\00\02\fbF\00L\00\00\00\03\fbF\00F\00I\00\04\fbF\00F\00L\00\05\fbS\00T\00\00\00\06\fbS\00T\00\00\00\13\fbD\05F\05\00\00\14\fbD\055\05\00\00\15\fbD\05;\05\00\00\16\fbN\05F\05\00\00\17\fbD\05=\05")
 (data $35 (i32.const 5340) "\07\08\t\n\0b\0c\06\06\06\06\06\06\06\06\06\06\r\06\06\0e\06\06\06\06\06\06\06\06\0f\10\11\12\06\13\06\06\06\06\06\06\06\06\06\06\14\15\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\16\17\06\06\06\18\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\19\06\06\06\06\1a\06\06\06\06\06\06\06\1b\06\06\06\06\06\06\06\06\06\06\06\1c\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\1d\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\1e\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06\06")
 (data $35.1 (i32.const 5963) "$++++++++\01\00TVVVVVVVV")
 (data $35.2 (i32.const 6002) "\18\00\00\00+++++++\07++[VVVVVVVJVV\051P1P1P1P1P1P1P1P$Py1P1P18P1P1P1P1P1P1P1PN1\02N\r\rN\03N\00$n\00N1&nQN$PN9\14\81\1b\1d\1dS1P1P\r1P1P1P\1bS$P1\02\\{\\{\\{\\{\\{\14y\\{\\{\\-+I\03H\03x\\{\14\00\96\n\01+(\06\06\00*\06**+\07\bb\b5+\1e\00+\07+++\01++++++++++++++++++++++++++++++++\01+++++++++++++++++++++++*+++++++++++++\cdF\cd+\00%+\07\01\06\01UVVVVVUVV\02$\81\81\81\81\81\15\81\81\81\00\00+\00\b2\d1\b2\d1\b2\d1\b2\d1\00\00\cd\cc\01\00\d7\d7\d7\d7\d7\83\81\81\81\81\81\81\81\81\81\81\ac\ac\ac\ac\ac\ac\ac\ac\ac\ac\1c\00\00\00\00\001P1P1P1P1P1\02\00\001P1P1P1P1P1P1P1P1PN1P1PN1P1P1P1P1P1P1P1\02\87\a6\87\a6\87\a6\87\a6\87\a6\87\a6\87\a6\87\a6*++++++++++++\00\00\00TVVVVVVVVVVVV")
 (data $35.3 (i32.const 6511) "TVVVVVVVVVVVV\0c\00\0c*+++++++++++++\07*\01")
 (data $35.4 (i32.const 6597) "*++++++++++++++++++++++++++VVl\81\15\00++++++++++++++++++++++++++++++++++++++++++\07l\03A++VVVVVVVVVVVVVV,V+++++++++++++++++++++\01")
 (data $35.5 (i32.const 6756) "\0cl\00\00\00\00\00\06")
 (data $35.6 (i32.const 6802) "\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%Vz\9e&\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06%\06\01++OVV,+\7fVV9++UVV++OVV,+\7fVV\817u[{\\++OVV\02\ac\04\00\009++UVV++OVV,++VV2\13\81W\00o\81~\c9\d7~-\81\81\0e~9\7foW\00\81\81~\15\00~\03++++++++++++\07+$+\97+++++++++*+++++VVVVV\80\81\81\81\819\bb*++++++++++++++++++++++++++++++++++++++++\01\81\81\81\81\81\81\81\81\81\81\81\81\81\81\81\c9\ac\ac\ac\ac\ac\ac\ac\ac\ac\ac\ac\ac\ac\ac\ac\d0\r\00N1\02\b4\c1\c1\d7\d7$P1P1P1P1P1P1P1P1P1P1P1P1P1P1P1P1P\d7\d7S\c1G\d4\d7\d7\d7\05++++++++++++\07\01\00\01")
 (data $35.7 (i32.const 7253) "N1P1P1P1P1P1P1P\r\00\00\00\00\00$P1P1P1P1P")
 (data $35.8 (i32.const 7318) "+++++++++++y\\{\\{O{\\{\\{\\{\\{\\{\\{\\{\\{\\{\\-++y\14\\{\\-y*\\\'\\{\\{\\{\a4\00\n\b4\\{\\{O\03x8+++++++++++++O-++\01")
 (data $35.9 (i32.const 7431) "H")
 (data $35.10 (i32.const 7441) "*++++++++++++++++++++++++++")
 (data $35.11 (i32.const 7501) "++++++++\07\00HVVVVVVVV\02")
 (data $35.12 (i32.const 7576) "+++++++++++++UVVVVVVVVVVVV\0e")
 (data $35.13 (i32.const 7634) "$+++++++++++\07\00VVVVVVVVVVVV")
 (data $35.14 (i32.const 7704) "$++++++++++++++++\07\00\00\00\00VVVVVVVVVVVVVVVVV")
 (data $35.15 (i32.const 7801) "*++++++++++VVVVVVVVVV\0e")
 (data $35.16 (i32.const 7855) "*++++++++++VVVVVVVVVV\0e")
 (data $35.17 (i32.const 7920) "+++++++++++UVVVVVVVVVV\0e")
 (data $36 (i32.const 8009) "\08\00\00V\01\00\009")
 (data $37 (i32.const 8024) "\01 \00\00\00\e0\ff\ff\00\bf\1d\00\00\e7\02\00\00y\00\00\02$\00\00\01\01\00\00\00\ff\ff\ff\00\00\00\00\01\02\00\00\00\fe\ff\ff\019\ff\ff\00\18\ff\ff\01\87\ff\ff\00\d4\fe\ff\00\c3\00\00\01\d2\00\00\01\ce\00\00\01\cd\00\00\01O\00\00\01\ca\00\00\01\cb\00\00\01\cf\00\00\00a\00\00\01\d3\00\00\01\d1\00\00\00\a3\00\00\01\d5\00\00\00\82\00\00\01\d6\00\00\01\da\00\00\01\d9\00\00\01\db\00\00\008\00\00\03\00\00\00\00\b1\ff\ff\01\9f\ff\ff\01\c8\ff\ff\02($\00\00\00\00\00\01\01\00\00\00\ff\ff\ff\003\ff\ff\00&\ff\ff\01~\ff\ff\01+*\00\01]\ff\ff\01(*\00\00?*\00\01=\ff\ff\01E\00\00\01G\00\00\00\1f*\00\00\1c*\00\00\1e*\00\00.\ff\ff\002\ff\ff\006\ff\ff\005\ff\ff\00O\a5\00\00K\a5\00\001\ff\ff\00(\a5\00\00D\a5\00\00/\ff\ff\00-\ff\ff\00\f7)\00\00A\a5\00\00\fd)\00\00+\ff\ff\00*\ff\ff\00\e7)\00\00C\a5\00\00*\a5\00\00\bb\ff\ff\00\'\ff\ff\00\b9\ff\ff\00%\ff\ff\00\15\a5\00\00\12\a5\00\02$L\00\00\00\00\00\01 \00\00\00\e0\ff\ff\01\01\00\00\00\ff\ff\ff\00T\00\00\01t\00\00\01&\00\00\01%\00\00\01@\00\00\01?\00\00\00\da\ff\ff\00\db\ff\ff\00\e1\ff\ff\00\c0\ff\ff\00\c1\ff\ff\01\08\00\00\00\c2\ff\ff\00\c7\ff\ff\00\d1\ff\ff\00\ca\ff\ff\00\f8\ff\ff\00\aa\ff\ff\00\b0\ff\ff\00\07\00\00\00\8c\ff\ff\01\c4\ff\ff\00\a0\ff\ff\01\f9\ff\ff\02\1ap\00\01\01\00\00\00\ff\ff\ff\01 \00\00\00\e0\ff\ff\01P\00\00\01\0f\00\00\00\f1\ff\ff\00\00\00\00\010\00\00\00\d0\ff\ff\01\01\00\00\00\ff\ff\ff\00\00\00\00\00\c0\0b\00\01`\1c\00\00\00\00\00\01\d0\97\00\01\08\00\00\00\f8\ff\ff\02\05\8a\00\00\00\00\00\01@\f4\ff\00\9e\e7\ff\00\c2\89\00\00\db\e7\ff\00\92\e7\ff\00\93\e7\ff\00\9c\e7\ff\00\9d\e7\ff\00\a4\e7\ff\00\00\00\00\008\8a\00\00\04\8a\00\00\e6\0e\00\01\01\00\00\00\ff\ff\ff\00\00\00\00\00\c5\ff\ff\01A\e2\ff\02\1d\8f\00\00\08\00\00\01\f8\ff\ff\00\00\00\00\00V\00\00\01\aa\ff\ff\00J\00\00\00d\00\00\00\80\00\00\00p\00\00\00~\00\00\00\t\00\00\01\b6\ff\ff\01\f7\ff\ff\00\db\e3\ff\01\9c\ff\ff\01\90\ff\ff\01\80\ff\ff\01\82\ff\ff\02\05\ac\00\00\00\00\00\01\10\00\00\00\f0\ff\ff\01\1c\00\00\01\01\00\00\01\a3\e2\ff\01A\df\ff\01\ba\df\ff\00\e4\ff\ff\02\0b\b1\00\01\01\00\00\00\ff\ff\ff\010\00\00\00\d0\ff\ff\00\00\00\00\01\t\d6\ff\01\1a\f1\ff\01\19\d6\ff\00\d5\d5\ff\00\d8\d5\ff\01\e4\d5\ff\01\03\d6\ff\01\e1\d5\ff\01\e2\d5\ff\01\c1\d5\ff\00\00\00\00\00\a0\e3\ff\00\00\00\00\01\01\00\00\00\ff\ff\ff\02\0c\bc\00\00\00\00\00\01\01\00\00\00\ff\ff\ff\01\bcZ\ff\01\a0\03\00\01\fcu\ff\01\d8Z\ff\000\00\00\01\b1Z\ff\01\b5Z\ff\01\bfZ\ff\01\eeZ\ff\01\d6Z\ff\01\ebZ\ff\01\d0\ff\ff\01\bdZ\ff\01\c8u\ff\00\00\00\00\000h\ff\00`\fc\ff\00\00\00\00\01 \00\00\00\e0\ff\ff\00\00\00\00\01(\00\00\00\d8\ff\ff\00\00\00\00\01@\00\00\00\c0\ff\ff\00\00\00\00\01 \00\00\00\e0\ff\ff\00\00\00\00\01 \00\00\00\e0\ff\ff\00\00\00\00\01\"\00\00\00\de\ff\ff")
 (data $38 (i32.const 8981) "\06\'Qow")
 (data $38.1 (i32.const 8996) "|\00\00\7f\00\00\00\00\00\00\00\00\83\8e\92\97\00\aa")
 (data $38.2 (i32.const 9024) "\b4\c4")
 (data $38.3 (i32.const 9146) "\c6\c9\00\00\00\db")
 (data $38.4 (i32.const 9235) "\de\00\00\00\00\e1\00\00\00\00\00\00\00\e4")
 (data $38.5 (i32.const 9260) "\e7")
 (data $38.6 (i32.const 9346) "\ea")
 (data $38.7 (i32.const 9469) "\ed")
 (data $39 (i32.const 9492) "0\0c1\rx\0e\7f\0f\80\10\81\11\86\12\89\13\8a\13\8e\14\8f\15\90\16\93\13\94\17\95\18\96\19\97\1a\9a\1b\9c\19\9d\1c\9e\1d\9f\1e\a6\1f\a9\1f\ae\1f\b1 \b2 \b7!\bf\"\c5#\c8#\cb#\dd$\f2#\f6%\f7& -:.=/>0?1@1C2D3E4P5Q6R7S8T9Y:[;\\<a=c>e?f@hAiBj@kClDoBqErFuG}H\82I\87J\89K\8aL\8bL\8cM\92N\9dO\9ePEW{\1d|\1d}\1d\7fX\86Y\88Z\89Z\8aZ\8c[\8e\\\8f\\\ac]\ad^\ae^\af^\c2_\cc`\cda\cea\cfb\d0c\d1d\d5e\d6f\d7g\f0h\f1i\f2j\f3k\f4l\f5m\f9n\fd-\fe-\ff-PiQiRiSiTiUiViWiXiYiZi[i\\i]i^i_i\82\00\83\00\84\00\85\00\86\00\87\00\88\00\89\00\c0u\cfv\80\89\81\8a\82\8b\85\8c\86\8dp\9dq\9dv\9ew\9ex\9fy\9fz\a0{\a0|\a1}\a1\b3\a2\ba\a3\bb\a3\bc\a4\be\a5\c3\a2\cc\a4\da\a6\db\a6\e5j\ea\a7\eb\a7\ecn\f3\a2\f8\a8\f9\a8\fa\a9\fb\a9\fc\a4&\b0*\b1+\b2N\b3\84\08b\bac\bbd\bce\bdf\bem\bfn\c0o\c1p\c2~\c3\7f\c3}\cf\8d\d0\94\d1\ab\d2\ac\d3\ad\d4\b0\d5\b1\d6\b2\d7\c4\d8\c5\d9\c6\da")
 (data $40 (i32.const 9900) ",")
 (data $40.1 (i32.const 9912) "\02\00\00\00\10\00\00\000\000\000\000\000\000\000\000")
 (data $41 (i32.const 9948) "\1c")
 (data $41.1 (i32.const 9960) "\02\00\00\00\06\00\00\00-\000\00x")
 (data $42 (i32.const 9980) "\1c")
 (data $42.1 (i32.const 9992) "\02\00\00\00\04\00\00\000\00x")
 (data $43 (i32.const 10012) "\1c")
 (data $43.1 (i32.const 10024) "\n\00\00\00\08\00\00\00\04")
 (data $44 (i32.const 10048) "\10\00\00\00 \00\00\00 \00\00\00 ")
 (data $44.1 (i32.const 10072) "$\01\00\00\02\01\00\00\02\t\00\00\02A")
 (data $44.2 (i32.const 10096) "$\02\00\00$\1a")
 (data $44.3 (i32.const 10112) "\a4")
 (table $0 5 5 funcref)
 (elem $0 (i32.const 1) $start:assembly/__benches__/to-string~anonymous|0 $~lib/util/sort/COMPARATOR<f64>~anonymous|0 $~lib/__astral__/Stats.mean~anonymous|0 $start:assembly/__benches__/to-string~anonymous|1)
 (export "baselineIters" (global $~lib/__astral__/baselineIters))
 (export "baselineTimes" (global $~lib/__astral__/baselineTimes))
 (export "flags" (global $~lib/__astral__/flags))
 (export "meanLB" (global $~lib/__astral__/meanLB))
 (export "meanHB" (global $~lib/__astral__/meanHB))
 (export "meanPoint" (global $~lib/__astral__/meanPoint))
 (export "meanError" (global $~lib/__astral__/meanError))
 (export "medianLB" (global $~lib/__astral__/medianLB))
 (export "medianHB" (global $~lib/__astral__/medianHB))
 (export "medianPoint" (global $~lib/__astral__/medianPoint))
 (export "medianError" (global $~lib/__astral__/medianError))
 (export "MADLB" (global $~lib/__astral__/MADLB))
 (export "MADHB" (global $~lib/__astral__/MADHB))
 (export "MADPoint" (global $~lib/__astral__/MADPoint))
 (export "MADError" (global $~lib/__astral__/MADError))
 (export "slopeLB" (global $~lib/__astral__/slopeLB))
 (export "slopeHB" (global $~lib/__astral__/slopeHB))
 (export "slopePoint" (global $~lib/__astral__/slopePoint))
 (export "slopeError" (global $~lib/__astral__/slopeError))
 (export "stdDevLB" (global $~lib/__astral__/stdDevLB))
 (export "stdDevHB" (global $~lib/__astral__/stdDevHB))
 (export "stdDevPoint" (global $~lib/__astral__/stdDevPoint))
 (export "stdDevError" (global $~lib/__astral__/stdDevError))
 (export "memory" (memory $0))
 (export "benchmark" (func $~start))
 (func $~lib/string/String#get:length (param $0 i32) (result i32)
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
 )
 (func $~lib/rt/itcms/Object#set:nextWithColor (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  i32.store offset=4
 )
 (func $~lib/rt/itcms/Object#set:prev (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  i32.store offset=8
 )
 (func $~lib/rt/itcms/initLazy (param $0 i32) (result i32)
  local.get $0
  local.get $0
  call $~lib/rt/itcms/Object#set:nextWithColor
  local.get $0
  local.get $0
  call $~lib/rt/itcms/Object#set:prev
  local.get $0
 )
 (func $~lib/rt/itcms/Object#get:next (param $0 i32) (result i32)
  local.get $0
  i32.load offset=4
  i32.const -4
  i32.and
 )
 (func $~lib/rt/itcms/Object#get:color (param $0 i32) (result i32)
  local.get $0
  i32.load offset=4
  i32.const 3
  i32.and
 )
 (func $~lib/rt/itcms/visitRoots
  (local $0 i32)
  (local $1 i32)
  global.get $assembly/__benches__/to-string/input
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  i32.const 3136
  call $~lib/rt/itcms/__visit
  i32.const 2816
  call $~lib/rt/itcms/__visit
  i32.const 2944
  call $~lib/rt/itcms/__visit
  i32.const 3856
  call $~lib/rt/itcms/__visit
  i32.const 4512
  call $~lib/rt/itcms/__visit
  global.get $assembly/mp/TO_DECIMAL_P
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/mp/MpZ.ZERO
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/mp/MpZ.A
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $assembly/mp/MpZ.B
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  global.get $~lib/rt/itcms/pinSpace
  local.tee $1
  call $~lib/rt/itcms/Object#get:next
  local.set $0
  loop $while-continue|0
   local.get $0
   local.get $1
   i32.ne
   if
    local.get $0
    call $~lib/rt/itcms/Object#get:color
    i32.const 3
    i32.ne
    if
     i32.const 0
     i32.const 3008
     i32.const 160
     i32.const 16
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 20
    i32.add
    call $~lib/rt/__visit_members
    local.get $0
    call $~lib/rt/itcms/Object#get:next
    local.set $0
    br $while-continue|0
   end
  end
 )
 (func $~lib/rt/itcms/Object#set:color (param $0 i32) (param $1 i32)
  local.get $0
  local.get $0
  i32.load offset=4
  i32.const -4
  i32.and
  local.get $1
  i32.or
  call $~lib/rt/itcms/Object#set:nextWithColor
 )
 (func $~lib/rt/itcms/Object#set:next (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  local.get $0
  i32.load offset=4
  i32.const 3
  i32.and
  i32.or
  call $~lib/rt/itcms/Object#set:nextWithColor
 )
 (func $~lib/rt/itcms/Object#linkTo (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  local.get $1
  i32.load offset=8
  local.set $3
  local.get $0
  local.get $1
  local.get $2
  i32.or
  call $~lib/rt/itcms/Object#set:nextWithColor
  local.get $0
  local.get $3
  call $~lib/rt/itcms/Object#set:prev
  local.get $3
  local.get $0
  call $~lib/rt/itcms/Object#set:next
  local.get $1
  local.get $0
  call $~lib/rt/itcms/Object#set:prev
 )
 (func $~lib/rt/itcms/Object#makeGray (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  global.get $~lib/rt/itcms/iter
  i32.eq
  if
   local.get $0
   i32.load offset=8
   local.tee $1
   i32.eqz
   if
    i32.const 0
    i32.const 3008
    i32.const 148
    i32.const 30
    call $~lib/builtins/abort
    unreachable
   end
   local.get $1
   global.set $~lib/rt/itcms/iter
  end
  block $__inlined_func$~lib/rt/itcms/Object#unlink$134
   local.get $0
   call $~lib/rt/itcms/Object#get:next
   local.tee $1
   i32.eqz
   if
    local.get $0
    i32.load offset=8
    i32.eqz
    local.get $0
    i32.const 42884
    i32.lt_u
    i32.and
    i32.eqz
    if
     i32.const 0
     i32.const 3008
     i32.const 128
     i32.const 18
     call $~lib/builtins/abort
     unreachable
    end
    br $__inlined_func$~lib/rt/itcms/Object#unlink$134
   end
   local.get $0
   i32.load offset=8
   local.tee $2
   i32.eqz
   if
    i32.const 0
    i32.const 3008
    i32.const 132
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $1
   local.get $2
   call $~lib/rt/itcms/Object#set:prev
   local.get $2
   local.get $1
   call $~lib/rt/itcms/Object#set:next
  end
  global.get $~lib/rt/itcms/toSpace
  local.set $1
  local.get $0
  i32.load offset=12
  local.tee $2
  i32.const 2
  i32.le_u
  if (result i32)
   i32.const 1
  else
   local.get $2
   i32.const 10048
   i32.load
   i32.gt_u
   if
    i32.const 3136
    i32.const 3200
    i32.const 21
    i32.const 28
    call $~lib/builtins/abort
    unreachable
   end
   local.get $2
   i32.const 2
   i32.shl
   i32.const 10052
   i32.add
   i32.load
   i32.const 32
   i32.and
  end
  local.set $2
  local.get $0
  local.get $1
  global.get $~lib/rt/itcms/white
  i32.eqz
  i32.const 2
  local.get $2
  select
  call $~lib/rt/itcms/Object#linkTo
 )
 (func $~lib/rt/itcms/__visit (param $0 i32)
  local.get $0
  i32.eqz
  if
   return
  end
  local.get $0
  i32.const 20
  i32.sub
  local.tee $0
  call $~lib/rt/itcms/Object#get:color
  global.get $~lib/rt/itcms/white
  i32.eq
  if
   local.get $0
   call $~lib/rt/itcms/Object#makeGray
   global.get $~lib/rt/itcms/visitCount
   i32.const 1
   i32.add
   global.set $~lib/rt/itcms/visitCount
  end
 )
 (func $~lib/rt/itcms/Object#get:size (param $0 i32) (result i32)
  local.get $0
  i32.load
  i32.const -4
  i32.and
  i32.const 4
  i32.add
 )
 (func $~lib/rt/tlsf/Root#set:flMap (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  i32.store
 )
 (func $~lib/rt/tlsf/removeBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $1
  i32.load
  local.tee $3
  i32.const 1
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 3280
   i32.const 268
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $3
  i32.const -4
  i32.and
  local.tee $3
  i32.const 12
  i32.lt_u
  if
   i32.const 0
   i32.const 3280
   i32.const 270
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $3
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $3
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   i32.const 1073741820
   local.get $3
   local.get $3
   i32.const 1073741820
   i32.ge_u
   select
   local.tee $3
   i32.clz
   i32.sub
   local.tee $4
   i32.const 7
   i32.sub
   local.set $2
   local.get $3
   local.get $4
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $3
  i32.const 16
  i32.lt_u
  local.get $2
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 3280
   i32.const 284
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.load offset=8
  local.set $5
  local.get $1
  i32.load offset=4
  local.tee $4
  if
   local.get $4
   local.get $5
   call $~lib/rt/itcms/Object#set:prev
  end
  local.get $5
  if
   local.get $5
   local.get $4
   call $~lib/rt/itcms/Object#set:nextWithColor
  end
  local.get $1
  local.get $0
  local.get $2
  i32.const 4
  i32.shl
  local.get $3
  i32.add
  i32.const 2
  i32.shl
  i32.add
  local.tee $1
  i32.load offset=96
  i32.eq
  if
   local.get $1
   local.get $5
   i32.store offset=96
   local.get $5
   i32.eqz
   if
    local.get $0
    local.get $2
    i32.const 2
    i32.shl
    i32.add
    local.tee $1
    i32.load offset=4
    i32.const -2
    local.get $3
    i32.rotl
    i32.and
    local.set $3
    local.get $1
    local.get $3
    i32.store offset=4
    local.get $3
    i32.eqz
    if
     local.get $0
     local.get $0
     i32.load
     i32.const -2
     local.get $2
     i32.rotl
     i32.and
     call $~lib/rt/tlsf/Root#set:flMap
    end
   end
  end
 )
 (func $~lib/rt/tlsf/insertBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $1
  i32.eqz
  if
   i32.const 0
   i32.const 3280
   i32.const 201
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.load
  local.tee $3
  i32.const 1
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 3280
   i32.const 203
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 4
  i32.add
  local.get $1
  i32.load
  i32.const -4
  i32.and
  i32.add
  local.tee $4
  i32.load
  local.tee $2
  i32.const 1
  i32.and
  if
   local.get $0
   local.get $4
   call $~lib/rt/tlsf/removeBlock
   local.get $1
   local.get $3
   i32.const 4
   i32.add
   local.get $2
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   call $~lib/rt/tlsf/Root#set:flMap
   local.get $1
   i32.const 4
   i32.add
   local.get $1
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.tee $4
   i32.load
   local.set $2
  end
  local.get $3
  i32.const 2
  i32.and
  if
   local.get $1
   i32.const 4
   i32.sub
   i32.load
   local.tee $1
   i32.load
   local.tee $6
   i32.const 1
   i32.and
   i32.eqz
   if
    i32.const 0
    i32.const 3280
    i32.const 221
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/removeBlock
   local.get $1
   local.get $6
   i32.const 4
   i32.add
   local.get $3
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   call $~lib/rt/tlsf/Root#set:flMap
  end
  local.get $4
  local.get $2
  i32.const 2
  i32.or
  call $~lib/rt/tlsf/Root#set:flMap
  local.get $3
  i32.const -4
  i32.and
  local.tee $2
  i32.const 12
  i32.lt_u
  if
   i32.const 0
   i32.const 3280
   i32.const 233
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  local.get $1
  i32.const 4
  i32.add
  local.get $2
  i32.add
  i32.ne
  if
   i32.const 0
   i32.const 3280
   i32.const 234
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  i32.const 4
  i32.sub
  local.get $1
  i32.store
  local.get $2
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $2
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   i32.const 1073741820
   local.get $2
   local.get $2
   i32.const 1073741820
   i32.ge_u
   select
   local.tee $2
   i32.clz
   i32.sub
   local.tee $3
   i32.const 7
   i32.sub
   local.set $5
   local.get $2
   local.get $3
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $2
  i32.const 16
  i32.lt_u
  local.get $5
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 3280
   i32.const 251
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $5
  i32.const 4
  i32.shl
  local.get $2
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load offset=96
  local.set $3
  local.get $1
  i32.const 0
  call $~lib/rt/itcms/Object#set:nextWithColor
  local.get $1
  local.get $3
  call $~lib/rt/itcms/Object#set:prev
  local.get $3
  if
   local.get $3
   local.get $1
   call $~lib/rt/itcms/Object#set:nextWithColor
  end
  local.get $0
  local.get $5
  i32.const 4
  i32.shl
  local.get $2
  i32.add
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  i32.store offset=96
  local.get $0
  local.get $0
  i32.load
  i32.const 1
  local.get $5
  i32.shl
  i32.or
  call $~lib/rt/tlsf/Root#set:flMap
  local.get $0
  local.get $5
  i32.const 2
  i32.shl
  i32.add
  local.tee $0
  local.get $0
  i32.load offset=4
  i32.const 1
  local.get $2
  i32.shl
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/tlsf/addMemory (param $0 i32) (param $1 i32) (param $2 i64)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $2
  local.get $1
  i64.extend_i32_u
  i64.lt_u
  if
   i32.const 0
   i32.const 3280
   i32.const 382
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.set $1
  local.get $0
  i32.load offset=1568
  local.tee $3
  if
   local.get $3
   i32.const 4
   i32.add
   local.get $1
   i32.gt_u
   if
    i32.const 0
    i32.const 3280
    i32.const 389
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $3
   local.get $1
   i32.const 16
   i32.sub
   local.tee $5
   i32.eq
   if
    local.get $3
    i32.load
    local.set $4
    local.get $5
    local.set $1
   end
  else
   local.get $0
   i32.const 1572
   i32.add
   local.get $1
   i32.gt_u
   if
    i32.const 0
    i32.const 3280
    i32.const 402
    i32.const 5
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $2
  i32.wrap_i64
  i32.const -16
  i32.and
  local.get $1
  i32.sub
  local.tee $3
  i32.const 20
  i32.lt_u
  if
   return
  end
  local.get $1
  local.get $4
  i32.const 2
  i32.and
  local.get $3
  i32.const 8
  i32.sub
  local.tee $3
  i32.const 1
  i32.or
  i32.or
  call $~lib/rt/tlsf/Root#set:flMap
  local.get $1
  i32.const 0
  call $~lib/rt/itcms/Object#set:nextWithColor
  local.get $1
  i32.const 0
  call $~lib/rt/itcms/Object#set:prev
  local.get $1
  i32.const 4
  i32.add
  local.get $3
  i32.add
  local.tee $3
  i32.const 2
  call $~lib/rt/tlsf/Root#set:flMap
  local.get $0
  local.get $3
  i32.store offset=1568
  local.get $0
  local.get $1
  call $~lib/rt/tlsf/insertBlock
 )
 (func $~lib/rt/tlsf/initialize
  (local $0 i32)
  (local $1 i32)
  memory.size
  local.tee $1
  i32.const 0
  i32.le_s
  if (result i32)
   i32.const 1
   local.get $1
   i32.sub
   memory.grow
   i32.const 0
   i32.lt_s
  else
   i32.const 0
  end
  if
   unreachable
  end
  i32.const 42896
  i32.const 0
  call $~lib/rt/tlsf/Root#set:flMap
  i32.const 44464
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $0
   i32.const 23
   i32.lt_u
   if
    local.get $0
    i32.const 2
    i32.shl
    i32.const 42896
    i32.add
    i32.const 0
    i32.store offset=4
    i32.const 0
    local.set $1
    loop $for-loop|1
     local.get $1
     i32.const 16
     i32.lt_u
     if
      local.get $0
      i32.const 4
      i32.shl
      local.get $1
      i32.add
      i32.const 2
      i32.shl
      i32.const 42896
      i32.add
      i32.const 0
      i32.store offset=96
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $for-loop|1
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  i32.const 42896
  i32.const 44468
  memory.size
  i64.extend_i32_s
  i64.const 16
  i64.shl
  call $~lib/rt/tlsf/addMemory
  i32.const 42896
  global.set $~lib/rt/tlsf/ROOT
 )
 (func $~lib/rt/tlsf/__free (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  i32.const 42884
  i32.lt_u
  if
   return
  end
  global.get $~lib/rt/tlsf/ROOT
  i32.eqz
  if
   call $~lib/rt/tlsf/initialize
  end
  global.get $~lib/rt/tlsf/ROOT
  local.set $2
  local.get $0
  i32.const 4
  i32.sub
  local.set $1
  local.get $0
  i32.const 15
  i32.and
  i32.const 1
  local.get $0
  select
  if (result i32)
   i32.const 1
  else
   local.get $1
   i32.load
   i32.const 1
   i32.and
  end
  if
   i32.const 0
   i32.const 3280
   i32.const 562
   i32.const 3
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  local.get $1
  i32.load
  i32.const 1
  i32.or
  call $~lib/rt/tlsf/Root#set:flMap
  local.get $2
  local.get $1
  call $~lib/rt/tlsf/insertBlock
 )
 (func $~lib/rt/itcms/step (result i32)
  (local $0 i32)
  (local $1 i32)
  block $break|0
   block $case2|0
    block $case1|0
     block $case0|0
      global.get $~lib/rt/itcms/state
      br_table $case0|0 $case1|0 $case2|0 $break|0
     end
     i32.const 1
     global.set $~lib/rt/itcms/state
     i32.const 0
     global.set $~lib/rt/itcms/visitCount
     call $~lib/rt/itcms/visitRoots
     global.get $~lib/rt/itcms/toSpace
     global.set $~lib/rt/itcms/iter
     global.get $~lib/rt/itcms/visitCount
     return
    end
    global.get $~lib/rt/itcms/white
    i32.eqz
    local.set $1
    global.get $~lib/rt/itcms/iter
    call $~lib/rt/itcms/Object#get:next
    local.set $0
    loop $while-continue|1
     local.get $0
     global.get $~lib/rt/itcms/toSpace
     i32.ne
     if
      local.get $0
      global.set $~lib/rt/itcms/iter
      local.get $0
      call $~lib/rt/itcms/Object#get:color
      local.get $1
      i32.ne
      if
       local.get $0
       local.get $1
       call $~lib/rt/itcms/Object#set:color
       i32.const 0
       global.set $~lib/rt/itcms/visitCount
       local.get $0
       i32.const 20
       i32.add
       call $~lib/rt/__visit_members
       global.get $~lib/rt/itcms/visitCount
       return
      end
      local.get $0
      call $~lib/rt/itcms/Object#get:next
      local.set $0
      br $while-continue|1
     end
    end
    i32.const 0
    global.set $~lib/rt/itcms/visitCount
    call $~lib/rt/itcms/visitRoots
    global.get $~lib/rt/itcms/iter
    call $~lib/rt/itcms/Object#get:next
    global.get $~lib/rt/itcms/toSpace
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     local.set $0
     loop $while-continue|0
      local.get $0
      i32.const 42884
      i32.lt_u
      if
       local.get $0
       i32.load
       call $~lib/rt/itcms/__visit
       local.get $0
       i32.const 4
       i32.add
       local.set $0
       br $while-continue|0
      end
     end
     global.get $~lib/rt/itcms/iter
     call $~lib/rt/itcms/Object#get:next
     local.set $0
     loop $while-continue|2
      local.get $0
      global.get $~lib/rt/itcms/toSpace
      i32.ne
      if
       local.get $0
       call $~lib/rt/itcms/Object#get:color
       local.get $1
       i32.ne
       if
        local.get $0
        local.get $1
        call $~lib/rt/itcms/Object#set:color
        local.get $0
        i32.const 20
        i32.add
        call $~lib/rt/__visit_members
       end
       local.get $0
       call $~lib/rt/itcms/Object#get:next
       local.set $0
       br $while-continue|2
      end
     end
     global.get $~lib/rt/itcms/fromSpace
     local.set $0
     global.get $~lib/rt/itcms/toSpace
     global.set $~lib/rt/itcms/fromSpace
     local.get $0
     global.set $~lib/rt/itcms/toSpace
     local.get $1
     global.set $~lib/rt/itcms/white
     local.get $0
     call $~lib/rt/itcms/Object#get:next
     global.set $~lib/rt/itcms/iter
     i32.const 2
     global.set $~lib/rt/itcms/state
    end
    global.get $~lib/rt/itcms/visitCount
    return
   end
   global.get $~lib/rt/itcms/iter
   local.tee $0
   global.get $~lib/rt/itcms/toSpace
   i32.ne
   if
    local.get $0
    call $~lib/rt/itcms/Object#get:next
    global.set $~lib/rt/itcms/iter
    local.get $0
    call $~lib/rt/itcms/Object#get:color
    global.get $~lib/rt/itcms/white
    i32.eqz
    i32.ne
    if
     i32.const 0
     i32.const 3008
     i32.const 229
     i32.const 20
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 42884
    i32.lt_u
    if
     local.get $0
     i32.const 0
     call $~lib/rt/itcms/Object#set:nextWithColor
     local.get $0
     i32.const 0
     call $~lib/rt/itcms/Object#set:prev
    else
     global.get $~lib/rt/itcms/total
     local.get $0
     call $~lib/rt/itcms/Object#get:size
     i32.sub
     global.set $~lib/rt/itcms/total
     local.get $0
     i32.const 4
     i32.add
     call $~lib/rt/tlsf/__free
    end
    i32.const 10
    return
   end
   global.get $~lib/rt/itcms/toSpace
   global.get $~lib/rt/itcms/toSpace
   call $~lib/rt/itcms/Object#set:nextWithColor
   global.get $~lib/rt/itcms/toSpace
   global.get $~lib/rt/itcms/toSpace
   call $~lib/rt/itcms/Object#set:prev
   i32.const 0
   global.set $~lib/rt/itcms/state
  end
  i32.const 0
 )
 (func $~lib/rt/tlsf/roundSize (param $0 i32) (result i32)
  local.get $0
  i32.const 1
  i32.const 27
  local.get $0
  i32.clz
  i32.sub
  i32.shl
  i32.add
  i32.const 1
  i32.sub
  local.get $0
  local.get $0
  i32.const 536870910
  i32.lt_u
  select
 )
 (func $~lib/rt/tlsf/searchBlock (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $1
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $1
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   local.get $1
   call $~lib/rt/tlsf/roundSize
   local.tee $1
   i32.clz
   i32.sub
   local.tee $3
   i32.const 7
   i32.sub
   local.set $2
   local.get $1
   local.get $3
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $1
  i32.const 16
  i32.lt_u
  local.get $2
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 3280
   i32.const 334
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $2
  i32.const 2
  i32.shl
  i32.add
  i32.load offset=4
  i32.const -1
  local.get $1
  i32.shl
  i32.and
  local.tee $1
  if (result i32)
   local.get $0
   local.get $1
   i32.ctz
   local.get $2
   i32.const 4
   i32.shl
   i32.add
   i32.const 2
   i32.shl
   i32.add
   i32.load offset=96
  else
   local.get $0
   i32.load
   i32.const -1
   local.get $2
   i32.const 1
   i32.add
   i32.shl
   i32.and
   local.tee $1
   if (result i32)
    local.get $0
    local.get $1
    i32.ctz
    local.tee $1
    i32.const 2
    i32.shl
    i32.add
    i32.load offset=4
    local.tee $2
    i32.eqz
    if
     i32.const 0
     i32.const 3280
     i32.const 347
     i32.const 18
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    local.get $2
    i32.ctz
    local.get $1
    i32.const 4
    i32.shl
    i32.add
    i32.const 2
    i32.shl
    i32.add
    i32.load offset=96
   else
    i32.const 0
   end
  end
 )
 (func $~lib/rt/tlsf/allocateBlock (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $1
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 2944
   i32.const 3280
   i32.const 461
   i32.const 29
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.const 12
  local.get $1
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.get $1
  i32.const 12
  i32.le_u
  select
  local.tee $1
  call $~lib/rt/tlsf/searchBlock
  local.tee $2
  i32.eqz
  if
   local.get $1
   i32.const 256
   i32.ge_u
   if (result i32)
    local.get $1
    call $~lib/rt/tlsf/roundSize
   else
    local.get $1
   end
   local.set $2
   memory.size
   local.tee $3
   local.get $2
   i32.const 4
   local.get $0
   i32.load offset=1568
   local.get $3
   i32.const 16
   i32.shl
   i32.const 4
   i32.sub
   i32.ne
   i32.shl
   i32.add
   i32.const 65535
   i32.add
   i32.const -65536
   i32.and
   i32.const 16
   i32.shr_u
   local.tee $2
   local.get $2
   local.get $3
   i32.lt_s
   select
   memory.grow
   i32.const 0
   i32.lt_s
   if
    local.get $2
    memory.grow
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
   local.get $0
   local.get $3
   i32.const 16
   i32.shl
   memory.size
   i64.extend_i32_s
   i64.const 16
   i64.shl
   call $~lib/rt/tlsf/addMemory
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/searchBlock
   local.tee $2
   i32.eqz
   if
    i32.const 0
    i32.const 3280
    i32.const 499
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $1
  local.get $2
  i32.load
  i32.const -4
  i32.and
  i32.gt_u
  if
   i32.const 0
   i32.const 3280
   i32.const 501
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $2
  call $~lib/rt/tlsf/removeBlock
  local.get $2
  i32.load
  local.set $4
  local.get $1
  i32.const 4
  i32.add
  i32.const 15
  i32.and
  if
   i32.const 0
   i32.const 3280
   i32.const 361
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  i32.const -4
  i32.and
  local.get $1
  i32.sub
  local.tee $3
  i32.const 16
  i32.ge_u
  if
   local.get $2
   local.get $1
   local.get $4
   i32.const 2
   i32.and
   i32.or
   call $~lib/rt/tlsf/Root#set:flMap
   local.get $2
   i32.const 4
   i32.add
   local.get $1
   i32.add
   local.tee $1
   local.get $3
   i32.const 4
   i32.sub
   i32.const 1
   i32.or
   call $~lib/rt/tlsf/Root#set:flMap
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/insertBlock
  else
   local.get $2
   local.get $4
   i32.const -2
   i32.and
   call $~lib/rt/tlsf/Root#set:flMap
   local.get $2
   i32.const 4
   i32.add
   local.get $2
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.tee $0
   local.get $0
   i32.load
   i32.const -3
   i32.and
   call $~lib/rt/tlsf/Root#set:flMap
  end
  local.get $2
 )
 (func $~lib/rt/tlsf/__alloc (param $0 i32) (result i32)
  global.get $~lib/rt/tlsf/ROOT
  i32.eqz
  if
   call $~lib/rt/tlsf/initialize
  end
  global.get $~lib/rt/tlsf/ROOT
  local.get $0
  call $~lib/rt/tlsf/allocateBlock
  i32.const 4
  i32.add
 )
 (func $~lib/rt/itcms/Object#set:rtId (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  i32.store offset=12
 )
 (func $~lib/rt/itcms/Object#set:rtSize (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  i32.store offset=16
 )
 (func $~lib/rt/itcms/__new (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  local.get $0
  i32.const 1073741804
  i32.ge_u
  if
   i32.const 2944
   i32.const 3008
   i32.const 261
   i32.const 31
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/itcms/total
  global.get $~lib/rt/itcms/threshold
  i32.ge_u
  if
   block $__inlined_func$~lib/rt/itcms/interrupt$37
    i32.const 2048
    local.set $2
    loop $do-loop|0
     local.get $2
     call $~lib/rt/itcms/step
     i32.sub
     local.set $2
     global.get $~lib/rt/itcms/state
     i32.eqz
     if
      global.get $~lib/rt/itcms/total
      i64.extend_i32_u
      i64.const 200
      i64.mul
      i64.const 100
      i64.div_u
      i32.wrap_i64
      i32.const 1024
      i32.add
      global.set $~lib/rt/itcms/threshold
      br $__inlined_func$~lib/rt/itcms/interrupt$37
     end
     local.get $2
     i32.const 0
     i32.gt_s
     br_if $do-loop|0
    end
    global.get $~lib/rt/itcms/total
    global.get $~lib/rt/itcms/total
    global.get $~lib/rt/itcms/threshold
    i32.sub
    i32.const 1024
    i32.lt_u
    i32.const 10
    i32.shl
    i32.add
    global.set $~lib/rt/itcms/threshold
   end
  end
  local.get $0
  i32.const 16
  i32.add
  call $~lib/rt/tlsf/__alloc
  i32.const 4
  i32.sub
  local.tee $2
  local.get $1
  call $~lib/rt/itcms/Object#set:rtId
  local.get $2
  local.get $0
  call $~lib/rt/itcms/Object#set:rtSize
  local.get $2
  global.get $~lib/rt/itcms/fromSpace
  global.get $~lib/rt/itcms/white
  call $~lib/rt/itcms/Object#linkTo
  global.get $~lib/rt/itcms/total
  local.get $2
  call $~lib/rt/itcms/Object#get:size
  i32.add
  global.set $~lib/rt/itcms/total
  local.get $2
  i32.const 20
  i32.add
  local.tee $1
  i32.const 0
  local.get $0
  memory.fill
  local.get $1
 )
 (func $~lib/staticarray/StaticArray<u32>#get:length (param $0 i32) (result i32)
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 2
  i32.shr_u
 )
 (func $assembly/mp/MpZ#set:_neg (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  i32.store8 offset=4
 )
 (func $~lib/rt/itcms/__link (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  local.get $1
  i32.eqz
  if
   return
  end
  local.get $0
  i32.eqz
  if
   i32.const 0
   i32.const 3008
   i32.const 295
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 20
  i32.sub
  local.tee $1
  call $~lib/rt/itcms/Object#get:color
  global.get $~lib/rt/itcms/white
  i32.eq
  if
   local.get $0
   i32.const 20
   i32.sub
   local.tee $0
   call $~lib/rt/itcms/Object#get:color
   local.tee $3
   global.get $~lib/rt/itcms/white
   i32.eqz
   i32.eq
   if
    local.get $0
    local.get $1
    local.get $2
    select
    call $~lib/rt/itcms/Object#makeGray
   else
    global.get $~lib/rt/itcms/state
    i32.const 1
    i32.eq
    local.get $3
    i32.const 3
    i32.eq
    i32.and
    if
     local.get $1
     call $~lib/rt/itcms/Object#makeGray
    end
   end
  end
 )
 (func $assembly/mp/MpZ#set:_data (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  i32.store
  local.get $0
  local.get $1
  i32.const 0
  call $~lib/rt/itcms/__link
 )
 (func $~lib/rt/__newBuffer (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  local.get $1
  call $~lib/rt/itcms/__new
  local.set $1
  local.get $2
  if
   local.get $1
   local.get $2
   local.get $0
   memory.copy
  end
  local.get $1
 )
 (func $assembly/mp/MpZ.from<i32> (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  block $__inlined_func$assembly/mp/fromI32$39 (result i32)
   local.get $0
   i32.const 0
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.const 5
    i32.const 0
    call $~lib/rt/__newBuffer
    local.tee $1
    i32.store offset=4
    local.get $1
    i32.const 0
    local.get $0
    i32.sub
    call $~lib/rt/tlsf/Root#set:flMap
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store
    local.get $1
    i32.const 1
    call $assembly/mp/MpZ#constructor
    br $__inlined_func$assembly/mp/fromI32$39
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.const 5
   i32.const 0
   call $~lib/rt/__newBuffer
   local.tee $1
   i32.store offset=8
   local.get $1
   local.get $0
   call $~lib/rt/tlsf/Root#set:flMap
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   local.get $1
   i32.const 0
   call $assembly/mp/MpZ#constructor
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/number/U32#toString (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  call $~lib/util/number/utoa32
 )
 (func $assembly/mp/MpZ.from<u32> (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.const 5
  i32.const 0
  call $~lib/rt/__newBuffer
  local.tee $1
  i32.store offset=4
  local.get $1
  local.get $0
  call $~lib/rt/tlsf/Root#set:flMap
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  i32.const 0
  call $assembly/mp/MpZ#constructor
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/staticarray/StaticArray<u32>#__uget (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  i32.load
 )
 (func $~lib/rt/itcms/__renew (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $1
  local.get $0
  i32.const 20
  i32.sub
  local.tee $3
  i32.load
  i32.const -4
  i32.and
  i32.const 16
  i32.sub
  i32.le_u
  if
   local.get $3
   local.get $1
   call $~lib/rt/itcms/Object#set:rtSize
   local.get $0
   return
  end
  local.get $1
  local.get $3
  i32.load offset=12
  call $~lib/rt/itcms/__new
  local.tee $2
  local.get $0
  local.get $1
  local.get $3
  i32.load offset=16
  local.tee $0
  local.get $0
  local.get $1
  i32.gt_u
  select
  memory.copy
  local.get $2
 )
 (func $~lib/__astral__/blackbox<assembly/mp/MpZ> (param $0 i32) (result i32)
  i32.const 1024
  local.get $0
  i32.store
  i32.const 1024
  i32.load
 )
 (func $~lib/staticarray/StaticArray<u64>#get:length (param $0 i32) (result i32)
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 3
  i32.shr_u
 )
 (func $~lib/util/sort/insertionSort<f64> (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
  (local $5 i32)
  (local $6 f64)
  (local $7 f64)
  (local $8 i32)
  local.get $1
  local.get $3
  i32.add
  local.set $3
  loop $for-loop|0
   local.get $2
   local.get $3
   i32.ge_s
   if
    local.get $3
    i32.const 1
    i32.sub
    local.set $5
    local.get $0
    local.get $3
    i32.const 3
    i32.shl
    i32.add
    f64.load
    local.set $6
    loop $while-continue|1
     local.get $1
     local.get $5
     i32.le_s
     if
      block $while-break|1
       local.get $0
       local.get $5
       i32.const 3
       i32.shl
       i32.add
       local.tee $8
       f64.load
       local.set $7
       i32.const 2
       global.set $~argumentsLength
       local.get $6
       local.get $7
       local.get $4
       i32.load
       call_indirect (type $5)
       i32.const 0
       i32.ge_s
       br_if $while-break|1
       local.get $8
       local.get $7
       f64.store offset=8
       local.get $5
       i32.const 1
       i32.sub
       local.set $5
       br $while-continue|1
      end
     end
    end
    local.get $0
    local.get $5
    i32.const 3
    i32.shl
    i32.add
    local.get $6
    f64.store offset=8
    local.get $3
    i32.const 1
    i32.add
    local.set $3
    br $for-loop|0
   end
  end
 )
 (func $~lib/util/sort/extendRunRight<f64> (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 f64)
  (local $6 i32)
  (local $7 f64)
  local.get $1
  local.get $2
  i32.eq
  if
   local.get $1
   return
  end
  local.get $0
  local.get $1
  i32.const 3
  i32.shl
  i32.add
  f64.load
  local.set $5
  local.get $0
  local.get $1
  i32.const 1
  i32.add
  local.tee $4
  i32.const 3
  i32.shl
  i32.add
  f64.load
  local.set $7
  i32.const 2
  global.set $~argumentsLength
  local.get $5
  local.get $7
  local.get $3
  i32.load
  call_indirect (type $5)
  i32.const 0
  i32.gt_s
  if
   loop $while-continue|0
    local.get $2
    local.get $4
    i32.gt_s
    if (result i32)
     local.get $0
     local.get $4
     i32.const 3
     i32.shl
     i32.add
     local.tee $6
     f64.load offset=8
     local.set $5
     local.get $6
     f64.load
     local.set $7
     i32.const 2
     global.set $~argumentsLength
     local.get $5
     local.get $7
     local.get $3
     i32.load
     call_indirect (type $5)
     i32.const 31
     i32.shr_u
    else
     i32.const 0
    end
    if
     local.get $4
     i32.const 1
     i32.add
     local.set $4
     br $while-continue|0
    end
   end
   local.get $4
   local.set $2
   loop $while-continue|1
    local.get $1
    local.get $2
    i32.lt_s
    if
     local.get $0
     local.get $1
     i32.const 3
     i32.shl
     i32.add
     local.tee $3
     f64.load
     local.set $5
     local.get $3
     local.get $0
     local.get $2
     i32.const 3
     i32.shl
     i32.add
     local.tee $3
     f64.load
     f64.store
     local.get $1
     i32.const 1
     i32.add
     local.set $1
     local.get $3
     local.get $5
     f64.store
     local.get $2
     i32.const 1
     i32.sub
     local.set $2
     br $while-continue|1
    end
   end
  else
   loop $while-continue|2
    local.get $2
    local.get $4
    i32.gt_s
    if (result i32)
     local.get $0
     local.get $4
     i32.const 3
     i32.shl
     i32.add
     local.tee $1
     f64.load offset=8
     local.set $5
     local.get $1
     f64.load
     local.set $7
     i32.const 2
     global.set $~argumentsLength
     local.get $5
     local.get $7
     local.get $3
     i32.load
     call_indirect (type $5)
     i32.const 0
     i32.ge_s
    else
     i32.const 0
    end
    if
     local.get $4
     i32.const 1
     i32.add
     local.set $4
     br $while-continue|2
    end
   end
  end
  local.get $4
 )
 (func $~lib/util/sort/mergeRuns<f64> (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32)
  (local $6 i32)
  (local $7 f64)
  (local $8 f64)
  (local $9 i32)
  (local $10 i32)
  local.get $2
  i32.const 1
  i32.sub
  local.tee $6
  local.get $3
  i32.add
  local.set $9
  local.get $6
  i32.const 1
  i32.add
  local.set $2
  loop $for-loop|0
   local.get $1
   local.get $2
   i32.lt_s
   if
    local.get $2
    i32.const 1
    i32.sub
    local.tee $2
    i32.const 3
    i32.shl
    local.tee $10
    local.get $4
    i32.add
    local.get $0
    local.get $10
    i32.add
    f64.load
    f64.store
    br $for-loop|0
   end
  end
  loop $for-loop|1
   local.get $3
   local.get $6
   i32.gt_s
   if
    local.get $4
    local.get $9
    local.get $6
    i32.sub
    i32.const 3
    i32.shl
    i32.add
    local.get $0
    local.get $6
    i32.const 3
    i32.shl
    i32.add
    f64.load offset=8
    f64.store
    local.get $6
    i32.const 1
    i32.add
    local.set $6
    br $for-loop|1
   end
  end
  loop $for-loop|2
   local.get $1
   local.get $3
   i32.le_s
   if
    local.get $4
    local.get $6
    i32.const 3
    i32.shl
    i32.add
    f64.load
    local.set $7
    local.get $4
    local.get $2
    i32.const 3
    i32.shl
    i32.add
    f64.load
    local.set $8
    i32.const 2
    global.set $~argumentsLength
    local.get $7
    local.get $8
    local.get $5
    i32.load
    call_indirect (type $5)
    i32.const 0
    i32.lt_s
    if
     local.get $0
     local.get $1
     i32.const 3
     i32.shl
     i32.add
     local.get $7
     f64.store
     local.get $6
     i32.const 1
     i32.sub
     local.set $6
    else
     local.get $0
     local.get $1
     i32.const 3
     i32.shl
     i32.add
     local.get $8
     f64.store
     local.get $2
     i32.const 1
     i32.add
     local.set $2
    end
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|2
   end
  end
 )
 (func $~lib/util/sort/COMPARATOR<f64>~anonymous|0 (param $0 f64) (param $1 f64) (result i32)
  (local $2 i64)
  (local $3 i64)
  local.get $0
  i64.reinterpret_f64
  local.tee $2
  i64.const 63
  i64.shr_s
  i64.const 1
  i64.shr_u
  local.get $2
  i64.xor
  local.tee $2
  local.get $1
  i64.reinterpret_f64
  local.tee $3
  i64.const 63
  i64.shr_s
  i64.const 1
  i64.shr_u
  local.get $3
  i64.xor
  local.tee $3
  i64.gt_s
  local.get $2
  local.get $3
  i64.lt_s
  i32.sub
 )
 (func $~lib/__astral__/Stats.mean~anonymous|0 (param $0 f64) (param $1 f64) (param $2 i32) (param $3 i32) (result f64)
  local.get $0
  local.get $1
  f64.add
 )
 (func $~lib/math/murmurHash3 (param $0 i64) (result i64)
  local.get $0
  local.get $0
  i64.const 33
  i64.shr_u
  i64.xor
  i64.const -49064778989728563
  i64.mul
  local.tee $0
  i64.const 33
  i64.shr_u
  local.get $0
  i64.xor
  i64.const -4265267296055464877
  i64.mul
  local.tee $0
  i64.const 33
  i64.shr_u
  local.get $0
  i64.xor
 )
 (func $~lib/math/splitMix32 (param $0 i32) (result i32)
  local.get $0
  i32.const 1831565813
  i32.add
  local.tee $0
  i32.const 1
  i32.or
  local.get $0
  local.get $0
  i32.const 15
  i32.shr_u
  i32.xor
  i32.mul
  local.tee $0
  i32.const 61
  i32.or
  local.get $0
  local.get $0
  i32.const 7
  i32.shr_u
  i32.xor
  i32.mul
  local.get $0
  i32.add
  local.get $0
  i32.xor
  local.tee $0
  i32.const 14
  i32.shr_u
  local.get $0
  i32.xor
 )
 (func $~lib/math/NativeMath.random (result f64)
  (local $0 i64)
  (local $1 i64)
  global.get $~lib/math/random_seeded
  i32.eqz
  if
   call $~lib/builtins/seed
   i64.reinterpret_f64
   local.tee $0
   i64.eqz
   if
    i64.const -7046029254386353131
    local.set $0
   end
   local.get $0
   call $~lib/math/murmurHash3
   global.set $~lib/math/random_state0_64
   global.get $~lib/math/random_state0_64
   i64.const -1
   i64.xor
   call $~lib/math/murmurHash3
   global.set $~lib/math/random_state1_64
   local.get $0
   i32.wrap_i64
   call $~lib/math/splitMix32
   global.set $~lib/math/random_state0_32
   global.get $~lib/math/random_state0_32
   call $~lib/math/splitMix32
   drop
   i32.const 1
   global.set $~lib/math/random_seeded
  end
  global.get $~lib/math/random_state0_64
  local.set $1
  global.get $~lib/math/random_state1_64
  local.tee $0
  global.set $~lib/math/random_state0_64
  local.get $1
  local.get $1
  i64.const 23
  i64.shl
  i64.xor
  local.tee $1
  local.get $1
  i64.const 17
  i64.shr_u
  i64.xor
  local.get $0
  i64.xor
  local.get $0
  i64.const 26
  i64.shr_u
  i64.xor
  global.set $~lib/math/random_state1_64
  local.get $0
  i64.const 12
  i64.shr_u
  i64.const 4607182418800017408
  i64.or
  f64.reinterpret_i64
  f64.const -1
  f64.add
 )
 (func $~lib/staticarray/StaticArray<f64>#__uget (param $0 i32) (param $1 i32) (result f64)
  local.get $0
  local.get $1
  i32.const 3
  i32.shl
  i32.add
  f64.load
 )
 (func $~lib/util/casemap/casemap (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $0
  local.tee $1
  i32.const 8
  i32.shr_u
  local.tee $2
  i32.const 8980
  i32.add
  i32.load8_u
  local.get $2
  i32.const 5340
  i32.add
  i32.load8_u
  i32.const 86
  i32.mul
  i32.const 5340
  i32.add
  local.get $0
  i32.const 255
  i32.and
  local.tee $3
  i32.const 3
  i32.div_u
  i32.add
  i32.load8_u
  local.get $3
  i32.const 3
  i32.rem_u
  i32.const 2
  i32.shl
  i32.const 8008
  i32.add
  i32.load
  i32.mul
  i32.const 11
  i32.shr_u
  i32.const 6
  i32.rem_u
  i32.add
  i32.const 2
  i32.shl
  i32.const 8020
  i32.add
  i32.load
  local.tee $2
  i32.const 255
  i32.and
  local.set $0
  local.get $2
  i32.const 8
  i32.shr_s
  local.set $2
  block $folding-inner0
   local.get $0
   i32.const 2
   i32.lt_u
   br_if $folding-inner0
   local.get $2
   i32.const 255
   i32.and
   local.set $0
   local.get $2
   i32.const 8
   i32.shr_u
   local.set $2
   loop $while-continue|0
    local.get $0
    if
     local.get $2
     local.get $0
     i32.const 1
     i32.shr_u
     local.tee $6
     i32.add
     i32.const 1
     i32.shl
     i32.const 9492
     i32.add
     local.tee $4
     i32.load8_u
     local.tee $5
     local.get $3
     i32.eq
     if (result i32)
      local.get $4
      i32.load8_u offset=1
      i32.const 2
      i32.shl
      i32.const 8020
      i32.add
      i32.load
      local.tee $2
      i32.const 255
      i32.and
      local.set $0
      local.get $2
      i32.const 8
      i32.shr_s
      local.set $2
      local.get $0
      i32.const 2
      i32.lt_u
      br_if $folding-inner0
      local.get $1
      i32.const 1
      i32.sub
      return
     else
      local.get $3
      local.get $5
      i32.lt_u
      if (result i32)
       local.get $6
      else
       local.get $2
       local.get $6
       i32.add
       local.set $2
       local.get $0
       local.get $6
       i32.sub
      end
     end
     local.set $0
     br $while-continue|0
    end
   end
   local.get $1
   return
  end
  local.get $1
  local.get $2
  i32.const 0
  local.get $0
  i32.const 1
  i32.xor
  i32.sub
  i32.and
  i32.add
 )
 (func $~lib/array/Array<u32>~visit (param $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load
  call $~lib/rt/itcms/__visit
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/rt/__visit_members (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  block $folding-inner1
   block $folding-inner0
    block $invalid
     block $~lib/staticarray/StaticArray<u16>
      block $~lib/staticarray/StaticArray<f64>
       block $~lib/staticarray/StaticArray<u64>
        block $~lib/array/Array<~lib/string/String>
         block $~lib/array/Array<i32>
          block $~lib/array/Array<u32>
           block $~lib/staticarray/StaticArray<u32>
            block $~lib/string/String
             block $~lib/arraybuffer/ArrayBuffer
              block $~lib/object/Object
               local.get $0
               i32.const 8
               i32.sub
               i32.load
               br_table $~lib/object/Object $~lib/arraybuffer/ArrayBuffer $~lib/string/String $folding-inner0 $folding-inner0 $~lib/staticarray/StaticArray<u32> $~lib/array/Array<u32> $~lib/array/Array<i32> $~lib/array/Array<~lib/string/String> $folding-inner0 $folding-inner1 $~lib/staticarray/StaticArray<u64> $~lib/staticarray/StaticArray<f64> $folding-inner1 $folding-inner1 $~lib/staticarray/StaticArray<u16> $invalid
              end
              return
             end
             return
            end
            return
           end
           return
          end
          local.get $0
          call $~lib/array/Array<u32>~visit
          return
         end
         local.get $0
         call $~lib/array/Array<u32>~visit
         return
        end
        global.get $~lib/memory/__stack_pointer
        i32.const 4
        i32.sub
        global.set $~lib/memory/__stack_pointer
        call $~stack_check
        global.get $~lib/memory/__stack_pointer
        i32.const 0
        i32.store
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store
        local.get $0
        i32.load offset=4
        local.set $1
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store
        local.get $1
        local.get $0
        i32.load offset=12
        i32.const 2
        i32.shl
        i32.add
        local.set $2
        loop $while-continue|0
         local.get $1
         local.get $2
         i32.lt_u
         if
          local.get $1
          i32.load
          local.tee $3
          if
           local.get $3
           call $~lib/rt/itcms/__visit
          end
          local.get $1
          i32.const 4
          i32.add
          local.set $1
          br $while-continue|0
         end
        end
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store
        local.get $0
        i32.load
        call $~lib/rt/itcms/__visit
        global.get $~lib/memory/__stack_pointer
        i32.const 4
        i32.add
        global.set $~lib/memory/__stack_pointer
        return
       end
       return
      end
      return
     end
     return
    end
    unreachable
   end
   local.get $0
   i32.load
   local.tee $0
   if
    local.get $0
    call $~lib/rt/itcms/__visit
   end
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=4
  call $~lib/rt/itcms/__visit
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~start
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~started
  if
   return
  end
  i32.const 1
  global.set $~started
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  i32.const 10
  local.set $0
  i32.const 9
  local.set $2
  i32.const 1
  local.set $1
  loop $while-continue|0
   local.get $2
   if
    local.get $0
    local.get $1
    i32.mul
    local.get $1
    local.get $2
    i32.const 1
    i32.and
    select
    local.set $1
    local.get $2
    i32.const 1
    i32.shr_u
    local.set $2
    local.get $0
    local.get $0
    i32.mul
    local.set $0
    br $while-continue|0
   end
  end
  local.get $1
  global.set $assembly/mp/TO_DECIMAL_N
  memory.size
  i32.const 16
  i32.shl
  i32.const 42884
  i32.sub
  i32.const 1
  i32.shr_u
  global.set $~lib/rt/itcms/threshold
  i32.const 3056
  call $~lib/rt/itcms/initLazy
  global.set $~lib/rt/itcms/pinSpace
  i32.const 3088
  call $~lib/rt/itcms/initLazy
  global.set $~lib/rt/itcms/toSpace
  i32.const 3232
  call $~lib/rt/itcms/initLazy
  global.set $~lib/rt/itcms/fromSpace
  global.get $~lib/memory/__stack_pointer
  i32.const 2784
  i32.store
  i32.const 0
  local.set $1
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 2784
  i32.store
  i32.const 2784
  call $~lib/string/String#get:length
  local.tee $0
  i64.extend_i32_s
  i64.const 9
  i64.mul
  i64.const 268435456
  i64.gt_u
  if
   i32.const 2816
   i32.const 2864
   i32.const 334
   i32.const 7
   call $~lib/builtins/abort
   unreachable
  end
  block $folding-inner0
   local.get $0
   i32.eqz
   if
    i32.const 2912
    local.set $2
    br $folding-inner0
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.const 18
   i32.mul
   i32.const 2
   call $~lib/rt/itcms/__new
   local.tee $2
   i32.store offset=4
   local.get $0
   i32.const 1
   i32.shl
   local.tee $0
   i32.const 9
   i32.mul
   local.set $3
   loop $while-continue|00
    local.get $1
    local.get $3
    i32.lt_u
    if
     local.get $1
     local.get $2
     i32.add
     i32.const 2784
     local.get $0
     memory.copy
     local.get $0
     local.get $1
     i32.add
     local.set $1
     br $while-continue|00
    end
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
  global.set $assembly/mp/TO_DECIMAL_P
  i32.const 2
  call $assembly/mp/MpZ.from<i32>
  global.set $assembly/mp/MpZ.A
  i32.const 1
  call $assembly/mp/MpZ.from<i32>
  global.set $assembly/mp/MpZ.B
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 4
  i32.const 5
  i32.const 3632
  call $~lib/rt/__newBuffer
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.const 0
  call $assembly/mp/MpZ#constructor
  global.set $assembly/mp/MpZ.ZERO
  global.get $~lib/memory/__stack_pointer
  i32.const 3408
  i32.store offset=4
  block $__inlined_func$assembly/mp/MpZ.from<~lib/string/String>$5 (result i32)
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   call $~stack_check
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 3568
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 3568
   i32.store offset=4
   i32.const 3568
   i32.const 3568
   call $~lib/string/String.__eq
   if
    global.get $~lib/memory/__stack_pointer
    i32.const 3408
    i32.store
    call $assembly/mp/fromString
    local.set $0
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $0
    br $__inlined_func$assembly/mp/MpZ.from<~lib/string/String>$5
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4112
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 4192
   i32.store offset=4
   i32.const 4112
   i32.const 4192
   call $~lib/string/String.__concat
   i32.const 4016
   i32.const 691
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/__astral__/blackbox<assembly/mp/MpZ>
  global.set $assembly/__benches__/to-string/input
  global.get $~lib/memory/__stack_pointer
  i32.const 4384
  i32.store
  i32.const 0
  i32.const 4384
  call $~lib/__astral__/bench
  global.get $~lib/memory/__stack_pointer
  i32.const 10032
  i32.store
  i32.const 1
  i32.const 10032
  call $~lib/__astral__/bench
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 10116
  i32.lt_s
  if
   i32.const 42912
   i32.const 42960
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
 )
 (func $assembly/mp/MpZ#constructor (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 5
  i32.const 4
  call $~lib/rt/itcms/__new
  local.tee $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $2
  local.get $0
  call $assembly/mp/MpZ#set:_data
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $2
  local.get $1
  call $assembly/mp/MpZ#set:_neg
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $0
  call $~lib/staticarray/StaticArray<u32>#get:length
  i32.const 1
  i32.eq
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   call $~stack_check
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   call $~lib/staticarray/StaticArray<u32>#get:length
   i32.eqz
   if
    i32.const 3136
    i32.const 3344
    i32.const 78
    i32.const 41
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   i32.load
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   i32.eqz
  else
   i32.const 0
  end
  if
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=4
   local.get $2
   i32.const 0
   call $assembly/mp/MpZ#set:_neg
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $~lib/string/String.__eq (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  block $folding-inner0
   local.get $0
   local.get $1
   i32.eq
   if
    i32.const 1
    local.set $2
    br $folding-inner0
   end
   local.get $1
   i32.eqz
   local.get $0
   i32.eqz
   i32.or
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   call $~lib/string/String#get:length
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   local.get $1
   call $~lib/string/String#get:length
   local.get $2
   i32.ne
   if
    i32.const 0
    local.set $2
    br $folding-inner0
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   block $__inlined_func$~lib/util/string/compareImpl$57
    loop $while-continue|0
     local.get $2
     local.tee $3
     i32.const 1
     i32.sub
     local.set $2
     local.get $3
     if
      local.get $0
      i32.load16_u
      local.tee $5
      local.get $1
      i32.load16_u
      local.tee $3
      i32.sub
      local.set $4
      local.get $3
      local.get $5
      i32.ne
      br_if $__inlined_func$~lib/util/string/compareImpl$57
      local.get $0
      i32.const 2
      i32.add
      local.set $0
      local.get $1
      i32.const 2
      i32.add
      local.set $1
      br $while-continue|0
     end
    end
    i32.const 0
    local.set $4
   end
   local.get $4
   i32.eqz
   local.set $2
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $~lib/string/String#substr (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  block $folding-inner0
   local.get $2
   i32.const 0
   local.get $2
   i32.const 0
   i32.gt_s
   select
   local.tee $2
   local.get $0
   call $~lib/string/String#get:length
   local.tee $3
   local.get $1
   i32.const 0
   i32.lt_s
   if
    local.get $1
    local.get $3
    i32.add
    local.tee $1
    i32.const 0
    local.get $1
    i32.const 0
    i32.gt_s
    select
    local.set $1
   end
   local.get $1
   i32.sub
   local.tee $3
   local.get $2
   local.get $3
   i32.lt_s
   select
   i32.const 1
   i32.shl
   local.tee $3
   i32.const 0
   i32.le_s
   if
    i32.const 2912
    local.set $2
    br $folding-inner0
   end
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.const 2
   call $~lib/rt/itcms/__new
   local.tee $2
   i32.store offset=4
   local.get $2
   local.get $0
   local.get $1
   i32.const 1
   i32.shl
   i32.add
   local.get $3
   memory.copy
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $~lib/string/String#substr@varargs (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $1of1
   block $0of1
    block $outOfRange
     global.get $~argumentsLength
     i32.const 1
     i32.sub
     br_table $0of1 $1of1 $outOfRange
    end
    unreachable
   end
   i32.const 2147483647
   local.set $2
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  local.get $2
  call $~lib/string/String#substr
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/string/String#charCodeAt (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/string/String#get:length
  local.get $1
  i32.le_u
  if (result i32)
   i32.const -1
  else
   local.get $0
   local.get $1
   i32.const 1
   i32.shl
   i32.add
   i32.load16_u
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/mp/getBase (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  block $folding-inner1 (result i32)
   local.get $0
   call $~lib/string/String#get:length
   i32.const 1
   i32.ne
   if
    global.get $~lib/memory/__stack_pointer
    local.set $2
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.sub
    global.set $~lib/memory/__stack_pointer
    call $~stack_check
    global.get $~lib/memory/__stack_pointer
    i64.const 0
    i64.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    block $__inlined_func$~lib/string/String#charAt$58
     local.get $0
     call $~lib/string/String#get:length
     i32.eqz
     if
      global.get $~lib/memory/__stack_pointer
      i32.const 8
      i32.add
      global.set $~lib/memory/__stack_pointer
      i32.const 2912
      local.set $1
      br $__inlined_func$~lib/string/String#charAt$58
     end
     global.get $~lib/memory/__stack_pointer
     i32.const 2
     i32.const 2
     call $~lib/rt/itcms/__new
     local.tee $1
     i32.store offset=4
     local.get $1
     local.get $0
     i32.load16_u
     i32.store16
     global.get $~lib/memory/__stack_pointer
     i32.const 8
     i32.add
     global.set $~lib/memory/__stack_pointer
    end
    local.get $2
    local.get $1
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store
    global.get $~lib/memory/__stack_pointer
    i32.const 2784
    i32.store offset=8
    local.get $1
    i32.const 2784
    call $~lib/string/String.__eq
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store
     block $break|0
      block $case2|0
       block $case1|0
        local.get $0
        i32.const 1
        call $~lib/string/String#charCodeAt
        local.tee $0
        i32.const 98
        i32.ne
        if
         local.get $0
         i32.const 111
         i32.eq
         br_if $case1|0
         local.get $0
         i32.const 120
         i32.eq
         br_if $case2|0
         br $break|0
        end
        i32.const 2
        br $folding-inner1
       end
       i32.const 8
       br $folding-inner1
      end
      i32.const 16
      br $folding-inner1
     end
    end
   end
   i32.const 10
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/string/String#concat (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/string/String#get:length
  i32.const 1
  i32.shl
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  block $folding-inner0
   local.get $1
   call $~lib/string/String#get:length
   i32.const 1
   i32.shl
   local.tee $4
   local.get $3
   i32.add
   local.tee $2
   i32.eqz
   if
    i32.const 2912
    local.set $2
    br $folding-inner0
   end
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.const 2
   call $~lib/rt/itcms/__new
   local.tee $2
   i32.store offset=4
   local.get $2
   local.get $0
   local.get $3
   memory.copy
   local.get $2
   local.get $3
   i32.add
   local.get $1
   local.get $4
   memory.copy
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $~lib/array/Array<u32>#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.const 6
  call $~lib/rt/itcms/__new
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  call $assembly/mp/MpZ#set:_data
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  call $~lib/rt/itcms/Object#set:nextWithColor
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  call $~lib/rt/itcms/Object#set:prev
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  i32.const 0
  call $~lib/rt/itcms/Object#set:rtId
  local.get $0
  i32.const 268435455
  i32.gt_u
  if
   i32.const 2816
   i32.const 4064
   i32.const 70
   i32.const 60
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  local.get $0
  local.get $0
  i32.const 8
  i32.le_u
  select
  i32.const 2
  i32.shl
  local.tee $3
  i32.const 1
  call $~lib/rt/itcms/__new
  local.tee $2
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=12
  local.get $1
  local.get $2
  call $assembly/mp/MpZ#set:_data
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  local.get $2
  call $~lib/rt/itcms/Object#set:nextWithColor
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  local.get $3
  call $~lib/rt/itcms/Object#set:prev
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $1
  local.get $0
  call $~lib/rt/itcms/Object#set:rtId
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $~lib/array/ensureCapacity (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.load offset=8
  local.tee $3
  i32.const 2
  i32.shr_u
  i32.gt_u
  if
   local.get $1
   i32.const 268435455
   i32.gt_u
   if
    i32.const 2816
    i32.const 4064
    i32.const 19
    i32.const 48
    call $~lib/builtins/abort
    unreachable
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load
   local.tee $2
   i32.const 1073741820
   local.get $3
   i32.const 1
   i32.shl
   local.tee $3
   local.get $3
   i32.const 1073741820
   i32.ge_u
   select
   local.tee $3
   i32.const 8
   local.get $1
   local.get $1
   i32.const 8
   i32.le_u
   select
   i32.const 2
   i32.shl
   local.tee $1
   local.get $1
   local.get $3
   i32.lt_u
   select
   local.tee $1
   call $~lib/rt/itcms/__renew
   local.tee $3
   local.get $2
   i32.ne
   if
    local.get $0
    local.get $3
    i32.store
    local.get $0
    local.get $3
    i32.store offset=4
    local.get $0
    local.get $3
    i32.const 0
    call $~lib/rt/itcms/__link
   end
   local.get $0
   local.get $1
   i32.store offset=8
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/array/Array<u32>#__set (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $1
  local.get $0
  i32.load offset=12
  i32.ge_u
  if
   local.get $1
   i32.const 0
   i32.lt_s
   if
    i32.const 3136
    i32.const 4064
    i32.const 130
    i32.const 22
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   local.get $1
   i32.const 1
   i32.add
   local.tee $3
   call $~lib/array/ensureCapacity
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   local.get $3
   call $~lib/rt/itcms/Object#set:rtId
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  local.get $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/array/Array<u32>#get:length (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=12
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/mp/toStaticArray<u32> (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  loop $while-continue|0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   call $~lib/array/Array<u32>#get:length
   i32.const 1
   i32.gt_s
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    call $~lib/array/Array<u32>#get:length
    i32.const 1
    i32.sub
    local.set $1
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.sub
    global.set $~lib/memory/__stack_pointer
    call $~stack_check
    global.get $~lib/memory/__stack_pointer
    i32.const 0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $1
    local.get $0
    i32.load offset=12
    i32.ge_u
    if
     i32.const 3136
     i32.const 4064
     i32.const 114
     i32.const 42
     call $~lib/builtins/abort
     unreachable
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=4
    local.get $1
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.set $1
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $1
    i32.eqz
   else
    i32.const 0
   end
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.set $2
    local.get $0
    local.tee $1
    call $~lib/array/Array<u32>#get:length
    i32.const 1
    i32.sub
    local.set $3
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.sub
    global.set $~lib/memory/__stack_pointer
    call $~stack_check
    global.get $~lib/memory/__stack_pointer
    i64.const 0
    i64.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=12
    local.tee $0
    i32.const 0
    local.get $0
    i32.const 0
    i32.le_s
    select
    local.set $4
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.const 0
    i32.lt_s
    if (result i32)
     local.get $0
     local.get $3
     i32.add
     local.tee $0
     i32.const 0
     local.get $0
     i32.const 0
     i32.gt_s
     select
    else
     local.get $3
     local.get $0
     local.get $0
     local.get $3
     i32.gt_s
     select
    end
    local.get $4
    i32.sub
    local.tee $0
    i32.const 0
    local.get $0
    i32.const 0
    i32.gt_s
    select
    local.tee $3
    i32.const 0
    call $~lib/rt/__newArray
    local.tee $0
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    i32.load offset=4
    local.set $5
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store
    local.get $5
    local.get $1
    i32.load offset=4
    local.get $4
    i32.const 2
    i32.shl
    i32.add
    local.get $3
    i32.const 2
    i32.shl
    memory.copy
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $2
    local.get $0
    i32.store offset=8
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/array/Array<u32>#get:length
  i32.const 2
  i32.shl
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.const 5
  call $~lib/rt/itcms/__new
  local.tee $2
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $2
  local.get $0
  i32.load offset=4
  local.get $1
  memory.copy
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $assembly/mp/MpZ#_umul (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i64)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i64)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $4
  i32.store
  local.get $4
  call $~lib/staticarray/StaticArray<u32>#get:length
  local.set $6
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.load
  local.tee $4
  i32.store
  local.get $4
  call $~lib/staticarray/StaticArray<u32>#get:length
  local.set $5
  global.get $~lib/memory/__stack_pointer
  local.get $5
  local.get $6
  i32.add
  call $~lib/array/Array<u32>#constructor
  local.tee $7
  i32.store offset=8
  loop $for-loop|0
   local.get $2
   local.get $6
   i32.lt_s
   if
    i64.const 0
    local.set $3
    i32.const 0
    local.set $4
    loop $for-loop|1
     local.get $4
     local.get $5
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=4
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.load
      local.tee $8
      i32.store
      local.get $8
      local.get $2
      call $~lib/staticarray/StaticArray<u32>#__uget
      i64.extend_i32_u
      local.set $9
      global.get $~lib/memory/__stack_pointer
      local.get $1
      i32.store offset=4
      global.get $~lib/memory/__stack_pointer
      local.get $1
      i32.load
      local.tee $8
      i32.store
      local.get $9
      local.get $8
      local.get $4
      call $~lib/staticarray/StaticArray<u32>#__uget
      i64.extend_i32_u
      i64.mul
      local.set $9
      global.get $~lib/memory/__stack_pointer
      local.get $7
      i32.store
      global.get $~lib/memory/__stack_pointer
      i32.const 4
      i32.sub
      global.set $~lib/memory/__stack_pointer
      call $~stack_check
      global.get $~lib/memory/__stack_pointer
      i32.const 0
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $7
      i32.store
      local.get $7
      i32.load offset=4
      local.get $2
      local.get $4
      i32.add
      local.tee $8
      i32.const 2
      i32.shl
      i32.add
      i32.load
      local.set $10
      global.get $~lib/memory/__stack_pointer
      i32.const 4
      i32.add
      global.set $~lib/memory/__stack_pointer
      global.get $~lib/memory/__stack_pointer
      local.get $7
      i32.store
      local.get $7
      local.get $8
      local.get $3
      local.get $9
      local.get $10
      i64.extend_i32_u
      i64.add
      i64.add
      local.tee $3
      i64.const 4294967295
      i64.and
      i32.wrap_i64
      call $~lib/array/Array<u32>#__set
      local.get $3
      i64.const 32
      i64.shr_u
      i64.const 4294967295
      i64.and
      local.set $3
      local.get $4
      i32.const 1
      i32.add
      local.set $4
      br $for-loop|1
     end
    end
    global.get $~lib/memory/__stack_pointer
    local.get $7
    i32.store
    local.get $7
    local.get $2
    local.get $5
    i32.add
    local.get $3
    i64.const 4294967295
    i64.and
    i32.wrap_i64
    call $~lib/array/Array<u32>#__set
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $7
  i32.store offset=4
  local.get $7
  call $assembly/mp/toStaticArray<u32>
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.const 0
  call $assembly/mp/MpZ#constructor
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/mp/MpZ#eqz (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $1
  i32.store
  local.get $1
  call $~lib/staticarray/StaticArray<u32>#get:length
  i32.const 1
  i32.eq
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $0
   i32.store
   local.get $0
   i32.const 0
   call $~lib/staticarray/StaticArray<u32>#__uget
   i32.eqz
  else
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/mp/MpZ#neg (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/mp/MpZ#eqz
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $1
   local.get $0
   i32.load8_u offset=4
   i32.eqz
   call $assembly/mp/MpZ#constructor
   local.set $0
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/mp/MpZ#get:size (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $0
  i32.store
  local.get $0
  call $~lib/staticarray/StaticArray<u32>#get:length
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/mp/MpZ#__uadd (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i64)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $4
  i32.store
  local.get $4
  call $~lib/staticarray/StaticArray<u32>#get:length
  local.set $5
  global.get $~lib/memory/__stack_pointer
  local.get $5
  call $~lib/array/Array<u32>#constructor
  local.tee $4
  i32.store offset=8
  loop $for-loop|0
   local.get $2
   local.get $5
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $6
    i32.store
    local.get $6
    local.get $2
    call $~lib/staticarray/StaticArray<u32>#__uget
    local.set $6
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.load
    local.tee $7
    i32.store
    local.get $7
    call $~lib/staticarray/StaticArray<u32>#get:length
    local.get $2
    i32.gt_s
    if (result i32)
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.load
     local.tee $7
     i32.store
     local.get $7
     local.get $2
     call $~lib/staticarray/StaticArray<u32>#__uget
    else
     i32.const 0
    end
    local.set $7
    global.get $~lib/memory/__stack_pointer
    local.get $4
    i32.store
    local.get $4
    local.get $2
    local.get $3
    local.get $7
    i64.extend_i32_u
    local.get $6
    i64.extend_i32_u
    i64.add
    i64.add
    local.tee $3
    i64.const 4294967295
    i64.and
    i32.wrap_i64
    call $~lib/array/Array<u32>#__set
    local.get $3
    i64.const 32
    i64.shr_u
    i64.const 4294967295
    i64.and
    local.set $3
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  local.get $3
  i64.const 0
  i64.ne
  if
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   call $~stack_check
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store
   local.get $4
   local.get $4
   i32.load offset=12
   local.tee $0
   i32.const 1
   i32.add
   local.tee $1
   call $~lib/array/ensureCapacity
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store
   local.get $4
   i32.load offset=4
   local.get $0
   i32.const 2
   i32.shl
   i32.add
   local.get $3
   i64.store32
   global.get $~lib/memory/__stack_pointer
   local.get $4
   i32.store
   local.get $4
   local.get $1
   call $~lib/rt/itcms/Object#set:rtId
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
  end
  global.get $~lib/memory/__stack_pointer
  local.get $4
  i32.store offset=4
  local.get $4
  call $assembly/mp/toStaticArray<u32>
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.const 0
  call $assembly/mp/MpZ#constructor
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/mp/MpZ#_uadd (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/mp/MpZ#get:size
  local.set $2
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  call $assembly/mp/MpZ#get:size
  local.get $2
  i32.gt_s
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $1
   local.get $0
   call $assembly/mp/MpZ#__uadd
  else
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $1
   call $assembly/mp/MpZ#__uadd
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/mp/MpZ#_ucmp (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/mp/MpZ#get:size
  local.set $2
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  block $folding-inner0 (result i32)
   local.get $1
   call $assembly/mp/MpZ#get:size
   local.tee $3
   local.get $2
   i32.ne
   if
    i32.const 1
    i32.const -1
    local.get $2
    local.get $3
    i32.gt_s
    select
    br $folding-inner0
   end
   local.get $2
   i32.const 1
   i32.sub
   local.set $2
   loop $for-loop|0
    local.get $2
    i32.const 0
    i32.ge_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load
     local.tee $3
     i32.store
     local.get $3
     local.get $2
     call $~lib/staticarray/StaticArray<u32>#__uget
     local.set $3
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.load
     local.tee $4
     i32.store
     local.get $4
     local.get $2
     call $~lib/staticarray/StaticArray<u32>#__uget
     local.tee $4
     local.get $3
     i32.ne
     if
      i32.const 1
      i32.const -1
      local.get $3
      local.get $4
      i32.gt_u
      select
      br $folding-inner0
     end
     local.get $2
     i32.const 1
     i32.sub
     local.set $2
     br $for-loop|0
    end
   end
   i32.const 0
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/mp/MpZ#__usub (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i64)
  (local $4 i32)
  (local $5 i64)
  (local $6 i32)
  (local $7 i32)
  (local $8 i64)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $4
  i32.store
  local.get $4
  call $~lib/staticarray/StaticArray<u32>#get:length
  local.set $6
  global.get $~lib/memory/__stack_pointer
  local.get $6
  call $~lib/array/Array<u32>#constructor
  local.tee $4
  i32.store offset=8
  i64.const 1
  local.set $3
  loop $for-loop|0
   local.get $2
   local.get $6
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $7
    i32.store
    local.get $7
    local.get $2
    call $~lib/staticarray/StaticArray<u32>#__uget
    i64.extend_i32_u
    local.set $5
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.load
    local.tee $7
    i32.store
    local.get $5
    i64.const 4294967295
    i64.add
    local.set $8
    local.get $7
    call $~lib/staticarray/StaticArray<u32>#get:length
    local.get $2
    i32.gt_s
    if (result i64)
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.load
     local.tee $7
     i32.store
     local.get $7
     local.get $2
     call $~lib/staticarray/StaticArray<u32>#__uget
     i64.extend_i32_u
    else
     i64.const 0
    end
    local.set $5
    global.get $~lib/memory/__stack_pointer
    local.get $4
    i32.store
    local.get $4
    local.get $2
    local.get $3
    local.get $8
    local.get $5
    i64.sub
    i64.add
    local.tee $3
    i64.const 4294967295
    i64.and
    i32.wrap_i64
    call $~lib/array/Array<u32>#__set
    local.get $3
    i64.const 32
    i64.shr_u
    i64.const 4294967295
    i64.and
    local.set $3
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $4
  i32.store offset=4
  local.get $4
  call $assembly/mp/toStaticArray<u32>
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.const 0
  call $assembly/mp/MpZ#constructor
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/mp/MpZ#_usub (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  block $folding-inner0 (result i32)
   local.get $0
   local.get $1
   call $assembly/mp/MpZ#_ucmp
   i32.const 0
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    local.get $1
    local.get $0
    call $assembly/mp/MpZ#__usub
    local.set $0
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    call $assembly/mp/MpZ#neg
    br $folding-inner0
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $1
   call $assembly/mp/MpZ#__usub
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/mp/MpZ#add<u32> (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $1
  call $assembly/mp/MpZ.from<u32>
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  block $folding-inner0 (result i32)
   local.get $0
   i32.load8_u offset=4
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=4
    local.get $1
    i32.load8_u offset=4
   else
    i32.const 0
   end
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=12
    local.get $0
    local.get $1
    call $assembly/mp/MpZ#_uadd
    local.set $0
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    call $assembly/mp/MpZ#neg
    br $folding-inner0
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   i32.load8_u offset=4
   if
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    local.get $1
    local.get $0
    call $assembly/mp/MpZ#_usub
    br $folding-inner0
   end
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   i32.load8_u offset=4
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=8
    local.get $0
    local.get $1
    call $assembly/mp/MpZ#_usub
    br $folding-inner0
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   local.get $0
   local.get $1
   call $assembly/mp/MpZ#_uadd
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/mp/fromStringU (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/mp/MpZ.ZERO
  local.tee $6
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 2784
  i32.store offset=8
  local.get $0
  i32.const 2784
  call $~lib/string/String.__eq
  i32.eqz
  if
   loop $for-loop|0
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    call $~lib/string/String#get:length
    local.get $5
    i32.gt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $0
     local.get $5
     call $~lib/string/String#charCodeAt
     local.set $2
     global.get $~lib/memory/__stack_pointer
     i32.const 8
     i32.sub
     global.set $~lib/memory/__stack_pointer
     call $~stack_check
     global.get $~lib/memory/__stack_pointer
     i64.const 0
     i64.store
     block $folding-inner0
      local.get $2
      i32.const 57
      i32.le_u
      local.get $2
      i32.const 48
      i32.ge_u
      i32.and
      if
       local.get $2
       i32.const 48
       i32.sub
       local.set $2
       br $folding-inner0
      end
      local.get $2
      i32.const 90
      i32.le_u
      local.get $2
      i32.const 65
      i32.ge_u
      i32.and
      if
       local.get $2
       i32.const 55
       i32.sub
       local.set $2
       br $folding-inner0
      end
      local.get $2
      i32.const 122
      i32.le_u
      local.get $2
      i32.const 97
      i32.ge_u
      i32.and
      if
       local.get $2
       i32.const 87
       i32.sub
       local.set $2
       br $folding-inner0
      end
      global.get $~lib/memory/__stack_pointer
      i32.const 3952
      i32.store
      local.get $2
      i32.const 10
      call $~lib/number/U32#toString
      local.set $0
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=4
      i32.const 3952
      local.get $0
      call $~lib/string/String#concat
      i32.const 4016
      i32.const 71
      i32.const 3
      call $~lib/builtins/abort
      unreachable
     end
     global.get $~lib/memory/__stack_pointer
     i32.const 8
     i32.add
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     local.set $4
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     i32.const 16
     i32.sub
     global.set $~lib/memory/__stack_pointer
     call $~stack_check
     global.get $~lib/memory/__stack_pointer
     i64.const 0
     i64.store
     global.get $~lib/memory/__stack_pointer
     i64.const 0
     i64.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $1
     call $assembly/mp/MpZ.from<u32>
     local.tee $7
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $6
     i32.store offset=4
     local.get $6
     i32.load8_u offset=4
     i32.const 0
     i32.ne
     local.set $3
     global.get $~lib/memory/__stack_pointer
     local.get $7
     i32.store offset=4
     local.get $3
     local.get $7
     i32.load8_u offset=4
     i32.const 0
     i32.ne
     i32.ne
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store offset=8
      global.get $~lib/memory/__stack_pointer
      local.get $7
      i32.store offset=12
      local.get $6
      local.get $7
      call $assembly/mp/MpZ#_umul
      local.set $3
      global.get $~lib/memory/__stack_pointer
      local.get $3
      i32.store offset=4
      local.get $3
      call $assembly/mp/MpZ#neg
     else
      global.get $~lib/memory/__stack_pointer
      local.get $6
      i32.store offset=4
      global.get $~lib/memory/__stack_pointer
      local.get $7
      i32.store offset=8
      local.get $6
      local.get $7
      call $assembly/mp/MpZ#_umul
     end
     local.set $3
     global.get $~lib/memory/__stack_pointer
     i32.const 16
     i32.add
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store offset=4
     local.get $4
     local.get $3
     local.get $2
     call $assembly/mp/MpZ#add<u32>
     local.tee $6
     i32.store
     local.get $5
     i32.const 1
     i32.add
     local.set $5
     br $for-loop|0
    end
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $6
 )
 (func $assembly/mp/fromString (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 20
  memory.fill
  global.get $~lib/memory/__stack_pointer
  i32.const 3408
  i32.store offset=8
  i32.const 3408
  i32.const 0
  i32.const 1
  call $~lib/string/String#substr
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 3600
  i32.store offset=4
  local.get $0
  i32.const 3600
  call $~lib/string/String.__eq
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  if (result i32)
   global.get $~lib/memory/__stack_pointer
   i32.const 3408
   i32.store
   i32.const 1
   global.set $~argumentsLength
   i32.const 3408
   i32.const 1
   call $~lib/string/String#substr@varargs
  else
   i32.const 3408
  end
  local.tee $0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/mp/getBase
  local.set $2
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  i32.const 1
  global.set $~argumentsLength
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.const 2
  i32.const 0
  local.get $2
  i32.const 10
  i32.ne
  select
  call $~lib/string/String#substr@varargs
  local.tee $0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  local.get $2
  call $assembly/mp/fromStringU
  local.tee $0
  i32.store offset=16
  local.get $1
  if
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   call $assembly/mp/MpZ#neg
   local.set $0
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/string/String.__concat (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $0
  local.get $1
  call $~lib/string/String#concat
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/mp/MpZ#_udivRemU32 (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i64)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 20
  memory.fill
  global.get $~lib/memory/__stack_pointer
  i32.const 1
  i32.const 4224
  call $~lib/rt/__newArray
  local.tee $4
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $2
  i32.store offset=4
  local.get $2
  call $~lib/staticarray/StaticArray<u32>#get:length
  i32.const 1
  i32.sub
  local.set $2
  loop $for-loop|0
   local.get $2
   i32.const 0
   i32.ge_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $5
    i32.store offset=4
    local.get $5
    local.get $2
    call $~lib/staticarray/StaticArray<u32>#__uget
    i64.extend_i32_u
    local.get $3
    i64.const 32
    i64.shl
    i64.add
    local.set $3
    global.get $~lib/memory/__stack_pointer
    local.get $4
    i32.store offset=4
    local.get $4
    local.get $2
    local.get $3
    local.get $1
    i64.extend_i32_u
    i64.div_u
    i64.const 4294967295
    i64.and
    i32.wrap_i64
    call $~lib/array/Array<u32>#__set
    local.get $3
    local.get $1
    i64.extend_i32_u
    i64.rem_u
    local.set $3
    local.get $2
    i32.const 1
    i32.sub
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $4
  i32.store offset=8
  local.get $4
  call $assembly/mp/toStaticArray<u32>
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $0
  local.get $1
  i32.const 0
  call $assembly/mp/MpZ#constructor
  local.tee $1
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.const 9
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.set $2
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.const 0
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $0
  i32.const 0
  call $assembly/mp/MpZ#set:_data
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $0
  i32.const 0
  call $~lib/rt/itcms/Object#set:nextWithColor
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=16
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  local.get $0
  local.get $1
  call $assembly/mp/MpZ#set:_data
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $0
  local.get $3
  i64.const 4294967295
  i64.and
  i32.wrap_i64
  call $~lib/rt/itcms/Object#set:nextWithColor
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/array/Array<~lib/string/String>#unshift (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $0
  i32.load offset=12
  i32.const 1
  i32.add
  local.tee $2
  call $~lib/array/ensureCapacity
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=4
  local.tee $3
  i32.const 4
  i32.add
  local.get $3
  local.get $2
  i32.const 1
  i32.sub
  i32.const 2
  i32.shl
  memory.copy
  local.get $3
  local.get $1
  i32.store
  local.get $0
  local.get $1
  i32.const 1
  call $~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $2
  call $~lib/rt/itcms/Object#set:rtId
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/string/String.__ne (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=4
  local.get $0
  i32.const 0
  call $~lib/string/String.__eq
  i32.eqz
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/util/string/joinReferenceArray<~lib/string/String> (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 20
  memory.fill
  block $folding-inner0
   local.get $1
   i32.const 1
   i32.sub
   local.tee $3
   i32.const 0
   i32.lt_s
   if
    i32.const 2912
    local.set $0
    br $folding-inner0
   end
   local.get $3
   i32.eqz
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    local.get $0
    call $~lib/string/String.__ne
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
    else
     i32.const 2912
     local.set $0
    end
    br $folding-inner0
   end
   i32.const 2912
   local.set $1
   global.get $~lib/memory/__stack_pointer
   i32.const 2912
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 2912
   i32.store offset=4
   i32.const 2912
   call $~lib/string/String#get:length
   local.set $5
   loop $for-loop|0
    local.get $3
    local.get $4
    i32.gt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     local.get $4
     i32.const 2
     i32.shl
     i32.add
     i32.load
     local.tee $2
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=4
     local.get $2
     call $~lib/string/String.__ne
     if
      global.get $~lib/memory/__stack_pointer
      local.get $1
      i32.store offset=4
      global.get $~lib/memory/__stack_pointer
      local.get $2
      i32.store offset=16
      global.get $~lib/memory/__stack_pointer
      local.get $2
      i32.store offset=12
      global.get $~lib/memory/__stack_pointer
      local.get $1
      local.get $2
      call $~lib/string/String.__concat
      local.tee $1
      i32.store offset=8
     end
     local.get $5
     if
      global.get $~lib/memory/__stack_pointer
      local.get $1
      i32.store offset=4
      global.get $~lib/memory/__stack_pointer
      i32.const 2912
      i32.store offset=12
      global.get $~lib/memory/__stack_pointer
      local.get $1
      i32.const 2912
      call $~lib/string/String.__concat
      local.tee $1
      i32.store offset=8
     end
     local.get $4
     i32.const 1
     i32.add
     local.set $4
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   local.get $3
   i32.const 2
   i32.shl
   i32.add
   i32.load
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   call $~lib/string/String.__ne
   if
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=12
    global.get $~lib/memory/__stack_pointer
    local.get $1
    local.get $0
    call $~lib/string/String.__concat
    local.tee $1
    i32.store offset=8
   end
   local.get $1
   local.set $0
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/mp/MpZ#_uitoa (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 28
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 28
  memory.fill
  global.get $~lib/memory/__stack_pointer
  local.set $1
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.const 8
  call $~lib/rt/itcms/__new
  local.tee $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $2
  i32.const 0
  call $assembly/mp/MpZ#set:_data
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $2
  i32.const 0
  call $~lib/rt/itcms/Object#set:nextWithColor
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $2
  i32.const 0
  call $~lib/rt/itcms/Object#set:prev
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $2
  i32.const 0
  call $~lib/rt/itcms/Object#set:rtId
  global.get $~lib/memory/__stack_pointer
  i32.const 32
  i32.const 1
  call $~lib/rt/itcms/__new
  local.tee $3
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=12
  local.get $2
  local.get $3
  call $assembly/mp/MpZ#set:_data
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $2
  local.get $3
  call $~lib/rt/itcms/Object#set:nextWithColor
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $2
  i32.const 32
  call $~lib/rt/itcms/Object#set:prev
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $2
  i32.const 0
  call $~lib/rt/itcms/Object#set:rtId
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
  local.get $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  loop $while-continue|0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=8
   global.get $assembly/mp/TO_DECIMAL_N
   local.set $1
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   call $~stack_check
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $1
   call $assembly/mp/MpZ.from<i32>
   local.tee $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   i32.load8_u offset=4
   local.set $3
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $3
   i32.const 0
   i32.ne
   local.get $1
   i32.load8_u offset=4
   i32.const 0
   i32.ne
   i32.ne
   if (result i32)
    i32.const -1
    i32.const 1
    local.get $3
    select
   else
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=8
    i32.const 0
    local.get $0
    local.get $1
    call $assembly/mp/MpZ#_ucmp
    local.tee $1
    i32.sub
    local.get $1
    local.get $3
    select
   end
   local.set $1
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $1
   i32.const 1
   i32.eq
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $0
    global.get $assembly/mp/TO_DECIMAL_N
    call $assembly/mp/MpZ#_udivRemU32
    local.tee $1
    i32.store offset=12
    global.get $~lib/memory/__stack_pointer
    local.set $3
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.sub
    global.set $~lib/memory/__stack_pointer
    call $~stack_check
    global.get $~lib/memory/__stack_pointer
    i32.const 0
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.load
    local.tee $0
    i32.store
    local.get $0
    i32.eqz
    if
     i32.const 4256
     i32.const 4016
     i32.const 126
     i32.const 3
     call $~lib/builtins/abort
     unreachable
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $3
    local.get $0
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.set $3
    global.get $~lib/memory/__stack_pointer
    global.get $assembly/mp/TO_DECIMAL_P
    local.tee $4
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=20
    local.get $1
    i32.load offset=4
    i32.const 10
    call $~lib/number/U32#toString
    local.set $1
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=16
    local.get $3
    local.get $4
    local.get $1
    call $~lib/string/String.__concat
    local.tee $3
    i32.store offset=24
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store offset=20
    i32.const 1
    global.set $~argumentsLength
    i32.const 0
    local.set $1
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.sub
    global.set $~lib/memory/__stack_pointer
    call $~stack_check
    global.get $~lib/memory/__stack_pointer
    i32.const 0
    i32.store
    block $1of1
     block $0of1
      block $outOfRange
       global.get $~argumentsLength
       i32.const 1
       i32.sub
       br_table $0of1 $1of1 $outOfRange
      end
      unreachable
     end
     i32.const 2147483647
     local.set $1
    end
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.sub
    global.set $~lib/memory/__stack_pointer
    call $~stack_check
    global.get $~lib/memory/__stack_pointer
    i64.const 0
    i64.store
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store
    local.get $3
    call $~lib/string/String#get:length
    local.tee $4
    i32.const 9
    i32.sub
    local.tee $5
    i32.const 0
    local.get $5
    i32.const 0
    i32.gt_s
    select
    local.set $5
    block $folding-inner0
     local.get $1
     i32.const 0
     i32.lt_s
     if (result i32)
      local.get $1
      local.get $4
      i32.add
      local.tee $1
      i32.const 0
      local.get $1
      i32.const 0
      i32.gt_s
      select
     else
      local.get $1
      local.get $4
      local.get $1
      local.get $4
      i32.lt_s
      select
     end
     local.get $5
     i32.sub
     local.tee $1
     i32.const 0
     i32.le_s
     if
      i32.const 2912
      local.set $1
      br $folding-inner0
     end
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.const 1
     i32.shl
     local.tee $4
     i32.const 2
     call $~lib/rt/itcms/__new
     local.tee $1
     i32.store offset=4
     local.get $1
     local.get $3
     local.get $5
     i32.const 1
     i32.shl
     i32.add
     local.get $4
     memory.copy
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 8
    i32.add
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=16
    local.get $2
    local.get $1
    call $~lib/array/Array<~lib/string/String>#unshift
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  local.get $0
  call $assembly/mp/MpZ#eqz
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=20
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   call $~stack_check
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $0
   i32.store
   local.get $0
   i32.const 0
   call $~lib/staticarray/StaticArray<u32>#__uget
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   i32.const 10
   call $~lib/number/U32#toString
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=16
   local.get $2
   local.get $0
   call $~lib/array/Array<~lib/string/String>#unshift
  end
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 2912
  i32.store offset=16
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store
  local.get $2
  i32.load offset=4
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store
  local.get $2
  i32.load offset=12
  local.set $1
  global.get $~lib/memory/__stack_pointer
  i32.const 2912
  i32.store
  local.get $0
  local.get $1
  call $~lib/util/string/joinReferenceArray<~lib/string/String>
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 28
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/mp/MpZ#toDecimal (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/mp/MpZ#eqz
  if (result i32)
   i32.const 2784
  else
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 3600
   i32.const 2912
   local.get $0
   i32.load8_u offset=4
   select
   local.tee $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   call $~stack_check
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load8_u offset=4
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $0
    i32.store
    local.get $0
    i32.const 0
    call $assembly/mp/MpZ#constructor
    local.set $0
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=8
   local.get $0
   call $assembly/mp/MpZ#_uitoa
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $1
   local.get $0
   call $~lib/string/String.__concat
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $start:assembly/__benches__/to-string~anonymous|0
  (local $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/__benches__/to-string/input
  local.tee $0
  i32.store offset=4
  local.get $0
  call $assembly/mp/MpZ#toDecimal
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/__astral__/blackbox<assembly/mp/MpZ>
  drop
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/staticarray/StaticArray<u64>#__set (param $0 i32) (param $1 i32) (param $2 i64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/staticarray/StaticArray<u64>#get:length
  local.get $1
  i32.le_u
  if
   i32.const 3136
   i32.const 3344
   i32.const 93
   i32.const 41
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  i32.const 3
  i32.shl
  i32.add
  local.get $2
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/__astral__/Sampling.linearSampling (param $0 f64) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 f64)
  (local $5 f64)
  (local $6 i64)
  (local $7 i64)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  f64.const 5e3
  local.get $0
  f64.div
  local.tee $4
  f64.const 5050
  f64.div
  f64.ceil
  f64.const 1
  f64.max
  local.tee $5
  i64.trunc_sat_f64_u
  local.tee $6
  i64.const 1
  i64.eq
  if
   i32.const 1
   local.get $5
   f64.const 5050
   f64.mul
   local.get $0
   f64.mul
   i64.const 10
   local.get $4
   f64.const 4
   f64.mul
   f64.sqrt
   f64.const 0.5
   f64.mul
   f64.const -1
   f64.add
   i64.trunc_sat_f64_u
   i64.const 10
   i64.div_u
   i64.const 10
   i64.mul
   local.tee $7
   local.get $7
   i64.const 10
   i64.lt_u
   select
   f64.convert_i64_u
   call $~lib/__astral__/faultyConfig
  end
  global.get $~lib/memory/__stack_pointer
  call $~lib/staticarray/StaticArray<u64>#constructor
  local.tee $3
  i32.store
  i32.const 1
  local.set $1
  loop $for-loop|0
   local.get $2
   i32.const 100
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store offset=4
    local.get $3
    local.get $2
    local.get $1
    i64.extend_i32_s
    local.get $6
    i64.mul
    call $~lib/staticarray/StaticArray<u64>#__set
    local.get $1
    local.tee $2
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
 )
 (func $~lib/staticarray/StaticArray<u64>#__get (param $0 i32) (param $1 i32) (result i64)
  (local $2 i64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/staticarray/StaticArray<u64>#get:length
  local.get $1
  i32.le_u
  if
   i32.const 3136
   i32.const 3344
   i32.const 78
   i32.const 41
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $1
  i32.const 3
  i32.shl
  i32.add
  i64.load
  local.set $2
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $~lib/staticarray/StaticArray<f64>#__set (param $0 i32) (param $1 i32) (param $2 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/staticarray/StaticArray<u64>#get:length
  local.get $1
  i32.le_u
  if
   i32.const 3136
   i32.const 3344
   i32.const 93
   i32.const 41
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  i32.const 3
  i32.shl
  i32.add
  local.get $2
  f64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/util/sort/SORT<f64> (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i64)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  (local $15 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $1
  i32.const 48
  i32.le_s
  if
   local.get $1
   i32.const 1
   i32.le_s
   if
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    return
   end
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store
   local.get $0
   i32.const 0
   local.get $1
   i32.const 1
   i32.sub
   i32.const 0
   local.get $2
   call $~lib/util/sort/insertionSort<f64>
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 33
  local.get $1
  i32.clz
  i32.sub
  local.tee $6
  i32.const 2
  i32.shl
  local.tee $7
  i32.const 1
  i32.shl
  call $~lib/rt/tlsf/__alloc
  local.tee $13
  local.get $7
  i32.add
  local.set $12
  loop $for-loop|0
   local.get $4
   local.get $6
   i32.lt_u
   if
    local.get $13
    local.get $4
    i32.const 2
    i32.shl
    i32.add
    i32.const -1
    i32.store
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  local.get $1
  i32.const 3
  i32.shl
  call $~lib/rt/tlsf/__alloc
  local.set $11
  global.get $~lib/memory/__stack_pointer
  local.get $2
  local.tee $7
  i32.store
  local.get $0
  i32.const 0
  local.get $1
  i32.const 1
  i32.sub
  local.tee $14
  local.get $7
  call $~lib/util/sort/extendRunRight<f64>
  local.tee $1
  i32.const 1
  i32.add
  local.tee $2
  i32.const 32
  i32.lt_s
  if
   global.get $~lib/memory/__stack_pointer
   local.get $7
   i32.store
   local.get $0
   i32.const 0
   i32.const 31
   local.get $14
   local.get $14
   i32.const 31
   i32.ge_s
   select
   local.tee $1
   local.get $2
   local.get $7
   call $~lib/util/sort/insertionSort<f64>
  end
  loop $while-continue|1
   local.get $1
   local.get $14
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $7
    i32.store
    local.get $0
    local.get $1
    i32.const 1
    i32.add
    local.tee $2
    local.get $14
    local.get $7
    call $~lib/util/sort/extendRunRight<f64>
    local.tee $4
    local.get $2
    i32.sub
    i32.const 1
    i32.add
    local.tee $6
    i32.const 32
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $7
     i32.store
     local.get $0
     local.get $2
     local.get $14
     local.get $2
     i32.const 31
     i32.add
     local.tee $4
     local.get $4
     local.get $14
     i32.gt_s
     select
     local.tee $4
     local.get $6
     local.get $7
     call $~lib/util/sort/insertionSort<f64>
    end
    local.get $2
    local.get $3
    i32.add
    i64.extend_i32_u
    i64.const 30
    i64.shl
    local.get $14
    i32.const 1
    i32.add
    i64.extend_i32_u
    local.tee $10
    i64.div_u
    local.get $2
    local.get $4
    i32.add
    i32.const 1
    i32.add
    i64.extend_i32_u
    i64.const 30
    i64.shl
    local.get $10
    i64.div_u
    i64.xor
    i32.wrap_i64
    i32.clz
    local.set $6
    loop $for-loop|2
     local.get $5
     local.get $6
     i32.gt_u
     if
      local.get $5
      i32.const 2
      i32.shl
      local.tee $9
      local.get $13
      i32.add
      local.tee $8
      i32.load
      local.tee $15
      i32.const -1
      i32.ne
      if
       local.get $9
       local.get $12
       i32.add
       i32.load
       i32.const 1
       i32.add
       local.set $3
       global.get $~lib/memory/__stack_pointer
       local.get $7
       i32.store
       local.get $0
       local.get $15
       local.get $3
       local.get $1
       local.get $11
       local.get $7
       call $~lib/util/sort/mergeRuns<f64>
       local.get $8
       i32.const -1
       i32.store
       local.get $15
       local.set $3
      end
      local.get $5
      i32.const 1
      i32.sub
      local.set $5
      br $for-loop|2
     end
    end
    local.get $6
    i32.const 2
    i32.shl
    local.tee $5
    local.get $13
    i32.add
    local.get $3
    i32.store
    local.get $5
    local.get $12
    i32.add
    local.get $1
    i32.store
    local.get $2
    local.set $3
    local.get $4
    local.set $1
    local.get $6
    local.set $5
    br $while-continue|1
   end
  end
  loop $for-loop|3
   local.get $5
   if
    local.get $5
    i32.const 2
    i32.shl
    local.tee $1
    local.get $13
    i32.add
    i32.load
    local.tee $2
    i32.const -1
    i32.ne
    if
     local.get $1
     local.get $12
     i32.add
     i32.load
     i32.const 1
     i32.add
     local.set $1
     global.get $~lib/memory/__stack_pointer
     local.get $7
     i32.store
     local.get $0
     local.get $2
     local.get $1
     local.get $14
     local.get $11
     local.get $7
     call $~lib/util/sort/mergeRuns<f64>
    end
    local.get $5
    i32.const 1
    i32.sub
    local.set $5
    br $for-loop|3
   end
  end
  local.get $11
  call $~lib/rt/tlsf/__free
  local.get $13
  call $~lib/rt/tlsf/__free
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/staticarray/StaticArray<f64>#sort@varargs (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  block $1of1
   block $0of1
    block $outOfRange
     global.get $~argumentsLength
     br_table $0of1 $1of1 $outOfRange
    end
    unreachable
   end
   i32.const 4416
   local.set $1
   global.get $~lib/memory/__stack_pointer
   i32.const 4416
   i32.store
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $0
  call $~lib/staticarray/StaticArray<u64>#get:length
  local.set $2
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $0
  local.get $2
  local.get $1
  call $~lib/util/sort/SORT<f64>
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/staticarray/StaticArray<f64>#__get (param $0 i32) (param $1 i32) (result f64)
  (local $2 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/staticarray/StaticArray<u64>#get:length
  local.get $1
  i32.le_u
  if
   i32.const 3136
   i32.const 3344
   i32.const 78
   i32.const 41
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $1
  i32.const 3
  i32.shl
  i32.add
  f64.load
  local.set $2
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $~lib/__astral__/Stats.mean (param $0 i32) (result f64)
  (local $1 i32)
  (local $2 f64)
  (local $3 i32)
  (local $4 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4448
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/staticarray/StaticArray<u64>#get:length
  local.set $3
  loop $for-loop|0
   local.get $1
   local.get $3
   i32.lt_s
   if
    local.get $0
    local.get $1
    i32.const 3
    i32.shl
    i32.add
    f64.load
    local.set $4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    i32.const 4
    global.set $~argumentsLength
    local.get $2
    local.get $4
    local.get $1
    local.get $0
    i32.const 4448
    i32.load
    call_indirect (type $15)
    local.set $2
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $2
  local.get $0
  call $~lib/staticarray/StaticArray<u64>#get:length
  f64.convert_i32_s
  f64.div
  local.set $2
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $~lib/__astral__/Stats.variance (param $0 i32) (param $1 f64) (result f64)
  (local $2 f64)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  loop $for-loop|0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   call $~lib/staticarray/StaticArray<u64>#get:length
   local.get $3
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $2
    local.get $0
    local.get $3
    call $~lib/staticarray/StaticArray<f64>#__get
    local.get $1
    f64.sub
    local.tee $2
    local.get $2
    f64.mul
    f64.add
    local.set $2
    local.get $3
    i32.const 1
    i32.add
    local.set $3
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $2
  local.get $0
  call $~lib/staticarray/StaticArray<u64>#get:length
  i32.const 1
  i32.sub
  f64.convert_i32_s
  f64.div
  local.set $1
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $~lib/__astral__/Stats.t (param $0 i32) (param $1 i32) (result f64)
  (local $2 f64)
  (local $3 f64)
  (local $4 f64)
  (local $5 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/__astral__/Stats.mean
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  call $~lib/__astral__/Stats.mean
  local.set $4
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $3
  call $~lib/__astral__/Stats.variance
  local.set $5
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $1
  local.get $4
  call $~lib/__astral__/Stats.variance
  local.set $2
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $5
  local.get $0
  call $~lib/staticarray/StaticArray<u64>#get:length
  f64.convert_i32_s
  f64.div
  local.set $5
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store
  local.get $3
  local.get $4
  f64.sub
  local.get $5
  local.get $2
  local.get $1
  call $~lib/staticarray/StaticArray<u64>#get:length
  f64.convert_i32_s
  f64.div
  f64.add
  f64.sqrt
  f64.div
  local.set $2
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $~lib/__astral__/Stats.sorted.median (param $0 i32) (result f64)
  (local $1 f64)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/staticarray/StaticArray<u64>#get:length
  local.tee $2
  i32.const 2
  i32.rem_s
  i32.const 1
  i32.eq
  if (result f64)
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   local.get $2
   i32.const 2
   i32.div_s
   call $~lib/staticarray/StaticArray<f64>#__get
  else
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   local.get $2
   i32.const 2
   i32.div_s
   local.tee $2
   i32.const 1
   i32.sub
   call $~lib/staticarray/StaticArray<f64>#__get
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $1
   local.get $0
   local.get $2
   call $~lib/staticarray/StaticArray<f64>#__get
   f64.add
   f64.const 0.5
   f64.mul
  end
  local.set $1
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $~lib/__astral__/Stats.stdDev (param $0 i32) (param $1 f64) (result f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  call $~lib/__astral__/Stats.variance
  f64.sqrt
  local.set $1
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $~lib/__astral__/Stats.sorted.MAD (param $0 i32) (param $1 f64) (result f64)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  call $~lib/staticarray/StaticArray<u64>#get:length
  call $~lib/staticarray/StaticArray<f64>#constructor
  local.tee $2
  i32.store offset=4
  loop $for-loop|0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   call $~lib/staticarray/StaticArray<u64>#get:length
   local.get $3
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=8
    local.get $2
    local.get $3
    local.get $0
    local.get $3
    call $~lib/staticarray/StaticArray<f64>#__get
    local.get $1
    f64.sub
    f64.abs
    call $~lib/staticarray/StaticArray<f64>#__set
    local.get $3
    i32.const 1
    i32.add
    local.set $3
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store
  i32.const 0
  global.set $~argumentsLength
  local.get $2
  call $~lib/staticarray/StaticArray<f64>#sort@varargs
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store
  local.get $2
  call $~lib/__astral__/Stats.sorted.median
  f64.const 1.4826
  f64.mul
  local.set $1
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $~lib/__astral__/Stats.sorted.percentile (param $0 i32) (param $1 f64) (result f64)
  (local $2 f64)
  (local $3 i32)
  (local $4 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/staticarray/StaticArray<u64>#get:length
  i32.const 1
  i32.sub
  local.set $3
  block $folding-inner0 (result f64)
   local.get $1
   f64.const 100
   f64.eq
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    local.get $3
    call $~lib/staticarray/StaticArray<f64>#__get
    br $folding-inner0
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   local.get $1
   f64.const 100
   f64.div
   local.get $3
   f64.convert_i32_s
   f64.mul
   local.tee $2
   f64.floor
   local.tee $1
   i32.trunc_sat_f64_u
   local.tee $3
   call $~lib/staticarray/StaticArray<f64>#__uget
   local.set $4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $4
   local.get $0
   local.get $3
   i32.const 1
   i32.add
   call $~lib/staticarray/StaticArray<f64>#__uget
   local.get $4
   f64.sub
   local.get $2
   local.get $1
   f64.sub
   f64.mul
   f64.add
  end
  local.set $1
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $~lib/__astral__/Stats.sorted.CI.LB (param $0 i32) (result f64)
  local.get $0
  f64.const 2.500000000000002
  call $byn$mgfn-shared$~lib/__astral__/Stats.sorted.CI.LB
 )
 (func $~lib/__astral__/Stats.sorted.CI.HB (param $0 i32) (result f64)
  local.get $0
  f64.const 97.5
  call $byn$mgfn-shared$~lib/__astral__/Stats.sorted.CI.LB
 )
 (func $~lib/__astral__/Regression.dot (param $0 i32) (param $1 i32) (result f64)
  (local $2 i32)
  (local $3 f64)
  (local $4 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  loop $for-loop|0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   call $~lib/staticarray/StaticArray<u64>#get:length
   local.get $2
   i32.gt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store
    local.get $0
    local.get $2
    call $~lib/staticarray/StaticArray<f64>#__get
    local.set $4
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store
    local.get $3
    local.get $4
    local.get $1
    local.get $2
    call $~lib/staticarray/StaticArray<f64>#__get
    f64.mul
    f64.add
    local.set $3
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
 )
 (func $~lib/__astral__/Regression.fit (param $0 i32) (param $1 i32) (result f64)
  (local $2 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $0
  local.get $1
  call $~lib/__astral__/Regression.dot
  local.set $2
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $2
  local.get $0
  local.get $0
  call $~lib/__astral__/Regression.dot
  f64.div
  local.set $2
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $~lib/__astral__/bench (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 f64)
  (local $6 i32)
  (local $7 f64)
  (local $8 f64)
  (local $9 i32)
  (local $10 i32)
  (local $11 i64)
  (local $12 i64)
  (local $13 i32)
  (local $14 i64)
  (local $15 i32)
  (local $16 i32)
  (local $17 f64)
  (local $18 i32)
  (local $19 i32)
  (local $20 i32)
  (local $21 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 76
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 76
  memory.fill
  i64.const 1
  local.set $11
  local.get $0
  call $~lib/__astral__/warmup
  loop $while-continue|0
   call $~lib/__astral__/now
   local.set $17
   i64.const 0
   local.set $12
   loop $for-loop|1
    local.get $11
    local.get $12
    i64.gt_u
    if
     i32.const 0
     global.set $~argumentsLength
     local.get $1
     i32.load
     call_indirect (type $3)
     local.get $12
     i64.const 1
     i64.add
     local.set $12
     br $for-loop|1
    end
   end
   local.get $11
   local.get $14
   i64.add
   local.set $14
   local.get $7
   call $~lib/__astral__/now
   local.get $17
   f64.sub
   f64.add
   local.tee $7
   f64.const 3e3
   f64.gt
   i32.eqz
   if
    local.get $11
    i64.const 1
    i64.shl
    local.set $11
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.set $2
  f64.const 5e3
  local.get $7
  local.get $14
  f64.convert_i64_u
  f64.div
  local.tee $7
  f64.div
  local.tee $17
  f64.const 5050
  f64.div
  f64.ceil
  f64.const 5050
  f64.mul
  local.get $7
  f64.mul
  f64.const 1e4
  f64.gt
  local.tee $15
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   call $~stack_check
   global.get $~lib/memory/__stack_pointer
   i64.const 0
   i64.store
   i64.const 1
   f64.const 50
   local.get $7
   f64.div
   f64.ceil
   i64.trunc_sat_f64_u
   local.tee $11
   local.get $11
   i64.eqz
   select
   local.tee $11
   i64.const 1
   i64.eq
   if
    i32.const 0
    local.get $11
    i64.const 100
    i64.mul
    f64.convert_i64_u
    local.get $7
    f64.mul
    i64.const 10
    local.get $17
    i64.trunc_sat_f64_u
    i64.const 10
    i64.div_u
    i64.const 10
    i64.mul
    local.tee $12
    local.get $12
    i64.const 10
    i64.lt_u
    select
    f64.convert_i64_u
    call $~lib/__astral__/faultyConfig
   end
   global.get $~lib/memory/__stack_pointer
   call $~lib/staticarray/StaticArray<u64>#constructor
   local.tee $0
   i32.store
   loop $for-loop|0
    local.get $3
    i32.const 100
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     local.get $0
     local.get $3
     local.get $11
     call $~lib/staticarray/StaticArray<u64>#__set
     local.get $3
     i32.const 1
     i32.add
     local.set $3
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
  else
   local.get $7
   call $~lib/__astral__/Sampling.linearSampling
   local.set $0
  end
  local.get $2
  local.get $0
  local.tee $3
  i32.store
  i32.const 0
  local.set $0
  loop $for-loop|2
   local.get $0
   i32.const 100
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store offset=4
    local.get $5
    local.get $3
    local.get $0
    call $~lib/staticarray/StaticArray<u64>#__get
    f64.convert_i64_u
    local.tee $17
    local.get $7
    f64.mul
    f64.add
    local.set $5
    local.get $8
    local.get $17
    f64.add
    local.set $8
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|2
   end
  end
  local.get $5
  local.get $8
  call $~lib/__astral__/start
  i32.const 1
  local.set $2
  global.get $~lib/memory/__stack_pointer
  i32.const 100
  call $~lib/staticarray/StaticArray<f64>#constructor
  local.tee $13
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 100
  call $~lib/staticarray/StaticArray<f64>#constructor
  local.tee $16
  i32.store offset=12
  i32.const 0
  local.set $0
  loop $for-loop|3
   local.get $0
   i32.const 100
   i32.lt_s
   if
    call $~lib/__astral__/now
    local.set $5
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store offset=4
    local.get $3
    local.get $0
    call $~lib/staticarray/StaticArray<u64>#__get
    local.set $12
    i64.const 0
    local.set $11
    loop $for-loop|4
     local.get $11
     local.get $12
     i64.lt_u
     if
      i32.const 0
      global.set $~argumentsLength
      local.get $1
      i32.load
      call_indirect (type $3)
      local.get $11
      i64.const 1
      i64.add
      local.set $11
      br $for-loop|4
     end
    end
    local.get $2
    call $~lib/__astral__/now
    local.get $5
    f64.sub
    local.tee $5
    f64.const 0
    f64.eq
    i32.and
    if
     call $~lib/__astral__/faultyBenchmark
     i32.const 0
     local.set $2
    end
    global.get $~lib/memory/__stack_pointer
    local.get $13
    i32.store offset=4
    local.get $13
    local.get $0
    local.get $5
    call $~lib/staticarray/StaticArray<f64>#__set
    global.get $~lib/memory/__stack_pointer
    local.get $16
    i32.store offset=4
    local.get $16
    local.get $0
    local.get $5
    local.get $12
    f64.convert_i64_u
    f64.div
    call $~lib/staticarray/StaticArray<f64>#__set
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|3
   end
  end
  call $~lib/__astral__/analyzing
  global.get $~lib/memory/__stack_pointer
  local.get $16
  i32.store offset=4
  i32.const 0
  global.set $~argumentsLength
  local.get $16
  call $~lib/staticarray/StaticArray<f64>#sort@varargs
  global.get $~lib/memory/__stack_pointer
  i32.const 100
  call $~lib/staticarray/StaticArray<f64>#constructor
  local.tee $9
  i32.store offset=16
  global.get $~lib/memory/__stack_pointer
  i32.const 100
  call $~lib/staticarray/StaticArray<f64>#constructor
  local.tee $4
  i32.store offset=20
  f64.const 0
  local.set $7
  f64.const 0
  local.set $5
  global.get $~lib/__astral__/flags
  i32.const 1
  i32.and
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 200
   call $~lib/staticarray/StaticArray<f64>#constructor
   local.tee $1
   i32.store offset=24
   global.get $~lib/memory/__stack_pointer
   i32.const 100
   call $~lib/staticarray/StaticArray<f64>#constructor
   local.tee $18
   i32.store offset=28
   i32.const 0
   local.set $0
   loop $for-loop|5
    local.get $0
    i32.const 100
    i32.lt_s
    if
     local.get $0
     i32.const 3
     i32.shl
     local.tee $2
     i32.const 1952
     i32.add
     f64.load
     local.get $2
     i32.const 1152
     i32.add
     f64.load
     f64.div
     local.set $5
     global.get $~lib/memory/__stack_pointer
     local.get $18
     i32.store offset=4
     local.get $18
     local.get $0
     local.get $5
     call $~lib/staticarray/StaticArray<f64>#__set
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $16
     i32.store offset=32
     local.get $1
     local.get $0
     local.get $16
     local.get $0
     call $~lib/staticarray/StaticArray<f64>#__get
     call $~lib/staticarray/StaticArray<f64>#__set
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=4
     local.get $1
     local.get $0
     i32.const 100
     i32.add
     local.get $5
     call $~lib/staticarray/StaticArray<f64>#__set
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|5
    end
   end
   global.get $~lib/memory/__stack_pointer
   local.get $16
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $18
   i32.store offset=32
   local.get $16
   local.get $18
   call $~lib/__astral__/Stats.t
   local.set $5
   global.get $~lib/memory/__stack_pointer
   i32.const 100000
   call $~lib/staticarray/StaticArray<f64>#constructor
   local.tee $19
   i32.store offset=36
   loop $for-loop|6
    local.get $6
    i32.const 100000
    i32.lt_s
    if
     i32.const 0
     local.set $0
     loop $for-loop|7
      local.get $0
      i32.const 100
      i32.lt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.get $9
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $1
       i32.store offset=32
       local.get $9
       local.get $0
       local.get $1
       call $~lib/math/NativeMath.random
       f64.const 100
       f64.mul
       f64.const 2
       f64.mul
       i32.trunc_sat_f64_u
       call $~lib/staticarray/StaticArray<f64>#__get
       call $~lib/staticarray/StaticArray<f64>#__set
       global.get $~lib/memory/__stack_pointer
       local.get $4
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $1
       i32.store offset=32
       local.get $4
       local.get $0
       local.get $1
       call $~lib/math/NativeMath.random
       f64.const 100
       f64.mul
       f64.const 2
       f64.mul
       i32.trunc_sat_f64_u
       call $~lib/staticarray/StaticArray<f64>#__get
       call $~lib/staticarray/StaticArray<f64>#__set
       local.get $0
       i32.const 1
       i32.add
       local.set $0
       br $for-loop|7
      end
     end
     global.get $~lib/memory/__stack_pointer
     local.get $19
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $9
     i32.store offset=32
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.store offset=40
     local.get $19
     local.get $6
     local.get $9
     local.get $4
     call $~lib/__astral__/Stats.t
     call $~lib/staticarray/StaticArray<f64>#__set
     local.get $6
     i32.const 1
     i32.add
     local.set $6
     br $for-loop|6
    end
   end
   global.get $~lib/memory/__stack_pointer
   local.get $16
   i32.store offset=4
   local.get $16
   call $~lib/__astral__/Stats.mean
   local.set $7
   global.get $~lib/memory/__stack_pointer
   local.get $18
   i32.store offset=4
   local.get $7
   local.get $18
   call $~lib/__astral__/Stats.mean
   f64.div
   f64.const -1
   f64.add
   local.set $7
   global.get $~lib/memory/__stack_pointer
   local.get $18
   i32.store offset=4
   i32.const 0
   global.set $~argumentsLength
   local.get $18
   call $~lib/staticarray/StaticArray<f64>#sort@varargs
   global.get $~lib/memory/__stack_pointer
   local.get $16
   i32.store offset=4
   local.get $16
   call $~lib/__astral__/Stats.sorted.median
   drop
   global.get $~lib/memory/__stack_pointer
   local.get $18
   i32.store offset=4
   local.get $18
   call $~lib/__astral__/Stats.sorted.median
   drop
   global.get $~lib/memory/__stack_pointer
   i32.const 100000
   call $~lib/staticarray/StaticArray<f64>#constructor
   local.tee $10
   i32.store offset=44
   global.get $~lib/memory/__stack_pointer
   i32.const 100000
   call $~lib/staticarray/StaticArray<f64>#constructor
   local.tee $2
   i32.store offset=48
   i32.const 0
   local.set $6
   loop $for-loop|8
    local.get $6
    i32.const 317
    i32.lt_s
    if
     local.get $6
     i32.const 316
     i32.mul
     local.set $0
     i32.const 100000
     local.get $6
     i32.const 1
     i32.add
     i32.const 316
     i32.mul
     local.tee $1
     local.get $1
     i32.const 100000
     i32.ge_s
     select
     local.set $20
     i32.const 0
     local.set $1
     loop $for-loop|9
      local.get $1
      i32.const 100
      i32.lt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.get $9
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $16
       i32.store offset=32
       local.get $9
       local.get $1
       local.get $16
       call $~lib/math/NativeMath.random
       f64.const 100
       f64.mul
       i32.trunc_sat_f64_u
       call $~lib/staticarray/StaticArray<f64>#__get
       call $~lib/staticarray/StaticArray<f64>#__set
       local.get $1
       i32.const 1
       i32.add
       local.set $1
       br $for-loop|9
      end
     end
     global.get $~lib/memory/__stack_pointer
     local.get $9
     i32.store offset=4
     i32.const 0
     global.set $~argumentsLength
     local.get $9
     call $~lib/staticarray/StaticArray<f64>#sort@varargs
     loop $for-loop|10
      local.get $0
      local.get $20
      i32.lt_s
      if
       i32.const 0
       local.set $1
       loop $for-loop|11
        local.get $1
        i32.const 100
        i32.lt_s
        if
         global.get $~lib/memory/__stack_pointer
         local.get $4
         i32.store offset=4
         global.get $~lib/memory/__stack_pointer
         local.get $18
         i32.store offset=32
         local.get $4
         local.get $1
         local.get $18
         call $~lib/math/NativeMath.random
         f64.const 100
         f64.mul
         i32.trunc_sat_f64_u
         call $~lib/staticarray/StaticArray<f64>#__get
         call $~lib/staticarray/StaticArray<f64>#__set
         local.get $1
         i32.const 1
         i32.add
         local.set $1
         br $for-loop|11
        end
       end
       global.get $~lib/memory/__stack_pointer
       local.get $4
       i32.store offset=4
       i32.const 0
       global.set $~argumentsLength
       local.get $4
       call $~lib/staticarray/StaticArray<f64>#sort@varargs
       global.get $~lib/memory/__stack_pointer
       local.get $10
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $9
       i32.store offset=32
       local.get $9
       call $~lib/__astral__/Stats.mean
       local.set $8
       global.get $~lib/memory/__stack_pointer
       local.get $4
       i32.store offset=32
       local.get $10
       local.get $0
       local.get $8
       local.get $4
       call $~lib/__astral__/Stats.mean
       f64.div
       f64.const -1
       f64.add
       call $~lib/staticarray/StaticArray<f64>#__set
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $9
       i32.store offset=32
       local.get $9
       call $~lib/__astral__/Stats.sorted.median
       local.set $8
       global.get $~lib/memory/__stack_pointer
       local.get $4
       i32.store offset=32
       local.get $2
       local.get $0
       local.get $8
       local.get $4
       call $~lib/__astral__/Stats.sorted.median
       f64.div
       f64.const -1
       f64.add
       call $~lib/staticarray/StaticArray<f64>#__set
       local.get $0
       i32.const 1
       i32.add
       local.set $0
       br $for-loop|10
      end
     end
     local.get $6
     i32.const 1
     i32.add
     local.set $6
     br $for-loop|8
    end
   end
   global.get $~lib/memory/__stack_pointer
   local.get $19
   i32.store offset=4
   i32.const 0
   local.set $2
   i32.const 0
   local.set $0
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   call $~stack_check
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $19
   i32.store
   local.get $19
   call $~lib/staticarray/StaticArray<u64>#get:length
   local.set $1
   loop $for-loop|00
    global.get $~lib/memory/__stack_pointer
    local.get $19
    i32.store
    local.get $19
    call $~lib/staticarray/StaticArray<u64>#get:length
    local.get $0
    i32.gt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $19
     i32.store
     local.get $2
     local.get $19
     local.get $0
     call $~lib/staticarray/StaticArray<f64>#__get
     local.get $5
     f64.lt
     i32.add
     local.set $2
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|00
    end
   end
   local.get $2
   local.get $1
   local.get $2
   i32.sub
   local.tee $0
   local.get $0
   local.get $2
   i32.gt_s
   select
   local.get $1
   i32.div_s
   i32.const 1
   i32.shl
   f64.convert_i32_s
   local.set $5
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
  end
  global.get $~lib/memory/__stack_pointer
  local.get $16
  i32.store offset=4
  local.get $16
  call $~lib/__astral__/Stats.mean
  global.set $~lib/__astral__/meanPoint
  global.get $~lib/memory/__stack_pointer
  local.get $16
  i32.store offset=4
  local.get $16
  global.get $~lib/__astral__/meanPoint
  call $~lib/__astral__/Stats.stdDev
  global.set $~lib/__astral__/stdDevPoint
  global.get $~lib/memory/__stack_pointer
  local.get $16
  i32.store offset=4
  local.get $16
  call $~lib/__astral__/Stats.sorted.median
  global.set $~lib/__astral__/medianPoint
  global.get $~lib/memory/__stack_pointer
  local.get $16
  i32.store offset=4
  local.get $16
  global.get $~lib/__astral__/medianPoint
  call $~lib/__astral__/Stats.sorted.MAD
  global.set $~lib/__astral__/MADPoint
  global.get $~lib/memory/__stack_pointer
  i32.const 100000
  call $~lib/staticarray/StaticArray<f64>#constructor
  local.tee $2
  i32.store offset=52
  global.get $~lib/memory/__stack_pointer
  i32.const 100000
  call $~lib/staticarray/StaticArray<f64>#constructor
  local.tee $6
  i32.store offset=56
  global.get $~lib/memory/__stack_pointer
  i32.const 100000
  call $~lib/staticarray/StaticArray<f64>#constructor
  local.tee $18
  i32.store offset=60
  global.get $~lib/memory/__stack_pointer
  i32.const 100000
  call $~lib/staticarray/StaticArray<f64>#constructor
  local.tee $19
  i32.store offset=64
  i32.const 0
  local.set $1
  loop $for-loop|12
   local.get $1
   i32.const 100000
   i32.lt_s
   if
    i32.const 0
    local.set $0
    loop $for-loop|13
     local.get $0
     i32.const 100
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $4
      i32.store offset=4
      global.get $~lib/memory/__stack_pointer
      local.get $16
      i32.store offset=32
      local.get $4
      local.get $0
      local.get $16
      call $~lib/math/NativeMath.random
      f64.const 100
      f64.mul
      i32.trunc_sat_f64_u
      call $~lib/staticarray/StaticArray<f64>#__get
      call $~lib/staticarray/StaticArray<f64>#__set
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      br $for-loop|13
     end
    end
    global.get $~lib/memory/__stack_pointer
    local.get $4
    i32.store offset=4
    i32.const 0
    global.set $~argumentsLength
    local.get $4
    call $~lib/staticarray/StaticArray<f64>#sort@varargs
    global.get $~lib/memory/__stack_pointer
    local.get $4
    i32.store offset=4
    local.get $4
    call $~lib/__astral__/Stats.mean
    local.set $8
    global.get $~lib/memory/__stack_pointer
    local.get $2
    i32.store offset=4
    local.get $2
    local.get $1
    local.get $8
    call $~lib/staticarray/StaticArray<f64>#__set
    global.get $~lib/memory/__stack_pointer
    local.get $6
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $4
    i32.store offset=32
    local.get $6
    local.get $1
    local.get $4
    local.get $8
    call $~lib/__astral__/Stats.stdDev
    call $~lib/staticarray/StaticArray<f64>#__set
    global.get $~lib/memory/__stack_pointer
    local.get $18
    i32.store offset=4
    local.get $18
    call $~lib/__astral__/Stats.sorted.median
    local.set $8
    global.get $~lib/memory/__stack_pointer
    local.get $18
    i32.store offset=4
    local.get $18
    local.get $1
    local.get $8
    call $~lib/staticarray/StaticArray<f64>#__set
    global.get $~lib/memory/__stack_pointer
    local.get $19
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $4
    i32.store offset=32
    local.get $19
    local.get $1
    local.get $4
    local.get $8
    call $~lib/__astral__/Stats.sorted.MAD
    call $~lib/staticarray/StaticArray<f64>#__set
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|12
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  i32.const 0
  global.set $~argumentsLength
  local.get $2
  call $~lib/staticarray/StaticArray<f64>#sort@varargs
  global.get $~lib/memory/__stack_pointer
  local.get $6
  i32.store offset=4
  i32.const 0
  global.set $~argumentsLength
  local.get $6
  call $~lib/staticarray/StaticArray<f64>#sort@varargs
  global.get $~lib/memory/__stack_pointer
  local.get $18
  i32.store offset=4
  i32.const 0
  global.set $~argumentsLength
  local.get $18
  call $~lib/staticarray/StaticArray<f64>#sort@varargs
  global.get $~lib/memory/__stack_pointer
  local.get $19
  i32.store offset=4
  i32.const 0
  global.set $~argumentsLength
  local.get $19
  call $~lib/staticarray/StaticArray<f64>#sort@varargs
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $2
  call $~lib/__astral__/Stats.sorted.CI.LB
  global.set $~lib/__astral__/meanLB
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store offset=4
  local.get $2
  call $~lib/__astral__/Stats.sorted.CI.HB
  global.set $~lib/__astral__/meanHB
  global.get $~lib/memory/__stack_pointer
  local.get $6
  i32.store offset=4
  local.get $6
  call $~lib/__astral__/Stats.sorted.CI.LB
  global.set $~lib/__astral__/stdDevLB
  global.get $~lib/memory/__stack_pointer
  local.get $6
  i32.store offset=4
  local.get $6
  call $~lib/__astral__/Stats.sorted.CI.HB
  global.set $~lib/__astral__/stdDevHB
  global.get $~lib/memory/__stack_pointer
  local.get $18
  i32.store offset=4
  local.get $18
  call $~lib/__astral__/Stats.sorted.CI.LB
  global.set $~lib/__astral__/medianLB
  global.get $~lib/memory/__stack_pointer
  local.get $18
  i32.store offset=4
  local.get $18
  call $~lib/__astral__/Stats.sorted.CI.HB
  global.set $~lib/__astral__/medianHB
  global.get $~lib/memory/__stack_pointer
  local.get $19
  i32.store offset=4
  local.get $19
  call $~lib/__astral__/Stats.sorted.CI.LB
  global.set $~lib/__astral__/MADLB
  global.get $~lib/memory/__stack_pointer
  local.get $19
  i32.store offset=4
  local.get $19
  call $~lib/__astral__/Stats.sorted.CI.HB
  global.set $~lib/__astral__/MADHB
  i32.const 0
  local.set $0
  loop $for-loop|14
   local.get $0
   i32.const 100
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $3
    i32.store offset=4
    local.get $0
    i32.const 3
    i32.shl
    local.tee $1
    i32.const 1152
    i32.add
    local.get $3
    local.get $0
    call $~lib/staticarray/StaticArray<u64>#__get
    f64.convert_i64_u
    f64.store
    global.get $~lib/memory/__stack_pointer
    local.get $13
    i32.store offset=4
    local.get $1
    i32.const 1952
    i32.add
    local.get $13
    local.get $0
    call $~lib/staticarray/StaticArray<f64>#__get
    f64.store
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|14
   end
  end
  local.get $15
  if
   i32.const 0
   global.set $~lib/__astral__/flags
   global.get $~lib/__astral__/meanLB
   global.get $~lib/__astral__/meanPoint
   global.get $~lib/__astral__/meanHB
   call $~lib/__astral__/result
  else
   i32.const 2
   global.set $~lib/__astral__/flags
   global.get $~lib/memory/__stack_pointer
   i32.const 100
   call $~lib/staticarray/StaticArray<f64>#constructor
   local.tee $2
   i32.store offset=68
   i32.const 0
   local.set $0
   loop $for-loop|15
    local.get $0
    i32.const 100
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.store offset=32
     local.get $2
     local.get $0
     local.get $3
     local.get $0
     call $~lib/staticarray/StaticArray<u64>#__get
     f64.convert_i64_u
     call $~lib/staticarray/StaticArray<f64>#__set
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     br $for-loop|15
    end
   end
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $13
   i32.store offset=32
   local.get $2
   local.get $13
   call $~lib/__astral__/Regression.fit
   global.set $~lib/__astral__/slopePoint
   global.get $~lib/memory/__stack_pointer
   i32.const 100000
   call $~lib/staticarray/StaticArray<f64>#constructor
   local.tee $0
   i32.store offset=72
   i32.const 0
   local.set $6
   loop $for-loop|16
    local.get $6
    i32.const 100000
    i32.lt_s
    if
     i32.const 0
     local.set $1
     loop $for-loop|17
      local.get $1
      i32.const 100
      i32.lt_s
      if
       call $~lib/math/NativeMath.random
       f64.const 100
       f64.mul
       i32.trunc_sat_f64_u
       local.set $3
       global.get $~lib/memory/__stack_pointer
       local.get $9
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=32
       local.get $9
       local.get $1
       local.get $2
       local.get $3
       call $~lib/staticarray/StaticArray<f64>#__get
       call $~lib/staticarray/StaticArray<f64>#__set
       global.get $~lib/memory/__stack_pointer
       local.get $4
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $13
       i32.store offset=32
       local.get $4
       local.get $1
       local.get $13
       local.get $3
       call $~lib/staticarray/StaticArray<f64>#__get
       call $~lib/staticarray/StaticArray<f64>#__set
       local.get $1
       i32.const 1
       i32.add
       local.set $1
       br $for-loop|17
      end
     end
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $9
     i32.store offset=32
     global.get $~lib/memory/__stack_pointer
     local.get $4
     i32.store offset=40
     local.get $0
     local.get $6
     local.get $9
     local.get $4
     call $~lib/__astral__/Regression.fit
     call $~lib/staticarray/StaticArray<f64>#__set
     local.get $6
     i32.const 1
     i32.add
     local.set $6
     br $for-loop|16
    end
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   i32.const 0
   global.set $~argumentsLength
   local.get $0
   call $~lib/staticarray/StaticArray<f64>#sort@varargs
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   call $~lib/__astral__/Stats.sorted.CI.LB
   global.set $~lib/__astral__/slopeLB
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   call $~lib/__astral__/Stats.sorted.CI.HB
   global.set $~lib/__astral__/slopeHB
   global.get $~lib/__astral__/slopeLB
   global.get $~lib/__astral__/slopePoint
   global.get $~lib/__astral__/slopeHB
   call $~lib/__astral__/result
  end
  local.get $10
  if
   global.get $~lib/memory/__stack_pointer
   local.get $10
   i32.store offset=4
   i32.const 0
   global.set $~argumentsLength
   local.get $10
   call $~lib/staticarray/StaticArray<f64>#sort@varargs
   global.get $~lib/memory/__stack_pointer
   local.get $10
   i32.store offset=4
   local.get $10
   call $~lib/__astral__/Stats.sorted.CI.LB
   local.set $8
   global.get $~lib/memory/__stack_pointer
   local.get $10
   i32.store offset=4
   local.get $8
   local.get $7
   local.get $10
   call $~lib/__astral__/Stats.sorted.CI.HB
   local.get $5
   call $~lib/__astral__/change
  end
  global.get $~lib/memory/__stack_pointer
  local.get $16
  i32.store offset=4
  local.get $16
  f64.const 25
  call $~lib/__astral__/Stats.sorted.percentile
  local.set $5
  global.get $~lib/memory/__stack_pointer
  local.get $16
  i32.store offset=4
  local.get $5
  local.get $16
  f64.const 75
  call $~lib/__astral__/Stats.sorted.percentile
  local.tee $7
  local.get $5
  f64.sub
  local.tee $8
  f64.const 3
  f64.mul
  local.tee $17
  f64.sub
  local.set $21
  local.get $5
  local.get $8
  f64.const 1.5
  f64.mul
  local.tee $5
  f64.sub
  local.set $8
  local.get $7
  local.get $5
  f64.add
  local.set $5
  local.get $7
  local.get $17
  f64.add
  local.set $7
  i32.const 0
  local.set $1
  i32.const 0
  local.set $2
  i32.const 0
  local.set $3
  i32.const 0
  local.set $10
  i32.const 0
  local.set $0
  loop $for-loop|18
   local.get $0
   i32.const 100
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $16
    i32.store offset=4
    local.get $16
    local.get $0
    call $~lib/staticarray/StaticArray<f64>#__get
    local.tee $17
    local.get $21
    f64.lt
    if
     local.get $1
     i32.const 1
     i32.add
     local.set $1
    else
     local.get $7
     local.get $17
     f64.lt
     if
      local.get $10
      i32.const 1
      i32.add
      local.set $10
     else
      local.get $8
      local.get $17
      f64.gt
      if
       local.get $2
       i32.const 1
       i32.add
       local.set $2
      else
       local.get $3
       i32.const 1
       i32.add
       local.get $3
       local.get $5
       local.get $17
       f64.lt
       select
       local.set $3
      end
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|18
   end
  end
  local.get $1
  local.get $2
  local.get $3
  local.get $10
  call $~lib/__astral__/outliers
  global.get $~lib/memory/__stack_pointer
  i32.const 76
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/string/String#toUpperCase (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/string/String#get:length
  local.tee $8
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  global.get $~lib/memory/__stack_pointer
  local.get $8
  i32.const 6
  i32.mul
  i32.const 2
  call $~lib/rt/itcms/__new
  local.tee $6
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 4512
  i32.store
  i32.const 4512
  call $~lib/string/String#get:length
  local.set $3
  loop $for-loop|0
   local.get $7
   local.get $8
   i32.lt_u
   if
    local.get $0
    local.get $7
    i32.const 1
    i32.shl
    i32.add
    local.tee $1
    i32.load16_u
    local.tee $2
    i32.const 7
    i32.shr_u
    if
     block $for-continue|0
      local.get $2
      i32.const 55295
      i32.sub
      i32.const 1025
      i32.lt_u
      local.get $7
      local.get $8
      i32.const 1
      i32.sub
      i32.lt_u
      i32.and
      if
       local.get $1
       i32.load16_u offset=2
       local.tee $4
       i32.const 56319
       i32.sub
       i32.const 1025
       i32.lt_u
       if
        local.get $7
        i32.const 1
        i32.add
        local.set $7
        local.get $4
        i32.const 1023
        i32.and
        local.get $2
        local.tee $1
        i32.const 1023
        i32.and
        i32.const 10
        i32.shl
        i32.or
        i32.const 65536
        i32.add
        local.tee $2
        i32.const 131072
        i32.ge_u
        if
         local.get $6
         local.get $5
         i32.const 1
         i32.shl
         i32.add
         local.get $1
         local.get $4
         i32.const 16
         i32.shl
         i32.or
         i32.store
         local.get $5
         i32.const 1
         i32.add
         local.set $5
         br $for-continue|0
        end
       end
      end
      local.get $2
      i32.const 9424
      i32.sub
      i32.const 25
      i32.le_u
      if
       local.get $6
       local.get $5
       i32.const 1
       i32.shl
       i32.add
       local.get $2
       i32.const 26
       i32.sub
       i32.store16
      else
       local.get $2
       i32.const 223
       i32.sub
       i32.const 64056
       i32.le_u
       if (result i32)
        local.get $3
        local.set $1
        i32.const 0
        local.set $9
        block $~lib/util/casemap/bsearch|inlined.0
         loop $while-continue|1
          local.get $1
          local.get $9
          i32.ge_s
          if
           local.get $1
           local.get $9
           i32.add
           i32.const 3
           i32.shr_u
           i32.const 2
           i32.shl
           local.tee $4
           i32.const 1
           i32.shl
           i32.const 4512
           i32.add
           i32.load16_u
           local.get $2
           i32.sub
           local.tee $10
           i32.eqz
           br_if $~lib/util/casemap/bsearch|inlined.0
           local.get $10
           i32.const 31
           i32.shr_u
           if
            local.get $4
            i32.const 4
            i32.add
            local.set $9
           else
            local.get $4
            i32.const 4
            i32.sub
            local.set $1
           end
           br $while-continue|1
          end
         end
         i32.const -1
         local.set $4
        end
        local.get $4
       else
        i32.const -1
       end
       local.tee $1
       i32.const -1
       i32.xor
       if
        local.get $1
        i32.const 1
        i32.shl
        i32.const 4512
        i32.add
        local.tee $1
        i32.load16_u offset=6
        local.set $2
        local.get $6
        local.get $5
        i32.const 1
        i32.shl
        i32.add
        local.tee $4
        local.get $1
        i32.load offset=2
        i32.store
        local.get $4
        local.get $2
        i32.store16 offset=4
        local.get $5
        local.get $2
        i32.const 0
        i32.ne
        i32.const 1
        i32.add
        i32.add
        local.set $5
       else
        local.get $2
        call $~lib/util/casemap/casemap
        i32.const 2097151
        i32.and
        local.tee $1
        i32.const 65536
        i32.lt_u
        if
         local.get $6
         local.get $5
         i32.const 1
         i32.shl
         i32.add
         local.get $1
         i32.store16
        else
         local.get $6
         local.get $5
         i32.const 1
         i32.shl
         i32.add
         local.get $1
         i32.const 65536
         i32.sub
         local.tee $1
         i32.const 10
         i32.shr_u
         i32.const 55296
         i32.or
         local.get $1
         i32.const 1023
         i32.and
         i32.const 56320
         i32.or
         i32.const 16
         i32.shl
         i32.or
         i32.store
         local.get $5
         i32.const 1
         i32.add
         local.set $5
        end
       end
      end
     end
    else
     local.get $6
     local.get $5
     i32.const 1
     i32.shl
     i32.add
     local.get $2
     local.get $2
     i32.const 97
     i32.sub
     i32.const 26
     i32.lt_u
     i32.const 5
     i32.shl
     i32.const -1
     i32.xor
     i32.and
     i32.store16
    end
    local.get $7
    i32.const 1
    i32.add
    local.set $7
    local.get $5
    i32.const 1
    i32.add
    local.set $5
    br $for-loop|0
   end
  end
  local.get $6
  local.get $5
  i32.const 1
  i32.shl
  call $~lib/rt/itcms/__renew
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/mp/MpZ#_uhex (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 20
  memory.fill
  i32.const 2912
  local.set $4
  global.get $~lib/memory/__stack_pointer
  i32.const 2912
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load
  local.tee $1
  i32.store offset=4
  local.get $1
  call $~lib/staticarray/StaticArray<u32>#get:length
  i32.const 1
  i32.sub
  local.set $5
  loop $for-loop|0
   local.get $5
   i32.const 0
   i32.ge_s
   if
    global.get $~lib/memory/__stack_pointer
    local.set $3
    global.get $~lib/memory/__stack_pointer
    local.get $4
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $1
    i32.store offset=12
    local.get $1
    local.get $5
    call $~lib/staticarray/StaticArray<u32>#__uget
    local.set $1
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=16
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load
    local.tee $2
    i32.store offset=12
    local.get $5
    local.get $2
    call $~lib/staticarray/StaticArray<u32>#get:length
    i32.const 1
    i32.sub
    i32.ne
    local.set $2
    global.get $~lib/memory/__stack_pointer
    i32.const 16
    i32.sub
    global.set $~lib/memory/__stack_pointer
    call $~stack_check
    global.get $~lib/memory/__stack_pointer
    i64.const 0
    i64.store
    global.get $~lib/memory/__stack_pointer
    i64.const 0
    i64.store offset=8
    global.get $~lib/memory/__stack_pointer
    local.set $6
    local.get $1
    i32.const 16
    call $~lib/number/U32#toString
    local.set $1
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store
    local.get $6
    local.get $1
    call $~lib/string/String#toUpperCase
    local.tee $1
    i32.store offset=4
    local.get $2
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 9920
     i32.store offset=8
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=12
     i32.const 9920
     local.get $1
     call $~lib/string/String.__concat
     local.set $2
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=8
     local.get $1
     call $~lib/string/String#get:length
     local.set $1
     i32.const 1
     global.set $~argumentsLength
     local.get $2
     local.get $1
     call $~lib/string/String#substr@varargs
     local.set $1
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 16
    i32.add
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=8
    local.get $3
    local.get $4
    local.get $1
    call $~lib/string/String.__concat
    local.tee $4
    i32.store
    local.get $5
    i32.const 1
    i32.sub
    local.set $5
    br $for-loop|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 20
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $4
 )
 (func $start:assembly/__benches__/to-string~anonymous|1
  (local $0 i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  global.get $assembly/__benches__/to-string/input
  local.tee $0
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/mp/MpZ#eqz
  if (result i32)
   i32.const 4480
  else
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.get $0
   call $assembly/mp/MpZ#_uhex
   local.tee $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   i32.load8_u offset=4
   if (result i32)
    global.get $~lib/memory/__stack_pointer
    i32.const 9968
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=8
    i32.const 9968
    local.get $1
    call $~lib/string/String#concat
   else
    global.get $~lib/memory/__stack_pointer
    i32.const 10000
    i32.store
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.store offset=8
    i32.const 10000
    local.get $1
    call $~lib/string/String#concat
   end
  end
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/__astral__/blackbox<assembly/mp/MpZ>
  drop
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/util/number/utoa32 (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i64)
  (local $4 i32)
  (local $5 i64)
  (local $6 i64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $1
  i32.const 2
  i32.lt_s
  local.get $1
  i32.const 36
  i32.gt_s
  i32.or
  if
   i32.const 3664
   i32.const 3792
   i32.const 350
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  block $folding-inner0
   local.get $0
   i32.eqz
   if
    i32.const 2784
    local.set $1
    br $folding-inner0
   end
   local.get $1
   i32.const 10
   i32.eq
   if
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.const 10
    i32.ge_u
    i32.const 1
    i32.add
    local.get $0
    i32.const 10000
    i32.ge_u
    i32.const 3
    i32.add
    local.get $0
    i32.const 1000
    i32.ge_u
    i32.add
    local.get $0
    i32.const 100
    i32.lt_u
    select
    local.get $0
    i32.const 1000000
    i32.ge_u
    i32.const 6
    i32.add
    local.get $0
    i32.const 1000000000
    i32.ge_u
    i32.const 8
    i32.add
    local.get $0
    i32.const 100000000
    i32.ge_u
    i32.add
    local.get $0
    i32.const 10000000
    i32.lt_u
    select
    local.get $0
    i32.const 100000
    i32.lt_u
    select
    local.tee $4
    i32.const 1
    i32.shl
    i32.const 2
    call $~lib/rt/itcms/__new
    local.tee $1
    i32.store
    loop $do-loop|0
     local.get $1
     local.get $4
     i32.const 1
     i32.sub
     local.tee $4
     i32.const 1
     i32.shl
     i32.add
     local.get $0
     i32.const 10
     i32.rem_u
     i32.const 48
     i32.add
     i32.store16
     local.get $0
     i32.const 10
     i32.div_u
     local.tee $0
     br_if $do-loop|0
    end
   else
    local.get $1
    i32.const 16
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 31
     local.get $0
     i32.clz
     i32.sub
     i32.const 2
     i32.shr_s
     i32.const 1
     i32.add
     local.tee $4
     i32.const 1
     i32.shl
     i32.const 2
     call $~lib/rt/itcms/__new
     local.tee $1
     i32.store
     loop $do-loop|00
      local.get $1
      local.get $4
      i32.const 1
      i32.sub
      local.tee $4
      i32.const 1
      i32.shl
      i32.add
      local.get $0
      i32.const 15
      i32.and
      i32.const 48
      i32.or
      local.tee $2
      i32.const 39
      i32.const 0
      local.get $2
      i32.const 57
      i32.gt_u
      select
      i32.add
      i32.store16
      local.get $0
      i32.const 4
      i32.shr_u
      local.tee $0
      br_if $do-loop|00
     end
    else
     global.get $~lib/memory/__stack_pointer
     block $__inlined_func$~lib/util/number/ulog_base$132 (result i32)
      local.get $0
      i64.extend_i32_u
      local.set $5
      local.get $1
      local.tee $2
      i32.popcnt
      i32.const 1
      i32.eq
      if
       i32.const 63
       local.get $5
       i64.clz
       i32.wrap_i64
       i32.sub
       i32.const 31
       local.get $1
       i32.clz
       i32.sub
       i32.div_u
       i32.const 1
       i32.add
       br $__inlined_func$~lib/util/number/ulog_base$132
      end
      local.get $2
      i64.extend_i32_s
      local.tee $6
      local.set $3
      i32.const 1
      local.set $1
      loop $while-continue|0
       local.get $3
       local.get $5
       i64.le_u
       if
        local.get $5
        local.get $3
        i64.div_u
        local.set $5
        local.get $3
        local.get $3
        i64.mul
        local.set $3
        local.get $1
        i32.const 1
        i32.shl
        local.set $1
        br $while-continue|0
       end
      end
      loop $while-continue|1
       local.get $5
       i64.const 0
       i64.ne
       if
        local.get $5
        local.get $6
        i64.div_u
        local.set $5
        local.get $1
        i32.const 1
        i32.add
        local.set $1
        br $while-continue|1
       end
      end
      local.get $1
      i32.const 1
      i32.sub
     end
     local.tee $4
     i32.const 1
     i32.shl
     i32.const 2
     call $~lib/rt/itcms/__new
     local.tee $1
     i32.store
     local.get $0
     i64.extend_i32_u
     local.set $3
     local.get $2
     i64.extend_i32_s
     local.set $5
     local.get $2
     local.get $2
     i32.const 1
     i32.sub
     i32.and
     if
      loop $do-loop|1
       local.get $1
       local.get $4
       i32.const 1
       i32.sub
       local.tee $4
       i32.const 1
       i32.shl
       i32.add
       local.get $3
       local.get $3
       local.get $5
       i64.div_u
       local.tee $3
       local.get $5
       i64.mul
       i64.sub
       i32.wrap_i64
       i32.const 1
       i32.shl
       i32.const 3856
       i32.add
       i32.load16_u
       i32.store16
       local.get $3
       i64.const 0
       i64.ne
       br_if $do-loop|1
      end
     else
      local.get $2
      i32.ctz
      i32.const 7
      i32.and
      i64.extend_i32_s
      local.set $6
      local.get $5
      i64.const 1
      i64.sub
      local.set $5
      loop $do-loop|01
       local.get $1
       local.get $4
       i32.const 1
       i32.sub
       local.tee $4
       i32.const 1
       i32.shl
       i32.add
       local.get $3
       local.get $5
       i64.and
       i32.wrap_i64
       i32.const 1
       i32.shl
       i32.const 3856
       i32.add
       i32.load16_u
       i32.store16
       local.get $3
       local.get $6
       i64.shr_u
       local.tee $3
       i64.const 0
       i64.ne
       br_if $do-loop|01
      end
     end
    end
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $~lib/rt/__newArray (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.const 2
  i32.shl
  local.tee $2
  i32.const 1
  local.get $1
  call $~lib/rt/__newBuffer
  local.tee $3
  i32.store
  i32.const 16
  i32.const 6
  call $~lib/rt/itcms/__new
  local.tee $1
  local.get $3
  i32.store
  local.get $1
  local.get $3
  i32.const 0
  call $~lib/rt/itcms/__link
  local.get $1
  local.get $3
  i32.store offset=4
  local.get $1
  local.get $2
  i32.store offset=8
  local.get $1
  local.get $0
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $~lib/staticarray/StaticArray<u64>#constructor (result i32)
  (local $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 800
  i32.const 11
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/staticarray/StaticArray<f64>#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 134217727
  i32.gt_u
  if
   i32.const 2816
   i32.const 3344
   i32.const 51
   i32.const 60
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.const 3
  i32.shl
  i32.const 12
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $byn$mgfn-shared$~lib/__astral__/Stats.sorted.CI.LB (param $0 i32) (param $1 f64) (result f64)
  (local $2 f64)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  call $~lib/__astral__/Stats.sorted.percentile
  local.set $2
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
)
