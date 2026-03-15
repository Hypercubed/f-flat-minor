(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();const V=`/* constants 1 2 3 */
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
lcase: lcase? [ 32 + ] ? ;`,z=`.load ./lib/core.ff

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
10 putc`;function Q(){var e,t,s,n,a;return!!(((s=(t=(e=globalThis.Deno)==null?void 0:e.stdout)==null?void 0:t.isTerminal)==null?void 0:s.call(t))??((a=(n=globalThis.process)==null?void 0:n.stdout)==null?void 0:a.isTTY)??!1)}function T(i,e){return Q()?`\x1B[${i}m${e}\x1B[0m`:e}function G(i){return T(34,i)}function X(i){return T(32,i)}function S(i){return T(36,i)}const o={NOP:0,CALL:1,PUTC:2,GETC:3,PUTN:5,CLOCK:6,DROP:8,PUSHR:14,PULLR:15,SHIFTL:16,SHIFTR:17,CLR:24,RAND:26,EXIT:27,DUP:33,DEPTH:35,SWAP:36,MOD:37,AND:38,STASH:40,FETCH:41,MUL:42,ADD:43,SUB:45,PRN:46,DIV:47,RAT:92,MARK:58,DEF:59,LT:60,EQ:61,GT:62,IF:63,BRA:91,KET:93,POW:94,OR:124,NOT:126},D={nop:o.NOP,eval:o.CALL,";":o.DEF,":":o.MARK,clr:o.CLR,rand:o.RAND,exit:o.EXIT,".":o.PRN,putc:o.PUTC,getc:o.GETC,putn:o.PUTN,clock:o.CLOCK,drop:o.DROP,swap:o.SWAP,dup:o.DUP,"<<":o.SHIFTL,">>":o.SHIFTR,"+":o.ADD,"-":o.SUB,"*":o.MUL,"/":o.DIV,"<":o.LT,"=":o.EQ,">":o.GT,"?":o.IF,"%":o.MOD,"&":o.AND,"(":o.STASH,")":o.FETCH,"q<":o.PUSHR,"q>":o.PULLR,depth:o.DEPTH,"^":o.POW,"[":o.BRA,"]":o.KET,"|":o.OR,"~":o.NOT,"\\\\":o.RAT},E=255,h={call:"call",push:"push"};function Y(i){return i=i.replace(/\\U([A-Fa-f0-9]{8})/g,(e,t)=>P(t)),i=i.replace(/\\u([A-Fa-f0-9]{4})/g,(e,t)=>P(t)),i.replace(/\\0/g,"\0").replace(/\\b/g,"\b").replace(/\\t/g,"	").replace(/\\n/g,`
`).replace(/\\v/g,"\v").replace(/\\f/g,"\f").replace(/\\r/g,"\r").replace(/\\'/g,"'").replace(/\\"/g,'"').replace(/\\s/g," ").replace(/\\\\/g,"\\")}function P(i){let e="",t=parseInt(i,16);return t<=65535?e+=String.fromCharCode(t):t<=1114111?(t-=65536,e+=String.fromCharCode(55296|t>>10)+String.fromCharCode(56320|t&1023)):e+=`hex2Char error: Code point out of range: ${Z(t)}`,e}function Z(i){return(i+0).toString(16).toUpperCase()}const B="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",x=new Map;B.split("").forEach(function(i,e){x.set(i,e)});const J=5n,N=1n<<J,M=Number(N),U=N-1n;function ee(i){return i.map(ie).map(oe).join("")}function te(i){return re(ae(i)).map(le)}function se(i){return i>=0n?i<<1n:(-i<<1n)+1n}function ne(i){return i&1n?-(i>>1n):i>>1n}function ie(i){if(i===0n)return[0];i=se(i);const e=[];for(;i>0;){let t=Number(i&U);i>>=5n,i>0&&(t|=M),e.push(t)}return e}function oe(i){return i.map(e=>B[e]).join("")}function ae(i){return i.split("").map(e=>{const t=x.get(e);if(t===void 0)throw new Error(`${i} is not a valid base64 encoded VLQ`);return t})}function re(i){const e=[];let t=[];if(i.forEach(s=>{t.push(s),(s&M)===0&&(e.push(t),t=[])}),t.length>0)throw new Error("Malformed VLQ sequence: The last VLQ never ended.");return e}function le(i){const e=i.reverse().reduce((t,s)=>(t<<=5n,t|=BigInt(s)&U,t),0n);return ne(e)}const ce="/*",pe="*/";function he(i){try{let e=1n;return i=i.replaceAll("_",""),i.startsWith("-0")&&(e=-1n,i=i.replace("-","")),i.includes("e")||i.includes("E")?e*BigInt(+i):e*BigInt(i)}catch{return}}class _{constructor(e={}){this.symbols=new Map,this._nextCode=-1,this.host=e;let t;for(t in D)this.symbols.set(t,BigInt(D[t]))}static tokenize(e){return e.split(/\s+/).filter(Boolean).map(t=>{const s=he(t);return s!==void 0?s:t})}static compileToBase64(e){const t=e.flatMap(s=>{if(s.op===h.call&&s.value===0n)return[];const n=s.value<<1n;return[s.op===h.push?n:n|1n]});return ee(t)}nextCode(){return BigInt(this._nextCode--)}getSymbol(e){e=e.toLowerCase();let t=this.symbols.get(e);return t===void 0&&(t=this.nextCode(),this.symbols.set(e,t)),t}compileToIR(e,t=""){var d,m,g;let s=0;const n=e.length;let a="";const r=[];for(;s<n;)if(a=e[s++],typeof a=="bigint")p(a);else if(a.length>1&&a.startsWith(".")){const[l]=a.split(" ");switch(l){case".push":r[r.length-1].op=h.push;break;case".call":r[r.length-1].op=h.call;break;case".inline":(d=r[r.length-1]).meta||(d.meta={}),r[r.length-1].meta.inline=!0;break;case".unsafe":(m=r[r.length-1]).meta||(m.meta={}),r[r.length-1].meta.unsafe=!0;break;case".pointer":(g=r[r.length-1]).meta||(g.meta={}),r[r.length-1].meta.pointer=!0;break;case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Compiler: .exit requires a host exit handler");case".symbols":this.symbols.forEach((v,y)=>{(this.host.log||console.log)(y,v)});break;case".words":{const v=Array.from(this.symbols,([y])=>y).join(" ");(this.host.log||console.log)(v);break}}}else if(a[0]==="'"&&a.length>1)Y(a).replace(/^'/,"").replace(/'$/,"").split("").forEach(l=>{p(l.charCodeAt(0),{comment:l})});else if(a.endsWith(":")&&a.length>1){const l=a.replace(/:$/,"");p(this.getSymbol(l),{name:`${l}`,pointer:!0}),c(o.MARK,{name:":"})}else if(a===ce){const l=[];for(;s<e.length&&(a=e[s++],a!==pe);)l.push(a);c(0n,{comment:l.join(" ")})}else if(a.startsWith("[")&&a.endsWith("]")){const l=a.replace(/^\[/,"").replace(/\]$/,"");p(this.getSymbol(l),{name:l,pointer:!0})}else c(this.getSymbol(a),{name:a});return r;function p(l,v={}){r.push({value:BigInt(l),op:h.push,meta:{...v,filename:t}})}function c(l,v={}){r.push({value:BigInt(l),op:h.call,meta:{...v,filename:t}})}}validate(e){var a,r;const t=e.slice(),s=[];let n=0;for(;n<t.length;){const p=t[n];if(p.op===h.call&&p.value===BigInt(o.DEF)){let c=0;for(c=n;c>0&&!(t[c].op===h.call&&t[c].value===BigInt(o.MARK));c--);const d=t.splice(c-1,n-c+2);(r=(a=d.at(-1))==null?void 0:a.meta)!=null&&r.unsafe||s.push(...this.validateDef(d)),n=c-1}n++}return s.push(...this.validateDef(t,"main")),s}validateDef(e,t){var d,m,g;const s=[];let n=0,a=0,r=0,p=0;if(!e[0])return[];t=X(t||((m=(d=e[0].meta)==null?void 0:d.name)==null?void 0:m.replace(/^&/,""))||"main");const c=G(((g=e[0].meta)==null?void 0:g.filename)||"-");for(;n<e.length;){const l=e[n];l.op===h.call&&(l.op===h.call&&l.value===BigInt(o.MARK)&&a++,l.op===h.call&&l.value===BigInt(o.DEF)&&a--,l.op===h.call&&l.value===BigInt(o.BRA)&&r++,l.op===h.call&&l.value===BigInt(o.KET)&&r--,l.op===h.call&&l.value===BigInt(o.PUSHR)&&p++,l.op===h.call&&l.value===BigInt(o.PULLR)&&p--,r<0&&s.push(`${c}: Bracket ( ${S("[ ]")} ) mismatch in ${t}`),p<0&&s.push(`${c}: Queue push ( ${S("q< q>")} ) mismatch in ${t}`),a<0&&s.push(`${c}: Definition ( ${S(": ;")} ) mismatch in ${t}`)),n++}return r!==0&&s.push(`${c}: Unbalanced brackets ( ${S("[ ]")} ) in ${t}`),p!==0&&s.push(`${c}: Unbalanced queue push ( ${S("q< q>")} ) in ${t}`),a!==0&&s.push(`${c}: Unbalanced definition ( ${S(": ;")} ) in ${t}`),s}}const ue=[BigInt(o.DEF),BigInt(o.KET),BigInt(o.MARK),BigInt(o.BRA)];class de{constructor(e){this.stack=[],this.queue=[],this.defs=new Map,this.symbols=new Map,this.depth=0,this.nextAnonOp=E+1,this.traceOn=!1,this.base=10,this.statsOn=!1,this.profileOn=!1,this.stats={system_instructions_called:0,user_instructions_called:0,max_stack_depth:0,max_queue_depth:0},this.profile={},this.platform=e,this.setup()}static fromBase64(e){return te(e).flatMap(t=>{const s=t&1n,n=t>>1n;return s?[n]:[0n,n]})}getStack(){return this.stack.slice()}peek(){const e=this.stack.length;if(e>0)return this.stack[e-1];throw new Error("Peek: stack underflow")}pop(){if(this.stack.length>0)return this.stack.pop();throw new Error("Pop: stack underflow")}push(e){this.stack.push(e)}poke(e){const t=this.stack.length;if(t>0){this.stack[t-1]=e;return}throw new Error("Poke: stack underflow")}clear(){this.stack.splice(0,this.stack.length)}defineSystem(e,t){const s=BigInt(t),n=this.getName(s);if(this.defs.has(s))throw new Error(`Define: cannot redefine system word "${n}"`);this.defs.set(s,e)}defineUser(e,t){const s=this.getName(t);if(t>-1&&t<E)throw new Error(`Define: cannot define system op "${s}"`);if(this.defs.has(t))throw t>-1?new Error(`Define: cannot redefine system op "${s}"`):new Error(`Define: cannot redefine user op "${s}"`);this.defs.set(t,e)}callSystem(e){var n;const t=this.defs.get(e);if(typeof t=="function"){if(this.statsOn&&this.stats.system_instructions_called++,this.profileOn){const a=performance.now();t();const r=performance.now(),p=this.getName(e)||Number(e);(n=this.profile)[p]||(n[p]=[0,0]),this.profile[p][0]++,this.profile[p][1]!=0,this.profile[p][1]+=r-a;return}return t()}const s=this.getName(e)||e;throw new Error(`Call: undefined system op "${s}"`)}callUser(e){var n;const t=this.defs.get(e);if(Array.isArray(t)){if(this.statsOn&&this.stats.user_instructions_called++,this.queue.unshift(...t),this.profileOn){const a=this.getName(e,`&${e}`);(n=this.profile)[a]||(n[a]=[0,void 0]),this.profile[a][0]++}return}const s=this.getName(e)||e;throw new Error(`Call: undefined user op "${s}"`)}callOp(e){return e>-1n&&e<E?this.callSystem(e):this.callUser(e)}loadBigIntCode(e){this.queue.push(...e)}loadIR(e){var s,n;let t=0;for(;t<e.length;){const a=e[t++];if(a.op===h.call){if(a.value===0n)continue;(s=a.meta)!=null&&s.name&&!this.symbols.has(a.value)&&this.symbols.set(a.value,(n=a.meta)==null?void 0:n.name),this.queue.push(a.value)}else this.queue.push(0n),this.queue.push(a.value)}return this.stack}run(){const e=this.queue;let t=!1;for(;e.length>0;){const s=e.shift()||0n;t=!this.depth||ue.includes(s),this.traceOn&&this.trace(s,t),s===0n?(t||this.push(s),this.push(e.shift()||0n)):(t||this.push(s),t&&this.callOp(s)),this.statsOn&&(this.stats.max_stack_depth=Math.max(this.stats.max_stack_depth,this.stack.length),this.stats.max_queue_depth=Math.max(this.stats.max_queue_depth,e.length))}return this.stack}trace(e,t){let s=this.getName(e);t&&(s=`*${s}*`);const n=this.stack.map(String).join(" "),a=this.queue.map(String).join(" ");console.log(`[ ${n} ] ${s} [ ${a.slice(0,10)}...`)}getName(e,t=String(e)){return this.symbols.has(e)?this.symbols.get(e):String(t)}print(){const e=this.stack.map(t=>t.toString(this.base)).join(" ");console.log(`[ ${e} ]`)}loadSourceMap(e){Object.keys(e.symbols).forEach(t=>{this.symbols.set(BigInt(t),e.symbols[t])})}setup(){const e=new TextEncoder;let t;for(t in D)this.symbols.set(BigInt(D[t]),t);this.defineSystem(()=>{},o.NOP),this.defineSystem(()=>{const s=this.pop();this.queue.unshift(s)},o.CALL),this.defineSystem(()=>{this.depth--;const s=this.queue.pop(),n=this.stack.splice(Number(s||0))||[];this.defineUser(n,this.pop())},o.DEF),this.defineSystem(()=>{this.depth--;const s=this.queue.pop(),n=this.stack.splice(Number(s||0))||[],a=BigInt(this.nextAnonOp++);this.defineUser(n,a),this.depth>0&&this.push(0n),this.push(a)},o.KET),this.defineSystem(()=>{this.depth++;const s=this.stack.length;this.queue.push(BigInt(s))},o.BRA),this.defineSystem(()=>{this.depth++;const s=this.stack.length;this.queue.push(BigInt(s))},o.MARK),this.defineSystem(()=>this.clear(),o.CLR),this.defineSystem(()=>{const s=this.pop();this.platform.exit(Number(s))},o.EXIT),this.defineSystem(()=>{const s=this.pop();this.push(me(s))},o.RAND),this.defineSystem(()=>{this.print()},o.PRN),this.defineSystem(()=>{const s=this.pop(),n=this.pop();console.log(Number(n)/Number(s))},o.RAT),this.defineSystem(()=>{this.push(BigInt(this.platform.now()))},o.CLOCK),this.defineSystem(()=>{const s=e.encode(String.fromCharCode(Number(this.pop())));this.platform.io.write(s)},o.PUTC),this.defineSystem(()=>{this.platform.io.setRaw&&this.platform.io.setRaw(!0);const s=this.platform.io.readByte();this.platform.io.setRaw&&this.platform.io.setRaw(!1),this.push(BigInt(s??0))},o.GETC),this.defineSystem(()=>{const s=e.encode(this.pop().toString(this.base));this.platform.io.write(s)},o.PUTN),this.defineSystem(()=>{this.pop()},o.DROP),this.defineSystem(()=>{const s=this.peek(),n=this.stack[this.stack.length-2];this.stack[this.stack.length-2]=s,this.poke(n)},o.SWAP),this.defineSystem(()=>{this.push(this.peek())},o.DUP),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]+=s},o.ADD),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]-=s},o.SUB),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]*=s},o.MUL),this.defineSystem(()=>{const s=this.pop();if(s===0n)throw new Error("DIV: Division by zero");this.stack[this.stack.length-1]/=s},o.DIV),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]%=s},o.MOD),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]<<=s},o.SHIFTL),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]>>=s},o.SHIFTR),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]&=s},o.AND),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]**=s},o.POW),this.defineSystem(()=>{this.push(this.pop()>this.pop()?1n:0n)},o.LT),this.defineSystem(()=>{this.push(this.pop()===this.pop()?1n:0n)},o.EQ),this.defineSystem(()=>{this.push(this.pop()<this.pop()?1n:0n)},o.GT),this.defineSystem(()=>{const s=this.pop();this.pop()!==0n&&this.queue.unshift(s)},o.IF),this.defineSystem(()=>{this.queue.push(this.pop())},o.PUSHR),this.defineSystem(()=>{const s=this.queue.pop()||0n;this.push(s)},o.PULLR),this.defineSystem(()=>{this.push(BigInt(this.stack.length))},o.DEPTH),this.defineSystem(()=>{const s=this.stack.length;this.queue.push(...this.stack.splice(0,s)),this.queue.push(BigInt(s))},o.STASH),this.defineSystem(()=>{const s=Number(this.queue.pop());this.stack.unshift(...this.queue.splice(-s))},o.FETCH),this.defineSystem(()=>{const s=this.pop();this.stack[this.stack.length-1]|=s},o.OR),this.defineSystem(()=>{const s=this.pop();this.push(~s)},o.NOT)}printProfile(){console.log(),console.log("Profile:");const e=Object.keys(this.profile).map(n=>{const a=this.profile[n][0],r=this.profile[n][1];return{name:n,calls:a,time:r,system:typeof r<"u","ops/ms":r?Math.round(a/r):""}}).sort((n,a)=>a.calls-n.calls),t=e.filter(n=>n.system),s=e.filter(n=>!n.system);console.table(t,["name","calls","ops/ms"]),console.table(s,["name","calls"]),console.log()}printStats(){console.log(),console.log("Interpreter stats:"),console.log(this.stats),console.log()}}function me(i){const e=i,t=e.toString().length;let s="";for(;s.length<t;)s+=Math.random().toString().split(".")[1];s=s.slice(0,t);const n="1"+"0".repeat(t);return e*BigInt(s)/BigInt(n)}const k=BigInt(o.DEF),O=BigInt(o.KET),q=BigInt(o.MARK),R=BigInt(o.BRA),u=i=>(i=BigInt(i),e=>e.op===h.call&&e.value===i),b=i=>(i=BigInt(i),e=>e.op===h.push&&e.value===i),f=i=>i.op===h.push,I=i=>i.op===h.push&&i.value!==0n,fe=[{name:"No operation",pattern:[u(o.NOP)],replacement:()=>[]},{name:"Null Sequence - SWAP SWAP",pattern:[u(o.SWAP),u(o.SWAP)],replacement:()=>[]},{name:"Null Sequence - DUP DROP",pattern:[u(o.DUP),u(o.DROP)],replacement:()=>[]},{name:"Null Sequence - PUSHR PULLR",pattern:[u(o.PUSHR),u(o.PULLR)],replacement:()=>[]},{name:"Null Sequence - CLOCK DROP",pattern:[u(o.CLOCK),u(o.DROP)],replacement:()=>[]},{name:"Null Sequence - RAND DROP",pattern:[u(o.RAND),u(o.DROP)],replacement:()=>[]},{name:"Null Sequence - DEPTH DROP",pattern:[u(o.DEPTH),u(o.DROP)],replacement:()=>[]},{name:"Null Sequence - NOT NOT",pattern:[u(o.NOT),u(o.NOT)],replacement:()=>[]},{name:"Indirect calls - n EVAL",pattern:[f,u(o.CALL)],replacement:i=>{var e,t;return[{op:h.call,value:i.value,meta:{name:(t=(e=i.meta)==null?void 0:e.name)==null?void 0:t.replace(/^&/,"")}}]}},{name:"Null Sequence - n DROP",pattern:[f,u(o.DROP)],replacement:()=>[]},{name:"Constant Folding - a b ADD",pattern:[f,f,u(o.ADD)],replacement:(i,e)=>[{op:h.push,value:i.value+e.value}]},{name:"Algebraic Simplification - 0 ADD",pattern:[b(0),u(o.ADD)],replacement:()=>[]},{name:"Algebraic Simplification - swap ADD",pattern:[u(o.SWAP),u(o.ADD)],replacement:(i,e)=>[e]},{name:"Constant Folding - a b SUB",pattern:[f,f,u(o.SUB)],replacement:(i,e)=>[{op:h.push,value:i.value-e.value}]},{name:"Algebraic Simplification - 0 SUB",pattern:[b(0),u(o.SUB)],replacement:()=>[]},{name:"Constant Folding - a b MUL",pattern:[f,f,u(o.MUL)],replacement:(i,e)=>[{op:h.push,value:i.value*e.value}]},{name:"Algebraic Simplification - 1 MUL",pattern:[b(1),u(o.MUL)],replacement:()=>[]},{name:"Algebraic Simplification - swap MUL",pattern:[u(o.SWAP),u(o.MUL)],replacement:(i,e)=>[e]},{name:"Constant Folding - a b DIV",pattern:[f,I,u(o.DIV)],replacement:(i,e)=>[{op:h.push,value:i.value/e.value}]},{name:"Algebraic Simplification - 1 DIV",pattern:[b(1),u(o.DIV)],replacement:()=>[]},{name:"Constant propagation - a DUP",pattern:[f,u(o.DUP)],replacement:i=>[i,i]},{name:"Unreachable Code - 0 &b IF",pattern:[b(0),f,u(o.IF)],replacement:()=>[]},{name:"Flows-Of-Control Optimizations - !0 &b IF",pattern:[I,f,u(o.IF)],replacement:(i,e,t)=>{var s,n;return[{op:h.call,value:e.value,meta:{name:(n=(s=e.meta)==null?void 0:s.name)==null?void 0:n.replace(/^&/,"")}}]}},{name:"Null Sequence - 0 eval",pattern:[b(0),u(o.CALL)],replacement:()=>[]},{name:"Flows-Of-Control Optimizations - n [ ]",pattern:[f,u(o.BRA),u(o.KET)],replacement:()=>[{op:h.push,value:0n,meta:{pointer:!0,name:"0"}}]},{name:"a q< b a> - b a",pattern:[f,u(o.PUSHR),f,u(o.PULLR)],replacement:(i,e,t)=>[t,i]}];class ge{constructor(){this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0},this.minOptPasses=2,this.maxOptPasses=20,this.defs=new Map,this.calledWords=new Set,this.optimized=[],this.nextAnonOp=E+1}optimize(e){this.reset(),this.stats.pre_optimization_ir_size=e.length,this.optimized=e;let t;do t=this.optimized.length,this.optLoop();while((this.optimized.length<t||this.stats.optimization_passes<this.minOptPasses)&&this.stats.optimization_passes<this.maxOptPasses);return this.optimized=this.pullDefs(this.optimized),this.optimized=this.addReferencedWords(this.optimized),this.stats.post_optimization_ir_size=this.optimized.length,this.optimized}optLoop(){this.optimized=this.peepholeOptimization(this.optimized),this.optimized=this.getDefs(this.optimized),this.optimized=this.inlineWords(this.optimized,4),this.stats.optimization_passes++}reset(){this.optimized=[],this.defs=new Map,this.calledWords=new Set,this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0}}getDefs(e){var s;let t=0;for(;t<e.length;){const n=e[t];if(n.op===h.call){if(n.value===O){this.stats.optimization_passes===0&&this.stats.user_defined_anon_defs++,n.meta??(n.meta={}),(s=n.meta).uid??(s.uid=this.nextAnonOp++);let a=t;for(;a-- >0;){const d=e[a];if(d.op===h.call&&d.value===R)break}const r=BigInt(n.meta.uid),p={op:h.push,value:r,meta:{pointer:!0}},c=e.slice(a,t+1);c.unshift(p),c[1]={...c[1],value:q,meta:{...c[1].meta,name:":"}},c[c.length-1]={...c[c.length-1],value:k,meta:{...c[c.length-1].meta,name:";"}},this.defs.set(r,c)}else if(n.value===k){this.stats.optimization_passes===0&&this.stats.user_defined_named_defs++;let a=t;for(;a-- >0;){const c=e[a];if(c.op===h.call&&c.value===q)break}const r=e[a-1];r.meta||(r.meta={}),r.meta.pointer=!0;const p=e.slice(a-1,t+1);this.defs.set(r.value,p)}}t++}return e}pullDefs(e,t=!1){var a;const s=e.slice();let n=0;for(;n<s.length;){const r=s[n];if(r.op===h.call){if(r.value===O){r.meta??(r.meta={}),(a=r.meta).uid??(a.uid=this.nextAnonOp++);const p=n;for(;n-- >0;){const g=s[n];if(g.op===h.call&&g.value===R)break}const c=BigInt(r.meta.uid),d={op:h.push,value:c,meta:{pointer:!0}},m=s.splice(n,p-n+1,d);m.unshift(d),m[1]={...m[1],value:q,meta:{...m[1].meta,name:":"}},m[m.length-1]={...m[m.length-1],value:k,meta:{...m[m.length-1].meta,name:";"}},this.defs.set(c,m)}else if(r.value===k&&!t){const p=n;for(;n-- >0;){const m=s[n];if(m.op===h.call&&m.value===q)break}const c=s[n-1];c.meta||(c.meta={}),c.meta.pointer=!0;const d=s.splice(n-1,p-n+2);n=n-2,this.defs.set(d[0].value,d)}}n++}return s}peepholeOptimization(e){const t=e.slice();for(;;){const s=this.stats.peephole_optimizations;let n=0;for(;n<t.length;){for(const a of fe){const{pattern:r,replacement:p}=a;if(r.every((d,m)=>d(t[n+m]))){this.stats.peephole_optimizations++;const d=t.slice(n,n+r.length);t.splice(n,r.length,...p(...d)),n=Math.max(0,n-r.length-1);break}}n++}if(this.stats.peephole_optimizations>=s)break}return t}inlineWords(e,t=1,s=[]){return e.flatMap(n=>{var a,r,p,c;if((a=n.meta)!=null&&a.unsafe)return n;if(n.op===h.call&&this.defs.has(n.value)){if(s.includes(n.value))return n;const d=this.defs.get(n.value);if(!d)return n;const m=d[d.length-1];if((r=m.meta)!=null&&r.unsafe)return n;if((p=m.meta)!=null&&p.inline||(c=n.meta)!=null&&c.inline)return this.stats.inlined_calls++,this.inlineWords(d.slice(2,-1),1/0,s.concat(n.value));if(d.length<=t+3)return this.stats.inlined_calls++,this.inlineWords(d.slice(2,-1),t,s.concat(n.value))}return n})}addReferencedWords(e){return e.slice().forEach(t=>{var s;t.op===h.push&&((s=t.meta)!=null&&s.pointer)?this.addDef(t.value):t.op===h.call&&this.addDef(t.value)}),e}addDef(e){if(!this.calledWords.has(e)){const t=this.defs.get(e);if(t)return this.stats.post_optimization_user_defs++,this.calledWords.add(e),this.optimized.unshift(...t),this.addReferencedWords(t)}}}class A{constructor(e,t){this.imported=new Set,this.host=e,this.engine=t.engine,this.compiler=t.compiler||new _}static tokenize(e){return e.split(/[\r\n]+/)}preprocess(e,t="-"){return e.map(s=>{if(s.length>1&&s[0]==="."){const[n,...a]=s.split(" ");if(n[0]==="."&&n.length>1){switch(n){case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Preprocessor: .exit requires a host exit handler");case".load":{const r=this.findFile(a.join(" "),t),p=this.host.readTextFile(r);return this.preprocess(A.tokenize(p),r)}case".import":{const r=this.findFile(a.join(" "),t);if(!this.imported.has(r)){this.imported.add(r);const p=this.host.readTextFile(r);return this.preprocess(A.tokenize(p),r)}return""}case".m":{const r=this.compiler.compileToIR(_.tokenize(a.join(" ")));this.engine.loadIR(r),this.engine.run();const p=this.engine.getStack();return this.engine.clear(),p.map(String).join(" ")+` /* ${s} */`}}return""}}return s}).join(`
`)}findFile(e,t="-"){if(t&&t!=="-"&&!this.host.path.isAbsolute(e)){const s=this.host.path.dirname(t),n=this.host.path.resolve(s,e);if(this.host.fileExists(n))return n}if(this.host.fileExists(e))return e;throw'File not found: "'+e+'"'}}function C(i){const e=i.startsWith("/"),t=i.split("/").filter(Boolean),s=[];for(const n of t)if(n!=="."){if(n===".."){s.pop();continue}s.push(n)}return`${e?"/":""}${s.join("/")}`||(e?"/":".")}function ve(i){const e=C(i),t=e.lastIndexOf("/");return t<=0?e.startsWith("/")?"/":".":e.slice(0,t)}function ye(...i){const e=i.filter(Boolean).join("/").replaceAll(/\/+/g,"/");return C(e)}function Se(i){return{readTextFile(e){const t=C(e),s=i[t];if(typeof s!="string")throw new Error(`Virtual file not found: ${t}`);return s},fileExists(e){return typeof i[C(e)]=="string"},path:{isAbsolute(e){return e.startsWith("/")},dirname:ve,resolve:ye}}}function be(i={}){const e=new TextDecoder,t=new TextEncoder,s=Array.from(t.encode(i.stdin??""));return{io:{write(n){var a;(a=i.onWrite)==null||a.call(i,e.decode(n))},readByte(){return s.shift()??null}},exit(n){var a;(a=i.onExit)==null||a.call(i,n)},now(){return Date.now()}}}const $={"/examples/hello.ffp":z},L=z;function w(i){return i.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function we(i){return{"/main.ffp":i,"/lib/core.ff":V,...$}}function _e(i,e,t){let s="";const n=[];let a=0;const r=be({stdin:e,onWrite(l){s+=l},onExit(l){a=l}}),p=new _,c=new de(r),d=we(i),m=new A(Se(d),{engine:c,compiler:p}),g=console.log;console.log=(...l)=>{n.push(l.map(String).join(" "))};try{const l=m.preprocess(A.tokenize(i),"/main.ffp"),v=performance.now();let y=p.compileToIR(_.tokenize(l),"/main.ffp");const H=performance.now(),W=p.validate(y);t&&(y=new ge().optimize(y)),c.loadIR(y);const j=performance.now();c.run();const K=performance.now();return{output:s,preprocessed:l,bytecode:_.compileToBase64(y),issues:W,stack:c.getStack().map(String),logs:n,exitCode:a,compileMs:H-v,executeMs:K-j}}finally{console.log=g}}function Ae(i){i.innerHTML=`
    <main class="shell">
      <section class="hero">
        <p class="eyebrow">f-flat-minor / web</p>
        <h1>Run F-flat-minor in the browser.</h1>
        <p class="lede">
          This SPA uses the shared TypeScript core for preprocessing, compiling, and execution.
          The bundled browser shim provides virtual files, stdin, stdout, and timing.
        </p>
      </section>

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
    </main>
  `;const e=i.querySelector("#source"),t=i.querySelector("#stdin"),s=i.querySelector("#optimize"),n=i.querySelector("#example"),a=i.querySelector("#load-example"),r=i.querySelector("#run"),p=i.querySelector("#summary"),c=i.querySelector("#output"),d=i.querySelector("#preprocessed"),m=i.querySelector("#bytecode");if(!e||!t||!s||!n||!a||!r||!p||!c||!d||!m)throw new Error("App failed to mount");e.value=L;function g(){try{const l=_e(e.value,t.value,s.checked),v=l.issues.length,y=[l.output?l.output.trimEnd():"(no stdout)",v?`

${v} compiler issue(s):
${l.issues.join(`
`)}`:"",l.logs.length?`

console log:
${l.logs.join(`
`)}`:""].join("");p.innerHTML=`
        <article class="summary-card">
          <span class="summary-k">compile</span>
          <strong>${l.compileMs.toFixed(2)} ms</strong>
        </article>
        <article class="summary-card">
          <span class="summary-k">execute</span>
          <strong>${l.executeMs.toFixed(2)} ms</strong>
        </article>
        <article class="summary-card">
          <span class="summary-k">stack</span>
          <strong>${l.stack.length?w(l.stack.join(" ")):"(empty)"}</strong>
        </article>
        <article class="summary-card">
          <span class="summary-k">exit</span>
          <strong>${l.exitCode}</strong>
        </article>
      `,c.innerHTML=w(y),d.innerHTML=w(l.preprocessed),m.innerHTML=w(l.bytecode)}catch(l){const v=l instanceof Error?l.message:String(l);p.innerHTML=`
        <article class="summary-card">
          <span class="summary-k">status</span>
          <strong>run failed</strong>
        </article>
      `,c.innerHTML=w(v),d.innerHTML="",m.innerHTML=""}}a.addEventListener("click",()=>{e.value=$[n.value]??L,g()}),r.addEventListener("click",g),g()}const F=document.querySelector("#app");if(!F)throw new Error("Missing #app root");Ae(F);
