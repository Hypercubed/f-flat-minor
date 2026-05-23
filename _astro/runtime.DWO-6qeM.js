import{R as $}from"./run-feedback.Ug3xFfrM.js";const rt=globalThis,ht=i=>i,G=rt.trustedTypes,ut=G?G.createPolicy("lit-html",{createHTML:i=>i}):void 0,kt="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,qt="?"+S,Bt=`<${qt}>`,C=document,U=()=>C.createComment(""),H=i=>i===null||typeof i!="object"&&typeof i!="function",ot=Array.isArray,Ft=i=>ot(i)||typeof i?.[Symbol.iterator]=="function",Z=`[ 	
\f\r]`,F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,_t=/>/g,T=RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ft=/'/g,mt=/"/g,Tt=/^(?:script|style|textarea|title)$/i,Mt=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),ze=Mt(1),W=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),gt=new WeakMap,P=C.createTreeWalker(C,129);function Et(i,t){if(!ot(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ut!==void 0?ut.createHTML(t):t}const Lt=(i,t)=>{const e=i.length-1,n=[];let s,a=t===2?"<svg>":t===3?"<math>":"",r=F;for(let c=0;c<e;c++){const p=i[c];let l,h,_=-1,m=0;for(;m<p.length&&(r.lastIndex=m,h=r.exec(p),h!==null);)m=r.lastIndex,r===F?h[1]==="!--"?r=dt:h[1]!==void 0?r=_t:h[2]!==void 0?(Tt.test(h[2])&&(s=RegExp("</"+h[2],"g")),r=T):h[3]!==void 0&&(r=T):r===T?h[0]===">"?(r=s??F,_=-1):h[1]===void 0?_=-2:(_=r.lastIndex-h[2].length,l=h[1],r=h[3]===void 0?T:h[3]==='"'?mt:ft):r===mt||r===ft?r=T:r===dt||r===_t?r=F:(r=T,s=void 0);const g=r===T&&i[c+1].startsWith("/>")?" ":"";a+=r===F?p+Bt:_>=0?(n.push(l),p.slice(0,_)+kt+p.slice(_)+S+g):p+S+(_===-2?c:g)}return[Et(i,a+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]};class K{constructor({strings:t,_$litType$:e},n){let s;this.parts=[];let a=0,r=0;const c=t.length-1,p=this.parts,[l,h]=Lt(t,e);if(this.el=K.createElement(l,n),P.currentNode=this.el.content,e===2||e===3){const _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=P.nextNode())!==null&&p.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(const _ of s.getAttributeNames())if(_.endsWith(kt)){const m=h[r++],g=s.getAttribute(_).split(S),b=/([.?@])?(.*)/.exec(m);p.push({type:1,index:a,name:b[2],strings:g,ctor:b[1]==="."?Ut:b[1]==="?"?Ht:b[1]==="@"?Wt:Y}),s.removeAttribute(_)}else _.startsWith(S)&&(p.push({type:6,index:a}),s.removeAttribute(_));if(Tt.test(s.tagName)){const _=s.textContent.split(S),m=_.length-1;if(m>0){s.textContent=G?G.emptyScript:"";for(let g=0;g<m;g++)s.append(_[g],U()),P.nextNode(),p.push({type:2,index:++a});s.append(_[m],U())}}}else if(s.nodeType===8)if(s.data===qt)p.push({type:2,index:a});else{let _=-1;for(;(_=s.data.indexOf(S,_+1))!==-1;)p.push({type:7,index:a}),_+=S.length-1}a++}}static createElement(t,e){const n=C.createElement("template");return n.innerHTML=t,n}}function R(i,t,e=i,n){if(t===W)return t;let s=n!==void 0?e._$Co?.[n]:e._$Cl;const a=H(t)?void 0:t._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),a===void 0?s=void 0:(s=new a(i),s._$AT(i,e,n)),n!==void 0?(e._$Co??=[])[n]=s:e._$Cl=s),s!==void 0&&(t=R(i,s._$AS(i,t.values),s,n)),t}class zt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:n}=this._$AD,s=(t?.creationScope??C).importNode(e,!0);P.currentNode=s;let a=P.nextNode(),r=0,c=0,p=n[0];for(;p!==void 0;){if(r===p.index){let l;p.type===2?l=new V(a,a.nextSibling,this,t):p.type===1?l=new p.ctor(a,p.name,p.strings,this,t):p.type===6&&(l=new Kt(a,this,t)),this._$AV.push(l),p=n[++c]}r!==p?.index&&(a=P.nextNode(),r++)}return P.currentNode=C,s}p(t){let e=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}}class V{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,n,s){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=R(this,t,e),H(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==W&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ft(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==v&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(C.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=K.createElement(Et(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(e);else{const a=new zt(s,this),r=a.u(this.options);a.p(e),this.T(r),this._$AH=a}}_$AC(t){let e=gt.get(t.strings);return e===void 0&&gt.set(t.strings,e=new K(t)),e}k(t){ot(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let n,s=0;for(const a of t)s===e.length?e.push(n=new V(this.O(U()),this.O(U()),this,this.options)):n=e[s],n._$AI(a),s++;s<e.length&&(this._$AR(n&&n._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const n=ht(t).nextSibling;ht(t).remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,s,a){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=v}_$AI(t,e=this,n,s){const a=this.strings;let r=!1;if(a===void 0)t=R(this,t,e,0),r=!H(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const c=t;let p,l;for(t=a[0],p=0;p<a.length-1;p++)l=R(this,c[n+p],e,p),l===W&&(l=this._$AH[p]),r||=!H(l)||l!==this._$AH[p],l===v?t=v:t!==v&&(t+=(l??"")+a[p+1]),this._$AH[p]=l}r&&!s&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ut extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}}class Ht extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==v)}}class Wt extends Y{constructor(t,e,n,s,a){super(t,e,n,s,a),this.type=5}_$AI(t,e=this){if((t=R(this,t,e,0)??v)===W)return;const n=this._$AH,s=t===v&&n!==v||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,a=t!==v&&(n===v||s);s&&this.element.removeEventListener(this.name,this,n),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Kt{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){R(this,t)}}const Vt=rt.litHtmlPolyfillSupport;Vt?.(K,V),(rt.litHtmlVersions??=[]).push("3.3.2");const Ue=(i,t,e)=>{const n=t;let s=n._$litPart$;return s===void 0&&(n._$litPart$=s=new V(t.insertBefore(U(),null),null,void 0,{})),s._$AI(i),s};let vt=null;function jt(){return vt??=new AudioContext,vt}const bt=[329.6275569128699,391.99543598174927,493.8833013781249],Qt=10,Gt=420,Yt=3;let j=null,Q=null,et=!1;function nt(){j!==null&&(clearInterval(j),j=null),Q=null}function He(i){if(nt(),!$.enabled||(et=!0,window.matchMedia("(prefers-reduced-motion: reduce)").matches))return;Q=i;const t=()=>{if(!$.enabled){nt();return}Q&&Zt(Q,Yt)};t(),j=setInterval(t,Gt)}function We(){const i=et;et=!1,nt(),i&&Pt()}function Pt(){if($.enabled)try{const i=jt();i.resume().then(()=>{const t=i.currentTime,e=.42,n=.09;for(let s=0;s<bt.length;s++){const a=bt[s],r=i.createOscillator(),c=i.createGain();r.type="triangle",r.frequency.setValueAtTime(a,t),c.gain.setValueAtTime(0,t),c.gain.linearRampToValueAtTime(n,t+.018+s*.012),c.gain.exponentialRampToValueAtTime(8e-4,t+e),r.connect(c),c.connect(i.destination),r.start(t),r.stop(t+e+.06)}})}catch{}}function $t(i){return!(i.isComposing||i.metaKey||i.ctrlKey||i.altKey||i.key==="Tab"||i.key==="Escape"||i.key==="ArrowUp"||i.key==="ArrowDown"||i.repeat)}function Ke(i,t){if(!$.enabled||i.disabled||!$t(t))return;const{x:e,y:n}=Xt(i);pt(e,n,{centerOnPoint:!0}),t.key==="Enter"&&Pt()}function Ve(i,t){if(!$.enabled||!$t(t))return;const e=i.state.selection.main.head,n=i.coordsAtPos(e);if(!n)return;const s=n.left,a=(n.top+n.bottom)/2;pt(s,a,{centerOnPoint:!0})}function Xt(i){const t=i.getBoundingClientRect(),e=window.getComputedStyle(i),n=parseFloat(e.borderLeftWidth)||0,s=parseFloat(e.paddingLeft)||0,a=i.selectionStart??0,r=document.createElement("span");r.setAttribute("aria-hidden","true"),r.style.visibility="hidden",r.style.position="absolute",r.style.whiteSpace="pre",r.style.top="0",r.style.left="0",r.style.font=e.font,r.style.fontSize=e.fontSize,r.style.fontFamily=e.fontFamily,r.style.fontWeight=e.fontWeight,r.style.letterSpacing=e.letterSpacing,r.style.fontVariant=e.fontVariant,r.style.textTransform=e.textTransform,r.textContent=i.value.slice(0,a),document.body.appendChild(r);const c=r.offsetWidth;r.remove();const p=t.left+n+s+c-i.scrollLeft,l=t.top+t.height/2;return{x:p,y:l}}function pt(i,t,e){if(!$.enabled||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const n=document.createElement("span");n.className="run-flat-anchor",n.style.left=`${i}px`,n.style.top=`${t}px`,e?.centerOnPoint&&(n.style.transform="translate(-50%, -50%)");const s=document.createElement("span");s.className="run-flat-particle",s.setAttribute("aria-hidden","true"),s.textContent="♭",e?.animationDelay&&(s.style.animationDelay=e.animationDelay);const a=(Math.random()-.5)*2.25,r=-6+Math.random()*12,c=r+8+Math.random()*10;s.style.setProperty("--drift-x",`${a}rem`),s.style.setProperty("--rot-0",`${r}deg`),s.style.setProperty("--rot-1",`${c}deg`),n.appendChild(s),document.body.appendChild(n),s.addEventListener("animationend",()=>{n.remove()},{once:!0})}function Zt(i,t=Qt){if(!$.enabled||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=i.getBoundingClientRect();if(!(e.width<=0||e.height<=0))for(let n=0;n<t;n++){const s=e.left+Math.random()*e.width,a=e.top+e.height*(.35+Math.random()*.35);pt(s,a,{animationDelay:`${n*.045}s`})}}function Jt(){return!!(globalThis.Deno?.stdout?.isTerminal?.()??globalThis.process?.stdout?.isTTY??!1)}function ct(i,t){return Jt()?`\x1B[${i}m${t}\x1B[0m`:t}function te(i){return ct(34,i)}function ee(i){return ct(32,i)}function A(i){return ct(36,i)}const o={NOP:0,CALL:1,PUTC:2,GETC:3,PUTN:5,CLOCK:6,DROP:8,PUSHR:14,PULLR:15,SHIFTL:16,SHIFTR:17,CLR:24,RAND:26,EXIT:27,DUP:33,DEPTH:35,SWAP:36,MOD:37,AND:38,STASH:40,FETCH:41,MUL:42,ADD:43,CONS:44,SUB:45,PRN:46,DIV:47,MARK:58,DEF:59,LT:60,EQ:61,GT:62,IF:63,BRA:91,KET:93,POW:94,OR:124,NOT:126},N={nop:o.NOP,eval:o.CALL,";":o.DEF,":":o.MARK,clr:o.CLR,rand:o.RAND,exit:o.EXIT,".":o.PRN,putc:o.PUTC,getc:o.GETC,putn:o.PUTN,clock:o.CLOCK,drop:o.DROP,swap:o.SWAP,dup:o.DUP,"<<":o.SHIFTL,">>":o.SHIFTR,"+":o.ADD,"-":o.SUB,cons:o.CONS,"*":o.MUL,"/":o.DIV,"<":o.LT,"=":o.EQ,">":o.GT,"?":o.IF,"%":o.MOD,"&":o.AND,"(":o.STASH,")":o.FETCH,"q<":o.PUSHR,"q>":o.PULLR,depth:o.DEPTH,"^":o.POW,"[":o.BRA,"]":o.KET,"|":o.OR,"~":o.NOT},w=255,x=w+1,ne=i=>i,se=i=>i,u={call:"call",push:"push"},ie=6,st=10,ae=new Map([[BigInt(o.MARK),":"],[BigInt(o.DEF),";"],[BigInt(o.BRA),"["],[BigInt(o.KET),"]"]]);function re(i){return(""+i.value).padEnd(st," ")}function oe(i,t){return t?t.padEnd(st," "):i.op===u.push&&i.meta?.pointer?`[${i.value}]`.padEnd(st," "):re(i)}function pe(i){return i.trim()?`/* ${i} */`:""}function ce(i){const t=he(i)?.toUpperCase()||"",e=i.op===u.call?ae.get(i.value):void 0,n=e!==void 0,s=oe(i,e),a=i.meta?.comment?.trim()||(i.op===u.call&&!n?t:""),r=(i.op===u.call&&!e?"EVAL":"").padEnd(ie," ");return[se(s),ne(r),pe(a)].join(" ")}function le(i){for(const t in N)if(N[t]===i)return t;return""}function he(i){if(i.op===u.call||i.op===u.push&&i.meta?.pointer)return i.meta?.name||le(Number(i.value))||""}function je(i){return i.map(ce).join(`
`)}function ue(i){return i=i.replace(/\\U([A-Fa-f0-9]{8})/g,(t,e)=>yt(e)),i=i.replace(/\\u([A-Fa-f0-9]{4})/g,(t,e)=>yt(e)),i.replace(/\\0/g,"\0").replace(/\\b/g,"\b").replace(/\\t/g,"	").replace(/\\n/g,`
`).replace(/\\v/g,"\v").replace(/\\f/g,"\f").replace(/\\r/g,"\r").replace(/\\'/g,"'").replace(/\\"/g,'"').replace(/\\s/g," ").replace(/\\\\/g,"\\")}function yt(i){let t="",e=parseInt(i,16);return e<=65535?t+=String.fromCharCode(e):e<=1114111?(e-=65536,t+=String.fromCharCode(55296|e>>10)+String.fromCharCode(56320|e&1023)):t+=`hex2Char error: Code point out of range: ${de(e)}`,t}function de(i){return(i+0).toString(16).toUpperCase()}const Ct="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",It=new Map;Ct.split("").forEach(function(i,t){It.set(i,t)});const _e=5n,Ot=1n<<_e,Dt=Number(Ot),Rt=Ot-1n;function fe(i){return i.map(be).map(ye).join("")}function me(i){return Ae(we(i)).map(xe)}function ge(i){return i>=0n?i<<1n:(-i<<1n)+1n}function ve(i){return i&1n?-(i>>1n):i>>1n}function be(i){if(i===0n)return[0];i=ge(i);const t=[];for(;i>0;){let e=Number(i&Rt);i>>=5n,i>0&&(e|=Dt),t.push(e)}return t}function ye(i){return i.map(t=>Ct[t]).join("")}function we(i){return i.split("").map(t=>{const e=It.get(t);if(e===void 0)throw new Error(`${i} is not a valid base64 encoded VLQ`);return e})}function Ae(i){const t=[];let e=[];if(i.forEach(n=>{e.push(n),(n&Dt)===0&&(t.push(e),e=[])}),e.length>0)throw new Error("Malformed VLQ sequence: The last VLQ never ended.");return t}function xe(i){const t=i.reverse().reduce((e,n)=>(e<<=5n,e|=BigInt(n)&Rt,e),0n);return ve(t)}const Se="/*",ke="*/";function J(i){if(!(i==="-"||i==="+"))try{let t=1n;return i=i.replaceAll("_",""),i.startsWith("-0")&&(t=-1n,i=i.replace("-","")),i.includes("e")||i.includes("E")?t*BigInt(+i):t*BigInt(i)}catch{return}}class D{constructor(t={}){this.symbols=new Map,this._nextCode=-1,this.host=t;let e;for(e in N)this.symbols.set(e,BigInt(N[e]))}static tokenize(t){return t.split(/\s+/).filter(Boolean).map(e=>{const n=J(e);return n!==void 0?n:e})}static tokenizeWithSpans(t){const e=[],n=/\S+/g;let s=0,a=0,r=0;const c=l=>{for(;r<l;){const h=t[r];h==="\r"?(t[r+1]===`
`&&r++,s++,a=0):h===`
`?(s++,a=0):a++,r++}};let p;for(;(p=n.exec(t))!==null;){const l=p.index;c(l);const h=p[0]??"",_=J(h);e.push({raw:h,value:_!==void 0?_:h,line:s,character:a,length:h.length,offset:l}),c(l+h.length)}return e}static compileToBase64(t){const e=t.flatMap(n=>{if(n.op===u.call&&n.value===0n)return[];const s=n.value<<1n;return[n.op===u.push?s:s|1n]});return fe(e)}nextCode(){return BigInt(this._nextCode--)}getSymbol(t){t=t.toLowerCase();let e=this.symbols.get(t);return e===void 0&&(e=this.nextCode(),this.symbols.set(t,e)),e}compileToIR(t,e=""){let n=0;const s=t.length;let a="";const r=[];let c;for(;n<s;)if(c=t[n++],a=this.unwrapTokenValue(c),typeof a=="bigint")p(a);else if(a.length>1&&a.startsWith(".")){const[h]=a.split(" ");switch(h){case".push":r[r.length-1].op=u.push;break;case".call":r[r.length-1].op=u.call;break;case".inline":r[r.length-1].meta||={},r[r.length-1].meta.inline=!0;break;case".unsafe":r[r.length-1].meta||={},r[r.length-1].meta.unsafe=!0;break;case".pointer":r[r.length-1].meta||={},r[r.length-1].meta.pointer=!0;break;case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Compiler: .exit requires a host exit handler");case".symbols":this.symbols.forEach((_,m)=>{(this.host.log||console.log)(m,_)});break;case".words":{const _=Array.from(this.symbols,([m])=>m).join(" ");(this.host.log||console.log)(_);break}}}else if(a[0]==="'"&&a.length>1)ue(a).replace(/^'/,"").replace(/'$/,"").split("").forEach(h=>{p(h.charCodeAt(0),{comment:h})});else if(a.endsWith(":")&&a.length>1){const h=a.replace(/:$/,"");p(this.getSymbol(h),{name:`${h}`,pointer:!0}),l(o.MARK,{name:":"})}else if(a===Se){const h=c,_=[];for(;n<t.length&&(c=t[n++],a=this.unwrapTokenValue(c),a!==ke);)_.push(a);l(0n,{comment:_.join(" ")},h)}else if(a.startsWith("[")&&a.endsWith("]")){const h=a.replace(/^\[/,"").replace(/\]$/,""),_=J(h);_!==void 0?p(_,{name:h,pointer:!0}):p(this.getSymbol(h),{name:h,pointer:!0})}else l(this.getSymbol(a),{name:a});return r;function p(h,_={},m=c){r.push({value:BigInt(h),op:u.push,meta:{..._,...D.toInstructionMeta(m,e)}})}function l(h,_={},m=c){r.push({value:BigInt(h),op:u.call,meta:{..._,...D.toInstructionMeta(m,e)}})}}unwrapTokenValue(t){return typeof t=="string"||typeof t=="bigint"?t:t.value}static toInstructionMeta(t,e){return!t||typeof t=="string"||typeof t=="bigint"?{filename:e}:{filename:e,line:t.line,character:t.character,length:t.length,offset:t.offset}}validate(t){const e=t.slice(),n=[];let s=0;for(;s<e.length;){const a=e[s];if(a.op===u.call&&a.value===BigInt(o.DEF)){let r=0;for(r=s;r>0&&!(e[r].op===u.call&&e[r].value===BigInt(o.MARK));r--);const c=e.splice(r-1,s-r+2);c.at(-1)?.meta?.unsafe||n.push(...this.validateDef(c)),s=r-1}s++}return n.push(...this.validateDef(e,"main")),n}validateDef(t,e){const n=[];let s=0,a=0,r=0,c=0;const p=[0];if(!t[0])return[];e=ee(e||t[0].meta?.name?.replace(/^&/,"")||"main");const l=te(t[0].meta?.filename||"-");for(;s<t.length;){const h=t[s];if(h.op===u.call){if(h.op===u.call&&h.value===BigInt(o.MARK)&&a++,h.op===u.call&&h.value===BigInt(o.DEF)&&a--,h.op===u.call&&h.value===BigInt(o.BRA)&&(r++,p.push(0)),h.op===u.call&&h.value===BigInt(o.KET)&&(r--,(p.length>1?p.pop():0)!==0&&n.push(`${l}: Unbalanced queue push ( ${A("q< q>")} ) in quote in ${e}`)),h.op===u.call&&(h.value===BigInt(o.PUSHR)||h.value===BigInt(o.STASH))&&(c++,p[p.length-1]++),h.op===u.call&&(h.value===BigInt(o.PULLR)||h.value===BigInt(o.FETCH))){if(p[p.length-1]===0){const m=h.value===BigInt(o.FETCH)?")":"q>";n.push(`${l}: Queue borrow ( ${A(m)} ) requires ${A(".unsafe")} in ${e} (including quotes)`)}c--,p[p.length-1]--}r<0&&n.push(`${l}: Bracket ( ${A("[ ]")} ) mismatch in ${e}`),a<0&&n.push(`${l}: Definition ( ${A(": ;")} ) mismatch in ${e}`)}s++}return r!==0&&n.push(`${l}: Unbalanced brackets ( ${A("[ ]")} ) in ${e}`),c!==0&&n.push(`${l}: Unbalanced queue push ( ${A("q< q> ( )")} ) in ${e}`),a!==0&&n.push(`${l}: Unbalanced definition ( ${A(": ;")} ) in ${e}`),n}}const qe=[{mnemonic:"NOP",syntax:"nop",stackEffect:"… nop == …",description:"No operation; does nothing.",opcode:0},{mnemonic:"EVAL",syntax:"eval",stackEffect:"[A] eval == a*",description:"Evaluates a quotation, executing its contents.",opcode:1},{mnemonic:"PUTC",syntax:"putc",stackEffect:"n putc == {prints char(n)}",description:"Prints a character given by its numeric code.",opcode:2},{mnemonic:"GETC",syntax:"getc",stackEffect:"getc == n {reads char}",description:"Reads a single character from input and pushes its code.",opcode:3},{mnemonic:"PUTN",syntax:"putn",stackEffect:"n putn == {prints n}",description:"Prints a number to output.",opcode:5},{mnemonic:"CLOCK",syntax:"clock",stackEffect:"clock == n {reads clock}",description:"Returns the current time as a Unix timestamp.",opcode:6},{mnemonic:"DROP",syntax:"drop",stackEffect:"a drop ==",description:"Removes the top value from the stack.",opcode:8},{mnemonic:"PUSHR",syntax:"q<",stackEffect:"a q< == | …a",description:"Pushes a value onto the return stack.",opcode:14},{mnemonic:"PULLR",syntax:"q>",stackEffect:"q> == a | a…",description:"Pops a value from the return stack onto the main stack.",opcode:15},{mnemonic:"SHIFTL",syntax:"<<",stackEffect:"a b << == n",description:"Left-shifts a by b bits.",opcode:16},{mnemonic:"SHIFTR",syntax:">>",stackEffect:"a b >> == n",description:"Right-shifts a by b bits.",opcode:17},{mnemonic:"CLR",syntax:"clr",stackEffect:"… clr ==",description:"Clears the entire stack.",opcode:24},{mnemonic:"RAND",syntax:"rand",stackEffect:"n rand == r {0 <= r < n}",description:"Generates a random number between 0 and n-1.",opcode:26},{mnemonic:"EXIT",syntax:"exit",stackEffect:"n exit == {exits with code n}",description:"Exits the program with the given exit code.",opcode:27},{mnemonic:"DUP",syntax:"dup",stackEffect:"a dup == a a",description:"Duplicates the top value on the stack.",opcode:33},{mnemonic:"DEPTH",syntax:"depth",stackEffect:"… depth == … n",description:"Pushes the current stack depth.",opcode:35},{mnemonic:"SWAP",syntax:"swap",stackEffect:"a b swap == b a",description:"Swaps the top two values on the stack.",opcode:36},{mnemonic:"MOD",syntax:"%",stackEffect:"a b % == n",description:"Computes the remainder of a divided by b.",opcode:37},{mnemonic:"AND",syntax:"&",stackEffect:"a b & == n",description:"Bitwise AND of a and b.",opcode:38},{mnemonic:"STASH",syntax:"(",stackEffect:"… ( == {moves stack to queue}",description:"Moves values from the stack to the queue.",opcode:40},{mnemonic:"FETCH",syntax:")",stackEffect:") == … {restores stack from queue}",description:"Moves values from the queue back to the stack.",opcode:41},{mnemonic:"MUL",syntax:"*",stackEffect:"a b * == n",description:"Multiplies a by b.",opcode:42},{mnemonic:"ADD",syntax:"+",stackEffect:"a b + == n",description:"Adds a and b together.",opcode:43},{mnemonic:"CONS",syntax:"cons",stackEffect:"x y cons == q",description:"Builds an anonymous quotation from two stack values (opcode also maps to `,`).",opcode:44},{mnemonic:"SUB",syntax:"-",stackEffect:"a b - == n",description:"Subtracts b from a.",opcode:45},{mnemonic:"DUMP",syntax:".",stackEffect:"… . == … {prints stack}",description:"Prints the entire stack to output.",opcode:46},{mnemonic:"DIV",syntax:"/",stackEffect:"a b / == n",description:"Divides a by b (integer division).",opcode:47},{mnemonic:"MARK",syntax:":",stackEffect:"n : == {begin definition(n)}",description:"Begins a new word definition with name n.",opcode:58},{mnemonic:"DEF",syntax:";",stackEffect:"; == {end definition}",description:"Ends the current word definition.",opcode:59},{mnemonic:"LT",syntax:"<",stackEffect:"a b < == flag",description:"Pushes true if a is less than b.",opcode:60},{mnemonic:"EQ",syntax:"=",stackEffect:"a b = == flag",description:"Pushes true if a equals b.",opcode:61},{mnemonic:"GT",syntax:">",stackEffect:"a b > == flag",description:"Pushes true if a is greater than b.",opcode:62},{mnemonic:"WHEN",syntax:"?",stackEffect:"flag [A] ? == a*",description:"Executes the quotation if flag is true.",opcode:63},{mnemonic:"BRA",syntax:"[",stackEffect:"[ == {begin quotation}",description:"Begins a quotation (anonymous code block).",opcode:91},{mnemonic:"KET",syntax:"]",stackEffect:"] == [A] {end quotation}",description:"Ends a quotation and pushes it to the stack.",opcode:93},{mnemonic:"POW",syntax:"^",stackEffect:"a b ^ == n",description:"Computes a raised to the power of b.",opcode:94},{mnemonic:"OR",syntax:"|",stackEffect:"a b | == n",description:"Bitwise OR of a and b.",opcode:124},{mnemonic:"NOT",syntax:"~",stackEffect:"a ~ == n'",description:"Bitwise NOT of a.",opcode:126}],Te={words:qe},Nt=new Map;for(const i of Te.words)Nt.set(i.opcode,i);function Ee(i){return Nt.get(i)}class Pe{constructor(t=16){this.buffer=new Array(t),this.head=0,this.tail=0,this._length=0,this._mask=t-1}get length(){return this._length}expand(){const t=this.buffer.length*2,e=new Array(t);if(this._length>0)if(this.head<this.tail)for(let n=0;n<this._length;n++)e[n]=this.buffer[this.head+n];else{const n=this.buffer.length-this.head;for(let s=0;s<n;s++)e[s]=this.buffer[this.head+s];for(let s=0;s<this.tail;s++)e[n+s]=this.buffer[s]}this.buffer=e,this.head=0,this.tail=this._length,this._mask=t-1}push(...t){this.pushArray(t)}pushArray(t){for(let e=0;e<t.length;e++)this._length===this.buffer.length&&this.expand(),this.buffer[this.tail]=t[e],this.tail=this.tail+1&this._mask,this._length++}unshift(...t){this.unshiftArray(t)}unshiftArray(t){for(;this._length+t.length>this.buffer.length;)this.expand();this.head=this.head-t.length&this._mask;for(let e=0;e<t.length;e++)this.buffer[this.head+e&this._mask]=t[e];this._length+=t.length}shift(){if(this._length===0)return;const t=this.buffer[this.head];return this.head=this.head+1&this._mask,this._length--,t}pop(){if(this._length===0)return;this.tail=this.tail-1&this._mask;const t=this.buffer[this.tail];return this._length--,t}get(t){if(!(t<0||t>=this._length))return this.buffer[this.head+t&this._mask]}}const wt=BigInt(o.DEF),At=BigInt(o.KET),xt=BigInt(o.MARK),St=BigInt(o.BRA),O=0n,E=1n;class Qe{constructor(t){this.stack=[],this.queue=new Pe,this.userDefs=[],this.sysDefs=new Array(w+1),this.symbols=new Map,this.depth=0,this.nextAnonOp=x,this.traceOn=!1,this.traceFormat="human",this.traceVerbose=!1,this.traceQueueMax=8,this.traceStackMax=32,this.traceStdoutMax=4096,this.base=10,this.statsOn=!1,this.profileOn=!1,this.stats={system_instructions_called:0,user_instructions_called:0,max_stack_depth:0,max_queue_depth:0},this.profile={},this.stdoutSinceLastTrace="",this.platform=t,this.setup()}static fromBase64(t){return me(t).flatMap(e=>{const n=e&1n,s=e>>1n;return[n,s]})}getStack(){return this.stack.slice()}peek(){const t=this.stack.length;if(t>0)return this.stack[t-1];throw new Error("Peek: stack underflow")}pop(){if(this.stack.length>0)return this.stack.pop();throw new Error("Pop: stack underflow")}push(t){this.stack.push(t)}poke(t){const e=this.stack.length;if(e>0){this.stack[e-1]=t;return}throw new Error("Poke: stack underflow")}clear(){this.stack.splice(0,this.stack.length)}queuePush(t,e){this.queue.push(t,e)}queueUnshift(t,e){this.queue.unshift(t,e)}queuePop(){const t=this.queue.pop()??0n;return[this.queue.pop()??0n,t]}defineSystem(t,e){const n=BigInt(e),s=this.getName(n);if(this.sysDefs[e]!==void 0)throw new Error(`Define: cannot redefine system word "${s}"`);this.sysDefs[e]=t}defineUser(t,e){const n=this.getName(e);if(e>-1&&e<w)throw new Error(`Define: cannot define system op "${n}"`);const s=Number(e)-x;if(this.userDefs[s]!==void 0)throw e>w?new Error(`Define: cannot redefine anon op "${n}"`):new Error(`Define: cannot redefine user op "${n}"`);this.userDefs[s]=t}throwUndefinedSysOp(t){const e=this.getName(t)||t;throw new Error(`Call: undefined system op "${e}"`)}throwUndefinedUserOp(t){const e=this.getName(t)||t;throw new Error(`Call: undefined user op "${e}"`)}callSystem(t){const e=this.sysDefs[Number(t)];if(typeof e=="function"){if(this.statsOn&&this.stats.system_instructions_called++,this.profileOn){const n=performance.now();e();const s=performance.now(),a=this.getName(t)||Number(t);this.profile[a]||=[0,0],this.profile[a][0]++,this.profile[a][1]!=0,this.profile[a][1]+=s-n;return}return e()}this.throwUndefinedSysOp(t)}callUser(t){const e=this.userDefs[Number(t)-x];if(e){if(this.statsOn&&this.stats.user_instructions_called++,this.queue.unshiftArray(e),this.profileOn){const n=this.getName(t,`&${t}`);this.profile[n]||=[0,void 0],this.profile[n][0]++}return}this.throwUndefinedUserOp(t)}callOp(t){return t>-1n&&t<w?this.callSystem(t):this.callUser(t)}loadBigIntCode(t){this.queue.pushArray(t)}loadIR(t){let e=0;for(;e<t.length;){const n=t[e++];if(n.op===u.call){if(n.value===0n)continue;n.meta?.name&&!this.symbols.has(n.value)&&this.symbols.set(n.value,n.meta?.name),this.queuePush(E,n.value)}else this.queuePush(O,n.value)}return this.stack}runChunkFast(t,e){const n=this.queue;let s=!1,a=0;const r=BigInt(w);for(;n.length>0&&a<t;){const c=n.shift()??0n,p=n.shift()??0n,l=c===E;if(s=!this.depth||l&&(p===wt||p===At||p===xt||p===St),l)if(!s)this.push(c),this.push(p);else if(p>-1n&&p<=r){const h=this.sysDefs[Number(p)];typeof h=="function"?h():this.throwUndefinedSysOp(p)}else{const h=this.userDefs[Number(p)-x];h?this.queue.unshiftArray(h):this.throwUndefinedUserOp(p)}else s||this.push(c),this.push(p);a++}return e+a}runChunkInstrumented(t,e){const n=this.queue;let s=e,a=0;const r=BigInt(w);let c=!1;for(;n.length>0&&a<t;){const p=n.shift()??0n,l=n.shift()??0n,h=p===E,_=this.traceOn?this.stack.slice():void 0;if(c=!this.depth||h&&(l===wt||l===At||l===xt||l===St),h)if(!c)this.push(p),this.push(l);else if(l>-1n&&l<=r){const g=this.sysDefs[Number(l)];if(typeof g=="function")if(this.statsOn&&this.stats.system_instructions_called++,this.profileOn){const b=globalThis.performance?.now?.()??Date.now();g();const X=globalThis.performance?.now?.()??Date.now(),q=this.getName(l)||Number(l);this.profile[q]||=[0,0],this.profile[q][0]++,this.profile[q][1]!=0,this.profile[q][1]+=X-b}else g();else this.throwUndefinedSysOp(l)}else{const g=this.userDefs[Number(l)-x];if(g){if(this.statsOn&&this.stats.user_instructions_called++,this.queue.unshiftArray(g),this.profileOn){const b=this.getName(l,`&${l}`);this.profile[b]||=[0,void 0],this.profile[b][0]++}}else this.throwUndefinedUserOp(l)}else c||this.push(p),this.push(l);this.statsOn&&(this.stats.max_stack_depth=Math.max(this.stats.max_stack_depth,this.stack.length),this.stats.max_queue_depth=Math.max(this.stats.max_queue_depth,n.length/2));const m=s++;this.traceOn&&this.trace({step:m,immediate:c,tag:p,value:l,stackBefore:_??[],stackAfter:this.traceVerbose||this.traceFormat==="jsonl"?this.stack.slice():void 0}),a++}return s}runChunk(t,e){return this.traceOn||this.statsOn||this.profileOn?this.runChunkInstrumented(t,e):this.runChunkFast(t,e)}run(){return this.runChunk(Number.POSITIVE_INFINITY,0),this.stack}async runAsync(t={}){const e=t.yieldIntervalMs??160,n=t.yieldSliceMax??t.yieldEvery??655360;if(!Number.isFinite(e)||e<0)throw new Error(`runAsync: yieldIntervalMs must be a non-negative finite number (received ${e})`);if(!Number.isFinite(n)||n<1)throw new Error(`runAsync: yieldSliceMax / yieldEvery must be a positive finite number (received ${n})`);const s=t.scheduler??(()=>new Promise(l=>{globalThis.setTimeout(l,0)})),a=typeof globalThis.performance<"u"&&typeof globalThis.performance.now=="function"?()=>globalThis.performance.now():()=>globalThis.Date.now();let r=0,c=0,p=!1;for(;this.queue.length>0&&!p;){const l=a(),h=e>0?l+e:l;for(;this.queue.length>0&&!p&&!(e>0&&a()>=h);){const _=r;if(r=this.runChunk(n,r),c+=r-_,t.onChunk?.({vmCyclesExecuted:c}),t.shouldContinue&&!t.shouldContinue()){p=!0;break}if(e===0)break}this.queue.length>0&&!p&&await s()}return{stack:this.stack.slice(),cancelled:p,vmCyclesExecuted:c}}trace({step:t,immediate:e,tag:n,value:s,stackBefore:a,stackAfter:r}){const c=this.takeStdoutSinceLastTraceForTraceEvent(),p=this.createTraceEvent(t,e,n,s,a,r,c);if(this.traceFormat==="jsonl"){this.writeTraceLine(JSON.stringify(p));return}this.writeTraceLine(this.formatHumanTrace(p))}createTraceEvent(t,e,n,s,a,r,c){const p=n===E,l=p?this.getName(s,String(s)):String(s),h=this.getQueuePreview(),_={step:t,immediate:e,tag:p?"call":"literal",value:String(s),action:l,stack_before:this.limitStack(a).map(String),stack_after:r?this.limitStack(r).map(String):void 0,queue_preview:h,queue_depth:this.queue.length/2};return c!==void 0&&c.length>0&&(_.stdout_since_last=c),_}limitStack(t){return t.length>this.traceStackMax?t.slice(-this.traceStackMax):t}getQueuePreview(){const t=[],e=Math.max(this.traceQueueMax,0);for(let n=0;n<this.queue.length&&t.length<e;n+=2){const s=this.queue.get(n)??0n,a=this.queue.get(n+1)??0n,r=s===E;t.push({tag:r?"call":"literal",value:String(a),action:r?this.getName(a,String(a)):String(a)})}return t}formatHumanTrace(t){const e=this.padHumanAction(t.action),n=this.formatHumanStack(t.stack_before),s=this.formatHumanQueue(t.queue_preview,t.queue_depth),a=this.layoutHumanTraceLine(t.step,n,e,s);if(this.traceVerbose){const r=this.formatHumanStack(t.stack_after??[]);return`${a}
${" ".repeat(String(t.step).length+1)}${r} | immediate=${t.immediate} tag=${t.tag} value=${t.value} stack_depth=${this.stack.length} queue_depth=${t.queue_depth}`}return a}padHumanAction(t){return t.length>=7?t:t.padStart(Math.floor((7+t.length)/2)," ").padEnd(7," ")}layoutHumanTraceLine(t,e,n,s){const a=this.getTraceTerminalWidth(),r=`${t} `;if(r.length>=a)return r.slice(0,a);const c=1,p=Math.min(n.length,Math.max(a-r.length-c*2,1)),l=Math.max(r.length+c,Math.floor((a-p)/2)),h=Math.min(l,Math.max(r.length+c,a-p-c)),_=h+p,m=r.length,g=Math.max(m,h-c),b=Math.min(a,_+c),X=a,q=Math.max(g-m,0),lt=Math.max(X-b,0),B=Array.from({length:a},()=>" ");if(this.writeSegment(B,0,r,r.length),this.writeSegment(B,h,n,p),q>0){const I=this.truncateLeft(e,q);this.writeSegment(B,g-I.length,I,I.length)}if(lt>0){const I=this.truncateRight(s,lt);this.writeSegment(B,b,I,I.length)}return B.join("").replace(/\s+$/,"")}formatHumanStack(t){return t.length===0?"[ ]":`[ ${t.join(" ")} ]`}formatHumanQueue(t,e){const n=t.map(a=>a.tag==="call"?`&${a.action}`:a.value),s=Math.max(e-t.length,0);return s>0&&n.push(`…(+${s})`),n.length===0?"[ ]":`[ ${n.join(" ")} ]`}getTraceTerminalWidth(){const e=globalThis.Deno,n=e?.stderr?.isTerminal?.()&&typeof e.stderr.rid=="number"?e.stderr.rid:e?.stdout?.isTerminal?.()&&typeof e.stdout.rid=="number"?e.stdout.rid:void 0;if(typeof n=="number")try{const r=e?.consoleSize?.(n).columns;if(typeof r=="number"&&r>0)return r}catch{}const s=globalThis.process,a=s?.stderr?.isTTY&&typeof s.stderr.columns=="number"?s.stderr.columns:s?.stdout?.isTTY&&typeof s.stdout.columns=="number"?s.stdout.columns:void 0;return typeof a=="number"&&a>0?a:120}truncateLeft(t,e){return e<=0?"":t.length<=e?t:e===1?"…":`…${t.slice(-(e-1))}`}truncateRight(t,e){return e<=0?"":t.length<=e?t:e===1?"…":`${t.slice(0,e-1)}…`}writeSegment(t,e,n,s){if(!(s<=0))for(let a=0;a<s&&a<n.length&&e+a<t.length;a++)t[e+a]=n[a]}writeTraceLine(t){const e=new TextEncoder().encode(`${t}
`);if(this.platform.io.writeError){this.platform.io.writeError(e);return}this.platform.io.write(e)}ioWriteStdout(t){this.traceOn&&this.traceFormat==="jsonl"&&(this.stdoutSinceLastTrace+=new TextDecoder().decode(t)),this.platform.io.write(t)}takeStdoutSinceLastTraceForTraceEvent(){if(this.traceFormat!=="jsonl")return;let t=this.stdoutSinceLastTrace;if(this.stdoutSinceLastTrace="",!t)return;const e=Math.max(0,this.traceStdoutMax);return e>0&&t.length>e&&(t=t.slice(0,e)+`
…[truncated]`),t}getName(t,e=String(t)){return this.symbols.has(t)?this.symbols.get(t):String(e)}inspectValue(t){const e=this.symbols.get(t),n=t>=0n&&t<=BigInt(w),s=n?this.sysDefs[Number(t)]:this.userDefs[Number(t)-x],a=s!==void 0;let r;Array.isArray(s)&&(r=this.parseDefinitionTokens(s));let c,p;if(n){const l=Ee(Number(t));l&&(c=l.stackEffect,p=l.description)}return{value:t,name:e,isSystem:n,isDefined:a,definition:r,stackEffect:c,description:p}}parseDefinitionTokens(t){const e=[];for(let n=0;n<t.length;n+=2){const s=t[n]??0n,a=t[n+1]??0n,r=s===E,c=r?this.symbols.get(a):void 0,l=a>=0n&&a<=BigInt(w)?this.sysDefs[Number(a)]!==void 0:this.userDefs[Number(a)-x]!==void 0;e.push({value:a,tag:s,name:c,isCall:r,isDefined:l})}return e}print(){const t=this.stack.map(e=>e.toString(this.base)).join(" ");this.ioWriteStdout(new TextEncoder().encode(`[ ${t} ]
`))}loadSourceMap(t){Object.keys(t.symbols).forEach(e=>{this.symbols.set(BigInt(e),t.symbols[e])})}getNextAnonOp(){let t=this.nextAnonOp++;for(;this.userDefs[t-x]!==void 0;)t=this.nextAnonOp++;return BigInt(t)}setup(){const t=new TextEncoder;let e;for(e in N)this.symbols.set(BigInt(N[e]),e);this.defineSystem(()=>{},o.NOP),this.defineSystem(()=>{const n=this.pop();this.callOp(n)},o.CALL),this.defineSystem(()=>{this.depth--;const[,n]=this.queuePop(),s=this.stack.splice(Number(n||0))||[];this.defineUser(s,this.pop())},o.DEF),this.defineSystem(()=>{this.depth--;const[,n]=this.queuePop(),s=this.stack.splice(Number(n||0))||[],a=this.getNextAnonOp();this.defineUser(s,a),this.depth>0&&this.push(0n),this.push(a)},o.KET),this.defineSystem(()=>{this.depth++;const n=this.stack.length;this.queuePush(O,BigInt(n))},o.BRA),this.defineSystem(()=>{this.depth++;const n=this.stack.length;this.queuePush(O,BigInt(n))},o.MARK),this.defineSystem(()=>this.clear(),o.CLR),this.defineSystem(()=>{const n=this.pop();this.platform.exit(Number(n))},o.EXIT),this.defineSystem(()=>{const n=this.pop();this.push($e(n))},o.RAND),this.defineSystem(()=>{this.print()},o.PRN),this.defineSystem(()=>{this.push(BigInt(this.platform.now()))},o.CLOCK),this.defineSystem(()=>{const n=t.encode(String.fromCharCode(Number(this.pop())));this.ioWriteStdout(n)},o.PUTC),this.defineSystem(()=>{this.platform.io.setRaw&&this.platform.io.setRaw(!0);const n=this.platform.io.readByte();this.platform.io.setRaw&&this.platform.io.setRaw(!1),this.push(BigInt(n??0))},o.GETC),this.defineSystem(()=>{const n=t.encode(this.pop().toString(this.base));this.ioWriteStdout(n)},o.PUTN),this.defineSystem(()=>{this.pop()},o.DROP),this.defineSystem(()=>{const n=this.peek(),s=this.stack[this.stack.length-2];this.stack[this.stack.length-2]=n,this.poke(s)},o.SWAP),this.defineSystem(()=>{this.push(this.peek())},o.DUP),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]+=n},o.ADD),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]-=n},o.SUB),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]*=n},o.MUL),this.defineSystem(()=>{const n=this.pop();if(n===0n)throw new Error("DIV: Division by zero");this.stack[this.stack.length-1]/=n},o.DIV),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]%=n},o.MOD),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]<<=n},o.SHIFTL),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]>>=n},o.SHIFTR),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]&=n},o.AND),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]**=n},o.POW),this.defineSystem(()=>{this.push(this.pop()>this.pop()?1n:0n)},o.LT),this.defineSystem(()=>{this.push(this.pop()===this.pop()?1n:0n)},o.EQ),this.defineSystem(()=>{this.push(this.pop()<this.pop()?1n:0n)},o.GT),this.defineSystem(()=>{const n=this.pop();this.pop()!==0n&&this.queueUnshift(E,n)},o.IF),this.defineSystem(()=>{this.queuePush(O,this.pop())},o.PUSHR),this.defineSystem(()=>{const[,n]=this.queuePop();this.push(n)},o.PULLR),this.defineSystem(()=>{this.push(BigInt(this.stack.length))},o.DEPTH),this.defineSystem(()=>{const n=this.stack.length;this.stack.splice(0,n).forEach(a=>this.queuePush(O,a)),this.queuePush(O,BigInt(n))},o.STASH),this.defineSystem(()=>{const[,n]=this.queuePop(),s=Number(n),a=[];for(let r=0;r<s;r++){const[,c]=this.queuePop();a.unshift(c)}this.stack.unshift(...a)},o.FETCH),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]|=n},o.OR),this.defineSystem(()=>{const n=this.pop();this.push(~n)},o.NOT),this.defineSystem(()=>{const n=this.pop(),a=[0n,this.pop(),1n,n],r=this.getNextAnonOp();this.defineUser(a,r),this.depth>0&&this.push(0n),this.push(r)},o.CONS)}printProfile(){console.log(),console.log("Profile:");const t=Object.keys(this.profile).map(s=>{const a=this.profile[s][0],r=this.profile[s][1];return{name:s,calls:a,time:r,system:typeof r<"u","ops/ms":r?Math.round(a/r):""}}).sort((s,a)=>a.calls-s.calls),e=t.filter(s=>s.system),n=t.filter(s=>!s.system);console.table(e,["name","calls","ops/ms"]),console.table(n,["name","calls"]),console.log()}printStats(){console.log(),console.log("Interpreter stats:"),console.log(this.stats),console.log()}}function $e(i){const t=i,e=t.toString().length;let n="";for(;n.length<e;)n+=Math.random().toString().split(".")[1];n=n.slice(0,e);const s="1"+"0".repeat(e);return t*BigInt(n)/BigInt(s)}const M=BigInt(o.DEF),it=BigInt(o.KET),L=BigInt(o.MARK),at=BigInt(o.BRA),d=i=>(i=BigInt(i),t=>t.op===u.call&&t.value===i),y=i=>(i=BigInt(i),t=>t.op===u.push&&t.value===i),f=i=>i.op===u.push,tt=i=>i.op===u.push&&i.value!==0n,Ce=i=>i.op===u.push&&i.value>=0n,Ie=i=>i>0n&&(i&i-1n)===0n,Oe=i=>BigInt(i.toString(2).length-1),De=i=>i.op===u.push&&Ie(i.value),Re=i=>i.op===u.call&&![at,it,L,M].includes(i.value),Ne=[{name:"No operation",pattern:[d(o.NOP)],replacement:()=>[]},{name:"Null Sequence - SWAP SWAP",pattern:[d(o.SWAP),d(o.SWAP)],replacement:()=>[]},{name:"Null Sequence - DUP DROP",pattern:[d(o.DUP),d(o.DROP)],replacement:()=>[]},{name:"Null Sequence - PUSHR PULLR",pattern:[d(o.PUSHR),d(o.PULLR)],replacement:()=>[]},{name:"Null Sequence - CLOCK DROP",pattern:[d(o.CLOCK),d(o.DROP)],replacement:()=>[]},{name:"Null Sequence - RAND DROP",pattern:[d(o.RAND),d(o.DROP)],replacement:()=>[]},{name:"Null Sequence - DEPTH DROP",pattern:[d(o.DEPTH),d(o.DROP)],replacement:()=>[]},{name:"Null Sequence - NOT NOT",pattern:[d(o.NOT),d(o.NOT)],replacement:()=>[]},{name:"Indirect calls - n EVAL",pattern:[f,d(o.CALL)],replacement:i=>[{op:u.call,value:i.value,meta:{name:i.meta?.name?.replace(/^&/,"")}}]},{name:"Null Sequence - n DROP",pattern:[f,d(o.DROP)],replacement:()=>[]},{name:"Constant Folding - a b ADD",pattern:[f,f,d(o.ADD)],replacement:(i,t)=>[{op:u.push,value:i.value+t.value}]},{name:"Algebraic Simplification - 0 ADD",pattern:[y(0),d(o.ADD)],replacement:()=>[]},{name:"Algebraic Simplification - swap ADD",pattern:[d(o.SWAP),d(o.ADD)],replacement:(i,t)=>[t]},{name:"Constant Folding - a b SUB",pattern:[f,f,d(o.SUB)],replacement:(i,t)=>[{op:u.push,value:i.value-t.value}]},{name:"Algebraic Simplification - 0 SUB",pattern:[y(0),d(o.SUB)],replacement:()=>[]},{name:"Constant Folding - a b MUL",pattern:[f,f,d(o.MUL)],replacement:(i,t)=>[{op:u.push,value:i.value*t.value}]},{name:"Algebraic Simplification - 1 MUL",pattern:[y(1),d(o.MUL)],replacement:()=>[]},{name:"Algebraic Simplification - swap MUL",pattern:[d(o.SWAP),d(o.MUL)],replacement:(i,t)=>[t]},{name:"Algebraic Simplification - swap AND",pattern:[d(o.SWAP),d(o.AND)],replacement:(i,t)=>[t]},{name:"Algebraic Simplification - swap OR",pattern:[d(o.SWAP),d(o.OR)],replacement:(i,t)=>[t]},{name:"Algebraic Simplification - swap EQ",pattern:[d(o.SWAP),d(o.EQ)],replacement:(i,t)=>[t]},{name:"Constant Folding - a b DIV",pattern:[f,tt,d(o.DIV)],replacement:(i,t)=>[{op:u.push,value:i.value/t.value}]},{name:"Constant Folding - a b MOD",pattern:[f,tt,d(o.MOD)],replacement:(i,t)=>[{op:u.push,value:i.value%t.value}]},{name:"Constant Folding - a b SHIFTL",pattern:[f,f,d(o.SHIFTL)],replacement:(i,t)=>[{op:u.push,value:i.value<<t.value}]},{name:"Constant Folding - a b SHIFTR",pattern:[f,f,d(o.SHIFTR)],replacement:(i,t)=>[{op:u.push,value:i.value>>t.value}]},{name:"Constant Folding - a b AND",pattern:[f,f,d(o.AND)],replacement:(i,t)=>[{op:u.push,value:i.value&t.value}]},{name:"Constant Folding - a b OR",pattern:[f,f,d(o.OR)],replacement:(i,t)=>[{op:u.push,value:i.value|t.value}]},{name:"Constant Folding - a NOT",pattern:[f,d(o.NOT)],replacement:i=>[{op:u.push,value:~i.value}]},{name:"Constant Folding - a b LT",pattern:[f,f,d(o.LT)],replacement:(i,t)=>[{op:u.push,value:i.value<t.value?1n:0n}]},{name:"Constant Folding - a b EQ",pattern:[f,f,d(o.EQ)],replacement:(i,t)=>[{op:u.push,value:i.value===t.value?1n:0n}]},{name:"Constant Folding - a b GT",pattern:[f,f,d(o.GT)],replacement:(i,t)=>[{op:u.push,value:i.value>t.value?1n:0n}]},{name:"Constant Folding - a b POW",pattern:[f,Ce,d(o.POW)],replacement:(i,t)=>[{op:u.push,value:i.value**t.value}]},{name:"Algebraic Simplification - 0 OR",pattern:[y(0),d(o.OR)],replacement:()=>[]},{name:"Algebraic Simplification - 0 SHIFTL",pattern:[y(0),d(o.SHIFTL)],replacement:()=>[]},{name:"Algebraic Simplification - 0 SHIFTR",pattern:[y(0),d(o.SHIFTR)],replacement:()=>[]},{name:"Algebraic Simplification - 1 POW",pattern:[y(1),d(o.POW)],replacement:()=>[]},{name:"Algebraic Simplification - 1 DIV",pattern:[y(1),d(o.DIV)],replacement:()=>[]},{name:"Constant propagation - a DUP",pattern:[f,d(o.DUP)],replacement:i=>[i,i]},{name:"Unreachable Code - 0 &b IF",pattern:[y(0),f,d(o.IF)],replacement:()=>[]},{name:"Flows-Of-Control Optimizations - !0 &b IF",pattern:[tt,f,d(o.IF)],replacement:(i,t,e)=>[{op:u.call,value:t.value,meta:{name:t.meta?.name?.replace(/^&/,"")}}]},{name:"Null Sequence - 0 eval",pattern:[y(0),d(o.CALL)],replacement:()=>[]},{name:"Empty List - [ ]",pattern:[d(o.BRA),d(o.KET)],replacement:()=>[{op:u.push,value:0n,meta:{pointer:!0,name:"0"}}]},{name:"Single-word Quote - [ word ]",pattern:[d(o.BRA),Re,d(o.KET)],replacement:(i,t)=>[{op:u.push,value:t.value,meta:{pointer:!0,name:t.meta?.name}}]},{name:"Strength Reduction - Power of 2 MUL -> SHIFTL",pattern:[De,d(o.MUL)],replacement:i=>[{op:u.push,value:Oe(i.value)},{op:u.call,value:BigInt(o.SHIFTL)}]}];class Ge{constructor(){this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0},this.minOptPasses=2,this.maxOptPasses=20,this.defs=new Map,this.calledWords=new Set,this.optimized=[],this.nextAnonOp=w+1}optimize(t){this.reset(),this.stats.pre_optimization_ir_size=t.length,this.optimized=t;let e;do e=this.optimized.length,this.optLoop();while((this.optimized.length<e||this.stats.optimization_passes<this.minOptPasses)&&this.stats.optimization_passes<this.maxOptPasses);return this.optimized=this.pullDefs(this.optimized),this.optimized=this.addReferencedWords(this.optimized),this.stats.post_optimization_ir_size=this.optimized.length,this.optimized}optLoop(){this.optimized=this.peepholeOptimization(this.optimized),this.optimized=this.getDefs(this.optimized),this.optimized=this.inlineWords(this.optimized,4),this.stats.optimization_passes++}reset(){this.optimized=[],this.defs=new Map,this.calledWords=new Set,this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0}}getDefs(t){let e=0;for(;e<t.length;){const n=t[e];if(n.op===u.call){if(n.value===it){this.stats.optimization_passes===0&&this.stats.user_defined_anon_defs++,n.meta??={},n.meta.uid??=this.nextAnonOp++;let s=e;for(;s-- >0;){const p=t[s];if(p.op===u.call&&p.value===at)break}const a=BigInt(n.meta.uid),r={op:u.push,value:a,meta:{pointer:!0}},c=t.slice(s,e+1);c.unshift(r),c[1]={...c[1],value:L,meta:{...c[1].meta,name:":"}},c[c.length-1]={...c[c.length-1],value:M,meta:{...c[c.length-1].meta,name:";"}},this.defs.set(a,c)}else if(n.value===M){this.stats.optimization_passes===0&&this.stats.user_defined_named_defs++;let s=e;for(;s-- >0;){const c=t[s];if(c.op===u.call&&c.value===L)break}const a=t[s-1];a.meta||={},a.meta.pointer=!0;const r=t.slice(s-1,e+1);this.defs.set(a.value,r)}}e++}return t}pullDefs(t,e=!1){const n=t.slice();let s=0;for(;s<n.length;){const a=n[s];if(a.op===u.call){if(a.value===it){a.meta??={},a.meta.uid??=this.nextAnonOp++;const r=s;for(;s-- >0;){const h=n[s];if(h.op===u.call&&h.value===at)break}const c=BigInt(a.meta.uid),p={op:u.push,value:c,meta:{pointer:!0}},l=n.splice(s,r-s+1,p);l.unshift(p),l[1]={...l[1],value:L,meta:{...l[1].meta,name:":"}},l[l.length-1]={...l[l.length-1],value:M,meta:{...l[l.length-1].meta,name:";"}},this.defs.set(c,l)}else if(a.value===M&&!e){const r=s;for(;s-- >0;){const l=n[s];if(l.op===u.call&&l.value===L)break}const c=n[s-1];c.meta||={},c.meta.pointer=!0;const p=n.splice(s-1,r-s+2);s=s-2,this.defs.set(p[0].value,p)}}s++}return n}peepholeOptimization(t){const e=t.slice();for(;;){const n=this.stats.peephole_optimizations;let s=0;for(;s<e.length;){for(const a of Ne){const{pattern:r,replacement:c}=a;if(s+r.length>e.length)continue;if(r.every((l,h)=>l(e[s+h]))){this.stats.peephole_optimizations++;const l=e.slice(s,s+r.length);e.splice(s,r.length,...c(...l)),s=Math.max(0,s-r.length-1);break}}s++}if(this.stats.peephole_optimizations===n)break}return e}inlineWords(t,e=1,n=[]){return t.flatMap(s=>{if(s.meta?.unsafe)return s;if(s.op===u.call&&this.defs.has(s.value)){if(n.includes(s.value))return s;const a=this.defs.get(s.value);if(!a)return s;const r=a[a.length-1];if(r.meta?.unsafe)return s;if(r.meta?.inline||s.meta?.inline)return this.stats.inlined_calls++,this.inlineWords(a.slice(2,-1),1/0,n.concat(s.value));if(a.length<=e+3)return this.stats.inlined_calls++,this.inlineWords(a.slice(2,-1),e,n.concat(s.value))}return s})}addReferencedWords(t){return t.slice().forEach(e=>{e.op===u.push&&e.meta?.pointer?this.addDef(e.value):e.op===u.call&&this.addDef(e.value)}),t}addDef(t){if(!this.calledWords.has(t)){const e=this.defs.get(t);if(e)return this.stats.post_optimization_user_defs++,this.calledWords.add(t),this.optimized.unshift(...e),this.addReferencedWords(e)}}}class z{constructor(t,e,n){this.imported=new Set,this.importPrefixes=new Map,this.macroPreludeReady=!1,this.rootFilename=null,this.host=t,this.engine=e.engine,this.compiler=e.compiler||new D,this.stdlibRoots=n?.stdlibRoots??[],n?.macroEngineBootstrapFile&&this.bootstrapMacroEngine(n.macroEngineBootstrapFile)}static tokenize(t){return t.split(/[\r\n]+/)}preprocess(t,e="-"){const n=e!=="-"&&this.host.fileExists(e)?this.host.realpath(e):e,s=this.rootFilename===null;s&&n!=="-"&&(this.rootFilename=n);try{return this.preprocessLines(t,n)}finally{s&&(this.rootFilename=null)}}preprocessLines(t,e,n){return t.map(s=>{if(s.length>1&&s[0]==="."){const[a,...r]=s.split(" ");if(a[0]==="."&&a.length>1){switch(a){case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Preprocessor: .exit requires a host exit handler");case".load":{const c=this.findFile(r.join(" "),e),p=this.host.readTextFile(c);return this.preprocessLines(z.tokenize(p),c)}case".import":{const c=this.findFile(r.join(" "),e);if(!this.imported.has(c)){this.imported.add(c);const p=this.host.readTextFile(c);return this.preprocessLines(z.tokenize(p),c,c)}return""}case".m":return this.runMacro(r.join(" "),s);case".ff":return this.runMacro(r.join(" "),s);case".ffp":{if(!this.macroPreludeReady)throw new Error("Preprocessor: .ffp requires prelude-enabled macro context");return this.runMacro(r.join(" "),s)}}return""}}return n?this.mangleImportedLine(s,n):s}).join(`
`)}findFile(t,e="-"){const n=t.trim();if(!n)throw new Error("Preprocessor: missing import path");return this.isStdlibImport(n)?this.resolveStdlibImport(n):this.resolveFilesystemImport(n,e)}isStdlibImport(t){return t.startsWith("<")&&t.endsWith(">")&&t.length>2}resolveFilesystemImport(t,e){if(e&&e!=="-"&&!this.host.path.isAbsolute(t)){const s=this.host.path.dirname(e),a=this.host.path.resolve(s,t),r=this.resolveFileOrDirectory(a);if(r)return r}const n=this.resolveFileOrDirectory(t);if(n)return n;throw new Error(`File not found: "${t}"`)}resolveStdlibImport(t){const e=t.slice(1,-1).trim(),n=[];for(const a of this.stdlibRoots){n.push(a);const r=this.host.path.resolve(a,e),c=this.resolveFileOrDirectory(r,{extensions:[".ffp",".ff"]});if(c)return c}const s=n.length>0?n.join(", "):"(no stdlib roots configured)";throw new Error(`Stdlib import not found: ${t} (searched roots: ${s})`)}resolveFileOrDirectory(t,e){if(this.host.fileExists(t))return this.host.realpath(t);for(const n of e?.extensions??[]){const s=`${t}${n}`;if(this.host.fileExists(s))return this.host.realpath(s)}if(this.host.directoryExists(t)){const n=this.getBasename(t);for(const s of[".ffp",".ff"]){const a=this.host.path.resolve(t,`${n}${s}`);if(this.host.fileExists(a))return this.host.realpath(a)}}return null}getBasename(t){const e=t.replace(/[\\/]+$/,""),n=e.split(/[\\/]+/).filter(Boolean);return n[n.length-1]??e}bootstrapMacroEngine(t){const e=this.findFile(t),n=this.host.readTextFile(e),a=new z(this.host,{engine:this.engine,compiler:this.compiler},{stdlibRoots:this.stdlibRoots}).preprocess(z.tokenize(n),e),r=this.compiler.compileToIR(D.tokenize(a),e);this.engine.loadIR(r),this.engine.run(),this.engine.clear(),this.macroPreludeReady=!0}runMacro(t,e){const n=this.compiler.compileToIR(D.tokenize(t));this.engine.loadIR(n),this.engine.run();const s=this.engine.getStack();return this.engine.clear(),s.map(String).join(" ")+` /* ${e} */`}mangleImportedLine(t,e){const n=this.getImportPrefix(e);return t.split(/(\s+)/).map(s=>!s||/\s+/.test(s)?s:this.mangleImportedToken(s,n)).join("")}mangleImportedToken(t,e){return t.startsWith("[__")?`[${e}${t.slice(3)}`:t.startsWith("__")?`${e}${t.slice(2)}`:t}getImportPrefix(t){const e=this.importPrefixes.get(t);if(e)return e;const s=this.getNormalizedImportPath(t).replace(/[^A-Za-z0-9]+/g,"_").replace(/^_+|_+$/g,"").replace(/_+/g,"_")||"module",a=this.hashPath(t),r=`__${s}_${a}__`;return this.importPrefixes.set(t,r),r}getNormalizedImportPath(t){if(this.rootFilename&&this.rootFilename!=="-"){const e=this.host.path.dirname(this.rootFilename),n=this.host.path.relative(e,t);if(n)return n.replace(/\\/g,"/")}return t.replace(/\\/g,"/")}hashPath(t){let e=2166136261;for(let n=0;n<t.length;n++)e^=t.charCodeAt(n),e=Math.imul(e,16777619)>>>0;return e.toString(36)}}const Ye=`/* constants 1 2 3 */
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
choose: rot [ swap ] ? drop ; .inline  /* flag a b choose == a or b */
branch: choose eval ; .inline /* flag [B] [C] branch == b* or c* */

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
`,Xe=`.import ./num.ffp

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
`,Ze=`.import ./pred.ffp

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
`,Je=`.import ./atan-shared.ffp

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
`,tn=`.import ./arith.ffp
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
`,en=`.import ./atan-shared.ffp
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
`,nn=`.import ./atan-shared.ffp

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
`,sn=`.import ./atan-shared.ffp
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
`,an=`.import ./arith.ffp

/*
 * Naming note: the \`i\` prefix means integer.
 * \`icbrt\` returns the integer cube root (truncated toward zero).
 */

__closer: dup2 2 ^ / over 2 * + 3 / ;
__loop: __closer dup2 > [ nip __loop ] ? ;
__cbrtn: dup 3 / __loop drop nip ;

icbrt: dup sgn swap over * dup 1 > [ __cbrtn ] ? * ; /* x icbrt == ⌊cbrt(x)⌋₀ */
`,rn=`
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
`,on=`.import ../core/core.ff

__t: tuck % dup [ __t ] ? ;

gcd: dup [ __t ] ? drop ;
lcm: dup2 gcd / * ;
`,pn=`.import ../core/core.ff
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
`,cn=`.import ./pred.ffp
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
`,ln=`.import ../core/core.ff

/* Logarithm and combinatorics */

!: dup [ dup -- ! * ] [ drop 1 ] branch ; /* n ! == n! */
nck: dup2 - ! swap ! * [ ! ] dip / ; /* n k nck == C(n,k) */

/* Knuth operators */

^^: -- dup [ [ dup ] swap times [ ^ ] ] dip times ;
^^^: -- dup [ [ dup ] swap times [ ^^ ] ] dip times ;
`,hn=`.import ./atan-core.ffp

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
`,un=`.import ../core/core.ff
.import ./arith.ffp

/* Internal precision helpers shared by variable-precision math words. */
n->S: 10 swap ^ ; /* n n->S == 10ⁿ */
n->S2: 2 * n->S ; /* n n->S2 == 10²ⁿ */
n->K: 6 * 4 + 5 / 10 + ; /* n n->K == ⌈6*n/5⌉+10 */
p/q*S: n->S swap rot * swap / ; /* p q n p/q*S == ⌊p*10ⁿ/q⌋₀ */

ntrunc: n->S / ; /* x n ntrunc == ⌊x/10ⁿ⌋₀ */
nfrac: [ abs ] dip n->S % ; /* x n nfrac == (x - ⌊x/10ⁿ⌋₀)*10ⁿ */
`,dn=`.import ../core/core.ff

/* Predicates */

negitive?: 0 < ; /* n negitive? == flag */
positive?: 0 > ; /* n positive? == flag */
divisor?: % zero? ; .inline /* n d divisor? == flag */
even?: 2 divisor? ; .inline /* n even? == flag */
odd?: even? not ; .inline /* n odd? == flag */
`,_n=`.import ./pred.ffp

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
`,fn=`.import ../core/core.ff
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
`,mn=`.import ../core/core.ff
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
`,gn=`/* Trigonometric words live here. Pi-derived constants are defined in pi.ffp. */
`,vn=`.import ./core/core.ff
.import ./math/math.ffp
.import ./string/string.ffp
.import ./seq/seq.ffp
.import ./time/time.ffp`,bn=`.import ../core/core.ff

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
`,yn=`.import ../core/core.ff

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
`,wn=`/* String output */

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
`,An=`.import char.ffp
.import str.ffp`,xn=`.import ./core/core.ff
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
`,Sn=`.import ./core/core.ff
.import ./string/string.ffp

assert: falsey? [ 0 10 'Failed' println .inline 1 exit ] ? ;
assert_eq: = assert .inline ;
assert_false: not assert .inline ;

OK: 0 '\\sOK' println clr ;

¶: clr 999 ;`,kn=`.import ./utc.ffp
`,qn=`.import ../core/core.ff
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
`;function k(i){const t=i.startsWith("/"),e=i.split("/").filter(Boolean),n=[];for(const s of e)if(s!=="."){if(s===".."){n.pop();continue}n.push(s)}return`${t?"/":""}${n.join("/")}`||(t?"/":".")}function Be(i){const t=k(i),e=t.lastIndexOf("/");return e<=0?t.startsWith("/")?"/":".":t.slice(0,e)}function Fe(...i){const t=i.filter(Boolean).join("/").replaceAll(/\/+/g,"/");return k(t)}function Me(i,t){const e=k(i).split("/").filter(Boolean),n=k(t).split("/").filter(Boolean);let s=0;for(;s<e.length&&s<n.length&&e[s]===n[s];)s++;const a=e.length-s,r=n.slice(s);return Array(a).fill("..").concat(r).join("/")||"."}function Tn(i){return{readTextFile(t){const e=k(t),n=i[e];if(typeof n!="string")throw new Error(`Virtual file not found: ${e}`);return n},fileExists(t){return typeof i[k(t)]=="string"},directoryExists(t){const e=k(t).replace(/\/+$/,""),n=e==="/"?"/":`${e}/`;return Object.keys(i).some(s=>s.startsWith(n))},realpath(t){return k(t)},path:{isAbsolute(t){return t.startsWith("/")},dirname:Be,relative:Me,resolve:Fe}}}function En(i={}){const t=new TextDecoder,e=new TextEncoder,n=Array.from(e.encode(i.stdin??""));return{io:{write(s){i.onWrite?.(t.decode(s))},readByte(){return n.shift()??null}},exit(s){i.onExit?.(s)},now(){return Date.now()}}}export{v as A,en as B,tn as C,Ue as D,W as E,Je as F,Ze as G,Xe as H,Ye as I,En as J,D as K,Qe as L,Tn as M,Ke as N,Ve as O,z as P,Ge as Q,je as R,qn as _,We as a,ze as b,kn as c,Sn as d,xn as e,An as f,wn as g,yn as h,bn as i,vn as j,gn as k,mn as l,fn as m,_n as n,dn as o,un as p,hn as q,ln as r,He as s,cn as t,pn as u,on as v,rn as w,an as x,sn as y,nn as z};
