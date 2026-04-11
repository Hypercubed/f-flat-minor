import{R as q}from"./run-feedback.Ug3xFfrM.js";const nn=globalThis,rn=i=>i,j=nn.trustedTypes,pn=j?j.createPolicy("lit-html",{createHTML:i=>i}):void 0,yn="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,wn="?"+y,Rn=`<${wn}>`,S=document,M=()=>S.createComment(""),z=i=>i===null||typeof i!="object"&&typeof i!="function",en=Array.isArray,Bn=i=>en(i)||typeof i?.[Symbol.iterator]=="function",G=`[ 	
\f\r]`,N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,cn=/-->/g,ln=/>/g,A=RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),dn=/'/g,hn=/"/g,An=/^(?:script|style|textarea|title)$/i,Dn=i=>(n,...e)=>({_$litType$:i,strings:n,values:e}),Ie=Dn(1),L=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),un=new WeakMap,x=S.createTreeWalker(S,129);function xn(i,n){if(!en(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return pn!==void 0?pn.createHTML(n):n}const Nn=(i,n)=>{const e=i.length-1,t=[];let s,o=n===2?"<svg>":n===3?"<math>":"",a=N;for(let p=0;p<e;p++){const c=i[p];let d,l,h=-1,f=0;for(;f<c.length&&(a.lastIndex=f,l=a.exec(c),l!==null);)f=a.lastIndex,a===N?l[1]==="!--"?a=cn:l[1]!==void 0?a=ln:l[2]!==void 0?(An.test(l[2])&&(s=RegExp("</"+l[2],"g")),a=A):l[3]!==void 0&&(a=A):a===A?l[0]===">"?(a=s??N,h=-1):l[1]===void 0?h=-2:(h=a.lastIndex-l[2].length,d=l[1],a=l[3]===void 0?A:l[3]==='"'?hn:dn):a===hn||a===dn?a=A:a===cn||a===ln?a=N:(a=A,s=void 0);const v=a===A&&i[p+1].startsWith("/>")?" ":"";o+=a===N?c+Rn:h>=0?(t.push(d),c.slice(0,h)+yn+c.slice(h)+y+v):c+y+(h===-2?p:v)}return[xn(i,o+(i[e]||"<?>")+(n===2?"</svg>":n===3?"</math>":"")),t]};class F{constructor({strings:n,_$litType$:e},t){let s;this.parts=[];let o=0,a=0;const p=n.length-1,c=this.parts,[d,l]=Nn(n,e);if(this.el=F.createElement(d,t),x.currentNode=this.el.content,e===2||e===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=x.nextNode())!==null&&c.length<p;){if(s.nodeType===1){if(s.hasAttributes())for(const h of s.getAttributeNames())if(h.endsWith(yn)){const f=l[a++],v=s.getAttribute(h).split(y),w=/([.?@])?(.*)/.exec(f);c.push({type:1,index:o,name:w[2],strings:v,ctor:w[1]==="."?Mn:w[1]==="?"?zn:w[1]==="@"?Ln:Q}),s.removeAttribute(h)}else h.startsWith(y)&&(c.push({type:6,index:o}),s.removeAttribute(h));if(An.test(s.tagName)){const h=s.textContent.split(y),f=h.length-1;if(f>0){s.textContent=j?j.emptyScript:"";for(let v=0;v<f;v++)s.append(h[v],M()),x.nextNode(),c.push({type:2,index:++o});s.append(h[f],M())}}}else if(s.nodeType===8)if(s.data===wn)c.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(y,h+1))!==-1;)c.push({type:7,index:o}),h+=y.length-1}o++}}static createElement(n,e){const t=S.createElement("template");return t.innerHTML=n,t}}function I(i,n,e=i,t){if(n===L)return n;let s=t!==void 0?e._$Co?.[t]:e._$Cl;const o=z(n)?void 0:n._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(i),s._$AT(i,e,t)),t!==void 0?(e._$Co??=[])[t]=s:e._$Cl=s),s!==void 0&&(n=I(i,s._$AS(i,n.values),s,t)),n}class On{constructor(n,e){this._$AV=[],this._$AN=void 0,this._$AD=n,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(n){const{el:{content:e},parts:t}=this._$AD,s=(n?.creationScope??S).importNode(e,!0);x.currentNode=s;let o=x.nextNode(),a=0,p=0,c=t[0];for(;c!==void 0;){if(a===c.index){let d;c.type===2?d=new U(o,o.nextSibling,this,n):c.type===1?d=new c.ctor(o,c.name,c.strings,this,n):c.type===6&&(d=new Fn(o,this,n)),this._$AV.push(d),c=t[++p]}a!==c?.index&&(o=x.nextNode(),a++)}return x.currentNode=S,s}p(n){let e=0;for(const t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(n,t,e),e+=t.strings.length-2):t._$AI(n[e])),e++}}class U{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(n,e,t,s){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=n,this._$AB=e,this._$AM=t,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let n=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&n?.nodeType===11&&(n=e.parentNode),n}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(n,e=this){n=I(this,n,e),z(n)?n===m||n==null||n===""?(this._$AH!==m&&this._$AR(),this._$AH=m):n!==this._$AH&&n!==L&&this._(n):n._$litType$!==void 0?this.$(n):n.nodeType!==void 0?this.T(n):Bn(n)?this.k(n):this._(n)}O(n){return this._$AA.parentNode.insertBefore(n,this._$AB)}T(n){this._$AH!==n&&(this._$AR(),this._$AH=this.O(n))}_(n){this._$AH!==m&&z(this._$AH)?this._$AA.nextSibling.data=n:this.T(S.createTextNode(n)),this._$AH=n}$(n){const{values:e,_$litType$:t}=n,s=typeof t=="number"?this._$AC(n):(t.el===void 0&&(t.el=F.createElement(xn(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===s)this._$AH.p(e);else{const o=new On(s,this),a=o.u(this.options);o.p(e),this.T(a),this._$AH=o}}_$AC(n){let e=un.get(n.strings);return e===void 0&&un.set(n.strings,e=new F(n)),e}k(n){en(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let t,s=0;for(const o of n)s===e.length?e.push(t=new U(this.O(M()),this.O(M()),this,this.options)):t=e[s],t._$AI(o),s++;s<e.length&&(this._$AR(t&&t._$AB.nextSibling,s),e.length=s)}_$AR(n=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);n!==this._$AB;){const t=rn(n).nextSibling;rn(n).remove(),n=t}}setConnected(n){this._$AM===void 0&&(this._$Cv=n,this._$AP?.(n))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(n,e,t,s,o){this.type=1,this._$AH=m,this._$AN=void 0,this.element=n,this.name=e,this._$AM=s,this.options=o,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=m}_$AI(n,e=this,t,s){const o=this.strings;let a=!1;if(o===void 0)n=I(this,n,e,0),a=!z(n)||n!==this._$AH&&n!==L,a&&(this._$AH=n);else{const p=n;let c,d;for(n=o[0],c=0;c<o.length-1;c++)d=I(this,p[t+c],e,c),d===L&&(d=this._$AH[c]),a||=!z(d)||d!==this._$AH[c],d===m?n=m:n!==m&&(n+=(d??"")+o[c+1]),this._$AH[c]=d}a&&!s&&this.j(n)}j(n){n===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,n??"")}}class Mn extends Q{constructor(){super(...arguments),this.type=3}j(n){this.element[this.name]=n===m?void 0:n}}class zn extends Q{constructor(){super(...arguments),this.type=4}j(n){this.element.toggleAttribute(this.name,!!n&&n!==m)}}class Ln extends Q{constructor(n,e,t,s,o){super(n,e,t,s,o),this.type=5}_$AI(n,e=this){if((n=I(this,n,e,0)??m)===L)return;const t=this._$AH,s=n===m&&t!==m||n.capture!==t.capture||n.once!==t.once||n.passive!==t.passive,o=n!==m&&(t===m||s);s&&this.element.removeEventListener(this.name,this,t),o&&this.element.addEventListener(this.name,this,n),this._$AH=n}handleEvent(n){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,n):this._$AH.handleEvent(n)}}class Fn{constructor(n,e,t){this.element=n,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(n){I(this,n)}}const Un=nn.litHtmlPolyfillSupport;Un?.(F,U),(nn.litHtmlVersions??=[]).push("3.3.2");const Re=(i,n,e)=>{const t=n;let s=t._$litPart$;return s===void 0&&(t._$litPart$=s=new U(n.insertBefore(M(),null),null,void 0,{})),s._$AI(i),s};let _n=null;function Hn(){return _n??=new AudioContext,_n}const fn=[329.6275569128699,391.99543598174927,493.8833013781249],Wn=10,Kn=420,Vn=3;let K=null,V=null,X=!1;function Z(){K!==null&&(clearInterval(K),K=null),V=null}function Be(i){if(Z(),!q.enabled||(X=!0,window.matchMedia("(prefers-reduced-motion: reduce)").matches))return;V=i;const n=()=>{if(!q.enabled){Z();return}V&&Qn(V,Vn)};n(),K=setInterval(n,Kn)}function De(){const i=X;X=!1,Z(),i&&qn()}function qn(){if(q.enabled)try{const i=Hn();i.resume().then(()=>{const n=i.currentTime,e=.42,t=.09;for(let s=0;s<fn.length;s++){const o=fn[s],a=i.createOscillator(),p=i.createGain();a.type="triangle",a.frequency.setValueAtTime(o,n),p.gain.setValueAtTime(0,n),p.gain.linearRampToValueAtTime(t,n+.018+s*.012),p.gain.exponentialRampToValueAtTime(8e-4,n+e),a.connect(p),p.connect(i.destination),a.start(n),a.stop(n+e+.06)}})}catch{}}function Sn(i){return!(i.isComposing||i.metaKey||i.ctrlKey||i.altKey||i.key==="Tab"||i.key==="Escape"||i.key==="ArrowUp"||i.key==="ArrowDown"||i.repeat)}function Ne(i,n){if(!q.enabled||i.disabled||!Sn(n))return;const{x:e,y:t}=jn(i);tn(e,t,{centerOnPoint:!0}),n.key==="Enter"&&qn()}function Oe(i,n){if(!q.enabled||!Sn(n))return;const e=i.state.selection.main.head,t=i.coordsAtPos(e);if(!t)return;const s=t.left,o=(t.top+t.bottom)/2;tn(s,o,{centerOnPoint:!0})}function jn(i){const n=i.getBoundingClientRect(),e=window.getComputedStyle(i),t=parseFloat(e.borderLeftWidth)||0,s=parseFloat(e.paddingLeft)||0,o=i.selectionStart??0,a=document.createElement("span");a.setAttribute("aria-hidden","true"),a.style.visibility="hidden",a.style.position="absolute",a.style.whiteSpace="pre",a.style.top="0",a.style.left="0",a.style.font=e.font,a.style.fontSize=e.fontSize,a.style.fontFamily=e.fontFamily,a.style.fontWeight=e.fontWeight,a.style.letterSpacing=e.letterSpacing,a.style.fontVariant=e.fontVariant,a.style.textTransform=e.textTransform,a.textContent=i.value.slice(0,o),document.body.appendChild(a);const p=a.offsetWidth;a.remove();const c=n.left+t+s+p-i.scrollLeft,d=n.top+n.height/2;return{x:c,y:d}}function tn(i,n,e){if(!q.enabled||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const t=document.createElement("span");t.className="run-flat-anchor",t.style.left=`${i}px`,t.style.top=`${n}px`,e?.centerOnPoint&&(t.style.transform="translate(-50%, -50%)");const s=document.createElement("span");s.className="run-flat-particle",s.setAttribute("aria-hidden","true"),s.textContent="♭",e?.animationDelay&&(s.style.animationDelay=e.animationDelay);const o=(Math.random()-.5)*2.25,a=-6+Math.random()*12,p=a+8+Math.random()*10;s.style.setProperty("--drift-x",`${o}rem`),s.style.setProperty("--rot-0",`${a}deg`),s.style.setProperty("--rot-1",`${p}deg`),t.appendChild(s),document.body.appendChild(t),s.addEventListener("animationend",()=>{t.remove()},{once:!0})}function Qn(i,n=Wn){if(!q.enabled||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=i.getBoundingClientRect();if(!(e.width<=0||e.height<=0))for(let t=0;t<n;t++){const s=e.left+Math.random()*e.width,o=e.top+e.height*(.35+Math.random()*.35);tn(s,o,{animationDelay:`${t*.045}s`})}}function Gn(){return!!(globalThis.Deno?.stdout?.isTerminal?.()??globalThis.process?.stdout?.isTTY??!1)}function sn(i,n){return Gn()?`\x1B[${i}m${n}\x1B[0m`:n}function Yn(i){return sn(34,i)}function Xn(i){return sn(32,i)}function b(i){return sn(36,i)}const r={NOP:0,CALL:1,PUTC:2,GETC:3,PUTN:5,CLOCK:6,DROP:8,PUSHR:14,PULLR:15,SHIFTL:16,SHIFTR:17,CLR:24,RAND:26,EXIT:27,DUP:33,DEPTH:35,SWAP:36,MOD:37,AND:38,STASH:40,FETCH:41,MUL:42,ADD:43,CONS:44,SUB:45,PRN:46,DIV:47,MARK:58,DEF:59,LT:60,EQ:61,GT:62,IF:63,BRA:91,KET:93,POW:94,OR:124,NOT:126},R={nop:r.NOP,eval:r.CALL,";":r.DEF,":":r.MARK,clr:r.CLR,rand:r.RAND,exit:r.EXIT,".":r.PRN,putc:r.PUTC,getc:r.GETC,putn:r.PUTN,clock:r.CLOCK,drop:r.DROP,swap:r.SWAP,dup:r.DUP,"<<":r.SHIFTL,">>":r.SHIFTR,"+":r.ADD,"-":r.SUB,cons:r.CONS,"*":r.MUL,"/":r.DIV,"<":r.LT,"=":r.EQ,">":r.GT,"?":r.IF,"%":r.MOD,"&":r.AND,"(":r.STASH,")":r.FETCH,"q<":r.PUSHR,"q>":r.PULLR,depth:r.DEPTH,"^":r.POW,"[":r.BRA,"]":r.KET,"|":r.OR,"~":r.NOT},$=255,Zn=i=>i,Jn=i=>i,u={call:"call",push:"push"},ne=6,J=10,ee=new Map([[BigInt(r.MARK),":"],[BigInt(r.DEF),";"],[BigInt(r.BRA),"["],[BigInt(r.KET),"]"]]);function te(i){return(""+i.value).padEnd(J," ")}function se(i,n){return n?n.padEnd(J," "):i.op===u.push&&i.meta?.pointer?`[${i.value}]`.padEnd(J," "):te(i)}function ie(i){return i.trim()?`/* ${i} */`:""}function ae(i){const n=re(i)?.toUpperCase()||"",e=i.op===u.call?ee.get(i.value):void 0,t=e!==void 0,s=se(i,e),o=i.meta?.comment?.trim()||(i.op===u.call&&!t?n:""),a=(i.op===u.call&&!e?"EVAL":"").padEnd(ne," ");return[Jn(s),Zn(a),ie(o)].join(" ")}function oe(i){for(const n in R)if(R[n]===i)return n;return""}function re(i){if(i.op===u.call||i.op===u.push&&i.meta?.pointer)return i.meta?.name||oe(Number(i.value))||""}function Me(i){return i.map(ae).join(`
`)}function pe(i){return i=i.replace(/\\U([A-Fa-f0-9]{8})/g,(n,e)=>mn(e)),i=i.replace(/\\u([A-Fa-f0-9]{4})/g,(n,e)=>mn(e)),i.replace(/\\0/g,"\0").replace(/\\b/g,"\b").replace(/\\t/g,"	").replace(/\\n/g,`
`).replace(/\\v/g,"\v").replace(/\\f/g,"\f").replace(/\\r/g,"\r").replace(/\\'/g,"'").replace(/\\"/g,'"').replace(/\\s/g," ").replace(/\\\\/g,"\\")}function mn(i){let n="",e=parseInt(i,16);return e<=65535?n+=String.fromCharCode(e):e<=1114111?(e-=65536,n+=String.fromCharCode(55296|e>>10)+String.fromCharCode(56320|e&1023)):n+=`hex2Char error: Code point out of range: ${ce(e)}`,n}function ce(i){return(i+0).toString(16).toUpperCase()}const kn="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Tn=new Map;kn.split("").forEach(function(i,n){Tn.set(i,n)});const le=5n,En=1n<<le,Pn=Number(En),$n=En-1n;function de(i){return i.map(fe).map(me).join("")}function he(i){return ve(ge(i)).map(be)}function ue(i){return i>=0n?i<<1n:(-i<<1n)+1n}function _e(i){return i&1n?-(i>>1n):i>>1n}function fe(i){if(i===0n)return[0];i=ue(i);const n=[];for(;i>0;){let e=Number(i&$n);i>>=5n,i>0&&(e|=Pn),n.push(e)}return n}function me(i){return i.map(n=>kn[n]).join("")}function ge(i){return i.split("").map(n=>{const e=Tn.get(n);if(e===void 0)throw new Error(`${i} is not a valid base64 encoded VLQ`);return e})}function ve(i){const n=[];let e=[];if(i.forEach(t=>{e.push(t),(t&Pn)===0&&(n.push(e),e=[])}),e.length>0)throw new Error("Malformed VLQ sequence: The last VLQ never ended.");return n}function be(i){const n=i.reverse().reduce((e,t)=>(e<<=5n,e|=BigInt(t)&$n,e),0n);return _e(n)}const ye="/*",we="*/";function Y(i){if(!(i==="-"||i==="+"))try{let n=1n;return i=i.replaceAll("_",""),i.startsWith("-0")&&(n=-1n,i=i.replace("-","")),i.includes("e")||i.includes("E")?n*BigInt(+i):n*BigInt(i)}catch{return}}class C{constructor(n={}){this.symbols=new Map,this._nextCode=-1,this.host=n;let e;for(e in R)this.symbols.set(e,BigInt(R[e]))}static tokenize(n){return n.split(/\s+/).filter(Boolean).map(e=>{const t=Y(e);return t!==void 0?t:e})}static tokenizeWithSpans(n){const e=[],t=/\S+/g;let s=0,o=0,a=0;const p=d=>{for(;a<d;){const l=n[a];l==="\r"?(n[a+1]===`
`&&a++,s++,o=0):l===`
`?(s++,o=0):o++,a++}};let c;for(;(c=t.exec(n))!==null;){const d=c.index;p(d);const l=c[0]??"",h=Y(l);e.push({raw:l,value:h!==void 0?h:l,line:s,character:o,length:l.length,offset:d}),p(d+l.length)}return e}static compileToBase64(n){const e=n.flatMap(t=>{if(t.op===u.call&&t.value===0n)return[];const s=t.value<<1n;return[t.op===u.push?s:s|1n]});return de(e)}nextCode(){return BigInt(this._nextCode--)}getSymbol(n){n=n.toLowerCase();let e=this.symbols.get(n);return e===void 0&&(e=this.nextCode(),this.symbols.set(n,e)),e}compileToIR(n,e=""){let t=0;const s=n.length;let o="";const a=[];let p;for(;t<s;)if(p=n[t++],o=this.unwrapTokenValue(p),typeof o=="bigint")c(o);else if(o.length>1&&o.startsWith(".")){const[l]=o.split(" ");switch(l){case".push":a[a.length-1].op=u.push;break;case".call":a[a.length-1].op=u.call;break;case".inline":a[a.length-1].meta||={},a[a.length-1].meta.inline=!0;break;case".unsafe":a[a.length-1].meta||={},a[a.length-1].meta.unsafe=!0;break;case".pointer":a[a.length-1].meta||={},a[a.length-1].meta.pointer=!0;break;case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Compiler: .exit requires a host exit handler");case".symbols":this.symbols.forEach((h,f)=>{(this.host.log||console.log)(f,h)});break;case".words":{const h=Array.from(this.symbols,([f])=>f).join(" ");(this.host.log||console.log)(h);break}}}else if(o[0]==="'"&&o.length>1)pe(o).replace(/^'/,"").replace(/'$/,"").split("").forEach(l=>{c(l.charCodeAt(0),{comment:l})});else if(o.endsWith(":")&&o.length>1){const l=o.replace(/:$/,"");c(this.getSymbol(l),{name:`${l}`,pointer:!0}),d(r.MARK,{name:":"})}else if(o===ye){const l=p,h=[];for(;t<n.length&&(p=n[t++],o=this.unwrapTokenValue(p),o!==we);)h.push(o);d(0n,{comment:h.join(" ")},l)}else if(o.startsWith("[")&&o.endsWith("]")){const l=o.replace(/^\[/,"").replace(/\]$/,""),h=Y(l);h!==void 0?c(h,{name:l,pointer:!0}):c(this.getSymbol(l),{name:l,pointer:!0})}else d(this.getSymbol(o),{name:o});return a;function c(l,h={},f=p){a.push({value:BigInt(l),op:u.push,meta:{...h,...C.toInstructionMeta(f,e)}})}function d(l,h={},f=p){a.push({value:BigInt(l),op:u.call,meta:{...h,...C.toInstructionMeta(f,e)}})}}unwrapTokenValue(n){return typeof n=="string"||typeof n=="bigint"?n:n.value}static toInstructionMeta(n,e){return!n||typeof n=="string"||typeof n=="bigint"?{filename:e}:{filename:e,line:n.line,character:n.character,length:n.length,offset:n.offset}}validate(n){const e=n.slice(),t=[];let s=0;for(;s<e.length;){const o=e[s];if(o.op===u.call&&o.value===BigInt(r.DEF)){let a=0;for(a=s;a>0&&!(e[a].op===u.call&&e[a].value===BigInt(r.MARK));a--);const p=e.splice(a-1,s-a+2);p.at(-1)?.meta?.unsafe||t.push(...this.validateDef(p)),s=a-1}s++}return t.push(...this.validateDef(e,"main")),t}validateDef(n,e){const t=[];let s=0,o=0,a=0,p=0;const c=[0];if(!n[0])return[];e=Xn(e||n[0].meta?.name?.replace(/^&/,"")||"main");const d=Yn(n[0].meta?.filename||"-");for(;s<n.length;){const l=n[s];if(l.op===u.call){if(l.op===u.call&&l.value===BigInt(r.MARK)&&o++,l.op===u.call&&l.value===BigInt(r.DEF)&&o--,l.op===u.call&&l.value===BigInt(r.BRA)&&(a++,c.push(0)),l.op===u.call&&l.value===BigInt(r.KET)&&(a--,(c.length>1?c.pop():0)!==0&&t.push(`${d}: Unbalanced queue push ( ${b("q< q>")} ) in quote in ${e}`)),l.op===u.call&&(l.value===BigInt(r.PUSHR)||l.value===BigInt(r.STASH))&&(p++,c[c.length-1]++),l.op===u.call&&(l.value===BigInt(r.PULLR)||l.value===BigInt(r.FETCH))){if(c[c.length-1]===0){const f=l.value===BigInt(r.FETCH)?")":"q>";t.push(`${d}: Queue borrow ( ${b(f)} ) requires ${b(".unsafe")} in ${e} (including quotes)`)}p--,c[c.length-1]--}a<0&&t.push(`${d}: Bracket ( ${b("[ ]")} ) mismatch in ${e}`),o<0&&t.push(`${d}: Definition ( ${b(": ;")} ) mismatch in ${e}`)}s++}return a!==0&&t.push(`${d}: Unbalanced brackets ( ${b("[ ]")} ) in ${e}`),p!==0&&t.push(`${d}: Unbalanced queue push ( ${b("q< q> ( )")} ) in ${e}`),o!==0&&t.push(`${d}: Unbalanced definition ( ${b(": ;")} ) in ${e}`),t}}const Ae=[{mnemonic:"NOP",syntax:"nop",stackEffect:"… nop == …",description:"No operation; does nothing.",opcode:0},{mnemonic:"EVAL",syntax:"eval",stackEffect:"[A] eval == a*",description:"Evaluates a quotation, executing its contents.",opcode:1},{mnemonic:"PUTC",syntax:"putc",stackEffect:"n putc == {prints char(n)}",description:"Prints a character given by its numeric code.",opcode:2},{mnemonic:"GETC",syntax:"getc",stackEffect:"getc == n {reads char}",description:"Reads a single character from input and pushes its code.",opcode:3},{mnemonic:"PUTN",syntax:"putn",stackEffect:"n putn == {prints n}",description:"Prints a number to output.",opcode:5},{mnemonic:"CLOCK",syntax:"clock",stackEffect:"clock == n {reads clock}",description:"Returns the current time as a Unix timestamp.",opcode:6},{mnemonic:"DROP",syntax:"drop",stackEffect:"a drop ==",description:"Removes the top value from the stack.",opcode:8},{mnemonic:"PUSHR",syntax:"q<",stackEffect:"a q< == | …a",description:"Pushes a value onto the return stack.",opcode:14},{mnemonic:"PULLR",syntax:"q>",stackEffect:"q> == a | a…",description:"Pops a value from the return stack onto the main stack.",opcode:15},{mnemonic:"SHIFTL",syntax:"<<",stackEffect:"a b << == n",description:"Left-shifts a by b bits.",opcode:16},{mnemonic:"SHIFTR",syntax:">>",stackEffect:"a b >> == n",description:"Right-shifts a by b bits.",opcode:17},{mnemonic:"CLR",syntax:"clr",stackEffect:"… clr ==",description:"Clears the entire stack.",opcode:24},{mnemonic:"RAND",syntax:"rand",stackEffect:"n rand == r {0 <= r < n}",description:"Generates a random number between 0 and n-1.",opcode:26},{mnemonic:"EXIT",syntax:"exit",stackEffect:"n exit == {exits with code n}",description:"Exits the program with the given exit code.",opcode:27},{mnemonic:"DUP",syntax:"dup",stackEffect:"a dup == a a",description:"Duplicates the top value on the stack.",opcode:33},{mnemonic:"DEPTH",syntax:"depth",stackEffect:"… depth == … n",description:"Pushes the current stack depth.",opcode:35},{mnemonic:"SWAP",syntax:"swap",stackEffect:"a b swap == b a",description:"Swaps the top two values on the stack.",opcode:36},{mnemonic:"MOD",syntax:"%",stackEffect:"a b % == n",description:"Computes the remainder of a divided by b.",opcode:37},{mnemonic:"AND",syntax:"&",stackEffect:"a b & == n",description:"Bitwise AND of a and b.",opcode:38},{mnemonic:"STASH",syntax:"(",stackEffect:"… ( == {moves stack to queue}",description:"Moves values from the stack to the queue.",opcode:40},{mnemonic:"FETCH",syntax:")",stackEffect:") == … {restores stack from queue}",description:"Moves values from the queue back to the stack.",opcode:41},{mnemonic:"MUL",syntax:"*",stackEffect:"a b * == n",description:"Multiplies a by b.",opcode:42},{mnemonic:"ADD",syntax:"+",stackEffect:"a b + == n",description:"Adds a and b together.",opcode:43},{mnemonic:"CONS",syntax:"cons",stackEffect:"x y cons == q",description:"Builds an anonymous quotation from two stack values (opcode also maps to `,`).",opcode:44},{mnemonic:"SUB",syntax:"-",stackEffect:"a b - == n",description:"Subtracts b from a.",opcode:45},{mnemonic:"DUMP",syntax:".",stackEffect:"… . == … {prints stack}",description:"Prints the entire stack to output.",opcode:46},{mnemonic:"DIV",syntax:"/",stackEffect:"a b / == n",description:"Divides a by b (integer division).",opcode:47},{mnemonic:"MARK",syntax:":",stackEffect:"n : == {begin definition(n)}",description:"Begins a new word definition with name n.",opcode:58},{mnemonic:"DEF",syntax:";",stackEffect:"; == {end definition}",description:"Ends the current word definition.",opcode:59},{mnemonic:"LT",syntax:"<",stackEffect:"a b < == flag",description:"Pushes true if a is less than b.",opcode:60},{mnemonic:"EQ",syntax:"=",stackEffect:"a b = == flag",description:"Pushes true if a equals b.",opcode:61},{mnemonic:"GT",syntax:">",stackEffect:"a b > == flag",description:"Pushes true if a is greater than b.",opcode:62},{mnemonic:"WHEN",syntax:"?",stackEffect:"flag [A] ? == a*",description:"Executes the quotation if flag is true.",opcode:63},{mnemonic:"BRA",syntax:"[",stackEffect:"[ == {begin quotation}",description:"Begins a quotation (anonymous code block).",opcode:91},{mnemonic:"KET",syntax:"]",stackEffect:"] == [A] {end quotation}",description:"Ends a quotation and pushes it to the stack.",opcode:93},{mnemonic:"POW",syntax:"^",stackEffect:"a b ^ == n",description:"Computes a raised to the power of b.",opcode:94},{mnemonic:"OR",syntax:"|",stackEffect:"a b | == n",description:"Bitwise OR of a and b.",opcode:124},{mnemonic:"NOT",syntax:"~",stackEffect:"a ~ == n'",description:"Bitwise NOT of a.",opcode:126}],xe={words:Ae},Cn=new Map;for(const i of xe.words)Cn.set(i.opcode,i);function qe(i){return Cn.get(i)}const Se=[BigInt(r.DEF),BigInt(r.KET),BigInt(r.MARK),BigInt(r.BRA)],T=0n,E=1n;class ze{constructor(n){this.stack=[],this.queue=[],this.defs=new Map,this.symbols=new Map,this.depth=0,this.nextAnonOp=$+1,this.traceOn=!1,this.traceFormat="human",this.traceVerbose=!1,this.traceQueueMax=8,this.traceStackMax=32,this.base=10,this.statsOn=!1,this.profileOn=!1,this.stats={system_instructions_called:0,user_instructions_called:0,max_stack_depth:0,max_queue_depth:0},this.profile={},this.platform=n,this.setup()}static fromBase64(n){return he(n).flatMap(e=>{const t=e&1n,s=e>>1n;return[t,s]})}getStack(){return this.stack.slice()}peek(){const n=this.stack.length;if(n>0)return this.stack[n-1];throw new Error("Peek: stack underflow")}pop(){if(this.stack.length>0)return this.stack.pop();throw new Error("Pop: stack underflow")}push(n){this.stack.push(n)}poke(n){const e=this.stack.length;if(e>0){this.stack[e-1]=n;return}throw new Error("Poke: stack underflow")}clear(){this.stack.splice(0,this.stack.length)}queuePush(n,e){this.queue.push(n,e)}queueUnshift(n,e){this.queue.unshift(n,e)}queueShift(){return[this.queue.shift()??0n,this.queue.shift()??0n]}queuePop(){const n=this.queue.pop()??0n;return[this.queue.pop()??0n,n]}defineSystem(n,e){const t=BigInt(e),s=this.getName(t);if(this.defs.has(t))throw new Error(`Define: cannot redefine system word "${s}"`);this.defs.set(t,n)}defineUser(n,e){const t=this.getName(e);if(e>-1&&e<$)throw new Error(`Define: cannot define system op "${t}"`);if(this.defs.has(e))throw e>$?new Error(`Define: cannot redefine anon op "${t}"`):new Error(`Define: cannot redefine user op "${t}"`);this.defs.set(e,n)}callSystem(n){const e=this.defs.get(n);if(typeof e=="function"){if(this.statsOn&&this.stats.system_instructions_called++,this.profileOn){const s=performance.now();e();const o=performance.now(),a=this.getName(n)||Number(n);this.profile[a]||=[0,0],this.profile[a][0]++,this.profile[a][1]!=0,this.profile[a][1]+=o-s;return}return e()}const t=this.getName(n)||n;throw new Error(`Call: undefined system op "${t}"`)}callUser(n){const e=this.defs.get(n);if(Array.isArray(e)){if(this.statsOn&&this.stats.user_instructions_called++,this.queue.unshift(...e),this.profileOn){const s=this.getName(n,`&${n}`);this.profile[s]||=[0,void 0],this.profile[s][0]++}return}const t=this.getName(n)||n;throw new Error(`Call: undefined user op "${t}"`)}callOp(n){return n>-1n&&n<$?this.callSystem(n):this.callUser(n)}loadBigIntCode(n){this.queue.push(...n)}loadIR(n){let e=0;for(;e<n.length;){const t=n[e++];if(t.op===u.call){if(t.value===0n)continue;t.meta?.name&&!this.symbols.has(t.value)&&this.symbols.set(t.value,t.meta?.name),this.queuePush(E,t.value)}else this.queuePush(T,t.value)}return this.stack}runChunk(n,e){const t=this.queue;let s=!1,o=e,a=0;for(;t.length>0&&a<n;){const[p,c]=this.queueShift(),d=p===E,l=this.stack.slice();s=!this.depth||d&&Se.includes(c),d?s?this.callOp(c):(this.push(p),this.push(c)):(s||this.push(p),this.push(c)),this.statsOn&&(this.stats.max_stack_depth=Math.max(this.stats.max_stack_depth,this.stack.length),this.stats.max_queue_depth=Math.max(this.stats.max_queue_depth,t.length/2));const h=o++;this.traceOn&&this.trace({step:h,immediate:s,tag:p,value:c,stackBefore:l,stackAfter:this.traceVerbose||this.traceFormat==="jsonl"?this.stack.slice():void 0}),a++}return o}run(){return this.runChunk(Number.POSITIVE_INFINITY,0),this.stack}async runAsync(n={}){const e=n.yieldIntervalMs??160,t=n.yieldSliceMax??n.yieldEvery??655360;if(!Number.isFinite(e)||e<0)throw new Error(`runAsync: yieldIntervalMs must be a non-negative finite number (received ${e})`);if(!Number.isFinite(t)||t<1)throw new Error(`runAsync: yieldSliceMax / yieldEvery must be a positive finite number (received ${t})`);const s=n.scheduler??(()=>new Promise(d=>{globalThis.setTimeout(d,0)})),o=typeof globalThis.performance<"u"&&typeof globalThis.performance.now=="function"?()=>globalThis.performance.now():()=>globalThis.Date.now();let a=0,p=0,c=!1;for(;this.queue.length>0&&!c;){const d=o(),l=e>0?d+e:d;for(;this.queue.length>0&&!c&&!(e>0&&o()>=l);){const h=a;if(a=this.runChunk(t,a),p+=a-h,n.onChunk?.({vmCyclesExecuted:p}),n.shouldContinue&&!n.shouldContinue()){c=!0;break}if(e===0)break}this.queue.length>0&&!c&&await s()}return{stack:this.stack.slice(),cancelled:c,vmCyclesExecuted:p}}trace({step:n,immediate:e,tag:t,value:s,stackBefore:o,stackAfter:a}){const p=this.createTraceEvent(n,e,t,s,o,a);if(this.traceFormat==="jsonl"){this.writeTraceLine(JSON.stringify(p));return}this.writeTraceLine(this.formatHumanTrace(p))}createTraceEvent(n,e,t,s,o,a){const p=t===E,c=p?this.getName(s,String(s)):String(s),d=this.getQueuePreview();return{step:n,immediate:e,tag:p?"call":"literal",value:String(s),action:c,stack_before:this.limitStack(o).map(String),stack_after:a?this.limitStack(a).map(String):void 0,queue_preview:d,queue_depth:this.queue.length/2}}limitStack(n){return n.length>this.traceStackMax?n.slice(-this.traceStackMax):n}getQueuePreview(){const n=[],e=Math.max(this.traceQueueMax,0);for(let t=0;t<this.queue.length&&n.length<e;t+=2){const s=this.queue[t]??0n,o=this.queue[t+1]??0n,a=s===E;n.push({tag:a?"call":"literal",value:String(o),action:a?this.getName(o,String(o)):String(o)})}return n}formatHumanTrace(n){const e=this.padHumanAction(n.action),t=this.formatHumanStack(n.stack_before),s=this.formatHumanQueue(n.queue_preview,n.queue_depth),o=this.layoutHumanTraceLine(n.step,t,e,s);if(this.traceVerbose){const a=this.formatHumanStack(n.stack_after??[]);return`${o}
${" ".repeat(String(n.step).length+1)}${a} | immediate=${n.immediate} tag=${n.tag} value=${n.value} stack_depth=${this.stack.length} queue_depth=${n.queue_depth}`}return o}padHumanAction(n){return n.length>=7?n:n.padStart(Math.floor((7+n.length)/2)," ").padEnd(7," ")}layoutHumanTraceLine(n,e,t,s){const o=this.getTraceTerminalWidth(),a=`${n} `;if(a.length>=o)return a.slice(0,o);const p=1,c=Math.min(t.length,Math.max(o-a.length-p*2,1)),d=Math.max(a.length+p,Math.floor((o-c)/2)),l=Math.min(d,Math.max(a.length+p,o-c-p)),h=l+c,f=a.length,v=Math.max(f,l-p),w=Math.min(o,h+p),In=o,an=Math.max(v-f,0),on=Math.max(In-w,0),D=Array.from({length:o},()=>" ");if(this.writeSegment(D,0,a,a.length),this.writeSegment(D,l,t,c),an>0){const k=this.truncateLeft(e,an);this.writeSegment(D,v-k.length,k,k.length)}if(on>0){const k=this.truncateRight(s,on);this.writeSegment(D,w,k,k.length)}return D.join("").replace(/\s+$/,"")}formatHumanStack(n){return n.length===0?"[ ]":`[ ${n.join(" ")} ]`}formatHumanQueue(n,e){const t=n.map(o=>o.tag==="call"?`&${o.action}`:o.value),s=Math.max(e-n.length,0);return s>0&&t.push(`…(+${s})`),t.length===0?"[ ]":`[ ${t.join(" ")} ]`}getTraceTerminalWidth(){const e=globalThis.Deno,t=e?.stderr?.isTerminal?.()&&typeof e.stderr.rid=="number"?e.stderr.rid:e?.stdout?.isTerminal?.()&&typeof e.stdout.rid=="number"?e.stdout.rid:void 0;if(typeof t=="number")try{const a=e?.consoleSize?.(t).columns;if(typeof a=="number"&&a>0)return a}catch{}const s=globalThis.process,o=s?.stderr?.isTTY&&typeof s.stderr.columns=="number"?s.stderr.columns:s?.stdout?.isTTY&&typeof s.stdout.columns=="number"?s.stdout.columns:void 0;return typeof o=="number"&&o>0?o:120}truncateLeft(n,e){return e<=0?"":n.length<=e?n:e===1?"…":`…${n.slice(-(e-1))}`}truncateRight(n,e){return e<=0?"":n.length<=e?n:e===1?"…":`${n.slice(0,e-1)}…`}writeSegment(n,e,t,s){if(!(s<=0))for(let o=0;o<s&&o<t.length&&e+o<n.length;o++)n[e+o]=t[o]}writeTraceLine(n){const e=new TextEncoder().encode(`${n}
`);if(this.platform.io.writeError){this.platform.io.writeError(e);return}this.platform.io.write(e)}getName(n,e=String(n)){return this.symbols.has(n)?this.symbols.get(n):String(e)}inspectValue(n){const e=this.symbols.get(n),t=n>=0n&&n<=BigInt($),s=this.defs.get(n),o=s!==void 0;let a;Array.isArray(s)&&(a=this.parseDefinitionTokens(s));let p,c;if(t){const d=qe(Number(n));d&&(p=d.stackEffect,c=d.description)}return{value:n,name:e,isSystem:t,isDefined:o,definition:a,stackEffect:p,description:c}}parseDefinitionTokens(n){const e=[];for(let t=0;t<n.length;t+=2){const s=n[t]??0n,o=n[t+1]??0n,a=s===E,p=a?this.symbols.get(o):void 0,c=this.defs.has(o);e.push({value:o,tag:s,name:p,isCall:a,isDefined:c})}return e}print(){const n=this.stack.map(e=>e.toString(this.base)).join(" ");this.platform.io.write(new TextEncoder().encode(`[ ${n} ]
`))}loadSourceMap(n){Object.keys(n.symbols).forEach(e=>{this.symbols.set(BigInt(e),n.symbols[e])})}getNextAnonOp(){let n=this.nextAnonOp++;for(;this.defs.has(BigInt(n));)n=this.nextAnonOp++;return BigInt(n)}setup(){const n=new TextEncoder;let e;for(e in R)this.symbols.set(BigInt(R[e]),e);this.defineSystem(()=>{},r.NOP),this.defineSystem(()=>{const t=this.pop();this.callOp(t)},r.CALL),this.defineSystem(()=>{this.depth--;const[,t]=this.queuePop(),s=this.stack.splice(Number(t||0))||[];this.defineUser(s,this.pop())},r.DEF),this.defineSystem(()=>{this.depth--;const[,t]=this.queuePop(),s=this.stack.splice(Number(t||0))||[],o=this.getNextAnonOp();this.defineUser(s,o),this.depth>0&&this.push(0n),this.push(o)},r.KET),this.defineSystem(()=>{this.depth++;const t=this.stack.length;this.queuePush(T,BigInt(t))},r.BRA),this.defineSystem(()=>{this.depth++;const t=this.stack.length;this.queuePush(T,BigInt(t))},r.MARK),this.defineSystem(()=>this.clear(),r.CLR),this.defineSystem(()=>{const t=this.pop();this.platform.exit(Number(t))},r.EXIT),this.defineSystem(()=>{const t=this.pop();this.push(ke(t))},r.RAND),this.defineSystem(()=>{this.print()},r.PRN),this.defineSystem(()=>{this.push(BigInt(this.platform.now()))},r.CLOCK),this.defineSystem(()=>{const t=n.encode(String.fromCharCode(Number(this.pop())));this.platform.io.write(t)},r.PUTC),this.defineSystem(()=>{this.platform.io.setRaw&&this.platform.io.setRaw(!0);const t=this.platform.io.readByte();this.platform.io.setRaw&&this.platform.io.setRaw(!1),this.push(BigInt(t??0))},r.GETC),this.defineSystem(()=>{const t=n.encode(this.pop().toString(this.base));this.platform.io.write(t)},r.PUTN),this.defineSystem(()=>{this.pop()},r.DROP),this.defineSystem(()=>{const t=this.peek(),s=this.stack[this.stack.length-2];this.stack[this.stack.length-2]=t,this.poke(s)},r.SWAP),this.defineSystem(()=>{this.push(this.peek())},r.DUP),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]+=t},r.ADD),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]-=t},r.SUB),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]*=t},r.MUL),this.defineSystem(()=>{const t=this.pop();if(t===0n)throw new Error("DIV: Division by zero");this.stack[this.stack.length-1]/=t},r.DIV),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]%=t},r.MOD),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]<<=t},r.SHIFTL),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]>>=t},r.SHIFTR),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]&=t},r.AND),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]**=t},r.POW),this.defineSystem(()=>{this.push(this.pop()>this.pop()?1n:0n)},r.LT),this.defineSystem(()=>{this.push(this.pop()===this.pop()?1n:0n)},r.EQ),this.defineSystem(()=>{this.push(this.pop()<this.pop()?1n:0n)},r.GT),this.defineSystem(()=>{const t=this.pop();this.pop()!==0n&&this.queueUnshift(E,t)},r.IF),this.defineSystem(()=>{this.queuePush(T,this.pop())},r.PUSHR),this.defineSystem(()=>{const[,t]=this.queuePop();this.push(t)},r.PULLR),this.defineSystem(()=>{this.push(BigInt(this.stack.length))},r.DEPTH),this.defineSystem(()=>{const t=this.stack.length;this.stack.splice(0,t).forEach(o=>this.queuePush(T,o)),this.queuePush(T,BigInt(t))},r.STASH),this.defineSystem(()=>{const[,t]=this.queuePop(),s=Number(t),o=[];for(let a=0;a<s;a++){const[,p]=this.queuePop();o.unshift(p)}this.stack.unshift(...o)},r.FETCH),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]|=t},r.OR),this.defineSystem(()=>{const t=this.pop();this.push(~t)},r.NOT),this.defineSystem(()=>{const t=this.pop(),o=[0n,this.pop(),1n,t],a=this.getNextAnonOp();this.defineUser(o,a),this.depth>0&&this.push(0n),this.push(a)},r.CONS)}printProfile(){console.log(),console.log("Profile:");const n=Object.keys(this.profile).map(s=>{const o=this.profile[s][0],a=this.profile[s][1];return{name:s,calls:o,time:a,system:typeof a<"u","ops/ms":a?Math.round(o/a):""}}).sort((s,o)=>o.calls-s.calls),e=n.filter(s=>s.system),t=n.filter(s=>!s.system);console.table(e,["name","calls","ops/ms"]),console.table(t,["name","calls"]),console.log()}printStats(){console.log(),console.log("Interpreter stats:"),console.log(this.stats),console.log()}}function ke(i){const n=i,e=n.toString().length;let t="";for(;t.length<e;)t+=Math.random().toString().split(".")[1];t=t.slice(0,e);const s="1"+"0".repeat(e);return n*BigInt(t)/BigInt(s)}const H=BigInt(r.DEF),gn=BigInt(r.KET),W=BigInt(r.MARK),vn=BigInt(r.BRA),_=i=>(i=BigInt(i),n=>n.op===u.call&&n.value===i),P=i=>(i=BigInt(i),n=>n.op===u.push&&n.value===i),g=i=>i.op===u.push,bn=i=>i.op===u.push&&i.value!==0n,Te=[{name:"No operation",pattern:[_(r.NOP)],replacement:()=>[]},{name:"Null Sequence - SWAP SWAP",pattern:[_(r.SWAP),_(r.SWAP)],replacement:()=>[]},{name:"Null Sequence - DUP DROP",pattern:[_(r.DUP),_(r.DROP)],replacement:()=>[]},{name:"Null Sequence - PUSHR PULLR",pattern:[_(r.PUSHR),_(r.PULLR)],replacement:()=>[]},{name:"Null Sequence - CLOCK DROP",pattern:[_(r.CLOCK),_(r.DROP)],replacement:()=>[]},{name:"Null Sequence - RAND DROP",pattern:[_(r.RAND),_(r.DROP)],replacement:()=>[]},{name:"Null Sequence - DEPTH DROP",pattern:[_(r.DEPTH),_(r.DROP)],replacement:()=>[]},{name:"Null Sequence - NOT NOT",pattern:[_(r.NOT),_(r.NOT)],replacement:()=>[]},{name:"Indirect calls - n EVAL",pattern:[g,_(r.CALL)],replacement:i=>[{op:u.call,value:i.value,meta:{name:i.meta?.name?.replace(/^&/,"")}}]},{name:"Null Sequence - n DROP",pattern:[g,_(r.DROP)],replacement:()=>[]},{name:"Constant Folding - a b ADD",pattern:[g,g,_(r.ADD)],replacement:(i,n)=>[{op:u.push,value:i.value+n.value}]},{name:"Algebraic Simplification - 0 ADD",pattern:[P(0),_(r.ADD)],replacement:()=>[]},{name:"Algebraic Simplification - swap ADD",pattern:[_(r.SWAP),_(r.ADD)],replacement:(i,n)=>[n]},{name:"Constant Folding - a b SUB",pattern:[g,g,_(r.SUB)],replacement:(i,n)=>[{op:u.push,value:i.value-n.value}]},{name:"Algebraic Simplification - 0 SUB",pattern:[P(0),_(r.SUB)],replacement:()=>[]},{name:"Constant Folding - a b MUL",pattern:[g,g,_(r.MUL)],replacement:(i,n)=>[{op:u.push,value:i.value*n.value}]},{name:"Algebraic Simplification - 1 MUL",pattern:[P(1),_(r.MUL)],replacement:()=>[]},{name:"Algebraic Simplification - swap MUL",pattern:[_(r.SWAP),_(r.MUL)],replacement:(i,n)=>[n]},{name:"Constant Folding - a b DIV",pattern:[g,bn,_(r.DIV)],replacement:(i,n)=>[{op:u.push,value:i.value/n.value}]},{name:"Algebraic Simplification - 1 DIV",pattern:[P(1),_(r.DIV)],replacement:()=>[]},{name:"Constant propagation - a DUP",pattern:[g,_(r.DUP)],replacement:i=>[i,i]},{name:"Unreachable Code - 0 &b IF",pattern:[P(0),g,_(r.IF)],replacement:()=>[]},{name:"Flows-Of-Control Optimizations - !0 &b IF",pattern:[bn,g,_(r.IF)],replacement:(i,n,e)=>[{op:u.call,value:n.value,meta:{name:n.meta?.name?.replace(/^&/,"")}}]},{name:"Null Sequence - 0 eval",pattern:[P(0),_(r.CALL)],replacement:()=>[]},{name:"Empty List - [ ]",pattern:[_(r.BRA),_(r.KET)],replacement:()=>[{op:u.push,value:0n,meta:{pointer:!0,name:"0"}}]},{name:"a q< b a> - b a",pattern:[g,_(r.PUSHR),g,_(r.PULLR)],replacement:(i,n,e)=>[e,i]}];class Le{constructor(){this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0},this.minOptPasses=2,this.maxOptPasses=20,this.defs=new Map,this.calledWords=new Set,this.optimized=[],this.nextAnonOp=$+1}optimize(n){this.reset(),this.stats.pre_optimization_ir_size=n.length,this.optimized=n;let e;do e=this.optimized.length,this.optLoop();while((this.optimized.length<e||this.stats.optimization_passes<this.minOptPasses)&&this.stats.optimization_passes<this.maxOptPasses);return this.optimized=this.pullDefs(this.optimized),this.optimized=this.addReferencedWords(this.optimized),this.stats.post_optimization_ir_size=this.optimized.length,this.optimized}optLoop(){this.optimized=this.peepholeOptimization(this.optimized),this.optimized=this.getDefs(this.optimized),this.optimized=this.inlineWords(this.optimized,4),this.stats.optimization_passes++}reset(){this.optimized=[],this.defs=new Map,this.calledWords=new Set,this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0}}getDefs(n){let e=0;for(;e<n.length;){const t=n[e];if(t.op===u.call){if(t.value===gn){this.stats.optimization_passes===0&&this.stats.user_defined_anon_defs++,t.meta??={},t.meta.uid??=this.nextAnonOp++;let s=e;for(;s-- >0;){const c=n[s];if(c.op===u.call&&c.value===vn)break}const o=BigInt(t.meta.uid),a={op:u.push,value:o,meta:{pointer:!0}},p=n.slice(s,e+1);p.unshift(a),p[1]={...p[1],value:W,meta:{...p[1].meta,name:":"}},p[p.length-1]={...p[p.length-1],value:H,meta:{...p[p.length-1].meta,name:";"}},this.defs.set(o,p)}else if(t.value===H){this.stats.optimization_passes===0&&this.stats.user_defined_named_defs++;let s=e;for(;s-- >0;){const p=n[s];if(p.op===u.call&&p.value===W)break}const o=n[s-1];o.meta||={},o.meta.pointer=!0;const a=n.slice(s-1,e+1);this.defs.set(o.value,a)}}e++}return n}pullDefs(n,e=!1){const t=n.slice();let s=0;for(;s<t.length;){const o=t[s];if(o.op===u.call){if(o.value===gn){o.meta??={},o.meta.uid??=this.nextAnonOp++;const a=s;for(;s-- >0;){const l=t[s];if(l.op===u.call&&l.value===vn)break}const p=BigInt(o.meta.uid),c={op:u.push,value:p,meta:{pointer:!0}},d=t.splice(s,a-s+1,c);d.unshift(c),d[1]={...d[1],value:W,meta:{...d[1].meta,name:":"}},d[d.length-1]={...d[d.length-1],value:H,meta:{...d[d.length-1].meta,name:";"}},this.defs.set(p,d)}else if(o.value===H&&!e){const a=s;for(;s-- >0;){const d=t[s];if(d.op===u.call&&d.value===W)break}const p=t[s-1];p.meta||={},p.meta.pointer=!0;const c=t.splice(s-1,a-s+2);s=s-2,this.defs.set(c[0].value,c)}}s++}return t}peepholeOptimization(n){const e=n.slice();for(;;){const t=this.stats.peephole_optimizations;let s=0;for(;s<e.length;){for(const o of Te){const{pattern:a,replacement:p}=o;if(s+a.length>e.length)continue;if(a.every((d,l)=>d(e[s+l]))){this.stats.peephole_optimizations++;const d=e.slice(s,s+a.length);e.splice(s,a.length,...p(...d)),s=Math.max(0,s-a.length-1);break}}s++}if(this.stats.peephole_optimizations===t)break}return e}inlineWords(n,e=1,t=[]){return n.flatMap(s=>{if(s.meta?.unsafe)return s;if(s.op===u.call&&this.defs.has(s.value)){if(t.includes(s.value))return s;const o=this.defs.get(s.value);if(!o)return s;const a=o[o.length-1];if(a.meta?.unsafe)return s;if(a.meta?.inline||s.meta?.inline)return this.stats.inlined_calls++,this.inlineWords(o.slice(2,-1),1/0,t.concat(s.value));if(o.length<=e+3)return this.stats.inlined_calls++,this.inlineWords(o.slice(2,-1),e,t.concat(s.value))}return s})}addReferencedWords(n){return n.slice().forEach(e=>{e.op===u.push&&e.meta?.pointer?this.addDef(e.value):e.op===u.call&&this.addDef(e.value)}),n}addDef(n){if(!this.calledWords.has(n)){const e=this.defs.get(n);if(e)return this.stats.post_optimization_user_defs++,this.calledWords.add(n),this.optimized.unshift(...e),this.addReferencedWords(e)}}}class O{constructor(n,e,t){this.imported=new Set,this.importPrefixes=new Map,this.macroPreludeReady=!1,this.rootFilename=null,this.host=n,this.engine=e.engine,this.compiler=e.compiler||new C,t?.macroEngineBootstrapFile&&this.bootstrapMacroEngine(t.macroEngineBootstrapFile)}static tokenize(n){return n.split(/[\r\n]+/)}preprocess(n,e="-"){const t=this.rootFilename===null;t&&e!=="-"&&(this.rootFilename=e);try{return this.preprocessLines(n,e)}finally{t&&(this.rootFilename=null)}}preprocessLines(n,e,t){return n.map(s=>{if(s.length>1&&s[0]==="."){const[o,...a]=s.split(" ");if(o[0]==="."&&o.length>1){switch(o){case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Preprocessor: .exit requires a host exit handler");case".load":{const p=this.findFile(a.join(" "),e),c=this.host.readTextFile(p);return this.preprocessLines(O.tokenize(c),p)}case".import":{const p=this.findFile(a.join(" "),e);if(!this.imported.has(p)){this.imported.add(p);const c=this.host.readTextFile(p);return this.preprocessLines(O.tokenize(c),p,p)}return""}case".m":return this.runMacro(a.join(" "),s);case".ff":return this.runMacro(a.join(" "),s);case".ffp":{if(!this.macroPreludeReady)throw new Error("Preprocessor: .ffp requires prelude-enabled macro context");return this.runMacro(a.join(" "),s)}}return""}}return t?this.mangleImportedLine(s,t):s}).join(`
`)}findFile(n,e="-"){if(e&&e!=="-"&&!this.host.path.isAbsolute(n)){const t=this.host.path.dirname(e),s=this.host.path.resolve(t,n);if(this.host.fileExists(s))return s}if(this.host.fileExists(n))return n;throw'File not found: "'+n+'"'}bootstrapMacroEngine(n){const e=this.findFile(n),t=this.host.readTextFile(e),o=new O(this.host,{engine:this.engine,compiler:this.compiler}).preprocess(O.tokenize(t),e),a=this.compiler.compileToIR(C.tokenize(o),e);this.engine.loadIR(a),this.engine.run(),this.engine.clear(),this.macroPreludeReady=!0}runMacro(n,e){const t=this.compiler.compileToIR(C.tokenize(n));this.engine.loadIR(t),this.engine.run();const s=this.engine.getStack();return this.engine.clear(),s.map(String).join(" ")+` /* ${e} */`}mangleImportedLine(n,e){const t=this.getImportPrefix(e);return n.split(/(\s+)/).map(s=>!s||/\s+/.test(s)?s:this.mangleImportedToken(s,t)).join("")}mangleImportedToken(n,e){return n.startsWith("[__")?`[${e}${n.slice(3)}`:n.startsWith("__")?`${e}${n.slice(2)}`:n}getImportPrefix(n){const e=this.importPrefixes.get(n);if(e)return e;const s=this.getNormalizedImportPath(n).replace(/[^A-Za-z0-9]+/g,"_").replace(/^_+|_+$/g,"").replace(/_+/g,"_")||"module",o=this.hashPath(n),a=`__${s}_${o}__`;return this.importPrefixes.set(n,a),a}getNormalizedImportPath(n){if(this.rootFilename&&this.rootFilename!=="-"){const e=this.host.path.dirname(this.rootFilename),t=this.host.path.relative(e,n);if(t)return t.replace(/\\/g,"/")}return n.replace(/\\/g,"/")}hashPath(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619)>>>0;return e.toString(36)}}const Fe=`/* constants 1 2 3 */
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
`,Ue=`.import ./num.ffp

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
`,He=`.import ./pred.ffp

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
`,We=`.import ./atan-shared.ffp

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
; /* n u v _atan__core_scaled == floor(10^n*atan(u/v)) for reduced positive ratios */

_atan__needs_pi4:
  [ + sqr ] [ nip sqr 2 * ] bi2
  >
; /* u v _atan__needs_pi4 == u/v > tan(pi/8) for positive u <= v */
`,Ke=`.import ./arith.ffp
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
`,Ve=`.import ./atan-shared.ffp
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
  [ npi 2 / ] dip      /* floor(π/2*10ⁿ) sgn(u) */
*                      /* floor(π/2*10ⁿ)*sgn(u) */
; /* n u v (v == 0) __den_zero == sign(u)*floor(π/2*10ⁿ) */

__quarter_pi: half_pi 2 / ; /* n __quarter_pi == floor(10ⁿ*π/4) */
__diff_sum: [ - ] [ + ] bi2 ; /* u v __diff_sum == u-v u+v */

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
; /* n u v _atan__scaled == floor(10ⁿ*atan(u/v)) */

iatan: 0 swap 1 _atan__scaled ; /* x iatan == floor(atan(x)) */
natan: 1 _atan__scaled ; /* n x natan == floor(10ⁿ*atan(x)) */
qatan: 0 bury _atan__scaled ; /* u v qatan == floor(atan(u/v)) */
atan-inv: 1 swap _atan__scaled ; /* n x atan-inv == floor(10ⁿ*atan(1/x)) */
`,je=`.import ./atan-shared.ffp

/*
 * Shared artanh Taylor core without log-dependent range reduction.
 *
 * Public contract:
 *   n u v _atanh__core_scaled -- floor(10^n * atanh(u/v))
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
; /* n u v _atanh__core_scaled == floor(10^n*atanh(u/v)) for reduced positive ratios */
`,Qe=`.import ./atan-shared.ffp
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
; /* n u v (u,v > 0 and u < v) __atanh_pos_scaled == floor(10ⁿ*atanh(u/v)) */

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
; /* n u v _atanh__scaled == floor(10ⁿ*atanh(u/v)) for |u| < |v| */

iatanh: 0 swap 1 _atanh__scaled ; /* x iatanh == floor(atanh(x)) */
natanh: 1 _atanh__scaled ; /* n x natanh == floor(10ⁿ*atanh(x)) */
qatanh: 0 bury _atanh__scaled ; /* u v qatanh == floor(atanh(u/v)) */
atanh-inv: 1 swap _atanh__scaled ; /* n x atanh-inv == floor(10ⁿ*atanh(1/x)) */
`,Ge=`.import ./arith.ffp

/*
 * Naming note: the \`i\` prefix means integer.
 * \`icbrt\` returns the integer cube root (truncated toward zero).
 */

__closer: dup2 2 ^ / over 2 * + 3 / ;
__loop: __closer dup2 > [ nip __loop ] ? ;
__cbrtn: dup 3 / __loop drop nip ;

icbrt: dup sgn swap over * dup 1 > [ __cbrtn ] ? * ;
`,Ye=`
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
`,Xe=`.import ../core/core.ff

__t: tuck % dup [ __t ] ? ;

gcd: dup [ __t ] ? drop ;
lcm: dup2 gcd / * ;
`,Ze=`.import ../core/core.ff
.import ./atanh.ffp

__n: 20 ; /* number of digits to use for fixed-point calculations */
__s: 100000000000000000000 ; /* 10^n */
__ln2: 69314718055994530941 ; /* floor(ln(2)*10^n) */

nln2:
  ++
  3 atanh-inv
  2 *
  10 /
; /* n nln2 == floor(10^n*ln(2)) */

ilb: dup 1 > [ 1 >> ilb ++ ] [ drop 0 ] branch ; /* x ilb == floor(log2(x)) */
ilog: dup 10 >= [ 10 / ilog ++ ] [ drop 0 ] branch ; /* x ilog == floor(log10(x)) */
iln: ilb __ln2 * __s / ; /* x iln == floor(ln(x)) */
`,Je=`.import ./pred.ffp
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
`,nt=`.import ../core/core.ff

/* Logarithm and combinatorics */

!: dup [ dup -- ! * ] [ drop 1 ] branch ; /* n ! == n! */
nck: dup2 - ! swap ! * [ ! ] dip / ; /* n k nck == C(n,k) */

/* Knuth operators */

^^: -- dup [ [ dup ] swap times [ ^ ] ] dip times ;
^^^: -- dup [ [ dup ] swap times [ ^^ ] ] dip times ;
`,et=`.import ./atan-core.ffp

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
; /* n half_pi == floor(10ⁿ*π/2) */`,tt=`.import ../core/core.ff
.import ./arith.ffp

/* Internal precision helpers shared by variable-precision math words. */
n->S: 10 swap ^ ; /* n n->S == 10^n */
n->S2: 2 * n->S ; /* n n->S2 == 10^(2n) */
n->K: 6 * 4 + 5 / 10 + ; /* n n->K == ceil(6*n/5)+10 */
p/q*S: n->S swap rot * swap / ; /* p q n p/q*S == floor(p*10^n/q) */

ntrunc: n->S / ; /* x n ntrunc == floor(x/10^n) */
nfrac: [ abs ] dip n->S % ; /* x n nfrac == (x - floor(x/10^n))*10^n */`,st=`.import ../core/core.ff

/* Predicates */

negitive?: 0 < ; /* n negitive? == flag */
positive?: 0 > ; /* n positive? == flag */
divisor?: % zero? ; .inline /* n d divisor? == flag */
even?: 2 divisor? ; .inline /* n even? == flag */
odd?: even? not ; .inline /* n odd? == flag */
`,it=`.import ./pred.ffp

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
`,at=`.import ../core/core.ff
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
`,ot=`.import ../core/core.ff
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
`,rt=`/* Trigonometric words live here. Pi-derived constants are defined in pi.ffp. */
`,pt=`.import ./core/core.ff
.import ./math/math.ffp
.import ./string/string.ffp
.import ./seq/seq.ffp
.import ./time/time.ffp`,ct=`.import ../core/core.ff

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
`,lt=`.import ../core/core.ff

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
`,dt=`/* String output */

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
`,ht=`.import char.ffp
.import str.ffp`,ut=`.import ./core/core.ff
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
`,_t=`.import ./core/core.ff
.import ./string/string.ffp

assert: falsey? [ 0 10 'Failed' println .inline 1 exit ] ? ;
assert_eq: = assert .inline ;
assert_false: not assert .inline ;

OK: 0 '\\sOK' println clr ;

¶: clr 999 ;`,ft=`.import ./utc.ffp
`,mt=`.import ../core/core.ff
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
`;function B(i){const n=i.startsWith("/"),e=i.split("/").filter(Boolean),t=[];for(const s of e)if(s!=="."){if(s===".."){t.pop();continue}t.push(s)}return`${n?"/":""}${t.join("/")}`||(n?"/":".")}function Ee(i){const n=B(i),e=n.lastIndexOf("/");return e<=0?n.startsWith("/")?"/":".":n.slice(0,e)}function Pe(...i){const n=i.filter(Boolean).join("/").replaceAll(/\/+/g,"/");return B(n)}function $e(i,n){const e=B(i).split("/").filter(Boolean),t=B(n).split("/").filter(Boolean);let s=0;for(;s<e.length&&s<t.length&&e[s]===t[s];)s++;const o=e.length-s,a=t.slice(s);return Array(o).fill("..").concat(a).join("/")||"."}function gt(i){return{readTextFile(n){const e=B(n),t=i[e];if(typeof t!="string")throw new Error(`Virtual file not found: ${e}`);return t},fileExists(n){return typeof i[B(n)]=="string"},path:{isAbsolute(n){return n.startsWith("/")},dirname:Ee,relative:$e,resolve:Pe}}}function vt(i={}){const n=new TextDecoder,e=new TextEncoder,t=Array.from(e.encode(i.stdin??""));return{io:{write(s){i.onWrite?.(n.decode(s))},readByte(){return t.shift()??null}},exit(s){i.onExit?.(s)},now(){return Date.now()}}}export{m as A,Ve as B,Ke as C,Re as D,L as E,We as F,He as G,Ue as H,Fe as I,vt as J,C as K,ze as L,gt as M,Ne as N,Oe as O,O as P,Le as Q,Me as R,mt as _,De as a,Ie as b,ft as c,_t as d,ut as e,ht as f,dt as g,lt as h,ct as i,pt as j,rt as k,ot as l,at as m,it as n,st as o,tt as p,et as q,nt as r,Be as s,Je as t,Ze as u,Xe as v,Ye as w,Ge as x,Qe as y,je as z};
