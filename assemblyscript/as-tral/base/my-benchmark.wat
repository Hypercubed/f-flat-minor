(module
 (type $0 (func (param i32) (result i32)))
 (type $1 (func (param i32 i32)))
 (type $2 (func))
 (type $3 (func (param i32)))
 (type $4 (func (param f64 f64) (result i32)))
 (type $5 (func (param i32 i32) (result f64)))
 (type $6 (func (param i32 f64) (result f64)))
 (type $7 (func (param i32) (result f64)))
 (type $8 (func (param i32 i32 i32)))
 (type $9 (func (param i32 i32) (result i32)))
 (type $10 (func (result f64)))
 (type $11 (func (param i32 i32 i32 i32)))
 (type $12 (func (param i32 i32 i64)))
 (type $13 (func (result i32)))
 (type $14 (func (param f64 f64 i32 i32) (result f64)))
 (type $15 (func (param i32 i32 i32) (result i32)))
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
 (global $assembly/__benches__/my-benchmark/input (mut i32) (i32.const 0))
 (global $~argumentsLength (mut i32) (i32.const 0))
 (global $~lib/math/random_seeded (mut i32) (i32.const 0))
 (global $~lib/math/random_state0_64 (mut i64) (i64.const 0))
 (global $~lib/math/random_state1_64 (mut i64) (i64.const 0))
 (global $~lib/math/random_state0_32 (mut i32) (i32.const 0))
 (global $~lib/memory/__stack_pointer (mut i32) (i32.const 36464))
 (global $~started (mut i32) (i32.const 0))
 (memory $0 1)
 (data $3 (i32.const 2764) "l")
 (data $3.1 (i32.const 2776) "\02\00\00\00Z\00\00\00T\00h\00e\00 \00q\00u\00i\00c\00k\00 \00b\00r\00o\00w\00n\00 \00f\00o\00x\00 \00j\00u\00m\00p\00e\00d\00 \00o\00v\00e\00r\00 \00t\00h\00e\00 \00l\00a\00z\00y\00 \00d\00o\00g\00.")
 (data $4 (i32.const 2876) ",")
 (data $4.1 (i32.const 2888) "\02\00\00\00\1c\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00l\00e\00n\00g\00t\00h")
 (data $5 (i32.const 2924) ",")
 (data $5.1 (i32.const 2936) "\02\00\00\00\1c\00\00\00~\00l\00i\00b\00/\00s\00t\00r\00i\00n\00g\00.\00t\00s")
 (data $6 (i32.const 2972) "\1c")
 (data $6.1 (i32.const 2984) "\02")
 (data $7 (i32.const 3004) "<")
 (data $7.1 (i32.const 3016) "\02\00\00\00(\00\00\00A\00l\00l\00o\00c\00a\00t\00i\00o\00n\00 \00t\00o\00o\00 \00l\00a\00r\00g\00e")
 (data $8 (i32.const 3068) "<")
 (data $8.1 (i32.const 3080) "\02\00\00\00 \00\00\00~\00l\00i\00b\00/\00r\00t\00/\00i\00t\00c\00m\00s\00.\00t\00s")
 (data $11 (i32.const 3196) "<")
 (data $11.1 (i32.const 3208) "\02\00\00\00$\00\00\00I\00n\00d\00e\00x\00 \00o\00u\00t\00 \00o\00f\00 \00r\00a\00n\00g\00e")
 (data $12 (i32.const 3260) ",")
 (data $12.1 (i32.const 3272) "\02\00\00\00\14\00\00\00~\00l\00i\00b\00/\00r\00t\00.\00t\00s")
 (data $14 (i32.const 3340) "<")
 (data $14.1 (i32.const 3352) "\02\00\00\00\1e\00\00\00~\00l\00i\00b\00/\00r\00t\00/\00t\00l\00s\00f\00.\00t\00s")
 (data $15 (i32.const 3404) "\1c")
 (data $15.1 (i32.const 3416) "\02\00\00\00\02\00\00\00 ")
 (data $16 (i32.const 3436) ",")
 (data $16.1 (i32.const 3448) "\02\00\00\00\1a\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00.\00t\00s")
 (data $17 (i32.const 3484) "\1c")
 (data $17.1 (i32.const 3496) "\06\00\00\00\08\00\00\00\01")
 (data $18 (i32.const 3516) "<")
 (data $18.1 (i32.const 3528) "\02\00\00\00&\00\00\00~\00l\00i\00b\00/\00s\00t\00a\00t\00i\00c\00a\00r\00r\00a\00y\00.\00t\00s")
 (data $19 (i32.const 3580) "\1c")
 (data $19.1 (i32.const 3592) "\t\00\00\00\08\00\00\00\02")
 (data $20 (i32.const 3612) "\1c")
 (data $20.1 (i32.const 3624) "\n\00\00\00\08\00\00\00\03")
 (data $21 (i32.const 3648) "\0b\00\00\00 \00\00\00 \00\00\00 \00\00\00\00\00\00\00\02A\00\00\02\t\00\00\00\00\00\00$\02\00\00$\1a")
 (table $0 4 4 funcref)
 (elem $0 (i32.const 1) $start:assembly/__benches__/my-benchmark~anonymous|0 $~lib/util/sort/COMPARATOR<f64>~anonymous|0 $~lib/__astral__/Stats.mean~anonymous|0)
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
  global.get $assembly/__benches__/my-benchmark/input
  local.tee $0
  if
   local.get $0
   call $~lib/rt/itcms/__visit
  end
  i32.const 3216
  call $~lib/rt/itcms/__visit
  i32.const 2896
  call $~lib/rt/itcms/__visit
  i32.const 3024
  call $~lib/rt/itcms/__visit
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
     i32.const 3088
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
    i32.const 3088
    i32.const 148
    i32.const 30
    call $~lib/builtins/abort
    unreachable
   end
   local.get $1
   global.set $~lib/rt/itcms/iter
  end
  block $__inlined_func$~lib/rt/itcms/Object#unlink$72
   local.get $0
   call $~lib/rt/itcms/Object#get:next
   local.tee $1
   i32.eqz
   if
    local.get $0
    i32.load offset=8
    i32.eqz
    local.get $0
    i32.const 36464
    i32.lt_u
    i32.and
    i32.eqz
    if
     i32.const 0
     i32.const 3088
     i32.const 128
     i32.const 18
     call $~lib/builtins/abort
     unreachable
    end
    br $__inlined_func$~lib/rt/itcms/Object#unlink$72
   end
   local.get $0
   i32.load offset=8
   local.tee $2
   i32.eqz
   if
    i32.const 0
    i32.const 3088
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
   i32.const 3648
   i32.load
   i32.gt_u
   if
    i32.const 3216
    i32.const 3280
    i32.const 21
    i32.const 28
    call $~lib/builtins/abort
    unreachable
   end
   local.get $2
   i32.const 2
   i32.shl
   i32.const 3652
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
   i32.const 3360
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
   i32.const 3360
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
   i32.const 3360
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
   i32.const 3360
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
   i32.const 3360
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
    i32.const 3360
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
   i32.const 3360
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
   i32.const 3360
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
   i32.const 3360
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
   i32.const 3360
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
    i32.const 3360
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
    i32.const 3360
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
  i32.const 36464
  i32.const 0
  call $~lib/rt/tlsf/Root#set:flMap
  i32.const 38032
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
    i32.const 36464
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
      i32.const 36464
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
  i32.const 36464
  i32.const 38036
  memory.size
  i64.extend_i32_s
  i64.const 16
  i64.shl
  call $~lib/rt/tlsf/addMemory
  i32.const 36464
  global.set $~lib/rt/tlsf/ROOT
 )
 (func $~lib/rt/tlsf/__free (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  i32.const 36464
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
   i32.const 3360
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
      i32.const 36464
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
     i32.const 3088
     i32.const 229
     i32.const 20
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 36464
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
   i32.const 3360
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
     i32.const 3360
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
   i32.const 3024
   i32.const 3360
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
    i32.const 3360
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
   i32.const 3360
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
   i32.const 3360
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
   i32.const 3024
   i32.const 3088
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
 (func $~lib/__astral__/blackbox<~lib/string/String> (param $0 i32) (result i32)
  i32.const 1024
  local.get $0
  i32.store
  i32.const 1024
  i32.load
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
   i32.const 3088
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
       call_indirect (type $4)
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
  call_indirect (type $4)
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
     call_indirect (type $4)
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
     call_indirect (type $4)
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
    call_indirect (type $4)
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
 (func $~lib/rt/__visit_members (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  block $folding-inner1
   block $folding-inner0
    block $invalid
     block $~lib/staticarray/StaticArray<f64>
      block $~lib/staticarray/StaticArray<u64>
       block $~lib/array/Array<i32>
        block $~lib/array/Array<~lib/string/String>
         block $~lib/arraybuffer/ArrayBufferView
          block $~lib/string/String
           block $~lib/arraybuffer/ArrayBuffer
            block $~lib/object/Object
             local.get $0
             i32.const 8
             i32.sub
             i32.load
             br_table $~lib/object/Object $~lib/arraybuffer/ArrayBuffer $~lib/string/String $~lib/arraybuffer/ArrayBufferView $~lib/array/Array<~lib/string/String> $~lib/array/Array<i32> $folding-inner0 $~lib/staticarray/StaticArray<u64> $~lib/staticarray/StaticArray<f64> $folding-inner0 $folding-inner0 $invalid
            end
            return
           end
           return
          end
          return
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
        br $folding-inner1
       end
       global.get $~lib/memory/__stack_pointer
       i32.const 4
       i32.sub
       global.set $~lib/memory/__stack_pointer
       call $~stack_check
       global.get $~lib/memory/__stack_pointer
       i32.const 0
       i32.store
       br $folding-inner1
      end
      return
     end
     return
    end
    unreachable
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
   return
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
  memory.size
  i32.const 16
  i32.shl
  i32.const 36464
  i32.sub
  i32.const 1
  i32.shr_u
  global.set $~lib/rt/itcms/threshold
  i32.const 3136
  call $~lib/rt/itcms/initLazy
  global.set $~lib/rt/itcms/pinSpace
  i32.const 3168
  call $~lib/rt/itcms/initLazy
  global.set $~lib/rt/itcms/toSpace
  i32.const 3312
  call $~lib/rt/itcms/initLazy
  global.set $~lib/rt/itcms/fromSpace
  global.get $~lib/memory/__stack_pointer
  i32.const 2784
  i32.store offset=4
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
  local.tee $2
  i64.extend_i32_s
  i64.const 10
  i64.mul
  i64.const 268435456
  i64.gt_u
  if
   i32.const 2896
   i32.const 2944
   i32.const 334
   i32.const 7
   call $~lib/builtins/abort
   unreachable
  end
  block $folding-inner0
   local.get $2
   i32.eqz
   if
    i32.const 2992
    local.set $0
    br $folding-inner0
   end
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.const 20
   i32.mul
   i32.const 2
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store offset=4
   local.get $2
   i32.const 1
   i32.shl
   local.tee $2
   i32.const 10
   i32.mul
   local.set $3
   loop $while-continue|0
    local.get $1
    local.get $3
    i32.lt_u
    if
     local.get $0
     local.get $1
     i32.add
     i32.const 2784
     local.get $2
     memory.copy
     local.get $1
     local.get $2
     i32.add
     local.set $1
     br $while-continue|0
    end
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/__astral__/blackbox<~lib/string/String>
  global.set $assembly/__benches__/my-benchmark/input
  global.get $~lib/memory/__stack_pointer
  i32.const 3504
  i32.store
  call $~lib/__astral__/bench
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 3696
  i32.lt_s
  if
   i32.const 36496
   i32.const 36544
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
 )
 (func $~lib/array/ensureCapacity (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
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
  local.tee $2
  i32.const 2
  i32.shr_u
  i32.gt_u
  if
   local.get $1
   i32.const 268435455
   i32.gt_u
   if
    i32.const 2896
    i32.const 3456
    i32.const 19
    i32.const 48
    call $~lib/builtins/abort
    unreachable
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   block $__inlined_func$~lib/rt/itcms/__renew$82
    i32.const 1073741820
    local.get $2
    i32.const 1
    i32.shl
    local.tee $2
    local.get $2
    i32.const 1073741820
    i32.ge_u
    select
    local.tee $2
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
    local.get $2
    i32.lt_u
    select
    local.tee $3
    local.get $0
    i32.load
    local.tee $2
    i32.const 20
    i32.sub
    local.tee $4
    i32.load
    i32.const -4
    i32.and
    i32.const 16
    i32.sub
    i32.le_u
    if
     local.get $4
     local.get $3
     call $~lib/rt/itcms/Object#set:rtSize
     local.get $2
     local.set $1
     br $__inlined_func$~lib/rt/itcms/__renew$82
    end
    local.get $3
    local.get $4
    i32.load offset=12
    call $~lib/rt/itcms/__new
    local.tee $1
    local.get $2
    local.get $3
    local.get $4
    i32.load offset=16
    local.tee $4
    local.get $3
    local.get $4
    i32.lt_u
    select
    memory.copy
   end
   local.get $1
   local.get $2
   i32.ne
   if
    local.get $0
    local.get $1
    i32.store
    local.get $0
    local.get $1
    i32.store offset=4
    local.get $0
    local.get $1
    i32.const 0
    call $~lib/rt/itcms/__link
   end
   local.get $0
   local.get $3
   i32.store offset=8
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/string/String#indexOf (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
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
  local.get $1
  i32.store
  block $folding-inner1
   local.get $1
   call $~lib/string/String#get:length
   local.tee $4
   i32.eqz
   br_if $folding-inner1
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   call $~lib/string/String#get:length
   local.tee $3
   if
    local.get $2
    i32.const 0
    local.get $2
    i32.const 0
    i32.gt_s
    select
    local.tee $2
    local.get $3
    local.get $2
    local.get $3
    i32.lt_s
    select
    local.set $6
    local.get $3
    local.get $4
    i32.sub
    local.set $8
    loop $for-loop|0
     local.get $6
     local.get $8
     i32.le_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store
      global.get $~lib/memory/__stack_pointer
      local.get $1
      i32.store offset=4
      local.get $4
      local.set $2
      local.get $0
      local.get $6
      i32.const 1
      i32.shl
      i32.add
      local.set $7
      local.get $1
      local.set $3
      block $__inlined_func$~lib/util/string/compareImpl$56
       loop $while-continue|0
        local.get $2
        local.tee $5
        i32.const 1
        i32.sub
        local.set $2
        local.get $5
        if
         local.get $7
         i32.load16_u
         local.tee $10
         local.get $3
         i32.load16_u
         local.tee $9
         i32.sub
         local.set $5
         local.get $9
         local.get $10
         i32.ne
         br_if $__inlined_func$~lib/util/string/compareImpl$56
         local.get $7
         i32.const 2
         i32.add
         local.set $7
         local.get $3
         i32.const 2
         i32.add
         local.set $3
         br $while-continue|0
        end
       end
       i32.const 0
       local.set $5
      end
      local.get $5
      i32.eqz
      br_if $folding-inner1
      local.get $6
      i32.const 1
      i32.add
      local.set $6
      br $for-loop|0
     end
    end
   end
   i32.const -1
   local.set $6
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $6
 )
 (func $~lib/array/Array<~lib/string/String>#push (param $0 i32) (param $1 i32)
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
  local.tee $2
  i32.const 1
  i32.add
  local.tee $3
  call $~lib/array/ensureCapacity
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  i32.load offset=4
  local.get $2
  i32.const 2
  i32.shl
  i32.add
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
  local.get $3
  call $~lib/rt/itcms/Object#set:rtId
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/string/String#split (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 40
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.const 40
  memory.fill
  block $folding-inner3
   block $folding-inner2
    block $folding-inner1
     block $folding-inner0
      local.get $2
      i32.eqz
      br_if $folding-inner0
      local.get $1
      i32.eqz
      if
       global.get $~lib/memory/__stack_pointer
       i32.const 1
       call $~lib/rt/__newArray
       local.tee $1
       i32.store
       global.get $~lib/memory/__stack_pointer
       local.get $1
       i32.load offset=4
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
       local.get $1
       i32.store
       local.get $1
       i32.load offset=12
       i32.eqz
       if
        local.get $1
        i32.const 1
        call $~lib/array/ensureCapacity
        global.get $~lib/memory/__stack_pointer
        local.get $1
        i32.store
        local.get $1
        i32.const 1
        call $~lib/rt/itcms/Object#set:rtId
       end
       global.get $~lib/memory/__stack_pointer
       local.get $1
       i32.store
       local.get $1
       i32.load offset=4
       local.get $0
       i32.store
       local.get $1
       local.get $0
       i32.const 1
       call $~lib/rt/itcms/__link
       global.get $~lib/memory/__stack_pointer
       i32.const 4
       i32.add
       global.set $~lib/memory/__stack_pointer
       global.get $~lib/memory/__stack_pointer
       i32.const 40
       i32.add
       global.set $~lib/memory/__stack_pointer
       local.get $1
       return
      end
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=8
      local.get $0
      call $~lib/string/String#get:length
      local.set $6
      global.get $~lib/memory/__stack_pointer
      local.get $1
      i32.store offset=8
      i32.const 2147483647
      local.get $2
      local.get $2
      i32.const 0
      i32.lt_s
      select
      local.set $8
      local.get $1
      call $~lib/string/String#get:length
      local.tee $4
      if
       local.get $6
       i32.eqz
       if
        global.get $~lib/memory/__stack_pointer
        i32.const 1
        call $~lib/rt/__newArray
        local.tee $0
        i32.store offset=20
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=8
        local.get $0
        i32.load offset=4
        i32.const 2992
        i32.store
        br $folding-inner1
       end
      else
       local.get $6
       i32.eqz
       br_if $folding-inner0
       global.get $~lib/memory/__stack_pointer
       local.get $6
       local.get $8
       local.get $6
       local.get $8
       i32.lt_s
       select
       local.tee $3
       call $~lib/rt/__newArray
       local.tee $2
       i32.store offset=12
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=8
       local.get $2
       i32.load offset=4
       local.set $4
       i32.const 0
       local.set $1
       loop $for-loop|0
        local.get $1
        local.get $3
        i32.lt_s
        if
         global.get $~lib/memory/__stack_pointer
         i32.const 2
         i32.const 2
         call $~lib/rt/itcms/__new
         local.tee $5
         i32.store offset=16
         local.get $5
         local.get $0
         local.get $1
         i32.const 1
         i32.shl
         i32.add
         i32.load16_u
         i32.store16
         local.get $4
         local.get $1
         i32.const 2
         i32.shl
         i32.add
         local.get $5
         i32.store
         local.get $2
         local.get $5
         i32.const 1
         call $~lib/rt/itcms/__link
         local.get $1
         i32.const 1
         i32.add
         local.set $1
         br $for-loop|0
        end
       end
       br $folding-inner3
      end
      global.get $~lib/memory/__stack_pointer
      i32.const 0
      call $~lib/rt/__newArray
      local.tee $2
      i32.store offset=24
      loop $while-continue|1
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=8
       global.get $~lib/memory/__stack_pointer
       local.get $1
       i32.store offset=28
       local.get $0
       local.get $1
       local.get $3
       call $~lib/string/String#indexOf
       local.tee $9
       i32.const -1
       i32.xor
       if
        local.get $9
        local.get $3
        i32.sub
        local.tee $7
        i32.const 0
        i32.gt_s
        if
         global.get $~lib/memory/__stack_pointer
         local.get $7
         i32.const 1
         i32.shl
         local.tee $10
         i32.const 2
         call $~lib/rt/itcms/__new
         local.tee $7
         i32.store offset=32
         local.get $7
         local.get $0
         local.get $3
         i32.const 1
         i32.shl
         i32.add
         local.get $10
         memory.copy
         global.get $~lib/memory/__stack_pointer
         local.get $2
         i32.store offset=8
         global.get $~lib/memory/__stack_pointer
         local.get $7
         i32.store offset=28
         local.get $2
         local.get $7
         call $~lib/array/Array<~lib/string/String>#push
        else
         global.get $~lib/memory/__stack_pointer
         local.get $2
         i32.store offset=8
         global.get $~lib/memory/__stack_pointer
         i32.const 2992
         i32.store offset=28
         local.get $2
         i32.const 2992
         call $~lib/array/Array<~lib/string/String>#push
        end
        local.get $5
        i32.const 1
        i32.add
        local.tee $5
        local.get $8
        i32.eq
        br_if $folding-inner2
        local.get $4
        local.get $9
        i32.add
        local.set $3
        br $while-continue|1
       end
      end
      local.get $3
      i32.eqz
      if
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=8
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=28
       local.get $2
       local.get $0
       call $~lib/array/Array<~lib/string/String>#push
       br $folding-inner2
      end
      local.get $6
      local.get $3
      i32.sub
      local.tee $1
      i32.const 0
      i32.gt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.get $1
       i32.const 1
       i32.shl
       local.tee $1
       i32.const 2
       call $~lib/rt/itcms/__new
       local.tee $4
       i32.store offset=36
       local.get $4
       local.get $0
       local.get $3
       i32.const 1
       i32.shl
       i32.add
       local.get $1
       memory.copy
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=8
       global.get $~lib/memory/__stack_pointer
       local.get $4
       i32.store offset=28
       local.get $2
       local.get $4
       call $~lib/array/Array<~lib/string/String>#push
      else
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=8
       global.get $~lib/memory/__stack_pointer
       i32.const 2992
       i32.store offset=28
       local.get $2
       i32.const 2992
       call $~lib/array/Array<~lib/string/String>#push
      end
      br $folding-inner3
     end
     i32.const 0
     call $~lib/rt/__newArray
     local.set $0
    end
    global.get $~lib/memory/__stack_pointer
    i32.const 40
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $0
    return
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 40
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $2
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 40
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $start:assembly/__benches__/my-benchmark~anonymous|0
  (local $0 i32)
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
  global.get $assembly/__benches__/my-benchmark/input
  local.tee $2
  i32.store offset=4
  i32.const 3424
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 3424
  i32.store offset=8
  i32.const 1
  global.set $~argumentsLength
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  block $2of2
   block $1of2
    block $0of2
     block $outOfRange
      global.get $~argumentsLength
      br_table $0of2 $1of2 $2of2 $outOfRange
     end
     unreachable
    end
    i32.const 0
    local.set $0
   end
   i32.const 2147483647
   local.set $1
  end
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.store
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $2
  local.get $0
  local.get $1
  call $~lib/string/String#split
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/__astral__/blackbox<~lib/string/String>
  drop
  global.get $~lib/memory/__stack_pointer
  i32.const 12
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
   i32.const 3216
   i32.const 3536
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
   i32.const 3216
   i32.const 3536
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
   i32.const 3216
   i32.const 3536
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
   i32.const 3600
   local.set $1
   global.get $~lib/memory/__stack_pointer
   i32.const 3600
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
   i32.const 3216
   i32.const 3536
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
  i32.const 3632
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
    i32.const 3632
    i32.load
    call_indirect (type $14)
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
 (func $~lib/__astral__/bench
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 f64)
  (local $4 i32)
  (local $5 i32)
  (local $6 f64)
  (local $7 f64)
  (local $8 i64)
  (local $9 i32)
  (local $10 i64)
  (local $11 i32)
  (local $12 i64)
  (local $13 i32)
  (local $14 i32)
  (local $15 f64)
  (local $16 i32)
  (local $17 i32)
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
  local.set $8
  i32.const 0
  call $~lib/__astral__/warmup
  loop $while-continue|0
   call $~lib/__astral__/now
   local.set $15
   i64.const 0
   local.set $10
   loop $for-loop|1
    local.get $8
    local.get $10
    i64.gt_u
    if
     i32.const 0
     global.set $~argumentsLength
     i32.const 3504
     i32.load
     call_indirect (type $2)
     local.get $10
     i64.const 1
     i64.add
     local.set $10
     br $for-loop|1
    end
   end
   local.get $8
   local.get $12
   i64.add
   local.set $12
   local.get $6
   call $~lib/__astral__/now
   local.get $15
   f64.sub
   f64.add
   local.tee $6
   f64.const 3e3
   f64.gt
   i32.eqz
   if
    local.get $8
    i64.const 1
    i64.shl
    local.set $8
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  local.set $0
  f64.const 5e3
  local.get $6
  local.get $12
  f64.convert_i64_u
  f64.div
  local.tee $6
  f64.div
  local.tee $15
  f64.const 5050
  f64.div
  f64.ceil
  f64.const 5050
  f64.mul
  local.get $6
  f64.mul
  f64.const 1e4
  f64.gt
  local.tee $16
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
   local.get $6
   f64.div
   f64.ceil
   i64.trunc_sat_f64_u
   local.tee $8
   local.get $8
   i64.eqz
   select
   local.tee $8
   i64.const 1
   i64.eq
   if
    i32.const 0
    local.get $8
    i64.const 100
    i64.mul
    f64.convert_i64_u
    local.get $6
    f64.mul
    i64.const 10
    local.get $15
    i64.trunc_sat_f64_u
    i64.const 10
    i64.div_u
    i64.const 10
    i64.mul
    local.tee $10
    local.get $10
    i64.const 10
    i64.lt_u
    select
    f64.convert_i64_u
    call $~lib/__astral__/faultyConfig
   end
   global.get $~lib/memory/__stack_pointer
   call $~lib/staticarray/StaticArray<u64>#constructor
   local.tee $5
   i32.store
   loop $for-loop|0
    local.get $2
    i32.const 100
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store offset=4
     local.get $5
     local.get $2
     local.get $8
     call $~lib/staticarray/StaticArray<u64>#__set
     local.get $2
     i32.const 1
     i32.add
     local.set $2
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
  else
   local.get $6
   call $~lib/__astral__/Sampling.linearSampling
   local.set $5
  end
  local.get $0
  local.get $5
  i32.store
  loop $for-loop|2
   local.get $1
   i32.const 100
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $5
    i32.store offset=4
    local.get $3
    local.get $5
    local.get $1
    call $~lib/staticarray/StaticArray<u64>#__get
    f64.convert_i64_u
    local.tee $15
    local.get $6
    f64.mul
    f64.add
    local.set $3
    local.get $7
    local.get $15
    f64.add
    local.set $7
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|2
   end
  end
  local.get $3
  local.get $7
  call $~lib/__astral__/start
  i32.const 1
  local.set $0
  global.get $~lib/memory/__stack_pointer
  i32.const 100
  call $~lib/staticarray/StaticArray<f64>#constructor
  local.tee $11
  i32.store offset=8
  global.get $~lib/memory/__stack_pointer
  i32.const 100
  call $~lib/staticarray/StaticArray<f64>#constructor
  local.tee $13
  i32.store offset=12
  i32.const 0
  local.set $1
  loop $for-loop|3
   local.get $1
   i32.const 100
   i32.lt_s
   if
    call $~lib/__astral__/now
    local.set $3
    global.get $~lib/memory/__stack_pointer
    local.get $5
    i32.store offset=4
    local.get $5
    local.get $1
    call $~lib/staticarray/StaticArray<u64>#__get
    local.set $10
    i64.const 0
    local.set $8
    loop $for-loop|4
     local.get $8
     local.get $10
     i64.lt_u
     if
      i32.const 0
      global.set $~argumentsLength
      i32.const 3504
      i32.load
      call_indirect (type $2)
      local.get $8
      i64.const 1
      i64.add
      local.set $8
      br $for-loop|4
     end
    end
    local.get $0
    call $~lib/__astral__/now
    local.get $3
    f64.sub
    local.tee $3
    f64.const 0
    f64.eq
    i32.and
    if
     call $~lib/__astral__/faultyBenchmark
     i32.const 0
     local.set $0
    end
    global.get $~lib/memory/__stack_pointer
    local.get $11
    i32.store offset=4
    local.get $11
    local.get $1
    local.get $3
    call $~lib/staticarray/StaticArray<f64>#__set
    global.get $~lib/memory/__stack_pointer
    local.get $13
    i32.store offset=4
    local.get $13
    local.get $1
    local.get $3
    local.get $10
    f64.convert_i64_u
    f64.div
    call $~lib/staticarray/StaticArray<f64>#__set
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|3
   end
  end
  call $~lib/__astral__/analyzing
  global.get $~lib/memory/__stack_pointer
  local.get $13
  i32.store offset=4
  i32.const 0
  global.set $~argumentsLength
  local.get $13
  call $~lib/staticarray/StaticArray<f64>#sort@varargs
  global.get $~lib/memory/__stack_pointer
  i32.const 100
  call $~lib/staticarray/StaticArray<f64>#constructor
  local.tee $17
  i32.store offset=16
  global.get $~lib/memory/__stack_pointer
  i32.const 100
  call $~lib/staticarray/StaticArray<f64>#constructor
  local.tee $0
  i32.store offset=20
  f64.const 0
  local.set $6
  f64.const 0
  local.set $3
  global.get $~lib/__astral__/flags
  i32.const 1
  i32.and
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 200
   call $~lib/staticarray/StaticArray<f64>#constructor
   local.tee $2
   i32.store offset=24
   global.get $~lib/memory/__stack_pointer
   i32.const 100
   call $~lib/staticarray/StaticArray<f64>#constructor
   local.tee $18
   i32.store offset=28
   i32.const 0
   local.set $1
   loop $for-loop|5
    local.get $1
    i32.const 100
    i32.lt_s
    if
     local.get $1
     i32.const 3
     i32.shl
     local.tee $9
     i32.const 1952
     i32.add
     f64.load
     local.get $9
     i32.const 1152
     i32.add
     f64.load
     f64.div
     local.set $3
     global.get $~lib/memory/__stack_pointer
     local.get $18
     i32.store offset=4
     local.get $18
     local.get $1
     local.get $3
     call $~lib/staticarray/StaticArray<f64>#__set
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $13
     i32.store offset=32
     local.get $2
     local.get $1
     local.get $13
     local.get $1
     call $~lib/staticarray/StaticArray<f64>#__get
     call $~lib/staticarray/StaticArray<f64>#__set
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=4
     local.get $2
     local.get $1
     i32.const 100
     i32.add
     local.get $3
     call $~lib/staticarray/StaticArray<f64>#__set
     local.get $1
     i32.const 1
     i32.add
     local.set $1
     br $for-loop|5
    end
   end
   global.get $~lib/memory/__stack_pointer
   local.get $13
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $18
   i32.store offset=32
   local.get $13
   local.get $18
   call $~lib/__astral__/Stats.t
   local.set $3
   global.get $~lib/memory/__stack_pointer
   i32.const 100000
   call $~lib/staticarray/StaticArray<f64>#constructor
   local.tee $19
   i32.store offset=36
   loop $for-loop|6
    local.get $4
    i32.const 100000
    i32.lt_s
    if
     i32.const 0
     local.set $1
     loop $for-loop|7
      local.get $1
      i32.const 100
      i32.lt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.get $17
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=32
       local.get $17
       local.get $1
       local.get $2
       call $~lib/math/NativeMath.random
       f64.const 100
       f64.mul
       f64.const 2
       f64.mul
       i32.trunc_sat_f64_u
       call $~lib/staticarray/StaticArray<f64>#__get
       call $~lib/staticarray/StaticArray<f64>#__set
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=32
       local.get $0
       local.get $1
       local.get $2
       call $~lib/math/NativeMath.random
       f64.const 100
       f64.mul
       f64.const 2
       f64.mul
       i32.trunc_sat_f64_u
       call $~lib/staticarray/StaticArray<f64>#__get
       call $~lib/staticarray/StaticArray<f64>#__set
       local.get $1
       i32.const 1
       i32.add
       local.set $1
       br $for-loop|7
      end
     end
     global.get $~lib/memory/__stack_pointer
     local.get $19
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $17
     i32.store offset=32
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=40
     local.get $19
     local.get $4
     local.get $17
     local.get $0
     call $~lib/__astral__/Stats.t
     call $~lib/staticarray/StaticArray<f64>#__set
     local.get $4
     i32.const 1
     i32.add
     local.set $4
     br $for-loop|6
    end
   end
   global.get $~lib/memory/__stack_pointer
   local.get $13
   i32.store offset=4
   local.get $13
   call $~lib/__astral__/Stats.mean
   local.set $6
   global.get $~lib/memory/__stack_pointer
   local.get $18
   i32.store offset=4
   local.get $6
   local.get $18
   call $~lib/__astral__/Stats.mean
   f64.div
   f64.const -1
   f64.add
   local.set $6
   global.get $~lib/memory/__stack_pointer
   local.get $18
   i32.store offset=4
   i32.const 0
   global.set $~argumentsLength
   local.get $18
   call $~lib/staticarray/StaticArray<f64>#sort@varargs
   global.get $~lib/memory/__stack_pointer
   local.get $13
   i32.store offset=4
   local.get $13
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
   local.tee $9
   i32.store offset=44
   global.get $~lib/memory/__stack_pointer
   i32.const 100000
   call $~lib/staticarray/StaticArray<f64>#constructor
   local.tee $14
   i32.store offset=48
   i32.const 0
   local.set $4
   loop $for-loop|8
    local.get $4
    i32.const 317
    i32.lt_s
    if
     local.get $4
     i32.const 316
     i32.mul
     local.set $1
     i32.const 100000
     local.get $4
     i32.const 1
     i32.add
     i32.const 316
     i32.mul
     local.tee $2
     local.get $2
     i32.const 100000
     i32.ge_s
     select
     local.set $20
     i32.const 0
     local.set $2
     loop $for-loop|9
      local.get $2
      i32.const 100
      i32.lt_s
      if
       global.get $~lib/memory/__stack_pointer
       local.get $17
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $13
       i32.store offset=32
       local.get $17
       local.get $2
       local.get $13
       call $~lib/math/NativeMath.random
       f64.const 100
       f64.mul
       i32.trunc_sat_f64_u
       call $~lib/staticarray/StaticArray<f64>#__get
       call $~lib/staticarray/StaticArray<f64>#__set
       local.get $2
       i32.const 1
       i32.add
       local.set $2
       br $for-loop|9
      end
     end
     global.get $~lib/memory/__stack_pointer
     local.get $17
     i32.store offset=4
     i32.const 0
     global.set $~argumentsLength
     local.get $17
     call $~lib/staticarray/StaticArray<f64>#sort@varargs
     loop $for-loop|10
      local.get $1
      local.get $20
      i32.lt_s
      if
       i32.const 0
       local.set $2
       loop $for-loop|11
        local.get $2
        i32.const 100
        i32.lt_s
        if
         global.get $~lib/memory/__stack_pointer
         local.get $0
         i32.store offset=4
         global.get $~lib/memory/__stack_pointer
         local.get $18
         i32.store offset=32
         local.get $0
         local.get $2
         local.get $18
         call $~lib/math/NativeMath.random
         f64.const 100
         f64.mul
         i32.trunc_sat_f64_u
         call $~lib/staticarray/StaticArray<f64>#__get
         call $~lib/staticarray/StaticArray<f64>#__set
         local.get $2
         i32.const 1
         i32.add
         local.set $2
         br $for-loop|11
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
       local.get $9
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $17
       i32.store offset=32
       local.get $17
       call $~lib/__astral__/Stats.mean
       local.set $7
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=32
       local.get $9
       local.get $1
       local.get $7
       local.get $0
       call $~lib/__astral__/Stats.mean
       f64.div
       f64.const -1
       f64.add
       call $~lib/staticarray/StaticArray<f64>#__set
       global.get $~lib/memory/__stack_pointer
       local.get $14
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $17
       i32.store offset=32
       local.get $17
       call $~lib/__astral__/Stats.sorted.median
       local.set $7
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=32
       local.get $14
       local.get $1
       local.get $7
       local.get $0
       call $~lib/__astral__/Stats.sorted.median
       f64.div
       f64.const -1
       f64.add
       call $~lib/staticarray/StaticArray<f64>#__set
       local.get $1
       i32.const 1
       i32.add
       local.set $1
       br $for-loop|10
      end
     end
     local.get $4
     i32.const 1
     i32.add
     local.set $4
     br $for-loop|8
    end
   end
   global.get $~lib/memory/__stack_pointer
   local.get $19
   i32.store offset=4
   i32.const 0
   local.set $1
   i32.const 0
   local.set $2
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
   local.set $4
   loop $for-loop|00
    global.get $~lib/memory/__stack_pointer
    local.get $19
    i32.store
    local.get $19
    call $~lib/staticarray/StaticArray<u64>#get:length
    local.get $2
    i32.gt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $19
     i32.store
     local.get $1
     local.get $19
     local.get $2
     call $~lib/staticarray/StaticArray<f64>#__get
     local.get $3
     f64.lt
     i32.add
     local.set $1
     local.get $2
     i32.const 1
     i32.add
     local.set $2
     br $for-loop|00
    end
   end
   local.get $1
   local.get $4
   local.get $1
   i32.sub
   local.tee $2
   local.get $1
   local.get $2
   i32.lt_s
   select
   local.get $4
   i32.div_s
   i32.const 1
   i32.shl
   f64.convert_i32_s
   local.set $3
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
  end
  global.get $~lib/memory/__stack_pointer
  local.get $13
  i32.store offset=4
  local.get $13
  call $~lib/__astral__/Stats.mean
  global.set $~lib/__astral__/meanPoint
  global.get $~lib/memory/__stack_pointer
  local.get $13
  i32.store offset=4
  local.get $13
  global.get $~lib/__astral__/meanPoint
  call $~lib/__astral__/Stats.stdDev
  global.set $~lib/__astral__/stdDevPoint
  global.get $~lib/memory/__stack_pointer
  local.get $13
  i32.store offset=4
  local.get $13
  call $~lib/__astral__/Stats.sorted.median
  global.set $~lib/__astral__/medianPoint
  global.get $~lib/memory/__stack_pointer
  local.get $13
  i32.store offset=4
  local.get $13
  global.get $~lib/__astral__/medianPoint
  call $~lib/__astral__/Stats.sorted.MAD
  global.set $~lib/__astral__/MADPoint
  global.get $~lib/memory/__stack_pointer
  i32.const 100000
  call $~lib/staticarray/StaticArray<f64>#constructor
  local.tee $4
  i32.store offset=52
  global.get $~lib/memory/__stack_pointer
  i32.const 100000
  call $~lib/staticarray/StaticArray<f64>#constructor
  local.tee $14
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
  local.set $2
  loop $for-loop|12
   local.get $2
   i32.const 100000
   i32.lt_s
   if
    i32.const 0
    local.set $1
    loop $for-loop|13
     local.get $1
     i32.const 100
     i32.lt_s
     if
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=4
      global.get $~lib/memory/__stack_pointer
      local.get $13
      i32.store offset=32
      local.get $0
      local.get $1
      local.get $13
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
      br $for-loop|13
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
    call $~lib/__astral__/Stats.mean
    local.set $7
    global.get $~lib/memory/__stack_pointer
    local.get $4
    i32.store offset=4
    local.get $4
    local.get $2
    local.get $7
    call $~lib/staticarray/StaticArray<f64>#__set
    global.get $~lib/memory/__stack_pointer
    local.get $14
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=32
    local.get $14
    local.get $2
    local.get $0
    local.get $7
    call $~lib/__astral__/Stats.stdDev
    call $~lib/staticarray/StaticArray<f64>#__set
    global.get $~lib/memory/__stack_pointer
    local.get $18
    i32.store offset=4
    local.get $18
    call $~lib/__astral__/Stats.sorted.median
    local.set $7
    global.get $~lib/memory/__stack_pointer
    local.get $18
    i32.store offset=4
    local.get $18
    local.get $2
    local.get $7
    call $~lib/staticarray/StaticArray<f64>#__set
    global.get $~lib/memory/__stack_pointer
    local.get $19
    i32.store offset=4
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.store offset=32
    local.get $19
    local.get $2
    local.get $0
    local.get $7
    call $~lib/__astral__/Stats.sorted.MAD
    call $~lib/staticarray/StaticArray<f64>#__set
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|12
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
  local.get $14
  i32.store offset=4
  i32.const 0
  global.set $~argumentsLength
  local.get $14
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
  local.get $4
  i32.store offset=4
  local.get $4
  call $~lib/__astral__/Stats.sorted.CI.LB
  global.set $~lib/__astral__/meanLB
  global.get $~lib/memory/__stack_pointer
  local.get $4
  i32.store offset=4
  local.get $4
  call $~lib/__astral__/Stats.sorted.CI.HB
  global.set $~lib/__astral__/meanHB
  global.get $~lib/memory/__stack_pointer
  local.get $14
  i32.store offset=4
  local.get $14
  call $~lib/__astral__/Stats.sorted.CI.LB
  global.set $~lib/__astral__/stdDevLB
  global.get $~lib/memory/__stack_pointer
  local.get $14
  i32.store offset=4
  local.get $14
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
  local.set $1
  loop $for-loop|14
   local.get $1
   i32.const 100
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $5
    i32.store offset=4
    local.get $1
    i32.const 3
    i32.shl
    local.tee $2
    i32.const 1152
    i32.add
    local.get $5
    local.get $1
    call $~lib/staticarray/StaticArray<u64>#__get
    f64.convert_i64_u
    f64.store
    global.get $~lib/memory/__stack_pointer
    local.get $11
    i32.store offset=4
    local.get $2
    i32.const 1952
    i32.add
    local.get $11
    local.get $1
    call $~lib/staticarray/StaticArray<f64>#__get
    f64.store
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|14
   end
  end
  local.get $16
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
   local.set $1
   loop $for-loop|15
    local.get $1
    i32.const 100
    i32.lt_s
    if
     global.get $~lib/memory/__stack_pointer
     local.get $2
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $5
     i32.store offset=32
     local.get $2
     local.get $1
     local.get $5
     local.get $1
     call $~lib/staticarray/StaticArray<u64>#__get
     f64.convert_i64_u
     call $~lib/staticarray/StaticArray<f64>#__set
     local.get $1
     i32.const 1
     i32.add
     local.set $1
     br $for-loop|15
    end
   end
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $11
   i32.store offset=32
   local.get $2
   local.get $11
   call $~lib/__astral__/Regression.fit
   global.set $~lib/__astral__/slopePoint
   global.get $~lib/memory/__stack_pointer
   i32.const 100000
   call $~lib/staticarray/StaticArray<f64>#constructor
   local.tee $5
   i32.store offset=72
   i32.const 0
   local.set $4
   loop $for-loop|16
    local.get $4
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
       local.set $14
       global.get $~lib/memory/__stack_pointer
       local.get $17
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $2
       i32.store offset=32
       local.get $17
       local.get $1
       local.get $2
       local.get $14
       call $~lib/staticarray/StaticArray<f64>#__get
       call $~lib/staticarray/StaticArray<f64>#__set
       global.get $~lib/memory/__stack_pointer
       local.get $0
       i32.store offset=4
       global.get $~lib/memory/__stack_pointer
       local.get $11
       i32.store offset=32
       local.get $0
       local.get $1
       local.get $11
       local.get $14
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
     local.get $5
     i32.store offset=4
     global.get $~lib/memory/__stack_pointer
     local.get $17
     i32.store offset=32
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.store offset=40
     local.get $5
     local.get $4
     local.get $17
     local.get $0
     call $~lib/__astral__/Regression.fit
     call $~lib/staticarray/StaticArray<f64>#__set
     local.get $4
     i32.const 1
     i32.add
     local.set $4
     br $for-loop|16
    end
   end
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store offset=4
   i32.const 0
   global.set $~argumentsLength
   local.get $5
   call $~lib/staticarray/StaticArray<f64>#sort@varargs
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store offset=4
   local.get $5
   call $~lib/__astral__/Stats.sorted.CI.LB
   global.set $~lib/__astral__/slopeLB
   global.get $~lib/memory/__stack_pointer
   local.get $5
   i32.store offset=4
   local.get $5
   call $~lib/__astral__/Stats.sorted.CI.HB
   global.set $~lib/__astral__/slopeHB
   global.get $~lib/__astral__/slopeLB
   global.get $~lib/__astral__/slopePoint
   global.get $~lib/__astral__/slopeHB
   call $~lib/__astral__/result
  end
  local.get $9
  if
   global.get $~lib/memory/__stack_pointer
   local.get $9
   i32.store offset=4
   i32.const 0
   global.set $~argumentsLength
   local.get $9
   call $~lib/staticarray/StaticArray<f64>#sort@varargs
   global.get $~lib/memory/__stack_pointer
   local.get $9
   i32.store offset=4
   local.get $9
   call $~lib/__astral__/Stats.sorted.CI.LB
   local.set $7
   global.get $~lib/memory/__stack_pointer
   local.get $9
   i32.store offset=4
   local.get $7
   local.get $6
   local.get $9
   call $~lib/__astral__/Stats.sorted.CI.HB
   local.get $3
   call $~lib/__astral__/change
  end
  global.get $~lib/memory/__stack_pointer
  local.get $13
  i32.store offset=4
  local.get $13
  f64.const 25
  call $~lib/__astral__/Stats.sorted.percentile
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $13
  i32.store offset=4
  local.get $3
  local.get $13
  f64.const 75
  call $~lib/__astral__/Stats.sorted.percentile
  local.tee $6
  local.get $3
  f64.sub
  local.tee $7
  f64.const 3
  f64.mul
  local.tee $15
  f64.sub
  local.set $21
  local.get $3
  local.get $7
  f64.const 1.5
  f64.mul
  local.tee $3
  f64.sub
  local.set $7
  local.get $6
  local.get $3
  f64.add
  local.set $3
  local.get $6
  local.get $15
  f64.add
  local.set $6
  i32.const 0
  local.set $2
  i32.const 0
  local.set $0
  i32.const 0
  local.set $5
  i32.const 0
  local.set $9
  i32.const 0
  local.set $1
  loop $for-loop|18
   local.get $1
   i32.const 100
   i32.lt_s
   if
    global.get $~lib/memory/__stack_pointer
    local.get $13
    i32.store offset=4
    local.get $13
    local.get $1
    call $~lib/staticarray/StaticArray<f64>#__get
    local.tee $15
    local.get $21
    f64.lt
    if
     local.get $2
     i32.const 1
     i32.add
     local.set $2
    else
     local.get $6
     local.get $15
     f64.lt
     if
      local.get $9
      i32.const 1
      i32.add
      local.set $9
     else
      local.get $7
      local.get $15
      f64.gt
      if
       local.get $0
       i32.const 1
       i32.add
       local.set $0
      else
       local.get $5
       i32.const 1
       i32.add
       local.get $5
       local.get $3
       local.get $15
       f64.lt
       select
       local.set $5
      end
     end
    end
    local.get $1
    i32.const 1
    i32.add
    local.set $1
    br $for-loop|18
   end
  end
  local.get $2
  local.get $0
  local.get $5
  local.get $9
  call $~lib/__astral__/outliers
  global.get $~lib/memory/__stack_pointer
  i32.const 76
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/rt/__newArray (param $0 i32) (result i32)
  (local $1 i32)
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
  local.tee $3
  i32.const 1
  call $~lib/rt/itcms/__new
  local.tee $2
  i32.store
  i32.const 16
  i32.const 4
  call $~lib/rt/itcms/__new
  local.tee $1
  local.get $2
  i32.store
  local.get $1
  local.get $2
  i32.const 0
  call $~lib/rt/itcms/__link
  local.get $1
  local.get $2
  i32.store offset=4
  local.get $1
  local.get $3
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
  i32.const 7
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
   i32.const 2896
   i32.const 3536
   i32.const 51
   i32.const 60
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.const 3
  i32.shl
  i32.const 8
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
