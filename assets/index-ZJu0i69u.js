var bh=Object.defineProperty;var yh=(i,e,t)=>e in i?bh(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var Jt=(i,e,t)=>yh(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();let Es=[],Cl=[];(()=>{let i="lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map(e=>e?parseInt(e,36):1);for(let e=0,t=0;e<i.length;e++)(e%2?Cl:Es).push(t=t+i[e])})();function vh(i){if(i<768)return!1;for(let e=0,t=Es.length;;){let n=e+t>>1;if(i<Es[n])t=n;else if(i>=Cl[n])e=n+1;else return!0;if(e==t)return!1}}function to(i){return i>=127462&&i<=127487}const no=8205;function wh(i,e,t=!0,n=!0){return(t?Ml:kh)(i,e,n)}function Ml(i,e,t){if(e==i.length)return e;e&&Tl(i.charCodeAt(e))&&El(i.charCodeAt(e-1))&&e--;let n=ss(i,e);for(e+=io(n);e<i.length;){let s=ss(i,e);if(n==no||s==no||t&&vh(s))e+=io(s),n=s;else if(to(s)){let r=0,o=e-2;for(;o>=0&&to(ss(i,o));)r++,o-=2;if(r%2==0)break;e+=2}else break}return e}function kh(i,e,t){for(;e>0;){let n=Ml(i,e-2,t);if(n<e)return n;e--}return 0}function ss(i,e){let t=i.charCodeAt(e);if(!El(t)||e+1==i.length)return t;let n=i.charCodeAt(e+1);return Tl(n)?(t-55296<<10)+(n-56320)+65536:t}function Tl(i){return i>=56320&&i<57344}function El(i){return i>=55296&&i<56320}function io(i){return i<65536?1:2}class J{lineAt(e){if(e<0||e>this.length)throw new RangeError(`Invalid position ${e} in document of length ${this.length}`);return this.lineInner(e,!1,1,0)}line(e){if(e<1||e>this.lines)throw new RangeError(`Invalid line number ${e} in ${this.lines}-line document`);return this.lineInner(e,!0,1,0)}replace(e,t,n){[e,t]=fn(this,e,t);let s=[];return this.decompose(0,e,s,2),n.length&&n.decompose(0,n.length,s,3),this.decompose(t,this.length,s,1),et.from(s,this.length-(t-e)+n.length)}append(e){return this.replace(this.length,this.length,e)}slice(e,t=this.length){[e,t]=fn(this,e,t);let n=[];return this.decompose(e,t,n,0),et.from(n,t-e)}eq(e){if(e==this)return!0;if(e.length!=this.length||e.lines!=this.lines)return!1;let t=this.scanIdentical(e,1),n=this.length-this.scanIdentical(e,-1),s=new Ln(this),r=new Ln(e);for(let o=t,l=t;;){if(s.next(o),r.next(o),o=0,s.lineBreak!=r.lineBreak||s.done!=r.done||s.value!=r.value)return!1;if(l+=s.value.length,s.done||l>=n)return!0}}iter(e=1){return new Ln(this,e)}iterRange(e,t=this.length){return new Bl(this,e,t)}iterLines(e,t){let n;if(e==null)n=this.iter();else{t==null&&(t=this.lines+1);let s=this.line(e).from;n=this.iterRange(s,Math.max(s,t==this.lines+1?this.length:t<=1?0:this.line(t-1).to))}return new Dl(n)}toString(){return this.sliceString(0)}toJSON(){let e=[];return this.flatten(e),e}constructor(){}static of(e){if(e.length==0)throw new RangeError("A document must have at least one line");return e.length==1&&!e[0]?J.empty:e.length<=32?new fe(e):et.from(fe.split(e,[]))}}class fe extends J{constructor(e,t=xh(e)){super(),this.text=e,this.length=t}get lines(){return this.text.length}get children(){return null}lineInner(e,t,n,s){for(let r=0;;r++){let o=this.text[r],l=s+o.length;if((t?n:l)>=e)return new Sh(s,l,n,o);s=l+1,n++}}decompose(e,t,n,s){let r=e<=0&&t>=this.length?this:new fe(so(this.text,e,t),Math.min(t,this.length)-Math.max(0,e));if(s&1){let o=n.pop(),l=vi(r.text,o.text.slice(),0,r.length);if(l.length<=32)n.push(new fe(l,o.length+r.length));else{let a=l.length>>1;n.push(new fe(l.slice(0,a)),new fe(l.slice(a)))}}else n.push(r)}replace(e,t,n){if(!(n instanceof fe))return super.replace(e,t,n);[e,t]=fn(this,e,t);let s=vi(this.text,vi(n.text,so(this.text,0,e)),t),r=this.length+n.length-(t-e);return s.length<=32?new fe(s,r):et.from(fe.split(s,[]),r)}sliceString(e,t=this.length,n=`
`){[e,t]=fn(this,e,t);let s="";for(let r=0,o=0;r<=t&&o<this.text.length;o++){let l=this.text[o],a=r+l.length;r>e&&o&&(s+=n),e<a&&t>r&&(s+=l.slice(Math.max(0,e-r),t-r)),r=a+1}return s}flatten(e){for(let t of this.text)e.push(t)}scanIdentical(){return 0}static split(e,t){let n=[],s=-1;for(let r of e)n.push(r),s+=r.length+1,n.length==32&&(t.push(new fe(n,s)),n=[],s=-1);return s>-1&&t.push(new fe(n,s)),t}}class et extends J{constructor(e,t){super(),this.children=e,this.length=t,this.lines=0;for(let n of e)this.lines+=n.lines}lineInner(e,t,n,s){for(let r=0;;r++){let o=this.children[r],l=s+o.length,a=n+o.lines-1;if((t?a:l)>=e)return o.lineInner(e,t,n,s);s=l+1,n=a+1}}decompose(e,t,n,s){for(let r=0,o=0;o<=t&&r<this.children.length;r++){let l=this.children[r],a=o+l.length;if(e<=a&&t>=o){let h=s&((o<=e?1:0)|(a>=t?2:0));o>=e&&a<=t&&!h?n.push(l):l.decompose(e-o,t-o,n,h)}o=a+1}}replace(e,t,n){if([e,t]=fn(this,e,t),n.lines<this.lines)for(let s=0,r=0;s<this.children.length;s++){let o=this.children[s],l=r+o.length;if(e>=r&&t<=l){let a=o.replace(e-r,t-r,n),h=this.lines-o.lines+a.lines;if(a.lines<h>>4&&a.lines>h>>6){let c=this.children.slice();return c[s]=a,new et(c,this.length-(t-e)+n.length)}return super.replace(r,l,a)}r=l+1}return super.replace(e,t,n)}sliceString(e,t=this.length,n=`
`){[e,t]=fn(this,e,t);let s="";for(let r=0,o=0;r<this.children.length&&o<=t;r++){let l=this.children[r],a=o+l.length;o>e&&r&&(s+=n),e<a&&t>o&&(s+=l.sliceString(e-o,t-o,n)),o=a+1}return s}flatten(e){for(let t of this.children)t.flatten(e)}scanIdentical(e,t){if(!(e instanceof et))return 0;let n=0,[s,r,o,l]=t>0?[0,0,this.children.length,e.children.length]:[this.children.length-1,e.children.length-1,-1,-1];for(;;s+=t,r+=t){if(s==o||r==l)return n;let a=this.children[s],h=e.children[r];if(a!=h)return n+a.scanIdentical(h,t);n+=a.length+1}}static from(e,t=e.reduce((n,s)=>n+s.length+1,-1)){let n=0;for(let d of e)n+=d.lines;if(n<32){let d=[];for(let p of e)p.flatten(d);return new fe(d,t)}let s=Math.max(32,n>>5),r=s<<1,o=s>>1,l=[],a=0,h=-1,c=[];function f(d){let p;if(d.lines>r&&d instanceof et)for(let m of d.children)f(m);else d.lines>o&&(a>o||!a)?(u(),l.push(d)):d instanceof fe&&a&&(p=c[c.length-1])instanceof fe&&d.lines+p.lines<=32?(a+=d.lines,h+=d.length+1,c[c.length-1]=new fe(p.text.concat(d.text),p.length+1+d.length)):(a+d.lines>s&&u(),a+=d.lines,h+=d.length+1,c.push(d))}function u(){a!=0&&(l.push(c.length==1?c[0]:et.from(c,h)),h=-1,a=c.length=0)}for(let d of e)f(d);return u(),l.length==1?l[0]:new et(l,t)}}J.empty=new fe([""],0);function xh(i){let e=-1;for(let t of i)e+=t.length+1;return e}function vi(i,e,t=0,n=1e9){for(let s=0,r=0,o=!0;r<i.length&&s<=n;r++){let l=i[r],a=s+l.length;a>=t&&(a>n&&(l=l.slice(0,n-s)),s<t&&(l=l.slice(t-s)),o?(e[e.length-1]+=l,o=!1):e.push(l)),s=a+1}return e}function so(i,e,t){return vi(i,[""],e,t)}class Ln{constructor(e,t=1){this.dir=t,this.done=!1,this.lineBreak=!1,this.value="",this.nodes=[e],this.offsets=[t>0?1:(e instanceof fe?e.text.length:e.children.length)<<1]}nextInner(e,t){for(this.done=this.lineBreak=!1;;){let n=this.nodes.length-1,s=this.nodes[n],r=this.offsets[n],o=r>>1,l=s instanceof fe?s.text.length:s.children.length;if(o==(t>0?l:0)){if(n==0)return this.done=!0,this.value="",this;t>0&&this.offsets[n-1]++,this.nodes.pop(),this.offsets.pop()}else if((r&1)==(t>0?0:1)){if(this.offsets[n]+=t,e==0)return this.lineBreak=!0,this.value=`
`,this;e--}else if(s instanceof fe){let a=s.text[o+(t<0?-1:0)];if(this.offsets[n]+=t,a.length>Math.max(0,e))return this.value=e==0?a:t>0?a.slice(e):a.slice(0,a.length-e),this;e-=a.length}else{let a=s.children[o+(t<0?-1:0)];e>a.length?(e-=a.length,this.offsets[n]+=t):(t<0&&this.offsets[n]--,this.nodes.push(a),this.offsets.push(t>0?1:(a instanceof fe?a.text.length:a.children.length)<<1))}}}next(e=0){return e<0&&(this.nextInner(-e,-this.dir),e=this.value.length),this.nextInner(e,this.dir)}}class Bl{constructor(e,t,n){this.value="",this.done=!1,this.cursor=new Ln(e,t>n?-1:1),this.pos=t>n?e.length:0,this.from=Math.min(t,n),this.to=Math.max(t,n)}nextInner(e,t){if(t<0?this.pos<=this.from:this.pos>=this.to)return this.value="",this.done=!0,this;e+=Math.max(0,t<0?this.pos-this.to:this.from-this.pos);let n=t<0?this.pos-this.from:this.to-this.pos;e>n&&(e=n),n-=e;let{value:s}=this.cursor.next(e);return this.pos+=(s.length+e)*t,this.value=s.length<=n?s:t<0?s.slice(s.length-n):s.slice(0,n),this.done=!this.value,this}next(e=0){return e<0?e=Math.max(e,this.from-this.pos):e>0&&(e=Math.min(e,this.to-this.pos)),this.nextInner(e,this.cursor.dir)}get lineBreak(){return this.cursor.lineBreak&&this.value!=""}}class Dl{constructor(e){this.inner=e,this.afterBreak=!0,this.value="",this.done=!1}next(e=0){let{done:t,lineBreak:n,value:s}=this.inner.next(e);return t&&this.afterBreak?(this.value="",this.afterBreak=!1):t?(this.done=!0,this.value=""):n?this.afterBreak?this.value="":(this.afterBreak=!0,this.next()):(this.value=s,this.afterBreak=!1),this}get lineBreak(){return!1}}typeof Symbol<"u"&&(J.prototype[Symbol.iterator]=function(){return this.iter()},Ln.prototype[Symbol.iterator]=Bl.prototype[Symbol.iterator]=Dl.prototype[Symbol.iterator]=function(){return this});class Sh{constructor(e,t,n,s){this.from=e,this.to=t,this.number=n,this.text=s}get length(){return this.to-this.from}}function fn(i,e,t){return e=Math.max(0,Math.min(i.length,e)),[e,Math.max(e,Math.min(i.length,t))]}function Ae(i,e,t=!0,n=!0){return wh(i,e,t,n)}function Ah(i){return i>=56320&&i<57344}function Ch(i){return i>=55296&&i<56320}function Mh(i,e){let t=i.charCodeAt(e);if(!Ch(t)||e+1==i.length)return t;let n=i.charCodeAt(e+1);return Ah(n)?(t-55296<<10)+(n-56320)+65536:t}function Th(i){return i<65536?1:2}const Bs=/\r\n?|\n/;var Ie=(function(i){return i[i.Simple=0]="Simple",i[i.TrackDel=1]="TrackDel",i[i.TrackBefore=2]="TrackBefore",i[i.TrackAfter=3]="TrackAfter",i})(Ie||(Ie={}));class rt{constructor(e){this.sections=e}get length(){let e=0;for(let t=0;t<this.sections.length;t+=2)e+=this.sections[t];return e}get newLength(){let e=0;for(let t=0;t<this.sections.length;t+=2){let n=this.sections[t+1];e+=n<0?this.sections[t]:n}return e}get empty(){return this.sections.length==0||this.sections.length==2&&this.sections[1]<0}iterGaps(e){for(let t=0,n=0,s=0;t<this.sections.length;){let r=this.sections[t++],o=this.sections[t++];o<0?(e(n,s,r),s+=r):s+=o,n+=r}}iterChangedRanges(e,t=!1){Ds(this,e,t)}get invertedDesc(){let e=[];for(let t=0;t<this.sections.length;){let n=this.sections[t++],s=this.sections[t++];s<0?e.push(n,s):e.push(s,n)}return new rt(e)}composeDesc(e){return this.empty?e:e.empty?this:Ol(this,e)}mapDesc(e,t=!1){return e.empty?this:Os(this,e,t)}mapPos(e,t=-1,n=Ie.Simple){let s=0,r=0;for(let o=0;o<this.sections.length;){let l=this.sections[o++],a=this.sections[o++],h=s+l;if(a<0){if(h>e)return r+(e-s);r+=l}else{if(n!=Ie.Simple&&h>=e&&(n==Ie.TrackDel&&s<e&&h>e||n==Ie.TrackBefore&&s<e||n==Ie.TrackAfter&&h>e))return null;if(h>e||h==e&&t<0&&!l)return e==s||t<0?r:r+a;r+=a}s=h}if(e>s)throw new RangeError(`Position ${e} is out of range for changeset of length ${s}`);return r}touchesRange(e,t=e){for(let n=0,s=0;n<this.sections.length&&s<=t;){let r=this.sections[n++],o=this.sections[n++],l=s+r;if(o>=0&&s<=t&&l>=e)return s<e&&l>t?"cover":!0;s=l}return!1}toString(){let e="";for(let t=0;t<this.sections.length;){let n=this.sections[t++],s=this.sections[t++];e+=(e?" ":"")+n+(s>=0?":"+s:"")}return e}toJSON(){return this.sections}static fromJSON(e){if(!Array.isArray(e)||e.length%2||e.some(t=>typeof t!="number"))throw new RangeError("Invalid JSON representation of ChangeDesc");return new rt(e)}static create(e){return new rt(e)}}class ge extends rt{constructor(e,t){super(e),this.inserted=t}apply(e){if(this.length!=e.length)throw new RangeError("Applying change set to a document with the wrong length");return Ds(this,(t,n,s,r,o)=>e=e.replace(s,s+(n-t),o),!1),e}mapDesc(e,t=!1){return Os(this,e,t,!0)}invert(e){let t=this.sections.slice(),n=[];for(let s=0,r=0;s<t.length;s+=2){let o=t[s],l=t[s+1];if(l>=0){t[s]=l,t[s+1]=o;let a=s>>1;for(;n.length<a;)n.push(J.empty);n.push(o?e.slice(r,r+o):J.empty)}r+=o}return new ge(t,n)}compose(e){return this.empty?e:e.empty?this:Ol(this,e,!0)}map(e,t=!1){return e.empty?this:Os(this,e,t,!0)}iterChanges(e,t=!1){Ds(this,e,t)}get desc(){return rt.create(this.sections)}filter(e){let t=[],n=[],s=[],r=new zn(this);e:for(let o=0,l=0;;){let a=o==e.length?1e9:e[o++];for(;l<a||l==a&&r.len==0;){if(r.done)break e;let c=Math.min(r.len,a-l);xe(s,c,-1);let f=r.ins==-1?-1:r.off==0?r.ins:0;xe(t,c,f),f>0&&St(n,t,r.text),r.forward(c),l+=c}let h=e[o++];for(;l<h;){if(r.done)break e;let c=Math.min(r.len,h-l);xe(t,c,-1),xe(s,c,r.ins==-1?-1:r.off==0?r.ins:0),r.forward(c),l+=c}}return{changes:new ge(t,n),filtered:rt.create(s)}}toJSON(){let e=[];for(let t=0;t<this.sections.length;t+=2){let n=this.sections[t],s=this.sections[t+1];s<0?e.push(n):s==0?e.push([n]):e.push([n].concat(this.inserted[t>>1].toJSON()))}return e}static of(e,t,n){let s=[],r=[],o=0,l=null;function a(c=!1){if(!c&&!s.length)return;o<t&&xe(s,t-o,-1);let f=new ge(s,r);l=l?l.compose(f.map(l)):f,s=[],r=[],o=0}function h(c){if(Array.isArray(c))for(let f of c)h(f);else if(c instanceof ge){if(c.length!=t)throw new RangeError(`Mismatched change set length (got ${c.length}, expected ${t})`);a(),l=l?l.compose(c.map(l)):c}else{let{from:f,to:u=f,insert:d}=c;if(f>u||f<0||u>t)throw new RangeError(`Invalid change range ${f} to ${u} (in doc of length ${t})`);let p=d?typeof d=="string"?J.of(d.split(n||Bs)):d:J.empty,m=p.length;if(f==u&&m==0)return;f<o&&a(),f>o&&xe(s,f-o,-1),xe(s,u-f,m),St(r,s,p),o=u}}return h(e),a(!l),l}static empty(e){return new ge(e?[e,-1]:[],[])}static fromJSON(e){if(!Array.isArray(e))throw new RangeError("Invalid JSON representation of ChangeSet");let t=[],n=[];for(let s=0;s<e.length;s++){let r=e[s];if(typeof r=="number")t.push(r,-1);else{if(!Array.isArray(r)||typeof r[0]!="number"||r.some((o,l)=>l&&typeof o!="string"))throw new RangeError("Invalid JSON representation of ChangeSet");if(r.length==1)t.push(r[0],0);else{for(;n.length<s;)n.push(J.empty);n[s]=J.of(r.slice(1)),t.push(r[0],n[s].length)}}}return new ge(t,n)}static createSet(e,t){return new ge(e,t)}}function xe(i,e,t,n=!1){if(e==0&&t<=0)return;let s=i.length-2;s>=0&&t<=0&&t==i[s+1]?i[s]+=e:s>=0&&e==0&&i[s]==0?i[s+1]+=t:n?(i[s]+=e,i[s+1]+=t):i.push(e,t)}function St(i,e,t){if(t.length==0)return;let n=e.length-2>>1;if(n<i.length)i[i.length-1]=i[i.length-1].append(t);else{for(;i.length<n;)i.push(J.empty);i.push(t)}}function Ds(i,e,t){let n=i.inserted;for(let s=0,r=0,o=0;o<i.sections.length;){let l=i.sections[o++],a=i.sections[o++];if(a<0)s+=l,r+=l;else{let h=s,c=r,f=J.empty;for(;h+=l,c+=a,a&&n&&(f=f.append(n[o-2>>1])),!(t||o==i.sections.length||i.sections[o+1]<0);)l=i.sections[o++],a=i.sections[o++];e(s,h,r,c,f),s=h,r=c}}}function Os(i,e,t,n=!1){let s=[],r=n?[]:null,o=new zn(i),l=new zn(e);for(let a=-1;;){if(o.done&&l.len||l.done&&o.len)throw new Error("Mismatched change set lengths");if(o.ins==-1&&l.ins==-1){let h=Math.min(o.len,l.len);xe(s,h,-1),o.forward(h),l.forward(h)}else if(l.ins>=0&&(o.ins<0||a==o.i||o.off==0&&(l.len<o.len||l.len==o.len&&!t))){let h=l.len;for(xe(s,l.ins,-1);h;){let c=Math.min(o.len,h);o.ins>=0&&a<o.i&&o.len<=c&&(xe(s,0,o.ins),r&&St(r,s,o.text),a=o.i),o.forward(c),h-=c}l.next()}else if(o.ins>=0){let h=0,c=o.len;for(;c;)if(l.ins==-1){let f=Math.min(c,l.len);h+=f,c-=f,l.forward(f)}else if(l.ins==0&&l.len<c)c-=l.len,l.next();else break;xe(s,h,a<o.i?o.ins:0),r&&a<o.i&&St(r,s,o.text),a=o.i,o.forward(o.len-c)}else{if(o.done&&l.done)return r?ge.createSet(s,r):rt.create(s);throw new Error("Mismatched change set lengths")}}}function Ol(i,e,t=!1){let n=[],s=t?[]:null,r=new zn(i),o=new zn(e);for(let l=!1;;){if(r.done&&o.done)return s?ge.createSet(n,s):rt.create(n);if(r.ins==0)xe(n,r.len,0,l),r.next();else if(o.len==0&&!o.done)xe(n,0,o.ins,l),s&&St(s,n,o.text),o.next();else{if(r.done||o.done)throw new Error("Mismatched change set lengths");{let a=Math.min(r.len2,o.len),h=n.length;if(r.ins==-1){let c=o.ins==-1?-1:o.off?0:o.ins;xe(n,a,c,l),s&&c&&St(s,n,o.text)}else o.ins==-1?(xe(n,r.off?0:r.len,a,l),s&&St(s,n,r.textBit(a))):(xe(n,r.off?0:r.len,o.off?0:o.ins,l),s&&!o.off&&St(s,n,o.text));l=(r.ins>a||o.ins>=0&&o.len>a)&&(l||n.length>h),r.forward2(a),o.forward(a)}}}}class zn{constructor(e){this.set=e,this.i=0,this.next()}next(){let{sections:e}=this.set;this.i<e.length?(this.len=e[this.i++],this.ins=e[this.i++]):(this.len=0,this.ins=-2),this.off=0}get done(){return this.ins==-2}get len2(){return this.ins<0?this.len:this.ins}get text(){let{inserted:e}=this.set,t=this.i-2>>1;return t>=e.length?J.empty:e[t]}textBit(e){let{inserted:t}=this.set,n=this.i-2>>1;return n>=t.length&&!e?J.empty:t[n].slice(this.off,e==null?void 0:this.off+e)}forward(e){e==this.len?this.next():(this.len-=e,this.off+=e)}forward2(e){this.ins==-1?this.forward(e):e==this.ins?this.next():(this.ins-=e,this.off+=e)}}class _t{constructor(e,t,n){this.from=e,this.to=t,this.flags=n}get anchor(){return this.flags&32?this.to:this.from}get head(){return this.flags&32?this.from:this.to}get empty(){return this.from==this.to}get assoc(){return this.flags&8?-1:this.flags&16?1:0}get bidiLevel(){let e=this.flags&7;return e==7?null:e}get goalColumn(){let e=this.flags>>6;return e==16777215?void 0:e}map(e,t=-1){let n,s;return this.empty?n=s=e.mapPos(this.from,t):(n=e.mapPos(this.from,1),s=e.mapPos(this.to,-1)),n==this.from&&s==this.to?this:new _t(n,s,this.flags)}extend(e,t=e,n=0){if(e<=this.anchor&&t>=this.anchor)return w.range(e,t,void 0,void 0,n);let s=Math.abs(e-this.anchor)>Math.abs(t-this.anchor)?e:t;return w.range(this.anchor,s,void 0,void 0,n)}eq(e,t=!1){return this.anchor==e.anchor&&this.head==e.head&&this.goalColumn==e.goalColumn&&(!t||!this.empty||this.assoc==e.assoc)}toJSON(){return{anchor:this.anchor,head:this.head}}static fromJSON(e){if(!e||typeof e.anchor!="number"||typeof e.head!="number")throw new RangeError("Invalid JSON representation for SelectionRange");return w.range(e.anchor,e.head)}static create(e,t,n){return new _t(e,t,n)}}class w{constructor(e,t){this.ranges=e,this.mainIndex=t}map(e,t=-1){return e.empty?this:w.create(this.ranges.map(n=>n.map(e,t)),this.mainIndex)}eq(e,t=!1){if(this.ranges.length!=e.ranges.length||this.mainIndex!=e.mainIndex)return!1;for(let n=0;n<this.ranges.length;n++)if(!this.ranges[n].eq(e.ranges[n],t))return!1;return!0}get main(){return this.ranges[this.mainIndex]}asSingle(){return this.ranges.length==1?this:new w([this.main],0)}addRange(e,t=!0){return w.create([e].concat(this.ranges),t?0:this.mainIndex+1)}replaceRange(e,t=this.mainIndex){let n=this.ranges.slice();return n[t]=e,w.create(n,this.mainIndex)}toJSON(){return{ranges:this.ranges.map(e=>e.toJSON()),main:this.mainIndex}}static fromJSON(e){if(!e||!Array.isArray(e.ranges)||typeof e.main!="number"||e.main>=e.ranges.length)throw new RangeError("Invalid JSON representation for EditorSelection");return new w(e.ranges.map(t=>_t.fromJSON(t)),e.main)}static single(e,t=e){return new w([w.range(e,t)],0)}static create(e,t=0){if(e.length==0)throw new RangeError("A selection needs at least one range");for(let n=0,s=0;s<e.length;s++){let r=e[s];if(r.empty?r.from<=n:r.from<n)return w.normalized(e.slice(),t);n=r.to}return new w(e,t)}static cursor(e,t=0,n,s){return _t.create(e,e,(t==0?0:t<0?8:16)|(n==null?7:Math.min(6,n))|(s??16777215)<<6)}static range(e,t,n,s,r){let o=(n??16777215)<<6|(s==null?7:Math.min(6,s));return!r&&e!=t&&(r=t<e?1:-1),t<e?_t.create(t,e,48|o):_t.create(e,t,(r?r<0?8:16:0)|o)}static normalized(e,t=0){let n=e[t];e.sort((s,r)=>s.from-r.from),t=e.indexOf(n);for(let s=1;s<e.length;s++){let r=e[s],o=e[s-1];if(r.empty?r.from<=o.to:r.from<o.to){let l=o.from,a=Math.max(r.to,o.to);s<=t&&t--,e.splice(--s,2,r.anchor>r.head?w.range(a,l):w.range(l,a))}}return new w(e,t)}}function Pl(i,e){for(let t of i.ranges)if(t.to>e)throw new RangeError("Selection points outside of document")}let Ar=0;class L{constructor(e,t,n,s,r){this.combine=e,this.compareInput=t,this.compare=n,this.isStatic=s,this.id=Ar++,this.default=e([]),this.extensions=typeof r=="function"?r(this):r}get reader(){return this}static define(e={}){return new L(e.combine||(t=>t),e.compareInput||((t,n)=>t===n),e.compare||(e.combine?(t,n)=>t===n:Cr),!!e.static,e.enables)}of(e){return new wi([],this,0,e)}compute(e,t){if(this.isStatic)throw new Error("Can't compute a static facet");return new wi(e,this,1,t)}computeN(e,t){if(this.isStatic)throw new Error("Can't compute a static facet");return new wi(e,this,2,t)}from(e,t){return t||(t=n=>n),this.compute([e],n=>t(n.field(e)))}}function Cr(i,e){return i==e||i.length==e.length&&i.every((t,n)=>t===e[n])}class wi{constructor(e,t,n,s){this.dependencies=e,this.facet=t,this.type=n,this.value=s,this.id=Ar++}dynamicSlot(e){var t;let n=this.value,s=this.facet.compareInput,r=this.id,o=e[r]>>1,l=this.type==2,a=!1,h=!1,c=[];for(let f of this.dependencies)f=="doc"?a=!0:f=="selection"?h=!0:(((t=e[f.id])!==null&&t!==void 0?t:1)&1)==0&&c.push(e[f.id]);return{create(f){return f.values[o]=n(f),1},update(f,u){if(a&&u.docChanged||h&&(u.docChanged||u.selection)||Ps(f,c)){let d=n(f);if(l?!ro(d,f.values[o],s):!s(d,f.values[o]))return f.values[o]=d,1}return 0},reconfigure:(f,u)=>{let d,p=u.config.address[r];if(p!=null){let m=Ti(u,p);if(this.dependencies.every(g=>g instanceof L?u.facet(g)===f.facet(g):g instanceof Dt?u.field(g,!1)==f.field(g,!1):!0)||(l?ro(d=n(f),m,s):s(d=n(f),m)))return f.values[o]=m,0}else d=n(f);return f.values[o]=d,1}}}}function ro(i,e,t){if(i.length!=e.length)return!1;for(let n=0;n<i.length;n++)if(!t(i[n],e[n]))return!1;return!0}function Ps(i,e){let t=!1;for(let n of e)Rn(i,n)&1&&(t=!0);return t}function Eh(i,e,t){let n=t.map(a=>i[a.id]),s=t.map(a=>a.type),r=n.filter(a=>!(a&1)),o=i[e.id]>>1;function l(a){let h=[];for(let c=0;c<n.length;c++){let f=Ti(a,n[c]);if(s[c]==2)for(let u of f)h.push(u);else h.push(f)}return e.combine(h)}return{create(a){for(let h of n)Rn(a,h);return a.values[o]=l(a),1},update(a,h){if(!Ps(a,r))return 0;let c=l(a);return e.compare(c,a.values[o])?0:(a.values[o]=c,1)},reconfigure(a,h){let c=Ps(a,n),f=h.config.facets[e.id],u=h.facet(e);if(f&&!c&&Cr(t,f))return a.values[o]=u,0;let d=l(a);return e.compare(d,u)?(a.values[o]=u,0):(a.values[o]=d,1)}}}const ei=L.define({static:!0});class Dt{constructor(e,t,n,s,r){this.id=e,this.createF=t,this.updateF=n,this.compareF=s,this.spec=r,this.provides=void 0}static define(e){let t=new Dt(Ar++,e.create,e.update,e.compare||((n,s)=>n===s),e);return e.provide&&(t.provides=e.provide(t)),t}create(e){let t=e.facet(ei).find(n=>n.field==this);return((t==null?void 0:t.create)||this.createF)(e)}slot(e){let t=e[this.id]>>1;return{create:n=>(n.values[t]=this.create(n),1),update:(n,s)=>{let r=n.values[t],o=this.updateF(r,s);return this.compareF(r,o)?0:(n.values[t]=o,1)},reconfigure:(n,s)=>{let r=n.facet(ei),o=s.facet(ei),l;return(l=r.find(a=>a.field==this))&&l!=o.find(a=>a.field==this)?(n.values[t]=l.create(n),1):s.config.address[this.id]!=null?(n.values[t]=s.field(this),0):(n.values[t]=this.create(n),1)}}}init(e){return[this,ei.of({field:this,create:e})]}get extension(){return this}}const qt={lowest:4,low:3,default:2,high:1,highest:0};function xn(i){return e=>new Ll(e,i)}const Hi={highest:xn(qt.highest),high:xn(qt.high),default:xn(qt.default),low:xn(qt.low),lowest:xn(qt.lowest)};class Ll{constructor(e,t){this.inner=e,this.prec=t}}class Wi{of(e){return new Ls(this,e)}reconfigure(e){return Wi.reconfigure.of({compartment:this,extension:e})}get(e){return e.config.compartments.get(this)}}class Ls{constructor(e,t){this.compartment=e,this.inner=t}}class Mi{constructor(e,t,n,s,r,o){for(this.base=e,this.compartments=t,this.dynamicSlots=n,this.address=s,this.staticValues=r,this.facets=o,this.statusTemplate=[];this.statusTemplate.length<n.length;)this.statusTemplate.push(0)}staticFacet(e){let t=this.address[e.id];return t==null?e.default:this.staticValues[t>>1]}static resolve(e,t,n){let s=[],r=Object.create(null),o=new Map;for(let u of Bh(e,t,o))u instanceof Dt?s.push(u):(r[u.facet.id]||(r[u.facet.id]=[])).push(u);let l=Object.create(null),a=[],h=[];for(let u of s)l[u.id]=h.length<<1,h.push(d=>u.slot(d));let c=n==null?void 0:n.config.facets;for(let u in r){let d=r[u],p=d[0].facet,m=c&&c[u]||[];if(d.every(g=>g.type==0))if(l[p.id]=a.length<<1|1,Cr(m,d))a.push(n.facet(p));else{let g=p.combine(d.map(b=>b.value));a.push(n&&p.compare(g,n.facet(p))?n.facet(p):g)}else{for(let g of d)g.type==0?(l[g.id]=a.length<<1|1,a.push(g.value)):(l[g.id]=h.length<<1,h.push(b=>g.dynamicSlot(b)));l[p.id]=h.length<<1,h.push(g=>Eh(g,p,d))}}let f=h.map(u=>u(l));return new Mi(e,o,f,l,a,r)}}function Bh(i,e,t){let n=[[],[],[],[],[]],s=new Map;function r(o,l){let a=s.get(o);if(a!=null){if(a<=l)return;let h=n[a].indexOf(o);h>-1&&n[a].splice(h,1),o instanceof Ls&&t.delete(o.compartment)}if(s.set(o,l),Array.isArray(o))for(let h of o)r(h,l);else if(o instanceof Ls){if(t.has(o.compartment))throw new RangeError("Duplicate use of compartment in extensions");let h=e.get(o.compartment)||o.inner;t.set(o.compartment,h),r(h,l)}else if(o instanceof Ll)r(o.inner,o.prec);else if(o instanceof Dt)n[l].push(o),o.provides&&r(o.provides,l);else if(o instanceof wi)n[l].push(o),o.facet.extensions&&r(o.facet.extensions,qt.default);else{let h=o.extension;if(!h)throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);r(h,l)}}return r(i,qt.default),n.reduce((o,l)=>o.concat(l))}function Rn(i,e){if(e&1)return 2;let t=e>>1,n=i.status[t];if(n==4)throw new Error("Cyclic dependency between fields and/or facets");if(n&2)return n;i.status[t]=4;let s=i.computeSlot(i,i.config.dynamicSlots[t]);return i.status[t]=2|s}function Ti(i,e){return e&1?i.config.staticValues[e>>1]:i.values[e>>1]}const Rl=L.define(),Rs=L.define({combine:i=>i.some(e=>e),static:!0}),Il=L.define({combine:i=>i.length?i[0]:void 0,static:!0}),Nl=L.define(),ql=L.define(),_l=L.define(),zl=L.define({combine:i=>i.length?i[0]:!1});class Ot{constructor(e,t){this.type=e,this.value=t}static define(){return new Dh}}class Dh{of(e){return new Ot(this,e)}}class Oh{constructor(e){this.map=e}of(e){return new de(this,e)}}class de{constructor(e,t){this.type=e,this.value=t}map(e){let t=this.type.map(this.value,e);return t===void 0?void 0:t==this.value?this:new de(this.type,t)}is(e){return this.type==e}static define(e={}){return new Oh(e.map||(t=>t))}static mapEffects(e,t){if(!e.length)return e;let n=[];for(let s of e){let r=s.map(t);r&&n.push(r)}return n}}de.reconfigure=de.define();de.appendConfig=de.define();class be{constructor(e,t,n,s,r,o){this.startState=e,this.changes=t,this.selection=n,this.effects=s,this.annotations=r,this.scrollIntoView=o,this._doc=null,this._state=null,n&&Pl(n,t.newLength),r.some(l=>l.type==be.time)||(this.annotations=r.concat(be.time.of(Date.now())))}static create(e,t,n,s,r,o){return new be(e,t,n,s,r,o)}get newDoc(){return this._doc||(this._doc=this.changes.apply(this.startState.doc))}get newSelection(){return this.selection||this.startState.selection.map(this.changes)}get state(){return this._state||this.startState.applyTransaction(this),this._state}annotation(e){for(let t of this.annotations)if(t.type==e)return t.value}get docChanged(){return!this.changes.empty}get reconfigured(){return this.startState.config!=this.state.config}isUserEvent(e){let t=this.annotation(be.userEvent);return!!(t&&(t==e||t.length>e.length&&t.slice(0,e.length)==e&&t[e.length]=="."))}}be.time=Ot.define();be.userEvent=Ot.define();be.addToHistory=Ot.define();be.remote=Ot.define();function Ph(i,e){let t=[];for(let n=0,s=0;;){let r,o;if(n<i.length&&(s==e.length||e[s]>=i[n]))r=i[n++],o=i[n++];else if(s<e.length)r=e[s++],o=e[s++];else return t;!t.length||t[t.length-1]<r?t.push(r,o):t[t.length-1]<o&&(t[t.length-1]=o)}}function Fl(i,e,t){var n;let s,r,o;return t?(s=e.changes,r=ge.empty(e.changes.length),o=i.changes.compose(e.changes)):(s=e.changes.map(i.changes),r=i.changes.mapDesc(e.changes,!0),o=i.changes.compose(s)),{changes:o,selection:e.selection?e.selection.map(r):(n=i.selection)===null||n===void 0?void 0:n.map(s),effects:de.mapEffects(i.effects,s).concat(de.mapEffects(e.effects,r)),annotations:i.annotations.length?i.annotations.concat(e.annotations):e.annotations,scrollIntoView:i.scrollIntoView||e.scrollIntoView}}function Is(i,e,t){let n=e.selection,s=ln(e.annotations);return e.userEvent&&(s=s.concat(be.userEvent.of(e.userEvent))),{changes:e.changes instanceof ge?e.changes:ge.of(e.changes||[],t,i.facet(Il)),selection:n&&(n instanceof w?n:w.single(n.anchor,n.head)),effects:ln(e.effects),annotations:s,scrollIntoView:!!e.scrollIntoView}}function Hl(i,e,t){let n=Is(i,e.length?e[0]:{},i.doc.length);e.length&&e[0].filter===!1&&(t=!1);for(let r=1;r<e.length;r++){e[r].filter===!1&&(t=!1);let o=!!e[r].sequential;n=Fl(n,Is(i,e[r],o?n.changes.newLength:i.doc.length),o)}let s=be.create(i,n.changes,n.selection,n.effects,n.annotations,n.scrollIntoView);return Rh(t?Lh(s):s)}function Lh(i){let e=i.startState,t=!0;for(let s of e.facet(Nl)){let r=s(i);if(r===!1){t=!1;break}Array.isArray(r)&&(t=t===!0?r:Ph(t,r))}if(t!==!0){let s,r;if(t===!1)r=i.changes.invertedDesc,s=ge.empty(e.doc.length);else{let o=i.changes.filter(t);s=o.changes,r=o.filtered.mapDesc(o.changes).invertedDesc}i=be.create(e,s,i.selection&&i.selection.map(r),de.mapEffects(i.effects,r),i.annotations,i.scrollIntoView)}let n=e.facet(ql);for(let s=n.length-1;s>=0;s--){let r=n[s](i);r instanceof be?i=r:Array.isArray(r)&&r.length==1&&r[0]instanceof be?i=r[0]:i=Hl(e,ln(r),!1)}return i}function Rh(i){let e=i.startState,t=e.facet(_l),n=i;for(let s=t.length-1;s>=0;s--){let r=t[s](i);r&&Object.keys(r).length&&(n=Fl(n,Is(e,r,i.changes.newLength),!0))}return n==i?i:be.create(e,i.changes,i.selection,n.effects,n.annotations,n.scrollIntoView)}const Ih=[];function ln(i){return i==null?Ih:Array.isArray(i)?i:[i]}var ut=(function(i){return i[i.Word=0]="Word",i[i.Space=1]="Space",i[i.Other=2]="Other",i})(ut||(ut={}));const Nh=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;let Ns;try{Ns=new RegExp("[\\p{Alphabetic}\\p{Number}_]","u")}catch{}function qh(i){if(Ns)return Ns.test(i);for(let e=0;e<i.length;e++){let t=i[e];if(/\w/.test(t)||t>""&&(t.toUpperCase()!=t.toLowerCase()||Nh.test(t)))return!0}return!1}function _h(i){return e=>{if(!/\S/.test(e))return ut.Space;if(qh(e))return ut.Word;for(let t=0;t<i.length;t++)if(e.indexOf(i[t])>-1)return ut.Word;return ut.Other}}class Z{constructor(e,t,n,s,r,o){this.config=e,this.doc=t,this.selection=n,this.values=s,this.status=e.statusTemplate.slice(),this.computeSlot=r,o&&(o._state=this);for(let l=0;l<this.config.dynamicSlots.length;l++)Rn(this,l<<1);this.computeSlot=null}field(e,t=!0){let n=this.config.address[e.id];if(n==null){if(t)throw new RangeError("Field is not present in this state");return}return Rn(this,n),Ti(this,n)}update(...e){return Hl(this,e,!0)}applyTransaction(e){let t=this.config,{base:n,compartments:s}=t;for(let l of e.effects)l.is(Wi.reconfigure)?(t&&(s=new Map,t.compartments.forEach((a,h)=>s.set(h,a)),t=null),s.set(l.value.compartment,l.value.extension)):l.is(de.reconfigure)?(t=null,n=l.value):l.is(de.appendConfig)&&(t=null,n=ln(n).concat(l.value));let r;t?r=e.startState.values.slice():(t=Mi.resolve(n,s,this),r=new Z(t,this.doc,this.selection,t.dynamicSlots.map(()=>null),(a,h)=>h.reconfigure(a,this),null).values);let o=e.startState.facet(Rs)?e.newSelection:e.newSelection.asSingle();new Z(t,e.newDoc,o,r,(l,a)=>a.update(l,e),e)}replaceSelection(e){return typeof e=="string"&&(e=this.toText(e)),this.changeByRange(t=>({changes:{from:t.from,to:t.to,insert:e},range:w.cursor(t.from+e.length)}))}changeByRange(e){let t=this.selection,n=e(t.ranges[0]),s=this.changes(n.changes),r=[n.range],o=ln(n.effects);for(let l=1;l<t.ranges.length;l++){let a=e(t.ranges[l]),h=this.changes(a.changes),c=h.map(s);for(let u=0;u<l;u++)r[u]=r[u].map(c);let f=s.mapDesc(h,!0);r.push(a.range.map(f)),s=s.compose(c),o=de.mapEffects(o,c).concat(de.mapEffects(ln(a.effects),f))}return{changes:s,selection:w.create(r,t.mainIndex),effects:o}}changes(e=[]){return e instanceof ge?e:ge.of(e,this.doc.length,this.facet(Z.lineSeparator))}toText(e){return J.of(e.split(this.facet(Z.lineSeparator)||Bs))}sliceDoc(e=0,t=this.doc.length){return this.doc.sliceString(e,t,this.lineBreak)}facet(e){let t=this.config.address[e.id];return t==null?e.default:(Rn(this,t),Ti(this,t))}toJSON(e){let t={doc:this.sliceDoc(),selection:this.selection.toJSON()};if(e)for(let n in e){let s=e[n];s instanceof Dt&&this.config.address[s.id]!=null&&(t[n]=s.spec.toJSON(this.field(e[n]),this))}return t}static fromJSON(e,t={},n){if(!e||typeof e.doc!="string")throw new RangeError("Invalid JSON representation for EditorState");let s=[];if(n){for(let r in n)if(Object.prototype.hasOwnProperty.call(e,r)){let o=n[r],l=e[r];s.push(o.init(a=>o.spec.fromJSON(l,a)))}}return Z.create({doc:e.doc,selection:w.fromJSON(e.selection),extensions:t.extensions?s.concat([t.extensions]):s})}static create(e={}){let t=Mi.resolve(e.extensions||[],new Map),n=e.doc instanceof J?e.doc:J.of((e.doc||"").split(t.staticFacet(Z.lineSeparator)||Bs)),s=e.selection?e.selection instanceof w?e.selection:w.single(e.selection.anchor,e.selection.head):w.single(0);return Pl(s,n.length),t.staticFacet(Rs)||(s=s.asSingle()),new Z(t,n,s,t.dynamicSlots.map(()=>null),(r,o)=>o.create(r),null)}get tabSize(){return this.facet(Z.tabSize)}get lineBreak(){return this.facet(Z.lineSeparator)||`
`}get readOnly(){return this.facet(zl)}phrase(e,...t){for(let n of this.facet(Z.phrases))if(Object.prototype.hasOwnProperty.call(n,e)){e=n[e];break}return t.length&&(e=e.replace(/\$(\$|\d*)/g,(n,s)=>{if(s=="$")return"$";let r=+(s||1);return!r||r>t.length?n:t[r-1]})),e}languageDataAt(e,t,n=-1){let s=[];for(let r of this.facet(Rl))for(let o of r(this,t,n))Object.prototype.hasOwnProperty.call(o,e)&&s.push(o[e]);return s}charCategorizer(e){let t=this.languageDataAt("wordChars",e);return _h(t.length?t[0]:"")}wordAt(e){let{text:t,from:n,length:s}=this.doc.lineAt(e),r=this.charCategorizer(e),o=e-n,l=e-n;for(;o>0;){let a=Ae(t,o,!1);if(r(t.slice(a,o))!=ut.Word)break;o=a}for(;l<s;){let a=Ae(t,l);if(r(t.slice(l,a))!=ut.Word)break;l=a}return o==l?null:w.range(o+n,l+n)}}Z.allowMultipleSelections=Rs;Z.tabSize=L.define({combine:i=>i.length?i[0]:4});Z.lineSeparator=Il;Z.readOnly=zl;Z.phrases=L.define({compare(i,e){let t=Object.keys(i),n=Object.keys(e);return t.length==n.length&&t.every(s=>i[s]==e[s])}});Z.languageData=Rl;Z.changeFilter=Nl;Z.transactionFilter=ql;Z.transactionExtender=_l;Wi.reconfigure=de.define();function Mr(i,e,t={}){let n={};for(let s of i)for(let r of Object.keys(s)){let o=s[r],l=n[r];if(l===void 0)n[r]=o;else if(!(l===o||o===void 0))if(Object.hasOwnProperty.call(t,r))n[r]=t[r](l,o);else throw new Error("Config merge conflict for field "+r)}for(let s in e)n[s]===void 0&&(n[s]=e[s]);return n}class Vt{eq(e){return this==e}range(e,t=e){return qs.create(e,t,this)}}Vt.prototype.startSide=Vt.prototype.endSide=0;Vt.prototype.point=!1;Vt.prototype.mapMode=Ie.TrackDel;function Tr(i,e){return i==e||i.constructor==e.constructor&&i.eq(e)}let qs=class Wl{constructor(e,t,n){this.from=e,this.to=t,this.value=n}static create(e,t,n){return new Wl(e,t,n)}};function _s(i,e){return i.from-e.from||i.value.startSide-e.value.startSide}class Er{constructor(e,t,n,s){this.from=e,this.to=t,this.value=n,this.maxPoint=s}get length(){return this.to[this.to.length-1]}findIndex(e,t,n,s=0){let r=n?this.to:this.from;for(let o=s,l=r.length;;){if(o==l)return o;let a=o+l>>1,h=r[a]-e||(n?this.value[a].endSide:this.value[a].startSide)-t;if(a==o)return h>=0?o:l;h>=0?l=a:o=a+1}}between(e,t,n,s){for(let r=this.findIndex(t,-1e9,!0),o=this.findIndex(n,1e9,!1,r);r<o;r++)if(s(this.from[r]+e,this.to[r]+e,this.value[r])===!1)return!1}map(e,t){let n=[],s=[],r=[],o=-1,l=-1;for(let a=0;a<this.value.length;a++){let h=this.value[a],c=this.from[a]+e,f=this.to[a]+e,u,d;if(c==f){let p=t.mapPos(c,h.startSide,h.mapMode);if(p==null||(u=d=p,h.startSide!=h.endSide&&(d=t.mapPos(c,h.endSide),d<u)))continue}else if(u=t.mapPos(c,h.startSide),d=t.mapPos(f,h.endSide),u>d||u==d&&h.startSide>0&&h.endSide<=0)continue;(d-u||h.endSide-h.startSide)<0||(o<0&&(o=u),h.point&&(l=Math.max(l,d-u)),n.push(h),s.push(u-o),r.push(d-o))}return{mapped:n.length?new Er(s,r,n,l):null,pos:o}}}class X{constructor(e,t,n,s){this.chunkPos=e,this.chunk=t,this.nextLayer=n,this.maxPoint=s}static create(e,t,n,s){return new X(e,t,n,s)}get length(){let e=this.chunk.length-1;return e<0?0:Math.max(this.chunkEnd(e),this.nextLayer.length)}get size(){if(this.isEmpty)return 0;let e=this.nextLayer.size;for(let t of this.chunk)e+=t.value.length;return e}chunkEnd(e){return this.chunkPos[e]+this.chunk[e].length}update(e){let{add:t=[],sort:n=!1,filterFrom:s=0,filterTo:r=this.length}=e,o=e.filter;if(t.length==0&&!o)return this;if(n&&(t=t.slice().sort(_s)),this.isEmpty)return t.length?X.of(t):this;let l=new Vl(this,null,-1).goto(0),a=0,h=[],c=new Fn;for(;l.value||a<t.length;)if(a<t.length&&(l.from-t[a].from||l.startSide-t[a].value.startSide)>=0){let f=t[a++];c.addInner(f.from,f.to,f.value)||h.push(f)}else l.rangeIndex==1&&l.chunkIndex<this.chunk.length&&(a==t.length||this.chunkEnd(l.chunkIndex)<t[a].from)&&(!o||s>this.chunkEnd(l.chunkIndex)||r<this.chunkPos[l.chunkIndex])&&c.addChunk(this.chunkPos[l.chunkIndex],this.chunk[l.chunkIndex])?l.nextChunk():((!o||s>l.to||r<l.from||o(l.from,l.to,l.value))&&(c.addInner(l.from,l.to,l.value)||h.push(qs.create(l.from,l.to,l.value))),l.next());return c.finishInner(this.nextLayer.isEmpty&&!h.length?X.empty:this.nextLayer.update({add:h,filter:o,filterFrom:s,filterTo:r}))}map(e){if(e.empty||this.isEmpty)return this;let t=[],n=[],s=-1;for(let o=0;o<this.chunk.length;o++){let l=this.chunkPos[o],a=this.chunk[o],h=e.touchesRange(l,l+a.length);if(h===!1)s=Math.max(s,a.maxPoint),t.push(a),n.push(e.mapPos(l));else if(h===!0){let{mapped:c,pos:f}=a.map(l,e);c&&(s=Math.max(s,c.maxPoint),t.push(c),n.push(f))}}let r=this.nextLayer.map(e);return t.length==0?r:new X(n,t,r||X.empty,s)}between(e,t,n){if(!this.isEmpty){for(let s=0;s<this.chunk.length;s++){let r=this.chunkPos[s],o=this.chunk[s];if(t>=r&&e<=r+o.length&&o.between(r,e-r,t-r,n)===!1)return}this.nextLayer.between(e,t,n)}}iter(e=0){return Hn.from([this]).goto(e)}get isEmpty(){return this.nextLayer==this}static iter(e,t=0){return Hn.from(e).goto(t)}static compare(e,t,n,s,r=-1){let o=e.filter(f=>f.maxPoint>0||!f.isEmpty&&f.maxPoint>=r),l=t.filter(f=>f.maxPoint>0||!f.isEmpty&&f.maxPoint>=r),a=oo(o,l,n),h=new Sn(o,a,r),c=new Sn(l,a,r);n.iterGaps((f,u,d)=>lo(h,f,c,u,d,s)),n.empty&&n.length==0&&lo(h,0,c,0,0,s)}static eq(e,t,n=0,s){s==null&&(s=999999999);let r=e.filter(c=>!c.isEmpty&&t.indexOf(c)<0),o=t.filter(c=>!c.isEmpty&&e.indexOf(c)<0);if(r.length!=o.length)return!1;if(!r.length)return!0;let l=oo(r,o),a=new Sn(r,l,0).goto(n),h=new Sn(o,l,0).goto(n);for(;;){if(a.to!=h.to||!zs(a.active,h.active)||a.point&&(!h.point||!Tr(a.point,h.point)))return!1;if(a.to>s)return!0;a.next(),h.next()}}static spans(e,t,n,s,r=-1){let o=new Sn(e,null,r).goto(t),l=t,a=o.openStart;for(;;){let h=Math.min(o.to,n);if(o.point){let c=o.activeForPoint(o.to),f=o.pointFrom<t?c.length+1:o.point.startSide<0?c.length:Math.min(c.length,a);s.point(l,h,o.point,c,f,o.pointRank),a=Math.min(o.openEnd(h),c.length)}else h>l&&(s.span(l,h,o.active,a),a=o.openEnd(h));if(o.to>n)return a+(o.point&&o.to>n?1:0);l=o.to,o.next()}}static of(e,t=!1){let n=new Fn;for(let s of e instanceof qs?[e]:t?zh(e):e)n.add(s.from,s.to,s.value);return n.finish()}static join(e){if(!e.length)return X.empty;let t=e[e.length-1];for(let n=e.length-2;n>=0;n--)for(let s=e[n];s!=X.empty;s=s.nextLayer)t=new X(s.chunkPos,s.chunk,t,Math.max(s.maxPoint,t.maxPoint));return t}}X.empty=new X([],[],null,-1);function zh(i){if(i.length>1)for(let e=i[0],t=1;t<i.length;t++){let n=i[t];if(_s(e,n)>0)return i.slice().sort(_s);e=n}return i}X.empty.nextLayer=X.empty;class Fn{finishChunk(e){this.chunks.push(new Er(this.from,this.to,this.value,this.maxPoint)),this.chunkPos.push(this.chunkStart),this.chunkStart=-1,this.setMaxPoint=Math.max(this.setMaxPoint,this.maxPoint),this.maxPoint=-1,e&&(this.from=[],this.to=[],this.value=[])}constructor(){this.chunks=[],this.chunkPos=[],this.chunkStart=-1,this.last=null,this.lastFrom=-1e9,this.lastTo=-1e9,this.from=[],this.to=[],this.value=[],this.maxPoint=-1,this.setMaxPoint=-1,this.nextLayer=null}add(e,t,n){this.addInner(e,t,n)||(this.nextLayer||(this.nextLayer=new Fn)).add(e,t,n)}addInner(e,t,n){let s=e-this.lastTo||n.startSide-this.last.endSide;if(s<=0&&(e-this.lastFrom||n.startSide-this.last.startSide)<0)throw new Error("Ranges must be added sorted by `from` position and `startSide`");return s<0?!1:(this.from.length==250&&this.finishChunk(!0),this.chunkStart<0&&(this.chunkStart=e),this.from.push(e-this.chunkStart),this.to.push(t-this.chunkStart),this.last=n,this.lastFrom=e,this.lastTo=t,this.value.push(n),n.point&&(this.maxPoint=Math.max(this.maxPoint,t-e)),!0)}addChunk(e,t){if((e-this.lastTo||t.value[0].startSide-this.last.endSide)<0)return!1;this.from.length&&this.finishChunk(!0),this.setMaxPoint=Math.max(this.setMaxPoint,t.maxPoint),this.chunks.push(t),this.chunkPos.push(e);let n=t.value.length-1;return this.last=t.value[n],this.lastFrom=t.from[n]+e,this.lastTo=t.to[n]+e,!0}finish(){return this.finishInner(X.empty)}finishInner(e){if(this.from.length&&this.finishChunk(!1),this.chunks.length==0)return e;let t=X.create(this.chunkPos,this.chunks,this.nextLayer?this.nextLayer.finishInner(e):e,this.setMaxPoint);return this.from=null,t}}function oo(i,e,t){let n=new Map;for(let r of i)for(let o=0;o<r.chunk.length;o++)r.chunk[o].maxPoint<=0&&n.set(r.chunk[o],r.chunkPos[o]);let s=new Set;for(let r of e)for(let o=0;o<r.chunk.length;o++){let l=n.get(r.chunk[o]);l!=null&&(t?t.mapPos(l):l)==r.chunkPos[o]&&!(t!=null&&t.touchesRange(l,l+r.chunk[o].length))&&s.add(r.chunk[o])}return s}class Vl{constructor(e,t,n,s=0){this.layer=e,this.skip=t,this.minPoint=n,this.rank=s}get startSide(){return this.value?this.value.startSide:0}get endSide(){return this.value?this.value.endSide:0}goto(e,t=-1e9){return this.chunkIndex=this.rangeIndex=0,this.gotoInner(e,t,!1),this}gotoInner(e,t,n){for(;this.chunkIndex<this.layer.chunk.length;){let s=this.layer.chunk[this.chunkIndex];if(!(this.skip&&this.skip.has(s)||this.layer.chunkEnd(this.chunkIndex)<e||s.maxPoint<this.minPoint))break;this.chunkIndex++,n=!1}if(this.chunkIndex<this.layer.chunk.length){let s=this.layer.chunk[this.chunkIndex].findIndex(e-this.layer.chunkPos[this.chunkIndex],t,!0);(!n||this.rangeIndex<s)&&this.setRangeIndex(s)}this.next()}forward(e,t){(this.to-e||this.endSide-t)<0&&this.gotoInner(e,t,!0)}next(){for(;;)if(this.chunkIndex==this.layer.chunk.length){this.from=this.to=1e9,this.value=null;break}else{let e=this.layer.chunkPos[this.chunkIndex],t=this.layer.chunk[this.chunkIndex],n=e+t.from[this.rangeIndex];if(this.from=n,this.to=e+t.to[this.rangeIndex],this.value=t.value[this.rangeIndex],this.setRangeIndex(this.rangeIndex+1),this.minPoint<0||this.value.point&&this.to-this.from>=this.minPoint)break}}setRangeIndex(e){if(e==this.layer.chunk[this.chunkIndex].value.length){if(this.chunkIndex++,this.skip)for(;this.chunkIndex<this.layer.chunk.length&&this.skip.has(this.layer.chunk[this.chunkIndex]);)this.chunkIndex++;this.rangeIndex=0}else this.rangeIndex=e}nextChunk(){this.chunkIndex++,this.rangeIndex=0,this.next()}compare(e){return this.from-e.from||this.startSide-e.startSide||this.rank-e.rank||this.to-e.to||this.endSide-e.endSide}}class Hn{constructor(e){this.heap=e}static from(e,t=null,n=-1){let s=[];for(let r=0;r<e.length;r++)for(let o=e[r];!o.isEmpty;o=o.nextLayer)o.maxPoint>=n&&s.push(new Vl(o,t,n,r));return s.length==1?s[0]:new Hn(s)}get startSide(){return this.value?this.value.startSide:0}goto(e,t=-1e9){for(let n of this.heap)n.goto(e,t);for(let n=this.heap.length>>1;n>=0;n--)rs(this.heap,n);return this.next(),this}forward(e,t){for(let n of this.heap)n.forward(e,t);for(let n=this.heap.length>>1;n>=0;n--)rs(this.heap,n);(this.to-e||this.value.endSide-t)<0&&this.next()}next(){if(this.heap.length==0)this.from=this.to=1e9,this.value=null,this.rank=-1;else{let e=this.heap[0];this.from=e.from,this.to=e.to,this.value=e.value,this.rank=e.rank,e.value&&e.next(),rs(this.heap,0)}}}function rs(i,e){for(let t=i[e];;){let n=(e<<1)+1;if(n>=i.length)break;let s=i[n];if(n+1<i.length&&s.compare(i[n+1])>=0&&(s=i[n+1],n++),t.compare(s)<0)break;i[n]=t,i[e]=s,e=n}}class Sn{constructor(e,t,n){this.minPoint=n,this.active=[],this.activeTo=[],this.activeRank=[],this.minActive=-1,this.point=null,this.pointFrom=0,this.pointRank=0,this.to=-1e9,this.endSide=0,this.openStart=-1,this.cursor=Hn.from(e,t,n)}goto(e,t=-1e9){return this.cursor.goto(e,t),this.active.length=this.activeTo.length=this.activeRank.length=0,this.minActive=-1,this.to=e,this.endSide=t,this.openStart=-1,this.next(),this}forward(e,t){for(;this.minActive>-1&&(this.activeTo[this.minActive]-e||this.active[this.minActive].endSide-t)<0;)this.removeActive(this.minActive);this.cursor.forward(e,t)}removeActive(e){ti(this.active,e),ti(this.activeTo,e),ti(this.activeRank,e),this.minActive=ao(this.active,this.activeTo)}addActive(e){let t=0,{value:n,to:s,rank:r}=this.cursor;for(;t<this.activeRank.length&&(r-this.activeRank[t]||s-this.activeTo[t])>0;)t++;ni(this.active,t,n),ni(this.activeTo,t,s),ni(this.activeRank,t,r),e&&ni(e,t,this.cursor.from),this.minActive=ao(this.active,this.activeTo)}next(){let e=this.to,t=this.point;this.point=null;let n=this.openStart<0?[]:null;for(;;){let s=this.minActive;if(s>-1&&(this.activeTo[s]-this.cursor.from||this.active[s].endSide-this.cursor.startSide)<0){if(this.activeTo[s]>e){this.to=this.activeTo[s],this.endSide=this.active[s].endSide;break}this.removeActive(s),n&&ti(n,s)}else if(this.cursor.value)if(this.cursor.from>e){this.to=this.cursor.from,this.endSide=this.cursor.startSide;break}else{let r=this.cursor.value;if(!r.point)this.addActive(n),this.cursor.next();else if(t&&this.cursor.to==this.to&&this.cursor.from<this.cursor.to)this.cursor.next();else{this.point=r,this.pointFrom=this.cursor.from,this.pointRank=this.cursor.rank,this.to=this.cursor.to,this.endSide=r.endSide,this.cursor.next(),this.forward(this.to,this.endSide);break}}else{this.to=this.endSide=1e9;break}}if(n){this.openStart=0;for(let s=n.length-1;s>=0&&n[s]<e;s--)this.openStart++}}activeForPoint(e){if(!this.active.length)return this.active;let t=[];for(let n=this.active.length-1;n>=0&&!(this.activeRank[n]<this.pointRank);n--)(this.activeTo[n]>e||this.activeTo[n]==e&&this.active[n].endSide>=this.point.endSide)&&t.push(this.active[n]);return t.reverse()}openEnd(e){let t=0;for(let n=this.activeTo.length-1;n>=0&&this.activeTo[n]>e;n--)t++;return t}}function lo(i,e,t,n,s,r){i.goto(e),t.goto(n);let o=n+s,l=n,a=n-e,h=!!r.boundChange;for(let c=!1;;){let f=i.to+a-t.to,u=f||i.endSide-t.endSide,d=u<0?i.to+a:t.to,p=Math.min(d,o);if(i.point||t.point?(i.point&&t.point&&Tr(i.point,t.point)&&zs(i.activeForPoint(i.to),t.activeForPoint(t.to))||r.comparePoint(l,p,i.point,t.point),c=!1):(c&&r.boundChange(l),p>l&&!zs(i.active,t.active)&&r.compareRange(l,p,i.active,t.active),h&&p<o&&(f||i.openEnd(d)!=t.openEnd(d))&&(c=!0)),d>o)break;l=d,u<=0&&i.next(),u>=0&&t.next()}}function zs(i,e){if(i.length!=e.length)return!1;for(let t=0;t<i.length;t++)if(i[t]!=e[t]&&!Tr(i[t],e[t]))return!1;return!0}function ti(i,e){for(let t=e,n=i.length-1;t<n;t++)i[t]=i[t+1];i.pop()}function ni(i,e,t){for(let n=i.length-1;n>=e;n--)i[n+1]=i[n];i[e]=t}function ao(i,e){let t=-1,n=1e9;for(let s=0;s<e.length;s++)(e[s]-n||i[s].endSide-i[t].endSide)<0&&(t=s,n=e[s]);return t}function Vi(i,e,t=i.length){let n=0;for(let s=0;s<t&&s<i.length;)i.charCodeAt(s)==9?(n+=e-n%e,s++):(n++,s=Ae(i,s));return n}function Fh(i,e,t,n){for(let s=0,r=0;;){if(r>=e)return s;if(s==i.length)break;r+=i.charCodeAt(s)==9?t-r%t:1,s=Ae(i,s)}return i.length}const Fs="ͼ",ho=typeof Symbol>"u"?"__"+Fs:Symbol.for(Fs),Hs=typeof Symbol>"u"?"__styleSet"+Math.floor(Math.random()*1e8):Symbol("styleSet"),co=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{};class Ct{constructor(e,t){this.rules=[];let{finish:n}=t||{};function s(o){return/^@/.test(o)?[o]:o.split(/,\s*/)}function r(o,l,a,h){let c=[],f=/^@(\w+)\b/.exec(o[0]),u=f&&f[1]=="keyframes";if(f&&l==null)return a.push(o[0]+";");for(let d in l){let p=l[d];if(/&/.test(d))r(d.split(/,\s*/).map(m=>o.map(g=>m.replace(/&/,g))).reduce((m,g)=>m.concat(g)),p,a);else if(p&&typeof p=="object"){if(!f)throw new RangeError("The value of a property ("+d+") should be a primitive value.");r(s(d),p,c,u)}else p!=null&&c.push(d.replace(/_.*/,"").replace(/[A-Z]/g,m=>"-"+m.toLowerCase())+": "+p+";")}(c.length||u)&&a.push((n&&!f&&!h?o.map(n):o).join(", ")+" {"+c.join(" ")+"}")}for(let o in e)r(s(o),e[o],this.rules)}getRules(){return this.rules.join(`
`)}static newName(){let e=co[ho]||1;return co[ho]=e+1,Fs+e.toString(36)}static mount(e,t,n){let s=e[Hs],r=n&&n.nonce;s?r&&s.setNonce(r):s=new Hh(e,r),s.mount(Array.isArray(t)?t:[t],e)}}let fo=new Map;class Hh{constructor(e,t){let n=e.ownerDocument||e,s=n.defaultView;if(!e.head&&e.adoptedStyleSheets&&s.CSSStyleSheet){let r=fo.get(n);if(r)return e[Hs]=r;this.sheet=new s.CSSStyleSheet,fo.set(n,this)}else this.styleTag=n.createElement("style"),t&&this.styleTag.setAttribute("nonce",t);this.modules=[],e[Hs]=this}mount(e,t){let n=this.sheet,s=0,r=0;for(let o=0;o<e.length;o++){let l=e[o],a=this.modules.indexOf(l);if(a<r&&a>-1&&(this.modules.splice(a,1),r--,a=-1),a==-1){if(this.modules.splice(r++,0,l),n)for(let h=0;h<l.rules.length;h++)n.insertRule(l.rules[h],s++)}else{for(;r<a;)s+=this.modules[r++].rules.length;s+=l.rules.length,r++}}if(n)t.adoptedStyleSheets.indexOf(this.sheet)<0&&(t.adoptedStyleSheets=[this.sheet,...t.adoptedStyleSheets]);else{let o="";for(let a=0;a<this.modules.length;a++)o+=this.modules[a].getRules()+`
`;this.styleTag.textContent=o;let l=t.head||t;this.styleTag.parentNode!=l&&l.insertBefore(this.styleTag,l.firstChild)}}setNonce(e){this.styleTag&&this.styleTag.getAttribute("nonce")!=e&&this.styleTag.setAttribute("nonce",e)}}var Mt={8:"Backspace",9:"Tab",10:"Enter",12:"NumLock",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",44:"PrintScreen",45:"Insert",46:"Delete",59:";",61:"=",91:"Meta",92:"Meta",106:"*",107:"+",108:",",109:"-",110:".",111:"/",144:"NumLock",145:"ScrollLock",160:"Shift",161:"Shift",162:"Control",163:"Control",164:"Alt",165:"Alt",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},Wn={48:")",49:"!",50:"@",51:"#",52:"$",53:"%",54:"^",55:"&",56:"*",57:"(",59:":",61:"+",173:"_",186:":",187:"+",188:"<",189:"_",190:">",191:"?",192:"~",219:"{",220:"|",221:"}",222:'"'},Wh=typeof navigator<"u"&&/Mac/.test(navigator.platform),Vh=typeof navigator<"u"&&/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);for(var we=0;we<10;we++)Mt[48+we]=Mt[96+we]=String(we);for(var we=1;we<=24;we++)Mt[we+111]="F"+we;for(var we=65;we<=90;we++)Mt[we]=String.fromCharCode(we+32),Wn[we]=String.fromCharCode(we);for(var os in Mt)Wn.hasOwnProperty(os)||(Wn[os]=Mt[os]);function $h(i){var e=Wh&&i.metaKey&&i.shiftKey&&!i.ctrlKey&&!i.altKey||Vh&&i.shiftKey&&i.key&&i.key.length==1||i.key=="Unidentified",t=!e&&i.key||(i.shiftKey?Wn:Mt)[i.keyCode]||i.key||"Unidentified";return t=="Esc"&&(t="Escape"),t=="Del"&&(t="Delete"),t=="Left"&&(t="ArrowLeft"),t=="Up"&&(t="ArrowUp"),t=="Right"&&(t="ArrowRight"),t=="Down"&&(t="ArrowDown"),t}let Me=typeof navigator<"u"?navigator:{userAgent:"",vendor:"",platform:""},Ws=typeof document<"u"?document:{documentElement:{style:{}}};const Vs=/Edge\/(\d+)/.exec(Me.userAgent),$l=/MSIE \d/.test(Me.userAgent),$s=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Me.userAgent),$i=!!($l||$s||Vs),uo=!$i&&/gecko\/(\d+)/i.test(Me.userAgent),ls=!$i&&/Chrome\/(\d+)/.exec(Me.userAgent),Uh="webkitFontSmoothing"in Ws.documentElement.style,Us=!$i&&/Apple Computer/.test(Me.vendor),po=Us&&(/Mobile\/\w+/.test(Me.userAgent)||Me.maxTouchPoints>2);var B={mac:po||/Mac/.test(Me.platform),windows:/Win/.test(Me.platform),linux:/Linux|X11/.test(Me.platform),ie:$i,ie_version:$l?Ws.documentMode||6:$s?+$s[1]:Vs?+Vs[1]:0,gecko:uo,gecko_version:uo?+(/Firefox\/(\d+)/.exec(Me.userAgent)||[0,0])[1]:0,chrome:!!ls,chrome_version:ls?+ls[1]:0,ios:po,android:/Android\b/.test(Me.userAgent),webkit_version:Uh?+(/\bAppleWebKit\/(\d+)/.exec(Me.userAgent)||[0,0])[1]:0,safari:Us,safari_version:Us?+(/\bVersion\/(\d+(\.\d+)?)/.exec(Me.userAgent)||[0,0])[1]:0,tabSize:Ws.documentElement.style.tabSize!=null?"tab-size":"-moz-tab-size"};function Br(i,e){for(let t in i)t=="class"&&e.class?e.class+=" "+i.class:t=="style"&&e.style?e.style+=";"+i.style:e[t]=i[t];return e}const Ei=Object.create(null);function Dr(i,e,t){if(i==e)return!0;i||(i=Ei),e||(e=Ei);let n=Object.keys(i),s=Object.keys(e);if(n.length-0!=s.length-0)return!1;for(let r of n)if(r!=t&&(s.indexOf(r)==-1||i[r]!==e[r]))return!1;return!0}function Kh(i,e){for(let t=i.attributes.length-1;t>=0;t--){let n=i.attributes[t].name;e[n]==null&&i.removeAttribute(n)}for(let t in e){let n=e[t];t=="style"?i.style.cssText=n:i.getAttribute(t)!=n&&i.setAttribute(t,n)}}function mo(i,e,t){let n=!1;if(e)for(let s in e)t&&s in t||(n=!0,s=="style"?i.style.cssText="":i.removeAttribute(s));if(t)for(let s in t)e&&e[s]==t[s]||(n=!0,s=="style"?i.style.cssText=t[s]:i.setAttribute(s,t[s]));return n}function jh(i){let e=Object.create(null);for(let t=0;t<i.attributes.length;t++){let n=i.attributes[t];e[n.name]=n.value}return e}class Ui{eq(e){return!1}updateDOM(e,t,n){return!1}compare(e){return this==e||this.constructor==e.constructor&&this.eq(e)}get estimatedHeight(){return-1}get lineBreaks(){return 0}ignoreEvent(e){return!0}coordsAt(e,t,n){return null}get isHidden(){return!1}get editable(){return!1}destroy(e){}}var ke=(function(i){return i[i.Text=0]="Text",i[i.WidgetBefore=1]="WidgetBefore",i[i.WidgetAfter=2]="WidgetAfter",i[i.WidgetRange=3]="WidgetRange",i})(ke||(ke={}));class pe extends Vt{constructor(e,t,n,s){super(),this.startSide=e,this.endSide=t,this.widget=n,this.spec=s}get heightRelevant(){return!1}static mark(e){return new Jn(e)}static widget(e){let t=Math.max(-1e4,Math.min(1e4,e.side||0)),n=!!e.block;return t+=n&&!e.inlineOrder?t>0?3e8:-4e8:t>0?1e8:-1e8,new $t(e,t,t,n,e.widget||null,!1)}static replace(e){let t=!!e.block,n,s;if(e.isBlockGap)n=-5e8,s=4e8;else{let{start:r,end:o}=Ul(e,t);n=(r?t?-3e8:-1:5e8)-1,s=(o?t?2e8:1:-6e8)+1}return new $t(e,n,s,t,e.widget||null,!0)}static line(e){return new Yn(e)}static set(e,t=!1){return X.of(e,t)}hasHeight(){return this.widget?this.widget.estimatedHeight>-1:!1}}pe.none=X.empty;class Jn extends pe{constructor(e){let{start:t,end:n}=Ul(e);super(t?-1:5e8,n?1:-6e8,null,e),this.tagName=e.tagName||"span",this.attrs=e.class&&e.attributes?Br(e.attributes,{class:e.class}):e.class?{class:e.class}:e.attributes||Ei}eq(e){return this==e||e instanceof Jn&&this.tagName==e.tagName&&Dr(this.attrs,e.attrs)}range(e,t=e){if(e>=t)throw new RangeError("Mark decorations may not be empty");return super.range(e,t)}}Jn.prototype.point=!1;class Yn extends pe{constructor(e){super(-2e8,-2e8,null,e)}eq(e){return e instanceof Yn&&this.spec.class==e.spec.class&&Dr(this.spec.attributes,e.spec.attributes)}range(e,t=e){if(t!=e)throw new RangeError("Line decoration ranges must be zero-length");return super.range(e,t)}}Yn.prototype.mapMode=Ie.TrackBefore;Yn.prototype.point=!0;class $t extends pe{constructor(e,t,n,s,r,o){super(t,n,r,e),this.block=s,this.isReplace=o,this.mapMode=s?t<=0?Ie.TrackBefore:Ie.TrackAfter:Ie.TrackDel}get type(){return this.startSide!=this.endSide?ke.WidgetRange:this.startSide<=0?ke.WidgetBefore:ke.WidgetAfter}get heightRelevant(){return this.block||!!this.widget&&(this.widget.estimatedHeight>=5||this.widget.lineBreaks>0)}eq(e){return e instanceof $t&&Gh(this.widget,e.widget)&&this.block==e.block&&this.startSide==e.startSide&&this.endSide==e.endSide}range(e,t=e){if(this.isReplace&&(e>t||e==t&&this.startSide>0&&this.endSide<=0))throw new RangeError("Invalid range for replacement decoration");if(!this.isReplace&&t!=e)throw new RangeError("Widget decorations can only have zero-length ranges");return super.range(e,t)}}$t.prototype.point=!0;function Ul(i,e=!1){let{inclusiveStart:t,inclusiveEnd:n}=i;return t==null&&(t=i.inclusive),n==null&&(n=i.inclusive),{start:t??e,end:n??e}}function Gh(i,e){return i==e||!!(i&&e&&i.compare(e))}function an(i,e,t,n=0){let s=t.length-1;s>=0&&t[s]+n>=i?t[s]=Math.max(t[s],e):t.push(i,e)}class Vn extends Vt{constructor(e,t){super(),this.tagName=e,this.attributes=t}eq(e){return e==this||e instanceof Vn&&this.tagName==e.tagName&&Dr(this.attributes,e.attributes)}static create(e){return new Vn(e.tagName,e.attributes||Ei)}static set(e,t=!1){return X.of(e,t)}}Vn.prototype.startSide=Vn.prototype.endSide=-1;function $n(i){let e;return i.nodeType==11?e=i.getSelection?i:i.ownerDocument:e=i,e.getSelection()}function Ks(i,e){return e?i==e||i.contains(e.nodeType!=1?e.parentNode:e):!1}function In(i,e){if(!e.anchorNode)return!1;try{return Ks(i,e.anchorNode)}catch{return!1}}function ki(i){return i.nodeType==3?Un(i,0,i.nodeValue.length).getClientRects():i.nodeType==1?i.getClientRects():[]}function Nn(i,e,t,n){return t?go(i,e,t,n,-1)||go(i,e,t,n,1):!1}function Tt(i){for(var e=0;;e++)if(i=i.previousSibling,!i)return e}function Bi(i){return i.nodeType==1&&/^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(i.nodeName)}function go(i,e,t,n,s){for(;;){if(i==t&&e==n)return!0;if(e==(s<0?0:pt(i))){if(i.nodeName=="DIV")return!1;let r=i.parentNode;if(!r||r.nodeType!=1)return!1;e=Tt(i)+(s<0?0:1),i=r}else if(i.nodeType==1){if(i=i.childNodes[e+(s<0?-1:0)],i.nodeType==1&&i.contentEditable=="false")return!1;e=s<0?pt(i):0}else return!1}}function pt(i){return i.nodeType==3?i.nodeValue.length:i.childNodes.length}function Di(i,e){let t=e?i.left:i.right;return{left:t,right:t,top:i.top,bottom:i.bottom}}function Xh(i){let e=i.visualViewport;return e?{left:0,right:e.width,top:0,bottom:e.height}:{left:0,right:i.innerWidth,top:0,bottom:i.innerHeight}}function Kl(i,e){let t=e.width/i.offsetWidth,n=e.height/i.offsetHeight;return(t>.995&&t<1.005||!isFinite(t)||Math.abs(e.width-i.offsetWidth)<1)&&(t=1),(n>.995&&n<1.005||!isFinite(n)||Math.abs(e.height-i.offsetHeight)<1)&&(n=1),{scaleX:t,scaleY:n}}function Jh(i,e,t,n,s,r,o,l){let a=i.ownerDocument,h=a.defaultView||window;for(let c=i,f=!1;c&&!f;)if(c.nodeType==1){let u,d=c==a.body,p=1,m=1;if(d)u=Xh(h);else{if(/^(fixed|sticky)$/.test(getComputedStyle(c).position)&&(f=!0),c.scrollHeight<=c.clientHeight&&c.scrollWidth<=c.clientWidth){c=c.assignedSlot||c.parentNode;continue}let x=c.getBoundingClientRect();({scaleX:p,scaleY:m}=Kl(c,x)),u={left:x.left,right:x.left+c.clientWidth*p,top:x.top,bottom:x.top+c.clientHeight*m}}let g=0,b=0;if(s=="nearest")e.top<u.top?(b=e.top-(u.top+o),t>0&&e.bottom>u.bottom+b&&(b=e.bottom-u.bottom+o)):e.bottom>u.bottom&&(b=e.bottom-u.bottom+o,t<0&&e.top-b<u.top&&(b=e.top-(u.top+o)));else{let x=e.bottom-e.top,C=u.bottom-u.top;b=(s=="center"&&x<=C?e.top+x/2-C/2:s=="start"||s=="center"&&t<0?e.top-o:e.bottom-C+o)-u.top}if(n=="nearest"?e.left<u.left?(g=e.left-(u.left+r),t>0&&e.right>u.right+g&&(g=e.right-u.right+r)):e.right>u.right&&(g=e.right-u.right+r,t<0&&e.left<u.left+g&&(g=e.left-(u.left+r))):g=(n=="center"?e.left+(e.right-e.left)/2-(u.right-u.left)/2:n=="start"==l?e.left-r:e.right-(u.right-u.left)+r)-u.left,g||b)if(d)h.scrollBy(g,b);else{let x=0,C=0;if(b){let R=c.scrollTop;c.scrollTop+=b/m,C=(c.scrollTop-R)*m}if(g){let R=c.scrollLeft;c.scrollLeft+=g/p,x=(c.scrollLeft-R)*p}e={left:e.left-x,top:e.top-C,right:e.right-x,bottom:e.bottom-C},x&&Math.abs(x-g)<1&&(n="nearest"),C&&Math.abs(C-b)<1&&(s="nearest")}if(d)break;(e.top<u.top||e.bottom>u.bottom||e.left<u.left||e.right>u.right)&&(e={left:Math.max(e.left,u.left),right:Math.min(e.right,u.right),top:Math.max(e.top,u.top),bottom:Math.min(e.bottom,u.bottom)}),c=c.assignedSlot||c.parentNode}else if(c.nodeType==11)c=c.host;else break}function jl(i,e=!0){let t=i.ownerDocument,n=null,s=null;for(let r=i.parentNode;r&&!(r==t.body||(!e||n)&&s);)if(r.nodeType==1)!s&&r.scrollHeight>r.clientHeight&&(s=r),e&&!n&&r.scrollWidth>r.clientWidth&&(n=r),r=r.assignedSlot||r.parentNode;else if(r.nodeType==11)r=r.host;else break;return{x:n,y:s}}class Yh{constructor(){this.anchorNode=null,this.anchorOffset=0,this.focusNode=null,this.focusOffset=0}eq(e){return this.anchorNode==e.anchorNode&&this.anchorOffset==e.anchorOffset&&this.focusNode==e.focusNode&&this.focusOffset==e.focusOffset}setRange(e){let{anchorNode:t,focusNode:n}=e;this.set(t,Math.min(e.anchorOffset,t?pt(t):0),n,Math.min(e.focusOffset,n?pt(n):0))}set(e,t,n,s){this.anchorNode=e,this.anchorOffset=t,this.focusNode=n,this.focusOffset=s}}let Nt=null;B.safari&&B.safari_version>=26&&(Nt=!1);function Gl(i){if(i.setActive)return i.setActive();if(Nt)return i.focus(Nt);let e=[];for(let t=i;t&&(e.push(t,t.scrollTop,t.scrollLeft),t!=t.ownerDocument);t=t.parentNode);if(i.focus(Nt==null?{get preventScroll(){return Nt={preventScroll:!0},!0}}:void 0),!Nt){Nt=!1;for(let t=0;t<e.length;){let n=e[t++],s=e[t++],r=e[t++];n.scrollTop!=s&&(n.scrollTop=s),n.scrollLeft!=r&&(n.scrollLeft=r)}}}let bo;function Un(i,e,t=e){let n=bo||(bo=document.createRange());return n.setEnd(i,t),n.setStart(i,e),n}function hn(i,e,t,n){let s={key:e,code:e,keyCode:t,which:t,cancelable:!0};n&&({altKey:s.altKey,ctrlKey:s.ctrlKey,shiftKey:s.shiftKey,metaKey:s.metaKey}=n);let r=new KeyboardEvent("keydown",s);r.synthetic=!0,i.dispatchEvent(r);let o=new KeyboardEvent("keyup",s);return o.synthetic=!0,i.dispatchEvent(o),r.defaultPrevented||o.defaultPrevented}function Qh(i){for(;i;){if(i&&(i.nodeType==9||i.nodeType==11&&i.host))return i;i=i.assignedSlot||i.parentNode}return null}function Zh(i,e){let t=e.focusNode,n=e.focusOffset;if(!t||e.anchorNode!=t||e.anchorOffset!=n)return!1;for(n=Math.min(n,pt(t));;)if(n){if(t.nodeType!=1)return!1;let s=t.childNodes[n-1];s.contentEditable=="false"?n--:(t=s,n=pt(t))}else{if(t==i)return!0;n=Tt(t),t=t.parentNode}}function Xl(i){return i instanceof Window?i.pageYOffset>Math.max(0,i.document.documentElement.scrollHeight-i.innerHeight-4):i.scrollTop>Math.max(1,i.scrollHeight-i.clientHeight-4)}function Jl(i,e){for(let t=i,n=e;;){if(t.nodeType==3&&n>0)return{node:t,offset:n};if(t.nodeType==1&&n>0){if(t.contentEditable=="false")return null;t=t.childNodes[n-1],n=pt(t)}else if(t.parentNode&&!Bi(t))n=Tt(t),t=t.parentNode;else return null}}function Yl(i,e){for(let t=i,n=e;;){if(t.nodeType==3&&n<t.nodeValue.length)return{node:t,offset:n};if(t.nodeType==1&&n<t.childNodes.length){if(t.contentEditable=="false")return null;t=t.childNodes[n],n=0}else if(t.parentNode&&!Bi(t))n=Tt(t)+1,t=t.parentNode;else return null}}class Ue{constructor(e,t,n=!0){this.node=e,this.offset=t,this.precise=n}static before(e,t){return new Ue(e.parentNode,Tt(e),t)}static after(e,t){return new Ue(e.parentNode,Tt(e)+1,t)}}var le=(function(i){return i[i.LTR=0]="LTR",i[i.RTL=1]="RTL",i})(le||(le={}));const Ut=le.LTR,Or=le.RTL;function Ql(i){let e=[];for(let t=0;t<i.length;t++)e.push(1<<+i[t]);return e}const ec=Ql("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"),tc=Ql("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"),js=Object.create(null),Je=[];for(let i of["()","[]","{}"]){let e=i.charCodeAt(0),t=i.charCodeAt(1);js[e]=t,js[t]=-e}function Zl(i){return i<=247?ec[i]:1424<=i&&i<=1524?2:1536<=i&&i<=1785?tc[i-1536]:1774<=i&&i<=2220?4:8192<=i&&i<=8204?256:64336<=i&&i<=65023?4:1}const nc=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;class nt{get dir(){return this.level%2?Or:Ut}constructor(e,t,n){this.from=e,this.to=t,this.level=n}side(e,t){return this.dir==t==e?this.to:this.from}forward(e,t){return e==(this.dir==t)}static find(e,t,n,s){let r=-1;for(let o=0;o<e.length;o++){let l=e[o];if(l.from<=t&&l.to>=t){if(l.level==n)return o;(r<0||(s!=0?s<0?l.from<t:l.to>t:e[r].level>l.level))&&(r=o)}}if(r<0)throw new RangeError("Index out of range");return r}}function ea(i,e){if(i.length!=e.length)return!1;for(let t=0;t<i.length;t++){let n=i[t],s=e[t];if(n.from!=s.from||n.to!=s.to||n.direction!=s.direction||!ea(n.inner,s.inner))return!1}return!0}const se=[];function ic(i,e,t,n,s){for(let r=0;r<=n.length;r++){let o=r?n[r-1].to:e,l=r<n.length?n[r].from:t,a=r?256:s;for(let h=o,c=a,f=a;h<l;h++){let u=Zl(i.charCodeAt(h));u==512?u=c:u==8&&f==4&&(u=16),se[h]=u==4?2:u,u&7&&(f=u),c=u}for(let h=o,c=a,f=a;h<l;h++){let u=se[h];if(u==128)h<l-1&&c==se[h+1]&&c&24?u=se[h]=c:se[h]=256;else if(u==64){let d=h+1;for(;d<l&&se[d]==64;)d++;let p=h&&c==8||d<t&&se[d]==8?f==1?1:8:256;for(let m=h;m<d;m++)se[m]=p;h=d-1}else u==8&&f==1&&(se[h]=1);c=u,u&7&&(f=u)}}}function sc(i,e,t,n,s){let r=s==1?2:1;for(let o=0,l=0,a=0;o<=n.length;o++){let h=o?n[o-1].to:e,c=o<n.length?n[o].from:t;for(let f=h,u,d,p;f<c;f++)if(d=js[u=i.charCodeAt(f)])if(d<0){for(let m=l-3;m>=0;m-=3)if(Je[m+1]==-d){let g=Je[m+2],b=g&2?s:g&4?g&1?r:s:0;b&&(se[f]=se[Je[m]]=b),l=m;break}}else{if(Je.length==189)break;Je[l++]=f,Je[l++]=u,Je[l++]=a}else if((p=se[f])==2||p==1){let m=p==s;a=m?0:1;for(let g=l-3;g>=0;g-=3){let b=Je[g+2];if(b&2)break;if(m)Je[g+2]|=2;else{if(b&4)break;Je[g+2]|=4}}}}}function rc(i,e,t,n){for(let s=0,r=n;s<=t.length;s++){let o=s?t[s-1].to:i,l=s<t.length?t[s].from:e;for(let a=o;a<l;){let h=se[a];if(h==256){let c=a+1;for(;;)if(c==l){if(s==t.length)break;c=t[s++].to,l=s<t.length?t[s].from:e}else if(se[c]==256)c++;else break;let f=r==1,u=(c<e?se[c]:n)==1,d=f==u?f?1:2:n;for(let p=c,m=s,g=m?t[m-1].to:i;p>a;)p==g&&(p=t[--m].from,g=m?t[m-1].to:i),se[--p]=d;a=c}else r=h,a++}}}function Gs(i,e,t,n,s,r,o){let l=n%2?2:1;if(n%2==s%2)for(let a=e,h=0;a<t;){let c=!0,f=!1;if(h==r.length||a<r[h].from){let m=se[a];m!=l&&(c=!1,f=m==16)}let u=!c&&l==1?[]:null,d=c?n:n+1,p=a;e:for(;;)if(h<r.length&&p==r[h].from){if(f)break e;let m=r[h];if(!c)for(let g=m.to,b=h+1;;){if(g==t)break e;if(b<r.length&&r[b].from==g)g=r[b++].to;else{if(se[g]==l)break e;break}}if(h++,u)u.push(m);else{m.from>a&&o.push(new nt(a,m.from,d));let g=m.direction==Ut!=!(d%2);Xs(i,g?n+1:n,s,m.inner,m.from,m.to,o),a=m.to}p=m.to}else{if(p==t||(c?se[p]!=l:se[p]==l))break;p++}u?Gs(i,a,p,n+1,s,u,o):a<p&&o.push(new nt(a,p,d)),a=p}else for(let a=t,h=r.length;a>e;){let c=!0,f=!1;if(!h||a>r[h-1].to){let m=se[a-1];m!=l&&(c=!1,f=m==16)}let u=!c&&l==1?[]:null,d=c?n:n+1,p=a;e:for(;;)if(h&&p==r[h-1].to){if(f)break e;let m=r[--h];if(!c)for(let g=m.from,b=h;;){if(g==e)break e;if(b&&r[b-1].to==g)g=r[--b].from;else{if(se[g-1]==l)break e;break}}if(u)u.push(m);else{m.to<a&&o.push(new nt(m.to,a,d));let g=m.direction==Ut!=!(d%2);Xs(i,g?n+1:n,s,m.inner,m.from,m.to,o),a=m.from}p=m.from}else{if(p==e||(c?se[p-1]!=l:se[p-1]==l))break;p--}u?Gs(i,p,a,n+1,s,u,o):p<a&&o.push(new nt(p,a,d)),a=p}}function Xs(i,e,t,n,s,r,o){let l=e%2?2:1;ic(i,s,r,n,l),sc(i,s,r,n,l),rc(s,r,n,l),Gs(i,s,r,e,t,n,o)}function oc(i,e,t){if(!i)return[new nt(0,0,e==Or?1:0)];if(e==Ut&&!t.length&&!nc.test(i))return ta(i.length);if(t.length)for(;i.length>se.length;)se[se.length]=256;let n=[],s=e==Ut?0:1;return Xs(i,s,s,t,0,i.length,n),n}function ta(i){return[new nt(0,i,0)]}let na="";function lc(i,e,t,n,s){var r;let o=n.head-i.from,l=nt.find(e,o,(r=n.bidiLevel)!==null&&r!==void 0?r:-1,n.assoc),a=e[l],h=a.side(s,t);if(o==h){let u=l+=s?1:-1;if(u<0||u>=e.length)return null;a=e[l=u],o=a.side(!s,t),h=a.side(s,t)}let c=Ae(i.text,o,a.forward(s,t));(c<a.from||c>a.to)&&(c=h),na=i.text.slice(Math.min(o,c),Math.max(o,c));let f=l==(s?e.length-1:0)?null:e[l+(s?1:-1)];return f&&c==h&&f.level+(s?0:1)<a.level?w.cursor(f.side(!s,t)+i.from,f.forward(s,t)?1:-1,f.level):w.cursor(c+i.from,a.forward(s,t)?-1:1,a.level)}function ac(i,e,t){for(let n=e;n<t;n++){let s=Zl(i.charCodeAt(n));if(s==1)return Ut;if(s==2||s==4)return Or}return Ut}const ia=L.define(),sa=L.define(),ra=L.define(),oa=L.define(),Js=L.define(),la=L.define(),aa=L.define(),Pr=L.define(),Lr=L.define(),ha=L.define({combine:i=>i.some(e=>e)}),ca=L.define({combine:i=>i.some(e=>e)}),fa=L.define();class cn{constructor(e,t="nearest",n="nearest",s=5,r=5,o=!1){this.range=e,this.y=t,this.x=n,this.yMargin=s,this.xMargin=r,this.isSnapshot=o}map(e){return e.empty?this:new cn(this.range.map(e),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}clip(e){return this.range.to<=e.doc.length?this:new cn(w.cursor(e.doc.length),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}}const ii=de.define({map:(i,e)=>i.map(e)}),ua=de.define();function it(i,e,t){let n=i.facet(oa);n.length?n[0](e):window.onerror&&window.onerror(String(e),t,void 0,void 0,e)||(t?console.error(t+":",e):console.error(e))}const ft=L.define({combine:i=>i.length?i[0]:!0});let hc=0;const nn=L.define({combine(i){return i.filter((e,t)=>{for(let n=0;n<t;n++)if(i[n].plugin==e.plugin)return!1;return!0})}});class lt{constructor(e,t,n,s,r){this.id=e,this.create=t,this.domEventHandlers=n,this.domEventObservers=s,this.baseExtensions=r(this),this.extension=this.baseExtensions.concat(nn.of({plugin:this,arg:void 0}))}of(e){return this.baseExtensions.concat(nn.of({plugin:this,arg:e}))}static define(e,t){const{eventHandlers:n,eventObservers:s,provide:r,decorations:o}=t||{};return new lt(hc++,e,n,s,l=>{let a=[];return o&&a.push(Ki.of(h=>{let c=h.plugin(l);return c?o(c):pe.none})),r&&a.push(r(l)),a})}static fromClass(e,t){return lt.define((n,s)=>new e(n,s),t)}}class as{constructor(e){this.spec=e,this.mustUpdate=null,this.value=null}get plugin(){return this.spec&&this.spec.plugin}update(e){if(this.value){if(this.mustUpdate){let t=this.mustUpdate;if(this.mustUpdate=null,this.value.update)try{this.value.update(t)}catch(n){if(it(t.state,n,"CodeMirror plugin crashed"),this.value.destroy)try{this.value.destroy()}catch{}this.deactivate()}}}else if(this.spec)try{this.value=this.spec.plugin.create(e,this.spec.arg)}catch(t){it(e.state,t,"CodeMirror plugin crashed"),this.deactivate()}return this}destroy(e){var t;if(!((t=this.value)===null||t===void 0)&&t.destroy)try{this.value.destroy()}catch(n){it(e.state,n,"CodeMirror plugin crashed")}}deactivate(){this.spec=this.value=null}}const da=L.define(),Rr=L.define(),Ki=L.define(),pa=L.define(),Ir=L.define(),Qn=L.define(),ma=L.define();function yo(i,e){let t=i.state.facet(ma);if(!t.length)return t;let n=t.map(r=>r instanceof Function?r(i):r),s=[];return X.spans(n,e.from,e.to,{point(){},span(r,o,l,a){let h=r-e.from,c=o-e.from,f=s;for(let u=l.length-1;u>=0;u--,a--){let d=l[u].spec.bidiIsolate,p;if(d==null&&(d=ac(e.text,h,c)),a>0&&f.length&&(p=f[f.length-1]).to==h&&p.direction==d)p.to=c,f=p.inner;else{let m={from:h,to:c,direction:d,inner:[]};f.push(m),f=m.inner}}}}),s}const ga=L.define();function ba(i){let e=0,t=0,n=0,s=0;for(let r of i.state.facet(ga)){let o=r(i);o&&(o.left!=null&&(e=Math.max(e,o.left)),o.right!=null&&(t=Math.max(t,o.right)),o.top!=null&&(n=Math.max(n,o.top)),o.bottom!=null&&(s=Math.max(s,o.bottom)))}return{left:e,right:t,top:n,bottom:s}}const On=L.define();class ze{constructor(e,t,n,s){this.fromA=e,this.toA=t,this.fromB=n,this.toB=s}join(e){return new ze(Math.min(this.fromA,e.fromA),Math.max(this.toA,e.toA),Math.min(this.fromB,e.fromB),Math.max(this.toB,e.toB))}addToSet(e){let t=e.length,n=this;for(;t>0;t--){let s=e[t-1];if(!(s.fromA>n.toA)){if(s.toA<n.fromA)break;n=n.join(s),e.splice(t-1,1)}}return e.splice(t,0,n),e}static extendWithRanges(e,t){if(t.length==0)return e;let n=[];for(let s=0,r=0,o=0;;){let l=s<e.length?e[s].fromB:1e9,a=r<t.length?t[r]:1e9,h=Math.min(l,a);if(h==1e9)break;let c=h+o,f=h,u=c;for(;;)if(r<t.length&&t[r]<=f){let d=t[r+1];r+=2,f=Math.max(f,d);for(let p=s;p<e.length&&e[p].fromB<=f;p++)o=e[p].toA-e[p].toB;u=Math.max(u,d+o)}else if(s<e.length&&e[s].fromB<=f){let d=e[s++];f=Math.max(f,d.toB),u=Math.max(u,d.toA),o=d.toA-d.toB}else break;n.push(new ze(c,u,h,f))}return n}}class Oi{constructor(e,t,n){this.view=e,this.state=t,this.transactions=n,this.flags=0,this.startState=e.state,this.changes=ge.empty(this.startState.doc.length);for(let r of n)this.changes=this.changes.compose(r.changes);let s=[];this.changes.iterChangedRanges((r,o,l,a)=>s.push(new ze(r,o,l,a))),this.changedRanges=s}static create(e,t,n){return new Oi(e,t,n)}get viewportChanged(){return(this.flags&4)>0}get viewportMoved(){return(this.flags&8)>0}get heightChanged(){return(this.flags&2)>0}get geometryChanged(){return this.docChanged||(this.flags&18)>0}get focusChanged(){return(this.flags&1)>0}get docChanged(){return!this.changes.empty}get selectionSet(){return this.transactions.some(e=>e.selection)}get empty(){return this.flags==0&&this.transactions.length==0}}const cc=[];class he{constructor(e,t,n=0){this.dom=e,this.length=t,this.flags=n,this.parent=null,e.cmTile=this}get breakAfter(){return this.flags&1}get children(){return cc}isWidget(){return!1}get isHidden(){return!1}isComposite(){return!1}isLine(){return!1}isText(){return!1}isBlock(){return!1}get domAttrs(){return null}sync(e){if(this.flags|=2,this.flags&4){this.flags&=-5;let t=this.domAttrs;t&&Kh(this.dom,t)}}toString(){return this.constructor.name+(this.children.length?`(${this.children})`:"")+(this.breakAfter?"#":"")}destroy(){this.parent=null}setDOM(e){this.dom=e,e.cmTile=this}get posAtStart(){return this.parent?this.parent.posBefore(this):0}get posAtEnd(){return this.posAtStart+this.length}posBefore(e,t=this.posAtStart){let n=t;for(let s of this.children){if(s==e)return n;n+=s.length+s.breakAfter}throw new RangeError("Invalid child in posBefore")}posAfter(e){return this.posBefore(e)+e.length}covers(e){return!0}coordsIn(e,t){return null}domPosFor(e,t){let n=Tt(this.dom),s=this.length?e>0:t>0;return new Ue(this.parent.dom,n+(s?1:0),e==0||e==this.length)}markDirty(e){this.flags&=-3,e&&(this.flags|=4),this.parent&&this.parent.flags&2&&this.parent.markDirty(!1)}get overrideDOMText(){return null}get root(){for(let e=this;e;e=e.parent)if(e instanceof Gi)return e;return null}static get(e){return e.cmTile}}class ji extends he{constructor(e){super(e,0),this._children=[]}isComposite(){return!0}get children(){return this._children}get lastChild(){return this.children.length?this.children[this.children.length-1]:null}append(e){this.children.push(e),e.parent=this}sync(e){if(this.flags&2)return;super.sync(e);let t=this.dom,n=null,s,r=(e==null?void 0:e.node)==t?e:null,o=0;for(let l of this.children){if(l.sync(e),o+=l.length+l.breakAfter,s=n?n.nextSibling:t.firstChild,r&&s!=l.dom&&(r.written=!0),l.dom.parentNode==t)for(;s&&s!=l.dom;)s=vo(s);else t.insertBefore(l.dom,s);n=l.dom}for(s=n?n.nextSibling:t.firstChild,r&&s&&(r.written=!0);s;)s=vo(s);this.length=o}}function vo(i){let e=i.nextSibling;return i.parentNode.removeChild(i),e}class Gi extends ji{constructor(e,t){super(t),this.view=e}owns(e){for(;e;e=e.parent)if(e==this)return!0;return!1}isBlock(){return!0}nearest(e){for(;;){if(!e)return null;let t=he.get(e);if(t&&this.owns(t))return t;e=e.parentNode}}blockTiles(e){for(let t=[],n=this,s=0,r=0;;)if(s==n.children.length){if(!t.length)return;n=n.parent,n.breakAfter&&r++,s=t.pop()}else{let o=n.children[s++];if(o instanceof dt)t.push(s),n=o,s=0;else{let l=r+o.length,a=e(o,r);if(a!==void 0)return a;r=l+o.breakAfter}}}resolveBlock(e,t){let n,s=-1,r,o=-1;if(this.blockTiles((l,a)=>{let h=a+l.length;if(e>=a&&e<=h){if(l.isWidget()&&t>=-1&&t<=1){if(l.flags&32)return!0;l.flags&16&&(n=void 0)}(a<e||e==h&&(t<-1?l.length:l.covers(1)))&&(!n||!l.isWidget()&&n.isWidget())&&(n=l,s=e-a),(h>e||e==a&&(t>1?l.length:l.covers(-1)))&&(!r||!l.isWidget()&&r.isWidget())&&(r=l,o=e-a)}}),!n&&!r)throw new Error("No tile at position "+e);return n&&t<0||!r?{tile:n,offset:s}:{tile:r,offset:o}}}class dt extends ji{constructor(e,t){super(e),this.wrapper=t}isBlock(){return!0}covers(e){return this.children.length?e<0?this.children[0].covers(-1):this.lastChild.covers(1):!1}get domAttrs(){return this.wrapper.attributes}static of(e,t){let n=new dt(t||document.createElement(e.tagName),e);return t||(n.flags|=4),n}}class un extends ji{constructor(e,t){super(e),this.attrs=t}isLine(){return!0}static start(e,t,n){let s=new un(t||document.createElement("div"),e);return(!t||!n)&&(s.flags|=4),s}get domAttrs(){return this.attrs}resolveInline(e,t,n){let s=null,r=-1,o=null,l=-1;function a(c,f){for(let u=0,d=0;u<c.children.length&&d<=f;u++){let p=c.children[u],m=d+p.length;m>=f&&(p.isComposite()?a(p,f-d):(!o||o.isHidden&&(t>0||n&&uc(o,p)))&&(m>f||p.flags&32)?(o=p,l=f-d):(d<f||p.flags&16&&!p.isHidden)&&(s=p,r=f-d)),d=m}}a(this,e);let h=(t<0?s:o)||s||o;return h?{tile:h,offset:h==s?r:l}:null}coordsIn(e,t){let n=this.resolveInline(e,t,!0);return n?n.tile.coordsIn(Math.max(0,n.offset),t):fc(this)}domIn(e,t){let n=this.resolveInline(e,t);if(n){let{tile:s,offset:r}=n;if(this.dom.contains(s.dom))return s.isText()?new Ue(s.dom,Math.min(s.dom.nodeValue.length,r)):s.domPosFor(r,s.flags&16?1:s.flags&32?-1:t);let o=n.tile.parent,l=!1;for(let a of o.children){if(l)return new Ue(a.dom,0);a==n.tile&&(l=!0)}}return new Ue(this.dom,0)}}function fc(i){let e=i.dom.lastChild;if(!e)return i.dom.getBoundingClientRect();let t=ki(e);return t[t.length-1]||null}function uc(i,e){let t=i.coordsIn(0,1),n=e.coordsIn(0,1);return t&&n&&n.top<t.bottom}class Be extends ji{constructor(e,t){super(e),this.mark=t}get domAttrs(){return this.mark.attrs}static of(e,t){let n=new Be(t||document.createElement(e.tagName),e);return t||(n.flags|=4),n}}class zt extends he{constructor(e,t){super(e,t.length),this.text=t}sync(e){this.flags&2||(super.sync(e),this.dom.nodeValue!=this.text&&(e&&e.node==this.dom&&(e.written=!0),this.dom.nodeValue=this.text))}isText(){return!0}toString(){return JSON.stringify(this.text)}coordsIn(e,t){let n=this.dom.nodeValue.length;e>n&&(e=n);let s=e,r=e,o=0;e==0&&t<0||e==n&&t>=0?B.chrome||B.gecko||(e?(s--,o=1):r<n&&(r++,o=-1)):t<0?s--:r<n&&r++;let l=Un(this.dom,s,r).getClientRects();if(!l.length)return null;let a=l[(o?o<0:t>=0)?0:l.length-1];return B.safari&&!o&&a.width==0&&(a=Array.prototype.find.call(l,h=>h.width)||a),o?Di(a,o<0):a||null}static of(e,t){let n=new zt(t||document.createTextNode(e),e);return t||(n.flags|=2),n}}class Kt extends he{constructor(e,t,n,s){super(e,t,s),this.widget=n}isWidget(){return!0}get isHidden(){return this.widget.isHidden}covers(e){return this.flags&48?!1:(this.flags&(e<0?64:128))>0}coordsIn(e,t){return this.coordsInWidget(e,t,!1)}coordsInWidget(e,t,n){let s=this.widget.coordsAt(this.dom,e,t);if(s)return s;if(n)return Di(this.dom.getBoundingClientRect(),this.length?e==0:t<=0);{let r=this.dom.getClientRects(),o=null;if(!r.length)return null;let l=this.flags&16?!0:this.flags&32?!1:e>0;for(let a=l?r.length-1:0;o=r[a],!(e>0?a==0:a==r.length-1||o.top<o.bottom);a+=l?-1:1);return Di(o,!l)}}get overrideDOMText(){if(!this.length)return J.empty;let{root:e}=this;if(!e)return J.empty;let t=this.posAtStart;return e.view.state.doc.slice(t,t+this.length)}destroy(){super.destroy(),this.widget.destroy(this.dom)}static of(e,t,n,s,r){return r||(r=e.toDOM(t),e.editable||(r.contentEditable="false")),new Kt(r,n,e,s)}}class Pi extends he{constructor(e){let t=document.createElement("img");t.className="cm-widgetBuffer",t.setAttribute("aria-hidden","true"),super(t,0,e)}get isHidden(){return!0}get overrideDOMText(){return J.empty}coordsIn(e){return this.dom.getBoundingClientRect()}}class dc{constructor(e){this.index=0,this.beforeBreak=!1,this.parents=[],this.tile=e}advance(e,t,n){let{tile:s,index:r,beforeBreak:o,parents:l}=this;for(;e||t>0;)if(s.isComposite())if(o){if(!e)break;n&&n.break(),e--,o=!1}else if(r==s.children.length){if(!e&&!l.length)break;n&&n.leave(s),o=!!s.breakAfter,{tile:s,index:r}=l.pop(),r++}else{let a=s.children[r],h=a.breakAfter;(t>0?a.length<=e:a.length<e)&&(!n||n.skip(a,0,a.length)!==!1||!a.isComposite)?(o=!!h,r++,e-=a.length):(l.push({tile:s,index:r}),s=a,r=0,n&&a.isComposite()&&n.enter(a))}else if(r==s.length)o=!!s.breakAfter,{tile:s,index:r}=l.pop(),r++;else if(e){let a=Math.min(e,s.length-r);n&&n.skip(s,r,r+a),e-=a,r+=a}else break;return this.tile=s,this.index=r,this.beforeBreak=o,this}get root(){return this.parents.length?this.parents[0].tile:this.tile}}class pc{constructor(e,t,n,s){this.from=e,this.to=t,this.wrapper=n,this.rank=s}}class mc{constructor(e,t,n){this.cache=e,this.root=t,this.blockWrappers=n,this.curLine=null,this.lastBlock=null,this.afterWidget=null,this.pos=0,this.wrappers=[],this.wrapperPos=0}addText(e,t,n,s){var r;this.flushBuffer();let o=this.ensureMarks(t,n),l=o.lastChild;if(l&&l.isText()&&!(l.flags&8)&&l.length+e.length<512){this.cache.reused.set(l,2);let a=o.children[o.children.length-1]=new zt(l.dom,l.text+e);a.parent=o}else o.append(s||zt.of(e,(r=this.cache.find(zt))===null||r===void 0?void 0:r.dom));this.pos+=e.length,this.afterWidget=null}addComposition(e,t){let n=this.curLine;n.dom!=t.line.dom&&(n.setDOM(this.cache.reused.has(t.line)?hs(t.line.dom):t.line.dom),this.cache.reused.set(t.line,2));let s=n;for(let l=t.marks.length-1;l>=0;l--){let a=t.marks[l],h=s.lastChild;if(h instanceof Be&&h.mark.eq(a.mark))h.dom!=a.dom&&h.setDOM(hs(a.dom)),s=h;else{if(this.cache.reused.get(a)){let f=he.get(a.dom);f&&f.setDOM(hs(a.dom))}let c=Be.of(a.mark,a.dom);s.append(c),s=c}this.cache.reused.set(a,2)}let r=he.get(e.text);r&&this.cache.reused.set(r,2);let o=new zt(e.text,e.text.nodeValue);o.flags|=8,s.append(o)}addInlineWidget(e,t,n){let s=this.afterWidget&&e.flags&48&&(this.afterWidget.flags&48)==(e.flags&48);s||this.flushBuffer();let r=this.ensureMarks(t,n);!s&&!(e.flags&16)&&r.append(this.getBuffer(1)),r.append(e),this.pos+=e.length,this.afterWidget=e}addMark(e,t,n){this.flushBuffer(),this.ensureMarks(t,n).append(e),this.pos+=e.length,this.afterWidget=null}addBlockWidget(e){this.getBlockPos().append(e),this.pos+=e.length,this.lastBlock=e,this.endLine()}continueWidget(e){let t=this.afterWidget||this.lastBlock;t.length+=e,this.pos+=e}addLineStart(e,t){var n;e||(e=ya);let s=un.start(e,t||((n=this.cache.find(un))===null||n===void 0?void 0:n.dom),!!t);this.getBlockPos().append(this.lastBlock=this.curLine=s)}addLine(e){this.getBlockPos().append(e),this.pos+=e.length,this.lastBlock=e,this.endLine()}addBreak(){this.lastBlock.flags|=1,this.endLine(),this.pos++}addLineStartIfNotCovered(e){this.blockPosCovered()||this.addLineStart(e)}ensureLine(e){this.curLine||this.addLineStart(e)}ensureMarks(e,t){var n;let s=this.curLine;for(let r=e.length-1;r>=0;r--){let o=e[r],l;if(t>0&&(l=s.lastChild)&&l instanceof Be&&l.mark.eq(o))s=l,t--;else{let a=Be.of(o,(n=this.cache.find(Be,h=>h.mark.eq(o)))===null||n===void 0?void 0:n.dom);s.append(a),s=a,t=0}}return s}endLine(){if(this.curLine){this.flushBuffer();let e=this.curLine.lastChild;(!e||!wo(this.curLine,!1)||e.dom.nodeName!="BR"&&e.isWidget()&&!(B.ios&&wo(this.curLine,!0)))&&this.curLine.append(this.cache.findWidget(cs,0,32)||new Kt(cs.toDOM(),0,cs,32)),this.curLine=this.afterWidget=null}}updateBlockWrappers(){this.wrapperPos>this.pos+1e4&&(this.blockWrappers.goto(this.pos),this.wrappers.length=0);for(let e=this.wrappers.length-1;e>=0;e--)this.wrappers[e].to<this.pos&&this.wrappers.splice(e,1);for(let e=this.blockWrappers;e.value&&e.from<=this.pos;e.next())if(e.to>=this.pos){let t=new pc(e.from,e.to,e.value,e.rank),n=this.wrappers.length;for(;n>0&&(this.wrappers[n-1].rank-t.rank||this.wrappers[n-1].to-t.to)<0;)n--;this.wrappers.splice(n,0,t)}this.wrapperPos=this.pos}getBlockPos(){var e;this.updateBlockWrappers();let t=this.root;for(let n of this.wrappers){let s=t.lastChild;if(n.from<this.pos&&s instanceof dt&&s.wrapper.eq(n.wrapper))t=s;else{let r=dt.of(n.wrapper,(e=this.cache.find(dt,o=>o.wrapper.eq(n.wrapper)))===null||e===void 0?void 0:e.dom);t.append(r),t=r}}return t}blockPosCovered(){let e=this.lastBlock;return e!=null&&!e.breakAfter&&(!e.isWidget()||(e.flags&160)>0)}getBuffer(e){let t=2|(e<0?16:32),n=this.cache.find(Pi,void 0,1);return n&&(n.flags=t),n||new Pi(t)}flushBuffer(){this.afterWidget&&!(this.afterWidget.flags&32)&&(this.afterWidget.parent.append(this.getBuffer(-1)),this.afterWidget=null)}}class gc{constructor(e){this.skipCount=0,this.text="",this.textOff=0,this.cursor=e.iter()}skip(e){this.textOff+e<=this.text.length?this.textOff+=e:(this.skipCount+=e-(this.text.length-this.textOff),this.text="",this.textOff=0)}next(e){if(this.textOff==this.text.length){let{value:s,lineBreak:r,done:o}=this.cursor.next(this.skipCount);if(this.skipCount=0,o)throw new Error("Ran out of text content when drawing inline views");this.text=s;let l=this.textOff=Math.min(e,s.length);return r?null:s.slice(0,l)}let t=Math.min(this.text.length,this.textOff+e),n=this.text.slice(this.textOff,t);return this.textOff=t,n}}const Li=[Kt,un,zt,Be,Pi,dt,Gi];for(let i=0;i<Li.length;i++)Li[i].bucket=i;class bc{constructor(e){this.view=e,this.buckets=Li.map(()=>[]),this.index=Li.map(()=>0),this.reused=new Map}add(e){let t=e.constructor.bucket,n=this.buckets[t];n.length<6?n.push(e):n[this.index[t]=(this.index[t]+1)%6]=e}find(e,t,n=2){let s=e.bucket,r=this.buckets[s],o=this.index[s];for(let l=r.length-1;l>=0;l--){let a=(l+o)%r.length,h=r[a];if((!t||t(h))&&!this.reused.has(h))return r.splice(a,1),a<o&&this.index[s]--,this.reused.set(h,n),h}return null}findWidget(e,t,n){let s=this.buckets[0];if(s.length)for(let r=0,o=0;;r++){if(r==s.length){if(o)return null;o=1,r=0}let l=s[r];if(!this.reused.has(l)&&(o==0?l.widget.compare(e):l.widget.constructor==e.constructor&&e.updateDOM(l.dom,this.view,l.widget)))return s.splice(r,1),r<this.index[0]&&this.index[0]--,l.widget==e&&l.length==t&&(l.flags&497)==n?(this.reused.set(l,1),l):(this.reused.set(l,2),new Kt(l.dom,t,e,l.flags&-498|n))}}reuse(e){return this.reused.set(e,1),e}maybeReuse(e,t=2){if(!this.reused.has(e))return this.reused.set(e,t),e.dom}clear(){for(let e=0;e<this.buckets.length;e++)this.buckets[e].length=this.index[e]=0}}class yc{constructor(e,t,n,s,r){this.view=e,this.decorations=s,this.disallowBlockEffectsFor=r,this.openWidget=!1,this.openMarks=0,this.cache=new bc(e),this.text=new gc(e.state.doc),this.builder=new mc(this.cache,new Gi(e,e.contentDOM),X.iter(n)),this.cache.reused.set(t,2),this.old=new dc(t),this.reuseWalker={skip:(o,l,a)=>{if(this.cache.add(o),o.isComposite())return!1},enter:o=>this.cache.add(o),leave:()=>{},break:()=>{}}}run(e,t){let n=t&&this.getCompositionContext(t.text);for(let s=0,r=0,o=0;;){let l=o<e.length?e[o++]:null,a=l?l.fromA:this.old.root.length;if(a>s){let h=a-s;this.preserve(h,!o,!l),s=a,r+=h}if(!l)break;t&&l.fromA<=t.range.fromA&&l.toA>=t.range.toA?(this.forward(l.fromA,t.range.fromA,t.range.fromA<t.range.toA?1:-1),this.emit(r,t.range.fromB),this.cache.clear(),this.builder.addComposition(t,n),this.text.skip(t.range.toB-t.range.fromB),this.forward(t.range.fromA,l.toA),this.emit(t.range.toB,l.toB)):(this.forward(l.fromA,l.toA),this.emit(r,l.toB)),r=l.toB,s=l.toA}return this.builder.curLine&&this.builder.endLine(),this.builder.root}preserve(e,t,n){let s=kc(this.old),r=this.openMarks;this.old.advance(e,n?1:-1,{skip:(o,l,a)=>{if(o.isWidget())if(this.openWidget)this.builder.continueWidget(a-l);else{let h=a>0||l<o.length?Kt.of(o.widget,this.view,a-l,o.flags&496,this.cache.maybeReuse(o)):this.cache.reuse(o);h.flags&256?(h.flags&=-2,this.builder.addBlockWidget(h)):(this.builder.ensureLine(null),this.builder.addInlineWidget(h,s,r),r=s.length)}else if(o.isText())this.builder.ensureLine(null),!l&&a==o.length&&!this.cache.reused.has(o)?this.builder.addText(o.text,s,r,this.cache.reuse(o)):(this.cache.add(o),this.builder.addText(o.text.slice(l,a),s,r)),r=s.length;else if(o.isLine())o.flags&=-2,this.cache.reused.set(o,1),this.builder.addLine(o);else if(o instanceof Pi)this.cache.add(o);else if(o instanceof Be)this.builder.ensureLine(null),this.builder.addMark(o,s,r),this.cache.reused.set(o,1),r=s.length;else return!1;this.openWidget=!1},enter:o=>{o.isLine()?this.builder.addLineStart(o.attrs,this.cache.maybeReuse(o)):(this.cache.add(o),o instanceof Be&&s.unshift(o.mark)),this.openWidget=!1},leave:o=>{o.isLine()?s.length&&(s.length=r=0):o instanceof Be&&(s.shift(),r=Math.min(r,s.length))},break:()=>{this.builder.addBreak(),this.openWidget=!1}}),this.text.skip(e)}emit(e,t){let n=null,s=this.builder,r=0,o=X.spans(this.decorations,e,t,{point:(l,a,h,c,f,u)=>{if(h instanceof $t){if(this.disallowBlockEffectsFor[u]){if(h.block)throw new RangeError("Block decorations may not be specified via plugins");if(a>this.view.state.doc.lineAt(l).to)throw new RangeError("Decorations that replace line breaks may not be specified via plugins")}if(r=c.length,f>c.length)s.continueWidget(a-l);else{let d=h.widget||(h.block?dn.block:dn.inline),p=vc(h),m=this.cache.findWidget(d,a-l,p)||Kt.of(d,this.view,a-l,p);h.block?(h.startSide>0&&s.addLineStartIfNotCovered(n),s.addBlockWidget(m)):(s.ensureLine(n),s.addInlineWidget(m,c,f))}n=null}else n=wc(n,h);a>l&&this.text.skip(a-l)},span:(l,a,h,c)=>{for(let f=l;f<a;){let u=this.text.next(Math.min(512,a-f));u==null?(s.addLineStartIfNotCovered(n),s.addBreak(),f++):(s.ensureLine(n),s.addText(u,h,f==l?c:h.length),f+=u.length),n=null}}});s.addLineStartIfNotCovered(n),this.openWidget=o>r,this.openMarks=o}forward(e,t,n=1){t-e<=10?this.old.advance(t-e,n,this.reuseWalker):(this.old.advance(5,-1,this.reuseWalker),this.old.advance(t-e-10,-1),this.old.advance(5,n,this.reuseWalker))}getCompositionContext(e){let t=[],n=null;for(let s=e.parentNode;;s=s.parentNode){let r=he.get(s);if(s==this.view.contentDOM)break;r instanceof Be?t.push(r):r!=null&&r.isLine()?n=r:r instanceof dt||(s.nodeName=="DIV"&&!n&&s!=this.view.contentDOM?n=new un(s,ya):n||t.push(Be.of(new Jn({tagName:s.nodeName.toLowerCase(),attributes:jh(s)}),s)))}return{line:n,marks:t}}}function wo(i,e){let t=n=>{for(let s of n.children)if((e?s.isText():s.length)||t(s))return!0;return!1};return t(i)}function vc(i){let e=i.isReplace?(i.startSide<0?64:0)|(i.endSide>0?128:0):i.startSide>0?32:16;return i.block&&(e|=256),e}const ya={class:"cm-line"};function wc(i,e){let t=e.spec.attributes,n=e.spec.class;return!t&&!n||(i||(i={class:"cm-line"}),t&&Br(t,i),n&&(i.class+=" "+n)),i}function kc(i){let e=[];for(let t=i.parents.length;t>1;t--){let n=t==i.parents.length?i.tile:i.parents[t].tile;n instanceof Be&&e.push(n.mark)}return e}function hs(i){let e=he.get(i);return e&&e.setDOM(i.cloneNode()),i}class dn extends Ui{constructor(e){super(),this.tag=e}eq(e){return e.tag==this.tag}toDOM(){return document.createElement(this.tag)}updateDOM(e){return e.nodeName.toLowerCase()==this.tag}get isHidden(){return!0}}dn.inline=new dn("span");dn.block=new dn("div");const cs=new class extends Ui{toDOM(){return document.createElement("br")}get isHidden(){return!0}get editable(){return!0}};class ko{constructor(e){this.view=e,this.decorations=[],this.blockWrappers=[],this.dynamicDecorationMap=[!1],this.domChanged=null,this.hasComposition=null,this.editContextFormatting=pe.none,this.lastCompositionAfterCursor=!1,this.minWidth=0,this.minWidthFrom=0,this.minWidthTo=0,this.impreciseAnchor=null,this.impreciseHead=null,this.forceSelection=!1,this.lastUpdate=Date.now(),this.updateDeco(),this.tile=new Gi(e,e.contentDOM),this.updateInner([new ze(0,0,0,e.state.doc.length)],null)}update(e){var t;let n=e.changedRanges;this.minWidth>0&&n.length&&(n.every(({fromA:c,toA:f})=>f<this.minWidthFrom||c>this.minWidthTo)?(this.minWidthFrom=e.changes.mapPos(this.minWidthFrom,1),this.minWidthTo=e.changes.mapPos(this.minWidthTo,1)):this.minWidth=this.minWidthFrom=this.minWidthTo=0),this.updateEditContextFormatting(e);let s=-1;this.view.inputState.composing>=0&&!this.view.observer.editContext&&(!((t=this.domChanged)===null||t===void 0)&&t.newSel?s=this.domChanged.newSel.head:!Dc(e.changes,this.hasComposition)&&!e.selectionSet&&(s=e.state.selection.main.head));let r=s>-1?Sc(this.view,e.changes,s):null;if(this.domChanged=null,this.hasComposition){let{from:c,to:f}=this.hasComposition;n=new ze(c,f,e.changes.mapPos(c,-1),e.changes.mapPos(f,1)).addToSet(n.slice())}this.hasComposition=r?{from:r.range.fromB,to:r.range.toB}:null,(B.ie||B.chrome)&&!r&&e&&e.state.doc.lines!=e.startState.doc.lines&&(this.forceSelection=!0);let o=this.decorations,l=this.blockWrappers;this.updateDeco();let a=Mc(o,this.decorations,e.changes);a.length&&(n=ze.extendWithRanges(n,a));let h=Ec(l,this.blockWrappers,e.changes);return h.length&&(n=ze.extendWithRanges(n,h)),r&&!n.some(c=>c.fromA<=r.range.fromA&&c.toA>=r.range.toA)&&(n=r.range.addToSet(n.slice())),this.tile.flags&2&&n.length==0?!1:(this.updateInner(n,r),e.transactions.length&&(this.lastUpdate=Date.now()),!0)}updateInner(e,t){this.view.viewState.mustMeasureContent=!0;let{observer:n}=this.view;n.ignore(()=>{if(t||e.length){let o=this.tile,l=new yc(this.view,o,this.blockWrappers,this.decorations,this.dynamicDecorationMap);t&&he.get(t.text)&&l.cache.reused.set(he.get(t.text),2),this.tile=l.run(e,t),Ys(o,l.cache.reused)}this.tile.dom.style.height=this.view.viewState.contentHeight/this.view.scaleY+"px",this.tile.dom.style.flexBasis=this.minWidth?this.minWidth+"px":"";let r=B.chrome||B.ios?{node:n.selectionRange.focusNode,written:!1}:void 0;this.tile.sync(r),r&&(r.written||n.selectionRange.focusNode!=r.node||!this.tile.dom.contains(r.node))&&(this.forceSelection=!0),this.tile.dom.style.height=""});let s=[];if(this.view.viewport.from||this.view.viewport.to<this.view.state.doc.length)for(let r of this.tile.children)r.isWidget()&&r.widget instanceof fs&&s.push(r.dom);n.updateGaps(s)}updateEditContextFormatting(e){this.editContextFormatting=this.editContextFormatting.map(e.changes);for(let t of e.transactions)for(let n of t.effects)n.is(ua)&&(this.editContextFormatting=n.value)}updateSelection(e=!1,t=!1){(e||!this.view.observer.selectionRange.focusNode)&&this.view.observer.readSelectionRange();let{dom:n}=this.tile,s=this.view.root.activeElement,r=s==n,o=!r&&!(this.view.state.facet(ft)||n.tabIndex>-1)&&In(n,this.view.observer.selectionRange)&&!(s&&n.contains(s));if(!(r||t||o))return;let l=this.forceSelection;this.forceSelection=!1;let a=this.view.state.selection.main,h,c;if(a.empty?c=h=this.inlineDOMNearPos(a.anchor,a.assoc||1):(c=this.inlineDOMNearPos(a.head,a.head==a.from?1:-1),h=this.inlineDOMNearPos(a.anchor,a.anchor==a.from?1:-1)),B.gecko&&a.empty&&!this.hasComposition&&xc(h)){let u=document.createTextNode("");this.view.observer.ignore(()=>h.node.insertBefore(u,h.node.childNodes[h.offset]||null)),h=c=new Ue(u,0),l=!0}let f=this.view.observer.selectionRange;(l||!f.focusNode||(!Nn(h.node,h.offset,f.anchorNode,f.anchorOffset)||!Nn(c.node,c.offset,f.focusNode,f.focusOffset))&&!this.suppressWidgetCursorChange(f,a))&&(this.view.observer.ignore(()=>{B.android&&B.chrome&&n.contains(f.focusNode)&&Bc(f.focusNode,n)&&(n.blur(),n.focus({preventScroll:!0}));let u=$n(this.view.root);if(u)if(a.empty){if(B.gecko){let d=Ac(h.node,h.offset);if(d&&d!=3){let p=(d==1?Jl:Yl)(h.node,h.offset);p&&(h=new Ue(p.node,p.offset))}}u.collapse(h.node,h.offset),a.bidiLevel!=null&&u.caretBidiLevel!==void 0&&(u.caretBidiLevel=a.bidiLevel)}else if(u.extend){u.collapse(h.node,h.offset);try{u.extend(c.node,c.offset)}catch{}}else{let d=document.createRange();a.anchor>a.head&&([h,c]=[c,h]),d.setEnd(c.node,c.offset),d.setStart(h.node,h.offset),u.removeAllRanges(),u.addRange(d)}o&&this.view.root.activeElement==n&&(n.blur(),s&&s.focus())}),this.view.observer.setSelectionRange(h,c)),this.impreciseAnchor=h.precise?null:new Ue(f.anchorNode,f.anchorOffset),this.impreciseHead=c.precise?null:new Ue(f.focusNode,f.focusOffset)}suppressWidgetCursorChange(e,t){return this.hasComposition&&t.empty&&Nn(e.focusNode,e.focusOffset,e.anchorNode,e.anchorOffset)&&this.posFromDOM(e.focusNode,e.focusOffset)==t.head}enforceCursorAssoc(){if(this.hasComposition)return;let{view:e}=this,t=e.state.selection.main,n=$n(e.root),{anchorNode:s,anchorOffset:r}=e.observer.selectionRange;if(!n||!t.empty||!t.assoc||!n.modify)return;let o=this.lineAt(t.head,t.assoc);if(!o)return;let l=o.posAtStart;if(t.head==l||t.head==l+o.length)return;let a=this.coordsAt(t.head,-1),h=this.coordsAt(t.head,1);if(!a||!h||a.bottom>h.top)return;let c=this.domAtPos(t.head+t.assoc,t.assoc);n.collapse(c.node,c.offset),n.modify("move",t.assoc<0?"forward":"backward","lineboundary"),e.observer.readSelectionRange();let f=e.observer.selectionRange;e.docView.posFromDOM(f.anchorNode,f.anchorOffset)!=t.from&&n.collapse(s,r)}posFromDOM(e,t){let n=this.tile.nearest(e);if(!n)return this.tile.dom.compareDocumentPosition(e)&2?0:this.view.state.doc.length;let s=n.posAtStart;if(n.isComposite()){let r;if(e==n.dom)r=n.dom.childNodes[t];else{let o=pt(e)==0?0:t==0?-1:1;for(;;){let l=e.parentNode;if(l==n.dom)break;o==0&&l.firstChild!=l.lastChild&&(e==l.firstChild?o=-1:o=1),e=l}o<0?r=e:r=e.nextSibling}if(r==n.dom.firstChild)return s;for(;r&&!he.get(r);)r=r.nextSibling;if(!r)return s+n.length;for(let o=0,l=s;;o++){let a=n.children[o];if(a.dom==r)return l;l+=a.length+a.breakAfter}}else return n.isText()?e==n.dom?s+t:s+(t?n.length:0):s}domAtPos(e,t){let{tile:n,offset:s}=this.tile.resolveBlock(e,t);return n.isWidget()?n.domPosFor(e,t):n.domIn(s,t)}inlineDOMNearPos(e,t){let n,s=-1,r=!1,o,l=-1,a=!1;return this.tile.blockTiles((h,c)=>{if(h.isWidget()){if(h.flags&32&&c>=e)return!0;h.flags&16&&(r=!0)}else{let f=c+h.length;if(c<=e&&(n=h,s=e-c,r=f<e),f>=e&&!o&&(o=h,l=e-c,a=c>e),c>e&&o)return!0}}),!n&&!o?this.domAtPos(e,t):(r&&o?n=null:a&&n&&(o=null),n&&t<0||!o?n.domIn(s,t):o.domIn(l,t))}coordsAt(e,t){let{tile:n,offset:s}=this.tile.resolveBlock(e,t);return n.isWidget()?n.widget instanceof fs?null:n.coordsInWidget(s,t,!0):n.coordsIn(s,t)}lineAt(e,t){let{tile:n}=this.tile.resolveBlock(e,t);return n.isLine()?n:null}coordsForChar(e){let{tile:t,offset:n}=this.tile.resolveBlock(e,1);if(!t.isLine())return null;function s(r,o){if(r.isComposite())for(let l of r.children){if(l.length>=o){let a=s(l,o);if(a)return a}if(o-=l.length,o<0)break}else if(r.isText()&&o<r.length){let l=Ae(r.text,o);if(l==o)return null;let a=Un(r.dom,o,l).getClientRects();for(let h=0;h<a.length;h++){let c=a[h];if(h==a.length-1||c.top<c.bottom&&c.left<c.right)return c}}return null}return s(t,n)}measureVisibleLineHeights(e){let t=[],{from:n,to:s}=e,r=this.view.contentDOM.clientWidth,o=r>Math.max(this.view.scrollDOM.clientWidth,this.minWidth)+1,l=-1,a=this.view.textDirection==le.LTR,h=0,c=(f,u,d)=>{for(let p=0;p<f.children.length&&!(u>s);p++){let m=f.children[p],g=u+m.length,b=m.dom.getBoundingClientRect(),{height:x}=b;if(d&&!p&&(h+=b.top-d.top),m instanceof dt)g>n&&c(m,u,b);else if(u>=n&&(h>0&&t.push(-h),t.push(x+h),h=0,o)){let C=m.dom.lastChild,R=C?ki(C):[];if(R.length){let S=R[R.length-1],k=a?S.right-b.left:b.right-S.left;k>l&&(l=k,this.minWidth=r,this.minWidthFrom=u,this.minWidthTo=g)}}d&&p==f.children.length-1&&(h+=d.bottom-b.bottom),u=g+m.breakAfter}};return c(this.tile,0,null),t}textDirectionAt(e){let{tile:t}=this.tile.resolveBlock(e,1);return getComputedStyle(t.dom).direction=="rtl"?le.RTL:le.LTR}measureTextSize(){let e=this.tile.blockTiles(o=>{if(o.isLine()&&o.children.length&&o.length<=20){let l=0,a;for(let h of o.children){if(!h.isText()||/[^ -~]/.test(h.text))return;let c=ki(h.dom);if(c.length!=1)return;l+=c[0].width,a=c[0].height}if(l)return{lineHeight:o.dom.getBoundingClientRect().height,charWidth:l/o.length,textHeight:a}}});if(e)return e;let t=document.createElement("div"),n,s,r;return t.className="cm-line",t.style.width="99999px",t.style.position="absolute",t.textContent="abc def ghi jkl mno pqr stu",this.view.observer.ignore(()=>{this.tile.dom.appendChild(t);let o=ki(t.firstChild)[0];n=t.getBoundingClientRect().height,s=o&&o.width?o.width/27:7,r=o&&o.height?o.height:n,t.remove()}),{lineHeight:n,charWidth:s,textHeight:r}}computeBlockGapDeco(){let e=[],t=this.view.viewState;for(let n=0,s=0;;s++){let r=s==t.viewports.length?null:t.viewports[s],o=r?r.from-1:this.view.state.doc.length;if(o>n){let l=(t.lineBlockAt(o).bottom-t.lineBlockAt(n).top)/this.view.scaleY;e.push(pe.replace({widget:new fs(l),block:!0,inclusive:!0,isBlockGap:!0}).range(n,o))}if(!r)break;n=r.to+1}return pe.set(e)}updateDeco(){let e=1,t=this.view.state.facet(Ki).map(r=>(this.dynamicDecorationMap[e++]=typeof r=="function")?r(this.view):r),n=!1,s=this.view.state.facet(Ir).map((r,o)=>{let l=typeof r=="function";return l&&(n=!0),l?r(this.view):r});for(s.length&&(this.dynamicDecorationMap[e++]=n,t.push(X.join(s))),this.decorations=[this.editContextFormatting,...t,this.computeBlockGapDeco(),this.view.viewState.lineGapDeco];e<this.decorations.length;)this.dynamicDecorationMap[e++]=!1;this.blockWrappers=this.view.state.facet(pa).map(r=>typeof r=="function"?r(this.view):r)}scrollIntoView(e){var t;if(e.isSnapshot){let c=this.view.viewState.lineBlockAt(e.range.head);this.view.scrollDOM.scrollTop=c.top-e.yMargin,this.view.scrollDOM.scrollLeft=e.xMargin;return}for(let c of this.view.state.facet(fa))try{if(c(this.view,e.range,e))return!0}catch(f){it(this.view.state,f,"scroll handler")}let{range:n}=e,s=this.coordsAt(n.head,(t=n.assoc)!==null&&t!==void 0?t:n.empty?0:n.head>n.anchor?-1:1),r;if(!s)return;!n.empty&&(r=this.coordsAt(n.anchor,n.anchor>n.head?-1:1))&&(s={left:Math.min(s.left,r.left),top:Math.min(s.top,r.top),right:Math.max(s.right,r.right),bottom:Math.max(s.bottom,r.bottom)});let o=ba(this.view),l={left:s.left-o.left,top:s.top-o.top,right:s.right+o.right,bottom:s.bottom+o.bottom},{offsetWidth:a,offsetHeight:h}=this.view.scrollDOM;if(Jh(this.view.scrollDOM,l,n.head<n.anchor?-1:1,e.x,e.y,Math.max(Math.min(e.xMargin,a),-a),Math.max(Math.min(e.yMargin,h),-h),this.view.textDirection==le.LTR),window.visualViewport&&window.innerHeight-window.visualViewport.height>1&&(s.top>window.pageYOffset+window.visualViewport.offsetTop+window.visualViewport.height||s.bottom<window.pageYOffset+window.visualViewport.offsetTop)){let c=this.view.docView.lineAt(n.head,1);c&&c.dom.scrollIntoView({block:"nearest"})}}lineHasWidget(e){let t=n=>n.isWidget()||n.children.some(t);return t(this.tile.resolveBlock(e,1).tile)}destroy(){Ys(this.tile)}}function Ys(i,e){let t=e==null?void 0:e.get(i);if(t!=1){t==null&&i.destroy();for(let n of i.children)Ys(n,e)}}function xc(i){return i.node.nodeType==1&&i.node.firstChild&&(i.offset==0||i.node.childNodes[i.offset-1].contentEditable=="false")&&(i.offset==i.node.childNodes.length||i.node.childNodes[i.offset].contentEditable=="false")}function va(i,e){let t=i.observer.selectionRange;if(!t.focusNode)return null;let n=Jl(t.focusNode,t.focusOffset),s=Yl(t.focusNode,t.focusOffset),r=n||s;if(s&&n&&s.node!=n.node){let l=he.get(s.node);if(!l||l.isText()&&l.text!=s.node.nodeValue)r=s;else if(i.docView.lastCompositionAfterCursor){let a=he.get(n.node);!a||a.isText()&&a.text!=n.node.nodeValue||(r=s)}}if(i.docView.lastCompositionAfterCursor=r!=n,!r)return null;let o=e-r.offset;return{from:o,to:o+r.node.nodeValue.length,node:r.node}}function Sc(i,e,t){let n=va(i,t);if(!n)return null;let{node:s,from:r,to:o}=n,l=s.nodeValue;if(/[\n\r]/.test(l)||i.state.doc.sliceString(n.from,n.to)!=l)return null;let a=e.invertedDesc;return{range:new ze(a.mapPos(r),a.mapPos(o),r,o),text:s}}function Ac(i,e){return i.nodeType!=1?0:(e&&i.childNodes[e-1].contentEditable=="false"?1:0)|(e<i.childNodes.length&&i.childNodes[e].contentEditable=="false"?2:0)}let Cc=class{constructor(){this.changes=[]}compareRange(e,t){an(e,t,this.changes)}comparePoint(e,t){an(e,t,this.changes)}boundChange(e){an(e,e,this.changes)}};function Mc(i,e,t){let n=new Cc;return X.compare(i,e,t,n),n.changes}class Tc{constructor(){this.changes=[]}compareRange(e,t){an(e,t,this.changes)}comparePoint(){}boundChange(e){an(e,e,this.changes)}}function Ec(i,e,t){let n=new Tc;return X.compare(i,e,t,n),n.changes}function Bc(i,e){for(let t=i;t&&t!=e;t=t.assignedSlot||t.parentNode)if(t.nodeType==1&&t.contentEditable=="false")return!0;return!1}function Dc(i,e){let t=!1;return e&&i.iterChangedRanges((n,s)=>{n<e.to&&s>e.from&&(t=!0)}),t}class fs extends Ui{constructor(e){super(),this.height=e}toDOM(){let e=document.createElement("div");return e.className="cm-gap",this.updateDOM(e),e}eq(e){return e.height==this.height}updateDOM(e){return e.style.height=this.height+"px",!0}get editable(){return!0}get estimatedHeight(){return this.height}ignoreEvent(){return!1}}function Oc(i,e,t=1){let n=i.charCategorizer(e),s=i.doc.lineAt(e),r=e-s.from;if(s.length==0)return w.cursor(e);r==0?t=1:r==s.length&&(t=-1);let o=r,l=r;t<0?o=Ae(s.text,r,!1):l=Ae(s.text,r);let a=n(s.text.slice(o,l));for(;o>0;){let h=Ae(s.text,o,!1);if(n(s.text.slice(h,o))!=a)break;o=h}for(;l<s.length;){let h=Ae(s.text,l);if(n(s.text.slice(l,h))!=a)break;l=h}return w.range(o+s.from,l+s.from)}function Pc(i,e,t,n,s){let r=Math.round((n-e.left)*i.defaultCharacterWidth);if(i.lineWrapping&&t.height>i.defaultLineHeight*1.5){let l=i.viewState.heightOracle.textHeight,a=Math.floor((s-t.top-(i.defaultLineHeight-l)*.5)/l);r+=a*i.viewState.heightOracle.lineLength}let o=i.state.sliceDoc(t.from,t.to);return t.from+Fh(o,r,i.state.tabSize)}function Qs(i,e,t){let n=i.lineBlockAt(e);if(Array.isArray(n.type)){let s;for(let r of n.type){if(r.from>e)break;if(!(r.to<e)){if(r.from<e&&r.to>e)return r;(!s||r.type==ke.Text&&(s.type!=r.type||(t<0?r.from<e:r.to>e)))&&(s=r)}}return s||n}return n}function Lc(i,e,t,n){let s=Qs(i,e.head,e.assoc||-1),r=!n||s.type!=ke.Text||!(i.lineWrapping||s.widgetLineBreaks)?null:i.coordsAtPos(e.assoc<0&&e.head>s.from?e.head-1:e.head);if(r){let o=i.dom.getBoundingClientRect(),l=i.textDirectionAt(s.from),a=i.posAtCoords({x:t==(l==le.LTR)?o.right-1:o.left+1,y:(r.top+r.bottom)/2});if(a!=null)return w.cursor(a,t?-1:1)}return w.cursor(t?s.to:s.from,t?-1:1)}function xo(i,e,t,n){let s=i.state.doc.lineAt(e.head),r=i.bidiSpans(s),o=i.textDirectionAt(s.from);for(let l=e,a=null;;){let h=lc(s,r,o,l,t),c=na;if(!h){if(s.number==(t?i.state.doc.lines:1))return l;c=`
`,s=i.state.doc.line(s.number+(t?1:-1)),r=i.bidiSpans(s),h=i.visualLineSide(s,!t)}if(a){if(!a(c))return l}else{if(!n)return h;a=n(c)}l=h}}function Rc(i,e,t){let n=i.state.charCategorizer(e),s=n(t);return r=>{let o=n(r);return s==ut.Space&&(s=o),s==o}}function Ic(i,e,t,n){let s=e.head,r=t?1:-1;if(s==(t?i.state.doc.length:0))return w.cursor(s,e.assoc);let o=e.goalColumn,l,a=i.contentDOM.getBoundingClientRect(),h=i.coordsAtPos(s,e.assoc||((e.empty?t:e.head==e.from)?1:-1)),c=i.documentTop;if(h)o==null&&(o=h.left-a.left),l=r<0?h.top:h.bottom;else{let p=i.viewState.lineBlockAt(s);o==null&&(o=Math.min(a.right-a.left,i.defaultCharacterWidth*(s-p.from))),l=(r<0?p.top:p.bottom)+c}let f=a.left+o,u=i.viewState.heightOracle.textHeight>>1,d=n??u;for(let p=0;;p+=u){let m=l+(d+p)*r,g=Zs(i,{x:f,y:m},!1,r);if(t?m>a.bottom:m<a.top)return w.cursor(g.pos,g.assoc);let b=i.coordsAtPos(g.pos,g.assoc),x=b?(b.top+b.bottom)/2:0;if(!b||(t?x>l:x<l))return w.cursor(g.pos,g.assoc,void 0,o)}}function qn(i,e,t){for(;;){let n=0;for(let s of i)s.between(e-1,e+1,(r,o,l)=>{if(e>r&&e<o){let a=n||t||(e-r<o-e?-1:1);e=a<0?r:o,n=a}});if(!n)return e}}function wa(i,e){let t=null;for(let n=0;n<e.ranges.length;n++){let s=e.ranges[n],r=null;if(s.empty){let o=qn(i,s.from,0);o!=s.from&&(r=w.cursor(o,-1))}else{let o=qn(i,s.from,-1),l=qn(i,s.to,1);(o!=s.from||l!=s.to)&&(r=w.range(s.from==s.anchor?o:l,s.from==s.head?o:l))}r&&(t||(t=e.ranges.slice()),t[n]=r)}return t?w.create(t,e.mainIndex):e}function us(i,e,t){let n=qn(i.state.facet(Qn).map(s=>s(i)),t.from,e.head>t.from?-1:1);return n==t.from?t:w.cursor(n,n<t.from?1:-1)}class tt{constructor(e,t){this.pos=e,this.assoc=t}}function Zs(i,e,t,n){let s=i.contentDOM.getBoundingClientRect(),r=s.top+i.viewState.paddingTop,{x:o,y:l}=e,a=l-r,h;for(;;){if(a<0)return new tt(0,1);if(a>i.viewState.docHeight)return new tt(i.state.doc.length,-1);if(h=i.elementAtHeight(a),n==null)break;if(h.type==ke.Text){if(n<0?h.to<i.viewport.from:h.from>i.viewport.to)break;let u=i.docView.coordsAt(n<0?h.from:h.to,n>0?-1:1);if(u&&(n<0?u.top<=a+r:u.bottom>=a+r))break}let f=i.viewState.heightOracle.textHeight/2;a=n>0?h.bottom+f:h.top-f}if(i.viewport.from>=h.to||i.viewport.to<=h.from){if(t)return null;if(h.type==ke.Text){let f=Pc(i,s,h,o,l);return new tt(f,f==h.from?1:-1)}}if(h.type!=ke.Text)return a<(h.top+h.bottom)/2?new tt(h.from,1):new tt(h.to,-1);let c=i.docView.lineAt(h.from,2);return(!c||c.length!=h.length)&&(c=i.docView.lineAt(h.from,-2)),new Nc(i,o,l,i.textDirectionAt(h.from)).scanTile(c,h.from)}class Nc{constructor(e,t,n,s){this.view=e,this.x=t,this.y=n,this.baseDir=s,this.line=null,this.spans=null}bidiSpansAt(e){return(!this.line||this.line.from>e||this.line.to<e)&&(this.line=this.view.state.doc.lineAt(e),this.spans=this.view.bidiSpans(this.line)),this}baseDirAt(e,t){let{line:n,spans:s}=this.bidiSpansAt(e);return s[nt.find(s,e-n.from,-1,t)].level==this.baseDir}dirAt(e,t){let{line:n,spans:s}=this.bidiSpansAt(e);return s[nt.find(s,e-n.from,-1,t)].dir}bidiIn(e,t){let{spans:n,line:s}=this.bidiSpansAt(e);return n.length>1||n.length&&(n[0].level!=this.baseDir||n[0].to+s.from<t)}scan(e,t){let n=0,s=e.length-1,r=new Set,o=this.bidiIn(e[0],e[s]),l,a,h=-1,c=1e9,f;e:for(;n<s;){let d=s-n,p=n+s>>1;t:if(r.has(p)){let g=n+Math.floor(Math.random()*d);for(let b=0;b<d;b++){if(!r.has(g)){p=g;break t}g++,g==s&&(g=n)}break e}r.add(p);let m=t(p);if(m)for(let g=0;g<m.length;g++){let b=m[g],x=0;if(!(b.width==0&&m.length>1)){if(b.bottom<this.y)(!l||l.bottom<b.bottom)&&(l=b),x=1;else if(b.top>this.y)(!a||a.top>b.top)&&(a=b),x=-1;else{let C=b.left>this.x?this.x-b.left:b.right<this.x?this.x-b.right:0,R=Math.abs(C);R<c&&(h=p,c=R,f=b),C&&(x=C<0==(this.baseDir==le.LTR)?-1:1)}x==-1&&(!o||this.baseDirAt(e[p],1))?s=p:x==1&&(!o||this.baseDirAt(e[p+1],-1))&&(n=p+1)}}}if(!f){let d=l&&(!a||this.y-l.bottom<a.top-this.y)?l:a;return this.y=(d.top+d.bottom)/2,this.scan(e,t)}let u=(o?this.dirAt(e[h],1):this.baseDir)==le.LTR;return{i:h,after:this.x>(f.left+f.right)/2==u}}scanText(e,t){let n=[];for(let r=0;r<e.length;r=Ae(e.text,r))n.push(t+r);n.push(t+e.length);let s=this.scan(n,r=>{let o=n[r]-t,l=n[r+1]-t;return Un(e.dom,o,l).getClientRects()});return s.after?new tt(n[s.i+1],-1):new tt(n[s.i],1)}scanTile(e,t){if(!e.length)return new tt(t,1);if(e.children.length==1){let l=e.children[0];if(l.isText())return this.scanText(l,t);if(l.isComposite())return this.scanTile(l,t)}let n=[t];for(let l=0,a=t;l<e.children.length;l++)n.push(a+=e.children[l].length);let s=this.scan(n,l=>{let a=e.children[l];return a.flags&48?null:(a.dom.nodeType==1?a.dom:Un(a.dom,0,a.length)).getClientRects()}),r=e.children[s.i],o=n[s.i];return r.isText()?this.scanText(r,o):r.isComposite()?this.scanTile(r,o):s.after?new tt(n[s.i+1],-1):new tt(o,1)}}const en="￿";class qc{constructor(e,t){this.points=e,this.view=t,this.text="",this.lineSeparator=t.state.facet(Z.lineSeparator)}append(e){this.text+=e}lineBreak(){this.text+=en}readRange(e,t){if(!e)return this;let n=e.parentNode;for(let s=e;;){this.findPointBefore(n,s);let r=this.text.length;this.readNode(s);let o=he.get(s),l=s.nextSibling;if(l==t){o!=null&&o.breakAfter&&!l&&n!=this.view.contentDOM&&this.lineBreak();break}let a=he.get(l);(o&&a?o.breakAfter:(o?o.breakAfter:Bi(s))||Bi(l)&&(s.nodeName!="BR"||o!=null&&o.isWidget())&&this.text.length>r)&&!zc(l,t)&&this.lineBreak(),s=l}return this.findPointBefore(n,t),this}readTextNode(e){let t=e.nodeValue;for(let n of this.points)n.node==e&&(n.pos=this.text.length+Math.min(n.offset,t.length));for(let n=0,s=this.lineSeparator?null:/\r\n?|\n/g;;){let r=-1,o=1,l;if(this.lineSeparator?(r=t.indexOf(this.lineSeparator,n),o=this.lineSeparator.length):(l=s.exec(t))&&(r=l.index,o=l[0].length),this.append(t.slice(n,r<0?t.length:r)),r<0)break;if(this.lineBreak(),o>1)for(let a of this.points)a.node==e&&a.pos>this.text.length&&(a.pos-=o-1);n=r+o}}readNode(e){let t=he.get(e),n=t&&t.overrideDOMText;if(n!=null){this.findPointInside(e,n.length);for(let s=n.iter();!s.next().done;)s.lineBreak?this.lineBreak():this.append(s.value)}else e.nodeType==3?this.readTextNode(e):e.nodeName=="BR"?e.nextSibling&&this.lineBreak():e.nodeType==1&&this.readRange(e.firstChild,null)}findPointBefore(e,t){for(let n of this.points)n.node==e&&e.childNodes[n.offset]==t&&(n.pos=this.text.length)}findPointInside(e,t){for(let n of this.points)(e.nodeType==3?n.node==e:e.contains(n.node))&&(n.pos=this.text.length+(_c(e,n.node,n.offset)?t:0))}}function _c(i,e,t){for(;;){if(!e||t<pt(e))return!1;if(e==i)return!0;t=Tt(e)+1,e=e.parentNode}}function zc(i,e){let t;for(;!(i==e||!i);i=i.nextSibling){let n=he.get(i);if(!(n!=null&&n.isWidget()))return!1;n&&(t||(t=[])).push(n)}if(t)for(let n of t){let s=n.overrideDOMText;if(s!=null&&s.length)return!1}return!0}class So{constructor(e,t){this.node=e,this.offset=t,this.pos=-1}}class Fc{constructor(e,t,n,s){this.typeOver=s,this.bounds=null,this.text="",this.domChanged=t>-1;let{impreciseHead:r,impreciseAnchor:o}=e.docView,l=e.state.selection;if(e.state.readOnly&&t>-1)this.newSel=null;else if(t>-1&&(this.bounds=ka(e.docView.tile,t,n,0))){let a=r||o?[]:Wc(e),h=new qc(a,e);h.readRange(this.bounds.startDOM,this.bounds.endDOM),this.text=h.text,this.newSel=Vc(a,this.bounds.from)}else{let a=e.observer.selectionRange,h=r&&r.node==a.focusNode&&r.offset==a.focusOffset||!Ks(e.contentDOM,a.focusNode)?l.main.head:e.docView.posFromDOM(a.focusNode,a.focusOffset),c=o&&o.node==a.anchorNode&&o.offset==a.anchorOffset||!Ks(e.contentDOM,a.anchorNode)?l.main.anchor:e.docView.posFromDOM(a.anchorNode,a.anchorOffset),f=e.viewport;if((B.ios||B.chrome)&&l.main.empty&&h!=c&&(f.from>0||f.to<e.state.doc.length)){let u=Math.min(h,c),d=Math.max(h,c),p=f.from-u,m=f.to-d;(p==0||p==1||u==0)&&(m==0||m==-1||d==e.state.doc.length)&&(h=0,c=e.state.doc.length)}if(e.inputState.composing>-1&&l.ranges.length>1)this.newSel=l.replaceRange(w.range(c,h));else if(e.lineWrapping&&c==h&&!(l.main.empty&&l.main.head==h)&&e.inputState.lastTouchTime>Date.now()-100){let u=e.coordsAtPos(h,-1),d=0;u&&(d=e.inputState.lastTouchY<=u.bottom?-1:1),this.newSel=w.create([w.cursor(h,d)])}else this.newSel=w.single(c,h)}}}function ka(i,e,t,n){if(i.isComposite()){let s=-1,r=-1,o=-1,l=-1;for(let a=0,h=n,c=n;a<i.children.length;a++){let f=i.children[a],u=h+f.length;if(h<e&&u>t)return ka(f,e,t,h);if(u>=e&&s==-1&&(s=a,r=h),h>t&&f.dom.parentNode==i.dom){o=a,l=c;break}c=u,h=u+f.breakAfter}return{from:r,to:l<0?n+i.length:l,startDOM:(s?i.children[s-1].dom.nextSibling:null)||i.dom.firstChild,endDOM:o<i.children.length&&o>=0?i.children[o].dom:null}}else return i.isText()?{from:n,to:n+i.length,startDOM:i.dom,endDOM:i.dom.nextSibling}:null}function xa(i,e){let t,{newSel:n}=e,{state:s}=i,r=s.selection.main,o=i.inputState.lastKeyTime>Date.now()-100?i.inputState.lastKeyCode:-1;if(e.bounds){let{from:l,to:a}=e.bounds,h=r.from,c=null;(o===8||B.android&&e.text.length<a-l)&&(h=r.to,c="end");let f=s.doc.sliceString(l,a,en),u,d;!r.empty&&r.from>=l&&r.to<=a&&(e.typeOver||f!=e.text)&&f.slice(0,r.from-l)==e.text.slice(0,r.from-l)&&f.slice(r.to-l)==e.text.slice(u=e.text.length-(f.length-(r.to-l)))?t={from:r.from,to:r.to,insert:J.of(e.text.slice(r.from-l,u).split(en))}:(d=Sa(f,e.text,h-l,c))&&(B.chrome&&o==13&&d.toB==d.from+2&&e.text.slice(d.from,d.toB)==en+en&&d.toB--,t={from:l+d.from,to:l+d.toA,insert:J.of(e.text.slice(d.from,d.toB).split(en))})}else n&&(!i.hasFocus&&s.facet(ft)||Ri(n,r))&&(n=null);if(!t&&!n)return!1;if((B.mac||B.android)&&t&&t.from==t.to&&t.from==r.head-1&&/^\. ?$/.test(t.insert.toString())&&i.contentDOM.getAttribute("autocorrect")=="off"?(n&&t.insert.length==2&&(n=w.single(n.main.anchor-1,n.main.head-1)),t={from:t.from,to:t.to,insert:J.of([t.insert.toString().replace("."," ")])}):s.doc.lineAt(r.from).to<r.to&&i.docView.lineHasWidget(r.to)&&i.inputState.insertingTextAt>Date.now()-50?t={from:r.from,to:r.to,insert:s.toText(i.inputState.insertingText)}:B.chrome&&t&&t.from==t.to&&t.from==r.head&&t.insert.toString()==`
 `&&i.lineWrapping&&(n&&(n=w.single(n.main.anchor-1,n.main.head-1)),t={from:r.from,to:r.to,insert:J.of([" "])}),t)return Nr(i,t,n,o);if(n&&!Ri(n,r)){let l=!1,a="select";return i.inputState.lastSelectionTime>Date.now()-50&&(i.inputState.lastSelectionOrigin=="select"&&(l=!0),a=i.inputState.lastSelectionOrigin,a=="select.pointer"&&(n=wa(s.facet(Qn).map(h=>h(i)),n))),i.dispatch({selection:n,scrollIntoView:l,userEvent:a}),!0}else return!1}function Nr(i,e,t,n=-1){if(B.ios&&i.inputState.flushIOSKey(e))return!0;let s=i.state.selection.main;if(B.android&&(e.to==s.to&&(e.from==s.from||e.from==s.from-1&&i.state.sliceDoc(e.from,s.from)==" ")&&e.insert.length==1&&e.insert.lines==2&&hn(i.contentDOM,"Enter",13)||(e.from==s.from-1&&e.to==s.to&&e.insert.length==0||n==8&&e.insert.length<e.to-e.from&&e.to>s.head)&&hn(i.contentDOM,"Backspace",8)||e.from==s.from&&e.to==s.to+1&&e.insert.length==0&&hn(i.contentDOM,"Delete",46)))return!0;let r=e.insert.toString();i.inputState.composing>=0&&i.inputState.composing++;let o,l=()=>o||(o=Hc(i,e,t));return i.state.facet(la).some(a=>a(i,e.from,e.to,r,l))||i.dispatch(l()),!0}function Hc(i,e,t){let n,s=i.state,r=s.selection.main,o=-1;if(e.from==e.to&&e.from<r.from||e.from>r.to){let a=e.from<r.from?-1:1,h=a<0?r.from:r.to,c=qn(s.facet(Qn).map(f=>f(i)),h,a);e.from==c&&(o=c)}if(o>-1)n={changes:e,selection:w.cursor(e.from+e.insert.length,-1)};else if(e.from>=r.from&&e.to<=r.to&&e.to-e.from>=(r.to-r.from)/3&&(!t||t.main.empty&&t.main.from==e.from+e.insert.length)&&i.inputState.composing<0){let a=r.from<e.from?s.sliceDoc(r.from,e.from):"",h=r.to>e.to?s.sliceDoc(e.to,r.to):"";n=s.replaceSelection(i.state.toText(a+e.insert.sliceString(0,void 0,i.state.lineBreak)+h))}else{let a=s.changes(e),h=t&&t.main.to<=a.newLength?t.main:void 0;if(s.selection.ranges.length>1&&(i.inputState.composing>=0||i.inputState.compositionPendingChange)&&e.to<=r.to+10&&e.to>=r.to-10){let c=i.state.sliceDoc(e.from,e.to),f,u=t&&va(i,t.main.head);if(u){let p=e.insert.length-(e.to-e.from);f={from:u.from,to:u.to-p}}else f=i.state.doc.lineAt(r.head);let d=r.to-e.to;n=s.changeByRange(p=>{if(p.from==r.from&&p.to==r.to)return{changes:a,range:h||p.map(a)};let m=p.to-d,g=m-c.length;if(i.state.sliceDoc(g,m)!=c||m>=f.from&&g<=f.to)return{range:p};let b=s.changes({from:g,to:m,insert:e.insert}),x=p.to-r.to;return{changes:b,range:h?w.range(Math.max(0,h.anchor+x),Math.max(0,h.head+x)):p.map(b)}})}else n={changes:a,selection:h&&s.selection.replaceRange(h)}}let l="input.type";return(i.composing||i.inputState.compositionPendingChange&&i.inputState.compositionEndedAt>Date.now()-50)&&(i.inputState.compositionPendingChange=!1,l+=".compose",i.inputState.compositionFirstChange&&(l+=".start",i.inputState.compositionFirstChange=!1)),s.update(n,{userEvent:l,scrollIntoView:!0})}function Sa(i,e,t,n){let s=Math.min(i.length,e.length),r=0;for(;r<s&&i.charCodeAt(r)==e.charCodeAt(r);)r++;if(r==s&&i.length==e.length)return null;let o=i.length,l=e.length;for(;o>0&&l>0&&i.charCodeAt(o-1)==e.charCodeAt(l-1);)o--,l--;if(n=="end"){let a=Math.max(0,r-Math.min(o,l));t-=o+a-r}if(o<r&&i.length<e.length){let a=t<=r&&t>=o?r-t:0;r-=a,l=r+(l-o),o=r}else if(l<r){let a=t<=r&&t>=l?r-t:0;r-=a,o=r+(o-l),l=r}return{from:r,toA:o,toB:l}}function Wc(i){let e=[];if(i.root.activeElement!=i.contentDOM)return e;let{anchorNode:t,anchorOffset:n,focusNode:s,focusOffset:r}=i.observer.selectionRange;return t&&(e.push(new So(t,n)),(s!=t||r!=n)&&e.push(new So(s,r))),e}function Vc(i,e){if(i.length==0)return null;let t=i[0].pos,n=i.length==2?i[1].pos:t;return t>-1&&n>-1?w.single(t+e,n+e):null}function Ri(i,e){return e.head==i.main.head&&e.anchor==i.main.anchor}class $c{setSelectionOrigin(e){this.lastSelectionOrigin=e,this.lastSelectionTime=Date.now()}constructor(e){this.view=e,this.lastKeyCode=0,this.lastKeyTime=0,this.lastTouchTime=0,this.lastTouchX=0,this.lastTouchY=0,this.lastFocusTime=0,this.lastScrollTop=0,this.lastScrollLeft=0,this.lastWheelEvent=0,this.pendingIOSKey=void 0,this.tabFocusMode=-1,this.lastSelectionOrigin=null,this.lastSelectionTime=0,this.lastContextMenu=0,this.scrollHandlers=[],this.handlers=Object.create(null),this.composing=-1,this.compositionFirstChange=null,this.compositionEndedAt=0,this.compositionPendingKey=!1,this.compositionPendingChange=!1,this.insertingText="",this.insertingTextAt=0,this.mouseSelection=null,this.draggedContent=null,this.handleEvent=this.handleEvent.bind(this),this.notifiedFocused=e.hasFocus,B.safari&&e.contentDOM.addEventListener("input",()=>null),B.gecko&&r3(e.contentDOM.ownerDocument)}handleEvent(e){!Qc(this.view,e)||this.ignoreDuringComposition(e)||e.type=="keydown"&&this.keydown(e)||(this.view.updateState!=0?Promise.resolve().then(()=>this.runHandlers(e.type,e)):this.runHandlers(e.type,e))}runHandlers(e,t){let n=this.handlers[e];if(n){for(let s of n.observers)s(this.view,t);for(let s of n.handlers){if(t.defaultPrevented)break;if(s(this.view,t)){t.preventDefault();break}}}}ensureHandlers(e){let t=Uc(e),n=this.handlers,s=this.view.contentDOM;for(let r in t)if(r!="scroll"){let o=!t[r].handlers.length,l=n[r];l&&o!=!l.handlers.length&&(s.removeEventListener(r,this.handleEvent),l=null),l||s.addEventListener(r,this.handleEvent,{passive:o})}for(let r in n)r!="scroll"&&!t[r]&&s.removeEventListener(r,this.handleEvent);this.handlers=t}keydown(e){if(this.lastKeyCode=e.keyCode,this.lastKeyTime=Date.now(),e.keyCode==9&&this.tabFocusMode>-1&&(!this.tabFocusMode||Date.now()<=this.tabFocusMode))return!0;if(this.tabFocusMode>0&&e.keyCode!=27&&Ca.indexOf(e.keyCode)<0&&(this.tabFocusMode=-1),B.android&&B.chrome&&!e.synthetic&&(e.keyCode==13||e.keyCode==8))return this.view.observer.delayAndroidKey(e.key,e.keyCode),!0;let t;return B.ios&&!e.synthetic&&!e.altKey&&!e.metaKey&&!e.shiftKey&&((t=Aa.find(n=>n.keyCode==e.keyCode))&&!e.ctrlKey||Kc.indexOf(e.key)>-1&&e.ctrlKey)?(this.pendingIOSKey=t||e,setTimeout(()=>this.flushIOSKey(),250),!0):(e.keyCode!=229&&this.view.observer.forceFlush(),!1)}flushIOSKey(e){let t=this.pendingIOSKey;return!t||t.key=="Enter"&&e&&e.from<e.to&&/^\S+$/.test(e.insert.toString())?!1:(this.pendingIOSKey=void 0,hn(this.view.contentDOM,t.key,t.keyCode,t instanceof KeyboardEvent?t:void 0))}ignoreDuringComposition(e){return!/^key/.test(e.type)||e.synthetic?!1:this.composing>0?!0:B.safari&&!B.ios&&this.compositionPendingKey&&Date.now()-this.compositionEndedAt<100?(this.compositionPendingKey=!1,!0):!1}startMouseSelection(e){this.mouseSelection&&this.mouseSelection.destroy(),this.mouseSelection=e}update(e){this.view.observer.update(e),this.mouseSelection&&this.mouseSelection.update(e),this.draggedContent&&e.docChanged&&(this.draggedContent=this.draggedContent.map(e.changes)),e.transactions.length&&(this.lastKeyCode=this.lastSelectionTime=0)}destroy(){this.mouseSelection&&this.mouseSelection.destroy()}}function Ao(i,e){return(t,n)=>{try{return e.call(i,n,t)}catch(s){it(t.state,s)}}}function Uc(i){let e=Object.create(null);function t(n){return e[n]||(e[n]={observers:[],handlers:[]})}for(let n of i){let s=n.spec,r=s&&s.plugin.domEventHandlers,o=s&&s.plugin.domEventObservers;if(r)for(let l in r){let a=r[l];a&&t(l).handlers.push(Ao(n.value,a))}if(o)for(let l in o){let a=o[l];a&&t(l).observers.push(Ao(n.value,a))}}for(let n in je)t(n).handlers.push(je[n]);for(let n in Oe)t(n).observers.push(Oe[n]);return e}const Aa=[{key:"Backspace",keyCode:8,inputType:"deleteContentBackward"},{key:"Enter",keyCode:13,inputType:"insertParagraph"},{key:"Enter",keyCode:13,inputType:"insertLineBreak"},{key:"Delete",keyCode:46,inputType:"deleteContentForward"}],Kc="dthko",Ca=[16,17,18,20,91,92,224,225],si=6;function ri(i){return Math.max(0,i)*.7+8}function jc(i,e){return Math.max(Math.abs(i.clientX-e.clientX),Math.abs(i.clientY-e.clientY))}class Gc{constructor(e,t,n,s){this.view=e,this.startEvent=t,this.style=n,this.mustSelect=s,this.scrollSpeed={x:0,y:0},this.scrolling=-1,this.lastEvent=t,this.scrollParents=jl(e.contentDOM),this.atoms=e.state.facet(Qn).map(o=>o(e));let r=e.contentDOM.ownerDocument;r.addEventListener("mousemove",this.move=this.move.bind(this)),r.addEventListener("mouseup",this.up=this.up.bind(this)),this.extend=t.shiftKey,this.multiple=e.state.facet(Z.allowMultipleSelections)&&Xc(e,t),this.dragging=Yc(e,t)&&Ea(t)==1?null:!1}start(e){this.dragging===!1&&this.select(e)}move(e){if(e.buttons==0)return this.destroy();if(this.dragging||this.dragging==null&&jc(this.startEvent,e)<10)return;this.select(this.lastEvent=e);let t=0,n=0,s=0,r=0,o=this.view.win.innerWidth,l=this.view.win.innerHeight;this.scrollParents.x&&({left:s,right:o}=this.scrollParents.x.getBoundingClientRect()),this.scrollParents.y&&({top:r,bottom:l}=this.scrollParents.y.getBoundingClientRect());let a=ba(this.view);e.clientX-a.left<=s+si?t=-ri(s-e.clientX):e.clientX+a.right>=o-si&&(t=ri(e.clientX-o)),e.clientY-a.top<=r+si?n=-ri(r-e.clientY):e.clientY+a.bottom>=l-si&&(n=ri(e.clientY-l)),this.setScrollSpeed(t,n)}up(e){this.dragging==null&&this.select(this.lastEvent),this.dragging||e.preventDefault(),this.destroy()}destroy(){this.setScrollSpeed(0,0);let e=this.view.contentDOM.ownerDocument;e.removeEventListener("mousemove",this.move),e.removeEventListener("mouseup",this.up),this.view.inputState.mouseSelection=this.view.inputState.draggedContent=null}setScrollSpeed(e,t){this.scrollSpeed={x:e,y:t},e||t?this.scrolling<0&&(this.scrolling=setInterval(()=>this.scroll(),50)):this.scrolling>-1&&(clearInterval(this.scrolling),this.scrolling=-1)}scroll(){let{x:e,y:t}=this.scrollSpeed;e&&this.scrollParents.x&&(this.scrollParents.x.scrollLeft+=e,e=0),t&&this.scrollParents.y&&(this.scrollParents.y.scrollTop+=t,t=0),(e||t)&&this.view.win.scrollBy(e,t),this.dragging===!1&&this.select(this.lastEvent)}select(e){let{view:t}=this,n=wa(this.atoms,this.style.get(e,this.extend,this.multiple));(this.mustSelect||!n.eq(t.state.selection,this.dragging===!1))&&this.view.dispatch({selection:n,userEvent:"select.pointer"}),this.mustSelect=!1}update(e){e.transactions.some(t=>t.isUserEvent("input.type"))?this.destroy():this.style.update(e)&&setTimeout(()=>this.select(this.lastEvent),20)}}function Xc(i,e){let t=i.state.facet(ia);return t.length?t[0](e):B.mac?e.metaKey:e.ctrlKey}function Jc(i,e){let t=i.state.facet(sa);return t.length?t[0](e):B.mac?!e.altKey:!e.ctrlKey}function Yc(i,e){let{main:t}=i.state.selection;if(t.empty)return!1;let n=$n(i.root);if(!n||n.rangeCount==0)return!0;let s=n.getRangeAt(0).getClientRects();for(let r=0;r<s.length;r++){let o=s[r];if(o.left<=e.clientX&&o.right>=e.clientX&&o.top<=e.clientY&&o.bottom>=e.clientY)return!0}return!1}function Qc(i,e){if(!e.bubbles)return!0;if(e.defaultPrevented)return!1;for(let t=e.target,n;t!=i.contentDOM;t=t.parentNode)if(!t||t.nodeType==11||(n=he.get(t))&&n.isWidget()&&!n.isHidden&&n.widget.ignoreEvent(e))return!1;return!0}const je=Object.create(null),Oe=Object.create(null),Ma=B.ie&&B.ie_version<15||B.ios&&B.webkit_version<604;function Zc(i){let e=i.dom.parentNode;if(!e)return;let t=e.appendChild(document.createElement("textarea"));t.style.cssText="position: fixed; left: -10000px; top: 10px",t.focus(),setTimeout(()=>{i.focus(),t.remove(),Ta(i,t.value)},50)}function Xi(i,e,t){for(let n of i.facet(e))t=n(t,i);return t}function Ta(i,e){e=Xi(i.state,Pr,e);let{state:t}=i,n,s=1,r=t.toText(e),o=r.lines==t.selection.ranges.length;if(er!=null&&t.selection.ranges.every(a=>a.empty)&&er==r.toString()){let a=-1;n=t.changeByRange(h=>{let c=t.doc.lineAt(h.from);if(c.from==a)return{range:h};a=c.from;let f=t.toText((o?r.line(s++).text:e)+t.lineBreak);return{changes:{from:c.from,insert:f},range:w.cursor(h.from+f.length)}})}else o?n=t.changeByRange(a=>{let h=r.line(s++);return{changes:{from:a.from,to:a.to,insert:h.text},range:w.cursor(a.from+h.length)}}):n=t.replaceSelection(r);i.dispatch(n,{userEvent:"input.paste",scrollIntoView:!0})}Oe.scroll=i=>{i.inputState.lastScrollTop=i.scrollDOM.scrollTop,i.inputState.lastScrollLeft=i.scrollDOM.scrollLeft};Oe.wheel=Oe.mousewheel=i=>{i.inputState.lastWheelEvent=Date.now()};je.keydown=(i,e)=>(i.inputState.setSelectionOrigin("select"),e.keyCode==27&&i.inputState.tabFocusMode!=0&&(i.inputState.tabFocusMode=Date.now()+2e3),!1);Oe.touchstart=(i,e)=>{let t=i.inputState,n=e.targetTouches[0];t.lastTouchTime=Date.now(),n&&(t.lastTouchX=n.clientX,t.lastTouchY=n.clientY),t.setSelectionOrigin("select.pointer")};Oe.touchmove=i=>{i.inputState.setSelectionOrigin("select.pointer")};je.mousedown=(i,e)=>{if(i.observer.flush(),i.inputState.lastTouchTime>Date.now()-2e3)return!1;let t=null;for(let n of i.state.facet(ra))if(t=n(i,e),t)break;if(!t&&e.button==0&&(t=t3(i,e)),t){let n=!i.hasFocus;i.inputState.startMouseSelection(new Gc(i,e,t,n)),n&&i.observer.ignore(()=>{Gl(i.contentDOM);let r=i.root.activeElement;r&&!r.contains(i.contentDOM)&&r.blur()});let s=i.inputState.mouseSelection;if(s)return s.start(e),s.dragging===!1}else i.inputState.setSelectionOrigin("select.pointer");return!1};function Co(i,e,t,n){if(n==1)return w.cursor(e,t);if(n==2)return Oc(i.state,e,t);{let s=i.docView.lineAt(e,t),r=i.state.doc.lineAt(s?s.posAtEnd:e),o=s?s.posAtStart:r.from,l=s?s.posAtEnd:r.to;return l<i.state.doc.length&&l==r.to&&l++,w.range(o,l)}}const e3=B.ie&&B.ie_version<=11;let Mo=null,To=0,Eo=0;function Ea(i){if(!e3)return i.detail;let e=Mo,t=Eo;return Mo=i,Eo=Date.now(),To=!e||t>Date.now()-400&&Math.abs(e.clientX-i.clientX)<2&&Math.abs(e.clientY-i.clientY)<2?(To+1)%3:1}function t3(i,e){let t=i.posAndSideAtCoords({x:e.clientX,y:e.clientY},!1),n=Ea(e),s=i.state.selection;return{update(r){r.docChanged&&(t.pos=r.changes.mapPos(t.pos),s=s.map(r.changes))},get(r,o,l){let a=i.posAndSideAtCoords({x:r.clientX,y:r.clientY},!1),h,c=Co(i,a.pos,a.assoc,n);if(t.pos!=a.pos&&!o){let f=Co(i,t.pos,t.assoc,n),u=Math.min(f.from,c.from),d=Math.max(f.to,c.to);c=u<c.from?w.range(u,d,c.assoc):w.range(d,u,c.assoc)}return o?s.replaceRange(s.main.extend(c.from,c.to,c.assoc)):l&&n==1&&s.ranges.length>1&&(h=n3(s,a.pos))?h:l?s.addRange(c):w.create([c])}}}function n3(i,e){for(let t=0;t<i.ranges.length;t++){let{from:n,to:s}=i.ranges[t];if(n<=e&&s>=e)return w.create(i.ranges.slice(0,t).concat(i.ranges.slice(t+1)),i.mainIndex==t?0:i.mainIndex-(i.mainIndex>t?1:0))}return null}je.dragstart=(i,e)=>{let{selection:{main:t}}=i.state;if(e.target.draggable){let s=i.docView.tile.nearest(e.target);if(s&&s.isWidget()){let r=s.posAtStart,o=r+s.length;(r>=t.to||o<=t.from)&&(t=w.range(r,o))}}let{inputState:n}=i;return n.mouseSelection&&(n.mouseSelection.dragging=!0),n.draggedContent=t,e.dataTransfer&&(e.dataTransfer.setData("Text",Xi(i.state,Lr,i.state.sliceDoc(t.from,t.to))),e.dataTransfer.effectAllowed="copyMove"),!1};je.dragend=i=>(i.inputState.draggedContent=null,!1);function Bo(i,e,t,n){if(t=Xi(i.state,Pr,t),!t)return;let s=i.posAtCoords({x:e.clientX,y:e.clientY},!1),{draggedContent:r}=i.inputState,o=n&&r&&Jc(i,e)?{from:r.from,to:r.to}:null,l={from:s,insert:t},a=i.state.changes(o?[o,l]:l);i.focus(),i.dispatch({changes:a,selection:{anchor:a.mapPos(s,-1),head:a.mapPos(s,1)},userEvent:o?"move.drop":"input.drop"}),i.inputState.draggedContent=null}je.drop=(i,e)=>{if(!e.dataTransfer)return!1;if(i.state.readOnly)return!0;let t=e.dataTransfer.files;if(t&&t.length){let n=Array(t.length),s=0,r=()=>{++s==t.length&&Bo(i,e,n.filter(o=>o!=null).join(i.state.lineBreak),!1)};for(let o=0;o<t.length;o++){let l=new FileReader;l.onerror=r,l.onload=()=>{/[\x00-\x08\x0e-\x1f]{2}/.test(l.result)||(n[o]=l.result),r()},l.readAsText(t[o])}return!0}else{let n=e.dataTransfer.getData("Text");if(n)return Bo(i,e,n,!0),!0}return!1};je.paste=(i,e)=>{if(i.state.readOnly)return!0;i.observer.flush();let t=Ma?null:e.clipboardData;return t?(Ta(i,t.getData("text/plain")||t.getData("text/uri-list")),!0):(Zc(i),!1)};function i3(i,e){let t=i.dom.parentNode;if(!t)return;let n=t.appendChild(document.createElement("textarea"));n.style.cssText="position: fixed; left: -10000px; top: 10px",n.value=e,n.focus(),n.selectionEnd=e.length,n.selectionStart=0,setTimeout(()=>{n.remove(),i.focus()},50)}function s3(i){let e=[],t=[],n=!1;for(let s of i.selection.ranges)s.empty||(e.push(i.sliceDoc(s.from,s.to)),t.push(s));if(!e.length){let s=-1;for(let{from:r}of i.selection.ranges){let o=i.doc.lineAt(r);o.number>s&&(e.push(o.text),t.push({from:o.from,to:Math.min(i.doc.length,o.to+1)})),s=o.number}n=!0}return{text:Xi(i,Lr,e.join(i.lineBreak)),ranges:t,linewise:n}}let er=null;je.copy=je.cut=(i,e)=>{if(!In(i.contentDOM,i.observer.selectionRange))return!1;let{text:t,ranges:n,linewise:s}=s3(i.state);if(!t&&!s)return!1;er=s?t:null,e.type=="cut"&&!i.state.readOnly&&i.dispatch({changes:n,scrollIntoView:!0,userEvent:"delete.cut"});let r=Ma?null:e.clipboardData;return r?(r.clearData(),r.setData("text/plain",t),!0):(i3(i,t),!1)};const Ba=Ot.define();function Da(i,e){let t=[];for(let n of i.facet(aa)){let s=n(i,e);s&&t.push(s)}return t.length?i.update({effects:t,annotations:Ba.of(!0)}):null}function Oa(i){setTimeout(()=>{let e=i.hasFocus;if(e!=i.inputState.notifiedFocused){let t=Da(i.state,e);t?i.dispatch(t):i.update([])}},10)}Oe.focus=i=>{i.inputState.lastFocusTime=Date.now(),!i.scrollDOM.scrollTop&&(i.inputState.lastScrollTop||i.inputState.lastScrollLeft)&&(i.scrollDOM.scrollTop=i.inputState.lastScrollTop,i.scrollDOM.scrollLeft=i.inputState.lastScrollLeft),Oa(i)};Oe.blur=i=>{i.observer.clearSelectionRange(),Oa(i)};Oe.compositionstart=Oe.compositionupdate=i=>{i.observer.editContext||(i.inputState.compositionFirstChange==null&&(i.inputState.compositionFirstChange=!0),i.inputState.composing<0&&(i.inputState.composing=0))};Oe.compositionend=i=>{i.observer.editContext||(i.inputState.composing=-1,i.inputState.compositionEndedAt=Date.now(),i.inputState.compositionPendingKey=!0,i.inputState.compositionPendingChange=i.observer.pendingRecords().length>0,i.inputState.compositionFirstChange=null,B.chrome&&B.android?i.observer.flushSoon():i.inputState.compositionPendingChange?Promise.resolve().then(()=>i.observer.flush()):setTimeout(()=>{i.inputState.composing<0&&i.docView.hasComposition&&i.update([])},50))};Oe.contextmenu=i=>{i.inputState.lastContextMenu=Date.now()};je.beforeinput=(i,e)=>{var t,n;if((e.inputType=="insertText"||e.inputType=="insertCompositionText")&&(i.inputState.insertingText=e.data,i.inputState.insertingTextAt=Date.now()),e.inputType=="insertReplacementText"&&i.observer.editContext){let r=(t=e.dataTransfer)===null||t===void 0?void 0:t.getData("text/plain"),o=e.getTargetRanges();if(r&&o.length){let l=o[0],a=i.posAtDOM(l.startContainer,l.startOffset),h=i.posAtDOM(l.endContainer,l.endOffset);return Nr(i,{from:a,to:h,insert:i.state.toText(r)},null),!0}}let s;if(B.chrome&&B.android&&(s=Aa.find(r=>r.inputType==e.inputType))&&(i.observer.delayAndroidKey(s.key,s.keyCode),s.key=="Backspace"||s.key=="Delete")){let r=((n=window.visualViewport)===null||n===void 0?void 0:n.height)||0;setTimeout(()=>{var o;(((o=window.visualViewport)===null||o===void 0?void 0:o.height)||0)>r+10&&i.hasFocus&&(i.contentDOM.blur(),i.focus())},100)}return B.ios&&e.inputType=="deleteContentForward"&&i.observer.flushSoon(),B.safari&&e.inputType=="insertText"&&i.inputState.composing>=0&&setTimeout(()=>Oe.compositionend(i,e),20),!1};const Do=new Set;function r3(i){Do.has(i)||(Do.add(i),i.addEventListener("copy",()=>{}),i.addEventListener("cut",()=>{}))}const Oo=["pre-wrap","normal","pre-line","break-spaces"];let pn=!1;function Po(){pn=!1}class o3{constructor(e){this.lineWrapping=e,this.doc=J.empty,this.heightSamples={},this.lineHeight=14,this.charWidth=7,this.textHeight=14,this.lineLength=30}heightForGap(e,t){let n=this.doc.lineAt(t).number-this.doc.lineAt(e).number+1;return this.lineWrapping&&(n+=Math.max(0,Math.ceil((t-e-n*this.lineLength*.5)/this.lineLength))),this.lineHeight*n}heightForLine(e){return this.lineWrapping?(1+Math.max(0,Math.ceil((e-this.lineLength)/Math.max(1,this.lineLength-5))))*this.lineHeight:this.lineHeight}setDoc(e){return this.doc=e,this}mustRefreshForWrapping(e){return Oo.indexOf(e)>-1!=this.lineWrapping}mustRefreshForHeights(e){let t=!1;for(let n=0;n<e.length;n++){let s=e[n];s<0?n++:this.heightSamples[Math.floor(s*10)]||(t=!0,this.heightSamples[Math.floor(s*10)]=!0)}return t}refresh(e,t,n,s,r,o){let l=Oo.indexOf(e)>-1,a=Math.abs(t-this.lineHeight)>.3||this.lineWrapping!=l||Math.abs(n-this.charWidth)>.1;if(this.lineWrapping=l,this.lineHeight=t,this.charWidth=n,this.textHeight=s,this.lineLength=r,a){this.heightSamples={};for(let h=0;h<o.length;h++){let c=o[h];c<0?h++:this.heightSamples[Math.floor(c*10)]=!0}}return a}}class l3{constructor(e,t){this.from=e,this.heights=t,this.index=0}get more(){return this.index<this.heights.length}}class $e{constructor(e,t,n,s,r){this.from=e,this.length=t,this.top=n,this.height=s,this._content=r}get type(){return typeof this._content=="number"?ke.Text:Array.isArray(this._content)?this._content:this._content.type}get to(){return this.from+this.length}get bottom(){return this.top+this.height}get widget(){return this._content instanceof $t?this._content.widget:null}get widgetLineBreaks(){return typeof this._content=="number"?this._content:0}join(e){let t=(Array.isArray(this._content)?this._content:[this]).concat(Array.isArray(e._content)?e._content:[e]);return new $e(this.from,this.length+e.length,this.top,this.height+e.height,t)}}var re=(function(i){return i[i.ByPos=0]="ByPos",i[i.ByHeight=1]="ByHeight",i[i.ByPosNoHeight=2]="ByPosNoHeight",i})(re||(re={}));const xi=.001;class Te{constructor(e,t,n=2){this.length=e,this.height=t,this.flags=n}get outdated(){return(this.flags&2)>0}set outdated(e){this.flags=(e?2:0)|this.flags&-3}setHeight(e){this.height!=e&&(Math.abs(this.height-e)>xi&&(pn=!0),this.height=e)}replace(e,t,n){return Te.of(n)}decomposeLeft(e,t){t.push(this)}decomposeRight(e,t){t.push(this)}applyChanges(e,t,n,s){let r=this,o=n.doc;for(let l=s.length-1;l>=0;l--){let{fromA:a,toA:h,fromB:c,toB:f}=s[l],u=r.lineAt(a,re.ByPosNoHeight,n.setDoc(t),0,0),d=u.to>=h?u:r.lineAt(h,re.ByPosNoHeight,n,0,0);for(f+=d.to-h,h=d.to;l>0&&u.from<=s[l-1].toA;)a=s[l-1].fromA,c=s[l-1].fromB,l--,a<u.from&&(u=r.lineAt(a,re.ByPosNoHeight,n,0,0));c+=u.from-a,a=u.from;let p=qr.build(n.setDoc(o),e,c,f);r=Ii(r,r.replace(a,h,p))}return r.updateHeight(n,0)}static empty(){return new Re(0,0,0)}static of(e){if(e.length==1)return e[0];let t=0,n=e.length,s=0,r=0;for(;;)if(t==n)if(s>r*2){let l=e[t-1];l.break?e.splice(--t,1,l.left,null,l.right):e.splice(--t,1,l.left,l.right),n+=1+l.break,s-=l.size}else if(r>s*2){let l=e[n];l.break?e.splice(n,1,l.left,null,l.right):e.splice(n,1,l.left,l.right),n+=2+l.break,r-=l.size}else break;else if(s<r){let l=e[t++];l&&(s+=l.size)}else{let l=e[--n];l&&(r+=l.size)}let o=0;return e[t-1]==null?(o=1,t--):e[t]==null&&(o=1,n++),new h3(Te.of(e.slice(0,t)),o,Te.of(e.slice(n)))}}function Ii(i,e){return i==e?i:(i.constructor!=e.constructor&&(pn=!0),e)}Te.prototype.size=1;const a3=pe.replace({});class Pa extends Te{constructor(e,t,n){super(e,t),this.deco=n,this.spaceAbove=0}mainBlock(e,t){return new $e(t,this.length,e+this.spaceAbove,this.height-this.spaceAbove,this.deco||0)}blockAt(e,t,n,s){return this.spaceAbove&&e<n+this.spaceAbove?new $e(s,0,n,this.spaceAbove,a3):this.mainBlock(n,s)}lineAt(e,t,n,s,r){let o=this.mainBlock(s,r);return this.spaceAbove?this.blockAt(0,n,s,r).join(o):o}forEachLine(e,t,n,s,r,o){e<=r+this.length&&t>=r&&o(this.lineAt(0,re.ByPos,n,s,r))}setMeasuredHeight(e){let t=e.heights[e.index++];t<0?(this.spaceAbove=-t,t=e.heights[e.index++]):this.spaceAbove=0,this.setHeight(t)}updateHeight(e,t=0,n=!1,s){return s&&s.from<=t&&s.more&&this.setMeasuredHeight(s),this.outdated=!1,this}toString(){return`block(${this.length})`}}class Re extends Pa{constructor(e,t,n){super(e,t,null),this.collapsed=0,this.widgetHeight=0,this.breaks=0,this.spaceAbove=n}mainBlock(e,t){return new $e(t,this.length,e+this.spaceAbove,this.height-this.spaceAbove,this.breaks)}replace(e,t,n){let s=n[0];return n.length==1&&(s instanceof Re||s instanceof ve&&s.flags&4)&&Math.abs(this.length-s.length)<10?(s instanceof ve?s=new Re(s.length,this.height,this.spaceAbove):s.height=this.height,this.outdated||(s.outdated=!1),s):Te.of(n)}updateHeight(e,t=0,n=!1,s){return s&&s.from<=t&&s.more?this.setMeasuredHeight(s):(n||this.outdated)&&(this.spaceAbove=0,this.setHeight(Math.max(this.widgetHeight,e.heightForLine(this.length-this.collapsed))+this.breaks*e.lineHeight)),this.outdated=!1,this}toString(){return`line(${this.length}${this.collapsed?-this.collapsed:""}${this.widgetHeight?":"+this.widgetHeight:""})`}}class ve extends Te{constructor(e){super(e,0)}heightMetrics(e,t){let n=e.doc.lineAt(t).number,s=e.doc.lineAt(t+this.length).number,r=s-n+1,o,l=0;if(e.lineWrapping){let a=Math.min(this.height,e.lineHeight*r);o=a/r,this.length>r+1&&(l=(this.height-a)/(this.length-r-1))}else o=this.height/r;return{firstLine:n,lastLine:s,perLine:o,perChar:l}}blockAt(e,t,n,s){let{firstLine:r,lastLine:o,perLine:l,perChar:a}=this.heightMetrics(t,s);if(t.lineWrapping){let h=s+(e<t.lineHeight?0:Math.round(Math.max(0,Math.min(1,(e-n)/this.height))*this.length)),c=t.doc.lineAt(h),f=l+c.length*a,u=Math.max(n,e-f/2);return new $e(c.from,c.length,u,f,0)}else{let h=Math.max(0,Math.min(o-r,Math.floor((e-n)/l))),{from:c,length:f}=t.doc.line(r+h);return new $e(c,f,n+l*h,l,0)}}lineAt(e,t,n,s,r){if(t==re.ByHeight)return this.blockAt(e,n,s,r);if(t==re.ByPosNoHeight){let{from:d,to:p}=n.doc.lineAt(e);return new $e(d,p-d,0,0,0)}let{firstLine:o,perLine:l,perChar:a}=this.heightMetrics(n,r),h=n.doc.lineAt(e),c=l+h.length*a,f=h.number-o,u=s+l*f+a*(h.from-r-f);return new $e(h.from,h.length,Math.max(s,Math.min(u,s+this.height-c)),c,0)}forEachLine(e,t,n,s,r,o){e=Math.max(e,r),t=Math.min(t,r+this.length);let{firstLine:l,perLine:a,perChar:h}=this.heightMetrics(n,r);for(let c=e,f=s;c<=t;){let u=n.doc.lineAt(c);if(c==e){let p=u.number-l;f+=a*p+h*(e-r-p)}let d=a+h*u.length;o(new $e(u.from,u.length,f,d,0)),f+=d,c=u.to+1}}replace(e,t,n){let s=this.length-t;if(s>0){let r=n[n.length-1];r instanceof ve?n[n.length-1]=new ve(r.length+s):n.push(null,new ve(s-1))}if(e>0){let r=n[0];r instanceof ve?n[0]=new ve(e+r.length):n.unshift(new ve(e-1),null)}return Te.of(n)}decomposeLeft(e,t){t.push(new ve(e-1),null)}decomposeRight(e,t){t.push(null,new ve(this.length-e-1))}updateHeight(e,t=0,n=!1,s){let r=t+this.length;if(s&&s.from<=t+this.length&&s.more){let o=[],l=Math.max(t,s.from),a=-1;for(s.from>t&&o.push(new ve(s.from-t-1).updateHeight(e,t));l<=r&&s.more;){let c=e.doc.lineAt(l).length;o.length&&o.push(null);let f=s.heights[s.index++],u=0;f<0&&(u=-f,f=s.heights[s.index++]),a==-1?a=f:Math.abs(f-a)>=xi&&(a=-2);let d=new Re(c,f,u);d.outdated=!1,o.push(d),l+=c+1}l<=r&&o.push(null,new ve(r-l).updateHeight(e,l));let h=Te.of(o);return(a<0||Math.abs(h.height-this.height)>=xi||Math.abs(a-this.heightMetrics(e,t).perLine)>=xi)&&(pn=!0),Ii(this,h)}else(n||this.outdated)&&(this.setHeight(e.heightForGap(t,t+this.length)),this.outdated=!1);return this}toString(){return`gap(${this.length})`}}class h3 extends Te{constructor(e,t,n){super(e.length+t+n.length,e.height+n.height,t|(e.outdated||n.outdated?2:0)),this.left=e,this.right=n,this.size=e.size+n.size}get break(){return this.flags&1}blockAt(e,t,n,s){let r=n+this.left.height;return e<r?this.left.blockAt(e,t,n,s):this.right.blockAt(e,t,r,s+this.left.length+this.break)}lineAt(e,t,n,s,r){let o=s+this.left.height,l=r+this.left.length+this.break,a=t==re.ByHeight?e<o:e<l,h=a?this.left.lineAt(e,t,n,s,r):this.right.lineAt(e,t,n,o,l);if(this.break||(a?h.to<l:h.from>l))return h;let c=t==re.ByPosNoHeight?re.ByPosNoHeight:re.ByPos;return a?h.join(this.right.lineAt(l,c,n,o,l)):this.left.lineAt(l,c,n,s,r).join(h)}forEachLine(e,t,n,s,r,o){let l=s+this.left.height,a=r+this.left.length+this.break;if(this.break)e<a&&this.left.forEachLine(e,t,n,s,r,o),t>=a&&this.right.forEachLine(e,t,n,l,a,o);else{let h=this.lineAt(a,re.ByPos,n,s,r);e<h.from&&this.left.forEachLine(e,h.from-1,n,s,r,o),h.to>=e&&h.from<=t&&o(h),t>h.to&&this.right.forEachLine(h.to+1,t,n,l,a,o)}}replace(e,t,n){let s=this.left.length+this.break;if(t<s)return this.balanced(this.left.replace(e,t,n),this.right);if(e>this.left.length)return this.balanced(this.left,this.right.replace(e-s,t-s,n));let r=[];e>0&&this.decomposeLeft(e,r);let o=r.length;for(let l of n)r.push(l);if(e>0&&Lo(r,o-1),t<this.length){let l=r.length;this.decomposeRight(t,r),Lo(r,l)}return Te.of(r)}decomposeLeft(e,t){let n=this.left.length;if(e<=n)return this.left.decomposeLeft(e,t);t.push(this.left),this.break&&(n++,e>=n&&t.push(null)),e>n&&this.right.decomposeLeft(e-n,t)}decomposeRight(e,t){let n=this.left.length,s=n+this.break;if(e>=s)return this.right.decomposeRight(e-s,t);e<n&&this.left.decomposeRight(e,t),this.break&&e<s&&t.push(null),t.push(this.right)}balanced(e,t){return e.size>2*t.size||t.size>2*e.size?Te.of(this.break?[e,null,t]:[e,t]):(this.left=Ii(this.left,e),this.right=Ii(this.right,t),this.setHeight(e.height+t.height),this.outdated=e.outdated||t.outdated,this.size=e.size+t.size,this.length=e.length+this.break+t.length,this)}updateHeight(e,t=0,n=!1,s){let{left:r,right:o}=this,l=t+r.length+this.break,a=null;return s&&s.from<=t+r.length&&s.more?a=r=r.updateHeight(e,t,n,s):r.updateHeight(e,t,n),s&&s.from<=l+o.length&&s.more?a=o=o.updateHeight(e,l,n,s):o.updateHeight(e,l,n),a?this.balanced(r,o):(this.height=this.left.height+this.right.height,this.outdated=!1,this)}toString(){return this.left+(this.break?" ":"-")+this.right}}function Lo(i,e){let t,n;i[e]==null&&(t=i[e-1])instanceof ve&&(n=i[e+1])instanceof ve&&i.splice(e-1,3,new ve(t.length+1+n.length))}const c3=5;class qr{constructor(e,t){this.pos=e,this.oracle=t,this.nodes=[],this.lineStart=-1,this.lineEnd=-1,this.covering=null,this.writtenTo=e}get isCovered(){return this.covering&&this.nodes[this.nodes.length-1]==this.covering}span(e,t){if(this.lineStart>-1){let n=Math.min(t,this.lineEnd),s=this.nodes[this.nodes.length-1];s instanceof Re?s.length+=n-this.pos:(n>this.pos||!this.isCovered)&&this.nodes.push(new Re(n-this.pos,-1,0)),this.writtenTo=n,t>n&&(this.nodes.push(null),this.writtenTo++,this.lineStart=-1)}this.pos=t}point(e,t,n){if(e<t||n.heightRelevant){let s=n.widget?n.widget.estimatedHeight:0,r=n.widget?n.widget.lineBreaks:0;s<0&&(s=this.oracle.lineHeight);let o=t-e;n.block?this.addBlock(new Pa(o,s,n)):(o||r||s>=c3)&&this.addLineDeco(s,r,o)}else t>e&&this.span(e,t);this.lineEnd>-1&&this.lineEnd<this.pos&&(this.lineEnd=this.oracle.doc.lineAt(this.pos).to)}enterLine(){if(this.lineStart>-1)return;let{from:e,to:t}=this.oracle.doc.lineAt(this.pos);this.lineStart=e,this.lineEnd=t,this.writtenTo<e&&((this.writtenTo<e-1||this.nodes[this.nodes.length-1]==null)&&this.nodes.push(this.blankContent(this.writtenTo,e-1)),this.nodes.push(null)),this.pos>e&&this.nodes.push(new Re(this.pos-e,-1,0)),this.writtenTo=this.pos}blankContent(e,t){let n=new ve(t-e);return this.oracle.doc.lineAt(e).to==t&&(n.flags|=4),n}ensureLine(){this.enterLine();let e=this.nodes.length?this.nodes[this.nodes.length-1]:null;if(e instanceof Re)return e;let t=new Re(0,-1,0);return this.nodes.push(t),t}addBlock(e){this.enterLine();let t=e.deco;t&&t.startSide>0&&!this.isCovered&&this.ensureLine(),this.nodes.push(e),this.writtenTo=this.pos=this.pos+e.length,t&&t.endSide>0&&(this.covering=e)}addLineDeco(e,t,n){let s=this.ensureLine();s.length+=n,s.collapsed+=n,s.widgetHeight=Math.max(s.widgetHeight,e),s.breaks+=t,this.writtenTo=this.pos=this.pos+n}finish(e){let t=this.nodes.length==0?null:this.nodes[this.nodes.length-1];this.lineStart>-1&&!(t instanceof Re)&&!this.isCovered?this.nodes.push(new Re(0,-1,0)):(this.writtenTo<this.pos||t==null)&&this.nodes.push(this.blankContent(this.writtenTo,this.pos));let n=e;for(let s of this.nodes)s instanceof Re&&s.updateHeight(this.oracle,n),n+=s?s.length:1;return this.nodes}static build(e,t,n,s){let r=new qr(n,e);return X.spans(t,n,s,r,0),r.finish(n)}}function f3(i,e,t){let n=new u3;return X.compare(i,e,t,n,0),n.changes}class u3{constructor(){this.changes=[]}compareRange(){}comparePoint(e,t,n,s){(e<t||n&&n.heightRelevant||s&&s.heightRelevant)&&an(e,t,this.changes,5)}}function d3(i,e){let t=i.getBoundingClientRect(),n=i.ownerDocument,s=n.defaultView||window,r=Math.max(0,t.left),o=Math.min(s.innerWidth,t.right),l=Math.max(0,t.top),a=Math.min(s.innerHeight,t.bottom);for(let h=i.parentNode;h&&h!=n.body;)if(h.nodeType==1){let c=h,f=window.getComputedStyle(c);if((c.scrollHeight>c.clientHeight||c.scrollWidth>c.clientWidth)&&f.overflow!="visible"){let u=c.getBoundingClientRect();r=Math.max(r,u.left),o=Math.min(o,u.right),l=Math.max(l,u.top),a=Math.min(h==i.parentNode?s.innerHeight:a,u.bottom)}h=f.position=="absolute"||f.position=="fixed"?c.offsetParent:c.parentNode}else if(h.nodeType==11)h=h.host;else break;return{left:r-t.left,right:Math.max(r,o)-t.left,top:l-(t.top+e),bottom:Math.max(l,a)-(t.top+e)}}function p3(i){let e=i.getBoundingClientRect(),t=i.ownerDocument.defaultView||window;return e.left<t.innerWidth&&e.right>0&&e.top<t.innerHeight&&e.bottom>0}function m3(i,e){let t=i.getBoundingClientRect();return{left:0,right:t.right-t.left,top:e,bottom:t.bottom-(t.top+e)}}class ds{constructor(e,t,n,s){this.from=e,this.to=t,this.size=n,this.displaySize=s}static same(e,t){if(e.length!=t.length)return!1;for(let n=0;n<e.length;n++){let s=e[n],r=t[n];if(s.from!=r.from||s.to!=r.to||s.size!=r.size)return!1}return!0}draw(e,t){return pe.replace({widget:new g3(this.displaySize*(t?e.scaleY:e.scaleX),t)}).range(this.from,this.to)}}class g3 extends Ui{constructor(e,t){super(),this.size=e,this.vertical=t}eq(e){return e.size==this.size&&e.vertical==this.vertical}toDOM(){let e=document.createElement("div");return this.vertical?e.style.height=this.size+"px":(e.style.width=this.size+"px",e.style.height="2px",e.style.display="inline-block"),e}get estimatedHeight(){return this.vertical?this.size:-1}}class Ro{constructor(e,t){this.view=e,this.state=t,this.pixelViewport={left:0,right:window.innerWidth,top:0,bottom:0},this.inView=!0,this.paddingTop=0,this.paddingBottom=0,this.contentDOMWidth=0,this.contentDOMHeight=0,this.editorHeight=0,this.editorWidth=0,this.scaleX=1,this.scaleY=1,this.scrollOffset=0,this.scrolledToBottom=!1,this.scrollAnchorPos=0,this.scrollAnchorHeight=-1,this.scaler=Io,this.scrollTarget=null,this.printing=!1,this.mustMeasureContent=!0,this.defaultTextDirection=le.LTR,this.visibleRanges=[],this.mustEnforceCursorAssoc=!1;let n=t.facet(Rr).some(s=>typeof s!="function"&&s.class=="cm-lineWrapping");this.heightOracle=new o3(n),this.stateDeco=No(t),this.heightMap=Te.empty().applyChanges(this.stateDeco,J.empty,this.heightOracle.setDoc(t.doc),[new ze(0,0,0,t.doc.length)]);for(let s=0;s<2&&(this.viewport=this.getViewport(0,null),!!this.updateForViewport());s++);this.updateViewportLines(),this.lineGaps=this.ensureLineGaps([]),this.lineGapDeco=pe.set(this.lineGaps.map(s=>s.draw(this,!1))),this.scrollParent=e.scrollDOM,this.computeVisibleRanges()}updateForViewport(){let e=[this.viewport],{main:t}=this.state.selection;for(let n=0;n<=1;n++){let s=n?t.head:t.anchor;if(!e.some(({from:r,to:o})=>s>=r&&s<=o)){let{from:r,to:o}=this.lineBlockAt(s);e.push(new oi(r,o))}}return this.viewports=e.sort((n,s)=>n.from-s.from),this.updateScaler()}updateScaler(){let e=this.scaler;return this.scaler=this.heightMap.height<=7e6?Io:new _r(this.heightOracle,this.heightMap,this.viewports),e.eq(this.scaler)?0:2}updateViewportLines(){this.viewportLines=[],this.heightMap.forEachLine(this.viewport.from,this.viewport.to,this.heightOracle.setDoc(this.state.doc),0,0,e=>{this.viewportLines.push(Pn(e,this.scaler))})}update(e,t=null){this.state=e.state;let n=this.stateDeco;this.stateDeco=No(this.state);let s=e.changedRanges,r=ze.extendWithRanges(s,f3(n,this.stateDeco,e?e.changes:ge.empty(this.state.doc.length))),o=this.heightMap.height,l=this.scrolledToBottom?null:this.scrollAnchorAt(this.scrollOffset);Po(),this.heightMap=this.heightMap.applyChanges(this.stateDeco,e.startState.doc,this.heightOracle.setDoc(this.state.doc),r),(this.heightMap.height!=o||pn)&&(e.flags|=2),l?(this.scrollAnchorPos=e.changes.mapPos(l.from,-1),this.scrollAnchorHeight=l.top):(this.scrollAnchorPos=-1,this.scrollAnchorHeight=o);let a=r.length?this.mapViewport(this.viewport,e.changes):this.viewport;(t&&(t.range.head<a.from||t.range.head>a.to)||!this.viewportIsAppropriate(a))&&(a=this.getViewport(0,t));let h=a.from!=this.viewport.from||a.to!=this.viewport.to;this.viewport=a,e.flags|=this.updateForViewport(),(h||!e.changes.empty||e.flags&2)&&this.updateViewportLines(),(this.lineGaps.length||this.viewport.to-this.viewport.from>4e3)&&this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps,e.changes))),e.flags|=this.computeVisibleRanges(e.changes),t&&(this.scrollTarget=t),!this.mustEnforceCursorAssoc&&(e.selectionSet||e.focusChanged)&&e.view.lineWrapping&&e.state.selection.main.empty&&e.state.selection.main.assoc&&!e.state.facet(ca)&&(this.mustEnforceCursorAssoc=!0)}measure(){let{view:e}=this,t=e.contentDOM,n=window.getComputedStyle(t),s=this.heightOracle,r=n.whiteSpace;this.defaultTextDirection=n.direction=="rtl"?le.RTL:le.LTR;let o=this.heightOracle.mustRefreshForWrapping(r)||this.mustMeasureContent==="refresh",l=t.getBoundingClientRect(),a=o||this.mustMeasureContent||this.contentDOMHeight!=l.height;this.contentDOMHeight=l.height,this.mustMeasureContent=!1;let h=0,c=0;if(l.width&&l.height){let{scaleX:S,scaleY:k}=Kl(t,l);(S>.005&&Math.abs(this.scaleX-S)>.005||k>.005&&Math.abs(this.scaleY-k)>.005)&&(this.scaleX=S,this.scaleY=k,h|=16,o=a=!0)}let f=(parseInt(n.paddingTop)||0)*this.scaleY,u=(parseInt(n.paddingBottom)||0)*this.scaleY;(this.paddingTop!=f||this.paddingBottom!=u)&&(this.paddingTop=f,this.paddingBottom=u,h|=18),this.editorWidth!=e.scrollDOM.clientWidth&&(s.lineWrapping&&(a=!0),this.editorWidth=e.scrollDOM.clientWidth,h|=16);let d=jl(this.view.contentDOM,!1).y;d!=this.scrollParent&&(this.scrollParent=d,this.scrollAnchorHeight=-1,this.scrollOffset=0);let p=this.getScrollOffset();this.scrollOffset!=p&&(this.scrollAnchorHeight=-1,this.scrollOffset=p),this.scrolledToBottom=Xl(this.scrollParent||e.win);let m=(this.printing?m3:d3)(t,this.paddingTop),g=m.top-this.pixelViewport.top,b=m.bottom-this.pixelViewport.bottom;this.pixelViewport=m;let x=this.pixelViewport.bottom>this.pixelViewport.top&&this.pixelViewport.right>this.pixelViewport.left;if(x!=this.inView&&(this.inView=x,x&&(a=!0)),!this.inView&&!this.scrollTarget&&!p3(e.dom))return 0;let C=l.width;if((this.contentDOMWidth!=C||this.editorHeight!=e.scrollDOM.clientHeight)&&(this.contentDOMWidth=l.width,this.editorHeight=e.scrollDOM.clientHeight,h|=16),a){let S=e.docView.measureVisibleLineHeights(this.viewport);if(s.mustRefreshForHeights(S)&&(o=!0),o||s.lineWrapping&&Math.abs(C-this.contentDOMWidth)>s.charWidth){let{lineHeight:k,charWidth:v,textHeight:D}=e.docView.measureTextSize();o=k>0&&s.refresh(r,k,v,D,Math.max(5,C/v),S),o&&(e.docView.minWidth=0,h|=16)}g>0&&b>0?c=Math.max(g,b):g<0&&b<0&&(c=Math.min(g,b)),Po();for(let k of this.viewports){let v=k.from==this.viewport.from?S:e.docView.measureVisibleLineHeights(k);this.heightMap=(o?Te.empty().applyChanges(this.stateDeco,J.empty,this.heightOracle,[new ze(0,0,0,e.state.doc.length)]):this.heightMap).updateHeight(s,0,o,new l3(k.from,v))}pn&&(h|=2)}let R=!this.viewportIsAppropriate(this.viewport,c)||this.scrollTarget&&(this.scrollTarget.range.head<this.viewport.from||this.scrollTarget.range.head>this.viewport.to);return R&&(h&2&&(h|=this.updateScaler()),this.viewport=this.getViewport(c,this.scrollTarget),h|=this.updateForViewport()),(h&2||R)&&this.updateViewportLines(),(this.lineGaps.length||this.viewport.to-this.viewport.from>4e3)&&this.updateLineGaps(this.ensureLineGaps(o?[]:this.lineGaps,e)),h|=this.computeVisibleRanges(),this.mustEnforceCursorAssoc&&(this.mustEnforceCursorAssoc=!1,e.docView.enforceCursorAssoc()),h}get visibleTop(){return this.scaler.fromDOM(this.pixelViewport.top)}get visibleBottom(){return this.scaler.fromDOM(this.pixelViewport.bottom)}getViewport(e,t){let n=.5-Math.max(-.5,Math.min(.5,e/1e3/2)),s=this.heightMap,r=this.heightOracle,{visibleTop:o,visibleBottom:l}=this,a=new oi(s.lineAt(o-n*1e3,re.ByHeight,r,0,0).from,s.lineAt(l+(1-n)*1e3,re.ByHeight,r,0,0).to);if(t){let{head:h}=t.range;if(h<a.from||h>a.to){let c=Math.min(this.editorHeight,this.pixelViewport.bottom-this.pixelViewport.top),f=s.lineAt(h,re.ByPos,r,0,0),u;t.y=="center"?u=(f.top+f.bottom)/2-c/2:t.y=="start"||t.y=="nearest"&&h<a.from?u=f.top:u=f.bottom-c,a=new oi(s.lineAt(u-1e3/2,re.ByHeight,r,0,0).from,s.lineAt(u+c+1e3/2,re.ByHeight,r,0,0).to)}}return a}mapViewport(e,t){let n=t.mapPos(e.from,-1),s=t.mapPos(e.to,1);return new oi(this.heightMap.lineAt(n,re.ByPos,this.heightOracle,0,0).from,this.heightMap.lineAt(s,re.ByPos,this.heightOracle,0,0).to)}viewportIsAppropriate({from:e,to:t},n=0){if(!this.inView)return!0;let{top:s}=this.heightMap.lineAt(e,re.ByPos,this.heightOracle,0,0),{bottom:r}=this.heightMap.lineAt(t,re.ByPos,this.heightOracle,0,0),{visibleTop:o,visibleBottom:l}=this;return(e==0||s<=o-Math.max(10,Math.min(-n,250)))&&(t==this.state.doc.length||r>=l+Math.max(10,Math.min(n,250)))&&s>o-2*1e3&&r<l+2*1e3}mapLineGaps(e,t){if(!e.length||t.empty)return e;let n=[];for(let s of e)t.touchesRange(s.from,s.to)||n.push(new ds(t.mapPos(s.from),t.mapPos(s.to),s.size,s.displaySize));return n}ensureLineGaps(e,t){let n=this.heightOracle.lineWrapping,s=n?1e4:2e3,r=s>>1,o=s<<1;if(this.defaultTextDirection!=le.LTR&&!n)return[];let l=[],a=(c,f,u,d)=>{if(f-c<r)return;let p=this.state.selection.main,m=[p.from];p.empty||m.push(p.to);for(let b of m)if(b>c&&b<f){a(c,b-10,u,d),a(b+10,f,u,d);return}let g=y3(e,b=>b.from>=u.from&&b.to<=u.to&&Math.abs(b.from-c)<r&&Math.abs(b.to-f)<r&&!m.some(x=>b.from<x&&b.to>x));if(!g){if(f<u.to&&t&&n&&t.visibleRanges.some(C=>C.from<=f&&C.to>=f)){let C=t.moveToLineBoundary(w.cursor(f),!1,!0).head;C>c&&(f=C)}let b=this.gapSize(u,c,f,d),x=n||b<2e6?b:2e6;g=new ds(c,f,b,x)}l.push(g)},h=c=>{if(c.length<o||c.type!=ke.Text)return;let f=b3(c.from,c.to,this.stateDeco);if(f.total<o)return;let u=this.scrollTarget?this.scrollTarget.range.head:null,d,p;if(n){let m=s/this.heightOracle.lineLength*this.heightOracle.lineHeight,g,b;if(u!=null){let x=ai(f,u),C=((this.visibleBottom-this.visibleTop)/2+m)/c.height;g=x-C,b=x+C}else g=(this.visibleTop-c.top-m)/c.height,b=(this.visibleBottom-c.top+m)/c.height;d=li(f,g),p=li(f,b)}else{let m=f.total*this.heightOracle.charWidth,g=s*this.heightOracle.charWidth,b=0;if(m>2e6)for(let k of e)k.from>=c.from&&k.from<c.to&&k.size!=k.displaySize&&k.from*this.heightOracle.charWidth+b<this.pixelViewport.left&&(b=k.size-k.displaySize);let x=this.pixelViewport.left+b,C=this.pixelViewport.right+b,R,S;if(u!=null){let k=ai(f,u),v=((C-x)/2+g)/m;R=k-v,S=k+v}else R=(x-g)/m,S=(C+g)/m;d=li(f,R),p=li(f,S)}d>c.from&&a(c.from,d,c,f),p<c.to&&a(p,c.to,c,f)};for(let c of this.viewportLines)Array.isArray(c.type)?c.type.forEach(h):h(c);return l}gapSize(e,t,n,s){let r=ai(s,n)-ai(s,t);return this.heightOracle.lineWrapping?e.height*r:s.total*this.heightOracle.charWidth*r}updateLineGaps(e){ds.same(e,this.lineGaps)||(this.lineGaps=e,this.lineGapDeco=pe.set(e.map(t=>t.draw(this,this.heightOracle.lineWrapping))))}computeVisibleRanges(e){let t=this.stateDeco;this.lineGaps.length&&(t=t.concat(this.lineGapDeco));let n=[];X.spans(t,this.viewport.from,this.viewport.to,{span(r,o){n.push({from:r,to:o})},point(){}},20);let s=0;if(n.length!=this.visibleRanges.length)s=12;else for(let r=0;r<n.length&&!(s&8);r++){let o=this.visibleRanges[r],l=n[r];(o.from!=l.from||o.to!=l.to)&&(s|=4,e&&e.mapPos(o.from,-1)==l.from&&e.mapPos(o.to,1)==l.to||(s|=8))}return this.visibleRanges=n,s}lineBlockAt(e){return e>=this.viewport.from&&e<=this.viewport.to&&this.viewportLines.find(t=>t.from<=e&&t.to>=e)||Pn(this.heightMap.lineAt(e,re.ByPos,this.heightOracle,0,0),this.scaler)}lineBlockAtHeight(e){return e>=this.viewportLines[0].top&&e<=this.viewportLines[this.viewportLines.length-1].bottom&&this.viewportLines.find(t=>t.top<=e&&t.bottom>=e)||Pn(this.heightMap.lineAt(this.scaler.fromDOM(e),re.ByHeight,this.heightOracle,0,0),this.scaler)}getScrollOffset(){return(this.scrollParent==this.view.scrollDOM?this.scrollParent.scrollTop:(this.scrollParent?this.scrollParent.getBoundingClientRect().top:0)-this.view.contentDOM.getBoundingClientRect().top)*this.scaleY}scrollAnchorAt(e){let t=this.lineBlockAtHeight(e+8);return t.from>=this.viewport.from||this.viewportLines[0].top-e>200?t:this.viewportLines[0]}elementAtHeight(e){return Pn(this.heightMap.blockAt(this.scaler.fromDOM(e),this.heightOracle,0,0),this.scaler)}get docHeight(){return this.scaler.toDOM(this.heightMap.height)}get contentHeight(){return this.docHeight+this.paddingTop+this.paddingBottom}}class oi{constructor(e,t){this.from=e,this.to=t}}function b3(i,e,t){let n=[],s=i,r=0;return X.spans(t,i,e,{span(){},point(o,l){o>s&&(n.push({from:s,to:o}),r+=o-s),s=l}},20),s<e&&(n.push({from:s,to:e}),r+=e-s),{total:r,ranges:n}}function li({total:i,ranges:e},t){if(t<=0)return e[0].from;if(t>=1)return e[e.length-1].to;let n=Math.floor(i*t);for(let s=0;;s++){let{from:r,to:o}=e[s],l=o-r;if(n<=l)return r+n;n-=l}}function ai(i,e){let t=0;for(let{from:n,to:s}of i.ranges){if(e<=s){t+=e-n;break}t+=s-n}return t/i.total}function y3(i,e){for(let t of i)if(e(t))return t}const Io={toDOM(i){return i},fromDOM(i){return i},scale:1,eq(i){return i==this}};function No(i){let e=i.facet(Ki).filter(n=>typeof n!="function"),t=i.facet(Ir).filter(n=>typeof n!="function");return t.length&&e.push(X.join(t)),e}class _r{constructor(e,t,n){let s=0,r=0,o=0;this.viewports=n.map(({from:l,to:a})=>{let h=t.lineAt(l,re.ByPos,e,0,0).top,c=t.lineAt(a,re.ByPos,e,0,0).bottom;return s+=c-h,{from:l,to:a,top:h,bottom:c,domTop:0,domBottom:0}}),this.scale=(7e6-s)/(t.height-s);for(let l of this.viewports)l.domTop=o+(l.top-r)*this.scale,o=l.domBottom=l.domTop+(l.bottom-l.top),r=l.bottom}toDOM(e){for(let t=0,n=0,s=0;;t++){let r=t<this.viewports.length?this.viewports[t]:null;if(!r||e<r.top)return s+(e-n)*this.scale;if(e<=r.bottom)return r.domTop+(e-r.top);n=r.bottom,s=r.domBottom}}fromDOM(e){for(let t=0,n=0,s=0;;t++){let r=t<this.viewports.length?this.viewports[t]:null;if(!r||e<r.domTop)return n+(e-s)/this.scale;if(e<=r.domBottom)return r.top+(e-r.domTop);n=r.bottom,s=r.domBottom}}eq(e){return e instanceof _r?this.scale==e.scale&&this.viewports.length==e.viewports.length&&this.viewports.every((t,n)=>t.from==e.viewports[n].from&&t.to==e.viewports[n].to):!1}}function Pn(i,e){if(e.scale==1)return i;let t=e.toDOM(i.top),n=e.toDOM(i.bottom);return new $e(i.from,i.length,t,n-t,Array.isArray(i._content)?i._content.map(s=>Pn(s,e)):i._content)}const hi=L.define({combine:i=>i.join(" ")}),tr=L.define({combine:i=>i.indexOf(!0)>-1}),nr=Ct.newName(),La=Ct.newName(),Ra=Ct.newName(),Ia={"&light":"."+La,"&dark":"."+Ra};function ir(i,e,t){return new Ct(e,{finish(n){return/&/.test(n)?n.replace(/&\w*/,s=>{if(s=="&")return i;if(!t||!t[s])throw new RangeError(`Unsupported selector: ${s}`);return t[s]}):i+" "+n}})}const v3=ir("."+nr,{"&":{position:"relative !important",boxSizing:"border-box","&.cm-focused":{outline:"1px dotted #212121"},display:"flex !important",flexDirection:"column"},".cm-scroller":{display:"flex !important",alignItems:"flex-start !important",fontFamily:"monospace",lineHeight:1.4,height:"100%",overflowX:"auto",position:"relative",zIndex:0,overflowAnchor:"none"},".cm-content":{margin:0,flexGrow:2,flexShrink:0,display:"block",whiteSpace:"pre",wordWrap:"normal",boxSizing:"border-box",minHeight:"100%",padding:"4px 0",outline:"none","&[contenteditable=true]":{WebkitUserModify:"read-write-plaintext-only"}},".cm-lineWrapping":{whiteSpace_fallback:"pre-wrap",whiteSpace:"break-spaces",wordBreak:"break-word",overflowWrap:"anywhere",flexShrink:1},"&light .cm-content":{caretColor:"black"},"&dark .cm-content":{caretColor:"white"},".cm-line":{display:"block",padding:"0 2px 0 6px"},".cm-layer":{position:"absolute",left:0,top:0,contain:"size style","& > *":{position:"absolute"}},"&light .cm-selectionBackground":{background:"#d9d9d9"},"&dark .cm-selectionBackground":{background:"#222"},"&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#d7d4f0"},"&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#233"},".cm-cursorLayer":{pointerEvents:"none"},"&.cm-focused > .cm-scroller > .cm-cursorLayer":{animation:"steps(1) cm-blink 1.2s infinite"},"@keyframes cm-blink":{"0%":{},"50%":{opacity:0},"100%":{}},"@keyframes cm-blink2":{"0%":{},"50%":{opacity:0},"100%":{}},".cm-cursor, .cm-dropCursor":{borderLeft:"1.2px solid black",marginLeft:"-0.6px",pointerEvents:"none"},".cm-cursor":{display:"none"},"&dark .cm-cursor":{borderLeftColor:"#ddd"},".cm-selectionHandle":{backgroundColor:"currentColor",width:"1.5px"},".cm-selectionHandle-start::before, .cm-selectionHandle-end::before":{content:'""',backgroundColor:"inherit",borderRadius:"50%",width:"8px",height:"8px",position:"absolute",left:"-3.25px"},".cm-selectionHandle-start::before":{top:"-8px"},".cm-selectionHandle-end::before":{bottom:"-8px"},".cm-dropCursor":{position:"absolute"},"&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor":{display:"block"},".cm-iso":{unicodeBidi:"isolate"},".cm-announced":{position:"fixed",top:"-10000px"},"@media print":{".cm-announced":{display:"none"}},"&light .cm-activeLine":{backgroundColor:"#cceeff44"},"&dark .cm-activeLine":{backgroundColor:"#99eeff33"},"&light .cm-specialChar":{color:"red"},"&dark .cm-specialChar":{color:"#f78"},".cm-gutters":{flexShrink:0,display:"flex",height:"100%",boxSizing:"border-box",zIndex:200},".cm-gutters-before":{insetInlineStart:0},".cm-gutters-after":{insetInlineEnd:0},"&light .cm-gutters":{backgroundColor:"#f5f5f5",color:"#6c6c6c",border:"0px solid #ddd","&.cm-gutters-before":{borderRightWidth:"1px"},"&.cm-gutters-after":{borderLeftWidth:"1px"}},"&dark .cm-gutters":{backgroundColor:"#333338",color:"#ccc"},".cm-gutter":{display:"flex !important",flexDirection:"column",flexShrink:0,boxSizing:"border-box",minHeight:"100%",overflow:"hidden"},".cm-gutterElement":{boxSizing:"border-box"},".cm-lineNumbers .cm-gutterElement":{padding:"0 3px 0 5px",minWidth:"20px",textAlign:"right",whiteSpace:"nowrap"},"&light .cm-activeLineGutter":{backgroundColor:"#e2f2ff"},"&dark .cm-activeLineGutter":{backgroundColor:"#222227"},".cm-panels":{boxSizing:"border-box",position:"sticky",left:0,right:0,zIndex:300},"&light .cm-panels":{backgroundColor:"#f5f5f5",color:"black"},"&light .cm-panels-top":{borderBottom:"1px solid #ddd"},"&light .cm-panels-bottom":{borderTop:"1px solid #ddd"},"&dark .cm-panels":{backgroundColor:"#333338",color:"white"},".cm-dialog":{padding:"2px 19px 4px 6px",position:"relative","& label":{fontSize:"80%"}},".cm-dialog-close":{position:"absolute",top:"3px",right:"4px",backgroundColor:"inherit",border:"none",font:"inherit",fontSize:"14px",padding:"0"},".cm-tab":{display:"inline-block",overflow:"hidden",verticalAlign:"bottom"},".cm-widgetBuffer":{verticalAlign:"text-top",height:"1em",width:0,display:"inline"},".cm-placeholder":{color:"#888",display:"inline-block",verticalAlign:"top",userSelect:"none"},".cm-highlightSpace":{backgroundImage:"radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",backgroundPosition:"center"},".cm-highlightTab":{backgroundImage:`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,backgroundSize:"auto 100%",backgroundPosition:"right 90%",backgroundRepeat:"no-repeat"},".cm-trailingSpace":{backgroundColor:"#ff332255"},".cm-button":{verticalAlign:"middle",color:"inherit",fontSize:"70%",padding:".2em 1em",borderRadius:"1px"},"&light .cm-button":{backgroundImage:"linear-gradient(#eff1f5, #d9d9df)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#b4b4b4, #d0d3d6)"}},"&dark .cm-button":{backgroundImage:"linear-gradient(#393939, #111)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#111, #333)"}},".cm-textfield":{verticalAlign:"middle",color:"inherit",fontSize:"70%",border:"1px solid silver",padding:".2em .5em"},"&light .cm-textfield":{backgroundColor:"white"},"&dark .cm-textfield":{border:"1px solid #555",backgroundColor:"inherit"}},Ia),w3={childList:!0,characterData:!0,subtree:!0,attributes:!0,characterDataOldValue:!0},ps=B.ie&&B.ie_version<=11;class k3{constructor(e){this.view=e,this.active=!1,this.editContext=null,this.selectionRange=new Yh,this.selectionChanged=!1,this.delayedFlush=-1,this.resizeTimeout=-1,this.queue=[],this.delayedAndroidKey=null,this.flushingAndroidKey=-1,this.lastChange=0,this.scrollTargets=[],this.intersection=null,this.resizeScroll=null,this.intersecting=!1,this.gapIntersection=null,this.gaps=[],this.printQuery=null,this.parentCheck=-1,this.dom=e.contentDOM,this.observer=new MutationObserver(t=>{for(let n of t)this.queue.push(n);(B.ie&&B.ie_version<=11||B.ios&&e.composing)&&t.some(n=>n.type=="childList"&&n.removedNodes.length||n.type=="characterData"&&n.oldValue.length>n.target.nodeValue.length)?this.flushSoon():this.flush()}),window.EditContext&&B.android&&e.constructor.EDIT_CONTEXT!==!1&&!(B.chrome&&B.chrome_version<126)&&(this.editContext=new S3(e),e.state.facet(ft)&&(e.contentDOM.editContext=this.editContext.editContext)),ps&&(this.onCharData=t=>{this.queue.push({target:t.target,type:"characterData",oldValue:t.prevValue}),this.flushSoon()}),this.onSelectionChange=this.onSelectionChange.bind(this),this.onResize=this.onResize.bind(this),this.onPrint=this.onPrint.bind(this),this.onScroll=this.onScroll.bind(this),window.matchMedia&&(this.printQuery=window.matchMedia("print")),typeof ResizeObserver=="function"&&(this.resizeScroll=new ResizeObserver(()=>{var t;((t=this.view.docView)===null||t===void 0?void 0:t.lastUpdate)<Date.now()-75&&this.onResize()}),this.resizeScroll.observe(e.scrollDOM)),this.addWindowListeners(this.win=e.win),this.start(),typeof IntersectionObserver=="function"&&(this.intersection=new IntersectionObserver(t=>{this.parentCheck<0&&(this.parentCheck=setTimeout(this.listenForScroll.bind(this),1e3)),t.length>0&&t[t.length-1].intersectionRatio>0!=this.intersecting&&(this.intersecting=!this.intersecting,this.intersecting!=this.view.inView&&this.onScrollChanged(document.createEvent("Event")))},{threshold:[0,.001]}),this.intersection.observe(this.dom),this.gapIntersection=new IntersectionObserver(t=>{t.length>0&&t[t.length-1].intersectionRatio>0&&this.onScrollChanged(document.createEvent("Event"))},{})),this.listenForScroll(),this.readSelectionRange()}onScrollChanged(e){this.view.inputState.runHandlers("scroll",e),this.intersecting&&this.view.measure()}onScroll(e){this.intersecting&&this.flush(!1),this.editContext&&this.view.requestMeasure(this.editContext.measureReq),this.onScrollChanged(e)}onResize(){this.resizeTimeout<0&&(this.resizeTimeout=setTimeout(()=>{this.resizeTimeout=-1,this.view.requestMeasure()},50))}onPrint(e){(e.type=="change"||!e.type)&&!e.matches||(this.view.viewState.printing=!0,this.view.measure(),setTimeout(()=>{this.view.viewState.printing=!1,this.view.requestMeasure()},500))}updateGaps(e){if(this.gapIntersection&&(e.length!=this.gaps.length||this.gaps.some((t,n)=>t!=e[n]))){this.gapIntersection.disconnect();for(let t of e)this.gapIntersection.observe(t);this.gaps=e}}onSelectionChange(e){let t=this.selectionChanged;if(!this.readSelectionRange()||this.delayedAndroidKey)return;let{view:n}=this,s=this.selectionRange;if(n.state.facet(ft)?n.root.activeElement!=this.dom:!In(this.dom,s))return;let r=s.anchorNode&&n.docView.tile.nearest(s.anchorNode);if(r&&r.isWidget()&&r.widget.ignoreEvent(e)){t||(this.selectionChanged=!1);return}(B.ie&&B.ie_version<=11||B.android&&B.chrome)&&!n.state.selection.main.empty&&s.focusNode&&Nn(s.focusNode,s.focusOffset,s.anchorNode,s.anchorOffset)?this.flushSoon():this.flush(!1)}readSelectionRange(){let{view:e}=this,t=$n(e.root);if(!t)return!1;let n=B.safari&&e.root.nodeType==11&&e.root.activeElement==this.dom&&x3(this.view,t)||t;if(!n||this.selectionRange.eq(n))return!1;let s=In(this.dom,n);return s&&!this.selectionChanged&&e.inputState.lastFocusTime>Date.now()-200&&e.inputState.lastTouchTime<Date.now()-300&&Zh(this.dom,n)?(this.view.inputState.lastFocusTime=0,e.docView.updateSelection(),!1):(this.selectionRange.setRange(n),s&&(this.selectionChanged=!0),!0)}setSelectionRange(e,t){this.selectionRange.set(e.node,e.offset,t.node,t.offset),this.selectionChanged=!1}clearSelectionRange(){this.selectionRange.set(null,0,null,0)}listenForScroll(){this.parentCheck=-1;let e=0,t=null;for(let n=this.dom;n;)if(n.nodeType==1)!t&&e<this.scrollTargets.length&&this.scrollTargets[e]==n?e++:t||(t=this.scrollTargets.slice(0,e)),t&&t.push(n),n=n.assignedSlot||n.parentNode;else if(n.nodeType==11)n=n.host;else break;if(e<this.scrollTargets.length&&!t&&(t=this.scrollTargets.slice(0,e)),t){for(let n of this.scrollTargets)n.removeEventListener("scroll",this.onScroll);for(let n of this.scrollTargets=t)n.addEventListener("scroll",this.onScroll)}}ignore(e){if(!this.active)return e();try{return this.stop(),e()}finally{this.start(),this.clear()}}start(){this.active||(this.observer.observe(this.dom,w3),ps&&this.dom.addEventListener("DOMCharacterDataModified",this.onCharData),this.active=!0)}stop(){this.active&&(this.active=!1,this.observer.disconnect(),ps&&this.dom.removeEventListener("DOMCharacterDataModified",this.onCharData))}clear(){this.processRecords(),this.queue.length=0,this.selectionChanged=!1}delayAndroidKey(e,t){var n;if(!this.delayedAndroidKey){let s=()=>{let r=this.delayedAndroidKey;r&&(this.clearDelayedAndroidKey(),this.view.inputState.lastKeyCode=r.keyCode,this.view.inputState.lastKeyTime=Date.now(),!this.flush()&&r.force&&hn(this.dom,r.key,r.keyCode))};this.flushingAndroidKey=this.view.win.requestAnimationFrame(s)}(!this.delayedAndroidKey||e=="Enter")&&(this.delayedAndroidKey={key:e,keyCode:t,force:this.lastChange<Date.now()-50||!!(!((n=this.delayedAndroidKey)===null||n===void 0)&&n.force)})}clearDelayedAndroidKey(){this.win.cancelAnimationFrame(this.flushingAndroidKey),this.delayedAndroidKey=null,this.flushingAndroidKey=-1}flushSoon(){this.delayedFlush<0&&(this.delayedFlush=this.view.win.requestAnimationFrame(()=>{this.delayedFlush=-1,this.flush()}))}forceFlush(){this.delayedFlush>=0&&(this.view.win.cancelAnimationFrame(this.delayedFlush),this.delayedFlush=-1),this.flush()}pendingRecords(){for(let e of this.observer.takeRecords())this.queue.push(e);return this.queue}processRecords(){let e=this.pendingRecords();e.length&&(this.queue=[]);let t=-1,n=-1,s=!1;for(let r of e){let o=this.readMutation(r);o&&(o.typeOver&&(s=!0),t==-1?{from:t,to:n}=o:(t=Math.min(o.from,t),n=Math.max(o.to,n)))}return{from:t,to:n,typeOver:s}}readChange(){let{from:e,to:t,typeOver:n}=this.processRecords(),s=this.selectionChanged&&In(this.dom,this.selectionRange);if(e<0&&!s)return null;e>-1&&(this.lastChange=Date.now()),this.view.inputState.lastFocusTime=0,this.selectionChanged=!1;let r=new Fc(this.view,e,t,n);return this.view.docView.domChanged={newSel:r.newSel?r.newSel.main:null},r}flush(e=!0){if(this.delayedFlush>=0||this.delayedAndroidKey)return!1;e&&this.readSelectionRange();let t=this.readChange();if(!t)return this.view.requestMeasure(),!1;let n=this.view.state,s=xa(this.view,t);return this.view.state==n&&(t.domChanged||t.newSel&&!Ri(this.view.state.selection,t.newSel.main))&&this.view.update([]),s}readMutation(e){let t=this.view.docView.tile.nearest(e.target);if(!t||t.isWidget())return null;if(t.markDirty(e.type=="attributes"),e.type=="childList"){let n=qo(t,e.previousSibling||e.target.previousSibling,-1),s=qo(t,e.nextSibling||e.target.nextSibling,1);return{from:n?t.posAfter(n):t.posAtStart,to:s?t.posBefore(s):t.posAtEnd,typeOver:!1}}else return e.type=="characterData"?{from:t.posAtStart,to:t.posAtEnd,typeOver:e.target.nodeValue==e.oldValue}:null}setWindow(e){e!=this.win&&(this.removeWindowListeners(this.win),this.win=e,this.addWindowListeners(this.win))}addWindowListeners(e){e.addEventListener("resize",this.onResize),this.printQuery?this.printQuery.addEventListener?this.printQuery.addEventListener("change",this.onPrint):this.printQuery.addListener(this.onPrint):e.addEventListener("beforeprint",this.onPrint),e.addEventListener("scroll",this.onScroll),e.document.addEventListener("selectionchange",this.onSelectionChange)}removeWindowListeners(e){e.removeEventListener("scroll",this.onScroll),e.removeEventListener("resize",this.onResize),this.printQuery?this.printQuery.removeEventListener?this.printQuery.removeEventListener("change",this.onPrint):this.printQuery.removeListener(this.onPrint):e.removeEventListener("beforeprint",this.onPrint),e.document.removeEventListener("selectionchange",this.onSelectionChange)}update(e){this.editContext&&(this.editContext.update(e),e.startState.facet(ft)!=e.state.facet(ft)&&(e.view.contentDOM.editContext=e.state.facet(ft)?this.editContext.editContext:null))}destroy(){var e,t,n;this.stop(),(e=this.intersection)===null||e===void 0||e.disconnect(),(t=this.gapIntersection)===null||t===void 0||t.disconnect(),(n=this.resizeScroll)===null||n===void 0||n.disconnect();for(let s of this.scrollTargets)s.removeEventListener("scroll",this.onScroll);this.removeWindowListeners(this.win),clearTimeout(this.parentCheck),clearTimeout(this.resizeTimeout),this.win.cancelAnimationFrame(this.delayedFlush),this.win.cancelAnimationFrame(this.flushingAndroidKey),this.editContext&&(this.view.contentDOM.editContext=null,this.editContext.destroy())}}function qo(i,e,t){for(;e;){let n=he.get(e);if(n&&n.parent==i)return n;let s=e.parentNode;e=s!=i.dom?s:t>0?e.nextSibling:e.previousSibling}return null}function _o(i,e){let t=e.startContainer,n=e.startOffset,s=e.endContainer,r=e.endOffset,o=i.docView.domAtPos(i.state.selection.main.anchor,1);return Nn(o.node,o.offset,s,r)&&([t,n,s,r]=[s,r,t,n]),{anchorNode:t,anchorOffset:n,focusNode:s,focusOffset:r}}function x3(i,e){if(e.getComposedRanges){let s=e.getComposedRanges(i.root)[0];if(s)return _o(i,s)}let t=null;function n(s){s.preventDefault(),s.stopImmediatePropagation(),t=s.getTargetRanges()[0]}return i.contentDOM.addEventListener("beforeinput",n,!0),i.dom.ownerDocument.execCommand("indent"),i.contentDOM.removeEventListener("beforeinput",n,!0),t?_o(i,t):null}class S3{constructor(e){this.from=0,this.to=0,this.pendingContextChange=null,this.handlers=Object.create(null),this.composing=null,this.resetRange(e.state);let t=this.editContext=new window.EditContext({text:e.state.doc.sliceString(this.from,this.to),selectionStart:this.toContextPos(Math.max(this.from,Math.min(this.to,e.state.selection.main.anchor))),selectionEnd:this.toContextPos(e.state.selection.main.head)});this.handlers.textupdate=n=>{let s=e.state.selection.main,{anchor:r,head:o}=s,l=this.toEditorPos(n.updateRangeStart),a=this.toEditorPos(n.updateRangeEnd);e.inputState.composing>=0&&!this.composing&&(this.composing={contextBase:n.updateRangeStart,editorBase:l,drifted:!1});let h=a-l>n.text.length;l==this.from&&r<this.from?l=r:a==this.to&&r>this.to&&(a=r);let c=Sa(e.state.sliceDoc(l,a),n.text,(h?s.from:s.to)-l,h?"end":null);if(!c){let u=w.single(this.toEditorPos(n.selectionStart),this.toEditorPos(n.selectionEnd));Ri(u,s)||e.dispatch({selection:u,userEvent:"select"});return}let f={from:c.from+l,to:c.toA+l,insert:J.of(n.text.slice(c.from,c.toB).split(`
`))};if((B.mac||B.android)&&f.from==o-1&&/^\. ?$/.test(n.text)&&e.contentDOM.getAttribute("autocorrect")=="off"&&(f={from:l,to:a,insert:J.of([n.text.replace("."," ")])}),this.pendingContextChange=f,!e.state.readOnly){let u=this.to-this.from+(f.to-f.from+f.insert.length);Nr(e,f,w.single(this.toEditorPos(n.selectionStart,u),this.toEditorPos(n.selectionEnd,u)))}this.pendingContextChange&&(this.revertPending(e.state),this.setSelection(e.state)),f.from<f.to&&!f.insert.length&&e.inputState.composing>=0&&!/[\\p{Alphabetic}\\p{Number}_]/.test(t.text.slice(Math.max(0,n.updateRangeStart-1),Math.min(t.text.length,n.updateRangeStart+1)))&&this.handlers.compositionend(n)},this.handlers.characterboundsupdate=n=>{let s=[],r=null;for(let o=this.toEditorPos(n.rangeStart),l=this.toEditorPos(n.rangeEnd);o<l;o++){let a=e.coordsForChar(o);r=a&&new DOMRect(a.left,a.top,a.right-a.left,a.bottom-a.top)||r||new DOMRect,s.push(r)}t.updateCharacterBounds(n.rangeStart,s)},this.handlers.textformatupdate=n=>{let s=[];for(let r of n.getTextFormats()){let o=r.underlineStyle,l=r.underlineThickness;if(!/none/i.test(o)&&!/none/i.test(l)){let a=this.toEditorPos(r.rangeStart),h=this.toEditorPos(r.rangeEnd);if(a<h){let c=`text-decoration: underline ${/^[a-z]/.test(o)?o+" ":o=="Dashed"?"dashed ":o=="Squiggle"?"wavy ":""}${/thin/i.test(l)?1:2}px`;s.push(pe.mark({attributes:{style:c}}).range(a,h))}}}e.dispatch({effects:ua.of(pe.set(s))})},this.handlers.compositionstart=()=>{e.inputState.composing<0&&(e.inputState.composing=0,e.inputState.compositionFirstChange=!0)},this.handlers.compositionend=()=>{if(e.inputState.composing=-1,e.inputState.compositionFirstChange=null,this.composing){let{drifted:n}=this.composing;this.composing=null,n&&this.reset(e.state)}};for(let n in this.handlers)t.addEventListener(n,this.handlers[n]);this.measureReq={read:n=>{this.editContext.updateControlBounds(n.contentDOM.getBoundingClientRect());let s=$n(n.root);s&&s.rangeCount&&this.editContext.updateSelectionBounds(s.getRangeAt(0).getBoundingClientRect())}}}applyEdits(e){let t=0,n=!1,s=this.pendingContextChange;return e.changes.iterChanges((r,o,l,a,h)=>{if(n)return;let c=h.length-(o-r);if(s&&o>=s.to)if(s.from==r&&s.to==o&&s.insert.eq(h)){s=this.pendingContextChange=null,t+=c,this.to+=c;return}else s=null,this.revertPending(e.state);if(r+=t,o+=t,o<=this.from)this.from+=c,this.to+=c;else if(r<this.to){if(r<this.from||o>this.to||this.to-this.from+h.length>3e4){n=!0;return}this.editContext.updateText(this.toContextPos(r),this.toContextPos(o),h.toString()),this.to+=c}t+=c}),s&&!n&&this.revertPending(e.state),!n}update(e){let t=this.pendingContextChange,n=e.startState.selection.main;this.composing&&(this.composing.drifted||!e.changes.touchesRange(n.from,n.to)&&e.transactions.some(s=>!s.isUserEvent("input.type")&&s.changes.touchesRange(this.from,this.to)))?(this.composing.drifted=!0,this.composing.editorBase=e.changes.mapPos(this.composing.editorBase)):!this.applyEdits(e)||!this.rangeIsValid(e.state)?(this.pendingContextChange=null,this.reset(e.state)):(e.docChanged||e.selectionSet||t)&&this.setSelection(e.state),(e.geometryChanged||e.docChanged||e.selectionSet)&&e.view.requestMeasure(this.measureReq)}resetRange(e){let{head:t}=e.selection.main;this.from=Math.max(0,t-1e4),this.to=Math.min(e.doc.length,t+1e4)}reset(e){this.resetRange(e),this.editContext.updateText(0,this.editContext.text.length,e.doc.sliceString(this.from,this.to)),this.setSelection(e)}revertPending(e){let t=this.pendingContextChange;this.pendingContextChange=null,this.editContext.updateText(this.toContextPos(t.from),this.toContextPos(t.from+t.insert.length),e.doc.sliceString(t.from,t.to))}setSelection(e){let{main:t}=e.selection,n=this.toContextPos(Math.max(this.from,Math.min(this.to,t.anchor))),s=this.toContextPos(t.head);(this.editContext.selectionStart!=n||this.editContext.selectionEnd!=s)&&this.editContext.updateSelection(n,s)}rangeIsValid(e){let{head:t}=e.selection.main;return!(this.from>0&&t-this.from<500||this.to<e.doc.length&&this.to-t<500||this.to-this.from>1e4*3)}toEditorPos(e,t=this.to-this.from){e=Math.min(e,t);let n=this.composing;return n&&n.drifted?n.editorBase+(e-n.contextBase):e+this.from}toContextPos(e){let t=this.composing;return t&&t.drifted?t.contextBase+(e-t.editorBase):e-this.from}destroy(){for(let e in this.handlers)this.editContext.removeEventListener(e,this.handlers[e])}}class I{get state(){return this.viewState.state}get viewport(){return this.viewState.viewport}get visibleRanges(){return this.viewState.visibleRanges}get inView(){return this.viewState.inView}get composing(){return!!this.inputState&&this.inputState.composing>0}get compositionStarted(){return!!this.inputState&&this.inputState.composing>=0}get root(){return this._root}get win(){return this.dom.ownerDocument.defaultView||window}constructor(e={}){var t;this.plugins=[],this.pluginMap=new Map,this.editorAttrs={},this.contentAttrs={},this.bidiCache=[],this.destroyed=!1,this.updateState=2,this.measureScheduled=-1,this.measureRequests=[],this.contentDOM=document.createElement("div"),this.scrollDOM=document.createElement("div"),this.scrollDOM.tabIndex=-1,this.scrollDOM.className="cm-scroller",this.scrollDOM.appendChild(this.contentDOM),this.announceDOM=document.createElement("div"),this.announceDOM.className="cm-announced",this.announceDOM.setAttribute("aria-live","polite"),this.dom=document.createElement("div"),this.dom.appendChild(this.announceDOM),this.dom.appendChild(this.scrollDOM),e.parent&&e.parent.appendChild(this.dom);let{dispatch:n}=e;this.dispatchTransactions=e.dispatchTransactions||n&&(s=>s.forEach(r=>n(r,this)))||(s=>this.update(s)),this.dispatch=this.dispatch.bind(this),this._root=e.root||Qh(e.parent)||document,this.viewState=new Ro(this,e.state||Z.create(e)),e.scrollTo&&e.scrollTo.is(ii)&&(this.viewState.scrollTarget=e.scrollTo.value.clip(this.viewState.state)),this.plugins=this.state.facet(nn).map(s=>new as(s));for(let s of this.plugins)s.update(this);this.observer=new k3(this),this.inputState=new $c(this),this.inputState.ensureHandlers(this.plugins),this.docView=new ko(this),this.mountStyles(),this.updateAttrs(),this.updateState=0,this.requestMeasure(),!((t=document.fonts)===null||t===void 0)&&t.ready&&document.fonts.ready.then(()=>{this.viewState.mustMeasureContent="refresh",this.requestMeasure()})}dispatch(...e){let t=e.length==1&&e[0]instanceof be?e:e.length==1&&Array.isArray(e[0])?e[0]:[this.state.update(...e)];this.dispatchTransactions(t,this)}update(e){if(this.updateState!=0)throw new Error("Calls to EditorView.update are not allowed while an update is in progress");let t=!1,n=!1,s,r=this.state;for(let u of e){if(u.startState!=r)throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");r=u.state}if(this.destroyed){this.viewState.state=r;return}let o=this.hasFocus,l=0,a=null;e.some(u=>u.annotation(Ba))?(this.inputState.notifiedFocused=o,l=1):o!=this.inputState.notifiedFocused&&(this.inputState.notifiedFocused=o,a=Da(r,o),a||(l=1));let h=this.observer.delayedAndroidKey,c=null;if(h?(this.observer.clearDelayedAndroidKey(),c=this.observer.readChange(),(c&&!this.state.doc.eq(r.doc)||!this.state.selection.eq(r.selection))&&(c=null)):this.observer.clear(),r.facet(Z.phrases)!=this.state.facet(Z.phrases))return this.setState(r);s=Oi.create(this,r,e),s.flags|=l;let f=this.viewState.scrollTarget;try{this.updateState=2;for(let u of e){if(f&&(f=f.map(u.changes)),u.scrollIntoView){let{main:d}=u.state.selection;f=new cn(d.empty?d:w.cursor(d.head,d.head>d.anchor?-1:1))}for(let d of u.effects)d.is(ii)&&(f=d.value.clip(this.state))}this.viewState.update(s,f),this.bidiCache=Ni.update(this.bidiCache,s.changes),s.empty||(this.updatePlugins(s),this.inputState.update(s)),t=this.docView.update(s),this.state.facet(On)!=this.styleModules&&this.mountStyles(),n=this.updateAttrs(),this.showAnnouncements(e),this.docView.updateSelection(t,e.some(u=>u.isUserEvent("select.pointer")))}finally{this.updateState=0}if(s.startState.facet(hi)!=s.state.facet(hi)&&(this.viewState.mustMeasureContent=!0),(t||n||f||this.viewState.mustEnforceCursorAssoc||this.viewState.mustMeasureContent)&&this.requestMeasure(),t&&this.docViewUpdate(),!s.empty)for(let u of this.state.facet(Js))try{u(s)}catch(d){it(this.state,d,"update listener")}(a||c)&&Promise.resolve().then(()=>{a&&this.state==a.startState&&this.dispatch(a),c&&!xa(this,c)&&h.force&&hn(this.contentDOM,h.key,h.keyCode)})}setState(e){if(this.updateState!=0)throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");if(this.destroyed){this.viewState.state=e;return}this.updateState=2;let t=this.hasFocus;try{for(let n of this.plugins)n.destroy(this);this.viewState=new Ro(this,e),this.plugins=e.facet(nn).map(n=>new as(n)),this.pluginMap.clear();for(let n of this.plugins)n.update(this);this.docView.destroy(),this.docView=new ko(this),this.inputState.ensureHandlers(this.plugins),this.mountStyles(),this.updateAttrs(),this.bidiCache=[]}finally{this.updateState=0}t&&this.focus(),this.requestMeasure()}updatePlugins(e){let t=e.startState.facet(nn),n=e.state.facet(nn);if(t!=n){let s=[];for(let r of n){let o=t.indexOf(r);if(o<0)s.push(new as(r));else{let l=this.plugins[o];l.mustUpdate=e,s.push(l)}}for(let r of this.plugins)r.mustUpdate!=e&&r.destroy(this);this.plugins=s,this.pluginMap.clear()}else for(let s of this.plugins)s.mustUpdate=e;for(let s=0;s<this.plugins.length;s++)this.plugins[s].update(this);t!=n&&this.inputState.ensureHandlers(this.plugins)}docViewUpdate(){for(let e of this.plugins){let t=e.value;if(t&&t.docViewUpdate)try{t.docViewUpdate(this)}catch(n){it(this.state,n,"doc view update listener")}}}measure(e=!0){if(this.destroyed)return;if(this.measureScheduled>-1&&this.win.cancelAnimationFrame(this.measureScheduled),this.observer.delayedAndroidKey){this.measureScheduled=-1,this.requestMeasure();return}this.measureScheduled=0,e&&this.observer.forceFlush();let t=null,n=this.viewState.scrollParent,s=this.viewState.getScrollOffset(),{scrollAnchorPos:r,scrollAnchorHeight:o}=this.viewState;Math.abs(s-this.viewState.scrollOffset)>1&&(o=-1),this.viewState.scrollAnchorHeight=-1;try{for(let l=0;;l++){if(o<0)if(Xl(n||this.win))r=-1,o=this.viewState.heightMap.height;else{let d=this.viewState.scrollAnchorAt(s);r=d.from,o=d.top}this.updateState=1;let a=this.viewState.measure();if(!a&&!this.measureRequests.length&&this.viewState.scrollTarget==null)break;if(l>5){console.warn(this.measureRequests.length?"Measure loop restarted more than 5 times":"Viewport failed to stabilize");break}let h=[];a&4||([this.measureRequests,h]=[h,this.measureRequests]);let c=h.map(d=>{try{return d.read(this)}catch(p){return it(this.state,p),zo}}),f=Oi.create(this,this.state,[]),u=!1;f.flags|=a,t?t.flags|=a:t=f,this.updateState=2,f.empty||(this.updatePlugins(f),this.inputState.update(f),this.updateAttrs(),u=this.docView.update(f),u&&this.docViewUpdate());for(let d=0;d<h.length;d++)if(c[d]!=zo)try{let p=h[d];p.write&&p.write(c[d],this)}catch(p){it(this.state,p)}if(u&&this.docView.updateSelection(!0),!f.viewportChanged&&this.measureRequests.length==0){if(this.viewState.editorHeight)if(this.viewState.scrollTarget){this.docView.scrollIntoView(this.viewState.scrollTarget),this.viewState.scrollTarget=null,o=-1;continue}else{let p=((r<0?this.viewState.heightMap.height:this.viewState.lineBlockAt(r).top)-o)/this.scaleY;if((p>1||p<-1)&&(n==this.scrollDOM||this.hasFocus||Math.max(this.inputState.lastWheelEvent,this.inputState.lastTouchTime)>Date.now()-100)){s=s+p,n?n.scrollTop+=p:this.win.scrollBy(0,p),o=-1;continue}}break}}}finally{this.updateState=0,this.measureScheduled=-1}if(t&&!t.empty)for(let l of this.state.facet(Js))l(t)}get themeClasses(){return nr+" "+(this.state.facet(tr)?Ra:La)+" "+this.state.facet(hi)}updateAttrs(){let e=Fo(this,da,{class:"cm-editor"+(this.hasFocus?" cm-focused ":" ")+this.themeClasses}),t={spellcheck:"false",autocorrect:"off",autocapitalize:"off",writingsuggestions:"false",translate:"no",contenteditable:this.state.facet(ft)?"true":"false",class:"cm-content",style:`${B.tabSize}: ${this.state.tabSize}`,role:"textbox","aria-multiline":"true"};this.state.readOnly&&(t["aria-readonly"]="true"),Fo(this,Rr,t);let n=this.observer.ignore(()=>{let s=mo(this.contentDOM,this.contentAttrs,t),r=mo(this.dom,this.editorAttrs,e);return s||r});return this.editorAttrs=e,this.contentAttrs=t,n}showAnnouncements(e){let t=!0;for(let n of e)for(let s of n.effects)if(s.is(I.announce)){t&&(this.announceDOM.textContent=""),t=!1;let r=this.announceDOM.appendChild(document.createElement("div"));r.textContent=s.value}}mountStyles(){this.styleModules=this.state.facet(On);let e=this.state.facet(I.cspNonce);Ct.mount(this.root,this.styleModules.concat(v3).reverse(),e?{nonce:e}:void 0)}readMeasured(){if(this.updateState==2)throw new Error("Reading the editor layout isn't allowed during an update");this.updateState==0&&this.measureScheduled>-1&&this.measure(!1)}requestMeasure(e){if(this.measureScheduled<0&&(this.measureScheduled=this.win.requestAnimationFrame(()=>this.measure())),e){if(this.measureRequests.indexOf(e)>-1)return;if(e.key!=null){for(let t=0;t<this.measureRequests.length;t++)if(this.measureRequests[t].key===e.key){this.measureRequests[t]=e;return}}this.measureRequests.push(e)}}plugin(e){let t=this.pluginMap.get(e);return(t===void 0||t&&t.plugin!=e)&&this.pluginMap.set(e,t=this.plugins.find(n=>n.plugin==e)||null),t&&t.update(this).value}get documentTop(){return this.contentDOM.getBoundingClientRect().top+this.viewState.paddingTop}get documentPadding(){return{top:this.viewState.paddingTop,bottom:this.viewState.paddingBottom}}get scaleX(){return this.viewState.scaleX}get scaleY(){return this.viewState.scaleY}elementAtHeight(e){return this.readMeasured(),this.viewState.elementAtHeight(e)}lineBlockAtHeight(e){return this.readMeasured(),this.viewState.lineBlockAtHeight(e)}get viewportLineBlocks(){return this.viewState.viewportLines}lineBlockAt(e){return this.viewState.lineBlockAt(e)}get contentHeight(){return this.viewState.contentHeight}moveByChar(e,t,n){return us(this,e,xo(this,e,t,n))}moveByGroup(e,t){return us(this,e,xo(this,e,t,n=>Rc(this,e.head,n)))}visualLineSide(e,t){let n=this.bidiSpans(e),s=this.textDirectionAt(e.from),r=n[t?n.length-1:0];return w.cursor(r.side(t,s)+e.from,r.forward(!t,s)?1:-1)}moveToLineBoundary(e,t,n=!0){return Lc(this,e,t,n)}moveVertically(e,t,n){return us(this,e,Ic(this,e,t,n))}domAtPos(e,t=1){return this.docView.domAtPos(e,t)}posAtDOM(e,t=0){return this.docView.posFromDOM(e,t)}posAtCoords(e,t=!0){this.readMeasured();let n=Zs(this,e,t);return n&&n.pos}posAndSideAtCoords(e,t=!0){return this.readMeasured(),Zs(this,e,t)}coordsAtPos(e,t=1){this.readMeasured();let n=this.docView.coordsAt(e,t);if(!n||n.left==n.right)return n;let s=this.state.doc.lineAt(e),r=this.bidiSpans(s),o=r[nt.find(r,e-s.from,-1,t)];return Di(n,o.dir==le.LTR==t>0)}coordsForChar(e){return this.readMeasured(),this.docView.coordsForChar(e)}get defaultCharacterWidth(){return this.viewState.heightOracle.charWidth}get defaultLineHeight(){return this.viewState.heightOracle.lineHeight}get textDirection(){return this.viewState.defaultTextDirection}textDirectionAt(e){return!this.state.facet(ha)||e<this.viewport.from||e>this.viewport.to?this.textDirection:(this.readMeasured(),this.docView.textDirectionAt(e))}get lineWrapping(){return this.viewState.heightOracle.lineWrapping}bidiSpans(e){if(e.length>A3)return ta(e.length);let t=this.textDirectionAt(e.from),n;for(let r of this.bidiCache)if(r.from==e.from&&r.dir==t&&(r.fresh||ea(r.isolates,n=yo(this,e))))return r.order;n||(n=yo(this,e));let s=oc(e.text,t,n);return this.bidiCache.push(new Ni(e.from,e.to,t,n,!0,s)),s}get hasFocus(){var e;return(this.dom.ownerDocument.hasFocus()||B.safari&&((e=this.inputState)===null||e===void 0?void 0:e.lastContextMenu)>Date.now()-3e4)&&this.root.activeElement==this.contentDOM}focus(){this.observer.ignore(()=>{Gl(this.contentDOM),this.docView.updateSelection()})}setRoot(e){this._root!=e&&(this._root=e,this.observer.setWindow((e.nodeType==9?e:e.ownerDocument).defaultView||window),this.mountStyles())}destroy(){this.root.activeElement==this.contentDOM&&this.contentDOM.blur();for(let e of this.plugins)e.destroy(this);this.plugins=[],this.inputState.destroy(),this.docView.destroy(),this.dom.remove(),this.observer.destroy(),this.measureScheduled>-1&&this.win.cancelAnimationFrame(this.measureScheduled),this.destroyed=!0}static scrollIntoView(e,t={}){return ii.of(new cn(typeof e=="number"?w.cursor(e):e,t.y,t.x,t.yMargin,t.xMargin))}scrollSnapshot(){let{scrollTop:e,scrollLeft:t}=this.scrollDOM,n=this.viewState.scrollAnchorAt(e);return ii.of(new cn(w.cursor(n.from),"start","start",n.top-e,t,!0))}setTabFocusMode(e){e==null?this.inputState.tabFocusMode=this.inputState.tabFocusMode<0?0:-1:typeof e=="boolean"?this.inputState.tabFocusMode=e?0:-1:this.inputState.tabFocusMode!=0&&(this.inputState.tabFocusMode=Date.now()+e)}static domEventHandlers(e){return lt.define(()=>({}),{eventHandlers:e})}static domEventObservers(e){return lt.define(()=>({}),{eventObservers:e})}static theme(e,t){let n=Ct.newName(),s=[hi.of(n),On.of(ir(`.${n}`,e))];return t&&t.dark&&s.push(tr.of(!0)),s}static baseTheme(e){return Hi.lowest(On.of(ir("."+nr,e,Ia)))}static findFromDOM(e){var t;let n=e.querySelector(".cm-content"),s=n&&he.get(n)||he.get(e);return((t=s==null?void 0:s.root)===null||t===void 0?void 0:t.view)||null}}I.styleModule=On;I.inputHandler=la;I.clipboardInputFilter=Pr;I.clipboardOutputFilter=Lr;I.scrollHandler=fa;I.focusChangeEffect=aa;I.perLineTextDirection=ha;I.exceptionSink=oa;I.updateListener=Js;I.editable=ft;I.mouseSelectionStyle=ra;I.dragMovesSelection=sa;I.clickAddsSelectionRange=ia;I.decorations=Ki;I.blockWrappers=pa;I.outerDecorations=Ir;I.atomicRanges=Qn;I.bidiIsolatedRanges=ma;I.scrollMargins=ga;I.darkTheme=tr;I.cspNonce=L.define({combine:i=>i.length?i[0]:""});I.contentAttributes=Rr;I.editorAttributes=da;I.lineWrapping=I.contentAttributes.of({class:"cm-lineWrapping"});I.announce=de.define();const A3=4096,zo={};class Ni{constructor(e,t,n,s,r,o){this.from=e,this.to=t,this.dir=n,this.isolates=s,this.fresh=r,this.order=o}static update(e,t){if(t.empty&&!e.some(r=>r.fresh))return e;let n=[],s=e.length?e[e.length-1].dir:le.LTR;for(let r=Math.max(0,e.length-10);r<e.length;r++){let o=e[r];o.dir==s&&!t.touchesRange(o.from,o.to)&&n.push(new Ni(t.mapPos(o.from,1),t.mapPos(o.to,-1),o.dir,o.isolates,!1,o.order))}return n}}function Fo(i,e,t){for(let n=i.state.facet(e),s=n.length-1;s>=0;s--){let r=n[s],o=typeof r=="function"?r(i):r;o&&Br(o,t)}return t}const C3=B.mac?"mac":B.windows?"win":B.linux?"linux":"key";function M3(i,e){const t=i.split(/-(?!$)/);let n=t[t.length-1];n=="Space"&&(n=" ");let s,r,o,l;for(let a=0;a<t.length-1;++a){const h=t[a];if(/^(cmd|meta|m)$/i.test(h))l=!0;else if(/^a(lt)?$/i.test(h))s=!0;else if(/^(c|ctrl|control)$/i.test(h))r=!0;else if(/^s(hift)?$/i.test(h))o=!0;else if(/^mod$/i.test(h))e=="mac"?l=!0:r=!0;else throw new Error("Unrecognized modifier name: "+h)}return s&&(n="Alt-"+n),r&&(n="Ctrl-"+n),l&&(n="Meta-"+n),o&&(n="Shift-"+n),n}function ci(i,e,t){return e.altKey&&(i="Alt-"+i),e.ctrlKey&&(i="Ctrl-"+i),e.metaKey&&(i="Meta-"+i),t!==!1&&e.shiftKey&&(i="Shift-"+i),i}const T3=Hi.default(I.domEventHandlers({keydown(i,e){return O3(E3(e.state),i,e,"editor")}})),Na=L.define({enables:T3}),Ho=new WeakMap;function E3(i){let e=i.facet(Na),t=Ho.get(e);return t||Ho.set(e,t=D3(e.reduce((n,s)=>n.concat(s),[]))),t}let xt=null;const B3=4e3;function D3(i,e=C3){let t=Object.create(null),n=Object.create(null),s=(o,l)=>{let a=n[o];if(a==null)n[o]=l;else if(a!=l)throw new Error("Key binding "+o+" is used both as a regular binding and as a multi-stroke prefix")},r=(o,l,a,h,c)=>{var f,u;let d=t[o]||(t[o]=Object.create(null)),p=l.split(/ (?!$)/).map(b=>M3(b,e));for(let b=1;b<p.length;b++){let x=p.slice(0,b).join(" ");s(x,!0),d[x]||(d[x]={preventDefault:!0,stopPropagation:!1,run:[C=>{let R=xt={view:C,prefix:x,scope:o};return setTimeout(()=>{xt==R&&(xt=null)},B3),!0}]})}let m=p.join(" ");s(m,!1);let g=d[m]||(d[m]={preventDefault:!1,stopPropagation:!1,run:((u=(f=d._any)===null||f===void 0?void 0:f.run)===null||u===void 0?void 0:u.slice())||[]});a&&g.run.push(a),h&&(g.preventDefault=!0),c&&(g.stopPropagation=!0)};for(let o of i){let l=o.scope?o.scope.split(" "):["editor"];if(o.any)for(let h of l){let c=t[h]||(t[h]=Object.create(null));c._any||(c._any={preventDefault:!1,stopPropagation:!1,run:[]});let{any:f}=o;for(let u in c)c[u].run.push(d=>f(d,sr))}let a=o[e]||o.key;if(a)for(let h of l)r(h,a,o.run,o.preventDefault,o.stopPropagation),o.shift&&r(h,"Shift-"+a,o.shift,o.preventDefault,o.stopPropagation)}return t}let sr=null;function O3(i,e,t,n){sr=e;let s=$h(e),r=Mh(s,0),o=Th(r)==s.length&&s!=" ",l="",a=!1,h=!1,c=!1;xt&&xt.view==t&&xt.scope==n&&(l=xt.prefix+" ",Ca.indexOf(e.keyCode)<0&&(h=!0,xt=null));let f=new Set,u=g=>{if(g){for(let b of g.run)if(!f.has(b)&&(f.add(b),b(t)))return g.stopPropagation&&(c=!0),!0;g.preventDefault&&(g.stopPropagation&&(c=!0),h=!0)}return!1},d=i[n],p,m;return d&&(u(d[l+ci(s,e,!o)])?a=!0:o&&(e.altKey||e.metaKey||e.ctrlKey)&&!(B.windows&&e.ctrlKey&&e.altKey)&&!(B.mac&&e.altKey&&!(e.ctrlKey||e.metaKey))&&(p=Mt[e.keyCode])&&p!=s?(u(d[l+ci(p,e,!0)])||e.shiftKey&&(m=Wn[e.keyCode])!=s&&m!=p&&u(d[l+ci(m,e,!1)]))&&(a=!0):o&&e.shiftKey&&u(d[l+ci(s,e,!0)])&&(a=!0),!a&&u(d._any)&&(a=!0)),h&&(a=!0),a&&c&&e.stopPropagation(),sr=null,a}class Ft{constructor(e,t,n,s,r){this.className=e,this.left=t,this.top=n,this.width=s,this.height=r}draw(){let e=document.createElement("div");return e.className=this.className,this.adjust(e),e}update(e,t){return t.className!=this.className?!1:(this.adjust(e),!0)}adjust(e){e.style.left=this.left+"px",e.style.top=this.top+"px",this.width!=null&&(e.style.width=this.width+"px"),e.style.height=this.height+"px"}eq(e){return this.left==e.left&&this.top==e.top&&this.width==e.width&&this.height==e.height&&this.className==e.className}static forRange(e,t,n){if(n.empty){let s=e.coordsAtPos(n.head,n.assoc||1);if(!s)return[];let r=qa(e);return[new Ft(t,s.left-r.left,s.top-r.top,null,s.bottom-s.top)]}else return P3(e,t,n)}}function qa(i){let e=i.scrollDOM.getBoundingClientRect();return{left:(i.textDirection==le.LTR?e.left:e.right-i.scrollDOM.clientWidth*i.scaleX)-i.scrollDOM.scrollLeft*i.scaleX,top:e.top-i.scrollDOM.scrollTop*i.scaleY}}function Wo(i,e,t,n){let s=i.coordsAtPos(e,t*2);if(!s)return n;let r=i.dom.getBoundingClientRect(),o=(s.top+s.bottom)/2,l=i.posAtCoords({x:r.left+1,y:o}),a=i.posAtCoords({x:r.right-1,y:o});return l==null||a==null?n:{from:Math.max(n.from,Math.min(l,a)),to:Math.min(n.to,Math.max(l,a))}}function P3(i,e,t){if(t.to<=i.viewport.from||t.from>=i.viewport.to)return[];let n=Math.max(t.from,i.viewport.from),s=Math.min(t.to,i.viewport.to),r=i.textDirection==le.LTR,o=i.contentDOM,l=o.getBoundingClientRect(),a=qa(i),h=o.querySelector(".cm-line"),c=h&&window.getComputedStyle(h),f=l.left+(c?parseInt(c.paddingLeft)+Math.min(0,parseInt(c.textIndent)):0),u=l.right-(c?parseInt(c.paddingRight):0),d=Qs(i,n,1),p=Qs(i,s,-1),m=d.type==ke.Text?d:null,g=p.type==ke.Text?p:null;if(m&&(i.lineWrapping||d.widgetLineBreaks)&&(m=Wo(i,n,1,m)),g&&(i.lineWrapping||p.widgetLineBreaks)&&(g=Wo(i,s,-1,g)),m&&g&&m.from==g.from&&m.to==g.to)return x(C(t.from,t.to,m));{let S=m?C(t.from,null,m):R(d,!1),k=g?C(null,t.to,g):R(p,!0),v=[];return(m||d).to<(g||p).from-(m&&g?1:0)||d.widgetLineBreaks>1&&S.bottom+i.defaultLineHeight/2<k.top?v.push(b(f,S.bottom,u,k.top)):S.bottom<k.top&&i.elementAtHeight((S.bottom+k.top)/2).type==ke.Text&&(S.bottom=k.top=(S.bottom+k.top)/2),x(S).concat(v).concat(x(k))}function b(S,k,v,D){return new Ft(e,S-a.left,k-a.top,Math.max(0,v-S),D-k)}function x({top:S,bottom:k,horizontal:v}){let D=[];for(let M=0;M<v.length;M+=2)D.push(b(v[M],S,v[M+1],k));return D}function C(S,k,v){let D=1e9,M=-1e9,_=[];function P(N,F,U,V,te){let W=i.coordsAtPos(N,N==v.to?-2:2),ne=i.coordsAtPos(U,U==v.from?2:-2);!W||!ne||(D=Math.min(W.top,ne.top,D),M=Math.max(W.bottom,ne.bottom,M),te==le.LTR?_.push(r&&F?f:W.left,r&&V?u:ne.right):_.push(!r&&V?f:ne.left,!r&&F?u:W.right))}let E=S??v.from,H=k??v.to;for(let N of i.visibleRanges)if(N.to>E&&N.from<H)for(let F=Math.max(N.from,E),U=Math.min(N.to,H);;){let V=i.state.doc.lineAt(F);for(let te of i.bidiSpans(V)){let W=te.from+V.from,ne=te.to+V.from;if(W>=U)break;ne>F&&P(Math.max(W,F),S==null&&W<=E,Math.min(ne,U),k==null&&ne>=H,te.dir)}if(F=V.to+1,F>=U)break}return _.length==0&&P(E,S==null,H,k==null,i.textDirection),{top:D,bottom:M,horizontal:_}}function R(S,k){let v=l.top+(k?S.top:S.bottom);return{top:v,bottom:v,horizontal:[]}}}function L3(i,e){return i.constructor==e.constructor&&i.eq(e)}class R3{constructor(e,t){this.view=e,this.layer=t,this.drawn=[],this.scaleX=1,this.scaleY=1,this.measureReq={read:this.measure.bind(this),write:this.draw.bind(this)},this.dom=e.scrollDOM.appendChild(document.createElement("div")),this.dom.classList.add("cm-layer"),t.above&&this.dom.classList.add("cm-layer-above"),t.class&&this.dom.classList.add(t.class),this.scale(),this.dom.setAttribute("aria-hidden","true"),this.setOrder(e.state),e.requestMeasure(this.measureReq),t.mount&&t.mount(this.dom,e)}update(e){e.startState.facet(Si)!=e.state.facet(Si)&&this.setOrder(e.state),(this.layer.update(e,this.dom)||e.geometryChanged)&&(this.scale(),e.view.requestMeasure(this.measureReq))}docViewUpdate(e){this.layer.updateOnDocViewUpdate!==!1&&e.requestMeasure(this.measureReq)}setOrder(e){let t=0,n=e.facet(Si);for(;t<n.length&&n[t]!=this.layer;)t++;this.dom.style.zIndex=String((this.layer.above?150:-1)-t)}measure(){return this.layer.markers(this.view)}scale(){let{scaleX:e,scaleY:t}=this.view;(e!=this.scaleX||t!=this.scaleY)&&(this.scaleX=e,this.scaleY=t,this.dom.style.transform=`scale(${1/e}, ${1/t})`)}draw(e){if(e.length!=this.drawn.length||e.some((t,n)=>!L3(t,this.drawn[n]))){let t=this.dom.firstChild,n=0;for(let s of e)s.update&&t&&s.constructor&&this.drawn[n].constructor&&s.update(t,this.drawn[n])?(t=t.nextSibling,n++):this.dom.insertBefore(s.draw(),t);for(;t;){let s=t.nextSibling;t.remove(),t=s}this.drawn=e,B.safari&&B.safari_version>=26&&(this.dom.style.display=this.dom.firstChild?"":"none")}}destroy(){this.layer.destroy&&this.layer.destroy(this.dom,this.view),this.dom.remove()}}const Si=L.define();function _a(i){return[lt.define(e=>new R3(e,i)),Si.of(i)]}const mn=L.define({combine(i){return Mr(i,{cursorBlinkRate:1200,drawRangeCursor:!0,iosSelectionHandles:!0},{cursorBlinkRate:(e,t)=>Math.min(e,t),drawRangeCursor:(e,t)=>e||t})}});function I3(i={}){return[mn.of(i),N3,q3,_3,ca.of(!0)]}function za(i){return i.startState.facet(mn)!=i.state.facet(mn)}const N3=_a({above:!0,markers(i){let{state:e}=i,t=e.facet(mn),n=[];for(let s of e.selection.ranges){let r=s==e.selection.main;if(s.empty||t.drawRangeCursor&&!(r&&B.ios&&t.iosSelectionHandles)){let o=r?"cm-cursor cm-cursor-primary":"cm-cursor cm-cursor-secondary",l=s.empty?s:w.cursor(s.head,s.assoc);for(let a of Ft.forRange(i,o,l))n.push(a)}}return n},update(i,e){i.transactions.some(n=>n.selection)&&(e.style.animationName=e.style.animationName=="cm-blink"?"cm-blink2":"cm-blink");let t=za(i);return t&&Vo(i.state,e),i.docChanged||i.selectionSet||t},mount(i,e){Vo(e.state,i)},class:"cm-cursorLayer"});function Vo(i,e){e.style.animationDuration=i.facet(mn).cursorBlinkRate+"ms"}const q3=_a({above:!1,markers(i){let e=[],{main:t,ranges:n}=i.state.selection;for(let s of n)if(!s.empty)for(let r of Ft.forRange(i,"cm-selectionBackground",s))e.push(r);if(B.ios&&!t.empty&&i.state.facet(mn).iosSelectionHandles){for(let s of Ft.forRange(i,"cm-selectionHandle cm-selectionHandle-start",w.cursor(t.from,1)))e.push(s);for(let s of Ft.forRange(i,"cm-selectionHandle cm-selectionHandle-end",w.cursor(t.to,1)))e.push(s)}return e},update(i,e){return i.docChanged||i.selectionSet||i.viewportChanged||za(i)},class:"cm-selectionLayer"}),_3=Hi.highest(I.theme({".cm-line":{"& ::selection, &::selection":{backgroundColor:"transparent !important"},caretColor:"transparent !important"},".cm-content":{caretColor:"transparent !important","& :focus":{caretColor:"initial !important","&::selection, & ::selection":{backgroundColor:"Highlight !important"}}}}));function z3(){return H3}const F3=pe.line({class:"cm-activeLine"}),H3=lt.fromClass(class{constructor(i){this.decorations=this.getDeco(i)}update(i){(i.docChanged||i.selectionSet)&&(this.decorations=this.getDeco(i.view))}getDeco(i){let e=-1,t=[];for(let n of i.state.selection.ranges){let s=i.lineBlockAt(n.head);s.from>e&&(t.push(F3.range(s.from)),e=s.from)}return pe.set(t)}},{decorations:i=>i.decorations});class jt extends Vt{compare(e){return this==e||this.constructor==e.constructor&&this.eq(e)}eq(e){return!1}destroy(e){}}jt.prototype.elementClass="";jt.prototype.toDOM=void 0;jt.prototype.mapMode=Ie.TrackBefore;jt.prototype.startSide=jt.prototype.endSide=-1;jt.prototype.point=!0;const ms=L.define(),W3=L.define(),Ai=L.define(),$o=L.define({combine:i=>i.some(e=>e)});function V3(i){return[$3]}const $3=lt.fromClass(class{constructor(i){this.view=i,this.domAfter=null,this.prevViewport=i.viewport,this.dom=document.createElement("div"),this.dom.className="cm-gutters cm-gutters-before",this.dom.setAttribute("aria-hidden","true"),this.dom.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.gutters=i.state.facet(Ai).map(e=>new Ko(i,e)),this.fixed=!i.state.facet($o);for(let e of this.gutters)e.config.side=="after"?this.getDOMAfter().appendChild(e.dom):this.dom.appendChild(e.dom);this.fixed&&(this.dom.style.position="sticky"),this.syncGutters(!1),i.scrollDOM.insertBefore(this.dom,i.contentDOM)}getDOMAfter(){return this.domAfter||(this.domAfter=document.createElement("div"),this.domAfter.className="cm-gutters cm-gutters-after",this.domAfter.setAttribute("aria-hidden","true"),this.domAfter.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.domAfter.style.position=this.fixed?"sticky":"",this.view.scrollDOM.appendChild(this.domAfter)),this.domAfter}update(i){if(this.updateGutters(i)){let e=this.prevViewport,t=i.view.viewport,n=Math.min(e.to,t.to)-Math.max(e.from,t.from);this.syncGutters(n<(t.to-t.from)*.8)}if(i.geometryChanged){let e=this.view.contentHeight/this.view.scaleY+"px";this.dom.style.minHeight=e,this.domAfter&&(this.domAfter.style.minHeight=e)}this.view.state.facet($o)!=!this.fixed&&(this.fixed=!this.fixed,this.dom.style.position=this.fixed?"sticky":"",this.domAfter&&(this.domAfter.style.position=this.fixed?"sticky":"")),this.prevViewport=i.view.viewport}syncGutters(i){let e=this.dom.nextSibling;i&&(this.dom.remove(),this.domAfter&&this.domAfter.remove());let t=X.iter(this.view.state.facet(ms),this.view.viewport.from),n=[],s=this.gutters.map(r=>new U3(r,this.view.viewport,-this.view.documentPadding.top));for(let r of this.view.viewportLineBlocks)if(n.length&&(n=[]),Array.isArray(r.type)){let o=!0;for(let l of r.type)if(l.type==ke.Text&&o){rr(t,n,l.from);for(let a of s)a.line(this.view,l,n);o=!1}else if(l.widget)for(let a of s)a.widget(this.view,l)}else if(r.type==ke.Text){rr(t,n,r.from);for(let o of s)o.line(this.view,r,n)}else if(r.widget)for(let o of s)o.widget(this.view,r);for(let r of s)r.finish();i&&(this.view.scrollDOM.insertBefore(this.dom,e),this.domAfter&&this.view.scrollDOM.appendChild(this.domAfter))}updateGutters(i){let e=i.startState.facet(Ai),t=i.state.facet(Ai),n=i.docChanged||i.heightChanged||i.viewportChanged||!X.eq(i.startState.facet(ms),i.state.facet(ms),i.view.viewport.from,i.view.viewport.to);if(e==t)for(let s of this.gutters)s.update(i)&&(n=!0);else{n=!0;let s=[];for(let r of t){let o=e.indexOf(r);o<0?s.push(new Ko(this.view,r)):(this.gutters[o].update(i),s.push(this.gutters[o]))}for(let r of this.gutters)r.dom.remove(),s.indexOf(r)<0&&r.destroy();for(let r of s)r.config.side=="after"?this.getDOMAfter().appendChild(r.dom):this.dom.appendChild(r.dom);this.gutters=s}return n}destroy(){for(let i of this.gutters)i.destroy();this.dom.remove(),this.domAfter&&this.domAfter.remove()}},{provide:i=>I.scrollMargins.of(e=>{let t=e.plugin(i);if(!t||t.gutters.length==0||!t.fixed)return null;let n=t.dom.offsetWidth*e.scaleX,s=t.domAfter?t.domAfter.offsetWidth*e.scaleX:0;return e.textDirection==le.LTR?{left:n,right:s}:{right:n,left:s}})});function Uo(i){return Array.isArray(i)?i:[i]}function rr(i,e,t){for(;i.value&&i.from<=t;)i.from==t&&e.push(i.value),i.next()}class U3{constructor(e,t,n){this.gutter=e,this.height=n,this.i=0,this.cursor=X.iter(e.markers,t.from)}addElement(e,t,n){let{gutter:s}=this,r=(t.top-this.height)/e.scaleY,o=t.height/e.scaleY;if(this.i==s.elements.length){let l=new Fa(e,o,r,n);s.elements.push(l),s.dom.appendChild(l.dom)}else s.elements[this.i].update(e,o,r,n);this.height=t.bottom,this.i++}line(e,t,n){let s=[];rr(this.cursor,s,t.from),n.length&&(s=s.concat(n));let r=this.gutter.config.lineMarker(e,t,s);r&&s.unshift(r);let o=this.gutter;s.length==0&&!o.config.renderEmptyElements||this.addElement(e,t,s)}widget(e,t){let n=this.gutter.config.widgetMarker(e,t.widget,t),s=n?[n]:null;for(let r of e.state.facet(W3)){let o=r(e,t.widget,t);o&&(s||(s=[])).push(o)}s&&this.addElement(e,t,s)}finish(){let e=this.gutter;for(;e.elements.length>this.i;){let t=e.elements.pop();e.dom.removeChild(t.dom),t.destroy()}}}class Ko{constructor(e,t){this.view=e,this.config=t,this.elements=[],this.spacer=null,this.dom=document.createElement("div"),this.dom.className="cm-gutter"+(this.config.class?" "+this.config.class:"");for(let n in t.domEventHandlers)this.dom.addEventListener(n,s=>{let r=s.target,o;if(r!=this.dom&&this.dom.contains(r)){for(;r.parentNode!=this.dom;)r=r.parentNode;let a=r.getBoundingClientRect();o=(a.top+a.bottom)/2}else o=s.clientY;let l=e.lineBlockAtHeight(o-e.documentTop);t.domEventHandlers[n](e,l,s)&&s.preventDefault()});this.markers=Uo(t.markers(e)),t.initialSpacer&&(this.spacer=new Fa(e,0,0,[t.initialSpacer(e)]),this.dom.appendChild(this.spacer.dom),this.spacer.dom.style.cssText+="visibility: hidden; pointer-events: none")}update(e){let t=this.markers;if(this.markers=Uo(this.config.markers(e.view)),this.spacer&&this.config.updateSpacer){let s=this.config.updateSpacer(this.spacer.markers[0],e);s!=this.spacer.markers[0]&&this.spacer.update(e.view,0,0,[s])}let n=e.view.viewport;return!X.eq(this.markers,t,n.from,n.to)||(this.config.lineMarkerChange?this.config.lineMarkerChange(e):!1)}destroy(){for(let e of this.elements)e.destroy()}}class Fa{constructor(e,t,n,s){this.height=-1,this.above=0,this.markers=[],this.dom=document.createElement("div"),this.dom.className="cm-gutterElement",this.update(e,t,n,s)}update(e,t,n,s){this.height!=t&&(this.height=t,this.dom.style.height=t+"px"),this.above!=n&&(this.dom.style.marginTop=(this.above=n)?n+"px":""),K3(this.markers,s)||this.setMarkers(e,s)}setMarkers(e,t){let n="cm-gutterElement",s=this.dom.firstChild;for(let r=0,o=0;;){let l=o,a=r<t.length?t[r++]:null,h=!1;if(a){let c=a.elementClass;c&&(n+=" "+c);for(let f=o;f<this.markers.length;f++)if(this.markers[f].compare(a)){l=f,h=!0;break}}else l=this.markers.length;for(;o<l;){let c=this.markers[o++];if(c.toDOM){c.destroy(s);let f=s.nextSibling;s.remove(),s=f}}if(!a)break;a.toDOM&&(h?s=s.nextSibling:this.dom.insertBefore(a.toDOM(e),s)),h&&o++}this.dom.className=n,this.markers=t}destroy(){this.setMarkers(null,[])}}function K3(i,e){if(i.length!=e.length)return!1;for(let t=0;t<i.length;t++)if(!i[t].compare(e[t]))return!1;return!0}const j3=L.define(),G3=L.define(),sn=L.define({combine(i){return Mr(i,{formatNumber:String,domEventHandlers:{}},{domEventHandlers(e,t){let n=Object.assign({},e);for(let s in t){let r=n[s],o=t[s];n[s]=r?(l,a,h)=>r(l,a,h)||o(l,a,h):o}return n}})}});class gs extends jt{constructor(e){super(),this.number=e}eq(e){return this.number==e.number}toDOM(){return document.createTextNode(this.number)}}function bs(i,e){return i.state.facet(sn).formatNumber(e,i.state)}const X3=Ai.compute([sn],i=>({class:"cm-lineNumbers",renderEmptyElements:!1,markers(e){return e.state.facet(j3)},lineMarker(e,t,n){return n.some(s=>s.toDOM)?null:new gs(bs(e,e.state.doc.lineAt(t.from).number))},widgetMarker:(e,t,n)=>{for(let s of e.state.facet(G3)){let r=s(e,t,n);if(r)return r}return null},lineMarkerChange:e=>e.startState.facet(sn)!=e.state.facet(sn),initialSpacer(e){return new gs(bs(e,jo(e.state.doc.lines)))},updateSpacer(e,t){let n=bs(t.view,jo(t.view.state.doc.lines));return n==e.number?e:new gs(n)},domEventHandlers:i.facet(sn).domEventHandlers,side:"before"}));function J3(i={}){return[sn.of(i),V3(),X3]}function jo(i){let e=9;for(;e<i;)e=e*10+9;return e}const Y3=1024;let Q3=0;class ys{constructor(e,t){this.from=e,this.to=t}}class K{constructor(e={}){this.id=Q3++,this.perNode=!!e.perNode,this.deserialize=e.deserialize||(()=>{throw new Error("This node type doesn't define a deserialize function")}),this.combine=e.combine||null}add(e){if(this.perNode)throw new RangeError("Can't add per-node props to node types");return typeof e!="function"&&(e=Pe.match(e)),t=>{let n=e(t);return n===void 0?null:[this,n]}}}K.closedBy=new K({deserialize:i=>i.split(" ")});K.openedBy=new K({deserialize:i=>i.split(" ")});K.group=new K({deserialize:i=>i.split(" ")});K.isolate=new K({deserialize:i=>{if(i&&i!="rtl"&&i!="ltr"&&i!="auto")throw new RangeError("Invalid value for isolate: "+i);return i||"auto"}});K.contextHash=new K({perNode:!0});K.lookAhead=new K({perNode:!0});K.mounted=new K({perNode:!0});class _n{constructor(e,t,n,s=!1){this.tree=e,this.overlay=t,this.parser=n,this.bracketed=s}static get(e){return e&&e.props&&e.props[K.mounted.id]}}const Z3=Object.create(null);class Pe{constructor(e,t,n,s=0){this.name=e,this.props=t,this.id=n,this.flags=s}static define(e){let t=e.props&&e.props.length?Object.create(null):Z3,n=(e.top?1:0)|(e.skipped?2:0)|(e.error?4:0)|(e.name==null?8:0),s=new Pe(e.name||"",t,e.id,n);if(e.props){for(let r of e.props)if(Array.isArray(r)||(r=r(s)),r){if(r[0].perNode)throw new RangeError("Can't store a per-node prop on a node type");t[r[0].id]=r[1]}}return s}prop(e){return this.props[e.id]}get isTop(){return(this.flags&1)>0}get isSkipped(){return(this.flags&2)>0}get isError(){return(this.flags&4)>0}get isAnonymous(){return(this.flags&8)>0}is(e){if(typeof e=="string"){if(this.name==e)return!0;let t=this.prop(K.group);return t?t.indexOf(e)>-1:!1}return this.id==e}static match(e){let t=Object.create(null);for(let n in e)for(let s of n.split(" "))t[s]=e[n];return n=>{for(let s=n.prop(K.group),r=-1;r<(s?s.length:0);r++){let o=t[r<0?n.name:s[r]];if(o)return o}}}}Pe.none=new Pe("",Object.create(null),0,8);class zr{constructor(e){this.types=e;for(let t=0;t<e.length;t++)if(e[t].id!=t)throw new RangeError("Node type ids should correspond to array positions when creating a node set")}extend(...e){let t=[];for(let n of this.types){let s=null;for(let r of e){let o=r(n);if(o){s||(s=Object.assign({},n.props));let l=o[1],a=o[0];a.combine&&a.id in s&&(l=a.combine(s[a.id],l)),s[a.id]=l}}t.push(s?new Pe(n.name,s,n.id,n.flags):n)}return new zr(t)}}const fi=new WeakMap,Go=new WeakMap;var ue;(function(i){i[i.ExcludeBuffers=1]="ExcludeBuffers",i[i.IncludeAnonymous=2]="IncludeAnonymous",i[i.IgnoreMounts=4]="IgnoreMounts",i[i.IgnoreOverlays=8]="IgnoreOverlays",i[i.EnterBracketed=16]="EnterBracketed"})(ue||(ue={}));class ae{constructor(e,t,n,s,r){if(this.type=e,this.children=t,this.positions=n,this.length=s,this.props=null,r&&r.length){this.props=Object.create(null);for(let[o,l]of r)this.props[typeof o=="number"?o:o.id]=l}}toString(){let e=_n.get(this);if(e&&!e.overlay)return e.tree.toString();let t="";for(let n of this.children){let s=n.toString();s&&(t&&(t+=","),t+=s)}return this.type.name?(/\W/.test(this.type.name)&&!this.type.isError?JSON.stringify(this.type.name):this.type.name)+(t.length?"("+t+")":""):t}cursor(e=0){return new lr(this.topNode,e)}cursorAt(e,t=0,n=0){let s=fi.get(this)||this.topNode,r=new lr(s);return r.moveTo(e,t),fi.set(this,r._tree),r}get topNode(){return new He(this,0,0,null)}resolve(e,t=0){let n=Kn(fi.get(this)||this.topNode,e,t,!1);return fi.set(this,n),n}resolveInner(e,t=0){let n=Kn(Go.get(this)||this.topNode,e,t,!0);return Go.set(this,n),n}resolveStack(e,t=0){return n9(this,e,t)}iterate(e){let{enter:t,leave:n,from:s=0,to:r=this.length}=e,o=e.mode||0,l=(o&ue.IncludeAnonymous)>0;for(let a=this.cursor(o|ue.IncludeAnonymous);;){let h=!1;if(a.from<=r&&a.to>=s&&(!l&&a.type.isAnonymous||t(a)!==!1)){if(a.firstChild())continue;h=!0}for(;h&&n&&(l||!a.type.isAnonymous)&&n(a),!a.nextSibling();){if(!a.parent())return;h=!0}}}prop(e){return e.perNode?this.props?this.props[e.id]:void 0:this.type.prop(e)}get propValues(){let e=[];if(this.props)for(let t in this.props)e.push([+t,this.props[t]]);return e}balance(e={}){return this.children.length<=8?this:Wr(Pe.none,this.children,this.positions,0,this.children.length,0,this.length,(t,n,s)=>new ae(this.type,t,n,s,this.propValues),e.makeTree||((t,n,s)=>new ae(Pe.none,t,n,s)))}static build(e){return i9(e)}}ae.empty=new ae(Pe.none,[],[],0);class Fr{constructor(e,t){this.buffer=e,this.index=t}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.index-2]}get size(){return this.buffer[this.index-1]}get pos(){return this.index}next(){this.index-=4}fork(){return new Fr(this.buffer,this.index)}}class Et{constructor(e,t,n){this.buffer=e,this.length=t,this.set=n}get type(){return Pe.none}toString(){let e=[];for(let t=0;t<this.buffer.length;)e.push(this.childString(t)),t=this.buffer[t+3];return e.join(",")}childString(e){let t=this.buffer[e],n=this.buffer[e+3],s=this.set.types[t],r=s.name;if(/\W/.test(r)&&!s.isError&&(r=JSON.stringify(r)),e+=4,n==e)return r;let o=[];for(;e<n;)o.push(this.childString(e)),e=this.buffer[e+3];return r+"("+o.join(",")+")"}findChild(e,t,n,s,r){let{buffer:o}=this,l=-1;for(let a=e;a!=t&&!(Ha(r,s,o[a+1],o[a+2])&&(l=a,n>0));a=o[a+3]);return l}slice(e,t,n){let s=this.buffer,r=new Uint16Array(t-e),o=0;for(let l=e,a=0;l<t;){r[a++]=s[l++],r[a++]=s[l++]-n;let h=r[a++]=s[l++]-n;r[a++]=s[l++]-e,o=Math.max(o,h)}return new Et(r,o,this.set)}}function Ha(i,e,t,n){switch(i){case-2:return t<e;case-1:return n>=e&&t<e;case 0:return t<e&&n>e;case 1:return t<=e&&n>e;case 2:return n>e;case 4:return!0}}function Kn(i,e,t,n){for(var s;i.from==i.to||(t<1?i.from>=e:i.from>e)||(t>-1?i.to<=e:i.to<e);){let o=!n&&i instanceof He&&i.index<0?null:i.parent;if(!o)return i;i=o}let r=n?0:ue.IgnoreOverlays;if(n)for(let o=i,l=o.parent;l;o=l,l=o.parent)o instanceof He&&o.index<0&&((s=l.enter(e,t,r))===null||s===void 0?void 0:s.from)!=o.from&&(i=l);for(;;){let o=i.enter(e,t,r);if(!o)return i;i=o}}class Wa{cursor(e=0){return new lr(this,e)}getChild(e,t=null,n=null){let s=Xo(this,e,t,n);return s.length?s[0]:null}getChildren(e,t=null,n=null){return Xo(this,e,t,n)}resolve(e,t=0){return Kn(this,e,t,!1)}resolveInner(e,t=0){return Kn(this,e,t,!0)}matchContext(e){return or(this.parent,e)}enterUnfinishedNodesBefore(e){let t=this.childBefore(e),n=this;for(;t;){let s=t.lastChild;if(!s||s.to!=t.to)break;s.type.isError&&s.from==s.to?(n=t,t=s.prevSibling):t=s}return n}get node(){return this}get next(){return this.parent}}class He extends Wa{constructor(e,t,n,s){super(),this._tree=e,this.from=t,this.index=n,this._parent=s}get type(){return this._tree.type}get name(){return this._tree.type.name}get to(){return this.from+this._tree.length}nextChild(e,t,n,s,r=0){for(let o=this;;){for(let{children:l,positions:a}=o._tree,h=t>0?l.length:-1;e!=h;e+=t){let c=l[e],f=a[e]+o.from,u;if(!(!(r&ue.EnterBracketed&&c instanceof ae&&(u=_n.get(c))&&!u.overlay&&u.bracketed&&n>=f&&n<=f+c.length)&&!Ha(s,n,f,f+c.length))){if(c instanceof Et){if(r&ue.ExcludeBuffers)continue;let d=c.findChild(0,c.buffer.length,t,n-f,s);if(d>-1)return new At(new e9(o,c,e,f),null,d)}else if(r&ue.IncludeAnonymous||!c.type.isAnonymous||Hr(c)){let d;if(!(r&ue.IgnoreMounts)&&(d=_n.get(c))&&!d.overlay)return new He(d.tree,f,e,o);let p=new He(c,f,e,o);return r&ue.IncludeAnonymous||!p.type.isAnonymous?p:p.nextChild(t<0?c.children.length-1:0,t,n,s,r)}}}if(r&ue.IncludeAnonymous||!o.type.isAnonymous||(o.index>=0?e=o.index+t:e=t<0?-1:o._parent._tree.children.length,o=o._parent,!o))return null}}get firstChild(){return this.nextChild(0,1,0,4)}get lastChild(){return this.nextChild(this._tree.children.length-1,-1,0,4)}childAfter(e){return this.nextChild(0,1,e,2)}childBefore(e){return this.nextChild(this._tree.children.length-1,-1,e,-2)}prop(e){return this._tree.prop(e)}enter(e,t,n=0){let s;if(!(n&ue.IgnoreOverlays)&&(s=_n.get(this._tree))&&s.overlay){let r=e-this.from,o=n&ue.EnterBracketed&&s.bracketed;for(let{from:l,to:a}of s.overlay)if((t>0||o?l<=r:l<r)&&(t<0||o?a>=r:a>r))return new He(s.tree,s.overlay[0].from+this.from,-1,this)}return this.nextChild(0,1,e,t,n)}nextSignificantParent(){let e=this;for(;e.type.isAnonymous&&e._parent;)e=e._parent;return e}get parent(){return this._parent?this._parent.nextSignificantParent():null}get nextSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index+1,1,0,4):null}get prevSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index-1,-1,0,4):null}get tree(){return this._tree}toTree(){return this._tree}toString(){return this._tree.toString()}}function Xo(i,e,t,n){let s=i.cursor(),r=[];if(!s.firstChild())return r;if(t!=null){for(let o=!1;!o;)if(o=s.type.is(t),!s.nextSibling())return r}for(;;){if(n!=null&&s.type.is(n))return r;if(s.type.is(e)&&r.push(s.node),!s.nextSibling())return n==null?r:[]}}function or(i,e,t=e.length-1){for(let n=i;t>=0;n=n.parent){if(!n)return!1;if(!n.type.isAnonymous){if(e[t]&&e[t]!=n.name)return!1;t--}}return!0}class e9{constructor(e,t,n,s){this.parent=e,this.buffer=t,this.index=n,this.start=s}}class At extends Wa{get name(){return this.type.name}get from(){return this.context.start+this.context.buffer.buffer[this.index+1]}get to(){return this.context.start+this.context.buffer.buffer[this.index+2]}constructor(e,t,n){super(),this.context=e,this._parent=t,this.index=n,this.type=e.buffer.set.types[e.buffer.buffer[n]]}child(e,t,n){let{buffer:s}=this.context,r=s.findChild(this.index+4,s.buffer[this.index+3],e,t-this.context.start,n);return r<0?null:new At(this.context,this,r)}get firstChild(){return this.child(1,0,4)}get lastChild(){return this.child(-1,0,4)}childAfter(e){return this.child(1,e,2)}childBefore(e){return this.child(-1,e,-2)}prop(e){return this.type.prop(e)}enter(e,t,n=0){if(n&ue.ExcludeBuffers)return null;let{buffer:s}=this.context,r=s.findChild(this.index+4,s.buffer[this.index+3],t>0?1:-1,e-this.context.start,t);return r<0?null:new At(this.context,this,r)}get parent(){return this._parent||this.context.parent.nextSignificantParent()}externalSibling(e){return this._parent?null:this.context.parent.nextChild(this.context.index+e,e,0,4)}get nextSibling(){let{buffer:e}=this.context,t=e.buffer[this.index+3];return t<(this._parent?e.buffer[this._parent.index+3]:e.buffer.length)?new At(this.context,this._parent,t):this.externalSibling(1)}get prevSibling(){let{buffer:e}=this.context,t=this._parent?this._parent.index+4:0;return this.index==t?this.externalSibling(-1):new At(this.context,this._parent,e.findChild(t,this.index,-1,0,4))}get tree(){return null}toTree(){let e=[],t=[],{buffer:n}=this.context,s=this.index+4,r=n.buffer[this.index+3];if(r>s){let o=n.buffer[this.index+1];e.push(n.slice(s,r,o)),t.push(0)}return new ae(this.type,e,t,this.to-this.from)}toString(){return this.context.buffer.childString(this.index)}}function Va(i){if(!i.length)return null;let e=0,t=i[0];for(let r=1;r<i.length;r++){let o=i[r];(o.from>t.from||o.to<t.to)&&(t=o,e=r)}let n=t instanceof He&&t.index<0?null:t.parent,s=i.slice();return n?s[e]=n:s.splice(e,1),new t9(s,t)}class t9{constructor(e,t){this.heads=e,this.node=t}get next(){return Va(this.heads)}}function n9(i,e,t){let n=i.resolveInner(e,t),s=null;for(let r=n instanceof He?n:n.context.parent;r;r=r.parent)if(r.index<0){let o=r.parent;(s||(s=[n])).push(o.resolve(e,t)),r=o}else{let o=_n.get(r.tree);if(o&&o.overlay&&o.overlay[0].from<=e&&o.overlay[o.overlay.length-1].to>=e){let l=new He(o.tree,o.overlay[0].from+r.from,-1,r);(s||(s=[n])).push(Kn(l,e,t,!1))}}return s?Va(s):n}class lr{get name(){return this.type.name}constructor(e,t=0){if(this.buffer=null,this.stack=[],this.index=0,this.bufferNode=null,this.mode=t&~ue.EnterBracketed,e instanceof He)this.yieldNode(e);else{this._tree=e.context.parent,this.buffer=e.context;for(let n=e._parent;n;n=n._parent)this.stack.unshift(n.index);this.bufferNode=e,this.yieldBuf(e.index)}}yieldNode(e){return e?(this._tree=e,this.type=e.type,this.from=e.from,this.to=e.to,!0):!1}yieldBuf(e,t){this.index=e;let{start:n,buffer:s}=this.buffer;return this.type=t||s.set.types[s.buffer[e]],this.from=n+s.buffer[e+1],this.to=n+s.buffer[e+2],!0}yield(e){return e?e instanceof He?(this.buffer=null,this.yieldNode(e)):(this.buffer=e.context,this.yieldBuf(e.index,e.type)):!1}toString(){return this.buffer?this.buffer.buffer.childString(this.index):this._tree.toString()}enterChild(e,t,n){if(!this.buffer)return this.yield(this._tree.nextChild(e<0?this._tree._tree.children.length-1:0,e,t,n,this.mode));let{buffer:s}=this.buffer,r=s.findChild(this.index+4,s.buffer[this.index+3],e,t-this.buffer.start,n);return r<0?!1:(this.stack.push(this.index),this.yieldBuf(r))}firstChild(){return this.enterChild(1,0,4)}lastChild(){return this.enterChild(-1,0,4)}childAfter(e){return this.enterChild(1,e,2)}childBefore(e){return this.enterChild(-1,e,-2)}enter(e,t,n=this.mode){return this.buffer?n&ue.ExcludeBuffers?!1:this.enterChild(1,e,t):this.yield(this._tree.enter(e,t,n))}parent(){if(!this.buffer)return this.yieldNode(this.mode&ue.IncludeAnonymous?this._tree._parent:this._tree.parent);if(this.stack.length)return this.yieldBuf(this.stack.pop());let e=this.mode&ue.IncludeAnonymous?this.buffer.parent:this.buffer.parent.nextSignificantParent();return this.buffer=null,this.yieldNode(e)}sibling(e){if(!this.buffer)return this._tree._parent?this.yield(this._tree.index<0?null:this._tree._parent.nextChild(this._tree.index+e,e,0,4,this.mode)):!1;let{buffer:t}=this.buffer,n=this.stack.length-1;if(e<0){let s=n<0?0:this.stack[n]+4;if(this.index!=s)return this.yieldBuf(t.findChild(s,this.index,-1,0,4))}else{let s=t.buffer[this.index+3];if(s<(n<0?t.buffer.length:t.buffer[this.stack[n]+3]))return this.yieldBuf(s)}return n<0?this.yield(this.buffer.parent.nextChild(this.buffer.index+e,e,0,4,this.mode)):!1}nextSibling(){return this.sibling(1)}prevSibling(){return this.sibling(-1)}atLastNode(e){let t,n,{buffer:s}=this;if(s){if(e>0){if(this.index<s.buffer.buffer.length)return!1}else for(let r=0;r<this.index;r++)if(s.buffer.buffer[r+3]<this.index)return!1;({index:t,parent:n}=s)}else({index:t,_parent:n}=this._tree);for(;n;{index:t,_parent:n}=n)if(t>-1)for(let r=t+e,o=e<0?-1:n._tree.children.length;r!=o;r+=e){let l=n._tree.children[r];if(this.mode&ue.IncludeAnonymous||l instanceof Et||!l.type.isAnonymous||Hr(l))return!1}return!0}move(e,t){if(t&&this.enterChild(e,0,4))return!0;for(;;){if(this.sibling(e))return!0;if(this.atLastNode(e)||!this.parent())return!1}}next(e=!0){return this.move(1,e)}prev(e=!0){return this.move(-1,e)}moveTo(e,t=0){for(;(this.from==this.to||(t<1?this.from>=e:this.from>e)||(t>-1?this.to<=e:this.to<e))&&this.parent(););for(;this.enterChild(1,e,t););return this}get node(){if(!this.buffer)return this._tree;let e=this.bufferNode,t=null,n=0;if(e&&e.context==this.buffer)e:for(let s=this.index,r=this.stack.length;r>=0;){for(let o=e;o;o=o._parent)if(o.index==s){if(s==this.index)return o;t=o,n=r+1;break e}s=this.stack[--r]}for(let s=n;s<this.stack.length;s++)t=new At(this.buffer,t,this.stack[s]);return this.bufferNode=new At(this.buffer,t,this.index)}get tree(){return this.buffer?null:this._tree._tree}iterate(e,t){for(let n=0;;){let s=!1;if(this.type.isAnonymous||e(this)!==!1){if(this.firstChild()){n++;continue}this.type.isAnonymous||(s=!0)}for(;;){if(s&&t&&t(this),s=this.type.isAnonymous,!n)return;if(this.nextSibling())break;this.parent(),n--,s=!0}}}matchContext(e){if(!this.buffer)return or(this.node.parent,e);let{buffer:t}=this.buffer,{types:n}=t.set;for(let s=e.length-1,r=this.stack.length-1;s>=0;r--){if(r<0)return or(this._tree,e,s);let o=n[t.buffer[this.stack[r]]];if(!o.isAnonymous){if(e[s]&&e[s]!=o.name)return!1;s--}}return!0}}function Hr(i){return i.children.some(e=>e instanceof Et||!e.type.isAnonymous||Hr(e))}function i9(i){var e;let{buffer:t,nodeSet:n,maxBufferLength:s=Y3,reused:r=[],minRepeatType:o=n.types.length}=i,l=Array.isArray(t)?new Fr(t,t.length):t,a=n.types,h=0,c=0;function f(S,k,v,D,M,_){let{id:P,start:E,end:H,size:N}=l,F=c,U=h;if(N<0)if(l.next(),N==-1){let Y=r[P];v.push(Y),D.push(E-S);return}else if(N==-3){h=P;return}else if(N==-4){c=P;return}else throw new RangeError(`Unrecognized record size: ${N}`);let V=a[P],te,W,ne=E-S;if(H-E<=s&&(W=g(l.pos-k,M))){let Y=new Uint16Array(W.size-W.skip),ee=l.pos-W.size,Q=Y.length;for(;l.pos>ee;)Q=b(W.start,Y,Q);te=new Et(Y,H-W.start,n),ne=W.start-S}else{let Y=l.pos-N;l.next();let ee=[],Q=[],j=P>=o?P:-1,G=0,me=H;for(;l.pos>Y;)j>=0&&l.id==j&&l.size>=0?(l.end<=me-s&&(p(ee,Q,E,G,l.end,me,j,F,U),G=ee.length,me=l.end),l.next()):_>2500?u(E,Y,ee,Q):f(E,Y,ee,Q,j,_+1);if(j>=0&&G>0&&G<ee.length&&p(ee,Q,E,G,E,me,j,F,U),ee.reverse(),Q.reverse(),j>-1&&G>0){let Le=d(V,U);te=Wr(V,ee,Q,0,ee.length,0,H-E,Le,Le)}else te=m(V,ee,Q,H-E,F-H,U)}v.push(te),D.push(ne)}function u(S,k,v,D){let M=[],_=0,P=-1;for(;l.pos>k;){let{id:E,start:H,end:N,size:F}=l;if(F>4)l.next();else{if(P>-1&&H<P)break;P<0&&(P=N-s),M.push(E,H,N),_++,l.next()}}if(_){let E=new Uint16Array(_*4),H=M[M.length-2];for(let N=M.length-3,F=0;N>=0;N-=3)E[F++]=M[N],E[F++]=M[N+1]-H,E[F++]=M[N+2]-H,E[F++]=F;v.push(new Et(E,M[2]-H,n)),D.push(H-S)}}function d(S,k){return(v,D,M)=>{let _=0,P=v.length-1,E,H;if(P>=0&&(E=v[P])instanceof ae){if(!P&&E.type==S&&E.length==M)return E;(H=E.prop(K.lookAhead))&&(_=D[P]+E.length+H)}return m(S,v,D,M,_,k)}}function p(S,k,v,D,M,_,P,E,H){let N=[],F=[];for(;S.length>D;)N.push(S.pop()),F.push(k.pop()+v-M);S.push(m(n.types[P],N,F,_-M,E-_,H)),k.push(M-v)}function m(S,k,v,D,M,_,P){if(_){let E=[K.contextHash,_];P=P?[E].concat(P):[E]}if(M>25){let E=[K.lookAhead,M];P=P?[E].concat(P):[E]}return new ae(S,k,v,D,P)}function g(S,k){let v=l.fork(),D=0,M=0,_=0,P=v.end-s,E={size:0,start:0,skip:0};e:for(let H=v.pos-S;v.pos>H;){let N=v.size;if(v.id==k&&N>=0){E.size=D,E.start=M,E.skip=_,_+=4,D+=4,v.next();continue}let F=v.pos-N;if(N<0||F<H||v.start<P)break;let U=v.id>=o?4:0,V=v.start;for(v.next();v.pos>F;){if(v.size<0)if(v.size==-3||v.size==-4)U+=4;else break e;else v.id>=o&&(U+=4);v.next()}M=V,D+=N,_+=U}return(k<0||D==S)&&(E.size=D,E.start=M,E.skip=_),E.size>4?E:void 0}function b(S,k,v){let{id:D,start:M,end:_,size:P}=l;if(l.next(),P>=0&&D<o){let E=v;if(P>4){let H=l.pos-(P-4);for(;l.pos>H;)v=b(S,k,v)}k[--v]=E,k[--v]=_-S,k[--v]=M-S,k[--v]=D}else P==-3?h=D:P==-4&&(c=D);return v}let x=[],C=[];for(;l.pos>0;)f(i.start||0,i.bufferStart||0,x,C,-1,0);let R=(e=i.length)!==null&&e!==void 0?e:x.length?C[0]+x[0].length:0;return new ae(a[i.topID],x.reverse(),C.reverse(),R)}const Jo=new WeakMap;function Ci(i,e){if(!i.isAnonymous||e instanceof Et||e.type!=i)return 1;let t=Jo.get(e);if(t==null){t=1;for(let n of e.children){if(n.type!=i||!(n instanceof ae)){t=1;break}t+=Ci(i,n)}Jo.set(e,t)}return t}function Wr(i,e,t,n,s,r,o,l,a){let h=0;for(let p=n;p<s;p++)h+=Ci(i,e[p]);let c=Math.ceil(h*1.5/8),f=[],u=[];function d(p,m,g,b,x){for(let C=g;C<b;){let R=C,S=m[C],k=Ci(i,p[C]);for(C++;C<b;C++){let v=Ci(i,p[C]);if(k+v>=c)break;k+=v}if(C==R+1){if(k>c){let v=p[R];d(v.children,v.positions,0,v.children.length,m[R]+x);continue}f.push(p[R])}else{let v=m[C-1]+p[C-1].length-S;f.push(Wr(i,p,m,R,C,S,v,null,a))}u.push(S+x-r)}}return d(e,t,n,s,0),(l||a)(f,u,o)}class Ht{constructor(e,t,n,s,r=!1,o=!1){this.from=e,this.to=t,this.tree=n,this.offset=s,this.open=(r?1:0)|(o?2:0)}get openStart(){return(this.open&1)>0}get openEnd(){return(this.open&2)>0}static addTree(e,t=[],n=!1){let s=[new Ht(0,e.length,e,0,!1,n)];for(let r of t)r.to>e.length&&s.push(r);return s}static applyChanges(e,t,n=128){if(!t.length)return e;let s=[],r=1,o=e.length?e[0]:null;for(let l=0,a=0,h=0;;l++){let c=l<t.length?t[l]:null,f=c?c.fromA:1e9;if(f-a>=n)for(;o&&o.from<f;){let u=o;if(a>=u.from||f<=u.to||h){let d=Math.max(u.from,a)-h,p=Math.min(u.to,f)-h;u=d>=p?null:new Ht(d,p,u.tree,u.offset+h,l>0,!!c)}if(u&&s.push(u),o.to>f)break;o=r<e.length?e[r++]:null}if(!c)break;a=c.toA,h=c.toA-c.toB}return s}}class $a{startParse(e,t,n){return typeof e=="string"&&(e=new s9(e)),n=n?n.length?n.map(s=>new ys(s.from,s.to)):[new ys(0,0)]:[new ys(0,e.length)],this.createParse(e,t||[],n)}parse(e,t,n){let s=this.startParse(e,t,n);for(;;){let r=s.advance();if(r)return r}}}class s9{constructor(e){this.string=e}get length(){return this.string.length}chunk(e){return this.string.slice(e)}get lineChunks(){return!1}read(e,t){return this.string.slice(e,t)}}new K({perNode:!0});let r9=0;class _e{constructor(e,t,n,s){this.name=e,this.set=t,this.base=n,this.modified=s,this.id=r9++}toString(){let{name:e}=this;for(let t of this.modified)t.name&&(e=`${t.name}(${e})`);return e}static define(e,t){let n=typeof e=="string"?e:"?";if(e instanceof _e&&(t=e),t!=null&&t.base)throw new Error("Can not derive from a modified tag");let s=new _e(n,[],null,[]);if(s.set.push(s),t)for(let r of t.set)s.set.push(r);return s}static defineModifier(e){let t=new qi(e);return n=>n.modified.indexOf(t)>-1?n:qi.get(n.base||n,n.modified.concat(t).sort((s,r)=>s.id-r.id))}}let o9=0;class qi{constructor(e){this.name=e,this.instances=[],this.id=o9++}static get(e,t){if(!t.length)return e;let n=t[0].instances.find(l=>l.base==e&&l9(t,l.modified));if(n)return n;let s=[],r=new _e(e.name,s,e,t);for(let l of t)l.instances.push(r);let o=a9(t);for(let l of e.set)if(!l.modified.length)for(let a of o)s.push(qi.get(l,a));return r}}function l9(i,e){return i.length==e.length&&i.every((t,n)=>t==e[n])}function a9(i){let e=[[]];for(let t=0;t<i.length;t++)for(let n=0,s=e.length;n<s;n++)e.push(e[n].concat(i[t]));return e.sort((t,n)=>n.length-t.length)}function h9(i){let e=Object.create(null);for(let t in i){let n=i[t];Array.isArray(n)||(n=[n]);for(let s of t.split(" "))if(s){let r=[],o=2,l=s;for(let f=0;;){if(l=="..."&&f>0&&f+3==s.length){o=1;break}let u=/^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(l);if(!u)throw new RangeError("Invalid path: "+s);if(r.push(u[0]=="*"?"":u[0][0]=='"'?JSON.parse(u[0]):u[0]),f+=u[0].length,f==s.length)break;let d=s[f++];if(f==s.length&&d=="!"){o=0;break}if(d!="/")throw new RangeError("Invalid path: "+s);l=s.slice(f)}let a=r.length-1,h=r[a];if(!h)throw new RangeError("Invalid path: "+s);let c=new jn(n,o,a>0?r.slice(0,a):null);e[h]=c.sort(e[h])}}return Ua.add(e)}const Ua=new K({combine(i,e){let t,n,s;for(;i||e;){if(!i||e&&i.depth>=e.depth?(s=e,e=e.next):(s=i,i=i.next),t&&t.mode==s.mode&&!s.context&&!t.context)continue;let r=new jn(s.tags,s.mode,s.context);t?t.next=r:n=r,t=r}return n}});class jn{constructor(e,t,n,s){this.tags=e,this.mode=t,this.context=n,this.next=s}get opaque(){return this.mode==0}get inherit(){return this.mode==1}sort(e){return!e||e.depth<this.depth?(this.next=e,this):(e.next=this.sort(e.next),e)}get depth(){return this.context?this.context.length:0}}jn.empty=new jn([],2,null);function Ka(i,e){let t=Object.create(null);for(let r of i)if(!Array.isArray(r.tag))t[r.tag.id]=r.class;else for(let o of r.tag)t[o.id]=r.class;let{scope:n,all:s=null}=e||{};return{style:r=>{let o=s;for(let l of r)for(let a of l.set){let h=t[a.id];if(h){o=o?o+" "+h:h;break}}return o},scope:n}}function c9(i,e){let t=null;for(let n of i){let s=n.style(e);s&&(t=t?t+" "+s:s)}return t}function f9(i,e,t,n=0,s=i.length){let r=new u9(n,Array.isArray(e)?e:[e],t);r.highlightRange(i.cursor(),n,s,"",r.highlighters),r.flush(s)}class u9{constructor(e,t,n){this.at=e,this.highlighters=t,this.span=n,this.class=""}startSpan(e,t){t!=this.class&&(this.flush(e),e>this.at&&(this.at=e),this.class=t)}flush(e){e>this.at&&this.class&&this.span(this.at,e,this.class)}highlightRange(e,t,n,s,r){let{type:o,from:l,to:a}=e;if(l>=n||a<=t)return;o.isTop&&(r=this.highlighters.filter(d=>!d.scope||d.scope(o)));let h=s,c=d9(e)||jn.empty,f=c9(r,c.tags);if(f&&(h&&(h+=" "),h+=f,c.mode==1&&(s+=(s?" ":"")+f)),this.startSpan(Math.max(t,l),h),c.opaque)return;let u=e.tree&&e.tree.prop(K.mounted);if(u&&u.overlay){let d=e.node.enter(u.overlay[0].from+l,1),p=this.highlighters.filter(g=>!g.scope||g.scope(u.tree.type)),m=e.firstChild();for(let g=0,b=l;;g++){let x=g<u.overlay.length?u.overlay[g]:null,C=x?x.from+l:a,R=Math.max(t,b),S=Math.min(n,C);if(R<S&&m)for(;e.from<S&&(this.highlightRange(e,R,S,s,r),this.startSpan(Math.min(S,e.to),h),!(e.to>=C||!e.nextSibling())););if(!x||C>n)break;b=x.to+l,b>t&&(this.highlightRange(d.cursor(),Math.max(t,x.from+l),Math.min(n,b),"",p),this.startSpan(Math.min(n,b),h))}m&&e.parent()}else if(e.firstChild()){u&&(s="");do if(!(e.to<=t)){if(e.from>=n)break;this.highlightRange(e,t,n,s,r),this.startSpan(Math.min(n,e.to),h)}while(e.nextSibling());e.parent()}}}function d9(i){let e=i.type.prop(Ua);for(;e&&e.context&&!i.matchContext(e.context);)e=e.next;return e||null}const T=_e.define,ui=T(),vt=T(),Yo=T(vt),Qo=T(vt),wt=T(),di=T(wt),vs=T(wt),Ze=T(),It=T(Ze),Ye=T(),Qe=T(),ar=T(),An=T(ar),pi=T(),q={comment:ui,lineComment:T(ui),blockComment:T(ui),docComment:T(ui),name:vt,variableName:T(vt),typeName:Yo,tagName:T(Yo),propertyName:Qo,attributeName:T(Qo),className:T(vt),labelName:T(vt),namespace:T(vt),macroName:T(vt),literal:wt,string:di,docString:T(di),character:T(di),attributeValue:T(di),number:vs,integer:T(vs),float:T(vs),bool:T(wt),regexp:T(wt),escape:T(wt),color:T(wt),url:T(wt),keyword:Ye,self:T(Ye),null:T(Ye),atom:T(Ye),unit:T(Ye),modifier:T(Ye),operatorKeyword:T(Ye),controlKeyword:T(Ye),definitionKeyword:T(Ye),moduleKeyword:T(Ye),operator:Qe,derefOperator:T(Qe),arithmeticOperator:T(Qe),logicOperator:T(Qe),bitwiseOperator:T(Qe),compareOperator:T(Qe),updateOperator:T(Qe),definitionOperator:T(Qe),typeOperator:T(Qe),controlOperator:T(Qe),punctuation:ar,separator:T(ar),bracket:An,angleBracket:T(An),squareBracket:T(An),paren:T(An),brace:T(An),content:Ze,heading:It,heading1:T(It),heading2:T(It),heading3:T(It),heading4:T(It),heading5:T(It),heading6:T(It),contentSeparator:T(Ze),list:T(Ze),quote:T(Ze),emphasis:T(Ze),strong:T(Ze),link:T(Ze),monospace:T(Ze),strikethrough:T(Ze),inserted:T(),deleted:T(),changed:T(),invalid:T(),meta:pi,documentMeta:T(pi),annotation:T(pi),processingInstruction:T(pi),definition:_e.defineModifier("definition"),constant:_e.defineModifier("constant"),function:_e.defineModifier("function"),standard:_e.defineModifier("standard"),local:_e.defineModifier("local"),special:_e.defineModifier("special")};for(let i in q){let e=q[i];e instanceof _e&&(e.name=i)}Ka([{tag:q.link,class:"tok-link"},{tag:q.heading,class:"tok-heading"},{tag:q.emphasis,class:"tok-emphasis"},{tag:q.strong,class:"tok-strong"},{tag:q.keyword,class:"tok-keyword"},{tag:q.atom,class:"tok-atom"},{tag:q.bool,class:"tok-bool"},{tag:q.url,class:"tok-url"},{tag:q.labelName,class:"tok-labelName"},{tag:q.inserted,class:"tok-inserted"},{tag:q.deleted,class:"tok-deleted"},{tag:q.literal,class:"tok-literal"},{tag:q.string,class:"tok-string"},{tag:q.number,class:"tok-number"},{tag:[q.regexp,q.escape,q.special(q.string)],class:"tok-string2"},{tag:q.variableName,class:"tok-variableName"},{tag:q.local(q.variableName),class:"tok-variableName tok-local"},{tag:q.definition(q.variableName),class:"tok-variableName tok-definition"},{tag:q.special(q.variableName),class:"tok-variableName2"},{tag:q.definition(q.propertyName),class:"tok-propertyName tok-definition"},{tag:q.typeName,class:"tok-typeName"},{tag:q.namespace,class:"tok-namespace"},{tag:q.className,class:"tok-className"},{tag:q.macroName,class:"tok-macroName"},{tag:q.propertyName,class:"tok-propertyName"},{tag:q.operator,class:"tok-operator"},{tag:q.comment,class:"tok-comment"},{tag:q.meta,class:"tok-meta"},{tag:q.invalid,class:"tok-invalid"},{tag:q.punctuation,class:"tok-punctuation"}]);var ws;const rn=new K;function p9(i){return L.define({combine:i?e=>e.concat(i):void 0})}const m9=new K;class Ke{constructor(e,t,n=[],s=""){this.data=e,this.name=s,Z.prototype.hasOwnProperty("tree")||Object.defineProperty(Z.prototype,"tree",{get(){return at(this)}}),this.parser=t,this.extension=[yn.of(this),Z.languageData.of((r,o,l)=>{let a=Zo(r,o,l),h=a.type.prop(rn);if(!h)return[];let c=r.facet(h),f=a.type.prop(m9);if(f){let u=a.resolve(o-a.from,l);for(let d of f)if(d.test(u,r)){let p=r.facet(d.facet);return d.type=="replace"?p:p.concat(c)}}return c})].concat(n)}isActiveAt(e,t,n=-1){return Zo(e,t,n).type.prop(rn)==this.data}findRegions(e){let t=e.facet(yn);if((t==null?void 0:t.data)==this.data)return[{from:0,to:e.doc.length}];if(!t||!t.allowsNesting)return[];let n=[],s=(r,o)=>{if(r.prop(rn)==this.data){n.push({from:o,to:o+r.length});return}let l=r.prop(K.mounted);if(l){if(l.tree.prop(rn)==this.data){if(l.overlay)for(let a of l.overlay)n.push({from:a.from+o,to:a.to+o});else n.push({from:o,to:o+r.length});return}else if(l.overlay){let a=n.length;if(s(l.tree,l.overlay[0].from+o),n.length>a)return}}for(let a=0;a<r.children.length;a++){let h=r.children[a];h instanceof ae&&s(h,r.positions[a]+o)}};return s(at(e),0),n}get allowsNesting(){return!0}}Ke.setState=de.define();function Zo(i,e,t){let n=i.facet(yn),s=at(i).topNode;if(!n||n.allowsNesting)for(let r=s;r;r=r.enter(e,t,ue.ExcludeBuffers|ue.EnterBracketed))r.type.isTop&&(s=r);return s}function at(i){let e=i.field(Ke.state,!1);return e?e.tree:ae.empty}class g9{constructor(e){this.doc=e,this.cursorPos=0,this.string="",this.cursor=e.iter()}get length(){return this.doc.length}syncTo(e){return this.string=this.cursor.next(e-this.cursorPos).value,this.cursorPos=e+this.string.length,this.cursorPos-this.string.length}chunk(e){return this.syncTo(e),this.string}get lineChunks(){return!0}read(e,t){let n=this.cursorPos-this.string.length;return e<n||t>=this.cursorPos?this.doc.sliceString(e,t):this.string.slice(e-n,t-n)}}let Cn=null;class gn{constructor(e,t,n=[],s,r,o,l,a){this.parser=e,this.state=t,this.fragments=n,this.tree=s,this.treeLen=r,this.viewport=o,this.skipped=l,this.scheduleOn=a,this.parse=null,this.tempSkipped=[]}static create(e,t,n){return new gn(e,t,[],ae.empty,0,n,[],null)}startParse(){return this.parser.startParse(new g9(this.state.doc),this.fragments)}work(e,t){return t!=null&&t>=this.state.doc.length&&(t=void 0),this.tree!=ae.empty&&this.isDone(t??this.state.doc.length)?(this.takeTree(),!0):this.withContext(()=>{var n;if(typeof e=="number"){let s=Date.now()+e;e=()=>Date.now()>s}for(this.parse||(this.parse=this.startParse()),t!=null&&(this.parse.stoppedAt==null||this.parse.stoppedAt>t)&&t<this.state.doc.length&&this.parse.stopAt(t);;){let s=this.parse.advance();if(s)if(this.fragments=this.withoutTempSkipped(Ht.addTree(s,this.fragments,this.parse.stoppedAt!=null)),this.treeLen=(n=this.parse.stoppedAt)!==null&&n!==void 0?n:this.state.doc.length,this.tree=s,this.parse=null,this.treeLen<(t??this.state.doc.length))this.parse=this.startParse();else return!0;if(e())return!1}})}takeTree(){let e,t;this.parse&&(e=this.parse.parsedPos)>=this.treeLen&&((this.parse.stoppedAt==null||this.parse.stoppedAt>e)&&this.parse.stopAt(e),this.withContext(()=>{for(;!(t=this.parse.advance()););}),this.treeLen=e,this.tree=t,this.fragments=this.withoutTempSkipped(Ht.addTree(this.tree,this.fragments,!0)),this.parse=null)}withContext(e){let t=Cn;Cn=this;try{return e()}finally{Cn=t}}withoutTempSkipped(e){for(let t;t=this.tempSkipped.pop();)e=el(e,t.from,t.to);return e}changes(e,t){let{fragments:n,tree:s,treeLen:r,viewport:o,skipped:l}=this;if(this.takeTree(),!e.empty){let a=[];if(e.iterChangedRanges((h,c,f,u)=>a.push({fromA:h,toA:c,fromB:f,toB:u})),n=Ht.applyChanges(n,a),s=ae.empty,r=0,o={from:e.mapPos(o.from,-1),to:e.mapPos(o.to,1)},this.skipped.length){l=[];for(let h of this.skipped){let c=e.mapPos(h.from,1),f=e.mapPos(h.to,-1);c<f&&l.push({from:c,to:f})}}}return new gn(this.parser,t,n,s,r,o,l,this.scheduleOn)}updateViewport(e){if(this.viewport.from==e.from&&this.viewport.to==e.to)return!1;this.viewport=e;let t=this.skipped.length;for(let n=0;n<this.skipped.length;n++){let{from:s,to:r}=this.skipped[n];s<e.to&&r>e.from&&(this.fragments=el(this.fragments,s,r),this.skipped.splice(n--,1))}return this.skipped.length>=t?!1:(this.reset(),!0)}reset(){this.parse&&(this.takeTree(),this.parse=null)}skipUntilInView(e,t){this.skipped.push({from:e,to:t})}static getSkippingParser(e){return new class extends $a{createParse(t,n,s){let r=s[0].from,o=s[s.length-1].to;return{parsedPos:r,advance(){let a=Cn;if(a){for(let h of s)a.tempSkipped.push(h);e&&(a.scheduleOn=a.scheduleOn?Promise.all([a.scheduleOn,e]):e)}return this.parsedPos=o,new ae(Pe.none,[],[],o-r)},stoppedAt:null,stopAt(){}}}}}isDone(e){e=Math.min(e,this.state.doc.length);let t=this.fragments;return this.treeLen>=e&&t.length&&t[0].from==0&&t[0].to>=e}static get(){return Cn}}function el(i,e,t){return Ht.applyChanges(i,[{fromA:e,toA:t,fromB:e,toB:t}])}class bn{constructor(e){this.context=e,this.tree=e.tree}apply(e){if(!e.docChanged&&this.tree==this.context.tree)return this;let t=this.context.changes(e.changes,e.state),n=this.context.treeLen==e.startState.doc.length?void 0:Math.max(e.changes.mapPos(this.context.treeLen),t.viewport.to);return t.work(20,n)||t.takeTree(),new bn(t)}static init(e){let t=Math.min(3e3,e.doc.length),n=gn.create(e.facet(yn).parser,e,{from:0,to:t});return n.work(20,t)||n.takeTree(),new bn(n)}}Ke.state=Dt.define({create:bn.init,update(i,e){for(let t of e.effects)if(t.is(Ke.setState))return t.value;return e.startState.facet(yn)!=e.state.facet(yn)?bn.init(e.state):i.apply(e)}});let ja=i=>{let e=setTimeout(()=>i(),500);return()=>clearTimeout(e)};typeof requestIdleCallback<"u"&&(ja=i=>{let e=-1,t=setTimeout(()=>{e=requestIdleCallback(i,{timeout:400})},100);return()=>e<0?clearTimeout(t):cancelIdleCallback(e)});const ks=typeof navigator<"u"&&(!((ws=navigator.scheduling)===null||ws===void 0)&&ws.isInputPending)?()=>navigator.scheduling.isInputPending():null,b9=lt.fromClass(class{constructor(e){this.view=e,this.working=null,this.workScheduled=0,this.chunkEnd=-1,this.chunkBudget=-1,this.work=this.work.bind(this),this.scheduleWork()}update(e){let t=this.view.state.field(Ke.state).context;(t.updateViewport(e.view.viewport)||this.view.viewport.to>t.treeLen)&&this.scheduleWork(),(e.docChanged||e.selectionSet)&&(this.view.hasFocus&&(this.chunkBudget+=50),this.scheduleWork()),this.checkAsyncSchedule(t)}scheduleWork(){if(this.working)return;let{state:e}=this.view,t=e.field(Ke.state);(t.tree!=t.context.tree||!t.context.isDone(e.doc.length))&&(this.working=ja(this.work))}work(e){this.working=null;let t=Date.now();if(this.chunkEnd<t&&(this.chunkEnd<0||this.view.hasFocus)&&(this.chunkEnd=t+3e4,this.chunkBudget=3e3),this.chunkBudget<=0)return;let{state:n,viewport:{to:s}}=this.view,r=n.field(Ke.state);if(r.tree==r.context.tree&&r.context.isDone(s+1e5))return;let o=Date.now()+Math.min(this.chunkBudget,100,e&&!ks?Math.max(25,e.timeRemaining()-5):1e9),l=r.context.treeLen<s&&n.doc.length>s+1e3,a=r.context.work(()=>ks&&ks()||Date.now()>o,s+(l?0:1e5));this.chunkBudget-=Date.now()-t,(a||this.chunkBudget<=0)&&(r.context.takeTree(),this.view.dispatch({effects:Ke.setState.of(new bn(r.context))})),this.chunkBudget>0&&!(a&&!l)&&this.scheduleWork(),this.checkAsyncSchedule(r.context)}checkAsyncSchedule(e){e.scheduleOn&&(this.workScheduled++,e.scheduleOn.then(()=>this.scheduleWork()).catch(t=>it(this.view.state,t)).then(()=>this.workScheduled--),e.scheduleOn=null)}destroy(){this.working&&this.working()}isWorking(){return!!(this.working||this.workScheduled>0)}},{eventHandlers:{focus(){this.scheduleWork()}}}),yn=L.define({combine(i){return i.length?i[0]:null},enables:i=>[Ke.state,b9,I.contentAttributes.compute([i],e=>{let t=e.facet(i);return t&&t.name?{"data-language":t.name}:{}})]}),y9=L.define(),Vr=L.define({combine:i=>{if(!i.length)return"  ";let e=i[0];if(!e||/\S/.test(e)||Array.from(e).some(t=>t!=e[0]))throw new Error("Invalid indent unit: "+JSON.stringify(i[0]));return e}});function Gt(i){let e=i.facet(Vr);return e.charCodeAt(0)==9?i.tabSize*e.length:e.length}function _i(i,e){let t="",n=i.tabSize,s=i.facet(Vr)[0];if(s=="	"){for(;e>=n;)t+="	",e-=n;s=" "}for(let r=0;r<e;r++)t+=s;return t}function Ga(i,e){i instanceof Z&&(i=new Ji(i));for(let n of i.state.facet(y9)){let s=n(i,e);if(s!==void 0)return s}let t=at(i.state);return t.length>=e?v9(i,t,e):null}class Ji{constructor(e,t={}){this.state=e,this.options=t,this.unit=Gt(e)}lineAt(e,t=1){let n=this.state.doc.lineAt(e),{simulateBreak:s,simulateDoubleBreak:r}=this.options;return s!=null&&s>=n.from&&s<=n.to?r&&s==e?{text:"",from:e}:(t<0?s<e:s<=e)?{text:n.text.slice(s-n.from),from:s}:{text:n.text.slice(0,s-n.from),from:n.from}:n}textAfterPos(e,t=1){if(this.options.simulateDoubleBreak&&e==this.options.simulateBreak)return"";let{text:n,from:s}=this.lineAt(e,t);return n.slice(e-s,Math.min(n.length,e+100-s))}column(e,t=1){let{text:n,from:s}=this.lineAt(e,t),r=this.countColumn(n,e-s),o=this.options.overrideIndentation?this.options.overrideIndentation(s):-1;return o>-1&&(r+=o-this.countColumn(n,n.search(/\S|$/))),r}countColumn(e,t=e.length){return Vi(e,this.state.tabSize,t)}lineIndent(e,t=1){let{text:n,from:s}=this.lineAt(e,t),r=this.options.overrideIndentation;if(r){let o=r(s);if(o>-1)return o}return this.countColumn(n,n.search(/\S|$/))}get simulatedBreak(){return this.options.simulateBreak||null}}const Xa=new K;function v9(i,e,t){let n=e.resolveStack(t),s=e.resolveInner(t,-1).resolve(t,0).enterUnfinishedNodesBefore(t);if(s!=n.node){let r=[];for(let o=s;o&&!(o.from<n.node.from||o.to>n.node.to||o.from==n.node.from&&o.type==n.node.type);o=o.parent)r.push(o);for(let o=r.length-1;o>=0;o--)n={node:r[o],next:n}}return Ja(n,i,t)}function Ja(i,e,t){for(let n=i;n;n=n.next){let s=k9(n.node);if(s)return s($r.create(e,t,n))}return 0}function w9(i){return i.pos==i.options.simulateBreak&&i.options.simulateDoubleBreak}function k9(i){let e=i.type.prop(Xa);if(e)return e;let t=i.firstChild,n;if(t&&(n=t.type.prop(K.closedBy))){let s=i.lastChild,r=s&&n.indexOf(s.name)>-1;return o=>C9(o,!0,1,void 0,r&&!w9(o)?s.from:void 0)}return i.parent==null?x9:null}function x9(){return 0}class $r extends Ji{constructor(e,t,n){super(e.state,e.options),this.base=e,this.pos=t,this.context=n}get node(){return this.context.node}static create(e,t,n){return new $r(e,t,n)}get textAfter(){return this.textAfterPos(this.pos)}get baseIndent(){return this.baseIndentFor(this.node)}baseIndentFor(e){let t=this.state.doc.lineAt(e.from);for(;;){let n=e.resolve(t.from);for(;n.parent&&n.parent.from==n.from;)n=n.parent;if(S9(n,e))break;t=this.state.doc.lineAt(n.from)}return this.lineIndent(t.from)}continue(){return Ja(this.context.next,this.base,this.pos)}}function S9(i,e){for(let t=e;t;t=t.parent)if(i==t)return!0;return!1}function A9(i){let e=i.node,t=e.childAfter(e.from),n=e.lastChild;if(!t)return null;let s=i.options.simulateBreak,r=i.state.doc.lineAt(t.from),o=s==null||s<=r.from?r.to:Math.min(r.to,s);for(let l=t.to;;){let a=e.childAfter(l);if(!a||a==n)return null;if(!a.type.isSkipped){if(a.from>=o)return null;let h=/^ */.exec(r.text.slice(t.to-r.from))[0].length;return{from:t.from,to:t.to+h}}l=a.to}}function C9(i,e,t,n,s){let r=i.textAfter,o=r.match(/^\s*/)[0].length,l=n&&r.slice(o,o+n.length)==n||s==i.pos+o,a=A9(i);return a?l?i.column(a.from):i.column(a.to):i.baseIndent+(l?0:i.unit*t)}class Yi{constructor(e,t){this.specs=e;let n;function s(l){let a=Ct.newName();return(n||(n=Object.create(null)))["."+a]=l,a}const r=typeof t.all=="string"?t.all:t.all?s(t.all):void 0,o=t.scope;this.scope=o instanceof Ke?l=>l.prop(rn)==o.data:o?l=>l==o:void 0,this.style=Ka(e.map(l=>({tag:l.tag,class:l.class||s(Object.assign({},l,{tag:null}))})),{all:r}).style,this.module=n?new Ct(n):null,this.themeType=t.themeType}static define(e,t){return new Yi(e,t||{})}}const hr=L.define(),M9=L.define({combine(i){return i.length?[i[0]]:null}});function xs(i){let e=i.facet(hr);return e.length?e:i.facet(M9)}function Ya(i,e){let t=[E9],n;return i instanceof Yi&&(i.module&&t.push(I.styleModule.of(i.module)),n=i.themeType),n?t.push(hr.computeN([I.darkTheme],s=>s.facet(I.darkTheme)==(n=="dark")?[i]:[])):t.push(hr.of(i)),t}class T9{constructor(e){this.markCache=Object.create(null),this.tree=at(e.state),this.decorations=this.buildDeco(e,xs(e.state)),this.decoratedTo=e.viewport.to}update(e){let t=at(e.state),n=xs(e.state),s=n!=xs(e.startState),{viewport:r}=e.view,o=e.changes.mapPos(this.decoratedTo,1);t.length<r.to&&!s&&t.type==this.tree.type&&o>=r.to?(this.decorations=this.decorations.map(e.changes),this.decoratedTo=o):(t!=this.tree||e.viewportChanged||s)&&(this.tree=t,this.decorations=this.buildDeco(e.view,n),this.decoratedTo=r.to)}buildDeco(e,t){if(!t||!this.tree.length)return pe.none;let n=new Fn;for(let{from:s,to:r}of e.visibleRanges)f9(this.tree,t,(o,l,a)=>{n.add(o,l,this.markCache[a]||(this.markCache[a]=pe.mark({class:a})))},s,r);return n.finish()}}const E9=Hi.high(lt.fromClass(T9,{decorations:i=>i.decorations})),B9=1e4,D9="()[]{}",O9=new K;function cr(i,e,t){let n=i.prop(e<0?K.openedBy:K.closedBy);if(n)return n;if(i.name.length==1){let s=t.indexOf(i.name);if(s>-1&&s%2==(e<0?1:0))return[t[s+e]]}return null}function fr(i){let e=i.type.prop(O9);return e?e(i.node):i}function on(i,e,t,n={}){let s=n.maxScanDistance||B9,r=n.brackets||D9,o=at(i),l=o.resolveInner(e,t);for(let a=l;a;a=a.parent){let h=cr(a.type,t,r);if(h&&a.from<a.to){let c=fr(a);if(c&&(t>0?e>=c.from&&e<c.to:e>c.from&&e<=c.to))return P9(i,e,t,a,c,h,r)}}return L9(i,e,t,o,l.type,s,r)}function P9(i,e,t,n,s,r,o){let l=n.parent,a={from:s.from,to:s.to},h=0,c=l==null?void 0:l.cursor();if(c&&(t<0?c.childBefore(n.from):c.childAfter(n.to)))do if(t<0?c.to<=n.from:c.from>=n.to){if(h==0&&r.indexOf(c.type.name)>-1&&c.from<c.to){let f=fr(c);return{start:a,end:f?{from:f.from,to:f.to}:void 0,matched:!0}}else if(cr(c.type,t,o))h++;else if(cr(c.type,-t,o)){if(h==0){let f=fr(c);return{start:a,end:f&&f.from<f.to?{from:f.from,to:f.to}:void 0,matched:!1}}h--}}while(t<0?c.prevSibling():c.nextSibling());return{start:a,matched:!1}}function L9(i,e,t,n,s,r,o){let l=t<0?i.sliceDoc(e-1,e):i.sliceDoc(e,e+1),a=o.indexOf(l);if(a<0||a%2==0!=t>0)return null;let h={from:t<0?e-1:e,to:t>0?e+1:e},c=i.doc.iterRange(e,t>0?i.doc.length:0),f=0;for(let u=0;!c.next().done&&u<=r;){let d=c.value;t<0&&(u+=d.length);let p=e+u*t;for(let m=t>0?0:d.length-1,g=t>0?d.length:-1;m!=g;m+=t){let b=o.indexOf(d[m]);if(!(b<0||n.resolveInner(p+m,1).type!=s))if(b%2==0==t>0)f++;else{if(f==1)return{start:h,end:{from:p+m,to:p+m+1},matched:b>>1==a>>1};f--}}t>0&&(u+=d.length)}return c.done?{start:h,matched:!1}:null}function tl(i,e,t,n=0,s=0){e==null&&(e=i.search(/[^\s\u00a0]/),e==-1&&(e=i.length));let r=s;for(let o=n;o<e;o++)i.charCodeAt(o)==9?r+=t-r%t:r++;return r}class Qa{constructor(e,t,n,s){this.string=e,this.tabSize=t,this.indentUnit=n,this.overrideIndent=s,this.pos=0,this.start=0,this.lastColumnPos=0,this.lastColumnValue=0}eol(){return this.pos>=this.string.length}sol(){return this.pos==0}peek(){return this.string.charAt(this.pos)||void 0}next(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)}eat(e){let t=this.string.charAt(this.pos),n;if(typeof e=="string"?n=t==e:n=t&&(e instanceof RegExp?e.test(t):e(t)),n)return++this.pos,t}eatWhile(e){let t=this.pos;for(;this.eat(e););return this.pos>t}eatSpace(){let e=this.pos;for(;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>e}skipToEnd(){this.pos=this.string.length}skipTo(e){let t=this.string.indexOf(e,this.pos);if(t>-1)return this.pos=t,!0}backUp(e){this.pos-=e}column(){return this.lastColumnPos<this.start&&(this.lastColumnValue=tl(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue}indentation(){var e;return(e=this.overrideIndent)!==null&&e!==void 0?e:tl(this.string,null,this.tabSize)}match(e,t,n){if(typeof e=="string"){let s=o=>n?o.toLowerCase():o,r=this.string.substr(this.pos,e.length);return s(r)==s(e)?(t!==!1&&(this.pos+=e.length),!0):null}else{let s=this.string.slice(this.pos).match(e);return s&&s.index>0?null:(s&&t!==!1&&(this.pos+=s[0].length),s)}}current(){return this.string.slice(this.start,this.pos)}}function R9(i){return{name:i.name||"",token:i.token,blankLine:i.blankLine||(()=>{}),startState:i.startState||(()=>!0),copyState:i.copyState||I9,indent:i.indent||(()=>null),languageData:i.languageData||{},tokenTable:i.tokenTable||jr,mergeTokens:i.mergeTokens!==!1}}function I9(i){if(typeof i!="object")return i;let e={};for(let t in i){let n=i[t];e[t]=n instanceof Array?n.slice():n}return e}const nl=new WeakMap;class Ur extends Ke{constructor(e){let t=p9(e.languageData),n=R9(e),s,r=new class extends $a{createParse(o,l,a){return new q9(s,o,l,a)}};super(t,r,[],e.name),this.topNode=F9(t,this),s=this,this.streamParser=n,this.stateAfter=new K({perNode:!0}),this.tokenTable=e.tokenTable?new n1(n.tokenTable):z9}static define(e){return new Ur(e)}getIndent(e){let t,{overrideIndentation:n}=e.options;n&&(t=nl.get(e.state),t!=null&&t<e.pos-1e4&&(t=void 0));let s=Kr(this,e.node.tree,e.node.from,e.node.from,t??e.pos),r,o;if(s?(o=s.state,r=s.pos+1):(o=this.streamParser.startState(e.unit),r=e.node.from),e.pos-r>1e4)return null;for(;r<e.pos;){let a=e.state.doc.lineAt(r),h=Math.min(e.pos,a.to);if(a.length){let c=n?n(a.from):-1,f=new Qa(a.text,e.state.tabSize,e.unit,c<0?void 0:c);for(;f.pos<h-a.from;)e1(this.streamParser.token,f,o)}else this.streamParser.blankLine(o,e.unit);if(h==e.pos)break;r=a.to+1}let l=e.lineAt(e.pos);return n&&t==null&&nl.set(e.state,l.from),this.streamParser.indent(o,/^\s*(.*)/.exec(l.text)[1],e)}get allowsNesting(){return!1}}function Kr(i,e,t,n,s){let r=t>=n&&t+e.length<=s&&e.prop(i.stateAfter);if(r)return{state:i.streamParser.copyState(r),pos:t+e.length};for(let o=e.children.length-1;o>=0;o--){let l=e.children[o],a=t+e.positions[o],h=l instanceof ae&&a<s&&Kr(i,l,a,n,s);if(h)return h}return null}function Za(i,e,t,n,s){if(s&&t<=0&&n>=e.length)return e;!s&&t==0&&e.type==i.topNode&&(s=!0);for(let r=e.children.length-1;r>=0;r--){let o=e.positions[r],l=e.children[r],a;if(o<n&&l instanceof ae){if(!(a=Za(i,l,t-o,n-o,s)))break;return s?new ae(e.type,e.children.slice(0,r).concat(a),e.positions.slice(0,r+1),o+a.length):a}}return null}function N9(i,e,t,n,s){for(let r of e){let o=r.from+(r.openStart?25:0),l=r.to-(r.openEnd?25:0),a=o<=t&&l>t&&Kr(i,r.tree,0-r.offset,t,l),h;if(a&&a.pos<=n&&(h=Za(i,r.tree,t+r.offset,a.pos+r.offset,!1)))return{state:a.state,tree:h}}return{state:i.streamParser.startState(s?Gt(s):4),tree:ae.empty}}class q9{constructor(e,t,n,s){this.lang=e,this.input=t,this.fragments=n,this.ranges=s,this.stoppedAt=null,this.chunks=[],this.chunkPos=[],this.chunk=[],this.chunkReused=void 0,this.rangeIndex=0,this.to=s[s.length-1].to;let r=gn.get(),o=s[0].from,{state:l,tree:a}=N9(e,n,o,this.to,r==null?void 0:r.state);this.state=l,this.parsedPos=this.chunkStart=o+a.length;for(let h=0;h<a.children.length;h++)this.chunks.push(a.children[h]),this.chunkPos.push(a.positions[h]);r&&this.parsedPos<r.viewport.from-1e5&&s.some(h=>h.from<=r.viewport.from&&h.to>=r.viewport.from)&&(this.state=this.lang.streamParser.startState(Gt(r.state)),r.skipUntilInView(this.parsedPos,r.viewport.from),this.parsedPos=r.viewport.from),this.moveRangeIndex()}advance(){let e=gn.get(),t=this.stoppedAt==null?this.to:Math.min(this.to,this.stoppedAt),n=Math.min(t,this.chunkStart+512);for(e&&(n=Math.min(n,e.viewport.to));this.parsedPos<n;)this.parseLine(e);return this.chunkStart<this.parsedPos&&this.finishChunk(),this.parsedPos>=t?this.finish():e&&this.parsedPos>=e.viewport.to?(e.skipUntilInView(this.parsedPos,t),this.finish()):null}stopAt(e){this.stoppedAt=e}lineAfter(e){let t=this.input.chunk(e);if(this.input.lineChunks)t==`
`&&(t="");else{let n=t.indexOf(`
`);n>-1&&(t=t.slice(0,n))}return e+t.length<=this.to?t:t.slice(0,this.to-e)}nextLine(){let e=this.parsedPos,t=this.lineAfter(e),n=e+t.length;for(let s=this.rangeIndex;;){let r=this.ranges[s].to;if(r>=n||(t=t.slice(0,r-(n-t.length)),s++,s==this.ranges.length))break;let o=this.ranges[s].from,l=this.lineAfter(o);t+=l,n=o+l.length}return{line:t,end:n}}skipGapsTo(e,t,n){for(;;){let s=this.ranges[this.rangeIndex].to,r=e+t;if(n>0?s>r:s>=r)break;let o=this.ranges[++this.rangeIndex].from;t+=o-s}return t}moveRangeIndex(){for(;this.ranges[this.rangeIndex].to<this.parsedPos;)this.rangeIndex++}emitToken(e,t,n,s){let r=4;if(this.ranges.length>1){s=this.skipGapsTo(t,s,1),t+=s;let l=this.chunk.length;s=this.skipGapsTo(n,s,-1),n+=s,r+=this.chunk.length-l}let o=this.chunk.length-4;return this.lang.streamParser.mergeTokens&&r==4&&o>=0&&this.chunk[o]==e&&this.chunk[o+2]==t?this.chunk[o+2]=n:this.chunk.push(e,t,n,r),s}parseLine(e){let{line:t,end:n}=this.nextLine(),s=0,{streamParser:r}=this.lang,o=new Qa(t,e?e.state.tabSize:4,e?Gt(e.state):2);if(o.eol())r.blankLine(this.state,o.indentUnit);else for(;!o.eol();){let l=e1(r.token,o,this.state);if(l&&(s=this.emitToken(this.lang.tokenTable.resolve(l),this.parsedPos+o.start,this.parsedPos+o.pos,s)),o.start>1e4)break}this.parsedPos=n,this.moveRangeIndex(),this.parsedPos<this.to&&this.parsedPos++}finishChunk(){let e=ae.build({buffer:this.chunk,start:this.chunkStart,length:this.parsedPos-this.chunkStart,nodeSet:_9,topID:0,maxBufferLength:512,reused:this.chunkReused});e=new ae(e.type,e.children,e.positions,e.length,[[this.lang.stateAfter,this.lang.streamParser.copyState(this.state)]]),this.chunks.push(e),this.chunkPos.push(this.chunkStart-this.ranges[0].from),this.chunk=[],this.chunkReused=void 0,this.chunkStart=this.parsedPos}finish(){return new ae(this.lang.topNode,this.chunks,this.chunkPos,this.parsedPos-this.ranges[0].from).balance()}}function e1(i,e,t){e.start=e.pos;for(let n=0;n<10;n++){let s=i(e,t);if(e.pos>e.start)return s}throw new Error("Stream parser failed to advance stream.")}const jr=Object.create(null),Gn=[Pe.none],_9=new zr(Gn),il=[],sl=Object.create(null),t1=Object.create(null);for(let[i,e]of[["variable","variableName"],["variable-2","variableName.special"],["string-2","string.special"],["def","variableName.definition"],["tag","tagName"],["attribute","attributeName"],["type","typeName"],["builtin","variableName.standard"],["qualifier","modifier"],["error","invalid"],["header","heading"],["property","propertyName"]])t1[i]=i1(jr,e);class n1{constructor(e){this.extra=e,this.table=Object.assign(Object.create(null),t1)}resolve(e){return e?this.table[e]||(this.table[e]=i1(this.extra,e)):0}}const z9=new n1(jr);function Ss(i,e){il.indexOf(i)>-1||(il.push(i),console.warn(e))}function i1(i,e){let t=[];for(let l of e.split(" ")){let a=[];for(let h of l.split(".")){let c=i[h]||q[h];c?typeof c=="function"?a.length?a=a.map(c):Ss(h,`Modifier ${h} used at start of tag`):a.length?Ss(h,`Tag ${h} used as modifier`):a=Array.isArray(c)?c:[c]:Ss(h,`Unknown highlighting tag ${h}`)}for(let h of a)t.push(h)}if(!t.length)return 0;let n=e.replace(/ /g,"_"),s=n+" "+t.map(l=>l.id),r=sl[s];if(r)return r.id;let o=sl[s]=Pe.define({id:Gn.length,name:n,props:[h9({[n]:t})]});return Gn.push(o),o.id}function F9(i,e){let t=Pe.define({id:Gn.length,name:"Document",props:[rn.add(()=>i),Xa.add(()=>n=>e.getIndent(n))],top:!0});return Gn.push(t),t}le.RTL,le.LTR;const H9=i=>{let{state:e}=i,t=e.doc.lineAt(e.selection.main.from),n=Xr(i.state,t.from);return n.line?W9(i):n.block?$9(i):!1};function Gr(i,e){return({state:t,dispatch:n})=>{if(t.readOnly)return!1;let s=i(e,t);return s?(n(t.update(s)),!0):!1}}const W9=Gr(j9,0),V9=Gr(s1,0),$9=Gr((i,e)=>s1(i,e,K9(e)),0);function Xr(i,e){let t=i.languageDataAt("commentTokens",e,1);return t.length?t[0]:{}}const Mn=50;function U9(i,{open:e,close:t},n,s){let r=i.sliceDoc(n-Mn,n),o=i.sliceDoc(s,s+Mn),l=/\s*$/.exec(r)[0].length,a=/^\s*/.exec(o)[0].length,h=r.length-l;if(r.slice(h-e.length,h)==e&&o.slice(a,a+t.length)==t)return{open:{pos:n-l,margin:l&&1},close:{pos:s+a,margin:a&&1}};let c,f;s-n<=2*Mn?c=f=i.sliceDoc(n,s):(c=i.sliceDoc(n,n+Mn),f=i.sliceDoc(s-Mn,s));let u=/^\s*/.exec(c)[0].length,d=/\s*$/.exec(f)[0].length,p=f.length-d-t.length;return c.slice(u,u+e.length)==e&&f.slice(p,p+t.length)==t?{open:{pos:n+u+e.length,margin:/\s/.test(c.charAt(u+e.length))?1:0},close:{pos:s-d-t.length,margin:/\s/.test(f.charAt(p-1))?1:0}}:null}function K9(i){let e=[];for(let t of i.selection.ranges){let n=i.doc.lineAt(t.from),s=t.to<=n.to?n:i.doc.lineAt(t.to);s.from>n.from&&s.from==t.to&&(s=t.to==n.to+1?n:i.doc.lineAt(t.to-1));let r=e.length-1;r>=0&&e[r].to>n.from?e[r].to=s.to:e.push({from:n.from+/^\s*/.exec(n.text)[0].length,to:s.to})}return e}function s1(i,e,t=e.selection.ranges){let n=t.map(r=>Xr(e,r.from).block);if(!n.every(r=>r))return null;let s=t.map((r,o)=>U9(e,n[o],r.from,r.to));if(i!=2&&!s.every(r=>r))return{changes:e.changes(t.map((r,o)=>s[o]?[]:[{from:r.from,insert:n[o].open+" "},{from:r.to,insert:" "+n[o].close}]))};if(i!=1&&s.some(r=>r)){let r=[];for(let o=0,l;o<s.length;o++)if(l=s[o]){let a=n[o],{open:h,close:c}=l;r.push({from:h.pos-a.open.length,to:h.pos+h.margin},{from:c.pos-c.margin,to:c.pos+a.close.length})}return{changes:r}}return null}function j9(i,e,t=e.selection.ranges){let n=[],s=-1;e:for(let{from:r,to:o}of t){let l=n.length,a=1e9,h;for(let c=r;c<=o;){let f=e.doc.lineAt(c);if(h==null&&(h=Xr(e,f.from).line,!h))continue e;if(f.from>s&&(r==o||o>f.from)){s=f.from;let u=/^\s*/.exec(f.text)[0].length,d=u==f.length,p=f.text.slice(u,u+h.length)==h?u:-1;u<f.text.length&&u<a&&(a=u),n.push({line:f,comment:p,token:h,indent:u,empty:d,single:!1})}c=f.to+1}if(a<1e9)for(let c=l;c<n.length;c++)n[c].indent<n[c].line.text.length&&(n[c].indent=a);n.length==l+1&&(n[l].single=!0)}if(i!=2&&n.some(r=>r.comment<0&&(!r.empty||r.single))){let r=[];for(let{line:l,token:a,indent:h,empty:c,single:f}of n)(f||!c)&&r.push({from:l.from+h,insert:a+" "});let o=e.changes(r);return{changes:o,selection:e.selection.map(o,1)}}else if(i!=1&&n.some(r=>r.comment>=0)){let r=[];for(let{line:o,comment:l,token:a}of n)if(l>=0){let h=o.from+l,c=h+a.length;o.text[c-o.from]==" "&&c++,r.push({from:h,to:c})}return{changes:r}}return null}const ur=Ot.define(),G9=Ot.define(),X9=L.define(),r1=L.define({combine(i){return Mr(i,{minDepth:100,newGroupDelay:500,joinToEvent:(e,t)=>t},{minDepth:Math.max,newGroupDelay:Math.min,joinToEvent:(e,t)=>(n,s)=>e(n,s)||t(n,s)})}}),o1=Dt.define({create(){return st.empty},update(i,e){let t=e.state.facet(r1),n=e.annotation(ur);if(n){let a=De.fromTransaction(e,n.selection),h=n.side,c=h==0?i.undone:i.done;return a?c=zi(c,c.length,t.minDepth,a):c=h1(c,e.startState.selection),new st(h==0?n.rest:c,h==0?c:n.rest)}let s=e.annotation(G9);if((s=="full"||s=="before")&&(i=i.isolate()),e.annotation(be.addToHistory)===!1)return e.changes.empty?i:i.addMapping(e.changes.desc);let r=De.fromTransaction(e),o=e.annotation(be.time),l=e.annotation(be.userEvent);return r?i=i.addChanges(r,o,l,t,e):e.selection&&(i=i.addSelection(e.startState.selection,o,l,t.newGroupDelay)),(s=="full"||s=="after")&&(i=i.isolate()),i},toJSON(i){return{done:i.done.map(e=>e.toJSON()),undone:i.undone.map(e=>e.toJSON())}},fromJSON(i){return new st(i.done.map(De.fromJSON),i.undone.map(De.fromJSON))}});function J9(i={}){return[o1,r1.of(i),I.domEventHandlers({beforeinput(e,t){let n=e.inputType=="historyUndo"?l1:e.inputType=="historyRedo"?dr:null;return n?(e.preventDefault(),n(t)):!1}})]}function Qi(i,e){return function({state:t,dispatch:n}){if(!e&&t.readOnly)return!1;let s=t.field(o1,!1);if(!s)return!1;let r=s.pop(i,t,e);return r?(n(r),!0):!1}}const l1=Qi(0,!1),dr=Qi(1,!1),Y9=Qi(0,!0),Q9=Qi(1,!0);class De{constructor(e,t,n,s,r){this.changes=e,this.effects=t,this.mapped=n,this.startSelection=s,this.selectionsAfter=r}setSelAfter(e){return new De(this.changes,this.effects,this.mapped,this.startSelection,e)}toJSON(){var e,t,n;return{changes:(e=this.changes)===null||e===void 0?void 0:e.toJSON(),mapped:(t=this.mapped)===null||t===void 0?void 0:t.toJSON(),startSelection:(n=this.startSelection)===null||n===void 0?void 0:n.toJSON(),selectionsAfter:this.selectionsAfter.map(s=>s.toJSON())}}static fromJSON(e){return new De(e.changes&&ge.fromJSON(e.changes),[],e.mapped&&rt.fromJSON(e.mapped),e.startSelection&&w.fromJSON(e.startSelection),e.selectionsAfter.map(w.fromJSON))}static fromTransaction(e,t){let n=Fe;for(let s of e.startState.facet(X9)){let r=s(e);r.length&&(n=n.concat(r))}return!n.length&&e.changes.empty?null:new De(e.changes.invert(e.startState.doc),n,void 0,t||e.startState.selection,Fe)}static selection(e){return new De(void 0,Fe,void 0,void 0,e)}}function zi(i,e,t,n){let s=e+1>t+20?e-t-1:0,r=i.slice(s,e);return r.push(n),r}function Z9(i,e){let t=[],n=!1;return i.iterChangedRanges((s,r)=>t.push(s,r)),e.iterChangedRanges((s,r,o,l)=>{for(let a=0;a<t.length;){let h=t[a++],c=t[a++];l>=h&&o<=c&&(n=!0)}}),n}function e7(i,e){return i.ranges.length==e.ranges.length&&i.ranges.filter((t,n)=>t.empty!=e.ranges[n].empty).length===0}function a1(i,e){return i.length?e.length?i.concat(e):i:e}const Fe=[],t7=200;function h1(i,e){if(i.length){let t=i[i.length-1],n=t.selectionsAfter.slice(Math.max(0,t.selectionsAfter.length-t7));return n.length&&n[n.length-1].eq(e)?i:(n.push(e),zi(i,i.length-1,1e9,t.setSelAfter(n)))}else return[De.selection([e])]}function n7(i){let e=i[i.length-1],t=i.slice();return t[i.length-1]=e.setSelAfter(e.selectionsAfter.slice(0,e.selectionsAfter.length-1)),t}function As(i,e){if(!i.length)return i;let t=i.length,n=Fe;for(;t;){let s=i7(i[t-1],e,n);if(s.changes&&!s.changes.empty||s.effects.length){let r=i.slice(0,t);return r[t-1]=s,r}else e=s.mapped,t--,n=s.selectionsAfter}return n.length?[De.selection(n)]:Fe}function i7(i,e,t){let n=a1(i.selectionsAfter.length?i.selectionsAfter.map(l=>l.map(e)):Fe,t);if(!i.changes)return De.selection(n);let s=i.changes.map(e),r=e.mapDesc(i.changes,!0),o=i.mapped?i.mapped.composeDesc(r):r;return new De(s,de.mapEffects(i.effects,e),o,i.startSelection.map(r),n)}const s7=/^(input\.type|delete)($|\.)/;class st{constructor(e,t,n=0,s=void 0){this.done=e,this.undone=t,this.prevTime=n,this.prevUserEvent=s}isolate(){return this.prevTime?new st(this.done,this.undone):this}addChanges(e,t,n,s,r){let o=this.done,l=o[o.length-1];return l&&l.changes&&!l.changes.empty&&e.changes&&(!n||s7.test(n))&&(!l.selectionsAfter.length&&t-this.prevTime<s.newGroupDelay&&s.joinToEvent(r,Z9(l.changes,e.changes))||n=="input.type.compose")?o=zi(o,o.length-1,s.minDepth,new De(e.changes.compose(l.changes),a1(de.mapEffects(e.effects,l.changes),l.effects),l.mapped,l.startSelection,Fe)):o=zi(o,o.length,s.minDepth,e),new st(o,Fe,t,n)}addSelection(e,t,n,s){let r=this.done.length?this.done[this.done.length-1].selectionsAfter:Fe;return r.length>0&&t-this.prevTime<s&&n==this.prevUserEvent&&n&&/^select($|\.)/.test(n)&&e7(r[r.length-1],e)?this:new st(h1(this.done,e),this.undone,t,n)}addMapping(e){return new st(As(this.done,e),As(this.undone,e),this.prevTime,this.prevUserEvent)}pop(e,t,n){let s=e==0?this.done:this.undone;if(s.length==0)return null;let r=s[s.length-1],o=r.selectionsAfter[0]||(r.startSelection?r.startSelection.map(r.changes.invertedDesc,1):t.selection);if(n&&r.selectionsAfter.length)return t.update({selection:r.selectionsAfter[r.selectionsAfter.length-1],annotations:ur.of({side:e,rest:n7(s),selection:o}),userEvent:e==0?"select.undo":"select.redo",scrollIntoView:!0});if(r.changes){let l=s.length==1?Fe:s.slice(0,s.length-1);return r.mapped&&(l=As(l,r.mapped)),t.update({changes:r.changes,selection:r.startSelection,effects:r.effects,annotations:ur.of({side:e,rest:l,selection:o}),filter:!1,userEvent:e==0?"undo":"redo",scrollIntoView:!0})}else return null}}st.empty=new st(Fe,Fe);const r7=[{key:"Mod-z",run:l1,preventDefault:!0},{key:"Mod-y",mac:"Mod-Shift-z",run:dr,preventDefault:!0},{linux:"Ctrl-Shift-z",run:dr,preventDefault:!0},{key:"Mod-u",run:Y9,preventDefault:!0},{key:"Alt-u",mac:"Mod-Shift-u",run:Q9,preventDefault:!0}];function kn(i,e){return w.create(i.ranges.map(e),i.mainIndex)}function Ge(i,e){return i.update({selection:e,scrollIntoView:!0,userEvent:"select"})}function Xe({state:i,dispatch:e},t){let n=kn(i.selection,t);return n.eq(i.selection,!0)?!1:(e(Ge(i,n)),!0)}function Zi(i,e){return w.cursor(e?i.to:i.from)}function c1(i,e){return Xe(i,t=>t.empty?i.moveByChar(t,e):Zi(t,e))}function Ce(i){return i.textDirectionAt(i.state.selection.main.head)==le.LTR}const f1=i=>c1(i,!Ce(i)),u1=i=>c1(i,Ce(i));function d1(i,e){return Xe(i,t=>t.empty?i.moveByGroup(t,e):Zi(t,e))}const o7=i=>d1(i,!Ce(i)),l7=i=>d1(i,Ce(i));function a7(i,e,t){if(e.type.prop(t))return!0;let n=e.to-e.from;return n&&(n>2||/[^\s,.;:]/.test(i.sliceDoc(e.from,e.to)))||e.firstChild}function es(i,e,t){let n=at(i).resolveInner(e.head),s=t?K.closedBy:K.openedBy;for(let a=e.head;;){let h=t?n.childAfter(a):n.childBefore(a);if(!h)break;a7(i,h,s)?n=h:a=t?h.to:h.from}let r=n.type.prop(s),o,l;return r&&(o=t?on(i,n.from,1):on(i,n.to,-1))&&o.matched?l=t?o.end.to:o.end.from:l=t?n.to:n.from,w.cursor(l,t?-1:1)}const h7=i=>Xe(i,e=>es(i.state,e,!Ce(i))),c7=i=>Xe(i,e=>es(i.state,e,Ce(i)));function p1(i,e){return Xe(i,t=>{if(!t.empty)return Zi(t,e);let n=i.moveVertically(t,e);return n.head!=t.head?n:i.moveToLineBoundary(t,e)})}const m1=i=>p1(i,!1),g1=i=>p1(i,!0);function b1(i){let e=i.scrollDOM.clientHeight<i.scrollDOM.scrollHeight-2,t=0,n=0,s;if(e){for(let r of i.state.facet(I.scrollMargins)){let o=r(i);o!=null&&o.top&&(t=Math.max(o==null?void 0:o.top,t)),o!=null&&o.bottom&&(n=Math.max(o==null?void 0:o.bottom,n))}s=i.scrollDOM.clientHeight-t-n}else s=(i.dom.ownerDocument.defaultView||window).innerHeight;return{marginTop:t,marginBottom:n,selfScroll:e,height:Math.max(i.defaultLineHeight,s-5)}}function y1(i,e){let t=b1(i),{state:n}=i,s=kn(n.selection,o=>o.empty?i.moveVertically(o,e,t.height):Zi(o,e));if(s.eq(n.selection))return!1;let r;if(t.selfScroll){let o=i.coordsAtPos(n.selection.main.head),l=i.scrollDOM.getBoundingClientRect(),a=l.top+t.marginTop,h=l.bottom-t.marginBottom;o&&o.top>a&&o.bottom<h&&(r=I.scrollIntoView(s.main.head,{y:"start",yMargin:o.top-a}))}return i.dispatch(Ge(n,s),{effects:r}),!0}const rl=i=>y1(i,!1),pr=i=>y1(i,!0);function Pt(i,e,t){let n=i.lineBlockAt(e.head),s=i.moveToLineBoundary(e,t);if(s.head==e.head&&s.head!=(t?n.to:n.from)&&(s=i.moveToLineBoundary(e,t,!1)),!t&&s.head==n.from&&n.length){let r=/^\s*/.exec(i.state.sliceDoc(n.from,Math.min(n.from+100,n.to)))[0].length;r&&e.head!=n.from+r&&(s=w.cursor(n.from+r))}return s}const f7=i=>Xe(i,e=>Pt(i,e,!0)),u7=i=>Xe(i,e=>Pt(i,e,!1)),d7=i=>Xe(i,e=>Pt(i,e,!Ce(i))),p7=i=>Xe(i,e=>Pt(i,e,Ce(i))),m7=i=>Xe(i,e=>w.cursor(i.lineBlockAt(e.head).from,1)),g7=i=>Xe(i,e=>w.cursor(i.lineBlockAt(e.head).to,-1));function b7(i,e,t){let n=!1,s=kn(i.selection,r=>{let o=on(i,r.head,-1)||on(i,r.head,1)||r.head>0&&on(i,r.head-1,1)||r.head<i.doc.length&&on(i,r.head+1,-1);if(!o||!o.end)return r;n=!0;let l=o.start.from==r.head?o.end.to:o.end.from;return w.cursor(l)});return n?(e(Ge(i,s)),!0):!1}const y7=({state:i,dispatch:e})=>b7(i,e);function We(i,e){let t=kn(i.state.selection,n=>{let s=e(n);return w.range(n.anchor,s.head,s.goalColumn,s.bidiLevel||void 0,s.assoc)});return t.eq(i.state.selection)?!1:(i.dispatch(Ge(i.state,t)),!0)}function v1(i,e){return We(i,t=>i.moveByChar(t,e))}const w1=i=>v1(i,!Ce(i)),k1=i=>v1(i,Ce(i));function x1(i,e){return We(i,t=>i.moveByGroup(t,e))}const v7=i=>x1(i,!Ce(i)),w7=i=>x1(i,Ce(i)),k7=i=>We(i,e=>es(i.state,e,!Ce(i))),x7=i=>We(i,e=>es(i.state,e,Ce(i)));function S1(i,e){return We(i,t=>i.moveVertically(t,e))}const A1=i=>S1(i,!1),C1=i=>S1(i,!0);function M1(i,e){return We(i,t=>i.moveVertically(t,e,b1(i).height))}const ol=i=>M1(i,!1),ll=i=>M1(i,!0),S7=i=>We(i,e=>Pt(i,e,!0)),A7=i=>We(i,e=>Pt(i,e,!1)),C7=i=>We(i,e=>Pt(i,e,!Ce(i))),M7=i=>We(i,e=>Pt(i,e,Ce(i))),T7=i=>We(i,e=>w.cursor(i.lineBlockAt(e.head).from)),E7=i=>We(i,e=>w.cursor(i.lineBlockAt(e.head).to)),al=({state:i,dispatch:e})=>(e(Ge(i,{anchor:0})),!0),hl=({state:i,dispatch:e})=>(e(Ge(i,{anchor:i.doc.length})),!0),cl=({state:i,dispatch:e})=>(e(Ge(i,{anchor:i.selection.main.anchor,head:0})),!0),fl=({state:i,dispatch:e})=>(e(Ge(i,{anchor:i.selection.main.anchor,head:i.doc.length})),!0),B7=({state:i,dispatch:e})=>(e(i.update({selection:{anchor:0,head:i.doc.length},userEvent:"select"})),!0),D7=({state:i,dispatch:e})=>{let t=ts(i).map(({from:n,to:s})=>w.range(n,Math.min(s+1,i.doc.length)));return e(i.update({selection:w.create(t),userEvent:"select"})),!0},O7=({state:i,dispatch:e})=>{let t=kn(i.selection,n=>{let s=at(i),r=s.resolveStack(n.from,1);if(n.empty){let o=s.resolveStack(n.from,-1);o.node.from>=r.node.from&&o.node.to<=r.node.to&&(r=o)}for(let o=r;o;o=o.next){let{node:l}=o;if((l.from<n.from&&l.to>=n.to||l.to>n.to&&l.from<=n.from)&&o.next)return w.range(l.to,l.from)}return n});return t.eq(i.selection)?!1:(e(Ge(i,t)),!0)};function T1(i,e){let{state:t}=i,n=t.selection,s=t.selection.ranges.slice();for(let r of t.selection.ranges){let o=t.doc.lineAt(r.head);if(e?o.to<i.state.doc.length:o.from>0)for(let l=r;;){let a=i.moveVertically(l,e);if(a.head<o.from||a.head>o.to){s.some(h=>h.head==a.head)||s.push(a);break}else{if(a.head==l.head)break;l=a}}}return s.length==n.ranges.length?!1:(i.dispatch(Ge(t,w.create(s,s.length-1))),!0)}const P7=i=>T1(i,!1),L7=i=>T1(i,!0),R7=({state:i,dispatch:e})=>{let t=i.selection,n=null;return t.ranges.length>1?n=w.create([t.main]):t.main.empty||(n=w.create([w.cursor(t.main.head)])),n?(e(Ge(i,n)),!0):!1};function Zn(i,e){if(i.state.readOnly)return!1;let t="delete.selection",{state:n}=i,s=n.changeByRange(r=>{let{from:o,to:l}=r;if(o==l){let a=e(r);a<o?(t="delete.backward",a=mi(i,a,!1)):a>o&&(t="delete.forward",a=mi(i,a,!0)),o=Math.min(o,a),l=Math.max(l,a)}else o=mi(i,o,!1),l=mi(i,l,!0);return o==l?{range:r}:{changes:{from:o,to:l},range:w.cursor(o,o<r.head?-1:1)}});return s.changes.empty?!1:(i.dispatch(n.update(s,{scrollIntoView:!0,userEvent:t,effects:t=="delete.selection"?I.announce.of(n.phrase("Selection deleted")):void 0})),!0)}function mi(i,e,t){if(i instanceof I)for(let n of i.state.facet(I.atomicRanges).map(s=>s(i)))n.between(e,e,(s,r)=>{s<e&&r>e&&(e=t?r:s)});return e}const E1=(i,e,t)=>Zn(i,n=>{let s=n.from,{state:r}=i,o=r.doc.lineAt(s),l,a;if(t&&!e&&s>o.from&&s<o.from+200&&!/[^ \t]/.test(l=o.text.slice(0,s-o.from))){if(l[l.length-1]=="	")return s-1;let h=Vi(l,r.tabSize),c=h%Gt(r)||Gt(r);for(let f=0;f<c&&l[l.length-1-f]==" ";f++)s--;a=s}else a=Ae(o.text,s-o.from,e,e)+o.from,a==s&&o.number!=(e?r.doc.lines:1)?a+=e?1:-1:!e&&/[\ufe00-\ufe0f]/.test(o.text.slice(a-o.from,s-o.from))&&(a=Ae(o.text,a-o.from,!1,!1)+o.from);return a}),mr=i=>E1(i,!1,!0),B1=i=>E1(i,!0,!1),D1=(i,e)=>Zn(i,t=>{let n=t.head,{state:s}=i,r=s.doc.lineAt(n),o=s.charCategorizer(n);for(let l=null;;){if(n==(e?r.to:r.from)){n==t.head&&r.number!=(e?s.doc.lines:1)&&(n+=e?1:-1);break}let a=Ae(r.text,n-r.from,e)+r.from,h=r.text.slice(Math.min(n,a)-r.from,Math.max(n,a)-r.from),c=o(h);if(l!=null&&c!=l)break;(h!=" "||n!=t.head)&&(l=c),n=a}return n}),O1=i=>D1(i,!1),I7=i=>D1(i,!0),N7=i=>Zn(i,e=>{let t=i.lineBlockAt(e.head).to;return e.head<t?t:Math.min(i.state.doc.length,e.head+1)}),q7=i=>Zn(i,e=>{let t=i.moveToLineBoundary(e,!1).head;return e.head>t?t:Math.max(0,e.head-1)}),_7=i=>Zn(i,e=>{let t=i.moveToLineBoundary(e,!0).head;return e.head<t?t:Math.min(i.state.doc.length,e.head+1)}),z7=({state:i,dispatch:e})=>{if(i.readOnly)return!1;let t=i.changeByRange(n=>({changes:{from:n.from,to:n.to,insert:J.of(["",""])},range:w.cursor(n.from)}));return e(i.update(t,{scrollIntoView:!0,userEvent:"input"})),!0},F7=({state:i,dispatch:e})=>{if(i.readOnly)return!1;let t=i.changeByRange(n=>{if(!n.empty||n.from==0||n.from==i.doc.length)return{range:n};let s=n.from,r=i.doc.lineAt(s),o=s==r.from?s-1:Ae(r.text,s-r.from,!1)+r.from,l=s==r.to?s+1:Ae(r.text,s-r.from,!0)+r.from;return{changes:{from:o,to:l,insert:i.doc.slice(s,l).append(i.doc.slice(o,s))},range:w.cursor(l)}});return t.changes.empty?!1:(e(i.update(t,{scrollIntoView:!0,userEvent:"move.character"})),!0)};function ts(i){let e=[],t=-1;for(let n of i.selection.ranges){let s=i.doc.lineAt(n.from),r=i.doc.lineAt(n.to);if(!n.empty&&n.to==r.from&&(r=i.doc.lineAt(n.to-1)),t>=s.number){let o=e[e.length-1];o.to=r.to,o.ranges.push(n)}else e.push({from:s.from,to:r.to,ranges:[n]});t=r.number+1}return e}function P1(i,e,t){if(i.readOnly)return!1;let n=[],s=[];for(let r of ts(i)){if(t?r.to==i.doc.length:r.from==0)continue;let o=i.doc.lineAt(t?r.to+1:r.from-1),l=o.length+1;if(t){n.push({from:r.to,to:o.to},{from:r.from,insert:o.text+i.lineBreak});for(let a of r.ranges)s.push(w.range(Math.min(i.doc.length,a.anchor+l),Math.min(i.doc.length,a.head+l)))}else{n.push({from:o.from,to:r.from},{from:r.to,insert:i.lineBreak+o.text});for(let a of r.ranges)s.push(w.range(a.anchor-l,a.head-l))}}return n.length?(e(i.update({changes:n,scrollIntoView:!0,selection:w.create(s,i.selection.mainIndex),userEvent:"move.line"})),!0):!1}const H7=({state:i,dispatch:e})=>P1(i,e,!1),W7=({state:i,dispatch:e})=>P1(i,e,!0);function L1(i,e,t){if(i.readOnly)return!1;let n=[];for(let r of ts(i))t?n.push({from:r.from,insert:i.doc.slice(r.from,r.to)+i.lineBreak}):n.push({from:r.to,insert:i.lineBreak+i.doc.slice(r.from,r.to)});let s=i.changes(n);return e(i.update({changes:s,selection:i.selection.map(s,t?1:-1),scrollIntoView:!0,userEvent:"input.copyline"})),!0}const V7=({state:i,dispatch:e})=>L1(i,e,!1),$7=({state:i,dispatch:e})=>L1(i,e,!0),U7=i=>{if(i.state.readOnly)return!1;let{state:e}=i,t=e.changes(ts(e).map(({from:s,to:r})=>(s>0?s--:r<e.doc.length&&r++,{from:s,to:r}))),n=kn(e.selection,s=>{let r;if(i.lineWrapping){let o=i.lineBlockAt(s.head),l=i.coordsAtPos(s.head,s.assoc||1);l&&(r=o.bottom+i.documentTop-l.bottom+i.defaultLineHeight/2)}return i.moveVertically(s,!0,r)}).map(t);return i.dispatch({changes:t,selection:n,scrollIntoView:!0,userEvent:"delete.line"}),!0};function K7(i,e){if(/\(\)|\[\]|\{\}/.test(i.sliceDoc(e-1,e+1)))return{from:e,to:e};let t=at(i).resolveInner(e),n=t.childBefore(e),s=t.childAfter(e),r;return n&&s&&n.to<=e&&s.from>=e&&(r=n.type.prop(K.closedBy))&&r.indexOf(s.name)>-1&&i.doc.lineAt(n.to).from==i.doc.lineAt(s.from).from&&!/\S/.test(i.sliceDoc(n.to,s.from))?{from:n.to,to:s.from}:null}const ul=R1(!1),j7=R1(!0);function R1(i){return({state:e,dispatch:t})=>{if(e.readOnly)return!1;let n=e.changeByRange(s=>{let{from:r,to:o}=s,l=e.doc.lineAt(r),a=!i&&r==o&&K7(e,r);i&&(r=o=(o<=l.to?l:e.doc.lineAt(o)).to);let h=new Ji(e,{simulateBreak:r,simulateDoubleBreak:!!a}),c=Ga(h,r);for(c==null&&(c=Vi(/^\s*/.exec(e.doc.lineAt(r).text)[0],e.tabSize));o<l.to&&/\s/.test(l.text[o-l.from]);)o++;a?{from:r,to:o}=a:r>l.from&&r<l.from+100&&!/\S/.test(l.text.slice(0,r))&&(r=l.from);let f=["",_i(e,c)];return a&&f.push(_i(e,h.lineIndent(l.from,-1))),{changes:{from:r,to:o,insert:J.of(f)},range:w.cursor(r+1+f[1].length)}});return t(e.update(n,{scrollIntoView:!0,userEvent:"input"})),!0}}function Jr(i,e){let t=-1;return i.changeByRange(n=>{let s=[];for(let o=n.from;o<=n.to;){let l=i.doc.lineAt(o);l.number>t&&(n.empty||n.to>l.from)&&(e(l,s,n),t=l.number),o=l.to+1}let r=i.changes(s);return{changes:s,range:w.range(r.mapPos(n.anchor,1),r.mapPos(n.head,1))}})}const G7=({state:i,dispatch:e})=>{if(i.readOnly)return!1;let t=Object.create(null),n=new Ji(i,{overrideIndentation:r=>{let o=t[r];return o??-1}}),s=Jr(i,(r,o,l)=>{let a=Ga(n,r.from);if(a==null)return;/\S/.test(r.text)||(a=0);let h=/^\s*/.exec(r.text)[0],c=_i(i,a);(h!=c||l.from<r.from+h.length)&&(t[r.from]=a,o.push({from:r.from,to:r.from+h.length,insert:c}))});return s.changes.empty||e(i.update(s,{userEvent:"indent"})),!0},I1=({state:i,dispatch:e})=>i.readOnly?!1:(e(i.update(Jr(i,(t,n)=>{n.push({from:t.from,insert:i.facet(Vr)})}),{userEvent:"input.indent"})),!0),N1=({state:i,dispatch:e})=>i.readOnly?!1:(e(i.update(Jr(i,(t,n)=>{let s=/^\s*/.exec(t.text)[0];if(!s)return;let r=Vi(s,i.tabSize),o=0,l=_i(i,Math.max(0,r-Gt(i)));for(;o<s.length&&o<l.length&&s.charCodeAt(o)==l.charCodeAt(o);)o++;n.push({from:t.from+o,to:t.from+s.length,insert:l.slice(o)})}),{userEvent:"delete.dedent"})),!0),X7=i=>(i.setTabFocusMode(),!0),J7=[{key:"Ctrl-b",run:f1,shift:w1,preventDefault:!0},{key:"Ctrl-f",run:u1,shift:k1},{key:"Ctrl-p",run:m1,shift:A1},{key:"Ctrl-n",run:g1,shift:C1},{key:"Ctrl-a",run:m7,shift:T7},{key:"Ctrl-e",run:g7,shift:E7},{key:"Ctrl-d",run:B1},{key:"Ctrl-h",run:mr},{key:"Ctrl-k",run:N7},{key:"Ctrl-Alt-h",run:O1},{key:"Ctrl-o",run:z7},{key:"Ctrl-t",run:F7},{key:"Ctrl-v",run:pr}],Y7=[{key:"ArrowLeft",run:f1,shift:w1,preventDefault:!0},{key:"Mod-ArrowLeft",mac:"Alt-ArrowLeft",run:o7,shift:v7,preventDefault:!0},{mac:"Cmd-ArrowLeft",run:d7,shift:C7,preventDefault:!0},{key:"ArrowRight",run:u1,shift:k1,preventDefault:!0},{key:"Mod-ArrowRight",mac:"Alt-ArrowRight",run:l7,shift:w7,preventDefault:!0},{mac:"Cmd-ArrowRight",run:p7,shift:M7,preventDefault:!0},{key:"ArrowUp",run:m1,shift:A1,preventDefault:!0},{mac:"Cmd-ArrowUp",run:al,shift:cl},{mac:"Ctrl-ArrowUp",run:rl,shift:ol},{key:"ArrowDown",run:g1,shift:C1,preventDefault:!0},{mac:"Cmd-ArrowDown",run:hl,shift:fl},{mac:"Ctrl-ArrowDown",run:pr,shift:ll},{key:"PageUp",run:rl,shift:ol},{key:"PageDown",run:pr,shift:ll},{key:"Home",run:u7,shift:A7,preventDefault:!0},{key:"Mod-Home",run:al,shift:cl},{key:"End",run:f7,shift:S7,preventDefault:!0},{key:"Mod-End",run:hl,shift:fl},{key:"Enter",run:ul,shift:ul},{key:"Mod-a",run:B7},{key:"Backspace",run:mr,shift:mr,preventDefault:!0},{key:"Delete",run:B1,preventDefault:!0},{key:"Mod-Backspace",mac:"Alt-Backspace",run:O1,preventDefault:!0},{key:"Mod-Delete",mac:"Alt-Delete",run:I7,preventDefault:!0},{mac:"Mod-Backspace",run:q7,preventDefault:!0},{mac:"Mod-Delete",run:_7,preventDefault:!0}].concat(J7.map(i=>({mac:i.key,run:i.run,shift:i.shift}))),Q7=[{key:"Alt-ArrowLeft",mac:"Ctrl-ArrowLeft",run:h7,shift:k7},{key:"Alt-ArrowRight",mac:"Ctrl-ArrowRight",run:c7,shift:x7},{key:"Alt-ArrowUp",run:H7},{key:"Shift-Alt-ArrowUp",run:V7},{key:"Alt-ArrowDown",run:W7},{key:"Shift-Alt-ArrowDown",run:$7},{key:"Mod-Alt-ArrowUp",run:P7},{key:"Mod-Alt-ArrowDown",run:L7},{key:"Escape",run:R7},{key:"Mod-Enter",run:j7},{key:"Alt-l",mac:"Ctrl-l",run:D7},{key:"Mod-i",run:O7,preventDefault:!0},{key:"Mod-[",run:N1},{key:"Mod-]",run:I1},{key:"Mod-Alt-\\",run:G7},{key:"Shift-Mod-k",run:U7},{key:"Shift-Mod-\\",run:y7},{key:"Mod-/",run:H9},{key:"Alt-A",run:V9},{key:"Ctrl-m",mac:"Shift-Alt-m",run:X7}].concat(Y7),Z7={key:"Tab",run:I1,shift:N1},ef=new Set(["dup","drop","swap","choose","branch","ifte","eval","nop","putc","getc","putn","clock","clr","rand","exit","depth","q<","q>"]),q1=Yi.define([{tag:q.comment,color:"#8a6f5f",fontStyle:"italic"},{tag:q.string,color:"#1d6e57"},{tag:q.number,color:"#b14f21"},{tag:q.keyword,color:"#7d2a10",fontWeight:"700"},{tag:q.definition(q.variableName),color:"#0d4f87",fontWeight:"700"},{tag:[q.operator,q.bracket],color:"#2a2d34"}]),_1=I.theme({"&":{height:"100%",backgroundColor:"transparent"},"&.cm-focused":{outline:"none"},".cm-scroller":{overflow:"auto"},".cm-content":{padding:"1rem"},".cm-gutters":{backgroundColor:"transparent",color:"#7a6153",border:"none"},".cm-lineNumbers .cm-gutterElement":{padding:"0 0.55rem 0 0"},".cm-line":{padding:"0"},".cm-cursor, .cm-dropCursor":{borderLeftColor:"#201611"},".cm-selectionBackground, .cm-content ::selection":{backgroundColor:"rgba(187, 77, 29, 0.22)"}}),tf=I.theme({".cm-content":{minHeight:"520px"}});I.theme({"&":{border:"1px solid rgba(32, 22, 17, 0.15)",borderRadius:"14px",backgroundColor:"var(--panel-strong)"},"&.cm-focused":{outline:"none"},".cm-scroller":{overflowX:"auto",overflowY:"hidden",fontFamily:'"Iosevka", "Cascadia Code", "SFMono-Regular", monospace',fontSize:"0.95rem",lineHeight:"1.55"},".cm-content":{minHeight:"44px",padding:"0.7rem 0.9rem",whiteSpace:"pre"},".cm-line":{padding:"0"},".cm-cursor, .cm-dropCursor":{borderLeftColor:"#201611"},".cm-selectionBackground, .cm-content ::selection":{backgroundColor:"rgba(187, 77, 29, 0.22)"}});const nf=I.theme({".cm-content":{minHeight:"160px",padding:"1rem 1.2rem 1.2rem"},".cm-scroller":{fontFamily:'"Iosevka", "Cascadia Code", "SFMono-Regular", monospace',fontSize:"0.92rem",lineHeight:"1.55"}}),sf={startState(){return{inBlockComment:!1,inString:!1,inStringEscape:!1}},copyState(i){return{inBlockComment:i.inBlockComment,inString:i.inString,inStringEscape:i.inStringEscape}},token(i,e){if(e.inBlockComment){for(;!i.eol();){if(i.match("*/")){e.inBlockComment=!1;break}i.next()}return"comment"}if(e.inString){for(;!i.eol();){const n=i.next();if(e.inStringEscape){e.inStringEscape=!1;continue}if(n==="\\"){e.inStringEscape=!0;continue}if(n==="'"){e.inString=!1;break}}return"string"}if(i.eatSpace())return null;if(i.match("/*"))return e.inBlockComment=!0,"comment";if(i.peek()==="'")return i.next(),e.inString=!0,e.inStringEscape=!1,"string";if(i.match(/^q[<>](?![a-zA-Z0-9_])/i)||i.match(/^\.[a-zA-Z_][a-zA-Z0-9_]*/))return"keyword";if(i.match(/^(?:0x[0-9a-fA-F_]+|0b[01_]+|0o[0-7_]+|[0-9][0-9_]*)(?![a-zA-Z0-9_])/))return"number";if(i.match(/^[a-zA-Z_][a-zA-Z0-9_]*:(?![a-zA-Z0-9_])/))return"def";if(i.match(/^[\[\]]/))return"bracket";if(i.match(/^(?:<<|>>|[+\-*/%=<>|&~?:;()])/))return"operator";const t=i.match(/^[a-zA-Z_][a-zA-Z0-9_]*/);return t?ef.has(t[0].toLowerCase())?"keyword":null:(i.next(),null)}},z1=Ur.define(sf),rf=[J9(),Na.of([Z7,...Q7,...r7]),I3(),z1,Ya(q1)];function F1(i,e){const t=new I({state:Z.create({doc:e,extensions:[...rf,J3(),z3(),I.lineWrapping,_1,tf]}),parent:i});return{getValue(){return t.state.doc.toString()},setValue(n){t.state.doc.toString()!==n&&t.dispatch({changes:{from:0,to:t.state.doc.length,insert:n}})},focus(){t.focus()}}}function dl(i,e){const t=new I({state:Z.create({doc:e,extensions:[z1,Ya(q1),Z.readOnly.of(!0),I.editable.of(!1),I.lineWrapping,_1,nf]}),parent:i});return{getValue(){return t.state.doc.toString()},setValue(n){t.state.doc.toString()!==n&&t.dispatch({changes:{from:0,to:t.state.doc.length,insert:n}})},focus(){t.focus()}}}const of=`/* constants 1 2 3 */
true: 1 ; /* true == 1 */
false: 0 ; /* false == 0 */

/* incrementors */

--: 1 - ; /* n -- == n-1 */
++: 1 + ; /* n ++ == n+1 */
pred: dup -- ; /* n pred == n n-1 */
succ: dup ++ ; /* n succ == n n+1 */

/* shuffle words */

slip: q< eval q> ; /* [A] b slip == a* b */
drop2: drop drop ; /* a b drop2 == */
swapd: q< swap q> ; /* a b c swapd == b a c */
dupd: q< dup q> ; /* a b dupd == a a b */

dip: swap slip ; .inline /* a [B] dip == b* a */
dig: swapd swap ; .inline /* a b c dig == b c a */
bury: swap swapd ; .inline /* a b c bury == c a b */
rot: swap swapd swap ; .inline /* a b c rot == c b a */
over: dupd swap ; .inline /* a b over == a b a */
dup2: over over ; .inline /* a b dup2 == a b a b */
run: dup slip ; .inline /* [A] run == a* [A] */
nip: swap drop ; .inline /* a b nip == b */
tuck: swap over ; .inline /* a b tuck == b a b */
sip: over slip ; .inline /* a [B] sip == a b* a */
sipd: q< sip q> ; .inline /* a [B] c sipd == a b* a c */
bi: q< over q< eval q> q> dig q< eval q> swap ; .inline /* a [B] [C] bi == b c */
bi2: q< q< dup2 q> eval bury q> eval ; .inline /* a b [C] [D] bi2 == c d */

/* inquisitive */

not: 0 = ; /* flag not == flag' */
zero?: 0 = ; /* n zero? == flag */
truthy?: zero? not ; .inline /* n truthy? == flag */
falsey?: zero? ; .inline /* n falsey? == flag */
!=: = not ; .inline /* a b != == flag */
nz?: zero? not ; .inline /* n nz? == flag */

/* comparison */
<=: > not ; .inline /* a b <= == flag */
>=: < not ; .inline /* a b >= == flag */

sort2: dup2 > [ swap ] ? ; .inline /* a b sort2 == min max */
between?: [ sort2 ] dip swap dupd < bury < and ; .inline /* lo hi n between? == flag */

/* binary operators */

bxor: dup2 ~ & rot ~ & | ; /* a b bxor == n */

/* logical */

and: * truthy? ; /* a b and == flag */
or: + truthy? ; /* a b or == flag */
nand: * zero? ; /* a b nand == flag */
nor: + zero? ; /* a b nor == flag */

/* short circuit */

or_else: q< over slip swap q> swap [ drop2 true ] [ eval ] branch ; .inline /* a [B] [C] or_else == flag */
and_also: q< over slip swap q> swap [ eval ] [ drop2 false ] branch ; .inline /* a [B] [C] and_also == flag */

/* branching */

choose: rot [ swap ] ? drop ; /* a b flag choose == a or b */
branch: choose eval ; /* a flag [B] [C] branch == b* or c* */
if: slip ? ; /* a flag [B] if == a or b* */
ifte: slipd branch ; /* a flag [B] [C] ifte == b* or c* */

/* stack */

empty?: depth zero? ; /* .. empty? == .. flag */
pushtop: depth 1 > [ swap q< pushtop q> ] ? ; /* .. a pushtop == a .. */

/* counters */

_loop: dup [ -- q< dup q< eval q> q> _loop ] ? ; /* a [B] n _loop == a b* n */
loop: _loop drop ; /* a [B] n loop == a b* [B] */

times: loop drop ; /* a [B] n times == a b* */
seq: swap times ; /* a n [B] seq == a b* */

range: dupd swap - [ succ ] seq ; /* a b range == a..b */
count: 0 swap ++ [ succ ] seq drop ; /* n count == 1..n */
`,lf=`.import ./num.ffp

/* Buck's functions used for m <= 5 */
F:  over 0 = [ nip 1 + ] [
    over 1 = [ nip 2 + ] [
    over 2 = [ nip 2 * ] [
    over 3 = [ nip 2 swap ^ ] [
    over 4 = [ nip 2 swap ^^ ]
             [ nip 2 swap ^^^ ] branch
  ] branch
  ] branch
  ] branch
  ] branch ;

/* Recursive function for m > 5 */
_ackn: over [ dup
  [ [ dup -- swap ] dip -- ack ack ]
  [ drop -- 1 ack ] branch ] [ nip ++ ] branch ;

/* Ackermann function */
ack: over 6 < [ 3 + F 3 - ] [ _ackn ] branch ;
`,af=`.import ./pred.ffp

/* Unary operations */

sgn: dup positive? swap negitive? - ; .inline /* n sgn == -1 or 0 or 1 */
abs: dup negitive? [ -1 * ] ? ; .inline /* n abs == |n| */
sqr: dup * ; /* n sqr == n^2 */

/* Ordering utilities */

min: sort2 drop ; .inline /* a b min == min */
max: sort2 nip ; .inline /* a b max == max */
clamp: dig max min ; .inline /* lo hi n clamp == n' */

/* Division utilities */

divrem: [ / ] [ % ] bi2 ; /* a b divrem == q r */
`,hf=`.import ./arith.ffp

/*
 * Arctan utilities using Taylor series and fixed-point integer arithmetic.
 *
 * Words:
 *   n num den atan2                   -> floor(10^n * arctan(num/den))
 *   n x atan                          -> floor(10^n * arctan(x))
 *   n x atan-inv                      -> floor(10^n * arctan(1/x))
 */

/*
 * Recursive Taylor loop for ratio form where |num/den| <= 1
 * state: sum term odd sign num2 den2
 */
(_atan2-loop):
  /* addend = term / odd while preserving state */
  q< q<
  q<
  dup q<
  over swap /
  q> q> q> q>

  /* duplicate addend and move condition to top */
  q< q< q< q<
  dup
  q> swap
  q> swap
  q> swap
  q> swap

  [
    /* state in: sum term addend odd sign num2 den2 */
    q< q<
    swap q<

    /* sum' = sum + sign*addend, while preserving sign */
    dup
    rot
    *
    swap
    q<
    swap
    q<
    +
    q>
    q>
    q>

    /* restore num2/den2 for term update */
    q> q>

    /* term' = floor(term * num2 / den2), preserve num2/den2 */
    dup2
    q< q<
    rot
    q<
    rot
    q<
    q<
    *
    q>
    /
    q>
    q>
    q>
    q>

    /* sign' = -sign */
    q< q<
    swap
    -1 *
    q> q>

    /* odd' = odd + 2 */
    q< q< q<
    2 +
    q> q> q>

    (_atan2-loop)
  ]
  [
    /* addend is zero: return sum */
    drop
    drop
    drop
    drop
    drop
    drop
  ]
  branch
;

/* scale num den (num,den >= 0, num <= den) -> floor(scale * arctan(num/den)) */
_atan2-core:
  /* term0 = floor(scale * num / den) */
  dup q<
  over q<
  q<
  *
  q>
  /

  /* num2 = num*num, den2 = den*den */
  q> dup *
  q> dup *

  /* init: sum=0 term=term0 odd=1 sign=1 num2 den2 */
  q< q<
  0 swap
  1 1
  q> q>

  (_atan2-loop)
;

/* scale -> floor(scale * pi) */
_pi-scaled:
  dup 1 5 _atan2-core
  swap 1 239 _atan2-core
  swap 4 * swap -
  4 *
;

/* scale num den (num == 0) -> 0 */
_atan2-num-zero:
  drop
  drop
  drop
  0
;

/* scale num den (den == 0) -> sign(num) * pi/2 */
_atan2-den-zero:
  drop
  dup sgn q<
  drop
  _pi-scaled 2 /
  q> *
;

/* scale num den (num,den > 0) -> floor(scale * arctan(num/den)) */
_atan2-abs:
  dup2 <=
  [
    _atan2-core
  ]
  [
    q< q<
    dup q<
    dup _pi-scaled 2 /
    swap drop
    q> q> q> swap
    _atan2-core
    -
  ]
  branch
;

/* scale num den (num,den != 0) -> floor(scale * arctan(num/den)) */
_atan2-finite:
  over sgn q<
  dup sgn q<
  abs swap abs swap
  q> q> * q<
  _atan2-abs
  q> *
;

/* scale num den -> floor(scale * arctan(num/den)) */
_atan2-scaled:
  over zero?
  [
    _atan2-num-zero
  ]
  [
    dup zero?
    [
      _atan2-den-zero
    ]
    [
      _atan2-finite
    ]
    branch
  ]
  branch
;

/* n num den -> floor(10^n * arctan(num/den)) */
atan2:
  q< q<
  10 swap ^
  q> q>
  _atan2-scaled
;

/* n x -> floor(10^n * arctan(x)) */
atan: 1 atan2 ;

/* n x -> floor(10^n * arctan(1/x)) */
atan-inv: 1 swap atan2 ;
`,cf=`.import ./arith.ffp

/*
 * Naming note: the \`i\` prefix means integer.
 * \`icbrt\` returns the integer cube root (truncated toward zero).
 */

_icbrt-closer: dup2 2 ^ / over 2 * + 3 / ;
_icbrt-loop: _icbrt-closer dup2 > [ nip _icbrt-loop ] ? ;
_icbrtn: dup 3 / _icbrt-loop drop nip ;

icbrt: dup sgn swap over * dup 1 > [ _icbrtn ] ? * ;
`,ff=`.import ../core/core.ff
.import ../seq/seq.ffp

/* encodes the first 9999 odd primes into a single big integer
 * each prime is encoded as a single bit. */

             3      5      7     11     13     17     19     23     29 
     31     37     41     43     47     53     59     61     67     71 
     73     79     83     89     97    101    103    107    109    113 
    127    131    137    139    149    151    157    163    167    173 
    179    181    191    193    197    199    211    223    227    229 
    233    239    241    251    257    263    269    271    277    281 
    283    293    307    311    313    317    331    337    347    349 
    353    359    367    373    379    383    389    397    401    409 
    419    421    431    433    439    443    449    457    461    463 
    467    479    487    491    499    503    509    521    523    541 
    547    557    563    569    571    577    587    593    599    601 
    607    613    617    619    631    641    643    647    653    659 
    661    673    677    683    691    701    709    719    727    733 
    739    743    751    757    761    769    773    787    797    809 
    811    821    823    827    829    839    853    857    859    863 
    877    881    883    887    907    911    919    929    937    941 
    947    953    967    971    977    983    991    997   1009   1013 
   1019   1021   1031   1033   1039   1049   1051   1061   1063   1069 
   1087   1091   1093   1097   1103   1109   1117   1123   1129   1151 
   1153   1163   1171   1181   1187   1193   1201   1213   1217   1223 
   1229   1231   1237   1249   1259   1277   1279   1283   1289   1291 
   1297   1301   1303   1307   1319   1321   1327   1361   1367   1373 
   1381   1399   1409   1423   1427   1429   1433   1439   1447   1451 
   1453   1459   1471   1481   1483   1487   1489   1493   1499   1511 
   1523   1531   1543   1549   1553   1559   1567   1571   1579   1583 
   1597   1601   1607   1609   1613   1619   1621   1627   1637   1657 
   1663   1667   1669   1693   1697   1699   1709   1721   1723   1733 
   1741   1747   1753   1759   1777   1783   1787   1789   1801   1811 
   1823   1831   1847   1861   1867   1871   1873   1877   1879   1889 
   1901   1907   1913   1931   1933   1949   1951   1973   1979   1987 
   1993   1997   1999   2003   2011   2017   2027   2029   2039   2053 
   2063   2069   2081   2083   2087   2089   2099   2111   2113   2129 
   2131   2137   2141   2143   2153   2161   2179   2203   2207   2213 
   2221   2237   2239   2243   2251   2267   2269   2273   2281   2287 
   2293   2297   2309   2311   2333   2339   2341   2347   2351   2357 
   2371   2377   2381   2383   2389   2393   2399   2411   2417   2423 
   2437   2441   2447   2459   2467   2473   2477   2503   2521   2531 
   2539   2543   2549   2551   2557   2579   2591   2593   2609   2617 
   2621   2633   2647   2657   2659   2663   2671   2677   2683   2687 
   2689   2693   2699   2707   2711   2713   2719   2729   2731   2741 
   2749   2753   2767   2777   2789   2791   2797   2801   2803   2819 
   2833   2837   2843   2851   2857   2861   2879   2887   2897   2903 
   2909   2917   2927   2939   2953   2957   2963   2969   2971   2999 
   3001   3011   3019   3023   3037   3041   3049   3061   3067   3079 
   3083   3089   3109   3119   3121   3137   3163   3167   3169   3181 
   3187   3191   3203   3209   3217   3221   3229   3251   3253   3257 
   3259   3271   3299   3301   3307   3313   3319   3323   3329   3331 
   3343   3347   3359   3361   3371   3373   3389   3391   3407   3413 
   3433   3449   3457   3461   3463   3467   3469   3491   3499   3511 
   3517   3527   3529   3533   3539   3541   3547   3557   3559   3571 
   3581   3583   3593   3607   3613   3617   3623   3631   3637   3643 
   3659   3671   3673   3677   3691   3697   3701   3709   3719   3727 
   3733   3739   3761   3767   3769   3779   3793   3797   3803   3821 
   3823   3833   3847   3851   3853   3863   3877   3881   3889   3907 
   3911   3917   3919   3923   3929   3931   3943   3947   3967   3989 
   4001   4003   4007   4013   4019   4021   4027   4049   4051   4057 
   4073   4079   4091   4093   4099   4111   4127   4129   4133   4139 
   4153   4157   4159   4177   4201   4211   4217   4219   4229   4231 
   4241   4243   4253   4259   4261   4271   4273   4283   4289   4297 
   4327   4337   4339   4349   4357   4363   4373   4391   4397   4409 
   4421   4423   4441   4447   4451   4457   4463   4481   4483   4493 
   4507   4513   4517   4519   4523   4547   4549   4561   4567   4583 
   4591   4597   4603   4621   4637   4639   4643   4649   4651   4657 
   4663   4673   4679   4691   4703   4721   4723   4729   4733   4751 
   4759   4783   4787   4789   4793   4799   4801   4813   4817   4831 
   4861   4871   4877   4889   4903   4909   4919   4931   4933   4937 
   4943   4951   4957   4967   4969   4973   4987   4993   4999   5003 
   5009   5011   5021   5023   5039   5051   5059   5077   5081   5087 
   5099   5101   5107   5113   5119   5147   5153   5167   5171   5179 
   5189   5197   5209   5227   5231   5233   5237   5261   5273   5279 
   5281   5297   5303   5309   5323   5333   5347   5351   5381   5387 
   5393   5399   5407   5413   5417   5419   5431   5437   5441   5443 
   5449   5471   5477   5479   5483   5501   5503   5507   5519   5521 
   5527   5531   5557   5563   5569   5573   5581   5591   5623   5639 
   5641   5647   5651   5653   5657   5659   5669   5683   5689   5693 
   5701   5711   5717   5737   5741   5743   5749   5779   5783   5791 
   5801   5807   5813   5821   5827   5839   5843   5849   5851   5857 
   5861   5867   5869   5879   5881   5897   5903   5923   5927   5939 
   5953   5981   5987   6007   6011   6029   6037   6043   6047   6053 
   6067   6073   6079   6089   6091   6101   6113   6121   6131   6133 
   6143   6151   6163   6173   6197   6199   6203   6211   6217   6221 
   6229   6247   6257   6263   6269   6271   6277   6287   6299   6301 
   6311   6317   6323   6329   6337   6343   6353   6359   6361   6367 
   6373   6379   6389   6397   6421   6427   6449   6451   6469   6473 
   6481   6491   6521   6529   6547   6551   6553   6563   6569   6571 
   6577   6581   6599   6607   6619   6637   6653   6659   6661   6673 
   6679   6689   6691   6701   6703   6709   6719   6733   6737   6761 
   6763   6779   6781   6791   6793   6803   6823   6827   6829   6833 
   6841   6857   6863   6869   6871   6883   6899   6907   6911   6917 
   6947   6949   6959   6961   6967   6971   6977   6983   6991   6997 
   7001   7013   7019   7027   7039   7043   7057   7069   7079   7103 
   7109   7121   7127   7129   7151   7159   7177   7187   7193   7207 
   7211   7213   7219   7229   7237   7243   7247   7253   7283   7297 
   7307   7309   7321   7331   7333   7349   7351   7369   7393   7411 
   7417   7433   7451   7457   7459   7477   7481   7487   7489   7499 
   7507   7517   7523   7529   7537   7541   7547   7549   7559   7561 
   7573   7577   7583   7589   7591   7603   7607   7621   7639   7643 
   7649   7669   7673   7681   7687   7691   7699   7703   7717   7723 
   7727   7741   7753   7757   7759   7789   7793   7817   7823   7829 
   7841   7853   7867   7873   7877   7879   7883   7901   7907   7919 
   7927   7933   7937   7949   7951   7963   7993   8009   8011   8017 
   8039   8053   8059   8069   8081   8087   8089   8093   8101   8111 
   8117   8123   8147   8161   8167   8171   8179   8191   8209   8219 
   8221   8231   8233   8237   8243   8263   8269   8273   8287   8291 
   8293   8297   8311   8317   8329   8353   8363   8369   8377   8387 
   8389   8419   8423   8429   8431   8443   8447   8461   8467   8501 
   8513   8521   8527   8537   8539   8543   8563   8573   8581   8597 
   8599   8609   8623   8627   8629   8641   8647   8663   8669   8677 
   8681   8689   8693   8699   8707   8713   8719   8731   8737   8741 
   8747   8753   8761   8779   8783   8803   8807   8819   8821   8831 
   8837   8839   8849   8861   8863   8867   8887   8893   8923   8929 
   8933   8941   8951   8963   8969   8971   8999   9001   9007   9011 
   9013   9029   9041   9043   9049   9059   9067   9091   9103   9109 
   9127   9133   9137   9151   9157   9161   9173   9181   9187   9199 
   9203   9209   9221   9227   9239   9241   9257   9277   9281   9283 
   9293   9311   9319   9323   9337   9341   9343   9349   9371   9377 
   9391   9397   9403   9413   9419   9421   9431   9433   9437   9439 
   9461   9463   9467   9473   9479   9491   9497   9511   9521   9533 
   9539   9547   9551   9587   9601   9613   9619   9623   9629   9631 
   9643   9649   9661   9677   9679   9689   9697   9719   9721   9733 
   9739   9743   9749   9767   9769   9781   9787   9791   9803   9811 
   9817   9829   9833   9839   9851   9857   9859   9871   9883   9887 
   9901   9907   9923   9929   9931   9941   9949   9967   9973  10007 
  10009  10037  10039  10061  10067  10069  10079  10091  10093  10099 
  10103  10111  10133  10139  10141  10151  10159  10163  10169  10177 
  10181  10193  10211  10223  10243  10247  10253  10259  10267  10271 
  10273  10289  10301  10303  10313  10321  10331  10333  10337  10343 
  10357  10369  10391  10399  10427  10429  10433  10453  10457  10459 
  10463  10477  10487  10499  10501  10513  10529  10531  10559  10567 
  10589  10597  10601  10607  10613  10627  10631  10639  10651  10657 
  10663  10667  10687  10691  10709  10711  10723  10729  10733  10739 
  10753  10771  10781  10789  10799  10831  10837  10847  10853  10859 
  10861  10867  10883  10889  10891  10903  10909  10937  10939  10949 
  10957  10973  10979  10987  10993  11003  11027  11047  11057  11059 
  11069  11071  11083  11087  11093  11113  11117  11119  11131  11149 
  11159  11161  11171  11173  11177  11197  11213  11239  11243  11251 
  11257  11261  11273  11279  11287  11299  11311  11317  11321  11329 
  11351  11353  11369  11383  11393  11399  11411  11423  11437  11443 
  11447  11467  11471  11483  11489  11491  11497  11503  11519  11527 
  11549  11551  11579  11587  11593  11597  11617  11621  11633  11657 
  11677  11681  11689  11699  11701  11717  11719  11731  11743  11777 
  11779  11783  11789  11801  11807  11813  11821  11827  11831  11833 
  11839  11863  11867  11887  11897  11903  11909  11923  11927  11933 
  11939  11941  11953  11959  11969  11971  11981  11987  12007  12011 
  12037  12041  12043  12049  12071  12073  12097  12101  12107  12109 
  12113  12119  12143  12149  12157  12161  12163  12197  12203  12211 
  12227  12239  12241  12251  12253  12263  12269  12277  12281  12289 
  12301  12323  12329  12343  12347  12373  12377  12379  12391  12401 
  12409  12413  12421  12433  12437  12451  12457  12473  12479  12487 
  12491  12497  12503  12511  12517  12527  12539  12541  12547  12553 
  12569  12577  12583  12589  12601  12611  12613  12619  12637  12641 
  12647  12653  12659  12671  12689  12697  12703  12713  12721  12739 
  12743  12757  12763  12781  12791  12799  12809  12821  12823  12829 
  12841  12853  12889  12893  12899  12907  12911  12917  12919  12923 
  12941  12953  12959  12967  12973  12979  12983  13001  13003  13007 
  13009  13033  13037  13043  13049  13063  13093  13099  13103  13109 
  13121  13127  13147  13151  13159  13163  13171  13177  13183  13187 
  13217  13219  13229  13241  13249  13259  13267  13291  13297  13309 
  13313  13327  13331  13337  13339  13367  13381  13397  13399  13411 
  13417  13421  13441  13451  13457  13463  13469  13477  13487  13499 
  13513  13523  13537  13553  13567  13577  13591  13597  13613  13619 
  13627  13633  13649  13669  13679  13681  13687  13691  13693  13697 
  13709  13711  13721  13723  13729  13751  13757  13759  13763  13781 
  13789  13799  13807  13829  13831  13841  13859  13873  13877  13879 
  13883  13901  13903  13907  13913  13921  13931  13933  13963  13967 
  13997  13999  14009  14011  14029  14033  14051  14057  14071  14081 
  14083  14087  14107  14143  14149  14153  14159  14173  14177  14197 
  14207  14221  14243  14249  14251  14281  14293  14303  14321  14323 
  14327  14341  14347  14369  14387  14389  14401  14407  14411  14419 
  14423  14431  14437  14447  14449  14461  14479  14489  14503  14519 
  14533  14537  14543  14549  14551  14557  14561  14563  14591  14593 
  14621  14627  14629  14633  14639  14653  14657  14669  14683  14699 
  14713  14717  14723  14731  14737  14741  14747  14753  14759  14767 
  14771  14779  14783  14797  14813  14821  14827  14831  14843  14851 
  14867  14869  14879  14887  14891  14897  14923  14929  14939  14947 
  14951  14957  14969  14983  15013  15017  15031  15053  15061  15073 
  15077  15083  15091  15101  15107  15121  15131  15137  15139  15149 
  15161  15173  15187  15193  15199  15217  15227  15233  15241  15259 
  15263  15269  15271  15277  15287  15289  15299  15307  15313  15319 
  15329  15331  15349  15359  15361  15373  15377  15383  15391  15401 
  15413  15427  15439  15443  15451  15461  15467  15473  15493  15497 
  15511  15527  15541  15551  15559  15569  15581  15583  15601  15607 
  15619  15629  15641  15643  15647  15649  15661  15667  15671  15679 
  15683  15727  15731  15733  15737  15739  15749  15761  15767  15773 
  15787  15791  15797  15803  15809  15817  15823  15859  15877  15881 
  15887  15889  15901  15907  15913  15919  15923  15937  15959  15971 
  15973  15991  16001  16007  16033  16057  16061  16063  16067  16069 
  16073  16087  16091  16097  16103  16111  16127  16139  16141  16183 
  16187  16189  16193  16217  16223  16229  16231  16249  16253  16267 
  16273  16301  16319  16333  16339  16349  16361  16363  16369  16381 
  16411  16417  16421  16427  16433  16447  16451  16453  16477  16481 
  16487  16493  16519  16529  16547  16553  16561  16567  16573  16603 
  16607  16619  16631  16633  16649  16651  16657  16661  16673  16691 
  16693  16699  16703  16729  16741  16747  16759  16763  16787  16811 
  16823  16829  16831  16843  16871  16879  16883  16889  16901  16903 
  16921  16927  16931  16937  16943  16963  16979  16981  16987  16993 
  17011  17021  17027  17029  17033  17041  17047  17053  17077  17093 
  17099  17107  17117  17123  17137  17159  17167  17183  17189  17191 
  17203  17207  17209  17231  17239  17257  17291  17293  17299  17317 
  17321  17327  17333  17341  17351  17359  17377  17383  17387  17389 
  17393  17401  17417  17419  17431  17443  17449  17467  17471  17477 
  17483  17489  17491  17497  17509  17519  17539  17551  17569  17573 
  17579  17581  17597  17599  17609  17623  17627  17657  17659  17669 
  17681  17683  17707  17713  17729  17737  17747  17749  17761  17783 
  17789  17791  17807  17827  17837  17839  17851  17863  17881  17891 
  17903  17909  17911  17921  17923  17929  17939  17957  17959  17971 
  17977  17981  17987  17989  18013  18041  18043  18047  18049  18059 
  18061  18077  18089  18097  18119  18121  18127  18131  18133  18143 
  18149  18169  18181  18191  18199  18211  18217  18223  18229  18233 
  18251  18253  18257  18269  18287  18289  18301  18307  18311  18313 
  18329  18341  18353  18367  18371  18379  18397  18401  18413  18427 
  18433  18439  18443  18451  18457  18461  18481  18493  18503  18517 
  18521  18523  18539  18541  18553  18583  18587  18593  18617  18637 
  18661  18671  18679  18691  18701  18713  18719  18731  18743  18749 
  18757  18773  18787  18793  18797  18803  18839  18859  18869  18899 
  18911  18913  18917  18919  18947  18959  18973  18979  19001  19009 
  19013  19031  19037  19051  19069  19073  19079  19081  19087  19121 
  19139  19141  19157  19163  19181  19183  19207  19211  19213  19219 
  19231  19237  19249  19259  19267  19273  19289  19301  19309  19319 
  19333  19373  19379  19381  19387  19391  19403  19417  19421  19423 
  19427  19429  19433  19441  19447  19457  19463  19469  19471  19477 
  19483  19489  19501  19507  19531  19541  19543  19553  19559  19571 
  19577  19583  19597  19603  19609  19661  19681  19687  19697  19699 
  19709  19717  19727  19739  19751  19753  19759  19763  19777  19793 
  19801  19813  19819  19841  19843  19853  19861  19867  19889  19891 
  19913  19919  19927  19937  19949  19961  19963  19973  19979  19991 
  19993  19997  20011  20021  20023  20029  20047  20051  20063  20071 
  20089  20101  20107  20113  20117  20123  20129  20143  20147  20149 
  20161  20173  20177  20183  20201  20219  20231  20233  20249  20261 
  20269  20287  20297  20323  20327  20333  20341  20347  20353  20357 
  20359  20369  20389  20393  20399  20407  20411  20431  20441  20443 
  20477  20479  20483  20507  20509  20521  20533  20543  20549  20551 
  20563  20593  20599  20611  20627  20639  20641  20663  20681  20693 
  20707  20717  20719  20731  20743  20747  20749  20753  20759  20771 
  20773  20789  20807  20809  20849  20857  20873  20879  20887  20897 
  20899  20903  20921  20929  20939  20947  20959  20963  20981  20983 
  21001  21011  21013  21017  21019  21023  21031  21059  21061  21067 
  21089  21101  21107  21121  21139  21143  21149  21157  21163  21169 
  21179  21187  21191  21193  21211  21221  21227  21247  21269  21277 
  21283  21313  21317  21319  21323  21341  21347  21377  21379  21383 
  21391  21397  21401  21407  21419  21433  21467  21481  21487  21491 
  21493  21499  21503  21517  21521  21523  21529  21557  21559  21563 
  21569  21577  21587  21589  21599  21601  21611  21613  21617  21647 
  21649  21661  21673  21683  21701  21713  21727  21737  21739  21751 
  21757  21767  21773  21787  21799  21803  21817  21821  21839  21841 
  21851  21859  21863  21871  21881  21893  21911  21929  21937  21943 
  21961  21977  21991  21997  22003  22013  22027  22031  22037  22039 
  22051  22063  22067  22073  22079  22091  22093  22109  22111  22123 
  22129  22133  22147  22153  22157  22159  22171  22189  22193  22229 
  22247  22259  22271  22273  22277  22279  22283  22291  22303  22307 
  22343  22349  22367  22369  22381  22391  22397  22409  22433  22441 
  22447  22453  22469  22481  22483  22501  22511  22531  22541  22543 
  22549  22567  22571  22573  22613  22619  22621  22637  22639  22643 
  22651  22669  22679  22691  22697  22699  22709  22717  22721  22727 
  22739  22741  22751  22769  22777  22783  22787  22807  22811  22817 
  22853  22859  22861  22871  22877  22901  22907  22921  22937  22943 
  22961  22963  22973  22993  23003  23011  23017  23021  23027  23029 
  23039  23041  23053  23057  23059  23063  23071  23081  23087  23099 
  23117  23131  23143  23159  23167  23173  23189  23197  23201  23203 
  23209  23227  23251  23269  23279  23291  23293  23297  23311  23321 
  23327  23333  23339  23357  23369  23371  23399  23417  23431  23447 
  23459  23473  23497  23509  23531  23537  23539  23549  23557  23561 
  23563  23567  23581  23593  23599  23603  23609  23623  23627  23629 
  23633  23663  23669  23671  23677  23687  23689  23719  23741  23743 
  23747  23753  23761  23767  23773  23789  23801  23813  23819  23827 
  23831  23833  23857  23869  23873  23879  23887  23893  23899  23909 
  23911  23917  23929  23957  23971  23977  23981  23993  24001  24007 
  24019  24023  24029  24043  24049  24061  24071  24077  24083  24091 
  24097  24103  24107  24109  24113  24121  24133  24137  24151  24169 
  24179  24181  24197  24203  24223  24229  24239  24247  24251  24281 
  24317  24329  24337  24359  24371  24373  24379  24391  24407  24413 
  24419  24421  24439  24443  24469  24473  24481  24499  24509  24517 
  24527  24533  24547  24551  24571  24593  24611  24623  24631  24659 
  24671  24677  24683  24691  24697  24709  24733  24749  24763  24767 
  24781  24793  24799  24809  24821  24841  24847  24851  24859  24877 
  24889  24907  24917  24919  24923  24943  24953  24967  24971  24977 
  24979  24989  25013  25031  25033  25037  25057  25073  25087  25097 
  25111  25117  25121  25127  25147  25153  25163  25169  25171  25183 
  25189  25219  25229  25237  25243  25247  25253  25261  25301  25303 
  25307  25309  25321  25339  25343  25349  25357  25367  25373  25391 
  25409  25411  25423  25439  25447  25453  25457  25463  25469  25471 
  25523  25537  25541  25561  25577  25579  25583  25589  25601  25603 
  25609  25621  25633  25639  25643  25657  25667  25673  25679  25693 
  25703  25717  25733  25741  25747  25759  25763  25771  25793  25799 
  25801  25819  25841  25847  25849  25867  25873  25889  25903  25913 
  25919  25931  25933  25939  25943  25951  25969  25981  25997  25999 
  26003  26017  26021  26029  26041  26053  26083  26099  26107  26111 
  26113  26119  26141  26153  26161  26171  26177  26183  26189  26203 
  26209  26227  26237  26249  26251  26261  26263  26267  26293  26297 
  26309  26317  26321  26339  26347  26357  26371  26387  26393  26399 
  26407  26417  26423  26431  26437  26449  26459  26479  26489  26497 
  26501  26513  26539  26557  26561  26573  26591  26597  26627  26633 
  26641  26647  26669  26681  26683  26687  26693  26699  26701  26711 
  26713  26717  26723  26729  26731  26737  26759  26777  26783  26801 
  26813  26821  26833  26839  26849  26861  26863  26879  26881  26891 
  26893  26903  26921  26927  26947  26951  26953  26959  26981  26987 
  26993  27011  27017  27031  27043  27059  27061  27067  27073  27077 
  27091  27103  27107  27109  27127  27143  27179  27191  27197  27211 
  27239  27241  27253  27259  27271  27277  27281  27283  27299  27329 
  27337  27361  27367  27397  27407  27409  27427  27431  27437  27449 
  27457  27479  27481  27487  27509  27527  27529  27539  27541  27551 
  27581  27583  27611  27617  27631  27647  27653  27673  27689  27691 
  27697  27701  27733  27737  27739  27743  27749  27751  27763  27767 
  27773  27779  27791  27793  27799  27803  27809  27817  27823  27827 
  27847  27851  27883  27893  27901  27917  27919  27941  27943  27947 
  27953  27961  27967  27983  27997  28001  28019  28027  28031  28051 
  28057  28069  28081  28087  28097  28099  28109  28111  28123  28151 
  28163  28181  28183  28201  28211  28219  28229  28277  28279  28283 
  28289  28297  28307  28309  28319  28349  28351  28387  28393  28403 
  28409  28411  28429  28433  28439  28447  28463  28477  28493  28499 
  28513  28517  28537  28541  28547  28549  28559  28571  28573  28579 
  28591  28597  28603  28607  28619  28621  28627  28631  28643  28649 
  28657  28661  28663  28669  28687  28697  28703  28711  28723  28729 
  28751  28753  28759  28771  28789  28793  28807  28813  28817  28837 
  28843  28859  28867  28871  28879  28901  28909  28921  28927  28933 
  28949  28961  28979  29009  29017  29021  29023  29027  29033  29059 
  29063  29077  29101  29123  29129  29131  29137  29147  29153  29167 
  29173  29179  29191  29201  29207  29209  29221  29231  29243  29251 
  29269  29287  29297  29303  29311  29327  29333  29339  29347  29363 
  29383  29387  29389  29399  29401  29411  29423  29429  29437  29443 
  29453  29473  29483  29501  29527  29531  29537  29567  29569  29573 
  29581  29587  29599  29611  29629  29633  29641  29663  29669  29671 
  29683  29717  29723  29741  29753  29759  29761  29789  29803  29819 
  29833  29837  29851  29863  29867  29873  29879  29881  29917  29921 
  29927  29947  29959  29983  29989  30011  30013  30029  30047  30059 
  30071  30089  30091  30097  30103  30109  30113  30119  30133  30137 
  30139  30161  30169  30181  30187  30197  30203  30211  30223  30241 
  30253  30259  30269  30271  30293  30307  30313  30319  30323  30341 
  30347  30367  30389  30391  30403  30427  30431  30449  30467  30469 
  30491  30493  30497  30509  30517  30529  30539  30553  30557  30559 
  30577  30593  30631  30637  30643  30649  30661  30671  30677  30689 
  30697  30703  30707  30713  30727  30757  30763  30773  30781  30803 
  30809  30817  30829  30839  30841  30851  30853  30859  30869  30871 
  30881  30893  30911  30931  30937  30941  30949  30971  30977  30983 
  31013  31019  31033  31039  31051  31063  31069  31079  31081  31091 
  31121  31123  31139  31147  31151  31153  31159  31177  31181  31183 
  31189  31193  31219  31223  31231  31237  31247  31249  31253  31259 
  31267  31271  31277  31307  31319  31321  31327  31333  31337  31357 
  31379  31387  31391  31393  31397  31469  31477  31481  31489  31511 
  31513  31517  31531  31541  31543  31547  31567  31573  31583  31601 
  31607  31627  31643  31649  31657  31663  31667  31687  31699  31721 
  31723  31727  31729  31741  31751  31769  31771  31793  31799  31817 
  31847  31849  31859  31873  31883  31891  31907  31957  31963  31973 
  31981  31991  32003  32009  32027  32029  32051  32057  32059  32063 
  32069  32077  32083  32089  32099  32117  32119  32141  32143  32159 
  32173  32183  32189  32191  32203  32213  32233  32237  32251  32257 
  32261  32297  32299  32303  32309  32321  32323  32327  32341  32353 
  32359  32363  32369  32371  32377  32381  32401  32411  32413  32423 
  32429  32441  32443  32467  32479  32491  32497  32503  32507  32531 
  32533  32537  32561  32563  32569  32573  32579  32587  32603  32609 
  32611  32621  32633  32647  32653  32687  32693  32707  32713  32717 
  32719  32749  32771  32779  32783  32789  32797  32801  32803  32831 
  32833  32839  32843  32869  32887  32909  32911  32917  32933  32939 
  32941  32957  32969  32971  32983  32987  32993  32999  33013  33023 
  33029  33037  33049  33053  33071  33073  33083  33091  33107  33113 
  33119  33149  33151  33161  33179  33181  33191  33199  33203  33211 
  33223  33247  33287  33289  33301  33311  33317  33329  33331  33343 
  33347  33349  33353  33359  33377  33391  33403  33409  33413  33427 
  33457  33461  33469  33479  33487  33493  33503  33521  33529  33533 
  33547  33563  33569  33577  33581  33587  33589  33599  33601  33613 
  33617  33619  33623  33629  33637  33641  33647  33679  33703  33713 
  33721  33739  33749  33751  33757  33767  33769  33773  33791  33797 
  33809  33811  33827  33829  33851  33857  33863  33871  33889  33893 
  33911  33923  33931  33937  33941  33961  33967  33997  34019  34031 
  34033  34039  34057  34061  34123  34127  34129  34141  34147  34157 
  34159  34171  34183  34211  34213  34217  34231  34253  34259  34261 
  34267  34273  34283  34297  34301  34303  34313  34319  34327  34337 
  34351  34361  34367  34369  34381  34403  34421  34429  34439  34457 
  34469  34471  34483  34487  34499  34501  34511  34513  34519  34537 
  34543  34549  34583  34589  34591  34603  34607  34613  34631  34649 
  34651  34667  34673  34679  34687  34693  34703  34721  34729  34739 
  34747  34757  34759  34763  34781  34807  34819  34841  34843  34847 
  34849  34871  34877  34883  34897  34913  34919  34939  34949  34961 
  34963  34981  35023  35027  35051  35053  35059  35069  35081  35083 
  35089  35099  35107  35111  35117  35129  35141  35149  35153  35159 
  35171  35201  35221  35227  35251  35257  35267  35279  35281  35291 
  35311  35317  35323  35327  35339  35353  35363  35381  35393  35401 
  35407  35419  35423  35437  35447  35449  35461  35491  35507  35509 
  35521  35527  35531  35533  35537  35543  35569  35573  35591  35593 
  35597  35603  35617  35671  35677  35729  35731  35747  35753  35759 
  35771  35797  35801  35803  35809  35831  35837  35839  35851  35863 
  35869  35879  35897  35899  35911  35923  35933  35951  35963  35969 
  35977  35983  35993  35999  36007  36011  36013  36017  36037  36061 
  36067  36073  36083  36097  36107  36109  36131  36137  36151  36161 
  36187  36191  36209  36217  36229  36241  36251  36263  36269  36277 
  36293  36299  36307  36313  36319  36341  36343  36353  36373  36383 
  36389  36433  36451  36457  36467  36469  36473  36479  36493  36497 
  36523  36527  36529  36541  36551  36559  36563  36571  36583  36587 
  36599  36607  36629  36637  36643  36653  36671  36677  36683  36691 
  36697  36709  36713  36721  36739  36749  36761  36767  36779  36781 
  36787  36791  36793  36809  36821  36833  36847  36857  36871  36877 
  36887  36899  36901  36913  36919  36923  36929  36931  36943  36947 
  36973  36979  36997  37003  37013  37019  37021  37039  37049  37057 
  37061  37087  37097  37117  37123  37139  37159  37171  37181  37189 
  37199  37201  37217  37223  37243  37253  37273  37277  37307  37309 
  37313  37321  37337  37339  37357  37361  37363  37369  37379  37397 
  37409  37423  37441  37447  37463  37483  37489  37493  37501  37507 
  37511  37517  37529  37537  37547  37549  37561  37567  37571  37573 
  37579  37589  37591  37607  37619  37633  37643  37649  37657  37663 
  37691  37693  37699  37717  37747  37781  37783  37799  37811  37813 
  37831  37847  37853  37861  37871  37879  37889  37897  37907  37951 
  37957  37963  37967  37987  37991  37993  37997  38011  38039  38047 
  38053  38069  38083  38113  38119  38149  38153  38167  38177  38183 
  38189  38197  38201  38219  38231  38237  38239  38261  38273  38281 
  38287  38299  38303  38317  38321  38327  38329  38333  38351  38371 
  38377  38393  38431  38447  38449  38453  38459  38461  38501  38543 
  38557  38561  38567  38569  38593  38603  38609  38611  38629  38639 
  38651  38653  38669  38671  38677  38693  38699  38707  38711  38713 
  38723  38729  38737  38747  38749  38767  38783  38791  38803  38821 
  38833  38839  38851  38861  38867  38873  38891  38903  38917  38921 
  38923  38933  38953  38959  38971  38977  38993  39019  39023  39041 
  39043  39047  39079  39089  39097  39103  39107  39113  39119  39133 
  39139  39157  39161  39163  39181  39191  39199  39209  39217  39227 
  39229  39233  39239  39241  39251  39293  39301  39313  39317  39323 
  39341  39343  39359  39367  39371  39373  39383  39397  39409  39419 
  39439  39443  39451  39461  39499  39503  39509  39511  39521  39541 
  39551  39563  39569  39581  39607  39619  39623  39631  39659  39667 
  39671  39679  39703  39709  39719  39727  39733  39749  39761  39769 
  39779  39791  39799  39821  39827  39829  39839  39841  39847  39857 
  39863  39869  39877  39883  39887  39901  39929  39937  39953  39971 
  39979  39983  39989  40009  40013  40031  40037  40039  40063  40087 
  40093  40099  40111  40123  40127  40129  40151  40153  40163  40169 
  40177  40189  40193  40213  40231  40237  40241  40253  40277  40283 
  40289  40343  40351  40357  40361  40387  40423  40427  40429  40433 
  40459  40471  40483  40487  40493  40499  40507  40519  40529  40531 
  40543  40559  40577  40583  40591  40597  40609  40627  40637  40639 
  40693  40697  40699  40709  40739  40751  40759  40763  40771  40787 
  40801  40813  40819  40823  40829  40841  40847  40849  40853  40867 
  40879  40883  40897  40903  40927  40933  40939  40949  40961  40973 
  40993  41011  41017  41023  41039  41047  41051  41057  41077  41081 
  41113  41117  41131  41141  41143  41149  41161  41177  41179  41183 
  41189  41201  41203  41213  41221  41227  41231  41233  41243  41257 
  41263  41269  41281  41299  41333  41341  41351  41357  41381  41387 
  41389  41399  41411  41413  41443  41453  41467  41479  41491  41507 
  41513  41519  41521  41539  41543  41549  41579  41593  41597  41603 
  41609  41611  41617  41621  41627  41641  41647  41651  41659  41669 
  41681  41687  41719  41729  41737  41759  41761  41771  41777  41801 
  41809  41813  41843  41849  41851  41863  41879  41887  41893  41897 
  41903  41911  41927  41941  41947  41953  41957  41959  41969  41981 
  41983  41999  42013  42017  42019  42023  42043  42061  42071  42073 
  42083  42089  42101  42131  42139  42157  42169  42179  42181  42187 
  42193  42197  42209  42221  42223  42227  42239  42257  42281  42283 
  42293  42299  42307  42323  42331  42337  42349  42359  42373  42379 
  42391  42397  42403  42407  42409  42433  42437  42443  42451  42457 
  42461  42463  42467  42473  42487  42491  42499  42509  42533  42557 
  42569  42571  42577  42589  42611  42641  42643  42649  42667  42677 
  42683  42689  42697  42701  42703  42709  42719  42727  42737  42743 
  42751  42767  42773  42787  42793  42797  42821  42829  42839  42841 
  42853  42859  42863  42899  42901  42923  42929  42937  42943  42953 
  42961  42967  42979  42989  43003  43013  43019  43037  43049  43051 
  43063  43067  43093  43103  43117  43133  43151  43159  43177  43189 
  43201  43207  43223  43237  43261  43271  43283  43291  43313  43319 
  43321  43331  43391  43397  43399  43403  43411  43427  43441  43451 
  43457  43481  43487  43499  43517  43541  43543  43573  43577  43579 
  43591  43597  43607  43609  43613  43627  43633  43649  43651  43661 
  43669  43691  43711  43717  43721  43753  43759  43777  43781  43783 
  43787  43789  43793  43801  43853  43867  43889  43891  43913  43933 
  43943  43951  43961  43963  43969  43973  43987  43991  43997  44017 
  44021  44027  44029  44041  44053  44059  44071  44087  44089  44101 
  44111  44119  44123  44129  44131  44159  44171  44179  44189  44201 
  44203  44207  44221  44249  44257  44263  44267  44269  44273  44279 
  44281  44293  44351  44357  44371  44381  44383  44389  44417  44449 
  44453  44483  44491  44497  44501  44507  44519  44531  44533  44537 
  44543  44549  44563  44579  44587  44617  44621  44623  44633  44641 
  44647  44651  44657  44683  44687  44699  44701  44711  44729  44741 
  44753  44771  44773  44777  44789  44797  44809  44819  44839  44843 
  44851  44867  44879  44887  44893  44909  44917  44927  44939  44953 
  44959  44963  44971  44983  44987  45007  45013  45053  45061  45077 
  45083  45119  45121  45127  45131  45137  45139  45161  45179  45181 
  45191  45197  45233  45247  45259  45263  45281  45289  45293  45307 
  45317  45319  45329  45337  45341  45343  45361  45377  45389  45403 
  45413  45427  45433  45439  45481  45491  45497  45503  45523  45533 
  45541  45553  45557  45569  45587  45589  45599  45613  45631  45641 
  45659  45667  45673  45677  45691  45697  45707  45737  45751  45757 
  45763  45767  45779  45817  45821  45823  45827  45833  45841  45853 
  45863  45869  45887  45893  45943  45949  45953  45959  45971  45979 
  45989  46021  46027  46049  46051  46061  46073  46091  46093  46099 
  46103  46133  46141  46147  46153  46171  46181  46183  46187  46199 
  46219  46229  46237  46261  46271  46273  46279  46301  46307  46309 
  46327  46337  46349  46351  46381  46399  46411  46439  46441  46447 
  46451  46457  46471  46477  46489  46499  46507  46511  46523  46549 
  46559  46567  46573  46589  46591  46601  46619  46633  46639  46643 
  46649  46663  46679  46681  46687  46691  46703  46723  46727  46747 
  46751  46757  46769  46771  46807  46811  46817  46819  46829  46831 
  46853  46861  46867  46877  46889  46901  46919  46933  46957  46993 
  46997  47017  47041  47051  47057  47059  47087  47093  47111  47119 
  47123  47129  47137  47143  47147  47149  47161  47189  47207  47221 
  47237  47251  47269  47279  47287  47293  47297  47303  47309  47317 
  47339  47351  47353  47363  47381  47387  47389  47407  47417  47419 
  47431  47441  47459  47491  47497  47501  47507  47513  47521  47527 
  47533  47543  47563  47569  47581  47591  47599  47609  47623  47629 
  47639  47653  47657  47659  47681  47699  47701  47711  47713  47717 
  47737  47741  47743  47777  47779  47791  47797  47807  47809  47819 
  47837  47843  47857  47869  47881  47903  47911  47917  47933  47939 
  47947  47951  47963  47969  47977  47981  48017  48023  48029  48049 
  48073  48079  48091  48109  48119  48121  48131  48157  48163  48179 
  48187  48193  48197  48221  48239  48247  48259  48271  48281  48299 
  48311  48313  48337  48341  48353  48371  48383  48397  48407  48409 
  48413  48437  48449  48463  48473  48479  48481  48487  48491  48497 
  48523  48527  48533  48539  48541  48563  48571  48589  48593  48611 
  48619  48623  48647  48649  48661  48673  48677  48679  48731  48733 
  48751  48757  48761  48767  48779  48781  48787  48799  48809  48817 
  48821  48823  48847  48857  48859  48869  48871  48883  48889  48907 
  48947  48953  48973  48989  48991  49003  49009  49019  49031  49033 
  49037  49043  49057  49069  49081  49103  49109  49117  49121  49123 
  49139  49157  49169  49171  49177  49193  49199  49201  49207  49211 
  49223  49253  49261  49277  49279  49297  49307  49331  49333  49339 
  49363  49367  49369  49391  49393  49409  49411  49417  49429  49433 
  49451  49459  49463  49477  49481  49499  49523  49529  49531  49537 
  49547  49549  49559  49597  49603  49613  49627  49633  49639  49663 
  49667  49669  49681  49697  49711  49727  49739  49741  49747  49757 
  49783  49787  49789  49801  49807  49811  49823  49831  49843  49853 
  49871  49877  49891  49919  49921  49927  49937  49939  49943  49957 
  49991  49993  49999  50021  50023  50033  50047  50051  50053  50069 
  50077  50087  50093  50101  50111  50119  50123  50129  50131  50147 
  50153  50159  50177  50207  50221  50227  50231  50261  50263  50273 
  50287  50291  50311  50321  50329  50333  50341  50359  50363  50377 
  50383  50387  50411  50417  50423  50441  50459  50461  50497  50503 
  50513  50527  50539  50543  50549  50551  50581  50587  50591  50593 
  50599  50627  50647  50651  50671  50683  50707  50723  50741  50753 
  50767  50773  50777  50789  50821  50833  50839  50849  50857  50867 
  50873  50891  50893  50909  50923  50929  50951  50957  50969  50971 
  50989  50993  51001  51031  51043  51047  51059  51061  51071  51109 
  51131  51133  51137  51151  51157  51169  51193  51197  51199  51203 
  51217  51229  51239  51241  51257  51263  51283  51287  51307  51329 
  51341  51343  51347  51349  51361  51383  51407  51413  51419  51421 
  51427  51431  51437  51439  51449  51461  51473  51479  51481  51487 
  51503  51511  51517  51521  51539  51551  51563  51577  51581  51593 
  51599  51607  51613  51631  51637  51647  51659  51673  51679  51683 
  51691  51713  51719  51721  51749  51767  51769  51787  51797  51803 
  51817  51827  51829  51839  51853  51859  51869  51871  51893  51899 
  51907  51913  51929  51941  51949  51971  51973  51977  51991  52009 
  52021  52027  52051  52057  52067  52069  52081  52103  52121  52127 
  52147  52153  52163  52177  52181  52183  52189  52201  52223  52237 
  52249  52253  52259  52267  52289  52291  52301  52313  52321  52361 
  52363  52369  52379  52387  52391  52433  52453  52457  52489  52501 
  52511  52517  52529  52541  52543  52553  52561  52567  52571  52579 
  52583  52609  52627  52631  52639  52667  52673  52691  52697  52709 
  52711  52721  52727  52733  52747  52757  52769  52783  52807  52813 
  52817  52837  52859  52861  52879  52883  52889  52901  52903  52919 
  52937  52951  52957  52963  52967  52973  52981  52999  53003  53017 
  53047  53051  53069  53077  53087  53089  53093  53101  53113  53117 
  53129  53147  53149  53161  53171  53173  53189  53197  53201  53231 
  53233  53239  53267  53269  53279  53281  53299  53309  53323  53327 
  53353  53359  53377  53381  53401  53407  53411  53419  53437  53441 
  53453  53479  53503  53507  53527  53549  53551  53569  53591  53593 
  53597  53609  53611  53617  53623  53629  53633  53639  53653  53657 
  53681  53693  53699  53717  53719  53731  53759  53773  53777  53783 
  53791  53813  53819  53831  53849  53857  53861  53881  53887  53891 
  53897  53899  53917  53923  53927  53939  53951  53959  53987  53993 
  54001  54011  54013  54037  54049  54059  54083  54091  54101  54121 
  54133  54139  54151  54163  54167  54181  54193  54217  54251  54269 
  54277  54287  54293  54311  54319  54323  54331  54347  54361  54367 
  54371  54377  54401  54403  54409  54413  54419  54421  54437  54443 
  54449  54469  54493  54497  54499  54503  54517  54521  54539  54541 
  54547  54559  54563  54577  54581  54583  54601  54617  54623  54629 
  54631  54647  54667  54673  54679  54709  54713  54721  54727  54751 
  54767  54773  54779  54787  54799  54829  54833  54851  54869  54877 
  54881  54907  54917  54919  54941  54949  54959  54973  54979  54983 
  55001  55009  55021  55049  55051  55057  55061  55073  55079  55103 
  55109  55117  55127  55147  55163  55171  55201  55207  55213  55217 
  55219  55229  55243  55249  55259  55291  55313  55331  55333  55337 
  55339  55343  55351  55373  55381  55399  55411  55439  55441  55457 
  55469  55487  55501  55511  55529  55541  55547  55579  55589  55603 
  55609  55619  55621  55631  55633  55639  55661  55663  55667  55673 
  55681  55691  55697  55711  55717  55721  55733  55763  55787  55793 
  55799  55807  55813  55817  55819  55823  55829  55837  55843  55849 
  55871  55889  55897  55901  55903  55921  55927  55931  55933  55949 
  55967  55987  55997  56003  56009  56039  56041  56053  56081  56087 
  56093  56099  56101  56113  56123  56131  56149  56167  56171  56179 
  56197  56207  56209  56237  56239  56249  56263  56267  56269  56299 
  56311  56333  56359  56369  56377  56383  56393  56401  56417  56431 
  56437  56443  56453  56467  56473  56477  56479  56489  56501  56503 
  56509  56519  56527  56531  56533  56543  56569  56591  56597  56599 
  56611  56629  56633  56659  56663  56671  56681  56687  56701  56711 
  56713  56731  56737  56747  56767  56773  56779  56783  56807  56809 
  56813  56821  56827  56843  56857  56873  56891  56893  56897  56909 
  56911  56921  56923  56929  56941  56951  56957  56963  56983  56989 
  56993  56999  57037  57041  57047  57059  57073  57077  57089  57097 
  57107  57119  57131  57139  57143  57149  57163  57173  57179  57191 
  57193  57203  57221  57223  57241  57251  57259  57269  57271  57283 
  57287  57301  57329  57331  57347  57349  57367  57373  57383  57389 
  57397  57413  57427  57457  57467  57487  57493  57503  57527  57529 
  57557  57559  57571  57587  57593  57601  57637  57641  57649  57653 
  57667  57679  57689  57697  57709  57713  57719  57727  57731  57737 
  57751  57773  57781  57787  57791  57793  57803  57809  57829  57839 
  57847  57853  57859  57881  57899  57901  57917  57923  57943  57947 
  57973  57977  57991  58013  58027  58031  58043  58049  58057  58061 
  58067  58073  58099  58109  58111  58129  58147  58151  58153  58169 
  58171  58189  58193  58199  58207  58211  58217  58229  58231  58237 
  58243  58271  58309  58313  58321  58337  58363  58367  58369  58379 
  58391  58393  58403  58411  58417  58427  58439  58441  58451  58453 
  58477  58481  58511  58537  58543  58549  58567  58573  58579  58601 
  58603  58613  58631  58657  58661  58679  58687  58693  58699  58711 
  58727  58733  58741  58757  58763  58771  58787  58789  58831  58889 
  58897  58901  58907  58909  58913  58921  58937  58943  58963  58967 
  58979  58991  58997  59009  59011  59021  59023  59029  59051  59053 
  59063  59069  59077  59083  59093  59107  59113  59119  59123  59141 
  59149  59159  59167  59183  59197  59207  59209  59219  59221  59233 
  59239  59243  59263  59273  59281  59333  59341  59351  59357  59359 
  59369  59377  59387  59393  59399  59407  59417  59419  59441  59443 
  59447  59453  59467  59471  59473  59497  59509  59513  59539  59557 
  59561  59567  59581  59611  59617  59621  59627  59629  59651  59659 
  59663  59669  59671  59693  59699  59707  59723  59729  59743  59747 
  59753  59771  59779  59791  59797  59809  59833  59863  59879  59887 
  59921  59929  59951  59957  59971  59981  59999  60013  60017  60029 
  60037  60041  60077  60083  60089  60091  60101  60103  60107  60127 
  60133  60139  60149  60161  60167  60169  60209  60217  60223  60251 
  60257  60259  60271  60289  60293  60317  60331  60337  60343  60353 
  60373  60383  60397  60413  60427  60443  60449  60457  60493  60497 
  60509  60521  60527  60539  60589  60601  60607  60611  60617  60623 
  60631  60637  60647  60649  60659  60661  60679  60689  60703  60719 
  60727  60733  60737  60757  60761  60763  60773  60779  60793  60811 
  60821  60859  60869  60887  60889  60899  60901  60913  60917  60919 
  60923  60937  60943  60953  60961  61001  61007  61027  61031  61043 
  61051  61057  61091  61099  61121  61129  61141  61151  61153  61169 
  61211  61223  61231  61253  61261  61283  61291  61297  61331  61333 
  61339  61343  61357  61363  61379  61381  61403  61409  61417  61441 
  61463  61469  61471  61483  61487  61493  61507  61511  61519  61543 
  61547  61553  61559  61561  61583  61603  61609  61613  61627  61631 
  61637  61643  61651  61657  61667  61673  61681  61687  61703  61717 
  61723  61729  61751  61757  61781  61813  61819  61837  61843  61861 
  61871  61879  61909  61927  61933  61949  61961  61967  61979  61981 
  61987  61991  62003  62011  62017  62039  62047  62053  62057  62071 
  62081  62099  62119  62129  62131  62137  62141  62143  62171  62189 
  62191  62201  62207  62213  62219  62233  62273  62297  62299  62303 
  62311  62323  62327  62347  62351  62383  62401  62417  62423  62459 
  62467  62473  62477  62483  62497  62501  62507  62533  62539  62549 
  62563  62581  62591  62597  62603  62617  62627  62633  62639  62653 
  62659  62683  62687  62701  62723  62731  62743  62753  62761  62773 
  62791  62801  62819  62827  62851  62861  62869  62873  62897  62903 
  62921  62927  62929  62939  62969  62971  62981  62983  62987  62989 
  63029  63031  63059  63067  63073  63079  63097  63103  63113  63127 
  63131  63149  63179  63197  63199  63211  63241  63247  63277  63281 
  63299  63311  63313  63317  63331  63337  63347  63353  63361  63367 
  63377  63389  63391  63397  63409  63419  63421  63439  63443  63463 
  63467  63473  63487  63493  63499  63521  63527  63533  63541  63559 
  63577  63587  63589  63599  63601  63607  63611  63617  63629  63647 
  63649  63659  63667  63671  63689  63691  63697  63703  63709  63719 
  63727  63737  63743  63761  63773  63781  63793  63799  63803  63809 
  63823  63839  63841  63853  63857  63863  63901  63907  63913  63929 
  63949  63977  63997  64007  64013  64019  64033  64037  64063  64067 
  64081  64091  64109  64123  64151  64153  64157  64171  64187  64189 
  64217  64223  64231  64237  64271  64279  64283  64301  64303  64319 
  64327  64333  64373  64381  64399  64403  64433  64439  64451  64453 
  64483  64489  64499  64513  64553  64567  64577  64579  64591  64601 
  64609  64613  64621  64627  64633  64661  64663  64667  64679  64693 
  64709  64717  64747  64763  64781  64783  64793  64811  64817  64849 
  64853  64871  64877  64879  64891  64901  64919  64921  64927  64937 
  64951  64969  64997  65003  65011  65027  65029  65033  65053  65063 
  65071  65089  65099  65101  65111  65119  65123  65129  65141  65147 
  65167  65171  65173  65179  65183  65203  65213  65239  65257  65267 
  65269  65287  65293  65309  65323  65327  65353  65357  65371  65381 
  65393  65407  65413  65419  65423  65437  65447  65449  65479  65497 
  65519  65521  65537  65539  65543  65551  65557  65563  65579  65581 
  65587  65599  65609  65617  65629  65633  65647  65651  65657  65677 
  65687  65699  65701  65707  65713  65717  65719  65729  65731  65761 
  65777  65789  65809  65827  65831  65837  65839  65843  65851  65867 
  65881  65899  65921  65927  65929  65951  65957  65963  65981  65983 
  65993  66029  66037  66041  66047  66067  66071  66083  66089  66103 
  66107  66109  66137  66161  66169  66173  66179  66191  66221  66239 
  66271  66293  66301  66337  66343  66347  66359  66361  66373  66377 
  66383  66403  66413  66431  66449  66457  66463  66467  66491  66499 
  66509  66523  66529  66533  66541  66553  66569  66571  66587  66593 
  66601  66617  66629  66643  66653  66683  66697  66701  66713  66721 
  66733  66739  66749  66751  66763  66791  66797  66809  66821  66841 
  66851  66853  66863  66877  66883  66889  66919  66923  66931  66943 
  66947  66949  66959  66973  66977  67003  67021  67033  67043  67049 
  67057  67061  67073  67079  67103  67121  67129  67139  67141  67153 
  67157  67169  67181  67187  67189  67211  67213  67217  67219  67231 
  67247  67261  67271  67273  67289  67307  67339  67343  67349  67369 
  67391  67399  67409  67411  67421  67427  67429  67433  67447  67453 
  67477  67481  67489  67493  67499  67511  67523  67531  67537  67547 
  67559  67567  67577  67579  67589  67601  67607  67619  67631  67651 
  67679  67699  67709  67723  67733  67741  67751  67757  67759  67763 
  67777  67783  67789  67801  67807  67819  67829  67843  67853  67867 
  67883  67891  67901  67927  67931  67933  67939  67943  67957  67961 
  67967  67979  67987  67993  68023  68041  68053  68059  68071  68087 
  68099  68111  68113  68141  68147  68161  68171  68207  68209  68213 
  68219  68227  68239  68261  68279  68281  68311  68329  68351  68371 
  68389  68399  68437  68443  68447  68449  68473  68477  68483  68489 
  68491  68501  68507  68521  68531  68539  68543  68567  68581  68597 
  68611  68633  68639  68659  68669  68683  68687  68699  68711  68713 
  68729  68737  68743  68749  68767  68771  68777  68791  68813  68819 
  68821  68863  68879  68881  68891  68897  68899  68903  68909  68917 
  68927  68947  68963  68993  69001  69011  69019  69029  69031  69061 
  69067  69073  69109  69119  69127  69143  69149  69151  69163  69191 
  69193  69197  69203  69221  69233  69239  69247  69257  69259  69263 
  69313  69317  69337  69341  69371  69379  69383  69389  69401  69403 
  69427  69431  69439  69457  69463  69467  69473  69481  69491  69493 
  69497  69499  69539  69557  69593  69623  69653  69661  69677  69691 
  69697  69709  69737  69739  69761  69763  69767  69779  69809  69821 
  69827  69829  69833  69847  69857  69859  69877  69899  69911  69929 
  69931  69941  69959  69991  69997  70001  70003  70009  70019  70039 
  70051  70061  70067  70079  70099  70111  70117  70121  70123  70139 
  70141  70157  70163  70177  70181  70183  70199  70201  70207  70223 
  70229  70237  70241  70249  70271  70289  70297  70309  70313  70321 
  70327  70351  70373  70379  70381  70393  70423  70429  70439  70451 
  70457  70459  70481  70487  70489  70501  70507  70529  70537  70549 
  70571  70573  70583  70589  70607  70619  70621  70627  70639  70657 
  70663  70667  70687  70709  70717  70729  70753  70769  70783  70793 
  70823  70841  70843  70849  70853  70867  70877  70879  70891  70901 
  70913  70919  70921  70937  70949  70951  70957  70969  70979  70981 
  70991  70997  70999  71011  71023  71039  71059  71069  71081  71089 
  71119  71129  71143  71147  71153  71161  71167  71171  71191  71209 
  71233  71237  71249  71257  71261  71263  71287  71293  71317  71327 
  71329  71333  71339  71341  71347  71353  71359  71363  71387  71389 
  71399  71411  71413  71419  71429  71437  71443  71453  71471  71473 
  71479  71483  71503  71527  71537  71549  71551  71563  71569  71593 
  71597  71633  71647  71663  71671  71693  71699  71707  71711  71713 
  71719  71741  71761  71777  71789  71807  71809  71821  71837  71843 
  71849  71861  71867  71879  71881  71887  71899  71909  71917  71933 
  71941  71947  71963  71971  71983  71987  71993  71999  72019  72031 
  72043  72047  72053  72073  72077  72089  72091  72101  72103  72109 
  72139  72161  72167  72169  72173  72211  72221  72223  72227  72229 
  72251  72253  72269  72271  72277  72287  72307  72313  72337  72341 
  72353  72367  72379  72383  72421  72431  72461  72467  72469  72481 
  72493  72497  72503  72533  72547  72551  72559  72577  72613  72617 
  72623  72643  72647  72649  72661  72671  72673  72679  72689  72701 
  72707  72719  72727  72733  72739  72763  72767  72797  72817  72823 
  72859  72869  72871  72883  72889  72893  72901  72907  72911  72923 
  72931  72937  72949  72953  72959  72973  72977  72997  73009  73013 
  73019  73037  73039  73043  73061  73063  73079  73091  73121  73127 
  73133  73141  73181  73189  73237  73243  73259  73277  73291  73303 
  73309  73327  73331  73351  73361  73363  73369  73379  73387  73417 
  73421  73433  73453  73459  73471  73477  73483  73517  73523  73529 
  73547  73553  73561  73571  73583  73589  73597  73607  73609  73613 
  73637  73643  73651  73673  73679  73681  73693  73699  73709  73721 
  73727  73751  73757  73771  73783  73819  73823  73847  73849  73859 
  73867  73877  73883  73897  73907  73939  73943  73951  73961  73973 
  73999  74017  74021  74027  74047  74051  74071  74077  74093  74099 
  74101  74131  74143  74149  74159  74161  74167  74177  74189  74197 
  74201  74203  74209  74219  74231  74257  74279  74287  74293  74297 
  74311  74317  74323  74353  74357  74363  74377  74381  74383  74411 
  74413  74419  74441  74449  74453  74471  74489  74507  74509  74521 
  74527  74531  74551  74561  74567  74573  74587  74597  74609  74611 
  74623  74653  74687  74699  74707  74713  74717  74719  74729  74731 
  74747  74759  74761  74771  74779  74797  74821  74827  74831  74843 
  74857  74861  74869  74873  74887  74891  74897  74903  74923  74929 
  74933  74941  74959  75011  75013  75017  75029  75037  75041  75079 
  75083  75109  75133  75149  75161  75167  75169  75181  75193  75209 
  75211  75217  75223  75227  75239  75253  75269  75277  75289  75307 
  75323  75329  75337  75347  75353  75367  75377  75389  75391  75401 
  75403  75407  75431  75437  75479  75503  75511  75521  75527  75533 
  75539  75541  75553  75557  75571  75577  75583  75611  75617  75619 
  75629  75641  75653  75659  75679  75683  75689  75703  75707  75709 
  75721  75731  75743  75767  75773  75781  75787  75793  75797  75821 
  75833  75853  75869  75883  75913  75931  75937  75941  75967  75979 
  75983  75989  75991  75997  76001  76003  76031  76039  76079  76081 
  76091  76099  76103  76123  76129  76147  76157  76159  76163  76207 
  76213  76231  76243  76249  76253  76259  76261  76283  76289  76303 
  76333  76343  76367  76369  76379  76387  76403  76421  76423  76441 
  76463  76471  76481  76487  76493  76507  76511  76519  76537  76541 
  76543  76561  76579  76597  76603  76607  76631  76649  76651  76667 
  76673  76679  76697  76717  76733  76753  76757  76771  76777  76781 
  76801  76819  76829  76831  76837  76847  76871  76873  76883  76907 
  76913  76919  76943  76949  76961  76963  76991  77003  77017  77023 
  77029  77041  77047  77069  77081  77093  77101  77137  77141  77153 
  77167  77171  77191  77201  77213  77237  77239  77243  77249  77261 
  77263  77267  77269  77279  77291  77317  77323  77339  77347  77351 
  77359  77369  77377  77383  77417  77419  77431  77447  77471  77477 
  77479  77489  77491  77509  77513  77521  77527  77543  77549  77551 
  77557  77563  77569  77573  77587  77591  77611  77617  77621  77641 
  77647  77659  77681  77687  77689  77699  77711  77713  77719  77723 
  77731  77743  77747  77761  77773  77783  77797  77801  77813  77839 
  77849  77863  77867  77893  77899  77929  77933  77951  77969  77977 
  77983  77999  78007  78017  78031  78041  78049  78059  78079  78101 
  78121  78137  78139  78157  78163  78167  78173  78179  78191  78193 
  78203  78229  78233  78241  78259  78277  78283  78301  78307  78311 
  78317  78341  78347  78367  78401  78427  78437  78439  78467  78479 
  78487  78497  78509  78511  78517  78539  78541  78553  78569  78571 
  78577  78583  78593  78607  78623  78643  78649  78653  78691  78697 
  78707  78713  78721  78737  78779  78781  78787  78791  78797  78803 
  78809  78823  78839  78853  78857  78877  78887  78889  78893  78901 
  78919  78929  78941  78977  78979  78989  79031  79039  79043  79063 
  79087  79103  79111  79133  79139  79147  79151  79153  79159  79181 
  79187  79193  79201  79229  79231  79241  79259  79273  79279  79283 
  79301  79309  79319  79333  79337  79349  79357  79367  79379  79393 
  79397  79399  79411  79423  79427  79433  79451  79481  79493  79531 
  79537  79549  79559  79561  79579  79589  79601  79609  79613  79621 
  79627  79631  79633  79657  79669  79687  79691  79693  79697  79699 
  79757  79769  79777  79801  79811  79813  79817  79823  79829  79841 
  79843  79847  79861  79867  79873  79889  79901  79903  79907  79939 
  79943  79967  79973  79979  79987  79997  79999  80021  80039  80051 
  80071  80077  80107  80111  80141  80147  80149  80153  80167  80173 
  80177  80191  80207  80209  80221  80231  80233  80239  80251  80263 
  80273  80279  80287  80309  80317  80329  80341  80347  80363  80369 
  80387  80407  80429  80447  80449  80471  80473  80489  80491  80513 
  80527  80537  80557  80567  80599  80603  80611  80621  80627  80629 
  80651  80657  80669  80671  80677  80681  80683  80687  80701  80713 
  80737  80747  80749  80761  80777  80779  80783  80789  80803  80809 
  80819  80831  80833  80849  80863  80897  80909  80911  80917  80923 
  80929  80933  80953  80963  80989  81001  81013  81017  81019  81023 
  81031  81041  81043  81047  81049  81071  81077  81083  81097  81101 
  81119  81131  81157  81163  81173  81181  81197  81199  81203  81223 
  81233  81239  81281  81283  81293  81299  81307  81331  81343  81349 
  81353  81359  81371  81373  81401  81409  81421  81439  81457  81463 
  81509  81517  81527  81533  81547  81551  81553  81559  81563  81569 
  81611  81619  81629  81637  81647  81649  81667  81671  81677  81689 
  81701  81703  81707  81727  81737  81749  81761  81769  81773  81799 
  81817  81839  81847  81853  81869  81883  81899  81901  81919  81929 
  81931  81937  81943  81953  81967  81971  81973  82003  82007  82009 
  82013  82021  82031  82037  82039  82051  82067  82073  82129  82139 
  82141  82153  82163  82171  82183  82189  82193  82207  82217  82219 
  82223  82231  82237  82241  82261  82267  82279  82301  82307  82339 
  82349  82351  82361  82373  82387  82393  82421  82457  82463  82469 
  82471  82483  82487  82493  82499  82507  82529  82531  82549  82559 
  82561  82567  82571  82591  82601  82609  82613  82619  82633  82651 
  82657  82699  82721  82723  82727  82729  82757  82759  82763  82781 
  82787  82793  82799  82811  82813  82837  82847  82883  82889  82891 
  82903  82913  82939  82963  82981  82997  83003  83009  83023  83047 
  83059  83063  83071  83077  83089  83093  83101  83117  83137  83177 
  83203  83207  83219  83221  83227  83231  83233  83243  83257  83267 
  83269  83273  83299  83311  83339  83341  83357  83383  83389  83399 
  83401  83407  83417  83423  83431  83437  83443  83449  83459  83471 
  83477  83497  83537  83557  83561  83563  83579  83591  83597  83609 
  83617  83621  83639  83641  83653  83663  83689  83701  83717  83719 
  83737  83761  83773  83777  83791  83813  83833  83843  83857  83869 
  83873  83891  83903  83911  83921  83933  83939  83969  83983  83987 
  84011  84017  84047  84053  84059  84061  84067  84089  84121  84127 
  84131  84137  84143  84163  84179  84181  84191  84199  84211  84221 
  84223  84229  84239  84247  84263  84299  84307  84313  84317  84319 
  84347  84349  84377  84389  84391  84401  84407  84421  84431  84437 
  84443  84449  84457  84463  84467  84481  84499  84503  84509  84521 
  84523  84533  84551  84559  84589  84629  84631  84649  84653  84659 
  84673  84691  84697  84701  84713  84719  84731  84737  84751  84761 
  84787  84793  84809  84811  84827  84857  84859  84869  84871  84913 
  84919  84947  84961  84967  84977  84979  84991  85009  85021  85027 
  85037  85049  85061  85081  85087  85091  85093  85103  85109  85121 
  85133  85147  85159  85193  85199  85201  85213  85223  85229  85237 
  85243  85247  85259  85297  85303  85313  85331  85333  85361  85363 
  85369  85381  85411  85427  85429  85439  85447  85451  85453  85469 
  85487  85513  85517  85523  85531  85549  85571  85577  85597  85601 
  85607  85619  85621  85627  85639  85643  85661  85667  85669  85691 
  85703  85711  85717  85733  85751  85781  85793  85817  85819  85829 
  85831  85837  85843  85847  85853  85889  85903  85909  85931  85933 
  85991  85999  86011  86017  86027  86029  86069  86077  86083  86111 
  86113  86117  86131  86137  86143  86161  86171  86179  86183  86197 
  86201  86209  86239  86243  86249  86257  86263  86269  86287  86291 
  86293  86297  86311  86323  86341  86351  86353  86357  86369  86371 
  86381  86389  86399  86413  86423  86441  86453  86461  86467  86477 
  86491  86501  86509  86531  86533  86539  86561  86573  86579  86587 
  86599  86627  86629  86677  86689  86693  86711  86719  86729  86743 
  86753  86767  86771  86783  86813  86837  86843  86851  86857  86861 
  86869  86923  86927  86929  86939  86951  86959  86969  86981  86993 
  87011  87013  87037  87041  87049  87071  87083  87103  87107  87119 
  87121  87133  87149  87151  87179  87181  87187  87211  87221  87223 
  87251  87253  87257  87277  87281  87293  87299  87313  87317  87323 
  87337  87359  87383  87403  87407  87421  87427  87433  87443  87473 
  87481  87491  87509  87511  87517  87523  87539  87541  87547  87553 
  87557  87559  87583  87587  87589  87613  87623  87629  87631  87641 
  87643  87649  87671  87679  87683  87691  87697  87701  87719  87721 
  87739  87743  87751  87767  87793  87797  87803  87811  87833  87853 
  87869  87877  87881  87887  87911  87917  87931  87943  87959  87961 
  87973  87977  87991  88001  88003  88007  88019  88037  88069  88079 
  88093  88117  88129  88169  88177  88211  88223  88237  88241  88259 
  88261  88289  88301  88321  88327  88337  88339  88379  88397  88411 
  88423  88427  88463  88469  88471  88493  88499  88513  88523  88547 
  88589  88591  88607  88609  88643  88651  88657  88661  88663  88667 
  88681  88721  88729  88741  88747  88771  88789  88793  88799  88801 
  88807  88811  88813  88817  88819  88843  88853  88861  88867  88873 
  88883  88897  88903  88919  88937  88951  88969  88993  88997  89003 
  89009  89017  89021  89041  89051  89057  89069  89071  89083  89087 
  89101  89107  89113  89119  89123  89137  89153  89189  89203  89209 
  89213  89227  89231  89237  89261  89269  89273  89293  89303  89317 
  89329  89363  89371  89381  89387  89393  89399  89413  89417  89431 
  89443  89449  89459  89477  89491  89501  89513  89519  89521  89527 
  89533  89561  89563  89567  89591  89597  89599  89603  89611  89627 
  89633  89653  89657  89659  89669  89671  89681  89689  89753  89759 
  89767  89779  89783  89797  89809  89819  89821  89833  89839  89849 
  89867  89891  89897  89899  89909  89917  89923  89939  89959  89963 
  89977  89983  89989  90001  90007  90011  90017  90019  90023  90031 
  90053  90059  90067  90071  90073  90089  90107  90121  90127  90149 
  90163  90173  90187  90191  90197  90199  90203  90217  90227  90239 
  90247  90263  90271  90281  90289  90313  90353  90359  90371  90373 
  90379  90397  90401  90403  90407  90437  90439  90469  90473  90481 
  90499  90511  90523  90527  90529  90533  90547  90583  90599  90617 
  90619  90631  90641  90647  90659  90677  90679  90697  90703  90709 
  90731  90749  90787  90793  90803  90821  90823  90833  90841  90847 
  90863  90887  90901  90907  90911  90917  90931  90947  90971  90977 
  90989  90997  91009  91019  91033  91079  91081  91097  91099  91121 
  91127  91129  91139  91141  91151  91153  91159  91163  91183  91193 
  91199  91229  91237  91243  91249  91253  91283  91291  91297  91303 
  91309  91331  91367  91369  91373  91381  91387  91393  91397  91411 
  91423  91433  91453  91457  91459  91463  91493  91499  91513  91529 
  91541  91571  91573  91577  91583  91591  91621  91631  91639  91673 
  91691  91703  91711  91733  91753  91757  91771  91781  91801  91807 
  91811  91813  91823  91837  91841  91867  91873  91909  91921  91939 
  91943  91951  91957  91961  91967  91969  91997  92003  92009  92033 
  92041  92051  92077  92083  92107  92111  92119  92143  92153  92173 
  92177  92179  92189  92203  92219  92221  92227  92233  92237  92243 
  92251  92269  92297  92311  92317  92333  92347  92353  92357  92363 
  92369  92377  92381  92383  92387  92399  92401  92413  92419  92431 
  92459  92461  92467  92479  92489  92503  92507  92551  92557  92567 
  92569  92581  92593  92623  92627  92639  92641  92647  92657  92669 
  92671  92681  92683  92693  92699  92707  92717  92723  92737  92753 
  92761  92767  92779  92789  92791  92801  92809  92821  92831  92849 
  92857  92861  92863  92867  92893  92899  92921  92927  92941  92951 
  92957  92959  92987  92993  93001  93047  93053  93059  93077  93083 
  93089  93097  93103  93113  93131  93133  93139  93151  93169  93179 
  93187  93199  93229  93239  93241  93251  93253  93257  93263  93281 
  93283  93287  93307  93319  93323  93329  93337  93371  93377  93383 
  93407  93419  93427  93463  93479  93481  93487  93491  93493  93497 
  93503  93523  93529  93553  93557  93559  93563  93581  93601  93607 
  93629  93637  93683  93701  93703  93719  93739  93761  93763  93787 
  93809  93811  93827  93851  93871  93887  93889  93893  93901  93911 
  93913  93923  93937  93941  93949  93967  93971  93979  93983  93997 
  94007  94009  94033  94049  94057  94063  94079  94099  94109  94111 
  94117  94121  94151  94153  94169  94201  94207  94219  94229  94253 
  94261  94273  94291  94307  94309  94321  94327  94331  94343  94349 
  94351  94379  94397  94399  94421  94427  94433  94439  94441  94447 
  94463  94477  94483  94513  94529  94531  94541  94543  94547  94559 
  94561  94573  94583  94597  94603  94613  94621  94649  94651  94687 
  94693  94709  94723  94727  94747  94771  94777  94781  94789  94793 
  94811  94819  94823  94837  94841  94847  94849  94873  94889  94903 
  94907  94933  94949  94951  94961  94993  94999  95003  95009  95021 
  95027  95063  95071  95083  95087  95089  95093  95101  95107  95111 
  95131  95143  95153  95177  95189  95191  95203  95213  95219  95231 
  95233  95239  95257  95261  95267  95273  95279  95287  95311  95317 
  95327  95339  95369  95383  95393  95401  95413  95419  95429  95441 
  95443  95461  95467  95471  95479  95483  95507  95527  95531  95539 
  95549  95561  95569  95581  95597  95603  95617  95621  95629  95633 
  95651  95701  95707  95713  95717  95723  95731  95737  95747  95773 
  95783  95789  95791  95801  95803  95813  95819  95857  95869  95873 
  95881  95891  95911  95917  95923  95929  95947  95957  95959  95971 
  95987  95989  96001  96013  96017  96043  96053  96059  96079  96097 
  96137  96149  96157  96167  96179  96181  96199  96211  96221  96223 
  96233  96259  96263  96269  96281  96289  96293  96323  96329  96331 
  96337  96353  96377  96401  96419  96431  96443  96451  96457  96461 
  96469  96479  96487  96493  96497  96517  96527  96553  96557  96581 
  96587  96589  96601  96643  96661  96667  96671  96697  96703  96731 
  96737  96739  96749  96757  96763  96769  96779  96787  96797  96799 
  96821  96823  96827  96847  96851  96857  96893  96907  96911  96931 
  96953  96959  96973  96979  96989  96997  97001  97003  97007  97021 
  97039  97073  97081  97103  97117  97127  97151  97157  97159  97169 
  97171  97177  97187  97213  97231  97241  97259  97283  97301  97303 
  97327  97367  97369  97373  97379  97381  97387  97397  97423  97429 
  97441  97453  97459  97463  97499  97501  97511  97523  97547  97549 
  97553  97561  97571  97577  97579  97583  97607  97609  97613  97649 
  97651  97673  97687  97711  97729  97771  97777  97787  97789  97813 
  97829  97841  97843  97847  97849  97859  97861  97871  97879  97883 
  97919  97927  97931  97943  97961  97967  97973  97987  98009  98011 
  98017  98041  98047  98057  98081  98101  98123  98129  98143  98179 
  98207  98213  98221  98227  98251  98257  98269  98297  98299  98317 
  98321  98323  98327  98347  98369  98377  98387  98389  98407  98411 
  98419  98429  98443  98453  98459  98467  98473  98479  98491  98507 
  98519  98533  98543  98561  98563  98573  98597  98621  98627  98639 
  98641  98663  98669  98689  98711  98713  98717  98729  98731  98737 
  98773  98779  98801  98807  98809  98837  98849  98867  98869  98873 
  98887  98893  98897  98899  98909  98911  98927  98929  98939  98947 
  98953  98963  98981  98993  98999  99013  99017  99023  99041  99053 
  99079  99083  99089  99103  99109  99119  99131  99133  99137  99139 
  99149  99173  99181  99191  99223  99233  99241  99251  99257  99259 
  99277  99289  99317  99347  99349  99367  99371  99377  99391  99397 
  99401  99409  99431  99439  99469  99487  99497  99523  99527  99529 
  99551  99559  99563  99571  99577  99581  99607  99611  99623  99643 
  99661  99667  99679  99689  99707  99709  99713  99719  99721  99733 
  99761  99767  99787  99793  99809  99817  99823  99829  99833  99839 
  99859  99871  99877  99881  99901  99907  99923  99929  99961  99971 
  99989  99991 100003 100019 100043 100049 100057 100069 100103 100109 
 100129 100151 100153 100169 100183 100189 100193 100207 100213 100237 
 100267 100271 100279 100291 100297 100313 100333 100343 100357 100361 
 100363 100379 100391 100393 100403 100411 100417 100447 100459 100469 
 100483 100493 100501 100511 100517 100519 100523 100537 100547 100549 
 100559 100591 100609 100613 100621 100649 100669 100673 100693 100699 
 100703 100733 100741 100747 100769 100787 100799 100801 100811 100823 
 100829 100847 100853 100907 100913 100927 100931 100937 100943 100957 
 100981 100987 100999 101009 101021 101027 101051 101063 101081 101089 
 101107 101111 101113 101117 101119 101141 101149 101159 101161 101173 
 101183 101197 101203 101207 101209 101221 101267 101273 101279 101281 
 101287 101293 101323 101333 101341 101347 101359 101363 101377 101383 
 101399 101411 101419 101429 101449 101467 101477 101483 101489 101501 
 101503 101513 101527 101531 101533 101537 101561 101573 101581 101599 
 101603 101611 101627 101641 101653 101663 101681 101693 101701 101719 
 101723 101737 101741 101747 101749 101771 101789 101797 101807 101833 
 101837 101839 101863 101869 101873 101879 101891 101917 101921 101929 
 101939 101957 101963 101977 101987 101999 102001 102013 102019 102023 
 102031 102043 102059 102061 102071 102077 102079 102101 102103 102107 
 102121 102139 102149 102161 102181 102191 102197 102199 102203 102217 
 102229 102233 102241 102251 102253 102259 102293 102299 102301 102317 
 102329 102337 102359 102367 102397 102407 102409 102433 102437 102451 
 102461 102481 102497 102499 102503 102523 102533 102539 102547 102551 
 102559 102563 102587 102593 102607 102611 102643 102647 102653 102667 
 102673 102677 102679 102701 102761 102763 102769 102793 102797 102811 
 102829 102841 102859 102871 102877 102881 102911 102913 102929 102931 
 102953 102967 102983 103001 103007 103043 103049 103067 103069 103079 
 103087 103091 103093 103099 103123 103141 103171 103177 103183 103217 
 103231 103237 103289 103291 103307 103319 103333 103349 103357 103387 
 103391 103393 103399 103409 103421 103423 103451 103457 103471 103483 
 103511 103529 103549 103553 103561 103567 103573 103577 103583 103591 
 103613 103619 103643 103651 103657 103669 103681 103687 103699 103703 
 103723 103769 103787 103801 103811 103813 103837 103841 103843 103867 
 103889 103903 103913 103919 103951 103963 103967 103969 103979 103981 
 103991 103993 103997 104003 104009 104021 104033 104047 104053 104059 
 104087 104089 104107 104113 104119 104123 104147 104149 104161 104173 
 104179 104183 104207 104231 104233 104239 104243 104281 104287 104297 
 104309 104311 104323 104327 104347 104369 104381 104383 104393 104399 
 104417 104459 104471 104473 104479 104491 104513 104527 104537 104543 
 104549 104551 104561 104579 104593 104597 104623 104639 104651 104659 
 104677 104681 104683 104693 104701 104707 104711 104717 104723 104729
 
 [ 1 >> 1 swap << + ] 0 foldl! putn`,uf=`.import ../core/core.ff

_gcd_t: dup bury % dup [ _gcd_t ] ? ;

gcd: dup [ _gcd_t ] ? drop ;
lcm: dup2 gcd / * ;
`,df=`.import ../core/core.ff

ilb: dup 1 > [ 1 >> ilb ++ ] [ drop 0 ] branch ; /* n ilb == floor(log2(n)) */
ilog: dup 10 >= [ 10 / ilog ++ ] [ drop 0 ] branch ; /* n ilog == floor(log10(n)) */`,pf=`.import ./pred.ffp
.import ./arith.ffp
.import ./num.ffp
.import ./atan.ffp
.import ./sqrt.ffp
.import ./cbrt.ffp
.import ./gcd.ffp
.import ./ack.ffp
.import ./primes.ffp
.import ./log.ffp
`,mf=`.import ../core/core.ff

/* Logarithm and combinatorics */

!: dup [ dup -- ! * ] [ drop 1 ] branch ; /* n ! == n! */
nck: dup2 - ! swap ! * [ ! ] dip / ; /* n k nck == C(n,k) */

/* Knuth operators */

^^: -- dup [ [ dup ] swap times [ ^ ] ] dip times ;
^^^: -- dup [ [ dup ] swap times [ ^^ ] ] dip times ;
`,gf=`.import ../core/core.ff

/* Predicates */

negitive?: 0 < ; /* n negitive? == flag */
positive?: 0 > ; /* n positive? == flag */
divisor?: % zero? ; .inline /* n d divisor? == flag */
even?: 2 divisor? ; .inline /* n even? == flag */
odd?: even? not ; .inline /* n odd? == flag */
`,bf="15587954230498627325646588036564918192892371283113935445094991167813229303466801157946860041425838177050377883594427636470648042330825646958248056319938497154431999826688737043840805602729880659310844290085378753882277650578145603728678171835725570449109280896328328689861822982929560660054103265941406156761267139671461942835818679922821671936462455671088746135509655087146313381209283613235930521010586466087050834305171746033339139141661729818224514010980145683807076410306672083872992771020698004041097147119563960296762376538348811513460297529491630379008480512975237853831759556845620569297468298637648057682426805956209412099131821818485428512436928066559243340730394365118295921672312603744868975570772494109324343564688643806957806607543988613076163976026845353826879828129067268306531527618755571428160364699324091935641404039294204507850014492057795339085260723252043906242939086157234961545144680389093664242709788465713811477638784882744821750310736295087506275177891098608232261891890910012632512316473538639064458388347287203936676809688286855489771355347459841429254796753249932586706564718749946377061258606758638803055515592582609172615435626444279986383514378601263716120490614081345356149018248909315450035477470931874779305369336369414061371307656454268095552994449296952355036652505532189829489833476045881648403172566142253245200811323827225007572600131781268385340229107428584271763096942380661599607528941790898086277497210426320862753450944106292682466223514701449479584586692675229048684815810670160683505247848007969569147267689876566645629229637734697008503610875012199525174109340822138738472417497579832043454937051507253061123531299181536794655715417641924398634073954981015583774489006907282601064189008451477242245475557929570440954069123445152152591805785010354585214282301249426753613264539709513121270426906401651483593894743909997215163041538281655333265045062671234399647557518830113800138362612748016171740070083170390862452551124027791668958390978211325530096869224634340380433424402216732891085710454868334495556279305111671006450820155230988817678130623924787097199683419440354976966408131287555861845481308157545395465714671189337766296228849500832655258055661487769172053344738271290390321220691160847057270555914072637860058013061570677093345244429286636415734462766770996018129923053392001049657486887847233073459594301355653706003643570370193774229547630176100951519998259044359125572830355431642731856464873687220364014993986008990885865091369352580702773252697185641911513369040729632430404371109473548829503914991987421431386793288059927296664906912284492798247041870013823437634851587128077350653257995122910976870687966027797005142131559914479529859507076543815517367826007585070023536769066495598914705854257045765898733478305122211925114685142610836604222325587293494723567076440479783585371010434071468899768596247192074752440898102524004057018504953131381989664198069978552568756622999232288033204414576475174043834768054809821250780720636779033642024383286312784181888335059454767102142744310094187285312055237588145163877729967403160548099958991295903076543129075054214058358230356447136713034676304030993590246553910586422639311857550918672381428448360993950673652478972763079848174304269541298047726448058428681272715488755706137056917093454193621676953712809501956418349162384771204225100011981598748522574940144124960085014421705677461243863553023456894500882469787600798252747242243891861529924092592347494299413589970418456564923791844275148850595202084630708365840981094243754152336513477496706564089895011654046047241985586439824920122473839491937563648765179716035480644476162039823074104531462312538922504480438474196821884133866733626716451323898112627208519168063826110789302720572637365135966835311592754157773903323897324899819903356458447972814506337220392055917751375094634822608072983522381700510875341573503989886316311003900038566810299083341421294683931881849155437858791067733890910641366239419850771854596290831187943701105821612990987620725385203650126794333490204761347298897685717872361739369230243716670175473609924414020402324675585702735244901098383569904378027778258496807437947921090170712755700580635274308568327268234725921967658338719300511782709352234173511875307000778836907385960834267738379631737145639561658804736921802550569264265252041012629254168970381973595567924870273198521500967940813398641282596359969590494502399436109890605882942959604518552685358329579927390117650357337396107283754643869209320333570530528130401959550768648565636992081324179305852995540936841290477367713717294997798350528665012223298059537724399587028308123593104381077604791802085510396991871199616873244989837791106946780979096596417855536982773328124316600981960606635434521548638371298226643943908408370060093943396520665374886856123004387673988644896374719704728391900071790459856957997452921277867678854626592528976166048133362358401010643386613300860836409442134635750011591058572862097035498723431967839695835863613789817405596078577461642978151491204141453003412686924490820078035652762888085357225141543839421886022247386356642480226721166084951055461264445870991536090525288776373962161984061878218583771517663562505632131555156065949835040226969022714964385526372782175602593926890601798825892668660095998741715570575999940173992460775216286058668496586381547066510877952168480182966640869151974626443492009547373469331933361820322573764525290869696324483661490246143821443280952478247540288825782217376314327938379122333697506092863640243593913570671734754773366781361715219258922811584530053105600193199652493666408256725178523865660525470202772909762911448651396333612976744809178492415037740900450862030331833820619058315361182259262259139638426750524069038775713257005718425612746907173626953766709872697328945987828783438359631765066787222866037416543852340477871961770784271493770194025200311078703565837042012151743357312827886440165282136047079518030522880521254803082737386806208141321168704537070913673741467393283984369562692001447784749543591948284756997646783969780000949081216689437074932804275463033735433935938869267379817420070672585669351222668958582315860785545033771846115867073356851387338040196746986147393520315039510865981504195880252749393613320493401017366086377424550719828590779737175428084461683068027093420694478563001522057081178725514891139712023939302864344680570956281326881356491218783224230894983872272196095659354035961886750422740443321146156856146697989184908945751383264622404173980742436922035148988963971902703487103367156740698961054265399046691863240483901418990590871231333343836291434308150645189041167200849076829127740460646207890587224694205033236248716966923583937332001988302615455355119033048041675547125549122056679887371787563920114485792807505524245560649157375005113711706385972104522379582711800559636017654267151059497697124171913604396023288344520799002969157238616035968966604468803798557259045885787986486577566922214250951451244223617571703614391508999282917490502037575619614750269031504195515621410489445061103018915810844117118558784657174422508985893587265834062169280141143108596571760594969792029446279868710443374432162696654901123971145456956773540964221589256426423740666945896438044288253014923147235319491562788666526692948102296565573801846271901076462553211607979278621834452685810061707057429858486415598099539580406268491605716581150415742503197078127210984606173768581346799316975478692710238917143222685379863759230915664143453532934128895606153481852393683983306954336939522430265405249991372680779314146400088400010301388282341339613659234248159669202485752449034382892241007209554881754005593905919975791007395184275493882145186820869642643786280731726132323900292121877540986720267024828588530024639453538464251240023923331952863139643281149433155899255807729889691252736490522761583317577843117993557273046508777912794044154842951999496390130330986926379356159676601587612682467563593889251138601112570863107623150387649243758325844645118172812695619486497609004356876039305717721093984622734310808248423612055333520700916781050443030837718434682743737915321543523492202690669191840662587082577110791646722962148646121102383292237183285457225106972812770356781715314346123861142860550106027299644140663993007092567717469147285966465742173379883739237569529049529534337857203198309922452012677454748823535877430095634593319589968890769743122625308833671116035359332063782068134726372689062847759399329138472176376655211572122376038534936825388298217783747483079284423239091369208181377826812289781155457962926632860106882217722116643634656400306888553273706709093640236457753891314071739421740126604780516806016378776015974807920422414728141729505045176335966130878306102146590186021887456646467036284667723378792148216889948890726347554313781204330490631573923106378969017795113593070576444863405480334419303350308439859940757386940087241205922717681874597041574552960750314293899215514818591746254028069598563046833413978820126681706748730045478343365958559049637863504288792918735981837526994095622981177889947682395662429691375616734522185717451300145116683137709244382322916145376226763729472409394076404138096618669806058201162183837194079818903680178787206568189199470945017773483935277983220980746090488247282616960523075294387104572736726449486708939883684104083724379450583458005387479861541519395556546195605220243126046318184219479118406406200204379026644327736143809166486673036819143955016158669861119161369067397131592762781956401203419708655899219259492187515466717940699732568260696847800855996363284685371569045754323794160342999634054132032714183531112624356015706034362645421917047034201617680530795074924765343072190929667966412254152407154842049899973878378388881269764615261461319375466364886660810844759955338424349090465227532556717346735740599618169163456637807624141135163945255917867082195959537467819513817568564516234389091956736465515899699288754129534588051250631749509651392753154914091876496243717595502957408318878186668062291929701933560308816010134501773824281821620562089751340108594644022516456855655765239827293258696476782968920735513557510457566341678551584813343727702376132209776408110895772443256505766123255677500699191442026523288238752813117281117633282073650274904434952558911418629340628085803733469767779401692194204302493641097647137595000731808880741267064790173686862097596788759684174039136299138918745858613441024352821221227434997035166183911289978267835916360163649676844229293805535048206499321639942275991261960393743212399730559406729531004966141295847908136260522846685281348472103025909990571428687338841892248202899651217567594139517183164750463746805204110423052792125987694219355885452251114180416578595807463579394065162421961342792458843460108859572677642969994350678509214966049597965415572030969844858199297033640341040739406326359552005129468048468513772278277020485495772221309734243007721749523545991448308299932119323165798724388803123136238174725741896262353961653075802651841315430676526323390763591827414343438018877826787971964430742029954010259257799056677396903275410910004717552643444268312522747847079360140219440440435821028902698470653768600336944999638240367019962066057430344733296732038460339107513061405048199002845774032679172399433936374339405600769036106675360111925747791421477781693013997194012119398114979248399813073538644939495568868077722835775802695818395153201520889804348647294298290924576339655968984466183045804817304037136179610903380562319051895522476086583770902431298024376881111952712385617242142816574964809259688660330647304589634580321007186983285113226717212148460796603878704326329440916135780196624944728700768447355825937948850821185834321576855068815722637954738497818215203841224467121414232120089750535800209995260274737626847198904311248938362034460312165263327124398962049847245661011297085368907902995340430313802714035463175460689143357004937918184009905505823315797724125131744403883122119434024416433271984429044715109244932261772185114677184480945669021325439459099424423636530988111667703574618143405528035582842502845470265202892105556534980251172117506040988974130531616968912801665732754160373370542256705797627084985269704170717031435356490647672805851305538821876914254255585952005317114523397837880934758059974751125209657233902344465152857692876614530179448722022152047878773689598919303956890600827028864292757350925883851028302242006011515198255664540842671558864450175484646217869673907523890589203344305681781581154677946205210714829991745996979113841940528492875232986908268735252669864222684646937846913893705799007535643934205340377178052864542781067054647918581643964903225283122708644259384649301432867832791732888479487604128652837833100707721019438802016530222945997553534708947132268348471692463108394452762863884317536538644123231259331286015009013257554760342270722199444997674379945409173099196371257302018493091343286728355173457011073067037593678441257951290738918942588264530321712730811155614469626932171141259079705297664871511853298123050334578641619475215851356148786113550164699694354579313801430822586271645001033249259640015646682596309090555654184182873959414618564655439933631831769887523475139304631952062285134096680210747528908907513664383873227792450539119048068211140003052611119195216150966242290069381371531417890571432830713567410044308824144900366933470616489604001174470990653479841727380580073201430034268365007584241750770251202522701279393666763355333110639455882874561185199193083946540579897856750674905983491269516241202828178186290529512244052260673692754513578834698480885769399850980724909548339370816537985211674675229040883265725262382515799654706907899826343534771411270423704303111516109979682354793032342946087380374833074254167356287665453204395601987890870877597942570920499184864405145405479124813513474505371769074860599426678308063309724611309345005017322540913962029419774257573605755008005841936647530036496205547971722223988258023244952965418336817564772415949753562425193158436137392660006482953739090145803158769709392781229972247714976547927913311276814174701878027794772021003822893706437287420327622128670397825374492485060582813275729731289189509818797013662166251883008672333586217261397898960525224656322221918235405858687062231555930343670575259625119032985281858695580375450769221242553365617170631658616368641723481136858567559192624585569880262203559443190748959013416031757176114144766202473734411202070923272922139774414462688175110831969505145913404429973730856316783191625825808539426147892268800475621402562140777451075457830244709495432562332287273807687900180428942163556777766376333559797198190013219900058905962791464237081259073639639945354281460601420064211822698462341812553263020113831701378420332851290319171435495534709600715896202627227895136028081893800871243969907039859879617887038738220485267675215975892309505127658219161421585218541870962897341969676736495620860324635670925115574604570999159842596288783300948959487370658505845144189338562497346733489225269511075345901205427942376440332347112107008048275490993527776055568378712941464590586929087349875977938382435687288990143572918143872589134729365653232732901965390506360823467213426272360661004149072799847054697354639391389186623614172141255633403738939332864712663173793298589517009224571863570936947841081083575655627528971250851159717787415141341802515229434970790540809612919260627740442858888487300142923403355679920106191894075647691611565116380460418712019353981190905244097266141449116992735991106313947918391158719165051988059068853299595660983470525006642465831675632468566019982627866361806285414094247352264958444074729725982065037738921487549531132982919985336720138957249349143458882036891437934",yf=`.import ./pred.ffp

/* Test if value is a factor of 2 or 3 */
simple-composite?: [ 2 divisor? ] [ 3 divisor? ] or_else ;

_trial_loop: dup2 [ dup * > ] [ % 0 > ] bi2 and [ next-prime _trial_loop ] ? ;
_trial_by_division: 5 _trial_loop dup * < ;

/* First 10000 primes encoded as bits (/2) */
_N: 
.import ./primes-encoded.ff
; .unsafe

_M: 104729 ;  /* Largest prime encoded in primes-encoded.ff */

/* Lookup prime in encoded list */
_prime-lookup: _N swap 2 / >> 1 & ; .unsafe

/* invoke lookup or trial division test */
prime?: 
  dup simple-composite?
  [ [ 2 = ] [ 3 = ] or_else ]
  [ dup _M <= [ _prime-lookup ] [ _trial_by_division ] branch ]
  branch
;

_count_zero_bits: dup 1 & 0 = [ swap ++ swap 1 >> _count_zero_bits ] ? ;
count_zero_bits: 0 swap _count_zero_bits drop ;

/* Find next prime using lookup */
small-next-prime: 2 + dup 1 >> _N swap >> count_zero_bits 1 << + ;

_next-prime-by-trial: dup prime? not [ 2 + _next-prime-by-trial ] ? ;
next-prime-by-trial: dup 2 < [ drop 2 ] [ 1 + dup even? + _next-prime-by-trial ] branch ;

next-prime: 
  dup 2 < [ drop 2 ]
  [ dup _M < [ dup even? [ -- ] ? small-next-prime ] [ next-prime-by-trial ] branch ]
  branch ;

th-prime: 0 swap [ next-prime ] swap times ;
`,vf=`.import ../core/core.ff

/*
 * Naming note: the \`i\` prefix means integer.
 * \`isqrt\` returns floor(sqrt(n)) for n >= 0.
 * \`isqrtrem\` returns: n -> isqrt(n) (n - isqrt(n)^2).
 */

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

/* recursive digit-by-digit algorithm */
isqrt_recur:
  dup 1 > [ /* n if n < 2 */
    dup /* n n */
    2 >> isqrt_recur 1 << /* n 2*sqrt(n/4)+1 */
    dup ++ dup * /* n 2*sqrt(n/4) (2*sqrt(n/4)+1)^2 */
    dig /* 2*sqrt(n/4) (2*sqrt(n/4)+1)^2 n */
    <=
    [ ++ ] /* 2*sqrt(n/4)+1 */
    ? /* 2*sqrt(n/4) else */
  ] ?
;

isqrt:
  dup 0 < [ 1 0 / ] ? /* error */
  dup 1 > [
    isqrt_recur
  ] ? ;

isqrtrem: dup isqrt dup bury 2 ^ - ;
`,wf=`.import ./core/core.ff
.import ./math/math.ffp
.import ./string/string.ffp
.import ./seq/seq.ffp`,kf=`.import ../core/core.ff

unit: 0 cons ;
stack: depth 0 swap [cons] swap times ;
in: [stack] dip dip [stack] dip dip ;
pair: unit cons ;
compose: [ [eval] dip eval ] cons cons ;

_map: depth 2 > [ swap q< _map dup slip q> swap ] ? ;
map!: _map eval ;

reduce!: depth 2 - times ; /* a+ [B] reduce! == r */
head!: [drop] reduce! ; /* a+ head! == a */
tail!: q< clr q> ; /* .. a tail! == a */

_reduce_r: depth 3 > [ dup slip _reduce_r ] ? ;
reduce_r!: _reduce_r eval ; /* a+ [B] reduce_r! == r */
foldr!: pushtop reduce_r! ;  /* a* [B] z foldr! == r */
 
_reduce_l: depth 3 > [ swap q< _reduce_l dup slip q> swap ] ? ;
reduce_l!: _reduce_l eval ; /* a+ [B] reduce_l! == r */
foldl!: pushtop reduce_l! ; /* a* [B] z foldl! == r */

reverse!: depth 1 > [ q< reverse! q> pushtop ] ? ;

_filter: depth 2 > [ swap q< _filter over over eval not [nip] ? q> swap ] ? ;
filter!: _filter dupd eval not [drop] ? ; /* a* [B] filter! == a* */

map: [ map! ] cons compose in ;
first: [ head! ] compose in eval ;
last: [ tail! ] compose in eval ;
foldr: [ swap foldr! ] cons cons compose in eval ;
foldl: [ swap foldl! ] cons cons compose in eval ;
reverse: [ reverse! ] compose in ;
filter: [ filter! ] cons compose in ;

sum!: [+] reduce! ; /* .. sum! == n */
product!: [*] 1 reduce! ; /* .. product! == n */

sum: 0 [+] foldr ; /* [A] sum == n */
product: 1 [*] foldr ; /* [A] product == n */
length: 0 [ drop 1 + ] foldl ; /* [A] length == n */`,xf=`.import ../core/core.ff

/*
 * String library - character and string manipulation utilities.
 */

/* Character constants */

space: 32 ; /* space == 32 */
newline: 10 ; /* newline == 10 */

/* Character output */

sp: space putc ; /* sp == {prints char(32)} */
cr: newline putc ; /* cr == {prints char(10)} */

/* String output */

_prints: dup [ q< _prints q> putc ] ? ; /* 0 n* _prints == 0 {prints chars} */
prints: _prints drop ; /* 0 n* prints == {prints chars} */
println: prints cr ; /* 0 n* println == {prints chars, char(10)} */

/* Case conversion */

ucase?: dup 'a' -- 'z' ++ dig between? ; /* n ucase? == flag */
lcase?: dup 'A' -- 'Z' ++ dig between? ; /* n lcase? == flag */

ucase: ucase? [ 32 - ] ? ; /* n ucase == n' */
lcase: lcase? [ 32 + ] ? ; /* n lcase == n' */`,Sf=`.import ./core/core.ff
.import ./string/string.ffp

assert: falsey? [ 0 10 'Failed' println .inline 1 exit ] ? ;
assert_eq: = assert .inline ;
assert_false: not assert .inline ;

OK: 0 '\\sOK' println clr ;

¶: clr 999 ;`,H1=`.import ./lib/prelude.ffp

/* factorial */

fact: dup [ dup -- fact * ] [ drop 1 ] branch ;

100 fact .

/* 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000 */`,Af=`.import ./lib/prelude.ffp

/* FizzBuzz */
/* source https://rosettacode.org/wiki/FizzBuzz#the_unrolled_approach */

n: dup putn cr ++ ;
f: 0 'Fizz' println ++ ;
b: 0 'Buzz' println ++ ;
fb: 0 'FizzBuzz' println ++ ;
fb10: n n f n b f n n f b ;
fb15: fb10 n f n n fb ;
fb100: fb15 fb15 fb15 fb15 fb15 fb15 fb10 ;

1 fb100 drop`,Cf=`.import ./lib/prelude.ffp

/* 99 Bottles of Beer lyrics printer. */

bottles: dup putn 0 '\\sbottles' ;
beer: bottles '\\sof\\sbeer' ;
wall: beer '\\son\\sthe\\swall\\n' ;
take: 0 '\\nTake\\sone\\sdown,\\spass\\sit\\saround\\n' ;
verse: 
  wall prints
  beer prints
  --
  take prints
  wall prints
  cr ;
verses: verse dup [ verses ] ? ;

99 verses
`,Mf=`.import ./lib/prelude.ffp

/* Pascal's triangle */

ps: putn sp ;

line: dup 0 swap [ dup2 ++ q< q< nck ps q> q> ] seq nck ps cr ;

0 [ dup line ++ ] 16 times

`,Tf=`.import ./lib/math/cbrt.ffp

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
`,Ef=`.import ./lib/math/sqrt.ffp

/* Integer square root demo using \`isqrt\` and \`isqrtrem\`. */

/* Benchmarking
N: 1000 ; .inline

time: 
  clock
  swap N times
  [ drop ] N -- times
  swap clock swap -
;

[ 4 isqrt_newton ]
time . clr

[ 4 isqrt_recur ]
time . clr

[ 4 isqrt_jarvis ]
time . clr

[ 2025 isqrt_newton ]
time . clr

[ 2025 isqrt_recur ]
time . clr

[ 2025 isqrt_jarvis ]
time . clr

[ 125348 isqrt_newton ]
time . clr

[ 125348 isqrt_recur ]
time . clr

[ 125348 isqrt_jarvis ]
time . clr

0 exit */

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
`,Bf=`.import ./lib/math/gcd.ffp

/* Greatest common divisor and least common multiple demo. */

109876463 177777648  gcd . clr /* 1234567 */

109876463 177777648  lcm . clr /* 15822210672 */
`,Df=`.import ./lib/math/ack.ffp
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
`,Of=`.import ./lib/math/atan.ffp

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
  /* use n+guard directly with atan2 (10^N-scaled API) */
  guard-digits +

  dup 1 5 atan2
  swap 1 239 atan2

  swap 4 * swap -
  4 *

  guard-digits 10 swap ^ /
;

/* Change 50 to any N you want. */
50 pi-digits .
`,Pf=`.import ./lib/prelude.ffp

/* Fibonacci number: n fib -> F_n */

fib:
  dup 0 = not
  [ dup 1 = not
    [ -- dup fib swap -- fib + ] ?
  ] ? ;

20 fib .

/* 6765 */
`,Lf=`.import ./lib/prelude.ffp

/* Catalan number: n cat -> C_n */

cat: dup dup 2 * swap nck swap 1 + / ;

100 cat .  /* 896519947090131496687170070074100632420837521538745909320 */
`,Rf=`.import ./lib/prelude.ffp

/* Collatz sequence printer for a starting value, ending at 1. */

c: q< ++ q> ;

next: dup even? [ 2 / ] [ 3 * 1 + ] branch ;
collatz: c dup 1 > [ next . collatz ] ? ;

/* sequence A008884 */

0 27 .
collatz
`,If=`.import ./lib/prelude.ffp

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
`,Nf=`.import ../lib/prelude.ffp

/* Project Euler #1: sum multiples of 3 or 5 below 1000. */
/* http://projecteuler.net/index.php?section=problems&id=1 */

mod?: [ 3 divisor? ] [ 5 divisor? ] bi or ;

999 count [ mod? ] filter! sum! .

/* 233168 */
`,qf=`.import ../lib/prelude.ffp

/* Project Euler #7: find the 10001st prime. */
/* http://projecteuler.net/index.php?section=problems&id=7 */

10001 th-prime . /* 104743 */
`;function _f(i){const e="../../ff/lib/";if(!i.startsWith(e))throw new Error(`Unexpected library source path: ${i}`);return`/lib/${i.slice(e.length)}`}const W1=[{path:"/examples/fact.ffp",label:"fact.ffp",source:H1},{path:"/examples/fizzbuzz.ffp",label:"fizzbuzz.ffp",source:Af},{path:"/examples/99bottles.ffp",label:"99bottles.ffp",source:Cf},{path:"/examples/pascal.ffp",label:"pascal.ffp",source:Mf},{path:"/examples/cbrt.ffp",label:"cbrt.ffp",source:Tf},{path:"/examples/sqrt.ffp",label:"sqrt.ffp",source:Ef},{path:"/examples/gcd.ffp",label:"gcd.ffp",source:Bf},{path:"/examples/ack.ffp",label:"ack.ffp",source:Df},{path:"/examples/pi.ffp",label:"pi.ffp",source:Of},{path:"/examples/fib.ffp",label:"fib.ffp",source:Pf},{path:"/examples/catalan.ffp",label:"catalan.ffp",source:Lf},{path:"/examples/collatz.ffp",label:"collatz.ffp",source:Rf},{path:"/examples/hanoi.ffp",label:"hanoi.ffp",source:If},{path:"/examples/euler1.ffp",label:"euler1.ffp",source:Nf},{path:"/examples/euler7.ffp",label:"euler7.ffp",source:qf}],zf=Object.assign({"../../ff/lib/core/core.ff":of,"../../ff/lib/math/ack.ffp":lf,"../../ff/lib/math/arith.ffp":af,"../../ff/lib/math/atan.ffp":hf,"../../ff/lib/math/cbrt.ffp":cf,"../../ff/lib/math/encode-primes.ffp":ff,"../../ff/lib/math/gcd.ffp":uf,"../../ff/lib/math/log.ffp":df,"../../ff/lib/math/math.ffp":pf,"../../ff/lib/math/num.ffp":mf,"../../ff/lib/math/pred.ffp":gf,"../../ff/lib/math/primes-encoded.ff":bf,"../../ff/lib/math/primes.ffp":yf,"../../ff/lib/math/sqrt.ffp":vf,"../../ff/lib/prelude.ffp":wf,"../../ff/lib/seq/seq.ffp":kf,"../../ff/lib/string/string.ffp":xf,"../../ff/lib/testing.ffp":Sf}),Ff=Object.fromEntries(Object.entries(zf).map(([i,e])=>[_f(i),e])),V1=Object.fromEntries(W1.map(({path:i,source:e})=>[i,e])),Hf=W1.map(({path:i,label:e})=>`<option value="${i}">${e}</option>`).join(`
`),pl=H1;function $1(i,e="/main.ffp"){return{[e]:i,...Ff,...V1}}function Wf(){var e,t,n,s,r;return!!(((n=(t=(e=globalThis.Deno)==null?void 0:e.stdout)==null?void 0:t.isTerminal)==null?void 0:n.call(t))??((r=(s=globalThis.process)==null?void 0:s.stdout)==null?void 0:r.isTTY)??!1)}function Yr(i,e){return Wf()?`\x1B[${i}m${e}\x1B[0m`:e}function Vf(i){return Yr(34,i)}function $f(i){return Yr(32,i)}function Yt(i){return Yr(36,i)}const y={NOP:0,CALL:1,PUTC:2,GETC:3,PUTN:5,CLOCK:6,DROP:8,PUSHR:14,PULLR:15,SHIFTL:16,SHIFTR:17,CLR:24,RAND:26,EXIT:27,DUP:33,DEPTH:35,SWAP:36,MOD:37,AND:38,STASH:40,FETCH:41,MUL:42,ADD:43,CONS:44,SUB:45,PRN:46,DIV:47,RAT:92,MARK:58,DEF:59,LT:60,EQ:61,GT:62,IF:63,BRA:91,KET:93,POW:94,OR:124,NOT:126},vn={nop:y.NOP,eval:y.CALL,";":y.DEF,":":y.MARK,clr:y.CLR,rand:y.RAND,exit:y.EXIT,".":y.PRN,putc:y.PUTC,getc:y.GETC,putn:y.PUTN,clock:y.CLOCK,drop:y.DROP,swap:y.SWAP,dup:y.DUP,"<<":y.SHIFTL,">>":y.SHIFTR,"+":y.ADD,"-":y.SUB,cons:y.CONS,"*":y.MUL,"/":y.DIV,"<":y.LT,"=":y.EQ,">":y.GT,"?":y.IF,"%":y.MOD,"&":y.AND,"(":y.STASH,")":y.FETCH,"q<":y.PUSHR,"q>":y.PULLR,depth:y.DEPTH,"^":y.POW,"[":y.BRA,"]":y.KET,"|":y.OR,"~":y.NOT,"\\\\":y.RAT},tn=255,Uf=i=>i,Kf=i=>i,z={call:"call",push:"push"},jf=6,gr=10,Gf=new Map([[BigInt(y.MARK),":"],[BigInt(y.DEF),";"],[BigInt(y.BRA),"["],[BigInt(y.KET),"]"]]);function Xf(i){return(""+i.value).padEnd(gr," ")}function Jf(i,e){var t;return e?e.padEnd(gr," "):i.op===z.push&&((t=i.meta)!=null&&t.pointer)?`[${i.value}]`.padEnd(gr," "):Xf(i)}function Yf(i){return i.trim()?`/* ${i} */`:""}function Qf(i){var l,a,h;const e=((l=e0(i))==null?void 0:l.toUpperCase())||"",t=i.op===z.call?Gf.get(i.value):void 0,n=t!==void 0,s=Jf(i,t),r=((h=(a=i.meta)==null?void 0:a.comment)==null?void 0:h.trim())||(i.op===z.call&&!n?e:""),o=(i.op===z.call&&!t?"EVAL":"").padEnd(jf," ");return[Kf(s),Uf(o),Yf(r)].join(" ")}function Zf(i){for(const e in vn)if(vn[e]===i)return e;return""}function e0(i){var e,t;if(i.op===z.call||i.op===z.push&&((e=i.meta)!=null&&e.pointer))return((t=i.meta)==null?void 0:t.name)||Zf(Number(i.value))||""}function U1(i){return i.map(Qf).join(`
`)}function t0(i){const e=[];let t=0;for(;t<i.length;){const n=i[t++]??0n,s=i[t++]??0n;n===0n?e.push({op:z.push,value:s}):e.push({op:z.call,value:s})}return e}function n0(i){return i=i.replace(/\\U([A-Fa-f0-9]{8})/g,(e,t)=>ml(t)),i=i.replace(/\\u([A-Fa-f0-9]{4})/g,(e,t)=>ml(t)),i.replace(/\\0/g,"\0").replace(/\\b/g,"\b").replace(/\\t/g,"	").replace(/\\n/g,`
`).replace(/\\v/g,"\v").replace(/\\f/g,"\f").replace(/\\r/g,"\r").replace(/\\'/g,"'").replace(/\\"/g,'"').replace(/\\s/g," ").replace(/\\\\/g,"\\")}function ml(i){let e="",t=parseInt(i,16);return t<=65535?e+=String.fromCharCode(t):t<=1114111?(t-=65536,e+=String.fromCharCode(55296|t>>10)+String.fromCharCode(56320|t&1023)):e+=`hex2Char error: Code point out of range: ${i0(t)}`,e}function i0(i){return(i+0).toString(16).toUpperCase()}const K1="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",j1=new Map;K1.split("").forEach(function(i,e){j1.set(i,e)});const s0=5n,G1=1n<<s0,X1=Number(G1),J1=G1-1n;function r0(i){return i.map(h0).map(c0).join("")}function o0(i){return u0(f0(i)).map(d0)}function l0(i){return i>=0n?i<<1n:(-i<<1n)+1n}function a0(i){return i&1n?-(i>>1n):i>>1n}function h0(i){if(i===0n)return[0];i=l0(i);const e=[];for(;i>0;){let t=Number(i&J1);i>>=5n,i>0&&(t|=X1),e.push(t)}return e}function c0(i){return i.map(e=>K1[e]).join("")}function f0(i){return i.split("").map(e=>{const t=j1.get(e);if(t===void 0)throw new Error(`${i} is not a valid base64 encoded VLQ`);return t})}function u0(i){const e=[];let t=[];if(i.forEach(n=>{t.push(n),(n&X1)===0&&(e.push(t),t=[])}),t.length>0)throw new Error("Malformed VLQ sequence: The last VLQ never ended.");return e}function d0(i){const e=i.reverse().reduce((t,n)=>(t<<=5n,t|=BigInt(n)&J1,t),0n);return a0(e)}const p0="/*",m0="*/";function gl(i){try{let e=1n;return i=i.replaceAll("_",""),i.startsWith("-0")&&(e=-1n,i=i.replace("-","")),i.includes("e")||i.includes("E")?e*BigInt(+i):e*BigInt(i)}catch{return}}class Wt{constructor(e={}){this.symbols=new Map,this._nextCode=-1,this.host=e;let t;for(t in vn)this.symbols.set(t,BigInt(vn[t]))}static tokenize(e){return e.split(/\s+/).filter(Boolean).map(t=>{const n=gl(t);return n!==void 0?n:t})}static compileToBase64(e){const t=e.flatMap(n=>{if(n.op===z.call&&n.value===0n)return[];const s=n.value<<1n;return[n.op===z.push?s:s|1n]});return r0(t)}nextCode(){return BigInt(this._nextCode--)}getSymbol(e){e=e.toLowerCase();let t=this.symbols.get(e);return t===void 0&&(t=this.nextCode(),this.symbols.set(e,t)),t}compileToIR(e,t=""){var h,c,f;let n=0;const s=e.length;let r="";const o=[];for(;n<s;)if(r=e[n++],typeof r=="bigint")l(r);else if(r.length>1&&r.startsWith(".")){const[u]=r.split(" ");switch(u){case".push":o[o.length-1].op=z.push;break;case".call":o[o.length-1].op=z.call;break;case".inline":(h=o[o.length-1]).meta||(h.meta={}),o[o.length-1].meta.inline=!0;break;case".unsafe":(c=o[o.length-1]).meta||(c.meta={}),o[o.length-1].meta.unsafe=!0;break;case".pointer":(f=o[o.length-1]).meta||(f.meta={}),o[o.length-1].meta.pointer=!0;break;case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Compiler: .exit requires a host exit handler");case".symbols":this.symbols.forEach((d,p)=>{(this.host.log||console.log)(p,d)});break;case".words":{const d=Array.from(this.symbols,([p])=>p).join(" ");(this.host.log||console.log)(d);break}}}else if(r[0]==="'"&&r.length>1)n0(r).replace(/^'/,"").replace(/'$/,"").split("").forEach(u=>{l(u.charCodeAt(0),{comment:u})});else if(r.endsWith(":")&&r.length>1){const u=r.replace(/:$/,"");l(this.getSymbol(u),{name:`${u}`,pointer:!0}),a(y.MARK,{name:":"})}else if(r===p0){const u=[];for(;n<e.length&&(r=e[n++],r!==m0);)u.push(r);a(0n,{comment:u.join(" ")})}else if(r.startsWith("[")&&r.endsWith("]")){const u=r.replace(/^\[/,"").replace(/\]$/,""),d=gl(u);d!==void 0?l(d,{name:u,pointer:!0}):l(this.getSymbol(u),{name:u,pointer:!0})}else a(this.getSymbol(r),{name:r});return o;function l(u,d={}){o.push({value:BigInt(u),op:z.push,meta:{...d,filename:t}})}function a(u,d={}){o.push({value:BigInt(u),op:z.call,meta:{...d,filename:t}})}}validate(e){var r,o;const t=e.slice(),n=[];let s=0;for(;s<t.length;){const l=t[s];if(l.op===z.call&&l.value===BigInt(y.DEF)){let a=0;for(a=s;a>0&&!(t[a].op===z.call&&t[a].value===BigInt(y.MARK));a--);const h=t.splice(a-1,s-a+2);(o=(r=h.at(-1))==null?void 0:r.meta)!=null&&o.unsafe||n.push(...this.validateDef(h)),s=a-1}s++}return n.push(...this.validateDef(t,"main")),n}validateDef(e,t){var h,c,f;const n=[];let s=0,r=0,o=0,l=0;if(!e[0])return[];t=$f(t||((c=(h=e[0].meta)==null?void 0:h.name)==null?void 0:c.replace(/^&/,""))||"main");const a=Vf(((f=e[0].meta)==null?void 0:f.filename)||"-");for(;s<e.length;){const u=e[s];u.op===z.call&&(u.op===z.call&&u.value===BigInt(y.MARK)&&r++,u.op===z.call&&u.value===BigInt(y.DEF)&&r--,u.op===z.call&&u.value===BigInt(y.BRA)&&o++,u.op===z.call&&u.value===BigInt(y.KET)&&o--,u.op===z.call&&u.value===BigInt(y.PUSHR)&&l++,u.op===z.call&&u.value===BigInt(y.PULLR)&&l--,o<0&&n.push(`${a}: Bracket ( ${Yt("[ ]")} ) mismatch in ${t}`),l<0&&n.push(`${a}: Queue push ( ${Yt("q< q>")} ) mismatch in ${t}`),r<0&&n.push(`${a}: Definition ( ${Yt(": ;")} ) mismatch in ${t}`)),s++}return o!==0&&n.push(`${a}: Unbalanced brackets ( ${Yt("[ ]")} ) in ${t}`),l!==0&&n.push(`${a}: Unbalanced queue push ( ${Yt("q< q>")} ) in ${t}`),r!==0&&n.push(`${a}: Unbalanced definition ( ${Yt(": ;")} ) in ${t}`),n}}const g0=[{mnemonic:"NOP",syntax:"nop",stackEffect:"… nop == …",description:"No operation; does nothing.",opcode:0},{mnemonic:"EVAL",syntax:"eval",stackEffect:"[A] eval == a*",description:"Evaluates a quotation, executing its contents.",opcode:1},{mnemonic:"PUTC",syntax:"putc",stackEffect:"n putc == {prints char(n)}",description:"Prints a character given by its numeric code.",opcode:2},{mnemonic:"GETC",syntax:"getc",stackEffect:"getc == n {reads char}",description:"Reads a single character from input and pushes its code.",opcode:3},{mnemonic:"PUTN",syntax:"putn",stackEffect:"n putn == {prints n}",description:"Prints a number to output.",opcode:5},{mnemonic:"CLOCK",syntax:"clock",stackEffect:"clock == n {reads clock}",description:"Returns the current time as a Unix timestamp.",opcode:6},{mnemonic:"DROP",syntax:"drop",stackEffect:"a drop ==",description:"Removes the top value from the stack.",opcode:8},{mnemonic:"PUSHR",syntax:"q<",stackEffect:"a q< == | …a",description:"Pushes a value onto the return stack.",opcode:14},{mnemonic:"PULLR",syntax:"q>",stackEffect:"q> == a | a…",description:"Pops a value from the return stack onto the main stack.",opcode:15},{mnemonic:"SHIFTL",syntax:"<<",stackEffect:"a b << == n",description:"Left-shifts a by b bits.",opcode:16},{mnemonic:"SHIFTR",syntax:">>",stackEffect:"a b >> == n",description:"Right-shifts a by b bits.",opcode:17},{mnemonic:"CLR",syntax:"clr",stackEffect:"… clr ==",description:"Clears the entire stack.",opcode:24},{mnemonic:"RAND",syntax:"rand",stackEffect:"n rand == r {0 <= r < n}",description:"Generates a random number between 0 and n-1.",opcode:26},{mnemonic:"EXIT",syntax:"exit",stackEffect:"n exit == {exits with code n}",description:"Exits the program with the given exit code.",opcode:27},{mnemonic:"DUP",syntax:"dup",stackEffect:"a dup == a a",description:"Duplicates the top value on the stack.",opcode:33},{mnemonic:"DEPTH",syntax:"depth",stackEffect:"… depth == … n",description:"Pushes the current stack depth.",opcode:35},{mnemonic:"SWAP",syntax:"swap",stackEffect:"a b swap == b a",description:"Swaps the top two values on the stack.",opcode:36},{mnemonic:"MOD",syntax:"%",stackEffect:"a b % == n",description:"Computes the remainder of a divided by b.",opcode:37},{mnemonic:"AND",syntax:"&",stackEffect:"a b & == n",description:"Bitwise AND of a and b.",opcode:38},{mnemonic:"STASH",syntax:"(",stackEffect:"… ( == {moves stack to queue}",description:"Moves values from the stack to the queue.",opcode:40},{mnemonic:"FETCH",syntax:")",stackEffect:") == … {restores stack from queue}",description:"Moves values from the queue back to the stack.",opcode:41},{mnemonic:"MUL",syntax:"*",stackEffect:"a b * == n",description:"Multiplies a by b.",opcode:42},{mnemonic:"ADD",syntax:"+",stackEffect:"a b + == n",description:"Adds a and b together.",opcode:43},{mnemonic:"SUB",syntax:"-",stackEffect:"a b - == n",description:"Subtracts b from a.",opcode:45},{mnemonic:"DUMP",syntax:".",stackEffect:"… . == … {prints stack}",description:"Prints the entire stack to output.",opcode:46},{mnemonic:"DIV",syntax:"/",stackEffect:"a b / == n",description:"Divides a by b (integer division).",opcode:47},{mnemonic:"MARK",syntax:":",stackEffect:"n : == {begin definition(n)}",description:"Begins a new word definition with name n.",opcode:58},{mnemonic:"DEF",syntax:";",stackEffect:"; == {end definition}",description:"Ends the current word definition.",opcode:59},{mnemonic:"LT",syntax:"<",stackEffect:"a b < == flag",description:"Pushes true if a is less than b.",opcode:60},{mnemonic:"EQ",syntax:"=",stackEffect:"a b = == flag",description:"Pushes true if a equals b.",opcode:61},{mnemonic:"GT",syntax:">",stackEffect:"a b > == flag",description:"Pushes true if a is greater than b.",opcode:62},{mnemonic:"WHEN",syntax:"?",stackEffect:"flag [A] ? == a*",description:"Executes the quotation if flag is true.",opcode:63},{mnemonic:"BRA",syntax:"[",stackEffect:"[ == {begin quotation}",description:"Begins a quotation (anonymous code block).",opcode:91},{mnemonic:"KET",syntax:"]",stackEffect:"] == [A] {end quotation}",description:"Ends a quotation and pushes it to the stack.",opcode:93},{mnemonic:"POW",syntax:"^",stackEffect:"a b ^ == n",description:"Computes a raised to the power of b.",opcode:94},{mnemonic:"OR",syntax:"|",stackEffect:"a b | == n",description:"Bitwise OR of a and b.",opcode:124},{mnemonic:"NOT",syntax:"~",stackEffect:"a ~ == n'",description:"Bitwise NOT of a.",opcode:126}],b0={words:g0},Y1=new Map;for(const i of b0.words)Y1.set(i.opcode,i);function y0(i){return Y1.get(i)}const v0=[BigInt(y.DEF),BigInt(y.KET),BigInt(y.MARK),BigInt(y.BRA)],Qt=0n,Tn=1n;class Qr{constructor(e){this.stack=[],this.queue=[],this.defs=new Map,this.symbols=new Map,this.depth=0,this.nextAnonOp=tn+1,this.traceOn=!1,this.base=10,this.statsOn=!1,this.profileOn=!1,this.stats={system_instructions_called:0,user_instructions_called:0,max_stack_depth:0,max_queue_depth:0},this.profile={},this.platform=e,this.setup()}static fromBase64(e){return o0(e).flatMap(t=>{const n=t&1n,s=t>>1n;return[n,s]})}getStack(){return this.stack.slice()}peek(){const e=this.stack.length;if(e>0)return this.stack[e-1];throw new Error("Peek: stack underflow")}pop(){if(this.stack.length>0)return this.stack.pop();throw new Error("Pop: stack underflow")}push(e){this.stack.push(e)}poke(e){const t=this.stack.length;if(t>0){this.stack[t-1]=e;return}throw new Error("Poke: stack underflow")}clear(){this.stack.splice(0,this.stack.length)}queuePush(e,t){this.queue.push(e,t)}queueUnshift(e,t){this.queue.unshift(e,t)}queueShift(){return[this.queue.shift()??0n,this.queue.shift()??0n]}queuePop(){const e=this.queue.pop()??0n;return[this.queue.pop()??0n,e]}defineSystem(e,t){const n=BigInt(t),s=this.getName(n);if(this.defs.has(n))throw new Error(`Define: cannot redefine system word "${s}"`);this.defs.set(n,e)}defineUser(e,t){const n=this.getName(t);if(t>-1&&t<tn)throw new Error(`Define: cannot define system op "${n}"`);if(this.defs.has(t))throw t>tn?new Error(`Define: cannot redefine anon op "${n}"`):new Error(`Define: cannot redefine user op "${n}"`);this.defs.set(t,e)}callSystem(e){var s;const t=this.defs.get(e);if(typeof t=="function"){if(this.statsOn&&this.stats.system_instructions_called++,this.profileOn){const r=performance.now();t();const o=performance.now(),l=this.getName(e)||Number(e);(s=this.profile)[l]||(s[l]=[0,0]),this.profile[l][0]++,this.profile[l][1]!=0,this.profile[l][1]+=o-r;return}return t()}const n=this.getName(e)||e;throw new Error(`Call: undefined system op "${n}"`)}callUser(e){var s;const t=this.defs.get(e);if(Array.isArray(t)){if(this.statsOn&&this.stats.user_instructions_called++,this.queue.unshift(...t),this.profileOn){const r=this.getName(e,`&${e}`);(s=this.profile)[r]||(s[r]=[0,void 0]),this.profile[r][0]++}return}const n=this.getName(e)||e;throw new Error(`Call: undefined user op "${n}"`)}callOp(e){return e>-1n&&e<tn?this.callSystem(e):this.callUser(e)}loadBigIntCode(e){this.queue.push(...e)}loadIR(e){var n,s;let t=0;for(;t<e.length;){const r=e[t++];if(r.op===z.call){if(r.value===0n)continue;(n=r.meta)!=null&&n.name&&!this.symbols.has(r.value)&&this.symbols.set(r.value,(s=r.meta)==null?void 0:s.name),this.queuePush(Tn,r.value)}else this.queuePush(Qt,r.value)}return this.stack}run(){const e=this.queue;let t=!1;for(;e.length>0;){const[n,s]=this.queueShift(),r=n===Tn;t=!this.depth||r&&v0.includes(s),this.traceOn&&this.trace(n,s,t),r?t?this.callOp(s):(this.push(n),this.push(s)):(t||this.push(n),this.push(s)),this.statsOn&&(this.stats.max_stack_depth=Math.max(this.stats.max_stack_depth,this.stack.length),this.stats.max_queue_depth=Math.max(this.stats.max_queue_depth,e.length/2))}return this.stack}trace(e,t,n){let s=e===Tn?this.getName(t):String(t);n&&(s=`*${s}*`);const r=this.stack.map(String).join(" "),o=this.queue.map(String).join(" ");console.log(`[ ${r} ] ${s} [ ${o.slice(0,10)}...`)}getName(e,t=String(e)){return this.symbols.has(e)?this.symbols.get(e):String(t)}inspectValue(e){const t=this.symbols.get(e),n=e>=0n&&e<=BigInt(tn),s=this.defs.get(e),r=s!==void 0;let o;Array.isArray(s)&&(o=this.parseDefinitionTokens(s));let l,a;if(n){const h=y0(Number(e));h&&(l=h.stackEffect,a=h.description)}return{value:e,name:t,isSystem:n,isDefined:r,definition:o,stackEffect:l,description:a}}parseDefinitionTokens(e){const t=[];for(let n=0;n<e.length;n+=2){const s=e[n]??0n,r=e[n+1]??0n,o=s===Tn,l=o?this.symbols.get(r):void 0,a=this.defs.has(r);t.push({value:r,tag:s,name:l,isCall:o,isDefined:a})}return t}print(){const e=this.stack.map(t=>t.toString(this.base)).join(" ");this.platform.io.write(new TextEncoder().encode(`[ ${e} ]
`))}loadSourceMap(e){Object.keys(e.symbols).forEach(t=>{this.symbols.set(BigInt(t),e.symbols[t])})}getNextAnonOp(){let e=this.nextAnonOp++;for(;this.defs.has(BigInt(e));)e=this.nextAnonOp++;return BigInt(e)}setup(){const e=new TextEncoder;let t;for(t in vn)this.symbols.set(BigInt(vn[t]),t);this.defineSystem(()=>{},y.NOP),this.defineSystem(()=>{const n=this.pop();this.callOp(n)},y.CALL),this.defineSystem(()=>{this.depth--;const[,n]=this.queuePop(),s=this.stack.splice(Number(n||0))||[];this.defineUser(s,this.pop())},y.DEF),this.defineSystem(()=>{this.depth--;const[,n]=this.queuePop(),s=this.stack.splice(Number(n||0))||[],r=this.getNextAnonOp();this.defineUser(s,r),this.depth>0&&this.push(0n),this.push(r)},y.KET),this.defineSystem(()=>{this.depth++;const n=this.stack.length;this.queuePush(Qt,BigInt(n))},y.BRA),this.defineSystem(()=>{this.depth++;const n=this.stack.length;this.queuePush(Qt,BigInt(n))},y.MARK),this.defineSystem(()=>this.clear(),y.CLR),this.defineSystem(()=>{const n=this.pop();this.platform.exit(Number(n))},y.EXIT),this.defineSystem(()=>{const n=this.pop();this.push(w0(n))},y.RAND),this.defineSystem(()=>{this.print()},y.PRN),this.defineSystem(()=>{const n=this.pop(),s=this.pop();console.log(Number(s)/Number(n))},y.RAT),this.defineSystem(()=>{this.push(BigInt(this.platform.now()))},y.CLOCK),this.defineSystem(()=>{const n=e.encode(String.fromCharCode(Number(this.pop())));this.platform.io.write(n)},y.PUTC),this.defineSystem(()=>{this.platform.io.setRaw&&this.platform.io.setRaw(!0);const n=this.platform.io.readByte();this.platform.io.setRaw&&this.platform.io.setRaw(!1),this.push(BigInt(n??0))},y.GETC),this.defineSystem(()=>{const n=e.encode(this.pop().toString(this.base));this.platform.io.write(n)},y.PUTN),this.defineSystem(()=>{this.pop()},y.DROP),this.defineSystem(()=>{const n=this.peek(),s=this.stack[this.stack.length-2];this.stack[this.stack.length-2]=n,this.poke(s)},y.SWAP),this.defineSystem(()=>{this.push(this.peek())},y.DUP),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]+=n},y.ADD),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]-=n},y.SUB),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]*=n},y.MUL),this.defineSystem(()=>{const n=this.pop();if(n===0n)throw new Error("DIV: Division by zero");this.stack[this.stack.length-1]/=n},y.DIV),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]%=n},y.MOD),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]<<=n},y.SHIFTL),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]>>=n},y.SHIFTR),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]&=n},y.AND),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]**=n},y.POW),this.defineSystem(()=>{this.push(this.pop()>this.pop()?1n:0n)},y.LT),this.defineSystem(()=>{this.push(this.pop()===this.pop()?1n:0n)},y.EQ),this.defineSystem(()=>{this.push(this.pop()<this.pop()?1n:0n)},y.GT),this.defineSystem(()=>{const n=this.pop();this.pop()!==0n&&this.queueUnshift(Tn,n)},y.IF),this.defineSystem(()=>{this.queuePush(Qt,this.pop())},y.PUSHR),this.defineSystem(()=>{const[,n]=this.queuePop();this.push(n)},y.PULLR),this.defineSystem(()=>{this.push(BigInt(this.stack.length))},y.DEPTH),this.defineSystem(()=>{const n=this.stack.length;this.stack.splice(0,n).forEach(r=>this.queuePush(Qt,r)),this.queuePush(Qt,BigInt(n))},y.STASH),this.defineSystem(()=>{const[,n]=this.queuePop(),s=Number(n),r=[];for(let o=0;o<s;o++){const[,l]=this.queuePop();r.unshift(l)}this.stack.unshift(...r)},y.FETCH),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]|=n},y.OR),this.defineSystem(()=>{const n=this.pop();this.push(~n)},y.NOT),this.defineSystem(()=>{const n=this.pop(),r=[0n,this.pop(),1n,n],o=this.getNextAnonOp();this.defineUser(r,o),this.depth>0&&this.push(0n),this.push(o)},y.CONS)}printProfile(){console.log(),console.log("Profile:");const e=Object.keys(this.profile).map(s=>{const r=this.profile[s][0],o=this.profile[s][1];return{name:s,calls:r,time:o,system:typeof o<"u","ops/ms":o?Math.round(r/o):""}}).sort((s,r)=>r.calls-s.calls),t=e.filter(s=>s.system),n=e.filter(s=>!s.system);console.table(t,["name","calls","ops/ms"]),console.table(n,["name","calls"]),console.log()}printStats(){console.log(),console.log("Interpreter stats:"),console.log(this.stats),console.log()}}function w0(i){const e=i,t=e.toString().length;let n="";for(;n.length<t;)n+=Math.random().toString().split(".")[1];n=n.slice(0,t);const s="1"+"0".repeat(t);return e*BigInt(n)/BigInt(s)}const gi=BigInt(y.DEF),bl=BigInt(y.KET),bi=BigInt(y.MARK),yl=BigInt(y.BRA),$=i=>(i=BigInt(i),e=>e.op===z.call&&e.value===i),Zt=i=>(i=BigInt(i),e=>e.op===z.push&&e.value===i),Ee=i=>i.op===z.push,vl=i=>i.op===z.push&&i.value!==0n,k0=[{name:"No operation",pattern:[$(y.NOP)],replacement:()=>[]},{name:"Null Sequence - SWAP SWAP",pattern:[$(y.SWAP),$(y.SWAP)],replacement:()=>[]},{name:"Null Sequence - DUP DROP",pattern:[$(y.DUP),$(y.DROP)],replacement:()=>[]},{name:"Null Sequence - PUSHR PULLR",pattern:[$(y.PUSHR),$(y.PULLR)],replacement:()=>[]},{name:"Null Sequence - CLOCK DROP",pattern:[$(y.CLOCK),$(y.DROP)],replacement:()=>[]},{name:"Null Sequence - RAND DROP",pattern:[$(y.RAND),$(y.DROP)],replacement:()=>[]},{name:"Null Sequence - DEPTH DROP",pattern:[$(y.DEPTH),$(y.DROP)],replacement:()=>[]},{name:"Null Sequence - NOT NOT",pattern:[$(y.NOT),$(y.NOT)],replacement:()=>[]},{name:"Indirect calls - n EVAL",pattern:[Ee,$(y.CALL)],replacement:i=>{var e,t;return[{op:z.call,value:i.value,meta:{name:(t=(e=i.meta)==null?void 0:e.name)==null?void 0:t.replace(/^&/,"")}}]}},{name:"Null Sequence - n DROP",pattern:[Ee,$(y.DROP)],replacement:()=>[]},{name:"Constant Folding - a b ADD",pattern:[Ee,Ee,$(y.ADD)],replacement:(i,e)=>[{op:z.push,value:i.value+e.value}]},{name:"Algebraic Simplification - 0 ADD",pattern:[Zt(0),$(y.ADD)],replacement:()=>[]},{name:"Algebraic Simplification - swap ADD",pattern:[$(y.SWAP),$(y.ADD)],replacement:(i,e)=>[e]},{name:"Constant Folding - a b SUB",pattern:[Ee,Ee,$(y.SUB)],replacement:(i,e)=>[{op:z.push,value:i.value-e.value}]},{name:"Algebraic Simplification - 0 SUB",pattern:[Zt(0),$(y.SUB)],replacement:()=>[]},{name:"Constant Folding - a b MUL",pattern:[Ee,Ee,$(y.MUL)],replacement:(i,e)=>[{op:z.push,value:i.value*e.value}]},{name:"Algebraic Simplification - 1 MUL",pattern:[Zt(1),$(y.MUL)],replacement:()=>[]},{name:"Algebraic Simplification - swap MUL",pattern:[$(y.SWAP),$(y.MUL)],replacement:(i,e)=>[e]},{name:"Constant Folding - a b DIV",pattern:[Ee,vl,$(y.DIV)],replacement:(i,e)=>[{op:z.push,value:i.value/e.value}]},{name:"Algebraic Simplification - 1 DIV",pattern:[Zt(1),$(y.DIV)],replacement:()=>[]},{name:"Constant propagation - a DUP",pattern:[Ee,$(y.DUP)],replacement:i=>[i,i]},{name:"Unreachable Code - 0 &b IF",pattern:[Zt(0),Ee,$(y.IF)],replacement:()=>[]},{name:"Flows-Of-Control Optimizations - !0 &b IF",pattern:[vl,Ee,$(y.IF)],replacement:(i,e,t)=>{var n,s;return[{op:z.call,value:e.value,meta:{name:(s=(n=e.meta)==null?void 0:n.name)==null?void 0:s.replace(/^&/,"")}}]}},{name:"Null Sequence - 0 eval",pattern:[Zt(0),$(y.CALL)],replacement:()=>[]},{name:"Empty List - [ ]",pattern:[$(y.BRA),$(y.KET)],replacement:()=>[{op:z.push,value:0n,meta:{pointer:!0,name:"0"}}]},{name:"a q< b a> - b a",pattern:[Ee,$(y.PUSHR),Ee,$(y.PULLR)],replacement:(i,e,t)=>[t,i]}];class x0{constructor(){this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0},this.minOptPasses=2,this.maxOptPasses=20,this.defs=new Map,this.calledWords=new Set,this.optimized=[],this.nextAnonOp=tn+1}optimize(e){this.reset(),this.stats.pre_optimization_ir_size=e.length,this.optimized=e;let t;do t=this.optimized.length,this.optLoop();while((this.optimized.length<t||this.stats.optimization_passes<this.minOptPasses)&&this.stats.optimization_passes<this.maxOptPasses);return this.optimized=this.pullDefs(this.optimized),this.optimized=this.addReferencedWords(this.optimized),this.stats.post_optimization_ir_size=this.optimized.length,this.optimized}optLoop(){this.optimized=this.peepholeOptimization(this.optimized),this.optimized=this.getDefs(this.optimized),this.optimized=this.inlineWords(this.optimized,4),this.stats.optimization_passes++}reset(){this.optimized=[],this.defs=new Map,this.calledWords=new Set,this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0}}getDefs(e){var n;let t=0;for(;t<e.length;){const s=e[t];if(s.op===z.call){if(s.value===bl){this.stats.optimization_passes===0&&this.stats.user_defined_anon_defs++,s.meta??(s.meta={}),(n=s.meta).uid??(n.uid=this.nextAnonOp++);let r=t;for(;r-- >0;){const h=e[r];if(h.op===z.call&&h.value===yl)break}const o=BigInt(s.meta.uid),l={op:z.push,value:o,meta:{pointer:!0}},a=e.slice(r,t+1);a.unshift(l),a[1]={...a[1],value:bi,meta:{...a[1].meta,name:":"}},a[a.length-1]={...a[a.length-1],value:gi,meta:{...a[a.length-1].meta,name:";"}},this.defs.set(o,a)}else if(s.value===gi){this.stats.optimization_passes===0&&this.stats.user_defined_named_defs++;let r=t;for(;r-- >0;){const a=e[r];if(a.op===z.call&&a.value===bi)break}const o=e[r-1];o.meta||(o.meta={}),o.meta.pointer=!0;const l=e.slice(r-1,t+1);this.defs.set(o.value,l)}}t++}return e}pullDefs(e,t=!1){var r;const n=e.slice();let s=0;for(;s<n.length;){const o=n[s];if(o.op===z.call){if(o.value===bl){o.meta??(o.meta={}),(r=o.meta).uid??(r.uid=this.nextAnonOp++);const l=s;for(;s-- >0;){const f=n[s];if(f.op===z.call&&f.value===yl)break}const a=BigInt(o.meta.uid),h={op:z.push,value:a,meta:{pointer:!0}},c=n.splice(s,l-s+1,h);c.unshift(h),c[1]={...c[1],value:bi,meta:{...c[1].meta,name:":"}},c[c.length-1]={...c[c.length-1],value:gi,meta:{...c[c.length-1].meta,name:";"}},this.defs.set(a,c)}else if(o.value===gi&&!t){const l=s;for(;s-- >0;){const c=n[s];if(c.op===z.call&&c.value===bi)break}const a=n[s-1];a.meta||(a.meta={}),a.meta.pointer=!0;const h=n.splice(s-1,l-s+2);s=s-2,this.defs.set(h[0].value,h)}}s++}return n}peepholeOptimization(e){const t=e.slice();for(;;){const n=this.stats.peephole_optimizations;let s=0;for(;s<t.length;){for(const r of k0){const{pattern:o,replacement:l}=r;if(s+o.length>t.length)continue;if(o.every((h,c)=>h(t[s+c]))){this.stats.peephole_optimizations++;const h=t.slice(s,s+o.length);t.splice(s,o.length,...l(...h)),s=Math.max(0,s-o.length-1);break}}s++}if(this.stats.peephole_optimizations===n)break}return t}inlineWords(e,t=1,n=[]){return e.flatMap(s=>{var r,o,l,a;if((r=s.meta)!=null&&r.unsafe)return s;if(s.op===z.call&&this.defs.has(s.value)){if(n.includes(s.value))return s;const h=this.defs.get(s.value);if(!h)return s;const c=h[h.length-1];if((o=c.meta)!=null&&o.unsafe)return s;if((l=c.meta)!=null&&l.inline||(a=s.meta)!=null&&a.inline)return this.stats.inlined_calls++,this.inlineWords(h.slice(2,-1),1/0,n.concat(s.value));if(h.length<=t+3)return this.stats.inlined_calls++,this.inlineWords(h.slice(2,-1),t,n.concat(s.value))}return s})}addReferencedWords(e){return e.slice().forEach(t=>{var n;t.op===z.push&&((n=t.meta)!=null&&n.pointer)?this.addDef(t.value):t.op===z.call&&this.addDef(t.value)}),e}addDef(e){if(!this.calledWords.has(e)){const t=this.defs.get(e);if(t)return this.stats.post_optimization_user_defs++,this.calledWords.add(e),this.optimized.unshift(...t),this.addReferencedWords(t)}}}class wn{constructor(e,t){this.imported=new Set,this.host=e,this.engine=t.engine,this.compiler=t.compiler||new Wt}static tokenize(e){return e.split(/[\r\n]+/)}preprocess(e,t="-"){return e.map(n=>{if(n.length>1&&n[0]==="."){const[s,...r]=n.split(" ");if(s[0]==="."&&s.length>1){switch(s){case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Preprocessor: .exit requires a host exit handler");case".load":{const o=this.findFile(r.join(" "),t),l=this.host.readTextFile(o);return this.preprocess(wn.tokenize(l),o)}case".import":{const o=this.findFile(r.join(" "),t);if(!this.imported.has(o)){this.imported.add(o);const l=this.host.readTextFile(o);return this.preprocess(wn.tokenize(l),o)}return""}case".m":{const o=this.compiler.compileToIR(Wt.tokenize(r.join(" ")));this.engine.loadIR(o),this.engine.run();const l=this.engine.getStack();return this.engine.clear(),l.map(String).join(" ")+` /* ${n} */`}}return""}}return n}).join(`
`)}findFile(e,t="-"){if(t&&t!=="-"&&!this.host.path.isAbsolute(e)){const n=this.host.path.dirname(t),s=this.host.path.resolve(n,e);if(this.host.fileExists(s))return s}if(this.host.fileExists(e))return e;throw'File not found: "'+e+'"'}}function Fi(i){const e=i.startsWith("/"),t=i.split("/").filter(Boolean),n=[];for(const s of t)if(s!=="."){if(s===".."){n.pop();continue}n.push(s)}return`${e?"/":""}${n.join("/")}`||(e?"/":".")}function S0(i){const e=Fi(i),t=e.lastIndexOf("/");return t<=0?e.startsWith("/")?"/":".":e.slice(0,t)}function A0(...i){const e=i.filter(Boolean).join("/").replaceAll(/\/+/g,"/");return Fi(e)}function Q1(i){return{readTextFile(e){const t=Fi(e),n=i[t];if(typeof n!="string")throw new Error(`Virtual file not found: ${t}`);return n},fileExists(e){return typeof i[Fi(e)]=="string"},path:{isAbsolute(e){return e.startsWith("/")},dirname:S0,resolve:A0}}}function Z1(i={}){const e=new TextDecoder,t=new TextEncoder,n=Array.from(t.encode(i.stdin??""));return{io:{write(s){var r;(r=i.onWrite)==null||r.call(i,e.decode(s))},readByte(){return n.shift()??null}},exit(s){var r;(r=i.onExit)==null||r.call(i,s)},now(){return Date.now()}}}function C0(i,e){const t=console.log;console.log=(...n)=>{i(n.map(String).join(" "))};try{return e()}finally{console.log=t}}function eh(i,e,t){let n="";const s=[];let r=0;const o=Z1({stdin:e,onWrite(f){n+=f},onExit(f){r=f}}),l=new Wt,a=new Qr(o),h=$1(i),c=new wn(Q1(h),{engine:a,compiler:l});return C0(f=>s.push(f),()=>{const f=c.preprocess(wn.tokenize(i),"/main.ffp"),u=performance.now();let d=l.compileToIR(Wt.tokenize(f),"/main.ffp");const p=performance.now(),m=l.validate(d);t&&(d=new x0().optimize(d));const g=U1(d);a.loadIR(d);const b=performance.now();a.run();const x=performance.now();return{output:n,preprocessed:f,ir:g,bytecode:Wt.compileToBase64(d),issues:m,stack:a.getStack().map(String),logs:s,exitCode:r,compileMs:p-u,executeMs:x-b}})}function M0(i,e){const t=console.log;console.log=(...n)=>{i(n.map(String).join(" "))};try{return e()}finally{console.log=t}}class T0{constructor(){Jt(this,"compiler");Jt(this,"engine");Jt(this,"preprocessor");Jt(this,"files");Jt(this,"output","");this.reset()}reset(){this.output="",this.files=$1("","/repl.ffp");const e=Z1({onWrite:t=>{this.output+=t}});this.compiler=new Wt,this.engine=new Qr(e),this.preprocessor=new wn(Q1(this.files),{engine:this.engine,compiler:this.compiler}),this.execute(".load /lib/core.ff")}inspectValue(e){const t=BigInt(e);return this.engine.inspectValue(t)}createStackItems(){return this.engine.getStack().map((e,t)=>({value:String(e),index:t}))}execute(e){const t=e.trim(),n=[];return t?t===".reset"?(this.reset(),{output:"Session reset. Core library reloaded.",clearTranscript:!0,logs:n,stack:this.createStackItems()}):t===".clear"?{output:"Transcript cleared.",clearTranscript:!0,logs:n,stack:this.createStackItems()}:t===".exit"||t===".quit"?{output:"Browser REPL sessions stay open. Use .reset to clear state.",logs:n,stack:this.createStackItems()}:(this.files["/repl.ffp"]=e,this.output="",M0(s=>n.push(s),()=>{try{const s=this.preprocessor.preprocess([e],"/repl.ffp"),r=this.compiler.compileToIR(Wt.tokenize(s),"/repl.ffp");return this.engine.loadIR(r),this.engine.run(),{output:this.output,logs:n,stack:this.createStackItems()}}catch(s){return{output:this.output,logs:n,stack:this.createStackItems(),error:s instanceof Error?s.message:String(s)}}})):{output:"",logs:n,stack:this.createStackItems()}}}const E0=`<main class="shell">
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
    <button class="mode-tab mode-tab--playground is-active" data-tab="playground">Playground</button>
    <button class="mode-tab mode-tab--repl" data-tab="repl">REPL</button>
    <button class="mode-tab mode-tab--tutorial" data-tab="tutorial">Tutorial</button>
    <button class="mode-tab mode-tab--help" data-tab="help">Help</button>
  </nav>

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
            <span>Example</span>
            <select id="example">
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
            <button id="run" class="primary">Run Program</button>
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
        <div class="subtabs" aria-label="Program details">
          <button class="subtab is-active" data-detail-tab="output">Output</button>
          <button class="subtab" data-detail-tab="preprocessed">Expanded Source</button>
          <button class="subtab" data-detail-tab="ir">IR</button>
          <button class="subtab" data-detail-tab="bytecode">Bytecode</button>
        </div>
        <div class="detail-panels">
          <pre id="output" class="console detail-panel is-active" data-detail-panel="output"></pre>
          <pre id="error" class="console detail-panel is-active" data-detail-panel="output"></pre>
          <div id="preprocessed" class="code-block detail-panel" data-detail-panel="preprocessed"></div>
          <div id="ir" class="code-block detail-panel" data-detail-panel="ir"></div>
          <pre id="bytecode" class="code-block detail-panel" data-detail-panel="bytecode"></pre>
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
          <p>The REPL keeps your definitions and stack between lines. It preloads <code>/lib/core.ff</code>.</p>
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
        </div>
        <pre id="repl-output" class="console repl-console"></pre>
      </div>
    </section>
  </section>

  <section class="tab-panel" data-panel="tutorial">
    <div id="tutorial-root"></div>
  </section>

  <section class="tab-panel" data-panel="help">
    {{HELP_HTML}}
  </section>
</main>
`,B0=`<div class="help-grid">
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
      <pre class="code-block help-code">0 'Hello\\\\sWorld!\\\\n' prints

fact: dup 1 - [ dup 1 - fact * ] ? ;
20 fact putn 10 putc

[ dup * ] 12 swap eval putn</pre>
    </div>
  </section>
</div>
`,th=[{id:"square",order:1,title:"Square",goal:"Define `square` and print the square of one number.",concepts:["definitions","dup","*","putn","cr"],source:String.raw`.load /lib/prelude.ffp

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
`,expected:"1 5 10 10 5 1",note:"`nck` does the math for each entry; the recursion only controls left-to-right order."}];function kt(i){return i.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function bt(i,e){const t=i.querySelector(e);if(!t)throw new Error(`Missing required element: ${e}`);return t}function wl(i){return i.split(/(`[^`]+`)/g).map(e=>e.startsWith("`")&&e.endsWith("`")?`<code>${kt(e.slice(1,-1))}</code>`:kt(e)).join("")}function D0(i){const e=i.expected?`
      <div class="tutorial-guidance-block">
        <p class="tutorial-guidance-label">Expected result</p>
        <pre class="tutorial-guidance-value">${kt(i.expected)}</pre>
      </div>
    `:"",t=i.note?`
      <div class="tutorial-guidance-block">
        <p class="tutorial-guidance-label">Note</p>
        <p class="tutorial-note">${wl(i.note)}</p>
      </div>
    `:"",n=typeof i.stdin=="string"?`
      <label class="field tutorial-stdin-field">
        <span>stdin</span>
        <input data-role="stdin" type="text" value="${kt(i.stdin)}" />
      </label>
    `:"";return`
    <article class="panel tutorial-card" data-problem-id="${kt(i.id)}">
      <div class="tutorial-card-body">
        <div class="tutorial-card-header">
          <div>
            <p class="panel-label">Problem ${i.order}</p>
            <h2>${kt(i.title)}</h2>
          </div>
          <p class="tutorial-goal">${wl(i.goal)}</p>
        </div>

        <div class="tutorial-concepts" aria-label="Concepts">
          ${i.concepts.map(s=>`<span class="tutorial-concept">${kt(s)}</span>`).join("")}
        </div>

        <div class="tutorial-workbench">
          <div class="tutorial-editor-pane">
            <div class="tutorial-editor-shell">
              <div class="tutorial-editor" data-role="editor" aria-label="${kt(i.title)} source editor"></div>
            </div>

            <div class="tutorial-controls">
              ${n}
              <div class="actions tutorial-actions">
                <button type="button" data-role="run" class="primary">Run</button>
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
  `}function O0(){return`
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
        ${[...th].sort((e,t)=>e.order-t.order).map(e=>D0(e)).join("")}
      </section>
    </section>
  `}function P0(i){const e=i.issues.length===1?"1 compiler issue":`${i.issues.length} compiler issues`;return[`compile ${i.compileMs.toFixed(2)} ms`,`execute ${i.executeMs.toFixed(2)} ms`,`exit ${i.exitCode}`,i.issues.length?e:"no compiler issues"].join(" | ")}function L0(i){const e=[];return i.output&&e.push(i.output.trimEnd()),i.logs.length&&e.push(i.logs.join(`
`)),e.filter(Boolean).join(`
`)||"(no output)"}function R0(i){i.innerHTML=O0(),[...th].sort((t,n)=>t.order-n.order).forEach(t=>{const n=bt(i,`[data-problem-id="${t.id}"]`),s=bt(n,"[data-role='editor']"),r=bt(n,"[data-role='run']"),o=bt(n,"[data-role='reset']"),l=bt(n,"[data-role='summary']"),a=bt(n,"[data-role='output']"),h=bt(n,"[data-role='diagnostics']"),c=bt(n,"[data-role='error']"),f=n.querySelector("[data-role='stdin']"),u=F1(s,t.source);function d(){u.setValue(t.source),f&&typeof t.stdin=="string"&&(f.value=t.stdin),l.textContent="Ready to run.",a.textContent="Run the snippet to see output.",h.textContent="",h.hidden=!0,c.textContent="",c.hidden=!0}r.addEventListener("click",()=>{r.disabled=!0,o.disabled=!0,l.textContent="Running...",c.textContent="",c.hidden=!0;try{const p=eh(u.getValue(),(f==null?void 0:f.value)??"",!0);l.textContent=P0(p),a.textContent=L0(p),p.issues.length?(h.textContent=`Compiler issues:
${p.issues.join(`
`)}`,h.hidden=!1):(h.textContent="",h.hidden=!0)}catch(p){const m=p instanceof Error?p.message:String(p);l.textContent="Run failed.",a.textContent="",h.textContent="",h.hidden=!0,c.textContent=m,c.hidden=!1}finally{r.disabled=!1,o.disabled=!1}}),o.addEventListener("click",()=>{d()}),f&&typeof t.stdin!="string"&&(f.value="")})}var Se=Uint8Array,Ne=Uint16Array,Zr=Int32Array,ns=new Se([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),is=new Se([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),br=new Se([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),nh=function(i,e){for(var t=new Ne(31),n=0;n<31;++n)t[n]=e+=1<<i[n-1];for(var s=new Zr(t[30]),n=1;n<30;++n)for(var r=t[n];r<t[n+1];++r)s[r]=r-t[n]<<5|n;return{b:t,r:s}},ih=nh(ns,2),sh=ih.b,yr=ih.r;sh[28]=258,yr[258]=28;var rh=nh(is,0),I0=rh.b,kl=rh.r,vr=new Ne(32768);for(var oe=0;oe<32768;++oe){var yt=(oe&43690)>>1|(oe&21845)<<1;yt=(yt&52428)>>2|(yt&13107)<<2,yt=(yt&61680)>>4|(yt&3855)<<4,vr[oe]=((yt&65280)>>8|(yt&255)<<8)>>1}var ot=(function(i,e,t){for(var n=i.length,s=0,r=new Ne(e);s<n;++s)i[s]&&++r[i[s]-1];var o=new Ne(e);for(s=1;s<e;++s)o[s]=o[s-1]+r[s-1]<<1;var l;if(t){l=new Ne(1<<e);var a=15-e;for(s=0;s<n;++s)if(i[s])for(var h=s<<4|i[s],c=e-i[s],f=o[i[s]-1]++<<c,u=f|(1<<c)-1;f<=u;++f)l[vr[f]>>a]=h}else for(l=new Ne(n),s=0;s<n;++s)i[s]&&(l[s]=vr[o[i[s]-1]++]>>15-i[s]);return l}),Bt=new Se(288);for(var oe=0;oe<144;++oe)Bt[oe]=8;for(var oe=144;oe<256;++oe)Bt[oe]=9;for(var oe=256;oe<280;++oe)Bt[oe]=7;for(var oe=280;oe<288;++oe)Bt[oe]=8;var Xn=new Se(32);for(var oe=0;oe<32;++oe)Xn[oe]=5;var N0=ot(Bt,9,0),q0=ot(Bt,9,1),_0=ot(Xn,5,0),z0=ot(Xn,5,1),Cs=function(i){for(var e=i[0],t=1;t<i.length;++t)i[t]>e&&(e=i[t]);return e},Ve=function(i,e,t){var n=e/8|0;return(i[n]|i[n+1]<<8)>>(e&7)&t},Ms=function(i,e){var t=e/8|0;return(i[t]|i[t+1]<<8|i[t+2]<<16)>>(e&7)},eo=function(i){return(i+7)/8|0},oh=function(i,e,t){return(t==null||t>i.length)&&(t=i.length),new Se(i.subarray(e,t))},F0=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],ct=function(i,e,t){var n=new Error(e||F0[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,ct),!t)throw n;return n},H0=function(i,e,t,n){var s=i.length,r=0;if(!s||e.f&&!e.l)return t||new Se(0);var o=!t,l=o||e.i!=2,a=e.i;o&&(t=new Se(s*3));var h=function(Rt){var A=t.length;if(Rt>A){var O=new Se(Math.max(A*2,Rt));O.set(t),t=O}},c=e.f||0,f=e.p||0,u=e.b||0,d=e.l,p=e.d,m=e.m,g=e.n,b=s*8;do{if(!d){c=Ve(i,f,1);var x=Ve(i,f+1,3);if(f+=3,x)if(x==1)d=q0,p=z0,m=9,g=5;else if(x==2){var k=Ve(i,f,31)+257,v=Ve(i,f+10,15)+4,D=k+Ve(i,f+5,31)+1;f+=14;for(var M=new Se(D),_=new Se(19),P=0;P<v;++P)_[br[P]]=Ve(i,f+P*3,7);f+=v*3;for(var E=Cs(_),H=(1<<E)-1,N=ot(_,E,1),P=0;P<D;){var F=N[Ve(i,f,H)];f+=F&15;var C=F>>4;if(C<16)M[P++]=C;else{var U=0,V=0;for(C==16?(V=3+Ve(i,f,3),f+=2,U=M[P-1]):C==17?(V=3+Ve(i,f,7),f+=3):C==18&&(V=11+Ve(i,f,127),f+=7);V--;)M[P++]=U}}var te=M.subarray(0,k),W=M.subarray(k);m=Cs(te),g=Cs(W),d=ot(te,m,1),p=ot(W,g,1)}else ct(1);else{var C=eo(f)+4,R=i[C-4]|i[C-3]<<8,S=C+R;if(S>s){a&&ct(0);break}l&&h(u+R),t.set(i.subarray(C,S),u),e.b=u+=R,e.p=f=S*8,e.f=c;continue}if(f>b){a&&ct(0);break}}l&&h(u+131072);for(var ne=(1<<m)-1,Y=(1<<g)-1,ee=f;;ee=f){var U=d[Ms(i,f)&ne],Q=U>>4;if(f+=U&15,f>b){a&&ct(0);break}if(U||ct(2),Q<256)t[u++]=Q;else if(Q==256){ee=f,d=null;break}else{var j=Q-254;if(Q>264){var P=Q-257,G=ns[P];j=Ve(i,f,(1<<G)-1)+sh[P],f+=G}var me=p[Ms(i,f)&Y],Le=me>>4;me||ct(3),f+=me&15;var W=I0[Le];if(Le>3){var G=is[Le];W+=Ms(i,f)&(1<<G)-1,f+=G}if(f>b){a&&ct(0);break}l&&h(u+131072);var mt=u+j;if(u<W){var gt=r-W,Lt=Math.min(W,mt);for(gt+u<0&&ct(3);u<Lt;++u)t[u]=n[gt+u]}for(;u<mt;++u)t[u]=t[u-W]}}e.l=d,e.p=ee,e.b=u,e.f=c,d&&(c=1,e.m=m,e.d=p,e.n=g)}while(!c);return u!=t.length&&o?oh(t,0,u):t.subarray(0,u)},ht=function(i,e,t){t<<=e&7;var n=e/8|0;i[n]|=t,i[n+1]|=t>>8},En=function(i,e,t){t<<=e&7;var n=e/8|0;i[n]|=t,i[n+1]|=t>>8,i[n+2]|=t>>16},Ts=function(i,e){for(var t=[],n=0;n<i.length;++n)i[n]&&t.push({s:n,f:i[n]});var s=t.length,r=t.slice();if(!s)return{t:ah,l:0};if(s==1){var o=new Se(t[0].s+1);return o[t[0].s]=1,{t:o,l:1}}t.sort(function(S,k){return S.f-k.f}),t.push({s:-1,f:25001});var l=t[0],a=t[1],h=0,c=1,f=2;for(t[0]={s:-1,f:l.f+a.f,l,r:a};c!=s-1;)l=t[t[h].f<t[f].f?h++:f++],a=t[h!=c&&t[h].f<t[f].f?h++:f++],t[c++]={s:-1,f:l.f+a.f,l,r:a};for(var u=r[0].s,n=1;n<s;++n)r[n].s>u&&(u=r[n].s);var d=new Ne(u+1),p=wr(t[c-1],d,0);if(p>e){var n=0,m=0,g=p-e,b=1<<g;for(r.sort(function(k,v){return d[v.s]-d[k.s]||k.f-v.f});n<s;++n){var x=r[n].s;if(d[x]>e)m+=b-(1<<p-d[x]),d[x]=e;else break}for(m>>=g;m>0;){var C=r[n].s;d[C]<e?m-=1<<e-d[C]++-1:++n}for(;n>=0&&m;--n){var R=r[n].s;d[R]==e&&(--d[R],++m)}p=e}return{t:new Se(d),l:p}},wr=function(i,e,t){return i.s==-1?Math.max(wr(i.l,e,t+1),wr(i.r,e,t+1)):e[i.s]=t},xl=function(i){for(var e=i.length;e&&!i[--e];);for(var t=new Ne(++e),n=0,s=i[0],r=1,o=function(a){t[n++]=a},l=1;l<=e;++l)if(i[l]==s&&l!=e)++r;else{if(!s&&r>2){for(;r>138;r-=138)o(32754);r>2&&(o(r>10?r-11<<5|28690:r-3<<5|12305),r=0)}else if(r>3){for(o(s),--r;r>6;r-=6)o(8304);r>2&&(o(r-3<<5|8208),r=0)}for(;r--;)o(s);r=1,s=i[l]}return{c:t.subarray(0,n),n:e}},Bn=function(i,e){for(var t=0,n=0;n<e.length;++n)t+=i[n]*e[n];return t},lh=function(i,e,t){var n=t.length,s=eo(e+2);i[s]=n&255,i[s+1]=n>>8,i[s+2]=i[s]^255,i[s+3]=i[s+1]^255;for(var r=0;r<n;++r)i[s+r+4]=t[r];return(s+4+n)*8},Sl=function(i,e,t,n,s,r,o,l,a,h,c){ht(e,c++,t),++s[256];for(var f=Ts(s,15),u=f.t,d=f.l,p=Ts(r,15),m=p.t,g=p.l,b=xl(u),x=b.c,C=b.n,R=xl(m),S=R.c,k=R.n,v=new Ne(19),D=0;D<x.length;++D)++v[x[D]&31];for(var D=0;D<S.length;++D)++v[S[D]&31];for(var M=Ts(v,7),_=M.t,P=M.l,E=19;E>4&&!_[br[E-1]];--E);var H=h+5<<3,N=Bn(s,Bt)+Bn(r,Xn)+o,F=Bn(s,u)+Bn(r,m)+o+14+3*E+Bn(v,_)+2*v[16]+3*v[17]+7*v[18];if(a>=0&&H<=N&&H<=F)return lh(e,c,i.subarray(a,a+h));var U,V,te,W;if(ht(e,c,1+(F<N)),c+=2,F<N){U=ot(u,d,0),V=u,te=ot(m,g,0),W=m;var ne=ot(_,P,0);ht(e,c,C-257),ht(e,c+5,k-1),ht(e,c+10,E-4),c+=14;for(var D=0;D<E;++D)ht(e,c+3*D,_[br[D]]);c+=3*E;for(var Y=[x,S],ee=0;ee<2;++ee)for(var Q=Y[ee],D=0;D<Q.length;++D){var j=Q[D]&31;ht(e,c,ne[j]),c+=_[j],j>15&&(ht(e,c,Q[D]>>5&127),c+=Q[D]>>12)}}else U=N0,V=Bt,te=_0,W=Xn;for(var D=0;D<l;++D){var G=n[D];if(G>255){var j=G>>18&31;En(e,c,U[j+257]),c+=V[j+257],j>7&&(ht(e,c,G>>23&31),c+=ns[j]);var me=G&31;En(e,c,te[me]),c+=W[me],me>3&&(En(e,c,G>>5&8191),c+=is[me])}else En(e,c,U[G]),c+=V[G]}return En(e,c,U[256]),c+V[256]},W0=new Zr([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),ah=new Se(0),V0=function(i,e,t,n,s,r){var o=r.z||i.length,l=new Se(n+o+5*(1+Math.ceil(o/7e3))+s),a=l.subarray(n,l.length-s),h=r.l,c=(r.r||0)&7;if(e){c&&(a[0]=r.r>>3);for(var f=W0[e-1],u=f>>13,d=f&8191,p=(1<<t)-1,m=r.p||new Ne(32768),g=r.h||new Ne(p+1),b=Math.ceil(t/3),x=2*b,C=function(ie){return(i[ie]^i[ie+1]<<b^i[ie+2]<<x)&p},R=new Zr(25e3),S=new Ne(288),k=new Ne(32),v=0,D=0,M=r.i||0,_=0,P=r.w||0,E=0;M+2<o;++M){var H=C(M),N=M&32767,F=g[H];if(m[N]=F,g[H]=N,P<=M){var U=o-M;if((v>7e3||_>24576)&&(U>423||!h)){c=Sl(i,a,0,R,S,k,D,_,E,M-E,c),_=v=D=0,E=M;for(var V=0;V<286;++V)S[V]=0;for(var V=0;V<30;++V)k[V]=0}var te=2,W=0,ne=d,Y=N-F&32767;if(U>2&&H==C(M-Y))for(var ee=Math.min(u,U)-1,Q=Math.min(32767,M),j=Math.min(258,U);Y<=Q&&--ne&&N!=F;){if(i[M+te]==i[M+te-Y]){for(var G=0;G<j&&i[M+G]==i[M+G-Y];++G);if(G>te){if(te=G,W=Y,G>ee)break;for(var me=Math.min(Y,G-2),Le=0,V=0;V<me;++V){var mt=M-Y+V&32767,gt=m[mt],Lt=mt-gt&32767;Lt>Le&&(Le=Lt,F=mt)}}}N=F,F=m[N],Y+=N-F&32767}if(W){R[_++]=268435456|yr[te]<<18|kl[W];var Rt=yr[te]&31,A=kl[W]&31;D+=ns[Rt]+is[A],++S[257+Rt],++k[A],P=M+te,++v}else R[_++]=i[M],++S[i[M]]}}for(M=Math.max(M,P);M<o;++M)R[_++]=i[M],++S[i[M]];c=Sl(i,a,h,R,S,k,D,_,E,M-E,c),h||(r.r=c&7|a[c/8|0]<<3,c-=7,r.h=g,r.p=m,r.i=M,r.w=P)}else{for(var M=r.w||0;M<o+h;M+=65535){var O=M+65535;O>=o&&(a[c/8|0]=h,O=o),c=lh(a,c+1,i.subarray(M,O))}r.i=o}return oh(l,0,n+eo(c)+s)},$0=function(i,e,t,n,s){if(!s&&(s={l:1},e.dictionary)){var r=e.dictionary.subarray(-32768),o=new Se(r.length+i.length);o.set(r),o.set(i,r.length),i=o,s.w=r.length}return V0(i,e.level==null?6:e.level,e.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(i.length)))*1.5):20:12+e.mem,t,n,s)};function U0(i,e){return $0(i,e||{},0,0)}function K0(i,e){return H0(i,{i:2},e,e)}var j0=typeof TextDecoder<"u"&&new TextDecoder,G0=0;try{j0.decode(ah,{stream:!0}),G0=1}catch{}const hh=new TextEncoder,ch=new TextDecoder,kr="txt.",xr="b64.",Sr="c64.",Al="bc.",X0=45,J0=70;function Y0(i){for(let e=0;e<i.length;e+=1)if(i.charCodeAt(e)>127)return!1;return!0}function fh(i){let e="";for(const t of i)e+=String.fromCharCode(t);return btoa(e).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function uh(i){const e=i.replaceAll("-","+").replaceAll("_","/"),t=e.padEnd(Math.ceil(e.length/4)*4,"="),n=atob(t);return Uint8Array.from(n,s=>s.charCodeAt(0))}function Q0(i){return fh(hh.encode(i))}function Z0(i){return ch.decode(uh(i))}function eu(i){const e=U0(hh.encode(i),{level:9});return fh(e)}function tu(i){const e=uh(i);return ch.decode(K0(e))}function nu(i){return i.map(e=>e.op!==z.push?e:{...e,meta:{...e.meta,pointer:!0}})}function iu(i){const e=i.replaceAll(" ","+").replaceAll("-","+").replaceAll("_","/"),t=nu(t0(Qr.fromBase64(e)));return U1(t)}const su={encodeText(i){return`${kr}${i}`},encodeBase64(i){return`${xr}${Q0(i)}`},encodeCompressed(i){return`${Sr}${eu(i)}`}};function yi(i,e){try{return e(i)}catch{return null}}function ru(i,e){const t={...su,...e},n=Y0(i),s=n&&i.length<=X0,r=i.length>=J0;if(s)return yi(i,t.encodeText);if(r){const l=yi(i,t.encodeCompressed);if(l!==null)return l}const o=yi(i,t.encodeBase64);return o!==null?o:n?yi(i,t.encodeText):null}function ou(i){if(i===null)return null;if(i.startsWith(kr))return i.slice(kr.length);if(i.startsWith(xr)){const e=i.slice(xr.length);try{return Z0(e)}catch{return null}}if(i.startsWith(Sr)){const e=i.slice(Sr.length);try{return tu(e)}catch{return null}}if(i.startsWith(Al)){const e=i.slice(Al.length);try{return iu(e)}catch{return null}}return null}function qe(i){return i.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function ce(i,e){const t=i.querySelector(e);if(!t)throw new Error(`Missing required element: ${e}`);return t}function Dn(i){i.scrollTop=i.scrollHeight}function lu(){return E0.replace("{{EXAMPLE_OPTIONS}}",Hf).replace("{{HELP_HTML}}",B0)}function au(i){i.innerHTML=lu();const e=ce(i,"#source"),t=ce(i,"#stdin"),n=ce(i,"#optimize"),s=ce(i,"#example"),r=ce(i,"#run"),o=ce(i,"#summary"),l=ce(i,"#output"),a=ce(i,"#error"),h=ce(i,"#preprocessed"),c=ce(i,"#ir"),f=ce(i,"#bytecode"),u=ce(i,"#repl-command"),d=ce(i,"#repl-reset"),p=ce(i,"#repl-output"),m=ce(i,"#repl-stack"),g=ce(i,"#repl-depth"),b=ce(i,"#repl-inspect"),x=ce(i,"#repl-inspect-back"),C=ce(i,"#repl-inspect-close"),R=ce(i,"#repl-inspect-content"),S=ce(i,"#tutorial-root"),k=Array.from(i.querySelectorAll(".mode-tab")),v=Array.from(i.querySelectorAll(".tab-panel")),D=Array.from(i.querySelectorAll(".subtab")),M=Array.from(i.querySelectorAll(".detail-panel")),_=new URLSearchParams(window.location.search),P=ou(_.get("code")),E=F1(e,P??pl),H=dl(h,""),N=dl(c,"");function F(){const A=new URLSearchParams(window.location.search),O=E.getValue();if(O){const Xt=ru(O);if(Xt===null)return;A.set("code",Xt)}else A.delete("code");const ie=A.toString(),ye=`${window.location.pathname}${ie?`?${ie}`:""}${window.location.hash}`;window.history.replaceState(window.history.state,"",ye)}function U(A){document.body.dataset.mode=A,k.forEach(O=>{const ie=O.dataset.tab===A;O.classList.toggle("is-active",ie)}),v.forEach(O=>{const ie=O.dataset.panel===A;O.classList.toggle("is-active",ie)})}function V(A){D.forEach(O=>{const ie=O.dataset.detailTab===A;O.classList.toggle("is-active",ie)}),M.forEach(O=>{const ie=O.dataset.detailPanel===A;O.classList.toggle("is-active",ie)})}k.forEach(A=>{A.addEventListener("click",()=>{U(A.dataset.tab??"playground")})}),U("playground"),D.forEach(A=>{A.addEventListener("click",()=>{V(A.dataset.detailTab??"output")})});async function te(){document.body.dataset.ready="false";try{const A=eh(E.getValue(),t.value,n.checked),O=A.issues.length,ie=[];A.output&&ie.push(A.output.trimEnd()),A.logs.length&&ie.push(A.logs.join(`
`));const Xt=[ie.length?ie.join(`
`):"(no output)",O?`

${O} compiler issue(s):
${A.issues.join(`
`)}`:""].join("");o.innerHTML=`
        <span class="summary-bar-item">
          <span class="label">compile</span>
          <span class="value">${A.compileMs.toFixed(2)} ms</span>
        </span>
        <span class="summary-bar-item">
          <span class="label">execute</span>
          <span class="value">${A.executeMs.toFixed(2)} ms</span>
        </span>
        <span class="summary-bar-item">
          <span class="label">exit</span>
          <span class="value ${A.exitCode===0?"success":"error"}">${A.exitCode}</span>
        </span>
      `,l.innerHTML=qe(Xt),a.textContent="",H.setValue(A.preprocessed),N.setValue(A.ir),f.innerHTML=qe(A.bytecode),Dn(l)}catch(A){const O=A instanceof Error?A.message:String(A);o.innerHTML=`
        <span class="summary-bar-item">
          <span class="label">status</span>
          <span class="value error">failed</span>
        </span>
      `,l.innerHTML="",a.innerHTML=qe(O),H.setValue(""),N.setValue(""),f.innerHTML="",Dn(a)}finally{document.body.dataset.ready="true"}}const W=new T0,ne=["Core library loaded. Try defining words, evaluating quotes, or printing values."],Y=[];let ee=-1;const Q=[];let j=-1,G;function me(A){if(g.textContent=`depth: ${A.length}`,!A.length){m.innerHTML='<li class="repl-stack-empty">(empty stack)</li>',Dn(m);return}m.innerHTML=A.map(O=>`
          <li class="repl-stack-row" data-value="${qe(O.value)}">
            <span class="repl-stack-index">${O.index}:</span>
            <code class="repl-stack-value">${qe(O.value)}</code>
          </li>
        `).join(""),Dn(m)}function Le(){p.innerHTML=qe(ne.join(`

`)),Dn(p)}function mt(){const A=u.value,O=W.execute(A);O.clearTranscript&&ne.splice(0,ne.length),A.trim()&&(Y.push(A),ee=Y.length),ne.push(`ff> ${A}`),O.output.trim()&&ne.push(O.output.trimEnd()),O.logs.length&&ne.push(O.logs.join(`
`)),O.error&&(ne.push(`Error: ${O.error}`),m.classList.add("is-error"),G!==void 0&&window.clearTimeout(G),G=window.setTimeout(()=>{m.classList.remove("is-error")},500)),ne.push(`[ ${O.stack.map(ie=>ie.value).join(" ")} ]`),me(O.stack),Le(),u.value="",u.focus()}function gt(A){if(A===null){b.classList.remove("is-visible");return}const O=[],ie=j>0;if(O.push('<div class="inspect-header">'),O.push(`<code class="inspect-value">${qe(String(A.value))}</code>`),A.name&&O.push(`<span class="inspect-name-label">KNOWN AS:</span><span class="inspect-name-value">${qe(A.name)}</span>`),A.isSystem)O.push('<span class="inspect-tag system">system</span>');else if(A.isDefined){const ye=!A.name&&A.value>255n;O.push(`<span class="inspect-tag ${ye?"quote":"user"}">${ye?"quote":"user-defined"}</span>`)}if(O.push("</div>"),A.isSystem&&(A.stackEffect||A.description)&&(O.push('<div class="inspect-vocabulary">'),A.stackEffect&&O.push(`<div class="inspect-stack-effect"><code>${qe(A.stackEffect)}</code></div>`),A.description&&O.push(`<div class="inspect-description">${qe(A.description)}</div>`),O.push("</div>")),A.definition&&A.definition.length>0){O.push('<div class="inspect-label">Definition:</div>'),O.push('<div class="inspect-definition">');for(const ye of A.definition){const Xt=ye.name??String(ye.value),ph=ye.isCall?"token-call":"token-literal",mh=ye.isCall||ye.isDefined?"inspectable":"",gh=ye.isCall||ye.isDefined?"Click to inspect":"Literal value";O.push(`<span class="inspect-token ${ph} ${mh}" data-value="${qe(String(ye.value))}" title="${gh}">${qe(Xt)}</span>`)}O.push("</div>")}else!A.isSystem&&!A.isDefined&&O.push('<div class="inspect-note">Plain value (not a word)</div>');R.innerHTML=O.join(""),x.disabled=!ie,C.style.display="inline-block",b.classList.add("is-visible")}function Lt(A){j<Q.length-1&&Q.splice(j+1),Q.push(A),j++,gt(A)}function Rt(){j>0?(j--,gt(Q[j])):j===0&&(Q.length=0,j=-1,gt(null))}s.addEventListener("change",()=>{E.setValue(V1[s.value]??pl),F(),te()}),r.addEventListener("click",()=>{F(),te()}),n.addEventListener("change",()=>{F(),te()}),u.addEventListener("keydown",A=>{if(A.key==="Enter"){A.preventDefault(),mt();return}if(A.key==="ArrowUp"){if(A.preventDefault(),!Y.length)return;ee=Math.max(0,ee-1),u.value=Y[ee]??"",u.setSelectionRange(u.value.length,u.value.length);return}if(A.key==="ArrowDown"){if(A.preventDefault(),!Y.length)return;ee=Math.min(Y.length,ee+1),u.value=Y[ee]??"",u.setSelectionRange(u.value.length,u.value.length)}}),d.addEventListener("click",()=>{W.reset(),ne.splice(0,ne.length,"Session reset. Core library reloaded."),Y.splice(0,Y.length),ee=0,me([]),Le(),u.value="",u.focus()}),m.addEventListener("click",A=>{const O=A.target.closest(".repl-stack-row");if(!O)return;const ie=O.getAttribute("data-value");if(!ie)return;const ye=W.inspectValue(ie);Q.length=0,j=-1,Lt(ye)}),R.addEventListener("click",A=>{const O=A.target.closest(".inspect-token.inspectable");if(!O)return;const ie=O.getAttribute("data-value");if(!ie)return;const ye=W.inspectValue(ie);Lt(ye)}),x.addEventListener("click",()=>{Rt()}),C.addEventListener("click",()=>{Q.length=0,j=-1,b.classList.remove("is-visible")}),te(),R0(S),me([]),Le(),u.focus()}const dh=document.querySelector("#app");if(!dh)throw new Error("Missing #app root");au(dh);
