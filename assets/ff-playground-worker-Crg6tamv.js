(function(){"use strict";function nn(){var n,e,t,s,r;return!!(((t=(e=(n=globalThis.Deno)==null?void 0:n.stdout)==null?void 0:e.isTerminal)==null?void 0:t.call(e))??((r=(s=globalThis.process)==null?void 0:s.stdout)==null?void 0:r.isTTY)??!1)}function O(i,n){return nn()?`\x1B[${i}m${n}\x1B[0m`:n}function en(i){return O(34,i)}function tn(i){return O(32,i)}function x(i){return O(36,i)}const o={NOP:0,CALL:1,PUTC:2,GETC:3,PUTN:5,CLOCK:6,DROP:8,PUSHR:14,PULLR:15,SHIFTL:16,SHIFTR:17,CLR:24,RAND:26,EXIT:27,DUP:33,DEPTH:35,SWAP:36,MOD:37,AND:38,STASH:40,FETCH:41,MUL:42,ADD:43,CONS:44,SUB:45,PRN:46,DIV:47,MARK:58,DEF:59,LT:60,EQ:61,GT:62,IF:63,BRA:91,KET:93,POW:94,OR:124,NOT:126},k={nop:o.NOP,eval:o.CALL,";":o.DEF,":":o.MARK,clr:o.CLR,rand:o.RAND,exit:o.EXIT,".":o.PRN,putc:o.PUTC,getc:o.GETC,putn:o.PUTN,clock:o.CLOCK,drop:o.DROP,swap:o.SWAP,dup:o.DUP,"<<":o.SHIFTL,">>":o.SHIFTR,"+":o.ADD,"-":o.SUB,cons:o.CONS,"*":o.MUL,"/":o.DIV,"<":o.LT,"=":o.EQ,">":o.GT,"?":o.IF,"%":o.MOD,"&":o.AND,"(":o.STASH,")":o.FETCH,"q<":o.PUSHR,"q>":o.PULLR,depth:o.DEPTH,"^":o.POW,"[":o.BRA,"]":o.KET,"|":o.OR,"~":o.NOT},S=255,sn=i=>i,rn=i=>i,d={call:"call",push:"push"},on=6,D=10,an=new Map([[BigInt(o.MARK),":"],[BigInt(o.DEF),";"],[BigInt(o.BRA),"["],[BigInt(o.KET),"]"]]);function pn(i){return(""+i.value).padEnd(D," ")}function cn(i,n){var e;return n?n.padEnd(D," "):i.op===d.push&&((e=i.meta)!=null&&e.pointer)?`[${i.value}]`.padEnd(D," "):pn(i)}function ln(i){return i.trim()?`/* ${i} */`:""}function un(i){var c,p,l;const n=((c=fn(i))==null?void 0:c.toUpperCase())||"",e=i.op===d.call?an.get(i.value):void 0,t=e!==void 0,s=cn(i,e),r=((l=(p=i.meta)==null?void 0:p.comment)==null?void 0:l.trim())||(i.op===d.call&&!t?n:""),a=(i.op===d.call&&!e?"EVAL":"").padEnd(on," ");return[rn(s),sn(a),ln(r)].join(" ")}function dn(i){for(const n in k)if(k[n]===i)return n;return""}function fn(i){var n,e;if(i.op===d.call||i.op===d.push&&((n=i.meta)!=null&&n.pointer))return((e=i.meta)==null?void 0:e.name)||dn(Number(i.value))||""}function hn(i){return i.map(un).join(`
`)}function _n(i){return i=i.replace(/\\U([A-Fa-f0-9]{8})/g,(n,e)=>L(e)),i=i.replace(/\\u([A-Fa-f0-9]{4})/g,(n,e)=>L(e)),i.replace(/\\0/g,"\0").replace(/\\b/g,"\b").replace(/\\t/g,"	").replace(/\\n/g,`
`).replace(/\\v/g,"\v").replace(/\\f/g,"\f").replace(/\\r/g,"\r").replace(/\\'/g,"'").replace(/\\"/g,'"').replace(/\\s/g," ").replace(/\\\\/g,"\\")}function L(i){let n="",e=parseInt(i,16);return e<=65535?n+=String.fromCharCode(e):e<=1114111?(e-=65536,n+=String.fromCharCode(55296|e>>10)+String.fromCharCode(56320|e&1023)):n+=`hex2Char error: Code point out of range: ${mn(e)}`,n}function mn(i){return(i+0).toString(16).toUpperCase()}const F="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",U=new Map;F.split("").forEach(function(i,n){U.set(i,n)});const $=1n<<5n,W=Number($),j=$-1n;function gn(i){return i.map(yn).map(xn).join("")}function bn(i){return kn(qn(i)).map(Sn)}function vn(i){return i>=0n?i<<1n:(-i<<1n)+1n}function wn(i){return i&1n?-(i>>1n):i>>1n}function yn(i){if(i===0n)return[0];i=vn(i);const n=[];for(;i>0;){let e=Number(i&j);i>>=5n,i>0&&(e|=W),n.push(e)}return n}function xn(i){return i.map(n=>F[n]).join("")}function qn(i){return i.split("").map(n=>{const e=U.get(n);if(e===void 0)throw new Error(`${i} is not a valid base64 encoded VLQ`);return e})}function kn(i){const n=[];let e=[];if(i.forEach(t=>{e.push(t),(t&W)===0&&(n.push(e),e=[])}),e.length>0)throw new Error("Malformed VLQ sequence: The last VLQ never ended.");return n}function Sn(i){const n=i.reverse().reduce((e,t)=>(e<<=5n,e|=BigInt(t)&j,e),0n);return wn(n)}const En="/*",Tn="*/";function N(i){if(!(i==="-"||i==="+"))try{let n=1n;return i=i.replaceAll("_",""),i.startsWith("-0")&&(n=-1n,i=i.replace("-","")),i.includes("e")||i.includes("E")?n*BigInt(+i):n*BigInt(i)}catch{return}}class w{constructor(n={}){this.symbols=new Map,this._nextCode=-1,this.host=n;let e;for(e in k)this.symbols.set(e,BigInt(k[e]))}static tokenize(n){return n.split(/\s+/).filter(Boolean).map(e=>{const t=N(e);return t!==void 0?t:e})}static tokenizeWithSpans(n){const e=[],t=/\S+/g;let s=0,r=0,a=0;const c=l=>{for(;a<l;){const u=n[a];u==="\r"?(n[a+1]===`
`&&a++,s++,r=0):u===`
`?(s++,r=0):r++,a++}};let p;for(;(p=t.exec(n))!==null;){const l=p.index;c(l);const u=p[0]??"",_=N(u);e.push({raw:u,value:_!==void 0?_:u,line:s,character:r,length:u.length,offset:l}),c(l+u.length)}return e}static compileToBase64(n){const e=n.flatMap(t=>{if(t.op===d.call&&t.value===0n)return[];const s=t.value<<1n;return[t.op===d.push?s:s|1n]});return gn(e)}nextCode(){return BigInt(this._nextCode--)}getSymbol(n){n=n.toLowerCase();let e=this.symbols.get(n);return e===void 0&&(e=this.nextCode(),this.symbols.set(n,e)),e}compileToIR(n,e=""){var u,_,m;let t=0;const s=n.length;let r="";const a=[];let c;for(;t<s;)if(c=n[t++],r=this.unwrapTokenValue(c),typeof r=="bigint")p(r);else if(r.length>1&&r.startsWith(".")){const[f]=r.split(" ");switch(f){case".push":a[a.length-1].op=d.push;break;case".call":a[a.length-1].op=d.call;break;case".inline":(u=a[a.length-1]).meta||(u.meta={}),a[a.length-1].meta.inline=!0;break;case".unsafe":(_=a[a.length-1]).meta||(_.meta={}),a[a.length-1].meta.unsafe=!0;break;case".pointer":(m=a[a.length-1]).meta||(m.meta={}),a[a.length-1].meta.pointer=!0;break;case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Compiler: .exit requires a host exit handler");case".symbols":this.symbols.forEach((g,v)=>{(this.host.log||console.log)(v,g)});break;case".words":{const g=Array.from(this.symbols,([v])=>v).join(" ");(this.host.log||console.log)(g);break}}}else if(r[0]==="'"&&r.length>1)_n(r).replace(/^'/,"").replace(/'$/,"").split("").forEach(f=>{p(f.charCodeAt(0),{comment:f})});else if(r.endsWith(":")&&r.length>1){const f=r.replace(/:$/,"");p(this.getSymbol(f),{name:`${f}`,pointer:!0}),l(o.MARK,{name:":"})}else if(r===En){const f=c,g=[];for(;t<n.length&&(c=n[t++],r=this.unwrapTokenValue(c),r!==Tn);)g.push(r);l(0n,{comment:g.join(" ")},f)}else if(r.startsWith("[")&&r.endsWith("]")){const f=r.replace(/^\[/,"").replace(/\]$/,""),g=N(f);g!==void 0?p(g,{name:f,pointer:!0}):p(this.getSymbol(f),{name:f,pointer:!0})}else l(this.getSymbol(r),{name:r});return a;function p(f,g={},v=c){a.push({value:BigInt(f),op:d.push,meta:{...g,...w.toInstructionMeta(v,e)}})}function l(f,g={},v=c){a.push({value:BigInt(f),op:d.call,meta:{...g,...w.toInstructionMeta(v,e)}})}}unwrapTokenValue(n){return typeof n=="string"||typeof n=="bigint"?n:n.value}static toInstructionMeta(n,e){return!n||typeof n=="string"||typeof n=="bigint"?{filename:e}:{filename:e,line:n.line,character:n.character,length:n.length,offset:n.offset}}validate(n){var r,a;const e=n.slice(),t=[];let s=0;for(;s<e.length;){const c=e[s];if(c.op===d.call&&c.value===BigInt(o.DEF)){let p=0;for(p=s;p>0&&!(e[p].op===d.call&&e[p].value===BigInt(o.MARK));p--);const l=e.splice(p-1,s-p+2);(a=(r=l.at(-1))==null?void 0:r.meta)!=null&&a.unsafe||t.push(...this.validateDef(l)),s=p-1}s++}return t.push(...this.validateDef(e,"main")),t}validateDef(n,e){var u,_,m;const t=[];let s=0,r=0,a=0,c=0;const p=[0];if(!n[0])return[];e=tn(e||((_=(u=n[0].meta)==null?void 0:u.name)==null?void 0:_.replace(/^&/,""))||"main");const l=en(((m=n[0].meta)==null?void 0:m.filename)||"-");for(;s<n.length;){const f=n[s];if(f.op===d.call){if(f.op===d.call&&f.value===BigInt(o.MARK)&&r++,f.op===d.call&&f.value===BigInt(o.DEF)&&r--,f.op===d.call&&f.value===BigInt(o.BRA)&&(a++,p.push(0)),f.op===d.call&&f.value===BigInt(o.KET)&&(a--,(p.length>1?p.pop():0)!==0&&t.push(`${l}: Unbalanced queue push ( ${x("q< q>")} ) in quote in ${e}`)),f.op===d.call&&(f.value===BigInt(o.PUSHR)||f.value===BigInt(o.STASH))&&(c++,p[p.length-1]++),f.op===d.call&&(f.value===BigInt(o.PULLR)||f.value===BigInt(o.FETCH))){if(p[p.length-1]===0){const v=f.value===BigInt(o.FETCH)?")":"q>";t.push(`${l}: Queue borrow ( ${x(v)} ) requires ${x(".unsafe")} in ${e} (including quotes)`)}c--,p[p.length-1]--}a<0&&t.push(`${l}: Bracket ( ${x("[ ]")} ) mismatch in ${e}`),r<0&&t.push(`${l}: Definition ( ${x(": ;")} ) mismatch in ${e}`)}s++}return a!==0&&t.push(`${l}: Unbalanced brackets ( ${x("[ ]")} ) in ${e}`),c!==0&&t.push(`${l}: Unbalanced queue push ( ${x("q< q> ( )")} ) in ${e}`),r!==0&&t.push(`${l}: Unbalanced definition ( ${x(": ;")} ) in ${e}`),t}}var An={words:[{mnemonic:"NOP",syntax:"nop",stackEffect:"… nop == …",description:"No operation; does nothing.",opcode:0},{mnemonic:"EVAL",syntax:"eval",stackEffect:"[A] eval == a*",description:"Evaluates a quotation, executing its contents.",opcode:1},{mnemonic:"PUTC",syntax:"putc",stackEffect:"n putc == {prints char(n)}",description:"Prints a character given by its numeric code.",opcode:2},{mnemonic:"GETC",syntax:"getc",stackEffect:"getc == n {reads char}",description:"Reads a single character from input and pushes its code.",opcode:3},{mnemonic:"PUTN",syntax:"putn",stackEffect:"n putn == {prints n}",description:"Prints a number to output.",opcode:5},{mnemonic:"CLOCK",syntax:"clock",stackEffect:"clock == n {reads clock}",description:"Returns the current time as a Unix timestamp.",opcode:6},{mnemonic:"DROP",syntax:"drop",stackEffect:"a drop ==",description:"Removes the top value from the stack.",opcode:8},{mnemonic:"PUSHR",syntax:"q<",stackEffect:"a q< == | …a",description:"Pushes a value onto the return stack.",opcode:14},{mnemonic:"PULLR",syntax:"q>",stackEffect:"q> == a | a…",description:"Pops a value from the return stack onto the main stack.",opcode:15},{mnemonic:"SHIFTL",syntax:"<<",stackEffect:"a b << == n",description:"Left-shifts a by b bits.",opcode:16},{mnemonic:"SHIFTR",syntax:">>",stackEffect:"a b >> == n",description:"Right-shifts a by b bits.",opcode:17},{mnemonic:"CLR",syntax:"clr",stackEffect:"… clr ==",description:"Clears the entire stack.",opcode:24},{mnemonic:"RAND",syntax:"rand",stackEffect:"n rand == r {0 <= r < n}",description:"Generates a random number between 0 and n-1.",opcode:26},{mnemonic:"EXIT",syntax:"exit",stackEffect:"n exit == {exits with code n}",description:"Exits the program with the given exit code.",opcode:27},{mnemonic:"DUP",syntax:"dup",stackEffect:"a dup == a a",description:"Duplicates the top value on the stack.",opcode:33},{mnemonic:"DEPTH",syntax:"depth",stackEffect:"… depth == … n",description:"Pushes the current stack depth.",opcode:35},{mnemonic:"SWAP",syntax:"swap",stackEffect:"a b swap == b a",description:"Swaps the top two values on the stack.",opcode:36},{mnemonic:"MOD",syntax:"%",stackEffect:"a b % == n",description:"Computes the remainder of a divided by b.",opcode:37},{mnemonic:"AND",syntax:"&",stackEffect:"a b & == n",description:"Bitwise AND of a and b.",opcode:38},{mnemonic:"STASH",syntax:"(",stackEffect:"… ( == {moves stack to queue}",description:"Moves values from the stack to the queue.",opcode:40},{mnemonic:"FETCH",syntax:")",stackEffect:") == … {restores stack from queue}",description:"Moves values from the queue back to the stack.",opcode:41},{mnemonic:"MUL",syntax:"*",stackEffect:"a b * == n",description:"Multiplies a by b.",opcode:42},{mnemonic:"ADD",syntax:"+",stackEffect:"a b + == n",description:"Adds a and b together.",opcode:43},{mnemonic:"SUB",syntax:"-",stackEffect:"a b - == n",description:"Subtracts b from a.",opcode:45},{mnemonic:"DUMP",syntax:".",stackEffect:"… . == … {prints stack}",description:"Prints the entire stack to output.",opcode:46},{mnemonic:"DIV",syntax:"/",stackEffect:"a b / == n",description:"Divides a by b (integer division).",opcode:47},{mnemonic:"MARK",syntax:":",stackEffect:"n : == {begin definition(n)}",description:"Begins a new word definition with name n.",opcode:58},{mnemonic:"DEF",syntax:";",stackEffect:"; == {end definition}",description:"Ends the current word definition.",opcode:59},{mnemonic:"LT",syntax:"<",stackEffect:"a b < == flag",description:"Pushes true if a is less than b.",opcode:60},{mnemonic:"EQ",syntax:"=",stackEffect:"a b = == flag",description:"Pushes true if a equals b.",opcode:61},{mnemonic:"GT",syntax:">",stackEffect:"a b > == flag",description:"Pushes true if a is greater than b.",opcode:62},{mnemonic:"WHEN",syntax:"?",stackEffect:"flag [A] ? == a*",description:"Executes the quotation if flag is true.",opcode:63},{mnemonic:"BRA",syntax:"[",stackEffect:"[ == {begin quotation}",description:"Begins a quotation (anonymous code block).",opcode:91},{mnemonic:"KET",syntax:"]",stackEffect:"] == [A] {end quotation}",description:"Ends a quotation and pushes it to the stack.",opcode:93},{mnemonic:"POW",syntax:"^",stackEffect:"a b ^ == n",description:"Computes a raised to the power of b.",opcode:94},{mnemonic:"OR",syntax:"|",stackEffect:"a b | == n",description:"Bitwise OR of a and b.",opcode:124},{mnemonic:"NOT",syntax:"~",stackEffect:"a ~ == n'",description:"Bitwise NOT of a.",opcode:126}]};const H=new Map;for(const i of An.words)H.set(i.opcode,i);function Pn(i){return H.get(i)}const Cn=[BigInt(o.DEF),BigInt(o.KET),BigInt(o.MARK),BigInt(o.BRA)],E=0n,T=1n;class V{constructor(n){this.stack=[],this.queue=[],this.defs=new Map,this.symbols=new Map,this.depth=0,this.nextAnonOp=S+1,this.traceOn=!1,this.traceFormat="human",this.traceVerbose=!1,this.traceQueueMax=8,this.traceStackMax=32,this.base=10,this.statsOn=!1,this.profileOn=!1,this.stats={system_instructions_called:0,user_instructions_called:0,max_stack_depth:0,max_queue_depth:0},this.profile={},this.platform=n,this.setup()}static fromBase64(n){return bn(n).flatMap(e=>{const t=e&1n,s=e>>1n;return[t,s]})}getStack(){return this.stack.slice()}peek(){const n=this.stack.length;if(n>0)return this.stack[n-1];throw new Error("Peek: stack underflow")}pop(){if(this.stack.length>0)return this.stack.pop();throw new Error("Pop: stack underflow")}push(n){this.stack.push(n)}poke(n){const e=this.stack.length;if(e>0){this.stack[e-1]=n;return}throw new Error("Poke: stack underflow")}clear(){this.stack.splice(0,this.stack.length)}queuePush(n,e){this.queue.push(n,e)}queueUnshift(n,e){this.queue.unshift(n,e)}queueShift(){return[this.queue.shift()??0n,this.queue.shift()??0n]}queuePop(){const n=this.queue.pop()??0n;return[this.queue.pop()??0n,n]}defineSystem(n,e){const t=BigInt(e),s=this.getName(t);if(this.defs.has(t))throw new Error(`Define: cannot redefine system word "${s}"`);this.defs.set(t,n)}defineUser(n,e){const t=this.getName(e);if(e>-1&&e<S)throw new Error(`Define: cannot define system op "${t}"`);if(this.defs.has(e))throw e>S?new Error(`Define: cannot redefine anon op "${t}"`):new Error(`Define: cannot redefine user op "${t}"`);this.defs.set(e,n)}callSystem(n){var s;const e=this.defs.get(n);if(typeof e=="function"){if(this.statsOn&&this.stats.system_instructions_called++,this.profileOn){const r=performance.now();e();const a=performance.now(),c=this.getName(n)||Number(n);(s=this.profile)[c]||(s[c]=[0,0]),this.profile[c][0]++,this.profile[c][1]!=0,this.profile[c][1]+=a-r;return}return e()}const t=this.getName(n)||n;throw new Error(`Call: undefined system op "${t}"`)}callUser(n){var s;const e=this.defs.get(n);if(Array.isArray(e)){if(this.statsOn&&this.stats.user_instructions_called++,this.queue.unshift(...e),this.profileOn){const r=this.getName(n,`&${n}`);(s=this.profile)[r]||(s[r]=[0,void 0]),this.profile[r][0]++}return}const t=this.getName(n)||n;throw new Error(`Call: undefined user op "${t}"`)}callOp(n){return n>-1n&&n<S?this.callSystem(n):this.callUser(n)}loadBigIntCode(n){this.queue.push(...n)}loadIR(n){var t,s;let e=0;for(;e<n.length;){const r=n[e++];if(r.op===d.call){if(r.value===0n)continue;(t=r.meta)!=null&&t.name&&!this.symbols.has(r.value)&&this.symbols.set(r.value,(s=r.meta)==null?void 0:s.name),this.queuePush(T,r.value)}else this.queuePush(E,r.value)}return this.stack}runChunk(n,e){const t=this.queue;let s=!1,r=e,a=0;for(;t.length>0&&a<n;){const[c,p]=this.queueShift(),l=c===T,u=this.stack.slice();s=!this.depth||l&&Cn.includes(p),l?s?this.callOp(p):(this.push(c),this.push(p)):(s||this.push(c),this.push(p)),this.statsOn&&(this.stats.max_stack_depth=Math.max(this.stats.max_stack_depth,this.stack.length),this.stats.max_queue_depth=Math.max(this.stats.max_queue_depth,t.length/2));const _=r++;this.traceOn&&this.trace({step:_,immediate:s,tag:c,value:p,stackBefore:u,stackAfter:this.traceVerbose||this.traceFormat==="jsonl"?this.stack.slice():void 0}),a++}return r}run(){return this.runChunk(Number.POSITIVE_INFINITY,0),this.stack}async runAsync(n={}){var l;const e=n.yieldIntervalMs??160,t=n.yieldSliceMax??n.yieldEvery??655360;if(!Number.isFinite(e)||e<0)throw new Error(`runAsync: yieldIntervalMs must be a non-negative finite number (received ${e})`);if(!Number.isFinite(t)||t<1)throw new Error(`runAsync: yieldSliceMax / yieldEvery must be a positive finite number (received ${t})`);const s=n.scheduler??(()=>new Promise(u=>{globalThis.setTimeout(u,0)})),r=typeof globalThis.performance<"u"&&typeof globalThis.performance.now=="function"?()=>globalThis.performance.now():()=>globalThis.Date.now();let a=0,c=0,p=!1;for(;this.queue.length>0&&!p;){const u=r(),_=e>0?u+e:u;for(;this.queue.length>0&&!p&&!(e>0&&r()>=_);){const m=a;if(a=this.runChunk(t,a),c+=a-m,(l=n.onChunk)==null||l.call(n,{vmCyclesExecuted:c}),n.shouldContinue&&!n.shouldContinue()){p=!0;break}if(e===0)break}this.queue.length>0&&!p&&await s()}return{stack:this.stack.slice(),cancelled:p,vmCyclesExecuted:c}}trace({step:n,immediate:e,tag:t,value:s,stackBefore:r,stackAfter:a}){const c=this.createTraceEvent(n,e,t,s,r,a);if(this.traceFormat==="jsonl"){this.writeTraceLine(JSON.stringify(c));return}this.writeTraceLine(this.formatHumanTrace(c))}createTraceEvent(n,e,t,s,r,a){const c=t===T,p=c?this.getName(s,String(s)):String(s),l=this.getQueuePreview();return{step:n,immediate:e,tag:c?"call":"literal",value:String(s),action:p,stack_before:this.limitStack(r).map(String),stack_after:a?this.limitStack(a).map(String):void 0,queue_preview:l,queue_depth:this.queue.length/2}}limitStack(n){return n.length>this.traceStackMax?n.slice(-this.traceStackMax):n}getQueuePreview(){const n=[],e=Math.max(this.traceQueueMax,0);for(let t=0;t<this.queue.length&&n.length<e;t+=2){const s=this.queue[t]??0n,r=this.queue[t+1]??0n,a=s===T;n.push({tag:a?"call":"literal",value:String(r),action:a?this.getName(r,String(r)):String(r)})}return n}formatHumanTrace(n){const e=this.padHumanAction(n.action),t=this.formatHumanStack(n.stack_before),s=this.formatHumanQueue(n.queue_preview,n.queue_depth),r=this.layoutHumanTraceLine(n.step,t,e,s);if(this.traceVerbose){const a=this.formatHumanStack(n.stack_after??[]);return`${r}
${" ".repeat(String(n.step).length+1)}${a} | immediate=${n.immediate} tag=${n.tag} value=${n.value} stack_depth=${this.stack.length} queue_depth=${n.queue_depth}`}return r}padHumanAction(n){return n.length>=7?n:n.padStart(Math.floor((7+n.length)/2)," ").padEnd(7," ")}layoutHumanTraceLine(n,e,t,s){const r=this.getTraceTerminalWidth(),a=`${n} `;if(a.length>=r)return a.slice(0,r);const c=1,p=Math.min(t.length,Math.max(r-a.length-c*2,1)),l=Math.max(a.length+c,Math.floor((r-p)/2)),u=Math.min(l,Math.max(a.length+c,r-p-c)),_=u+p,m=a.length,f=Math.max(m,u-c),g=Math.min(r,_+c),v=r,Z=Math.max(f-m,0),J=Math.max(v-g,0),z=Array.from({length:r},()=>" ");if(this.writeSegment(z,0,a,a.length),this.writeSegment(z,u,t,p),Z>0){const C=this.truncateLeft(e,Z);this.writeSegment(z,f-C.length,C,C.length)}if(J>0){const C=this.truncateRight(s,J);this.writeSegment(z,g,C,C.length)}return z.join("").replace(/\s+$/,"")}formatHumanStack(n){return n.length===0?"[ ]":`[ ${n.join(" ")} ]`}formatHumanQueue(n,e){const t=n.map(r=>r.tag==="call"?`&${r.action}`:r.value),s=Math.max(e-n.length,0);return s>0&&t.push(`…(+${s})`),t.length===0?"[ ]":`[ ${t.join(" ")} ]`}getTraceTerminalWidth(){var a,c,p,l,u,_,m;const e=globalThis.Deno,t=(c=(a=e==null?void 0:e.stderr)==null?void 0:a.isTerminal)!=null&&c.call(a)&&typeof e.stderr.rid=="number"?e.stderr.rid:(l=(p=e==null?void 0:e.stdout)==null?void 0:p.isTerminal)!=null&&l.call(p)&&typeof e.stdout.rid=="number"?e.stdout.rid:void 0;if(typeof t=="number")try{const f=(u=e==null?void 0:e.consoleSize)==null?void 0:u.call(e,t).columns;if(typeof f=="number"&&f>0)return f}catch{}const s=globalThis.process,r=(_=s==null?void 0:s.stderr)!=null&&_.isTTY&&typeof s.stderr.columns=="number"?s.stderr.columns:(m=s==null?void 0:s.stdout)!=null&&m.isTTY&&typeof s.stdout.columns=="number"?s.stdout.columns:void 0;return typeof r=="number"&&r>0?r:120}truncateLeft(n,e){return e<=0?"":n.length<=e?n:e===1?"…":`…${n.slice(-(e-1))}`}truncateRight(n,e){return e<=0?"":n.length<=e?n:e===1?"…":`${n.slice(0,e-1)}…`}writeSegment(n,e,t,s){if(!(s<=0))for(let r=0;r<s&&r<t.length&&e+r<n.length;r++)n[e+r]=t[r]}writeTraceLine(n){const e=new TextEncoder().encode(`${n}
`);if(this.platform.io.writeError){this.platform.io.writeError(e);return}this.platform.io.write(e)}getName(n,e=String(n)){return this.symbols.has(n)?this.symbols.get(n):String(e)}inspectValue(n){const e=this.symbols.get(n),t=n>=0n&&n<=BigInt(S),s=this.defs.get(n),r=s!==void 0;let a;Array.isArray(s)&&(a=this.parseDefinitionTokens(s));let c,p;if(t){const l=Pn(Number(n));l&&(c=l.stackEffect,p=l.description)}return{value:n,name:e,isSystem:t,isDefined:r,definition:a,stackEffect:c,description:p}}parseDefinitionTokens(n){const e=[];for(let t=0;t<n.length;t+=2){const s=n[t]??0n,r=n[t+1]??0n,a=s===T,c=a?this.symbols.get(r):void 0,p=this.defs.has(r);e.push({value:r,tag:s,name:c,isCall:a,isDefined:p})}return e}print(){const n=this.stack.map(e=>e.toString(this.base)).join(" ");this.platform.io.write(new TextEncoder().encode(`[ ${n} ]
`))}loadSourceMap(n){Object.keys(n.symbols).forEach(e=>{this.symbols.set(BigInt(e),n.symbols[e])})}getNextAnonOp(){let n=this.nextAnonOp++;for(;this.defs.has(BigInt(n));)n=this.nextAnonOp++;return BigInt(n)}setup(){const n=new TextEncoder;let e;for(e in k)this.symbols.set(BigInt(k[e]),e);this.defineSystem(()=>{},o.NOP),this.defineSystem(()=>{const t=this.pop();this.callOp(t)},o.CALL),this.defineSystem(()=>{this.depth--;const[,t]=this.queuePop(),s=this.stack.splice(Number(t||0))||[];this.defineUser(s,this.pop())},o.DEF),this.defineSystem(()=>{this.depth--;const[,t]=this.queuePop(),s=this.stack.splice(Number(t||0))||[],r=this.getNextAnonOp();this.defineUser(s,r),this.depth>0&&this.push(0n),this.push(r)},o.KET),this.defineSystem(()=>{this.depth++;const t=this.stack.length;this.queuePush(E,BigInt(t))},o.BRA),this.defineSystem(()=>{this.depth++;const t=this.stack.length;this.queuePush(E,BigInt(t))},o.MARK),this.defineSystem(()=>this.clear(),o.CLR),this.defineSystem(()=>{const t=this.pop();this.platform.exit(Number(t))},o.EXIT),this.defineSystem(()=>{const t=this.pop();this.push(zn(t))},o.RAND),this.defineSystem(()=>{this.print()},o.PRN),this.defineSystem(()=>{this.push(BigInt(this.platform.now()))},o.CLOCK),this.defineSystem(()=>{const t=n.encode(String.fromCharCode(Number(this.pop())));this.platform.io.write(t)},o.PUTC),this.defineSystem(()=>{this.platform.io.setRaw&&this.platform.io.setRaw(!0);const t=this.platform.io.readByte();this.platform.io.setRaw&&this.platform.io.setRaw(!1),this.push(BigInt(t??0))},o.GETC),this.defineSystem(()=>{const t=n.encode(this.pop().toString(this.base));this.platform.io.write(t)},o.PUTN),this.defineSystem(()=>{this.pop()},o.DROP),this.defineSystem(()=>{const t=this.peek(),s=this.stack[this.stack.length-2];this.stack[this.stack.length-2]=t,this.poke(s)},o.SWAP),this.defineSystem(()=>{this.push(this.peek())},o.DUP),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]+=t},o.ADD),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]-=t},o.SUB),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]*=t},o.MUL),this.defineSystem(()=>{const t=this.pop();if(t===0n)throw new Error("DIV: Division by zero");this.stack[this.stack.length-1]/=t},o.DIV),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]%=t},o.MOD),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]<<=t},o.SHIFTL),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]>>=t},o.SHIFTR),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]&=t},o.AND),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]**=t},o.POW),this.defineSystem(()=>{this.push(this.pop()>this.pop()?1n:0n)},o.LT),this.defineSystem(()=>{this.push(this.pop()===this.pop()?1n:0n)},o.EQ),this.defineSystem(()=>{this.push(this.pop()<this.pop()?1n:0n)},o.GT),this.defineSystem(()=>{const t=this.pop();this.pop()!==0n&&this.queueUnshift(T,t)},o.IF),this.defineSystem(()=>{this.queuePush(E,this.pop())},o.PUSHR),this.defineSystem(()=>{const[,t]=this.queuePop();this.push(t)},o.PULLR),this.defineSystem(()=>{this.push(BigInt(this.stack.length))},o.DEPTH),this.defineSystem(()=>{const t=this.stack.length;this.stack.splice(0,t).forEach(r=>this.queuePush(E,r)),this.queuePush(E,BigInt(t))},o.STASH),this.defineSystem(()=>{const[,t]=this.queuePop(),s=Number(t),r=[];for(let a=0;a<s;a++){const[,c]=this.queuePop();r.unshift(c)}this.stack.unshift(...r)},o.FETCH),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]|=t},o.OR),this.defineSystem(()=>{const t=this.pop();this.push(~t)},o.NOT),this.defineSystem(()=>{const t=this.pop(),r=[0n,this.pop(),1n,t],a=this.getNextAnonOp();this.defineUser(r,a),this.depth>0&&this.push(0n),this.push(a)},o.CONS)}printProfile(){console.log(),console.log("Profile:");const n=Object.keys(this.profile).map(s=>{const r=this.profile[s][0],a=this.profile[s][1];return{name:s,calls:r,time:a,system:typeof a<"u","ops/ms":a?Math.round(r/a):""}}).sort((s,r)=>r.calls-s.calls),e=n.filter(s=>s.system),t=n.filter(s=>!s.system);console.table(e,["name","calls","ops/ms"]),console.table(t,["name","calls"]),console.log()}printStats(){console.log(),console.log("Interpreter stats:"),console.log(this.stats),console.log()}}function zn(i){const n=i,e=n.toString().length;let t="";for(;t.length<e;)t+=Math.random().toString().split(".")[1];t=t.slice(0,e);const s="1"+"0".repeat(e);return n*BigInt(t)/BigInt(s)}const I=BigInt(o.DEF),K=BigInt(o.KET),B=BigInt(o.MARK),Q=BigInt(o.BRA),h=i=>(i=BigInt(i),n=>n.op===d.call&&n.value===i),A=i=>(i=BigInt(i),n=>n.op===d.push&&n.value===i),b=i=>i.op===d.push,G=i=>i.op===d.push&&i.value!==0n,In=[{name:"No operation",pattern:[h(o.NOP)],replacement:()=>[]},{name:"Null Sequence - SWAP SWAP",pattern:[h(o.SWAP),h(o.SWAP)],replacement:()=>[]},{name:"Null Sequence - DUP DROP",pattern:[h(o.DUP),h(o.DROP)],replacement:()=>[]},{name:"Null Sequence - PUSHR PULLR",pattern:[h(o.PUSHR),h(o.PULLR)],replacement:()=>[]},{name:"Null Sequence - CLOCK DROP",pattern:[h(o.CLOCK),h(o.DROP)],replacement:()=>[]},{name:"Null Sequence - RAND DROP",pattern:[h(o.RAND),h(o.DROP)],replacement:()=>[]},{name:"Null Sequence - DEPTH DROP",pattern:[h(o.DEPTH),h(o.DROP)],replacement:()=>[]},{name:"Null Sequence - NOT NOT",pattern:[h(o.NOT),h(o.NOT)],replacement:()=>[]},{name:"Indirect calls - n EVAL",pattern:[b,h(o.CALL)],replacement:i=>{var n,e;return[{op:d.call,value:i.value,meta:{name:(e=(n=i.meta)==null?void 0:n.name)==null?void 0:e.replace(/^&/,"")}}]}},{name:"Null Sequence - n DROP",pattern:[b,h(o.DROP)],replacement:()=>[]},{name:"Constant Folding - a b ADD",pattern:[b,b,h(o.ADD)],replacement:(i,n)=>[{op:d.push,value:i.value+n.value}]},{name:"Algebraic Simplification - 0 ADD",pattern:[A(0),h(o.ADD)],replacement:()=>[]},{name:"Algebraic Simplification - swap ADD",pattern:[h(o.SWAP),h(o.ADD)],replacement:(i,n)=>[n]},{name:"Constant Folding - a b SUB",pattern:[b,b,h(o.SUB)],replacement:(i,n)=>[{op:d.push,value:i.value-n.value}]},{name:"Algebraic Simplification - 0 SUB",pattern:[A(0),h(o.SUB)],replacement:()=>[]},{name:"Constant Folding - a b MUL",pattern:[b,b,h(o.MUL)],replacement:(i,n)=>[{op:d.push,value:i.value*n.value}]},{name:"Algebraic Simplification - 1 MUL",pattern:[A(1),h(o.MUL)],replacement:()=>[]},{name:"Algebraic Simplification - swap MUL",pattern:[h(o.SWAP),h(o.MUL)],replacement:(i,n)=>[n]},{name:"Constant Folding - a b DIV",pattern:[b,G,h(o.DIV)],replacement:(i,n)=>[{op:d.push,value:i.value/n.value}]},{name:"Algebraic Simplification - 1 DIV",pattern:[A(1),h(o.DIV)],replacement:()=>[]},{name:"Constant propagation - a DUP",pattern:[b,h(o.DUP)],replacement:i=>[i,i]},{name:"Unreachable Code - 0 &b IF",pattern:[A(0),b,h(o.IF)],replacement:()=>[]},{name:"Flows-Of-Control Optimizations - !0 &b IF",pattern:[G,b,h(o.IF)],replacement:(i,n,e)=>{var t,s;return[{op:d.call,value:n.value,meta:{name:(s=(t=n.meta)==null?void 0:t.name)==null?void 0:s.replace(/^&/,"")}}]}},{name:"Null Sequence - 0 eval",pattern:[A(0),h(o.CALL)],replacement:()=>[]},{name:"Empty List - [ ]",pattern:[h(o.BRA),h(o.KET)],replacement:()=>[{op:d.push,value:0n,meta:{pointer:!0,name:"0"}}]},{name:"a q< b a> - b a",pattern:[b,h(o.PUSHR),b,h(o.PULLR)],replacement:(i,n,e)=>[e,i]}];class Bn{constructor(){this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0},this.minOptPasses=2,this.maxOptPasses=20,this.defs=new Map,this.calledWords=new Set,this.optimized=[],this.nextAnonOp=S+1}optimize(n){this.reset(),this.stats.pre_optimization_ir_size=n.length,this.optimized=n;let e;do e=this.optimized.length,this.optLoop();while((this.optimized.length<e||this.stats.optimization_passes<this.minOptPasses)&&this.stats.optimization_passes<this.maxOptPasses);return this.optimized=this.pullDefs(this.optimized),this.optimized=this.addReferencedWords(this.optimized),this.stats.post_optimization_ir_size=this.optimized.length,this.optimized}optLoop(){this.optimized=this.peepholeOptimization(this.optimized),this.optimized=this.getDefs(this.optimized),this.optimized=this.inlineWords(this.optimized,4),this.stats.optimization_passes++}reset(){this.optimized=[],this.defs=new Map,this.calledWords=new Set,this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0}}getDefs(n){var t;let e=0;for(;e<n.length;){const s=n[e];if(s.op===d.call){if(s.value===K){this.stats.optimization_passes===0&&this.stats.user_defined_anon_defs++,s.meta??(s.meta={}),(t=s.meta).uid??(t.uid=this.nextAnonOp++);let r=e;for(;r-- >0;){const l=n[r];if(l.op===d.call&&l.value===Q)break}const a=BigInt(s.meta.uid),c={op:d.push,value:a,meta:{pointer:!0}},p=n.slice(r,e+1);p.unshift(c),p[1]={...p[1],value:B,meta:{...p[1].meta,name:":"}},p[p.length-1]={...p[p.length-1],value:I,meta:{...p[p.length-1].meta,name:";"}},this.defs.set(a,p)}else if(s.value===I){this.stats.optimization_passes===0&&this.stats.user_defined_named_defs++;let r=e;for(;r-- >0;){const p=n[r];if(p.op===d.call&&p.value===B)break}const a=n[r-1];a.meta||(a.meta={}),a.meta.pointer=!0;const c=n.slice(r-1,e+1);this.defs.set(a.value,c)}}e++}return n}pullDefs(n,e=!1){var r;const t=n.slice();let s=0;for(;s<t.length;){const a=t[s];if(a.op===d.call){if(a.value===K){a.meta??(a.meta={}),(r=a.meta).uid??(r.uid=this.nextAnonOp++);const c=s;for(;s-- >0;){const _=t[s];if(_.op===d.call&&_.value===Q)break}const p=BigInt(a.meta.uid),l={op:d.push,value:p,meta:{pointer:!0}},u=t.splice(s,c-s+1,l);u.unshift(l),u[1]={...u[1],value:B,meta:{...u[1].meta,name:":"}},u[u.length-1]={...u[u.length-1],value:I,meta:{...u[u.length-1].meta,name:";"}},this.defs.set(p,u)}else if(a.value===I&&!e){const c=s;for(;s-- >0;){const u=t[s];if(u.op===d.call&&u.value===B)break}const p=t[s-1];p.meta||(p.meta={}),p.meta.pointer=!0;const l=t.splice(s-1,c-s+2);s=s-2,this.defs.set(l[0].value,l)}}s++}return t}peepholeOptimization(n){const e=n.slice();for(;;){const t=this.stats.peephole_optimizations;let s=0;for(;s<e.length;){for(const r of In){const{pattern:a,replacement:c}=r;if(s+a.length>e.length)continue;if(a.every((l,u)=>l(e[s+u]))){this.stats.peephole_optimizations++;const l=e.slice(s,s+a.length);e.splice(s,a.length,...c(...l)),s=Math.max(0,s-a.length-1);break}}s++}if(this.stats.peephole_optimizations===t)break}return e}inlineWords(n,e=1,t=[]){return n.flatMap(s=>{var r,a,c,p;if((r=s.meta)!=null&&r.unsafe)return s;if(s.op===d.call&&this.defs.has(s.value)){if(t.includes(s.value))return s;const l=this.defs.get(s.value);if(!l)return s;const u=l[l.length-1];if((a=u.meta)!=null&&a.unsafe)return s;if((c=u.meta)!=null&&c.inline||(p=s.meta)!=null&&p.inline)return this.stats.inlined_calls++,this.inlineWords(l.slice(2,-1),1/0,t.concat(s.value));if(l.length<=e+3)return this.stats.inlined_calls++,this.inlineWords(l.slice(2,-1),e,t.concat(s.value))}return s})}addReferencedWords(n){return n.slice().forEach(e=>{var t;e.op===d.push&&((t=e.meta)!=null&&t.pointer)?this.addDef(e.value):e.op===d.call&&this.addDef(e.value)}),n}addDef(n){if(!this.calledWords.has(n)){const e=this.defs.get(n);if(e)return this.stats.post_optimization_user_defs++,this.calledWords.add(n),this.optimized.unshift(...e),this.addReferencedWords(e)}}}class q{constructor(n,e,t){this.imported=new Set,this.importPrefixes=new Map,this.macroPreludeReady=!1,this.rootFilename=null,this.host=n,this.engine=e.engine,this.compiler=e.compiler||new w,t!=null&&t.macroEngineBootstrapFile&&this.bootstrapMacroEngine(t.macroEngineBootstrapFile)}static tokenize(n){return n.split(/[\r\n]+/)}preprocess(n,e="-"){const t=this.rootFilename===null;t&&e!=="-"&&(this.rootFilename=e);try{return this.preprocessLines(n,e)}finally{t&&(this.rootFilename=null)}}preprocessLines(n,e,t){return n.map(s=>{if(s.length>1&&s[0]==="."){const[r,...a]=s.split(" ");if(r[0]==="."&&r.length>1){switch(r){case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Preprocessor: .exit requires a host exit handler");case".load":{const c=this.findFile(a.join(" "),e),p=this.host.readTextFile(c);return this.preprocessLines(q.tokenize(p),c)}case".import":{const c=this.findFile(a.join(" "),e);if(!this.imported.has(c)){this.imported.add(c);const p=this.host.readTextFile(c);return this.preprocessLines(q.tokenize(p),c,c)}return""}case".m":return this.runMacro(a.join(" "),s);case".ff":return this.runMacro(a.join(" "),s);case".ffp":{if(!this.macroPreludeReady)throw new Error("Preprocessor: .ffp requires prelude-enabled macro context");return this.runMacro(a.join(" "),s)}}return""}}return t?this.mangleImportedLine(s,t):s}).join(`
`)}findFile(n,e="-"){if(e&&e!=="-"&&!this.host.path.isAbsolute(n)){const t=this.host.path.dirname(e),s=this.host.path.resolve(t,n);if(this.host.fileExists(s))return s}if(this.host.fileExists(n))return n;throw'File not found: "'+n+'"'}bootstrapMacroEngine(n){const e=this.findFile(n),t=this.host.readTextFile(e),r=new q(this.host,{engine:this.engine,compiler:this.compiler}).preprocess(q.tokenize(t),e),a=this.compiler.compileToIR(w.tokenize(r),e);this.engine.loadIR(a),this.engine.run(),this.engine.clear(),this.macroPreludeReady=!0}runMacro(n,e){const t=this.compiler.compileToIR(w.tokenize(n));this.engine.loadIR(t),this.engine.run();const s=this.engine.getStack();return this.engine.clear(),s.map(String).join(" ")+` /* ${e} */`}mangleImportedLine(n,e){const t=this.getImportPrefix(e);return n.split(/(\s+)/).map(s=>!s||/\s+/.test(s)?s:this.mangleImportedToken(s,t)).join("")}mangleImportedToken(n,e){return n.startsWith("[__")?`[${e}${n.slice(3)}`:n.startsWith("__")?`${e}${n.slice(2)}`:n}getImportPrefix(n){const e=this.importPrefixes.get(n);if(e)return e;const s=this.getNormalizedImportPath(n).replace(/[^A-Za-z0-9]+/g,"_").replace(/^_+|_+$/g,"").replace(/_+/g,"_")||"module",r=this.hashPath(n),a=`__${s}_${r}__`;return this.importPrefixes.set(n,a),a}getNormalizedImportPath(n){if(this.rootFilename&&this.rootFilename!=="-"){const e=this.host.path.dirname(this.rootFilename),t=this.host.path.relative(e,n);if(t)return t.replace(/\\/g,"/")}return n.replace(/\\/g,"/")}hashPath(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619)>>>0;return e.toString(36)}}var Rn=`.import ../lib/prelude.ffp

/* 99 Bottles of Beer lyrics printer. */
/* [99 Bottles of Beer](https://code.golf/99-bottles-of-beer) */

_bottles: 'bottle' ;
_ofBeer: 'of\\sbeer' ;
_onTheWall: 'on\\sthe\\swall' ;

comma: '\\0,\\s' prints ;
period: '\\0.\\n' prints ;

counter:  dup zero? [ '\\0no\\smore' prints ] [ dup putn ] branch ;
bottles: 0 _bottles prints dup 1 > [ 's' putc ] ? ;

bottlesOfBeer: counter sp bottles '\\0\\s' _ofBeer prints ;
onTheWall: 0 _onTheWall prints ;
takeOneDown: -- '\\0Take\\sone\\sdown\\sand\\spass\\sit\\saround,\\s' prints ;

verse: 
bottlesOfBeer onTheWall comma bottlesOfBeer period
takeOneDown bottlesOfBeer onTheWall period
cr ;

verses: verse dup [ verses ] ? ;

99 verses

'\\0No\\smore\\s' _bottles 's\\s' _ofBeer _onTheWall prints comma bottlesOfBeer period
'\\0Go\\sto\\sthe\\sstore\\sand\\sbuy\\ssome\\smore,\\s' prints
99 bottlesOfBeer onTheWall '.' putc`,On=`.import ../lib/prelude.ffp
.import ../lib/math/prn.ffp

/* [𝑒](https://code.golf/%f0%9d%91%92): first 1,000 decimals after the point. */

N: 1000 ;
E: N 1 nexp ;
E N nputn
cr
`,Dn=`.import ../lib/prelude.ffp

/* Fibonacci number: n fib -> F_n */
/* [Fibonacci](https://code.golf/fibonacci) */

fib:
  dup 0 = not
  [ dup 1 = not
    [ -- dup fib swap -- fib + ] ?
  ] ? ;

31 fib putn
`,Nn=`.import ../lib/prelude.ffp

/* FizzBuzz */
/* source https://rosettacode.org/wiki/FizzBuzz#the_unrolled_approach */
/* [FizzBuzz](https://code.golf/fizz-buzz) */

n: dup putn cr ++ ;
f: 0 'Fizz' println ++ ;
b: 0 'Buzz' println ++ ;
fb: 0 'FizzBuzz' println ++ ;
fb10: n n f n b f n n f b ;
fb15: fb10 n f n n fb ;
fb100: fb15 fb15 fb15 fb15 fb15 fb15 fb10 ;

1 fb100 drop`,Mn=`.import ../lib/prelude.ffp

/* [π](https://code.golf/%cf%80): first 1,000 decimals after the point (total 1,002 chars with "3."). */

N: 1000 ;
P: N npi ;
P N nputn
cr
`,Ln=`[ 0 120 32 46 32 108 97 118 101 10 59 32 63 32 93 120 91 32 112 117 100 32 99 116 117 112 32 58 120 ]
x: putc dup [x] ? ;
eval . x`,Fn=`.import ../lib/prelude.ffp

/* [tutorial](https://code.golf/tutorial) */

'\\0Hello,\\sWorld!\\n' prints

0 [ dup putn cr ++ ] 10 times`,Un=`/* constants 1 2 3 */
true: 1 ; /* true == 1 */
false: 0 ; /* false == 0 */

/* incrementors */

--: 1 - ; /* n -- == n-1 */
++: 1 + ; /* n ++ == n+1 */
pred: dup -- ; /* n pred == n n-1 */
succ: dup ++ ; /* n succ == n n+1 */

/* DIP words */
/* Semantic anchors: slip/swap/dupd are foundational contracts.
 * Routine ERS cleanup should not rewrite these definitions unless explicitly requested.
 * Wrapper definitions like \`x: q< Y q> ;\` are irreducible as definitions.
 * Outside defining wrappers, ERS may replace \`q< Y q>\` with the named word when available. */

slip: q< eval q> ; /* [A] b slip == a* b */
swapd: q< swap q> ; /* a b c swapd == b a c */
dupd: q< dup q> ; /* a b dupd == a a b */

/* shuffle words */

drop2: drop drop ; /* a b drop2 == */
dip: swap slip ; .inline /* a [B] dip == b* a */
dipd: swap [dip] dip ; .inline /* stash top two; run [Q] on third; unstash (queue) */
dig: swapd swap ; .inline /* a b c dig == b c a */
bury: swap swapd ; .inline /* a b c bury == c a b */
rot: bury swap ; .inline /* a b c rot == c b a */
over: dupd swap ; .inline /* a b over == a b a */
dup2: over over ; .inline /* a b dup2 == a b a b */
run: dup slip ; .inline /* [A] run == a* [A] */
nip: swap drop ; .inline /* a b nip == b */
tuck: swap over ; .inline /* a b tuck == b a b */
sip: over slip ; .inline /* a [B] sip == a b* a */
sipd: [sip] dip ; .inline /* a [B] c sipd == a b* a c */
bi: sipd dig slip swap ; .inline /* a [B] [C] bi == b c */
bi2: [ [dup2] dip eval bury ] dip eval ; .inline /* a b [C] [D] bi2 == c d */

/* inquisitive */

zero?: 0 = ; /* n zero? == flag */
not: zero? ; .inline /* flag not == flag' */
nz?: zero? not ; .inline /* n nz? == flag */
truthy?: nz? ; .inline /* n truthy? == flag */
falsey?: zero? ; .inline /* n falsey? == flag */
!=: = not ; .inline /* a b != == flag */

/* comparison */
<=: > not ; .inline /* a b <= == flag */
>=: < not ; .inline /* a b >= == flag */

sort2: dup2 > [swap] ? ; .inline /* a b sort2 == min max */
between?: [sort2] dip swap dupd < bury < and ; .inline /* lo hi n between? == flag */

/* binary operators */

bxor: dup2 ~ & rot ~ & | ; /* a b bxor == n */

/* logical */

and: * truthy? ; /* a b and == flag */
or: + truthy? ; /* a b or == flag */
nand: * zero? ; /* a b nand == flag */
nor: + zero? ; /* a b nor == flag */

/* short circuit */

or_else: [ sip swap ] dip swap [ drop2 true ] [eval] branch ; .inline /* a [B] [C] or_else == flag */
and_also: [ sip swap ] dip swap [eval] [ drop2 false ] branch ; .inline /* a [B] [C] and_also == flag */

/* branching */

choose: rot [swap] ? drop ; /* a b flag choose == a or b */
branch: choose eval ; /* a flag [B] [C] branch == b* or c* */

/* stack */

empty?: depth zero? ; /* .. empty? == .. flag */
pushtop: depth 1 > [ swap [pushtop] dip ] ? ; /* .. a pushtop == a .. */

/* counters */

_loop: dup [ -- [ dup slip ] dip _loop ] ? ; /* a [B] n _loop == a b* n */
loop: _loop drop ; /* a [B] n loop == a b* [B] */

times: loop drop ; /* a [B] n times == a b* */
seq: swap times ; /* a n [B] seq == a b* */

range: over - [succ] seq ; /* a b range == a..b */
count: 0 swap ++ [succ] seq drop ; /* n count == 1..n */
`,$n=`.import ./num.ffp

/* Buck's F0–F5: n __F_M -- F(M,n) */
__F_0: 1 + ;
__F_1: 2 + ;
__F_2: 2 * ;
__F_3: 2 swap ^ ;
__F_4: 2 swap ^^ ;
__F_5: 2 swap ^^^ ;

/* m n -- F(m,n) */
__F:
  over 3 <
  [ over zero? [ nip __F_0 ] [ swap 1 = [ __F_1 ] [ __F_2 ] branch ] branch ]
  [ over 4 < [ nip __F_3 ] [ swap 4 = [ __F_4 ] [ __F_5 ] branch ] branch ]
  branch
;

/* Recursive function for m > 5 */
__ackn: over [ dup
  [ [ pred swap ] dip -- ack ack ]
  [ drop -- 1 ack ] branch ] [ nip ++ ] branch ;

/* Ackermann function */
ack: over 6 < [ 3 + __F 3 - ] [ __ackn ] branch ;
`,Wn=`.import ./pred.ffp

/* Unary operations */

sgn: dup positive? swap negitive? - ; .inline /* n sgn == -1 or 0 or 1 */
abs: dup negitive? [ -1 * ] ? ; .inline /* n abs == |n| */
sqr: dup * ; /* n sqr == n² */

/* Ordering utilities */

min: sort2 drop ; .inline /* a b min == min */
max: sort2 nip ; .inline /* a b max == max */
clamp: dig max min ; .inline /* lo hi n clamp == n' */

/* Division utilities */

divrem: [ / ] [ % ] bi2 ; /* a b divrem == q r */
`,jn=`.import ./arith.ffp
.import ./precision.ffp

/*
 * Shared arctan Taylor core without pi-dependent range reduction.
 * This module exists so pi can depend on atan series terms without
 * introducing a circular import back through atan.ffp.
 */

__over3: [ [ over ] dip ] dip dig ; /* x a b c __over3 == x a b c x */

__odd_prev: 2 * 1 - ; .inline /* n __odd_prev == 2n-1 */
__odd_next: 2 * 1 + ; .inline /* n __odd_next == 2n+1 */
__sqr_keep2: over sqr over sqr ; /* a b __sqr_keep2 == a b a² b² */

__u2_newp: /* u² p q odd v² */
  [ __over3 ] dip /* u² p q odd u² v² */
  dup
  [ [ dig [ * * ] dip ] dip * swap - ] dip /* u² q*v²-p*odd*u² v² */
; /* u² p q odd v² __u2_newp == u² p' v² */

__newq_stack: /* p q odd v² */
  dup [ [ dup2 ] dip * * ] dip /* p q odd q*odd*v² v² */
; /* p q odd v² __newq_stack == p q odd q' v² */

__tail_loop:
  over positive?
  [
    over
    2 -
    [__newq_stack] dip
    swapd
    [__u2_newp] dipd
    dig
    __tail_loop
  ]
  [
    drop2
    [nip] dip
  ]
  branch
; /* u v u2 p q odd v2 __tail_loop == u v p q */

__odd_from_precision:
  rot
  n->K
  swapd
; .inline /* n u v __odd_from_precision == u v odd */

__seed_taylor_state: /* u v odd */
  dup                                  /* u v odd odd */
  __odd_next                           /* u v odd (2*odd+1) */
  [ __odd_prev [ __sqr_keep2 ] dip ] dip /* u v u² v² (2*odd-1) (2*odd+1) */
  rot                                  /* u v u² (2*odd+1) (2*odd-1) v² */
  1                                    /* u v u² (2*odd+1) (2*odd-1) v² 1 */
  bury                                 /* u v u² (2*odd+1) 1 (2*odd-1) v² */
  [ swapd ] dip                        /* u v u² 1 (2*odd+1) (2*odd-1) v² */
; /* u v odd __seed_taylor_state == u v u2 p q odd v2 */

__mul2_pairs: * [ * ] dip ; .inline /* a b c d __mul2_pairs == a*b c*d */

__scale_tail_result:
  swapd
  __mul2_pairs
; .inline /* u v p q __scale_tail_result == p q */

__parts:
  __odd_from_precision
  __seed_taylor_state
  __tail_loop
  __scale_tail_result
; /* n u v __parts == p q */

_atan__core_scaled:
  rot
  dup
  [ rot __parts ] dip
  p/q*S
; /* n u v _atan__core_scaled == floor(10^n*atan(u/v)) for reduced positive ratios */

_atan__needs_pi4:
  [ + sqr ] [ nip sqr 2 * ] bi2
  >
; /* u v _atan__needs_pi4 == u/v > tan(pi/8) for positive u <= v */
`,Hn=`.import ./arith.ffp
.import ./precision.ffp
.import ./atan-core.ffp
.import ./pi.ffp

/*
 * Arctan utilities using precision helpers and rational Taylor parts.
 *
 * Words:
 *   iatan    ( x -- y )
 *   natan    ( n x -- y )
 *   qatan    ( u v -- y )
 *   atan-inv ( n x -- y )
 */

__num_zero:
  drop2 drop 0
; /* n u v (u == 0) __num_zero == 0 */

__den_zero:            /* n u v */
  drop                 /* n u */
  sgn                  /* n sgn(u) */
  [ npi 2 / ] dip      /* floor(π/2*10ⁿ) sgn(u) */
*                      /* floor(π/2*10ⁿ)*sgn(u) */
; /* n u v (v == 0) __den_zero == sign(u)*floor(π/2*10ⁿ) */

__quarter_pi: half_pi 2 / ; /* n __quarter_pi == floor(10ⁿ*π/4) */
__diff_sum: [ - ] [ + ] bi2 ; /* u v __diff_sum == u-v u+v */
__abs_pair: abs swap abs swap ; .inline /* u v __abs_pair == |u| |v| */
__sign_pair_product: dup2 * sgn ; /* u v __sign_pair_product == u v sgn(u*v) */

__atan_pos_scaled:
  dup2 >
  [                                /* n u v */
    [ dup half_pi swap ] dipd    /* floor(10ⁿ*π/2) n u v */
    swap                           /* floor(10ⁿ*π/2) n v u */
    _atan__scaled                  /* floor(10ⁿ*π/2) floor(10ⁿ*atan(v/u)) */
    -                              /* floor(10ⁿ*π/2)-floor(10ⁿ*atan(v/u)) */
  ]
  [
    dup2 _atan__needs_pi4
    [                                  /* n u v */
      swap                             /* n v u */
      __diff_sum                       /* n (v-u) (v+u) */
      [ dup __quarter_pi swap ] dipd   /* floor(10ⁿ*π/4) n (v-u) (v+u) */
      _atan__scaled                    /* floor(10ⁿ*π/4) floor(10ⁿ*atan((v-u)/(v+u))) */
      -                                /* floor(10ⁿ*π/4)-floor(10ⁿ*atan((v-u)/(v+u))) */
    ]
    [_atan__core_scaled]
    branch
  ]
  branch
; /* n u v (u,v > 0) __atan_pos_scaled == floor(10ⁿ*atan(u/v)) */

__finite:
  __sign_pair_product
  [ __abs_pair __atan_pos_scaled ] dip
  *
; /* n u v (u,v != 0) __finite == signed scaled atan(u/v) */

_atan__scaled:
  over zero?
  [ __num_zero ]
  [
    dup zero?
    [ __den_zero ]
    [ __finite ]
    branch
  ]
  branch
; /* n u v _atan__scaled == floor(10ⁿ*atan(u/v)) */

iatan: 0 swap 1 _atan__scaled ; /* x iatan == floor(atan(x)) */
natan: 1 _atan__scaled ; /* n x natan == floor(10ⁿ*atan(x)) */
qatan: 0 bury _atan__scaled ; /* u v qatan == floor(atan(u/v)) */
atan-inv: 1 swap _atan__scaled ; /* n x atan-inv == floor(10ⁿ*atan(1/x)) */
`,Vn=`.import ./arith.ffp

/*
 * Naming note: the \`i\` prefix means integer.
 * \`icbrt\` returns the integer cube root (truncated toward zero).
 */

__closer: dup2 2 ^ / over 2 * + 3 / ;
__loop: __closer dup2 > [ nip __loop ] ? ;
__cbrtn: dup 3 / __loop drop nip ;

icbrt: dup sgn swap over * dup 1 > [ __cbrtn ] ? * ;
`,Kn=`
.import ../core/core.ff
.import ./gcd.ffp
.import ./precision.ffp
.import ./arith.ffp

__n: 150 ; /* fixed digits used by the fast iexp special case */
__e: 2718281828459045235360287471352662497757247093699959574966967627724076630353547594571382178525166427427466391932003059921817413596629043572900334295260 ; /* floor(e*10^__n) */
__terms: 20 + n->K ; /* n __terms == ceil(6*(n+20)/5)+10 */

/*
 * This helper assumes primitive integer division truncates toward zero.
 * Negative odd values need one extra decrement to behave like floor(x/2).
 */
__floor_half:
  dup 0 < [
  dup 2 / [
    2 %
    nz?
  ] dip ] dip
  dig
  and
  [--] ?
; /* x __floor_half == floor(x/2) */

/*
 * Repeatedly halve u/v until |u| <= v, returning the halving count m.
 * This keeps the exponential series in the stable |x| <= 1 regime.
 */
__reduce:
  q<
  over abs over >
  [ dup 2 * nip q> ++ __reduce ]
  [ q> ]
  branch
; .unsafe /* u v m __reduce == u' v' m' */

/* Reduce p/q by gcd so repeated squaring stays manageable. */
__frac_reduce:
  dup2 gcd
  dup q<
  dupd / nip
  q> swapd /
  swap
; /* p q __frac_reduce == p' q' */

__square_step:
  dup * q<
  dup * q>
  __frac_reduce
; /* p q __square_step == p' q' */

__square_loop:
  dup
  [ -- bury __square_step dig __square_loop ]
  [ drop ]
  branch
; /* p q m __square_loop == p' q' */

/*
 * Queue layout during the series loop is rem? u v, with v at the top.
 * The step itself only mutates p q t k on the data stack.
 */
__series_step:
  dup
  q> dup [ *
  swap [
  swap dup [
  swap dup [
  dig [
  dig * +
  ] dip ] dip *
  ] dip ] dip ] dip q> dup q< swap q< swap [*]
  dip ++
; .unsafe /* p q t k __series_step == p' q' t' k' */

__series_loop:
  dup
  [
    --
    q> q> dig [
    [__series_step] dipd
    ] dip bury q< q<
    __series_loop
  ]
  [drop]
  branch
; .unsafe /* p q t k rem __series_loop == p q t k */

__series:
  rot
  dup [ swap [
  swap [ 1 1 rot 1 ] dip
  __series_loop
  drop2
  ] dip ] dip drop2
; /* u v K __series == p q */

__parts:
  [ __terms ] dipd
  rot [ swap
  0 __reduce
  ] dip
  swap [
  __series
  ] dip
  __square_loop
; /* n u v __parts == p q */

/*
 * fixed-precision fast path for floored exponentials
 */
iexp:
  dup __e swap ^
  swap __n *
  n->S /
; /* x iexp == floor(e^x) */

nexp:
  swap dup q< swap
  1 __parts
  q> p/q*S
; /* n x nexp == floor(10^n*e^x) */

ncosh:
  [ nexp ] [ -1 * nexp ] bi2
  +
  2 /
; /* n x ncosh == floor((nexp(n,x)+nexp(n,-x))/2) */

nsinh:
  [ nexp ] [ -1 * nexp ] bi2
  -
  __floor_half
; /* n x nsinh == floor((nexp(n,x)-nexp(n,-x))/2) */

icosh: 0 swap ncosh ; /* x icosh == floor(cosh(x)) via first-pass nexp wrapper */
isinh: 0 swap nsinh ; /* x isinh == floor(sinh(x)) via first-pass nexp wrapper */
`,Qn=`.import ../core/core.ff

__t: tuck % dup [ __t ] ? ;

gcd: dup [ __t ] ? drop ;
lcm: dup2 gcd / * ;
`,Gn=`.import ../core/core.ff

__n: 20 ; /* number of digits to use for fixed-point calculations */
__s: 100000000000000000000 ; /* 10^n */
__ln2: 69314718055994530941 ; /* floor(ln(2)*10^n) */

ilb: dup 1 > [ 1 >> ilb ++ ] [ drop 0 ] branch ; /* n ilb == floor(log2(n)) */
ilog: dup 10 >= [ 10 / ilog ++ ] [ drop 0 ] branch ; /* n ilog == floor(log10(n)) */
iln: ilb __ln2 * __s / ; /* n iln == floor(ln(n)) */`,Xn=`.import ./pred.ffp
.import ./arith.ffp
.import ./num.ffp
.import ./atan.ffp
.import ./sqrt.ffp
.import ./cbrt.ffp
.import ./gcd.ffp
.import ./ack.ffp
.import ./primes.ffp
.import ./log.ffp
.import ./exp.ffp
.import ./pi.ffp
.import ./trig.ffp
.import ./prn.ffp
`,Yn=`.import ../core/core.ff

/* Logarithm and combinatorics */

!: dup [ dup -- ! * ] [ drop 1 ] branch ; /* n ! == n! */
nck: dup2 - ! swap ! * [ ! ] dip / ; /* n k nck == C(n,k) */

/* Knuth operators */

^^: -- dup [ [ dup ] swap times [ ^ ] ] dip times ;
^^^: -- dup [ [ dup ] swap times [ ^^ ] ] dip times ;
`,Zn=`.import ./atan-core.ffp

__guard_digits: 20 ;


/* n -> floor(π*10ⁿ) */
npi:
  __guard_digits +
  dup 1 5 _atan__core_scaled
  swap 1 239 _atan__core_scaled
  swap 4 * swap -
  4 *
  __guard_digits n->S /
; /* n _npi__ == floor(10ⁿ*π) */

tau:
  1 + npi 5 /
; /* n tau == floor(10ⁿ*2*π) */

half_pi:
  npi 1 >>
; /* n half_pi == floor(10ⁿ*π/2) */`,Jn=`.import ../core/core.ff
.import ./arith.ffp

/* Internal precision helpers shared by variable-precision math words. */
n->S: 10 swap ^ ; /* n n->S == 10^n */
n->S2: 2 * n->S ; /* n n->S2 == 10^(2n) */
n->K: 6 * 4 + 5 / 10 + ; /* n n->K == ceil(6*n/5)+10 */
p/q*S: n->S swap rot * swap / ; /* p q n p/q*S == floor(p*10^n/q) */

ntrunc: n->S / ; /* x n ntrunc == floor(x/10^n) */
nfrac: [ abs ] dip n->S % ; /* x n nfrac == (x - floor(x/10^n))*10^n */`,ne=`.import ../core/core.ff

/* Predicates */

negitive?: 0 < ; /* n negitive? == flag */
positive?: 0 > ; /* n positive? == flag */
divisor?: % zero? ; .inline /* n d divisor? == flag */
even?: 2 divisor? ; .inline /* n even? == flag */
odd?: even? not ; .inline /* n odd? == flag */
`,ee=`.import ./pred.ffp

/* Test if value is a factor of 2 or 3 */
__simple-composite?: [ 2 divisor? ] [ 3 divisor? ] or_else ;

/*
 * Miller-Rabin helpers copied from the experimental primality test.
 * \`maybe_prime?\` is public and probabilistic; \`prime?\` stays exact by
 * confirming probable primes with the existing trial-division path.
 */
__(factor_by_2):
  over 1 & zero?
  [ [ 1 >> ] dip ++ __(factor_by_2) ]
  ? ;
__factor_by_2: 0 __(factor_by_2) ; /* n -> d s */

__nrand: over - rand + ;

__(powmod_loop): /* acc a d -> acc, with n on queue */
  dup zero?
  [drop2]
  [
    dup 1 & nz? [ rot over * q> dup q< % rot ] ?
    swap dup *  q> dup q< % swap 1 >>
    __(powmod_loop)
  ]
  branch ; .unsafe

__powmod:
  rot [ swap 1 rot __(powmod_loop) ] dip swap
;  /* n d a -> n a^d%n */

__(inner_witness_loop): /* s n x -> */
  dup2 swap %  /* s n x x%n */
  [over] dip swap /* s n x x%n n */
  -- = /* s n x x%n=n-1 */
  [false]
  [
    dup * /* s n x^2 */
    __inner_witness
  ]
  branch ;

__inner_witness: /* s n x -> */
  rot -- dup
  zero?
  [true]
  [ rot __(inner_witness_loop) ]
  branch
;

/* returns true if composite, false if maybe prime */
__witness_seed: /* n __witness_seed == s n a^d%n */
  pred dup __factor_by_2 /* n n-1 d s */
  dig 2 swap __nrand /* n d s a */
  [bury] dip /* s n d a */
  __powmod
;

__witness_trivial?: /* s n x __witness_trivial? == s n x b */
  dup [ 1 = ] [ over -- = ] or_else
;

__witness_composite: /* s n x __witness_composite == b */
  __(inner_witness_loop) nip nip nip
;

__witness_probable: /* s n x __witness_probable == false */
  drop2 drop false
;

__witness_loop: /* n -> n */
  __witness_seed
  __witness_trivial?
  [ __witness_probable ]
  [ __witness_composite ]
  branch ;

__witness_loop2: [__witness_loop] dup or_else ;

/* Exact odd-divisor trial loop.
   Keep this independent from public next-prime/prime? to avoid recursive
   Miller-Rabin work while confirming a probable prime. */
__(trial): dup2 [ dup * > ] [ % 0 > ] bi2 and [ 2 + __(trial) ] ? ;
__trial: 5 __(trial) dup * < ;

__(next): dup prime? not [ 2 + __(next) ] ? ;
__next: dup 2 < [ drop 2 ] [ 1 + dup even? + __(next) ] branch ;

/* Probabilistic Miller-Rabin screen.
   false means definitely composite; true means probably prime. */
maybe_prime?: dup 4 <
  [ 1 > ]
  [ [__simple-composite?] [__witness_loop2] or_else not ]
  branch ;

/* Exact primality test: use maybe_prime? as a fast screen, then confirm. */
prime?: 
  dup maybe_prime?
  [__trial]
  [ drop false ]
  branch
;

next-prime: 
  dup 2 < [ drop 2 ]
  [__next]
  branch ;

th-prime: 0 swap [next-prime] swap times ;
`,te=`.import ../core/core.ff
.import ./precision.ffp
.import ../string/string.ffp
.import ./gcd.ffp

__dot: '.' putc ;
__zero: '0' putc ;
__needs-zero: dup 1 <= [ drop2 false ] [ over over -- n->S < nip nip ] branch ; /* x n __needs-zero == x n needs-zero? */
__putn0: dup2 __needs-zero [ __zero -- __putn0 ] [ drop putn ] branch ; /* x n __putn0 == {prints x zero-padded to n digits} */
nputn: dup2 ntrunc putn __dot tuck nfrac swap __putn0 ;

__slash: '/' putc ;
qputn: dup2 gcd tuck [ / putn ] dipd __slash / putn ;
`,se=`.import ../core/core.ff
.import ./precision.ffp

/* Exact integer square root via recursive digit-by-digit refinement. */
__base: 2 >> __next 1 << ; /* n __base == 2*sqrt(n/4) */

__pick:
  dup ++ dup * /* n x (x+1)^2 */
  dig /* x (x+1)^2 n */
  <=
  [ ++ ] /* x+1 */
  ? /* else x */
; /* n x __pick == floor(sqrt(n)) */

__next:
  dup 1 > [ /* n if n < 2 */
    dup /* n n */
    __base
    __pick
  ] ?
;

/* x -- floor(sqrt(x)) | errors on negative x (division by zero) */
isqrt:
  dup 0 < [ 1 0 / ] ? /* error: negative input */
  __next ;

/* x -- floor(sqrt(x)) x-floor(sqrt(x))^2 */
isqrtrem: dup isqrt tuck 2 ^ - ;

/* n x -- floor(10^n*sqrt(x)) | errors on negative x (division by zero) */
nsqrt:
  dup 0 < [ 1 0 / ] ? /* error: negative input */
  swap n->S2 * isqrt
;
`,ie=`/* Trigonometric words live here. Pi-derived constants are defined in pi.ffp. */
`,re=`.import ./core/core.ff
.import ./math/math.ffp
.import ./string/string.ffp
.import ./seq/seq.ffp
.import ./time/time.ffp`,oe=`.import ../core/core.ff

unit: 0 cons ;
stack: depth 0 swap [cons] swap times ;
in: [stack] dip dip [stack] dip dip ;
pair: unit cons ;
compose: [ [eval] dip eval ] cons cons ;

__map: depth 2 > [ swap q< __map dup slip q> swap ] ? ;
map!: depth 1 > [ __map eval ] [drop] branch ;

reduce!: depth 2 - times ; /* a+ [B] reduce! == r */
head!: [drop] reduce! ; /* a+ head! == a */
tail!: reverse! drop reverse! ; /* a+ tail! == a* */
last!: [clr] dip ; /* .. a last! == a */

__reduce_r: depth 3 > [ dup slip __reduce_r ] ? ;
reduce_r!: __reduce_r eval ; /* a+ [B] reduce_r! == r */
foldr!: depth 2 > [ pushtop reduce_r! ] [nip] branch ;  /* a* [B] z foldr! == r */
 
__reduce_l: depth 3 > [ swap q< __reduce_l dup slip q> swap ] ? ;
reduce_l!: __reduce_l eval ; /* a+ [B] reduce_l! == r */
foldl!: depth 2 > [ pushtop reduce_l! ] [nip] branch ; /* a* [B] z foldl! == r */

reverse!: depth 1 > [ [reverse!] dip pushtop ] ? ;

__filter: depth 2 > [ swap q< __filter over over eval not [nip] ? q> swap ] ? ;
filter!: depth 1 > [ __filter dupd eval not [drop] ? ] [drop] branch ; /* a* [B] filter! == a* */

__seq=: over emptyq? [ drop2 true ] [
  over first over first = [ swap tail swap tail __seq= ] [ drop2 false ] branch
] branch ; /* [A] [B] __seq= == flag (assumes same length) */

map: [map!] cons compose in ;
first: [head!] compose in eval ;
tail: [tail!] compose in ;
last: [last!] compose in eval ;
foldr: [ swap foldr! ] cons cons compose in eval ;
foldl: [ swap foldl! ] cons cons compose in eval ;
reverse: [reverse!] compose in ;
filter: [filter!] cons compose in ;

sum!: [+] reduce! ; /* .. sum! == n */
product!: [*] 1 reduce! ; /* .. product! == n */

sum: 0 [+] foldr ; /* [A] sum == n */
product: 1 [*] foldr ; /* [A] product == n */
length: [ depth q< clr q> ] compose in eval ; /* [A] length == n */
emptyq?: length zero? ; /* [A] emptyq? == flag */

seq=: over length over length = [__seq=] [ drop2 false ] branch ; /* [A] [B] seq= == flag */
`,ae=`.import ../core/core.ff

/*
 * String library - character and string manipulation utilities.
 */

/* Character constants */

space: 32 ; /* space == 32 */
newline: 10 ; /* newline == 10 */

/* Character output */

sp: space putc ; /* sp == {prints char(32)} */
cr: newline putc ; /* cr == {prints char(10)} */
tab: '\\t' putc ; /* tab == {prints char(9)} */

/* Case conversion */

lower?: 'a' -- 'z' ++ dig between? ; /* n lower? == flag (is lowercase letter) */
upper?: 'A' -- 'Z' ++ dig between? ; /* n upper? == flag (is uppercase letter) */

ucase: dup lower? [ 32 - ] ? ; /* n ucase == n' (convert to uppercase) */
lcase: dup upper? [ 32 + ] ? ; /* n lcase == n' (convert to lowercase) */
`,pe=`/* String output */

/* Simple stack strings, characters on the stack, initiated with a null (0) */
__prints: dup [ [__prints] dip putc ] ? ;   /* 0 n* __prints == 0 {prints chars} */
prints: __prints drop ;                      /* 0 n* prints == {prints chars} */
println: prints cr ;                         /* 0 n* println == {prints chars, newline} */

/* Improved strings (WIP) are quoted stack strings with no initiated null */
__lens: dup [ [__lens] dip drop 1 + ] ? ;    /* 0 n* __lens == 0 n */
sprint: 0 swap eval prints ;                 /* [S] sprint == {prints string} */
sprintln: sprint cr ;                        /* [S] sprintln == {prints string, newline} */
slen: 0 swap eval __lens ;                   /* [S] slen == n */

scat: compose ;                              /* [A] [B] scat == [A+B] */
sjoin: swap compose compose ;                /* [A] [Sep] [B] sjoin == [A Sep B] */
cjoin: swap cons compose ;                   /* [A] c [B] cjoin == [A c B] */
`,ce=`.import char.ffp
.import str.ffp`,le=`.import ./core/core.ff
.import ./string/string.ffp

/* TAP helpers for TAP streams.
 *
 * Known-good TAP usage in this repo:
 * - Run TAP library tests with \`cd bun && chomp test:tap\`.
 * - Start each TAP file with TAP-VERSION.
 * - TAP-VERSION resets top-level TAP counters.
 * - Start each subtest with SUBTEST; it resets that subtest's TAP counters.
 * - Use OK for assertions at any TAP depth.
 * - Flatten subtests when possible: omit \`(\` / \`)\` wrappers unless you actually need stack/queue isolation.
 * - End each assertion scope with PLAN.
 *
 * The flattened subtest pattern used by \`ff/lib/math/__tests__/*.test.ffp\` is the current
 * known-good state and should be treated as the default unless TAP semantics change.
 */

/* TAP state: failure_count assertion_count.
 * Reset at TAP file scope via TAP-VERSION and at subtest scope via SUBTEST.
 */
__RESET: 0 0 ;

/* Bump assertion_count and return idx. */
__NEXT!: ++ dup ;

/* Bump failure_count. */
__FAIL!: swap ++ swap ;

/* No failures recorded? */
__PASS?: over zero? ;

/* Indent assertion/plan lines from active TAP stack depth.
 * indent_level = (depth - 3) / 2, with 4 spaces per level.
 */
__INDENT: depth 3 - 2 / [ '\\0\\s\\s\\s\\s' prints ] swap times ;

 /* Print TAP version and reset top-level TAP state. */
TAP-VERSION: '\\0TAP\\sversion\\s14' println clr __RESET ;

/* Primary assertion word. */
OK:
  __INDENT [__NEXT!] dip truthy?
  [ '\\0ok\\s' prints putn cr ]
  [ '\\0not\\sok\\s' prints putn cr __FAIL! ]
  branch ;

/* Skip one assertion. */
#SKIP: __INDENT drop __NEXT! '\\0ok\\s' prints putn '\\0\\s#\\sSKIP' prints cr ;

/* Mark one assertion TODO. */
#TODO:
  __INDENT [__NEXT!] dip truthy?
  [ '\\0ok\\s' prints putn '\\0\\s#\\sTODO' prints cr ]
  [ '\\0not\\sok\\s' prints putn '\\0\\s#\\sTODO' prints cr ]
  branch ;

/* Skip the whole file. */
SKIP-ALL: '\\01..0\\s#\\sSKIP\\s' prints println ;

/* Print 1..n and require count match plus no failures. */
PLAN:
  __INDENT dup '\\01..' prints putn cr
  over = swap drop swap zero? and ;

/* Print a subtest header and reset subtest TAP state. */
SUBTEST: '\\0#\\sSubtest:\\s' prints println __RESET ;

/* Stack sentinel for older tests. */
¶: clr 999 ;
`,ue=`.import ./core/core.ff
.import ./string/string.ffp

assert: falsey? [ 0 10 'Failed' println .inline 1 exit ] ? ;
assert_eq: = assert .inline ;
assert_false: not assert .inline ;

OK: 0 '\\sOK' println clr ;

¶: clr 999 ;`,de=`.import ./utc.ffp
`,fe=`.import ../core/core.ff
.import ../math/pred.ffp
.import ../math/precision.ffp

/* UTC calendar helpers for non-negative Unix epoch seconds. */

leap-year?:
  dup 4 % zero?
  [
    dup 100 % zero?
    [ 400 % zero? ]
    [ drop true ]
    branch
  ]
  [ drop false ]
  branch ; /* year leap-year? == flag */

days/year: dup leap-year? [ drop 366 ] [ drop 365 ] branch ; /* year days/year == days */

days/month:
  dup 2 =
  [ drop leap-year? 28 + ]
  [
    dup 4 =
    [ drop2 30 ]
    [
      dup 6 =
      [ drop2 30 ]
      [
        dup 9 =
        [ drop2 30 ]
        [
          dup 11 =
          [ drop2 30 ]
          [ drop2 31 ]
          branch
        ]
        branch
      ]
      branch
    ]
    branch
  ]
  branch ; /* year month days/month == days */

sod>hms: 3600 divrem 60 divrem ; /* sod sod>hms == hour minute second */

__utc__days>year:
  over days/year
  over over >=
  [ drop over days/year - swap ++ swap __utc__days>year ]
  [ drop ]
  branch ; /* year day-index __utc__days>year == year day-of-year */

__utc__days>month:
  q< dup2 days/month q> swap
  over over >=
  [ drop q< dup2 days/month q> swap - swap ++ swap __utc__days>month ]
  [ drop ]
  branch ; /* year month day-of-year __utc__days>month == year month day-index */

days>ymd:
  1970 swap
  __utc__days>year
  1 swap
  __utc__days>month
  ++ ; /* days days>ymd == year month day */

epoch>utc:
  dup negitive? [ 1 0 / ] ?
  86400 divrem
  q< days>ymd q>
  sod>hms ; /* epoch epoch>utc == year month day hour minute second */

__utc__zero: '0' putc ;
__utc__needs-zero:
  dup 1 <=
  [ drop2 false ]
  [ over over -- n->S < nip nip ]
  branch ; /* x n __utc__needs-zero == x n flag */

__utc__putn0:
  dup2 __utc__needs-zero
  [ __utc__zero -- __utc__putn0 ]
  [ drop putn ]
  branch ; /* x n __utc__putn0 == {prints x padded to n digits} */

utc>iso8601:
  q< q< q< q< q<
  4 __utc__putn0
  '-' putc
  q> 2 __utc__putn0
  '-' putc
  q> 2 __utc__putn0
  'T' putc
  q> 2 __utc__putn0
  ':' putc
  q> 2 __utc__putn0
  ':' putc
  q> 2 __utc__putn0
  'Z' putc ; /* year month day hour minute second utc>iso8601 == {prints YYYY-MM-DDTHH:MM:SSZ} */

epoch>iso8601: epoch>utc utc>iso8601 ; /* epoch epoch>iso8601 == {prints UTC ISO-8601 string} */
`,he=`.import ./lib/prelude.ffp

/* factorial */

fact: dup [ dup -- fact * ] [ drop 1 ] branch ;

100 fact .

/* 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000 */`,_e=`.import ./lib/prelude.ffp

/* Pascal's triangle */

ps: putn sp ;

line: dup 0 swap [ dup2 ++ q< q< nck ps q> q> ] seq nck ps cr ;

0 [ dup line ++ ] 16 times

`,me=`.import ./lib/math/cbrt.ffp

/* Integer cube root demo using \`icbrt\`. */

0 icbrt . clr
1 icbrt . clr
5 icbrt . clr
8 icbrt . clr
27 icbrt . clr
35937 icbrt . clr
117649 icbrt . clr
970299 icbrt . clr


-1 icbrt . clr
-5 icbrt . clr
-970299 icbrt . clr

.m 999983 3 ^
icbrt . clr
`,ge=`.import ./lib/math/sqrt.ffp

/* Integer square root demo using \`isqrt\` and \`isqrtrem\` and some alternative methods */

(_isqrt_newton):
  dup2 / over + 1 >> /* update guess */
  dup2 > [ /* continue? */
    nip (_isqrt_newton)
  ] ? ;

/* newton's method with initial guess of x/2 */
isqrt_newton:
  dup 1 >> /* initial guess of x/2 */
  (_isqrt_newton)
  drop nip ;

(_isqrt_jarvis): /* b a */
  dup2 <
  [
    over - /* b a-b */
    [ 10 + ] dip /* b+10 a-b */
    (_isqrt_jarvis)
  ]
  ?
;

/* Jarvis (2006): a very strange method to work out square roots, using only subtraction */
isqrt_jarvis:
  5 *
  0 swap
  (_isqrt_jarvis)
  drop 10 /
;


/* Benchmarking */
N: 1000 ; .inline

time: 
  clock
  swap N times
  [ drop ] N -- times
  swap clock swap -
;

[ 4 isqrt_newton ]
time . clr

[ 4 isqrt ]
time . clr

[ 4 isqrt_jarvis ]
time . clr

[ 2025 isqrt_newton ]
time . clr

[ 2025 isqrt ]
time . clr

[ 2025 isqrt_jarvis ]
time . clr

[ 125348 isqrt_newton ]
time . clr

[ 125348 isqrt ]
time . clr

[ 125348 isqrt_jarvis ]
time . clr

0 isqrt . clr
1 isqrt . clr
2 isqrt . clr
3 isqrt . clr
4 isqrt . clr
25 isqrt . clr
125348 isqrt . clr
100 8 ^ 2 * isqrt . clr

1 isqrtrem . clr
2 isqrtrem . clr
3 isqrtrem . clr
4 isqrtrem . clr

7 isqrtrem . clr
9 isqrtrem . clr
11 isqrtrem . clr

25 isqrtrem . clr
24 isqrtrem . clr
26 isqrtrem . clr

1048576 isqrtrem . clr
`,be=`.import ./lib/math/gcd.ffp

/* Greatest common divisor and least common multiple demo. */

109876463 177777648  gcd . clr /* 1234567 */

109876463 177777648  lcm . clr /* 15822210672 */
`,ve=`.import ./lib/math/ack.ffp
.import ./lib/string/string.ffp

/* Ackermann function demo over several (m, n) pairs. */

0 0 . ack . cr clr /* 1 */
0 4 . ack . cr clr /* 5 */
1 0 . ack . cr clr /* 2 */
2 2 . ack . cr clr /* 7 */
3 3 . ack . cr clr /* 61 */
3 4 . ack . cr clr /* 125 */
3 6 . ack . cr clr /* 509 */
3 8 . ack . cr clr /* 2045 */
4 0 . ack . cr clr /* 13 */
4 1 . ack . cr clr /* 65533 */
4 2 . ack 10 60 ^ % . cr clr /* 856395072895337539755822087777506072339445587895905719156733 */
5 0 . ack . cr clr /* 65533 */

/* 2003529930406846464979072351560255750447825475569751419265016973710894059556311453089506130880...
699146577530041384717124577965048175856395072895337539755822087777506072339445587895905719156733 */
`,we=`.import ./lib/math/atan.ffp

/*
 * Pi using Machin's formula and Taylor series:
 *   pi/4 = 4*arctan(1/5) - arctan(1/239)
 *
 * Uses fixed-point integer arithmetic with guard digits.
 * Usage:
 *   n pi-digits -> floor(pi * 10^n)
 */

guard-digits: 20 ;

/* n -> floor(pi * 10^n) */
pi-digits:
  /* use n+guard directly with the internal scaled atan helper */
  guard-digits +

  dup 1 5 _atan__scaled
  swap 1 239 _atan__scaled

  swap 4 * swap -
  4 *

  guard-digits 10 swap ^ /
;

/* Change 50 to any N you want. */
50 pi-digits .
`,ye=`.import ./lib/prelude.ffp

/* Catalan number: n cat -> C_n */

cat: dup dup 2 * swap nck swap 1 + / ;

100 cat .  /* 896519947090131496687170070074100632420837521538745909320 */
`,xe=`.import ./lib/prelude.ffp

/* Collatz sequence printer for a starting value, ending at 1. */

c: q< ++ q> ;

next: dup even? [ 2 / ] [ 3 * 1 + ] branch ;
collatz: c dup 1 > [ next . collatz ] ? ;

/* sequence A008884 */

0 27 .
collatz
`,qe=`.import ./lib/prelude.ffp

/* Towers of Hanoi: print moves and total move count for n disks. */

over2: [ over ] dip swap ;
over3: [ over2 ] dip swap ;

dup4: over3 over3 over3 over3 ;
drop4: drop drop drop drop ;

print-move: 0 'from\\s' prints over2 putc 0 '\\sto\\s' prints over putc cr ;

dec-n: [ rot -- rot ] dip ;

move:  /* n a b c */
  dup4 over3 [
    dec-n swap move
    print-move
    bury move
  ]
  ?
  drop4
;

/* n = number of disks */

3 'A' 'B' 'C' move

drop drop drop
2 swap ^ --
cr putn
0 '\\smoves' println
`,ke=`.import ../lib/prelude.ffp

/* Project Euler #1: sum multiples of 3 or 5 below 1000. */
/* http://projecteuler.net/index.php?section=problems&id=1 */

mod?: [ 3 divisor? ] [ 5 divisor? ] bi or ;

999 count [ mod? ] filter! sum! .

/* 233168 */
`,Se=`.import ../lib/prelude.ffp

/* Project Euler #7: find the 10001st prime. */
/* http://projecteuler.net/index.php?section=problems&id=7 */

10001 th-prime . /* 104743 */
`;function Ee(i){const n="../../ff/lib/";if(!i.startsWith(n))throw new Error(`Unexpected library source path: ${i}`);return`/lib/${i.slice(n.length)}`}const Te=Object.assign({"../../ff/golf/99bottles.ffp":Rn,"../../ff/golf/e-digits.ffp":On,"../../ff/golf/fib.ffp":Dn,"../../ff/golf/fizzbuzz.ffp":Nn,"../../ff/golf/pi-digits.ffp":Mn,"../../ff/golf/quine.ff":Ln,"../../ff/golf/tutorial.ffp":Fn});function Ae(i){const n=i.lastIndexOf("/");return`/examples/${n>=0?i.slice(n+1):i}`}function Pe(i){const n=i.indexOf("../../ff/");return n>=0?i.slice(n+9):i}const Ce=Object.entries(Te).map(([i,n])=>({path:Ae(i),label:Pe(i),source:n})).sort((i,n)=>i.label.localeCompare(n.label)),X=[{path:"/examples/fact.ffp",label:"fact.ffp",source:he},{path:"/examples/pascal.ffp",label:"pascal.ffp",source:_e},{path:"/examples/cbrt.ffp",label:"cbrt.ffp",source:me},{path:"/examples/sqrt.ffp",label:"sqrt.ffp",source:ge},{path:"/examples/gcd.ffp",label:"gcd.ffp",source:be},{path:"/examples/ack.ffp",label:"ack.ffp",source:ve},{path:"/examples/pi.ffp",label:"pi.ffp",source:we},{path:"/examples/catalan.ffp",label:"catalan.ffp",source:ye},{path:"/examples/collatz.ffp",label:"collatz.ffp",source:xe},{path:"/examples/hanoi.ffp",label:"hanoi.ffp",source:qe},{path:"/examples/euler1.ffp",label:"euler/euler1.ffp",source:ke},{path:"/examples/euler7.ffp",label:"euler/euler7.ffp",source:Se},...Ce],ze=Object.fromEntries(Object.entries(Object.assign({"../../ff/lib/core/core.ff":Un,"../../ff/lib/math/ack.ffp":$n,"../../ff/lib/math/arith.ffp":Wn,"../../ff/lib/math/atan-core.ffp":jn,"../../ff/lib/math/atan.ffp":Hn,"../../ff/lib/math/cbrt.ffp":Vn,"../../ff/lib/math/exp.ffp":Kn,"../../ff/lib/math/gcd.ffp":Qn,"../../ff/lib/math/log.ffp":Gn,"../../ff/lib/math/math.ffp":Xn,"../../ff/lib/math/num.ffp":Yn,"../../ff/lib/math/pi.ffp":Zn,"../../ff/lib/math/precision.ffp":Jn,"../../ff/lib/math/pred.ffp":ne,"../../ff/lib/math/primes.ffp":ee,"../../ff/lib/math/prn.ffp":te,"../../ff/lib/math/sqrt.ffp":se,"../../ff/lib/math/trig.ffp":ie,"../../ff/lib/prelude.ffp":re,"../../ff/lib/seq/seq.ffp":oe,"../../ff/lib/string/char.ffp":ae,"../../ff/lib/string/str.ffp":pe,"../../ff/lib/string/string.ffp":ce,"../../ff/lib/tap.ffp":le,"../../ff/lib/testing.ffp":ue,"../../ff/lib/time/time.ffp":de,"../../ff/lib/time/utc.ffp":fe})).map(([i,n])=>[Ee(i),n])),Ie=Object.fromEntries(X.map(({path:i,source:n})=>[i,n]));[...X.map(({path:i,label:n})=>`<option value="${i}">${n}</option>`),'<option value="__custom__">Custom</option>'].join(`
`);function Be(i,n="/main.ffp"){return{[n]:i,...ze,...Ie}}function P(i){const n=i.startsWith("/"),e=i.split("/").filter(Boolean),t=[];for(const s of e)if(s!=="."){if(s===".."){t.pop();continue}t.push(s)}return`${n?"/":""}${t.join("/")}`||(n?"/":".")}function Re(i){const n=P(i),e=n.lastIndexOf("/");return e<=0?n.startsWith("/")?"/":".":n.slice(0,e)}function Oe(...i){const n=i.filter(Boolean).join("/").replaceAll(/\/+/g,"/");return P(n)}function De(i,n){const e=P(i).split("/").filter(Boolean),t=P(n).split("/").filter(Boolean);let s=0;for(;s<e.length&&s<t.length&&e[s]===t[s];)s++;const r=e.length-s,a=t.slice(s);return Array(r).fill("..").concat(a).join("/")||"."}function Ne(i){return{readTextFile(n){const e=P(n),t=i[e];if(typeof t!="string")throw new Error(`Virtual file not found: ${e}`);return t},fileExists(n){return typeof i[P(n)]=="string"},path:{isAbsolute(n){return n.startsWith("/")},dirname:Re,relative:De,resolve:Oe}}}function Me(i={}){const n=new TextDecoder,e=new TextEncoder,t=Array.from(e.encode(i.stdin??""));return{io:{write(s){var r;(r=i.onWrite)==null||r.call(i,n.decode(s))},readByte(){return t.shift()??null}},exit(s){var r;(r=i.onExit)==null||r.call(i,s)},now(){return Date.now()}}}const Le="/lib/prelude.ffp";function Y(i,n){const e=console.log;console.log=(...t)=>{i(t.map(String).join(" "))};try{return n()}finally{console.log=e}}async function Fe(i,n){const e=console.log;console.log=(...t)=>{i(t.map(String).join(" "))};try{return await n()}finally{console.log=e}}function Ue(i,n){let e="";const t=[];let s=0;const r=Me({stdin:n,onWrite(m){e+=m},onExit(m){s=m}}),a=new w,c=new V(r),p=new w,l=new V(r),u=Be(i),_=new q(Ne(u),{engine:l,compiler:p},{macroEngineBootstrapFile:Le});return{compiler:a,engine:c,preprocessor:_,logs:t,getOutput(){return e},getExitCode(){return s}}}function $e(i,n,e){const t=Ue(i,n),s=performance.now(),r=Y(c=>t.logs.push(c),()=>{const c=t.preprocessor.preprocess(q.tokenize(i),"/main.ffp");let p=t.compiler.compileToIR(w.tokenize(c),"/main.ffp");const l=t.compiler.validate(p);e&&(p=new Bn().optimize(p));const u=hn(p),_=w.compileToBase64(p);return t.engine.loadIR(p),{preprocessed:c,formattedIr:u,bytecode:_,issues:l}}),a=performance.now();return{preprocessed:r.preprocessed,ir:r.formattedIr,bytecode:r.bytecode,issues:r.issues,compileMs:a-s,execute(){const c=performance.now();Y(l=>t.logs.push(l),()=>{t.engine.run()});const p=performance.now();return{output:t.getOutput(),stack:t.engine.getStack().map(String),logs:[...t.logs],exitCode:t.getExitCode(),executeMs:p-c,cancelled:!1,vmCyclesExecuted:0}},async executeAsync(c={}){const p=performance.now(),l=await Fe(_=>t.logs.push(_),async()=>await t.engine.runAsync(c)),u=performance.now();return{output:t.getOutput(),stack:t.engine.getStack().map(String),logs:[...t.logs],exitCode:t.getExitCode(),executeMs:u-p,cancelled:l.cancelled,vmCyclesExecuted:l.vmCyclesExecuted}}}}function R(i){self.postMessage(i)}let M=!1,y=null;function We(i,n){const e=n.cancelled?"cancelled":"done";return{output:n.output,preprocessed:i.preprocessed,ir:i.ir,bytecode:i.bytecode,issues:i.issues,stack:n.stack,logs:n.logs,exitCode:n.exitCode,compileMs:i.compileMs,executeMs:n.executeMs,terminal:e,vmCyclesExecuted:n.vmCyclesExecuted}}self.onmessage=i=>{const n=i.data;if(n.type==="CANCEL"){y===n.runId&&(M=!0);return}if(n.type!=="RUN")return;const{runId:e,source:t,stdin:s,optimize:r,yieldIntervalMs:a,yieldSliceMax:c}=n;(async()=>{M=!1,y=e;try{const p=$e(t,s,r);if(y!==e)return;R({type:"COMPILED",runId:e,compileMs:p.compileMs,preprocessed:p.preprocessed,ir:p.ir,bytecode:p.bytecode});const l=performance.now(),u=await p.executeAsync({yieldIntervalMs:a,yieldSliceMax:c,shouldContinue:()=>!M&&y===e,onChunk:({vmCyclesExecuted:m})=>{y===e&&R({type:"PROGRESS",runId:e,vmCyclesExecuted:m,executeElapsedMs:performance.now()-l})},scheduler:()=>new Promise(m=>{globalThis.setTimeout(m,0)})});if(y!==e)return;const _=We(p,u);R({type:"RESULT",runId:e,result:_})}catch(p){if(y!==e)return;const l=p instanceof Error?p.message:String(p);R({type:"ERROR",runId:e,message:l})}finally{y===e&&(y=null)}})()}})();
