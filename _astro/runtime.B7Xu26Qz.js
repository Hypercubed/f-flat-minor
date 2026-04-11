import{R as q}from"./run-feedback.Ug3xFfrM.js";const tt=globalThis,ot=i=>i,j=tt.trustedTypes,rt=j?j.createPolicy("lit-html",{createHTML:i=>i}):void 0,bt="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,yt="?"+y,It=`<${yt}>`,k=document,M=()=>k.createComment(""),z=i=>i===null||typeof i!="object"&&typeof i!="function",nt=Array.isArray,Rt=i=>nt(i)||typeof i?.[Symbol.iterator]=="function",G=`[ 	
\f\r]`,N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pt=/-->/g,ct=/>/g,A=RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),lt=/'/g,dt=/"/g,wt=/^(?:script|style|textarea|title)$/i,Bt=i=>(t,...n)=>({_$litType$:i,strings:t,values:n}),In=Bt(1),L=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),ht=new WeakMap,S=k.createTreeWalker(k,129);function xt(i,t){if(!nt(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return rt!==void 0?rt.createHTML(t):t}const Dt=(i,t)=>{const n=i.length-1,e=[];let s,o=t===2?"<svg>":t===3?"<math>":"",a=N;for(let p=0;p<n;p++){const c=i[p];let d,l,h=-1,f=0;for(;f<c.length&&(a.lastIndex=f,l=a.exec(c),l!==null);)f=a.lastIndex,a===N?l[1]==="!--"?a=pt:l[1]!==void 0?a=ct:l[2]!==void 0?(wt.test(l[2])&&(s=RegExp("</"+l[2],"g")),a=A):l[3]!==void 0&&(a=A):a===A?l[0]===">"?(a=s??N,h=-1):l[1]===void 0?h=-2:(h=a.lastIndex-l[2].length,d=l[1],a=l[3]===void 0?A:l[3]==='"'?dt:lt):a===dt||a===lt?a=A:a===pt||a===ct?a=N:(a=A,s=void 0);const v=a===A&&i[p+1].startsWith("/>")?" ":"";o+=a===N?c+It:h>=0?(e.push(d),c.slice(0,h)+bt+c.slice(h)+y+v):c+y+(h===-2?p:v)}return[xt(i,o+(i[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),e]};class F{constructor({strings:t,_$litType$:n},e){let s;this.parts=[];let o=0,a=0;const p=t.length-1,c=this.parts,[d,l]=Dt(t,n);if(this.el=F.createElement(d,e),S.currentNode=this.el.content,n===2||n===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=S.nextNode())!==null&&c.length<p;){if(s.nodeType===1){if(s.hasAttributes())for(const h of s.getAttributeNames())if(h.endsWith(bt)){const f=l[a++],v=s.getAttribute(h).split(y),x=/([.?@])?(.*)/.exec(f);c.push({type:1,index:o,name:x[2],strings:v,ctor:x[1]==="."?Ot:x[1]==="?"?Mt:x[1]==="@"?zt:Q}),s.removeAttribute(h)}else h.startsWith(y)&&(c.push({type:6,index:o}),s.removeAttribute(h));if(wt.test(s.tagName)){const h=s.textContent.split(y),f=h.length-1;if(f>0){s.textContent=j?j.emptyScript:"";for(let v=0;v<f;v++)s.append(h[v],M()),S.nextNode(),c.push({type:2,index:++o});s.append(h[f],M())}}}else if(s.nodeType===8)if(s.data===yt)c.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(y,h+1))!==-1;)c.push({type:7,index:o}),h+=y.length-1}o++}}static createElement(t,n){const e=k.createElement("template");return e.innerHTML=t,e}}function R(i,t,n=i,e){if(t===L)return t;let s=e!==void 0?n._$Co?.[e]:n._$Cl;const o=z(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(i),s._$AT(i,n,e)),e!==void 0?(n._$Co??=[])[e]=s:n._$Cl=s),s!==void 0&&(t=R(i,s._$AS(i,t.values),s,e)),t}class Nt{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:e}=this._$AD,s=(t?.creationScope??k).importNode(n,!0);S.currentNode=s;let o=S.nextNode(),a=0,p=0,c=e[0];for(;c!==void 0;){if(a===c.index){let d;c.type===2?d=new U(o,o.nextSibling,this,t):c.type===1?d=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(d=new Lt(o,this,t)),this._$AV.push(d),c=e[++p]}a!==c?.index&&(o=S.nextNode(),a++)}return S.currentNode=k,s}p(t){let n=0;for(const e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(t,e,n),n+=e.strings.length-2):e._$AI(t[n])),n++}}class U{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,e,s){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=e,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=R(this,t,n),z(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==L&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Rt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){const{values:n,_$litType$:e}=t,s=typeof e=="number"?this._$AC(t):(e.el===void 0&&(e.el=F.createElement(xt(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===s)this._$AH.p(n);else{const o=new Nt(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=ht.get(t.strings);return n===void 0&&ht.set(t.strings,n=new F(t)),n}k(t){nt(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let e,s=0;for(const o of t)s===n.length?n.push(e=new U(this.O(M()),this.O(M()),this,this.options)):e=n[s],e._$AI(o),s++;s<n.length&&(this._$AR(e&&e._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){const e=ot(t).nextSibling;ot(t).remove(),t=e}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,e,s,o){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=m}_$AI(t,n=this,e,s){const o=this.strings;let a=!1;if(o===void 0)t=R(this,t,n,0),a=!z(t)||t!==this._$AH&&t!==L,a&&(this._$AH=t);else{const p=t;let c,d;for(t=o[0],c=0;c<o.length-1;c++)d=R(this,p[e+c],n,c),d===L&&(d=this._$AH[c]),a||=!z(d)||d!==this._$AH[c],d===m?t=m:t!==m&&(t+=(d??"")+o[c+1]),this._$AH[c]=d}a&&!s&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ot extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}}class Mt extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}}class zt extends Q{constructor(t,n,e,s,o){super(t,n,e,s,o),this.type=5}_$AI(t,n=this){if((t=R(this,t,n,0)??m)===L)return;const e=this._$AH,s=t===m&&e!==m||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,o=t!==m&&(e===m||s);s&&this.element.removeEventListener(this.name,this,e),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Lt{constructor(t,n,e){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(t){R(this,t)}}const Ft=tt.litHtmlPolyfillSupport;Ft?.(F,U),(tt.litHtmlVersions??=[]).push("3.3.2");const Rn=(i,t,n)=>{const e=t;let s=e._$litPart$;return s===void 0&&(e._$litPart$=s=new U(t.insertBefore(M(),null),null,void 0,{})),s._$AI(i),s};let ut=null;function Ut(){return ut??=new AudioContext,ut}const _t=[329.6275569128699,391.99543598174927,493.8833013781249],Ht=10,Wt=420,Kt=3;let K=null,V=null,X=!1;function Z(){K!==null&&(clearInterval(K),K=null),V=null}function Bn(i){if(Z(),!q.enabled||(X=!0,window.matchMedia("(prefers-reduced-motion: reduce)").matches))return;V=i;const t=()=>{if(!q.enabled){Z();return}V&&jt(V,Kt)};t(),K=setInterval(t,Wt)}function Dn(){const i=X;X=!1,Z(),i&&At()}function At(){if(q.enabled)try{const i=Ut();i.resume().then(()=>{const t=i.currentTime,n=.42,e=.09;for(let s=0;s<_t.length;s++){const o=_t[s],a=i.createOscillator(),p=i.createGain();a.type="triangle",a.frequency.setValueAtTime(o,t),p.gain.setValueAtTime(0,t),p.gain.linearRampToValueAtTime(e,t+.018+s*.012),p.gain.exponentialRampToValueAtTime(8e-4,t+n),a.connect(p),p.connect(i.destination),a.start(t),a.stop(t+n+.06)}})}catch{}}function St(i){return!(i.isComposing||i.metaKey||i.ctrlKey||i.altKey||i.key==="Tab"||i.key==="Escape"||i.key==="ArrowUp"||i.key==="ArrowDown"||i.repeat)}function Nn(i,t){if(!q.enabled||i.disabled||!St(t))return;const{x:n,y:e}=Vt(i);et(n,e,{centerOnPoint:!0}),t.key==="Enter"&&At()}function On(i,t){if(!q.enabled||!St(t))return;const n=i.state.selection.main.head,e=i.coordsAtPos(n);if(!e)return;const s=e.left,o=(e.top+e.bottom)/2;et(s,o,{centerOnPoint:!0})}function Vt(i){const t=i.getBoundingClientRect(),n=window.getComputedStyle(i),e=parseFloat(n.borderLeftWidth)||0,s=parseFloat(n.paddingLeft)||0,o=i.selectionStart??0,a=document.createElement("span");a.setAttribute("aria-hidden","true"),a.style.visibility="hidden",a.style.position="absolute",a.style.whiteSpace="pre",a.style.top="0",a.style.left="0",a.style.font=n.font,a.style.fontSize=n.fontSize,a.style.fontFamily=n.fontFamily,a.style.fontWeight=n.fontWeight,a.style.letterSpacing=n.letterSpacing,a.style.fontVariant=n.fontVariant,a.style.textTransform=n.textTransform,a.textContent=i.value.slice(0,o),document.body.appendChild(a);const p=a.offsetWidth;a.remove();const c=t.left+e+s+p-i.scrollLeft,d=t.top+t.height/2;return{x:c,y:d}}function et(i,t,n){if(!q.enabled||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.createElement("span");e.className="run-flat-anchor",e.style.left=`${i}px`,e.style.top=`${t}px`,n?.centerOnPoint&&(e.style.transform="translate(-50%, -50%)");const s=document.createElement("span");s.className="run-flat-particle",s.setAttribute("aria-hidden","true"),s.textContent="♭",n?.animationDelay&&(s.style.animationDelay=n.animationDelay);const o=(Math.random()-.5)*2.25,a=-6+Math.random()*12,p=a+8+Math.random()*10;s.style.setProperty("--drift-x",`${o}rem`),s.style.setProperty("--rot-0",`${a}deg`),s.style.setProperty("--rot-1",`${p}deg`),e.appendChild(s),document.body.appendChild(e),s.addEventListener("animationend",()=>{e.remove()},{once:!0})}function jt(i,t=Ht){if(!q.enabled||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const n=i.getBoundingClientRect();if(!(n.width<=0||n.height<=0))for(let e=0;e<t;e++){const s=n.left+Math.random()*n.width,o=n.top+n.height*(.35+Math.random()*.35);et(s,o,{animationDelay:`${e*.045}s`})}}function Qt(){return!!(globalThis.Deno?.stdout?.isTerminal?.()??globalThis.process?.stdout?.isTTY??!1)}function st(i,t){return Qt()?`\x1B[${i}m${t}\x1B[0m`:t}function Gt(i){return st(34,i)}function Yt(i){return st(32,i)}function b(i){return st(36,i)}const r={NOP:0,CALL:1,PUTC:2,GETC:3,PUTN:5,CLOCK:6,DROP:8,PUSHR:14,PULLR:15,SHIFTL:16,SHIFTR:17,CLR:24,RAND:26,EXIT:27,DUP:33,DEPTH:35,SWAP:36,MOD:37,AND:38,STASH:40,FETCH:41,MUL:42,ADD:43,CONS:44,SUB:45,PRN:46,DIV:47,MARK:58,DEF:59,LT:60,EQ:61,GT:62,IF:63,BRA:91,KET:93,POW:94,OR:124,NOT:126},B={nop:r.NOP,eval:r.CALL,";":r.DEF,":":r.MARK,clr:r.CLR,rand:r.RAND,exit:r.EXIT,".":r.PRN,putc:r.PUTC,getc:r.GETC,putn:r.PUTN,clock:r.CLOCK,drop:r.DROP,swap:r.SWAP,dup:r.DUP,"<<":r.SHIFTL,">>":r.SHIFTR,"+":r.ADD,"-":r.SUB,cons:r.CONS,"*":r.MUL,"/":r.DIV,"<":r.LT,"=":r.EQ,">":r.GT,"?":r.IF,"%":r.MOD,"&":r.AND,"(":r.STASH,")":r.FETCH,"q<":r.PUSHR,"q>":r.PULLR,depth:r.DEPTH,"^":r.POW,"[":r.BRA,"]":r.KET,"|":r.OR,"~":r.NOT},C=255,Xt=i=>i,Zt=i=>i,u={call:"call",push:"push"},Jt=6,J=10,tn=new Map([[BigInt(r.MARK),":"],[BigInt(r.DEF),";"],[BigInt(r.BRA),"["],[BigInt(r.KET),"]"]]);function nn(i){return(""+i.value).padEnd(J," ")}function en(i,t){return t?t.padEnd(J," "):i.op===u.push&&i.meta?.pointer?`[${i.value}]`.padEnd(J," "):nn(i)}function sn(i){return i.trim()?`/* ${i} */`:""}function an(i){const t=rn(i)?.toUpperCase()||"",n=i.op===u.call?tn.get(i.value):void 0,e=n!==void 0,s=en(i,n),o=i.meta?.comment?.trim()||(i.op===u.call&&!e?t:""),a=(i.op===u.call&&!n?"EVAL":"").padEnd(Jt," ");return[Zt(s),Xt(a),sn(o)].join(" ")}function on(i){for(const t in B)if(B[t]===i)return t;return""}function rn(i){if(i.op===u.call||i.op===u.push&&i.meta?.pointer)return i.meta?.name||on(Number(i.value))||""}function Mn(i){return i.map(an).join(`
`)}function pn(i){return i=i.replace(/\\U([A-Fa-f0-9]{8})/g,(t,n)=>ft(n)),i=i.replace(/\\u([A-Fa-f0-9]{4})/g,(t,n)=>ft(n)),i.replace(/\\0/g,"\0").replace(/\\b/g,"\b").replace(/\\t/g,"	").replace(/\\n/g,`
`).replace(/\\v/g,"\v").replace(/\\f/g,"\f").replace(/\\r/g,"\r").replace(/\\'/g,"'").replace(/\\"/g,'"').replace(/\\s/g," ").replace(/\\\\/g,"\\")}function ft(i){let t="",n=parseInt(i,16);return n<=65535?t+=String.fromCharCode(n):n<=1114111?(n-=65536,t+=String.fromCharCode(55296|n>>10)+String.fromCharCode(56320|n&1023)):t+=`hex2Char error: Code point out of range: ${cn(n)}`,t}function cn(i){return(i+0).toString(16).toUpperCase()}const qt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",kt=new Map;qt.split("").forEach(function(i,t){kt.set(i,t)});const ln=5n,Tt=1n<<ln,Et=Number(Tt),$t=Tt-1n;function dn(i){return i.map(fn).map(mn).join("")}function hn(i){return vn(gn(i)).map(bn)}function un(i){return i>=0n?i<<1n:(-i<<1n)+1n}function _n(i){return i&1n?-(i>>1n):i>>1n}function fn(i){if(i===0n)return[0];i=un(i);const t=[];for(;i>0;){let n=Number(i&$t);i>>=5n,i>0&&(n|=Et),t.push(n)}return t}function mn(i){return i.map(t=>qt[t]).join("")}function gn(i){return i.split("").map(t=>{const n=kt.get(t);if(n===void 0)throw new Error(`${i} is not a valid base64 encoded VLQ`);return n})}function vn(i){const t=[];let n=[];if(i.forEach(e=>{n.push(e),(e&Et)===0&&(t.push(n),n=[])}),n.length>0)throw new Error("Malformed VLQ sequence: The last VLQ never ended.");return t}function bn(i){const t=i.reverse().reduce((n,e)=>(n<<=5n,n|=BigInt(e)&$t,n),0n);return _n(t)}const yn="/*",wn="*/";function Y(i){if(!(i==="-"||i==="+"))try{let t=1n;return i=i.replaceAll("_",""),i.startsWith("-0")&&(t=-1n,i=i.replace("-","")),i.includes("e")||i.includes("E")?t*BigInt(+i):t*BigInt(i)}catch{return}}class I{constructor(t={}){this.symbols=new Map,this._nextCode=-1,this.host=t;let n;for(n in B)this.symbols.set(n,BigInt(B[n]))}static tokenize(t){return t.split(/\s+/).filter(Boolean).map(n=>{const e=Y(n);return e!==void 0?e:n})}static tokenizeWithSpans(t){const n=[],e=/\S+/g;let s=0,o=0,a=0;const p=d=>{for(;a<d;){const l=t[a];l==="\r"?(t[a+1]===`
`&&a++,s++,o=0):l===`
`?(s++,o=0):o++,a++}};let c;for(;(c=e.exec(t))!==null;){const d=c.index;p(d);const l=c[0]??"",h=Y(l);n.push({raw:l,value:h!==void 0?h:l,line:s,character:o,length:l.length,offset:d}),p(d+l.length)}return n}static compileToBase64(t){const n=t.flatMap(e=>{if(e.op===u.call&&e.value===0n)return[];const s=e.value<<1n;return[e.op===u.push?s:s|1n]});return dn(n)}nextCode(){return BigInt(this._nextCode--)}getSymbol(t){t=t.toLowerCase();let n=this.symbols.get(t);return n===void 0&&(n=this.nextCode(),this.symbols.set(t,n)),n}compileToIR(t,n=""){let e=0;const s=t.length;let o="";const a=[];let p;for(;e<s;)if(p=t[e++],o=this.unwrapTokenValue(p),typeof o=="bigint")c(o);else if(o.length>1&&o.startsWith(".")){const[l]=o.split(" ");switch(l){case".push":a[a.length-1].op=u.push;break;case".call":a[a.length-1].op=u.call;break;case".inline":a[a.length-1].meta||={},a[a.length-1].meta.inline=!0;break;case".unsafe":a[a.length-1].meta||={},a[a.length-1].meta.unsafe=!0;break;case".pointer":a[a.length-1].meta||={},a[a.length-1].meta.pointer=!0;break;case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Compiler: .exit requires a host exit handler");case".symbols":this.symbols.forEach((h,f)=>{(this.host.log||console.log)(f,h)});break;case".words":{const h=Array.from(this.symbols,([f])=>f).join(" ");(this.host.log||console.log)(h);break}}}else if(o[0]==="'"&&o.length>1)pn(o).replace(/^'/,"").replace(/'$/,"").split("").forEach(l=>{c(l.charCodeAt(0),{comment:l})});else if(o.endsWith(":")&&o.length>1){const l=o.replace(/:$/,"");c(this.getSymbol(l),{name:`${l}`,pointer:!0}),d(r.MARK,{name:":"})}else if(o===yn){const l=p,h=[];for(;e<t.length&&(p=t[e++],o=this.unwrapTokenValue(p),o!==wn);)h.push(o);d(0n,{comment:h.join(" ")},l)}else if(o.startsWith("[")&&o.endsWith("]")){const l=o.replace(/^\[/,"").replace(/\]$/,""),h=Y(l);h!==void 0?c(h,{name:l,pointer:!0}):c(this.getSymbol(l),{name:l,pointer:!0})}else d(this.getSymbol(o),{name:o});return a;function c(l,h={},f=p){a.push({value:BigInt(l),op:u.push,meta:{...h,...I.toInstructionMeta(f,n)}})}function d(l,h={},f=p){a.push({value:BigInt(l),op:u.call,meta:{...h,...I.toInstructionMeta(f,n)}})}}unwrapTokenValue(t){return typeof t=="string"||typeof t=="bigint"?t:t.value}static toInstructionMeta(t,n){return!t||typeof t=="string"||typeof t=="bigint"?{filename:n}:{filename:n,line:t.line,character:t.character,length:t.length,offset:t.offset}}validate(t){const n=t.slice(),e=[];let s=0;for(;s<n.length;){const o=n[s];if(o.op===u.call&&o.value===BigInt(r.DEF)){let a=0;for(a=s;a>0&&!(n[a].op===u.call&&n[a].value===BigInt(r.MARK));a--);const p=n.splice(a-1,s-a+2);p.at(-1)?.meta?.unsafe||e.push(...this.validateDef(p)),s=a-1}s++}return e.push(...this.validateDef(n,"main")),e}validateDef(t,n){const e=[];let s=0,o=0,a=0,p=0;const c=[0];if(!t[0])return[];n=Yt(n||t[0].meta?.name?.replace(/^&/,"")||"main");const d=Gt(t[0].meta?.filename||"-");for(;s<t.length;){const l=t[s];if(l.op===u.call){if(l.op===u.call&&l.value===BigInt(r.MARK)&&o++,l.op===u.call&&l.value===BigInt(r.DEF)&&o--,l.op===u.call&&l.value===BigInt(r.BRA)&&(a++,c.push(0)),l.op===u.call&&l.value===BigInt(r.KET)&&(a--,(c.length>1?c.pop():0)!==0&&e.push(`${d}: Unbalanced queue push ( ${b("q< q>")} ) in quote in ${n}`)),l.op===u.call&&(l.value===BigInt(r.PUSHR)||l.value===BigInt(r.STASH))&&(p++,c[c.length-1]++),l.op===u.call&&(l.value===BigInt(r.PULLR)||l.value===BigInt(r.FETCH))){if(c[c.length-1]===0){const f=l.value===BigInt(r.FETCH)?")":"q>";e.push(`${d}: Queue borrow ( ${b(f)} ) requires ${b(".unsafe")} in ${n} (including quotes)`)}p--,c[c.length-1]--}a<0&&e.push(`${d}: Bracket ( ${b("[ ]")} ) mismatch in ${n}`),o<0&&e.push(`${d}: Definition ( ${b(": ;")} ) mismatch in ${n}`)}s++}return a!==0&&e.push(`${d}: Unbalanced brackets ( ${b("[ ]")} ) in ${n}`),p!==0&&e.push(`${d}: Unbalanced queue push ( ${b("q< q> ( )")} ) in ${n}`),o!==0&&e.push(`${d}: Unbalanced definition ( ${b(": ;")} ) in ${n}`),e}}const xn=[{mnemonic:"NOP",syntax:"nop",stackEffect:"… nop == …",description:"No operation; does nothing.",opcode:0},{mnemonic:"EVAL",syntax:"eval",stackEffect:"[A] eval == a*",description:"Evaluates a quotation, executing its contents.",opcode:1},{mnemonic:"PUTC",syntax:"putc",stackEffect:"n putc == {prints char(n)}",description:"Prints a character given by its numeric code.",opcode:2},{mnemonic:"GETC",syntax:"getc",stackEffect:"getc == n {reads char}",description:"Reads a single character from input and pushes its code.",opcode:3},{mnemonic:"PUTN",syntax:"putn",stackEffect:"n putn == {prints n}",description:"Prints a number to output.",opcode:5},{mnemonic:"CLOCK",syntax:"clock",stackEffect:"clock == n {reads clock}",description:"Returns the current time as a Unix timestamp.",opcode:6},{mnemonic:"DROP",syntax:"drop",stackEffect:"a drop ==",description:"Removes the top value from the stack.",opcode:8},{mnemonic:"PUSHR",syntax:"q<",stackEffect:"a q< == | …a",description:"Pushes a value onto the return stack.",opcode:14},{mnemonic:"PULLR",syntax:"q>",stackEffect:"q> == a | a…",description:"Pops a value from the return stack onto the main stack.",opcode:15},{mnemonic:"SHIFTL",syntax:"<<",stackEffect:"a b << == n",description:"Left-shifts a by b bits.",opcode:16},{mnemonic:"SHIFTR",syntax:">>",stackEffect:"a b >> == n",description:"Right-shifts a by b bits.",opcode:17},{mnemonic:"CLR",syntax:"clr",stackEffect:"… clr ==",description:"Clears the entire stack.",opcode:24},{mnemonic:"RAND",syntax:"rand",stackEffect:"n rand == r {0 <= r < n}",description:"Generates a random number between 0 and n-1.",opcode:26},{mnemonic:"EXIT",syntax:"exit",stackEffect:"n exit == {exits with code n}",description:"Exits the program with the given exit code.",opcode:27},{mnemonic:"DUP",syntax:"dup",stackEffect:"a dup == a a",description:"Duplicates the top value on the stack.",opcode:33},{mnemonic:"DEPTH",syntax:"depth",stackEffect:"… depth == … n",description:"Pushes the current stack depth.",opcode:35},{mnemonic:"SWAP",syntax:"swap",stackEffect:"a b swap == b a",description:"Swaps the top two values on the stack.",opcode:36},{mnemonic:"MOD",syntax:"%",stackEffect:"a b % == n",description:"Computes the remainder of a divided by b.",opcode:37},{mnemonic:"AND",syntax:"&",stackEffect:"a b & == n",description:"Bitwise AND of a and b.",opcode:38},{mnemonic:"STASH",syntax:"(",stackEffect:"… ( == {moves stack to queue}",description:"Moves values from the stack to the queue.",opcode:40},{mnemonic:"FETCH",syntax:")",stackEffect:") == … {restores stack from queue}",description:"Moves values from the queue back to the stack.",opcode:41},{mnemonic:"MUL",syntax:"*",stackEffect:"a b * == n",description:"Multiplies a by b.",opcode:42},{mnemonic:"ADD",syntax:"+",stackEffect:"a b + == n",description:"Adds a and b together.",opcode:43},{mnemonic:"CONS",syntax:"cons",stackEffect:"x y cons == q",description:"Builds an anonymous quotation from two stack values (opcode also maps to `,`).",opcode:44},{mnemonic:"SUB",syntax:"-",stackEffect:"a b - == n",description:"Subtracts b from a.",opcode:45},{mnemonic:"DUMP",syntax:".",stackEffect:"… . == … {prints stack}",description:"Prints the entire stack to output.",opcode:46},{mnemonic:"DIV",syntax:"/",stackEffect:"a b / == n",description:"Divides a by b (integer division).",opcode:47},{mnemonic:"MARK",syntax:":",stackEffect:"n : == {begin definition(n)}",description:"Begins a new word definition with name n.",opcode:58},{mnemonic:"DEF",syntax:";",stackEffect:"; == {end definition}",description:"Ends the current word definition.",opcode:59},{mnemonic:"LT",syntax:"<",stackEffect:"a b < == flag",description:"Pushes true if a is less than b.",opcode:60},{mnemonic:"EQ",syntax:"=",stackEffect:"a b = == flag",description:"Pushes true if a equals b.",opcode:61},{mnemonic:"GT",syntax:">",stackEffect:"a b > == flag",description:"Pushes true if a is greater than b.",opcode:62},{mnemonic:"WHEN",syntax:"?",stackEffect:"flag [A] ? == a*",description:"Executes the quotation if flag is true.",opcode:63},{mnemonic:"BRA",syntax:"[",stackEffect:"[ == {begin quotation}",description:"Begins a quotation (anonymous code block).",opcode:91},{mnemonic:"KET",syntax:"]",stackEffect:"] == [A] {end quotation}",description:"Ends a quotation and pushes it to the stack.",opcode:93},{mnemonic:"POW",syntax:"^",stackEffect:"a b ^ == n",description:"Computes a raised to the power of b.",opcode:94},{mnemonic:"OR",syntax:"|",stackEffect:"a b | == n",description:"Bitwise OR of a and b.",opcode:124},{mnemonic:"NOT",syntax:"~",stackEffect:"a ~ == n'",description:"Bitwise NOT of a.",opcode:126}],An={words:xn},Pt=new Map;for(const i of An.words)Pt.set(i.opcode,i);function Sn(i){return Pt.get(i)}const qn=[BigInt(r.DEF),BigInt(r.KET),BigInt(r.MARK),BigInt(r.BRA)],E=0n,$=1n;class zn{constructor(t){this.stack=[],this.queue=[],this.defs=new Map,this.symbols=new Map,this.depth=0,this.nextAnonOp=C+1,this.traceOn=!1,this.traceFormat="human",this.traceVerbose=!1,this.traceQueueMax=8,this.traceStackMax=32,this.base=10,this.statsOn=!1,this.profileOn=!1,this.stats={system_instructions_called:0,user_instructions_called:0,max_stack_depth:0,max_queue_depth:0},this.profile={},this.platform=t,this.setup()}static fromBase64(t){return hn(t).flatMap(n=>{const e=n&1n,s=n>>1n;return[e,s]})}getStack(){return this.stack.slice()}peek(){const t=this.stack.length;if(t>0)return this.stack[t-1];throw new Error("Peek: stack underflow")}pop(){if(this.stack.length>0)return this.stack.pop();throw new Error("Pop: stack underflow")}push(t){this.stack.push(t)}poke(t){const n=this.stack.length;if(n>0){this.stack[n-1]=t;return}throw new Error("Poke: stack underflow")}clear(){this.stack.splice(0,this.stack.length)}queuePush(t,n){this.queue.push(t,n)}queueUnshift(t,n){this.queue.unshift(t,n)}queueShift(){return[this.queue.shift()??0n,this.queue.shift()??0n]}queuePop(){const t=this.queue.pop()??0n;return[this.queue.pop()??0n,t]}defineSystem(t,n){const e=BigInt(n),s=this.getName(e);if(this.defs.has(e))throw new Error(`Define: cannot redefine system word "${s}"`);this.defs.set(e,t)}defineUser(t,n){const e=this.getName(n);if(n>-1&&n<C)throw new Error(`Define: cannot define system op "${e}"`);if(this.defs.has(n))throw n>C?new Error(`Define: cannot redefine anon op "${e}"`):new Error(`Define: cannot redefine user op "${e}"`);this.defs.set(n,t)}callSystem(t){const n=this.defs.get(t);if(typeof n=="function"){if(this.statsOn&&this.stats.system_instructions_called++,this.profileOn){const s=performance.now();n();const o=performance.now(),a=this.getName(t)||Number(t);this.profile[a]||=[0,0],this.profile[a][0]++,this.profile[a][1]!=0,this.profile[a][1]+=o-s;return}return n()}const e=this.getName(t)||t;throw new Error(`Call: undefined system op "${e}"`)}callUser(t){const n=this.defs.get(t);if(Array.isArray(n)){if(this.statsOn&&this.stats.user_instructions_called++,this.queue.unshift(...n),this.profileOn){const s=this.getName(t,`&${t}`);this.profile[s]||=[0,void 0],this.profile[s][0]++}return}const e=this.getName(t)||t;throw new Error(`Call: undefined user op "${e}"`)}callOp(t){return t>-1n&&t<C?this.callSystem(t):this.callUser(t)}loadBigIntCode(t){this.queue.push(...t)}loadIR(t){let n=0;for(;n<t.length;){const e=t[n++];if(e.op===u.call){if(e.value===0n)continue;e.meta?.name&&!this.symbols.has(e.value)&&this.symbols.set(e.value,e.meta?.name),this.queuePush($,e.value)}else this.queuePush(E,e.value)}return this.stack}runChunk(t,n){const e=this.queue;let s=!1,o=n,a=0;for(;e.length>0&&a<t;){const[p,c]=this.queueShift(),d=p===$,l=this.stack.slice();s=!this.depth||d&&qn.includes(c),d?s?this.callOp(c):(this.push(p),this.push(c)):(s||this.push(p),this.push(c)),this.statsOn&&(this.stats.max_stack_depth=Math.max(this.stats.max_stack_depth,this.stack.length),this.stats.max_queue_depth=Math.max(this.stats.max_queue_depth,e.length/2));const h=o++;this.traceOn&&this.trace({step:h,immediate:s,tag:p,value:c,stackBefore:l,stackAfter:this.traceVerbose||this.traceFormat==="jsonl"?this.stack.slice():void 0}),a++}return o}run(){return this.runChunk(Number.POSITIVE_INFINITY,0),this.stack}async runAsync(t={}){const n=t.yieldIntervalMs??160,e=t.yieldSliceMax??t.yieldEvery??655360;if(!Number.isFinite(n)||n<0)throw new Error(`runAsync: yieldIntervalMs must be a non-negative finite number (received ${n})`);if(!Number.isFinite(e)||e<1)throw new Error(`runAsync: yieldSliceMax / yieldEvery must be a positive finite number (received ${e})`);const s=t.scheduler??(()=>new Promise(d=>{globalThis.setTimeout(d,0)})),o=typeof globalThis.performance<"u"&&typeof globalThis.performance.now=="function"?()=>globalThis.performance.now():()=>globalThis.Date.now();let a=0,p=0,c=!1;for(;this.queue.length>0&&!c;){const d=o(),l=n>0?d+n:d;for(;this.queue.length>0&&!c&&!(n>0&&o()>=l);){const h=a;if(a=this.runChunk(e,a),p+=a-h,t.onChunk?.({vmCyclesExecuted:p}),t.shouldContinue&&!t.shouldContinue()){c=!0;break}if(n===0)break}this.queue.length>0&&!c&&await s()}return{stack:this.stack.slice(),cancelled:c,vmCyclesExecuted:p}}trace({step:t,immediate:n,tag:e,value:s,stackBefore:o,stackAfter:a}){const p=this.createTraceEvent(t,n,e,s,o,a);if(this.traceFormat==="jsonl"){this.writeTraceLine(JSON.stringify(p));return}this.writeTraceLine(this.formatHumanTrace(p))}createTraceEvent(t,n,e,s,o,a){const p=e===$,c=p?this.getName(s,String(s)):String(s),d=this.getQueuePreview();return{step:t,immediate:n,tag:p?"call":"literal",value:String(s),action:c,stack_before:this.limitStack(o).map(String),stack_after:a?this.limitStack(a).map(String):void 0,queue_preview:d,queue_depth:this.queue.length/2}}limitStack(t){return t.length>this.traceStackMax?t.slice(-this.traceStackMax):t}getQueuePreview(){const t=[],n=Math.max(this.traceQueueMax,0);for(let e=0;e<this.queue.length&&t.length<n;e+=2){const s=this.queue[e]??0n,o=this.queue[e+1]??0n,a=s===$;t.push({tag:a?"call":"literal",value:String(o),action:a?this.getName(o,String(o)):String(o)})}return t}formatHumanTrace(t){const n=this.padHumanAction(t.action),e=this.formatHumanStack(t.stack_before),s=this.formatHumanQueue(t.queue_preview,t.queue_depth),o=this.layoutHumanTraceLine(t.step,e,n,s);if(this.traceVerbose){const a=this.formatHumanStack(t.stack_after??[]);return`${o}
${" ".repeat(String(t.step).length+1)}${a} | immediate=${t.immediate} tag=${t.tag} value=${t.value} stack_depth=${this.stack.length} queue_depth=${t.queue_depth}`}return o}padHumanAction(t){return t.length>=7?t:t.padStart(Math.floor((7+t.length)/2)," ").padEnd(7," ")}layoutHumanTraceLine(t,n,e,s){const o=this.getTraceTerminalWidth(),a=`${t} `;if(a.length>=o)return a.slice(0,o);const p=1,c=Math.min(e.length,Math.max(o-a.length-p*2,1)),d=Math.max(a.length+p,Math.floor((o-c)/2)),l=Math.min(d,Math.max(a.length+p,o-c-p)),h=l+c,f=a.length,v=Math.max(f,l-p),x=Math.min(o,h+p),Ct=o,it=Math.max(v-f,0),at=Math.max(Ct-x,0),D=Array.from({length:o},()=>" ");if(this.writeSegment(D,0,a,a.length),this.writeSegment(D,l,e,c),it>0){const T=this.truncateLeft(n,it);this.writeSegment(D,v-T.length,T,T.length)}if(at>0){const T=this.truncateRight(s,at);this.writeSegment(D,x,T,T.length)}return D.join("").replace(/\s+$/,"")}formatHumanStack(t){return t.length===0?"[ ]":`[ ${t.join(" ")} ]`}formatHumanQueue(t,n){const e=t.map(o=>o.tag==="call"?`&${o.action}`:o.value),s=Math.max(n-t.length,0);return s>0&&e.push(`…(+${s})`),e.length===0?"[ ]":`[ ${e.join(" ")} ]`}getTraceTerminalWidth(){const n=globalThis.Deno,e=n?.stderr?.isTerminal?.()&&typeof n.stderr.rid=="number"?n.stderr.rid:n?.stdout?.isTerminal?.()&&typeof n.stdout.rid=="number"?n.stdout.rid:void 0;if(typeof e=="number")try{const a=n?.consoleSize?.(e).columns;if(typeof a=="number"&&a>0)return a}catch{}const s=globalThis.process,o=s?.stderr?.isTTY&&typeof s.stderr.columns=="number"?s.stderr.columns:s?.stdout?.isTTY&&typeof s.stdout.columns=="number"?s.stdout.columns:void 0;return typeof o=="number"&&o>0?o:120}truncateLeft(t,n){return n<=0?"":t.length<=n?t:n===1?"…":`…${t.slice(-(n-1))}`}truncateRight(t,n){return n<=0?"":t.length<=n?t:n===1?"…":`${t.slice(0,n-1)}…`}writeSegment(t,n,e,s){if(!(s<=0))for(let o=0;o<s&&o<e.length&&n+o<t.length;o++)t[n+o]=e[o]}writeTraceLine(t){const n=new TextEncoder().encode(`${t}
`);if(this.platform.io.writeError){this.platform.io.writeError(n);return}this.platform.io.write(n)}getName(t,n=String(t)){return this.symbols.has(t)?this.symbols.get(t):String(n)}inspectValue(t){const n=this.symbols.get(t),e=t>=0n&&t<=BigInt(C),s=this.defs.get(t),o=s!==void 0;let a;Array.isArray(s)&&(a=this.parseDefinitionTokens(s));let p,c;if(e){const d=Sn(Number(t));d&&(p=d.stackEffect,c=d.description)}return{value:t,name:n,isSystem:e,isDefined:o,definition:a,stackEffect:p,description:c}}parseDefinitionTokens(t){const n=[];for(let e=0;e<t.length;e+=2){const s=t[e]??0n,o=t[e+1]??0n,a=s===$,p=a?this.symbols.get(o):void 0,c=this.defs.has(o);n.push({value:o,tag:s,name:p,isCall:a,isDefined:c})}return n}print(){const t=this.stack.map(n=>n.toString(this.base)).join(" ");this.platform.io.write(new TextEncoder().encode(`[ ${t} ]
`))}loadSourceMap(t){Object.keys(t.symbols).forEach(n=>{this.symbols.set(BigInt(n),t.symbols[n])})}getNextAnonOp(){let t=this.nextAnonOp++;for(;this.defs.has(BigInt(t));)t=this.nextAnonOp++;return BigInt(t)}setup(){const t=new TextEncoder;let n;for(n in B)this.symbols.set(BigInt(B[n]),n);this.defineSystem(()=>{},r.NOP),this.defineSystem(()=>{const e=this.pop();this.callOp(e)},r.CALL),this.defineSystem(()=>{this.depth--;const[,e]=this.queuePop(),s=this.stack.splice(Number(e||0))||[];this.defineUser(s,this.pop())},r.DEF),this.defineSystem(()=>{this.depth--;const[,e]=this.queuePop(),s=this.stack.splice(Number(e||0))||[],o=this.getNextAnonOp();this.defineUser(s,o),this.depth>0&&this.push(0n),this.push(o)},r.KET),this.defineSystem(()=>{this.depth++;const e=this.stack.length;this.queuePush(E,BigInt(e))},r.BRA),this.defineSystem(()=>{this.depth++;const e=this.stack.length;this.queuePush(E,BigInt(e))},r.MARK),this.defineSystem(()=>this.clear(),r.CLR),this.defineSystem(()=>{const e=this.pop();this.platform.exit(Number(e))},r.EXIT),this.defineSystem(()=>{const e=this.pop();this.push(kn(e))},r.RAND),this.defineSystem(()=>{this.print()},r.PRN),this.defineSystem(()=>{this.push(BigInt(this.platform.now()))},r.CLOCK),this.defineSystem(()=>{const e=t.encode(String.fromCharCode(Number(this.pop())));this.platform.io.write(e)},r.PUTC),this.defineSystem(()=>{this.platform.io.setRaw&&this.platform.io.setRaw(!0);const e=this.platform.io.readByte();this.platform.io.setRaw&&this.platform.io.setRaw(!1),this.push(BigInt(e??0))},r.GETC),this.defineSystem(()=>{const e=t.encode(this.pop().toString(this.base));this.platform.io.write(e)},r.PUTN),this.defineSystem(()=>{this.pop()},r.DROP),this.defineSystem(()=>{const e=this.peek(),s=this.stack[this.stack.length-2];this.stack[this.stack.length-2]=e,this.poke(s)},r.SWAP),this.defineSystem(()=>{this.push(this.peek())},r.DUP),this.defineSystem(()=>{const e=this.pop();this.stack[this.stack.length-1]+=e},r.ADD),this.defineSystem(()=>{const e=this.pop();this.stack[this.stack.length-1]-=e},r.SUB),this.defineSystem(()=>{const e=this.pop();this.stack[this.stack.length-1]*=e},r.MUL),this.defineSystem(()=>{const e=this.pop();if(e===0n)throw new Error("DIV: Division by zero");this.stack[this.stack.length-1]/=e},r.DIV),this.defineSystem(()=>{const e=this.pop();this.stack[this.stack.length-1]%=e},r.MOD),this.defineSystem(()=>{const e=this.pop();this.stack[this.stack.length-1]<<=e},r.SHIFTL),this.defineSystem(()=>{const e=this.pop();this.stack[this.stack.length-1]>>=e},r.SHIFTR),this.defineSystem(()=>{const e=this.pop();this.stack[this.stack.length-1]&=e},r.AND),this.defineSystem(()=>{const e=this.pop();this.stack[this.stack.length-1]**=e},r.POW),this.defineSystem(()=>{this.push(this.pop()>this.pop()?1n:0n)},r.LT),this.defineSystem(()=>{this.push(this.pop()===this.pop()?1n:0n)},r.EQ),this.defineSystem(()=>{this.push(this.pop()<this.pop()?1n:0n)},r.GT),this.defineSystem(()=>{const e=this.pop();this.pop()!==0n&&this.queueUnshift($,e)},r.IF),this.defineSystem(()=>{this.queuePush(E,this.pop())},r.PUSHR),this.defineSystem(()=>{const[,e]=this.queuePop();this.push(e)},r.PULLR),this.defineSystem(()=>{this.push(BigInt(this.stack.length))},r.DEPTH),this.defineSystem(()=>{const e=this.stack.length;this.stack.splice(0,e).forEach(o=>this.queuePush(E,o)),this.queuePush(E,BigInt(e))},r.STASH),this.defineSystem(()=>{const[,e]=this.queuePop(),s=Number(e),o=[];for(let a=0;a<s;a++){const[,p]=this.queuePop();o.unshift(p)}this.stack.unshift(...o)},r.FETCH),this.defineSystem(()=>{const e=this.pop();this.stack[this.stack.length-1]|=e},r.OR),this.defineSystem(()=>{const e=this.pop();this.push(~e)},r.NOT),this.defineSystem(()=>{const e=this.pop(),o=[0n,this.pop(),1n,e],a=this.getNextAnonOp();this.defineUser(o,a),this.depth>0&&this.push(0n),this.push(a)},r.CONS)}printProfile(){console.log(),console.log("Profile:");const t=Object.keys(this.profile).map(s=>{const o=this.profile[s][0],a=this.profile[s][1];return{name:s,calls:o,time:a,system:typeof a<"u","ops/ms":a?Math.round(o/a):""}}).sort((s,o)=>o.calls-s.calls),n=t.filter(s=>s.system),e=t.filter(s=>!s.system);console.table(n,["name","calls","ops/ms"]),console.table(e,["name","calls"]),console.log()}printStats(){console.log(),console.log("Interpreter stats:"),console.log(this.stats),console.log()}}function kn(i){const t=i,n=t.toString().length;let e="";for(;e.length<n;)e+=Math.random().toString().split(".")[1];e=e.slice(0,n);const s="1"+"0".repeat(n);return t*BigInt(e)/BigInt(s)}const H=BigInt(r.DEF),mt=BigInt(r.KET),W=BigInt(r.MARK),gt=BigInt(r.BRA),_=i=>(i=BigInt(i),t=>t.op===u.call&&t.value===i),P=i=>(i=BigInt(i),t=>t.op===u.push&&t.value===i),g=i=>i.op===u.push,vt=i=>i.op===u.push&&i.value!==0n,Tn=[{name:"No operation",pattern:[_(r.NOP)],replacement:()=>[]},{name:"Null Sequence - SWAP SWAP",pattern:[_(r.SWAP),_(r.SWAP)],replacement:()=>[]},{name:"Null Sequence - DUP DROP",pattern:[_(r.DUP),_(r.DROP)],replacement:()=>[]},{name:"Null Sequence - PUSHR PULLR",pattern:[_(r.PUSHR),_(r.PULLR)],replacement:()=>[]},{name:"Null Sequence - CLOCK DROP",pattern:[_(r.CLOCK),_(r.DROP)],replacement:()=>[]},{name:"Null Sequence - RAND DROP",pattern:[_(r.RAND),_(r.DROP)],replacement:()=>[]},{name:"Null Sequence - DEPTH DROP",pattern:[_(r.DEPTH),_(r.DROP)],replacement:()=>[]},{name:"Null Sequence - NOT NOT",pattern:[_(r.NOT),_(r.NOT)],replacement:()=>[]},{name:"Indirect calls - n EVAL",pattern:[g,_(r.CALL)],replacement:i=>[{op:u.call,value:i.value,meta:{name:i.meta?.name?.replace(/^&/,"")}}]},{name:"Null Sequence - n DROP",pattern:[g,_(r.DROP)],replacement:()=>[]},{name:"Constant Folding - a b ADD",pattern:[g,g,_(r.ADD)],replacement:(i,t)=>[{op:u.push,value:i.value+t.value}]},{name:"Algebraic Simplification - 0 ADD",pattern:[P(0),_(r.ADD)],replacement:()=>[]},{name:"Algebraic Simplification - swap ADD",pattern:[_(r.SWAP),_(r.ADD)],replacement:(i,t)=>[t]},{name:"Constant Folding - a b SUB",pattern:[g,g,_(r.SUB)],replacement:(i,t)=>[{op:u.push,value:i.value-t.value}]},{name:"Algebraic Simplification - 0 SUB",pattern:[P(0),_(r.SUB)],replacement:()=>[]},{name:"Constant Folding - a b MUL",pattern:[g,g,_(r.MUL)],replacement:(i,t)=>[{op:u.push,value:i.value*t.value}]},{name:"Algebraic Simplification - 1 MUL",pattern:[P(1),_(r.MUL)],replacement:()=>[]},{name:"Algebraic Simplification - swap MUL",pattern:[_(r.SWAP),_(r.MUL)],replacement:(i,t)=>[t]},{name:"Constant Folding - a b DIV",pattern:[g,vt,_(r.DIV)],replacement:(i,t)=>[{op:u.push,value:i.value/t.value}]},{name:"Algebraic Simplification - 1 DIV",pattern:[P(1),_(r.DIV)],replacement:()=>[]},{name:"Constant propagation - a DUP",pattern:[g,_(r.DUP)],replacement:i=>[i,i]},{name:"Unreachable Code - 0 &b IF",pattern:[P(0),g,_(r.IF)],replacement:()=>[]},{name:"Flows-Of-Control Optimizations - !0 &b IF",pattern:[vt,g,_(r.IF)],replacement:(i,t,n)=>[{op:u.call,value:t.value,meta:{name:t.meta?.name?.replace(/^&/,"")}}]},{name:"Null Sequence - 0 eval",pattern:[P(0),_(r.CALL)],replacement:()=>[]},{name:"Empty List - [ ]",pattern:[_(r.BRA),_(r.KET)],replacement:()=>[{op:u.push,value:0n,meta:{pointer:!0,name:"0"}}]}];class Ln{constructor(){this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0},this.minOptPasses=2,this.maxOptPasses=20,this.defs=new Map,this.calledWords=new Set,this.optimized=[],this.nextAnonOp=C+1}optimize(t){this.reset(),this.stats.pre_optimization_ir_size=t.length,this.optimized=t;let n;do n=this.optimized.length,this.optLoop();while((this.optimized.length<n||this.stats.optimization_passes<this.minOptPasses)&&this.stats.optimization_passes<this.maxOptPasses);return this.optimized=this.pullDefs(this.optimized),this.optimized=this.addReferencedWords(this.optimized),this.stats.post_optimization_ir_size=this.optimized.length,this.optimized}optLoop(){this.optimized=this.peepholeOptimization(this.optimized),this.optimized=this.getDefs(this.optimized),this.optimized=this.inlineWords(this.optimized,4),this.stats.optimization_passes++}reset(){this.optimized=[],this.defs=new Map,this.calledWords=new Set,this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0}}getDefs(t){let n=0;for(;n<t.length;){const e=t[n];if(e.op===u.call){if(e.value===mt){this.stats.optimization_passes===0&&this.stats.user_defined_anon_defs++,e.meta??={},e.meta.uid??=this.nextAnonOp++;let s=n;for(;s-- >0;){const c=t[s];if(c.op===u.call&&c.value===gt)break}const o=BigInt(e.meta.uid),a={op:u.push,value:o,meta:{pointer:!0}},p=t.slice(s,n+1);p.unshift(a),p[1]={...p[1],value:W,meta:{...p[1].meta,name:":"}},p[p.length-1]={...p[p.length-1],value:H,meta:{...p[p.length-1].meta,name:";"}},this.defs.set(o,p)}else if(e.value===H){this.stats.optimization_passes===0&&this.stats.user_defined_named_defs++;let s=n;for(;s-- >0;){const p=t[s];if(p.op===u.call&&p.value===W)break}const o=t[s-1];o.meta||={},o.meta.pointer=!0;const a=t.slice(s-1,n+1);this.defs.set(o.value,a)}}n++}return t}pullDefs(t,n=!1){const e=t.slice();let s=0;for(;s<e.length;){const o=e[s];if(o.op===u.call){if(o.value===mt){o.meta??={},o.meta.uid??=this.nextAnonOp++;const a=s;for(;s-- >0;){const l=e[s];if(l.op===u.call&&l.value===gt)break}const p=BigInt(o.meta.uid),c={op:u.push,value:p,meta:{pointer:!0}},d=e.splice(s,a-s+1,c);d.unshift(c),d[1]={...d[1],value:W,meta:{...d[1].meta,name:":"}},d[d.length-1]={...d[d.length-1],value:H,meta:{...d[d.length-1].meta,name:";"}},this.defs.set(p,d)}else if(o.value===H&&!n){const a=s;for(;s-- >0;){const d=e[s];if(d.op===u.call&&d.value===W)break}const p=e[s-1];p.meta||={},p.meta.pointer=!0;const c=e.splice(s-1,a-s+2);s=s-2,this.defs.set(c[0].value,c)}}s++}return e}peepholeOptimization(t){const n=t.slice();for(;;){const e=this.stats.peephole_optimizations;let s=0;for(;s<n.length;){for(const o of Tn){const{pattern:a,replacement:p}=o;if(s+a.length>n.length)continue;if(a.every((d,l)=>d(n[s+l]))){this.stats.peephole_optimizations++;const d=n.slice(s,s+a.length);n.splice(s,a.length,...p(...d)),s=Math.max(0,s-a.length-1);break}}s++}if(this.stats.peephole_optimizations===e)break}return n}inlineWords(t,n=1,e=[]){return t.flatMap(s=>{if(s.meta?.unsafe)return s;if(s.op===u.call&&this.defs.has(s.value)){if(e.includes(s.value))return s;const o=this.defs.get(s.value);if(!o)return s;const a=o[o.length-1];if(a.meta?.unsafe)return s;if(a.meta?.inline||s.meta?.inline)return this.stats.inlined_calls++,this.inlineWords(o.slice(2,-1),1/0,e.concat(s.value));if(o.length<=n+3)return this.stats.inlined_calls++,this.inlineWords(o.slice(2,-1),n,e.concat(s.value))}return s})}addReferencedWords(t){return t.slice().forEach(n=>{n.op===u.push&&n.meta?.pointer?this.addDef(n.value):n.op===u.call&&this.addDef(n.value)}),t}addDef(t){if(!this.calledWords.has(t)){const n=this.defs.get(t);if(n)return this.stats.post_optimization_user_defs++,this.calledWords.add(t),this.optimized.unshift(...n),this.addReferencedWords(n)}}}class O{constructor(t,n,e){this.imported=new Set,this.importPrefixes=new Map,this.macroPreludeReady=!1,this.rootFilename=null,this.host=t,this.engine=n.engine,this.compiler=n.compiler||new I,this.stdlibRoots=e?.stdlibRoots??[],e?.macroEngineBootstrapFile&&this.bootstrapMacroEngine(e.macroEngineBootstrapFile)}static tokenize(t){return t.split(/[\r\n]+/)}preprocess(t,n="-"){const e=n!=="-"&&this.host.fileExists(n)?this.host.realpath(n):n,s=this.rootFilename===null;s&&e!=="-"&&(this.rootFilename=e);try{return this.preprocessLines(t,e)}finally{s&&(this.rootFilename=null)}}preprocessLines(t,n,e){return t.map(s=>{if(s.length>1&&s[0]==="."){const[o,...a]=s.split(" ");if(o[0]==="."&&o.length>1){switch(o){case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Preprocessor: .exit requires a host exit handler");case".load":{const p=this.findFile(a.join(" "),n),c=this.host.readTextFile(p);return this.preprocessLines(O.tokenize(c),p)}case".import":{const p=this.findFile(a.join(" "),n);if(!this.imported.has(p)){this.imported.add(p);const c=this.host.readTextFile(p);return this.preprocessLines(O.tokenize(c),p,p)}return""}case".m":return this.runMacro(a.join(" "),s);case".ff":return this.runMacro(a.join(" "),s);case".ffp":{if(!this.macroPreludeReady)throw new Error("Preprocessor: .ffp requires prelude-enabled macro context");return this.runMacro(a.join(" "),s)}}return""}}return e?this.mangleImportedLine(s,e):s}).join(`
`)}findFile(t,n="-"){const e=t.trim();if(!e)throw new Error("Preprocessor: missing import path");return this.isStdlibImport(e)?this.resolveStdlibImport(e):this.resolveFilesystemImport(e,n)}isStdlibImport(t){return t.startsWith("<")&&t.endsWith(">")&&t.length>2}resolveFilesystemImport(t,n){if(n&&n!=="-"&&!this.host.path.isAbsolute(t)){const s=this.host.path.dirname(n),o=this.host.path.resolve(s,t),a=this.resolveFileOrDirectory(o);if(a)return a}const e=this.resolveFileOrDirectory(t);if(e)return e;throw new Error(`File not found: "${t}"`)}resolveStdlibImport(t){const n=t.slice(1,-1).trim(),e=[];for(const o of this.stdlibRoots){e.push(o);const a=this.host.path.resolve(o,n),p=this.resolveFileOrDirectory(a,{extensions:[".ffp",".ff"]});if(p)return p}const s=e.length>0?e.join(", "):"(no stdlib roots configured)";throw new Error(`Stdlib import not found: ${t} (searched roots: ${s})`)}resolveFileOrDirectory(t,n){if(this.host.fileExists(t))return this.host.realpath(t);for(const e of n?.extensions??[]){const s=`${t}${e}`;if(this.host.fileExists(s))return this.host.realpath(s)}if(this.host.directoryExists(t)){const e=this.getBasename(t);for(const s of[".ffp",".ff"]){const o=this.host.path.resolve(t,`${e}${s}`);if(this.host.fileExists(o))return this.host.realpath(o)}}return null}getBasename(t){const n=t.replace(/[\\/]+$/,""),e=n.split(/[\\/]+/).filter(Boolean);return e[e.length-1]??n}bootstrapMacroEngine(t){const n=this.findFile(t),e=this.host.readTextFile(n),o=new O(this.host,{engine:this.engine,compiler:this.compiler},{stdlibRoots:this.stdlibRoots}).preprocess(O.tokenize(e),n),a=this.compiler.compileToIR(I.tokenize(o),n);this.engine.loadIR(a),this.engine.run(),this.engine.clear(),this.macroPreludeReady=!0}runMacro(t,n){const e=this.compiler.compileToIR(I.tokenize(t));this.engine.loadIR(e),this.engine.run();const s=this.engine.getStack();return this.engine.clear(),s.map(String).join(" ")+` /* ${n} */`}mangleImportedLine(t,n){const e=this.getImportPrefix(n);return t.split(/(\s+)/).map(s=>!s||/\s+/.test(s)?s:this.mangleImportedToken(s,e)).join("")}mangleImportedToken(t,n){return t.startsWith("[__")?`[${n}${t.slice(3)}`:t.startsWith("__")?`${n}${t.slice(2)}`:t}getImportPrefix(t){const n=this.importPrefixes.get(t);if(n)return n;const s=this.getNormalizedImportPath(t).replace(/[^A-Za-z0-9]+/g,"_").replace(/^_+|_+$/g,"").replace(/_+/g,"_")||"module",o=this.hashPath(t),a=`__${s}_${o}__`;return this.importPrefixes.set(t,a),a}getNormalizedImportPath(t){if(this.rootFilename&&this.rootFilename!=="-"){const n=this.host.path.dirname(this.rootFilename),e=this.host.path.relative(n,t);if(e)return e.replace(/\\/g,"/")}return t.replace(/\\/g,"/")}hashPath(t){let n=2166136261;for(let e=0;e<t.length;e++)n^=t.charCodeAt(e),n=Math.imul(n,16777619)>>>0;return n.toString(36)}}const Fn=`/* constants 1 2 3 */
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
`,Un=`.import ./num.ffp

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
`,Hn=`.import ./pred.ffp

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
`,Wn=`.import ./atan-shared.ffp

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
`,Kn=`.import ./arith.ffp
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
`,Vn=`.import ./atan-shared.ffp
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
`,jn=`.import ./atan-shared.ffp

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
`,Qn=`.import ./atan-shared.ffp
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
`,Gn=`.import ./arith.ffp

/*
 * Naming note: the \`i\` prefix means integer.
 * \`icbrt\` returns the integer cube root (truncated toward zero).
 */

__closer: dup2 2 ^ / over 2 * + 3 / ;
__loop: __closer dup2 > [ nip __loop ] ? ;
__cbrtn: dup 3 / __loop drop nip ;

icbrt: dup sgn swap over * dup 1 > [ __cbrtn ] ? * ; /* x icbrt == ⌊cbrt(x)⌋₀ */
`,Yn=`
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
`,Xn=`.import ../core/core.ff

__t: tuck % dup [ __t ] ? ;

gcd: dup [ __t ] ? drop ;
lcm: dup2 gcd / * ;
`,Zn=`.import ../core/core.ff
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
`,Jn=`.import ./pred.ffp
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
`,te=`.import ../core/core.ff

/* Logarithm and combinatorics */

!: dup [ dup -- ! * ] [ drop 1 ] branch ; /* n ! == n! */
nck: dup2 - ! swap ! * [ ! ] dip / ; /* n k nck == C(n,k) */

/* Knuth operators */

^^: -- dup [ [ dup ] swap times [ ^ ] ] dip times ;
^^^: -- dup [ [ dup ] swap times [ ^^ ] ] dip times ;
`,ne=`.import ./atan-core.ffp

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
`,ee=`.import ../core/core.ff
.import ./arith.ffp

/* Internal precision helpers shared by variable-precision math words. */
n->S: 10 swap ^ ; /* n n->S == 10ⁿ */
n->S2: 2 * n->S ; /* n n->S2 == 10²ⁿ */
n->K: 6 * 4 + 5 / 10 + ; /* n n->K == ⌈6*n/5⌉+10 */
p/q*S: n->S swap rot * swap / ; /* p q n p/q*S == ⌊p*10ⁿ/q⌋₀ */

ntrunc: n->S / ; /* x n ntrunc == ⌊x/10ⁿ⌋₀ */
nfrac: [ abs ] dip n->S % ; /* x n nfrac == (x - ⌊x/10ⁿ⌋₀)*10ⁿ */
`,se=`.import ../core/core.ff

/* Predicates */

negitive?: 0 < ; /* n negitive? == flag */
positive?: 0 > ; /* n positive? == flag */
divisor?: % zero? ; .inline /* n d divisor? == flag */
even?: 2 divisor? ; .inline /* n even? == flag */
odd?: even? not ; .inline /* n odd? == flag */
`,ie=`.import ./pred.ffp

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
`,ae=`.import ../core/core.ff
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
`,oe=`.import ../core/core.ff
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
`,re=`/* Trigonometric words live here. Pi-derived constants are defined in pi.ffp. */
`,pe=`.import ./core/core.ff
.import ./math/math.ffp
.import ./string/string.ffp
.import ./seq/seq.ffp
.import ./time/time.ffp`,ce=`.import ../core/core.ff

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
`,le=`.import ../core/core.ff

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
`,de=`/* String output */

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
`,he=`.import char.ffp
.import str.ffp`,ue=`.import ./core/core.ff
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
`,_e=`.import ./core/core.ff
.import ./string/string.ffp

assert: falsey? [ 0 10 'Failed' println .inline 1 exit ] ? ;
assert_eq: = assert .inline ;
assert_false: not assert .inline ;

OK: 0 '\\sOK' println clr ;

¶: clr 999 ;`,fe=`.import ./utc.ffp
`,me=`.import ../core/core.ff
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
`;function w(i){const t=i.startsWith("/"),n=i.split("/").filter(Boolean),e=[];for(const s of n)if(s!=="."){if(s===".."){e.pop();continue}e.push(s)}return`${t?"/":""}${e.join("/")}`||(t?"/":".")}function En(i){const t=w(i),n=t.lastIndexOf("/");return n<=0?t.startsWith("/")?"/":".":t.slice(0,n)}function $n(...i){const t=i.filter(Boolean).join("/").replaceAll(/\/+/g,"/");return w(t)}function Pn(i,t){const n=w(i).split("/").filter(Boolean),e=w(t).split("/").filter(Boolean);let s=0;for(;s<n.length&&s<e.length&&n[s]===e[s];)s++;const o=n.length-s,a=e.slice(s);return Array(o).fill("..").concat(a).join("/")||"."}function ge(i){return{readTextFile(t){const n=w(t),e=i[n];if(typeof e!="string")throw new Error(`Virtual file not found: ${n}`);return e},fileExists(t){return typeof i[w(t)]=="string"},directoryExists(t){const n=w(t).replace(/\/+$/,""),e=n==="/"?"/":`${n}/`;return Object.keys(i).some(s=>s.startsWith(e))},realpath(t){return w(t)},path:{isAbsolute(t){return t.startsWith("/")},dirname:En,relative:Pn,resolve:$n}}}function ve(i={}){const t=new TextDecoder,n=new TextEncoder,e=Array.from(n.encode(i.stdin??""));return{io:{write(s){i.onWrite?.(t.decode(s))},readByte(){return e.shift()??null}},exit(s){i.onExit?.(s)},now(){return Date.now()}}}export{m as A,Vn as B,Kn as C,Rn as D,L as E,Wn as F,Hn as G,Un as H,Fn as I,ve as J,I as K,zn as L,ge as M,Nn as N,On as O,O as P,Ln as Q,Mn as R,me as _,Dn as a,In as b,fe as c,_e as d,ue as e,he as f,de as g,le as h,ce as i,pe as j,re as k,oe as l,ae as m,ie as n,se as o,ee as p,ne as q,te as r,Bn as s,Jn as t,Zn as u,Xn as v,Yn as w,Gn as x,Qn as y,jn as z};
