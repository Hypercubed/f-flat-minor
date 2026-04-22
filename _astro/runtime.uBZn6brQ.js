import{R as q}from"./run-feedback.Ug3xFfrM.js";const se=globalThis,ce=i=>i,j=se.trustedTypes,le=j?j.createPolicy("lit-html",{createHTML:i=>i}):void 0,be="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,ye="?"+w,Ie=`<${ye}>`,T=document,z=()=>T.createComment(""),L=i=>i===null||typeof i!="object"&&typeof i!="function",ie=Array.isArray,Re=i=>ie(i)||typeof i?.[Symbol.iterator]=="function",G=`[ 	
\f\r]`,B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,de=/-->/g,he=/>/g,S=RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ue=/'/g,_e=/"/g,we=/^(?:script|style|textarea|title)$/i,De=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),Rt=De(1),H=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),fe=new WeakMap,k=T.createTreeWalker(T,129);function xe(i,e){if(!ie(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return le!==void 0?le.createHTML(e):e}const Ne=(i,e)=>{const t=i.length-1,n=[];let s,o=e===2?"<svg>":e===3?"<math>":"",a=B;for(let p=0;p<t;p++){const c=i[p];let d,l,_=-1,m=0;for(;m<c.length&&(a.lastIndex=m,l=a.exec(c),l!==null);)m=a.lastIndex,a===B?l[1]==="!--"?a=de:l[1]!==void 0?a=he:l[2]!==void 0?(we.test(l[2])&&(s=RegExp("</"+l[2],"g")),a=S):l[3]!==void 0&&(a=S):a===S?l[0]===">"?(a=s??B,_=-1):l[1]===void 0?_=-2:(_=a.lastIndex-l[2].length,d=l[1],a=l[3]===void 0?S:l[3]==='"'?_e:ue):a===_e||a===ue?a=S:a===de||a===he?a=B:(a=S,s=void 0);const v=a===S&&i[p+1].startsWith("/>")?" ":"";o+=a===B?c+Ie:_>=0?(n.push(d),c.slice(0,_)+be+c.slice(_)+w+v):c+w+(_===-2?p:v)}return[xe(i,o+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]};class U{constructor({strings:e,_$litType$:t},n){let s;this.parts=[];let o=0,a=0;const p=e.length-1,c=this.parts,[d,l]=Ne(e,t);if(this.el=U.createElement(d,n),k.currentNode=this.el.content,t===2||t===3){const _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=k.nextNode())!==null&&c.length<p;){if(s.nodeType===1){if(s.hasAttributes())for(const _ of s.getAttributeNames())if(_.endsWith(be)){const m=l[a++],v=s.getAttribute(_).split(w),A=/([.?@])?(.*)/.exec(m);c.push({type:1,index:o,name:A[2],strings:v,ctor:A[1]==="."?Oe:A[1]==="?"?Me:A[1]==="@"?Fe:Q}),s.removeAttribute(_)}else _.startsWith(w)&&(c.push({type:6,index:o}),s.removeAttribute(_));if(we.test(s.tagName)){const _=s.textContent.split(w),m=_.length-1;if(m>0){s.textContent=j?j.emptyScript:"";for(let v=0;v<m;v++)s.append(_[v],z()),k.nextNode(),c.push({type:2,index:++o});s.append(_[m],z())}}}else if(s.nodeType===8)if(s.data===ye)c.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(w,_+1))!==-1;)c.push({type:7,index:o}),_+=w.length-1}o++}}static createElement(e,t){const n=T.createElement("template");return n.innerHTML=e,n}}function R(i,e,t=i,n){if(e===H)return e;let s=n!==void 0?t._$Co?.[n]:t._$Cl;const o=L(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(i),s._$AT(i,t,n)),n!==void 0?(t._$Co??=[])[n]=s:t._$Cl=s),s!==void 0&&(e=R(i,s._$AS(i,e.values),s,n)),e}class Be{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,s=(e?.creationScope??T).importNode(t,!0);k.currentNode=s;let o=k.nextNode(),a=0,p=0,c=n[0];for(;c!==void 0;){if(a===c.index){let d;c.type===2?d=new W(o,o.nextSibling,this,e):c.type===1?d=new c.ctor(o,c.name,c.strings,this,e):c.type===6&&(d=new ze(o,this,e)),this._$AV.push(d),c=n[++p]}a!==c?.index&&(o=k.nextNode(),a++)}return k.currentNode=T,s}p(e){let t=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class W{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,s){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=R(this,e,t),L(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==H&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Re(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==g&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=U.createElement(xe(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(t);else{const o=new Be(s,this),a=o.u(this.options);o.p(t),this.T(a),this._$AH=o}}_$AC(e){let t=fe.get(e.strings);return t===void 0&&fe.set(e.strings,t=new U(e)),t}k(e){ie(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,s=0;for(const o of e)s===t.length?t.push(n=new W(this.O(z()),this.O(z()),this,this.options)):n=t[s],n._$AI(o),s++;s<t.length&&(this._$AR(n&&n._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const n=ce(e).nextSibling;ce(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,s,o){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=g}_$AI(e,t=this,n,s){const o=this.strings;let a=!1;if(o===void 0)e=R(this,e,t,0),a=!L(e)||e!==this._$AH&&e!==H,a&&(this._$AH=e);else{const p=e;let c,d;for(e=o[0],c=0;c<o.length-1;c++)d=R(this,p[n+c],t,c),d===H&&(d=this._$AH[c]),a||=!L(d)||d!==this._$AH[c],d===g?e=g:e!==g&&(e+=(d??"")+o[c+1]),this._$AH[c]=d}a&&!s&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Oe extends Q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}}class Me extends Q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}}class Fe extends Q{constructor(e,t,n,s,o){super(e,t,n,s,o),this.type=5}_$AI(e,t=this){if((e=R(this,e,t,0)??g)===H)return;const n=this._$AH,s=e===g&&n!==g||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==g&&(n===g||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ze{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){R(this,e)}}const Le=se.litHtmlPolyfillSupport;Le?.(U,W),(se.litHtmlVersions??=[]).push("3.3.2");const Dt=(i,e,t)=>{const n=e;let s=n._$litPart$;return s===void 0&&(n._$litPart$=s=new W(e.insertBefore(z(),null),null,void 0,{})),s._$AI(i),s};let me=null;function He(){return me??=new AudioContext,me}const ge=[329.6275569128699,391.99543598174927,493.8833013781249],Ue=10,We=420,Ke=3;let K=null,V=null,Z=!1;function J(){K!==null&&(clearInterval(K),K=null),V=null}function Nt(i){if(J(),!q.enabled||(Z=!0,window.matchMedia("(prefers-reduced-motion: reduce)").matches))return;V=i;const e=()=>{if(!q.enabled){J();return}V&&je(V,Ke)};e(),K=setInterval(e,We)}function Bt(){const i=Z;Z=!1,J(),i&&Ae()}function Ae(){if(q.enabled)try{const i=He();i.resume().then(()=>{const e=i.currentTime,t=.42,n=.09;for(let s=0;s<ge.length;s++){const o=ge[s],a=i.createOscillator(),p=i.createGain();a.type="triangle",a.frequency.setValueAtTime(o,e),p.gain.setValueAtTime(0,e),p.gain.linearRampToValueAtTime(n,e+.018+s*.012),p.gain.exponentialRampToValueAtTime(8e-4,e+t),a.connect(p),p.connect(i.destination),a.start(e),a.stop(e+t+.06)}})}catch{}}function Se(i){return!(i.isComposing||i.metaKey||i.ctrlKey||i.altKey||i.key==="Tab"||i.key==="Escape"||i.key==="ArrowUp"||i.key==="ArrowDown"||i.repeat)}function Ot(i,e){if(!q.enabled||i.disabled||!Se(e))return;const{x:t,y:n}=Ve(i);ae(t,n,{centerOnPoint:!0}),e.key==="Enter"&&Ae()}function Mt(i,e){if(!q.enabled||!Se(e))return;const t=i.state.selection.main.head,n=i.coordsAtPos(t);if(!n)return;const s=n.left,o=(n.top+n.bottom)/2;ae(s,o,{centerOnPoint:!0})}function Ve(i){const e=i.getBoundingClientRect(),t=window.getComputedStyle(i),n=parseFloat(t.borderLeftWidth)||0,s=parseFloat(t.paddingLeft)||0,o=i.selectionStart??0,a=document.createElement("span");a.setAttribute("aria-hidden","true"),a.style.visibility="hidden",a.style.position="absolute",a.style.whiteSpace="pre",a.style.top="0",a.style.left="0",a.style.font=t.font,a.style.fontSize=t.fontSize,a.style.fontFamily=t.fontFamily,a.style.fontWeight=t.fontWeight,a.style.letterSpacing=t.letterSpacing,a.style.fontVariant=t.fontVariant,a.style.textTransform=t.textTransform,a.textContent=i.value.slice(0,o),document.body.appendChild(a);const p=a.offsetWidth;a.remove();const c=e.left+n+s+p-i.scrollLeft,d=e.top+e.height/2;return{x:c,y:d}}function ae(i,e,t){if(!q.enabled||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const n=document.createElement("span");n.className="run-flat-anchor",n.style.left=`${i}px`,n.style.top=`${e}px`,t?.centerOnPoint&&(n.style.transform="translate(-50%, -50%)");const s=document.createElement("span");s.className="run-flat-particle",s.setAttribute("aria-hidden","true"),s.textContent="♭",t?.animationDelay&&(s.style.animationDelay=t.animationDelay);const o=(Math.random()-.5)*2.25,a=-6+Math.random()*12,p=a+8+Math.random()*10;s.style.setProperty("--drift-x",`${o}rem`),s.style.setProperty("--rot-0",`${a}deg`),s.style.setProperty("--rot-1",`${p}deg`),n.appendChild(s),document.body.appendChild(n),s.addEventListener("animationend",()=>{n.remove()},{once:!0})}function je(i,e=Ue){if(!q.enabled||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const t=i.getBoundingClientRect();if(!(t.width<=0||t.height<=0))for(let n=0;n<e;n++){const s=t.left+Math.random()*t.width,o=t.top+t.height*(.35+Math.random()*.35);ae(s,o,{animationDelay:`${n*.045}s`})}}function Qe(){return!!(globalThis.Deno?.stdout?.isTerminal?.()??globalThis.process?.stdout?.isTTY??!1)}function oe(i,e){return Qe()?`\x1B[${i}m${e}\x1B[0m`:e}function Ge(i){return oe(34,i)}function Ye(i){return oe(32,i)}function y(i){return oe(36,i)}const r={NOP:0,CALL:1,PUTC:2,GETC:3,PUTN:5,CLOCK:6,DROP:8,PUSHR:14,PULLR:15,SHIFTL:16,SHIFTR:17,CLR:24,RAND:26,EXIT:27,DUP:33,DEPTH:35,SWAP:36,MOD:37,AND:38,STASH:40,FETCH:41,MUL:42,ADD:43,CONS:44,SUB:45,PRN:46,DIV:47,MARK:58,DEF:59,LT:60,EQ:61,GT:62,IF:63,BRA:91,KET:93,POW:94,OR:124,NOT:126},D={nop:r.NOP,eval:r.CALL,";":r.DEF,":":r.MARK,clr:r.CLR,rand:r.RAND,exit:r.EXIT,".":r.PRN,putc:r.PUTC,getc:r.GETC,putn:r.PUTN,clock:r.CLOCK,drop:r.DROP,swap:r.SWAP,dup:r.DUP,"<<":r.SHIFTL,">>":r.SHIFTR,"+":r.ADD,"-":r.SUB,cons:r.CONS,"*":r.MUL,"/":r.DIV,"<":r.LT,"=":r.EQ,">":r.GT,"?":r.IF,"%":r.MOD,"&":r.AND,"(":r.STASH,")":r.FETCH,"q<":r.PUSHR,"q>":r.PULLR,depth:r.DEPTH,"^":r.POW,"[":r.BRA,"]":r.KET,"|":r.OR,"~":r.NOT},C=255,Xe=i=>i,Ze=i=>i,u={call:"call",push:"push"},Je=6,ee=10,et=new Map([[BigInt(r.MARK),":"],[BigInt(r.DEF),";"],[BigInt(r.BRA),"["],[BigInt(r.KET),"]"]]);function tt(i){return(""+i.value).padEnd(ee," ")}function nt(i,e){return e?e.padEnd(ee," "):i.op===u.push&&i.meta?.pointer?`[${i.value}]`.padEnd(ee," "):tt(i)}function st(i){return i.trim()?`/* ${i} */`:""}function it(i){const e=ot(i)?.toUpperCase()||"",t=i.op===u.call?et.get(i.value):void 0,n=t!==void 0,s=nt(i,t),o=i.meta?.comment?.trim()||(i.op===u.call&&!n?e:""),a=(i.op===u.call&&!t?"EVAL":"").padEnd(Je," ");return[Ze(s),Xe(a),st(o)].join(" ")}function at(i){for(const e in D)if(D[e]===i)return e;return""}function ot(i){if(i.op===u.call||i.op===u.push&&i.meta?.pointer)return i.meta?.name||at(Number(i.value))||""}function Ft(i){return i.map(it).join(`
`)}function rt(i){return i=i.replace(/\\U([A-Fa-f0-9]{8})/g,(e,t)=>ve(t)),i=i.replace(/\\u([A-Fa-f0-9]{4})/g,(e,t)=>ve(t)),i.replace(/\\0/g,"\0").replace(/\\b/g,"\b").replace(/\\t/g,"	").replace(/\\n/g,`
`).replace(/\\v/g,"\v").replace(/\\f/g,"\f").replace(/\\r/g,"\r").replace(/\\'/g,"'").replace(/\\"/g,'"').replace(/\\s/g," ").replace(/\\\\/g,"\\")}function ve(i){let e="",t=parseInt(i,16);return t<=65535?e+=String.fromCharCode(t):t<=1114111?(t-=65536,e+=String.fromCharCode(55296|t>>10)+String.fromCharCode(56320|t&1023)):e+=`hex2Char error: Code point out of range: ${pt(t)}`,e}function pt(i){return(i+0).toString(16).toUpperCase()}const ke="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",qe=new Map;ke.split("").forEach(function(i,e){qe.set(i,e)});const ct=5n,Te=1n<<ct,Ee=Number(Te),Pe=Te-1n;function lt(i){return i.map(_t).map(ft).join("")}function dt(i){return gt(mt(i)).map(vt)}function ht(i){return i>=0n?i<<1n:(-i<<1n)+1n}function ut(i){return i&1n?-(i>>1n):i>>1n}function _t(i){if(i===0n)return[0];i=ht(i);const e=[];for(;i>0;){let t=Number(i&Pe);i>>=5n,i>0&&(t|=Ee),e.push(t)}return e}function ft(i){return i.map(e=>ke[e]).join("")}function mt(i){return i.split("").map(e=>{const t=qe.get(e);if(t===void 0)throw new Error(`${i} is not a valid base64 encoded VLQ`);return t})}function gt(i){const e=[];let t=[];if(i.forEach(n=>{t.push(n),(n&Ee)===0&&(e.push(t),t=[])}),t.length>0)throw new Error("Malformed VLQ sequence: The last VLQ never ended.");return e}function vt(i){const e=i.reverse().reduce((t,n)=>(t<<=5n,t|=BigInt(n)&Pe,t),0n);return ut(e)}const bt="/*",yt="*/";function Y(i){if(!(i==="-"||i==="+"))try{let e=1n;return i=i.replaceAll("_",""),i.startsWith("-0")&&(e=-1n,i=i.replace("-","")),i.includes("e")||i.includes("E")?e*BigInt(+i):e*BigInt(i)}catch{return}}class I{constructor(e={}){this.symbols=new Map,this._nextCode=-1,this.host=e;let t;for(t in D)this.symbols.set(t,BigInt(D[t]))}static tokenize(e){return e.split(/\s+/).filter(Boolean).map(t=>{const n=Y(t);return n!==void 0?n:t})}static tokenizeWithSpans(e){const t=[],n=/\S+/g;let s=0,o=0,a=0;const p=d=>{for(;a<d;){const l=e[a];l==="\r"?(e[a+1]===`
`&&a++,s++,o=0):l===`
`?(s++,o=0):o++,a++}};let c;for(;(c=n.exec(e))!==null;){const d=c.index;p(d);const l=c[0]??"",_=Y(l);t.push({raw:l,value:_!==void 0?_:l,line:s,character:o,length:l.length,offset:d}),p(d+l.length)}return t}static compileToBase64(e){const t=e.flatMap(n=>{if(n.op===u.call&&n.value===0n)return[];const s=n.value<<1n;return[n.op===u.push?s:s|1n]});return lt(t)}nextCode(){return BigInt(this._nextCode--)}getSymbol(e){e=e.toLowerCase();let t=this.symbols.get(e);return t===void 0&&(t=this.nextCode(),this.symbols.set(e,t)),t}compileToIR(e,t=""){let n=0;const s=e.length;let o="";const a=[];let p;for(;n<s;)if(p=e[n++],o=this.unwrapTokenValue(p),typeof o=="bigint")c(o);else if(o.length>1&&o.startsWith(".")){const[l]=o.split(" ");switch(l){case".push":a[a.length-1].op=u.push;break;case".call":a[a.length-1].op=u.call;break;case".inline":a[a.length-1].meta||={},a[a.length-1].meta.inline=!0;break;case".unsafe":a[a.length-1].meta||={},a[a.length-1].meta.unsafe=!0;break;case".pointer":a[a.length-1].meta||={},a[a.length-1].meta.pointer=!0;break;case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Compiler: .exit requires a host exit handler");case".symbols":this.symbols.forEach((_,m)=>{(this.host.log||console.log)(m,_)});break;case".words":{const _=Array.from(this.symbols,([m])=>m).join(" ");(this.host.log||console.log)(_);break}}}else if(o[0]==="'"&&o.length>1)rt(o).replace(/^'/,"").replace(/'$/,"").split("").forEach(l=>{c(l.charCodeAt(0),{comment:l})});else if(o.endsWith(":")&&o.length>1){const l=o.replace(/:$/,"");c(this.getSymbol(l),{name:`${l}`,pointer:!0}),d(r.MARK,{name:":"})}else if(o===bt){const l=p,_=[];for(;n<e.length&&(p=e[n++],o=this.unwrapTokenValue(p),o!==yt);)_.push(o);d(0n,{comment:_.join(" ")},l)}else if(o.startsWith("[")&&o.endsWith("]")){const l=o.replace(/^\[/,"").replace(/\]$/,""),_=Y(l);_!==void 0?c(_,{name:l,pointer:!0}):c(this.getSymbol(l),{name:l,pointer:!0})}else d(this.getSymbol(o),{name:o});return a;function c(l,_={},m=p){a.push({value:BigInt(l),op:u.push,meta:{..._,...I.toInstructionMeta(m,t)}})}function d(l,_={},m=p){a.push({value:BigInt(l),op:u.call,meta:{..._,...I.toInstructionMeta(m,t)}})}}unwrapTokenValue(e){return typeof e=="string"||typeof e=="bigint"?e:e.value}static toInstructionMeta(e,t){return!e||typeof e=="string"||typeof e=="bigint"?{filename:t}:{filename:t,line:e.line,character:e.character,length:e.length,offset:e.offset}}validate(e){const t=e.slice(),n=[];let s=0;for(;s<t.length;){const o=t[s];if(o.op===u.call&&o.value===BigInt(r.DEF)){let a=0;for(a=s;a>0&&!(t[a].op===u.call&&t[a].value===BigInt(r.MARK));a--);const p=t.splice(a-1,s-a+2);p.at(-1)?.meta?.unsafe||n.push(...this.validateDef(p)),s=a-1}s++}return n.push(...this.validateDef(t,"main")),n}validateDef(e,t){const n=[];let s=0,o=0,a=0,p=0;const c=[0];if(!e[0])return[];t=Ye(t||e[0].meta?.name?.replace(/^&/,"")||"main");const d=Ge(e[0].meta?.filename||"-");for(;s<e.length;){const l=e[s];if(l.op===u.call){if(l.op===u.call&&l.value===BigInt(r.MARK)&&o++,l.op===u.call&&l.value===BigInt(r.DEF)&&o--,l.op===u.call&&l.value===BigInt(r.BRA)&&(a++,c.push(0)),l.op===u.call&&l.value===BigInt(r.KET)&&(a--,(c.length>1?c.pop():0)!==0&&n.push(`${d}: Unbalanced queue push ( ${y("q< q>")} ) in quote in ${t}`)),l.op===u.call&&(l.value===BigInt(r.PUSHR)||l.value===BigInt(r.STASH))&&(p++,c[c.length-1]++),l.op===u.call&&(l.value===BigInt(r.PULLR)||l.value===BigInt(r.FETCH))){if(c[c.length-1]===0){const m=l.value===BigInt(r.FETCH)?")":"q>";n.push(`${d}: Queue borrow ( ${y(m)} ) requires ${y(".unsafe")} in ${t} (including quotes)`)}p--,c[c.length-1]--}a<0&&n.push(`${d}: Bracket ( ${y("[ ]")} ) mismatch in ${t}`),o<0&&n.push(`${d}: Definition ( ${y(": ;")} ) mismatch in ${t}`)}s++}return a!==0&&n.push(`${d}: Unbalanced brackets ( ${y("[ ]")} ) in ${t}`),p!==0&&n.push(`${d}: Unbalanced queue push ( ${y("q< q> ( )")} ) in ${t}`),o!==0&&n.push(`${d}: Unbalanced definition ( ${y(": ;")} ) in ${t}`),n}}const wt=[{mnemonic:"NOP",syntax:"nop",stackEffect:"… nop == …",description:"No operation; does nothing.",opcode:0},{mnemonic:"EVAL",syntax:"eval",stackEffect:"[A] eval == a*",description:"Evaluates a quotation, executing its contents.",opcode:1},{mnemonic:"PUTC",syntax:"putc",stackEffect:"n putc == {prints char(n)}",description:"Prints a character given by its numeric code.",opcode:2},{mnemonic:"GETC",syntax:"getc",stackEffect:"getc == n {reads char}",description:"Reads a single character from input and pushes its code.",opcode:3},{mnemonic:"PUTN",syntax:"putn",stackEffect:"n putn == {prints n}",description:"Prints a number to output.",opcode:5},{mnemonic:"CLOCK",syntax:"clock",stackEffect:"clock == n {reads clock}",description:"Returns the current time as a Unix timestamp.",opcode:6},{mnemonic:"DROP",syntax:"drop",stackEffect:"a drop ==",description:"Removes the top value from the stack.",opcode:8},{mnemonic:"PUSHR",syntax:"q<",stackEffect:"a q< == | …a",description:"Pushes a value onto the return stack.",opcode:14},{mnemonic:"PULLR",syntax:"q>",stackEffect:"q> == a | a…",description:"Pops a value from the return stack onto the main stack.",opcode:15},{mnemonic:"SHIFTL",syntax:"<<",stackEffect:"a b << == n",description:"Left-shifts a by b bits.",opcode:16},{mnemonic:"SHIFTR",syntax:">>",stackEffect:"a b >> == n",description:"Right-shifts a by b bits.",opcode:17},{mnemonic:"CLR",syntax:"clr",stackEffect:"… clr ==",description:"Clears the entire stack.",opcode:24},{mnemonic:"RAND",syntax:"rand",stackEffect:"n rand == r {0 <= r < n}",description:"Generates a random number between 0 and n-1.",opcode:26},{mnemonic:"EXIT",syntax:"exit",stackEffect:"n exit == {exits with code n}",description:"Exits the program with the given exit code.",opcode:27},{mnemonic:"DUP",syntax:"dup",stackEffect:"a dup == a a",description:"Duplicates the top value on the stack.",opcode:33},{mnemonic:"DEPTH",syntax:"depth",stackEffect:"… depth == … n",description:"Pushes the current stack depth.",opcode:35},{mnemonic:"SWAP",syntax:"swap",stackEffect:"a b swap == b a",description:"Swaps the top two values on the stack.",opcode:36},{mnemonic:"MOD",syntax:"%",stackEffect:"a b % == n",description:"Computes the remainder of a divided by b.",opcode:37},{mnemonic:"AND",syntax:"&",stackEffect:"a b & == n",description:"Bitwise AND of a and b.",opcode:38},{mnemonic:"STASH",syntax:"(",stackEffect:"… ( == {moves stack to queue}",description:"Moves values from the stack to the queue.",opcode:40},{mnemonic:"FETCH",syntax:")",stackEffect:") == … {restores stack from queue}",description:"Moves values from the queue back to the stack.",opcode:41},{mnemonic:"MUL",syntax:"*",stackEffect:"a b * == n",description:"Multiplies a by b.",opcode:42},{mnemonic:"ADD",syntax:"+",stackEffect:"a b + == n",description:"Adds a and b together.",opcode:43},{mnemonic:"CONS",syntax:"cons",stackEffect:"x y cons == q",description:"Builds an anonymous quotation from two stack values (opcode also maps to `,`).",opcode:44},{mnemonic:"SUB",syntax:"-",stackEffect:"a b - == n",description:"Subtracts b from a.",opcode:45},{mnemonic:"DUMP",syntax:".",stackEffect:"… . == … {prints stack}",description:"Prints the entire stack to output.",opcode:46},{mnemonic:"DIV",syntax:"/",stackEffect:"a b / == n",description:"Divides a by b (integer division).",opcode:47},{mnemonic:"MARK",syntax:":",stackEffect:"n : == {begin definition(n)}",description:"Begins a new word definition with name n.",opcode:58},{mnemonic:"DEF",syntax:";",stackEffect:"; == {end definition}",description:"Ends the current word definition.",opcode:59},{mnemonic:"LT",syntax:"<",stackEffect:"a b < == flag",description:"Pushes true if a is less than b.",opcode:60},{mnemonic:"EQ",syntax:"=",stackEffect:"a b = == flag",description:"Pushes true if a equals b.",opcode:61},{mnemonic:"GT",syntax:">",stackEffect:"a b > == flag",description:"Pushes true if a is greater than b.",opcode:62},{mnemonic:"WHEN",syntax:"?",stackEffect:"flag [A] ? == a*",description:"Executes the quotation if flag is true.",opcode:63},{mnemonic:"BRA",syntax:"[",stackEffect:"[ == {begin quotation}",description:"Begins a quotation (anonymous code block).",opcode:91},{mnemonic:"KET",syntax:"]",stackEffect:"] == [A] {end quotation}",description:"Ends a quotation and pushes it to the stack.",opcode:93},{mnemonic:"POW",syntax:"^",stackEffect:"a b ^ == n",description:"Computes a raised to the power of b.",opcode:94},{mnemonic:"OR",syntax:"|",stackEffect:"a b | == n",description:"Bitwise OR of a and b.",opcode:124},{mnemonic:"NOT",syntax:"~",stackEffect:"a ~ == n'",description:"Bitwise NOT of a.",opcode:126}],xt={words:wt},$e=new Map;for(const i of xt.words)$e.set(i.opcode,i);function At(i){return $e.get(i)}const St=[BigInt(r.DEF),BigInt(r.KET),BigInt(r.MARK),BigInt(r.BRA)],P=0n,$=1n;class zt{constructor(e){this.stack=[],this.queue=[],this.defs=new Map,this.symbols=new Map,this.depth=0,this.nextAnonOp=C+1,this.traceOn=!1,this.traceFormat="human",this.traceVerbose=!1,this.traceQueueMax=8,this.traceStackMax=32,this.traceStdoutMax=4096,this.base=10,this.statsOn=!1,this.profileOn=!1,this.stats={system_instructions_called:0,user_instructions_called:0,max_stack_depth:0,max_queue_depth:0},this.profile={},this.stdoutSinceLastTrace="",this.platform=e,this.setup()}static fromBase64(e){return dt(e).flatMap(t=>{const n=t&1n,s=t>>1n;return[n,s]})}getStack(){return this.stack.slice()}peek(){const e=this.stack.length;if(e>0)return this.stack[e-1];throw new Error("Peek: stack underflow")}pop(){if(this.stack.length>0)return this.stack.pop();throw new Error("Pop: stack underflow")}push(e){this.stack.push(e)}poke(e){const t=this.stack.length;if(t>0){this.stack[t-1]=e;return}throw new Error("Poke: stack underflow")}clear(){this.stack.splice(0,this.stack.length)}queuePush(e,t){this.queue.push(e,t)}queueUnshift(e,t){this.queue.unshift(e,t)}queueShift(){return[this.queue.shift()??0n,this.queue.shift()??0n]}queuePop(){const e=this.queue.pop()??0n;return[this.queue.pop()??0n,e]}defineSystem(e,t){const n=BigInt(t),s=this.getName(n);if(this.defs.has(n))throw new Error(`Define: cannot redefine system word "${s}"`);this.defs.set(n,e)}defineUser(e,t){const n=this.getName(t);if(t>-1&&t<C)throw new Error(`Define: cannot define system op "${n}"`);if(this.defs.has(t))throw t>C?new Error(`Define: cannot redefine anon op "${n}"`):new Error(`Define: cannot redefine user op "${n}"`);this.defs.set(t,e)}callSystem(e){const t=this.defs.get(e);if(typeof t=="function"){if(this.statsOn&&this.stats.system_instructions_called++,this.profileOn){const s=performance.now();t();const o=performance.now(),a=this.getName(e)||Number(e);this.profile[a]||=[0,0],this.profile[a][0]++,this.profile[a][1]!=0,this.profile[a][1]+=o-s;return}return t()}const n=this.getName(e)||e;throw new Error(`Call: undefined system op "${n}"`)}callUser(e){const t=this.defs.get(e);if(Array.isArray(t)){if(this.statsOn&&this.stats.user_instructions_called++,this.queue.unshift(...t),this.profileOn){const s=this.getName(e,`&${e}`);this.profile[s]||=[0,void 0],this.profile[s][0]++}return}const n=this.getName(e)||e;throw new Error(`Call: undefined user op "${n}"`)}callOp(e){return e>-1n&&e<C?this.callSystem(e):this.callUser(e)}loadBigIntCode(e){this.queue.push(...e)}loadIR(e){let t=0;for(;t<e.length;){const n=e[t++];if(n.op===u.call){if(n.value===0n)continue;n.meta?.name&&!this.symbols.has(n.value)&&this.symbols.set(n.value,n.meta?.name),this.queuePush($,n.value)}else this.queuePush(P,n.value)}return this.stack}runChunk(e,t){const n=this.queue;let s=!1,o=t,a=0;for(;n.length>0&&a<e;){const[p,c]=this.queueShift(),d=p===$,l=this.stack.slice();s=!this.depth||d&&St.includes(c),d?s?this.callOp(c):(this.push(p),this.push(c)):(s||this.push(p),this.push(c)),this.statsOn&&(this.stats.max_stack_depth=Math.max(this.stats.max_stack_depth,this.stack.length),this.stats.max_queue_depth=Math.max(this.stats.max_queue_depth,n.length/2));const _=o++;this.traceOn&&this.trace({step:_,immediate:s,tag:p,value:c,stackBefore:l,stackAfter:this.traceVerbose||this.traceFormat==="jsonl"?this.stack.slice():void 0}),a++}return o}run(){return this.runChunk(Number.POSITIVE_INFINITY,0),this.stack}async runAsync(e={}){const t=e.yieldIntervalMs??160,n=e.yieldSliceMax??e.yieldEvery??655360;if(!Number.isFinite(t)||t<0)throw new Error(`runAsync: yieldIntervalMs must be a non-negative finite number (received ${t})`);if(!Number.isFinite(n)||n<1)throw new Error(`runAsync: yieldSliceMax / yieldEvery must be a positive finite number (received ${n})`);const s=e.scheduler??(()=>new Promise(d=>{globalThis.setTimeout(d,0)})),o=typeof globalThis.performance<"u"&&typeof globalThis.performance.now=="function"?()=>globalThis.performance.now():()=>globalThis.Date.now();let a=0,p=0,c=!1;for(;this.queue.length>0&&!c;){const d=o(),l=t>0?d+t:d;for(;this.queue.length>0&&!c&&!(t>0&&o()>=l);){const _=a;if(a=this.runChunk(n,a),p+=a-_,e.onChunk?.({vmCyclesExecuted:p}),e.shouldContinue&&!e.shouldContinue()){c=!0;break}if(t===0)break}this.queue.length>0&&!c&&await s()}return{stack:this.stack.slice(),cancelled:c,vmCyclesExecuted:p}}trace({step:e,immediate:t,tag:n,value:s,stackBefore:o,stackAfter:a}){const p=this.takeStdoutSinceLastTraceForTraceEvent(),c=this.createTraceEvent(e,t,n,s,o,a,p);if(this.traceFormat==="jsonl"){this.writeTraceLine(JSON.stringify(c));return}this.writeTraceLine(this.formatHumanTrace(c))}createTraceEvent(e,t,n,s,o,a,p){const c=n===$,d=c?this.getName(s,String(s)):String(s),l=this.getQueuePreview(),_={step:e,immediate:t,tag:c?"call":"literal",value:String(s),action:d,stack_before:this.limitStack(o).map(String),stack_after:a?this.limitStack(a).map(String):void 0,queue_preview:l,queue_depth:this.queue.length/2};return p!==void 0&&p.length>0&&(_.stdout_since_last=p),_}limitStack(e){return e.length>this.traceStackMax?e.slice(-this.traceStackMax):e}getQueuePreview(){const e=[],t=Math.max(this.traceQueueMax,0);for(let n=0;n<this.queue.length&&e.length<t;n+=2){const s=this.queue[n]??0n,o=this.queue[n+1]??0n,a=s===$;e.push({tag:a?"call":"literal",value:String(o),action:a?this.getName(o,String(o)):String(o)})}return e}formatHumanTrace(e){const t=this.padHumanAction(e.action),n=this.formatHumanStack(e.stack_before),s=this.formatHumanQueue(e.queue_preview,e.queue_depth),o=this.layoutHumanTraceLine(e.step,n,t,s);if(this.traceVerbose){const a=this.formatHumanStack(e.stack_after??[]);return`${o}
${" ".repeat(String(e.step).length+1)}${a} | immediate=${e.immediate} tag=${e.tag} value=${e.value} stack_depth=${this.stack.length} queue_depth=${e.queue_depth}`}return o}padHumanAction(e){return e.length>=7?e:e.padStart(Math.floor((7+e.length)/2)," ").padEnd(7," ")}layoutHumanTraceLine(e,t,n,s){const o=this.getTraceTerminalWidth(),a=`${e} `;if(a.length>=o)return a.slice(0,o);const p=1,c=Math.min(n.length,Math.max(o-a.length-p*2,1)),d=Math.max(a.length+p,Math.floor((o-c)/2)),l=Math.min(d,Math.max(a.length+p,o-c-p)),_=l+c,m=a.length,v=Math.max(m,l-p),A=Math.min(o,_+p),Ce=o,re=Math.max(v-m,0),pe=Math.max(Ce-A,0),N=Array.from({length:o},()=>" ");if(this.writeSegment(N,0,a,a.length),this.writeSegment(N,l,n,c),re>0){const E=this.truncateLeft(t,re);this.writeSegment(N,v-E.length,E,E.length)}if(pe>0){const E=this.truncateRight(s,pe);this.writeSegment(N,A,E,E.length)}return N.join("").replace(/\s+$/,"")}formatHumanStack(e){return e.length===0?"[ ]":`[ ${e.join(" ")} ]`}formatHumanQueue(e,t){const n=e.map(o=>o.tag==="call"?`&${o.action}`:o.value),s=Math.max(t-e.length,0);return s>0&&n.push(`…(+${s})`),n.length===0?"[ ]":`[ ${n.join(" ")} ]`}getTraceTerminalWidth(){const t=globalThis.Deno,n=t?.stderr?.isTerminal?.()&&typeof t.stderr.rid=="number"?t.stderr.rid:t?.stdout?.isTerminal?.()&&typeof t.stdout.rid=="number"?t.stdout.rid:void 0;if(typeof n=="number")try{const a=t?.consoleSize?.(n).columns;if(typeof a=="number"&&a>0)return a}catch{}const s=globalThis.process,o=s?.stderr?.isTTY&&typeof s.stderr.columns=="number"?s.stderr.columns:s?.stdout?.isTTY&&typeof s.stdout.columns=="number"?s.stdout.columns:void 0;return typeof o=="number"&&o>0?o:120}truncateLeft(e,t){return t<=0?"":e.length<=t?e:t===1?"…":`…${e.slice(-(t-1))}`}truncateRight(e,t){return t<=0?"":e.length<=t?e:t===1?"…":`${e.slice(0,t-1)}…`}writeSegment(e,t,n,s){if(!(s<=0))for(let o=0;o<s&&o<n.length&&t+o<e.length;o++)e[t+o]=n[o]}writeTraceLine(e){const t=new TextEncoder().encode(`${e}
`);if(this.platform.io.writeError){this.platform.io.writeError(t);return}this.platform.io.write(t)}ioWriteStdout(e){this.traceOn&&this.traceFormat==="jsonl"&&(this.stdoutSinceLastTrace+=new TextDecoder().decode(e)),this.platform.io.write(e)}takeStdoutSinceLastTraceForTraceEvent(){if(this.traceFormat!=="jsonl")return;let e=this.stdoutSinceLastTrace;if(this.stdoutSinceLastTrace="",!e)return;const t=Math.max(0,this.traceStdoutMax);return t>0&&e.length>t&&(e=e.slice(0,t)+`
…[truncated]`),e}getName(e,t=String(e)){return this.symbols.has(e)?this.symbols.get(e):String(t)}inspectValue(e){const t=this.symbols.get(e),n=e>=0n&&e<=BigInt(C),s=this.defs.get(e),o=s!==void 0;let a;Array.isArray(s)&&(a=this.parseDefinitionTokens(s));let p,c;if(n){const d=At(Number(e));d&&(p=d.stackEffect,c=d.description)}return{value:e,name:t,isSystem:n,isDefined:o,definition:a,stackEffect:p,description:c}}parseDefinitionTokens(e){const t=[];for(let n=0;n<e.length;n+=2){const s=e[n]??0n,o=e[n+1]??0n,a=s===$,p=a?this.symbols.get(o):void 0,c=this.defs.has(o);t.push({value:o,tag:s,name:p,isCall:a,isDefined:c})}return t}print(){const e=this.stack.map(t=>t.toString(this.base)).join(" ");this.ioWriteStdout(new TextEncoder().encode(`[ ${e} ]
`))}loadSourceMap(e){Object.keys(e.symbols).forEach(t=>{this.symbols.set(BigInt(t),e.symbols[t])})}getNextAnonOp(){let e=this.nextAnonOp++;for(;this.defs.has(BigInt(e));)e=this.nextAnonOp++;return BigInt(e)}setup(){const e=new TextEncoder;let t;for(t in D)this.symbols.set(BigInt(D[t]),t);this.defineSystem(()=>{},r.NOP),this.defineSystem(()=>{const n=this.pop();this.callOp(n)},r.CALL),this.defineSystem(()=>{this.depth--;const[,n]=this.queuePop(),s=this.stack.splice(Number(n||0))||[];this.defineUser(s,this.pop())},r.DEF),this.defineSystem(()=>{this.depth--;const[,n]=this.queuePop(),s=this.stack.splice(Number(n||0))||[],o=this.getNextAnonOp();this.defineUser(s,o),this.depth>0&&this.push(0n),this.push(o)},r.KET),this.defineSystem(()=>{this.depth++;const n=this.stack.length;this.queuePush(P,BigInt(n))},r.BRA),this.defineSystem(()=>{this.depth++;const n=this.stack.length;this.queuePush(P,BigInt(n))},r.MARK),this.defineSystem(()=>this.clear(),r.CLR),this.defineSystem(()=>{const n=this.pop();this.platform.exit(Number(n))},r.EXIT),this.defineSystem(()=>{const n=this.pop();this.push(kt(n))},r.RAND),this.defineSystem(()=>{this.print()},r.PRN),this.defineSystem(()=>{this.push(BigInt(this.platform.now()))},r.CLOCK),this.defineSystem(()=>{const n=e.encode(String.fromCharCode(Number(this.pop())));this.ioWriteStdout(n)},r.PUTC),this.defineSystem(()=>{this.platform.io.setRaw&&this.platform.io.setRaw(!0);const n=this.platform.io.readByte();this.platform.io.setRaw&&this.platform.io.setRaw(!1),this.push(BigInt(n??0))},r.GETC),this.defineSystem(()=>{const n=e.encode(this.pop().toString(this.base));this.ioWriteStdout(n)},r.PUTN),this.defineSystem(()=>{this.pop()},r.DROP),this.defineSystem(()=>{const n=this.peek(),s=this.stack[this.stack.length-2];this.stack[this.stack.length-2]=n,this.poke(s)},r.SWAP),this.defineSystem(()=>{this.push(this.peek())},r.DUP),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]+=n},r.ADD),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]-=n},r.SUB),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]*=n},r.MUL),this.defineSystem(()=>{const n=this.pop();if(n===0n)throw new Error("DIV: Division by zero");this.stack[this.stack.length-1]/=n},r.DIV),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]%=n},r.MOD),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]<<=n},r.SHIFTL),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]>>=n},r.SHIFTR),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]&=n},r.AND),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]**=n},r.POW),this.defineSystem(()=>{this.push(this.pop()>this.pop()?1n:0n)},r.LT),this.defineSystem(()=>{this.push(this.pop()===this.pop()?1n:0n)},r.EQ),this.defineSystem(()=>{this.push(this.pop()<this.pop()?1n:0n)},r.GT),this.defineSystem(()=>{const n=this.pop();this.pop()!==0n&&this.queueUnshift($,n)},r.IF),this.defineSystem(()=>{this.queuePush(P,this.pop())},r.PUSHR),this.defineSystem(()=>{const[,n]=this.queuePop();this.push(n)},r.PULLR),this.defineSystem(()=>{this.push(BigInt(this.stack.length))},r.DEPTH),this.defineSystem(()=>{const n=this.stack.length;this.stack.splice(0,n).forEach(o=>this.queuePush(P,o)),this.queuePush(P,BigInt(n))},r.STASH),this.defineSystem(()=>{const[,n]=this.queuePop(),s=Number(n),o=[];for(let a=0;a<s;a++){const[,p]=this.queuePop();o.unshift(p)}this.stack.unshift(...o)},r.FETCH),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]|=n},r.OR),this.defineSystem(()=>{const n=this.pop();this.push(~n)},r.NOT),this.defineSystem(()=>{const n=this.pop(),o=[0n,this.pop(),1n,n],a=this.getNextAnonOp();this.defineUser(o,a),this.depth>0&&this.push(0n),this.push(a)},r.CONS)}printProfile(){console.log(),console.log("Profile:");const e=Object.keys(this.profile).map(s=>{const o=this.profile[s][0],a=this.profile[s][1];return{name:s,calls:o,time:a,system:typeof a<"u","ops/ms":a?Math.round(o/a):""}}).sort((s,o)=>o.calls-s.calls),t=e.filter(s=>s.system),n=e.filter(s=>!s.system);console.table(t,["name","calls","ops/ms"]),console.table(n,["name","calls"]),console.log()}printStats(){console.log(),console.log("Interpreter stats:"),console.log(this.stats),console.log()}}function kt(i){const e=i,t=e.toString().length;let n="";for(;n.length<t;)n+=Math.random().toString().split(".")[1];n=n.slice(0,t);const s="1"+"0".repeat(t);return e*BigInt(n)/BigInt(s)}const O=BigInt(r.DEF),te=BigInt(r.KET),M=BigInt(r.MARK),ne=BigInt(r.BRA),h=i=>(i=BigInt(i),e=>e.op===u.call&&e.value===i),b=i=>(i=BigInt(i),e=>e.op===u.push&&e.value===i),f=i=>i.op===u.push,X=i=>i.op===u.push&&i.value!==0n,qt=i=>i.op===u.push&&i.value>=0n,Tt=i=>i.op===u.call&&![ne,te,M,O].includes(i.value),Et=[{name:"No operation",pattern:[h(r.NOP)],replacement:()=>[]},{name:"Null Sequence - SWAP SWAP",pattern:[h(r.SWAP),h(r.SWAP)],replacement:()=>[]},{name:"Null Sequence - DUP DROP",pattern:[h(r.DUP),h(r.DROP)],replacement:()=>[]},{name:"Null Sequence - PUSHR PULLR",pattern:[h(r.PUSHR),h(r.PULLR)],replacement:()=>[]},{name:"Null Sequence - CLOCK DROP",pattern:[h(r.CLOCK),h(r.DROP)],replacement:()=>[]},{name:"Null Sequence - RAND DROP",pattern:[h(r.RAND),h(r.DROP)],replacement:()=>[]},{name:"Null Sequence - DEPTH DROP",pattern:[h(r.DEPTH),h(r.DROP)],replacement:()=>[]},{name:"Null Sequence - NOT NOT",pattern:[h(r.NOT),h(r.NOT)],replacement:()=>[]},{name:"Indirect calls - n EVAL",pattern:[f,h(r.CALL)],replacement:i=>[{op:u.call,value:i.value,meta:{name:i.meta?.name?.replace(/^&/,"")}}]},{name:"Null Sequence - n DROP",pattern:[f,h(r.DROP)],replacement:()=>[]},{name:"Constant Folding - a b ADD",pattern:[f,f,h(r.ADD)],replacement:(i,e)=>[{op:u.push,value:i.value+e.value}]},{name:"Algebraic Simplification - 0 ADD",pattern:[b(0),h(r.ADD)],replacement:()=>[]},{name:"Algebraic Simplification - swap ADD",pattern:[h(r.SWAP),h(r.ADD)],replacement:(i,e)=>[e]},{name:"Constant Folding - a b SUB",pattern:[f,f,h(r.SUB)],replacement:(i,e)=>[{op:u.push,value:i.value-e.value}]},{name:"Algebraic Simplification - 0 SUB",pattern:[b(0),h(r.SUB)],replacement:()=>[]},{name:"Constant Folding - a b MUL",pattern:[f,f,h(r.MUL)],replacement:(i,e)=>[{op:u.push,value:i.value*e.value}]},{name:"Algebraic Simplification - 1 MUL",pattern:[b(1),h(r.MUL)],replacement:()=>[]},{name:"Algebraic Simplification - swap MUL",pattern:[h(r.SWAP),h(r.MUL)],replacement:(i,e)=>[e]},{name:"Algebraic Simplification - swap AND",pattern:[h(r.SWAP),h(r.AND)],replacement:(i,e)=>[e]},{name:"Algebraic Simplification - swap OR",pattern:[h(r.SWAP),h(r.OR)],replacement:(i,e)=>[e]},{name:"Algebraic Simplification - swap EQ",pattern:[h(r.SWAP),h(r.EQ)],replacement:(i,e)=>[e]},{name:"Constant Folding - a b DIV",pattern:[f,X,h(r.DIV)],replacement:(i,e)=>[{op:u.push,value:i.value/e.value}]},{name:"Constant Folding - a b MOD",pattern:[f,X,h(r.MOD)],replacement:(i,e)=>[{op:u.push,value:i.value%e.value}]},{name:"Constant Folding - a b SHIFTL",pattern:[f,f,h(r.SHIFTL)],replacement:(i,e)=>[{op:u.push,value:i.value<<e.value}]},{name:"Constant Folding - a b SHIFTR",pattern:[f,f,h(r.SHIFTR)],replacement:(i,e)=>[{op:u.push,value:i.value>>e.value}]},{name:"Constant Folding - a b AND",pattern:[f,f,h(r.AND)],replacement:(i,e)=>[{op:u.push,value:i.value&e.value}]},{name:"Constant Folding - a b OR",pattern:[f,f,h(r.OR)],replacement:(i,e)=>[{op:u.push,value:i.value|e.value}]},{name:"Constant Folding - a NOT",pattern:[f,h(r.NOT)],replacement:i=>[{op:u.push,value:~i.value}]},{name:"Constant Folding - a b LT",pattern:[f,f,h(r.LT)],replacement:(i,e)=>[{op:u.push,value:i.value<e.value?1n:0n}]},{name:"Constant Folding - a b EQ",pattern:[f,f,h(r.EQ)],replacement:(i,e)=>[{op:u.push,value:i.value===e.value?1n:0n}]},{name:"Constant Folding - a b GT",pattern:[f,f,h(r.GT)],replacement:(i,e)=>[{op:u.push,value:i.value>e.value?1n:0n}]},{name:"Constant Folding - a b POW",pattern:[f,qt,h(r.POW)],replacement:(i,e)=>[{op:u.push,value:i.value**e.value}]},{name:"Algebraic Simplification - 0 OR",pattern:[b(0),h(r.OR)],replacement:()=>[]},{name:"Algebraic Simplification - 0 SHIFTL",pattern:[b(0),h(r.SHIFTL)],replacement:()=>[]},{name:"Algebraic Simplification - 0 SHIFTR",pattern:[b(0),h(r.SHIFTR)],replacement:()=>[]},{name:"Algebraic Simplification - 1 POW",pattern:[b(1),h(r.POW)],replacement:()=>[]},{name:"Algebraic Simplification - 1 DIV",pattern:[b(1),h(r.DIV)],replacement:()=>[]},{name:"Constant propagation - a DUP",pattern:[f,h(r.DUP)],replacement:i=>[i,i]},{name:"Unreachable Code - 0 &b IF",pattern:[b(0),f,h(r.IF)],replacement:()=>[]},{name:"Flows-Of-Control Optimizations - !0 &b IF",pattern:[X,f,h(r.IF)],replacement:(i,e,t)=>[{op:u.call,value:e.value,meta:{name:e.meta?.name?.replace(/^&/,"")}}]},{name:"Null Sequence - 0 eval",pattern:[b(0),h(r.CALL)],replacement:()=>[]},{name:"Empty List - [ ]",pattern:[h(r.BRA),h(r.KET)],replacement:()=>[{op:u.push,value:0n,meta:{pointer:!0,name:"0"}}]},{name:"Single-word Quote - [ word ]",pattern:[h(r.BRA),Tt,h(r.KET)],replacement:(i,e)=>[{op:u.push,value:e.value,meta:{pointer:!0,name:e.meta?.name}}]}];class Lt{constructor(){this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0},this.minOptPasses=2,this.maxOptPasses=20,this.defs=new Map,this.calledWords=new Set,this.optimized=[],this.nextAnonOp=C+1}optimize(e){this.reset(),this.stats.pre_optimization_ir_size=e.length,this.optimized=e;let t;do t=this.optimized.length,this.optLoop();while((this.optimized.length<t||this.stats.optimization_passes<this.minOptPasses)&&this.stats.optimization_passes<this.maxOptPasses);return this.optimized=this.pullDefs(this.optimized),this.optimized=this.addReferencedWords(this.optimized),this.stats.post_optimization_ir_size=this.optimized.length,this.optimized}optLoop(){this.optimized=this.peepholeOptimization(this.optimized),this.optimized=this.getDefs(this.optimized),this.optimized=this.inlineWords(this.optimized,4),this.stats.optimization_passes++}reset(){this.optimized=[],this.defs=new Map,this.calledWords=new Set,this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0}}getDefs(e){let t=0;for(;t<e.length;){const n=e[t];if(n.op===u.call){if(n.value===te){this.stats.optimization_passes===0&&this.stats.user_defined_anon_defs++,n.meta??={},n.meta.uid??=this.nextAnonOp++;let s=t;for(;s-- >0;){const c=e[s];if(c.op===u.call&&c.value===ne)break}const o=BigInt(n.meta.uid),a={op:u.push,value:o,meta:{pointer:!0}},p=e.slice(s,t+1);p.unshift(a),p[1]={...p[1],value:M,meta:{...p[1].meta,name:":"}},p[p.length-1]={...p[p.length-1],value:O,meta:{...p[p.length-1].meta,name:";"}},this.defs.set(o,p)}else if(n.value===O){this.stats.optimization_passes===0&&this.stats.user_defined_named_defs++;let s=t;for(;s-- >0;){const p=e[s];if(p.op===u.call&&p.value===M)break}const o=e[s-1];o.meta||={},o.meta.pointer=!0;const a=e.slice(s-1,t+1);this.defs.set(o.value,a)}}t++}return e}pullDefs(e,t=!1){const n=e.slice();let s=0;for(;s<n.length;){const o=n[s];if(o.op===u.call){if(o.value===te){o.meta??={},o.meta.uid??=this.nextAnonOp++;const a=s;for(;s-- >0;){const l=n[s];if(l.op===u.call&&l.value===ne)break}const p=BigInt(o.meta.uid),c={op:u.push,value:p,meta:{pointer:!0}},d=n.splice(s,a-s+1,c);d.unshift(c),d[1]={...d[1],value:M,meta:{...d[1].meta,name:":"}},d[d.length-1]={...d[d.length-1],value:O,meta:{...d[d.length-1].meta,name:";"}},this.defs.set(p,d)}else if(o.value===O&&!t){const a=s;for(;s-- >0;){const d=n[s];if(d.op===u.call&&d.value===M)break}const p=n[s-1];p.meta||={},p.meta.pointer=!0;const c=n.splice(s-1,a-s+2);s=s-2,this.defs.set(c[0].value,c)}}s++}return n}peepholeOptimization(e){const t=e.slice();for(;;){const n=this.stats.peephole_optimizations;let s=0;for(;s<t.length;){for(const o of Et){const{pattern:a,replacement:p}=o;if(s+a.length>t.length)continue;if(a.every((d,l)=>d(t[s+l]))){this.stats.peephole_optimizations++;const d=t.slice(s,s+a.length);t.splice(s,a.length,...p(...d)),s=Math.max(0,s-a.length-1);break}}s++}if(this.stats.peephole_optimizations===n)break}return t}inlineWords(e,t=1,n=[]){return e.flatMap(s=>{if(s.meta?.unsafe)return s;if(s.op===u.call&&this.defs.has(s.value)){if(n.includes(s.value))return s;const o=this.defs.get(s.value);if(!o)return s;const a=o[o.length-1];if(a.meta?.unsafe)return s;if(a.meta?.inline||s.meta?.inline)return this.stats.inlined_calls++,this.inlineWords(o.slice(2,-1),1/0,n.concat(s.value));if(o.length<=t+3)return this.stats.inlined_calls++,this.inlineWords(o.slice(2,-1),t,n.concat(s.value))}return s})}addReferencedWords(e){return e.slice().forEach(t=>{t.op===u.push&&t.meta?.pointer?this.addDef(t.value):t.op===u.call&&this.addDef(t.value)}),e}addDef(e){if(!this.calledWords.has(e)){const t=this.defs.get(e);if(t)return this.stats.post_optimization_user_defs++,this.calledWords.add(e),this.optimized.unshift(...t),this.addReferencedWords(t)}}}class F{constructor(e,t,n){this.imported=new Set,this.importPrefixes=new Map,this.macroPreludeReady=!1,this.rootFilename=null,this.host=e,this.engine=t.engine,this.compiler=t.compiler||new I,this.stdlibRoots=n?.stdlibRoots??[],n?.macroEngineBootstrapFile&&this.bootstrapMacroEngine(n.macroEngineBootstrapFile)}static tokenize(e){return e.split(/[\r\n]+/)}preprocess(e,t="-"){const n=t!=="-"&&this.host.fileExists(t)?this.host.realpath(t):t,s=this.rootFilename===null;s&&n!=="-"&&(this.rootFilename=n);try{return this.preprocessLines(e,n)}finally{s&&(this.rootFilename=null)}}preprocessLines(e,t,n){return e.map(s=>{if(s.length>1&&s[0]==="."){const[o,...a]=s.split(" ");if(o[0]==="."&&o.length>1){switch(o){case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Preprocessor: .exit requires a host exit handler");case".load":{const p=this.findFile(a.join(" "),t),c=this.host.readTextFile(p);return this.preprocessLines(F.tokenize(c),p)}case".import":{const p=this.findFile(a.join(" "),t);if(!this.imported.has(p)){this.imported.add(p);const c=this.host.readTextFile(p);return this.preprocessLines(F.tokenize(c),p,p)}return""}case".m":return this.runMacro(a.join(" "),s);case".ff":return this.runMacro(a.join(" "),s);case".ffp":{if(!this.macroPreludeReady)throw new Error("Preprocessor: .ffp requires prelude-enabled macro context");return this.runMacro(a.join(" "),s)}}return""}}return n?this.mangleImportedLine(s,n):s}).join(`
`)}findFile(e,t="-"){const n=e.trim();if(!n)throw new Error("Preprocessor: missing import path");return this.isStdlibImport(n)?this.resolveStdlibImport(n):this.resolveFilesystemImport(n,t)}isStdlibImport(e){return e.startsWith("<")&&e.endsWith(">")&&e.length>2}resolveFilesystemImport(e,t){if(t&&t!=="-"&&!this.host.path.isAbsolute(e)){const s=this.host.path.dirname(t),o=this.host.path.resolve(s,e),a=this.resolveFileOrDirectory(o);if(a)return a}const n=this.resolveFileOrDirectory(e);if(n)return n;throw new Error(`File not found: "${e}"`)}resolveStdlibImport(e){const t=e.slice(1,-1).trim(),n=[];for(const o of this.stdlibRoots){n.push(o);const a=this.host.path.resolve(o,t),p=this.resolveFileOrDirectory(a,{extensions:[".ffp",".ff"]});if(p)return p}const s=n.length>0?n.join(", "):"(no stdlib roots configured)";throw new Error(`Stdlib import not found: ${e} (searched roots: ${s})`)}resolveFileOrDirectory(e,t){if(this.host.fileExists(e))return this.host.realpath(e);for(const n of t?.extensions??[]){const s=`${e}${n}`;if(this.host.fileExists(s))return this.host.realpath(s)}if(this.host.directoryExists(e)){const n=this.getBasename(e);for(const s of[".ffp",".ff"]){const o=this.host.path.resolve(e,`${n}${s}`);if(this.host.fileExists(o))return this.host.realpath(o)}}return null}getBasename(e){const t=e.replace(/[\\/]+$/,""),n=t.split(/[\\/]+/).filter(Boolean);return n[n.length-1]??t}bootstrapMacroEngine(e){const t=this.findFile(e),n=this.host.readTextFile(t),o=new F(this.host,{engine:this.engine,compiler:this.compiler},{stdlibRoots:this.stdlibRoots}).preprocess(F.tokenize(n),t),a=this.compiler.compileToIR(I.tokenize(o),t);this.engine.loadIR(a),this.engine.run(),this.engine.clear(),this.macroPreludeReady=!0}runMacro(e,t){const n=this.compiler.compileToIR(I.tokenize(e));this.engine.loadIR(n),this.engine.run();const s=this.engine.getStack();return this.engine.clear(),s.map(String).join(" ")+` /* ${t} */`}mangleImportedLine(e,t){const n=this.getImportPrefix(t);return e.split(/(\s+)/).map(s=>!s||/\s+/.test(s)?s:this.mangleImportedToken(s,n)).join("")}mangleImportedToken(e,t){return e.startsWith("[__")?`[${t}${e.slice(3)}`:e.startsWith("__")?`${t}${e.slice(2)}`:e}getImportPrefix(e){const t=this.importPrefixes.get(e);if(t)return t;const s=this.getNormalizedImportPath(e).replace(/[^A-Za-z0-9]+/g,"_").replace(/^_+|_+$/g,"").replace(/_+/g,"_")||"module",o=this.hashPath(e),a=`__${s}_${o}__`;return this.importPrefixes.set(e,a),a}getNormalizedImportPath(e){if(this.rootFilename&&this.rootFilename!=="-"){const t=this.host.path.dirname(this.rootFilename),n=this.host.path.relative(t,e);if(n)return n.replace(/\\/g,"/")}return e.replace(/\\/g,"/")}hashPath(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619)>>>0;return t.toString(36)}}const Ht=`/* constants 1 2 3 */
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
`,Ut=`.import ./num.ffp

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
`,Wt=`.import ./pred.ffp

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
`,Kt=`.import ./atan-shared.ffp

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
`,Vt=`.import ./arith.ffp
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
`,jt=`.import ./atan-shared.ffp
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
`,Qt=`.import ./atan-shared.ffp

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
`,Gt=`.import ./atan-shared.ffp
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
`,Yt=`.import ./arith.ffp

/*
 * Naming note: the \`i\` prefix means integer.
 * \`icbrt\` returns the integer cube root (truncated toward zero).
 */

__closer: dup2 2 ^ / over 2 * + 3 / ;
__loop: __closer dup2 > [ nip __loop ] ? ;
__cbrtn: dup 3 / __loop drop nip ;

icbrt: dup sgn swap over * dup 1 > [ __cbrtn ] ? * ; /* x icbrt == ⌊cbrt(x)⌋₀ */
`,Xt=`
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
`,Zt=`.import ../core/core.ff

__t: tuck % dup [ __t ] ? ;

gcd: dup [ __t ] ? drop ;
lcm: dup2 gcd / * ;
`,Jt=`.import ../core/core.ff
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
`,en=`.import ./pred.ffp
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
`,tn=`.import ../core/core.ff

/* Logarithm and combinatorics */

!: dup [ dup -- ! * ] [ drop 1 ] branch ; /* n ! == n! */
nck: dup2 - ! swap ! * [ ! ] dip / ; /* n k nck == C(n,k) */

/* Knuth operators */

^^: -- dup [ [ dup ] swap times [ ^ ] ] dip times ;
^^^: -- dup [ [ dup ] swap times [ ^^ ] ] dip times ;
`,nn=`.import ./atan-core.ffp

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
`,sn=`.import ../core/core.ff
.import ./arith.ffp

/* Internal precision helpers shared by variable-precision math words. */
n->S: 10 swap ^ ; /* n n->S == 10ⁿ */
n->S2: 2 * n->S ; /* n n->S2 == 10²ⁿ */
n->K: 6 * 4 + 5 / 10 + ; /* n n->K == ⌈6*n/5⌉+10 */
p/q*S: n->S swap rot * swap / ; /* p q n p/q*S == ⌊p*10ⁿ/q⌋₀ */

ntrunc: n->S / ; /* x n ntrunc == ⌊x/10ⁿ⌋₀ */
nfrac: [ abs ] dip n->S % ; /* x n nfrac == (x - ⌊x/10ⁿ⌋₀)*10ⁿ */
`,an=`.import ../core/core.ff

/* Predicates */

negitive?: 0 < ; /* n negitive? == flag */
positive?: 0 > ; /* n positive? == flag */
divisor?: % zero? ; .inline /* n d divisor? == flag */
even?: 2 divisor? ; .inline /* n even? == flag */
odd?: even? not ; .inline /* n odd? == flag */
`,on=`.import ./pred.ffp

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
`,rn=`.import ../core/core.ff
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
`,pn=`.import ../core/core.ff
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
`,cn=`/* Trigonometric words live here. Pi-derived constants are defined in pi.ffp. */
`,ln=`.import ./core/core.ff
.import ./math/math.ffp
.import ./string/string.ffp
.import ./seq/seq.ffp
.import ./time/time.ffp`,dn=`.import ../core/core.ff

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
`,hn=`.import ../core/core.ff

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
`,un=`/* String output */

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
`,_n=`.import char.ffp
.import str.ffp`,fn=`.import ./core/core.ff
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
`,mn=`.import ./core/core.ff
.import ./string/string.ffp

assert: falsey? [ 0 10 'Failed' println .inline 1 exit ] ? ;
assert_eq: = assert .inline ;
assert_false: not assert .inline ;

OK: 0 '\\sOK' println clr ;

¶: clr 999 ;`,gn=`.import ./utc.ffp
`,vn=`.import ../core/core.ff
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
`;function x(i){const e=i.startsWith("/"),t=i.split("/").filter(Boolean),n=[];for(const s of t)if(s!=="."){if(s===".."){n.pop();continue}n.push(s)}return`${e?"/":""}${n.join("/")}`||(e?"/":".")}function Pt(i){const e=x(i),t=e.lastIndexOf("/");return t<=0?e.startsWith("/")?"/":".":e.slice(0,t)}function $t(...i){const e=i.filter(Boolean).join("/").replaceAll(/\/+/g,"/");return x(e)}function Ct(i,e){const t=x(i).split("/").filter(Boolean),n=x(e).split("/").filter(Boolean);let s=0;for(;s<t.length&&s<n.length&&t[s]===n[s];)s++;const o=t.length-s,a=n.slice(s);return Array(o).fill("..").concat(a).join("/")||"."}function bn(i){return{readTextFile(e){const t=x(e),n=i[t];if(typeof n!="string")throw new Error(`Virtual file not found: ${t}`);return n},fileExists(e){return typeof i[x(e)]=="string"},directoryExists(e){const t=x(e).replace(/\/+$/,""),n=t==="/"?"/":`${t}/`;return Object.keys(i).some(s=>s.startsWith(n))},realpath(e){return x(e)},path:{isAbsolute(e){return e.startsWith("/")},dirname:Pt,relative:Ct,resolve:$t}}}function yn(i={}){const e=new TextDecoder,t=new TextEncoder,n=Array.from(t.encode(i.stdin??""));return{io:{write(s){i.onWrite?.(e.decode(s))},readByte(){return n.shift()??null}},exit(s){i.onExit?.(s)},now(){return Date.now()}}}export{g as A,jt as B,Vt as C,Dt as D,H as E,Kt as F,Wt as G,Ut as H,Ht as I,yn as J,I as K,zt as L,bn as M,Ot as N,Mt as O,F as P,Lt as Q,Ft as R,vn as _,Bt as a,Rt as b,gn as c,mn as d,fn as e,_n as f,un as g,hn as h,dn as i,ln as j,cn as k,pn as l,rn as m,on as n,an as o,sn as p,nn as q,tn as r,Nt as s,en as t,Jt as u,Zt as v,Xt as w,Yt as x,Gt as y,Qt as z};
