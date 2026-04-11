(function(){"use strict";function nn(){return!!(globalThis.Deno?.stdout?.isTerminal?.()??globalThis.process?.stdout?.isTTY??!1)}function D(s,n){return nn()?`\x1B[${s}m${n}\x1B[0m`:n}function en(s){return D(34,s)}function tn(s){return D(32,s)}function w(s){return D(36,s)}const r={NOP:0,CALL:1,PUTC:2,GETC:3,PUTN:5,CLOCK:6,DROP:8,PUSHR:14,PULLR:15,SHIFTL:16,SHIFTR:17,CLR:24,RAND:26,EXIT:27,DUP:33,DEPTH:35,SWAP:36,MOD:37,AND:38,STASH:40,FETCH:41,MUL:42,ADD:43,CONS:44,SUB:45,PRN:46,DIV:47,MARK:58,DEF:59,LT:60,EQ:61,GT:62,IF:63,BRA:91,KET:93,POW:94,OR:124,NOT:126},q={nop:r.NOP,eval:r.CALL,";":r.DEF,":":r.MARK,clr:r.CLR,rand:r.RAND,exit:r.EXIT,".":r.PRN,putc:r.PUTC,getc:r.GETC,putn:r.PUTN,clock:r.CLOCK,drop:r.DROP,swap:r.SWAP,dup:r.DUP,"<<":r.SHIFTL,">>":r.SHIFTR,"+":r.ADD,"-":r.SUB,cons:r.CONS,"*":r.MUL,"/":r.DIV,"<":r.LT,"=":r.EQ,">":r.GT,"?":r.IF,"%":r.MOD,"&":r.AND,"(":r.STASH,")":r.FETCH,"q<":r.PUSHR,"q>":r.PULLR,depth:r.DEPTH,"^":r.POW,"[":r.BRA,"]":r.KET,"|":r.OR,"~":r.NOT},S=255,sn=s=>s,rn=s=>s,d={call:"call",push:"push"},an=6,B=10,on=new Map([[BigInt(r.MARK),":"],[BigInt(r.DEF),";"],[BigInt(r.BRA),"["],[BigInt(r.KET),"]"]]);function pn(s){return(""+s.value).padEnd(B," ")}function cn(s,n){return n?n.padEnd(B," "):s.op===d.push&&s.meta?.pointer?`[${s.value}]`.padEnd(B," "):pn(s)}function ln(s){return s.trim()?`/* ${s} */`:""}function un(s){const n=hn(s)?.toUpperCase()||"",e=s.op===d.call?on.get(s.value):void 0,t=e!==void 0,i=cn(s,e),a=s.meta?.comment?.trim()||(s.op===d.call&&!t?n:""),o=(s.op===d.call&&!e?"EVAL":"").padEnd(an," ");return[rn(i),sn(o),ln(a)].join(" ")}function dn(s){for(const n in q)if(q[n]===s)return n;return""}function hn(s){if(s.op===d.call||s.op===d.push&&s.meta?.pointer)return s.meta?.name||dn(Number(s.value))||""}function _n(s){return s.map(un).join(`
`)}function fn(s){return s=s.replace(/\\U([A-Fa-f0-9]{8})/g,(n,e)=>$(e)),s=s.replace(/\\u([A-Fa-f0-9]{4})/g,(n,e)=>$(e)),s.replace(/\\0/g,"\0").replace(/\\b/g,"\b").replace(/\\t/g,"	").replace(/\\n/g,`
`).replace(/\\v/g,"\v").replace(/\\f/g,"\f").replace(/\\r/g,"\r").replace(/\\'/g,"'").replace(/\\"/g,'"').replace(/\\s/g," ").replace(/\\\\/g,"\\")}function $(s){let n="",e=parseInt(s,16);return e<=65535?n+=String.fromCharCode(e):e<=1114111?(e-=65536,n+=String.fromCharCode(55296|e>>10)+String.fromCharCode(56320|e&1023)):n+=`hex2Char error: Code point out of range: ${mn(e)}`,n}function mn(s){return(s+0).toString(16).toUpperCase()}const U="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",W=new Map;U.split("").forEach(function(s,n){W.set(s,n)});const j=1n<<5n,H=Number(j),V=j-1n;function gn(s){return s.map(yn).map(xn).join("")}function bn(s){return Sn(qn(s)).map(kn)}function vn(s){return s>=0n?s<<1n:(-s<<1n)+1n}function wn(s){return s&1n?-(s>>1n):s>>1n}function yn(s){if(s===0n)return[0];s=vn(s);const n=[];for(;s>0;){let e=Number(s&V);s>>=5n,s>0&&(e|=H),n.push(e)}return n}function xn(s){return s.map(n=>U[n]).join("")}function qn(s){return s.split("").map(n=>{const e=W.get(n);if(e===void 0)throw new Error(`${s} is not a valid base64 encoded VLQ`);return e})}function Sn(s){const n=[];let e=[];if(s.forEach(t=>{e.push(t),(t&H)===0&&(n.push(e),e=[])}),e.length>0)throw new Error("Malformed VLQ sequence: The last VLQ never ended.");return n}function kn(s){const n=s.reverse().reduce((e,t)=>(e<<=5n,e|=BigInt(t)&V,e),0n);return wn(n)}const En="/*",Tn="*/";function z(s){if(!(s==="-"||s==="+"))try{let n=1n;return s=s.replaceAll("_",""),s.startsWith("-0")&&(n=-1n,s=s.replace("-","")),s.includes("e")||s.includes("E")?n*BigInt(+s):n*BigInt(s)}catch{return}}class g{constructor(n={}){this.symbols=new Map,this._nextCode=-1,this.host=n;let e;for(e in q)this.symbols.set(e,BigInt(q[e]))}static tokenize(n){return n.split(/\s+/).filter(Boolean).map(e=>{const t=z(e);return t!==void 0?t:e})}static tokenizeWithSpans(n){const e=[],t=/\S+/g;let i=0,a=0,o=0;const p=c=>{for(;o<c;){const u=n[o];u==="\r"?(n[o+1]===`
`&&o++,i++,a=0):u===`
`?(i++,a=0):a++,o++}};let l;for(;(l=t.exec(n))!==null;){const c=l.index;p(c);const u=l[0]??"",_=z(u);e.push({raw:u,value:_!==void 0?_:u,line:i,character:a,length:u.length,offset:c}),p(c+u.length)}return e}static compileToBase64(n){const e=n.flatMap(t=>{if(t.op===d.call&&t.value===0n)return[];const i=t.value<<1n;return[t.op===d.push?i:i|1n]});return gn(e)}nextCode(){return BigInt(this._nextCode--)}getSymbol(n){n=n.toLowerCase();let e=this.symbols.get(n);return e===void 0&&(e=this.nextCode(),this.symbols.set(n,e)),e}compileToIR(n,e=""){let t=0;const i=n.length;let a="";const o=[];let p;for(;t<i;)if(p=n[t++],a=this.unwrapTokenValue(p),typeof a=="bigint")l(a);else if(a.length>1&&a.startsWith(".")){const[u]=a.split(" ");switch(u){case".push":o[o.length-1].op=d.push;break;case".call":o[o.length-1].op=d.call;break;case".inline":o[o.length-1].meta||={},o[o.length-1].meta.inline=!0;break;case".unsafe":o[o.length-1].meta||={},o[o.length-1].meta.unsafe=!0;break;case".pointer":o[o.length-1].meta||={},o[o.length-1].meta.pointer=!0;break;case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Compiler: .exit requires a host exit handler");case".symbols":this.symbols.forEach((_,m)=>{(this.host.log||console.log)(m,_)});break;case".words":{const _=Array.from(this.symbols,([m])=>m).join(" ");(this.host.log||console.log)(_);break}}}else if(a[0]==="'"&&a.length>1)fn(a).replace(/^'/,"").replace(/'$/,"").split("").forEach(u=>{l(u.charCodeAt(0),{comment:u})});else if(a.endsWith(":")&&a.length>1){const u=a.replace(/:$/,"");l(this.getSymbol(u),{name:`${u}`,pointer:!0}),c(r.MARK,{name:":"})}else if(a===En){const u=p,_=[];for(;t<n.length&&(p=n[t++],a=this.unwrapTokenValue(p),a!==Tn);)_.push(a);c(0n,{comment:_.join(" ")},u)}else if(a.startsWith("[")&&a.endsWith("]")){const u=a.replace(/^\[/,"").replace(/\]$/,""),_=z(u);_!==void 0?l(_,{name:u,pointer:!0}):l(this.getSymbol(u),{name:u,pointer:!0})}else c(this.getSymbol(a),{name:a});return o;function l(u,_={},m=p){o.push({value:BigInt(u),op:d.push,meta:{..._,...g.toInstructionMeta(m,e)}})}function c(u,_={},m=p){o.push({value:BigInt(u),op:d.call,meta:{..._,...g.toInstructionMeta(m,e)}})}}unwrapTokenValue(n){return typeof n=="string"||typeof n=="bigint"?n:n.value}static toInstructionMeta(n,e){return!n||typeof n=="string"||typeof n=="bigint"?{filename:e}:{filename:e,line:n.line,character:n.character,length:n.length,offset:n.offset}}validate(n){const e=n.slice(),t=[];let i=0;for(;i<e.length;){const a=e[i];if(a.op===d.call&&a.value===BigInt(r.DEF)){let o=0;for(o=i;o>0&&!(e[o].op===d.call&&e[o].value===BigInt(r.MARK));o--);const p=e.splice(o-1,i-o+2);p.at(-1)?.meta?.unsafe||t.push(...this.validateDef(p)),i=o-1}i++}return t.push(...this.validateDef(e,"main")),t}validateDef(n,e){const t=[];let i=0,a=0,o=0,p=0;const l=[0];if(!n[0])return[];e=tn(e||n[0].meta?.name?.replace(/^&/,"")||"main");const c=en(n[0].meta?.filename||"-");for(;i<n.length;){const u=n[i];if(u.op===d.call){if(u.op===d.call&&u.value===BigInt(r.MARK)&&a++,u.op===d.call&&u.value===BigInt(r.DEF)&&a--,u.op===d.call&&u.value===BigInt(r.BRA)&&(o++,l.push(0)),u.op===d.call&&u.value===BigInt(r.KET)&&(o--,(l.length>1?l.pop():0)!==0&&t.push(`${c}: Unbalanced queue push ( ${w("q< q>")} ) in quote in ${e}`)),u.op===d.call&&(u.value===BigInt(r.PUSHR)||u.value===BigInt(r.STASH))&&(p++,l[l.length-1]++),u.op===d.call&&(u.value===BigInt(r.PULLR)||u.value===BigInt(r.FETCH))){if(l[l.length-1]===0){const m=u.value===BigInt(r.FETCH)?")":"q>";t.push(`${c}: Queue borrow ( ${w(m)} ) requires ${w(".unsafe")} in ${e} (including quotes)`)}p--,l[l.length-1]--}o<0&&t.push(`${c}: Bracket ( ${w("[ ]")} ) mismatch in ${e}`),a<0&&t.push(`${c}: Definition ( ${w(": ;")} ) mismatch in ${e}`)}i++}return o!==0&&t.push(`${c}: Unbalanced brackets ( ${w("[ ]")} ) in ${e}`),p!==0&&t.push(`${c}: Unbalanced queue push ( ${w("q< q> ( )")} ) in ${e}`),a!==0&&t.push(`${c}: Unbalanced definition ( ${w(": ;")} ) in ${e}`),t}}const An="FbAbbCb";var Pn={words:[{mnemonic:"NOP",syntax:"nop",stackEffect:"… nop == …",description:"No operation; does nothing.",opcode:0},{mnemonic:"EVAL",syntax:"eval",stackEffect:"[A] eval == a*",description:"Evaluates a quotation, executing its contents.",opcode:1},{mnemonic:"PUTC",syntax:"putc",stackEffect:"n putc == {prints char(n)}",description:"Prints a character given by its numeric code.",opcode:2},{mnemonic:"GETC",syntax:"getc",stackEffect:"getc == n {reads char}",description:"Reads a single character from input and pushes its code.",opcode:3},{mnemonic:"PUTN",syntax:"putn",stackEffect:"n putn == {prints n}",description:"Prints a number to output.",opcode:5},{mnemonic:"CLOCK",syntax:"clock",stackEffect:"clock == n {reads clock}",description:"Returns the current time as a Unix timestamp.",opcode:6},{mnemonic:"DROP",syntax:"drop",stackEffect:"a drop ==",description:"Removes the top value from the stack.",opcode:8},{mnemonic:"PUSHR",syntax:"q<",stackEffect:"a q< == | …a",description:"Pushes a value onto the return stack.",opcode:14},{mnemonic:"PULLR",syntax:"q>",stackEffect:"q> == a | a…",description:"Pops a value from the return stack onto the main stack.",opcode:15},{mnemonic:"SHIFTL",syntax:"<<",stackEffect:"a b << == n",description:"Left-shifts a by b bits.",opcode:16},{mnemonic:"SHIFTR",syntax:">>",stackEffect:"a b >> == n",description:"Right-shifts a by b bits.",opcode:17},{mnemonic:"CLR",syntax:"clr",stackEffect:"… clr ==",description:"Clears the entire stack.",opcode:24},{mnemonic:"RAND",syntax:"rand",stackEffect:"n rand == r {0 <= r < n}",description:"Generates a random number between 0 and n-1.",opcode:26},{mnemonic:"EXIT",syntax:"exit",stackEffect:"n exit == {exits with code n}",description:"Exits the program with the given exit code.",opcode:27},{mnemonic:"DUP",syntax:"dup",stackEffect:"a dup == a a",description:"Duplicates the top value on the stack.",opcode:33},{mnemonic:"DEPTH",syntax:"depth",stackEffect:"… depth == … n",description:"Pushes the current stack depth.",opcode:35},{mnemonic:"SWAP",syntax:"swap",stackEffect:"a b swap == b a",description:"Swaps the top two values on the stack.",opcode:36},{mnemonic:"MOD",syntax:"%",stackEffect:"a b % == n",description:"Computes the remainder of a divided by b.",opcode:37},{mnemonic:"AND",syntax:"&",stackEffect:"a b & == n",description:"Bitwise AND of a and b.",opcode:38},{mnemonic:"STASH",syntax:"(",stackEffect:"… ( == {moves stack to queue}",description:"Moves values from the stack to the queue.",opcode:40},{mnemonic:"FETCH",syntax:")",stackEffect:") == … {restores stack from queue}",description:"Moves values from the queue back to the stack.",opcode:41},{mnemonic:"MUL",syntax:"*",stackEffect:"a b * == n",description:"Multiplies a by b.",opcode:42},{mnemonic:"ADD",syntax:"+",stackEffect:"a b + == n",description:"Adds a and b together.",opcode:43},{mnemonic:"CONS",syntax:"cons",stackEffect:"x y cons == q",description:"Builds an anonymous quotation from two stack values (opcode also maps to `,`).",opcode:44},{mnemonic:"SUB",syntax:"-",stackEffect:"a b - == n",description:"Subtracts b from a.",opcode:45},{mnemonic:"DUMP",syntax:".",stackEffect:"… . == … {prints stack}",description:"Prints the entire stack to output.",opcode:46},{mnemonic:"DIV",syntax:"/",stackEffect:"a b / == n",description:"Divides a by b (integer division).",opcode:47},{mnemonic:"MARK",syntax:":",stackEffect:"n : == {begin definition(n)}",description:"Begins a new word definition with name n.",opcode:58},{mnemonic:"DEF",syntax:";",stackEffect:"; == {end definition}",description:"Ends the current word definition.",opcode:59},{mnemonic:"LT",syntax:"<",stackEffect:"a b < == flag",description:"Pushes true if a is less than b.",opcode:60},{mnemonic:"EQ",syntax:"=",stackEffect:"a b = == flag",description:"Pushes true if a equals b.",opcode:61},{mnemonic:"GT",syntax:">",stackEffect:"a b > == flag",description:"Pushes true if a is greater than b.",opcode:62},{mnemonic:"WHEN",syntax:"?",stackEffect:"flag [A] ? == a*",description:"Executes the quotation if flag is true.",opcode:63},{mnemonic:"BRA",syntax:"[",stackEffect:"[ == {begin quotation}",description:"Begins a quotation (anonymous code block).",opcode:91},{mnemonic:"KET",syntax:"]",stackEffect:"] == [A] {end quotation}",description:"Ends a quotation and pushes it to the stack.",opcode:93},{mnemonic:"POW",syntax:"^",stackEffect:"a b ^ == n",description:"Computes a raised to the power of b.",opcode:94},{mnemonic:"OR",syntax:"|",stackEffect:"a b | == n",description:"Bitwise OR of a and b.",opcode:124},{mnemonic:"NOT",syntax:"~",stackEffect:"a ~ == n'",description:"Bitwise NOT of a.",opcode:126}]};const K=new Map;for(const s of Pn.words)K.set(s.opcode,s);function In(s){return K.get(s)}const Cn=[BigInt(r.DEF),BigInt(r.KET),BigInt(r.MARK),BigInt(r.BRA)],k=0n,E=1n;class Q{constructor(n){this.stack=[],this.queue=[],this.defs=new Map,this.symbols=new Map,this.depth=0,this.nextAnonOp=S+1,this.traceOn=!1,this.traceFormat="human",this.traceVerbose=!1,this.traceQueueMax=8,this.traceStackMax=32,this.base=10,this.statsOn=!1,this.profileOn=!1,this.stats={system_instructions_called:0,user_instructions_called:0,max_stack_depth:0,max_queue_depth:0},this.profile={},this.platform=n,this.setup()}static fromBase64(n){return bn(n).flatMap(e=>{const t=e&1n,i=e>>1n;return[t,i]})}getStack(){return this.stack.slice()}peek(){const n=this.stack.length;if(n>0)return this.stack[n-1];throw new Error("Peek: stack underflow")}pop(){if(this.stack.length>0)return this.stack.pop();throw new Error("Pop: stack underflow")}push(n){this.stack.push(n)}poke(n){const e=this.stack.length;if(e>0){this.stack[e-1]=n;return}throw new Error("Poke: stack underflow")}clear(){this.stack.splice(0,this.stack.length)}queuePush(n,e){this.queue.push(n,e)}queueUnshift(n,e){this.queue.unshift(n,e)}queueShift(){return[this.queue.shift()??0n,this.queue.shift()??0n]}queuePop(){const n=this.queue.pop()??0n;return[this.queue.pop()??0n,n]}defineSystem(n,e){const t=BigInt(e),i=this.getName(t);if(this.defs.has(t))throw new Error(`Define: cannot redefine system word "${i}"`);this.defs.set(t,n)}defineUser(n,e){const t=this.getName(e);if(e>-1&&e<S)throw new Error(`Define: cannot define system op "${t}"`);if(this.defs.has(e))throw e>S?new Error(`Define: cannot redefine anon op "${t}"`):new Error(`Define: cannot redefine user op "${t}"`);this.defs.set(e,n)}callSystem(n){const e=this.defs.get(n);if(typeof e=="function"){if(this.statsOn&&this.stats.system_instructions_called++,this.profileOn){const i=performance.now();e();const a=performance.now(),o=this.getName(n)||Number(n);this.profile[o]||=[0,0],this.profile[o][0]++,this.profile[o][1]!=0,this.profile[o][1]+=a-i;return}return e()}const t=this.getName(n)||n;throw new Error(`Call: undefined system op "${t}"`)}callUser(n){const e=this.defs.get(n);if(Array.isArray(e)){if(this.statsOn&&this.stats.user_instructions_called++,this.queue.unshift(...e),this.profileOn){const i=this.getName(n,`&${n}`);this.profile[i]||=[0,void 0],this.profile[i][0]++}return}const t=this.getName(n)||n;throw new Error(`Call: undefined user op "${t}"`)}callOp(n){return n>-1n&&n<S?this.callSystem(n):this.callUser(n)}loadBigIntCode(n){this.queue.push(...n)}loadIR(n){let e=0;for(;e<n.length;){const t=n[e++];if(t.op===d.call){if(t.value===0n)continue;t.meta?.name&&!this.symbols.has(t.value)&&this.symbols.set(t.value,t.meta?.name),this.queuePush(E,t.value)}else this.queuePush(k,t.value)}return this.stack}runChunk(n,e){const t=this.queue;let i=!1,a=e,o=0;for(;t.length>0&&o<n;){const[p,l]=this.queueShift(),c=p===E,u=this.stack.slice();i=!this.depth||c&&Cn.includes(l),c?i?this.callOp(l):(this.push(p),this.push(l)):(i||this.push(p),this.push(l)),this.statsOn&&(this.stats.max_stack_depth=Math.max(this.stats.max_stack_depth,this.stack.length),this.stats.max_queue_depth=Math.max(this.stats.max_queue_depth,t.length/2));const _=a++;this.traceOn&&this.trace({step:_,immediate:i,tag:p,value:l,stackBefore:u,stackAfter:this.traceVerbose||this.traceFormat==="jsonl"?this.stack.slice():void 0}),o++}return a}run(){return this.runChunk(Number.POSITIVE_INFINITY,0),this.stack}async runAsync(n={}){const e=n.yieldIntervalMs??160,t=n.yieldSliceMax??n.yieldEvery??655360;if(!Number.isFinite(e)||e<0)throw new Error(`runAsync: yieldIntervalMs must be a non-negative finite number (received ${e})`);if(!Number.isFinite(t)||t<1)throw new Error(`runAsync: yieldSliceMax / yieldEvery must be a positive finite number (received ${t})`);const i=n.scheduler??(()=>new Promise(c=>{globalThis.setTimeout(c,0)})),a=typeof globalThis.performance<"u"&&typeof globalThis.performance.now=="function"?()=>globalThis.performance.now():()=>globalThis.Date.now();let o=0,p=0,l=!1;for(;this.queue.length>0&&!l;){const c=a(),u=e>0?c+e:c;for(;this.queue.length>0&&!l&&!(e>0&&a()>=u);){const _=o;if(o=this.runChunk(t,o),p+=o-_,n.onChunk?.({vmCyclesExecuted:p}),n.shouldContinue&&!n.shouldContinue()){l=!0;break}if(e===0)break}this.queue.length>0&&!l&&await i()}return{stack:this.stack.slice(),cancelled:l,vmCyclesExecuted:p}}trace({step:n,immediate:e,tag:t,value:i,stackBefore:a,stackAfter:o}){const p=this.createTraceEvent(n,e,t,i,a,o);if(this.traceFormat==="jsonl"){this.writeTraceLine(JSON.stringify(p));return}this.writeTraceLine(this.formatHumanTrace(p))}createTraceEvent(n,e,t,i,a,o){const p=t===E,l=p?this.getName(i,String(i)):String(i),c=this.getQueuePreview();return{step:n,immediate:e,tag:p?"call":"literal",value:String(i),action:l,stack_before:this.limitStack(a).map(String),stack_after:o?this.limitStack(o).map(String):void 0,queue_preview:c,queue_depth:this.queue.length/2}}limitStack(n){return n.length>this.traceStackMax?n.slice(-this.traceStackMax):n}getQueuePreview(){const n=[],e=Math.max(this.traceQueueMax,0);for(let t=0;t<this.queue.length&&n.length<e;t+=2){const i=this.queue[t]??0n,a=this.queue[t+1]??0n,o=i===E;n.push({tag:o?"call":"literal",value:String(a),action:o?this.getName(a,String(a)):String(a)})}return n}formatHumanTrace(n){const e=this.padHumanAction(n.action),t=this.formatHumanStack(n.stack_before),i=this.formatHumanQueue(n.queue_preview,n.queue_depth),a=this.layoutHumanTraceLine(n.step,t,e,i);if(this.traceVerbose){const o=this.formatHumanStack(n.stack_after??[]);return`${a}
${" ".repeat(String(n.step).length+1)}${o} | immediate=${n.immediate} tag=${n.tag} value=${n.value} stack_depth=${this.stack.length} queue_depth=${n.queue_depth}`}return a}padHumanAction(n){return n.length>=7?n:n.padStart(Math.floor((7+n.length)/2)," ").padEnd(7," ")}layoutHumanTraceLine(n,e,t,i){const a=this.getTraceTerminalWidth(),o=`${n} `;if(o.length>=a)return o.slice(0,a);const p=1,l=Math.min(t.length,Math.max(a-o.length-p*2,1)),c=Math.max(o.length+p,Math.floor((a-l)/2)),u=Math.min(c,Math.max(o.length+p,a-l-p)),_=u+l,m=o.length,T=Math.max(m,u-p),A=Math.min(a,_+p),ot=a,Z=Math.max(T-m,0),J=Math.max(ot-A,0),R=Array.from({length:a},()=>" ");if(this.writeSegment(R,0,o,o.length),this.writeSegment(R,u,t,l),Z>0){const P=this.truncateLeft(e,Z);this.writeSegment(R,T-P.length,P,P.length)}if(J>0){const P=this.truncateRight(i,J);this.writeSegment(R,A,P,P.length)}return R.join("").replace(/\s+$/,"")}formatHumanStack(n){return n.length===0?"[ ]":`[ ${n.join(" ")} ]`}formatHumanQueue(n,e){const t=n.map(a=>a.tag==="call"?`&${a.action}`:a.value),i=Math.max(e-n.length,0);return i>0&&t.push(`…(+${i})`),t.length===0?"[ ]":`[ ${t.join(" ")} ]`}getTraceTerminalWidth(){const e=globalThis.Deno,t=e?.stderr?.isTerminal?.()&&typeof e.stderr.rid=="number"?e.stderr.rid:e?.stdout?.isTerminal?.()&&typeof e.stdout.rid=="number"?e.stdout.rid:void 0;if(typeof t=="number")try{const o=e?.consoleSize?.(t).columns;if(typeof o=="number"&&o>0)return o}catch{}const i=globalThis.process,a=i?.stderr?.isTTY&&typeof i.stderr.columns=="number"?i.stderr.columns:i?.stdout?.isTTY&&typeof i.stdout.columns=="number"?i.stdout.columns:void 0;return typeof a=="number"&&a>0?a:120}truncateLeft(n,e){return e<=0?"":n.length<=e?n:e===1?"…":`…${n.slice(-(e-1))}`}truncateRight(n,e){return e<=0?"":n.length<=e?n:e===1?"…":`${n.slice(0,e-1)}…`}writeSegment(n,e,t,i){if(!(i<=0))for(let a=0;a<i&&a<t.length&&e+a<n.length;a++)n[e+a]=t[a]}writeTraceLine(n){const e=new TextEncoder().encode(`${n}
`);if(this.platform.io.writeError){this.platform.io.writeError(e);return}this.platform.io.write(e)}getName(n,e=String(n)){return this.symbols.has(n)?this.symbols.get(n):String(e)}inspectValue(n){const e=this.symbols.get(n),t=n>=0n&&n<=BigInt(S),i=this.defs.get(n),a=i!==void 0;let o;Array.isArray(i)&&(o=this.parseDefinitionTokens(i));let p,l;if(t){const c=In(Number(n));c&&(p=c.stackEffect,l=c.description)}return{value:n,name:e,isSystem:t,isDefined:a,definition:o,stackEffect:p,description:l}}parseDefinitionTokens(n){const e=[];for(let t=0;t<n.length;t+=2){const i=n[t]??0n,a=n[t+1]??0n,o=i===E,p=o?this.symbols.get(a):void 0,l=this.defs.has(a);e.push({value:a,tag:i,name:p,isCall:o,isDefined:l})}return e}print(){const n=this.stack.map(e=>e.toString(this.base)).join(" ");this.platform.io.write(new TextEncoder().encode(`[ ${n} ]
`))}loadSourceMap(n){Object.keys(n.symbols).forEach(e=>{this.symbols.set(BigInt(e),n.symbols[e])})}getNextAnonOp(){let n=this.nextAnonOp++;for(;this.defs.has(BigInt(n));)n=this.nextAnonOp++;return BigInt(n)}setup(){const n=new TextEncoder;let e;for(e in q)this.symbols.set(BigInt(q[e]),e);this.defineSystem(()=>{},r.NOP),this.defineSystem(()=>{const t=this.pop();this.callOp(t)},r.CALL),this.defineSystem(()=>{this.depth--;const[,t]=this.queuePop(),i=this.stack.splice(Number(t||0))||[];this.defineUser(i,this.pop())},r.DEF),this.defineSystem(()=>{this.depth--;const[,t]=this.queuePop(),i=this.stack.splice(Number(t||0))||[],a=this.getNextAnonOp();this.defineUser(i,a),this.depth>0&&this.push(0n),this.push(a)},r.KET),this.defineSystem(()=>{this.depth++;const t=this.stack.length;this.queuePush(k,BigInt(t))},r.BRA),this.defineSystem(()=>{this.depth++;const t=this.stack.length;this.queuePush(k,BigInt(t))},r.MARK),this.defineSystem(()=>this.clear(),r.CLR),this.defineSystem(()=>{const t=this.pop();this.platform.exit(Number(t))},r.EXIT),this.defineSystem(()=>{const t=this.pop();this.push(Rn(t))},r.RAND),this.defineSystem(()=>{this.print()},r.PRN),this.defineSystem(()=>{this.push(BigInt(this.platform.now()))},r.CLOCK),this.defineSystem(()=>{const t=n.encode(String.fromCharCode(Number(this.pop())));this.platform.io.write(t)},r.PUTC),this.defineSystem(()=>{this.platform.io.setRaw&&this.platform.io.setRaw(!0);const t=this.platform.io.readByte();this.platform.io.setRaw&&this.platform.io.setRaw(!1),this.push(BigInt(t??0))},r.GETC),this.defineSystem(()=>{const t=n.encode(this.pop().toString(this.base));this.platform.io.write(t)},r.PUTN),this.defineSystem(()=>{this.pop()},r.DROP),this.defineSystem(()=>{const t=this.peek(),i=this.stack[this.stack.length-2];this.stack[this.stack.length-2]=t,this.poke(i)},r.SWAP),this.defineSystem(()=>{this.push(this.peek())},r.DUP),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]+=t},r.ADD),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]-=t},r.SUB),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]*=t},r.MUL),this.defineSystem(()=>{const t=this.pop();if(t===0n)throw new Error("DIV: Division by zero");this.stack[this.stack.length-1]/=t},r.DIV),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]%=t},r.MOD),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]<<=t},r.SHIFTL),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]>>=t},r.SHIFTR),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]&=t},r.AND),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]**=t},r.POW),this.defineSystem(()=>{this.push(this.pop()>this.pop()?1n:0n)},r.LT),this.defineSystem(()=>{this.push(this.pop()===this.pop()?1n:0n)},r.EQ),this.defineSystem(()=>{this.push(this.pop()<this.pop()?1n:0n)},r.GT),this.defineSystem(()=>{const t=this.pop();this.pop()!==0n&&this.queueUnshift(E,t)},r.IF),this.defineSystem(()=>{this.queuePush(k,this.pop())},r.PUSHR),this.defineSystem(()=>{const[,t]=this.queuePop();this.push(t)},r.PULLR),this.defineSystem(()=>{this.push(BigInt(this.stack.length))},r.DEPTH),this.defineSystem(()=>{const t=this.stack.length;this.stack.splice(0,t).forEach(a=>this.queuePush(k,a)),this.queuePush(k,BigInt(t))},r.STASH),this.defineSystem(()=>{const[,t]=this.queuePop(),i=Number(t),a=[];for(let o=0;o<i;o++){const[,p]=this.queuePop();a.unshift(p)}this.stack.unshift(...a)},r.FETCH),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]|=t},r.OR),this.defineSystem(()=>{const t=this.pop();this.push(~t)},r.NOT),this.defineSystem(()=>{const t=this.pop(),a=[0n,this.pop(),1n,t],o=this.getNextAnonOp();this.defineUser(a,o),this.depth>0&&this.push(0n),this.push(o)},r.CONS)}printProfile(){console.log(),console.log("Profile:");const n=Object.keys(this.profile).map(i=>{const a=this.profile[i][0],o=this.profile[i][1];return{name:i,calls:a,time:o,system:typeof o<"u","ops/ms":o?Math.round(a/o):""}}).sort((i,a)=>a.calls-i.calls),e=n.filter(i=>i.system),t=n.filter(i=>!i.system);console.table(e,["name","calls","ops/ms"]),console.table(t,["name","calls"]),console.log()}printStats(){console.log(),console.log("Interpreter stats:"),console.log(this.stats),console.log()}}function Rn(s){const n=s,e=n.toString().length;let t="";for(;t.length<e;)t+=Math.random().toString().split(".")[1];t=t.slice(0,e);const i="1"+"0".repeat(e);return n*BigInt(t)/BigInt(i)}const I=BigInt(r.DEF),N=BigInt(r.KET),C=BigInt(r.MARK),M=BigInt(r.BRA),h=s=>(s=BigInt(s),n=>n.op===d.call&&n.value===s),b=s=>(s=BigInt(s),n=>n.op===d.push&&n.value===s),f=s=>s.op===d.push,L=s=>s.op===d.push&&s.value!==0n,On=s=>s.op===d.push&&s.value>=0n,Dn=s=>s.op===d.call&&![M,N,C,I].includes(s.value),Bn=[{name:"No operation",pattern:[h(r.NOP)],replacement:()=>[]},{name:"Null Sequence - SWAP SWAP",pattern:[h(r.SWAP),h(r.SWAP)],replacement:()=>[]},{name:"Null Sequence - DUP DROP",pattern:[h(r.DUP),h(r.DROP)],replacement:()=>[]},{name:"Null Sequence - PUSHR PULLR",pattern:[h(r.PUSHR),h(r.PULLR)],replacement:()=>[]},{name:"Null Sequence - CLOCK DROP",pattern:[h(r.CLOCK),h(r.DROP)],replacement:()=>[]},{name:"Null Sequence - RAND DROP",pattern:[h(r.RAND),h(r.DROP)],replacement:()=>[]},{name:"Null Sequence - DEPTH DROP",pattern:[h(r.DEPTH),h(r.DROP)],replacement:()=>[]},{name:"Null Sequence - NOT NOT",pattern:[h(r.NOT),h(r.NOT)],replacement:()=>[]},{name:"Indirect calls - n EVAL",pattern:[f,h(r.CALL)],replacement:s=>[{op:d.call,value:s.value,meta:{name:s.meta?.name?.replace(/^&/,"")}}]},{name:"Null Sequence - n DROP",pattern:[f,h(r.DROP)],replacement:()=>[]},{name:"Constant Folding - a b ADD",pattern:[f,f,h(r.ADD)],replacement:(s,n)=>[{op:d.push,value:s.value+n.value}]},{name:"Algebraic Simplification - 0 ADD",pattern:[b(0),h(r.ADD)],replacement:()=>[]},{name:"Algebraic Simplification - swap ADD",pattern:[h(r.SWAP),h(r.ADD)],replacement:(s,n)=>[n]},{name:"Constant Folding - a b SUB",pattern:[f,f,h(r.SUB)],replacement:(s,n)=>[{op:d.push,value:s.value-n.value}]},{name:"Algebraic Simplification - 0 SUB",pattern:[b(0),h(r.SUB)],replacement:()=>[]},{name:"Constant Folding - a b MUL",pattern:[f,f,h(r.MUL)],replacement:(s,n)=>[{op:d.push,value:s.value*n.value}]},{name:"Algebraic Simplification - 1 MUL",pattern:[b(1),h(r.MUL)],replacement:()=>[]},{name:"Algebraic Simplification - swap MUL",pattern:[h(r.SWAP),h(r.MUL)],replacement:(s,n)=>[n]},{name:"Algebraic Simplification - swap AND",pattern:[h(r.SWAP),h(r.AND)],replacement:(s,n)=>[n]},{name:"Algebraic Simplification - swap OR",pattern:[h(r.SWAP),h(r.OR)],replacement:(s,n)=>[n]},{name:"Algebraic Simplification - swap EQ",pattern:[h(r.SWAP),h(r.EQ)],replacement:(s,n)=>[n]},{name:"Constant Folding - a b DIV",pattern:[f,L,h(r.DIV)],replacement:(s,n)=>[{op:d.push,value:s.value/n.value}]},{name:"Constant Folding - a b MOD",pattern:[f,L,h(r.MOD)],replacement:(s,n)=>[{op:d.push,value:s.value%n.value}]},{name:"Constant Folding - a b SHIFTL",pattern:[f,f,h(r.SHIFTL)],replacement:(s,n)=>[{op:d.push,value:s.value<<n.value}]},{name:"Constant Folding - a b SHIFTR",pattern:[f,f,h(r.SHIFTR)],replacement:(s,n)=>[{op:d.push,value:s.value>>n.value}]},{name:"Constant Folding - a b AND",pattern:[f,f,h(r.AND)],replacement:(s,n)=>[{op:d.push,value:s.value&n.value}]},{name:"Constant Folding - a b OR",pattern:[f,f,h(r.OR)],replacement:(s,n)=>[{op:d.push,value:s.value|n.value}]},{name:"Constant Folding - a NOT",pattern:[f,h(r.NOT)],replacement:s=>[{op:d.push,value:~s.value}]},{name:"Constant Folding - a b LT",pattern:[f,f,h(r.LT)],replacement:(s,n)=>[{op:d.push,value:s.value<n.value?1n:0n}]},{name:"Constant Folding - a b EQ",pattern:[f,f,h(r.EQ)],replacement:(s,n)=>[{op:d.push,value:s.value===n.value?1n:0n}]},{name:"Constant Folding - a b GT",pattern:[f,f,h(r.GT)],replacement:(s,n)=>[{op:d.push,value:s.value>n.value?1n:0n}]},{name:"Constant Folding - a b POW",pattern:[f,On,h(r.POW)],replacement:(s,n)=>[{op:d.push,value:s.value**n.value}]},{name:"Algebraic Simplification - 0 OR",pattern:[b(0),h(r.OR)],replacement:()=>[]},{name:"Algebraic Simplification - 0 SHIFTL",pattern:[b(0),h(r.SHIFTL)],replacement:()=>[]},{name:"Algebraic Simplification - 0 SHIFTR",pattern:[b(0),h(r.SHIFTR)],replacement:()=>[]},{name:"Algebraic Simplification - 1 POW",pattern:[b(1),h(r.POW)],replacement:()=>[]},{name:"Algebraic Simplification - 1 DIV",pattern:[b(1),h(r.DIV)],replacement:()=>[]},{name:"Constant propagation - a DUP",pattern:[f,h(r.DUP)],replacement:s=>[s,s]},{name:"Unreachable Code - 0 &b IF",pattern:[b(0),f,h(r.IF)],replacement:()=>[]},{name:"Flows-Of-Control Optimizations - !0 &b IF",pattern:[L,f,h(r.IF)],replacement:(s,n,e)=>[{op:d.call,value:n.value,meta:{name:n.meta?.name?.replace(/^&/,"")}}]},{name:"Null Sequence - 0 eval",pattern:[b(0),h(r.CALL)],replacement:()=>[]},{name:"Empty List - [ ]",pattern:[h(r.BRA),h(r.KET)],replacement:()=>[{op:d.push,value:0n,meta:{pointer:!0,name:"0"}}]},{name:"Single-word Quote - [ word ]",pattern:[h(r.BRA),Dn,h(r.KET)],replacement:(s,n)=>[{op:d.push,value:n.value,meta:{pointer:!0,name:n.meta?.name}}]}];class zn{constructor(){this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0},this.minOptPasses=2,this.maxOptPasses=20,this.defs=new Map,this.calledWords=new Set,this.optimized=[],this.nextAnonOp=S+1}optimize(n){this.reset(),this.stats.pre_optimization_ir_size=n.length,this.optimized=n;let e;do e=this.optimized.length,this.optLoop();while((this.optimized.length<e||this.stats.optimization_passes<this.minOptPasses)&&this.stats.optimization_passes<this.maxOptPasses);return this.optimized=this.pullDefs(this.optimized),this.optimized=this.addReferencedWords(this.optimized),this.stats.post_optimization_ir_size=this.optimized.length,this.optimized}optLoop(){this.optimized=this.peepholeOptimization(this.optimized),this.optimized=this.getDefs(this.optimized),this.optimized=this.inlineWords(this.optimized,4),this.stats.optimization_passes++}reset(){this.optimized=[],this.defs=new Map,this.calledWords=new Set,this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0}}getDefs(n){let e=0;for(;e<n.length;){const t=n[e];if(t.op===d.call){if(t.value===N){this.stats.optimization_passes===0&&this.stats.user_defined_anon_defs++,t.meta??={},t.meta.uid??=this.nextAnonOp++;let i=e;for(;i-- >0;){const l=n[i];if(l.op===d.call&&l.value===M)break}const a=BigInt(t.meta.uid),o={op:d.push,value:a,meta:{pointer:!0}},p=n.slice(i,e+1);p.unshift(o),p[1]={...p[1],value:C,meta:{...p[1].meta,name:":"}},p[p.length-1]={...p[p.length-1],value:I,meta:{...p[p.length-1].meta,name:";"}},this.defs.set(a,p)}else if(t.value===I){this.stats.optimization_passes===0&&this.stats.user_defined_named_defs++;let i=e;for(;i-- >0;){const p=n[i];if(p.op===d.call&&p.value===C)break}const a=n[i-1];a.meta||={},a.meta.pointer=!0;const o=n.slice(i-1,e+1);this.defs.set(a.value,o)}}e++}return n}pullDefs(n,e=!1){const t=n.slice();let i=0;for(;i<t.length;){const a=t[i];if(a.op===d.call){if(a.value===N){a.meta??={},a.meta.uid??=this.nextAnonOp++;const o=i;for(;i-- >0;){const u=t[i];if(u.op===d.call&&u.value===M)break}const p=BigInt(a.meta.uid),l={op:d.push,value:p,meta:{pointer:!0}},c=t.splice(i,o-i+1,l);c.unshift(l),c[1]={...c[1],value:C,meta:{...c[1].meta,name:":"}},c[c.length-1]={...c[c.length-1],value:I,meta:{...c[c.length-1].meta,name:";"}},this.defs.set(p,c)}else if(a.value===I&&!e){const o=i;for(;i-- >0;){const c=t[i];if(c.op===d.call&&c.value===C)break}const p=t[i-1];p.meta||={},p.meta.pointer=!0;const l=t.splice(i-1,o-i+2);i=i-2,this.defs.set(l[0].value,l)}}i++}return t}peepholeOptimization(n){const e=n.slice();for(;;){const t=this.stats.peephole_optimizations;let i=0;for(;i<e.length;){for(const a of Bn){const{pattern:o,replacement:p}=a;if(i+o.length>e.length)continue;if(o.every((c,u)=>c(e[i+u]))){this.stats.peephole_optimizations++;const c=e.slice(i,i+o.length);e.splice(i,o.length,...p(...c)),i=Math.max(0,i-o.length-1);break}}i++}if(this.stats.peephole_optimizations===t)break}return e}inlineWords(n,e=1,t=[]){return n.flatMap(i=>{if(i.meta?.unsafe)return i;if(i.op===d.call&&this.defs.has(i.value)){if(t.includes(i.value))return i;const a=this.defs.get(i.value);if(!a)return i;const o=a[a.length-1];if(o.meta?.unsafe)return i;if(o.meta?.inline||i.meta?.inline)return this.stats.inlined_calls++,this.inlineWords(a.slice(2,-1),1/0,t.concat(i.value));if(a.length<=e+3)return this.stats.inlined_calls++,this.inlineWords(a.slice(2,-1),e,t.concat(i.value))}return i})}addReferencedWords(n){return n.slice().forEach(e=>{e.op===d.push&&e.meta?.pointer?this.addDef(e.value):e.op===d.call&&this.addDef(e.value)}),n}addDef(n){if(!this.calledWords.has(n)){const e=this.defs.get(n);if(e)return this.stats.post_optimization_user_defs++,this.calledWords.add(n),this.optimized.unshift(...e),this.addReferencedWords(e)}}}class x{constructor(n,e,t){this.imported=new Set,this.importPrefixes=new Map,this.macroPreludeReady=!1,this.rootFilename=null,this.host=n,this.engine=e.engine,this.compiler=e.compiler||new g,this.stdlibRoots=t?.stdlibRoots??[],t?.macroEngineBootstrapFile&&this.bootstrapMacroEngine(t.macroEngineBootstrapFile)}static tokenize(n){return n.split(/[\r\n]+/)}preprocess(n,e="-"){const t=e!=="-"&&this.host.fileExists(e)?this.host.realpath(e):e,i=this.rootFilename===null;i&&t!=="-"&&(this.rootFilename=t);try{return this.preprocessLines(n,t)}finally{i&&(this.rootFilename=null)}}preprocessLines(n,e,t){return n.map(i=>{if(i.length>1&&i[0]==="."){const[a,...o]=i.split(" ");if(a[0]==="."&&a.length>1){switch(a){case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Preprocessor: .exit requires a host exit handler");case".load":{const p=this.findFile(o.join(" "),e),l=this.host.readTextFile(p);return this.preprocessLines(x.tokenize(l),p)}case".import":{const p=this.findFile(o.join(" "),e);if(!this.imported.has(p)){this.imported.add(p);const l=this.host.readTextFile(p);return this.preprocessLines(x.tokenize(l),p,p)}return""}case".m":return this.runMacro(o.join(" "),i);case".ff":return this.runMacro(o.join(" "),i);case".ffp":{if(!this.macroPreludeReady)throw new Error("Preprocessor: .ffp requires prelude-enabled macro context");return this.runMacro(o.join(" "),i)}}return""}}return t?this.mangleImportedLine(i,t):i}).join(`
`)}findFile(n,e="-"){const t=n.trim();if(!t)throw new Error("Preprocessor: missing import path");return this.isStdlibImport(t)?this.resolveStdlibImport(t):this.resolveFilesystemImport(t,e)}isStdlibImport(n){return n.startsWith("<")&&n.endsWith(">")&&n.length>2}resolveFilesystemImport(n,e){if(e&&e!=="-"&&!this.host.path.isAbsolute(n)){const i=this.host.path.dirname(e),a=this.host.path.resolve(i,n),o=this.resolveFileOrDirectory(a);if(o)return o}const t=this.resolveFileOrDirectory(n);if(t)return t;throw new Error(`File not found: "${n}"`)}resolveStdlibImport(n){const e=n.slice(1,-1).trim(),t=[];for(const a of this.stdlibRoots){t.push(a);const o=this.host.path.resolve(a,e),p=this.resolveFileOrDirectory(o,{extensions:[".ffp",".ff"]});if(p)return p}const i=t.length>0?t.join(", "):"(no stdlib roots configured)";throw new Error(`Stdlib import not found: ${n} (searched roots: ${i})`)}resolveFileOrDirectory(n,e){if(this.host.fileExists(n))return this.host.realpath(n);for(const t of e?.extensions??[]){const i=`${n}${t}`;if(this.host.fileExists(i))return this.host.realpath(i)}if(this.host.directoryExists(n)){const t=this.getBasename(n);for(const i of[".ffp",".ff"]){const a=this.host.path.resolve(n,`${t}${i}`);if(this.host.fileExists(a))return this.host.realpath(a)}}return null}getBasename(n){const e=n.replace(/[\\/]+$/,""),t=e.split(/[\\/]+/).filter(Boolean);return t[t.length-1]??e}bootstrapMacroEngine(n){const e=this.findFile(n),t=this.host.readTextFile(e),a=new x(this.host,{engine:this.engine,compiler:this.compiler},{stdlibRoots:this.stdlibRoots}).preprocess(x.tokenize(t),e),o=this.compiler.compileToIR(g.tokenize(a),e);this.engine.loadIR(o),this.engine.run(),this.engine.clear(),this.macroPreludeReady=!0}runMacro(n,e){const t=this.compiler.compileToIR(g.tokenize(n));this.engine.loadIR(t),this.engine.run();const i=this.engine.getStack();return this.engine.clear(),i.map(String).join(" ")+` /* ${e} */`}mangleImportedLine(n,e){const t=this.getImportPrefix(e);return n.split(/(\s+)/).map(i=>!i||/\s+/.test(i)?i:this.mangleImportedToken(i,t)).join("")}mangleImportedToken(n,e){return n.startsWith("[__")?`[${e}${n.slice(3)}`:n.startsWith("__")?`${e}${n.slice(2)}`:n}getImportPrefix(n){const e=this.importPrefixes.get(n);if(e)return e;const i=this.getNormalizedImportPath(n).replace(/[^A-Za-z0-9]+/g,"_").replace(/^_+|_+$/g,"").replace(/_+/g,"_")||"module",a=this.hashPath(n),o=`__${i}_${a}__`;return this.importPrefixes.set(n,o),o}getNormalizedImportPath(n){if(this.rootFilename&&this.rootFilename!=="-"){const e=this.host.path.dirname(this.rootFilename),t=this.host.path.relative(e,n);if(t)return t.replace(/\\/g,"/")}return n.replace(/\\/g,"/")}hashPath(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619)>>>0;return e.toString(36)}}var Nn=`.import <prelude>

/* Project Euler #1: sum multiples of 3 or 5 below 1000. */
/* http://projecteuler.net/index.php?section=problems&id=1 */

mod?: [ 3 divisor? ] [ 5 divisor? ] bi or ;

999 count [ mod? ] filter! sum! .

/* 233168 */
`,Mn=`.import <prelude>

/* http://projecteuler.net/index.php?section=problems&id=10 */

/* Walk primes with next-prime (prelude) until past 2_000_000. Slow but exact. */

_e10: dup 2_000_000 <= [
    dup rot + swap next-prime _e10
  ] ? ;

0 2 _e10 drop . /* 142913828922 */
`,Ln=`.import <prelude>

/* http://projecteuler.net/index.php?section=problems&id=13 */

37107287533902102798797998220837590246510135740250
46376937677490009712648124896970078050417018260538
74324986199524741059474233309513058123726617309629
91942213363574161572522430563301811072406154908250
23067588207539346171171980310421047513778063246676
89261670696623633820136378418383684178734361726757
28112879812849979408065481931592621691275889832738
44274228917432520321923589422876796487670272189318
47451445736001306439091167216856844588711603153276
70386486105843025439939619828917593665686757934951
62176457141856560629502157223196586755079324193331
64906352462741904929101432445813822663347944758178
92575867718337217661963751590579239728245598838407
58203565325359399008402633568948830189458628227828
80181199384826282014278194139940567587151170094390
35398664372827112653829987240784473053190104293586
86515506006295864861532075273371959191420517255829
71693888707715466499115593487603532921714970056938
54370070576826684624621495650076471787294438377604
53282654108756828443191190634694037855217779295145
36123272525000296071075082563815656710885258350721
45876576172410976447339110607218265236877223636045
17423706905851860660448207621209813287860733969412
81142660418086830619328460811191061556940512689692
51934325451728388641918047049293215058642563049483
62467221648435076201727918039944693004732956340691
15732444386908125794514089057706229429197107928209
55037687525678773091862540744969844508330393682126
18336384825330154686196124348767681297534375946515
80386287592878490201521685554828717201219257766954
78182833757993103614740356856449095527097864797581
16726320100436897842553539920931837441497806860984
48403098129077791799088218795327364475675590848030
87086987551392711854517078544161852424320693150332
59959406895756536782107074926966537676326235447210
69793950679652694742597709739166693763042633987085
41052684708299085211399427365734116182760315001271
65378607361501080857009149939512557028198746004375
35829035317434717326932123578154982629742552737307
94953759765105305946966067683156574377167401875275
88902802571733229619176668713819931811048770190271
25267680276078003013678680992525463401061632866526
36270218540497705585629946580636237993140746255962
24074486908231174977792365466257246923322810917141
91430288197103288597806669760892938638285025333403
34413065578016127815921815005561868836468420090470
23053081172816430487623791969842487255036638784583
11487696932154902810424020138335124462181441773470
63783299490636259666498587618221225225512486764533
67720186971698544312419572409913959008952310058822
95548255300263520781532296796249481641953868218774
76085327132285723110424803456124867697064507995236
37774242535411291684276865538926205024910326572967
23701913275725675285653248258265463092207058596522
29798860272258331913126375147341994889534765745501
18495701454879288984856827726077713721403798879715
38298203783031473527721580348144513491373226651381
34829543829199918180278916522431027392251122869539
40957953066405232632538044100059654939159879593635
29746152185502371307642255121183693803580388584903
41698116222072977186158236678424689157993532961922
62467957194401269043877107275048102390895523597457
23189706772547915061505504953922979530901129967519
86188088225875314529584099251203829009407770775672
11306739708304724483816533873502340845647058077308
82959174767140363198008187129011875491310547126581
97623331044818386269515456334926366572897563400500
42846280183517070527831839425882145521227251250327
55121603546981200581762165212827652751691296897789
32238195734329339946437501907836945765883352399886
75506164965184775180738168837861091527357929701337
62177842752192623401942399639168044983993173312731
32924185707147349566916674687634660915035914677504
99518671430235219628894890102423325116913619626622
73267460800591547471830798392868535206946944540724
76841822524674417161514036427982273348055556214818
97142617910342598647204516893989422179826088076852
87783646182799346313767754307809363333018982642090
10848802521674670883215120185883543223812876952786
71329612474782464538636993009049310363619763878039
62184073572399794223406235393808339651327408011116
66627891981488087797941876876144230030984490851411
60661826293682836764744779239180335110989069790714
85786944089552990653640447425576083659976645795096
66024396409905389607120198219976047599490197230297
64913982680032973156037120041377903785566085089252
16730939319872750275468906903707539413042652315011
94809377245048795150954100921645863754710598436791
78639167021187492431995700641917969777599028300699
15368713711936614952811305876380278410754449733078
40789923115535562561142322423255033685442488917353
44889911501440648020369068063960672322193204149535
41503128880339536053299340368006977710650566631954
81234880673210146739058568557934581403627822703280
82616570773948327592232845941706525094512325230608
22918802058777319719839450180888072429661980811197
77158542502016545090413245809786882778948721859617
72107838435069186155435662884062257473692284509516
20849603980134001723930671666823555245252804609722
53503534226472524250874054075591789781264330331690

sum!

r: dup 10000000000 > [ 10 / r ] ? ;

r .


/* 5537376230 */`,Fn=`.import <prelude>

/* http://projecteuler.net/index.php?section=problems&id=14 */

_odd?: 1 & ;
2/: 1 >> ;

next-collatz: dup _odd? [ 3 * 1 + 2/ [ 2 + ] dip ] [ 2/ [++] dip ] branch ;
collatz: dup 1 > [ next-collatz collatz ] ? ;
collatz-count: 0 swap collatz drop ;

collatz-count-recur:
  1 - dup
  [
    dup _odd?
    [ ++ 2/ collatz-count-recur ++ ]
    [ 3 * 4 + 2/ collatz-count-recur 2 + ]
    branch
  ]
  ? ;

skip?: dup [ 3 % 2 = ] [ 6 % 4 = ] or_else ;

runn:
  skip? [++] ?  /* optional, skip some values */
  dup collatz-count
  [over] dip
  dup [<] dip swap
  [ q< q< drop2 q> q> over ]
  [drop]
  branch
;

step: dup 1_000_000 < [ . runn ++ step ] ? ;

/* Generates [ A006877 ] */

/* n count */
1 1 /* (use 1 1 to get full sequence) */
/* 77031 350 /* (head start) */
over ++
step
drop drop . /* 837799 */`,$n=`.import <prelude>

/* http://projecteuler.net/index.php?section=problems&id=16 */

digits: dup [ 10 [ % ] [ / ] bi2 digits ] ? ;

2 1000 ^ digits sum! . /* 1366 */`,Un=`!: dup 1 > [ dup 1 - ! * ] ? trim ;

trim: dup 10 % 0 = [ 10 / trim ] ? ;
five: 100_000 % ;

9 ! five . clr  /* 36288 */
10 ! five . clr  /* 36288 */
20 ! five . clr  /* 17664 */

1_000 ! trim five . clr /* 53472 */

/* Omitted: 1_000_000_000_000 ! … (expected [ 16576 ]) — factorial(10^12) is not practical here. */`,Wn=`.import <prelude>

/* http://projecteuler.net/index.php?section=problems&id=2 */

fib: dup2 + ;
fib-up: dup 4000000 < [ fib fib-up ] ? ;

1 2 fib-up drop
[ even? ] filter! sum! .

/* 4613732 */
`,jn=`.import <prelude>

/* http://projecteuler.net/index.php?section=problems&id=20 */

digits: dup [ 10 [ % ] [ / ] bi2 digits ] ? ;

100 ! digits sum! . /* 648 */
`,Hn=`.import <prelude>

/* http://projecteuler.net/index.php?section=problems&id=25 */

next: swap dupd + ;

c: q< q< ++ q> q> ;

n:
.m 10 1000 ^
;

r: c dup n < [ next r ] ? ;

0 1 1 r drop drop ++ . /* 4782 */`,Vn=`.import <prelude>

_trial_loop: dup2 [ dup * > ] [ % 0 > ] bi2 and [ next-prime _trial_loop ] ? ;
_trial_by_division: 5 _trial_loop dup * < ;

_factor_trial_loop: % 0 > [ next-prime _factor_trial_loop ] ? ;
_factor_trial_by_division: 2 _trial_loop nip ;

factors:
  dup 3 > [
    dup prime? not
    [
      dup _factor_trial_by_division swap over / factors
    ]
    ?
  ]
  ?
;

600851475143 factors last! . /* 6857 */`,Kn=`.import <prelude>

/* http://projecteuler.net/index.php?section=problems&id=4 */

_rev:
  over [
    swap 10 [ % ] [ / ] bi2
    rot 10 * +
    _rev
  ] [
    nip
  ] branch
;

rev: 0 _rev ;
palindrome?: dup rev = ;

_check_b:
  dup 99 > [
    over over * dup palindrome?
    [ rot drop2 ]
    [ drop -- _check_b ]
    branch
  ] [
    drop2 0
  ] branch
;

_check_a:
  dup 99 > [
    dup 999 _check_b
    swap -- _check_a
    max
  ] [
    drop 0
  ] branch
;

999 _check_a .

/* 906609 */
`,Qn=`.import <prelude>

check: /* n i */
  dup * 2 * -
  dup 0 >
  [
    prime?
    [ true ]
    [ next ]
    branch
  ]
  [ drop false ]
  branch
;

next:
  ++
  dup2
  check
;

goldbach-test: 0 next nip nip ;

1000 3000 range
[ 2 * 1 + ] map!
[
  [ prime? not ]
  [ goldbach-test not ]
  and_also
] filter!

head! . /* 5777 */
`,Gn=`.import <prelude>

/* http://projecteuler.net/index.php?section=problems&id=48 

The series, 1^1 + 2^2 + 3^3 + ... + 10^10 = 10405071317.

Find the last ten digits of the series, 1^1 + 2^2 + 3^3 + ... + 1000^1000.

*/

M:
.m 10 10 ^
; .inline

powm: [ ^ ] dip % ; .inline

/* (a+b) % c = ((a % c) + (b % c))% c */

0 1000 range [ dup M powm + ] reduce_l!
M %
.

/* 9110846700 */`,Xn=`.import <prelude>

/* http://projecteuler.net/index.php?section=problems&id=5 */

/* gcd and lcm come from prelude (math library). */

1 20 range [ lcm ] reduce! .

/* 232792560 */
`,Yn=`.import <prelude>

/* http://projecteuler.net/index.php?section=problems&id=5 */

sum-of-squares: [ sqr + ] 0 foldl! ;
square-of-sum: sum! sqr ;

100 count square-of-sum
( 100 count sum-of-squares ) - .

/* 25164150 */`,Zn=`.import <prelude>

/* Project Euler #7: find the 10001st prime. */
/* http://projecteuler.net/index.php?section=problems&id=7 */

10001 th-prime . /* 104743 */
`,Jn=`.import <prelude>

/* http://projecteuler.net/index.php?section=problems&id=8 */
/*
Find the greatest product of thirteen adjacent digits in the exact 1000-digit number.
The runtime tokenizer does not support multiline string literals, so this is a single token.
*/

convert-digits: [ '0' - ] map! ;

_p_loop: over [
  rot dup q< swap rot * swap -- swap
  _p_loop
  q> swap
] [ nip ] branch ;

_product13: 13 1 _p_loop ;

_collect:
  depth 12 > [
    _product13
    q<
    drop
    _collect
    q>
  ] ?
;

'7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450' convert-digits
_collect
987 [ max ] seq
q<
12 [ drop ] seq
q>
.

/* 23514624000 */
`,ne=`.import <prelude>

/* http://projecteuler.net/index.php?section=problems&id=9 */

_check_b:
  dup 500 >= [ drop false ] [
    /* num = 500000 - 1000*b, den = 1000 - b */
    dup 1000 * 500000 swap -
    over 1000 swap -

    /* if num % den == 0 then a = num / den */
    over over % 0 = [
      over over /
      rot drop2

      /* enforce a < b */
      dup2 > [
        over over + 1000 swap -
        * * . true
      ] [
        drop ++ _check_b
      ] branch
    ] [
      drop2 ++ _check_b
    ] branch
  ] branch
;

2 _check_b drop

/* 31875000 */
`,ee=`.import ../lib/math/ack.ffp
.import ../lib/string/string.ffp

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
`,te=`.import ../lib/math/cbrt.ffp

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
`,se=`.import ../lib/math/gcd.ffp

/* Greatest common divisor and least common multiple demo. */

109876463 177777648  gcd . clr /* 1234567 */

109876463 177777648  lcm . clr /* 15822210672 */
`,ie=`.import ../lib/math/atan.ffp

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
`,re=`.import <prelude>

/* Integer square root words from the standard library. */

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

0 0 nsqrt . clr
0 2 nsqrt . clr
1 2 nsqrt . clr
3 2 nsqrt . clr
2 81 nsqrt . clr
`,ae=`/* constants 1 2 3 */
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

empty?: depth zero? ; /* … empty? == … flag */
pushtop: depth 1 > [ swap [pushtop] dip ] ? ; /* … a pushtop == a … */

/* counters */

_loop: dup [ -- [ dup slip ] dip _loop ] ? ; /* a [B] n _loop == a b* n */
loop: _loop drop ; /* a [B] n loop == a b* [B] */

times: loop drop ; /* a [B] n times == a b* */
seq: swap times ; /* a n [B] seq == a b* */

range: over - [succ] seq ; /* a b range == a..b */
count: 0 swap ++ [succ] seq drop ; /* n count == 1..n */
`,oe=`.import ./num.ffp

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
`,pe=`.import ./pred.ffp

/* Unary operations */

sgn: dup positive? swap negitive? - ; .inline /* x sgn == sgn(x) */
abs: dup negitive? [ -1 * ] ? ; .inline /* x abs == |n| */
sqr: dup * ; /* x sqr == x² */

/* Ordering utilities */

min: sort2 drop ; .inline /* a b min == min */
max: sort2 nip ; .inline /* a b max == max */
clamp: dig max min ; .inline /* lo hi x clamp == x' */

/* Division utilities */

divrem: [ / ] [ % ] bi2 ; /* a b divrem == q r */
`,ce=`.import ./atan-shared.ffp

/*
 * Shared arctan Taylor core without pi-dependent range reduction.
 * This module exists so pi can depend on atan series terms without
 * introducing a circular import back through atan.ffp.
 */

__u2_newp: /* u² p q odd v² */
  [ atan_shared_over3 ] dip /* u² p q odd u² v² */
  dup
  [ [ dig [ * * ] dip ] dip * swap - ] dip /* u² q*v²-p*odd*u² v² */
; /* u² p q odd v² __u2_newp == u² p' v² */

__tail_loop:
  over positive?
  [
    over
    2 -
    [atan_shared_newq_stack] dip
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

__parts:
  atan_shared_odd_from_precision
  atan_shared_seed_taylor_state
  __tail_loop
  atan_shared_scale_tail_result
; /* n u v __parts == p q */

_atan__core_scaled:
  rot
  dup
  [ rot __parts ] dip
  p/q*S
; /* n u v _atan__core_scaled == ⌊10^n*atan(u/v)⌋ for reduced positive ratios */

_atan__needs_pi4:
  [ + sqr ] [ nip sqr 2 * ] bi2
  >
; /* u v _atan__needs_pi4 == u/v > tan(pi/8) for positive u <= v */
`,le=`.import ./arith.ffp
.import ./precision.ffp

/*
 * Shared helpers for the atan / atanh family wrappers and Taylor cores.
 */

atan_shared_over3: [ [ over ] dip ] dip dig ; /* x a b c atan_shared_over3 == x a b c x */

atan_shared_odd_prev: 2 * 1 - ; .inline /* n atan_shared_odd_prev == 2n-1 */
atan_shared_odd_next: 2 * 1 + ; .inline /* n atan_shared_odd_next == 2n+1 */
atan_shared_sqr_keep2: over sqr over sqr ; /* a b atan_shared_sqr_keep2 == a b a² b² */

atan_shared_newq_stack: /* p q odd v² */
  dup [ [ dup2 ] dip * * ] dip /* p q odd q*odd*v² v² */
; /* p q odd v² atan_shared_newq_stack == p q odd q' v² */

atan_shared_odd_from_precision:
  rot
  n->K
  swapd
; .inline /* n u v atan_shared_odd_from_precision == u v odd */

atan_shared_seed_taylor_state: /* u v odd */
  dup                                            /* u v odd odd */
  atan_shared_odd_next                           /* u v odd (2*odd+1) */
  [ atan_shared_odd_prev [ atan_shared_sqr_keep2 ] dip ] dip /* u v u² v² (2*odd-1) (2*odd+1) */
  rot                                            /* u v u² (2*odd+1) (2*odd-1) v² */
  1                                              /* u v u² (2*odd+1) (2*odd-1) v² 1 */
  bury                                           /* u v u² (2*odd+1) 1 (2*odd-1) v² */
  [ swapd ] dip                                  /* u v u² 1 (2*odd+1) (2*odd-1) v² */
; /* u v odd atan_shared_seed_taylor_state == u v u2 p q odd v2 */

atan_shared_mul2_pairs: * [ * ] dip ; .inline /* a b c d atan_shared_mul2_pairs == a*b c*d */

atan_shared_scale_tail_result:
  swapd
  atan_shared_mul2_pairs
; .inline /* u v p q atan_shared_scale_tail_result == p q */

atan_shared_num_zero:
  drop2 drop 0
; /* n u v (u == 0) atan_shared_num_zero == 0 */

atan_shared_abs_pair: abs swap abs swap ; .inline /* u v atan_shared_abs_pair == |u| |v| */
atan_shared_sign_pair_product: dup2 * sgn ; /* u v atan_shared_sign_pair_product == u v sgn(u*v) */
`,ue=`.import ./atan-shared.ffp
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

__den_zero:            /* n u v */
  drop                 /* n u */
  sgn                  /* n sgn(u) */
  [ npi 2 / ] dip      /* ⌊π/2*10ⁿ⌋ sgn(u) */
*                      /* ⌊π/2*10ⁿ⌋*sgn(u) */
; /* n u v (v == 0) __den_zero == sign(u)*⌊π/2*10ⁿ⌋ */

__quarter_pi: half_pi 2 / ; /* n __quarter_pi == ⌊10ⁿ*π/4⌋ */
__diff_sum: [ - ] [ + ] bi2 ; /* u v __diff_sum == u-v u+v */

__atan_pos_scaled:
  dup2 >
  [                                /* n u v */
    [ dup half_pi swap ] dipd    /* ⌊10ⁿ*π/2⌋ n u v */
    swap                           /* ⌊10ⁿ*π/2⌋ n v u */
    _atan__scaled                  /* ⌊10ⁿ*π/2⌋ ⌊10ⁿ*atan(v/u)⌋₀ */
    -                              /* ⌊10ⁿ*π/2⌋-⌊10ⁿ*atan(v/u)⌋₀ */
  ]
  [
    dup2 _atan__needs_pi4
    [                                  /* n u v */
      swap                             /* n v u */
      __diff_sum                       /* n (v-u) (v+u) */
      [ dup __quarter_pi swap ] dipd   /* ⌊10ⁿ*π/4⌋ n (v-u) (v+u) */
      _atan__scaled                    /* ⌊10ⁿ*π/4⌋ ⌊10ⁿ*atan((v-u)/(v+u))⌋₀ */
      -                                /* ⌊10ⁿ*π/4⌋-⌊10ⁿ*atan((v-u)/(v+u))⌋₀ */
    ]
    [_atan__core_scaled]
    branch
  ]
  branch
; /* n u v (u,v > 0) __atan_pos_scaled == ⌊10ⁿ*atan(u/v)⌋ */

__finite:
  atan_shared_sign_pair_product
  [ atan_shared_abs_pair __atan_pos_scaled ] dip
  *
; /* n u v (u,v != 0) __finite == signed scaled atan(u/v) */

_atan__scaled:
  over zero?
  [ atan_shared_num_zero ]
  [
    dup zero?
    [ __den_zero ]
    [ __finite ]
    branch
  ]
  branch
; /* n u v _atan__scaled == ⌊10ⁿ*atan(u/v)⌋₀ */

iatan: 0 swap 1 _atan__scaled ; /* x iatan == ⌊atan(x)⌋₀ */
natan: 1 _atan__scaled ; /* n x natan == ⌊10ⁿ*atan(x)⌋₀ */
qatan: 0 bury _atan__scaled ; /* u v qatan == ⌊atan(u/v)⌋₀ */
atan-inv: 1 swap _atan__scaled ; /* n x atan-inv == ⌊10ⁿ*atan(1/x)⌋₀ */
`,de=`.import ./atan-shared.ffp

/*
 * Shared artanh Taylor core without log-dependent range reduction.
 *
 * Public contract:
 *   n u v _atanh__core_scaled -- ⌊10^n*atanh(u/v)⌋
 *
 * for reduced positive ratios satisfying 0 <= u < v.
 */

__u2_newp: /* u² p q odd v² */
  [ atan_shared_over3 ] dip /* u² p q odd u² v² */
  dup
  [ [ dig [ * * ] dip ] dip * swap + ] dip /* u² q*v²+p*odd*u² v² */
; /* u² p q odd v² __u2_newp == u² p' v² */

__tail_loop:
  over positive?
  [
    over
    2 -
    [atan_shared_newq_stack] dip
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

__parts:
  atan_shared_odd_from_precision
  atan_shared_seed_taylor_state
  __tail_loop
  atan_shared_scale_tail_result
; /* n u v __parts == p q */

_atanh__core_scaled:
  rot
  dup
  [ rot __parts ] dip
  p/q*S
; /* n u v _atanh__core_scaled == ⌊10^n*atanh(u/v)⌋ for reduced positive ratios */
`,he=`.import ./atan-shared.ffp
.import ./atanh-core.ffp

/*
 * Artanh utilities using precision helpers and rational Taylor parts.
 *
 * Words:
 *   iatanh    ( x -- y )
 *   natanh    ( n x -- y )
 *   qatanh    ( u v -- y )
 *   atanh-inv ( n x -- y )
 */

__atanh_pos_scaled:
  _atanh__core_scaled
; /* n u v (u,v > 0 and u < v) __atanh_pos_scaled == ⌊10ⁿ*atanh(u/v)⌋ */

__finite:
  atan_shared_sign_pair_product
  [ atan_shared_abs_pair __atanh_pos_scaled ] dip
  *
; /* n u v (u,v != 0) __finite == signed scaled atanh(u/v) */

_atanh__scaled:
  over zero?
  [ atan_shared_num_zero ]
  [ __finite ]
  branch
; /* n u v _atanh__scaled == ⌊10ⁿ*atanh(u/v)⌋₀ for |u| < |v| */

iatanh: 0 swap 1 _atanh__scaled ; /* x iatanh == ⌊atanh(x)⌋₀ */
natanh: 1 _atanh__scaled ; /* n x natanh == ⌊10ⁿ*atanh(x)⌋₀ */
qatanh: 0 bury _atanh__scaled ; /* u v qatanh == ⌊atanh(u/v)⌋₀ */
atanh-inv: 1 swap _atanh__scaled ; /* n x atanh-inv == ⌊10ⁿ*atanh(1/x)⌋₀ */
`,_e=`.import ./arith.ffp

/*
 * Naming note: the \`i\` prefix means integer.
 * \`icbrt\` returns the integer cube root (truncated toward zero).
 */

__closer: dup2 2 ^ / over 2 * + 3 / ;
__loop: __closer dup2 > [ nip __loop ] ? ;
__cbrtn: dup 3 / __loop drop nip ;

icbrt: dup sgn swap over * dup 1 > [ __cbrtn ] ? * ; /* x icbrt == ⌊cbrt(x)⌋₀ */
`,fe=`
.import ../core/core.ff
.import ./gcd.ffp
.import ./precision.ffp
.import ./arith.ffp

__n: 150 ; /* fixed digits used by the fast iexp special case */
__e: 2718281828459045235360287471352662497757247093699959574966967627724076630353547594571382178525166427427466391932003059921817413596629043572900334295260 ; /* ⌊e*10^__n⌋ */
__terms: 20 + n->K ; /* n __terms == ceil(6*(n+20)/5)+10 */

/*
 * This helper assumes primitive integer division truncates toward zero.
 * Negative odd values need one extra decrement to behave like ⌊x/2⌋.
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
; /* x __floor_half == ⌊x/2⌋ */

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
; /* x iexp == ⌊eˣ⌋ */

nexp:
  swap dup q< swap
  1 __parts
  q> p/q*S
; /* n x nexp == ⌊10ⁿ*eˣ⌋ */

ncosh:
  [ nexp ] [ -1 * nexp ] bi2
  +
  2 /
; /* n x ncosh == ⌊(nexp(n,x)+nexp(n,-x))/2⌋ */

nsinh:
  [ nexp ] [ -1 * nexp ] bi2
  -
  __floor_half
; /* n x nsinh == ⌊(nexp(n,x)-nexp(n,-x))/2⌋ */

icosh: 0 swap ncosh ; /* x icosh == ⌊cosh(x)⌋ via first-pass nexp wrapper */
isinh: 0 swap nsinh ; /* x isinh == ⌊sinh(x)⌋ via first-pass nexp wrapper */
`,me=`.import ../core/core.ff

__t: tuck % dup [ __t ] ? ;

gcd: dup [ __t ] ? drop ;
lcm: dup2 gcd / * ;
`,ge=`.import ../core/core.ff
.import ./atanh.ffp

__n: 20 ; /* number of digits to use for fixed-point calculations */
__s: 100000000000000000000 ; /* 10^n */
__ln2: 69314718055994530941 ; /* ⌊ln(2)*10^n⌋ */

nln2:
  ++
  3 atanh-inv
  2 *
  10 /
; /* n nln2 == ⌊10^n*ln(2)⌋ */

ilb: dup 1 > [ 1 >> ilb ++ ] [ drop 0 ] branch ; /* x ilb == ⌊log2(x)⌋ */
ilog: dup 10 >= [ 10 / ilog ++ ] [ drop 0 ] branch ; /* x ilog == ⌊log10(x)⌋ */
iln: ilb __ln2 * __s / ; /* x iln == ⌊ln(x)⌋ */
`,be=`.import ./pred.ffp
.import ./arith.ffp
.import ./num.ffp
.import ./atan.ffp
.import ./atanh.ffp
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
`,ve=`.import ../core/core.ff

/* Logarithm and combinatorics */

!: dup [ dup -- ! * ] [ drop 1 ] branch ; /* n ! == n! */
nck: dup2 - ! swap ! * [ ! ] dip / ; /* n k nck == C(n,k) */

/* Knuth operators */

^^: -- dup [ [ dup ] swap times [ ^ ] ] dip times ;
^^^: -- dup [ [ dup ] swap times [ ^^ ] ] dip times ;
`,we=`.import ./atan-core.ffp

__guard_digits: 20 ;


/* n -> ⌊π*10ⁿ⌋ */
npi:
  __guard_digits +
  dup 1 5 _atan__core_scaled
  swap 1 239 _atan__core_scaled
  swap 4 * swap -
  4 *
  __guard_digits n->S /
; /* n _npi__ == ⌊10ⁿ*π⌋ */

tau:
  1 + npi 5 /
; /* n tau == ⌊10ⁿ*2*π⌋ */

half_pi:
  npi 1 >>
; /* n half_pi == ⌊10ⁿ*π/2⌋ */
`,ye=`.import ../core/core.ff
.import ./arith.ffp

/* Internal precision helpers shared by variable-precision math words. */
n->S: 10 swap ^ ; /* n n->S == 10ⁿ */
n->S2: 2 * n->S ; /* n n->S2 == 10²ⁿ */
n->K: 6 * 4 + 5 / 10 + ; /* n n->K == ⌈6*n/5⌉+10 */
p/q*S: n->S swap rot * swap / ; /* p q n p/q*S == ⌊p*10ⁿ/q⌋₀ */

ntrunc: n->S / ; /* x n ntrunc == ⌊x/10ⁿ⌋₀ */
nfrac: [ abs ] dip n->S % ; /* x n nfrac == (x - ⌊x/10ⁿ⌋₀)*10ⁿ */
`,xe=`.import ../core/core.ff

/* Predicates */

negitive?: 0 < ; /* n negitive? == flag */
positive?: 0 > ; /* n positive? == flag */
divisor?: % zero? ; .inline /* n d divisor? == flag */
even?: 2 divisor? ; .inline /* n even? == flag */
odd?: even? not ; .inline /* n odd? == flag */
`,qe=`.import ./pred.ffp

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
`,Se=`.import ../core/core.ff
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
`,ke=`.import ../core/core.ff
.import ./precision.ffp

/* Exact integer square root via recursive digit-by-digit refinement. */
__base: 2 >> __next 1 << ; /* n __base == 2*sqrt(n/4) */

__pick:
  dup ++ dup * /* n x (x+1)² */
  dig /* x (x+1)² n */
  <=
  [ ++ ] /* x+1 */
  ? /* else x */
; /* n x __pick == ⌊sqrt(n)⌋ */

__next:
  dup 1 > [ /* n if n < 2 */
    dup /* n n */
    __base
    __pick
  ] ?
;

/* x -- ⌊sqrt(x)⌋ | errors on negative x (division by zero) */
isqrt:
  dup 0 < [ 1 0 / ] ? /* error: negative input */
  __next ;

/* x -- ⌊sqrt(x)⌋ x-⌊sqrt(x)⌋² */
isqrtrem: dup isqrt tuck 2 ^ - ;

/* n x -- ⌊10ⁿ*sqrt(x)⌋ | errors on negative x (division by zero) */
nsqrt:
  dup 0 < [ 1 0 / ] ? /* error: negative input */
  swap n->S2 * isqrt
;
`,Ee=`/* Trigonometric words live here. Pi-derived constants are defined in pi.ffp. */
`,Te=`.import ./core/core.ff
.import ./math/math.ffp
.import ./string/string.ffp
.import ./seq/seq.ffp
.import ./time/time.ffp`,Ae=`.import ../core/core.ff

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
`,Pe=`.import ../core/core.ff

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
`,Ie=`/* String output */

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
`,Ce=`.import char.ffp
.import str.ffp`,Re=`.import ./core/core.ff
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
`,Oe=`.import ./core/core.ff
.import ./string/string.ffp

assert: falsey? [ 0 10 'Failed' println .inline 1 exit ] ? ;
assert_eq: = assert .inline ;
assert_false: not assert .inline ;

OK: 0 '\\sOK' println clr ;

¶: clr 999 ;`,De=`.import ./utc.ffp
`,Be=`.import ../core/core.ff
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
`,ze=`.import <prelude>

/* factorial */

fact: dup [ dup -- fact * ] [ drop 1 ] branch ;

100 fact .

/* 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000 */`;const Ne=new Set(["../../../ff/euler/euler4.ffp","../../../ff/euler/euler10.ffp","../../../ff/euler/euler14.ffp","../../../ff/euler/euler46.ffp"]);function Me(s){const n="/ff/lib/",e=s.indexOf(n);if(e===-1)throw new Error(`Unexpected library source path: ${s}`);return`/lib/${s.slice(e+n.length)}`}const Le=Object.assign({"../../../ff/euler/euler1.ffp":Nn,"../../../ff/euler/euler10.ffp":Mn,"../../../ff/euler/euler13.ffp":Ln,"../../../ff/euler/euler14.ffp":Fn,"../../../ff/euler/euler16.ffp":$n,"../../../ff/euler/euler160.ffp":Un,"../../../ff/euler/euler2.ffp":Wn,"../../../ff/euler/euler20.ffp":jn,"../../../ff/euler/euler25.ffp":Hn,"../../../ff/euler/euler3.ffp":Vn,"../../../ff/euler/euler4.ffp":Kn,"../../../ff/euler/euler46.ffp":Qn,"../../../ff/euler/euler48.ffp":Gn,"../../../ff/euler/euler5.ffp":Xn,"../../../ff/euler/euler6.ffp":Yn,"../../../ff/euler/euler7.ffp":Zn,"../../../ff/euler/euler8.ffp":Jn,"../../../ff/euler/euler9.ffp":ne}),Fe=Object.assign({"../../../ff/examples/ack.ffp":ee,"../../../ff/examples/cbrt.ffp":te,"../../../ff/examples/gcd.ffp":se,"../../../ff/examples/pi.ffp":ie,"../../../ff/examples/sqrt.ffp":re});function G(s){const n=s.split("/").pop()??s,e=/^euler(\d+)\.ffp$/.exec(n);return e?[Number(e[1]),n]:[Number.POSITIVE_INFINITY,n]}const $e=Object.entries(Le).filter(([s])=>!Ne.has(s)).sort((s,n)=>{const e=G(s[0]),t=G(n[0]);return e[0]!==t[0]?e[0]-t[0]:e[1].localeCompare(t[1])}).map(([s,n])=>({path:X(s),label:We(s),source:n})),Ue=Object.entries(Fe).sort((s,n)=>s[0].localeCompare(n[0])).map(([s,n])=>({path:X(s),label:je(s),source:n}));function X(s){const n=s.lastIndexOf("/");return`/examples/${n>=0?s.slice(n+1):s}`}function We(s){const n="/ff/",e=s.indexOf(n);return e>=0?s.slice(e+n.length):s}function je(s){const n=s.lastIndexOf("/");return n>=0?s.slice(n+1):s}const He=[{path:"/examples/fact.ffp",label:"fact.ffp",source:ze},...Ue,...$e],Ve=Object.fromEntries(Object.entries(Object.assign({"../../../ff/lib/core/core.ff":ae,"../../../ff/lib/math/ack.ffp":oe,"../../../ff/lib/math/arith.ffp":pe,"../../../ff/lib/math/atan-core.ffp":ce,"../../../ff/lib/math/atan-shared.ffp":le,"../../../ff/lib/math/atan.ffp":ue,"../../../ff/lib/math/atanh-core.ffp":de,"../../../ff/lib/math/atanh.ffp":he,"../../../ff/lib/math/cbrt.ffp":_e,"../../../ff/lib/math/exp.ffp":fe,"../../../ff/lib/math/gcd.ffp":me,"../../../ff/lib/math/log.ffp":ge,"../../../ff/lib/math/math.ffp":be,"../../../ff/lib/math/num.ffp":ve,"../../../ff/lib/math/pi.ffp":we,"../../../ff/lib/math/precision.ffp":ye,"../../../ff/lib/math/pred.ffp":xe,"../../../ff/lib/math/primes.ffp":qe,"../../../ff/lib/math/prn.ffp":Se,"../../../ff/lib/math/sqrt.ffp":ke,"../../../ff/lib/math/trig.ffp":Ee,"../../../ff/lib/prelude.ffp":Te,"../../../ff/lib/seq/seq.ffp":Ae,"../../../ff/lib/string/char.ffp":Pe,"../../../ff/lib/string/str.ffp":Ie,"../../../ff/lib/string/string.ffp":Ce,"../../../ff/lib/tap.ffp":Re,"../../../ff/lib/testing.ffp":Oe,"../../../ff/lib/time/time.ffp":De,"../../../ff/lib/time/utc.ffp":Be})).map(([s,n])=>[Me(s),n])),Ke=Object.fromEntries(He.map(({path:s,source:n})=>[s,n]));function Qe(s,n="/main.ffp"){return{[n]:s,...Ve,...Ke}}function y(s){const n=s.startsWith("/"),e=s.split("/").filter(Boolean),t=[];for(const i of e)if(i!=="."){if(i===".."){t.pop();continue}t.push(i)}return`${n?"/":""}${t.join("/")}`||(n?"/":".")}function Ge(s){const n=y(s),e=n.lastIndexOf("/");return e<=0?n.startsWith("/")?"/":".":n.slice(0,e)}function Xe(...s){const n=s.filter(Boolean).join("/").replaceAll(/\/+/g,"/");return y(n)}function Ye(s,n){const e=y(s).split("/").filter(Boolean),t=y(n).split("/").filter(Boolean);let i=0;for(;i<e.length&&i<t.length&&e[i]===t[i];)i++;const a=e.length-i,o=t.slice(i);return Array(a).fill("..").concat(o).join("/")||"."}function Ze(s){return{readTextFile(n){const e=y(n),t=s[e];if(typeof t!="string")throw new Error(`Virtual file not found: ${e}`);return t},fileExists(n){return typeof s[y(n)]=="string"},directoryExists(n){const e=y(n).replace(/\/+$/,""),t=e==="/"?"/":`${e}/`;return Object.keys(s).some(i=>i.startsWith(t))},realpath(n){return y(n)},path:{isAbsolute(n){return n.startsWith("/")},dirname:Ge,relative:Ye,resolve:Xe}}}function Je(s={}){const n=new TextDecoder,e=new TextEncoder,t=Array.from(e.encode(s.stdin??""));return{io:{write(i){s.onWrite?.(n.decode(i))},readByte(){return t.shift()??null}},exit(i){s.onExit?.(i)},now(){return Date.now()}}}const nt="/main.ffp",et=["/lib"];function tt(s){return An.length+s.length}function Y(s,n){const e=console.log;console.log=(...t)=>{s(t.map(String).join(" "))};try{return n()}finally{console.log=e}}async function st(s,n){const e=console.log;console.log=(...t)=>{s(t.map(String).join(" "))};try{return await n()}finally{console.log=e}}function it(s,n,e={}){let t="";const i=[];let a=0;const o=e.filename??nt,p=Je({stdin:n,onWrite(A){t+=A},onExit(A){a=A}}),l=new g,c=new Q(p),u=new g,_=new Q(p),m=Qe(s,o),T=new x(Ze(m),{engine:_,compiler:u},{macroEngineBootstrapFile:"<prelude>",stdlibRoots:et});return{compiler:l,engine:c,preprocessor:T,filename:o,logs:i,getOutput(){return t},getExitCode(){return a}}}function rt(s,n,e,t={}){const i=it(s,n,t),a=performance.now(),o=Y(l=>i.logs.push(l),()=>{const l=i.preprocessor.preprocess(x.tokenize(s),i.filename);let c=i.compiler.compileToIR(g.tokenize(l),i.filename);const u=i.compiler.validate(c);e&&(c=new zn().optimize(c));const _=_n(c),m=g.compileToBase64(c),T=tt(m);return i.engine.loadIR(c),{preprocessed:l,formattedIr:_,bytecode:m,compiledBytes:T,issues:u}}),p=performance.now();return{preprocessed:o.preprocessed,ir:o.formattedIr,bytecode:o.bytecode,compiledBytes:o.compiledBytes,issues:o.issues,compileMs:p-a,execute(){const l=performance.now();Y(u=>i.logs.push(u),()=>{i.engine.run()});const c=performance.now();return{output:i.getOutput(),stack:i.engine.getStack().map(String),logs:[...i.logs],exitCode:i.getExitCode(),executeMs:c-l,cancelled:!1,vmCyclesExecuted:0}},async executeAsync(l={}){const c=performance.now(),u=await st(m=>i.logs.push(m),async()=>await i.engine.runAsync(l)),_=performance.now();return{output:i.getOutput(),stack:i.engine.getStack().map(String),logs:[...i.logs],exitCode:i.getExitCode(),executeMs:_-c,cancelled:u.cancelled,vmCyclesExecuted:u.vmCyclesExecuted}}}}function O(s){self.postMessage(s)}let F=!1,v=null;function at(s,n){const e=n.cancelled?"cancelled":"done";return{output:n.output,preprocessed:s.preprocessed,ir:s.ir,bytecode:s.bytecode,compiledBytes:s.compiledBytes,issues:s.issues,stack:n.stack,logs:n.logs,exitCode:n.exitCode,compileMs:s.compileMs,executeMs:n.executeMs,terminal:e,vmCyclesExecuted:n.vmCyclesExecuted}}self.onmessage=s=>{const n=s.data;if(n.type==="CANCEL"){v===n.runId&&(F=!0);return}if(n.type!=="RUN")return;const{runId:e,source:t,stdin:i,optimize:a,filename:o,yieldIntervalMs:p,yieldSliceMax:l}=n;(async()=>{F=!1,v=e;try{const c=rt(t,i,a,{filename:o});if(v!==e)return;O({type:"COMPILED",runId:e,compileMs:c.compileMs,preprocessed:c.preprocessed,ir:c.ir,bytecode:c.bytecode,compiledBytes:c.compiledBytes});const u=performance.now(),_=await c.executeAsync({yieldIntervalMs:p,yieldSliceMax:l,shouldContinue:()=>!F&&v===e,onChunk:({vmCyclesExecuted:m})=>{v===e&&O({type:"PROGRESS",runId:e,vmCyclesExecuted:m,executeElapsedMs:performance.now()-u})},scheduler:()=>new Promise(m=>{globalThis.setTimeout(m,0)})});if(v!==e)return;O({type:"RESULT",runId:e,result:at(c,_)})}catch(c){if(v!==e)return;const u=c instanceof Error?c.message:String(c);O({type:"ERROR",runId:e,message:u})}finally{v===e&&(v=null)}})()}})();
