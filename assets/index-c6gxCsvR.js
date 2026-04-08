var Ru=Object.defineProperty;var Iu=(i,e,t)=>e in i?Ru(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var pt=(i,e,t)=>Iu(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();let dr=[],La=[];(()=>{let i="lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map(e=>e?parseInt(e,36):1);for(let e=0,t=0;e<i.length;e++)(e%2?La:dr).push(t=t+i[e])})();function zu(i){if(i<768)return!1;for(let e=0,t=dr.length;;){let n=e+t>>1;if(i<dr[n])t=n;else if(i>=La[n])e=n+1;else return!0;if(e==t)return!1}}function tl(i){return i>=127462&&i<=127487}const nl=8205;function qu(i,e,t=!0,n=!0){return(t?Ra:Nu)(i,e,n)}function Ra(i,e,t){if(e==i.length)return e;e&&Ia(i.charCodeAt(e))&&za(i.charCodeAt(e-1))&&e--;let n=qs(i,e);for(e+=il(n);e<i.length;){let s=qs(i,e);if(n==nl||s==nl||t&&zu(s))e+=il(s),n=s;else if(tl(s)){let r=0,o=e-2;for(;o>=0&&tl(qs(i,o));)r++,o-=2;if(r%2==0)break;e+=2}else break}return e}function Nu(i,e,t){for(;e>0;){let n=Ra(i,e-2,t);if(n<e)return n;e--}return 0}function qs(i,e){let t=i.charCodeAt(e);if(!za(t)||e+1==i.length)return t;let n=i.charCodeAt(e+1);return Ia(n)?(t-55296<<10)+(n-56320)+65536:t}function Ia(i){return i>=56320&&i<57344}function za(i){return i>=55296&&i<56320}function il(i){return i<65536?1:2}class ee{lineAt(e){if(e<0||e>this.length)throw new RangeError(`Invalid position ${e} in document of length ${this.length}`);return this.lineInner(e,!1,1,0)}line(e){if(e<1||e>this.lines)throw new RangeError(`Invalid line number ${e} in ${this.lines}-line document`);return this.lineInner(e,!0,1,0)}replace(e,t,n){[e,t]=Tn(this,e,t);let s=[];return this.decompose(0,e,s,2),n.length&&n.decompose(0,n.length,s,3),this.decompose(t,this.length,s,1),vt.from(s,this.length-(t-e)+n.length)}append(e){return this.replace(this.length,this.length,e)}slice(e,t=this.length){[e,t]=Tn(this,e,t);let n=[];return this.decompose(e,t,n,0),vt.from(n,t-e)}eq(e){if(e==this)return!0;if(e.length!=this.length||e.lines!=this.lines)return!1;let t=this.scanIdentical(e,1),n=this.length-this.scanIdentical(e,-1),s=new Zn(this),r=new Zn(e);for(let o=t,l=t;;){if(s.next(o),r.next(o),o=0,s.lineBreak!=r.lineBreak||s.done!=r.done||s.value!=r.value)return!1;if(l+=s.value.length,s.done||l>=n)return!0}}iter(e=1){return new Zn(this,e)}iterRange(e,t=this.length){return new qa(this,e,t)}iterLines(e,t){let n;if(e==null)n=this.iter();else{t==null&&(t=this.lines+1);let s=this.line(e).from;n=this.iterRange(s,Math.max(s,t==this.lines+1?this.length:t<=1?0:this.line(t-1).to))}return new Na(n)}toString(){return this.sliceString(0)}toJSON(){let e=[];return this.flatten(e),e}constructor(){}static of(e){if(e.length==0)throw new RangeError("A document must have at least one line");return e.length==1&&!e[0]?ee.empty:e.length<=32?new me(e):vt.from(me.split(e,[]))}}class me extends ee{constructor(e,t=Fu(e)){super(),this.text=e,this.length=t}get lines(){return this.text.length}get children(){return null}lineInner(e,t,n,s){for(let r=0;;r++){let o=this.text[r],l=s+o.length;if((t?n:l)>=e)return new Hu(s,l,n,o);s=l+1,n++}}decompose(e,t,n,s){let r=e<=0&&t>=this.length?this:new me(sl(this.text,e,t),Math.min(t,this.length)-Math.max(0,e));if(s&1){let o=n.pop(),l=Ui(r.text,o.text.slice(),0,r.length);if(l.length<=32)n.push(new me(l,o.length+r.length));else{let a=l.length>>1;n.push(new me(l.slice(0,a)),new me(l.slice(a)))}}else n.push(r)}replace(e,t,n){if(!(n instanceof me))return super.replace(e,t,n);[e,t]=Tn(this,e,t);let s=Ui(this.text,Ui(n.text,sl(this.text,0,e)),t),r=this.length+n.length-(t-e);return s.length<=32?new me(s,r):vt.from(me.split(s,[]),r)}sliceString(e,t=this.length,n=`
`){[e,t]=Tn(this,e,t);let s="";for(let r=0,o=0;r<=t&&o<this.text.length;o++){let l=this.text[o],a=r+l.length;r>e&&o&&(s+=n),e<a&&t>r&&(s+=l.slice(Math.max(0,e-r),t-r)),r=a+1}return s}flatten(e){for(let t of this.text)e.push(t)}scanIdentical(){return 0}static split(e,t){let n=[],s=-1;for(let r of e)n.push(r),s+=r.length+1,n.length==32&&(t.push(new me(n,s)),n=[],s=-1);return s>-1&&t.push(new me(n,s)),t}}class vt extends ee{constructor(e,t){super(),this.children=e,this.length=t,this.lines=0;for(let n of e)this.lines+=n.lines}lineInner(e,t,n,s){for(let r=0;;r++){let o=this.children[r],l=s+o.length,a=n+o.lines-1;if((t?a:l)>=e)return o.lineInner(e,t,n,s);s=l+1,n=a+1}}decompose(e,t,n,s){for(let r=0,o=0;o<=t&&r<this.children.length;r++){let l=this.children[r],a=o+l.length;if(e<=a&&t>=o){let c=s&((o<=e?1:0)|(a>=t?2:0));o>=e&&a<=t&&!c?n.push(l):l.decompose(e-o,t-o,n,c)}o=a+1}}replace(e,t,n){if([e,t]=Tn(this,e,t),n.lines<this.lines)for(let s=0,r=0;s<this.children.length;s++){let o=this.children[s],l=r+o.length;if(e>=r&&t<=l){let a=o.replace(e-r,t-r,n),c=this.lines-o.lines+a.lines;if(a.lines<c>>4&&a.lines>c>>6){let h=this.children.slice();return h[s]=a,new vt(h,this.length-(t-e)+n.length)}return super.replace(r,l,a)}r=l+1}return super.replace(e,t,n)}sliceString(e,t=this.length,n=`
`){[e,t]=Tn(this,e,t);let s="";for(let r=0,o=0;r<this.children.length&&o<=t;r++){let l=this.children[r],a=o+l.length;o>e&&r&&(s+=n),e<a&&t>o&&(s+=l.sliceString(e-o,t-o,n)),o=a+1}return s}flatten(e){for(let t of this.children)t.flatten(e)}scanIdentical(e,t){if(!(e instanceof vt))return 0;let n=0,[s,r,o,l]=t>0?[0,0,this.children.length,e.children.length]:[this.children.length-1,e.children.length-1,-1,-1];for(;;s+=t,r+=t){if(s==o||r==l)return n;let a=this.children[s],c=e.children[r];if(a!=c)return n+a.scanIdentical(c,t);n+=a.length+1}}static from(e,t=e.reduce((n,s)=>n+s.length+1,-1)){let n=0;for(let f of e)n+=f.lines;if(n<32){let f=[];for(let p of e)p.flatten(f);return new me(f,t)}let s=Math.max(32,n>>5),r=s<<1,o=s>>1,l=[],a=0,c=-1,h=[];function u(f){let p;if(f.lines>r&&f instanceof vt)for(let m of f.children)u(m);else f.lines>o&&(a>o||!a)?(d(),l.push(f)):f instanceof me&&a&&(p=h[h.length-1])instanceof me&&f.lines+p.lines<=32?(a+=f.lines,c+=f.length+1,h[h.length-1]=new me(p.text.concat(f.text),p.length+1+f.length)):(a+f.lines>s&&d(),a+=f.lines,c+=f.length+1,h.push(f))}function d(){a!=0&&(l.push(h.length==1?h[0]:vt.from(h,c)),c=-1,a=h.length=0)}for(let f of e)u(f);return d(),l.length==1?l[0]:new vt(l,t)}}ee.empty=new me([""],0);function Fu(i){let e=-1;for(let t of i)e+=t.length+1;return e}function Ui(i,e,t=0,n=1e9){for(let s=0,r=0,o=!0;r<i.length&&s<=n;r++){let l=i[r],a=s+l.length;a>=t&&(a>n&&(l=l.slice(0,n-s)),s<t&&(l=l.slice(t-s)),o?(e[e.length-1]+=l,o=!1):e.push(l)),s=a+1}return e}function sl(i,e,t){return Ui(i,[""],e,t)}class Zn{constructor(e,t=1){this.dir=t,this.done=!1,this.lineBreak=!1,this.value="",this.nodes=[e],this.offsets=[t>0?1:(e instanceof me?e.text.length:e.children.length)<<1]}nextInner(e,t){for(this.done=this.lineBreak=!1;;){let n=this.nodes.length-1,s=this.nodes[n],r=this.offsets[n],o=r>>1,l=s instanceof me?s.text.length:s.children.length;if(o==(t>0?l:0)){if(n==0)return this.done=!0,this.value="",this;t>0&&this.offsets[n-1]++,this.nodes.pop(),this.offsets.pop()}else if((r&1)==(t>0?0:1)){if(this.offsets[n]+=t,e==0)return this.lineBreak=!0,this.value=`
`,this;e--}else if(s instanceof me){let a=s.text[o+(t<0?-1:0)];if(this.offsets[n]+=t,a.length>Math.max(0,e))return this.value=e==0?a:t>0?a.slice(e):a.slice(0,a.length-e),this;e-=a.length}else{let a=s.children[o+(t<0?-1:0)];e>a.length?(e-=a.length,this.offsets[n]+=t):(t<0&&this.offsets[n]--,this.nodes.push(a),this.offsets.push(t>0?1:(a instanceof me?a.text.length:a.children.length)<<1))}}}next(e=0){return e<0&&(this.nextInner(-e,-this.dir),e=this.value.length),this.nextInner(e,this.dir)}}class qa{constructor(e,t,n){this.value="",this.done=!1,this.cursor=new Zn(e,t>n?-1:1),this.pos=t>n?e.length:0,this.from=Math.min(t,n),this.to=Math.max(t,n)}nextInner(e,t){if(t<0?this.pos<=this.from:this.pos>=this.to)return this.value="",this.done=!0,this;e+=Math.max(0,t<0?this.pos-this.to:this.from-this.pos);let n=t<0?this.pos-this.from:this.to-this.pos;e>n&&(e=n),n-=e;let{value:s}=this.cursor.next(e);return this.pos+=(s.length+e)*t,this.value=s.length<=n?s:t<0?s.slice(s.length-n):s.slice(0,n),this.done=!this.value,this}next(e=0){return e<0?e=Math.max(e,this.from-this.pos):e>0&&(e=Math.min(e,this.to-this.pos)),this.nextInner(e,this.cursor.dir)}get lineBreak(){return this.cursor.lineBreak&&this.value!=""}}class Na{constructor(e){this.inner=e,this.afterBreak=!0,this.value="",this.done=!1}next(e=0){let{done:t,lineBreak:n,value:s}=this.inner.next(e);return t&&this.afterBreak?(this.value="",this.afterBreak=!1):t?(this.done=!0,this.value=""):n?this.afterBreak?this.value="":(this.afterBreak=!0,this.next()):(this.value=s,this.afterBreak=!1),this}get lineBreak(){return!1}}typeof Symbol<"u"&&(ee.prototype[Symbol.iterator]=function(){return this.iter()},Zn.prototype[Symbol.iterator]=qa.prototype[Symbol.iterator]=Na.prototype[Symbol.iterator]=function(){return this});class Hu{constructor(e,t,n,s){this.from=e,this.to=t,this.number=n,this.text=s}get length(){return this.to-this.from}}function Tn(i,e,t){return e=Math.max(0,Math.min(i.length,e)),[e,Math.max(e,Math.min(i.length,t))]}function Ee(i,e,t=!0,n=!0){return qu(i,e,t,n)}function Wu(i){return i>=56320&&i<57344}function Vu(i){return i>=55296&&i<56320}function $u(i,e){let t=i.charCodeAt(e);if(!Vu(t)||e+1==i.length)return t;let n=i.charCodeAt(e+1);return Wu(n)?(t-55296<<10)+(n-56320)+65536:t}function Uu(i){return i<65536?1:2}const fr=/\r\n?|\n/;var Ue=(function(i){return i[i.Simple=0]="Simple",i[i.TrackDel=1]="TrackDel",i[i.TrackBefore=2]="TrackBefore",i[i.TrackAfter=3]="TrackAfter",i})(Ue||(Ue={}));class Ct{constructor(e){this.sections=e}get length(){let e=0;for(let t=0;t<this.sections.length;t+=2)e+=this.sections[t];return e}get newLength(){let e=0;for(let t=0;t<this.sections.length;t+=2){let n=this.sections[t+1];e+=n<0?this.sections[t]:n}return e}get empty(){return this.sections.length==0||this.sections.length==2&&this.sections[1]<0}iterGaps(e){for(let t=0,n=0,s=0;t<this.sections.length;){let r=this.sections[t++],o=this.sections[t++];o<0?(e(n,s,r),s+=r):s+=o,n+=r}}iterChangedRanges(e,t=!1){pr(this,e,t)}get invertedDesc(){let e=[];for(let t=0;t<this.sections.length;){let n=this.sections[t++],s=this.sections[t++];s<0?e.push(n,s):e.push(s,n)}return new Ct(e)}composeDesc(e){return this.empty?e:e.empty?this:Fa(this,e)}mapDesc(e,t=!1){return e.empty?this:mr(this,e,t)}mapPos(e,t=-1,n=Ue.Simple){let s=0,r=0;for(let o=0;o<this.sections.length;){let l=this.sections[o++],a=this.sections[o++],c=s+l;if(a<0){if(c>e)return r+(e-s);r+=l}else{if(n!=Ue.Simple&&c>=e&&(n==Ue.TrackDel&&s<e&&c>e||n==Ue.TrackBefore&&s<e||n==Ue.TrackAfter&&c>e))return null;if(c>e||c==e&&t<0&&!l)return e==s||t<0?r:r+a;r+=a}s=c}if(e>s)throw new RangeError(`Position ${e} is out of range for changeset of length ${s}`);return r}touchesRange(e,t=e){for(let n=0,s=0;n<this.sections.length&&s<=t;){let r=this.sections[n++],o=this.sections[n++],l=s+r;if(o>=0&&s<=t&&l>=e)return s<e&&l>t?"cover":!0;s=l}return!1}toString(){let e="";for(let t=0;t<this.sections.length;){let n=this.sections[t++],s=this.sections[t++];e+=(e?" ":"")+n+(s>=0?":"+s:"")}return e}toJSON(){return this.sections}static fromJSON(e){if(!Array.isArray(e)||e.length%2||e.some(t=>typeof t!="number"))throw new RangeError("Invalid JSON representation of ChangeDesc");return new Ct(e)}static create(e){return new Ct(e)}}class ve extends Ct{constructor(e,t){super(e),this.inserted=t}apply(e){if(this.length!=e.length)throw new RangeError("Applying change set to a document with the wrong length");return pr(this,(t,n,s,r,o)=>e=e.replace(s,s+(n-t),o),!1),e}mapDesc(e,t=!1){return mr(this,e,t,!0)}invert(e){let t=this.sections.slice(),n=[];for(let s=0,r=0;s<t.length;s+=2){let o=t[s],l=t[s+1];if(l>=0){t[s]=l,t[s+1]=o;let a=s>>1;for(;n.length<a;)n.push(ee.empty);n.push(o?e.slice(r,r+o):ee.empty)}r+=o}return new ve(t,n)}compose(e){return this.empty?e:e.empty?this:Fa(this,e,!0)}map(e,t=!1){return e.empty?this:mr(this,e,t,!0)}iterChanges(e,t=!1){pr(this,e,t)}get desc(){return Ct.create(this.sections)}filter(e){let t=[],n=[],s=[],r=new oi(this);e:for(let o=0,l=0;;){let a=o==e.length?1e9:e[o++];for(;l<a||l==a&&r.len==0;){if(r.done)break e;let h=Math.min(r.len,a-l);Te(s,h,-1);let u=r.ins==-1?-1:r.off==0?r.ins:0;Te(t,h,u),u>0&&Ht(n,t,r.text),r.forward(h),l+=h}let c=e[o++];for(;l<c;){if(r.done)break e;let h=Math.min(r.len,c-l);Te(t,h,-1),Te(s,h,r.ins==-1?-1:r.off==0?r.ins:0),r.forward(h),l+=h}}return{changes:new ve(t,n),filtered:Ct.create(s)}}toJSON(){let e=[];for(let t=0;t<this.sections.length;t+=2){let n=this.sections[t],s=this.sections[t+1];s<0?e.push(n):s==0?e.push([n]):e.push([n].concat(this.inserted[t>>1].toJSON()))}return e}static of(e,t,n){let s=[],r=[],o=0,l=null;function a(h=!1){if(!h&&!s.length)return;o<t&&Te(s,t-o,-1);let u=new ve(s,r);l=l?l.compose(u.map(l)):u,s=[],r=[],o=0}function c(h){if(Array.isArray(h))for(let u of h)c(u);else if(h instanceof ve){if(h.length!=t)throw new RangeError(`Mismatched change set length (got ${h.length}, expected ${t})`);a(),l=l?l.compose(h.map(l)):h}else{let{from:u,to:d=u,insert:f}=h;if(u>d||u<0||d>t)throw new RangeError(`Invalid change range ${u} to ${d} (in doc of length ${t})`);let p=f?typeof f=="string"?ee.of(f.split(n||fr)):f:ee.empty,m=p.length;if(u==d&&m==0)return;u<o&&a(),u>o&&Te(s,u-o,-1),Te(s,d-u,m),Ht(r,s,p),o=d}}return c(e),a(!l),l}static empty(e){return new ve(e?[e,-1]:[],[])}static fromJSON(e){if(!Array.isArray(e))throw new RangeError("Invalid JSON representation of ChangeSet");let t=[],n=[];for(let s=0;s<e.length;s++){let r=e[s];if(typeof r=="number")t.push(r,-1);else{if(!Array.isArray(r)||typeof r[0]!="number"||r.some((o,l)=>l&&typeof o!="string"))throw new RangeError("Invalid JSON representation of ChangeSet");if(r.length==1)t.push(r[0],0);else{for(;n.length<s;)n.push(ee.empty);n[s]=ee.of(r.slice(1)),t.push(r[0],n[s].length)}}}return new ve(t,n)}static createSet(e,t){return new ve(e,t)}}function Te(i,e,t,n=!1){if(e==0&&t<=0)return;let s=i.length-2;s>=0&&t<=0&&t==i[s+1]?i[s]+=e:s>=0&&e==0&&i[s]==0?i[s+1]+=t:n?(i[s]+=e,i[s+1]+=t):i.push(e,t)}function Ht(i,e,t){if(t.length==0)return;let n=e.length-2>>1;if(n<i.length)i[i.length-1]=i[i.length-1].append(t);else{for(;i.length<n;)i.push(ee.empty);i.push(t)}}function pr(i,e,t){let n=i.inserted;for(let s=0,r=0,o=0;o<i.sections.length;){let l=i.sections[o++],a=i.sections[o++];if(a<0)s+=l,r+=l;else{let c=s,h=r,u=ee.empty;for(;c+=l,h+=a,a&&n&&(u=u.append(n[o-2>>1])),!(t||o==i.sections.length||i.sections[o+1]<0);)l=i.sections[o++],a=i.sections[o++];e(s,c,r,h,u),s=c,r=h}}}function mr(i,e,t,n=!1){let s=[],r=n?[]:null,o=new oi(i),l=new oi(e);for(let a=-1;;){if(o.done&&l.len||l.done&&o.len)throw new Error("Mismatched change set lengths");if(o.ins==-1&&l.ins==-1){let c=Math.min(o.len,l.len);Te(s,c,-1),o.forward(c),l.forward(c)}else if(l.ins>=0&&(o.ins<0||a==o.i||o.off==0&&(l.len<o.len||l.len==o.len&&!t))){let c=l.len;for(Te(s,l.ins,-1);c;){let h=Math.min(o.len,c);o.ins>=0&&a<o.i&&o.len<=h&&(Te(s,0,o.ins),r&&Ht(r,s,o.text),a=o.i),o.forward(h),c-=h}l.next()}else if(o.ins>=0){let c=0,h=o.len;for(;h;)if(l.ins==-1){let u=Math.min(h,l.len);c+=u,h-=u,l.forward(u)}else if(l.ins==0&&l.len<h)h-=l.len,l.next();else break;Te(s,c,a<o.i?o.ins:0),r&&a<o.i&&Ht(r,s,o.text),a=o.i,o.forward(o.len-h)}else{if(o.done&&l.done)return r?ve.createSet(s,r):Ct.create(s);throw new Error("Mismatched change set lengths")}}}function Fa(i,e,t=!1){let n=[],s=t?[]:null,r=new oi(i),o=new oi(e);for(let l=!1;;){if(r.done&&o.done)return s?ve.createSet(n,s):Ct.create(n);if(r.ins==0)Te(n,r.len,0,l),r.next();else if(o.len==0&&!o.done)Te(n,0,o.ins,l),s&&Ht(s,n,o.text),o.next();else{if(r.done||o.done)throw new Error("Mismatched change set lengths");{let a=Math.min(r.len2,o.len),c=n.length;if(r.ins==-1){let h=o.ins==-1?-1:o.off?0:o.ins;Te(n,a,h,l),s&&h&&Ht(s,n,o.text)}else o.ins==-1?(Te(n,r.off?0:r.len,a,l),s&&Ht(s,n,r.textBit(a))):(Te(n,r.off?0:r.len,o.off?0:o.ins,l),s&&!o.off&&Ht(s,n,o.text));l=(r.ins>a||o.ins>=0&&o.len>a)&&(l||n.length>c),r.forward2(a),o.forward(a)}}}}class oi{constructor(e){this.set=e,this.i=0,this.next()}next(){let{sections:e}=this.set;this.i<e.length?(this.len=e[this.i++],this.ins=e[this.i++]):(this.len=0,this.ins=-2),this.off=0}get done(){return this.ins==-2}get len2(){return this.ins<0?this.len:this.ins}get text(){let{inserted:e}=this.set,t=this.i-2>>1;return t>=e.length?ee.empty:e[t]}textBit(e){let{inserted:t}=this.set,n=this.i-2>>1;return n>=t.length&&!e?ee.empty:t[n].slice(this.off,e==null?void 0:this.off+e)}forward(e){e==this.len?this.next():(this.len-=e,this.off+=e)}forward2(e){this.ins==-1?this.forward(e):e==this.ins?this.next():(this.ins-=e,this.off+=e)}}class tn{constructor(e,t,n){this.from=e,this.to=t,this.flags=n}get anchor(){return this.flags&32?this.to:this.from}get head(){return this.flags&32?this.from:this.to}get empty(){return this.from==this.to}get assoc(){return this.flags&8?-1:this.flags&16?1:0}get bidiLevel(){let e=this.flags&7;return e==7?null:e}get goalColumn(){let e=this.flags>>6;return e==16777215?void 0:e}map(e,t=-1){let n,s;return this.empty?n=s=e.mapPos(this.from,t):(n=e.mapPos(this.from,1),s=e.mapPos(this.to,-1)),n==this.from&&s==this.to?this:new tn(n,s,this.flags)}extend(e,t=e,n=0){if(e<=this.anchor&&t>=this.anchor)return _.range(e,t,void 0,void 0,n);let s=Math.abs(e-this.anchor)>Math.abs(t-this.anchor)?e:t;return _.range(this.anchor,s,void 0,void 0,n)}eq(e,t=!1){return this.anchor==e.anchor&&this.head==e.head&&this.goalColumn==e.goalColumn&&(!t||!this.empty||this.assoc==e.assoc)}toJSON(){return{anchor:this.anchor,head:this.head}}static fromJSON(e){if(!e||typeof e.anchor!="number"||typeof e.head!="number")throw new RangeError("Invalid JSON representation for SelectionRange");return _.range(e.anchor,e.head)}static create(e,t,n){return new tn(e,t,n)}}class _{constructor(e,t){this.ranges=e,this.mainIndex=t}map(e,t=-1){return e.empty?this:_.create(this.ranges.map(n=>n.map(e,t)),this.mainIndex)}eq(e,t=!1){if(this.ranges.length!=e.ranges.length||this.mainIndex!=e.mainIndex)return!1;for(let n=0;n<this.ranges.length;n++)if(!this.ranges[n].eq(e.ranges[n],t))return!1;return!0}get main(){return this.ranges[this.mainIndex]}asSingle(){return this.ranges.length==1?this:new _([this.main],0)}addRange(e,t=!0){return _.create([e].concat(this.ranges),t?0:this.mainIndex+1)}replaceRange(e,t=this.mainIndex){let n=this.ranges.slice();return n[t]=e,_.create(n,this.mainIndex)}toJSON(){return{ranges:this.ranges.map(e=>e.toJSON()),main:this.mainIndex}}static fromJSON(e){if(!e||!Array.isArray(e.ranges)||typeof e.main!="number"||e.main>=e.ranges.length)throw new RangeError("Invalid JSON representation for EditorSelection");return new _(e.ranges.map(t=>tn.fromJSON(t)),e.main)}static single(e,t=e){return new _([_.range(e,t)],0)}static create(e,t=0){if(e.length==0)throw new RangeError("A selection needs at least one range");for(let n=0,s=0;s<e.length;s++){let r=e[s];if(r.empty?r.from<=n:r.from<n)return _.normalized(e.slice(),t);n=r.to}return new _(e,t)}static cursor(e,t=0,n,s){return tn.create(e,e,(t==0?0:t<0?8:16)|(n==null?7:Math.min(6,n))|(s??16777215)<<6)}static range(e,t,n,s,r){let o=(n??16777215)<<6|(s==null?7:Math.min(6,s));return!r&&e!=t&&(r=t<e?1:-1),t<e?tn.create(t,e,48|o):tn.create(e,t,(r?r<0?8:16:0)|o)}static normalized(e,t=0){let n=e[t];e.sort((s,r)=>s.from-r.from),t=e.indexOf(n);for(let s=1;s<e.length;s++){let r=e[s],o=e[s-1];if(r.empty?r.from<=o.to:r.from<o.to){let l=o.from,a=Math.max(r.to,o.to);s<=t&&t--,e.splice(--s,2,r.anchor>r.head?_.range(a,l):_.range(l,a))}}return new _(e,t)}}function Ha(i,e){for(let t of i.ranges)if(t.to>e)throw new RangeError("Selection points outside of document")}let uo=0;class I{constructor(e,t,n,s,r){this.combine=e,this.compareInput=t,this.compare=n,this.isStatic=s,this.id=uo++,this.default=e([]),this.extensions=typeof r=="function"?r(this):r}get reader(){return this}static define(e={}){return new I(e.combine||(t=>t),e.compareInput||((t,n)=>t===n),e.compare||(e.combine?(t,n)=>t===n:fo),!!e.static,e.enables)}of(e){return new ji([],this,0,e)}compute(e,t){if(this.isStatic)throw new Error("Can't compute a static facet");return new ji(e,this,1,t)}computeN(e,t){if(this.isStatic)throw new Error("Can't compute a static facet");return new ji(e,this,2,t)}from(e,t){return t||(t=n=>n),this.compute([e],n=>t(n.field(e)))}}function fo(i,e){return i==e||i.length==e.length&&i.every((t,n)=>t===e[n])}class ji{constructor(e,t,n,s){this.dependencies=e,this.facet=t,this.type=n,this.value=s,this.id=uo++}dynamicSlot(e){var t;let n=this.value,s=this.facet.compareInput,r=this.id,o=e[r]>>1,l=this.type==2,a=!1,c=!1,h=[];for(let u of this.dependencies)u=="doc"?a=!0:u=="selection"?c=!0:(((t=e[u.id])!==null&&t!==void 0?t:1)&1)==0&&h.push(e[u.id]);return{create(u){return u.values[o]=n(u),1},update(u,d){if(a&&d.docChanged||c&&(d.docChanged||d.selection)||gr(u,h)){let f=n(u);if(l?!rl(f,u.values[o],s):!s(f,u.values[o]))return u.values[o]=f,1}return 0},reconfigure:(u,d)=>{let f,p=d.config.address[r];if(p!=null){let m=ns(d,p);if(this.dependencies.every(g=>g instanceof I?d.facet(g)===u.facet(g):g instanceof Gt?d.field(g,!1)==u.field(g,!1):!0)||(l?rl(f=n(u),m,s):s(f=n(u),m)))return u.values[o]=m,0}else f=n(u);return u.values[o]=f,1}}}}function rl(i,e,t){if(i.length!=e.length)return!1;for(let n=0;n<i.length;n++)if(!t(i[n],e[n]))return!1;return!0}function gr(i,e){let t=!1;for(let n of e)ei(i,n)&1&&(t=!0);return t}function ju(i,e,t){let n=t.map(a=>i[a.id]),s=t.map(a=>a.type),r=n.filter(a=>!(a&1)),o=i[e.id]>>1;function l(a){let c=[];for(let h=0;h<n.length;h++){let u=ns(a,n[h]);if(s[h]==2)for(let d of u)c.push(d);else c.push(u)}return e.combine(c)}return{create(a){for(let c of n)ei(a,c);return a.values[o]=l(a),1},update(a,c){if(!gr(a,r))return 0;let h=l(a);return e.compare(h,a.values[o])?0:(a.values[o]=h,1)},reconfigure(a,c){let h=gr(a,n),u=c.config.facets[e.id],d=c.facet(e);if(u&&!h&&fo(t,u))return a.values[o]=d,0;let f=l(a);return e.compare(f,d)?(a.values[o]=d,0):(a.values[o]=f,1)}}}const Ci=I.define({static:!0});class Gt{constructor(e,t,n,s,r){this.id=e,this.createF=t,this.updateF=n,this.compareF=s,this.spec=r,this.provides=void 0}static define(e){let t=new Gt(uo++,e.create,e.update,e.compare||((n,s)=>n===s),e);return e.provide&&(t.provides=e.provide(t)),t}create(e){let t=e.facet(Ci).find(n=>n.field==this);return((t==null?void 0:t.create)||this.createF)(e)}slot(e){let t=e[this.id]>>1;return{create:n=>(n.values[t]=this.create(n),1),update:(n,s)=>{let r=n.values[t],o=this.updateF(r,s);return this.compareF(r,o)?0:(n.values[t]=o,1)},reconfigure:(n,s)=>{let r=n.facet(Ci),o=s.facet(Ci),l;return(l=r.find(a=>a.field==this))&&l!=o.find(a=>a.field==this)?(n.values[t]=l.create(n),1):s.config.address[this.id]!=null?(n.values[t]=s.field(this),0):(n.values[t]=this.create(n),1)}}}init(e){return[this,Ci.of({field:this,create:e})]}get extension(){return this}}const en={lowest:4,low:3,default:2,high:1,highest:0};function Fn(i){return e=>new Wa(e,i)}const ms={highest:Fn(en.highest),high:Fn(en.high),default:Fn(en.default),low:Fn(en.low),lowest:Fn(en.lowest)};class Wa{constructor(e,t){this.inner=e,this.prec=t}}class wi{of(e){return new br(this,e)}reconfigure(e){return wi.reconfigure.of({compartment:this,extension:e})}get(e){return e.config.compartments.get(this)}}class br{constructor(e,t){this.compartment=e,this.inner=t}}class ts{constructor(e,t,n,s,r,o){for(this.base=e,this.compartments=t,this.dynamicSlots=n,this.address=s,this.staticValues=r,this.facets=o,this.statusTemplate=[];this.statusTemplate.length<n.length;)this.statusTemplate.push(0)}staticFacet(e){let t=this.address[e.id];return t==null?e.default:this.staticValues[t>>1]}static resolve(e,t,n){let s=[],r=Object.create(null),o=new Map;for(let d of Ku(e,t,o))d instanceof Gt?s.push(d):(r[d.facet.id]||(r[d.facet.id]=[])).push(d);let l=Object.create(null),a=[],c=[];for(let d of s)l[d.id]=c.length<<1,c.push(f=>d.slot(f));let h=n==null?void 0:n.config.facets;for(let d in r){let f=r[d],p=f[0].facet,m=h&&h[d]||[];if(f.every(g=>g.type==0))if(l[p.id]=a.length<<1|1,fo(m,f))a.push(n.facet(p));else{let g=p.combine(f.map(b=>b.value));a.push(n&&p.compare(g,n.facet(p))?n.facet(p):g)}else{for(let g of f)g.type==0?(l[g.id]=a.length<<1|1,a.push(g.value)):(l[g.id]=c.length<<1,c.push(b=>g.dynamicSlot(b)));l[p.id]=c.length<<1,c.push(g=>ju(g,p,f))}}let u=c.map(d=>d(l));return new ts(e,o,u,l,a,r)}}function Ku(i,e,t){let n=[[],[],[],[],[]],s=new Map;function r(o,l){let a=s.get(o);if(a!=null){if(a<=l)return;let c=n[a].indexOf(o);c>-1&&n[a].splice(c,1),o instanceof br&&t.delete(o.compartment)}if(s.set(o,l),Array.isArray(o))for(let c of o)r(c,l);else if(o instanceof br){if(t.has(o.compartment))throw new RangeError("Duplicate use of compartment in extensions");let c=e.get(o.compartment)||o.inner;t.set(o.compartment,c),r(c,l)}else if(o instanceof Wa)r(o.inner,o.prec);else if(o instanceof Gt)n[l].push(o),o.provides&&r(o.provides,l);else if(o instanceof ji)n[l].push(o),o.facet.extensions&&r(o.facet.extensions,en.default);else{let c=o.extension;if(!c)throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);r(c,l)}}return r(i,en.default),n.reduce((o,l)=>o.concat(l))}function ei(i,e){if(e&1)return 2;let t=e>>1,n=i.status[t];if(n==4)throw new Error("Cyclic dependency between fields and/or facets");if(n&2)return n;i.status[t]=4;let s=i.computeSlot(i,i.config.dynamicSlots[t]);return i.status[t]=2|s}function ns(i,e){return e&1?i.config.staticValues[e>>1]:i.values[e>>1]}const Va=I.define(),yr=I.define({combine:i=>i.some(e=>e),static:!0}),$a=I.define({combine:i=>i.length?i[0]:void 0,static:!0}),Ua=I.define(),ja=I.define(),Ka=I.define(),Xa=I.define({combine:i=>i.length?i[0]:!1});class Yt{constructor(e,t){this.type=e,this.value=t}static define(){return new Xu}}class Xu{of(e){return new Yt(this,e)}}class Gu{constructor(e){this.map=e}of(e){return new be(this,e)}}class be{constructor(e,t){this.type=e,this.value=t}map(e){let t=this.type.map(this.value,e);return t===void 0?void 0:t==this.value?this:new be(this.type,t)}is(e){return this.type==e}static define(e={}){return new Gu(e.map||(t=>t))}static mapEffects(e,t){if(!e.length)return e;let n=[];for(let s of e){let r=s.map(t);r&&n.push(r)}return n}}be.reconfigure=be.define();be.appendConfig=be.define();class xe{constructor(e,t,n,s,r,o){this.startState=e,this.changes=t,this.selection=n,this.effects=s,this.annotations=r,this.scrollIntoView=o,this._doc=null,this._state=null,n&&Ha(n,t.newLength),r.some(l=>l.type==xe.time)||(this.annotations=r.concat(xe.time.of(Date.now())))}static create(e,t,n,s,r,o){return new xe(e,t,n,s,r,o)}get newDoc(){return this._doc||(this._doc=this.changes.apply(this.startState.doc))}get newSelection(){return this.selection||this.startState.selection.map(this.changes)}get state(){return this._state||this.startState.applyTransaction(this),this._state}annotation(e){for(let t of this.annotations)if(t.type==e)return t.value}get docChanged(){return!this.changes.empty}get reconfigured(){return this.startState.config!=this.state.config}isUserEvent(e){let t=this.annotation(xe.userEvent);return!!(t&&(t==e||t.length>e.length&&t.slice(0,e.length)==e&&t[e.length]=="."))}}xe.time=Yt.define();xe.userEvent=Yt.define();xe.addToHistory=Yt.define();xe.remote=Yt.define();function Yu(i,e){let t=[];for(let n=0,s=0;;){let r,o;if(n<i.length&&(s==e.length||e[s]>=i[n]))r=i[n++],o=i[n++];else if(s<e.length)r=e[s++],o=e[s++];else return t;!t.length||t[t.length-1]<r?t.push(r,o):t[t.length-1]<o&&(t[t.length-1]=o)}}function Ga(i,e,t){var n;let s,r,o;return t?(s=e.changes,r=ve.empty(e.changes.length),o=i.changes.compose(e.changes)):(s=e.changes.map(i.changes),r=i.changes.mapDesc(e.changes,!0),o=i.changes.compose(s)),{changes:o,selection:e.selection?e.selection.map(r):(n=i.selection)===null||n===void 0?void 0:n.map(s),effects:be.mapEffects(i.effects,s).concat(be.mapEffects(e.effects,r)),annotations:i.annotations.length?i.annotations.concat(e.annotations):e.annotations,scrollIntoView:i.scrollIntoView||e.scrollIntoView}}function wr(i,e,t){let n=e.selection,s=_n(e.annotations);return e.userEvent&&(s=s.concat(xe.userEvent.of(e.userEvent))),{changes:e.changes instanceof ve?e.changes:ve.of(e.changes||[],t,i.facet($a)),selection:n&&(n instanceof _?n:_.single(n.anchor,n.head)),effects:_n(e.effects),annotations:s,scrollIntoView:!!e.scrollIntoView}}function Ya(i,e,t){let n=wr(i,e.length?e[0]:{},i.doc.length);e.length&&e[0].filter===!1&&(t=!1);for(let r=1;r<e.length;r++){e[r].filter===!1&&(t=!1);let o=!!e[r].sequential;n=Ga(n,wr(i,e[r],o?n.changes.newLength:i.doc.length),o)}let s=xe.create(i,n.changes,n.selection,n.effects,n.annotations,n.scrollIntoView);return Qu(t?Ju(s):s)}function Ju(i){let e=i.startState,t=!0;for(let s of e.facet(Ua)){let r=s(i);if(r===!1){t=!1;break}Array.isArray(r)&&(t=t===!0?r:Yu(t,r))}if(t!==!0){let s,r;if(t===!1)r=i.changes.invertedDesc,s=ve.empty(e.doc.length);else{let o=i.changes.filter(t);s=o.changes,r=o.filtered.mapDesc(o.changes).invertedDesc}i=xe.create(e,s,i.selection&&i.selection.map(r),be.mapEffects(i.effects,r),i.annotations,i.scrollIntoView)}let n=e.facet(ja);for(let s=n.length-1;s>=0;s--){let r=n[s](i);r instanceof xe?i=r:Array.isArray(r)&&r.length==1&&r[0]instanceof xe?i=r[0]:i=Ya(e,_n(r),!1)}return i}function Qu(i){let e=i.startState,t=e.facet(Ka),n=i;for(let s=t.length-1;s>=0;s--){let r=t[s](i);r&&Object.keys(r).length&&(n=Ga(n,wr(e,r,i.changes.newLength),!0))}return n==i?i:xe.create(e,i.changes,i.selection,n.effects,n.annotations,n.scrollIntoView)}const Zu=[];function _n(i){return i==null?Zu:Array.isArray(i)?i:[i]}var Pt=(function(i){return i[i.Word=0]="Word",i[i.Space=1]="Space",i[i.Other=2]="Other",i})(Pt||(Pt={}));const ed=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;let vr;try{vr=new RegExp("[\\p{Alphabetic}\\p{Number}_]","u")}catch{}function td(i){if(vr)return vr.test(i);for(let e=0;e<i.length;e++){let t=i[e];if(/\w/.test(t)||t>""&&(t.toUpperCase()!=t.toLowerCase()||ed.test(t)))return!0}return!1}function nd(i){return e=>{if(!/\S/.test(e))return Pt.Space;if(td(e))return Pt.Word;for(let t=0;t<i.length;t++)if(e.indexOf(i[t])>-1)return Pt.Word;return Pt.Other}}class te{constructor(e,t,n,s,r,o){this.config=e,this.doc=t,this.selection=n,this.values=s,this.status=e.statusTemplate.slice(),this.computeSlot=r,o&&(o._state=this);for(let l=0;l<this.config.dynamicSlots.length;l++)ei(this,l<<1);this.computeSlot=null}field(e,t=!0){let n=this.config.address[e.id];if(n==null){if(t)throw new RangeError("Field is not present in this state");return}return ei(this,n),ns(this,n)}update(...e){return Ya(this,e,!0)}applyTransaction(e){let t=this.config,{base:n,compartments:s}=t;for(let l of e.effects)l.is(wi.reconfigure)?(t&&(s=new Map,t.compartments.forEach((a,c)=>s.set(c,a)),t=null),s.set(l.value.compartment,l.value.extension)):l.is(be.reconfigure)?(t=null,n=l.value):l.is(be.appendConfig)&&(t=null,n=_n(n).concat(l.value));let r;t?r=e.startState.values.slice():(t=ts.resolve(n,s,this),r=new te(t,this.doc,this.selection,t.dynamicSlots.map(()=>null),(a,c)=>c.reconfigure(a,this),null).values);let o=e.startState.facet(yr)?e.newSelection:e.newSelection.asSingle();new te(t,e.newDoc,o,r,(l,a)=>a.update(l,e),e)}replaceSelection(e){return typeof e=="string"&&(e=this.toText(e)),this.changeByRange(t=>({changes:{from:t.from,to:t.to,insert:e},range:_.cursor(t.from+e.length)}))}changeByRange(e){let t=this.selection,n=e(t.ranges[0]),s=this.changes(n.changes),r=[n.range],o=_n(n.effects);for(let l=1;l<t.ranges.length;l++){let a=e(t.ranges[l]),c=this.changes(a.changes),h=c.map(s);for(let d=0;d<l;d++)r[d]=r[d].map(h);let u=s.mapDesc(c,!0);r.push(a.range.map(u)),s=s.compose(h),o=be.mapEffects(o,h).concat(be.mapEffects(_n(a.effects),u))}return{changes:s,selection:_.create(r,t.mainIndex),effects:o}}changes(e=[]){return e instanceof ve?e:ve.of(e,this.doc.length,this.facet(te.lineSeparator))}toText(e){return ee.of(e.split(this.facet(te.lineSeparator)||fr))}sliceDoc(e=0,t=this.doc.length){return this.doc.sliceString(e,t,this.lineBreak)}facet(e){let t=this.config.address[e.id];return t==null?e.default:(ei(this,t),ns(this,t))}toJSON(e){let t={doc:this.sliceDoc(),selection:this.selection.toJSON()};if(e)for(let n in e){let s=e[n];s instanceof Gt&&this.config.address[s.id]!=null&&(t[n]=s.spec.toJSON(this.field(e[n]),this))}return t}static fromJSON(e,t={},n){if(!e||typeof e.doc!="string")throw new RangeError("Invalid JSON representation for EditorState");let s=[];if(n){for(let r in n)if(Object.prototype.hasOwnProperty.call(e,r)){let o=n[r],l=e[r];s.push(o.init(a=>o.spec.fromJSON(l,a)))}}return te.create({doc:e.doc,selection:_.fromJSON(e.selection),extensions:t.extensions?s.concat([t.extensions]):s})}static create(e={}){let t=ts.resolve(e.extensions||[],new Map),n=e.doc instanceof ee?e.doc:ee.of((e.doc||"").split(t.staticFacet(te.lineSeparator)||fr)),s=e.selection?e.selection instanceof _?e.selection:_.single(e.selection.anchor,e.selection.head):_.single(0);return Ha(s,n.length),t.staticFacet(yr)||(s=s.asSingle()),new te(t,n,s,t.dynamicSlots.map(()=>null),(r,o)=>o.create(r),null)}get tabSize(){return this.facet(te.tabSize)}get lineBreak(){return this.facet(te.lineSeparator)||`
`}get readOnly(){return this.facet(Xa)}phrase(e,...t){for(let n of this.facet(te.phrases))if(Object.prototype.hasOwnProperty.call(n,e)){e=n[e];break}return t.length&&(e=e.replace(/\$(\$|\d*)/g,(n,s)=>{if(s=="$")return"$";let r=+(s||1);return!r||r>t.length?n:t[r-1]})),e}languageDataAt(e,t,n=-1){let s=[];for(let r of this.facet(Va))for(let o of r(this,t,n))Object.prototype.hasOwnProperty.call(o,e)&&s.push(o[e]);return s}charCategorizer(e){let t=this.languageDataAt("wordChars",e);return nd(t.length?t[0]:"")}wordAt(e){let{text:t,from:n,length:s}=this.doc.lineAt(e),r=this.charCategorizer(e),o=e-n,l=e-n;for(;o>0;){let a=Ee(t,o,!1);if(r(t.slice(a,o))!=Pt.Word)break;o=a}for(;l<s;){let a=Ee(t,l);if(r(t.slice(l,a))!=Pt.Word)break;l=a}return o==l?null:_.range(o+n,l+n)}}te.allowMultipleSelections=yr;te.tabSize=I.define({combine:i=>i.length?i[0]:4});te.lineSeparator=$a;te.readOnly=Xa;te.phrases=I.define({compare(i,e){let t=Object.keys(i),n=Object.keys(e);return t.length==n.length&&t.every(s=>i[s]==e[s])}});te.languageData=Va;te.changeFilter=Ua;te.transactionFilter=ja;te.transactionExtender=Ka;wi.reconfigure=be.define();function po(i,e,t={}){let n={};for(let s of i)for(let r of Object.keys(s)){let o=s[r],l=n[r];if(l===void 0)n[r]=o;else if(!(l===o||o===void 0))if(Object.hasOwnProperty.call(t,r))n[r]=t[r](l,o);else throw new Error("Config merge conflict for field "+r)}for(let s in e)n[s]===void 0&&(n[s]=e[s]);return n}class on{eq(e){return this==e}range(e,t=e){return xr.create(e,t,this)}}on.prototype.startSide=on.prototype.endSide=0;on.prototype.point=!1;on.prototype.mapMode=Ue.TrackDel;function mo(i,e){return i==e||i.constructor==e.constructor&&i.eq(e)}let xr=class Ja{constructor(e,t,n){this.from=e,this.to=t,this.value=n}static create(e,t,n){return new Ja(e,t,n)}};function kr(i,e){return i.from-e.from||i.value.startSide-e.value.startSide}class go{constructor(e,t,n,s){this.from=e,this.to=t,this.value=n,this.maxPoint=s}get length(){return this.to[this.to.length-1]}findIndex(e,t,n,s=0){let r=n?this.to:this.from;for(let o=s,l=r.length;;){if(o==l)return o;let a=o+l>>1,c=r[a]-e||(n?this.value[a].endSide:this.value[a].startSide)-t;if(a==o)return c>=0?o:l;c>=0?l=a:o=a+1}}between(e,t,n,s){for(let r=this.findIndex(t,-1e9,!0),o=this.findIndex(n,1e9,!1,r);r<o;r++)if(s(this.from[r]+e,this.to[r]+e,this.value[r])===!1)return!1}map(e,t){let n=[],s=[],r=[],o=-1,l=-1;for(let a=0;a<this.value.length;a++){let c=this.value[a],h=this.from[a]+e,u=this.to[a]+e,d,f;if(h==u){let p=t.mapPos(h,c.startSide,c.mapMode);if(p==null||(d=f=p,c.startSide!=c.endSide&&(f=t.mapPos(h,c.endSide),f<d)))continue}else if(d=t.mapPos(h,c.startSide),f=t.mapPos(u,c.endSide),d>f||d==f&&c.startSide>0&&c.endSide<=0)continue;(f-d||c.endSide-c.startSide)<0||(o<0&&(o=d),c.point&&(l=Math.max(l,f-d)),n.push(c),s.push(d-o),r.push(f-o))}return{mapped:n.length?new go(s,r,n,l):null,pos:o}}}class Z{constructor(e,t,n,s){this.chunkPos=e,this.chunk=t,this.nextLayer=n,this.maxPoint=s}static create(e,t,n,s){return new Z(e,t,n,s)}get length(){let e=this.chunk.length-1;return e<0?0:Math.max(this.chunkEnd(e),this.nextLayer.length)}get size(){if(this.isEmpty)return 0;let e=this.nextLayer.size;for(let t of this.chunk)e+=t.value.length;return e}chunkEnd(e){return this.chunkPos[e]+this.chunk[e].length}update(e){let{add:t=[],sort:n=!1,filterFrom:s=0,filterTo:r=this.length}=e,o=e.filter;if(t.length==0&&!o)return this;if(n&&(t=t.slice().sort(kr)),this.isEmpty)return t.length?Z.of(t):this;let l=new Qa(this,null,-1).goto(0),a=0,c=[],h=new li;for(;l.value||a<t.length;)if(a<t.length&&(l.from-t[a].from||l.startSide-t[a].value.startSide)>=0){let u=t[a++];h.addInner(u.from,u.to,u.value)||c.push(u)}else l.rangeIndex==1&&l.chunkIndex<this.chunk.length&&(a==t.length||this.chunkEnd(l.chunkIndex)<t[a].from)&&(!o||s>this.chunkEnd(l.chunkIndex)||r<this.chunkPos[l.chunkIndex])&&h.addChunk(this.chunkPos[l.chunkIndex],this.chunk[l.chunkIndex])?l.nextChunk():((!o||s>l.to||r<l.from||o(l.from,l.to,l.value))&&(h.addInner(l.from,l.to,l.value)||c.push(xr.create(l.from,l.to,l.value))),l.next());return h.finishInner(this.nextLayer.isEmpty&&!c.length?Z.empty:this.nextLayer.update({add:c,filter:o,filterFrom:s,filterTo:r}))}map(e){if(e.empty||this.isEmpty)return this;let t=[],n=[],s=-1;for(let o=0;o<this.chunk.length;o++){let l=this.chunkPos[o],a=this.chunk[o],c=e.touchesRange(l,l+a.length);if(c===!1)s=Math.max(s,a.maxPoint),t.push(a),n.push(e.mapPos(l));else if(c===!0){let{mapped:h,pos:u}=a.map(l,e);h&&(s=Math.max(s,h.maxPoint),t.push(h),n.push(u))}}let r=this.nextLayer.map(e);return t.length==0?r:new Z(n,t,r||Z.empty,s)}between(e,t,n){if(!this.isEmpty){for(let s=0;s<this.chunk.length;s++){let r=this.chunkPos[s],o=this.chunk[s];if(t>=r&&e<=r+o.length&&o.between(r,e-r,t-r,n)===!1)return}this.nextLayer.between(e,t,n)}}iter(e=0){return ai.from([this]).goto(e)}get isEmpty(){return this.nextLayer==this}static iter(e,t=0){return ai.from(e).goto(t)}static compare(e,t,n,s,r=-1){let o=e.filter(u=>u.maxPoint>0||!u.isEmpty&&u.maxPoint>=r),l=t.filter(u=>u.maxPoint>0||!u.isEmpty&&u.maxPoint>=r),a=ol(o,l,n),c=new Hn(o,a,r),h=new Hn(l,a,r);n.iterGaps((u,d,f)=>ll(c,u,h,d,f,s)),n.empty&&n.length==0&&ll(c,0,h,0,0,s)}static eq(e,t,n=0,s){s==null&&(s=999999999);let r=e.filter(h=>!h.isEmpty&&t.indexOf(h)<0),o=t.filter(h=>!h.isEmpty&&e.indexOf(h)<0);if(r.length!=o.length)return!1;if(!r.length)return!0;let l=ol(r,o),a=new Hn(r,l,0).goto(n),c=new Hn(o,l,0).goto(n);for(;;){if(a.to!=c.to||!_r(a.active,c.active)||a.point&&(!c.point||!mo(a.point,c.point)))return!1;if(a.to>s)return!0;a.next(),c.next()}}static spans(e,t,n,s,r=-1){let o=new Hn(e,null,r).goto(t),l=t,a=o.openStart;for(;;){let c=Math.min(o.to,n);if(o.point){let h=o.activeForPoint(o.to),u=o.pointFrom<t?h.length+1:o.point.startSide<0?h.length:Math.min(h.length,a);s.point(l,c,o.point,h,u,o.pointRank),a=Math.min(o.openEnd(c),h.length)}else c>l&&(s.span(l,c,o.active,a),a=o.openEnd(c));if(o.to>n)return a+(o.point&&o.to>n?1:0);l=o.to,o.next()}}static of(e,t=!1){let n=new li;for(let s of e instanceof xr?[e]:t?id(e):e)n.add(s.from,s.to,s.value);return n.finish()}static join(e){if(!e.length)return Z.empty;let t=e[e.length-1];for(let n=e.length-2;n>=0;n--)for(let s=e[n];s!=Z.empty;s=s.nextLayer)t=new Z(s.chunkPos,s.chunk,t,Math.max(s.maxPoint,t.maxPoint));return t}}Z.empty=new Z([],[],null,-1);function id(i){if(i.length>1)for(let e=i[0],t=1;t<i.length;t++){let n=i[t];if(kr(e,n)>0)return i.slice().sort(kr);e=n}return i}Z.empty.nextLayer=Z.empty;class li{finishChunk(e){this.chunks.push(new go(this.from,this.to,this.value,this.maxPoint)),this.chunkPos.push(this.chunkStart),this.chunkStart=-1,this.setMaxPoint=Math.max(this.setMaxPoint,this.maxPoint),this.maxPoint=-1,e&&(this.from=[],this.to=[],this.value=[])}constructor(){this.chunks=[],this.chunkPos=[],this.chunkStart=-1,this.last=null,this.lastFrom=-1e9,this.lastTo=-1e9,this.from=[],this.to=[],this.value=[],this.maxPoint=-1,this.setMaxPoint=-1,this.nextLayer=null}add(e,t,n){this.addInner(e,t,n)||(this.nextLayer||(this.nextLayer=new li)).add(e,t,n)}addInner(e,t,n){let s=e-this.lastTo||n.startSide-this.last.endSide;if(s<=0&&(e-this.lastFrom||n.startSide-this.last.startSide)<0)throw new Error("Ranges must be added sorted by `from` position and `startSide`");return s<0?!1:(this.from.length==250&&this.finishChunk(!0),this.chunkStart<0&&(this.chunkStart=e),this.from.push(e-this.chunkStart),this.to.push(t-this.chunkStart),this.last=n,this.lastFrom=e,this.lastTo=t,this.value.push(n),n.point&&(this.maxPoint=Math.max(this.maxPoint,t-e)),!0)}addChunk(e,t){if((e-this.lastTo||t.value[0].startSide-this.last.endSide)<0)return!1;this.from.length&&this.finishChunk(!0),this.setMaxPoint=Math.max(this.setMaxPoint,t.maxPoint),this.chunks.push(t),this.chunkPos.push(e);let n=t.value.length-1;return this.last=t.value[n],this.lastFrom=t.from[n]+e,this.lastTo=t.to[n]+e,!0}finish(){return this.finishInner(Z.empty)}finishInner(e){if(this.from.length&&this.finishChunk(!1),this.chunks.length==0)return e;let t=Z.create(this.chunkPos,this.chunks,this.nextLayer?this.nextLayer.finishInner(e):e,this.setMaxPoint);return this.from=null,t}}function ol(i,e,t){let n=new Map;for(let r of i)for(let o=0;o<r.chunk.length;o++)r.chunk[o].maxPoint<=0&&n.set(r.chunk[o],r.chunkPos[o]);let s=new Set;for(let r of e)for(let o=0;o<r.chunk.length;o++){let l=n.get(r.chunk[o]);l!=null&&(t?t.mapPos(l):l)==r.chunkPos[o]&&!(t!=null&&t.touchesRange(l,l+r.chunk[o].length))&&s.add(r.chunk[o])}return s}class Qa{constructor(e,t,n,s=0){this.layer=e,this.skip=t,this.minPoint=n,this.rank=s}get startSide(){return this.value?this.value.startSide:0}get endSide(){return this.value?this.value.endSide:0}goto(e,t=-1e9){return this.chunkIndex=this.rangeIndex=0,this.gotoInner(e,t,!1),this}gotoInner(e,t,n){for(;this.chunkIndex<this.layer.chunk.length;){let s=this.layer.chunk[this.chunkIndex];if(!(this.skip&&this.skip.has(s)||this.layer.chunkEnd(this.chunkIndex)<e||s.maxPoint<this.minPoint))break;this.chunkIndex++,n=!1}if(this.chunkIndex<this.layer.chunk.length){let s=this.layer.chunk[this.chunkIndex].findIndex(e-this.layer.chunkPos[this.chunkIndex],t,!0);(!n||this.rangeIndex<s)&&this.setRangeIndex(s)}this.next()}forward(e,t){(this.to-e||this.endSide-t)<0&&this.gotoInner(e,t,!0)}next(){for(;;)if(this.chunkIndex==this.layer.chunk.length){this.from=this.to=1e9,this.value=null;break}else{let e=this.layer.chunkPos[this.chunkIndex],t=this.layer.chunk[this.chunkIndex],n=e+t.from[this.rangeIndex];if(this.from=n,this.to=e+t.to[this.rangeIndex],this.value=t.value[this.rangeIndex],this.setRangeIndex(this.rangeIndex+1),this.minPoint<0||this.value.point&&this.to-this.from>=this.minPoint)break}}setRangeIndex(e){if(e==this.layer.chunk[this.chunkIndex].value.length){if(this.chunkIndex++,this.skip)for(;this.chunkIndex<this.layer.chunk.length&&this.skip.has(this.layer.chunk[this.chunkIndex]);)this.chunkIndex++;this.rangeIndex=0}else this.rangeIndex=e}nextChunk(){this.chunkIndex++,this.rangeIndex=0,this.next()}compare(e){return this.from-e.from||this.startSide-e.startSide||this.rank-e.rank||this.to-e.to||this.endSide-e.endSide}}class ai{constructor(e){this.heap=e}static from(e,t=null,n=-1){let s=[];for(let r=0;r<e.length;r++)for(let o=e[r];!o.isEmpty;o=o.nextLayer)o.maxPoint>=n&&s.push(new Qa(o,t,n,r));return s.length==1?s[0]:new ai(s)}get startSide(){return this.value?this.value.startSide:0}goto(e,t=-1e9){for(let n of this.heap)n.goto(e,t);for(let n=this.heap.length>>1;n>=0;n--)Ns(this.heap,n);return this.next(),this}forward(e,t){for(let n of this.heap)n.forward(e,t);for(let n=this.heap.length>>1;n>=0;n--)Ns(this.heap,n);(this.to-e||this.value.endSide-t)<0&&this.next()}next(){if(this.heap.length==0)this.from=this.to=1e9,this.value=null,this.rank=-1;else{let e=this.heap[0];this.from=e.from,this.to=e.to,this.value=e.value,this.rank=e.rank,e.value&&e.next(),Ns(this.heap,0)}}}function Ns(i,e){for(let t=i[e];;){let n=(e<<1)+1;if(n>=i.length)break;let s=i[n];if(n+1<i.length&&s.compare(i[n+1])>=0&&(s=i[n+1],n++),t.compare(s)<0)break;i[n]=t,i[e]=s,e=n}}class Hn{constructor(e,t,n){this.minPoint=n,this.active=[],this.activeTo=[],this.activeRank=[],this.minActive=-1,this.point=null,this.pointFrom=0,this.pointRank=0,this.to=-1e9,this.endSide=0,this.openStart=-1,this.cursor=ai.from(e,t,n)}goto(e,t=-1e9){return this.cursor.goto(e,t),this.active.length=this.activeTo.length=this.activeRank.length=0,this.minActive=-1,this.to=e,this.endSide=t,this.openStart=-1,this.next(),this}forward(e,t){for(;this.minActive>-1&&(this.activeTo[this.minActive]-e||this.active[this.minActive].endSide-t)<0;)this.removeActive(this.minActive);this.cursor.forward(e,t)}removeActive(e){Ai(this.active,e),Ai(this.activeTo,e),Ai(this.activeRank,e),this.minActive=al(this.active,this.activeTo)}addActive(e){let t=0,{value:n,to:s,rank:r}=this.cursor;for(;t<this.activeRank.length&&(r-this.activeRank[t]||s-this.activeTo[t])>0;)t++;Ti(this.active,t,n),Ti(this.activeTo,t,s),Ti(this.activeRank,t,r),e&&Ti(e,t,this.cursor.from),this.minActive=al(this.active,this.activeTo)}next(){let e=this.to,t=this.point;this.point=null;let n=this.openStart<0?[]:null;for(;;){let s=this.minActive;if(s>-1&&(this.activeTo[s]-this.cursor.from||this.active[s].endSide-this.cursor.startSide)<0){if(this.activeTo[s]>e){this.to=this.activeTo[s],this.endSide=this.active[s].endSide;break}this.removeActive(s),n&&Ai(n,s)}else if(this.cursor.value)if(this.cursor.from>e){this.to=this.cursor.from,this.endSide=this.cursor.startSide;break}else{let r=this.cursor.value;if(!r.point)this.addActive(n),this.cursor.next();else if(t&&this.cursor.to==this.to&&this.cursor.from<this.cursor.to)this.cursor.next();else{this.point=r,this.pointFrom=this.cursor.from,this.pointRank=this.cursor.rank,this.to=this.cursor.to,this.endSide=r.endSide,this.cursor.next(),this.forward(this.to,this.endSide);break}}else{this.to=this.endSide=1e9;break}}if(n){this.openStart=0;for(let s=n.length-1;s>=0&&n[s]<e;s--)this.openStart++}}activeForPoint(e){if(!this.active.length)return this.active;let t=[];for(let n=this.active.length-1;n>=0&&!(this.activeRank[n]<this.pointRank);n--)(this.activeTo[n]>e||this.activeTo[n]==e&&this.active[n].endSide>=this.point.endSide)&&t.push(this.active[n]);return t.reverse()}openEnd(e){let t=0;for(let n=this.activeTo.length-1;n>=0&&this.activeTo[n]>e;n--)t++;return t}}function ll(i,e,t,n,s,r){i.goto(e),t.goto(n);let o=n+s,l=n,a=n-e,c=!!r.boundChange;for(let h=!1;;){let u=i.to+a-t.to,d=u||i.endSide-t.endSide,f=d<0?i.to+a:t.to,p=Math.min(f,o);if(i.point||t.point?(i.point&&t.point&&mo(i.point,t.point)&&_r(i.activeForPoint(i.to),t.activeForPoint(t.to))||r.comparePoint(l,p,i.point,t.point),h=!1):(h&&r.boundChange(l),p>l&&!_r(i.active,t.active)&&r.compareRange(l,p,i.active,t.active),c&&p<o&&(u||i.openEnd(f)!=t.openEnd(f))&&(h=!0)),f>o)break;l=f,d<=0&&i.next(),d>=0&&t.next()}}function _r(i,e){if(i.length!=e.length)return!1;for(let t=0;t<i.length;t++)if(i[t]!=e[t]&&!mo(i[t],e[t]))return!1;return!0}function Ai(i,e){for(let t=e,n=i.length-1;t<n;t++)i[t]=i[t+1];i.pop()}function Ti(i,e,t){for(let n=i.length-1;n>=e;n--)i[n+1]=i[n];i[e]=t}function al(i,e){let t=-1,n=1e9;for(let s=0;s<e.length;s++)(e[s]-n||i[s].endSide-i[t].endSide)<0&&(t=s,n=e[s]);return t}function gs(i,e,t=i.length){let n=0;for(let s=0;s<t&&s<i.length;)i.charCodeAt(s)==9?(n+=e-n%e,s++):(n++,s=Ee(i,s));return n}function sd(i,e,t,n){for(let s=0,r=0;;){if(r>=e)return s;if(s==i.length)break;r+=i.charCodeAt(s)==9?t-r%t:1,s=Ee(i,s)}return i.length}const Sr="ͼ",cl=typeof Symbol>"u"?"__"+Sr:Symbol.for(Sr),Cr=typeof Symbol>"u"?"__styleSet"+Math.floor(Math.random()*1e8):Symbol("styleSet"),hl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{};class $t{constructor(e,t){this.rules=[];let{finish:n}=t||{};function s(o){return/^@/.test(o)?[o]:o.split(/,\s*/)}function r(o,l,a,c){let h=[],u=/^@(\w+)\b/.exec(o[0]),d=u&&u[1]=="keyframes";if(u&&l==null)return a.push(o[0]+";");for(let f in l){let p=l[f];if(/&/.test(f))r(f.split(/,\s*/).map(m=>o.map(g=>m.replace(/&/,g))).reduce((m,g)=>m.concat(g)),p,a);else if(p&&typeof p=="object"){if(!u)throw new RangeError("The value of a property ("+f+") should be a primitive value.");r(s(f),p,h,d)}else p!=null&&h.push(f.replace(/_.*/,"").replace(/[A-Z]/g,m=>"-"+m.toLowerCase())+": "+p+";")}(h.length||d)&&a.push((n&&!u&&!c?o.map(n):o).join(", ")+" {"+h.join(" ")+"}")}for(let o in e)r(s(o),e[o],this.rules)}getRules(){return this.rules.join(`
`)}static newName(){let e=hl[cl]||1;return hl[cl]=e+1,Sr+e.toString(36)}static mount(e,t,n){let s=e[Cr],r=n&&n.nonce;s?r&&s.setNonce(r):s=new rd(e,r),s.mount(Array.isArray(t)?t:[t],e)}}let ul=new Map;class rd{constructor(e,t){let n=e.ownerDocument||e,s=n.defaultView;if(!e.head&&e.adoptedStyleSheets&&s.CSSStyleSheet){let r=ul.get(n);if(r)return e[Cr]=r;this.sheet=new s.CSSStyleSheet,ul.set(n,this)}else this.styleTag=n.createElement("style"),t&&this.styleTag.setAttribute("nonce",t);this.modules=[],e[Cr]=this}mount(e,t){let n=this.sheet,s=0,r=0;for(let o=0;o<e.length;o++){let l=e[o],a=this.modules.indexOf(l);if(a<r&&a>-1&&(this.modules.splice(a,1),r--,a=-1),a==-1){if(this.modules.splice(r++,0,l),n)for(let c=0;c<l.rules.length;c++)n.insertRule(l.rules[c],s++)}else{for(;r<a;)s+=this.modules[r++].rules.length;s+=l.rules.length,r++}}if(n)t.adoptedStyleSheets.indexOf(this.sheet)<0&&(t.adoptedStyleSheets=[this.sheet,...t.adoptedStyleSheets]);else{let o="";for(let a=0;a<this.modules.length;a++)o+=this.modules[a].getRules()+`
`;this.styleTag.textContent=o;let l=t.head||t;this.styleTag.parentNode!=l&&l.insertBefore(this.styleTag,l.firstChild)}}setNonce(e){this.styleTag&&this.styleTag.getAttribute("nonce")!=e&&this.styleTag.setAttribute("nonce",e)}}var Ut={8:"Backspace",9:"Tab",10:"Enter",12:"NumLock",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",44:"PrintScreen",45:"Insert",46:"Delete",59:";",61:"=",91:"Meta",92:"Meta",106:"*",107:"+",108:",",109:"-",110:".",111:"/",144:"NumLock",145:"ScrollLock",160:"Shift",161:"Shift",162:"Control",163:"Control",164:"Alt",165:"Alt",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},ci={48:")",49:"!",50:"@",51:"#",52:"$",53:"%",54:"^",55:"&",56:"*",57:"(",59:":",61:"+",173:"_",186:":",187:"+",188:"<",189:"_",190:">",191:"?",192:"~",219:"{",220:"|",221:"}",222:'"'},od=typeof navigator<"u"&&/Mac/.test(navigator.platform),ld=typeof navigator<"u"&&/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);for(var Ce=0;Ce<10;Ce++)Ut[48+Ce]=Ut[96+Ce]=String(Ce);for(var Ce=1;Ce<=24;Ce++)Ut[Ce+111]="F"+Ce;for(var Ce=65;Ce<=90;Ce++)Ut[Ce]=String.fromCharCode(Ce+32),ci[Ce]=String.fromCharCode(Ce);for(var Fs in Ut)ci.hasOwnProperty(Fs)||(ci[Fs]=Ut[Fs]);function ad(i){var e=od&&i.metaKey&&i.shiftKey&&!i.ctrlKey&&!i.altKey||ld&&i.shiftKey&&i.key&&i.key.length==1||i.key=="Unidentified",t=!e&&i.key||(i.shiftKey?ci:Ut)[i.keyCode]||i.key||"Unidentified";return t=="Esc"&&(t="Escape"),t=="Del"&&(t="Delete"),t=="Left"&&(t="ArrowLeft"),t=="Up"&&(t="ArrowUp"),t=="Right"&&(t="ArrowRight"),t=="Down"&&(t="ArrowDown"),t}let Oe=typeof navigator<"u"?navigator:{userAgent:"",vendor:"",platform:""},Ar=typeof document<"u"?document:{documentElement:{style:{}}};const Tr=/Edge\/(\d+)/.exec(Oe.userAgent),Za=/MSIE \d/.test(Oe.userAgent),Mr=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Oe.userAgent),bs=!!(Za||Mr||Tr),dl=!bs&&/gecko\/(\d+)/i.test(Oe.userAgent),Hs=!bs&&/Chrome\/(\d+)/.exec(Oe.userAgent),cd="webkitFontSmoothing"in Ar.documentElement.style,Er=!bs&&/Apple Computer/.test(Oe.vendor),fl=Er&&(/Mobile\/\w+/.test(Oe.userAgent)||Oe.maxTouchPoints>2);var O={mac:fl||/Mac/.test(Oe.platform),windows:/Win/.test(Oe.platform),linux:/Linux|X11/.test(Oe.platform),ie:bs,ie_version:Za?Ar.documentMode||6:Mr?+Mr[1]:Tr?+Tr[1]:0,gecko:dl,gecko_version:dl?+(/Firefox\/(\d+)/.exec(Oe.userAgent)||[0,0])[1]:0,chrome:!!Hs,chrome_version:Hs?+Hs[1]:0,ios:fl,android:/Android\b/.test(Oe.userAgent),webkit_version:cd?+(/\bAppleWebKit\/(\d+)/.exec(Oe.userAgent)||[0,0])[1]:0,safari:Er,safari_version:Er?+(/\bVersion\/(\d+(\.\d+)?)/.exec(Oe.userAgent)||[0,0])[1]:0,tabSize:Ar.documentElement.style.tabSize!=null?"tab-size":"-moz-tab-size"};function bo(i,e){for(let t in i)t=="class"&&e.class?e.class+=" "+i.class:t=="style"&&e.style?e.style+=";"+i.style:e[t]=i[t];return e}const is=Object.create(null);function yo(i,e,t){if(i==e)return!0;i||(i=is),e||(e=is);let n=Object.keys(i),s=Object.keys(e);if(n.length-0!=s.length-0)return!1;for(let r of n)if(r!=t&&(s.indexOf(r)==-1||i[r]!==e[r]))return!1;return!0}function hd(i,e){for(let t=i.attributes.length-1;t>=0;t--){let n=i.attributes[t].name;e[n]==null&&i.removeAttribute(n)}for(let t in e){let n=e[t];t=="style"?i.style.cssText=n:i.getAttribute(t)!=n&&i.setAttribute(t,n)}}function pl(i,e,t){let n=!1;if(e)for(let s in e)t&&s in t||(n=!0,s=="style"?i.style.cssText="":i.removeAttribute(s));if(t)for(let s in t)e&&e[s]==t[s]||(n=!0,s=="style"?i.style.cssText=t[s]:i.setAttribute(s,t[s]));return n}function ud(i){let e=Object.create(null);for(let t=0;t<i.attributes.length;t++){let n=i.attributes[t];e[n.name]=n.value}return e}class ys{eq(e){return!1}updateDOM(e,t,n){return!1}compare(e){return this==e||this.constructor==e.constructor&&this.eq(e)}get estimatedHeight(){return-1}get lineBreaks(){return 0}ignoreEvent(e){return!0}coordsAt(e,t,n){return null}get isHidden(){return!1}get editable(){return!1}destroy(e){}}var Ae=(function(i){return i[i.Text=0]="Text",i[i.WidgetBefore=1]="WidgetBefore",i[i.WidgetAfter=2]="WidgetAfter",i[i.WidgetRange=3]="WidgetRange",i})(Ae||(Ae={}));class ye extends on{constructor(e,t,n,s){super(),this.startSide=e,this.endSide=t,this.widget=n,this.spec=s}get heightRelevant(){return!1}static mark(e){return new vi(e)}static widget(e){let t=Math.max(-1e4,Math.min(1e4,e.side||0)),n=!!e.block;return t+=n&&!e.inlineOrder?t>0?3e8:-4e8:t>0?1e8:-1e8,new ln(e,t,t,n,e.widget||null,!1)}static replace(e){let t=!!e.block,n,s;if(e.isBlockGap)n=-5e8,s=4e8;else{let{start:r,end:o}=ec(e,t);n=(r?t?-3e8:-1:5e8)-1,s=(o?t?2e8:1:-6e8)+1}return new ln(e,n,s,t,e.widget||null,!0)}static line(e){return new xi(e)}static set(e,t=!1){return Z.of(e,t)}hasHeight(){return this.widget?this.widget.estimatedHeight>-1:!1}}ye.none=Z.empty;class vi extends ye{constructor(e){let{start:t,end:n}=ec(e);super(t?-1:5e8,n?1:-6e8,null,e),this.tagName=e.tagName||"span",this.attrs=e.class&&e.attributes?bo(e.attributes,{class:e.class}):e.class?{class:e.class}:e.attributes||is}eq(e){return this==e||e instanceof vi&&this.tagName==e.tagName&&yo(this.attrs,e.attrs)}range(e,t=e){if(e>=t)throw new RangeError("Mark decorations may not be empty");return super.range(e,t)}}vi.prototype.point=!1;class xi extends ye{constructor(e){super(-2e8,-2e8,null,e)}eq(e){return e instanceof xi&&this.spec.class==e.spec.class&&yo(this.spec.attributes,e.spec.attributes)}range(e,t=e){if(t!=e)throw new RangeError("Line decoration ranges must be zero-length");return super.range(e,t)}}xi.prototype.mapMode=Ue.TrackBefore;xi.prototype.point=!0;class ln extends ye{constructor(e,t,n,s,r,o){super(t,n,r,e),this.block=s,this.isReplace=o,this.mapMode=s?t<=0?Ue.TrackBefore:Ue.TrackAfter:Ue.TrackDel}get type(){return this.startSide!=this.endSide?Ae.WidgetRange:this.startSide<=0?Ae.WidgetBefore:Ae.WidgetAfter}get heightRelevant(){return this.block||!!this.widget&&(this.widget.estimatedHeight>=5||this.widget.lineBreaks>0)}eq(e){return e instanceof ln&&dd(this.widget,e.widget)&&this.block==e.block&&this.startSide==e.startSide&&this.endSide==e.endSide}range(e,t=e){if(this.isReplace&&(e>t||e==t&&this.startSide>0&&this.endSide<=0))throw new RangeError("Invalid range for replacement decoration");if(!this.isReplace&&t!=e)throw new RangeError("Widget decorations can only have zero-length ranges");return super.range(e,t)}}ln.prototype.point=!0;function ec(i,e=!1){let{inclusiveStart:t,inclusiveEnd:n}=i;return t==null&&(t=i.inclusive),n==null&&(n=i.inclusive),{start:t??e,end:n??e}}function dd(i,e){return i==e||!!(i&&e&&i.compare(e))}function Sn(i,e,t,n=0){let s=t.length-1;s>=0&&t[s]+n>=i?t[s]=Math.max(t[s],e):t.push(i,e)}class hi extends on{constructor(e,t){super(),this.tagName=e,this.attributes=t}eq(e){return e==this||e instanceof hi&&this.tagName==e.tagName&&yo(this.attributes,e.attributes)}static create(e){return new hi(e.tagName,e.attributes||is)}static set(e,t=!1){return Z.of(e,t)}}hi.prototype.startSide=hi.prototype.endSide=-1;function ui(i){let e;return i.nodeType==11?e=i.getSelection?i:i.ownerDocument:e=i,e.getSelection()}function Br(i,e){return e?i==e||i.contains(e.nodeType!=1?e.parentNode:e):!1}function ti(i,e){if(!e.anchorNode)return!1;try{return Br(i,e.anchorNode)}catch{return!1}}function Ki(i){return i.nodeType==3?di(i,0,i.nodeValue.length).getClientRects():i.nodeType==1?i.getClientRects():[]}function ni(i,e,t,n){return t?ml(i,e,t,n,-1)||ml(i,e,t,n,1):!1}function jt(i){for(var e=0;;e++)if(i=i.previousSibling,!i)return e}function ss(i){return i.nodeType==1&&/^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(i.nodeName)}function ml(i,e,t,n,s){for(;;){if(i==t&&e==n)return!0;if(e==(s<0?0:Lt(i))){if(i.nodeName=="DIV")return!1;let r=i.parentNode;if(!r||r.nodeType!=1)return!1;e=jt(i)+(s<0?0:1),i=r}else if(i.nodeType==1){if(i=i.childNodes[e+(s<0?-1:0)],i.nodeType==1&&i.contentEditable=="false")return!1;e=s<0?Lt(i):0}else return!1}}function Lt(i){return i.nodeType==3?i.nodeValue.length:i.childNodes.length}function rs(i,e){let t=e?i.left:i.right;return{left:t,right:t,top:i.top,bottom:i.bottom}}function fd(i){let e=i.visualViewport;return e?{left:0,right:e.width,top:0,bottom:e.height}:{left:0,right:i.innerWidth,top:0,bottom:i.innerHeight}}function tc(i,e){let t=e.width/i.offsetWidth,n=e.height/i.offsetHeight;return(t>.995&&t<1.005||!isFinite(t)||Math.abs(e.width-i.offsetWidth)<1)&&(t=1),(n>.995&&n<1.005||!isFinite(n)||Math.abs(e.height-i.offsetHeight)<1)&&(n=1),{scaleX:t,scaleY:n}}function pd(i,e,t,n,s,r,o,l){let a=i.ownerDocument,c=a.defaultView||window;for(let h=i,u=!1;h&&!u;)if(h.nodeType==1){let d,f=h==a.body,p=1,m=1;if(f)d=fd(c);else{if(/^(fixed|sticky)$/.test(getComputedStyle(h).position)&&(u=!0),h.scrollHeight<=h.clientHeight&&h.scrollWidth<=h.clientWidth){h=h.assignedSlot||h.parentNode;continue}let x=h.getBoundingClientRect();({scaleX:p,scaleY:m}=tc(h,x)),d={left:x.left,right:x.left+h.clientWidth*p,top:x.top,bottom:x.top+h.clientHeight*m}}let g=0,b=0;if(s=="nearest")e.top<d.top?(b=e.top-(d.top+o),t>0&&e.bottom>d.bottom+b&&(b=e.bottom-d.bottom+o)):e.bottom>d.bottom&&(b=e.bottom-d.bottom+o,t<0&&e.top-b<d.top&&(b=e.top-(d.top+o)));else{let x=e.bottom-e.top,S=d.bottom-d.top;b=(s=="center"&&x<=S?e.top+x/2-S/2:s=="start"||s=="center"&&t<0?e.top-o:e.bottom-S+o)-d.top}if(n=="nearest"?e.left<d.left?(g=e.left-(d.left+r),t>0&&e.right>d.right+g&&(g=e.right-d.right+r)):e.right>d.right&&(g=e.right-d.right+r,t<0&&e.left<d.left+g&&(g=e.left-(d.left+r))):g=(n=="center"?e.left+(e.right-e.left)/2-(d.right-d.left)/2:n=="start"==l?e.left-r:e.right-(d.right-d.left)+r)-d.left,g||b)if(f)c.scrollBy(g,b);else{let x=0,S=0;if(b){let R=h.scrollTop;h.scrollTop+=b/m,S=(h.scrollTop-R)*m}if(g){let R=h.scrollLeft;h.scrollLeft+=g/p,x=(h.scrollLeft-R)*p}e={left:e.left-x,top:e.top-S,right:e.right-x,bottom:e.bottom-S},x&&Math.abs(x-g)<1&&(n="nearest"),S&&Math.abs(S-b)<1&&(s="nearest")}if(f)break;(e.top<d.top||e.bottom>d.bottom||e.left<d.left||e.right>d.right)&&(e={left:Math.max(e.left,d.left),right:Math.min(e.right,d.right),top:Math.max(e.top,d.top),bottom:Math.min(e.bottom,d.bottom)}),h=h.assignedSlot||h.parentNode}else if(h.nodeType==11)h=h.host;else break}function nc(i,e=!0){let t=i.ownerDocument,n=null,s=null;for(let r=i.parentNode;r&&!(r==t.body||(!e||n)&&s);)if(r.nodeType==1)!s&&r.scrollHeight>r.clientHeight&&(s=r),e&&!n&&r.scrollWidth>r.clientWidth&&(n=r),r=r.assignedSlot||r.parentNode;else if(r.nodeType==11)r=r.host;else break;return{x:n,y:s}}class md{constructor(){this.anchorNode=null,this.anchorOffset=0,this.focusNode=null,this.focusOffset=0}eq(e){return this.anchorNode==e.anchorNode&&this.anchorOffset==e.anchorOffset&&this.focusNode==e.focusNode&&this.focusOffset==e.focusOffset}setRange(e){let{anchorNode:t,focusNode:n}=e;this.set(t,Math.min(e.anchorOffset,t?Lt(t):0),n,Math.min(e.focusOffset,n?Lt(n):0))}set(e,t,n,s){this.anchorNode=e,this.anchorOffset=t,this.focusNode=n,this.focusOffset=s}}let Zt=null;O.safari&&O.safari_version>=26&&(Zt=!1);function ic(i){if(i.setActive)return i.setActive();if(Zt)return i.focus(Zt);let e=[];for(let t=i;t&&(e.push(t,t.scrollTop,t.scrollLeft),t!=t.ownerDocument);t=t.parentNode);if(i.focus(Zt==null?{get preventScroll(){return Zt={preventScroll:!0},!0}}:void 0),!Zt){Zt=!1;for(let t=0;t<e.length;){let n=e[t++],s=e[t++],r=e[t++];n.scrollTop!=s&&(n.scrollTop=s),n.scrollLeft!=r&&(n.scrollLeft=r)}}}let gl;function di(i,e,t=e){let n=gl||(gl=document.createRange());return n.setEnd(i,t),n.setStart(i,e),n}function Cn(i,e,t,n){let s={key:e,code:e,keyCode:t,which:t,cancelable:!0};n&&({altKey:s.altKey,ctrlKey:s.ctrlKey,shiftKey:s.shiftKey,metaKey:s.metaKey}=n);let r=new KeyboardEvent("keydown",s);r.synthetic=!0,i.dispatchEvent(r);let o=new KeyboardEvent("keyup",s);return o.synthetic=!0,i.dispatchEvent(o),r.defaultPrevented||o.defaultPrevented}function gd(i){for(;i;){if(i&&(i.nodeType==9||i.nodeType==11&&i.host))return i;i=i.assignedSlot||i.parentNode}return null}function bd(i,e){let t=e.focusNode,n=e.focusOffset;if(!t||e.anchorNode!=t||e.anchorOffset!=n)return!1;for(n=Math.min(n,Lt(t));;)if(n){if(t.nodeType!=1)return!1;let s=t.childNodes[n-1];s.contentEditable=="false"?n--:(t=s,n=Lt(t))}else{if(t==i)return!0;n=jt(t),t=t.parentNode}}function sc(i){return i instanceof Window?i.pageYOffset>Math.max(0,i.document.documentElement.scrollHeight-i.innerHeight-4):i.scrollTop>Math.max(1,i.scrollHeight-i.clientHeight-4)}function rc(i,e){for(let t=i,n=e;;){if(t.nodeType==3&&n>0)return{node:t,offset:n};if(t.nodeType==1&&n>0){if(t.contentEditable=="false")return null;t=t.childNodes[n-1],n=Lt(t)}else if(t.parentNode&&!ss(t))n=jt(t),t=t.parentNode;else return null}}function oc(i,e){for(let t=i,n=e;;){if(t.nodeType==3&&n<t.nodeValue.length)return{node:t,offset:n};if(t.nodeType==1&&n<t.childNodes.length){if(t.contentEditable=="false")return null;t=t.childNodes[n],n=0}else if(t.parentNode&&!ss(t))n=jt(t)+1,t=t.parentNode;else return null}}class ot{constructor(e,t,n=!0){this.node=e,this.offset=t,this.precise=n}static before(e,t){return new ot(e.parentNode,jt(e),t)}static after(e,t){return new ot(e.parentNode,jt(e)+1,t)}}var de=(function(i){return i[i.LTR=0]="LTR",i[i.RTL=1]="RTL",i})(de||(de={}));const an=de.LTR,wo=de.RTL;function lc(i){let e=[];for(let t=0;t<i.length;t++)e.push(1<<+i[t]);return e}const yd=lc("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"),wd=lc("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"),Dr=Object.create(null),mt=[];for(let i of["()","[]","{}"]){let e=i.charCodeAt(0),t=i.charCodeAt(1);Dr[e]=t,Dr[t]=-e}function ac(i){return i<=247?yd[i]:1424<=i&&i<=1524?2:1536<=i&&i<=1785?wd[i-1536]:1774<=i&&i<=2220?4:8192<=i&&i<=8204?256:64336<=i&&i<=65023?4:1}const vd=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;class kt{get dir(){return this.level%2?wo:an}constructor(e,t,n){this.from=e,this.to=t,this.level=n}side(e,t){return this.dir==t==e?this.to:this.from}forward(e,t){return e==(this.dir==t)}static find(e,t,n,s){let r=-1;for(let o=0;o<e.length;o++){let l=e[o];if(l.from<=t&&l.to>=t){if(l.level==n)return o;(r<0||(s!=0?s<0?l.from<t:l.to>t:e[r].level>l.level))&&(r=o)}}if(r<0)throw new RangeError("Index out of range");return r}}function cc(i,e){if(i.length!=e.length)return!1;for(let t=0;t<i.length;t++){let n=i[t],s=e[t];if(n.from!=s.from||n.to!=s.to||n.direction!=s.direction||!cc(n.inner,s.inner))return!1}return!0}const oe=[];function xd(i,e,t,n,s){for(let r=0;r<=n.length;r++){let o=r?n[r-1].to:e,l=r<n.length?n[r].from:t,a=r?256:s;for(let c=o,h=a,u=a;c<l;c++){let d=ac(i.charCodeAt(c));d==512?d=h:d==8&&u==4&&(d=16),oe[c]=d==4?2:d,d&7&&(u=d),h=d}for(let c=o,h=a,u=a;c<l;c++){let d=oe[c];if(d==128)c<l-1&&h==oe[c+1]&&h&24?d=oe[c]=h:oe[c]=256;else if(d==64){let f=c+1;for(;f<l&&oe[f]==64;)f++;let p=c&&h==8||f<t&&oe[f]==8?u==1?1:8:256;for(let m=c;m<f;m++)oe[m]=p;c=f-1}else d==8&&u==1&&(oe[c]=1);h=d,d&7&&(u=d)}}}function kd(i,e,t,n,s){let r=s==1?2:1;for(let o=0,l=0,a=0;o<=n.length;o++){let c=o?n[o-1].to:e,h=o<n.length?n[o].from:t;for(let u=c,d,f,p;u<h;u++)if(f=Dr[d=i.charCodeAt(u)])if(f<0){for(let m=l-3;m>=0;m-=3)if(mt[m+1]==-f){let g=mt[m+2],b=g&2?s:g&4?g&1?r:s:0;b&&(oe[u]=oe[mt[m]]=b),l=m;break}}else{if(mt.length==189)break;mt[l++]=u,mt[l++]=d,mt[l++]=a}else if((p=oe[u])==2||p==1){let m=p==s;a=m?0:1;for(let g=l-3;g>=0;g-=3){let b=mt[g+2];if(b&2)break;if(m)mt[g+2]|=2;else{if(b&4)break;mt[g+2]|=4}}}}}function _d(i,e,t,n){for(let s=0,r=n;s<=t.length;s++){let o=s?t[s-1].to:i,l=s<t.length?t[s].from:e;for(let a=o;a<l;){let c=oe[a];if(c==256){let h=a+1;for(;;)if(h==l){if(s==t.length)break;h=t[s++].to,l=s<t.length?t[s].from:e}else if(oe[h]==256)h++;else break;let u=r==1,d=(h<e?oe[h]:n)==1,f=u==d?u?1:2:n;for(let p=h,m=s,g=m?t[m-1].to:i;p>a;)p==g&&(p=t[--m].from,g=m?t[m-1].to:i),oe[--p]=f;a=h}else r=c,a++}}}function Pr(i,e,t,n,s,r,o){let l=n%2?2:1;if(n%2==s%2)for(let a=e,c=0;a<t;){let h=!0,u=!1;if(c==r.length||a<r[c].from){let m=oe[a];m!=l&&(h=!1,u=m==16)}let d=!h&&l==1?[]:null,f=h?n:n+1,p=a;e:for(;;)if(c<r.length&&p==r[c].from){if(u)break e;let m=r[c];if(!h)for(let g=m.to,b=c+1;;){if(g==t)break e;if(b<r.length&&r[b].from==g)g=r[b++].to;else{if(oe[g]==l)break e;break}}if(c++,d)d.push(m);else{m.from>a&&o.push(new kt(a,m.from,f));let g=m.direction==an!=!(f%2);Or(i,g?n+1:n,s,m.inner,m.from,m.to,o),a=m.to}p=m.to}else{if(p==t||(h?oe[p]!=l:oe[p]==l))break;p++}d?Pr(i,a,p,n+1,s,d,o):a<p&&o.push(new kt(a,p,f)),a=p}else for(let a=t,c=r.length;a>e;){let h=!0,u=!1;if(!c||a>r[c-1].to){let m=oe[a-1];m!=l&&(h=!1,u=m==16)}let d=!h&&l==1?[]:null,f=h?n:n+1,p=a;e:for(;;)if(c&&p==r[c-1].to){if(u)break e;let m=r[--c];if(!h)for(let g=m.from,b=c;;){if(g==e)break e;if(b&&r[b-1].to==g)g=r[--b].from;else{if(oe[g-1]==l)break e;break}}if(d)d.push(m);else{m.to<a&&o.push(new kt(m.to,a,f));let g=m.direction==an!=!(f%2);Or(i,g?n+1:n,s,m.inner,m.from,m.to,o),a=m.from}p=m.from}else{if(p==e||(h?oe[p-1]!=l:oe[p-1]==l))break;p--}d?Pr(i,p,a,n+1,s,d,o):p<a&&o.push(new kt(p,a,f)),a=p}}function Or(i,e,t,n,s,r,o){let l=e%2?2:1;xd(i,s,r,n,l),kd(i,s,r,n,l),_d(s,r,n,l),Pr(i,s,r,e,t,n,o)}function Sd(i,e,t){if(!i)return[new kt(0,0,e==wo?1:0)];if(e==an&&!t.length&&!vd.test(i))return hc(i.length);if(t.length)for(;i.length>oe.length;)oe[oe.length]=256;let n=[],s=e==an?0:1;return Or(i,s,s,t,0,i.length,n),n}function hc(i){return[new kt(0,i,0)]}let uc="";function Cd(i,e,t,n,s){var r;let o=n.head-i.from,l=kt.find(e,o,(r=n.bidiLevel)!==null&&r!==void 0?r:-1,n.assoc),a=e[l],c=a.side(s,t);if(o==c){let d=l+=s?1:-1;if(d<0||d>=e.length)return null;a=e[l=d],o=a.side(!s,t),c=a.side(s,t)}let h=Ee(i.text,o,a.forward(s,t));(h<a.from||h>a.to)&&(h=c),uc=i.text.slice(Math.min(o,h),Math.max(o,h));let u=l==(s?e.length-1:0)?null:e[l+(s?1:-1)];return u&&h==c&&u.level+(s?0:1)<a.level?_.cursor(u.side(!s,t)+i.from,u.forward(s,t)?1:-1,u.level):_.cursor(h+i.from,a.forward(s,t)?-1:1,a.level)}function Ad(i,e,t){for(let n=e;n<t;n++){let s=ac(i.charCodeAt(n));if(s==1)return an;if(s==2||s==4)return wo}return an}const dc=I.define(),fc=I.define(),pc=I.define(),mc=I.define(),Lr=I.define(),gc=I.define(),bc=I.define(),vo=I.define(),xo=I.define(),yc=I.define({combine:i=>i.some(e=>e)}),wc=I.define({combine:i=>i.some(e=>e)}),vc=I.define();class An{constructor(e,t="nearest",n="nearest",s=5,r=5,o=!1){this.range=e,this.y=t,this.x=n,this.yMargin=s,this.xMargin=r,this.isSnapshot=o}map(e){return e.empty?this:new An(this.range.map(e),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}clip(e){return this.range.to<=e.doc.length?this:new An(_.cursor(e.doc.length),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}}const Mi=be.define({map:(i,e)=>i.map(e)}),xc=be.define();function _t(i,e,t){let n=i.facet(mc);n.length?n[0](e):window.onerror&&window.onerror(String(e),t,void 0,void 0,e)||(t?console.error(t+":",e):console.error(e))}const Dt=I.define({combine:i=>i.length?i[0]:!0});let Td=0;const wn=I.define({combine(i){return i.filter((e,t)=>{for(let n=0;n<t;n++)if(i[n].plugin==e.plugin)return!1;return!0})}});class Tt{constructor(e,t,n,s,r){this.id=e,this.create=t,this.domEventHandlers=n,this.domEventObservers=s,this.baseExtensions=r(this),this.extension=this.baseExtensions.concat(wn.of({plugin:this,arg:void 0}))}of(e){return this.baseExtensions.concat(wn.of({plugin:this,arg:e}))}static define(e,t){const{eventHandlers:n,eventObservers:s,provide:r,decorations:o}=t||{};return new Tt(Td++,e,n,s,l=>{let a=[];return o&&a.push(ws.of(c=>{let h=c.plugin(l);return h?o(h):ye.none})),r&&a.push(r(l)),a})}static fromClass(e,t){return Tt.define((n,s)=>new e(n,s),t)}}class Ws{constructor(e){this.spec=e,this.mustUpdate=null,this.value=null}get plugin(){return this.spec&&this.spec.plugin}update(e){if(this.value){if(this.mustUpdate){let t=this.mustUpdate;if(this.mustUpdate=null,this.value.update)try{this.value.update(t)}catch(n){if(_t(t.state,n,"CodeMirror plugin crashed"),this.value.destroy)try{this.value.destroy()}catch{}this.deactivate()}}}else if(this.spec)try{this.value=this.spec.plugin.create(e,this.spec.arg)}catch(t){_t(e.state,t,"CodeMirror plugin crashed"),this.deactivate()}return this}destroy(e){var t;if(!((t=this.value)===null||t===void 0)&&t.destroy)try{this.value.destroy()}catch(n){_t(e.state,n,"CodeMirror plugin crashed")}}deactivate(){this.spec=this.value=null}}const kc=I.define(),ko=I.define(),ws=I.define(),_c=I.define(),_o=I.define(),ki=I.define(),Sc=I.define();function bl(i,e){let t=i.state.facet(Sc);if(!t.length)return t;let n=t.map(r=>r instanceof Function?r(i):r),s=[];return Z.spans(n,e.from,e.to,{point(){},span(r,o,l,a){let c=r-e.from,h=o-e.from,u=s;for(let d=l.length-1;d>=0;d--,a--){let f=l[d].spec.bidiIsolate,p;if(f==null&&(f=Ad(e.text,c,h)),a>0&&u.length&&(p=u[u.length-1]).to==c&&p.direction==f)p.to=h,u=p.inner;else{let m={from:c,to:h,direction:f,inner:[]};u.push(m),u=m.inner}}}}),s}const Cc=I.define();function Ac(i){let e=0,t=0,n=0,s=0;for(let r of i.state.facet(Cc)){let o=r(i);o&&(o.left!=null&&(e=Math.max(e,o.left)),o.right!=null&&(t=Math.max(t,o.right)),o.top!=null&&(n=Math.max(n,o.top)),o.bottom!=null&&(s=Math.max(s,o.bottom)))}return{left:e,right:t,top:n,bottom:s}}const Yn=I.define();class Je{constructor(e,t,n,s){this.fromA=e,this.toA=t,this.fromB=n,this.toB=s}join(e){return new Je(Math.min(this.fromA,e.fromA),Math.max(this.toA,e.toA),Math.min(this.fromB,e.fromB),Math.max(this.toB,e.toB))}addToSet(e){let t=e.length,n=this;for(;t>0;t--){let s=e[t-1];if(!(s.fromA>n.toA)){if(s.toA<n.fromA)break;n=n.join(s),e.splice(t-1,1)}}return e.splice(t,0,n),e}static extendWithRanges(e,t){if(t.length==0)return e;let n=[];for(let s=0,r=0,o=0;;){let l=s<e.length?e[s].fromB:1e9,a=r<t.length?t[r]:1e9,c=Math.min(l,a);if(c==1e9)break;let h=c+o,u=c,d=h;for(;;)if(r<t.length&&t[r]<=u){let f=t[r+1];r+=2,u=Math.max(u,f);for(let p=s;p<e.length&&e[p].fromB<=u;p++)o=e[p].toA-e[p].toB;d=Math.max(d,f+o)}else if(s<e.length&&e[s].fromB<=u){let f=e[s++];u=Math.max(u,f.toB),d=Math.max(d,f.toA),o=f.toA-f.toB}else break;n.push(new Je(h,d,c,u))}return n}}class os{constructor(e,t,n){this.view=e,this.state=t,this.transactions=n,this.flags=0,this.startState=e.state,this.changes=ve.empty(this.startState.doc.length);for(let r of n)this.changes=this.changes.compose(r.changes);let s=[];this.changes.iterChangedRanges((r,o,l,a)=>s.push(new Je(r,o,l,a))),this.changedRanges=s}static create(e,t,n){return new os(e,t,n)}get viewportChanged(){return(this.flags&4)>0}get viewportMoved(){return(this.flags&8)>0}get heightChanged(){return(this.flags&2)>0}get geometryChanged(){return this.docChanged||(this.flags&18)>0}get focusChanged(){return(this.flags&1)>0}get docChanged(){return!this.changes.empty}get selectionSet(){return this.transactions.some(e=>e.selection)}get empty(){return this.flags==0&&this.transactions.length==0}}const Md=[];class pe{constructor(e,t,n=0){this.dom=e,this.length=t,this.flags=n,this.parent=null,e.cmTile=this}get breakAfter(){return this.flags&1}get children(){return Md}isWidget(){return!1}get isHidden(){return!1}isComposite(){return!1}isLine(){return!1}isText(){return!1}isBlock(){return!1}get domAttrs(){return null}sync(e){if(this.flags|=2,this.flags&4){this.flags&=-5;let t=this.domAttrs;t&&hd(this.dom,t)}}toString(){return this.constructor.name+(this.children.length?`(${this.children})`:"")+(this.breakAfter?"#":"")}destroy(){this.parent=null}setDOM(e){this.dom=e,e.cmTile=this}get posAtStart(){return this.parent?this.parent.posBefore(this):0}get posAtEnd(){return this.posAtStart+this.length}posBefore(e,t=this.posAtStart){let n=t;for(let s of this.children){if(s==e)return n;n+=s.length+s.breakAfter}throw new RangeError("Invalid child in posBefore")}posAfter(e){return this.posBefore(e)+e.length}covers(e){return!0}coordsIn(e,t){return null}domPosFor(e,t){let n=jt(this.dom),s=this.length?e>0:t>0;return new ot(this.parent.dom,n+(s?1:0),e==0||e==this.length)}markDirty(e){this.flags&=-3,e&&(this.flags|=4),this.parent&&this.parent.flags&2&&this.parent.markDirty(!1)}get overrideDOMText(){return null}get root(){for(let e=this;e;e=e.parent)if(e instanceof xs)return e;return null}static get(e){return e.cmTile}}class vs extends pe{constructor(e){super(e,0),this._children=[]}isComposite(){return!0}get children(){return this._children}get lastChild(){return this.children.length?this.children[this.children.length-1]:null}append(e){this.children.push(e),e.parent=this}sync(e){if(this.flags&2)return;super.sync(e);let t=this.dom,n=null,s,r=(e==null?void 0:e.node)==t?e:null,o=0;for(let l of this.children){if(l.sync(e),o+=l.length+l.breakAfter,s=n?n.nextSibling:t.firstChild,r&&s!=l.dom&&(r.written=!0),l.dom.parentNode==t)for(;s&&s!=l.dom;)s=yl(s);else t.insertBefore(l.dom,s);n=l.dom}for(s=n?n.nextSibling:t.firstChild,r&&s&&(r.written=!0);s;)s=yl(s);this.length=o}}function yl(i){let e=i.nextSibling;return i.parentNode.removeChild(i),e}class xs extends vs{constructor(e,t){super(t),this.view=e}owns(e){for(;e;e=e.parent)if(e==this)return!0;return!1}isBlock(){return!0}nearest(e){for(;;){if(!e)return null;let t=pe.get(e);if(t&&this.owns(t))return t;e=e.parentNode}}blockTiles(e){for(let t=[],n=this,s=0,r=0;;)if(s==n.children.length){if(!t.length)return;n=n.parent,n.breakAfter&&r++,s=t.pop()}else{let o=n.children[s++];if(o instanceof Ot)t.push(s),n=o,s=0;else{let l=r+o.length,a=e(o,r);if(a!==void 0)return a;r=l+o.breakAfter}}}resolveBlock(e,t){let n,s=-1,r,o=-1;if(this.blockTiles((l,a)=>{let c=a+l.length;if(e>=a&&e<=c){if(l.isWidget()&&t>=-1&&t<=1){if(l.flags&32)return!0;l.flags&16&&(n=void 0)}(a<e||e==c&&(t<-1?l.length:l.covers(1)))&&(!n||!l.isWidget()&&n.isWidget())&&(n=l,s=e-a),(c>e||e==a&&(t>1?l.length:l.covers(-1)))&&(!r||!l.isWidget()&&r.isWidget())&&(r=l,o=e-a)}}),!n&&!r)throw new Error("No tile at position "+e);return n&&t<0||!r?{tile:n,offset:s}:{tile:r,offset:o}}}class Ot extends vs{constructor(e,t){super(e),this.wrapper=t}isBlock(){return!0}covers(e){return this.children.length?e<0?this.children[0].covers(-1):this.lastChild.covers(1):!1}get domAttrs(){return this.wrapper.attributes}static of(e,t){let n=new Ot(t||document.createElement(e.tagName),e);return t||(n.flags|=4),n}}class Mn extends vs{constructor(e,t){super(e),this.attrs=t}isLine(){return!0}static start(e,t,n){let s=new Mn(t||document.createElement("div"),e);return(!t||!n)&&(s.flags|=4),s}get domAttrs(){return this.attrs}resolveInline(e,t,n){let s=null,r=-1,o=null,l=-1;function a(h,u){for(let d=0,f=0;d<h.children.length&&f<=u;d++){let p=h.children[d],m=f+p.length;m>=u&&(p.isComposite()?a(p,u-f):(!o||o.isHidden&&(t>0||n&&Bd(o,p)))&&(m>u||p.flags&32)?(o=p,l=u-f):(f<u||p.flags&16&&!p.isHidden)&&(s=p,r=u-f)),f=m}}a(this,e);let c=(t<0?s:o)||s||o;return c?{tile:c,offset:c==s?r:l}:null}coordsIn(e,t){let n=this.resolveInline(e,t,!0);return n?n.tile.coordsIn(Math.max(0,n.offset),t):Ed(this)}domIn(e,t){let n=this.resolveInline(e,t);if(n){let{tile:s,offset:r}=n;if(this.dom.contains(s.dom))return s.isText()?new ot(s.dom,Math.min(s.dom.nodeValue.length,r)):s.domPosFor(r,s.flags&16?1:s.flags&32?-1:t);let o=n.tile.parent,l=!1;for(let a of o.children){if(l)return new ot(a.dom,0);a==n.tile&&(l=!0)}}return new ot(this.dom,0)}}function Ed(i){let e=i.dom.lastChild;if(!e)return i.dom.getBoundingClientRect();let t=Ki(e);return t[t.length-1]||null}function Bd(i,e){let t=i.coordsIn(0,1),n=e.coordsIn(0,1);return t&&n&&n.top<t.bottom}class qe extends vs{constructor(e,t){super(e),this.mark=t}get domAttrs(){return this.mark.attrs}static of(e,t){let n=new qe(t||document.createElement(e.tagName),e);return t||(n.flags|=4),n}}class nn extends pe{constructor(e,t){super(e,t.length),this.text=t}sync(e){this.flags&2||(super.sync(e),this.dom.nodeValue!=this.text&&(e&&e.node==this.dom&&(e.written=!0),this.dom.nodeValue=this.text))}isText(){return!0}toString(){return JSON.stringify(this.text)}coordsIn(e,t){let n=this.dom.nodeValue.length;e>n&&(e=n);let s=e,r=e,o=0;e==0&&t<0||e==n&&t>=0?O.chrome||O.gecko||(e?(s--,o=1):r<n&&(r++,o=-1)):t<0?s--:r<n&&r++;let l=di(this.dom,s,r).getClientRects();if(!l.length)return null;let a=l[(o?o<0:t>=0)?0:l.length-1];return O.safari&&!o&&a.width==0&&(a=Array.prototype.find.call(l,c=>c.width)||a),o?rs(a,o<0):a||null}static of(e,t){let n=new nn(t||document.createTextNode(e),e);return t||(n.flags|=2),n}}class cn extends pe{constructor(e,t,n,s){super(e,t,s),this.widget=n}isWidget(){return!0}get isHidden(){return this.widget.isHidden}covers(e){return this.flags&48?!1:(this.flags&(e<0?64:128))>0}coordsIn(e,t){return this.coordsInWidget(e,t,!1)}coordsInWidget(e,t,n){let s=this.widget.coordsAt(this.dom,e,t);if(s)return s;if(n)return rs(this.dom.getBoundingClientRect(),this.length?e==0:t<=0);{let r=this.dom.getClientRects(),o=null;if(!r.length)return null;let l=this.flags&16?!0:this.flags&32?!1:e>0;for(let a=l?r.length-1:0;o=r[a],!(e>0?a==0:a==r.length-1||o.top<o.bottom);a+=l?-1:1);return rs(o,!l)}}get overrideDOMText(){if(!this.length)return ee.empty;let{root:e}=this;if(!e)return ee.empty;let t=this.posAtStart;return e.view.state.doc.slice(t,t+this.length)}destroy(){super.destroy(),this.widget.destroy(this.dom)}static of(e,t,n,s,r){return r||(r=e.toDOM(t),e.editable||(r.contentEditable="false")),new cn(r,n,e,s)}}class ls extends pe{constructor(e){let t=document.createElement("img");t.className="cm-widgetBuffer",t.setAttribute("aria-hidden","true"),super(t,0,e)}get isHidden(){return!0}get overrideDOMText(){return ee.empty}coordsIn(e){return this.dom.getBoundingClientRect()}}class Dd{constructor(e){this.index=0,this.beforeBreak=!1,this.parents=[],this.tile=e}advance(e,t,n){let{tile:s,index:r,beforeBreak:o,parents:l}=this;for(;e||t>0;)if(s.isComposite())if(o){if(!e)break;n&&n.break(),e--,o=!1}else if(r==s.children.length){if(!e&&!l.length)break;n&&n.leave(s),o=!!s.breakAfter,{tile:s,index:r}=l.pop(),r++}else{let a=s.children[r],c=a.breakAfter;(t>0?a.length<=e:a.length<e)&&(!n||n.skip(a,0,a.length)!==!1||!a.isComposite)?(o=!!c,r++,e-=a.length):(l.push({tile:s,index:r}),s=a,r=0,n&&a.isComposite()&&n.enter(a))}else if(r==s.length)o=!!s.breakAfter,{tile:s,index:r}=l.pop(),r++;else if(e){let a=Math.min(e,s.length-r);n&&n.skip(s,r,r+a),e-=a,r+=a}else break;return this.tile=s,this.index=r,this.beforeBreak=o,this}get root(){return this.parents.length?this.parents[0].tile:this.tile}}class Pd{constructor(e,t,n,s){this.from=e,this.to=t,this.wrapper=n,this.rank=s}}class Od{constructor(e,t,n){this.cache=e,this.root=t,this.blockWrappers=n,this.curLine=null,this.lastBlock=null,this.afterWidget=null,this.pos=0,this.wrappers=[],this.wrapperPos=0}addText(e,t,n,s){var r;this.flushBuffer();let o=this.ensureMarks(t,n),l=o.lastChild;if(l&&l.isText()&&!(l.flags&8)&&l.length+e.length<512){this.cache.reused.set(l,2);let a=o.children[o.children.length-1]=new nn(l.dom,l.text+e);a.parent=o}else o.append(s||nn.of(e,(r=this.cache.find(nn))===null||r===void 0?void 0:r.dom));this.pos+=e.length,this.afterWidget=null}addComposition(e,t){let n=this.curLine;n.dom!=t.line.dom&&(n.setDOM(this.cache.reused.has(t.line)?Vs(t.line.dom):t.line.dom),this.cache.reused.set(t.line,2));let s=n;for(let l=t.marks.length-1;l>=0;l--){let a=t.marks[l],c=s.lastChild;if(c instanceof qe&&c.mark.eq(a.mark))c.dom!=a.dom&&c.setDOM(Vs(a.dom)),s=c;else{if(this.cache.reused.get(a)){let u=pe.get(a.dom);u&&u.setDOM(Vs(a.dom))}let h=qe.of(a.mark,a.dom);s.append(h),s=h}this.cache.reused.set(a,2)}let r=pe.get(e.text);r&&this.cache.reused.set(r,2);let o=new nn(e.text,e.text.nodeValue);o.flags|=8,s.append(o)}addInlineWidget(e,t,n){let s=this.afterWidget&&e.flags&48&&(this.afterWidget.flags&48)==(e.flags&48);s||this.flushBuffer();let r=this.ensureMarks(t,n);!s&&!(e.flags&16)&&r.append(this.getBuffer(1)),r.append(e),this.pos+=e.length,this.afterWidget=e}addMark(e,t,n){this.flushBuffer(),this.ensureMarks(t,n).append(e),this.pos+=e.length,this.afterWidget=null}addBlockWidget(e){this.getBlockPos().append(e),this.pos+=e.length,this.lastBlock=e,this.endLine()}continueWidget(e){let t=this.afterWidget||this.lastBlock;t.length+=e,this.pos+=e}addLineStart(e,t){var n;e||(e=Tc);let s=Mn.start(e,t||((n=this.cache.find(Mn))===null||n===void 0?void 0:n.dom),!!t);this.getBlockPos().append(this.lastBlock=this.curLine=s)}addLine(e){this.getBlockPos().append(e),this.pos+=e.length,this.lastBlock=e,this.endLine()}addBreak(){this.lastBlock.flags|=1,this.endLine(),this.pos++}addLineStartIfNotCovered(e){this.blockPosCovered()||this.addLineStart(e)}ensureLine(e){this.curLine||this.addLineStart(e)}ensureMarks(e,t){var n;let s=this.curLine;for(let r=e.length-1;r>=0;r--){let o=e[r],l;if(t>0&&(l=s.lastChild)&&l instanceof qe&&l.mark.eq(o))s=l,t--;else{let a=qe.of(o,(n=this.cache.find(qe,c=>c.mark.eq(o)))===null||n===void 0?void 0:n.dom);s.append(a),s=a,t=0}}return s}endLine(){if(this.curLine){this.flushBuffer();let e=this.curLine.lastChild;(!e||!wl(this.curLine,!1)||e.dom.nodeName!="BR"&&e.isWidget()&&!(O.ios&&wl(this.curLine,!0)))&&this.curLine.append(this.cache.findWidget($s,0,32)||new cn($s.toDOM(),0,$s,32)),this.curLine=this.afterWidget=null}}updateBlockWrappers(){this.wrapperPos>this.pos+1e4&&(this.blockWrappers.goto(this.pos),this.wrappers.length=0);for(let e=this.wrappers.length-1;e>=0;e--)this.wrappers[e].to<this.pos&&this.wrappers.splice(e,1);for(let e=this.blockWrappers;e.value&&e.from<=this.pos;e.next())if(e.to>=this.pos){let t=new Pd(e.from,e.to,e.value,e.rank),n=this.wrappers.length;for(;n>0&&(this.wrappers[n-1].rank-t.rank||this.wrappers[n-1].to-t.to)<0;)n--;this.wrappers.splice(n,0,t)}this.wrapperPos=this.pos}getBlockPos(){var e;this.updateBlockWrappers();let t=this.root;for(let n of this.wrappers){let s=t.lastChild;if(n.from<this.pos&&s instanceof Ot&&s.wrapper.eq(n.wrapper))t=s;else{let r=Ot.of(n.wrapper,(e=this.cache.find(Ot,o=>o.wrapper.eq(n.wrapper)))===null||e===void 0?void 0:e.dom);t.append(r),t=r}}return t}blockPosCovered(){let e=this.lastBlock;return e!=null&&!e.breakAfter&&(!e.isWidget()||(e.flags&160)>0)}getBuffer(e){let t=2|(e<0?16:32),n=this.cache.find(ls,void 0,1);return n&&(n.flags=t),n||new ls(t)}flushBuffer(){this.afterWidget&&!(this.afterWidget.flags&32)&&(this.afterWidget.parent.append(this.getBuffer(-1)),this.afterWidget=null)}}class Ld{constructor(e){this.skipCount=0,this.text="",this.textOff=0,this.cursor=e.iter()}skip(e){this.textOff+e<=this.text.length?this.textOff+=e:(this.skipCount+=e-(this.text.length-this.textOff),this.text="",this.textOff=0)}next(e){if(this.textOff==this.text.length){let{value:s,lineBreak:r,done:o}=this.cursor.next(this.skipCount);if(this.skipCount=0,o)throw new Error("Ran out of text content when drawing inline views");this.text=s;let l=this.textOff=Math.min(e,s.length);return r?null:s.slice(0,l)}let t=Math.min(this.text.length,this.textOff+e),n=this.text.slice(this.textOff,t);return this.textOff=t,n}}const as=[cn,Mn,nn,qe,ls,Ot,xs];for(let i=0;i<as.length;i++)as[i].bucket=i;class Rd{constructor(e){this.view=e,this.buckets=as.map(()=>[]),this.index=as.map(()=>0),this.reused=new Map}add(e){let t=e.constructor.bucket,n=this.buckets[t];n.length<6?n.push(e):n[this.index[t]=(this.index[t]+1)%6]=e}find(e,t,n=2){let s=e.bucket,r=this.buckets[s],o=this.index[s];for(let l=r.length-1;l>=0;l--){let a=(l+o)%r.length,c=r[a];if((!t||t(c))&&!this.reused.has(c))return r.splice(a,1),a<o&&this.index[s]--,this.reused.set(c,n),c}return null}findWidget(e,t,n){let s=this.buckets[0];if(s.length)for(let r=0,o=0;;r++){if(r==s.length){if(o)return null;o=1,r=0}let l=s[r];if(!this.reused.has(l)&&(o==0?l.widget.compare(e):l.widget.constructor==e.constructor&&e.updateDOM(l.dom,this.view,l.widget)))return s.splice(r,1),r<this.index[0]&&this.index[0]--,l.widget==e&&l.length==t&&(l.flags&497)==n?(this.reused.set(l,1),l):(this.reused.set(l,2),new cn(l.dom,t,e,l.flags&-498|n))}}reuse(e){return this.reused.set(e,1),e}maybeReuse(e,t=2){if(!this.reused.has(e))return this.reused.set(e,t),e.dom}clear(){for(let e=0;e<this.buckets.length;e++)this.buckets[e].length=this.index[e]=0}}class Id{constructor(e,t,n,s,r){this.view=e,this.decorations=s,this.disallowBlockEffectsFor=r,this.openWidget=!1,this.openMarks=0,this.cache=new Rd(e),this.text=new Ld(e.state.doc),this.builder=new Od(this.cache,new xs(e,e.contentDOM),Z.iter(n)),this.cache.reused.set(t,2),this.old=new Dd(t),this.reuseWalker={skip:(o,l,a)=>{if(this.cache.add(o),o.isComposite())return!1},enter:o=>this.cache.add(o),leave:()=>{},break:()=>{}}}run(e,t){let n=t&&this.getCompositionContext(t.text);for(let s=0,r=0,o=0;;){let l=o<e.length?e[o++]:null,a=l?l.fromA:this.old.root.length;if(a>s){let c=a-s;this.preserve(c,!o,!l),s=a,r+=c}if(!l)break;t&&l.fromA<=t.range.fromA&&l.toA>=t.range.toA?(this.forward(l.fromA,t.range.fromA,t.range.fromA<t.range.toA?1:-1),this.emit(r,t.range.fromB),this.cache.clear(),this.builder.addComposition(t,n),this.text.skip(t.range.toB-t.range.fromB),this.forward(t.range.fromA,l.toA),this.emit(t.range.toB,l.toB)):(this.forward(l.fromA,l.toA),this.emit(r,l.toB)),r=l.toB,s=l.toA}return this.builder.curLine&&this.builder.endLine(),this.builder.root}preserve(e,t,n){let s=Nd(this.old),r=this.openMarks;this.old.advance(e,n?1:-1,{skip:(o,l,a)=>{if(o.isWidget())if(this.openWidget)this.builder.continueWidget(a-l);else{let c=a>0||l<o.length?cn.of(o.widget,this.view,a-l,o.flags&496,this.cache.maybeReuse(o)):this.cache.reuse(o);c.flags&256?(c.flags&=-2,this.builder.addBlockWidget(c)):(this.builder.ensureLine(null),this.builder.addInlineWidget(c,s,r),r=s.length)}else if(o.isText())this.builder.ensureLine(null),!l&&a==o.length&&!this.cache.reused.has(o)?this.builder.addText(o.text,s,r,this.cache.reuse(o)):(this.cache.add(o),this.builder.addText(o.text.slice(l,a),s,r)),r=s.length;else if(o.isLine())o.flags&=-2,this.cache.reused.set(o,1),this.builder.addLine(o);else if(o instanceof ls)this.cache.add(o);else if(o instanceof qe)this.builder.ensureLine(null),this.builder.addMark(o,s,r),this.cache.reused.set(o,1),r=s.length;else return!1;this.openWidget=!1},enter:o=>{o.isLine()?this.builder.addLineStart(o.attrs,this.cache.maybeReuse(o)):(this.cache.add(o),o instanceof qe&&s.unshift(o.mark)),this.openWidget=!1},leave:o=>{o.isLine()?s.length&&(s.length=r=0):o instanceof qe&&(s.shift(),r=Math.min(r,s.length))},break:()=>{this.builder.addBreak(),this.openWidget=!1}}),this.text.skip(e)}emit(e,t){let n=null,s=this.builder,r=0,o=Z.spans(this.decorations,e,t,{point:(l,a,c,h,u,d)=>{if(c instanceof ln){if(this.disallowBlockEffectsFor[d]){if(c.block)throw new RangeError("Block decorations may not be specified via plugins");if(a>this.view.state.doc.lineAt(l).to)throw new RangeError("Decorations that replace line breaks may not be specified via plugins")}if(r=h.length,u>h.length)s.continueWidget(a-l);else{let f=c.widget||(c.block?En.block:En.inline),p=zd(c),m=this.cache.findWidget(f,a-l,p)||cn.of(f,this.view,a-l,p);c.block?(c.startSide>0&&s.addLineStartIfNotCovered(n),s.addBlockWidget(m)):(s.ensureLine(n),s.addInlineWidget(m,h,u))}n=null}else n=qd(n,c);a>l&&this.text.skip(a-l)},span:(l,a,c,h)=>{for(let u=l;u<a;){let d=this.text.next(Math.min(512,a-u));d==null?(s.addLineStartIfNotCovered(n),s.addBreak(),u++):(s.ensureLine(n),s.addText(d,c,u==l?h:c.length),u+=d.length),n=null}}});s.addLineStartIfNotCovered(n),this.openWidget=o>r,this.openMarks=o}forward(e,t,n=1){t-e<=10?this.old.advance(t-e,n,this.reuseWalker):(this.old.advance(5,-1,this.reuseWalker),this.old.advance(t-e-10,-1),this.old.advance(5,n,this.reuseWalker))}getCompositionContext(e){let t=[],n=null;for(let s=e.parentNode;;s=s.parentNode){let r=pe.get(s);if(s==this.view.contentDOM)break;r instanceof qe?t.push(r):r!=null&&r.isLine()?n=r:r instanceof Ot||(s.nodeName=="DIV"&&!n&&s!=this.view.contentDOM?n=new Mn(s,Tc):n||t.push(qe.of(new vi({tagName:s.nodeName.toLowerCase(),attributes:ud(s)}),s)))}return{line:n,marks:t}}}function wl(i,e){let t=n=>{for(let s of n.children)if((e?s.isText():s.length)||t(s))return!0;return!1};return t(i)}function zd(i){let e=i.isReplace?(i.startSide<0?64:0)|(i.endSide>0?128:0):i.startSide>0?32:16;return i.block&&(e|=256),e}const Tc={class:"cm-line"};function qd(i,e){let t=e.spec.attributes,n=e.spec.class;return!t&&!n||(i||(i={class:"cm-line"}),t&&bo(t,i),n&&(i.class+=" "+n)),i}function Nd(i){let e=[];for(let t=i.parents.length;t>1;t--){let n=t==i.parents.length?i.tile:i.parents[t].tile;n instanceof qe&&e.push(n.mark)}return e}function Vs(i){let e=pe.get(i);return e&&e.setDOM(i.cloneNode()),i}class En extends ys{constructor(e){super(),this.tag=e}eq(e){return e.tag==this.tag}toDOM(){return document.createElement(this.tag)}updateDOM(e){return e.nodeName.toLowerCase()==this.tag}get isHidden(){return!0}}En.inline=new En("span");En.block=new En("div");const $s=new class extends ys{toDOM(){return document.createElement("br")}get isHidden(){return!0}get editable(){return!0}};class vl{constructor(e){this.view=e,this.decorations=[],this.blockWrappers=[],this.dynamicDecorationMap=[!1],this.domChanged=null,this.hasComposition=null,this.editContextFormatting=ye.none,this.lastCompositionAfterCursor=!1,this.minWidth=0,this.minWidthFrom=0,this.minWidthTo=0,this.impreciseAnchor=null,this.impreciseHead=null,this.forceSelection=!1,this.lastUpdate=Date.now(),this.updateDeco(),this.tile=new xs(e,e.contentDOM),this.updateInner([new Je(0,0,0,e.state.doc.length)],null)}update(e){var t;let n=e.changedRanges;this.minWidth>0&&n.length&&(n.every(({fromA:h,toA:u})=>u<this.minWidthFrom||h>this.minWidthTo)?(this.minWidthFrom=e.changes.mapPos(this.minWidthFrom,1),this.minWidthTo=e.changes.mapPos(this.minWidthTo,1)):this.minWidth=this.minWidthFrom=this.minWidthTo=0),this.updateEditContextFormatting(e);let s=-1;this.view.inputState.composing>=0&&!this.view.observer.editContext&&(!((t=this.domChanged)===null||t===void 0)&&t.newSel?s=this.domChanged.newSel.head:!Xd(e.changes,this.hasComposition)&&!e.selectionSet&&(s=e.state.selection.main.head));let r=s>-1?Hd(this.view,e.changes,s):null;if(this.domChanged=null,this.hasComposition){let{from:h,to:u}=this.hasComposition;n=new Je(h,u,e.changes.mapPos(h,-1),e.changes.mapPos(u,1)).addToSet(n.slice())}this.hasComposition=r?{from:r.range.fromB,to:r.range.toB}:null,(O.ie||O.chrome)&&!r&&e&&e.state.doc.lines!=e.startState.doc.lines&&(this.forceSelection=!0);let o=this.decorations,l=this.blockWrappers;this.updateDeco();let a=$d(o,this.decorations,e.changes);a.length&&(n=Je.extendWithRanges(n,a));let c=jd(l,this.blockWrappers,e.changes);return c.length&&(n=Je.extendWithRanges(n,c)),r&&!n.some(h=>h.fromA<=r.range.fromA&&h.toA>=r.range.toA)&&(n=r.range.addToSet(n.slice())),this.tile.flags&2&&n.length==0?!1:(this.updateInner(n,r),e.transactions.length&&(this.lastUpdate=Date.now()),!0)}updateInner(e,t){this.view.viewState.mustMeasureContent=!0;let{observer:n}=this.view;n.ignore(()=>{if(t||e.length){let o=this.tile,l=new Id(this.view,o,this.blockWrappers,this.decorations,this.dynamicDecorationMap);t&&pe.get(t.text)&&l.cache.reused.set(pe.get(t.text),2),this.tile=l.run(e,t),Rr(o,l.cache.reused)}this.tile.dom.style.height=this.view.viewState.contentHeight/this.view.scaleY+"px",this.tile.dom.style.flexBasis=this.minWidth?this.minWidth+"px":"";let r=O.chrome||O.ios?{node:n.selectionRange.focusNode,written:!1}:void 0;this.tile.sync(r),r&&(r.written||n.selectionRange.focusNode!=r.node||!this.tile.dom.contains(r.node))&&(this.forceSelection=!0),this.tile.dom.style.height=""});let s=[];if(this.view.viewport.from||this.view.viewport.to<this.view.state.doc.length)for(let r of this.tile.children)r.isWidget()&&r.widget instanceof Us&&s.push(r.dom);n.updateGaps(s)}updateEditContextFormatting(e){this.editContextFormatting=this.editContextFormatting.map(e.changes);for(let t of e.transactions)for(let n of t.effects)n.is(xc)&&(this.editContextFormatting=n.value)}updateSelection(e=!1,t=!1){(e||!this.view.observer.selectionRange.focusNode)&&this.view.observer.readSelectionRange();let{dom:n}=this.tile,s=this.view.root.activeElement,r=s==n,o=!r&&!(this.view.state.facet(Dt)||n.tabIndex>-1)&&ti(n,this.view.observer.selectionRange)&&!(s&&n.contains(s));if(!(r||t||o))return;let l=this.forceSelection;this.forceSelection=!1;let a=this.view.state.selection.main,c,h;if(a.empty?h=c=this.inlineDOMNearPos(a.anchor,a.assoc||1):(h=this.inlineDOMNearPos(a.head,a.head==a.from?1:-1),c=this.inlineDOMNearPos(a.anchor,a.anchor==a.from?1:-1)),O.gecko&&a.empty&&!this.hasComposition&&Fd(c)){let d=document.createTextNode("");this.view.observer.ignore(()=>c.node.insertBefore(d,c.node.childNodes[c.offset]||null)),c=h=new ot(d,0),l=!0}let u=this.view.observer.selectionRange;(l||!u.focusNode||(!ni(c.node,c.offset,u.anchorNode,u.anchorOffset)||!ni(h.node,h.offset,u.focusNode,u.focusOffset))&&!this.suppressWidgetCursorChange(u,a))&&(this.view.observer.ignore(()=>{O.android&&O.chrome&&n.contains(u.focusNode)&&Kd(u.focusNode,n)&&(n.blur(),n.focus({preventScroll:!0}));let d=ui(this.view.root);if(d)if(a.empty){if(O.gecko){let f=Wd(c.node,c.offset);if(f&&f!=3){let p=(f==1?rc:oc)(c.node,c.offset);p&&(c=new ot(p.node,p.offset))}}d.collapse(c.node,c.offset),a.bidiLevel!=null&&d.caretBidiLevel!==void 0&&(d.caretBidiLevel=a.bidiLevel)}else if(d.extend){d.collapse(c.node,c.offset);try{d.extend(h.node,h.offset)}catch{}}else{let f=document.createRange();a.anchor>a.head&&([c,h]=[h,c]),f.setEnd(h.node,h.offset),f.setStart(c.node,c.offset),d.removeAllRanges(),d.addRange(f)}o&&this.view.root.activeElement==n&&(n.blur(),s&&s.focus())}),this.view.observer.setSelectionRange(c,h)),this.impreciseAnchor=c.precise?null:new ot(u.anchorNode,u.anchorOffset),this.impreciseHead=h.precise?null:new ot(u.focusNode,u.focusOffset)}suppressWidgetCursorChange(e,t){return this.hasComposition&&t.empty&&ni(e.focusNode,e.focusOffset,e.anchorNode,e.anchorOffset)&&this.posFromDOM(e.focusNode,e.focusOffset)==t.head}enforceCursorAssoc(){if(this.hasComposition)return;let{view:e}=this,t=e.state.selection.main,n=ui(e.root),{anchorNode:s,anchorOffset:r}=e.observer.selectionRange;if(!n||!t.empty||!t.assoc||!n.modify)return;let o=this.lineAt(t.head,t.assoc);if(!o)return;let l=o.posAtStart;if(t.head==l||t.head==l+o.length)return;let a=this.coordsAt(t.head,-1),c=this.coordsAt(t.head,1);if(!a||!c||a.bottom>c.top)return;let h=this.domAtPos(t.head+t.assoc,t.assoc);n.collapse(h.node,h.offset),n.modify("move",t.assoc<0?"forward":"backward","lineboundary"),e.observer.readSelectionRange();let u=e.observer.selectionRange;e.docView.posFromDOM(u.anchorNode,u.anchorOffset)!=t.from&&n.collapse(s,r)}posFromDOM(e,t){let n=this.tile.nearest(e);if(!n)return this.tile.dom.compareDocumentPosition(e)&2?0:this.view.state.doc.length;let s=n.posAtStart;if(n.isComposite()){let r;if(e==n.dom)r=n.dom.childNodes[t];else{let o=Lt(e)==0?0:t==0?-1:1;for(;;){let l=e.parentNode;if(l==n.dom)break;o==0&&l.firstChild!=l.lastChild&&(e==l.firstChild?o=-1:o=1),e=l}o<0?r=e:r=e.nextSibling}if(r==n.dom.firstChild)return s;for(;r&&!pe.get(r);)r=r.nextSibling;if(!r)return s+n.length;for(let o=0,l=s;;o++){let a=n.children[o];if(a.dom==r)return l;l+=a.length+a.breakAfter}}else return n.isText()?e==n.dom?s+t:s+(t?n.length:0):s}domAtPos(e,t){let{tile:n,offset:s}=this.tile.resolveBlock(e,t);return n.isWidget()?n.domPosFor(e,t):n.domIn(s,t)}inlineDOMNearPos(e,t){let n,s=-1,r=!1,o,l=-1,a=!1;return this.tile.blockTiles((c,h)=>{if(c.isWidget()){if(c.flags&32&&h>=e)return!0;c.flags&16&&(r=!0)}else{let u=h+c.length;if(h<=e&&(n=c,s=e-h,r=u<e),u>=e&&!o&&(o=c,l=e-h,a=h>e),h>e&&o)return!0}}),!n&&!o?this.domAtPos(e,t):(r&&o?n=null:a&&n&&(o=null),n&&t<0||!o?n.domIn(s,t):o.domIn(l,t))}coordsAt(e,t){let{tile:n,offset:s}=this.tile.resolveBlock(e,t);return n.isWidget()?n.widget instanceof Us?null:n.coordsInWidget(s,t,!0):n.coordsIn(s,t)}lineAt(e,t){let{tile:n}=this.tile.resolveBlock(e,t);return n.isLine()?n:null}coordsForChar(e){let{tile:t,offset:n}=this.tile.resolveBlock(e,1);if(!t.isLine())return null;function s(r,o){if(r.isComposite())for(let l of r.children){if(l.length>=o){let a=s(l,o);if(a)return a}if(o-=l.length,o<0)break}else if(r.isText()&&o<r.length){let l=Ee(r.text,o);if(l==o)return null;let a=di(r.dom,o,l).getClientRects();for(let c=0;c<a.length;c++){let h=a[c];if(c==a.length-1||h.top<h.bottom&&h.left<h.right)return h}}return null}return s(t,n)}measureVisibleLineHeights(e){let t=[],{from:n,to:s}=e,r=this.view.contentDOM.clientWidth,o=r>Math.max(this.view.scrollDOM.clientWidth,this.minWidth)+1,l=-1,a=this.view.textDirection==de.LTR,c=0,h=(u,d,f)=>{for(let p=0;p<u.children.length&&!(d>s);p++){let m=u.children[p],g=d+m.length,b=m.dom.getBoundingClientRect(),{height:x}=b;if(f&&!p&&(c+=b.top-f.top),m instanceof Ot)g>n&&h(m,d,b);else if(d>=n&&(c>0&&t.push(-c),t.push(x+c),c=0,o)){let S=m.dom.lastChild,R=S?Ki(S):[];if(R.length){let k=R[R.length-1],C=a?k.right-b.left:b.right-k.left;C>l&&(l=C,this.minWidth=r,this.minWidthFrom=d,this.minWidthTo=g)}}f&&p==u.children.length-1&&(c+=f.bottom-b.bottom),d=g+m.breakAfter}};return h(this.tile,0,null),t}textDirectionAt(e){let{tile:t}=this.tile.resolveBlock(e,1);return getComputedStyle(t.dom).direction=="rtl"?de.RTL:de.LTR}measureTextSize(){let e=this.tile.blockTiles(o=>{if(o.isLine()&&o.children.length&&o.length<=20){let l=0,a;for(let c of o.children){if(!c.isText()||/[^ -~]/.test(c.text))return;let h=Ki(c.dom);if(h.length!=1)return;l+=h[0].width,a=h[0].height}if(l)return{lineHeight:o.dom.getBoundingClientRect().height,charWidth:l/o.length,textHeight:a}}});if(e)return e;let t=document.createElement("div"),n,s,r;return t.className="cm-line",t.style.width="99999px",t.style.position="absolute",t.textContent="abc def ghi jkl mno pqr stu",this.view.observer.ignore(()=>{this.tile.dom.appendChild(t);let o=Ki(t.firstChild)[0];n=t.getBoundingClientRect().height,s=o&&o.width?o.width/27:7,r=o&&o.height?o.height:n,t.remove()}),{lineHeight:n,charWidth:s,textHeight:r}}computeBlockGapDeco(){let e=[],t=this.view.viewState;for(let n=0,s=0;;s++){let r=s==t.viewports.length?null:t.viewports[s],o=r?r.from-1:this.view.state.doc.length;if(o>n){let l=(t.lineBlockAt(o).bottom-t.lineBlockAt(n).top)/this.view.scaleY;e.push(ye.replace({widget:new Us(l),block:!0,inclusive:!0,isBlockGap:!0}).range(n,o))}if(!r)break;n=r.to+1}return ye.set(e)}updateDeco(){let e=1,t=this.view.state.facet(ws).map(r=>(this.dynamicDecorationMap[e++]=typeof r=="function")?r(this.view):r),n=!1,s=this.view.state.facet(_o).map((r,o)=>{let l=typeof r=="function";return l&&(n=!0),l?r(this.view):r});for(s.length&&(this.dynamicDecorationMap[e++]=n,t.push(Z.join(s))),this.decorations=[this.editContextFormatting,...t,this.computeBlockGapDeco(),this.view.viewState.lineGapDeco];e<this.decorations.length;)this.dynamicDecorationMap[e++]=!1;this.blockWrappers=this.view.state.facet(_c).map(r=>typeof r=="function"?r(this.view):r)}scrollIntoView(e){var t;if(e.isSnapshot){let h=this.view.viewState.lineBlockAt(e.range.head);this.view.scrollDOM.scrollTop=h.top-e.yMargin,this.view.scrollDOM.scrollLeft=e.xMargin;return}for(let h of this.view.state.facet(vc))try{if(h(this.view,e.range,e))return!0}catch(u){_t(this.view.state,u,"scroll handler")}let{range:n}=e,s=this.coordsAt(n.head,(t=n.assoc)!==null&&t!==void 0?t:n.empty?0:n.head>n.anchor?-1:1),r;if(!s)return;!n.empty&&(r=this.coordsAt(n.anchor,n.anchor>n.head?-1:1))&&(s={left:Math.min(s.left,r.left),top:Math.min(s.top,r.top),right:Math.max(s.right,r.right),bottom:Math.max(s.bottom,r.bottom)});let o=Ac(this.view),l={left:s.left-o.left,top:s.top-o.top,right:s.right+o.right,bottom:s.bottom+o.bottom},{offsetWidth:a,offsetHeight:c}=this.view.scrollDOM;if(pd(this.view.scrollDOM,l,n.head<n.anchor?-1:1,e.x,e.y,Math.max(Math.min(e.xMargin,a),-a),Math.max(Math.min(e.yMargin,c),-c),this.view.textDirection==de.LTR),window.visualViewport&&window.innerHeight-window.visualViewport.height>1&&(s.top>window.pageYOffset+window.visualViewport.offsetTop+window.visualViewport.height||s.bottom<window.pageYOffset+window.visualViewport.offsetTop)){let h=this.view.docView.lineAt(n.head,1);h&&h.dom.scrollIntoView({block:"nearest"})}}lineHasWidget(e){let t=n=>n.isWidget()||n.children.some(t);return t(this.tile.resolveBlock(e,1).tile)}destroy(){Rr(this.tile)}}function Rr(i,e){let t=e==null?void 0:e.get(i);if(t!=1){t==null&&i.destroy();for(let n of i.children)Rr(n,e)}}function Fd(i){return i.node.nodeType==1&&i.node.firstChild&&(i.offset==0||i.node.childNodes[i.offset-1].contentEditable=="false")&&(i.offset==i.node.childNodes.length||i.node.childNodes[i.offset].contentEditable=="false")}function Mc(i,e){let t=i.observer.selectionRange;if(!t.focusNode)return null;let n=rc(t.focusNode,t.focusOffset),s=oc(t.focusNode,t.focusOffset),r=n||s;if(s&&n&&s.node!=n.node){let l=pe.get(s.node);if(!l||l.isText()&&l.text!=s.node.nodeValue)r=s;else if(i.docView.lastCompositionAfterCursor){let a=pe.get(n.node);!a||a.isText()&&a.text!=n.node.nodeValue||(r=s)}}if(i.docView.lastCompositionAfterCursor=r!=n,!r)return null;let o=e-r.offset;return{from:o,to:o+r.node.nodeValue.length,node:r.node}}function Hd(i,e,t){let n=Mc(i,t);if(!n)return null;let{node:s,from:r,to:o}=n,l=s.nodeValue;if(/[\n\r]/.test(l)||i.state.doc.sliceString(n.from,n.to)!=l)return null;let a=e.invertedDesc;return{range:new Je(a.mapPos(r),a.mapPos(o),r,o),text:s}}function Wd(i,e){return i.nodeType!=1?0:(e&&i.childNodes[e-1].contentEditable=="false"?1:0)|(e<i.childNodes.length&&i.childNodes[e].contentEditable=="false"?2:0)}let Vd=class{constructor(){this.changes=[]}compareRange(e,t){Sn(e,t,this.changes)}comparePoint(e,t){Sn(e,t,this.changes)}boundChange(e){Sn(e,e,this.changes)}};function $d(i,e,t){let n=new Vd;return Z.compare(i,e,t,n),n.changes}class Ud{constructor(){this.changes=[]}compareRange(e,t){Sn(e,t,this.changes)}comparePoint(){}boundChange(e){Sn(e,e,this.changes)}}function jd(i,e,t){let n=new Ud;return Z.compare(i,e,t,n),n.changes}function Kd(i,e){for(let t=i;t&&t!=e;t=t.assignedSlot||t.parentNode)if(t.nodeType==1&&t.contentEditable=="false")return!0;return!1}function Xd(i,e){let t=!1;return e&&i.iterChangedRanges((n,s)=>{n<e.to&&s>e.from&&(t=!0)}),t}class Us extends ys{constructor(e){super(),this.height=e}toDOM(){let e=document.createElement("div");return e.className="cm-gap",this.updateDOM(e),e}eq(e){return e.height==this.height}updateDOM(e){return e.style.height=this.height+"px",!0}get editable(){return!0}get estimatedHeight(){return this.height}ignoreEvent(){return!1}}function Gd(i,e,t=1){let n=i.charCategorizer(e),s=i.doc.lineAt(e),r=e-s.from;if(s.length==0)return _.cursor(e);r==0?t=1:r==s.length&&(t=-1);let o=r,l=r;t<0?o=Ee(s.text,r,!1):l=Ee(s.text,r);let a=n(s.text.slice(o,l));for(;o>0;){let c=Ee(s.text,o,!1);if(n(s.text.slice(c,o))!=a)break;o=c}for(;l<s.length;){let c=Ee(s.text,l);if(n(s.text.slice(l,c))!=a)break;l=c}return _.range(o+s.from,l+s.from)}function Yd(i,e,t,n,s){let r=Math.round((n-e.left)*i.defaultCharacterWidth);if(i.lineWrapping&&t.height>i.defaultLineHeight*1.5){let l=i.viewState.heightOracle.textHeight,a=Math.floor((s-t.top-(i.defaultLineHeight-l)*.5)/l);r+=a*i.viewState.heightOracle.lineLength}let o=i.state.sliceDoc(t.from,t.to);return t.from+sd(o,r,i.state.tabSize)}function Ir(i,e,t){let n=i.lineBlockAt(e);if(Array.isArray(n.type)){let s;for(let r of n.type){if(r.from>e)break;if(!(r.to<e)){if(r.from<e&&r.to>e)return r;(!s||r.type==Ae.Text&&(s.type!=r.type||(t<0?r.from<e:r.to>e)))&&(s=r)}}return s||n}return n}function Jd(i,e,t,n){let s=Ir(i,e.head,e.assoc||-1),r=!n||s.type!=Ae.Text||!(i.lineWrapping||s.widgetLineBreaks)?null:i.coordsAtPos(e.assoc<0&&e.head>s.from?e.head-1:e.head);if(r){let o=i.dom.getBoundingClientRect(),l=i.textDirectionAt(s.from),a=i.posAtCoords({x:t==(l==de.LTR)?o.right-1:o.left+1,y:(r.top+r.bottom)/2});if(a!=null)return _.cursor(a,t?-1:1)}return _.cursor(t?s.to:s.from,t?-1:1)}function xl(i,e,t,n){let s=i.state.doc.lineAt(e.head),r=i.bidiSpans(s),o=i.textDirectionAt(s.from);for(let l=e,a=null;;){let c=Cd(s,r,o,l,t),h=uc;if(!c){if(s.number==(t?i.state.doc.lines:1))return l;h=`
`,s=i.state.doc.line(s.number+(t?1:-1)),r=i.bidiSpans(s),c=i.visualLineSide(s,!t)}if(a){if(!a(h))return l}else{if(!n)return c;a=n(h)}l=c}}function Qd(i,e,t){let n=i.state.charCategorizer(e),s=n(t);return r=>{let o=n(r);return s==Pt.Space&&(s=o),s==o}}function Zd(i,e,t,n){let s=e.head,r=t?1:-1;if(s==(t?i.state.doc.length:0))return _.cursor(s,e.assoc);let o=e.goalColumn,l,a=i.contentDOM.getBoundingClientRect(),c=i.coordsAtPos(s,e.assoc||((e.empty?t:e.head==e.from)?1:-1)),h=i.documentTop;if(c)o==null&&(o=c.left-a.left),l=r<0?c.top:c.bottom;else{let p=i.viewState.lineBlockAt(s);o==null&&(o=Math.min(a.right-a.left,i.defaultCharacterWidth*(s-p.from))),l=(r<0?p.top:p.bottom)+h}let u=a.left+o,d=i.viewState.heightOracle.textHeight>>1,f=n??d;for(let p=0;;p+=d){let m=l+(f+p)*r,g=zr(i,{x:u,y:m},!1,r);if(t?m>a.bottom:m<a.top)return _.cursor(g.pos,g.assoc);let b=i.coordsAtPos(g.pos,g.assoc),x=b?(b.top+b.bottom)/2:0;if(!b||(t?x>l:x<l))return _.cursor(g.pos,g.assoc,void 0,o)}}function ii(i,e,t){for(;;){let n=0;for(let s of i)s.between(e-1,e+1,(r,o,l)=>{if(e>r&&e<o){let a=n||t||(e-r<o-e?-1:1);e=a<0?r:o,n=a}});if(!n)return e}}function Ec(i,e){let t=null;for(let n=0;n<e.ranges.length;n++){let s=e.ranges[n],r=null;if(s.empty){let o=ii(i,s.from,0);o!=s.from&&(r=_.cursor(o,-1))}else{let o=ii(i,s.from,-1),l=ii(i,s.to,1);(o!=s.from||l!=s.to)&&(r=_.range(s.from==s.anchor?o:l,s.from==s.head?o:l))}r&&(t||(t=e.ranges.slice()),t[n]=r)}return t?_.create(t,e.mainIndex):e}function js(i,e,t){let n=ii(i.state.facet(ki).map(s=>s(i)),t.from,e.head>t.from?-1:1);return n==t.from?t:_.cursor(n,n<t.from?1:-1)}class xt{constructor(e,t){this.pos=e,this.assoc=t}}function zr(i,e,t,n){let s=i.contentDOM.getBoundingClientRect(),r=s.top+i.viewState.paddingTop,{x:o,y:l}=e,a=l-r,c;for(;;){if(a<0)return new xt(0,1);if(a>i.viewState.docHeight)return new xt(i.state.doc.length,-1);if(c=i.elementAtHeight(a),n==null)break;if(c.type==Ae.Text){if(n<0?c.to<i.viewport.from:c.from>i.viewport.to)break;let d=i.docView.coordsAt(n<0?c.from:c.to,n>0?-1:1);if(d&&(n<0?d.top<=a+r:d.bottom>=a+r))break}let u=i.viewState.heightOracle.textHeight/2;a=n>0?c.bottom+u:c.top-u}if(i.viewport.from>=c.to||i.viewport.to<=c.from){if(t)return null;if(c.type==Ae.Text){let u=Yd(i,s,c,o,l);return new xt(u,u==c.from?1:-1)}}if(c.type!=Ae.Text)return a<(c.top+c.bottom)/2?new xt(c.from,1):new xt(c.to,-1);let h=i.docView.lineAt(c.from,2);return(!h||h.length!=c.length)&&(h=i.docView.lineAt(c.from,-2)),new ef(i,o,l,i.textDirectionAt(c.from)).scanTile(h,c.from)}class ef{constructor(e,t,n,s){this.view=e,this.x=t,this.y=n,this.baseDir=s,this.line=null,this.spans=null}bidiSpansAt(e){return(!this.line||this.line.from>e||this.line.to<e)&&(this.line=this.view.state.doc.lineAt(e),this.spans=this.view.bidiSpans(this.line)),this}baseDirAt(e,t){let{line:n,spans:s}=this.bidiSpansAt(e);return s[kt.find(s,e-n.from,-1,t)].level==this.baseDir}dirAt(e,t){let{line:n,spans:s}=this.bidiSpansAt(e);return s[kt.find(s,e-n.from,-1,t)].dir}bidiIn(e,t){let{spans:n,line:s}=this.bidiSpansAt(e);return n.length>1||n.length&&(n[0].level!=this.baseDir||n[0].to+s.from<t)}scan(e,t){let n=0,s=e.length-1,r=new Set,o=this.bidiIn(e[0],e[s]),l,a,c=-1,h=1e9,u;e:for(;n<s;){let f=s-n,p=n+s>>1;t:if(r.has(p)){let g=n+Math.floor(Math.random()*f);for(let b=0;b<f;b++){if(!r.has(g)){p=g;break t}g++,g==s&&(g=n)}break e}r.add(p);let m=t(p);if(m)for(let g=0;g<m.length;g++){let b=m[g],x=0;if(!(b.width==0&&m.length>1)){if(b.bottom<this.y)(!l||l.bottom<b.bottom)&&(l=b),x=1;else if(b.top>this.y)(!a||a.top>b.top)&&(a=b),x=-1;else{let S=b.left>this.x?this.x-b.left:b.right<this.x?this.x-b.right:0,R=Math.abs(S);R<h&&(c=p,h=R,u=b),S&&(x=S<0==(this.baseDir==de.LTR)?-1:1)}x==-1&&(!o||this.baseDirAt(e[p],1))?s=p:x==1&&(!o||this.baseDirAt(e[p+1],-1))&&(n=p+1)}}}if(!u){let f=l&&(!a||this.y-l.bottom<a.top-this.y)?l:a;return this.y=(f.top+f.bottom)/2,this.scan(e,t)}let d=(o?this.dirAt(e[c],1):this.baseDir)==de.LTR;return{i:c,after:this.x>(u.left+u.right)/2==d}}scanText(e,t){let n=[];for(let r=0;r<e.length;r=Ee(e.text,r))n.push(t+r);n.push(t+e.length);let s=this.scan(n,r=>{let o=n[r]-t,l=n[r+1]-t;return di(e.dom,o,l).getClientRects()});return s.after?new xt(n[s.i+1],-1):new xt(n[s.i],1)}scanTile(e,t){if(!e.length)return new xt(t,1);if(e.children.length==1){let l=e.children[0];if(l.isText())return this.scanText(l,t);if(l.isComposite())return this.scanTile(l,t)}let n=[t];for(let l=0,a=t;l<e.children.length;l++)n.push(a+=e.children[l].length);let s=this.scan(n,l=>{let a=e.children[l];return a.flags&48?null:(a.dom.nodeType==1?a.dom:di(a.dom,0,a.length)).getClientRects()}),r=e.children[s.i],o=n[s.i];return r.isText()?this.scanText(r,o):r.isComposite()?this.scanTile(r,o):s.after?new xt(n[s.i+1],-1):new xt(o,1)}}const bn="￿";class tf{constructor(e,t){this.points=e,this.view=t,this.text="",this.lineSeparator=t.state.facet(te.lineSeparator)}append(e){this.text+=e}lineBreak(){this.text+=bn}readRange(e,t){if(!e)return this;let n=e.parentNode;for(let s=e;;){this.findPointBefore(n,s);let r=this.text.length;this.readNode(s);let o=pe.get(s),l=s.nextSibling;if(l==t){o!=null&&o.breakAfter&&!l&&n!=this.view.contentDOM&&this.lineBreak();break}let a=pe.get(l);(o&&a?o.breakAfter:(o?o.breakAfter:ss(s))||ss(l)&&(s.nodeName!="BR"||o!=null&&o.isWidget())&&this.text.length>r)&&!sf(l,t)&&this.lineBreak(),s=l}return this.findPointBefore(n,t),this}readTextNode(e){let t=e.nodeValue;for(let n of this.points)n.node==e&&(n.pos=this.text.length+Math.min(n.offset,t.length));for(let n=0,s=this.lineSeparator?null:/\r\n?|\n/g;;){let r=-1,o=1,l;if(this.lineSeparator?(r=t.indexOf(this.lineSeparator,n),o=this.lineSeparator.length):(l=s.exec(t))&&(r=l.index,o=l[0].length),this.append(t.slice(n,r<0?t.length:r)),r<0)break;if(this.lineBreak(),o>1)for(let a of this.points)a.node==e&&a.pos>this.text.length&&(a.pos-=o-1);n=r+o}}readNode(e){let t=pe.get(e),n=t&&t.overrideDOMText;if(n!=null){this.findPointInside(e,n.length);for(let s=n.iter();!s.next().done;)s.lineBreak?this.lineBreak():this.append(s.value)}else e.nodeType==3?this.readTextNode(e):e.nodeName=="BR"?e.nextSibling&&this.lineBreak():e.nodeType==1&&this.readRange(e.firstChild,null)}findPointBefore(e,t){for(let n of this.points)n.node==e&&e.childNodes[n.offset]==t&&(n.pos=this.text.length)}findPointInside(e,t){for(let n of this.points)(e.nodeType==3?n.node==e:e.contains(n.node))&&(n.pos=this.text.length+(nf(e,n.node,n.offset)?t:0))}}function nf(i,e,t){for(;;){if(!e||t<Lt(e))return!1;if(e==i)return!0;t=jt(e)+1,e=e.parentNode}}function sf(i,e){let t;for(;!(i==e||!i);i=i.nextSibling){let n=pe.get(i);if(!(n!=null&&n.isWidget()))return!1;n&&(t||(t=[])).push(n)}if(t)for(let n of t){let s=n.overrideDOMText;if(s!=null&&s.length)return!1}return!0}class kl{constructor(e,t){this.node=e,this.offset=t,this.pos=-1}}class rf{constructor(e,t,n,s){this.typeOver=s,this.bounds=null,this.text="",this.domChanged=t>-1;let{impreciseHead:r,impreciseAnchor:o}=e.docView,l=e.state.selection;if(e.state.readOnly&&t>-1)this.newSel=null;else if(t>-1&&(this.bounds=Bc(e.docView.tile,t,n,0))){let a=r||o?[]:lf(e),c=new tf(a,e);c.readRange(this.bounds.startDOM,this.bounds.endDOM),this.text=c.text,this.newSel=af(a,this.bounds.from)}else{let a=e.observer.selectionRange,c=r&&r.node==a.focusNode&&r.offset==a.focusOffset||!Br(e.contentDOM,a.focusNode)?l.main.head:e.docView.posFromDOM(a.focusNode,a.focusOffset),h=o&&o.node==a.anchorNode&&o.offset==a.anchorOffset||!Br(e.contentDOM,a.anchorNode)?l.main.anchor:e.docView.posFromDOM(a.anchorNode,a.anchorOffset),u=e.viewport;if((O.ios||O.chrome)&&l.main.empty&&c!=h&&(u.from>0||u.to<e.state.doc.length)){let d=Math.min(c,h),f=Math.max(c,h),p=u.from-d,m=u.to-f;(p==0||p==1||d==0)&&(m==0||m==-1||f==e.state.doc.length)&&(c=0,h=e.state.doc.length)}if(e.inputState.composing>-1&&l.ranges.length>1)this.newSel=l.replaceRange(_.range(h,c));else if(e.lineWrapping&&h==c&&!(l.main.empty&&l.main.head==c)&&e.inputState.lastTouchTime>Date.now()-100){let d=e.coordsAtPos(c,-1),f=0;d&&(f=e.inputState.lastTouchY<=d.bottom?-1:1),this.newSel=_.create([_.cursor(c,f)])}else this.newSel=_.single(h,c)}}}function Bc(i,e,t,n){if(i.isComposite()){let s=-1,r=-1,o=-1,l=-1;for(let a=0,c=n,h=n;a<i.children.length;a++){let u=i.children[a],d=c+u.length;if(c<e&&d>t)return Bc(u,e,t,c);if(d>=e&&s==-1&&(s=a,r=c),c>t&&u.dom.parentNode==i.dom){o=a,l=h;break}h=d,c=d+u.breakAfter}return{from:r,to:l<0?n+i.length:l,startDOM:(s?i.children[s-1].dom.nextSibling:null)||i.dom.firstChild,endDOM:o<i.children.length&&o>=0?i.children[o].dom:null}}else return i.isText()?{from:n,to:n+i.length,startDOM:i.dom,endDOM:i.dom.nextSibling}:null}function Dc(i,e){let t,{newSel:n}=e,{state:s}=i,r=s.selection.main,o=i.inputState.lastKeyTime>Date.now()-100?i.inputState.lastKeyCode:-1;if(e.bounds){let{from:l,to:a}=e.bounds,c=r.from,h=null;(o===8||O.android&&e.text.length<a-l)&&(c=r.to,h="end");let u=s.doc.sliceString(l,a,bn),d,f;!r.empty&&r.from>=l&&r.to<=a&&(e.typeOver||u!=e.text)&&u.slice(0,r.from-l)==e.text.slice(0,r.from-l)&&u.slice(r.to-l)==e.text.slice(d=e.text.length-(u.length-(r.to-l)))?t={from:r.from,to:r.to,insert:ee.of(e.text.slice(r.from-l,d).split(bn))}:(f=Pc(u,e.text,c-l,h))&&(O.chrome&&o==13&&f.toB==f.from+2&&e.text.slice(f.from,f.toB)==bn+bn&&f.toB--,t={from:l+f.from,to:l+f.toA,insert:ee.of(e.text.slice(f.from,f.toB).split(bn))})}else n&&(!i.hasFocus&&s.facet(Dt)||cs(n,r))&&(n=null);if(!t&&!n)return!1;if((O.mac||O.android)&&t&&t.from==t.to&&t.from==r.head-1&&/^\. ?$/.test(t.insert.toString())&&i.contentDOM.getAttribute("autocorrect")=="off"?(n&&t.insert.length==2&&(n=_.single(n.main.anchor-1,n.main.head-1)),t={from:t.from,to:t.to,insert:ee.of([t.insert.toString().replace("."," ")])}):s.doc.lineAt(r.from).to<r.to&&i.docView.lineHasWidget(r.to)&&i.inputState.insertingTextAt>Date.now()-50?t={from:r.from,to:r.to,insert:s.toText(i.inputState.insertingText)}:O.chrome&&t&&t.from==t.to&&t.from==r.head&&t.insert.toString()==`
 `&&i.lineWrapping&&(n&&(n=_.single(n.main.anchor-1,n.main.head-1)),t={from:r.from,to:r.to,insert:ee.of([" "])}),t)return So(i,t,n,o);if(n&&!cs(n,r)){let l=!1,a="select";return i.inputState.lastSelectionTime>Date.now()-50&&(i.inputState.lastSelectionOrigin=="select"&&(l=!0),a=i.inputState.lastSelectionOrigin,a=="select.pointer"&&(n=Ec(s.facet(ki).map(c=>c(i)),n))),i.dispatch({selection:n,scrollIntoView:l,userEvent:a}),!0}else return!1}function So(i,e,t,n=-1){if(O.ios&&i.inputState.flushIOSKey(e))return!0;let s=i.state.selection.main;if(O.android&&(e.to==s.to&&(e.from==s.from||e.from==s.from-1&&i.state.sliceDoc(e.from,s.from)==" ")&&e.insert.length==1&&e.insert.lines==2&&Cn(i.contentDOM,"Enter",13)||(e.from==s.from-1&&e.to==s.to&&e.insert.length==0||n==8&&e.insert.length<e.to-e.from&&e.to>s.head)&&Cn(i.contentDOM,"Backspace",8)||e.from==s.from&&e.to==s.to+1&&e.insert.length==0&&Cn(i.contentDOM,"Delete",46)))return!0;let r=e.insert.toString();i.inputState.composing>=0&&i.inputState.composing++;let o,l=()=>o||(o=of(i,e,t));return i.state.facet(gc).some(a=>a(i,e.from,e.to,r,l))||i.dispatch(l()),!0}function of(i,e,t){let n,s=i.state,r=s.selection.main,o=-1;if(e.from==e.to&&e.from<r.from||e.from>r.to){let a=e.from<r.from?-1:1,c=a<0?r.from:r.to,h=ii(s.facet(ki).map(u=>u(i)),c,a);e.from==h&&(o=h)}if(o>-1)n={changes:e,selection:_.cursor(e.from+e.insert.length,-1)};else if(e.from>=r.from&&e.to<=r.to&&e.to-e.from>=(r.to-r.from)/3&&(!t||t.main.empty&&t.main.from==e.from+e.insert.length)&&i.inputState.composing<0){let a=r.from<e.from?s.sliceDoc(r.from,e.from):"",c=r.to>e.to?s.sliceDoc(e.to,r.to):"";n=s.replaceSelection(i.state.toText(a+e.insert.sliceString(0,void 0,i.state.lineBreak)+c))}else{let a=s.changes(e),c=t&&t.main.to<=a.newLength?t.main:void 0;if(s.selection.ranges.length>1&&(i.inputState.composing>=0||i.inputState.compositionPendingChange)&&e.to<=r.to+10&&e.to>=r.to-10){let h=i.state.sliceDoc(e.from,e.to),u,d=t&&Mc(i,t.main.head);if(d){let p=e.insert.length-(e.to-e.from);u={from:d.from,to:d.to-p}}else u=i.state.doc.lineAt(r.head);let f=r.to-e.to;n=s.changeByRange(p=>{if(p.from==r.from&&p.to==r.to)return{changes:a,range:c||p.map(a)};let m=p.to-f,g=m-h.length;if(i.state.sliceDoc(g,m)!=h||m>=u.from&&g<=u.to)return{range:p};let b=s.changes({from:g,to:m,insert:e.insert}),x=p.to-r.to;return{changes:b,range:c?_.range(Math.max(0,c.anchor+x),Math.max(0,c.head+x)):p.map(b)}})}else n={changes:a,selection:c&&s.selection.replaceRange(c)}}let l="input.type";return(i.composing||i.inputState.compositionPendingChange&&i.inputState.compositionEndedAt>Date.now()-50)&&(i.inputState.compositionPendingChange=!1,l+=".compose",i.inputState.compositionFirstChange&&(l+=".start",i.inputState.compositionFirstChange=!1)),s.update(n,{userEvent:l,scrollIntoView:!0})}function Pc(i,e,t,n){let s=Math.min(i.length,e.length),r=0;for(;r<s&&i.charCodeAt(r)==e.charCodeAt(r);)r++;if(r==s&&i.length==e.length)return null;let o=i.length,l=e.length;for(;o>0&&l>0&&i.charCodeAt(o-1)==e.charCodeAt(l-1);)o--,l--;if(n=="end"){let a=Math.max(0,r-Math.min(o,l));t-=o+a-r}if(o<r&&i.length<e.length){let a=t<=r&&t>=o?r-t:0;r-=a,l=r+(l-o),o=r}else if(l<r){let a=t<=r&&t>=l?r-t:0;r-=a,o=r+(o-l),l=r}return{from:r,toA:o,toB:l}}function lf(i){let e=[];if(i.root.activeElement!=i.contentDOM)return e;let{anchorNode:t,anchorOffset:n,focusNode:s,focusOffset:r}=i.observer.selectionRange;return t&&(e.push(new kl(t,n)),(s!=t||r!=n)&&e.push(new kl(s,r))),e}function af(i,e){if(i.length==0)return null;let t=i[0].pos,n=i.length==2?i[1].pos:t;return t>-1&&n>-1?_.single(t+e,n+e):null}function cs(i,e){return e.head==i.main.head&&e.anchor==i.main.anchor}class cf{setSelectionOrigin(e){this.lastSelectionOrigin=e,this.lastSelectionTime=Date.now()}constructor(e){this.view=e,this.lastKeyCode=0,this.lastKeyTime=0,this.lastTouchTime=0,this.lastTouchX=0,this.lastTouchY=0,this.lastFocusTime=0,this.lastScrollTop=0,this.lastScrollLeft=0,this.lastWheelEvent=0,this.pendingIOSKey=void 0,this.tabFocusMode=-1,this.lastSelectionOrigin=null,this.lastSelectionTime=0,this.lastContextMenu=0,this.scrollHandlers=[],this.handlers=Object.create(null),this.composing=-1,this.compositionFirstChange=null,this.compositionEndedAt=0,this.compositionPendingKey=!1,this.compositionPendingChange=!1,this.insertingText="",this.insertingTextAt=0,this.mouseSelection=null,this.draggedContent=null,this.handleEvent=this.handleEvent.bind(this),this.notifiedFocused=e.hasFocus,O.safari&&e.contentDOM.addEventListener("input",()=>null),O.gecko&&Sf(e.contentDOM.ownerDocument)}handleEvent(e){!bf(this.view,e)||this.ignoreDuringComposition(e)||e.type=="keydown"&&this.keydown(e)||(this.view.updateState!=0?Promise.resolve().then(()=>this.runHandlers(e.type,e)):this.runHandlers(e.type,e))}runHandlers(e,t){let n=this.handlers[e];if(n){for(let s of n.observers)s(this.view,t);for(let s of n.handlers){if(t.defaultPrevented)break;if(s(this.view,t)){t.preventDefault();break}}}}ensureHandlers(e){let t=hf(e),n=this.handlers,s=this.view.contentDOM;for(let r in t)if(r!="scroll"){let o=!t[r].handlers.length,l=n[r];l&&o!=!l.handlers.length&&(s.removeEventListener(r,this.handleEvent),l=null),l||s.addEventListener(r,this.handleEvent,{passive:o})}for(let r in n)r!="scroll"&&!t[r]&&s.removeEventListener(r,this.handleEvent);this.handlers=t}keydown(e){if(this.lastKeyCode=e.keyCode,this.lastKeyTime=Date.now(),e.keyCode==9&&this.tabFocusMode>-1&&(!this.tabFocusMode||Date.now()<=this.tabFocusMode))return!0;if(this.tabFocusMode>0&&e.keyCode!=27&&Lc.indexOf(e.keyCode)<0&&(this.tabFocusMode=-1),O.android&&O.chrome&&!e.synthetic&&(e.keyCode==13||e.keyCode==8))return this.view.observer.delayAndroidKey(e.key,e.keyCode),!0;let t;return O.ios&&!e.synthetic&&!e.altKey&&!e.metaKey&&!e.shiftKey&&((t=Oc.find(n=>n.keyCode==e.keyCode))&&!e.ctrlKey||uf.indexOf(e.key)>-1&&e.ctrlKey)?(this.pendingIOSKey=t||e,setTimeout(()=>this.flushIOSKey(),250),!0):(e.keyCode!=229&&this.view.observer.forceFlush(),!1)}flushIOSKey(e){let t=this.pendingIOSKey;return!t||t.key=="Enter"&&e&&e.from<e.to&&/^\S+$/.test(e.insert.toString())?!1:(this.pendingIOSKey=void 0,Cn(this.view.contentDOM,t.key,t.keyCode,t instanceof KeyboardEvent?t:void 0))}ignoreDuringComposition(e){return!/^key/.test(e.type)||e.synthetic?!1:this.composing>0?!0:O.safari&&!O.ios&&this.compositionPendingKey&&Date.now()-this.compositionEndedAt<100?(this.compositionPendingKey=!1,!0):!1}startMouseSelection(e){this.mouseSelection&&this.mouseSelection.destroy(),this.mouseSelection=e}update(e){this.view.observer.update(e),this.mouseSelection&&this.mouseSelection.update(e),this.draggedContent&&e.docChanged&&(this.draggedContent=this.draggedContent.map(e.changes)),e.transactions.length&&(this.lastKeyCode=this.lastSelectionTime=0)}destroy(){this.mouseSelection&&this.mouseSelection.destroy()}}function _l(i,e){return(t,n)=>{try{return e.call(i,n,t)}catch(s){_t(t.state,s)}}}function hf(i){let e=Object.create(null);function t(n){return e[n]||(e[n]={observers:[],handlers:[]})}for(let n of i){let s=n.spec,r=s&&s.plugin.domEventHandlers,o=s&&s.plugin.domEventObservers;if(r)for(let l in r){let a=r[l];a&&t(l).handlers.push(_l(n.value,a))}if(o)for(let l in o){let a=o[l];a&&t(l).observers.push(_l(n.value,a))}}for(let n in at)t(n).handlers.push(at[n]);for(let n in He)t(n).observers.push(He[n]);return e}const Oc=[{key:"Backspace",keyCode:8,inputType:"deleteContentBackward"},{key:"Enter",keyCode:13,inputType:"insertParagraph"},{key:"Enter",keyCode:13,inputType:"insertLineBreak"},{key:"Delete",keyCode:46,inputType:"deleteContentForward"}],uf="dthko",Lc=[16,17,18,20,91,92,224,225],Ei=6;function Bi(i){return Math.max(0,i)*.7+8}function df(i,e){return Math.max(Math.abs(i.clientX-e.clientX),Math.abs(i.clientY-e.clientY))}class ff{constructor(e,t,n,s){this.view=e,this.startEvent=t,this.style=n,this.mustSelect=s,this.scrollSpeed={x:0,y:0},this.scrolling=-1,this.lastEvent=t,this.scrollParents=nc(e.contentDOM),this.atoms=e.state.facet(ki).map(o=>o(e));let r=e.contentDOM.ownerDocument;r.addEventListener("mousemove",this.move=this.move.bind(this)),r.addEventListener("mouseup",this.up=this.up.bind(this)),this.extend=t.shiftKey,this.multiple=e.state.facet(te.allowMultipleSelections)&&pf(e,t),this.dragging=gf(e,t)&&zc(t)==1?null:!1}start(e){this.dragging===!1&&this.select(e)}move(e){if(e.buttons==0)return this.destroy();if(this.dragging||this.dragging==null&&df(this.startEvent,e)<10)return;this.select(this.lastEvent=e);let t=0,n=0,s=0,r=0,o=this.view.win.innerWidth,l=this.view.win.innerHeight;this.scrollParents.x&&({left:s,right:o}=this.scrollParents.x.getBoundingClientRect()),this.scrollParents.y&&({top:r,bottom:l}=this.scrollParents.y.getBoundingClientRect());let a=Ac(this.view);e.clientX-a.left<=s+Ei?t=-Bi(s-e.clientX):e.clientX+a.right>=o-Ei&&(t=Bi(e.clientX-o)),e.clientY-a.top<=r+Ei?n=-Bi(r-e.clientY):e.clientY+a.bottom>=l-Ei&&(n=Bi(e.clientY-l)),this.setScrollSpeed(t,n)}up(e){this.dragging==null&&this.select(this.lastEvent),this.dragging||e.preventDefault(),this.destroy()}destroy(){this.setScrollSpeed(0,0);let e=this.view.contentDOM.ownerDocument;e.removeEventListener("mousemove",this.move),e.removeEventListener("mouseup",this.up),this.view.inputState.mouseSelection=this.view.inputState.draggedContent=null}setScrollSpeed(e,t){this.scrollSpeed={x:e,y:t},e||t?this.scrolling<0&&(this.scrolling=setInterval(()=>this.scroll(),50)):this.scrolling>-1&&(clearInterval(this.scrolling),this.scrolling=-1)}scroll(){let{x:e,y:t}=this.scrollSpeed;e&&this.scrollParents.x&&(this.scrollParents.x.scrollLeft+=e,e=0),t&&this.scrollParents.y&&(this.scrollParents.y.scrollTop+=t,t=0),(e||t)&&this.view.win.scrollBy(e,t),this.dragging===!1&&this.select(this.lastEvent)}select(e){let{view:t}=this,n=Ec(this.atoms,this.style.get(e,this.extend,this.multiple));(this.mustSelect||!n.eq(t.state.selection,this.dragging===!1))&&this.view.dispatch({selection:n,userEvent:"select.pointer"}),this.mustSelect=!1}update(e){e.transactions.some(t=>t.isUserEvent("input.type"))?this.destroy():this.style.update(e)&&setTimeout(()=>this.select(this.lastEvent),20)}}function pf(i,e){let t=i.state.facet(dc);return t.length?t[0](e):O.mac?e.metaKey:e.ctrlKey}function mf(i,e){let t=i.state.facet(fc);return t.length?t[0](e):O.mac?!e.altKey:!e.ctrlKey}function gf(i,e){let{main:t}=i.state.selection;if(t.empty)return!1;let n=ui(i.root);if(!n||n.rangeCount==0)return!0;let s=n.getRangeAt(0).getClientRects();for(let r=0;r<s.length;r++){let o=s[r];if(o.left<=e.clientX&&o.right>=e.clientX&&o.top<=e.clientY&&o.bottom>=e.clientY)return!0}return!1}function bf(i,e){if(!e.bubbles)return!0;if(e.defaultPrevented)return!1;for(let t=e.target,n;t!=i.contentDOM;t=t.parentNode)if(!t||t.nodeType==11||(n=pe.get(t))&&n.isWidget()&&!n.isHidden&&n.widget.ignoreEvent(e))return!1;return!0}const at=Object.create(null),He=Object.create(null),Rc=O.ie&&O.ie_version<15||O.ios&&O.webkit_version<604;function yf(i){let e=i.dom.parentNode;if(!e)return;let t=e.appendChild(document.createElement("textarea"));t.style.cssText="position: fixed; left: -10000px; top: 10px",t.focus(),setTimeout(()=>{i.focus(),t.remove(),Ic(i,t.value)},50)}function ks(i,e,t){for(let n of i.facet(e))t=n(t,i);return t}function Ic(i,e){e=ks(i.state,vo,e);let{state:t}=i,n,s=1,r=t.toText(e),o=r.lines==t.selection.ranges.length;if(qr!=null&&t.selection.ranges.every(a=>a.empty)&&qr==r.toString()){let a=-1;n=t.changeByRange(c=>{let h=t.doc.lineAt(c.from);if(h.from==a)return{range:c};a=h.from;let u=t.toText((o?r.line(s++).text:e)+t.lineBreak);return{changes:{from:h.from,insert:u},range:_.cursor(c.from+u.length)}})}else o?n=t.changeByRange(a=>{let c=r.line(s++);return{changes:{from:a.from,to:a.to,insert:c.text},range:_.cursor(a.from+c.length)}}):n=t.replaceSelection(r);i.dispatch(n,{userEvent:"input.paste",scrollIntoView:!0})}He.scroll=i=>{i.inputState.lastScrollTop=i.scrollDOM.scrollTop,i.inputState.lastScrollLeft=i.scrollDOM.scrollLeft};He.wheel=He.mousewheel=i=>{i.inputState.lastWheelEvent=Date.now()};at.keydown=(i,e)=>(i.inputState.setSelectionOrigin("select"),e.keyCode==27&&i.inputState.tabFocusMode!=0&&(i.inputState.tabFocusMode=Date.now()+2e3),!1);He.touchstart=(i,e)=>{let t=i.inputState,n=e.targetTouches[0];t.lastTouchTime=Date.now(),n&&(t.lastTouchX=n.clientX,t.lastTouchY=n.clientY),t.setSelectionOrigin("select.pointer")};He.touchmove=i=>{i.inputState.setSelectionOrigin("select.pointer")};at.mousedown=(i,e)=>{if(i.observer.flush(),i.inputState.lastTouchTime>Date.now()-2e3)return!1;let t=null;for(let n of i.state.facet(pc))if(t=n(i,e),t)break;if(!t&&e.button==0&&(t=vf(i,e)),t){let n=!i.hasFocus;i.inputState.startMouseSelection(new ff(i,e,t,n)),n&&i.observer.ignore(()=>{ic(i.contentDOM);let r=i.root.activeElement;r&&!r.contains(i.contentDOM)&&r.blur()});let s=i.inputState.mouseSelection;if(s)return s.start(e),s.dragging===!1}else i.inputState.setSelectionOrigin("select.pointer");return!1};function Sl(i,e,t,n){if(n==1)return _.cursor(e,t);if(n==2)return Gd(i.state,e,t);{let s=i.docView.lineAt(e,t),r=i.state.doc.lineAt(s?s.posAtEnd:e),o=s?s.posAtStart:r.from,l=s?s.posAtEnd:r.to;return l<i.state.doc.length&&l==r.to&&l++,_.range(o,l)}}const wf=O.ie&&O.ie_version<=11;let Cl=null,Al=0,Tl=0;function zc(i){if(!wf)return i.detail;let e=Cl,t=Tl;return Cl=i,Tl=Date.now(),Al=!e||t>Date.now()-400&&Math.abs(e.clientX-i.clientX)<2&&Math.abs(e.clientY-i.clientY)<2?(Al+1)%3:1}function vf(i,e){let t=i.posAndSideAtCoords({x:e.clientX,y:e.clientY},!1),n=zc(e),s=i.state.selection;return{update(r){r.docChanged&&(t.pos=r.changes.mapPos(t.pos),s=s.map(r.changes))},get(r,o,l){let a=i.posAndSideAtCoords({x:r.clientX,y:r.clientY},!1),c,h=Sl(i,a.pos,a.assoc,n);if(t.pos!=a.pos&&!o){let u=Sl(i,t.pos,t.assoc,n),d=Math.min(u.from,h.from),f=Math.max(u.to,h.to);h=d<h.from?_.range(d,f,h.assoc):_.range(f,d,h.assoc)}return o?s.replaceRange(s.main.extend(h.from,h.to,h.assoc)):l&&n==1&&s.ranges.length>1&&(c=xf(s,a.pos))?c:l?s.addRange(h):_.create([h])}}}function xf(i,e){for(let t=0;t<i.ranges.length;t++){let{from:n,to:s}=i.ranges[t];if(n<=e&&s>=e)return _.create(i.ranges.slice(0,t).concat(i.ranges.slice(t+1)),i.mainIndex==t?0:i.mainIndex-(i.mainIndex>t?1:0))}return null}at.dragstart=(i,e)=>{let{selection:{main:t}}=i.state;if(e.target.draggable){let s=i.docView.tile.nearest(e.target);if(s&&s.isWidget()){let r=s.posAtStart,o=r+s.length;(r>=t.to||o<=t.from)&&(t=_.range(r,o))}}let{inputState:n}=i;return n.mouseSelection&&(n.mouseSelection.dragging=!0),n.draggedContent=t,e.dataTransfer&&(e.dataTransfer.setData("Text",ks(i.state,xo,i.state.sliceDoc(t.from,t.to))),e.dataTransfer.effectAllowed="copyMove"),!1};at.dragend=i=>(i.inputState.draggedContent=null,!1);function Ml(i,e,t,n){if(t=ks(i.state,vo,t),!t)return;let s=i.posAtCoords({x:e.clientX,y:e.clientY},!1),{draggedContent:r}=i.inputState,o=n&&r&&mf(i,e)?{from:r.from,to:r.to}:null,l={from:s,insert:t},a=i.state.changes(o?[o,l]:l);i.focus(),i.dispatch({changes:a,selection:{anchor:a.mapPos(s,-1),head:a.mapPos(s,1)},userEvent:o?"move.drop":"input.drop"}),i.inputState.draggedContent=null}at.drop=(i,e)=>{if(!e.dataTransfer)return!1;if(i.state.readOnly)return!0;let t=e.dataTransfer.files;if(t&&t.length){let n=Array(t.length),s=0,r=()=>{++s==t.length&&Ml(i,e,n.filter(o=>o!=null).join(i.state.lineBreak),!1)};for(let o=0;o<t.length;o++){let l=new FileReader;l.onerror=r,l.onload=()=>{/[\x00-\x08\x0e-\x1f]{2}/.test(l.result)||(n[o]=l.result),r()},l.readAsText(t[o])}return!0}else{let n=e.dataTransfer.getData("Text");if(n)return Ml(i,e,n,!0),!0}return!1};at.paste=(i,e)=>{if(i.state.readOnly)return!0;i.observer.flush();let t=Rc?null:e.clipboardData;return t?(Ic(i,t.getData("text/plain")||t.getData("text/uri-list")),!0):(yf(i),!1)};function kf(i,e){let t=i.dom.parentNode;if(!t)return;let n=t.appendChild(document.createElement("textarea"));n.style.cssText="position: fixed; left: -10000px; top: 10px",n.value=e,n.focus(),n.selectionEnd=e.length,n.selectionStart=0,setTimeout(()=>{n.remove(),i.focus()},50)}function _f(i){let e=[],t=[],n=!1;for(let s of i.selection.ranges)s.empty||(e.push(i.sliceDoc(s.from,s.to)),t.push(s));if(!e.length){let s=-1;for(let{from:r}of i.selection.ranges){let o=i.doc.lineAt(r);o.number>s&&(e.push(o.text),t.push({from:o.from,to:Math.min(i.doc.length,o.to+1)})),s=o.number}n=!0}return{text:ks(i,xo,e.join(i.lineBreak)),ranges:t,linewise:n}}let qr=null;at.copy=at.cut=(i,e)=>{if(!ti(i.contentDOM,i.observer.selectionRange))return!1;let{text:t,ranges:n,linewise:s}=_f(i.state);if(!t&&!s)return!1;qr=s?t:null,e.type=="cut"&&!i.state.readOnly&&i.dispatch({changes:n,scrollIntoView:!0,userEvent:"delete.cut"});let r=Rc?null:e.clipboardData;return r?(r.clearData(),r.setData("text/plain",t),!0):(kf(i,t),!1)};const qc=Yt.define();function Nc(i,e){let t=[];for(let n of i.facet(bc)){let s=n(i,e);s&&t.push(s)}return t.length?i.update({effects:t,annotations:qc.of(!0)}):null}function Fc(i){setTimeout(()=>{let e=i.hasFocus;if(e!=i.inputState.notifiedFocused){let t=Nc(i.state,e);t?i.dispatch(t):i.update([])}},10)}He.focus=i=>{i.inputState.lastFocusTime=Date.now(),!i.scrollDOM.scrollTop&&(i.inputState.lastScrollTop||i.inputState.lastScrollLeft)&&(i.scrollDOM.scrollTop=i.inputState.lastScrollTop,i.scrollDOM.scrollLeft=i.inputState.lastScrollLeft),Fc(i)};He.blur=i=>{i.observer.clearSelectionRange(),Fc(i)};He.compositionstart=He.compositionupdate=i=>{i.observer.editContext||(i.inputState.compositionFirstChange==null&&(i.inputState.compositionFirstChange=!0),i.inputState.composing<0&&(i.inputState.composing=0))};He.compositionend=i=>{i.observer.editContext||(i.inputState.composing=-1,i.inputState.compositionEndedAt=Date.now(),i.inputState.compositionPendingKey=!0,i.inputState.compositionPendingChange=i.observer.pendingRecords().length>0,i.inputState.compositionFirstChange=null,O.chrome&&O.android?i.observer.flushSoon():i.inputState.compositionPendingChange?Promise.resolve().then(()=>i.observer.flush()):setTimeout(()=>{i.inputState.composing<0&&i.docView.hasComposition&&i.update([])},50))};He.contextmenu=i=>{i.inputState.lastContextMenu=Date.now()};at.beforeinput=(i,e)=>{var t,n;if((e.inputType=="insertText"||e.inputType=="insertCompositionText")&&(i.inputState.insertingText=e.data,i.inputState.insertingTextAt=Date.now()),e.inputType=="insertReplacementText"&&i.observer.editContext){let r=(t=e.dataTransfer)===null||t===void 0?void 0:t.getData("text/plain"),o=e.getTargetRanges();if(r&&o.length){let l=o[0],a=i.posAtDOM(l.startContainer,l.startOffset),c=i.posAtDOM(l.endContainer,l.endOffset);return So(i,{from:a,to:c,insert:i.state.toText(r)},null),!0}}let s;if(O.chrome&&O.android&&(s=Oc.find(r=>r.inputType==e.inputType))&&(i.observer.delayAndroidKey(s.key,s.keyCode),s.key=="Backspace"||s.key=="Delete")){let r=((n=window.visualViewport)===null||n===void 0?void 0:n.height)||0;setTimeout(()=>{var o;(((o=window.visualViewport)===null||o===void 0?void 0:o.height)||0)>r+10&&i.hasFocus&&(i.contentDOM.blur(),i.focus())},100)}return O.ios&&e.inputType=="deleteContentForward"&&i.observer.flushSoon(),O.safari&&e.inputType=="insertText"&&i.inputState.composing>=0&&setTimeout(()=>He.compositionend(i,e),20),!1};const El=new Set;function Sf(i){El.has(i)||(El.add(i),i.addEventListener("copy",()=>{}),i.addEventListener("cut",()=>{}))}const Bl=["pre-wrap","normal","pre-line","break-spaces"];let Bn=!1;function Dl(){Bn=!1}class Cf{constructor(e){this.lineWrapping=e,this.doc=ee.empty,this.heightSamples={},this.lineHeight=14,this.charWidth=7,this.textHeight=14,this.lineLength=30}heightForGap(e,t){let n=this.doc.lineAt(t).number-this.doc.lineAt(e).number+1;return this.lineWrapping&&(n+=Math.max(0,Math.ceil((t-e-n*this.lineLength*.5)/this.lineLength))),this.lineHeight*n}heightForLine(e){return this.lineWrapping?(1+Math.max(0,Math.ceil((e-this.lineLength)/Math.max(1,this.lineLength-5))))*this.lineHeight:this.lineHeight}setDoc(e){return this.doc=e,this}mustRefreshForWrapping(e){return Bl.indexOf(e)>-1!=this.lineWrapping}mustRefreshForHeights(e){let t=!1;for(let n=0;n<e.length;n++){let s=e[n];s<0?n++:this.heightSamples[Math.floor(s*10)]||(t=!0,this.heightSamples[Math.floor(s*10)]=!0)}return t}refresh(e,t,n,s,r,o){let l=Bl.indexOf(e)>-1,a=Math.abs(t-this.lineHeight)>.3||this.lineWrapping!=l||Math.abs(n-this.charWidth)>.1;if(this.lineWrapping=l,this.lineHeight=t,this.charWidth=n,this.textHeight=s,this.lineLength=r,a){this.heightSamples={};for(let c=0;c<o.length;c++){let h=o[c];h<0?c++:this.heightSamples[Math.floor(h*10)]=!0}}return a}}class Af{constructor(e,t){this.from=e,this.heights=t,this.index=0}get more(){return this.index<this.heights.length}}class rt{constructor(e,t,n,s,r){this.from=e,this.length=t,this.top=n,this.height=s,this._content=r}get type(){return typeof this._content=="number"?Ae.Text:Array.isArray(this._content)?this._content:this._content.type}get to(){return this.from+this.length}get bottom(){return this.top+this.height}get widget(){return this._content instanceof ln?this._content.widget:null}get widgetLineBreaks(){return typeof this._content=="number"?this._content:0}join(e){let t=(Array.isArray(this._content)?this._content:[this]).concat(Array.isArray(e._content)?e._content:[e]);return new rt(this.from,this.length+e.length,this.top,this.height+e.height,t)}}var ae=(function(i){return i[i.ByPos=0]="ByPos",i[i.ByHeight=1]="ByHeight",i[i.ByPosNoHeight=2]="ByPosNoHeight",i})(ae||(ae={}));const Xi=.001;class Le{constructor(e,t,n=2){this.length=e,this.height=t,this.flags=n}get outdated(){return(this.flags&2)>0}set outdated(e){this.flags=(e?2:0)|this.flags&-3}setHeight(e){this.height!=e&&(Math.abs(this.height-e)>Xi&&(Bn=!0),this.height=e)}replace(e,t,n){return Le.of(n)}decomposeLeft(e,t){t.push(this)}decomposeRight(e,t){t.push(this)}applyChanges(e,t,n,s){let r=this,o=n.doc;for(let l=s.length-1;l>=0;l--){let{fromA:a,toA:c,fromB:h,toB:u}=s[l],d=r.lineAt(a,ae.ByPosNoHeight,n.setDoc(t),0,0),f=d.to>=c?d:r.lineAt(c,ae.ByPosNoHeight,n,0,0);for(u+=f.to-c,c=f.to;l>0&&d.from<=s[l-1].toA;)a=s[l-1].fromA,h=s[l-1].fromB,l--,a<d.from&&(d=r.lineAt(a,ae.ByPosNoHeight,n,0,0));h+=d.from-a,a=d.from;let p=Co.build(n.setDoc(o),e,h,u);r=hs(r,r.replace(a,c,p))}return r.updateHeight(n,0)}static empty(){return new $e(0,0,0)}static of(e){if(e.length==1)return e[0];let t=0,n=e.length,s=0,r=0;for(;;)if(t==n)if(s>r*2){let l=e[t-1];l.break?e.splice(--t,1,l.left,null,l.right):e.splice(--t,1,l.left,l.right),n+=1+l.break,s-=l.size}else if(r>s*2){let l=e[n];l.break?e.splice(n,1,l.left,null,l.right):e.splice(n,1,l.left,l.right),n+=2+l.break,r-=l.size}else break;else if(s<r){let l=e[t++];l&&(s+=l.size)}else{let l=e[--n];l&&(r+=l.size)}let o=0;return e[t-1]==null?(o=1,t--):e[t]==null&&(o=1,n++),new Mf(Le.of(e.slice(0,t)),o,Le.of(e.slice(n)))}}function hs(i,e){return i==e?i:(i.constructor!=e.constructor&&(Bn=!0),e)}Le.prototype.size=1;const Tf=ye.replace({});class Hc extends Le{constructor(e,t,n){super(e,t),this.deco=n,this.spaceAbove=0}mainBlock(e,t){return new rt(t,this.length,e+this.spaceAbove,this.height-this.spaceAbove,this.deco||0)}blockAt(e,t,n,s){return this.spaceAbove&&e<n+this.spaceAbove?new rt(s,0,n,this.spaceAbove,Tf):this.mainBlock(n,s)}lineAt(e,t,n,s,r){let o=this.mainBlock(s,r);return this.spaceAbove?this.blockAt(0,n,s,r).join(o):o}forEachLine(e,t,n,s,r,o){e<=r+this.length&&t>=r&&o(this.lineAt(0,ae.ByPos,n,s,r))}setMeasuredHeight(e){let t=e.heights[e.index++];t<0?(this.spaceAbove=-t,t=e.heights[e.index++]):this.spaceAbove=0,this.setHeight(t)}updateHeight(e,t=0,n=!1,s){return s&&s.from<=t&&s.more&&this.setMeasuredHeight(s),this.outdated=!1,this}toString(){return`block(${this.length})`}}class $e extends Hc{constructor(e,t,n){super(e,t,null),this.collapsed=0,this.widgetHeight=0,this.breaks=0,this.spaceAbove=n}mainBlock(e,t){return new rt(t,this.length,e+this.spaceAbove,this.height-this.spaceAbove,this.breaks)}replace(e,t,n){let s=n[0];return n.length==1&&(s instanceof $e||s instanceof Se&&s.flags&4)&&Math.abs(this.length-s.length)<10?(s instanceof Se?s=new $e(s.length,this.height,this.spaceAbove):s.height=this.height,this.outdated||(s.outdated=!1),s):Le.of(n)}updateHeight(e,t=0,n=!1,s){return s&&s.from<=t&&s.more?this.setMeasuredHeight(s):(n||this.outdated)&&(this.spaceAbove=0,this.setHeight(Math.max(this.widgetHeight,e.heightForLine(this.length-this.collapsed))+this.breaks*e.lineHeight)),this.outdated=!1,this}toString(){return`line(${this.length}${this.collapsed?-this.collapsed:""}${this.widgetHeight?":"+this.widgetHeight:""})`}}class Se extends Le{constructor(e){super(e,0)}heightMetrics(e,t){let n=e.doc.lineAt(t).number,s=e.doc.lineAt(t+this.length).number,r=s-n+1,o,l=0;if(e.lineWrapping){let a=Math.min(this.height,e.lineHeight*r);o=a/r,this.length>r+1&&(l=(this.height-a)/(this.length-r-1))}else o=this.height/r;return{firstLine:n,lastLine:s,perLine:o,perChar:l}}blockAt(e,t,n,s){let{firstLine:r,lastLine:o,perLine:l,perChar:a}=this.heightMetrics(t,s);if(t.lineWrapping){let c=s+(e<t.lineHeight?0:Math.round(Math.max(0,Math.min(1,(e-n)/this.height))*this.length)),h=t.doc.lineAt(c),u=l+h.length*a,d=Math.max(n,e-u/2);return new rt(h.from,h.length,d,u,0)}else{let c=Math.max(0,Math.min(o-r,Math.floor((e-n)/l))),{from:h,length:u}=t.doc.line(r+c);return new rt(h,u,n+l*c,l,0)}}lineAt(e,t,n,s,r){if(t==ae.ByHeight)return this.blockAt(e,n,s,r);if(t==ae.ByPosNoHeight){let{from:f,to:p}=n.doc.lineAt(e);return new rt(f,p-f,0,0,0)}let{firstLine:o,perLine:l,perChar:a}=this.heightMetrics(n,r),c=n.doc.lineAt(e),h=l+c.length*a,u=c.number-o,d=s+l*u+a*(c.from-r-u);return new rt(c.from,c.length,Math.max(s,Math.min(d,s+this.height-h)),h,0)}forEachLine(e,t,n,s,r,o){e=Math.max(e,r),t=Math.min(t,r+this.length);let{firstLine:l,perLine:a,perChar:c}=this.heightMetrics(n,r);for(let h=e,u=s;h<=t;){let d=n.doc.lineAt(h);if(h==e){let p=d.number-l;u+=a*p+c*(e-r-p)}let f=a+c*d.length;o(new rt(d.from,d.length,u,f,0)),u+=f,h=d.to+1}}replace(e,t,n){let s=this.length-t;if(s>0){let r=n[n.length-1];r instanceof Se?n[n.length-1]=new Se(r.length+s):n.push(null,new Se(s-1))}if(e>0){let r=n[0];r instanceof Se?n[0]=new Se(e+r.length):n.unshift(new Se(e-1),null)}return Le.of(n)}decomposeLeft(e,t){t.push(new Se(e-1),null)}decomposeRight(e,t){t.push(null,new Se(this.length-e-1))}updateHeight(e,t=0,n=!1,s){let r=t+this.length;if(s&&s.from<=t+this.length&&s.more){let o=[],l=Math.max(t,s.from),a=-1;for(s.from>t&&o.push(new Se(s.from-t-1).updateHeight(e,t));l<=r&&s.more;){let h=e.doc.lineAt(l).length;o.length&&o.push(null);let u=s.heights[s.index++],d=0;u<0&&(d=-u,u=s.heights[s.index++]),a==-1?a=u:Math.abs(u-a)>=Xi&&(a=-2);let f=new $e(h,u,d);f.outdated=!1,o.push(f),l+=h+1}l<=r&&o.push(null,new Se(r-l).updateHeight(e,l));let c=Le.of(o);return(a<0||Math.abs(c.height-this.height)>=Xi||Math.abs(a-this.heightMetrics(e,t).perLine)>=Xi)&&(Bn=!0),hs(this,c)}else(n||this.outdated)&&(this.setHeight(e.heightForGap(t,t+this.length)),this.outdated=!1);return this}toString(){return`gap(${this.length})`}}class Mf extends Le{constructor(e,t,n){super(e.length+t+n.length,e.height+n.height,t|(e.outdated||n.outdated?2:0)),this.left=e,this.right=n,this.size=e.size+n.size}get break(){return this.flags&1}blockAt(e,t,n,s){let r=n+this.left.height;return e<r?this.left.blockAt(e,t,n,s):this.right.blockAt(e,t,r,s+this.left.length+this.break)}lineAt(e,t,n,s,r){let o=s+this.left.height,l=r+this.left.length+this.break,a=t==ae.ByHeight?e<o:e<l,c=a?this.left.lineAt(e,t,n,s,r):this.right.lineAt(e,t,n,o,l);if(this.break||(a?c.to<l:c.from>l))return c;let h=t==ae.ByPosNoHeight?ae.ByPosNoHeight:ae.ByPos;return a?c.join(this.right.lineAt(l,h,n,o,l)):this.left.lineAt(l,h,n,s,r).join(c)}forEachLine(e,t,n,s,r,o){let l=s+this.left.height,a=r+this.left.length+this.break;if(this.break)e<a&&this.left.forEachLine(e,t,n,s,r,o),t>=a&&this.right.forEachLine(e,t,n,l,a,o);else{let c=this.lineAt(a,ae.ByPos,n,s,r);e<c.from&&this.left.forEachLine(e,c.from-1,n,s,r,o),c.to>=e&&c.from<=t&&o(c),t>c.to&&this.right.forEachLine(c.to+1,t,n,l,a,o)}}replace(e,t,n){let s=this.left.length+this.break;if(t<s)return this.balanced(this.left.replace(e,t,n),this.right);if(e>this.left.length)return this.balanced(this.left,this.right.replace(e-s,t-s,n));let r=[];e>0&&this.decomposeLeft(e,r);let o=r.length;for(let l of n)r.push(l);if(e>0&&Pl(r,o-1),t<this.length){let l=r.length;this.decomposeRight(t,r),Pl(r,l)}return Le.of(r)}decomposeLeft(e,t){let n=this.left.length;if(e<=n)return this.left.decomposeLeft(e,t);t.push(this.left),this.break&&(n++,e>=n&&t.push(null)),e>n&&this.right.decomposeLeft(e-n,t)}decomposeRight(e,t){let n=this.left.length,s=n+this.break;if(e>=s)return this.right.decomposeRight(e-s,t);e<n&&this.left.decomposeRight(e,t),this.break&&e<s&&t.push(null),t.push(this.right)}balanced(e,t){return e.size>2*t.size||t.size>2*e.size?Le.of(this.break?[e,null,t]:[e,t]):(this.left=hs(this.left,e),this.right=hs(this.right,t),this.setHeight(e.height+t.height),this.outdated=e.outdated||t.outdated,this.size=e.size+t.size,this.length=e.length+this.break+t.length,this)}updateHeight(e,t=0,n=!1,s){let{left:r,right:o}=this,l=t+r.length+this.break,a=null;return s&&s.from<=t+r.length&&s.more?a=r=r.updateHeight(e,t,n,s):r.updateHeight(e,t,n),s&&s.from<=l+o.length&&s.more?a=o=o.updateHeight(e,l,n,s):o.updateHeight(e,l,n),a?this.balanced(r,o):(this.height=this.left.height+this.right.height,this.outdated=!1,this)}toString(){return this.left+(this.break?" ":"-")+this.right}}function Pl(i,e){let t,n;i[e]==null&&(t=i[e-1])instanceof Se&&(n=i[e+1])instanceof Se&&i.splice(e-1,3,new Se(t.length+1+n.length))}const Ef=5;class Co{constructor(e,t){this.pos=e,this.oracle=t,this.nodes=[],this.lineStart=-1,this.lineEnd=-1,this.covering=null,this.writtenTo=e}get isCovered(){return this.covering&&this.nodes[this.nodes.length-1]==this.covering}span(e,t){if(this.lineStart>-1){let n=Math.min(t,this.lineEnd),s=this.nodes[this.nodes.length-1];s instanceof $e?s.length+=n-this.pos:(n>this.pos||!this.isCovered)&&this.nodes.push(new $e(n-this.pos,-1,0)),this.writtenTo=n,t>n&&(this.nodes.push(null),this.writtenTo++,this.lineStart=-1)}this.pos=t}point(e,t,n){if(e<t||n.heightRelevant){let s=n.widget?n.widget.estimatedHeight:0,r=n.widget?n.widget.lineBreaks:0;s<0&&(s=this.oracle.lineHeight);let o=t-e;n.block?this.addBlock(new Hc(o,s,n)):(o||r||s>=Ef)&&this.addLineDeco(s,r,o)}else t>e&&this.span(e,t);this.lineEnd>-1&&this.lineEnd<this.pos&&(this.lineEnd=this.oracle.doc.lineAt(this.pos).to)}enterLine(){if(this.lineStart>-1)return;let{from:e,to:t}=this.oracle.doc.lineAt(this.pos);this.lineStart=e,this.lineEnd=t,this.writtenTo<e&&((this.writtenTo<e-1||this.nodes[this.nodes.length-1]==null)&&this.nodes.push(this.blankContent(this.writtenTo,e-1)),this.nodes.push(null)),this.pos>e&&this.nodes.push(new $e(this.pos-e,-1,0)),this.writtenTo=this.pos}blankContent(e,t){let n=new Se(t-e);return this.oracle.doc.lineAt(e).to==t&&(n.flags|=4),n}ensureLine(){this.enterLine();let e=this.nodes.length?this.nodes[this.nodes.length-1]:null;if(e instanceof $e)return e;let t=new $e(0,-1,0);return this.nodes.push(t),t}addBlock(e){this.enterLine();let t=e.deco;t&&t.startSide>0&&!this.isCovered&&this.ensureLine(),this.nodes.push(e),this.writtenTo=this.pos=this.pos+e.length,t&&t.endSide>0&&(this.covering=e)}addLineDeco(e,t,n){let s=this.ensureLine();s.length+=n,s.collapsed+=n,s.widgetHeight=Math.max(s.widgetHeight,e),s.breaks+=t,this.writtenTo=this.pos=this.pos+n}finish(e){let t=this.nodes.length==0?null:this.nodes[this.nodes.length-1];this.lineStart>-1&&!(t instanceof $e)&&!this.isCovered?this.nodes.push(new $e(0,-1,0)):(this.writtenTo<this.pos||t==null)&&this.nodes.push(this.blankContent(this.writtenTo,this.pos));let n=e;for(let s of this.nodes)s instanceof $e&&s.updateHeight(this.oracle,n),n+=s?s.length:1;return this.nodes}static build(e,t,n,s){let r=new Co(n,e);return Z.spans(t,n,s,r,0),r.finish(n)}}function Bf(i,e,t){let n=new Df;return Z.compare(i,e,t,n,0),n.changes}class Df{constructor(){this.changes=[]}compareRange(){}comparePoint(e,t,n,s){(e<t||n&&n.heightRelevant||s&&s.heightRelevant)&&Sn(e,t,this.changes,5)}}function Pf(i,e){let t=i.getBoundingClientRect(),n=i.ownerDocument,s=n.defaultView||window,r=Math.max(0,t.left),o=Math.min(s.innerWidth,t.right),l=Math.max(0,t.top),a=Math.min(s.innerHeight,t.bottom);for(let c=i.parentNode;c&&c!=n.body;)if(c.nodeType==1){let h=c,u=window.getComputedStyle(h);if((h.scrollHeight>h.clientHeight||h.scrollWidth>h.clientWidth)&&u.overflow!="visible"){let d=h.getBoundingClientRect();r=Math.max(r,d.left),o=Math.min(o,d.right),l=Math.max(l,d.top),a=Math.min(c==i.parentNode?s.innerHeight:a,d.bottom)}c=u.position=="absolute"||u.position=="fixed"?h.offsetParent:h.parentNode}else if(c.nodeType==11)c=c.host;else break;return{left:r-t.left,right:Math.max(r,o)-t.left,top:l-(t.top+e),bottom:Math.max(l,a)-(t.top+e)}}function Of(i){let e=i.getBoundingClientRect(),t=i.ownerDocument.defaultView||window;return e.left<t.innerWidth&&e.right>0&&e.top<t.innerHeight&&e.bottom>0}function Lf(i,e){let t=i.getBoundingClientRect();return{left:0,right:t.right-t.left,top:e,bottom:t.bottom-(t.top+e)}}class Ks{constructor(e,t,n,s){this.from=e,this.to=t,this.size=n,this.displaySize=s}static same(e,t){if(e.length!=t.length)return!1;for(let n=0;n<e.length;n++){let s=e[n],r=t[n];if(s.from!=r.from||s.to!=r.to||s.size!=r.size)return!1}return!0}draw(e,t){return ye.replace({widget:new Rf(this.displaySize*(t?e.scaleY:e.scaleX),t)}).range(this.from,this.to)}}class Rf extends ys{constructor(e,t){super(),this.size=e,this.vertical=t}eq(e){return e.size==this.size&&e.vertical==this.vertical}toDOM(){let e=document.createElement("div");return this.vertical?e.style.height=this.size+"px":(e.style.width=this.size+"px",e.style.height="2px",e.style.display="inline-block"),e}get estimatedHeight(){return this.vertical?this.size:-1}}class Ol{constructor(e,t){this.view=e,this.state=t,this.pixelViewport={left:0,right:window.innerWidth,top:0,bottom:0},this.inView=!0,this.paddingTop=0,this.paddingBottom=0,this.contentDOMWidth=0,this.contentDOMHeight=0,this.editorHeight=0,this.editorWidth=0,this.scaleX=1,this.scaleY=1,this.scrollOffset=0,this.scrolledToBottom=!1,this.scrollAnchorPos=0,this.scrollAnchorHeight=-1,this.scaler=Ll,this.scrollTarget=null,this.printing=!1,this.mustMeasureContent=!0,this.defaultTextDirection=de.LTR,this.visibleRanges=[],this.mustEnforceCursorAssoc=!1;let n=t.facet(ko).some(s=>typeof s!="function"&&s.class=="cm-lineWrapping");this.heightOracle=new Cf(n),this.stateDeco=Rl(t),this.heightMap=Le.empty().applyChanges(this.stateDeco,ee.empty,this.heightOracle.setDoc(t.doc),[new Je(0,0,0,t.doc.length)]);for(let s=0;s<2&&(this.viewport=this.getViewport(0,null),!!this.updateForViewport());s++);this.updateViewportLines(),this.lineGaps=this.ensureLineGaps([]),this.lineGapDeco=ye.set(this.lineGaps.map(s=>s.draw(this,!1))),this.scrollParent=e.scrollDOM,this.computeVisibleRanges()}updateForViewport(){let e=[this.viewport],{main:t}=this.state.selection;for(let n=0;n<=1;n++){let s=n?t.head:t.anchor;if(!e.some(({from:r,to:o})=>s>=r&&s<=o)){let{from:r,to:o}=this.lineBlockAt(s);e.push(new Di(r,o))}}return this.viewports=e.sort((n,s)=>n.from-s.from),this.updateScaler()}updateScaler(){let e=this.scaler;return this.scaler=this.heightMap.height<=7e6?Ll:new Ao(this.heightOracle,this.heightMap,this.viewports),e.eq(this.scaler)?0:2}updateViewportLines(){this.viewportLines=[],this.heightMap.forEachLine(this.viewport.from,this.viewport.to,this.heightOracle.setDoc(this.state.doc),0,0,e=>{this.viewportLines.push(Jn(e,this.scaler))})}update(e,t=null){this.state=e.state;let n=this.stateDeco;this.stateDeco=Rl(this.state);let s=e.changedRanges,r=Je.extendWithRanges(s,Bf(n,this.stateDeco,e?e.changes:ve.empty(this.state.doc.length))),o=this.heightMap.height,l=this.scrolledToBottom?null:this.scrollAnchorAt(this.scrollOffset);Dl(),this.heightMap=this.heightMap.applyChanges(this.stateDeco,e.startState.doc,this.heightOracle.setDoc(this.state.doc),r),(this.heightMap.height!=o||Bn)&&(e.flags|=2),l?(this.scrollAnchorPos=e.changes.mapPos(l.from,-1),this.scrollAnchorHeight=l.top):(this.scrollAnchorPos=-1,this.scrollAnchorHeight=o);let a=r.length?this.mapViewport(this.viewport,e.changes):this.viewport;(t&&(t.range.head<a.from||t.range.head>a.to)||!this.viewportIsAppropriate(a))&&(a=this.getViewport(0,t));let c=a.from!=this.viewport.from||a.to!=this.viewport.to;this.viewport=a,e.flags|=this.updateForViewport(),(c||!e.changes.empty||e.flags&2)&&this.updateViewportLines(),(this.lineGaps.length||this.viewport.to-this.viewport.from>4e3)&&this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps,e.changes))),e.flags|=this.computeVisibleRanges(e.changes),t&&(this.scrollTarget=t),!this.mustEnforceCursorAssoc&&(e.selectionSet||e.focusChanged)&&e.view.lineWrapping&&e.state.selection.main.empty&&e.state.selection.main.assoc&&!e.state.facet(wc)&&(this.mustEnforceCursorAssoc=!0)}measure(){let{view:e}=this,t=e.contentDOM,n=window.getComputedStyle(t),s=this.heightOracle,r=n.whiteSpace;this.defaultTextDirection=n.direction=="rtl"?de.RTL:de.LTR;let o=this.heightOracle.mustRefreshForWrapping(r)||this.mustMeasureContent==="refresh",l=t.getBoundingClientRect(),a=o||this.mustMeasureContent||this.contentDOMHeight!=l.height;this.contentDOMHeight=l.height,this.mustMeasureContent=!1;let c=0,h=0;if(l.width&&l.height){let{scaleX:k,scaleY:C}=tc(t,l);(k>.005&&Math.abs(this.scaleX-k)>.005||C>.005&&Math.abs(this.scaleY-C)>.005)&&(this.scaleX=k,this.scaleY=C,c|=16,o=a=!0)}let u=(parseInt(n.paddingTop)||0)*this.scaleY,d=(parseInt(n.paddingBottom)||0)*this.scaleY;(this.paddingTop!=u||this.paddingBottom!=d)&&(this.paddingTop=u,this.paddingBottom=d,c|=18),this.editorWidth!=e.scrollDOM.clientWidth&&(s.lineWrapping&&(a=!0),this.editorWidth=e.scrollDOM.clientWidth,c|=16);let f=nc(this.view.contentDOM,!1).y;f!=this.scrollParent&&(this.scrollParent=f,this.scrollAnchorHeight=-1,this.scrollOffset=0);let p=this.getScrollOffset();this.scrollOffset!=p&&(this.scrollAnchorHeight=-1,this.scrollOffset=p),this.scrolledToBottom=sc(this.scrollParent||e.win);let m=(this.printing?Lf:Pf)(t,this.paddingTop),g=m.top-this.pixelViewport.top,b=m.bottom-this.pixelViewport.bottom;this.pixelViewport=m;let x=this.pixelViewport.bottom>this.pixelViewport.top&&this.pixelViewport.right>this.pixelViewport.left;if(x!=this.inView&&(this.inView=x,x&&(a=!0)),!this.inView&&!this.scrollTarget&&!Of(e.dom))return 0;let S=l.width;if((this.contentDOMWidth!=S||this.editorHeight!=e.scrollDOM.clientHeight)&&(this.contentDOMWidth=l.width,this.editorHeight=e.scrollDOM.clientHeight,c|=16),a){let k=e.docView.measureVisibleLineHeights(this.viewport);if(s.mustRefreshForHeights(k)&&(o=!0),o||s.lineWrapping&&Math.abs(S-this.contentDOMWidth)>s.charWidth){let{lineHeight:C,charWidth:v,textHeight:P}=e.docView.measureTextSize();o=C>0&&s.refresh(r,C,v,P,Math.max(5,S/v),k),o&&(e.docView.minWidth=0,c|=16)}g>0&&b>0?h=Math.max(g,b):g<0&&b<0&&(h=Math.min(g,b)),Dl();for(let C of this.viewports){let v=C.from==this.viewport.from?k:e.docView.measureVisibleLineHeights(C);this.heightMap=(o?Le.empty().applyChanges(this.stateDeco,ee.empty,this.heightOracle,[new Je(0,0,0,e.state.doc.length)]):this.heightMap).updateHeight(s,0,o,new Af(C.from,v))}Bn&&(c|=2)}let R=!this.viewportIsAppropriate(this.viewport,h)||this.scrollTarget&&(this.scrollTarget.range.head<this.viewport.from||this.scrollTarget.range.head>this.viewport.to);return R&&(c&2&&(c|=this.updateScaler()),this.viewport=this.getViewport(h,this.scrollTarget),c|=this.updateForViewport()),(c&2||R)&&this.updateViewportLines(),(this.lineGaps.length||this.viewport.to-this.viewport.from>4e3)&&this.updateLineGaps(this.ensureLineGaps(o?[]:this.lineGaps,e)),c|=this.computeVisibleRanges(),this.mustEnforceCursorAssoc&&(this.mustEnforceCursorAssoc=!1,e.docView.enforceCursorAssoc()),c}get visibleTop(){return this.scaler.fromDOM(this.pixelViewport.top)}get visibleBottom(){return this.scaler.fromDOM(this.pixelViewport.bottom)}getViewport(e,t){let n=.5-Math.max(-.5,Math.min(.5,e/1e3/2)),s=this.heightMap,r=this.heightOracle,{visibleTop:o,visibleBottom:l}=this,a=new Di(s.lineAt(o-n*1e3,ae.ByHeight,r,0,0).from,s.lineAt(l+(1-n)*1e3,ae.ByHeight,r,0,0).to);if(t){let{head:c}=t.range;if(c<a.from||c>a.to){let h=Math.min(this.editorHeight,this.pixelViewport.bottom-this.pixelViewport.top),u=s.lineAt(c,ae.ByPos,r,0,0),d;t.y=="center"?d=(u.top+u.bottom)/2-h/2:t.y=="start"||t.y=="nearest"&&c<a.from?d=u.top:d=u.bottom-h,a=new Di(s.lineAt(d-1e3/2,ae.ByHeight,r,0,0).from,s.lineAt(d+h+1e3/2,ae.ByHeight,r,0,0).to)}}return a}mapViewport(e,t){let n=t.mapPos(e.from,-1),s=t.mapPos(e.to,1);return new Di(this.heightMap.lineAt(n,ae.ByPos,this.heightOracle,0,0).from,this.heightMap.lineAt(s,ae.ByPos,this.heightOracle,0,0).to)}viewportIsAppropriate({from:e,to:t},n=0){if(!this.inView)return!0;let{top:s}=this.heightMap.lineAt(e,ae.ByPos,this.heightOracle,0,0),{bottom:r}=this.heightMap.lineAt(t,ae.ByPos,this.heightOracle,0,0),{visibleTop:o,visibleBottom:l}=this;return(e==0||s<=o-Math.max(10,Math.min(-n,250)))&&(t==this.state.doc.length||r>=l+Math.max(10,Math.min(n,250)))&&s>o-2*1e3&&r<l+2*1e3}mapLineGaps(e,t){if(!e.length||t.empty)return e;let n=[];for(let s of e)t.touchesRange(s.from,s.to)||n.push(new Ks(t.mapPos(s.from),t.mapPos(s.to),s.size,s.displaySize));return n}ensureLineGaps(e,t){let n=this.heightOracle.lineWrapping,s=n?1e4:2e3,r=s>>1,o=s<<1;if(this.defaultTextDirection!=de.LTR&&!n)return[];let l=[],a=(h,u,d,f)=>{if(u-h<r)return;let p=this.state.selection.main,m=[p.from];p.empty||m.push(p.to);for(let b of m)if(b>h&&b<u){a(h,b-10,d,f),a(b+10,u,d,f);return}let g=zf(e,b=>b.from>=d.from&&b.to<=d.to&&Math.abs(b.from-h)<r&&Math.abs(b.to-u)<r&&!m.some(x=>b.from<x&&b.to>x));if(!g){if(u<d.to&&t&&n&&t.visibleRanges.some(S=>S.from<=u&&S.to>=u)){let S=t.moveToLineBoundary(_.cursor(u),!1,!0).head;S>h&&(u=S)}let b=this.gapSize(d,h,u,f),x=n||b<2e6?b:2e6;g=new Ks(h,u,b,x)}l.push(g)},c=h=>{if(h.length<o||h.type!=Ae.Text)return;let u=If(h.from,h.to,this.stateDeco);if(u.total<o)return;let d=this.scrollTarget?this.scrollTarget.range.head:null,f,p;if(n){let m=s/this.heightOracle.lineLength*this.heightOracle.lineHeight,g,b;if(d!=null){let x=Oi(u,d),S=((this.visibleBottom-this.visibleTop)/2+m)/h.height;g=x-S,b=x+S}else g=(this.visibleTop-h.top-m)/h.height,b=(this.visibleBottom-h.top+m)/h.height;f=Pi(u,g),p=Pi(u,b)}else{let m=u.total*this.heightOracle.charWidth,g=s*this.heightOracle.charWidth,b=0;if(m>2e6)for(let C of e)C.from>=h.from&&C.from<h.to&&C.size!=C.displaySize&&C.from*this.heightOracle.charWidth+b<this.pixelViewport.left&&(b=C.size-C.displaySize);let x=this.pixelViewport.left+b,S=this.pixelViewport.right+b,R,k;if(d!=null){let C=Oi(u,d),v=((S-x)/2+g)/m;R=C-v,k=C+v}else R=(x-g)/m,k=(S+g)/m;f=Pi(u,R),p=Pi(u,k)}f>h.from&&a(h.from,f,h,u),p<h.to&&a(p,h.to,h,u)};for(let h of this.viewportLines)Array.isArray(h.type)?h.type.forEach(c):c(h);return l}gapSize(e,t,n,s){let r=Oi(s,n)-Oi(s,t);return this.heightOracle.lineWrapping?e.height*r:s.total*this.heightOracle.charWidth*r}updateLineGaps(e){Ks.same(e,this.lineGaps)||(this.lineGaps=e,this.lineGapDeco=ye.set(e.map(t=>t.draw(this,this.heightOracle.lineWrapping))))}computeVisibleRanges(e){let t=this.stateDeco;this.lineGaps.length&&(t=t.concat(this.lineGapDeco));let n=[];Z.spans(t,this.viewport.from,this.viewport.to,{span(r,o){n.push({from:r,to:o})},point(){}},20);let s=0;if(n.length!=this.visibleRanges.length)s=12;else for(let r=0;r<n.length&&!(s&8);r++){let o=this.visibleRanges[r],l=n[r];(o.from!=l.from||o.to!=l.to)&&(s|=4,e&&e.mapPos(o.from,-1)==l.from&&e.mapPos(o.to,1)==l.to||(s|=8))}return this.visibleRanges=n,s}lineBlockAt(e){return e>=this.viewport.from&&e<=this.viewport.to&&this.viewportLines.find(t=>t.from<=e&&t.to>=e)||Jn(this.heightMap.lineAt(e,ae.ByPos,this.heightOracle,0,0),this.scaler)}lineBlockAtHeight(e){return e>=this.viewportLines[0].top&&e<=this.viewportLines[this.viewportLines.length-1].bottom&&this.viewportLines.find(t=>t.top<=e&&t.bottom>=e)||Jn(this.heightMap.lineAt(this.scaler.fromDOM(e),ae.ByHeight,this.heightOracle,0,0),this.scaler)}getScrollOffset(){return(this.scrollParent==this.view.scrollDOM?this.scrollParent.scrollTop:(this.scrollParent?this.scrollParent.getBoundingClientRect().top:0)-this.view.contentDOM.getBoundingClientRect().top)*this.scaleY}scrollAnchorAt(e){let t=this.lineBlockAtHeight(e+8);return t.from>=this.viewport.from||this.viewportLines[0].top-e>200?t:this.viewportLines[0]}elementAtHeight(e){return Jn(this.heightMap.blockAt(this.scaler.fromDOM(e),this.heightOracle,0,0),this.scaler)}get docHeight(){return this.scaler.toDOM(this.heightMap.height)}get contentHeight(){return this.docHeight+this.paddingTop+this.paddingBottom}}class Di{constructor(e,t){this.from=e,this.to=t}}function If(i,e,t){let n=[],s=i,r=0;return Z.spans(t,i,e,{span(){},point(o,l){o>s&&(n.push({from:s,to:o}),r+=o-s),s=l}},20),s<e&&(n.push({from:s,to:e}),r+=e-s),{total:r,ranges:n}}function Pi({total:i,ranges:e},t){if(t<=0)return e[0].from;if(t>=1)return e[e.length-1].to;let n=Math.floor(i*t);for(let s=0;;s++){let{from:r,to:o}=e[s],l=o-r;if(n<=l)return r+n;n-=l}}function Oi(i,e){let t=0;for(let{from:n,to:s}of i.ranges){if(e<=s){t+=e-n;break}t+=s-n}return t/i.total}function zf(i,e){for(let t of i)if(e(t))return t}const Ll={toDOM(i){return i},fromDOM(i){return i},scale:1,eq(i){return i==this}};function Rl(i){let e=i.facet(ws).filter(n=>typeof n!="function"),t=i.facet(_o).filter(n=>typeof n!="function");return t.length&&e.push(Z.join(t)),e}class Ao{constructor(e,t,n){let s=0,r=0,o=0;this.viewports=n.map(({from:l,to:a})=>{let c=t.lineAt(l,ae.ByPos,e,0,0).top,h=t.lineAt(a,ae.ByPos,e,0,0).bottom;return s+=h-c,{from:l,to:a,top:c,bottom:h,domTop:0,domBottom:0}}),this.scale=(7e6-s)/(t.height-s);for(let l of this.viewports)l.domTop=o+(l.top-r)*this.scale,o=l.domBottom=l.domTop+(l.bottom-l.top),r=l.bottom}toDOM(e){for(let t=0,n=0,s=0;;t++){let r=t<this.viewports.length?this.viewports[t]:null;if(!r||e<r.top)return s+(e-n)*this.scale;if(e<=r.bottom)return r.domTop+(e-r.top);n=r.bottom,s=r.domBottom}}fromDOM(e){for(let t=0,n=0,s=0;;t++){let r=t<this.viewports.length?this.viewports[t]:null;if(!r||e<r.domTop)return n+(e-s)/this.scale;if(e<=r.domBottom)return r.top+(e-r.domTop);n=r.bottom,s=r.domBottom}}eq(e){return e instanceof Ao?this.scale==e.scale&&this.viewports.length==e.viewports.length&&this.viewports.every((t,n)=>t.from==e.viewports[n].from&&t.to==e.viewports[n].to):!1}}function Jn(i,e){if(e.scale==1)return i;let t=e.toDOM(i.top),n=e.toDOM(i.bottom);return new rt(i.from,i.length,t,n-t,Array.isArray(i._content)?i._content.map(s=>Jn(s,e)):i._content)}const Li=I.define({combine:i=>i.join(" ")}),Nr=I.define({combine:i=>i.indexOf(!0)>-1}),Fr=$t.newName(),Wc=$t.newName(),Vc=$t.newName(),$c={"&light":"."+Wc,"&dark":"."+Vc};function Hr(i,e,t){return new $t(e,{finish(n){return/&/.test(n)?n.replace(/&\w*/,s=>{if(s=="&")return i;if(!t||!t[s])throw new RangeError(`Unsupported selector: ${s}`);return t[s]}):i+" "+n}})}const qf=Hr("."+Fr,{"&":{position:"relative !important",boxSizing:"border-box","&.cm-focused":{outline:"1px dotted #212121"},display:"flex !important",flexDirection:"column"},".cm-scroller":{display:"flex !important",alignItems:"flex-start !important",fontFamily:"monospace",lineHeight:1.4,height:"100%",overflowX:"auto",position:"relative",zIndex:0,overflowAnchor:"none"},".cm-content":{margin:0,flexGrow:2,flexShrink:0,display:"block",whiteSpace:"pre",wordWrap:"normal",boxSizing:"border-box",minHeight:"100%",padding:"4px 0",outline:"none","&[contenteditable=true]":{WebkitUserModify:"read-write-plaintext-only"}},".cm-lineWrapping":{whiteSpace_fallback:"pre-wrap",whiteSpace:"break-spaces",wordBreak:"break-word",overflowWrap:"anywhere",flexShrink:1},"&light .cm-content":{caretColor:"black"},"&dark .cm-content":{caretColor:"white"},".cm-line":{display:"block",padding:"0 2px 0 6px"},".cm-layer":{position:"absolute",left:0,top:0,contain:"size style","& > *":{position:"absolute"}},"&light .cm-selectionBackground":{background:"#d9d9d9"},"&dark .cm-selectionBackground":{background:"#222"},"&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#d7d4f0"},"&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#233"},".cm-cursorLayer":{pointerEvents:"none"},"&.cm-focused > .cm-scroller > .cm-cursorLayer":{animation:"steps(1) cm-blink 1.2s infinite"},"@keyframes cm-blink":{"0%":{},"50%":{opacity:0},"100%":{}},"@keyframes cm-blink2":{"0%":{},"50%":{opacity:0},"100%":{}},".cm-cursor, .cm-dropCursor":{borderLeft:"1.2px solid black",marginLeft:"-0.6px",pointerEvents:"none"},".cm-cursor":{display:"none"},"&dark .cm-cursor":{borderLeftColor:"#ddd"},".cm-selectionHandle":{backgroundColor:"currentColor",width:"1.5px"},".cm-selectionHandle-start::before, .cm-selectionHandle-end::before":{content:'""',backgroundColor:"inherit",borderRadius:"50%",width:"8px",height:"8px",position:"absolute",left:"-3.25px"},".cm-selectionHandle-start::before":{top:"-8px"},".cm-selectionHandle-end::before":{bottom:"-8px"},".cm-dropCursor":{position:"absolute"},"&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor":{display:"block"},".cm-iso":{unicodeBidi:"isolate"},".cm-announced":{position:"fixed",top:"-10000px"},"@media print":{".cm-announced":{display:"none"}},"&light .cm-activeLine":{backgroundColor:"#cceeff44"},"&dark .cm-activeLine":{backgroundColor:"#99eeff33"},"&light .cm-specialChar":{color:"red"},"&dark .cm-specialChar":{color:"#f78"},".cm-gutters":{flexShrink:0,display:"flex",height:"100%",boxSizing:"border-box",zIndex:200},".cm-gutters-before":{insetInlineStart:0},".cm-gutters-after":{insetInlineEnd:0},"&light .cm-gutters":{backgroundColor:"#f5f5f5",color:"#6c6c6c",border:"0px solid #ddd","&.cm-gutters-before":{borderRightWidth:"1px"},"&.cm-gutters-after":{borderLeftWidth:"1px"}},"&dark .cm-gutters":{backgroundColor:"#333338",color:"#ccc"},".cm-gutter":{display:"flex !important",flexDirection:"column",flexShrink:0,boxSizing:"border-box",minHeight:"100%",overflow:"hidden"},".cm-gutterElement":{boxSizing:"border-box"},".cm-lineNumbers .cm-gutterElement":{padding:"0 3px 0 5px",minWidth:"20px",textAlign:"right",whiteSpace:"nowrap"},"&light .cm-activeLineGutter":{backgroundColor:"#e2f2ff"},"&dark .cm-activeLineGutter":{backgroundColor:"#222227"},".cm-panels":{boxSizing:"border-box",position:"sticky",left:0,right:0,zIndex:300},"&light .cm-panels":{backgroundColor:"#f5f5f5",color:"black"},"&light .cm-panels-top":{borderBottom:"1px solid #ddd"},"&light .cm-panels-bottom":{borderTop:"1px solid #ddd"},"&dark .cm-panels":{backgroundColor:"#333338",color:"white"},".cm-dialog":{padding:"2px 19px 4px 6px",position:"relative","& label":{fontSize:"80%"}},".cm-dialog-close":{position:"absolute",top:"3px",right:"4px",backgroundColor:"inherit",border:"none",font:"inherit",fontSize:"14px",padding:"0"},".cm-tab":{display:"inline-block",overflow:"hidden",verticalAlign:"bottom"},".cm-widgetBuffer":{verticalAlign:"text-top",height:"1em",width:0,display:"inline"},".cm-placeholder":{color:"#888",display:"inline-block",verticalAlign:"top",userSelect:"none"},".cm-highlightSpace":{backgroundImage:"radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",backgroundPosition:"center"},".cm-highlightTab":{backgroundImage:`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,backgroundSize:"auto 100%",backgroundPosition:"right 90%",backgroundRepeat:"no-repeat"},".cm-trailingSpace":{backgroundColor:"#ff332255"},".cm-button":{verticalAlign:"middle",color:"inherit",fontSize:"70%",padding:".2em 1em",borderRadius:"1px"},"&light .cm-button":{backgroundImage:"linear-gradient(#eff1f5, #d9d9df)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#b4b4b4, #d0d3d6)"}},"&dark .cm-button":{backgroundImage:"linear-gradient(#393939, #111)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#111, #333)"}},".cm-textfield":{verticalAlign:"middle",color:"inherit",fontSize:"70%",border:"1px solid silver",padding:".2em .5em"},"&light .cm-textfield":{backgroundColor:"white"},"&dark .cm-textfield":{border:"1px solid #555",backgroundColor:"inherit"}},$c),Nf={childList:!0,characterData:!0,subtree:!0,attributes:!0,characterDataOldValue:!0},Xs=O.ie&&O.ie_version<=11;class Ff{constructor(e){this.view=e,this.active=!1,this.editContext=null,this.selectionRange=new md,this.selectionChanged=!1,this.delayedFlush=-1,this.resizeTimeout=-1,this.queue=[],this.delayedAndroidKey=null,this.flushingAndroidKey=-1,this.lastChange=0,this.scrollTargets=[],this.intersection=null,this.resizeScroll=null,this.intersecting=!1,this.gapIntersection=null,this.gaps=[],this.printQuery=null,this.parentCheck=-1,this.dom=e.contentDOM,this.observer=new MutationObserver(t=>{for(let n of t)this.queue.push(n);(O.ie&&O.ie_version<=11||O.ios&&e.composing)&&t.some(n=>n.type=="childList"&&n.removedNodes.length||n.type=="characterData"&&n.oldValue.length>n.target.nodeValue.length)?this.flushSoon():this.flush()}),window.EditContext&&O.android&&e.constructor.EDIT_CONTEXT!==!1&&!(O.chrome&&O.chrome_version<126)&&(this.editContext=new Wf(e),e.state.facet(Dt)&&(e.contentDOM.editContext=this.editContext.editContext)),Xs&&(this.onCharData=t=>{this.queue.push({target:t.target,type:"characterData",oldValue:t.prevValue}),this.flushSoon()}),this.onSelectionChange=this.onSelectionChange.bind(this),this.onResize=this.onResize.bind(this),this.onPrint=this.onPrint.bind(this),this.onScroll=this.onScroll.bind(this),window.matchMedia&&(this.printQuery=window.matchMedia("print")),typeof ResizeObserver=="function"&&(this.resizeScroll=new ResizeObserver(()=>{var t;((t=this.view.docView)===null||t===void 0?void 0:t.lastUpdate)<Date.now()-75&&this.onResize()}),this.resizeScroll.observe(e.scrollDOM)),this.addWindowListeners(this.win=e.win),this.start(),typeof IntersectionObserver=="function"&&(this.intersection=new IntersectionObserver(t=>{this.parentCheck<0&&(this.parentCheck=setTimeout(this.listenForScroll.bind(this),1e3)),t.length>0&&t[t.length-1].intersectionRatio>0!=this.intersecting&&(this.intersecting=!this.intersecting,this.intersecting!=this.view.inView&&this.onScrollChanged(document.createEvent("Event")))},{threshold:[0,.001]}),this.intersection.observe(this.dom),this.gapIntersection=new IntersectionObserver(t=>{t.length>0&&t[t.length-1].intersectionRatio>0&&this.onScrollChanged(document.createEvent("Event"))},{})),this.listenForScroll(),this.readSelectionRange()}onScrollChanged(e){this.view.inputState.runHandlers("scroll",e),this.intersecting&&this.view.measure()}onScroll(e){this.intersecting&&this.flush(!1),this.editContext&&this.view.requestMeasure(this.editContext.measureReq),this.onScrollChanged(e)}onResize(){this.resizeTimeout<0&&(this.resizeTimeout=setTimeout(()=>{this.resizeTimeout=-1,this.view.requestMeasure()},50))}onPrint(e){(e.type=="change"||!e.type)&&!e.matches||(this.view.viewState.printing=!0,this.view.measure(),setTimeout(()=>{this.view.viewState.printing=!1,this.view.requestMeasure()},500))}updateGaps(e){if(this.gapIntersection&&(e.length!=this.gaps.length||this.gaps.some((t,n)=>t!=e[n]))){this.gapIntersection.disconnect();for(let t of e)this.gapIntersection.observe(t);this.gaps=e}}onSelectionChange(e){let t=this.selectionChanged;if(!this.readSelectionRange()||this.delayedAndroidKey)return;let{view:n}=this,s=this.selectionRange;if(n.state.facet(Dt)?n.root.activeElement!=this.dom:!ti(this.dom,s))return;let r=s.anchorNode&&n.docView.tile.nearest(s.anchorNode);if(r&&r.isWidget()&&r.widget.ignoreEvent(e)){t||(this.selectionChanged=!1);return}(O.ie&&O.ie_version<=11||O.android&&O.chrome)&&!n.state.selection.main.empty&&s.focusNode&&ni(s.focusNode,s.focusOffset,s.anchorNode,s.anchorOffset)?this.flushSoon():this.flush(!1)}readSelectionRange(){let{view:e}=this,t=ui(e.root);if(!t)return!1;let n=O.safari&&e.root.nodeType==11&&e.root.activeElement==this.dom&&Hf(this.view,t)||t;if(!n||this.selectionRange.eq(n))return!1;let s=ti(this.dom,n);return s&&!this.selectionChanged&&e.inputState.lastFocusTime>Date.now()-200&&e.inputState.lastTouchTime<Date.now()-300&&bd(this.dom,n)?(this.view.inputState.lastFocusTime=0,e.docView.updateSelection(),!1):(this.selectionRange.setRange(n),s&&(this.selectionChanged=!0),!0)}setSelectionRange(e,t){this.selectionRange.set(e.node,e.offset,t.node,t.offset),this.selectionChanged=!1}clearSelectionRange(){this.selectionRange.set(null,0,null,0)}listenForScroll(){this.parentCheck=-1;let e=0,t=null;for(let n=this.dom;n;)if(n.nodeType==1)!t&&e<this.scrollTargets.length&&this.scrollTargets[e]==n?e++:t||(t=this.scrollTargets.slice(0,e)),t&&t.push(n),n=n.assignedSlot||n.parentNode;else if(n.nodeType==11)n=n.host;else break;if(e<this.scrollTargets.length&&!t&&(t=this.scrollTargets.slice(0,e)),t){for(let n of this.scrollTargets)n.removeEventListener("scroll",this.onScroll);for(let n of this.scrollTargets=t)n.addEventListener("scroll",this.onScroll)}}ignore(e){if(!this.active)return e();try{return this.stop(),e()}finally{this.start(),this.clear()}}start(){this.active||(this.observer.observe(this.dom,Nf),Xs&&this.dom.addEventListener("DOMCharacterDataModified",this.onCharData),this.active=!0)}stop(){this.active&&(this.active=!1,this.observer.disconnect(),Xs&&this.dom.removeEventListener("DOMCharacterDataModified",this.onCharData))}clear(){this.processRecords(),this.queue.length=0,this.selectionChanged=!1}delayAndroidKey(e,t){var n;if(!this.delayedAndroidKey){let s=()=>{let r=this.delayedAndroidKey;r&&(this.clearDelayedAndroidKey(),this.view.inputState.lastKeyCode=r.keyCode,this.view.inputState.lastKeyTime=Date.now(),!this.flush()&&r.force&&Cn(this.dom,r.key,r.keyCode))};this.flushingAndroidKey=this.view.win.requestAnimationFrame(s)}(!this.delayedAndroidKey||e=="Enter")&&(this.delayedAndroidKey={key:e,keyCode:t,force:this.lastChange<Date.now()-50||!!(!((n=this.delayedAndroidKey)===null||n===void 0)&&n.force)})}clearDelayedAndroidKey(){this.win.cancelAnimationFrame(this.flushingAndroidKey),this.delayedAndroidKey=null,this.flushingAndroidKey=-1}flushSoon(){this.delayedFlush<0&&(this.delayedFlush=this.view.win.requestAnimationFrame(()=>{this.delayedFlush=-1,this.flush()}))}forceFlush(){this.delayedFlush>=0&&(this.view.win.cancelAnimationFrame(this.delayedFlush),this.delayedFlush=-1),this.flush()}pendingRecords(){for(let e of this.observer.takeRecords())this.queue.push(e);return this.queue}processRecords(){let e=this.pendingRecords();e.length&&(this.queue=[]);let t=-1,n=-1,s=!1;for(let r of e){let o=this.readMutation(r);o&&(o.typeOver&&(s=!0),t==-1?{from:t,to:n}=o:(t=Math.min(o.from,t),n=Math.max(o.to,n)))}return{from:t,to:n,typeOver:s}}readChange(){let{from:e,to:t,typeOver:n}=this.processRecords(),s=this.selectionChanged&&ti(this.dom,this.selectionRange);if(e<0&&!s)return null;e>-1&&(this.lastChange=Date.now()),this.view.inputState.lastFocusTime=0,this.selectionChanged=!1;let r=new rf(this.view,e,t,n);return this.view.docView.domChanged={newSel:r.newSel?r.newSel.main:null},r}flush(e=!0){if(this.delayedFlush>=0||this.delayedAndroidKey)return!1;e&&this.readSelectionRange();let t=this.readChange();if(!t)return this.view.requestMeasure(),!1;let n=this.view.state,s=Dc(this.view,t);return this.view.state==n&&(t.domChanged||t.newSel&&!cs(this.view.state.selection,t.newSel.main))&&this.view.update([]),s}readMutation(e){let t=this.view.docView.tile.nearest(e.target);if(!t||t.isWidget())return null;if(t.markDirty(e.type=="attributes"),e.type=="childList"){let n=Il(t,e.previousSibling||e.target.previousSibling,-1),s=Il(t,e.nextSibling||e.target.nextSibling,1);return{from:n?t.posAfter(n):t.posAtStart,to:s?t.posBefore(s):t.posAtEnd,typeOver:!1}}else return e.type=="characterData"?{from:t.posAtStart,to:t.posAtEnd,typeOver:e.target.nodeValue==e.oldValue}:null}setWindow(e){e!=this.win&&(this.removeWindowListeners(this.win),this.win=e,this.addWindowListeners(this.win))}addWindowListeners(e){e.addEventListener("resize",this.onResize),this.printQuery?this.printQuery.addEventListener?this.printQuery.addEventListener("change",this.onPrint):this.printQuery.addListener(this.onPrint):e.addEventListener("beforeprint",this.onPrint),e.addEventListener("scroll",this.onScroll),e.document.addEventListener("selectionchange",this.onSelectionChange)}removeWindowListeners(e){e.removeEventListener("scroll",this.onScroll),e.removeEventListener("resize",this.onResize),this.printQuery?this.printQuery.removeEventListener?this.printQuery.removeEventListener("change",this.onPrint):this.printQuery.removeListener(this.onPrint):e.removeEventListener("beforeprint",this.onPrint),e.document.removeEventListener("selectionchange",this.onSelectionChange)}update(e){this.editContext&&(this.editContext.update(e),e.startState.facet(Dt)!=e.state.facet(Dt)&&(e.view.contentDOM.editContext=e.state.facet(Dt)?this.editContext.editContext:null))}destroy(){var e,t,n;this.stop(),(e=this.intersection)===null||e===void 0||e.disconnect(),(t=this.gapIntersection)===null||t===void 0||t.disconnect(),(n=this.resizeScroll)===null||n===void 0||n.disconnect();for(let s of this.scrollTargets)s.removeEventListener("scroll",this.onScroll);this.removeWindowListeners(this.win),clearTimeout(this.parentCheck),clearTimeout(this.resizeTimeout),this.win.cancelAnimationFrame(this.delayedFlush),this.win.cancelAnimationFrame(this.flushingAndroidKey),this.editContext&&(this.view.contentDOM.editContext=null,this.editContext.destroy())}}function Il(i,e,t){for(;e;){let n=pe.get(e);if(n&&n.parent==i)return n;let s=e.parentNode;e=s!=i.dom?s:t>0?e.nextSibling:e.previousSibling}return null}function zl(i,e){let t=e.startContainer,n=e.startOffset,s=e.endContainer,r=e.endOffset,o=i.docView.domAtPos(i.state.selection.main.anchor,1);return ni(o.node,o.offset,s,r)&&([t,n,s,r]=[s,r,t,n]),{anchorNode:t,anchorOffset:n,focusNode:s,focusOffset:r}}function Hf(i,e){if(e.getComposedRanges){let s=e.getComposedRanges(i.root)[0];if(s)return zl(i,s)}let t=null;function n(s){s.preventDefault(),s.stopImmediatePropagation(),t=s.getTargetRanges()[0]}return i.contentDOM.addEventListener("beforeinput",n,!0),i.dom.ownerDocument.execCommand("indent"),i.contentDOM.removeEventListener("beforeinput",n,!0),t?zl(i,t):null}class Wf{constructor(e){this.from=0,this.to=0,this.pendingContextChange=null,this.handlers=Object.create(null),this.composing=null,this.resetRange(e.state);let t=this.editContext=new window.EditContext({text:e.state.doc.sliceString(this.from,this.to),selectionStart:this.toContextPos(Math.max(this.from,Math.min(this.to,e.state.selection.main.anchor))),selectionEnd:this.toContextPos(e.state.selection.main.head)});this.handlers.textupdate=n=>{let s=e.state.selection.main,{anchor:r,head:o}=s,l=this.toEditorPos(n.updateRangeStart),a=this.toEditorPos(n.updateRangeEnd);e.inputState.composing>=0&&!this.composing&&(this.composing={contextBase:n.updateRangeStart,editorBase:l,drifted:!1});let c=a-l>n.text.length;l==this.from&&r<this.from?l=r:a==this.to&&r>this.to&&(a=r);let h=Pc(e.state.sliceDoc(l,a),n.text,(c?s.from:s.to)-l,c?"end":null);if(!h){let d=_.single(this.toEditorPos(n.selectionStart),this.toEditorPos(n.selectionEnd));cs(d,s)||e.dispatch({selection:d,userEvent:"select"});return}let u={from:h.from+l,to:h.toA+l,insert:ee.of(n.text.slice(h.from,h.toB).split(`
`))};if((O.mac||O.android)&&u.from==o-1&&/^\. ?$/.test(n.text)&&e.contentDOM.getAttribute("autocorrect")=="off"&&(u={from:l,to:a,insert:ee.of([n.text.replace("."," ")])}),this.pendingContextChange=u,!e.state.readOnly){let d=this.to-this.from+(u.to-u.from+u.insert.length);So(e,u,_.single(this.toEditorPos(n.selectionStart,d),this.toEditorPos(n.selectionEnd,d)))}this.pendingContextChange&&(this.revertPending(e.state),this.setSelection(e.state)),u.from<u.to&&!u.insert.length&&e.inputState.composing>=0&&!/[\\p{Alphabetic}\\p{Number}_]/.test(t.text.slice(Math.max(0,n.updateRangeStart-1),Math.min(t.text.length,n.updateRangeStart+1)))&&this.handlers.compositionend(n)},this.handlers.characterboundsupdate=n=>{let s=[],r=null;for(let o=this.toEditorPos(n.rangeStart),l=this.toEditorPos(n.rangeEnd);o<l;o++){let a=e.coordsForChar(o);r=a&&new DOMRect(a.left,a.top,a.right-a.left,a.bottom-a.top)||r||new DOMRect,s.push(r)}t.updateCharacterBounds(n.rangeStart,s)},this.handlers.textformatupdate=n=>{let s=[];for(let r of n.getTextFormats()){let o=r.underlineStyle,l=r.underlineThickness;if(!/none/i.test(o)&&!/none/i.test(l)){let a=this.toEditorPos(r.rangeStart),c=this.toEditorPos(r.rangeEnd);if(a<c){let h=`text-decoration: underline ${/^[a-z]/.test(o)?o+" ":o=="Dashed"?"dashed ":o=="Squiggle"?"wavy ":""}${/thin/i.test(l)?1:2}px`;s.push(ye.mark({attributes:{style:h}}).range(a,c))}}}e.dispatch({effects:xc.of(ye.set(s))})},this.handlers.compositionstart=()=>{e.inputState.composing<0&&(e.inputState.composing=0,e.inputState.compositionFirstChange=!0)},this.handlers.compositionend=()=>{if(e.inputState.composing=-1,e.inputState.compositionFirstChange=null,this.composing){let{drifted:n}=this.composing;this.composing=null,n&&this.reset(e.state)}};for(let n in this.handlers)t.addEventListener(n,this.handlers[n]);this.measureReq={read:n=>{this.editContext.updateControlBounds(n.contentDOM.getBoundingClientRect());let s=ui(n.root);s&&s.rangeCount&&this.editContext.updateSelectionBounds(s.getRangeAt(0).getBoundingClientRect())}}}applyEdits(e){let t=0,n=!1,s=this.pendingContextChange;return e.changes.iterChanges((r,o,l,a,c)=>{if(n)return;let h=c.length-(o-r);if(s&&o>=s.to)if(s.from==r&&s.to==o&&s.insert.eq(c)){s=this.pendingContextChange=null,t+=h,this.to+=h;return}else s=null,this.revertPending(e.state);if(r+=t,o+=t,o<=this.from)this.from+=h,this.to+=h;else if(r<this.to){if(r<this.from||o>this.to||this.to-this.from+c.length>3e4){n=!0;return}this.editContext.updateText(this.toContextPos(r),this.toContextPos(o),c.toString()),this.to+=h}t+=h}),s&&!n&&this.revertPending(e.state),!n}update(e){let t=this.pendingContextChange,n=e.startState.selection.main;this.composing&&(this.composing.drifted||!e.changes.touchesRange(n.from,n.to)&&e.transactions.some(s=>!s.isUserEvent("input.type")&&s.changes.touchesRange(this.from,this.to)))?(this.composing.drifted=!0,this.composing.editorBase=e.changes.mapPos(this.composing.editorBase)):!this.applyEdits(e)||!this.rangeIsValid(e.state)?(this.pendingContextChange=null,this.reset(e.state)):(e.docChanged||e.selectionSet||t)&&this.setSelection(e.state),(e.geometryChanged||e.docChanged||e.selectionSet)&&e.view.requestMeasure(this.measureReq)}resetRange(e){let{head:t}=e.selection.main;this.from=Math.max(0,t-1e4),this.to=Math.min(e.doc.length,t+1e4)}reset(e){this.resetRange(e),this.editContext.updateText(0,this.editContext.text.length,e.doc.sliceString(this.from,this.to)),this.setSelection(e)}revertPending(e){let t=this.pendingContextChange;this.pendingContextChange=null,this.editContext.updateText(this.toContextPos(t.from),this.toContextPos(t.from+t.insert.length),e.doc.sliceString(t.from,t.to))}setSelection(e){let{main:t}=e.selection,n=this.toContextPos(Math.max(this.from,Math.min(this.to,t.anchor))),s=this.toContextPos(t.head);(this.editContext.selectionStart!=n||this.editContext.selectionEnd!=s)&&this.editContext.updateSelection(n,s)}rangeIsValid(e){let{head:t}=e.selection.main;return!(this.from>0&&t-this.from<500||this.to<e.doc.length&&this.to-t<500||this.to-this.from>1e4*3)}toEditorPos(e,t=this.to-this.from){e=Math.min(e,t);let n=this.composing;return n&&n.drifted?n.editorBase+(e-n.contextBase):e+this.from}toContextPos(e){let t=this.composing;return t&&t.drifted?t.contextBase+(e-t.editorBase):e-this.from}destroy(){for(let e in this.handlers)this.editContext.removeEventListener(e,this.handlers[e])}}class z{get state(){return this.viewState.state}get viewport(){return this.viewState.viewport}get visibleRanges(){return this.viewState.visibleRanges}get inView(){return this.viewState.inView}get composing(){return!!this.inputState&&this.inputState.composing>0}get compositionStarted(){return!!this.inputState&&this.inputState.composing>=0}get root(){return this._root}get win(){return this.dom.ownerDocument.defaultView||window}constructor(e={}){var t;this.plugins=[],this.pluginMap=new Map,this.editorAttrs={},this.contentAttrs={},this.bidiCache=[],this.destroyed=!1,this.updateState=2,this.measureScheduled=-1,this.measureRequests=[],this.contentDOM=document.createElement("div"),this.scrollDOM=document.createElement("div"),this.scrollDOM.tabIndex=-1,this.scrollDOM.className="cm-scroller",this.scrollDOM.appendChild(this.contentDOM),this.announceDOM=document.createElement("div"),this.announceDOM.className="cm-announced",this.announceDOM.setAttribute("aria-live","polite"),this.dom=document.createElement("div"),this.dom.appendChild(this.announceDOM),this.dom.appendChild(this.scrollDOM),e.parent&&e.parent.appendChild(this.dom);let{dispatch:n}=e;this.dispatchTransactions=e.dispatchTransactions||n&&(s=>s.forEach(r=>n(r,this)))||(s=>this.update(s)),this.dispatch=this.dispatch.bind(this),this._root=e.root||gd(e.parent)||document,this.viewState=new Ol(this,e.state||te.create(e)),e.scrollTo&&e.scrollTo.is(Mi)&&(this.viewState.scrollTarget=e.scrollTo.value.clip(this.viewState.state)),this.plugins=this.state.facet(wn).map(s=>new Ws(s));for(let s of this.plugins)s.update(this);this.observer=new Ff(this),this.inputState=new cf(this),this.inputState.ensureHandlers(this.plugins),this.docView=new vl(this),this.mountStyles(),this.updateAttrs(),this.updateState=0,this.requestMeasure(),!((t=document.fonts)===null||t===void 0)&&t.ready&&document.fonts.ready.then(()=>{this.viewState.mustMeasureContent="refresh",this.requestMeasure()})}dispatch(...e){let t=e.length==1&&e[0]instanceof xe?e:e.length==1&&Array.isArray(e[0])?e[0]:[this.state.update(...e)];this.dispatchTransactions(t,this)}update(e){if(this.updateState!=0)throw new Error("Calls to EditorView.update are not allowed while an update is in progress");let t=!1,n=!1,s,r=this.state;for(let d of e){if(d.startState!=r)throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");r=d.state}if(this.destroyed){this.viewState.state=r;return}let o=this.hasFocus,l=0,a=null;e.some(d=>d.annotation(qc))?(this.inputState.notifiedFocused=o,l=1):o!=this.inputState.notifiedFocused&&(this.inputState.notifiedFocused=o,a=Nc(r,o),a||(l=1));let c=this.observer.delayedAndroidKey,h=null;if(c?(this.observer.clearDelayedAndroidKey(),h=this.observer.readChange(),(h&&!this.state.doc.eq(r.doc)||!this.state.selection.eq(r.selection))&&(h=null)):this.observer.clear(),r.facet(te.phrases)!=this.state.facet(te.phrases))return this.setState(r);s=os.create(this,r,e),s.flags|=l;let u=this.viewState.scrollTarget;try{this.updateState=2;for(let d of e){if(u&&(u=u.map(d.changes)),d.scrollIntoView){let{main:f}=d.state.selection;u=new An(f.empty?f:_.cursor(f.head,f.head>f.anchor?-1:1))}for(let f of d.effects)f.is(Mi)&&(u=f.value.clip(this.state))}this.viewState.update(s,u),this.bidiCache=us.update(this.bidiCache,s.changes),s.empty||(this.updatePlugins(s),this.inputState.update(s)),t=this.docView.update(s),this.state.facet(Yn)!=this.styleModules&&this.mountStyles(),n=this.updateAttrs(),this.showAnnouncements(e),this.docView.updateSelection(t,e.some(d=>d.isUserEvent("select.pointer")))}finally{this.updateState=0}if(s.startState.facet(Li)!=s.state.facet(Li)&&(this.viewState.mustMeasureContent=!0),(t||n||u||this.viewState.mustEnforceCursorAssoc||this.viewState.mustMeasureContent)&&this.requestMeasure(),t&&this.docViewUpdate(),!s.empty)for(let d of this.state.facet(Lr))try{d(s)}catch(f){_t(this.state,f,"update listener")}(a||h)&&Promise.resolve().then(()=>{a&&this.state==a.startState&&this.dispatch(a),h&&!Dc(this,h)&&c.force&&Cn(this.contentDOM,c.key,c.keyCode)})}setState(e){if(this.updateState!=0)throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");if(this.destroyed){this.viewState.state=e;return}this.updateState=2;let t=this.hasFocus;try{for(let n of this.plugins)n.destroy(this);this.viewState=new Ol(this,e),this.plugins=e.facet(wn).map(n=>new Ws(n)),this.pluginMap.clear();for(let n of this.plugins)n.update(this);this.docView.destroy(),this.docView=new vl(this),this.inputState.ensureHandlers(this.plugins),this.mountStyles(),this.updateAttrs(),this.bidiCache=[]}finally{this.updateState=0}t&&this.focus(),this.requestMeasure()}updatePlugins(e){let t=e.startState.facet(wn),n=e.state.facet(wn);if(t!=n){let s=[];for(let r of n){let o=t.indexOf(r);if(o<0)s.push(new Ws(r));else{let l=this.plugins[o];l.mustUpdate=e,s.push(l)}}for(let r of this.plugins)r.mustUpdate!=e&&r.destroy(this);this.plugins=s,this.pluginMap.clear()}else for(let s of this.plugins)s.mustUpdate=e;for(let s=0;s<this.plugins.length;s++)this.plugins[s].update(this);t!=n&&this.inputState.ensureHandlers(this.plugins)}docViewUpdate(){for(let e of this.plugins){let t=e.value;if(t&&t.docViewUpdate)try{t.docViewUpdate(this)}catch(n){_t(this.state,n,"doc view update listener")}}}measure(e=!0){if(this.destroyed)return;if(this.measureScheduled>-1&&this.win.cancelAnimationFrame(this.measureScheduled),this.observer.delayedAndroidKey){this.measureScheduled=-1,this.requestMeasure();return}this.measureScheduled=0,e&&this.observer.forceFlush();let t=null,n=this.viewState.scrollParent,s=this.viewState.getScrollOffset(),{scrollAnchorPos:r,scrollAnchorHeight:o}=this.viewState;Math.abs(s-this.viewState.scrollOffset)>1&&(o=-1),this.viewState.scrollAnchorHeight=-1;try{for(let l=0;;l++){if(o<0)if(sc(n||this.win))r=-1,o=this.viewState.heightMap.height;else{let f=this.viewState.scrollAnchorAt(s);r=f.from,o=f.top}this.updateState=1;let a=this.viewState.measure();if(!a&&!this.measureRequests.length&&this.viewState.scrollTarget==null)break;if(l>5){console.warn(this.measureRequests.length?"Measure loop restarted more than 5 times":"Viewport failed to stabilize");break}let c=[];a&4||([this.measureRequests,c]=[c,this.measureRequests]);let h=c.map(f=>{try{return f.read(this)}catch(p){return _t(this.state,p),ql}}),u=os.create(this,this.state,[]),d=!1;u.flags|=a,t?t.flags|=a:t=u,this.updateState=2,u.empty||(this.updatePlugins(u),this.inputState.update(u),this.updateAttrs(),d=this.docView.update(u),d&&this.docViewUpdate());for(let f=0;f<c.length;f++)if(h[f]!=ql)try{let p=c[f];p.write&&p.write(h[f],this)}catch(p){_t(this.state,p)}if(d&&this.docView.updateSelection(!0),!u.viewportChanged&&this.measureRequests.length==0){if(this.viewState.editorHeight)if(this.viewState.scrollTarget){this.docView.scrollIntoView(this.viewState.scrollTarget),this.viewState.scrollTarget=null,o=-1;continue}else{let p=((r<0?this.viewState.heightMap.height:this.viewState.lineBlockAt(r).top)-o)/this.scaleY;if((p>1||p<-1)&&(n==this.scrollDOM||this.hasFocus||Math.max(this.inputState.lastWheelEvent,this.inputState.lastTouchTime)>Date.now()-100)){s=s+p,n?n.scrollTop+=p:this.win.scrollBy(0,p),o=-1;continue}}break}}}finally{this.updateState=0,this.measureScheduled=-1}if(t&&!t.empty)for(let l of this.state.facet(Lr))l(t)}get themeClasses(){return Fr+" "+(this.state.facet(Nr)?Vc:Wc)+" "+this.state.facet(Li)}updateAttrs(){let e=Nl(this,kc,{class:"cm-editor"+(this.hasFocus?" cm-focused ":" ")+this.themeClasses}),t={spellcheck:"false",autocorrect:"off",autocapitalize:"off",writingsuggestions:"false",translate:"no",contenteditable:this.state.facet(Dt)?"true":"false",class:"cm-content",style:`${O.tabSize}: ${this.state.tabSize}`,role:"textbox","aria-multiline":"true"};this.state.readOnly&&(t["aria-readonly"]="true"),Nl(this,ko,t);let n=this.observer.ignore(()=>{let s=pl(this.contentDOM,this.contentAttrs,t),r=pl(this.dom,this.editorAttrs,e);return s||r});return this.editorAttrs=e,this.contentAttrs=t,n}showAnnouncements(e){let t=!0;for(let n of e)for(let s of n.effects)if(s.is(z.announce)){t&&(this.announceDOM.textContent=""),t=!1;let r=this.announceDOM.appendChild(document.createElement("div"));r.textContent=s.value}}mountStyles(){this.styleModules=this.state.facet(Yn);let e=this.state.facet(z.cspNonce);$t.mount(this.root,this.styleModules.concat(qf).reverse(),e?{nonce:e}:void 0)}readMeasured(){if(this.updateState==2)throw new Error("Reading the editor layout isn't allowed during an update");this.updateState==0&&this.measureScheduled>-1&&this.measure(!1)}requestMeasure(e){if(this.measureScheduled<0&&(this.measureScheduled=this.win.requestAnimationFrame(()=>this.measure())),e){if(this.measureRequests.indexOf(e)>-1)return;if(e.key!=null){for(let t=0;t<this.measureRequests.length;t++)if(this.measureRequests[t].key===e.key){this.measureRequests[t]=e;return}}this.measureRequests.push(e)}}plugin(e){let t=this.pluginMap.get(e);return(t===void 0||t&&t.plugin!=e)&&this.pluginMap.set(e,t=this.plugins.find(n=>n.plugin==e)||null),t&&t.update(this).value}get documentTop(){return this.contentDOM.getBoundingClientRect().top+this.viewState.paddingTop}get documentPadding(){return{top:this.viewState.paddingTop,bottom:this.viewState.paddingBottom}}get scaleX(){return this.viewState.scaleX}get scaleY(){return this.viewState.scaleY}elementAtHeight(e){return this.readMeasured(),this.viewState.elementAtHeight(e)}lineBlockAtHeight(e){return this.readMeasured(),this.viewState.lineBlockAtHeight(e)}get viewportLineBlocks(){return this.viewState.viewportLines}lineBlockAt(e){return this.viewState.lineBlockAt(e)}get contentHeight(){return this.viewState.contentHeight}moveByChar(e,t,n){return js(this,e,xl(this,e,t,n))}moveByGroup(e,t){return js(this,e,xl(this,e,t,n=>Qd(this,e.head,n)))}visualLineSide(e,t){let n=this.bidiSpans(e),s=this.textDirectionAt(e.from),r=n[t?n.length-1:0];return _.cursor(r.side(t,s)+e.from,r.forward(!t,s)?1:-1)}moveToLineBoundary(e,t,n=!0){return Jd(this,e,t,n)}moveVertically(e,t,n){return js(this,e,Zd(this,e,t,n))}domAtPos(e,t=1){return this.docView.domAtPos(e,t)}posAtDOM(e,t=0){return this.docView.posFromDOM(e,t)}posAtCoords(e,t=!0){this.readMeasured();let n=zr(this,e,t);return n&&n.pos}posAndSideAtCoords(e,t=!0){return this.readMeasured(),zr(this,e,t)}coordsAtPos(e,t=1){this.readMeasured();let n=this.docView.coordsAt(e,t);if(!n||n.left==n.right)return n;let s=this.state.doc.lineAt(e),r=this.bidiSpans(s),o=r[kt.find(r,e-s.from,-1,t)];return rs(n,o.dir==de.LTR==t>0)}coordsForChar(e){return this.readMeasured(),this.docView.coordsForChar(e)}get defaultCharacterWidth(){return this.viewState.heightOracle.charWidth}get defaultLineHeight(){return this.viewState.heightOracle.lineHeight}get textDirection(){return this.viewState.defaultTextDirection}textDirectionAt(e){return!this.state.facet(yc)||e<this.viewport.from||e>this.viewport.to?this.textDirection:(this.readMeasured(),this.docView.textDirectionAt(e))}get lineWrapping(){return this.viewState.heightOracle.lineWrapping}bidiSpans(e){if(e.length>Vf)return hc(e.length);let t=this.textDirectionAt(e.from),n;for(let r of this.bidiCache)if(r.from==e.from&&r.dir==t&&(r.fresh||cc(r.isolates,n=bl(this,e))))return r.order;n||(n=bl(this,e));let s=Sd(e.text,t,n);return this.bidiCache.push(new us(e.from,e.to,t,n,!0,s)),s}get hasFocus(){var e;return(this.dom.ownerDocument.hasFocus()||O.safari&&((e=this.inputState)===null||e===void 0?void 0:e.lastContextMenu)>Date.now()-3e4)&&this.root.activeElement==this.contentDOM}focus(){this.observer.ignore(()=>{ic(this.contentDOM),this.docView.updateSelection()})}setRoot(e){this._root!=e&&(this._root=e,this.observer.setWindow((e.nodeType==9?e:e.ownerDocument).defaultView||window),this.mountStyles())}destroy(){this.root.activeElement==this.contentDOM&&this.contentDOM.blur();for(let e of this.plugins)e.destroy(this);this.plugins=[],this.inputState.destroy(),this.docView.destroy(),this.dom.remove(),this.observer.destroy(),this.measureScheduled>-1&&this.win.cancelAnimationFrame(this.measureScheduled),this.destroyed=!0}static scrollIntoView(e,t={}){return Mi.of(new An(typeof e=="number"?_.cursor(e):e,t.y,t.x,t.yMargin,t.xMargin))}scrollSnapshot(){let{scrollTop:e,scrollLeft:t}=this.scrollDOM,n=this.viewState.scrollAnchorAt(e);return Mi.of(new An(_.cursor(n.from),"start","start",n.top-e,t,!0))}setTabFocusMode(e){e==null?this.inputState.tabFocusMode=this.inputState.tabFocusMode<0?0:-1:typeof e=="boolean"?this.inputState.tabFocusMode=e?0:-1:this.inputState.tabFocusMode!=0&&(this.inputState.tabFocusMode=Date.now()+e)}static domEventHandlers(e){return Tt.define(()=>({}),{eventHandlers:e})}static domEventObservers(e){return Tt.define(()=>({}),{eventObservers:e})}static theme(e,t){let n=$t.newName(),s=[Li.of(n),Yn.of(Hr(`.${n}`,e))];return t&&t.dark&&s.push(Nr.of(!0)),s}static baseTheme(e){return ms.lowest(Yn.of(Hr("."+Fr,e,$c)))}static findFromDOM(e){var t;let n=e.querySelector(".cm-content"),s=n&&pe.get(n)||pe.get(e);return((t=s==null?void 0:s.root)===null||t===void 0?void 0:t.view)||null}}z.styleModule=Yn;z.inputHandler=gc;z.clipboardInputFilter=vo;z.clipboardOutputFilter=xo;z.scrollHandler=vc;z.focusChangeEffect=bc;z.perLineTextDirection=yc;z.exceptionSink=mc;z.updateListener=Lr;z.editable=Dt;z.mouseSelectionStyle=pc;z.dragMovesSelection=fc;z.clickAddsSelectionRange=dc;z.decorations=ws;z.blockWrappers=_c;z.outerDecorations=_o;z.atomicRanges=ki;z.bidiIsolatedRanges=Sc;z.scrollMargins=Cc;z.darkTheme=Nr;z.cspNonce=I.define({combine:i=>i.length?i[0]:""});z.contentAttributes=ko;z.editorAttributes=kc;z.lineWrapping=z.contentAttributes.of({class:"cm-lineWrapping"});z.announce=be.define();const Vf=4096,ql={};class us{constructor(e,t,n,s,r,o){this.from=e,this.to=t,this.dir=n,this.isolates=s,this.fresh=r,this.order=o}static update(e,t){if(t.empty&&!e.some(r=>r.fresh))return e;let n=[],s=e.length?e[e.length-1].dir:de.LTR;for(let r=Math.max(0,e.length-10);r<e.length;r++){let o=e[r];o.dir==s&&!t.touchesRange(o.from,o.to)&&n.push(new us(t.mapPos(o.from,1),t.mapPos(o.to,-1),o.dir,o.isolates,!1,o.order))}return n}}function Nl(i,e,t){for(let n=i.state.facet(e),s=n.length-1;s>=0;s--){let r=n[s],o=typeof r=="function"?r(i):r;o&&bo(o,t)}return t}const $f=O.mac?"mac":O.windows?"win":O.linux?"linux":"key";function Uf(i,e){const t=i.split(/-(?!$)/);let n=t[t.length-1];n=="Space"&&(n=" ");let s,r,o,l;for(let a=0;a<t.length-1;++a){const c=t[a];if(/^(cmd|meta|m)$/i.test(c))l=!0;else if(/^a(lt)?$/i.test(c))s=!0;else if(/^(c|ctrl|control)$/i.test(c))r=!0;else if(/^s(hift)?$/i.test(c))o=!0;else if(/^mod$/i.test(c))e=="mac"?l=!0:r=!0;else throw new Error("Unrecognized modifier name: "+c)}return s&&(n="Alt-"+n),r&&(n="Ctrl-"+n),l&&(n="Meta-"+n),o&&(n="Shift-"+n),n}function Ri(i,e,t){return e.altKey&&(i="Alt-"+i),e.ctrlKey&&(i="Ctrl-"+i),e.metaKey&&(i="Meta-"+i),t!==!1&&e.shiftKey&&(i="Shift-"+i),i}const jf=ms.default(z.domEventHandlers({keydown(i,e){return Yf(Kf(e.state),i,e,"editor")}})),Uc=I.define({enables:jf}),Fl=new WeakMap;function Kf(i){let e=i.facet(Uc),t=Fl.get(e);return t||Fl.set(e,t=Gf(e.reduce((n,s)=>n.concat(s),[]))),t}let Ft=null;const Xf=4e3;function Gf(i,e=$f){let t=Object.create(null),n=Object.create(null),s=(o,l)=>{let a=n[o];if(a==null)n[o]=l;else if(a!=l)throw new Error("Key binding "+o+" is used both as a regular binding and as a multi-stroke prefix")},r=(o,l,a,c,h)=>{var u,d;let f=t[o]||(t[o]=Object.create(null)),p=l.split(/ (?!$)/).map(b=>Uf(b,e));for(let b=1;b<p.length;b++){let x=p.slice(0,b).join(" ");s(x,!0),f[x]||(f[x]={preventDefault:!0,stopPropagation:!1,run:[S=>{let R=Ft={view:S,prefix:x,scope:o};return setTimeout(()=>{Ft==R&&(Ft=null)},Xf),!0}]})}let m=p.join(" ");s(m,!1);let g=f[m]||(f[m]={preventDefault:!1,stopPropagation:!1,run:((d=(u=f._any)===null||u===void 0?void 0:u.run)===null||d===void 0?void 0:d.slice())||[]});a&&g.run.push(a),c&&(g.preventDefault=!0),h&&(g.stopPropagation=!0)};for(let o of i){let l=o.scope?o.scope.split(" "):["editor"];if(o.any)for(let c of l){let h=t[c]||(t[c]=Object.create(null));h._any||(h._any={preventDefault:!1,stopPropagation:!1,run:[]});let{any:u}=o;for(let d in h)h[d].run.push(f=>u(f,Wr))}let a=o[e]||o.key;if(a)for(let c of l)r(c,a,o.run,o.preventDefault,o.stopPropagation),o.shift&&r(c,"Shift-"+a,o.shift,o.preventDefault,o.stopPropagation)}return t}let Wr=null;function Yf(i,e,t,n){Wr=e;let s=ad(e),r=$u(s,0),o=Uu(r)==s.length&&s!=" ",l="",a=!1,c=!1,h=!1;Ft&&Ft.view==t&&Ft.scope==n&&(l=Ft.prefix+" ",Lc.indexOf(e.keyCode)<0&&(c=!0,Ft=null));let u=new Set,d=g=>{if(g){for(let b of g.run)if(!u.has(b)&&(u.add(b),b(t)))return g.stopPropagation&&(h=!0),!0;g.preventDefault&&(g.stopPropagation&&(h=!0),c=!0)}return!1},f=i[n],p,m;return f&&(d(f[l+Ri(s,e,!o)])?a=!0:o&&(e.altKey||e.metaKey||e.ctrlKey)&&!(O.windows&&e.ctrlKey&&e.altKey)&&!(O.mac&&e.altKey&&!(e.ctrlKey||e.metaKey))&&(p=Ut[e.keyCode])&&p!=s?(d(f[l+Ri(p,e,!0)])||e.shiftKey&&(m=ci[e.keyCode])!=s&&m!=p&&d(f[l+Ri(m,e,!1)]))&&(a=!0):o&&e.shiftKey&&d(f[l+Ri(s,e,!0)])&&(a=!0),!a&&d(f._any)&&(a=!0)),c&&(a=!0),a&&h&&e.stopPropagation(),Wr=null,a}class sn{constructor(e,t,n,s,r){this.className=e,this.left=t,this.top=n,this.width=s,this.height=r}draw(){let e=document.createElement("div");return e.className=this.className,this.adjust(e),e}update(e,t){return t.className!=this.className?!1:(this.adjust(e),!0)}adjust(e){e.style.left=this.left+"px",e.style.top=this.top+"px",this.width!=null&&(e.style.width=this.width+"px"),e.style.height=this.height+"px"}eq(e){return this.left==e.left&&this.top==e.top&&this.width==e.width&&this.height==e.height&&this.className==e.className}static forRange(e,t,n){if(n.empty){let s=e.coordsAtPos(n.head,n.assoc||1);if(!s)return[];let r=jc(e);return[new sn(t,s.left-r.left,s.top-r.top,null,s.bottom-s.top)]}else return Jf(e,t,n)}}function jc(i){let e=i.scrollDOM.getBoundingClientRect();return{left:(i.textDirection==de.LTR?e.left:e.right-i.scrollDOM.clientWidth*i.scaleX)-i.scrollDOM.scrollLeft*i.scaleX,top:e.top-i.scrollDOM.scrollTop*i.scaleY}}function Hl(i,e,t,n){let s=i.coordsAtPos(e,t*2);if(!s)return n;let r=i.dom.getBoundingClientRect(),o=(s.top+s.bottom)/2,l=i.posAtCoords({x:r.left+1,y:o}),a=i.posAtCoords({x:r.right-1,y:o});return l==null||a==null?n:{from:Math.max(n.from,Math.min(l,a)),to:Math.min(n.to,Math.max(l,a))}}function Jf(i,e,t){if(t.to<=i.viewport.from||t.from>=i.viewport.to)return[];let n=Math.max(t.from,i.viewport.from),s=Math.min(t.to,i.viewport.to),r=i.textDirection==de.LTR,o=i.contentDOM,l=o.getBoundingClientRect(),a=jc(i),c=o.querySelector(".cm-line"),h=c&&window.getComputedStyle(c),u=l.left+(h?parseInt(h.paddingLeft)+Math.min(0,parseInt(h.textIndent)):0),d=l.right-(h?parseInt(h.paddingRight):0),f=Ir(i,n,1),p=Ir(i,s,-1),m=f.type==Ae.Text?f:null,g=p.type==Ae.Text?p:null;if(m&&(i.lineWrapping||f.widgetLineBreaks)&&(m=Hl(i,n,1,m)),g&&(i.lineWrapping||p.widgetLineBreaks)&&(g=Hl(i,s,-1,g)),m&&g&&m.from==g.from&&m.to==g.to)return x(S(t.from,t.to,m));{let k=m?S(t.from,null,m):R(f,!1),C=g?S(null,t.to,g):R(p,!0),v=[];return(m||f).to<(g||p).from-(m&&g?1:0)||f.widgetLineBreaks>1&&k.bottom+i.defaultLineHeight/2<C.top?v.push(b(u,k.bottom,d,C.top)):k.bottom<C.top&&i.elementAtHeight((k.bottom+C.top)/2).type==Ae.Text&&(k.bottom=C.top=(k.bottom+C.top)/2),x(k).concat(v).concat(x(C))}function b(k,C,v,P){return new sn(e,k-a.left,C-a.top,Math.max(0,v-k),P-C)}function x({top:k,bottom:C,horizontal:v}){let P=[];for(let M=0;M<v.length;M+=2)P.push(b(v[M],k,v[M+1],C));return P}function S(k,C,v){let P=1e9,M=-1e9,q=[];function L(N,W,K,w,$){let F=i.coordsAtPos(N,N==v.to?-2:2),ne=i.coordsAtPos(K,K==v.from?2:-2);!F||!ne||(P=Math.min(F.top,ne.top,P),M=Math.max(F.bottom,ne.bottom,M),$==de.LTR?q.push(r&&W?u:F.left,r&&w?d:ne.right):q.push(!r&&w?u:ne.left,!r&&W?d:F.right))}let D=k??v.from,U=C??v.to;for(let N of i.visibleRanges)if(N.to>D&&N.from<U)for(let W=Math.max(N.from,D),K=Math.min(N.to,U);;){let w=i.state.doc.lineAt(W);for(let $ of i.bidiSpans(w)){let F=$.from+w.from,ne=$.to+w.from;if(F>=K)break;ne>W&&L(Math.max(F,W),k==null&&F<=D,Math.min(ne,K),C==null&&ne>=U,$.dir)}if(W=w.to+1,W>=K)break}return q.length==0&&L(D,k==null,U,C==null,i.textDirection),{top:P,bottom:M,horizontal:q}}function R(k,C){let v=l.top+(C?k.top:k.bottom);return{top:v,bottom:v,horizontal:[]}}}function Qf(i,e){return i.constructor==e.constructor&&i.eq(e)}class Zf{constructor(e,t){this.view=e,this.layer=t,this.drawn=[],this.scaleX=1,this.scaleY=1,this.measureReq={read:this.measure.bind(this),write:this.draw.bind(this)},this.dom=e.scrollDOM.appendChild(document.createElement("div")),this.dom.classList.add("cm-layer"),t.above&&this.dom.classList.add("cm-layer-above"),t.class&&this.dom.classList.add(t.class),this.scale(),this.dom.setAttribute("aria-hidden","true"),this.setOrder(e.state),e.requestMeasure(this.measureReq),t.mount&&t.mount(this.dom,e)}update(e){e.startState.facet(Gi)!=e.state.facet(Gi)&&this.setOrder(e.state),(this.layer.update(e,this.dom)||e.geometryChanged)&&(this.scale(),e.view.requestMeasure(this.measureReq))}docViewUpdate(e){this.layer.updateOnDocViewUpdate!==!1&&e.requestMeasure(this.measureReq)}setOrder(e){let t=0,n=e.facet(Gi);for(;t<n.length&&n[t]!=this.layer;)t++;this.dom.style.zIndex=String((this.layer.above?150:-1)-t)}measure(){return this.layer.markers(this.view)}scale(){let{scaleX:e,scaleY:t}=this.view;(e!=this.scaleX||t!=this.scaleY)&&(this.scaleX=e,this.scaleY=t,this.dom.style.transform=`scale(${1/e}, ${1/t})`)}draw(e){if(e.length!=this.drawn.length||e.some((t,n)=>!Qf(t,this.drawn[n]))){let t=this.dom.firstChild,n=0;for(let s of e)s.update&&t&&s.constructor&&this.drawn[n].constructor&&s.update(t,this.drawn[n])?(t=t.nextSibling,n++):this.dom.insertBefore(s.draw(),t);for(;t;){let s=t.nextSibling;t.remove(),t=s}this.drawn=e,O.safari&&O.safari_version>=26&&(this.dom.style.display=this.dom.firstChild?"":"none")}}destroy(){this.layer.destroy&&this.layer.destroy(this.dom,this.view),this.dom.remove()}}const Gi=I.define();function Kc(i){return[Tt.define(e=>new Zf(e,i)),Gi.of(i)]}const Dn=I.define({combine(i){return po(i,{cursorBlinkRate:1200,drawRangeCursor:!0,iosSelectionHandles:!0},{cursorBlinkRate:(e,t)=>Math.min(e,t),drawRangeCursor:(e,t)=>e||t})}});function ep(i={}){return[Dn.of(i),tp,np,ip,wc.of(!0)]}function Xc(i){return i.startState.facet(Dn)!=i.state.facet(Dn)}const tp=Kc({above:!0,markers(i){let{state:e}=i,t=e.facet(Dn),n=[];for(let s of e.selection.ranges){let r=s==e.selection.main;if(s.empty||t.drawRangeCursor&&!(r&&O.ios&&t.iosSelectionHandles)){let o=r?"cm-cursor cm-cursor-primary":"cm-cursor cm-cursor-secondary",l=s.empty?s:_.cursor(s.head,s.assoc);for(let a of sn.forRange(i,o,l))n.push(a)}}return n},update(i,e){i.transactions.some(n=>n.selection)&&(e.style.animationName=e.style.animationName=="cm-blink"?"cm-blink2":"cm-blink");let t=Xc(i);return t&&Wl(i.state,e),i.docChanged||i.selectionSet||t},mount(i,e){Wl(e.state,i)},class:"cm-cursorLayer"});function Wl(i,e){e.style.animationDuration=i.facet(Dn).cursorBlinkRate+"ms"}const np=Kc({above:!1,markers(i){let e=[],{main:t,ranges:n}=i.state.selection;for(let s of n)if(!s.empty)for(let r of sn.forRange(i,"cm-selectionBackground",s))e.push(r);if(O.ios&&!t.empty&&i.state.facet(Dn).iosSelectionHandles){for(let s of sn.forRange(i,"cm-selectionHandle cm-selectionHandle-start",_.cursor(t.from,1)))e.push(s);for(let s of sn.forRange(i,"cm-selectionHandle cm-selectionHandle-end",_.cursor(t.to,1)))e.push(s)}return e},update(i,e){return i.docChanged||i.selectionSet||i.viewportChanged||Xc(i)},class:"cm-selectionLayer"}),ip=ms.highest(z.theme({".cm-line":{"& ::selection, &::selection":{backgroundColor:"transparent !important"},caretColor:"transparent !important"},".cm-content":{caretColor:"transparent !important","& :focus":{caretColor:"initial !important","&::selection, & ::selection":{backgroundColor:"Highlight !important"}}}}));function sp(){return op}const rp=ye.line({class:"cm-activeLine"}),op=Tt.fromClass(class{constructor(i){this.decorations=this.getDeco(i)}update(i){(i.docChanged||i.selectionSet)&&(this.decorations=this.getDeco(i.view))}getDeco(i){let e=-1,t=[];for(let n of i.state.selection.ranges){let s=i.lineBlockAt(n.head);s.from>e&&(t.push(rp.range(s.from)),e=s.from)}return ye.set(t)}},{decorations:i=>i.decorations});class hn extends on{compare(e){return this==e||this.constructor==e.constructor&&this.eq(e)}eq(e){return!1}destroy(e){}}hn.prototype.elementClass="";hn.prototype.toDOM=void 0;hn.prototype.mapMode=Ue.TrackBefore;hn.prototype.startSide=hn.prototype.endSide=-1;hn.prototype.point=!0;const Gs=I.define(),lp=I.define(),Yi=I.define(),Vl=I.define({combine:i=>i.some(e=>e)});function ap(i){return[cp]}const cp=Tt.fromClass(class{constructor(i){this.view=i,this.domAfter=null,this.prevViewport=i.viewport,this.dom=document.createElement("div"),this.dom.className="cm-gutters cm-gutters-before",this.dom.setAttribute("aria-hidden","true"),this.dom.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.gutters=i.state.facet(Yi).map(e=>new Ul(i,e)),this.fixed=!i.state.facet(Vl);for(let e of this.gutters)e.config.side=="after"?this.getDOMAfter().appendChild(e.dom):this.dom.appendChild(e.dom);this.fixed&&(this.dom.style.position="sticky"),this.syncGutters(!1),i.scrollDOM.insertBefore(this.dom,i.contentDOM)}getDOMAfter(){return this.domAfter||(this.domAfter=document.createElement("div"),this.domAfter.className="cm-gutters cm-gutters-after",this.domAfter.setAttribute("aria-hidden","true"),this.domAfter.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.domAfter.style.position=this.fixed?"sticky":"",this.view.scrollDOM.appendChild(this.domAfter)),this.domAfter}update(i){if(this.updateGutters(i)){let e=this.prevViewport,t=i.view.viewport,n=Math.min(e.to,t.to)-Math.max(e.from,t.from);this.syncGutters(n<(t.to-t.from)*.8)}if(i.geometryChanged){let e=this.view.contentHeight/this.view.scaleY+"px";this.dom.style.minHeight=e,this.domAfter&&(this.domAfter.style.minHeight=e)}this.view.state.facet(Vl)!=!this.fixed&&(this.fixed=!this.fixed,this.dom.style.position=this.fixed?"sticky":"",this.domAfter&&(this.domAfter.style.position=this.fixed?"sticky":"")),this.prevViewport=i.view.viewport}syncGutters(i){let e=this.dom.nextSibling;i&&(this.dom.remove(),this.domAfter&&this.domAfter.remove());let t=Z.iter(this.view.state.facet(Gs),this.view.viewport.from),n=[],s=this.gutters.map(r=>new hp(r,this.view.viewport,-this.view.documentPadding.top));for(let r of this.view.viewportLineBlocks)if(n.length&&(n=[]),Array.isArray(r.type)){let o=!0;for(let l of r.type)if(l.type==Ae.Text&&o){Vr(t,n,l.from);for(let a of s)a.line(this.view,l,n);o=!1}else if(l.widget)for(let a of s)a.widget(this.view,l)}else if(r.type==Ae.Text){Vr(t,n,r.from);for(let o of s)o.line(this.view,r,n)}else if(r.widget)for(let o of s)o.widget(this.view,r);for(let r of s)r.finish();i&&(this.view.scrollDOM.insertBefore(this.dom,e),this.domAfter&&this.view.scrollDOM.appendChild(this.domAfter))}updateGutters(i){let e=i.startState.facet(Yi),t=i.state.facet(Yi),n=i.docChanged||i.heightChanged||i.viewportChanged||!Z.eq(i.startState.facet(Gs),i.state.facet(Gs),i.view.viewport.from,i.view.viewport.to);if(e==t)for(let s of this.gutters)s.update(i)&&(n=!0);else{n=!0;let s=[];for(let r of t){let o=e.indexOf(r);o<0?s.push(new Ul(this.view,r)):(this.gutters[o].update(i),s.push(this.gutters[o]))}for(let r of this.gutters)r.dom.remove(),s.indexOf(r)<0&&r.destroy();for(let r of s)r.config.side=="after"?this.getDOMAfter().appendChild(r.dom):this.dom.appendChild(r.dom);this.gutters=s}return n}destroy(){for(let i of this.gutters)i.destroy();this.dom.remove(),this.domAfter&&this.domAfter.remove()}},{provide:i=>z.scrollMargins.of(e=>{let t=e.plugin(i);if(!t||t.gutters.length==0||!t.fixed)return null;let n=t.dom.offsetWidth*e.scaleX,s=t.domAfter?t.domAfter.offsetWidth*e.scaleX:0;return e.textDirection==de.LTR?{left:n,right:s}:{right:n,left:s}})});function $l(i){return Array.isArray(i)?i:[i]}function Vr(i,e,t){for(;i.value&&i.from<=t;)i.from==t&&e.push(i.value),i.next()}class hp{constructor(e,t,n){this.gutter=e,this.height=n,this.i=0,this.cursor=Z.iter(e.markers,t.from)}addElement(e,t,n){let{gutter:s}=this,r=(t.top-this.height)/e.scaleY,o=t.height/e.scaleY;if(this.i==s.elements.length){let l=new Gc(e,o,r,n);s.elements.push(l),s.dom.appendChild(l.dom)}else s.elements[this.i].update(e,o,r,n);this.height=t.bottom,this.i++}line(e,t,n){let s=[];Vr(this.cursor,s,t.from),n.length&&(s=s.concat(n));let r=this.gutter.config.lineMarker(e,t,s);r&&s.unshift(r);let o=this.gutter;s.length==0&&!o.config.renderEmptyElements||this.addElement(e,t,s)}widget(e,t){let n=this.gutter.config.widgetMarker(e,t.widget,t),s=n?[n]:null;for(let r of e.state.facet(lp)){let o=r(e,t.widget,t);o&&(s||(s=[])).push(o)}s&&this.addElement(e,t,s)}finish(){let e=this.gutter;for(;e.elements.length>this.i;){let t=e.elements.pop();e.dom.removeChild(t.dom),t.destroy()}}}class Ul{constructor(e,t){this.view=e,this.config=t,this.elements=[],this.spacer=null,this.dom=document.createElement("div"),this.dom.className="cm-gutter"+(this.config.class?" "+this.config.class:"");for(let n in t.domEventHandlers)this.dom.addEventListener(n,s=>{let r=s.target,o;if(r!=this.dom&&this.dom.contains(r)){for(;r.parentNode!=this.dom;)r=r.parentNode;let a=r.getBoundingClientRect();o=(a.top+a.bottom)/2}else o=s.clientY;let l=e.lineBlockAtHeight(o-e.documentTop);t.domEventHandlers[n](e,l,s)&&s.preventDefault()});this.markers=$l(t.markers(e)),t.initialSpacer&&(this.spacer=new Gc(e,0,0,[t.initialSpacer(e)]),this.dom.appendChild(this.spacer.dom),this.spacer.dom.style.cssText+="visibility: hidden; pointer-events: none")}update(e){let t=this.markers;if(this.markers=$l(this.config.markers(e.view)),this.spacer&&this.config.updateSpacer){let s=this.config.updateSpacer(this.spacer.markers[0],e);s!=this.spacer.markers[0]&&this.spacer.update(e.view,0,0,[s])}let n=e.view.viewport;return!Z.eq(this.markers,t,n.from,n.to)||(this.config.lineMarkerChange?this.config.lineMarkerChange(e):!1)}destroy(){for(let e of this.elements)e.destroy()}}class Gc{constructor(e,t,n,s){this.height=-1,this.above=0,this.markers=[],this.dom=document.createElement("div"),this.dom.className="cm-gutterElement",this.update(e,t,n,s)}update(e,t,n,s){this.height!=t&&(this.height=t,this.dom.style.height=t+"px"),this.above!=n&&(this.dom.style.marginTop=(this.above=n)?n+"px":""),up(this.markers,s)||this.setMarkers(e,s)}setMarkers(e,t){let n="cm-gutterElement",s=this.dom.firstChild;for(let r=0,o=0;;){let l=o,a=r<t.length?t[r++]:null,c=!1;if(a){let h=a.elementClass;h&&(n+=" "+h);for(let u=o;u<this.markers.length;u++)if(this.markers[u].compare(a)){l=u,c=!0;break}}else l=this.markers.length;for(;o<l;){let h=this.markers[o++];if(h.toDOM){h.destroy(s);let u=s.nextSibling;s.remove(),s=u}}if(!a)break;a.toDOM&&(c?s=s.nextSibling:this.dom.insertBefore(a.toDOM(e),s)),c&&o++}this.dom.className=n,this.markers=t}destroy(){this.setMarkers(null,[])}}function up(i,e){if(i.length!=e.length)return!1;for(let t=0;t<i.length;t++)if(!i[t].compare(e[t]))return!1;return!0}const dp=I.define(),fp=I.define(),vn=I.define({combine(i){return po(i,{formatNumber:String,domEventHandlers:{}},{domEventHandlers(e,t){let n=Object.assign({},e);for(let s in t){let r=n[s],o=t[s];n[s]=r?(l,a,c)=>r(l,a,c)||o(l,a,c):o}return n}})}});class Ys extends hn{constructor(e){super(),this.number=e}eq(e){return this.number==e.number}toDOM(){return document.createTextNode(this.number)}}function Js(i,e){return i.state.facet(vn).formatNumber(e,i.state)}const pp=Yi.compute([vn],i=>({class:"cm-lineNumbers",renderEmptyElements:!1,markers(e){return e.state.facet(dp)},lineMarker(e,t,n){return n.some(s=>s.toDOM)?null:new Ys(Js(e,e.state.doc.lineAt(t.from).number))},widgetMarker:(e,t,n)=>{for(let s of e.state.facet(fp)){let r=s(e,t,n);if(r)return r}return null},lineMarkerChange:e=>e.startState.facet(vn)!=e.state.facet(vn),initialSpacer(e){return new Ys(Js(e,jl(e.state.doc.lines)))},updateSpacer(e,t){let n=Js(t.view,jl(t.view.state.doc.lines));return n==e.number?e:new Ys(n)},domEventHandlers:i.facet(vn).domEventHandlers,side:"before"}));function mp(i={}){return[vn.of(i),ap(),pp]}function jl(i){let e=9;for(;e<i;)e=e*10+9;return e}const gp=1024;let bp=0;class Qs{constructor(e,t){this.from=e,this.to=t}}class G{constructor(e={}){this.id=bp++,this.perNode=!!e.perNode,this.deserialize=e.deserialize||(()=>{throw new Error("This node type doesn't define a deserialize function")}),this.combine=e.combine||null}add(e){if(this.perNode)throw new RangeError("Can't add per-node props to node types");return typeof e!="function"&&(e=We.match(e)),t=>{let n=e(t);return n===void 0?null:[this,n]}}}G.closedBy=new G({deserialize:i=>i.split(" ")});G.openedBy=new G({deserialize:i=>i.split(" ")});G.group=new G({deserialize:i=>i.split(" ")});G.isolate=new G({deserialize:i=>{if(i&&i!="rtl"&&i!="ltr"&&i!="auto")throw new RangeError("Invalid value for isolate: "+i);return i||"auto"}});G.contextHash=new G({perNode:!0});G.lookAhead=new G({perNode:!0});G.mounted=new G({perNode:!0});class si{constructor(e,t,n,s=!1){this.tree=e,this.overlay=t,this.parser=n,this.bracketed=s}static get(e){return e&&e.props&&e.props[G.mounted.id]}}const yp=Object.create(null);class We{constructor(e,t,n,s=0){this.name=e,this.props=t,this.id=n,this.flags=s}static define(e){let t=e.props&&e.props.length?Object.create(null):yp,n=(e.top?1:0)|(e.skipped?2:0)|(e.error?4:0)|(e.name==null?8:0),s=new We(e.name||"",t,e.id,n);if(e.props){for(let r of e.props)if(Array.isArray(r)||(r=r(s)),r){if(r[0].perNode)throw new RangeError("Can't store a per-node prop on a node type");t[r[0].id]=r[1]}}return s}prop(e){return this.props[e.id]}get isTop(){return(this.flags&1)>0}get isSkipped(){return(this.flags&2)>0}get isError(){return(this.flags&4)>0}get isAnonymous(){return(this.flags&8)>0}is(e){if(typeof e=="string"){if(this.name==e)return!0;let t=this.prop(G.group);return t?t.indexOf(e)>-1:!1}return this.id==e}static match(e){let t=Object.create(null);for(let n in e)for(let s of n.split(" "))t[s]=e[n];return n=>{for(let s=n.prop(G.group),r=-1;r<(s?s.length:0);r++){let o=t[r<0?n.name:s[r]];if(o)return o}}}}We.none=new We("",Object.create(null),0,8);class To{constructor(e){this.types=e;for(let t=0;t<e.length;t++)if(e[t].id!=t)throw new RangeError("Node type ids should correspond to array positions when creating a node set")}extend(...e){let t=[];for(let n of this.types){let s=null;for(let r of e){let o=r(n);if(o){s||(s=Object.assign({},n.props));let l=o[1],a=o[0];a.combine&&a.id in s&&(l=a.combine(s[a.id],l)),s[a.id]=l}}t.push(s?new We(n.name,s,n.id,n.flags):n)}return new To(t)}}const Ii=new WeakMap,Kl=new WeakMap;var ge;(function(i){i[i.ExcludeBuffers=1]="ExcludeBuffers",i[i.IncludeAnonymous=2]="IncludeAnonymous",i[i.IgnoreMounts=4]="IgnoreMounts",i[i.IgnoreOverlays=8]="IgnoreOverlays",i[i.EnterBracketed=16]="EnterBracketed"})(ge||(ge={}));class fe{constructor(e,t,n,s,r){if(this.type=e,this.children=t,this.positions=n,this.length=s,this.props=null,r&&r.length){this.props=Object.create(null);for(let[o,l]of r)this.props[typeof o=="number"?o:o.id]=l}}toString(){let e=si.get(this);if(e&&!e.overlay)return e.tree.toString();let t="";for(let n of this.children){let s=n.toString();s&&(t&&(t+=","),t+=s)}return this.type.name?(/\W/.test(this.type.name)&&!this.type.isError?JSON.stringify(this.type.name):this.type.name)+(t.length?"("+t+")":""):t}cursor(e=0){return new Ur(this.topNode,e)}cursorAt(e,t=0,n=0){let s=Ii.get(this)||this.topNode,r=new Ur(s);return r.moveTo(e,t),Ii.set(this,r._tree),r}get topNode(){return new Ze(this,0,0,null)}resolve(e,t=0){let n=fi(Ii.get(this)||this.topNode,e,t,!1);return Ii.set(this,n),n}resolveInner(e,t=0){let n=fi(Kl.get(this)||this.topNode,e,t,!0);return Kl.set(this,n),n}resolveStack(e,t=0){return xp(this,e,t)}iterate(e){let{enter:t,leave:n,from:s=0,to:r=this.length}=e,o=e.mode||0,l=(o&ge.IncludeAnonymous)>0;for(let a=this.cursor(o|ge.IncludeAnonymous);;){let c=!1;if(a.from<=r&&a.to>=s&&(!l&&a.type.isAnonymous||t(a)!==!1)){if(a.firstChild())continue;c=!0}for(;c&&n&&(l||!a.type.isAnonymous)&&n(a),!a.nextSibling();){if(!a.parent())return;c=!0}}}prop(e){return e.perNode?this.props?this.props[e.id]:void 0:this.type.prop(e)}get propValues(){let e=[];if(this.props)for(let t in this.props)e.push([+t,this.props[t]]);return e}balance(e={}){return this.children.length<=8?this:Bo(We.none,this.children,this.positions,0,this.children.length,0,this.length,(t,n,s)=>new fe(this.type,t,n,s,this.propValues),e.makeTree||((t,n,s)=>new fe(We.none,t,n,s)))}static build(e){return kp(e)}}fe.empty=new fe(We.none,[],[],0);class Mo{constructor(e,t){this.buffer=e,this.index=t}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.index-2]}get size(){return this.buffer[this.index-1]}get pos(){return this.index}next(){this.index-=4}fork(){return new Mo(this.buffer,this.index)}}class Kt{constructor(e,t,n){this.buffer=e,this.length=t,this.set=n}get type(){return We.none}toString(){let e=[];for(let t=0;t<this.buffer.length;)e.push(this.childString(t)),t=this.buffer[t+3];return e.join(",")}childString(e){let t=this.buffer[e],n=this.buffer[e+3],s=this.set.types[t],r=s.name;if(/\W/.test(r)&&!s.isError&&(r=JSON.stringify(r)),e+=4,n==e)return r;let o=[];for(;e<n;)o.push(this.childString(e)),e=this.buffer[e+3];return r+"("+o.join(",")+")"}findChild(e,t,n,s,r){let{buffer:o}=this,l=-1;for(let a=e;a!=t&&!(Yc(r,s,o[a+1],o[a+2])&&(l=a,n>0));a=o[a+3]);return l}slice(e,t,n){let s=this.buffer,r=new Uint16Array(t-e),o=0;for(let l=e,a=0;l<t;){r[a++]=s[l++],r[a++]=s[l++]-n;let c=r[a++]=s[l++]-n;r[a++]=s[l++]-e,o=Math.max(o,c)}return new Kt(r,o,this.set)}}function Yc(i,e,t,n){switch(i){case-2:return t<e;case-1:return n>=e&&t<e;case 0:return t<e&&n>e;case 1:return t<=e&&n>e;case 2:return n>e;case 4:return!0}}function fi(i,e,t,n){for(var s;i.from==i.to||(t<1?i.from>=e:i.from>e)||(t>-1?i.to<=e:i.to<e);){let o=!n&&i instanceof Ze&&i.index<0?null:i.parent;if(!o)return i;i=o}let r=n?0:ge.IgnoreOverlays;if(n)for(let o=i,l=o.parent;l;o=l,l=o.parent)o instanceof Ze&&o.index<0&&((s=l.enter(e,t,r))===null||s===void 0?void 0:s.from)!=o.from&&(i=l);for(;;){let o=i.enter(e,t,r);if(!o)return i;i=o}}class Jc{cursor(e=0){return new Ur(this,e)}getChild(e,t=null,n=null){let s=Xl(this,e,t,n);return s.length?s[0]:null}getChildren(e,t=null,n=null){return Xl(this,e,t,n)}resolve(e,t=0){return fi(this,e,t,!1)}resolveInner(e,t=0){return fi(this,e,t,!0)}matchContext(e){return $r(this.parent,e)}enterUnfinishedNodesBefore(e){let t=this.childBefore(e),n=this;for(;t;){let s=t.lastChild;if(!s||s.to!=t.to)break;s.type.isError&&s.from==s.to?(n=t,t=s.prevSibling):t=s}return n}get node(){return this}get next(){return this.parent}}class Ze extends Jc{constructor(e,t,n,s){super(),this._tree=e,this.from=t,this.index=n,this._parent=s}get type(){return this._tree.type}get name(){return this._tree.type.name}get to(){return this.from+this._tree.length}nextChild(e,t,n,s,r=0){for(let o=this;;){for(let{children:l,positions:a}=o._tree,c=t>0?l.length:-1;e!=c;e+=t){let h=l[e],u=a[e]+o.from,d;if(!(!(r&ge.EnterBracketed&&h instanceof fe&&(d=si.get(h))&&!d.overlay&&d.bracketed&&n>=u&&n<=u+h.length)&&!Yc(s,n,u,u+h.length))){if(h instanceof Kt){if(r&ge.ExcludeBuffers)continue;let f=h.findChild(0,h.buffer.length,t,n-u,s);if(f>-1)return new Wt(new wp(o,h,e,u),null,f)}else if(r&ge.IncludeAnonymous||!h.type.isAnonymous||Eo(h)){let f;if(!(r&ge.IgnoreMounts)&&(f=si.get(h))&&!f.overlay)return new Ze(f.tree,u,e,o);let p=new Ze(h,u,e,o);return r&ge.IncludeAnonymous||!p.type.isAnonymous?p:p.nextChild(t<0?h.children.length-1:0,t,n,s,r)}}}if(r&ge.IncludeAnonymous||!o.type.isAnonymous||(o.index>=0?e=o.index+t:e=t<0?-1:o._parent._tree.children.length,o=o._parent,!o))return null}}get firstChild(){return this.nextChild(0,1,0,4)}get lastChild(){return this.nextChild(this._tree.children.length-1,-1,0,4)}childAfter(e){return this.nextChild(0,1,e,2)}childBefore(e){return this.nextChild(this._tree.children.length-1,-1,e,-2)}prop(e){return this._tree.prop(e)}enter(e,t,n=0){let s;if(!(n&ge.IgnoreOverlays)&&(s=si.get(this._tree))&&s.overlay){let r=e-this.from,o=n&ge.EnterBracketed&&s.bracketed;for(let{from:l,to:a}of s.overlay)if((t>0||o?l<=r:l<r)&&(t<0||o?a>=r:a>r))return new Ze(s.tree,s.overlay[0].from+this.from,-1,this)}return this.nextChild(0,1,e,t,n)}nextSignificantParent(){let e=this;for(;e.type.isAnonymous&&e._parent;)e=e._parent;return e}get parent(){return this._parent?this._parent.nextSignificantParent():null}get nextSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index+1,1,0,4):null}get prevSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index-1,-1,0,4):null}get tree(){return this._tree}toTree(){return this._tree}toString(){return this._tree.toString()}}function Xl(i,e,t,n){let s=i.cursor(),r=[];if(!s.firstChild())return r;if(t!=null){for(let o=!1;!o;)if(o=s.type.is(t),!s.nextSibling())return r}for(;;){if(n!=null&&s.type.is(n))return r;if(s.type.is(e)&&r.push(s.node),!s.nextSibling())return n==null?r:[]}}function $r(i,e,t=e.length-1){for(let n=i;t>=0;n=n.parent){if(!n)return!1;if(!n.type.isAnonymous){if(e[t]&&e[t]!=n.name)return!1;t--}}return!0}class wp{constructor(e,t,n,s){this.parent=e,this.buffer=t,this.index=n,this.start=s}}class Wt extends Jc{get name(){return this.type.name}get from(){return this.context.start+this.context.buffer.buffer[this.index+1]}get to(){return this.context.start+this.context.buffer.buffer[this.index+2]}constructor(e,t,n){super(),this.context=e,this._parent=t,this.index=n,this.type=e.buffer.set.types[e.buffer.buffer[n]]}child(e,t,n){let{buffer:s}=this.context,r=s.findChild(this.index+4,s.buffer[this.index+3],e,t-this.context.start,n);return r<0?null:new Wt(this.context,this,r)}get firstChild(){return this.child(1,0,4)}get lastChild(){return this.child(-1,0,4)}childAfter(e){return this.child(1,e,2)}childBefore(e){return this.child(-1,e,-2)}prop(e){return this.type.prop(e)}enter(e,t,n=0){if(n&ge.ExcludeBuffers)return null;let{buffer:s}=this.context,r=s.findChild(this.index+4,s.buffer[this.index+3],t>0?1:-1,e-this.context.start,t);return r<0?null:new Wt(this.context,this,r)}get parent(){return this._parent||this.context.parent.nextSignificantParent()}externalSibling(e){return this._parent?null:this.context.parent.nextChild(this.context.index+e,e,0,4)}get nextSibling(){let{buffer:e}=this.context,t=e.buffer[this.index+3];return t<(this._parent?e.buffer[this._parent.index+3]:e.buffer.length)?new Wt(this.context,this._parent,t):this.externalSibling(1)}get prevSibling(){let{buffer:e}=this.context,t=this._parent?this._parent.index+4:0;return this.index==t?this.externalSibling(-1):new Wt(this.context,this._parent,e.findChild(t,this.index,-1,0,4))}get tree(){return null}toTree(){let e=[],t=[],{buffer:n}=this.context,s=this.index+4,r=n.buffer[this.index+3];if(r>s){let o=n.buffer[this.index+1];e.push(n.slice(s,r,o)),t.push(0)}return new fe(this.type,e,t,this.to-this.from)}toString(){return this.context.buffer.childString(this.index)}}function Qc(i){if(!i.length)return null;let e=0,t=i[0];for(let r=1;r<i.length;r++){let o=i[r];(o.from>t.from||o.to<t.to)&&(t=o,e=r)}let n=t instanceof Ze&&t.index<0?null:t.parent,s=i.slice();return n?s[e]=n:s.splice(e,1),new vp(s,t)}class vp{constructor(e,t){this.heads=e,this.node=t}get next(){return Qc(this.heads)}}function xp(i,e,t){let n=i.resolveInner(e,t),s=null;for(let r=n instanceof Ze?n:n.context.parent;r;r=r.parent)if(r.index<0){let o=r.parent;(s||(s=[n])).push(o.resolve(e,t)),r=o}else{let o=si.get(r.tree);if(o&&o.overlay&&o.overlay[0].from<=e&&o.overlay[o.overlay.length-1].to>=e){let l=new Ze(o.tree,o.overlay[0].from+r.from,-1,r);(s||(s=[n])).push(fi(l,e,t,!1))}}return s?Qc(s):n}class Ur{get name(){return this.type.name}constructor(e,t=0){if(this.buffer=null,this.stack=[],this.index=0,this.bufferNode=null,this.mode=t&~ge.EnterBracketed,e instanceof Ze)this.yieldNode(e);else{this._tree=e.context.parent,this.buffer=e.context;for(let n=e._parent;n;n=n._parent)this.stack.unshift(n.index);this.bufferNode=e,this.yieldBuf(e.index)}}yieldNode(e){return e?(this._tree=e,this.type=e.type,this.from=e.from,this.to=e.to,!0):!1}yieldBuf(e,t){this.index=e;let{start:n,buffer:s}=this.buffer;return this.type=t||s.set.types[s.buffer[e]],this.from=n+s.buffer[e+1],this.to=n+s.buffer[e+2],!0}yield(e){return e?e instanceof Ze?(this.buffer=null,this.yieldNode(e)):(this.buffer=e.context,this.yieldBuf(e.index,e.type)):!1}toString(){return this.buffer?this.buffer.buffer.childString(this.index):this._tree.toString()}enterChild(e,t,n){if(!this.buffer)return this.yield(this._tree.nextChild(e<0?this._tree._tree.children.length-1:0,e,t,n,this.mode));let{buffer:s}=this.buffer,r=s.findChild(this.index+4,s.buffer[this.index+3],e,t-this.buffer.start,n);return r<0?!1:(this.stack.push(this.index),this.yieldBuf(r))}firstChild(){return this.enterChild(1,0,4)}lastChild(){return this.enterChild(-1,0,4)}childAfter(e){return this.enterChild(1,e,2)}childBefore(e){return this.enterChild(-1,e,-2)}enter(e,t,n=this.mode){return this.buffer?n&ge.ExcludeBuffers?!1:this.enterChild(1,e,t):this.yield(this._tree.enter(e,t,n))}parent(){if(!this.buffer)return this.yieldNode(this.mode&ge.IncludeAnonymous?this._tree._parent:this._tree.parent);if(this.stack.length)return this.yieldBuf(this.stack.pop());let e=this.mode&ge.IncludeAnonymous?this.buffer.parent:this.buffer.parent.nextSignificantParent();return this.buffer=null,this.yieldNode(e)}sibling(e){if(!this.buffer)return this._tree._parent?this.yield(this._tree.index<0?null:this._tree._parent.nextChild(this._tree.index+e,e,0,4,this.mode)):!1;let{buffer:t}=this.buffer,n=this.stack.length-1;if(e<0){let s=n<0?0:this.stack[n]+4;if(this.index!=s)return this.yieldBuf(t.findChild(s,this.index,-1,0,4))}else{let s=t.buffer[this.index+3];if(s<(n<0?t.buffer.length:t.buffer[this.stack[n]+3]))return this.yieldBuf(s)}return n<0?this.yield(this.buffer.parent.nextChild(this.buffer.index+e,e,0,4,this.mode)):!1}nextSibling(){return this.sibling(1)}prevSibling(){return this.sibling(-1)}atLastNode(e){let t,n,{buffer:s}=this;if(s){if(e>0){if(this.index<s.buffer.buffer.length)return!1}else for(let r=0;r<this.index;r++)if(s.buffer.buffer[r+3]<this.index)return!1;({index:t,parent:n}=s)}else({index:t,_parent:n}=this._tree);for(;n;{index:t,_parent:n}=n)if(t>-1)for(let r=t+e,o=e<0?-1:n._tree.children.length;r!=o;r+=e){let l=n._tree.children[r];if(this.mode&ge.IncludeAnonymous||l instanceof Kt||!l.type.isAnonymous||Eo(l))return!1}return!0}move(e,t){if(t&&this.enterChild(e,0,4))return!0;for(;;){if(this.sibling(e))return!0;if(this.atLastNode(e)||!this.parent())return!1}}next(e=!0){return this.move(1,e)}prev(e=!0){return this.move(-1,e)}moveTo(e,t=0){for(;(this.from==this.to||(t<1?this.from>=e:this.from>e)||(t>-1?this.to<=e:this.to<e))&&this.parent(););for(;this.enterChild(1,e,t););return this}get node(){if(!this.buffer)return this._tree;let e=this.bufferNode,t=null,n=0;if(e&&e.context==this.buffer)e:for(let s=this.index,r=this.stack.length;r>=0;){for(let o=e;o;o=o._parent)if(o.index==s){if(s==this.index)return o;t=o,n=r+1;break e}s=this.stack[--r]}for(let s=n;s<this.stack.length;s++)t=new Wt(this.buffer,t,this.stack[s]);return this.bufferNode=new Wt(this.buffer,t,this.index)}get tree(){return this.buffer?null:this._tree._tree}iterate(e,t){for(let n=0;;){let s=!1;if(this.type.isAnonymous||e(this)!==!1){if(this.firstChild()){n++;continue}this.type.isAnonymous||(s=!0)}for(;;){if(s&&t&&t(this),s=this.type.isAnonymous,!n)return;if(this.nextSibling())break;this.parent(),n--,s=!0}}}matchContext(e){if(!this.buffer)return $r(this.node.parent,e);let{buffer:t}=this.buffer,{types:n}=t.set;for(let s=e.length-1,r=this.stack.length-1;s>=0;r--){if(r<0)return $r(this._tree,e,s);let o=n[t.buffer[this.stack[r]]];if(!o.isAnonymous){if(e[s]&&e[s]!=o.name)return!1;s--}}return!0}}function Eo(i){return i.children.some(e=>e instanceof Kt||!e.type.isAnonymous||Eo(e))}function kp(i){var e;let{buffer:t,nodeSet:n,maxBufferLength:s=gp,reused:r=[],minRepeatType:o=n.types.length}=i,l=Array.isArray(t)?new Mo(t,t.length):t,a=n.types,c=0,h=0;function u(k,C,v,P,M,q){let{id:L,start:D,end:U,size:N}=l,W=h,K=c;if(N<0)if(l.next(),N==-1){let ie=r[L];v.push(ie),P.push(D-k);return}else if(N==-3){c=L;return}else if(N==-4){h=L;return}else throw new RangeError(`Unrecognized record size: ${N}`);let w=a[L],$,F,ne=D-k;if(U-D<=s&&(F=g(l.pos-C,M))){let ie=new Uint16Array(F.size-F.skip),Y=l.pos-F.size,J=ie.length;for(;l.pos>Y;)J=b(F.start,ie,J);$=new Kt(ie,U-F.start,n),ne=F.start-k}else{let ie=l.pos-N;l.next();let Y=[],J=[],se=L>=o?L:-1,j=0,ce=U;for(;l.pos>ie;)se>=0&&l.id==se&&l.size>=0?(l.end<=ce-s&&(p(Y,J,D,j,l.end,ce,se,W,K),j=Y.length,ce=l.end),l.next()):q>2500?d(D,ie,Y,J):u(D,ie,Y,J,se,q+1);if(se>=0&&j>0&&j<Y.length&&p(Y,J,D,j,D,ce,se,W,K),Y.reverse(),J.reverse(),se>-1&&j>0){let De=f(w,K);$=Bo(w,Y,J,0,Y.length,0,U-D,De,De)}else $=m(w,Y,J,U-D,W-U,K)}v.push($),P.push(ne)}function d(k,C,v,P){let M=[],q=0,L=-1;for(;l.pos>C;){let{id:D,start:U,end:N,size:W}=l;if(W>4)l.next();else{if(L>-1&&U<L)break;L<0&&(L=N-s),M.push(D,U,N),q++,l.next()}}if(q){let D=new Uint16Array(q*4),U=M[M.length-2];for(let N=M.length-3,W=0;N>=0;N-=3)D[W++]=M[N],D[W++]=M[N+1]-U,D[W++]=M[N+2]-U,D[W++]=W;v.push(new Kt(D,M[2]-U,n)),P.push(U-k)}}function f(k,C){return(v,P,M)=>{let q=0,L=v.length-1,D,U;if(L>=0&&(D=v[L])instanceof fe){if(!L&&D.type==k&&D.length==M)return D;(U=D.prop(G.lookAhead))&&(q=P[L]+D.length+U)}return m(k,v,P,M,q,C)}}function p(k,C,v,P,M,q,L,D,U){let N=[],W=[];for(;k.length>P;)N.push(k.pop()),W.push(C.pop()+v-M);k.push(m(n.types[L],N,W,q-M,D-q,U)),C.push(M-v)}function m(k,C,v,P,M,q,L){if(q){let D=[G.contextHash,q];L=L?[D].concat(L):[D]}if(M>25){let D=[G.lookAhead,M];L=L?[D].concat(L):[D]}return new fe(k,C,v,P,L)}function g(k,C){let v=l.fork(),P=0,M=0,q=0,L=v.end-s,D={size:0,start:0,skip:0};e:for(let U=v.pos-k;v.pos>U;){let N=v.size;if(v.id==C&&N>=0){D.size=P,D.start=M,D.skip=q,q+=4,P+=4,v.next();continue}let W=v.pos-N;if(N<0||W<U||v.start<L)break;let K=v.id>=o?4:0,w=v.start;for(v.next();v.pos>W;){if(v.size<0)if(v.size==-3||v.size==-4)K+=4;else break e;else v.id>=o&&(K+=4);v.next()}M=w,P+=N,q+=K}return(C<0||P==k)&&(D.size=P,D.start=M,D.skip=q),D.size>4?D:void 0}function b(k,C,v){let{id:P,start:M,end:q,size:L}=l;if(l.next(),L>=0&&P<o){let D=v;if(L>4){let U=l.pos-(L-4);for(;l.pos>U;)v=b(k,C,v)}C[--v]=D,C[--v]=q-k,C[--v]=M-k,C[--v]=P}else L==-3?c=P:L==-4&&(h=P);return v}let x=[],S=[];for(;l.pos>0;)u(i.start||0,i.bufferStart||0,x,S,-1,0);let R=(e=i.length)!==null&&e!==void 0?e:x.length?S[0]+x[0].length:0;return new fe(a[i.topID],x.reverse(),S.reverse(),R)}const Gl=new WeakMap;function Ji(i,e){if(!i.isAnonymous||e instanceof Kt||e.type!=i)return 1;let t=Gl.get(e);if(t==null){t=1;for(let n of e.children){if(n.type!=i||!(n instanceof fe)){t=1;break}t+=Ji(i,n)}Gl.set(e,t)}return t}function Bo(i,e,t,n,s,r,o,l,a){let c=0;for(let p=n;p<s;p++)c+=Ji(i,e[p]);let h=Math.ceil(c*1.5/8),u=[],d=[];function f(p,m,g,b,x){for(let S=g;S<b;){let R=S,k=m[S],C=Ji(i,p[S]);for(S++;S<b;S++){let v=Ji(i,p[S]);if(C+v>=h)break;C+=v}if(S==R+1){if(C>h){let v=p[R];f(v.children,v.positions,0,v.children.length,m[R]+x);continue}u.push(p[R])}else{let v=m[S-1]+p[S-1].length-k;u.push(Bo(i,p,m,R,S,k,v,null,a))}d.push(k+x-r)}}return f(e,t,n,s,0),(l||a)(u,d,o)}class rn{constructor(e,t,n,s,r=!1,o=!1){this.from=e,this.to=t,this.tree=n,this.offset=s,this.open=(r?1:0)|(o?2:0)}get openStart(){return(this.open&1)>0}get openEnd(){return(this.open&2)>0}static addTree(e,t=[],n=!1){let s=[new rn(0,e.length,e,0,!1,n)];for(let r of t)r.to>e.length&&s.push(r);return s}static applyChanges(e,t,n=128){if(!t.length)return e;let s=[],r=1,o=e.length?e[0]:null;for(let l=0,a=0,c=0;;l++){let h=l<t.length?t[l]:null,u=h?h.fromA:1e9;if(u-a>=n)for(;o&&o.from<u;){let d=o;if(a>=d.from||u<=d.to||c){let f=Math.max(d.from,a)-c,p=Math.min(d.to,u)-c;d=f>=p?null:new rn(f,p,d.tree,d.offset+c,l>0,!!h)}if(d&&s.push(d),o.to>u)break;o=r<e.length?e[r++]:null}if(!h)break;a=h.toA,c=h.toA-h.toB}return s}}class Zc{startParse(e,t,n){return typeof e=="string"&&(e=new _p(e)),n=n?n.length?n.map(s=>new Qs(s.from,s.to)):[new Qs(0,0)]:[new Qs(0,e.length)],this.createParse(e,t||[],n)}parse(e,t,n){let s=this.startParse(e,t,n);for(;;){let r=s.advance();if(r)return r}}}class _p{constructor(e){this.string=e}get length(){return this.string.length}chunk(e){return this.string.slice(e)}get lineChunks(){return!1}read(e,t){return this.string.slice(e,t)}}new G({perNode:!0});let Sp=0;class Ye{constructor(e,t,n,s){this.name=e,this.set=t,this.base=n,this.modified=s,this.id=Sp++}toString(){let{name:e}=this;for(let t of this.modified)t.name&&(e=`${t.name}(${e})`);return e}static define(e,t){let n=typeof e=="string"?e:"?";if(e instanceof Ye&&(t=e),t!=null&&t.base)throw new Error("Can not derive from a modified tag");let s=new Ye(n,[],null,[]);if(s.set.push(s),t)for(let r of t.set)s.set.push(r);return s}static defineModifier(e){let t=new ds(e);return n=>n.modified.indexOf(t)>-1?n:ds.get(n.base||n,n.modified.concat(t).sort((s,r)=>s.id-r.id))}}let Cp=0;class ds{constructor(e){this.name=e,this.instances=[],this.id=Cp++}static get(e,t){if(!t.length)return e;let n=t[0].instances.find(l=>l.base==e&&Ap(t,l.modified));if(n)return n;let s=[],r=new Ye(e.name,s,e,t);for(let l of t)l.instances.push(r);let o=Tp(t);for(let l of e.set)if(!l.modified.length)for(let a of o)s.push(ds.get(l,a));return r}}function Ap(i,e){return i.length==e.length&&i.every((t,n)=>t==e[n])}function Tp(i){let e=[[]];for(let t=0;t<i.length;t++)for(let n=0,s=e.length;n<s;n++)e.push(e[n].concat(i[t]));return e.sort((t,n)=>n.length-t.length)}function Mp(i){let e=Object.create(null);for(let t in i){let n=i[t];Array.isArray(n)||(n=[n]);for(let s of t.split(" "))if(s){let r=[],o=2,l=s;for(let u=0;;){if(l=="..."&&u>0&&u+3==s.length){o=1;break}let d=/^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(l);if(!d)throw new RangeError("Invalid path: "+s);if(r.push(d[0]=="*"?"":d[0][0]=='"'?JSON.parse(d[0]):d[0]),u+=d[0].length,u==s.length)break;let f=s[u++];if(u==s.length&&f=="!"){o=0;break}if(f!="/")throw new RangeError("Invalid path: "+s);l=s.slice(u)}let a=r.length-1,c=r[a];if(!c)throw new RangeError("Invalid path: "+s);let h=new pi(n,o,a>0?r.slice(0,a):null);e[c]=h.sort(e[c])}}return eh.add(e)}const eh=new G({combine(i,e){let t,n,s;for(;i||e;){if(!i||e&&i.depth>=e.depth?(s=e,e=e.next):(s=i,i=i.next),t&&t.mode==s.mode&&!s.context&&!t.context)continue;let r=new pi(s.tags,s.mode,s.context);t?t.next=r:n=r,t=r}return n}});class pi{constructor(e,t,n,s){this.tags=e,this.mode=t,this.context=n,this.next=s}get opaque(){return this.mode==0}get inherit(){return this.mode==1}sort(e){return!e||e.depth<this.depth?(this.next=e,this):(e.next=this.sort(e.next),e)}get depth(){return this.context?this.context.length:0}}pi.empty=new pi([],2,null);function th(i,e){let t=Object.create(null);for(let r of i)if(!Array.isArray(r.tag))t[r.tag.id]=r.class;else for(let o of r.tag)t[o.id]=r.class;let{scope:n,all:s=null}=e||{};return{style:r=>{let o=s;for(let l of r)for(let a of l.set){let c=t[a.id];if(c){o=o?o+" "+c:c;break}}return o},scope:n}}function Ep(i,e){let t=null;for(let n of i){let s=n.style(e);s&&(t=t?t+" "+s:s)}return t}function Bp(i,e,t,n=0,s=i.length){let r=new Dp(n,Array.isArray(e)?e:[e],t);r.highlightRange(i.cursor(),n,s,"",r.highlighters),r.flush(s)}class Dp{constructor(e,t,n){this.at=e,this.highlighters=t,this.span=n,this.class=""}startSpan(e,t){t!=this.class&&(this.flush(e),e>this.at&&(this.at=e),this.class=t)}flush(e){e>this.at&&this.class&&this.span(this.at,e,this.class)}highlightRange(e,t,n,s,r){let{type:o,from:l,to:a}=e;if(l>=n||a<=t)return;o.isTop&&(r=this.highlighters.filter(f=>!f.scope||f.scope(o)));let c=s,h=Pp(e)||pi.empty,u=Ep(r,h.tags);if(u&&(c&&(c+=" "),c+=u,h.mode==1&&(s+=(s?" ":"")+u)),this.startSpan(Math.max(t,l),c),h.opaque)return;let d=e.tree&&e.tree.prop(G.mounted);if(d&&d.overlay){let f=e.node.enter(d.overlay[0].from+l,1),p=this.highlighters.filter(g=>!g.scope||g.scope(d.tree.type)),m=e.firstChild();for(let g=0,b=l;;g++){let x=g<d.overlay.length?d.overlay[g]:null,S=x?x.from+l:a,R=Math.max(t,b),k=Math.min(n,S);if(R<k&&m)for(;e.from<k&&(this.highlightRange(e,R,k,s,r),this.startSpan(Math.min(k,e.to),c),!(e.to>=S||!e.nextSibling())););if(!x||S>n)break;b=x.to+l,b>t&&(this.highlightRange(f.cursor(),Math.max(t,x.from+l),Math.min(n,b),"",p),this.startSpan(Math.min(n,b),c))}m&&e.parent()}else if(e.firstChild()){d&&(s="");do if(!(e.to<=t)){if(e.from>=n)break;this.highlightRange(e,t,n,s,r),this.startSpan(Math.min(n,e.to),c)}while(e.nextSibling());e.parent()}}}function Pp(i){let e=i.type.prop(eh);for(;e&&e.context&&!i.matchContext(e.context);)e=e.next;return e||null}const E=Ye.define,zi=E(),qt=E(),Yl=E(qt),Jl=E(qt),Nt=E(),qi=E(Nt),Zs=E(Nt),yt=E(),Qt=E(yt),gt=E(),bt=E(),jr=E(),Wn=E(jr),Ni=E(),H={comment:zi,lineComment:E(zi),blockComment:E(zi),docComment:E(zi),name:qt,variableName:E(qt),typeName:Yl,tagName:E(Yl),propertyName:Jl,attributeName:E(Jl),className:E(qt),labelName:E(qt),namespace:E(qt),macroName:E(qt),literal:Nt,string:qi,docString:E(qi),character:E(qi),attributeValue:E(qi),number:Zs,integer:E(Zs),float:E(Zs),bool:E(Nt),regexp:E(Nt),escape:E(Nt),color:E(Nt),url:E(Nt),keyword:gt,self:E(gt),null:E(gt),atom:E(gt),unit:E(gt),modifier:E(gt),operatorKeyword:E(gt),controlKeyword:E(gt),definitionKeyword:E(gt),moduleKeyword:E(gt),operator:bt,derefOperator:E(bt),arithmeticOperator:E(bt),logicOperator:E(bt),bitwiseOperator:E(bt),compareOperator:E(bt),updateOperator:E(bt),definitionOperator:E(bt),typeOperator:E(bt),controlOperator:E(bt),punctuation:jr,separator:E(jr),bracket:Wn,angleBracket:E(Wn),squareBracket:E(Wn),paren:E(Wn),brace:E(Wn),content:yt,heading:Qt,heading1:E(Qt),heading2:E(Qt),heading3:E(Qt),heading4:E(Qt),heading5:E(Qt),heading6:E(Qt),contentSeparator:E(yt),list:E(yt),quote:E(yt),emphasis:E(yt),strong:E(yt),link:E(yt),monospace:E(yt),strikethrough:E(yt),inserted:E(),deleted:E(),changed:E(),invalid:E(),meta:Ni,documentMeta:E(Ni),annotation:E(Ni),processingInstruction:E(Ni),definition:Ye.defineModifier("definition"),constant:Ye.defineModifier("constant"),function:Ye.defineModifier("function"),standard:Ye.defineModifier("standard"),local:Ye.defineModifier("local"),special:Ye.defineModifier("special")};for(let i in H){let e=H[i];e instanceof Ye&&(e.name=i)}th([{tag:H.link,class:"tok-link"},{tag:H.heading,class:"tok-heading"},{tag:H.emphasis,class:"tok-emphasis"},{tag:H.strong,class:"tok-strong"},{tag:H.keyword,class:"tok-keyword"},{tag:H.atom,class:"tok-atom"},{tag:H.bool,class:"tok-bool"},{tag:H.url,class:"tok-url"},{tag:H.labelName,class:"tok-labelName"},{tag:H.inserted,class:"tok-inserted"},{tag:H.deleted,class:"tok-deleted"},{tag:H.literal,class:"tok-literal"},{tag:H.string,class:"tok-string"},{tag:H.number,class:"tok-number"},{tag:[H.regexp,H.escape,H.special(H.string)],class:"tok-string2"},{tag:H.variableName,class:"tok-variableName"},{tag:H.local(H.variableName),class:"tok-variableName tok-local"},{tag:H.definition(H.variableName),class:"tok-variableName tok-definition"},{tag:H.special(H.variableName),class:"tok-variableName2"},{tag:H.definition(H.propertyName),class:"tok-propertyName tok-definition"},{tag:H.typeName,class:"tok-typeName"},{tag:H.namespace,class:"tok-namespace"},{tag:H.className,class:"tok-className"},{tag:H.macroName,class:"tok-macroName"},{tag:H.propertyName,class:"tok-propertyName"},{tag:H.operator,class:"tok-operator"},{tag:H.comment,class:"tok-comment"},{tag:H.meta,class:"tok-meta"},{tag:H.invalid,class:"tok-invalid"},{tag:H.punctuation,class:"tok-punctuation"}]);var er;const xn=new G;function Op(i){return I.define({combine:i?e=>e.concat(i):void 0})}const Lp=new G;class lt{constructor(e,t,n=[],s=""){this.data=e,this.name=s,te.prototype.hasOwnProperty("tree")||Object.defineProperty(te.prototype,"tree",{get(){return Mt(this)}}),this.parser=t,this.extension=[Ln.of(this),te.languageData.of((r,o,l)=>{let a=Ql(r,o,l),c=a.type.prop(xn);if(!c)return[];let h=r.facet(c),u=a.type.prop(Lp);if(u){let d=a.resolve(o-a.from,l);for(let f of u)if(f.test(d,r)){let p=r.facet(f.facet);return f.type=="replace"?p:p.concat(h)}}return h})].concat(n)}isActiveAt(e,t,n=-1){return Ql(e,t,n).type.prop(xn)==this.data}findRegions(e){let t=e.facet(Ln);if((t==null?void 0:t.data)==this.data)return[{from:0,to:e.doc.length}];if(!t||!t.allowsNesting)return[];let n=[],s=(r,o)=>{if(r.prop(xn)==this.data){n.push({from:o,to:o+r.length});return}let l=r.prop(G.mounted);if(l){if(l.tree.prop(xn)==this.data){if(l.overlay)for(let a of l.overlay)n.push({from:a.from+o,to:a.to+o});else n.push({from:o,to:o+r.length});return}else if(l.overlay){let a=n.length;if(s(l.tree,l.overlay[0].from+o),n.length>a)return}}for(let a=0;a<r.children.length;a++){let c=r.children[a];c instanceof fe&&s(c,r.positions[a]+o)}};return s(Mt(e),0),n}get allowsNesting(){return!0}}lt.setState=be.define();function Ql(i,e,t){let n=i.facet(Ln),s=Mt(i).topNode;if(!n||n.allowsNesting)for(let r=s;r;r=r.enter(e,t,ge.ExcludeBuffers|ge.EnterBracketed))r.type.isTop&&(s=r);return s}function Mt(i){let e=i.field(lt.state,!1);return e?e.tree:fe.empty}class Rp{constructor(e){this.doc=e,this.cursorPos=0,this.string="",this.cursor=e.iter()}get length(){return this.doc.length}syncTo(e){return this.string=this.cursor.next(e-this.cursorPos).value,this.cursorPos=e+this.string.length,this.cursorPos-this.string.length}chunk(e){return this.syncTo(e),this.string}get lineChunks(){return!0}read(e,t){let n=this.cursorPos-this.string.length;return e<n||t>=this.cursorPos?this.doc.sliceString(e,t):this.string.slice(e-n,t-n)}}let Vn=null;class Pn{constructor(e,t,n=[],s,r,o,l,a){this.parser=e,this.state=t,this.fragments=n,this.tree=s,this.treeLen=r,this.viewport=o,this.skipped=l,this.scheduleOn=a,this.parse=null,this.tempSkipped=[]}static create(e,t,n){return new Pn(e,t,[],fe.empty,0,n,[],null)}startParse(){return this.parser.startParse(new Rp(this.state.doc),this.fragments)}work(e,t){return t!=null&&t>=this.state.doc.length&&(t=void 0),this.tree!=fe.empty&&this.isDone(t??this.state.doc.length)?(this.takeTree(),!0):this.withContext(()=>{var n;if(typeof e=="number"){let s=Date.now()+e;e=()=>Date.now()>s}for(this.parse||(this.parse=this.startParse()),t!=null&&(this.parse.stoppedAt==null||this.parse.stoppedAt>t)&&t<this.state.doc.length&&this.parse.stopAt(t);;){let s=this.parse.advance();if(s)if(this.fragments=this.withoutTempSkipped(rn.addTree(s,this.fragments,this.parse.stoppedAt!=null)),this.treeLen=(n=this.parse.stoppedAt)!==null&&n!==void 0?n:this.state.doc.length,this.tree=s,this.parse=null,this.treeLen<(t??this.state.doc.length))this.parse=this.startParse();else return!0;if(e())return!1}})}takeTree(){let e,t;this.parse&&(e=this.parse.parsedPos)>=this.treeLen&&((this.parse.stoppedAt==null||this.parse.stoppedAt>e)&&this.parse.stopAt(e),this.withContext(()=>{for(;!(t=this.parse.advance()););}),this.treeLen=e,this.tree=t,this.fragments=this.withoutTempSkipped(rn.addTree(this.tree,this.fragments,!0)),this.parse=null)}withContext(e){let t=Vn;Vn=this;try{return e()}finally{Vn=t}}withoutTempSkipped(e){for(let t;t=this.tempSkipped.pop();)e=Zl(e,t.from,t.to);return e}changes(e,t){let{fragments:n,tree:s,treeLen:r,viewport:o,skipped:l}=this;if(this.takeTree(),!e.empty){let a=[];if(e.iterChangedRanges((c,h,u,d)=>a.push({fromA:c,toA:h,fromB:u,toB:d})),n=rn.applyChanges(n,a),s=fe.empty,r=0,o={from:e.mapPos(o.from,-1),to:e.mapPos(o.to,1)},this.skipped.length){l=[];for(let c of this.skipped){let h=e.mapPos(c.from,1),u=e.mapPos(c.to,-1);h<u&&l.push({from:h,to:u})}}}return new Pn(this.parser,t,n,s,r,o,l,this.scheduleOn)}updateViewport(e){if(this.viewport.from==e.from&&this.viewport.to==e.to)return!1;this.viewport=e;let t=this.skipped.length;for(let n=0;n<this.skipped.length;n++){let{from:s,to:r}=this.skipped[n];s<e.to&&r>e.from&&(this.fragments=Zl(this.fragments,s,r),this.skipped.splice(n--,1))}return this.skipped.length>=t?!1:(this.reset(),!0)}reset(){this.parse&&(this.takeTree(),this.parse=null)}skipUntilInView(e,t){this.skipped.push({from:e,to:t})}static getSkippingParser(e){return new class extends Zc{createParse(t,n,s){let r=s[0].from,o=s[s.length-1].to;return{parsedPos:r,advance(){let a=Vn;if(a){for(let c of s)a.tempSkipped.push(c);e&&(a.scheduleOn=a.scheduleOn?Promise.all([a.scheduleOn,e]):e)}return this.parsedPos=o,new fe(We.none,[],[],o-r)},stoppedAt:null,stopAt(){}}}}}isDone(e){e=Math.min(e,this.state.doc.length);let t=this.fragments;return this.treeLen>=e&&t.length&&t[0].from==0&&t[0].to>=e}static get(){return Vn}}function Zl(i,e,t){return rn.applyChanges(i,[{fromA:e,toA:t,fromB:e,toB:t}])}class On{constructor(e){this.context=e,this.tree=e.tree}apply(e){if(!e.docChanged&&this.tree==this.context.tree)return this;let t=this.context.changes(e.changes,e.state),n=this.context.treeLen==e.startState.doc.length?void 0:Math.max(e.changes.mapPos(this.context.treeLen),t.viewport.to);return t.work(20,n)||t.takeTree(),new On(t)}static init(e){let t=Math.min(3e3,e.doc.length),n=Pn.create(e.facet(Ln).parser,e,{from:0,to:t});return n.work(20,t)||n.takeTree(),new On(n)}}lt.state=Gt.define({create:On.init,update(i,e){for(let t of e.effects)if(t.is(lt.setState))return t.value;return e.startState.facet(Ln)!=e.state.facet(Ln)?On.init(e.state):i.apply(e)}});let nh=i=>{let e=setTimeout(()=>i(),500);return()=>clearTimeout(e)};typeof requestIdleCallback<"u"&&(nh=i=>{let e=-1,t=setTimeout(()=>{e=requestIdleCallback(i,{timeout:400})},100);return()=>e<0?clearTimeout(t):cancelIdleCallback(e)});const tr=typeof navigator<"u"&&(!((er=navigator.scheduling)===null||er===void 0)&&er.isInputPending)?()=>navigator.scheduling.isInputPending():null,Ip=Tt.fromClass(class{constructor(e){this.view=e,this.working=null,this.workScheduled=0,this.chunkEnd=-1,this.chunkBudget=-1,this.work=this.work.bind(this),this.scheduleWork()}update(e){let t=this.view.state.field(lt.state).context;(t.updateViewport(e.view.viewport)||this.view.viewport.to>t.treeLen)&&this.scheduleWork(),(e.docChanged||e.selectionSet)&&(this.view.hasFocus&&(this.chunkBudget+=50),this.scheduleWork()),this.checkAsyncSchedule(t)}scheduleWork(){if(this.working)return;let{state:e}=this.view,t=e.field(lt.state);(t.tree!=t.context.tree||!t.context.isDone(e.doc.length))&&(this.working=nh(this.work))}work(e){this.working=null;let t=Date.now();if(this.chunkEnd<t&&(this.chunkEnd<0||this.view.hasFocus)&&(this.chunkEnd=t+3e4,this.chunkBudget=3e3),this.chunkBudget<=0)return;let{state:n,viewport:{to:s}}=this.view,r=n.field(lt.state);if(r.tree==r.context.tree&&r.context.isDone(s+1e5))return;let o=Date.now()+Math.min(this.chunkBudget,100,e&&!tr?Math.max(25,e.timeRemaining()-5):1e9),l=r.context.treeLen<s&&n.doc.length>s+1e3,a=r.context.work(()=>tr&&tr()||Date.now()>o,s+(l?0:1e5));this.chunkBudget-=Date.now()-t,(a||this.chunkBudget<=0)&&(r.context.takeTree(),this.view.dispatch({effects:lt.setState.of(new On(r.context))})),this.chunkBudget>0&&!(a&&!l)&&this.scheduleWork(),this.checkAsyncSchedule(r.context)}checkAsyncSchedule(e){e.scheduleOn&&(this.workScheduled++,e.scheduleOn.then(()=>this.scheduleWork()).catch(t=>_t(this.view.state,t)).then(()=>this.workScheduled--),e.scheduleOn=null)}destroy(){this.working&&this.working()}isWorking(){return!!(this.working||this.workScheduled>0)}},{eventHandlers:{focus(){this.scheduleWork()}}}),Ln=I.define({combine(i){return i.length?i[0]:null},enables:i=>[lt.state,Ip,z.contentAttributes.compute([i],e=>{let t=e.facet(i);return t&&t.name?{"data-language":t.name}:{}})]}),zp=I.define(),Do=I.define({combine:i=>{if(!i.length)return"  ";let e=i[0];if(!e||/\S/.test(e)||Array.from(e).some(t=>t!=e[0]))throw new Error("Invalid indent unit: "+JSON.stringify(i[0]));return e}});function un(i){let e=i.facet(Do);return e.charCodeAt(0)==9?i.tabSize*e.length:e.length}function fs(i,e){let t="",n=i.tabSize,s=i.facet(Do)[0];if(s=="	"){for(;e>=n;)t+="	",e-=n;s=" "}for(let r=0;r<e;r++)t+=s;return t}function ih(i,e){i instanceof te&&(i=new _s(i));for(let n of i.state.facet(zp)){let s=n(i,e);if(s!==void 0)return s}let t=Mt(i.state);return t.length>=e?qp(i,t,e):null}class _s{constructor(e,t={}){this.state=e,this.options=t,this.unit=un(e)}lineAt(e,t=1){let n=this.state.doc.lineAt(e),{simulateBreak:s,simulateDoubleBreak:r}=this.options;return s!=null&&s>=n.from&&s<=n.to?r&&s==e?{text:"",from:e}:(t<0?s<e:s<=e)?{text:n.text.slice(s-n.from),from:s}:{text:n.text.slice(0,s-n.from),from:n.from}:n}textAfterPos(e,t=1){if(this.options.simulateDoubleBreak&&e==this.options.simulateBreak)return"";let{text:n,from:s}=this.lineAt(e,t);return n.slice(e-s,Math.min(n.length,e+100-s))}column(e,t=1){let{text:n,from:s}=this.lineAt(e,t),r=this.countColumn(n,e-s),o=this.options.overrideIndentation?this.options.overrideIndentation(s):-1;return o>-1&&(r+=o-this.countColumn(n,n.search(/\S|$/))),r}countColumn(e,t=e.length){return gs(e,this.state.tabSize,t)}lineIndent(e,t=1){let{text:n,from:s}=this.lineAt(e,t),r=this.options.overrideIndentation;if(r){let o=r(s);if(o>-1)return o}return this.countColumn(n,n.search(/\S|$/))}get simulatedBreak(){return this.options.simulateBreak||null}}const sh=new G;function qp(i,e,t){let n=e.resolveStack(t),s=e.resolveInner(t,-1).resolve(t,0).enterUnfinishedNodesBefore(t);if(s!=n.node){let r=[];for(let o=s;o&&!(o.from<n.node.from||o.to>n.node.to||o.from==n.node.from&&o.type==n.node.type);o=o.parent)r.push(o);for(let o=r.length-1;o>=0;o--)n={node:r[o],next:n}}return rh(n,i,t)}function rh(i,e,t){for(let n=i;n;n=n.next){let s=Fp(n.node);if(s)return s(Po.create(e,t,n))}return 0}function Np(i){return i.pos==i.options.simulateBreak&&i.options.simulateDoubleBreak}function Fp(i){let e=i.type.prop(sh);if(e)return e;let t=i.firstChild,n;if(t&&(n=t.type.prop(G.closedBy))){let s=i.lastChild,r=s&&n.indexOf(s.name)>-1;return o=>$p(o,!0,1,void 0,r&&!Np(o)?s.from:void 0)}return i.parent==null?Hp:null}function Hp(){return 0}class Po extends _s{constructor(e,t,n){super(e.state,e.options),this.base=e,this.pos=t,this.context=n}get node(){return this.context.node}static create(e,t,n){return new Po(e,t,n)}get textAfter(){return this.textAfterPos(this.pos)}get baseIndent(){return this.baseIndentFor(this.node)}baseIndentFor(e){let t=this.state.doc.lineAt(e.from);for(;;){let n=e.resolve(t.from);for(;n.parent&&n.parent.from==n.from;)n=n.parent;if(Wp(n,e))break;t=this.state.doc.lineAt(n.from)}return this.lineIndent(t.from)}continue(){return rh(this.context.next,this.base,this.pos)}}function Wp(i,e){for(let t=e;t;t=t.parent)if(i==t)return!0;return!1}function Vp(i){let e=i.node,t=e.childAfter(e.from),n=e.lastChild;if(!t)return null;let s=i.options.simulateBreak,r=i.state.doc.lineAt(t.from),o=s==null||s<=r.from?r.to:Math.min(r.to,s);for(let l=t.to;;){let a=e.childAfter(l);if(!a||a==n)return null;if(!a.type.isSkipped){if(a.from>=o)return null;let c=/^ */.exec(r.text.slice(t.to-r.from))[0].length;return{from:t.from,to:t.to+c}}l=a.to}}function $p(i,e,t,n,s){let r=i.textAfter,o=r.match(/^\s*/)[0].length,l=n&&r.slice(o,o+n.length)==n||s==i.pos+o,a=Vp(i);return a?l?i.column(a.from):i.column(a.to):i.baseIndent+(l?0:i.unit*t)}class Ss{constructor(e,t){this.specs=e;let n;function s(l){let a=$t.newName();return(n||(n=Object.create(null)))["."+a]=l,a}const r=typeof t.all=="string"?t.all:t.all?s(t.all):void 0,o=t.scope;this.scope=o instanceof lt?l=>l.prop(xn)==o.data:o?l=>l==o:void 0,this.style=th(e.map(l=>({tag:l.tag,class:l.class||s(Object.assign({},l,{tag:null}))})),{all:r}).style,this.module=n?new $t(n):null,this.themeType=t.themeType}static define(e,t){return new Ss(e,t||{})}}const Kr=I.define(),Up=I.define({combine(i){return i.length?[i[0]]:null}});function nr(i){let e=i.facet(Kr);return e.length?e:i.facet(Up)}function oh(i,e){let t=[Kp],n;return i instanceof Ss&&(i.module&&t.push(z.styleModule.of(i.module)),n=i.themeType),n?t.push(Kr.computeN([z.darkTheme],s=>s.facet(z.darkTheme)==(n=="dark")?[i]:[])):t.push(Kr.of(i)),t}class jp{constructor(e){this.markCache=Object.create(null),this.tree=Mt(e.state),this.decorations=this.buildDeco(e,nr(e.state)),this.decoratedTo=e.viewport.to}update(e){let t=Mt(e.state),n=nr(e.state),s=n!=nr(e.startState),{viewport:r}=e.view,o=e.changes.mapPos(this.decoratedTo,1);t.length<r.to&&!s&&t.type==this.tree.type&&o>=r.to?(this.decorations=this.decorations.map(e.changes),this.decoratedTo=o):(t!=this.tree||e.viewportChanged||s)&&(this.tree=t,this.decorations=this.buildDeco(e.view,n),this.decoratedTo=r.to)}buildDeco(e,t){if(!t||!this.tree.length)return ye.none;let n=new li;for(let{from:s,to:r}of e.visibleRanges)Bp(this.tree,t,(o,l,a)=>{n.add(o,l,this.markCache[a]||(this.markCache[a]=ye.mark({class:a})))},s,r);return n.finish()}}const Kp=ms.high(Tt.fromClass(jp,{decorations:i=>i.decorations})),Xp=1e4,Gp="()[]{}",Yp=new G;function Xr(i,e,t){let n=i.prop(e<0?G.openedBy:G.closedBy);if(n)return n;if(i.name.length==1){let s=t.indexOf(i.name);if(s>-1&&s%2==(e<0?1:0))return[t[s+e]]}return null}function Gr(i){let e=i.type.prop(Yp);return e?e(i.node):i}function kn(i,e,t,n={}){let s=n.maxScanDistance||Xp,r=n.brackets||Gp,o=Mt(i),l=o.resolveInner(e,t);for(let a=l;a;a=a.parent){let c=Xr(a.type,t,r);if(c&&a.from<a.to){let h=Gr(a);if(h&&(t>0?e>=h.from&&e<h.to:e>h.from&&e<=h.to))return Jp(i,e,t,a,h,c,r)}}return Qp(i,e,t,o,l.type,s,r)}function Jp(i,e,t,n,s,r,o){let l=n.parent,a={from:s.from,to:s.to},c=0,h=l==null?void 0:l.cursor();if(h&&(t<0?h.childBefore(n.from):h.childAfter(n.to)))do if(t<0?h.to<=n.from:h.from>=n.to){if(c==0&&r.indexOf(h.type.name)>-1&&h.from<h.to){let u=Gr(h);return{start:a,end:u?{from:u.from,to:u.to}:void 0,matched:!0}}else if(Xr(h.type,t,o))c++;else if(Xr(h.type,-t,o)){if(c==0){let u=Gr(h);return{start:a,end:u&&u.from<u.to?{from:u.from,to:u.to}:void 0,matched:!1}}c--}}while(t<0?h.prevSibling():h.nextSibling());return{start:a,matched:!1}}function Qp(i,e,t,n,s,r,o){let l=t<0?i.sliceDoc(e-1,e):i.sliceDoc(e,e+1),a=o.indexOf(l);if(a<0||a%2==0!=t>0)return null;let c={from:t<0?e-1:e,to:t>0?e+1:e},h=i.doc.iterRange(e,t>0?i.doc.length:0),u=0;for(let d=0;!h.next().done&&d<=r;){let f=h.value;t<0&&(d+=f.length);let p=e+d*t;for(let m=t>0?0:f.length-1,g=t>0?f.length:-1;m!=g;m+=t){let b=o.indexOf(f[m]);if(!(b<0||n.resolveInner(p+m,1).type!=s))if(b%2==0==t>0)u++;else{if(u==1)return{start:c,end:{from:p+m,to:p+m+1},matched:b>>1==a>>1};u--}}t>0&&(d+=f.length)}return h.done?{start:c,matched:!1}:null}function ea(i,e,t,n=0,s=0){e==null&&(e=i.search(/[^\s\u00a0]/),e==-1&&(e=i.length));let r=s;for(let o=n;o<e;o++)i.charCodeAt(o)==9?r+=t-r%t:r++;return r}class lh{constructor(e,t,n,s){this.string=e,this.tabSize=t,this.indentUnit=n,this.overrideIndent=s,this.pos=0,this.start=0,this.lastColumnPos=0,this.lastColumnValue=0}eol(){return this.pos>=this.string.length}sol(){return this.pos==0}peek(){return this.string.charAt(this.pos)||void 0}next(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)}eat(e){let t=this.string.charAt(this.pos),n;if(typeof e=="string"?n=t==e:n=t&&(e instanceof RegExp?e.test(t):e(t)),n)return++this.pos,t}eatWhile(e){let t=this.pos;for(;this.eat(e););return this.pos>t}eatSpace(){let e=this.pos;for(;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>e}skipToEnd(){this.pos=this.string.length}skipTo(e){let t=this.string.indexOf(e,this.pos);if(t>-1)return this.pos=t,!0}backUp(e){this.pos-=e}column(){return this.lastColumnPos<this.start&&(this.lastColumnValue=ea(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue}indentation(){var e;return(e=this.overrideIndent)!==null&&e!==void 0?e:ea(this.string,null,this.tabSize)}match(e,t,n){if(typeof e=="string"){let s=o=>n?o.toLowerCase():o,r=this.string.substr(this.pos,e.length);return s(r)==s(e)?(t!==!1&&(this.pos+=e.length),!0):null}else{let s=this.string.slice(this.pos).match(e);return s&&s.index>0?null:(s&&t!==!1&&(this.pos+=s[0].length),s)}}current(){return this.string.slice(this.start,this.pos)}}function Zp(i){return{name:i.name||"",token:i.token,blankLine:i.blankLine||(()=>{}),startState:i.startState||(()=>!0),copyState:i.copyState||em,indent:i.indent||(()=>null),languageData:i.languageData||{},tokenTable:i.tokenTable||Ro,mergeTokens:i.mergeTokens!==!1}}function em(i){if(typeof i!="object")return i;let e={};for(let t in i){let n=i[t];e[t]=n instanceof Array?n.slice():n}return e}const ta=new WeakMap;class Oo extends lt{constructor(e){let t=Op(e.languageData),n=Zp(e),s,r=new class extends Zc{createParse(o,l,a){return new nm(s,o,l,a)}};super(t,r,[],e.name),this.topNode=rm(t,this),s=this,this.streamParser=n,this.stateAfter=new G({perNode:!0}),this.tokenTable=e.tokenTable?new uh(n.tokenTable):sm}static define(e){return new Oo(e)}getIndent(e){let t,{overrideIndentation:n}=e.options;n&&(t=ta.get(e.state),t!=null&&t<e.pos-1e4&&(t=void 0));let s=Lo(this,e.node.tree,e.node.from,e.node.from,t??e.pos),r,o;if(s?(o=s.state,r=s.pos+1):(o=this.streamParser.startState(e.unit),r=e.node.from),e.pos-r>1e4)return null;for(;r<e.pos;){let a=e.state.doc.lineAt(r),c=Math.min(e.pos,a.to);if(a.length){let h=n?n(a.from):-1,u=new lh(a.text,e.state.tabSize,e.unit,h<0?void 0:h);for(;u.pos<c-a.from;)ch(this.streamParser.token,u,o)}else this.streamParser.blankLine(o,e.unit);if(c==e.pos)break;r=a.to+1}let l=e.lineAt(e.pos);return n&&t==null&&ta.set(e.state,l.from),this.streamParser.indent(o,/^\s*(.*)/.exec(l.text)[1],e)}get allowsNesting(){return!1}}function Lo(i,e,t,n,s){let r=t>=n&&t+e.length<=s&&e.prop(i.stateAfter);if(r)return{state:i.streamParser.copyState(r),pos:t+e.length};for(let o=e.children.length-1;o>=0;o--){let l=e.children[o],a=t+e.positions[o],c=l instanceof fe&&a<s&&Lo(i,l,a,n,s);if(c)return c}return null}function ah(i,e,t,n,s){if(s&&t<=0&&n>=e.length)return e;!s&&t==0&&e.type==i.topNode&&(s=!0);for(let r=e.children.length-1;r>=0;r--){let o=e.positions[r],l=e.children[r],a;if(o<n&&l instanceof fe){if(!(a=ah(i,l,t-o,n-o,s)))break;return s?new fe(e.type,e.children.slice(0,r).concat(a),e.positions.slice(0,r+1),o+a.length):a}}return null}function tm(i,e,t,n,s){for(let r of e){let o=r.from+(r.openStart?25:0),l=r.to-(r.openEnd?25:0),a=o<=t&&l>t&&Lo(i,r.tree,0-r.offset,t,l),c;if(a&&a.pos<=n&&(c=ah(i,r.tree,t+r.offset,a.pos+r.offset,!1)))return{state:a.state,tree:c}}return{state:i.streamParser.startState(s?un(s):4),tree:fe.empty}}class nm{constructor(e,t,n,s){this.lang=e,this.input=t,this.fragments=n,this.ranges=s,this.stoppedAt=null,this.chunks=[],this.chunkPos=[],this.chunk=[],this.chunkReused=void 0,this.rangeIndex=0,this.to=s[s.length-1].to;let r=Pn.get(),o=s[0].from,{state:l,tree:a}=tm(e,n,o,this.to,r==null?void 0:r.state);this.state=l,this.parsedPos=this.chunkStart=o+a.length;for(let c=0;c<a.children.length;c++)this.chunks.push(a.children[c]),this.chunkPos.push(a.positions[c]);r&&this.parsedPos<r.viewport.from-1e5&&s.some(c=>c.from<=r.viewport.from&&c.to>=r.viewport.from)&&(this.state=this.lang.streamParser.startState(un(r.state)),r.skipUntilInView(this.parsedPos,r.viewport.from),this.parsedPos=r.viewport.from),this.moveRangeIndex()}advance(){let e=Pn.get(),t=this.stoppedAt==null?this.to:Math.min(this.to,this.stoppedAt),n=Math.min(t,this.chunkStart+512);for(e&&(n=Math.min(n,e.viewport.to));this.parsedPos<n;)this.parseLine(e);return this.chunkStart<this.parsedPos&&this.finishChunk(),this.parsedPos>=t?this.finish():e&&this.parsedPos>=e.viewport.to?(e.skipUntilInView(this.parsedPos,t),this.finish()):null}stopAt(e){this.stoppedAt=e}lineAfter(e){let t=this.input.chunk(e);if(this.input.lineChunks)t==`
`&&(t="");else{let n=t.indexOf(`
`);n>-1&&(t=t.slice(0,n))}return e+t.length<=this.to?t:t.slice(0,this.to-e)}nextLine(){let e=this.parsedPos,t=this.lineAfter(e),n=e+t.length;for(let s=this.rangeIndex;;){let r=this.ranges[s].to;if(r>=n||(t=t.slice(0,r-(n-t.length)),s++,s==this.ranges.length))break;let o=this.ranges[s].from,l=this.lineAfter(o);t+=l,n=o+l.length}return{line:t,end:n}}skipGapsTo(e,t,n){for(;;){let s=this.ranges[this.rangeIndex].to,r=e+t;if(n>0?s>r:s>=r)break;let o=this.ranges[++this.rangeIndex].from;t+=o-s}return t}moveRangeIndex(){for(;this.ranges[this.rangeIndex].to<this.parsedPos;)this.rangeIndex++}emitToken(e,t,n,s){let r=4;if(this.ranges.length>1){s=this.skipGapsTo(t,s,1),t+=s;let l=this.chunk.length;s=this.skipGapsTo(n,s,-1),n+=s,r+=this.chunk.length-l}let o=this.chunk.length-4;return this.lang.streamParser.mergeTokens&&r==4&&o>=0&&this.chunk[o]==e&&this.chunk[o+2]==t?this.chunk[o+2]=n:this.chunk.push(e,t,n,r),s}parseLine(e){let{line:t,end:n}=this.nextLine(),s=0,{streamParser:r}=this.lang,o=new lh(t,e?e.state.tabSize:4,e?un(e.state):2);if(o.eol())r.blankLine(this.state,o.indentUnit);else for(;!o.eol();){let l=ch(r.token,o,this.state);if(l&&(s=this.emitToken(this.lang.tokenTable.resolve(l),this.parsedPos+o.start,this.parsedPos+o.pos,s)),o.start>1e4)break}this.parsedPos=n,this.moveRangeIndex(),this.parsedPos<this.to&&this.parsedPos++}finishChunk(){let e=fe.build({buffer:this.chunk,start:this.chunkStart,length:this.parsedPos-this.chunkStart,nodeSet:im,topID:0,maxBufferLength:512,reused:this.chunkReused});e=new fe(e.type,e.children,e.positions,e.length,[[this.lang.stateAfter,this.lang.streamParser.copyState(this.state)]]),this.chunks.push(e),this.chunkPos.push(this.chunkStart-this.ranges[0].from),this.chunk=[],this.chunkReused=void 0,this.chunkStart=this.parsedPos}finish(){return new fe(this.lang.topNode,this.chunks,this.chunkPos,this.parsedPos-this.ranges[0].from).balance()}}function ch(i,e,t){e.start=e.pos;for(let n=0;n<10;n++){let s=i(e,t);if(e.pos>e.start)return s}throw new Error("Stream parser failed to advance stream.")}const Ro=Object.create(null),mi=[We.none],im=new To(mi),na=[],ia=Object.create(null),hh=Object.create(null);for(let[i,e]of[["variable","variableName"],["variable-2","variableName.special"],["string-2","string.special"],["def","variableName.definition"],["tag","tagName"],["attribute","attributeName"],["type","typeName"],["builtin","variableName.standard"],["qualifier","modifier"],["error","invalid"],["header","heading"],["property","propertyName"]])hh[i]=dh(Ro,e);class uh{constructor(e){this.extra=e,this.table=Object.assign(Object.create(null),hh)}resolve(e){return e?this.table[e]||(this.table[e]=dh(this.extra,e)):0}}const sm=new uh(Ro);function ir(i,e){na.indexOf(i)>-1||(na.push(i),console.warn(e))}function dh(i,e){let t=[];for(let l of e.split(" ")){let a=[];for(let c of l.split(".")){let h=i[c]||H[c];h?typeof h=="function"?a.length?a=a.map(h):ir(c,`Modifier ${c} used at start of tag`):a.length?ir(c,`Tag ${c} used as modifier`):a=Array.isArray(h)?h:[h]:ir(c,`Unknown highlighting tag ${c}`)}for(let c of a)t.push(c)}if(!t.length)return 0;let n=e.replace(/ /g,"_"),s=n+" "+t.map(l=>l.id),r=ia[s];if(r)return r.id;let o=ia[s]=We.define({id:mi.length,name:n,props:[Mp({[n]:t})]});return mi.push(o),o.id}function rm(i,e){let t=We.define({id:mi.length,name:"Document",props:[xn.add(()=>i),sh.add(()=>n=>e.getIndent(n))],top:!0});return mi.push(t),t}de.RTL,de.LTR;const om=i=>{let{state:e}=i,t=e.doc.lineAt(e.selection.main.from),n=zo(i.state,t.from);return n.line?lm(i):n.block?cm(i):!1};function Io(i,e){return({state:t,dispatch:n})=>{if(t.readOnly)return!1;let s=i(e,t);return s?(n(t.update(s)),!0):!1}}const lm=Io(dm,0),am=Io(fh,0),cm=Io((i,e)=>fh(i,e,um(e)),0);function zo(i,e){let t=i.languageDataAt("commentTokens",e,1);return t.length?t[0]:{}}const $n=50;function hm(i,{open:e,close:t},n,s){let r=i.sliceDoc(n-$n,n),o=i.sliceDoc(s,s+$n),l=/\s*$/.exec(r)[0].length,a=/^\s*/.exec(o)[0].length,c=r.length-l;if(r.slice(c-e.length,c)==e&&o.slice(a,a+t.length)==t)return{open:{pos:n-l,margin:l&&1},close:{pos:s+a,margin:a&&1}};let h,u;s-n<=2*$n?h=u=i.sliceDoc(n,s):(h=i.sliceDoc(n,n+$n),u=i.sliceDoc(s-$n,s));let d=/^\s*/.exec(h)[0].length,f=/\s*$/.exec(u)[0].length,p=u.length-f-t.length;return h.slice(d,d+e.length)==e&&u.slice(p,p+t.length)==t?{open:{pos:n+d+e.length,margin:/\s/.test(h.charAt(d+e.length))?1:0},close:{pos:s-f-t.length,margin:/\s/.test(u.charAt(p-1))?1:0}}:null}function um(i){let e=[];for(let t of i.selection.ranges){let n=i.doc.lineAt(t.from),s=t.to<=n.to?n:i.doc.lineAt(t.to);s.from>n.from&&s.from==t.to&&(s=t.to==n.to+1?n:i.doc.lineAt(t.to-1));let r=e.length-1;r>=0&&e[r].to>n.from?e[r].to=s.to:e.push({from:n.from+/^\s*/.exec(n.text)[0].length,to:s.to})}return e}function fh(i,e,t=e.selection.ranges){let n=t.map(r=>zo(e,r.from).block);if(!n.every(r=>r))return null;let s=t.map((r,o)=>hm(e,n[o],r.from,r.to));if(i!=2&&!s.every(r=>r))return{changes:e.changes(t.map((r,o)=>s[o]?[]:[{from:r.from,insert:n[o].open+" "},{from:r.to,insert:" "+n[o].close}]))};if(i!=1&&s.some(r=>r)){let r=[];for(let o=0,l;o<s.length;o++)if(l=s[o]){let a=n[o],{open:c,close:h}=l;r.push({from:c.pos-a.open.length,to:c.pos+c.margin},{from:h.pos-h.margin,to:h.pos+a.close.length})}return{changes:r}}return null}function dm(i,e,t=e.selection.ranges){let n=[],s=-1;e:for(let{from:r,to:o}of t){let l=n.length,a=1e9,c;for(let h=r;h<=o;){let u=e.doc.lineAt(h);if(c==null&&(c=zo(e,u.from).line,!c))continue e;if(u.from>s&&(r==o||o>u.from)){s=u.from;let d=/^\s*/.exec(u.text)[0].length,f=d==u.length,p=u.text.slice(d,d+c.length)==c?d:-1;d<u.text.length&&d<a&&(a=d),n.push({line:u,comment:p,token:c,indent:d,empty:f,single:!1})}h=u.to+1}if(a<1e9)for(let h=l;h<n.length;h++)n[h].indent<n[h].line.text.length&&(n[h].indent=a);n.length==l+1&&(n[l].single=!0)}if(i!=2&&n.some(r=>r.comment<0&&(!r.empty||r.single))){let r=[];for(let{line:l,token:a,indent:c,empty:h,single:u}of n)(u||!h)&&r.push({from:l.from+c,insert:a+" "});let o=e.changes(r);return{changes:o,selection:e.selection.map(o,1)}}else if(i!=1&&n.some(r=>r.comment>=0)){let r=[];for(let{line:o,comment:l,token:a}of n)if(l>=0){let c=o.from+l,h=c+a.length;o.text[h-o.from]==" "&&h++,r.push({from:c,to:h})}return{changes:r}}return null}const Yr=Yt.define(),fm=Yt.define(),pm=I.define(),ph=I.define({combine(i){return po(i,{minDepth:100,newGroupDelay:500,joinToEvent:(e,t)=>t},{minDepth:Math.max,newGroupDelay:Math.min,joinToEvent:(e,t)=>(n,s)=>e(n,s)||t(n,s)})}}),mh=Gt.define({create(){return St.empty},update(i,e){let t=e.state.facet(ph),n=e.annotation(Yr);if(n){let a=Ne.fromTransaction(e,n.selection),c=n.side,h=c==0?i.undone:i.done;return a?h=ps(h,h.length,t.minDepth,a):h=yh(h,e.startState.selection),new St(c==0?n.rest:h,c==0?h:n.rest)}let s=e.annotation(fm);if((s=="full"||s=="before")&&(i=i.isolate()),e.annotation(xe.addToHistory)===!1)return e.changes.empty?i:i.addMapping(e.changes.desc);let r=Ne.fromTransaction(e),o=e.annotation(xe.time),l=e.annotation(xe.userEvent);return r?i=i.addChanges(r,o,l,t,e):e.selection&&(i=i.addSelection(e.startState.selection,o,l,t.newGroupDelay)),(s=="full"||s=="after")&&(i=i.isolate()),i},toJSON(i){return{done:i.done.map(e=>e.toJSON()),undone:i.undone.map(e=>e.toJSON())}},fromJSON(i){return new St(i.done.map(Ne.fromJSON),i.undone.map(Ne.fromJSON))}});function mm(i={}){return[mh,ph.of(i),z.domEventHandlers({beforeinput(e,t){let n=e.inputType=="historyUndo"?gh:e.inputType=="historyRedo"?Jr:null;return n?(e.preventDefault(),n(t)):!1}})]}function Cs(i,e){return function({state:t,dispatch:n}){if(!e&&t.readOnly)return!1;let s=t.field(mh,!1);if(!s)return!1;let r=s.pop(i,t,e);return r?(n(r),!0):!1}}const gh=Cs(0,!1),Jr=Cs(1,!1),gm=Cs(0,!0),bm=Cs(1,!0);class Ne{constructor(e,t,n,s,r){this.changes=e,this.effects=t,this.mapped=n,this.startSelection=s,this.selectionsAfter=r}setSelAfter(e){return new Ne(this.changes,this.effects,this.mapped,this.startSelection,e)}toJSON(){var e,t,n;return{changes:(e=this.changes)===null||e===void 0?void 0:e.toJSON(),mapped:(t=this.mapped)===null||t===void 0?void 0:t.toJSON(),startSelection:(n=this.startSelection)===null||n===void 0?void 0:n.toJSON(),selectionsAfter:this.selectionsAfter.map(s=>s.toJSON())}}static fromJSON(e){return new Ne(e.changes&&ve.fromJSON(e.changes),[],e.mapped&&Ct.fromJSON(e.mapped),e.startSelection&&_.fromJSON(e.startSelection),e.selectionsAfter.map(_.fromJSON))}static fromTransaction(e,t){let n=Qe;for(let s of e.startState.facet(pm)){let r=s(e);r.length&&(n=n.concat(r))}return!n.length&&e.changes.empty?null:new Ne(e.changes.invert(e.startState.doc),n,void 0,t||e.startState.selection,Qe)}static selection(e){return new Ne(void 0,Qe,void 0,void 0,e)}}function ps(i,e,t,n){let s=e+1>t+20?e-t-1:0,r=i.slice(s,e);return r.push(n),r}function ym(i,e){let t=[],n=!1;return i.iterChangedRanges((s,r)=>t.push(s,r)),e.iterChangedRanges((s,r,o,l)=>{for(let a=0;a<t.length;){let c=t[a++],h=t[a++];l>=c&&o<=h&&(n=!0)}}),n}function wm(i,e){return i.ranges.length==e.ranges.length&&i.ranges.filter((t,n)=>t.empty!=e.ranges[n].empty).length===0}function bh(i,e){return i.length?e.length?i.concat(e):i:e}const Qe=[],vm=200;function yh(i,e){if(i.length){let t=i[i.length-1],n=t.selectionsAfter.slice(Math.max(0,t.selectionsAfter.length-vm));return n.length&&n[n.length-1].eq(e)?i:(n.push(e),ps(i,i.length-1,1e9,t.setSelAfter(n)))}else return[Ne.selection([e])]}function xm(i){let e=i[i.length-1],t=i.slice();return t[i.length-1]=e.setSelAfter(e.selectionsAfter.slice(0,e.selectionsAfter.length-1)),t}function sr(i,e){if(!i.length)return i;let t=i.length,n=Qe;for(;t;){let s=km(i[t-1],e,n);if(s.changes&&!s.changes.empty||s.effects.length){let r=i.slice(0,t);return r[t-1]=s,r}else e=s.mapped,t--,n=s.selectionsAfter}return n.length?[Ne.selection(n)]:Qe}function km(i,e,t){let n=bh(i.selectionsAfter.length?i.selectionsAfter.map(l=>l.map(e)):Qe,t);if(!i.changes)return Ne.selection(n);let s=i.changes.map(e),r=e.mapDesc(i.changes,!0),o=i.mapped?i.mapped.composeDesc(r):r;return new Ne(s,be.mapEffects(i.effects,e),o,i.startSelection.map(r),n)}const _m=/^(input\.type|delete)($|\.)/;class St{constructor(e,t,n=0,s=void 0){this.done=e,this.undone=t,this.prevTime=n,this.prevUserEvent=s}isolate(){return this.prevTime?new St(this.done,this.undone):this}addChanges(e,t,n,s,r){let o=this.done,l=o[o.length-1];return l&&l.changes&&!l.changes.empty&&e.changes&&(!n||_m.test(n))&&(!l.selectionsAfter.length&&t-this.prevTime<s.newGroupDelay&&s.joinToEvent(r,ym(l.changes,e.changes))||n=="input.type.compose")?o=ps(o,o.length-1,s.minDepth,new Ne(e.changes.compose(l.changes),bh(be.mapEffects(e.effects,l.changes),l.effects),l.mapped,l.startSelection,Qe)):o=ps(o,o.length,s.minDepth,e),new St(o,Qe,t,n)}addSelection(e,t,n,s){let r=this.done.length?this.done[this.done.length-1].selectionsAfter:Qe;return r.length>0&&t-this.prevTime<s&&n==this.prevUserEvent&&n&&/^select($|\.)/.test(n)&&wm(r[r.length-1],e)?this:new St(yh(this.done,e),this.undone,t,n)}addMapping(e){return new St(sr(this.done,e),sr(this.undone,e),this.prevTime,this.prevUserEvent)}pop(e,t,n){let s=e==0?this.done:this.undone;if(s.length==0)return null;let r=s[s.length-1],o=r.selectionsAfter[0]||(r.startSelection?r.startSelection.map(r.changes.invertedDesc,1):t.selection);if(n&&r.selectionsAfter.length)return t.update({selection:r.selectionsAfter[r.selectionsAfter.length-1],annotations:Yr.of({side:e,rest:xm(s),selection:o}),userEvent:e==0?"select.undo":"select.redo",scrollIntoView:!0});if(r.changes){let l=s.length==1?Qe:s.slice(0,s.length-1);return r.mapped&&(l=sr(l,r.mapped)),t.update({changes:r.changes,selection:r.startSelection,effects:r.effects,annotations:Yr.of({side:e,rest:l,selection:o}),filter:!1,userEvent:e==0?"undo":"redo",scrollIntoView:!0})}else return null}}St.empty=new St(Qe,Qe);const Sm=[{key:"Mod-z",run:gh,preventDefault:!0},{key:"Mod-y",mac:"Mod-Shift-z",run:Jr,preventDefault:!0},{linux:"Ctrl-Shift-z",run:Jr,preventDefault:!0},{key:"Mod-u",run:gm,preventDefault:!0},{key:"Alt-u",mac:"Mod-Shift-u",run:bm,preventDefault:!0}];function qn(i,e){return _.create(i.ranges.map(e),i.mainIndex)}function ct(i,e){return i.update({selection:e,scrollIntoView:!0,userEvent:"select"})}function ht({state:i,dispatch:e},t){let n=qn(i.selection,t);return n.eq(i.selection,!0)?!1:(e(ct(i,n)),!0)}function As(i,e){return _.cursor(e?i.to:i.from)}function wh(i,e){return ht(i,t=>t.empty?i.moveByChar(t,e):As(t,e))}function Be(i){return i.textDirectionAt(i.state.selection.main.head)==de.LTR}const vh=i=>wh(i,!Be(i)),xh=i=>wh(i,Be(i));function kh(i,e){return ht(i,t=>t.empty?i.moveByGroup(t,e):As(t,e))}const Cm=i=>kh(i,!Be(i)),Am=i=>kh(i,Be(i));function Tm(i,e,t){if(e.type.prop(t))return!0;let n=e.to-e.from;return n&&(n>2||/[^\s,.;:]/.test(i.sliceDoc(e.from,e.to)))||e.firstChild}function Ts(i,e,t){let n=Mt(i).resolveInner(e.head),s=t?G.closedBy:G.openedBy;for(let a=e.head;;){let c=t?n.childAfter(a):n.childBefore(a);if(!c)break;Tm(i,c,s)?n=c:a=t?c.to:c.from}let r=n.type.prop(s),o,l;return r&&(o=t?kn(i,n.from,1):kn(i,n.to,-1))&&o.matched?l=t?o.end.to:o.end.from:l=t?n.to:n.from,_.cursor(l,t?-1:1)}const Mm=i=>ht(i,e=>Ts(i.state,e,!Be(i))),Em=i=>ht(i,e=>Ts(i.state,e,Be(i)));function _h(i,e){return ht(i,t=>{if(!t.empty)return As(t,e);let n=i.moveVertically(t,e);return n.head!=t.head?n:i.moveToLineBoundary(t,e)})}const Sh=i=>_h(i,!1),Ch=i=>_h(i,!0);function Ah(i){let e=i.scrollDOM.clientHeight<i.scrollDOM.scrollHeight-2,t=0,n=0,s;if(e){for(let r of i.state.facet(z.scrollMargins)){let o=r(i);o!=null&&o.top&&(t=Math.max(o==null?void 0:o.top,t)),o!=null&&o.bottom&&(n=Math.max(o==null?void 0:o.bottom,n))}s=i.scrollDOM.clientHeight-t-n}else s=(i.dom.ownerDocument.defaultView||window).innerHeight;return{marginTop:t,marginBottom:n,selfScroll:e,height:Math.max(i.defaultLineHeight,s-5)}}function Th(i,e){let t=Ah(i),{state:n}=i,s=qn(n.selection,o=>o.empty?i.moveVertically(o,e,t.height):As(o,e));if(s.eq(n.selection))return!1;let r;if(t.selfScroll){let o=i.coordsAtPos(n.selection.main.head),l=i.scrollDOM.getBoundingClientRect(),a=l.top+t.marginTop,c=l.bottom-t.marginBottom;o&&o.top>a&&o.bottom<c&&(r=z.scrollIntoView(s.main.head,{y:"start",yMargin:o.top-a}))}return i.dispatch(ct(n,s),{effects:r}),!0}const sa=i=>Th(i,!1),Qr=i=>Th(i,!0);function Jt(i,e,t){let n=i.lineBlockAt(e.head),s=i.moveToLineBoundary(e,t);if(s.head==e.head&&s.head!=(t?n.to:n.from)&&(s=i.moveToLineBoundary(e,t,!1)),!t&&s.head==n.from&&n.length){let r=/^\s*/.exec(i.state.sliceDoc(n.from,Math.min(n.from+100,n.to)))[0].length;r&&e.head!=n.from+r&&(s=_.cursor(n.from+r))}return s}const Bm=i=>ht(i,e=>Jt(i,e,!0)),Dm=i=>ht(i,e=>Jt(i,e,!1)),Pm=i=>ht(i,e=>Jt(i,e,!Be(i))),Om=i=>ht(i,e=>Jt(i,e,Be(i))),Lm=i=>ht(i,e=>_.cursor(i.lineBlockAt(e.head).from,1)),Rm=i=>ht(i,e=>_.cursor(i.lineBlockAt(e.head).to,-1));function Im(i,e,t){let n=!1,s=qn(i.selection,r=>{let o=kn(i,r.head,-1)||kn(i,r.head,1)||r.head>0&&kn(i,r.head-1,1)||r.head<i.doc.length&&kn(i,r.head+1,-1);if(!o||!o.end)return r;n=!0;let l=o.start.from==r.head?o.end.to:o.end.from;return _.cursor(l)});return n?(e(ct(i,s)),!0):!1}const zm=({state:i,dispatch:e})=>Im(i,e);function et(i,e){let t=qn(i.state.selection,n=>{let s=e(n);return _.range(n.anchor,s.head,s.goalColumn,s.bidiLevel||void 0,s.assoc)});return t.eq(i.state.selection)?!1:(i.dispatch(ct(i.state,t)),!0)}function Mh(i,e){return et(i,t=>i.moveByChar(t,e))}const Eh=i=>Mh(i,!Be(i)),Bh=i=>Mh(i,Be(i));function Dh(i,e){return et(i,t=>i.moveByGroup(t,e))}const qm=i=>Dh(i,!Be(i)),Nm=i=>Dh(i,Be(i)),Fm=i=>et(i,e=>Ts(i.state,e,!Be(i))),Hm=i=>et(i,e=>Ts(i.state,e,Be(i)));function Ph(i,e){return et(i,t=>i.moveVertically(t,e))}const Oh=i=>Ph(i,!1),Lh=i=>Ph(i,!0);function Rh(i,e){return et(i,t=>i.moveVertically(t,e,Ah(i).height))}const ra=i=>Rh(i,!1),oa=i=>Rh(i,!0),Wm=i=>et(i,e=>Jt(i,e,!0)),Vm=i=>et(i,e=>Jt(i,e,!1)),$m=i=>et(i,e=>Jt(i,e,!Be(i))),Um=i=>et(i,e=>Jt(i,e,Be(i))),jm=i=>et(i,e=>_.cursor(i.lineBlockAt(e.head).from)),Km=i=>et(i,e=>_.cursor(i.lineBlockAt(e.head).to)),la=({state:i,dispatch:e})=>(e(ct(i,{anchor:0})),!0),aa=({state:i,dispatch:e})=>(e(ct(i,{anchor:i.doc.length})),!0),ca=({state:i,dispatch:e})=>(e(ct(i,{anchor:i.selection.main.anchor,head:0})),!0),ha=({state:i,dispatch:e})=>(e(ct(i,{anchor:i.selection.main.anchor,head:i.doc.length})),!0),Xm=({state:i,dispatch:e})=>(e(i.update({selection:{anchor:0,head:i.doc.length},userEvent:"select"})),!0),Gm=({state:i,dispatch:e})=>{let t=Ms(i).map(({from:n,to:s})=>_.range(n,Math.min(s+1,i.doc.length)));return e(i.update({selection:_.create(t),userEvent:"select"})),!0},Ym=({state:i,dispatch:e})=>{let t=qn(i.selection,n=>{let s=Mt(i),r=s.resolveStack(n.from,1);if(n.empty){let o=s.resolveStack(n.from,-1);o.node.from>=r.node.from&&o.node.to<=r.node.to&&(r=o)}for(let o=r;o;o=o.next){let{node:l}=o;if((l.from<n.from&&l.to>=n.to||l.to>n.to&&l.from<=n.from)&&o.next)return _.range(l.to,l.from)}return n});return t.eq(i.selection)?!1:(e(ct(i,t)),!0)};function Ih(i,e){let{state:t}=i,n=t.selection,s=t.selection.ranges.slice();for(let r of t.selection.ranges){let o=t.doc.lineAt(r.head);if(e?o.to<i.state.doc.length:o.from>0)for(let l=r;;){let a=i.moveVertically(l,e);if(a.head<o.from||a.head>o.to){s.some(c=>c.head==a.head)||s.push(a);break}else{if(a.head==l.head)break;l=a}}}return s.length==n.ranges.length?!1:(i.dispatch(ct(t,_.create(s,s.length-1))),!0)}const Jm=i=>Ih(i,!1),Qm=i=>Ih(i,!0),Zm=({state:i,dispatch:e})=>{let t=i.selection,n=null;return t.ranges.length>1?n=_.create([t.main]):t.main.empty||(n=_.create([_.cursor(t.main.head)])),n?(e(ct(i,n)),!0):!1};function _i(i,e){if(i.state.readOnly)return!1;let t="delete.selection",{state:n}=i,s=n.changeByRange(r=>{let{from:o,to:l}=r;if(o==l){let a=e(r);a<o?(t="delete.backward",a=Fi(i,a,!1)):a>o&&(t="delete.forward",a=Fi(i,a,!0)),o=Math.min(o,a),l=Math.max(l,a)}else o=Fi(i,o,!1),l=Fi(i,l,!0);return o==l?{range:r}:{changes:{from:o,to:l},range:_.cursor(o,o<r.head?-1:1)}});return s.changes.empty?!1:(i.dispatch(n.update(s,{scrollIntoView:!0,userEvent:t,effects:t=="delete.selection"?z.announce.of(n.phrase("Selection deleted")):void 0})),!0)}function Fi(i,e,t){if(i instanceof z)for(let n of i.state.facet(z.atomicRanges).map(s=>s(i)))n.between(e,e,(s,r)=>{s<e&&r>e&&(e=t?r:s)});return e}const zh=(i,e,t)=>_i(i,n=>{let s=n.from,{state:r}=i,o=r.doc.lineAt(s),l,a;if(t&&!e&&s>o.from&&s<o.from+200&&!/[^ \t]/.test(l=o.text.slice(0,s-o.from))){if(l[l.length-1]=="	")return s-1;let c=gs(l,r.tabSize),h=c%un(r)||un(r);for(let u=0;u<h&&l[l.length-1-u]==" ";u++)s--;a=s}else a=Ee(o.text,s-o.from,e,e)+o.from,a==s&&o.number!=(e?r.doc.lines:1)?a+=e?1:-1:!e&&/[\ufe00-\ufe0f]/.test(o.text.slice(a-o.from,s-o.from))&&(a=Ee(o.text,a-o.from,!1,!1)+o.from);return a}),Zr=i=>zh(i,!1,!0),qh=i=>zh(i,!0,!1),Nh=(i,e)=>_i(i,t=>{let n=t.head,{state:s}=i,r=s.doc.lineAt(n),o=s.charCategorizer(n);for(let l=null;;){if(n==(e?r.to:r.from)){n==t.head&&r.number!=(e?s.doc.lines:1)&&(n+=e?1:-1);break}let a=Ee(r.text,n-r.from,e)+r.from,c=r.text.slice(Math.min(n,a)-r.from,Math.max(n,a)-r.from),h=o(c);if(l!=null&&h!=l)break;(c!=" "||n!=t.head)&&(l=h),n=a}return n}),Fh=i=>Nh(i,!1),eg=i=>Nh(i,!0),tg=i=>_i(i,e=>{let t=i.lineBlockAt(e.head).to;return e.head<t?t:Math.min(i.state.doc.length,e.head+1)}),ng=i=>_i(i,e=>{let t=i.moveToLineBoundary(e,!1).head;return e.head>t?t:Math.max(0,e.head-1)}),ig=i=>_i(i,e=>{let t=i.moveToLineBoundary(e,!0).head;return e.head<t?t:Math.min(i.state.doc.length,e.head+1)}),sg=({state:i,dispatch:e})=>{if(i.readOnly)return!1;let t=i.changeByRange(n=>({changes:{from:n.from,to:n.to,insert:ee.of(["",""])},range:_.cursor(n.from)}));return e(i.update(t,{scrollIntoView:!0,userEvent:"input"})),!0},rg=({state:i,dispatch:e})=>{if(i.readOnly)return!1;let t=i.changeByRange(n=>{if(!n.empty||n.from==0||n.from==i.doc.length)return{range:n};let s=n.from,r=i.doc.lineAt(s),o=s==r.from?s-1:Ee(r.text,s-r.from,!1)+r.from,l=s==r.to?s+1:Ee(r.text,s-r.from,!0)+r.from;return{changes:{from:o,to:l,insert:i.doc.slice(s,l).append(i.doc.slice(o,s))},range:_.cursor(l)}});return t.changes.empty?!1:(e(i.update(t,{scrollIntoView:!0,userEvent:"move.character"})),!0)};function Ms(i){let e=[],t=-1;for(let n of i.selection.ranges){let s=i.doc.lineAt(n.from),r=i.doc.lineAt(n.to);if(!n.empty&&n.to==r.from&&(r=i.doc.lineAt(n.to-1)),t>=s.number){let o=e[e.length-1];o.to=r.to,o.ranges.push(n)}else e.push({from:s.from,to:r.to,ranges:[n]});t=r.number+1}return e}function Hh(i,e,t){if(i.readOnly)return!1;let n=[],s=[];for(let r of Ms(i)){if(t?r.to==i.doc.length:r.from==0)continue;let o=i.doc.lineAt(t?r.to+1:r.from-1),l=o.length+1;if(t){n.push({from:r.to,to:o.to},{from:r.from,insert:o.text+i.lineBreak});for(let a of r.ranges)s.push(_.range(Math.min(i.doc.length,a.anchor+l),Math.min(i.doc.length,a.head+l)))}else{n.push({from:o.from,to:r.from},{from:r.to,insert:i.lineBreak+o.text});for(let a of r.ranges)s.push(_.range(a.anchor-l,a.head-l))}}return n.length?(e(i.update({changes:n,scrollIntoView:!0,selection:_.create(s,i.selection.mainIndex),userEvent:"move.line"})),!0):!1}const og=({state:i,dispatch:e})=>Hh(i,e,!1),lg=({state:i,dispatch:e})=>Hh(i,e,!0);function Wh(i,e,t){if(i.readOnly)return!1;let n=[];for(let r of Ms(i))t?n.push({from:r.from,insert:i.doc.slice(r.from,r.to)+i.lineBreak}):n.push({from:r.to,insert:i.lineBreak+i.doc.slice(r.from,r.to)});let s=i.changes(n);return e(i.update({changes:s,selection:i.selection.map(s,t?1:-1),scrollIntoView:!0,userEvent:"input.copyline"})),!0}const ag=({state:i,dispatch:e})=>Wh(i,e,!1),cg=({state:i,dispatch:e})=>Wh(i,e,!0),hg=i=>{if(i.state.readOnly)return!1;let{state:e}=i,t=e.changes(Ms(e).map(({from:s,to:r})=>(s>0?s--:r<e.doc.length&&r++,{from:s,to:r}))),n=qn(e.selection,s=>{let r;if(i.lineWrapping){let o=i.lineBlockAt(s.head),l=i.coordsAtPos(s.head,s.assoc||1);l&&(r=o.bottom+i.documentTop-l.bottom+i.defaultLineHeight/2)}return i.moveVertically(s,!0,r)}).map(t);return i.dispatch({changes:t,selection:n,scrollIntoView:!0,userEvent:"delete.line"}),!0};function ug(i,e){if(/\(\)|\[\]|\{\}/.test(i.sliceDoc(e-1,e+1)))return{from:e,to:e};let t=Mt(i).resolveInner(e),n=t.childBefore(e),s=t.childAfter(e),r;return n&&s&&n.to<=e&&s.from>=e&&(r=n.type.prop(G.closedBy))&&r.indexOf(s.name)>-1&&i.doc.lineAt(n.to).from==i.doc.lineAt(s.from).from&&!/\S/.test(i.sliceDoc(n.to,s.from))?{from:n.to,to:s.from}:null}const ua=Vh(!1),dg=Vh(!0);function Vh(i){return({state:e,dispatch:t})=>{if(e.readOnly)return!1;let n=e.changeByRange(s=>{let{from:r,to:o}=s,l=e.doc.lineAt(r),a=!i&&r==o&&ug(e,r);i&&(r=o=(o<=l.to?l:e.doc.lineAt(o)).to);let c=new _s(e,{simulateBreak:r,simulateDoubleBreak:!!a}),h=ih(c,r);for(h==null&&(h=gs(/^\s*/.exec(e.doc.lineAt(r).text)[0],e.tabSize));o<l.to&&/\s/.test(l.text[o-l.from]);)o++;a?{from:r,to:o}=a:r>l.from&&r<l.from+100&&!/\S/.test(l.text.slice(0,r))&&(r=l.from);let u=["",fs(e,h)];return a&&u.push(fs(e,c.lineIndent(l.from,-1))),{changes:{from:r,to:o,insert:ee.of(u)},range:_.cursor(r+1+u[1].length)}});return t(e.update(n,{scrollIntoView:!0,userEvent:"input"})),!0}}function qo(i,e){let t=-1;return i.changeByRange(n=>{let s=[];for(let o=n.from;o<=n.to;){let l=i.doc.lineAt(o);l.number>t&&(n.empty||n.to>l.from)&&(e(l,s,n),t=l.number),o=l.to+1}let r=i.changes(s);return{changes:s,range:_.range(r.mapPos(n.anchor,1),r.mapPos(n.head,1))}})}const fg=({state:i,dispatch:e})=>{if(i.readOnly)return!1;let t=Object.create(null),n=new _s(i,{overrideIndentation:r=>{let o=t[r];return o??-1}}),s=qo(i,(r,o,l)=>{let a=ih(n,r.from);if(a==null)return;/\S/.test(r.text)||(a=0);let c=/^\s*/.exec(r.text)[0],h=fs(i,a);(c!=h||l.from<r.from+c.length)&&(t[r.from]=a,o.push({from:r.from,to:r.from+c.length,insert:h}))});return s.changes.empty||e(i.update(s,{userEvent:"indent"})),!0},$h=({state:i,dispatch:e})=>i.readOnly?!1:(e(i.update(qo(i,(t,n)=>{n.push({from:t.from,insert:i.facet(Do)})}),{userEvent:"input.indent"})),!0),Uh=({state:i,dispatch:e})=>i.readOnly?!1:(e(i.update(qo(i,(t,n)=>{let s=/^\s*/.exec(t.text)[0];if(!s)return;let r=gs(s,i.tabSize),o=0,l=fs(i,Math.max(0,r-un(i)));for(;o<s.length&&o<l.length&&s.charCodeAt(o)==l.charCodeAt(o);)o++;n.push({from:t.from+o,to:t.from+s.length,insert:l.slice(o)})}),{userEvent:"delete.dedent"})),!0),pg=i=>(i.setTabFocusMode(),!0),mg=[{key:"Ctrl-b",run:vh,shift:Eh,preventDefault:!0},{key:"Ctrl-f",run:xh,shift:Bh},{key:"Ctrl-p",run:Sh,shift:Oh},{key:"Ctrl-n",run:Ch,shift:Lh},{key:"Ctrl-a",run:Lm,shift:jm},{key:"Ctrl-e",run:Rm,shift:Km},{key:"Ctrl-d",run:qh},{key:"Ctrl-h",run:Zr},{key:"Ctrl-k",run:tg},{key:"Ctrl-Alt-h",run:Fh},{key:"Ctrl-o",run:sg},{key:"Ctrl-t",run:rg},{key:"Ctrl-v",run:Qr}],gg=[{key:"ArrowLeft",run:vh,shift:Eh,preventDefault:!0},{key:"Mod-ArrowLeft",mac:"Alt-ArrowLeft",run:Cm,shift:qm,preventDefault:!0},{mac:"Cmd-ArrowLeft",run:Pm,shift:$m,preventDefault:!0},{key:"ArrowRight",run:xh,shift:Bh,preventDefault:!0},{key:"Mod-ArrowRight",mac:"Alt-ArrowRight",run:Am,shift:Nm,preventDefault:!0},{mac:"Cmd-ArrowRight",run:Om,shift:Um,preventDefault:!0},{key:"ArrowUp",run:Sh,shift:Oh,preventDefault:!0},{mac:"Cmd-ArrowUp",run:la,shift:ca},{mac:"Ctrl-ArrowUp",run:sa,shift:ra},{key:"ArrowDown",run:Ch,shift:Lh,preventDefault:!0},{mac:"Cmd-ArrowDown",run:aa,shift:ha},{mac:"Ctrl-ArrowDown",run:Qr,shift:oa},{key:"PageUp",run:sa,shift:ra},{key:"PageDown",run:Qr,shift:oa},{key:"Home",run:Dm,shift:Vm,preventDefault:!0},{key:"Mod-Home",run:la,shift:ca},{key:"End",run:Bm,shift:Wm,preventDefault:!0},{key:"Mod-End",run:aa,shift:ha},{key:"Enter",run:ua,shift:ua},{key:"Mod-a",run:Xm},{key:"Backspace",run:Zr,shift:Zr,preventDefault:!0},{key:"Delete",run:qh,preventDefault:!0},{key:"Mod-Backspace",mac:"Alt-Backspace",run:Fh,preventDefault:!0},{key:"Mod-Delete",mac:"Alt-Delete",run:eg,preventDefault:!0},{mac:"Mod-Backspace",run:ng,preventDefault:!0},{mac:"Mod-Delete",run:ig,preventDefault:!0}].concat(mg.map(i=>({mac:i.key,run:i.run,shift:i.shift}))),bg=[{key:"Alt-ArrowLeft",mac:"Ctrl-ArrowLeft",run:Mm,shift:Fm},{key:"Alt-ArrowRight",mac:"Ctrl-ArrowRight",run:Em,shift:Hm},{key:"Alt-ArrowUp",run:og},{key:"Shift-Alt-ArrowUp",run:ag},{key:"Alt-ArrowDown",run:lg},{key:"Shift-Alt-ArrowDown",run:cg},{key:"Mod-Alt-ArrowUp",run:Jm},{key:"Mod-Alt-ArrowDown",run:Qm},{key:"Escape",run:Zm},{key:"Mod-Enter",run:dg},{key:"Alt-l",mac:"Ctrl-l",run:Gm},{key:"Mod-i",run:Ym,preventDefault:!0},{key:"Mod-[",run:Uh},{key:"Mod-]",run:$h},{key:"Mod-Alt-\\",run:fg},{key:"Shift-Mod-k",run:hg},{key:"Shift-Mod-\\",run:zm},{key:"Mod-/",run:om},{key:"Alt-A",run:am},{key:"Ctrl-m",mac:"Shift-Alt-m",run:pg}].concat(gg),yg={key:"Tab",run:$h,shift:Uh},jh="ffm-run-feedback-enabled",Fe={enabled:!0};function wg(){try{const i=localStorage.getItem(jh);i==="0"?Fe.enabled=!1:i==="1"&&(Fe.enabled=!0)}catch{}}function vg(){try{localStorage.setItem(jh,Fe.enabled?"1":"0")}catch{}}function xg(){return Fe.enabled=!Fe.enabled,vg(),Fe.enabled}function da(i){const e=Fe.enabled;i.setAttribute("aria-pressed",e?"true":"false"),i.setAttribute("aria-label",e?"Run sound and animations on":"Run sound and animations off"),i.classList.toggle("run-feedback-toggle--off",!e),i.title=e?"Turn off run sound and animations":"Turn on run sound and animations"}let fa=null;function kg(){return fa??(fa=new AudioContext),fa}const pa=[329.6275569128699,391.99543598174927,493.8833013781249],_g=10,Sg=420,Cg=3;let Qi=null,Zi=null,eo=!1;function to(){Qi!==null&&(clearInterval(Qi),Qi=null),Zi=null}function No(i){if(to(),!Fe.enabled||(eo=!0,window.matchMedia("(prefers-reduced-motion: reduce)").matches))return;Zi=i;const e=()=>{if(!Fe.enabled){to();return}Zi&&Eg(Zi,Cg)};e(),Qi=setInterval(e,Sg)}function Fo(){const i=eo;eo=!1,to(),i&&Kh()}function Kh(){if(Fe.enabled)try{const i=kg();i.resume().then(()=>{const e=i.currentTime,t=.42,n=.09;for(let s=0;s<pa.length;s++){const r=pa[s],o=i.createOscillator(),l=i.createGain();o.type="triangle",o.frequency.setValueAtTime(r,e),l.gain.setValueAtTime(0,e),l.gain.linearRampToValueAtTime(n,e+.018+s*.012),l.gain.exponentialRampToValueAtTime(8e-4,e+t),o.connect(l),l.connect(i.destination),o.start(e),o.stop(e+t+.06)}})}catch{}}function Xh(i){return!(i.isComposing||i.metaKey||i.ctrlKey||i.altKey||i.key==="Tab"||i.key==="Escape"||i.key==="ArrowUp"||i.key==="ArrowDown"||i.repeat)}function Ag(i,e){if(!Fe.enabled||i.disabled||!Xh(e))return;const{x:t,y:n}=Mg(i);Ho(t,n,{centerOnPoint:!0}),e.key==="Enter"&&Kh()}function Tg(i,e){if(!Fe.enabled||!Xh(e))return;const t=i.state.selection.main.head,n=i.coordsAtPos(t);if(!n)return;const s=n.left,r=(n.top+n.bottom)/2;Ho(s,r,{centerOnPoint:!0})}function Mg(i){const e=i.getBoundingClientRect(),t=window.getComputedStyle(i),n=parseFloat(t.borderLeftWidth)||0,s=parseFloat(t.paddingLeft)||0,r=i.selectionStart??0,o=document.createElement("span");o.setAttribute("aria-hidden","true"),o.style.visibility="hidden",o.style.position="absolute",o.style.whiteSpace="pre",o.style.top="0",o.style.left="0",o.style.font=t.font,o.style.fontSize=t.fontSize,o.style.fontFamily=t.fontFamily,o.style.fontWeight=t.fontWeight,o.style.letterSpacing=t.letterSpacing,o.style.fontVariant=t.fontVariant,o.style.textTransform=t.textTransform,o.textContent=i.value.slice(0,r),document.body.appendChild(o);const l=o.offsetWidth;o.remove();const a=e.left+n+s+l-i.scrollLeft,c=e.top+e.height/2;return{x:a,y:c}}function Ho(i,e,t){if(!Fe.enabled||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const n=document.createElement("span");n.className="run-flat-anchor",n.style.left=`${i}px`,n.style.top=`${e}px`,t!=null&&t.centerOnPoint&&(n.style.transform="translate(-50%, -50%)");const s=document.createElement("span");s.className="run-flat-particle",s.setAttribute("aria-hidden","true"),s.textContent="♭",t!=null&&t.animationDelay&&(s.style.animationDelay=t.animationDelay);const r=(Math.random()-.5)*2.25,o=-6+Math.random()*12,l=o+8+Math.random()*10;s.style.setProperty("--drift-x",`${r}rem`),s.style.setProperty("--rot-0",`${o}deg`),s.style.setProperty("--rot-1",`${l}deg`),n.appendChild(s),document.body.appendChild(n),s.addEventListener("animationend",()=>{n.remove()},{once:!0})}function Eg(i,e=_g){if(!Fe.enabled||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const t=i.getBoundingClientRect();if(!(t.width<=0||t.height<=0))for(let n=0;n<e;n++){const s=t.left+Math.random()*t.width,r=t.top+t.height*(.35+Math.random()*.35);Ho(s,r,{animationDelay:`${n*.045}s`})}}const Bg=new Set(["dup","drop","swap","choose","branch","ifte","eval","nop","putc","getc","putn","clock","clr","rand","exit","depth","q<","q>"]),Gh=Ss.define([{tag:H.comment,color:"#8a6f5f",fontStyle:"italic"},{tag:H.string,color:"#1d6e57"},{tag:H.number,color:"#b14f21"},{tag:H.keyword,color:"#7d2a10",fontWeight:"700"},{tag:H.definition(H.variableName),color:"#0d4f87",fontWeight:"700"},{tag:[H.operator,H.bracket],color:"#2a2d34"}]),Yh=z.theme({"&":{height:"100%",backgroundColor:"transparent"},"&.cm-focused":{outline:"none"},".cm-scroller":{overflow:"auto"},".cm-content":{padding:"1rem"},".cm-gutters":{backgroundColor:"transparent",color:"#7a6153",border:"none"},".cm-lineNumbers .cm-gutterElement":{padding:"0 0.55rem 0 0"},".cm-line":{padding:"0"},".cm-cursor, .cm-dropCursor":{borderLeftColor:"#201611"},".cm-selectionBackground, .cm-content ::selection":{backgroundColor:"rgba(187, 77, 29, 0.22)"}}),Dg=z.theme({".cm-content":{minHeight:"520px"}});z.theme({"&":{border:"1px solid rgba(32, 22, 17, 0.15)",borderRadius:"14px",backgroundColor:"var(--panel-strong)"},"&.cm-focused":{outline:"none"},".cm-scroller":{overflowX:"auto",overflowY:"hidden",fontFamily:'"Iosevka", "Cascadia Code", "SFMono-Regular", monospace',fontSize:"0.95rem",lineHeight:"1.55"},".cm-content":{minHeight:"44px",padding:"0.7rem 0.9rem",whiteSpace:"pre"},".cm-line":{padding:"0"},".cm-cursor, .cm-dropCursor":{borderLeftColor:"#201611"},".cm-selectionBackground, .cm-content ::selection":{backgroundColor:"rgba(187, 77, 29, 0.22)"}});const Pg=z.theme({".cm-content":{minHeight:"160px",padding:"1rem 1.2rem 1.2rem"},".cm-content:not(.cm-lineWrapping)":{whiteSpace:"pre"},".cm-scroller":{fontFamily:'"Iosevka", "Cascadia Code", "SFMono-Regular", monospace',fontSize:"0.92rem",lineHeight:"1.55"}}),Og={startState(){return{inBlockComment:!1,inString:!1,inStringEscape:!1}},copyState(i){return{inBlockComment:i.inBlockComment,inString:i.inString,inStringEscape:i.inStringEscape}},token(i,e){if(e.inBlockComment){for(;!i.eol();){if(i.match("*/")){e.inBlockComment=!1;break}i.next()}return"comment"}if(e.inString){for(;!i.eol();){const n=i.next();if(e.inStringEscape){e.inStringEscape=!1;continue}if(n==="\\"){e.inStringEscape=!0;continue}if(n==="'"){e.inString=!1;break}}return"string"}if(i.eatSpace())return null;if(i.match("/*"))return e.inBlockComment=!0,"comment";if(i.peek()==="'")return i.next(),e.inString=!0,e.inStringEscape=!1,"string";if(i.match(/^q[<>](?![a-zA-Z0-9_])/i)||i.match(/^\.[a-zA-Z_][a-zA-Z0-9_]*/))return"keyword";if(i.match(/^(?:0x[0-9a-fA-F_]+|0b[01_]+|0o[0-7_]+|[0-9][0-9_]*)(?![a-zA-Z0-9_])/))return"number";if(i.match(/^[a-zA-Z_][a-zA-Z0-9_]*:(?![a-zA-Z0-9_])/))return"def";if(i.match(/^[\[\]]/))return"bracket";if(i.match(/^(?:<<|>>|[+\-*/%=<>|&~?:;()])/))return"operator";const t=i.match(/^[a-zA-Z_][a-zA-Z0-9_]*/);return t?Bg.has(t[0].toLowerCase())?"keyword":null:(i.next(),null)}},Jh=Oo.define(Og),Lg=[mm(),Uc.of([yg,...bg,...Sm]),ep(),Jh,oh(Gh)],Wo=z.domEventHandlers({keydown(i,e){Tg(e,i)}});function Vo(i,e,t){const n=t==null?void 0:t.onDocumentChange,s=new z({state:te.create({doc:e,extensions:[...Lg,mp(),sp(),z.lineWrapping,Yh,Dg,...n?[z.updateListener.of(r=>{r.docChanged&&n()})]:[],...(t==null?void 0:t.extraExtensions)??[]]}),parent:i});return{getValue(){return s.state.doc.toString()},setValue(r){s.state.doc.toString()!==r&&s.dispatch({changes:{from:0,to:s.state.doc.length,insert:r}})},focus(){s.focus()}}}function ma(i,e){const t=new wi,n=new z({state:te.create({doc:e,extensions:[t.of([]),Jh,oh(Gh),te.readOnly.of(!0),z.editable.of(!1),Yh,Pg]}),parent:i});return{getValue(){return n.state.doc.toString()},setValue(s){n.state.doc.toString()!==s&&n.dispatch({changes:{from:0,to:n.state.doc.length,insert:s}})},focus(){n.focus()},setWrapped(s){n.dispatch({effects:t.reconfigure(s?z.lineWrapping:[])})}}}const Rg=`.import ../lib/prelude.ffp

/* Project Euler #1: sum multiples of 3 or 5 below 1000. */
/* http://projecteuler.net/index.php?section=problems&id=1 */

mod?: [ 3 divisor? ] [ 5 divisor? ] bi or ;

999 count [ mod? ] filter! sum! .

/* 233168 */
`,Ig=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=10 */

/* Walk primes with next-prime (prelude) until past 2_000_000. Slow but exact. */

_e10: dup 2_000_000 <= [
    dup rot + swap next-prime _e10
  ] ? ;

0 2 _e10 drop . /* 142913828922 */
`,zg=`.import ../lib/prelude.ffp

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


/* 5537376230 */`,qg=`.import ../lib/prelude.ffp

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
drop drop . /* 837799 */`,Ng=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=16 */

digits: dup [ 10 [ % ] [ / ] bi2 digits ] ? ;

2 1000 ^ digits sum! . /* 1366 */`,Fg=`!: dup 1 > [ dup 1 - ! * ] ? trim ;

trim: dup 10 % 0 = [ 10 / trim ] ? ;
five: 100_000 % ;

9 ! five . clr  /* 36288 */
10 ! five . clr  /* 36288 */
20 ! five . clr  /* 17664 */

1_000 ! trim five . clr /* 53472 */

/* Omitted: 1_000_000_000_000 ! … (expected [ 16576 ]) — factorial(10^12) is not practical here. */`,Hg=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=2 */

fib: dup2 + ;
fib-up: dup 4000000 < [ fib fib-up ] ? ;

1 2 fib-up drop
[ even? ] filter! sum! .

/* 4613732 */
`,Wg=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=20 */

digits: dup [ 10 [ % ] [ / ] bi2 digits ] ? ;

100 ! digits sum! . /* 648 */
`,Vg=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=25 */

next: swap dupd + ;

c: q< q< ++ q> q> ;

n:
.m 10 1000 ^
;

r: c dup n < [ next r ] ? ;

0 1 1 r drop drop ++ . /* 4782 */`,$g=`.import ../lib/prelude.ffp

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

600851475143 factors last! . /* 6857 */`,Ug=`.import ../lib/prelude.ffp

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
`,jg=`.import ../lib/prelude.ffp

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
`,Kg=`.import ../lib/prelude.ffp

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

/* 9110846700 */`,Xg=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=5 */

/* gcd and lcm come from prelude (math library). */

1 20 range [ lcm ] reduce! .

/* 232792560 */
`,Gg=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=5 */

sum-of-squares: [ sqr + ] 0 foldl! ;
square-of-sum: sum! sqr ;

100 count square-of-sum
( 100 count sum-of-squares ) - .

/* 25164150 */`,Yg=`.import ../lib/prelude.ffp

/* Project Euler #7: find the 10001st prime. */
/* http://projecteuler.net/index.php?section=problems&id=7 */

10001 th-prime . /* 104743 */
`,Jg=`.import ../lib/prelude.ffp

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
`,Qg=`.import ../lib/prelude.ffp

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
`,Zg=`/* constants 1 2 3 */
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
`,e0=`.import ./num.ffp

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
`,t0=`.import ./pred.ffp

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
`,n0=`.import ./arith.ffp
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
`,i0=`.import ./arith.ffp
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
`,s0=`.import ./arith.ffp

/*
 * Naming note: the \`i\` prefix means integer.
 * \`icbrt\` returns the integer cube root (truncated toward zero).
 */

__closer: dup2 2 ^ / over 2 * + 3 / ;
__loop: __closer dup2 > [ nip __loop ] ? ;
__cbrtn: dup 3 / __loop drop nip ;

icbrt: dup sgn swap over * dup 1 > [ __cbrtn ] ? * ;
`,r0=`
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
`,o0=`.import ../core/core.ff

__t: tuck % dup [ __t ] ? ;

gcd: dup [ __t ] ? drop ;
lcm: dup2 gcd / * ;
`,l0=`.import ../core/core.ff

__n: 20 ; /* number of digits to use for fixed-point calculations */
__s: 100000000000000000000 ; /* 10^n */
__ln2: 69314718055994530941 ; /* floor(ln(2)*10^n) */

ilb: dup 1 > [ 1 >> ilb ++ ] [ drop 0 ] branch ; /* n ilb == floor(log2(n)) */
ilog: dup 10 >= [ 10 / ilog ++ ] [ drop 0 ] branch ; /* n ilog == floor(log10(n)) */
iln: ilb __ln2 * __s / ; /* n iln == floor(ln(n)) */`,a0=`.import ./pred.ffp
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
`,c0=`.import ../core/core.ff

/* Logarithm and combinatorics */

!: dup [ dup -- ! * ] [ drop 1 ] branch ; /* n ! == n! */
nck: dup2 - ! swap ! * [ ! ] dip / ; /* n k nck == C(n,k) */

/* Knuth operators */

^^: -- dup [ [ dup ] swap times [ ^ ] ] dip times ;
^^^: -- dup [ [ dup ] swap times [ ^^ ] ] dip times ;
`,h0=`.import ./atan-core.ffp

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
; /* n half_pi == floor(10ⁿ*π/2) */`,u0=`.import ../core/core.ff
.import ./arith.ffp

/* Internal precision helpers shared by variable-precision math words. */
n->S: 10 swap ^ ; /* n n->S == 10^n */
n->S2: 2 * n->S ; /* n n->S2 == 10^(2n) */
n->K: 6 * 4 + 5 / 10 + ; /* n n->K == ceil(6*n/5)+10 */
p/q*S: n->S swap rot * swap / ; /* p q n p/q*S == floor(p*10^n/q) */

ntrunc: n->S / ; /* x n ntrunc == floor(x/10^n) */
nfrac: [ abs ] dip n->S % ; /* x n nfrac == (x - floor(x/10^n))*10^n */`,d0=`.import ../core/core.ff

/* Predicates */

negitive?: 0 < ; /* n negitive? == flag */
positive?: 0 > ; /* n positive? == flag */
divisor?: % zero? ; .inline /* n d divisor? == flag */
even?: 2 divisor? ; .inline /* n even? == flag */
odd?: even? not ; .inline /* n odd? == flag */
`,f0=`.import ./pred.ffp

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
`,p0=`.import ../core/core.ff
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
`,m0=`.import ../core/core.ff
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
`,g0=`/* Trigonometric words live here. Pi-derived constants are defined in pi.ffp. */
`,b0=`.import ./core/core.ff
.import ./math/math.ffp
.import ./string/string.ffp
.import ./seq/seq.ffp
.import ./time/time.ffp`,y0=`.import ../core/core.ff

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
`,w0=`.import ../core/core.ff

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
`,v0=`/* String output */

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
`,x0=`.import char.ffp
.import str.ffp`,k0=`.import ./core/core.ff
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
`,_0=`.import ./core/core.ff
.import ./string/string.ffp

assert: falsey? [ 0 10 'Failed' println .inline 1 exit ] ? ;
assert_eq: = assert .inline ;
assert_false: not assert .inline ;

OK: 0 '\\sOK' println clr ;

¶: clr 999 ;`,S0=`.import ./utc.ffp
`,C0=`.import ../core/core.ff
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
`,Qh=`.import ./lib/prelude.ffp

/* factorial */

fact: dup [ dup -- fact * ] [ drop 1 ] branch ;

100 fact .

/* 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000 */`,A0=`.import ./lib/math/cbrt.ffp

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
`,T0=`.import ./lib/math/sqrt.ffp

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
`,M0=`.import ./lib/math/gcd.ffp

/* Greatest common divisor and least common multiple demo. */

109876463 177777648  gcd . clr /* 1234567 */

109876463 177777648  lcm . clr /* 15822210672 */
`,E0=`.import ./lib/math/ack.ffp
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
`,B0=`.import ./lib/math/atan.ffp

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
`,D0=new Set(["../../ff/euler/euler4.ffp","../../ff/euler/euler10.ffp","../../ff/euler/euler14.ffp","../../ff/euler/euler46.ffp"]);function P0(i){const e="../../ff/lib/";if(!i.startsWith(e))throw new Error(`Unexpected library source path: ${i}`);return`/lib/${i.slice(e.length)}`}const O0=Object.assign({"../../ff/euler/euler1.ffp":Rg,"../../ff/euler/euler10.ffp":Ig,"../../ff/euler/euler13.ffp":zg,"../../ff/euler/euler14.ffp":qg,"../../ff/euler/euler16.ffp":Ng,"../../ff/euler/euler160.ffp":Fg,"../../ff/euler/euler2.ffp":Hg,"../../ff/euler/euler20.ffp":Wg,"../../ff/euler/euler25.ffp":Vg,"../../ff/euler/euler3.ffp":$g,"../../ff/euler/euler4.ffp":Ug,"../../ff/euler/euler46.ffp":jg,"../../ff/euler/euler48.ffp":Kg,"../../ff/euler/euler5.ffp":Xg,"../../ff/euler/euler6.ffp":Gg,"../../ff/euler/euler7.ffp":Yg,"../../ff/euler/euler8.ffp":Jg,"../../ff/euler/euler9.ffp":Qg});function ga(i){const e=i.split("/").pop()??i,t=/^euler(\d+)\.ffp$/.exec(e);return t?[Number(t[1]),e]:[Number.POSITIVE_INFINITY,e]}const L0=Object.entries(O0).filter(([i])=>!D0.has(i)).sort((i,e)=>{const t=ga(i[0]),n=ga(e[0]);return t[0]!==n[0]?t[0]-n[0]:t[1].localeCompare(n[1])}).map(([i,e])=>({path:R0(i),label:I0(i),source:e}));function R0(i){const e=i.lastIndexOf("/");return`/examples/${e>=0?i.slice(e+1):i}`}function I0(i){const e=i.indexOf("../../ff/");return e>=0?i.slice(e+9):i}const Zh=[{path:"/examples/fact.ffp",label:"fact.ffp",source:Qh},{path:"/examples/cbrt.ffp",label:"cbrt.ffp",source:A0},{path:"/examples/sqrt.ffp",label:"sqrt.ffp",source:T0},{path:"/examples/gcd.ffp",label:"gcd.ffp",source:M0},{path:"/examples/ack.ffp",label:"ack.ffp",source:E0},{path:"/examples/pi.ffp",label:"pi.ffp",source:B0},...L0],z0=Object.assign({"../../ff/lib/core/core.ff":Zg,"../../ff/lib/math/ack.ffp":e0,"../../ff/lib/math/arith.ffp":t0,"../../ff/lib/math/atan-core.ffp":n0,"../../ff/lib/math/atan.ffp":i0,"../../ff/lib/math/cbrt.ffp":s0,"../../ff/lib/math/exp.ffp":r0,"../../ff/lib/math/gcd.ffp":o0,"../../ff/lib/math/log.ffp":l0,"../../ff/lib/math/math.ffp":a0,"../../ff/lib/math/num.ffp":c0,"../../ff/lib/math/pi.ffp":h0,"../../ff/lib/math/precision.ffp":u0,"../../ff/lib/math/pred.ffp":d0,"../../ff/lib/math/primes.ffp":f0,"../../ff/lib/math/prn.ffp":p0,"../../ff/lib/math/sqrt.ffp":m0,"../../ff/lib/math/trig.ffp":g0,"../../ff/lib/prelude.ffp":b0,"../../ff/lib/seq/seq.ffp":y0,"../../ff/lib/string/char.ffp":w0,"../../ff/lib/string/str.ffp":v0,"../../ff/lib/string/string.ffp":x0,"../../ff/lib/tap.ffp":k0,"../../ff/lib/testing.ffp":_0,"../../ff/lib/time/time.ffp":S0,"../../ff/lib/time/utc.ffp":C0}),q0=Object.fromEntries(Object.entries(z0).map(([i,e])=>[P0(i),e])),es=Object.fromEntries(Zh.map(({path:i,source:e})=>[i,e])),Qn="__custom__",N0="/examples/fact.ffp",F0=[...Zh.map(({path:i,label:e})=>`<option value="${i}">${e}</option>`),`<option value="${Qn}">Custom</option>`].join(`
`),ba=Qh;function eu(i,e="/main.ffp"){return{[e]:i,...q0,...es}}const H0=["playground","repl","codetta","tutorial","help"],W0=new Set(H0);function rr(i){var t;const e=((t=i==null?void 0:i.replace(/^#/,"").split("?")[0])==null?void 0:t.trim().toLowerCase())??"";return e&&W0.has(e)?e:"playground"}function no(i){const e=new URLSearchParams(i.search.replace(/^\?/,"")),t=i.hash,n=t.indexOf("?");if(n!==-1){const r=new URLSearchParams(t.slice(n+1));for(const[o,l]of r)e.set(o,l)}const s=e.toString();return s?`?${s}`:""}const Hi="example";function V0(i){const e=new URLSearchParams(i.search);i.tab==="playground"?i.codeParam?(e.set("code",i.codeParam),e.delete(Hi)):i.exampleParam?(e.delete("code"),e.set(Hi,i.exampleParam)):(e.delete("code"),e.delete(Hi)):(e.delete("code"),e.delete(Hi));const t=e.toString();return`${i.pathname}#${i.tab}${t?`?${t}`:""}`}function ya(){return{output:"",preprocessed:"",ir:"",bytecode:"",compiledBytes:0,issues:[],stack:[],logs:[],exitCode:0,compileMs:0,executeMs:0,terminal:"cancelled",vmCyclesExecuted:0}}function $0(i){return{output:"",preprocessed:"",ir:"",bytecode:"",compiledBytes:0,issues:[],stack:[],logs:[i],exitCode:1,compileMs:0,executeMs:0,terminal:"error",vmCyclesExecuted:0}}class U0{constructor(){pt(this,"worker",null);pt(this,"nextRunId",1);pt(this,"pending",null);pt(this,"activeRunId",null)}ensureWorker(){this.worker||(this.worker=new Worker(new URL("/f-flat-minor/assets/ff-playground-worker-Ej_e126y.js",import.meta.url),{type:"module"}),this.worker.onmessage=e=>{this.handleMessage(e.data)})}handleMessage(e){var t,n,s,r,o,l,a,c;if(e.type==="COMPILED"){((t=this.pending)==null?void 0:t.runId)===e.runId&&(this.pending.compileMs=e.compileMs,(s=(n=this.pending).onProgress)==null||s.call(n,{vmCyclesExecuted:0,compileMs:e.compileMs,executeElapsedMs:0,preprocessed:e.preprocessed,ir:e.ir,bytecode:e.bytecode,compiledBytes:e.compiledBytes}));return}if(e.type==="PROGRESS"){if(((r=this.pending)==null?void 0:r.runId)===e.runId){const h=this.pending.compileMs;(l=(o=this.pending).onProgress)==null||l.call(o,{vmCyclesExecuted:e.vmCyclesExecuted,compileMs:h,executeElapsedMs:e.executeElapsedMs})}return}if(e.type==="ERROR"){if(((a=this.pending)==null?void 0:a.runId)!==e.runId)return;const h=this.pending;this.pending=null,this.activeRunId=null,h.resolve($0(e.message));return}if(e.type==="RESULT"){if(((c=this.pending)==null?void 0:c.runId)!==e.runId)return;const h=this.pending;this.pending=null,this.activeRunId=null,h.resolve(e.result)}}runProgram(e){this.ensureWorker();const t=this.nextRunId++;this.activeRunId=t;let n;const s=()=>{this.cancelSoft(t),n=window.setTimeout(()=>{var o,l;if(((o=this.pending)==null?void 0:o.runId)===t&&(this.cancelHard(),((l=this.pending)==null?void 0:l.runId)===t)){const a=this.pending;this.pending=null,this.activeRunId=null,a.resolve(ya())}},750)},r=e.signal;if(r){if(r.aborted)return Promise.resolve(ya());r.addEventListener("abort",s,{once:!0})}return new Promise(o=>{this.pending={runId:t,resolve:o,onProgress:e.onProgress},this.worker.postMessage({type:"RUN",runId:t,source:e.source,stdin:e.stdin,optimize:e.optimize,filename:e.filename,yieldIntervalMs:e.yieldIntervalMs,yieldSliceMax:e.yieldSliceMax})}).finally(()=>{r&&r.removeEventListener("abort",s),window.clearTimeout(n)})}cancelSoft(e){var n;const t=e??this.activeRunId;t!==null&&((n=this.worker)==null||n.postMessage({type:"CANCEL",runId:t}))}cancelHard(){this.worker&&(this.worker.terminate(),this.worker=null)}}function j0(){var e,t,n,s,r;return!!(((n=(t=(e=globalThis.Deno)==null?void 0:e.stdout)==null?void 0:t.isTerminal)==null?void 0:n.call(t))??((r=(s=globalThis.process)==null?void 0:s.stdout)==null?void 0:r.isTTY)??!1)}function $o(i,e){return j0()?`\x1B[${i}m${e}\x1B[0m`:e}function K0(i){return $o(34,i)}function X0(i){return $o(32,i)}function Rt(i){return $o(36,i)}const y={NOP:0,CALL:1,PUTC:2,GETC:3,PUTN:5,CLOCK:6,DROP:8,PUSHR:14,PULLR:15,SHIFTL:16,SHIFTR:17,CLR:24,RAND:26,EXIT:27,DUP:33,DEPTH:35,SWAP:36,MOD:37,AND:38,STASH:40,FETCH:41,MUL:42,ADD:43,CONS:44,SUB:45,PRN:46,DIV:47,MARK:58,DEF:59,LT:60,EQ:61,GT:62,IF:63,BRA:91,KET:93,POW:94,OR:124,NOT:126},Rn={nop:y.NOP,eval:y.CALL,";":y.DEF,":":y.MARK,clr:y.CLR,rand:y.RAND,exit:y.EXIT,".":y.PRN,putc:y.PUTC,getc:y.GETC,putn:y.PUTN,clock:y.CLOCK,drop:y.DROP,swap:y.SWAP,dup:y.DUP,"<<":y.SHIFTL,">>":y.SHIFTR,"+":y.ADD,"-":y.SUB,cons:y.CONS,"*":y.MUL,"/":y.DIV,"<":y.LT,"=":y.EQ,">":y.GT,"?":y.IF,"%":y.MOD,"&":y.AND,"(":y.STASH,")":y.FETCH,"q<":y.PUSHR,"q>":y.PULLR,depth:y.DEPTH,"^":y.POW,"[":y.BRA,"]":y.KET,"|":y.OR,"~":y.NOT},yn=255,G0=i=>i,Y0=i=>i,V={call:"call",push:"push"},J0=6,io=10,Q0=new Map([[BigInt(y.MARK),":"],[BigInt(y.DEF),";"],[BigInt(y.BRA),"["],[BigInt(y.KET),"]"]]);function Z0(i){return(""+i.value).padEnd(io," ")}function e1(i,e){var t;return e?e.padEnd(io," "):i.op===V.push&&((t=i.meta)!=null&&t.pointer)?`[${i.value}]`.padEnd(io," "):Z0(i)}function t1(i){return i.trim()?`/* ${i} */`:""}function n1(i){var l,a,c;const e=((l=s1(i))==null?void 0:l.toUpperCase())||"",t=i.op===V.call?Q0.get(i.value):void 0,n=t!==void 0,s=e1(i,t),r=((c=(a=i.meta)==null?void 0:a.comment)==null?void 0:c.trim())||(i.op===V.call&&!n?e:""),o=(i.op===V.call&&!t?"EVAL":"").padEnd(J0," ");return[Y0(s),G0(o),t1(r)].join(" ")}function i1(i){for(const e in Rn)if(Rn[e]===i)return e;return""}function s1(i){var e,t;if(i.op===V.call||i.op===V.push&&((e=i.meta)!=null&&e.pointer))return((t=i.meta)==null?void 0:t.name)||i1(Number(i.value))||""}function tu(i){return i.map(n1).join(`
`)}function r1(i){const e=[];let t=0;for(;t<i.length;){const n=i[t++]??0n,s=i[t++]??0n;n===0n?e.push({op:V.push,value:s}):e.push({op:V.call,value:s})}return e}function o1(i){return i=i.replace(/\\U([A-Fa-f0-9]{8})/g,(e,t)=>wa(t)),i=i.replace(/\\u([A-Fa-f0-9]{4})/g,(e,t)=>wa(t)),i.replace(/\\0/g,"\0").replace(/\\b/g,"\b").replace(/\\t/g,"	").replace(/\\n/g,`
`).replace(/\\v/g,"\v").replace(/\\f/g,"\f").replace(/\\r/g,"\r").replace(/\\'/g,"'").replace(/\\"/g,'"').replace(/\\s/g," ").replace(/\\\\/g,"\\")}function wa(i){let e="",t=parseInt(i,16);return t<=65535?e+=String.fromCharCode(t):t<=1114111?(t-=65536,e+=String.fromCharCode(55296|t>>10)+String.fromCharCode(56320|t&1023)):e+=`hex2Char error: Code point out of range: ${l1(t)}`,e}function l1(i){return(i+0).toString(16).toUpperCase()}const nu="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",iu=new Map;nu.split("").forEach(function(i,e){iu.set(i,e)});const a1=5n,su=1n<<a1,ru=Number(su),ou=su-1n;function c1(i){return i.map(f1).map(p1).join("")}function h1(i){return g1(m1(i)).map(b1)}function u1(i){return i>=0n?i<<1n:(-i<<1n)+1n}function d1(i){return i&1n?-(i>>1n):i>>1n}function f1(i){if(i===0n)return[0];i=u1(i);const e=[];for(;i>0;){let t=Number(i&ou);i>>=5n,i>0&&(t|=ru),e.push(t)}return e}function p1(i){return i.map(e=>nu[e]).join("")}function m1(i){return i.split("").map(e=>{const t=iu.get(e);if(t===void 0)throw new Error(`${i} is not a valid base64 encoded VLQ`);return t})}function g1(i){const e=[];let t=[];if(i.forEach(n=>{t.push(n),(n&ru)===0&&(e.push(t),t=[])}),t.length>0)throw new Error("Malformed VLQ sequence: The last VLQ never ended.");return e}function b1(i){const e=i.reverse().reduce((t,n)=>(t<<=5n,t|=BigInt(n)&ou,t),0n);return d1(e)}const y1="/*",w1="*/";function or(i){if(!(i==="-"||i==="+"))try{let e=1n;return i=i.replaceAll("_",""),i.startsWith("-0")&&(e=-1n,i=i.replace("-","")),i.includes("e")||i.includes("E")?e*BigInt(+i):e*BigInt(i)}catch{return}}class Ke{constructor(e={}){this.symbols=new Map,this._nextCode=-1,this.host=e;let t;for(t in Rn)this.symbols.set(t,BigInt(Rn[t]))}static tokenize(e){return e.split(/\s+/).filter(Boolean).map(t=>{const n=or(t);return n!==void 0?n:t})}static tokenizeWithSpans(e){const t=[],n=/\S+/g;let s=0,r=0,o=0;const l=c=>{for(;o<c;){const h=e[o];h==="\r"?(e[o+1]===`
`&&o++,s++,r=0):h===`
`?(s++,r=0):r++,o++}};let a;for(;(a=n.exec(e))!==null;){const c=a.index;l(c);const h=a[0]??"",u=or(h);t.push({raw:h,value:u!==void 0?u:h,line:s,character:r,length:h.length,offset:c}),l(c+h.length)}return t}static compileToBase64(e){const t=e.flatMap(n=>{if(n.op===V.call&&n.value===0n)return[];const s=n.value<<1n;return[n.op===V.push?s:s|1n]});return c1(t)}nextCode(){return BigInt(this._nextCode--)}getSymbol(e){e=e.toLowerCase();let t=this.symbols.get(e);return t===void 0&&(t=this.nextCode(),this.symbols.set(e,t)),t}compileToIR(e,t=""){var h,u,d;let n=0;const s=e.length;let r="";const o=[];let l;for(;n<s;)if(l=e[n++],r=this.unwrapTokenValue(l),typeof r=="bigint")a(r);else if(r.length>1&&r.startsWith(".")){const[f]=r.split(" ");switch(f){case".push":o[o.length-1].op=V.push;break;case".call":o[o.length-1].op=V.call;break;case".inline":(h=o[o.length-1]).meta||(h.meta={}),o[o.length-1].meta.inline=!0;break;case".unsafe":(u=o[o.length-1]).meta||(u.meta={}),o[o.length-1].meta.unsafe=!0;break;case".pointer":(d=o[o.length-1]).meta||(d.meta={}),o[o.length-1].meta.pointer=!0;break;case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Compiler: .exit requires a host exit handler");case".symbols":this.symbols.forEach((p,m)=>{(this.host.log||console.log)(m,p)});break;case".words":{const p=Array.from(this.symbols,([m])=>m).join(" ");(this.host.log||console.log)(p);break}}}else if(r[0]==="'"&&r.length>1)o1(r).replace(/^'/,"").replace(/'$/,"").split("").forEach(f=>{a(f.charCodeAt(0),{comment:f})});else if(r.endsWith(":")&&r.length>1){const f=r.replace(/:$/,"");a(this.getSymbol(f),{name:`${f}`,pointer:!0}),c(y.MARK,{name:":"})}else if(r===y1){const f=l,p=[];for(;n<e.length&&(l=e[n++],r=this.unwrapTokenValue(l),r!==w1);)p.push(r);c(0n,{comment:p.join(" ")},f)}else if(r.startsWith("[")&&r.endsWith("]")){const f=r.replace(/^\[/,"").replace(/\]$/,""),p=or(f);p!==void 0?a(p,{name:f,pointer:!0}):a(this.getSymbol(f),{name:f,pointer:!0})}else c(this.getSymbol(r),{name:r});return o;function a(f,p={},m=l){o.push({value:BigInt(f),op:V.push,meta:{...p,...Ke.toInstructionMeta(m,t)}})}function c(f,p={},m=l){o.push({value:BigInt(f),op:V.call,meta:{...p,...Ke.toInstructionMeta(m,t)}})}}unwrapTokenValue(e){return typeof e=="string"||typeof e=="bigint"?e:e.value}static toInstructionMeta(e,t){return!e||typeof e=="string"||typeof e=="bigint"?{filename:t}:{filename:t,line:e.line,character:e.character,length:e.length,offset:e.offset}}validate(e){var r,o;const t=e.slice(),n=[];let s=0;for(;s<t.length;){const l=t[s];if(l.op===V.call&&l.value===BigInt(y.DEF)){let a=0;for(a=s;a>0&&!(t[a].op===V.call&&t[a].value===BigInt(y.MARK));a--);const c=t.splice(a-1,s-a+2);(o=(r=c.at(-1))==null?void 0:r.meta)!=null&&o.unsafe||n.push(...this.validateDef(c)),s=a-1}s++}return n.push(...this.validateDef(t,"main")),n}validateDef(e,t){var h,u,d;const n=[];let s=0,r=0,o=0,l=0;const a=[0];if(!e[0])return[];t=X0(t||((u=(h=e[0].meta)==null?void 0:h.name)==null?void 0:u.replace(/^&/,""))||"main");const c=K0(((d=e[0].meta)==null?void 0:d.filename)||"-");for(;s<e.length;){const f=e[s];if(f.op===V.call){if(f.op===V.call&&f.value===BigInt(y.MARK)&&r++,f.op===V.call&&f.value===BigInt(y.DEF)&&r--,f.op===V.call&&f.value===BigInt(y.BRA)&&(o++,a.push(0)),f.op===V.call&&f.value===BigInt(y.KET)&&(o--,(a.length>1?a.pop():0)!==0&&n.push(`${c}: Unbalanced queue push ( ${Rt("q< q>")} ) in quote in ${t}`)),f.op===V.call&&(f.value===BigInt(y.PUSHR)||f.value===BigInt(y.STASH))&&(l++,a[a.length-1]++),f.op===V.call&&(f.value===BigInt(y.PULLR)||f.value===BigInt(y.FETCH))){if(a[a.length-1]===0){const m=f.value===BigInt(y.FETCH)?")":"q>";n.push(`${c}: Queue borrow ( ${Rt(m)} ) requires ${Rt(".unsafe")} in ${t} (including quotes)`)}l--,a[a.length-1]--}o<0&&n.push(`${c}: Bracket ( ${Rt("[ ]")} ) mismatch in ${t}`),r<0&&n.push(`${c}: Definition ( ${Rt(": ;")} ) mismatch in ${t}`)}s++}return o!==0&&n.push(`${c}: Unbalanced brackets ( ${Rt("[ ]")} ) in ${t}`),l!==0&&n.push(`${c}: Unbalanced queue push ( ${Rt("q< q> ( )")} ) in ${t}`),r!==0&&n.push(`${c}: Unbalanced definition ( ${Rt(": ;")} ) in ${t}`),n}}const lu="FbAbbCb",v1=[{mnemonic:"NOP",syntax:"nop",stackEffect:"… nop == …",description:"No operation; does nothing.",opcode:0},{mnemonic:"EVAL",syntax:"eval",stackEffect:"[A] eval == a*",description:"Evaluates a quotation, executing its contents.",opcode:1},{mnemonic:"PUTC",syntax:"putc",stackEffect:"n putc == {prints char(n)}",description:"Prints a character given by its numeric code.",opcode:2},{mnemonic:"GETC",syntax:"getc",stackEffect:"getc == n {reads char}",description:"Reads a single character from input and pushes its code.",opcode:3},{mnemonic:"PUTN",syntax:"putn",stackEffect:"n putn == {prints n}",description:"Prints a number to output.",opcode:5},{mnemonic:"CLOCK",syntax:"clock",stackEffect:"clock == n {reads clock}",description:"Returns the current time as a Unix timestamp.",opcode:6},{mnemonic:"DROP",syntax:"drop",stackEffect:"a drop ==",description:"Removes the top value from the stack.",opcode:8},{mnemonic:"PUSHR",syntax:"q<",stackEffect:"a q< == | …a",description:"Pushes a value onto the return stack.",opcode:14},{mnemonic:"PULLR",syntax:"q>",stackEffect:"q> == a | a…",description:"Pops a value from the return stack onto the main stack.",opcode:15},{mnemonic:"SHIFTL",syntax:"<<",stackEffect:"a b << == n",description:"Left-shifts a by b bits.",opcode:16},{mnemonic:"SHIFTR",syntax:">>",stackEffect:"a b >> == n",description:"Right-shifts a by b bits.",opcode:17},{mnemonic:"CLR",syntax:"clr",stackEffect:"… clr ==",description:"Clears the entire stack.",opcode:24},{mnemonic:"RAND",syntax:"rand",stackEffect:"n rand == r {0 <= r < n}",description:"Generates a random number between 0 and n-1.",opcode:26},{mnemonic:"EXIT",syntax:"exit",stackEffect:"n exit == {exits with code n}",description:"Exits the program with the given exit code.",opcode:27},{mnemonic:"DUP",syntax:"dup",stackEffect:"a dup == a a",description:"Duplicates the top value on the stack.",opcode:33},{mnemonic:"DEPTH",syntax:"depth",stackEffect:"… depth == … n",description:"Pushes the current stack depth.",opcode:35},{mnemonic:"SWAP",syntax:"swap",stackEffect:"a b swap == b a",description:"Swaps the top two values on the stack.",opcode:36},{mnemonic:"MOD",syntax:"%",stackEffect:"a b % == n",description:"Computes the remainder of a divided by b.",opcode:37},{mnemonic:"AND",syntax:"&",stackEffect:"a b & == n",description:"Bitwise AND of a and b.",opcode:38},{mnemonic:"STASH",syntax:"(",stackEffect:"… ( == {moves stack to queue}",description:"Moves values from the stack to the queue.",opcode:40},{mnemonic:"FETCH",syntax:")",stackEffect:") == … {restores stack from queue}",description:"Moves values from the queue back to the stack.",opcode:41},{mnemonic:"MUL",syntax:"*",stackEffect:"a b * == n",description:"Multiplies a by b.",opcode:42},{mnemonic:"ADD",syntax:"+",stackEffect:"a b + == n",description:"Adds a and b together.",opcode:43},{mnemonic:"SUB",syntax:"-",stackEffect:"a b - == n",description:"Subtracts b from a.",opcode:45},{mnemonic:"DUMP",syntax:".",stackEffect:"… . == … {prints stack}",description:"Prints the entire stack to output.",opcode:46},{mnemonic:"DIV",syntax:"/",stackEffect:"a b / == n",description:"Divides a by b (integer division).",opcode:47},{mnemonic:"MARK",syntax:":",stackEffect:"n : == {begin definition(n)}",description:"Begins a new word definition with name n.",opcode:58},{mnemonic:"DEF",syntax:";",stackEffect:"; == {end definition}",description:"Ends the current word definition.",opcode:59},{mnemonic:"LT",syntax:"<",stackEffect:"a b < == flag",description:"Pushes true if a is less than b.",opcode:60},{mnemonic:"EQ",syntax:"=",stackEffect:"a b = == flag",description:"Pushes true if a equals b.",opcode:61},{mnemonic:"GT",syntax:">",stackEffect:"a b > == flag",description:"Pushes true if a is greater than b.",opcode:62},{mnemonic:"WHEN",syntax:"?",stackEffect:"flag [A] ? == a*",description:"Executes the quotation if flag is true.",opcode:63},{mnemonic:"BRA",syntax:"[",stackEffect:"[ == {begin quotation}",description:"Begins a quotation (anonymous code block).",opcode:91},{mnemonic:"KET",syntax:"]",stackEffect:"] == [A] {end quotation}",description:"Ends a quotation and pushes it to the stack.",opcode:93},{mnemonic:"POW",syntax:"^",stackEffect:"a b ^ == n",description:"Computes a raised to the power of b.",opcode:94},{mnemonic:"OR",syntax:"|",stackEffect:"a b | == n",description:"Bitwise OR of a and b.",opcode:124},{mnemonic:"NOT",syntax:"~",stackEffect:"a ~ == n'",description:"Bitwise NOT of a.",opcode:126}],x1={words:v1},au=new Map;for(const i of x1.words)au.set(i.opcode,i);function k1(i){return au.get(i)}const _1=[BigInt(y.DEF),BigInt(y.KET),BigInt(y.MARK),BigInt(y.BRA)],fn=0n,pn=1n;class gi{constructor(e){this.stack=[],this.queue=[],this.defs=new Map,this.symbols=new Map,this.depth=0,this.nextAnonOp=yn+1,this.traceOn=!1,this.traceFormat="human",this.traceVerbose=!1,this.traceQueueMax=8,this.traceStackMax=32,this.base=10,this.statsOn=!1,this.profileOn=!1,this.stats={system_instructions_called:0,user_instructions_called:0,max_stack_depth:0,max_queue_depth:0},this.profile={},this.platform=e,this.setup()}static fromBase64(e){return h1(e).flatMap(t=>{const n=t&1n,s=t>>1n;return[n,s]})}getStack(){return this.stack.slice()}peek(){const e=this.stack.length;if(e>0)return this.stack[e-1];throw new Error("Peek: stack underflow")}pop(){if(this.stack.length>0)return this.stack.pop();throw new Error("Pop: stack underflow")}push(e){this.stack.push(e)}poke(e){const t=this.stack.length;if(t>0){this.stack[t-1]=e;return}throw new Error("Poke: stack underflow")}clear(){this.stack.splice(0,this.stack.length)}queuePush(e,t){this.queue.push(e,t)}queueUnshift(e,t){this.queue.unshift(e,t)}queueShift(){return[this.queue.shift()??0n,this.queue.shift()??0n]}queuePop(){const e=this.queue.pop()??0n;return[this.queue.pop()??0n,e]}defineSystem(e,t){const n=BigInt(t),s=this.getName(n);if(this.defs.has(n))throw new Error(`Define: cannot redefine system word "${s}"`);this.defs.set(n,e)}defineUser(e,t){const n=this.getName(t);if(t>-1&&t<yn)throw new Error(`Define: cannot define system op "${n}"`);if(this.defs.has(t))throw t>yn?new Error(`Define: cannot redefine anon op "${n}"`):new Error(`Define: cannot redefine user op "${n}"`);this.defs.set(t,e)}callSystem(e){var s;const t=this.defs.get(e);if(typeof t=="function"){if(this.statsOn&&this.stats.system_instructions_called++,this.profileOn){const r=performance.now();t();const o=performance.now(),l=this.getName(e)||Number(e);(s=this.profile)[l]||(s[l]=[0,0]),this.profile[l][0]++,this.profile[l][1]!=0,this.profile[l][1]+=o-r;return}return t()}const n=this.getName(e)||e;throw new Error(`Call: undefined system op "${n}"`)}callUser(e){var s;const t=this.defs.get(e);if(Array.isArray(t)){if(this.statsOn&&this.stats.user_instructions_called++,this.queue.unshift(...t),this.profileOn){const r=this.getName(e,`&${e}`);(s=this.profile)[r]||(s[r]=[0,void 0]),this.profile[r][0]++}return}const n=this.getName(e)||e;throw new Error(`Call: undefined user op "${n}"`)}callOp(e){return e>-1n&&e<yn?this.callSystem(e):this.callUser(e)}loadBigIntCode(e){this.queue.push(...e)}loadIR(e){var n,s;let t=0;for(;t<e.length;){const r=e[t++];if(r.op===V.call){if(r.value===0n)continue;(n=r.meta)!=null&&n.name&&!this.symbols.has(r.value)&&this.symbols.set(r.value,(s=r.meta)==null?void 0:s.name),this.queuePush(pn,r.value)}else this.queuePush(fn,r.value)}return this.stack}runChunk(e,t){const n=this.queue;let s=!1,r=t,o=0;for(;n.length>0&&o<e;){const[l,a]=this.queueShift(),c=l===pn,h=this.stack.slice();s=!this.depth||c&&_1.includes(a),c?s?this.callOp(a):(this.push(l),this.push(a)):(s||this.push(l),this.push(a)),this.statsOn&&(this.stats.max_stack_depth=Math.max(this.stats.max_stack_depth,this.stack.length),this.stats.max_queue_depth=Math.max(this.stats.max_queue_depth,n.length/2));const u=r++;this.traceOn&&this.trace({step:u,immediate:s,tag:l,value:a,stackBefore:h,stackAfter:this.traceVerbose||this.traceFormat==="jsonl"?this.stack.slice():void 0}),o++}return r}run(){return this.runChunk(Number.POSITIVE_INFINITY,0),this.stack}async runAsync(e={}){var c;const t=e.yieldIntervalMs??160,n=e.yieldSliceMax??e.yieldEvery??655360;if(!Number.isFinite(t)||t<0)throw new Error(`runAsync: yieldIntervalMs must be a non-negative finite number (received ${t})`);if(!Number.isFinite(n)||n<1)throw new Error(`runAsync: yieldSliceMax / yieldEvery must be a positive finite number (received ${n})`);const s=e.scheduler??(()=>new Promise(h=>{globalThis.setTimeout(h,0)})),r=typeof globalThis.performance<"u"&&typeof globalThis.performance.now=="function"?()=>globalThis.performance.now():()=>globalThis.Date.now();let o=0,l=0,a=!1;for(;this.queue.length>0&&!a;){const h=r(),u=t>0?h+t:h;for(;this.queue.length>0&&!a&&!(t>0&&r()>=u);){const d=o;if(o=this.runChunk(n,o),l+=o-d,(c=e.onChunk)==null||c.call(e,{vmCyclesExecuted:l}),e.shouldContinue&&!e.shouldContinue()){a=!0;break}if(t===0)break}this.queue.length>0&&!a&&await s()}return{stack:this.stack.slice(),cancelled:a,vmCyclesExecuted:l}}trace({step:e,immediate:t,tag:n,value:s,stackBefore:r,stackAfter:o}){const l=this.createTraceEvent(e,t,n,s,r,o);if(this.traceFormat==="jsonl"){this.writeTraceLine(JSON.stringify(l));return}this.writeTraceLine(this.formatHumanTrace(l))}createTraceEvent(e,t,n,s,r,o){const l=n===pn,a=l?this.getName(s,String(s)):String(s),c=this.getQueuePreview();return{step:e,immediate:t,tag:l?"call":"literal",value:String(s),action:a,stack_before:this.limitStack(r).map(String),stack_after:o?this.limitStack(o).map(String):void 0,queue_preview:c,queue_depth:this.queue.length/2}}limitStack(e){return e.length>this.traceStackMax?e.slice(-this.traceStackMax):e}getQueuePreview(){const e=[],t=Math.max(this.traceQueueMax,0);for(let n=0;n<this.queue.length&&e.length<t;n+=2){const s=this.queue[n]??0n,r=this.queue[n+1]??0n,o=s===pn;e.push({tag:o?"call":"literal",value:String(r),action:o?this.getName(r,String(r)):String(r)})}return e}formatHumanTrace(e){const t=this.padHumanAction(e.action),n=this.formatHumanStack(e.stack_before),s=this.formatHumanQueue(e.queue_preview,e.queue_depth),r=this.layoutHumanTraceLine(e.step,n,t,s);if(this.traceVerbose){const o=this.formatHumanStack(e.stack_after??[]);return`${r}
${" ".repeat(String(e.step).length+1)}${o} | immediate=${e.immediate} tag=${e.tag} value=${e.value} stack_depth=${this.stack.length} queue_depth=${e.queue_depth}`}return r}padHumanAction(e){return e.length>=7?e:e.padStart(Math.floor((7+e.length)/2)," ").padEnd(7," ")}layoutHumanTraceLine(e,t,n,s){const r=this.getTraceTerminalWidth(),o=`${e} `;if(o.length>=r)return o.slice(0,r);const l=1,a=Math.min(n.length,Math.max(r-o.length-l*2,1)),c=Math.max(o.length+l,Math.floor((r-a)/2)),h=Math.min(c,Math.max(o.length+l,r-a-l)),u=h+a,d=o.length,f=Math.max(d,h-l),p=Math.min(r,u+l),m=r,g=Math.max(f-d,0),b=Math.max(m-p,0),x=Array.from({length:r},()=>" ");if(this.writeSegment(x,0,o,o.length),this.writeSegment(x,h,n,a),g>0){const S=this.truncateLeft(t,g);this.writeSegment(x,f-S.length,S,S.length)}if(b>0){const S=this.truncateRight(s,b);this.writeSegment(x,p,S,S.length)}return x.join("").replace(/\s+$/,"")}formatHumanStack(e){return e.length===0?"[ ]":`[ ${e.join(" ")} ]`}formatHumanQueue(e,t){const n=e.map(r=>r.tag==="call"?`&${r.action}`:r.value),s=Math.max(t-e.length,0);return s>0&&n.push(`…(+${s})`),n.length===0?"[ ]":`[ ${n.join(" ")} ]`}getTraceTerminalWidth(){var o,l,a,c,h,u,d;const t=globalThis.Deno,n=(l=(o=t==null?void 0:t.stderr)==null?void 0:o.isTerminal)!=null&&l.call(o)&&typeof t.stderr.rid=="number"?t.stderr.rid:(c=(a=t==null?void 0:t.stdout)==null?void 0:a.isTerminal)!=null&&c.call(a)&&typeof t.stdout.rid=="number"?t.stdout.rid:void 0;if(typeof n=="number")try{const f=(h=t==null?void 0:t.consoleSize)==null?void 0:h.call(t,n).columns;if(typeof f=="number"&&f>0)return f}catch{}const s=globalThis.process,r=(u=s==null?void 0:s.stderr)!=null&&u.isTTY&&typeof s.stderr.columns=="number"?s.stderr.columns:(d=s==null?void 0:s.stdout)!=null&&d.isTTY&&typeof s.stdout.columns=="number"?s.stdout.columns:void 0;return typeof r=="number"&&r>0?r:120}truncateLeft(e,t){return t<=0?"":e.length<=t?e:t===1?"…":`…${e.slice(-(t-1))}`}truncateRight(e,t){return t<=0?"":e.length<=t?e:t===1?"…":`${e.slice(0,t-1)}…`}writeSegment(e,t,n,s){if(!(s<=0))for(let r=0;r<s&&r<n.length&&t+r<e.length;r++)e[t+r]=n[r]}writeTraceLine(e){const t=new TextEncoder().encode(`${e}
`);if(this.platform.io.writeError){this.platform.io.writeError(t);return}this.platform.io.write(t)}getName(e,t=String(e)){return this.symbols.has(e)?this.symbols.get(e):String(t)}inspectValue(e){const t=this.symbols.get(e),n=e>=0n&&e<=BigInt(yn),s=this.defs.get(e),r=s!==void 0;let o;Array.isArray(s)&&(o=this.parseDefinitionTokens(s));let l,a;if(n){const c=k1(Number(e));c&&(l=c.stackEffect,a=c.description)}return{value:e,name:t,isSystem:n,isDefined:r,definition:o,stackEffect:l,description:a}}parseDefinitionTokens(e){const t=[];for(let n=0;n<e.length;n+=2){const s=e[n]??0n,r=e[n+1]??0n,o=s===pn,l=o?this.symbols.get(r):void 0,a=this.defs.has(r);t.push({value:r,tag:s,name:l,isCall:o,isDefined:a})}return t}print(){const e=this.stack.map(t=>t.toString(this.base)).join(" ");this.platform.io.write(new TextEncoder().encode(`[ ${e} ]
`))}loadSourceMap(e){Object.keys(e.symbols).forEach(t=>{this.symbols.set(BigInt(t),e.symbols[t])})}getNextAnonOp(){let e=this.nextAnonOp++;for(;this.defs.has(BigInt(e));)e=this.nextAnonOp++;return BigInt(e)}setup(){const e=new TextEncoder;let t;for(t in Rn)this.symbols.set(BigInt(Rn[t]),t);this.defineSystem(()=>{},y.NOP),this.defineSystem(()=>{const n=this.pop();this.callOp(n)},y.CALL),this.defineSystem(()=>{this.depth--;const[,n]=this.queuePop(),s=this.stack.splice(Number(n||0))||[];this.defineUser(s,this.pop())},y.DEF),this.defineSystem(()=>{this.depth--;const[,n]=this.queuePop(),s=this.stack.splice(Number(n||0))||[],r=this.getNextAnonOp();this.defineUser(s,r),this.depth>0&&this.push(0n),this.push(r)},y.KET),this.defineSystem(()=>{this.depth++;const n=this.stack.length;this.queuePush(fn,BigInt(n))},y.BRA),this.defineSystem(()=>{this.depth++;const n=this.stack.length;this.queuePush(fn,BigInt(n))},y.MARK),this.defineSystem(()=>this.clear(),y.CLR),this.defineSystem(()=>{const n=this.pop();this.platform.exit(Number(n))},y.EXIT),this.defineSystem(()=>{const n=this.pop();this.push(S1(n))},y.RAND),this.defineSystem(()=>{this.print()},y.PRN),this.defineSystem(()=>{this.push(BigInt(this.platform.now()))},y.CLOCK),this.defineSystem(()=>{const n=e.encode(String.fromCharCode(Number(this.pop())));this.platform.io.write(n)},y.PUTC),this.defineSystem(()=>{this.platform.io.setRaw&&this.platform.io.setRaw(!0);const n=this.platform.io.readByte();this.platform.io.setRaw&&this.platform.io.setRaw(!1),this.push(BigInt(n??0))},y.GETC),this.defineSystem(()=>{const n=e.encode(this.pop().toString(this.base));this.platform.io.write(n)},y.PUTN),this.defineSystem(()=>{this.pop()},y.DROP),this.defineSystem(()=>{const n=this.peek(),s=this.stack[this.stack.length-2];this.stack[this.stack.length-2]=n,this.poke(s)},y.SWAP),this.defineSystem(()=>{this.push(this.peek())},y.DUP),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]+=n},y.ADD),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]-=n},y.SUB),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]*=n},y.MUL),this.defineSystem(()=>{const n=this.pop();if(n===0n)throw new Error("DIV: Division by zero");this.stack[this.stack.length-1]/=n},y.DIV),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]%=n},y.MOD),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]<<=n},y.SHIFTL),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]>>=n},y.SHIFTR),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]&=n},y.AND),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]**=n},y.POW),this.defineSystem(()=>{this.push(this.pop()>this.pop()?1n:0n)},y.LT),this.defineSystem(()=>{this.push(this.pop()===this.pop()?1n:0n)},y.EQ),this.defineSystem(()=>{this.push(this.pop()<this.pop()?1n:0n)},y.GT),this.defineSystem(()=>{const n=this.pop();this.pop()!==0n&&this.queueUnshift(pn,n)},y.IF),this.defineSystem(()=>{this.queuePush(fn,this.pop())},y.PUSHR),this.defineSystem(()=>{const[,n]=this.queuePop();this.push(n)},y.PULLR),this.defineSystem(()=>{this.push(BigInt(this.stack.length))},y.DEPTH),this.defineSystem(()=>{const n=this.stack.length;this.stack.splice(0,n).forEach(r=>this.queuePush(fn,r)),this.queuePush(fn,BigInt(n))},y.STASH),this.defineSystem(()=>{const[,n]=this.queuePop(),s=Number(n),r=[];for(let o=0;o<s;o++){const[,l]=this.queuePop();r.unshift(l)}this.stack.unshift(...r)},y.FETCH),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]|=n},y.OR),this.defineSystem(()=>{const n=this.pop();this.push(~n)},y.NOT),this.defineSystem(()=>{const n=this.pop(),r=[0n,this.pop(),1n,n],o=this.getNextAnonOp();this.defineUser(r,o),this.depth>0&&this.push(0n),this.push(o)},y.CONS)}printProfile(){console.log(),console.log("Profile:");const e=Object.keys(this.profile).map(s=>{const r=this.profile[s][0],o=this.profile[s][1];return{name:s,calls:r,time:o,system:typeof o<"u","ops/ms":o?Math.round(r/o):""}}).sort((s,r)=>r.calls-s.calls),t=e.filter(s=>s.system),n=e.filter(s=>!s.system);console.table(t,["name","calls","ops/ms"]),console.table(n,["name","calls"]),console.log()}printStats(){console.log(),console.log("Interpreter stats:"),console.log(this.stats),console.log()}}function S1(i){const e=i,t=e.toString().length;let n="";for(;n.length<t;)n+=Math.random().toString().split(".")[1];n=n.slice(0,t);const s="1"+"0".repeat(t);return e*BigInt(n)/BigInt(s)}const Wi=BigInt(y.DEF),va=BigInt(y.KET),Vi=BigInt(y.MARK),xa=BigInt(y.BRA),X=i=>(i=BigInt(i),e=>e.op===V.call&&e.value===i),mn=i=>(i=BigInt(i),e=>e.op===V.push&&e.value===i),ze=i=>i.op===V.push,ka=i=>i.op===V.push&&i.value!==0n,C1=[{name:"No operation",pattern:[X(y.NOP)],replacement:()=>[]},{name:"Null Sequence - SWAP SWAP",pattern:[X(y.SWAP),X(y.SWAP)],replacement:()=>[]},{name:"Null Sequence - DUP DROP",pattern:[X(y.DUP),X(y.DROP)],replacement:()=>[]},{name:"Null Sequence - PUSHR PULLR",pattern:[X(y.PUSHR),X(y.PULLR)],replacement:()=>[]},{name:"Null Sequence - CLOCK DROP",pattern:[X(y.CLOCK),X(y.DROP)],replacement:()=>[]},{name:"Null Sequence - RAND DROP",pattern:[X(y.RAND),X(y.DROP)],replacement:()=>[]},{name:"Null Sequence - DEPTH DROP",pattern:[X(y.DEPTH),X(y.DROP)],replacement:()=>[]},{name:"Null Sequence - NOT NOT",pattern:[X(y.NOT),X(y.NOT)],replacement:()=>[]},{name:"Indirect calls - n EVAL",pattern:[ze,X(y.CALL)],replacement:i=>{var e,t;return[{op:V.call,value:i.value,meta:{name:(t=(e=i.meta)==null?void 0:e.name)==null?void 0:t.replace(/^&/,"")}}]}},{name:"Null Sequence - n DROP",pattern:[ze,X(y.DROP)],replacement:()=>[]},{name:"Constant Folding - a b ADD",pattern:[ze,ze,X(y.ADD)],replacement:(i,e)=>[{op:V.push,value:i.value+e.value}]},{name:"Algebraic Simplification - 0 ADD",pattern:[mn(0),X(y.ADD)],replacement:()=>[]},{name:"Algebraic Simplification - swap ADD",pattern:[X(y.SWAP),X(y.ADD)],replacement:(i,e)=>[e]},{name:"Constant Folding - a b SUB",pattern:[ze,ze,X(y.SUB)],replacement:(i,e)=>[{op:V.push,value:i.value-e.value}]},{name:"Algebraic Simplification - 0 SUB",pattern:[mn(0),X(y.SUB)],replacement:()=>[]},{name:"Constant Folding - a b MUL",pattern:[ze,ze,X(y.MUL)],replacement:(i,e)=>[{op:V.push,value:i.value*e.value}]},{name:"Algebraic Simplification - 1 MUL",pattern:[mn(1),X(y.MUL)],replacement:()=>[]},{name:"Algebraic Simplification - swap MUL",pattern:[X(y.SWAP),X(y.MUL)],replacement:(i,e)=>[e]},{name:"Constant Folding - a b DIV",pattern:[ze,ka,X(y.DIV)],replacement:(i,e)=>[{op:V.push,value:i.value/e.value}]},{name:"Algebraic Simplification - 1 DIV",pattern:[mn(1),X(y.DIV)],replacement:()=>[]},{name:"Constant propagation - a DUP",pattern:[ze,X(y.DUP)],replacement:i=>[i,i]},{name:"Unreachable Code - 0 &b IF",pattern:[mn(0),ze,X(y.IF)],replacement:()=>[]},{name:"Flows-Of-Control Optimizations - !0 &b IF",pattern:[ka,ze,X(y.IF)],replacement:(i,e,t)=>{var n,s;return[{op:V.call,value:e.value,meta:{name:(s=(n=e.meta)==null?void 0:n.name)==null?void 0:s.replace(/^&/,"")}}]}},{name:"Null Sequence - 0 eval",pattern:[mn(0),X(y.CALL)],replacement:()=>[]},{name:"Empty List - [ ]",pattern:[X(y.BRA),X(y.KET)],replacement:()=>[{op:V.push,value:0n,meta:{pointer:!0,name:"0"}}]},{name:"a q< b a> - b a",pattern:[ze,X(y.PUSHR),ze,X(y.PULLR)],replacement:(i,e,t)=>[t,i]}];class A1{constructor(){this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0},this.minOptPasses=2,this.maxOptPasses=20,this.defs=new Map,this.calledWords=new Set,this.optimized=[],this.nextAnonOp=yn+1}optimize(e){this.reset(),this.stats.pre_optimization_ir_size=e.length,this.optimized=e;let t;do t=this.optimized.length,this.optLoop();while((this.optimized.length<t||this.stats.optimization_passes<this.minOptPasses)&&this.stats.optimization_passes<this.maxOptPasses);return this.optimized=this.pullDefs(this.optimized),this.optimized=this.addReferencedWords(this.optimized),this.stats.post_optimization_ir_size=this.optimized.length,this.optimized}optLoop(){this.optimized=this.peepholeOptimization(this.optimized),this.optimized=this.getDefs(this.optimized),this.optimized=this.inlineWords(this.optimized,4),this.stats.optimization_passes++}reset(){this.optimized=[],this.defs=new Map,this.calledWords=new Set,this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0}}getDefs(e){var n;let t=0;for(;t<e.length;){const s=e[t];if(s.op===V.call){if(s.value===va){this.stats.optimization_passes===0&&this.stats.user_defined_anon_defs++,s.meta??(s.meta={}),(n=s.meta).uid??(n.uid=this.nextAnonOp++);let r=t;for(;r-- >0;){const c=e[r];if(c.op===V.call&&c.value===xa)break}const o=BigInt(s.meta.uid),l={op:V.push,value:o,meta:{pointer:!0}},a=e.slice(r,t+1);a.unshift(l),a[1]={...a[1],value:Vi,meta:{...a[1].meta,name:":"}},a[a.length-1]={...a[a.length-1],value:Wi,meta:{...a[a.length-1].meta,name:";"}},this.defs.set(o,a)}else if(s.value===Wi){this.stats.optimization_passes===0&&this.stats.user_defined_named_defs++;let r=t;for(;r-- >0;){const a=e[r];if(a.op===V.call&&a.value===Vi)break}const o=e[r-1];o.meta||(o.meta={}),o.meta.pointer=!0;const l=e.slice(r-1,t+1);this.defs.set(o.value,l)}}t++}return e}pullDefs(e,t=!1){var r;const n=e.slice();let s=0;for(;s<n.length;){const o=n[s];if(o.op===V.call){if(o.value===va){o.meta??(o.meta={}),(r=o.meta).uid??(r.uid=this.nextAnonOp++);const l=s;for(;s-- >0;){const u=n[s];if(u.op===V.call&&u.value===xa)break}const a=BigInt(o.meta.uid),c={op:V.push,value:a,meta:{pointer:!0}},h=n.splice(s,l-s+1,c);h.unshift(c),h[1]={...h[1],value:Vi,meta:{...h[1].meta,name:":"}},h[h.length-1]={...h[h.length-1],value:Wi,meta:{...h[h.length-1].meta,name:";"}},this.defs.set(a,h)}else if(o.value===Wi&&!t){const l=s;for(;s-- >0;){const h=n[s];if(h.op===V.call&&h.value===Vi)break}const a=n[s-1];a.meta||(a.meta={}),a.meta.pointer=!0;const c=n.splice(s-1,l-s+2);s=s-2,this.defs.set(c[0].value,c)}}s++}return n}peepholeOptimization(e){const t=e.slice();for(;;){const n=this.stats.peephole_optimizations;let s=0;for(;s<t.length;){for(const r of C1){const{pattern:o,replacement:l}=r;if(s+o.length>t.length)continue;if(o.every((c,h)=>c(t[s+h]))){this.stats.peephole_optimizations++;const c=t.slice(s,s+o.length);t.splice(s,o.length,...l(...c)),s=Math.max(0,s-o.length-1);break}}s++}if(this.stats.peephole_optimizations===n)break}return t}inlineWords(e,t=1,n=[]){return e.flatMap(s=>{var r,o,l,a;if((r=s.meta)!=null&&r.unsafe)return s;if(s.op===V.call&&this.defs.has(s.value)){if(n.includes(s.value))return s;const c=this.defs.get(s.value);if(!c)return s;const h=c[c.length-1];if((o=h.meta)!=null&&o.unsafe)return s;if((l=h.meta)!=null&&l.inline||(a=s.meta)!=null&&a.inline)return this.stats.inlined_calls++,this.inlineWords(c.slice(2,-1),1/0,n.concat(s.value));if(c.length<=t+3)return this.stats.inlined_calls++,this.inlineWords(c.slice(2,-1),t,n.concat(s.value))}return s})}addReferencedWords(e){return e.slice().forEach(t=>{var n;t.op===V.push&&((n=t.meta)!=null&&n.pointer)?this.addDef(t.value):t.op===V.call&&this.addDef(t.value)}),e}addDef(e){if(!this.calledWords.has(e)){const t=this.defs.get(e);if(t)return this.stats.post_optimization_user_defs++,this.calledWords.add(e),this.optimized.unshift(...t),this.addReferencedWords(t)}}}class Vt{constructor(e,t,n){this.imported=new Set,this.importPrefixes=new Map,this.macroPreludeReady=!1,this.rootFilename=null,this.host=e,this.engine=t.engine,this.compiler=t.compiler||new Ke,n!=null&&n.macroEngineBootstrapFile&&this.bootstrapMacroEngine(n.macroEngineBootstrapFile)}static tokenize(e){return e.split(/[\r\n]+/)}preprocess(e,t="-"){const n=this.rootFilename===null;n&&t!=="-"&&(this.rootFilename=t);try{return this.preprocessLines(e,t)}finally{n&&(this.rootFilename=null)}}preprocessLines(e,t,n){return e.map(s=>{if(s.length>1&&s[0]==="."){const[r,...o]=s.split(" ");if(r[0]==="."&&r.length>1){switch(r){case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Preprocessor: .exit requires a host exit handler");case".load":{const l=this.findFile(o.join(" "),t),a=this.host.readTextFile(l);return this.preprocessLines(Vt.tokenize(a),l)}case".import":{const l=this.findFile(o.join(" "),t);if(!this.imported.has(l)){this.imported.add(l);const a=this.host.readTextFile(l);return this.preprocessLines(Vt.tokenize(a),l,l)}return""}case".m":return this.runMacro(o.join(" "),s);case".ff":return this.runMacro(o.join(" "),s);case".ffp":{if(!this.macroPreludeReady)throw new Error("Preprocessor: .ffp requires prelude-enabled macro context");return this.runMacro(o.join(" "),s)}}return""}}return n?this.mangleImportedLine(s,n):s}).join(`
`)}findFile(e,t="-"){if(t&&t!=="-"&&!this.host.path.isAbsolute(e)){const n=this.host.path.dirname(t),s=this.host.path.resolve(n,e);if(this.host.fileExists(s))return s}if(this.host.fileExists(e))return e;throw'File not found: "'+e+'"'}bootstrapMacroEngine(e){const t=this.findFile(e),n=this.host.readTextFile(t),r=new Vt(this.host,{engine:this.engine,compiler:this.compiler}).preprocess(Vt.tokenize(n),t),o=this.compiler.compileToIR(Ke.tokenize(r),t);this.engine.loadIR(o),this.engine.run(),this.engine.clear(),this.macroPreludeReady=!0}runMacro(e,t){const n=this.compiler.compileToIR(Ke.tokenize(e));this.engine.loadIR(n),this.engine.run();const s=this.engine.getStack();return this.engine.clear(),s.map(String).join(" ")+` /* ${t} */`}mangleImportedLine(e,t){const n=this.getImportPrefix(t);return e.split(/(\s+)/).map(s=>!s||/\s+/.test(s)?s:this.mangleImportedToken(s,n)).join("")}mangleImportedToken(e,t){return e.startsWith("[__")?`[${t}${e.slice(3)}`:e.startsWith("__")?`${t}${e.slice(2)}`:e}getImportPrefix(e){const t=this.importPrefixes.get(e);if(t)return t;const s=this.getNormalizedImportPath(e).replace(/[^A-Za-z0-9]+/g,"_").replace(/^_+|_+$/g,"").replace(/_+/g,"_")||"module",r=this.hashPath(e),o=`__${s}_${r}__`;return this.importPrefixes.set(e,o),o}getNormalizedImportPath(e){if(this.rootFilename&&this.rootFilename!=="-"){const t=this.host.path.dirname(this.rootFilename),n=this.host.path.relative(t,e);if(n)return n.replace(/\\/g,"/")}return e.replace(/\\/g,"/")}hashPath(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619)>>>0;return t.toString(36)}}function In(i){const e=i.startsWith("/"),t=i.split("/").filter(Boolean),n=[];for(const s of t)if(s!=="."){if(s===".."){n.pop();continue}n.push(s)}return`${e?"/":""}${n.join("/")}`||(e?"/":".")}function T1(i){const e=In(i),t=e.lastIndexOf("/");return t<=0?e.startsWith("/")?"/":".":e.slice(0,t)}function M1(...i){const e=i.filter(Boolean).join("/").replaceAll(/\/+/g,"/");return In(e)}function E1(i,e){const t=In(i).split("/").filter(Boolean),n=In(e).split("/").filter(Boolean);let s=0;for(;s<t.length&&s<n.length&&t[s]===n[s];)s++;const r=t.length-s,o=n.slice(s);return Array(r).fill("..").concat(o).join("/")||"."}function cu(i){return{readTextFile(e){const t=In(e),n=i[t];if(typeof n!="string")throw new Error(`Virtual file not found: ${t}`);return n},fileExists(e){return typeof i[In(e)]=="string"},path:{isAbsolute(e){return e.startsWith("/")},dirname:T1,relative:E1,resolve:M1}}}function hu(i={}){const e=new TextDecoder,t=new TextEncoder,n=Array.from(t.encode(i.stdin??""));return{io:{write(s){var r;(r=i.onWrite)==null||r.call(i,e.decode(s))},readByte(){return n.shift()??null}},exit(s){var r;(r=i.onExit)==null||r.call(i,s)},now(){return Date.now()}}}const B1="/lib/prelude.ffp",D1="/main.ffp";function Uo(i){return lu.length+i.length}function uu(i){return i?`${lu}${i}`:""}function _a(i,e){const t=console.log;console.log=(...n)=>{i(n.map(String).join(" "))};try{return e()}finally{console.log=t}}async function P1(i,e){const t=console.log;console.log=(...n)=>{i(n.map(String).join(" "))};try{return await e()}finally{console.log=t}}function O1(i,e,t={}){let n="";const s=[];let r=0;const o=t.filename??D1,l=hu({stdin:e,onWrite(p){n+=p},onExit(p){r=p}}),a=new Ke,c=new gi(l),h=new Ke,u=new gi(l),d=eu(i,o),f=new Vt(cu(d),{engine:u,compiler:h},{macroEngineBootstrapFile:B1});return{compiler:a,engine:c,preprocessor:f,filename:o,logs:s,getOutput(){return n},getExitCode(){return r}}}function L1(i,e,t,n={}){const s=O1(i,e,n),r=performance.now(),o=_a(a=>s.logs.push(a),()=>{const a=s.preprocessor.preprocess(Vt.tokenize(i),s.filename);let c=s.compiler.compileToIR(Ke.tokenize(a),s.filename);const h=s.compiler.validate(c);t&&(c=new A1().optimize(c));const u=tu(c),d=Ke.compileToBase64(c),f=Uo(d);return s.engine.loadIR(c),{preprocessed:a,formattedIr:u,bytecode:d,compiledBytes:f,issues:h}}),l=performance.now();return{preprocessed:o.preprocessed,ir:o.formattedIr,bytecode:o.bytecode,compiledBytes:o.compiledBytes,issues:o.issues,compileMs:l-r,execute(){const a=performance.now();_a(h=>s.logs.push(h),()=>{s.engine.run()});const c=performance.now();return{output:s.getOutput(),stack:s.engine.getStack().map(String),logs:[...s.logs],exitCode:s.getExitCode(),executeMs:c-a,cancelled:!1,vmCyclesExecuted:0}},async executeAsync(a={}){const c=performance.now(),h=await P1(d=>s.logs.push(d),async()=>await s.engine.runAsync(a)),u=performance.now();return{output:s.getOutput(),stack:s.engine.getStack().map(String),logs:[...s.logs],exitCode:s.getExitCode(),executeMs:u-c,cancelled:h.cancelled,vmCyclesExecuted:h.vmCyclesExecuted}}}}let lr=null;function R1(){return lr||(lr=new U0),lr}function I1(){if(typeof Worker>"u"||typeof window>"u")return!1;try{if(new URLSearchParams(no(window.location).replace(/^\?/,"")).get("worker")==="0")return!1}catch{}return!0}function Sa(i){return{output:"",preprocessed:"",ir:"",bytecode:"",compiledBytes:0,issues:[],stack:[],logs:[],exitCode:1,compileMs:0,executeMs:0,terminal:"error",vmCyclesExecuted:0}}async function jo(i,e,t,n={}){var o;const s=n.yieldIntervalMs??160,r=n.yieldSliceMax??n.yieldEvery??655360;if(I1())try{return await R1().runProgram({source:i,stdin:e,optimize:t,filename:n.filename,yieldIntervalMs:s,yieldSliceMax:r,signal:n.signal,onProgress:n.onProgress})}catch(l){const a=l instanceof Error?l.message:String(l);return{...Sa(),logs:[a]}}try{const l=L1(i,e,t,{filename:n.filename}),a=l.compileMs;(o=n.onProgress)==null||o.call(n,{vmCyclesExecuted:0,compileMs:a,executeElapsedMs:0,compiledBytes:l.compiledBytes});const c=performance.now(),h=await l.executeAsync({yieldIntervalMs:s,yieldSliceMax:r,shouldContinue:()=>{var d;return!((d=n.signal)!=null&&d.aborted)},onChunk:({vmCyclesExecuted:d})=>{var f;(f=n.onProgress)==null||f.call(n,{vmCyclesExecuted:d,compileMs:a,executeElapsedMs:performance.now()-c})},scheduler:()=>new Promise(d=>{globalThis.setTimeout(d,0)})}),u=h.cancelled?"cancelled":"done";return{output:h.output,preprocessed:l.preprocessed,ir:l.ir,bytecode:l.bytecode,compiledBytes:l.compiledBytes,issues:l.issues,stack:h.stack,logs:h.logs,exitCode:h.exitCode,compileMs:l.compileMs,executeMs:h.executeMs,terminal:u,vmCyclesExecuted:h.vmCyclesExecuted}}catch(l){const a=l instanceof Error?l.message:String(l);return{...Sa(),logs:[a]}}}const Ca="/lib/prelude.ffp";function z1(i,e){const t=console.log;console.log=(...n)=>{i(n.map(String).join(" "))};try{return e()}finally{console.log=t}}class q1{constructor(){pt(this,"compiler");pt(this,"engine");pt(this,"preprocessor");pt(this,"files");pt(this,"output","");this.reset()}reset(){this.output="",this.files=eu("","/repl.ffp");const e=hu({onWrite:s=>{this.output+=s}});this.compiler=new Ke,this.engine=new gi(e);const t=new Ke,n=new gi(e);this.preprocessor=new Vt(cu(this.files),{engine:n,compiler:t},{macroEngineBootstrapFile:Ca}),this.execute(`.import ${Ca}`)}inspectValue(e){const t=BigInt(e);return this.engine.inspectValue(t)}createStackItems(){return this.engine.getStack().map((e,t)=>({value:String(e),index:t}))}execute(e){const t=e.trim(),n=[];return t?t===".reset"?(this.reset(),{output:"Session reset. Prelude reloaded.",clearTranscript:!0,logs:n,stack:this.createStackItems()}):t===".clear"?{output:"Transcript cleared.",clearTranscript:!0,logs:n,stack:this.createStackItems()}:t===".exit"||t===".quit"?{output:"Browser REPL sessions stay open. Use .reset to clear state.",logs:n,stack:this.createStackItems()}:(this.files["/repl.ffp"]=e,this.output="",z1(s=>n.push(s),()=>{try{const s=this.preprocessor.preprocess([e],"/repl.ffp"),r=this.compiler.compileToIR(Ke.tokenize(s),"/repl.ffp");return this.engine.loadIR(r),this.engine.run(),{output:this.output,logs:n,stack:this.createStackItems()}}catch(s){return{output:this.output,logs:n,stack:this.createStackItems(),error:s instanceof Error?s.message:String(s)}}})):{output:"",logs:n,stack:this.createStackItems()}}}const N1=`<main class="shell">
  <div class="shell-hero-row">
    <section class="hero">
      <p class="eyebrow">f-flat-minor / web</p>
      <h1>Run F♭m in the browser.</h1>
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

  <nav class="mode-tabs" aria-label="Application modes">
    <button class="mode-tab mode-tab--playground is-active" data-tab="playground">Playground</button>
    <button class="mode-tab mode-tab--repl" data-tab="repl">REPL</button>
    <button class="mode-tab mode-tab--codetta" data-tab="codetta">Codetta</button>
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
`,F1=`<div class="help-grid">
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
      <pre class="code-block help-code">0 'Hello\\\\sWorld!\\\\n' prints

fact: dup 1 - [ dup 1 - fact * ] ? ;
20 fact putn 10 putc

[ dup * ] 12 swap eval putn</pre>
    </div>
  </section>
</div>
`;function zn(i){if(!Number.isFinite(i)||i<0)return String(i);const e=Math.floor(i);if(e<1e5)return e.toLocaleString();if(e<1e6){const n=e/1e3;return n>=999.5?Aa(e,1e6,"m"):`${n.toFixed(2)}k`}if(e<1e9){const n=e/1e6;return n>=999.5?Aa(e,1e9,"b"):`${n.toFixed(2)}m`}return`${(e/1e9).toFixed(2)}b`}function Aa(i,e,t){return`${(i/e).toFixed(2)}${t}`}const du=[{id:"square",order:1,title:"Square",goal:"Define `square` and print the square of one number.",concepts:["definitions","dup","*","putn","cr"],source:String.raw`.load /lib/prelude.ffp

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
`,expected:"1 5 10 10 5 1",note:"`nck` does the math for each entry; the recursion only controls left-to-right order."}];function wt(i){return i.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function It(i,e){const t=i.querySelector(e);if(!t)throw new Error(`Missing required element: ${e}`);return t}function Ta(i){return i.split(/(`[^`]+`)/g).map(e=>e.startsWith("`")&&e.endsWith("`")?`<code>${wt(e.slice(1,-1))}</code>`:wt(e)).join("")}function Ma(){return new Promise(i=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>i())})})}function Un(i){return i.map(e=>{const t=e.tone&&e.tone!=="default"?` ${e.tone}`:"",n=e.showDot?'<span class="tutorial-summary-dot" aria-hidden="true"></span>':"";return`
      <span class="tutorial-summary-item">
        <span class="tutorial-summary-label">${wt(e.label)}</span>
        <span class="tutorial-summary-value${t}">${n}${wt(e.value)}</span>
      </span>
    `}).join('<span class="tutorial-summary-separator" aria-hidden="true">|</span>')}function H1(i){const e=i.expected?`
      <div class="tutorial-guidance-block">
        <p class="tutorial-guidance-label">Expected result</p>
        <pre class="tutorial-guidance-value">${wt(i.expected)}</pre>
      </div>
    `:"",t=i.note?`
      <div class="tutorial-guidance-block">
        <p class="tutorial-guidance-label">Note</p>
        <p class="tutorial-note">${Ta(i.note)}</p>
      </div>
    `:"",n=typeof i.stdin=="string"?`
      <label class="field tutorial-stdin-field">
        <span>stdin</span>
        <input data-role="stdin" type="text" value="${wt(i.stdin)}" />
      </label>
    `:"";return`
    <article class="panel tutorial-card" data-problem-id="${wt(i.id)}">
      <div class="tutorial-card-body">
        <div class="tutorial-card-header">
          <div>
            <p class="panel-label">Problem ${i.order}</p>
            <h2>${wt(i.title)}</h2>
          </div>
          <p class="tutorial-goal">${Ta(i.goal)}</p>
        </div>

        <div class="tutorial-concepts" aria-label="Concepts">
          ${i.concepts.map(s=>`<span class="tutorial-concept">${wt(s)}</span>`).join("")}
        </div>

        <div class="tutorial-workbench">
          <div class="tutorial-editor-pane">
            <div class="tutorial-editor-shell">
              <div class="tutorial-editor" data-role="editor" aria-label="${wt(i.title)} source editor"></div>
            </div>

            <div class="tutorial-controls">
              ${n}
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
  `}function W1(){return`
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
        ${[...du].sort((e,t)=>e.order-t.order).map(e=>H1(e)).join("")}
      </section>
    </section>
  `}function V1(i){const e=[];return i.output&&e.push(i.output.trimEnd()),i.logs.length&&e.push(i.logs.join(`
`)),e.filter(Boolean).join(`
`)||"(no output)"}function $1(i){i.innerHTML=W1(),[...du].sort((t,n)=>t.order-n.order).forEach(t=>{const n=It(i,`[data-problem-id="${t.id}"]`),s=It(n,"[data-role='editor']"),r=It(n,"[data-role='run']"),o=It(n,"[data-role='reset']"),l=It(n,"[data-role='summary']"),a=It(n,"[data-role='output']"),c=It(n,"[data-role='diagnostics']"),h=It(n,"[data-role='error']"),u=n.querySelector("[data-role='stdin']"),d=Vo(s,t.source,{extraExtensions:[Wo]});function f(){d.setValue(t.source),u&&typeof t.stdin=="string"&&(u.value=t.stdin),l.textContent="Ready to run.",a.textContent="Run the snippet to see output.",c.textContent="",c.hidden=!0,h.textContent="",h.hidden=!0}let p=null;r.addEventListener("click",async()=>{if(p!==null){p.abort();return}No(r),r.textContent="Cancel",r.setAttribute("aria-label","Cancel run"),r.classList.add("is-cancel"),o.disabled=!0,u&&(u.disabled=!0),l.innerHTML=Un([{label:"compile",value:"Running...",tone:"running",showDot:!0},{label:"execute",value:"pending",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),h.textContent="",h.hidden=!0;const m=new AbortController;p=m;try{await Ma(),l.innerHTML=Un([{label:"compile",value:"Running...",tone:"running",showDot:!0},{label:"execute",value:"pending",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),await Ma();const g=await jo(d.getValue(),(u==null?void 0:u.value)??"",!0,{signal:m.signal,onProgress:({vmCyclesExecuted:S,compileMs:R})=>{l.innerHTML=Un([{label:"compile",value:R!==void 0?`${R.toFixed(2)} ms`:"…",tone:"running"},{label:"execute",value:`${zn(S)} vm steps`,tone:"running",showDot:!0},{label:"exit",value:"pending",tone:"pending"}])}}),b=g.terminal==="cancelled"?"cancelled":g.terminal==="error"?"error":String(g.exitCode),x=g.terminal==="cancelled"?"pending":g.terminal==="error"?"error":g.exitCode===0?"success":"error";l.innerHTML=Un([{label:"compile",value:`${g.compileMs.toFixed(2)} ms`},{label:"execute",value:`${g.executeMs.toFixed(2)} ms`},{label:"exit",value:b,tone:x},{label:"issues",value:g.issues.length===1?"1 compiler issue":`${g.issues.length} compiler issues`,tone:g.issues.length?"error":"default"},...g.vmCyclesExecuted!==void 0?[{label:"vm steps",value:zn(g.vmCyclesExecuted),tone:"default"}]:[]]),a.textContent=V1(g),g.terminal==="error"?(c.textContent="",c.hidden=!0,h.textContent=g.logs.join(`
`)||"Run failed.",h.hidden=!1):g.issues.length?(c.textContent=`Compiler issues:
${g.issues.join(`
`)}`,c.hidden=!1,h.textContent="",h.hidden=!0):(c.textContent="",c.hidden=!0,h.textContent="",h.hidden=!0)}catch(g){const b=g instanceof Error?g.message:String(g);l.innerHTML=Un([{label:"compile",value:"failed",tone:"error"},{label:"execute",value:"pending",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),a.textContent="",c.textContent="",c.hidden=!0,h.textContent=b,h.hidden=!1}finally{p=null,Fo(),u&&(u.disabled=!1),r.textContent="Run",r.setAttribute("aria-label","Run"),r.classList.remove("is-cancel"),o.disabled=!1}}),o.addEventListener("click",()=>{f()}),u&&typeof t.stdin!="string"&&(u.value="")})}const U1=`---
etude: 99bottles
title: "99 Bottles of Beer"
leader: hypercubed
bytes: 543
date: 2026-04-07
---

Print the full "99 Bottles of Beer" lyrics.

This etude follows the code.golf [99 Bottles of Beer](https://code.golf/99-bottles-of-beer) hole.
`,j1=`---
etude: catalans-constant
title: "Catalan's Constant"
leader: hypercubed
bytes: 147
date: 2026-04-07
---

Print Catalan's constant to the first 1,000 decimal places after the point.

This etude follows the code.golf [Catalan's Constant](https://code.golf/catalans-constant) hole.
`,K1=`---
etude: collatz
title: "Collatz"
leader: hypercubed
bytes: 215
date: 2026-04-07
---

Print the Collatz stopping times for the numbers 1 through 1,000, one per line.

This etude follows the code.golf [Collatz](https://code.golf/collatz) hole.
`,X1=`---
etude: e-digits
title: "Digits of e"
leader: hypercubed
bytes: 1086
date: 2026-04-07
---

Print e to the first 1,000 decimal places after the point.

This etude follows the code.golf [𝑒](https://code.golf/%f0%9d%91%92) hole.
`,G1=`---
etude: fib
title: "Fibonacci"
leader: hypercubed
bytes: 74
date: 2026-04-07
---

Print the 31st Fibonacci number.

The solution defines \`fib\` with the stack effect \`n fib -> F_n\`. This etude follows the code.golf [Fibonacci](https://code.golf/fibonacci) hole.
`,Y1=`---
etude: fizzbuzz
title: "FizzBuzz"
leader: hypercubed
bytes: 245
date: 2026-04-07
---

Print the numbers 1 through 100 using FizzBuzz substitutions.

The current best solution uses the unrolled approach popularized in the Rosetta Code [FizzBuzz article](https://rosettacode.org/wiki/FizzBuzz#the_unrolled_approach). This etude follows the code.golf [FizzBuzz](https://code.golf/fizz-buzz) hole.
`,J1=`---
etude: leap-years
title: "Leap Years"
leader: hypercubed
bytes: 224
date: 2026-04-07
---

Print all leap years from 1800 to 2400 inclusive.

This etude follows the code.golf [Leap Years](https://code.golf/leap-years) hole.
`,Q1=`---
etude: ln-2
title: "ln 2"
leader: hypercubed
bytes: 22
date: 2026-04-07
---

Print ln(2) to the first 1,000 decimal places after the point.

This etude follows the code.golf [ln 2](https://code.golf/ln-2) hole.
`,Z1=`---
etude: pascals-triangle
title: "Pascal's Triangle"
leader: hypercubed
bytes: 263
date: 2026-04-07
---

Print the first 20 rows of Pascal's triangle.

This etude follows the code.golf [Pascal's Triangle](https://code.golf/pascals-triangle) hole.
`,e2=`---
etude: pi-digits
title: "Digits of pi"
leader: hypercubed
bytes: 929
date: 2026-04-07
---

Print pi to the first 1,000 decimal places after the point.

Including the leading \`3.\`, the output is 1,002 characters total. This etude follows the code.golf [π](https://code.golf/%cf%80) hole.
`,t2=`---
etude: roman-to-arabic
title: "Roman to Arabic"
leader: hypercubed
bytes: 877
date: 2026-04-07
---

Convert Roman numerals to Arabic values.

The original code.golf hole is argument-driven, so this Codetta version freezes a representative sample set of Roman numerals and expected conversions. It follows the code.golf [Roman to Arabic](https://code.golf/roman-to-arabic) hole.
`,n2=`---
etude: tower-of-hanoi
title: "Tower of Hanoi"
leader: hypercubed
bytes: 198
date: 2026-04-07
---

Print the steps needed to solve the Tower of Hanoi with 9 disks.

Each line identifies the source pole and destination pole for one move. This etude follows the code.golf [Tower of Hanoi](https://code.golf/tower-of-hanoi) hole.
`,i2=`.import ../../lib/prelude.ffp

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
`,s2=`.import ../../lib/prelude.ffp

/* Near-solution seed retained from ff/catalan.ffp. */
/* Catalan number: n cat -> C_n */

cat: dup dup 2 * swap nck swap 1 + / ;

100 cat .
`,r2=`.import ../../lib/prelude.ffp

next: dup even? [ 2 / ] [ 3 * 1 + ] branch ;
steps: dup 1 > [ next steps ++ ] [ drop 0 ] branch ;
line: dup steps putn cr ++ ;

1 [ line ] 1000 times drop
`,o2=`.import ../../lib/prelude.ffp

N: 1000 ;
E: N 1 nexp ;
E N nputn
cr
`,l2=`.import ../../lib/prelude.ffp

fib:
  dup 0 = not
  [ dup 1 = not
    [ -- dup fib swap -- fib + ] ?
  ] ? ;

31 fib putn
`,a2=`.import ../../lib/prelude.ffp

n: dup putn cr ++ ;
f: 0 'Fizz' println ++ ;
b: 0 'Buzz' println ++ ;
fb: 0 'FizzBuzz' println ++ ;
fb10: n n f n b f n n f b ;
fb15: fb10 n f n n fb ;
fb100: fb15 fb15 fb15 fb15 fb15 fb15 fb10 ;

1 fb100 drop
`,c2=`.import ../../lib/prelude.ffp
.import ../../lib/time/utc.ffp

line: dup leap-year? [ dup putn cr ] ? ++ ;

1800 [ line ] 601 times drop
`,h2=`/* Near-solution seed based on the fixed-point ln(2) helper value. */

ln2: 69314718055994530941 ;

ln2 putn
`,u2=`.import ../../lib/prelude.ffp

ps: putn sp ;

line: dup 0 swap [ dup2 ++ q< q< nck ps q> q> ] seq nck ps cr ;

0 [ dup line ++ ] 20 times
`,d2=`.import ../../lib/prelude.ffp

N: 1000 ;
P: N npi ;
P N nputn
cr
`,f2=`.import ../../lib/prelude.ffp
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
`,p2=`.import ../../lib/prelude.ffp

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
`,m2=`99 bottles of beeron the wall, 99 bottles of beer.
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
Go to the store and buy some more, 99 bottles of beeron the wall.`,g2=`0.9159655941772190150546035149323841107741493742816721342664981196217630197762547694793565129261151062485744226191961995790358988033258590594315947374811584069953320287733194605190387274781640878659090247064841521630002287276409423882599577415088163974702524820115607076448838078733704899008647751132259971343407485407553230768565335768095835260219382323950800720680355761048235733942319149829836189977069036404180862179411019175327431499782339761055122477953032487537187866582808236057022559419481809753509711315712615804242723636439850017382875977976530683700929808738874956108936597719409687268444416680462162433986483891628044828150627302274207388431172218272190472255870531908685735423498539498309919115967388464508615152499624237043745177737235177544070853846440132174839299994757244619975496197587064007474870701490937678873045869979860644874974643872062385137123927363049985035392239287879790633644032354784535851927777787270906083031994301332316712476158709792455479119092126201854803963934243
`,b2=`0
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
`,y2=`2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274274663919320030599218174135966290435729003342952605956307381323286279434907632338298807531952510190115738341879307021540891499348841675092447614606680822648001684774118537423454424371075390777449920695517027618386062613313845830007520449338265602976067371132007093287091274437470472306969772093101416928368190255151086574637721112523897844250569536967707854499699679468644549059879316368892300987931277361782154249992295763514822082698951936680331825288693984964651058209392398294887933203625094431173012381970684161403970198376793206832823764648042953118023287825098194558153017567173613320698112509961818815930416903515988885193458072738667385894228792284998920868058257492796104841984443634632449684875602336248270419786232090021609902353043699418491463140934317381436405462531520961836908887070167683964243781405927145635490613031072085103837505101157477041718986106873969655212671546889570350354
`,w2="1346269",v2=`1
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
`,x2=`1804
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
`,k2=`0.6931471805599453094172321214581765680755001343602552541206800094933936219696947156058633269964186875420014810205706857336855202357581305570326707516350759619307275708283714351903070386238916734711233501153644979552391204751726815749320651555247341395258829504530070953263666426541042391578149520437404303855008019441706416715186447128399681717845469570262716310645461502572074024816377733896385506952606683411372738737229289564935470257626520988596932019650585547647033067936544325476327449512504060694381471046899465062201677204245245296126879465461931651746813926725041038025462596568691441928716082938031727143677826548775664850856740776484514644399404614226031930967354025744460703080960850474866385231381816767514386674766478908814371419854942315199735488037516586127535291661000710535582498794147295092931138971559982056543928717000721808576102523688921324497138932037843935308877482597017155910708823683627589842589185353024363421436706118923678919237231467232172053401649256872747782344535347
`,_2=`1
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
`,S2=`3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989
`,C2=`I	1
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
`,A2=`1 3
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
`,T2="../../ff/codetta",Ko=new Set(["catalans-constant","ln-2","pascals-triangle"]);function fu(i,e){const t=/^\.\.\/\.\.\/ff\/codetta\/([^/]+)\//.exec(i);if(!t)throw new Error(`Unexpected Codetta path for ${e}: ${i}`);return t[1]}function M2(i){const e=i.replaceAll(`\r
`,`
`);if(!e.startsWith(`---
`))throw new Error("Codetta README is missing frontmatter.");const t=e.indexOf(`
---
`,4);if(t<0)throw new Error("Codetta README frontmatter is unterminated.");const n=e.slice(4,t).split(`
`),s=e.slice(t+5).trim(),r=new Map;for(const d of n){const f=d.indexOf(":");if(f<0)continue;const p=d.slice(0,f).trim(),m=d.slice(f+1).trim(),g=m.startsWith('"')&&m.endsWith('"')?m.slice(1,-1):m;r.set(p,g)}const o=r.get("etude"),l=r.get("title"),a=r.get("leader"),c=r.get("bytes"),h=r.get("date");if(!o||!l||!a||!c||!h)throw new Error("Codetta README frontmatter is missing required fields.");const u=Number(c);if(!Number.isFinite(u))throw new Error(`Invalid Codetta byte count: ${c}`);return{frontmatter:{etude:o,title:l,leader:a,bytes:u,date:h},body:s}}const E2=Object.assign({"../../ff/codetta/99bottles/README.md":U1,"../../ff/codetta/catalans-constant/README.md":j1,"../../ff/codetta/collatz/README.md":K1,"../../ff/codetta/e-digits/README.md":X1,"../../ff/codetta/fib/README.md":G1,"../../ff/codetta/fizzbuzz/README.md":Y1,"../../ff/codetta/leap-years/README.md":J1,"../../ff/codetta/ln-2/README.md":Q1,"../../ff/codetta/pascals-triangle/README.md":Z1,"../../ff/codetta/pi-digits/README.md":e2,"../../ff/codetta/roman-to-arabic/README.md":t2,"../../ff/codetta/tower-of-hanoi/README.md":n2}),pu=Object.assign({"../../ff/codetta/99bottles/solution.ffp":i2,"../../ff/codetta/catalans-constant/solution.ffp":s2,"../../ff/codetta/collatz/solution.ffp":r2,"../../ff/codetta/e-digits/solution.ffp":o2,"../../ff/codetta/fib/solution.ffp":l2,"../../ff/codetta/fizzbuzz/solution.ffp":a2,"../../ff/codetta/leap-years/solution.ffp":c2,"../../ff/codetta/ln-2/solution.ffp":h2,"../../ff/codetta/pascals-triangle/solution.ffp":u2,"../../ff/codetta/pi-digits/solution.ffp":d2,"../../ff/codetta/roman-to-arabic/solution.ffp":f2,"../../ff/codetta/tower-of-hanoi/solution.ffp":p2}),B2=Object.assign({"../../ff/codetta/99bottles/solution.out":m2,"../../ff/codetta/catalans-constant/solution.out":g2,"../../ff/codetta/collatz/solution.out":b2,"../../ff/codetta/e-digits/solution.out":y2,"../../ff/codetta/fib/solution.out":w2,"../../ff/codetta/fizzbuzz/solution.out":v2,"../../ff/codetta/leap-years/solution.out":x2,"../../ff/codetta/ln-2/solution.out":k2,"../../ff/codetta/pascals-triangle/solution.out":_2,"../../ff/codetta/pi-digits/solution.out":S2,"../../ff/codetta/roman-to-arabic/solution.out":C2,"../../ff/codetta/tower-of-hanoi/solution.out":A2}),bi=new Map;for(const i of Object.keys(pu)){const e=fu(i,"solution");if(bi.has(e))throw new Error(`Multiple Codetta solutions found for ${e}`);bi.set(e,i)}function D2(i){if(Ko.has(i))throw new Error(`Codetta solution is hidden for ${i}`);const e=bi.get(i);if(!e)throw new Error(`Missing Codetta solution for ${i}`);const t=e.slice(e.lastIndexOf("/")+1);return`/codetta/${i}/${t}`}function mu(i){if(Ko.has(i))throw new Error(`Codetta solution is hidden for ${i}`);const e=bi.get(i);if(!e)throw new Error(`Missing Codetta solution for ${i}`);return e.replace(/^\.\.\/\.\.\//,"")}const P2=Object.entries(E2).map(([i,e])=>{const t=fu(i,"README.md"),n=bi.get(t),s=`${T2}/${t}/solution.out`,r=n?pu[n]:void 0,o=B2[s];if(typeof r!="string")throw new Error(`Missing Codetta solution for ${t}`);if(typeof o!="string")throw new Error(`Missing Codetta expected output for ${t}`);const{frontmatter:l,body:a}=M2(e);if(l.etude!==t)throw new Error(`Codetta README etude mismatch for ${t}: ${l.etude}`);return{id:t,title:l.title,leader:l.leader,bytes:l.bytes,date:l.date,description:a,expected:o.trimEnd(),solution:r.trimEnd()}}).filter(i=>!Ko.has(i.id)).sort((i,e)=>i.title.localeCompare(e.title)),it=P2,O2="https://github.com/Hypercubed/f-flat-minor";function ri(i){return i.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function Ea(i){return`${O2}/edit/main/${mu(i)}`}function L2(i){const e=i?Uo(i):0;return`${e} ${e===1?"byte":"bytes"}`}function jn(i){return i.map(e=>{const t=e.tone&&e.tone!=="default"?` ${e.tone}`:"",n=e.showDot?'<span class="summary-running-dot" aria-hidden="true"></span>':"";return`
      <span class="summary-bar-item">
        <span class="label">${ri(e.label)}</span>
        <span class="value${t}">${n}${ri(e.value)}</span>
      </span>
    `}).join("")}function R2(i,e){const t=i.querySelector(e);if(!t)throw new Error(`Missing Codetta UI element: ${e}`);return t}function I2(i){var tt;if(it.length===0)throw new Error("No Codetta entries found.");i.innerHTML=`
    <section class="codetta">
      <section class="panel codetta-screen" data-screen="list">
        <div class="panel-header">
          <div>
            <p class="panel-label">F♭m Codetta</p>
            <h2>Coda Études</h2>
          </div>
        </div>
        <div class="codetta-list-wrap">
          <table class="codetta-list-table" aria-label="Codetta études list">
            <thead>
              <tr>
                <th>Étude</th>
                <th>Leader</th>
                <th>Compiled bytes</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody id="codetta-etude-list"></tbody>
          </table>
          <a
            class="ghost codetta-suggest-btn"
            href="https://github.com/Hypercubed/f-flat-minor/issues/new?template=codetta-etude.yml"
          >+ Suggest an étude</a>
        </div>
      </section>

      <section class="codetta-screen" data-screen="detail" hidden>
        <div class="codetta-detail-head">
          <button type="button" class="ghost codetta-back-btn" id="codetta-back">← Études</button>
          <div class="codetta-detail-nav" aria-label="Navigate études">
            <button type="button" class="ghost codetta-detail-nav-btn" id="codetta-prev">Previous</button>
            <button type="button" class="ghost codetta-detail-nav-btn" id="codetta-next">Next</button>
          </div>
        </div>

        <section class="codetta-detail-grid">
          <article class="panel">
            <div class="panel-header codetta-etude-header">
              <div>
                <p class="panel-label">F♭m Codetta</p>
                <h2 id="codetta-title"></h2>
              </div>
            </div>
            <div class="codetta-panel-body">
              <p id="codetta-description"></p>
              <p class="panel-label">Expected output</p>
              <pre id="codetta-expected" class="code-block codetta-expected"></pre>
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
            <button id="codetta-submit" type="button" class="primary" disabled>✦ Submit</button>
            <section id="codetta-submit-help" class="codetta-submit-help" hidden>
              <p class="codetta-submit-head">🏆 New record! Ready to submit?</p>
              <p>Submit opens GitHub's file editor for this etude. GitHub will offer to fork the repository first if needed.</p>
              <p id="codetta-issue-title" class="codetta-issue-title"></p>
              <textarea id="codetta-issue-body" class="codetta-issue-body" readonly></textarea>
              <div class="codetta-submit-actions">
                <button id="codetta-copy" type="button" class="ghost">Copy</button>
                <a
                  class="repo-link codetta-issues-link"
                  href="https://github.com/Hypercubed/f-flat-minor/blob/main/.github/PULL_REQUEST_TEMPLATE/codetta-solution.md"
                  target="_blank"
                  rel="noreferrer"
                >View Codetta PR template ↗</a>
              </div>
            </section>
          </div>
        </article>
      </section>
    </section>
  `;const e=i.querySelector('[data-screen="list"]'),t=i.querySelector('[data-screen="detail"]'),n=i.querySelector("#codetta-etude-list"),s=i.querySelector("#codetta-back"),r=i.querySelector("#codetta-prev"),o=i.querySelector("#codetta-next"),l=i.querySelector("#codetta-title"),a=i.querySelector("#codetta-description"),c=i.querySelector("#codetta-expected"),h=i.querySelector("#codetta-leader"),u=i.querySelector("#codetta-bytes"),d=i.querySelector("#codetta-date"),f=R2(i,"#codetta-attempt"),p=i.querySelector("#codetta-load-best"),m=i.querySelector("#codetta-byte-status"),g=i.querySelector("#codetta-run"),b=i.querySelector("#codetta-summary"),x=i.querySelector("#codetta-output"),S=i.querySelector("#codetta-output-wrap"),R=i.querySelector("#codetta-output-wrap-toggle"),k=i.querySelector("#codetta-bytecode"),C=i.querySelector("#codetta-bytecode-meta"),v=i.querySelector("#codetta-bytecode-count"),P=i.querySelector("#codetta-result"),M=i.querySelector("#codetta-submit"),q=i.querySelector("#codetta-submit-help"),L=i.querySelector("#codetta-issue-title"),D=i.querySelector("#codetta-issue-body"),U=i.querySelector("#codetta-copy"),N=Array.from(i.querySelectorAll("[data-codetta-detail-tab]")),W=Array.from(i.querySelectorAll("[data-codetta-detail-panel]"));if(!e||!t||!n||!s||!r||!o||!l||!a||!c||!h||!u||!d||!p||!m||!g||!b||!x||!S||!R||!k||!C||!v||!P||!M||!q||!L||!D||!U)throw new Error("Missing Codetta UI elements.");const K=Vo(f,((tt=it[0])==null?void 0:tt.solution)??"",{extraExtensions:[Wo],onDocumentChange:()=>{ie(),Xe()}}),w={listScreen:e,detailScreen:t,listBody:n,backButton:s,prevButton:r,nextButton:o,title:l,description:a,expected:c,leader:h,bytes:u,date:d,attemptEditor:K,loadBest:p,byteStatus:m,runButton:g,summary:b,output:x,outputWrap:S,outputWrapToggle:R,bytecode:k,bytecodeMeta:C,bytecodeCount:v,result:P,submit:M,submitHelp:q,issueTitle:L,issueBody:D,copyButton:U,detailTabs:N,detailPanels:W};let $=it[0],F=!1,ne=null;function ie(){F=!1,ne=null,w.output.textContent="(Run your attempt to compare output.)",J(""),ce(),w.byteStatus.textContent="Compiled bytes: run to compute and compare against the current best.",delete w.byteStatus.dataset.tone,w.result.textContent="Status: run required",w.result.dataset.tone="pending"}function Y(T){w.detailTabs.forEach(le=>{const we=le.dataset.codettaDetailTab===T;le.classList.toggle("is-active",we)}),w.detailPanels.forEach(le=>{const we=le.dataset.codettaDetailPanel===T;le.classList.toggle("is-active",we)}),w.outputWrapToggle.hidden=T==="bytecode",w.bytecodeMeta.hidden=T!=="bytecode"}function J(T){w.bytecode.textContent=uu(T)||"(Run your attempt to inspect bytecode.)",w.bytecodeCount.textContent=L2(T)}function se(T){w.output.classList.toggle("is-wrapped",T)}se(w.outputWrap.checked),w.outputWrap.addEventListener("change",()=>{se(w.outputWrap.checked)});function j(T){w.runButton.disabled=T,w.runButton.textContent=T?"Running...":"▶ Run",w.runButton.setAttribute("aria-label",T?"Running Codetta attempt":"Run Codetta attempt")}function ce(){w.summary.innerHTML=jn([{label:"compile",value:"—",tone:"pending"},{label:"execute",value:"—",tone:"pending"},{label:"vm steps",value:"—",tone:"pending"},{label:"exit",value:"—",tone:"pending"}]),w.summary.dataset.state="idle"}function De(T){if(ne=T,T===null)return w.byteStatus.textContent="Compiled bytes: run to compute and compare against the current best.",delete w.byteStatus.dataset.tone,null;const le=T-$.bytes;return le<0?(w.byteStatus.textContent=`Compiled bytes: ${T} ← new record candidate (${Math.abs(le)} under ${$.bytes})`,w.byteStatus.dataset.tone="good",T):le===0?(w.byteStatus.textContent=`Compiled bytes: ${T} ← tied with current best (${$.bytes})`,w.byteStatus.dataset.tone="neutral",T):(w.byteStatus.textContent=`Compiled bytes: ${T} ← over current best (${$.bytes})`,w.byteStatus.dataset.tone="bad",T)}function Ve(T){return it.findIndex(le=>le.id===T.id)}function Re(){const T=Ve($);w.prevButton.disabled=T<=0,w.nextButton.disabled=T===-1||T>=it.length-1}function Xe(){const T=F&&ne!==null&&ne<$.bytes;if(w.submit.disabled=!T,w.submitHelp.hidden=!T,!T||ne===null){w.issueTitle.textContent="",w.issueBody.value="";return}const le=Ea($.id),we=mu($.id);w.issueTitle.textContent=`Target file: ${we}`,w.issueBody.value=[le,"",`GitHub edit target: ${we}`,`Current winning score: ${$.bytes} bytes`,`Your verified score: ${ne} bytes`,"","After committing the file edit in GitHub:","1. Choose Create pull request.","2. Use the Codetta PR template.","3. Include validation notes and the new byte count."].join(`
`)}function ut(){w.listBody.innerHTML=it.map(T=>`
      <tr data-etude-id="${T.id}" role="button" tabindex="0">
        <td>› ${ri(T.title)}</td>
        <td>${ri(T.leader)}</td>
        <td>${T.bytes}</td>
        <td>${ri(T.date)}</td>
      </tr>
    `).join("")}function ke(T){$=T,w.title.textContent=T.title,w.description.textContent=T.description,w.expected.textContent=T.expected,w.leader.textContent=T.leader,w.bytes.textContent=String(T.bytes),w.date.textContent=T.date,w.attemptEditor.setValue(T.solution),Y("output"),ie(),Xe(),Re(),w.listScreen.hidden=!0,w.detailScreen.hidden=!1,w.attemptEditor.focus()}function Ge(){w.detailScreen.hidden=!0,w.listScreen.hidden=!1}ut(),ce(),j(!1),ke($),Ge(),w.detailTabs.forEach(T=>{T.addEventListener("click",()=>{Y(T.dataset.codettaDetailTab??"output")})}),w.listBody.addEventListener("click",T=>{const le=T.target.closest("tr[data-etude-id]");if(!le)return;const we=it.find(_e=>_e.id===le.getAttribute("data-etude-id"));we&&ke(we)}),w.listBody.addEventListener("keydown",T=>{if(T.key!=="Enter"&&T.key!==" ")return;const le=T.target.closest("tr[data-etude-id]");if(!le)return;const we=it.find(_e=>_e.id===le.getAttribute("data-etude-id"));we&&(T.preventDefault(),ke(we))}),w.backButton.addEventListener("click",Ge),w.prevButton.addEventListener("click",()=>{const T=Ve($);T<=0||ke(it[T-1])}),w.nextButton.addEventListener("click",()=>{const T=Ve($);T===-1||T>=it.length-1||ke(it[T+1])}),w.loadBest.addEventListener("click",()=>{w.attemptEditor.setValue($.solution),w.attemptEditor.focus()}),w.runButton.addEventListener("click",async()=>{No(w.runButton),j(!0),w.summary.dataset.state="running",w.summary.innerHTML=jn([{label:"compile",value:"Running...",tone:"running",showDot:!0},{label:"execute",value:"…",tone:"pending"},{label:"vm steps",value:"…",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]);try{const T=await jo(w.attemptEditor.getValue(),"",!0,{filename:D2($.id),onProgress:({vmCyclesExecuted:dt,compileMs:ft,executeElapsedMs:Ie,bytecode:dn})=>{dn!==void 0&&J(dn),w.summary.innerHTML=jn([{label:"compile",value:ft!==void 0?`${ft.toFixed(2)} ms`:"…",tone:"running"},{label:"execute",value:Ie!==void 0?`${Ie.toFixed(2)} ms`:"…",tone:"running",showDot:!0},{label:"vm steps",value:zn(dt),tone:"running"},{label:"exit",value:"pending",tone:"pending"}])}}),le=T.terminal==="cancelled"?"cancelled":T.terminal==="error"?"error":String(T.exitCode),we=T.terminal==="cancelled"?"pending":T.terminal==="error"?"error":T.exitCode===0?"success":"error";if(w.summary.dataset.state="idle",w.summary.innerHTML=jn([{label:"compile",value:`${T.compileMs.toFixed(2)} ms`},{label:"execute",value:`${T.executeMs.toFixed(2)} ms`},{label:"vm steps",value:T.vmCyclesExecuted!==void 0?zn(T.vmCyclesExecuted):"—"},{label:"exit",value:le,tone:we}]),J(T.bytecode),De(T.compiledBytes),T.terminal==="error"){F=!1,w.output.textContent=T.logs.join(`
`)||"Run failed.",w.result.textContent="Status: error",w.result.dataset.tone="bad",Xe();return}const _e=T.output.trimEnd(),nt=$.expected.trimEnd();F=_e===nt,w.output.textContent=_e||"(no output)",w.result.textContent=F?"✓ Output matches expected":"✗ Output does not match expected",w.result.dataset.tone=F?"good":"bad",Xe()}catch(T){F=!1,ne=null,w.output.textContent=T instanceof Error?T.message:String(T),J(""),De(null),w.summary.dataset.state="idle",w.summary.innerHTML=jn([{label:"compile",value:"failed",tone:"error"},{label:"execute",value:"—",tone:"pending"},{label:"vm steps",value:"—",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),w.result.textContent="Status: error",w.result.dataset.tone="bad",Xe()}finally{Fo(),j(!1)}}),w.submit.addEventListener("click",()=>{w.submit.disabled||window.location.assign(Ea($.id))}),w.copyButton.addEventListener("click",async()=>{const T=w.issueBody.value;try{await navigator.clipboard.writeText(T),w.copyButton.textContent="Copied!",window.setTimeout(()=>{w.copyButton.textContent="Copy"},1200)}catch{w.issueBody.focus(),w.issueBody.select()}})}var Me=Uint8Array,je=Uint16Array,Xo=Int32Array,Es=new Me([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Bs=new Me([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),so=new Me([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),gu=function(i,e){for(var t=new je(31),n=0;n<31;++n)t[n]=e+=1<<i[n-1];for(var s=new Xo(t[30]),n=1;n<30;++n)for(var r=t[n];r<t[n+1];++r)s[r]=r-t[n]<<5|n;return{b:t,r:s}},bu=gu(Es,2),yu=bu.b,ro=bu.r;yu[28]=258,ro[258]=28;var wu=gu(Bs,0),z2=wu.b,Ba=wu.r,oo=new je(32768);for(var he=0;he<32768;++he){var zt=(he&43690)>>1|(he&21845)<<1;zt=(zt&52428)>>2|(zt&13107)<<2,zt=(zt&61680)>>4|(zt&3855)<<4,oo[he]=((zt&65280)>>8|(zt&255)<<8)>>1}var At=(function(i,e,t){for(var n=i.length,s=0,r=new je(e);s<n;++s)i[s]&&++r[i[s]-1];var o=new je(e);for(s=1;s<e;++s)o[s]=o[s-1]+r[s-1]<<1;var l;if(t){l=new je(1<<e);var a=15-e;for(s=0;s<n;++s)if(i[s])for(var c=s<<4|i[s],h=e-i[s],u=o[i[s]-1]++<<h,d=u|(1<<h)-1;u<=d;++u)l[oo[u]>>a]=c}else for(l=new je(n),s=0;s<n;++s)i[s]&&(l[s]=oo[o[i[s]-1]++]>>15-i[s]);return l}),Xt=new Me(288);for(var he=0;he<144;++he)Xt[he]=8;for(var he=144;he<256;++he)Xt[he]=9;for(var he=256;he<280;++he)Xt[he]=7;for(var he=280;he<288;++he)Xt[he]=8;var yi=new Me(32);for(var he=0;he<32;++he)yi[he]=5;var q2=At(Xt,9,0),N2=At(Xt,9,1),F2=At(yi,5,0),H2=At(yi,5,1),ar=function(i){for(var e=i[0],t=1;t<i.length;++t)i[t]>e&&(e=i[t]);return e},st=function(i,e,t){var n=e/8|0;return(i[n]|i[n+1]<<8)>>(e&7)&t},cr=function(i,e){var t=e/8|0;return(i[t]|i[t+1]<<8|i[t+2]<<16)>>(e&7)},Go=function(i){return(i+7)/8|0},vu=function(i,e,t){return(t==null||t>i.length)&&(t=i.length),new Me(i.subarray(e,t))},W2=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Bt=function(i,e,t){var n=new Error(e||W2[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,Bt),!t)throw n;return n},V2=function(i,e,t,n){var s=i.length,r=0;if(!s||e.f&&!e.l)return t||new Me(0);var o=!t,l=o||e.i!=2,a=e.i;o&&(t=new Me(s*3));var c=function(ut){var ke=t.length;if(ut>ke){var Ge=new Me(Math.max(ke*2,ut));Ge.set(t),t=Ge}},h=e.f||0,u=e.p||0,d=e.b||0,f=e.l,p=e.d,m=e.m,g=e.n,b=s*8;do{if(!f){h=st(i,u,1);var x=st(i,u+1,3);if(u+=3,x)if(x==1)f=N2,p=H2,m=9,g=5;else if(x==2){var C=st(i,u,31)+257,v=st(i,u+10,15)+4,P=C+st(i,u+5,31)+1;u+=14;for(var M=new Me(P),q=new Me(19),L=0;L<v;++L)q[so[L]]=st(i,u+L*3,7);u+=v*3;for(var D=ar(q),U=(1<<D)-1,N=At(q,D,1),L=0;L<P;){var W=N[st(i,u,U)];u+=W&15;var S=W>>4;if(S<16)M[L++]=S;else{var K=0,w=0;for(S==16?(w=3+st(i,u,3),u+=2,K=M[L-1]):S==17?(w=3+st(i,u,7),u+=3):S==18&&(w=11+st(i,u,127),u+=7);w--;)M[L++]=K}}var $=M.subarray(0,C),F=M.subarray(C);m=ar($),g=ar(F),f=At($,m,1),p=At(F,g,1)}else Bt(1);else{var S=Go(u)+4,R=i[S-4]|i[S-3]<<8,k=S+R;if(k>s){a&&Bt(0);break}l&&c(d+R),t.set(i.subarray(S,k),d),e.b=d+=R,e.p=u=k*8,e.f=h;continue}if(u>b){a&&Bt(0);break}}l&&c(d+131072);for(var ne=(1<<m)-1,ie=(1<<g)-1,Y=u;;Y=u){var K=f[cr(i,u)&ne],J=K>>4;if(u+=K&15,u>b){a&&Bt(0);break}if(K||Bt(2),J<256)t[d++]=J;else if(J==256){Y=u,f=null;break}else{var se=J-254;if(J>264){var L=J-257,j=Es[L];se=st(i,u,(1<<j)-1)+yu[L],u+=j}var ce=p[cr(i,u)&ie],De=ce>>4;ce||Bt(3),u+=ce&15;var F=z2[De];if(De>3){var j=Bs[De];F+=cr(i,u)&(1<<j)-1,u+=j}if(u>b){a&&Bt(0);break}l&&c(d+131072);var Ve=d+se;if(d<F){var Re=r-F,Xe=Math.min(F,Ve);for(Re+d<0&&Bt(3);d<Xe;++d)t[d]=n[Re+d]}for(;d<Ve;++d)t[d]=t[d-F]}}e.l=f,e.p=Y,e.b=d,e.f=h,f&&(h=1,e.m=m,e.d=p,e.n=g)}while(!h);return d!=t.length&&o?vu(t,0,d):t.subarray(0,d)},Et=function(i,e,t){t<<=e&7;var n=e/8|0;i[n]|=t,i[n+1]|=t>>8},Kn=function(i,e,t){t<<=e&7;var n=e/8|0;i[n]|=t,i[n+1]|=t>>8,i[n+2]|=t>>16},hr=function(i,e){for(var t=[],n=0;n<i.length;++n)i[n]&&t.push({s:n,f:i[n]});var s=t.length,r=t.slice();if(!s)return{t:ku,l:0};if(s==1){var o=new Me(t[0].s+1);return o[t[0].s]=1,{t:o,l:1}}t.sort(function(k,C){return k.f-C.f}),t.push({s:-1,f:25001});var l=t[0],a=t[1],c=0,h=1,u=2;for(t[0]={s:-1,f:l.f+a.f,l,r:a};h!=s-1;)l=t[t[c].f<t[u].f?c++:u++],a=t[c!=h&&t[c].f<t[u].f?c++:u++],t[h++]={s:-1,f:l.f+a.f,l,r:a};for(var d=r[0].s,n=1;n<s;++n)r[n].s>d&&(d=r[n].s);var f=new je(d+1),p=lo(t[h-1],f,0);if(p>e){var n=0,m=0,g=p-e,b=1<<g;for(r.sort(function(C,v){return f[v.s]-f[C.s]||C.f-v.f});n<s;++n){var x=r[n].s;if(f[x]>e)m+=b-(1<<p-f[x]),f[x]=e;else break}for(m>>=g;m>0;){var S=r[n].s;f[S]<e?m-=1<<e-f[S]++-1:++n}for(;n>=0&&m;--n){var R=r[n].s;f[R]==e&&(--f[R],++m)}p=e}return{t:new Me(f),l:p}},lo=function(i,e,t){return i.s==-1?Math.max(lo(i.l,e,t+1),lo(i.r,e,t+1)):e[i.s]=t},Da=function(i){for(var e=i.length;e&&!i[--e];);for(var t=new je(++e),n=0,s=i[0],r=1,o=function(a){t[n++]=a},l=1;l<=e;++l)if(i[l]==s&&l!=e)++r;else{if(!s&&r>2){for(;r>138;r-=138)o(32754);r>2&&(o(r>10?r-11<<5|28690:r-3<<5|12305),r=0)}else if(r>3){for(o(s),--r;r>6;r-=6)o(8304);r>2&&(o(r-3<<5|8208),r=0)}for(;r--;)o(s);r=1,s=i[l]}return{c:t.subarray(0,n),n:e}},Xn=function(i,e){for(var t=0,n=0;n<e.length;++n)t+=i[n]*e[n];return t},xu=function(i,e,t){var n=t.length,s=Go(e+2);i[s]=n&255,i[s+1]=n>>8,i[s+2]=i[s]^255,i[s+3]=i[s+1]^255;for(var r=0;r<n;++r)i[s+r+4]=t[r];return(s+4+n)*8},Pa=function(i,e,t,n,s,r,o,l,a,c,h){Et(e,h++,t),++s[256];for(var u=hr(s,15),d=u.t,f=u.l,p=hr(r,15),m=p.t,g=p.l,b=Da(d),x=b.c,S=b.n,R=Da(m),k=R.c,C=R.n,v=new je(19),P=0;P<x.length;++P)++v[x[P]&31];for(var P=0;P<k.length;++P)++v[k[P]&31];for(var M=hr(v,7),q=M.t,L=M.l,D=19;D>4&&!q[so[D-1]];--D);var U=c+5<<3,N=Xn(s,Xt)+Xn(r,yi)+o,W=Xn(s,d)+Xn(r,m)+o+14+3*D+Xn(v,q)+2*v[16]+3*v[17]+7*v[18];if(a>=0&&U<=N&&U<=W)return xu(e,h,i.subarray(a,a+c));var K,w,$,F;if(Et(e,h,1+(W<N)),h+=2,W<N){K=At(d,f,0),w=d,$=At(m,g,0),F=m;var ne=At(q,L,0);Et(e,h,S-257),Et(e,h+5,C-1),Et(e,h+10,D-4),h+=14;for(var P=0;P<D;++P)Et(e,h+3*P,q[so[P]]);h+=3*D;for(var ie=[x,k],Y=0;Y<2;++Y)for(var J=ie[Y],P=0;P<J.length;++P){var se=J[P]&31;Et(e,h,ne[se]),h+=q[se],se>15&&(Et(e,h,J[P]>>5&127),h+=J[P]>>12)}}else K=q2,w=Xt,$=F2,F=yi;for(var P=0;P<l;++P){var j=n[P];if(j>255){var se=j>>18&31;Kn(e,h,K[se+257]),h+=w[se+257],se>7&&(Et(e,h,j>>23&31),h+=Es[se]);var ce=j&31;Kn(e,h,$[ce]),h+=F[ce],ce>3&&(Kn(e,h,j>>5&8191),h+=Bs[ce])}else Kn(e,h,K[j]),h+=w[j]}return Kn(e,h,K[256]),h+w[256]},$2=new Xo([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),ku=new Me(0),U2=function(i,e,t,n,s,r){var o=r.z||i.length,l=new Me(n+o+5*(1+Math.ceil(o/7e3))+s),a=l.subarray(n,l.length-s),c=r.l,h=(r.r||0)&7;if(e){h&&(a[0]=r.r>>3);for(var u=$2[e-1],d=u>>13,f=u&8191,p=(1<<t)-1,m=r.p||new je(32768),g=r.h||new je(p+1),b=Math.ceil(t/3),x=2*b,S=function(tt){return(i[tt]^i[tt+1]<<b^i[tt+2]<<x)&p},R=new Xo(25e3),k=new je(288),C=new je(32),v=0,P=0,M=r.i||0,q=0,L=r.w||0,D=0;M+2<o;++M){var U=S(M),N=M&32767,W=g[U];if(m[N]=W,g[U]=N,L<=M){var K=o-M;if((v>7e3||q>24576)&&(K>423||!c)){h=Pa(i,a,0,R,k,C,P,q,D,M-D,h),q=v=P=0,D=M;for(var w=0;w<286;++w)k[w]=0;for(var w=0;w<30;++w)C[w]=0}var $=2,F=0,ne=f,ie=N-W&32767;if(K>2&&U==S(M-ie))for(var Y=Math.min(d,K)-1,J=Math.min(32767,M),se=Math.min(258,K);ie<=J&&--ne&&N!=W;){if(i[M+$]==i[M+$-ie]){for(var j=0;j<se&&i[M+j]==i[M+j-ie];++j);if(j>$){if($=j,F=ie,j>Y)break;for(var ce=Math.min(ie,j-2),De=0,w=0;w<ce;++w){var Ve=M-ie+w&32767,Re=m[Ve],Xe=Ve-Re&32767;Xe>De&&(De=Xe,W=Ve)}}}N=W,W=m[N],ie+=N-W&32767}if(F){R[q++]=268435456|ro[$]<<18|Ba[F];var ut=ro[$]&31,ke=Ba[F]&31;P+=Es[ut]+Bs[ke],++k[257+ut],++C[ke],L=M+$,++v}else R[q++]=i[M],++k[i[M]]}}for(M=Math.max(M,L);M<o;++M)R[q++]=i[M],++k[i[M]];h=Pa(i,a,c,R,k,C,P,q,D,M-D,h),c||(r.r=h&7|a[h/8|0]<<3,h-=7,r.h=g,r.p=m,r.i=M,r.w=L)}else{for(var M=r.w||0;M<o+c;M+=65535){var Ge=M+65535;Ge>=o&&(a[h/8|0]=c,Ge=o),h=xu(a,h+1,i.subarray(M,Ge))}r.i=o}return vu(l,0,n+Go(h)+s)},j2=function(i,e,t,n,s){if(!s&&(s={l:1},e.dictionary)){var r=e.dictionary.subarray(-32768),o=new Me(r.length+i.length);o.set(r),o.set(i,r.length),i=o,s.w=r.length}return U2(i,e.level==null?6:e.level,e.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(i.length)))*1.5):20:12+e.mem,t,n,s)};function K2(i,e){return j2(i,e||{},0,0)}function X2(i,e){return V2(i,{i:2},e,e)}var G2=typeof TextDecoder<"u"&&new TextDecoder,Y2=0;try{G2.decode(ku,{stream:!0}),Y2=1}catch{}const _u=new TextEncoder,Su=new TextDecoder,ao="txt.",co="b64.",ho="c64.",Oa="bc.",J2=45,Q2=70;function Z2(i){for(let e=0;e<i.length;e+=1)if(i.charCodeAt(e)>127)return!1;return!0}function Cu(i){let e="";for(const t of i)e+=String.fromCharCode(t);return btoa(e).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function Au(i){const e=i.replaceAll("-","+").replaceAll("_","/"),t=e.padEnd(Math.ceil(e.length/4)*4,"="),n=atob(t);return Uint8Array.from(n,s=>s.charCodeAt(0))}function eb(i){return Cu(_u.encode(i))}function tb(i){return Su.decode(Au(i))}function nb(i){const e=K2(_u.encode(i),{level:9});return Cu(e)}function ib(i){const e=Au(i);return Su.decode(X2(e))}function sb(i){return i.map(e=>e.op!==V.push?e:{...e,meta:{...e.meta,pointer:!0}})}function rb(i){const e=i.replaceAll(" ","+").replaceAll("-","+").replaceAll("_","/"),t=sb(r1(gi.fromBase64(e)));return tu(t)}const ob={encodeText(i){return`${ao}${i}`},encodeBase64(i){return`${co}${eb(i)}`},encodeCompressed(i){return`${ho}${nb(i)}`}};function $i(i,e){try{return e(i)}catch{return null}}function lb(i,e){const t={...ob,...e},n=Z2(i),s=n&&i.length<=J2,r=i.length>=Q2;if(s)return $i(i,t.encodeText);if(r){const l=$i(i,t.encodeCompressed);if(l!==null)return l}const o=$i(i,t.encodeBase64);return o!==null?o:n?$i(i,t.encodeText):null}function ab(i){if(i===null)return null;if(i.startsWith(ao))return i.slice(ao.length);if(i.startsWith(co)){const e=i.slice(co.length);try{return tb(e)}catch{return null}}if(i.startsWith(ho)){const e=i.slice(ho.length);try{return ib(e)}catch{return null}}if(i.startsWith(Oa)){const e=i.slice(Oa.length);try{return rb(e)}catch{return null}}return null}function Pe(i){return i.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function re(i,e){const t=i.querySelector(e);if(!t)throw new Error(`Missing required element: ${e}`);return t}function gn(i){i.scrollTop=i.scrollHeight}function cb(i){const e=i?Uo(i):0;return`${e} ${e===1?"byte":"bytes"}`}function ur(){return new Promise(i=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>i())})})}function Gn(i){return i.map(e=>{const t=e.tone&&e.tone!=="default"?` ${e.tone}`:"",n=e.showDot?'<span class="summary-running-dot" aria-hidden="true"></span>':"";return`
      <span class="summary-bar-item">
        <span class="label">${e.label}</span>
        <span class="value${t}">${n}${Pe(e.value)}</span>
      </span>
    `}).join("")}function hb(){return N1.replace("{{EXAMPLE_OPTIONS}}",F0).replace("{{HELP_HTML}}",F1)}function ub(i){var Jo;i.innerHTML=hb();const e=re(i,"#run-feedback-toggle");e.addEventListener("click",()=>{xg(),da(e)}),da(e);const t=re(i,"#source"),n=re(i,"#stdin"),s=re(i,"#optimize"),r=re(i,"#example"),o=re(i,"#run"),l=re(i,"#summary"),a=re(i,"#output"),c=re(i,"#output-wrap"),h=re(i,"#output-wrap-toggle"),u=re(i,"#error"),d=re(i,"#preprocessed"),f=re(i,"#ir"),p=re(i,"#bytecode"),m=re(i,"#bytecode-meta"),g=re(i,"#bytecode-count"),b=re(i,"#repl-command"),x=re(i,"#repl-reset"),S=re(i,"#repl-status"),R=re(i,"#repl-output"),k=re(i,"#repl-stack"),C=re(i,"#repl-depth"),v=re(i,"#repl-inspect"),P=re(i,"#repl-inspect-back"),M=re(i,"#repl-inspect-close"),q=re(i,"#repl-inspect-content"),L=re(i,"#tutorial-root"),D=re(i,"#codetta-root"),U=Array.from(i.querySelectorAll(".mode-tab")),N=Array.from(i.querySelectorAll(".tab-panel")),W=Array.from(i.querySelectorAll(".subtab")),K=Array.from(i.querySelectorAll(".detail-panel")),w=new URLSearchParams(no(window.location).replace(/^\?/,"")),$=ab(w.get("code")),F=w.get("example");let ne=ba,ie=N0;$!=null?(ne=$,ie=Qn):F!==null&&F in es&&(ne=es[F],ie=F);let Y=rr(window.location.hash),J=!1;const se=Vo(t,ne,{extraExtensions:[Wo],onDocumentChange:()=>{J||(r.value=Qn,Re())}});r.value=ie;const j=ma(d,""),ce=ma(f,"");function De(A){a.classList.toggle("is-wrapped",A),j.setWrapped(A),ce.setWrapped(A)}function Ve(A){r.disabled=A,n.disabled=A,s.disabled=A,o.textContent=A?"Cancel":"Run Program",o.setAttribute("aria-label",A?"Cancel run":"Run program"),o.classList.toggle("is-cancel",A),l.dataset.state=A?"running":"idle"}function Re(){let A=null,B=null;if(Y==="playground")if(r.value===Qn){const Nn=se.getValue();if(Nn&&(A=lb(Nn),A===null))return}else B=r.value;const Q=V0({pathname:window.location.pathname,search:no(window.location),tab:Y,codeParam:A,exampleParam:B}),ue=`${window.location.pathname}${window.location.hash}`;Q!==ue&&window.history.replaceState(window.history.state,"",Q)}function Xe(A){Y=rr(A),document.body.dataset.mode=Y,U.forEach(B=>{const Q=B.dataset.tab===Y;B.classList.toggle("is-active",Q)}),N.forEach(B=>{const Q=B.dataset.panel===Y;B.classList.toggle("is-active",Q)})}function ut(A){W.forEach(B=>{const Q=B.dataset.detailTab===A;B.classList.toggle("is-active",Q)}),K.forEach(B=>{const Q=B.dataset.detailPanel===A;B.classList.toggle("is-active",Q)}),h.hidden=A==="bytecode",m.hidden=A!=="bytecode"}function ke(A){p.innerHTML=Pe(uu(A)),g.textContent=cb(A)}U.forEach(A=>{A.addEventListener("click",()=>{const B=rr(A.dataset.tab);if(B===Y){Re();return}window.location.hash=B})});function Ge(){Xe(window.location.hash),Re()}window.addEventListener("hashchange",Ge),Ge(),W.forEach(A=>{A.addEventListener("click",()=>{ut(A.dataset.detailTab??"output")})}),De(c.checked),c.addEventListener("change",()=>{De(c.checked)}),ut(((Jo=W.find(A=>A.classList.contains("is-active")))==null?void 0:Jo.dataset.detailTab)??"output");let tt=null;async function T(){document.body.dataset.ready="false",Ve(!0),l.innerHTML=Gn([{label:"compile",value:"Running...",tone:"running",showDot:!0},{label:"execute",value:"…",tone:"pending"},{label:"vm steps",value:"…",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),u.textContent="";const A=new AbortController;tt=A,await ur();try{const B=await jo(se.getValue(),n.value,s.checked,{signal:A.signal,onProgress:({vmCyclesExecuted:Pu,compileMs:Qo,executeElapsedMs:Zo,preprocessed:el,ir:Ou,bytecode:Lu})=>{el!==void 0&&(j.setValue(el),ce.setValue(Ou??""),ke(Lu??"")),l.innerHTML=Gn([{label:"compile",value:Qo!==void 0?`${Qo.toFixed(2)} ms`:"…",tone:"running"},{label:"execute",value:Zo!==void 0?`${Zo.toFixed(2)} ms`:"…",tone:"running",showDot:!0},{label:"vm steps",value:zn(Pu),tone:"running"},{label:"exit",value:"pending",tone:"pending"}])}}),Q=B.issues.length,ue=[];B.output&&ue.push(B.output.trimEnd()),B.logs.length&&ue.push(B.logs.join(`
`));const Rs=[ue.length?ue.join(`
`):"(no output)",Q?`

${Q} compiler issue(s):
${B.issues.join(`
`)}`:""].join(""),Is=B.terminal==="cancelled"?"cancelled":B.terminal==="error"?"error":String(B.exitCode),zs=B.terminal==="cancelled"?"pending":B.terminal==="error"?"error":B.exitCode===0?"success":"error",Du=[{label:"compile",value:`${B.compileMs.toFixed(2)} ms`},{label:"execute",value:`${B.executeMs.toFixed(2)} ms`},{label:"vm steps",value:B.vmCyclesExecuted!==void 0?zn(B.vmCyclesExecuted):"—"},{label:"exit",value:Is,tone:zs}];l.innerHTML=Gn(Du),B.terminal==="error"?(a.innerHTML="",u.innerHTML=Pe(B.logs.join(`
`)||"Run failed."),j.setValue(""),ce.setValue(""),ke(""),gn(u)):(a.innerHTML=Pe(Rs),u.textContent="",j.setValue(B.preprocessed),ce.setValue(B.ir),ke(B.bytecode),gn(a))}catch(B){const Q=B instanceof Error?B.message:String(B);l.innerHTML=Gn([{label:"compile",value:"failed",tone:"error"},{label:"execute",value:"—",tone:"pending"},{label:"vm steps",value:"—",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),a.innerHTML="",u.innerHTML=Pe(Q),j.setValue(""),ce.setValue(""),ke(""),gn(u)}finally{tt=null,Fo(),Ve(!1),document.body.dataset.ready="true"}}function le(){l.innerHTML=Gn([{label:"compile",value:"—",tone:"pending"},{label:"execute",value:"—",tone:"pending"},{label:"vm steps",value:"—",tone:"pending"},{label:"exit",value:"—",tone:"pending"}]),l.dataset.state="idle",a.innerHTML=Pe("(Click Run Program to execute.)"),u.textContent="",j.setValue(""),ce.setValue(""),ke(""),document.body.dataset.ready="true"}const we=new q1,_e=["Core library loaded. Try defining words, evaluating quotes, or printing values."],nt=[];let dt=-1;const ft=[];let Ie=-1,dn,Ds=!1;function Si(A){Ds=A,b.disabled=A,x.disabled=A,S.hidden=!A,S.setAttribute("aria-hidden",String(!A))}function Mu(A){const B=A.trim();return B.length>0&&![".clear",".exit",".quit"].includes(B)}function Ps(A){if(C.textContent=`depth: ${A.length}`,!A.length){k.innerHTML='<li class="repl-stack-empty">(empty stack)</li>',gn(k);return}k.innerHTML=A.map(B=>`
          <li class="repl-stack-row" data-value="${Pe(B.value)}">
            <span class="repl-stack-index">${B.index}:</span>
            <code class="repl-stack-value">${Pe(B.value)}</code>
          </li>
        `).join(""),gn(k)}function Os(){R.innerHTML=Pe(_e.join(`

`)),gn(R)}async function Eu(){if(Ds)return;const A=b.value,B=Mu(A);B&&(Si(!0),await ur());try{const Q=we.execute(A);Q.clearTranscript&&_e.splice(0,_e.length),A.trim()&&(nt.push(A),dt=nt.length),_e.push(`ff> ${A}`),Q.output.trim()&&_e.push(Q.output.trimEnd()),Q.logs.length&&_e.push(Q.logs.join(`
`)),Q.error&&(_e.push(`Error: ${Q.error}`),k.classList.add("is-error"),dn!==void 0&&window.clearTimeout(dn),dn=window.setTimeout(()=>{k.classList.remove("is-error")},500)),_e.push(`[ ${Q.stack.map(ue=>ue.value).join(" ")} ]`),Ps(Q.stack),Os(),b.value=""}finally{B&&Si(!1),b.focus()}}function Ls(A){if(A===null){v.classList.remove("is-visible");return}const B=[],Q=Ie>0;if(B.push('<div class="inspect-header">'),B.push(`<code class="inspect-value">${Pe(String(A.value))}</code>`),A.name&&B.push(`<span class="inspect-name-label">KNOWN AS:</span><span class="inspect-name-value">${Pe(A.name)}</span>`),A.isSystem)B.push('<span class="inspect-tag system">system</span>');else if(A.isDefined){const ue=!A.name&&A.value>255n;B.push(`<span class="inspect-tag ${ue?"quote":"user"}">${ue?"quote":"user-defined"}</span>`)}if(B.push("</div>"),A.isSystem&&(A.stackEffect||A.description)&&(B.push('<div class="inspect-vocabulary">'),A.stackEffect&&B.push(`<div class="inspect-stack-effect"><code>${Pe(A.stackEffect)}</code></div>`),A.description&&B.push(`<div class="inspect-description">${Pe(A.description)}</div>`),B.push("</div>")),A.definition&&A.definition.length>0){B.push('<div class="inspect-label">Definition:</div>'),B.push('<div class="inspect-definition">');for(const ue of A.definition){const Nn=ue.name??String(ue.value),Rs=ue.isCall?"token-call":"token-literal",Is=ue.isCall||ue.isDefined?"inspectable":"",zs=ue.isCall||ue.isDefined?"Click to inspect":"Literal value";B.push(`<span class="inspect-token ${Rs} ${Is}" data-value="${Pe(String(ue.value))}" title="${zs}">${Pe(Nn)}</span>`)}B.push("</div>")}else!A.isSystem&&!A.isDefined&&B.push('<div class="inspect-note">Plain value (not a word)</div>');q.innerHTML=B.join(""),P.disabled=!Q,M.style.display="inline-block",v.classList.add("is-visible")}function Yo(A){Ie<ft.length-1&&ft.splice(Ie+1),ft.push(A),Ie++,Ls(A)}function Bu(){Ie>0?(Ie--,Ls(ft[Ie])):Ie===0&&(ft.length=0,Ie=-1,Ls(null))}r.addEventListener("change",()=>{if(r.value===Qn){Re(),le();return}J=!0,se.setValue(es[r.value]??ba),J=!1,Re(),le()}),o.addEventListener("click",()=>{if(tt!==null){tt.abort();return}No(o),Re(),T()}),s.addEventListener("change",()=>{Re(),le()}),b.addEventListener("keydown",A=>{if(Ag(b,A),A.key==="Enter"){A.preventDefault(),Eu();return}if(A.key==="ArrowUp"){if(A.preventDefault(),!nt.length)return;dt=Math.max(0,dt-1),b.value=nt[dt]??"",b.setSelectionRange(b.value.length,b.value.length);return}if(A.key==="ArrowDown"){if(A.preventDefault(),!nt.length)return;dt=Math.min(nt.length,dt+1),b.value=nt[dt]??"",b.setSelectionRange(b.value.length,b.value.length)}}),x.addEventListener("click",async()=>{if(!Ds){Si(!0),await ur();try{we.reset(),_e.splice(0,_e.length,"Session reset. Prelude reloaded."),nt.splice(0,nt.length),dt=0,Ps([]),Os(),b.value=""}finally{Si(!1),b.focus()}}}),k.addEventListener("click",A=>{const B=A.target.closest(".repl-stack-row");if(!B)return;const Q=B.getAttribute("data-value");if(!Q)return;const ue=we.inspectValue(Q);ft.length=0,Ie=-1,Yo(ue)}),q.addEventListener("click",A=>{const B=A.target.closest(".inspect-token.inspectable");if(!B)return;const Q=B.getAttribute("data-value");if(!Q)return;const ue=we.inspectValue(Q);Yo(ue)}),P.addEventListener("click",()=>{Bu()}),M.addEventListener("click",()=>{ft.length=0,Ie=-1,v.classList.remove("is-visible")}),le(),$1(L),I2(D),Ps([]),Os(),b.focus()}wg();const Tu=document.querySelector("#app");if(!Tu)throw new Error("Missing #app root");ub(Tu);
