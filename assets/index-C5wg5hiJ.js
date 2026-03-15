var le=Object.defineProperty;var ce=(i,e,t)=>e in i?le(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var A=(i,e,t)=>ce(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();const pe=`/* constants 1 2 3 */
true: 1 ;
false: 0 ;

/* incrementors */

--: 1 - ;
++: 1 + ;
pred: dup -- ;
succ: dup ++ ;

/* shuffle words */

slip: q< eval q> ;
drop2: drop drop ;
swapd: q< swap q> ;
dupd: q< dup q> ;

dip: swap slip ; .inline /* [B] [A] dip == A [B] */
dig: swapd swap ; .inline /* c b a -> b a c */
bury: swap swapd ; .inline /* c b a -> a c b */
rot: swap swapd swap ; .inline /* c b a -> a b c */
over: dupd swap ; .inline
dup2: over over ; .inline
run: dup slip ; .inline
nip: swap drop ; .inline
tuck: swap over ; .inline
sip: over slip ; .inline       /* b [A*] -> b a* b    (aka keep) */
sipd: q< sip q> ; .inline      /* c b [A*] -> c a* c b */
bi: q< over q< eval q> q> dig q< eval q> swap ; .inline
bi2: q< q< dup2 q> eval bury q> eval ; .inline


/* inquisitive */

not: 0 = ;
zero?: 0 = ;
truthy?: zero? not ; .inline
falsey?: zero? ; .inline
!=: = not ; .inline
nz?: zero? not ; .inline
divisor?: % zero? ; .inline
even?: 2 divisor? ; .inline
odd?: even? not ; .inline

/* comparison */
<=: > not ; .inline
>=: < not ; .inline

sort2: dup2 > [ swap ] ? ; .inline
min: sort2 drop ; .inline
max: sort2 nip ; .inline
clamp: dig max min ; .inline
between?: [ sort2 ] dip swap dupd < bury < and ; .inline

/* binary operators */

bxor: dup2 ~ & rot ~ & | ;

/* logical */

and: * truthy? ;
or: + truthy? ;
nand: * zero? ;
nor: + zero? ;

/* short circuit */

or_else: q< over slip swap q> swap [ drop2 true ] [ eval ] branch ; .inline
and_also: q< over slip swap q> swap [ eval ] [ drop2 false ] branch ; .inline

/* branching */

choose: rot [ swap ] ? drop ;
branch: choose eval ;
if: slip ? ;
ifte: slipd branch ;

/* stack */

empty?: depth zero? ;
pushtop: depth 1 > [ swap q< pushtop q> ] ? ;

/* counters */

_loop: dup [ -- q< dup q< eval q> q> _loop ] ? ;
loop: _loop drop ;

times: loop drop ;
seq: swap times ;

range: dupd swap - [ succ ] seq ;
count: 0 swap ++ [ succ ] seq drop ;

/* stack reduction */
tail!: q< clr q> ;
head!: [ drop ] reduce! ;

_reduce_r: depth 3 > [ dup slip _reduce_r ] ? ;
reduce_r!: _reduce_r eval ;
foldr!: pushtop reduce_r! ;

_reduce_l: depth 3 > [ swap q< _reduce_l dup slip q> swap ] ? ;
reduce_l!: _reduce_l eval ;
foldl!: pushtop reduce_l! ;

_map: depth 2 > [ swap q< _map dup slip q> swap ] ? ;
map!: _map eval ;

_filter: depth 2 > [ swap q< _filter over over eval not [ nip ] ? q> swap ] ? ;
filter!: _filter dupd eval not [ drop ] ? ;

reduce!: depth 2 - times ;

sum!: depth 1 > [ + sum! ] ? ;
product!: depth 1 > [ * product! ] ? ;
reverse!: depth 1 > [ q< reverse! q> pushtop ] ? ;

/* math */
negitive?: 0 < ;
positive?: 0 > ;
sgn: dup positive? swap negitive? - ; .inline
abs: dup negitive? [ -1 * ] ? ; .inline
sqr: dup * ;
lg: dup 1 > [ 1 >> lg ++ ] [ drop 0 ] branch ;
!: dup [ dup -- ! * ] [ drop 1 ] branch ;
nck: dup2 - ! swap ! * [ ! ] dip / ;  /* n choose k */
divrem: [ / ] [ % ] bi2 ;

/* string printing */

space: 32 ;
newline: 10 ;

sp: space putc ;
cr: newline putc ;

_prints: dup [ q< _prints q> putc ] ? ;
prints: _prints drop ;
println: prints cr ;

ucase?: dup 'a' -- 'z' ++ dig between? ;
lcase?: dup 'A' -- 'Z' ++ dig between? ;

ucase: ucase? [ 32 - ] ? ;
lcase: lcase? [ 32 + ] ? ;`,Q=`.load ./lib/core.ff

0 'Hello\\sWorld!\\n' prints

0 'Hello' 32 'World!' 10 prints

0 'H' 'e' 'l' dup 'o' 32 'W' 'o' 'r' 'l' 'd' '!' 10 prints

'H' putc
'e' putc
'l' putc
'l' putc
'o' putc
32 putc
'W' putc
'o' putc
'r' putc
'l' putc
'd' putc
'!' putc
10 putc`;function de(){var e,t,s,n,o;return!!(((s=(t=(e=globalThis.Deno)==null?void 0:e.stdout)==null?void 0:t.isTerminal)==null?void 0:s.call(t))??((o=(n=globalThis.process)==null?void 0:n.stdout)==null?void 0:o.isTTY)??!1)}function U(i,e){return de()?`\x1B[${i}m${e}\x1B[0m`:e}function he(i){return U(34,i)}function ue(i){return U(32,i)}function q(i){return U(36,i)}const a={NOP:0,CALL:1,PUTC:2,GETC:3,PUTN:5,CLOCK:6,DROP:8,PUSHR:14,PULLR:15,SHIFTL:16,SHIFTR:17,CLR:24,RAND:26,EXIT:27,DUP:33,DEPTH:35,SWAP:36,MOD:37,AND:38,STASH:40,FETCH:41,MUL:42,ADD:43,SUB:45,PRN:46,DIV:47,RAT:92,MARK:58,DEF:59,LT:60,EQ:61,GT:62,IF:63,BRA:91,KET:93,POW:94,OR:124,NOT:126},O={nop:a.NOP,eval:a.CALL,";":a.DEF,":":a.MARK,clr:a.CLR,rand:a.RAND,exit:a.EXIT,".":a.PRN,putc:a.PUTC,getc:a.GETC,putn:a.PUTN,clock:a.CLOCK,drop:a.DROP,swap:a.SWAP,dup:a.DUP,"<<":a.SHIFTL,">>":a.SHIFTR,"+":a.ADD,"-":a.SUB,"*":a.MUL,"/":a.DIV,"<":a.LT,"=":a.EQ,">":a.GT,"?":a.IF,"%":a.MOD,"&":a.AND,"(":a.STASH,")":a.FETCH,"q<":a.PUSHR,"q>":a.PULLR,depth:a.DEPTH,"^":a.POW,"[":a.BRA,"]":a.KET,"|":a.OR,"~":a.NOT,"\\\\":a.RAT},I=255,p={call:"call",push:"push"};function me(i){return i=i.replace(/\\U([A-Fa-f0-9]{8})/g,(e,t)=>F(t)),i=i.replace(/\\u([A-Fa-f0-9]{4})/g,(e,t)=>F(t)),i.replace(/\\0/g,"\0").replace(/\\b/g,"\b").replace(/\\t/g,"	").replace(/\\n/g,`
`).replace(/\\v/g,"\v").replace(/\\f/g,"\f").replace(/\\r/g,"\r").replace(/\\'/g,"'").replace(/\\"/g,'"').replace(/\\s/g," ").replace(/\\\\/g,"\\")}function F(i){let e="",t=parseInt(i,16);return t<=65535?e+=String.fromCharCode(t):t<=1114111?(t-=65536,e+=String.fromCharCode(55296|t>>10)+String.fromCharCode(56320|t&1023)):e+=`hex2Char error: Code point out of range: ${fe(t)}`,e}function fe(i){return(i+0).toString(16).toUpperCase()}const G="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",X=new Map;G.split("").forEach(function(i,e){X.set(i,e)});const ge=5n,Y=1n<<ge,Z=Number(Y),J=Y-1n;function ve(i){return i.map(we).map(ke).join("")}function be(i){return Ae(_e(i)).map(qe)}function ye(i){return i>=0n?i<<1n:(-i<<1n)+1n}function Se(i){return i&1n?-(i>>1n):i>>1n}function we(i){if(i===0n)return[0];i=ye(i);const e=[];for(;i>0;){let t=Number(i&J);i>>=5n,i>0&&(t|=Z),e.push(t)}return e}function ke(i){return i.map(e=>G[e]).join("")}function _e(i){return i.split("").map(e=>{const t=X.get(e);if(t===void 0)throw new Error(`${i} is not a valid base64 encoded VLQ`);return t})}function Ae(i){const e=[];let t=[];if(i.forEach(s=>{t.push(s),(s&Z)===0&&(e.push(t),t=[])}),t.length>0)throw new Error("Malformed VLQ sequence: The last VLQ never ended.");return e}function qe(i){const e=i.reverse().reduce((t,s)=>(t<<=5n,t|=BigInt(s)&J,t),0n);return Se(e)}const Ee="/*",Te="*/";function Pe(i){try{let e=1n;return i=i.replaceAll("_",""),i.startsWith("-0")&&(e=-1n,i=i.replace("-","")),i.includes("e")||i.includes("E")?e*BigInt(+i):e*BigInt(i)}catch{return}}class _{constructor(e={}){this.symbols=new Map,this._nextCode=-1,this.host=e;let t;for(t in O)this.symbols.set(t,BigInt(O[t]))}static tokenize(e){return e.split(/\s+/).filter(Boolean).map(t=>{const s=Pe(t);return s!==void 0?s:t})}static compileToBase64(e){const t=e.flatMap(s=>{if(s.op===p.call&&s.value===0n)return[];const n=s.value<<1n;return[s.op===p.push?n:n|1n]});return ve(t)}nextCode(){return BigInt(this._nextCode--)}getSymbol(e){e=e.toLowerCase();let t=this.symbols.get(e);return t===void 0&&(t=this.nextCode(),this.symbols.set(e,t)),t}compileToIR(e,t=""){var u,f,g;let s=0;const n=e.length;let o="";const r=[];for(;s<n;)if(o=e[s++],typeof o=="bigint")c(o);else if(o.length>1&&o.startsWith(".")){const[h]=o.split(" ");switch(h){case".push":r[r.length-1].op=p.push;break;case".call":r[r.length-1].op=p.call;break;case".inline":(u=r[r.length-1]).meta||(u.meta={}),r[r.length-1].meta.inline=!0;break;case".unsafe":(f=r[r.length-1]).meta||(f.meta={}),r[r.length-1].meta.unsafe=!0;break;case".pointer":(g=r[r.length-1]).meta||(g.meta={}),r[r.length-1].meta.pointer=!0;break;case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Compiler: .exit requires a host exit handler");case".symbols":this.symbols.forEach((v,S)=>{(this.host.log||console.log)(S,v)});break;case".words":{const v=Array.from(this.symbols,([S])=>S).join(" ");(this.host.log||console.log)(v);break}}}else if(o[0]==="'"&&o.length>1)me(o).replace(/^'/,"").replace(/'$/,"").split("").forEach(h=>{c(h.charCodeAt(0),{comment:h})});else if(o.endsWith(":")&&o.length>1){const h=o.replace(/:$/,"");c(this.getSymbol(h),{name:`${h}`,pointer:!0}),l(a.MARK,{name:":"})}else if(o===Ee){const h=[];for(;s<e.length&&(o=e[s++],o!==Te);)h.push(o);l(0n,{comment:h.join(" ")})}else if(o.startsWith("[")&&o.endsWith("]")){const h=o.replace(/^\[/,"").replace(/\]$/,"");c(this.getSymbol(h),{name:h,pointer:!0})}else l(this.getSymbol(o),{name:o});return r;function c(h,v={}){r.push({value:BigInt(h),op:p.push,meta:{...v,filename:t}})}function l(h,v={}){r.push({value:BigInt(h),op:p.call,meta:{...v,filename:t}})}}validate(e){var o,r;const t=e.slice(),s=[];let n=0;for(;n<t.length;){const c=t[n];if(c.op===p.call&&c.value===BigInt(a.DEF)){let l=0;for(l=n;l>0&&!(t[l].op===p.call&&t[l].value===BigInt(a.MARK));l--);const u=t.splice(l-1,n-l+2);(r=(o=u.at(-1))==null?void 0:o.meta)!=null&&r.unsafe||s.push(...this.validateDef(u)),n=l-1}n++}return s.push(...this.validateDef(t,"main")),s}validateDef(e,t){var u,f,g;const s=[];let n=0,o=0,r=0,c=0;if(!e[0])return[];t=ue(t||((f=(u=e[0].meta)==null?void 0:u.name)==null?void 0:f.replace(/^&/,""))||"main");const l=he(((g=e[0].meta)==null?void 0:g.filename)||"-");for(;n<e.length;){const h=e[n];h.op===p.call&&(h.op===p.call&&h.value===BigInt(a.MARK)&&o++,h.op===p.call&&h.value===BigInt(a.DEF)&&o--,h.op===p.call&&h.value===BigInt(a.BRA)&&r++,h.op===p.call&&h.value===BigInt(a.KET)&&r--,h.op===p.call&&h.value===BigInt(a.PUSHR)&&c++,h.op===p.call&&h.value===BigInt(a.PULLR)&&c--,r<0&&s.push(`${l}: Bracket ( ${q("[ ]")} ) mismatch in ${t}`),c<0&&s.push(`${l}: Queue push ( ${q("q< q>")} ) mismatch in ${t}`),o<0&&s.push(`${l}: Definition ( ${q(": ;")} ) mismatch in ${t}`)),n++}return r!==0&&s.push(`${l}: Unbalanced brackets ( ${q("[ ]")} ) in ${t}`),c!==0&&s.push(`${l}: Unbalanced queue push ( ${q("q< q>")} ) in ${t}`),o!==0&&s.push(`${l}: Unbalanced definition ( ${q(": ;")} ) in ${t}`),s}}const Ce=[BigInt(a.DEF),BigInt(a.KET),BigInt(a.MARK),BigInt(a.BRA)];class ee{constructor(e){this.stack=[],this.queue=[],this.defs=new Map,this.symbols=new Map,this.depth=0,this.nextAnonOp=I+1,this.traceOn=!1,this.base=10,this.statsOn=!1,this.profileOn=!1,this.stats={system_instructions_called:0,user_instructions_called:0,max_stack_depth:0,max_queue_depth:0},this.profile={},this.platform=e,this.setup()}static fromBase64(e){return be(e).flatMap(t=>{const s=t&1n,n=t>>1n;return s?[n]:[0n,n]})}getStack(){return this.stack.slice()}peek(){const e=this.stack.length;if(e>0)return this.stack[e-1];throw new Error("Peek: stack underflow")}pop(){if(this.stack.length>0)return this.stack.pop();throw new Error("Pop: stack underflow")}push(e){this.stack.push(e)}poke(e){const t=this.stack.length;if(t>0){this.stack[t-1]=e;return}throw new Error("Poke: stack underflow")}clear(){this.stack.splice(0,this.stack.length)}defineSystem(e,t){const s=BigInt(t),n=this.getName(s);if(this.defs.has(s))throw new Error(`Define: cannot redefine system word "${n}"`);this.defs.set(s,e)}defineUser(e,t){const s=this.getName(t);if(t>-1&&t<I)throw new Error(`Define: cannot define system op "${s}"`);if(this.defs.has(t))throw t>-1?new Error(`Define: cannot redefine system op "${s}"`):new Error(`Define: cannot redefine user op "${s}"`);this.defs.set(t,e)}callSystem(e){var n;const t=this.defs.get(e);if(typeof t=="function"){if(this.statsOn&&this.stats.system_instructions_called++,this.profileOn){const o=performance.now();t();const r=performance.now(),c=this.getName(e)||Number(e);(n=this.profile)[c]||(n[c]=[0,0]),this.profile[c][0]++,this.profile[c][1]!=0,this.profile[c][1]+=r-o;return}return t()}const s=this.getName(e)||e;throw new Error(`Call: undefined system op "${s}"`)}callUser(e){var n;const t=this.defs.get(e);if(Array.isArray(t)){if(this.statsOn&&this.stats.user_instructions_called++,this.queue.unshift(...t),this.profileOn){const o=this.getName(e,`&${e}`);(n=this.profile)[o]||(n[o]=[0,void 0]),this.profile[o][0]++}return}const s=this.getName(e)||e;throw new Error(`Call: undefined user op "${s}"`)}callOp(e){return e>-1n&&e<I?this.callSystem(e):this.callUser(e)}loadBigIntCode(e){this.queue.push(...e)}loadIR(e){var s,n;let t=0;for(;t<e.length;){const o=e[t++];if(o.op===p.call){if(o.value===0n)continue;(s=o.meta)!=null&&s.name&&!this.symbols.has(o.value)&&this.symbols.set(o.value,(n=o.meta)==null?void 0:n.name),this.queue.push(o.value)}else this.queue.push(0n),this.queue.push(o.value)}return this.stack}run(){const e=this.queue;let t=!1;for(;e.length>0;){const s=e.shift()||0n;t=!this.depth||Ce.includes(s),this.traceOn&&this.trace(s,t),s===0n?(t||this.push(s),this.push(e.shift()||0n)):(t||this.push(s),t&&this.callOp(s)),this.statsOn&&(this.stats.max_stack_depth=Math.max(this.stats.max_stack_depth,this.stack.length),this.stats.max_queue_depth=Math.max(this.stats.max_queue_depth,e.length))}return this.stack}trace(e,t){let s=this.getName(e);t&&(s=`*${s}*`);const n=this.stack.map(String).join(" "),o=this.queue.map(String).join(" ");console.log(`[ ${n} ] ${s} [ ${o.slice(0,10)}...`)}getName(e,t=String(e)){return this.symbols.has(e)?this.symbols.get(e):String(t)}print(){const e=this.stack.map(t=>t.toString(this.base)).join(" ");console.log(`[ ${e} ]`)}loadSourceMap(e){Object.keys(e.symbols).forEach(t=>{this.symbols.set(BigInt(t),e.symbols[t])})}setup(){const e=new TextEncoder;let t;for(t in O)this.symbols.set(BigInt(O[t]),t);this.defineSystem(()=>{},a.NOP),this.defineSystem(()=>{const s=this.pop();this.queue.unshift(s)},a.CALL),this.defineSystem(()=>{this.depth--;const s=this.queue.pop(),n=this.stack.splice(Number(s||0))||[];this.defineUser(n,this.pop())},a.DEF),this.defineSystem(()=>{this.depth--;const s=this.queue.pop(),n=this.stack.splice(Number(s||0))||[],o=BigInt(this.nextAnonOp++);this.defineUser(n,o),this.depth>0&&this.push(0n),this.push(o)},a.KET),this.defineSystem(()=>{this.depth++;const s=this.stack.length;this.queue.push(BigInt(s))},a.BRA),this.defineSystem(()=>{this.depth++;const s=this.stack.length;this.queue.push(BigInt(s))},a.MARK),this.defineSystem(()=>this.clear(),a.CLR),this.defineSystem(()=>{const s=this.pop();this.platform.exit(Number(s))},a.EXIT),this.defineSystem(()=>{const s=this.pop();this.push(Le(s))},a.RAND),this.defineSystem(()=>{this.print()},a.PRN),this.defineSystem(()=>{const s=this.pop(),n=this.pop();console.log(Number(n)/Number(s))},a.RAT),this.defineSystem(()=>{this.push(BigInt(this.platform.now()))},a.CLOCK),this.defineSystem(()=>{const s=e.encode(String.fromCharCode(Number(this.pop())));this.platform.io.write(s)},a.PUTC),this.defineSystem(()=>{this.platform.io.setRaw&&this.platform.io.setRaw(!0);const s=this.platform.io.readByte();this.platform.io.setRaw&&this.platform.io.setRaw(!1),this.push(BigInt(s??0))},a.GETC),this.defineSystem(()=>{const s=e.encode(this.pop().toString(this.base));this.platform.io.write(s)},a.PUTN),this.defineSystem(()=>{this.pop()},a.DROP),this.defineSystem(()=>{const s=this.peek(),n=this.stack[this.stack.length-2];this.stack[this.stack.length-2]=s,this.poke(n)},a.SWAP),this.defineSystem(()=>{this.push(this.peek())},a.DUP),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]+=s},a.ADD),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]-=s},a.SUB),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]*=s},a.MUL),this.defineSystem(()=>{const s=this.pop();if(s===0n)throw new Error("DIV: Division by zero");this.stack[this.stack.length-1]/=s},a.DIV),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]%=s},a.MOD),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]<<=s},a.SHIFTL),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]>>=s},a.SHIFTR),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]&=s},a.AND),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]**=s},a.POW),this.defineSystem(()=>{this.push(this.pop()>this.pop()?1n:0n)},a.LT),this.defineSystem(()=>{this.push(this.pop()===this.pop()?1n:0n)},a.EQ),this.defineSystem(()=>{this.push(this.pop()<this.pop()?1n:0n)},a.GT),this.defineSystem(()=>{const s=this.pop();this.pop()!==0n&&this.queue.unshift(s)},a.IF),this.defineSystem(()=>{this.queue.push(this.pop())},a.PUSHR),this.defineSystem(()=>{const s=this.queue.pop()||0n;this.push(s)},a.PULLR),this.defineSystem(()=>{this.push(BigInt(this.stack.length))},a.DEPTH),this.defineSystem(()=>{const s=this.stack.length;this.queue.push(...this.stack.splice(0,s)),this.queue.push(BigInt(s))},a.STASH),this.defineSystem(()=>{const s=Number(this.queue.pop());this.stack.unshift(...this.queue.splice(-s))},a.FETCH),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]|=s},a.OR),this.defineSystem(()=>{const s=this.pop();this.push(~s)},a.NOT)}printProfile(){console.log(),console.log("Profile:");const e=Object.keys(this.profile).map(n=>{const o=this.profile[n][0],r=this.profile[n][1];return{name:n,calls:o,time:r,system:typeof r<"u","ops/ms":r?Math.round(o/r):""}}).sort((n,o)=>o.calls-n.calls),t=e.filter(n=>n.system),s=e.filter(n=>!n.system);console.table(t,["name","calls","ops/ms"]),console.table(s,["name","calls"]),console.log()}printStats(){console.log(),console.log("Interpreter stats:"),console.log(this.stats),console.log()}}function Le(i){const e=i,t=e.toString().length;let s="";for(;s.length<t;)s+=Math.random().toString().split(".")[1];s=s.slice(0,t);const n="1"+"0".repeat(t);return e*BigInt(s)/BigInt(n)}const D=BigInt(a.DEF),W=BigInt(a.KET),x=BigInt(a.MARK),j=BigInt(a.BRA),d=i=>(i=BigInt(i),e=>e.op===p.call&&e.value===i),E=i=>(i=BigInt(i),e=>e.op===p.push&&e.value===i),y=i=>i.op===p.push,K=i=>i.op===p.push&&i.value!==0n,Re=[{name:"No operation",pattern:[d(a.NOP)],replacement:()=>[]},{name:"Null Sequence - SWAP SWAP",pattern:[d(a.SWAP),d(a.SWAP)],replacement:()=>[]},{name:"Null Sequence - DUP DROP",pattern:[d(a.DUP),d(a.DROP)],replacement:()=>[]},{name:"Null Sequence - PUSHR PULLR",pattern:[d(a.PUSHR),d(a.PULLR)],replacement:()=>[]},{name:"Null Sequence - CLOCK DROP",pattern:[d(a.CLOCK),d(a.DROP)],replacement:()=>[]},{name:"Null Sequence - RAND DROP",pattern:[d(a.RAND),d(a.DROP)],replacement:()=>[]},{name:"Null Sequence - DEPTH DROP",pattern:[d(a.DEPTH),d(a.DROP)],replacement:()=>[]},{name:"Null Sequence - NOT NOT",pattern:[d(a.NOT),d(a.NOT)],replacement:()=>[]},{name:"Indirect calls - n EVAL",pattern:[y,d(a.CALL)],replacement:i=>{var e,t;return[{op:p.call,value:i.value,meta:{name:(t=(e=i.meta)==null?void 0:e.name)==null?void 0:t.replace(/^&/,"")}}]}},{name:"Null Sequence - n DROP",pattern:[y,d(a.DROP)],replacement:()=>[]},{name:"Constant Folding - a b ADD",pattern:[y,y,d(a.ADD)],replacement:(i,e)=>[{op:p.push,value:i.value+e.value}]},{name:"Algebraic Simplification - 0 ADD",pattern:[E(0),d(a.ADD)],replacement:()=>[]},{name:"Algebraic Simplification - swap ADD",pattern:[d(a.SWAP),d(a.ADD)],replacement:(i,e)=>[e]},{name:"Constant Folding - a b SUB",pattern:[y,y,d(a.SUB)],replacement:(i,e)=>[{op:p.push,value:i.value-e.value}]},{name:"Algebraic Simplification - 0 SUB",pattern:[E(0),d(a.SUB)],replacement:()=>[]},{name:"Constant Folding - a b MUL",pattern:[y,y,d(a.MUL)],replacement:(i,e)=>[{op:p.push,value:i.value*e.value}]},{name:"Algebraic Simplification - 1 MUL",pattern:[E(1),d(a.MUL)],replacement:()=>[]},{name:"Algebraic Simplification - swap MUL",pattern:[d(a.SWAP),d(a.MUL)],replacement:(i,e)=>[e]},{name:"Constant Folding - a b DIV",pattern:[y,K,d(a.DIV)],replacement:(i,e)=>[{op:p.push,value:i.value/e.value}]},{name:"Algebraic Simplification - 1 DIV",pattern:[E(1),d(a.DIV)],replacement:()=>[]},{name:"Constant propagation - a DUP",pattern:[y,d(a.DUP)],replacement:i=>[i,i]},{name:"Unreachable Code - 0 &b IF",pattern:[E(0),y,d(a.IF)],replacement:()=>[]},{name:"Flows-Of-Control Optimizations - !0 &b IF",pattern:[K,y,d(a.IF)],replacement:(i,e,t)=>{var s,n;return[{op:p.call,value:e.value,meta:{name:(n=(s=e.meta)==null?void 0:s.name)==null?void 0:n.replace(/^&/,"")}}]}},{name:"Null Sequence - 0 eval",pattern:[E(0),d(a.CALL)],replacement:()=>[]},{name:"Flows-Of-Control Optimizations - n [ ]",pattern:[y,d(a.BRA),d(a.KET)],replacement:()=>[{op:p.push,value:0n,meta:{pointer:!0,name:"0"}}]},{name:"a q< b a> - b a",pattern:[y,d(a.PUSHR),y,d(a.PULLR)],replacement:(i,e,t)=>[t,i]}];class De{constructor(){this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0},this.minOptPasses=2,this.maxOptPasses=20,this.defs=new Map,this.calledWords=new Set,this.optimized=[],this.nextAnonOp=I+1}optimize(e){this.reset(),this.stats.pre_optimization_ir_size=e.length,this.optimized=e;let t;do t=this.optimized.length,this.optLoop();while((this.optimized.length<t||this.stats.optimization_passes<this.minOptPasses)&&this.stats.optimization_passes<this.maxOptPasses);return this.optimized=this.pullDefs(this.optimized),this.optimized=this.addReferencedWords(this.optimized),this.stats.post_optimization_ir_size=this.optimized.length,this.optimized}optLoop(){this.optimized=this.peepholeOptimization(this.optimized),this.optimized=this.getDefs(this.optimized),this.optimized=this.inlineWords(this.optimized,4),this.stats.optimization_passes++}reset(){this.optimized=[],this.defs=new Map,this.calledWords=new Set,this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0}}getDefs(e){var s;let t=0;for(;t<e.length;){const n=e[t];if(n.op===p.call){if(n.value===W){this.stats.optimization_passes===0&&this.stats.user_defined_anon_defs++,n.meta??(n.meta={}),(s=n.meta).uid??(s.uid=this.nextAnonOp++);let o=t;for(;o-- >0;){const u=e[o];if(u.op===p.call&&u.value===j)break}const r=BigInt(n.meta.uid),c={op:p.push,value:r,meta:{pointer:!0}},l=e.slice(o,t+1);l.unshift(c),l[1]={...l[1],value:x,meta:{...l[1].meta,name:":"}},l[l.length-1]={...l[l.length-1],value:D,meta:{...l[l.length-1].meta,name:";"}},this.defs.set(r,l)}else if(n.value===D){this.stats.optimization_passes===0&&this.stats.user_defined_named_defs++;let o=t;for(;o-- >0;){const l=e[o];if(l.op===p.call&&l.value===x)break}const r=e[o-1];r.meta||(r.meta={}),r.meta.pointer=!0;const c=e.slice(o-1,t+1);this.defs.set(r.value,c)}}t++}return e}pullDefs(e,t=!1){var o;const s=e.slice();let n=0;for(;n<s.length;){const r=s[n];if(r.op===p.call){if(r.value===W){r.meta??(r.meta={}),(o=r.meta).uid??(o.uid=this.nextAnonOp++);const c=n;for(;n-- >0;){const g=s[n];if(g.op===p.call&&g.value===j)break}const l=BigInt(r.meta.uid),u={op:p.push,value:l,meta:{pointer:!0}},f=s.splice(n,c-n+1,u);f.unshift(u),f[1]={...f[1],value:x,meta:{...f[1].meta,name:":"}},f[f.length-1]={...f[f.length-1],value:D,meta:{...f[f.length-1].meta,name:";"}},this.defs.set(l,f)}else if(r.value===D&&!t){const c=n;for(;n-- >0;){const f=s[n];if(f.op===p.call&&f.value===x)break}const l=s[n-1];l.meta||(l.meta={}),l.meta.pointer=!0;const u=s.splice(n-1,c-n+2);n=n-2,this.defs.set(u[0].value,u)}}n++}return s}peepholeOptimization(e){const t=e.slice();for(;;){const s=this.stats.peephole_optimizations;let n=0;for(;n<t.length;){for(const o of Re){const{pattern:r,replacement:c}=o;if(r.every((u,f)=>u(t[n+f]))){this.stats.peephole_optimizations++;const u=t.slice(n,n+r.length);t.splice(n,r.length,...c(...u)),n=Math.max(0,n-r.length-1);break}}n++}if(this.stats.peephole_optimizations>=s)break}return t}inlineWords(e,t=1,s=[]){return e.flatMap(n=>{var o,r,c,l;if((o=n.meta)!=null&&o.unsafe)return n;if(n.op===p.call&&this.defs.has(n.value)){if(s.includes(n.value))return n;const u=this.defs.get(n.value);if(!u)return n;const f=u[u.length-1];if((r=f.meta)!=null&&r.unsafe)return n;if((c=f.meta)!=null&&c.inline||(l=n.meta)!=null&&l.inline)return this.stats.inlined_calls++,this.inlineWords(u.slice(2,-1),1/0,s.concat(n.value));if(u.length<=t+3)return this.stats.inlined_calls++,this.inlineWords(u.slice(2,-1),t,s.concat(n.value))}return n})}addReferencedWords(e){return e.slice().forEach(t=>{var s;t.op===p.push&&((s=t.meta)!=null&&s.pointer)?this.addDef(t.value):t.op===p.call&&this.addDef(t.value)}),e}addDef(e){if(!this.calledWords.has(e)){const t=this.defs.get(e);if(t)return this.stats.post_optimization_user_defs++,this.calledWords.add(e),this.optimized.unshift(...t),this.addReferencedWords(t)}}}class T{constructor(e,t){this.imported=new Set,this.host=e,this.engine=t.engine,this.compiler=t.compiler||new _}static tokenize(e){return e.split(/[\r\n]+/)}preprocess(e,t="-"){return e.map(s=>{if(s.length>1&&s[0]==="."){const[n,...o]=s.split(" ");if(n[0]==="."&&n.length>1){switch(n){case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Preprocessor: .exit requires a host exit handler");case".load":{const r=this.findFile(o.join(" "),t),c=this.host.readTextFile(r);return this.preprocess(T.tokenize(c),r)}case".import":{const r=this.findFile(o.join(" "),t);if(!this.imported.has(r)){this.imported.add(r);const c=this.host.readTextFile(r);return this.preprocess(T.tokenize(c),r)}return""}case".m":{const r=this.compiler.compileToIR(_.tokenize(o.join(" ")));this.engine.loadIR(r),this.engine.run();const c=this.engine.getStack();return this.engine.clear(),c.map(String).join(" ")+` /* ${s} */`}}return""}}return s}).join(`
`)}findFile(e,t="-"){if(t&&t!=="-"&&!this.host.path.isAbsolute(e)){const s=this.host.path.dirname(t),n=this.host.path.resolve(s,e);if(this.host.fileExists(n))return n}if(this.host.fileExists(e))return e;throw'File not found: "'+e+'"'}}function z(i){const e=i.startsWith("/"),t=i.split("/").filter(Boolean),s=[];for(const n of t)if(n!=="."){if(n===".."){s.pop();continue}s.push(n)}return`${e?"/":""}${s.join("/")}`||(e?"/":".")}function xe(i){const e=z(i),t=e.lastIndexOf("/");return t<=0?e.startsWith("/")?"/":".":e.slice(0,t)}function Ie(...i){const e=i.filter(Boolean).join("/").replaceAll(/\/+/g,"/");return z(e)}function te(i){return{readTextFile(e){const t=z(e),s=i[t];if(typeof s!="string")throw new Error(`Virtual file not found: ${t}`);return s},fileExists(e){return typeof i[z(e)]=="string"},path:{isAbsolute(e){return e.startsWith("/")},dirname:xe,resolve:Ie}}}function se(i={}){const e=new TextDecoder,t=new TextEncoder,s=Array.from(t.encode(i.stdin??""));return{io:{write(n){var o;(o=i.onWrite)==null||o.call(i,e.decode(n))},readByte(){return s.shift()??null}},exit(n){var o;(o=i.onExit)==null||o.call(i,n)},now(){return Date.now()}}}const ne={"/examples/hello.ffp":Q},V=Q;function k(i){return i.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function ie(i,e="/main.ffp"){return{[e]:i,"/lib/core.ff":pe,...ne}}function ae(i,e){const t=console.log;console.log=(...s)=>{i(s.map(String).join(" "))};try{return e()}finally{console.log=t}}function Oe(i,e,t){let s="";const n=[];let o=0;const r=se({stdin:e,onWrite(g){s+=g},onExit(g){o=g}}),c=new _,l=new ee(r),u=ie(i),f=new T(te(u),{engine:l,compiler:c});return ae(g=>n.push(g),()=>{const g=f.preprocess(T.tokenize(i),"/main.ffp"),h=performance.now();let v=c.compileToIR(_.tokenize(g),"/main.ffp");const S=performance.now(),C=c.validate(v);t&&(v=new De().optimize(v)),l.loadIR(v);const L=performance.now();l.run();const R=performance.now();return{output:s,preprocessed:g,bytecode:_.compileToBase64(v),issues:C,stack:l.getStack().map(String),logs:n,exitCode:o,compileMs:S-h,executeMs:R-L}})}class ze{constructor(){A(this,"compiler");A(this,"engine");A(this,"preprocessor");A(this,"files");A(this,"output","");this.reset()}reset(){this.output="",this.files=ie("","/repl.ffp");const e=se({onWrite:t=>{this.output+=t}});this.compiler=new _,this.engine=new ee(e),this.preprocessor=new T(te(this.files),{engine:this.engine,compiler:this.compiler}),this.execute(".load /lib/core.ff")}execute(e){const t=e.trim(),s=[];return t?t===".reset"?(this.reset(),{output:"Session reset. Core library reloaded.",logs:s,stack:this.engine.getStack().map(String)}):t===".exit"||t===".quit"?{output:"Browser REPL sessions stay open. Use .reset to clear state.",logs:s,stack:this.engine.getStack().map(String)}:(this.files["/repl.ffp"]=e,this.output="",ae(n=>s.push(n),()=>{try{const n=this.preprocessor.preprocess([e],"/repl.ffp"),o=this.compiler.compileToIR(_.tokenize(n),"/repl.ffp");return this.engine.loadIR(o),this.engine.run(),{output:this.output,logs:s,stack:this.engine.getStack().map(String)}}catch(n){return{output:this.output,logs:s,stack:this.engine.getStack().map(String),error:n instanceof Error?n.message:String(n)}}})):{output:"",logs:s,stack:this.engine.getStack().map(String)}}}const Be=`
  <div class="help-grid">
    <section class="panel help-panel">
      <div class="panel-header">
        <div>
          <p class="panel-label">Overview</p>
          <h2>What F-flat-minor is</h2>
        </div>
      </div>
      <div class="help-copy">
        <p>F-flat-minor is a tiny stack-oriented language built around one value type: big integers.</p>
        <p>Programs manipulate a data stack, a queue used during execution, and a vocabulary of built-in and user-defined words.</p>
        <p>The shared TypeScript core in this repo preprocesses source, compiles it to IR and bytecode, and executes the result.</p>
      </div>
    </section>

    <section class="panel help-panel">
      <div class="panel-header">
        <div>
          <p class="panel-label">Execution</p>
          <h2>Core model</h2>
        </div>
      </div>
      <div class="help-copy">
        <ul class="help-list">
          <li>Numbers are pushed onto the stack.</li>
          <li>Non-numeric tokens are treated as words and executed.</li>
          <li>The language compiles to base64 VLQ encoded big integers.</li>
          <li>Pointers to words are also just integers, so code and data share the same stack.</li>
        </ul>
      </div>
    </section>

    <section class="panel help-panel">
      <div class="panel-header">
        <div>
          <p class="panel-label">Syntax</p>
          <h2>Language details</h2>
        </div>
      </div>
      <div class="help-copy">
        <dl class="help-defs">
          <dt>Numbers</dt>
          <dd><code>42</code>, <code>-3</code>, and other integers are pushed directly.</dd>
          <dt>Words</dt>
          <dd><code>dup</code>, <code>swap</code>, <code>+</code>, <code>putc</code>, and user definitions execute when encountered.</dd>
          <dt>Definitions</dt>
          <dd><code>fact: dup 1 - [ dup 1 - fact * ] ? ;</code> defines a new word.</dd>
          <dt>Quotes</dt>
          <dd><code>[ dup * ]</code> creates an unnamed word and leaves its pointer on the stack.</dd>
          <dt>Pointers</dt>
          <dd><code>[+]</code> pushes a pointer to a word instead of calling it.</dd>
          <dt>Strings</dt>
          <dd><code>'Hello\\sWorld!\\n'</code> expands to character codes on the stack.</dd>
        </dl>
      </div>
    </section>

    <section class="panel help-panel">
      <div class="panel-header">
        <div>
          <p class="panel-label">Preprocessor</p>
          <h2>Supported directives</h2>
        </div>
      </div>
      <div class="help-copy">
        <ul class="help-list">
          <li><code>.load path</code>: inline another file every time it appears.</li>
          <li><code>.import path</code>: inline a file once per preprocessor session.</li>
          <li><code>.m ...</code>: evaluate a compile-time macro and splice the resulting stack values into the source.</li>
          <li><code>.exit</code>: request termination from the host.</li>
        </ul>
      </div>
    </section>

    <section class="panel help-panel">
      <div class="panel-header">
        <div>
          <p class="panel-label">Useful words</p>
          <h2>Common vocabulary</h2>
        </div>
      </div>
      <div class="help-copy">
        <div class="word-grid">
          <code>dup</code><span>duplicate the top stack item</span>
          <code>swap</code><span>swap the top two items</span>
          <code>drop</code><span>discard the top item</span>
          <code>+</code><span>add the top two values</span>
          <code>*</code><span>multiply the top two values</span>
          <code>?</code><span>conditional execution</span>
          <code>:</code> <span>begin a definition</span>
          <code>;</code> <span>end a definition</span>
          <code>putc</code><span>print a character</span>
          <code>putn</code><span>print a number in the current base</span>
          <code>.</code><span>print the stack to the console/log channel</span>
        </div>
      </div>
    </section>

    <section class="panel help-panel">
      <div class="panel-header">
        <div>
          <p class="panel-label">Examples</p>
          <h2>Try these</h2>
        </div>
      </div>
      <div class="help-copy">
        <pre class="code-block help-code">0 'Hello\\sWorld!\\n' prints

fact: dup 1 - [ dup 1 - fact * ] ? ;
20 fact putn 10 putc

[ dup * ] 12 swap eval putn</pre>
      </div>
    </section>
  </div>
`;function Ne(i){i.innerHTML=`
    <main class="shell">
      <section class="hero">
        <p class="eyebrow">f-flat-minor / web</p>
        <h1>Run F-flat-minor in the browser.</h1>
        <p class="lede">
          Playground, REPL, and language help powered by the shared TypeScript core.
        </p>
        <p class="hero-links">
          <a
            class="repo-link"
            href="https://github.com/Hypercubed/f-flat-minor"
            target="_blank"
            rel="noreferrer"
          >View the GitHub repository</a>
        </p>
      </section>

      <nav class="mode-tabs" aria-label="Application modes">
        <button class="mode-tab is-active" data-tab="playground">Playground</button>
        <button class="mode-tab" data-tab="repl">REPL</button>
        <button class="mode-tab" data-tab="help">Help</button>
      </nav>

      <section class="tab-panel is-active" data-panel="playground">
        <section class="workspace">
          <div class="panel editor-panel">
            <div class="panel-header">
              <div>
                <p class="panel-label">Editor</p>
                <h2>Main source</h2>
              </div>
              <label class="toggle">
                <input id="optimize" type="checkbox" checked />
                <span>Optimize</span>
              </label>
            </div>
            <textarea id="source" spellcheck="false"></textarea>
            <div class="controls">
              <label class="field">
                <span>Example</span>
                <select id="example">
                  <option value="/examples/hello.ffp">hello.ffp</option>
                </select>
              </label>
              <label class="field">
                <span>stdin</span>
                <input id="stdin" type="text" placeholder="Optional input for getc" />
              </label>
              <div class="actions">
                <button id="load-example" class="ghost">Load Example</button>
                <button id="run" class="primary">Run Program</button>
              </div>
            </div>
          </div>

          <div class="results">
            <div class="panel summary-panel">
              <div class="panel-header">
                <div>
                  <p class="panel-label">Status</p>
                  <h2>Run summary</h2>
                </div>
              </div>
              <div id="summary" class="summary-grid"></div>
            </div>

            <div class="panel">
              <div class="panel-header">
                <div>
                  <p class="panel-label">Output</p>
                  <h2>stdout and diagnostics</h2>
                </div>
              </div>
              <pre id="output" class="console"></pre>
            </div>

            <div class="panel">
              <div class="panel-header">
                <div>
                  <p class="panel-label">Preprocess</p>
                  <h2>Expanded source</h2>
                </div>
              </div>
              <pre id="preprocessed" class="code-block"></pre>
            </div>

            <div class="panel">
              <div class="panel-header">
                <div>
                  <p class="panel-label">Compile</p>
                  <h2>Bytecode</h2>
                </div>
              </div>
              <pre id="bytecode" class="code-block"></pre>
            </div>
          </div>
        </section>
      </section>

      <section class="tab-panel" data-panel="repl">
        <section class="workspace repl-workspace">
          <div class="panel">
            <div class="panel-header">
              <div>
                <p class="panel-label">REPL</p>
                <h2>Persistent session</h2>
              </div>
            </div>
            <div class="help-copy">
              <p>The REPL keeps your definitions and stack between lines. It preloads <code>/lib/core.ff</code>.</p>
              <p>Special commands: <code>.reset</code>, <code>.exit</code>, <code>.quit</code>.</p>
            </div>
            <div class="controls repl-controls">
              <label class="field repl-field">
                <span>Line</span>
                <input id="repl-input" type="text" placeholder="Try: 2 3 + putn 10 putc" />
              </label>
              <div class="actions">
                <button id="repl-reset" class="ghost">Reset Session</button>
                <button id="repl-run" class="primary">Run Line</button>
              </div>
            </div>
          </div>

          <div class="results">
            <div class="panel summary-panel">
              <div class="panel-header">
                <div>
                  <p class="panel-label">State</p>
                  <h2>Current stack</h2>
                </div>
              </div>
              <div id="repl-stack" class="summary-grid"></div>
            </div>

            <div class="panel">
              <div class="panel-header">
                <div>
                  <p class="panel-label">Transcript</p>
                  <h2>REPL output</h2>
                </div>
              </div>
              <pre id="repl-output" class="console"></pre>
            </div>
          </div>
        </section>
      </section>

      <section class="tab-panel" data-panel="help">
        ${Be}
      </section>
    </main>
  `;const e=i.querySelector("#source"),t=i.querySelector("#stdin"),s=i.querySelector("#optimize"),n=i.querySelector("#example"),o=i.querySelector("#load-example"),r=i.querySelector("#run"),c=i.querySelector("#summary"),l=i.querySelector("#output"),u=i.querySelector("#preprocessed"),f=i.querySelector("#bytecode"),g=Array.from(i.querySelectorAll(".mode-tab")),h=Array.from(i.querySelectorAll(".tab-panel")),v=i.querySelector("#repl-input"),S=i.querySelector("#repl-run"),C=i.querySelector("#repl-reset"),L=i.querySelector("#repl-output"),R=i.querySelector("#repl-stack");if(!e||!t||!s||!n||!o||!r||!c||!l||!u||!f||!v||!S||!C||!L||!R)throw new Error("App failed to mount");e.value=V;function re(m){g.forEach(b=>{const P=b.dataset.tab===m;b.classList.toggle("is-active",P)}),h.forEach(b=>{const P=b.dataset.panel===m;b.classList.toggle("is-active",P)})}g.forEach(m=>{m.addEventListener("click",()=>{re(m.dataset.tab??"playground")})});function B(){try{const m=Oe(e.value,t.value,s.checked),b=m.issues.length,P=[m.output?m.output.trimEnd():"(no stdout)",b?`

${b} compiler issue(s):
${m.issues.join(`
`)}`:"",m.logs.length?`

console log:
${m.logs.join(`
`)}`:""].join("");c.innerHTML=`
        <article class="summary-card">
          <span class="summary-k">compile</span>
          <strong>${m.compileMs.toFixed(2)} ms</strong>
        </article>
        <article class="summary-card">
          <span class="summary-k">execute</span>
          <strong>${m.executeMs.toFixed(2)} ms</strong>
        </article>
        <article class="summary-card">
          <span class="summary-k">stack</span>
          <strong>${m.stack.length?k(m.stack.join(" ")):"(empty)"}</strong>
        </article>
        <article class="summary-card">
          <span class="summary-k">exit</span>
          <strong>${m.exitCode}</strong>
        </article>
      `,l.innerHTML=k(P),u.innerHTML=k(m.preprocessed),f.innerHTML=k(m.bytecode)}catch(m){const b=m instanceof Error?m.message:String(m);c.innerHTML=`
        <article class="summary-card">
          <span class="summary-k">status</span>
          <strong>run failed</strong>
        </article>
      `,l.innerHTML=k(b),u.innerHTML="",f.innerHTML=""}}const $=new ze,w=["Core library loaded. Try defining words, evaluating quotes, or printing values."];function N(m){R.innerHTML=`
      <article class="summary-card">
        <span class="summary-k">depth</span>
        <strong>${m.length}</strong>
      </article>
      <article class="summary-card">
        <span class="summary-k">stack</span>
        <strong>${m.length?k(m.join(" ")):"(empty)"}</strong>
      </article>
    `}function M(){L.innerHTML=k(w.join(`

`))}function H(){const m=v.value,b=$.execute(m);w.push(`ff> ${m}`),b.output.trim()&&w.push(b.output.trimEnd()),b.logs.length&&w.push(b.logs.join(`
`)),b.error&&w.push(`Error: ${b.error}`),w.push(`[ ${b.stack.join(" ")} ]`),N(b.stack),M(),v.value="",v.focus()}o.addEventListener("click",()=>{e.value=ne[n.value]??V,B()}),r.addEventListener("click",B),S.addEventListener("click",H),C.addEventListener("click",()=>{$.reset(),w.splice(0,w.length,"Session reset. Core library reloaded."),N([]),M()}),v.addEventListener("keydown",m=>{m.key==="Enter"&&(m.preventDefault(),H())}),B(),N([]),M()}const oe=document.querySelector("#app");if(!oe)throw new Error("Missing #app root");Ne(oe);
