var jm=Object.defineProperty;var Km=(n,e,t)=>e in n?jm(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var zt=(n,e,t)=>Km(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();let Yo=[],Ih=[];(()=>{let n="lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map(e=>e?parseInt(e,36):1);for(let e=0,t=0;e<n.length;e++)(e%2?Ih:Yo).push(t=t+n[e])})();function Xm(n){if(n<768)return!1;for(let e=0,t=Yo.length;;){let i=e+t>>1;if(n<Yo[i])t=i;else if(n>=Ih[i])e=i+1;else return!0;if(e==t)return!1}}function du(n){return n>=127462&&n<=127487}const pu=8205;function Gm(n,e,t=!0,i=!0){return(t?Lh:Ym)(n,e,i)}function Lh(n,e,t){if(e==n.length)return e;e&&Bh(n.charCodeAt(e))&&Oh(n.charCodeAt(e-1))&&e--;let i=so(n,e);for(e+=mu(i);e<n.length;){let r=so(n,e);if(i==pu||r==pu||t&&Xm(r))e+=mu(r),i=r;else if(du(r)){let s=0,o=e-2;for(;o>=0&&du(so(n,o));)s++,o-=2;if(s%2==0)break;e+=2}else break}return e}function Ym(n,e,t){for(;e>0;){let i=Lh(n,e-2,t);if(i<e)return i;e--}return 0}function so(n,e){let t=n.charCodeAt(e);if(!Oh(t)||e+1==n.length)return t;let i=n.charCodeAt(e+1);return Bh(i)?(t-55296<<10)+(i-56320)+65536:t}function Bh(n){return n>=56320&&n<57344}function Oh(n){return n>=55296&&n<56320}function mu(n){return n<65536?1:2}class me{lineAt(e){if(e<0||e>this.length)throw new RangeError(`Invalid position ${e} in document of length ${this.length}`);return this.lineInner(e,!1,1,0)}line(e){if(e<1||e>this.lines)throw new RangeError(`Invalid line number ${e} in ${this.lines}-line document`);return this.lineInner(e,!0,1,0)}replace(e,t,i){[e,t]=xi(this,e,t);let r=[];return this.decompose(0,e,r,2),i.length&&i.decompose(0,i.length,r,3),this.decompose(t,this.length,r,1),Wt.from(r,this.length-(t-e)+i.length)}append(e){return this.replace(this.length,this.length,e)}slice(e,t=this.length){[e,t]=xi(this,e,t);let i=[];return this.decompose(e,t,i,0),Wt.from(i,t-e)}eq(e){if(e==this)return!0;if(e.length!=this.length||e.lines!=this.lines)return!1;let t=this.scanIdentical(e,1),i=this.length-this.scanIdentical(e,-1),r=new Zi(this),s=new Zi(e);for(let o=t,l=t;;){if(r.next(o),s.next(o),o=0,r.lineBreak!=s.lineBreak||r.done!=s.done||r.value!=s.value)return!1;if(l+=r.value.length,r.done||l>=i)return!0}}iter(e=1){return new Zi(this,e)}iterRange(e,t=this.length){return new Rh(this,e,t)}iterLines(e,t){let i;if(e==null)i=this.iter();else{t==null&&(t=this.lines+1);let r=this.line(e).from;i=this.iterRange(r,Math.max(r,t==this.lines+1?this.length:t<=1?0:this.line(t-1).to))}return new zh(i)}toString(){return this.sliceString(0)}toJSON(){let e=[];return this.flatten(e),e}constructor(){}static of(e){if(e.length==0)throw new RangeError("A document must have at least one line");return e.length==1&&!e[0]?me.empty:e.length<=32?new Pe(e):Wt.from(Pe.split(e,[]))}}class Pe extends me{constructor(e,t=Qm(e)){super(),this.text=e,this.length=t}get lines(){return this.text.length}get children(){return null}lineInner(e,t,i,r){for(let s=0;;s++){let o=this.text[s],l=r+o.length;if((t?i:l)>=e)return new Jm(r,l,i,o);r=l+1,i++}}decompose(e,t,i,r){let s=e<=0&&t>=this.length?this:new Pe(gu(this.text,e,t),Math.min(t,this.length)-Math.max(0,e));if(r&1){let o=i.pop(),l=ts(s.text,o.text.slice(),0,s.length);if(l.length<=32)i.push(new Pe(l,o.length+s.length));else{let a=l.length>>1;i.push(new Pe(l.slice(0,a)),new Pe(l.slice(a)))}}else i.push(s)}replace(e,t,i){if(!(i instanceof Pe))return super.replace(e,t,i);[e,t]=xi(this,e,t);let r=ts(this.text,ts(i.text,gu(this.text,0,e)),t),s=this.length+i.length-(t-e);return r.length<=32?new Pe(r,s):Wt.from(Pe.split(r,[]),s)}sliceString(e,t=this.length,i=`
`){[e,t]=xi(this,e,t);let r="";for(let s=0,o=0;s<=t&&o<this.text.length;o++){let l=this.text[o],a=s+l.length;s>e&&o&&(r+=i),e<a&&t>s&&(r+=l.slice(Math.max(0,e-s),t-s)),s=a+1}return r}flatten(e){for(let t of this.text)e.push(t)}scanIdentical(){return 0}static split(e,t){let i=[],r=-1;for(let s of e)i.push(s),r+=s.length+1,i.length==32&&(t.push(new Pe(i,r)),i=[],r=-1);return r>-1&&t.push(new Pe(i,r)),t}}class Wt extends me{constructor(e,t){super(),this.children=e,this.length=t,this.lines=0;for(let i of e)this.lines+=i.lines}lineInner(e,t,i,r){for(let s=0;;s++){let o=this.children[s],l=r+o.length,a=i+o.lines-1;if((t?a:l)>=e)return o.lineInner(e,t,i,r);r=l+1,i=a+1}}decompose(e,t,i,r){for(let s=0,o=0;o<=t&&s<this.children.length;s++){let l=this.children[s],a=o+l.length;if(e<=a&&t>=o){let u=r&((o<=e?1:0)|(a>=t?2:0));o>=e&&a<=t&&!u?i.push(l):l.decompose(e-o,t-o,i,u)}o=a+1}}replace(e,t,i){if([e,t]=xi(this,e,t),i.lines<this.lines)for(let r=0,s=0;r<this.children.length;r++){let o=this.children[r],l=s+o.length;if(e>=s&&t<=l){let a=o.replace(e-s,t-s,i),u=this.lines-o.lines+a.lines;if(a.lines<u>>4&&a.lines>u>>6){let c=this.children.slice();return c[r]=a,new Wt(c,this.length-(t-e)+i.length)}return super.replace(s,l,a)}s=l+1}return super.replace(e,t,i)}sliceString(e,t=this.length,i=`
`){[e,t]=xi(this,e,t);let r="";for(let s=0,o=0;s<this.children.length&&o<=t;s++){let l=this.children[s],a=o+l.length;o>e&&s&&(r+=i),e<a&&t>o&&(r+=l.sliceString(e-o,t-o,i)),o=a+1}return r}flatten(e){for(let t of this.children)t.flatten(e)}scanIdentical(e,t){if(!(e instanceof Wt))return 0;let i=0,[r,s,o,l]=t>0?[0,0,this.children.length,e.children.length]:[this.children.length-1,e.children.length-1,-1,-1];for(;;r+=t,s+=t){if(r==o||s==l)return i;let a=this.children[r],u=e.children[s];if(a!=u)return i+a.scanIdentical(u,t);i+=a.length+1}}static from(e,t=e.reduce((i,r)=>i+r.length+1,-1)){let i=0;for(let d of e)i+=d.lines;if(i<32){let d=[];for(let p of e)p.flatten(d);return new Pe(d,t)}let r=Math.max(32,i>>5),s=r<<1,o=r>>1,l=[],a=0,u=-1,c=[];function h(d){let p;if(d.lines>s&&d instanceof Wt)for(let m of d.children)h(m);else d.lines>o&&(a>o||!a)?(f(),l.push(d)):d instanceof Pe&&a&&(p=c[c.length-1])instanceof Pe&&d.lines+p.lines<=32?(a+=d.lines,u+=d.length+1,c[c.length-1]=new Pe(p.text.concat(d.text),p.length+1+d.length)):(a+d.lines>r&&f(),a+=d.lines,u+=d.length+1,c.push(d))}function f(){a!=0&&(l.push(c.length==1?c[0]:Wt.from(c,u)),u=-1,a=c.length=0)}for(let d of e)h(d);return f(),l.length==1?l[0]:new Wt(l,t)}}me.empty=new Pe([""],0);function Qm(n){let e=-1;for(let t of n)e+=t.length+1;return e}function ts(n,e,t=0,i=1e9){for(let r=0,s=0,o=!0;s<n.length&&r<=i;s++){let l=n[s],a=r+l.length;a>=t&&(a>i&&(l=l.slice(0,i-r)),r<t&&(l=l.slice(t-r)),o?(e[e.length-1]+=l,o=!1):e.push(l)),r=a+1}return e}function gu(n,e,t){return ts(n,[""],e,t)}class Zi{constructor(e,t=1){this.dir=t,this.done=!1,this.lineBreak=!1,this.value="",this.nodes=[e],this.offsets=[t>0?1:(e instanceof Pe?e.text.length:e.children.length)<<1]}nextInner(e,t){for(this.done=this.lineBreak=!1;;){let i=this.nodes.length-1,r=this.nodes[i],s=this.offsets[i],o=s>>1,l=r instanceof Pe?r.text.length:r.children.length;if(o==(t>0?l:0)){if(i==0)return this.done=!0,this.value="",this;t>0&&this.offsets[i-1]++,this.nodes.pop(),this.offsets.pop()}else if((s&1)==(t>0?0:1)){if(this.offsets[i]+=t,e==0)return this.lineBreak=!0,this.value=`
`,this;e--}else if(r instanceof Pe){let a=r.text[o+(t<0?-1:0)];if(this.offsets[i]+=t,a.length>Math.max(0,e))return this.value=e==0?a:t>0?a.slice(e):a.slice(0,a.length-e),this;e-=a.length}else{let a=r.children[o+(t<0?-1:0)];e>a.length?(e-=a.length,this.offsets[i]+=t):(t<0&&this.offsets[i]--,this.nodes.push(a),this.offsets.push(t>0?1:(a instanceof Pe?a.text.length:a.children.length)<<1))}}}next(e=0){return e<0&&(this.nextInner(-e,-this.dir),e=this.value.length),this.nextInner(e,this.dir)}}class Rh{constructor(e,t,i){this.value="",this.done=!1,this.cursor=new Zi(e,t>i?-1:1),this.pos=t>i?e.length:0,this.from=Math.min(t,i),this.to=Math.max(t,i)}nextInner(e,t){if(t<0?this.pos<=this.from:this.pos>=this.to)return this.value="",this.done=!0,this;e+=Math.max(0,t<0?this.pos-this.to:this.from-this.pos);let i=t<0?this.pos-this.from:this.to-this.pos;e>i&&(e=i),i-=e;let{value:r}=this.cursor.next(e);return this.pos+=(r.length+e)*t,this.value=r.length<=i?r:t<0?r.slice(r.length-i):r.slice(0,i),this.done=!this.value,this}next(e=0){return e<0?e=Math.max(e,this.from-this.pos):e>0&&(e=Math.min(e,this.to-this.pos)),this.nextInner(e,this.cursor.dir)}get lineBreak(){return this.cursor.lineBreak&&this.value!=""}}class zh{constructor(e){this.inner=e,this.afterBreak=!0,this.value="",this.done=!1}next(e=0){let{done:t,lineBreak:i,value:r}=this.inner.next(e);return t&&this.afterBreak?(this.value="",this.afterBreak=!1):t?(this.done=!0,this.value=""):i?this.afterBreak?this.value="":(this.afterBreak=!0,this.next()):(this.value=r,this.afterBreak=!1),this}get lineBreak(){return!1}}typeof Symbol<"u"&&(me.prototype[Symbol.iterator]=function(){return this.iter()},Zi.prototype[Symbol.iterator]=Rh.prototype[Symbol.iterator]=zh.prototype[Symbol.iterator]=function(){return this});class Jm{constructor(e,t,i,r){this.from=e,this.to=t,this.number=i,this.text=r}get length(){return this.to-this.from}}function xi(n,e,t){return e=Math.max(0,Math.min(n.length,e)),[e,Math.max(e,Math.min(n.length,t))]}function Xe(n,e,t=!0,i=!0){return Gm(n,e,t,i)}function Zm(n){return n>=56320&&n<57344}function eg(n){return n>=55296&&n<56320}function tg(n,e){let t=n.charCodeAt(e);if(!eg(t)||e+1==n.length)return t;let i=n.charCodeAt(e+1);return Zm(i)?(t-55296<<10)+(i-56320)+65536:t}function ng(n){return n<65536?1:2}const Qo=/\r\n?|\n/;var dt=(function(n){return n[n.Simple=0]="Simple",n[n.TrackDel=1]="TrackDel",n[n.TrackBefore=2]="TrackBefore",n[n.TrackAfter=3]="TrackAfter",n})(dt||(dt={}));class Gt{constructor(e){this.sections=e}get length(){let e=0;for(let t=0;t<this.sections.length;t+=2)e+=this.sections[t];return e}get newLength(){let e=0;for(let t=0;t<this.sections.length;t+=2){let i=this.sections[t+1];e+=i<0?this.sections[t]:i}return e}get empty(){return this.sections.length==0||this.sections.length==2&&this.sections[1]<0}iterGaps(e){for(let t=0,i=0,r=0;t<this.sections.length;){let s=this.sections[t++],o=this.sections[t++];o<0?(e(i,r,s),r+=s):r+=o,i+=s}}iterChangedRanges(e,t=!1){Jo(this,e,t)}get invertedDesc(){let e=[];for(let t=0;t<this.sections.length;){let i=this.sections[t++],r=this.sections[t++];r<0?e.push(i,r):e.push(r,i)}return new Gt(e)}composeDesc(e){return this.empty?e:e.empty?this:Fh(this,e)}mapDesc(e,t=!1){return e.empty?this:Zo(this,e,t)}mapPos(e,t=-1,i=dt.Simple){let r=0,s=0;for(let o=0;o<this.sections.length;){let l=this.sections[o++],a=this.sections[o++],u=r+l;if(a<0){if(u>e)return s+(e-r);s+=l}else{if(i!=dt.Simple&&u>=e&&(i==dt.TrackDel&&r<e&&u>e||i==dt.TrackBefore&&r<e||i==dt.TrackAfter&&u>e))return null;if(u>e||u==e&&t<0&&!l)return e==r||t<0?s:s+a;s+=a}r=u}if(e>r)throw new RangeError(`Position ${e} is out of range for changeset of length ${r}`);return s}touchesRange(e,t=e){for(let i=0,r=0;i<this.sections.length&&r<=t;){let s=this.sections[i++],o=this.sections[i++],l=r+s;if(o>=0&&r<=t&&l>=e)return r<e&&l>t?"cover":!0;r=l}return!1}toString(){let e="";for(let t=0;t<this.sections.length;){let i=this.sections[t++],r=this.sections[t++];e+=(e?" ":"")+i+(r>=0?":"+r:"")}return e}toJSON(){return this.sections}static fromJSON(e){if(!Array.isArray(e)||e.length%2||e.some(t=>typeof t!="number"))throw new RangeError("Invalid JSON representation of ChangeDesc");return new Gt(e)}static create(e){return new Gt(e)}}class ze extends Gt{constructor(e,t){super(e),this.inserted=t}apply(e){if(this.length!=e.length)throw new RangeError("Applying change set to a document with the wrong length");return Jo(this,(t,i,r,s,o)=>e=e.replace(r,r+(i-t),o),!1),e}mapDesc(e,t=!1){return Zo(this,e,t,!0)}invert(e){let t=this.sections.slice(),i=[];for(let r=0,s=0;r<t.length;r+=2){let o=t[r],l=t[r+1];if(l>=0){t[r]=l,t[r+1]=o;let a=r>>1;for(;i.length<a;)i.push(me.empty);i.push(o?e.slice(s,s+o):me.empty)}s+=o}return new ze(t,i)}compose(e){return this.empty?e:e.empty?this:Fh(this,e,!0)}map(e,t=!1){return e.empty?this:Zo(this,e,t,!0)}iterChanges(e,t=!1){Jo(this,e,t)}get desc(){return Gt.create(this.sections)}filter(e){let t=[],i=[],r=[],s=new ar(this);e:for(let o=0,l=0;;){let a=o==e.length?1e9:e[o++];for(;l<a||l==a&&s.len==0;){if(s.done)break e;let c=Math.min(s.len,a-l);je(r,c,-1);let h=s.ins==-1?-1:s.off==0?s.ins:0;je(t,c,h),h>0&&xn(i,t,s.text),s.forward(c),l+=c}let u=e[o++];for(;l<u;){if(s.done)break e;let c=Math.min(s.len,u-l);je(t,c,-1),je(r,c,s.ins==-1?-1:s.off==0?s.ins:0),s.forward(c),l+=c}}return{changes:new ze(t,i),filtered:Gt.create(r)}}toJSON(){let e=[];for(let t=0;t<this.sections.length;t+=2){let i=this.sections[t],r=this.sections[t+1];r<0?e.push(i):r==0?e.push([i]):e.push([i].concat(this.inserted[t>>1].toJSON()))}return e}static of(e,t,i){let r=[],s=[],o=0,l=null;function a(c=!1){if(!c&&!r.length)return;o<t&&je(r,t-o,-1);let h=new ze(r,s);l=l?l.compose(h.map(l)):h,r=[],s=[],o=0}function u(c){if(Array.isArray(c))for(let h of c)u(h);else if(c instanceof ze){if(c.length!=t)throw new RangeError(`Mismatched change set length (got ${c.length}, expected ${t})`);a(),l=l?l.compose(c.map(l)):c}else{let{from:h,to:f=h,insert:d}=c;if(h>f||h<0||f>t)throw new RangeError(`Invalid change range ${h} to ${f} (in doc of length ${t})`);let p=d?typeof d=="string"?me.of(d.split(i||Qo)):d:me.empty,m=p.length;if(h==f&&m==0)return;h<o&&a(),h>o&&je(r,h-o,-1),je(r,f-h,m),xn(s,r,p),o=f}}return u(e),a(!l),l}static empty(e){return new ze(e?[e,-1]:[],[])}static fromJSON(e){if(!Array.isArray(e))throw new RangeError("Invalid JSON representation of ChangeSet");let t=[],i=[];for(let r=0;r<e.length;r++){let s=e[r];if(typeof s=="number")t.push(s,-1);else{if(!Array.isArray(s)||typeof s[0]!="number"||s.some((o,l)=>l&&typeof o!="string"))throw new RangeError("Invalid JSON representation of ChangeSet");if(s.length==1)t.push(s[0],0);else{for(;i.length<r;)i.push(me.empty);i[r]=me.of(s.slice(1)),t.push(s[0],i[r].length)}}}return new ze(t,i)}static createSet(e,t){return new ze(e,t)}}function je(n,e,t,i=!1){if(e==0&&t<=0)return;let r=n.length-2;r>=0&&t<=0&&t==n[r+1]?n[r]+=e:r>=0&&e==0&&n[r]==0?n[r+1]+=t:i?(n[r]+=e,n[r+1]+=t):n.push(e,t)}function xn(n,e,t){if(t.length==0)return;let i=e.length-2>>1;if(i<n.length)n[n.length-1]=n[n.length-1].append(t);else{for(;n.length<i;)n.push(me.empty);n.push(t)}}function Jo(n,e,t){let i=n.inserted;for(let r=0,s=0,o=0;o<n.sections.length;){let l=n.sections[o++],a=n.sections[o++];if(a<0)r+=l,s+=l;else{let u=r,c=s,h=me.empty;for(;u+=l,c+=a,a&&i&&(h=h.append(i[o-2>>1])),!(t||o==n.sections.length||n.sections[o+1]<0);)l=n.sections[o++],a=n.sections[o++];e(r,u,s,c,h),r=u,s=c}}}function Zo(n,e,t,i=!1){let r=[],s=i?[]:null,o=new ar(n),l=new ar(e);for(let a=-1;;){if(o.done&&l.len||l.done&&o.len)throw new Error("Mismatched change set lengths");if(o.ins==-1&&l.ins==-1){let u=Math.min(o.len,l.len);je(r,u,-1),o.forward(u),l.forward(u)}else if(l.ins>=0&&(o.ins<0||a==o.i||o.off==0&&(l.len<o.len||l.len==o.len&&!t))){let u=l.len;for(je(r,l.ins,-1);u;){let c=Math.min(o.len,u);o.ins>=0&&a<o.i&&o.len<=c&&(je(r,0,o.ins),s&&xn(s,r,o.text),a=o.i),o.forward(c),u-=c}l.next()}else if(o.ins>=0){let u=0,c=o.len;for(;c;)if(l.ins==-1){let h=Math.min(c,l.len);u+=h,c-=h,l.forward(h)}else if(l.ins==0&&l.len<c)c-=l.len,l.next();else break;je(r,u,a<o.i?o.ins:0),s&&a<o.i&&xn(s,r,o.text),a=o.i,o.forward(o.len-c)}else{if(o.done&&l.done)return s?ze.createSet(r,s):Gt.create(r);throw new Error("Mismatched change set lengths")}}}function Fh(n,e,t=!1){let i=[],r=t?[]:null,s=new ar(n),o=new ar(e);for(let l=!1;;){if(s.done&&o.done)return r?ze.createSet(i,r):Gt.create(i);if(s.ins==0)je(i,s.len,0,l),s.next();else if(o.len==0&&!o.done)je(i,0,o.ins,l),r&&xn(r,i,o.text),o.next();else{if(s.done||o.done)throw new Error("Mismatched change set lengths");{let a=Math.min(s.len2,o.len),u=i.length;if(s.ins==-1){let c=o.ins==-1?-1:o.off?0:o.ins;je(i,a,c,l),r&&c&&xn(r,i,o.text)}else o.ins==-1?(je(i,s.off?0:s.len,a,l),r&&xn(r,i,s.textBit(a))):(je(i,s.off?0:s.len,o.off?0:o.ins,l),r&&!o.off&&xn(r,i,o.text));l=(s.ins>a||o.ins>=0&&o.len>a)&&(l||i.length>u),s.forward2(a),o.forward(a)}}}}class ar{constructor(e){this.set=e,this.i=0,this.next()}next(){let{sections:e}=this.set;this.i<e.length?(this.len=e[this.i++],this.ins=e[this.i++]):(this.len=0,this.ins=-2),this.off=0}get done(){return this.ins==-2}get len2(){return this.ins<0?this.len:this.ins}get text(){let{inserted:e}=this.set,t=this.i-2>>1;return t>=e.length?me.empty:e[t]}textBit(e){let{inserted:t}=this.set,i=this.i-2>>1;return i>=t.length&&!e?me.empty:t[i].slice(this.off,e==null?void 0:this.off+e)}forward(e){e==this.len?this.next():(this.len-=e,this.off+=e)}forward2(e){this.ins==-1?this.forward(e):e==this.ins?this.next():(this.ins-=e,this.off+=e)}}class Hn{constructor(e,t,i){this.from=e,this.to=t,this.flags=i}get anchor(){return this.flags&32?this.to:this.from}get head(){return this.flags&32?this.from:this.to}get empty(){return this.from==this.to}get assoc(){return this.flags&8?-1:this.flags&16?1:0}get bidiLevel(){let e=this.flags&7;return e==7?null:e}get goalColumn(){let e=this.flags>>6;return e==16777215?void 0:e}map(e,t=-1){let i,r;return this.empty?i=r=e.mapPos(this.from,t):(i=e.mapPos(this.from,1),r=e.mapPos(this.to,-1)),i==this.from&&r==this.to?this:new Hn(i,r,this.flags)}extend(e,t=e,i=0){if(e<=this.anchor&&t>=this.anchor)return L.range(e,t,void 0,void 0,i);let r=Math.abs(e-this.anchor)>Math.abs(t-this.anchor)?e:t;return L.range(this.anchor,r,void 0,void 0,i)}eq(e,t=!1){return this.anchor==e.anchor&&this.head==e.head&&this.goalColumn==e.goalColumn&&(!t||!this.empty||this.assoc==e.assoc)}toJSON(){return{anchor:this.anchor,head:this.head}}static fromJSON(e){if(!e||typeof e.anchor!="number"||typeof e.head!="number")throw new RangeError("Invalid JSON representation for SelectionRange");return L.range(e.anchor,e.head)}static create(e,t,i){return new Hn(e,t,i)}}class L{constructor(e,t){this.ranges=e,this.mainIndex=t}map(e,t=-1){return e.empty?this:L.create(this.ranges.map(i=>i.map(e,t)),this.mainIndex)}eq(e,t=!1){if(this.ranges.length!=e.ranges.length||this.mainIndex!=e.mainIndex)return!1;for(let i=0;i<this.ranges.length;i++)if(!this.ranges[i].eq(e.ranges[i],t))return!1;return!0}get main(){return this.ranges[this.mainIndex]}asSingle(){return this.ranges.length==1?this:new L([this.main],0)}addRange(e,t=!0){return L.create([e].concat(this.ranges),t?0:this.mainIndex+1)}replaceRange(e,t=this.mainIndex){let i=this.ranges.slice();return i[t]=e,L.create(i,this.mainIndex)}toJSON(){return{ranges:this.ranges.map(e=>e.toJSON()),main:this.mainIndex}}static fromJSON(e){if(!e||!Array.isArray(e.ranges)||typeof e.main!="number"||e.main>=e.ranges.length)throw new RangeError("Invalid JSON representation for EditorSelection");return new L(e.ranges.map(t=>Hn.fromJSON(t)),e.main)}static single(e,t=e){return new L([L.range(e,t)],0)}static create(e,t=0){if(e.length==0)throw new RangeError("A selection needs at least one range");for(let i=0,r=0;r<e.length;r++){let s=e[r];if(s.empty?s.from<=i:s.from<i)return L.normalized(e.slice(),t);i=s.to}return new L(e,t)}static cursor(e,t=0,i,r){return Hn.create(e,e,(t==0?0:t<0?8:16)|(i==null?7:Math.min(6,i))|(r??16777215)<<6)}static range(e,t,i,r,s){let o=(i??16777215)<<6|(r==null?7:Math.min(6,r));return!s&&e!=t&&(s=t<e?1:-1),t<e?Hn.create(t,e,48|o):Hn.create(e,t,(s?s<0?8:16:0)|o)}static normalized(e,t=0){let i=e[t];e.sort((r,s)=>r.from-s.from),t=e.indexOf(i);for(let r=1;r<e.length;r++){let s=e[r],o=e[r-1];if(s.empty?s.from<=o.to:s.from<o.to){let l=o.from,a=Math.max(s.to,o.to);r<=t&&t--,e.splice(--r,2,s.anchor>s.head?L.range(a,l):L.range(l,a))}}return new L(e,t)}}function Nh(n,e){for(let t of n.ranges)if(t.to>e)throw new RangeError("Selection points outside of document")}let ca=0;class U{constructor(e,t,i,r,s){this.combine=e,this.compareInput=t,this.compare=i,this.isStatic=r,this.id=ca++,this.default=e([]),this.extensions=typeof s=="function"?s(this):s}get reader(){return this}static define(e={}){return new U(e.combine||(t=>t),e.compareInput||((t,i)=>t===i),e.compare||(e.combine?(t,i)=>t===i:ha),!!e.static,e.enables)}of(e){return new ns([],this,0,e)}compute(e,t){if(this.isStatic)throw new Error("Can't compute a static facet");return new ns(e,this,1,t)}computeN(e,t){if(this.isStatic)throw new Error("Can't compute a static facet");return new ns(e,this,2,t)}from(e,t){return t||(t=i=>i),this.compute([e],i=>t(i.field(e)))}}function ha(n,e){return n==e||n.length==e.length&&n.every((t,i)=>t===e[i])}class ns{constructor(e,t,i,r){this.dependencies=e,this.facet=t,this.type=i,this.value=r,this.id=ca++}dynamicSlot(e){var t;let i=this.value,r=this.facet.compareInput,s=this.id,o=e[s]>>1,l=this.type==2,a=!1,u=!1,c=[];for(let h of this.dependencies)h=="doc"?a=!0:h=="selection"?u=!0:(((t=e[h.id])!==null&&t!==void 0?t:1)&1)==0&&c.push(e[h.id]);return{create(h){return h.values[o]=i(h),1},update(h,f){if(a&&f.docChanged||u&&(f.docChanged||f.selection)||el(h,c)){let d=i(h);if(l?!bu(d,h.values[o],r):!r(d,h.values[o]))return h.values[o]=d,1}return 0},reconfigure:(h,f)=>{let d,p=f.config.address[s];if(p!=null){let m=gs(f,p);if(this.dependencies.every(b=>b instanceof U?f.facet(b)===h.facet(b):b instanceof Pn?f.field(b,!1)==h.field(b,!1):!0)||(l?bu(d=i(h),m,r):r(d=i(h),m)))return h.values[o]=m,0}else d=i(h);return h.values[o]=d,1}}}}function bu(n,e,t){if(n.length!=e.length)return!1;for(let i=0;i<n.length;i++)if(!t(n[i],e[i]))return!1;return!0}function el(n,e){let t=!1;for(let i of e)er(n,i)&1&&(t=!0);return t}function ig(n,e,t){let i=t.map(a=>n[a.id]),r=t.map(a=>a.type),s=i.filter(a=>!(a&1)),o=n[e.id]>>1;function l(a){let u=[];for(let c=0;c<i.length;c++){let h=gs(a,i[c]);if(r[c]==2)for(let f of h)u.push(f);else u.push(h)}return e.combine(u)}return{create(a){for(let u of i)er(a,u);return a.values[o]=l(a),1},update(a,u){if(!el(a,s))return 0;let c=l(a);return e.compare(c,a.values[o])?0:(a.values[o]=c,1)},reconfigure(a,u){let c=el(a,i),h=u.config.facets[e.id],f=u.facet(e);if(h&&!c&&ha(t,h))return a.values[o]=f,0;let d=l(a);return e.compare(d,f)?(a.values[o]=f,0):(a.values[o]=d,1)}}}const Mr=U.define({static:!0});class Pn{constructor(e,t,i,r,s){this.id=e,this.createF=t,this.updateF=i,this.compareF=r,this.spec=s,this.provides=void 0}static define(e){let t=new Pn(ca++,e.create,e.update,e.compare||((i,r)=>i===r),e);return e.provide&&(t.provides=e.provide(t)),t}create(e){let t=e.facet(Mr).find(i=>i.field==this);return((t==null?void 0:t.create)||this.createF)(e)}slot(e){let t=e[this.id]>>1;return{create:i=>(i.values[t]=this.create(i),1),update:(i,r)=>{let s=i.values[t],o=this.updateF(s,r);return this.compareF(s,o)?0:(i.values[t]=o,1)},reconfigure:(i,r)=>{let s=i.facet(Mr),o=r.facet(Mr),l;return(l=s.find(a=>a.field==this))&&l!=o.find(a=>a.field==this)?(i.values[t]=l.create(i),1):r.config.address[this.id]!=null?(i.values[t]=r.field(this),0):(i.values[t]=this.create(i),1)}}}init(e){return[this,Mr.of({field:this,create:e})]}get extension(){return this}}const qn={lowest:4,low:3,default:2,high:1,highest:0};function Fi(n){return e=>new qh(e,n)}const Rs={highest:Fi(qn.highest),high:Fi(qn.high),default:Fi(qn.default),low:Fi(qn.low),lowest:Fi(qn.lowest)};class qh{constructor(e,t){this.inner=e,this.prec=t}}class xr{of(e){return new tl(this,e)}reconfigure(e){return xr.reconfigure.of({compartment:this,extension:e})}get(e){return e.config.compartments.get(this)}}class tl{constructor(e,t){this.compartment=e,this.inner=t}}class ms{constructor(e,t,i,r,s,o){for(this.base=e,this.compartments=t,this.dynamicSlots=i,this.address=r,this.staticValues=s,this.facets=o,this.statusTemplate=[];this.statusTemplate.length<i.length;)this.statusTemplate.push(0)}staticFacet(e){let t=this.address[e.id];return t==null?e.default:this.staticValues[t>>1]}static resolve(e,t,i){let r=[],s=Object.create(null),o=new Map;for(let f of rg(e,t,o))f instanceof Pn?r.push(f):(s[f.facet.id]||(s[f.facet.id]=[])).push(f);let l=Object.create(null),a=[],u=[];for(let f of r)l[f.id]=u.length<<1,u.push(d=>f.slot(d));let c=i==null?void 0:i.config.facets;for(let f in s){let d=s[f],p=d[0].facet,m=c&&c[f]||[];if(d.every(b=>b.type==0))if(l[p.id]=a.length<<1|1,ha(m,d))a.push(i.facet(p));else{let b=p.combine(d.map(g=>g.value));a.push(i&&p.compare(b,i.facet(p))?i.facet(p):b)}else{for(let b of d)b.type==0?(l[b.id]=a.length<<1|1,a.push(b.value)):(l[b.id]=u.length<<1,u.push(g=>b.dynamicSlot(g)));l[p.id]=u.length<<1,u.push(b=>ig(b,p,d))}}let h=u.map(f=>f(l));return new ms(e,o,h,l,a,s)}}function rg(n,e,t){let i=[[],[],[],[],[]],r=new Map;function s(o,l){let a=r.get(o);if(a!=null){if(a<=l)return;let u=i[a].indexOf(o);u>-1&&i[a].splice(u,1),o instanceof tl&&t.delete(o.compartment)}if(r.set(o,l),Array.isArray(o))for(let u of o)s(u,l);else if(o instanceof tl){if(t.has(o.compartment))throw new RangeError("Duplicate use of compartment in extensions");let u=e.get(o.compartment)||o.inner;t.set(o.compartment,u),s(u,l)}else if(o instanceof qh)s(o.inner,o.prec);else if(o instanceof Pn)i[l].push(o),o.provides&&s(o.provides,l);else if(o instanceof ns)i[l].push(o),o.facet.extensions&&s(o.facet.extensions,qn.default);else{let u=o.extension;if(!u)throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);s(u,l)}}return s(n,qn.default),i.reduce((o,l)=>o.concat(l))}function er(n,e){if(e&1)return 2;let t=e>>1,i=n.status[t];if(i==4)throw new Error("Cyclic dependency between fields and/or facets");if(i&2)return i;n.status[t]=4;let r=n.computeSlot(n,n.config.dynamicSlots[t]);return n.status[t]=2|r}function gs(n,e){return e&1?n.config.staticValues[e>>1]:n.values[e>>1]}const Hh=U.define(),nl=U.define({combine:n=>n.some(e=>e),static:!0}),$h=U.define({combine:n=>n.length?n[0]:void 0,static:!0}),Vh=U.define(),Wh=U.define(),Uh=U.define(),jh=U.define({combine:n=>n.length?n[0]:!1});class Dn{constructor(e,t){this.type=e,this.value=t}static define(){return new sg}}class sg{of(e){return new Dn(this,e)}}class og{constructor(e){this.map=e}of(e){return new Ie(this,e)}}class Ie{constructor(e,t){this.type=e,this.value=t}map(e){let t=this.type.map(this.value,e);return t===void 0?void 0:t==this.value?this:new Ie(this.type,t)}is(e){return this.type==e}static define(e={}){return new og(e.map||(t=>t))}static mapEffects(e,t){if(!e.length)return e;let i=[];for(let r of e){let s=r.map(t);s&&i.push(s)}return i}}Ie.reconfigure=Ie.define();Ie.appendConfig=Ie.define();class Fe{constructor(e,t,i,r,s,o){this.startState=e,this.changes=t,this.selection=i,this.effects=r,this.annotations=s,this.scrollIntoView=o,this._doc=null,this._state=null,i&&Nh(i,t.newLength),s.some(l=>l.type==Fe.time)||(this.annotations=s.concat(Fe.time.of(Date.now())))}static create(e,t,i,r,s,o){return new Fe(e,t,i,r,s,o)}get newDoc(){return this._doc||(this._doc=this.changes.apply(this.startState.doc))}get newSelection(){return this.selection||this.startState.selection.map(this.changes)}get state(){return this._state||this.startState.applyTransaction(this),this._state}annotation(e){for(let t of this.annotations)if(t.type==e)return t.value}get docChanged(){return!this.changes.empty}get reconfigured(){return this.startState.config!=this.state.config}isUserEvent(e){let t=this.annotation(Fe.userEvent);return!!(t&&(t==e||t.length>e.length&&t.slice(0,e.length)==e&&t[e.length]=="."))}}Fe.time=Dn.define();Fe.userEvent=Dn.define();Fe.addToHistory=Dn.define();Fe.remote=Dn.define();function lg(n,e){let t=[];for(let i=0,r=0;;){let s,o;if(i<n.length&&(r==e.length||e[r]>=n[i]))s=n[i++],o=n[i++];else if(r<e.length)s=e[r++],o=e[r++];else return t;!t.length||t[t.length-1]<s?t.push(s,o):t[t.length-1]<o&&(t[t.length-1]=o)}}function Kh(n,e,t){var i;let r,s,o;return t?(r=e.changes,s=ze.empty(e.changes.length),o=n.changes.compose(e.changes)):(r=e.changes.map(n.changes),s=n.changes.mapDesc(e.changes,!0),o=n.changes.compose(r)),{changes:o,selection:e.selection?e.selection.map(s):(i=n.selection)===null||i===void 0?void 0:i.map(r),effects:Ie.mapEffects(n.effects,r).concat(Ie.mapEffects(e.effects,s)),annotations:n.annotations.length?n.annotations.concat(e.annotations):e.annotations,scrollIntoView:n.scrollIntoView||e.scrollIntoView}}function il(n,e,t){let i=e.selection,r=mi(e.annotations);return e.userEvent&&(r=r.concat(Fe.userEvent.of(e.userEvent))),{changes:e.changes instanceof ze?e.changes:ze.of(e.changes||[],t,n.facet($h)),selection:i&&(i instanceof L?i:L.single(i.anchor,i.head)),effects:mi(e.effects),annotations:r,scrollIntoView:!!e.scrollIntoView}}function Xh(n,e,t){let i=il(n,e.length?e[0]:{},n.doc.length);e.length&&e[0].filter===!1&&(t=!1);for(let s=1;s<e.length;s++){e[s].filter===!1&&(t=!1);let o=!!e[s].sequential;i=Kh(i,il(n,e[s],o?i.changes.newLength:n.doc.length),o)}let r=Fe.create(n,i.changes,i.selection,i.effects,i.annotations,i.scrollIntoView);return ug(t?ag(r):r)}function ag(n){let e=n.startState,t=!0;for(let r of e.facet(Vh)){let s=r(n);if(s===!1){t=!1;break}Array.isArray(s)&&(t=t===!0?s:lg(t,s))}if(t!==!0){let r,s;if(t===!1)s=n.changes.invertedDesc,r=ze.empty(e.doc.length);else{let o=n.changes.filter(t);r=o.changes,s=o.filtered.mapDesc(o.changes).invertedDesc}n=Fe.create(e,r,n.selection&&n.selection.map(s),Ie.mapEffects(n.effects,s),n.annotations,n.scrollIntoView)}let i=e.facet(Wh);for(let r=i.length-1;r>=0;r--){let s=i[r](n);s instanceof Fe?n=s:Array.isArray(s)&&s.length==1&&s[0]instanceof Fe?n=s[0]:n=Xh(e,mi(s),!1)}return n}function ug(n){let e=n.startState,t=e.facet(Uh),i=n;for(let r=t.length-1;r>=0;r--){let s=t[r](n);s&&Object.keys(s).length&&(i=Kh(i,il(e,s,n.changes.newLength),!0))}return i==n?n:Fe.create(e,n.changes,n.selection,i.effects,i.annotations,i.scrollIntoView)}const cg=[];function mi(n){return n==null?cg:Array.isArray(n)?n:[n]}var an=(function(n){return n[n.Word=0]="Word",n[n.Space=1]="Space",n[n.Other=2]="Other",n})(an||(an={}));const hg=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;let rl;try{rl=new RegExp("[\\p{Alphabetic}\\p{Number}_]","u")}catch{}function fg(n){if(rl)return rl.test(n);for(let e=0;e<n.length;e++){let t=n[e];if(/\w/.test(t)||t>""&&(t.toUpperCase()!=t.toLowerCase()||hg.test(t)))return!0}return!1}function dg(n){return e=>{if(!/\S/.test(e))return an.Space;if(fg(e))return an.Word;for(let t=0;t<n.length;t++)if(e.indexOf(n[t])>-1)return an.Word;return an.Other}}class ge{constructor(e,t,i,r,s,o){this.config=e,this.doc=t,this.selection=i,this.values=r,this.status=e.statusTemplate.slice(),this.computeSlot=s,o&&(o._state=this);for(let l=0;l<this.config.dynamicSlots.length;l++)er(this,l<<1);this.computeSlot=null}field(e,t=!0){let i=this.config.address[e.id];if(i==null){if(t)throw new RangeError("Field is not present in this state");return}return er(this,i),gs(this,i)}update(...e){return Xh(this,e,!0)}applyTransaction(e){let t=this.config,{base:i,compartments:r}=t;for(let l of e.effects)l.is(xr.reconfigure)?(t&&(r=new Map,t.compartments.forEach((a,u)=>r.set(u,a)),t=null),r.set(l.value.compartment,l.value.extension)):l.is(Ie.reconfigure)?(t=null,i=l.value):l.is(Ie.appendConfig)&&(t=null,i=mi(i).concat(l.value));let s;t?s=e.startState.values.slice():(t=ms.resolve(i,r,this),s=new ge(t,this.doc,this.selection,t.dynamicSlots.map(()=>null),(a,u)=>u.reconfigure(a,this),null).values);let o=e.startState.facet(nl)?e.newSelection:e.newSelection.asSingle();new ge(t,e.newDoc,o,s,(l,a)=>a.update(l,e),e)}replaceSelection(e){return typeof e=="string"&&(e=this.toText(e)),this.changeByRange(t=>({changes:{from:t.from,to:t.to,insert:e},range:L.cursor(t.from+e.length)}))}changeByRange(e){let t=this.selection,i=e(t.ranges[0]),r=this.changes(i.changes),s=[i.range],o=mi(i.effects);for(let l=1;l<t.ranges.length;l++){let a=e(t.ranges[l]),u=this.changes(a.changes),c=u.map(r);for(let f=0;f<l;f++)s[f]=s[f].map(c);let h=r.mapDesc(u,!0);s.push(a.range.map(h)),r=r.compose(c),o=Ie.mapEffects(o,c).concat(Ie.mapEffects(mi(a.effects),h))}return{changes:r,selection:L.create(s,t.mainIndex),effects:o}}changes(e=[]){return e instanceof ze?e:ze.of(e,this.doc.length,this.facet(ge.lineSeparator))}toText(e){return me.of(e.split(this.facet(ge.lineSeparator)||Qo))}sliceDoc(e=0,t=this.doc.length){return this.doc.sliceString(e,t,this.lineBreak)}facet(e){let t=this.config.address[e.id];return t==null?e.default:(er(this,t),gs(this,t))}toJSON(e){let t={doc:this.sliceDoc(),selection:this.selection.toJSON()};if(e)for(let i in e){let r=e[i];r instanceof Pn&&this.config.address[r.id]!=null&&(t[i]=r.spec.toJSON(this.field(e[i]),this))}return t}static fromJSON(e,t={},i){if(!e||typeof e.doc!="string")throw new RangeError("Invalid JSON representation for EditorState");let r=[];if(i){for(let s in i)if(Object.prototype.hasOwnProperty.call(e,s)){let o=i[s],l=e[s];r.push(o.init(a=>o.spec.fromJSON(l,a)))}}return ge.create({doc:e.doc,selection:L.fromJSON(e.selection),extensions:t.extensions?r.concat([t.extensions]):r})}static create(e={}){let t=ms.resolve(e.extensions||[],new Map),i=e.doc instanceof me?e.doc:me.of((e.doc||"").split(t.staticFacet(ge.lineSeparator)||Qo)),r=e.selection?e.selection instanceof L?e.selection:L.single(e.selection.anchor,e.selection.head):L.single(0);return Nh(r,i.length),t.staticFacet(nl)||(r=r.asSingle()),new ge(t,i,r,t.dynamicSlots.map(()=>null),(s,o)=>o.create(s),null)}get tabSize(){return this.facet(ge.tabSize)}get lineBreak(){return this.facet(ge.lineSeparator)||`
`}get readOnly(){return this.facet(jh)}phrase(e,...t){for(let i of this.facet(ge.phrases))if(Object.prototype.hasOwnProperty.call(i,e)){e=i[e];break}return t.length&&(e=e.replace(/\$(\$|\d*)/g,(i,r)=>{if(r=="$")return"$";let s=+(r||1);return!s||s>t.length?i:t[s-1]})),e}languageDataAt(e,t,i=-1){let r=[];for(let s of this.facet(Hh))for(let o of s(this,t,i))Object.prototype.hasOwnProperty.call(o,e)&&r.push(o[e]);return r}charCategorizer(e){let t=this.languageDataAt("wordChars",e);return dg(t.length?t[0]:"")}wordAt(e){let{text:t,from:i,length:r}=this.doc.lineAt(e),s=this.charCategorizer(e),o=e-i,l=e-i;for(;o>0;){let a=Xe(t,o,!1);if(s(t.slice(a,o))!=an.Word)break;o=a}for(;l<r;){let a=Xe(t,l);if(s(t.slice(l,a))!=an.Word)break;l=a}return o==l?null:L.range(o+i,l+i)}}ge.allowMultipleSelections=nl;ge.tabSize=U.define({combine:n=>n.length?n[0]:4});ge.lineSeparator=$h;ge.readOnly=jh;ge.phrases=U.define({compare(n,e){let t=Object.keys(n),i=Object.keys(e);return t.length==i.length&&t.every(r=>n[r]==e[r])}});ge.languageData=Hh;ge.changeFilter=Vh;ge.transactionFilter=Wh;ge.transactionExtender=Uh;xr.reconfigure=Ie.define();function fa(n,e,t={}){let i={};for(let r of n)for(let s of Object.keys(r)){let o=r[s],l=i[s];if(l===void 0)i[s]=o;else if(!(l===o||o===void 0))if(Object.hasOwnProperty.call(t,s))i[s]=t[s](l,o);else throw new Error("Config merge conflict for field "+s)}for(let r in e)i[r]===void 0&&(i[r]=e[r]);return i}class Un{eq(e){return this==e}range(e,t=e){return sl.create(e,t,this)}}Un.prototype.startSide=Un.prototype.endSide=0;Un.prototype.point=!1;Un.prototype.mapMode=dt.TrackDel;function da(n,e){return n==e||n.constructor==e.constructor&&n.eq(e)}let sl=class Gh{constructor(e,t,i){this.from=e,this.to=t,this.value=i}static create(e,t,i){return new Gh(e,t,i)}};function ol(n,e){return n.from-e.from||n.value.startSide-e.value.startSide}class pa{constructor(e,t,i,r){this.from=e,this.to=t,this.value=i,this.maxPoint=r}get length(){return this.to[this.to.length-1]}findIndex(e,t,i,r=0){let s=i?this.to:this.from;for(let o=r,l=s.length;;){if(o==l)return o;let a=o+l>>1,u=s[a]-e||(i?this.value[a].endSide:this.value[a].startSide)-t;if(a==o)return u>=0?o:l;u>=0?l=a:o=a+1}}between(e,t,i,r){for(let s=this.findIndex(t,-1e9,!0),o=this.findIndex(i,1e9,!1,s);s<o;s++)if(r(this.from[s]+e,this.to[s]+e,this.value[s])===!1)return!1}map(e,t){let i=[],r=[],s=[],o=-1,l=-1;for(let a=0;a<this.value.length;a++){let u=this.value[a],c=this.from[a]+e,h=this.to[a]+e,f,d;if(c==h){let p=t.mapPos(c,u.startSide,u.mapMode);if(p==null||(f=d=p,u.startSide!=u.endSide&&(d=t.mapPos(c,u.endSide),d<f)))continue}else if(f=t.mapPos(c,u.startSide),d=t.mapPos(h,u.endSide),f>d||f==d&&u.startSide>0&&u.endSide<=0)continue;(d-f||u.endSide-u.startSide)<0||(o<0&&(o=f),u.point&&(l=Math.max(l,d-f)),i.push(u),r.push(f-o),s.push(d-o))}return{mapped:i.length?new pa(r,s,i,l):null,pos:o}}}class pe{constructor(e,t,i,r){this.chunkPos=e,this.chunk=t,this.nextLayer=i,this.maxPoint=r}static create(e,t,i,r){return new pe(e,t,i,r)}get length(){let e=this.chunk.length-1;return e<0?0:Math.max(this.chunkEnd(e),this.nextLayer.length)}get size(){if(this.isEmpty)return 0;let e=this.nextLayer.size;for(let t of this.chunk)e+=t.value.length;return e}chunkEnd(e){return this.chunkPos[e]+this.chunk[e].length}update(e){let{add:t=[],sort:i=!1,filterFrom:r=0,filterTo:s=this.length}=e,o=e.filter;if(t.length==0&&!o)return this;if(i&&(t=t.slice().sort(ol)),this.isEmpty)return t.length?pe.of(t):this;let l=new Yh(this,null,-1).goto(0),a=0,u=[],c=new ur;for(;l.value||a<t.length;)if(a<t.length&&(l.from-t[a].from||l.startSide-t[a].value.startSide)>=0){let h=t[a++];c.addInner(h.from,h.to,h.value)||u.push(h)}else l.rangeIndex==1&&l.chunkIndex<this.chunk.length&&(a==t.length||this.chunkEnd(l.chunkIndex)<t[a].from)&&(!o||r>this.chunkEnd(l.chunkIndex)||s<this.chunkPos[l.chunkIndex])&&c.addChunk(this.chunkPos[l.chunkIndex],this.chunk[l.chunkIndex])?l.nextChunk():((!o||r>l.to||s<l.from||o(l.from,l.to,l.value))&&(c.addInner(l.from,l.to,l.value)||u.push(sl.create(l.from,l.to,l.value))),l.next());return c.finishInner(this.nextLayer.isEmpty&&!u.length?pe.empty:this.nextLayer.update({add:u,filter:o,filterFrom:r,filterTo:s}))}map(e){if(e.empty||this.isEmpty)return this;let t=[],i=[],r=-1;for(let o=0;o<this.chunk.length;o++){let l=this.chunkPos[o],a=this.chunk[o],u=e.touchesRange(l,l+a.length);if(u===!1)r=Math.max(r,a.maxPoint),t.push(a),i.push(e.mapPos(l));else if(u===!0){let{mapped:c,pos:h}=a.map(l,e);c&&(r=Math.max(r,c.maxPoint),t.push(c),i.push(h))}}let s=this.nextLayer.map(e);return t.length==0?s:new pe(i,t,s||pe.empty,r)}between(e,t,i){if(!this.isEmpty){for(let r=0;r<this.chunk.length;r++){let s=this.chunkPos[r],o=this.chunk[r];if(t>=s&&e<=s+o.length&&o.between(s,e-s,t-s,i)===!1)return}this.nextLayer.between(e,t,i)}}iter(e=0){return cr.from([this]).goto(e)}get isEmpty(){return this.nextLayer==this}static iter(e,t=0){return cr.from(e).goto(t)}static compare(e,t,i,r,s=-1){let o=e.filter(h=>h.maxPoint>0||!h.isEmpty&&h.maxPoint>=s),l=t.filter(h=>h.maxPoint>0||!h.isEmpty&&h.maxPoint>=s),a=yu(o,l,i),u=new Ni(o,a,s),c=new Ni(l,a,s);i.iterGaps((h,f,d)=>wu(u,h,c,f,d,r)),i.empty&&i.length==0&&wu(u,0,c,0,0,r)}static eq(e,t,i=0,r){r==null&&(r=999999999);let s=e.filter(c=>!c.isEmpty&&t.indexOf(c)<0),o=t.filter(c=>!c.isEmpty&&e.indexOf(c)<0);if(s.length!=o.length)return!1;if(!s.length)return!0;let l=yu(s,o),a=new Ni(s,l,0).goto(i),u=new Ni(o,l,0).goto(i);for(;;){if(a.to!=u.to||!ll(a.active,u.active)||a.point&&(!u.point||!da(a.point,u.point)))return!1;if(a.to>r)return!0;a.next(),u.next()}}static spans(e,t,i,r,s=-1){let o=new Ni(e,null,s).goto(t),l=t,a=o.openStart;for(;;){let u=Math.min(o.to,i);if(o.point){let c=o.activeForPoint(o.to),h=o.pointFrom<t?c.length+1:o.point.startSide<0?c.length:Math.min(c.length,a);r.point(l,u,o.point,c,h,o.pointRank),a=Math.min(o.openEnd(u),c.length)}else u>l&&(r.span(l,u,o.active,a),a=o.openEnd(u));if(o.to>i)return a+(o.point&&o.to>i?1:0);l=o.to,o.next()}}static of(e,t=!1){let i=new ur;for(let r of e instanceof sl?[e]:t?pg(e):e)i.add(r.from,r.to,r.value);return i.finish()}static join(e){if(!e.length)return pe.empty;let t=e[e.length-1];for(let i=e.length-2;i>=0;i--)for(let r=e[i];r!=pe.empty;r=r.nextLayer)t=new pe(r.chunkPos,r.chunk,t,Math.max(r.maxPoint,t.maxPoint));return t}}pe.empty=new pe([],[],null,-1);function pg(n){if(n.length>1)for(let e=n[0],t=1;t<n.length;t++){let i=n[t];if(ol(e,i)>0)return n.slice().sort(ol);e=i}return n}pe.empty.nextLayer=pe.empty;class ur{finishChunk(e){this.chunks.push(new pa(this.from,this.to,this.value,this.maxPoint)),this.chunkPos.push(this.chunkStart),this.chunkStart=-1,this.setMaxPoint=Math.max(this.setMaxPoint,this.maxPoint),this.maxPoint=-1,e&&(this.from=[],this.to=[],this.value=[])}constructor(){this.chunks=[],this.chunkPos=[],this.chunkStart=-1,this.last=null,this.lastFrom=-1e9,this.lastTo=-1e9,this.from=[],this.to=[],this.value=[],this.maxPoint=-1,this.setMaxPoint=-1,this.nextLayer=null}add(e,t,i){this.addInner(e,t,i)||(this.nextLayer||(this.nextLayer=new ur)).add(e,t,i)}addInner(e,t,i){let r=e-this.lastTo||i.startSide-this.last.endSide;if(r<=0&&(e-this.lastFrom||i.startSide-this.last.startSide)<0)throw new Error("Ranges must be added sorted by `from` position and `startSide`");return r<0?!1:(this.from.length==250&&this.finishChunk(!0),this.chunkStart<0&&(this.chunkStart=e),this.from.push(e-this.chunkStart),this.to.push(t-this.chunkStart),this.last=i,this.lastFrom=e,this.lastTo=t,this.value.push(i),i.point&&(this.maxPoint=Math.max(this.maxPoint,t-e)),!0)}addChunk(e,t){if((e-this.lastTo||t.value[0].startSide-this.last.endSide)<0)return!1;this.from.length&&this.finishChunk(!0),this.setMaxPoint=Math.max(this.setMaxPoint,t.maxPoint),this.chunks.push(t),this.chunkPos.push(e);let i=t.value.length-1;return this.last=t.value[i],this.lastFrom=t.from[i]+e,this.lastTo=t.to[i]+e,!0}finish(){return this.finishInner(pe.empty)}finishInner(e){if(this.from.length&&this.finishChunk(!1),this.chunks.length==0)return e;let t=pe.create(this.chunkPos,this.chunks,this.nextLayer?this.nextLayer.finishInner(e):e,this.setMaxPoint);return this.from=null,t}}function yu(n,e,t){let i=new Map;for(let s of n)for(let o=0;o<s.chunk.length;o++)s.chunk[o].maxPoint<=0&&i.set(s.chunk[o],s.chunkPos[o]);let r=new Set;for(let s of e)for(let o=0;o<s.chunk.length;o++){let l=i.get(s.chunk[o]);l!=null&&(t?t.mapPos(l):l)==s.chunkPos[o]&&!(t!=null&&t.touchesRange(l,l+s.chunk[o].length))&&r.add(s.chunk[o])}return r}class Yh{constructor(e,t,i,r=0){this.layer=e,this.skip=t,this.minPoint=i,this.rank=r}get startSide(){return this.value?this.value.startSide:0}get endSide(){return this.value?this.value.endSide:0}goto(e,t=-1e9){return this.chunkIndex=this.rangeIndex=0,this.gotoInner(e,t,!1),this}gotoInner(e,t,i){for(;this.chunkIndex<this.layer.chunk.length;){let r=this.layer.chunk[this.chunkIndex];if(!(this.skip&&this.skip.has(r)||this.layer.chunkEnd(this.chunkIndex)<e||r.maxPoint<this.minPoint))break;this.chunkIndex++,i=!1}if(this.chunkIndex<this.layer.chunk.length){let r=this.layer.chunk[this.chunkIndex].findIndex(e-this.layer.chunkPos[this.chunkIndex],t,!0);(!i||this.rangeIndex<r)&&this.setRangeIndex(r)}this.next()}forward(e,t){(this.to-e||this.endSide-t)<0&&this.gotoInner(e,t,!0)}next(){for(;;)if(this.chunkIndex==this.layer.chunk.length){this.from=this.to=1e9,this.value=null;break}else{let e=this.layer.chunkPos[this.chunkIndex],t=this.layer.chunk[this.chunkIndex],i=e+t.from[this.rangeIndex];if(this.from=i,this.to=e+t.to[this.rangeIndex],this.value=t.value[this.rangeIndex],this.setRangeIndex(this.rangeIndex+1),this.minPoint<0||this.value.point&&this.to-this.from>=this.minPoint)break}}setRangeIndex(e){if(e==this.layer.chunk[this.chunkIndex].value.length){if(this.chunkIndex++,this.skip)for(;this.chunkIndex<this.layer.chunk.length&&this.skip.has(this.layer.chunk[this.chunkIndex]);)this.chunkIndex++;this.rangeIndex=0}else this.rangeIndex=e}nextChunk(){this.chunkIndex++,this.rangeIndex=0,this.next()}compare(e){return this.from-e.from||this.startSide-e.startSide||this.rank-e.rank||this.to-e.to||this.endSide-e.endSide}}class cr{constructor(e){this.heap=e}static from(e,t=null,i=-1){let r=[];for(let s=0;s<e.length;s++)for(let o=e[s];!o.isEmpty;o=o.nextLayer)o.maxPoint>=i&&r.push(new Yh(o,t,i,s));return r.length==1?r[0]:new cr(r)}get startSide(){return this.value?this.value.startSide:0}goto(e,t=-1e9){for(let i of this.heap)i.goto(e,t);for(let i=this.heap.length>>1;i>=0;i--)oo(this.heap,i);return this.next(),this}forward(e,t){for(let i of this.heap)i.forward(e,t);for(let i=this.heap.length>>1;i>=0;i--)oo(this.heap,i);(this.to-e||this.value.endSide-t)<0&&this.next()}next(){if(this.heap.length==0)this.from=this.to=1e9,this.value=null,this.rank=-1;else{let e=this.heap[0];this.from=e.from,this.to=e.to,this.value=e.value,this.rank=e.rank,e.value&&e.next(),oo(this.heap,0)}}}function oo(n,e){for(let t=n[e];;){let i=(e<<1)+1;if(i>=n.length)break;let r=n[i];if(i+1<n.length&&r.compare(n[i+1])>=0&&(r=n[i+1],i++),t.compare(r)<0)break;n[i]=t,n[e]=r,e=i}}class Ni{constructor(e,t,i){this.minPoint=i,this.active=[],this.activeTo=[],this.activeRank=[],this.minActive=-1,this.point=null,this.pointFrom=0,this.pointRank=0,this.to=-1e9,this.endSide=0,this.openStart=-1,this.cursor=cr.from(e,t,i)}goto(e,t=-1e9){return this.cursor.goto(e,t),this.active.length=this.activeTo.length=this.activeRank.length=0,this.minActive=-1,this.to=e,this.endSide=t,this.openStart=-1,this.next(),this}forward(e,t){for(;this.minActive>-1&&(this.activeTo[this.minActive]-e||this.active[this.minActive].endSide-t)<0;)this.removeActive(this.minActive);this.cursor.forward(e,t)}removeActive(e){Pr(this.active,e),Pr(this.activeTo,e),Pr(this.activeRank,e),this.minActive=ku(this.active,this.activeTo)}addActive(e){let t=0,{value:i,to:r,rank:s}=this.cursor;for(;t<this.activeRank.length&&(s-this.activeRank[t]||r-this.activeTo[t])>0;)t++;Dr(this.active,t,i),Dr(this.activeTo,t,r),Dr(this.activeRank,t,s),e&&Dr(e,t,this.cursor.from),this.minActive=ku(this.active,this.activeTo)}next(){let e=this.to,t=this.point;this.point=null;let i=this.openStart<0?[]:null;for(;;){let r=this.minActive;if(r>-1&&(this.activeTo[r]-this.cursor.from||this.active[r].endSide-this.cursor.startSide)<0){if(this.activeTo[r]>e){this.to=this.activeTo[r],this.endSide=this.active[r].endSide;break}this.removeActive(r),i&&Pr(i,r)}else if(this.cursor.value)if(this.cursor.from>e){this.to=this.cursor.from,this.endSide=this.cursor.startSide;break}else{let s=this.cursor.value;if(!s.point)this.addActive(i),this.cursor.next();else if(t&&this.cursor.to==this.to&&this.cursor.from<this.cursor.to)this.cursor.next();else{this.point=s,this.pointFrom=this.cursor.from,this.pointRank=this.cursor.rank,this.to=this.cursor.to,this.endSide=s.endSide,this.cursor.next(),this.forward(this.to,this.endSide);break}}else{this.to=this.endSide=1e9;break}}if(i){this.openStart=0;for(let r=i.length-1;r>=0&&i[r]<e;r--)this.openStart++}}activeForPoint(e){if(!this.active.length)return this.active;let t=[];for(let i=this.active.length-1;i>=0&&!(this.activeRank[i]<this.pointRank);i--)(this.activeTo[i]>e||this.activeTo[i]==e&&this.active[i].endSide>=this.point.endSide)&&t.push(this.active[i]);return t.reverse()}openEnd(e){let t=0;for(let i=this.activeTo.length-1;i>=0&&this.activeTo[i]>e;i--)t++;return t}}function wu(n,e,t,i,r,s){n.goto(e),t.goto(i);let o=i+r,l=i,a=i-e,u=!!s.boundChange;for(let c=!1;;){let h=n.to+a-t.to,f=h||n.endSide-t.endSide,d=f<0?n.to+a:t.to,p=Math.min(d,o);if(n.point||t.point?(n.point&&t.point&&da(n.point,t.point)&&ll(n.activeForPoint(n.to),t.activeForPoint(t.to))||s.comparePoint(l,p,n.point,t.point),c=!1):(c&&s.boundChange(l),p>l&&!ll(n.active,t.active)&&s.compareRange(l,p,n.active,t.active),u&&p<o&&(h||n.openEnd(d)!=t.openEnd(d))&&(c=!0)),d>o)break;l=d,f<=0&&n.next(),f>=0&&t.next()}}function ll(n,e){if(n.length!=e.length)return!1;for(let t=0;t<n.length;t++)if(n[t]!=e[t]&&!da(n[t],e[t]))return!1;return!0}function Pr(n,e){for(let t=e,i=n.length-1;t<i;t++)n[t]=n[t+1];n.pop()}function Dr(n,e,t){for(let i=n.length-1;i>=e;i--)n[i+1]=n[i];n[e]=t}function ku(n,e){let t=-1,i=1e9;for(let r=0;r<e.length;r++)(e[r]-i||n[r].endSide-n[t].endSide)<0&&(t=r,i=e[r]);return t}function zs(n,e,t=n.length){let i=0;for(let r=0;r<t&&r<n.length;)n.charCodeAt(r)==9?(i+=e-i%e,r++):(i++,r=Xe(n,r));return i}function mg(n,e,t,i){for(let r=0,s=0;;){if(s>=e)return r;if(r==n.length)break;s+=n.charCodeAt(r)==9?t-s%t:1,r=Xe(n,r)}return n.length}const al="ͼ",xu=typeof Symbol>"u"?"__"+al:Symbol.for(al),ul=typeof Symbol>"u"?"__styleSet"+Math.floor(Math.random()*1e8):Symbol("styleSet"),vu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{};class _n{constructor(e,t){this.rules=[];let{finish:i}=t||{};function r(o){return/^@/.test(o)?[o]:o.split(/,\s*/)}function s(o,l,a,u){let c=[],h=/^@(\w+)\b/.exec(o[0]),f=h&&h[1]=="keyframes";if(h&&l==null)return a.push(o[0]+";");for(let d in l){let p=l[d];if(/&/.test(d))s(d.split(/,\s*/).map(m=>o.map(b=>m.replace(/&/,b))).reduce((m,b)=>m.concat(b)),p,a);else if(p&&typeof p=="object"){if(!h)throw new RangeError("The value of a property ("+d+") should be a primitive value.");s(r(d),p,c,f)}else p!=null&&c.push(d.replace(/_.*/,"").replace(/[A-Z]/g,m=>"-"+m.toLowerCase())+": "+p+";")}(c.length||f)&&a.push((i&&!h&&!u?o.map(i):o).join(", ")+" {"+c.join(" ")+"}")}for(let o in e)s(r(o),e[o],this.rules)}getRules(){return this.rules.join(`
`)}static newName(){let e=vu[xu]||1;return vu[xu]=e+1,al+e.toString(36)}static mount(e,t,i){let r=e[ul],s=i&&i.nonce;r?s&&r.setNonce(s):r=new gg(e,s),r.mount(Array.isArray(t)?t:[t],e)}}let Su=new Map;class gg{constructor(e,t){let i=e.ownerDocument||e,r=i.defaultView;if(!e.head&&e.adoptedStyleSheets&&r.CSSStyleSheet){let s=Su.get(i);if(s)return e[ul]=s;this.sheet=new r.CSSStyleSheet,Su.set(i,this)}else this.styleTag=i.createElement("style"),t&&this.styleTag.setAttribute("nonce",t);this.modules=[],e[ul]=this}mount(e,t){let i=this.sheet,r=0,s=0;for(let o=0;o<e.length;o++){let l=e[o],a=this.modules.indexOf(l);if(a<s&&a>-1&&(this.modules.splice(a,1),s--,a=-1),a==-1){if(this.modules.splice(s++,0,l),i)for(let u=0;u<l.rules.length;u++)i.insertRule(l.rules[u],r++)}else{for(;s<a;)r+=this.modules[s++].rules.length;r+=l.rules.length,s++}}if(i)t.adoptedStyleSheets.indexOf(this.sheet)<0&&(t.adoptedStyleSheets=[this.sheet,...t.adoptedStyleSheets]);else{let o="";for(let a=0;a<this.modules.length;a++)o+=this.modules[a].getRules()+`
`;this.styleTag.textContent=o;let l=t.head||t;this.styleTag.parentNode!=l&&l.insertBefore(this.styleTag,l.firstChild)}}setNonce(e){this.styleTag&&this.styleTag.getAttribute("nonce")!=e&&this.styleTag.setAttribute("nonce",e)}}var Cn={8:"Backspace",9:"Tab",10:"Enter",12:"NumLock",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",44:"PrintScreen",45:"Insert",46:"Delete",59:";",61:"=",91:"Meta",92:"Meta",106:"*",107:"+",108:",",109:"-",110:".",111:"/",144:"NumLock",145:"ScrollLock",160:"Shift",161:"Shift",162:"Control",163:"Control",164:"Alt",165:"Alt",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},hr={48:")",49:"!",50:"@",51:"#",52:"$",53:"%",54:"^",55:"&",56:"*",57:"(",59:":",61:"+",173:"_",186:":",187:"+",188:"<",189:"_",190:">",191:"?",192:"~",219:"{",220:"|",221:"}",222:'"'},bg=typeof navigator<"u"&&/Mac/.test(navigator.platform),yg=typeof navigator<"u"&&/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);for(var Ve=0;Ve<10;Ve++)Cn[48+Ve]=Cn[96+Ve]=String(Ve);for(var Ve=1;Ve<=24;Ve++)Cn[Ve+111]="F"+Ve;for(var Ve=65;Ve<=90;Ve++)Cn[Ve]=String.fromCharCode(Ve+32),hr[Ve]=String.fromCharCode(Ve);for(var lo in Cn)hr.hasOwnProperty(lo)||(hr[lo]=Cn[lo]);function wg(n){var e=bg&&n.metaKey&&n.shiftKey&&!n.ctrlKey&&!n.altKey||yg&&n.shiftKey&&n.key&&n.key.length==1||n.key=="Unidentified",t=!e&&n.key||(n.shiftKey?hr:Cn)[n.keyCode]||n.key||"Unidentified";return t=="Esc"&&(t="Escape"),t=="Del"&&(t="Delete"),t=="Left"&&(t="ArrowLeft"),t=="Up"&&(t="ArrowUp"),t=="Right"&&(t="ArrowRight"),t=="Down"&&(t="ArrowDown"),t}let Je=typeof navigator<"u"?navigator:{userAgent:"",vendor:"",platform:""},cl=typeof document<"u"?document:{documentElement:{style:{}}};const hl=/Edge\/(\d+)/.exec(Je.userAgent),Qh=/MSIE \d/.test(Je.userAgent),fl=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Je.userAgent),Fs=!!(Qh||fl||hl),_u=!Fs&&/gecko\/(\d+)/i.test(Je.userAgent),ao=!Fs&&/Chrome\/(\d+)/.exec(Je.userAgent),kg="webkitFontSmoothing"in cl.documentElement.style,dl=!Fs&&/Apple Computer/.test(Je.vendor),Cu=dl&&(/Mobile\/\w+/.test(Je.userAgent)||Je.maxTouchPoints>2);var $={mac:Cu||/Mac/.test(Je.platform),windows:/Win/.test(Je.platform),linux:/Linux|X11/.test(Je.platform),ie:Fs,ie_version:Qh?cl.documentMode||6:fl?+fl[1]:hl?+hl[1]:0,gecko:_u,gecko_version:_u?+(/Firefox\/(\d+)/.exec(Je.userAgent)||[0,0])[1]:0,chrome:!!ao,chrome_version:ao?+ao[1]:0,ios:Cu,android:/Android\b/.test(Je.userAgent),webkit_version:kg?+(/\bAppleWebKit\/(\d+)/.exec(Je.userAgent)||[0,0])[1]:0,safari:dl,safari_version:dl?+(/\bVersion\/(\d+(\.\d+)?)/.exec(Je.userAgent)||[0,0])[1]:0,tabSize:cl.documentElement.style.tabSize!=null?"tab-size":"-moz-tab-size"};function ma(n,e){for(let t in n)t=="class"&&e.class?e.class+=" "+n.class:t=="style"&&e.style?e.style+=";"+n.style:e[t]=n[t];return e}const bs=Object.create(null);function ga(n,e,t){if(n==e)return!0;n||(n=bs),e||(e=bs);let i=Object.keys(n),r=Object.keys(e);if(i.length-0!=r.length-0)return!1;for(let s of i)if(s!=t&&(r.indexOf(s)==-1||n[s]!==e[s]))return!1;return!0}function xg(n,e){for(let t=n.attributes.length-1;t>=0;t--){let i=n.attributes[t].name;e[i]==null&&n.removeAttribute(i)}for(let t in e){let i=e[t];t=="style"?n.style.cssText=i:n.getAttribute(t)!=i&&n.setAttribute(t,i)}}function Au(n,e,t){let i=!1;if(e)for(let r in e)t&&r in t||(i=!0,r=="style"?n.style.cssText="":n.removeAttribute(r));if(t)for(let r in t)e&&e[r]==t[r]||(i=!0,r=="style"?n.style.cssText=t[r]:n.setAttribute(r,t[r]));return i}function vg(n){let e=Object.create(null);for(let t=0;t<n.attributes.length;t++){let i=n.attributes[t];e[i.name]=i.value}return e}class Ns{eq(e){return!1}updateDOM(e,t,i){return!1}compare(e){return this==e||this.constructor==e.constructor&&this.eq(e)}get estimatedHeight(){return-1}get lineBreaks(){return 0}ignoreEvent(e){return!0}coordsAt(e,t,i){return null}get isHidden(){return!1}get editable(){return!1}destroy(e){}}var We=(function(n){return n[n.Text=0]="Text",n[n.WidgetBefore=1]="WidgetBefore",n[n.WidgetAfter=2]="WidgetAfter",n[n.WidgetRange=3]="WidgetRange",n})(We||(We={}));class Re extends Un{constructor(e,t,i,r){super(),this.startSide=e,this.endSide=t,this.widget=i,this.spec=r}get heightRelevant(){return!1}static mark(e){return new vr(e)}static widget(e){let t=Math.max(-1e4,Math.min(1e4,e.side||0)),i=!!e.block;return t+=i&&!e.inlineOrder?t>0?3e8:-4e8:t>0?1e8:-1e8,new jn(e,t,t,i,e.widget||null,!1)}static replace(e){let t=!!e.block,i,r;if(e.isBlockGap)i=-5e8,r=4e8;else{let{start:s,end:o}=Jh(e,t);i=(s?t?-3e8:-1:5e8)-1,r=(o?t?2e8:1:-6e8)+1}return new jn(e,i,r,t,e.widget||null,!0)}static line(e){return new Sr(e)}static set(e,t=!1){return pe.of(e,t)}hasHeight(){return this.widget?this.widget.estimatedHeight>-1:!1}}Re.none=pe.empty;class vr extends Re{constructor(e){let{start:t,end:i}=Jh(e);super(t?-1:5e8,i?1:-6e8,null,e),this.tagName=e.tagName||"span",this.attrs=e.class&&e.attributes?ma(e.attributes,{class:e.class}):e.class?{class:e.class}:e.attributes||bs}eq(e){return this==e||e instanceof vr&&this.tagName==e.tagName&&ga(this.attrs,e.attrs)}range(e,t=e){if(e>=t)throw new RangeError("Mark decorations may not be empty");return super.range(e,t)}}vr.prototype.point=!1;class Sr extends Re{constructor(e){super(-2e8,-2e8,null,e)}eq(e){return e instanceof Sr&&this.spec.class==e.spec.class&&ga(this.spec.attributes,e.spec.attributes)}range(e,t=e){if(t!=e)throw new RangeError("Line decoration ranges must be zero-length");return super.range(e,t)}}Sr.prototype.mapMode=dt.TrackBefore;Sr.prototype.point=!0;class jn extends Re{constructor(e,t,i,r,s,o){super(t,i,s,e),this.block=r,this.isReplace=o,this.mapMode=r?t<=0?dt.TrackBefore:dt.TrackAfter:dt.TrackDel}get type(){return this.startSide!=this.endSide?We.WidgetRange:this.startSide<=0?We.WidgetBefore:We.WidgetAfter}get heightRelevant(){return this.block||!!this.widget&&(this.widget.estimatedHeight>=5||this.widget.lineBreaks>0)}eq(e){return e instanceof jn&&Sg(this.widget,e.widget)&&this.block==e.block&&this.startSide==e.startSide&&this.endSide==e.endSide}range(e,t=e){if(this.isReplace&&(e>t||e==t&&this.startSide>0&&this.endSide<=0))throw new RangeError("Invalid range for replacement decoration");if(!this.isReplace&&t!=e)throw new RangeError("Widget decorations can only have zero-length ranges");return super.range(e,t)}}jn.prototype.point=!0;function Jh(n,e=!1){let{inclusiveStart:t,inclusiveEnd:i}=n;return t==null&&(t=n.inclusive),i==null&&(i=n.inclusive),{start:t??e,end:i??e}}function Sg(n,e){return n==e||!!(n&&e&&n.compare(e))}function gi(n,e,t,i=0){let r=t.length-1;r>=0&&t[r]+i>=n?t[r]=Math.max(t[r],e):t.push(n,e)}class fr extends Un{constructor(e,t){super(),this.tagName=e,this.attributes=t}eq(e){return e==this||e instanceof fr&&this.tagName==e.tagName&&ga(this.attributes,e.attributes)}static create(e){return new fr(e.tagName,e.attributes||bs)}static set(e,t=!1){return pe.of(e,t)}}fr.prototype.startSide=fr.prototype.endSide=-1;function dr(n){let e;return n.nodeType==11?e=n.getSelection?n:n.ownerDocument:e=n,e.getSelection()}function pl(n,e){return e?n==e||n.contains(e.nodeType!=1?e.parentNode:e):!1}function tr(n,e){if(!e.anchorNode)return!1;try{return pl(n,e.anchorNode)}catch{return!1}}function is(n){return n.nodeType==3?pr(n,0,n.nodeValue.length).getClientRects():n.nodeType==1?n.getClientRects():[]}function nr(n,e,t,i){return t?Tu(n,e,t,i,-1)||Tu(n,e,t,i,1):!1}function An(n){for(var e=0;;e++)if(n=n.previousSibling,!n)return e}function ys(n){return n.nodeType==1&&/^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(n.nodeName)}function Tu(n,e,t,i,r){for(;;){if(n==t&&e==i)return!0;if(e==(r<0?0:cn(n))){if(n.nodeName=="DIV")return!1;let s=n.parentNode;if(!s||s.nodeType!=1)return!1;e=An(n)+(r<0?0:1),n=s}else if(n.nodeType==1){if(n=n.childNodes[e+(r<0?-1:0)],n.nodeType==1&&n.contentEditable=="false")return!1;e=r<0?cn(n):0}else return!1}}function cn(n){return n.nodeType==3?n.nodeValue.length:n.childNodes.length}function ws(n,e){let t=e?n.left:n.right;return{left:t,right:t,top:n.top,bottom:n.bottom}}function _g(n){let e=n.visualViewport;return e?{left:0,right:e.width,top:0,bottom:e.height}:{left:0,right:n.innerWidth,top:0,bottom:n.innerHeight}}function Zh(n,e){let t=e.width/n.offsetWidth,i=e.height/n.offsetHeight;return(t>.995&&t<1.005||!isFinite(t)||Math.abs(e.width-n.offsetWidth)<1)&&(t=1),(i>.995&&i<1.005||!isFinite(i)||Math.abs(e.height-n.offsetHeight)<1)&&(i=1),{scaleX:t,scaleY:i}}function Cg(n,e,t,i,r,s,o,l){let a=n.ownerDocument,u=a.defaultView||window;for(let c=n,h=!1;c&&!h;)if(c.nodeType==1){let f,d=c==a.body,p=1,m=1;if(d)f=_g(u);else{if(/^(fixed|sticky)$/.test(getComputedStyle(c).position)&&(h=!0),c.scrollHeight<=c.clientHeight&&c.scrollWidth<=c.clientWidth){c=c.assignedSlot||c.parentNode;continue}let _=c.getBoundingClientRect();({scaleX:p,scaleY:m}=Zh(c,_)),f={left:_.left,right:_.left+c.clientWidth*p,top:_.top,bottom:_.top+c.clientHeight*m}}let b=0,g=0;if(r=="nearest")e.top<f.top?(g=e.top-(f.top+o),t>0&&e.bottom>f.bottom+g&&(g=e.bottom-f.bottom+o)):e.bottom>f.bottom&&(g=e.bottom-f.bottom+o,t<0&&e.top-g<f.top&&(g=e.top-(f.top+o)));else{let _=e.bottom-e.top,S=f.bottom-f.top;g=(r=="center"&&_<=S?e.top+_/2-S/2:r=="start"||r=="center"&&t<0?e.top-o:e.bottom-S+o)-f.top}if(i=="nearest"?e.left<f.left?(b=e.left-(f.left+s),t>0&&e.right>f.right+b&&(b=e.right-f.right+s)):e.right>f.right&&(b=e.right-f.right+s,t<0&&e.left<f.left+b&&(b=e.left-(f.left+s))):b=(i=="center"?e.left+(e.right-e.left)/2-(f.right-f.left)/2:i=="start"==l?e.left-s:e.right-(f.right-f.left)+s)-f.left,b||g)if(d)u.scrollBy(b,g);else{let _=0,S=0;if(g){let D=c.scrollTop;c.scrollTop+=g/m,S=(c.scrollTop-D)*m}if(b){let D=c.scrollLeft;c.scrollLeft+=b/p,_=(c.scrollLeft-D)*p}e={left:e.left-_,top:e.top-S,right:e.right-_,bottom:e.bottom-S},_&&Math.abs(_-b)<1&&(i="nearest"),S&&Math.abs(S-g)<1&&(r="nearest")}if(d)break;(e.top<f.top||e.bottom>f.bottom||e.left<f.left||e.right>f.right)&&(e={left:Math.max(e.left,f.left),right:Math.min(e.right,f.right),top:Math.max(e.top,f.top),bottom:Math.min(e.bottom,f.bottom)}),c=c.assignedSlot||c.parentNode}else if(c.nodeType==11)c=c.host;else break}function ef(n,e=!0){let t=n.ownerDocument,i=null,r=null;for(let s=n.parentNode;s&&!(s==t.body||(!e||i)&&r);)if(s.nodeType==1)!r&&s.scrollHeight>s.clientHeight&&(r=s),e&&!i&&s.scrollWidth>s.clientWidth&&(i=s),s=s.assignedSlot||s.parentNode;else if(s.nodeType==11)s=s.host;else break;return{x:i,y:r}}class Ag{constructor(){this.anchorNode=null,this.anchorOffset=0,this.focusNode=null,this.focusOffset=0}eq(e){return this.anchorNode==e.anchorNode&&this.anchorOffset==e.anchorOffset&&this.focusNode==e.focusNode&&this.focusOffset==e.focusOffset}setRange(e){let{anchorNode:t,focusNode:i}=e;this.set(t,Math.min(e.anchorOffset,t?cn(t):0),i,Math.min(e.focusOffset,i?cn(i):0))}set(e,t,i,r){this.anchorNode=e,this.anchorOffset=t,this.focusNode=i,this.focusOffset=r}}let Nn=null;$.safari&&$.safari_version>=26&&(Nn=!1);function tf(n){if(n.setActive)return n.setActive();if(Nn)return n.focus(Nn);let e=[];for(let t=n;t&&(e.push(t,t.scrollTop,t.scrollLeft),t!=t.ownerDocument);t=t.parentNode);if(n.focus(Nn==null?{get preventScroll(){return Nn={preventScroll:!0},!0}}:void 0),!Nn){Nn=!1;for(let t=0;t<e.length;){let i=e[t++],r=e[t++],s=e[t++];i.scrollTop!=r&&(i.scrollTop=r),i.scrollLeft!=s&&(i.scrollLeft=s)}}}let Eu;function pr(n,e,t=e){let i=Eu||(Eu=document.createRange());return i.setEnd(n,t),i.setStart(n,e),i}function bi(n,e,t,i){let r={key:e,code:e,keyCode:t,which:t,cancelable:!0};i&&({altKey:r.altKey,ctrlKey:r.ctrlKey,shiftKey:r.shiftKey,metaKey:r.metaKey}=i);let s=new KeyboardEvent("keydown",r);s.synthetic=!0,n.dispatchEvent(s);let o=new KeyboardEvent("keyup",r);return o.synthetic=!0,n.dispatchEvent(o),s.defaultPrevented||o.defaultPrevented}function Tg(n){for(;n;){if(n&&(n.nodeType==9||n.nodeType==11&&n.host))return n;n=n.assignedSlot||n.parentNode}return null}function Eg(n,e){let t=e.focusNode,i=e.focusOffset;if(!t||e.anchorNode!=t||e.anchorOffset!=i)return!1;for(i=Math.min(i,cn(t));;)if(i){if(t.nodeType!=1)return!1;let r=t.childNodes[i-1];r.contentEditable=="false"?i--:(t=r,i=cn(t))}else{if(t==n)return!0;i=An(t),t=t.parentNode}}function nf(n){return n instanceof Window?n.pageYOffset>Math.max(0,n.document.documentElement.scrollHeight-n.innerHeight-4):n.scrollTop>Math.max(1,n.scrollHeight-n.clientHeight-4)}function rf(n,e){for(let t=n,i=e;;){if(t.nodeType==3&&i>0)return{node:t,offset:i};if(t.nodeType==1&&i>0){if(t.contentEditable=="false")return null;t=t.childNodes[i-1],i=cn(t)}else if(t.parentNode&&!ys(t))i=An(t),t=t.parentNode;else return null}}function sf(n,e){for(let t=n,i=e;;){if(t.nodeType==3&&i<t.nodeValue.length)return{node:t,offset:i};if(t.nodeType==1&&i<t.childNodes.length){if(t.contentEditable=="false")return null;t=t.childNodes[i],i=0}else if(t.parentNode&&!ys(t))i=An(t)+1,t=t.parentNode;else return null}}class Mt{constructor(e,t,i=!0){this.node=e,this.offset=t,this.precise=i}static before(e,t){return new Mt(e.parentNode,An(e),t)}static after(e,t){return new Mt(e.parentNode,An(e)+1,t)}}var Ae=(function(n){return n[n.LTR=0]="LTR",n[n.RTL=1]="RTL",n})(Ae||(Ae={}));const Kn=Ae.LTR,ba=Ae.RTL;function of(n){let e=[];for(let t=0;t<n.length;t++)e.push(1<<+n[t]);return e}const Mg=of("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"),Pg=of("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"),ml=Object.create(null),Ft=[];for(let n of["()","[]","{}"]){let e=n.charCodeAt(0),t=n.charCodeAt(1);ml[e]=t,ml[t]=-e}function lf(n){return n<=247?Mg[n]:1424<=n&&n<=1524?2:1536<=n&&n<=1785?Pg[n-1536]:1774<=n&&n<=2220?4:8192<=n&&n<=8204?256:64336<=n&&n<=65023?4:1}const Dg=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;class jt{get dir(){return this.level%2?ba:Kn}constructor(e,t,i){this.from=e,this.to=t,this.level=i}side(e,t){return this.dir==t==e?this.to:this.from}forward(e,t){return e==(this.dir==t)}static find(e,t,i,r){let s=-1;for(let o=0;o<e.length;o++){let l=e[o];if(l.from<=t&&l.to>=t){if(l.level==i)return o;(s<0||(r!=0?r<0?l.from<t:l.to>t:e[s].level>l.level))&&(s=o)}}if(s<0)throw new RangeError("Index out of range");return s}}function af(n,e){if(n.length!=e.length)return!1;for(let t=0;t<n.length;t++){let i=n[t],r=e[t];if(i.from!=r.from||i.to!=r.to||i.direction!=r.direction||!af(i.inner,r.inner))return!1}return!0}const ke=[];function Ig(n,e,t,i,r){for(let s=0;s<=i.length;s++){let o=s?i[s-1].to:e,l=s<i.length?i[s].from:t,a=s?256:r;for(let u=o,c=a,h=a;u<l;u++){let f=lf(n.charCodeAt(u));f==512?f=c:f==8&&h==4&&(f=16),ke[u]=f==4?2:f,f&7&&(h=f),c=f}for(let u=o,c=a,h=a;u<l;u++){let f=ke[u];if(f==128)u<l-1&&c==ke[u+1]&&c&24?f=ke[u]=c:ke[u]=256;else if(f==64){let d=u+1;for(;d<l&&ke[d]==64;)d++;let p=u&&c==8||d<t&&ke[d]==8?h==1?1:8:256;for(let m=u;m<d;m++)ke[m]=p;u=d-1}else f==8&&h==1&&(ke[u]=1);c=f,f&7&&(h=f)}}}function Lg(n,e,t,i,r){let s=r==1?2:1;for(let o=0,l=0,a=0;o<=i.length;o++){let u=o?i[o-1].to:e,c=o<i.length?i[o].from:t;for(let h=u,f,d,p;h<c;h++)if(d=ml[f=n.charCodeAt(h)])if(d<0){for(let m=l-3;m>=0;m-=3)if(Ft[m+1]==-d){let b=Ft[m+2],g=b&2?r:b&4?b&1?s:r:0;g&&(ke[h]=ke[Ft[m]]=g),l=m;break}}else{if(Ft.length==189)break;Ft[l++]=h,Ft[l++]=f,Ft[l++]=a}else if((p=ke[h])==2||p==1){let m=p==r;a=m?0:1;for(let b=l-3;b>=0;b-=3){let g=Ft[b+2];if(g&2)break;if(m)Ft[b+2]|=2;else{if(g&4)break;Ft[b+2]|=4}}}}}function Bg(n,e,t,i){for(let r=0,s=i;r<=t.length;r++){let o=r?t[r-1].to:n,l=r<t.length?t[r].from:e;for(let a=o;a<l;){let u=ke[a];if(u==256){let c=a+1;for(;;)if(c==l){if(r==t.length)break;c=t[r++].to,l=r<t.length?t[r].from:e}else if(ke[c]==256)c++;else break;let h=s==1,f=(c<e?ke[c]:i)==1,d=h==f?h?1:2:i;for(let p=c,m=r,b=m?t[m-1].to:n;p>a;)p==b&&(p=t[--m].from,b=m?t[m-1].to:n),ke[--p]=d;a=c}else s=u,a++}}}function gl(n,e,t,i,r,s,o){let l=i%2?2:1;if(i%2==r%2)for(let a=e,u=0;a<t;){let c=!0,h=!1;if(u==s.length||a<s[u].from){let m=ke[a];m!=l&&(c=!1,h=m==16)}let f=!c&&l==1?[]:null,d=c?i:i+1,p=a;e:for(;;)if(u<s.length&&p==s[u].from){if(h)break e;let m=s[u];if(!c)for(let b=m.to,g=u+1;;){if(b==t)break e;if(g<s.length&&s[g].from==b)b=s[g++].to;else{if(ke[b]==l)break e;break}}if(u++,f)f.push(m);else{m.from>a&&o.push(new jt(a,m.from,d));let b=m.direction==Kn!=!(d%2);bl(n,b?i+1:i,r,m.inner,m.from,m.to,o),a=m.to}p=m.to}else{if(p==t||(c?ke[p]!=l:ke[p]==l))break;p++}f?gl(n,a,p,i+1,r,f,o):a<p&&o.push(new jt(a,p,d)),a=p}else for(let a=t,u=s.length;a>e;){let c=!0,h=!1;if(!u||a>s[u-1].to){let m=ke[a-1];m!=l&&(c=!1,h=m==16)}let f=!c&&l==1?[]:null,d=c?i:i+1,p=a;e:for(;;)if(u&&p==s[u-1].to){if(h)break e;let m=s[--u];if(!c)for(let b=m.from,g=u;;){if(b==e)break e;if(g&&s[g-1].to==b)b=s[--g].from;else{if(ke[b-1]==l)break e;break}}if(f)f.push(m);else{m.to<a&&o.push(new jt(m.to,a,d));let b=m.direction==Kn!=!(d%2);bl(n,b?i+1:i,r,m.inner,m.from,m.to,o),a=m.from}p=m.from}else{if(p==e||(c?ke[p-1]!=l:ke[p-1]==l))break;p--}f?gl(n,p,a,i+1,r,f,o):p<a&&o.push(new jt(p,a,d)),a=p}}function bl(n,e,t,i,r,s,o){let l=e%2?2:1;Ig(n,r,s,i,l),Lg(n,r,s,i,l),Bg(r,s,i,l),gl(n,r,s,e,t,i,o)}function Og(n,e,t){if(!n)return[new jt(0,0,e==ba?1:0)];if(e==Kn&&!t.length&&!Dg.test(n))return uf(n.length);if(t.length)for(;n.length>ke.length;)ke[ke.length]=256;let i=[],r=e==Kn?0:1;return bl(n,r,r,t,0,n.length,i),i}function uf(n){return[new jt(0,n,0)]}let cf="";function Rg(n,e,t,i,r){var s;let o=i.head-n.from,l=jt.find(e,o,(s=i.bidiLevel)!==null&&s!==void 0?s:-1,i.assoc),a=e[l],u=a.side(r,t);if(o==u){let f=l+=r?1:-1;if(f<0||f>=e.length)return null;a=e[l=f],o=a.side(!r,t),u=a.side(r,t)}let c=Xe(n.text,o,a.forward(r,t));(c<a.from||c>a.to)&&(c=u),cf=n.text.slice(Math.min(o,c),Math.max(o,c));let h=l==(r?e.length-1:0)?null:e[l+(r?1:-1)];return h&&c==u&&h.level+(r?0:1)<a.level?L.cursor(h.side(!r,t)+n.from,h.forward(r,t)?1:-1,h.level):L.cursor(c+n.from,a.forward(r,t)?-1:1,a.level)}function zg(n,e,t){for(let i=e;i<t;i++){let r=lf(n.charCodeAt(i));if(r==1)return Kn;if(r==2||r==4)return ba}return Kn}const hf=U.define(),ff=U.define(),df=U.define(),pf=U.define(),yl=U.define(),mf=U.define(),gf=U.define(),ya=U.define(),wa=U.define(),bf=U.define({combine:n=>n.some(e=>e)}),yf=U.define({combine:n=>n.some(e=>e)}),wf=U.define();class yi{constructor(e,t="nearest",i="nearest",r=5,s=5,o=!1){this.range=e,this.y=t,this.x=i,this.yMargin=r,this.xMargin=s,this.isSnapshot=o}map(e){return e.empty?this:new yi(this.range.map(e),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}clip(e){return this.range.to<=e.doc.length?this:new yi(L.cursor(e.doc.length),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}}const Ir=Ie.define({map:(n,e)=>n.map(e)}),kf=Ie.define();function Kt(n,e,t){let i=n.facet(pf);i.length?i[0](e):window.onerror&&window.onerror(String(e),t,void 0,void 0,e)||(t?console.error(t+":",e):console.error(e))}const ln=U.define({combine:n=>n.length?n[0]:!0});let Fg=0;const ci=U.define({combine(n){return n.filter((e,t)=>{for(let i=0;i<t;i++)if(n[i].plugin==e.plugin)return!1;return!0})}});class Qt{constructor(e,t,i,r,s){this.id=e,this.create=t,this.domEventHandlers=i,this.domEventObservers=r,this.baseExtensions=s(this),this.extension=this.baseExtensions.concat(ci.of({plugin:this,arg:void 0}))}of(e){return this.baseExtensions.concat(ci.of({plugin:this,arg:e}))}static define(e,t){const{eventHandlers:i,eventObservers:r,provide:s,decorations:o}=t||{};return new Qt(Fg++,e,i,r,l=>{let a=[];return o&&a.push(qs.of(u=>{let c=u.plugin(l);return c?o(c):Re.none})),s&&a.push(s(l)),a})}static fromClass(e,t){return Qt.define((i,r)=>new e(i,r),t)}}class uo{constructor(e){this.spec=e,this.mustUpdate=null,this.value=null}get plugin(){return this.spec&&this.spec.plugin}update(e){if(this.value){if(this.mustUpdate){let t=this.mustUpdate;if(this.mustUpdate=null,this.value.update)try{this.value.update(t)}catch(i){if(Kt(t.state,i,"CodeMirror plugin crashed"),this.value.destroy)try{this.value.destroy()}catch{}this.deactivate()}}}else if(this.spec)try{this.value=this.spec.plugin.create(e,this.spec.arg)}catch(t){Kt(e.state,t,"CodeMirror plugin crashed"),this.deactivate()}return this}destroy(e){var t;if(!((t=this.value)===null||t===void 0)&&t.destroy)try{this.value.destroy()}catch(i){Kt(e.state,i,"CodeMirror plugin crashed")}}deactivate(){this.spec=this.value=null}}const xf=U.define(),ka=U.define(),qs=U.define(),vf=U.define(),xa=U.define(),_r=U.define(),Sf=U.define();function Mu(n,e){let t=n.state.facet(Sf);if(!t.length)return t;let i=t.map(s=>s instanceof Function?s(n):s),r=[];return pe.spans(i,e.from,e.to,{point(){},span(s,o,l,a){let u=s-e.from,c=o-e.from,h=r;for(let f=l.length-1;f>=0;f--,a--){let d=l[f].spec.bidiIsolate,p;if(d==null&&(d=zg(e.text,u,c)),a>0&&h.length&&(p=h[h.length-1]).to==u&&p.direction==d)p.to=c,h=p.inner;else{let m={from:u,to:c,direction:d,inner:[]};h.push(m),h=m.inner}}}}),r}const _f=U.define();function Cf(n){let e=0,t=0,i=0,r=0;for(let s of n.state.facet(_f)){let o=s(n);o&&(o.left!=null&&(e=Math.max(e,o.left)),o.right!=null&&(t=Math.max(t,o.right)),o.top!=null&&(i=Math.max(i,o.top)),o.bottom!=null&&(r=Math.max(r,o.bottom)))}return{left:e,right:t,top:i,bottom:r}}const Yi=U.define();class kt{constructor(e,t,i,r){this.fromA=e,this.toA=t,this.fromB=i,this.toB=r}join(e){return new kt(Math.min(this.fromA,e.fromA),Math.max(this.toA,e.toA),Math.min(this.fromB,e.fromB),Math.max(this.toB,e.toB))}addToSet(e){let t=e.length,i=this;for(;t>0;t--){let r=e[t-1];if(!(r.fromA>i.toA)){if(r.toA<i.fromA)break;i=i.join(r),e.splice(t-1,1)}}return e.splice(t,0,i),e}static extendWithRanges(e,t){if(t.length==0)return e;let i=[];for(let r=0,s=0,o=0;;){let l=r<e.length?e[r].fromB:1e9,a=s<t.length?t[s]:1e9,u=Math.min(l,a);if(u==1e9)break;let c=u+o,h=u,f=c;for(;;)if(s<t.length&&t[s]<=h){let d=t[s+1];s+=2,h=Math.max(h,d);for(let p=r;p<e.length&&e[p].fromB<=h;p++)o=e[p].toA-e[p].toB;f=Math.max(f,d+o)}else if(r<e.length&&e[r].fromB<=h){let d=e[r++];h=Math.max(h,d.toB),f=Math.max(f,d.toA),o=d.toA-d.toB}else break;i.push(new kt(c,f,u,h))}return i}}class ks{constructor(e,t,i){this.view=e,this.state=t,this.transactions=i,this.flags=0,this.startState=e.state,this.changes=ze.empty(this.startState.doc.length);for(let s of i)this.changes=this.changes.compose(s.changes);let r=[];this.changes.iterChangedRanges((s,o,l,a)=>r.push(new kt(s,o,l,a))),this.changedRanges=r}static create(e,t,i){return new ks(e,t,i)}get viewportChanged(){return(this.flags&4)>0}get viewportMoved(){return(this.flags&8)>0}get heightChanged(){return(this.flags&2)>0}get geometryChanged(){return this.docChanged||(this.flags&18)>0}get focusChanged(){return(this.flags&1)>0}get docChanged(){return!this.changes.empty}get selectionSet(){return this.transactions.some(e=>e.selection)}get empty(){return this.flags==0&&this.transactions.length==0}}const Ng=[];class Ee{constructor(e,t,i=0){this.dom=e,this.length=t,this.flags=i,this.parent=null,e.cmTile=this}get breakAfter(){return this.flags&1}get children(){return Ng}isWidget(){return!1}get isHidden(){return!1}isComposite(){return!1}isLine(){return!1}isText(){return!1}isBlock(){return!1}get domAttrs(){return null}sync(e){if(this.flags|=2,this.flags&4){this.flags&=-5;let t=this.domAttrs;t&&xg(this.dom,t)}}toString(){return this.constructor.name+(this.children.length?`(${this.children})`:"")+(this.breakAfter?"#":"")}destroy(){this.parent=null}setDOM(e){this.dom=e,e.cmTile=this}get posAtStart(){return this.parent?this.parent.posBefore(this):0}get posAtEnd(){return this.posAtStart+this.length}posBefore(e,t=this.posAtStart){let i=t;for(let r of this.children){if(r==e)return i;i+=r.length+r.breakAfter}throw new RangeError("Invalid child in posBefore")}posAfter(e){return this.posBefore(e)+e.length}covers(e){return!0}coordsIn(e,t){return null}domPosFor(e,t){let i=An(this.dom),r=this.length?e>0:t>0;return new Mt(this.parent.dom,i+(r?1:0),e==0||e==this.length)}markDirty(e){this.flags&=-3,e&&(this.flags|=4),this.parent&&this.parent.flags&2&&this.parent.markDirty(!1)}get overrideDOMText(){return null}get root(){for(let e=this;e;e=e.parent)if(e instanceof $s)return e;return null}static get(e){return e.cmTile}}class Hs extends Ee{constructor(e){super(e,0),this._children=[]}isComposite(){return!0}get children(){return this._children}get lastChild(){return this.children.length?this.children[this.children.length-1]:null}append(e){this.children.push(e),e.parent=this}sync(e){if(this.flags&2)return;super.sync(e);let t=this.dom,i=null,r,s=(e==null?void 0:e.node)==t?e:null,o=0;for(let l of this.children){if(l.sync(e),o+=l.length+l.breakAfter,r=i?i.nextSibling:t.firstChild,s&&r!=l.dom&&(s.written=!0),l.dom.parentNode==t)for(;r&&r!=l.dom;)r=Pu(r);else t.insertBefore(l.dom,r);i=l.dom}for(r=i?i.nextSibling:t.firstChild,s&&r&&(s.written=!0);r;)r=Pu(r);this.length=o}}function Pu(n){let e=n.nextSibling;return n.parentNode.removeChild(n),e}class $s extends Hs{constructor(e,t){super(t),this.view=e}owns(e){for(;e;e=e.parent)if(e==this)return!0;return!1}isBlock(){return!0}nearest(e){for(;;){if(!e)return null;let t=Ee.get(e);if(t&&this.owns(t))return t;e=e.parentNode}}blockTiles(e){for(let t=[],i=this,r=0,s=0;;)if(r==i.children.length){if(!t.length)return;i=i.parent,i.breakAfter&&s++,r=t.pop()}else{let o=i.children[r++];if(o instanceof un)t.push(r),i=o,r=0;else{let l=s+o.length,a=e(o,s);if(a!==void 0)return a;s=l+o.breakAfter}}}resolveBlock(e,t){let i,r=-1,s,o=-1;if(this.blockTiles((l,a)=>{let u=a+l.length;if(e>=a&&e<=u){if(l.isWidget()&&t>=-1&&t<=1){if(l.flags&32)return!0;l.flags&16&&(i=void 0)}(a<e||e==u&&(t<-1?l.length:l.covers(1)))&&(!i||!l.isWidget()&&i.isWidget())&&(i=l,r=e-a),(u>e||e==a&&(t>1?l.length:l.covers(-1)))&&(!s||!l.isWidget()&&s.isWidget())&&(s=l,o=e-a)}}),!i&&!s)throw new Error("No tile at position "+e);return i&&t<0||!s?{tile:i,offset:r}:{tile:s,offset:o}}}class un extends Hs{constructor(e,t){super(e),this.wrapper=t}isBlock(){return!0}covers(e){return this.children.length?e<0?this.children[0].covers(-1):this.lastChild.covers(1):!1}get domAttrs(){return this.wrapper.attributes}static of(e,t){let i=new un(t||document.createElement(e.tagName),e);return t||(i.flags|=4),i}}class vi extends Hs{constructor(e,t){super(e),this.attrs=t}isLine(){return!0}static start(e,t,i){let r=new vi(t||document.createElement("div"),e);return(!t||!i)&&(r.flags|=4),r}get domAttrs(){return this.attrs}resolveInline(e,t,i){let r=null,s=-1,o=null,l=-1;function a(c,h){for(let f=0,d=0;f<c.children.length&&d<=h;f++){let p=c.children[f],m=d+p.length;m>=h&&(p.isComposite()?a(p,h-d):(!o||o.isHidden&&(t>0||i&&Hg(o,p)))&&(m>h||p.flags&32)?(o=p,l=h-d):(d<h||p.flags&16&&!p.isHidden)&&(r=p,s=h-d)),d=m}}a(this,e);let u=(t<0?r:o)||r||o;return u?{tile:u,offset:u==r?s:l}:null}coordsIn(e,t){let i=this.resolveInline(e,t,!0);return i?i.tile.coordsIn(Math.max(0,i.offset),t):qg(this)}domIn(e,t){let i=this.resolveInline(e,t);if(i){let{tile:r,offset:s}=i;if(this.dom.contains(r.dom))return r.isText()?new Mt(r.dom,Math.min(r.dom.nodeValue.length,s)):r.domPosFor(s,r.flags&16?1:r.flags&32?-1:t);let o=i.tile.parent,l=!1;for(let a of o.children){if(l)return new Mt(a.dom,0);a==i.tile&&(l=!0)}}return new Mt(this.dom,0)}}function qg(n){let e=n.dom.lastChild;if(!e)return n.dom.getBoundingClientRect();let t=is(e);return t[t.length-1]||null}function Hg(n,e){let t=n.coordsIn(0,1),i=e.coordsIn(0,1);return t&&i&&i.top<t.bottom}class it extends Hs{constructor(e,t){super(e),this.mark=t}get domAttrs(){return this.mark.attrs}static of(e,t){let i=new it(t||document.createElement(e.tagName),e);return t||(i.flags|=4),i}}class $n extends Ee{constructor(e,t){super(e,t.length),this.text=t}sync(e){this.flags&2||(super.sync(e),this.dom.nodeValue!=this.text&&(e&&e.node==this.dom&&(e.written=!0),this.dom.nodeValue=this.text))}isText(){return!0}toString(){return JSON.stringify(this.text)}coordsIn(e,t){let i=this.dom.nodeValue.length;e>i&&(e=i);let r=e,s=e,o=0;e==0&&t<0||e==i&&t>=0?$.chrome||$.gecko||(e?(r--,o=1):s<i&&(s++,o=-1)):t<0?r--:s<i&&s++;let l=pr(this.dom,r,s).getClientRects();if(!l.length)return null;let a=l[(o?o<0:t>=0)?0:l.length-1];return $.safari&&!o&&a.width==0&&(a=Array.prototype.find.call(l,u=>u.width)||a),o?ws(a,o<0):a||null}static of(e,t){let i=new $n(t||document.createTextNode(e),e);return t||(i.flags|=2),i}}class Xn extends Ee{constructor(e,t,i,r){super(e,t,r),this.widget=i}isWidget(){return!0}get isHidden(){return this.widget.isHidden}covers(e){return this.flags&48?!1:(this.flags&(e<0?64:128))>0}coordsIn(e,t){return this.coordsInWidget(e,t,!1)}coordsInWidget(e,t,i){let r=this.widget.coordsAt(this.dom,e,t);if(r)return r;if(i)return ws(this.dom.getBoundingClientRect(),this.length?e==0:t<=0);{let s=this.dom.getClientRects(),o=null;if(!s.length)return null;let l=this.flags&16?!0:this.flags&32?!1:e>0;for(let a=l?s.length-1:0;o=s[a],!(e>0?a==0:a==s.length-1||o.top<o.bottom);a+=l?-1:1);return ws(o,!l)}}get overrideDOMText(){if(!this.length)return me.empty;let{root:e}=this;if(!e)return me.empty;let t=this.posAtStart;return e.view.state.doc.slice(t,t+this.length)}destroy(){super.destroy(),this.widget.destroy(this.dom)}static of(e,t,i,r,s){return s||(s=e.toDOM(t),e.editable||(s.contentEditable="false")),new Xn(s,i,e,r)}}class xs extends Ee{constructor(e){let t=document.createElement("img");t.className="cm-widgetBuffer",t.setAttribute("aria-hidden","true"),super(t,0,e)}get isHidden(){return!0}get overrideDOMText(){return me.empty}coordsIn(e){return this.dom.getBoundingClientRect()}}class $g{constructor(e){this.index=0,this.beforeBreak=!1,this.parents=[],this.tile=e}advance(e,t,i){let{tile:r,index:s,beforeBreak:o,parents:l}=this;for(;e||t>0;)if(r.isComposite())if(o){if(!e)break;i&&i.break(),e--,o=!1}else if(s==r.children.length){if(!e&&!l.length)break;i&&i.leave(r),o=!!r.breakAfter,{tile:r,index:s}=l.pop(),s++}else{let a=r.children[s],u=a.breakAfter;(t>0?a.length<=e:a.length<e)&&(!i||i.skip(a,0,a.length)!==!1||!a.isComposite)?(o=!!u,s++,e-=a.length):(l.push({tile:r,index:s}),r=a,s=0,i&&a.isComposite()&&i.enter(a))}else if(s==r.length)o=!!r.breakAfter,{tile:r,index:s}=l.pop(),s++;else if(e){let a=Math.min(e,r.length-s);i&&i.skip(r,s,s+a),e-=a,s+=a}else break;return this.tile=r,this.index=s,this.beforeBreak=o,this}get root(){return this.parents.length?this.parents[0].tile:this.tile}}class Vg{constructor(e,t,i,r){this.from=e,this.to=t,this.wrapper=i,this.rank=r}}class Wg{constructor(e,t,i){this.cache=e,this.root=t,this.blockWrappers=i,this.curLine=null,this.lastBlock=null,this.afterWidget=null,this.pos=0,this.wrappers=[],this.wrapperPos=0}addText(e,t,i,r){var s;this.flushBuffer();let o=this.ensureMarks(t,i),l=o.lastChild;if(l&&l.isText()&&!(l.flags&8)&&l.length+e.length<512){this.cache.reused.set(l,2);let a=o.children[o.children.length-1]=new $n(l.dom,l.text+e);a.parent=o}else o.append(r||$n.of(e,(s=this.cache.find($n))===null||s===void 0?void 0:s.dom));this.pos+=e.length,this.afterWidget=null}addComposition(e,t){let i=this.curLine;i.dom!=t.line.dom&&(i.setDOM(this.cache.reused.has(t.line)?co(t.line.dom):t.line.dom),this.cache.reused.set(t.line,2));let r=i;for(let l=t.marks.length-1;l>=0;l--){let a=t.marks[l],u=r.lastChild;if(u instanceof it&&u.mark.eq(a.mark))u.dom!=a.dom&&u.setDOM(co(a.dom)),r=u;else{if(this.cache.reused.get(a)){let h=Ee.get(a.dom);h&&h.setDOM(co(a.dom))}let c=it.of(a.mark,a.dom);r.append(c),r=c}this.cache.reused.set(a,2)}let s=Ee.get(e.text);s&&this.cache.reused.set(s,2);let o=new $n(e.text,e.text.nodeValue);o.flags|=8,r.append(o)}addInlineWidget(e,t,i){let r=this.afterWidget&&e.flags&48&&(this.afterWidget.flags&48)==(e.flags&48);r||this.flushBuffer();let s=this.ensureMarks(t,i);!r&&!(e.flags&16)&&s.append(this.getBuffer(1)),s.append(e),this.pos+=e.length,this.afterWidget=e}addMark(e,t,i){this.flushBuffer(),this.ensureMarks(t,i).append(e),this.pos+=e.length,this.afterWidget=null}addBlockWidget(e){this.getBlockPos().append(e),this.pos+=e.length,this.lastBlock=e,this.endLine()}continueWidget(e){let t=this.afterWidget||this.lastBlock;t.length+=e,this.pos+=e}addLineStart(e,t){var i;e||(e=Af);let r=vi.start(e,t||((i=this.cache.find(vi))===null||i===void 0?void 0:i.dom),!!t);this.getBlockPos().append(this.lastBlock=this.curLine=r)}addLine(e){this.getBlockPos().append(e),this.pos+=e.length,this.lastBlock=e,this.endLine()}addBreak(){this.lastBlock.flags|=1,this.endLine(),this.pos++}addLineStartIfNotCovered(e){this.blockPosCovered()||this.addLineStart(e)}ensureLine(e){this.curLine||this.addLineStart(e)}ensureMarks(e,t){var i;let r=this.curLine;for(let s=e.length-1;s>=0;s--){let o=e[s],l;if(t>0&&(l=r.lastChild)&&l instanceof it&&l.mark.eq(o))r=l,t--;else{let a=it.of(o,(i=this.cache.find(it,u=>u.mark.eq(o)))===null||i===void 0?void 0:i.dom);r.append(a),r=a,t=0}}return r}endLine(){if(this.curLine){this.flushBuffer();let e=this.curLine.lastChild;(!e||!Du(this.curLine,!1)||e.dom.nodeName!="BR"&&e.isWidget()&&!($.ios&&Du(this.curLine,!0)))&&this.curLine.append(this.cache.findWidget(ho,0,32)||new Xn(ho.toDOM(),0,ho,32)),this.curLine=this.afterWidget=null}}updateBlockWrappers(){this.wrapperPos>this.pos+1e4&&(this.blockWrappers.goto(this.pos),this.wrappers.length=0);for(let e=this.wrappers.length-1;e>=0;e--)this.wrappers[e].to<this.pos&&this.wrappers.splice(e,1);for(let e=this.blockWrappers;e.value&&e.from<=this.pos;e.next())if(e.to>=this.pos){let t=new Vg(e.from,e.to,e.value,e.rank),i=this.wrappers.length;for(;i>0&&(this.wrappers[i-1].rank-t.rank||this.wrappers[i-1].to-t.to)<0;)i--;this.wrappers.splice(i,0,t)}this.wrapperPos=this.pos}getBlockPos(){var e;this.updateBlockWrappers();let t=this.root;for(let i of this.wrappers){let r=t.lastChild;if(i.from<this.pos&&r instanceof un&&r.wrapper.eq(i.wrapper))t=r;else{let s=un.of(i.wrapper,(e=this.cache.find(un,o=>o.wrapper.eq(i.wrapper)))===null||e===void 0?void 0:e.dom);t.append(s),t=s}}return t}blockPosCovered(){let e=this.lastBlock;return e!=null&&!e.breakAfter&&(!e.isWidget()||(e.flags&160)>0)}getBuffer(e){let t=2|(e<0?16:32),i=this.cache.find(xs,void 0,1);return i&&(i.flags=t),i||new xs(t)}flushBuffer(){this.afterWidget&&!(this.afterWidget.flags&32)&&(this.afterWidget.parent.append(this.getBuffer(-1)),this.afterWidget=null)}}class Ug{constructor(e){this.skipCount=0,this.text="",this.textOff=0,this.cursor=e.iter()}skip(e){this.textOff+e<=this.text.length?this.textOff+=e:(this.skipCount+=e-(this.text.length-this.textOff),this.text="",this.textOff=0)}next(e){if(this.textOff==this.text.length){let{value:r,lineBreak:s,done:o}=this.cursor.next(this.skipCount);if(this.skipCount=0,o)throw new Error("Ran out of text content when drawing inline views");this.text=r;let l=this.textOff=Math.min(e,r.length);return s?null:r.slice(0,l)}let t=Math.min(this.text.length,this.textOff+e),i=this.text.slice(this.textOff,t);return this.textOff=t,i}}const vs=[Xn,vi,$n,it,xs,un,$s];for(let n=0;n<vs.length;n++)vs[n].bucket=n;class jg{constructor(e){this.view=e,this.buckets=vs.map(()=>[]),this.index=vs.map(()=>0),this.reused=new Map}add(e){let t=e.constructor.bucket,i=this.buckets[t];i.length<6?i.push(e):i[this.index[t]=(this.index[t]+1)%6]=e}find(e,t,i=2){let r=e.bucket,s=this.buckets[r],o=this.index[r];for(let l=s.length-1;l>=0;l--){let a=(l+o)%s.length,u=s[a];if((!t||t(u))&&!this.reused.has(u))return s.splice(a,1),a<o&&this.index[r]--,this.reused.set(u,i),u}return null}findWidget(e,t,i){let r=this.buckets[0];if(r.length)for(let s=0,o=0;;s++){if(s==r.length){if(o)return null;o=1,s=0}let l=r[s];if(!this.reused.has(l)&&(o==0?l.widget.compare(e):l.widget.constructor==e.constructor&&e.updateDOM(l.dom,this.view,l.widget)))return r.splice(s,1),s<this.index[0]&&this.index[0]--,l.widget==e&&l.length==t&&(l.flags&497)==i?(this.reused.set(l,1),l):(this.reused.set(l,2),new Xn(l.dom,t,e,l.flags&-498|i))}}reuse(e){return this.reused.set(e,1),e}maybeReuse(e,t=2){if(!this.reused.has(e))return this.reused.set(e,t),e.dom}clear(){for(let e=0;e<this.buckets.length;e++)this.buckets[e].length=this.index[e]=0}}class Kg{constructor(e,t,i,r,s){this.view=e,this.decorations=r,this.disallowBlockEffectsFor=s,this.openWidget=!1,this.openMarks=0,this.cache=new jg(e),this.text=new Ug(e.state.doc),this.builder=new Wg(this.cache,new $s(e,e.contentDOM),pe.iter(i)),this.cache.reused.set(t,2),this.old=new $g(t),this.reuseWalker={skip:(o,l,a)=>{if(this.cache.add(o),o.isComposite())return!1},enter:o=>this.cache.add(o),leave:()=>{},break:()=>{}}}run(e,t){let i=t&&this.getCompositionContext(t.text);for(let r=0,s=0,o=0;;){let l=o<e.length?e[o++]:null,a=l?l.fromA:this.old.root.length;if(a>r){let u=a-r;this.preserve(u,!o,!l),r=a,s+=u}if(!l)break;t&&l.fromA<=t.range.fromA&&l.toA>=t.range.toA?(this.forward(l.fromA,t.range.fromA,t.range.fromA<t.range.toA?1:-1),this.emit(s,t.range.fromB),this.cache.clear(),this.builder.addComposition(t,i),this.text.skip(t.range.toB-t.range.fromB),this.forward(t.range.fromA,l.toA),this.emit(t.range.toB,l.toB)):(this.forward(l.fromA,l.toA),this.emit(s,l.toB)),s=l.toB,r=l.toA}return this.builder.curLine&&this.builder.endLine(),this.builder.root}preserve(e,t,i){let r=Yg(this.old),s=this.openMarks;this.old.advance(e,i?1:-1,{skip:(o,l,a)=>{if(o.isWidget())if(this.openWidget)this.builder.continueWidget(a-l);else{let u=a>0||l<o.length?Xn.of(o.widget,this.view,a-l,o.flags&496,this.cache.maybeReuse(o)):this.cache.reuse(o);u.flags&256?(u.flags&=-2,this.builder.addBlockWidget(u)):(this.builder.ensureLine(null),this.builder.addInlineWidget(u,r,s),s=r.length)}else if(o.isText())this.builder.ensureLine(null),!l&&a==o.length&&!this.cache.reused.has(o)?this.builder.addText(o.text,r,s,this.cache.reuse(o)):(this.cache.add(o),this.builder.addText(o.text.slice(l,a),r,s)),s=r.length;else if(o.isLine())o.flags&=-2,this.cache.reused.set(o,1),this.builder.addLine(o);else if(o instanceof xs)this.cache.add(o);else if(o instanceof it)this.builder.ensureLine(null),this.builder.addMark(o,r,s),this.cache.reused.set(o,1),s=r.length;else return!1;this.openWidget=!1},enter:o=>{o.isLine()?this.builder.addLineStart(o.attrs,this.cache.maybeReuse(o)):(this.cache.add(o),o instanceof it&&r.unshift(o.mark)),this.openWidget=!1},leave:o=>{o.isLine()?r.length&&(r.length=s=0):o instanceof it&&(r.shift(),s=Math.min(s,r.length))},break:()=>{this.builder.addBreak(),this.openWidget=!1}}),this.text.skip(e)}emit(e,t){let i=null,r=this.builder,s=0,o=pe.spans(this.decorations,e,t,{point:(l,a,u,c,h,f)=>{if(u instanceof jn){if(this.disallowBlockEffectsFor[f]){if(u.block)throw new RangeError("Block decorations may not be specified via plugins");if(a>this.view.state.doc.lineAt(l).to)throw new RangeError("Decorations that replace line breaks may not be specified via plugins")}if(s=c.length,h>c.length)r.continueWidget(a-l);else{let d=u.widget||(u.block?Si.block:Si.inline),p=Xg(u),m=this.cache.findWidget(d,a-l,p)||Xn.of(d,this.view,a-l,p);u.block?(u.startSide>0&&r.addLineStartIfNotCovered(i),r.addBlockWidget(m)):(r.ensureLine(i),r.addInlineWidget(m,c,h))}i=null}else i=Gg(i,u);a>l&&this.text.skip(a-l)},span:(l,a,u,c)=>{for(let h=l;h<a;){let f=this.text.next(Math.min(512,a-h));f==null?(r.addLineStartIfNotCovered(i),r.addBreak(),h++):(r.ensureLine(i),r.addText(f,u,h==l?c:u.length),h+=f.length),i=null}}});r.addLineStartIfNotCovered(i),this.openWidget=o>s,this.openMarks=o}forward(e,t,i=1){t-e<=10?this.old.advance(t-e,i,this.reuseWalker):(this.old.advance(5,-1,this.reuseWalker),this.old.advance(t-e-10,-1),this.old.advance(5,i,this.reuseWalker))}getCompositionContext(e){let t=[],i=null;for(let r=e.parentNode;;r=r.parentNode){let s=Ee.get(r);if(r==this.view.contentDOM)break;s instanceof it?t.push(s):s!=null&&s.isLine()?i=s:s instanceof un||(r.nodeName=="DIV"&&!i&&r!=this.view.contentDOM?i=new vi(r,Af):i||t.push(it.of(new vr({tagName:r.nodeName.toLowerCase(),attributes:vg(r)}),r)))}return{line:i,marks:t}}}function Du(n,e){let t=i=>{for(let r of i.children)if((e?r.isText():r.length)||t(r))return!0;return!1};return t(n)}function Xg(n){let e=n.isReplace?(n.startSide<0?64:0)|(n.endSide>0?128:0):n.startSide>0?32:16;return n.block&&(e|=256),e}const Af={class:"cm-line"};function Gg(n,e){let t=e.spec.attributes,i=e.spec.class;return!t&&!i||(n||(n={class:"cm-line"}),t&&ma(t,n),i&&(n.class+=" "+i)),n}function Yg(n){let e=[];for(let t=n.parents.length;t>1;t--){let i=t==n.parents.length?n.tile:n.parents[t].tile;i instanceof it&&e.push(i.mark)}return e}function co(n){let e=Ee.get(n);return e&&e.setDOM(n.cloneNode()),n}class Si extends Ns{constructor(e){super(),this.tag=e}eq(e){return e.tag==this.tag}toDOM(){return document.createElement(this.tag)}updateDOM(e){return e.nodeName.toLowerCase()==this.tag}get isHidden(){return!0}}Si.inline=new Si("span");Si.block=new Si("div");const ho=new class extends Ns{toDOM(){return document.createElement("br")}get isHidden(){return!0}get editable(){return!0}};class Iu{constructor(e){this.view=e,this.decorations=[],this.blockWrappers=[],this.dynamicDecorationMap=[!1],this.domChanged=null,this.hasComposition=null,this.editContextFormatting=Re.none,this.lastCompositionAfterCursor=!1,this.minWidth=0,this.minWidthFrom=0,this.minWidthTo=0,this.impreciseAnchor=null,this.impreciseHead=null,this.forceSelection=!1,this.lastUpdate=Date.now(),this.updateDeco(),this.tile=new $s(e,e.contentDOM),this.updateInner([new kt(0,0,0,e.state.doc.length)],null)}update(e){var t;let i=e.changedRanges;this.minWidth>0&&i.length&&(i.every(({fromA:c,toA:h})=>h<this.minWidthFrom||c>this.minWidthTo)?(this.minWidthFrom=e.changes.mapPos(this.minWidthFrom,1),this.minWidthTo=e.changes.mapPos(this.minWidthTo,1)):this.minWidth=this.minWidthFrom=this.minWidthTo=0),this.updateEditContextFormatting(e);let r=-1;this.view.inputState.composing>=0&&!this.view.observer.editContext&&(!((t=this.domChanged)===null||t===void 0)&&t.newSel?r=this.domChanged.newSel.head:!s1(e.changes,this.hasComposition)&&!e.selectionSet&&(r=e.state.selection.main.head));let s=r>-1?Jg(this.view,e.changes,r):null;if(this.domChanged=null,this.hasComposition){let{from:c,to:h}=this.hasComposition;i=new kt(c,h,e.changes.mapPos(c,-1),e.changes.mapPos(h,1)).addToSet(i.slice())}this.hasComposition=s?{from:s.range.fromB,to:s.range.toB}:null,($.ie||$.chrome)&&!s&&e&&e.state.doc.lines!=e.startState.doc.lines&&(this.forceSelection=!0);let o=this.decorations,l=this.blockWrappers;this.updateDeco();let a=t1(o,this.decorations,e.changes);a.length&&(i=kt.extendWithRanges(i,a));let u=i1(l,this.blockWrappers,e.changes);return u.length&&(i=kt.extendWithRanges(i,u)),s&&!i.some(c=>c.fromA<=s.range.fromA&&c.toA>=s.range.toA)&&(i=s.range.addToSet(i.slice())),this.tile.flags&2&&i.length==0?!1:(this.updateInner(i,s),e.transactions.length&&(this.lastUpdate=Date.now()),!0)}updateInner(e,t){this.view.viewState.mustMeasureContent=!0;let{observer:i}=this.view;i.ignore(()=>{if(t||e.length){let o=this.tile,l=new Kg(this.view,o,this.blockWrappers,this.decorations,this.dynamicDecorationMap);t&&Ee.get(t.text)&&l.cache.reused.set(Ee.get(t.text),2),this.tile=l.run(e,t),wl(o,l.cache.reused)}this.tile.dom.style.height=this.view.viewState.contentHeight/this.view.scaleY+"px",this.tile.dom.style.flexBasis=this.minWidth?this.minWidth+"px":"";let s=$.chrome||$.ios?{node:i.selectionRange.focusNode,written:!1}:void 0;this.tile.sync(s),s&&(s.written||i.selectionRange.focusNode!=s.node||!this.tile.dom.contains(s.node))&&(this.forceSelection=!0),this.tile.dom.style.height=""});let r=[];if(this.view.viewport.from||this.view.viewport.to<this.view.state.doc.length)for(let s of this.tile.children)s.isWidget()&&s.widget instanceof fo&&r.push(s.dom);i.updateGaps(r)}updateEditContextFormatting(e){this.editContextFormatting=this.editContextFormatting.map(e.changes);for(let t of e.transactions)for(let i of t.effects)i.is(kf)&&(this.editContextFormatting=i.value)}updateSelection(e=!1,t=!1){(e||!this.view.observer.selectionRange.focusNode)&&this.view.observer.readSelectionRange();let{dom:i}=this.tile,r=this.view.root.activeElement,s=r==i,o=!s&&!(this.view.state.facet(ln)||i.tabIndex>-1)&&tr(i,this.view.observer.selectionRange)&&!(r&&i.contains(r));if(!(s||t||o))return;let l=this.forceSelection;this.forceSelection=!1;let a=this.view.state.selection.main,u,c;if(a.empty?c=u=this.inlineDOMNearPos(a.anchor,a.assoc||1):(c=this.inlineDOMNearPos(a.head,a.head==a.from?1:-1),u=this.inlineDOMNearPos(a.anchor,a.anchor==a.from?1:-1)),$.gecko&&a.empty&&!this.hasComposition&&Qg(u)){let f=document.createTextNode("");this.view.observer.ignore(()=>u.node.insertBefore(f,u.node.childNodes[u.offset]||null)),u=c=new Mt(f,0),l=!0}let h=this.view.observer.selectionRange;(l||!h.focusNode||(!nr(u.node,u.offset,h.anchorNode,h.anchorOffset)||!nr(c.node,c.offset,h.focusNode,h.focusOffset))&&!this.suppressWidgetCursorChange(h,a))&&(this.view.observer.ignore(()=>{$.android&&$.chrome&&i.contains(h.focusNode)&&r1(h.focusNode,i)&&(i.blur(),i.focus({preventScroll:!0}));let f=dr(this.view.root);if(f)if(a.empty){if($.gecko){let d=Zg(u.node,u.offset);if(d&&d!=3){let p=(d==1?rf:sf)(u.node,u.offset);p&&(u=new Mt(p.node,p.offset))}}f.collapse(u.node,u.offset),a.bidiLevel!=null&&f.caretBidiLevel!==void 0&&(f.caretBidiLevel=a.bidiLevel)}else if(f.extend){f.collapse(u.node,u.offset);try{f.extend(c.node,c.offset)}catch{}}else{let d=document.createRange();a.anchor>a.head&&([u,c]=[c,u]),d.setEnd(c.node,c.offset),d.setStart(u.node,u.offset),f.removeAllRanges(),f.addRange(d)}o&&this.view.root.activeElement==i&&(i.blur(),r&&r.focus())}),this.view.observer.setSelectionRange(u,c)),this.impreciseAnchor=u.precise?null:new Mt(h.anchorNode,h.anchorOffset),this.impreciseHead=c.precise?null:new Mt(h.focusNode,h.focusOffset)}suppressWidgetCursorChange(e,t){return this.hasComposition&&t.empty&&nr(e.focusNode,e.focusOffset,e.anchorNode,e.anchorOffset)&&this.posFromDOM(e.focusNode,e.focusOffset)==t.head}enforceCursorAssoc(){if(this.hasComposition)return;let{view:e}=this,t=e.state.selection.main,i=dr(e.root),{anchorNode:r,anchorOffset:s}=e.observer.selectionRange;if(!i||!t.empty||!t.assoc||!i.modify)return;let o=this.lineAt(t.head,t.assoc);if(!o)return;let l=o.posAtStart;if(t.head==l||t.head==l+o.length)return;let a=this.coordsAt(t.head,-1),u=this.coordsAt(t.head,1);if(!a||!u||a.bottom>u.top)return;let c=this.domAtPos(t.head+t.assoc,t.assoc);i.collapse(c.node,c.offset),i.modify("move",t.assoc<0?"forward":"backward","lineboundary"),e.observer.readSelectionRange();let h=e.observer.selectionRange;e.docView.posFromDOM(h.anchorNode,h.anchorOffset)!=t.from&&i.collapse(r,s)}posFromDOM(e,t){let i=this.tile.nearest(e);if(!i)return this.tile.dom.compareDocumentPosition(e)&2?0:this.view.state.doc.length;let r=i.posAtStart;if(i.isComposite()){let s;if(e==i.dom)s=i.dom.childNodes[t];else{let o=cn(e)==0?0:t==0?-1:1;for(;;){let l=e.parentNode;if(l==i.dom)break;o==0&&l.firstChild!=l.lastChild&&(e==l.firstChild?o=-1:o=1),e=l}o<0?s=e:s=e.nextSibling}if(s==i.dom.firstChild)return r;for(;s&&!Ee.get(s);)s=s.nextSibling;if(!s)return r+i.length;for(let o=0,l=r;;o++){let a=i.children[o];if(a.dom==s)return l;l+=a.length+a.breakAfter}}else return i.isText()?e==i.dom?r+t:r+(t?i.length:0):r}domAtPos(e,t){let{tile:i,offset:r}=this.tile.resolveBlock(e,t);return i.isWidget()?i.domPosFor(e,t):i.domIn(r,t)}inlineDOMNearPos(e,t){let i,r=-1,s=!1,o,l=-1,a=!1;return this.tile.blockTiles((u,c)=>{if(u.isWidget()){if(u.flags&32&&c>=e)return!0;u.flags&16&&(s=!0)}else{let h=c+u.length;if(c<=e&&(i=u,r=e-c,s=h<e),h>=e&&!o&&(o=u,l=e-c,a=c>e),c>e&&o)return!0}}),!i&&!o?this.domAtPos(e,t):(s&&o?i=null:a&&i&&(o=null),i&&t<0||!o?i.domIn(r,t):o.domIn(l,t))}coordsAt(e,t){let{tile:i,offset:r}=this.tile.resolveBlock(e,t);return i.isWidget()?i.widget instanceof fo?null:i.coordsInWidget(r,t,!0):i.coordsIn(r,t)}lineAt(e,t){let{tile:i}=this.tile.resolveBlock(e,t);return i.isLine()?i:null}coordsForChar(e){let{tile:t,offset:i}=this.tile.resolveBlock(e,1);if(!t.isLine())return null;function r(s,o){if(s.isComposite())for(let l of s.children){if(l.length>=o){let a=r(l,o);if(a)return a}if(o-=l.length,o<0)break}else if(s.isText()&&o<s.length){let l=Xe(s.text,o);if(l==o)return null;let a=pr(s.dom,o,l).getClientRects();for(let u=0;u<a.length;u++){let c=a[u];if(u==a.length-1||c.top<c.bottom&&c.left<c.right)return c}}return null}return r(t,i)}measureVisibleLineHeights(e){let t=[],{from:i,to:r}=e,s=this.view.contentDOM.clientWidth,o=s>Math.max(this.view.scrollDOM.clientWidth,this.minWidth)+1,l=-1,a=this.view.textDirection==Ae.LTR,u=0,c=(h,f,d)=>{for(let p=0;p<h.children.length&&!(f>r);p++){let m=h.children[p],b=f+m.length,g=m.dom.getBoundingClientRect(),{height:_}=g;if(d&&!p&&(u+=g.top-d.top),m instanceof un)b>i&&c(m,f,g);else if(f>=i&&(u>0&&t.push(-u),t.push(_+u),u=0,o)){let S=m.dom.lastChild,D=S?is(S):[];if(D.length){let C=D[D.length-1],k=a?C.right-g.left:g.right-C.left;k>l&&(l=k,this.minWidth=s,this.minWidthFrom=f,this.minWidthTo=b)}}d&&p==h.children.length-1&&(u+=d.bottom-g.bottom),f=b+m.breakAfter}};return c(this.tile,0,null),t}textDirectionAt(e){let{tile:t}=this.tile.resolveBlock(e,1);return getComputedStyle(t.dom).direction=="rtl"?Ae.RTL:Ae.LTR}measureTextSize(){let e=this.tile.blockTiles(o=>{if(o.isLine()&&o.children.length&&o.length<=20){let l=0,a;for(let u of o.children){if(!u.isText()||/[^ -~]/.test(u.text))return;let c=is(u.dom);if(c.length!=1)return;l+=c[0].width,a=c[0].height}if(l)return{lineHeight:o.dom.getBoundingClientRect().height,charWidth:l/o.length,textHeight:a}}});if(e)return e;let t=document.createElement("div"),i,r,s;return t.className="cm-line",t.style.width="99999px",t.style.position="absolute",t.textContent="abc def ghi jkl mno pqr stu",this.view.observer.ignore(()=>{this.tile.dom.appendChild(t);let o=is(t.firstChild)[0];i=t.getBoundingClientRect().height,r=o&&o.width?o.width/27:7,s=o&&o.height?o.height:i,t.remove()}),{lineHeight:i,charWidth:r,textHeight:s}}computeBlockGapDeco(){let e=[],t=this.view.viewState;for(let i=0,r=0;;r++){let s=r==t.viewports.length?null:t.viewports[r],o=s?s.from-1:this.view.state.doc.length;if(o>i){let l=(t.lineBlockAt(o).bottom-t.lineBlockAt(i).top)/this.view.scaleY;e.push(Re.replace({widget:new fo(l),block:!0,inclusive:!0,isBlockGap:!0}).range(i,o))}if(!s)break;i=s.to+1}return Re.set(e)}updateDeco(){let e=1,t=this.view.state.facet(qs).map(s=>(this.dynamicDecorationMap[e++]=typeof s=="function")?s(this.view):s),i=!1,r=this.view.state.facet(xa).map((s,o)=>{let l=typeof s=="function";return l&&(i=!0),l?s(this.view):s});for(r.length&&(this.dynamicDecorationMap[e++]=i,t.push(pe.join(r))),this.decorations=[this.editContextFormatting,...t,this.computeBlockGapDeco(),this.view.viewState.lineGapDeco];e<this.decorations.length;)this.dynamicDecorationMap[e++]=!1;this.blockWrappers=this.view.state.facet(vf).map(s=>typeof s=="function"?s(this.view):s)}scrollIntoView(e){var t;if(e.isSnapshot){let c=this.view.viewState.lineBlockAt(e.range.head);this.view.scrollDOM.scrollTop=c.top-e.yMargin,this.view.scrollDOM.scrollLeft=e.xMargin;return}for(let c of this.view.state.facet(wf))try{if(c(this.view,e.range,e))return!0}catch(h){Kt(this.view.state,h,"scroll handler")}let{range:i}=e,r=this.coordsAt(i.head,(t=i.assoc)!==null&&t!==void 0?t:i.empty?0:i.head>i.anchor?-1:1),s;if(!r)return;!i.empty&&(s=this.coordsAt(i.anchor,i.anchor>i.head?-1:1))&&(r={left:Math.min(r.left,s.left),top:Math.min(r.top,s.top),right:Math.max(r.right,s.right),bottom:Math.max(r.bottom,s.bottom)});let o=Cf(this.view),l={left:r.left-o.left,top:r.top-o.top,right:r.right+o.right,bottom:r.bottom+o.bottom},{offsetWidth:a,offsetHeight:u}=this.view.scrollDOM;if(Cg(this.view.scrollDOM,l,i.head<i.anchor?-1:1,e.x,e.y,Math.max(Math.min(e.xMargin,a),-a),Math.max(Math.min(e.yMargin,u),-u),this.view.textDirection==Ae.LTR),window.visualViewport&&window.innerHeight-window.visualViewport.height>1&&(r.top>window.pageYOffset+window.visualViewport.offsetTop+window.visualViewport.height||r.bottom<window.pageYOffset+window.visualViewport.offsetTop)){let c=this.view.docView.lineAt(i.head,1);c&&c.dom.scrollIntoView({block:"nearest"})}}lineHasWidget(e){let t=i=>i.isWidget()||i.children.some(t);return t(this.tile.resolveBlock(e,1).tile)}destroy(){wl(this.tile)}}function wl(n,e){let t=e==null?void 0:e.get(n);if(t!=1){t==null&&n.destroy();for(let i of n.children)wl(i,e)}}function Qg(n){return n.node.nodeType==1&&n.node.firstChild&&(n.offset==0||n.node.childNodes[n.offset-1].contentEditable=="false")&&(n.offset==n.node.childNodes.length||n.node.childNodes[n.offset].contentEditable=="false")}function Tf(n,e){let t=n.observer.selectionRange;if(!t.focusNode)return null;let i=rf(t.focusNode,t.focusOffset),r=sf(t.focusNode,t.focusOffset),s=i||r;if(r&&i&&r.node!=i.node){let l=Ee.get(r.node);if(!l||l.isText()&&l.text!=r.node.nodeValue)s=r;else if(n.docView.lastCompositionAfterCursor){let a=Ee.get(i.node);!a||a.isText()&&a.text!=i.node.nodeValue||(s=r)}}if(n.docView.lastCompositionAfterCursor=s!=i,!s)return null;let o=e-s.offset;return{from:o,to:o+s.node.nodeValue.length,node:s.node}}function Jg(n,e,t){let i=Tf(n,t);if(!i)return null;let{node:r,from:s,to:o}=i,l=r.nodeValue;if(/[\n\r]/.test(l)||n.state.doc.sliceString(i.from,i.to)!=l)return null;let a=e.invertedDesc;return{range:new kt(a.mapPos(s),a.mapPos(o),s,o),text:r}}function Zg(n,e){return n.nodeType!=1?0:(e&&n.childNodes[e-1].contentEditable=="false"?1:0)|(e<n.childNodes.length&&n.childNodes[e].contentEditable=="false"?2:0)}let e1=class{constructor(){this.changes=[]}compareRange(e,t){gi(e,t,this.changes)}comparePoint(e,t){gi(e,t,this.changes)}boundChange(e){gi(e,e,this.changes)}};function t1(n,e,t){let i=new e1;return pe.compare(n,e,t,i),i.changes}class n1{constructor(){this.changes=[]}compareRange(e,t){gi(e,t,this.changes)}comparePoint(){}boundChange(e){gi(e,e,this.changes)}}function i1(n,e,t){let i=new n1;return pe.compare(n,e,t,i),i.changes}function r1(n,e){for(let t=n;t&&t!=e;t=t.assignedSlot||t.parentNode)if(t.nodeType==1&&t.contentEditable=="false")return!0;return!1}function s1(n,e){let t=!1;return e&&n.iterChangedRanges((i,r)=>{i<e.to&&r>e.from&&(t=!0)}),t}class fo extends Ns{constructor(e){super(),this.height=e}toDOM(){let e=document.createElement("div");return e.className="cm-gap",this.updateDOM(e),e}eq(e){return e.height==this.height}updateDOM(e){return e.style.height=this.height+"px",!0}get editable(){return!0}get estimatedHeight(){return this.height}ignoreEvent(){return!1}}function o1(n,e,t=1){let i=n.charCategorizer(e),r=n.doc.lineAt(e),s=e-r.from;if(r.length==0)return L.cursor(e);s==0?t=1:s==r.length&&(t=-1);let o=s,l=s;t<0?o=Xe(r.text,s,!1):l=Xe(r.text,s);let a=i(r.text.slice(o,l));for(;o>0;){let u=Xe(r.text,o,!1);if(i(r.text.slice(u,o))!=a)break;o=u}for(;l<r.length;){let u=Xe(r.text,l);if(i(r.text.slice(l,u))!=a)break;l=u}return L.range(o+r.from,l+r.from)}function l1(n,e,t,i,r){let s=Math.round((i-e.left)*n.defaultCharacterWidth);if(n.lineWrapping&&t.height>n.defaultLineHeight*1.5){let l=n.viewState.heightOracle.textHeight,a=Math.floor((r-t.top-(n.defaultLineHeight-l)*.5)/l);s+=a*n.viewState.heightOracle.lineLength}let o=n.state.sliceDoc(t.from,t.to);return t.from+mg(o,s,n.state.tabSize)}function kl(n,e,t){let i=n.lineBlockAt(e);if(Array.isArray(i.type)){let r;for(let s of i.type){if(s.from>e)break;if(!(s.to<e)){if(s.from<e&&s.to>e)return s;(!r||s.type==We.Text&&(r.type!=s.type||(t<0?s.from<e:s.to>e)))&&(r=s)}}return r||i}return i}function a1(n,e,t,i){let r=kl(n,e.head,e.assoc||-1),s=!i||r.type!=We.Text||!(n.lineWrapping||r.widgetLineBreaks)?null:n.coordsAtPos(e.assoc<0&&e.head>r.from?e.head-1:e.head);if(s){let o=n.dom.getBoundingClientRect(),l=n.textDirectionAt(r.from),a=n.posAtCoords({x:t==(l==Ae.LTR)?o.right-1:o.left+1,y:(s.top+s.bottom)/2});if(a!=null)return L.cursor(a,t?-1:1)}return L.cursor(t?r.to:r.from,t?-1:1)}function Lu(n,e,t,i){let r=n.state.doc.lineAt(e.head),s=n.bidiSpans(r),o=n.textDirectionAt(r.from);for(let l=e,a=null;;){let u=Rg(r,s,o,l,t),c=cf;if(!u){if(r.number==(t?n.state.doc.lines:1))return l;c=`
`,r=n.state.doc.line(r.number+(t?1:-1)),s=n.bidiSpans(r),u=n.visualLineSide(r,!t)}if(a){if(!a(c))return l}else{if(!i)return u;a=i(c)}l=u}}function u1(n,e,t){let i=n.state.charCategorizer(e),r=i(t);return s=>{let o=i(s);return r==an.Space&&(r=o),r==o}}function c1(n,e,t,i){let r=e.head,s=t?1:-1;if(r==(t?n.state.doc.length:0))return L.cursor(r,e.assoc);let o=e.goalColumn,l,a=n.contentDOM.getBoundingClientRect(),u=n.coordsAtPos(r,e.assoc||((e.empty?t:e.head==e.from)?1:-1)),c=n.documentTop;if(u)o==null&&(o=u.left-a.left),l=s<0?u.top:u.bottom;else{let p=n.viewState.lineBlockAt(r);o==null&&(o=Math.min(a.right-a.left,n.defaultCharacterWidth*(r-p.from))),l=(s<0?p.top:p.bottom)+c}let h=a.left+o,f=n.viewState.heightOracle.textHeight>>1,d=i??f;for(let p=0;;p+=f){let m=l+(d+p)*s,b=xl(n,{x:h,y:m},!1,s);if(t?m>a.bottom:m<a.top)return L.cursor(b.pos,b.assoc);let g=n.coordsAtPos(b.pos,b.assoc),_=g?(g.top+g.bottom)/2:0;if(!g||(t?_>l:_<l))return L.cursor(b.pos,b.assoc,void 0,o)}}function ir(n,e,t){for(;;){let i=0;for(let r of n)r.between(e-1,e+1,(s,o,l)=>{if(e>s&&e<o){let a=i||t||(e-s<o-e?-1:1);e=a<0?s:o,i=a}});if(!i)return e}}function Ef(n,e){let t=null;for(let i=0;i<e.ranges.length;i++){let r=e.ranges[i],s=null;if(r.empty){let o=ir(n,r.from,0);o!=r.from&&(s=L.cursor(o,-1))}else{let o=ir(n,r.from,-1),l=ir(n,r.to,1);(o!=r.from||l!=r.to)&&(s=L.range(r.from==r.anchor?o:l,r.from==r.head?o:l))}s&&(t||(t=e.ranges.slice()),t[i]=s)}return t?L.create(t,e.mainIndex):e}function po(n,e,t){let i=ir(n.state.facet(_r).map(r=>r(n)),t.from,e.head>t.from?-1:1);return i==t.from?t:L.cursor(i,i<t.from?1:-1)}class Ut{constructor(e,t){this.pos=e,this.assoc=t}}function xl(n,e,t,i){let r=n.contentDOM.getBoundingClientRect(),s=r.top+n.viewState.paddingTop,{x:o,y:l}=e,a=l-s,u;for(;;){if(a<0)return new Ut(0,1);if(a>n.viewState.docHeight)return new Ut(n.state.doc.length,-1);if(u=n.elementAtHeight(a),i==null)break;if(u.type==We.Text){if(i<0?u.to<n.viewport.from:u.from>n.viewport.to)break;let f=n.docView.coordsAt(i<0?u.from:u.to,i>0?-1:1);if(f&&(i<0?f.top<=a+s:f.bottom>=a+s))break}let h=n.viewState.heightOracle.textHeight/2;a=i>0?u.bottom+h:u.top-h}if(n.viewport.from>=u.to||n.viewport.to<=u.from){if(t)return null;if(u.type==We.Text){let h=l1(n,r,u,o,l);return new Ut(h,h==u.from?1:-1)}}if(u.type!=We.Text)return a<(u.top+u.bottom)/2?new Ut(u.from,1):new Ut(u.to,-1);let c=n.docView.lineAt(u.from,2);return(!c||c.length!=u.length)&&(c=n.docView.lineAt(u.from,-2)),new h1(n,o,l,n.textDirectionAt(u.from)).scanTile(c,u.from)}class h1{constructor(e,t,i,r){this.view=e,this.x=t,this.y=i,this.baseDir=r,this.line=null,this.spans=null}bidiSpansAt(e){return(!this.line||this.line.from>e||this.line.to<e)&&(this.line=this.view.state.doc.lineAt(e),this.spans=this.view.bidiSpans(this.line)),this}baseDirAt(e,t){let{line:i,spans:r}=this.bidiSpansAt(e);return r[jt.find(r,e-i.from,-1,t)].level==this.baseDir}dirAt(e,t){let{line:i,spans:r}=this.bidiSpansAt(e);return r[jt.find(r,e-i.from,-1,t)].dir}bidiIn(e,t){let{spans:i,line:r}=this.bidiSpansAt(e);return i.length>1||i.length&&(i[0].level!=this.baseDir||i[0].to+r.from<t)}scan(e,t){let i=0,r=e.length-1,s=new Set,o=this.bidiIn(e[0],e[r]),l,a,u=-1,c=1e9,h;e:for(;i<r;){let d=r-i,p=i+r>>1;t:if(s.has(p)){let b=i+Math.floor(Math.random()*d);for(let g=0;g<d;g++){if(!s.has(b)){p=b;break t}b++,b==r&&(b=i)}break e}s.add(p);let m=t(p);if(m)for(let b=0;b<m.length;b++){let g=m[b],_=0;if(!(g.width==0&&m.length>1)){if(g.bottom<this.y)(!l||l.bottom<g.bottom)&&(l=g),_=1;else if(g.top>this.y)(!a||a.top>g.top)&&(a=g),_=-1;else{let S=g.left>this.x?this.x-g.left:g.right<this.x?this.x-g.right:0,D=Math.abs(S);D<c&&(u=p,c=D,h=g),S&&(_=S<0==(this.baseDir==Ae.LTR)?-1:1)}_==-1&&(!o||this.baseDirAt(e[p],1))?r=p:_==1&&(!o||this.baseDirAt(e[p+1],-1))&&(i=p+1)}}}if(!h){let d=l&&(!a||this.y-l.bottom<a.top-this.y)?l:a;return this.y=(d.top+d.bottom)/2,this.scan(e,t)}let f=(o?this.dirAt(e[u],1):this.baseDir)==Ae.LTR;return{i:u,after:this.x>(h.left+h.right)/2==f}}scanText(e,t){let i=[];for(let s=0;s<e.length;s=Xe(e.text,s))i.push(t+s);i.push(t+e.length);let r=this.scan(i,s=>{let o=i[s]-t,l=i[s+1]-t;return pr(e.dom,o,l).getClientRects()});return r.after?new Ut(i[r.i+1],-1):new Ut(i[r.i],1)}scanTile(e,t){if(!e.length)return new Ut(t,1);if(e.children.length==1){let l=e.children[0];if(l.isText())return this.scanText(l,t);if(l.isComposite())return this.scanTile(l,t)}let i=[t];for(let l=0,a=t;l<e.children.length;l++)i.push(a+=e.children[l].length);let r=this.scan(i,l=>{let a=e.children[l];return a.flags&48?null:(a.dom.nodeType==1?a.dom:pr(a.dom,0,a.length)).getClientRects()}),s=e.children[r.i],o=i[r.i];return s.isText()?this.scanText(s,o):s.isComposite()?this.scanTile(s,o):r.after?new Ut(i[r.i+1],-1):new Ut(o,1)}}const li="￿";class f1{constructor(e,t){this.points=e,this.view=t,this.text="",this.lineSeparator=t.state.facet(ge.lineSeparator)}append(e){this.text+=e}lineBreak(){this.text+=li}readRange(e,t){if(!e)return this;let i=e.parentNode;for(let r=e;;){this.findPointBefore(i,r);let s=this.text.length;this.readNode(r);let o=Ee.get(r),l=r.nextSibling;if(l==t){o!=null&&o.breakAfter&&!l&&i!=this.view.contentDOM&&this.lineBreak();break}let a=Ee.get(l);(o&&a?o.breakAfter:(o?o.breakAfter:ys(r))||ys(l)&&(r.nodeName!="BR"||o!=null&&o.isWidget())&&this.text.length>s)&&!p1(l,t)&&this.lineBreak(),r=l}return this.findPointBefore(i,t),this}readTextNode(e){let t=e.nodeValue;for(let i of this.points)i.node==e&&(i.pos=this.text.length+Math.min(i.offset,t.length));for(let i=0,r=this.lineSeparator?null:/\r\n?|\n/g;;){let s=-1,o=1,l;if(this.lineSeparator?(s=t.indexOf(this.lineSeparator,i),o=this.lineSeparator.length):(l=r.exec(t))&&(s=l.index,o=l[0].length),this.append(t.slice(i,s<0?t.length:s)),s<0)break;if(this.lineBreak(),o>1)for(let a of this.points)a.node==e&&a.pos>this.text.length&&(a.pos-=o-1);i=s+o}}readNode(e){let t=Ee.get(e),i=t&&t.overrideDOMText;if(i!=null){this.findPointInside(e,i.length);for(let r=i.iter();!r.next().done;)r.lineBreak?this.lineBreak():this.append(r.value)}else e.nodeType==3?this.readTextNode(e):e.nodeName=="BR"?e.nextSibling&&this.lineBreak():e.nodeType==1&&this.readRange(e.firstChild,null)}findPointBefore(e,t){for(let i of this.points)i.node==e&&e.childNodes[i.offset]==t&&(i.pos=this.text.length)}findPointInside(e,t){for(let i of this.points)(e.nodeType==3?i.node==e:e.contains(i.node))&&(i.pos=this.text.length+(d1(e,i.node,i.offset)?t:0))}}function d1(n,e,t){for(;;){if(!e||t<cn(e))return!1;if(e==n)return!0;t=An(e)+1,e=e.parentNode}}function p1(n,e){let t;for(;!(n==e||!n);n=n.nextSibling){let i=Ee.get(n);if(!(i!=null&&i.isWidget()))return!1;i&&(t||(t=[])).push(i)}if(t)for(let i of t){let r=i.overrideDOMText;if(r!=null&&r.length)return!1}return!0}class Bu{constructor(e,t){this.node=e,this.offset=t,this.pos=-1}}class m1{constructor(e,t,i,r){this.typeOver=r,this.bounds=null,this.text="",this.domChanged=t>-1;let{impreciseHead:s,impreciseAnchor:o}=e.docView,l=e.state.selection;if(e.state.readOnly&&t>-1)this.newSel=null;else if(t>-1&&(this.bounds=Mf(e.docView.tile,t,i,0))){let a=s||o?[]:b1(e),u=new f1(a,e);u.readRange(this.bounds.startDOM,this.bounds.endDOM),this.text=u.text,this.newSel=y1(a,this.bounds.from)}else{let a=e.observer.selectionRange,u=s&&s.node==a.focusNode&&s.offset==a.focusOffset||!pl(e.contentDOM,a.focusNode)?l.main.head:e.docView.posFromDOM(a.focusNode,a.focusOffset),c=o&&o.node==a.anchorNode&&o.offset==a.anchorOffset||!pl(e.contentDOM,a.anchorNode)?l.main.anchor:e.docView.posFromDOM(a.anchorNode,a.anchorOffset),h=e.viewport;if(($.ios||$.chrome)&&l.main.empty&&u!=c&&(h.from>0||h.to<e.state.doc.length)){let f=Math.min(u,c),d=Math.max(u,c),p=h.from-f,m=h.to-d;(p==0||p==1||f==0)&&(m==0||m==-1||d==e.state.doc.length)&&(u=0,c=e.state.doc.length)}if(e.inputState.composing>-1&&l.ranges.length>1)this.newSel=l.replaceRange(L.range(c,u));else if(e.lineWrapping&&c==u&&!(l.main.empty&&l.main.head==u)&&e.inputState.lastTouchTime>Date.now()-100){let f=e.coordsAtPos(u,-1),d=0;f&&(d=e.inputState.lastTouchY<=f.bottom?-1:1),this.newSel=L.create([L.cursor(u,d)])}else this.newSel=L.single(c,u)}}}function Mf(n,e,t,i){if(n.isComposite()){let r=-1,s=-1,o=-1,l=-1;for(let a=0,u=i,c=i;a<n.children.length;a++){let h=n.children[a],f=u+h.length;if(u<e&&f>t)return Mf(h,e,t,u);if(f>=e&&r==-1&&(r=a,s=u),u>t&&h.dom.parentNode==n.dom){o=a,l=c;break}c=f,u=f+h.breakAfter}return{from:s,to:l<0?i+n.length:l,startDOM:(r?n.children[r-1].dom.nextSibling:null)||n.dom.firstChild,endDOM:o<n.children.length&&o>=0?n.children[o].dom:null}}else return n.isText()?{from:i,to:i+n.length,startDOM:n.dom,endDOM:n.dom.nextSibling}:null}function Pf(n,e){let t,{newSel:i}=e,{state:r}=n,s=r.selection.main,o=n.inputState.lastKeyTime>Date.now()-100?n.inputState.lastKeyCode:-1;if(e.bounds){let{from:l,to:a}=e.bounds,u=s.from,c=null;(o===8||$.android&&e.text.length<a-l)&&(u=s.to,c="end");let h=r.doc.sliceString(l,a,li),f,d;!s.empty&&s.from>=l&&s.to<=a&&(e.typeOver||h!=e.text)&&h.slice(0,s.from-l)==e.text.slice(0,s.from-l)&&h.slice(s.to-l)==e.text.slice(f=e.text.length-(h.length-(s.to-l)))?t={from:s.from,to:s.to,insert:me.of(e.text.slice(s.from-l,f).split(li))}:(d=Df(h,e.text,u-l,c))&&($.chrome&&o==13&&d.toB==d.from+2&&e.text.slice(d.from,d.toB)==li+li&&d.toB--,t={from:l+d.from,to:l+d.toA,insert:me.of(e.text.slice(d.from,d.toB).split(li))})}else i&&(!n.hasFocus&&r.facet(ln)||Ss(i,s))&&(i=null);if(!t&&!i)return!1;if(($.mac||$.android)&&t&&t.from==t.to&&t.from==s.head-1&&/^\. ?$/.test(t.insert.toString())&&n.contentDOM.getAttribute("autocorrect")=="off"?(i&&t.insert.length==2&&(i=L.single(i.main.anchor-1,i.main.head-1)),t={from:t.from,to:t.to,insert:me.of([t.insert.toString().replace("."," ")])}):r.doc.lineAt(s.from).to<s.to&&n.docView.lineHasWidget(s.to)&&n.inputState.insertingTextAt>Date.now()-50?t={from:s.from,to:s.to,insert:r.toText(n.inputState.insertingText)}:$.chrome&&t&&t.from==t.to&&t.from==s.head&&t.insert.toString()==`
 `&&n.lineWrapping&&(i&&(i=L.single(i.main.anchor-1,i.main.head-1)),t={from:s.from,to:s.to,insert:me.of([" "])}),t)return va(n,t,i,o);if(i&&!Ss(i,s)){let l=!1,a="select";return n.inputState.lastSelectionTime>Date.now()-50&&(n.inputState.lastSelectionOrigin=="select"&&(l=!0),a=n.inputState.lastSelectionOrigin,a=="select.pointer"&&(i=Ef(r.facet(_r).map(u=>u(n)),i))),n.dispatch({selection:i,scrollIntoView:l,userEvent:a}),!0}else return!1}function va(n,e,t,i=-1){if($.ios&&n.inputState.flushIOSKey(e))return!0;let r=n.state.selection.main;if($.android&&(e.to==r.to&&(e.from==r.from||e.from==r.from-1&&n.state.sliceDoc(e.from,r.from)==" ")&&e.insert.length==1&&e.insert.lines==2&&bi(n.contentDOM,"Enter",13)||(e.from==r.from-1&&e.to==r.to&&e.insert.length==0||i==8&&e.insert.length<e.to-e.from&&e.to>r.head)&&bi(n.contentDOM,"Backspace",8)||e.from==r.from&&e.to==r.to+1&&e.insert.length==0&&bi(n.contentDOM,"Delete",46)))return!0;let s=e.insert.toString();n.inputState.composing>=0&&n.inputState.composing++;let o,l=()=>o||(o=g1(n,e,t));return n.state.facet(mf).some(a=>a(n,e.from,e.to,s,l))||n.dispatch(l()),!0}function g1(n,e,t){let i,r=n.state,s=r.selection.main,o=-1;if(e.from==e.to&&e.from<s.from||e.from>s.to){let a=e.from<s.from?-1:1,u=a<0?s.from:s.to,c=ir(r.facet(_r).map(h=>h(n)),u,a);e.from==c&&(o=c)}if(o>-1)i={changes:e,selection:L.cursor(e.from+e.insert.length,-1)};else if(e.from>=s.from&&e.to<=s.to&&e.to-e.from>=(s.to-s.from)/3&&(!t||t.main.empty&&t.main.from==e.from+e.insert.length)&&n.inputState.composing<0){let a=s.from<e.from?r.sliceDoc(s.from,e.from):"",u=s.to>e.to?r.sliceDoc(e.to,s.to):"";i=r.replaceSelection(n.state.toText(a+e.insert.sliceString(0,void 0,n.state.lineBreak)+u))}else{let a=r.changes(e),u=t&&t.main.to<=a.newLength?t.main:void 0;if(r.selection.ranges.length>1&&(n.inputState.composing>=0||n.inputState.compositionPendingChange)&&e.to<=s.to+10&&e.to>=s.to-10){let c=n.state.sliceDoc(e.from,e.to),h,f=t&&Tf(n,t.main.head);if(f){let p=e.insert.length-(e.to-e.from);h={from:f.from,to:f.to-p}}else h=n.state.doc.lineAt(s.head);let d=s.to-e.to;i=r.changeByRange(p=>{if(p.from==s.from&&p.to==s.to)return{changes:a,range:u||p.map(a)};let m=p.to-d,b=m-c.length;if(n.state.sliceDoc(b,m)!=c||m>=h.from&&b<=h.to)return{range:p};let g=r.changes({from:b,to:m,insert:e.insert}),_=p.to-s.to;return{changes:g,range:u?L.range(Math.max(0,u.anchor+_),Math.max(0,u.head+_)):p.map(g)}})}else i={changes:a,selection:u&&r.selection.replaceRange(u)}}let l="input.type";return(n.composing||n.inputState.compositionPendingChange&&n.inputState.compositionEndedAt>Date.now()-50)&&(n.inputState.compositionPendingChange=!1,l+=".compose",n.inputState.compositionFirstChange&&(l+=".start",n.inputState.compositionFirstChange=!1)),r.update(i,{userEvent:l,scrollIntoView:!0})}function Df(n,e,t,i){let r=Math.min(n.length,e.length),s=0;for(;s<r&&n.charCodeAt(s)==e.charCodeAt(s);)s++;if(s==r&&n.length==e.length)return null;let o=n.length,l=e.length;for(;o>0&&l>0&&n.charCodeAt(o-1)==e.charCodeAt(l-1);)o--,l--;if(i=="end"){let a=Math.max(0,s-Math.min(o,l));t-=o+a-s}if(o<s&&n.length<e.length){let a=t<=s&&t>=o?s-t:0;s-=a,l=s+(l-o),o=s}else if(l<s){let a=t<=s&&t>=l?s-t:0;s-=a,o=s+(o-l),l=s}return{from:s,toA:o,toB:l}}function b1(n){let e=[];if(n.root.activeElement!=n.contentDOM)return e;let{anchorNode:t,anchorOffset:i,focusNode:r,focusOffset:s}=n.observer.selectionRange;return t&&(e.push(new Bu(t,i)),(r!=t||s!=i)&&e.push(new Bu(r,s))),e}function y1(n,e){if(n.length==0)return null;let t=n[0].pos,i=n.length==2?n[1].pos:t;return t>-1&&i>-1?L.single(t+e,i+e):null}function Ss(n,e){return e.head==n.main.head&&e.anchor==n.main.anchor}class w1{setSelectionOrigin(e){this.lastSelectionOrigin=e,this.lastSelectionTime=Date.now()}constructor(e){this.view=e,this.lastKeyCode=0,this.lastKeyTime=0,this.lastTouchTime=0,this.lastTouchX=0,this.lastTouchY=0,this.lastFocusTime=0,this.lastScrollTop=0,this.lastScrollLeft=0,this.lastWheelEvent=0,this.pendingIOSKey=void 0,this.tabFocusMode=-1,this.lastSelectionOrigin=null,this.lastSelectionTime=0,this.lastContextMenu=0,this.scrollHandlers=[],this.handlers=Object.create(null),this.composing=-1,this.compositionFirstChange=null,this.compositionEndedAt=0,this.compositionPendingKey=!1,this.compositionPendingChange=!1,this.insertingText="",this.insertingTextAt=0,this.mouseSelection=null,this.draggedContent=null,this.handleEvent=this.handleEvent.bind(this),this.notifiedFocused=e.hasFocus,$.safari&&e.contentDOM.addEventListener("input",()=>null),$.gecko&&B1(e.contentDOM.ownerDocument)}handleEvent(e){!T1(this.view,e)||this.ignoreDuringComposition(e)||e.type=="keydown"&&this.keydown(e)||(this.view.updateState!=0?Promise.resolve().then(()=>this.runHandlers(e.type,e)):this.runHandlers(e.type,e))}runHandlers(e,t){let i=this.handlers[e];if(i){for(let r of i.observers)r(this.view,t);for(let r of i.handlers){if(t.defaultPrevented)break;if(r(this.view,t)){t.preventDefault();break}}}}ensureHandlers(e){let t=k1(e),i=this.handlers,r=this.view.contentDOM;for(let s in t)if(s!="scroll"){let o=!t[s].handlers.length,l=i[s];l&&o!=!l.handlers.length&&(r.removeEventListener(s,this.handleEvent),l=null),l||r.addEventListener(s,this.handleEvent,{passive:o})}for(let s in i)s!="scroll"&&!t[s]&&r.removeEventListener(s,this.handleEvent);this.handlers=t}keydown(e){if(this.lastKeyCode=e.keyCode,this.lastKeyTime=Date.now(),e.keyCode==9&&this.tabFocusMode>-1&&(!this.tabFocusMode||Date.now()<=this.tabFocusMode))return!0;if(this.tabFocusMode>0&&e.keyCode!=27&&Lf.indexOf(e.keyCode)<0&&(this.tabFocusMode=-1),$.android&&$.chrome&&!e.synthetic&&(e.keyCode==13||e.keyCode==8))return this.view.observer.delayAndroidKey(e.key,e.keyCode),!0;let t;return $.ios&&!e.synthetic&&!e.altKey&&!e.metaKey&&!e.shiftKey&&((t=If.find(i=>i.keyCode==e.keyCode))&&!e.ctrlKey||x1.indexOf(e.key)>-1&&e.ctrlKey)?(this.pendingIOSKey=t||e,setTimeout(()=>this.flushIOSKey(),250),!0):(e.keyCode!=229&&this.view.observer.forceFlush(),!1)}flushIOSKey(e){let t=this.pendingIOSKey;return!t||t.key=="Enter"&&e&&e.from<e.to&&/^\S+$/.test(e.insert.toString())?!1:(this.pendingIOSKey=void 0,bi(this.view.contentDOM,t.key,t.keyCode,t instanceof KeyboardEvent?t:void 0))}ignoreDuringComposition(e){return!/^key/.test(e.type)||e.synthetic?!1:this.composing>0?!0:$.safari&&!$.ios&&this.compositionPendingKey&&Date.now()-this.compositionEndedAt<100?(this.compositionPendingKey=!1,!0):!1}startMouseSelection(e){this.mouseSelection&&this.mouseSelection.destroy(),this.mouseSelection=e}update(e){this.view.observer.update(e),this.mouseSelection&&this.mouseSelection.update(e),this.draggedContent&&e.docChanged&&(this.draggedContent=this.draggedContent.map(e.changes)),e.transactions.length&&(this.lastKeyCode=this.lastSelectionTime=0)}destroy(){this.mouseSelection&&this.mouseSelection.destroy()}}function Ou(n,e){return(t,i)=>{try{return e.call(n,i,t)}catch(r){Kt(t.state,r)}}}function k1(n){let e=Object.create(null);function t(i){return e[i]||(e[i]={observers:[],handlers:[]})}for(let i of n){let r=i.spec,s=r&&r.plugin.domEventHandlers,o=r&&r.plugin.domEventObservers;if(s)for(let l in s){let a=s[l];a&&t(l).handlers.push(Ou(i.value,a))}if(o)for(let l in o){let a=o[l];a&&t(l).observers.push(Ou(i.value,a))}}for(let i in It)t(i).handlers.push(It[i]);for(let i in ot)t(i).observers.push(ot[i]);return e}const If=[{key:"Backspace",keyCode:8,inputType:"deleteContentBackward"},{key:"Enter",keyCode:13,inputType:"insertParagraph"},{key:"Enter",keyCode:13,inputType:"insertLineBreak"},{key:"Delete",keyCode:46,inputType:"deleteContentForward"}],x1="dthko",Lf=[16,17,18,20,91,92,224,225],Lr=6;function Br(n){return Math.max(0,n)*.7+8}function v1(n,e){return Math.max(Math.abs(n.clientX-e.clientX),Math.abs(n.clientY-e.clientY))}class S1{constructor(e,t,i,r){this.view=e,this.startEvent=t,this.style=i,this.mustSelect=r,this.scrollSpeed={x:0,y:0},this.scrolling=-1,this.lastEvent=t,this.scrollParents=ef(e.contentDOM),this.atoms=e.state.facet(_r).map(o=>o(e));let s=e.contentDOM.ownerDocument;s.addEventListener("mousemove",this.move=this.move.bind(this)),s.addEventListener("mouseup",this.up=this.up.bind(this)),this.extend=t.shiftKey,this.multiple=e.state.facet(ge.allowMultipleSelections)&&_1(e,t),this.dragging=A1(e,t)&&Rf(t)==1?null:!1}start(e){this.dragging===!1&&this.select(e)}move(e){if(e.buttons==0)return this.destroy();if(this.dragging||this.dragging==null&&v1(this.startEvent,e)<10)return;this.select(this.lastEvent=e);let t=0,i=0,r=0,s=0,o=this.view.win.innerWidth,l=this.view.win.innerHeight;this.scrollParents.x&&({left:r,right:o}=this.scrollParents.x.getBoundingClientRect()),this.scrollParents.y&&({top:s,bottom:l}=this.scrollParents.y.getBoundingClientRect());let a=Cf(this.view);e.clientX-a.left<=r+Lr?t=-Br(r-e.clientX):e.clientX+a.right>=o-Lr&&(t=Br(e.clientX-o)),e.clientY-a.top<=s+Lr?i=-Br(s-e.clientY):e.clientY+a.bottom>=l-Lr&&(i=Br(e.clientY-l)),this.setScrollSpeed(t,i)}up(e){this.dragging==null&&this.select(this.lastEvent),this.dragging||e.preventDefault(),this.destroy()}destroy(){this.setScrollSpeed(0,0);let e=this.view.contentDOM.ownerDocument;e.removeEventListener("mousemove",this.move),e.removeEventListener("mouseup",this.up),this.view.inputState.mouseSelection=this.view.inputState.draggedContent=null}setScrollSpeed(e,t){this.scrollSpeed={x:e,y:t},e||t?this.scrolling<0&&(this.scrolling=setInterval(()=>this.scroll(),50)):this.scrolling>-1&&(clearInterval(this.scrolling),this.scrolling=-1)}scroll(){let{x:e,y:t}=this.scrollSpeed;e&&this.scrollParents.x&&(this.scrollParents.x.scrollLeft+=e,e=0),t&&this.scrollParents.y&&(this.scrollParents.y.scrollTop+=t,t=0),(e||t)&&this.view.win.scrollBy(e,t),this.dragging===!1&&this.select(this.lastEvent)}select(e){let{view:t}=this,i=Ef(this.atoms,this.style.get(e,this.extend,this.multiple));(this.mustSelect||!i.eq(t.state.selection,this.dragging===!1))&&this.view.dispatch({selection:i,userEvent:"select.pointer"}),this.mustSelect=!1}update(e){e.transactions.some(t=>t.isUserEvent("input.type"))?this.destroy():this.style.update(e)&&setTimeout(()=>this.select(this.lastEvent),20)}}function _1(n,e){let t=n.state.facet(hf);return t.length?t[0](e):$.mac?e.metaKey:e.ctrlKey}function C1(n,e){let t=n.state.facet(ff);return t.length?t[0](e):$.mac?!e.altKey:!e.ctrlKey}function A1(n,e){let{main:t}=n.state.selection;if(t.empty)return!1;let i=dr(n.root);if(!i||i.rangeCount==0)return!0;let r=i.getRangeAt(0).getClientRects();for(let s=0;s<r.length;s++){let o=r[s];if(o.left<=e.clientX&&o.right>=e.clientX&&o.top<=e.clientY&&o.bottom>=e.clientY)return!0}return!1}function T1(n,e){if(!e.bubbles)return!0;if(e.defaultPrevented)return!1;for(let t=e.target,i;t!=n.contentDOM;t=t.parentNode)if(!t||t.nodeType==11||(i=Ee.get(t))&&i.isWidget()&&!i.isHidden&&i.widget.ignoreEvent(e))return!1;return!0}const It=Object.create(null),ot=Object.create(null),Bf=$.ie&&$.ie_version<15||$.ios&&$.webkit_version<604;function E1(n){let e=n.dom.parentNode;if(!e)return;let t=e.appendChild(document.createElement("textarea"));t.style.cssText="position: fixed; left: -10000px; top: 10px",t.focus(),setTimeout(()=>{n.focus(),t.remove(),Of(n,t.value)},50)}function Vs(n,e,t){for(let i of n.facet(e))t=i(t,n);return t}function Of(n,e){e=Vs(n.state,ya,e);let{state:t}=n,i,r=1,s=t.toText(e),o=s.lines==t.selection.ranges.length;if(vl!=null&&t.selection.ranges.every(a=>a.empty)&&vl==s.toString()){let a=-1;i=t.changeByRange(u=>{let c=t.doc.lineAt(u.from);if(c.from==a)return{range:u};a=c.from;let h=t.toText((o?s.line(r++).text:e)+t.lineBreak);return{changes:{from:c.from,insert:h},range:L.cursor(u.from+h.length)}})}else o?i=t.changeByRange(a=>{let u=s.line(r++);return{changes:{from:a.from,to:a.to,insert:u.text},range:L.cursor(a.from+u.length)}}):i=t.replaceSelection(s);n.dispatch(i,{userEvent:"input.paste",scrollIntoView:!0})}ot.scroll=n=>{n.inputState.lastScrollTop=n.scrollDOM.scrollTop,n.inputState.lastScrollLeft=n.scrollDOM.scrollLeft};ot.wheel=ot.mousewheel=n=>{n.inputState.lastWheelEvent=Date.now()};It.keydown=(n,e)=>(n.inputState.setSelectionOrigin("select"),e.keyCode==27&&n.inputState.tabFocusMode!=0&&(n.inputState.tabFocusMode=Date.now()+2e3),!1);ot.touchstart=(n,e)=>{let t=n.inputState,i=e.targetTouches[0];t.lastTouchTime=Date.now(),i&&(t.lastTouchX=i.clientX,t.lastTouchY=i.clientY),t.setSelectionOrigin("select.pointer")};ot.touchmove=n=>{n.inputState.setSelectionOrigin("select.pointer")};It.mousedown=(n,e)=>{if(n.observer.flush(),n.inputState.lastTouchTime>Date.now()-2e3)return!1;let t=null;for(let i of n.state.facet(df))if(t=i(n,e),t)break;if(!t&&e.button==0&&(t=P1(n,e)),t){let i=!n.hasFocus;n.inputState.startMouseSelection(new S1(n,e,t,i)),i&&n.observer.ignore(()=>{tf(n.contentDOM);let s=n.root.activeElement;s&&!s.contains(n.contentDOM)&&s.blur()});let r=n.inputState.mouseSelection;if(r)return r.start(e),r.dragging===!1}else n.inputState.setSelectionOrigin("select.pointer");return!1};function Ru(n,e,t,i){if(i==1)return L.cursor(e,t);if(i==2)return o1(n.state,e,t);{let r=n.docView.lineAt(e,t),s=n.state.doc.lineAt(r?r.posAtEnd:e),o=r?r.posAtStart:s.from,l=r?r.posAtEnd:s.to;return l<n.state.doc.length&&l==s.to&&l++,L.range(o,l)}}const M1=$.ie&&$.ie_version<=11;let zu=null,Fu=0,Nu=0;function Rf(n){if(!M1)return n.detail;let e=zu,t=Nu;return zu=n,Nu=Date.now(),Fu=!e||t>Date.now()-400&&Math.abs(e.clientX-n.clientX)<2&&Math.abs(e.clientY-n.clientY)<2?(Fu+1)%3:1}function P1(n,e){let t=n.posAndSideAtCoords({x:e.clientX,y:e.clientY},!1),i=Rf(e),r=n.state.selection;return{update(s){s.docChanged&&(t.pos=s.changes.mapPos(t.pos),r=r.map(s.changes))},get(s,o,l){let a=n.posAndSideAtCoords({x:s.clientX,y:s.clientY},!1),u,c=Ru(n,a.pos,a.assoc,i);if(t.pos!=a.pos&&!o){let h=Ru(n,t.pos,t.assoc,i),f=Math.min(h.from,c.from),d=Math.max(h.to,c.to);c=f<c.from?L.range(f,d,c.assoc):L.range(d,f,c.assoc)}return o?r.replaceRange(r.main.extend(c.from,c.to,c.assoc)):l&&i==1&&r.ranges.length>1&&(u=D1(r,a.pos))?u:l?r.addRange(c):L.create([c])}}}function D1(n,e){for(let t=0;t<n.ranges.length;t++){let{from:i,to:r}=n.ranges[t];if(i<=e&&r>=e)return L.create(n.ranges.slice(0,t).concat(n.ranges.slice(t+1)),n.mainIndex==t?0:n.mainIndex-(n.mainIndex>t?1:0))}return null}It.dragstart=(n,e)=>{let{selection:{main:t}}=n.state;if(e.target.draggable){let r=n.docView.tile.nearest(e.target);if(r&&r.isWidget()){let s=r.posAtStart,o=s+r.length;(s>=t.to||o<=t.from)&&(t=L.range(s,o))}}let{inputState:i}=n;return i.mouseSelection&&(i.mouseSelection.dragging=!0),i.draggedContent=t,e.dataTransfer&&(e.dataTransfer.setData("Text",Vs(n.state,wa,n.state.sliceDoc(t.from,t.to))),e.dataTransfer.effectAllowed="copyMove"),!1};It.dragend=n=>(n.inputState.draggedContent=null,!1);function qu(n,e,t,i){if(t=Vs(n.state,ya,t),!t)return;let r=n.posAtCoords({x:e.clientX,y:e.clientY},!1),{draggedContent:s}=n.inputState,o=i&&s&&C1(n,e)?{from:s.from,to:s.to}:null,l={from:r,insert:t},a=n.state.changes(o?[o,l]:l);n.focus(),n.dispatch({changes:a,selection:{anchor:a.mapPos(r,-1),head:a.mapPos(r,1)},userEvent:o?"move.drop":"input.drop"}),n.inputState.draggedContent=null}It.drop=(n,e)=>{if(!e.dataTransfer)return!1;if(n.state.readOnly)return!0;let t=e.dataTransfer.files;if(t&&t.length){let i=Array(t.length),r=0,s=()=>{++r==t.length&&qu(n,e,i.filter(o=>o!=null).join(n.state.lineBreak),!1)};for(let o=0;o<t.length;o++){let l=new FileReader;l.onerror=s,l.onload=()=>{/[\x00-\x08\x0e-\x1f]{2}/.test(l.result)||(i[o]=l.result),s()},l.readAsText(t[o])}return!0}else{let i=e.dataTransfer.getData("Text");if(i)return qu(n,e,i,!0),!0}return!1};It.paste=(n,e)=>{if(n.state.readOnly)return!0;n.observer.flush();let t=Bf?null:e.clipboardData;return t?(Of(n,t.getData("text/plain")||t.getData("text/uri-list")),!0):(E1(n),!1)};function I1(n,e){let t=n.dom.parentNode;if(!t)return;let i=t.appendChild(document.createElement("textarea"));i.style.cssText="position: fixed; left: -10000px; top: 10px",i.value=e,i.focus(),i.selectionEnd=e.length,i.selectionStart=0,setTimeout(()=>{i.remove(),n.focus()},50)}function L1(n){let e=[],t=[],i=!1;for(let r of n.selection.ranges)r.empty||(e.push(n.sliceDoc(r.from,r.to)),t.push(r));if(!e.length){let r=-1;for(let{from:s}of n.selection.ranges){let o=n.doc.lineAt(s);o.number>r&&(e.push(o.text),t.push({from:o.from,to:Math.min(n.doc.length,o.to+1)})),r=o.number}i=!0}return{text:Vs(n,wa,e.join(n.lineBreak)),ranges:t,linewise:i}}let vl=null;It.copy=It.cut=(n,e)=>{if(!tr(n.contentDOM,n.observer.selectionRange))return!1;let{text:t,ranges:i,linewise:r}=L1(n.state);if(!t&&!r)return!1;vl=r?t:null,e.type=="cut"&&!n.state.readOnly&&n.dispatch({changes:i,scrollIntoView:!0,userEvent:"delete.cut"});let s=Bf?null:e.clipboardData;return s?(s.clearData(),s.setData("text/plain",t),!0):(I1(n,t),!1)};const zf=Dn.define();function Ff(n,e){let t=[];for(let i of n.facet(gf)){let r=i(n,e);r&&t.push(r)}return t.length?n.update({effects:t,annotations:zf.of(!0)}):null}function Nf(n){setTimeout(()=>{let e=n.hasFocus;if(e!=n.inputState.notifiedFocused){let t=Ff(n.state,e);t?n.dispatch(t):n.update([])}},10)}ot.focus=n=>{n.inputState.lastFocusTime=Date.now(),!n.scrollDOM.scrollTop&&(n.inputState.lastScrollTop||n.inputState.lastScrollLeft)&&(n.scrollDOM.scrollTop=n.inputState.lastScrollTop,n.scrollDOM.scrollLeft=n.inputState.lastScrollLeft),Nf(n)};ot.blur=n=>{n.observer.clearSelectionRange(),Nf(n)};ot.compositionstart=ot.compositionupdate=n=>{n.observer.editContext||(n.inputState.compositionFirstChange==null&&(n.inputState.compositionFirstChange=!0),n.inputState.composing<0&&(n.inputState.composing=0))};ot.compositionend=n=>{n.observer.editContext||(n.inputState.composing=-1,n.inputState.compositionEndedAt=Date.now(),n.inputState.compositionPendingKey=!0,n.inputState.compositionPendingChange=n.observer.pendingRecords().length>0,n.inputState.compositionFirstChange=null,$.chrome&&$.android?n.observer.flushSoon():n.inputState.compositionPendingChange?Promise.resolve().then(()=>n.observer.flush()):setTimeout(()=>{n.inputState.composing<0&&n.docView.hasComposition&&n.update([])},50))};ot.contextmenu=n=>{n.inputState.lastContextMenu=Date.now()};It.beforeinput=(n,e)=>{var t,i;if((e.inputType=="insertText"||e.inputType=="insertCompositionText")&&(n.inputState.insertingText=e.data,n.inputState.insertingTextAt=Date.now()),e.inputType=="insertReplacementText"&&n.observer.editContext){let s=(t=e.dataTransfer)===null||t===void 0?void 0:t.getData("text/plain"),o=e.getTargetRanges();if(s&&o.length){let l=o[0],a=n.posAtDOM(l.startContainer,l.startOffset),u=n.posAtDOM(l.endContainer,l.endOffset);return va(n,{from:a,to:u,insert:n.state.toText(s)},null),!0}}let r;if($.chrome&&$.android&&(r=If.find(s=>s.inputType==e.inputType))&&(n.observer.delayAndroidKey(r.key,r.keyCode),r.key=="Backspace"||r.key=="Delete")){let s=((i=window.visualViewport)===null||i===void 0?void 0:i.height)||0;setTimeout(()=>{var o;(((o=window.visualViewport)===null||o===void 0?void 0:o.height)||0)>s+10&&n.hasFocus&&(n.contentDOM.blur(),n.focus())},100)}return $.ios&&e.inputType=="deleteContentForward"&&n.observer.flushSoon(),$.safari&&e.inputType=="insertText"&&n.inputState.composing>=0&&setTimeout(()=>ot.compositionend(n,e),20),!1};const Hu=new Set;function B1(n){Hu.has(n)||(Hu.add(n),n.addEventListener("copy",()=>{}),n.addEventListener("cut",()=>{}))}const $u=["pre-wrap","normal","pre-line","break-spaces"];let _i=!1;function Vu(){_i=!1}class O1{constructor(e){this.lineWrapping=e,this.doc=me.empty,this.heightSamples={},this.lineHeight=14,this.charWidth=7,this.textHeight=14,this.lineLength=30}heightForGap(e,t){let i=this.doc.lineAt(t).number-this.doc.lineAt(e).number+1;return this.lineWrapping&&(i+=Math.max(0,Math.ceil((t-e-i*this.lineLength*.5)/this.lineLength))),this.lineHeight*i}heightForLine(e){return this.lineWrapping?(1+Math.max(0,Math.ceil((e-this.lineLength)/Math.max(1,this.lineLength-5))))*this.lineHeight:this.lineHeight}setDoc(e){return this.doc=e,this}mustRefreshForWrapping(e){return $u.indexOf(e)>-1!=this.lineWrapping}mustRefreshForHeights(e){let t=!1;for(let i=0;i<e.length;i++){let r=e[i];r<0?i++:this.heightSamples[Math.floor(r*10)]||(t=!0,this.heightSamples[Math.floor(r*10)]=!0)}return t}refresh(e,t,i,r,s,o){let l=$u.indexOf(e)>-1,a=Math.abs(t-this.lineHeight)>.3||this.lineWrapping!=l||Math.abs(i-this.charWidth)>.1;if(this.lineWrapping=l,this.lineHeight=t,this.charWidth=i,this.textHeight=r,this.lineLength=s,a){this.heightSamples={};for(let u=0;u<o.length;u++){let c=o[u];c<0?u++:this.heightSamples[Math.floor(c*10)]=!0}}return a}}class R1{constructor(e,t){this.from=e,this.heights=t,this.index=0}get more(){return this.index<this.heights.length}}class Et{constructor(e,t,i,r,s){this.from=e,this.length=t,this.top=i,this.height=r,this._content=s}get type(){return typeof this._content=="number"?We.Text:Array.isArray(this._content)?this._content:this._content.type}get to(){return this.from+this.length}get bottom(){return this.top+this.height}get widget(){return this._content instanceof jn?this._content.widget:null}get widgetLineBreaks(){return typeof this._content=="number"?this._content:0}join(e){let t=(Array.isArray(this._content)?this._content:[this]).concat(Array.isArray(e._content)?e._content:[e]);return new Et(this.from,this.length+e.length,this.top,this.height+e.height,t)}}var Se=(function(n){return n[n.ByPos=0]="ByPos",n[n.ByHeight=1]="ByHeight",n[n.ByPosNoHeight=2]="ByPosNoHeight",n})(Se||(Se={}));const rs=.001;class et{constructor(e,t,i=2){this.length=e,this.height=t,this.flags=i}get outdated(){return(this.flags&2)>0}set outdated(e){this.flags=(e?2:0)|this.flags&-3}setHeight(e){this.height!=e&&(Math.abs(this.height-e)>rs&&(_i=!0),this.height=e)}replace(e,t,i){return et.of(i)}decomposeLeft(e,t){t.push(this)}decomposeRight(e,t){t.push(this)}applyChanges(e,t,i,r){let s=this,o=i.doc;for(let l=r.length-1;l>=0;l--){let{fromA:a,toA:u,fromB:c,toB:h}=r[l],f=s.lineAt(a,Se.ByPosNoHeight,i.setDoc(t),0,0),d=f.to>=u?f:s.lineAt(u,Se.ByPosNoHeight,i,0,0);for(h+=d.to-u,u=d.to;l>0&&f.from<=r[l-1].toA;)a=r[l-1].fromA,c=r[l-1].fromB,l--,a<f.from&&(f=s.lineAt(a,Se.ByPosNoHeight,i,0,0));c+=f.from-a,a=f.from;let p=Sa.build(i.setDoc(o),e,c,h);s=_s(s,s.replace(a,u,p))}return s.updateHeight(i,0)}static empty(){return new ft(0,0,0)}static of(e){if(e.length==1)return e[0];let t=0,i=e.length,r=0,s=0;for(;;)if(t==i)if(r>s*2){let l=e[t-1];l.break?e.splice(--t,1,l.left,null,l.right):e.splice(--t,1,l.left,l.right),i+=1+l.break,r-=l.size}else if(s>r*2){let l=e[i];l.break?e.splice(i,1,l.left,null,l.right):e.splice(i,1,l.left,l.right),i+=2+l.break,s-=l.size}else break;else if(r<s){let l=e[t++];l&&(r+=l.size)}else{let l=e[--i];l&&(s+=l.size)}let o=0;return e[t-1]==null?(o=1,t--):e[t]==null&&(o=1,i++),new F1(et.of(e.slice(0,t)),o,et.of(e.slice(i)))}}function _s(n,e){return n==e?n:(n.constructor!=e.constructor&&(_i=!0),e)}et.prototype.size=1;const z1=Re.replace({});class qf extends et{constructor(e,t,i){super(e,t),this.deco=i,this.spaceAbove=0}mainBlock(e,t){return new Et(t,this.length,e+this.spaceAbove,this.height-this.spaceAbove,this.deco||0)}blockAt(e,t,i,r){return this.spaceAbove&&e<i+this.spaceAbove?new Et(r,0,i,this.spaceAbove,z1):this.mainBlock(i,r)}lineAt(e,t,i,r,s){let o=this.mainBlock(r,s);return this.spaceAbove?this.blockAt(0,i,r,s).join(o):o}forEachLine(e,t,i,r,s,o){e<=s+this.length&&t>=s&&o(this.lineAt(0,Se.ByPos,i,r,s))}setMeasuredHeight(e){let t=e.heights[e.index++];t<0?(this.spaceAbove=-t,t=e.heights[e.index++]):this.spaceAbove=0,this.setHeight(t)}updateHeight(e,t=0,i=!1,r){return r&&r.from<=t&&r.more&&this.setMeasuredHeight(r),this.outdated=!1,this}toString(){return`block(${this.length})`}}class ft extends qf{constructor(e,t,i){super(e,t,null),this.collapsed=0,this.widgetHeight=0,this.breaks=0,this.spaceAbove=i}mainBlock(e,t){return new Et(t,this.length,e+this.spaceAbove,this.height-this.spaceAbove,this.breaks)}replace(e,t,i){let r=i[0];return i.length==1&&(r instanceof ft||r instanceof $e&&r.flags&4)&&Math.abs(this.length-r.length)<10?(r instanceof $e?r=new ft(r.length,this.height,this.spaceAbove):r.height=this.height,this.outdated||(r.outdated=!1),r):et.of(i)}updateHeight(e,t=0,i=!1,r){return r&&r.from<=t&&r.more?this.setMeasuredHeight(r):(i||this.outdated)&&(this.spaceAbove=0,this.setHeight(Math.max(this.widgetHeight,e.heightForLine(this.length-this.collapsed))+this.breaks*e.lineHeight)),this.outdated=!1,this}toString(){return`line(${this.length}${this.collapsed?-this.collapsed:""}${this.widgetHeight?":"+this.widgetHeight:""})`}}class $e extends et{constructor(e){super(e,0)}heightMetrics(e,t){let i=e.doc.lineAt(t).number,r=e.doc.lineAt(t+this.length).number,s=r-i+1,o,l=0;if(e.lineWrapping){let a=Math.min(this.height,e.lineHeight*s);o=a/s,this.length>s+1&&(l=(this.height-a)/(this.length-s-1))}else o=this.height/s;return{firstLine:i,lastLine:r,perLine:o,perChar:l}}blockAt(e,t,i,r){let{firstLine:s,lastLine:o,perLine:l,perChar:a}=this.heightMetrics(t,r);if(t.lineWrapping){let u=r+(e<t.lineHeight?0:Math.round(Math.max(0,Math.min(1,(e-i)/this.height))*this.length)),c=t.doc.lineAt(u),h=l+c.length*a,f=Math.max(i,e-h/2);return new Et(c.from,c.length,f,h,0)}else{let u=Math.max(0,Math.min(o-s,Math.floor((e-i)/l))),{from:c,length:h}=t.doc.line(s+u);return new Et(c,h,i+l*u,l,0)}}lineAt(e,t,i,r,s){if(t==Se.ByHeight)return this.blockAt(e,i,r,s);if(t==Se.ByPosNoHeight){let{from:d,to:p}=i.doc.lineAt(e);return new Et(d,p-d,0,0,0)}let{firstLine:o,perLine:l,perChar:a}=this.heightMetrics(i,s),u=i.doc.lineAt(e),c=l+u.length*a,h=u.number-o,f=r+l*h+a*(u.from-s-h);return new Et(u.from,u.length,Math.max(r,Math.min(f,r+this.height-c)),c,0)}forEachLine(e,t,i,r,s,o){e=Math.max(e,s),t=Math.min(t,s+this.length);let{firstLine:l,perLine:a,perChar:u}=this.heightMetrics(i,s);for(let c=e,h=r;c<=t;){let f=i.doc.lineAt(c);if(c==e){let p=f.number-l;h+=a*p+u*(e-s-p)}let d=a+u*f.length;o(new Et(f.from,f.length,h,d,0)),h+=d,c=f.to+1}}replace(e,t,i){let r=this.length-t;if(r>0){let s=i[i.length-1];s instanceof $e?i[i.length-1]=new $e(s.length+r):i.push(null,new $e(r-1))}if(e>0){let s=i[0];s instanceof $e?i[0]=new $e(e+s.length):i.unshift(new $e(e-1),null)}return et.of(i)}decomposeLeft(e,t){t.push(new $e(e-1),null)}decomposeRight(e,t){t.push(null,new $e(this.length-e-1))}updateHeight(e,t=0,i=!1,r){let s=t+this.length;if(r&&r.from<=t+this.length&&r.more){let o=[],l=Math.max(t,r.from),a=-1;for(r.from>t&&o.push(new $e(r.from-t-1).updateHeight(e,t));l<=s&&r.more;){let c=e.doc.lineAt(l).length;o.length&&o.push(null);let h=r.heights[r.index++],f=0;h<0&&(f=-h,h=r.heights[r.index++]),a==-1?a=h:Math.abs(h-a)>=rs&&(a=-2);let d=new ft(c,h,f);d.outdated=!1,o.push(d),l+=c+1}l<=s&&o.push(null,new $e(s-l).updateHeight(e,l));let u=et.of(o);return(a<0||Math.abs(u.height-this.height)>=rs||Math.abs(a-this.heightMetrics(e,t).perLine)>=rs)&&(_i=!0),_s(this,u)}else(i||this.outdated)&&(this.setHeight(e.heightForGap(t,t+this.length)),this.outdated=!1);return this}toString(){return`gap(${this.length})`}}class F1 extends et{constructor(e,t,i){super(e.length+t+i.length,e.height+i.height,t|(e.outdated||i.outdated?2:0)),this.left=e,this.right=i,this.size=e.size+i.size}get break(){return this.flags&1}blockAt(e,t,i,r){let s=i+this.left.height;return e<s?this.left.blockAt(e,t,i,r):this.right.blockAt(e,t,s,r+this.left.length+this.break)}lineAt(e,t,i,r,s){let o=r+this.left.height,l=s+this.left.length+this.break,a=t==Se.ByHeight?e<o:e<l,u=a?this.left.lineAt(e,t,i,r,s):this.right.lineAt(e,t,i,o,l);if(this.break||(a?u.to<l:u.from>l))return u;let c=t==Se.ByPosNoHeight?Se.ByPosNoHeight:Se.ByPos;return a?u.join(this.right.lineAt(l,c,i,o,l)):this.left.lineAt(l,c,i,r,s).join(u)}forEachLine(e,t,i,r,s,o){let l=r+this.left.height,a=s+this.left.length+this.break;if(this.break)e<a&&this.left.forEachLine(e,t,i,r,s,o),t>=a&&this.right.forEachLine(e,t,i,l,a,o);else{let u=this.lineAt(a,Se.ByPos,i,r,s);e<u.from&&this.left.forEachLine(e,u.from-1,i,r,s,o),u.to>=e&&u.from<=t&&o(u),t>u.to&&this.right.forEachLine(u.to+1,t,i,l,a,o)}}replace(e,t,i){let r=this.left.length+this.break;if(t<r)return this.balanced(this.left.replace(e,t,i),this.right);if(e>this.left.length)return this.balanced(this.left,this.right.replace(e-r,t-r,i));let s=[];e>0&&this.decomposeLeft(e,s);let o=s.length;for(let l of i)s.push(l);if(e>0&&Wu(s,o-1),t<this.length){let l=s.length;this.decomposeRight(t,s),Wu(s,l)}return et.of(s)}decomposeLeft(e,t){let i=this.left.length;if(e<=i)return this.left.decomposeLeft(e,t);t.push(this.left),this.break&&(i++,e>=i&&t.push(null)),e>i&&this.right.decomposeLeft(e-i,t)}decomposeRight(e,t){let i=this.left.length,r=i+this.break;if(e>=r)return this.right.decomposeRight(e-r,t);e<i&&this.left.decomposeRight(e,t),this.break&&e<r&&t.push(null),t.push(this.right)}balanced(e,t){return e.size>2*t.size||t.size>2*e.size?et.of(this.break?[e,null,t]:[e,t]):(this.left=_s(this.left,e),this.right=_s(this.right,t),this.setHeight(e.height+t.height),this.outdated=e.outdated||t.outdated,this.size=e.size+t.size,this.length=e.length+this.break+t.length,this)}updateHeight(e,t=0,i=!1,r){let{left:s,right:o}=this,l=t+s.length+this.break,a=null;return r&&r.from<=t+s.length&&r.more?a=s=s.updateHeight(e,t,i,r):s.updateHeight(e,t,i),r&&r.from<=l+o.length&&r.more?a=o=o.updateHeight(e,l,i,r):o.updateHeight(e,l,i),a?this.balanced(s,o):(this.height=this.left.height+this.right.height,this.outdated=!1,this)}toString(){return this.left+(this.break?" ":"-")+this.right}}function Wu(n,e){let t,i;n[e]==null&&(t=n[e-1])instanceof $e&&(i=n[e+1])instanceof $e&&n.splice(e-1,3,new $e(t.length+1+i.length))}const N1=5;class Sa{constructor(e,t){this.pos=e,this.oracle=t,this.nodes=[],this.lineStart=-1,this.lineEnd=-1,this.covering=null,this.writtenTo=e}get isCovered(){return this.covering&&this.nodes[this.nodes.length-1]==this.covering}span(e,t){if(this.lineStart>-1){let i=Math.min(t,this.lineEnd),r=this.nodes[this.nodes.length-1];r instanceof ft?r.length+=i-this.pos:(i>this.pos||!this.isCovered)&&this.nodes.push(new ft(i-this.pos,-1,0)),this.writtenTo=i,t>i&&(this.nodes.push(null),this.writtenTo++,this.lineStart=-1)}this.pos=t}point(e,t,i){if(e<t||i.heightRelevant){let r=i.widget?i.widget.estimatedHeight:0,s=i.widget?i.widget.lineBreaks:0;r<0&&(r=this.oracle.lineHeight);let o=t-e;i.block?this.addBlock(new qf(o,r,i)):(o||s||r>=N1)&&this.addLineDeco(r,s,o)}else t>e&&this.span(e,t);this.lineEnd>-1&&this.lineEnd<this.pos&&(this.lineEnd=this.oracle.doc.lineAt(this.pos).to)}enterLine(){if(this.lineStart>-1)return;let{from:e,to:t}=this.oracle.doc.lineAt(this.pos);this.lineStart=e,this.lineEnd=t,this.writtenTo<e&&((this.writtenTo<e-1||this.nodes[this.nodes.length-1]==null)&&this.nodes.push(this.blankContent(this.writtenTo,e-1)),this.nodes.push(null)),this.pos>e&&this.nodes.push(new ft(this.pos-e,-1,0)),this.writtenTo=this.pos}blankContent(e,t){let i=new $e(t-e);return this.oracle.doc.lineAt(e).to==t&&(i.flags|=4),i}ensureLine(){this.enterLine();let e=this.nodes.length?this.nodes[this.nodes.length-1]:null;if(e instanceof ft)return e;let t=new ft(0,-1,0);return this.nodes.push(t),t}addBlock(e){this.enterLine();let t=e.deco;t&&t.startSide>0&&!this.isCovered&&this.ensureLine(),this.nodes.push(e),this.writtenTo=this.pos=this.pos+e.length,t&&t.endSide>0&&(this.covering=e)}addLineDeco(e,t,i){let r=this.ensureLine();r.length+=i,r.collapsed+=i,r.widgetHeight=Math.max(r.widgetHeight,e),r.breaks+=t,this.writtenTo=this.pos=this.pos+i}finish(e){let t=this.nodes.length==0?null:this.nodes[this.nodes.length-1];this.lineStart>-1&&!(t instanceof ft)&&!this.isCovered?this.nodes.push(new ft(0,-1,0)):(this.writtenTo<this.pos||t==null)&&this.nodes.push(this.blankContent(this.writtenTo,this.pos));let i=e;for(let r of this.nodes)r instanceof ft&&r.updateHeight(this.oracle,i),i+=r?r.length:1;return this.nodes}static build(e,t,i,r){let s=new Sa(i,e);return pe.spans(t,i,r,s,0),s.finish(i)}}function q1(n,e,t){let i=new H1;return pe.compare(n,e,t,i,0),i.changes}class H1{constructor(){this.changes=[]}compareRange(){}comparePoint(e,t,i,r){(e<t||i&&i.heightRelevant||r&&r.heightRelevant)&&gi(e,t,this.changes,5)}}function $1(n,e){let t=n.getBoundingClientRect(),i=n.ownerDocument,r=i.defaultView||window,s=Math.max(0,t.left),o=Math.min(r.innerWidth,t.right),l=Math.max(0,t.top),a=Math.min(r.innerHeight,t.bottom);for(let u=n.parentNode;u&&u!=i.body;)if(u.nodeType==1){let c=u,h=window.getComputedStyle(c);if((c.scrollHeight>c.clientHeight||c.scrollWidth>c.clientWidth)&&h.overflow!="visible"){let f=c.getBoundingClientRect();s=Math.max(s,f.left),o=Math.min(o,f.right),l=Math.max(l,f.top),a=Math.min(u==n.parentNode?r.innerHeight:a,f.bottom)}u=h.position=="absolute"||h.position=="fixed"?c.offsetParent:c.parentNode}else if(u.nodeType==11)u=u.host;else break;return{left:s-t.left,right:Math.max(s,o)-t.left,top:l-(t.top+e),bottom:Math.max(l,a)-(t.top+e)}}function V1(n){let e=n.getBoundingClientRect(),t=n.ownerDocument.defaultView||window;return e.left<t.innerWidth&&e.right>0&&e.top<t.innerHeight&&e.bottom>0}function W1(n,e){let t=n.getBoundingClientRect();return{left:0,right:t.right-t.left,top:e,bottom:t.bottom-(t.top+e)}}class mo{constructor(e,t,i,r){this.from=e,this.to=t,this.size=i,this.displaySize=r}static same(e,t){if(e.length!=t.length)return!1;for(let i=0;i<e.length;i++){let r=e[i],s=t[i];if(r.from!=s.from||r.to!=s.to||r.size!=s.size)return!1}return!0}draw(e,t){return Re.replace({widget:new U1(this.displaySize*(t?e.scaleY:e.scaleX),t)}).range(this.from,this.to)}}class U1 extends Ns{constructor(e,t){super(),this.size=e,this.vertical=t}eq(e){return e.size==this.size&&e.vertical==this.vertical}toDOM(){let e=document.createElement("div");return this.vertical?e.style.height=this.size+"px":(e.style.width=this.size+"px",e.style.height="2px",e.style.display="inline-block"),e}get estimatedHeight(){return this.vertical?this.size:-1}}class Uu{constructor(e,t){this.view=e,this.state=t,this.pixelViewport={left:0,right:window.innerWidth,top:0,bottom:0},this.inView=!0,this.paddingTop=0,this.paddingBottom=0,this.contentDOMWidth=0,this.contentDOMHeight=0,this.editorHeight=0,this.editorWidth=0,this.scaleX=1,this.scaleY=1,this.scrollOffset=0,this.scrolledToBottom=!1,this.scrollAnchorPos=0,this.scrollAnchorHeight=-1,this.scaler=ju,this.scrollTarget=null,this.printing=!1,this.mustMeasureContent=!0,this.defaultTextDirection=Ae.LTR,this.visibleRanges=[],this.mustEnforceCursorAssoc=!1;let i=t.facet(ka).some(r=>typeof r!="function"&&r.class=="cm-lineWrapping");this.heightOracle=new O1(i),this.stateDeco=Ku(t),this.heightMap=et.empty().applyChanges(this.stateDeco,me.empty,this.heightOracle.setDoc(t.doc),[new kt(0,0,0,t.doc.length)]);for(let r=0;r<2&&(this.viewport=this.getViewport(0,null),!!this.updateForViewport());r++);this.updateViewportLines(),this.lineGaps=this.ensureLineGaps([]),this.lineGapDeco=Re.set(this.lineGaps.map(r=>r.draw(this,!1))),this.scrollParent=e.scrollDOM,this.computeVisibleRanges()}updateForViewport(){let e=[this.viewport],{main:t}=this.state.selection;for(let i=0;i<=1;i++){let r=i?t.head:t.anchor;if(!e.some(({from:s,to:o})=>r>=s&&r<=o)){let{from:s,to:o}=this.lineBlockAt(r);e.push(new Or(s,o))}}return this.viewports=e.sort((i,r)=>i.from-r.from),this.updateScaler()}updateScaler(){let e=this.scaler;return this.scaler=this.heightMap.height<=7e6?ju:new _a(this.heightOracle,this.heightMap,this.viewports),e.eq(this.scaler)?0:2}updateViewportLines(){this.viewportLines=[],this.heightMap.forEachLine(this.viewport.from,this.viewport.to,this.heightOracle.setDoc(this.state.doc),0,0,e=>{this.viewportLines.push(Qi(e,this.scaler))})}update(e,t=null){this.state=e.state;let i=this.stateDeco;this.stateDeco=Ku(this.state);let r=e.changedRanges,s=kt.extendWithRanges(r,q1(i,this.stateDeco,e?e.changes:ze.empty(this.state.doc.length))),o=this.heightMap.height,l=this.scrolledToBottom?null:this.scrollAnchorAt(this.scrollOffset);Vu(),this.heightMap=this.heightMap.applyChanges(this.stateDeco,e.startState.doc,this.heightOracle.setDoc(this.state.doc),s),(this.heightMap.height!=o||_i)&&(e.flags|=2),l?(this.scrollAnchorPos=e.changes.mapPos(l.from,-1),this.scrollAnchorHeight=l.top):(this.scrollAnchorPos=-1,this.scrollAnchorHeight=o);let a=s.length?this.mapViewport(this.viewport,e.changes):this.viewport;(t&&(t.range.head<a.from||t.range.head>a.to)||!this.viewportIsAppropriate(a))&&(a=this.getViewport(0,t));let u=a.from!=this.viewport.from||a.to!=this.viewport.to;this.viewport=a,e.flags|=this.updateForViewport(),(u||!e.changes.empty||e.flags&2)&&this.updateViewportLines(),(this.lineGaps.length||this.viewport.to-this.viewport.from>4e3)&&this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps,e.changes))),e.flags|=this.computeVisibleRanges(e.changes),t&&(this.scrollTarget=t),!this.mustEnforceCursorAssoc&&(e.selectionSet||e.focusChanged)&&e.view.lineWrapping&&e.state.selection.main.empty&&e.state.selection.main.assoc&&!e.state.facet(yf)&&(this.mustEnforceCursorAssoc=!0)}measure(){let{view:e}=this,t=e.contentDOM,i=window.getComputedStyle(t),r=this.heightOracle,s=i.whiteSpace;this.defaultTextDirection=i.direction=="rtl"?Ae.RTL:Ae.LTR;let o=this.heightOracle.mustRefreshForWrapping(s)||this.mustMeasureContent==="refresh",l=t.getBoundingClientRect(),a=o||this.mustMeasureContent||this.contentDOMHeight!=l.height;this.contentDOMHeight=l.height,this.mustMeasureContent=!1;let u=0,c=0;if(l.width&&l.height){let{scaleX:C,scaleY:k}=Zh(t,l);(C>.005&&Math.abs(this.scaleX-C)>.005||k>.005&&Math.abs(this.scaleY-k)>.005)&&(this.scaleX=C,this.scaleY=k,u|=16,o=a=!0)}let h=(parseInt(i.paddingTop)||0)*this.scaleY,f=(parseInt(i.paddingBottom)||0)*this.scaleY;(this.paddingTop!=h||this.paddingBottom!=f)&&(this.paddingTop=h,this.paddingBottom=f,u|=18),this.editorWidth!=e.scrollDOM.clientWidth&&(r.lineWrapping&&(a=!0),this.editorWidth=e.scrollDOM.clientWidth,u|=16);let d=ef(this.view.contentDOM,!1).y;d!=this.scrollParent&&(this.scrollParent=d,this.scrollAnchorHeight=-1,this.scrollOffset=0);let p=this.getScrollOffset();this.scrollOffset!=p&&(this.scrollAnchorHeight=-1,this.scrollOffset=p),this.scrolledToBottom=nf(this.scrollParent||e.win);let m=(this.printing?W1:$1)(t,this.paddingTop),b=m.top-this.pixelViewport.top,g=m.bottom-this.pixelViewport.bottom;this.pixelViewport=m;let _=this.pixelViewport.bottom>this.pixelViewport.top&&this.pixelViewport.right>this.pixelViewport.left;if(_!=this.inView&&(this.inView=_,_&&(a=!0)),!this.inView&&!this.scrollTarget&&!V1(e.dom))return 0;let S=l.width;if((this.contentDOMWidth!=S||this.editorHeight!=e.scrollDOM.clientHeight)&&(this.contentDOMWidth=l.width,this.editorHeight=e.scrollDOM.clientHeight,u|=16),a){let C=e.docView.measureVisibleLineHeights(this.viewport);if(r.mustRefreshForHeights(C)&&(o=!0),o||r.lineWrapping&&Math.abs(S-this.contentDOMWidth)>r.charWidth){let{lineHeight:k,charWidth:T,textHeight:I}=e.docView.measureTextSize();o=k>0&&r.refresh(s,k,T,I,Math.max(5,S/T),C),o&&(e.docView.minWidth=0,u|=16)}b>0&&g>0?c=Math.max(b,g):b<0&&g<0&&(c=Math.min(b,g)),Vu();for(let k of this.viewports){let T=k.from==this.viewport.from?C:e.docView.measureVisibleLineHeights(k);this.heightMap=(o?et.empty().applyChanges(this.stateDeco,me.empty,this.heightOracle,[new kt(0,0,0,e.state.doc.length)]):this.heightMap).updateHeight(r,0,o,new R1(k.from,T))}_i&&(u|=2)}let D=!this.viewportIsAppropriate(this.viewport,c)||this.scrollTarget&&(this.scrollTarget.range.head<this.viewport.from||this.scrollTarget.range.head>this.viewport.to);return D&&(u&2&&(u|=this.updateScaler()),this.viewport=this.getViewport(c,this.scrollTarget),u|=this.updateForViewport()),(u&2||D)&&this.updateViewportLines(),(this.lineGaps.length||this.viewport.to-this.viewport.from>4e3)&&this.updateLineGaps(this.ensureLineGaps(o?[]:this.lineGaps,e)),u|=this.computeVisibleRanges(),this.mustEnforceCursorAssoc&&(this.mustEnforceCursorAssoc=!1,e.docView.enforceCursorAssoc()),u}get visibleTop(){return this.scaler.fromDOM(this.pixelViewport.top)}get visibleBottom(){return this.scaler.fromDOM(this.pixelViewport.bottom)}getViewport(e,t){let i=.5-Math.max(-.5,Math.min(.5,e/1e3/2)),r=this.heightMap,s=this.heightOracle,{visibleTop:o,visibleBottom:l}=this,a=new Or(r.lineAt(o-i*1e3,Se.ByHeight,s,0,0).from,r.lineAt(l+(1-i)*1e3,Se.ByHeight,s,0,0).to);if(t){let{head:u}=t.range;if(u<a.from||u>a.to){let c=Math.min(this.editorHeight,this.pixelViewport.bottom-this.pixelViewport.top),h=r.lineAt(u,Se.ByPos,s,0,0),f;t.y=="center"?f=(h.top+h.bottom)/2-c/2:t.y=="start"||t.y=="nearest"&&u<a.from?f=h.top:f=h.bottom-c,a=new Or(r.lineAt(f-1e3/2,Se.ByHeight,s,0,0).from,r.lineAt(f+c+1e3/2,Se.ByHeight,s,0,0).to)}}return a}mapViewport(e,t){let i=t.mapPos(e.from,-1),r=t.mapPos(e.to,1);return new Or(this.heightMap.lineAt(i,Se.ByPos,this.heightOracle,0,0).from,this.heightMap.lineAt(r,Se.ByPos,this.heightOracle,0,0).to)}viewportIsAppropriate({from:e,to:t},i=0){if(!this.inView)return!0;let{top:r}=this.heightMap.lineAt(e,Se.ByPos,this.heightOracle,0,0),{bottom:s}=this.heightMap.lineAt(t,Se.ByPos,this.heightOracle,0,0),{visibleTop:o,visibleBottom:l}=this;return(e==0||r<=o-Math.max(10,Math.min(-i,250)))&&(t==this.state.doc.length||s>=l+Math.max(10,Math.min(i,250)))&&r>o-2*1e3&&s<l+2*1e3}mapLineGaps(e,t){if(!e.length||t.empty)return e;let i=[];for(let r of e)t.touchesRange(r.from,r.to)||i.push(new mo(t.mapPos(r.from),t.mapPos(r.to),r.size,r.displaySize));return i}ensureLineGaps(e,t){let i=this.heightOracle.lineWrapping,r=i?1e4:2e3,s=r>>1,o=r<<1;if(this.defaultTextDirection!=Ae.LTR&&!i)return[];let l=[],a=(c,h,f,d)=>{if(h-c<s)return;let p=this.state.selection.main,m=[p.from];p.empty||m.push(p.to);for(let g of m)if(g>c&&g<h){a(c,g-10,f,d),a(g+10,h,f,d);return}let b=K1(e,g=>g.from>=f.from&&g.to<=f.to&&Math.abs(g.from-c)<s&&Math.abs(g.to-h)<s&&!m.some(_=>g.from<_&&g.to>_));if(!b){if(h<f.to&&t&&i&&t.visibleRanges.some(S=>S.from<=h&&S.to>=h)){let S=t.moveToLineBoundary(L.cursor(h),!1,!0).head;S>c&&(h=S)}let g=this.gapSize(f,c,h,d),_=i||g<2e6?g:2e6;b=new mo(c,h,g,_)}l.push(b)},u=c=>{if(c.length<o||c.type!=We.Text)return;let h=j1(c.from,c.to,this.stateDeco);if(h.total<o)return;let f=this.scrollTarget?this.scrollTarget.range.head:null,d,p;if(i){let m=r/this.heightOracle.lineLength*this.heightOracle.lineHeight,b,g;if(f!=null){let _=zr(h,f),S=((this.visibleBottom-this.visibleTop)/2+m)/c.height;b=_-S,g=_+S}else b=(this.visibleTop-c.top-m)/c.height,g=(this.visibleBottom-c.top+m)/c.height;d=Rr(h,b),p=Rr(h,g)}else{let m=h.total*this.heightOracle.charWidth,b=r*this.heightOracle.charWidth,g=0;if(m>2e6)for(let k of e)k.from>=c.from&&k.from<c.to&&k.size!=k.displaySize&&k.from*this.heightOracle.charWidth+g<this.pixelViewport.left&&(g=k.size-k.displaySize);let _=this.pixelViewport.left+g,S=this.pixelViewport.right+g,D,C;if(f!=null){let k=zr(h,f),T=((S-_)/2+b)/m;D=k-T,C=k+T}else D=(_-b)/m,C=(S+b)/m;d=Rr(h,D),p=Rr(h,C)}d>c.from&&a(c.from,d,c,h),p<c.to&&a(p,c.to,c,h)};for(let c of this.viewportLines)Array.isArray(c.type)?c.type.forEach(u):u(c);return l}gapSize(e,t,i,r){let s=zr(r,i)-zr(r,t);return this.heightOracle.lineWrapping?e.height*s:r.total*this.heightOracle.charWidth*s}updateLineGaps(e){mo.same(e,this.lineGaps)||(this.lineGaps=e,this.lineGapDeco=Re.set(e.map(t=>t.draw(this,this.heightOracle.lineWrapping))))}computeVisibleRanges(e){let t=this.stateDeco;this.lineGaps.length&&(t=t.concat(this.lineGapDeco));let i=[];pe.spans(t,this.viewport.from,this.viewport.to,{span(s,o){i.push({from:s,to:o})},point(){}},20);let r=0;if(i.length!=this.visibleRanges.length)r=12;else for(let s=0;s<i.length&&!(r&8);s++){let o=this.visibleRanges[s],l=i[s];(o.from!=l.from||o.to!=l.to)&&(r|=4,e&&e.mapPos(o.from,-1)==l.from&&e.mapPos(o.to,1)==l.to||(r|=8))}return this.visibleRanges=i,r}lineBlockAt(e){return e>=this.viewport.from&&e<=this.viewport.to&&this.viewportLines.find(t=>t.from<=e&&t.to>=e)||Qi(this.heightMap.lineAt(e,Se.ByPos,this.heightOracle,0,0),this.scaler)}lineBlockAtHeight(e){return e>=this.viewportLines[0].top&&e<=this.viewportLines[this.viewportLines.length-1].bottom&&this.viewportLines.find(t=>t.top<=e&&t.bottom>=e)||Qi(this.heightMap.lineAt(this.scaler.fromDOM(e),Se.ByHeight,this.heightOracle,0,0),this.scaler)}getScrollOffset(){return(this.scrollParent==this.view.scrollDOM?this.scrollParent.scrollTop:(this.scrollParent?this.scrollParent.getBoundingClientRect().top:0)-this.view.contentDOM.getBoundingClientRect().top)*this.scaleY}scrollAnchorAt(e){let t=this.lineBlockAtHeight(e+8);return t.from>=this.viewport.from||this.viewportLines[0].top-e>200?t:this.viewportLines[0]}elementAtHeight(e){return Qi(this.heightMap.blockAt(this.scaler.fromDOM(e),this.heightOracle,0,0),this.scaler)}get docHeight(){return this.scaler.toDOM(this.heightMap.height)}get contentHeight(){return this.docHeight+this.paddingTop+this.paddingBottom}}class Or{constructor(e,t){this.from=e,this.to=t}}function j1(n,e,t){let i=[],r=n,s=0;return pe.spans(t,n,e,{span(){},point(o,l){o>r&&(i.push({from:r,to:o}),s+=o-r),r=l}},20),r<e&&(i.push({from:r,to:e}),s+=e-r),{total:s,ranges:i}}function Rr({total:n,ranges:e},t){if(t<=0)return e[0].from;if(t>=1)return e[e.length-1].to;let i=Math.floor(n*t);for(let r=0;;r++){let{from:s,to:o}=e[r],l=o-s;if(i<=l)return s+i;i-=l}}function zr(n,e){let t=0;for(let{from:i,to:r}of n.ranges){if(e<=r){t+=e-i;break}t+=r-i}return t/n.total}function K1(n,e){for(let t of n)if(e(t))return t}const ju={toDOM(n){return n},fromDOM(n){return n},scale:1,eq(n){return n==this}};function Ku(n){let e=n.facet(qs).filter(i=>typeof i!="function"),t=n.facet(xa).filter(i=>typeof i!="function");return t.length&&e.push(pe.join(t)),e}class _a{constructor(e,t,i){let r=0,s=0,o=0;this.viewports=i.map(({from:l,to:a})=>{let u=t.lineAt(l,Se.ByPos,e,0,0).top,c=t.lineAt(a,Se.ByPos,e,0,0).bottom;return r+=c-u,{from:l,to:a,top:u,bottom:c,domTop:0,domBottom:0}}),this.scale=(7e6-r)/(t.height-r);for(let l of this.viewports)l.domTop=o+(l.top-s)*this.scale,o=l.domBottom=l.domTop+(l.bottom-l.top),s=l.bottom}toDOM(e){for(let t=0,i=0,r=0;;t++){let s=t<this.viewports.length?this.viewports[t]:null;if(!s||e<s.top)return r+(e-i)*this.scale;if(e<=s.bottom)return s.domTop+(e-s.top);i=s.bottom,r=s.domBottom}}fromDOM(e){for(let t=0,i=0,r=0;;t++){let s=t<this.viewports.length?this.viewports[t]:null;if(!s||e<s.domTop)return i+(e-r)/this.scale;if(e<=s.domBottom)return s.top+(e-s.domTop);i=s.bottom,r=s.domBottom}}eq(e){return e instanceof _a?this.scale==e.scale&&this.viewports.length==e.viewports.length&&this.viewports.every((t,i)=>t.from==e.viewports[i].from&&t.to==e.viewports[i].to):!1}}function Qi(n,e){if(e.scale==1)return n;let t=e.toDOM(n.top),i=e.toDOM(n.bottom);return new Et(n.from,n.length,t,i-t,Array.isArray(n._content)?n._content.map(r=>Qi(r,e)):n._content)}const Fr=U.define({combine:n=>n.join(" ")}),Sl=U.define({combine:n=>n.indexOf(!0)>-1}),_l=_n.newName(),Hf=_n.newName(),$f=_n.newName(),Vf={"&light":"."+Hf,"&dark":"."+$f};function Cl(n,e,t){return new _n(e,{finish(i){return/&/.test(i)?i.replace(/&\w*/,r=>{if(r=="&")return n;if(!t||!t[r])throw new RangeError(`Unsupported selector: ${r}`);return t[r]}):n+" "+i}})}const X1=Cl("."+_l,{"&":{position:"relative !important",boxSizing:"border-box","&.cm-focused":{outline:"1px dotted #212121"},display:"flex !important",flexDirection:"column"},".cm-scroller":{display:"flex !important",alignItems:"flex-start !important",fontFamily:"monospace",lineHeight:1.4,height:"100%",overflowX:"auto",position:"relative",zIndex:0,overflowAnchor:"none"},".cm-content":{margin:0,flexGrow:2,flexShrink:0,display:"block",whiteSpace:"pre",wordWrap:"normal",boxSizing:"border-box",minHeight:"100%",padding:"4px 0",outline:"none","&[contenteditable=true]":{WebkitUserModify:"read-write-plaintext-only"}},".cm-lineWrapping":{whiteSpace_fallback:"pre-wrap",whiteSpace:"break-spaces",wordBreak:"break-word",overflowWrap:"anywhere",flexShrink:1},"&light .cm-content":{caretColor:"black"},"&dark .cm-content":{caretColor:"white"},".cm-line":{display:"block",padding:"0 2px 0 6px"},".cm-layer":{position:"absolute",left:0,top:0,contain:"size style","& > *":{position:"absolute"}},"&light .cm-selectionBackground":{background:"#d9d9d9"},"&dark .cm-selectionBackground":{background:"#222"},"&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#d7d4f0"},"&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#233"},".cm-cursorLayer":{pointerEvents:"none"},"&.cm-focused > .cm-scroller > .cm-cursorLayer":{animation:"steps(1) cm-blink 1.2s infinite"},"@keyframes cm-blink":{"0%":{},"50%":{opacity:0},"100%":{}},"@keyframes cm-blink2":{"0%":{},"50%":{opacity:0},"100%":{}},".cm-cursor, .cm-dropCursor":{borderLeft:"1.2px solid black",marginLeft:"-0.6px",pointerEvents:"none"},".cm-cursor":{display:"none"},"&dark .cm-cursor":{borderLeftColor:"#ddd"},".cm-selectionHandle":{backgroundColor:"currentColor",width:"1.5px"},".cm-selectionHandle-start::before, .cm-selectionHandle-end::before":{content:'""',backgroundColor:"inherit",borderRadius:"50%",width:"8px",height:"8px",position:"absolute",left:"-3.25px"},".cm-selectionHandle-start::before":{top:"-8px"},".cm-selectionHandle-end::before":{bottom:"-8px"},".cm-dropCursor":{position:"absolute"},"&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor":{display:"block"},".cm-iso":{unicodeBidi:"isolate"},".cm-announced":{position:"fixed",top:"-10000px"},"@media print":{".cm-announced":{display:"none"}},"&light .cm-activeLine":{backgroundColor:"#cceeff44"},"&dark .cm-activeLine":{backgroundColor:"#99eeff33"},"&light .cm-specialChar":{color:"red"},"&dark .cm-specialChar":{color:"#f78"},".cm-gutters":{flexShrink:0,display:"flex",height:"100%",boxSizing:"border-box",zIndex:200},".cm-gutters-before":{insetInlineStart:0},".cm-gutters-after":{insetInlineEnd:0},"&light .cm-gutters":{backgroundColor:"#f5f5f5",color:"#6c6c6c",border:"0px solid #ddd","&.cm-gutters-before":{borderRightWidth:"1px"},"&.cm-gutters-after":{borderLeftWidth:"1px"}},"&dark .cm-gutters":{backgroundColor:"#333338",color:"#ccc"},".cm-gutter":{display:"flex !important",flexDirection:"column",flexShrink:0,boxSizing:"border-box",minHeight:"100%",overflow:"hidden"},".cm-gutterElement":{boxSizing:"border-box"},".cm-lineNumbers .cm-gutterElement":{padding:"0 3px 0 5px",minWidth:"20px",textAlign:"right",whiteSpace:"nowrap"},"&light .cm-activeLineGutter":{backgroundColor:"#e2f2ff"},"&dark .cm-activeLineGutter":{backgroundColor:"#222227"},".cm-panels":{boxSizing:"border-box",position:"sticky",left:0,right:0,zIndex:300},"&light .cm-panels":{backgroundColor:"#f5f5f5",color:"black"},"&light .cm-panels-top":{borderBottom:"1px solid #ddd"},"&light .cm-panels-bottom":{borderTop:"1px solid #ddd"},"&dark .cm-panels":{backgroundColor:"#333338",color:"white"},".cm-dialog":{padding:"2px 19px 4px 6px",position:"relative","& label":{fontSize:"80%"}},".cm-dialog-close":{position:"absolute",top:"3px",right:"4px",backgroundColor:"inherit",border:"none",font:"inherit",fontSize:"14px",padding:"0"},".cm-tab":{display:"inline-block",overflow:"hidden",verticalAlign:"bottom"},".cm-widgetBuffer":{verticalAlign:"text-top",height:"1em",width:0,display:"inline"},".cm-placeholder":{color:"#888",display:"inline-block",verticalAlign:"top",userSelect:"none"},".cm-highlightSpace":{backgroundImage:"radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",backgroundPosition:"center"},".cm-highlightTab":{backgroundImage:`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,backgroundSize:"auto 100%",backgroundPosition:"right 90%",backgroundRepeat:"no-repeat"},".cm-trailingSpace":{backgroundColor:"#ff332255"},".cm-button":{verticalAlign:"middle",color:"inherit",fontSize:"70%",padding:".2em 1em",borderRadius:"1px"},"&light .cm-button":{backgroundImage:"linear-gradient(#eff1f5, #d9d9df)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#b4b4b4, #d0d3d6)"}},"&dark .cm-button":{backgroundImage:"linear-gradient(#393939, #111)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#111, #333)"}},".cm-textfield":{verticalAlign:"middle",color:"inherit",fontSize:"70%",border:"1px solid silver",padding:".2em .5em"},"&light .cm-textfield":{backgroundColor:"white"},"&dark .cm-textfield":{border:"1px solid #555",backgroundColor:"inherit"}},Vf),G1={childList:!0,characterData:!0,subtree:!0,attributes:!0,characterDataOldValue:!0},go=$.ie&&$.ie_version<=11;class Y1{constructor(e){this.view=e,this.active=!1,this.editContext=null,this.selectionRange=new Ag,this.selectionChanged=!1,this.delayedFlush=-1,this.resizeTimeout=-1,this.queue=[],this.delayedAndroidKey=null,this.flushingAndroidKey=-1,this.lastChange=0,this.scrollTargets=[],this.intersection=null,this.resizeScroll=null,this.intersecting=!1,this.gapIntersection=null,this.gaps=[],this.printQuery=null,this.parentCheck=-1,this.dom=e.contentDOM,this.observer=new MutationObserver(t=>{for(let i of t)this.queue.push(i);($.ie&&$.ie_version<=11||$.ios&&e.composing)&&t.some(i=>i.type=="childList"&&i.removedNodes.length||i.type=="characterData"&&i.oldValue.length>i.target.nodeValue.length)?this.flushSoon():this.flush()}),window.EditContext&&$.android&&e.constructor.EDIT_CONTEXT!==!1&&!($.chrome&&$.chrome_version<126)&&(this.editContext=new J1(e),e.state.facet(ln)&&(e.contentDOM.editContext=this.editContext.editContext)),go&&(this.onCharData=t=>{this.queue.push({target:t.target,type:"characterData",oldValue:t.prevValue}),this.flushSoon()}),this.onSelectionChange=this.onSelectionChange.bind(this),this.onResize=this.onResize.bind(this),this.onPrint=this.onPrint.bind(this),this.onScroll=this.onScroll.bind(this),window.matchMedia&&(this.printQuery=window.matchMedia("print")),typeof ResizeObserver=="function"&&(this.resizeScroll=new ResizeObserver(()=>{var t;((t=this.view.docView)===null||t===void 0?void 0:t.lastUpdate)<Date.now()-75&&this.onResize()}),this.resizeScroll.observe(e.scrollDOM)),this.addWindowListeners(this.win=e.win),this.start(),typeof IntersectionObserver=="function"&&(this.intersection=new IntersectionObserver(t=>{this.parentCheck<0&&(this.parentCheck=setTimeout(this.listenForScroll.bind(this),1e3)),t.length>0&&t[t.length-1].intersectionRatio>0!=this.intersecting&&(this.intersecting=!this.intersecting,this.intersecting!=this.view.inView&&this.onScrollChanged(document.createEvent("Event")))},{threshold:[0,.001]}),this.intersection.observe(this.dom),this.gapIntersection=new IntersectionObserver(t=>{t.length>0&&t[t.length-1].intersectionRatio>0&&this.onScrollChanged(document.createEvent("Event"))},{})),this.listenForScroll(),this.readSelectionRange()}onScrollChanged(e){this.view.inputState.runHandlers("scroll",e),this.intersecting&&this.view.measure()}onScroll(e){this.intersecting&&this.flush(!1),this.editContext&&this.view.requestMeasure(this.editContext.measureReq),this.onScrollChanged(e)}onResize(){this.resizeTimeout<0&&(this.resizeTimeout=setTimeout(()=>{this.resizeTimeout=-1,this.view.requestMeasure()},50))}onPrint(e){(e.type=="change"||!e.type)&&!e.matches||(this.view.viewState.printing=!0,this.view.measure(),setTimeout(()=>{this.view.viewState.printing=!1,this.view.requestMeasure()},500))}updateGaps(e){if(this.gapIntersection&&(e.length!=this.gaps.length||this.gaps.some((t,i)=>t!=e[i]))){this.gapIntersection.disconnect();for(let t of e)this.gapIntersection.observe(t);this.gaps=e}}onSelectionChange(e){let t=this.selectionChanged;if(!this.readSelectionRange()||this.delayedAndroidKey)return;let{view:i}=this,r=this.selectionRange;if(i.state.facet(ln)?i.root.activeElement!=this.dom:!tr(this.dom,r))return;let s=r.anchorNode&&i.docView.tile.nearest(r.anchorNode);if(s&&s.isWidget()&&s.widget.ignoreEvent(e)){t||(this.selectionChanged=!1);return}($.ie&&$.ie_version<=11||$.android&&$.chrome)&&!i.state.selection.main.empty&&r.focusNode&&nr(r.focusNode,r.focusOffset,r.anchorNode,r.anchorOffset)?this.flushSoon():this.flush(!1)}readSelectionRange(){let{view:e}=this,t=dr(e.root);if(!t)return!1;let i=$.safari&&e.root.nodeType==11&&e.root.activeElement==this.dom&&Q1(this.view,t)||t;if(!i||this.selectionRange.eq(i))return!1;let r=tr(this.dom,i);return r&&!this.selectionChanged&&e.inputState.lastFocusTime>Date.now()-200&&e.inputState.lastTouchTime<Date.now()-300&&Eg(this.dom,i)?(this.view.inputState.lastFocusTime=0,e.docView.updateSelection(),!1):(this.selectionRange.setRange(i),r&&(this.selectionChanged=!0),!0)}setSelectionRange(e,t){this.selectionRange.set(e.node,e.offset,t.node,t.offset),this.selectionChanged=!1}clearSelectionRange(){this.selectionRange.set(null,0,null,0)}listenForScroll(){this.parentCheck=-1;let e=0,t=null;for(let i=this.dom;i;)if(i.nodeType==1)!t&&e<this.scrollTargets.length&&this.scrollTargets[e]==i?e++:t||(t=this.scrollTargets.slice(0,e)),t&&t.push(i),i=i.assignedSlot||i.parentNode;else if(i.nodeType==11)i=i.host;else break;if(e<this.scrollTargets.length&&!t&&(t=this.scrollTargets.slice(0,e)),t){for(let i of this.scrollTargets)i.removeEventListener("scroll",this.onScroll);for(let i of this.scrollTargets=t)i.addEventListener("scroll",this.onScroll)}}ignore(e){if(!this.active)return e();try{return this.stop(),e()}finally{this.start(),this.clear()}}start(){this.active||(this.observer.observe(this.dom,G1),go&&this.dom.addEventListener("DOMCharacterDataModified",this.onCharData),this.active=!0)}stop(){this.active&&(this.active=!1,this.observer.disconnect(),go&&this.dom.removeEventListener("DOMCharacterDataModified",this.onCharData))}clear(){this.processRecords(),this.queue.length=0,this.selectionChanged=!1}delayAndroidKey(e,t){var i;if(!this.delayedAndroidKey){let r=()=>{let s=this.delayedAndroidKey;s&&(this.clearDelayedAndroidKey(),this.view.inputState.lastKeyCode=s.keyCode,this.view.inputState.lastKeyTime=Date.now(),!this.flush()&&s.force&&bi(this.dom,s.key,s.keyCode))};this.flushingAndroidKey=this.view.win.requestAnimationFrame(r)}(!this.delayedAndroidKey||e=="Enter")&&(this.delayedAndroidKey={key:e,keyCode:t,force:this.lastChange<Date.now()-50||!!(!((i=this.delayedAndroidKey)===null||i===void 0)&&i.force)})}clearDelayedAndroidKey(){this.win.cancelAnimationFrame(this.flushingAndroidKey),this.delayedAndroidKey=null,this.flushingAndroidKey=-1}flushSoon(){this.delayedFlush<0&&(this.delayedFlush=this.view.win.requestAnimationFrame(()=>{this.delayedFlush=-1,this.flush()}))}forceFlush(){this.delayedFlush>=0&&(this.view.win.cancelAnimationFrame(this.delayedFlush),this.delayedFlush=-1),this.flush()}pendingRecords(){for(let e of this.observer.takeRecords())this.queue.push(e);return this.queue}processRecords(){let e=this.pendingRecords();e.length&&(this.queue=[]);let t=-1,i=-1,r=!1;for(let s of e){let o=this.readMutation(s);o&&(o.typeOver&&(r=!0),t==-1?{from:t,to:i}=o:(t=Math.min(o.from,t),i=Math.max(o.to,i)))}return{from:t,to:i,typeOver:r}}readChange(){let{from:e,to:t,typeOver:i}=this.processRecords(),r=this.selectionChanged&&tr(this.dom,this.selectionRange);if(e<0&&!r)return null;e>-1&&(this.lastChange=Date.now()),this.view.inputState.lastFocusTime=0,this.selectionChanged=!1;let s=new m1(this.view,e,t,i);return this.view.docView.domChanged={newSel:s.newSel?s.newSel.main:null},s}flush(e=!0){if(this.delayedFlush>=0||this.delayedAndroidKey)return!1;e&&this.readSelectionRange();let t=this.readChange();if(!t)return this.view.requestMeasure(),!1;let i=this.view.state,r=Pf(this.view,t);return this.view.state==i&&(t.domChanged||t.newSel&&!Ss(this.view.state.selection,t.newSel.main))&&this.view.update([]),r}readMutation(e){let t=this.view.docView.tile.nearest(e.target);if(!t||t.isWidget())return null;if(t.markDirty(e.type=="attributes"),e.type=="childList"){let i=Xu(t,e.previousSibling||e.target.previousSibling,-1),r=Xu(t,e.nextSibling||e.target.nextSibling,1);return{from:i?t.posAfter(i):t.posAtStart,to:r?t.posBefore(r):t.posAtEnd,typeOver:!1}}else return e.type=="characterData"?{from:t.posAtStart,to:t.posAtEnd,typeOver:e.target.nodeValue==e.oldValue}:null}setWindow(e){e!=this.win&&(this.removeWindowListeners(this.win),this.win=e,this.addWindowListeners(this.win))}addWindowListeners(e){e.addEventListener("resize",this.onResize),this.printQuery?this.printQuery.addEventListener?this.printQuery.addEventListener("change",this.onPrint):this.printQuery.addListener(this.onPrint):e.addEventListener("beforeprint",this.onPrint),e.addEventListener("scroll",this.onScroll),e.document.addEventListener("selectionchange",this.onSelectionChange)}removeWindowListeners(e){e.removeEventListener("scroll",this.onScroll),e.removeEventListener("resize",this.onResize),this.printQuery?this.printQuery.removeEventListener?this.printQuery.removeEventListener("change",this.onPrint):this.printQuery.removeListener(this.onPrint):e.removeEventListener("beforeprint",this.onPrint),e.document.removeEventListener("selectionchange",this.onSelectionChange)}update(e){this.editContext&&(this.editContext.update(e),e.startState.facet(ln)!=e.state.facet(ln)&&(e.view.contentDOM.editContext=e.state.facet(ln)?this.editContext.editContext:null))}destroy(){var e,t,i;this.stop(),(e=this.intersection)===null||e===void 0||e.disconnect(),(t=this.gapIntersection)===null||t===void 0||t.disconnect(),(i=this.resizeScroll)===null||i===void 0||i.disconnect();for(let r of this.scrollTargets)r.removeEventListener("scroll",this.onScroll);this.removeWindowListeners(this.win),clearTimeout(this.parentCheck),clearTimeout(this.resizeTimeout),this.win.cancelAnimationFrame(this.delayedFlush),this.win.cancelAnimationFrame(this.flushingAndroidKey),this.editContext&&(this.view.contentDOM.editContext=null,this.editContext.destroy())}}function Xu(n,e,t){for(;e;){let i=Ee.get(e);if(i&&i.parent==n)return i;let r=e.parentNode;e=r!=n.dom?r:t>0?e.nextSibling:e.previousSibling}return null}function Gu(n,e){let t=e.startContainer,i=e.startOffset,r=e.endContainer,s=e.endOffset,o=n.docView.domAtPos(n.state.selection.main.anchor,1);return nr(o.node,o.offset,r,s)&&([t,i,r,s]=[r,s,t,i]),{anchorNode:t,anchorOffset:i,focusNode:r,focusOffset:s}}function Q1(n,e){if(e.getComposedRanges){let r=e.getComposedRanges(n.root)[0];if(r)return Gu(n,r)}let t=null;function i(r){r.preventDefault(),r.stopImmediatePropagation(),t=r.getTargetRanges()[0]}return n.contentDOM.addEventListener("beforeinput",i,!0),n.dom.ownerDocument.execCommand("indent"),n.contentDOM.removeEventListener("beforeinput",i,!0),t?Gu(n,t):null}class J1{constructor(e){this.from=0,this.to=0,this.pendingContextChange=null,this.handlers=Object.create(null),this.composing=null,this.resetRange(e.state);let t=this.editContext=new window.EditContext({text:e.state.doc.sliceString(this.from,this.to),selectionStart:this.toContextPos(Math.max(this.from,Math.min(this.to,e.state.selection.main.anchor))),selectionEnd:this.toContextPos(e.state.selection.main.head)});this.handlers.textupdate=i=>{let r=e.state.selection.main,{anchor:s,head:o}=r,l=this.toEditorPos(i.updateRangeStart),a=this.toEditorPos(i.updateRangeEnd);e.inputState.composing>=0&&!this.composing&&(this.composing={contextBase:i.updateRangeStart,editorBase:l,drifted:!1});let u=a-l>i.text.length;l==this.from&&s<this.from?l=s:a==this.to&&s>this.to&&(a=s);let c=Df(e.state.sliceDoc(l,a),i.text,(u?r.from:r.to)-l,u?"end":null);if(!c){let f=L.single(this.toEditorPos(i.selectionStart),this.toEditorPos(i.selectionEnd));Ss(f,r)||e.dispatch({selection:f,userEvent:"select"});return}let h={from:c.from+l,to:c.toA+l,insert:me.of(i.text.slice(c.from,c.toB).split(`
`))};if(($.mac||$.android)&&h.from==o-1&&/^\. ?$/.test(i.text)&&e.contentDOM.getAttribute("autocorrect")=="off"&&(h={from:l,to:a,insert:me.of([i.text.replace("."," ")])}),this.pendingContextChange=h,!e.state.readOnly){let f=this.to-this.from+(h.to-h.from+h.insert.length);va(e,h,L.single(this.toEditorPos(i.selectionStart,f),this.toEditorPos(i.selectionEnd,f)))}this.pendingContextChange&&(this.revertPending(e.state),this.setSelection(e.state)),h.from<h.to&&!h.insert.length&&e.inputState.composing>=0&&!/[\\p{Alphabetic}\\p{Number}_]/.test(t.text.slice(Math.max(0,i.updateRangeStart-1),Math.min(t.text.length,i.updateRangeStart+1)))&&this.handlers.compositionend(i)},this.handlers.characterboundsupdate=i=>{let r=[],s=null;for(let o=this.toEditorPos(i.rangeStart),l=this.toEditorPos(i.rangeEnd);o<l;o++){let a=e.coordsForChar(o);s=a&&new DOMRect(a.left,a.top,a.right-a.left,a.bottom-a.top)||s||new DOMRect,r.push(s)}t.updateCharacterBounds(i.rangeStart,r)},this.handlers.textformatupdate=i=>{let r=[];for(let s of i.getTextFormats()){let o=s.underlineStyle,l=s.underlineThickness;if(!/none/i.test(o)&&!/none/i.test(l)){let a=this.toEditorPos(s.rangeStart),u=this.toEditorPos(s.rangeEnd);if(a<u){let c=`text-decoration: underline ${/^[a-z]/.test(o)?o+" ":o=="Dashed"?"dashed ":o=="Squiggle"?"wavy ":""}${/thin/i.test(l)?1:2}px`;r.push(Re.mark({attributes:{style:c}}).range(a,u))}}}e.dispatch({effects:kf.of(Re.set(r))})},this.handlers.compositionstart=()=>{e.inputState.composing<0&&(e.inputState.composing=0,e.inputState.compositionFirstChange=!0)},this.handlers.compositionend=()=>{if(e.inputState.composing=-1,e.inputState.compositionFirstChange=null,this.composing){let{drifted:i}=this.composing;this.composing=null,i&&this.reset(e.state)}};for(let i in this.handlers)t.addEventListener(i,this.handlers[i]);this.measureReq={read:i=>{this.editContext.updateControlBounds(i.contentDOM.getBoundingClientRect());let r=dr(i.root);r&&r.rangeCount&&this.editContext.updateSelectionBounds(r.getRangeAt(0).getBoundingClientRect())}}}applyEdits(e){let t=0,i=!1,r=this.pendingContextChange;return e.changes.iterChanges((s,o,l,a,u)=>{if(i)return;let c=u.length-(o-s);if(r&&o>=r.to)if(r.from==s&&r.to==o&&r.insert.eq(u)){r=this.pendingContextChange=null,t+=c,this.to+=c;return}else r=null,this.revertPending(e.state);if(s+=t,o+=t,o<=this.from)this.from+=c,this.to+=c;else if(s<this.to){if(s<this.from||o>this.to||this.to-this.from+u.length>3e4){i=!0;return}this.editContext.updateText(this.toContextPos(s),this.toContextPos(o),u.toString()),this.to+=c}t+=c}),r&&!i&&this.revertPending(e.state),!i}update(e){let t=this.pendingContextChange,i=e.startState.selection.main;this.composing&&(this.composing.drifted||!e.changes.touchesRange(i.from,i.to)&&e.transactions.some(r=>!r.isUserEvent("input.type")&&r.changes.touchesRange(this.from,this.to)))?(this.composing.drifted=!0,this.composing.editorBase=e.changes.mapPos(this.composing.editorBase)):!this.applyEdits(e)||!this.rangeIsValid(e.state)?(this.pendingContextChange=null,this.reset(e.state)):(e.docChanged||e.selectionSet||t)&&this.setSelection(e.state),(e.geometryChanged||e.docChanged||e.selectionSet)&&e.view.requestMeasure(this.measureReq)}resetRange(e){let{head:t}=e.selection.main;this.from=Math.max(0,t-1e4),this.to=Math.min(e.doc.length,t+1e4)}reset(e){this.resetRange(e),this.editContext.updateText(0,this.editContext.text.length,e.doc.sliceString(this.from,this.to)),this.setSelection(e)}revertPending(e){let t=this.pendingContextChange;this.pendingContextChange=null,this.editContext.updateText(this.toContextPos(t.from),this.toContextPos(t.from+t.insert.length),e.doc.sliceString(t.from,t.to))}setSelection(e){let{main:t}=e.selection,i=this.toContextPos(Math.max(this.from,Math.min(this.to,t.anchor))),r=this.toContextPos(t.head);(this.editContext.selectionStart!=i||this.editContext.selectionEnd!=r)&&this.editContext.updateSelection(i,r)}rangeIsValid(e){let{head:t}=e.selection.main;return!(this.from>0&&t-this.from<500||this.to<e.doc.length&&this.to-t<500||this.to-this.from>1e4*3)}toEditorPos(e,t=this.to-this.from){e=Math.min(e,t);let i=this.composing;return i&&i.drifted?i.editorBase+(e-i.contextBase):e+this.from}toContextPos(e){let t=this.composing;return t&&t.drifted?t.contextBase+(e-t.editorBase):e-this.from}destroy(){for(let e in this.handlers)this.editContext.removeEventListener(e,this.handlers[e])}}class G{get state(){return this.viewState.state}get viewport(){return this.viewState.viewport}get visibleRanges(){return this.viewState.visibleRanges}get inView(){return this.viewState.inView}get composing(){return!!this.inputState&&this.inputState.composing>0}get compositionStarted(){return!!this.inputState&&this.inputState.composing>=0}get root(){return this._root}get win(){return this.dom.ownerDocument.defaultView||window}constructor(e={}){var t;this.plugins=[],this.pluginMap=new Map,this.editorAttrs={},this.contentAttrs={},this.bidiCache=[],this.destroyed=!1,this.updateState=2,this.measureScheduled=-1,this.measureRequests=[],this.contentDOM=document.createElement("div"),this.scrollDOM=document.createElement("div"),this.scrollDOM.tabIndex=-1,this.scrollDOM.className="cm-scroller",this.scrollDOM.appendChild(this.contentDOM),this.announceDOM=document.createElement("div"),this.announceDOM.className="cm-announced",this.announceDOM.setAttribute("aria-live","polite"),this.dom=document.createElement("div"),this.dom.appendChild(this.announceDOM),this.dom.appendChild(this.scrollDOM),e.parent&&e.parent.appendChild(this.dom);let{dispatch:i}=e;this.dispatchTransactions=e.dispatchTransactions||i&&(r=>r.forEach(s=>i(s,this)))||(r=>this.update(r)),this.dispatch=this.dispatch.bind(this),this._root=e.root||Tg(e.parent)||document,this.viewState=new Uu(this,e.state||ge.create(e)),e.scrollTo&&e.scrollTo.is(Ir)&&(this.viewState.scrollTarget=e.scrollTo.value.clip(this.viewState.state)),this.plugins=this.state.facet(ci).map(r=>new uo(r));for(let r of this.plugins)r.update(this);this.observer=new Y1(this),this.inputState=new w1(this),this.inputState.ensureHandlers(this.plugins),this.docView=new Iu(this),this.mountStyles(),this.updateAttrs(),this.updateState=0,this.requestMeasure(),!((t=document.fonts)===null||t===void 0)&&t.ready&&document.fonts.ready.then(()=>{this.viewState.mustMeasureContent="refresh",this.requestMeasure()})}dispatch(...e){let t=e.length==1&&e[0]instanceof Fe?e:e.length==1&&Array.isArray(e[0])?e[0]:[this.state.update(...e)];this.dispatchTransactions(t,this)}update(e){if(this.updateState!=0)throw new Error("Calls to EditorView.update are not allowed while an update is in progress");let t=!1,i=!1,r,s=this.state;for(let f of e){if(f.startState!=s)throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");s=f.state}if(this.destroyed){this.viewState.state=s;return}let o=this.hasFocus,l=0,a=null;e.some(f=>f.annotation(zf))?(this.inputState.notifiedFocused=o,l=1):o!=this.inputState.notifiedFocused&&(this.inputState.notifiedFocused=o,a=Ff(s,o),a||(l=1));let u=this.observer.delayedAndroidKey,c=null;if(u?(this.observer.clearDelayedAndroidKey(),c=this.observer.readChange(),(c&&!this.state.doc.eq(s.doc)||!this.state.selection.eq(s.selection))&&(c=null)):this.observer.clear(),s.facet(ge.phrases)!=this.state.facet(ge.phrases))return this.setState(s);r=ks.create(this,s,e),r.flags|=l;let h=this.viewState.scrollTarget;try{this.updateState=2;for(let f of e){if(h&&(h=h.map(f.changes)),f.scrollIntoView){let{main:d}=f.state.selection;h=new yi(d.empty?d:L.cursor(d.head,d.head>d.anchor?-1:1))}for(let d of f.effects)d.is(Ir)&&(h=d.value.clip(this.state))}this.viewState.update(r,h),this.bidiCache=Cs.update(this.bidiCache,r.changes),r.empty||(this.updatePlugins(r),this.inputState.update(r)),t=this.docView.update(r),this.state.facet(Yi)!=this.styleModules&&this.mountStyles(),i=this.updateAttrs(),this.showAnnouncements(e),this.docView.updateSelection(t,e.some(f=>f.isUserEvent("select.pointer")))}finally{this.updateState=0}if(r.startState.facet(Fr)!=r.state.facet(Fr)&&(this.viewState.mustMeasureContent=!0),(t||i||h||this.viewState.mustEnforceCursorAssoc||this.viewState.mustMeasureContent)&&this.requestMeasure(),t&&this.docViewUpdate(),!r.empty)for(let f of this.state.facet(yl))try{f(r)}catch(d){Kt(this.state,d,"update listener")}(a||c)&&Promise.resolve().then(()=>{a&&this.state==a.startState&&this.dispatch(a),c&&!Pf(this,c)&&u.force&&bi(this.contentDOM,u.key,u.keyCode)})}setState(e){if(this.updateState!=0)throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");if(this.destroyed){this.viewState.state=e;return}this.updateState=2;let t=this.hasFocus;try{for(let i of this.plugins)i.destroy(this);this.viewState=new Uu(this,e),this.plugins=e.facet(ci).map(i=>new uo(i)),this.pluginMap.clear();for(let i of this.plugins)i.update(this);this.docView.destroy(),this.docView=new Iu(this),this.inputState.ensureHandlers(this.plugins),this.mountStyles(),this.updateAttrs(),this.bidiCache=[]}finally{this.updateState=0}t&&this.focus(),this.requestMeasure()}updatePlugins(e){let t=e.startState.facet(ci),i=e.state.facet(ci);if(t!=i){let r=[];for(let s of i){let o=t.indexOf(s);if(o<0)r.push(new uo(s));else{let l=this.plugins[o];l.mustUpdate=e,r.push(l)}}for(let s of this.plugins)s.mustUpdate!=e&&s.destroy(this);this.plugins=r,this.pluginMap.clear()}else for(let r of this.plugins)r.mustUpdate=e;for(let r=0;r<this.plugins.length;r++)this.plugins[r].update(this);t!=i&&this.inputState.ensureHandlers(this.plugins)}docViewUpdate(){for(let e of this.plugins){let t=e.value;if(t&&t.docViewUpdate)try{t.docViewUpdate(this)}catch(i){Kt(this.state,i,"doc view update listener")}}}measure(e=!0){if(this.destroyed)return;if(this.measureScheduled>-1&&this.win.cancelAnimationFrame(this.measureScheduled),this.observer.delayedAndroidKey){this.measureScheduled=-1,this.requestMeasure();return}this.measureScheduled=0,e&&this.observer.forceFlush();let t=null,i=this.viewState.scrollParent,r=this.viewState.getScrollOffset(),{scrollAnchorPos:s,scrollAnchorHeight:o}=this.viewState;Math.abs(r-this.viewState.scrollOffset)>1&&(o=-1),this.viewState.scrollAnchorHeight=-1;try{for(let l=0;;l++){if(o<0)if(nf(i||this.win))s=-1,o=this.viewState.heightMap.height;else{let d=this.viewState.scrollAnchorAt(r);s=d.from,o=d.top}this.updateState=1;let a=this.viewState.measure();if(!a&&!this.measureRequests.length&&this.viewState.scrollTarget==null)break;if(l>5){console.warn(this.measureRequests.length?"Measure loop restarted more than 5 times":"Viewport failed to stabilize");break}let u=[];a&4||([this.measureRequests,u]=[u,this.measureRequests]);let c=u.map(d=>{try{return d.read(this)}catch(p){return Kt(this.state,p),Yu}}),h=ks.create(this,this.state,[]),f=!1;h.flags|=a,t?t.flags|=a:t=h,this.updateState=2,h.empty||(this.updatePlugins(h),this.inputState.update(h),this.updateAttrs(),f=this.docView.update(h),f&&this.docViewUpdate());for(let d=0;d<u.length;d++)if(c[d]!=Yu)try{let p=u[d];p.write&&p.write(c[d],this)}catch(p){Kt(this.state,p)}if(f&&this.docView.updateSelection(!0),!h.viewportChanged&&this.measureRequests.length==0){if(this.viewState.editorHeight)if(this.viewState.scrollTarget){this.docView.scrollIntoView(this.viewState.scrollTarget),this.viewState.scrollTarget=null,o=-1;continue}else{let p=((s<0?this.viewState.heightMap.height:this.viewState.lineBlockAt(s).top)-o)/this.scaleY;if((p>1||p<-1)&&(i==this.scrollDOM||this.hasFocus||Math.max(this.inputState.lastWheelEvent,this.inputState.lastTouchTime)>Date.now()-100)){r=r+p,i?i.scrollTop+=p:this.win.scrollBy(0,p),o=-1;continue}}break}}}finally{this.updateState=0,this.measureScheduled=-1}if(t&&!t.empty)for(let l of this.state.facet(yl))l(t)}get themeClasses(){return _l+" "+(this.state.facet(Sl)?$f:Hf)+" "+this.state.facet(Fr)}updateAttrs(){let e=Qu(this,xf,{class:"cm-editor"+(this.hasFocus?" cm-focused ":" ")+this.themeClasses}),t={spellcheck:"false",autocorrect:"off",autocapitalize:"off",writingsuggestions:"false",translate:"no",contenteditable:this.state.facet(ln)?"true":"false",class:"cm-content",style:`${$.tabSize}: ${this.state.tabSize}`,role:"textbox","aria-multiline":"true"};this.state.readOnly&&(t["aria-readonly"]="true"),Qu(this,ka,t);let i=this.observer.ignore(()=>{let r=Au(this.contentDOM,this.contentAttrs,t),s=Au(this.dom,this.editorAttrs,e);return r||s});return this.editorAttrs=e,this.contentAttrs=t,i}showAnnouncements(e){let t=!0;for(let i of e)for(let r of i.effects)if(r.is(G.announce)){t&&(this.announceDOM.textContent=""),t=!1;let s=this.announceDOM.appendChild(document.createElement("div"));s.textContent=r.value}}mountStyles(){this.styleModules=this.state.facet(Yi);let e=this.state.facet(G.cspNonce);_n.mount(this.root,this.styleModules.concat(X1).reverse(),e?{nonce:e}:void 0)}readMeasured(){if(this.updateState==2)throw new Error("Reading the editor layout isn't allowed during an update");this.updateState==0&&this.measureScheduled>-1&&this.measure(!1)}requestMeasure(e){if(this.measureScheduled<0&&(this.measureScheduled=this.win.requestAnimationFrame(()=>this.measure())),e){if(this.measureRequests.indexOf(e)>-1)return;if(e.key!=null){for(let t=0;t<this.measureRequests.length;t++)if(this.measureRequests[t].key===e.key){this.measureRequests[t]=e;return}}this.measureRequests.push(e)}}plugin(e){let t=this.pluginMap.get(e);return(t===void 0||t&&t.plugin!=e)&&this.pluginMap.set(e,t=this.plugins.find(i=>i.plugin==e)||null),t&&t.update(this).value}get documentTop(){return this.contentDOM.getBoundingClientRect().top+this.viewState.paddingTop}get documentPadding(){return{top:this.viewState.paddingTop,bottom:this.viewState.paddingBottom}}get scaleX(){return this.viewState.scaleX}get scaleY(){return this.viewState.scaleY}elementAtHeight(e){return this.readMeasured(),this.viewState.elementAtHeight(e)}lineBlockAtHeight(e){return this.readMeasured(),this.viewState.lineBlockAtHeight(e)}get viewportLineBlocks(){return this.viewState.viewportLines}lineBlockAt(e){return this.viewState.lineBlockAt(e)}get contentHeight(){return this.viewState.contentHeight}moveByChar(e,t,i){return po(this,e,Lu(this,e,t,i))}moveByGroup(e,t){return po(this,e,Lu(this,e,t,i=>u1(this,e.head,i)))}visualLineSide(e,t){let i=this.bidiSpans(e),r=this.textDirectionAt(e.from),s=i[t?i.length-1:0];return L.cursor(s.side(t,r)+e.from,s.forward(!t,r)?1:-1)}moveToLineBoundary(e,t,i=!0){return a1(this,e,t,i)}moveVertically(e,t,i){return po(this,e,c1(this,e,t,i))}domAtPos(e,t=1){return this.docView.domAtPos(e,t)}posAtDOM(e,t=0){return this.docView.posFromDOM(e,t)}posAtCoords(e,t=!0){this.readMeasured();let i=xl(this,e,t);return i&&i.pos}posAndSideAtCoords(e,t=!0){return this.readMeasured(),xl(this,e,t)}coordsAtPos(e,t=1){this.readMeasured();let i=this.docView.coordsAt(e,t);if(!i||i.left==i.right)return i;let r=this.state.doc.lineAt(e),s=this.bidiSpans(r),o=s[jt.find(s,e-r.from,-1,t)];return ws(i,o.dir==Ae.LTR==t>0)}coordsForChar(e){return this.readMeasured(),this.docView.coordsForChar(e)}get defaultCharacterWidth(){return this.viewState.heightOracle.charWidth}get defaultLineHeight(){return this.viewState.heightOracle.lineHeight}get textDirection(){return this.viewState.defaultTextDirection}textDirectionAt(e){return!this.state.facet(bf)||e<this.viewport.from||e>this.viewport.to?this.textDirection:(this.readMeasured(),this.docView.textDirectionAt(e))}get lineWrapping(){return this.viewState.heightOracle.lineWrapping}bidiSpans(e){if(e.length>Z1)return uf(e.length);let t=this.textDirectionAt(e.from),i;for(let s of this.bidiCache)if(s.from==e.from&&s.dir==t&&(s.fresh||af(s.isolates,i=Mu(this,e))))return s.order;i||(i=Mu(this,e));let r=Og(e.text,t,i);return this.bidiCache.push(new Cs(e.from,e.to,t,i,!0,r)),r}get hasFocus(){var e;return(this.dom.ownerDocument.hasFocus()||$.safari&&((e=this.inputState)===null||e===void 0?void 0:e.lastContextMenu)>Date.now()-3e4)&&this.root.activeElement==this.contentDOM}focus(){this.observer.ignore(()=>{tf(this.contentDOM),this.docView.updateSelection()})}setRoot(e){this._root!=e&&(this._root=e,this.observer.setWindow((e.nodeType==9?e:e.ownerDocument).defaultView||window),this.mountStyles())}destroy(){this.root.activeElement==this.contentDOM&&this.contentDOM.blur();for(let e of this.plugins)e.destroy(this);this.plugins=[],this.inputState.destroy(),this.docView.destroy(),this.dom.remove(),this.observer.destroy(),this.measureScheduled>-1&&this.win.cancelAnimationFrame(this.measureScheduled),this.destroyed=!0}static scrollIntoView(e,t={}){return Ir.of(new yi(typeof e=="number"?L.cursor(e):e,t.y,t.x,t.yMargin,t.xMargin))}scrollSnapshot(){let{scrollTop:e,scrollLeft:t}=this.scrollDOM,i=this.viewState.scrollAnchorAt(e);return Ir.of(new yi(L.cursor(i.from),"start","start",i.top-e,t,!0))}setTabFocusMode(e){e==null?this.inputState.tabFocusMode=this.inputState.tabFocusMode<0?0:-1:typeof e=="boolean"?this.inputState.tabFocusMode=e?0:-1:this.inputState.tabFocusMode!=0&&(this.inputState.tabFocusMode=Date.now()+e)}static domEventHandlers(e){return Qt.define(()=>({}),{eventHandlers:e})}static domEventObservers(e){return Qt.define(()=>({}),{eventObservers:e})}static theme(e,t){let i=_n.newName(),r=[Fr.of(i),Yi.of(Cl(`.${i}`,e))];return t&&t.dark&&r.push(Sl.of(!0)),r}static baseTheme(e){return Rs.lowest(Yi.of(Cl("."+_l,e,Vf)))}static findFromDOM(e){var t;let i=e.querySelector(".cm-content"),r=i&&Ee.get(i)||Ee.get(e);return((t=r==null?void 0:r.root)===null||t===void 0?void 0:t.view)||null}}G.styleModule=Yi;G.inputHandler=mf;G.clipboardInputFilter=ya;G.clipboardOutputFilter=wa;G.scrollHandler=wf;G.focusChangeEffect=gf;G.perLineTextDirection=bf;G.exceptionSink=pf;G.updateListener=yl;G.editable=ln;G.mouseSelectionStyle=df;G.dragMovesSelection=ff;G.clickAddsSelectionRange=hf;G.decorations=qs;G.blockWrappers=vf;G.outerDecorations=xa;G.atomicRanges=_r;G.bidiIsolatedRanges=Sf;G.scrollMargins=_f;G.darkTheme=Sl;G.cspNonce=U.define({combine:n=>n.length?n[0]:""});G.contentAttributes=ka;G.editorAttributes=xf;G.lineWrapping=G.contentAttributes.of({class:"cm-lineWrapping"});G.announce=Ie.define();const Z1=4096,Yu={};class Cs{constructor(e,t,i,r,s,o){this.from=e,this.to=t,this.dir=i,this.isolates=r,this.fresh=s,this.order=o}static update(e,t){if(t.empty&&!e.some(s=>s.fresh))return e;let i=[],r=e.length?e[e.length-1].dir:Ae.LTR;for(let s=Math.max(0,e.length-10);s<e.length;s++){let o=e[s];o.dir==r&&!t.touchesRange(o.from,o.to)&&i.push(new Cs(t.mapPos(o.from,1),t.mapPos(o.to,-1),o.dir,o.isolates,!1,o.order))}return i}}function Qu(n,e,t){for(let i=n.state.facet(e),r=i.length-1;r>=0;r--){let s=i[r],o=typeof s=="function"?s(n):s;o&&ma(o,t)}return t}const e0=$.mac?"mac":$.windows?"win":$.linux?"linux":"key";function t0(n,e){const t=n.split(/-(?!$)/);let i=t[t.length-1];i=="Space"&&(i=" ");let r,s,o,l;for(let a=0;a<t.length-1;++a){const u=t[a];if(/^(cmd|meta|m)$/i.test(u))l=!0;else if(/^a(lt)?$/i.test(u))r=!0;else if(/^(c|ctrl|control)$/i.test(u))s=!0;else if(/^s(hift)?$/i.test(u))o=!0;else if(/^mod$/i.test(u))e=="mac"?l=!0:s=!0;else throw new Error("Unrecognized modifier name: "+u)}return r&&(i="Alt-"+i),s&&(i="Ctrl-"+i),l&&(i="Meta-"+i),o&&(i="Shift-"+i),i}function Nr(n,e,t){return e.altKey&&(n="Alt-"+n),e.ctrlKey&&(n="Ctrl-"+n),e.metaKey&&(n="Meta-"+n),t!==!1&&e.shiftKey&&(n="Shift-"+n),n}const n0=Rs.default(G.domEventHandlers({keydown(n,e){return o0(i0(e.state),n,e,"editor")}})),Wf=U.define({enables:n0}),Ju=new WeakMap;function i0(n){let e=n.facet(Wf),t=Ju.get(e);return t||Ju.set(e,t=s0(e.reduce((i,r)=>i.concat(r),[]))),t}let kn=null;const r0=4e3;function s0(n,e=e0){let t=Object.create(null),i=Object.create(null),r=(o,l)=>{let a=i[o];if(a==null)i[o]=l;else if(a!=l)throw new Error("Key binding "+o+" is used both as a regular binding and as a multi-stroke prefix")},s=(o,l,a,u,c)=>{var h,f;let d=t[o]||(t[o]=Object.create(null)),p=l.split(/ (?!$)/).map(g=>t0(g,e));for(let g=1;g<p.length;g++){let _=p.slice(0,g).join(" ");r(_,!0),d[_]||(d[_]={preventDefault:!0,stopPropagation:!1,run:[S=>{let D=kn={view:S,prefix:_,scope:o};return setTimeout(()=>{kn==D&&(kn=null)},r0),!0}]})}let m=p.join(" ");r(m,!1);let b=d[m]||(d[m]={preventDefault:!1,stopPropagation:!1,run:((f=(h=d._any)===null||h===void 0?void 0:h.run)===null||f===void 0?void 0:f.slice())||[]});a&&b.run.push(a),u&&(b.preventDefault=!0),c&&(b.stopPropagation=!0)};for(let o of n){let l=o.scope?o.scope.split(" "):["editor"];if(o.any)for(let u of l){let c=t[u]||(t[u]=Object.create(null));c._any||(c._any={preventDefault:!1,stopPropagation:!1,run:[]});let{any:h}=o;for(let f in c)c[f].run.push(d=>h(d,Al))}let a=o[e]||o.key;if(a)for(let u of l)s(u,a,o.run,o.preventDefault,o.stopPropagation),o.shift&&s(u,"Shift-"+a,o.shift,o.preventDefault,o.stopPropagation)}return t}let Al=null;function o0(n,e,t,i){Al=e;let r=wg(e),s=tg(r,0),o=ng(s)==r.length&&r!=" ",l="",a=!1,u=!1,c=!1;kn&&kn.view==t&&kn.scope==i&&(l=kn.prefix+" ",Lf.indexOf(e.keyCode)<0&&(u=!0,kn=null));let h=new Set,f=b=>{if(b){for(let g of b.run)if(!h.has(g)&&(h.add(g),g(t)))return b.stopPropagation&&(c=!0),!0;b.preventDefault&&(b.stopPropagation&&(c=!0),u=!0)}return!1},d=n[i],p,m;return d&&(f(d[l+Nr(r,e,!o)])?a=!0:o&&(e.altKey||e.metaKey||e.ctrlKey)&&!($.windows&&e.ctrlKey&&e.altKey)&&!($.mac&&e.altKey&&!(e.ctrlKey||e.metaKey))&&(p=Cn[e.keyCode])&&p!=r?(f(d[l+Nr(p,e,!0)])||e.shiftKey&&(m=hr[e.keyCode])!=r&&m!=p&&f(d[l+Nr(m,e,!1)]))&&(a=!0):o&&e.shiftKey&&f(d[l+Nr(r,e,!0)])&&(a=!0),!a&&f(d._any)&&(a=!0)),u&&(a=!0),a&&c&&e.stopPropagation(),Al=null,a}class Vn{constructor(e,t,i,r,s){this.className=e,this.left=t,this.top=i,this.width=r,this.height=s}draw(){let e=document.createElement("div");return e.className=this.className,this.adjust(e),e}update(e,t){return t.className!=this.className?!1:(this.adjust(e),!0)}adjust(e){e.style.left=this.left+"px",e.style.top=this.top+"px",this.width!=null&&(e.style.width=this.width+"px"),e.style.height=this.height+"px"}eq(e){return this.left==e.left&&this.top==e.top&&this.width==e.width&&this.height==e.height&&this.className==e.className}static forRange(e,t,i){if(i.empty){let r=e.coordsAtPos(i.head,i.assoc||1);if(!r)return[];let s=Uf(e);return[new Vn(t,r.left-s.left,r.top-s.top,null,r.bottom-r.top)]}else return l0(e,t,i)}}function Uf(n){let e=n.scrollDOM.getBoundingClientRect();return{left:(n.textDirection==Ae.LTR?e.left:e.right-n.scrollDOM.clientWidth*n.scaleX)-n.scrollDOM.scrollLeft*n.scaleX,top:e.top-n.scrollDOM.scrollTop*n.scaleY}}function Zu(n,e,t,i){let r=n.coordsAtPos(e,t*2);if(!r)return i;let s=n.dom.getBoundingClientRect(),o=(r.top+r.bottom)/2,l=n.posAtCoords({x:s.left+1,y:o}),a=n.posAtCoords({x:s.right-1,y:o});return l==null||a==null?i:{from:Math.max(i.from,Math.min(l,a)),to:Math.min(i.to,Math.max(l,a))}}function l0(n,e,t){if(t.to<=n.viewport.from||t.from>=n.viewport.to)return[];let i=Math.max(t.from,n.viewport.from),r=Math.min(t.to,n.viewport.to),s=n.textDirection==Ae.LTR,o=n.contentDOM,l=o.getBoundingClientRect(),a=Uf(n),u=o.querySelector(".cm-line"),c=u&&window.getComputedStyle(u),h=l.left+(c?parseInt(c.paddingLeft)+Math.min(0,parseInt(c.textIndent)):0),f=l.right-(c?parseInt(c.paddingRight):0),d=kl(n,i,1),p=kl(n,r,-1),m=d.type==We.Text?d:null,b=p.type==We.Text?p:null;if(m&&(n.lineWrapping||d.widgetLineBreaks)&&(m=Zu(n,i,1,m)),b&&(n.lineWrapping||p.widgetLineBreaks)&&(b=Zu(n,r,-1,b)),m&&b&&m.from==b.from&&m.to==b.to)return _(S(t.from,t.to,m));{let C=m?S(t.from,null,m):D(d,!1),k=b?S(null,t.to,b):D(p,!0),T=[];return(m||d).to<(b||p).from-(m&&b?1:0)||d.widgetLineBreaks>1&&C.bottom+n.defaultLineHeight/2<k.top?T.push(g(h,C.bottom,f,k.top)):C.bottom<k.top&&n.elementAtHeight((C.bottom+k.top)/2).type==We.Text&&(C.bottom=k.top=(C.bottom+k.top)/2),_(C).concat(T).concat(_(k))}function g(C,k,T,I){return new Vn(e,C-a.left,k-a.top,Math.max(0,T-C),I-k)}function _({top:C,bottom:k,horizontal:T}){let I=[];for(let P=0;P<T.length;P+=2)I.push(g(T[P],C,T[P+1],k));return I}function S(C,k,T){let I=1e9,P=-1e9,v=[];function M(q,z,j,V,te){let J=n.coordsAtPos(q,q==T.to?-2:2),w=n.coordsAtPos(j,j==T.from?2:-2);!J||!w||(I=Math.min(J.top,w.top,I),P=Math.max(J.bottom,w.bottom,P),te==Ae.LTR?v.push(s&&z?h:J.left,s&&V?f:w.right):v.push(!s&&V?h:w.left,!s&&z?f:J.right))}let x=C??T.from,F=k??T.to;for(let q of n.visibleRanges)if(q.to>x&&q.from<F)for(let z=Math.max(q.from,x),j=Math.min(q.to,F);;){let V=n.state.doc.lineAt(z);for(let te of n.bidiSpans(V)){let J=te.from+V.from,w=te.to+V.from;if(J>=j)break;w>z&&M(Math.max(J,z),C==null&&J<=x,Math.min(w,j),k==null&&w>=F,te.dir)}if(z=V.to+1,z>=j)break}return v.length==0&&M(x,C==null,F,k==null,n.textDirection),{top:I,bottom:P,horizontal:v}}function D(C,k){let T=l.top+(k?C.top:C.bottom);return{top:T,bottom:T,horizontal:[]}}}function a0(n,e){return n.constructor==e.constructor&&n.eq(e)}class u0{constructor(e,t){this.view=e,this.layer=t,this.drawn=[],this.scaleX=1,this.scaleY=1,this.measureReq={read:this.measure.bind(this),write:this.draw.bind(this)},this.dom=e.scrollDOM.appendChild(document.createElement("div")),this.dom.classList.add("cm-layer"),t.above&&this.dom.classList.add("cm-layer-above"),t.class&&this.dom.classList.add(t.class),this.scale(),this.dom.setAttribute("aria-hidden","true"),this.setOrder(e.state),e.requestMeasure(this.measureReq),t.mount&&t.mount(this.dom,e)}update(e){e.startState.facet(ss)!=e.state.facet(ss)&&this.setOrder(e.state),(this.layer.update(e,this.dom)||e.geometryChanged)&&(this.scale(),e.view.requestMeasure(this.measureReq))}docViewUpdate(e){this.layer.updateOnDocViewUpdate!==!1&&e.requestMeasure(this.measureReq)}setOrder(e){let t=0,i=e.facet(ss);for(;t<i.length&&i[t]!=this.layer;)t++;this.dom.style.zIndex=String((this.layer.above?150:-1)-t)}measure(){return this.layer.markers(this.view)}scale(){let{scaleX:e,scaleY:t}=this.view;(e!=this.scaleX||t!=this.scaleY)&&(this.scaleX=e,this.scaleY=t,this.dom.style.transform=`scale(${1/e}, ${1/t})`)}draw(e){if(e.length!=this.drawn.length||e.some((t,i)=>!a0(t,this.drawn[i]))){let t=this.dom.firstChild,i=0;for(let r of e)r.update&&t&&r.constructor&&this.drawn[i].constructor&&r.update(t,this.drawn[i])?(t=t.nextSibling,i++):this.dom.insertBefore(r.draw(),t);for(;t;){let r=t.nextSibling;t.remove(),t=r}this.drawn=e,$.safari&&$.safari_version>=26&&(this.dom.style.display=this.dom.firstChild?"":"none")}}destroy(){this.layer.destroy&&this.layer.destroy(this.dom,this.view),this.dom.remove()}}const ss=U.define();function jf(n){return[Qt.define(e=>new u0(e,n)),ss.of(n)]}const Ci=U.define({combine(n){return fa(n,{cursorBlinkRate:1200,drawRangeCursor:!0,iosSelectionHandles:!0},{cursorBlinkRate:(e,t)=>Math.min(e,t),drawRangeCursor:(e,t)=>e||t})}});function c0(n={}){return[Ci.of(n),h0,f0,d0,yf.of(!0)]}function Kf(n){return n.startState.facet(Ci)!=n.state.facet(Ci)}const h0=jf({above:!0,markers(n){let{state:e}=n,t=e.facet(Ci),i=[];for(let r of e.selection.ranges){let s=r==e.selection.main;if(r.empty||t.drawRangeCursor&&!(s&&$.ios&&t.iosSelectionHandles)){let o=s?"cm-cursor cm-cursor-primary":"cm-cursor cm-cursor-secondary",l=r.empty?r:L.cursor(r.head,r.assoc);for(let a of Vn.forRange(n,o,l))i.push(a)}}return i},update(n,e){n.transactions.some(i=>i.selection)&&(e.style.animationName=e.style.animationName=="cm-blink"?"cm-blink2":"cm-blink");let t=Kf(n);return t&&ec(n.state,e),n.docChanged||n.selectionSet||t},mount(n,e){ec(e.state,n)},class:"cm-cursorLayer"});function ec(n,e){e.style.animationDuration=n.facet(Ci).cursorBlinkRate+"ms"}const f0=jf({above:!1,markers(n){let e=[],{main:t,ranges:i}=n.state.selection;for(let r of i)if(!r.empty)for(let s of Vn.forRange(n,"cm-selectionBackground",r))e.push(s);if($.ios&&!t.empty&&n.state.facet(Ci).iosSelectionHandles){for(let r of Vn.forRange(n,"cm-selectionHandle cm-selectionHandle-start",L.cursor(t.from,1)))e.push(r);for(let r of Vn.forRange(n,"cm-selectionHandle cm-selectionHandle-end",L.cursor(t.to,1)))e.push(r)}return e},update(n,e){return n.docChanged||n.selectionSet||n.viewportChanged||Kf(n)},class:"cm-selectionLayer"}),d0=Rs.highest(G.theme({".cm-line":{"& ::selection, &::selection":{backgroundColor:"transparent !important"},caretColor:"transparent !important"},".cm-content":{caretColor:"transparent !important","& :focus":{caretColor:"initial !important","&::selection, & ::selection":{backgroundColor:"Highlight !important"}}}}));function p0(){return g0}const m0=Re.line({class:"cm-activeLine"}),g0=Qt.fromClass(class{constructor(n){this.decorations=this.getDeco(n)}update(n){(n.docChanged||n.selectionSet)&&(this.decorations=this.getDeco(n.view))}getDeco(n){let e=-1,t=[];for(let i of n.state.selection.ranges){let r=n.lineBlockAt(i.head);r.from>e&&(t.push(m0.range(r.from)),e=r.from)}return Re.set(t)}},{decorations:n=>n.decorations});class Gn extends Un{compare(e){return this==e||this.constructor==e.constructor&&this.eq(e)}eq(e){return!1}destroy(e){}}Gn.prototype.elementClass="";Gn.prototype.toDOM=void 0;Gn.prototype.mapMode=dt.TrackBefore;Gn.prototype.startSide=Gn.prototype.endSide=-1;Gn.prototype.point=!0;const bo=U.define(),b0=U.define(),os=U.define(),tc=U.define({combine:n=>n.some(e=>e)});function y0(n){return[w0]}const w0=Qt.fromClass(class{constructor(n){this.view=n,this.domAfter=null,this.prevViewport=n.viewport,this.dom=document.createElement("div"),this.dom.className="cm-gutters cm-gutters-before",this.dom.setAttribute("aria-hidden","true"),this.dom.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.gutters=n.state.facet(os).map(e=>new ic(n,e)),this.fixed=!n.state.facet(tc);for(let e of this.gutters)e.config.side=="after"?this.getDOMAfter().appendChild(e.dom):this.dom.appendChild(e.dom);this.fixed&&(this.dom.style.position="sticky"),this.syncGutters(!1),n.scrollDOM.insertBefore(this.dom,n.contentDOM)}getDOMAfter(){return this.domAfter||(this.domAfter=document.createElement("div"),this.domAfter.className="cm-gutters cm-gutters-after",this.domAfter.setAttribute("aria-hidden","true"),this.domAfter.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.domAfter.style.position=this.fixed?"sticky":"",this.view.scrollDOM.appendChild(this.domAfter)),this.domAfter}update(n){if(this.updateGutters(n)){let e=this.prevViewport,t=n.view.viewport,i=Math.min(e.to,t.to)-Math.max(e.from,t.from);this.syncGutters(i<(t.to-t.from)*.8)}if(n.geometryChanged){let e=this.view.contentHeight/this.view.scaleY+"px";this.dom.style.minHeight=e,this.domAfter&&(this.domAfter.style.minHeight=e)}this.view.state.facet(tc)!=!this.fixed&&(this.fixed=!this.fixed,this.dom.style.position=this.fixed?"sticky":"",this.domAfter&&(this.domAfter.style.position=this.fixed?"sticky":"")),this.prevViewport=n.view.viewport}syncGutters(n){let e=this.dom.nextSibling;n&&(this.dom.remove(),this.domAfter&&this.domAfter.remove());let t=pe.iter(this.view.state.facet(bo),this.view.viewport.from),i=[],r=this.gutters.map(s=>new k0(s,this.view.viewport,-this.view.documentPadding.top));for(let s of this.view.viewportLineBlocks)if(i.length&&(i=[]),Array.isArray(s.type)){let o=!0;for(let l of s.type)if(l.type==We.Text&&o){Tl(t,i,l.from);for(let a of r)a.line(this.view,l,i);o=!1}else if(l.widget)for(let a of r)a.widget(this.view,l)}else if(s.type==We.Text){Tl(t,i,s.from);for(let o of r)o.line(this.view,s,i)}else if(s.widget)for(let o of r)o.widget(this.view,s);for(let s of r)s.finish();n&&(this.view.scrollDOM.insertBefore(this.dom,e),this.domAfter&&this.view.scrollDOM.appendChild(this.domAfter))}updateGutters(n){let e=n.startState.facet(os),t=n.state.facet(os),i=n.docChanged||n.heightChanged||n.viewportChanged||!pe.eq(n.startState.facet(bo),n.state.facet(bo),n.view.viewport.from,n.view.viewport.to);if(e==t)for(let r of this.gutters)r.update(n)&&(i=!0);else{i=!0;let r=[];for(let s of t){let o=e.indexOf(s);o<0?r.push(new ic(this.view,s)):(this.gutters[o].update(n),r.push(this.gutters[o]))}for(let s of this.gutters)s.dom.remove(),r.indexOf(s)<0&&s.destroy();for(let s of r)s.config.side=="after"?this.getDOMAfter().appendChild(s.dom):this.dom.appendChild(s.dom);this.gutters=r}return i}destroy(){for(let n of this.gutters)n.destroy();this.dom.remove(),this.domAfter&&this.domAfter.remove()}},{provide:n=>G.scrollMargins.of(e=>{let t=e.plugin(n);if(!t||t.gutters.length==0||!t.fixed)return null;let i=t.dom.offsetWidth*e.scaleX,r=t.domAfter?t.domAfter.offsetWidth*e.scaleX:0;return e.textDirection==Ae.LTR?{left:i,right:r}:{right:i,left:r}})});function nc(n){return Array.isArray(n)?n:[n]}function Tl(n,e,t){for(;n.value&&n.from<=t;)n.from==t&&e.push(n.value),n.next()}class k0{constructor(e,t,i){this.gutter=e,this.height=i,this.i=0,this.cursor=pe.iter(e.markers,t.from)}addElement(e,t,i){let{gutter:r}=this,s=(t.top-this.height)/e.scaleY,o=t.height/e.scaleY;if(this.i==r.elements.length){let l=new Xf(e,o,s,i);r.elements.push(l),r.dom.appendChild(l.dom)}else r.elements[this.i].update(e,o,s,i);this.height=t.bottom,this.i++}line(e,t,i){let r=[];Tl(this.cursor,r,t.from),i.length&&(r=r.concat(i));let s=this.gutter.config.lineMarker(e,t,r);s&&r.unshift(s);let o=this.gutter;r.length==0&&!o.config.renderEmptyElements||this.addElement(e,t,r)}widget(e,t){let i=this.gutter.config.widgetMarker(e,t.widget,t),r=i?[i]:null;for(let s of e.state.facet(b0)){let o=s(e,t.widget,t);o&&(r||(r=[])).push(o)}r&&this.addElement(e,t,r)}finish(){let e=this.gutter;for(;e.elements.length>this.i;){let t=e.elements.pop();e.dom.removeChild(t.dom),t.destroy()}}}class ic{constructor(e,t){this.view=e,this.config=t,this.elements=[],this.spacer=null,this.dom=document.createElement("div"),this.dom.className="cm-gutter"+(this.config.class?" "+this.config.class:"");for(let i in t.domEventHandlers)this.dom.addEventListener(i,r=>{let s=r.target,o;if(s!=this.dom&&this.dom.contains(s)){for(;s.parentNode!=this.dom;)s=s.parentNode;let a=s.getBoundingClientRect();o=(a.top+a.bottom)/2}else o=r.clientY;let l=e.lineBlockAtHeight(o-e.documentTop);t.domEventHandlers[i](e,l,r)&&r.preventDefault()});this.markers=nc(t.markers(e)),t.initialSpacer&&(this.spacer=new Xf(e,0,0,[t.initialSpacer(e)]),this.dom.appendChild(this.spacer.dom),this.spacer.dom.style.cssText+="visibility: hidden; pointer-events: none")}update(e){let t=this.markers;if(this.markers=nc(this.config.markers(e.view)),this.spacer&&this.config.updateSpacer){let r=this.config.updateSpacer(this.spacer.markers[0],e);r!=this.spacer.markers[0]&&this.spacer.update(e.view,0,0,[r])}let i=e.view.viewport;return!pe.eq(this.markers,t,i.from,i.to)||(this.config.lineMarkerChange?this.config.lineMarkerChange(e):!1)}destroy(){for(let e of this.elements)e.destroy()}}class Xf{constructor(e,t,i,r){this.height=-1,this.above=0,this.markers=[],this.dom=document.createElement("div"),this.dom.className="cm-gutterElement",this.update(e,t,i,r)}update(e,t,i,r){this.height!=t&&(this.height=t,this.dom.style.height=t+"px"),this.above!=i&&(this.dom.style.marginTop=(this.above=i)?i+"px":""),x0(this.markers,r)||this.setMarkers(e,r)}setMarkers(e,t){let i="cm-gutterElement",r=this.dom.firstChild;for(let s=0,o=0;;){let l=o,a=s<t.length?t[s++]:null,u=!1;if(a){let c=a.elementClass;c&&(i+=" "+c);for(let h=o;h<this.markers.length;h++)if(this.markers[h].compare(a)){l=h,u=!0;break}}else l=this.markers.length;for(;o<l;){let c=this.markers[o++];if(c.toDOM){c.destroy(r);let h=r.nextSibling;r.remove(),r=h}}if(!a)break;a.toDOM&&(u?r=r.nextSibling:this.dom.insertBefore(a.toDOM(e),r)),u&&o++}this.dom.className=i,this.markers=t}destroy(){this.setMarkers(null,[])}}function x0(n,e){if(n.length!=e.length)return!1;for(let t=0;t<n.length;t++)if(!n[t].compare(e[t]))return!1;return!0}const v0=U.define(),S0=U.define(),hi=U.define({combine(n){return fa(n,{formatNumber:String,domEventHandlers:{}},{domEventHandlers(e,t){let i=Object.assign({},e);for(let r in t){let s=i[r],o=t[r];i[r]=s?(l,a,u)=>s(l,a,u)||o(l,a,u):o}return i}})}});class yo extends Gn{constructor(e){super(),this.number=e}eq(e){return this.number==e.number}toDOM(){return document.createTextNode(this.number)}}function wo(n,e){return n.state.facet(hi).formatNumber(e,n.state)}const _0=os.compute([hi],n=>({class:"cm-lineNumbers",renderEmptyElements:!1,markers(e){return e.state.facet(v0)},lineMarker(e,t,i){return i.some(r=>r.toDOM)?null:new yo(wo(e,e.state.doc.lineAt(t.from).number))},widgetMarker:(e,t,i)=>{for(let r of e.state.facet(S0)){let s=r(e,t,i);if(s)return s}return null},lineMarkerChange:e=>e.startState.facet(hi)!=e.state.facet(hi),initialSpacer(e){return new yo(wo(e,rc(e.state.doc.lines)))},updateSpacer(e,t){let i=wo(t.view,rc(t.view.state.doc.lines));return i==e.number?e:new yo(i)},domEventHandlers:n.facet(hi).domEventHandlers,side:"before"}));function C0(n={}){return[hi.of(n),y0(),_0]}function rc(n){let e=9;for(;e<n;)e=e*10+9;return e}const A0=1024;let T0=0;class ko{constructor(e,t){this.from=e,this.to=t}}class fe{constructor(e={}){this.id=T0++,this.perNode=!!e.perNode,this.deserialize=e.deserialize||(()=>{throw new Error("This node type doesn't define a deserialize function")}),this.combine=e.combine||null}add(e){if(this.perNode)throw new RangeError("Can't add per-node props to node types");return typeof e!="function"&&(e=lt.match(e)),t=>{let i=e(t);return i===void 0?null:[this,i]}}}fe.closedBy=new fe({deserialize:n=>n.split(" ")});fe.openedBy=new fe({deserialize:n=>n.split(" ")});fe.group=new fe({deserialize:n=>n.split(" ")});fe.isolate=new fe({deserialize:n=>{if(n&&n!="rtl"&&n!="ltr"&&n!="auto")throw new RangeError("Invalid value for isolate: "+n);return n||"auto"}});fe.contextHash=new fe({perNode:!0});fe.lookAhead=new fe({perNode:!0});fe.mounted=new fe({perNode:!0});class rr{constructor(e,t,i,r=!1){this.tree=e,this.overlay=t,this.parser=i,this.bracketed=r}static get(e){return e&&e.props&&e.props[fe.mounted.id]}}const E0=Object.create(null);class lt{constructor(e,t,i,r=0){this.name=e,this.props=t,this.id=i,this.flags=r}static define(e){let t=e.props&&e.props.length?Object.create(null):E0,i=(e.top?1:0)|(e.skipped?2:0)|(e.error?4:0)|(e.name==null?8:0),r=new lt(e.name||"",t,e.id,i);if(e.props){for(let s of e.props)if(Array.isArray(s)||(s=s(r)),s){if(s[0].perNode)throw new RangeError("Can't store a per-node prop on a node type");t[s[0].id]=s[1]}}return r}prop(e){return this.props[e.id]}get isTop(){return(this.flags&1)>0}get isSkipped(){return(this.flags&2)>0}get isError(){return(this.flags&4)>0}get isAnonymous(){return(this.flags&8)>0}is(e){if(typeof e=="string"){if(this.name==e)return!0;let t=this.prop(fe.group);return t?t.indexOf(e)>-1:!1}return this.id==e}static match(e){let t=Object.create(null);for(let i in e)for(let r of i.split(" "))t[r]=e[i];return i=>{for(let r=i.prop(fe.group),s=-1;s<(r?r.length:0);s++){let o=t[s<0?i.name:r[s]];if(o)return o}}}}lt.none=new lt("",Object.create(null),0,8);class Ca{constructor(e){this.types=e;for(let t=0;t<e.length;t++)if(e[t].id!=t)throw new RangeError("Node type ids should correspond to array positions when creating a node set")}extend(...e){let t=[];for(let i of this.types){let r=null;for(let s of e){let o=s(i);if(o){r||(r=Object.assign({},i.props));let l=o[1],a=o[0];a.combine&&a.id in r&&(l=a.combine(r[a.id],l)),r[a.id]=l}}t.push(r?new lt(i.name,r,i.id,i.flags):i)}return new Ca(t)}}const qr=new WeakMap,sc=new WeakMap;var De;(function(n){n[n.ExcludeBuffers=1]="ExcludeBuffers",n[n.IncludeAnonymous=2]="IncludeAnonymous",n[n.IgnoreMounts=4]="IgnoreMounts",n[n.IgnoreOverlays=8]="IgnoreOverlays",n[n.EnterBracketed=16]="EnterBracketed"})(De||(De={}));class Te{constructor(e,t,i,r,s){if(this.type=e,this.children=t,this.positions=i,this.length=r,this.props=null,s&&s.length){this.props=Object.create(null);for(let[o,l]of s)this.props[typeof o=="number"?o:o.id]=l}}toString(){let e=rr.get(this);if(e&&!e.overlay)return e.tree.toString();let t="";for(let i of this.children){let r=i.toString();r&&(t&&(t+=","),t+=r)}return this.type.name?(/\W/.test(this.type.name)&&!this.type.isError?JSON.stringify(this.type.name):this.type.name)+(t.length?"("+t+")":""):t}cursor(e=0){return new Ml(this.topNode,e)}cursorAt(e,t=0,i=0){let r=qr.get(this)||this.topNode,s=new Ml(r);return s.moveTo(e,t),qr.set(this,s._tree),s}get topNode(){return new vt(this,0,0,null)}resolve(e,t=0){let i=mr(qr.get(this)||this.topNode,e,t,!1);return qr.set(this,i),i}resolveInner(e,t=0){let i=mr(sc.get(this)||this.topNode,e,t,!0);return sc.set(this,i),i}resolveStack(e,t=0){return D0(this,e,t)}iterate(e){let{enter:t,leave:i,from:r=0,to:s=this.length}=e,o=e.mode||0,l=(o&De.IncludeAnonymous)>0;for(let a=this.cursor(o|De.IncludeAnonymous);;){let u=!1;if(a.from<=s&&a.to>=r&&(!l&&a.type.isAnonymous||t(a)!==!1)){if(a.firstChild())continue;u=!0}for(;u&&i&&(l||!a.type.isAnonymous)&&i(a),!a.nextSibling();){if(!a.parent())return;u=!0}}}prop(e){return e.perNode?this.props?this.props[e.id]:void 0:this.type.prop(e)}get propValues(){let e=[];if(this.props)for(let t in this.props)e.push([+t,this.props[t]]);return e}balance(e={}){return this.children.length<=8?this:Ea(lt.none,this.children,this.positions,0,this.children.length,0,this.length,(t,i,r)=>new Te(this.type,t,i,r,this.propValues),e.makeTree||((t,i,r)=>new Te(lt.none,t,i,r)))}static build(e){return I0(e)}}Te.empty=new Te(lt.none,[],[],0);class Aa{constructor(e,t){this.buffer=e,this.index=t}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.index-2]}get size(){return this.buffer[this.index-1]}get pos(){return this.index}next(){this.index-=4}fork(){return new Aa(this.buffer,this.index)}}class Tn{constructor(e,t,i){this.buffer=e,this.length=t,this.set=i}get type(){return lt.none}toString(){let e=[];for(let t=0;t<this.buffer.length;)e.push(this.childString(t)),t=this.buffer[t+3];return e.join(",")}childString(e){let t=this.buffer[e],i=this.buffer[e+3],r=this.set.types[t],s=r.name;if(/\W/.test(s)&&!r.isError&&(s=JSON.stringify(s)),e+=4,i==e)return s;let o=[];for(;e<i;)o.push(this.childString(e)),e=this.buffer[e+3];return s+"("+o.join(",")+")"}findChild(e,t,i,r,s){let{buffer:o}=this,l=-1;for(let a=e;a!=t&&!(Gf(s,r,o[a+1],o[a+2])&&(l=a,i>0));a=o[a+3]);return l}slice(e,t,i){let r=this.buffer,s=new Uint16Array(t-e),o=0;for(let l=e,a=0;l<t;){s[a++]=r[l++],s[a++]=r[l++]-i;let u=s[a++]=r[l++]-i;s[a++]=r[l++]-e,o=Math.max(o,u)}return new Tn(s,o,this.set)}}function Gf(n,e,t,i){switch(n){case-2:return t<e;case-1:return i>=e&&t<e;case 0:return t<e&&i>e;case 1:return t<=e&&i>e;case 2:return i>e;case 4:return!0}}function mr(n,e,t,i){for(var r;n.from==n.to||(t<1?n.from>=e:n.from>e)||(t>-1?n.to<=e:n.to<e);){let o=!i&&n instanceof vt&&n.index<0?null:n.parent;if(!o)return n;n=o}let s=i?0:De.IgnoreOverlays;if(i)for(let o=n,l=o.parent;l;o=l,l=o.parent)o instanceof vt&&o.index<0&&((r=l.enter(e,t,s))===null||r===void 0?void 0:r.from)!=o.from&&(n=l);for(;;){let o=n.enter(e,t,s);if(!o)return n;n=o}}class Yf{cursor(e=0){return new Ml(this,e)}getChild(e,t=null,i=null){let r=oc(this,e,t,i);return r.length?r[0]:null}getChildren(e,t=null,i=null){return oc(this,e,t,i)}resolve(e,t=0){return mr(this,e,t,!1)}resolveInner(e,t=0){return mr(this,e,t,!0)}matchContext(e){return El(this.parent,e)}enterUnfinishedNodesBefore(e){let t=this.childBefore(e),i=this;for(;t;){let r=t.lastChild;if(!r||r.to!=t.to)break;r.type.isError&&r.from==r.to?(i=t,t=r.prevSibling):t=r}return i}get node(){return this}get next(){return this.parent}}class vt extends Yf{constructor(e,t,i,r){super(),this._tree=e,this.from=t,this.index=i,this._parent=r}get type(){return this._tree.type}get name(){return this._tree.type.name}get to(){return this.from+this._tree.length}nextChild(e,t,i,r,s=0){for(let o=this;;){for(let{children:l,positions:a}=o._tree,u=t>0?l.length:-1;e!=u;e+=t){let c=l[e],h=a[e]+o.from,f;if(!(!(s&De.EnterBracketed&&c instanceof Te&&(f=rr.get(c))&&!f.overlay&&f.bracketed&&i>=h&&i<=h+c.length)&&!Gf(r,i,h,h+c.length))){if(c instanceof Tn){if(s&De.ExcludeBuffers)continue;let d=c.findChild(0,c.buffer.length,t,i-h,r);if(d>-1)return new vn(new M0(o,c,e,h),null,d)}else if(s&De.IncludeAnonymous||!c.type.isAnonymous||Ta(c)){let d;if(!(s&De.IgnoreMounts)&&(d=rr.get(c))&&!d.overlay)return new vt(d.tree,h,e,o);let p=new vt(c,h,e,o);return s&De.IncludeAnonymous||!p.type.isAnonymous?p:p.nextChild(t<0?c.children.length-1:0,t,i,r,s)}}}if(s&De.IncludeAnonymous||!o.type.isAnonymous||(o.index>=0?e=o.index+t:e=t<0?-1:o._parent._tree.children.length,o=o._parent,!o))return null}}get firstChild(){return this.nextChild(0,1,0,4)}get lastChild(){return this.nextChild(this._tree.children.length-1,-1,0,4)}childAfter(e){return this.nextChild(0,1,e,2)}childBefore(e){return this.nextChild(this._tree.children.length-1,-1,e,-2)}prop(e){return this._tree.prop(e)}enter(e,t,i=0){let r;if(!(i&De.IgnoreOverlays)&&(r=rr.get(this._tree))&&r.overlay){let s=e-this.from,o=i&De.EnterBracketed&&r.bracketed;for(let{from:l,to:a}of r.overlay)if((t>0||o?l<=s:l<s)&&(t<0||o?a>=s:a>s))return new vt(r.tree,r.overlay[0].from+this.from,-1,this)}return this.nextChild(0,1,e,t,i)}nextSignificantParent(){let e=this;for(;e.type.isAnonymous&&e._parent;)e=e._parent;return e}get parent(){return this._parent?this._parent.nextSignificantParent():null}get nextSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index+1,1,0,4):null}get prevSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index-1,-1,0,4):null}get tree(){return this._tree}toTree(){return this._tree}toString(){return this._tree.toString()}}function oc(n,e,t,i){let r=n.cursor(),s=[];if(!r.firstChild())return s;if(t!=null){for(let o=!1;!o;)if(o=r.type.is(t),!r.nextSibling())return s}for(;;){if(i!=null&&r.type.is(i))return s;if(r.type.is(e)&&s.push(r.node),!r.nextSibling())return i==null?s:[]}}function El(n,e,t=e.length-1){for(let i=n;t>=0;i=i.parent){if(!i)return!1;if(!i.type.isAnonymous){if(e[t]&&e[t]!=i.name)return!1;t--}}return!0}class M0{constructor(e,t,i,r){this.parent=e,this.buffer=t,this.index=i,this.start=r}}class vn extends Yf{get name(){return this.type.name}get from(){return this.context.start+this.context.buffer.buffer[this.index+1]}get to(){return this.context.start+this.context.buffer.buffer[this.index+2]}constructor(e,t,i){super(),this.context=e,this._parent=t,this.index=i,this.type=e.buffer.set.types[e.buffer.buffer[i]]}child(e,t,i){let{buffer:r}=this.context,s=r.findChild(this.index+4,r.buffer[this.index+3],e,t-this.context.start,i);return s<0?null:new vn(this.context,this,s)}get firstChild(){return this.child(1,0,4)}get lastChild(){return this.child(-1,0,4)}childAfter(e){return this.child(1,e,2)}childBefore(e){return this.child(-1,e,-2)}prop(e){return this.type.prop(e)}enter(e,t,i=0){if(i&De.ExcludeBuffers)return null;let{buffer:r}=this.context,s=r.findChild(this.index+4,r.buffer[this.index+3],t>0?1:-1,e-this.context.start,t);return s<0?null:new vn(this.context,this,s)}get parent(){return this._parent||this.context.parent.nextSignificantParent()}externalSibling(e){return this._parent?null:this.context.parent.nextChild(this.context.index+e,e,0,4)}get nextSibling(){let{buffer:e}=this.context,t=e.buffer[this.index+3];return t<(this._parent?e.buffer[this._parent.index+3]:e.buffer.length)?new vn(this.context,this._parent,t):this.externalSibling(1)}get prevSibling(){let{buffer:e}=this.context,t=this._parent?this._parent.index+4:0;return this.index==t?this.externalSibling(-1):new vn(this.context,this._parent,e.findChild(t,this.index,-1,0,4))}get tree(){return null}toTree(){let e=[],t=[],{buffer:i}=this.context,r=this.index+4,s=i.buffer[this.index+3];if(s>r){let o=i.buffer[this.index+1];e.push(i.slice(r,s,o)),t.push(0)}return new Te(this.type,e,t,this.to-this.from)}toString(){return this.context.buffer.childString(this.index)}}function Qf(n){if(!n.length)return null;let e=0,t=n[0];for(let s=1;s<n.length;s++){let o=n[s];(o.from>t.from||o.to<t.to)&&(t=o,e=s)}let i=t instanceof vt&&t.index<0?null:t.parent,r=n.slice();return i?r[e]=i:r.splice(e,1),new P0(r,t)}class P0{constructor(e,t){this.heads=e,this.node=t}get next(){return Qf(this.heads)}}function D0(n,e,t){let i=n.resolveInner(e,t),r=null;for(let s=i instanceof vt?i:i.context.parent;s;s=s.parent)if(s.index<0){let o=s.parent;(r||(r=[i])).push(o.resolve(e,t)),s=o}else{let o=rr.get(s.tree);if(o&&o.overlay&&o.overlay[0].from<=e&&o.overlay[o.overlay.length-1].to>=e){let l=new vt(o.tree,o.overlay[0].from+s.from,-1,s);(r||(r=[i])).push(mr(l,e,t,!1))}}return r?Qf(r):i}class Ml{get name(){return this.type.name}constructor(e,t=0){if(this.buffer=null,this.stack=[],this.index=0,this.bufferNode=null,this.mode=t&~De.EnterBracketed,e instanceof vt)this.yieldNode(e);else{this._tree=e.context.parent,this.buffer=e.context;for(let i=e._parent;i;i=i._parent)this.stack.unshift(i.index);this.bufferNode=e,this.yieldBuf(e.index)}}yieldNode(e){return e?(this._tree=e,this.type=e.type,this.from=e.from,this.to=e.to,!0):!1}yieldBuf(e,t){this.index=e;let{start:i,buffer:r}=this.buffer;return this.type=t||r.set.types[r.buffer[e]],this.from=i+r.buffer[e+1],this.to=i+r.buffer[e+2],!0}yield(e){return e?e instanceof vt?(this.buffer=null,this.yieldNode(e)):(this.buffer=e.context,this.yieldBuf(e.index,e.type)):!1}toString(){return this.buffer?this.buffer.buffer.childString(this.index):this._tree.toString()}enterChild(e,t,i){if(!this.buffer)return this.yield(this._tree.nextChild(e<0?this._tree._tree.children.length-1:0,e,t,i,this.mode));let{buffer:r}=this.buffer,s=r.findChild(this.index+4,r.buffer[this.index+3],e,t-this.buffer.start,i);return s<0?!1:(this.stack.push(this.index),this.yieldBuf(s))}firstChild(){return this.enterChild(1,0,4)}lastChild(){return this.enterChild(-1,0,4)}childAfter(e){return this.enterChild(1,e,2)}childBefore(e){return this.enterChild(-1,e,-2)}enter(e,t,i=this.mode){return this.buffer?i&De.ExcludeBuffers?!1:this.enterChild(1,e,t):this.yield(this._tree.enter(e,t,i))}parent(){if(!this.buffer)return this.yieldNode(this.mode&De.IncludeAnonymous?this._tree._parent:this._tree.parent);if(this.stack.length)return this.yieldBuf(this.stack.pop());let e=this.mode&De.IncludeAnonymous?this.buffer.parent:this.buffer.parent.nextSignificantParent();return this.buffer=null,this.yieldNode(e)}sibling(e){if(!this.buffer)return this._tree._parent?this.yield(this._tree.index<0?null:this._tree._parent.nextChild(this._tree.index+e,e,0,4,this.mode)):!1;let{buffer:t}=this.buffer,i=this.stack.length-1;if(e<0){let r=i<0?0:this.stack[i]+4;if(this.index!=r)return this.yieldBuf(t.findChild(r,this.index,-1,0,4))}else{let r=t.buffer[this.index+3];if(r<(i<0?t.buffer.length:t.buffer[this.stack[i]+3]))return this.yieldBuf(r)}return i<0?this.yield(this.buffer.parent.nextChild(this.buffer.index+e,e,0,4,this.mode)):!1}nextSibling(){return this.sibling(1)}prevSibling(){return this.sibling(-1)}atLastNode(e){let t,i,{buffer:r}=this;if(r){if(e>0){if(this.index<r.buffer.buffer.length)return!1}else for(let s=0;s<this.index;s++)if(r.buffer.buffer[s+3]<this.index)return!1;({index:t,parent:i}=r)}else({index:t,_parent:i}=this._tree);for(;i;{index:t,_parent:i}=i)if(t>-1)for(let s=t+e,o=e<0?-1:i._tree.children.length;s!=o;s+=e){let l=i._tree.children[s];if(this.mode&De.IncludeAnonymous||l instanceof Tn||!l.type.isAnonymous||Ta(l))return!1}return!0}move(e,t){if(t&&this.enterChild(e,0,4))return!0;for(;;){if(this.sibling(e))return!0;if(this.atLastNode(e)||!this.parent())return!1}}next(e=!0){return this.move(1,e)}prev(e=!0){return this.move(-1,e)}moveTo(e,t=0){for(;(this.from==this.to||(t<1?this.from>=e:this.from>e)||(t>-1?this.to<=e:this.to<e))&&this.parent(););for(;this.enterChild(1,e,t););return this}get node(){if(!this.buffer)return this._tree;let e=this.bufferNode,t=null,i=0;if(e&&e.context==this.buffer)e:for(let r=this.index,s=this.stack.length;s>=0;){for(let o=e;o;o=o._parent)if(o.index==r){if(r==this.index)return o;t=o,i=s+1;break e}r=this.stack[--s]}for(let r=i;r<this.stack.length;r++)t=new vn(this.buffer,t,this.stack[r]);return this.bufferNode=new vn(this.buffer,t,this.index)}get tree(){return this.buffer?null:this._tree._tree}iterate(e,t){for(let i=0;;){let r=!1;if(this.type.isAnonymous||e(this)!==!1){if(this.firstChild()){i++;continue}this.type.isAnonymous||(r=!0)}for(;;){if(r&&t&&t(this),r=this.type.isAnonymous,!i)return;if(this.nextSibling())break;this.parent(),i--,r=!0}}}matchContext(e){if(!this.buffer)return El(this.node.parent,e);let{buffer:t}=this.buffer,{types:i}=t.set;for(let r=e.length-1,s=this.stack.length-1;r>=0;s--){if(s<0)return El(this._tree,e,r);let o=i[t.buffer[this.stack[s]]];if(!o.isAnonymous){if(e[r]&&e[r]!=o.name)return!1;r--}}return!0}}function Ta(n){return n.children.some(e=>e instanceof Tn||!e.type.isAnonymous||Ta(e))}function I0(n){var e;let{buffer:t,nodeSet:i,maxBufferLength:r=A0,reused:s=[],minRepeatType:o=i.types.length}=n,l=Array.isArray(t)?new Aa(t,t.length):t,a=i.types,u=0,c=0;function h(C,k,T,I,P,v){let{id:M,start:x,end:F,size:q}=l,z=c,j=u;if(q<0)if(l.next(),q==-1){let oe=s[M];T.push(oe),I.push(x-C);return}else if(q==-3){u=M;return}else if(q==-4){c=M;return}else throw new RangeError(`Unrecognized record size: ${q}`);let V=a[M],te,J,w=x-C;if(F-x<=r&&(J=b(l.pos-k,P))){let oe=new Uint16Array(J.size-J.skip),le=l.pos-J.size,y=oe.length;for(;l.pos>le;)y=g(J.start,oe,y);te=new Tn(oe,F-J.start,i),w=J.start-C}else{let oe=l.pos-q;l.next();let le=[],y=[],ae=M>=o?M:-1,Q=0,ie=F;for(;l.pos>oe;)ae>=0&&l.id==ae&&l.size>=0?(l.end<=ie-r&&(p(le,y,x,Q,l.end,ie,ae,z,j),Q=le.length,ie=l.end),l.next()):v>2500?f(x,oe,le,y):h(x,oe,le,y,ae,v+1);if(ae>=0&&Q>0&&Q<le.length&&p(le,y,x,Q,x,ie,ae,z,j),le.reverse(),y.reverse(),ae>-1&&Q>0){let Le=d(V,j);te=Ea(V,le,y,0,le.length,0,F-x,Le,Le)}else te=m(V,le,y,F-x,z-F,j)}T.push(te),I.push(w)}function f(C,k,T,I){let P=[],v=0,M=-1;for(;l.pos>k;){let{id:x,start:F,end:q,size:z}=l;if(z>4)l.next();else{if(M>-1&&F<M)break;M<0&&(M=q-r),P.push(x,F,q),v++,l.next()}}if(v){let x=new Uint16Array(v*4),F=P[P.length-2];for(let q=P.length-3,z=0;q>=0;q-=3)x[z++]=P[q],x[z++]=P[q+1]-F,x[z++]=P[q+2]-F,x[z++]=z;T.push(new Tn(x,P[2]-F,i)),I.push(F-C)}}function d(C,k){return(T,I,P)=>{let v=0,M=T.length-1,x,F;if(M>=0&&(x=T[M])instanceof Te){if(!M&&x.type==C&&x.length==P)return x;(F=x.prop(fe.lookAhead))&&(v=I[M]+x.length+F)}return m(C,T,I,P,v,k)}}function p(C,k,T,I,P,v,M,x,F){let q=[],z=[];for(;C.length>I;)q.push(C.pop()),z.push(k.pop()+T-P);C.push(m(i.types[M],q,z,v-P,x-v,F)),k.push(P-T)}function m(C,k,T,I,P,v,M){if(v){let x=[fe.contextHash,v];M=M?[x].concat(M):[x]}if(P>25){let x=[fe.lookAhead,P];M=M?[x].concat(M):[x]}return new Te(C,k,T,I,M)}function b(C,k){let T=l.fork(),I=0,P=0,v=0,M=T.end-r,x={size:0,start:0,skip:0};e:for(let F=T.pos-C;T.pos>F;){let q=T.size;if(T.id==k&&q>=0){x.size=I,x.start=P,x.skip=v,v+=4,I+=4,T.next();continue}let z=T.pos-q;if(q<0||z<F||T.start<M)break;let j=T.id>=o?4:0,V=T.start;for(T.next();T.pos>z;){if(T.size<0)if(T.size==-3||T.size==-4)j+=4;else break e;else T.id>=o&&(j+=4);T.next()}P=V,I+=q,v+=j}return(k<0||I==C)&&(x.size=I,x.start=P,x.skip=v),x.size>4?x:void 0}function g(C,k,T){let{id:I,start:P,end:v,size:M}=l;if(l.next(),M>=0&&I<o){let x=T;if(M>4){let F=l.pos-(M-4);for(;l.pos>F;)T=g(C,k,T)}k[--T]=x,k[--T]=v-C,k[--T]=P-C,k[--T]=I}else M==-3?u=I:M==-4&&(c=I);return T}let _=[],S=[];for(;l.pos>0;)h(n.start||0,n.bufferStart||0,_,S,-1,0);let D=(e=n.length)!==null&&e!==void 0?e:_.length?S[0]+_[0].length:0;return new Te(a[n.topID],_.reverse(),S.reverse(),D)}const lc=new WeakMap;function ls(n,e){if(!n.isAnonymous||e instanceof Tn||e.type!=n)return 1;let t=lc.get(e);if(t==null){t=1;for(let i of e.children){if(i.type!=n||!(i instanceof Te)){t=1;break}t+=ls(n,i)}lc.set(e,t)}return t}function Ea(n,e,t,i,r,s,o,l,a){let u=0;for(let p=i;p<r;p++)u+=ls(n,e[p]);let c=Math.ceil(u*1.5/8),h=[],f=[];function d(p,m,b,g,_){for(let S=b;S<g;){let D=S,C=m[S],k=ls(n,p[S]);for(S++;S<g;S++){let T=ls(n,p[S]);if(k+T>=c)break;k+=T}if(S==D+1){if(k>c){let T=p[D];d(T.children,T.positions,0,T.children.length,m[D]+_);continue}h.push(p[D])}else{let T=m[S-1]+p[S-1].length-C;h.push(Ea(n,p,m,D,S,C,T,null,a))}f.push(C+_-s)}}return d(e,t,i,r,0),(l||a)(h,f,o)}class Wn{constructor(e,t,i,r,s=!1,o=!1){this.from=e,this.to=t,this.tree=i,this.offset=r,this.open=(s?1:0)|(o?2:0)}get openStart(){return(this.open&1)>0}get openEnd(){return(this.open&2)>0}static addTree(e,t=[],i=!1){let r=[new Wn(0,e.length,e,0,!1,i)];for(let s of t)s.to>e.length&&r.push(s);return r}static applyChanges(e,t,i=128){if(!t.length)return e;let r=[],s=1,o=e.length?e[0]:null;for(let l=0,a=0,u=0;;l++){let c=l<t.length?t[l]:null,h=c?c.fromA:1e9;if(h-a>=i)for(;o&&o.from<h;){let f=o;if(a>=f.from||h<=f.to||u){let d=Math.max(f.from,a)-u,p=Math.min(f.to,h)-u;f=d>=p?null:new Wn(d,p,f.tree,f.offset+u,l>0,!!c)}if(f&&r.push(f),o.to>h)break;o=s<e.length?e[s++]:null}if(!c)break;a=c.toA,u=c.toA-c.toB}return r}}class Jf{startParse(e,t,i){return typeof e=="string"&&(e=new L0(e)),i=i?i.length?i.map(r=>new ko(r.from,r.to)):[new ko(0,0)]:[new ko(0,e.length)],this.createParse(e,t||[],i)}parse(e,t,i){let r=this.startParse(e,t,i);for(;;){let s=r.advance();if(s)return s}}}class L0{constructor(e){this.string=e}get length(){return this.string.length}chunk(e){return this.string.slice(e)}get lineChunks(){return!1}read(e,t){return this.string.slice(e,t)}}new fe({perNode:!0});let B0=0;class yt{constructor(e,t,i,r){this.name=e,this.set=t,this.base=i,this.modified=r,this.id=B0++}toString(){let{name:e}=this;for(let t of this.modified)t.name&&(e=`${t.name}(${e})`);return e}static define(e,t){let i=typeof e=="string"?e:"?";if(e instanceof yt&&(t=e),t!=null&&t.base)throw new Error("Can not derive from a modified tag");let r=new yt(i,[],null,[]);if(r.set.push(r),t)for(let s of t.set)r.set.push(s);return r}static defineModifier(e){let t=new As(e);return i=>i.modified.indexOf(t)>-1?i:As.get(i.base||i,i.modified.concat(t).sort((r,s)=>r.id-s.id))}}let O0=0;class As{constructor(e){this.name=e,this.instances=[],this.id=O0++}static get(e,t){if(!t.length)return e;let i=t[0].instances.find(l=>l.base==e&&R0(t,l.modified));if(i)return i;let r=[],s=new yt(e.name,r,e,t);for(let l of t)l.instances.push(s);let o=z0(t);for(let l of e.set)if(!l.modified.length)for(let a of o)r.push(As.get(l,a));return s}}function R0(n,e){return n.length==e.length&&n.every((t,i)=>t==e[i])}function z0(n){let e=[[]];for(let t=0;t<n.length;t++)for(let i=0,r=e.length;i<r;i++)e.push(e[i].concat(n[t]));return e.sort((t,i)=>i.length-t.length)}function F0(n){let e=Object.create(null);for(let t in n){let i=n[t];Array.isArray(i)||(i=[i]);for(let r of t.split(" "))if(r){let s=[],o=2,l=r;for(let h=0;;){if(l=="..."&&h>0&&h+3==r.length){o=1;break}let f=/^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(l);if(!f)throw new RangeError("Invalid path: "+r);if(s.push(f[0]=="*"?"":f[0][0]=='"'?JSON.parse(f[0]):f[0]),h+=f[0].length,h==r.length)break;let d=r[h++];if(h==r.length&&d=="!"){o=0;break}if(d!="/")throw new RangeError("Invalid path: "+r);l=r.slice(h)}let a=s.length-1,u=s[a];if(!u)throw new RangeError("Invalid path: "+r);let c=new gr(i,o,a>0?s.slice(0,a):null);e[u]=c.sort(e[u])}}return Zf.add(e)}const Zf=new fe({combine(n,e){let t,i,r;for(;n||e;){if(!n||e&&n.depth>=e.depth?(r=e,e=e.next):(r=n,n=n.next),t&&t.mode==r.mode&&!r.context&&!t.context)continue;let s=new gr(r.tags,r.mode,r.context);t?t.next=s:i=s,t=s}return i}});class gr{constructor(e,t,i,r){this.tags=e,this.mode=t,this.context=i,this.next=r}get opaque(){return this.mode==0}get inherit(){return this.mode==1}sort(e){return!e||e.depth<this.depth?(this.next=e,this):(e.next=this.sort(e.next),e)}get depth(){return this.context?this.context.length:0}}gr.empty=new gr([],2,null);function ed(n,e){let t=Object.create(null);for(let s of n)if(!Array.isArray(s.tag))t[s.tag.id]=s.class;else for(let o of s.tag)t[o.id]=s.class;let{scope:i,all:r=null}=e||{};return{style:s=>{let o=r;for(let l of s)for(let a of l.set){let u=t[a.id];if(u){o=o?o+" "+u:u;break}}return o},scope:i}}function N0(n,e){let t=null;for(let i of n){let r=i.style(e);r&&(t=t?t+" "+r:r)}return t}function q0(n,e,t,i=0,r=n.length){let s=new H0(i,Array.isArray(e)?e:[e],t);s.highlightRange(n.cursor(),i,r,"",s.highlighters),s.flush(r)}class H0{constructor(e,t,i){this.at=e,this.highlighters=t,this.span=i,this.class=""}startSpan(e,t){t!=this.class&&(this.flush(e),e>this.at&&(this.at=e),this.class=t)}flush(e){e>this.at&&this.class&&this.span(this.at,e,this.class)}highlightRange(e,t,i,r,s){let{type:o,from:l,to:a}=e;if(l>=i||a<=t)return;o.isTop&&(s=this.highlighters.filter(d=>!d.scope||d.scope(o)));let u=r,c=$0(e)||gr.empty,h=N0(s,c.tags);if(h&&(u&&(u+=" "),u+=h,c.mode==1&&(r+=(r?" ":"")+h)),this.startSpan(Math.max(t,l),u),c.opaque)return;let f=e.tree&&e.tree.prop(fe.mounted);if(f&&f.overlay){let d=e.node.enter(f.overlay[0].from+l,1),p=this.highlighters.filter(b=>!b.scope||b.scope(f.tree.type)),m=e.firstChild();for(let b=0,g=l;;b++){let _=b<f.overlay.length?f.overlay[b]:null,S=_?_.from+l:a,D=Math.max(t,g),C=Math.min(i,S);if(D<C&&m)for(;e.from<C&&(this.highlightRange(e,D,C,r,s),this.startSpan(Math.min(C,e.to),u),!(e.to>=S||!e.nextSibling())););if(!_||S>i)break;g=_.to+l,g>t&&(this.highlightRange(d.cursor(),Math.max(t,_.from+l),Math.min(i,g),"",p),this.startSpan(Math.min(i,g),u))}m&&e.parent()}else if(e.firstChild()){f&&(r="");do if(!(e.to<=t)){if(e.from>=i)break;this.highlightRange(e,t,i,r,s),this.startSpan(Math.min(i,e.to),u)}while(e.nextSibling());e.parent()}}}function $0(n){let e=n.type.prop(Zf);for(;e&&e.context&&!n.matchContext(e.context);)e=e.next;return e||null}const H=yt.define,Hr=H(),yn=H(),ac=H(yn),uc=H(yn),wn=H(),$r=H(wn),xo=H(wn),Ht=H(),Rn=H(Ht),Nt=H(),qt=H(),Pl=H(),qi=H(Pl),Vr=H(),Z={comment:Hr,lineComment:H(Hr),blockComment:H(Hr),docComment:H(Hr),name:yn,variableName:H(yn),typeName:ac,tagName:H(ac),propertyName:uc,attributeName:H(uc),className:H(yn),labelName:H(yn),namespace:H(yn),macroName:H(yn),literal:wn,string:$r,docString:H($r),character:H($r),attributeValue:H($r),number:xo,integer:H(xo),float:H(xo),bool:H(wn),regexp:H(wn),escape:H(wn),color:H(wn),url:H(wn),keyword:Nt,self:H(Nt),null:H(Nt),atom:H(Nt),unit:H(Nt),modifier:H(Nt),operatorKeyword:H(Nt),controlKeyword:H(Nt),definitionKeyword:H(Nt),moduleKeyword:H(Nt),operator:qt,derefOperator:H(qt),arithmeticOperator:H(qt),logicOperator:H(qt),bitwiseOperator:H(qt),compareOperator:H(qt),updateOperator:H(qt),definitionOperator:H(qt),typeOperator:H(qt),controlOperator:H(qt),punctuation:Pl,separator:H(Pl),bracket:qi,angleBracket:H(qi),squareBracket:H(qi),paren:H(qi),brace:H(qi),content:Ht,heading:Rn,heading1:H(Rn),heading2:H(Rn),heading3:H(Rn),heading4:H(Rn),heading5:H(Rn),heading6:H(Rn),contentSeparator:H(Ht),list:H(Ht),quote:H(Ht),emphasis:H(Ht),strong:H(Ht),link:H(Ht),monospace:H(Ht),strikethrough:H(Ht),inserted:H(),deleted:H(),changed:H(),invalid:H(),meta:Vr,documentMeta:H(Vr),annotation:H(Vr),processingInstruction:H(Vr),definition:yt.defineModifier("definition"),constant:yt.defineModifier("constant"),function:yt.defineModifier("function"),standard:yt.defineModifier("standard"),local:yt.defineModifier("local"),special:yt.defineModifier("special")};for(let n in Z){let e=Z[n];e instanceof yt&&(e.name=n)}ed([{tag:Z.link,class:"tok-link"},{tag:Z.heading,class:"tok-heading"},{tag:Z.emphasis,class:"tok-emphasis"},{tag:Z.strong,class:"tok-strong"},{tag:Z.keyword,class:"tok-keyword"},{tag:Z.atom,class:"tok-atom"},{tag:Z.bool,class:"tok-bool"},{tag:Z.url,class:"tok-url"},{tag:Z.labelName,class:"tok-labelName"},{tag:Z.inserted,class:"tok-inserted"},{tag:Z.deleted,class:"tok-deleted"},{tag:Z.literal,class:"tok-literal"},{tag:Z.string,class:"tok-string"},{tag:Z.number,class:"tok-number"},{tag:[Z.regexp,Z.escape,Z.special(Z.string)],class:"tok-string2"},{tag:Z.variableName,class:"tok-variableName"},{tag:Z.local(Z.variableName),class:"tok-variableName tok-local"},{tag:Z.definition(Z.variableName),class:"tok-variableName tok-definition"},{tag:Z.special(Z.variableName),class:"tok-variableName2"},{tag:Z.definition(Z.propertyName),class:"tok-propertyName tok-definition"},{tag:Z.typeName,class:"tok-typeName"},{tag:Z.namespace,class:"tok-namespace"},{tag:Z.className,class:"tok-className"},{tag:Z.macroName,class:"tok-macroName"},{tag:Z.propertyName,class:"tok-propertyName"},{tag:Z.operator,class:"tok-operator"},{tag:Z.comment,class:"tok-comment"},{tag:Z.meta,class:"tok-meta"},{tag:Z.invalid,class:"tok-invalid"},{tag:Z.punctuation,class:"tok-punctuation"}]);var vo;const fi=new fe;function V0(n){return U.define({combine:n?e=>e.concat(n):void 0})}const W0=new fe;class Pt{constructor(e,t,i=[],r=""){this.data=e,this.name=r,ge.prototype.hasOwnProperty("tree")||Object.defineProperty(ge.prototype,"tree",{get(){return Jt(this)}}),this.parser=t,this.extension=[Ei.of(this),ge.languageData.of((s,o,l)=>{let a=cc(s,o,l),u=a.type.prop(fi);if(!u)return[];let c=s.facet(u),h=a.type.prop(W0);if(h){let f=a.resolve(o-a.from,l);for(let d of h)if(d.test(f,s)){let p=s.facet(d.facet);return d.type=="replace"?p:p.concat(c)}}return c})].concat(i)}isActiveAt(e,t,i=-1){return cc(e,t,i).type.prop(fi)==this.data}findRegions(e){let t=e.facet(Ei);if((t==null?void 0:t.data)==this.data)return[{from:0,to:e.doc.length}];if(!t||!t.allowsNesting)return[];let i=[],r=(s,o)=>{if(s.prop(fi)==this.data){i.push({from:o,to:o+s.length});return}let l=s.prop(fe.mounted);if(l){if(l.tree.prop(fi)==this.data){if(l.overlay)for(let a of l.overlay)i.push({from:a.from+o,to:a.to+o});else i.push({from:o,to:o+s.length});return}else if(l.overlay){let a=i.length;if(r(l.tree,l.overlay[0].from+o),i.length>a)return}}for(let a=0;a<s.children.length;a++){let u=s.children[a];u instanceof Te&&r(u,s.positions[a]+o)}};return r(Jt(e),0),i}get allowsNesting(){return!0}}Pt.setState=Ie.define();function cc(n,e,t){let i=n.facet(Ei),r=Jt(n).topNode;if(!i||i.allowsNesting)for(let s=r;s;s=s.enter(e,t,De.ExcludeBuffers|De.EnterBracketed))s.type.isTop&&(r=s);return r}function Jt(n){let e=n.field(Pt.state,!1);return e?e.tree:Te.empty}class U0{constructor(e){this.doc=e,this.cursorPos=0,this.string="",this.cursor=e.iter()}get length(){return this.doc.length}syncTo(e){return this.string=this.cursor.next(e-this.cursorPos).value,this.cursorPos=e+this.string.length,this.cursorPos-this.string.length}chunk(e){return this.syncTo(e),this.string}get lineChunks(){return!0}read(e,t){let i=this.cursorPos-this.string.length;return e<i||t>=this.cursorPos?this.doc.sliceString(e,t):this.string.slice(e-i,t-i)}}let Hi=null;class Ai{constructor(e,t,i=[],r,s,o,l,a){this.parser=e,this.state=t,this.fragments=i,this.tree=r,this.treeLen=s,this.viewport=o,this.skipped=l,this.scheduleOn=a,this.parse=null,this.tempSkipped=[]}static create(e,t,i){return new Ai(e,t,[],Te.empty,0,i,[],null)}startParse(){return this.parser.startParse(new U0(this.state.doc),this.fragments)}work(e,t){return t!=null&&t>=this.state.doc.length&&(t=void 0),this.tree!=Te.empty&&this.isDone(t??this.state.doc.length)?(this.takeTree(),!0):this.withContext(()=>{var i;if(typeof e=="number"){let r=Date.now()+e;e=()=>Date.now()>r}for(this.parse||(this.parse=this.startParse()),t!=null&&(this.parse.stoppedAt==null||this.parse.stoppedAt>t)&&t<this.state.doc.length&&this.parse.stopAt(t);;){let r=this.parse.advance();if(r)if(this.fragments=this.withoutTempSkipped(Wn.addTree(r,this.fragments,this.parse.stoppedAt!=null)),this.treeLen=(i=this.parse.stoppedAt)!==null&&i!==void 0?i:this.state.doc.length,this.tree=r,this.parse=null,this.treeLen<(t??this.state.doc.length))this.parse=this.startParse();else return!0;if(e())return!1}})}takeTree(){let e,t;this.parse&&(e=this.parse.parsedPos)>=this.treeLen&&((this.parse.stoppedAt==null||this.parse.stoppedAt>e)&&this.parse.stopAt(e),this.withContext(()=>{for(;!(t=this.parse.advance()););}),this.treeLen=e,this.tree=t,this.fragments=this.withoutTempSkipped(Wn.addTree(this.tree,this.fragments,!0)),this.parse=null)}withContext(e){let t=Hi;Hi=this;try{return e()}finally{Hi=t}}withoutTempSkipped(e){for(let t;t=this.tempSkipped.pop();)e=hc(e,t.from,t.to);return e}changes(e,t){let{fragments:i,tree:r,treeLen:s,viewport:o,skipped:l}=this;if(this.takeTree(),!e.empty){let a=[];if(e.iterChangedRanges((u,c,h,f)=>a.push({fromA:u,toA:c,fromB:h,toB:f})),i=Wn.applyChanges(i,a),r=Te.empty,s=0,o={from:e.mapPos(o.from,-1),to:e.mapPos(o.to,1)},this.skipped.length){l=[];for(let u of this.skipped){let c=e.mapPos(u.from,1),h=e.mapPos(u.to,-1);c<h&&l.push({from:c,to:h})}}}return new Ai(this.parser,t,i,r,s,o,l,this.scheduleOn)}updateViewport(e){if(this.viewport.from==e.from&&this.viewport.to==e.to)return!1;this.viewport=e;let t=this.skipped.length;for(let i=0;i<this.skipped.length;i++){let{from:r,to:s}=this.skipped[i];r<e.to&&s>e.from&&(this.fragments=hc(this.fragments,r,s),this.skipped.splice(i--,1))}return this.skipped.length>=t?!1:(this.reset(),!0)}reset(){this.parse&&(this.takeTree(),this.parse=null)}skipUntilInView(e,t){this.skipped.push({from:e,to:t})}static getSkippingParser(e){return new class extends Jf{createParse(t,i,r){let s=r[0].from,o=r[r.length-1].to;return{parsedPos:s,advance(){let a=Hi;if(a){for(let u of r)a.tempSkipped.push(u);e&&(a.scheduleOn=a.scheduleOn?Promise.all([a.scheduleOn,e]):e)}return this.parsedPos=o,new Te(lt.none,[],[],o-s)},stoppedAt:null,stopAt(){}}}}}isDone(e){e=Math.min(e,this.state.doc.length);let t=this.fragments;return this.treeLen>=e&&t.length&&t[0].from==0&&t[0].to>=e}static get(){return Hi}}function hc(n,e,t){return Wn.applyChanges(n,[{fromA:e,toA:t,fromB:e,toB:t}])}class Ti{constructor(e){this.context=e,this.tree=e.tree}apply(e){if(!e.docChanged&&this.tree==this.context.tree)return this;let t=this.context.changes(e.changes,e.state),i=this.context.treeLen==e.startState.doc.length?void 0:Math.max(e.changes.mapPos(this.context.treeLen),t.viewport.to);return t.work(20,i)||t.takeTree(),new Ti(t)}static init(e){let t=Math.min(3e3,e.doc.length),i=Ai.create(e.facet(Ei).parser,e,{from:0,to:t});return i.work(20,t)||i.takeTree(),new Ti(i)}}Pt.state=Pn.define({create:Ti.init,update(n,e){for(let t of e.effects)if(t.is(Pt.setState))return t.value;return e.startState.facet(Ei)!=e.state.facet(Ei)?Ti.init(e.state):n.apply(e)}});let td=n=>{let e=setTimeout(()=>n(),500);return()=>clearTimeout(e)};typeof requestIdleCallback<"u"&&(td=n=>{let e=-1,t=setTimeout(()=>{e=requestIdleCallback(n,{timeout:400})},100);return()=>e<0?clearTimeout(t):cancelIdleCallback(e)});const So=typeof navigator<"u"&&(!((vo=navigator.scheduling)===null||vo===void 0)&&vo.isInputPending)?()=>navigator.scheduling.isInputPending():null,j0=Qt.fromClass(class{constructor(e){this.view=e,this.working=null,this.workScheduled=0,this.chunkEnd=-1,this.chunkBudget=-1,this.work=this.work.bind(this),this.scheduleWork()}update(e){let t=this.view.state.field(Pt.state).context;(t.updateViewport(e.view.viewport)||this.view.viewport.to>t.treeLen)&&this.scheduleWork(),(e.docChanged||e.selectionSet)&&(this.view.hasFocus&&(this.chunkBudget+=50),this.scheduleWork()),this.checkAsyncSchedule(t)}scheduleWork(){if(this.working)return;let{state:e}=this.view,t=e.field(Pt.state);(t.tree!=t.context.tree||!t.context.isDone(e.doc.length))&&(this.working=td(this.work))}work(e){this.working=null;let t=Date.now();if(this.chunkEnd<t&&(this.chunkEnd<0||this.view.hasFocus)&&(this.chunkEnd=t+3e4,this.chunkBudget=3e3),this.chunkBudget<=0)return;let{state:i,viewport:{to:r}}=this.view,s=i.field(Pt.state);if(s.tree==s.context.tree&&s.context.isDone(r+1e5))return;let o=Date.now()+Math.min(this.chunkBudget,100,e&&!So?Math.max(25,e.timeRemaining()-5):1e9),l=s.context.treeLen<r&&i.doc.length>r+1e3,a=s.context.work(()=>So&&So()||Date.now()>o,r+(l?0:1e5));this.chunkBudget-=Date.now()-t,(a||this.chunkBudget<=0)&&(s.context.takeTree(),this.view.dispatch({effects:Pt.setState.of(new Ti(s.context))})),this.chunkBudget>0&&!(a&&!l)&&this.scheduleWork(),this.checkAsyncSchedule(s.context)}checkAsyncSchedule(e){e.scheduleOn&&(this.workScheduled++,e.scheduleOn.then(()=>this.scheduleWork()).catch(t=>Kt(this.view.state,t)).then(()=>this.workScheduled--),e.scheduleOn=null)}destroy(){this.working&&this.working()}isWorking(){return!!(this.working||this.workScheduled>0)}},{eventHandlers:{focus(){this.scheduleWork()}}}),Ei=U.define({combine(n){return n.length?n[0]:null},enables:n=>[Pt.state,j0,G.contentAttributes.compute([n],e=>{let t=e.facet(n);return t&&t.name?{"data-language":t.name}:{}})]}),K0=U.define(),Ma=U.define({combine:n=>{if(!n.length)return"  ";let e=n[0];if(!e||/\S/.test(e)||Array.from(e).some(t=>t!=e[0]))throw new Error("Invalid indent unit: "+JSON.stringify(n[0]));return e}});function Yn(n){let e=n.facet(Ma);return e.charCodeAt(0)==9?n.tabSize*e.length:e.length}function Ts(n,e){let t="",i=n.tabSize,r=n.facet(Ma)[0];if(r=="	"){for(;e>=i;)t+="	",e-=i;r=" "}for(let s=0;s<e;s++)t+=r;return t}function nd(n,e){n instanceof ge&&(n=new Ws(n));for(let i of n.state.facet(K0)){let r=i(n,e);if(r!==void 0)return r}let t=Jt(n.state);return t.length>=e?X0(n,t,e):null}class Ws{constructor(e,t={}){this.state=e,this.options=t,this.unit=Yn(e)}lineAt(e,t=1){let i=this.state.doc.lineAt(e),{simulateBreak:r,simulateDoubleBreak:s}=this.options;return r!=null&&r>=i.from&&r<=i.to?s&&r==e?{text:"",from:e}:(t<0?r<e:r<=e)?{text:i.text.slice(r-i.from),from:r}:{text:i.text.slice(0,r-i.from),from:i.from}:i}textAfterPos(e,t=1){if(this.options.simulateDoubleBreak&&e==this.options.simulateBreak)return"";let{text:i,from:r}=this.lineAt(e,t);return i.slice(e-r,Math.min(i.length,e+100-r))}column(e,t=1){let{text:i,from:r}=this.lineAt(e,t),s=this.countColumn(i,e-r),o=this.options.overrideIndentation?this.options.overrideIndentation(r):-1;return o>-1&&(s+=o-this.countColumn(i,i.search(/\S|$/))),s}countColumn(e,t=e.length){return zs(e,this.state.tabSize,t)}lineIndent(e,t=1){let{text:i,from:r}=this.lineAt(e,t),s=this.options.overrideIndentation;if(s){let o=s(r);if(o>-1)return o}return this.countColumn(i,i.search(/\S|$/))}get simulatedBreak(){return this.options.simulateBreak||null}}const id=new fe;function X0(n,e,t){let i=e.resolveStack(t),r=e.resolveInner(t,-1).resolve(t,0).enterUnfinishedNodesBefore(t);if(r!=i.node){let s=[];for(let o=r;o&&!(o.from<i.node.from||o.to>i.node.to||o.from==i.node.from&&o.type==i.node.type);o=o.parent)s.push(o);for(let o=s.length-1;o>=0;o--)i={node:s[o],next:i}}return rd(i,n,t)}function rd(n,e,t){for(let i=n;i;i=i.next){let r=Y0(i.node);if(r)return r(Pa.create(e,t,i))}return 0}function G0(n){return n.pos==n.options.simulateBreak&&n.options.simulateDoubleBreak}function Y0(n){let e=n.type.prop(id);if(e)return e;let t=n.firstChild,i;if(t&&(i=t.type.prop(fe.closedBy))){let r=n.lastChild,s=r&&i.indexOf(r.name)>-1;return o=>eb(o,!0,1,void 0,s&&!G0(o)?r.from:void 0)}return n.parent==null?Q0:null}function Q0(){return 0}class Pa extends Ws{constructor(e,t,i){super(e.state,e.options),this.base=e,this.pos=t,this.context=i}get node(){return this.context.node}static create(e,t,i){return new Pa(e,t,i)}get textAfter(){return this.textAfterPos(this.pos)}get baseIndent(){return this.baseIndentFor(this.node)}baseIndentFor(e){let t=this.state.doc.lineAt(e.from);for(;;){let i=e.resolve(t.from);for(;i.parent&&i.parent.from==i.from;)i=i.parent;if(J0(i,e))break;t=this.state.doc.lineAt(i.from)}return this.lineIndent(t.from)}continue(){return rd(this.context.next,this.base,this.pos)}}function J0(n,e){for(let t=e;t;t=t.parent)if(n==t)return!0;return!1}function Z0(n){let e=n.node,t=e.childAfter(e.from),i=e.lastChild;if(!t)return null;let r=n.options.simulateBreak,s=n.state.doc.lineAt(t.from),o=r==null||r<=s.from?s.to:Math.min(s.to,r);for(let l=t.to;;){let a=e.childAfter(l);if(!a||a==i)return null;if(!a.type.isSkipped){if(a.from>=o)return null;let u=/^ */.exec(s.text.slice(t.to-s.from))[0].length;return{from:t.from,to:t.to+u}}l=a.to}}function eb(n,e,t,i,r){let s=n.textAfter,o=s.match(/^\s*/)[0].length,l=i&&s.slice(o,o+i.length)==i||r==n.pos+o,a=Z0(n);return a?l?n.column(a.from):n.column(a.to):n.baseIndent+(l?0:n.unit*t)}class Us{constructor(e,t){this.specs=e;let i;function r(l){let a=_n.newName();return(i||(i=Object.create(null)))["."+a]=l,a}const s=typeof t.all=="string"?t.all:t.all?r(t.all):void 0,o=t.scope;this.scope=o instanceof Pt?l=>l.prop(fi)==o.data:o?l=>l==o:void 0,this.style=ed(e.map(l=>({tag:l.tag,class:l.class||r(Object.assign({},l,{tag:null}))})),{all:s}).style,this.module=i?new _n(i):null,this.themeType=t.themeType}static define(e,t){return new Us(e,t||{})}}const Dl=U.define(),tb=U.define({combine(n){return n.length?[n[0]]:null}});function _o(n){let e=n.facet(Dl);return e.length?e:n.facet(tb)}function sd(n,e){let t=[ib],i;return n instanceof Us&&(n.module&&t.push(G.styleModule.of(n.module)),i=n.themeType),i?t.push(Dl.computeN([G.darkTheme],r=>r.facet(G.darkTheme)==(i=="dark")?[n]:[])):t.push(Dl.of(n)),t}class nb{constructor(e){this.markCache=Object.create(null),this.tree=Jt(e.state),this.decorations=this.buildDeco(e,_o(e.state)),this.decoratedTo=e.viewport.to}update(e){let t=Jt(e.state),i=_o(e.state),r=i!=_o(e.startState),{viewport:s}=e.view,o=e.changes.mapPos(this.decoratedTo,1);t.length<s.to&&!r&&t.type==this.tree.type&&o>=s.to?(this.decorations=this.decorations.map(e.changes),this.decoratedTo=o):(t!=this.tree||e.viewportChanged||r)&&(this.tree=t,this.decorations=this.buildDeco(e.view,i),this.decoratedTo=s.to)}buildDeco(e,t){if(!t||!this.tree.length)return Re.none;let i=new ur;for(let{from:r,to:s}of e.visibleRanges)q0(this.tree,t,(o,l,a)=>{i.add(o,l,this.markCache[a]||(this.markCache[a]=Re.mark({class:a})))},r,s);return i.finish()}}const ib=Rs.high(Qt.fromClass(nb,{decorations:n=>n.decorations})),rb=1e4,sb="()[]{}",ob=new fe;function Il(n,e,t){let i=n.prop(e<0?fe.openedBy:fe.closedBy);if(i)return i;if(n.name.length==1){let r=t.indexOf(n.name);if(r>-1&&r%2==(e<0?1:0))return[t[r+e]]}return null}function Ll(n){let e=n.type.prop(ob);return e?e(n.node):n}function di(n,e,t,i={}){let r=i.maxScanDistance||rb,s=i.brackets||sb,o=Jt(n),l=o.resolveInner(e,t);for(let a=l;a;a=a.parent){let u=Il(a.type,t,s);if(u&&a.from<a.to){let c=Ll(a);if(c&&(t>0?e>=c.from&&e<c.to:e>c.from&&e<=c.to))return lb(n,e,t,a,c,u,s)}}return ab(n,e,t,o,l.type,r,s)}function lb(n,e,t,i,r,s,o){let l=i.parent,a={from:r.from,to:r.to},u=0,c=l==null?void 0:l.cursor();if(c&&(t<0?c.childBefore(i.from):c.childAfter(i.to)))do if(t<0?c.to<=i.from:c.from>=i.to){if(u==0&&s.indexOf(c.type.name)>-1&&c.from<c.to){let h=Ll(c);return{start:a,end:h?{from:h.from,to:h.to}:void 0,matched:!0}}else if(Il(c.type,t,o))u++;else if(Il(c.type,-t,o)){if(u==0){let h=Ll(c);return{start:a,end:h&&h.from<h.to?{from:h.from,to:h.to}:void 0,matched:!1}}u--}}while(t<0?c.prevSibling():c.nextSibling());return{start:a,matched:!1}}function ab(n,e,t,i,r,s,o){let l=t<0?n.sliceDoc(e-1,e):n.sliceDoc(e,e+1),a=o.indexOf(l);if(a<0||a%2==0!=t>0)return null;let u={from:t<0?e-1:e,to:t>0?e+1:e},c=n.doc.iterRange(e,t>0?n.doc.length:0),h=0;for(let f=0;!c.next().done&&f<=s;){let d=c.value;t<0&&(f+=d.length);let p=e+f*t;for(let m=t>0?0:d.length-1,b=t>0?d.length:-1;m!=b;m+=t){let g=o.indexOf(d[m]);if(!(g<0||i.resolveInner(p+m,1).type!=r))if(g%2==0==t>0)h++;else{if(h==1)return{start:u,end:{from:p+m,to:p+m+1},matched:g>>1==a>>1};h--}}t>0&&(f+=d.length)}return c.done?{start:u,matched:!1}:null}function fc(n,e,t,i=0,r=0){e==null&&(e=n.search(/[^\s\u00a0]/),e==-1&&(e=n.length));let s=r;for(let o=i;o<e;o++)n.charCodeAt(o)==9?s+=t-s%t:s++;return s}class od{constructor(e,t,i,r){this.string=e,this.tabSize=t,this.indentUnit=i,this.overrideIndent=r,this.pos=0,this.start=0,this.lastColumnPos=0,this.lastColumnValue=0}eol(){return this.pos>=this.string.length}sol(){return this.pos==0}peek(){return this.string.charAt(this.pos)||void 0}next(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)}eat(e){let t=this.string.charAt(this.pos),i;if(typeof e=="string"?i=t==e:i=t&&(e instanceof RegExp?e.test(t):e(t)),i)return++this.pos,t}eatWhile(e){let t=this.pos;for(;this.eat(e););return this.pos>t}eatSpace(){let e=this.pos;for(;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>e}skipToEnd(){this.pos=this.string.length}skipTo(e){let t=this.string.indexOf(e,this.pos);if(t>-1)return this.pos=t,!0}backUp(e){this.pos-=e}column(){return this.lastColumnPos<this.start&&(this.lastColumnValue=fc(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue}indentation(){var e;return(e=this.overrideIndent)!==null&&e!==void 0?e:fc(this.string,null,this.tabSize)}match(e,t,i){if(typeof e=="string"){let r=o=>i?o.toLowerCase():o,s=this.string.substr(this.pos,e.length);return r(s)==r(e)?(t!==!1&&(this.pos+=e.length),!0):null}else{let r=this.string.slice(this.pos).match(e);return r&&r.index>0?null:(r&&t!==!1&&(this.pos+=r[0].length),r)}}current(){return this.string.slice(this.start,this.pos)}}function ub(n){return{name:n.name||"",token:n.token,blankLine:n.blankLine||(()=>{}),startState:n.startState||(()=>!0),copyState:n.copyState||cb,indent:n.indent||(()=>null),languageData:n.languageData||{},tokenTable:n.tokenTable||La,mergeTokens:n.mergeTokens!==!1}}function cb(n){if(typeof n!="object")return n;let e={};for(let t in n){let i=n[t];e[t]=i instanceof Array?i.slice():i}return e}const dc=new WeakMap;class Da extends Pt{constructor(e){let t=V0(e.languageData),i=ub(e),r,s=new class extends Jf{createParse(o,l,a){return new fb(r,o,l,a)}};super(t,s,[],e.name),this.topNode=mb(t,this),r=this,this.streamParser=i,this.stateAfter=new fe({perNode:!0}),this.tokenTable=e.tokenTable?new cd(i.tokenTable):pb}static define(e){return new Da(e)}getIndent(e){let t,{overrideIndentation:i}=e.options;i&&(t=dc.get(e.state),t!=null&&t<e.pos-1e4&&(t=void 0));let r=Ia(this,e.node.tree,e.node.from,e.node.from,t??e.pos),s,o;if(r?(o=r.state,s=r.pos+1):(o=this.streamParser.startState(e.unit),s=e.node.from),e.pos-s>1e4)return null;for(;s<e.pos;){let a=e.state.doc.lineAt(s),u=Math.min(e.pos,a.to);if(a.length){let c=i?i(a.from):-1,h=new od(a.text,e.state.tabSize,e.unit,c<0?void 0:c);for(;h.pos<u-a.from;)ad(this.streamParser.token,h,o)}else this.streamParser.blankLine(o,e.unit);if(u==e.pos)break;s=a.to+1}let l=e.lineAt(e.pos);return i&&t==null&&dc.set(e.state,l.from),this.streamParser.indent(o,/^\s*(.*)/.exec(l.text)[1],e)}get allowsNesting(){return!1}}function Ia(n,e,t,i,r){let s=t>=i&&t+e.length<=r&&e.prop(n.stateAfter);if(s)return{state:n.streamParser.copyState(s),pos:t+e.length};for(let o=e.children.length-1;o>=0;o--){let l=e.children[o],a=t+e.positions[o],u=l instanceof Te&&a<r&&Ia(n,l,a,i,r);if(u)return u}return null}function ld(n,e,t,i,r){if(r&&t<=0&&i>=e.length)return e;!r&&t==0&&e.type==n.topNode&&(r=!0);for(let s=e.children.length-1;s>=0;s--){let o=e.positions[s],l=e.children[s],a;if(o<i&&l instanceof Te){if(!(a=ld(n,l,t-o,i-o,r)))break;return r?new Te(e.type,e.children.slice(0,s).concat(a),e.positions.slice(0,s+1),o+a.length):a}}return null}function hb(n,e,t,i,r){for(let s of e){let o=s.from+(s.openStart?25:0),l=s.to-(s.openEnd?25:0),a=o<=t&&l>t&&Ia(n,s.tree,0-s.offset,t,l),u;if(a&&a.pos<=i&&(u=ld(n,s.tree,t+s.offset,a.pos+s.offset,!1)))return{state:a.state,tree:u}}return{state:n.streamParser.startState(r?Yn(r):4),tree:Te.empty}}class fb{constructor(e,t,i,r){this.lang=e,this.input=t,this.fragments=i,this.ranges=r,this.stoppedAt=null,this.chunks=[],this.chunkPos=[],this.chunk=[],this.chunkReused=void 0,this.rangeIndex=0,this.to=r[r.length-1].to;let s=Ai.get(),o=r[0].from,{state:l,tree:a}=hb(e,i,o,this.to,s==null?void 0:s.state);this.state=l,this.parsedPos=this.chunkStart=o+a.length;for(let u=0;u<a.children.length;u++)this.chunks.push(a.children[u]),this.chunkPos.push(a.positions[u]);s&&this.parsedPos<s.viewport.from-1e5&&r.some(u=>u.from<=s.viewport.from&&u.to>=s.viewport.from)&&(this.state=this.lang.streamParser.startState(Yn(s.state)),s.skipUntilInView(this.parsedPos,s.viewport.from),this.parsedPos=s.viewport.from),this.moveRangeIndex()}advance(){let e=Ai.get(),t=this.stoppedAt==null?this.to:Math.min(this.to,this.stoppedAt),i=Math.min(t,this.chunkStart+512);for(e&&(i=Math.min(i,e.viewport.to));this.parsedPos<i;)this.parseLine(e);return this.chunkStart<this.parsedPos&&this.finishChunk(),this.parsedPos>=t?this.finish():e&&this.parsedPos>=e.viewport.to?(e.skipUntilInView(this.parsedPos,t),this.finish()):null}stopAt(e){this.stoppedAt=e}lineAfter(e){let t=this.input.chunk(e);if(this.input.lineChunks)t==`
`&&(t="");else{let i=t.indexOf(`
`);i>-1&&(t=t.slice(0,i))}return e+t.length<=this.to?t:t.slice(0,this.to-e)}nextLine(){let e=this.parsedPos,t=this.lineAfter(e),i=e+t.length;for(let r=this.rangeIndex;;){let s=this.ranges[r].to;if(s>=i||(t=t.slice(0,s-(i-t.length)),r++,r==this.ranges.length))break;let o=this.ranges[r].from,l=this.lineAfter(o);t+=l,i=o+l.length}return{line:t,end:i}}skipGapsTo(e,t,i){for(;;){let r=this.ranges[this.rangeIndex].to,s=e+t;if(i>0?r>s:r>=s)break;let o=this.ranges[++this.rangeIndex].from;t+=o-r}return t}moveRangeIndex(){for(;this.ranges[this.rangeIndex].to<this.parsedPos;)this.rangeIndex++}emitToken(e,t,i,r){let s=4;if(this.ranges.length>1){r=this.skipGapsTo(t,r,1),t+=r;let l=this.chunk.length;r=this.skipGapsTo(i,r,-1),i+=r,s+=this.chunk.length-l}let o=this.chunk.length-4;return this.lang.streamParser.mergeTokens&&s==4&&o>=0&&this.chunk[o]==e&&this.chunk[o+2]==t?this.chunk[o+2]=i:this.chunk.push(e,t,i,s),r}parseLine(e){let{line:t,end:i}=this.nextLine(),r=0,{streamParser:s}=this.lang,o=new od(t,e?e.state.tabSize:4,e?Yn(e.state):2);if(o.eol())s.blankLine(this.state,o.indentUnit);else for(;!o.eol();){let l=ad(s.token,o,this.state);if(l&&(r=this.emitToken(this.lang.tokenTable.resolve(l),this.parsedPos+o.start,this.parsedPos+o.pos,r)),o.start>1e4)break}this.parsedPos=i,this.moveRangeIndex(),this.parsedPos<this.to&&this.parsedPos++}finishChunk(){let e=Te.build({buffer:this.chunk,start:this.chunkStart,length:this.parsedPos-this.chunkStart,nodeSet:db,topID:0,maxBufferLength:512,reused:this.chunkReused});e=new Te(e.type,e.children,e.positions,e.length,[[this.lang.stateAfter,this.lang.streamParser.copyState(this.state)]]),this.chunks.push(e),this.chunkPos.push(this.chunkStart-this.ranges[0].from),this.chunk=[],this.chunkReused=void 0,this.chunkStart=this.parsedPos}finish(){return new Te(this.lang.topNode,this.chunks,this.chunkPos,this.parsedPos-this.ranges[0].from).balance()}}function ad(n,e,t){e.start=e.pos;for(let i=0;i<10;i++){let r=n(e,t);if(e.pos>e.start)return r}throw new Error("Stream parser failed to advance stream.")}const La=Object.create(null),br=[lt.none],db=new Ca(br),pc=[],mc=Object.create(null),ud=Object.create(null);for(let[n,e]of[["variable","variableName"],["variable-2","variableName.special"],["string-2","string.special"],["def","variableName.definition"],["tag","tagName"],["attribute","attributeName"],["type","typeName"],["builtin","variableName.standard"],["qualifier","modifier"],["error","invalid"],["header","heading"],["property","propertyName"]])ud[n]=hd(La,e);class cd{constructor(e){this.extra=e,this.table=Object.assign(Object.create(null),ud)}resolve(e){return e?this.table[e]||(this.table[e]=hd(this.extra,e)):0}}const pb=new cd(La);function Co(n,e){pc.indexOf(n)>-1||(pc.push(n),console.warn(e))}function hd(n,e){let t=[];for(let l of e.split(" ")){let a=[];for(let u of l.split(".")){let c=n[u]||Z[u];c?typeof c=="function"?a.length?a=a.map(c):Co(u,`Modifier ${u} used at start of tag`):a.length?Co(u,`Tag ${u} used as modifier`):a=Array.isArray(c)?c:[c]:Co(u,`Unknown highlighting tag ${u}`)}for(let u of a)t.push(u)}if(!t.length)return 0;let i=e.replace(/ /g,"_"),r=i+" "+t.map(l=>l.id),s=mc[r];if(s)return s.id;let o=mc[r]=lt.define({id:br.length,name:i,props:[F0({[i]:t})]});return br.push(o),o.id}function mb(n,e){let t=lt.define({id:br.length,name:"Document",props:[fi.add(()=>n),id.add(()=>i=>e.getIndent(i))],top:!0});return br.push(t),t}Ae.RTL,Ae.LTR;const gb=n=>{let{state:e}=n,t=e.doc.lineAt(e.selection.main.from),i=Oa(n.state,t.from);return i.line?bb(n):i.block?wb(n):!1};function Ba(n,e){return({state:t,dispatch:i})=>{if(t.readOnly)return!1;let r=n(e,t);return r?(i(t.update(r)),!0):!1}}const bb=Ba(vb,0),yb=Ba(fd,0),wb=Ba((n,e)=>fd(n,e,xb(e)),0);function Oa(n,e){let t=n.languageDataAt("commentTokens",e,1);return t.length?t[0]:{}}const $i=50;function kb(n,{open:e,close:t},i,r){let s=n.sliceDoc(i-$i,i),o=n.sliceDoc(r,r+$i),l=/\s*$/.exec(s)[0].length,a=/^\s*/.exec(o)[0].length,u=s.length-l;if(s.slice(u-e.length,u)==e&&o.slice(a,a+t.length)==t)return{open:{pos:i-l,margin:l&&1},close:{pos:r+a,margin:a&&1}};let c,h;r-i<=2*$i?c=h=n.sliceDoc(i,r):(c=n.sliceDoc(i,i+$i),h=n.sliceDoc(r-$i,r));let f=/^\s*/.exec(c)[0].length,d=/\s*$/.exec(h)[0].length,p=h.length-d-t.length;return c.slice(f,f+e.length)==e&&h.slice(p,p+t.length)==t?{open:{pos:i+f+e.length,margin:/\s/.test(c.charAt(f+e.length))?1:0},close:{pos:r-d-t.length,margin:/\s/.test(h.charAt(p-1))?1:0}}:null}function xb(n){let e=[];for(let t of n.selection.ranges){let i=n.doc.lineAt(t.from),r=t.to<=i.to?i:n.doc.lineAt(t.to);r.from>i.from&&r.from==t.to&&(r=t.to==i.to+1?i:n.doc.lineAt(t.to-1));let s=e.length-1;s>=0&&e[s].to>i.from?e[s].to=r.to:e.push({from:i.from+/^\s*/.exec(i.text)[0].length,to:r.to})}return e}function fd(n,e,t=e.selection.ranges){let i=t.map(s=>Oa(e,s.from).block);if(!i.every(s=>s))return null;let r=t.map((s,o)=>kb(e,i[o],s.from,s.to));if(n!=2&&!r.every(s=>s))return{changes:e.changes(t.map((s,o)=>r[o]?[]:[{from:s.from,insert:i[o].open+" "},{from:s.to,insert:" "+i[o].close}]))};if(n!=1&&r.some(s=>s)){let s=[];for(let o=0,l;o<r.length;o++)if(l=r[o]){let a=i[o],{open:u,close:c}=l;s.push({from:u.pos-a.open.length,to:u.pos+u.margin},{from:c.pos-c.margin,to:c.pos+a.close.length})}return{changes:s}}return null}function vb(n,e,t=e.selection.ranges){let i=[],r=-1;e:for(let{from:s,to:o}of t){let l=i.length,a=1e9,u;for(let c=s;c<=o;){let h=e.doc.lineAt(c);if(u==null&&(u=Oa(e,h.from).line,!u))continue e;if(h.from>r&&(s==o||o>h.from)){r=h.from;let f=/^\s*/.exec(h.text)[0].length,d=f==h.length,p=h.text.slice(f,f+u.length)==u?f:-1;f<h.text.length&&f<a&&(a=f),i.push({line:h,comment:p,token:u,indent:f,empty:d,single:!1})}c=h.to+1}if(a<1e9)for(let c=l;c<i.length;c++)i[c].indent<i[c].line.text.length&&(i[c].indent=a);i.length==l+1&&(i[l].single=!0)}if(n!=2&&i.some(s=>s.comment<0&&(!s.empty||s.single))){let s=[];for(let{line:l,token:a,indent:u,empty:c,single:h}of i)(h||!c)&&s.push({from:l.from+u,insert:a+" "});let o=e.changes(s);return{changes:o,selection:e.selection.map(o,1)}}else if(n!=1&&i.some(s=>s.comment>=0)){let s=[];for(let{line:o,comment:l,token:a}of i)if(l>=0){let u=o.from+l,c=u+a.length;o.text[c-o.from]==" "&&c++,s.push({from:u,to:c})}return{changes:s}}return null}const Bl=Dn.define(),Sb=Dn.define(),_b=U.define(),dd=U.define({combine(n){return fa(n,{minDepth:100,newGroupDelay:500,joinToEvent:(e,t)=>t},{minDepth:Math.max,newGroupDelay:Math.min,joinToEvent:(e,t)=>(i,r)=>e(i,r)||t(i,r)})}}),pd=Pn.define({create(){return Xt.empty},update(n,e){let t=e.state.facet(dd),i=e.annotation(Bl);if(i){let a=rt.fromTransaction(e,i.selection),u=i.side,c=u==0?n.undone:n.done;return a?c=Es(c,c.length,t.minDepth,a):c=bd(c,e.startState.selection),new Xt(u==0?i.rest:c,u==0?c:i.rest)}let r=e.annotation(Sb);if((r=="full"||r=="before")&&(n=n.isolate()),e.annotation(Fe.addToHistory)===!1)return e.changes.empty?n:n.addMapping(e.changes.desc);let s=rt.fromTransaction(e),o=e.annotation(Fe.time),l=e.annotation(Fe.userEvent);return s?n=n.addChanges(s,o,l,t,e):e.selection&&(n=n.addSelection(e.startState.selection,o,l,t.newGroupDelay)),(r=="full"||r=="after")&&(n=n.isolate()),n},toJSON(n){return{done:n.done.map(e=>e.toJSON()),undone:n.undone.map(e=>e.toJSON())}},fromJSON(n){return new Xt(n.done.map(rt.fromJSON),n.undone.map(rt.fromJSON))}});function Cb(n={}){return[pd,dd.of(n),G.domEventHandlers({beforeinput(e,t){let i=e.inputType=="historyUndo"?md:e.inputType=="historyRedo"?Ol:null;return i?(e.preventDefault(),i(t)):!1}})]}function js(n,e){return function({state:t,dispatch:i}){if(!e&&t.readOnly)return!1;let r=t.field(pd,!1);if(!r)return!1;let s=r.pop(n,t,e);return s?(i(s),!0):!1}}const md=js(0,!1),Ol=js(1,!1),Ab=js(0,!0),Tb=js(1,!0);class rt{constructor(e,t,i,r,s){this.changes=e,this.effects=t,this.mapped=i,this.startSelection=r,this.selectionsAfter=s}setSelAfter(e){return new rt(this.changes,this.effects,this.mapped,this.startSelection,e)}toJSON(){var e,t,i;return{changes:(e=this.changes)===null||e===void 0?void 0:e.toJSON(),mapped:(t=this.mapped)===null||t===void 0?void 0:t.toJSON(),startSelection:(i=this.startSelection)===null||i===void 0?void 0:i.toJSON(),selectionsAfter:this.selectionsAfter.map(r=>r.toJSON())}}static fromJSON(e){return new rt(e.changes&&ze.fromJSON(e.changes),[],e.mapped&&Gt.fromJSON(e.mapped),e.startSelection&&L.fromJSON(e.startSelection),e.selectionsAfter.map(L.fromJSON))}static fromTransaction(e,t){let i=xt;for(let r of e.startState.facet(_b)){let s=r(e);s.length&&(i=i.concat(s))}return!i.length&&e.changes.empty?null:new rt(e.changes.invert(e.startState.doc),i,void 0,t||e.startState.selection,xt)}static selection(e){return new rt(void 0,xt,void 0,void 0,e)}}function Es(n,e,t,i){let r=e+1>t+20?e-t-1:0,s=n.slice(r,e);return s.push(i),s}function Eb(n,e){let t=[],i=!1;return n.iterChangedRanges((r,s)=>t.push(r,s)),e.iterChangedRanges((r,s,o,l)=>{for(let a=0;a<t.length;){let u=t[a++],c=t[a++];l>=u&&o<=c&&(i=!0)}}),i}function Mb(n,e){return n.ranges.length==e.ranges.length&&n.ranges.filter((t,i)=>t.empty!=e.ranges[i].empty).length===0}function gd(n,e){return n.length?e.length?n.concat(e):n:e}const xt=[],Pb=200;function bd(n,e){if(n.length){let t=n[n.length-1],i=t.selectionsAfter.slice(Math.max(0,t.selectionsAfter.length-Pb));return i.length&&i[i.length-1].eq(e)?n:(i.push(e),Es(n,n.length-1,1e9,t.setSelAfter(i)))}else return[rt.selection([e])]}function Db(n){let e=n[n.length-1],t=n.slice();return t[n.length-1]=e.setSelAfter(e.selectionsAfter.slice(0,e.selectionsAfter.length-1)),t}function Ao(n,e){if(!n.length)return n;let t=n.length,i=xt;for(;t;){let r=Ib(n[t-1],e,i);if(r.changes&&!r.changes.empty||r.effects.length){let s=n.slice(0,t);return s[t-1]=r,s}else e=r.mapped,t--,i=r.selectionsAfter}return i.length?[rt.selection(i)]:xt}function Ib(n,e,t){let i=gd(n.selectionsAfter.length?n.selectionsAfter.map(l=>l.map(e)):xt,t);if(!n.changes)return rt.selection(i);let r=n.changes.map(e),s=e.mapDesc(n.changes,!0),o=n.mapped?n.mapped.composeDesc(s):s;return new rt(r,Ie.mapEffects(n.effects,e),o,n.startSelection.map(s),i)}const Lb=/^(input\.type|delete)($|\.)/;class Xt{constructor(e,t,i=0,r=void 0){this.done=e,this.undone=t,this.prevTime=i,this.prevUserEvent=r}isolate(){return this.prevTime?new Xt(this.done,this.undone):this}addChanges(e,t,i,r,s){let o=this.done,l=o[o.length-1];return l&&l.changes&&!l.changes.empty&&e.changes&&(!i||Lb.test(i))&&(!l.selectionsAfter.length&&t-this.prevTime<r.newGroupDelay&&r.joinToEvent(s,Eb(l.changes,e.changes))||i=="input.type.compose")?o=Es(o,o.length-1,r.minDepth,new rt(e.changes.compose(l.changes),gd(Ie.mapEffects(e.effects,l.changes),l.effects),l.mapped,l.startSelection,xt)):o=Es(o,o.length,r.minDepth,e),new Xt(o,xt,t,i)}addSelection(e,t,i,r){let s=this.done.length?this.done[this.done.length-1].selectionsAfter:xt;return s.length>0&&t-this.prevTime<r&&i==this.prevUserEvent&&i&&/^select($|\.)/.test(i)&&Mb(s[s.length-1],e)?this:new Xt(bd(this.done,e),this.undone,t,i)}addMapping(e){return new Xt(Ao(this.done,e),Ao(this.undone,e),this.prevTime,this.prevUserEvent)}pop(e,t,i){let r=e==0?this.done:this.undone;if(r.length==0)return null;let s=r[r.length-1],o=s.selectionsAfter[0]||(s.startSelection?s.startSelection.map(s.changes.invertedDesc,1):t.selection);if(i&&s.selectionsAfter.length)return t.update({selection:s.selectionsAfter[s.selectionsAfter.length-1],annotations:Bl.of({side:e,rest:Db(r),selection:o}),userEvent:e==0?"select.undo":"select.redo",scrollIntoView:!0});if(s.changes){let l=r.length==1?xt:r.slice(0,r.length-1);return s.mapped&&(l=Ao(l,s.mapped)),t.update({changes:s.changes,selection:s.startSelection,effects:s.effects,annotations:Bl.of({side:e,rest:l,selection:o}),filter:!1,userEvent:e==0?"undo":"redo",scrollIntoView:!0})}else return null}}Xt.empty=new Xt(xt,xt);const Bb=[{key:"Mod-z",run:md,preventDefault:!0},{key:"Mod-y",mac:"Mod-Shift-z",run:Ol,preventDefault:!0},{linux:"Ctrl-Shift-z",run:Ol,preventDefault:!0},{key:"Mod-u",run:Ab,preventDefault:!0},{key:"Alt-u",mac:"Mod-Shift-u",run:Tb,preventDefault:!0}];function Li(n,e){return L.create(n.ranges.map(e),n.mainIndex)}function Lt(n,e){return n.update({selection:e,scrollIntoView:!0,userEvent:"select"})}function Bt({state:n,dispatch:e},t){let i=Li(n.selection,t);return i.eq(n.selection,!0)?!1:(e(Lt(n,i)),!0)}function Ks(n,e){return L.cursor(e?n.to:n.from)}function yd(n,e){return Bt(n,t=>t.empty?n.moveByChar(t,e):Ks(t,e))}function Ye(n){return n.textDirectionAt(n.state.selection.main.head)==Ae.LTR}const wd=n=>yd(n,!Ye(n)),kd=n=>yd(n,Ye(n));function xd(n,e){return Bt(n,t=>t.empty?n.moveByGroup(t,e):Ks(t,e))}const Ob=n=>xd(n,!Ye(n)),Rb=n=>xd(n,Ye(n));function zb(n,e,t){if(e.type.prop(t))return!0;let i=e.to-e.from;return i&&(i>2||/[^\s,.;:]/.test(n.sliceDoc(e.from,e.to)))||e.firstChild}function Xs(n,e,t){let i=Jt(n).resolveInner(e.head),r=t?fe.closedBy:fe.openedBy;for(let a=e.head;;){let u=t?i.childAfter(a):i.childBefore(a);if(!u)break;zb(n,u,r)?i=u:a=t?u.to:u.from}let s=i.type.prop(r),o,l;return s&&(o=t?di(n,i.from,1):di(n,i.to,-1))&&o.matched?l=t?o.end.to:o.end.from:l=t?i.to:i.from,L.cursor(l,t?-1:1)}const Fb=n=>Bt(n,e=>Xs(n.state,e,!Ye(n))),Nb=n=>Bt(n,e=>Xs(n.state,e,Ye(n)));function vd(n,e){return Bt(n,t=>{if(!t.empty)return Ks(t,e);let i=n.moveVertically(t,e);return i.head!=t.head?i:n.moveToLineBoundary(t,e)})}const Sd=n=>vd(n,!1),_d=n=>vd(n,!0);function Cd(n){let e=n.scrollDOM.clientHeight<n.scrollDOM.scrollHeight-2,t=0,i=0,r;if(e){for(let s of n.state.facet(G.scrollMargins)){let o=s(n);o!=null&&o.top&&(t=Math.max(o==null?void 0:o.top,t)),o!=null&&o.bottom&&(i=Math.max(o==null?void 0:o.bottom,i))}r=n.scrollDOM.clientHeight-t-i}else r=(n.dom.ownerDocument.defaultView||window).innerHeight;return{marginTop:t,marginBottom:i,selfScroll:e,height:Math.max(n.defaultLineHeight,r-5)}}function Ad(n,e){let t=Cd(n),{state:i}=n,r=Li(i.selection,o=>o.empty?n.moveVertically(o,e,t.height):Ks(o,e));if(r.eq(i.selection))return!1;let s;if(t.selfScroll){let o=n.coordsAtPos(i.selection.main.head),l=n.scrollDOM.getBoundingClientRect(),a=l.top+t.marginTop,u=l.bottom-t.marginBottom;o&&o.top>a&&o.bottom<u&&(s=G.scrollIntoView(r.main.head,{y:"start",yMargin:o.top-a}))}return n.dispatch(Lt(i,r),{effects:s}),!0}const gc=n=>Ad(n,!1),Rl=n=>Ad(n,!0);function In(n,e,t){let i=n.lineBlockAt(e.head),r=n.moveToLineBoundary(e,t);if(r.head==e.head&&r.head!=(t?i.to:i.from)&&(r=n.moveToLineBoundary(e,t,!1)),!t&&r.head==i.from&&i.length){let s=/^\s*/.exec(n.state.sliceDoc(i.from,Math.min(i.from+100,i.to)))[0].length;s&&e.head!=i.from+s&&(r=L.cursor(i.from+s))}return r}const qb=n=>Bt(n,e=>In(n,e,!0)),Hb=n=>Bt(n,e=>In(n,e,!1)),$b=n=>Bt(n,e=>In(n,e,!Ye(n))),Vb=n=>Bt(n,e=>In(n,e,Ye(n))),Wb=n=>Bt(n,e=>L.cursor(n.lineBlockAt(e.head).from,1)),Ub=n=>Bt(n,e=>L.cursor(n.lineBlockAt(e.head).to,-1));function jb(n,e,t){let i=!1,r=Li(n.selection,s=>{let o=di(n,s.head,-1)||di(n,s.head,1)||s.head>0&&di(n,s.head-1,1)||s.head<n.doc.length&&di(n,s.head+1,-1);if(!o||!o.end)return s;i=!0;let l=o.start.from==s.head?o.end.to:o.end.from;return L.cursor(l)});return i?(e(Lt(n,r)),!0):!1}const Kb=({state:n,dispatch:e})=>jb(n,e);function St(n,e){let t=Li(n.state.selection,i=>{let r=e(i);return L.range(i.anchor,r.head,r.goalColumn,r.bidiLevel||void 0,r.assoc)});return t.eq(n.state.selection)?!1:(n.dispatch(Lt(n.state,t)),!0)}function Td(n,e){return St(n,t=>n.moveByChar(t,e))}const Ed=n=>Td(n,!Ye(n)),Md=n=>Td(n,Ye(n));function Pd(n,e){return St(n,t=>n.moveByGroup(t,e))}const Xb=n=>Pd(n,!Ye(n)),Gb=n=>Pd(n,Ye(n)),Yb=n=>St(n,e=>Xs(n.state,e,!Ye(n))),Qb=n=>St(n,e=>Xs(n.state,e,Ye(n)));function Dd(n,e){return St(n,t=>n.moveVertically(t,e))}const Id=n=>Dd(n,!1),Ld=n=>Dd(n,!0);function Bd(n,e){return St(n,t=>n.moveVertically(t,e,Cd(n).height))}const bc=n=>Bd(n,!1),yc=n=>Bd(n,!0),Jb=n=>St(n,e=>In(n,e,!0)),Zb=n=>St(n,e=>In(n,e,!1)),e2=n=>St(n,e=>In(n,e,!Ye(n))),t2=n=>St(n,e=>In(n,e,Ye(n))),n2=n=>St(n,e=>L.cursor(n.lineBlockAt(e.head).from)),i2=n=>St(n,e=>L.cursor(n.lineBlockAt(e.head).to)),wc=({state:n,dispatch:e})=>(e(Lt(n,{anchor:0})),!0),kc=({state:n,dispatch:e})=>(e(Lt(n,{anchor:n.doc.length})),!0),xc=({state:n,dispatch:e})=>(e(Lt(n,{anchor:n.selection.main.anchor,head:0})),!0),vc=({state:n,dispatch:e})=>(e(Lt(n,{anchor:n.selection.main.anchor,head:n.doc.length})),!0),r2=({state:n,dispatch:e})=>(e(n.update({selection:{anchor:0,head:n.doc.length},userEvent:"select"})),!0),s2=({state:n,dispatch:e})=>{let t=Gs(n).map(({from:i,to:r})=>L.range(i,Math.min(r+1,n.doc.length)));return e(n.update({selection:L.create(t),userEvent:"select"})),!0},o2=({state:n,dispatch:e})=>{let t=Li(n.selection,i=>{let r=Jt(n),s=r.resolveStack(i.from,1);if(i.empty){let o=r.resolveStack(i.from,-1);o.node.from>=s.node.from&&o.node.to<=s.node.to&&(s=o)}for(let o=s;o;o=o.next){let{node:l}=o;if((l.from<i.from&&l.to>=i.to||l.to>i.to&&l.from<=i.from)&&o.next)return L.range(l.to,l.from)}return i});return t.eq(n.selection)?!1:(e(Lt(n,t)),!0)};function Od(n,e){let{state:t}=n,i=t.selection,r=t.selection.ranges.slice();for(let s of t.selection.ranges){let o=t.doc.lineAt(s.head);if(e?o.to<n.state.doc.length:o.from>0)for(let l=s;;){let a=n.moveVertically(l,e);if(a.head<o.from||a.head>o.to){r.some(u=>u.head==a.head)||r.push(a);break}else{if(a.head==l.head)break;l=a}}}return r.length==i.ranges.length?!1:(n.dispatch(Lt(t,L.create(r,r.length-1))),!0)}const l2=n=>Od(n,!1),a2=n=>Od(n,!0),u2=({state:n,dispatch:e})=>{let t=n.selection,i=null;return t.ranges.length>1?i=L.create([t.main]):t.main.empty||(i=L.create([L.cursor(t.main.head)])),i?(e(Lt(n,i)),!0):!1};function Cr(n,e){if(n.state.readOnly)return!1;let t="delete.selection",{state:i}=n,r=i.changeByRange(s=>{let{from:o,to:l}=s;if(o==l){let a=e(s);a<o?(t="delete.backward",a=Wr(n,a,!1)):a>o&&(t="delete.forward",a=Wr(n,a,!0)),o=Math.min(o,a),l=Math.max(l,a)}else o=Wr(n,o,!1),l=Wr(n,l,!0);return o==l?{range:s}:{changes:{from:o,to:l},range:L.cursor(o,o<s.head?-1:1)}});return r.changes.empty?!1:(n.dispatch(i.update(r,{scrollIntoView:!0,userEvent:t,effects:t=="delete.selection"?G.announce.of(i.phrase("Selection deleted")):void 0})),!0)}function Wr(n,e,t){if(n instanceof G)for(let i of n.state.facet(G.atomicRanges).map(r=>r(n)))i.between(e,e,(r,s)=>{r<e&&s>e&&(e=t?s:r)});return e}const Rd=(n,e,t)=>Cr(n,i=>{let r=i.from,{state:s}=n,o=s.doc.lineAt(r),l,a;if(t&&!e&&r>o.from&&r<o.from+200&&!/[^ \t]/.test(l=o.text.slice(0,r-o.from))){if(l[l.length-1]=="	")return r-1;let u=zs(l,s.tabSize),c=u%Yn(s)||Yn(s);for(let h=0;h<c&&l[l.length-1-h]==" ";h++)r--;a=r}else a=Xe(o.text,r-o.from,e,e)+o.from,a==r&&o.number!=(e?s.doc.lines:1)?a+=e?1:-1:!e&&/[\ufe00-\ufe0f]/.test(o.text.slice(a-o.from,r-o.from))&&(a=Xe(o.text,a-o.from,!1,!1)+o.from);return a}),zl=n=>Rd(n,!1,!0),zd=n=>Rd(n,!0,!1),Fd=(n,e)=>Cr(n,t=>{let i=t.head,{state:r}=n,s=r.doc.lineAt(i),o=r.charCategorizer(i);for(let l=null;;){if(i==(e?s.to:s.from)){i==t.head&&s.number!=(e?r.doc.lines:1)&&(i+=e?1:-1);break}let a=Xe(s.text,i-s.from,e)+s.from,u=s.text.slice(Math.min(i,a)-s.from,Math.max(i,a)-s.from),c=o(u);if(l!=null&&c!=l)break;(u!=" "||i!=t.head)&&(l=c),i=a}return i}),Nd=n=>Fd(n,!1),c2=n=>Fd(n,!0),h2=n=>Cr(n,e=>{let t=n.lineBlockAt(e.head).to;return e.head<t?t:Math.min(n.state.doc.length,e.head+1)}),f2=n=>Cr(n,e=>{let t=n.moveToLineBoundary(e,!1).head;return e.head>t?t:Math.max(0,e.head-1)}),d2=n=>Cr(n,e=>{let t=n.moveToLineBoundary(e,!0).head;return e.head<t?t:Math.min(n.state.doc.length,e.head+1)}),p2=({state:n,dispatch:e})=>{if(n.readOnly)return!1;let t=n.changeByRange(i=>({changes:{from:i.from,to:i.to,insert:me.of(["",""])},range:L.cursor(i.from)}));return e(n.update(t,{scrollIntoView:!0,userEvent:"input"})),!0},m2=({state:n,dispatch:e})=>{if(n.readOnly)return!1;let t=n.changeByRange(i=>{if(!i.empty||i.from==0||i.from==n.doc.length)return{range:i};let r=i.from,s=n.doc.lineAt(r),o=r==s.from?r-1:Xe(s.text,r-s.from,!1)+s.from,l=r==s.to?r+1:Xe(s.text,r-s.from,!0)+s.from;return{changes:{from:o,to:l,insert:n.doc.slice(r,l).append(n.doc.slice(o,r))},range:L.cursor(l)}});return t.changes.empty?!1:(e(n.update(t,{scrollIntoView:!0,userEvent:"move.character"})),!0)};function Gs(n){let e=[],t=-1;for(let i of n.selection.ranges){let r=n.doc.lineAt(i.from),s=n.doc.lineAt(i.to);if(!i.empty&&i.to==s.from&&(s=n.doc.lineAt(i.to-1)),t>=r.number){let o=e[e.length-1];o.to=s.to,o.ranges.push(i)}else e.push({from:r.from,to:s.to,ranges:[i]});t=s.number+1}return e}function qd(n,e,t){if(n.readOnly)return!1;let i=[],r=[];for(let s of Gs(n)){if(t?s.to==n.doc.length:s.from==0)continue;let o=n.doc.lineAt(t?s.to+1:s.from-1),l=o.length+1;if(t){i.push({from:s.to,to:o.to},{from:s.from,insert:o.text+n.lineBreak});for(let a of s.ranges)r.push(L.range(Math.min(n.doc.length,a.anchor+l),Math.min(n.doc.length,a.head+l)))}else{i.push({from:o.from,to:s.from},{from:s.to,insert:n.lineBreak+o.text});for(let a of s.ranges)r.push(L.range(a.anchor-l,a.head-l))}}return i.length?(e(n.update({changes:i,scrollIntoView:!0,selection:L.create(r,n.selection.mainIndex),userEvent:"move.line"})),!0):!1}const g2=({state:n,dispatch:e})=>qd(n,e,!1),b2=({state:n,dispatch:e})=>qd(n,e,!0);function Hd(n,e,t){if(n.readOnly)return!1;let i=[];for(let s of Gs(n))t?i.push({from:s.from,insert:n.doc.slice(s.from,s.to)+n.lineBreak}):i.push({from:s.to,insert:n.lineBreak+n.doc.slice(s.from,s.to)});let r=n.changes(i);return e(n.update({changes:r,selection:n.selection.map(r,t?1:-1),scrollIntoView:!0,userEvent:"input.copyline"})),!0}const y2=({state:n,dispatch:e})=>Hd(n,e,!1),w2=({state:n,dispatch:e})=>Hd(n,e,!0),k2=n=>{if(n.state.readOnly)return!1;let{state:e}=n,t=e.changes(Gs(e).map(({from:r,to:s})=>(r>0?r--:s<e.doc.length&&s++,{from:r,to:s}))),i=Li(e.selection,r=>{let s;if(n.lineWrapping){let o=n.lineBlockAt(r.head),l=n.coordsAtPos(r.head,r.assoc||1);l&&(s=o.bottom+n.documentTop-l.bottom+n.defaultLineHeight/2)}return n.moveVertically(r,!0,s)}).map(t);return n.dispatch({changes:t,selection:i,scrollIntoView:!0,userEvent:"delete.line"}),!0};function x2(n,e){if(/\(\)|\[\]|\{\}/.test(n.sliceDoc(e-1,e+1)))return{from:e,to:e};let t=Jt(n).resolveInner(e),i=t.childBefore(e),r=t.childAfter(e),s;return i&&r&&i.to<=e&&r.from>=e&&(s=i.type.prop(fe.closedBy))&&s.indexOf(r.name)>-1&&n.doc.lineAt(i.to).from==n.doc.lineAt(r.from).from&&!/\S/.test(n.sliceDoc(i.to,r.from))?{from:i.to,to:r.from}:null}const Sc=$d(!1),v2=$d(!0);function $d(n){return({state:e,dispatch:t})=>{if(e.readOnly)return!1;let i=e.changeByRange(r=>{let{from:s,to:o}=r,l=e.doc.lineAt(s),a=!n&&s==o&&x2(e,s);n&&(s=o=(o<=l.to?l:e.doc.lineAt(o)).to);let u=new Ws(e,{simulateBreak:s,simulateDoubleBreak:!!a}),c=nd(u,s);for(c==null&&(c=zs(/^\s*/.exec(e.doc.lineAt(s).text)[0],e.tabSize));o<l.to&&/\s/.test(l.text[o-l.from]);)o++;a?{from:s,to:o}=a:s>l.from&&s<l.from+100&&!/\S/.test(l.text.slice(0,s))&&(s=l.from);let h=["",Ts(e,c)];return a&&h.push(Ts(e,u.lineIndent(l.from,-1))),{changes:{from:s,to:o,insert:me.of(h)},range:L.cursor(s+1+h[1].length)}});return t(e.update(i,{scrollIntoView:!0,userEvent:"input"})),!0}}function Ra(n,e){let t=-1;return n.changeByRange(i=>{let r=[];for(let o=i.from;o<=i.to;){let l=n.doc.lineAt(o);l.number>t&&(i.empty||i.to>l.from)&&(e(l,r,i),t=l.number),o=l.to+1}let s=n.changes(r);return{changes:r,range:L.range(s.mapPos(i.anchor,1),s.mapPos(i.head,1))}})}const S2=({state:n,dispatch:e})=>{if(n.readOnly)return!1;let t=Object.create(null),i=new Ws(n,{overrideIndentation:s=>{let o=t[s];return o??-1}}),r=Ra(n,(s,o,l)=>{let a=nd(i,s.from);if(a==null)return;/\S/.test(s.text)||(a=0);let u=/^\s*/.exec(s.text)[0],c=Ts(n,a);(u!=c||l.from<s.from+u.length)&&(t[s.from]=a,o.push({from:s.from,to:s.from+u.length,insert:c}))});return r.changes.empty||e(n.update(r,{userEvent:"indent"})),!0},Vd=({state:n,dispatch:e})=>n.readOnly?!1:(e(n.update(Ra(n,(t,i)=>{i.push({from:t.from,insert:n.facet(Ma)})}),{userEvent:"input.indent"})),!0),Wd=({state:n,dispatch:e})=>n.readOnly?!1:(e(n.update(Ra(n,(t,i)=>{let r=/^\s*/.exec(t.text)[0];if(!r)return;let s=zs(r,n.tabSize),o=0,l=Ts(n,Math.max(0,s-Yn(n)));for(;o<r.length&&o<l.length&&r.charCodeAt(o)==l.charCodeAt(o);)o++;i.push({from:t.from+o,to:t.from+r.length,insert:l.slice(o)})}),{userEvent:"delete.dedent"})),!0),_2=n=>(n.setTabFocusMode(),!0),C2=[{key:"Ctrl-b",run:wd,shift:Ed,preventDefault:!0},{key:"Ctrl-f",run:kd,shift:Md},{key:"Ctrl-p",run:Sd,shift:Id},{key:"Ctrl-n",run:_d,shift:Ld},{key:"Ctrl-a",run:Wb,shift:n2},{key:"Ctrl-e",run:Ub,shift:i2},{key:"Ctrl-d",run:zd},{key:"Ctrl-h",run:zl},{key:"Ctrl-k",run:h2},{key:"Ctrl-Alt-h",run:Nd},{key:"Ctrl-o",run:p2},{key:"Ctrl-t",run:m2},{key:"Ctrl-v",run:Rl}],A2=[{key:"ArrowLeft",run:wd,shift:Ed,preventDefault:!0},{key:"Mod-ArrowLeft",mac:"Alt-ArrowLeft",run:Ob,shift:Xb,preventDefault:!0},{mac:"Cmd-ArrowLeft",run:$b,shift:e2,preventDefault:!0},{key:"ArrowRight",run:kd,shift:Md,preventDefault:!0},{key:"Mod-ArrowRight",mac:"Alt-ArrowRight",run:Rb,shift:Gb,preventDefault:!0},{mac:"Cmd-ArrowRight",run:Vb,shift:t2,preventDefault:!0},{key:"ArrowUp",run:Sd,shift:Id,preventDefault:!0},{mac:"Cmd-ArrowUp",run:wc,shift:xc},{mac:"Ctrl-ArrowUp",run:gc,shift:bc},{key:"ArrowDown",run:_d,shift:Ld,preventDefault:!0},{mac:"Cmd-ArrowDown",run:kc,shift:vc},{mac:"Ctrl-ArrowDown",run:Rl,shift:yc},{key:"PageUp",run:gc,shift:bc},{key:"PageDown",run:Rl,shift:yc},{key:"Home",run:Hb,shift:Zb,preventDefault:!0},{key:"Mod-Home",run:wc,shift:xc},{key:"End",run:qb,shift:Jb,preventDefault:!0},{key:"Mod-End",run:kc,shift:vc},{key:"Enter",run:Sc,shift:Sc},{key:"Mod-a",run:r2},{key:"Backspace",run:zl,shift:zl,preventDefault:!0},{key:"Delete",run:zd,preventDefault:!0},{key:"Mod-Backspace",mac:"Alt-Backspace",run:Nd,preventDefault:!0},{key:"Mod-Delete",mac:"Alt-Delete",run:c2,preventDefault:!0},{mac:"Mod-Backspace",run:f2,preventDefault:!0},{mac:"Mod-Delete",run:d2,preventDefault:!0}].concat(C2.map(n=>({mac:n.key,run:n.run,shift:n.shift}))),T2=[{key:"Alt-ArrowLeft",mac:"Ctrl-ArrowLeft",run:Fb,shift:Yb},{key:"Alt-ArrowRight",mac:"Ctrl-ArrowRight",run:Nb,shift:Qb},{key:"Alt-ArrowUp",run:g2},{key:"Shift-Alt-ArrowUp",run:y2},{key:"Alt-ArrowDown",run:b2},{key:"Shift-Alt-ArrowDown",run:w2},{key:"Mod-Alt-ArrowUp",run:l2},{key:"Mod-Alt-ArrowDown",run:a2},{key:"Escape",run:u2},{key:"Mod-Enter",run:v2},{key:"Alt-l",mac:"Ctrl-l",run:s2},{key:"Mod-i",run:o2,preventDefault:!0},{key:"Mod-[",run:Wd},{key:"Mod-]",run:Vd},{key:"Mod-Alt-\\",run:S2},{key:"Shift-Mod-k",run:k2},{key:"Shift-Mod-\\",run:Kb},{key:"Mod-/",run:gb},{key:"Alt-A",run:yb},{key:"Ctrl-m",mac:"Shift-Alt-m",run:_2}].concat(A2),E2={key:"Tab",run:Vd,shift:Wd},Ud="ffm-run-feedback-enabled",st={enabled:!0};function M2(){try{const n=localStorage.getItem(Ud);n==="0"?st.enabled=!1:n==="1"&&(st.enabled=!0)}catch{}}function P2(){try{localStorage.setItem(Ud,st.enabled?"1":"0")}catch{}}function D2(){return st.enabled=!st.enabled,P2(),st.enabled}function _c(n){const e=st.enabled;n.setAttribute("aria-pressed",e?"true":"false"),n.setAttribute("aria-label",e?"Run sound and animations on":"Run sound and animations off"),n.classList.toggle("run-feedback-toggle--off",!e),n.title=e?"Turn off run sound and animations":"Turn on run sound and animations"}let Cc=null;function I2(){return Cc??(Cc=new AudioContext),Cc}const Ac=[329.6275569128699,391.99543598174927,493.8833013781249],L2=10,B2=420,O2=3;let as=null,us=null,Fl=!1;function Nl(){as!==null&&(clearInterval(as),as=null),us=null}function za(n){if(Nl(),!st.enabled||(Fl=!0,window.matchMedia("(prefers-reduced-motion: reduce)").matches))return;us=n;const e=()=>{if(!st.enabled){Nl();return}us&&N2(us,O2)};e(),as=setInterval(e,B2)}function Fa(){const n=Fl;Fl=!1,Nl(),n&&jd()}function jd(){if(st.enabled)try{const n=I2();n.resume().then(()=>{const e=n.currentTime,t=.42,i=.09;for(let r=0;r<Ac.length;r++){const s=Ac[r],o=n.createOscillator(),l=n.createGain();o.type="triangle",o.frequency.setValueAtTime(s,e),l.gain.setValueAtTime(0,e),l.gain.linearRampToValueAtTime(i,e+.018+r*.012),l.gain.exponentialRampToValueAtTime(8e-4,e+t),o.connect(l),l.connect(n.destination),o.start(e),o.stop(e+t+.06)}})}catch{}}function Kd(n){return!(n.isComposing||n.metaKey||n.ctrlKey||n.altKey||n.key==="Tab"||n.key==="Escape"||n.key==="ArrowUp"||n.key==="ArrowDown"||n.repeat)}function R2(n,e){if(!st.enabled||n.disabled||!Kd(e))return;const{x:t,y:i}=F2(n);Na(t,i,{centerOnPoint:!0}),e.key==="Enter"&&jd()}function z2(n,e){if(!st.enabled||!Kd(e))return;const t=n.state.selection.main.head,i=n.coordsAtPos(t);if(!i)return;const r=i.left,s=(i.top+i.bottom)/2;Na(r,s,{centerOnPoint:!0})}function F2(n){const e=n.getBoundingClientRect(),t=window.getComputedStyle(n),i=parseFloat(t.borderLeftWidth)||0,r=parseFloat(t.paddingLeft)||0,s=n.selectionStart??0,o=document.createElement("span");o.setAttribute("aria-hidden","true"),o.style.visibility="hidden",o.style.position="absolute",o.style.whiteSpace="pre",o.style.top="0",o.style.left="0",o.style.font=t.font,o.style.fontSize=t.fontSize,o.style.fontFamily=t.fontFamily,o.style.fontWeight=t.fontWeight,o.style.letterSpacing=t.letterSpacing,o.style.fontVariant=t.fontVariant,o.style.textTransform=t.textTransform,o.textContent=n.value.slice(0,s),document.body.appendChild(o);const l=o.offsetWidth;o.remove();const a=e.left+i+r+l-n.scrollLeft,u=e.top+e.height/2;return{x:a,y:u}}function Na(n,e,t){if(!st.enabled||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const i=document.createElement("span");i.className="run-flat-anchor",i.style.left=`${n}px`,i.style.top=`${e}px`,t!=null&&t.centerOnPoint&&(i.style.transform="translate(-50%, -50%)");const r=document.createElement("span");r.className="run-flat-particle",r.setAttribute("aria-hidden","true"),r.textContent="♭",t!=null&&t.animationDelay&&(r.style.animationDelay=t.animationDelay);const s=(Math.random()-.5)*2.25,o=-6+Math.random()*12,l=o+8+Math.random()*10;r.style.setProperty("--drift-x",`${s}rem`),r.style.setProperty("--rot-0",`${o}deg`),r.style.setProperty("--rot-1",`${l}deg`),i.appendChild(r),document.body.appendChild(i),r.addEventListener("animationend",()=>{i.remove()},{once:!0})}function N2(n,e=L2){if(!st.enabled||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const t=n.getBoundingClientRect();if(!(t.width<=0||t.height<=0))for(let i=0;i<e;i++){const r=t.left+Math.random()*t.width,s=t.top+t.height*(.35+Math.random()*.35);Na(r,s,{animationDelay:`${i*.045}s`})}}const q2=new Set(["dup","drop","swap","choose","branch","ifte","eval","nop","putc","getc","putn","clock","clr","rand","exit","depth","q<","q>"]),Xd=Us.define([{tag:Z.comment,color:"#8a6f5f",fontStyle:"italic"},{tag:Z.string,color:"#1d6e57"},{tag:Z.number,color:"#b14f21"},{tag:Z.keyword,color:"#7d2a10",fontWeight:"700"},{tag:Z.definition(Z.variableName),color:"#0d4f87",fontWeight:"700"},{tag:[Z.operator,Z.bracket],color:"#2a2d34"}]),Gd=G.theme({"&":{height:"100%",backgroundColor:"transparent"},"&.cm-focused":{outline:"none"},".cm-scroller":{overflow:"auto"},".cm-content":{padding:"1rem"},".cm-gutters":{backgroundColor:"transparent",color:"#7a6153",border:"none"},".cm-lineNumbers .cm-gutterElement":{padding:"0 0.55rem 0 0"},".cm-line":{padding:"0"},".cm-cursor, .cm-dropCursor":{borderLeftColor:"#201611"},".cm-selectionBackground, .cm-content ::selection":{backgroundColor:"rgba(187, 77, 29, 0.22)"}}),H2=G.theme({".cm-content":{minHeight:"520px"}});G.theme({"&":{border:"1px solid rgba(32, 22, 17, 0.15)",borderRadius:"14px",backgroundColor:"var(--panel-strong)"},"&.cm-focused":{outline:"none"},".cm-scroller":{overflowX:"auto",overflowY:"hidden",fontFamily:'"Iosevka", "Cascadia Code", "SFMono-Regular", monospace',fontSize:"0.95rem",lineHeight:"1.55"},".cm-content":{minHeight:"44px",padding:"0.7rem 0.9rem",whiteSpace:"pre"},".cm-line":{padding:"0"},".cm-cursor, .cm-dropCursor":{borderLeftColor:"#201611"},".cm-selectionBackground, .cm-content ::selection":{backgroundColor:"rgba(187, 77, 29, 0.22)"}});const $2=G.theme({".cm-content":{minHeight:"160px",padding:"1rem 1.2rem 1.2rem"},".cm-content:not(.cm-lineWrapping)":{whiteSpace:"pre"},".cm-scroller":{fontFamily:'"Iosevka", "Cascadia Code", "SFMono-Regular", monospace',fontSize:"0.92rem",lineHeight:"1.55"}}),V2={startState(){return{inBlockComment:!1,inString:!1,inStringEscape:!1}},copyState(n){return{inBlockComment:n.inBlockComment,inString:n.inString,inStringEscape:n.inStringEscape}},token(n,e){if(e.inBlockComment){for(;!n.eol();){if(n.match("*/")){e.inBlockComment=!1;break}n.next()}return"comment"}if(e.inString){for(;!n.eol();){const i=n.next();if(e.inStringEscape){e.inStringEscape=!1;continue}if(i==="\\"){e.inStringEscape=!0;continue}if(i==="'"){e.inString=!1;break}}return"string"}if(n.eatSpace())return null;if(n.match("/*"))return e.inBlockComment=!0,"comment";if(n.peek()==="'")return n.next(),e.inString=!0,e.inStringEscape=!1,"string";if(n.match(/^q[<>](?![a-zA-Z0-9_])/i)||n.match(/^\.[a-zA-Z_][a-zA-Z0-9_]*/))return"keyword";if(n.match(/^(?:0x[0-9a-fA-F_]+|0b[01_]+|0o[0-7_]+|[0-9][0-9_]*)(?![a-zA-Z0-9_])/))return"number";if(n.match(/^[a-zA-Z_][a-zA-Z0-9_]*:(?![a-zA-Z0-9_])/))return"def";if(n.match(/^[\[\]]/))return"bracket";if(n.match(/^(?:<<|>>|[+\-*/%=<>|&~?:;()])/))return"operator";const t=n.match(/^[a-zA-Z_][a-zA-Z0-9_]*/);return t?q2.has(t[0].toLowerCase())?"keyword":null:(n.next(),null)}},Yd=Da.define(V2),W2=[Cb(),Wf.of([E2,...T2,...Bb]),c0(),Yd,sd(Xd)],qa=G.domEventHandlers({keydown(n,e){z2(e,n)}});function Ha(n,e,t){const i=t==null?void 0:t.onDocumentChange,r=new G({state:ge.create({doc:e,extensions:[...W2,C0(),p0(),G.lineWrapping,Gd,H2,...i?[G.updateListener.of(s=>{s.docChanged&&i()})]:[],...(t==null?void 0:t.extraExtensions)??[]]}),parent:n});return{getValue(){return r.state.doc.toString()},setValue(s){r.state.doc.toString()!==s&&r.dispatch({changes:{from:0,to:r.state.doc.length,insert:s}})},focus(){r.focus()}}}function Tc(n,e){const t=new xr,i=new G({state:ge.create({doc:e,extensions:[t.of([]),Yd,sd(Xd),ge.readOnly.of(!0),G.editable.of(!1),Gd,$2]}),parent:n});return{getValue(){return i.state.doc.toString()},setValue(r){i.state.doc.toString()!==r&&i.dispatch({changes:{from:0,to:i.state.doc.length,insert:r}})},focus(){i.focus()},setWrapped(r){i.dispatch({effects:t.reconfigure(r?G.lineWrapping:[])})}}}const U2=`.import ../lib/prelude.ffp

/* Project Euler #1: sum multiples of 3 or 5 below 1000. */
/* http://projecteuler.net/index.php?section=problems&id=1 */

mod?: [ 3 divisor? ] [ 5 divisor? ] bi or ;

999 count [ mod? ] filter! sum! .

/* 233168 */
`,j2=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=10 */

/* Walk primes with next-prime (prelude) until past 2_000_000. Slow but exact. */

_e10: dup 2_000_000 <= [
    dup rot + swap next-prime _e10
  ] ? ;

0 2 _e10 drop . /* 142913828922 */
`,K2=`.import ../lib/prelude.ffp

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


/* 5537376230 */`,X2=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=14 */

_odd?: 1 & ;
2/: 1 >> ;

next-collatz: dup _odd? [ 3 * 1 + 2/ q< 2 + q> ] [ 2/ q< ++ q> ] branch ; .inline
collatz: dup 1 > [ next-collatz collatz ] ? ;
collatz-count: 0 swap collatz drop ; .inline

collatz-count-recur:
  1 - dup
  [
    dup _odd?
    [ ++ 2/ collatz-count-recur ++ ]
    [ 3 * 4 + 2/ collatz-count-recur 2 + ] .inline
    branch
  ]
  ? ; .inline

skip?: dup [ 3 % 2 = ] [ 6 % 4 = ] or_else ;

runn:
  skip? [ ++ ] ?  /* optional, skip some values */
  dup collatz-count
  [ over ] dip
  dup [ < ] dip swap
  [ q< q< drop2 q> q> over ++ ]
  [ drop ++ ]
  branch
; .inline

step: dup 1_000_000 < [ runn step ] ? ;

/* Generates [ A006877 ] */

/* n count */
1 1 /* (use 1 1 to get full sequence) */
/* 77031 350 . (head start) */
over ++
step
drop drop . /* 837799 */`,G2=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=16 */

digits: dup [ 10 [ % ] [ / ] bi2 digits ] ? ;

2 1000 ^ digits sum! . /* 1366 */`,Y2=`!: dup 1 > [ dup 1 - ! * ] ? trim ;

trim: dup 10 % 0 = [ 10 / trim ] ? ;
five: 100_000 % ;

9 ! five . clr  /* 36288 */
10 ! five . clr  /* 36288 */
20 ! five . clr  /* 17664 */

1_000 ! trim five . clr /* 53472 */

/* Omitted: 1_000_000_000_000 ! … (expected [ 16576 ]) — factorial(10^12) is not practical here. */`,Q2=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=2 */

fib: dup2 + ;
fib-up: dup 4000000 < [ fib fib-up ] ? ;

1 2 fib-up drop
[ even? ] filter! sum! .

/* 4613732 */
`,J2=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=20 */

digits: dup [ 10 [ % ] [ / ] bi2 digits ] ? ;

100 ! digits sum! . /* 648 */
`,Z2=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=25 */

next: swap dupd + ;

c: q< q< ++ q> q> ;

n:
.m 10 1000 ^
;

r: c dup n < [ next r ] ? ;

0 1 1 r drop drop ++ . /* 4782 */`,ey=`.import ../lib/prelude.ffp

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

600851475143 factors last! . /* 6857 */`,ty=`.import ../lib/prelude.ffp

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
`,ny=`.import ../lib/prelude.ffp

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
`,iy=`.import ../lib/prelude.ffp

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

/* 9110846700 */`,ry=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=5 */

/* gcd and lcm come from prelude (math library). */

1 20 range [ lcm ] reduce! .

/* 232792560 */
`,sy=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=5 */

sum-of-squares: [ sqr + ] 0 foldl! ;
square-of-sum: sum! sqr ;

100 count square-of-sum
( 100 count sum-of-squares ) - .

/* 25164150 */`,oy=`.import ../lib/prelude.ffp

/* Project Euler #7: find the 10001st prime. */
/* http://projecteuler.net/index.php?section=problems&id=7 */

10001 th-prime . /* 104743 */
`,ly=`.import ../lib/prelude.ffp

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
`,ay=`.import ../lib/prelude.ffp

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
`,uy=`/* constants 1 2 3 */
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
`,cy=`.import ./num.ffp

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
`,hy=`.import ./pred.ffp

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
`,fy=`.import ./atan-shared.ffp

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
`,dy=`.import ./arith.ffp
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
`,py=`.import ./atan-shared.ffp
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
`,my=`.import ./atan-shared.ffp

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
`,gy=`.import ./atan-shared.ffp
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
`,by=`.import ./arith.ffp

/*
 * Naming note: the \`i\` prefix means integer.
 * \`icbrt\` returns the integer cube root (truncated toward zero).
 */

__closer: dup2 2 ^ / over 2 * + 3 / ;
__loop: __closer dup2 > [ nip __loop ] ? ;
__cbrtn: dup 3 / __loop drop nip ;

icbrt: dup sgn swap over * dup 1 > [ __cbrtn ] ? * ;
`,yy=`
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
`,wy=`.import ../core/core.ff

__t: tuck % dup [ __t ] ? ;

gcd: dup [ __t ] ? drop ;
lcm: dup2 gcd / * ;
`,ky=`.import ../core/core.ff
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
`,xy=`.import ./pred.ffp
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
`,vy=`.import ../core/core.ff

/* Logarithm and combinatorics */

!: dup [ dup -- ! * ] [ drop 1 ] branch ; /* n ! == n! */
nck: dup2 - ! swap ! * [ ! ] dip / ; /* n k nck == C(n,k) */

/* Knuth operators */

^^: -- dup [ [ dup ] swap times [ ^ ] ] dip times ;
^^^: -- dup [ [ dup ] swap times [ ^^ ] ] dip times ;
`,Sy=`.import ./atan-core.ffp

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
; /* n half_pi == floor(10ⁿ*π/2) */`,_y=`.import ../core/core.ff
.import ./arith.ffp

/* Internal precision helpers shared by variable-precision math words. */
n->S: 10 swap ^ ; /* n n->S == 10^n */
n->S2: 2 * n->S ; /* n n->S2 == 10^(2n) */
n->K: 6 * 4 + 5 / 10 + ; /* n n->K == ceil(6*n/5)+10 */
p/q*S: n->S swap rot * swap / ; /* p q n p/q*S == floor(p*10^n/q) */

ntrunc: n->S / ; /* x n ntrunc == floor(x/10^n) */
nfrac: [ abs ] dip n->S % ; /* x n nfrac == (x - floor(x/10^n))*10^n */`,Cy=`.import ../core/core.ff

/* Predicates */

negitive?: 0 < ; /* n negitive? == flag */
positive?: 0 > ; /* n positive? == flag */
divisor?: % zero? ; .inline /* n d divisor? == flag */
even?: 2 divisor? ; .inline /* n even? == flag */
odd?: even? not ; .inline /* n odd? == flag */
`,Ay=`.import ./pred.ffp

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
`,Ty=`.import ../core/core.ff
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
`,Ey=`.import ../core/core.ff
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
`,My=`/* Trigonometric words live here. Pi-derived constants are defined in pi.ffp. */
`,Py=`.import ./core/core.ff
.import ./math/math.ffp
.import ./string/string.ffp
.import ./seq/seq.ffp
.import ./time/time.ffp`,Dy=`.import ../core/core.ff

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
`,Iy=`.import ../core/core.ff

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
`,Ly=`/* String output */

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
`,By=`.import char.ffp
.import str.ffp`,Oy=`.import ./core/core.ff
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
`,Ry=`.import ./core/core.ff
.import ./string/string.ffp

assert: falsey? [ 0 10 'Failed' println .inline 1 exit ] ? ;
assert_eq: = assert .inline ;
assert_false: not assert .inline ;

OK: 0 '\\sOK' println clr ;

¶: clr 999 ;`,zy=`.import ./utc.ffp
`,Fy=`.import ../core/core.ff
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
`,Qd=`.import ./lib/prelude.ffp

/* factorial */

fact: dup [ dup -- fact * ] [ drop 1 ] branch ;

100 fact .

/* 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000 */`,Ny=`.import ./lib/math/cbrt.ffp

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
`,qy=`.import ./lib/math/sqrt.ffp

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
`,Hy=`.import ./lib/math/gcd.ffp

/* Greatest common divisor and least common multiple demo. */

109876463 177777648  gcd . clr /* 1234567 */

109876463 177777648  lcm . clr /* 15822210672 */
`,$y=`.import ./lib/math/ack.ffp
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
`,Vy=`.import ./lib/math/atan.ffp

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
`,Wy=new Set(["../../ff/euler/euler4.ffp","../../ff/euler/euler10.ffp","../../ff/euler/euler14.ffp","../../ff/euler/euler46.ffp"]);function Uy(n){const e="../../ff/lib/";if(!n.startsWith(e))throw new Error(`Unexpected library source path: ${n}`);return`/lib/${n.slice(e.length)}`}const jy=Object.assign({"../../ff/euler/euler1.ffp":U2,"../../ff/euler/euler10.ffp":j2,"../../ff/euler/euler13.ffp":K2,"../../ff/euler/euler14.ffp":X2,"../../ff/euler/euler16.ffp":G2,"../../ff/euler/euler160.ffp":Y2,"../../ff/euler/euler2.ffp":Q2,"../../ff/euler/euler20.ffp":J2,"../../ff/euler/euler25.ffp":Z2,"../../ff/euler/euler3.ffp":ey,"../../ff/euler/euler4.ffp":ty,"../../ff/euler/euler46.ffp":ny,"../../ff/euler/euler48.ffp":iy,"../../ff/euler/euler5.ffp":ry,"../../ff/euler/euler6.ffp":sy,"../../ff/euler/euler7.ffp":oy,"../../ff/euler/euler8.ffp":ly,"../../ff/euler/euler9.ffp":ay});function Ec(n){const e=n.split("/").pop()??n,t=/^euler(\d+)\.ffp$/.exec(e);return t?[Number(t[1]),e]:[Number.POSITIVE_INFINITY,e]}const Ky=Object.entries(jy).filter(([n])=>!Wy.has(n)).sort((n,e)=>{const t=Ec(n[0]),i=Ec(e[0]);return t[0]!==i[0]?t[0]-i[0]:t[1].localeCompare(i[1])}).map(([n,e])=>({path:Xy(n),label:Gy(n),source:e}));function Xy(n){const e=n.lastIndexOf("/");return`/examples/${e>=0?n.slice(e+1):n}`}function Gy(n){const e=n.indexOf("../../ff/");return e>=0?n.slice(e+9):n}const Jd=[{path:"/examples/fact.ffp",label:"fact.ffp",source:Qd},{path:"/examples/cbrt.ffp",label:"cbrt.ffp",source:Ny},{path:"/examples/sqrt.ffp",label:"sqrt.ffp",source:qy},{path:"/examples/gcd.ffp",label:"gcd.ffp",source:Hy},{path:"/examples/ack.ffp",label:"ack.ffp",source:$y},{path:"/examples/pi.ffp",label:"pi.ffp",source:Vy},...Ky],Yy=Object.assign({"../../ff/lib/core/core.ff":uy,"../../ff/lib/math/ack.ffp":cy,"../../ff/lib/math/arith.ffp":hy,"../../ff/lib/math/atan-core.ffp":fy,"../../ff/lib/math/atan-shared.ffp":dy,"../../ff/lib/math/atan.ffp":py,"../../ff/lib/math/atanh-core.ffp":my,"../../ff/lib/math/atanh.ffp":gy,"../../ff/lib/math/cbrt.ffp":by,"../../ff/lib/math/exp.ffp":yy,"../../ff/lib/math/gcd.ffp":wy,"../../ff/lib/math/log.ffp":ky,"../../ff/lib/math/math.ffp":xy,"../../ff/lib/math/num.ffp":vy,"../../ff/lib/math/pi.ffp":Sy,"../../ff/lib/math/precision.ffp":_y,"../../ff/lib/math/pred.ffp":Cy,"../../ff/lib/math/primes.ffp":Ay,"../../ff/lib/math/prn.ffp":Ty,"../../ff/lib/math/sqrt.ffp":Ey,"../../ff/lib/math/trig.ffp":My,"../../ff/lib/prelude.ffp":Py,"../../ff/lib/seq/seq.ffp":Dy,"../../ff/lib/string/char.ffp":Iy,"../../ff/lib/string/str.ffp":Ly,"../../ff/lib/string/string.ffp":By,"../../ff/lib/tap.ffp":Oy,"../../ff/lib/testing.ffp":Ry,"../../ff/lib/time/time.ffp":zy,"../../ff/lib/time/utc.ffp":Fy}),Qy=Object.fromEntries(Object.entries(Yy).map(([n,e])=>[Uy(n),e])),cs=Object.fromEntries(Jd.map(({path:n,source:e})=>[n,e])),Ji="__custom__",Jy="/examples/fact.ffp",Zy=[...Jd.map(({path:n,label:e})=>`<option value="${n}">${e}</option>`),`<option value="${Ji}">Custom</option>`].join(`
`),Mc=Qd;function Zd(n,e="/main.ffp"){return{[e]:n,...Qy,...cs}}const ew=["playground","repl","codetta","tutorial","help"],tw=new Set(ew);function hs(n){var t;const e=((t=n==null?void 0:n.replace(/^#/,"").split("?")[0])==null?void 0:t.trim().toLowerCase())??"";return e&&tw.has(e)?e:"playground"}function yr(n){const e=new URLSearchParams(n.search.replace(/^\?/,"")),t=n.hash,i=t.indexOf("?");if(i!==-1){const s=new URLSearchParams(t.slice(i+1));for(const[o,l]of s)e.set(o,l)}const r=e.toString();return r?`?${r}`:""}function ep(n){return new URLSearchParams(yr(n).replace(/^\?/,""))}const Ur="example",fs="codetta",ds="etude";function tp(n){if(hs(n.hash)!=="codetta")return null;const e=ep(n);return e.get(fs)??e.get(ds)}function ql(n){const e=new URLSearchParams(n.search);n.tab==="playground"?n.codeParam?(e.set("code",n.codeParam),e.delete(Ur)):n.exampleParam?(e.delete("code"),e.set(Ur,n.exampleParam)):(e.delete("code"),e.delete(Ur)):(e.delete("code"),e.delete(Ur)),n.tab==="codetta"&&n.etudeParam?(e.set(fs,n.etudeParam),e.delete(ds)):(e.delete(fs),e.delete(ds));const t=e.toString();return`${n.pathname}#${n.tab}${t?`?${t}`:""}`}function Pc(){return{output:"",preprocessed:"",ir:"",bytecode:"",compiledBytes:0,issues:[],stack:[],logs:[],exitCode:0,compileMs:0,executeMs:0,terminal:"cancelled",vmCyclesExecuted:0}}function nw(n){return{output:"",preprocessed:"",ir:"",bytecode:"",compiledBytes:0,issues:[],stack:[],logs:[n],exitCode:1,compileMs:0,executeMs:0,terminal:"error",vmCyclesExecuted:0}}class iw{constructor(){zt(this,"worker",null);zt(this,"nextRunId",1);zt(this,"pending",null);zt(this,"activeRunId",null)}ensureWorker(){this.worker||(this.worker=new Worker(new URL("/f-flat-minor/assets/ff-playground-worker-De3g8fXm.js",import.meta.url),{type:"module"}),this.worker.onmessage=e=>{this.handleMessage(e.data)})}handleMessage(e){var t,i,r,s,o,l,a,u;if(e.type==="COMPILED"){((t=this.pending)==null?void 0:t.runId)===e.runId&&(this.pending.compileMs=e.compileMs,(r=(i=this.pending).onProgress)==null||r.call(i,{vmCyclesExecuted:0,compileMs:e.compileMs,executeElapsedMs:0,preprocessed:e.preprocessed,ir:e.ir,bytecode:e.bytecode,compiledBytes:e.compiledBytes}));return}if(e.type==="PROGRESS"){if(((s=this.pending)==null?void 0:s.runId)===e.runId){const c=this.pending.compileMs;(l=(o=this.pending).onProgress)==null||l.call(o,{vmCyclesExecuted:e.vmCyclesExecuted,compileMs:c,executeElapsedMs:e.executeElapsedMs})}return}if(e.type==="ERROR"){if(((a=this.pending)==null?void 0:a.runId)!==e.runId)return;const c=this.pending;this.pending=null,this.activeRunId=null,c.resolve(nw(e.message));return}if(e.type==="RESULT"){if(((u=this.pending)==null?void 0:u.runId)!==e.runId)return;const c=this.pending;this.pending=null,this.activeRunId=null,c.resolve(e.result)}}runProgram(e){this.ensureWorker();const t=this.nextRunId++;this.activeRunId=t;let i;const r=()=>{this.cancelSoft(t),i=window.setTimeout(()=>{var o,l;if(((o=this.pending)==null?void 0:o.runId)===t&&(this.cancelHard(),((l=this.pending)==null?void 0:l.runId)===t)){const a=this.pending;this.pending=null,this.activeRunId=null,a.resolve(Pc())}},750)},s=e.signal;if(s){if(s.aborted)return Promise.resolve(Pc());s.addEventListener("abort",r,{once:!0})}return new Promise(o=>{this.pending={runId:t,resolve:o,onProgress:e.onProgress},this.worker.postMessage({type:"RUN",runId:t,source:e.source,stdin:e.stdin,optimize:e.optimize,filename:e.filename,yieldIntervalMs:e.yieldIntervalMs,yieldSliceMax:e.yieldSliceMax})}).finally(()=>{s&&s.removeEventListener("abort",r),window.clearTimeout(i)})}cancelSoft(e){var i;const t=e??this.activeRunId;t!==null&&((i=this.worker)==null||i.postMessage({type:"CANCEL",runId:t}))}cancelHard(){this.worker&&(this.worker.terminate(),this.worker=null)}}function rw(){var e,t,i,r,s;return!!(((i=(t=(e=globalThis.Deno)==null?void 0:e.stdout)==null?void 0:t.isTerminal)==null?void 0:i.call(t))??((s=(r=globalThis.process)==null?void 0:r.stdout)==null?void 0:s.isTTY)??!1)}function $a(n,e){return rw()?`\x1B[${n}m${e}\x1B[0m`:e}function sw(n){return $a(34,n)}function ow(n){return $a(32,n)}function pn(n){return $a(36,n)}const A={NOP:0,CALL:1,PUTC:2,GETC:3,PUTN:5,CLOCK:6,DROP:8,PUSHR:14,PULLR:15,SHIFTL:16,SHIFTR:17,CLR:24,RAND:26,EXIT:27,DUP:33,DEPTH:35,SWAP:36,MOD:37,AND:38,STASH:40,FETCH:41,MUL:42,ADD:43,CONS:44,SUB:45,PRN:46,DIV:47,MARK:58,DEF:59,LT:60,EQ:61,GT:62,IF:63,BRA:91,KET:93,POW:94,OR:124,NOT:126},Mi={nop:A.NOP,eval:A.CALL,";":A.DEF,":":A.MARK,clr:A.CLR,rand:A.RAND,exit:A.EXIT,".":A.PRN,putc:A.PUTC,getc:A.GETC,putn:A.PUTN,clock:A.CLOCK,drop:A.DROP,swap:A.SWAP,dup:A.DUP,"<<":A.SHIFTL,">>":A.SHIFTR,"+":A.ADD,"-":A.SUB,cons:A.CONS,"*":A.MUL,"/":A.DIV,"<":A.LT,"=":A.EQ,">":A.GT,"?":A.IF,"%":A.MOD,"&":A.AND,"(":A.STASH,")":A.FETCH,"q<":A.PUSHR,"q>":A.PULLR,depth:A.DEPTH,"^":A.POW,"[":A.BRA,"]":A.KET,"|":A.OR,"~":A.NOT},ai=255,lw=n=>n,aw=n=>n,ee={call:"call",push:"push"},uw=6,Hl=10,cw=new Map([[BigInt(A.MARK),":"],[BigInt(A.DEF),";"],[BigInt(A.BRA),"["],[BigInt(A.KET),"]"]]);function hw(n){return(""+n.value).padEnd(Hl," ")}function fw(n,e){var t;return e?e.padEnd(Hl," "):n.op===ee.push&&((t=n.meta)!=null&&t.pointer)?`[${n.value}]`.padEnd(Hl," "):hw(n)}function dw(n){return n.trim()?`/* ${n} */`:""}function pw(n){var l,a,u;const e=((l=gw(n))==null?void 0:l.toUpperCase())||"",t=n.op===ee.call?cw.get(n.value):void 0,i=t!==void 0,r=fw(n,t),s=((u=(a=n.meta)==null?void 0:a.comment)==null?void 0:u.trim())||(n.op===ee.call&&!i?e:""),o=(n.op===ee.call&&!t?"EVAL":"").padEnd(uw," ");return[aw(r),lw(o),dw(s)].join(" ")}function mw(n){for(const e in Mi)if(Mi[e]===n)return e;return""}function gw(n){var e,t;if(n.op===ee.call||n.op===ee.push&&((e=n.meta)!=null&&e.pointer))return((t=n.meta)==null?void 0:t.name)||mw(Number(n.value))||""}function np(n){return n.map(pw).join(`
`)}function bw(n){const e=[];let t=0;for(;t<n.length;){const i=n[t++]??0n,r=n[t++]??0n;i===0n?e.push({op:ee.push,value:r}):e.push({op:ee.call,value:r})}return e}function yw(n){return n=n.replace(/\\U([A-Fa-f0-9]{8})/g,(e,t)=>Dc(t)),n=n.replace(/\\u([A-Fa-f0-9]{4})/g,(e,t)=>Dc(t)),n.replace(/\\0/g,"\0").replace(/\\b/g,"\b").replace(/\\t/g,"	").replace(/\\n/g,`
`).replace(/\\v/g,"\v").replace(/\\f/g,"\f").replace(/\\r/g,"\r").replace(/\\'/g,"'").replace(/\\"/g,'"').replace(/\\s/g," ").replace(/\\\\/g,"\\")}function Dc(n){let e="",t=parseInt(n,16);return t<=65535?e+=String.fromCharCode(t):t<=1114111?(t-=65536,e+=String.fromCharCode(55296|t>>10)+String.fromCharCode(56320|t&1023)):e+=`hex2Char error: Code point out of range: ${ww(t)}`,e}function ww(n){return(n+0).toString(16).toUpperCase()}const ip="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",rp=new Map;ip.split("").forEach(function(n,e){rp.set(n,e)});const kw=5n,sp=1n<<kw,op=Number(sp),lp=sp-1n;function xw(n){return n.map(Cw).map(Aw).join("")}function vw(n){return Ew(Tw(n)).map(Mw)}function Sw(n){return n>=0n?n<<1n:(-n<<1n)+1n}function _w(n){return n&1n?-(n>>1n):n>>1n}function Cw(n){if(n===0n)return[0];n=Sw(n);const e=[];for(;n>0;){let t=Number(n&lp);n>>=5n,n>0&&(t|=op),e.push(t)}return e}function Aw(n){return n.map(e=>ip[e]).join("")}function Tw(n){return n.split("").map(e=>{const t=rp.get(e);if(t===void 0)throw new Error(`${n} is not a valid base64 encoded VLQ`);return t})}function Ew(n){const e=[];let t=[];if(n.forEach(i=>{t.push(i),(i&op)===0&&(e.push(t),t=[])}),t.length>0)throw new Error("Malformed VLQ sequence: The last VLQ never ended.");return e}function Mw(n){const e=n.reverse().reduce((t,i)=>(t<<=5n,t|=BigInt(i)&lp,t),0n);return _w(e)}const Pw="/*",Dw="*/";function To(n){if(!(n==="-"||n==="+"))try{let e=1n;return n=n.replaceAll("_",""),n.startsWith("-0")&&(e=-1n,n=n.replace("-","")),n.includes("e")||n.includes("E")?e*BigInt(+n):e*BigInt(n)}catch{return}}class mt{constructor(e={}){this.symbols=new Map,this._nextCode=-1,this.host=e;let t;for(t in Mi)this.symbols.set(t,BigInt(Mi[t]))}static tokenize(e){return e.split(/\s+/).filter(Boolean).map(t=>{const i=To(t);return i!==void 0?i:t})}static tokenizeWithSpans(e){const t=[],i=/\S+/g;let r=0,s=0,o=0;const l=u=>{for(;o<u;){const c=e[o];c==="\r"?(e[o+1]===`
`&&o++,r++,s=0):c===`
`?(r++,s=0):s++,o++}};let a;for(;(a=i.exec(e))!==null;){const u=a.index;l(u);const c=a[0]??"",h=To(c);t.push({raw:c,value:h!==void 0?h:c,line:r,character:s,length:c.length,offset:u}),l(u+c.length)}return t}static compileToBase64(e){const t=e.flatMap(i=>{if(i.op===ee.call&&i.value===0n)return[];const r=i.value<<1n;return[i.op===ee.push?r:r|1n]});return xw(t)}nextCode(){return BigInt(this._nextCode--)}getSymbol(e){e=e.toLowerCase();let t=this.symbols.get(e);return t===void 0&&(t=this.nextCode(),this.symbols.set(e,t)),t}compileToIR(e,t=""){var c,h,f;let i=0;const r=e.length;let s="";const o=[];let l;for(;i<r;)if(l=e[i++],s=this.unwrapTokenValue(l),typeof s=="bigint")a(s);else if(s.length>1&&s.startsWith(".")){const[d]=s.split(" ");switch(d){case".push":o[o.length-1].op=ee.push;break;case".call":o[o.length-1].op=ee.call;break;case".inline":(c=o[o.length-1]).meta||(c.meta={}),o[o.length-1].meta.inline=!0;break;case".unsafe":(h=o[o.length-1]).meta||(h.meta={}),o[o.length-1].meta.unsafe=!0;break;case".pointer":(f=o[o.length-1]).meta||(f.meta={}),o[o.length-1].meta.pointer=!0;break;case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Compiler: .exit requires a host exit handler");case".symbols":this.symbols.forEach((p,m)=>{(this.host.log||console.log)(m,p)});break;case".words":{const p=Array.from(this.symbols,([m])=>m).join(" ");(this.host.log||console.log)(p);break}}}else if(s[0]==="'"&&s.length>1)yw(s).replace(/^'/,"").replace(/'$/,"").split("").forEach(d=>{a(d.charCodeAt(0),{comment:d})});else if(s.endsWith(":")&&s.length>1){const d=s.replace(/:$/,"");a(this.getSymbol(d),{name:`${d}`,pointer:!0}),u(A.MARK,{name:":"})}else if(s===Pw){const d=l,p=[];for(;i<e.length&&(l=e[i++],s=this.unwrapTokenValue(l),s!==Dw);)p.push(s);u(0n,{comment:p.join(" ")},d)}else if(s.startsWith("[")&&s.endsWith("]")){const d=s.replace(/^\[/,"").replace(/\]$/,""),p=To(d);p!==void 0?a(p,{name:d,pointer:!0}):a(this.getSymbol(d),{name:d,pointer:!0})}else u(this.getSymbol(s),{name:s});return o;function a(d,p={},m=l){o.push({value:BigInt(d),op:ee.push,meta:{...p,...mt.toInstructionMeta(m,t)}})}function u(d,p={},m=l){o.push({value:BigInt(d),op:ee.call,meta:{...p,...mt.toInstructionMeta(m,t)}})}}unwrapTokenValue(e){return typeof e=="string"||typeof e=="bigint"?e:e.value}static toInstructionMeta(e,t){return!e||typeof e=="string"||typeof e=="bigint"?{filename:t}:{filename:t,line:e.line,character:e.character,length:e.length,offset:e.offset}}validate(e){var s,o;const t=e.slice(),i=[];let r=0;for(;r<t.length;){const l=t[r];if(l.op===ee.call&&l.value===BigInt(A.DEF)){let a=0;for(a=r;a>0&&!(t[a].op===ee.call&&t[a].value===BigInt(A.MARK));a--);const u=t.splice(a-1,r-a+2);(o=(s=u.at(-1))==null?void 0:s.meta)!=null&&o.unsafe||i.push(...this.validateDef(u)),r=a-1}r++}return i.push(...this.validateDef(t,"main")),i}validateDef(e,t){var c,h,f;const i=[];let r=0,s=0,o=0,l=0;const a=[0];if(!e[0])return[];t=ow(t||((h=(c=e[0].meta)==null?void 0:c.name)==null?void 0:h.replace(/^&/,""))||"main");const u=sw(((f=e[0].meta)==null?void 0:f.filename)||"-");for(;r<e.length;){const d=e[r];if(d.op===ee.call){if(d.op===ee.call&&d.value===BigInt(A.MARK)&&s++,d.op===ee.call&&d.value===BigInt(A.DEF)&&s--,d.op===ee.call&&d.value===BigInt(A.BRA)&&(o++,a.push(0)),d.op===ee.call&&d.value===BigInt(A.KET)&&(o--,(a.length>1?a.pop():0)!==0&&i.push(`${u}: Unbalanced queue push ( ${pn("q< q>")} ) in quote in ${t}`)),d.op===ee.call&&(d.value===BigInt(A.PUSHR)||d.value===BigInt(A.STASH))&&(l++,a[a.length-1]++),d.op===ee.call&&(d.value===BigInt(A.PULLR)||d.value===BigInt(A.FETCH))){if(a[a.length-1]===0){const m=d.value===BigInt(A.FETCH)?")":"q>";i.push(`${u}: Queue borrow ( ${pn(m)} ) requires ${pn(".unsafe")} in ${t} (including quotes)`)}l--,a[a.length-1]--}o<0&&i.push(`${u}: Bracket ( ${pn("[ ]")} ) mismatch in ${t}`),s<0&&i.push(`${u}: Definition ( ${pn(": ;")} ) mismatch in ${t}`)}r++}return o!==0&&i.push(`${u}: Unbalanced brackets ( ${pn("[ ]")} ) in ${t}`),l!==0&&i.push(`${u}: Unbalanced queue push ( ${pn("q< q> ( )")} ) in ${t}`),s!==0&&i.push(`${u}: Unbalanced definition ( ${pn(": ;")} ) in ${t}`),i}}const ap="FbAbbCb",Iw=[{mnemonic:"NOP",syntax:"nop",stackEffect:"… nop == …",description:"No operation; does nothing.",opcode:0},{mnemonic:"EVAL",syntax:"eval",stackEffect:"[A] eval == a*",description:"Evaluates a quotation, executing its contents.",opcode:1},{mnemonic:"PUTC",syntax:"putc",stackEffect:"n putc == {prints char(n)}",description:"Prints a character given by its numeric code.",opcode:2},{mnemonic:"GETC",syntax:"getc",stackEffect:"getc == n {reads char}",description:"Reads a single character from input and pushes its code.",opcode:3},{mnemonic:"PUTN",syntax:"putn",stackEffect:"n putn == {prints n}",description:"Prints a number to output.",opcode:5},{mnemonic:"CLOCK",syntax:"clock",stackEffect:"clock == n {reads clock}",description:"Returns the current time as a Unix timestamp.",opcode:6},{mnemonic:"DROP",syntax:"drop",stackEffect:"a drop ==",description:"Removes the top value from the stack.",opcode:8},{mnemonic:"PUSHR",syntax:"q<",stackEffect:"a q< == | …a",description:"Pushes a value onto the return stack.",opcode:14},{mnemonic:"PULLR",syntax:"q>",stackEffect:"q> == a | a…",description:"Pops a value from the return stack onto the main stack.",opcode:15},{mnemonic:"SHIFTL",syntax:"<<",stackEffect:"a b << == n",description:"Left-shifts a by b bits.",opcode:16},{mnemonic:"SHIFTR",syntax:">>",stackEffect:"a b >> == n",description:"Right-shifts a by b bits.",opcode:17},{mnemonic:"CLR",syntax:"clr",stackEffect:"… clr ==",description:"Clears the entire stack.",opcode:24},{mnemonic:"RAND",syntax:"rand",stackEffect:"n rand == r {0 <= r < n}",description:"Generates a random number between 0 and n-1.",opcode:26},{mnemonic:"EXIT",syntax:"exit",stackEffect:"n exit == {exits with code n}",description:"Exits the program with the given exit code.",opcode:27},{mnemonic:"DUP",syntax:"dup",stackEffect:"a dup == a a",description:"Duplicates the top value on the stack.",opcode:33},{mnemonic:"DEPTH",syntax:"depth",stackEffect:"… depth == … n",description:"Pushes the current stack depth.",opcode:35},{mnemonic:"SWAP",syntax:"swap",stackEffect:"a b swap == b a",description:"Swaps the top two values on the stack.",opcode:36},{mnemonic:"MOD",syntax:"%",stackEffect:"a b % == n",description:"Computes the remainder of a divided by b.",opcode:37},{mnemonic:"AND",syntax:"&",stackEffect:"a b & == n",description:"Bitwise AND of a and b.",opcode:38},{mnemonic:"STASH",syntax:"(",stackEffect:"… ( == {moves stack to queue}",description:"Moves values from the stack to the queue.",opcode:40},{mnemonic:"FETCH",syntax:")",stackEffect:") == … {restores stack from queue}",description:"Moves values from the queue back to the stack.",opcode:41},{mnemonic:"MUL",syntax:"*",stackEffect:"a b * == n",description:"Multiplies a by b.",opcode:42},{mnemonic:"ADD",syntax:"+",stackEffect:"a b + == n",description:"Adds a and b together.",opcode:43},{mnemonic:"SUB",syntax:"-",stackEffect:"a b - == n",description:"Subtracts b from a.",opcode:45},{mnemonic:"DUMP",syntax:".",stackEffect:"… . == … {prints stack}",description:"Prints the entire stack to output.",opcode:46},{mnemonic:"DIV",syntax:"/",stackEffect:"a b / == n",description:"Divides a by b (integer division).",opcode:47},{mnemonic:"MARK",syntax:":",stackEffect:"n : == {begin definition(n)}",description:"Begins a new word definition with name n.",opcode:58},{mnemonic:"DEF",syntax:";",stackEffect:"; == {end definition}",description:"Ends the current word definition.",opcode:59},{mnemonic:"LT",syntax:"<",stackEffect:"a b < == flag",description:"Pushes true if a is less than b.",opcode:60},{mnemonic:"EQ",syntax:"=",stackEffect:"a b = == flag",description:"Pushes true if a equals b.",opcode:61},{mnemonic:"GT",syntax:">",stackEffect:"a b > == flag",description:"Pushes true if a is greater than b.",opcode:62},{mnemonic:"WHEN",syntax:"?",stackEffect:"flag [A] ? == a*",description:"Executes the quotation if flag is true.",opcode:63},{mnemonic:"BRA",syntax:"[",stackEffect:"[ == {begin quotation}",description:"Begins a quotation (anonymous code block).",opcode:91},{mnemonic:"KET",syntax:"]",stackEffect:"] == [A] {end quotation}",description:"Ends a quotation and pushes it to the stack.",opcode:93},{mnemonic:"POW",syntax:"^",stackEffect:"a b ^ == n",description:"Computes a raised to the power of b.",opcode:94},{mnemonic:"OR",syntax:"|",stackEffect:"a b | == n",description:"Bitwise OR of a and b.",opcode:124},{mnemonic:"NOT",syntax:"~",stackEffect:"a ~ == n'",description:"Bitwise NOT of a.",opcode:126}],Lw={words:Iw},up=new Map;for(const n of Lw.words)up.set(n.opcode,n);function Bw(n){return up.get(n)}const Ow=[BigInt(A.DEF),BigInt(A.KET),BigInt(A.MARK),BigInt(A.BRA)],ni=0n,ii=1n;class wr{constructor(e){this.stack=[],this.queue=[],this.defs=new Map,this.symbols=new Map,this.depth=0,this.nextAnonOp=ai+1,this.traceOn=!1,this.traceFormat="human",this.traceVerbose=!1,this.traceQueueMax=8,this.traceStackMax=32,this.base=10,this.statsOn=!1,this.profileOn=!1,this.stats={system_instructions_called:0,user_instructions_called:0,max_stack_depth:0,max_queue_depth:0},this.profile={},this.platform=e,this.setup()}static fromBase64(e){return vw(e).flatMap(t=>{const i=t&1n,r=t>>1n;return[i,r]})}getStack(){return this.stack.slice()}peek(){const e=this.stack.length;if(e>0)return this.stack[e-1];throw new Error("Peek: stack underflow")}pop(){if(this.stack.length>0)return this.stack.pop();throw new Error("Pop: stack underflow")}push(e){this.stack.push(e)}poke(e){const t=this.stack.length;if(t>0){this.stack[t-1]=e;return}throw new Error("Poke: stack underflow")}clear(){this.stack.splice(0,this.stack.length)}queuePush(e,t){this.queue.push(e,t)}queueUnshift(e,t){this.queue.unshift(e,t)}queueShift(){return[this.queue.shift()??0n,this.queue.shift()??0n]}queuePop(){const e=this.queue.pop()??0n;return[this.queue.pop()??0n,e]}defineSystem(e,t){const i=BigInt(t),r=this.getName(i);if(this.defs.has(i))throw new Error(`Define: cannot redefine system word "${r}"`);this.defs.set(i,e)}defineUser(e,t){const i=this.getName(t);if(t>-1&&t<ai)throw new Error(`Define: cannot define system op "${i}"`);if(this.defs.has(t))throw t>ai?new Error(`Define: cannot redefine anon op "${i}"`):new Error(`Define: cannot redefine user op "${i}"`);this.defs.set(t,e)}callSystem(e){var r;const t=this.defs.get(e);if(typeof t=="function"){if(this.statsOn&&this.stats.system_instructions_called++,this.profileOn){const s=performance.now();t();const o=performance.now(),l=this.getName(e)||Number(e);(r=this.profile)[l]||(r[l]=[0,0]),this.profile[l][0]++,this.profile[l][1]!=0,this.profile[l][1]+=o-s;return}return t()}const i=this.getName(e)||e;throw new Error(`Call: undefined system op "${i}"`)}callUser(e){var r;const t=this.defs.get(e);if(Array.isArray(t)){if(this.statsOn&&this.stats.user_instructions_called++,this.queue.unshift(...t),this.profileOn){const s=this.getName(e,`&${e}`);(r=this.profile)[s]||(r[s]=[0,void 0]),this.profile[s][0]++}return}const i=this.getName(e)||e;throw new Error(`Call: undefined user op "${i}"`)}callOp(e){return e>-1n&&e<ai?this.callSystem(e):this.callUser(e)}loadBigIntCode(e){this.queue.push(...e)}loadIR(e){var i,r;let t=0;for(;t<e.length;){const s=e[t++];if(s.op===ee.call){if(s.value===0n)continue;(i=s.meta)!=null&&i.name&&!this.symbols.has(s.value)&&this.symbols.set(s.value,(r=s.meta)==null?void 0:r.name),this.queuePush(ii,s.value)}else this.queuePush(ni,s.value)}return this.stack}runChunk(e,t){const i=this.queue;let r=!1,s=t,o=0;for(;i.length>0&&o<e;){const[l,a]=this.queueShift(),u=l===ii,c=this.stack.slice();r=!this.depth||u&&Ow.includes(a),u?r?this.callOp(a):(this.push(l),this.push(a)):(r||this.push(l),this.push(a)),this.statsOn&&(this.stats.max_stack_depth=Math.max(this.stats.max_stack_depth,this.stack.length),this.stats.max_queue_depth=Math.max(this.stats.max_queue_depth,i.length/2));const h=s++;this.traceOn&&this.trace({step:h,immediate:r,tag:l,value:a,stackBefore:c,stackAfter:this.traceVerbose||this.traceFormat==="jsonl"?this.stack.slice():void 0}),o++}return s}run(){return this.runChunk(Number.POSITIVE_INFINITY,0),this.stack}async runAsync(e={}){var u;const t=e.yieldIntervalMs??160,i=e.yieldSliceMax??e.yieldEvery??655360;if(!Number.isFinite(t)||t<0)throw new Error(`runAsync: yieldIntervalMs must be a non-negative finite number (received ${t})`);if(!Number.isFinite(i)||i<1)throw new Error(`runAsync: yieldSliceMax / yieldEvery must be a positive finite number (received ${i})`);const r=e.scheduler??(()=>new Promise(c=>{globalThis.setTimeout(c,0)})),s=typeof globalThis.performance<"u"&&typeof globalThis.performance.now=="function"?()=>globalThis.performance.now():()=>globalThis.Date.now();let o=0,l=0,a=!1;for(;this.queue.length>0&&!a;){const c=s(),h=t>0?c+t:c;for(;this.queue.length>0&&!a&&!(t>0&&s()>=h);){const f=o;if(o=this.runChunk(i,o),l+=o-f,(u=e.onChunk)==null||u.call(e,{vmCyclesExecuted:l}),e.shouldContinue&&!e.shouldContinue()){a=!0;break}if(t===0)break}this.queue.length>0&&!a&&await r()}return{stack:this.stack.slice(),cancelled:a,vmCyclesExecuted:l}}trace({step:e,immediate:t,tag:i,value:r,stackBefore:s,stackAfter:o}){const l=this.createTraceEvent(e,t,i,r,s,o);if(this.traceFormat==="jsonl"){this.writeTraceLine(JSON.stringify(l));return}this.writeTraceLine(this.formatHumanTrace(l))}createTraceEvent(e,t,i,r,s,o){const l=i===ii,a=l?this.getName(r,String(r)):String(r),u=this.getQueuePreview();return{step:e,immediate:t,tag:l?"call":"literal",value:String(r),action:a,stack_before:this.limitStack(s).map(String),stack_after:o?this.limitStack(o).map(String):void 0,queue_preview:u,queue_depth:this.queue.length/2}}limitStack(e){return e.length>this.traceStackMax?e.slice(-this.traceStackMax):e}getQueuePreview(){const e=[],t=Math.max(this.traceQueueMax,0);for(let i=0;i<this.queue.length&&e.length<t;i+=2){const r=this.queue[i]??0n,s=this.queue[i+1]??0n,o=r===ii;e.push({tag:o?"call":"literal",value:String(s),action:o?this.getName(s,String(s)):String(s)})}return e}formatHumanTrace(e){const t=this.padHumanAction(e.action),i=this.formatHumanStack(e.stack_before),r=this.formatHumanQueue(e.queue_preview,e.queue_depth),s=this.layoutHumanTraceLine(e.step,i,t,r);if(this.traceVerbose){const o=this.formatHumanStack(e.stack_after??[]);return`${s}
${" ".repeat(String(e.step).length+1)}${o} | immediate=${e.immediate} tag=${e.tag} value=${e.value} stack_depth=${this.stack.length} queue_depth=${e.queue_depth}`}return s}padHumanAction(e){return e.length>=7?e:e.padStart(Math.floor((7+e.length)/2)," ").padEnd(7," ")}layoutHumanTraceLine(e,t,i,r){const s=this.getTraceTerminalWidth(),o=`${e} `;if(o.length>=s)return o.slice(0,s);const l=1,a=Math.min(i.length,Math.max(s-o.length-l*2,1)),u=Math.max(o.length+l,Math.floor((s-a)/2)),c=Math.min(u,Math.max(o.length+l,s-a-l)),h=c+a,f=o.length,d=Math.max(f,c-l),p=Math.min(s,h+l),m=s,b=Math.max(d-f,0),g=Math.max(m-p,0),_=Array.from({length:s},()=>" ");if(this.writeSegment(_,0,o,o.length),this.writeSegment(_,c,i,a),b>0){const S=this.truncateLeft(t,b);this.writeSegment(_,d-S.length,S,S.length)}if(g>0){const S=this.truncateRight(r,g);this.writeSegment(_,p,S,S.length)}return _.join("").replace(/\s+$/,"")}formatHumanStack(e){return e.length===0?"[ ]":`[ ${e.join(" ")} ]`}formatHumanQueue(e,t){const i=e.map(s=>s.tag==="call"?`&${s.action}`:s.value),r=Math.max(t-e.length,0);return r>0&&i.push(`…(+${r})`),i.length===0?"[ ]":`[ ${i.join(" ")} ]`}getTraceTerminalWidth(){var o,l,a,u,c,h,f;const t=globalThis.Deno,i=(l=(o=t==null?void 0:t.stderr)==null?void 0:o.isTerminal)!=null&&l.call(o)&&typeof t.stderr.rid=="number"?t.stderr.rid:(u=(a=t==null?void 0:t.stdout)==null?void 0:a.isTerminal)!=null&&u.call(a)&&typeof t.stdout.rid=="number"?t.stdout.rid:void 0;if(typeof i=="number")try{const d=(c=t==null?void 0:t.consoleSize)==null?void 0:c.call(t,i).columns;if(typeof d=="number"&&d>0)return d}catch{}const r=globalThis.process,s=(h=r==null?void 0:r.stderr)!=null&&h.isTTY&&typeof r.stderr.columns=="number"?r.stderr.columns:(f=r==null?void 0:r.stdout)!=null&&f.isTTY&&typeof r.stdout.columns=="number"?r.stdout.columns:void 0;return typeof s=="number"&&s>0?s:120}truncateLeft(e,t){return t<=0?"":e.length<=t?e:t===1?"…":`…${e.slice(-(t-1))}`}truncateRight(e,t){return t<=0?"":e.length<=t?e:t===1?"…":`${e.slice(0,t-1)}…`}writeSegment(e,t,i,r){if(!(r<=0))for(let s=0;s<r&&s<i.length&&t+s<e.length;s++)e[t+s]=i[s]}writeTraceLine(e){const t=new TextEncoder().encode(`${e}
`);if(this.platform.io.writeError){this.platform.io.writeError(t);return}this.platform.io.write(t)}getName(e,t=String(e)){return this.symbols.has(e)?this.symbols.get(e):String(t)}inspectValue(e){const t=this.symbols.get(e),i=e>=0n&&e<=BigInt(ai),r=this.defs.get(e),s=r!==void 0;let o;Array.isArray(r)&&(o=this.parseDefinitionTokens(r));let l,a;if(i){const u=Bw(Number(e));u&&(l=u.stackEffect,a=u.description)}return{value:e,name:t,isSystem:i,isDefined:s,definition:o,stackEffect:l,description:a}}parseDefinitionTokens(e){const t=[];for(let i=0;i<e.length;i+=2){const r=e[i]??0n,s=e[i+1]??0n,o=r===ii,l=o?this.symbols.get(s):void 0,a=this.defs.has(s);t.push({value:s,tag:r,name:l,isCall:o,isDefined:a})}return t}print(){const e=this.stack.map(t=>t.toString(this.base)).join(" ");this.platform.io.write(new TextEncoder().encode(`[ ${e} ]
`))}loadSourceMap(e){Object.keys(e.symbols).forEach(t=>{this.symbols.set(BigInt(t),e.symbols[t])})}getNextAnonOp(){let e=this.nextAnonOp++;for(;this.defs.has(BigInt(e));)e=this.nextAnonOp++;return BigInt(e)}setup(){const e=new TextEncoder;let t;for(t in Mi)this.symbols.set(BigInt(Mi[t]),t);this.defineSystem(()=>{},A.NOP),this.defineSystem(()=>{const i=this.pop();this.callOp(i)},A.CALL),this.defineSystem(()=>{this.depth--;const[,i]=this.queuePop(),r=this.stack.splice(Number(i||0))||[];this.defineUser(r,this.pop())},A.DEF),this.defineSystem(()=>{this.depth--;const[,i]=this.queuePop(),r=this.stack.splice(Number(i||0))||[],s=this.getNextAnonOp();this.defineUser(r,s),this.depth>0&&this.push(0n),this.push(s)},A.KET),this.defineSystem(()=>{this.depth++;const i=this.stack.length;this.queuePush(ni,BigInt(i))},A.BRA),this.defineSystem(()=>{this.depth++;const i=this.stack.length;this.queuePush(ni,BigInt(i))},A.MARK),this.defineSystem(()=>this.clear(),A.CLR),this.defineSystem(()=>{const i=this.pop();this.platform.exit(Number(i))},A.EXIT),this.defineSystem(()=>{const i=this.pop();this.push(Rw(i))},A.RAND),this.defineSystem(()=>{this.print()},A.PRN),this.defineSystem(()=>{this.push(BigInt(this.platform.now()))},A.CLOCK),this.defineSystem(()=>{const i=e.encode(String.fromCharCode(Number(this.pop())));this.platform.io.write(i)},A.PUTC),this.defineSystem(()=>{this.platform.io.setRaw&&this.platform.io.setRaw(!0);const i=this.platform.io.readByte();this.platform.io.setRaw&&this.platform.io.setRaw(!1),this.push(BigInt(i??0))},A.GETC),this.defineSystem(()=>{const i=e.encode(this.pop().toString(this.base));this.platform.io.write(i)},A.PUTN),this.defineSystem(()=>{this.pop()},A.DROP),this.defineSystem(()=>{const i=this.peek(),r=this.stack[this.stack.length-2];this.stack[this.stack.length-2]=i,this.poke(r)},A.SWAP),this.defineSystem(()=>{this.push(this.peek())},A.DUP),this.defineSystem(()=>{const i=this.pop();this.stack[this.stack.length-1]+=i},A.ADD),this.defineSystem(()=>{const i=this.pop();this.stack[this.stack.length-1]-=i},A.SUB),this.defineSystem(()=>{const i=this.pop();this.stack[this.stack.length-1]*=i},A.MUL),this.defineSystem(()=>{const i=this.pop();if(i===0n)throw new Error("DIV: Division by zero");this.stack[this.stack.length-1]/=i},A.DIV),this.defineSystem(()=>{const i=this.pop();this.stack[this.stack.length-1]%=i},A.MOD),this.defineSystem(()=>{const i=this.pop();this.stack[this.stack.length-1]<<=i},A.SHIFTL),this.defineSystem(()=>{const i=this.pop();this.stack[this.stack.length-1]>>=i},A.SHIFTR),this.defineSystem(()=>{const i=this.pop();this.stack[this.stack.length-1]&=i},A.AND),this.defineSystem(()=>{const i=this.pop();this.stack[this.stack.length-1]**=i},A.POW),this.defineSystem(()=>{this.push(this.pop()>this.pop()?1n:0n)},A.LT),this.defineSystem(()=>{this.push(this.pop()===this.pop()?1n:0n)},A.EQ),this.defineSystem(()=>{this.push(this.pop()<this.pop()?1n:0n)},A.GT),this.defineSystem(()=>{const i=this.pop();this.pop()!==0n&&this.queueUnshift(ii,i)},A.IF),this.defineSystem(()=>{this.queuePush(ni,this.pop())},A.PUSHR),this.defineSystem(()=>{const[,i]=this.queuePop();this.push(i)},A.PULLR),this.defineSystem(()=>{this.push(BigInt(this.stack.length))},A.DEPTH),this.defineSystem(()=>{const i=this.stack.length;this.stack.splice(0,i).forEach(s=>this.queuePush(ni,s)),this.queuePush(ni,BigInt(i))},A.STASH),this.defineSystem(()=>{const[,i]=this.queuePop(),r=Number(i),s=[];for(let o=0;o<r;o++){const[,l]=this.queuePop();s.unshift(l)}this.stack.unshift(...s)},A.FETCH),this.defineSystem(()=>{const i=this.pop();this.stack[this.stack.length-1]|=i},A.OR),this.defineSystem(()=>{const i=this.pop();this.push(~i)},A.NOT),this.defineSystem(()=>{const i=this.pop(),s=[0n,this.pop(),1n,i],o=this.getNextAnonOp();this.defineUser(s,o),this.depth>0&&this.push(0n),this.push(o)},A.CONS)}printProfile(){console.log(),console.log("Profile:");const e=Object.keys(this.profile).map(r=>{const s=this.profile[r][0],o=this.profile[r][1];return{name:r,calls:s,time:o,system:typeof o<"u","ops/ms":o?Math.round(s/o):""}}).sort((r,s)=>s.calls-r.calls),t=e.filter(r=>r.system),i=e.filter(r=>!r.system);console.table(t,["name","calls","ops/ms"]),console.table(i,["name","calls"]),console.log()}printStats(){console.log(),console.log("Interpreter stats:"),console.log(this.stats),console.log()}}function Rw(n){const e=n,t=e.toString().length;let i="";for(;i.length<t;)i+=Math.random().toString().split(".")[1];i=i.slice(0,t);const r="1"+"0".repeat(t);return e*BigInt(i)/BigInt(r)}const jr=BigInt(A.DEF),Ic=BigInt(A.KET),Kr=BigInt(A.MARK),Lc=BigInt(A.BRA),ce=n=>(n=BigInt(n),e=>e.op===ee.call&&e.value===n),ri=n=>(n=BigInt(n),e=>e.op===ee.push&&e.value===n),tt=n=>n.op===ee.push,Bc=n=>n.op===ee.push&&n.value!==0n,zw=[{name:"No operation",pattern:[ce(A.NOP)],replacement:()=>[]},{name:"Null Sequence - SWAP SWAP",pattern:[ce(A.SWAP),ce(A.SWAP)],replacement:()=>[]},{name:"Null Sequence - DUP DROP",pattern:[ce(A.DUP),ce(A.DROP)],replacement:()=>[]},{name:"Null Sequence - PUSHR PULLR",pattern:[ce(A.PUSHR),ce(A.PULLR)],replacement:()=>[]},{name:"Null Sequence - CLOCK DROP",pattern:[ce(A.CLOCK),ce(A.DROP)],replacement:()=>[]},{name:"Null Sequence - RAND DROP",pattern:[ce(A.RAND),ce(A.DROP)],replacement:()=>[]},{name:"Null Sequence - DEPTH DROP",pattern:[ce(A.DEPTH),ce(A.DROP)],replacement:()=>[]},{name:"Null Sequence - NOT NOT",pattern:[ce(A.NOT),ce(A.NOT)],replacement:()=>[]},{name:"Indirect calls - n EVAL",pattern:[tt,ce(A.CALL)],replacement:n=>{var e,t;return[{op:ee.call,value:n.value,meta:{name:(t=(e=n.meta)==null?void 0:e.name)==null?void 0:t.replace(/^&/,"")}}]}},{name:"Null Sequence - n DROP",pattern:[tt,ce(A.DROP)],replacement:()=>[]},{name:"Constant Folding - a b ADD",pattern:[tt,tt,ce(A.ADD)],replacement:(n,e)=>[{op:ee.push,value:n.value+e.value}]},{name:"Algebraic Simplification - 0 ADD",pattern:[ri(0),ce(A.ADD)],replacement:()=>[]},{name:"Algebraic Simplification - swap ADD",pattern:[ce(A.SWAP),ce(A.ADD)],replacement:(n,e)=>[e]},{name:"Constant Folding - a b SUB",pattern:[tt,tt,ce(A.SUB)],replacement:(n,e)=>[{op:ee.push,value:n.value-e.value}]},{name:"Algebraic Simplification - 0 SUB",pattern:[ri(0),ce(A.SUB)],replacement:()=>[]},{name:"Constant Folding - a b MUL",pattern:[tt,tt,ce(A.MUL)],replacement:(n,e)=>[{op:ee.push,value:n.value*e.value}]},{name:"Algebraic Simplification - 1 MUL",pattern:[ri(1),ce(A.MUL)],replacement:()=>[]},{name:"Algebraic Simplification - swap MUL",pattern:[ce(A.SWAP),ce(A.MUL)],replacement:(n,e)=>[e]},{name:"Constant Folding - a b DIV",pattern:[tt,Bc,ce(A.DIV)],replacement:(n,e)=>[{op:ee.push,value:n.value/e.value}]},{name:"Algebraic Simplification - 1 DIV",pattern:[ri(1),ce(A.DIV)],replacement:()=>[]},{name:"Constant propagation - a DUP",pattern:[tt,ce(A.DUP)],replacement:n=>[n,n]},{name:"Unreachable Code - 0 &b IF",pattern:[ri(0),tt,ce(A.IF)],replacement:()=>[]},{name:"Flows-Of-Control Optimizations - !0 &b IF",pattern:[Bc,tt,ce(A.IF)],replacement:(n,e,t)=>{var i,r;return[{op:ee.call,value:e.value,meta:{name:(r=(i=e.meta)==null?void 0:i.name)==null?void 0:r.replace(/^&/,"")}}]}},{name:"Null Sequence - 0 eval",pattern:[ri(0),ce(A.CALL)],replacement:()=>[]},{name:"Empty List - [ ]",pattern:[ce(A.BRA),ce(A.KET)],replacement:()=>[{op:ee.push,value:0n,meta:{pointer:!0,name:"0"}}]},{name:"a q< b a> - b a",pattern:[tt,ce(A.PUSHR),tt,ce(A.PULLR)],replacement:(n,e,t)=>[t,n]}];class Fw{constructor(){this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0},this.minOptPasses=2,this.maxOptPasses=20,this.defs=new Map,this.calledWords=new Set,this.optimized=[],this.nextAnonOp=ai+1}optimize(e){this.reset(),this.stats.pre_optimization_ir_size=e.length,this.optimized=e;let t;do t=this.optimized.length,this.optLoop();while((this.optimized.length<t||this.stats.optimization_passes<this.minOptPasses)&&this.stats.optimization_passes<this.maxOptPasses);return this.optimized=this.pullDefs(this.optimized),this.optimized=this.addReferencedWords(this.optimized),this.stats.post_optimization_ir_size=this.optimized.length,this.optimized}optLoop(){this.optimized=this.peepholeOptimization(this.optimized),this.optimized=this.getDefs(this.optimized),this.optimized=this.inlineWords(this.optimized,4),this.stats.optimization_passes++}reset(){this.optimized=[],this.defs=new Map,this.calledWords=new Set,this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0}}getDefs(e){var i;let t=0;for(;t<e.length;){const r=e[t];if(r.op===ee.call){if(r.value===Ic){this.stats.optimization_passes===0&&this.stats.user_defined_anon_defs++,r.meta??(r.meta={}),(i=r.meta).uid??(i.uid=this.nextAnonOp++);let s=t;for(;s-- >0;){const u=e[s];if(u.op===ee.call&&u.value===Lc)break}const o=BigInt(r.meta.uid),l={op:ee.push,value:o,meta:{pointer:!0}},a=e.slice(s,t+1);a.unshift(l),a[1]={...a[1],value:Kr,meta:{...a[1].meta,name:":"}},a[a.length-1]={...a[a.length-1],value:jr,meta:{...a[a.length-1].meta,name:";"}},this.defs.set(o,a)}else if(r.value===jr){this.stats.optimization_passes===0&&this.stats.user_defined_named_defs++;let s=t;for(;s-- >0;){const a=e[s];if(a.op===ee.call&&a.value===Kr)break}const o=e[s-1];o.meta||(o.meta={}),o.meta.pointer=!0;const l=e.slice(s-1,t+1);this.defs.set(o.value,l)}}t++}return e}pullDefs(e,t=!1){var s;const i=e.slice();let r=0;for(;r<i.length;){const o=i[r];if(o.op===ee.call){if(o.value===Ic){o.meta??(o.meta={}),(s=o.meta).uid??(s.uid=this.nextAnonOp++);const l=r;for(;r-- >0;){const h=i[r];if(h.op===ee.call&&h.value===Lc)break}const a=BigInt(o.meta.uid),u={op:ee.push,value:a,meta:{pointer:!0}},c=i.splice(r,l-r+1,u);c.unshift(u),c[1]={...c[1],value:Kr,meta:{...c[1].meta,name:":"}},c[c.length-1]={...c[c.length-1],value:jr,meta:{...c[c.length-1].meta,name:";"}},this.defs.set(a,c)}else if(o.value===jr&&!t){const l=r;for(;r-- >0;){const c=i[r];if(c.op===ee.call&&c.value===Kr)break}const a=i[r-1];a.meta||(a.meta={}),a.meta.pointer=!0;const u=i.splice(r-1,l-r+2);r=r-2,this.defs.set(u[0].value,u)}}r++}return i}peepholeOptimization(e){const t=e.slice();for(;;){const i=this.stats.peephole_optimizations;let r=0;for(;r<t.length;){for(const s of zw){const{pattern:o,replacement:l}=s;if(r+o.length>t.length)continue;if(o.every((u,c)=>u(t[r+c]))){this.stats.peephole_optimizations++;const u=t.slice(r,r+o.length);t.splice(r,o.length,...l(...u)),r=Math.max(0,r-o.length-1);break}}r++}if(this.stats.peephole_optimizations===i)break}return t}inlineWords(e,t=1,i=[]){return e.flatMap(r=>{var s,o,l,a;if((s=r.meta)!=null&&s.unsafe)return r;if(r.op===ee.call&&this.defs.has(r.value)){if(i.includes(r.value))return r;const u=this.defs.get(r.value);if(!u)return r;const c=u[u.length-1];if((o=c.meta)!=null&&o.unsafe)return r;if((l=c.meta)!=null&&l.inline||(a=r.meta)!=null&&a.inline)return this.stats.inlined_calls++,this.inlineWords(u.slice(2,-1),1/0,i.concat(r.value));if(u.length<=t+3)return this.stats.inlined_calls++,this.inlineWords(u.slice(2,-1),t,i.concat(r.value))}return r})}addReferencedWords(e){return e.slice().forEach(t=>{var i;t.op===ee.push&&((i=t.meta)!=null&&i.pointer)?this.addDef(t.value):t.op===ee.call&&this.addDef(t.value)}),e}addDef(e){if(!this.calledWords.has(e)){const t=this.defs.get(e);if(t)return this.stats.post_optimization_user_defs++,this.calledWords.add(e),this.optimized.unshift(...t),this.addReferencedWords(t)}}}class Sn{constructor(e,t,i){this.imported=new Set,this.importPrefixes=new Map,this.macroPreludeReady=!1,this.rootFilename=null,this.host=e,this.engine=t.engine,this.compiler=t.compiler||new mt,i!=null&&i.macroEngineBootstrapFile&&this.bootstrapMacroEngine(i.macroEngineBootstrapFile)}static tokenize(e){return e.split(/[\r\n]+/)}preprocess(e,t="-"){const i=this.rootFilename===null;i&&t!=="-"&&(this.rootFilename=t);try{return this.preprocessLines(e,t)}finally{i&&(this.rootFilename=null)}}preprocessLines(e,t,i){return e.map(r=>{if(r.length>1&&r[0]==="."){const[s,...o]=r.split(" ");if(s[0]==="."&&s.length>1){switch(s){case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Preprocessor: .exit requires a host exit handler");case".load":{const l=this.findFile(o.join(" "),t),a=this.host.readTextFile(l);return this.preprocessLines(Sn.tokenize(a),l)}case".import":{const l=this.findFile(o.join(" "),t);if(!this.imported.has(l)){this.imported.add(l);const a=this.host.readTextFile(l);return this.preprocessLines(Sn.tokenize(a),l,l)}return""}case".m":return this.runMacro(o.join(" "),r);case".ff":return this.runMacro(o.join(" "),r);case".ffp":{if(!this.macroPreludeReady)throw new Error("Preprocessor: .ffp requires prelude-enabled macro context");return this.runMacro(o.join(" "),r)}}return""}}return i?this.mangleImportedLine(r,i):r}).join(`
`)}findFile(e,t="-"){if(t&&t!=="-"&&!this.host.path.isAbsolute(e)){const i=this.host.path.dirname(t),r=this.host.path.resolve(i,e);if(this.host.fileExists(r))return r}if(this.host.fileExists(e))return e;throw'File not found: "'+e+'"'}bootstrapMacroEngine(e){const t=this.findFile(e),i=this.host.readTextFile(t),s=new Sn(this.host,{engine:this.engine,compiler:this.compiler}).preprocess(Sn.tokenize(i),t),o=this.compiler.compileToIR(mt.tokenize(s),t);this.engine.loadIR(o),this.engine.run(),this.engine.clear(),this.macroPreludeReady=!0}runMacro(e,t){const i=this.compiler.compileToIR(mt.tokenize(e));this.engine.loadIR(i),this.engine.run();const r=this.engine.getStack();return this.engine.clear(),r.map(String).join(" ")+` /* ${t} */`}mangleImportedLine(e,t){const i=this.getImportPrefix(t);return e.split(/(\s+)/).map(r=>!r||/\s+/.test(r)?r:this.mangleImportedToken(r,i)).join("")}mangleImportedToken(e,t){return e.startsWith("[__")?`[${t}${e.slice(3)}`:e.startsWith("__")?`${t}${e.slice(2)}`:e}getImportPrefix(e){const t=this.importPrefixes.get(e);if(t)return t;const r=this.getNormalizedImportPath(e).replace(/[^A-Za-z0-9]+/g,"_").replace(/^_+|_+$/g,"").replace(/_+/g,"_")||"module",s=this.hashPath(e),o=`__${r}_${s}__`;return this.importPrefixes.set(e,o),o}getNormalizedImportPath(e){if(this.rootFilename&&this.rootFilename!=="-"){const t=this.host.path.dirname(this.rootFilename),i=this.host.path.relative(t,e);if(i)return i.replace(/\\/g,"/")}return e.replace(/\\/g,"/")}hashPath(e){let t=2166136261;for(let i=0;i<e.length;i++)t^=e.charCodeAt(i),t=Math.imul(t,16777619)>>>0;return t.toString(36)}}function Pi(n){const e=n.startsWith("/"),t=n.split("/").filter(Boolean),i=[];for(const r of t)if(r!=="."){if(r===".."){i.pop();continue}i.push(r)}return`${e?"/":""}${i.join("/")}`||(e?"/":".")}function Nw(n){const e=Pi(n),t=e.lastIndexOf("/");return t<=0?e.startsWith("/")?"/":".":e.slice(0,t)}function qw(...n){const e=n.filter(Boolean).join("/").replaceAll(/\/+/g,"/");return Pi(e)}function Hw(n,e){const t=Pi(n).split("/").filter(Boolean),i=Pi(e).split("/").filter(Boolean);let r=0;for(;r<t.length&&r<i.length&&t[r]===i[r];)r++;const s=t.length-r,o=i.slice(r);return Array(s).fill("..").concat(o).join("/")||"."}function cp(n){return{readTextFile(e){const t=Pi(e),i=n[t];if(typeof i!="string")throw new Error(`Virtual file not found: ${t}`);return i},fileExists(e){return typeof n[Pi(e)]=="string"},path:{isAbsolute(e){return e.startsWith("/")},dirname:Nw,relative:Hw,resolve:qw}}}function hp(n={}){const e=new TextDecoder,t=new TextEncoder,i=Array.from(t.encode(n.stdin??""));return{io:{write(r){var s;(s=n.onWrite)==null||s.call(n,e.decode(r))},readByte(){return i.shift()??null}},exit(r){var s;(s=n.onExit)==null||s.call(n,r)},now(){return Date.now()}}}const $w="/lib/prelude.ffp",Vw="/main.ffp";function Va(n){return ap.length+n.length}function fp(n){return n?`${ap}${n}`:""}function Oc(n,e){const t=console.log;console.log=(...i)=>{n(i.map(String).join(" "))};try{return e()}finally{console.log=t}}async function Ww(n,e){const t=console.log;console.log=(...i)=>{n(i.map(String).join(" "))};try{return await e()}finally{console.log=t}}function Uw(n,e,t={}){let i="";const r=[];let s=0;const o=t.filename??Vw,l=hp({stdin:e,onWrite(p){i+=p},onExit(p){s=p}}),a=new mt,u=new wr(l),c=new mt,h=new wr(l),f=Zd(n,o),d=new Sn(cp(f),{engine:h,compiler:c},{macroEngineBootstrapFile:$w});return{compiler:a,engine:u,preprocessor:d,filename:o,logs:r,getOutput(){return i},getExitCode(){return s}}}function jw(n,e,t,i={}){const r=Uw(n,e,i),s=performance.now(),o=Oc(a=>r.logs.push(a),()=>{const a=r.preprocessor.preprocess(Sn.tokenize(n),r.filename);let u=r.compiler.compileToIR(mt.tokenize(a),r.filename);const c=r.compiler.validate(u);t&&(u=new Fw().optimize(u));const h=np(u),f=mt.compileToBase64(u),d=Va(f);return r.engine.loadIR(u),{preprocessed:a,formattedIr:h,bytecode:f,compiledBytes:d,issues:c}}),l=performance.now();return{preprocessed:o.preprocessed,ir:o.formattedIr,bytecode:o.bytecode,compiledBytes:o.compiledBytes,issues:o.issues,compileMs:l-s,execute(){const a=performance.now();Oc(c=>r.logs.push(c),()=>{r.engine.run()});const u=performance.now();return{output:r.getOutput(),stack:r.engine.getStack().map(String),logs:[...r.logs],exitCode:r.getExitCode(),executeMs:u-a,cancelled:!1,vmCyclesExecuted:0}},async executeAsync(a={}){const u=performance.now(),c=await Ww(f=>r.logs.push(f),async()=>await r.engine.runAsync(a)),h=performance.now();return{output:r.getOutput(),stack:r.engine.getStack().map(String),logs:[...r.logs],exitCode:r.getExitCode(),executeMs:h-u,cancelled:c.cancelled,vmCyclesExecuted:c.vmCyclesExecuted}}}}let Eo=null;function Kw(){return Eo||(Eo=new iw),Eo}function Xw(){if(typeof Worker>"u"||typeof window>"u")return!1;try{if(new URLSearchParams(yr(window.location).replace(/^\?/,"")).get("worker")==="0")return!1}catch{}return!0}function Rc(n){return{output:"",preprocessed:"",ir:"",bytecode:"",compiledBytes:0,issues:[],stack:[],logs:[],exitCode:1,compileMs:0,executeMs:0,terminal:"error",vmCyclesExecuted:0}}async function Wa(n,e,t,i={}){var o;const r=i.yieldIntervalMs??160,s=i.yieldSliceMax??i.yieldEvery??655360;if(Xw())try{return await Kw().runProgram({source:n,stdin:e,optimize:t,filename:i.filename,yieldIntervalMs:r,yieldSliceMax:s,signal:i.signal,onProgress:i.onProgress})}catch(l){const a=l instanceof Error?l.message:String(l);return{...Rc(),logs:[a]}}try{const l=jw(n,e,t,{filename:i.filename}),a=l.compileMs;(o=i.onProgress)==null||o.call(i,{vmCyclesExecuted:0,compileMs:a,executeElapsedMs:0,compiledBytes:l.compiledBytes});const u=performance.now(),c=await l.executeAsync({yieldIntervalMs:r,yieldSliceMax:s,shouldContinue:()=>{var f;return!((f=i.signal)!=null&&f.aborted)},onChunk:({vmCyclesExecuted:f})=>{var d;(d=i.onProgress)==null||d.call(i,{vmCyclesExecuted:f,compileMs:a,executeElapsedMs:performance.now()-u})},scheduler:()=>new Promise(f=>{globalThis.setTimeout(f,0)})}),h=c.cancelled?"cancelled":"done";return{output:c.output,preprocessed:l.preprocessed,ir:l.ir,bytecode:l.bytecode,compiledBytes:l.compiledBytes,issues:l.issues,stack:c.stack,logs:c.logs,exitCode:c.exitCode,compileMs:l.compileMs,executeMs:c.executeMs,terminal:h,vmCyclesExecuted:c.vmCyclesExecuted}}catch(l){const a=l instanceof Error?l.message:String(l);return{...Rc(),logs:[a]}}}const zc="/lib/prelude.ffp";function Gw(n,e){const t=console.log;console.log=(...i)=>{n(i.map(String).join(" "))};try{return e()}finally{console.log=t}}class Yw{constructor(){zt(this,"compiler");zt(this,"engine");zt(this,"preprocessor");zt(this,"files");zt(this,"output","");this.reset()}reset(){this.output="",this.files=Zd("","/repl.ffp");const e=hp({onWrite:r=>{this.output+=r}});this.compiler=new mt,this.engine=new wr(e);const t=new mt,i=new wr(e);this.preprocessor=new Sn(cp(this.files),{engine:i,compiler:t},{macroEngineBootstrapFile:zc}),this.execute(`.import ${zc}`)}inspectValue(e){const t=BigInt(e);return this.engine.inspectValue(t)}createStackItems(){return this.engine.getStack().map((e,t)=>({value:String(e),index:t}))}execute(e){const t=e.trim(),i=[];return t?t===".reset"?(this.reset(),{output:"Session reset. Prelude reloaded.",clearTranscript:!0,logs:i,stack:this.createStackItems()}):t===".clear"?{output:"Transcript cleared.",clearTranscript:!0,logs:i,stack:this.createStackItems()}:t===".exit"||t===".quit"?{output:"Browser REPL sessions stay open. Use .reset to clear state.",logs:i,stack:this.createStackItems()}:(this.files["/repl.ffp"]=e,this.output="",Gw(r=>i.push(r),()=>{try{const r=this.preprocessor.preprocess([e],"/repl.ffp"),s=this.compiler.compileToIR(mt.tokenize(r),"/repl.ffp");return this.engine.loadIR(s),this.engine.run(),{output:this.output,logs:i,stack:this.createStackItems()}}catch(r){return{output:this.output,logs:i,stack:this.createStackItems(),error:r instanceof Error?r.message:String(r)}}})):{output:"",logs:i,stack:this.createStackItems()}}}const Qw=`<main class="shell">
  <div class="shell-hero-row">
    <section class="hero">
      <p class="eyebrow">f-flat-minor / web</p>
      <h1>Run F♭m in the browser.</h1>
      <p class="lede">
        F♭m Playground, REPL, Codettas and Tutorials
      </p>
    </section>
    <div class="shell-hero-toolbar">
      <button
        type="button"
        id="run-feedback-toggle"
        class="run-feedback-toggle"
        aria-label="Run sound and animations on"
        aria-pressed="true"
        title="Turn off run sound and animations"
      >
        <span class="run-feedback-toggle__glyph" aria-hidden="true">♭</span>
      </button>
    </div>
  </div>

  <div class="mode-tabs-row">
    <nav class="mode-tabs" aria-label="Application modes">
      <button class="mode-tab mode-tab--playground is-active" data-tab="playground">Playground</button>
      <button class="mode-tab mode-tab--repl" data-tab="repl">REPL</button>
      <button class="mode-tab mode-tab--codetta" data-tab="codetta">Codettas</button>
      <button class="mode-tab mode-tab--tutorial" data-tab="tutorial">Tutorial</button>
      <button class="mode-tab mode-tab--help" data-tab="help">Help</button>
      <a
        class="repo-link"
        href="https://github.com/Hypercubed/f-flat-minor"
        target="_blank"
        rel="noreferrer"
        aria-label="View the GitHub repository"
        title="View the GitHub repository"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M12 0.5C5.649 0.5 0.5 5.649 0.5 12c0 5.082 3.292 9.395 7.861 10.916c0.575 0.106 0.786-0.249 0.786-0.554c0-0.274-0.01-1-0.016-1.962c-3.198 0.695-3.873-1.541-3.873-1.541c-0.523-1.328-1.277-1.682-1.277-1.682c-1.044-0.714 0.079-0.699 0.079-0.699c1.154 0.081 1.761 1.185 1.761 1.185c1.026 1.758 2.692 1.25 3.348 0.956c0.104-0.743 0.401-1.25 0.729-1.537c-2.553-0.291-5.238-1.276-5.238-5.679c0-1.254 0.448-2.28 1.183-3.084c-0.119-0.29-0.513-1.46 0.112-3.045c0 0 0.965-0.309 3.162 1.178c0.917-0.255 1.9-0.382 2.878-0.387c0.977 0.005 1.961 0.132 2.879 0.387c2.195-1.487 3.158-1.178 3.158-1.178c0.627 1.585 0.233 2.755 0.115 3.045c0.736 0.804 1.181 1.83 1.181 3.084c0 4.414-2.689 5.385-5.252 5.67c0.412 0.355 0.779 1.057 0.779 2.131c0 1.539-0.014 2.78-0.014 3.158c0 0.308 0.207 0.666 0.793 0.553C20.712 21.391 24 17.08 24 12c0-6.351-5.149-11.5-11.5-11.5Z"
          />
        </svg>
      </a>
    </nav>
    <div id="codetta-mode-nav" class="codetta-mode-nav" aria-label="Navigate Codettas" hidden>
      <button type="button" class="ghost codetta-detail-nav-btn" id="codetta-mode-prev">Previous</button>
      <button type="button" class="ghost codetta-detail-nav-btn" id="codetta-mode-next">Next</button>
    </div>
  </div>

  <section class="tab-panel is-active" data-panel="playground">
    <section class="workspace">
      <div class="panel editor-panel">
        <div class="panel-header">
          <div>
            <p class="panel-label">Editor</p>
            <h2>Main source</h2>
          </div>
        </div>
        <div id="source" aria-label="Main source editor"></div>
        <div class="controls">
          <label class="field">
            <span>Load example</span>
            <select id="example" class="example-load-select" aria-label="Load example">
              {{EXAMPLE_OPTIONS}}
            </select>
          </label>
          <label class="field">
            <span>stdin</span>
            <input id="stdin" type="text" placeholder="Optional input for getc" />
          </label>
          <div class="actions">
            <label class="toggle optimize-toggle">
              <input id="optimize" type="checkbox" checked />
              <span>Optimize</span>
            </label>
            <button id="run" type="button" class="primary" aria-label="Run program">Run Program</button>
          </div>
        </div>
      </div>

      <div class="panel details-panel-shell">
        <div class="panel-header">
          <div>
            <p class="panel-label">Inspect</p>
            <h2>Program details</h2>
          </div>
        </div>
        <div id="summary" class="summary-bar"></div>
        <div class="detail-toolbar">
          <div class="subtabs" aria-label="Program details">
            <button class="subtab is-active" data-detail-tab="output">Output</button>
            <button class="subtab" data-detail-tab="preprocessed">Expanded Source</button>
            <button class="subtab" data-detail-tab="ir">IR</button>
            <button class="subtab" data-detail-tab="bytecode">Bytecode</button>
          </div>
          <label id="output-wrap-toggle" class="toggle output-wrap-toggle">
            <input id="output-wrap" type="checkbox" checked />
            <span>Wrap Output</span>
          </label>
        </div>
        <div class="detail-panels">
          <pre id="output" class="console is-wrapped detail-panel is-active" data-detail-panel="output"></pre>
          <pre id="error" class="console detail-panel is-active" data-detail-panel="output"></pre>
          <div id="preprocessed" class="code-block detail-panel" data-detail-panel="preprocessed"></div>
          <div id="ir" class="code-block detail-panel" data-detail-panel="ir"></div>
          <pre id="bytecode" class="code-block bytecode-wrap detail-panel" data-detail-panel="bytecode"></pre>
        </div>
        <div id="bytecode-meta" class="detail-meta" hidden>
          <span class="label">Byte count</span>
          <span id="bytecode-count" class="value">0 bytes</span>
        </div>
      </div>
    </section>
  </section>

  <section class="tab-panel" data-panel="repl">
    <section class="repl-layout">
      <div class="panel repl-pane">
        <div class="panel-header repl-pane-header">
          <div>
            <p class="panel-label">REPL</p>
            <h2>Persistent session</h2>
          </div>
          <button id="repl-reset" class="ghost">Reset Session</button>
        </div>
        <div class="help-copy repl-help-copy">
          <p>The REPL keeps your definitions and stack between lines. It preloads <code>/lib/prelude.ffp</code>.</p>
          <p>Special commands: <code>.reset</code>, <code>.clear</code>, <code>.exit</code>, <code>.quit</code>.</p>
        </div>
        <div class="repl-left-body">
          <section class="repl-stack-panel" aria-live="polite">
            <div class="repl-stack-head">
              <span>Stack monitor</span>
              <span id="repl-depth">depth: 0</span>
            </div>
            <ol id="repl-stack" class="repl-stack-list" aria-label="Current stack values"></ol>
          </section>
          
          <!-- Inspect panel for viewing word definitions -->
          <section class="repl-inspect-panel" id="repl-inspect">
            <div class="repl-inspect-header">
              <button id="repl-inspect-back" class="inspect-back" disabled>← Back</button>
              <span class="inspect-title">Inspector</span>
              <button id="repl-inspect-close" class="inspect-close">✕</button>
            </div>
            <div id="repl-inspect-content" class="repl-inspect-content">
              <div class="inspect-placeholder">Click a stack value to inspect</div>
            </div>
          </section>
          
          <label class="field repl-input-field" for="repl-command">
            <input id="repl-command" type="text" autocomplete="off" placeholder="Type code and press Enter" />
          </label>
          <div class="repl-hint">Tip: use ↑ and ↓ for command history.</div>
        </div>
      </div>

      <div class="panel repl-pane">
        <div class="panel-header">
          <div>
            <p class="panel-label">Console</p>
            <h2>Output & logs</h2>
          </div>
          <span id="repl-status" class="repl-status" aria-live="polite" hidden>
            <span class="repl-status-dot" aria-hidden="true"></span>
            Running...
          </span>
        </div>
        <pre id="repl-output" class="console repl-console"></pre>
      </div>
    </section>
  </section>

  <section class="tab-panel" data-panel="codetta">
    <div id="codetta-root"></div>
  </section>

  <section class="tab-panel" data-panel="tutorial">
    <div id="tutorial-root"></div>
  </section>

  <section class="tab-panel" data-panel="help">
    {{HELP_HTML}}
  </section>
</main>
`,Jw=`<div class="help-grid">
  <section class="panel help-panel">
    <div class="panel-header">
      <div>
        <p class="panel-label">Overview</p>
        <h2>What F♭m is</h2>
      </div>
    </div>
    <div class="help-copy">
      <p>F♭m is a tiny stack-oriented language built around one value type: big integers.</p>
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
        <dd><code>'Hello\\\\sWorld!\\\\n'</code> expands to character codes on the stack.</dd>
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
      <pre class="code-block help-code">'\\0Hello\\sWorld!\\n' prints

fact: dup 1 - [ dup 1 - fact * ] ? ;
20 fact putn 10 putc

[ dup * ] 12 swap eval putn</pre>
    </div>
  </section>
</div>
`;function Di(n){if(!Number.isFinite(n)||n<0)return String(n);const e=Math.floor(n);if(e<1e5)return e.toLocaleString();if(e<1e6){const i=e/1e3;return i>=999.5?Fc(e,1e6,"m"):`${i.toFixed(2)}k`}if(e<1e9){const i=e/1e6;return i>=999.5?Fc(e,1e9,"b"):`${i.toFixed(2)}m`}return`${(e/1e9).toFixed(2)}b`}function Fc(n,e,t){return`${(n/e).toFixed(2)}${t}`}const dp=[{id:"square",order:1,title:"Square",goal:"Define `square` and print the square of one number.",concepts:["definitions","dup","*","putn","cr"],source:String.raw`.load /lib/prelude.ffp

square: dup * ;

6 square dup putn cr drop
`,expected:"36",note:"`dup` keeps the original input around so `*` can use it twice."},{id:"message-and-value",order:2,title:"Print a Message and a Value",goal:"Print a short literal message followed by a computed number.",concepts:["strings","prints","definitions","putn","cr"],source:String.raw`.load /lib/prelude.ffp

square: dup * ;

0 'Square\sof\s7:\s' prints
7 square putn cr
`,expected:"Square of 7: 49",note:"`\\s` is how F-flat-minor writes spaces inside a string literal."},{id:"abs",order:3,title:"Absolute Value",goal:"Build an absolute-value word and show it on a negative input.",concepts:["comparisons","?","arithmetic","small helper words"],source:String.raw`.load /lib/prelude.ffp

my-abs: dup 0 < [ -1 * ] ? ;

-42 my-abs dup putn cr drop
`,expected:"42",note:'Only negative numbers need work, so the false path can be "do nothing."'},{id:"even",order:4,title:"Even?",goal:"Return `1` for even numbers and `0` for odd ones.",concepts:["%","=","booleans","reusable predicates"],source:String.raw`.load /lib/prelude.ffp

my-even?: 2 % 0 = ;

14 my-even? dup putn cr drop
`,expected:"1",note:"Even numbers are exactly the ones where dividing by `2` leaves a remainder of `0`."},{id:"countdown",order:5,title:"Countdown",goal:"Print the numbers from `n` down to `0`.",concepts:["recursion","branch","output","base cases"],source:String.raw`.load /lib/prelude.ffp

countdown:
  dup putn
  dup 0 >
  [ sp -- countdown ]
  [ cr drop ]
  branch
;

5 countdown
`,expected:"5 4 3 2 1 0",note:"Printing before the recursive call makes the sequence descend."},{id:"sum-to",order:6,title:"Sum 1..n",goal:"Sum every integer from `1` through `n`.",concepts:["recursion","+","implicit base cases"],source:String.raw`.load /lib/prelude.ffp

sum-to:
  dup
  [ dup -- sum-to + ]
  ?
;

8 sum-to dup putn cr drop
`,expected:"36",note:"When `n` reaches `0`, the quote is skipped and that `0` becomes the base value."},{id:"factorial",order:7,title:"Factorial",goal:"Compute `n!`.",concepts:["recursion","branch","multiplication"],source:String.raw`.load /lib/prelude.ffp

fact: dup [ dup -- fact * ] [ drop 1 ] branch ;

6 fact dup putn cr drop
`,expected:"720",note:"The whole base case is `drop 1`: when the input is `0`, replace it with `1`."},{id:"fibonacci",order:8,title:"Fibonacci",goal:"Compute the nth Fibonacci number.",concepts:["two recursive calls","base cases","stack reuse"],source:String.raw`.load /lib/prelude.ffp

fib: dup 2 < [ ] [ -- dup fib swap -- fib + ] branch ;

10 fib dup putn cr drop
`,expected:"55",note:"0 and 1 are already their own Fibonacci answers, so the true branch can stay empty."},{id:"gcd",order:9,title:"GCD",goal:"Find the greatest common divisor of two integers.",concepts:["Euclid's algorithm","%","recursion","tuck"],source:String.raw`.load /lib/prelude.ffp

gcd: dup [ tuck % gcd ] [ drop ] branch ;

84 30 gcd dup putn cr drop
`,expected:"6",note:"Each step replaces `(a, b)` with `(b, a % b)` until `b` becomes `0`."},{id:"reverse-digits",order:10,title:"Reverse Digits",goal:"Reverse the decimal digits of a positive integer.",concepts:["divrem","queue helpers","accumulators","recursion"],source:String.raw`.load /lib/prelude.ffp

rev-step:
  over
  [ swap 10 divrem q< swap 10 * q> + rev-step ]
  [ nip ]
  branch
;

reverse-digits: 0 rev-step ;

12034 reverse-digits dup putn cr drop
`,expected:"43021",note:"The accumulator builds the answer as the input shrinks, and numeric leading zeros disappear naturally."},{id:"numeric-palindrome",order:11,title:"Numeric Palindrome",goal:"Test whether a number reads the same forward and backward.",concepts:["helper reuse","=","decomposition by digits"],source:String.raw`.load /lib/prelude.ffp

rev-step:
  over
  [ swap 10 divrem q< swap 10 * q> + rev-step ]
  [ nip ]
  branch
;

reverse-digits: 0 rev-step ;
palindrome?: dup reverse-digits = ;

12321 palindrome? dup putn cr drop
`,expected:"1",note:"This is a good reminder that a small helper like `reverse-digits` pays off immediately."},{id:"fizzbuzz",order:12,title:"FizzBuzz",goal:"Print the FizzBuzz sequence from `1` to `n`.",concepts:["nested branching","%","recursion","visible output"],source:String.raw`.load /lib/prelude.ffp

fizzbuzz-line:
  dup 15 % 0 =
  [ drop 0 'FizzBuzz' println ]
  [
    dup 3 % 0 =
    [ drop 0 'Fizz' println ]
    [
      dup 5 % 0 =
      [ drop 0 'Buzz' println ]
      [ putn cr ]
      branch
    ]
    branch
  ]
  branch
;

fizzbuzz:
  dup 1 >
  [ dup -- fizzbuzz ]
  ?
  fizzbuzz-line
;

15 fizzbuzz
`,expected:String.raw`1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz`,note:"This version recurses first and prints second, so the output comes out in ascending order."},{id:"collatz-steps",order:13,title:"Collatz Step Count",goal:"Count how many Collatz steps it takes to reach `1`.",concepts:["helper words","branching","recursive counting"],source:String.raw`.load /lib/prelude.ffp

next-collatz: dup even? [ 2 / ] [ 3 * 1 + ] branch ;
collatz-steps: dup 1 > [ next-collatz collatz-steps ++ ] [ drop 0 ] branch ;

12 collatz-steps dup putn cr drop
`,expected:"9",note:"`next-collatz` holds the rule, and `collatz-steps` only has to count one step at a time."},{id:"prime",order:14,title:"Prime?",goal:"Ask whether a number is prime.",concepts:["library loading","predicates","reuse"],source:String.raw`.load /lib/math/primes.ffp

29 prime? putn
`,expected:"1",note:"This is a good place to reuse `/lib/math/primes.ffp` instead of squeezing a long primality test into the starter editor."},{id:"pascal-row",order:15,title:"Pascal Row",goal:"Print one row of Pascal's triangle.",concepts:["recursion","formatting","nck"],source:String.raw`.load /lib/prelude.ffp

print-entry:
  dup 0 > [ sp ] ?
  over over nck putn
;

row-step:
  dup 0 >
  [ over over -- row-step ]
  ?
  print-entry
  drop2
;

pascal-row: dup row-step cr ;

5 pascal-row
`,expected:"1 5 10 10 5 1",note:"`nck` does the math for each entry; the recursion only controls left-to-right order."}],Ms=new Set;function Ua(n){return Ms.add(n),()=>{Ms.delete(n)}}function $l(){for(const n of Ms)n.abort();Ms.clear()}function Vt(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function mn(n,e){const t=n.querySelector(e);if(!t)throw new Error(`Missing required element: ${e}`);return t}function Nc(n){return n.split(/(`[^`]+`)/g).map(e=>e.startsWith("`")&&e.endsWith("`")?`<code>${Vt(e.slice(1,-1))}</code>`:Vt(e)).join("")}function qc(){return new Promise(n=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>n())})})}function Vi(n){return n.map(e=>{const t=e.tone&&e.tone!=="default"?` ${e.tone}`:"",i=e.showDot?'<span class="tutorial-summary-dot" aria-hidden="true"></span>':"";return`
      <span class="tutorial-summary-item">
        <span class="tutorial-summary-label">${Vt(e.label)}</span>
        <span class="tutorial-summary-value${t}">${i}${Vt(e.value)}</span>
      </span>
    `}).join('<span class="tutorial-summary-separator" aria-hidden="true">|</span>')}function Zw(n){const e=n.expected?`
      <div class="tutorial-guidance-block">
        <p class="tutorial-guidance-label">Expected result</p>
        <pre class="tutorial-guidance-value">${Vt(n.expected)}</pre>
      </div>
    `:"",t=n.note?`
      <div class="tutorial-guidance-block">
        <p class="tutorial-guidance-label">Note</p>
        <p class="tutorial-note">${Nc(n.note)}</p>
      </div>
    `:"",i=typeof n.stdin=="string"?`
      <label class="field tutorial-stdin-field">
        <span>stdin</span>
        <input data-role="stdin" type="text" value="${Vt(n.stdin)}" />
      </label>
    `:"";return`
    <article class="panel tutorial-card" data-problem-id="${Vt(n.id)}">
      <div class="tutorial-card-body">
        <div class="tutorial-card-header">
          <div>
            <p class="panel-label">Problem ${n.order}</p>
            <h2>${Vt(n.title)}</h2>
          </div>
          <p class="tutorial-goal">${Nc(n.goal)}</p>
        </div>

        <div class="tutorial-concepts" aria-label="Concepts">
          ${n.concepts.map(r=>`<span class="tutorial-concept">${Vt(r)}</span>`).join("")}
        </div>

        <div class="tutorial-workbench">
          <div class="tutorial-editor-pane">
            <div class="tutorial-editor-shell">
              <div class="tutorial-editor" data-role="editor" aria-label="${Vt(n.title)} source editor"></div>
            </div>

            <div class="tutorial-controls">
              ${i}
              <div class="actions tutorial-actions">
                <button type="button" data-role="run" class="primary tutorial-run-btn" aria-label="Run">Run</button>
                <button type="button" data-role="reset" class="ghost">Reset</button>
              </div>
            </div>
          </div>

          <section class="tutorial-result" aria-live="polite">
            <div class="tutorial-run-summary" data-role="summary">Ready to run.</div>
            <pre class="console tutorial-console" data-role="output">Run the snippet to see output.</pre>
            <pre class="tutorial-diagnostics" data-role="diagnostics" hidden></pre>
            <pre class="tutorial-error" data-role="error" hidden></pre>
          </section>
        </div>

        <div class="tutorial-guidance">
          ${e}
          ${t}
        </div>
      </div>
    </article>
  `}function ek(){return`
    <section class="tutorial-page">
      <section class="panel tutorial-intro">
        <div class="tutorial-intro-body">
          <p class="eyebrow">Starter Problems</p>
          <h2>Fifteen runnable lessons, already loaded with working code.</h2>
          <p>
            These cards mirror the completed starter set in <code>_docs/ffm-starter-problems.md</code>.
            Each one starts with the full solution snippet from the doc, so you can run it immediately,
            edit it safely, and compare the result against the expected output guidance.
          </p>
          <p>
            Cards run independently. They do not share stack state, definitions, stdin, or output.
          </p>
        </div>
      </section>

      <section class="tutorial-list" aria-label="Tutorial problems">
        ${[...dp].sort((e,t)=>e.order-t.order).map(e=>Zw(e)).join("")}
      </section>
    </section>
  `}function tk(n){const e=[];return n.output&&e.push(n.output.trimEnd()),n.logs.length&&e.push(n.logs.join(`
`)),e.filter(Boolean).join(`
`)||"(no output)"}function nk(n){n.innerHTML=ek(),[...dp].sort((t,i)=>t.order-i.order).forEach(t=>{const i=mn(n,`[data-problem-id="${t.id}"]`),r=mn(i,"[data-role='editor']"),s=mn(i,"[data-role='run']"),o=mn(i,"[data-role='reset']"),l=mn(i,"[data-role='summary']"),a=mn(i,"[data-role='output']"),u=mn(i,"[data-role='diagnostics']"),c=mn(i,"[data-role='error']"),h=i.querySelector("[data-role='stdin']"),f=Ha(r,t.source,{extraExtensions:[qa]});function d(){f.setValue(t.source),h&&typeof t.stdin=="string"&&(h.value=t.stdin),l.textContent="Ready to run.",a.textContent="Run the snippet to see output.",u.textContent="",u.hidden=!0,c.textContent="",c.hidden=!0}let p=null;s.addEventListener("click",async()=>{if(p!==null){p.abort();return}za(s),s.textContent="Cancel",s.setAttribute("aria-label","Cancel run"),s.classList.add("is-cancel"),o.disabled=!0,h&&(h.disabled=!0),l.innerHTML=Vi([{label:"compile",value:"Running...",tone:"running",showDot:!0},{label:"execute",value:"pending",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),c.textContent="",c.hidden=!0;const m=new AbortController;p=m;const b=Ua(m);try{await qc(),l.innerHTML=Vi([{label:"compile",value:"Running...",tone:"running",showDot:!0},{label:"execute",value:"pending",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),await qc();const g=await Wa(f.getValue(),(h==null?void 0:h.value)??"",!0,{signal:m.signal,onProgress:({vmCyclesExecuted:D,compileMs:C})=>{l.innerHTML=Vi([{label:"compile",value:C!==void 0?`${C.toFixed(2)} ms`:"…",tone:"running"},{label:"execute",value:`${Di(D)} vm steps`,tone:"running",showDot:!0},{label:"exit",value:"pending",tone:"pending"}])}}),_=g.terminal==="cancelled"?"cancelled":g.terminal==="error"?"error":String(g.exitCode),S=g.terminal==="cancelled"?"pending":g.terminal==="error"?"error":g.exitCode===0?"success":"error";l.innerHTML=Vi([{label:"compile",value:`${g.compileMs.toFixed(2)} ms`},{label:"execute",value:`${g.executeMs.toFixed(2)} ms`},{label:"exit",value:_,tone:S},{label:"issues",value:g.issues.length===1?"1 compiler issue":`${g.issues.length} compiler issues`,tone:g.issues.length?"error":"default"},...g.vmCyclesExecuted!==void 0?[{label:"vm steps",value:Di(g.vmCyclesExecuted),tone:"default"}]:[]]),a.textContent=tk(g),g.terminal==="error"?(u.textContent="",u.hidden=!0,c.textContent=g.logs.join(`
`)||"Run failed.",c.hidden=!1):g.issues.length?(u.textContent=`Compiler issues:
${g.issues.join(`
`)}`,u.hidden=!1,c.textContent="",c.hidden=!0):(u.textContent="",u.hidden=!0,c.textContent="",c.hidden=!0)}catch(g){const _=g instanceof Error?g.message:String(g);l.innerHTML=Vi([{label:"compile",value:"failed",tone:"error"},{label:"execute",value:"pending",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),a.textContent="",u.textContent="",u.hidden=!0,c.textContent=_,c.hidden=!1}finally{b(),p=null,Fa(),h&&(h.disabled=!1),s.textContent="Run",s.setAttribute("aria-label","Run"),s.classList.remove("is-cancel"),o.disabled=!1}}),o.addEventListener("click",()=>{d()}),h&&typeof t.stdin!="string"&&(h.value="")})}const ik=`---
etude: 99bottles
title: "99 Bottles of Beer"
leader: hypercubed
bytes: 564
date: 2026-04-07
---

Print the full "99 Bottles of Beer" lyrics.

This Codetta follows the code.golf [99 Bottles of Beer](https://code.golf/99-bottles-of-beer) hole.
`,rk=`---
etude: catalan-numbers
title: "Catalan Numbers"
leader: hypercubed
bytes: 222
date: 2026-04-08
---
The nth Catalan number can be expressed as C(n) = binomial(2n,n)/(n+1).

Print the first 100 Catalan numbers, from C(0) to C(99) inclusive, each on their own line.

This Codetta follows the code.golf [Catalan Numbers](https://code.golf/catalan-numbers) hole.
`,sk=`---
etude: collatz
title: "Collatz"
leader: hypercubed
bytes: 222
date: 2026-04-07
---

Print the Collatz stopping times for the numbers 1 through 1,000, one per line.

This Codetta follows the code.golf [Collatz](https://code.golf/collatz) hole.
`,ok=`---
etude: e-digits
title: "Digits of e"
leader: hypercubed
bytes: 1083
date: 2026-04-08
---

Print e to the first 1,000 decimal places after the point.

This Codetta follows the code.golf [𝑒](https://code.golf/%f0%9d%91%92) hole.
`,lk=`---
etude: fib
title: "Fibonacci"
leader: hypercubed
bytes: 78
date: 2026-04-07
---

Print the 31st Fibonacci number.

The solution defines \`fib\` with the stack effect \`n fib -> F_n\`. This Codetta follows the code.golf [Fibonacci](https://code.golf/fibonacci) hole.
`,ak=`---
etude: fizzbuzz
title: "FizzBuzz"
leader: hypercubed
bytes: 267
date: 2026-04-07
---

Print the numbers 1 through 100 using FizzBuzz substitutions.

The current best solution uses the unrolled approach popularized in the Rosetta Code [FizzBuzz article](https://rosettacode.org/wiki/FizzBuzz#the_unrolled_approach). This Codetta follows the code.golf [FizzBuzz](https://code.golf/fizz-buzz) hole.
`,uk=`---
etude: leap-years
title: "Leap Years"
leader: hypercubed
bytes: 226
date: 2026-04-07
---

Print all leap years from 1800 to 2400 inclusive.

This Codetta follows the code.golf [Leap Years](https://code.golf/leap-years) hole.
`,ck=`---
etude: ln-2
title: "ln 2"
leader: hypercubed
bytes: 1043
date: 2026-04-08
---

Print ln(2) to the first 1,000 decimal places after the point.

This Codetta follows the code.golf [ln 2](https://code.golf/ln-2) hole.
`,hk=`---
etude: pascals-triangle
title: "Pascal's Triangle"
leader: hypercubed
bytes: 265
date: 2026-04-07
---

Print the first 20 rows of Pascal's triangle.

This Codetta follows the code.golf [Pascal's Triangle](https://code.golf/pascals-triangle) hole.
`,fk=`---
etude: pi-digits
title: "Digits of pi"
leader: hypercubed
bytes: 926
date: 2026-04-08
---

Print pi to the first 1,000 decimal places after the point.

Including the leading \`3.\`, the output is 1,002 characters total. This Codetta follows the code.golf [π](https://code.golf/%cf%80) hole.
`,dk=`---
etude: prime-numbers
title: "Prime Numbers"
leader: hypercubed
bytes: 1144
date: 2026-04-08
---

Print all prime numbers from 1 to 100 inclusive, each on its own line.

This Codetta follows the code.golf [Prime Numbers](https://code.golf/prime-numbers) hole.
`,pk=`---
etude: roman-to-arabic
title: "Roman to Arabic"
leader: hypercubed
bytes: 911
date: 2026-04-07
---

Convert Roman numerals to Arabic values.

The original code.golf hole is argument-driven, so this Codetta version freezes a representative sample set of Roman numerals and expected conversions. It follows the code.golf [Roman to Arabic](https://code.golf/roman-to-arabic) hole.
`,mk=`---
etude: sqrt-2
title: "Digits of sqrt(2)"
leader: hypercubed
bytes: 439
date: 2026-04-08
---

Print sqrt(2) to the first 1,000 decimal places after the point.

This Codetta follows the code.golf [√2](https://code.golf/%E2%88%9A2) hole.
`,gk=`---
etude: tower-of-hanoi
title: "Tower of Hanoi"
leader: hypercubed
bytes: 215
date: 2026-04-07
---

Print the steps needed to solve the Tower of Hanoi with 9 disks.

Each line identifies the source pole and destination pole for one move. This Codetta follows the code.golf [Tower of Hanoi](https://code.golf/tower-of-hanoi) hole.
`,bk=`.import ../../lib/prelude.ffp

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
99 bottlesOfBeer onTheWall '.' putc
`,yk=`.import ../../lib/prelude.ffp

/* Near-solution seed retained from ff/catalan.ffp. */
/* Catalan number: n cat -> C_n */

cat: dup dup 2 * swap nck swap 1 + / ;

0 [ dup cat putn ++ cr ] 100 times
`,wk=`.import ../../lib/prelude.ffp

next: dup even? [ 2 / ] [ 3 * 1 + ] branch ;
steps: dup 1 > [ next steps ++ ] [ drop 0 ] branch ;
line: dup steps putn cr ++ ;

1 [ line ] 1000 times drop
`,kk=`.import ../../lib/prelude.ffp

N: 1000 ;
E: N 1 nexp ;

E N nputn
`,xk=`.import ../../lib/prelude.ffp

fib:
  dup 0 = not
  [ dup 1 = not
    [ -- dup fib swap -- fib + ] ?
  ] ? ;

31 fib putn
`,vk=`.import ../../lib/prelude.ffp

n: dup putn cr ++ ;
f: 0 'Fizz' println ++ ;
b: 0 'Buzz' println ++ ;
fb: 0 'FizzBuzz' println ++ ;
fb10: n n f n b f n n f b ;
fb15: fb10 n f n n fb ;
fb100: fb15 fb15 fb15 fb15 fb15 fb15 fb10 ;

1 fb100 drop
`,Sk=`.import ../../lib/prelude.ffp
.import ../../lib/time/utc.ffp

line: dup leap-year? [ dup putn cr ] ? ++ ;

1800 [ line ] 601 times drop
`,_k=`.import ../../lib/prelude.ffp

N: 1000 ;
L: N nln2 ;

L N nputn
`,Ck=`.import ../../lib/prelude.ffp

ps: putn sp ;

line: dup 0 swap [ dup2 ++ q< q< nck ps q> q> ] seq nck ps cr ;

0 [ dup line ++ ] 20 times
`,Ak=`.import ../../lib/prelude.ffp

N: 1000 ;
P: N npi ;

P N nputn
`,Tk=`.import ../../lib/math/primes.ffp

1 [ dup prime? [ dup putn '\\n' putc ] ? ++ ] 100 times drop`,Ek=`.import ../../lib/prelude.ffp
.import ../../lib/seq/seq.ffp

I: 1 'I' putc ;
V: 5 'V' putc ;
X: 10 'X' putc ;
L: 50 'L' putc ;
C: 100 'C' putc ;
D: 500 'D' putc ;
M: 1000 'M' putc ;

roman!: [ dup2 < [ [ -1 * ] dip ] ? ] 1000 foldl! sum! 1000 - 0 '\\t' prints putn cr ;

I roman!
I I roman!
I I I roman!
I V roman!
V roman!
V I roman!
V I I roman!
V I I I roman!
I X roman!
X roman!

X I roman!
X I I roman!
X I I I roman!
X I V roman!
X V roman!
X V I roman!
X V I I roman!
X V I I I roman!
X I X roman!
X X roman!

D X roman!
D X X roman!
D X X X roman!
D X L roman!
D L roman!
D L X roman!
D L X X roman!
D L X X X roman!
D X C roman!

M C M X C roman! /* 1990 */
M D C L X V I roman! /* 1666 */
M M V I I I roman! /* 2008 */
M M X X I I roman!  /* 2022 */
`,Mk=`.import ../../lib/prelude.ffp

N: 1000 ;
S: N 2 nsqrt ;

S N nputn
`,Pk=`.import ../../lib/prelude.ffp

over2: [ over ] dip swap ;
over3: [ over2 ] dip swap ;

dup4: over3 over3 over3 over3 ;
drop4: drop drop drop drop ;

print-move: over2 putn sp over putn cr ;

dec-n: [ rot -- rot ] dip ;

move:
  dup4 over3 [
    dec-n swap move
    print-move
    bury move
  ]
  ?
  drop4
;

9 1 2 3 move
`,Dk=`99 bottles of beeron the wall, 99 bottles of beer.
Take one down and pass it around, 98 bottles of beeron the wall.

98 bottles of beeron the wall, 98 bottles of beer.
Take one down and pass it around, 97 bottles of beeron the wall.

97 bottles of beeron the wall, 97 bottles of beer.
Take one down and pass it around, 96 bottles of beeron the wall.

96 bottles of beeron the wall, 96 bottles of beer.
Take one down and pass it around, 95 bottles of beeron the wall.

95 bottles of beeron the wall, 95 bottles of beer.
Take one down and pass it around, 94 bottles of beeron the wall.

94 bottles of beeron the wall, 94 bottles of beer.
Take one down and pass it around, 93 bottles of beeron the wall.

93 bottles of beeron the wall, 93 bottles of beer.
Take one down and pass it around, 92 bottles of beeron the wall.

92 bottles of beeron the wall, 92 bottles of beer.
Take one down and pass it around, 91 bottles of beeron the wall.

91 bottles of beeron the wall, 91 bottles of beer.
Take one down and pass it around, 90 bottles of beeron the wall.

90 bottles of beeron the wall, 90 bottles of beer.
Take one down and pass it around, 89 bottles of beeron the wall.

89 bottles of beeron the wall, 89 bottles of beer.
Take one down and pass it around, 88 bottles of beeron the wall.

88 bottles of beeron the wall, 88 bottles of beer.
Take one down and pass it around, 87 bottles of beeron the wall.

87 bottles of beeron the wall, 87 bottles of beer.
Take one down and pass it around, 86 bottles of beeron the wall.

86 bottles of beeron the wall, 86 bottles of beer.
Take one down and pass it around, 85 bottles of beeron the wall.

85 bottles of beeron the wall, 85 bottles of beer.
Take one down and pass it around, 84 bottles of beeron the wall.

84 bottles of beeron the wall, 84 bottles of beer.
Take one down and pass it around, 83 bottles of beeron the wall.

83 bottles of beeron the wall, 83 bottles of beer.
Take one down and pass it around, 82 bottles of beeron the wall.

82 bottles of beeron the wall, 82 bottles of beer.
Take one down and pass it around, 81 bottles of beeron the wall.

81 bottles of beeron the wall, 81 bottles of beer.
Take one down and pass it around, 80 bottles of beeron the wall.

80 bottles of beeron the wall, 80 bottles of beer.
Take one down and pass it around, 79 bottles of beeron the wall.

79 bottles of beeron the wall, 79 bottles of beer.
Take one down and pass it around, 78 bottles of beeron the wall.

78 bottles of beeron the wall, 78 bottles of beer.
Take one down and pass it around, 77 bottles of beeron the wall.

77 bottles of beeron the wall, 77 bottles of beer.
Take one down and pass it around, 76 bottles of beeron the wall.

76 bottles of beeron the wall, 76 bottles of beer.
Take one down and pass it around, 75 bottles of beeron the wall.

75 bottles of beeron the wall, 75 bottles of beer.
Take one down and pass it around, 74 bottles of beeron the wall.

74 bottles of beeron the wall, 74 bottles of beer.
Take one down and pass it around, 73 bottles of beeron the wall.

73 bottles of beeron the wall, 73 bottles of beer.
Take one down and pass it around, 72 bottles of beeron the wall.

72 bottles of beeron the wall, 72 bottles of beer.
Take one down and pass it around, 71 bottles of beeron the wall.

71 bottles of beeron the wall, 71 bottles of beer.
Take one down and pass it around, 70 bottles of beeron the wall.

70 bottles of beeron the wall, 70 bottles of beer.
Take one down and pass it around, 69 bottles of beeron the wall.

69 bottles of beeron the wall, 69 bottles of beer.
Take one down and pass it around, 68 bottles of beeron the wall.

68 bottles of beeron the wall, 68 bottles of beer.
Take one down and pass it around, 67 bottles of beeron the wall.

67 bottles of beeron the wall, 67 bottles of beer.
Take one down and pass it around, 66 bottles of beeron the wall.

66 bottles of beeron the wall, 66 bottles of beer.
Take one down and pass it around, 65 bottles of beeron the wall.

65 bottles of beeron the wall, 65 bottles of beer.
Take one down and pass it around, 64 bottles of beeron the wall.

64 bottles of beeron the wall, 64 bottles of beer.
Take one down and pass it around, 63 bottles of beeron the wall.

63 bottles of beeron the wall, 63 bottles of beer.
Take one down and pass it around, 62 bottles of beeron the wall.

62 bottles of beeron the wall, 62 bottles of beer.
Take one down and pass it around, 61 bottles of beeron the wall.

61 bottles of beeron the wall, 61 bottles of beer.
Take one down and pass it around, 60 bottles of beeron the wall.

60 bottles of beeron the wall, 60 bottles of beer.
Take one down and pass it around, 59 bottles of beeron the wall.

59 bottles of beeron the wall, 59 bottles of beer.
Take one down and pass it around, 58 bottles of beeron the wall.

58 bottles of beeron the wall, 58 bottles of beer.
Take one down and pass it around, 57 bottles of beeron the wall.

57 bottles of beeron the wall, 57 bottles of beer.
Take one down and pass it around, 56 bottles of beeron the wall.

56 bottles of beeron the wall, 56 bottles of beer.
Take one down and pass it around, 55 bottles of beeron the wall.

55 bottles of beeron the wall, 55 bottles of beer.
Take one down and pass it around, 54 bottles of beeron the wall.

54 bottles of beeron the wall, 54 bottles of beer.
Take one down and pass it around, 53 bottles of beeron the wall.

53 bottles of beeron the wall, 53 bottles of beer.
Take one down and pass it around, 52 bottles of beeron the wall.

52 bottles of beeron the wall, 52 bottles of beer.
Take one down and pass it around, 51 bottles of beeron the wall.

51 bottles of beeron the wall, 51 bottles of beer.
Take one down and pass it around, 50 bottles of beeron the wall.

50 bottles of beeron the wall, 50 bottles of beer.
Take one down and pass it around, 49 bottles of beeron the wall.

49 bottles of beeron the wall, 49 bottles of beer.
Take one down and pass it around, 48 bottles of beeron the wall.

48 bottles of beeron the wall, 48 bottles of beer.
Take one down and pass it around, 47 bottles of beeron the wall.

47 bottles of beeron the wall, 47 bottles of beer.
Take one down and pass it around, 46 bottles of beeron the wall.

46 bottles of beeron the wall, 46 bottles of beer.
Take one down and pass it around, 45 bottles of beeron the wall.

45 bottles of beeron the wall, 45 bottles of beer.
Take one down and pass it around, 44 bottles of beeron the wall.

44 bottles of beeron the wall, 44 bottles of beer.
Take one down and pass it around, 43 bottles of beeron the wall.

43 bottles of beeron the wall, 43 bottles of beer.
Take one down and pass it around, 42 bottles of beeron the wall.

42 bottles of beeron the wall, 42 bottles of beer.
Take one down and pass it around, 41 bottles of beeron the wall.

41 bottles of beeron the wall, 41 bottles of beer.
Take one down and pass it around, 40 bottles of beeron the wall.

40 bottles of beeron the wall, 40 bottles of beer.
Take one down and pass it around, 39 bottles of beeron the wall.

39 bottles of beeron the wall, 39 bottles of beer.
Take one down and pass it around, 38 bottles of beeron the wall.

38 bottles of beeron the wall, 38 bottles of beer.
Take one down and pass it around, 37 bottles of beeron the wall.

37 bottles of beeron the wall, 37 bottles of beer.
Take one down and pass it around, 36 bottles of beeron the wall.

36 bottles of beeron the wall, 36 bottles of beer.
Take one down and pass it around, 35 bottles of beeron the wall.

35 bottles of beeron the wall, 35 bottles of beer.
Take one down and pass it around, 34 bottles of beeron the wall.

34 bottles of beeron the wall, 34 bottles of beer.
Take one down and pass it around, 33 bottles of beeron the wall.

33 bottles of beeron the wall, 33 bottles of beer.
Take one down and pass it around, 32 bottles of beeron the wall.

32 bottles of beeron the wall, 32 bottles of beer.
Take one down and pass it around, 31 bottles of beeron the wall.

31 bottles of beeron the wall, 31 bottles of beer.
Take one down and pass it around, 30 bottles of beeron the wall.

30 bottles of beeron the wall, 30 bottles of beer.
Take one down and pass it around, 29 bottles of beeron the wall.

29 bottles of beeron the wall, 29 bottles of beer.
Take one down and pass it around, 28 bottles of beeron the wall.

28 bottles of beeron the wall, 28 bottles of beer.
Take one down and pass it around, 27 bottles of beeron the wall.

27 bottles of beeron the wall, 27 bottles of beer.
Take one down and pass it around, 26 bottles of beeron the wall.

26 bottles of beeron the wall, 26 bottles of beer.
Take one down and pass it around, 25 bottles of beeron the wall.

25 bottles of beeron the wall, 25 bottles of beer.
Take one down and pass it around, 24 bottles of beeron the wall.

24 bottles of beeron the wall, 24 bottles of beer.
Take one down and pass it around, 23 bottles of beeron the wall.

23 bottles of beeron the wall, 23 bottles of beer.
Take one down and pass it around, 22 bottles of beeron the wall.

22 bottles of beeron the wall, 22 bottles of beer.
Take one down and pass it around, 21 bottles of beeron the wall.

21 bottles of beeron the wall, 21 bottles of beer.
Take one down and pass it around, 20 bottles of beeron the wall.

20 bottles of beeron the wall, 20 bottles of beer.
Take one down and pass it around, 19 bottles of beeron the wall.

19 bottles of beeron the wall, 19 bottles of beer.
Take one down and pass it around, 18 bottles of beeron the wall.

18 bottles of beeron the wall, 18 bottles of beer.
Take one down and pass it around, 17 bottles of beeron the wall.

17 bottles of beeron the wall, 17 bottles of beer.
Take one down and pass it around, 16 bottles of beeron the wall.

16 bottles of beeron the wall, 16 bottles of beer.
Take one down and pass it around, 15 bottles of beeron the wall.

15 bottles of beeron the wall, 15 bottles of beer.
Take one down and pass it around, 14 bottles of beeron the wall.

14 bottles of beeron the wall, 14 bottles of beer.
Take one down and pass it around, 13 bottles of beeron the wall.

13 bottles of beeron the wall, 13 bottles of beer.
Take one down and pass it around, 12 bottles of beeron the wall.

12 bottles of beeron the wall, 12 bottles of beer.
Take one down and pass it around, 11 bottles of beeron the wall.

11 bottles of beeron the wall, 11 bottles of beer.
Take one down and pass it around, 10 bottles of beeron the wall.

10 bottles of beeron the wall, 10 bottles of beer.
Take one down and pass it around, 9 bottles of beeron the wall.

9 bottles of beeron the wall, 9 bottles of beer.
Take one down and pass it around, 8 bottles of beeron the wall.

8 bottles of beeron the wall, 8 bottles of beer.
Take one down and pass it around, 7 bottles of beeron the wall.

7 bottles of beeron the wall, 7 bottles of beer.
Take one down and pass it around, 6 bottles of beeron the wall.

6 bottles of beeron the wall, 6 bottles of beer.
Take one down and pass it around, 5 bottles of beeron the wall.

5 bottles of beeron the wall, 5 bottles of beer.
Take one down and pass it around, 4 bottles of beeron the wall.

4 bottles of beeron the wall, 4 bottles of beer.
Take one down and pass it around, 3 bottles of beeron the wall.

3 bottles of beeron the wall, 3 bottles of beer.
Take one down and pass it around, 2 bottles of beeron the wall.

2 bottles of beeron the wall, 2 bottles of beer.
Take one down and pass it around, 1 bottle of beeron the wall.

1 bottle of beeron the wall, 1 bottle of beer.
Take one down and pass it around, no more bottle of beeron the wall.

No more bottles of beeron the wall, no more bottle of beer.
Go to the store and buy some more, 99 bottles of beeron the wall.`,Ik=`1
1
2
5
14
42
132
429
1430
4862
16796
58786
208012
742900
2674440
9694845
35357670
129644790
477638700
1767263190
6564120420
24466267020
91482563640
343059613650
1289904147324
4861946401452
18367353072152
69533550916004
263747951750360
1002242216651368
3814986502092304
14544636039226909
55534064877048198
212336130412243110
812944042149730764
3116285494907301262
11959798385860453492
45950804324621742364
176733862787006701400
680425371729975800390
2622127042276492108820
10113918591637898134020
39044429911904443959240
150853479205085351660700
583300119592996693088040
2257117854077248073253720
8740328711533173390046320
33868773757191046886429490
131327898242169365477991900
509552245179617138054608572
1978261657756160653623774456
7684785670514316385230816156
29869166945772625950142417512
116157871455782434250553845880
451959718027953471447609509424
1759414616608818870992479875972
6852456927844873497549658464312
26700952856774851904245220912664
104088460289122304033498318812080
405944995127576985730643443367112
1583850964596120042686772779038896
6182127958584855650487080847216336
24139737743045626825711458546273312
94295850558771979787935384946380125
368479169875816659479009042713546950
1440418573150919668872489894243865350
5632681584560312734993915705849145100
22033725021956517463358552614056949950
86218923998960285726185640663701108500
337485502510215975556783793455058624700
1321422108420282270489942177190229544600
5175569924646105559418940193995065716350
20276890389709399862928998568254641025700
79463489365077377841208237632349268884500
311496878311103321137536291518809134027240
1221395654430378811828760722007962130791020
4790408930363303911328386208394864461024520
18793142726809884575211361279087545193250040
73745243611532458459690151854647329239335600
289450081175264899454283846029490767264392230
1136359577947336271931632877004667456667613940
4462290049988320482463241297506133183499654740
17526585015616776834735140517915655636396234280
68854441132780194707888052034668647142985206100
270557451039395118028642463289168566420671280440
1063353702922273835973036658043476458723103404520
4180080073556524734514695828170907458428751314320
16435314834665426797069144960762886143367590394940
64633260585762914370496637486146181462681535261000
254224158304000796523953440778841647086547372026600
1000134600800354781929399250536541864362461089950800
3935312233584004685417853572763349509774031680023800
15487357822491889407128326963778343232013931127835600
60960876535340415751462563580829648891969728907438000
239993345518077005168915776623476723006280827488229600
944973797977428207852605870454939596837230758234904050
3721443204405954385563870541379246659709506697378694300
14657929356129575437016877846657032761712954950899755100
57743358069601357782187700608042856334020731624756611000
227508830794229349661819540395688853956041682601541047340`,Lk=`0
1
7
2
5
8
16
3
19
6
14
9
9
17
17
4
12
20
20
7
7
15
15
10
23
10
111
18
18
18
106
5
26
13
13
21
21
21
34
8
109
8
29
16
16
16
104
11
24
24
24
11
11
112
112
19
32
19
32
19
19
107
107
6
27
27
27
14
14
14
102
22
115
22
14
22
22
35
35
9
22
110
110
9
9
30
30
17
30
17
92
17
17
105
105
12
118
25
25
25
25
25
87
12
38
12
100
113
113
113
69
20
12
33
33
20
20
33
33
20
95
20
46
108
108
108
46
7
121
28
28
28
28
28
41
15
90
15
41
15
15
103
103
23
116
116
116
23
23
15
15
23
36
23
85
36
36
36
54
10
98
23
23
111
111
111
67
10
49
10
124
31
31
31
80
18
31
31
31
18
18
93
93
18
44
18
44
106
106
106
44
13
119
119
119
26
26
26
119
26
18
26
39
26
26
88
88
13
39
39
39
13
13
101
101
114
26
114
52
114
114
70
70
21
52
13
13
34
34
34
127
21
83
21
127
34
34
34
52
21
21
96
96
21
21
47
47
109
47
109
65
109
109
47
47
8
122
122
122
29
29
29
78
29
122
29
21
29
29
42
42
16
29
91
91
16
16
42
42
16
42
16
60
104
104
104
42
24
29
117
117
117
117
117
55
24
73
24
117
16
16
16
42
24
37
37
37
24
24
86
86
37
130
37
37
37
37
55
55
11
24
99
99
24
24
24
143
112
50
112
24
112
112
68
68
11
112
50
50
11
11
125
125
32
125
32
125
32
32
81
81
19
125
32
32
32
32
32
50
19
45
19
45
94
94
94
45
19
19
45
45
19
19
45
45
107
63
107
58
107
107
45
45
14
32
120
120
120
120
120
120
27
58
27
76
27
27
120
120
27
19
19
19
27
27
40
40
27
40
27
133
89
89
89
133
14
133
40
40
40
40
40
32
14
58
14
53
102
102
102
40
115
27
27
27
115
115
53
53
115
27
115
53
71
71
71
97
22
115
53
53
14
14
14
40
35
128
35
128
35
35
128
128
22
35
84
84
22
22
128
128
35
35
35
27
35
35
53
53
22
48
22
22
97
97
97
141
22
48
22
141
48
48
48
97
110
22
48
48
110
110
66
66
110
61
110
35
48
48
48
61
9
35
123
123
123
123
123
61
30
123
30
123
30
30
79
79
30
30
123
123
30
30
22
22
30
22
30
48
43
43
43
136
17
43
30
30
92
92
92
43
17
136
17
30
43
43
43
87
17
43
43
43
17
17
61
61
105
56
105
30
105
105
43
43
25
30
30
30
118
118
118
30
118
56
118
118
118
118
56
56
25
74
74
74
25
25
118
118
17
56
17
69
17
17
43
43
25
131
38
38
38
38
38
69
25
131
25
131
87
87
87
131
38
25
131
131
38
38
38
38
38
30
38
30
56
56
56
131
12
51
25
25
100
100
100
38
25
144
25
100
25
25
144
144
113
51
51
51
113
113
25
25
113
51
113
144
69
69
69
95
12
64
113
113
51
51
51
64
12
64
12
38
126
126
126
38
33
126
126
126
33
33
126
126
33
126
33
64
82
82
82
170
20
33
126
126
33
33
33
64
33
25
33
25
33
33
51
51
20
46
46
46
20
20
46
46
95
33
95
139
95
95
46
46
20
139
20
20
46
46
46
95
20
90
20
46
46
46
46
139
108
20
64
64
108
108
59
59
108
33
108
152
46
46
46
59
15
33
33
33
121
121
121
152
121
33
121
59
121
121
121
121
28
121
59
59
28
28
77
77
28
77
28
103
121
121
121
72
28
59
20
20
20
20
20
72
28
46
28
134
41
41
41
134
28
41
41
41
28
28
134
134
90
134
90
41
90
90
134
134
15
28
134
134
41
41
41
85
41
41
41
41
41
41
33
33
15
59
59
59
15
15
54
54
103
28
103
147
103
103
41
41
116
147
28
28
28
28
28
178
116
147
116
28
54
54
54
147
116
116
28
28
116
116
54
54
72
147
72
46
72
72
98
98
23
67
116
116
54
54
54
116
15
67
15
54
15
15
41
41
36
129
129
129
36
36
129
129
36
129
36
67
129
129
129
116
23
129
36
36
85
85
85
129
23
173
23
85
129
129
129
36
36
36
36
36
36
36
28
28
36
28
36
28
54
54
54
129
23
49
49
49
23
23
23
142
98
49
98
36
98
98
142
142
23
98
49
49
23
23
142
142
49
23
49
36
49
49
98
98
111
93
23
23
49
49
49
49
111
`,Bk=`2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274274663919320030599218174135966290435729003342952605956307381323286279434907632338298807531952510190115738341879307021540891499348841675092447614606680822648001684774118537423454424371075390777449920695517027618386062613313845830007520449338265602976067371132007093287091274437470472306969772093101416928368190255151086574637721112523897844250569536967707854499699679468644549059879316368892300987931277361782154249992295763514822082698951936680331825288693984964651058209392398294887933203625094431173012381970684161403970198376793206832823764648042953118023287825098194558153017567173613320698112509961818815930416903515988885193458072738667385894228792284998920868058257492796104841984443634632449684875602336248270419786232090021609902353043699418491463140934317381436405462531520961836908887070167683964243781405927145635490613031072085103837505101157477041718986106873969655212671546889570350354
`,Ok="1346269",Rk=`1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
16
17
Fizz
19
Buzz
Fizz
22
23
Fizz
Buzz
26
Fizz
28
29
FizzBuzz
31
32
Fizz
34
Buzz
Fizz
37
38
Fizz
Buzz
41
Fizz
43
44
FizzBuzz
46
47
Fizz
49
Buzz
Fizz
52
53
Fizz
Buzz
56
Fizz
58
59
FizzBuzz
61
62
Fizz
64
Buzz
Fizz
67
68
Fizz
Buzz
71
Fizz
73
74
FizzBuzz
76
77
Fizz
79
Buzz
Fizz
82
83
Fizz
Buzz
86
Fizz
88
89
FizzBuzz
91
92
Fizz
94
Buzz
Fizz
97
98
Fizz
Buzz
`,zk=`1804
1808
1812
1816
1820
1824
1828
1832
1836
1840
1844
1848
1852
1856
1860
1864
1868
1872
1876
1880
1884
1888
1892
1896
1904
1908
1912
1916
1920
1924
1928
1932
1936
1940
1944
1948
1952
1956
1960
1964
1968
1972
1976
1980
1984
1988
1992
1996
2000
2004
2008
2012
2016
2020
2024
2028
2032
2036
2040
2044
2048
2052
2056
2060
2064
2068
2072
2076
2080
2084
2088
2092
2096
2104
2108
2112
2116
2120
2124
2128
2132
2136
2140
2144
2148
2152
2156
2160
2164
2168
2172
2176
2180
2184
2188
2192
2196
2204
2208
2212
2216
2220
2224
2228
2232
2236
2240
2244
2248
2252
2256
2260
2264
2268
2272
2276
2280
2284
2288
2292
2296
2304
2308
2312
2316
2320
2324
2328
2332
2336
2340
2344
2348
2352
2356
2360
2364
2368
2372
2376
2380
2384
2388
2392
2396
2400
`,Fk=`0.6931471805599453094172321214581765680755001343602552541206800094933936219696947156058633269964186875420014810205706857336855202357581305570326707516350759619307275708283714351903070386238916734711233501153644979552391204751726815749320651555247341395258829504530070953263666426541042391578149520437404303855008019441706416715186447128399681717845469570262716310645461502572074024816377733896385506952606683411372738737229289564935470257626520988596932019650585547647033067936544325476327449512504060694381471046899465062201677204245245296126879465461931651746813926725041038025462596568691441928716082938031727143677826548775664850856740776484514644399404614226031930967354025744460703080960850474866385231381816767514386674766478908814371419854942315199735488037516586127535291661000710535582498794147295092931138971559982056543928717000721808576102523688921324497138932037843935308877482597017155910708823683627589842589185353024363421436706118923678919237231467232172053401649256872747782344535347
`,Nk=`1
1 1
1 2 1
1 3 3 1
1 4 6 4 1
1 5 10 10 5 1
1 6 15 20 15 6 1
1 7 21 35 35 21 7 1
1 8 28 56 70 56 28 8 1
1 9 36 84 126 126 84 36 9 1
1 10 45 120 210 252 210 120 45 10 1
1 11 55 165 330 462 462 330 165 55 11 1
1 12 66 220 495 792 924 792 495 220 66 12 1
1 13 78 286 715 1287 1716 1716 1287 715 286 78 13 1
1 14 91 364 1001 2002 3003 3432 3003 2002 1001 364 91 14 1
1 15 105 455 1365 3003 5005 6435 6435 5005 3003 1365 455 105 15 1
1 16 120 560 1820 4368 8008 11440 12870 11440 8008 4368 1820 560 120 16 1
1 17 136 680 2380 6188 12376 19448 24310 24310 19448 12376 6188 2380 680 136 17 1
1 18 153 816 3060 8568 18564 31824 43758 48620 43758 31824 18564 8568 3060 816 153 18 1
1 19 171 969 3876 11628 27132 50388 75582 92378 92378 75582 50388 27132 11628 3876 969 171 19 1
`,qk=`3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989
`,Hk=`2
3
5
7
11
13
17
19
23
29
31
37
41
43
47
53
59
61
67
71
73
79
83
89
97
`,$k=`I	1
II	2
III	3
IV	4
V	5
VI	6
VII	7
VIII	8
IX	9
X	10
XI	11
XII	12
XIII	13
XIV	14
XV	15
XVI	16
XVII	17
XVIII	18
XIX	19
XX	20
DX	510
DXX	520
DXXX	530
DXL	540
DL	550
DLX	560
DLXX	570
DLXXX	580
DXC	590
MCMXC	1990
MDCLXVI	1666
MMVIII	2008
MMXXII	2022
`,Vk=`1.4142135623730950488016887242096980785696718753769480731766797379907324784621070388503875343276415727350138462309122970249248360558507372126441214970999358314132226659275055927557999505011527820605714701095599716059702745345968620147285174186408891986095523292304843087143214508397626036279952514079896872533965463318088296406206152583523950547457502877599617298355752203375318570113543746034084988471603868999706990048150305440277903164542478230684929369186215805784631115966687130130156185689872372352885092648612494977154218334204285686060146824720771435854874155657069677653720226485447015858801620758474922657226002085584466521458398893944370926591800311388246468157082630100594858704003186480342194897278290641045072636881313739855256117322040245091227700226941127573627280495738108967504018369868368450725799364729060762996941380475654823728997180326802474420629269124859052181004459842150591120249441341728531478105803603371077309182869314710171111683916581726889419758716582152128229518488472
`,Wk=`1 3
1 2
3 2
1 3
2 1
2 3
1 3
1 2
3 2
3 1
2 1
3 2
1 3
1 2
3 2
1 3
2 1
2 3
1 3
2 1
3 2
3 1
2 1
2 3
1 3
1 2
3 2
1 3
2 1
2 3
1 3
1 2
3 2
3 1
2 1
3 2
1 3
1 2
3 2
3 1
2 1
2 3
1 3
2 1
3 2
3 1
2 1
3 2
1 3
1 2
3 2
1 3
2 1
2 3
1 3
1 2
3 2
3 1
2 1
3 2
1 3
1 2
3 2
1 3
2 1
2 3
1 3
2 1
3 2
3 1
2 1
2 3
1 3
1 2
3 2
1 3
2 1
2 3
1 3
2 1
3 2
3 1
2 1
3 2
1 3
1 2
3 2
3 1
2 1
2 3
1 3
2 1
3 2
3 1
2 1
2 3
1 3
1 2
3 2
1 3
2 1
2 3
1 3
1 2
3 2
3 1
2 1
3 2
1 3
1 2
3 2
1 3
2 1
2 3
1 3
2 1
3 2
3 1
2 1
2 3
1 3
1 2
3 2
1 3
2 1
2 3
1 3
1 2
3 2
3 1
2 1
3 2
1 3
1 2
3 2
3 1
2 1
2 3
1 3
2 1
3 2
3 1
2 1
3 2
1 3
1 2
3 2
1 3
2 1
2 3
1 3
1 2
3 2
3 1
2 1
3 2
1 3
1 2
3 2
3 1
2 1
2 3
1 3
2 1
3 2
3 1
2 1
2 3
1 3
1 2
3 2
1 3
2 1
2 3
1 3
2 1
3 2
3 1
2 1
3 2
1 3
1 2
3 2
3 1
2 1
2 3
1 3
2 1
3 2
3 1
2 1
3 2
1 3
1 2
3 2
1 3
2 1
2 3
1 3
1 2
3 2
3 1
2 1
3 2
1 3
1 2
3 2
1 3
2 1
2 3
1 3
2 1
3 2
3 1
2 1
2 3
1 3
1 2
3 2
1 3
2 1
2 3
1 3
1 2
3 2
3 1
2 1
3 2
1 3
1 2
3 2
3 1
2 1
2 3
1 3
2 1
3 2
3 1
2 1
3 2
1 3
1 2
3 2
1 3
2 1
2 3
1 3
1 2
3 2
3 1
2 1
3 2
1 3
1 2
3 2
1 3
2 1
2 3
1 3
2 1
3 2
3 1
2 1
2 3
1 3
1 2
3 2
1 3
2 1
2 3
1 3
2 1
3 2
3 1
2 1
3 2
1 3
1 2
3 2
3 1
2 1
2 3
1 3
2 1
3 2
3 1
2 1
2 3
1 3
1 2
3 2
1 3
2 1
2 3
1 3
1 2
3 2
3 1
2 1
3 2
1 3
1 2
3 2
1 3
2 1
2 3
1 3
2 1
3 2
3 1
2 1
2 3
1 3
1 2
3 2
1 3
2 1
2 3
1 3
2 1
3 2
3 1
2 1
3 2
1 3
1 2
3 2
3 1
2 1
2 3
1 3
2 1
3 2
3 1
2 1
3 2
1 3
1 2
3 2
1 3
2 1
2 3
1 3
1 2
3 2
3 1
2 1
3 2
1 3
1 2
3 2
3 1
2 1
2 3
1 3
2 1
3 2
3 1
2 1
2 3
1 3
1 2
3 2
1 3
2 1
2 3
1 3
2 1
3 2
3 1
2 1
3 2
1 3
1 2
3 2
3 1
2 1
2 3
1 3
2 1
3 2
3 1
2 1
2 3
1 3
1 2
3 2
1 3
2 1
2 3
1 3
1 2
3 2
3 1
2 1
3 2
1 3
1 2
3 2
1 3
2 1
2 3
1 3
2 1
3 2
3 1
2 1
2 3
1 3
1 2
3 2
1 3
2 1
2 3
1 3
1 2
3 2
3 1
2 1
3 2
1 3
1 2
3 2
3 1
2 1
2 3
1 3
2 1
3 2
3 1
2 1
3 2
1 3
1 2
3 2
1 3
2 1
2 3
1 3
1 2
3 2
3 1
2 1
3 2
1 3
1 2
3 2
1 3
2 1
2 3
1 3
2 1
3 2
3 1
2 1
2 3
1 3
1 2
3 2
1 3
2 1
2 3
1 3
2 1
3 2
3 1
2 1
3 2
1 3
1 2
3 2
3 1
2 1
2 3
1 3
2 1
3 2
3 1
2 1
2 3
1 3
1 2
3 2
1 3
2 1
2 3
1 3
1 2
3 2
3 1
2 1
3 2
1 3
1 2
3 2
1 3
2 1
2 3
1 3
2 1
3 2
3 1
2 1
2 3
1 3
1 2
3 2
1 3
2 1
2 3
1 3
`,Uk="../../ff/codetta",pp=new Set(["catalans-constant"]);function mp(n,e){const t=/^\.\.\/\.\.\/ff\/codetta\/([^/]+)\//.exec(n);if(!t)throw new Error(`Unexpected Codetta path for ${e}: ${n}`);return t[1]}function jk(n){const e=n.replaceAll(`\r
`,`
`);if(!e.startsWith(`---
`))throw new Error("Codetta README is missing frontmatter.");const t=e.indexOf(`
---
`,4);if(t<0)throw new Error("Codetta README frontmatter is unterminated.");const i=e.slice(4,t).split(`
`),r=e.slice(t+5).trim(),s=new Map;for(const f of i){const d=f.indexOf(":");if(d<0)continue;const p=f.slice(0,d).trim(),m=f.slice(d+1).trim(),b=m.startsWith('"')&&m.endsWith('"')?m.slice(1,-1):m;s.set(p,b)}const o=s.get("etude"),l=s.get("title"),a=s.get("leader"),u=s.get("bytes"),c=s.get("date");if(!o||!l||!a||!u||!c)throw new Error("Codetta README frontmatter is missing required fields.");const h=Number(u);if(!Number.isFinite(h))throw new Error(`Invalid Codetta byte count: ${u}`);return{frontmatter:{etude:o,title:l,leader:a,bytes:h,date:c},body:r}}const Kk=Object.assign({"../../ff/codetta/99bottles/README.md":ik,"../../ff/codetta/catalan-numbers/README.md":rk,"../../ff/codetta/collatz/README.md":sk,"../../ff/codetta/e-digits/README.md":ok,"../../ff/codetta/fib/README.md":lk,"../../ff/codetta/fizzbuzz/README.md":ak,"../../ff/codetta/leap-years/README.md":uk,"../../ff/codetta/ln-2/README.md":ck,"../../ff/codetta/pascals-triangle/README.md":hk,"../../ff/codetta/pi-digits/README.md":fk,"../../ff/codetta/prime-numbers/README.md":dk,"../../ff/codetta/roman-to-arabic/README.md":pk,"../../ff/codetta/sqrt-2/README.md":mk,"../../ff/codetta/tower-of-hanoi/README.md":gk}),gp=Object.assign({"../../ff/codetta/99bottles/solution.ffp":bk,"../../ff/codetta/catalan-numbers/solution.ffp":yk,"../../ff/codetta/collatz/solution.ffp":wk,"../../ff/codetta/e-digits/solution.ffp":kk,"../../ff/codetta/fib/solution.ffp":xk,"../../ff/codetta/fizzbuzz/solution.ffp":vk,"../../ff/codetta/leap-years/solution.ffp":Sk,"../../ff/codetta/ln-2/solution.ffp":_k,"../../ff/codetta/pascals-triangle/solution.ffp":Ck,"../../ff/codetta/pi-digits/solution.ffp":Ak,"../../ff/codetta/prime-numbers/solution.ffp":Tk,"../../ff/codetta/roman-to-arabic/solution.ffp":Ek,"../../ff/codetta/sqrt-2/solution.ffp":Mk,"../../ff/codetta/tower-of-hanoi/solution.ffp":Pk}),Xk=Object.assign({"../../ff/codetta/99bottles/solution.out":Dk,"../../ff/codetta/catalan-numbers/solution.out":Ik,"../../ff/codetta/collatz/solution.out":Lk,"../../ff/codetta/e-digits/solution.out":Bk,"../../ff/codetta/fib/solution.out":Ok,"../../ff/codetta/fizzbuzz/solution.out":Rk,"../../ff/codetta/leap-years/solution.out":zk,"../../ff/codetta/ln-2/solution.out":Fk,"../../ff/codetta/pascals-triangle/solution.out":Nk,"../../ff/codetta/pi-digits/solution.out":qk,"../../ff/codetta/prime-numbers/solution.out":Hk,"../../ff/codetta/roman-to-arabic/solution.out":$k,"../../ff/codetta/sqrt-2/solution.out":Vk,"../../ff/codetta/tower-of-hanoi/solution.out":Wk}),Ps=new Map;for(const n of Object.keys(gp)){const e=mp(n,"solution");if(Ps.has(e))throw new Error(`Multiple Codetta solutions found for ${e}`);Ps.set(e,n)}function bp(n){if(pp.has(n))throw new Error(`Codetta solution is hidden for ${n}`);const e=Ps.get(n);if(!e)throw new Error(`Missing Codetta solution for ${n}`);const t=e.slice(e.lastIndexOf("/")+1);return`/codetta/${n}/${t}`}const Gk=Object.entries(Kk).map(([n,e])=>{const t=mp(n,"README.md"),i=Ps.get(t),r=`${Uk}/${t}/solution.out`,s=i?gp[i]:void 0,o=Xk[r];if(typeof s!="string")throw new Error(`Missing Codetta solution for ${t}`);if(typeof o!="string")throw new Error(`Missing Codetta expected output for ${t}`);const{frontmatter:l,body:a}=jk(e);if(l.etude!==t)throw new Error(`Codetta README etude mismatch for ${t}: ${l.etude}`);return{id:t,title:l.title,leader:l.leader,bytes:l.bytes,date:l.date,description:a,expected:o.trimEnd(),solution:s.trimEnd()}}).filter(n=>!pp.has(n.id)).sort((n,e)=>n.title.localeCompare(e.title)),Yk={};function ja(n,e){const t=Yk,i=typeof t.includeImageAlt=="boolean"?t.includeImageAlt:!0,r=typeof t.includeHtml=="boolean"?t.includeHtml:!0;return yp(n,i,r)}function yp(n,e,t){if(Qk(n)){if("value"in n)return n.type==="html"&&!t?"":n.value;if(e&&"alt"in n&&n.alt)return n.alt;if("children"in n)return Hc(n.children,e,t)}return Array.isArray(n)?Hc(n,e,t):""}function Hc(n,e,t){const i=[];let r=-1;for(;++r<n.length;)i[r]=yp(n[r],e,t);return i.join("")}function Qk(n){return!!(n&&typeof n=="object")}const $c=document.createElement("i");function Ka(n){const e="&"+n+";";$c.innerHTML=e;const t=$c.textContent;return t.charCodeAt(t.length-1)===59&&n!=="semi"||t===e?!1:t}function gt(n,e,t,i){const r=n.length;let s=0,o;if(e<0?e=-e>r?0:r+e:e=e>r?r:e,t=t>0?t:0,i.length<1e4)o=Array.from(i),o.unshift(e,t),n.splice(...o);else for(t&&n.splice(e,t);s<i.length;)o=i.slice(s,s+1e4),o.unshift(e,0),n.splice(...o),s+=1e4,e+=1e4}function wt(n,e){return n.length>0?(gt(n,n.length,0,e),n):e}const Vc={}.hasOwnProperty;function wp(n){const e={};let t=-1;for(;++t<n.length;)Jk(e,n[t]);return e}function Jk(n,e){let t;for(t in e){const r=(Vc.call(n,t)?n[t]:void 0)||(n[t]={}),s=e[t];let o;if(s)for(o in s){Vc.call(r,o)||(r[o]=[]);const l=s[o];Zk(r[o],Array.isArray(l)?l:l?[l]:[])}}}function Zk(n,e){let t=-1;const i=[];for(;++t<e.length;)(e[t].add==="after"?n:i).push(e[t]);gt(n,0,0,i)}function kp(n,e){const t=Number.parseInt(n,e);return t<9||t===11||t>13&&t<32||t>126&&t<160||t>55295&&t<57344||t>64975&&t<65008||(t&65535)===65535||(t&65535)===65534||t>1114111?"�":String.fromCodePoint(t)}function Dt(n){return n.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const Ze=Ln(/[A-Za-z]/),Ge=Ln(/[\dA-Za-z]/),ex=Ln(/[#-'*+\--9=?A-Z^-~]/);function Ds(n){return n!==null&&(n<32||n===127)}const Vl=Ln(/\d/),tx=Ln(/[\dA-Fa-f]/),nx=Ln(/[!-/:-@[-`{-~]/);function Y(n){return n!==null&&n<-2}function xe(n){return n!==null&&(n<0||n===32)}function he(n){return n===-2||n===-1||n===32}const Ys=Ln(new RegExp("\\p{P}|\\p{S}","u")),Qn=Ln(/\s/);function Ln(n){return e;function e(t){return t!==null&&t>-1&&n.test(String.fromCharCode(t))}}function Bi(n){const e=[];let t=-1,i=0,r=0;for(;++t<n.length;){const s=n.charCodeAt(t);let o="";if(s===37&&Ge(n.charCodeAt(t+1))&&Ge(n.charCodeAt(t+2)))r=2;else if(s<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(s))||(o=String.fromCharCode(s));else if(s>55295&&s<57344){const l=n.charCodeAt(t+1);s<56320&&l>56319&&l<57344?(o=String.fromCharCode(s,l),r=1):o="�"}else o=String.fromCharCode(s);o&&(e.push(n.slice(i,t),encodeURIComponent(o)),i=t+r+1,o=""),r&&(t+=r,r=0)}return e.join("")+n.slice(i)}function de(n,e,t,i){const r=i?i-1:Number.POSITIVE_INFINITY;let s=0;return o;function o(a){return he(a)?(n.enter(t),l(a)):e(a)}function l(a){return he(a)&&s++<r?(n.consume(a),l):(n.exit(t),e(a))}}const ix={tokenize:rx};function rx(n){const e=n.attempt(this.parser.constructs.contentInitial,i,r);let t;return e;function i(l){if(l===null){n.consume(l);return}return n.enter("lineEnding"),n.consume(l),n.exit("lineEnding"),de(n,e,"linePrefix")}function r(l){return n.enter("paragraph"),s(l)}function s(l){const a=n.enter("chunkText",{contentType:"text",previous:t});return t&&(t.next=a),t=a,o(l)}function o(l){if(l===null){n.exit("chunkText"),n.exit("paragraph"),n.consume(l);return}return Y(l)?(n.consume(l),n.exit("chunkText"),s):(n.consume(l),o)}}const sx={tokenize:ox},Wc={tokenize:lx};function ox(n){const e=this,t=[];let i=0,r,s,o;return l;function l(S){if(i<t.length){const D=t[i];return e.containerState=D[1],n.attempt(D[0].continuation,a,u)(S)}return u(S)}function a(S){if(i++,e.containerState._closeFlow){e.containerState._closeFlow=void 0,r&&_();const D=e.events.length;let C=D,k;for(;C--;)if(e.events[C][0]==="exit"&&e.events[C][1].type==="chunkFlow"){k=e.events[C][1].end;break}g(i);let T=D;for(;T<e.events.length;)e.events[T][1].end={...k},T++;return gt(e.events,C+1,0,e.events.slice(D)),e.events.length=T,u(S)}return l(S)}function u(S){if(i===t.length){if(!r)return f(S);if(r.currentConstruct&&r.currentConstruct.concrete)return p(S);e.interrupt=!!(r.currentConstruct&&!r._gfmTableDynamicInterruptHack)}return e.containerState={},n.check(Wc,c,h)(S)}function c(S){return r&&_(),g(i),f(S)}function h(S){return e.parser.lazy[e.now().line]=i!==t.length,o=e.now().offset,p(S)}function f(S){return e.containerState={},n.attempt(Wc,d,p)(S)}function d(S){return i++,t.push([e.currentConstruct,e.containerState]),f(S)}function p(S){if(S===null){r&&_(),g(0),n.consume(S);return}return r=r||e.parser.flow(e.now()),n.enter("chunkFlow",{_tokenizer:r,contentType:"flow",previous:s}),m(S)}function m(S){if(S===null){b(n.exit("chunkFlow"),!0),g(0),n.consume(S);return}return Y(S)?(n.consume(S),b(n.exit("chunkFlow")),i=0,e.interrupt=void 0,l):(n.consume(S),m)}function b(S,D){const C=e.sliceStream(S);if(D&&C.push(null),S.previous=s,s&&(s.next=S),s=S,r.defineSkip(S.start),r.write(C),e.parser.lazy[S.start.line]){let k=r.events.length;for(;k--;)if(r.events[k][1].start.offset<o&&(!r.events[k][1].end||r.events[k][1].end.offset>o))return;const T=e.events.length;let I=T,P,v;for(;I--;)if(e.events[I][0]==="exit"&&e.events[I][1].type==="chunkFlow"){if(P){v=e.events[I][1].end;break}P=!0}for(g(i),k=T;k<e.events.length;)e.events[k][1].end={...v},k++;gt(e.events,I+1,0,e.events.slice(T)),e.events.length=k}}function g(S){let D=t.length;for(;D-- >S;){const C=t[D];e.containerState=C[1],C[0].exit.call(e,n)}t.length=S}function _(){r.write([null]),s=void 0,r=void 0,e.containerState._closeFlow=void 0}}function lx(n,e,t){return de(n,n.attempt(this.parser.constructs.document,e,t),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function Ii(n){if(n===null||xe(n)||Qn(n))return 1;if(Ys(n))return 2}function Qs(n,e,t){const i=[];let r=-1;for(;++r<n.length;){const s=n[r].resolveAll;s&&!i.includes(s)&&(e=s(e,t),i.push(s))}return e}const Wl={name:"attention",resolveAll:ax,tokenize:ux};function ax(n,e){let t=-1,i,r,s,o,l,a,u,c;for(;++t<n.length;)if(n[t][0]==="enter"&&n[t][1].type==="attentionSequence"&&n[t][1]._close){for(i=t;i--;)if(n[i][0]==="exit"&&n[i][1].type==="attentionSequence"&&n[i][1]._open&&e.sliceSerialize(n[i][1]).charCodeAt(0)===e.sliceSerialize(n[t][1]).charCodeAt(0)){if((n[i][1]._close||n[t][1]._open)&&(n[t][1].end.offset-n[t][1].start.offset)%3&&!((n[i][1].end.offset-n[i][1].start.offset+n[t][1].end.offset-n[t][1].start.offset)%3))continue;a=n[i][1].end.offset-n[i][1].start.offset>1&&n[t][1].end.offset-n[t][1].start.offset>1?2:1;const h={...n[i][1].end},f={...n[t][1].start};Uc(h,-a),Uc(f,a),o={type:a>1?"strongSequence":"emphasisSequence",start:h,end:{...n[i][1].end}},l={type:a>1?"strongSequence":"emphasisSequence",start:{...n[t][1].start},end:f},s={type:a>1?"strongText":"emphasisText",start:{...n[i][1].end},end:{...n[t][1].start}},r={type:a>1?"strong":"emphasis",start:{...o.start},end:{...l.end}},n[i][1].end={...o.start},n[t][1].start={...l.end},u=[],n[i][1].end.offset-n[i][1].start.offset&&(u=wt(u,[["enter",n[i][1],e],["exit",n[i][1],e]])),u=wt(u,[["enter",r,e],["enter",o,e],["exit",o,e],["enter",s,e]]),u=wt(u,Qs(e.parser.constructs.insideSpan.null,n.slice(i+1,t),e)),u=wt(u,[["exit",s,e],["enter",l,e],["exit",l,e],["exit",r,e]]),n[t][1].end.offset-n[t][1].start.offset?(c=2,u=wt(u,[["enter",n[t][1],e],["exit",n[t][1],e]])):c=0,gt(n,i-1,t-i+3,u),t=i+u.length-c-2;break}}for(t=-1;++t<n.length;)n[t][1].type==="attentionSequence"&&(n[t][1].type="data");return n}function ux(n,e){const t=this.parser.constructs.attentionMarkers.null,i=this.previous,r=Ii(i);let s;return o;function o(a){return s=a,n.enter("attentionSequence"),l(a)}function l(a){if(a===s)return n.consume(a),l;const u=n.exit("attentionSequence"),c=Ii(a),h=!c||c===2&&r||t.includes(a),f=!r||r===2&&c||t.includes(i);return u._open=!!(s===42?h:h&&(r||!f)),u._close=!!(s===42?f:f&&(c||!h)),e(a)}}function Uc(n,e){n.column+=e,n.offset+=e,n._bufferIndex+=e}const cx={name:"autolink",tokenize:hx};function hx(n,e,t){let i=0;return r;function r(d){return n.enter("autolink"),n.enter("autolinkMarker"),n.consume(d),n.exit("autolinkMarker"),n.enter("autolinkProtocol"),s}function s(d){return Ze(d)?(n.consume(d),o):d===64?t(d):u(d)}function o(d){return d===43||d===45||d===46||Ge(d)?(i=1,l(d)):u(d)}function l(d){return d===58?(n.consume(d),i=0,a):(d===43||d===45||d===46||Ge(d))&&i++<32?(n.consume(d),l):(i=0,u(d))}function a(d){return d===62?(n.exit("autolinkProtocol"),n.enter("autolinkMarker"),n.consume(d),n.exit("autolinkMarker"),n.exit("autolink"),e):d===null||d===32||d===60||Ds(d)?t(d):(n.consume(d),a)}function u(d){return d===64?(n.consume(d),c):ex(d)?(n.consume(d),u):t(d)}function c(d){return Ge(d)?h(d):t(d)}function h(d){return d===46?(n.consume(d),i=0,c):d===62?(n.exit("autolinkProtocol").type="autolinkEmail",n.enter("autolinkMarker"),n.consume(d),n.exit("autolinkMarker"),n.exit("autolink"),e):f(d)}function f(d){if((d===45||Ge(d))&&i++<63){const p=d===45?f:h;return n.consume(d),p}return t(d)}}const Ar={partial:!0,tokenize:fx};function fx(n,e,t){return i;function i(s){return he(s)?de(n,r,"linePrefix")(s):r(s)}function r(s){return s===null||Y(s)?e(s):t(s)}}const xp={continuation:{tokenize:px},exit:mx,name:"blockQuote",tokenize:dx};function dx(n,e,t){const i=this;return r;function r(o){if(o===62){const l=i.containerState;return l.open||(n.enter("blockQuote",{_container:!0}),l.open=!0),n.enter("blockQuotePrefix"),n.enter("blockQuoteMarker"),n.consume(o),n.exit("blockQuoteMarker"),s}return t(o)}function s(o){return he(o)?(n.enter("blockQuotePrefixWhitespace"),n.consume(o),n.exit("blockQuotePrefixWhitespace"),n.exit("blockQuotePrefix"),e):(n.exit("blockQuotePrefix"),e(o))}}function px(n,e,t){const i=this;return r;function r(o){return he(o)?de(n,s,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(o):s(o)}function s(o){return n.attempt(xp,e,t)(o)}}function mx(n){n.exit("blockQuote")}const vp={name:"characterEscape",tokenize:gx};function gx(n,e,t){return i;function i(s){return n.enter("characterEscape"),n.enter("escapeMarker"),n.consume(s),n.exit("escapeMarker"),r}function r(s){return nx(s)?(n.enter("characterEscapeValue"),n.consume(s),n.exit("characterEscapeValue"),n.exit("characterEscape"),e):t(s)}}const Sp={name:"characterReference",tokenize:bx};function bx(n,e,t){const i=this;let r=0,s,o;return l;function l(h){return n.enter("characterReference"),n.enter("characterReferenceMarker"),n.consume(h),n.exit("characterReferenceMarker"),a}function a(h){return h===35?(n.enter("characterReferenceMarkerNumeric"),n.consume(h),n.exit("characterReferenceMarkerNumeric"),u):(n.enter("characterReferenceValue"),s=31,o=Ge,c(h))}function u(h){return h===88||h===120?(n.enter("characterReferenceMarkerHexadecimal"),n.consume(h),n.exit("characterReferenceMarkerHexadecimal"),n.enter("characterReferenceValue"),s=6,o=tx,c):(n.enter("characterReferenceValue"),s=7,o=Vl,c(h))}function c(h){if(h===59&&r){const f=n.exit("characterReferenceValue");return o===Ge&&!Ka(i.sliceSerialize(f))?t(h):(n.enter("characterReferenceMarker"),n.consume(h),n.exit("characterReferenceMarker"),n.exit("characterReference"),e)}return o(h)&&r++<s?(n.consume(h),c):t(h)}}const jc={partial:!0,tokenize:wx},Kc={concrete:!0,name:"codeFenced",tokenize:yx};function yx(n,e,t){const i=this,r={partial:!0,tokenize:C};let s=0,o=0,l;return a;function a(k){return u(k)}function u(k){const T=i.events[i.events.length-1];return s=T&&T[1].type==="linePrefix"?T[2].sliceSerialize(T[1],!0).length:0,l=k,n.enter("codeFenced"),n.enter("codeFencedFence"),n.enter("codeFencedFenceSequence"),c(k)}function c(k){return k===l?(o++,n.consume(k),c):o<3?t(k):(n.exit("codeFencedFenceSequence"),he(k)?de(n,h,"whitespace")(k):h(k))}function h(k){return k===null||Y(k)?(n.exit("codeFencedFence"),i.interrupt?e(k):n.check(jc,m,D)(k)):(n.enter("codeFencedFenceInfo"),n.enter("chunkString",{contentType:"string"}),f(k))}function f(k){return k===null||Y(k)?(n.exit("chunkString"),n.exit("codeFencedFenceInfo"),h(k)):he(k)?(n.exit("chunkString"),n.exit("codeFencedFenceInfo"),de(n,d,"whitespace")(k)):k===96&&k===l?t(k):(n.consume(k),f)}function d(k){return k===null||Y(k)?h(k):(n.enter("codeFencedFenceMeta"),n.enter("chunkString",{contentType:"string"}),p(k))}function p(k){return k===null||Y(k)?(n.exit("chunkString"),n.exit("codeFencedFenceMeta"),h(k)):k===96&&k===l?t(k):(n.consume(k),p)}function m(k){return n.attempt(r,D,b)(k)}function b(k){return n.enter("lineEnding"),n.consume(k),n.exit("lineEnding"),g}function g(k){return s>0&&he(k)?de(n,_,"linePrefix",s+1)(k):_(k)}function _(k){return k===null||Y(k)?n.check(jc,m,D)(k):(n.enter("codeFlowValue"),S(k))}function S(k){return k===null||Y(k)?(n.exit("codeFlowValue"),_(k)):(n.consume(k),S)}function D(k){return n.exit("codeFenced"),e(k)}function C(k,T,I){let P=0;return v;function v(z){return k.enter("lineEnding"),k.consume(z),k.exit("lineEnding"),M}function M(z){return k.enter("codeFencedFence"),he(z)?de(k,x,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(z):x(z)}function x(z){return z===l?(k.enter("codeFencedFenceSequence"),F(z)):I(z)}function F(z){return z===l?(P++,k.consume(z),F):P>=o?(k.exit("codeFencedFenceSequence"),he(z)?de(k,q,"whitespace")(z):q(z)):I(z)}function q(z){return z===null||Y(z)?(k.exit("codeFencedFence"),T(z)):I(z)}}}function wx(n,e,t){const i=this;return r;function r(o){return o===null?t(o):(n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),s)}function s(o){return i.parser.lazy[i.now().line]?t(o):e(o)}}const Mo={name:"codeIndented",tokenize:xx},kx={partial:!0,tokenize:vx};function xx(n,e,t){const i=this;return r;function r(u){return n.enter("codeIndented"),de(n,s,"linePrefix",5)(u)}function s(u){const c=i.events[i.events.length-1];return c&&c[1].type==="linePrefix"&&c[2].sliceSerialize(c[1],!0).length>=4?o(u):t(u)}function o(u){return u===null?a(u):Y(u)?n.attempt(kx,o,a)(u):(n.enter("codeFlowValue"),l(u))}function l(u){return u===null||Y(u)?(n.exit("codeFlowValue"),o(u)):(n.consume(u),l)}function a(u){return n.exit("codeIndented"),e(u)}}function vx(n,e,t){const i=this;return r;function r(o){return i.parser.lazy[i.now().line]?t(o):Y(o)?(n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),r):de(n,s,"linePrefix",5)(o)}function s(o){const l=i.events[i.events.length-1];return l&&l[1].type==="linePrefix"&&l[2].sliceSerialize(l[1],!0).length>=4?e(o):Y(o)?r(o):t(o)}}const Sx={name:"codeText",previous:Cx,resolve:_x,tokenize:Ax};function _x(n){let e=n.length-4,t=3,i,r;if((n[t][1].type==="lineEnding"||n[t][1].type==="space")&&(n[e][1].type==="lineEnding"||n[e][1].type==="space")){for(i=t;++i<e;)if(n[i][1].type==="codeTextData"){n[t][1].type="codeTextPadding",n[e][1].type="codeTextPadding",t+=2,e-=2;break}}for(i=t-1,e++;++i<=e;)r===void 0?i!==e&&n[i][1].type!=="lineEnding"&&(r=i):(i===e||n[i][1].type==="lineEnding")&&(n[r][1].type="codeTextData",i!==r+2&&(n[r][1].end=n[i-1][1].end,n.splice(r+2,i-r-2),e-=i-r-2,i=r+2),r=void 0);return n}function Cx(n){return n!==96||this.events[this.events.length-1][1].type==="characterEscape"}function Ax(n,e,t){let i=0,r,s;return o;function o(h){return n.enter("codeText"),n.enter("codeTextSequence"),l(h)}function l(h){return h===96?(n.consume(h),i++,l):(n.exit("codeTextSequence"),a(h))}function a(h){return h===null?t(h):h===32?(n.enter("space"),n.consume(h),n.exit("space"),a):h===96?(s=n.enter("codeTextSequence"),r=0,c(h)):Y(h)?(n.enter("lineEnding"),n.consume(h),n.exit("lineEnding"),a):(n.enter("codeTextData"),u(h))}function u(h){return h===null||h===32||h===96||Y(h)?(n.exit("codeTextData"),a(h)):(n.consume(h),u)}function c(h){return h===96?(n.consume(h),r++,c):r===i?(n.exit("codeTextSequence"),n.exit("codeText"),e(h)):(s.type="codeTextData",u(h))}}class Tx{constructor(e){this.left=e?[...e]:[],this.right=[]}get(e){if(e<0||e>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+e+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return e<this.left.length?this.left[e]:this.right[this.right.length-e+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(e,t){const i=t??Number.POSITIVE_INFINITY;return i<this.left.length?this.left.slice(e,i):e>this.left.length?this.right.slice(this.right.length-i+this.left.length,this.right.length-e+this.left.length).reverse():this.left.slice(e).concat(this.right.slice(this.right.length-i+this.left.length).reverse())}splice(e,t,i){const r=t||0;this.setCursor(Math.trunc(e));const s=this.right.splice(this.right.length-r,Number.POSITIVE_INFINITY);return i&&Wi(this.left,i),s.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(e){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(e)}pushMany(e){this.setCursor(Number.POSITIVE_INFINITY),Wi(this.left,e)}unshift(e){this.setCursor(0),this.right.push(e)}unshiftMany(e){this.setCursor(0),Wi(this.right,e.reverse())}setCursor(e){if(!(e===this.left.length||e>this.left.length&&this.right.length===0||e<0&&this.left.length===0))if(e<this.left.length){const t=this.left.splice(e,Number.POSITIVE_INFINITY);Wi(this.right,t.reverse())}else{const t=this.right.splice(this.left.length+this.right.length-e,Number.POSITIVE_INFINITY);Wi(this.left,t.reverse())}}}function Wi(n,e){let t=0;if(e.length<1e4)n.push(...e);else for(;t<e.length;)n.push(...e.slice(t,t+1e4)),t+=1e4}function _p(n){const e={};let t=-1,i,r,s,o,l,a,u;const c=new Tx(n);for(;++t<c.length;){for(;t in e;)t=e[t];if(i=c.get(t),t&&i[1].type==="chunkFlow"&&c.get(t-1)[1].type==="listItemPrefix"&&(a=i[1]._tokenizer.events,s=0,s<a.length&&a[s][1].type==="lineEndingBlank"&&(s+=2),s<a.length&&a[s][1].type==="content"))for(;++s<a.length&&a[s][1].type!=="content";)a[s][1].type==="chunkText"&&(a[s][1]._isInFirstContentOfListItem=!0,s++);if(i[0]==="enter")i[1].contentType&&(Object.assign(e,Ex(c,t)),t=e[t],u=!0);else if(i[1]._container){for(s=t,r=void 0;s--;)if(o=c.get(s),o[1].type==="lineEnding"||o[1].type==="lineEndingBlank")o[0]==="enter"&&(r&&(c.get(r)[1].type="lineEndingBlank"),o[1].type="lineEnding",r=s);else if(!(o[1].type==="linePrefix"||o[1].type==="listItemIndent"))break;r&&(i[1].end={...c.get(r)[1].start},l=c.slice(r,t),l.unshift(i),c.splice(r,t-r+1,l))}}return gt(n,0,Number.POSITIVE_INFINITY,c.slice(0)),!u}function Ex(n,e){const t=n.get(e)[1],i=n.get(e)[2];let r=e-1;const s=[];let o=t._tokenizer;o||(o=i.parser[t.contentType](t.start),t._contentTypeTextTrailing&&(o._contentTypeTextTrailing=!0));const l=o.events,a=[],u={};let c,h,f=-1,d=t,p=0,m=0;const b=[m];for(;d;){for(;n.get(++r)[1]!==d;);s.push(r),d._tokenizer||(c=i.sliceStream(d),d.next||c.push(null),h&&o.defineSkip(d.start),d._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=!0),o.write(c),d._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=void 0)),h=d,d=d.next}for(d=t;++f<l.length;)l[f][0]==="exit"&&l[f-1][0]==="enter"&&l[f][1].type===l[f-1][1].type&&l[f][1].start.line!==l[f][1].end.line&&(m=f+1,b.push(m),d._tokenizer=void 0,d.previous=void 0,d=d.next);for(o.events=[],d?(d._tokenizer=void 0,d.previous=void 0):b.pop(),f=b.length;f--;){const g=l.slice(b[f],b[f+1]),_=s.pop();a.push([_,_+g.length-1]),n.splice(_,2,g)}for(a.reverse(),f=-1;++f<a.length;)u[p+a[f][0]]=p+a[f][1],p+=a[f][1]-a[f][0]-1;return u}const Mx={resolve:Dx,tokenize:Ix},Px={partial:!0,tokenize:Lx};function Dx(n){return _p(n),n}function Ix(n,e){let t;return i;function i(l){return n.enter("content"),t=n.enter("chunkContent",{contentType:"content"}),r(l)}function r(l){return l===null?s(l):Y(l)?n.check(Px,o,s)(l):(n.consume(l),r)}function s(l){return n.exit("chunkContent"),n.exit("content"),e(l)}function o(l){return n.consume(l),n.exit("chunkContent"),t.next=n.enter("chunkContent",{contentType:"content",previous:t}),t=t.next,r}}function Lx(n,e,t){const i=this;return r;function r(o){return n.exit("chunkContent"),n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),de(n,s,"linePrefix")}function s(o){if(o===null||Y(o))return t(o);const l=i.events[i.events.length-1];return!i.parser.constructs.disable.null.includes("codeIndented")&&l&&l[1].type==="linePrefix"&&l[2].sliceSerialize(l[1],!0).length>=4?e(o):n.interrupt(i.parser.constructs.flow,t,e)(o)}}function Cp(n,e,t,i,r,s,o,l,a){const u=a||Number.POSITIVE_INFINITY;let c=0;return h;function h(g){return g===60?(n.enter(i),n.enter(r),n.enter(s),n.consume(g),n.exit(s),f):g===null||g===32||g===41||Ds(g)?t(g):(n.enter(i),n.enter(o),n.enter(l),n.enter("chunkString",{contentType:"string"}),m(g))}function f(g){return g===62?(n.enter(s),n.consume(g),n.exit(s),n.exit(r),n.exit(i),e):(n.enter(l),n.enter("chunkString",{contentType:"string"}),d(g))}function d(g){return g===62?(n.exit("chunkString"),n.exit(l),f(g)):g===null||g===60||Y(g)?t(g):(n.consume(g),g===92?p:d)}function p(g){return g===60||g===62||g===92?(n.consume(g),d):d(g)}function m(g){return!c&&(g===null||g===41||xe(g))?(n.exit("chunkString"),n.exit(l),n.exit(o),n.exit(i),e(g)):c<u&&g===40?(n.consume(g),c++,m):g===41?(n.consume(g),c--,m):g===null||g===32||g===40||Ds(g)?t(g):(n.consume(g),g===92?b:m)}function b(g){return g===40||g===41||g===92?(n.consume(g),m):m(g)}}function Ap(n,e,t,i,r,s){const o=this;let l=0,a;return u;function u(d){return n.enter(i),n.enter(r),n.consume(d),n.exit(r),n.enter(s),c}function c(d){return l>999||d===null||d===91||d===93&&!a||d===94&&!l&&"_hiddenFootnoteSupport"in o.parser.constructs?t(d):d===93?(n.exit(s),n.enter(r),n.consume(d),n.exit(r),n.exit(i),e):Y(d)?(n.enter("lineEnding"),n.consume(d),n.exit("lineEnding"),c):(n.enter("chunkString",{contentType:"string"}),h(d))}function h(d){return d===null||d===91||d===93||Y(d)||l++>999?(n.exit("chunkString"),c(d)):(n.consume(d),a||(a=!he(d)),d===92?f:h)}function f(d){return d===91||d===92||d===93?(n.consume(d),l++,h):h(d)}}function Tp(n,e,t,i,r,s){let o;return l;function l(f){return f===34||f===39||f===40?(n.enter(i),n.enter(r),n.consume(f),n.exit(r),o=f===40?41:f,a):t(f)}function a(f){return f===o?(n.enter(r),n.consume(f),n.exit(r),n.exit(i),e):(n.enter(s),u(f))}function u(f){return f===o?(n.exit(s),a(o)):f===null?t(f):Y(f)?(n.enter("lineEnding"),n.consume(f),n.exit("lineEnding"),de(n,u,"linePrefix")):(n.enter("chunkString",{contentType:"string"}),c(f))}function c(f){return f===o||f===null||Y(f)?(n.exit("chunkString"),u(f)):(n.consume(f),f===92?h:c)}function h(f){return f===o||f===92?(n.consume(f),c):c(f)}}function sr(n,e){let t;return i;function i(r){return Y(r)?(n.enter("lineEnding"),n.consume(r),n.exit("lineEnding"),t=!0,i):he(r)?de(n,i,t?"linePrefix":"lineSuffix")(r):e(r)}}const Bx={name:"definition",tokenize:Rx},Ox={partial:!0,tokenize:zx};function Rx(n,e,t){const i=this;let r;return s;function s(d){return n.enter("definition"),o(d)}function o(d){return Ap.call(i,n,l,t,"definitionLabel","definitionLabelMarker","definitionLabelString")(d)}function l(d){return r=Dt(i.sliceSerialize(i.events[i.events.length-1][1]).slice(1,-1)),d===58?(n.enter("definitionMarker"),n.consume(d),n.exit("definitionMarker"),a):t(d)}function a(d){return xe(d)?sr(n,u)(d):u(d)}function u(d){return Cp(n,c,t,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(d)}function c(d){return n.attempt(Ox,h,h)(d)}function h(d){return he(d)?de(n,f,"whitespace")(d):f(d)}function f(d){return d===null||Y(d)?(n.exit("definition"),i.parser.defined.push(r),e(d)):t(d)}}function zx(n,e,t){return i;function i(l){return xe(l)?sr(n,r)(l):t(l)}function r(l){return Tp(n,s,t,"definitionTitle","definitionTitleMarker","definitionTitleString")(l)}function s(l){return he(l)?de(n,o,"whitespace")(l):o(l)}function o(l){return l===null||Y(l)?e(l):t(l)}}const Fx={name:"hardBreakEscape",tokenize:Nx};function Nx(n,e,t){return i;function i(s){return n.enter("hardBreakEscape"),n.consume(s),r}function r(s){return Y(s)?(n.exit("hardBreakEscape"),e(s)):t(s)}}const qx={name:"headingAtx",resolve:Hx,tokenize:$x};function Hx(n,e){let t=n.length-2,i=3,r,s;return n[i][1].type==="whitespace"&&(i+=2),t-2>i&&n[t][1].type==="whitespace"&&(t-=2),n[t][1].type==="atxHeadingSequence"&&(i===t-1||t-4>i&&n[t-2][1].type==="whitespace")&&(t-=i+1===t?2:4),t>i&&(r={type:"atxHeadingText",start:n[i][1].start,end:n[t][1].end},s={type:"chunkText",start:n[i][1].start,end:n[t][1].end,contentType:"text"},gt(n,i,t-i+1,[["enter",r,e],["enter",s,e],["exit",s,e],["exit",r,e]])),n}function $x(n,e,t){let i=0;return r;function r(c){return n.enter("atxHeading"),s(c)}function s(c){return n.enter("atxHeadingSequence"),o(c)}function o(c){return c===35&&i++<6?(n.consume(c),o):c===null||xe(c)?(n.exit("atxHeadingSequence"),l(c)):t(c)}function l(c){return c===35?(n.enter("atxHeadingSequence"),a(c)):c===null||Y(c)?(n.exit("atxHeading"),e(c)):he(c)?de(n,l,"whitespace")(c):(n.enter("atxHeadingText"),u(c))}function a(c){return c===35?(n.consume(c),a):(n.exit("atxHeadingSequence"),l(c))}function u(c){return c===null||c===35||xe(c)?(n.exit("atxHeadingText"),l(c)):(n.consume(c),u)}}const Vx=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Xc=["pre","script","style","textarea"],Wx={concrete:!0,name:"htmlFlow",resolveTo:Kx,tokenize:Xx},Ux={partial:!0,tokenize:Yx},jx={partial:!0,tokenize:Gx};function Kx(n){let e=n.length;for(;e--&&!(n[e][0]==="enter"&&n[e][1].type==="htmlFlow"););return e>1&&n[e-2][1].type==="linePrefix"&&(n[e][1].start=n[e-2][1].start,n[e+1][1].start=n[e-2][1].start,n.splice(e-2,2)),n}function Xx(n,e,t){const i=this;let r,s,o,l,a;return u;function u(y){return c(y)}function c(y){return n.enter("htmlFlow"),n.enter("htmlFlowData"),n.consume(y),h}function h(y){return y===33?(n.consume(y),f):y===47?(n.consume(y),s=!0,m):y===63?(n.consume(y),r=3,i.interrupt?e:w):Ze(y)?(n.consume(y),o=String.fromCharCode(y),b):t(y)}function f(y){return y===45?(n.consume(y),r=2,d):y===91?(n.consume(y),r=5,l=0,p):Ze(y)?(n.consume(y),r=4,i.interrupt?e:w):t(y)}function d(y){return y===45?(n.consume(y),i.interrupt?e:w):t(y)}function p(y){const ae="CDATA[";return y===ae.charCodeAt(l++)?(n.consume(y),l===ae.length?i.interrupt?e:x:p):t(y)}function m(y){return Ze(y)?(n.consume(y),o=String.fromCharCode(y),b):t(y)}function b(y){if(y===null||y===47||y===62||xe(y)){const ae=y===47,Q=o.toLowerCase();return!ae&&!s&&Xc.includes(Q)?(r=1,i.interrupt?e(y):x(y)):Vx.includes(o.toLowerCase())?(r=6,ae?(n.consume(y),g):i.interrupt?e(y):x(y)):(r=7,i.interrupt&&!i.parser.lazy[i.now().line]?t(y):s?_(y):S(y))}return y===45||Ge(y)?(n.consume(y),o+=String.fromCharCode(y),b):t(y)}function g(y){return y===62?(n.consume(y),i.interrupt?e:x):t(y)}function _(y){return he(y)?(n.consume(y),_):v(y)}function S(y){return y===47?(n.consume(y),v):y===58||y===95||Ze(y)?(n.consume(y),D):he(y)?(n.consume(y),S):v(y)}function D(y){return y===45||y===46||y===58||y===95||Ge(y)?(n.consume(y),D):C(y)}function C(y){return y===61?(n.consume(y),k):he(y)?(n.consume(y),C):S(y)}function k(y){return y===null||y===60||y===61||y===62||y===96?t(y):y===34||y===39?(n.consume(y),a=y,T):he(y)?(n.consume(y),k):I(y)}function T(y){return y===a?(n.consume(y),a=null,P):y===null||Y(y)?t(y):(n.consume(y),T)}function I(y){return y===null||y===34||y===39||y===47||y===60||y===61||y===62||y===96||xe(y)?C(y):(n.consume(y),I)}function P(y){return y===47||y===62||he(y)?S(y):t(y)}function v(y){return y===62?(n.consume(y),M):t(y)}function M(y){return y===null||Y(y)?x(y):he(y)?(n.consume(y),M):t(y)}function x(y){return y===45&&r===2?(n.consume(y),j):y===60&&r===1?(n.consume(y),V):y===62&&r===4?(n.consume(y),oe):y===63&&r===3?(n.consume(y),w):y===93&&r===5?(n.consume(y),J):Y(y)&&(r===6||r===7)?(n.exit("htmlFlowData"),n.check(Ux,le,F)(y)):y===null||Y(y)?(n.exit("htmlFlowData"),F(y)):(n.consume(y),x)}function F(y){return n.check(jx,q,le)(y)}function q(y){return n.enter("lineEnding"),n.consume(y),n.exit("lineEnding"),z}function z(y){return y===null||Y(y)?F(y):(n.enter("htmlFlowData"),x(y))}function j(y){return y===45?(n.consume(y),w):x(y)}function V(y){return y===47?(n.consume(y),o="",te):x(y)}function te(y){if(y===62){const ae=o.toLowerCase();return Xc.includes(ae)?(n.consume(y),oe):x(y)}return Ze(y)&&o.length<8?(n.consume(y),o+=String.fromCharCode(y),te):x(y)}function J(y){return y===93?(n.consume(y),w):x(y)}function w(y){return y===62?(n.consume(y),oe):y===45&&r===2?(n.consume(y),w):x(y)}function oe(y){return y===null||Y(y)?(n.exit("htmlFlowData"),le(y)):(n.consume(y),oe)}function le(y){return n.exit("htmlFlow"),e(y)}}function Gx(n,e,t){const i=this;return r;function r(o){return Y(o)?(n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),s):t(o)}function s(o){return i.parser.lazy[i.now().line]?t(o):e(o)}}function Yx(n,e,t){return i;function i(r){return n.enter("lineEnding"),n.consume(r),n.exit("lineEnding"),n.attempt(Ar,e,t)}}const Qx={name:"htmlText",tokenize:Jx};function Jx(n,e,t){const i=this;let r,s,o;return l;function l(w){return n.enter("htmlText"),n.enter("htmlTextData"),n.consume(w),a}function a(w){return w===33?(n.consume(w),u):w===47?(n.consume(w),C):w===63?(n.consume(w),S):Ze(w)?(n.consume(w),I):t(w)}function u(w){return w===45?(n.consume(w),c):w===91?(n.consume(w),s=0,p):Ze(w)?(n.consume(w),_):t(w)}function c(w){return w===45?(n.consume(w),d):t(w)}function h(w){return w===null?t(w):w===45?(n.consume(w),f):Y(w)?(o=h,V(w)):(n.consume(w),h)}function f(w){return w===45?(n.consume(w),d):h(w)}function d(w){return w===62?j(w):w===45?f(w):h(w)}function p(w){const oe="CDATA[";return w===oe.charCodeAt(s++)?(n.consume(w),s===oe.length?m:p):t(w)}function m(w){return w===null?t(w):w===93?(n.consume(w),b):Y(w)?(o=m,V(w)):(n.consume(w),m)}function b(w){return w===93?(n.consume(w),g):m(w)}function g(w){return w===62?j(w):w===93?(n.consume(w),g):m(w)}function _(w){return w===null||w===62?j(w):Y(w)?(o=_,V(w)):(n.consume(w),_)}function S(w){return w===null?t(w):w===63?(n.consume(w),D):Y(w)?(o=S,V(w)):(n.consume(w),S)}function D(w){return w===62?j(w):S(w)}function C(w){return Ze(w)?(n.consume(w),k):t(w)}function k(w){return w===45||Ge(w)?(n.consume(w),k):T(w)}function T(w){return Y(w)?(o=T,V(w)):he(w)?(n.consume(w),T):j(w)}function I(w){return w===45||Ge(w)?(n.consume(w),I):w===47||w===62||xe(w)?P(w):t(w)}function P(w){return w===47?(n.consume(w),j):w===58||w===95||Ze(w)?(n.consume(w),v):Y(w)?(o=P,V(w)):he(w)?(n.consume(w),P):j(w)}function v(w){return w===45||w===46||w===58||w===95||Ge(w)?(n.consume(w),v):M(w)}function M(w){return w===61?(n.consume(w),x):Y(w)?(o=M,V(w)):he(w)?(n.consume(w),M):P(w)}function x(w){return w===null||w===60||w===61||w===62||w===96?t(w):w===34||w===39?(n.consume(w),r=w,F):Y(w)?(o=x,V(w)):he(w)?(n.consume(w),x):(n.consume(w),q)}function F(w){return w===r?(n.consume(w),r=void 0,z):w===null?t(w):Y(w)?(o=F,V(w)):(n.consume(w),F)}function q(w){return w===null||w===34||w===39||w===60||w===61||w===96?t(w):w===47||w===62||xe(w)?P(w):(n.consume(w),q)}function z(w){return w===47||w===62||xe(w)?P(w):t(w)}function j(w){return w===62?(n.consume(w),n.exit("htmlTextData"),n.exit("htmlText"),e):t(w)}function V(w){return n.exit("htmlTextData"),n.enter("lineEnding"),n.consume(w),n.exit("lineEnding"),te}function te(w){return he(w)?de(n,J,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(w):J(w)}function J(w){return n.enter("htmlTextData"),o(w)}}const Xa={name:"labelEnd",resolveAll:n3,resolveTo:i3,tokenize:r3},Zx={tokenize:s3},e3={tokenize:o3},t3={tokenize:l3};function n3(n){let e=-1;const t=[];for(;++e<n.length;){const i=n[e][1];if(t.push(n[e]),i.type==="labelImage"||i.type==="labelLink"||i.type==="labelEnd"){const r=i.type==="labelImage"?4:2;i.type="data",e+=r}}return n.length!==t.length&&gt(n,0,n.length,t),n}function i3(n,e){let t=n.length,i=0,r,s,o,l;for(;t--;)if(r=n[t][1],s){if(r.type==="link"||r.type==="labelLink"&&r._inactive)break;n[t][0]==="enter"&&r.type==="labelLink"&&(r._inactive=!0)}else if(o){if(n[t][0]==="enter"&&(r.type==="labelImage"||r.type==="labelLink")&&!r._balanced&&(s=t,r.type!=="labelLink")){i=2;break}}else r.type==="labelEnd"&&(o=t);const a={type:n[s][1].type==="labelLink"?"link":"image",start:{...n[s][1].start},end:{...n[n.length-1][1].end}},u={type:"label",start:{...n[s][1].start},end:{...n[o][1].end}},c={type:"labelText",start:{...n[s+i+2][1].end},end:{...n[o-2][1].start}};return l=[["enter",a,e],["enter",u,e]],l=wt(l,n.slice(s+1,s+i+3)),l=wt(l,[["enter",c,e]]),l=wt(l,Qs(e.parser.constructs.insideSpan.null,n.slice(s+i+4,o-3),e)),l=wt(l,[["exit",c,e],n[o-2],n[o-1],["exit",u,e]]),l=wt(l,n.slice(o+1)),l=wt(l,[["exit",a,e]]),gt(n,s,n.length,l),n}function r3(n,e,t){const i=this;let r=i.events.length,s,o;for(;r--;)if((i.events[r][1].type==="labelImage"||i.events[r][1].type==="labelLink")&&!i.events[r][1]._balanced){s=i.events[r][1];break}return l;function l(f){return s?s._inactive?h(f):(o=i.parser.defined.includes(Dt(i.sliceSerialize({start:s.end,end:i.now()}))),n.enter("labelEnd"),n.enter("labelMarker"),n.consume(f),n.exit("labelMarker"),n.exit("labelEnd"),a):t(f)}function a(f){return f===40?n.attempt(Zx,c,o?c:h)(f):f===91?n.attempt(e3,c,o?u:h)(f):o?c(f):h(f)}function u(f){return n.attempt(t3,c,h)(f)}function c(f){return e(f)}function h(f){return s._balanced=!0,t(f)}}function s3(n,e,t){return i;function i(h){return n.enter("resource"),n.enter("resourceMarker"),n.consume(h),n.exit("resourceMarker"),r}function r(h){return xe(h)?sr(n,s)(h):s(h)}function s(h){return h===41?c(h):Cp(n,o,l,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(h)}function o(h){return xe(h)?sr(n,a)(h):c(h)}function l(h){return t(h)}function a(h){return h===34||h===39||h===40?Tp(n,u,t,"resourceTitle","resourceTitleMarker","resourceTitleString")(h):c(h)}function u(h){return xe(h)?sr(n,c)(h):c(h)}function c(h){return h===41?(n.enter("resourceMarker"),n.consume(h),n.exit("resourceMarker"),n.exit("resource"),e):t(h)}}function o3(n,e,t){const i=this;return r;function r(l){return Ap.call(i,n,s,o,"reference","referenceMarker","referenceString")(l)}function s(l){return i.parser.defined.includes(Dt(i.sliceSerialize(i.events[i.events.length-1][1]).slice(1,-1)))?e(l):t(l)}function o(l){return t(l)}}function l3(n,e,t){return i;function i(s){return n.enter("reference"),n.enter("referenceMarker"),n.consume(s),n.exit("referenceMarker"),r}function r(s){return s===93?(n.enter("referenceMarker"),n.consume(s),n.exit("referenceMarker"),n.exit("reference"),e):t(s)}}const a3={name:"labelStartImage",resolveAll:Xa.resolveAll,tokenize:u3};function u3(n,e,t){const i=this;return r;function r(l){return n.enter("labelImage"),n.enter("labelImageMarker"),n.consume(l),n.exit("labelImageMarker"),s}function s(l){return l===91?(n.enter("labelMarker"),n.consume(l),n.exit("labelMarker"),n.exit("labelImage"),o):t(l)}function o(l){return l===94&&"_hiddenFootnoteSupport"in i.parser.constructs?t(l):e(l)}}const c3={name:"labelStartLink",resolveAll:Xa.resolveAll,tokenize:h3};function h3(n,e,t){const i=this;return r;function r(o){return n.enter("labelLink"),n.enter("labelMarker"),n.consume(o),n.exit("labelMarker"),n.exit("labelLink"),s}function s(o){return o===94&&"_hiddenFootnoteSupport"in i.parser.constructs?t(o):e(o)}}const Po={name:"lineEnding",tokenize:f3};function f3(n,e){return t;function t(i){return n.enter("lineEnding"),n.consume(i),n.exit("lineEnding"),de(n,e,"linePrefix")}}const ps={name:"thematicBreak",tokenize:d3};function d3(n,e,t){let i=0,r;return s;function s(u){return n.enter("thematicBreak"),o(u)}function o(u){return r=u,l(u)}function l(u){return u===r?(n.enter("thematicBreakSequence"),a(u)):i>=3&&(u===null||Y(u))?(n.exit("thematicBreak"),e(u)):t(u)}function a(u){return u===r?(n.consume(u),i++,a):(n.exit("thematicBreakSequence"),he(u)?de(n,l,"whitespace")(u):l(u))}}const nt={continuation:{tokenize:b3},exit:w3,name:"list",tokenize:g3},p3={partial:!0,tokenize:k3},m3={partial:!0,tokenize:y3};function g3(n,e,t){const i=this,r=i.events[i.events.length-1];let s=r&&r[1].type==="linePrefix"?r[2].sliceSerialize(r[1],!0).length:0,o=0;return l;function l(d){const p=i.containerState.type||(d===42||d===43||d===45?"listUnordered":"listOrdered");if(p==="listUnordered"?!i.containerState.marker||d===i.containerState.marker:Vl(d)){if(i.containerState.type||(i.containerState.type=p,n.enter(p,{_container:!0})),p==="listUnordered")return n.enter("listItemPrefix"),d===42||d===45?n.check(ps,t,u)(d):u(d);if(!i.interrupt||d===49)return n.enter("listItemPrefix"),n.enter("listItemValue"),a(d)}return t(d)}function a(d){return Vl(d)&&++o<10?(n.consume(d),a):(!i.interrupt||o<2)&&(i.containerState.marker?d===i.containerState.marker:d===41||d===46)?(n.exit("listItemValue"),u(d)):t(d)}function u(d){return n.enter("listItemMarker"),n.consume(d),n.exit("listItemMarker"),i.containerState.marker=i.containerState.marker||d,n.check(Ar,i.interrupt?t:c,n.attempt(p3,f,h))}function c(d){return i.containerState.initialBlankLine=!0,s++,f(d)}function h(d){return he(d)?(n.enter("listItemPrefixWhitespace"),n.consume(d),n.exit("listItemPrefixWhitespace"),f):t(d)}function f(d){return i.containerState.size=s+i.sliceSerialize(n.exit("listItemPrefix"),!0).length,e(d)}}function b3(n,e,t){const i=this;return i.containerState._closeFlow=void 0,n.check(Ar,r,s);function r(l){return i.containerState.furtherBlankLines=i.containerState.furtherBlankLines||i.containerState.initialBlankLine,de(n,e,"listItemIndent",i.containerState.size+1)(l)}function s(l){return i.containerState.furtherBlankLines||!he(l)?(i.containerState.furtherBlankLines=void 0,i.containerState.initialBlankLine=void 0,o(l)):(i.containerState.furtherBlankLines=void 0,i.containerState.initialBlankLine=void 0,n.attempt(m3,e,o)(l))}function o(l){return i.containerState._closeFlow=!0,i.interrupt=void 0,de(n,n.attempt(nt,e,t),"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(l)}}function y3(n,e,t){const i=this;return de(n,r,"listItemIndent",i.containerState.size+1);function r(s){const o=i.events[i.events.length-1];return o&&o[1].type==="listItemIndent"&&o[2].sliceSerialize(o[1],!0).length===i.containerState.size?e(s):t(s)}}function w3(n){n.exit(this.containerState.type)}function k3(n,e,t){const i=this;return de(n,r,"listItemPrefixWhitespace",i.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function r(s){const o=i.events[i.events.length-1];return!he(s)&&o&&o[1].type==="listItemPrefixWhitespace"?e(s):t(s)}}const Gc={name:"setextUnderline",resolveTo:x3,tokenize:v3};function x3(n,e){let t=n.length,i,r,s;for(;t--;)if(n[t][0]==="enter"){if(n[t][1].type==="content"){i=t;break}n[t][1].type==="paragraph"&&(r=t)}else n[t][1].type==="content"&&n.splice(t,1),!s&&n[t][1].type==="definition"&&(s=t);const o={type:"setextHeading",start:{...n[i][1].start},end:{...n[n.length-1][1].end}};return n[r][1].type="setextHeadingText",s?(n.splice(r,0,["enter",o,e]),n.splice(s+1,0,["exit",n[i][1],e]),n[i][1].end={...n[s][1].end}):n[i][1]=o,n.push(["exit",o,e]),n}function v3(n,e,t){const i=this;let r;return s;function s(u){let c=i.events.length,h;for(;c--;)if(i.events[c][1].type!=="lineEnding"&&i.events[c][1].type!=="linePrefix"&&i.events[c][1].type!=="content"){h=i.events[c][1].type==="paragraph";break}return!i.parser.lazy[i.now().line]&&(i.interrupt||h)?(n.enter("setextHeadingLine"),r=u,o(u)):t(u)}function o(u){return n.enter("setextHeadingLineSequence"),l(u)}function l(u){return u===r?(n.consume(u),l):(n.exit("setextHeadingLineSequence"),he(u)?de(n,a,"lineSuffix")(u):a(u))}function a(u){return u===null||Y(u)?(n.exit("setextHeadingLine"),e(u)):t(u)}}const S3={tokenize:_3};function _3(n){const e=this,t=n.attempt(Ar,i,n.attempt(this.parser.constructs.flowInitial,r,de(n,n.attempt(this.parser.constructs.flow,r,n.attempt(Mx,r)),"linePrefix")));return t;function i(s){if(s===null){n.consume(s);return}return n.enter("lineEndingBlank"),n.consume(s),n.exit("lineEndingBlank"),e.currentConstruct=void 0,t}function r(s){if(s===null){n.consume(s);return}return n.enter("lineEnding"),n.consume(s),n.exit("lineEnding"),e.currentConstruct=void 0,t}}const C3={resolveAll:Mp()},A3=Ep("string"),T3=Ep("text");function Ep(n){return{resolveAll:Mp(n==="text"?E3:void 0),tokenize:e};function e(t){const i=this,r=this.parser.constructs[n],s=t.attempt(r,o,l);return o;function o(c){return u(c)?s(c):l(c)}function l(c){if(c===null){t.consume(c);return}return t.enter("data"),t.consume(c),a}function a(c){return u(c)?(t.exit("data"),s(c)):(t.consume(c),a)}function u(c){if(c===null)return!0;const h=r[c];let f=-1;if(h)for(;++f<h.length;){const d=h[f];if(!d.previous||d.previous.call(i,i.previous))return!0}return!1}}}function Mp(n){return e;function e(t,i){let r=-1,s;for(;++r<=t.length;)s===void 0?t[r]&&t[r][1].type==="data"&&(s=r,r++):(!t[r]||t[r][1].type!=="data")&&(r!==s+2&&(t[s][1].end=t[r-1][1].end,t.splice(s+2,r-s-2),r=s+2),s=void 0);return n?n(t,i):t}}function E3(n,e){let t=0;for(;++t<=n.length;)if((t===n.length||n[t][1].type==="lineEnding")&&n[t-1][1].type==="data"){const i=n[t-1][1],r=e.sliceStream(i);let s=r.length,o=-1,l=0,a;for(;s--;){const u=r[s];if(typeof u=="string"){for(o=u.length;u.charCodeAt(o-1)===32;)l++,o--;if(o)break;o=-1}else if(u===-2)a=!0,l++;else if(u!==-1){s++;break}}if(e._contentTypeTextTrailing&&t===n.length&&(l=0),l){const u={type:t===n.length||a||l<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:s?o:i.start._bufferIndex+o,_index:i.start._index+s,line:i.end.line,column:i.end.column-l,offset:i.end.offset-l},end:{...i.end}};i.end={...u.start},i.start.offset===i.end.offset?Object.assign(i,u):(n.splice(t,0,["enter",u,e],["exit",u,e]),t+=2)}t++}return n}const M3={42:nt,43:nt,45:nt,48:nt,49:nt,50:nt,51:nt,52:nt,53:nt,54:nt,55:nt,56:nt,57:nt,62:xp},P3={91:Bx},D3={[-2]:Mo,[-1]:Mo,32:Mo},I3={35:qx,42:ps,45:[Gc,ps],60:Wx,61:Gc,95:ps,96:Kc,126:Kc},L3={38:Sp,92:vp},B3={[-5]:Po,[-4]:Po,[-3]:Po,33:a3,38:Sp,42:Wl,60:[cx,Qx],91:c3,92:[Fx,vp],93:Xa,95:Wl,96:Sx},O3={null:[Wl,C3]},R3={null:[42,95]},z3={null:[]},F3=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:R3,contentInitial:P3,disable:z3,document:M3,flow:I3,flowInitial:D3,insideSpan:O3,string:L3,text:B3},Symbol.toStringTag,{value:"Module"}));function N3(n,e,t){let i={_bufferIndex:-1,_index:0,line:t&&t.line||1,column:t&&t.column||1,offset:t&&t.offset||0};const r={},s=[];let o=[],l=[];const a={attempt:T(C),check:T(k),consume:_,enter:S,exit:D,interrupt:T(k,{interrupt:!0})},u={code:null,containerState:{},defineSkip:m,events:[],now:p,parser:n,previous:null,sliceSerialize:f,sliceStream:d,write:h};let c=e.tokenize.call(u,a);return e.resolveAll&&s.push(e),u;function h(M){return o=wt(o,M),b(),o[o.length-1]!==null?[]:(I(e,0),u.events=Qs(s,u.events,u),u.events)}function f(M,x){return H3(d(M),x)}function d(M){return q3(o,M)}function p(){const{_bufferIndex:M,_index:x,line:F,column:q,offset:z}=i;return{_bufferIndex:M,_index:x,line:F,column:q,offset:z}}function m(M){r[M.line]=M.column,v()}function b(){let M;for(;i._index<o.length;){const x=o[i._index];if(typeof x=="string")for(M=i._index,i._bufferIndex<0&&(i._bufferIndex=0);i._index===M&&i._bufferIndex<x.length;)g(x.charCodeAt(i._bufferIndex));else g(x)}}function g(M){c=c(M)}function _(M){Y(M)?(i.line++,i.column=1,i.offset+=M===-3?2:1,v()):M!==-1&&(i.column++,i.offset++),i._bufferIndex<0?i._index++:(i._bufferIndex++,i._bufferIndex===o[i._index].length&&(i._bufferIndex=-1,i._index++)),u.previous=M}function S(M,x){const F=x||{};return F.type=M,F.start=p(),u.events.push(["enter",F,u]),l.push(F),F}function D(M){const x=l.pop();return x.end=p(),u.events.push(["exit",x,u]),x}function C(M,x){I(M,x.from)}function k(M,x){x.restore()}function T(M,x){return F;function F(q,z,j){let V,te,J,w;return Array.isArray(q)?le(q):"tokenize"in q?le([q]):oe(q);function oe(ie){return Le;function Le(_e){const qe=_e!==null&&ie[_e],Me=_e!==null&&ie.null,Be=[...Array.isArray(qe)?qe:qe?[qe]:[],...Array.isArray(Me)?Me:Me?[Me]:[]];return le(Be)(_e)}}function le(ie){return V=ie,te=0,ie.length===0?j:y(ie[te])}function y(ie){return Le;function Le(_e){return w=P(),J=ie,ie.partial||(u.currentConstruct=ie),ie.name&&u.parser.constructs.disable.null.includes(ie.name)?Q():ie.tokenize.call(x?Object.assign(Object.create(u),x):u,a,ae,Q)(_e)}}function ae(ie){return M(J,w),z}function Q(ie){return w.restore(),++te<V.length?y(V[te]):j}}}function I(M,x){M.resolveAll&&!s.includes(M)&&s.push(M),M.resolve&&gt(u.events,x,u.events.length-x,M.resolve(u.events.slice(x),u)),M.resolveTo&&(u.events=M.resolveTo(u.events,u))}function P(){const M=p(),x=u.previous,F=u.currentConstruct,q=u.events.length,z=Array.from(l);return{from:q,restore:j};function j(){i=M,u.previous=x,u.currentConstruct=F,u.events.length=q,l=z,v()}}function v(){i.line in r&&i.column<2&&(i.column=r[i.line],i.offset+=r[i.line]-1)}}function q3(n,e){const t=e.start._index,i=e.start._bufferIndex,r=e.end._index,s=e.end._bufferIndex;let o;if(t===r)o=[n[t].slice(i,s)];else{if(o=n.slice(t,r),i>-1){const l=o[0];typeof l=="string"?o[0]=l.slice(i):o.shift()}s>0&&o.push(n[r].slice(0,s))}return o}function H3(n,e){let t=-1;const i=[];let r;for(;++t<n.length;){const s=n[t];let o;if(typeof s=="string")o=s;else switch(s){case-5:{o="\r";break}case-4:{o=`
`;break}case-3:{o=`\r
`;break}case-2:{o=e?" ":"	";break}case-1:{if(!e&&r)continue;o=" ";break}default:o=String.fromCharCode(s)}r=s===-2,i.push(o)}return i.join("")}function $3(n){const i={constructs:wp([F3,...(n||{}).extensions||[]]),content:r(ix),defined:[],document:r(sx),flow:r(S3),lazy:{},string:r(A3),text:r(T3)};return i;function r(s){return o;function o(l){return N3(i,s,l)}}}function V3(n){for(;!_p(n););return n}const Yc=/[\0\t\n\r]/g;function W3(){let n=1,e="",t=!0,i;return r;function r(s,o,l){const a=[];let u,c,h,f,d;for(s=e+(typeof s=="string"?s.toString():new TextDecoder(o||void 0).decode(s)),h=0,e="",t&&(s.charCodeAt(0)===65279&&h++,t=void 0);h<s.length;){if(Yc.lastIndex=h,u=Yc.exec(s),f=u&&u.index!==void 0?u.index:s.length,d=s.charCodeAt(f),!u){e=s.slice(h);break}if(d===10&&h===f&&i)a.push(-3),i=void 0;else switch(i&&(a.push(-5),i=void 0),h<f&&(a.push(s.slice(h,f)),n+=f-h),d){case 0:{a.push(65533),n++;break}case 9:{for(c=Math.ceil(n/4)*4,a.push(-2);n++<c;)a.push(-1);break}case 10:{a.push(-4),n=1;break}default:i=!0,n=1}h=f+1}return l&&(i&&a.push(-5),e&&a.push(e),a.push(null)),a}}const U3=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function Pp(n){return n.replace(U3,j3)}function j3(n,e,t){if(e)return e;if(t.charCodeAt(0)===35){const r=t.charCodeAt(1),s=r===120||r===88;return kp(t.slice(s?2:1),s?16:10)}return Ka(t)||n}function or(n){return!n||typeof n!="object"?"":"position"in n||"type"in n?Qc(n.position):"start"in n||"end"in n?Qc(n):"line"in n||"column"in n?Ul(n):""}function Ul(n){return Jc(n&&n.line)+":"+Jc(n&&n.column)}function Qc(n){return Ul(n&&n.start)+"-"+Ul(n&&n.end)}function Jc(n){return n&&typeof n=="number"?n:1}const Dp={}.hasOwnProperty;function K3(n,e,t){return e&&typeof e=="object"&&(t=e,e=void 0),X3(t)(V3($3(t).document().write(W3()(n,e,!0))))}function X3(n){const e={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:s(en),autolinkProtocol:P,autolinkEmail:P,atxHeading:s(fn),blockQuote:s(Me),characterEscape:P,characterReference:P,codeFenced:s(Be),codeFencedFenceInfo:o,codeFencedFenceMeta:o,codeIndented:s(Be,o),codeText:s(N,o),codeTextData:P,data:P,codeFlowValue:P,definition:s(re),definitionDestinationString:o,definitionLabelString:o,definitionTitleString:o,emphasis:s(ne),hardBreakEscape:s(Bn),hardBreakTrailing:s(Bn),htmlFlow:s(Ot,o),htmlFlowData:P,htmlText:s(Ot,o),htmlTextData:P,image:s(Ri),label:o,link:s(en),listItem:s(Zn),listItemValue:f,listOrdered:s(Rt,h),listUnordered:s(Rt),paragraph:s(ei),reference:y,referenceString:o,resourceDestinationString:o,resourceTitleString:o,setextHeading:s(fn),strong:s(ti),thematicBreak:s(_t)},exit:{atxHeading:a(),atxHeadingSequence:C,autolink:a(),autolinkEmail:qe,autolinkProtocol:_e,blockQuote:a(),characterEscapeValue:v,characterReferenceMarkerHexadecimal:Q,characterReferenceMarkerNumeric:Q,characterReferenceValue:ie,characterReference:Le,codeFenced:a(b),codeFencedFence:m,codeFencedFenceInfo:d,codeFencedFenceMeta:p,codeFlowValue:v,codeIndented:a(g),codeText:a(z),codeTextData:v,data:v,definition:a(),definitionDestinationString:D,definitionLabelString:_,definitionTitleString:S,emphasis:a(),hardBreakEscape:a(x),hardBreakTrailing:a(x),htmlFlow:a(F),htmlFlowData:v,htmlText:a(q),htmlTextData:v,image:a(V),label:J,labelText:te,lineEnding:M,link:a(j),listItem:a(),listOrdered:a(),listUnordered:a(),paragraph:a(),referenceString:ae,resourceDestinationString:w,resourceTitleString:oe,resource:le,setextHeading:a(I),setextHeadingLineSequence:T,setextHeadingText:k,strong:a(),thematicBreak:a()}};Ip(e,(n||{}).mdastExtensions||[]);const t={};return i;function i(E){let R={type:"root",children:[]};const K={stack:[R],tokenStack:[],config:e,enter:l,exit:u,buffer:o,resume:c,data:t},ue=[];let be=-1;for(;++be<E.length;)if(E[be][1].type==="listOrdered"||E[be][1].type==="listUnordered")if(E[be][0]==="enter")ue.push(be);else{const Ue=ue.pop();be=r(E,Ue,be)}for(be=-1;++be<E.length;){const Ue=e[E[be][0]];Dp.call(Ue,E[be][1].type)&&Ue[E[be][1].type].call(Object.assign({sliceSerialize:E[be][2].sliceSerialize},K),E[be][1])}if(K.tokenStack.length>0){const Ue=K.tokenStack[K.tokenStack.length-1];(Ue[1]||Zc).call(K,void 0,Ue[0])}for(R.position={start:gn(E.length>0?E[0][1].start:{line:1,column:1,offset:0}),end:gn(E.length>0?E[E.length-2][1].end:{line:1,column:1,offset:0})},be=-1;++be<e.transforms.length;)R=e.transforms[be](R)||R;return R}function r(E,R,K){let ue=R-1,be=-1,Ue=!1,tn,ct,nn,On;for(;++ue<=K;){const He=E[ue];switch(He[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{He[0]==="enter"?be++:be--,On=void 0;break}case"lineEndingBlank":{He[0]==="enter"&&(tn&&!On&&!be&&!nn&&(nn=ue),On=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:On=void 0}if(!be&&He[0]==="enter"&&He[1].type==="listItemPrefix"||be===-1&&He[0]==="exit"&&(He[1].type==="listUnordered"||He[1].type==="listOrdered")){if(tn){let rn=ue;for(ct=void 0;rn--;){const Ct=E[rn];if(Ct[1].type==="lineEnding"||Ct[1].type==="lineEndingBlank"){if(Ct[0]==="exit")continue;ct&&(E[ct][1].type="lineEndingBlank",Ue=!0),Ct[1].type="lineEnding",ct=rn}else if(!(Ct[1].type==="linePrefix"||Ct[1].type==="blockQuotePrefix"||Ct[1].type==="blockQuotePrefixWhitespace"||Ct[1].type==="blockQuoteMarker"||Ct[1].type==="listItemIndent"))break}nn&&(!ct||nn<ct)&&(tn._spread=!0),tn.end=Object.assign({},ct?E[ct][1].start:He[1].end),E.splice(ct||ue,0,["exit",tn,He[2]]),ue++,K++}if(He[1].type==="listItemPrefix"){const rn={type:"listItem",_spread:!1,start:Object.assign({},He[1].start),end:void 0};tn=rn,E.splice(ue,0,["enter",rn,He[2]]),ue++,K++,nn=void 0,On=!0}}}return E[R][1]._spread=Ue,K}function s(E,R){return K;function K(ue){l.call(this,E(ue),ue),R&&R.call(this,ue)}}function o(){this.stack.push({type:"fragment",children:[]})}function l(E,R,K){this.stack[this.stack.length-1].children.push(E),this.stack.push(E),this.tokenStack.push([R,K||void 0]),E.position={start:gn(R.start),end:void 0}}function a(E){return R;function R(K){E&&E.call(this,K),u.call(this,K)}}function u(E,R){const K=this.stack.pop(),ue=this.tokenStack.pop();if(ue)ue[0].type!==E.type&&(R?R.call(this,E,ue[0]):(ue[1]||Zc).call(this,E,ue[0]));else throw new Error("Cannot close `"+E.type+"` ("+or({start:E.start,end:E.end})+"): it’s not open");K.position.end=gn(E.end)}function c(){return ja(this.stack.pop())}function h(){this.data.expectingFirstListItemValue=!0}function f(E){if(this.data.expectingFirstListItemValue){const R=this.stack[this.stack.length-2];R.start=Number.parseInt(this.sliceSerialize(E),10),this.data.expectingFirstListItemValue=void 0}}function d(){const E=this.resume(),R=this.stack[this.stack.length-1];R.lang=E}function p(){const E=this.resume(),R=this.stack[this.stack.length-1];R.meta=E}function m(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function b(){const E=this.resume(),R=this.stack[this.stack.length-1];R.value=E.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function g(){const E=this.resume(),R=this.stack[this.stack.length-1];R.value=E.replace(/(\r?\n|\r)$/g,"")}function _(E){const R=this.resume(),K=this.stack[this.stack.length-1];K.label=R,K.identifier=Dt(this.sliceSerialize(E)).toLowerCase()}function S(){const E=this.resume(),R=this.stack[this.stack.length-1];R.title=E}function D(){const E=this.resume(),R=this.stack[this.stack.length-1];R.url=E}function C(E){const R=this.stack[this.stack.length-1];if(!R.depth){const K=this.sliceSerialize(E).length;R.depth=K}}function k(){this.data.setextHeadingSlurpLineEnding=!0}function T(E){const R=this.stack[this.stack.length-1];R.depth=this.sliceSerialize(E).codePointAt(0)===61?1:2}function I(){this.data.setextHeadingSlurpLineEnding=void 0}function P(E){const K=this.stack[this.stack.length-1].children;let ue=K[K.length-1];(!ue||ue.type!=="text")&&(ue=bt(),ue.position={start:gn(E.start),end:void 0},K.push(ue)),this.stack.push(ue)}function v(E){const R=this.stack.pop();R.value+=this.sliceSerialize(E),R.position.end=gn(E.end)}function M(E){const R=this.stack[this.stack.length-1];if(this.data.atHardBreak){const K=R.children[R.children.length-1];K.position.end=gn(E.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&e.canContainEols.includes(R.type)&&(P.call(this,E),v.call(this,E))}function x(){this.data.atHardBreak=!0}function F(){const E=this.resume(),R=this.stack[this.stack.length-1];R.value=E}function q(){const E=this.resume(),R=this.stack[this.stack.length-1];R.value=E}function z(){const E=this.resume(),R=this.stack[this.stack.length-1];R.value=E}function j(){const E=this.stack[this.stack.length-1];if(this.data.inReference){const R=this.data.referenceType||"shortcut";E.type+="Reference",E.referenceType=R,delete E.url,delete E.title}else delete E.identifier,delete E.label;this.data.referenceType=void 0}function V(){const E=this.stack[this.stack.length-1];if(this.data.inReference){const R=this.data.referenceType||"shortcut";E.type+="Reference",E.referenceType=R,delete E.url,delete E.title}else delete E.identifier,delete E.label;this.data.referenceType=void 0}function te(E){const R=this.sliceSerialize(E),K=this.stack[this.stack.length-2];K.label=Pp(R),K.identifier=Dt(R).toLowerCase()}function J(){const E=this.stack[this.stack.length-1],R=this.resume(),K=this.stack[this.stack.length-1];if(this.data.inReference=!0,K.type==="link"){const ue=E.children;K.children=ue}else K.alt=R}function w(){const E=this.resume(),R=this.stack[this.stack.length-1];R.url=E}function oe(){const E=this.resume(),R=this.stack[this.stack.length-1];R.title=E}function le(){this.data.inReference=void 0}function y(){this.data.referenceType="collapsed"}function ae(E){const R=this.resume(),K=this.stack[this.stack.length-1];K.label=R,K.identifier=Dt(this.sliceSerialize(E)).toLowerCase(),this.data.referenceType="full"}function Q(E){this.data.characterReferenceType=E.type}function ie(E){const R=this.sliceSerialize(E),K=this.data.characterReferenceType;let ue;K?(ue=kp(R,K==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):ue=Ka(R);const be=this.stack[this.stack.length-1];be.value+=ue}function Le(E){const R=this.stack.pop();R.position.end=gn(E.end)}function _e(E){v.call(this,E);const R=this.stack[this.stack.length-1];R.url=this.sliceSerialize(E)}function qe(E){v.call(this,E);const R=this.stack[this.stack.length-1];R.url="mailto:"+this.sliceSerialize(E)}function Me(){return{type:"blockquote",children:[]}}function Be(){return{type:"code",lang:null,meta:null,value:""}}function N(){return{type:"inlineCode",value:""}}function re(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function ne(){return{type:"emphasis",children:[]}}function fn(){return{type:"heading",depth:0,children:[]}}function Bn(){return{type:"break"}}function Ot(){return{type:"html",value:""}}function Ri(){return{type:"image",title:null,url:"",alt:null}}function en(){return{type:"link",title:null,url:"",children:[]}}function Rt(E){return{type:"list",ordered:E.type==="listOrdered",start:null,spread:E._spread,children:[]}}function Zn(E){return{type:"listItem",spread:E._spread,checked:null,children:[]}}function ei(){return{type:"paragraph",children:[]}}function ti(){return{type:"strong",children:[]}}function bt(){return{type:"text",value:""}}function _t(){return{type:"thematicBreak"}}}function gn(n){return{line:n.line,column:n.column,offset:n.offset}}function Ip(n,e){let t=-1;for(;++t<e.length;){const i=e[t];Array.isArray(i)?Ip(n,i):G3(n,i)}}function G3(n,e){let t;for(t in e)if(Dp.call(e,t))switch(t){case"canContainEols":{const i=e[t];i&&n[t].push(...i);break}case"transforms":{const i=e[t];i&&n[t].push(...i);break}case"enter":case"exit":{const i=e[t];i&&Object.assign(n[t],i);break}}}function Zc(n,e){throw n?new Error("Cannot close `"+n.type+"` ("+or({start:n.start,end:n.end})+"): a different token (`"+e.type+"`, "+or({start:e.start,end:e.end})+") is open"):new Error("Cannot close document, a token (`"+e.type+"`, "+or({start:e.start,end:e.end})+") is still open")}function Y3(n){const e=this;e.parser=t;function t(i){return K3(i,{...e.data("settings"),...n,extensions:e.data("micromarkExtensions")||[],mdastExtensions:e.data("fromMarkdownExtensions")||[]})}}const eh={}.hasOwnProperty;function Lp(n,e){const t=e||{};function i(r,...s){let o=i.invalid;const l=i.handlers;if(r&&eh.call(r,n)){const a=String(r[n]);o=eh.call(l,a)?l[a]:i.unknown}if(o)return o.call(this,r,...s)}return i.handlers=t.handlers||{},i.invalid=t.invalid,i.unknown=t.unknown,i}const Q3={}.hasOwnProperty;function Bp(n,e){let t=-1,i;if(e.extensions)for(;++t<e.extensions.length;)Bp(n,e.extensions[t]);for(i in e)if(Q3.call(e,i))switch(i){case"extensions":break;case"unsafe":{th(n[i],e[i]);break}case"join":{th(n[i],e[i]);break}case"handlers":{J3(n[i],e[i]);break}default:n.options[i]=e[i]}return n}function th(n,e){e&&n.push(...e)}function J3(n,e){e&&Object.assign(n,e)}function Z3(n,e,t,i){const r=t.enter("blockquote"),s=t.createTracker(i);s.move("> "),s.shift(2);const o=t.indentLines(t.containerFlow(n,s.current()),ev);return r(),o}function ev(n,e,t){return">"+(t?"":" ")+n}function Op(n,e){return nh(n,e.inConstruct,!0)&&!nh(n,e.notInConstruct,!1)}function nh(n,e,t){if(typeof e=="string"&&(e=[e]),!e||e.length===0)return t;let i=-1;for(;++i<e.length;)if(n.includes(e[i]))return!0;return!1}function ih(n,e,t,i){let r=-1;for(;++r<t.unsafe.length;)if(t.unsafe[r].character===`
`&&Op(t.stack,t.unsafe[r]))return/[ \t]/.test(i.before)?"":" ";return`\\
`}function tv(n,e){const t=String(n);let i=t.indexOf(e),r=i,s=0,o=0;if(typeof e!="string")throw new TypeError("Expected substring");for(;i!==-1;)i===r?++s>o&&(o=s):s=1,r=i+e.length,i=t.indexOf(e,r);return o}function jl(n,e){return!!(e.options.fences===!1&&n.value&&!n.lang&&/[^ \r\n]/.test(n.value)&&!/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(n.value))}function nv(n){const e=n.options.fence||"`";if(e!=="`"&&e!=="~")throw new Error("Cannot serialize code with `"+e+"` for `options.fence`, expected `` ` `` or `~`");return e}function iv(n,e,t,i){const r=nv(t),s=n.value||"",o=r==="`"?"GraveAccent":"Tilde";if(jl(n,t)){const h=t.enter("codeIndented"),f=t.indentLines(s,rv);return h(),f}const l=t.createTracker(i),a=r.repeat(Math.max(tv(s,r)+1,3)),u=t.enter("codeFenced");let c=l.move(a);if(n.lang){const h=t.enter(`codeFencedLang${o}`);c+=l.move(t.safe(n.lang,{before:c,after:" ",encode:["`"],...l.current()})),h()}if(n.lang&&n.meta){const h=t.enter(`codeFencedMeta${o}`);c+=l.move(" "),c+=l.move(t.safe(n.meta,{before:c,after:`
`,encode:["`"],...l.current()})),h()}return c+=l.move(`
`),s&&(c+=l.move(s+`
`)),c+=l.move(a),u(),c}function rv(n,e,t){return(t?"":"    ")+n}function Ga(n){const e=n.options.quote||'"';if(e!=='"'&&e!=="'")throw new Error("Cannot serialize title with `"+e+"` for `options.quote`, expected `\"`, or `'`");return e}function sv(n,e,t,i){const r=Ga(t),s=r==='"'?"Quote":"Apostrophe",o=t.enter("definition");let l=t.enter("label");const a=t.createTracker(i);let u=a.move("[");return u+=a.move(t.safe(t.associationId(n),{before:u,after:"]",...a.current()})),u+=a.move("]: "),l(),!n.url||/[\0- \u007F]/.test(n.url)?(l=t.enter("destinationLiteral"),u+=a.move("<"),u+=a.move(t.safe(n.url,{before:u,after:">",...a.current()})),u+=a.move(">")):(l=t.enter("destinationRaw"),u+=a.move(t.safe(n.url,{before:u,after:n.title?" ":`
`,...a.current()}))),l(),n.title&&(l=t.enter(`title${s}`),u+=a.move(" "+r),u+=a.move(t.safe(n.title,{before:u,after:r,...a.current()})),u+=a.move(r),l()),o(),u}function ov(n){const e=n.options.emphasis||"*";if(e!=="*"&&e!=="_")throw new Error("Cannot serialize emphasis with `"+e+"` for `options.emphasis`, expected `*`, or `_`");return e}function En(n){return"&#x"+n.toString(16).toUpperCase()+";"}function Is(n,e,t){const i=Ii(n),r=Ii(e);return i===void 0?r===void 0?t==="_"?{inside:!0,outside:!0}:{inside:!1,outside:!1}:r===1?{inside:!0,outside:!0}:{inside:!1,outside:!0}:i===1?r===void 0?{inside:!1,outside:!1}:r===1?{inside:!0,outside:!0}:{inside:!1,outside:!1}:r===void 0?{inside:!1,outside:!1}:r===1?{inside:!0,outside:!1}:{inside:!1,outside:!1}}Rp.peek=lv;function Rp(n,e,t,i){const r=ov(t),s=t.enter("emphasis"),o=t.createTracker(i),l=o.move(r);let a=o.move(t.containerPhrasing(n,{after:r,before:l,...o.current()}));const u=a.charCodeAt(0),c=Is(i.before.charCodeAt(i.before.length-1),u,r);c.inside&&(a=En(u)+a.slice(1));const h=a.charCodeAt(a.length-1),f=Is(i.after.charCodeAt(0),h,r);f.inside&&(a=a.slice(0,-1)+En(h));const d=o.move(r);return s(),t.attentionEncodeSurroundingInfo={after:f.outside,before:c.outside},l+a+d}function lv(n,e,t){return t.options.emphasis||"*"}const Js=(function(n){if(n==null)return hv;if(typeof n=="function")return Zs(n);if(typeof n=="object")return Array.isArray(n)?av(n):uv(n);if(typeof n=="string")return cv(n);throw new Error("Expected function, string, or object as test")});function av(n){const e=[];let t=-1;for(;++t<n.length;)e[t]=Js(n[t]);return Zs(i);function i(...r){let s=-1;for(;++s<e.length;)if(e[s].apply(this,r))return!0;return!1}}function uv(n){const e=n;return Zs(t);function t(i){const r=i;let s;for(s in n)if(r[s]!==e[s])return!1;return!0}}function cv(n){return Zs(e);function e(t){return t&&t.type===n}}function Zs(n){return e;function e(t,i,r){return!!(fv(t)&&n.call(this,t,typeof i=="number"?i:void 0,r||void 0))}}function hv(){return!0}function fv(n){return n!==null&&typeof n=="object"&&"type"in n}const zp=[],dv=!0,Kl=!1,pv="skip";function Fp(n,e,t,i){let r;typeof e=="function"&&typeof t!="function"?(i=t,t=e):r=e;const s=Js(r),o=i?-1:1;l(n,void 0,[])();function l(a,u,c){const h=a&&typeof a=="object"?a:{};if(typeof h.type=="string"){const d=typeof h.tagName=="string"?h.tagName:typeof h.name=="string"?h.name:void 0;Object.defineProperty(f,"name",{value:"node ("+(a.type+(d?"<"+d+">":""))+")"})}return f;function f(){let d=zp,p,m,b;if((!e||s(a,u,c[c.length-1]||void 0))&&(d=mv(t(a,c)),d[0]===Kl))return d;if("children"in a&&a.children){const g=a;if(g.children&&d[0]!==pv)for(m=(i?g.children.length:-1)+o,b=c.concat(g);m>-1&&m<g.children.length;){const _=g.children[m];if(p=l(_,m,b)(),p[0]===Kl)return p;m=typeof p[1]=="number"?p[1]:m+o}}return d}}}function mv(n){return Array.isArray(n)?n:typeof n=="number"?[dv,n]:n==null?zp:[n]}function Np(n,e,t,i){let r,s,o;typeof e=="function"&&typeof t!="function"?(s=void 0,o=e,r=t):(s=e,o=t,r=i),Fp(n,s,l,r);function l(a,u){const c=u[u.length-1],h=c?c.children.indexOf(a):void 0;return o(a,h,c)}}function qp(n,e){let t=!1;return Np(n,function(i){if("value"in i&&/\r?\n|\r/.test(i.value)||i.type==="break")return t=!0,Kl}),!!((!n.depth||n.depth<3)&&ja(n)&&(e.options.setext||t))}function gv(n,e,t,i){const r=Math.max(Math.min(6,n.depth||1),1),s=t.createTracker(i);if(qp(n,t)){const c=t.enter("headingSetext"),h=t.enter("phrasing"),f=t.containerPhrasing(n,{...s.current(),before:`
`,after:`
`});return h(),c(),f+`
`+(r===1?"=":"-").repeat(f.length-(Math.max(f.lastIndexOf("\r"),f.lastIndexOf(`
`))+1))}const o="#".repeat(r),l=t.enter("headingAtx"),a=t.enter("phrasing");s.move(o+" ");let u=t.containerPhrasing(n,{before:"# ",after:`
`,...s.current()});return/^[\t ]/.test(u)&&(u=En(u.charCodeAt(0))+u.slice(1)),u=u?o+" "+u:o,t.options.closeAtx&&(u+=" "+o),a(),l(),u}Hp.peek=bv;function Hp(n){return n.value||""}function bv(){return"<"}$p.peek=yv;function $p(n,e,t,i){const r=Ga(t),s=r==='"'?"Quote":"Apostrophe",o=t.enter("image");let l=t.enter("label");const a=t.createTracker(i);let u=a.move("![");return u+=a.move(t.safe(n.alt,{before:u,after:"]",...a.current()})),u+=a.move("]("),l(),!n.url&&n.title||/[\0- \u007F]/.test(n.url)?(l=t.enter("destinationLiteral"),u+=a.move("<"),u+=a.move(t.safe(n.url,{before:u,after:">",...a.current()})),u+=a.move(">")):(l=t.enter("destinationRaw"),u+=a.move(t.safe(n.url,{before:u,after:n.title?" ":")",...a.current()}))),l(),n.title&&(l=t.enter(`title${s}`),u+=a.move(" "+r),u+=a.move(t.safe(n.title,{before:u,after:r,...a.current()})),u+=a.move(r),l()),u+=a.move(")"),o(),u}function yv(){return"!"}Vp.peek=wv;function Vp(n,e,t,i){const r=n.referenceType,s=t.enter("imageReference");let o=t.enter("label");const l=t.createTracker(i);let a=l.move("![");const u=t.safe(n.alt,{before:a,after:"]",...l.current()});a+=l.move(u+"]["),o();const c=t.stack;t.stack=[],o=t.enter("reference");const h=t.safe(t.associationId(n),{before:a,after:"]",...l.current()});return o(),t.stack=c,s(),r==="full"||!u||u!==h?a+=l.move(h+"]"):r==="shortcut"?a=a.slice(0,-1):a+=l.move("]"),a}function wv(){return"!"}Wp.peek=kv;function Wp(n,e,t){let i=n.value||"",r="`",s=-1;for(;new RegExp("(^|[^`])"+r+"([^`]|$)").test(i);)r+="`";for(/[^ \r\n]/.test(i)&&(/^[ \r\n]/.test(i)&&/[ \r\n]$/.test(i)||/^`|`$/.test(i))&&(i=" "+i+" ");++s<t.unsafe.length;){const o=t.unsafe[s],l=t.compilePattern(o);let a;if(o.atBreak)for(;a=l.exec(i);){let u=a.index;i.charCodeAt(u)===10&&i.charCodeAt(u-1)===13&&u--,i=i.slice(0,u)+" "+i.slice(a.index+1)}}return r+i+r}function kv(){return"`"}function Up(n,e){const t=ja(n);return!!(!e.options.resourceLink&&n.url&&!n.title&&n.children&&n.children.length===1&&n.children[0].type==="text"&&(t===n.url||"mailto:"+t===n.url)&&/^[a-z][a-z+.-]+:/i.test(n.url)&&!/[\0- <>\u007F]/.test(n.url))}jp.peek=xv;function jp(n,e,t,i){const r=Ga(t),s=r==='"'?"Quote":"Apostrophe",o=t.createTracker(i);let l,a;if(Up(n,t)){const c=t.stack;t.stack=[],l=t.enter("autolink");let h=o.move("<");return h+=o.move(t.containerPhrasing(n,{before:h,after:">",...o.current()})),h+=o.move(">"),l(),t.stack=c,h}l=t.enter("link"),a=t.enter("label");let u=o.move("[");return u+=o.move(t.containerPhrasing(n,{before:u,after:"](",...o.current()})),u+=o.move("]("),a(),!n.url&&n.title||/[\0- \u007F]/.test(n.url)?(a=t.enter("destinationLiteral"),u+=o.move("<"),u+=o.move(t.safe(n.url,{before:u,after:">",...o.current()})),u+=o.move(">")):(a=t.enter("destinationRaw"),u+=o.move(t.safe(n.url,{before:u,after:n.title?" ":")",...o.current()}))),a(),n.title&&(a=t.enter(`title${s}`),u+=o.move(" "+r),u+=o.move(t.safe(n.title,{before:u,after:r,...o.current()})),u+=o.move(r),a()),u+=o.move(")"),l(),u}function xv(n,e,t){return Up(n,t)?"<":"["}Kp.peek=vv;function Kp(n,e,t,i){const r=n.referenceType,s=t.enter("linkReference");let o=t.enter("label");const l=t.createTracker(i);let a=l.move("[");const u=t.containerPhrasing(n,{before:a,after:"]",...l.current()});a+=l.move(u+"]["),o();const c=t.stack;t.stack=[],o=t.enter("reference");const h=t.safe(t.associationId(n),{before:a,after:"]",...l.current()});return o(),t.stack=c,s(),r==="full"||!u||u!==h?a+=l.move(h+"]"):r==="shortcut"?a=a.slice(0,-1):a+=l.move("]"),a}function vv(){return"["}function Ya(n){const e=n.options.bullet||"*";if(e!=="*"&&e!=="+"&&e!=="-")throw new Error("Cannot serialize items with `"+e+"` for `options.bullet`, expected `*`, `+`, or `-`");return e}function Sv(n){const e=Ya(n),t=n.options.bulletOther;if(!t)return e==="*"?"-":"*";if(t!=="*"&&t!=="+"&&t!=="-")throw new Error("Cannot serialize items with `"+t+"` for `options.bulletOther`, expected `*`, `+`, or `-`");if(t===e)throw new Error("Expected `bullet` (`"+e+"`) and `bulletOther` (`"+t+"`) to be different");return t}function _v(n){const e=n.options.bulletOrdered||".";if(e!=="."&&e!==")")throw new Error("Cannot serialize items with `"+e+"` for `options.bulletOrdered`, expected `.` or `)`");return e}function Xp(n){const e=n.options.rule||"*";if(e!=="*"&&e!=="-"&&e!=="_")throw new Error("Cannot serialize rules with `"+e+"` for `options.rule`, expected `*`, `-`, or `_`");return e}function Cv(n,e,t,i){const r=t.enter("list"),s=t.bulletCurrent;let o=n.ordered?_v(t):Ya(t);const l=n.ordered?o==="."?")":".":Sv(t);let a=e&&t.bulletLastUsed?o===t.bulletLastUsed:!1;if(!n.ordered){const c=n.children?n.children[0]:void 0;if((o==="*"||o==="-")&&c&&(!c.children||!c.children[0])&&t.stack[t.stack.length-1]==="list"&&t.stack[t.stack.length-2]==="listItem"&&t.stack[t.stack.length-3]==="list"&&t.stack[t.stack.length-4]==="listItem"&&t.indexStack[t.indexStack.length-1]===0&&t.indexStack[t.indexStack.length-2]===0&&t.indexStack[t.indexStack.length-3]===0&&(a=!0),Xp(t)===o&&c){let h=-1;for(;++h<n.children.length;){const f=n.children[h];if(f&&f.type==="listItem"&&f.children&&f.children[0]&&f.children[0].type==="thematicBreak"){a=!0;break}}}}a&&(o=l),t.bulletCurrent=o;const u=t.containerFlow(n,i);return t.bulletLastUsed=o,t.bulletCurrent=s,r(),u}function Av(n){const e=n.options.listItemIndent||"one";if(e!=="tab"&&e!=="one"&&e!=="mixed")throw new Error("Cannot serialize items with `"+e+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return e}function Tv(n,e,t,i){const r=Av(t);let s=t.bulletCurrent||Ya(t);e&&e.type==="list"&&e.ordered&&(s=(typeof e.start=="number"&&e.start>-1?e.start:1)+(t.options.incrementListMarker===!1?0:e.children.indexOf(n))+s);let o=s.length+1;(r==="tab"||r==="mixed"&&(e&&e.type==="list"&&e.spread||n.spread))&&(o=Math.ceil(o/4)*4);const l=t.createTracker(i);l.move(s+" ".repeat(o-s.length)),l.shift(o);const a=t.enter("listItem"),u=t.indentLines(t.containerFlow(n,l.current()),c);return a(),u;function c(h,f,d){return f?(d?"":" ".repeat(o))+h:(d?s:s+" ".repeat(o-s.length))+h}}function Ev(n,e,t,i){const r=t.enter("paragraph"),s=t.enter("phrasing"),o=t.containerPhrasing(n,i);return s(),r(),o}const Mv=Js(["break","delete","emphasis","footnote","footnoteReference","image","imageReference","inlineCode","inlineMath","link","linkReference","mdxJsxTextElement","mdxTextExpression","strong","text","textDirective"]);function Pv(n,e,t,i){return(n.children.some(function(o){return Mv(o)})?t.containerPhrasing:t.containerFlow).call(t,n,i)}function Dv(n){const e=n.options.strong||"*";if(e!=="*"&&e!=="_")throw new Error("Cannot serialize strong with `"+e+"` for `options.strong`, expected `*`, or `_`");return e}Gp.peek=Iv;function Gp(n,e,t,i){const r=Dv(t),s=t.enter("strong"),o=t.createTracker(i),l=o.move(r+r);let a=o.move(t.containerPhrasing(n,{after:r,before:l,...o.current()}));const u=a.charCodeAt(0),c=Is(i.before.charCodeAt(i.before.length-1),u,r);c.inside&&(a=En(u)+a.slice(1));const h=a.charCodeAt(a.length-1),f=Is(i.after.charCodeAt(0),h,r);f.inside&&(a=a.slice(0,-1)+En(h));const d=o.move(r+r);return s(),t.attentionEncodeSurroundingInfo={after:f.outside,before:c.outside},l+a+d}function Iv(n,e,t){return t.options.strong||"*"}function Lv(n,e,t,i){return t.safe(n.value,i)}function Bv(n){const e=n.options.ruleRepetition||3;if(e<3)throw new Error("Cannot serialize rules with repetition `"+e+"` for `options.ruleRepetition`, expected `3` or more");return e}function Ov(n,e,t){const i=(Xp(t)+(t.options.ruleSpaces?" ":"")).repeat(Bv(t));return t.options.ruleSpaces?i.slice(0,-1):i}const Qa={blockquote:Z3,break:ih,code:iv,definition:sv,emphasis:Rp,hardBreak:ih,heading:gv,html:Hp,image:$p,imageReference:Vp,inlineCode:Wp,link:jp,linkReference:Kp,list:Cv,listItem:Tv,paragraph:Ev,root:Pv,strong:Gp,text:Lv,thematicBreak:Ov},Rv=[zv];function zv(n,e,t,i){if(e.type==="code"&&jl(e,i)&&(n.type==="list"||n.type===e.type&&jl(n,i)))return!1;if("spread"in t&&typeof t.spread=="boolean")return n.type==="paragraph"&&(n.type===e.type||e.type==="definition"||e.type==="heading"&&qp(e,i))?void 0:t.spread?1:0}const zn=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"],Fv=[{character:"	",after:"[\\r\\n]",inConstruct:"phrasing"},{character:"	",before:"[\\r\\n]",inConstruct:"phrasing"},{character:"	",inConstruct:["codeFencedLangGraveAccent","codeFencedLangTilde"]},{character:"\r",inConstruct:["codeFencedLangGraveAccent","codeFencedLangTilde","codeFencedMetaGraveAccent","codeFencedMetaTilde","destinationLiteral","headingAtx"]},{character:`
`,inConstruct:["codeFencedLangGraveAccent","codeFencedLangTilde","codeFencedMetaGraveAccent","codeFencedMetaTilde","destinationLiteral","headingAtx"]},{character:" ",after:"[\\r\\n]",inConstruct:"phrasing"},{character:" ",before:"[\\r\\n]",inConstruct:"phrasing"},{character:" ",inConstruct:["codeFencedLangGraveAccent","codeFencedLangTilde"]},{character:"!",after:"\\[",inConstruct:"phrasing",notInConstruct:zn},{character:'"',inConstruct:"titleQuote"},{atBreak:!0,character:"#"},{character:"#",inConstruct:"headingAtx",after:`(?:[\r
]|$)`},{character:"&",after:"[#A-Za-z]",inConstruct:"phrasing"},{character:"'",inConstruct:"titleApostrophe"},{character:"(",inConstruct:"destinationRaw"},{before:"\\]",character:"(",inConstruct:"phrasing",notInConstruct:zn},{atBreak:!0,before:"\\d+",character:")"},{character:")",inConstruct:"destinationRaw"},{atBreak:!0,character:"*",after:`(?:[ 	\r
*])`},{character:"*",inConstruct:"phrasing",notInConstruct:zn},{atBreak:!0,character:"+",after:`(?:[ 	\r
])`},{atBreak:!0,character:"-",after:`(?:[ 	\r
-])`},{atBreak:!0,before:"\\d+",character:".",after:`(?:[ 	\r
]|$)`},{atBreak:!0,character:"<",after:"[!/?A-Za-z]"},{character:"<",after:"[!/?A-Za-z]",inConstruct:"phrasing",notInConstruct:zn},{character:"<",inConstruct:"destinationLiteral"},{atBreak:!0,character:"="},{atBreak:!0,character:">"},{character:">",inConstruct:"destinationLiteral"},{atBreak:!0,character:"["},{character:"[",inConstruct:"phrasing",notInConstruct:zn},{character:"[",inConstruct:["label","reference"]},{character:"\\",after:"[\\r\\n]",inConstruct:"phrasing"},{character:"]",inConstruct:["label","reference"]},{atBreak:!0,character:"_"},{character:"_",inConstruct:"phrasing",notInConstruct:zn},{atBreak:!0,character:"`"},{character:"`",inConstruct:["codeFencedLangGraveAccent","codeFencedMetaGraveAccent"]},{character:"`",inConstruct:"phrasing",notInConstruct:zn},{atBreak:!0,character:"~"}];function Nv(n){return n.label||!n.identifier?n.label||"":Pp(n.identifier)}function qv(n){if(!n._compiled){const e=(n.atBreak?"[\\r\\n][\\t ]*":"")+(n.before?"(?:"+n.before+")":"");n._compiled=new RegExp((e?"("+e+")":"")+(/[|\\{}()[\]^$+*?.-]/.test(n.character)?"\\":"")+n.character+(n.after?"(?:"+n.after+")":""),"g")}return n._compiled}function Hv(n,e,t){const i=e.indexStack,r=n.children||[],s=[];let o=-1,l=t.before,a;i.push(-1);let u=e.createTracker(t);for(;++o<r.length;){const c=r[o];let h;if(i[i.length-1]=o,o+1<r.length){let p=e.handle.handlers[r[o+1].type];p&&p.peek&&(p=p.peek),h=p?p(r[o+1],n,e,{before:"",after:"",...u.current()}).charAt(0):""}else h=t.after;s.length>0&&(l==="\r"||l===`
`)&&c.type==="html"&&(s[s.length-1]=s[s.length-1].replace(/(\r?\n|\r)$/," "),l=" ",u=e.createTracker(t),u.move(s.join("")));let f=e.handle(c,n,e,{...u.current(),after:h,before:l});a&&a===f.slice(0,1)&&(f=En(a.charCodeAt(0))+f.slice(1));const d=e.attentionEncodeSurroundingInfo;e.attentionEncodeSurroundingInfo=void 0,a=void 0,d&&(s.length>0&&d.before&&l===s[s.length-1].slice(-1)&&(s[s.length-1]=s[s.length-1].slice(0,-1)+En(l.charCodeAt(0))),d.after&&(a=h)),u.move(f),s.push(f),l=f.slice(-1)}return i.pop(),s.join("")}function $v(n,e,t){const i=e.indexStack,r=n.children||[],s=e.createTracker(t),o=[];let l=-1;for(i.push(-1);++l<r.length;){const a=r[l];i[i.length-1]=l,o.push(s.move(e.handle(a,n,e,{before:`
`,after:`
`,...s.current()}))),a.type!=="list"&&(e.bulletLastUsed=void 0),l<r.length-1&&o.push(s.move(Vv(a,r[l+1],n,e)))}return i.pop(),o.join("")}function Vv(n,e,t,i){let r=i.join.length;for(;r--;){const s=i.join[r](n,e,t,i);if(s===!0||s===1)break;if(typeof s=="number")return`
`.repeat(1+s);if(s===!1)return`

<!---->

`}return`

`}const Wv=/\r?\n|\r/g;function Uv(n,e){const t=[];let i=0,r=0,s;for(;s=Wv.exec(n);)o(n.slice(i,s.index)),t.push(s[0]),i=s.index+s[0].length,r++;return o(n.slice(i)),t.join("");function o(l){t.push(e(l,r,!l))}}function jv(n,e,t){const i=(t.before||"")+(e||"")+(t.after||""),r=[],s=[],o={};let l=-1;for(;++l<n.unsafe.length;){const c=n.unsafe[l];if(!Op(n.stack,c))continue;const h=n.compilePattern(c);let f;for(;f=h.exec(i);){const d="before"in c||!!c.atBreak,p="after"in c,m=f.index+(d?f[1].length:0);r.includes(m)?(o[m].before&&!d&&(o[m].before=!1),o[m].after&&!p&&(o[m].after=!1)):(r.push(m),o[m]={before:d,after:p})}}r.sort(Kv);let a=t.before?t.before.length:0;const u=i.length-(t.after?t.after.length:0);for(l=-1;++l<r.length;){const c=r[l];c<a||c>=u||c+1<u&&r[l+1]===c+1&&o[c].after&&!o[c+1].before&&!o[c+1].after||r[l-1]===c-1&&o[c].before&&!o[c-1].before&&!o[c-1].after||(a!==c&&s.push(rh(i.slice(a,c),"\\")),a=c,/[!-/:-@[-`{-~]/.test(i.charAt(c))&&(!t.encode||!t.encode.includes(i.charAt(c)))?s.push("\\"):(s.push(En(i.charCodeAt(c))),a++))}return s.push(rh(i.slice(a,u),t.after)),s.join("")}function Kv(n,e){return n-e}function rh(n,e){const t=/\\(?=[!-/:-@[-`{-~])/g,i=[],r=[],s=n+e;let o=-1,l=0,a;for(;a=t.exec(s);)i.push(a.index);for(;++o<i.length;)l!==i[o]&&r.push(n.slice(l,i[o])),r.push("\\"),l=i[o];return r.push(n.slice(l)),r.join("")}function Xv(n){const e=n||{},t=e.now||{};let i=e.lineShift||0,r=t.line||1,s=t.column||1;return{move:a,current:o,shift:l};function o(){return{now:{line:r,column:s},lineShift:i}}function l(u){i+=u}function a(u){const c=u||"",h=c.split(/\r?\n|\r/g),f=h[h.length-1];return r+=h.length-1,s=h.length===1?s+f.length:1+f.length+i,c}}function Gv(n,e){const t=e||{},i={associationId:Nv,containerPhrasing:Zv,containerFlow:e4,createTracker:Xv,compilePattern:qv,enter:s,handlers:{...Qa},handle:void 0,indentLines:Uv,indexStack:[],join:[...Rv],options:{},safe:t4,stack:[],unsafe:[...Fv]};Bp(i,t),i.options.tightDefinitions&&i.join.push(Jv),i.handle=Lp("type",{invalid:Yv,unknown:Qv,handlers:i.handlers});let r=i.handle(n,void 0,i,{before:`
`,after:`
`,now:{line:1,column:1},lineShift:0});return r&&r.charCodeAt(r.length-1)!==10&&r.charCodeAt(r.length-1)!==13&&(r+=`
`),r;function s(o){return i.stack.push(o),l;function l(){i.stack.pop()}}}function Yv(n){throw new Error("Cannot handle value `"+n+"`, expected node")}function Qv(n){const e=n;throw new Error("Cannot handle unknown node `"+e.type+"`")}function Jv(n,e){if(n.type==="definition"&&n.type===e.type)return 0}function Zv(n,e){return Hv(n,this,e)}function e4(n,e){return $v(n,this,e)}function t4(n,e){return jv(this,n,e)}function n4(n){const e=this;e.compiler=t;function t(i){return Gv(i,{...e.data("settings"),...n,extensions:e.data("toMarkdownExtensions")||[]})}}function sh(n){if(n)throw n}function i4(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Do,oh;function r4(){if(oh)return Do;oh=1;var n=Object.prototype.hasOwnProperty,e=Object.prototype.toString,t=Object.defineProperty,i=Object.getOwnPropertyDescriptor,r=function(u){return typeof Array.isArray=="function"?Array.isArray(u):e.call(u)==="[object Array]"},s=function(u){if(!u||e.call(u)!=="[object Object]")return!1;var c=n.call(u,"constructor"),h=u.constructor&&u.constructor.prototype&&n.call(u.constructor.prototype,"isPrototypeOf");if(u.constructor&&!c&&!h)return!1;var f;for(f in u);return typeof f>"u"||n.call(u,f)},o=function(u,c){t&&c.name==="__proto__"?t(u,c.name,{enumerable:!0,configurable:!0,value:c.newValue,writable:!0}):u[c.name]=c.newValue},l=function(u,c){if(c==="__proto__")if(n.call(u,c)){if(i)return i(u,c).value}else return;return u[c]};return Do=function a(){var u,c,h,f,d,p,m=arguments[0],b=1,g=arguments.length,_=!1;for(typeof m=="boolean"&&(_=m,m=arguments[1]||{},b=2),(m==null||typeof m!="object"&&typeof m!="function")&&(m={});b<g;++b)if(u=arguments[b],u!=null)for(c in u)h=l(m,c),f=l(u,c),m!==f&&(_&&f&&(s(f)||(d=r(f)))?(d?(d=!1,p=h&&r(h)?h:[]):p=h&&s(h)?h:{},o(m,{name:c,newValue:a(_,p,f)})):typeof f<"u"&&o(m,{name:c,newValue:f}));return m},Do}var s4=r4();const Io=i4(s4);function Xl(n){if(typeof n!="object"||n===null)return!1;const e=Object.getPrototypeOf(n);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in n)&&!(Symbol.iterator in n)}function o4(){const n=[],e={run:t,use:i};return e;function t(...r){let s=-1;const o=r.pop();if(typeof o!="function")throw new TypeError("Expected function as last argument, not "+o);l(null,...r);function l(a,...u){const c=n[++s];let h=-1;if(a){o(a);return}for(;++h<r.length;)(u[h]===null||u[h]===void 0)&&(u[h]=r[h]);r=u,c?l4(c,l)(...u):o(null,...u)}}function i(r){if(typeof r!="function")throw new TypeError("Expected `middelware` to be a function, not "+r);return n.push(r),e}}function l4(n,e){let t;return i;function i(...o){const l=n.length>o.length;let a;l&&o.push(r);try{a=n.apply(this,o)}catch(u){const c=u;if(l&&t)throw c;return r(c)}l||(a&&a.then&&typeof a.then=="function"?a.then(s,r):a instanceof Error?r(a):s(a))}function r(o,...l){t||(t=!0,e(o,...l))}function s(o){r(null,o)}}class at extends Error{constructor(e,t,i){super(),typeof t=="string"&&(i=t,t=void 0);let r="",s={},o=!1;if(t&&("line"in t&&"column"in t?s={place:t}:"start"in t&&"end"in t?s={place:t}:"type"in t?s={ancestors:[t],place:t.position}:s={...t}),typeof e=="string"?r=e:!s.cause&&e&&(o=!0,r=e.message,s.cause=e),!s.ruleId&&!s.source&&typeof i=="string"){const a=i.indexOf(":");a===-1?s.ruleId=i:(s.source=i.slice(0,a),s.ruleId=i.slice(a+1))}if(!s.place&&s.ancestors&&s.ancestors){const a=s.ancestors[s.ancestors.length-1];a&&(s.place=a.position)}const l=s.place&&"start"in s.place?s.place.start:s.place;this.ancestors=s.ancestors||void 0,this.cause=s.cause||void 0,this.column=l?l.column:void 0,this.fatal=void 0,this.file="",this.message=r,this.line=l?l.line:void 0,this.name=or(s.place)||"1:1",this.place=s.place||void 0,this.reason=this.message,this.ruleId=s.ruleId||void 0,this.source=s.source||void 0,this.stack=o&&s.cause&&typeof s.cause.stack=="string"?s.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}at.prototype.file="";at.prototype.name="";at.prototype.reason="";at.prototype.message="";at.prototype.stack="";at.prototype.column=void 0;at.prototype.line=void 0;at.prototype.ancestors=void 0;at.prototype.cause=void 0;at.prototype.fatal=void 0;at.prototype.place=void 0;at.prototype.ruleId=void 0;at.prototype.source=void 0;const $t={basename:a4,dirname:u4,extname:c4,join:h4,sep:"/"};function a4(n,e){if(e!==void 0&&typeof e!="string")throw new TypeError('"ext" argument must be a string');Tr(n);let t=0,i=-1,r=n.length,s;if(e===void 0||e.length===0||e.length>n.length){for(;r--;)if(n.codePointAt(r)===47){if(s){t=r+1;break}}else i<0&&(s=!0,i=r+1);return i<0?"":n.slice(t,i)}if(e===n)return"";let o=-1,l=e.length-1;for(;r--;)if(n.codePointAt(r)===47){if(s){t=r+1;break}}else o<0&&(s=!0,o=r+1),l>-1&&(n.codePointAt(r)===e.codePointAt(l--)?l<0&&(i=r):(l=-1,i=o));return t===i?i=o:i<0&&(i=n.length),n.slice(t,i)}function u4(n){if(Tr(n),n.length===0)return".";let e=-1,t=n.length,i;for(;--t;)if(n.codePointAt(t)===47){if(i){e=t;break}}else i||(i=!0);return e<0?n.codePointAt(0)===47?"/":".":e===1&&n.codePointAt(0)===47?"//":n.slice(0,e)}function c4(n){Tr(n);let e=n.length,t=-1,i=0,r=-1,s=0,o;for(;e--;){const l=n.codePointAt(e);if(l===47){if(o){i=e+1;break}continue}t<0&&(o=!0,t=e+1),l===46?r<0?r=e:s!==1&&(s=1):r>-1&&(s=-1)}return r<0||t<0||s===0||s===1&&r===t-1&&r===i+1?"":n.slice(r,t)}function h4(...n){let e=-1,t;for(;++e<n.length;)Tr(n[e]),n[e]&&(t=t===void 0?n[e]:t+"/"+n[e]);return t===void 0?".":f4(t)}function f4(n){Tr(n);const e=n.codePointAt(0)===47;let t=d4(n,!e);return t.length===0&&!e&&(t="."),t.length>0&&n.codePointAt(n.length-1)===47&&(t+="/"),e?"/"+t:t}function d4(n,e){let t="",i=0,r=-1,s=0,o=-1,l,a;for(;++o<=n.length;){if(o<n.length)l=n.codePointAt(o);else{if(l===47)break;l=47}if(l===47){if(!(r===o-1||s===1))if(r!==o-1&&s===2){if(t.length<2||i!==2||t.codePointAt(t.length-1)!==46||t.codePointAt(t.length-2)!==46){if(t.length>2){if(a=t.lastIndexOf("/"),a!==t.length-1){a<0?(t="",i=0):(t=t.slice(0,a),i=t.length-1-t.lastIndexOf("/")),r=o,s=0;continue}}else if(t.length>0){t="",i=0,r=o,s=0;continue}}e&&(t=t.length>0?t+"/..":"..",i=2)}else t.length>0?t+="/"+n.slice(r+1,o):t=n.slice(r+1,o),i=o-r-1;r=o,s=0}else l===46&&s>-1?s++:s=-1}return t}function Tr(n){if(typeof n!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(n))}const p4={cwd:m4};function m4(){return"/"}function Gl(n){return!!(n!==null&&typeof n=="object"&&"href"in n&&n.href&&"protocol"in n&&n.protocol&&n.auth===void 0)}function g4(n){if(typeof n=="string")n=new URL(n);else if(!Gl(n)){const e=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+n+"`");throw e.code="ERR_INVALID_ARG_TYPE",e}if(n.protocol!=="file:"){const e=new TypeError("The URL must be of scheme file");throw e.code="ERR_INVALID_URL_SCHEME",e}return b4(n)}function b4(n){if(n.hostname!==""){const i=new TypeError('File URL host must be "localhost" or empty on darwin');throw i.code="ERR_INVALID_FILE_URL_HOST",i}const e=n.pathname;let t=-1;for(;++t<e.length;)if(e.codePointAt(t)===37&&e.codePointAt(t+1)===50){const i=e.codePointAt(t+2);if(i===70||i===102){const r=new TypeError("File URL path must not include encoded / characters");throw r.code="ERR_INVALID_FILE_URL_PATH",r}}return decodeURIComponent(e)}const Lo=["history","path","basename","stem","extname","dirname"];class y4{constructor(e){let t;e?Gl(e)?t={path:e}:typeof e=="string"||w4(e)?t={value:e}:t=e:t={},this.cwd="cwd"in t?"":p4.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let i=-1;for(;++i<Lo.length;){const s=Lo[i];s in t&&t[s]!==void 0&&t[s]!==null&&(this[s]=s==="history"?[...t[s]]:t[s])}let r;for(r in t)Lo.includes(r)||(this[r]=t[r])}get basename(){return typeof this.path=="string"?$t.basename(this.path):void 0}set basename(e){Oo(e,"basename"),Bo(e,"basename"),this.path=$t.join(this.dirname||"",e)}get dirname(){return typeof this.path=="string"?$t.dirname(this.path):void 0}set dirname(e){lh(this.basename,"dirname"),this.path=$t.join(e||"",this.basename)}get extname(){return typeof this.path=="string"?$t.extname(this.path):void 0}set extname(e){if(Bo(e,"extname"),lh(this.dirname,"extname"),e){if(e.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(e.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=$t.join(this.dirname,this.stem+(e||""))}get path(){return this.history[this.history.length-1]}set path(e){Gl(e)&&(e=g4(e)),Oo(e,"path"),this.path!==e&&this.history.push(e)}get stem(){return typeof this.path=="string"?$t.basename(this.path,this.extname):void 0}set stem(e){Oo(e,"stem"),Bo(e,"stem"),this.path=$t.join(this.dirname||"",e+(this.extname||""))}fail(e,t,i){const r=this.message(e,t,i);throw r.fatal=!0,r}info(e,t,i){const r=this.message(e,t,i);return r.fatal=void 0,r}message(e,t,i){const r=new at(e,t,i);return this.path&&(r.name=this.path+":"+r.name,r.file=this.path),r.fatal=!1,this.messages.push(r),r}toString(e){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(e||void 0).decode(this.value)}}function Bo(n,e){if(n&&n.includes($t.sep))throw new Error("`"+e+"` cannot be a path: did not expect `"+$t.sep+"`")}function Oo(n,e){if(!n)throw new Error("`"+e+"` cannot be empty")}function lh(n,e){if(!n)throw new Error("Setting `"+e+"` requires `path` to be set too")}function w4(n){return!!(n&&typeof n=="object"&&"byteLength"in n&&"byteOffset"in n)}const k4=(function(n){const i=this.constructor.prototype,r=i[n],s=function(){return r.apply(s,arguments)};return Object.setPrototypeOf(s,i),s}),x4={}.hasOwnProperty;class Ja extends k4{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=o4()}copy(){const e=new Ja;let t=-1;for(;++t<this.attachers.length;){const i=this.attachers[t];e.use(...i)}return e.data(Io(!0,{},this.namespace)),e}data(e,t){return typeof e=="string"?arguments.length===2?(Fo("data",this.frozen),this.namespace[e]=t,this):x4.call(this.namespace,e)&&this.namespace[e]||void 0:e?(Fo("data",this.frozen),this.namespace=e,this):this.namespace}freeze(){if(this.frozen)return this;const e=this;for(;++this.freezeIndex<this.attachers.length;){const[t,...i]=this.attachers[this.freezeIndex];if(i[0]===!1)continue;i[0]===!0&&(i[0]=void 0);const r=t.call(e,...i);typeof r=="function"&&this.transformers.use(r)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(e){this.freeze();const t=Xr(e),i=this.parser||this.Parser;return Ro("parse",i),i(String(t),t)}process(e,t){const i=this;return this.freeze(),Ro("process",this.parser||this.Parser),zo("process",this.compiler||this.Compiler),t?r(void 0,t):new Promise(r);function r(s,o){const l=Xr(e),a=i.parse(l);i.run(a,l,function(c,h,f){if(c||!h||!f)return u(c);const d=h,p=i.stringify(d,f);_4(p)?f.value=p:f.result=p,u(c,f)});function u(c,h){c||!h?o(c):s?s(h):t(void 0,h)}}}processSync(e){let t=!1,i;return this.freeze(),Ro("processSync",this.parser||this.Parser),zo("processSync",this.compiler||this.Compiler),this.process(e,r),uh("processSync","process",t),i;function r(s,o){t=!0,sh(s),i=o}}run(e,t,i){ah(e),this.freeze();const r=this.transformers;return!i&&typeof t=="function"&&(i=t,t=void 0),i?s(void 0,i):new Promise(s);function s(o,l){const a=Xr(t);r.run(e,a,u);function u(c,h,f){const d=h||e;c?l(c):o?o(d):i(void 0,d,f)}}}runSync(e,t){let i=!1,r;return this.run(e,t,s),uh("runSync","run",i),r;function s(o,l){sh(o),r=l,i=!0}}stringify(e,t){this.freeze();const i=Xr(t),r=this.compiler||this.Compiler;return zo("stringify",r),ah(e),r(e,i)}use(e,...t){const i=this.attachers,r=this.namespace;if(Fo("use",this.frozen),e!=null)if(typeof e=="function")a(e,t);else if(typeof e=="object")Array.isArray(e)?l(e):o(e);else throw new TypeError("Expected usable value, not `"+e+"`");return this;function s(u){if(typeof u=="function")a(u,[]);else if(typeof u=="object")if(Array.isArray(u)){const[c,...h]=u;a(c,h)}else o(u);else throw new TypeError("Expected usable value, not `"+u+"`")}function o(u){if(!("plugins"in u)&&!("settings"in u))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");l(u.plugins),u.settings&&(r.settings=Io(!0,r.settings,u.settings))}function l(u){let c=-1;if(u!=null)if(Array.isArray(u))for(;++c<u.length;){const h=u[c];s(h)}else throw new TypeError("Expected a list of plugins, not `"+u+"`")}function a(u,c){let h=-1,f=-1;for(;++h<i.length;)if(i[h][0]===u){f=h;break}if(f===-1)i.push([u,...c]);else if(c.length>0){let[d,...p]=c;const m=i[f][1];Xl(m)&&Xl(d)&&(d=Io(!0,m,d)),i[f]=[u,d,...p]}}}}const v4=new Ja().freeze();function Ro(n,e){if(typeof e!="function")throw new TypeError("Cannot `"+n+"` without `parser`")}function zo(n,e){if(typeof e!="function")throw new TypeError("Cannot `"+n+"` without `compiler`")}function Fo(n,e){if(e)throw new Error("Cannot call `"+n+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function ah(n){if(!Xl(n)||typeof n.type!="string")throw new TypeError("Expected node, got `"+n+"`")}function uh(n,e,t){if(!t)throw new Error("`"+n+"` finished async. Use `"+e+"` instead")}function Xr(n){return S4(n)?n:new y4(n)}function S4(n){return!!(n&&typeof n=="object"&&"message"in n&&"messages"in n)}function _4(n){return typeof n=="string"||C4(n)}function C4(n){return!!(n&&typeof n=="object"&&"byteLength"in n&&"byteOffset"in n)}const A4=v4().use(Y3).use(n4).freeze();function Ls(n,e){const t=String(n);if(typeof e!="string")throw new TypeError("Expected character");let i=0,r=t.indexOf(e);for(;r!==-1;)i++,r=t.indexOf(e,r+e.length);return i}function T4(n){if(typeof n!="string")throw new TypeError("Expected a string");return n.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}function E4(n,e,t){const r=Js((t||{}).ignore||[]),s=M4(e);let o=-1;for(;++o<s.length;)Fp(n,"text",l);function l(u,c){let h=-1,f;for(;++h<c.length;){const d=c[h],p=f?f.children:void 0;if(r(d,p?p.indexOf(d):void 0,f))return;f=d}if(f)return a(u,c)}function a(u,c){const h=c[c.length-1],f=s[o][0],d=s[o][1];let p=0;const b=h.children.indexOf(u);let g=!1,_=[];f.lastIndex=0;let S=f.exec(u.value);for(;S;){const D=S.index,C={index:S.index,input:S.input,stack:[...c,u]};let k=d(...S,C);if(typeof k=="string"&&(k=k.length>0?{type:"text",value:k}:void 0),k===!1?f.lastIndex=D+1:(p!==D&&_.push({type:"text",value:u.value.slice(p,D)}),Array.isArray(k)?_.push(...k):k&&_.push(k),p=D+S[0].length,g=!0),!f.global)break;S=f.exec(u.value)}return g?(p<u.value.length&&_.push({type:"text",value:u.value.slice(p)}),h.children.splice(b,1,..._)):_=[u],b+_.length}}function M4(n){const e=[];if(!Array.isArray(n))throw new TypeError("Expected find and replace tuple or list of tuples");const t=!n[0]||Array.isArray(n[0])?n:[n];let i=-1;for(;++i<t.length;){const r=t[i];e.push([P4(r[0]),D4(r[1])])}return e}function P4(n){return typeof n=="string"?new RegExp(T4(n),"g"):n}function D4(n){return typeof n=="function"?n:function(){return n}}const No="phrasing",qo=["autolink","link","image","label"];function I4(){return{transforms:[N4],enter:{literalAutolink:B4,literalAutolinkEmail:Ho,literalAutolinkHttp:Ho,literalAutolinkWww:Ho},exit:{literalAutolink:F4,literalAutolinkEmail:z4,literalAutolinkHttp:O4,literalAutolinkWww:R4}}}function L4(){return{unsafe:[{character:"@",before:"[+\\-.\\w]",after:"[\\-.\\w]",inConstruct:No,notInConstruct:qo},{character:".",before:"[Ww]",after:"[\\-.\\w]",inConstruct:No,notInConstruct:qo},{character:":",before:"[ps]",after:"\\/",inConstruct:No,notInConstruct:qo}]}}function B4(n){this.enter({type:"link",title:null,url:"",children:[]},n)}function Ho(n){this.config.enter.autolinkProtocol.call(this,n)}function O4(n){this.config.exit.autolinkProtocol.call(this,n)}function R4(n){this.config.exit.data.call(this,n);const e=this.stack[this.stack.length-1];e.type,e.url="http://"+this.sliceSerialize(n)}function z4(n){this.config.exit.autolinkEmail.call(this,n)}function F4(n){this.exit(n)}function N4(n){E4(n,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,q4],[new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)","gu"),H4]],{ignore:["link","linkReference"]})}function q4(n,e,t,i,r){let s="";if(!Yp(r)||(/^w/i.test(e)&&(t=e+t,e="",s="http://"),!$4(t)))return!1;const o=V4(t+i);if(!o[0])return!1;const l={type:"link",title:null,url:s+e+o[0],children:[{type:"text",value:e+o[0]}]};return o[1]?[l,{type:"text",value:o[1]}]:l}function H4(n,e,t,i){return!Yp(i,!0)||/[-\d_]$/.test(t)?!1:{type:"link",title:null,url:"mailto:"+e+"@"+t,children:[{type:"text",value:e+"@"+t}]}}function $4(n){const e=n.split(".");return!(e.length<2||e[e.length-1]&&(/_/.test(e[e.length-1])||!/[a-zA-Z\d]/.test(e[e.length-1]))||e[e.length-2]&&(/_/.test(e[e.length-2])||!/[a-zA-Z\d]/.test(e[e.length-2])))}function V4(n){const e=/[!"&'),.:;<>?\]}]+$/.exec(n);if(!e)return[n,void 0];n=n.slice(0,e.index);let t=e[0],i=t.indexOf(")");const r=Ls(n,"(");let s=Ls(n,")");for(;i!==-1&&r>s;)n+=t.slice(0,i+1),t=t.slice(i+1),i=t.indexOf(")"),s++;return[n,t]}function Yp(n,e){const t=n.input.charCodeAt(n.index-1);return(n.index===0||Qn(t)||Ys(t))&&(!e||t!==47)}Qp.peek=J4;function W4(){this.buffer()}function U4(n){this.enter({type:"footnoteReference",identifier:"",label:""},n)}function j4(){this.buffer()}function K4(n){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},n)}function X4(n){const e=this.resume(),t=this.stack[this.stack.length-1];t.type,t.identifier=Dt(this.sliceSerialize(n)).toLowerCase(),t.label=e}function G4(n){this.exit(n)}function Y4(n){const e=this.resume(),t=this.stack[this.stack.length-1];t.type,t.identifier=Dt(this.sliceSerialize(n)).toLowerCase(),t.label=e}function Q4(n){this.exit(n)}function J4(){return"["}function Qp(n,e,t,i){const r=t.createTracker(i);let s=r.move("[^");const o=t.enter("footnoteReference"),l=t.enter("reference");return s+=r.move(t.safe(t.associationId(n),{after:"]",before:s})),l(),o(),s+=r.move("]"),s}function Z4(){return{enter:{gfmFootnoteCallString:W4,gfmFootnoteCall:U4,gfmFootnoteDefinitionLabelString:j4,gfmFootnoteDefinition:K4},exit:{gfmFootnoteCallString:X4,gfmFootnoteCall:G4,gfmFootnoteDefinitionLabelString:Y4,gfmFootnoteDefinition:Q4}}}function e5(n){let e=!1;return n&&n.firstLineBlank&&(e=!0),{handlers:{footnoteDefinition:t,footnoteReference:Qp},unsafe:[{character:"[",inConstruct:["label","phrasing","reference"]}]};function t(i,r,s,o){const l=s.createTracker(o);let a=l.move("[^");const u=s.enter("footnoteDefinition"),c=s.enter("label");return a+=l.move(s.safe(s.associationId(i),{before:a,after:"]"})),c(),a+=l.move("]:"),i.children&&i.children.length>0&&(l.shift(4),a+=l.move((e?`
`:" ")+s.indentLines(s.containerFlow(i,l.current()),e?Jp:t5))),u(),a}}function t5(n,e,t){return e===0?n:Jp(n,e,t)}function Jp(n,e,t){return(t?"":"    ")+n}const n5=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"];Zp.peek=l5;function i5(){return{canContainEols:["delete"],enter:{strikethrough:s5},exit:{strikethrough:o5}}}function r5(){return{unsafe:[{character:"~",inConstruct:"phrasing",notInConstruct:n5}],handlers:{delete:Zp}}}function s5(n){this.enter({type:"delete",children:[]},n)}function o5(n){this.exit(n)}function Zp(n,e,t,i){const r=t.createTracker(i),s=t.enter("strikethrough");let o=r.move("~~");return o+=t.containerPhrasing(n,{...r.current(),before:o,after:"~"}),o+=r.move("~~"),s(),o}function l5(){return"~"}function a5(n){return n.length}function u5(n,e){const t=e||{},i=(t.align||[]).concat(),r=t.stringLength||a5,s=[],o=[],l=[],a=[];let u=0,c=-1;for(;++c<n.length;){const m=[],b=[];let g=-1;for(n[c].length>u&&(u=n[c].length);++g<n[c].length;){const _=c5(n[c][g]);if(t.alignDelimiters!==!1){const S=r(_);b[g]=S,(a[g]===void 0||S>a[g])&&(a[g]=S)}m.push(_)}o[c]=m,l[c]=b}let h=-1;if(typeof i=="object"&&"length"in i)for(;++h<u;)s[h]=ch(i[h]);else{const m=ch(i);for(;++h<u;)s[h]=m}h=-1;const f=[],d=[];for(;++h<u;){const m=s[h];let b="",g="";m===99?(b=":",g=":"):m===108?b=":":m===114&&(g=":");let _=t.alignDelimiters===!1?1:Math.max(1,a[h]-b.length-g.length);const S=b+"-".repeat(_)+g;t.alignDelimiters!==!1&&(_=b.length+_+g.length,_>a[h]&&(a[h]=_),d[h]=_),f[h]=S}o.splice(1,0,f),l.splice(1,0,d),c=-1;const p=[];for(;++c<o.length;){const m=o[c],b=l[c];h=-1;const g=[];for(;++h<u;){const _=m[h]||"";let S="",D="";if(t.alignDelimiters!==!1){const C=a[h]-(b[h]||0),k=s[h];k===114?S=" ".repeat(C):k===99?C%2?(S=" ".repeat(C/2+.5),D=" ".repeat(C/2-.5)):(S=" ".repeat(C/2),D=S):D=" ".repeat(C)}t.delimiterStart!==!1&&!h&&g.push("|"),t.padding!==!1&&!(t.alignDelimiters===!1&&_==="")&&(t.delimiterStart!==!1||h)&&g.push(" "),t.alignDelimiters!==!1&&g.push(S),g.push(_),t.alignDelimiters!==!1&&g.push(D),t.padding!==!1&&g.push(" "),(t.delimiterEnd!==!1||h!==u-1)&&g.push("|")}p.push(t.delimiterEnd===!1?g.join("").replace(/ +$/,""):g.join(""))}return p.join(`
`)}function c5(n){return n==null?"":String(n)}function ch(n){const e=typeof n=="string"?n.codePointAt(0):0;return e===67||e===99?99:e===76||e===108?108:e===82||e===114?114:0}function h5(){return{enter:{table:f5,tableData:hh,tableHeader:hh,tableRow:p5},exit:{codeText:m5,table:d5,tableData:$o,tableHeader:$o,tableRow:$o}}}function f5(n){const e=n._align;this.enter({type:"table",align:e.map(function(t){return t==="none"?null:t}),children:[]},n),this.data.inTable=!0}function d5(n){this.exit(n),this.data.inTable=void 0}function p5(n){this.enter({type:"tableRow",children:[]},n)}function $o(n){this.exit(n)}function hh(n){this.enter({type:"tableCell",children:[]},n)}function m5(n){let e=this.resume();this.data.inTable&&(e=e.replace(/\\([\\|])/g,g5));const t=this.stack[this.stack.length-1];t.type,t.value=e,this.exit(n)}function g5(n,e){return e==="|"?e:n}function b5(n){const e=n||{},t=e.tableCellPadding,i=e.tablePipeAlign,r=e.stringLength,s=t?" ":"|";return{unsafe:[{character:"\r",inConstruct:"tableCell"},{character:`
`,inConstruct:"tableCell"},{atBreak:!0,character:"|",after:"[	 :-]"},{character:"|",inConstruct:"tableCell"},{atBreak:!0,character:":",after:"-"},{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{inlineCode:f,table:o,tableCell:a,tableRow:l}};function o(d,p,m,b){return u(c(d,m,b),d.align)}function l(d,p,m,b){const g=h(d,m,b),_=u([g]);return _.slice(0,_.indexOf(`
`))}function a(d,p,m,b){const g=m.enter("tableCell"),_=m.enter("phrasing"),S=m.containerPhrasing(d,{...b,before:s,after:s});return _(),g(),S}function u(d,p){return u5(d,{align:p,alignDelimiters:i,padding:t,stringLength:r})}function c(d,p,m){const b=d.children;let g=-1;const _=[],S=p.enter("table");for(;++g<b.length;)_[g]=h(b[g],p,m);return S(),_}function h(d,p,m){const b=d.children;let g=-1;const _=[],S=p.enter("tableRow");for(;++g<b.length;)_[g]=a(b[g],d,p,m);return S(),_}function f(d,p,m){let b=Qa.inlineCode(d,p,m);return m.stack.includes("tableCell")&&(b=b.replace(/\|/g,"\\$&")),b}}function y5(){return{exit:{taskListCheckValueChecked:fh,taskListCheckValueUnchecked:fh,paragraph:k5}}}function w5(){return{unsafe:[{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{listItem:x5}}}function fh(n){const e=this.stack[this.stack.length-2];e.type,e.checked=n.type==="taskListCheckValueChecked"}function k5(n){const e=this.stack[this.stack.length-2];if(e&&e.type==="listItem"&&typeof e.checked=="boolean"){const t=this.stack[this.stack.length-1];t.type;const i=t.children[0];if(i&&i.type==="text"){const r=e.children;let s=-1,o;for(;++s<r.length;){const l=r[s];if(l.type==="paragraph"){o=l;break}}o===t&&(i.value=i.value.slice(1),i.value.length===0?t.children.shift():t.position&&i.position&&typeof i.position.start.offset=="number"&&(i.position.start.column++,i.position.start.offset++,t.position.start=Object.assign({},i.position.start)))}}this.exit(n)}function x5(n,e,t,i){const r=n.children[0],s=typeof n.checked=="boolean"&&r&&r.type==="paragraph",o="["+(n.checked?"x":" ")+"] ",l=t.createTracker(i);s&&l.move(o);let a=Qa.listItem(n,e,t,{...i,...l.current()});return s&&(a=a.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,u)),a;function u(c){return c+o}}function v5(){return[I4(),Z4(),i5(),h5(),y5()]}function S5(n){return{extensions:[L4(),e5(n),r5(),b5(n),w5()]}}const _5={tokenize:P5,partial:!0},em={tokenize:D5,partial:!0},tm={tokenize:I5,partial:!0},nm={tokenize:L5,partial:!0},C5={tokenize:B5,partial:!0},im={name:"wwwAutolink",tokenize:E5,previous:sm},rm={name:"protocolAutolink",tokenize:M5,previous:om},hn={name:"emailAutolink",tokenize:T5,previous:lm},Zt={};function A5(){return{text:Zt}}let Fn=48;for(;Fn<123;)Zt[Fn]=hn,Fn++,Fn===58?Fn=65:Fn===91&&(Fn=97);Zt[43]=hn;Zt[45]=hn;Zt[46]=hn;Zt[95]=hn;Zt[72]=[hn,rm];Zt[104]=[hn,rm];Zt[87]=[hn,im];Zt[119]=[hn,im];function T5(n,e,t){const i=this;let r,s;return o;function o(h){return!Yl(h)||!lm.call(i,i.previous)||Za(i.events)?t(h):(n.enter("literalAutolink"),n.enter("literalAutolinkEmail"),l(h))}function l(h){return Yl(h)?(n.consume(h),l):h===64?(n.consume(h),a):t(h)}function a(h){return h===46?n.check(C5,c,u)(h):h===45||h===95||Ge(h)?(s=!0,n.consume(h),a):c(h)}function u(h){return n.consume(h),r=!0,a}function c(h){return s&&r&&Ze(i.previous)?(n.exit("literalAutolinkEmail"),n.exit("literalAutolink"),e(h)):t(h)}}function E5(n,e,t){const i=this;return r;function r(o){return o!==87&&o!==119||!sm.call(i,i.previous)||Za(i.events)?t(o):(n.enter("literalAutolink"),n.enter("literalAutolinkWww"),n.check(_5,n.attempt(em,n.attempt(tm,s),t),t)(o))}function s(o){return n.exit("literalAutolinkWww"),n.exit("literalAutolink"),e(o)}}function M5(n,e,t){const i=this;let r="",s=!1;return o;function o(h){return(h===72||h===104)&&om.call(i,i.previous)&&!Za(i.events)?(n.enter("literalAutolink"),n.enter("literalAutolinkHttp"),r+=String.fromCodePoint(h),n.consume(h),l):t(h)}function l(h){if(Ze(h)&&r.length<5)return r+=String.fromCodePoint(h),n.consume(h),l;if(h===58){const f=r.toLowerCase();if(f==="http"||f==="https")return n.consume(h),a}return t(h)}function a(h){return h===47?(n.consume(h),s?u:(s=!0,a)):t(h)}function u(h){return h===null||Ds(h)||xe(h)||Qn(h)||Ys(h)?t(h):n.attempt(em,n.attempt(tm,c),t)(h)}function c(h){return n.exit("literalAutolinkHttp"),n.exit("literalAutolink"),e(h)}}function P5(n,e,t){let i=0;return r;function r(o){return(o===87||o===119)&&i<3?(i++,n.consume(o),r):o===46&&i===3?(n.consume(o),s):t(o)}function s(o){return o===null?t(o):e(o)}}function D5(n,e,t){let i,r,s;return o;function o(u){return u===46||u===95?n.check(nm,a,l)(u):u===null||xe(u)||Qn(u)||u!==45&&Ys(u)?a(u):(s=!0,n.consume(u),o)}function l(u){return u===95?i=!0:(r=i,i=void 0),n.consume(u),o}function a(u){return r||i||!s?t(u):e(u)}}function I5(n,e){let t=0,i=0;return r;function r(o){return o===40?(t++,n.consume(o),r):o===41&&i<t?s(o):o===33||o===34||o===38||o===39||o===41||o===42||o===44||o===46||o===58||o===59||o===60||o===63||o===93||o===95||o===126?n.check(nm,e,s)(o):o===null||xe(o)||Qn(o)?e(o):(n.consume(o),r)}function s(o){return o===41&&i++,n.consume(o),r}}function L5(n,e,t){return i;function i(l){return l===33||l===34||l===39||l===41||l===42||l===44||l===46||l===58||l===59||l===63||l===95||l===126?(n.consume(l),i):l===38?(n.consume(l),s):l===93?(n.consume(l),r):l===60||l===null||xe(l)||Qn(l)?e(l):t(l)}function r(l){return l===null||l===40||l===91||xe(l)||Qn(l)?e(l):i(l)}function s(l){return Ze(l)?o(l):t(l)}function o(l){return l===59?(n.consume(l),i):Ze(l)?(n.consume(l),o):t(l)}}function B5(n,e,t){return i;function i(s){return n.consume(s),r}function r(s){return Ge(s)?t(s):e(s)}}function sm(n){return n===null||n===40||n===42||n===95||n===91||n===93||n===126||xe(n)}function om(n){return!Ze(n)}function lm(n){return!(n===47||Yl(n))}function Yl(n){return n===43||n===45||n===46||n===95||Ge(n)}function Za(n){let e=n.length,t=!1;for(;e--;){const i=n[e][1];if((i.type==="labelLink"||i.type==="labelImage")&&!i._balanced){t=!0;break}if(i._gfmAutolinkLiteralWalkedInto){t=!1;break}}return n.length>0&&!t&&(n[n.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),t}const O5={tokenize:V5,partial:!0};function R5(){return{document:{91:{name:"gfmFootnoteDefinition",tokenize:q5,continuation:{tokenize:H5},exit:$5}},text:{91:{name:"gfmFootnoteCall",tokenize:N5},93:{name:"gfmPotentialFootnoteCall",add:"after",tokenize:z5,resolveTo:F5}}}}function z5(n,e,t){const i=this;let r=i.events.length;const s=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]);let o;for(;r--;){const a=i.events[r][1];if(a.type==="labelImage"){o=a;break}if(a.type==="gfmFootnoteCall"||a.type==="labelLink"||a.type==="label"||a.type==="image"||a.type==="link")break}return l;function l(a){if(!o||!o._balanced)return t(a);const u=Dt(i.sliceSerialize({start:o.end,end:i.now()}));return u.codePointAt(0)!==94||!s.includes(u.slice(1))?t(a):(n.enter("gfmFootnoteCallLabelMarker"),n.consume(a),n.exit("gfmFootnoteCallLabelMarker"),e(a))}}function F5(n,e){let t=n.length;for(;t--;)if(n[t][1].type==="labelImage"&&n[t][0]==="enter"){n[t][1];break}n[t+1][1].type="data",n[t+3][1].type="gfmFootnoteCallLabelMarker";const i={type:"gfmFootnoteCall",start:Object.assign({},n[t+3][1].start),end:Object.assign({},n[n.length-1][1].end)},r={type:"gfmFootnoteCallMarker",start:Object.assign({},n[t+3][1].end),end:Object.assign({},n[t+3][1].end)};r.end.column++,r.end.offset++,r.end._bufferIndex++;const s={type:"gfmFootnoteCallString",start:Object.assign({},r.end),end:Object.assign({},n[n.length-1][1].start)},o={type:"chunkString",contentType:"string",start:Object.assign({},s.start),end:Object.assign({},s.end)},l=[n[t+1],n[t+2],["enter",i,e],n[t+3],n[t+4],["enter",r,e],["exit",r,e],["enter",s,e],["enter",o,e],["exit",o,e],["exit",s,e],n[n.length-2],n[n.length-1],["exit",i,e]];return n.splice(t,n.length-t+1,...l),n}function N5(n,e,t){const i=this,r=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]);let s=0,o;return l;function l(h){return n.enter("gfmFootnoteCall"),n.enter("gfmFootnoteCallLabelMarker"),n.consume(h),n.exit("gfmFootnoteCallLabelMarker"),a}function a(h){return h!==94?t(h):(n.enter("gfmFootnoteCallMarker"),n.consume(h),n.exit("gfmFootnoteCallMarker"),n.enter("gfmFootnoteCallString"),n.enter("chunkString").contentType="string",u)}function u(h){if(s>999||h===93&&!o||h===null||h===91||xe(h))return t(h);if(h===93){n.exit("chunkString");const f=n.exit("gfmFootnoteCallString");return r.includes(Dt(i.sliceSerialize(f)))?(n.enter("gfmFootnoteCallLabelMarker"),n.consume(h),n.exit("gfmFootnoteCallLabelMarker"),n.exit("gfmFootnoteCall"),e):t(h)}return xe(h)||(o=!0),s++,n.consume(h),h===92?c:u}function c(h){return h===91||h===92||h===93?(n.consume(h),s++,u):u(h)}}function q5(n,e,t){const i=this,r=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]);let s,o=0,l;return a;function a(p){return n.enter("gfmFootnoteDefinition")._container=!0,n.enter("gfmFootnoteDefinitionLabel"),n.enter("gfmFootnoteDefinitionLabelMarker"),n.consume(p),n.exit("gfmFootnoteDefinitionLabelMarker"),u}function u(p){return p===94?(n.enter("gfmFootnoteDefinitionMarker"),n.consume(p),n.exit("gfmFootnoteDefinitionMarker"),n.enter("gfmFootnoteDefinitionLabelString"),n.enter("chunkString").contentType="string",c):t(p)}function c(p){if(o>999||p===93&&!l||p===null||p===91||xe(p))return t(p);if(p===93){n.exit("chunkString");const m=n.exit("gfmFootnoteDefinitionLabelString");return s=Dt(i.sliceSerialize(m)),n.enter("gfmFootnoteDefinitionLabelMarker"),n.consume(p),n.exit("gfmFootnoteDefinitionLabelMarker"),n.exit("gfmFootnoteDefinitionLabel"),f}return xe(p)||(l=!0),o++,n.consume(p),p===92?h:c}function h(p){return p===91||p===92||p===93?(n.consume(p),o++,c):c(p)}function f(p){return p===58?(n.enter("definitionMarker"),n.consume(p),n.exit("definitionMarker"),r.includes(s)||r.push(s),de(n,d,"gfmFootnoteDefinitionWhitespace")):t(p)}function d(p){return e(p)}}function H5(n,e,t){return n.check(Ar,e,n.attempt(O5,e,t))}function $5(n){n.exit("gfmFootnoteDefinition")}function V5(n,e,t){const i=this;return de(n,r,"gfmFootnoteDefinitionIndent",5);function r(s){const o=i.events[i.events.length-1];return o&&o[1].type==="gfmFootnoteDefinitionIndent"&&o[2].sliceSerialize(o[1],!0).length===4?e(s):t(s)}}function W5(n){let t=(n||{}).singleTilde;const i={name:"strikethrough",tokenize:s,resolveAll:r};return t==null&&(t=!0),{text:{126:i},insideSpan:{null:[i]},attentionMarkers:{null:[126]}};function r(o,l){let a=-1;for(;++a<o.length;)if(o[a][0]==="enter"&&o[a][1].type==="strikethroughSequenceTemporary"&&o[a][1]._close){let u=a;for(;u--;)if(o[u][0]==="exit"&&o[u][1].type==="strikethroughSequenceTemporary"&&o[u][1]._open&&o[a][1].end.offset-o[a][1].start.offset===o[u][1].end.offset-o[u][1].start.offset){o[a][1].type="strikethroughSequence",o[u][1].type="strikethroughSequence";const c={type:"strikethrough",start:Object.assign({},o[u][1].start),end:Object.assign({},o[a][1].end)},h={type:"strikethroughText",start:Object.assign({},o[u][1].end),end:Object.assign({},o[a][1].start)},f=[["enter",c,l],["enter",o[u][1],l],["exit",o[u][1],l],["enter",h,l]],d=l.parser.constructs.insideSpan.null;d&&gt(f,f.length,0,Qs(d,o.slice(u+1,a),l)),gt(f,f.length,0,[["exit",h,l],["enter",o[a][1],l],["exit",o[a][1],l],["exit",c,l]]),gt(o,u-1,a-u+3,f),a=u+f.length-2;break}}for(a=-1;++a<o.length;)o[a][1].type==="strikethroughSequenceTemporary"&&(o[a][1].type="data");return o}function s(o,l,a){const u=this.previous,c=this.events;let h=0;return f;function f(p){return u===126&&c[c.length-1][1].type!=="characterEscape"?a(p):(o.enter("strikethroughSequenceTemporary"),d(p))}function d(p){const m=Ii(u);if(p===126)return h>1?a(p):(o.consume(p),h++,d);if(h<2&&!t)return a(p);const b=o.exit("strikethroughSequenceTemporary"),g=Ii(p);return b._open=!g||g===2&&!!m,b._close=!m||m===2&&!!g,l(p)}}}class U5{constructor(){this.map=[]}add(e,t,i){j5(this,e,t,i)}consume(e){if(this.map.sort(function(s,o){return s[0]-o[0]}),this.map.length===0)return;let t=this.map.length;const i=[];for(;t>0;)t-=1,i.push(e.slice(this.map[t][0]+this.map[t][1]),this.map[t][2]),e.length=this.map[t][0];i.push(e.slice()),e.length=0;let r=i.pop();for(;r;){for(const s of r)e.push(s);r=i.pop()}this.map.length=0}}function j5(n,e,t,i){let r=0;if(!(t===0&&i.length===0)){for(;r<n.map.length;){if(n.map[r][0]===e){n.map[r][1]+=t,n.map[r][2].push(...i);return}r+=1}n.map.push([e,t,i])}}function K5(n,e){let t=!1;const i=[];for(;e<n.length;){const r=n[e];if(t){if(r[0]==="enter")r[1].type==="tableContent"&&i.push(n[e+1][1].type==="tableDelimiterMarker"?"left":"none");else if(r[1].type==="tableContent"){if(n[e-1][1].type==="tableDelimiterMarker"){const s=i.length-1;i[s]=i[s]==="left"?"center":"right"}}else if(r[1].type==="tableDelimiterRow")break}else r[0]==="enter"&&r[1].type==="tableDelimiterRow"&&(t=!0);e+=1}return i}function X5(){return{flow:{null:{name:"table",tokenize:G5,resolveAll:Y5}}}}function G5(n,e,t){const i=this;let r=0,s=0,o;return l;function l(v){let M=i.events.length-1;for(;M>-1;){const q=i.events[M][1].type;if(q==="lineEnding"||q==="linePrefix")M--;else break}const x=M>-1?i.events[M][1].type:null,F=x==="tableHead"||x==="tableRow"?k:a;return F===k&&i.parser.lazy[i.now().line]?t(v):F(v)}function a(v){return n.enter("tableHead"),n.enter("tableRow"),u(v)}function u(v){return v===124||(o=!0,s+=1),c(v)}function c(v){return v===null?t(v):Y(v)?s>1?(s=0,i.interrupt=!0,n.exit("tableRow"),n.enter("lineEnding"),n.consume(v),n.exit("lineEnding"),d):t(v):he(v)?de(n,c,"whitespace")(v):(s+=1,o&&(o=!1,r+=1),v===124?(n.enter("tableCellDivider"),n.consume(v),n.exit("tableCellDivider"),o=!0,c):(n.enter("data"),h(v)))}function h(v){return v===null||v===124||xe(v)?(n.exit("data"),c(v)):(n.consume(v),v===92?f:h)}function f(v){return v===92||v===124?(n.consume(v),h):h(v)}function d(v){return i.interrupt=!1,i.parser.lazy[i.now().line]?t(v):(n.enter("tableDelimiterRow"),o=!1,he(v)?de(n,p,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(v):p(v))}function p(v){return v===45||v===58?b(v):v===124?(o=!0,n.enter("tableCellDivider"),n.consume(v),n.exit("tableCellDivider"),m):C(v)}function m(v){return he(v)?de(n,b,"whitespace")(v):b(v)}function b(v){return v===58?(s+=1,o=!0,n.enter("tableDelimiterMarker"),n.consume(v),n.exit("tableDelimiterMarker"),g):v===45?(s+=1,g(v)):v===null||Y(v)?D(v):C(v)}function g(v){return v===45?(n.enter("tableDelimiterFiller"),_(v)):C(v)}function _(v){return v===45?(n.consume(v),_):v===58?(o=!0,n.exit("tableDelimiterFiller"),n.enter("tableDelimiterMarker"),n.consume(v),n.exit("tableDelimiterMarker"),S):(n.exit("tableDelimiterFiller"),S(v))}function S(v){return he(v)?de(n,D,"whitespace")(v):D(v)}function D(v){return v===124?p(v):v===null||Y(v)?!o||r!==s?C(v):(n.exit("tableDelimiterRow"),n.exit("tableHead"),e(v)):C(v)}function C(v){return t(v)}function k(v){return n.enter("tableRow"),T(v)}function T(v){return v===124?(n.enter("tableCellDivider"),n.consume(v),n.exit("tableCellDivider"),T):v===null||Y(v)?(n.exit("tableRow"),e(v)):he(v)?de(n,T,"whitespace")(v):(n.enter("data"),I(v))}function I(v){return v===null||v===124||xe(v)?(n.exit("data"),T(v)):(n.consume(v),v===92?P:I)}function P(v){return v===92||v===124?(n.consume(v),I):I(v)}}function Y5(n,e){let t=-1,i=!0,r=0,s=[0,0,0,0],o=[0,0,0,0],l=!1,a=0,u,c,h;const f=new U5;for(;++t<n.length;){const d=n[t],p=d[1];d[0]==="enter"?p.type==="tableHead"?(l=!1,a!==0&&(dh(f,e,a,u,c),c=void 0,a=0),u={type:"table",start:Object.assign({},p.start),end:Object.assign({},p.end)},f.add(t,0,[["enter",u,e]])):p.type==="tableRow"||p.type==="tableDelimiterRow"?(i=!0,h=void 0,s=[0,0,0,0],o=[0,t+1,0,0],l&&(l=!1,c={type:"tableBody",start:Object.assign({},p.start),end:Object.assign({},p.end)},f.add(t,0,[["enter",c,e]])),r=p.type==="tableDelimiterRow"?2:c?3:1):r&&(p.type==="data"||p.type==="tableDelimiterMarker"||p.type==="tableDelimiterFiller")?(i=!1,o[2]===0&&(s[1]!==0&&(o[0]=o[1],h=Gr(f,e,s,r,void 0,h),s=[0,0,0,0]),o[2]=t)):p.type==="tableCellDivider"&&(i?i=!1:(s[1]!==0&&(o[0]=o[1],h=Gr(f,e,s,r,void 0,h)),s=o,o=[s[1],t,0,0])):p.type==="tableHead"?(l=!0,a=t):p.type==="tableRow"||p.type==="tableDelimiterRow"?(a=t,s[1]!==0?(o[0]=o[1],h=Gr(f,e,s,r,t,h)):o[1]!==0&&(h=Gr(f,e,o,r,t,h)),r=0):r&&(p.type==="data"||p.type==="tableDelimiterMarker"||p.type==="tableDelimiterFiller")&&(o[3]=t)}for(a!==0&&dh(f,e,a,u,c),f.consume(e.events),t=-1;++t<e.events.length;){const d=e.events[t];d[0]==="enter"&&d[1].type==="table"&&(d[1]._align=K5(e.events,t))}return n}function Gr(n,e,t,i,r,s){const o=i===1?"tableHeader":i===2?"tableDelimiter":"tableData",l="tableContent";t[0]!==0&&(s.end=Object.assign({},ui(e.events,t[0])),n.add(t[0],0,[["exit",s,e]]));const a=ui(e.events,t[1]);if(s={type:o,start:Object.assign({},a),end:Object.assign({},a)},n.add(t[1],0,[["enter",s,e]]),t[2]!==0){const u=ui(e.events,t[2]),c=ui(e.events,t[3]),h={type:l,start:Object.assign({},u),end:Object.assign({},c)};if(n.add(t[2],0,[["enter",h,e]]),i!==2){const f=e.events[t[2]],d=e.events[t[3]];if(f[1].end=Object.assign({},d[1].end),f[1].type="chunkText",f[1].contentType="text",t[3]>t[2]+1){const p=t[2]+1,m=t[3]-t[2]-1;n.add(p,m,[])}}n.add(t[3]+1,0,[["exit",h,e]])}return r!==void 0&&(s.end=Object.assign({},ui(e.events,r)),n.add(r,0,[["exit",s,e]]),s=void 0),s}function dh(n,e,t,i,r){const s=[],o=ui(e.events,t);r&&(r.end=Object.assign({},o),s.push(["exit",r,e])),i.end=Object.assign({},o),s.push(["exit",i,e]),n.add(t+1,0,s)}function ui(n,e){const t=n[e],i=t[0]==="enter"?"start":"end";return t[1][i]}const Q5={name:"tasklistCheck",tokenize:Z5};function J5(){return{text:{91:Q5}}}function Z5(n,e,t){const i=this;return r;function r(a){return i.previous!==null||!i._gfmTasklistFirstContentOfListItem?t(a):(n.enter("taskListCheck"),n.enter("taskListCheckMarker"),n.consume(a),n.exit("taskListCheckMarker"),s)}function s(a){return xe(a)?(n.enter("taskListCheckValueUnchecked"),n.consume(a),n.exit("taskListCheckValueUnchecked"),o):a===88||a===120?(n.enter("taskListCheckValueChecked"),n.consume(a),n.exit("taskListCheckValueChecked"),o):t(a)}function o(a){return a===93?(n.enter("taskListCheckMarker"),n.consume(a),n.exit("taskListCheckMarker"),n.exit("taskListCheck"),l):t(a)}function l(a){return Y(a)?e(a):he(a)?n.check({tokenize:e6},e,t)(a):t(a)}}function e6(n,e,t){return de(n,i,"whitespace");function i(r){return r===null?t(r):e(r)}}function t6(n){return wp([A5(),R5(),W5(n),X5(),J5()])}const n6={};function i6(n){const e=this,t=n||n6,i=e.data(),r=i.micromarkExtensions||(i.micromarkExtensions=[]),s=i.fromMarkdownExtensions||(i.fromMarkdownExtensions=[]),o=i.toMarkdownExtensions||(i.toMarkdownExtensions=[]);r.push(t6(t)),s.push(v5()),o.push(S5(t))}function r6(n,e){const t={type:"element",tagName:"blockquote",properties:{},children:n.wrap(n.all(e),!0)};return n.patch(e,t),n.applyData(e,t)}function s6(n,e){const t={type:"element",tagName:"br",properties:{},children:[]};return n.patch(e,t),[n.applyData(e,t),{type:"text",value:`
`}]}function o6(n,e){const t=e.value?e.value+`
`:"",i={},r=e.lang?e.lang.split(/\s+/):[];r.length>0&&(i.className=["language-"+r[0]]);let s={type:"element",tagName:"code",properties:i,children:[{type:"text",value:t}]};return e.meta&&(s.data={meta:e.meta}),n.patch(e,s),s=n.applyData(e,s),s={type:"element",tagName:"pre",properties:{},children:[s]},n.patch(e,s),s}function l6(n,e){const t={type:"element",tagName:"del",properties:{},children:n.all(e)};return n.patch(e,t),n.applyData(e,t)}function a6(n,e){const t={type:"element",tagName:"em",properties:{},children:n.all(e)};return n.patch(e,t),n.applyData(e,t)}function u6(n,e){const t=typeof n.options.clobberPrefix=="string"?n.options.clobberPrefix:"user-content-",i=String(e.identifier).toUpperCase(),r=Bi(i.toLowerCase()),s=n.footnoteOrder.indexOf(i);let o,l=n.footnoteCounts.get(i);l===void 0?(l=0,n.footnoteOrder.push(i),o=n.footnoteOrder.length):o=s+1,l+=1,n.footnoteCounts.set(i,l);const a={type:"element",tagName:"a",properties:{href:"#"+t+"fn-"+r,id:t+"fnref-"+r+(l>1?"-"+l:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(o)}]};n.patch(e,a);const u={type:"element",tagName:"sup",properties:{},children:[a]};return n.patch(e,u),n.applyData(e,u)}function c6(n,e){const t={type:"element",tagName:"h"+e.depth,properties:{},children:n.all(e)};return n.patch(e,t),n.applyData(e,t)}function h6(n,e){if(n.options.allowDangerousHtml){const t={type:"raw",value:e.value};return n.patch(e,t),n.applyData(e,t)}}function am(n,e){const t=e.referenceType;let i="]";if(t==="collapsed"?i+="[]":t==="full"&&(i+="["+(e.label||e.identifier)+"]"),e.type==="imageReference")return[{type:"text",value:"!["+e.alt+i}];const r=n.all(e),s=r[0];s&&s.type==="text"?s.value="["+s.value:r.unshift({type:"text",value:"["});const o=r[r.length-1];return o&&o.type==="text"?o.value+=i:r.push({type:"text",value:i}),r}function f6(n,e){const t=String(e.identifier).toUpperCase(),i=n.definitionById.get(t);if(!i)return am(n,e);const r={src:Bi(i.url||""),alt:e.alt};i.title!==null&&i.title!==void 0&&(r.title=i.title);const s={type:"element",tagName:"img",properties:r,children:[]};return n.patch(e,s),n.applyData(e,s)}function d6(n,e){const t={src:Bi(e.url)};e.alt!==null&&e.alt!==void 0&&(t.alt=e.alt),e.title!==null&&e.title!==void 0&&(t.title=e.title);const i={type:"element",tagName:"img",properties:t,children:[]};return n.patch(e,i),n.applyData(e,i)}function p6(n,e){const t={type:"text",value:e.value.replace(/\r?\n|\r/g," ")};n.patch(e,t);const i={type:"element",tagName:"code",properties:{},children:[t]};return n.patch(e,i),n.applyData(e,i)}function m6(n,e){const t=String(e.identifier).toUpperCase(),i=n.definitionById.get(t);if(!i)return am(n,e);const r={href:Bi(i.url||"")};i.title!==null&&i.title!==void 0&&(r.title=i.title);const s={type:"element",tagName:"a",properties:r,children:n.all(e)};return n.patch(e,s),n.applyData(e,s)}function g6(n,e){const t={href:Bi(e.url)};e.title!==null&&e.title!==void 0&&(t.title=e.title);const i={type:"element",tagName:"a",properties:t,children:n.all(e)};return n.patch(e,i),n.applyData(e,i)}function b6(n,e,t){const i=n.all(e),r=t?y6(t):um(e),s={},o=[];if(typeof e.checked=="boolean"){const c=i[0];let h;c&&c.type==="element"&&c.tagName==="p"?h=c:(h={type:"element",tagName:"p",properties:{},children:[]},i.unshift(h)),h.children.length>0&&h.children.unshift({type:"text",value:" "}),h.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:e.checked,disabled:!0},children:[]}),s.className=["task-list-item"]}let l=-1;for(;++l<i.length;){const c=i[l];(r||l!==0||c.type!=="element"||c.tagName!=="p")&&o.push({type:"text",value:`
`}),c.type==="element"&&c.tagName==="p"&&!r?o.push(...c.children):o.push(c)}const a=i[i.length-1];a&&(r||a.type!=="element"||a.tagName!=="p")&&o.push({type:"text",value:`
`});const u={type:"element",tagName:"li",properties:s,children:o};return n.patch(e,u),n.applyData(e,u)}function y6(n){let e=!1;if(n.type==="list"){e=n.spread||!1;const t=n.children;let i=-1;for(;!e&&++i<t.length;)e=um(t[i])}return e}function um(n){const e=n.spread;return e??n.children.length>1}function w6(n,e){const t={},i=n.all(e);let r=-1;for(typeof e.start=="number"&&e.start!==1&&(t.start=e.start);++r<i.length;){const o=i[r];if(o.type==="element"&&o.tagName==="li"&&o.properties&&Array.isArray(o.properties.className)&&o.properties.className.includes("task-list-item")){t.className=["contains-task-list"];break}}const s={type:"element",tagName:e.ordered?"ol":"ul",properties:t,children:n.wrap(i,!0)};return n.patch(e,s),n.applyData(e,s)}function k6(n,e){const t={type:"element",tagName:"p",properties:{},children:n.all(e)};return n.patch(e,t),n.applyData(e,t)}function x6(n,e){const t={type:"root",children:n.wrap(n.all(e))};return n.patch(e,t),n.applyData(e,t)}function v6(n,e){const t={type:"element",tagName:"strong",properties:{},children:n.all(e)};return n.patch(e,t),n.applyData(e,t)}const cm=fm("end"),hm=fm("start");function fm(n){return e;function e(t){const i=t&&t.position&&t.position[n]||{};if(typeof i.line=="number"&&i.line>0&&typeof i.column=="number"&&i.column>0)return{line:i.line,column:i.column,offset:typeof i.offset=="number"&&i.offset>-1?i.offset:void 0}}}function S6(n){const e=hm(n),t=cm(n);if(e&&t)return{start:e,end:t}}function _6(n,e){const t=n.all(e),i=t.shift(),r=[];if(i){const o={type:"element",tagName:"thead",properties:{},children:n.wrap([i],!0)};n.patch(e.children[0],o),r.push(o)}if(t.length>0){const o={type:"element",tagName:"tbody",properties:{},children:n.wrap(t,!0)},l=hm(e.children[1]),a=cm(e.children[e.children.length-1]);l&&a&&(o.position={start:l,end:a}),r.push(o)}const s={type:"element",tagName:"table",properties:{},children:n.wrap(r,!0)};return n.patch(e,s),n.applyData(e,s)}function C6(n,e,t){const i=t?t.children:void 0,s=(i?i.indexOf(e):1)===0?"th":"td",o=t&&t.type==="table"?t.align:void 0,l=o?o.length:e.children.length;let a=-1;const u=[];for(;++a<l;){const h=e.children[a],f={},d=o?o[a]:void 0;d&&(f.align=d);let p={type:"element",tagName:s,properties:f,children:[]};h&&(p.children=n.all(h),n.patch(h,p),p=n.applyData(h,p)),u.push(p)}const c={type:"element",tagName:"tr",properties:{},children:n.wrap(u,!0)};return n.patch(e,c),n.applyData(e,c)}function A6(n,e){const t={type:"element",tagName:"td",properties:{},children:n.all(e)};return n.patch(e,t),n.applyData(e,t)}const ph=9,mh=32;function T6(n){const e=String(n),t=/\r?\n|\r/g;let i=t.exec(e),r=0;const s=[];for(;i;)s.push(gh(e.slice(r,i.index),r>0,!0),i[0]),r=i.index+i[0].length,i=t.exec(e);return s.push(gh(e.slice(r),r>0,!1)),s.join("")}function gh(n,e,t){let i=0,r=n.length;if(e){let s=n.codePointAt(i);for(;s===ph||s===mh;)i++,s=n.codePointAt(i)}if(t){let s=n.codePointAt(r-1);for(;s===ph||s===mh;)r--,s=n.codePointAt(r-1)}return r>i?n.slice(i,r):""}function E6(n,e){const t={type:"text",value:T6(String(e.value))};return n.patch(e,t),n.applyData(e,t)}function M6(n,e){const t={type:"element",tagName:"hr",properties:{},children:[]};return n.patch(e,t),n.applyData(e,t)}const P6={blockquote:r6,break:s6,code:o6,delete:l6,emphasis:a6,footnoteReference:u6,heading:c6,html:h6,imageReference:f6,image:d6,inlineCode:p6,linkReference:m6,link:g6,listItem:b6,list:w6,paragraph:k6,root:x6,strong:v6,table:_6,tableCell:A6,tableRow:C6,text:E6,thematicBreak:M6,toml:Yr,yaml:Yr,definition:Yr,footnoteDefinition:Yr};function Yr(){}const dm=-1,eo=0,lr=1,Bs=2,eu=3,tu=4,nu=5,iu=6,pm=7,mm=8,bh=typeof self=="object"?self:globalThis,D6=(n,e)=>{const t=(r,s)=>(n.set(s,r),r),i=r=>{if(n.has(r))return n.get(r);const[s,o]=e[r];switch(s){case eo:case dm:return t(o,r);case lr:{const l=t([],r);for(const a of o)l.push(i(a));return l}case Bs:{const l=t({},r);for(const[a,u]of o)l[i(a)]=i(u);return l}case eu:return t(new Date(o),r);case tu:{const{source:l,flags:a}=o;return t(new RegExp(l,a),r)}case nu:{const l=t(new Map,r);for(const[a,u]of o)l.set(i(a),i(u));return l}case iu:{const l=t(new Set,r);for(const a of o)l.add(i(a));return l}case pm:{const{name:l,message:a}=o;return t(new bh[l](a),r)}case mm:return t(BigInt(o),r);case"BigInt":return t(Object(BigInt(o)),r);case"ArrayBuffer":return t(new Uint8Array(o).buffer,o);case"DataView":{const{buffer:l}=new Uint8Array(o);return t(new DataView(l),o)}}return t(new bh[s](o),r)};return i},yh=n=>D6(new Map,n)(0),si="",{toString:I6}={},{keys:L6}=Object,Ui=n=>{const e=typeof n;if(e!=="object"||!n)return[eo,e];const t=I6.call(n).slice(8,-1);switch(t){case"Array":return[lr,si];case"Object":return[Bs,si];case"Date":return[eu,si];case"RegExp":return[tu,si];case"Map":return[nu,si];case"Set":return[iu,si];case"DataView":return[lr,t]}return t.includes("Array")?[lr,t]:t.includes("Error")?[pm,t]:[Bs,t]},Qr=([n,e])=>n===eo&&(e==="function"||e==="symbol"),B6=(n,e,t,i)=>{const r=(o,l)=>{const a=i.push(o)-1;return t.set(l,a),a},s=o=>{if(t.has(o))return t.get(o);let[l,a]=Ui(o);switch(l){case eo:{let c=o;switch(a){case"bigint":l=mm,c=o.toString();break;case"function":case"symbol":if(n)throw new TypeError("unable to serialize "+a);c=null;break;case"undefined":return r([dm],o)}return r([l,c],o)}case lr:{if(a){let f=o;return a==="DataView"?f=new Uint8Array(o.buffer):a==="ArrayBuffer"&&(f=new Uint8Array(o)),r([a,[...f]],o)}const c=[],h=r([l,c],o);for(const f of o)c.push(s(f));return h}case Bs:{if(a)switch(a){case"BigInt":return r([a,o.toString()],o);case"Boolean":case"Number":case"String":return r([a,o.valueOf()],o)}if(e&&"toJSON"in o)return s(o.toJSON());const c=[],h=r([l,c],o);for(const f of L6(o))(n||!Qr(Ui(o[f])))&&c.push([s(f),s(o[f])]);return h}case eu:return r([l,o.toISOString()],o);case tu:{const{source:c,flags:h}=o;return r([l,{source:c,flags:h}],o)}case nu:{const c=[],h=r([l,c],o);for(const[f,d]of o)(n||!(Qr(Ui(f))||Qr(Ui(d))))&&c.push([s(f),s(d)]);return h}case iu:{const c=[],h=r([l,c],o);for(const f of o)(n||!Qr(Ui(f)))&&c.push(s(f));return h}}const{message:u}=o;return r([l,{name:a,message:u}],o)};return s},wh=(n,{json:e,lossy:t}={})=>{const i=[];return B6(!(e||t),!!e,new Map,i)(n),i},Os=typeof structuredClone=="function"?(n,e)=>e&&("json"in e||"lossy"in e)?yh(wh(n,e)):structuredClone(n):(n,e)=>yh(wh(n,e));function O6(n,e){const t=[{type:"text",value:"↩"}];return e>1&&t.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(e)}]}),t}function R6(n,e){return"Back to reference "+(n+1)+(e>1?"-"+e:"")}function z6(n){const e=typeof n.options.clobberPrefix=="string"?n.options.clobberPrefix:"user-content-",t=n.options.footnoteBackContent||O6,i=n.options.footnoteBackLabel||R6,r=n.options.footnoteLabel||"Footnotes",s=n.options.footnoteLabelTagName||"h2",o=n.options.footnoteLabelProperties||{className:["sr-only"]},l=[];let a=-1;for(;++a<n.footnoteOrder.length;){const u=n.footnoteById.get(n.footnoteOrder[a]);if(!u)continue;const c=n.all(u),h=String(u.identifier).toUpperCase(),f=Bi(h.toLowerCase());let d=0;const p=[],m=n.footnoteCounts.get(h);for(;m!==void 0&&++d<=m;){p.length>0&&p.push({type:"text",value:" "});let _=typeof t=="string"?t:t(a,d);typeof _=="string"&&(_={type:"text",value:_}),p.push({type:"element",tagName:"a",properties:{href:"#"+e+"fnref-"+f+(d>1?"-"+d:""),dataFootnoteBackref:"",ariaLabel:typeof i=="string"?i:i(a,d),className:["data-footnote-backref"]},children:Array.isArray(_)?_:[_]})}const b=c[c.length-1];if(b&&b.type==="element"&&b.tagName==="p"){const _=b.children[b.children.length-1];_&&_.type==="text"?_.value+=" ":b.children.push({type:"text",value:" "}),b.children.push(...p)}else c.push(...p);const g={type:"element",tagName:"li",properties:{id:e+"fn-"+f},children:n.wrap(c,!0)};n.patch(u,g),l.push(g)}if(l.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:s,properties:{...Os(o),id:"footnote-label"},children:[{type:"text",value:r}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:n.wrap(l,!0)},{type:"text",value:`
`}]}}const Ql={}.hasOwnProperty,F6={};function N6(n,e){const t=e||F6,i=new Map,r=new Map,s=new Map,o={...P6,...t.handlers},l={all:u,applyData:H6,definitionById:i,footnoteById:r,footnoteCounts:s,footnoteOrder:[],handlers:o,one:a,options:t,patch:q6,wrap:V6};return Np(n,function(c){if(c.type==="definition"||c.type==="footnoteDefinition"){const h=c.type==="definition"?i:r,f=String(c.identifier).toUpperCase();h.has(f)||h.set(f,c)}}),l;function a(c,h){const f=c.type,d=l.handlers[f];if(Ql.call(l.handlers,f)&&d)return d(l,c,h);if(l.options.passThrough&&l.options.passThrough.includes(f)){if("children"in c){const{children:m,...b}=c,g=Os(b);return g.children=l.all(c),g}return Os(c)}return(l.options.unknownHandler||$6)(l,c,h)}function u(c){const h=[];if("children"in c){const f=c.children;let d=-1;for(;++d<f.length;){const p=l.one(f[d],c);if(p){if(d&&f[d-1].type==="break"&&(!Array.isArray(p)&&p.type==="text"&&(p.value=kh(p.value)),!Array.isArray(p)&&p.type==="element")){const m=p.children[0];m&&m.type==="text"&&(m.value=kh(m.value))}Array.isArray(p)?h.push(...p):h.push(p)}}}return h}}function q6(n,e){n.position&&(e.position=S6(n))}function H6(n,e){let t=e;if(n&&n.data){const i=n.data.hName,r=n.data.hChildren,s=n.data.hProperties;if(typeof i=="string")if(t.type==="element")t.tagName=i;else{const o="children"in t?t.children:[t];t={type:"element",tagName:i,properties:{},children:o}}t.type==="element"&&s&&Object.assign(t.properties,Os(s)),"children"in t&&t.children&&r!==null&&r!==void 0&&(t.children=r)}return t}function $6(n,e){const t=e.data||{},i="value"in e&&!(Ql.call(t,"hProperties")||Ql.call(t,"hChildren"))?{type:"text",value:e.value}:{type:"element",tagName:"div",properties:{},children:n.all(e)};return n.patch(e,i),n.applyData(e,i)}function V6(n,e){const t=[];let i=-1;for(e&&t.push({type:"text",value:`
`});++i<n.length;)i&&t.push({type:"text",value:`
`}),t.push(n[i]);return e&&n.length>0&&t.push({type:"text",value:`
`}),t}function kh(n){let e=0,t=n.charCodeAt(e);for(;t===9||t===32;)e++,t=n.charCodeAt(e);return n.slice(e)}function xh(n,e){const t=N6(n,e),i=t.one(n,void 0),r=z6(t),s=Array.isArray(i)?{type:"root",children:i}:i||{type:"root",children:[]};return r&&s.children.push({type:"text",value:`
`},r),s}function W6(n,e){return n&&"run"in n?async function(t,i){const r=xh(t,{file:i,...e});await n.run(r,i)}:function(t,i){return xh(t,{file:i,...n||e})}}const U6=["area","base","basefont","bgsound","br","col","command","embed","frame","hr","image","img","input","keygen","link","meta","param","source","track","wbr"];class Er{constructor(e,t,i){this.normal=t,this.property=e,i&&(this.space=i)}}Er.prototype.normal={};Er.prototype.property={};Er.prototype.space=void 0;function gm(n,e){const t={},i={};for(const r of n)Object.assign(t,r.property),Object.assign(i,r.normal);return new Er(t,i,e)}function Jl(n){return n.toLowerCase()}class ut{constructor(e,t){this.attribute=t,this.property=e}}ut.prototype.attribute="";ut.prototype.booleanish=!1;ut.prototype.boolean=!1;ut.prototype.commaOrSpaceSeparated=!1;ut.prototype.commaSeparated=!1;ut.prototype.defined=!1;ut.prototype.mustUseProperty=!1;ut.prototype.number=!1;ut.prototype.overloadedBoolean=!1;ut.prototype.property="";ut.prototype.spaceSeparated=!1;ut.prototype.space=void 0;let j6=0;const se=Jn(),Oe=Jn(),Zl=Jn(),O=Jn(),ve=Jn(),wi=Jn(),ht=Jn();function Jn(){return 2**++j6}const ea=Object.freeze(Object.defineProperty({__proto__:null,boolean:se,booleanish:Oe,commaOrSpaceSeparated:ht,commaSeparated:wi,number:O,overloadedBoolean:Zl,spaceSeparated:ve},Symbol.toStringTag,{value:"Module"})),Vo=Object.keys(ea);class ru extends ut{constructor(e,t,i,r){let s=-1;if(super(e,t),vh(this,"space",r),typeof i=="number")for(;++s<Vo.length;){const o=Vo[s];vh(this,Vo[s],(i&ea[o])===ea[o])}}}ru.prototype.defined=!0;function vh(n,e,t){t&&(n[e]=t)}function Oi(n){const e={},t={};for(const[i,r]of Object.entries(n.properties)){const s=new ru(i,n.transform(n.attributes||{},i),r,n.space);n.mustUseProperty&&n.mustUseProperty.includes(i)&&(s.mustUseProperty=!0),e[i]=s,t[Jl(i)]=i,t[Jl(s.attribute)]=i}return new Er(e,t,n.space)}const bm=Oi({properties:{ariaActiveDescendant:null,ariaAtomic:Oe,ariaAutoComplete:null,ariaBusy:Oe,ariaChecked:Oe,ariaColCount:O,ariaColIndex:O,ariaColSpan:O,ariaControls:ve,ariaCurrent:null,ariaDescribedBy:ve,ariaDetails:null,ariaDisabled:Oe,ariaDropEffect:ve,ariaErrorMessage:null,ariaExpanded:Oe,ariaFlowTo:ve,ariaGrabbed:Oe,ariaHasPopup:null,ariaHidden:Oe,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:ve,ariaLevel:O,ariaLive:null,ariaModal:Oe,ariaMultiLine:Oe,ariaMultiSelectable:Oe,ariaOrientation:null,ariaOwns:ve,ariaPlaceholder:null,ariaPosInSet:O,ariaPressed:Oe,ariaReadOnly:Oe,ariaRelevant:null,ariaRequired:Oe,ariaRoleDescription:ve,ariaRowCount:O,ariaRowIndex:O,ariaRowSpan:O,ariaSelected:Oe,ariaSetSize:O,ariaSort:null,ariaValueMax:O,ariaValueMin:O,ariaValueNow:O,ariaValueText:null,role:null},transform(n,e){return e==="role"?e:"aria-"+e.slice(4).toLowerCase()}});function ym(n,e){return e in n?n[e]:e}function wm(n,e){return ym(n,e.toLowerCase())}const K6=Oi({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:wi,acceptCharset:ve,accessKey:ve,action:null,allow:null,allowFullScreen:se,allowPaymentRequest:se,allowUserMedia:se,alt:null,as:null,async:se,autoCapitalize:null,autoComplete:ve,autoFocus:se,autoPlay:se,blocking:ve,capture:null,charSet:null,checked:se,cite:null,className:ve,cols:O,colSpan:null,content:null,contentEditable:Oe,controls:se,controlsList:ve,coords:O|wi,crossOrigin:null,data:null,dateTime:null,decoding:null,default:se,defer:se,dir:null,dirName:null,disabled:se,download:Zl,draggable:Oe,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:se,formTarget:null,headers:ve,height:O,hidden:Zl,high:O,href:null,hrefLang:null,htmlFor:ve,httpEquiv:ve,id:null,imageSizes:null,imageSrcSet:null,inert:se,inputMode:null,integrity:null,is:null,isMap:se,itemId:null,itemProp:ve,itemRef:ve,itemScope:se,itemType:ve,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:se,low:O,manifest:null,max:null,maxLength:O,media:null,method:null,min:null,minLength:O,multiple:se,muted:se,name:null,nonce:null,noModule:se,noValidate:se,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:se,optimum:O,pattern:null,ping:ve,placeholder:null,playsInline:se,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:se,referrerPolicy:null,rel:ve,required:se,reversed:se,rows:O,rowSpan:O,sandbox:ve,scope:null,scoped:se,seamless:se,selected:se,shadowRootClonable:se,shadowRootDelegatesFocus:se,shadowRootMode:null,shape:null,size:O,sizes:null,slot:null,span:O,spellCheck:Oe,src:null,srcDoc:null,srcLang:null,srcSet:null,start:O,step:null,style:null,tabIndex:O,target:null,title:null,translate:null,type:null,typeMustMatch:se,useMap:null,value:Oe,width:O,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:ve,axis:null,background:null,bgColor:null,border:O,borderColor:null,bottomMargin:O,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:se,declare:se,event:null,face:null,frame:null,frameBorder:null,hSpace:O,leftMargin:O,link:null,longDesc:null,lowSrc:null,marginHeight:O,marginWidth:O,noResize:se,noHref:se,noShade:se,noWrap:se,object:null,profile:null,prompt:null,rev:null,rightMargin:O,rules:null,scheme:null,scrolling:Oe,standby:null,summary:null,text:null,topMargin:O,valueType:null,version:null,vAlign:null,vLink:null,vSpace:O,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:se,disableRemotePlayback:se,prefix:null,property:null,results:O,security:null,unselectable:null},space:"html",transform:wm}),X6=Oi({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:ht,accentHeight:O,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:O,amplitude:O,arabicForm:null,ascent:O,attributeName:null,attributeType:null,azimuth:O,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:O,by:null,calcMode:null,capHeight:O,className:ve,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:O,diffuseConstant:O,direction:null,display:null,dur:null,divisor:O,dominantBaseline:null,download:se,dx:null,dy:null,edgeMode:null,editable:null,elevation:O,enableBackground:null,end:null,event:null,exponent:O,externalResourcesRequired:null,fill:null,fillOpacity:O,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:wi,g2:wi,glyphName:wi,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:O,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:O,horizOriginX:O,horizOriginY:O,id:null,ideographic:O,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:O,k:O,k1:O,k2:O,k3:O,k4:O,kernelMatrix:ht,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:O,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:O,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:O,overlineThickness:O,paintOrder:null,panose1:null,path:null,pathLength:O,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:ve,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:O,pointsAtY:O,pointsAtZ:O,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:ht,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:ht,rev:ht,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:ht,requiredFeatures:ht,requiredFonts:ht,requiredFormats:ht,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:O,specularExponent:O,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:O,strikethroughThickness:O,string:null,stroke:null,strokeDashArray:ht,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:O,strokeOpacity:O,strokeWidth:null,style:null,surfaceScale:O,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:ht,tabIndex:O,tableValues:null,target:null,targetX:O,targetY:O,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:ht,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:O,underlineThickness:O,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:O,values:null,vAlphabetic:O,vMathematical:O,vectorEffect:null,vHanging:O,vIdeographic:O,version:null,vertAdvY:O,vertOriginX:O,vertOriginY:O,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:O,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:ym}),km=Oi({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(n,e){return"xlink:"+e.slice(5).toLowerCase()}}),xm=Oi({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:wm}),vm=Oi({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(n,e){return"xml:"+e.slice(3).toLowerCase()}}),G6=/[A-Z]/g,Sh=/-[a-z]/g,Y6=/^data[-\w.:]+$/i;function Q6(n,e){const t=Jl(e);let i=e,r=ut;if(t in n.normal)return n.property[n.normal[t]];if(t.length>4&&t.slice(0,4)==="data"&&Y6.test(e)){if(e.charAt(4)==="-"){const s=e.slice(5).replace(Sh,Z6);i="data"+s.charAt(0).toUpperCase()+s.slice(1)}else{const s=e.slice(4);if(!Sh.test(s)){let o=s.replace(G6,J6);o.charAt(0)!=="-"&&(o="-"+o),e="data"+o}}r=ru}return new r(i,e)}function J6(n){return"-"+n.toLowerCase()}function Z6(n){return n.charAt(1).toUpperCase()}const e8=gm([bm,K6,km,xm,vm],"html"),Sm=gm([bm,X6,km,xm,vm],"svg"),t8=/["&'<>`]/g,n8=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,i8=/[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g,r8=/[|\\{}()[\]^$+*?.]/g,_h=new WeakMap;function s8(n,e){if(n=n.replace(e.subset?o8(e.subset):t8,i),e.subset||e.escapeOnly)return n;return n.replace(n8,t).replace(i8,i);function t(r,s,o){return e.format((r.charCodeAt(0)-55296)*1024+r.charCodeAt(1)-56320+65536,o.charCodeAt(s+2),e)}function i(r,s,o){return e.format(r.charCodeAt(0),o.charCodeAt(s+1),e)}}function o8(n){let e=_h.get(n);return e||(e=l8(n),_h.set(n,e)),e}function l8(n){const e=[];let t=-1;for(;++t<n.length;)e.push(n[t].replace(r8,"\\$&"));return new RegExp("(?:"+e.join("|")+")","g")}const a8=/[\dA-Fa-f]/;function u8(n,e,t){const i="&#x"+n.toString(16).toUpperCase();return t&&e&&!a8.test(String.fromCharCode(e))?i:i+";"}const c8=/\d/;function h8(n,e,t){const i="&#"+String(n);return t&&e&&!c8.test(String.fromCharCode(e))?i:i+";"}const f8=["AElig","AMP","Aacute","Acirc","Agrave","Aring","Atilde","Auml","COPY","Ccedil","ETH","Eacute","Ecirc","Egrave","Euml","GT","Iacute","Icirc","Igrave","Iuml","LT","Ntilde","Oacute","Ocirc","Ograve","Oslash","Otilde","Ouml","QUOT","REG","THORN","Uacute","Ucirc","Ugrave","Uuml","Yacute","aacute","acirc","acute","aelig","agrave","amp","aring","atilde","auml","brvbar","ccedil","cedil","cent","copy","curren","deg","divide","eacute","ecirc","egrave","eth","euml","frac12","frac14","frac34","gt","iacute","icirc","iexcl","igrave","iquest","iuml","laquo","lt","macr","micro","middot","nbsp","not","ntilde","oacute","ocirc","ograve","ordf","ordm","oslash","otilde","ouml","para","plusmn","pound","quot","raquo","reg","sect","shy","sup1","sup2","sup3","szlig","thorn","times","uacute","ucirc","ugrave","uml","uuml","yacute","yen","yuml"],Wo={nbsp:" ",iexcl:"¡",cent:"¢",pound:"£",curren:"¤",yen:"¥",brvbar:"¦",sect:"§",uml:"¨",copy:"©",ordf:"ª",laquo:"«",not:"¬",shy:"­",reg:"®",macr:"¯",deg:"°",plusmn:"±",sup2:"²",sup3:"³",acute:"´",micro:"µ",para:"¶",middot:"·",cedil:"¸",sup1:"¹",ordm:"º",raquo:"»",frac14:"¼",frac12:"½",frac34:"¾",iquest:"¿",Agrave:"À",Aacute:"Á",Acirc:"Â",Atilde:"Ã",Auml:"Ä",Aring:"Å",AElig:"Æ",Ccedil:"Ç",Egrave:"È",Eacute:"É",Ecirc:"Ê",Euml:"Ë",Igrave:"Ì",Iacute:"Í",Icirc:"Î",Iuml:"Ï",ETH:"Ð",Ntilde:"Ñ",Ograve:"Ò",Oacute:"Ó",Ocirc:"Ô",Otilde:"Õ",Ouml:"Ö",times:"×",Oslash:"Ø",Ugrave:"Ù",Uacute:"Ú",Ucirc:"Û",Uuml:"Ü",Yacute:"Ý",THORN:"Þ",szlig:"ß",agrave:"à",aacute:"á",acirc:"â",atilde:"ã",auml:"ä",aring:"å",aelig:"æ",ccedil:"ç",egrave:"è",eacute:"é",ecirc:"ê",euml:"ë",igrave:"ì",iacute:"í",icirc:"î",iuml:"ï",eth:"ð",ntilde:"ñ",ograve:"ò",oacute:"ó",ocirc:"ô",otilde:"õ",ouml:"ö",divide:"÷",oslash:"ø",ugrave:"ù",uacute:"ú",ucirc:"û",uuml:"ü",yacute:"ý",thorn:"þ",yuml:"ÿ",fnof:"ƒ",Alpha:"Α",Beta:"Β",Gamma:"Γ",Delta:"Δ",Epsilon:"Ε",Zeta:"Ζ",Eta:"Η",Theta:"Θ",Iota:"Ι",Kappa:"Κ",Lambda:"Λ",Mu:"Μ",Nu:"Ν",Xi:"Ξ",Omicron:"Ο",Pi:"Π",Rho:"Ρ",Sigma:"Σ",Tau:"Τ",Upsilon:"Υ",Phi:"Φ",Chi:"Χ",Psi:"Ψ",Omega:"Ω",alpha:"α",beta:"β",gamma:"γ",delta:"δ",epsilon:"ε",zeta:"ζ",eta:"η",theta:"θ",iota:"ι",kappa:"κ",lambda:"λ",mu:"μ",nu:"ν",xi:"ξ",omicron:"ο",pi:"π",rho:"ρ",sigmaf:"ς",sigma:"σ",tau:"τ",upsilon:"υ",phi:"φ",chi:"χ",psi:"ψ",omega:"ω",thetasym:"ϑ",upsih:"ϒ",piv:"ϖ",bull:"•",hellip:"…",prime:"′",Prime:"″",oline:"‾",frasl:"⁄",weierp:"℘",image:"ℑ",real:"ℜ",trade:"™",alefsym:"ℵ",larr:"←",uarr:"↑",rarr:"→",darr:"↓",harr:"↔",crarr:"↵",lArr:"⇐",uArr:"⇑",rArr:"⇒",dArr:"⇓",hArr:"⇔",forall:"∀",part:"∂",exist:"∃",empty:"∅",nabla:"∇",isin:"∈",notin:"∉",ni:"∋",prod:"∏",sum:"∑",minus:"−",lowast:"∗",radic:"√",prop:"∝",infin:"∞",ang:"∠",and:"∧",or:"∨",cap:"∩",cup:"∪",int:"∫",there4:"∴",sim:"∼",cong:"≅",asymp:"≈",ne:"≠",equiv:"≡",le:"≤",ge:"≥",sub:"⊂",sup:"⊃",nsub:"⊄",sube:"⊆",supe:"⊇",oplus:"⊕",otimes:"⊗",perp:"⊥",sdot:"⋅",lceil:"⌈",rceil:"⌉",lfloor:"⌊",rfloor:"⌋",lang:"〈",rang:"〉",loz:"◊",spades:"♠",clubs:"♣",hearts:"♥",diams:"♦",quot:'"',amp:"&",lt:"<",gt:">",OElig:"Œ",oelig:"œ",Scaron:"Š",scaron:"š",Yuml:"Ÿ",circ:"ˆ",tilde:"˜",ensp:" ",emsp:" ",thinsp:" ",zwnj:"‌",zwj:"‍",lrm:"‎",rlm:"‏",ndash:"–",mdash:"—",lsquo:"‘",rsquo:"’",sbquo:"‚",ldquo:"“",rdquo:"”",bdquo:"„",dagger:"†",Dagger:"‡",permil:"‰",lsaquo:"‹",rsaquo:"›",euro:"€"},d8=["cent","copy","divide","gt","lt","not","para","times"],_m={}.hasOwnProperty,ta={};let Jr;for(Jr in Wo)_m.call(Wo,Jr)&&(ta[Wo[Jr]]=Jr);const p8=/[^\dA-Za-z]/;function m8(n,e,t,i){const r=String.fromCharCode(n);if(_m.call(ta,r)){const s=ta[r],o="&"+s;return t&&f8.includes(s)&&!d8.includes(s)&&(!i||e&&e!==61&&p8.test(String.fromCharCode(e)))?o:o+";"}return""}function g8(n,e,t){let i=u8(n,e,t.omitOptionalSemicolons),r;if((t.useNamedReferences||t.useShortestReferences)&&(r=m8(n,e,t.omitOptionalSemicolons,t.attribute)),(t.useShortestReferences||!r)&&t.useShortestReferences){const s=h8(n,e,t.omitOptionalSemicolons);s.length<i.length&&(i=s)}return r&&(!t.useShortestReferences||r.length<i.length)?r:i}function ki(n,e){return s8(n,Object.assign({format:g8},e))}const b8=/^>|^->|<!--|-->|--!>|<!-$/g,y8=[">"],w8=["<",">"];function k8(n,e,t,i){return i.settings.bogusComments?"<?"+ki(n.value,Object.assign({},i.settings.characterReferences,{subset:y8}))+">":"<!--"+n.value.replace(b8,r)+"-->";function r(s){return ki(s,Object.assign({},i.settings.characterReferences,{subset:w8}))}}function x8(n,e,t,i){return"<!"+(i.settings.upperDoctype?"DOCTYPE":"doctype")+(i.settings.tightDoctype?"":" ")+"html>"}function v8(n,e){const t=e||{};return(n[n.length-1]===""?[...n,""]:n).join((t.padRight?" ":"")+","+(t.padLeft===!1?"":" ")).trim()}function S8(n){return n.join(" ").trim()}const _8=/[ \t\n\f\r]/g;function su(n){return typeof n=="object"?n.type==="text"?Ch(n.value):!1:Ch(n)}function Ch(n){return n.replace(_8,"")===""}const Ne=Am(1),Cm=Am(-1),C8=[];function Am(n){return e;function e(t,i,r){const s=t?t.children:C8;let o=(i||0)+n,l=s[o];if(!r)for(;l&&su(l);)o+=n,l=s[o];return l}}const A8={}.hasOwnProperty;function Tm(n){return e;function e(t,i,r){return A8.call(n,t.tagName)&&n[t.tagName](t,i,r)}}const ou=Tm({body:E8,caption:Uo,colgroup:Uo,dd:I8,dt:D8,head:Uo,html:T8,li:P8,optgroup:L8,option:B8,p:M8,rp:Ah,rt:Ah,tbody:R8,td:Th,tfoot:z8,th:Th,thead:O8,tr:F8});function Uo(n,e,t){const i=Ne(t,e,!0);return!i||i.type!=="comment"&&!(i.type==="text"&&su(i.value.charAt(0)))}function T8(n,e,t){const i=Ne(t,e);return!i||i.type!=="comment"}function E8(n,e,t){const i=Ne(t,e);return!i||i.type!=="comment"}function M8(n,e,t){const i=Ne(t,e);return i?i.type==="element"&&(i.tagName==="address"||i.tagName==="article"||i.tagName==="aside"||i.tagName==="blockquote"||i.tagName==="details"||i.tagName==="div"||i.tagName==="dl"||i.tagName==="fieldset"||i.tagName==="figcaption"||i.tagName==="figure"||i.tagName==="footer"||i.tagName==="form"||i.tagName==="h1"||i.tagName==="h2"||i.tagName==="h3"||i.tagName==="h4"||i.tagName==="h5"||i.tagName==="h6"||i.tagName==="header"||i.tagName==="hgroup"||i.tagName==="hr"||i.tagName==="main"||i.tagName==="menu"||i.tagName==="nav"||i.tagName==="ol"||i.tagName==="p"||i.tagName==="pre"||i.tagName==="section"||i.tagName==="table"||i.tagName==="ul"):!t||!(t.type==="element"&&(t.tagName==="a"||t.tagName==="audio"||t.tagName==="del"||t.tagName==="ins"||t.tagName==="map"||t.tagName==="noscript"||t.tagName==="video"))}function P8(n,e,t){const i=Ne(t,e);return!i||i.type==="element"&&i.tagName==="li"}function D8(n,e,t){const i=Ne(t,e);return!!(i&&i.type==="element"&&(i.tagName==="dt"||i.tagName==="dd"))}function I8(n,e,t){const i=Ne(t,e);return!i||i.type==="element"&&(i.tagName==="dt"||i.tagName==="dd")}function Ah(n,e,t){const i=Ne(t,e);return!i||i.type==="element"&&(i.tagName==="rp"||i.tagName==="rt")}function L8(n,e,t){const i=Ne(t,e);return!i||i.type==="element"&&i.tagName==="optgroup"}function B8(n,e,t){const i=Ne(t,e);return!i||i.type==="element"&&(i.tagName==="option"||i.tagName==="optgroup")}function O8(n,e,t){const i=Ne(t,e);return!!(i&&i.type==="element"&&(i.tagName==="tbody"||i.tagName==="tfoot"))}function R8(n,e,t){const i=Ne(t,e);return!i||i.type==="element"&&(i.tagName==="tbody"||i.tagName==="tfoot")}function z8(n,e,t){return!Ne(t,e)}function F8(n,e,t){const i=Ne(t,e);return!i||i.type==="element"&&i.tagName==="tr"}function Th(n,e,t){const i=Ne(t,e);return!i||i.type==="element"&&(i.tagName==="td"||i.tagName==="th")}const N8=Tm({body:$8,colgroup:V8,head:H8,html:q8,tbody:W8});function q8(n){const e=Ne(n,-1);return!e||e.type!=="comment"}function H8(n){const e=new Set;for(const i of n.children)if(i.type==="element"&&(i.tagName==="base"||i.tagName==="title")){if(e.has(i.tagName))return!1;e.add(i.tagName)}const t=n.children[0];return!t||t.type==="element"}function $8(n){const e=Ne(n,-1,!0);return!e||e.type!=="comment"&&!(e.type==="text"&&su(e.value.charAt(0)))&&!(e.type==="element"&&(e.tagName==="meta"||e.tagName==="link"||e.tagName==="script"||e.tagName==="style"||e.tagName==="template"))}function V8(n,e,t){const i=Cm(t,e),r=Ne(n,-1,!0);return t&&i&&i.type==="element"&&i.tagName==="colgroup"&&ou(i,t.children.indexOf(i),t)?!1:!!(r&&r.type==="element"&&r.tagName==="col")}function W8(n,e,t){const i=Cm(t,e),r=Ne(n,-1);return t&&i&&i.type==="element"&&(i.tagName==="thead"||i.tagName==="tbody")&&ou(i,t.children.indexOf(i),t)?!1:!!(r&&r.type==="element"&&r.tagName==="tr")}const Zr={name:[[`	
\f\r &/=>`.split(""),`	
\f\r "&'/=>\``.split("")],[`\0	
\f\r "&'/<=>`.split(""),`\0	
\f\r "&'/<=>\``.split("")]],unquoted:[[`	
\f\r &>`.split(""),`\0	
\f\r "&'<=>\``.split("")],[`\0	
\f\r "&'<=>\``.split(""),`\0	
\f\r "&'<=>\``.split("")]],single:[["&'".split(""),"\"&'`".split("")],["\0&'".split(""),"\0\"&'`".split("")]],double:[['"&'.split(""),"\"&'`".split("")],['\0"&'.split(""),"\0\"&'`".split("")]]};function U8(n,e,t,i){const r=i.schema,s=r.space==="svg"?!1:i.settings.omitOptionalTags;let o=r.space==="svg"?i.settings.closeEmptyElements:i.settings.voids.includes(n.tagName.toLowerCase());const l=[];let a;r.space==="html"&&n.tagName==="svg"&&(i.schema=Sm);const u=j8(i,n.properties),c=i.all(r.space==="html"&&n.tagName==="template"?n.content:n);return i.schema=r,c&&(o=!1),(u||!s||!N8(n,e,t))&&(l.push("<",n.tagName,u?" "+u:""),o&&(r.space==="svg"||i.settings.closeSelfClosing)&&(a=u.charAt(u.length-1),(!i.settings.tightSelfClosing||a==="/"||a&&a!=='"'&&a!=="'")&&l.push(" "),l.push("/")),l.push(">")),l.push(c),!o&&(!s||!ou(n,e,t))&&l.push("</"+n.tagName+">"),l.join("")}function j8(n,e){const t=[];let i=-1,r;if(e){for(r in e)if(e[r]!==null&&e[r]!==void 0){const s=K8(n,r,e[r]);s&&t.push(s)}}for(;++i<t.length;){const s=n.settings.tightAttributes?t[i].charAt(t[i].length-1):void 0;i!==t.length-1&&s!=='"'&&s!=="'"&&(t[i]+=" ")}return t.join("")}function K8(n,e,t){const i=Q6(n.schema,e),r=n.settings.allowParseErrors&&n.schema.space==="html"?0:1,s=n.settings.allowDangerousCharacters?0:1;let o=n.quote,l;if(i.overloadedBoolean&&(t===i.attribute||t==="")?t=!0:(i.boolean||i.overloadedBoolean)&&(typeof t!="string"||t===i.attribute||t==="")&&(t=!!t),t==null||t===!1||typeof t=="number"&&Number.isNaN(t))return"";const a=ki(i.attribute,Object.assign({},n.settings.characterReferences,{subset:Zr.name[r][s]}));return t===!0||(t=Array.isArray(t)?(i.commaSeparated?v8:S8)(t,{padLeft:!n.settings.tightCommaSeparatedLists}):String(t),n.settings.collapseEmptyAttributes&&!t)?a:(n.settings.preferUnquoted&&(l=ki(t,Object.assign({},n.settings.characterReferences,{attribute:!0,subset:Zr.unquoted[r][s]}))),l!==t&&(n.settings.quoteSmart&&Ls(t,o)>Ls(t,n.alternative)&&(o=n.alternative),l=o+ki(t,Object.assign({},n.settings.characterReferences,{subset:(o==="'"?Zr.single:Zr.double)[r][s],attribute:!0}))+o),a+(l&&"="+l))}const X8=["<","&"];function Em(n,e,t,i){return t&&t.type==="element"&&(t.tagName==="script"||t.tagName==="style")?n.value:ki(n.value,Object.assign({},i.settings.characterReferences,{subset:X8}))}function G8(n,e,t,i){return i.settings.allowDangerousHtml?n.value:Em(n,e,t,i)}function Y8(n,e,t,i){return i.all(n)}const Q8=Lp("type",{invalid:J8,unknown:Z8,handlers:{comment:k8,doctype:x8,element:U8,raw:G8,root:Y8,text:Em}});function J8(n){throw new Error("Expected node, not `"+n+"`")}function Z8(n){const e=n;throw new Error("Cannot compile unknown node `"+e.type+"`")}const e9={},t9={},n9=[];function i9(n,e){const t=e||e9,i=t.quote||'"',r=i==='"'?"'":'"';if(i!=='"'&&i!=="'")throw new Error("Invalid quote `"+i+"`, expected `'` or `\"`");return{one:r9,all:s9,settings:{omitOptionalTags:t.omitOptionalTags||!1,allowParseErrors:t.allowParseErrors||!1,allowDangerousCharacters:t.allowDangerousCharacters||!1,quoteSmart:t.quoteSmart||!1,preferUnquoted:t.preferUnquoted||!1,tightAttributes:t.tightAttributes||!1,upperDoctype:t.upperDoctype||!1,tightDoctype:t.tightDoctype||!1,bogusComments:t.bogusComments||!1,tightCommaSeparatedLists:t.tightCommaSeparatedLists||!1,tightSelfClosing:t.tightSelfClosing||!1,collapseEmptyAttributes:t.collapseEmptyAttributes||!1,allowDangerousHtml:t.allowDangerousHtml||!1,voids:t.voids||U6,characterReferences:t.characterReferences||t9,closeSelfClosing:t.closeSelfClosing||!1,closeEmptyElements:t.closeEmptyElements||!1},schema:t.space==="svg"?Sm:e8,quote:i,alternative:r}.one(Array.isArray(n)?{type:"root",children:n}:n,void 0,void 0)}function r9(n,e,t){return Q8(n,e,t,this)}function s9(n){const e=[],t=n&&n.children||n9;let i=-1;for(;++i<t.length;)e[i]=this.one(t[i],i,n);return e.join("")}function o9(n){const e=this,t={...e.data("settings"),...n};e.compiler=i;function i(r){return i9(r,t)}}function l9(n){return n.replace(/[\t ]+$/u,"")}function na(n){return n.trimEnd().split(/\r?\n/u).map(l9).join(`
`)}function a9(n,e){return na(n)===na(e)}const Tt=Gk,u9="https://github.com/Hypercubed/f-flat-minor",c9=A4().use(i6).use(W6).use(o9);function pi(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function h9(n){const e=n.replaceAll(`\r
`,`
`).trim();return e?String(c9.processSync(e)).replaceAll("<a ",'<a target="_blank" rel="noreferrer" '):""}function f9(n,e){return`[Codetta] ${n} - ${e} bytes`}function d9(n,e,t){return["- compiler/runtime used: Codetta web playground",`- source file target: ${bp(n.id)}`,`- how output was checked: ${t?"Output matched expected in the Codetta runner.":"Not verified in the Codetta runner."}`,`- how compiled byte length was checked: Runner reported ${e} bytes including FbAbbCb.`,`- current leaderboard bytes: ${n.bytes}`].join(`
`)}function p9(n,e,t,i){const r=new URL(`${u9}/issues/new`);return r.searchParams.set("template","codetta-submission.yml"),r.searchParams.set("title",f9(n.id,e)),r.searchParams.set("etude",n.id),r.searchParams.set("bytes",String(e)),r.searchParams.set("solution",t),r.searchParams.set("validation",d9(n,e,i)),r.toString()}function m9(n){const e=n?Va(n):0;return`${e} ${e===1?"byte":"bytes"}`}function ji(n){return n.map(e=>{const t=e.tone&&e.tone!=="default"?` ${e.tone}`:"",i=e.showDot?'<span class="summary-running-dot" aria-hidden="true"></span>':"";return`
      <span class="summary-bar-item">
        <span class="label">${pi(e.label)}</span>
        <span class="value${t}">${i}${pi(e.value)}</span>
      </span>
    `}).join("")}function g9(n,e){const t=n.querySelector(e);if(!t)throw new Error(`Missing Codetta UI element: ${e}`);return t}function b9(n,e,t){const i=ql({pathname:window.location.pathname,search:yr(window.location),tab:"codetta",codeParam:null,exampleParam:null,etudeParam:n}),r=`${window.location.pathname}${window.location.hash}`;i!==r&&(e==="push"?(window.history.pushState(window.history.state,"",i),t==null||t()):window.history.replaceState(window.history.state,"",i))}function y9(n){return Tt.find(e=>e.id===tp(n))??null}function w9(n,e){var Be;if(Tt.length===0)throw new Error("No Codetta entries found.");n.innerHTML=`
    <section class="codetta">
      <section class="codetta-screen codetta-list-screen" data-screen="list">
        <article class="panel codetta-intro-panel">
          <div class="panel-header">
            <div>
              <p class="panel-label">How Codetta Works</p>
              <h2>Small code-golf like challenges</h2>
            </div>
          </div>
          <div class="codetta-panel-body codetta-intro-body">
            <p>Codettas are small F-flat-minor code-golf like challenges with fixed expected output. Many mirror <code>code.golf</code> holes, with a few repo-defined variants.</p>
            <p>Leaderboard rank is based on optimized compiled <code>.ffb</code> byte count, not source length. Output has to match the expected result before the byte score matters.</p>
          </div>
        </article>

        <section class="panel">
          <div class="panel-header">
            <div>
              <p class="panel-label">F♭m Codetta</p>
              <h2>Codettas</h2>
            </div>
          </div>
          <div class="codetta-list-wrap">
            <div id="codetta-etude-list" class="codetta-list-grid" role="list" aria-label="Codettas list"></div>
            <a
              class="ghost codetta-suggest-btn"
              href="https://github.com/Hypercubed/f-flat-minor/issues/new?template=codetta-suggestion.yml"
            >+ Suggest a Codetta</a>
          </div>
        </section>
      </section>

      <section class="codetta-screen" data-screen="detail" hidden>
        <section class="codetta-detail-grid">
          <article class="panel">
            <div class="panel-header codetta-etude-header">
              <div>
                <p class="panel-label">F♭m Codetta</p>
                <h2 id="codetta-title"></h2>
              </div>
            </div>
            <div class="codetta-panel-body">
              <div id="codetta-description" class="codetta-description"></div>
              <details class="codetta-expected-details">
                <summary class="panel-label">Expected output</summary>
                <pre id="codetta-expected" class="code-block codetta-expected"></pre>
              </details>
            </div>
          </article>
          <article class="panel">
            <div class="panel-header"><h2>Current best</h2></div>
            <div class="codetta-panel-body codetta-meta">
              <p><span>Leader:</span> <strong id="codetta-leader"></strong></p>
              <p><span>Compiled bytes:</span> <strong id="codetta-bytes"></strong></p>
              <p><span>Date:</span> <strong id="codetta-date"></strong></p>
            </div>
          </article>
        </section>

        <section class="codetta-attempt-layout">
          <article class="panel codetta-attempt-panel">
            <div class="panel-header">
              <div>
                <p class="panel-label">Editor</p>
                <h2>Your attempt</h2>
              </div>
            </div>
            <div class="codetta-attempt-body">
              <div id="codetta-attempt" class="codetta-editor-shell" aria-label="Codetta attempt editor"></div>
              <div class="codetta-attempt-controls">
                <button id="codetta-load-best" type="button" class="ghost">Load Current Best</button>
                <button id="codetta-run" type="button" class="primary codetta-run-btn">▶ Run</button>
              </div>
            </div>
          </article>

          <article class="panel codetta-output-panel details-panel-shell">
            <div class="panel-header">
              <div>
                <p class="panel-label">Inspect</p>
                <h2>Program details</h2>
              </div>
            </div>
            <div id="codetta-summary" class="summary-bar"></div>
            <div class="detail-toolbar">
              <div class="subtabs" aria-label="Codetta program details">
                <button type="button" class="subtab is-active" data-codetta-detail-tab="output">Output</button>
                <button type="button" class="subtab" data-codetta-detail-tab="bytecode">Bytecode</button>
              </div>
              <label id="codetta-output-wrap-toggle" class="toggle output-wrap-toggle">
                <input id="codetta-output-wrap" type="checkbox" checked />
                <span>Wrap Output</span>
              </label>
            </div>
            <div class="detail-panels codetta-detail-panels">
              <pre id="codetta-output" class="console is-wrapped codetta-output detail-panel is-active" data-codetta-detail-panel="output">(Run your attempt to compare output.)</pre>
              <pre id="codetta-bytecode" class="code-block bytecode-wrap codetta-bytecode detail-panel" data-codetta-detail-panel="bytecode">(Run your attempt to inspect bytecode.)</pre>
            </div>
            <div id="codetta-bytecode-meta" class="detail-meta" hidden>
              <span class="label">Byte count</span>
              <span id="codetta-bytecode-count" class="value">0 bytes</span>
            </div>
          </article>
        </section>

        <article class="panel codetta-submit-panel">
          <div class="codetta-panel-body codetta-submit-body">
            <p id="codetta-byte-status" class="codetta-byte-status"></p>
            <p id="codetta-result" class="codetta-result">Status: pending</p>
            <section id="codetta-submit-help" class="codetta-submit-help" hidden>
              <p class="codetta-submit-head">🏆 New record! Ready to submit?</p>
              <p>Submit opens a prefilled GitHub issue for this Codetta submission.</p>
              <div class="codetta-submit-actions">
                <button id="codetta-submit" type="button" class="primary" disabled>✦ Submit</button>
              </div>
            </section>
          </div>
        </article>
      </section>
    </section>
  `;const t=n.querySelector('[data-screen="list"]'),i=n.querySelector('[data-screen="detail"]'),r=n.querySelector("#codetta-etude-list"),s=n.querySelector("#codetta-title"),o=n.querySelector("#codetta-description"),l=n.querySelector("#codetta-expected"),a=n.querySelector("#codetta-leader"),u=n.querySelector("#codetta-bytes"),c=n.querySelector("#codetta-date"),h=g9(n,"#codetta-attempt"),f=n.querySelector("#codetta-load-best"),d=n.querySelector("#codetta-byte-status"),p=n.querySelector("#codetta-run"),m=n.querySelector("#codetta-summary"),b=n.querySelector("#codetta-output"),g=n.querySelector("#codetta-output-wrap"),_=n.querySelector("#codetta-output-wrap-toggle"),S=n.querySelector("#codetta-bytecode"),D=n.querySelector("#codetta-bytecode-meta"),C=n.querySelector("#codetta-bytecode-count"),k=n.querySelector("#codetta-result"),T=n.querySelector("#codetta-submit"),I=n.querySelector("#codetta-submit-help"),P=Array.from(n.querySelectorAll("[data-codetta-detail-tab]")),v=Array.from(n.querySelectorAll("[data-codetta-detail-panel]"));if(!t||!i||!r||!s||!o||!l||!a||!u||!c||!f||!d||!p||!m||!b||!g||!_||!S||!D||!C||!k||!T||!I)throw new Error("Missing Codetta UI elements.");const M=Ha(h,((Be=Tt[0])==null?void 0:Be.solution)??"",{extraExtensions:[qa],onDocumentChange:()=>{j(),ie()}}),x={listScreen:t,detailScreen:i,listBody:r,prevButton:e.detailNavigation.prevButton,nextButton:e.detailNavigation.nextButton,title:s,description:o,expected:l,leader:a,bytes:u,date:c,attemptEditor:M,loadBest:f,byteStatus:d,runButton:p,summary:m,output:b,outputWrap:g,outputWrapToggle:_,bytecode:S,bytecodeMeta:D,bytecodeCount:C,result:k,submit:T,submitHelp:I,detailTabs:P,detailPanels:v};let F=Tt[0],q=!1,z=null;function j(){q=!1,z=null,x.output.textContent="(Run your attempt to compare output.)",te(""),oe(),x.byteStatus.textContent="Compiled bytes: run to compute and compare against the current best.",delete x.byteStatus.dataset.tone,x.result.textContent="Status: run required",x.result.dataset.tone="pending"}function V(N){x.detailTabs.forEach(re=>{const ne=re.dataset.codettaDetailTab===N;re.classList.toggle("is-active",ne)}),x.detailPanels.forEach(re=>{const ne=re.dataset.codettaDetailPanel===N;re.classList.toggle("is-active",ne)}),x.outputWrapToggle.hidden=N==="bytecode",x.bytecodeMeta.hidden=N!=="bytecode"}function te(N){x.bytecode.textContent=fp(N)||"(Run your attempt to inspect bytecode.)",x.bytecodeCount.textContent=m9(N)}function J(N){x.output.classList.toggle("is-wrapped",N)}J(x.outputWrap.checked),x.outputWrap.addEventListener("change",()=>{J(x.outputWrap.checked)});function w(N){x.runButton.disabled=N,x.runButton.textContent=N?"Running...":"▶ Run",x.runButton.setAttribute("aria-label",N?"Running Codetta attempt":"Run Codetta attempt")}function oe(){x.summary.innerHTML=ji([{label:"compile",value:"—",tone:"pending"},{label:"execute",value:"—",tone:"pending"},{label:"vm steps",value:"—",tone:"pending"},{label:"exit",value:"—",tone:"pending"}]),x.summary.dataset.state="idle"}function le(N){if(z=N,N===null)return x.byteStatus.textContent="Compiled bytes: run to compute and compare against the current best.",delete x.byteStatus.dataset.tone,null;const re=N-F.bytes;return re<0?(x.byteStatus.textContent=`Compiled bytes: ${N} ← new record candidate (${Math.abs(re)} under ${F.bytes})`,x.byteStatus.dataset.tone="good",N):re===0?(x.byteStatus.textContent=`Compiled bytes: ${N} ← tied with current best (${F.bytes})`,x.byteStatus.dataset.tone="neutral",N):(x.byteStatus.textContent=`Compiled bytes: ${N} ← over current best (${F.bytes})`,x.byteStatus.dataset.tone="bad",N)}function y(N){return Tt.findIndex(re=>re.id===N.id)}function ae(){const N=y(F);x.prevButton.disabled=N<=0,x.nextButton.disabled=N===-1||N>=Tt.length-1}function Q(N){var re,ne;(ne=(re=e.detailNavigation).onVisibilityChange)==null||ne.call(re,N)}function ie(){const N=q&&z!==null&&z<F.bytes;x.submit.disabled=!N,x.submitHelp.hidden=!N}function Le(){x.listBody.innerHTML=Tt.map(N=>`
      <button
        type="button"
        class="codetta-list-card"
        role="listitem"
        data-etude-id="${N.id}"
        aria-label="Open codetta ${pi(N.title)}, led by ${pi(N.leader)}, ${N.bytes} compiled bytes"
      >
        <span class="codetta-list-card-title">${pi(N.title)}</span>
        <span class="codetta-list-card-meta">${pi(N.leader)}</span>
        <span class="codetta-list-card-bytes">${N.bytes}</span>
      </button>
    `).join("")}function _e(N,re){$l(),F=N,x.title.textContent=N.title,x.description.innerHTML=h9(N.description),x.expected.textContent=N.expected,x.leader.textContent=N.leader,x.bytes.textContent=String(N.bytes),x.date.textContent=N.date,x.attemptEditor.setValue(N.solution),V("output"),j(),ie(),ae(),x.listScreen.hidden=!0,x.detailScreen.hidden=!1,Q(!0),re!=null&&re.history&&re.history!=="none"&&b9(N.id,re.history,re.history==="push"?e.onPushNavigation:void 0),x.attemptEditor.focus()}function qe(N){$l(),x.detailScreen.hidden=!0,x.listScreen.hidden=!1,Q(!1)}function Me(N=window.location){const re=y9(N);if(re){_e(re,{history:"none"});return}qe()}return Le(),oe(),w(!1),_e(F,{history:"none"}),Me(),x.detailTabs.forEach(N=>{N.addEventListener("click",()=>{V(N.dataset.codettaDetailTab??"output")})}),x.listBody.addEventListener("click",N=>{const re=N.target.closest("[data-etude-id]");if(!re)return;const ne=Tt.find(fn=>fn.id===re.getAttribute("data-etude-id"));ne&&_e(ne,{history:"push"})}),x.prevButton.addEventListener("click",()=>{const N=y(F);N<=0||_e(Tt[N-1],{history:"push"})}),x.nextButton.addEventListener("click",()=>{const N=y(F);N===-1||N>=Tt.length-1||_e(Tt[N+1],{history:"push"})}),x.loadBest.addEventListener("click",()=>{x.attemptEditor.setValue(F.solution),x.attemptEditor.focus()}),x.runButton.addEventListener("click",async()=>{const N=new AbortController,re=Ua(N);za(x.runButton),w(!0),x.summary.dataset.state="running",x.summary.innerHTML=ji([{label:"compile",value:"Running...",tone:"running",showDot:!0},{label:"execute",value:"…",tone:"pending"},{label:"vm steps",value:"…",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]);try{const ne=await Wa(x.attemptEditor.getValue(),"",!0,{filename:bp(F.id),signal:N.signal,onProgress:({vmCyclesExecuted:Ri,compileMs:en,executeElapsedMs:Rt,bytecode:Zn})=>{Zn!==void 0&&te(Zn),x.summary.innerHTML=ji([{label:"compile",value:en!==void 0?`${en.toFixed(2)} ms`:"…",tone:"running"},{label:"execute",value:Rt!==void 0?`${Rt.toFixed(2)} ms`:"…",tone:"running",showDot:!0},{label:"vm steps",value:Di(Ri),tone:"running"},{label:"exit",value:"pending",tone:"pending"}])}}),fn=ne.terminal==="cancelled"?"cancelled":ne.terminal==="error"?"error":String(ne.exitCode),Bn=ne.terminal==="cancelled"?"pending":ne.terminal==="error"?"error":ne.exitCode===0?"success":"error";if(x.summary.dataset.state="idle",x.summary.innerHTML=ji([{label:"compile",value:`${ne.compileMs.toFixed(2)} ms`},{label:"execute",value:`${ne.executeMs.toFixed(2)} ms`},{label:"vm steps",value:ne.vmCyclesExecuted!==void 0?Di(ne.vmCyclesExecuted):"—"},{label:"exit",value:fn,tone:Bn}]),te(ne.bytecode),le(ne.compiledBytes),ne.terminal==="error"){q=!1,x.output.textContent=ne.logs.join(`
`)||"Run failed.",x.result.textContent="Status: error",x.result.dataset.tone="bad",ie();return}const Ot=na(ne.output);q=a9(ne.output,F.expected),x.output.textContent=Ot||"(no output)",x.result.textContent=q?"✓ Output matches expected":"✗ Output does not match expected",x.result.dataset.tone=q?"good":"bad",ie()}catch(ne){q=!1,z=null,x.output.textContent=ne instanceof Error?ne.message:String(ne),te(""),le(null),x.summary.dataset.state="idle",x.summary.innerHTML=ji([{label:"compile",value:"failed",tone:"error"},{label:"execute",value:"—",tone:"pending"},{label:"vm steps",value:"—",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),x.result.textContent="Status: error",x.result.dataset.tone="bad",ie()}finally{re(),Fa(),w(!1)}}),x.submit.addEventListener("click",()=>{x.submit.disabled||z!==null&&window.location.assign(p9(F,z,x.attemptEditor.getValue(),q))}),{syncFromLocation:Me}}var Ke=Uint8Array,pt=Uint16Array,lu=Int32Array,to=new Ke([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),no=new Ke([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),ia=new Ke([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Mm=function(n,e){for(var t=new pt(31),i=0;i<31;++i)t[i]=e+=1<<n[i-1];for(var r=new lu(t[30]),i=1;i<30;++i)for(var s=t[i];s<t[i+1];++s)r[s]=s-t[i]<<5|i;return{b:t,r}},Pm=Mm(to,2),Dm=Pm.b,ra=Pm.r;Dm[28]=258,ra[258]=28;var Im=Mm(no,0),k9=Im.b,Eh=Im.r,sa=new pt(32768);for(var Ce=0;Ce<32768;++Ce){var bn=(Ce&43690)>>1|(Ce&21845)<<1;bn=(bn&52428)>>2|(bn&13107)<<2,bn=(bn&61680)>>4|(bn&3855)<<4,sa[Ce]=((bn&65280)>>8|(bn&255)<<8)>>1}var Yt=(function(n,e,t){for(var i=n.length,r=0,s=new pt(e);r<i;++r)n[r]&&++s[n[r]-1];var o=new pt(e);for(r=1;r<e;++r)o[r]=o[r-1]+s[r-1]<<1;var l;if(t){l=new pt(1<<e);var a=15-e;for(r=0;r<i;++r)if(n[r])for(var u=r<<4|n[r],c=e-n[r],h=o[n[r]-1]++<<c,f=h|(1<<c)-1;h<=f;++h)l[sa[h]>>a]=u}else for(l=new pt(i),r=0;r<i;++r)n[r]&&(l[r]=sa[o[n[r]-1]++]>>15-n[r]);return l}),Mn=new Ke(288);for(var Ce=0;Ce<144;++Ce)Mn[Ce]=8;for(var Ce=144;Ce<256;++Ce)Mn[Ce]=9;for(var Ce=256;Ce<280;++Ce)Mn[Ce]=7;for(var Ce=280;Ce<288;++Ce)Mn[Ce]=8;var kr=new Ke(32);for(var Ce=0;Ce<32;++Ce)kr[Ce]=5;var x9=Yt(Mn,9,0),v9=Yt(Mn,9,1),S9=Yt(kr,5,0),_9=Yt(kr,5,1),jo=function(n){for(var e=n[0],t=1;t<n.length;++t)n[t]>e&&(e=n[t]);return e},At=function(n,e,t){var i=e/8|0;return(n[i]|n[i+1]<<8)>>(e&7)&t},Ko=function(n,e){var t=e/8|0;return(n[t]|n[t+1]<<8|n[t+2]<<16)>>(e&7)},au=function(n){return(n+7)/8|0},Lm=function(n,e,t){return(t==null||t>n.length)&&(t=n.length),new Ke(n.subarray(e,t))},C9=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],on=function(n,e,t){var i=new Error(e||C9[n]);if(i.code=n,Error.captureStackTrace&&Error.captureStackTrace(i,on),!t)throw i;return i},A9=function(n,e,t,i){var r=n.length,s=0;if(!r||e.f&&!e.l)return t||new Ke(0);var o=!t,l=o||e.i!=2,a=e.i;o&&(t=new Ke(r*3));var u=function(Be){var N=t.length;if(Be>N){var re=new Ke(Math.max(N*2,Be));re.set(t),t=re}},c=e.f||0,h=e.p||0,f=e.b||0,d=e.l,p=e.d,m=e.m,b=e.n,g=r*8;do{if(!d){c=At(n,h,1);var _=At(n,h+1,3);if(h+=3,_)if(_==1)d=v9,p=_9,m=9,b=5;else if(_==2){var k=At(n,h,31)+257,T=At(n,h+10,15)+4,I=k+At(n,h+5,31)+1;h+=14;for(var P=new Ke(I),v=new Ke(19),M=0;M<T;++M)v[ia[M]]=At(n,h+M*3,7);h+=T*3;for(var x=jo(v),F=(1<<x)-1,q=Yt(v,x,1),M=0;M<I;){var z=q[At(n,h,F)];h+=z&15;var S=z>>4;if(S<16)P[M++]=S;else{var j=0,V=0;for(S==16?(V=3+At(n,h,3),h+=2,j=P[M-1]):S==17?(V=3+At(n,h,7),h+=3):S==18&&(V=11+At(n,h,127),h+=7);V--;)P[M++]=j}}var te=P.subarray(0,k),J=P.subarray(k);m=jo(te),b=jo(J),d=Yt(te,m,1),p=Yt(J,b,1)}else on(1);else{var S=au(h)+4,D=n[S-4]|n[S-3]<<8,C=S+D;if(C>r){a&&on(0);break}l&&u(f+D),t.set(n.subarray(S,C),f),e.b=f+=D,e.p=h=C*8,e.f=c;continue}if(h>g){a&&on(0);break}}l&&u(f+131072);for(var w=(1<<m)-1,oe=(1<<b)-1,le=h;;le=h){var j=d[Ko(n,h)&w],y=j>>4;if(h+=j&15,h>g){a&&on(0);break}if(j||on(2),y<256)t[f++]=y;else if(y==256){le=h,d=null;break}else{var ae=y-254;if(y>264){var M=y-257,Q=to[M];ae=At(n,h,(1<<Q)-1)+Dm[M],h+=Q}var ie=p[Ko(n,h)&oe],Le=ie>>4;ie||on(3),h+=ie&15;var J=k9[Le];if(Le>3){var Q=no[Le];J+=Ko(n,h)&(1<<Q)-1,h+=Q}if(h>g){a&&on(0);break}l&&u(f+131072);var _e=f+ae;if(f<J){var qe=s-J,Me=Math.min(J,_e);for(qe+f<0&&on(3);f<Me;++f)t[f]=i[qe+f]}for(;f<_e;++f)t[f]=t[f-J]}}e.l=d,e.p=le,e.b=f,e.f=c,d&&(c=1,e.m=m,e.d=p,e.n=b)}while(!c);return f!=t.length&&o?Lm(t,0,f):t.subarray(0,f)},sn=function(n,e,t){t<<=e&7;var i=e/8|0;n[i]|=t,n[i+1]|=t>>8},Ki=function(n,e,t){t<<=e&7;var i=e/8|0;n[i]|=t,n[i+1]|=t>>8,n[i+2]|=t>>16},Xo=function(n,e){for(var t=[],i=0;i<n.length;++i)n[i]&&t.push({s:i,f:n[i]});var r=t.length,s=t.slice();if(!r)return{t:Om,l:0};if(r==1){var o=new Ke(t[0].s+1);return o[t[0].s]=1,{t:o,l:1}}t.sort(function(C,k){return C.f-k.f}),t.push({s:-1,f:25001});var l=t[0],a=t[1],u=0,c=1,h=2;for(t[0]={s:-1,f:l.f+a.f,l,r:a};c!=r-1;)l=t[t[u].f<t[h].f?u++:h++],a=t[u!=c&&t[u].f<t[h].f?u++:h++],t[c++]={s:-1,f:l.f+a.f,l,r:a};for(var f=s[0].s,i=1;i<r;++i)s[i].s>f&&(f=s[i].s);var d=new pt(f+1),p=oa(t[c-1],d,0);if(p>e){var i=0,m=0,b=p-e,g=1<<b;for(s.sort(function(k,T){return d[T.s]-d[k.s]||k.f-T.f});i<r;++i){var _=s[i].s;if(d[_]>e)m+=g-(1<<p-d[_]),d[_]=e;else break}for(m>>=b;m>0;){var S=s[i].s;d[S]<e?m-=1<<e-d[S]++-1:++i}for(;i>=0&&m;--i){var D=s[i].s;d[D]==e&&(--d[D],++m)}p=e}return{t:new Ke(d),l:p}},oa=function(n,e,t){return n.s==-1?Math.max(oa(n.l,e,t+1),oa(n.r,e,t+1)):e[n.s]=t},Mh=function(n){for(var e=n.length;e&&!n[--e];);for(var t=new pt(++e),i=0,r=n[0],s=1,o=function(a){t[i++]=a},l=1;l<=e;++l)if(n[l]==r&&l!=e)++s;else{if(!r&&s>2){for(;s>138;s-=138)o(32754);s>2&&(o(s>10?s-11<<5|28690:s-3<<5|12305),s=0)}else if(s>3){for(o(r),--s;s>6;s-=6)o(8304);s>2&&(o(s-3<<5|8208),s=0)}for(;s--;)o(r);s=1,r=n[l]}return{c:t.subarray(0,i),n:e}},Xi=function(n,e){for(var t=0,i=0;i<e.length;++i)t+=n[i]*e[i];return t},Bm=function(n,e,t){var i=t.length,r=au(e+2);n[r]=i&255,n[r+1]=i>>8,n[r+2]=n[r]^255,n[r+3]=n[r+1]^255;for(var s=0;s<i;++s)n[r+s+4]=t[s];return(r+4+i)*8},Ph=function(n,e,t,i,r,s,o,l,a,u,c){sn(e,c++,t),++r[256];for(var h=Xo(r,15),f=h.t,d=h.l,p=Xo(s,15),m=p.t,b=p.l,g=Mh(f),_=g.c,S=g.n,D=Mh(m),C=D.c,k=D.n,T=new pt(19),I=0;I<_.length;++I)++T[_[I]&31];for(var I=0;I<C.length;++I)++T[C[I]&31];for(var P=Xo(T,7),v=P.t,M=P.l,x=19;x>4&&!v[ia[x-1]];--x);var F=u+5<<3,q=Xi(r,Mn)+Xi(s,kr)+o,z=Xi(r,f)+Xi(s,m)+o+14+3*x+Xi(T,v)+2*T[16]+3*T[17]+7*T[18];if(a>=0&&F<=q&&F<=z)return Bm(e,c,n.subarray(a,a+u));var j,V,te,J;if(sn(e,c,1+(z<q)),c+=2,z<q){j=Yt(f,d,0),V=f,te=Yt(m,b,0),J=m;var w=Yt(v,M,0);sn(e,c,S-257),sn(e,c+5,k-1),sn(e,c+10,x-4),c+=14;for(var I=0;I<x;++I)sn(e,c+3*I,v[ia[I]]);c+=3*x;for(var oe=[_,C],le=0;le<2;++le)for(var y=oe[le],I=0;I<y.length;++I){var ae=y[I]&31;sn(e,c,w[ae]),c+=v[ae],ae>15&&(sn(e,c,y[I]>>5&127),c+=y[I]>>12)}}else j=x9,V=Mn,te=S9,J=kr;for(var I=0;I<l;++I){var Q=i[I];if(Q>255){var ae=Q>>18&31;Ki(e,c,j[ae+257]),c+=V[ae+257],ae>7&&(sn(e,c,Q>>23&31),c+=to[ae]);var ie=Q&31;Ki(e,c,te[ie]),c+=J[ie],ie>3&&(Ki(e,c,Q>>5&8191),c+=no[ie])}else Ki(e,c,j[Q]),c+=V[Q]}return Ki(e,c,j[256]),c+V[256]},T9=new lu([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Om=new Ke(0),E9=function(n,e,t,i,r,s){var o=s.z||n.length,l=new Ke(i+o+5*(1+Math.ceil(o/7e3))+r),a=l.subarray(i,l.length-r),u=s.l,c=(s.r||0)&7;if(e){c&&(a[0]=s.r>>3);for(var h=T9[e-1],f=h>>13,d=h&8191,p=(1<<t)-1,m=s.p||new pt(32768),b=s.h||new pt(p+1),g=Math.ceil(t/3),_=2*g,S=function(ne){return(n[ne]^n[ne+1]<<g^n[ne+2]<<_)&p},D=new lu(25e3),C=new pt(288),k=new pt(32),T=0,I=0,P=s.i||0,v=0,M=s.w||0,x=0;P+2<o;++P){var F=S(P),q=P&32767,z=b[F];if(m[q]=z,b[F]=q,M<=P){var j=o-P;if((T>7e3||v>24576)&&(j>423||!u)){c=Ph(n,a,0,D,C,k,I,v,x,P-x,c),v=T=I=0,x=P;for(var V=0;V<286;++V)C[V]=0;for(var V=0;V<30;++V)k[V]=0}var te=2,J=0,w=d,oe=q-z&32767;if(j>2&&F==S(P-oe))for(var le=Math.min(f,j)-1,y=Math.min(32767,P),ae=Math.min(258,j);oe<=y&&--w&&q!=z;){if(n[P+te]==n[P+te-oe]){for(var Q=0;Q<ae&&n[P+Q]==n[P+Q-oe];++Q);if(Q>te){if(te=Q,J=oe,Q>le)break;for(var ie=Math.min(oe,Q-2),Le=0,V=0;V<ie;++V){var _e=P-oe+V&32767,qe=m[_e],Me=_e-qe&32767;Me>Le&&(Le=Me,z=_e)}}}q=z,z=m[q],oe+=q-z&32767}if(J){D[v++]=268435456|ra[te]<<18|Eh[J];var Be=ra[te]&31,N=Eh[J]&31;I+=to[Be]+no[N],++C[257+Be],++k[N],M=P+te,++T}else D[v++]=n[P],++C[n[P]]}}for(P=Math.max(P,M);P<o;++P)D[v++]=n[P],++C[n[P]];c=Ph(n,a,u,D,C,k,I,v,x,P-x,c),u||(s.r=c&7|a[c/8|0]<<3,c-=7,s.h=b,s.p=m,s.i=P,s.w=M)}else{for(var P=s.w||0;P<o+u;P+=65535){var re=P+65535;re>=o&&(a[c/8|0]=u,re=o),c=Bm(a,c+1,n.subarray(P,re))}s.i=o}return Lm(l,0,i+au(c)+r)},M9=function(n,e,t,i,r){if(!r&&(r={l:1},e.dictionary)){var s=e.dictionary.subarray(-32768),o=new Ke(s.length+n.length);o.set(s),o.set(n,s.length),n=o,r.w=s.length}return E9(n,e.level==null?6:e.level,e.mem==null?r.l?Math.ceil(Math.max(8,Math.min(13,Math.log(n.length)))*1.5):20:12+e.mem,t,i,r)};function P9(n,e){return M9(n,e||{},0,0)}function D9(n,e){return A9(n,{i:2},e,e)}var I9=typeof TextDecoder<"u"&&new TextDecoder,L9=0;try{I9.decode(Om,{stream:!0}),L9=1}catch{}const Rm=new TextEncoder,zm=new TextDecoder,la="txt.",aa="b64.",ua="c64.",Dh="bc.",B9=45,O9=70;function R9(n){for(let e=0;e<n.length;e+=1)if(n.charCodeAt(e)>127)return!1;return!0}function Fm(n){let e="";for(const t of n)e+=String.fromCharCode(t);return btoa(e).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function Nm(n){const e=n.replaceAll("-","+").replaceAll("_","/"),t=e.padEnd(Math.ceil(e.length/4)*4,"="),i=atob(t);return Uint8Array.from(i,r=>r.charCodeAt(0))}function z9(n){return Fm(Rm.encode(n))}function F9(n){return zm.decode(Nm(n))}function N9(n){const e=P9(Rm.encode(n),{level:9});return Fm(e)}function q9(n){const e=Nm(n);return zm.decode(D9(e))}function H9(n){return n.map(e=>e.op!==ee.push?e:{...e,meta:{...e.meta,pointer:!0}})}function $9(n){const e=n.replaceAll(" ","+").replaceAll("-","+").replaceAll("_","/"),t=H9(bw(wr.fromBase64(e)));return np(t)}const V9={encodeText(n){return`${la}${n}`},encodeBase64(n){return`${aa}${z9(n)}`},encodeCompressed(n){return`${ua}${N9(n)}`}};function es(n,e){try{return e(n)}catch{return null}}function W9(n,e){const t={...V9,...e},i=R9(n),r=i&&n.length<=B9,s=n.length>=O9;if(r)return es(n,t.encodeText);if(s){const l=es(n,t.encodeCompressed);if(l!==null)return l}const o=es(n,t.encodeBase64);return o!==null?o:i?es(n,t.encodeText):null}function U9(n){if(n===null)return null;if(n.startsWith(la))return n.slice(la.length);if(n.startsWith(aa)){const e=n.slice(aa.length);try{return F9(e)}catch{return null}}if(n.startsWith(ua)){const e=n.slice(ua.length);try{return q9(e)}catch{return null}}if(n.startsWith(Dh)){const e=n.slice(Dh.length);try{return $9(e)}catch{return null}}return null}function Qe(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function ye(n,e){const t=n.querySelector(e);if(!t)throw new Error(`Missing required element: ${e}`);return t}function oi(n){n.scrollTop=n.scrollHeight}function j9(n){const e=n?Va(n):0;return`${e} ${e===1?"byte":"bytes"}`}function Go(){return new Promise(n=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>n())})})}function Gi(n){return n.map(e=>{const t=e.tone&&e.tone!=="default"?` ${e.tone}`:"",i=e.showDot?'<span class="summary-running-dot" aria-hidden="true"></span>':"";return`
      <span class="summary-bar-item">
        <span class="label">${e.label}</span>
        <span class="value${t}">${i}${Qe(e.value)}</span>
      </span>
    `}).join("")}function K9(){return Qw.replace("{{EXAMPLE_OPTIONS}}",Zy).replace("{{HELP_HTML}}",Jw)}function X9(n){var uu;n.innerHTML=K9();const e=ye(n,"#run-feedback-toggle");e.addEventListener("click",()=>{D2(),_c(e)}),_c(e);const t=ye(n,"#source"),i=ye(n,"#stdin"),r=ye(n,"#optimize"),s=ye(n,"#example"),o=ye(n,"#run"),l=ye(n,"#summary"),a=ye(n,"#output"),u=ye(n,"#output-wrap"),c=ye(n,"#output-wrap-toggle"),h=ye(n,"#error"),f=ye(n,"#preprocessed"),d=ye(n,"#ir"),p=ye(n,"#bytecode"),m=ye(n,"#bytecode-meta"),b=ye(n,"#bytecode-count"),g=ye(n,"#repl-command"),_=ye(n,"#repl-reset"),S=ye(n,"#repl-status"),D=ye(n,"#repl-output"),C=ye(n,"#repl-stack"),k=ye(n,"#repl-depth"),T=ye(n,"#repl-inspect"),I=ye(n,"#repl-inspect-back"),P=ye(n,"#repl-inspect-close"),v=ye(n,"#repl-inspect-content"),M=ye(n,"#tutorial-root"),x=ye(n,"#codetta-root"),F=ye(n,"#codetta-mode-nav"),q=ye(n,"#codetta-mode-prev"),z=ye(n,"#codetta-mode-next"),j=Array.from(n.querySelectorAll(".mode-tab")),V=Array.from(n.querySelectorAll(".tab-panel")),te=Array.from(n.querySelectorAll(".subtab")),J=Array.from(n.querySelectorAll(".detail-panel")),w=ep(window.location),oe=U9(w.get("code")),le=w.get("example");let y=Mc,ae=Jy;oe!=null?(y=oe,ae=Ji):le!==null&&le in cs&&(y=cs[le],ae=le);let Q=hs(window.location.hash),ie=!1;function Le(){F.hidden=Q!=="codetta"||!ie}let _e=!1;const qe=Ha(t,y,{extraExtensions:[qa],onDocumentChange:()=>{_e||(s.value=Ji,ne())}});s.value=ae;const Me=Tc(f,""),Be=Tc(d,"");function N(B){a.classList.toggle("is-wrapped",B),Me.setWrapped(B),Be.setWrapped(B)}function re(B){s.disabled=B,i.disabled=B,r.disabled=B,o.textContent=B?"Cancel":"Run Program",o.setAttribute("aria-label",B?"Cancel run":"Run program"),o.classList.toggle("is-cancel",B),l.dataset.state=B?"running":"idle"}function ne(){let B=null,X=null,W=null;if(Q==="playground")if(s.value===Ji){const zi=qe.getValue();if(zi&&(B=W9(zi),B===null))return}else X=s.value;else Q==="codetta"&&(W=tp(window.location));const we=ql({pathname:window.location.pathname,search:yr(window.location),tab:Q,codeParam:B,exampleParam:X,etudeParam:W}),dn=`${window.location.pathname}${window.location.hash}`;we!==dn&&window.history.replaceState(window.history.state,"",we)}function fn(B){Q=hs(B),document.body.dataset.mode=Q,j.forEach(X=>{const W=X.dataset.tab===Q;X.classList.toggle("is-active",W)}),V.forEach(X=>{const W=X.dataset.panel===Q;X.classList.toggle("is-active",W)}),Le()}function Bn(B){te.forEach(X=>{const W=X.dataset.detailTab===B;X.classList.toggle("is-active",W)}),J.forEach(X=>{const W=X.dataset.detailPanel===B;X.classList.toggle("is-active",W)}),c.hidden=B==="bytecode",m.hidden=B!=="bytecode"}function Ot(B){p.innerHTML=Qe(fp(B)),b.textContent=j9(B)}j.forEach(B=>{B.addEventListener("click",()=>{const X=hs(B.dataset.tab);if(X===Q){if(X==="codetta"){const W=ql({pathname:window.location.pathname,search:yr(window.location),tab:"codetta",codeParam:null,exampleParam:null,etudeParam:null}),we=`${window.location.pathname}${window.location.hash}`;W!==we&&(window.location.hash=W.slice(W.indexOf("#")+1))}else ne();return}window.location.hash=X})});const Ri=w9(x,{detailNavigation:{prevButton:q,nextButton:z,onVisibilityChange:B=>{ie=B,Le()}}});function en(){$l(),fn(window.location.hash),Q==="codetta"&&Ri.syncFromLocation(),ne()}window.addEventListener("hashchange",en),window.addEventListener("popstate",en),en(),te.forEach(B=>{B.addEventListener("click",()=>{Bn(B.dataset.detailTab??"output")})}),N(u.checked),u.addEventListener("change",()=>{N(u.checked)}),Bn(((uu=te.find(B=>B.classList.contains("is-active")))==null?void 0:uu.dataset.detailTab)??"output");let Rt=null;async function Zn(){document.body.dataset.ready="false",re(!0),l.innerHTML=Gi([{label:"compile",value:"Running...",tone:"running",showDot:!0},{label:"execute",value:"…",tone:"pending"},{label:"vm steps",value:"…",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),h.textContent="";const B=new AbortController;Rt=B;const X=Ua(B);await Go();try{const W=await Wa(qe.getValue(),i.value,r.checked,{signal:B.signal,onProgress:({vmCyclesExecuted:Vm,compileMs:cu,executeElapsedMs:hu,preprocessed:fu,ir:Wm,bytecode:Um})=>{fu!==void 0&&(Me.setValue(fu),Be.setValue(Wm??""),Ot(Um??"")),l.innerHTML=Gi([{label:"compile",value:cu!==void 0?`${cu.toFixed(2)} ms`:"…",tone:"running"},{label:"execute",value:hu!==void 0?`${hu.toFixed(2)} ms`:"…",tone:"running",showDot:!0},{label:"vm steps",value:Di(Vm),tone:"running"},{label:"exit",value:"pending",tone:"pending"}])}}),we=W.issues.length,dn=[];W.output&&dn.push(W.output.trimEnd()),W.logs.length&&dn.push(W.logs.join(`
`));const io=[dn.length?dn.join(`
`):"(no output)",we?`

${we} compiler issue(s):
${W.issues.join(`
`)}`:""].join(""),ro=W.terminal==="cancelled"?"cancelled":W.terminal==="error"?"error":String(W.exitCode),Hm=W.terminal==="cancelled"?"pending":W.terminal==="error"?"error":W.exitCode===0?"success":"error",$m=[{label:"compile",value:`${W.compileMs.toFixed(2)} ms`},{label:"execute",value:`${W.executeMs.toFixed(2)} ms`},{label:"vm steps",value:W.vmCyclesExecuted!==void 0?Di(W.vmCyclesExecuted):"—"},{label:"exit",value:ro,tone:Hm}];l.innerHTML=Gi($m),W.terminal==="error"?(a.innerHTML="",h.innerHTML=Qe(W.logs.join(`
`)||"Run failed."),Me.setValue(""),Be.setValue(""),Ot(""),oi(h)):(a.innerHTML=Qe(io),h.textContent="",Me.setValue(W.preprocessed),Be.setValue(W.ir),Ot(W.bytecode),oi(a))}catch(W){const we=W instanceof Error?W.message:String(W);l.innerHTML=Gi([{label:"compile",value:"failed",tone:"error"},{label:"execute",value:"—",tone:"pending"},{label:"vm steps",value:"—",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),a.innerHTML="",h.innerHTML=Qe(we),Me.setValue(""),Be.setValue(""),Ot(""),oi(h)}finally{X(),Rt=null,Fa(),re(!1),document.body.dataset.ready="true"}}function ei(){l.innerHTML=Gi([{label:"compile",value:"—",tone:"pending"},{label:"execute",value:"—",tone:"pending"},{label:"vm steps",value:"—",tone:"pending"},{label:"exit",value:"—",tone:"pending"}]),l.dataset.state="idle",a.innerHTML=Qe("(Click Run Program to execute.)"),h.textContent="",Me.setValue(""),Be.setValue(""),Ot(""),document.body.dataset.ready="true"}const ti=new Yw,bt=["Core library loaded. Try defining words, evaluating quotes, or printing values."],_t=[];let E=-1;const R=[];let K=-1,ue,be=!1;function Ue(B){be=B,g.disabled=B,_.disabled=B,S.hidden=!B,S.setAttribute("aria-hidden",String(!B))}function tn(B){const X=B.trim();return X.length>0&&![".clear",".exit",".quit"].includes(X)}function ct(B){if(k.textContent=`depth: ${B.length}`,!B.length){C.innerHTML='<li class="repl-stack-empty">(empty stack)</li>',oi(C);return}C.innerHTML=B.map(X=>`
          <li class="repl-stack-row" data-value="${Qe(X.value)}">
            <span class="repl-stack-index">${X.index}:</span>
            <code class="repl-stack-value">${Qe(X.value)}</code>
          </li>
        `).join(""),oi(C)}function nn(){D.innerHTML=Qe(bt.join(`

`)),oi(D)}async function On(){if(be)return;const B=g.value,X=tn(B);X&&(Ue(!0),await Go());try{const W=ti.execute(B);W.clearTranscript&&bt.splice(0,bt.length),B.trim()&&(_t.push(B),E=_t.length),bt.push(`ff> ${B}`),W.output.trim()&&bt.push(W.output.trimEnd()),W.logs.length&&bt.push(W.logs.join(`
`)),W.error&&(bt.push(`Error: ${W.error}`),C.classList.add("is-error"),ue!==void 0&&window.clearTimeout(ue),ue=window.setTimeout(()=>{C.classList.remove("is-error")},500)),bt.push(`[ ${W.stack.map(we=>we.value).join(" ")} ]`),ct(W.stack),nn(),g.value=""}finally{X&&Ue(!1),g.focus()}}function He(B){if(B===null){T.classList.remove("is-visible");return}const X=[],W=K>0;if(X.push('<div class="inspect-header">'),X.push(`<code class="inspect-value">${Qe(String(B.value))}</code>`),B.name&&X.push(`<span class="inspect-name-label">KNOWN AS:</span><span class="inspect-name-value">${Qe(B.name)}</span>`),B.isSystem)X.push('<span class="inspect-tag system">system</span>');else if(B.isDefined){const we=!B.name&&B.value>255n;X.push(`<span class="inspect-tag ${we?"quote":"user"}">${we?"quote":"user-defined"}</span>`)}if(X.push("</div>"),B.isSystem&&(B.stackEffect||B.description)&&(X.push('<div class="inspect-vocabulary">'),B.stackEffect&&X.push(`<div class="inspect-stack-effect"><code>${Qe(B.stackEffect)}</code></div>`),B.description&&X.push(`<div class="inspect-description">${Qe(B.description)}</div>`),X.push("</div>")),B.definition&&B.definition.length>0){X.push('<div class="inspect-label">Definition:</div>'),X.push('<div class="inspect-definition">');for(const we of B.definition){const dn=we.name??String(we.value),zi=we.isCall?"token-call":"token-literal",io=we.isCall||we.isDefined?"inspectable":"",ro=we.isCall||we.isDefined?"Click to inspect":"Literal value";X.push(`<span class="inspect-token ${zi} ${io}" data-value="${Qe(String(we.value))}" title="${ro}">${Qe(dn)}</span>`)}X.push("</div>")}else!B.isSystem&&!B.isDefined&&X.push('<div class="inspect-note">Plain value (not a word)</div>');v.innerHTML=X.join(""),I.disabled=!W,P.style.display="inline-block",T.classList.add("is-visible")}function rn(B){K<R.length-1&&R.splice(K+1),R.push(B),K++,He(B)}function Ct(){K>0?(K--,He(R[K])):K===0&&(R.length=0,K=-1,He(null))}s.addEventListener("change",()=>{if(s.value===Ji){ne(),ei();return}_e=!0,qe.setValue(cs[s.value]??Mc),_e=!1,ne(),ei()}),o.addEventListener("click",()=>{if(Rt!==null){Rt.abort();return}za(o),ne(),Zn()}),r.addEventListener("change",()=>{ne(),ei()}),g.addEventListener("keydown",B=>{if(R2(g,B),B.key==="Enter"){B.preventDefault(),On();return}if(B.key==="ArrowUp"){if(B.preventDefault(),!_t.length)return;E=Math.max(0,E-1),g.value=_t[E]??"",g.setSelectionRange(g.value.length,g.value.length);return}if(B.key==="ArrowDown"){if(B.preventDefault(),!_t.length)return;E=Math.min(_t.length,E+1),g.value=_t[E]??"",g.setSelectionRange(g.value.length,g.value.length)}}),_.addEventListener("click",async()=>{if(!be){Ue(!0),await Go();try{ti.reset(),bt.splice(0,bt.length,"Session reset. Prelude reloaded."),_t.splice(0,_t.length),E=0,ct([]),nn(),g.value=""}finally{Ue(!1),g.focus()}}}),C.addEventListener("click",B=>{const X=B.target.closest(".repl-stack-row");if(!X)return;const W=X.getAttribute("data-value");if(!W)return;const we=ti.inspectValue(W);R.length=0,K=-1,rn(we)}),v.addEventListener("click",B=>{const X=B.target.closest(".inspect-token.inspectable");if(!X)return;const W=X.getAttribute("data-value");if(!W)return;const we=ti.inspectValue(W);rn(we)}),I.addEventListener("click",()=>{Ct()}),P.addEventListener("click",()=>{R.length=0,K=-1,T.classList.remove("is-visible")}),ei(),nk(M),ct([]),nn(),g.focus()}M2();const qm=document.querySelector("#app");if(!qm)throw new Error("Missing #app root");X9(qm);
