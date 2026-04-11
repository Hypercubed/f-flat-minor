import{R as k}from"./run-feedback.Ug3xFfrM.js";const se=globalThis,ce=i=>i,j=se.trustedTypes,le=j?j.createPolicy("lit-html",{createHTML:i=>i}):void 0,be="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,ye="?"+w,Ie=`<${ye}>`,T=document,z=()=>T.createComment(""),L=i=>i===null||typeof i!="object"&&typeof i!="function",ie=Array.isArray,Re=i=>ie(i)||typeof i?.[Symbol.iterator]=="function",G=`[ 	
\f\r]`,B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,de=/-->/g,he=/>/g,S=RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ue=/'/g,_e=/"/g,we=/^(?:script|style|textarea|title)$/i,De=i=>(e,...n)=>({_$litType$:i,strings:e,values:n}),Dn=De(1),H=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),fe=new WeakMap,q=T.createTreeWalker(T,129);function xe(i,e){if(!ie(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return le!==void 0?le.createHTML(e):e}const Ne=(i,e)=>{const n=i.length-1,t=[];let s,o=e===2?"<svg>":e===3?"<math>":"",a=B;for(let p=0;p<n;p++){const c=i[p];let d,l,_=-1,m=0;for(;m<c.length&&(a.lastIndex=m,l=a.exec(c),l!==null);)m=a.lastIndex,a===B?l[1]==="!--"?a=de:l[1]!==void 0?a=he:l[2]!==void 0?(we.test(l[2])&&(s=RegExp("</"+l[2],"g")),a=S):l[3]!==void 0&&(a=S):a===S?l[0]===">"?(a=s??B,_=-1):l[1]===void 0?_=-2:(_=a.lastIndex-l[2].length,d=l[1],a=l[3]===void 0?S:l[3]==='"'?_e:ue):a===_e||a===ue?a=S:a===de||a===he?a=B:(a=S,s=void 0);const v=a===S&&i[p+1].startsWith("/>")?" ":"";o+=a===B?c+Ie:_>=0?(t.push(d),c.slice(0,_)+be+c.slice(_)+w+v):c+w+(_===-2?p:v)}return[xe(i,o+(i[n]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),t]};class U{constructor({strings:e,_$litType$:n},t){let s;this.parts=[];let o=0,a=0;const p=e.length-1,c=this.parts,[d,l]=Ne(e,n);if(this.el=U.createElement(d,t),q.currentNode=this.el.content,n===2||n===3){const _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=q.nextNode())!==null&&c.length<p;){if(s.nodeType===1){if(s.hasAttributes())for(const _ of s.getAttributeNames())if(_.endsWith(be)){const m=l[a++],v=s.getAttribute(_).split(w),A=/([.?@])?(.*)/.exec(m);c.push({type:1,index:o,name:A[2],strings:v,ctor:A[1]==="."?Oe:A[1]==="?"?Me:A[1]==="@"?Fe:Q}),s.removeAttribute(_)}else _.startsWith(w)&&(c.push({type:6,index:o}),s.removeAttribute(_));if(we.test(s.tagName)){const _=s.textContent.split(w),m=_.length-1;if(m>0){s.textContent=j?j.emptyScript:"";for(let v=0;v<m;v++)s.append(_[v],z()),q.nextNode(),c.push({type:2,index:++o});s.append(_[m],z())}}}else if(s.nodeType===8)if(s.data===ye)c.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(w,_+1))!==-1;)c.push({type:7,index:o}),_+=w.length-1}o++}}static createElement(e,n){const t=T.createElement("template");return t.innerHTML=e,t}}function R(i,e,n=i,t){if(e===H)return e;let s=t!==void 0?n._$Co?.[t]:n._$Cl;const o=L(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(i),s._$AT(i,n,t)),t!==void 0?(n._$Co??=[])[t]=s:n._$Cl=s),s!==void 0&&(e=R(i,s._$AS(i,e.values),s,t)),e}class Be{constructor(e,n){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:n},parts:t}=this._$AD,s=(e?.creationScope??T).importNode(n,!0);q.currentNode=s;let o=q.nextNode(),a=0,p=0,c=t[0];for(;c!==void 0;){if(a===c.index){let d;c.type===2?d=new W(o,o.nextSibling,this,e):c.type===1?d=new c.ctor(o,c.name,c.strings,this,e):c.type===6&&(d=new ze(o,this,e)),this._$AV.push(d),c=t[++p]}a!==c?.index&&(o=q.nextNode(),a++)}return q.currentNode=T,s}p(e){let n=0;for(const t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(e,t,n),n+=t.strings.length-2):t._$AI(e[n])),n++}}class W{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,n,t,s){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=t,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&e?.nodeType===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=R(this,e,n),L(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==H&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Re(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==g&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){const{values:n,_$litType$:t}=e,s=typeof t=="number"?this._$AC(e):(t.el===void 0&&(t.el=U.createElement(xe(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===s)this._$AH.p(n);else{const o=new Be(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(e){let n=fe.get(e.strings);return n===void 0&&fe.set(e.strings,n=new U(e)),n}k(e){ie(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let t,s=0;for(const o of e)s===n.length?n.push(t=new W(this.O(z()),this.O(z()),this,this.options)):t=n[s],t._$AI(o),s++;s<n.length&&(this._$AR(t&&t._$AB.nextSibling,s),n.length=s)}_$AR(e=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);e!==this._$AB;){const t=ce(e).nextSibling;ce(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,n,t,s,o){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=n,this._$AM=s,this.options=o,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=g}_$AI(e,n=this,t,s){const o=this.strings;let a=!1;if(o===void 0)e=R(this,e,n,0),a=!L(e)||e!==this._$AH&&e!==H,a&&(this._$AH=e);else{const p=e;let c,d;for(e=o[0],c=0;c<o.length-1;c++)d=R(this,p[t+c],n,c),d===H&&(d=this._$AH[c]),a||=!L(d)||d!==this._$AH[c],d===g?e=g:e!==g&&(e+=(d??"")+o[c+1]),this._$AH[c]=d}a&&!s&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Oe extends Q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}}class Me extends Q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}}class Fe extends Q{constructor(e,n,t,s,o){super(e,n,t,s,o),this.type=5}_$AI(e,n=this){if((e=R(this,e,n,0)??g)===H)return;const t=this._$AH,s=e===g&&t!==g||e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive,o=e!==g&&(t===g||s);s&&this.element.removeEventListener(this.name,this,t),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ze{constructor(e,n,t){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(e){R(this,e)}}const Le=se.litHtmlPolyfillSupport;Le?.(U,W),(se.litHtmlVersions??=[]).push("3.3.2");const Nn=(i,e,n)=>{const t=e;let s=t._$litPart$;return s===void 0&&(t._$litPart$=s=new W(e.insertBefore(z(),null),null,void 0,{})),s._$AI(i),s};let me=null;function He(){return me??=new AudioContext,me}const ge=[329.6275569128699,391.99543598174927,493.8833013781249],Ue=10,We=420,Ke=3;let K=null,V=null,Z=!1;function J(){K!==null&&(clearInterval(K),K=null),V=null}function Bn(i){if(J(),!k.enabled||(Z=!0,window.matchMedia("(prefers-reduced-motion: reduce)").matches))return;V=i;const e=()=>{if(!k.enabled){J();return}V&&je(V,Ke)};e(),K=setInterval(e,We)}function On(){const i=Z;Z=!1,J(),i&&Ae()}function Ae(){if(k.enabled)try{const i=He();i.resume().then(()=>{const e=i.currentTime,n=.42,t=.09;for(let s=0;s<ge.length;s++){const o=ge[s],a=i.createOscillator(),p=i.createGain();a.type="triangle",a.frequency.setValueAtTime(o,e),p.gain.setValueAtTime(0,e),p.gain.linearRampToValueAtTime(t,e+.018+s*.012),p.gain.exponentialRampToValueAtTime(8e-4,e+n),a.connect(p),p.connect(i.destination),a.start(e),a.stop(e+n+.06)}})}catch{}}function Se(i){return!(i.isComposing||i.metaKey||i.ctrlKey||i.altKey||i.key==="Tab"||i.key==="Escape"||i.key==="ArrowUp"||i.key==="ArrowDown"||i.repeat)}function Mn(i,e){if(!k.enabled||i.disabled||!Se(e))return;const{x:n,y:t}=Ve(i);ae(n,t,{centerOnPoint:!0}),e.key==="Enter"&&Ae()}function Fn(i,e){if(!k.enabled||!Se(e))return;const n=i.state.selection.main.head,t=i.coordsAtPos(n);if(!t)return;const s=t.left,o=(t.top+t.bottom)/2;ae(s,o,{centerOnPoint:!0})}function Ve(i){const e=i.getBoundingClientRect(),n=window.getComputedStyle(i),t=parseFloat(n.borderLeftWidth)||0,s=parseFloat(n.paddingLeft)||0,o=i.selectionStart??0,a=document.createElement("span");a.setAttribute("aria-hidden","true"),a.style.visibility="hidden",a.style.position="absolute",a.style.whiteSpace="pre",a.style.top="0",a.style.left="0",a.style.font=n.font,a.style.fontSize=n.fontSize,a.style.fontFamily=n.fontFamily,a.style.fontWeight=n.fontWeight,a.style.letterSpacing=n.letterSpacing,a.style.fontVariant=n.fontVariant,a.style.textTransform=n.textTransform,a.textContent=i.value.slice(0,o),document.body.appendChild(a);const p=a.offsetWidth;a.remove();const c=e.left+t+s+p-i.scrollLeft,d=e.top+e.height/2;return{x:c,y:d}}function ae(i,e,n){if(!k.enabled||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const t=document.createElement("span");t.className="run-flat-anchor",t.style.left=`${i}px`,t.style.top=`${e}px`,n?.centerOnPoint&&(t.style.transform="translate(-50%, -50%)");const s=document.createElement("span");s.className="run-flat-particle",s.setAttribute("aria-hidden","true"),s.textContent="♭",n?.animationDelay&&(s.style.animationDelay=n.animationDelay);const o=(Math.random()-.5)*2.25,a=-6+Math.random()*12,p=a+8+Math.random()*10;s.style.setProperty("--drift-x",`${o}rem`),s.style.setProperty("--rot-0",`${a}deg`),s.style.setProperty("--rot-1",`${p}deg`),t.appendChild(s),document.body.appendChild(t),s.addEventListener("animationend",()=>{t.remove()},{once:!0})}function je(i,e=Ue){if(!k.enabled||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const n=i.getBoundingClientRect();if(!(n.width<=0||n.height<=0))for(let t=0;t<e;t++){const s=n.left+Math.random()*n.width,o=n.top+n.height*(.35+Math.random()*.35);ae(s,o,{animationDelay:`${t*.045}s`})}}function Qe(){return!!(globalThis.Deno?.stdout?.isTerminal?.()??globalThis.process?.stdout?.isTTY??!1)}function oe(i,e){return Qe()?`\x1B[${i}m${e}\x1B[0m`:e}function Ge(i){return oe(34,i)}function Ye(i){return oe(32,i)}function y(i){return oe(36,i)}const r={NOP:0,CALL:1,PUTC:2,GETC:3,PUTN:5,CLOCK:6,DROP:8,PUSHR:14,PULLR:15,SHIFTL:16,SHIFTR:17,CLR:24,RAND:26,EXIT:27,DUP:33,DEPTH:35,SWAP:36,MOD:37,AND:38,STASH:40,FETCH:41,MUL:42,ADD:43,CONS:44,SUB:45,PRN:46,DIV:47,MARK:58,DEF:59,LT:60,EQ:61,GT:62,IF:63,BRA:91,KET:93,POW:94,OR:124,NOT:126},D={nop:r.NOP,eval:r.CALL,";":r.DEF,":":r.MARK,clr:r.CLR,rand:r.RAND,exit:r.EXIT,".":r.PRN,putc:r.PUTC,getc:r.GETC,putn:r.PUTN,clock:r.CLOCK,drop:r.DROP,swap:r.SWAP,dup:r.DUP,"<<":r.SHIFTL,">>":r.SHIFTR,"+":r.ADD,"-":r.SUB,cons:r.CONS,"*":r.MUL,"/":r.DIV,"<":r.LT,"=":r.EQ,">":r.GT,"?":r.IF,"%":r.MOD,"&":r.AND,"(":r.STASH,")":r.FETCH,"q<":r.PUSHR,"q>":r.PULLR,depth:r.DEPTH,"^":r.POW,"[":r.BRA,"]":r.KET,"|":r.OR,"~":r.NOT},C=255,Xe=i=>i,Ze=i=>i,u={call:"call",push:"push"},Je=6,ee=10,en=new Map([[BigInt(r.MARK),":"],[BigInt(r.DEF),";"],[BigInt(r.BRA),"["],[BigInt(r.KET),"]"]]);function nn(i){return(""+i.value).padEnd(ee," ")}function tn(i,e){return e?e.padEnd(ee," "):i.op===u.push&&i.meta?.pointer?`[${i.value}]`.padEnd(ee," "):nn(i)}function sn(i){return i.trim()?`/* ${i} */`:""}function an(i){const e=rn(i)?.toUpperCase()||"",n=i.op===u.call?en.get(i.value):void 0,t=n!==void 0,s=tn(i,n),o=i.meta?.comment?.trim()||(i.op===u.call&&!t?e:""),a=(i.op===u.call&&!n?"EVAL":"").padEnd(Je," ");return[Ze(s),Xe(a),sn(o)].join(" ")}function on(i){for(const e in D)if(D[e]===i)return e;return""}function rn(i){if(i.op===u.call||i.op===u.push&&i.meta?.pointer)return i.meta?.name||on(Number(i.value))||""}function zn(i){return i.map(an).join(`
`)}function pn(i){return i=i.replace(/\\U([A-Fa-f0-9]{8})/g,(e,n)=>ve(n)),i=i.replace(/\\u([A-Fa-f0-9]{4})/g,(e,n)=>ve(n)),i.replace(/\\0/g,"\0").replace(/\\b/g,"\b").replace(/\\t/g,"	").replace(/\\n/g,`
`).replace(/\\v/g,"\v").replace(/\\f/g,"\f").replace(/\\r/g,"\r").replace(/\\'/g,"'").replace(/\\"/g,'"').replace(/\\s/g," ").replace(/\\\\/g,"\\")}function ve(i){let e="",n=parseInt(i,16);return n<=65535?e+=String.fromCharCode(n):n<=1114111?(n-=65536,e+=String.fromCharCode(55296|n>>10)+String.fromCharCode(56320|n&1023)):e+=`hex2Char error: Code point out of range: ${cn(n)}`,e}function cn(i){return(i+0).toString(16).toUpperCase()}const qe="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",ke=new Map;qe.split("").forEach(function(i,e){ke.set(i,e)});const ln=5n,Te=1n<<ln,Ee=Number(Te),Pe=Te-1n;function dn(i){return i.map(fn).map(mn).join("")}function hn(i){return vn(gn(i)).map(bn)}function un(i){return i>=0n?i<<1n:(-i<<1n)+1n}function _n(i){return i&1n?-(i>>1n):i>>1n}function fn(i){if(i===0n)return[0];i=un(i);const e=[];for(;i>0;){let n=Number(i&Pe);i>>=5n,i>0&&(n|=Ee),e.push(n)}return e}function mn(i){return i.map(e=>qe[e]).join("")}function gn(i){return i.split("").map(e=>{const n=ke.get(e);if(n===void 0)throw new Error(`${i} is not a valid base64 encoded VLQ`);return n})}function vn(i){const e=[];let n=[];if(i.forEach(t=>{n.push(t),(t&Ee)===0&&(e.push(n),n=[])}),n.length>0)throw new Error("Malformed VLQ sequence: The last VLQ never ended.");return e}function bn(i){const e=i.reverse().reduce((n,t)=>(n<<=5n,n|=BigInt(t)&Pe,n),0n);return _n(e)}const yn="/*",wn="*/";function Y(i){if(!(i==="-"||i==="+"))try{let e=1n;return i=i.replaceAll("_",""),i.startsWith("-0")&&(e=-1n,i=i.replace("-","")),i.includes("e")||i.includes("E")?e*BigInt(+i):e*BigInt(i)}catch{return}}class I{constructor(e={}){this.symbols=new Map,this._nextCode=-1,this.host=e;let n;for(n in D)this.symbols.set(n,BigInt(D[n]))}static tokenize(e){return e.split(/\s+/).filter(Boolean).map(n=>{const t=Y(n);return t!==void 0?t:n})}static tokenizeWithSpans(e){const n=[],t=/\S+/g;let s=0,o=0,a=0;const p=d=>{for(;a<d;){const l=e[a];l==="\r"?(e[a+1]===`
`&&a++,s++,o=0):l===`
`?(s++,o=0):o++,a++}};let c;for(;(c=t.exec(e))!==null;){const d=c.index;p(d);const l=c[0]??"",_=Y(l);n.push({raw:l,value:_!==void 0?_:l,line:s,character:o,length:l.length,offset:d}),p(d+l.length)}return n}static compileToBase64(e){const n=e.flatMap(t=>{if(t.op===u.call&&t.value===0n)return[];const s=t.value<<1n;return[t.op===u.push?s:s|1n]});return dn(n)}nextCode(){return BigInt(this._nextCode--)}getSymbol(e){e=e.toLowerCase();let n=this.symbols.get(e);return n===void 0&&(n=this.nextCode(),this.symbols.set(e,n)),n}compileToIR(e,n=""){let t=0;const s=e.length;let o="";const a=[];let p;for(;t<s;)if(p=e[t++],o=this.unwrapTokenValue(p),typeof o=="bigint")c(o);else if(o.length>1&&o.startsWith(".")){const[l]=o.split(" ");switch(l){case".push":a[a.length-1].op=u.push;break;case".call":a[a.length-1].op=u.call;break;case".inline":a[a.length-1].meta||={},a[a.length-1].meta.inline=!0;break;case".unsafe":a[a.length-1].meta||={},a[a.length-1].meta.unsafe=!0;break;case".pointer":a[a.length-1].meta||={},a[a.length-1].meta.pointer=!0;break;case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Compiler: .exit requires a host exit handler");case".symbols":this.symbols.forEach((_,m)=>{(this.host.log||console.log)(m,_)});break;case".words":{const _=Array.from(this.symbols,([m])=>m).join(" ");(this.host.log||console.log)(_);break}}}else if(o[0]==="'"&&o.length>1)pn(o).replace(/^'/,"").replace(/'$/,"").split("").forEach(l=>{c(l.charCodeAt(0),{comment:l})});else if(o.endsWith(":")&&o.length>1){const l=o.replace(/:$/,"");c(this.getSymbol(l),{name:`${l}`,pointer:!0}),d(r.MARK,{name:":"})}else if(o===yn){const l=p,_=[];for(;t<e.length&&(p=e[t++],o=this.unwrapTokenValue(p),o!==wn);)_.push(o);d(0n,{comment:_.join(" ")},l)}else if(o.startsWith("[")&&o.endsWith("]")){const l=o.replace(/^\[/,"").replace(/\]$/,""),_=Y(l);_!==void 0?c(_,{name:l,pointer:!0}):c(this.getSymbol(l),{name:l,pointer:!0})}else d(this.getSymbol(o),{name:o});return a;function c(l,_={},m=p){a.push({value:BigInt(l),op:u.push,meta:{..._,...I.toInstructionMeta(m,n)}})}function d(l,_={},m=p){a.push({value:BigInt(l),op:u.call,meta:{..._,...I.toInstructionMeta(m,n)}})}}unwrapTokenValue(e){return typeof e=="string"||typeof e=="bigint"?e:e.value}static toInstructionMeta(e,n){return!e||typeof e=="string"||typeof e=="bigint"?{filename:n}:{filename:n,line:e.line,character:e.character,length:e.length,offset:e.offset}}validate(e){const n=e.slice(),t=[];let s=0;for(;s<n.length;){const o=n[s];if(o.op===u.call&&o.value===BigInt(r.DEF)){let a=0;for(a=s;a>0&&!(n[a].op===u.call&&n[a].value===BigInt(r.MARK));a--);const p=n.splice(a-1,s-a+2);p.at(-1)?.meta?.unsafe||t.push(...this.validateDef(p)),s=a-1}s++}return t.push(...this.validateDef(n,"main")),t}validateDef(e,n){const t=[];let s=0,o=0,a=0,p=0;const c=[0];if(!e[0])return[];n=Ye(n||e[0].meta?.name?.replace(/^&/,"")||"main");const d=Ge(e[0].meta?.filename||"-");for(;s<e.length;){const l=e[s];if(l.op===u.call){if(l.op===u.call&&l.value===BigInt(r.MARK)&&o++,l.op===u.call&&l.value===BigInt(r.DEF)&&o--,l.op===u.call&&l.value===BigInt(r.BRA)&&(a++,c.push(0)),l.op===u.call&&l.value===BigInt(r.KET)&&(a--,(c.length>1?c.pop():0)!==0&&t.push(`${d}: Unbalanced queue push ( ${y("q< q>")} ) in quote in ${n}`)),l.op===u.call&&(l.value===BigInt(r.PUSHR)||l.value===BigInt(r.STASH))&&(p++,c[c.length-1]++),l.op===u.call&&(l.value===BigInt(r.PULLR)||l.value===BigInt(r.FETCH))){if(c[c.length-1]===0){const m=l.value===BigInt(r.FETCH)?")":"q>";t.push(`${d}: Queue borrow ( ${y(m)} ) requires ${y(".unsafe")} in ${n} (including quotes)`)}p--,c[c.length-1]--}a<0&&t.push(`${d}: Bracket ( ${y("[ ]")} ) mismatch in ${n}`),o<0&&t.push(`${d}: Definition ( ${y(": ;")} ) mismatch in ${n}`)}s++}return a!==0&&t.push(`${d}: Unbalanced brackets ( ${y("[ ]")} ) in ${n}`),p!==0&&t.push(`${d}: Unbalanced queue push ( ${y("q< q> ( )")} ) in ${n}`),o!==0&&t.push(`${d}: Unbalanced definition ( ${y(": ;")} ) in ${n}`),t}}const xn=[{mnemonic:"NOP",syntax:"nop",stackEffect:"… nop == …",description:"No operation; does nothing.",opcode:0},{mnemonic:"EVAL",syntax:"eval",stackEffect:"[A] eval == a*",description:"Evaluates a quotation, executing its contents.",opcode:1},{mnemonic:"PUTC",syntax:"putc",stackEffect:"n putc == {prints char(n)}",description:"Prints a character given by its numeric code.",opcode:2},{mnemonic:"GETC",syntax:"getc",stackEffect:"getc == n {reads char}",description:"Reads a single character from input and pushes its code.",opcode:3},{mnemonic:"PUTN",syntax:"putn",stackEffect:"n putn == {prints n}",description:"Prints a number to output.",opcode:5},{mnemonic:"CLOCK",syntax:"clock",stackEffect:"clock == n {reads clock}",description:"Returns the current time as a Unix timestamp.",opcode:6},{mnemonic:"DROP",syntax:"drop",stackEffect:"a drop ==",description:"Removes the top value from the stack.",opcode:8},{mnemonic:"PUSHR",syntax:"q<",stackEffect:"a q< == | …a",description:"Pushes a value onto the return stack.",opcode:14},{mnemonic:"PULLR",syntax:"q>",stackEffect:"q> == a | a…",description:"Pops a value from the return stack onto the main stack.",opcode:15},{mnemonic:"SHIFTL",syntax:"<<",stackEffect:"a b << == n",description:"Left-shifts a by b bits.",opcode:16},{mnemonic:"SHIFTR",syntax:">>",stackEffect:"a b >> == n",description:"Right-shifts a by b bits.",opcode:17},{mnemonic:"CLR",syntax:"clr",stackEffect:"… clr ==",description:"Clears the entire stack.",opcode:24},{mnemonic:"RAND",syntax:"rand",stackEffect:"n rand == r {0 <= r < n}",description:"Generates a random number between 0 and n-1.",opcode:26},{mnemonic:"EXIT",syntax:"exit",stackEffect:"n exit == {exits with code n}",description:"Exits the program with the given exit code.",opcode:27},{mnemonic:"DUP",syntax:"dup",stackEffect:"a dup == a a",description:"Duplicates the top value on the stack.",opcode:33},{mnemonic:"DEPTH",syntax:"depth",stackEffect:"… depth == … n",description:"Pushes the current stack depth.",opcode:35},{mnemonic:"SWAP",syntax:"swap",stackEffect:"a b swap == b a",description:"Swaps the top two values on the stack.",opcode:36},{mnemonic:"MOD",syntax:"%",stackEffect:"a b % == n",description:"Computes the remainder of a divided by b.",opcode:37},{mnemonic:"AND",syntax:"&",stackEffect:"a b & == n",description:"Bitwise AND of a and b.",opcode:38},{mnemonic:"STASH",syntax:"(",stackEffect:"… ( == {moves stack to queue}",description:"Moves values from the stack to the queue.",opcode:40},{mnemonic:"FETCH",syntax:")",stackEffect:") == … {restores stack from queue}",description:"Moves values from the queue back to the stack.",opcode:41},{mnemonic:"MUL",syntax:"*",stackEffect:"a b * == n",description:"Multiplies a by b.",opcode:42},{mnemonic:"ADD",syntax:"+",stackEffect:"a b + == n",description:"Adds a and b together.",opcode:43},{mnemonic:"CONS",syntax:"cons",stackEffect:"x y cons == q",description:"Builds an anonymous quotation from two stack values (opcode also maps to `,`).",opcode:44},{mnemonic:"SUB",syntax:"-",stackEffect:"a b - == n",description:"Subtracts b from a.",opcode:45},{mnemonic:"DUMP",syntax:".",stackEffect:"… . == … {prints stack}",description:"Prints the entire stack to output.",opcode:46},{mnemonic:"DIV",syntax:"/",stackEffect:"a b / == n",description:"Divides a by b (integer division).",opcode:47},{mnemonic:"MARK",syntax:":",stackEffect:"n : == {begin definition(n)}",description:"Begins a new word definition with name n.",opcode:58},{mnemonic:"DEF",syntax:";",stackEffect:"; == {end definition}",description:"Ends the current word definition.",opcode:59},{mnemonic:"LT",syntax:"<",stackEffect:"a b < == flag",description:"Pushes true if a is less than b.",opcode:60},{mnemonic:"EQ",syntax:"=",stackEffect:"a b = == flag",description:"Pushes true if a equals b.",opcode:61},{mnemonic:"GT",syntax:">",stackEffect:"a b > == flag",description:"Pushes true if a is greater than b.",opcode:62},{mnemonic:"WHEN",syntax:"?",stackEffect:"flag [A] ? == a*",description:"Executes the quotation if flag is true.",opcode:63},{mnemonic:"BRA",syntax:"[",stackEffect:"[ == {begin quotation}",description:"Begins a quotation (anonymous code block).",opcode:91},{mnemonic:"KET",syntax:"]",stackEffect:"] == [A] {end quotation}",description:"Ends a quotation and pushes it to the stack.",opcode:93},{mnemonic:"POW",syntax:"^",stackEffect:"a b ^ == n",description:"Computes a raised to the power of b.",opcode:94},{mnemonic:"OR",syntax:"|",stackEffect:"a b | == n",description:"Bitwise OR of a and b.",opcode:124},{mnemonic:"NOT",syntax:"~",stackEffect:"a ~ == n'",description:"Bitwise NOT of a.",opcode:126}],An={words:xn},$e=new Map;for(const i of An.words)$e.set(i.opcode,i);function Sn(i){return $e.get(i)}const qn=[BigInt(r.DEF),BigInt(r.KET),BigInt(r.MARK),BigInt(r.BRA)],P=0n,$=1n;class Ln{constructor(e){this.stack=[],this.queue=[],this.defs=new Map,this.symbols=new Map,this.depth=0,this.nextAnonOp=C+1,this.traceOn=!1,this.traceFormat="human",this.traceVerbose=!1,this.traceQueueMax=8,this.traceStackMax=32,this.base=10,this.statsOn=!1,this.profileOn=!1,this.stats={system_instructions_called:0,user_instructions_called:0,max_stack_depth:0,max_queue_depth:0},this.profile={},this.platform=e,this.setup()}static fromBase64(e){return hn(e).flatMap(n=>{const t=n&1n,s=n>>1n;return[t,s]})}getStack(){return this.stack.slice()}peek(){const e=this.stack.length;if(e>0)return this.stack[e-1];throw new Error("Peek: stack underflow")}pop(){if(this.stack.length>0)return this.stack.pop();throw new Error("Pop: stack underflow")}push(e){this.stack.push(e)}poke(e){const n=this.stack.length;if(n>0){this.stack[n-1]=e;return}throw new Error("Poke: stack underflow")}clear(){this.stack.splice(0,this.stack.length)}queuePush(e,n){this.queue.push(e,n)}queueUnshift(e,n){this.queue.unshift(e,n)}queueShift(){return[this.queue.shift()??0n,this.queue.shift()??0n]}queuePop(){const e=this.queue.pop()??0n;return[this.queue.pop()??0n,e]}defineSystem(e,n){const t=BigInt(n),s=this.getName(t);if(this.defs.has(t))throw new Error(`Define: cannot redefine system word "${s}"`);this.defs.set(t,e)}defineUser(e,n){const t=this.getName(n);if(n>-1&&n<C)throw new Error(`Define: cannot define system op "${t}"`);if(this.defs.has(n))throw n>C?new Error(`Define: cannot redefine anon op "${t}"`):new Error(`Define: cannot redefine user op "${t}"`);this.defs.set(n,e)}callSystem(e){const n=this.defs.get(e);if(typeof n=="function"){if(this.statsOn&&this.stats.system_instructions_called++,this.profileOn){const s=performance.now();n();const o=performance.now(),a=this.getName(e)||Number(e);this.profile[a]||=[0,0],this.profile[a][0]++,this.profile[a][1]!=0,this.profile[a][1]+=o-s;return}return n()}const t=this.getName(e)||e;throw new Error(`Call: undefined system op "${t}"`)}callUser(e){const n=this.defs.get(e);if(Array.isArray(n)){if(this.statsOn&&this.stats.user_instructions_called++,this.queue.unshift(...n),this.profileOn){const s=this.getName(e,`&${e}`);this.profile[s]||=[0,void 0],this.profile[s][0]++}return}const t=this.getName(e)||e;throw new Error(`Call: undefined user op "${t}"`)}callOp(e){return e>-1n&&e<C?this.callSystem(e):this.callUser(e)}loadBigIntCode(e){this.queue.push(...e)}loadIR(e){let n=0;for(;n<e.length;){const t=e[n++];if(t.op===u.call){if(t.value===0n)continue;t.meta?.name&&!this.symbols.has(t.value)&&this.symbols.set(t.value,t.meta?.name),this.queuePush($,t.value)}else this.queuePush(P,t.value)}return this.stack}runChunk(e,n){const t=this.queue;let s=!1,o=n,a=0;for(;t.length>0&&a<e;){const[p,c]=this.queueShift(),d=p===$,l=this.stack.slice();s=!this.depth||d&&qn.includes(c),d?s?this.callOp(c):(this.push(p),this.push(c)):(s||this.push(p),this.push(c)),this.statsOn&&(this.stats.max_stack_depth=Math.max(this.stats.max_stack_depth,this.stack.length),this.stats.max_queue_depth=Math.max(this.stats.max_queue_depth,t.length/2));const _=o++;this.traceOn&&this.trace({step:_,immediate:s,tag:p,value:c,stackBefore:l,stackAfter:this.traceVerbose||this.traceFormat==="jsonl"?this.stack.slice():void 0}),a++}return o}run(){return this.runChunk(Number.POSITIVE_INFINITY,0),this.stack}async runAsync(e={}){const n=e.yieldIntervalMs??160,t=e.yieldSliceMax??e.yieldEvery??655360;if(!Number.isFinite(n)||n<0)throw new Error(`runAsync: yieldIntervalMs must be a non-negative finite number (received ${n})`);if(!Number.isFinite(t)||t<1)throw new Error(`runAsync: yieldSliceMax / yieldEvery must be a positive finite number (received ${t})`);const s=e.scheduler??(()=>new Promise(d=>{globalThis.setTimeout(d,0)})),o=typeof globalThis.performance<"u"&&typeof globalThis.performance.now=="function"?()=>globalThis.performance.now():()=>globalThis.Date.now();let a=0,p=0,c=!1;for(;this.queue.length>0&&!c;){const d=o(),l=n>0?d+n:d;for(;this.queue.length>0&&!c&&!(n>0&&o()>=l);){const _=a;if(a=this.runChunk(t,a),p+=a-_,e.onChunk?.({vmCyclesExecuted:p}),e.shouldContinue&&!e.shouldContinue()){c=!0;break}if(n===0)break}this.queue.length>0&&!c&&await s()}return{stack:this.stack.slice(),cancelled:c,vmCyclesExecuted:p}}trace({step:e,immediate:n,tag:t,value:s,stackBefore:o,stackAfter:a}){const p=this.createTraceEvent(e,n,t,s,o,a);if(this.traceFormat==="jsonl"){this.writeTraceLine(JSON.stringify(p));return}this.writeTraceLine(this.formatHumanTrace(p))}createTraceEvent(e,n,t,s,o,a){const p=t===$,c=p?this.getName(s,String(s)):String(s),d=this.getQueuePreview();return{step:e,immediate:n,tag:p?"call":"literal",value:String(s),action:c,stack_before:this.limitStack(o).map(String),stack_after:a?this.limitStack(a).map(String):void 0,queue_preview:d,queue_depth:this.queue.length/2}}limitStack(e){return e.length>this.traceStackMax?e.slice(-this.traceStackMax):e}getQueuePreview(){const e=[],n=Math.max(this.traceQueueMax,0);for(let t=0;t<this.queue.length&&e.length<n;t+=2){const s=this.queue[t]??0n,o=this.queue[t+1]??0n,a=s===$;e.push({tag:a?"call":"literal",value:String(o),action:a?this.getName(o,String(o)):String(o)})}return e}formatHumanTrace(e){const n=this.padHumanAction(e.action),t=this.formatHumanStack(e.stack_before),s=this.formatHumanQueue(e.queue_preview,e.queue_depth),o=this.layoutHumanTraceLine(e.step,t,n,s);if(this.traceVerbose){const a=this.formatHumanStack(e.stack_after??[]);return`${o}
${" ".repeat(String(e.step).length+1)}${a} | immediate=${e.immediate} tag=${e.tag} value=${e.value} stack_depth=${this.stack.length} queue_depth=${e.queue_depth}`}return o}padHumanAction(e){return e.length>=7?e:e.padStart(Math.floor((7+e.length)/2)," ").padEnd(7," ")}layoutHumanTraceLine(e,n,t,s){const o=this.getTraceTerminalWidth(),a=`${e} `;if(a.length>=o)return a.slice(0,o);const p=1,c=Math.min(t.length,Math.max(o-a.length-p*2,1)),d=Math.max(a.length+p,Math.floor((o-c)/2)),l=Math.min(d,Math.max(a.length+p,o-c-p)),_=l+c,m=a.length,v=Math.max(m,l-p),A=Math.min(o,_+p),Ce=o,re=Math.max(v-m,0),pe=Math.max(Ce-A,0),N=Array.from({length:o},()=>" ");if(this.writeSegment(N,0,a,a.length),this.writeSegment(N,l,t,c),re>0){const E=this.truncateLeft(n,re);this.writeSegment(N,v-E.length,E,E.length)}if(pe>0){const E=this.truncateRight(s,pe);this.writeSegment(N,A,E,E.length)}return N.join("").replace(/\s+$/,"")}formatHumanStack(e){return e.length===0?"[ ]":`[ ${e.join(" ")} ]`}formatHumanQueue(e,n){const t=e.map(o=>o.tag==="call"?`&${o.action}`:o.value),s=Math.max(n-e.length,0);return s>0&&t.push(`…(+${s})`),t.length===0?"[ ]":`[ ${t.join(" ")} ]`}getTraceTerminalWidth(){const n=globalThis.Deno,t=n?.stderr?.isTerminal?.()&&typeof n.stderr.rid=="number"?n.stderr.rid:n?.stdout?.isTerminal?.()&&typeof n.stdout.rid=="number"?n.stdout.rid:void 0;if(typeof t=="number")try{const a=n?.consoleSize?.(t).columns;if(typeof a=="number"&&a>0)return a}catch{}const s=globalThis.process,o=s?.stderr?.isTTY&&typeof s.stderr.columns=="number"?s.stderr.columns:s?.stdout?.isTTY&&typeof s.stdout.columns=="number"?s.stdout.columns:void 0;return typeof o=="number"&&o>0?o:120}truncateLeft(e,n){return n<=0?"":e.length<=n?e:n===1?"…":`…${e.slice(-(n-1))}`}truncateRight(e,n){return n<=0?"":e.length<=n?e:n===1?"…":`${e.slice(0,n-1)}…`}writeSegment(e,n,t,s){if(!(s<=0))for(let o=0;o<s&&o<t.length&&n+o<e.length;o++)e[n+o]=t[o]}writeTraceLine(e){const n=new TextEncoder().encode(`${e}
`);if(this.platform.io.writeError){this.platform.io.writeError(n);return}this.platform.io.write(n)}getName(e,n=String(e)){return this.symbols.has(e)?this.symbols.get(e):String(n)}inspectValue(e){const n=this.symbols.get(e),t=e>=0n&&e<=BigInt(C),s=this.defs.get(e),o=s!==void 0;let a;Array.isArray(s)&&(a=this.parseDefinitionTokens(s));let p,c;if(t){const d=Sn(Number(e));d&&(p=d.stackEffect,c=d.description)}return{value:e,name:n,isSystem:t,isDefined:o,definition:a,stackEffect:p,description:c}}parseDefinitionTokens(e){const n=[];for(let t=0;t<e.length;t+=2){const s=e[t]??0n,o=e[t+1]??0n,a=s===$,p=a?this.symbols.get(o):void 0,c=this.defs.has(o);n.push({value:o,tag:s,name:p,isCall:a,isDefined:c})}return n}print(){const e=this.stack.map(n=>n.toString(this.base)).join(" ");this.platform.io.write(new TextEncoder().encode(`[ ${e} ]
`))}loadSourceMap(e){Object.keys(e.symbols).forEach(n=>{this.symbols.set(BigInt(n),e.symbols[n])})}getNextAnonOp(){let e=this.nextAnonOp++;for(;this.defs.has(BigInt(e));)e=this.nextAnonOp++;return BigInt(e)}setup(){const e=new TextEncoder;let n;for(n in D)this.symbols.set(BigInt(D[n]),n);this.defineSystem(()=>{},r.NOP),this.defineSystem(()=>{const t=this.pop();this.callOp(t)},r.CALL),this.defineSystem(()=>{this.depth--;const[,t]=this.queuePop(),s=this.stack.splice(Number(t||0))||[];this.defineUser(s,this.pop())},r.DEF),this.defineSystem(()=>{this.depth--;const[,t]=this.queuePop(),s=this.stack.splice(Number(t||0))||[],o=this.getNextAnonOp();this.defineUser(s,o),this.depth>0&&this.push(0n),this.push(o)},r.KET),this.defineSystem(()=>{this.depth++;const t=this.stack.length;this.queuePush(P,BigInt(t))},r.BRA),this.defineSystem(()=>{this.depth++;const t=this.stack.length;this.queuePush(P,BigInt(t))},r.MARK),this.defineSystem(()=>this.clear(),r.CLR),this.defineSystem(()=>{const t=this.pop();this.platform.exit(Number(t))},r.EXIT),this.defineSystem(()=>{const t=this.pop();this.push(kn(t))},r.RAND),this.defineSystem(()=>{this.print()},r.PRN),this.defineSystem(()=>{this.push(BigInt(this.platform.now()))},r.CLOCK),this.defineSystem(()=>{const t=e.encode(String.fromCharCode(Number(this.pop())));this.platform.io.write(t)},r.PUTC),this.defineSystem(()=>{this.platform.io.setRaw&&this.platform.io.setRaw(!0);const t=this.platform.io.readByte();this.platform.io.setRaw&&this.platform.io.setRaw(!1),this.push(BigInt(t??0))},r.GETC),this.defineSystem(()=>{const t=e.encode(this.pop().toString(this.base));this.platform.io.write(t)},r.PUTN),this.defineSystem(()=>{this.pop()},r.DROP),this.defineSystem(()=>{const t=this.peek(),s=this.stack[this.stack.length-2];this.stack[this.stack.length-2]=t,this.poke(s)},r.SWAP),this.defineSystem(()=>{this.push(this.peek())},r.DUP),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]+=t},r.ADD),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]-=t},r.SUB),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]*=t},r.MUL),this.defineSystem(()=>{const t=this.pop();if(t===0n)throw new Error("DIV: Division by zero");this.stack[this.stack.length-1]/=t},r.DIV),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]%=t},r.MOD),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]<<=t},r.SHIFTL),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]>>=t},r.SHIFTR),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]&=t},r.AND),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]**=t},r.POW),this.defineSystem(()=>{this.push(this.pop()>this.pop()?1n:0n)},r.LT),this.defineSystem(()=>{this.push(this.pop()===this.pop()?1n:0n)},r.EQ),this.defineSystem(()=>{this.push(this.pop()<this.pop()?1n:0n)},r.GT),this.defineSystem(()=>{const t=this.pop();this.pop()!==0n&&this.queueUnshift($,t)},r.IF),this.defineSystem(()=>{this.queuePush(P,this.pop())},r.PUSHR),this.defineSystem(()=>{const[,t]=this.queuePop();this.push(t)},r.PULLR),this.defineSystem(()=>{this.push(BigInt(this.stack.length))},r.DEPTH),this.defineSystem(()=>{const t=this.stack.length;this.stack.splice(0,t).forEach(o=>this.queuePush(P,o)),this.queuePush(P,BigInt(t))},r.STASH),this.defineSystem(()=>{const[,t]=this.queuePop(),s=Number(t),o=[];for(let a=0;a<s;a++){const[,p]=this.queuePop();o.unshift(p)}this.stack.unshift(...o)},r.FETCH),this.defineSystem(()=>{const t=this.pop();this.stack[this.stack.length-1]|=t},r.OR),this.defineSystem(()=>{const t=this.pop();this.push(~t)},r.NOT),this.defineSystem(()=>{const t=this.pop(),o=[0n,this.pop(),1n,t],a=this.getNextAnonOp();this.defineUser(o,a),this.depth>0&&this.push(0n),this.push(a)},r.CONS)}printProfile(){console.log(),console.log("Profile:");const e=Object.keys(this.profile).map(s=>{const o=this.profile[s][0],a=this.profile[s][1];return{name:s,calls:o,time:a,system:typeof a<"u","ops/ms":a?Math.round(o/a):""}}).sort((s,o)=>o.calls-s.calls),n=e.filter(s=>s.system),t=e.filter(s=>!s.system);console.table(n,["name","calls","ops/ms"]),console.table(t,["name","calls"]),console.log()}printStats(){console.log(),console.log("Interpreter stats:"),console.log(this.stats),console.log()}}function kn(i){const e=i,n=e.toString().length;let t="";for(;t.length<n;)t+=Math.random().toString().split(".")[1];t=t.slice(0,n);const s="1"+"0".repeat(n);return e*BigInt(t)/BigInt(s)}const O=BigInt(r.DEF),ne=BigInt(r.KET),M=BigInt(r.MARK),te=BigInt(r.BRA),h=i=>(i=BigInt(i),e=>e.op===u.call&&e.value===i),b=i=>(i=BigInt(i),e=>e.op===u.push&&e.value===i),f=i=>i.op===u.push,X=i=>i.op===u.push&&i.value!==0n,Tn=i=>i.op===u.push&&i.value>=0n,En=i=>i.op===u.call&&![te,ne,M,O].includes(i.value),Pn=[{name:"No operation",pattern:[h(r.NOP)],replacement:()=>[]},{name:"Null Sequence - SWAP SWAP",pattern:[h(r.SWAP),h(r.SWAP)],replacement:()=>[]},{name:"Null Sequence - DUP DROP",pattern:[h(r.DUP),h(r.DROP)],replacement:()=>[]},{name:"Null Sequence - PUSHR PULLR",pattern:[h(r.PUSHR),h(r.PULLR)],replacement:()=>[]},{name:"Null Sequence - CLOCK DROP",pattern:[h(r.CLOCK),h(r.DROP)],replacement:()=>[]},{name:"Null Sequence - RAND DROP",pattern:[h(r.RAND),h(r.DROP)],replacement:()=>[]},{name:"Null Sequence - DEPTH DROP",pattern:[h(r.DEPTH),h(r.DROP)],replacement:()=>[]},{name:"Null Sequence - NOT NOT",pattern:[h(r.NOT),h(r.NOT)],replacement:()=>[]},{name:"Indirect calls - n EVAL",pattern:[f,h(r.CALL)],replacement:i=>[{op:u.call,value:i.value,meta:{name:i.meta?.name?.replace(/^&/,"")}}]},{name:"Null Sequence - n DROP",pattern:[f,h(r.DROP)],replacement:()=>[]},{name:"Constant Folding - a b ADD",pattern:[f,f,h(r.ADD)],replacement:(i,e)=>[{op:u.push,value:i.value+e.value}]},{name:"Algebraic Simplification - 0 ADD",pattern:[b(0),h(r.ADD)],replacement:()=>[]},{name:"Algebraic Simplification - swap ADD",pattern:[h(r.SWAP),h(r.ADD)],replacement:(i,e)=>[e]},{name:"Constant Folding - a b SUB",pattern:[f,f,h(r.SUB)],replacement:(i,e)=>[{op:u.push,value:i.value-e.value}]},{name:"Algebraic Simplification - 0 SUB",pattern:[b(0),h(r.SUB)],replacement:()=>[]},{name:"Constant Folding - a b MUL",pattern:[f,f,h(r.MUL)],replacement:(i,e)=>[{op:u.push,value:i.value*e.value}]},{name:"Algebraic Simplification - 1 MUL",pattern:[b(1),h(r.MUL)],replacement:()=>[]},{name:"Algebraic Simplification - swap MUL",pattern:[h(r.SWAP),h(r.MUL)],replacement:(i,e)=>[e]},{name:"Algebraic Simplification - swap AND",pattern:[h(r.SWAP),h(r.AND)],replacement:(i,e)=>[e]},{name:"Algebraic Simplification - swap OR",pattern:[h(r.SWAP),h(r.OR)],replacement:(i,e)=>[e]},{name:"Algebraic Simplification - swap EQ",pattern:[h(r.SWAP),h(r.EQ)],replacement:(i,e)=>[e]},{name:"Constant Folding - a b DIV",pattern:[f,X,h(r.DIV)],replacement:(i,e)=>[{op:u.push,value:i.value/e.value}]},{name:"Constant Folding - a b MOD",pattern:[f,X,h(r.MOD)],replacement:(i,e)=>[{op:u.push,value:i.value%e.value}]},{name:"Constant Folding - a b SHIFTL",pattern:[f,f,h(r.SHIFTL)],replacement:(i,e)=>[{op:u.push,value:i.value<<e.value}]},{name:"Constant Folding - a b SHIFTR",pattern:[f,f,h(r.SHIFTR)],replacement:(i,e)=>[{op:u.push,value:i.value>>e.value}]},{name:"Constant Folding - a b AND",pattern:[f,f,h(r.AND)],replacement:(i,e)=>[{op:u.push,value:i.value&e.value}]},{name:"Constant Folding - a b OR",pattern:[f,f,h(r.OR)],replacement:(i,e)=>[{op:u.push,value:i.value|e.value}]},{name:"Constant Folding - a NOT",pattern:[f,h(r.NOT)],replacement:i=>[{op:u.push,value:~i.value}]},{name:"Constant Folding - a b LT",pattern:[f,f,h(r.LT)],replacement:(i,e)=>[{op:u.push,value:i.value<e.value?1n:0n}]},{name:"Constant Folding - a b EQ",pattern:[f,f,h(r.EQ)],replacement:(i,e)=>[{op:u.push,value:i.value===e.value?1n:0n}]},{name:"Constant Folding - a b GT",pattern:[f,f,h(r.GT)],replacement:(i,e)=>[{op:u.push,value:i.value>e.value?1n:0n}]},{name:"Constant Folding - a b POW",pattern:[f,Tn,h(r.POW)],replacement:(i,e)=>[{op:u.push,value:i.value**e.value}]},{name:"Algebraic Simplification - 0 OR",pattern:[b(0),h(r.OR)],replacement:()=>[]},{name:"Algebraic Simplification - 0 SHIFTL",pattern:[b(0),h(r.SHIFTL)],replacement:()=>[]},{name:"Algebraic Simplification - 0 SHIFTR",pattern:[b(0),h(r.SHIFTR)],replacement:()=>[]},{name:"Algebraic Simplification - 1 POW",pattern:[b(1),h(r.POW)],replacement:()=>[]},{name:"Algebraic Simplification - 1 DIV",pattern:[b(1),h(r.DIV)],replacement:()=>[]},{name:"Constant propagation - a DUP",pattern:[f,h(r.DUP)],replacement:i=>[i,i]},{name:"Unreachable Code - 0 &b IF",pattern:[b(0),f,h(r.IF)],replacement:()=>[]},{name:"Flows-Of-Control Optimizations - !0 &b IF",pattern:[X,f,h(r.IF)],replacement:(i,e,n)=>[{op:u.call,value:e.value,meta:{name:e.meta?.name?.replace(/^&/,"")}}]},{name:"Null Sequence - 0 eval",pattern:[b(0),h(r.CALL)],replacement:()=>[]},{name:"Empty List - [ ]",pattern:[h(r.BRA),h(r.KET)],replacement:()=>[{op:u.push,value:0n,meta:{pointer:!0,name:"0"}}]},{name:"Single-word Quote - [ word ]",pattern:[h(r.BRA),En,h(r.KET)],replacement:(i,e)=>[{op:u.push,value:e.value,meta:{pointer:!0,name:e.meta?.name}}]}];class Hn{constructor(){this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0},this.minOptPasses=2,this.maxOptPasses=20,this.defs=new Map,this.calledWords=new Set,this.optimized=[],this.nextAnonOp=C+1}optimize(e){this.reset(),this.stats.pre_optimization_ir_size=e.length,this.optimized=e;let n;do n=this.optimized.length,this.optLoop();while((this.optimized.length<n||this.stats.optimization_passes<this.minOptPasses)&&this.stats.optimization_passes<this.maxOptPasses);return this.optimized=this.pullDefs(this.optimized),this.optimized=this.addReferencedWords(this.optimized),this.stats.post_optimization_ir_size=this.optimized.length,this.optimized}optLoop(){this.optimized=this.peepholeOptimization(this.optimized),this.optimized=this.getDefs(this.optimized),this.optimized=this.inlineWords(this.optimized,4),this.stats.optimization_passes++}reset(){this.optimized=[],this.defs=new Map,this.calledWords=new Set,this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0}}getDefs(e){let n=0;for(;n<e.length;){const t=e[n];if(t.op===u.call){if(t.value===ne){this.stats.optimization_passes===0&&this.stats.user_defined_anon_defs++,t.meta??={},t.meta.uid??=this.nextAnonOp++;let s=n;for(;s-- >0;){const c=e[s];if(c.op===u.call&&c.value===te)break}const o=BigInt(t.meta.uid),a={op:u.push,value:o,meta:{pointer:!0}},p=e.slice(s,n+1);p.unshift(a),p[1]={...p[1],value:M,meta:{...p[1].meta,name:":"}},p[p.length-1]={...p[p.length-1],value:O,meta:{...p[p.length-1].meta,name:";"}},this.defs.set(o,p)}else if(t.value===O){this.stats.optimization_passes===0&&this.stats.user_defined_named_defs++;let s=n;for(;s-- >0;){const p=e[s];if(p.op===u.call&&p.value===M)break}const o=e[s-1];o.meta||={},o.meta.pointer=!0;const a=e.slice(s-1,n+1);this.defs.set(o.value,a)}}n++}return e}pullDefs(e,n=!1){const t=e.slice();let s=0;for(;s<t.length;){const o=t[s];if(o.op===u.call){if(o.value===ne){o.meta??={},o.meta.uid??=this.nextAnonOp++;const a=s;for(;s-- >0;){const l=t[s];if(l.op===u.call&&l.value===te)break}const p=BigInt(o.meta.uid),c={op:u.push,value:p,meta:{pointer:!0}},d=t.splice(s,a-s+1,c);d.unshift(c),d[1]={...d[1],value:M,meta:{...d[1].meta,name:":"}},d[d.length-1]={...d[d.length-1],value:O,meta:{...d[d.length-1].meta,name:";"}},this.defs.set(p,d)}else if(o.value===O&&!n){const a=s;for(;s-- >0;){const d=t[s];if(d.op===u.call&&d.value===M)break}const p=t[s-1];p.meta||={},p.meta.pointer=!0;const c=t.splice(s-1,a-s+2);s=s-2,this.defs.set(c[0].value,c)}}s++}return t}peepholeOptimization(e){const n=e.slice();for(;;){const t=this.stats.peephole_optimizations;let s=0;for(;s<n.length;){for(const o of Pn){const{pattern:a,replacement:p}=o;if(s+a.length>n.length)continue;if(a.every((d,l)=>d(n[s+l]))){this.stats.peephole_optimizations++;const d=n.slice(s,s+a.length);n.splice(s,a.length,...p(...d)),s=Math.max(0,s-a.length-1);break}}s++}if(this.stats.peephole_optimizations===t)break}return n}inlineWords(e,n=1,t=[]){return e.flatMap(s=>{if(s.meta?.unsafe)return s;if(s.op===u.call&&this.defs.has(s.value)){if(t.includes(s.value))return s;const o=this.defs.get(s.value);if(!o)return s;const a=o[o.length-1];if(a.meta?.unsafe)return s;if(a.meta?.inline||s.meta?.inline)return this.stats.inlined_calls++,this.inlineWords(o.slice(2,-1),1/0,t.concat(s.value));if(o.length<=n+3)return this.stats.inlined_calls++,this.inlineWords(o.slice(2,-1),n,t.concat(s.value))}return s})}addReferencedWords(e){return e.slice().forEach(n=>{n.op===u.push&&n.meta?.pointer?this.addDef(n.value):n.op===u.call&&this.addDef(n.value)}),e}addDef(e){if(!this.calledWords.has(e)){const n=this.defs.get(e);if(n)return this.stats.post_optimization_user_defs++,this.calledWords.add(e),this.optimized.unshift(...n),this.addReferencedWords(n)}}}class F{constructor(e,n,t){this.imported=new Set,this.importPrefixes=new Map,this.macroPreludeReady=!1,this.rootFilename=null,this.host=e,this.engine=n.engine,this.compiler=n.compiler||new I,this.stdlibRoots=t?.stdlibRoots??[],t?.macroEngineBootstrapFile&&this.bootstrapMacroEngine(t.macroEngineBootstrapFile)}static tokenize(e){return e.split(/[\r\n]+/)}preprocess(e,n="-"){const t=n!=="-"&&this.host.fileExists(n)?this.host.realpath(n):n,s=this.rootFilename===null;s&&t!=="-"&&(this.rootFilename=t);try{return this.preprocessLines(e,t)}finally{s&&(this.rootFilename=null)}}preprocessLines(e,n,t){return e.map(s=>{if(s.length>1&&s[0]==="."){const[o,...a]=s.split(" ");if(o[0]==="."&&o.length>1){switch(o){case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Preprocessor: .exit requires a host exit handler");case".load":{const p=this.findFile(a.join(" "),n),c=this.host.readTextFile(p);return this.preprocessLines(F.tokenize(c),p)}case".import":{const p=this.findFile(a.join(" "),n);if(!this.imported.has(p)){this.imported.add(p);const c=this.host.readTextFile(p);return this.preprocessLines(F.tokenize(c),p,p)}return""}case".m":return this.runMacro(a.join(" "),s);case".ff":return this.runMacro(a.join(" "),s);case".ffp":{if(!this.macroPreludeReady)throw new Error("Preprocessor: .ffp requires prelude-enabled macro context");return this.runMacro(a.join(" "),s)}}return""}}return t?this.mangleImportedLine(s,t):s}).join(`
`)}findFile(e,n="-"){const t=e.trim();if(!t)throw new Error("Preprocessor: missing import path");return this.isStdlibImport(t)?this.resolveStdlibImport(t):this.resolveFilesystemImport(t,n)}isStdlibImport(e){return e.startsWith("<")&&e.endsWith(">")&&e.length>2}resolveFilesystemImport(e,n){if(n&&n!=="-"&&!this.host.path.isAbsolute(e)){const s=this.host.path.dirname(n),o=this.host.path.resolve(s,e),a=this.resolveFileOrDirectory(o);if(a)return a}const t=this.resolveFileOrDirectory(e);if(t)return t;throw new Error(`File not found: "${e}"`)}resolveStdlibImport(e){const n=e.slice(1,-1).trim(),t=[];for(const o of this.stdlibRoots){t.push(o);const a=this.host.path.resolve(o,n),p=this.resolveFileOrDirectory(a,{extensions:[".ffp",".ff"]});if(p)return p}const s=t.length>0?t.join(", "):"(no stdlib roots configured)";throw new Error(`Stdlib import not found: ${e} (searched roots: ${s})`)}resolveFileOrDirectory(e,n){if(this.host.fileExists(e))return this.host.realpath(e);for(const t of n?.extensions??[]){const s=`${e}${t}`;if(this.host.fileExists(s))return this.host.realpath(s)}if(this.host.directoryExists(e)){const t=this.getBasename(e);for(const s of[".ffp",".ff"]){const o=this.host.path.resolve(e,`${t}${s}`);if(this.host.fileExists(o))return this.host.realpath(o)}}return null}getBasename(e){const n=e.replace(/[\\/]+$/,""),t=n.split(/[\\/]+/).filter(Boolean);return t[t.length-1]??n}bootstrapMacroEngine(e){const n=this.findFile(e),t=this.host.readTextFile(n),o=new F(this.host,{engine:this.engine,compiler:this.compiler},{stdlibRoots:this.stdlibRoots}).preprocess(F.tokenize(t),n),a=this.compiler.compileToIR(I.tokenize(o),n);this.engine.loadIR(a),this.engine.run(),this.engine.clear(),this.macroPreludeReady=!0}runMacro(e,n){const t=this.compiler.compileToIR(I.tokenize(e));this.engine.loadIR(t),this.engine.run();const s=this.engine.getStack();return this.engine.clear(),s.map(String).join(" ")+` /* ${n} */`}mangleImportedLine(e,n){const t=this.getImportPrefix(n);return e.split(/(\s+)/).map(s=>!s||/\s+/.test(s)?s:this.mangleImportedToken(s,t)).join("")}mangleImportedToken(e,n){return e.startsWith("[__")?`[${n}${e.slice(3)}`:e.startsWith("__")?`${n}${e.slice(2)}`:e}getImportPrefix(e){const n=this.importPrefixes.get(e);if(n)return n;const s=this.getNormalizedImportPath(e).replace(/[^A-Za-z0-9]+/g,"_").replace(/^_+|_+$/g,"").replace(/_+/g,"_")||"module",o=this.hashPath(e),a=`__${s}_${o}__`;return this.importPrefixes.set(e,a),a}getNormalizedImportPath(e){if(this.rootFilename&&this.rootFilename!=="-"){const n=this.host.path.dirname(this.rootFilename),t=this.host.path.relative(n,e);if(t)return t.replace(/\\/g,"/")}return e.replace(/\\/g,"/")}hashPath(e){let n=2166136261;for(let t=0;t<e.length;t++)n^=e.charCodeAt(t),n=Math.imul(n,16777619)>>>0;return n.toString(36)}}const Un=`/* constants 1 2 3 */
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
`,Wn=`.import ./num.ffp

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
`,Kn=`.import ./pred.ffp

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
`,Vn=`.import ./atan-shared.ffp

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
`,jn=`.import ./arith.ffp
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
`,Qn=`.import ./atan-shared.ffp
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
`,Gn=`.import ./atan-shared.ffp

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
`,Yn=`.import ./atan-shared.ffp
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
`,Xn=`.import ./arith.ffp

/*
 * Naming note: the \`i\` prefix means integer.
 * \`icbrt\` returns the integer cube root (truncated toward zero).
 */

__closer: dup2 2 ^ / over 2 * + 3 / ;
__loop: __closer dup2 > [ nip __loop ] ? ;
__cbrtn: dup 3 / __loop drop nip ;

icbrt: dup sgn swap over * dup 1 > [ __cbrtn ] ? * ; /* x icbrt == ⌊cbrt(x)⌋₀ */
`,Zn=`
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
`,Jn=`.import ../core/core.ff

__t: tuck % dup [ __t ] ? ;

gcd: dup [ __t ] ? drop ;
lcm: dup2 gcd / * ;
`,et=`.import ../core/core.ff
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
`,nt=`.import ./pred.ffp
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
`,tt=`.import ../core/core.ff

/* Logarithm and combinatorics */

!: dup [ dup -- ! * ] [ drop 1 ] branch ; /* n ! == n! */
nck: dup2 - ! swap ! * [ ! ] dip / ; /* n k nck == C(n,k) */

/* Knuth operators */

^^: -- dup [ [ dup ] swap times [ ^ ] ] dip times ;
^^^: -- dup [ [ dup ] swap times [ ^^ ] ] dip times ;
`,st=`.import ./atan-core.ffp

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
`,it=`.import ../core/core.ff
.import ./arith.ffp

/* Internal precision helpers shared by variable-precision math words. */
n->S: 10 swap ^ ; /* n n->S == 10ⁿ */
n->S2: 2 * n->S ; /* n n->S2 == 10²ⁿ */
n->K: 6 * 4 + 5 / 10 + ; /* n n->K == ⌈6*n/5⌉+10 */
p/q*S: n->S swap rot * swap / ; /* p q n p/q*S == ⌊p*10ⁿ/q⌋₀ */

ntrunc: n->S / ; /* x n ntrunc == ⌊x/10ⁿ⌋₀ */
nfrac: [ abs ] dip n->S % ; /* x n nfrac == (x - ⌊x/10ⁿ⌋₀)*10ⁿ */
`,at=`.import ../core/core.ff

/* Predicates */

negitive?: 0 < ; /* n negitive? == flag */
positive?: 0 > ; /* n positive? == flag */
divisor?: % zero? ; .inline /* n d divisor? == flag */
even?: 2 divisor? ; .inline /* n even? == flag */
odd?: even? not ; .inline /* n odd? == flag */
`,ot=`.import ./pred.ffp

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
`,rt=`.import ../core/core.ff
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
`,pt=`.import ../core/core.ff
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
`,ct=`/* Trigonometric words live here. Pi-derived constants are defined in pi.ffp. */
`,lt=`.import ./core/core.ff
.import ./math/math.ffp
.import ./string/string.ffp
.import ./seq/seq.ffp
.import ./time/time.ffp`,dt=`.import ../core/core.ff

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
`,ht=`.import ../core/core.ff

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
`,ut=`/* String output */

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
`,_t=`.import char.ffp
.import str.ffp`,ft=`.import ./core/core.ff
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
`,mt=`.import ./core/core.ff
.import ./string/string.ffp

assert: falsey? [ 0 10 'Failed' println .inline 1 exit ] ? ;
assert_eq: = assert .inline ;
assert_false: not assert .inline ;

OK: 0 '\\sOK' println clr ;

¶: clr 999 ;`,gt=`.import ./utc.ffp
`,vt=`.import ../core/core.ff
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
`;function x(i){const e=i.startsWith("/"),n=i.split("/").filter(Boolean),t=[];for(const s of n)if(s!=="."){if(s===".."){t.pop();continue}t.push(s)}return`${e?"/":""}${t.join("/")}`||(e?"/":".")}function $n(i){const e=x(i),n=e.lastIndexOf("/");return n<=0?e.startsWith("/")?"/":".":e.slice(0,n)}function Cn(...i){const e=i.filter(Boolean).join("/").replaceAll(/\/+/g,"/");return x(e)}function In(i,e){const n=x(i).split("/").filter(Boolean),t=x(e).split("/").filter(Boolean);let s=0;for(;s<n.length&&s<t.length&&n[s]===t[s];)s++;const o=n.length-s,a=t.slice(s);return Array(o).fill("..").concat(a).join("/")||"."}function bt(i){return{readTextFile(e){const n=x(e),t=i[n];if(typeof t!="string")throw new Error(`Virtual file not found: ${n}`);return t},fileExists(e){return typeof i[x(e)]=="string"},directoryExists(e){const n=x(e).replace(/\/+$/,""),t=n==="/"?"/":`${n}/`;return Object.keys(i).some(s=>s.startsWith(t))},realpath(e){return x(e)},path:{isAbsolute(e){return e.startsWith("/")},dirname:$n,relative:In,resolve:Cn}}}function yt(i={}){const e=new TextDecoder,n=new TextEncoder,t=Array.from(n.encode(i.stdin??""));return{io:{write(s){i.onWrite?.(e.decode(s))},readByte(){return t.shift()??null}},exit(s){i.onExit?.(s)},now(){return Date.now()}}}export{g as A,Qn as B,jn as C,Nn as D,H as E,Vn as F,Kn as G,Wn as H,Un as I,yt as J,I as K,Ln as L,bt as M,Mn as N,Fn as O,F as P,Hn as Q,zn as R,vt as _,On as a,Dn as b,gt as c,mt as d,ft as e,_t as f,ut as g,ht as h,dt as i,lt as j,ct as k,pt as l,rt as m,ot as n,at as o,it as p,st as q,tt as r,Bn as s,nt as t,et as u,Jn as v,Zn as w,Xn as x,Yn as y,Gn as z};
