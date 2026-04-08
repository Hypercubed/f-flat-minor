var Pu=Object.defineProperty;var Ou=(i,e,t)=>e in i?Pu(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var ht=(i,e,t)=>Ou(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();let cr=[],Ea=[];(()=>{let i="lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map(e=>e?parseInt(e,36):1);for(let e=0,t=0;e<i.length;e++)(e%2?Ea:cr).push(t=t+i[e])})();function Lu(i){if(i<768)return!1;for(let e=0,t=cr.length;;){let n=e+t>>1;if(i<cr[n])t=n;else if(i>=Ea[n])e=n+1;else return!0;if(e==t)return!1}}function Yo(i){return i>=127462&&i<=127487}const Jo=8205;function Ru(i,e,t=!0,n=!0){return(t?Ba:Iu)(i,e,n)}function Ba(i,e,t){if(e==i.length)return e;e&&Da(i.charCodeAt(e))&&Pa(i.charCodeAt(e-1))&&e--;let n=Rs(i,e);for(e+=Qo(n);e<i.length;){let s=Rs(i,e);if(n==Jo||s==Jo||t&&Lu(s))e+=Qo(s),n=s;else if(Yo(s)){let r=0,o=e-2;for(;o>=0&&Yo(Rs(i,o));)r++,o-=2;if(r%2==0)break;e+=2}else break}return e}function Iu(i,e,t){for(;e>0;){let n=Ba(i,e-2,t);if(n<e)return n;e--}return 0}function Rs(i,e){let t=i.charCodeAt(e);if(!Pa(t)||e+1==i.length)return t;let n=i.charCodeAt(e+1);return Da(n)?(t-55296<<10)+(n-56320)+65536:t}function Da(i){return i>=56320&&i<57344}function Pa(i){return i>=55296&&i<56320}function Qo(i){return i<65536?1:2}class Z{lineAt(e){if(e<0||e>this.length)throw new RangeError(`Invalid position ${e} in document of length ${this.length}`);return this.lineInner(e,!1,1,0)}line(e){if(e<1||e>this.lines)throw new RangeError(`Invalid line number ${e} in ${this.lines}-line document`);return this.lineInner(e,!0,1,0)}replace(e,t,n){[e,t]=_n(this,e,t);let s=[];return this.decompose(0,e,s,2),n.length&&n.decompose(0,n.length,s,3),this.decompose(t,this.length,s,1),bt.from(s,this.length-(t-e)+n.length)}append(e){return this.replace(this.length,this.length,e)}slice(e,t=this.length){[e,t]=_n(this,e,t);let n=[];return this.decompose(e,t,n,0),bt.from(n,t-e)}eq(e){if(e==this)return!0;if(e.length!=this.length||e.lines!=this.lines)return!1;let t=this.scanIdentical(e,1),n=this.length-this.scanIdentical(e,-1),s=new Gn(this),r=new Gn(e);for(let o=t,l=t;;){if(s.next(o),r.next(o),o=0,s.lineBreak!=r.lineBreak||s.done!=r.done||s.value!=r.value)return!1;if(l+=s.value.length,s.done||l>=n)return!0}}iter(e=1){return new Gn(this,e)}iterRange(e,t=this.length){return new Oa(this,e,t)}iterLines(e,t){let n;if(e==null)n=this.iter();else{t==null&&(t=this.lines+1);let s=this.line(e).from;n=this.iterRange(s,Math.max(s,t==this.lines+1?this.length:t<=1?0:this.line(t-1).to))}return new La(n)}toString(){return this.sliceString(0)}toJSON(){let e=[];return this.flatten(e),e}constructor(){}static of(e){if(e.length==0)throw new RangeError("A document must have at least one line");return e.length==1&&!e[0]?Z.empty:e.length<=32?new ge(e):bt.from(ge.split(e,[]))}}class ge extends Z{constructor(e,t=zu(e)){super(),this.text=e,this.length=t}get lines(){return this.text.length}get children(){return null}lineInner(e,t,n,s){for(let r=0;;r++){let o=this.text[r],l=s+o.length;if((t?n:l)>=e)return new qu(s,l,n,o);s=l+1,n++}}decompose(e,t,n,s){let r=e<=0&&t>=this.length?this:new ge(Zo(this.text,e,t),Math.min(t,this.length)-Math.max(0,e));if(s&1){let o=n.pop(),l=Fi(r.text,o.text.slice(),0,r.length);if(l.length<=32)n.push(new ge(l,o.length+r.length));else{let a=l.length>>1;n.push(new ge(l.slice(0,a)),new ge(l.slice(a)))}}else n.push(r)}replace(e,t,n){if(!(n instanceof ge))return super.replace(e,t,n);[e,t]=_n(this,e,t);let s=Fi(this.text,Fi(n.text,Zo(this.text,0,e)),t),r=this.length+n.length-(t-e);return s.length<=32?new ge(s,r):bt.from(ge.split(s,[]),r)}sliceString(e,t=this.length,n=`
`){[e,t]=_n(this,e,t);let s="";for(let r=0,o=0;r<=t&&o<this.text.length;o++){let l=this.text[o],a=r+l.length;r>e&&o&&(s+=n),e<a&&t>r&&(s+=l.slice(Math.max(0,e-r),t-r)),r=a+1}return s}flatten(e){for(let t of this.text)e.push(t)}scanIdentical(){return 0}static split(e,t){let n=[],s=-1;for(let r of e)n.push(r),s+=r.length+1,n.length==32&&(t.push(new ge(n,s)),n=[],s=-1);return s>-1&&t.push(new ge(n,s)),t}}class bt extends Z{constructor(e,t){super(),this.children=e,this.length=t,this.lines=0;for(let n of e)this.lines+=n.lines}lineInner(e,t,n,s){for(let r=0;;r++){let o=this.children[r],l=s+o.length,a=n+o.lines-1;if((t?a:l)>=e)return o.lineInner(e,t,n,s);s=l+1,n=a+1}}decompose(e,t,n,s){for(let r=0,o=0;o<=t&&r<this.children.length;r++){let l=this.children[r],a=o+l.length;if(e<=a&&t>=o){let c=s&((o<=e?1:0)|(a>=t?2:0));o>=e&&a<=t&&!c?n.push(l):l.decompose(e-o,t-o,n,c)}o=a+1}}replace(e,t,n){if([e,t]=_n(this,e,t),n.lines<this.lines)for(let s=0,r=0;s<this.children.length;s++){let o=this.children[s],l=r+o.length;if(e>=r&&t<=l){let a=o.replace(e-r,t-r,n),c=this.lines-o.lines+a.lines;if(a.lines<c>>4&&a.lines>c>>6){let h=this.children.slice();return h[s]=a,new bt(h,this.length-(t-e)+n.length)}return super.replace(r,l,a)}r=l+1}return super.replace(e,t,n)}sliceString(e,t=this.length,n=`
`){[e,t]=_n(this,e,t);let s="";for(let r=0,o=0;r<this.children.length&&o<=t;r++){let l=this.children[r],a=o+l.length;o>e&&r&&(s+=n),e<a&&t>o&&(s+=l.sliceString(e-o,t-o,n)),o=a+1}return s}flatten(e){for(let t of this.children)t.flatten(e)}scanIdentical(e,t){if(!(e instanceof bt))return 0;let n=0,[s,r,o,l]=t>0?[0,0,this.children.length,e.children.length]:[this.children.length-1,e.children.length-1,-1,-1];for(;;s+=t,r+=t){if(s==o||r==l)return n;let a=this.children[s],c=e.children[r];if(a!=c)return n+a.scanIdentical(c,t);n+=a.length+1}}static from(e,t=e.reduce((n,s)=>n+s.length+1,-1)){let n=0;for(let f of e)n+=f.lines;if(n<32){let f=[];for(let p of e)p.flatten(f);return new ge(f,t)}let s=Math.max(32,n>>5),r=s<<1,o=s>>1,l=[],a=0,c=-1,h=[];function u(f){let p;if(f.lines>r&&f instanceof bt)for(let m of f.children)u(m);else f.lines>o&&(a>o||!a)?(d(),l.push(f)):f instanceof ge&&a&&(p=h[h.length-1])instanceof ge&&f.lines+p.lines<=32?(a+=f.lines,c+=f.length+1,h[h.length-1]=new ge(p.text.concat(f.text),p.length+1+f.length)):(a+f.lines>s&&d(),a+=f.lines,c+=f.length+1,h.push(f))}function d(){a!=0&&(l.push(h.length==1?h[0]:bt.from(h,c)),c=-1,a=h.length=0)}for(let f of e)u(f);return d(),l.length==1?l[0]:new bt(l,t)}}Z.empty=new ge([""],0);function zu(i){let e=-1;for(let t of i)e+=t.length+1;return e}function Fi(i,e,t=0,n=1e9){for(let s=0,r=0,o=!0;r<i.length&&s<=n;r++){let l=i[r],a=s+l.length;a>=t&&(a>n&&(l=l.slice(0,n-s)),s<t&&(l=l.slice(t-s)),o?(e[e.length-1]+=l,o=!1):e.push(l)),s=a+1}return e}function Zo(i,e,t){return Fi(i,[""],e,t)}class Gn{constructor(e,t=1){this.dir=t,this.done=!1,this.lineBreak=!1,this.value="",this.nodes=[e],this.offsets=[t>0?1:(e instanceof ge?e.text.length:e.children.length)<<1]}nextInner(e,t){for(this.done=this.lineBreak=!1;;){let n=this.nodes.length-1,s=this.nodes[n],r=this.offsets[n],o=r>>1,l=s instanceof ge?s.text.length:s.children.length;if(o==(t>0?l:0)){if(n==0)return this.done=!0,this.value="",this;t>0&&this.offsets[n-1]++,this.nodes.pop(),this.offsets.pop()}else if((r&1)==(t>0?0:1)){if(this.offsets[n]+=t,e==0)return this.lineBreak=!0,this.value=`
`,this;e--}else if(s instanceof ge){let a=s.text[o+(t<0?-1:0)];if(this.offsets[n]+=t,a.length>Math.max(0,e))return this.value=e==0?a:t>0?a.slice(e):a.slice(0,a.length-e),this;e-=a.length}else{let a=s.children[o+(t<0?-1:0)];e>a.length?(e-=a.length,this.offsets[n]+=t):(t<0&&this.offsets[n]--,this.nodes.push(a),this.offsets.push(t>0?1:(a instanceof ge?a.text.length:a.children.length)<<1))}}}next(e=0){return e<0&&(this.nextInner(-e,-this.dir),e=this.value.length),this.nextInner(e,this.dir)}}class Oa{constructor(e,t,n){this.value="",this.done=!1,this.cursor=new Gn(e,t>n?-1:1),this.pos=t>n?e.length:0,this.from=Math.min(t,n),this.to=Math.max(t,n)}nextInner(e,t){if(t<0?this.pos<=this.from:this.pos>=this.to)return this.value="",this.done=!0,this;e+=Math.max(0,t<0?this.pos-this.to:this.from-this.pos);let n=t<0?this.pos-this.from:this.to-this.pos;e>n&&(e=n),n-=e;let{value:s}=this.cursor.next(e);return this.pos+=(s.length+e)*t,this.value=s.length<=n?s:t<0?s.slice(s.length-n):s.slice(0,n),this.done=!this.value,this}next(e=0){return e<0?e=Math.max(e,this.from-this.pos):e>0&&(e=Math.min(e,this.to-this.pos)),this.nextInner(e,this.cursor.dir)}get lineBreak(){return this.cursor.lineBreak&&this.value!=""}}class La{constructor(e){this.inner=e,this.afterBreak=!0,this.value="",this.done=!1}next(e=0){let{done:t,lineBreak:n,value:s}=this.inner.next(e);return t&&this.afterBreak?(this.value="",this.afterBreak=!1):t?(this.done=!0,this.value=""):n?this.afterBreak?this.value="":(this.afterBreak=!0,this.next()):(this.value=s,this.afterBreak=!1),this}get lineBreak(){return!1}}typeof Symbol<"u"&&(Z.prototype[Symbol.iterator]=function(){return this.iter()},Gn.prototype[Symbol.iterator]=Oa.prototype[Symbol.iterator]=La.prototype[Symbol.iterator]=function(){return this});class qu{constructor(e,t,n,s){this.from=e,this.to=t,this.number=n,this.text=s}get length(){return this.to-this.from}}function _n(i,e,t){return e=Math.max(0,Math.min(i.length,e)),[e,Math.max(e,Math.min(i.length,t))]}function Me(i,e,t=!0,n=!0){return Ru(i,e,t,n)}function Nu(i){return i>=56320&&i<57344}function Fu(i){return i>=55296&&i<56320}function Hu(i,e){let t=i.charCodeAt(e);if(!Fu(t)||e+1==i.length)return t;let n=i.charCodeAt(e+1);return Nu(n)?(t-55296<<10)+(n-56320)+65536:t}function Wu(i){return i<65536?1:2}const hr=/\r\n?|\n/;var Ve=(function(i){return i[i.Simple=0]="Simple",i[i.TrackDel=1]="TrackDel",i[i.TrackBefore=2]="TrackBefore",i[i.TrackAfter=3]="TrackAfter",i})(Ve||(Ve={}));class kt{constructor(e){this.sections=e}get length(){let e=0;for(let t=0;t<this.sections.length;t+=2)e+=this.sections[t];return e}get newLength(){let e=0;for(let t=0;t<this.sections.length;t+=2){let n=this.sections[t+1];e+=n<0?this.sections[t]:n}return e}get empty(){return this.sections.length==0||this.sections.length==2&&this.sections[1]<0}iterGaps(e){for(let t=0,n=0,s=0;t<this.sections.length;){let r=this.sections[t++],o=this.sections[t++];o<0?(e(n,s,r),s+=r):s+=o,n+=r}}iterChangedRanges(e,t=!1){ur(this,e,t)}get invertedDesc(){let e=[];for(let t=0;t<this.sections.length;){let n=this.sections[t++],s=this.sections[t++];s<0?e.push(n,s):e.push(s,n)}return new kt(e)}composeDesc(e){return this.empty?e:e.empty?this:Ra(this,e)}mapDesc(e,t=!1){return e.empty?this:dr(this,e,t)}mapPos(e,t=-1,n=Ve.Simple){let s=0,r=0;for(let o=0;o<this.sections.length;){let l=this.sections[o++],a=this.sections[o++],c=s+l;if(a<0){if(c>e)return r+(e-s);r+=l}else{if(n!=Ve.Simple&&c>=e&&(n==Ve.TrackDel&&s<e&&c>e||n==Ve.TrackBefore&&s<e||n==Ve.TrackAfter&&c>e))return null;if(c>e||c==e&&t<0&&!l)return e==s||t<0?r:r+a;r+=a}s=c}if(e>s)throw new RangeError(`Position ${e} is out of range for changeset of length ${s}`);return r}touchesRange(e,t=e){for(let n=0,s=0;n<this.sections.length&&s<=t;){let r=this.sections[n++],o=this.sections[n++],l=s+r;if(o>=0&&s<=t&&l>=e)return s<e&&l>t?"cover":!0;s=l}return!1}toString(){let e="";for(let t=0;t<this.sections.length;){let n=this.sections[t++],s=this.sections[t++];e+=(e?" ":"")+n+(s>=0?":"+s:"")}return e}toJSON(){return this.sections}static fromJSON(e){if(!Array.isArray(e)||e.length%2||e.some(t=>typeof t!="number"))throw new RangeError("Invalid JSON representation of ChangeDesc");return new kt(e)}static create(e){return new kt(e)}}class ve extends kt{constructor(e,t){super(e),this.inserted=t}apply(e){if(this.length!=e.length)throw new RangeError("Applying change set to a document with the wrong length");return ur(this,(t,n,s,r,o)=>e=e.replace(s,s+(n-t),o),!1),e}mapDesc(e,t=!1){return dr(this,e,t,!0)}invert(e){let t=this.sections.slice(),n=[];for(let s=0,r=0;s<t.length;s+=2){let o=t[s],l=t[s+1];if(l>=0){t[s]=l,t[s+1]=o;let a=s>>1;for(;n.length<a;)n.push(Z.empty);n.push(o?e.slice(r,r+o):Z.empty)}r+=o}return new ve(t,n)}compose(e){return this.empty?e:e.empty?this:Ra(this,e,!0)}map(e,t=!1){return e.empty?this:dr(this,e,t,!0)}iterChanges(e,t=!1){ur(this,e,t)}get desc(){return kt.create(this.sections)}filter(e){let t=[],n=[],s=[],r=new ni(this);e:for(let o=0,l=0;;){let a=o==e.length?1e9:e[o++];for(;l<a||l==a&&r.len==0;){if(r.done)break e;let h=Math.min(r.len,a-l);Ae(s,h,-1);let u=r.ins==-1?-1:r.off==0?r.ins:0;Ae(t,h,u),u>0&&qt(n,t,r.text),r.forward(h),l+=h}let c=e[o++];for(;l<c;){if(r.done)break e;let h=Math.min(r.len,c-l);Ae(t,h,-1),Ae(s,h,r.ins==-1?-1:r.off==0?r.ins:0),r.forward(h),l+=h}}return{changes:new ve(t,n),filtered:kt.create(s)}}toJSON(){let e=[];for(let t=0;t<this.sections.length;t+=2){let n=this.sections[t],s=this.sections[t+1];s<0?e.push(n):s==0?e.push([n]):e.push([n].concat(this.inserted[t>>1].toJSON()))}return e}static of(e,t,n){let s=[],r=[],o=0,l=null;function a(h=!1){if(!h&&!s.length)return;o<t&&Ae(s,t-o,-1);let u=new ve(s,r);l=l?l.compose(u.map(l)):u,s=[],r=[],o=0}function c(h){if(Array.isArray(h))for(let u of h)c(u);else if(h instanceof ve){if(h.length!=t)throw new RangeError(`Mismatched change set length (got ${h.length}, expected ${t})`);a(),l=l?l.compose(h.map(l)):h}else{let{from:u,to:d=u,insert:f}=h;if(u>d||u<0||d>t)throw new RangeError(`Invalid change range ${u} to ${d} (in doc of length ${t})`);let p=f?typeof f=="string"?Z.of(f.split(n||hr)):f:Z.empty,m=p.length;if(u==d&&m==0)return;u<o&&a(),u>o&&Ae(s,u-o,-1),Ae(s,d-u,m),qt(r,s,p),o=d}}return c(e),a(!l),l}static empty(e){return new ve(e?[e,-1]:[],[])}static fromJSON(e){if(!Array.isArray(e))throw new RangeError("Invalid JSON representation of ChangeSet");let t=[],n=[];for(let s=0;s<e.length;s++){let r=e[s];if(typeof r=="number")t.push(r,-1);else{if(!Array.isArray(r)||typeof r[0]!="number"||r.some((o,l)=>l&&typeof o!="string"))throw new RangeError("Invalid JSON representation of ChangeSet");if(r.length==1)t.push(r[0],0);else{for(;n.length<s;)n.push(Z.empty);n[s]=Z.of(r.slice(1)),t.push(r[0],n[s].length)}}}return new ve(t,n)}static createSet(e,t){return new ve(e,t)}}function Ae(i,e,t,n=!1){if(e==0&&t<=0)return;let s=i.length-2;s>=0&&t<=0&&t==i[s+1]?i[s]+=e:s>=0&&e==0&&i[s]==0?i[s+1]+=t:n?(i[s]+=e,i[s+1]+=t):i.push(e,t)}function qt(i,e,t){if(t.length==0)return;let n=e.length-2>>1;if(n<i.length)i[i.length-1]=i[i.length-1].append(t);else{for(;i.length<n;)i.push(Z.empty);i.push(t)}}function ur(i,e,t){let n=i.inserted;for(let s=0,r=0,o=0;o<i.sections.length;){let l=i.sections[o++],a=i.sections[o++];if(a<0)s+=l,r+=l;else{let c=s,h=r,u=Z.empty;for(;c+=l,h+=a,a&&n&&(u=u.append(n[o-2>>1])),!(t||o==i.sections.length||i.sections[o+1]<0);)l=i.sections[o++],a=i.sections[o++];e(s,c,r,h,u),s=c,r=h}}}function dr(i,e,t,n=!1){let s=[],r=n?[]:null,o=new ni(i),l=new ni(e);for(let a=-1;;){if(o.done&&l.len||l.done&&o.len)throw new Error("Mismatched change set lengths");if(o.ins==-1&&l.ins==-1){let c=Math.min(o.len,l.len);Ae(s,c,-1),o.forward(c),l.forward(c)}else if(l.ins>=0&&(o.ins<0||a==o.i||o.off==0&&(l.len<o.len||l.len==o.len&&!t))){let c=l.len;for(Ae(s,l.ins,-1);c;){let h=Math.min(o.len,c);o.ins>=0&&a<o.i&&o.len<=h&&(Ae(s,0,o.ins),r&&qt(r,s,o.text),a=o.i),o.forward(h),c-=h}l.next()}else if(o.ins>=0){let c=0,h=o.len;for(;h;)if(l.ins==-1){let u=Math.min(h,l.len);c+=u,h-=u,l.forward(u)}else if(l.ins==0&&l.len<h)h-=l.len,l.next();else break;Ae(s,c,a<o.i?o.ins:0),r&&a<o.i&&qt(r,s,o.text),a=o.i,o.forward(o.len-h)}else{if(o.done&&l.done)return r?ve.createSet(s,r):kt.create(s);throw new Error("Mismatched change set lengths")}}}function Ra(i,e,t=!1){let n=[],s=t?[]:null,r=new ni(i),o=new ni(e);for(let l=!1;;){if(r.done&&o.done)return s?ve.createSet(n,s):kt.create(n);if(r.ins==0)Ae(n,r.len,0,l),r.next();else if(o.len==0&&!o.done)Ae(n,0,o.ins,l),s&&qt(s,n,o.text),o.next();else{if(r.done||o.done)throw new Error("Mismatched change set lengths");{let a=Math.min(r.len2,o.len),c=n.length;if(r.ins==-1){let h=o.ins==-1?-1:o.off?0:o.ins;Ae(n,a,h,l),s&&h&&qt(s,n,o.text)}else o.ins==-1?(Ae(n,r.off?0:r.len,a,l),s&&qt(s,n,r.textBit(a))):(Ae(n,r.off?0:r.len,o.off?0:o.ins,l),s&&!o.off&&qt(s,n,o.text));l=(r.ins>a||o.ins>=0&&o.len>a)&&(l||n.length>c),r.forward2(a),o.forward(a)}}}}class ni{constructor(e){this.set=e,this.i=0,this.next()}next(){let{sections:e}=this.set;this.i<e.length?(this.len=e[this.i++],this.ins=e[this.i++]):(this.len=0,this.ins=-2),this.off=0}get done(){return this.ins==-2}get len2(){return this.ins<0?this.len:this.ins}get text(){let{inserted:e}=this.set,t=this.i-2>>1;return t>=e.length?Z.empty:e[t]}textBit(e){let{inserted:t}=this.set,n=this.i-2>>1;return n>=t.length&&!e?Z.empty:t[n].slice(this.off,e==null?void 0:this.off+e)}forward(e){e==this.len?this.next():(this.len-=e,this.off+=e)}forward2(e){this.ins==-1?this.forward(e):e==this.ins?this.next():(this.ins-=e,this.off+=e)}}class Qt{constructor(e,t,n){this.from=e,this.to=t,this.flags=n}get anchor(){return this.flags&32?this.to:this.from}get head(){return this.flags&32?this.from:this.to}get empty(){return this.from==this.to}get assoc(){return this.flags&8?-1:this.flags&16?1:0}get bidiLevel(){let e=this.flags&7;return e==7?null:e}get goalColumn(){let e=this.flags>>6;return e==16777215?void 0:e}map(e,t=-1){let n,s;return this.empty?n=s=e.mapPos(this.from,t):(n=e.mapPos(this.from,1),s=e.mapPos(this.to,-1)),n==this.from&&s==this.to?this:new Qt(n,s,this.flags)}extend(e,t=e,n=0){if(e<=this.anchor&&t>=this.anchor)return _.range(e,t,void 0,void 0,n);let s=Math.abs(e-this.anchor)>Math.abs(t-this.anchor)?e:t;return _.range(this.anchor,s,void 0,void 0,n)}eq(e,t=!1){return this.anchor==e.anchor&&this.head==e.head&&this.goalColumn==e.goalColumn&&(!t||!this.empty||this.assoc==e.assoc)}toJSON(){return{anchor:this.anchor,head:this.head}}static fromJSON(e){if(!e||typeof e.anchor!="number"||typeof e.head!="number")throw new RangeError("Invalid JSON representation for SelectionRange");return _.range(e.anchor,e.head)}static create(e,t,n){return new Qt(e,t,n)}}class _{constructor(e,t){this.ranges=e,this.mainIndex=t}map(e,t=-1){return e.empty?this:_.create(this.ranges.map(n=>n.map(e,t)),this.mainIndex)}eq(e,t=!1){if(this.ranges.length!=e.ranges.length||this.mainIndex!=e.mainIndex)return!1;for(let n=0;n<this.ranges.length;n++)if(!this.ranges[n].eq(e.ranges[n],t))return!1;return!0}get main(){return this.ranges[this.mainIndex]}asSingle(){return this.ranges.length==1?this:new _([this.main],0)}addRange(e,t=!0){return _.create([e].concat(this.ranges),t?0:this.mainIndex+1)}replaceRange(e,t=this.mainIndex){let n=this.ranges.slice();return n[t]=e,_.create(n,this.mainIndex)}toJSON(){return{ranges:this.ranges.map(e=>e.toJSON()),main:this.mainIndex}}static fromJSON(e){if(!e||!Array.isArray(e.ranges)||typeof e.main!="number"||e.main>=e.ranges.length)throw new RangeError("Invalid JSON representation for EditorSelection");return new _(e.ranges.map(t=>Qt.fromJSON(t)),e.main)}static single(e,t=e){return new _([_.range(e,t)],0)}static create(e,t=0){if(e.length==0)throw new RangeError("A selection needs at least one range");for(let n=0,s=0;s<e.length;s++){let r=e[s];if(r.empty?r.from<=n:r.from<n)return _.normalized(e.slice(),t);n=r.to}return new _(e,t)}static cursor(e,t=0,n,s){return Qt.create(e,e,(t==0?0:t<0?8:16)|(n==null?7:Math.min(6,n))|(s??16777215)<<6)}static range(e,t,n,s,r){let o=(n??16777215)<<6|(s==null?7:Math.min(6,s));return!r&&e!=t&&(r=t<e?1:-1),t<e?Qt.create(t,e,48|o):Qt.create(e,t,(r?r<0?8:16:0)|o)}static normalized(e,t=0){let n=e[t];e.sort((s,r)=>s.from-r.from),t=e.indexOf(n);for(let s=1;s<e.length;s++){let r=e[s],o=e[s-1];if(r.empty?r.from<=o.to:r.from<o.to){let l=o.from,a=Math.max(r.to,o.to);s<=t&&t--,e.splice(--s,2,r.anchor>r.head?_.range(a,l):_.range(l,a))}}return new _(e,t)}}function Ia(i,e){for(let t of i.ranges)if(t.to>e)throw new RangeError("Selection points outside of document")}let ao=0;class z{constructor(e,t,n,s,r){this.combine=e,this.compareInput=t,this.compare=n,this.isStatic=s,this.id=ao++,this.default=e([]),this.extensions=typeof r=="function"?r(this):r}get reader(){return this}static define(e={}){return new z(e.combine||(t=>t),e.compareInput||((t,n)=>t===n),e.compare||(e.combine?(t,n)=>t===n:co),!!e.static,e.enables)}of(e){return new Hi([],this,0,e)}compute(e,t){if(this.isStatic)throw new Error("Can't compute a static facet");return new Hi(e,this,1,t)}computeN(e,t){if(this.isStatic)throw new Error("Can't compute a static facet");return new Hi(e,this,2,t)}from(e,t){return t||(t=n=>n),this.compute([e],n=>t(n.field(e)))}}function co(i,e){return i==e||i.length==e.length&&i.every((t,n)=>t===e[n])}class Hi{constructor(e,t,n,s){this.dependencies=e,this.facet=t,this.type=n,this.value=s,this.id=ao++}dynamicSlot(e){var t;let n=this.value,s=this.facet.compareInput,r=this.id,o=e[r]>>1,l=this.type==2,a=!1,c=!1,h=[];for(let u of this.dependencies)u=="doc"?a=!0:u=="selection"?c=!0:(((t=e[u.id])!==null&&t!==void 0?t:1)&1)==0&&h.push(e[u.id]);return{create(u){return u.values[o]=n(u),1},update(u,d){if(a&&d.docChanged||c&&(d.docChanged||d.selection)||fr(u,h)){let f=n(u);if(l?!el(f,u.values[o],s):!s(f,u.values[o]))return u.values[o]=f,1}return 0},reconfigure:(u,d)=>{let f,p=d.config.address[r];if(p!=null){let m=Ji(d,p);if(this.dependencies.every(g=>g instanceof z?d.facet(g)===u.facet(g):g instanceof jt?d.field(g,!1)==u.field(g,!1):!0)||(l?el(f=n(u),m,s):s(f=n(u),m)))return u.values[o]=m,0}else f=n(u);return u.values[o]=f,1}}}}function el(i,e,t){if(i.length!=e.length)return!1;for(let n=0;n<i.length;n++)if(!t(i[n],e[n]))return!1;return!0}function fr(i,e){let t=!1;for(let n of e)Yn(i,n)&1&&(t=!0);return t}function Vu(i,e,t){let n=t.map(a=>i[a.id]),s=t.map(a=>a.type),r=n.filter(a=>!(a&1)),o=i[e.id]>>1;function l(a){let c=[];for(let h=0;h<n.length;h++){let u=Ji(a,n[h]);if(s[h]==2)for(let d of u)c.push(d);else c.push(u)}return e.combine(c)}return{create(a){for(let c of n)Yn(a,c);return a.values[o]=l(a),1},update(a,c){if(!fr(a,r))return 0;let h=l(a);return e.compare(h,a.values[o])?0:(a.values[o]=h,1)},reconfigure(a,c){let h=fr(a,n),u=c.config.facets[e.id],d=c.facet(e);if(u&&!h&&co(t,u))return a.values[o]=d,0;let f=l(a);return e.compare(f,d)?(a.values[o]=d,0):(a.values[o]=f,1)}}}const vi=z.define({static:!0});class jt{constructor(e,t,n,s,r){this.id=e,this.createF=t,this.updateF=n,this.compareF=s,this.spec=r,this.provides=void 0}static define(e){let t=new jt(ao++,e.create,e.update,e.compare||((n,s)=>n===s),e);return e.provide&&(t.provides=e.provide(t)),t}create(e){let t=e.facet(vi).find(n=>n.field==this);return((t==null?void 0:t.create)||this.createF)(e)}slot(e){let t=e[this.id]>>1;return{create:n=>(n.values[t]=this.create(n),1),update:(n,s)=>{let r=n.values[t],o=this.updateF(r,s);return this.compareF(r,o)?0:(n.values[t]=o,1)},reconfigure:(n,s)=>{let r=n.facet(vi),o=s.facet(vi),l;return(l=r.find(a=>a.field==this))&&l!=o.find(a=>a.field==this)?(n.values[t]=l.create(n),1):s.config.address[this.id]!=null?(n.values[t]=s.field(this),0):(n.values[t]=this.create(n),1)}}}init(e){return[this,vi.of({field:this,create:e})]}get extension(){return this}}const Jt={lowest:4,low:3,default:2,high:1,highest:0};function In(i){return e=>new za(e,i)}const hs={highest:In(Jt.highest),high:In(Jt.high),default:In(Jt.default),low:In(Jt.low),lowest:In(Jt.lowest)};class za{constructor(e,t){this.inner=e,this.prec=t}}class us{of(e){return new pr(this,e)}reconfigure(e){return us.reconfigure.of({compartment:this,extension:e})}get(e){return e.config.compartments.get(this)}}class pr{constructor(e,t){this.compartment=e,this.inner=t}}class Yi{constructor(e,t,n,s,r,o){for(this.base=e,this.compartments=t,this.dynamicSlots=n,this.address=s,this.staticValues=r,this.facets=o,this.statusTemplate=[];this.statusTemplate.length<n.length;)this.statusTemplate.push(0)}staticFacet(e){let t=this.address[e.id];return t==null?e.default:this.staticValues[t>>1]}static resolve(e,t,n){let s=[],r=Object.create(null),o=new Map;for(let d of $u(e,t,o))d instanceof jt?s.push(d):(r[d.facet.id]||(r[d.facet.id]=[])).push(d);let l=Object.create(null),a=[],c=[];for(let d of s)l[d.id]=c.length<<1,c.push(f=>d.slot(f));let h=n==null?void 0:n.config.facets;for(let d in r){let f=r[d],p=f[0].facet,m=h&&h[d]||[];if(f.every(g=>g.type==0))if(l[p.id]=a.length<<1|1,co(m,f))a.push(n.facet(p));else{let g=p.combine(f.map(b=>b.value));a.push(n&&p.compare(g,n.facet(p))?n.facet(p):g)}else{for(let g of f)g.type==0?(l[g.id]=a.length<<1|1,a.push(g.value)):(l[g.id]=c.length<<1,c.push(b=>g.dynamicSlot(b)));l[p.id]=c.length<<1,c.push(g=>Vu(g,p,f))}}let u=c.map(d=>d(l));return new Yi(e,o,u,l,a,r)}}function $u(i,e,t){let n=[[],[],[],[],[]],s=new Map;function r(o,l){let a=s.get(o);if(a!=null){if(a<=l)return;let c=n[a].indexOf(o);c>-1&&n[a].splice(c,1),o instanceof pr&&t.delete(o.compartment)}if(s.set(o,l),Array.isArray(o))for(let c of o)r(c,l);else if(o instanceof pr){if(t.has(o.compartment))throw new RangeError("Duplicate use of compartment in extensions");let c=e.get(o.compartment)||o.inner;t.set(o.compartment,c),r(c,l)}else if(o instanceof za)r(o.inner,o.prec);else if(o instanceof jt)n[l].push(o),o.provides&&r(o.provides,l);else if(o instanceof Hi)n[l].push(o),o.facet.extensions&&r(o.facet.extensions,Jt.default);else{let c=o.extension;if(!c)throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);r(c,l)}}return r(i,Jt.default),n.reduce((o,l)=>o.concat(l))}function Yn(i,e){if(e&1)return 2;let t=e>>1,n=i.status[t];if(n==4)throw new Error("Cyclic dependency between fields and/or facets");if(n&2)return n;i.status[t]=4;let s=i.computeSlot(i,i.config.dynamicSlots[t]);return i.status[t]=2|s}function Ji(i,e){return e&1?i.config.staticValues[e>>1]:i.values[e>>1]}const qa=z.define(),mr=z.define({combine:i=>i.some(e=>e),static:!0}),Na=z.define({combine:i=>i.length?i[0]:void 0,static:!0}),Fa=z.define(),Ha=z.define(),Wa=z.define(),Va=z.define({combine:i=>i.length?i[0]:!1});class Kt{constructor(e,t){this.type=e,this.value=t}static define(){return new Uu}}class Uu{of(e){return new Kt(this,e)}}class ju{constructor(e){this.map=e}of(e){return new ye(this,e)}}class ye{constructor(e,t){this.type=e,this.value=t}map(e){let t=this.type.map(this.value,e);return t===void 0?void 0:t==this.value?this:new ye(this.type,t)}is(e){return this.type==e}static define(e={}){return new ju(e.map||(t=>t))}static mapEffects(e,t){if(!e.length)return e;let n=[];for(let s of e){let r=s.map(t);r&&n.push(r)}return n}}ye.reconfigure=ye.define();ye.appendConfig=ye.define();class xe{constructor(e,t,n,s,r,o){this.startState=e,this.changes=t,this.selection=n,this.effects=s,this.annotations=r,this.scrollIntoView=o,this._doc=null,this._state=null,n&&Ia(n,t.newLength),r.some(l=>l.type==xe.time)||(this.annotations=r.concat(xe.time.of(Date.now())))}static create(e,t,n,s,r,o){return new xe(e,t,n,s,r,o)}get newDoc(){return this._doc||(this._doc=this.changes.apply(this.startState.doc))}get newSelection(){return this.selection||this.startState.selection.map(this.changes)}get state(){return this._state||this.startState.applyTransaction(this),this._state}annotation(e){for(let t of this.annotations)if(t.type==e)return t.value}get docChanged(){return!this.changes.empty}get reconfigured(){return this.startState.config!=this.state.config}isUserEvent(e){let t=this.annotation(xe.userEvent);return!!(t&&(t==e||t.length>e.length&&t.slice(0,e.length)==e&&t[e.length]=="."))}}xe.time=Kt.define();xe.userEvent=Kt.define();xe.addToHistory=Kt.define();xe.remote=Kt.define();function Ku(i,e){let t=[];for(let n=0,s=0;;){let r,o;if(n<i.length&&(s==e.length||e[s]>=i[n]))r=i[n++],o=i[n++];else if(s<e.length)r=e[s++],o=e[s++];else return t;!t.length||t[t.length-1]<r?t.push(r,o):t[t.length-1]<o&&(t[t.length-1]=o)}}function $a(i,e,t){var n;let s,r,o;return t?(s=e.changes,r=ve.empty(e.changes.length),o=i.changes.compose(e.changes)):(s=e.changes.map(i.changes),r=i.changes.mapDesc(e.changes,!0),o=i.changes.compose(s)),{changes:o,selection:e.selection?e.selection.map(r):(n=i.selection)===null||n===void 0?void 0:n.map(s),effects:ye.mapEffects(i.effects,s).concat(ye.mapEffects(e.effects,r)),annotations:i.annotations.length?i.annotations.concat(e.annotations):e.annotations,scrollIntoView:i.scrollIntoView||e.scrollIntoView}}function gr(i,e,t){let n=e.selection,s=wn(e.annotations);return e.userEvent&&(s=s.concat(xe.userEvent.of(e.userEvent))),{changes:e.changes instanceof ve?e.changes:ve.of(e.changes||[],t,i.facet(Na)),selection:n&&(n instanceof _?n:_.single(n.anchor,n.head)),effects:wn(e.effects),annotations:s,scrollIntoView:!!e.scrollIntoView}}function Ua(i,e,t){let n=gr(i,e.length?e[0]:{},i.doc.length);e.length&&e[0].filter===!1&&(t=!1);for(let r=1;r<e.length;r++){e[r].filter===!1&&(t=!1);let o=!!e[r].sequential;n=$a(n,gr(i,e[r],o?n.changes.newLength:i.doc.length),o)}let s=xe.create(i,n.changes,n.selection,n.effects,n.annotations,n.scrollIntoView);return Gu(t?Xu(s):s)}function Xu(i){let e=i.startState,t=!0;for(let s of e.facet(Fa)){let r=s(i);if(r===!1){t=!1;break}Array.isArray(r)&&(t=t===!0?r:Ku(t,r))}if(t!==!0){let s,r;if(t===!1)r=i.changes.invertedDesc,s=ve.empty(e.doc.length);else{let o=i.changes.filter(t);s=o.changes,r=o.filtered.mapDesc(o.changes).invertedDesc}i=xe.create(e,s,i.selection&&i.selection.map(r),ye.mapEffects(i.effects,r),i.annotations,i.scrollIntoView)}let n=e.facet(Ha);for(let s=n.length-1;s>=0;s--){let r=n[s](i);r instanceof xe?i=r:Array.isArray(r)&&r.length==1&&r[0]instanceof xe?i=r[0]:i=Ua(e,wn(r),!1)}return i}function Gu(i){let e=i.startState,t=e.facet(Wa),n=i;for(let s=t.length-1;s>=0;s--){let r=t[s](i);r&&Object.keys(r).length&&(n=$a(n,gr(e,r,i.changes.newLength),!0))}return n==i?i:xe.create(e,i.changes,i.selection,n.effects,n.annotations,n.scrollIntoView)}const Yu=[];function wn(i){return i==null?Yu:Array.isArray(i)?i:[i]}var Et=(function(i){return i[i.Word=0]="Word",i[i.Space=1]="Space",i[i.Other=2]="Other",i})(Et||(Et={}));const Ju=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;let br;try{br=new RegExp("[\\p{Alphabetic}\\p{Number}_]","u")}catch{}function Qu(i){if(br)return br.test(i);for(let e=0;e<i.length;e++){let t=i[e];if(/\w/.test(t)||t>""&&(t.toUpperCase()!=t.toLowerCase()||Ju.test(t)))return!0}return!1}function Zu(i){return e=>{if(!/\S/.test(e))return Et.Space;if(Qu(e))return Et.Word;for(let t=0;t<i.length;t++)if(e.indexOf(i[t])>-1)return Et.Word;return Et.Other}}class te{constructor(e,t,n,s,r,o){this.config=e,this.doc=t,this.selection=n,this.values=s,this.status=e.statusTemplate.slice(),this.computeSlot=r,o&&(o._state=this);for(let l=0;l<this.config.dynamicSlots.length;l++)Yn(this,l<<1);this.computeSlot=null}field(e,t=!0){let n=this.config.address[e.id];if(n==null){if(t)throw new RangeError("Field is not present in this state");return}return Yn(this,n),Ji(this,n)}update(...e){return Ua(this,e,!0)}applyTransaction(e){let t=this.config,{base:n,compartments:s}=t;for(let l of e.effects)l.is(us.reconfigure)?(t&&(s=new Map,t.compartments.forEach((a,c)=>s.set(c,a)),t=null),s.set(l.value.compartment,l.value.extension)):l.is(ye.reconfigure)?(t=null,n=l.value):l.is(ye.appendConfig)&&(t=null,n=wn(n).concat(l.value));let r;t?r=e.startState.values.slice():(t=Yi.resolve(n,s,this),r=new te(t,this.doc,this.selection,t.dynamicSlots.map(()=>null),(a,c)=>c.reconfigure(a,this),null).values);let o=e.startState.facet(mr)?e.newSelection:e.newSelection.asSingle();new te(t,e.newDoc,o,r,(l,a)=>a.update(l,e),e)}replaceSelection(e){return typeof e=="string"&&(e=this.toText(e)),this.changeByRange(t=>({changes:{from:t.from,to:t.to,insert:e},range:_.cursor(t.from+e.length)}))}changeByRange(e){let t=this.selection,n=e(t.ranges[0]),s=this.changes(n.changes),r=[n.range],o=wn(n.effects);for(let l=1;l<t.ranges.length;l++){let a=e(t.ranges[l]),c=this.changes(a.changes),h=c.map(s);for(let d=0;d<l;d++)r[d]=r[d].map(h);let u=s.mapDesc(c,!0);r.push(a.range.map(u)),s=s.compose(h),o=ye.mapEffects(o,h).concat(ye.mapEffects(wn(a.effects),u))}return{changes:s,selection:_.create(r,t.mainIndex),effects:o}}changes(e=[]){return e instanceof ve?e:ve.of(e,this.doc.length,this.facet(te.lineSeparator))}toText(e){return Z.of(e.split(this.facet(te.lineSeparator)||hr))}sliceDoc(e=0,t=this.doc.length){return this.doc.sliceString(e,t,this.lineBreak)}facet(e){let t=this.config.address[e.id];return t==null?e.default:(Yn(this,t),Ji(this,t))}toJSON(e){let t={doc:this.sliceDoc(),selection:this.selection.toJSON()};if(e)for(let n in e){let s=e[n];s instanceof jt&&this.config.address[s.id]!=null&&(t[n]=s.spec.toJSON(this.field(e[n]),this))}return t}static fromJSON(e,t={},n){if(!e||typeof e.doc!="string")throw new RangeError("Invalid JSON representation for EditorState");let s=[];if(n){for(let r in n)if(Object.prototype.hasOwnProperty.call(e,r)){let o=n[r],l=e[r];s.push(o.init(a=>o.spec.fromJSON(l,a)))}}return te.create({doc:e.doc,selection:_.fromJSON(e.selection),extensions:t.extensions?s.concat([t.extensions]):s})}static create(e={}){let t=Yi.resolve(e.extensions||[],new Map),n=e.doc instanceof Z?e.doc:Z.of((e.doc||"").split(t.staticFacet(te.lineSeparator)||hr)),s=e.selection?e.selection instanceof _?e.selection:_.single(e.selection.anchor,e.selection.head):_.single(0);return Ia(s,n.length),t.staticFacet(mr)||(s=s.asSingle()),new te(t,n,s,t.dynamicSlots.map(()=>null),(r,o)=>o.create(r),null)}get tabSize(){return this.facet(te.tabSize)}get lineBreak(){return this.facet(te.lineSeparator)||`
`}get readOnly(){return this.facet(Va)}phrase(e,...t){for(let n of this.facet(te.phrases))if(Object.prototype.hasOwnProperty.call(n,e)){e=n[e];break}return t.length&&(e=e.replace(/\$(\$|\d*)/g,(n,s)=>{if(s=="$")return"$";let r=+(s||1);return!r||r>t.length?n:t[r-1]})),e}languageDataAt(e,t,n=-1){let s=[];for(let r of this.facet(qa))for(let o of r(this,t,n))Object.prototype.hasOwnProperty.call(o,e)&&s.push(o[e]);return s}charCategorizer(e){let t=this.languageDataAt("wordChars",e);return Zu(t.length?t[0]:"")}wordAt(e){let{text:t,from:n,length:s}=this.doc.lineAt(e),r=this.charCategorizer(e),o=e-n,l=e-n;for(;o>0;){let a=Me(t,o,!1);if(r(t.slice(a,o))!=Et.Word)break;o=a}for(;l<s;){let a=Me(t,l);if(r(t.slice(l,a))!=Et.Word)break;l=a}return o==l?null:_.range(o+n,l+n)}}te.allowMultipleSelections=mr;te.tabSize=z.define({combine:i=>i.length?i[0]:4});te.lineSeparator=Na;te.readOnly=Va;te.phrases=z.define({compare(i,e){let t=Object.keys(i),n=Object.keys(e);return t.length==n.length&&t.every(s=>i[s]==e[s])}});te.languageData=qa;te.changeFilter=Fa;te.transactionFilter=Ha;te.transactionExtender=Wa;us.reconfigure=ye.define();function ho(i,e,t={}){let n={};for(let s of i)for(let r of Object.keys(s)){let o=s[r],l=n[r];if(l===void 0)n[r]=o;else if(!(l===o||o===void 0))if(Object.hasOwnProperty.call(t,r))n[r]=t[r](l,o);else throw new Error("Config merge conflict for field "+r)}for(let s in e)n[s]===void 0&&(n[s]=e[s]);return n}class nn{eq(e){return this==e}range(e,t=e){return yr.create(e,t,this)}}nn.prototype.startSide=nn.prototype.endSide=0;nn.prototype.point=!1;nn.prototype.mapMode=Ve.TrackDel;function uo(i,e){return i==e||i.constructor==e.constructor&&i.eq(e)}let yr=class ja{constructor(e,t,n){this.from=e,this.to=t,this.value=n}static create(e,t,n){return new ja(e,t,n)}};function wr(i,e){return i.from-e.from||i.value.startSide-e.value.startSide}class fo{constructor(e,t,n,s){this.from=e,this.to=t,this.value=n,this.maxPoint=s}get length(){return this.to[this.to.length-1]}findIndex(e,t,n,s=0){let r=n?this.to:this.from;for(let o=s,l=r.length;;){if(o==l)return o;let a=o+l>>1,c=r[a]-e||(n?this.value[a].endSide:this.value[a].startSide)-t;if(a==o)return c>=0?o:l;c>=0?l=a:o=a+1}}between(e,t,n,s){for(let r=this.findIndex(t,-1e9,!0),o=this.findIndex(n,1e9,!1,r);r<o;r++)if(s(this.from[r]+e,this.to[r]+e,this.value[r])===!1)return!1}map(e,t){let n=[],s=[],r=[],o=-1,l=-1;for(let a=0;a<this.value.length;a++){let c=this.value[a],h=this.from[a]+e,u=this.to[a]+e,d,f;if(h==u){let p=t.mapPos(h,c.startSide,c.mapMode);if(p==null||(d=f=p,c.startSide!=c.endSide&&(f=t.mapPos(h,c.endSide),f<d)))continue}else if(d=t.mapPos(h,c.startSide),f=t.mapPos(u,c.endSide),d>f||d==f&&c.startSide>0&&c.endSide<=0)continue;(f-d||c.endSide-c.startSide)<0||(o<0&&(o=d),c.point&&(l=Math.max(l,f-d)),n.push(c),s.push(d-o),r.push(f-o))}return{mapped:n.length?new fo(s,r,n,l):null,pos:o}}}class Q{constructor(e,t,n,s){this.chunkPos=e,this.chunk=t,this.nextLayer=n,this.maxPoint=s}static create(e,t,n,s){return new Q(e,t,n,s)}get length(){let e=this.chunk.length-1;return e<0?0:Math.max(this.chunkEnd(e),this.nextLayer.length)}get size(){if(this.isEmpty)return 0;let e=this.nextLayer.size;for(let t of this.chunk)e+=t.value.length;return e}chunkEnd(e){return this.chunkPos[e]+this.chunk[e].length}update(e){let{add:t=[],sort:n=!1,filterFrom:s=0,filterTo:r=this.length}=e,o=e.filter;if(t.length==0&&!o)return this;if(n&&(t=t.slice().sort(wr)),this.isEmpty)return t.length?Q.of(t):this;let l=new Ka(this,null,-1).goto(0),a=0,c=[],h=new ii;for(;l.value||a<t.length;)if(a<t.length&&(l.from-t[a].from||l.startSide-t[a].value.startSide)>=0){let u=t[a++];h.addInner(u.from,u.to,u.value)||c.push(u)}else l.rangeIndex==1&&l.chunkIndex<this.chunk.length&&(a==t.length||this.chunkEnd(l.chunkIndex)<t[a].from)&&(!o||s>this.chunkEnd(l.chunkIndex)||r<this.chunkPos[l.chunkIndex])&&h.addChunk(this.chunkPos[l.chunkIndex],this.chunk[l.chunkIndex])?l.nextChunk():((!o||s>l.to||r<l.from||o(l.from,l.to,l.value))&&(h.addInner(l.from,l.to,l.value)||c.push(yr.create(l.from,l.to,l.value))),l.next());return h.finishInner(this.nextLayer.isEmpty&&!c.length?Q.empty:this.nextLayer.update({add:c,filter:o,filterFrom:s,filterTo:r}))}map(e){if(e.empty||this.isEmpty)return this;let t=[],n=[],s=-1;for(let o=0;o<this.chunk.length;o++){let l=this.chunkPos[o],a=this.chunk[o],c=e.touchesRange(l,l+a.length);if(c===!1)s=Math.max(s,a.maxPoint),t.push(a),n.push(e.mapPos(l));else if(c===!0){let{mapped:h,pos:u}=a.map(l,e);h&&(s=Math.max(s,h.maxPoint),t.push(h),n.push(u))}}let r=this.nextLayer.map(e);return t.length==0?r:new Q(n,t,r||Q.empty,s)}between(e,t,n){if(!this.isEmpty){for(let s=0;s<this.chunk.length;s++){let r=this.chunkPos[s],o=this.chunk[s];if(t>=r&&e<=r+o.length&&o.between(r,e-r,t-r,n)===!1)return}this.nextLayer.between(e,t,n)}}iter(e=0){return si.from([this]).goto(e)}get isEmpty(){return this.nextLayer==this}static iter(e,t=0){return si.from(e).goto(t)}static compare(e,t,n,s,r=-1){let o=e.filter(u=>u.maxPoint>0||!u.isEmpty&&u.maxPoint>=r),l=t.filter(u=>u.maxPoint>0||!u.isEmpty&&u.maxPoint>=r),a=tl(o,l,n),c=new zn(o,a,r),h=new zn(l,a,r);n.iterGaps((u,d,f)=>nl(c,u,h,d,f,s)),n.empty&&n.length==0&&nl(c,0,h,0,0,s)}static eq(e,t,n=0,s){s==null&&(s=999999999);let r=e.filter(h=>!h.isEmpty&&t.indexOf(h)<0),o=t.filter(h=>!h.isEmpty&&e.indexOf(h)<0);if(r.length!=o.length)return!1;if(!r.length)return!0;let l=tl(r,o),a=new zn(r,l,0).goto(n),c=new zn(o,l,0).goto(n);for(;;){if(a.to!=c.to||!vr(a.active,c.active)||a.point&&(!c.point||!uo(a.point,c.point)))return!1;if(a.to>s)return!0;a.next(),c.next()}}static spans(e,t,n,s,r=-1){let o=new zn(e,null,r).goto(t),l=t,a=o.openStart;for(;;){let c=Math.min(o.to,n);if(o.point){let h=o.activeForPoint(o.to),u=o.pointFrom<t?h.length+1:o.point.startSide<0?h.length:Math.min(h.length,a);s.point(l,c,o.point,h,u,o.pointRank),a=Math.min(o.openEnd(c),h.length)}else c>l&&(s.span(l,c,o.active,a),a=o.openEnd(c));if(o.to>n)return a+(o.point&&o.to>n?1:0);l=o.to,o.next()}}static of(e,t=!1){let n=new ii;for(let s of e instanceof yr?[e]:t?ed(e):e)n.add(s.from,s.to,s.value);return n.finish()}static join(e){if(!e.length)return Q.empty;let t=e[e.length-1];for(let n=e.length-2;n>=0;n--)for(let s=e[n];s!=Q.empty;s=s.nextLayer)t=new Q(s.chunkPos,s.chunk,t,Math.max(s.maxPoint,t.maxPoint));return t}}Q.empty=new Q([],[],null,-1);function ed(i){if(i.length>1)for(let e=i[0],t=1;t<i.length;t++){let n=i[t];if(wr(e,n)>0)return i.slice().sort(wr);e=n}return i}Q.empty.nextLayer=Q.empty;class ii{finishChunk(e){this.chunks.push(new fo(this.from,this.to,this.value,this.maxPoint)),this.chunkPos.push(this.chunkStart),this.chunkStart=-1,this.setMaxPoint=Math.max(this.setMaxPoint,this.maxPoint),this.maxPoint=-1,e&&(this.from=[],this.to=[],this.value=[])}constructor(){this.chunks=[],this.chunkPos=[],this.chunkStart=-1,this.last=null,this.lastFrom=-1e9,this.lastTo=-1e9,this.from=[],this.to=[],this.value=[],this.maxPoint=-1,this.setMaxPoint=-1,this.nextLayer=null}add(e,t,n){this.addInner(e,t,n)||(this.nextLayer||(this.nextLayer=new ii)).add(e,t,n)}addInner(e,t,n){let s=e-this.lastTo||n.startSide-this.last.endSide;if(s<=0&&(e-this.lastFrom||n.startSide-this.last.startSide)<0)throw new Error("Ranges must be added sorted by `from` position and `startSide`");return s<0?!1:(this.from.length==250&&this.finishChunk(!0),this.chunkStart<0&&(this.chunkStart=e),this.from.push(e-this.chunkStart),this.to.push(t-this.chunkStart),this.last=n,this.lastFrom=e,this.lastTo=t,this.value.push(n),n.point&&(this.maxPoint=Math.max(this.maxPoint,t-e)),!0)}addChunk(e,t){if((e-this.lastTo||t.value[0].startSide-this.last.endSide)<0)return!1;this.from.length&&this.finishChunk(!0),this.setMaxPoint=Math.max(this.setMaxPoint,t.maxPoint),this.chunks.push(t),this.chunkPos.push(e);let n=t.value.length-1;return this.last=t.value[n],this.lastFrom=t.from[n]+e,this.lastTo=t.to[n]+e,!0}finish(){return this.finishInner(Q.empty)}finishInner(e){if(this.from.length&&this.finishChunk(!1),this.chunks.length==0)return e;let t=Q.create(this.chunkPos,this.chunks,this.nextLayer?this.nextLayer.finishInner(e):e,this.setMaxPoint);return this.from=null,t}}function tl(i,e,t){let n=new Map;for(let r of i)for(let o=0;o<r.chunk.length;o++)r.chunk[o].maxPoint<=0&&n.set(r.chunk[o],r.chunkPos[o]);let s=new Set;for(let r of e)for(let o=0;o<r.chunk.length;o++){let l=n.get(r.chunk[o]);l!=null&&(t?t.mapPos(l):l)==r.chunkPos[o]&&!(t!=null&&t.touchesRange(l,l+r.chunk[o].length))&&s.add(r.chunk[o])}return s}class Ka{constructor(e,t,n,s=0){this.layer=e,this.skip=t,this.minPoint=n,this.rank=s}get startSide(){return this.value?this.value.startSide:0}get endSide(){return this.value?this.value.endSide:0}goto(e,t=-1e9){return this.chunkIndex=this.rangeIndex=0,this.gotoInner(e,t,!1),this}gotoInner(e,t,n){for(;this.chunkIndex<this.layer.chunk.length;){let s=this.layer.chunk[this.chunkIndex];if(!(this.skip&&this.skip.has(s)||this.layer.chunkEnd(this.chunkIndex)<e||s.maxPoint<this.minPoint))break;this.chunkIndex++,n=!1}if(this.chunkIndex<this.layer.chunk.length){let s=this.layer.chunk[this.chunkIndex].findIndex(e-this.layer.chunkPos[this.chunkIndex],t,!0);(!n||this.rangeIndex<s)&&this.setRangeIndex(s)}this.next()}forward(e,t){(this.to-e||this.endSide-t)<0&&this.gotoInner(e,t,!0)}next(){for(;;)if(this.chunkIndex==this.layer.chunk.length){this.from=this.to=1e9,this.value=null;break}else{let e=this.layer.chunkPos[this.chunkIndex],t=this.layer.chunk[this.chunkIndex],n=e+t.from[this.rangeIndex];if(this.from=n,this.to=e+t.to[this.rangeIndex],this.value=t.value[this.rangeIndex],this.setRangeIndex(this.rangeIndex+1),this.minPoint<0||this.value.point&&this.to-this.from>=this.minPoint)break}}setRangeIndex(e){if(e==this.layer.chunk[this.chunkIndex].value.length){if(this.chunkIndex++,this.skip)for(;this.chunkIndex<this.layer.chunk.length&&this.skip.has(this.layer.chunk[this.chunkIndex]);)this.chunkIndex++;this.rangeIndex=0}else this.rangeIndex=e}nextChunk(){this.chunkIndex++,this.rangeIndex=0,this.next()}compare(e){return this.from-e.from||this.startSide-e.startSide||this.rank-e.rank||this.to-e.to||this.endSide-e.endSide}}class si{constructor(e){this.heap=e}static from(e,t=null,n=-1){let s=[];for(let r=0;r<e.length;r++)for(let o=e[r];!o.isEmpty;o=o.nextLayer)o.maxPoint>=n&&s.push(new Ka(o,t,n,r));return s.length==1?s[0]:new si(s)}get startSide(){return this.value?this.value.startSide:0}goto(e,t=-1e9){for(let n of this.heap)n.goto(e,t);for(let n=this.heap.length>>1;n>=0;n--)Is(this.heap,n);return this.next(),this}forward(e,t){for(let n of this.heap)n.forward(e,t);for(let n=this.heap.length>>1;n>=0;n--)Is(this.heap,n);(this.to-e||this.value.endSide-t)<0&&this.next()}next(){if(this.heap.length==0)this.from=this.to=1e9,this.value=null,this.rank=-1;else{let e=this.heap[0];this.from=e.from,this.to=e.to,this.value=e.value,this.rank=e.rank,e.value&&e.next(),Is(this.heap,0)}}}function Is(i,e){for(let t=i[e];;){let n=(e<<1)+1;if(n>=i.length)break;let s=i[n];if(n+1<i.length&&s.compare(i[n+1])>=0&&(s=i[n+1],n++),t.compare(s)<0)break;i[n]=t,i[e]=s,e=n}}class zn{constructor(e,t,n){this.minPoint=n,this.active=[],this.activeTo=[],this.activeRank=[],this.minActive=-1,this.point=null,this.pointFrom=0,this.pointRank=0,this.to=-1e9,this.endSide=0,this.openStart=-1,this.cursor=si.from(e,t,n)}goto(e,t=-1e9){return this.cursor.goto(e,t),this.active.length=this.activeTo.length=this.activeRank.length=0,this.minActive=-1,this.to=e,this.endSide=t,this.openStart=-1,this.next(),this}forward(e,t){for(;this.minActive>-1&&(this.activeTo[this.minActive]-e||this.active[this.minActive].endSide-t)<0;)this.removeActive(this.minActive);this.cursor.forward(e,t)}removeActive(e){xi(this.active,e),xi(this.activeTo,e),xi(this.activeRank,e),this.minActive=il(this.active,this.activeTo)}addActive(e){let t=0,{value:n,to:s,rank:r}=this.cursor;for(;t<this.activeRank.length&&(r-this.activeRank[t]||s-this.activeTo[t])>0;)t++;ki(this.active,t,n),ki(this.activeTo,t,s),ki(this.activeRank,t,r),e&&ki(e,t,this.cursor.from),this.minActive=il(this.active,this.activeTo)}next(){let e=this.to,t=this.point;this.point=null;let n=this.openStart<0?[]:null;for(;;){let s=this.minActive;if(s>-1&&(this.activeTo[s]-this.cursor.from||this.active[s].endSide-this.cursor.startSide)<0){if(this.activeTo[s]>e){this.to=this.activeTo[s],this.endSide=this.active[s].endSide;break}this.removeActive(s),n&&xi(n,s)}else if(this.cursor.value)if(this.cursor.from>e){this.to=this.cursor.from,this.endSide=this.cursor.startSide;break}else{let r=this.cursor.value;if(!r.point)this.addActive(n),this.cursor.next();else if(t&&this.cursor.to==this.to&&this.cursor.from<this.cursor.to)this.cursor.next();else{this.point=r,this.pointFrom=this.cursor.from,this.pointRank=this.cursor.rank,this.to=this.cursor.to,this.endSide=r.endSide,this.cursor.next(),this.forward(this.to,this.endSide);break}}else{this.to=this.endSide=1e9;break}}if(n){this.openStart=0;for(let s=n.length-1;s>=0&&n[s]<e;s--)this.openStart++}}activeForPoint(e){if(!this.active.length)return this.active;let t=[];for(let n=this.active.length-1;n>=0&&!(this.activeRank[n]<this.pointRank);n--)(this.activeTo[n]>e||this.activeTo[n]==e&&this.active[n].endSide>=this.point.endSide)&&t.push(this.active[n]);return t.reverse()}openEnd(e){let t=0;for(let n=this.activeTo.length-1;n>=0&&this.activeTo[n]>e;n--)t++;return t}}function nl(i,e,t,n,s,r){i.goto(e),t.goto(n);let o=n+s,l=n,a=n-e,c=!!r.boundChange;for(let h=!1;;){let u=i.to+a-t.to,d=u||i.endSide-t.endSide,f=d<0?i.to+a:t.to,p=Math.min(f,o);if(i.point||t.point?(i.point&&t.point&&uo(i.point,t.point)&&vr(i.activeForPoint(i.to),t.activeForPoint(t.to))||r.comparePoint(l,p,i.point,t.point),h=!1):(h&&r.boundChange(l),p>l&&!vr(i.active,t.active)&&r.compareRange(l,p,i.active,t.active),c&&p<o&&(u||i.openEnd(f)!=t.openEnd(f))&&(h=!0)),f>o)break;l=f,d<=0&&i.next(),d>=0&&t.next()}}function vr(i,e){if(i.length!=e.length)return!1;for(let t=0;t<i.length;t++)if(i[t]!=e[t]&&!uo(i[t],e[t]))return!1;return!0}function xi(i,e){for(let t=e,n=i.length-1;t<n;t++)i[t]=i[t+1];i.pop()}function ki(i,e,t){for(let n=i.length-1;n>=e;n--)i[n+1]=i[n];i[e]=t}function il(i,e){let t=-1,n=1e9;for(let s=0;s<e.length;s++)(e[s]-n||i[s].endSide-i[t].endSide)<0&&(t=s,n=e[s]);return t}function ds(i,e,t=i.length){let n=0;for(let s=0;s<t&&s<i.length;)i.charCodeAt(s)==9?(n+=e-n%e,s++):(n++,s=Me(i,s));return n}function td(i,e,t,n){for(let s=0,r=0;;){if(r>=e)return s;if(s==i.length)break;r+=i.charCodeAt(s)==9?t-r%t:1,s=Me(i,s)}return i.length}const xr="ͼ",sl=typeof Symbol>"u"?"__"+xr:Symbol.for(xr),kr=typeof Symbol>"u"?"__styleSet"+Math.floor(Math.random()*1e8):Symbol("styleSet"),rl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{};class Ht{constructor(e,t){this.rules=[];let{finish:n}=t||{};function s(o){return/^@/.test(o)?[o]:o.split(/,\s*/)}function r(o,l,a,c){let h=[],u=/^@(\w+)\b/.exec(o[0]),d=u&&u[1]=="keyframes";if(u&&l==null)return a.push(o[0]+";");for(let f in l){let p=l[f];if(/&/.test(f))r(f.split(/,\s*/).map(m=>o.map(g=>m.replace(/&/,g))).reduce((m,g)=>m.concat(g)),p,a);else if(p&&typeof p=="object"){if(!u)throw new RangeError("The value of a property ("+f+") should be a primitive value.");r(s(f),p,h,d)}else p!=null&&h.push(f.replace(/_.*/,"").replace(/[A-Z]/g,m=>"-"+m.toLowerCase())+": "+p+";")}(h.length||d)&&a.push((n&&!u&&!c?o.map(n):o).join(", ")+" {"+h.join(" ")+"}")}for(let o in e)r(s(o),e[o],this.rules)}getRules(){return this.rules.join(`
`)}static newName(){let e=rl[sl]||1;return rl[sl]=e+1,xr+e.toString(36)}static mount(e,t,n){let s=e[kr],r=n&&n.nonce;s?r&&s.setNonce(r):s=new nd(e,r),s.mount(Array.isArray(t)?t:[t],e)}}let ol=new Map;class nd{constructor(e,t){let n=e.ownerDocument||e,s=n.defaultView;if(!e.head&&e.adoptedStyleSheets&&s.CSSStyleSheet){let r=ol.get(n);if(r)return e[kr]=r;this.sheet=new s.CSSStyleSheet,ol.set(n,this)}else this.styleTag=n.createElement("style"),t&&this.styleTag.setAttribute("nonce",t);this.modules=[],e[kr]=this}mount(e,t){let n=this.sheet,s=0,r=0;for(let o=0;o<e.length;o++){let l=e[o],a=this.modules.indexOf(l);if(a<r&&a>-1&&(this.modules.splice(a,1),r--,a=-1),a==-1){if(this.modules.splice(r++,0,l),n)for(let c=0;c<l.rules.length;c++)n.insertRule(l.rules[c],s++)}else{for(;r<a;)s+=this.modules[r++].rules.length;s+=l.rules.length,r++}}if(n)t.adoptedStyleSheets.indexOf(this.sheet)<0&&(t.adoptedStyleSheets=[this.sheet,...t.adoptedStyleSheets]);else{let o="";for(let a=0;a<this.modules.length;a++)o+=this.modules[a].getRules()+`
`;this.styleTag.textContent=o;let l=t.head||t;this.styleTag.parentNode!=l&&l.insertBefore(this.styleTag,l.firstChild)}}setNonce(e){this.styleTag&&this.styleTag.getAttribute("nonce")!=e&&this.styleTag.setAttribute("nonce",e)}}var Wt={8:"Backspace",9:"Tab",10:"Enter",12:"NumLock",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",44:"PrintScreen",45:"Insert",46:"Delete",59:";",61:"=",91:"Meta",92:"Meta",106:"*",107:"+",108:",",109:"-",110:".",111:"/",144:"NumLock",145:"ScrollLock",160:"Shift",161:"Shift",162:"Control",163:"Control",164:"Alt",165:"Alt",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},ri={48:")",49:"!",50:"@",51:"#",52:"$",53:"%",54:"^",55:"&",56:"*",57:"(",59:":",61:"+",173:"_",186:":",187:"+",188:"<",189:"_",190:">",191:"?",192:"~",219:"{",220:"|",221:"}",222:'"'},id=typeof navigator<"u"&&/Mac/.test(navigator.platform),sd=typeof navigator<"u"&&/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);for(var Se=0;Se<10;Se++)Wt[48+Se]=Wt[96+Se]=String(Se);for(var Se=1;Se<=24;Se++)Wt[Se+111]="F"+Se;for(var Se=65;Se<=90;Se++)Wt[Se]=String.fromCharCode(Se+32),ri[Se]=String.fromCharCode(Se);for(var zs in Wt)ri.hasOwnProperty(zs)||(ri[zs]=Wt[zs]);function rd(i){var e=id&&i.metaKey&&i.shiftKey&&!i.ctrlKey&&!i.altKey||sd&&i.shiftKey&&i.key&&i.key.length==1||i.key=="Unidentified",t=!e&&i.key||(i.shiftKey?ri:Wt)[i.keyCode]||i.key||"Unidentified";return t=="Esc"&&(t="Escape"),t=="Del"&&(t="Delete"),t=="Left"&&(t="ArrowLeft"),t=="Up"&&(t="ArrowUp"),t=="Right"&&(t="ArrowRight"),t=="Down"&&(t="ArrowDown"),t}let Pe=typeof navigator<"u"?navigator:{userAgent:"",vendor:"",platform:""},_r=typeof document<"u"?document:{documentElement:{style:{}}};const Sr=/Edge\/(\d+)/.exec(Pe.userAgent),Xa=/MSIE \d/.test(Pe.userAgent),Cr=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Pe.userAgent),fs=!!(Xa||Cr||Sr),ll=!fs&&/gecko\/(\d+)/i.test(Pe.userAgent),qs=!fs&&/Chrome\/(\d+)/.exec(Pe.userAgent),od="webkitFontSmoothing"in _r.documentElement.style,Ar=!fs&&/Apple Computer/.test(Pe.vendor),al=Ar&&(/Mobile\/\w+/.test(Pe.userAgent)||Pe.maxTouchPoints>2);var O={mac:al||/Mac/.test(Pe.platform),windows:/Win/.test(Pe.platform),linux:/Linux|X11/.test(Pe.platform),ie:fs,ie_version:Xa?_r.documentMode||6:Cr?+Cr[1]:Sr?+Sr[1]:0,gecko:ll,gecko_version:ll?+(/Firefox\/(\d+)/.exec(Pe.userAgent)||[0,0])[1]:0,chrome:!!qs,chrome_version:qs?+qs[1]:0,ios:al,android:/Android\b/.test(Pe.userAgent),webkit_version:od?+(/\bAppleWebKit\/(\d+)/.exec(Pe.userAgent)||[0,0])[1]:0,safari:Ar,safari_version:Ar?+(/\bVersion\/(\d+(\.\d+)?)/.exec(Pe.userAgent)||[0,0])[1]:0,tabSize:_r.documentElement.style.tabSize!=null?"tab-size":"-moz-tab-size"};function po(i,e){for(let t in i)t=="class"&&e.class?e.class+=" "+i.class:t=="style"&&e.style?e.style+=";"+i.style:e[t]=i[t];return e}const Qi=Object.create(null);function mo(i,e,t){if(i==e)return!0;i||(i=Qi),e||(e=Qi);let n=Object.keys(i),s=Object.keys(e);if(n.length-0!=s.length-0)return!1;for(let r of n)if(r!=t&&(s.indexOf(r)==-1||i[r]!==e[r]))return!1;return!0}function ld(i,e){for(let t=i.attributes.length-1;t>=0;t--){let n=i.attributes[t].name;e[n]==null&&i.removeAttribute(n)}for(let t in e){let n=e[t];t=="style"?i.style.cssText=n:i.getAttribute(t)!=n&&i.setAttribute(t,n)}}function cl(i,e,t){let n=!1;if(e)for(let s in e)t&&s in t||(n=!0,s=="style"?i.style.cssText="":i.removeAttribute(s));if(t)for(let s in t)e&&e[s]==t[s]||(n=!0,s=="style"?i.style.cssText=t[s]:i.setAttribute(s,t[s]));return n}function ad(i){let e=Object.create(null);for(let t=0;t<i.attributes.length;t++){let n=i.attributes[t];e[n.name]=n.value}return e}class ps{eq(e){return!1}updateDOM(e,t,n){return!1}compare(e){return this==e||this.constructor==e.constructor&&this.eq(e)}get estimatedHeight(){return-1}get lineBreaks(){return 0}ignoreEvent(e){return!0}coordsAt(e,t,n){return null}get isHidden(){return!1}get editable(){return!1}destroy(e){}}var Ce=(function(i){return i[i.Text=0]="Text",i[i.WidgetBefore=1]="WidgetBefore",i[i.WidgetAfter=2]="WidgetAfter",i[i.WidgetRange=3]="WidgetRange",i})(Ce||(Ce={}));class we extends nn{constructor(e,t,n,s){super(),this.startSide=e,this.endSide=t,this.widget=n,this.spec=s}get heightRelevant(){return!1}static mark(e){return new mi(e)}static widget(e){let t=Math.max(-1e4,Math.min(1e4,e.side||0)),n=!!e.block;return t+=n&&!e.inlineOrder?t>0?3e8:-4e8:t>0?1e8:-1e8,new sn(e,t,t,n,e.widget||null,!1)}static replace(e){let t=!!e.block,n,s;if(e.isBlockGap)n=-5e8,s=4e8;else{let{start:r,end:o}=Ga(e,t);n=(r?t?-3e8:-1:5e8)-1,s=(o?t?2e8:1:-6e8)+1}return new sn(e,n,s,t,e.widget||null,!0)}static line(e){return new gi(e)}static set(e,t=!1){return Q.of(e,t)}hasHeight(){return this.widget?this.widget.estimatedHeight>-1:!1}}we.none=Q.empty;class mi extends we{constructor(e){let{start:t,end:n}=Ga(e);super(t?-1:5e8,n?1:-6e8,null,e),this.tagName=e.tagName||"span",this.attrs=e.class&&e.attributes?po(e.attributes,{class:e.class}):e.class?{class:e.class}:e.attributes||Qi}eq(e){return this==e||e instanceof mi&&this.tagName==e.tagName&&mo(this.attrs,e.attrs)}range(e,t=e){if(e>=t)throw new RangeError("Mark decorations may not be empty");return super.range(e,t)}}mi.prototype.point=!1;class gi extends we{constructor(e){super(-2e8,-2e8,null,e)}eq(e){return e instanceof gi&&this.spec.class==e.spec.class&&mo(this.spec.attributes,e.spec.attributes)}range(e,t=e){if(t!=e)throw new RangeError("Line decoration ranges must be zero-length");return super.range(e,t)}}gi.prototype.mapMode=Ve.TrackBefore;gi.prototype.point=!0;class sn extends we{constructor(e,t,n,s,r,o){super(t,n,r,e),this.block=s,this.isReplace=o,this.mapMode=s?t<=0?Ve.TrackBefore:Ve.TrackAfter:Ve.TrackDel}get type(){return this.startSide!=this.endSide?Ce.WidgetRange:this.startSide<=0?Ce.WidgetBefore:Ce.WidgetAfter}get heightRelevant(){return this.block||!!this.widget&&(this.widget.estimatedHeight>=5||this.widget.lineBreaks>0)}eq(e){return e instanceof sn&&cd(this.widget,e.widget)&&this.block==e.block&&this.startSide==e.startSide&&this.endSide==e.endSide}range(e,t=e){if(this.isReplace&&(e>t||e==t&&this.startSide>0&&this.endSide<=0))throw new RangeError("Invalid range for replacement decoration");if(!this.isReplace&&t!=e)throw new RangeError("Widget decorations can only have zero-length ranges");return super.range(e,t)}}sn.prototype.point=!0;function Ga(i,e=!1){let{inclusiveStart:t,inclusiveEnd:n}=i;return t==null&&(t=i.inclusive),n==null&&(n=i.inclusive),{start:t??e,end:n??e}}function cd(i,e){return i==e||!!(i&&e&&i.compare(e))}function vn(i,e,t,n=0){let s=t.length-1;s>=0&&t[s]+n>=i?t[s]=Math.max(t[s],e):t.push(i,e)}class oi extends nn{constructor(e,t){super(),this.tagName=e,this.attributes=t}eq(e){return e==this||e instanceof oi&&this.tagName==e.tagName&&mo(this.attributes,e.attributes)}static create(e){return new oi(e.tagName,e.attributes||Qi)}static set(e,t=!1){return Q.of(e,t)}}oi.prototype.startSide=oi.prototype.endSide=-1;function li(i){let e;return i.nodeType==11?e=i.getSelection?i:i.ownerDocument:e=i,e.getSelection()}function Tr(i,e){return e?i==e||i.contains(e.nodeType!=1?e.parentNode:e):!1}function Jn(i,e){if(!e.anchorNode)return!1;try{return Tr(i,e.anchorNode)}catch{return!1}}function Wi(i){return i.nodeType==3?ai(i,0,i.nodeValue.length).getClientRects():i.nodeType==1?i.getClientRects():[]}function Qn(i,e,t,n){return t?hl(i,e,t,n,-1)||hl(i,e,t,n,1):!1}function Vt(i){for(var e=0;;e++)if(i=i.previousSibling,!i)return e}function Zi(i){return i.nodeType==1&&/^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(i.nodeName)}function hl(i,e,t,n,s){for(;;){if(i==t&&e==n)return!0;if(e==(s<0?0:Dt(i))){if(i.nodeName=="DIV")return!1;let r=i.parentNode;if(!r||r.nodeType!=1)return!1;e=Vt(i)+(s<0?0:1),i=r}else if(i.nodeType==1){if(i=i.childNodes[e+(s<0?-1:0)],i.nodeType==1&&i.contentEditable=="false")return!1;e=s<0?Dt(i):0}else return!1}}function Dt(i){return i.nodeType==3?i.nodeValue.length:i.childNodes.length}function es(i,e){let t=e?i.left:i.right;return{left:t,right:t,top:i.top,bottom:i.bottom}}function hd(i){let e=i.visualViewport;return e?{left:0,right:e.width,top:0,bottom:e.height}:{left:0,right:i.innerWidth,top:0,bottom:i.innerHeight}}function Ya(i,e){let t=e.width/i.offsetWidth,n=e.height/i.offsetHeight;return(t>.995&&t<1.005||!isFinite(t)||Math.abs(e.width-i.offsetWidth)<1)&&(t=1),(n>.995&&n<1.005||!isFinite(n)||Math.abs(e.height-i.offsetHeight)<1)&&(n=1),{scaleX:t,scaleY:n}}function ud(i,e,t,n,s,r,o,l){let a=i.ownerDocument,c=a.defaultView||window;for(let h=i,u=!1;h&&!u;)if(h.nodeType==1){let d,f=h==a.body,p=1,m=1;if(f)d=hd(c);else{if(/^(fixed|sticky)$/.test(getComputedStyle(h).position)&&(u=!0),h.scrollHeight<=h.clientHeight&&h.scrollWidth<=h.clientWidth){h=h.assignedSlot||h.parentNode;continue}let k=h.getBoundingClientRect();({scaleX:p,scaleY:m}=Ya(h,k)),d={left:k.left,right:k.left+h.clientWidth*p,top:k.top,bottom:k.top+h.clientHeight*m}}let g=0,b=0;if(s=="nearest")e.top<d.top?(b=e.top-(d.top+o),t>0&&e.bottom>d.bottom+b&&(b=e.bottom-d.bottom+o)):e.bottom>d.bottom&&(b=e.bottom-d.bottom+o,t<0&&e.top-b<d.top&&(b=e.top-(d.top+o)));else{let k=e.bottom-e.top,v=d.bottom-d.top;b=(s=="center"&&k<=v?e.top+k/2-v/2:s=="start"||s=="center"&&t<0?e.top-o:e.bottom-v+o)-d.top}if(n=="nearest"?e.left<d.left?(g=e.left-(d.left+r),t>0&&e.right>d.right+g&&(g=e.right-d.right+r)):e.right>d.right&&(g=e.right-d.right+r,t<0&&e.left<d.left+g&&(g=e.left-(d.left+r))):g=(n=="center"?e.left+(e.right-e.left)/2-(d.right-d.left)/2:n=="start"==l?e.left-r:e.right-(d.right-d.left)+r)-d.left,g||b)if(f)c.scrollBy(g,b);else{let k=0,v=0;if(b){let I=h.scrollTop;h.scrollTop+=b/m,v=(h.scrollTop-I)*m}if(g){let I=h.scrollLeft;h.scrollLeft+=g/p,k=(h.scrollLeft-I)*p}e={left:e.left-k,top:e.top-v,right:e.right-k,bottom:e.bottom-v},k&&Math.abs(k-g)<1&&(n="nearest"),v&&Math.abs(v-b)<1&&(s="nearest")}if(f)break;(e.top<d.top||e.bottom>d.bottom||e.left<d.left||e.right>d.right)&&(e={left:Math.max(e.left,d.left),right:Math.min(e.right,d.right),top:Math.max(e.top,d.top),bottom:Math.min(e.bottom,d.bottom)}),h=h.assignedSlot||h.parentNode}else if(h.nodeType==11)h=h.host;else break}function Ja(i,e=!0){let t=i.ownerDocument,n=null,s=null;for(let r=i.parentNode;r&&!(r==t.body||(!e||n)&&s);)if(r.nodeType==1)!s&&r.scrollHeight>r.clientHeight&&(s=r),e&&!n&&r.scrollWidth>r.clientWidth&&(n=r),r=r.assignedSlot||r.parentNode;else if(r.nodeType==11)r=r.host;else break;return{x:n,y:s}}class dd{constructor(){this.anchorNode=null,this.anchorOffset=0,this.focusNode=null,this.focusOffset=0}eq(e){return this.anchorNode==e.anchorNode&&this.anchorOffset==e.anchorOffset&&this.focusNode==e.focusNode&&this.focusOffset==e.focusOffset}setRange(e){let{anchorNode:t,focusNode:n}=e;this.set(t,Math.min(e.anchorOffset,t?Dt(t):0),n,Math.min(e.focusOffset,n?Dt(n):0))}set(e,t,n,s){this.anchorNode=e,this.anchorOffset=t,this.focusNode=n,this.focusOffset=s}}let Yt=null;O.safari&&O.safari_version>=26&&(Yt=!1);function Qa(i){if(i.setActive)return i.setActive();if(Yt)return i.focus(Yt);let e=[];for(let t=i;t&&(e.push(t,t.scrollTop,t.scrollLeft),t!=t.ownerDocument);t=t.parentNode);if(i.focus(Yt==null?{get preventScroll(){return Yt={preventScroll:!0},!0}}:void 0),!Yt){Yt=!1;for(let t=0;t<e.length;){let n=e[t++],s=e[t++],r=e[t++];n.scrollTop!=s&&(n.scrollTop=s),n.scrollLeft!=r&&(n.scrollLeft=r)}}}let ul;function ai(i,e,t=e){let n=ul||(ul=document.createRange());return n.setEnd(i,t),n.setStart(i,e),n}function xn(i,e,t,n){let s={key:e,code:e,keyCode:t,which:t,cancelable:!0};n&&({altKey:s.altKey,ctrlKey:s.ctrlKey,shiftKey:s.shiftKey,metaKey:s.metaKey}=n);let r=new KeyboardEvent("keydown",s);r.synthetic=!0,i.dispatchEvent(r);let o=new KeyboardEvent("keyup",s);return o.synthetic=!0,i.dispatchEvent(o),r.defaultPrevented||o.defaultPrevented}function fd(i){for(;i;){if(i&&(i.nodeType==9||i.nodeType==11&&i.host))return i;i=i.assignedSlot||i.parentNode}return null}function pd(i,e){let t=e.focusNode,n=e.focusOffset;if(!t||e.anchorNode!=t||e.anchorOffset!=n)return!1;for(n=Math.min(n,Dt(t));;)if(n){if(t.nodeType!=1)return!1;let s=t.childNodes[n-1];s.contentEditable=="false"?n--:(t=s,n=Dt(t))}else{if(t==i)return!0;n=Vt(t),t=t.parentNode}}function Za(i){return i instanceof Window?i.pageYOffset>Math.max(0,i.document.documentElement.scrollHeight-i.innerHeight-4):i.scrollTop>Math.max(1,i.scrollHeight-i.clientHeight-4)}function ec(i,e){for(let t=i,n=e;;){if(t.nodeType==3&&n>0)return{node:t,offset:n};if(t.nodeType==1&&n>0){if(t.contentEditable=="false")return null;t=t.childNodes[n-1],n=Dt(t)}else if(t.parentNode&&!Zi(t))n=Vt(t),t=t.parentNode;else return null}}function tc(i,e){for(let t=i,n=e;;){if(t.nodeType==3&&n<t.nodeValue.length)return{node:t,offset:n};if(t.nodeType==1&&n<t.childNodes.length){if(t.contentEditable=="false")return null;t=t.childNodes[n],n=0}else if(t.parentNode&&!Zi(t))n=Vt(t)+1,t=t.parentNode;else return null}}class it{constructor(e,t,n=!0){this.node=e,this.offset=t,this.precise=n}static before(e,t){return new it(e.parentNode,Vt(e),t)}static after(e,t){return new it(e.parentNode,Vt(e)+1,t)}}var de=(function(i){return i[i.LTR=0]="LTR",i[i.RTL=1]="RTL",i})(de||(de={}));const rn=de.LTR,go=de.RTL;function nc(i){let e=[];for(let t=0;t<i.length;t++)e.push(1<<+i[t]);return e}const md=nc("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"),gd=nc("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"),Mr=Object.create(null),ut=[];for(let i of["()","[]","{}"]){let e=i.charCodeAt(0),t=i.charCodeAt(1);Mr[e]=t,Mr[t]=-e}function ic(i){return i<=247?md[i]:1424<=i&&i<=1524?2:1536<=i&&i<=1785?gd[i-1536]:1774<=i&&i<=2220?4:8192<=i&&i<=8204?256:64336<=i&&i<=65023?4:1}const bd=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;class wt{get dir(){return this.level%2?go:rn}constructor(e,t,n){this.from=e,this.to=t,this.level=n}side(e,t){return this.dir==t==e?this.to:this.from}forward(e,t){return e==(this.dir==t)}static find(e,t,n,s){let r=-1;for(let o=0;o<e.length;o++){let l=e[o];if(l.from<=t&&l.to>=t){if(l.level==n)return o;(r<0||(s!=0?s<0?l.from<t:l.to>t:e[r].level>l.level))&&(r=o)}}if(r<0)throw new RangeError("Index out of range");return r}}function sc(i,e){if(i.length!=e.length)return!1;for(let t=0;t<i.length;t++){let n=i[t],s=e[t];if(n.from!=s.from||n.to!=s.to||n.direction!=s.direction||!sc(n.inner,s.inner))return!1}return!0}const le=[];function yd(i,e,t,n,s){for(let r=0;r<=n.length;r++){let o=r?n[r-1].to:e,l=r<n.length?n[r].from:t,a=r?256:s;for(let c=o,h=a,u=a;c<l;c++){let d=ic(i.charCodeAt(c));d==512?d=h:d==8&&u==4&&(d=16),le[c]=d==4?2:d,d&7&&(u=d),h=d}for(let c=o,h=a,u=a;c<l;c++){let d=le[c];if(d==128)c<l-1&&h==le[c+1]&&h&24?d=le[c]=h:le[c]=256;else if(d==64){let f=c+1;for(;f<l&&le[f]==64;)f++;let p=c&&h==8||f<t&&le[f]==8?u==1?1:8:256;for(let m=c;m<f;m++)le[m]=p;c=f-1}else d==8&&u==1&&(le[c]=1);h=d,d&7&&(u=d)}}}function wd(i,e,t,n,s){let r=s==1?2:1;for(let o=0,l=0,a=0;o<=n.length;o++){let c=o?n[o-1].to:e,h=o<n.length?n[o].from:t;for(let u=c,d,f,p;u<h;u++)if(f=Mr[d=i.charCodeAt(u)])if(f<0){for(let m=l-3;m>=0;m-=3)if(ut[m+1]==-f){let g=ut[m+2],b=g&2?s:g&4?g&1?r:s:0;b&&(le[u]=le[ut[m]]=b),l=m;break}}else{if(ut.length==189)break;ut[l++]=u,ut[l++]=d,ut[l++]=a}else if((p=le[u])==2||p==1){let m=p==s;a=m?0:1;for(let g=l-3;g>=0;g-=3){let b=ut[g+2];if(b&2)break;if(m)ut[g+2]|=2;else{if(b&4)break;ut[g+2]|=4}}}}}function vd(i,e,t,n){for(let s=0,r=n;s<=t.length;s++){let o=s?t[s-1].to:i,l=s<t.length?t[s].from:e;for(let a=o;a<l;){let c=le[a];if(c==256){let h=a+1;for(;;)if(h==l){if(s==t.length)break;h=t[s++].to,l=s<t.length?t[s].from:e}else if(le[h]==256)h++;else break;let u=r==1,d=(h<e?le[h]:n)==1,f=u==d?u?1:2:n;for(let p=h,m=s,g=m?t[m-1].to:i;p>a;)p==g&&(p=t[--m].from,g=m?t[m-1].to:i),le[--p]=f;a=h}else r=c,a++}}}function Er(i,e,t,n,s,r,o){let l=n%2?2:1;if(n%2==s%2)for(let a=e,c=0;a<t;){let h=!0,u=!1;if(c==r.length||a<r[c].from){let m=le[a];m!=l&&(h=!1,u=m==16)}let d=!h&&l==1?[]:null,f=h?n:n+1,p=a;e:for(;;)if(c<r.length&&p==r[c].from){if(u)break e;let m=r[c];if(!h)for(let g=m.to,b=c+1;;){if(g==t)break e;if(b<r.length&&r[b].from==g)g=r[b++].to;else{if(le[g]==l)break e;break}}if(c++,d)d.push(m);else{m.from>a&&o.push(new wt(a,m.from,f));let g=m.direction==rn!=!(f%2);Br(i,g?n+1:n,s,m.inner,m.from,m.to,o),a=m.to}p=m.to}else{if(p==t||(h?le[p]!=l:le[p]==l))break;p++}d?Er(i,a,p,n+1,s,d,o):a<p&&o.push(new wt(a,p,f)),a=p}else for(let a=t,c=r.length;a>e;){let h=!0,u=!1;if(!c||a>r[c-1].to){let m=le[a-1];m!=l&&(h=!1,u=m==16)}let d=!h&&l==1?[]:null,f=h?n:n+1,p=a;e:for(;;)if(c&&p==r[c-1].to){if(u)break e;let m=r[--c];if(!h)for(let g=m.from,b=c;;){if(g==e)break e;if(b&&r[b-1].to==g)g=r[--b].from;else{if(le[g-1]==l)break e;break}}if(d)d.push(m);else{m.to<a&&o.push(new wt(m.to,a,f));let g=m.direction==rn!=!(f%2);Br(i,g?n+1:n,s,m.inner,m.from,m.to,o),a=m.from}p=m.from}else{if(p==e||(h?le[p-1]!=l:le[p-1]==l))break;p--}d?Er(i,p,a,n+1,s,d,o):p<a&&o.push(new wt(p,a,f)),a=p}}function Br(i,e,t,n,s,r,o){let l=e%2?2:1;yd(i,s,r,n,l),wd(i,s,r,n,l),vd(s,r,n,l),Er(i,s,r,e,t,n,o)}function xd(i,e,t){if(!i)return[new wt(0,0,e==go?1:0)];if(e==rn&&!t.length&&!bd.test(i))return rc(i.length);if(t.length)for(;i.length>le.length;)le[le.length]=256;let n=[],s=e==rn?0:1;return Br(i,s,s,t,0,i.length,n),n}function rc(i){return[new wt(0,i,0)]}let oc="";function kd(i,e,t,n,s){var r;let o=n.head-i.from,l=wt.find(e,o,(r=n.bidiLevel)!==null&&r!==void 0?r:-1,n.assoc),a=e[l],c=a.side(s,t);if(o==c){let d=l+=s?1:-1;if(d<0||d>=e.length)return null;a=e[l=d],o=a.side(!s,t),c=a.side(s,t)}let h=Me(i.text,o,a.forward(s,t));(h<a.from||h>a.to)&&(h=c),oc=i.text.slice(Math.min(o,h),Math.max(o,h));let u=l==(s?e.length-1:0)?null:e[l+(s?1:-1)];return u&&h==c&&u.level+(s?0:1)<a.level?_.cursor(u.side(!s,t)+i.from,u.forward(s,t)?1:-1,u.level):_.cursor(h+i.from,a.forward(s,t)?-1:1,a.level)}function _d(i,e,t){for(let n=e;n<t;n++){let s=ic(i.charCodeAt(n));if(s==1)return rn;if(s==2||s==4)return go}return rn}const lc=z.define(),ac=z.define(),cc=z.define(),hc=z.define(),Dr=z.define(),uc=z.define(),dc=z.define(),bo=z.define(),yo=z.define(),fc=z.define({combine:i=>i.some(e=>e)}),pc=z.define({combine:i=>i.some(e=>e)}),mc=z.define();class kn{constructor(e,t="nearest",n="nearest",s=5,r=5,o=!1){this.range=e,this.y=t,this.x=n,this.yMargin=s,this.xMargin=r,this.isSnapshot=o}map(e){return e.empty?this:new kn(this.range.map(e),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}clip(e){return this.range.to<=e.doc.length?this:new kn(_.cursor(e.doc.length),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}}const _i=ye.define({map:(i,e)=>i.map(e)}),gc=ye.define();function vt(i,e,t){let n=i.facet(hc);n.length?n[0](e):window.onerror&&window.onerror(String(e),t,void 0,void 0,e)||(t?console.error(t+":",e):console.error(e))}const Mt=z.define({combine:i=>i.length?i[0]:!0});let Sd=0;const mn=z.define({combine(i){return i.filter((e,t)=>{for(let n=0;n<t;n++)if(i[n].plugin==e.plugin)return!1;return!0})}});class St{constructor(e,t,n,s,r){this.id=e,this.create=t,this.domEventHandlers=n,this.domEventObservers=s,this.baseExtensions=r(this),this.extension=this.baseExtensions.concat(mn.of({plugin:this,arg:void 0}))}of(e){return this.baseExtensions.concat(mn.of({plugin:this,arg:e}))}static define(e,t){const{eventHandlers:n,eventObservers:s,provide:r,decorations:o}=t||{};return new St(Sd++,e,n,s,l=>{let a=[];return o&&a.push(ms.of(c=>{let h=c.plugin(l);return h?o(h):we.none})),r&&a.push(r(l)),a})}static fromClass(e,t){return St.define((n,s)=>new e(n,s),t)}}class Ns{constructor(e){this.spec=e,this.mustUpdate=null,this.value=null}get plugin(){return this.spec&&this.spec.plugin}update(e){if(this.value){if(this.mustUpdate){let t=this.mustUpdate;if(this.mustUpdate=null,this.value.update)try{this.value.update(t)}catch(n){if(vt(t.state,n,"CodeMirror plugin crashed"),this.value.destroy)try{this.value.destroy()}catch{}this.deactivate()}}}else if(this.spec)try{this.value=this.spec.plugin.create(e,this.spec.arg)}catch(t){vt(e.state,t,"CodeMirror plugin crashed"),this.deactivate()}return this}destroy(e){var t;if(!((t=this.value)===null||t===void 0)&&t.destroy)try{this.value.destroy()}catch(n){vt(e.state,n,"CodeMirror plugin crashed")}}deactivate(){this.spec=this.value=null}}const bc=z.define(),wo=z.define(),ms=z.define(),yc=z.define(),vo=z.define(),bi=z.define(),wc=z.define();function dl(i,e){let t=i.state.facet(wc);if(!t.length)return t;let n=t.map(r=>r instanceof Function?r(i):r),s=[];return Q.spans(n,e.from,e.to,{point(){},span(r,o,l,a){let c=r-e.from,h=o-e.from,u=s;for(let d=l.length-1;d>=0;d--,a--){let f=l[d].spec.bidiIsolate,p;if(f==null&&(f=_d(e.text,c,h)),a>0&&u.length&&(p=u[u.length-1]).to==c&&p.direction==f)p.to=h,u=p.inner;else{let m={from:c,to:h,direction:f,inner:[]};u.push(m),u=m.inner}}}}),s}const vc=z.define();function xc(i){let e=0,t=0,n=0,s=0;for(let r of i.state.facet(vc)){let o=r(i);o&&(o.left!=null&&(e=Math.max(e,o.left)),o.right!=null&&(t=Math.max(t,o.right)),o.top!=null&&(n=Math.max(n,o.top)),o.bottom!=null&&(s=Math.max(s,o.bottom)))}return{left:e,right:t,top:n,bottom:s}}const jn=z.define();class Ge{constructor(e,t,n,s){this.fromA=e,this.toA=t,this.fromB=n,this.toB=s}join(e){return new Ge(Math.min(this.fromA,e.fromA),Math.max(this.toA,e.toA),Math.min(this.fromB,e.fromB),Math.max(this.toB,e.toB))}addToSet(e){let t=e.length,n=this;for(;t>0;t--){let s=e[t-1];if(!(s.fromA>n.toA)){if(s.toA<n.fromA)break;n=n.join(s),e.splice(t-1,1)}}return e.splice(t,0,n),e}static extendWithRanges(e,t){if(t.length==0)return e;let n=[];for(let s=0,r=0,o=0;;){let l=s<e.length?e[s].fromB:1e9,a=r<t.length?t[r]:1e9,c=Math.min(l,a);if(c==1e9)break;let h=c+o,u=c,d=h;for(;;)if(r<t.length&&t[r]<=u){let f=t[r+1];r+=2,u=Math.max(u,f);for(let p=s;p<e.length&&e[p].fromB<=u;p++)o=e[p].toA-e[p].toB;d=Math.max(d,f+o)}else if(s<e.length&&e[s].fromB<=u){let f=e[s++];u=Math.max(u,f.toB),d=Math.max(d,f.toA),o=f.toA-f.toB}else break;n.push(new Ge(h,d,c,u))}return n}}class ts{constructor(e,t,n){this.view=e,this.state=t,this.transactions=n,this.flags=0,this.startState=e.state,this.changes=ve.empty(this.startState.doc.length);for(let r of n)this.changes=this.changes.compose(r.changes);let s=[];this.changes.iterChangedRanges((r,o,l,a)=>s.push(new Ge(r,o,l,a))),this.changedRanges=s}static create(e,t,n){return new ts(e,t,n)}get viewportChanged(){return(this.flags&4)>0}get viewportMoved(){return(this.flags&8)>0}get heightChanged(){return(this.flags&2)>0}get geometryChanged(){return this.docChanged||(this.flags&18)>0}get focusChanged(){return(this.flags&1)>0}get docChanged(){return!this.changes.empty}get selectionSet(){return this.transactions.some(e=>e.selection)}get empty(){return this.flags==0&&this.transactions.length==0}}const Cd=[];class me{constructor(e,t,n=0){this.dom=e,this.length=t,this.flags=n,this.parent=null,e.cmTile=this}get breakAfter(){return this.flags&1}get children(){return Cd}isWidget(){return!1}get isHidden(){return!1}isComposite(){return!1}isLine(){return!1}isText(){return!1}isBlock(){return!1}get domAttrs(){return null}sync(e){if(this.flags|=2,this.flags&4){this.flags&=-5;let t=this.domAttrs;t&&ld(this.dom,t)}}toString(){return this.constructor.name+(this.children.length?`(${this.children})`:"")+(this.breakAfter?"#":"")}destroy(){this.parent=null}setDOM(e){this.dom=e,e.cmTile=this}get posAtStart(){return this.parent?this.parent.posBefore(this):0}get posAtEnd(){return this.posAtStart+this.length}posBefore(e,t=this.posAtStart){let n=t;for(let s of this.children){if(s==e)return n;n+=s.length+s.breakAfter}throw new RangeError("Invalid child in posBefore")}posAfter(e){return this.posBefore(e)+e.length}covers(e){return!0}coordsIn(e,t){return null}domPosFor(e,t){let n=Vt(this.dom),s=this.length?e>0:t>0;return new it(this.parent.dom,n+(s?1:0),e==0||e==this.length)}markDirty(e){this.flags&=-3,e&&(this.flags|=4),this.parent&&this.parent.flags&2&&this.parent.markDirty(!1)}get overrideDOMText(){return null}get root(){for(let e=this;e;e=e.parent)if(e instanceof bs)return e;return null}static get(e){return e.cmTile}}class gs extends me{constructor(e){super(e,0),this._children=[]}isComposite(){return!0}get children(){return this._children}get lastChild(){return this.children.length?this.children[this.children.length-1]:null}append(e){this.children.push(e),e.parent=this}sync(e){if(this.flags&2)return;super.sync(e);let t=this.dom,n=null,s,r=(e==null?void 0:e.node)==t?e:null,o=0;for(let l of this.children){if(l.sync(e),o+=l.length+l.breakAfter,s=n?n.nextSibling:t.firstChild,r&&s!=l.dom&&(r.written=!0),l.dom.parentNode==t)for(;s&&s!=l.dom;)s=fl(s);else t.insertBefore(l.dom,s);n=l.dom}for(s=n?n.nextSibling:t.firstChild,r&&s&&(r.written=!0);s;)s=fl(s);this.length=o}}function fl(i){let e=i.nextSibling;return i.parentNode.removeChild(i),e}class bs extends gs{constructor(e,t){super(t),this.view=e}owns(e){for(;e;e=e.parent)if(e==this)return!0;return!1}isBlock(){return!0}nearest(e){for(;;){if(!e)return null;let t=me.get(e);if(t&&this.owns(t))return t;e=e.parentNode}}blockTiles(e){for(let t=[],n=this,s=0,r=0;;)if(s==n.children.length){if(!t.length)return;n=n.parent,n.breakAfter&&r++,s=t.pop()}else{let o=n.children[s++];if(o instanceof Bt)t.push(s),n=o,s=0;else{let l=r+o.length,a=e(o,r);if(a!==void 0)return a;r=l+o.breakAfter}}}resolveBlock(e,t){let n,s=-1,r,o=-1;if(this.blockTiles((l,a)=>{let c=a+l.length;if(e>=a&&e<=c){if(l.isWidget()&&t>=-1&&t<=1){if(l.flags&32)return!0;l.flags&16&&(n=void 0)}(a<e||e==c&&(t<-1?l.length:l.covers(1)))&&(!n||!l.isWidget()&&n.isWidget())&&(n=l,s=e-a),(c>e||e==a&&(t>1?l.length:l.covers(-1)))&&(!r||!l.isWidget()&&r.isWidget())&&(r=l,o=e-a)}}),!n&&!r)throw new Error("No tile at position "+e);return n&&t<0||!r?{tile:n,offset:s}:{tile:r,offset:o}}}class Bt extends gs{constructor(e,t){super(e),this.wrapper=t}isBlock(){return!0}covers(e){return this.children.length?e<0?this.children[0].covers(-1):this.lastChild.covers(1):!1}get domAttrs(){return this.wrapper.attributes}static of(e,t){let n=new Bt(t||document.createElement(e.tagName),e);return t||(n.flags|=4),n}}class Sn extends gs{constructor(e,t){super(e),this.attrs=t}isLine(){return!0}static start(e,t,n){let s=new Sn(t||document.createElement("div"),e);return(!t||!n)&&(s.flags|=4),s}get domAttrs(){return this.attrs}resolveInline(e,t,n){let s=null,r=-1,o=null,l=-1;function a(h,u){for(let d=0,f=0;d<h.children.length&&f<=u;d++){let p=h.children[d],m=f+p.length;m>=u&&(p.isComposite()?a(p,u-f):(!o||o.isHidden&&(t>0||n&&Td(o,p)))&&(m>u||p.flags&32)?(o=p,l=u-f):(f<u||p.flags&16&&!p.isHidden)&&(s=p,r=u-f)),f=m}}a(this,e);let c=(t<0?s:o)||s||o;return c?{tile:c,offset:c==s?r:l}:null}coordsIn(e,t){let n=this.resolveInline(e,t,!0);return n?n.tile.coordsIn(Math.max(0,n.offset),t):Ad(this)}domIn(e,t){let n=this.resolveInline(e,t);if(n){let{tile:s,offset:r}=n;if(this.dom.contains(s.dom))return s.isText()?new it(s.dom,Math.min(s.dom.nodeValue.length,r)):s.domPosFor(r,s.flags&16?1:s.flags&32?-1:t);let o=n.tile.parent,l=!1;for(let a of o.children){if(l)return new it(a.dom,0);a==n.tile&&(l=!0)}}return new it(this.dom,0)}}function Ad(i){let e=i.dom.lastChild;if(!e)return i.dom.getBoundingClientRect();let t=Wi(e);return t[t.length-1]||null}function Td(i,e){let t=i.coordsIn(0,1),n=e.coordsIn(0,1);return t&&n&&n.top<t.bottom}class Re extends gs{constructor(e,t){super(e),this.mark=t}get domAttrs(){return this.mark.attrs}static of(e,t){let n=new Re(t||document.createElement(e.tagName),e);return t||(n.flags|=4),n}}class Zt extends me{constructor(e,t){super(e,t.length),this.text=t}sync(e){this.flags&2||(super.sync(e),this.dom.nodeValue!=this.text&&(e&&e.node==this.dom&&(e.written=!0),this.dom.nodeValue=this.text))}isText(){return!0}toString(){return JSON.stringify(this.text)}coordsIn(e,t){let n=this.dom.nodeValue.length;e>n&&(e=n);let s=e,r=e,o=0;e==0&&t<0||e==n&&t>=0?O.chrome||O.gecko||(e?(s--,o=1):r<n&&(r++,o=-1)):t<0?s--:r<n&&r++;let l=ai(this.dom,s,r).getClientRects();if(!l.length)return null;let a=l[(o?o<0:t>=0)?0:l.length-1];return O.safari&&!o&&a.width==0&&(a=Array.prototype.find.call(l,c=>c.width)||a),o?es(a,o<0):a||null}static of(e,t){let n=new Zt(t||document.createTextNode(e),e);return t||(n.flags|=2),n}}class on extends me{constructor(e,t,n,s){super(e,t,s),this.widget=n}isWidget(){return!0}get isHidden(){return this.widget.isHidden}covers(e){return this.flags&48?!1:(this.flags&(e<0?64:128))>0}coordsIn(e,t){return this.coordsInWidget(e,t,!1)}coordsInWidget(e,t,n){let s=this.widget.coordsAt(this.dom,e,t);if(s)return s;if(n)return es(this.dom.getBoundingClientRect(),this.length?e==0:t<=0);{let r=this.dom.getClientRects(),o=null;if(!r.length)return null;let l=this.flags&16?!0:this.flags&32?!1:e>0;for(let a=l?r.length-1:0;o=r[a],!(e>0?a==0:a==r.length-1||o.top<o.bottom);a+=l?-1:1);return es(o,!l)}}get overrideDOMText(){if(!this.length)return Z.empty;let{root:e}=this;if(!e)return Z.empty;let t=this.posAtStart;return e.view.state.doc.slice(t,t+this.length)}destroy(){super.destroy(),this.widget.destroy(this.dom)}static of(e,t,n,s,r){return r||(r=e.toDOM(t),e.editable||(r.contentEditable="false")),new on(r,n,e,s)}}class ns extends me{constructor(e){let t=document.createElement("img");t.className="cm-widgetBuffer",t.setAttribute("aria-hidden","true"),super(t,0,e)}get isHidden(){return!0}get overrideDOMText(){return Z.empty}coordsIn(e){return this.dom.getBoundingClientRect()}}class Md{constructor(e){this.index=0,this.beforeBreak=!1,this.parents=[],this.tile=e}advance(e,t,n){let{tile:s,index:r,beforeBreak:o,parents:l}=this;for(;e||t>0;)if(s.isComposite())if(o){if(!e)break;n&&n.break(),e--,o=!1}else if(r==s.children.length){if(!e&&!l.length)break;n&&n.leave(s),o=!!s.breakAfter,{tile:s,index:r}=l.pop(),r++}else{let a=s.children[r],c=a.breakAfter;(t>0?a.length<=e:a.length<e)&&(!n||n.skip(a,0,a.length)!==!1||!a.isComposite)?(o=!!c,r++,e-=a.length):(l.push({tile:s,index:r}),s=a,r=0,n&&a.isComposite()&&n.enter(a))}else if(r==s.length)o=!!s.breakAfter,{tile:s,index:r}=l.pop(),r++;else if(e){let a=Math.min(e,s.length-r);n&&n.skip(s,r,r+a),e-=a,r+=a}else break;return this.tile=s,this.index=r,this.beforeBreak=o,this}get root(){return this.parents.length?this.parents[0].tile:this.tile}}class Ed{constructor(e,t,n,s){this.from=e,this.to=t,this.wrapper=n,this.rank=s}}class Bd{constructor(e,t,n){this.cache=e,this.root=t,this.blockWrappers=n,this.curLine=null,this.lastBlock=null,this.afterWidget=null,this.pos=0,this.wrappers=[],this.wrapperPos=0}addText(e,t,n,s){var r;this.flushBuffer();let o=this.ensureMarks(t,n),l=o.lastChild;if(l&&l.isText()&&!(l.flags&8)&&l.length+e.length<512){this.cache.reused.set(l,2);let a=o.children[o.children.length-1]=new Zt(l.dom,l.text+e);a.parent=o}else o.append(s||Zt.of(e,(r=this.cache.find(Zt))===null||r===void 0?void 0:r.dom));this.pos+=e.length,this.afterWidget=null}addComposition(e,t){let n=this.curLine;n.dom!=t.line.dom&&(n.setDOM(this.cache.reused.has(t.line)?Fs(t.line.dom):t.line.dom),this.cache.reused.set(t.line,2));let s=n;for(let l=t.marks.length-1;l>=0;l--){let a=t.marks[l],c=s.lastChild;if(c instanceof Re&&c.mark.eq(a.mark))c.dom!=a.dom&&c.setDOM(Fs(a.dom)),s=c;else{if(this.cache.reused.get(a)){let u=me.get(a.dom);u&&u.setDOM(Fs(a.dom))}let h=Re.of(a.mark,a.dom);s.append(h),s=h}this.cache.reused.set(a,2)}let r=me.get(e.text);r&&this.cache.reused.set(r,2);let o=new Zt(e.text,e.text.nodeValue);o.flags|=8,s.append(o)}addInlineWidget(e,t,n){let s=this.afterWidget&&e.flags&48&&(this.afterWidget.flags&48)==(e.flags&48);s||this.flushBuffer();let r=this.ensureMarks(t,n);!s&&!(e.flags&16)&&r.append(this.getBuffer(1)),r.append(e),this.pos+=e.length,this.afterWidget=e}addMark(e,t,n){this.flushBuffer(),this.ensureMarks(t,n).append(e),this.pos+=e.length,this.afterWidget=null}addBlockWidget(e){this.getBlockPos().append(e),this.pos+=e.length,this.lastBlock=e,this.endLine()}continueWidget(e){let t=this.afterWidget||this.lastBlock;t.length+=e,this.pos+=e}addLineStart(e,t){var n;e||(e=kc);let s=Sn.start(e,t||((n=this.cache.find(Sn))===null||n===void 0?void 0:n.dom),!!t);this.getBlockPos().append(this.lastBlock=this.curLine=s)}addLine(e){this.getBlockPos().append(e),this.pos+=e.length,this.lastBlock=e,this.endLine()}addBreak(){this.lastBlock.flags|=1,this.endLine(),this.pos++}addLineStartIfNotCovered(e){this.blockPosCovered()||this.addLineStart(e)}ensureLine(e){this.curLine||this.addLineStart(e)}ensureMarks(e,t){var n;let s=this.curLine;for(let r=e.length-1;r>=0;r--){let o=e[r],l;if(t>0&&(l=s.lastChild)&&l instanceof Re&&l.mark.eq(o))s=l,t--;else{let a=Re.of(o,(n=this.cache.find(Re,c=>c.mark.eq(o)))===null||n===void 0?void 0:n.dom);s.append(a),s=a,t=0}}return s}endLine(){if(this.curLine){this.flushBuffer();let e=this.curLine.lastChild;(!e||!pl(this.curLine,!1)||e.dom.nodeName!="BR"&&e.isWidget()&&!(O.ios&&pl(this.curLine,!0)))&&this.curLine.append(this.cache.findWidget(Hs,0,32)||new on(Hs.toDOM(),0,Hs,32)),this.curLine=this.afterWidget=null}}updateBlockWrappers(){this.wrapperPos>this.pos+1e4&&(this.blockWrappers.goto(this.pos),this.wrappers.length=0);for(let e=this.wrappers.length-1;e>=0;e--)this.wrappers[e].to<this.pos&&this.wrappers.splice(e,1);for(let e=this.blockWrappers;e.value&&e.from<=this.pos;e.next())if(e.to>=this.pos){let t=new Ed(e.from,e.to,e.value,e.rank),n=this.wrappers.length;for(;n>0&&(this.wrappers[n-1].rank-t.rank||this.wrappers[n-1].to-t.to)<0;)n--;this.wrappers.splice(n,0,t)}this.wrapperPos=this.pos}getBlockPos(){var e;this.updateBlockWrappers();let t=this.root;for(let n of this.wrappers){let s=t.lastChild;if(n.from<this.pos&&s instanceof Bt&&s.wrapper.eq(n.wrapper))t=s;else{let r=Bt.of(n.wrapper,(e=this.cache.find(Bt,o=>o.wrapper.eq(n.wrapper)))===null||e===void 0?void 0:e.dom);t.append(r),t=r}}return t}blockPosCovered(){let e=this.lastBlock;return e!=null&&!e.breakAfter&&(!e.isWidget()||(e.flags&160)>0)}getBuffer(e){let t=2|(e<0?16:32),n=this.cache.find(ns,void 0,1);return n&&(n.flags=t),n||new ns(t)}flushBuffer(){this.afterWidget&&!(this.afterWidget.flags&32)&&(this.afterWidget.parent.append(this.getBuffer(-1)),this.afterWidget=null)}}class Dd{constructor(e){this.skipCount=0,this.text="",this.textOff=0,this.cursor=e.iter()}skip(e){this.textOff+e<=this.text.length?this.textOff+=e:(this.skipCount+=e-(this.text.length-this.textOff),this.text="",this.textOff=0)}next(e){if(this.textOff==this.text.length){let{value:s,lineBreak:r,done:o}=this.cursor.next(this.skipCount);if(this.skipCount=0,o)throw new Error("Ran out of text content when drawing inline views");this.text=s;let l=this.textOff=Math.min(e,s.length);return r?null:s.slice(0,l)}let t=Math.min(this.text.length,this.textOff+e),n=this.text.slice(this.textOff,t);return this.textOff=t,n}}const is=[on,Sn,Zt,Re,ns,Bt,bs];for(let i=0;i<is.length;i++)is[i].bucket=i;class Pd{constructor(e){this.view=e,this.buckets=is.map(()=>[]),this.index=is.map(()=>0),this.reused=new Map}add(e){let t=e.constructor.bucket,n=this.buckets[t];n.length<6?n.push(e):n[this.index[t]=(this.index[t]+1)%6]=e}find(e,t,n=2){let s=e.bucket,r=this.buckets[s],o=this.index[s];for(let l=r.length-1;l>=0;l--){let a=(l+o)%r.length,c=r[a];if((!t||t(c))&&!this.reused.has(c))return r.splice(a,1),a<o&&this.index[s]--,this.reused.set(c,n),c}return null}findWidget(e,t,n){let s=this.buckets[0];if(s.length)for(let r=0,o=0;;r++){if(r==s.length){if(o)return null;o=1,r=0}let l=s[r];if(!this.reused.has(l)&&(o==0?l.widget.compare(e):l.widget.constructor==e.constructor&&e.updateDOM(l.dom,this.view,l.widget)))return s.splice(r,1),r<this.index[0]&&this.index[0]--,l.widget==e&&l.length==t&&(l.flags&497)==n?(this.reused.set(l,1),l):(this.reused.set(l,2),new on(l.dom,t,e,l.flags&-498|n))}}reuse(e){return this.reused.set(e,1),e}maybeReuse(e,t=2){if(!this.reused.has(e))return this.reused.set(e,t),e.dom}clear(){for(let e=0;e<this.buckets.length;e++)this.buckets[e].length=this.index[e]=0}}class Od{constructor(e,t,n,s,r){this.view=e,this.decorations=s,this.disallowBlockEffectsFor=r,this.openWidget=!1,this.openMarks=0,this.cache=new Pd(e),this.text=new Dd(e.state.doc),this.builder=new Bd(this.cache,new bs(e,e.contentDOM),Q.iter(n)),this.cache.reused.set(t,2),this.old=new Md(t),this.reuseWalker={skip:(o,l,a)=>{if(this.cache.add(o),o.isComposite())return!1},enter:o=>this.cache.add(o),leave:()=>{},break:()=>{}}}run(e,t){let n=t&&this.getCompositionContext(t.text);for(let s=0,r=0,o=0;;){let l=o<e.length?e[o++]:null,a=l?l.fromA:this.old.root.length;if(a>s){let c=a-s;this.preserve(c,!o,!l),s=a,r+=c}if(!l)break;t&&l.fromA<=t.range.fromA&&l.toA>=t.range.toA?(this.forward(l.fromA,t.range.fromA,t.range.fromA<t.range.toA?1:-1),this.emit(r,t.range.fromB),this.cache.clear(),this.builder.addComposition(t,n),this.text.skip(t.range.toB-t.range.fromB),this.forward(t.range.fromA,l.toA),this.emit(t.range.toB,l.toB)):(this.forward(l.fromA,l.toA),this.emit(r,l.toB)),r=l.toB,s=l.toA}return this.builder.curLine&&this.builder.endLine(),this.builder.root}preserve(e,t,n){let s=Id(this.old),r=this.openMarks;this.old.advance(e,n?1:-1,{skip:(o,l,a)=>{if(o.isWidget())if(this.openWidget)this.builder.continueWidget(a-l);else{let c=a>0||l<o.length?on.of(o.widget,this.view,a-l,o.flags&496,this.cache.maybeReuse(o)):this.cache.reuse(o);c.flags&256?(c.flags&=-2,this.builder.addBlockWidget(c)):(this.builder.ensureLine(null),this.builder.addInlineWidget(c,s,r),r=s.length)}else if(o.isText())this.builder.ensureLine(null),!l&&a==o.length&&!this.cache.reused.has(o)?this.builder.addText(o.text,s,r,this.cache.reuse(o)):(this.cache.add(o),this.builder.addText(o.text.slice(l,a),s,r)),r=s.length;else if(o.isLine())o.flags&=-2,this.cache.reused.set(o,1),this.builder.addLine(o);else if(o instanceof ns)this.cache.add(o);else if(o instanceof Re)this.builder.ensureLine(null),this.builder.addMark(o,s,r),this.cache.reused.set(o,1),r=s.length;else return!1;this.openWidget=!1},enter:o=>{o.isLine()?this.builder.addLineStart(o.attrs,this.cache.maybeReuse(o)):(this.cache.add(o),o instanceof Re&&s.unshift(o.mark)),this.openWidget=!1},leave:o=>{o.isLine()?s.length&&(s.length=r=0):o instanceof Re&&(s.shift(),r=Math.min(r,s.length))},break:()=>{this.builder.addBreak(),this.openWidget=!1}}),this.text.skip(e)}emit(e,t){let n=null,s=this.builder,r=0,o=Q.spans(this.decorations,e,t,{point:(l,a,c,h,u,d)=>{if(c instanceof sn){if(this.disallowBlockEffectsFor[d]){if(c.block)throw new RangeError("Block decorations may not be specified via plugins");if(a>this.view.state.doc.lineAt(l).to)throw new RangeError("Decorations that replace line breaks may not be specified via plugins")}if(r=h.length,u>h.length)s.continueWidget(a-l);else{let f=c.widget||(c.block?Cn.block:Cn.inline),p=Ld(c),m=this.cache.findWidget(f,a-l,p)||on.of(f,this.view,a-l,p);c.block?(c.startSide>0&&s.addLineStartIfNotCovered(n),s.addBlockWidget(m)):(s.ensureLine(n),s.addInlineWidget(m,h,u))}n=null}else n=Rd(n,c);a>l&&this.text.skip(a-l)},span:(l,a,c,h)=>{for(let u=l;u<a;){let d=this.text.next(Math.min(512,a-u));d==null?(s.addLineStartIfNotCovered(n),s.addBreak(),u++):(s.ensureLine(n),s.addText(d,c,u==l?h:c.length),u+=d.length),n=null}}});s.addLineStartIfNotCovered(n),this.openWidget=o>r,this.openMarks=o}forward(e,t,n=1){t-e<=10?this.old.advance(t-e,n,this.reuseWalker):(this.old.advance(5,-1,this.reuseWalker),this.old.advance(t-e-10,-1),this.old.advance(5,n,this.reuseWalker))}getCompositionContext(e){let t=[],n=null;for(let s=e.parentNode;;s=s.parentNode){let r=me.get(s);if(s==this.view.contentDOM)break;r instanceof Re?t.push(r):r!=null&&r.isLine()?n=r:r instanceof Bt||(s.nodeName=="DIV"&&!n&&s!=this.view.contentDOM?n=new Sn(s,kc):n||t.push(Re.of(new mi({tagName:s.nodeName.toLowerCase(),attributes:ad(s)}),s)))}return{line:n,marks:t}}}function pl(i,e){let t=n=>{for(let s of n.children)if((e?s.isText():s.length)||t(s))return!0;return!1};return t(i)}function Ld(i){let e=i.isReplace?(i.startSide<0?64:0)|(i.endSide>0?128:0):i.startSide>0?32:16;return i.block&&(e|=256),e}const kc={class:"cm-line"};function Rd(i,e){let t=e.spec.attributes,n=e.spec.class;return!t&&!n||(i||(i={class:"cm-line"}),t&&po(t,i),n&&(i.class+=" "+n)),i}function Id(i){let e=[];for(let t=i.parents.length;t>1;t--){let n=t==i.parents.length?i.tile:i.parents[t].tile;n instanceof Re&&e.push(n.mark)}return e}function Fs(i){let e=me.get(i);return e&&e.setDOM(i.cloneNode()),i}class Cn extends ps{constructor(e){super(),this.tag=e}eq(e){return e.tag==this.tag}toDOM(){return document.createElement(this.tag)}updateDOM(e){return e.nodeName.toLowerCase()==this.tag}get isHidden(){return!0}}Cn.inline=new Cn("span");Cn.block=new Cn("div");const Hs=new class extends ps{toDOM(){return document.createElement("br")}get isHidden(){return!0}get editable(){return!0}};class ml{constructor(e){this.view=e,this.decorations=[],this.blockWrappers=[],this.dynamicDecorationMap=[!1],this.domChanged=null,this.hasComposition=null,this.editContextFormatting=we.none,this.lastCompositionAfterCursor=!1,this.minWidth=0,this.minWidthFrom=0,this.minWidthTo=0,this.impreciseAnchor=null,this.impreciseHead=null,this.forceSelection=!1,this.lastUpdate=Date.now(),this.updateDeco(),this.tile=new bs(e,e.contentDOM),this.updateInner([new Ge(0,0,0,e.state.doc.length)],null)}update(e){var t;let n=e.changedRanges;this.minWidth>0&&n.length&&(n.every(({fromA:h,toA:u})=>u<this.minWidthFrom||h>this.minWidthTo)?(this.minWidthFrom=e.changes.mapPos(this.minWidthFrom,1),this.minWidthTo=e.changes.mapPos(this.minWidthTo,1)):this.minWidth=this.minWidthFrom=this.minWidthTo=0),this.updateEditContextFormatting(e);let s=-1;this.view.inputState.composing>=0&&!this.view.observer.editContext&&(!((t=this.domChanged)===null||t===void 0)&&t.newSel?s=this.domChanged.newSel.head:!Ud(e.changes,this.hasComposition)&&!e.selectionSet&&(s=e.state.selection.main.head));let r=s>-1?qd(this.view,e.changes,s):null;if(this.domChanged=null,this.hasComposition){let{from:h,to:u}=this.hasComposition;n=new Ge(h,u,e.changes.mapPos(h,-1),e.changes.mapPos(u,1)).addToSet(n.slice())}this.hasComposition=r?{from:r.range.fromB,to:r.range.toB}:null,(O.ie||O.chrome)&&!r&&e&&e.state.doc.lines!=e.startState.doc.lines&&(this.forceSelection=!0);let o=this.decorations,l=this.blockWrappers;this.updateDeco();let a=Hd(o,this.decorations,e.changes);a.length&&(n=Ge.extendWithRanges(n,a));let c=Vd(l,this.blockWrappers,e.changes);return c.length&&(n=Ge.extendWithRanges(n,c)),r&&!n.some(h=>h.fromA<=r.range.fromA&&h.toA>=r.range.toA)&&(n=r.range.addToSet(n.slice())),this.tile.flags&2&&n.length==0?!1:(this.updateInner(n,r),e.transactions.length&&(this.lastUpdate=Date.now()),!0)}updateInner(e,t){this.view.viewState.mustMeasureContent=!0;let{observer:n}=this.view;n.ignore(()=>{if(t||e.length){let o=this.tile,l=new Od(this.view,o,this.blockWrappers,this.decorations,this.dynamicDecorationMap);t&&me.get(t.text)&&l.cache.reused.set(me.get(t.text),2),this.tile=l.run(e,t),Pr(o,l.cache.reused)}this.tile.dom.style.height=this.view.viewState.contentHeight/this.view.scaleY+"px",this.tile.dom.style.flexBasis=this.minWidth?this.minWidth+"px":"";let r=O.chrome||O.ios?{node:n.selectionRange.focusNode,written:!1}:void 0;this.tile.sync(r),r&&(r.written||n.selectionRange.focusNode!=r.node||!this.tile.dom.contains(r.node))&&(this.forceSelection=!0),this.tile.dom.style.height=""});let s=[];if(this.view.viewport.from||this.view.viewport.to<this.view.state.doc.length)for(let r of this.tile.children)r.isWidget()&&r.widget instanceof Ws&&s.push(r.dom);n.updateGaps(s)}updateEditContextFormatting(e){this.editContextFormatting=this.editContextFormatting.map(e.changes);for(let t of e.transactions)for(let n of t.effects)n.is(gc)&&(this.editContextFormatting=n.value)}updateSelection(e=!1,t=!1){(e||!this.view.observer.selectionRange.focusNode)&&this.view.observer.readSelectionRange();let{dom:n}=this.tile,s=this.view.root.activeElement,r=s==n,o=!r&&!(this.view.state.facet(Mt)||n.tabIndex>-1)&&Jn(n,this.view.observer.selectionRange)&&!(s&&n.contains(s));if(!(r||t||o))return;let l=this.forceSelection;this.forceSelection=!1;let a=this.view.state.selection.main,c,h;if(a.empty?h=c=this.inlineDOMNearPos(a.anchor,a.assoc||1):(h=this.inlineDOMNearPos(a.head,a.head==a.from?1:-1),c=this.inlineDOMNearPos(a.anchor,a.anchor==a.from?1:-1)),O.gecko&&a.empty&&!this.hasComposition&&zd(c)){let d=document.createTextNode("");this.view.observer.ignore(()=>c.node.insertBefore(d,c.node.childNodes[c.offset]||null)),c=h=new it(d,0),l=!0}let u=this.view.observer.selectionRange;(l||!u.focusNode||(!Qn(c.node,c.offset,u.anchorNode,u.anchorOffset)||!Qn(h.node,h.offset,u.focusNode,u.focusOffset))&&!this.suppressWidgetCursorChange(u,a))&&(this.view.observer.ignore(()=>{O.android&&O.chrome&&n.contains(u.focusNode)&&$d(u.focusNode,n)&&(n.blur(),n.focus({preventScroll:!0}));let d=li(this.view.root);if(d)if(a.empty){if(O.gecko){let f=Nd(c.node,c.offset);if(f&&f!=3){let p=(f==1?ec:tc)(c.node,c.offset);p&&(c=new it(p.node,p.offset))}}d.collapse(c.node,c.offset),a.bidiLevel!=null&&d.caretBidiLevel!==void 0&&(d.caretBidiLevel=a.bidiLevel)}else if(d.extend){d.collapse(c.node,c.offset);try{d.extend(h.node,h.offset)}catch{}}else{let f=document.createRange();a.anchor>a.head&&([c,h]=[h,c]),f.setEnd(h.node,h.offset),f.setStart(c.node,c.offset),d.removeAllRanges(),d.addRange(f)}o&&this.view.root.activeElement==n&&(n.blur(),s&&s.focus())}),this.view.observer.setSelectionRange(c,h)),this.impreciseAnchor=c.precise?null:new it(u.anchorNode,u.anchorOffset),this.impreciseHead=h.precise?null:new it(u.focusNode,u.focusOffset)}suppressWidgetCursorChange(e,t){return this.hasComposition&&t.empty&&Qn(e.focusNode,e.focusOffset,e.anchorNode,e.anchorOffset)&&this.posFromDOM(e.focusNode,e.focusOffset)==t.head}enforceCursorAssoc(){if(this.hasComposition)return;let{view:e}=this,t=e.state.selection.main,n=li(e.root),{anchorNode:s,anchorOffset:r}=e.observer.selectionRange;if(!n||!t.empty||!t.assoc||!n.modify)return;let o=this.lineAt(t.head,t.assoc);if(!o)return;let l=o.posAtStart;if(t.head==l||t.head==l+o.length)return;let a=this.coordsAt(t.head,-1),c=this.coordsAt(t.head,1);if(!a||!c||a.bottom>c.top)return;let h=this.domAtPos(t.head+t.assoc,t.assoc);n.collapse(h.node,h.offset),n.modify("move",t.assoc<0?"forward":"backward","lineboundary"),e.observer.readSelectionRange();let u=e.observer.selectionRange;e.docView.posFromDOM(u.anchorNode,u.anchorOffset)!=t.from&&n.collapse(s,r)}posFromDOM(e,t){let n=this.tile.nearest(e);if(!n)return this.tile.dom.compareDocumentPosition(e)&2?0:this.view.state.doc.length;let s=n.posAtStart;if(n.isComposite()){let r;if(e==n.dom)r=n.dom.childNodes[t];else{let o=Dt(e)==0?0:t==0?-1:1;for(;;){let l=e.parentNode;if(l==n.dom)break;o==0&&l.firstChild!=l.lastChild&&(e==l.firstChild?o=-1:o=1),e=l}o<0?r=e:r=e.nextSibling}if(r==n.dom.firstChild)return s;for(;r&&!me.get(r);)r=r.nextSibling;if(!r)return s+n.length;for(let o=0,l=s;;o++){let a=n.children[o];if(a.dom==r)return l;l+=a.length+a.breakAfter}}else return n.isText()?e==n.dom?s+t:s+(t?n.length:0):s}domAtPos(e,t){let{tile:n,offset:s}=this.tile.resolveBlock(e,t);return n.isWidget()?n.domPosFor(e,t):n.domIn(s,t)}inlineDOMNearPos(e,t){let n,s=-1,r=!1,o,l=-1,a=!1;return this.tile.blockTiles((c,h)=>{if(c.isWidget()){if(c.flags&32&&h>=e)return!0;c.flags&16&&(r=!0)}else{let u=h+c.length;if(h<=e&&(n=c,s=e-h,r=u<e),u>=e&&!o&&(o=c,l=e-h,a=h>e),h>e&&o)return!0}}),!n&&!o?this.domAtPos(e,t):(r&&o?n=null:a&&n&&(o=null),n&&t<0||!o?n.domIn(s,t):o.domIn(l,t))}coordsAt(e,t){let{tile:n,offset:s}=this.tile.resolveBlock(e,t);return n.isWidget()?n.widget instanceof Ws?null:n.coordsInWidget(s,t,!0):n.coordsIn(s,t)}lineAt(e,t){let{tile:n}=this.tile.resolveBlock(e,t);return n.isLine()?n:null}coordsForChar(e){let{tile:t,offset:n}=this.tile.resolveBlock(e,1);if(!t.isLine())return null;function s(r,o){if(r.isComposite())for(let l of r.children){if(l.length>=o){let a=s(l,o);if(a)return a}if(o-=l.length,o<0)break}else if(r.isText()&&o<r.length){let l=Me(r.text,o);if(l==o)return null;let a=ai(r.dom,o,l).getClientRects();for(let c=0;c<a.length;c++){let h=a[c];if(c==a.length-1||h.top<h.bottom&&h.left<h.right)return h}}return null}return s(t,n)}measureVisibleLineHeights(e){let t=[],{from:n,to:s}=e,r=this.view.contentDOM.clientWidth,o=r>Math.max(this.view.scrollDOM.clientWidth,this.minWidth)+1,l=-1,a=this.view.textDirection==de.LTR,c=0,h=(u,d,f)=>{for(let p=0;p<u.children.length&&!(d>s);p++){let m=u.children[p],g=d+m.length,b=m.dom.getBoundingClientRect(),{height:k}=b;if(f&&!p&&(c+=b.top-f.top),m instanceof Bt)g>n&&h(m,d,b);else if(d>=n&&(c>0&&t.push(-c),t.push(k+c),c=0,o)){let v=m.dom.lastChild,I=v?Wi(v):[];if(I.length){let C=I[I.length-1],A=a?C.right-b.left:b.right-C.left;A>l&&(l=A,this.minWidth=r,this.minWidthFrom=d,this.minWidthTo=g)}}f&&p==u.children.length-1&&(c+=f.bottom-b.bottom),d=g+m.breakAfter}};return h(this.tile,0,null),t}textDirectionAt(e){let{tile:t}=this.tile.resolveBlock(e,1);return getComputedStyle(t.dom).direction=="rtl"?de.RTL:de.LTR}measureTextSize(){let e=this.tile.blockTiles(o=>{if(o.isLine()&&o.children.length&&o.length<=20){let l=0,a;for(let c of o.children){if(!c.isText()||/[^ -~]/.test(c.text))return;let h=Wi(c.dom);if(h.length!=1)return;l+=h[0].width,a=h[0].height}if(l)return{lineHeight:o.dom.getBoundingClientRect().height,charWidth:l/o.length,textHeight:a}}});if(e)return e;let t=document.createElement("div"),n,s,r;return t.className="cm-line",t.style.width="99999px",t.style.position="absolute",t.textContent="abc def ghi jkl mno pqr stu",this.view.observer.ignore(()=>{this.tile.dom.appendChild(t);let o=Wi(t.firstChild)[0];n=t.getBoundingClientRect().height,s=o&&o.width?o.width/27:7,r=o&&o.height?o.height:n,t.remove()}),{lineHeight:n,charWidth:s,textHeight:r}}computeBlockGapDeco(){let e=[],t=this.view.viewState;for(let n=0,s=0;;s++){let r=s==t.viewports.length?null:t.viewports[s],o=r?r.from-1:this.view.state.doc.length;if(o>n){let l=(t.lineBlockAt(o).bottom-t.lineBlockAt(n).top)/this.view.scaleY;e.push(we.replace({widget:new Ws(l),block:!0,inclusive:!0,isBlockGap:!0}).range(n,o))}if(!r)break;n=r.to+1}return we.set(e)}updateDeco(){let e=1,t=this.view.state.facet(ms).map(r=>(this.dynamicDecorationMap[e++]=typeof r=="function")?r(this.view):r),n=!1,s=this.view.state.facet(vo).map((r,o)=>{let l=typeof r=="function";return l&&(n=!0),l?r(this.view):r});for(s.length&&(this.dynamicDecorationMap[e++]=n,t.push(Q.join(s))),this.decorations=[this.editContextFormatting,...t,this.computeBlockGapDeco(),this.view.viewState.lineGapDeco];e<this.decorations.length;)this.dynamicDecorationMap[e++]=!1;this.blockWrappers=this.view.state.facet(yc).map(r=>typeof r=="function"?r(this.view):r)}scrollIntoView(e){var t;if(e.isSnapshot){let h=this.view.viewState.lineBlockAt(e.range.head);this.view.scrollDOM.scrollTop=h.top-e.yMargin,this.view.scrollDOM.scrollLeft=e.xMargin;return}for(let h of this.view.state.facet(mc))try{if(h(this.view,e.range,e))return!0}catch(u){vt(this.view.state,u,"scroll handler")}let{range:n}=e,s=this.coordsAt(n.head,(t=n.assoc)!==null&&t!==void 0?t:n.empty?0:n.head>n.anchor?-1:1),r;if(!s)return;!n.empty&&(r=this.coordsAt(n.anchor,n.anchor>n.head?-1:1))&&(s={left:Math.min(s.left,r.left),top:Math.min(s.top,r.top),right:Math.max(s.right,r.right),bottom:Math.max(s.bottom,r.bottom)});let o=xc(this.view),l={left:s.left-o.left,top:s.top-o.top,right:s.right+o.right,bottom:s.bottom+o.bottom},{offsetWidth:a,offsetHeight:c}=this.view.scrollDOM;if(ud(this.view.scrollDOM,l,n.head<n.anchor?-1:1,e.x,e.y,Math.max(Math.min(e.xMargin,a),-a),Math.max(Math.min(e.yMargin,c),-c),this.view.textDirection==de.LTR),window.visualViewport&&window.innerHeight-window.visualViewport.height>1&&(s.top>window.pageYOffset+window.visualViewport.offsetTop+window.visualViewport.height||s.bottom<window.pageYOffset+window.visualViewport.offsetTop)){let h=this.view.docView.lineAt(n.head,1);h&&h.dom.scrollIntoView({block:"nearest"})}}lineHasWidget(e){let t=n=>n.isWidget()||n.children.some(t);return t(this.tile.resolveBlock(e,1).tile)}destroy(){Pr(this.tile)}}function Pr(i,e){let t=e==null?void 0:e.get(i);if(t!=1){t==null&&i.destroy();for(let n of i.children)Pr(n,e)}}function zd(i){return i.node.nodeType==1&&i.node.firstChild&&(i.offset==0||i.node.childNodes[i.offset-1].contentEditable=="false")&&(i.offset==i.node.childNodes.length||i.node.childNodes[i.offset].contentEditable=="false")}function _c(i,e){let t=i.observer.selectionRange;if(!t.focusNode)return null;let n=ec(t.focusNode,t.focusOffset),s=tc(t.focusNode,t.focusOffset),r=n||s;if(s&&n&&s.node!=n.node){let l=me.get(s.node);if(!l||l.isText()&&l.text!=s.node.nodeValue)r=s;else if(i.docView.lastCompositionAfterCursor){let a=me.get(n.node);!a||a.isText()&&a.text!=n.node.nodeValue||(r=s)}}if(i.docView.lastCompositionAfterCursor=r!=n,!r)return null;let o=e-r.offset;return{from:o,to:o+r.node.nodeValue.length,node:r.node}}function qd(i,e,t){let n=_c(i,t);if(!n)return null;let{node:s,from:r,to:o}=n,l=s.nodeValue;if(/[\n\r]/.test(l)||i.state.doc.sliceString(n.from,n.to)!=l)return null;let a=e.invertedDesc;return{range:new Ge(a.mapPos(r),a.mapPos(o),r,o),text:s}}function Nd(i,e){return i.nodeType!=1?0:(e&&i.childNodes[e-1].contentEditable=="false"?1:0)|(e<i.childNodes.length&&i.childNodes[e].contentEditable=="false"?2:0)}let Fd=class{constructor(){this.changes=[]}compareRange(e,t){vn(e,t,this.changes)}comparePoint(e,t){vn(e,t,this.changes)}boundChange(e){vn(e,e,this.changes)}};function Hd(i,e,t){let n=new Fd;return Q.compare(i,e,t,n),n.changes}class Wd{constructor(){this.changes=[]}compareRange(e,t){vn(e,t,this.changes)}comparePoint(){}boundChange(e){vn(e,e,this.changes)}}function Vd(i,e,t){let n=new Wd;return Q.compare(i,e,t,n),n.changes}function $d(i,e){for(let t=i;t&&t!=e;t=t.assignedSlot||t.parentNode)if(t.nodeType==1&&t.contentEditable=="false")return!0;return!1}function Ud(i,e){let t=!1;return e&&i.iterChangedRanges((n,s)=>{n<e.to&&s>e.from&&(t=!0)}),t}class Ws extends ps{constructor(e){super(),this.height=e}toDOM(){let e=document.createElement("div");return e.className="cm-gap",this.updateDOM(e),e}eq(e){return e.height==this.height}updateDOM(e){return e.style.height=this.height+"px",!0}get editable(){return!0}get estimatedHeight(){return this.height}ignoreEvent(){return!1}}function jd(i,e,t=1){let n=i.charCategorizer(e),s=i.doc.lineAt(e),r=e-s.from;if(s.length==0)return _.cursor(e);r==0?t=1:r==s.length&&(t=-1);let o=r,l=r;t<0?o=Me(s.text,r,!1):l=Me(s.text,r);let a=n(s.text.slice(o,l));for(;o>0;){let c=Me(s.text,o,!1);if(n(s.text.slice(c,o))!=a)break;o=c}for(;l<s.length;){let c=Me(s.text,l);if(n(s.text.slice(l,c))!=a)break;l=c}return _.range(o+s.from,l+s.from)}function Kd(i,e,t,n,s){let r=Math.round((n-e.left)*i.defaultCharacterWidth);if(i.lineWrapping&&t.height>i.defaultLineHeight*1.5){let l=i.viewState.heightOracle.textHeight,a=Math.floor((s-t.top-(i.defaultLineHeight-l)*.5)/l);r+=a*i.viewState.heightOracle.lineLength}let o=i.state.sliceDoc(t.from,t.to);return t.from+td(o,r,i.state.tabSize)}function Or(i,e,t){let n=i.lineBlockAt(e);if(Array.isArray(n.type)){let s;for(let r of n.type){if(r.from>e)break;if(!(r.to<e)){if(r.from<e&&r.to>e)return r;(!s||r.type==Ce.Text&&(s.type!=r.type||(t<0?r.from<e:r.to>e)))&&(s=r)}}return s||n}return n}function Xd(i,e,t,n){let s=Or(i,e.head,e.assoc||-1),r=!n||s.type!=Ce.Text||!(i.lineWrapping||s.widgetLineBreaks)?null:i.coordsAtPos(e.assoc<0&&e.head>s.from?e.head-1:e.head);if(r){let o=i.dom.getBoundingClientRect(),l=i.textDirectionAt(s.from),a=i.posAtCoords({x:t==(l==de.LTR)?o.right-1:o.left+1,y:(r.top+r.bottom)/2});if(a!=null)return _.cursor(a,t?-1:1)}return _.cursor(t?s.to:s.from,t?-1:1)}function gl(i,e,t,n){let s=i.state.doc.lineAt(e.head),r=i.bidiSpans(s),o=i.textDirectionAt(s.from);for(let l=e,a=null;;){let c=kd(s,r,o,l,t),h=oc;if(!c){if(s.number==(t?i.state.doc.lines:1))return l;h=`
`,s=i.state.doc.line(s.number+(t?1:-1)),r=i.bidiSpans(s),c=i.visualLineSide(s,!t)}if(a){if(!a(h))return l}else{if(!n)return c;a=n(h)}l=c}}function Gd(i,e,t){let n=i.state.charCategorizer(e),s=n(t);return r=>{let o=n(r);return s==Et.Space&&(s=o),s==o}}function Yd(i,e,t,n){let s=e.head,r=t?1:-1;if(s==(t?i.state.doc.length:0))return _.cursor(s,e.assoc);let o=e.goalColumn,l,a=i.contentDOM.getBoundingClientRect(),c=i.coordsAtPos(s,e.assoc||((e.empty?t:e.head==e.from)?1:-1)),h=i.documentTop;if(c)o==null&&(o=c.left-a.left),l=r<0?c.top:c.bottom;else{let p=i.viewState.lineBlockAt(s);o==null&&(o=Math.min(a.right-a.left,i.defaultCharacterWidth*(s-p.from))),l=(r<0?p.top:p.bottom)+h}let u=a.left+o,d=i.viewState.heightOracle.textHeight>>1,f=n??d;for(let p=0;;p+=d){let m=l+(f+p)*r,g=Lr(i,{x:u,y:m},!1,r);if(t?m>a.bottom:m<a.top)return _.cursor(g.pos,g.assoc);let b=i.coordsAtPos(g.pos,g.assoc),k=b?(b.top+b.bottom)/2:0;if(!b||(t?k>l:k<l))return _.cursor(g.pos,g.assoc,void 0,o)}}function Zn(i,e,t){for(;;){let n=0;for(let s of i)s.between(e-1,e+1,(r,o,l)=>{if(e>r&&e<o){let a=n||t||(e-r<o-e?-1:1);e=a<0?r:o,n=a}});if(!n)return e}}function Sc(i,e){let t=null;for(let n=0;n<e.ranges.length;n++){let s=e.ranges[n],r=null;if(s.empty){let o=Zn(i,s.from,0);o!=s.from&&(r=_.cursor(o,-1))}else{let o=Zn(i,s.from,-1),l=Zn(i,s.to,1);(o!=s.from||l!=s.to)&&(r=_.range(s.from==s.anchor?o:l,s.from==s.head?o:l))}r&&(t||(t=e.ranges.slice()),t[n]=r)}return t?_.create(t,e.mainIndex):e}function Vs(i,e,t){let n=Zn(i.state.facet(bi).map(s=>s(i)),t.from,e.head>t.from?-1:1);return n==t.from?t:_.cursor(n,n<t.from?1:-1)}class yt{constructor(e,t){this.pos=e,this.assoc=t}}function Lr(i,e,t,n){let s=i.contentDOM.getBoundingClientRect(),r=s.top+i.viewState.paddingTop,{x:o,y:l}=e,a=l-r,c;for(;;){if(a<0)return new yt(0,1);if(a>i.viewState.docHeight)return new yt(i.state.doc.length,-1);if(c=i.elementAtHeight(a),n==null)break;if(c.type==Ce.Text){if(n<0?c.to<i.viewport.from:c.from>i.viewport.to)break;let d=i.docView.coordsAt(n<0?c.from:c.to,n>0?-1:1);if(d&&(n<0?d.top<=a+r:d.bottom>=a+r))break}let u=i.viewState.heightOracle.textHeight/2;a=n>0?c.bottom+u:c.top-u}if(i.viewport.from>=c.to||i.viewport.to<=c.from){if(t)return null;if(c.type==Ce.Text){let u=Kd(i,s,c,o,l);return new yt(u,u==c.from?1:-1)}}if(c.type!=Ce.Text)return a<(c.top+c.bottom)/2?new yt(c.from,1):new yt(c.to,-1);let h=i.docView.lineAt(c.from,2);return(!h||h.length!=c.length)&&(h=i.docView.lineAt(c.from,-2)),new Jd(i,o,l,i.textDirectionAt(c.from)).scanTile(h,c.from)}class Jd{constructor(e,t,n,s){this.view=e,this.x=t,this.y=n,this.baseDir=s,this.line=null,this.spans=null}bidiSpansAt(e){return(!this.line||this.line.from>e||this.line.to<e)&&(this.line=this.view.state.doc.lineAt(e),this.spans=this.view.bidiSpans(this.line)),this}baseDirAt(e,t){let{line:n,spans:s}=this.bidiSpansAt(e);return s[wt.find(s,e-n.from,-1,t)].level==this.baseDir}dirAt(e,t){let{line:n,spans:s}=this.bidiSpansAt(e);return s[wt.find(s,e-n.from,-1,t)].dir}bidiIn(e,t){let{spans:n,line:s}=this.bidiSpansAt(e);return n.length>1||n.length&&(n[0].level!=this.baseDir||n[0].to+s.from<t)}scan(e,t){let n=0,s=e.length-1,r=new Set,o=this.bidiIn(e[0],e[s]),l,a,c=-1,h=1e9,u;e:for(;n<s;){let f=s-n,p=n+s>>1;t:if(r.has(p)){let g=n+Math.floor(Math.random()*f);for(let b=0;b<f;b++){if(!r.has(g)){p=g;break t}g++,g==s&&(g=n)}break e}r.add(p);let m=t(p);if(m)for(let g=0;g<m.length;g++){let b=m[g],k=0;if(!(b.width==0&&m.length>1)){if(b.bottom<this.y)(!l||l.bottom<b.bottom)&&(l=b),k=1;else if(b.top>this.y)(!a||a.top>b.top)&&(a=b),k=-1;else{let v=b.left>this.x?this.x-b.left:b.right<this.x?this.x-b.right:0,I=Math.abs(v);I<h&&(c=p,h=I,u=b),v&&(k=v<0==(this.baseDir==de.LTR)?-1:1)}k==-1&&(!o||this.baseDirAt(e[p],1))?s=p:k==1&&(!o||this.baseDirAt(e[p+1],-1))&&(n=p+1)}}}if(!u){let f=l&&(!a||this.y-l.bottom<a.top-this.y)?l:a;return this.y=(f.top+f.bottom)/2,this.scan(e,t)}let d=(o?this.dirAt(e[c],1):this.baseDir)==de.LTR;return{i:c,after:this.x>(u.left+u.right)/2==d}}scanText(e,t){let n=[];for(let r=0;r<e.length;r=Me(e.text,r))n.push(t+r);n.push(t+e.length);let s=this.scan(n,r=>{let o=n[r]-t,l=n[r+1]-t;return ai(e.dom,o,l).getClientRects()});return s.after?new yt(n[s.i+1],-1):new yt(n[s.i],1)}scanTile(e,t){if(!e.length)return new yt(t,1);if(e.children.length==1){let l=e.children[0];if(l.isText())return this.scanText(l,t);if(l.isComposite())return this.scanTile(l,t)}let n=[t];for(let l=0,a=t;l<e.children.length;l++)n.push(a+=e.children[l].length);let s=this.scan(n,l=>{let a=e.children[l];return a.flags&48?null:(a.dom.nodeType==1?a.dom:ai(a.dom,0,a.length)).getClientRects()}),r=e.children[s.i],o=n[s.i];return r.isText()?this.scanText(r,o):r.isComposite()?this.scanTile(r,o):s.after?new yt(n[s.i+1],-1):new yt(o,1)}}const fn="￿";class Qd{constructor(e,t){this.points=e,this.view=t,this.text="",this.lineSeparator=t.state.facet(te.lineSeparator)}append(e){this.text+=e}lineBreak(){this.text+=fn}readRange(e,t){if(!e)return this;let n=e.parentNode;for(let s=e;;){this.findPointBefore(n,s);let r=this.text.length;this.readNode(s);let o=me.get(s),l=s.nextSibling;if(l==t){o!=null&&o.breakAfter&&!l&&n!=this.view.contentDOM&&this.lineBreak();break}let a=me.get(l);(o&&a?o.breakAfter:(o?o.breakAfter:Zi(s))||Zi(l)&&(s.nodeName!="BR"||o!=null&&o.isWidget())&&this.text.length>r)&&!ef(l,t)&&this.lineBreak(),s=l}return this.findPointBefore(n,t),this}readTextNode(e){let t=e.nodeValue;for(let n of this.points)n.node==e&&(n.pos=this.text.length+Math.min(n.offset,t.length));for(let n=0,s=this.lineSeparator?null:/\r\n?|\n/g;;){let r=-1,o=1,l;if(this.lineSeparator?(r=t.indexOf(this.lineSeparator,n),o=this.lineSeparator.length):(l=s.exec(t))&&(r=l.index,o=l[0].length),this.append(t.slice(n,r<0?t.length:r)),r<0)break;if(this.lineBreak(),o>1)for(let a of this.points)a.node==e&&a.pos>this.text.length&&(a.pos-=o-1);n=r+o}}readNode(e){let t=me.get(e),n=t&&t.overrideDOMText;if(n!=null){this.findPointInside(e,n.length);for(let s=n.iter();!s.next().done;)s.lineBreak?this.lineBreak():this.append(s.value)}else e.nodeType==3?this.readTextNode(e):e.nodeName=="BR"?e.nextSibling&&this.lineBreak():e.nodeType==1&&this.readRange(e.firstChild,null)}findPointBefore(e,t){for(let n of this.points)n.node==e&&e.childNodes[n.offset]==t&&(n.pos=this.text.length)}findPointInside(e,t){for(let n of this.points)(e.nodeType==3?n.node==e:e.contains(n.node))&&(n.pos=this.text.length+(Zd(e,n.node,n.offset)?t:0))}}function Zd(i,e,t){for(;;){if(!e||t<Dt(e))return!1;if(e==i)return!0;t=Vt(e)+1,e=e.parentNode}}function ef(i,e){let t;for(;!(i==e||!i);i=i.nextSibling){let n=me.get(i);if(!(n!=null&&n.isWidget()))return!1;n&&(t||(t=[])).push(n)}if(t)for(let n of t){let s=n.overrideDOMText;if(s!=null&&s.length)return!1}return!0}class bl{constructor(e,t){this.node=e,this.offset=t,this.pos=-1}}class tf{constructor(e,t,n,s){this.typeOver=s,this.bounds=null,this.text="",this.domChanged=t>-1;let{impreciseHead:r,impreciseAnchor:o}=e.docView,l=e.state.selection;if(e.state.readOnly&&t>-1)this.newSel=null;else if(t>-1&&(this.bounds=Cc(e.docView.tile,t,n,0))){let a=r||o?[]:sf(e),c=new Qd(a,e);c.readRange(this.bounds.startDOM,this.bounds.endDOM),this.text=c.text,this.newSel=rf(a,this.bounds.from)}else{let a=e.observer.selectionRange,c=r&&r.node==a.focusNode&&r.offset==a.focusOffset||!Tr(e.contentDOM,a.focusNode)?l.main.head:e.docView.posFromDOM(a.focusNode,a.focusOffset),h=o&&o.node==a.anchorNode&&o.offset==a.anchorOffset||!Tr(e.contentDOM,a.anchorNode)?l.main.anchor:e.docView.posFromDOM(a.anchorNode,a.anchorOffset),u=e.viewport;if((O.ios||O.chrome)&&l.main.empty&&c!=h&&(u.from>0||u.to<e.state.doc.length)){let d=Math.min(c,h),f=Math.max(c,h),p=u.from-d,m=u.to-f;(p==0||p==1||d==0)&&(m==0||m==-1||f==e.state.doc.length)&&(c=0,h=e.state.doc.length)}if(e.inputState.composing>-1&&l.ranges.length>1)this.newSel=l.replaceRange(_.range(h,c));else if(e.lineWrapping&&h==c&&!(l.main.empty&&l.main.head==c)&&e.inputState.lastTouchTime>Date.now()-100){let d=e.coordsAtPos(c,-1),f=0;d&&(f=e.inputState.lastTouchY<=d.bottom?-1:1),this.newSel=_.create([_.cursor(c,f)])}else this.newSel=_.single(h,c)}}}function Cc(i,e,t,n){if(i.isComposite()){let s=-1,r=-1,o=-1,l=-1;for(let a=0,c=n,h=n;a<i.children.length;a++){let u=i.children[a],d=c+u.length;if(c<e&&d>t)return Cc(u,e,t,c);if(d>=e&&s==-1&&(s=a,r=c),c>t&&u.dom.parentNode==i.dom){o=a,l=h;break}h=d,c=d+u.breakAfter}return{from:r,to:l<0?n+i.length:l,startDOM:(s?i.children[s-1].dom.nextSibling:null)||i.dom.firstChild,endDOM:o<i.children.length&&o>=0?i.children[o].dom:null}}else return i.isText()?{from:n,to:n+i.length,startDOM:i.dom,endDOM:i.dom.nextSibling}:null}function Ac(i,e){let t,{newSel:n}=e,{state:s}=i,r=s.selection.main,o=i.inputState.lastKeyTime>Date.now()-100?i.inputState.lastKeyCode:-1;if(e.bounds){let{from:l,to:a}=e.bounds,c=r.from,h=null;(o===8||O.android&&e.text.length<a-l)&&(c=r.to,h="end");let u=s.doc.sliceString(l,a,fn),d,f;!r.empty&&r.from>=l&&r.to<=a&&(e.typeOver||u!=e.text)&&u.slice(0,r.from-l)==e.text.slice(0,r.from-l)&&u.slice(r.to-l)==e.text.slice(d=e.text.length-(u.length-(r.to-l)))?t={from:r.from,to:r.to,insert:Z.of(e.text.slice(r.from-l,d).split(fn))}:(f=Tc(u,e.text,c-l,h))&&(O.chrome&&o==13&&f.toB==f.from+2&&e.text.slice(f.from,f.toB)==fn+fn&&f.toB--,t={from:l+f.from,to:l+f.toA,insert:Z.of(e.text.slice(f.from,f.toB).split(fn))})}else n&&(!i.hasFocus&&s.facet(Mt)||ss(n,r))&&(n=null);if(!t&&!n)return!1;if((O.mac||O.android)&&t&&t.from==t.to&&t.from==r.head-1&&/^\. ?$/.test(t.insert.toString())&&i.contentDOM.getAttribute("autocorrect")=="off"?(n&&t.insert.length==2&&(n=_.single(n.main.anchor-1,n.main.head-1)),t={from:t.from,to:t.to,insert:Z.of([t.insert.toString().replace("."," ")])}):s.doc.lineAt(r.from).to<r.to&&i.docView.lineHasWidget(r.to)&&i.inputState.insertingTextAt>Date.now()-50?t={from:r.from,to:r.to,insert:s.toText(i.inputState.insertingText)}:O.chrome&&t&&t.from==t.to&&t.from==r.head&&t.insert.toString()==`
 `&&i.lineWrapping&&(n&&(n=_.single(n.main.anchor-1,n.main.head-1)),t={from:r.from,to:r.to,insert:Z.of([" "])}),t)return xo(i,t,n,o);if(n&&!ss(n,r)){let l=!1,a="select";return i.inputState.lastSelectionTime>Date.now()-50&&(i.inputState.lastSelectionOrigin=="select"&&(l=!0),a=i.inputState.lastSelectionOrigin,a=="select.pointer"&&(n=Sc(s.facet(bi).map(c=>c(i)),n))),i.dispatch({selection:n,scrollIntoView:l,userEvent:a}),!0}else return!1}function xo(i,e,t,n=-1){if(O.ios&&i.inputState.flushIOSKey(e))return!0;let s=i.state.selection.main;if(O.android&&(e.to==s.to&&(e.from==s.from||e.from==s.from-1&&i.state.sliceDoc(e.from,s.from)==" ")&&e.insert.length==1&&e.insert.lines==2&&xn(i.contentDOM,"Enter",13)||(e.from==s.from-1&&e.to==s.to&&e.insert.length==0||n==8&&e.insert.length<e.to-e.from&&e.to>s.head)&&xn(i.contentDOM,"Backspace",8)||e.from==s.from&&e.to==s.to+1&&e.insert.length==0&&xn(i.contentDOM,"Delete",46)))return!0;let r=e.insert.toString();i.inputState.composing>=0&&i.inputState.composing++;let o,l=()=>o||(o=nf(i,e,t));return i.state.facet(uc).some(a=>a(i,e.from,e.to,r,l))||i.dispatch(l()),!0}function nf(i,e,t){let n,s=i.state,r=s.selection.main,o=-1;if(e.from==e.to&&e.from<r.from||e.from>r.to){let a=e.from<r.from?-1:1,c=a<0?r.from:r.to,h=Zn(s.facet(bi).map(u=>u(i)),c,a);e.from==h&&(o=h)}if(o>-1)n={changes:e,selection:_.cursor(e.from+e.insert.length,-1)};else if(e.from>=r.from&&e.to<=r.to&&e.to-e.from>=(r.to-r.from)/3&&(!t||t.main.empty&&t.main.from==e.from+e.insert.length)&&i.inputState.composing<0){let a=r.from<e.from?s.sliceDoc(r.from,e.from):"",c=r.to>e.to?s.sliceDoc(e.to,r.to):"";n=s.replaceSelection(i.state.toText(a+e.insert.sliceString(0,void 0,i.state.lineBreak)+c))}else{let a=s.changes(e),c=t&&t.main.to<=a.newLength?t.main:void 0;if(s.selection.ranges.length>1&&(i.inputState.composing>=0||i.inputState.compositionPendingChange)&&e.to<=r.to+10&&e.to>=r.to-10){let h=i.state.sliceDoc(e.from,e.to),u,d=t&&_c(i,t.main.head);if(d){let p=e.insert.length-(e.to-e.from);u={from:d.from,to:d.to-p}}else u=i.state.doc.lineAt(r.head);let f=r.to-e.to;n=s.changeByRange(p=>{if(p.from==r.from&&p.to==r.to)return{changes:a,range:c||p.map(a)};let m=p.to-f,g=m-h.length;if(i.state.sliceDoc(g,m)!=h||m>=u.from&&g<=u.to)return{range:p};let b=s.changes({from:g,to:m,insert:e.insert}),k=p.to-r.to;return{changes:b,range:c?_.range(Math.max(0,c.anchor+k),Math.max(0,c.head+k)):p.map(b)}})}else n={changes:a,selection:c&&s.selection.replaceRange(c)}}let l="input.type";return(i.composing||i.inputState.compositionPendingChange&&i.inputState.compositionEndedAt>Date.now()-50)&&(i.inputState.compositionPendingChange=!1,l+=".compose",i.inputState.compositionFirstChange&&(l+=".start",i.inputState.compositionFirstChange=!1)),s.update(n,{userEvent:l,scrollIntoView:!0})}function Tc(i,e,t,n){let s=Math.min(i.length,e.length),r=0;for(;r<s&&i.charCodeAt(r)==e.charCodeAt(r);)r++;if(r==s&&i.length==e.length)return null;let o=i.length,l=e.length;for(;o>0&&l>0&&i.charCodeAt(o-1)==e.charCodeAt(l-1);)o--,l--;if(n=="end"){let a=Math.max(0,r-Math.min(o,l));t-=o+a-r}if(o<r&&i.length<e.length){let a=t<=r&&t>=o?r-t:0;r-=a,l=r+(l-o),o=r}else if(l<r){let a=t<=r&&t>=l?r-t:0;r-=a,o=r+(o-l),l=r}return{from:r,toA:o,toB:l}}function sf(i){let e=[];if(i.root.activeElement!=i.contentDOM)return e;let{anchorNode:t,anchorOffset:n,focusNode:s,focusOffset:r}=i.observer.selectionRange;return t&&(e.push(new bl(t,n)),(s!=t||r!=n)&&e.push(new bl(s,r))),e}function rf(i,e){if(i.length==0)return null;let t=i[0].pos,n=i.length==2?i[1].pos:t;return t>-1&&n>-1?_.single(t+e,n+e):null}function ss(i,e){return e.head==i.main.head&&e.anchor==i.main.anchor}class of{setSelectionOrigin(e){this.lastSelectionOrigin=e,this.lastSelectionTime=Date.now()}constructor(e){this.view=e,this.lastKeyCode=0,this.lastKeyTime=0,this.lastTouchTime=0,this.lastTouchX=0,this.lastTouchY=0,this.lastFocusTime=0,this.lastScrollTop=0,this.lastScrollLeft=0,this.lastWheelEvent=0,this.pendingIOSKey=void 0,this.tabFocusMode=-1,this.lastSelectionOrigin=null,this.lastSelectionTime=0,this.lastContextMenu=0,this.scrollHandlers=[],this.handlers=Object.create(null),this.composing=-1,this.compositionFirstChange=null,this.compositionEndedAt=0,this.compositionPendingKey=!1,this.compositionPendingChange=!1,this.insertingText="",this.insertingTextAt=0,this.mouseSelection=null,this.draggedContent=null,this.handleEvent=this.handleEvent.bind(this),this.notifiedFocused=e.hasFocus,O.safari&&e.contentDOM.addEventListener("input",()=>null),O.gecko&&xf(e.contentDOM.ownerDocument)}handleEvent(e){!pf(this.view,e)||this.ignoreDuringComposition(e)||e.type=="keydown"&&this.keydown(e)||(this.view.updateState!=0?Promise.resolve().then(()=>this.runHandlers(e.type,e)):this.runHandlers(e.type,e))}runHandlers(e,t){let n=this.handlers[e];if(n){for(let s of n.observers)s(this.view,t);for(let s of n.handlers){if(t.defaultPrevented)break;if(s(this.view,t)){t.preventDefault();break}}}}ensureHandlers(e){let t=lf(e),n=this.handlers,s=this.view.contentDOM;for(let r in t)if(r!="scroll"){let o=!t[r].handlers.length,l=n[r];l&&o!=!l.handlers.length&&(s.removeEventListener(r,this.handleEvent),l=null),l||s.addEventListener(r,this.handleEvent,{passive:o})}for(let r in n)r!="scroll"&&!t[r]&&s.removeEventListener(r,this.handleEvent);this.handlers=t}keydown(e){if(this.lastKeyCode=e.keyCode,this.lastKeyTime=Date.now(),e.keyCode==9&&this.tabFocusMode>-1&&(!this.tabFocusMode||Date.now()<=this.tabFocusMode))return!0;if(this.tabFocusMode>0&&e.keyCode!=27&&Ec.indexOf(e.keyCode)<0&&(this.tabFocusMode=-1),O.android&&O.chrome&&!e.synthetic&&(e.keyCode==13||e.keyCode==8))return this.view.observer.delayAndroidKey(e.key,e.keyCode),!0;let t;return O.ios&&!e.synthetic&&!e.altKey&&!e.metaKey&&!e.shiftKey&&((t=Mc.find(n=>n.keyCode==e.keyCode))&&!e.ctrlKey||af.indexOf(e.key)>-1&&e.ctrlKey)?(this.pendingIOSKey=t||e,setTimeout(()=>this.flushIOSKey(),250),!0):(e.keyCode!=229&&this.view.observer.forceFlush(),!1)}flushIOSKey(e){let t=this.pendingIOSKey;return!t||t.key=="Enter"&&e&&e.from<e.to&&/^\S+$/.test(e.insert.toString())?!1:(this.pendingIOSKey=void 0,xn(this.view.contentDOM,t.key,t.keyCode,t instanceof KeyboardEvent?t:void 0))}ignoreDuringComposition(e){return!/^key/.test(e.type)||e.synthetic?!1:this.composing>0?!0:O.safari&&!O.ios&&this.compositionPendingKey&&Date.now()-this.compositionEndedAt<100?(this.compositionPendingKey=!1,!0):!1}startMouseSelection(e){this.mouseSelection&&this.mouseSelection.destroy(),this.mouseSelection=e}update(e){this.view.observer.update(e),this.mouseSelection&&this.mouseSelection.update(e),this.draggedContent&&e.docChanged&&(this.draggedContent=this.draggedContent.map(e.changes)),e.transactions.length&&(this.lastKeyCode=this.lastSelectionTime=0)}destroy(){this.mouseSelection&&this.mouseSelection.destroy()}}function yl(i,e){return(t,n)=>{try{return e.call(i,n,t)}catch(s){vt(t.state,s)}}}function lf(i){let e=Object.create(null);function t(n){return e[n]||(e[n]={observers:[],handlers:[]})}for(let n of i){let s=n.spec,r=s&&s.plugin.domEventHandlers,o=s&&s.plugin.domEventObservers;if(r)for(let l in r){let a=r[l];a&&t(l).handlers.push(yl(n.value,a))}if(o)for(let l in o){let a=o[l];a&&t(l).observers.push(yl(n.value,a))}}for(let n in rt)t(n).handlers.push(rt[n]);for(let n in qe)t(n).observers.push(qe[n]);return e}const Mc=[{key:"Backspace",keyCode:8,inputType:"deleteContentBackward"},{key:"Enter",keyCode:13,inputType:"insertParagraph"},{key:"Enter",keyCode:13,inputType:"insertLineBreak"},{key:"Delete",keyCode:46,inputType:"deleteContentForward"}],af="dthko",Ec=[16,17,18,20,91,92,224,225],Si=6;function Ci(i){return Math.max(0,i)*.7+8}function cf(i,e){return Math.max(Math.abs(i.clientX-e.clientX),Math.abs(i.clientY-e.clientY))}class hf{constructor(e,t,n,s){this.view=e,this.startEvent=t,this.style=n,this.mustSelect=s,this.scrollSpeed={x:0,y:0},this.scrolling=-1,this.lastEvent=t,this.scrollParents=Ja(e.contentDOM),this.atoms=e.state.facet(bi).map(o=>o(e));let r=e.contentDOM.ownerDocument;r.addEventListener("mousemove",this.move=this.move.bind(this)),r.addEventListener("mouseup",this.up=this.up.bind(this)),this.extend=t.shiftKey,this.multiple=e.state.facet(te.allowMultipleSelections)&&uf(e,t),this.dragging=ff(e,t)&&Pc(t)==1?null:!1}start(e){this.dragging===!1&&this.select(e)}move(e){if(e.buttons==0)return this.destroy();if(this.dragging||this.dragging==null&&cf(this.startEvent,e)<10)return;this.select(this.lastEvent=e);let t=0,n=0,s=0,r=0,o=this.view.win.innerWidth,l=this.view.win.innerHeight;this.scrollParents.x&&({left:s,right:o}=this.scrollParents.x.getBoundingClientRect()),this.scrollParents.y&&({top:r,bottom:l}=this.scrollParents.y.getBoundingClientRect());let a=xc(this.view);e.clientX-a.left<=s+Si?t=-Ci(s-e.clientX):e.clientX+a.right>=o-Si&&(t=Ci(e.clientX-o)),e.clientY-a.top<=r+Si?n=-Ci(r-e.clientY):e.clientY+a.bottom>=l-Si&&(n=Ci(e.clientY-l)),this.setScrollSpeed(t,n)}up(e){this.dragging==null&&this.select(this.lastEvent),this.dragging||e.preventDefault(),this.destroy()}destroy(){this.setScrollSpeed(0,0);let e=this.view.contentDOM.ownerDocument;e.removeEventListener("mousemove",this.move),e.removeEventListener("mouseup",this.up),this.view.inputState.mouseSelection=this.view.inputState.draggedContent=null}setScrollSpeed(e,t){this.scrollSpeed={x:e,y:t},e||t?this.scrolling<0&&(this.scrolling=setInterval(()=>this.scroll(),50)):this.scrolling>-1&&(clearInterval(this.scrolling),this.scrolling=-1)}scroll(){let{x:e,y:t}=this.scrollSpeed;e&&this.scrollParents.x&&(this.scrollParents.x.scrollLeft+=e,e=0),t&&this.scrollParents.y&&(this.scrollParents.y.scrollTop+=t,t=0),(e||t)&&this.view.win.scrollBy(e,t),this.dragging===!1&&this.select(this.lastEvent)}select(e){let{view:t}=this,n=Sc(this.atoms,this.style.get(e,this.extend,this.multiple));(this.mustSelect||!n.eq(t.state.selection,this.dragging===!1))&&this.view.dispatch({selection:n,userEvent:"select.pointer"}),this.mustSelect=!1}update(e){e.transactions.some(t=>t.isUserEvent("input.type"))?this.destroy():this.style.update(e)&&setTimeout(()=>this.select(this.lastEvent),20)}}function uf(i,e){let t=i.state.facet(lc);return t.length?t[0](e):O.mac?e.metaKey:e.ctrlKey}function df(i,e){let t=i.state.facet(ac);return t.length?t[0](e):O.mac?!e.altKey:!e.ctrlKey}function ff(i,e){let{main:t}=i.state.selection;if(t.empty)return!1;let n=li(i.root);if(!n||n.rangeCount==0)return!0;let s=n.getRangeAt(0).getClientRects();for(let r=0;r<s.length;r++){let o=s[r];if(o.left<=e.clientX&&o.right>=e.clientX&&o.top<=e.clientY&&o.bottom>=e.clientY)return!0}return!1}function pf(i,e){if(!e.bubbles)return!0;if(e.defaultPrevented)return!1;for(let t=e.target,n;t!=i.contentDOM;t=t.parentNode)if(!t||t.nodeType==11||(n=me.get(t))&&n.isWidget()&&!n.isHidden&&n.widget.ignoreEvent(e))return!1;return!0}const rt=Object.create(null),qe=Object.create(null),Bc=O.ie&&O.ie_version<15||O.ios&&O.webkit_version<604;function mf(i){let e=i.dom.parentNode;if(!e)return;let t=e.appendChild(document.createElement("textarea"));t.style.cssText="position: fixed; left: -10000px; top: 10px",t.focus(),setTimeout(()=>{i.focus(),t.remove(),Dc(i,t.value)},50)}function ys(i,e,t){for(let n of i.facet(e))t=n(t,i);return t}function Dc(i,e){e=ys(i.state,bo,e);let{state:t}=i,n,s=1,r=t.toText(e),o=r.lines==t.selection.ranges.length;if(Rr!=null&&t.selection.ranges.every(a=>a.empty)&&Rr==r.toString()){let a=-1;n=t.changeByRange(c=>{let h=t.doc.lineAt(c.from);if(h.from==a)return{range:c};a=h.from;let u=t.toText((o?r.line(s++).text:e)+t.lineBreak);return{changes:{from:h.from,insert:u},range:_.cursor(c.from+u.length)}})}else o?n=t.changeByRange(a=>{let c=r.line(s++);return{changes:{from:a.from,to:a.to,insert:c.text},range:_.cursor(a.from+c.length)}}):n=t.replaceSelection(r);i.dispatch(n,{userEvent:"input.paste",scrollIntoView:!0})}qe.scroll=i=>{i.inputState.lastScrollTop=i.scrollDOM.scrollTop,i.inputState.lastScrollLeft=i.scrollDOM.scrollLeft};qe.wheel=qe.mousewheel=i=>{i.inputState.lastWheelEvent=Date.now()};rt.keydown=(i,e)=>(i.inputState.setSelectionOrigin("select"),e.keyCode==27&&i.inputState.tabFocusMode!=0&&(i.inputState.tabFocusMode=Date.now()+2e3),!1);qe.touchstart=(i,e)=>{let t=i.inputState,n=e.targetTouches[0];t.lastTouchTime=Date.now(),n&&(t.lastTouchX=n.clientX,t.lastTouchY=n.clientY),t.setSelectionOrigin("select.pointer")};qe.touchmove=i=>{i.inputState.setSelectionOrigin("select.pointer")};rt.mousedown=(i,e)=>{if(i.observer.flush(),i.inputState.lastTouchTime>Date.now()-2e3)return!1;let t=null;for(let n of i.state.facet(cc))if(t=n(i,e),t)break;if(!t&&e.button==0&&(t=bf(i,e)),t){let n=!i.hasFocus;i.inputState.startMouseSelection(new hf(i,e,t,n)),n&&i.observer.ignore(()=>{Qa(i.contentDOM);let r=i.root.activeElement;r&&!r.contains(i.contentDOM)&&r.blur()});let s=i.inputState.mouseSelection;if(s)return s.start(e),s.dragging===!1}else i.inputState.setSelectionOrigin("select.pointer");return!1};function wl(i,e,t,n){if(n==1)return _.cursor(e,t);if(n==2)return jd(i.state,e,t);{let s=i.docView.lineAt(e,t),r=i.state.doc.lineAt(s?s.posAtEnd:e),o=s?s.posAtStart:r.from,l=s?s.posAtEnd:r.to;return l<i.state.doc.length&&l==r.to&&l++,_.range(o,l)}}const gf=O.ie&&O.ie_version<=11;let vl=null,xl=0,kl=0;function Pc(i){if(!gf)return i.detail;let e=vl,t=kl;return vl=i,kl=Date.now(),xl=!e||t>Date.now()-400&&Math.abs(e.clientX-i.clientX)<2&&Math.abs(e.clientY-i.clientY)<2?(xl+1)%3:1}function bf(i,e){let t=i.posAndSideAtCoords({x:e.clientX,y:e.clientY},!1),n=Pc(e),s=i.state.selection;return{update(r){r.docChanged&&(t.pos=r.changes.mapPos(t.pos),s=s.map(r.changes))},get(r,o,l){let a=i.posAndSideAtCoords({x:r.clientX,y:r.clientY},!1),c,h=wl(i,a.pos,a.assoc,n);if(t.pos!=a.pos&&!o){let u=wl(i,t.pos,t.assoc,n),d=Math.min(u.from,h.from),f=Math.max(u.to,h.to);h=d<h.from?_.range(d,f,h.assoc):_.range(f,d,h.assoc)}return o?s.replaceRange(s.main.extend(h.from,h.to,h.assoc)):l&&n==1&&s.ranges.length>1&&(c=yf(s,a.pos))?c:l?s.addRange(h):_.create([h])}}}function yf(i,e){for(let t=0;t<i.ranges.length;t++){let{from:n,to:s}=i.ranges[t];if(n<=e&&s>=e)return _.create(i.ranges.slice(0,t).concat(i.ranges.slice(t+1)),i.mainIndex==t?0:i.mainIndex-(i.mainIndex>t?1:0))}return null}rt.dragstart=(i,e)=>{let{selection:{main:t}}=i.state;if(e.target.draggable){let s=i.docView.tile.nearest(e.target);if(s&&s.isWidget()){let r=s.posAtStart,o=r+s.length;(r>=t.to||o<=t.from)&&(t=_.range(r,o))}}let{inputState:n}=i;return n.mouseSelection&&(n.mouseSelection.dragging=!0),n.draggedContent=t,e.dataTransfer&&(e.dataTransfer.setData("Text",ys(i.state,yo,i.state.sliceDoc(t.from,t.to))),e.dataTransfer.effectAllowed="copyMove"),!1};rt.dragend=i=>(i.inputState.draggedContent=null,!1);function _l(i,e,t,n){if(t=ys(i.state,bo,t),!t)return;let s=i.posAtCoords({x:e.clientX,y:e.clientY},!1),{draggedContent:r}=i.inputState,o=n&&r&&df(i,e)?{from:r.from,to:r.to}:null,l={from:s,insert:t},a=i.state.changes(o?[o,l]:l);i.focus(),i.dispatch({changes:a,selection:{anchor:a.mapPos(s,-1),head:a.mapPos(s,1)},userEvent:o?"move.drop":"input.drop"}),i.inputState.draggedContent=null}rt.drop=(i,e)=>{if(!e.dataTransfer)return!1;if(i.state.readOnly)return!0;let t=e.dataTransfer.files;if(t&&t.length){let n=Array(t.length),s=0,r=()=>{++s==t.length&&_l(i,e,n.filter(o=>o!=null).join(i.state.lineBreak),!1)};for(let o=0;o<t.length;o++){let l=new FileReader;l.onerror=r,l.onload=()=>{/[\x00-\x08\x0e-\x1f]{2}/.test(l.result)||(n[o]=l.result),r()},l.readAsText(t[o])}return!0}else{let n=e.dataTransfer.getData("Text");if(n)return _l(i,e,n,!0),!0}return!1};rt.paste=(i,e)=>{if(i.state.readOnly)return!0;i.observer.flush();let t=Bc?null:e.clipboardData;return t?(Dc(i,t.getData("text/plain")||t.getData("text/uri-list")),!0):(mf(i),!1)};function wf(i,e){let t=i.dom.parentNode;if(!t)return;let n=t.appendChild(document.createElement("textarea"));n.style.cssText="position: fixed; left: -10000px; top: 10px",n.value=e,n.focus(),n.selectionEnd=e.length,n.selectionStart=0,setTimeout(()=>{n.remove(),i.focus()},50)}function vf(i){let e=[],t=[],n=!1;for(let s of i.selection.ranges)s.empty||(e.push(i.sliceDoc(s.from,s.to)),t.push(s));if(!e.length){let s=-1;for(let{from:r}of i.selection.ranges){let o=i.doc.lineAt(r);o.number>s&&(e.push(o.text),t.push({from:o.from,to:Math.min(i.doc.length,o.to+1)})),s=o.number}n=!0}return{text:ys(i,yo,e.join(i.lineBreak)),ranges:t,linewise:n}}let Rr=null;rt.copy=rt.cut=(i,e)=>{if(!Jn(i.contentDOM,i.observer.selectionRange))return!1;let{text:t,ranges:n,linewise:s}=vf(i.state);if(!t&&!s)return!1;Rr=s?t:null,e.type=="cut"&&!i.state.readOnly&&i.dispatch({changes:n,scrollIntoView:!0,userEvent:"delete.cut"});let r=Bc?null:e.clipboardData;return r?(r.clearData(),r.setData("text/plain",t),!0):(wf(i,t),!1)};const Oc=Kt.define();function Lc(i,e){let t=[];for(let n of i.facet(dc)){let s=n(i,e);s&&t.push(s)}return t.length?i.update({effects:t,annotations:Oc.of(!0)}):null}function Rc(i){setTimeout(()=>{let e=i.hasFocus;if(e!=i.inputState.notifiedFocused){let t=Lc(i.state,e);t?i.dispatch(t):i.update([])}},10)}qe.focus=i=>{i.inputState.lastFocusTime=Date.now(),!i.scrollDOM.scrollTop&&(i.inputState.lastScrollTop||i.inputState.lastScrollLeft)&&(i.scrollDOM.scrollTop=i.inputState.lastScrollTop,i.scrollDOM.scrollLeft=i.inputState.lastScrollLeft),Rc(i)};qe.blur=i=>{i.observer.clearSelectionRange(),Rc(i)};qe.compositionstart=qe.compositionupdate=i=>{i.observer.editContext||(i.inputState.compositionFirstChange==null&&(i.inputState.compositionFirstChange=!0),i.inputState.composing<0&&(i.inputState.composing=0))};qe.compositionend=i=>{i.observer.editContext||(i.inputState.composing=-1,i.inputState.compositionEndedAt=Date.now(),i.inputState.compositionPendingKey=!0,i.inputState.compositionPendingChange=i.observer.pendingRecords().length>0,i.inputState.compositionFirstChange=null,O.chrome&&O.android?i.observer.flushSoon():i.inputState.compositionPendingChange?Promise.resolve().then(()=>i.observer.flush()):setTimeout(()=>{i.inputState.composing<0&&i.docView.hasComposition&&i.update([])},50))};qe.contextmenu=i=>{i.inputState.lastContextMenu=Date.now()};rt.beforeinput=(i,e)=>{var t,n;if((e.inputType=="insertText"||e.inputType=="insertCompositionText")&&(i.inputState.insertingText=e.data,i.inputState.insertingTextAt=Date.now()),e.inputType=="insertReplacementText"&&i.observer.editContext){let r=(t=e.dataTransfer)===null||t===void 0?void 0:t.getData("text/plain"),o=e.getTargetRanges();if(r&&o.length){let l=o[0],a=i.posAtDOM(l.startContainer,l.startOffset),c=i.posAtDOM(l.endContainer,l.endOffset);return xo(i,{from:a,to:c,insert:i.state.toText(r)},null),!0}}let s;if(O.chrome&&O.android&&(s=Mc.find(r=>r.inputType==e.inputType))&&(i.observer.delayAndroidKey(s.key,s.keyCode),s.key=="Backspace"||s.key=="Delete")){let r=((n=window.visualViewport)===null||n===void 0?void 0:n.height)||0;setTimeout(()=>{var o;(((o=window.visualViewport)===null||o===void 0?void 0:o.height)||0)>r+10&&i.hasFocus&&(i.contentDOM.blur(),i.focus())},100)}return O.ios&&e.inputType=="deleteContentForward"&&i.observer.flushSoon(),O.safari&&e.inputType=="insertText"&&i.inputState.composing>=0&&setTimeout(()=>qe.compositionend(i,e),20),!1};const Sl=new Set;function xf(i){Sl.has(i)||(Sl.add(i),i.addEventListener("copy",()=>{}),i.addEventListener("cut",()=>{}))}const Cl=["pre-wrap","normal","pre-line","break-spaces"];let An=!1;function Al(){An=!1}class kf{constructor(e){this.lineWrapping=e,this.doc=Z.empty,this.heightSamples={},this.lineHeight=14,this.charWidth=7,this.textHeight=14,this.lineLength=30}heightForGap(e,t){let n=this.doc.lineAt(t).number-this.doc.lineAt(e).number+1;return this.lineWrapping&&(n+=Math.max(0,Math.ceil((t-e-n*this.lineLength*.5)/this.lineLength))),this.lineHeight*n}heightForLine(e){return this.lineWrapping?(1+Math.max(0,Math.ceil((e-this.lineLength)/Math.max(1,this.lineLength-5))))*this.lineHeight:this.lineHeight}setDoc(e){return this.doc=e,this}mustRefreshForWrapping(e){return Cl.indexOf(e)>-1!=this.lineWrapping}mustRefreshForHeights(e){let t=!1;for(let n=0;n<e.length;n++){let s=e[n];s<0?n++:this.heightSamples[Math.floor(s*10)]||(t=!0,this.heightSamples[Math.floor(s*10)]=!0)}return t}refresh(e,t,n,s,r,o){let l=Cl.indexOf(e)>-1,a=Math.abs(t-this.lineHeight)>.3||this.lineWrapping!=l||Math.abs(n-this.charWidth)>.1;if(this.lineWrapping=l,this.lineHeight=t,this.charWidth=n,this.textHeight=s,this.lineLength=r,a){this.heightSamples={};for(let c=0;c<o.length;c++){let h=o[c];h<0?c++:this.heightSamples[Math.floor(h*10)]=!0}}return a}}class _f{constructor(e,t){this.from=e,this.heights=t,this.index=0}get more(){return this.index<this.heights.length}}class nt{constructor(e,t,n,s,r){this.from=e,this.length=t,this.top=n,this.height=s,this._content=r}get type(){return typeof this._content=="number"?Ce.Text:Array.isArray(this._content)?this._content:this._content.type}get to(){return this.from+this.length}get bottom(){return this.top+this.height}get widget(){return this._content instanceof sn?this._content.widget:null}get widgetLineBreaks(){return typeof this._content=="number"?this._content:0}join(e){let t=(Array.isArray(this._content)?this._content:[this]).concat(Array.isArray(e._content)?e._content:[e]);return new nt(this.from,this.length+e.length,this.top,this.height+e.height,t)}}var ce=(function(i){return i[i.ByPos=0]="ByPos",i[i.ByHeight=1]="ByHeight",i[i.ByPosNoHeight=2]="ByPosNoHeight",i})(ce||(ce={}));const Vi=.001;class Oe{constructor(e,t,n=2){this.length=e,this.height=t,this.flags=n}get outdated(){return(this.flags&2)>0}set outdated(e){this.flags=(e?2:0)|this.flags&-3}setHeight(e){this.height!=e&&(Math.abs(this.height-e)>Vi&&(An=!0),this.height=e)}replace(e,t,n){return Oe.of(n)}decomposeLeft(e,t){t.push(this)}decomposeRight(e,t){t.push(this)}applyChanges(e,t,n,s){let r=this,o=n.doc;for(let l=s.length-1;l>=0;l--){let{fromA:a,toA:c,fromB:h,toB:u}=s[l],d=r.lineAt(a,ce.ByPosNoHeight,n.setDoc(t),0,0),f=d.to>=c?d:r.lineAt(c,ce.ByPosNoHeight,n,0,0);for(u+=f.to-c,c=f.to;l>0&&d.from<=s[l-1].toA;)a=s[l-1].fromA,h=s[l-1].fromB,l--,a<d.from&&(d=r.lineAt(a,ce.ByPosNoHeight,n,0,0));h+=d.from-a,a=d.from;let p=ko.build(n.setDoc(o),e,h,u);r=rs(r,r.replace(a,c,p))}return r.updateHeight(n,0)}static empty(){return new We(0,0,0)}static of(e){if(e.length==1)return e[0];let t=0,n=e.length,s=0,r=0;for(;;)if(t==n)if(s>r*2){let l=e[t-1];l.break?e.splice(--t,1,l.left,null,l.right):e.splice(--t,1,l.left,l.right),n+=1+l.break,s-=l.size}else if(r>s*2){let l=e[n];l.break?e.splice(n,1,l.left,null,l.right):e.splice(n,1,l.left,l.right),n+=2+l.break,r-=l.size}else break;else if(s<r){let l=e[t++];l&&(s+=l.size)}else{let l=e[--n];l&&(r+=l.size)}let o=0;return e[t-1]==null?(o=1,t--):e[t]==null&&(o=1,n++),new Cf(Oe.of(e.slice(0,t)),o,Oe.of(e.slice(n)))}}function rs(i,e){return i==e?i:(i.constructor!=e.constructor&&(An=!0),e)}Oe.prototype.size=1;const Sf=we.replace({});class Ic extends Oe{constructor(e,t,n){super(e,t),this.deco=n,this.spaceAbove=0}mainBlock(e,t){return new nt(t,this.length,e+this.spaceAbove,this.height-this.spaceAbove,this.deco||0)}blockAt(e,t,n,s){return this.spaceAbove&&e<n+this.spaceAbove?new nt(s,0,n,this.spaceAbove,Sf):this.mainBlock(n,s)}lineAt(e,t,n,s,r){let o=this.mainBlock(s,r);return this.spaceAbove?this.blockAt(0,n,s,r).join(o):o}forEachLine(e,t,n,s,r,o){e<=r+this.length&&t>=r&&o(this.lineAt(0,ce.ByPos,n,s,r))}setMeasuredHeight(e){let t=e.heights[e.index++];t<0?(this.spaceAbove=-t,t=e.heights[e.index++]):this.spaceAbove=0,this.setHeight(t)}updateHeight(e,t=0,n=!1,s){return s&&s.from<=t&&s.more&&this.setMeasuredHeight(s),this.outdated=!1,this}toString(){return`block(${this.length})`}}class We extends Ic{constructor(e,t,n){super(e,t,null),this.collapsed=0,this.widgetHeight=0,this.breaks=0,this.spaceAbove=n}mainBlock(e,t){return new nt(t,this.length,e+this.spaceAbove,this.height-this.spaceAbove,this.breaks)}replace(e,t,n){let s=n[0];return n.length==1&&(s instanceof We||s instanceof _e&&s.flags&4)&&Math.abs(this.length-s.length)<10?(s instanceof _e?s=new We(s.length,this.height,this.spaceAbove):s.height=this.height,this.outdated||(s.outdated=!1),s):Oe.of(n)}updateHeight(e,t=0,n=!1,s){return s&&s.from<=t&&s.more?this.setMeasuredHeight(s):(n||this.outdated)&&(this.spaceAbove=0,this.setHeight(Math.max(this.widgetHeight,e.heightForLine(this.length-this.collapsed))+this.breaks*e.lineHeight)),this.outdated=!1,this}toString(){return`line(${this.length}${this.collapsed?-this.collapsed:""}${this.widgetHeight?":"+this.widgetHeight:""})`}}class _e extends Oe{constructor(e){super(e,0)}heightMetrics(e,t){let n=e.doc.lineAt(t).number,s=e.doc.lineAt(t+this.length).number,r=s-n+1,o,l=0;if(e.lineWrapping){let a=Math.min(this.height,e.lineHeight*r);o=a/r,this.length>r+1&&(l=(this.height-a)/(this.length-r-1))}else o=this.height/r;return{firstLine:n,lastLine:s,perLine:o,perChar:l}}blockAt(e,t,n,s){let{firstLine:r,lastLine:o,perLine:l,perChar:a}=this.heightMetrics(t,s);if(t.lineWrapping){let c=s+(e<t.lineHeight?0:Math.round(Math.max(0,Math.min(1,(e-n)/this.height))*this.length)),h=t.doc.lineAt(c),u=l+h.length*a,d=Math.max(n,e-u/2);return new nt(h.from,h.length,d,u,0)}else{let c=Math.max(0,Math.min(o-r,Math.floor((e-n)/l))),{from:h,length:u}=t.doc.line(r+c);return new nt(h,u,n+l*c,l,0)}}lineAt(e,t,n,s,r){if(t==ce.ByHeight)return this.blockAt(e,n,s,r);if(t==ce.ByPosNoHeight){let{from:f,to:p}=n.doc.lineAt(e);return new nt(f,p-f,0,0,0)}let{firstLine:o,perLine:l,perChar:a}=this.heightMetrics(n,r),c=n.doc.lineAt(e),h=l+c.length*a,u=c.number-o,d=s+l*u+a*(c.from-r-u);return new nt(c.from,c.length,Math.max(s,Math.min(d,s+this.height-h)),h,0)}forEachLine(e,t,n,s,r,o){e=Math.max(e,r),t=Math.min(t,r+this.length);let{firstLine:l,perLine:a,perChar:c}=this.heightMetrics(n,r);for(let h=e,u=s;h<=t;){let d=n.doc.lineAt(h);if(h==e){let p=d.number-l;u+=a*p+c*(e-r-p)}let f=a+c*d.length;o(new nt(d.from,d.length,u,f,0)),u+=f,h=d.to+1}}replace(e,t,n){let s=this.length-t;if(s>0){let r=n[n.length-1];r instanceof _e?n[n.length-1]=new _e(r.length+s):n.push(null,new _e(s-1))}if(e>0){let r=n[0];r instanceof _e?n[0]=new _e(e+r.length):n.unshift(new _e(e-1),null)}return Oe.of(n)}decomposeLeft(e,t){t.push(new _e(e-1),null)}decomposeRight(e,t){t.push(null,new _e(this.length-e-1))}updateHeight(e,t=0,n=!1,s){let r=t+this.length;if(s&&s.from<=t+this.length&&s.more){let o=[],l=Math.max(t,s.from),a=-1;for(s.from>t&&o.push(new _e(s.from-t-1).updateHeight(e,t));l<=r&&s.more;){let h=e.doc.lineAt(l).length;o.length&&o.push(null);let u=s.heights[s.index++],d=0;u<0&&(d=-u,u=s.heights[s.index++]),a==-1?a=u:Math.abs(u-a)>=Vi&&(a=-2);let f=new We(h,u,d);f.outdated=!1,o.push(f),l+=h+1}l<=r&&o.push(null,new _e(r-l).updateHeight(e,l));let c=Oe.of(o);return(a<0||Math.abs(c.height-this.height)>=Vi||Math.abs(a-this.heightMetrics(e,t).perLine)>=Vi)&&(An=!0),rs(this,c)}else(n||this.outdated)&&(this.setHeight(e.heightForGap(t,t+this.length)),this.outdated=!1);return this}toString(){return`gap(${this.length})`}}class Cf extends Oe{constructor(e,t,n){super(e.length+t+n.length,e.height+n.height,t|(e.outdated||n.outdated?2:0)),this.left=e,this.right=n,this.size=e.size+n.size}get break(){return this.flags&1}blockAt(e,t,n,s){let r=n+this.left.height;return e<r?this.left.blockAt(e,t,n,s):this.right.blockAt(e,t,r,s+this.left.length+this.break)}lineAt(e,t,n,s,r){let o=s+this.left.height,l=r+this.left.length+this.break,a=t==ce.ByHeight?e<o:e<l,c=a?this.left.lineAt(e,t,n,s,r):this.right.lineAt(e,t,n,o,l);if(this.break||(a?c.to<l:c.from>l))return c;let h=t==ce.ByPosNoHeight?ce.ByPosNoHeight:ce.ByPos;return a?c.join(this.right.lineAt(l,h,n,o,l)):this.left.lineAt(l,h,n,s,r).join(c)}forEachLine(e,t,n,s,r,o){let l=s+this.left.height,a=r+this.left.length+this.break;if(this.break)e<a&&this.left.forEachLine(e,t,n,s,r,o),t>=a&&this.right.forEachLine(e,t,n,l,a,o);else{let c=this.lineAt(a,ce.ByPos,n,s,r);e<c.from&&this.left.forEachLine(e,c.from-1,n,s,r,o),c.to>=e&&c.from<=t&&o(c),t>c.to&&this.right.forEachLine(c.to+1,t,n,l,a,o)}}replace(e,t,n){let s=this.left.length+this.break;if(t<s)return this.balanced(this.left.replace(e,t,n),this.right);if(e>this.left.length)return this.balanced(this.left,this.right.replace(e-s,t-s,n));let r=[];e>0&&this.decomposeLeft(e,r);let o=r.length;for(let l of n)r.push(l);if(e>0&&Tl(r,o-1),t<this.length){let l=r.length;this.decomposeRight(t,r),Tl(r,l)}return Oe.of(r)}decomposeLeft(e,t){let n=this.left.length;if(e<=n)return this.left.decomposeLeft(e,t);t.push(this.left),this.break&&(n++,e>=n&&t.push(null)),e>n&&this.right.decomposeLeft(e-n,t)}decomposeRight(e,t){let n=this.left.length,s=n+this.break;if(e>=s)return this.right.decomposeRight(e-s,t);e<n&&this.left.decomposeRight(e,t),this.break&&e<s&&t.push(null),t.push(this.right)}balanced(e,t){return e.size>2*t.size||t.size>2*e.size?Oe.of(this.break?[e,null,t]:[e,t]):(this.left=rs(this.left,e),this.right=rs(this.right,t),this.setHeight(e.height+t.height),this.outdated=e.outdated||t.outdated,this.size=e.size+t.size,this.length=e.length+this.break+t.length,this)}updateHeight(e,t=0,n=!1,s){let{left:r,right:o}=this,l=t+r.length+this.break,a=null;return s&&s.from<=t+r.length&&s.more?a=r=r.updateHeight(e,t,n,s):r.updateHeight(e,t,n),s&&s.from<=l+o.length&&s.more?a=o=o.updateHeight(e,l,n,s):o.updateHeight(e,l,n),a?this.balanced(r,o):(this.height=this.left.height+this.right.height,this.outdated=!1,this)}toString(){return this.left+(this.break?" ":"-")+this.right}}function Tl(i,e){let t,n;i[e]==null&&(t=i[e-1])instanceof _e&&(n=i[e+1])instanceof _e&&i.splice(e-1,3,new _e(t.length+1+n.length))}const Af=5;class ko{constructor(e,t){this.pos=e,this.oracle=t,this.nodes=[],this.lineStart=-1,this.lineEnd=-1,this.covering=null,this.writtenTo=e}get isCovered(){return this.covering&&this.nodes[this.nodes.length-1]==this.covering}span(e,t){if(this.lineStart>-1){let n=Math.min(t,this.lineEnd),s=this.nodes[this.nodes.length-1];s instanceof We?s.length+=n-this.pos:(n>this.pos||!this.isCovered)&&this.nodes.push(new We(n-this.pos,-1,0)),this.writtenTo=n,t>n&&(this.nodes.push(null),this.writtenTo++,this.lineStart=-1)}this.pos=t}point(e,t,n){if(e<t||n.heightRelevant){let s=n.widget?n.widget.estimatedHeight:0,r=n.widget?n.widget.lineBreaks:0;s<0&&(s=this.oracle.lineHeight);let o=t-e;n.block?this.addBlock(new Ic(o,s,n)):(o||r||s>=Af)&&this.addLineDeco(s,r,o)}else t>e&&this.span(e,t);this.lineEnd>-1&&this.lineEnd<this.pos&&(this.lineEnd=this.oracle.doc.lineAt(this.pos).to)}enterLine(){if(this.lineStart>-1)return;let{from:e,to:t}=this.oracle.doc.lineAt(this.pos);this.lineStart=e,this.lineEnd=t,this.writtenTo<e&&((this.writtenTo<e-1||this.nodes[this.nodes.length-1]==null)&&this.nodes.push(this.blankContent(this.writtenTo,e-1)),this.nodes.push(null)),this.pos>e&&this.nodes.push(new We(this.pos-e,-1,0)),this.writtenTo=this.pos}blankContent(e,t){let n=new _e(t-e);return this.oracle.doc.lineAt(e).to==t&&(n.flags|=4),n}ensureLine(){this.enterLine();let e=this.nodes.length?this.nodes[this.nodes.length-1]:null;if(e instanceof We)return e;let t=new We(0,-1,0);return this.nodes.push(t),t}addBlock(e){this.enterLine();let t=e.deco;t&&t.startSide>0&&!this.isCovered&&this.ensureLine(),this.nodes.push(e),this.writtenTo=this.pos=this.pos+e.length,t&&t.endSide>0&&(this.covering=e)}addLineDeco(e,t,n){let s=this.ensureLine();s.length+=n,s.collapsed+=n,s.widgetHeight=Math.max(s.widgetHeight,e),s.breaks+=t,this.writtenTo=this.pos=this.pos+n}finish(e){let t=this.nodes.length==0?null:this.nodes[this.nodes.length-1];this.lineStart>-1&&!(t instanceof We)&&!this.isCovered?this.nodes.push(new We(0,-1,0)):(this.writtenTo<this.pos||t==null)&&this.nodes.push(this.blankContent(this.writtenTo,this.pos));let n=e;for(let s of this.nodes)s instanceof We&&s.updateHeight(this.oracle,n),n+=s?s.length:1;return this.nodes}static build(e,t,n,s){let r=new ko(n,e);return Q.spans(t,n,s,r,0),r.finish(n)}}function Tf(i,e,t){let n=new Mf;return Q.compare(i,e,t,n,0),n.changes}class Mf{constructor(){this.changes=[]}compareRange(){}comparePoint(e,t,n,s){(e<t||n&&n.heightRelevant||s&&s.heightRelevant)&&vn(e,t,this.changes,5)}}function Ef(i,e){let t=i.getBoundingClientRect(),n=i.ownerDocument,s=n.defaultView||window,r=Math.max(0,t.left),o=Math.min(s.innerWidth,t.right),l=Math.max(0,t.top),a=Math.min(s.innerHeight,t.bottom);for(let c=i.parentNode;c&&c!=n.body;)if(c.nodeType==1){let h=c,u=window.getComputedStyle(h);if((h.scrollHeight>h.clientHeight||h.scrollWidth>h.clientWidth)&&u.overflow!="visible"){let d=h.getBoundingClientRect();r=Math.max(r,d.left),o=Math.min(o,d.right),l=Math.max(l,d.top),a=Math.min(c==i.parentNode?s.innerHeight:a,d.bottom)}c=u.position=="absolute"||u.position=="fixed"?h.offsetParent:h.parentNode}else if(c.nodeType==11)c=c.host;else break;return{left:r-t.left,right:Math.max(r,o)-t.left,top:l-(t.top+e),bottom:Math.max(l,a)-(t.top+e)}}function Bf(i){let e=i.getBoundingClientRect(),t=i.ownerDocument.defaultView||window;return e.left<t.innerWidth&&e.right>0&&e.top<t.innerHeight&&e.bottom>0}function Df(i,e){let t=i.getBoundingClientRect();return{left:0,right:t.right-t.left,top:e,bottom:t.bottom-(t.top+e)}}class $s{constructor(e,t,n,s){this.from=e,this.to=t,this.size=n,this.displaySize=s}static same(e,t){if(e.length!=t.length)return!1;for(let n=0;n<e.length;n++){let s=e[n],r=t[n];if(s.from!=r.from||s.to!=r.to||s.size!=r.size)return!1}return!0}draw(e,t){return we.replace({widget:new Pf(this.displaySize*(t?e.scaleY:e.scaleX),t)}).range(this.from,this.to)}}class Pf extends ps{constructor(e,t){super(),this.size=e,this.vertical=t}eq(e){return e.size==this.size&&e.vertical==this.vertical}toDOM(){let e=document.createElement("div");return this.vertical?e.style.height=this.size+"px":(e.style.width=this.size+"px",e.style.height="2px",e.style.display="inline-block"),e}get estimatedHeight(){return this.vertical?this.size:-1}}class Ml{constructor(e,t){this.view=e,this.state=t,this.pixelViewport={left:0,right:window.innerWidth,top:0,bottom:0},this.inView=!0,this.paddingTop=0,this.paddingBottom=0,this.contentDOMWidth=0,this.contentDOMHeight=0,this.editorHeight=0,this.editorWidth=0,this.scaleX=1,this.scaleY=1,this.scrollOffset=0,this.scrolledToBottom=!1,this.scrollAnchorPos=0,this.scrollAnchorHeight=-1,this.scaler=El,this.scrollTarget=null,this.printing=!1,this.mustMeasureContent=!0,this.defaultTextDirection=de.LTR,this.visibleRanges=[],this.mustEnforceCursorAssoc=!1;let n=t.facet(wo).some(s=>typeof s!="function"&&s.class=="cm-lineWrapping");this.heightOracle=new kf(n),this.stateDeco=Bl(t),this.heightMap=Oe.empty().applyChanges(this.stateDeco,Z.empty,this.heightOracle.setDoc(t.doc),[new Ge(0,0,0,t.doc.length)]);for(let s=0;s<2&&(this.viewport=this.getViewport(0,null),!!this.updateForViewport());s++);this.updateViewportLines(),this.lineGaps=this.ensureLineGaps([]),this.lineGapDeco=we.set(this.lineGaps.map(s=>s.draw(this,!1))),this.scrollParent=e.scrollDOM,this.computeVisibleRanges()}updateForViewport(){let e=[this.viewport],{main:t}=this.state.selection;for(let n=0;n<=1;n++){let s=n?t.head:t.anchor;if(!e.some(({from:r,to:o})=>s>=r&&s<=o)){let{from:r,to:o}=this.lineBlockAt(s);e.push(new Ai(r,o))}}return this.viewports=e.sort((n,s)=>n.from-s.from),this.updateScaler()}updateScaler(){let e=this.scaler;return this.scaler=this.heightMap.height<=7e6?El:new _o(this.heightOracle,this.heightMap,this.viewports),e.eq(this.scaler)?0:2}updateViewportLines(){this.viewportLines=[],this.heightMap.forEachLine(this.viewport.from,this.viewport.to,this.heightOracle.setDoc(this.state.doc),0,0,e=>{this.viewportLines.push(Kn(e,this.scaler))})}update(e,t=null){this.state=e.state;let n=this.stateDeco;this.stateDeco=Bl(this.state);let s=e.changedRanges,r=Ge.extendWithRanges(s,Tf(n,this.stateDeco,e?e.changes:ve.empty(this.state.doc.length))),o=this.heightMap.height,l=this.scrolledToBottom?null:this.scrollAnchorAt(this.scrollOffset);Al(),this.heightMap=this.heightMap.applyChanges(this.stateDeco,e.startState.doc,this.heightOracle.setDoc(this.state.doc),r),(this.heightMap.height!=o||An)&&(e.flags|=2),l?(this.scrollAnchorPos=e.changes.mapPos(l.from,-1),this.scrollAnchorHeight=l.top):(this.scrollAnchorPos=-1,this.scrollAnchorHeight=o);let a=r.length?this.mapViewport(this.viewport,e.changes):this.viewport;(t&&(t.range.head<a.from||t.range.head>a.to)||!this.viewportIsAppropriate(a))&&(a=this.getViewport(0,t));let c=a.from!=this.viewport.from||a.to!=this.viewport.to;this.viewport=a,e.flags|=this.updateForViewport(),(c||!e.changes.empty||e.flags&2)&&this.updateViewportLines(),(this.lineGaps.length||this.viewport.to-this.viewport.from>4e3)&&this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps,e.changes))),e.flags|=this.computeVisibleRanges(e.changes),t&&(this.scrollTarget=t),!this.mustEnforceCursorAssoc&&(e.selectionSet||e.focusChanged)&&e.view.lineWrapping&&e.state.selection.main.empty&&e.state.selection.main.assoc&&!e.state.facet(pc)&&(this.mustEnforceCursorAssoc=!0)}measure(){let{view:e}=this,t=e.contentDOM,n=window.getComputedStyle(t),s=this.heightOracle,r=n.whiteSpace;this.defaultTextDirection=n.direction=="rtl"?de.RTL:de.LTR;let o=this.heightOracle.mustRefreshForWrapping(r)||this.mustMeasureContent==="refresh",l=t.getBoundingClientRect(),a=o||this.mustMeasureContent||this.contentDOMHeight!=l.height;this.contentDOMHeight=l.height,this.mustMeasureContent=!1;let c=0,h=0;if(l.width&&l.height){let{scaleX:C,scaleY:A}=Ya(t,l);(C>.005&&Math.abs(this.scaleX-C)>.005||A>.005&&Math.abs(this.scaleY-A)>.005)&&(this.scaleX=C,this.scaleY=A,c|=16,o=a=!0)}let u=(parseInt(n.paddingTop)||0)*this.scaleY,d=(parseInt(n.paddingBottom)||0)*this.scaleY;(this.paddingTop!=u||this.paddingBottom!=d)&&(this.paddingTop=u,this.paddingBottom=d,c|=18),this.editorWidth!=e.scrollDOM.clientWidth&&(s.lineWrapping&&(a=!0),this.editorWidth=e.scrollDOM.clientWidth,c|=16);let f=Ja(this.view.contentDOM,!1).y;f!=this.scrollParent&&(this.scrollParent=f,this.scrollAnchorHeight=-1,this.scrollOffset=0);let p=this.getScrollOffset();this.scrollOffset!=p&&(this.scrollAnchorHeight=-1,this.scrollOffset=p),this.scrolledToBottom=Za(this.scrollParent||e.win);let m=(this.printing?Df:Ef)(t,this.paddingTop),g=m.top-this.pixelViewport.top,b=m.bottom-this.pixelViewport.bottom;this.pixelViewport=m;let k=this.pixelViewport.bottom>this.pixelViewport.top&&this.pixelViewport.right>this.pixelViewport.left;if(k!=this.inView&&(this.inView=k,k&&(a=!0)),!this.inView&&!this.scrollTarget&&!Bf(e.dom))return 0;let v=l.width;if((this.contentDOMWidth!=v||this.editorHeight!=e.scrollDOM.clientHeight)&&(this.contentDOMWidth=l.width,this.editorHeight=e.scrollDOM.clientHeight,c|=16),a){let C=e.docView.measureVisibleLineHeights(this.viewport);if(s.mustRefreshForHeights(C)&&(o=!0),o||s.lineWrapping&&Math.abs(v-this.contentDOMWidth)>s.charWidth){let{lineHeight:A,charWidth:x,textHeight:D}=e.docView.measureTextSize();o=A>0&&s.refresh(r,A,x,D,Math.max(5,v/x),C),o&&(e.docView.minWidth=0,c|=16)}g>0&&b>0?h=Math.max(g,b):g<0&&b<0&&(h=Math.min(g,b)),Al();for(let A of this.viewports){let x=A.from==this.viewport.from?C:e.docView.measureVisibleLineHeights(A);this.heightMap=(o?Oe.empty().applyChanges(this.stateDeco,Z.empty,this.heightOracle,[new Ge(0,0,0,e.state.doc.length)]):this.heightMap).updateHeight(s,0,o,new _f(A.from,x))}An&&(c|=2)}let I=!this.viewportIsAppropriate(this.viewport,h)||this.scrollTarget&&(this.scrollTarget.range.head<this.viewport.from||this.scrollTarget.range.head>this.viewport.to);return I&&(c&2&&(c|=this.updateScaler()),this.viewport=this.getViewport(h,this.scrollTarget),c|=this.updateForViewport()),(c&2||I)&&this.updateViewportLines(),(this.lineGaps.length||this.viewport.to-this.viewport.from>4e3)&&this.updateLineGaps(this.ensureLineGaps(o?[]:this.lineGaps,e)),c|=this.computeVisibleRanges(),this.mustEnforceCursorAssoc&&(this.mustEnforceCursorAssoc=!1,e.docView.enforceCursorAssoc()),c}get visibleTop(){return this.scaler.fromDOM(this.pixelViewport.top)}get visibleBottom(){return this.scaler.fromDOM(this.pixelViewport.bottom)}getViewport(e,t){let n=.5-Math.max(-.5,Math.min(.5,e/1e3/2)),s=this.heightMap,r=this.heightOracle,{visibleTop:o,visibleBottom:l}=this,a=new Ai(s.lineAt(o-n*1e3,ce.ByHeight,r,0,0).from,s.lineAt(l+(1-n)*1e3,ce.ByHeight,r,0,0).to);if(t){let{head:c}=t.range;if(c<a.from||c>a.to){let h=Math.min(this.editorHeight,this.pixelViewport.bottom-this.pixelViewport.top),u=s.lineAt(c,ce.ByPos,r,0,0),d;t.y=="center"?d=(u.top+u.bottom)/2-h/2:t.y=="start"||t.y=="nearest"&&c<a.from?d=u.top:d=u.bottom-h,a=new Ai(s.lineAt(d-1e3/2,ce.ByHeight,r,0,0).from,s.lineAt(d+h+1e3/2,ce.ByHeight,r,0,0).to)}}return a}mapViewport(e,t){let n=t.mapPos(e.from,-1),s=t.mapPos(e.to,1);return new Ai(this.heightMap.lineAt(n,ce.ByPos,this.heightOracle,0,0).from,this.heightMap.lineAt(s,ce.ByPos,this.heightOracle,0,0).to)}viewportIsAppropriate({from:e,to:t},n=0){if(!this.inView)return!0;let{top:s}=this.heightMap.lineAt(e,ce.ByPos,this.heightOracle,0,0),{bottom:r}=this.heightMap.lineAt(t,ce.ByPos,this.heightOracle,0,0),{visibleTop:o,visibleBottom:l}=this;return(e==0||s<=o-Math.max(10,Math.min(-n,250)))&&(t==this.state.doc.length||r>=l+Math.max(10,Math.min(n,250)))&&s>o-2*1e3&&r<l+2*1e3}mapLineGaps(e,t){if(!e.length||t.empty)return e;let n=[];for(let s of e)t.touchesRange(s.from,s.to)||n.push(new $s(t.mapPos(s.from),t.mapPos(s.to),s.size,s.displaySize));return n}ensureLineGaps(e,t){let n=this.heightOracle.lineWrapping,s=n?1e4:2e3,r=s>>1,o=s<<1;if(this.defaultTextDirection!=de.LTR&&!n)return[];let l=[],a=(h,u,d,f)=>{if(u-h<r)return;let p=this.state.selection.main,m=[p.from];p.empty||m.push(p.to);for(let b of m)if(b>h&&b<u){a(h,b-10,d,f),a(b+10,u,d,f);return}let g=Lf(e,b=>b.from>=d.from&&b.to<=d.to&&Math.abs(b.from-h)<r&&Math.abs(b.to-u)<r&&!m.some(k=>b.from<k&&b.to>k));if(!g){if(u<d.to&&t&&n&&t.visibleRanges.some(v=>v.from<=u&&v.to>=u)){let v=t.moveToLineBoundary(_.cursor(u),!1,!0).head;v>h&&(u=v)}let b=this.gapSize(d,h,u,f),k=n||b<2e6?b:2e6;g=new $s(h,u,b,k)}l.push(g)},c=h=>{if(h.length<o||h.type!=Ce.Text)return;let u=Of(h.from,h.to,this.stateDeco);if(u.total<o)return;let d=this.scrollTarget?this.scrollTarget.range.head:null,f,p;if(n){let m=s/this.heightOracle.lineLength*this.heightOracle.lineHeight,g,b;if(d!=null){let k=Mi(u,d),v=((this.visibleBottom-this.visibleTop)/2+m)/h.height;g=k-v,b=k+v}else g=(this.visibleTop-h.top-m)/h.height,b=(this.visibleBottom-h.top+m)/h.height;f=Ti(u,g),p=Ti(u,b)}else{let m=u.total*this.heightOracle.charWidth,g=s*this.heightOracle.charWidth,b=0;if(m>2e6)for(let A of e)A.from>=h.from&&A.from<h.to&&A.size!=A.displaySize&&A.from*this.heightOracle.charWidth+b<this.pixelViewport.left&&(b=A.size-A.displaySize);let k=this.pixelViewport.left+b,v=this.pixelViewport.right+b,I,C;if(d!=null){let A=Mi(u,d),x=((v-k)/2+g)/m;I=A-x,C=A+x}else I=(k-g)/m,C=(v+g)/m;f=Ti(u,I),p=Ti(u,C)}f>h.from&&a(h.from,f,h,u),p<h.to&&a(p,h.to,h,u)};for(let h of this.viewportLines)Array.isArray(h.type)?h.type.forEach(c):c(h);return l}gapSize(e,t,n,s){let r=Mi(s,n)-Mi(s,t);return this.heightOracle.lineWrapping?e.height*r:s.total*this.heightOracle.charWidth*r}updateLineGaps(e){$s.same(e,this.lineGaps)||(this.lineGaps=e,this.lineGapDeco=we.set(e.map(t=>t.draw(this,this.heightOracle.lineWrapping))))}computeVisibleRanges(e){let t=this.stateDeco;this.lineGaps.length&&(t=t.concat(this.lineGapDeco));let n=[];Q.spans(t,this.viewport.from,this.viewport.to,{span(r,o){n.push({from:r,to:o})},point(){}},20);let s=0;if(n.length!=this.visibleRanges.length)s=12;else for(let r=0;r<n.length&&!(s&8);r++){let o=this.visibleRanges[r],l=n[r];(o.from!=l.from||o.to!=l.to)&&(s|=4,e&&e.mapPos(o.from,-1)==l.from&&e.mapPos(o.to,1)==l.to||(s|=8))}return this.visibleRanges=n,s}lineBlockAt(e){return e>=this.viewport.from&&e<=this.viewport.to&&this.viewportLines.find(t=>t.from<=e&&t.to>=e)||Kn(this.heightMap.lineAt(e,ce.ByPos,this.heightOracle,0,0),this.scaler)}lineBlockAtHeight(e){return e>=this.viewportLines[0].top&&e<=this.viewportLines[this.viewportLines.length-1].bottom&&this.viewportLines.find(t=>t.top<=e&&t.bottom>=e)||Kn(this.heightMap.lineAt(this.scaler.fromDOM(e),ce.ByHeight,this.heightOracle,0,0),this.scaler)}getScrollOffset(){return(this.scrollParent==this.view.scrollDOM?this.scrollParent.scrollTop:(this.scrollParent?this.scrollParent.getBoundingClientRect().top:0)-this.view.contentDOM.getBoundingClientRect().top)*this.scaleY}scrollAnchorAt(e){let t=this.lineBlockAtHeight(e+8);return t.from>=this.viewport.from||this.viewportLines[0].top-e>200?t:this.viewportLines[0]}elementAtHeight(e){return Kn(this.heightMap.blockAt(this.scaler.fromDOM(e),this.heightOracle,0,0),this.scaler)}get docHeight(){return this.scaler.toDOM(this.heightMap.height)}get contentHeight(){return this.docHeight+this.paddingTop+this.paddingBottom}}class Ai{constructor(e,t){this.from=e,this.to=t}}function Of(i,e,t){let n=[],s=i,r=0;return Q.spans(t,i,e,{span(){},point(o,l){o>s&&(n.push({from:s,to:o}),r+=o-s),s=l}},20),s<e&&(n.push({from:s,to:e}),r+=e-s),{total:r,ranges:n}}function Ti({total:i,ranges:e},t){if(t<=0)return e[0].from;if(t>=1)return e[e.length-1].to;let n=Math.floor(i*t);for(let s=0;;s++){let{from:r,to:o}=e[s],l=o-r;if(n<=l)return r+n;n-=l}}function Mi(i,e){let t=0;for(let{from:n,to:s}of i.ranges){if(e<=s){t+=e-n;break}t+=s-n}return t/i.total}function Lf(i,e){for(let t of i)if(e(t))return t}const El={toDOM(i){return i},fromDOM(i){return i},scale:1,eq(i){return i==this}};function Bl(i){let e=i.facet(ms).filter(n=>typeof n!="function"),t=i.facet(vo).filter(n=>typeof n!="function");return t.length&&e.push(Q.join(t)),e}class _o{constructor(e,t,n){let s=0,r=0,o=0;this.viewports=n.map(({from:l,to:a})=>{let c=t.lineAt(l,ce.ByPos,e,0,0).top,h=t.lineAt(a,ce.ByPos,e,0,0).bottom;return s+=h-c,{from:l,to:a,top:c,bottom:h,domTop:0,domBottom:0}}),this.scale=(7e6-s)/(t.height-s);for(let l of this.viewports)l.domTop=o+(l.top-r)*this.scale,o=l.domBottom=l.domTop+(l.bottom-l.top),r=l.bottom}toDOM(e){for(let t=0,n=0,s=0;;t++){let r=t<this.viewports.length?this.viewports[t]:null;if(!r||e<r.top)return s+(e-n)*this.scale;if(e<=r.bottom)return r.domTop+(e-r.top);n=r.bottom,s=r.domBottom}}fromDOM(e){for(let t=0,n=0,s=0;;t++){let r=t<this.viewports.length?this.viewports[t]:null;if(!r||e<r.domTop)return n+(e-s)/this.scale;if(e<=r.domBottom)return r.top+(e-r.domTop);n=r.bottom,s=r.domBottom}}eq(e){return e instanceof _o?this.scale==e.scale&&this.viewports.length==e.viewports.length&&this.viewports.every((t,n)=>t.from==e.viewports[n].from&&t.to==e.viewports[n].to):!1}}function Kn(i,e){if(e.scale==1)return i;let t=e.toDOM(i.top),n=e.toDOM(i.bottom);return new nt(i.from,i.length,t,n-t,Array.isArray(i._content)?i._content.map(s=>Kn(s,e)):i._content)}const Ei=z.define({combine:i=>i.join(" ")}),Ir=z.define({combine:i=>i.indexOf(!0)>-1}),zr=Ht.newName(),zc=Ht.newName(),qc=Ht.newName(),Nc={"&light":"."+zc,"&dark":"."+qc};function qr(i,e,t){return new Ht(e,{finish(n){return/&/.test(n)?n.replace(/&\w*/,s=>{if(s=="&")return i;if(!t||!t[s])throw new RangeError(`Unsupported selector: ${s}`);return t[s]}):i+" "+n}})}const Rf=qr("."+zr,{"&":{position:"relative !important",boxSizing:"border-box","&.cm-focused":{outline:"1px dotted #212121"},display:"flex !important",flexDirection:"column"},".cm-scroller":{display:"flex !important",alignItems:"flex-start !important",fontFamily:"monospace",lineHeight:1.4,height:"100%",overflowX:"auto",position:"relative",zIndex:0,overflowAnchor:"none"},".cm-content":{margin:0,flexGrow:2,flexShrink:0,display:"block",whiteSpace:"pre",wordWrap:"normal",boxSizing:"border-box",minHeight:"100%",padding:"4px 0",outline:"none","&[contenteditable=true]":{WebkitUserModify:"read-write-plaintext-only"}},".cm-lineWrapping":{whiteSpace_fallback:"pre-wrap",whiteSpace:"break-spaces",wordBreak:"break-word",overflowWrap:"anywhere",flexShrink:1},"&light .cm-content":{caretColor:"black"},"&dark .cm-content":{caretColor:"white"},".cm-line":{display:"block",padding:"0 2px 0 6px"},".cm-layer":{position:"absolute",left:0,top:0,contain:"size style","& > *":{position:"absolute"}},"&light .cm-selectionBackground":{background:"#d9d9d9"},"&dark .cm-selectionBackground":{background:"#222"},"&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#d7d4f0"},"&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#233"},".cm-cursorLayer":{pointerEvents:"none"},"&.cm-focused > .cm-scroller > .cm-cursorLayer":{animation:"steps(1) cm-blink 1.2s infinite"},"@keyframes cm-blink":{"0%":{},"50%":{opacity:0},"100%":{}},"@keyframes cm-blink2":{"0%":{},"50%":{opacity:0},"100%":{}},".cm-cursor, .cm-dropCursor":{borderLeft:"1.2px solid black",marginLeft:"-0.6px",pointerEvents:"none"},".cm-cursor":{display:"none"},"&dark .cm-cursor":{borderLeftColor:"#ddd"},".cm-selectionHandle":{backgroundColor:"currentColor",width:"1.5px"},".cm-selectionHandle-start::before, .cm-selectionHandle-end::before":{content:'""',backgroundColor:"inherit",borderRadius:"50%",width:"8px",height:"8px",position:"absolute",left:"-3.25px"},".cm-selectionHandle-start::before":{top:"-8px"},".cm-selectionHandle-end::before":{bottom:"-8px"},".cm-dropCursor":{position:"absolute"},"&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor":{display:"block"},".cm-iso":{unicodeBidi:"isolate"},".cm-announced":{position:"fixed",top:"-10000px"},"@media print":{".cm-announced":{display:"none"}},"&light .cm-activeLine":{backgroundColor:"#cceeff44"},"&dark .cm-activeLine":{backgroundColor:"#99eeff33"},"&light .cm-specialChar":{color:"red"},"&dark .cm-specialChar":{color:"#f78"},".cm-gutters":{flexShrink:0,display:"flex",height:"100%",boxSizing:"border-box",zIndex:200},".cm-gutters-before":{insetInlineStart:0},".cm-gutters-after":{insetInlineEnd:0},"&light .cm-gutters":{backgroundColor:"#f5f5f5",color:"#6c6c6c",border:"0px solid #ddd","&.cm-gutters-before":{borderRightWidth:"1px"},"&.cm-gutters-after":{borderLeftWidth:"1px"}},"&dark .cm-gutters":{backgroundColor:"#333338",color:"#ccc"},".cm-gutter":{display:"flex !important",flexDirection:"column",flexShrink:0,boxSizing:"border-box",minHeight:"100%",overflow:"hidden"},".cm-gutterElement":{boxSizing:"border-box"},".cm-lineNumbers .cm-gutterElement":{padding:"0 3px 0 5px",minWidth:"20px",textAlign:"right",whiteSpace:"nowrap"},"&light .cm-activeLineGutter":{backgroundColor:"#e2f2ff"},"&dark .cm-activeLineGutter":{backgroundColor:"#222227"},".cm-panels":{boxSizing:"border-box",position:"sticky",left:0,right:0,zIndex:300},"&light .cm-panels":{backgroundColor:"#f5f5f5",color:"black"},"&light .cm-panels-top":{borderBottom:"1px solid #ddd"},"&light .cm-panels-bottom":{borderTop:"1px solid #ddd"},"&dark .cm-panels":{backgroundColor:"#333338",color:"white"},".cm-dialog":{padding:"2px 19px 4px 6px",position:"relative","& label":{fontSize:"80%"}},".cm-dialog-close":{position:"absolute",top:"3px",right:"4px",backgroundColor:"inherit",border:"none",font:"inherit",fontSize:"14px",padding:"0"},".cm-tab":{display:"inline-block",overflow:"hidden",verticalAlign:"bottom"},".cm-widgetBuffer":{verticalAlign:"text-top",height:"1em",width:0,display:"inline"},".cm-placeholder":{color:"#888",display:"inline-block",verticalAlign:"top",userSelect:"none"},".cm-highlightSpace":{backgroundImage:"radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",backgroundPosition:"center"},".cm-highlightTab":{backgroundImage:`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,backgroundSize:"auto 100%",backgroundPosition:"right 90%",backgroundRepeat:"no-repeat"},".cm-trailingSpace":{backgroundColor:"#ff332255"},".cm-button":{verticalAlign:"middle",color:"inherit",fontSize:"70%",padding:".2em 1em",borderRadius:"1px"},"&light .cm-button":{backgroundImage:"linear-gradient(#eff1f5, #d9d9df)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#b4b4b4, #d0d3d6)"}},"&dark .cm-button":{backgroundImage:"linear-gradient(#393939, #111)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#111, #333)"}},".cm-textfield":{verticalAlign:"middle",color:"inherit",fontSize:"70%",border:"1px solid silver",padding:".2em .5em"},"&light .cm-textfield":{backgroundColor:"white"},"&dark .cm-textfield":{border:"1px solid #555",backgroundColor:"inherit"}},Nc),If={childList:!0,characterData:!0,subtree:!0,attributes:!0,characterDataOldValue:!0},Us=O.ie&&O.ie_version<=11;class zf{constructor(e){this.view=e,this.active=!1,this.editContext=null,this.selectionRange=new dd,this.selectionChanged=!1,this.delayedFlush=-1,this.resizeTimeout=-1,this.queue=[],this.delayedAndroidKey=null,this.flushingAndroidKey=-1,this.lastChange=0,this.scrollTargets=[],this.intersection=null,this.resizeScroll=null,this.intersecting=!1,this.gapIntersection=null,this.gaps=[],this.printQuery=null,this.parentCheck=-1,this.dom=e.contentDOM,this.observer=new MutationObserver(t=>{for(let n of t)this.queue.push(n);(O.ie&&O.ie_version<=11||O.ios&&e.composing)&&t.some(n=>n.type=="childList"&&n.removedNodes.length||n.type=="characterData"&&n.oldValue.length>n.target.nodeValue.length)?this.flushSoon():this.flush()}),window.EditContext&&O.android&&e.constructor.EDIT_CONTEXT!==!1&&!(O.chrome&&O.chrome_version<126)&&(this.editContext=new Nf(e),e.state.facet(Mt)&&(e.contentDOM.editContext=this.editContext.editContext)),Us&&(this.onCharData=t=>{this.queue.push({target:t.target,type:"characterData",oldValue:t.prevValue}),this.flushSoon()}),this.onSelectionChange=this.onSelectionChange.bind(this),this.onResize=this.onResize.bind(this),this.onPrint=this.onPrint.bind(this),this.onScroll=this.onScroll.bind(this),window.matchMedia&&(this.printQuery=window.matchMedia("print")),typeof ResizeObserver=="function"&&(this.resizeScroll=new ResizeObserver(()=>{var t;((t=this.view.docView)===null||t===void 0?void 0:t.lastUpdate)<Date.now()-75&&this.onResize()}),this.resizeScroll.observe(e.scrollDOM)),this.addWindowListeners(this.win=e.win),this.start(),typeof IntersectionObserver=="function"&&(this.intersection=new IntersectionObserver(t=>{this.parentCheck<0&&(this.parentCheck=setTimeout(this.listenForScroll.bind(this),1e3)),t.length>0&&t[t.length-1].intersectionRatio>0!=this.intersecting&&(this.intersecting=!this.intersecting,this.intersecting!=this.view.inView&&this.onScrollChanged(document.createEvent("Event")))},{threshold:[0,.001]}),this.intersection.observe(this.dom),this.gapIntersection=new IntersectionObserver(t=>{t.length>0&&t[t.length-1].intersectionRatio>0&&this.onScrollChanged(document.createEvent("Event"))},{})),this.listenForScroll(),this.readSelectionRange()}onScrollChanged(e){this.view.inputState.runHandlers("scroll",e),this.intersecting&&this.view.measure()}onScroll(e){this.intersecting&&this.flush(!1),this.editContext&&this.view.requestMeasure(this.editContext.measureReq),this.onScrollChanged(e)}onResize(){this.resizeTimeout<0&&(this.resizeTimeout=setTimeout(()=>{this.resizeTimeout=-1,this.view.requestMeasure()},50))}onPrint(e){(e.type=="change"||!e.type)&&!e.matches||(this.view.viewState.printing=!0,this.view.measure(),setTimeout(()=>{this.view.viewState.printing=!1,this.view.requestMeasure()},500))}updateGaps(e){if(this.gapIntersection&&(e.length!=this.gaps.length||this.gaps.some((t,n)=>t!=e[n]))){this.gapIntersection.disconnect();for(let t of e)this.gapIntersection.observe(t);this.gaps=e}}onSelectionChange(e){let t=this.selectionChanged;if(!this.readSelectionRange()||this.delayedAndroidKey)return;let{view:n}=this,s=this.selectionRange;if(n.state.facet(Mt)?n.root.activeElement!=this.dom:!Jn(this.dom,s))return;let r=s.anchorNode&&n.docView.tile.nearest(s.anchorNode);if(r&&r.isWidget()&&r.widget.ignoreEvent(e)){t||(this.selectionChanged=!1);return}(O.ie&&O.ie_version<=11||O.android&&O.chrome)&&!n.state.selection.main.empty&&s.focusNode&&Qn(s.focusNode,s.focusOffset,s.anchorNode,s.anchorOffset)?this.flushSoon():this.flush(!1)}readSelectionRange(){let{view:e}=this,t=li(e.root);if(!t)return!1;let n=O.safari&&e.root.nodeType==11&&e.root.activeElement==this.dom&&qf(this.view,t)||t;if(!n||this.selectionRange.eq(n))return!1;let s=Jn(this.dom,n);return s&&!this.selectionChanged&&e.inputState.lastFocusTime>Date.now()-200&&e.inputState.lastTouchTime<Date.now()-300&&pd(this.dom,n)?(this.view.inputState.lastFocusTime=0,e.docView.updateSelection(),!1):(this.selectionRange.setRange(n),s&&(this.selectionChanged=!0),!0)}setSelectionRange(e,t){this.selectionRange.set(e.node,e.offset,t.node,t.offset),this.selectionChanged=!1}clearSelectionRange(){this.selectionRange.set(null,0,null,0)}listenForScroll(){this.parentCheck=-1;let e=0,t=null;for(let n=this.dom;n;)if(n.nodeType==1)!t&&e<this.scrollTargets.length&&this.scrollTargets[e]==n?e++:t||(t=this.scrollTargets.slice(0,e)),t&&t.push(n),n=n.assignedSlot||n.parentNode;else if(n.nodeType==11)n=n.host;else break;if(e<this.scrollTargets.length&&!t&&(t=this.scrollTargets.slice(0,e)),t){for(let n of this.scrollTargets)n.removeEventListener("scroll",this.onScroll);for(let n of this.scrollTargets=t)n.addEventListener("scroll",this.onScroll)}}ignore(e){if(!this.active)return e();try{return this.stop(),e()}finally{this.start(),this.clear()}}start(){this.active||(this.observer.observe(this.dom,If),Us&&this.dom.addEventListener("DOMCharacterDataModified",this.onCharData),this.active=!0)}stop(){this.active&&(this.active=!1,this.observer.disconnect(),Us&&this.dom.removeEventListener("DOMCharacterDataModified",this.onCharData))}clear(){this.processRecords(),this.queue.length=0,this.selectionChanged=!1}delayAndroidKey(e,t){var n;if(!this.delayedAndroidKey){let s=()=>{let r=this.delayedAndroidKey;r&&(this.clearDelayedAndroidKey(),this.view.inputState.lastKeyCode=r.keyCode,this.view.inputState.lastKeyTime=Date.now(),!this.flush()&&r.force&&xn(this.dom,r.key,r.keyCode))};this.flushingAndroidKey=this.view.win.requestAnimationFrame(s)}(!this.delayedAndroidKey||e=="Enter")&&(this.delayedAndroidKey={key:e,keyCode:t,force:this.lastChange<Date.now()-50||!!(!((n=this.delayedAndroidKey)===null||n===void 0)&&n.force)})}clearDelayedAndroidKey(){this.win.cancelAnimationFrame(this.flushingAndroidKey),this.delayedAndroidKey=null,this.flushingAndroidKey=-1}flushSoon(){this.delayedFlush<0&&(this.delayedFlush=this.view.win.requestAnimationFrame(()=>{this.delayedFlush=-1,this.flush()}))}forceFlush(){this.delayedFlush>=0&&(this.view.win.cancelAnimationFrame(this.delayedFlush),this.delayedFlush=-1),this.flush()}pendingRecords(){for(let e of this.observer.takeRecords())this.queue.push(e);return this.queue}processRecords(){let e=this.pendingRecords();e.length&&(this.queue=[]);let t=-1,n=-1,s=!1;for(let r of e){let o=this.readMutation(r);o&&(o.typeOver&&(s=!0),t==-1?{from:t,to:n}=o:(t=Math.min(o.from,t),n=Math.max(o.to,n)))}return{from:t,to:n,typeOver:s}}readChange(){let{from:e,to:t,typeOver:n}=this.processRecords(),s=this.selectionChanged&&Jn(this.dom,this.selectionRange);if(e<0&&!s)return null;e>-1&&(this.lastChange=Date.now()),this.view.inputState.lastFocusTime=0,this.selectionChanged=!1;let r=new tf(this.view,e,t,n);return this.view.docView.domChanged={newSel:r.newSel?r.newSel.main:null},r}flush(e=!0){if(this.delayedFlush>=0||this.delayedAndroidKey)return!1;e&&this.readSelectionRange();let t=this.readChange();if(!t)return this.view.requestMeasure(),!1;let n=this.view.state,s=Ac(this.view,t);return this.view.state==n&&(t.domChanged||t.newSel&&!ss(this.view.state.selection,t.newSel.main))&&this.view.update([]),s}readMutation(e){let t=this.view.docView.tile.nearest(e.target);if(!t||t.isWidget())return null;if(t.markDirty(e.type=="attributes"),e.type=="childList"){let n=Dl(t,e.previousSibling||e.target.previousSibling,-1),s=Dl(t,e.nextSibling||e.target.nextSibling,1);return{from:n?t.posAfter(n):t.posAtStart,to:s?t.posBefore(s):t.posAtEnd,typeOver:!1}}else return e.type=="characterData"?{from:t.posAtStart,to:t.posAtEnd,typeOver:e.target.nodeValue==e.oldValue}:null}setWindow(e){e!=this.win&&(this.removeWindowListeners(this.win),this.win=e,this.addWindowListeners(this.win))}addWindowListeners(e){e.addEventListener("resize",this.onResize),this.printQuery?this.printQuery.addEventListener?this.printQuery.addEventListener("change",this.onPrint):this.printQuery.addListener(this.onPrint):e.addEventListener("beforeprint",this.onPrint),e.addEventListener("scroll",this.onScroll),e.document.addEventListener("selectionchange",this.onSelectionChange)}removeWindowListeners(e){e.removeEventListener("scroll",this.onScroll),e.removeEventListener("resize",this.onResize),this.printQuery?this.printQuery.removeEventListener?this.printQuery.removeEventListener("change",this.onPrint):this.printQuery.removeListener(this.onPrint):e.removeEventListener("beforeprint",this.onPrint),e.document.removeEventListener("selectionchange",this.onSelectionChange)}update(e){this.editContext&&(this.editContext.update(e),e.startState.facet(Mt)!=e.state.facet(Mt)&&(e.view.contentDOM.editContext=e.state.facet(Mt)?this.editContext.editContext:null))}destroy(){var e,t,n;this.stop(),(e=this.intersection)===null||e===void 0||e.disconnect(),(t=this.gapIntersection)===null||t===void 0||t.disconnect(),(n=this.resizeScroll)===null||n===void 0||n.disconnect();for(let s of this.scrollTargets)s.removeEventListener("scroll",this.onScroll);this.removeWindowListeners(this.win),clearTimeout(this.parentCheck),clearTimeout(this.resizeTimeout),this.win.cancelAnimationFrame(this.delayedFlush),this.win.cancelAnimationFrame(this.flushingAndroidKey),this.editContext&&(this.view.contentDOM.editContext=null,this.editContext.destroy())}}function Dl(i,e,t){for(;e;){let n=me.get(e);if(n&&n.parent==i)return n;let s=e.parentNode;e=s!=i.dom?s:t>0?e.nextSibling:e.previousSibling}return null}function Pl(i,e){let t=e.startContainer,n=e.startOffset,s=e.endContainer,r=e.endOffset,o=i.docView.domAtPos(i.state.selection.main.anchor,1);return Qn(o.node,o.offset,s,r)&&([t,n,s,r]=[s,r,t,n]),{anchorNode:t,anchorOffset:n,focusNode:s,focusOffset:r}}function qf(i,e){if(e.getComposedRanges){let s=e.getComposedRanges(i.root)[0];if(s)return Pl(i,s)}let t=null;function n(s){s.preventDefault(),s.stopImmediatePropagation(),t=s.getTargetRanges()[0]}return i.contentDOM.addEventListener("beforeinput",n,!0),i.dom.ownerDocument.execCommand("indent"),i.contentDOM.removeEventListener("beforeinput",n,!0),t?Pl(i,t):null}class Nf{constructor(e){this.from=0,this.to=0,this.pendingContextChange=null,this.handlers=Object.create(null),this.composing=null,this.resetRange(e.state);let t=this.editContext=new window.EditContext({text:e.state.doc.sliceString(this.from,this.to),selectionStart:this.toContextPos(Math.max(this.from,Math.min(this.to,e.state.selection.main.anchor))),selectionEnd:this.toContextPos(e.state.selection.main.head)});this.handlers.textupdate=n=>{let s=e.state.selection.main,{anchor:r,head:o}=s,l=this.toEditorPos(n.updateRangeStart),a=this.toEditorPos(n.updateRangeEnd);e.inputState.composing>=0&&!this.composing&&(this.composing={contextBase:n.updateRangeStart,editorBase:l,drifted:!1});let c=a-l>n.text.length;l==this.from&&r<this.from?l=r:a==this.to&&r>this.to&&(a=r);let h=Tc(e.state.sliceDoc(l,a),n.text,(c?s.from:s.to)-l,c?"end":null);if(!h){let d=_.single(this.toEditorPos(n.selectionStart),this.toEditorPos(n.selectionEnd));ss(d,s)||e.dispatch({selection:d,userEvent:"select"});return}let u={from:h.from+l,to:h.toA+l,insert:Z.of(n.text.slice(h.from,h.toB).split(`
`))};if((O.mac||O.android)&&u.from==o-1&&/^\. ?$/.test(n.text)&&e.contentDOM.getAttribute("autocorrect")=="off"&&(u={from:l,to:a,insert:Z.of([n.text.replace("."," ")])}),this.pendingContextChange=u,!e.state.readOnly){let d=this.to-this.from+(u.to-u.from+u.insert.length);xo(e,u,_.single(this.toEditorPos(n.selectionStart,d),this.toEditorPos(n.selectionEnd,d)))}this.pendingContextChange&&(this.revertPending(e.state),this.setSelection(e.state)),u.from<u.to&&!u.insert.length&&e.inputState.composing>=0&&!/[\\p{Alphabetic}\\p{Number}_]/.test(t.text.slice(Math.max(0,n.updateRangeStart-1),Math.min(t.text.length,n.updateRangeStart+1)))&&this.handlers.compositionend(n)},this.handlers.characterboundsupdate=n=>{let s=[],r=null;for(let o=this.toEditorPos(n.rangeStart),l=this.toEditorPos(n.rangeEnd);o<l;o++){let a=e.coordsForChar(o);r=a&&new DOMRect(a.left,a.top,a.right-a.left,a.bottom-a.top)||r||new DOMRect,s.push(r)}t.updateCharacterBounds(n.rangeStart,s)},this.handlers.textformatupdate=n=>{let s=[];for(let r of n.getTextFormats()){let o=r.underlineStyle,l=r.underlineThickness;if(!/none/i.test(o)&&!/none/i.test(l)){let a=this.toEditorPos(r.rangeStart),c=this.toEditorPos(r.rangeEnd);if(a<c){let h=`text-decoration: underline ${/^[a-z]/.test(o)?o+" ":o=="Dashed"?"dashed ":o=="Squiggle"?"wavy ":""}${/thin/i.test(l)?1:2}px`;s.push(we.mark({attributes:{style:h}}).range(a,c))}}}e.dispatch({effects:gc.of(we.set(s))})},this.handlers.compositionstart=()=>{e.inputState.composing<0&&(e.inputState.composing=0,e.inputState.compositionFirstChange=!0)},this.handlers.compositionend=()=>{if(e.inputState.composing=-1,e.inputState.compositionFirstChange=null,this.composing){let{drifted:n}=this.composing;this.composing=null,n&&this.reset(e.state)}};for(let n in this.handlers)t.addEventListener(n,this.handlers[n]);this.measureReq={read:n=>{this.editContext.updateControlBounds(n.contentDOM.getBoundingClientRect());let s=li(n.root);s&&s.rangeCount&&this.editContext.updateSelectionBounds(s.getRangeAt(0).getBoundingClientRect())}}}applyEdits(e){let t=0,n=!1,s=this.pendingContextChange;return e.changes.iterChanges((r,o,l,a,c)=>{if(n)return;let h=c.length-(o-r);if(s&&o>=s.to)if(s.from==r&&s.to==o&&s.insert.eq(c)){s=this.pendingContextChange=null,t+=h,this.to+=h;return}else s=null,this.revertPending(e.state);if(r+=t,o+=t,o<=this.from)this.from+=h,this.to+=h;else if(r<this.to){if(r<this.from||o>this.to||this.to-this.from+c.length>3e4){n=!0;return}this.editContext.updateText(this.toContextPos(r),this.toContextPos(o),c.toString()),this.to+=h}t+=h}),s&&!n&&this.revertPending(e.state),!n}update(e){let t=this.pendingContextChange,n=e.startState.selection.main;this.composing&&(this.composing.drifted||!e.changes.touchesRange(n.from,n.to)&&e.transactions.some(s=>!s.isUserEvent("input.type")&&s.changes.touchesRange(this.from,this.to)))?(this.composing.drifted=!0,this.composing.editorBase=e.changes.mapPos(this.composing.editorBase)):!this.applyEdits(e)||!this.rangeIsValid(e.state)?(this.pendingContextChange=null,this.reset(e.state)):(e.docChanged||e.selectionSet||t)&&this.setSelection(e.state),(e.geometryChanged||e.docChanged||e.selectionSet)&&e.view.requestMeasure(this.measureReq)}resetRange(e){let{head:t}=e.selection.main;this.from=Math.max(0,t-1e4),this.to=Math.min(e.doc.length,t+1e4)}reset(e){this.resetRange(e),this.editContext.updateText(0,this.editContext.text.length,e.doc.sliceString(this.from,this.to)),this.setSelection(e)}revertPending(e){let t=this.pendingContextChange;this.pendingContextChange=null,this.editContext.updateText(this.toContextPos(t.from),this.toContextPos(t.from+t.insert.length),e.doc.sliceString(t.from,t.to))}setSelection(e){let{main:t}=e.selection,n=this.toContextPos(Math.max(this.from,Math.min(this.to,t.anchor))),s=this.toContextPos(t.head);(this.editContext.selectionStart!=n||this.editContext.selectionEnd!=s)&&this.editContext.updateSelection(n,s)}rangeIsValid(e){let{head:t}=e.selection.main;return!(this.from>0&&t-this.from<500||this.to<e.doc.length&&this.to-t<500||this.to-this.from>1e4*3)}toEditorPos(e,t=this.to-this.from){e=Math.min(e,t);let n=this.composing;return n&&n.drifted?n.editorBase+(e-n.contextBase):e+this.from}toContextPos(e){let t=this.composing;return t&&t.drifted?t.contextBase+(e-t.editorBase):e-this.from}destroy(){for(let e in this.handlers)this.editContext.removeEventListener(e,this.handlers[e])}}class q{get state(){return this.viewState.state}get viewport(){return this.viewState.viewport}get visibleRanges(){return this.viewState.visibleRanges}get inView(){return this.viewState.inView}get composing(){return!!this.inputState&&this.inputState.composing>0}get compositionStarted(){return!!this.inputState&&this.inputState.composing>=0}get root(){return this._root}get win(){return this.dom.ownerDocument.defaultView||window}constructor(e={}){var t;this.plugins=[],this.pluginMap=new Map,this.editorAttrs={},this.contentAttrs={},this.bidiCache=[],this.destroyed=!1,this.updateState=2,this.measureScheduled=-1,this.measureRequests=[],this.contentDOM=document.createElement("div"),this.scrollDOM=document.createElement("div"),this.scrollDOM.tabIndex=-1,this.scrollDOM.className="cm-scroller",this.scrollDOM.appendChild(this.contentDOM),this.announceDOM=document.createElement("div"),this.announceDOM.className="cm-announced",this.announceDOM.setAttribute("aria-live","polite"),this.dom=document.createElement("div"),this.dom.appendChild(this.announceDOM),this.dom.appendChild(this.scrollDOM),e.parent&&e.parent.appendChild(this.dom);let{dispatch:n}=e;this.dispatchTransactions=e.dispatchTransactions||n&&(s=>s.forEach(r=>n(r,this)))||(s=>this.update(s)),this.dispatch=this.dispatch.bind(this),this._root=e.root||fd(e.parent)||document,this.viewState=new Ml(this,e.state||te.create(e)),e.scrollTo&&e.scrollTo.is(_i)&&(this.viewState.scrollTarget=e.scrollTo.value.clip(this.viewState.state)),this.plugins=this.state.facet(mn).map(s=>new Ns(s));for(let s of this.plugins)s.update(this);this.observer=new zf(this),this.inputState=new of(this),this.inputState.ensureHandlers(this.plugins),this.docView=new ml(this),this.mountStyles(),this.updateAttrs(),this.updateState=0,this.requestMeasure(),!((t=document.fonts)===null||t===void 0)&&t.ready&&document.fonts.ready.then(()=>{this.viewState.mustMeasureContent="refresh",this.requestMeasure()})}dispatch(...e){let t=e.length==1&&e[0]instanceof xe?e:e.length==1&&Array.isArray(e[0])?e[0]:[this.state.update(...e)];this.dispatchTransactions(t,this)}update(e){if(this.updateState!=0)throw new Error("Calls to EditorView.update are not allowed while an update is in progress");let t=!1,n=!1,s,r=this.state;for(let d of e){if(d.startState!=r)throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");r=d.state}if(this.destroyed){this.viewState.state=r;return}let o=this.hasFocus,l=0,a=null;e.some(d=>d.annotation(Oc))?(this.inputState.notifiedFocused=o,l=1):o!=this.inputState.notifiedFocused&&(this.inputState.notifiedFocused=o,a=Lc(r,o),a||(l=1));let c=this.observer.delayedAndroidKey,h=null;if(c?(this.observer.clearDelayedAndroidKey(),h=this.observer.readChange(),(h&&!this.state.doc.eq(r.doc)||!this.state.selection.eq(r.selection))&&(h=null)):this.observer.clear(),r.facet(te.phrases)!=this.state.facet(te.phrases))return this.setState(r);s=ts.create(this,r,e),s.flags|=l;let u=this.viewState.scrollTarget;try{this.updateState=2;for(let d of e){if(u&&(u=u.map(d.changes)),d.scrollIntoView){let{main:f}=d.state.selection;u=new kn(f.empty?f:_.cursor(f.head,f.head>f.anchor?-1:1))}for(let f of d.effects)f.is(_i)&&(u=f.value.clip(this.state))}this.viewState.update(s,u),this.bidiCache=os.update(this.bidiCache,s.changes),s.empty||(this.updatePlugins(s),this.inputState.update(s)),t=this.docView.update(s),this.state.facet(jn)!=this.styleModules&&this.mountStyles(),n=this.updateAttrs(),this.showAnnouncements(e),this.docView.updateSelection(t,e.some(d=>d.isUserEvent("select.pointer")))}finally{this.updateState=0}if(s.startState.facet(Ei)!=s.state.facet(Ei)&&(this.viewState.mustMeasureContent=!0),(t||n||u||this.viewState.mustEnforceCursorAssoc||this.viewState.mustMeasureContent)&&this.requestMeasure(),t&&this.docViewUpdate(),!s.empty)for(let d of this.state.facet(Dr))try{d(s)}catch(f){vt(this.state,f,"update listener")}(a||h)&&Promise.resolve().then(()=>{a&&this.state==a.startState&&this.dispatch(a),h&&!Ac(this,h)&&c.force&&xn(this.contentDOM,c.key,c.keyCode)})}setState(e){if(this.updateState!=0)throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");if(this.destroyed){this.viewState.state=e;return}this.updateState=2;let t=this.hasFocus;try{for(let n of this.plugins)n.destroy(this);this.viewState=new Ml(this,e),this.plugins=e.facet(mn).map(n=>new Ns(n)),this.pluginMap.clear();for(let n of this.plugins)n.update(this);this.docView.destroy(),this.docView=new ml(this),this.inputState.ensureHandlers(this.plugins),this.mountStyles(),this.updateAttrs(),this.bidiCache=[]}finally{this.updateState=0}t&&this.focus(),this.requestMeasure()}updatePlugins(e){let t=e.startState.facet(mn),n=e.state.facet(mn);if(t!=n){let s=[];for(let r of n){let o=t.indexOf(r);if(o<0)s.push(new Ns(r));else{let l=this.plugins[o];l.mustUpdate=e,s.push(l)}}for(let r of this.plugins)r.mustUpdate!=e&&r.destroy(this);this.plugins=s,this.pluginMap.clear()}else for(let s of this.plugins)s.mustUpdate=e;for(let s=0;s<this.plugins.length;s++)this.plugins[s].update(this);t!=n&&this.inputState.ensureHandlers(this.plugins)}docViewUpdate(){for(let e of this.plugins){let t=e.value;if(t&&t.docViewUpdate)try{t.docViewUpdate(this)}catch(n){vt(this.state,n,"doc view update listener")}}}measure(e=!0){if(this.destroyed)return;if(this.measureScheduled>-1&&this.win.cancelAnimationFrame(this.measureScheduled),this.observer.delayedAndroidKey){this.measureScheduled=-1,this.requestMeasure();return}this.measureScheduled=0,e&&this.observer.forceFlush();let t=null,n=this.viewState.scrollParent,s=this.viewState.getScrollOffset(),{scrollAnchorPos:r,scrollAnchorHeight:o}=this.viewState;Math.abs(s-this.viewState.scrollOffset)>1&&(o=-1),this.viewState.scrollAnchorHeight=-1;try{for(let l=0;;l++){if(o<0)if(Za(n||this.win))r=-1,o=this.viewState.heightMap.height;else{let f=this.viewState.scrollAnchorAt(s);r=f.from,o=f.top}this.updateState=1;let a=this.viewState.measure();if(!a&&!this.measureRequests.length&&this.viewState.scrollTarget==null)break;if(l>5){console.warn(this.measureRequests.length?"Measure loop restarted more than 5 times":"Viewport failed to stabilize");break}let c=[];a&4||([this.measureRequests,c]=[c,this.measureRequests]);let h=c.map(f=>{try{return f.read(this)}catch(p){return vt(this.state,p),Ol}}),u=ts.create(this,this.state,[]),d=!1;u.flags|=a,t?t.flags|=a:t=u,this.updateState=2,u.empty||(this.updatePlugins(u),this.inputState.update(u),this.updateAttrs(),d=this.docView.update(u),d&&this.docViewUpdate());for(let f=0;f<c.length;f++)if(h[f]!=Ol)try{let p=c[f];p.write&&p.write(h[f],this)}catch(p){vt(this.state,p)}if(d&&this.docView.updateSelection(!0),!u.viewportChanged&&this.measureRequests.length==0){if(this.viewState.editorHeight)if(this.viewState.scrollTarget){this.docView.scrollIntoView(this.viewState.scrollTarget),this.viewState.scrollTarget=null,o=-1;continue}else{let p=((r<0?this.viewState.heightMap.height:this.viewState.lineBlockAt(r).top)-o)/this.scaleY;if((p>1||p<-1)&&(n==this.scrollDOM||this.hasFocus||Math.max(this.inputState.lastWheelEvent,this.inputState.lastTouchTime)>Date.now()-100)){s=s+p,n?n.scrollTop+=p:this.win.scrollBy(0,p),o=-1;continue}}break}}}finally{this.updateState=0,this.measureScheduled=-1}if(t&&!t.empty)for(let l of this.state.facet(Dr))l(t)}get themeClasses(){return zr+" "+(this.state.facet(Ir)?qc:zc)+" "+this.state.facet(Ei)}updateAttrs(){let e=Ll(this,bc,{class:"cm-editor"+(this.hasFocus?" cm-focused ":" ")+this.themeClasses}),t={spellcheck:"false",autocorrect:"off",autocapitalize:"off",writingsuggestions:"false",translate:"no",contenteditable:this.state.facet(Mt)?"true":"false",class:"cm-content",style:`${O.tabSize}: ${this.state.tabSize}`,role:"textbox","aria-multiline":"true"};this.state.readOnly&&(t["aria-readonly"]="true"),Ll(this,wo,t);let n=this.observer.ignore(()=>{let s=cl(this.contentDOM,this.contentAttrs,t),r=cl(this.dom,this.editorAttrs,e);return s||r});return this.editorAttrs=e,this.contentAttrs=t,n}showAnnouncements(e){let t=!0;for(let n of e)for(let s of n.effects)if(s.is(q.announce)){t&&(this.announceDOM.textContent=""),t=!1;let r=this.announceDOM.appendChild(document.createElement("div"));r.textContent=s.value}}mountStyles(){this.styleModules=this.state.facet(jn);let e=this.state.facet(q.cspNonce);Ht.mount(this.root,this.styleModules.concat(Rf).reverse(),e?{nonce:e}:void 0)}readMeasured(){if(this.updateState==2)throw new Error("Reading the editor layout isn't allowed during an update");this.updateState==0&&this.measureScheduled>-1&&this.measure(!1)}requestMeasure(e){if(this.measureScheduled<0&&(this.measureScheduled=this.win.requestAnimationFrame(()=>this.measure())),e){if(this.measureRequests.indexOf(e)>-1)return;if(e.key!=null){for(let t=0;t<this.measureRequests.length;t++)if(this.measureRequests[t].key===e.key){this.measureRequests[t]=e;return}}this.measureRequests.push(e)}}plugin(e){let t=this.pluginMap.get(e);return(t===void 0||t&&t.plugin!=e)&&this.pluginMap.set(e,t=this.plugins.find(n=>n.plugin==e)||null),t&&t.update(this).value}get documentTop(){return this.contentDOM.getBoundingClientRect().top+this.viewState.paddingTop}get documentPadding(){return{top:this.viewState.paddingTop,bottom:this.viewState.paddingBottom}}get scaleX(){return this.viewState.scaleX}get scaleY(){return this.viewState.scaleY}elementAtHeight(e){return this.readMeasured(),this.viewState.elementAtHeight(e)}lineBlockAtHeight(e){return this.readMeasured(),this.viewState.lineBlockAtHeight(e)}get viewportLineBlocks(){return this.viewState.viewportLines}lineBlockAt(e){return this.viewState.lineBlockAt(e)}get contentHeight(){return this.viewState.contentHeight}moveByChar(e,t,n){return Vs(this,e,gl(this,e,t,n))}moveByGroup(e,t){return Vs(this,e,gl(this,e,t,n=>Gd(this,e.head,n)))}visualLineSide(e,t){let n=this.bidiSpans(e),s=this.textDirectionAt(e.from),r=n[t?n.length-1:0];return _.cursor(r.side(t,s)+e.from,r.forward(!t,s)?1:-1)}moveToLineBoundary(e,t,n=!0){return Xd(this,e,t,n)}moveVertically(e,t,n){return Vs(this,e,Yd(this,e,t,n))}domAtPos(e,t=1){return this.docView.domAtPos(e,t)}posAtDOM(e,t=0){return this.docView.posFromDOM(e,t)}posAtCoords(e,t=!0){this.readMeasured();let n=Lr(this,e,t);return n&&n.pos}posAndSideAtCoords(e,t=!0){return this.readMeasured(),Lr(this,e,t)}coordsAtPos(e,t=1){this.readMeasured();let n=this.docView.coordsAt(e,t);if(!n||n.left==n.right)return n;let s=this.state.doc.lineAt(e),r=this.bidiSpans(s),o=r[wt.find(r,e-s.from,-1,t)];return es(n,o.dir==de.LTR==t>0)}coordsForChar(e){return this.readMeasured(),this.docView.coordsForChar(e)}get defaultCharacterWidth(){return this.viewState.heightOracle.charWidth}get defaultLineHeight(){return this.viewState.heightOracle.lineHeight}get textDirection(){return this.viewState.defaultTextDirection}textDirectionAt(e){return!this.state.facet(fc)||e<this.viewport.from||e>this.viewport.to?this.textDirection:(this.readMeasured(),this.docView.textDirectionAt(e))}get lineWrapping(){return this.viewState.heightOracle.lineWrapping}bidiSpans(e){if(e.length>Ff)return rc(e.length);let t=this.textDirectionAt(e.from),n;for(let r of this.bidiCache)if(r.from==e.from&&r.dir==t&&(r.fresh||sc(r.isolates,n=dl(this,e))))return r.order;n||(n=dl(this,e));let s=xd(e.text,t,n);return this.bidiCache.push(new os(e.from,e.to,t,n,!0,s)),s}get hasFocus(){var e;return(this.dom.ownerDocument.hasFocus()||O.safari&&((e=this.inputState)===null||e===void 0?void 0:e.lastContextMenu)>Date.now()-3e4)&&this.root.activeElement==this.contentDOM}focus(){this.observer.ignore(()=>{Qa(this.contentDOM),this.docView.updateSelection()})}setRoot(e){this._root!=e&&(this._root=e,this.observer.setWindow((e.nodeType==9?e:e.ownerDocument).defaultView||window),this.mountStyles())}destroy(){this.root.activeElement==this.contentDOM&&this.contentDOM.blur();for(let e of this.plugins)e.destroy(this);this.plugins=[],this.inputState.destroy(),this.docView.destroy(),this.dom.remove(),this.observer.destroy(),this.measureScheduled>-1&&this.win.cancelAnimationFrame(this.measureScheduled),this.destroyed=!0}static scrollIntoView(e,t={}){return _i.of(new kn(typeof e=="number"?_.cursor(e):e,t.y,t.x,t.yMargin,t.xMargin))}scrollSnapshot(){let{scrollTop:e,scrollLeft:t}=this.scrollDOM,n=this.viewState.scrollAnchorAt(e);return _i.of(new kn(_.cursor(n.from),"start","start",n.top-e,t,!0))}setTabFocusMode(e){e==null?this.inputState.tabFocusMode=this.inputState.tabFocusMode<0?0:-1:typeof e=="boolean"?this.inputState.tabFocusMode=e?0:-1:this.inputState.tabFocusMode!=0&&(this.inputState.tabFocusMode=Date.now()+e)}static domEventHandlers(e){return St.define(()=>({}),{eventHandlers:e})}static domEventObservers(e){return St.define(()=>({}),{eventObservers:e})}static theme(e,t){let n=Ht.newName(),s=[Ei.of(n),jn.of(qr(`.${n}`,e))];return t&&t.dark&&s.push(Ir.of(!0)),s}static baseTheme(e){return hs.lowest(jn.of(qr("."+zr,e,Nc)))}static findFromDOM(e){var t;let n=e.querySelector(".cm-content"),s=n&&me.get(n)||me.get(e);return((t=s==null?void 0:s.root)===null||t===void 0?void 0:t.view)||null}}q.styleModule=jn;q.inputHandler=uc;q.clipboardInputFilter=bo;q.clipboardOutputFilter=yo;q.scrollHandler=mc;q.focusChangeEffect=dc;q.perLineTextDirection=fc;q.exceptionSink=hc;q.updateListener=Dr;q.editable=Mt;q.mouseSelectionStyle=cc;q.dragMovesSelection=ac;q.clickAddsSelectionRange=lc;q.decorations=ms;q.blockWrappers=yc;q.outerDecorations=vo;q.atomicRanges=bi;q.bidiIsolatedRanges=wc;q.scrollMargins=vc;q.darkTheme=Ir;q.cspNonce=z.define({combine:i=>i.length?i[0]:""});q.contentAttributes=wo;q.editorAttributes=bc;q.lineWrapping=q.contentAttributes.of({class:"cm-lineWrapping"});q.announce=ye.define();const Ff=4096,Ol={};class os{constructor(e,t,n,s,r,o){this.from=e,this.to=t,this.dir=n,this.isolates=s,this.fresh=r,this.order=o}static update(e,t){if(t.empty&&!e.some(r=>r.fresh))return e;let n=[],s=e.length?e[e.length-1].dir:de.LTR;for(let r=Math.max(0,e.length-10);r<e.length;r++){let o=e[r];o.dir==s&&!t.touchesRange(o.from,o.to)&&n.push(new os(t.mapPos(o.from,1),t.mapPos(o.to,-1),o.dir,o.isolates,!1,o.order))}return n}}function Ll(i,e,t){for(let n=i.state.facet(e),s=n.length-1;s>=0;s--){let r=n[s],o=typeof r=="function"?r(i):r;o&&po(o,t)}return t}const Hf=O.mac?"mac":O.windows?"win":O.linux?"linux":"key";function Wf(i,e){const t=i.split(/-(?!$)/);let n=t[t.length-1];n=="Space"&&(n=" ");let s,r,o,l;for(let a=0;a<t.length-1;++a){const c=t[a];if(/^(cmd|meta|m)$/i.test(c))l=!0;else if(/^a(lt)?$/i.test(c))s=!0;else if(/^(c|ctrl|control)$/i.test(c))r=!0;else if(/^s(hift)?$/i.test(c))o=!0;else if(/^mod$/i.test(c))e=="mac"?l=!0:r=!0;else throw new Error("Unrecognized modifier name: "+c)}return s&&(n="Alt-"+n),r&&(n="Ctrl-"+n),l&&(n="Meta-"+n),o&&(n="Shift-"+n),n}function Bi(i,e,t){return e.altKey&&(i="Alt-"+i),e.ctrlKey&&(i="Ctrl-"+i),e.metaKey&&(i="Meta-"+i),t!==!1&&e.shiftKey&&(i="Shift-"+i),i}const Vf=hs.default(q.domEventHandlers({keydown(i,e){return Kf($f(e.state),i,e,"editor")}})),Fc=z.define({enables:Vf}),Rl=new WeakMap;function $f(i){let e=i.facet(Fc),t=Rl.get(e);return t||Rl.set(e,t=jf(e.reduce((n,s)=>n.concat(s),[]))),t}let zt=null;const Uf=4e3;function jf(i,e=Hf){let t=Object.create(null),n=Object.create(null),s=(o,l)=>{let a=n[o];if(a==null)n[o]=l;else if(a!=l)throw new Error("Key binding "+o+" is used both as a regular binding and as a multi-stroke prefix")},r=(o,l,a,c,h)=>{var u,d;let f=t[o]||(t[o]=Object.create(null)),p=l.split(/ (?!$)/).map(b=>Wf(b,e));for(let b=1;b<p.length;b++){let k=p.slice(0,b).join(" ");s(k,!0),f[k]||(f[k]={preventDefault:!0,stopPropagation:!1,run:[v=>{let I=zt={view:v,prefix:k,scope:o};return setTimeout(()=>{zt==I&&(zt=null)},Uf),!0}]})}let m=p.join(" ");s(m,!1);let g=f[m]||(f[m]={preventDefault:!1,stopPropagation:!1,run:((d=(u=f._any)===null||u===void 0?void 0:u.run)===null||d===void 0?void 0:d.slice())||[]});a&&g.run.push(a),c&&(g.preventDefault=!0),h&&(g.stopPropagation=!0)};for(let o of i){let l=o.scope?o.scope.split(" "):["editor"];if(o.any)for(let c of l){let h=t[c]||(t[c]=Object.create(null));h._any||(h._any={preventDefault:!1,stopPropagation:!1,run:[]});let{any:u}=o;for(let d in h)h[d].run.push(f=>u(f,Nr))}let a=o[e]||o.key;if(a)for(let c of l)r(c,a,o.run,o.preventDefault,o.stopPropagation),o.shift&&r(c,"Shift-"+a,o.shift,o.preventDefault,o.stopPropagation)}return t}let Nr=null;function Kf(i,e,t,n){Nr=e;let s=rd(e),r=Hu(s,0),o=Wu(r)==s.length&&s!=" ",l="",a=!1,c=!1,h=!1;zt&&zt.view==t&&zt.scope==n&&(l=zt.prefix+" ",Ec.indexOf(e.keyCode)<0&&(c=!0,zt=null));let u=new Set,d=g=>{if(g){for(let b of g.run)if(!u.has(b)&&(u.add(b),b(t)))return g.stopPropagation&&(h=!0),!0;g.preventDefault&&(g.stopPropagation&&(h=!0),c=!0)}return!1},f=i[n],p,m;return f&&(d(f[l+Bi(s,e,!o)])?a=!0:o&&(e.altKey||e.metaKey||e.ctrlKey)&&!(O.windows&&e.ctrlKey&&e.altKey)&&!(O.mac&&e.altKey&&!(e.ctrlKey||e.metaKey))&&(p=Wt[e.keyCode])&&p!=s?(d(f[l+Bi(p,e,!0)])||e.shiftKey&&(m=ri[e.keyCode])!=s&&m!=p&&d(f[l+Bi(m,e,!1)]))&&(a=!0):o&&e.shiftKey&&d(f[l+Bi(s,e,!0)])&&(a=!0),!a&&d(f._any)&&(a=!0)),c&&(a=!0),a&&h&&e.stopPropagation(),Nr=null,a}class en{constructor(e,t,n,s,r){this.className=e,this.left=t,this.top=n,this.width=s,this.height=r}draw(){let e=document.createElement("div");return e.className=this.className,this.adjust(e),e}update(e,t){return t.className!=this.className?!1:(this.adjust(e),!0)}adjust(e){e.style.left=this.left+"px",e.style.top=this.top+"px",this.width!=null&&(e.style.width=this.width+"px"),e.style.height=this.height+"px"}eq(e){return this.left==e.left&&this.top==e.top&&this.width==e.width&&this.height==e.height&&this.className==e.className}static forRange(e,t,n){if(n.empty){let s=e.coordsAtPos(n.head,n.assoc||1);if(!s)return[];let r=Hc(e);return[new en(t,s.left-r.left,s.top-r.top,null,s.bottom-s.top)]}else return Xf(e,t,n)}}function Hc(i){let e=i.scrollDOM.getBoundingClientRect();return{left:(i.textDirection==de.LTR?e.left:e.right-i.scrollDOM.clientWidth*i.scaleX)-i.scrollDOM.scrollLeft*i.scaleX,top:e.top-i.scrollDOM.scrollTop*i.scaleY}}function Il(i,e,t,n){let s=i.coordsAtPos(e,t*2);if(!s)return n;let r=i.dom.getBoundingClientRect(),o=(s.top+s.bottom)/2,l=i.posAtCoords({x:r.left+1,y:o}),a=i.posAtCoords({x:r.right-1,y:o});return l==null||a==null?n:{from:Math.max(n.from,Math.min(l,a)),to:Math.min(n.to,Math.max(l,a))}}function Xf(i,e,t){if(t.to<=i.viewport.from||t.from>=i.viewport.to)return[];let n=Math.max(t.from,i.viewport.from),s=Math.min(t.to,i.viewport.to),r=i.textDirection==de.LTR,o=i.contentDOM,l=o.getBoundingClientRect(),a=Hc(i),c=o.querySelector(".cm-line"),h=c&&window.getComputedStyle(c),u=l.left+(h?parseInt(h.paddingLeft)+Math.min(0,parseInt(h.textIndent)):0),d=l.right-(h?parseInt(h.paddingRight):0),f=Or(i,n,1),p=Or(i,s,-1),m=f.type==Ce.Text?f:null,g=p.type==Ce.Text?p:null;if(m&&(i.lineWrapping||f.widgetLineBreaks)&&(m=Il(i,n,1,m)),g&&(i.lineWrapping||p.widgetLineBreaks)&&(g=Il(i,s,-1,g)),m&&g&&m.from==g.from&&m.to==g.to)return k(v(t.from,t.to,m));{let C=m?v(t.from,null,m):I(f,!1),A=g?v(null,t.to,g):I(p,!0),x=[];return(m||f).to<(g||p).from-(m&&g?1:0)||f.widgetLineBreaks>1&&C.bottom+i.defaultLineHeight/2<A.top?x.push(b(u,C.bottom,d,A.top)):C.bottom<A.top&&i.elementAtHeight((C.bottom+A.top)/2).type==Ce.Text&&(C.bottom=A.top=(C.bottom+A.top)/2),k(C).concat(x).concat(k(A))}function b(C,A,x,D){return new en(e,C-a.left,A-a.top,Math.max(0,x-C),D-A)}function k({top:C,bottom:A,horizontal:x}){let D=[];for(let M=0;M<x.length;M+=2)D.push(b(x[M],C,x[M+1],A));return D}function v(C,A,x){let D=1e9,M=-1e9,N=[];function L(w,R,$,F,G){let U=i.coordsAtPos(w,w==x.to?-2:2),ne=i.coordsAtPos($,$==x.from?2:-2);!U||!ne||(D=Math.min(U.top,ne.top,D),M=Math.max(U.bottom,ne.bottom,M),G==de.LTR?N.push(r&&R?u:U.left,r&&F?d:ne.right):N.push(!r&&F?u:ne.left,!r&&R?d:U.right))}let P=C??x.from,V=A??x.to;for(let w of i.visibleRanges)if(w.to>P&&w.from<V)for(let R=Math.max(w.from,P),$=Math.min(w.to,V);;){let F=i.state.doc.lineAt(R);for(let G of i.bidiSpans(F)){let U=G.from+F.from,ne=G.to+F.from;if(U>=$)break;ne>R&&L(Math.max(U,R),C==null&&U<=P,Math.min(ne,$),A==null&&ne>=V,G.dir)}if(R=F.to+1,R>=$)break}return N.length==0&&L(P,C==null,V,A==null,i.textDirection),{top:D,bottom:M,horizontal:N}}function I(C,A){let x=l.top+(A?C.top:C.bottom);return{top:x,bottom:x,horizontal:[]}}}function Gf(i,e){return i.constructor==e.constructor&&i.eq(e)}class Yf{constructor(e,t){this.view=e,this.layer=t,this.drawn=[],this.scaleX=1,this.scaleY=1,this.measureReq={read:this.measure.bind(this),write:this.draw.bind(this)},this.dom=e.scrollDOM.appendChild(document.createElement("div")),this.dom.classList.add("cm-layer"),t.above&&this.dom.classList.add("cm-layer-above"),t.class&&this.dom.classList.add(t.class),this.scale(),this.dom.setAttribute("aria-hidden","true"),this.setOrder(e.state),e.requestMeasure(this.measureReq),t.mount&&t.mount(this.dom,e)}update(e){e.startState.facet($i)!=e.state.facet($i)&&this.setOrder(e.state),(this.layer.update(e,this.dom)||e.geometryChanged)&&(this.scale(),e.view.requestMeasure(this.measureReq))}docViewUpdate(e){this.layer.updateOnDocViewUpdate!==!1&&e.requestMeasure(this.measureReq)}setOrder(e){let t=0,n=e.facet($i);for(;t<n.length&&n[t]!=this.layer;)t++;this.dom.style.zIndex=String((this.layer.above?150:-1)-t)}measure(){return this.layer.markers(this.view)}scale(){let{scaleX:e,scaleY:t}=this.view;(e!=this.scaleX||t!=this.scaleY)&&(this.scaleX=e,this.scaleY=t,this.dom.style.transform=`scale(${1/e}, ${1/t})`)}draw(e){if(e.length!=this.drawn.length||e.some((t,n)=>!Gf(t,this.drawn[n]))){let t=this.dom.firstChild,n=0;for(let s of e)s.update&&t&&s.constructor&&this.drawn[n].constructor&&s.update(t,this.drawn[n])?(t=t.nextSibling,n++):this.dom.insertBefore(s.draw(),t);for(;t;){let s=t.nextSibling;t.remove(),t=s}this.drawn=e,O.safari&&O.safari_version>=26&&(this.dom.style.display=this.dom.firstChild?"":"none")}}destroy(){this.layer.destroy&&this.layer.destroy(this.dom,this.view),this.dom.remove()}}const $i=z.define();function Wc(i){return[St.define(e=>new Yf(e,i)),$i.of(i)]}const Tn=z.define({combine(i){return ho(i,{cursorBlinkRate:1200,drawRangeCursor:!0,iosSelectionHandles:!0},{cursorBlinkRate:(e,t)=>Math.min(e,t),drawRangeCursor:(e,t)=>e||t})}});function Jf(i={}){return[Tn.of(i),Qf,Zf,ep,pc.of(!0)]}function Vc(i){return i.startState.facet(Tn)!=i.state.facet(Tn)}const Qf=Wc({above:!0,markers(i){let{state:e}=i,t=e.facet(Tn),n=[];for(let s of e.selection.ranges){let r=s==e.selection.main;if(s.empty||t.drawRangeCursor&&!(r&&O.ios&&t.iosSelectionHandles)){let o=r?"cm-cursor cm-cursor-primary":"cm-cursor cm-cursor-secondary",l=s.empty?s:_.cursor(s.head,s.assoc);for(let a of en.forRange(i,o,l))n.push(a)}}return n},update(i,e){i.transactions.some(n=>n.selection)&&(e.style.animationName=e.style.animationName=="cm-blink"?"cm-blink2":"cm-blink");let t=Vc(i);return t&&zl(i.state,e),i.docChanged||i.selectionSet||t},mount(i,e){zl(e.state,i)},class:"cm-cursorLayer"});function zl(i,e){e.style.animationDuration=i.facet(Tn).cursorBlinkRate+"ms"}const Zf=Wc({above:!1,markers(i){let e=[],{main:t,ranges:n}=i.state.selection;for(let s of n)if(!s.empty)for(let r of en.forRange(i,"cm-selectionBackground",s))e.push(r);if(O.ios&&!t.empty&&i.state.facet(Tn).iosSelectionHandles){for(let s of en.forRange(i,"cm-selectionHandle cm-selectionHandle-start",_.cursor(t.from,1)))e.push(s);for(let s of en.forRange(i,"cm-selectionHandle cm-selectionHandle-end",_.cursor(t.to,1)))e.push(s)}return e},update(i,e){return i.docChanged||i.selectionSet||i.viewportChanged||Vc(i)},class:"cm-selectionLayer"}),ep=hs.highest(q.theme({".cm-line":{"& ::selection, &::selection":{backgroundColor:"transparent !important"},caretColor:"transparent !important"},".cm-content":{caretColor:"transparent !important","& :focus":{caretColor:"initial !important","&::selection, & ::selection":{backgroundColor:"Highlight !important"}}}}));function tp(){return ip}const np=we.line({class:"cm-activeLine"}),ip=St.fromClass(class{constructor(i){this.decorations=this.getDeco(i)}update(i){(i.docChanged||i.selectionSet)&&(this.decorations=this.getDeco(i.view))}getDeco(i){let e=-1,t=[];for(let n of i.state.selection.ranges){let s=i.lineBlockAt(n.head);s.from>e&&(t.push(np.range(s.from)),e=s.from)}return we.set(t)}},{decorations:i=>i.decorations});class ln extends nn{compare(e){return this==e||this.constructor==e.constructor&&this.eq(e)}eq(e){return!1}destroy(e){}}ln.prototype.elementClass="";ln.prototype.toDOM=void 0;ln.prototype.mapMode=Ve.TrackBefore;ln.prototype.startSide=ln.prototype.endSide=-1;ln.prototype.point=!0;const js=z.define(),sp=z.define(),Ui=z.define(),ql=z.define({combine:i=>i.some(e=>e)});function rp(i){return[op]}const op=St.fromClass(class{constructor(i){this.view=i,this.domAfter=null,this.prevViewport=i.viewport,this.dom=document.createElement("div"),this.dom.className="cm-gutters cm-gutters-before",this.dom.setAttribute("aria-hidden","true"),this.dom.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.gutters=i.state.facet(Ui).map(e=>new Fl(i,e)),this.fixed=!i.state.facet(ql);for(let e of this.gutters)e.config.side=="after"?this.getDOMAfter().appendChild(e.dom):this.dom.appendChild(e.dom);this.fixed&&(this.dom.style.position="sticky"),this.syncGutters(!1),i.scrollDOM.insertBefore(this.dom,i.contentDOM)}getDOMAfter(){return this.domAfter||(this.domAfter=document.createElement("div"),this.domAfter.className="cm-gutters cm-gutters-after",this.domAfter.setAttribute("aria-hidden","true"),this.domAfter.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.domAfter.style.position=this.fixed?"sticky":"",this.view.scrollDOM.appendChild(this.domAfter)),this.domAfter}update(i){if(this.updateGutters(i)){let e=this.prevViewport,t=i.view.viewport,n=Math.min(e.to,t.to)-Math.max(e.from,t.from);this.syncGutters(n<(t.to-t.from)*.8)}if(i.geometryChanged){let e=this.view.contentHeight/this.view.scaleY+"px";this.dom.style.minHeight=e,this.domAfter&&(this.domAfter.style.minHeight=e)}this.view.state.facet(ql)!=!this.fixed&&(this.fixed=!this.fixed,this.dom.style.position=this.fixed?"sticky":"",this.domAfter&&(this.domAfter.style.position=this.fixed?"sticky":"")),this.prevViewport=i.view.viewport}syncGutters(i){let e=this.dom.nextSibling;i&&(this.dom.remove(),this.domAfter&&this.domAfter.remove());let t=Q.iter(this.view.state.facet(js),this.view.viewport.from),n=[],s=this.gutters.map(r=>new lp(r,this.view.viewport,-this.view.documentPadding.top));for(let r of this.view.viewportLineBlocks)if(n.length&&(n=[]),Array.isArray(r.type)){let o=!0;for(let l of r.type)if(l.type==Ce.Text&&o){Fr(t,n,l.from);for(let a of s)a.line(this.view,l,n);o=!1}else if(l.widget)for(let a of s)a.widget(this.view,l)}else if(r.type==Ce.Text){Fr(t,n,r.from);for(let o of s)o.line(this.view,r,n)}else if(r.widget)for(let o of s)o.widget(this.view,r);for(let r of s)r.finish();i&&(this.view.scrollDOM.insertBefore(this.dom,e),this.domAfter&&this.view.scrollDOM.appendChild(this.domAfter))}updateGutters(i){let e=i.startState.facet(Ui),t=i.state.facet(Ui),n=i.docChanged||i.heightChanged||i.viewportChanged||!Q.eq(i.startState.facet(js),i.state.facet(js),i.view.viewport.from,i.view.viewport.to);if(e==t)for(let s of this.gutters)s.update(i)&&(n=!0);else{n=!0;let s=[];for(let r of t){let o=e.indexOf(r);o<0?s.push(new Fl(this.view,r)):(this.gutters[o].update(i),s.push(this.gutters[o]))}for(let r of this.gutters)r.dom.remove(),s.indexOf(r)<0&&r.destroy();for(let r of s)r.config.side=="after"?this.getDOMAfter().appendChild(r.dom):this.dom.appendChild(r.dom);this.gutters=s}return n}destroy(){for(let i of this.gutters)i.destroy();this.dom.remove(),this.domAfter&&this.domAfter.remove()}},{provide:i=>q.scrollMargins.of(e=>{let t=e.plugin(i);if(!t||t.gutters.length==0||!t.fixed)return null;let n=t.dom.offsetWidth*e.scaleX,s=t.domAfter?t.domAfter.offsetWidth*e.scaleX:0;return e.textDirection==de.LTR?{left:n,right:s}:{right:n,left:s}})});function Nl(i){return Array.isArray(i)?i:[i]}function Fr(i,e,t){for(;i.value&&i.from<=t;)i.from==t&&e.push(i.value),i.next()}class lp{constructor(e,t,n){this.gutter=e,this.height=n,this.i=0,this.cursor=Q.iter(e.markers,t.from)}addElement(e,t,n){let{gutter:s}=this,r=(t.top-this.height)/e.scaleY,o=t.height/e.scaleY;if(this.i==s.elements.length){let l=new $c(e,o,r,n);s.elements.push(l),s.dom.appendChild(l.dom)}else s.elements[this.i].update(e,o,r,n);this.height=t.bottom,this.i++}line(e,t,n){let s=[];Fr(this.cursor,s,t.from),n.length&&(s=s.concat(n));let r=this.gutter.config.lineMarker(e,t,s);r&&s.unshift(r);let o=this.gutter;s.length==0&&!o.config.renderEmptyElements||this.addElement(e,t,s)}widget(e,t){let n=this.gutter.config.widgetMarker(e,t.widget,t),s=n?[n]:null;for(let r of e.state.facet(sp)){let o=r(e,t.widget,t);o&&(s||(s=[])).push(o)}s&&this.addElement(e,t,s)}finish(){let e=this.gutter;for(;e.elements.length>this.i;){let t=e.elements.pop();e.dom.removeChild(t.dom),t.destroy()}}}class Fl{constructor(e,t){this.view=e,this.config=t,this.elements=[],this.spacer=null,this.dom=document.createElement("div"),this.dom.className="cm-gutter"+(this.config.class?" "+this.config.class:"");for(let n in t.domEventHandlers)this.dom.addEventListener(n,s=>{let r=s.target,o;if(r!=this.dom&&this.dom.contains(r)){for(;r.parentNode!=this.dom;)r=r.parentNode;let a=r.getBoundingClientRect();o=(a.top+a.bottom)/2}else o=s.clientY;let l=e.lineBlockAtHeight(o-e.documentTop);t.domEventHandlers[n](e,l,s)&&s.preventDefault()});this.markers=Nl(t.markers(e)),t.initialSpacer&&(this.spacer=new $c(e,0,0,[t.initialSpacer(e)]),this.dom.appendChild(this.spacer.dom),this.spacer.dom.style.cssText+="visibility: hidden; pointer-events: none")}update(e){let t=this.markers;if(this.markers=Nl(this.config.markers(e.view)),this.spacer&&this.config.updateSpacer){let s=this.config.updateSpacer(this.spacer.markers[0],e);s!=this.spacer.markers[0]&&this.spacer.update(e.view,0,0,[s])}let n=e.view.viewport;return!Q.eq(this.markers,t,n.from,n.to)||(this.config.lineMarkerChange?this.config.lineMarkerChange(e):!1)}destroy(){for(let e of this.elements)e.destroy()}}class $c{constructor(e,t,n,s){this.height=-1,this.above=0,this.markers=[],this.dom=document.createElement("div"),this.dom.className="cm-gutterElement",this.update(e,t,n,s)}update(e,t,n,s){this.height!=t&&(this.height=t,this.dom.style.height=t+"px"),this.above!=n&&(this.dom.style.marginTop=(this.above=n)?n+"px":""),ap(this.markers,s)||this.setMarkers(e,s)}setMarkers(e,t){let n="cm-gutterElement",s=this.dom.firstChild;for(let r=0,o=0;;){let l=o,a=r<t.length?t[r++]:null,c=!1;if(a){let h=a.elementClass;h&&(n+=" "+h);for(let u=o;u<this.markers.length;u++)if(this.markers[u].compare(a)){l=u,c=!0;break}}else l=this.markers.length;for(;o<l;){let h=this.markers[o++];if(h.toDOM){h.destroy(s);let u=s.nextSibling;s.remove(),s=u}}if(!a)break;a.toDOM&&(c?s=s.nextSibling:this.dom.insertBefore(a.toDOM(e),s)),c&&o++}this.dom.className=n,this.markers=t}destroy(){this.setMarkers(null,[])}}function ap(i,e){if(i.length!=e.length)return!1;for(let t=0;t<i.length;t++)if(!i[t].compare(e[t]))return!1;return!0}const cp=z.define(),hp=z.define(),gn=z.define({combine(i){return ho(i,{formatNumber:String,domEventHandlers:{}},{domEventHandlers(e,t){let n=Object.assign({},e);for(let s in t){let r=n[s],o=t[s];n[s]=r?(l,a,c)=>r(l,a,c)||o(l,a,c):o}return n}})}});class Ks extends ln{constructor(e){super(),this.number=e}eq(e){return this.number==e.number}toDOM(){return document.createTextNode(this.number)}}function Xs(i,e){return i.state.facet(gn).formatNumber(e,i.state)}const up=Ui.compute([gn],i=>({class:"cm-lineNumbers",renderEmptyElements:!1,markers(e){return e.state.facet(cp)},lineMarker(e,t,n){return n.some(s=>s.toDOM)?null:new Ks(Xs(e,e.state.doc.lineAt(t.from).number))},widgetMarker:(e,t,n)=>{for(let s of e.state.facet(hp)){let r=s(e,t,n);if(r)return r}return null},lineMarkerChange:e=>e.startState.facet(gn)!=e.state.facet(gn),initialSpacer(e){return new Ks(Xs(e,Hl(e.state.doc.lines)))},updateSpacer(e,t){let n=Xs(t.view,Hl(t.view.state.doc.lines));return n==e.number?e:new Ks(n)},domEventHandlers:i.facet(gn).domEventHandlers,side:"before"}));function dp(i={}){return[gn.of(i),rp(),up]}function Hl(i){let e=9;for(;e<i;)e=e*10+9;return e}const fp=1024;let pp=0;class Gs{constructor(e,t){this.from=e,this.to=t}}class K{constructor(e={}){this.id=pp++,this.perNode=!!e.perNode,this.deserialize=e.deserialize||(()=>{throw new Error("This node type doesn't define a deserialize function")}),this.combine=e.combine||null}add(e){if(this.perNode)throw new RangeError("Can't add per-node props to node types");return typeof e!="function"&&(e=Ne.match(e)),t=>{let n=e(t);return n===void 0?null:[this,n]}}}K.closedBy=new K({deserialize:i=>i.split(" ")});K.openedBy=new K({deserialize:i=>i.split(" ")});K.group=new K({deserialize:i=>i.split(" ")});K.isolate=new K({deserialize:i=>{if(i&&i!="rtl"&&i!="ltr"&&i!="auto")throw new RangeError("Invalid value for isolate: "+i);return i||"auto"}});K.contextHash=new K({perNode:!0});K.lookAhead=new K({perNode:!0});K.mounted=new K({perNode:!0});class ei{constructor(e,t,n,s=!1){this.tree=e,this.overlay=t,this.parser=n,this.bracketed=s}static get(e){return e&&e.props&&e.props[K.mounted.id]}}const mp=Object.create(null);class Ne{constructor(e,t,n,s=0){this.name=e,this.props=t,this.id=n,this.flags=s}static define(e){let t=e.props&&e.props.length?Object.create(null):mp,n=(e.top?1:0)|(e.skipped?2:0)|(e.error?4:0)|(e.name==null?8:0),s=new Ne(e.name||"",t,e.id,n);if(e.props){for(let r of e.props)if(Array.isArray(r)||(r=r(s)),r){if(r[0].perNode)throw new RangeError("Can't store a per-node prop on a node type");t[r[0].id]=r[1]}}return s}prop(e){return this.props[e.id]}get isTop(){return(this.flags&1)>0}get isSkipped(){return(this.flags&2)>0}get isError(){return(this.flags&4)>0}get isAnonymous(){return(this.flags&8)>0}is(e){if(typeof e=="string"){if(this.name==e)return!0;let t=this.prop(K.group);return t?t.indexOf(e)>-1:!1}return this.id==e}static match(e){let t=Object.create(null);for(let n in e)for(let s of n.split(" "))t[s]=e[n];return n=>{for(let s=n.prop(K.group),r=-1;r<(s?s.length:0);r++){let o=t[r<0?n.name:s[r]];if(o)return o}}}}Ne.none=new Ne("",Object.create(null),0,8);class So{constructor(e){this.types=e;for(let t=0;t<e.length;t++)if(e[t].id!=t)throw new RangeError("Node type ids should correspond to array positions when creating a node set")}extend(...e){let t=[];for(let n of this.types){let s=null;for(let r of e){let o=r(n);if(o){s||(s=Object.assign({},n.props));let l=o[1],a=o[0];a.combine&&a.id in s&&(l=a.combine(s[a.id],l)),s[a.id]=l}}t.push(s?new Ne(n.name,s,n.id,n.flags):n)}return new So(t)}}const Di=new WeakMap,Wl=new WeakMap;var be;(function(i){i[i.ExcludeBuffers=1]="ExcludeBuffers",i[i.IncludeAnonymous=2]="IncludeAnonymous",i[i.IgnoreMounts=4]="IgnoreMounts",i[i.IgnoreOverlays=8]="IgnoreOverlays",i[i.EnterBracketed=16]="EnterBracketed"})(be||(be={}));class fe{constructor(e,t,n,s,r){if(this.type=e,this.children=t,this.positions=n,this.length=s,this.props=null,r&&r.length){this.props=Object.create(null);for(let[o,l]of r)this.props[typeof o=="number"?o:o.id]=l}}toString(){let e=ei.get(this);if(e&&!e.overlay)return e.tree.toString();let t="";for(let n of this.children){let s=n.toString();s&&(t&&(t+=","),t+=s)}return this.type.name?(/\W/.test(this.type.name)&&!this.type.isError?JSON.stringify(this.type.name):this.type.name)+(t.length?"("+t+")":""):t}cursor(e=0){return new Wr(this.topNode,e)}cursorAt(e,t=0,n=0){let s=Di.get(this)||this.topNode,r=new Wr(s);return r.moveTo(e,t),Di.set(this,r._tree),r}get topNode(){return new Je(this,0,0,null)}resolve(e,t=0){let n=ci(Di.get(this)||this.topNode,e,t,!1);return Di.set(this,n),n}resolveInner(e,t=0){let n=ci(Wl.get(this)||this.topNode,e,t,!0);return Wl.set(this,n),n}resolveStack(e,t=0){return yp(this,e,t)}iterate(e){let{enter:t,leave:n,from:s=0,to:r=this.length}=e,o=e.mode||0,l=(o&be.IncludeAnonymous)>0;for(let a=this.cursor(o|be.IncludeAnonymous);;){let c=!1;if(a.from<=r&&a.to>=s&&(!l&&a.type.isAnonymous||t(a)!==!1)){if(a.firstChild())continue;c=!0}for(;c&&n&&(l||!a.type.isAnonymous)&&n(a),!a.nextSibling();){if(!a.parent())return;c=!0}}}prop(e){return e.perNode?this.props?this.props[e.id]:void 0:this.type.prop(e)}get propValues(){let e=[];if(this.props)for(let t in this.props)e.push([+t,this.props[t]]);return e}balance(e={}){return this.children.length<=8?this:To(Ne.none,this.children,this.positions,0,this.children.length,0,this.length,(t,n,s)=>new fe(this.type,t,n,s,this.propValues),e.makeTree||((t,n,s)=>new fe(Ne.none,t,n,s)))}static build(e){return wp(e)}}fe.empty=new fe(Ne.none,[],[],0);class Co{constructor(e,t){this.buffer=e,this.index=t}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.index-2]}get size(){return this.buffer[this.index-1]}get pos(){return this.index}next(){this.index-=4}fork(){return new Co(this.buffer,this.index)}}class $t{constructor(e,t,n){this.buffer=e,this.length=t,this.set=n}get type(){return Ne.none}toString(){let e=[];for(let t=0;t<this.buffer.length;)e.push(this.childString(t)),t=this.buffer[t+3];return e.join(",")}childString(e){let t=this.buffer[e],n=this.buffer[e+3],s=this.set.types[t],r=s.name;if(/\W/.test(r)&&!s.isError&&(r=JSON.stringify(r)),e+=4,n==e)return r;let o=[];for(;e<n;)o.push(this.childString(e)),e=this.buffer[e+3];return r+"("+o.join(",")+")"}findChild(e,t,n,s,r){let{buffer:o}=this,l=-1;for(let a=e;a!=t&&!(Uc(r,s,o[a+1],o[a+2])&&(l=a,n>0));a=o[a+3]);return l}slice(e,t,n){let s=this.buffer,r=new Uint16Array(t-e),o=0;for(let l=e,a=0;l<t;){r[a++]=s[l++],r[a++]=s[l++]-n;let c=r[a++]=s[l++]-n;r[a++]=s[l++]-e,o=Math.max(o,c)}return new $t(r,o,this.set)}}function Uc(i,e,t,n){switch(i){case-2:return t<e;case-1:return n>=e&&t<e;case 0:return t<e&&n>e;case 1:return t<=e&&n>e;case 2:return n>e;case 4:return!0}}function ci(i,e,t,n){for(var s;i.from==i.to||(t<1?i.from>=e:i.from>e)||(t>-1?i.to<=e:i.to<e);){let o=!n&&i instanceof Je&&i.index<0?null:i.parent;if(!o)return i;i=o}let r=n?0:be.IgnoreOverlays;if(n)for(let o=i,l=o.parent;l;o=l,l=o.parent)o instanceof Je&&o.index<0&&((s=l.enter(e,t,r))===null||s===void 0?void 0:s.from)!=o.from&&(i=l);for(;;){let o=i.enter(e,t,r);if(!o)return i;i=o}}class jc{cursor(e=0){return new Wr(this,e)}getChild(e,t=null,n=null){let s=Vl(this,e,t,n);return s.length?s[0]:null}getChildren(e,t=null,n=null){return Vl(this,e,t,n)}resolve(e,t=0){return ci(this,e,t,!1)}resolveInner(e,t=0){return ci(this,e,t,!0)}matchContext(e){return Hr(this.parent,e)}enterUnfinishedNodesBefore(e){let t=this.childBefore(e),n=this;for(;t;){let s=t.lastChild;if(!s||s.to!=t.to)break;s.type.isError&&s.from==s.to?(n=t,t=s.prevSibling):t=s}return n}get node(){return this}get next(){return this.parent}}class Je extends jc{constructor(e,t,n,s){super(),this._tree=e,this.from=t,this.index=n,this._parent=s}get type(){return this._tree.type}get name(){return this._tree.type.name}get to(){return this.from+this._tree.length}nextChild(e,t,n,s,r=0){for(let o=this;;){for(let{children:l,positions:a}=o._tree,c=t>0?l.length:-1;e!=c;e+=t){let h=l[e],u=a[e]+o.from,d;if(!(!(r&be.EnterBracketed&&h instanceof fe&&(d=ei.get(h))&&!d.overlay&&d.bracketed&&n>=u&&n<=u+h.length)&&!Uc(s,n,u,u+h.length))){if(h instanceof $t){if(r&be.ExcludeBuffers)continue;let f=h.findChild(0,h.buffer.length,t,n-u,s);if(f>-1)return new Nt(new gp(o,h,e,u),null,f)}else if(r&be.IncludeAnonymous||!h.type.isAnonymous||Ao(h)){let f;if(!(r&be.IgnoreMounts)&&(f=ei.get(h))&&!f.overlay)return new Je(f.tree,u,e,o);let p=new Je(h,u,e,o);return r&be.IncludeAnonymous||!p.type.isAnonymous?p:p.nextChild(t<0?h.children.length-1:0,t,n,s,r)}}}if(r&be.IncludeAnonymous||!o.type.isAnonymous||(o.index>=0?e=o.index+t:e=t<0?-1:o._parent._tree.children.length,o=o._parent,!o))return null}}get firstChild(){return this.nextChild(0,1,0,4)}get lastChild(){return this.nextChild(this._tree.children.length-1,-1,0,4)}childAfter(e){return this.nextChild(0,1,e,2)}childBefore(e){return this.nextChild(this._tree.children.length-1,-1,e,-2)}prop(e){return this._tree.prop(e)}enter(e,t,n=0){let s;if(!(n&be.IgnoreOverlays)&&(s=ei.get(this._tree))&&s.overlay){let r=e-this.from,o=n&be.EnterBracketed&&s.bracketed;for(let{from:l,to:a}of s.overlay)if((t>0||o?l<=r:l<r)&&(t<0||o?a>=r:a>r))return new Je(s.tree,s.overlay[0].from+this.from,-1,this)}return this.nextChild(0,1,e,t,n)}nextSignificantParent(){let e=this;for(;e.type.isAnonymous&&e._parent;)e=e._parent;return e}get parent(){return this._parent?this._parent.nextSignificantParent():null}get nextSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index+1,1,0,4):null}get prevSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index-1,-1,0,4):null}get tree(){return this._tree}toTree(){return this._tree}toString(){return this._tree.toString()}}function Vl(i,e,t,n){let s=i.cursor(),r=[];if(!s.firstChild())return r;if(t!=null){for(let o=!1;!o;)if(o=s.type.is(t),!s.nextSibling())return r}for(;;){if(n!=null&&s.type.is(n))return r;if(s.type.is(e)&&r.push(s.node),!s.nextSibling())return n==null?r:[]}}function Hr(i,e,t=e.length-1){for(let n=i;t>=0;n=n.parent){if(!n)return!1;if(!n.type.isAnonymous){if(e[t]&&e[t]!=n.name)return!1;t--}}return!0}class gp{constructor(e,t,n,s){this.parent=e,this.buffer=t,this.index=n,this.start=s}}class Nt extends jc{get name(){return this.type.name}get from(){return this.context.start+this.context.buffer.buffer[this.index+1]}get to(){return this.context.start+this.context.buffer.buffer[this.index+2]}constructor(e,t,n){super(),this.context=e,this._parent=t,this.index=n,this.type=e.buffer.set.types[e.buffer.buffer[n]]}child(e,t,n){let{buffer:s}=this.context,r=s.findChild(this.index+4,s.buffer[this.index+3],e,t-this.context.start,n);return r<0?null:new Nt(this.context,this,r)}get firstChild(){return this.child(1,0,4)}get lastChild(){return this.child(-1,0,4)}childAfter(e){return this.child(1,e,2)}childBefore(e){return this.child(-1,e,-2)}prop(e){return this.type.prop(e)}enter(e,t,n=0){if(n&be.ExcludeBuffers)return null;let{buffer:s}=this.context,r=s.findChild(this.index+4,s.buffer[this.index+3],t>0?1:-1,e-this.context.start,t);return r<0?null:new Nt(this.context,this,r)}get parent(){return this._parent||this.context.parent.nextSignificantParent()}externalSibling(e){return this._parent?null:this.context.parent.nextChild(this.context.index+e,e,0,4)}get nextSibling(){let{buffer:e}=this.context,t=e.buffer[this.index+3];return t<(this._parent?e.buffer[this._parent.index+3]:e.buffer.length)?new Nt(this.context,this._parent,t):this.externalSibling(1)}get prevSibling(){let{buffer:e}=this.context,t=this._parent?this._parent.index+4:0;return this.index==t?this.externalSibling(-1):new Nt(this.context,this._parent,e.findChild(t,this.index,-1,0,4))}get tree(){return null}toTree(){let e=[],t=[],{buffer:n}=this.context,s=this.index+4,r=n.buffer[this.index+3];if(r>s){let o=n.buffer[this.index+1];e.push(n.slice(s,r,o)),t.push(0)}return new fe(this.type,e,t,this.to-this.from)}toString(){return this.context.buffer.childString(this.index)}}function Kc(i){if(!i.length)return null;let e=0,t=i[0];for(let r=1;r<i.length;r++){let o=i[r];(o.from>t.from||o.to<t.to)&&(t=o,e=r)}let n=t instanceof Je&&t.index<0?null:t.parent,s=i.slice();return n?s[e]=n:s.splice(e,1),new bp(s,t)}class bp{constructor(e,t){this.heads=e,this.node=t}get next(){return Kc(this.heads)}}function yp(i,e,t){let n=i.resolveInner(e,t),s=null;for(let r=n instanceof Je?n:n.context.parent;r;r=r.parent)if(r.index<0){let o=r.parent;(s||(s=[n])).push(o.resolve(e,t)),r=o}else{let o=ei.get(r.tree);if(o&&o.overlay&&o.overlay[0].from<=e&&o.overlay[o.overlay.length-1].to>=e){let l=new Je(o.tree,o.overlay[0].from+r.from,-1,r);(s||(s=[n])).push(ci(l,e,t,!1))}}return s?Kc(s):n}class Wr{get name(){return this.type.name}constructor(e,t=0){if(this.buffer=null,this.stack=[],this.index=0,this.bufferNode=null,this.mode=t&~be.EnterBracketed,e instanceof Je)this.yieldNode(e);else{this._tree=e.context.parent,this.buffer=e.context;for(let n=e._parent;n;n=n._parent)this.stack.unshift(n.index);this.bufferNode=e,this.yieldBuf(e.index)}}yieldNode(e){return e?(this._tree=e,this.type=e.type,this.from=e.from,this.to=e.to,!0):!1}yieldBuf(e,t){this.index=e;let{start:n,buffer:s}=this.buffer;return this.type=t||s.set.types[s.buffer[e]],this.from=n+s.buffer[e+1],this.to=n+s.buffer[e+2],!0}yield(e){return e?e instanceof Je?(this.buffer=null,this.yieldNode(e)):(this.buffer=e.context,this.yieldBuf(e.index,e.type)):!1}toString(){return this.buffer?this.buffer.buffer.childString(this.index):this._tree.toString()}enterChild(e,t,n){if(!this.buffer)return this.yield(this._tree.nextChild(e<0?this._tree._tree.children.length-1:0,e,t,n,this.mode));let{buffer:s}=this.buffer,r=s.findChild(this.index+4,s.buffer[this.index+3],e,t-this.buffer.start,n);return r<0?!1:(this.stack.push(this.index),this.yieldBuf(r))}firstChild(){return this.enterChild(1,0,4)}lastChild(){return this.enterChild(-1,0,4)}childAfter(e){return this.enterChild(1,e,2)}childBefore(e){return this.enterChild(-1,e,-2)}enter(e,t,n=this.mode){return this.buffer?n&be.ExcludeBuffers?!1:this.enterChild(1,e,t):this.yield(this._tree.enter(e,t,n))}parent(){if(!this.buffer)return this.yieldNode(this.mode&be.IncludeAnonymous?this._tree._parent:this._tree.parent);if(this.stack.length)return this.yieldBuf(this.stack.pop());let e=this.mode&be.IncludeAnonymous?this.buffer.parent:this.buffer.parent.nextSignificantParent();return this.buffer=null,this.yieldNode(e)}sibling(e){if(!this.buffer)return this._tree._parent?this.yield(this._tree.index<0?null:this._tree._parent.nextChild(this._tree.index+e,e,0,4,this.mode)):!1;let{buffer:t}=this.buffer,n=this.stack.length-1;if(e<0){let s=n<0?0:this.stack[n]+4;if(this.index!=s)return this.yieldBuf(t.findChild(s,this.index,-1,0,4))}else{let s=t.buffer[this.index+3];if(s<(n<0?t.buffer.length:t.buffer[this.stack[n]+3]))return this.yieldBuf(s)}return n<0?this.yield(this.buffer.parent.nextChild(this.buffer.index+e,e,0,4,this.mode)):!1}nextSibling(){return this.sibling(1)}prevSibling(){return this.sibling(-1)}atLastNode(e){let t,n,{buffer:s}=this;if(s){if(e>0){if(this.index<s.buffer.buffer.length)return!1}else for(let r=0;r<this.index;r++)if(s.buffer.buffer[r+3]<this.index)return!1;({index:t,parent:n}=s)}else({index:t,_parent:n}=this._tree);for(;n;{index:t,_parent:n}=n)if(t>-1)for(let r=t+e,o=e<0?-1:n._tree.children.length;r!=o;r+=e){let l=n._tree.children[r];if(this.mode&be.IncludeAnonymous||l instanceof $t||!l.type.isAnonymous||Ao(l))return!1}return!0}move(e,t){if(t&&this.enterChild(e,0,4))return!0;for(;;){if(this.sibling(e))return!0;if(this.atLastNode(e)||!this.parent())return!1}}next(e=!0){return this.move(1,e)}prev(e=!0){return this.move(-1,e)}moveTo(e,t=0){for(;(this.from==this.to||(t<1?this.from>=e:this.from>e)||(t>-1?this.to<=e:this.to<e))&&this.parent(););for(;this.enterChild(1,e,t););return this}get node(){if(!this.buffer)return this._tree;let e=this.bufferNode,t=null,n=0;if(e&&e.context==this.buffer)e:for(let s=this.index,r=this.stack.length;r>=0;){for(let o=e;o;o=o._parent)if(o.index==s){if(s==this.index)return o;t=o,n=r+1;break e}s=this.stack[--r]}for(let s=n;s<this.stack.length;s++)t=new Nt(this.buffer,t,this.stack[s]);return this.bufferNode=new Nt(this.buffer,t,this.index)}get tree(){return this.buffer?null:this._tree._tree}iterate(e,t){for(let n=0;;){let s=!1;if(this.type.isAnonymous||e(this)!==!1){if(this.firstChild()){n++;continue}this.type.isAnonymous||(s=!0)}for(;;){if(s&&t&&t(this),s=this.type.isAnonymous,!n)return;if(this.nextSibling())break;this.parent(),n--,s=!0}}}matchContext(e){if(!this.buffer)return Hr(this.node.parent,e);let{buffer:t}=this.buffer,{types:n}=t.set;for(let s=e.length-1,r=this.stack.length-1;s>=0;r--){if(r<0)return Hr(this._tree,e,s);let o=n[t.buffer[this.stack[r]]];if(!o.isAnonymous){if(e[s]&&e[s]!=o.name)return!1;s--}}return!0}}function Ao(i){return i.children.some(e=>e instanceof $t||!e.type.isAnonymous||Ao(e))}function wp(i){var e;let{buffer:t,nodeSet:n,maxBufferLength:s=fp,reused:r=[],minRepeatType:o=n.types.length}=i,l=Array.isArray(t)?new Co(t,t.length):t,a=n.types,c=0,h=0;function u(C,A,x,D,M,N){let{id:L,start:P,end:V,size:w}=l,R=h,$=c;if(w<0)if(l.next(),w==-1){let se=r[L];x.push(se),D.push(P-C);return}else if(w==-3){c=L;return}else if(w==-4){h=L;return}else throw new RangeError(`Unrecognized record size: ${w}`);let F=a[L],G,U,ne=P-C;if(V-P<=s&&(U=g(l.pos-A,M))){let se=new Uint16Array(U.size-U.skip),oe=l.pos-U.size,Y=se.length;for(;l.pos>oe;)Y=b(U.start,se,Y);G=new $t(se,V-U.start,n),ne=U.start-C}else{let se=l.pos-w;l.next();let oe=[],Y=[],ie=L>=o?L:-1,X=0,re=V;for(;l.pos>se;)ie>=0&&l.id==ie&&l.size>=0?(l.end<=re-s&&(p(oe,Y,P,X,l.end,re,ie,R,$),X=oe.length,re=l.end),l.next()):N>2500?d(P,se,oe,Y):u(P,se,oe,Y,ie,N+1);if(ie>=0&&X>0&&X<oe.length&&p(oe,Y,P,X,P,re,ie,R,$),oe.reverse(),Y.reverse(),ie>-1&&X>0){let Fe=f(F,$);G=To(F,oe,Y,0,oe.length,0,V-P,Fe,Fe)}else G=m(F,oe,Y,V-P,R-V,$)}x.push(G),D.push(ne)}function d(C,A,x,D){let M=[],N=0,L=-1;for(;l.pos>A;){let{id:P,start:V,end:w,size:R}=l;if(R>4)l.next();else{if(L>-1&&V<L)break;L<0&&(L=w-s),M.push(P,V,w),N++,l.next()}}if(N){let P=new Uint16Array(N*4),V=M[M.length-2];for(let w=M.length-3,R=0;w>=0;w-=3)P[R++]=M[w],P[R++]=M[w+1]-V,P[R++]=M[w+2]-V,P[R++]=R;x.push(new $t(P,M[2]-V,n)),D.push(V-C)}}function f(C,A){return(x,D,M)=>{let N=0,L=x.length-1,P,V;if(L>=0&&(P=x[L])instanceof fe){if(!L&&P.type==C&&P.length==M)return P;(V=P.prop(K.lookAhead))&&(N=D[L]+P.length+V)}return m(C,x,D,M,N,A)}}function p(C,A,x,D,M,N,L,P,V){let w=[],R=[];for(;C.length>D;)w.push(C.pop()),R.push(A.pop()+x-M);C.push(m(n.types[L],w,R,N-M,P-N,V)),A.push(M-x)}function m(C,A,x,D,M,N,L){if(N){let P=[K.contextHash,N];L=L?[P].concat(L):[P]}if(M>25){let P=[K.lookAhead,M];L=L?[P].concat(L):[P]}return new fe(C,A,x,D,L)}function g(C,A){let x=l.fork(),D=0,M=0,N=0,L=x.end-s,P={size:0,start:0,skip:0};e:for(let V=x.pos-C;x.pos>V;){let w=x.size;if(x.id==A&&w>=0){P.size=D,P.start=M,P.skip=N,N+=4,D+=4,x.next();continue}let R=x.pos-w;if(w<0||R<V||x.start<L)break;let $=x.id>=o?4:0,F=x.start;for(x.next();x.pos>R;){if(x.size<0)if(x.size==-3||x.size==-4)$+=4;else break e;else x.id>=o&&($+=4);x.next()}M=F,D+=w,N+=$}return(A<0||D==C)&&(P.size=D,P.start=M,P.skip=N),P.size>4?P:void 0}function b(C,A,x){let{id:D,start:M,end:N,size:L}=l;if(l.next(),L>=0&&D<o){let P=x;if(L>4){let V=l.pos-(L-4);for(;l.pos>V;)x=b(C,A,x)}A[--x]=P,A[--x]=N-C,A[--x]=M-C,A[--x]=D}else L==-3?c=D:L==-4&&(h=D);return x}let k=[],v=[];for(;l.pos>0;)u(i.start||0,i.bufferStart||0,k,v,-1,0);let I=(e=i.length)!==null&&e!==void 0?e:k.length?v[0]+k[0].length:0;return new fe(a[i.topID],k.reverse(),v.reverse(),I)}const $l=new WeakMap;function ji(i,e){if(!i.isAnonymous||e instanceof $t||e.type!=i)return 1;let t=$l.get(e);if(t==null){t=1;for(let n of e.children){if(n.type!=i||!(n instanceof fe)){t=1;break}t+=ji(i,n)}$l.set(e,t)}return t}function To(i,e,t,n,s,r,o,l,a){let c=0;for(let p=n;p<s;p++)c+=ji(i,e[p]);let h=Math.ceil(c*1.5/8),u=[],d=[];function f(p,m,g,b,k){for(let v=g;v<b;){let I=v,C=m[v],A=ji(i,p[v]);for(v++;v<b;v++){let x=ji(i,p[v]);if(A+x>=h)break;A+=x}if(v==I+1){if(A>h){let x=p[I];f(x.children,x.positions,0,x.children.length,m[I]+k);continue}u.push(p[I])}else{let x=m[v-1]+p[v-1].length-C;u.push(To(i,p,m,I,v,C,x,null,a))}d.push(C+k-r)}}return f(e,t,n,s,0),(l||a)(u,d,o)}class tn{constructor(e,t,n,s,r=!1,o=!1){this.from=e,this.to=t,this.tree=n,this.offset=s,this.open=(r?1:0)|(o?2:0)}get openStart(){return(this.open&1)>0}get openEnd(){return(this.open&2)>0}static addTree(e,t=[],n=!1){let s=[new tn(0,e.length,e,0,!1,n)];for(let r of t)r.to>e.length&&s.push(r);return s}static applyChanges(e,t,n=128){if(!t.length)return e;let s=[],r=1,o=e.length?e[0]:null;for(let l=0,a=0,c=0;;l++){let h=l<t.length?t[l]:null,u=h?h.fromA:1e9;if(u-a>=n)for(;o&&o.from<u;){let d=o;if(a>=d.from||u<=d.to||c){let f=Math.max(d.from,a)-c,p=Math.min(d.to,u)-c;d=f>=p?null:new tn(f,p,d.tree,d.offset+c,l>0,!!h)}if(d&&s.push(d),o.to>u)break;o=r<e.length?e[r++]:null}if(!h)break;a=h.toA,c=h.toA-h.toB}return s}}class Xc{startParse(e,t,n){return typeof e=="string"&&(e=new vp(e)),n=n?n.length?n.map(s=>new Gs(s.from,s.to)):[new Gs(0,0)]:[new Gs(0,e.length)],this.createParse(e,t||[],n)}parse(e,t,n){let s=this.startParse(e,t,n);for(;;){let r=s.advance();if(r)return r}}}class vp{constructor(e){this.string=e}get length(){return this.string.length}chunk(e){return this.string.slice(e)}get lineChunks(){return!1}read(e,t){return this.string.slice(e,t)}}new K({perNode:!0});let xp=0;class Xe{constructor(e,t,n,s){this.name=e,this.set=t,this.base=n,this.modified=s,this.id=xp++}toString(){let{name:e}=this;for(let t of this.modified)t.name&&(e=`${t.name}(${e})`);return e}static define(e,t){let n=typeof e=="string"?e:"?";if(e instanceof Xe&&(t=e),t!=null&&t.base)throw new Error("Can not derive from a modified tag");let s=new Xe(n,[],null,[]);if(s.set.push(s),t)for(let r of t.set)s.set.push(r);return s}static defineModifier(e){let t=new ls(e);return n=>n.modified.indexOf(t)>-1?n:ls.get(n.base||n,n.modified.concat(t).sort((s,r)=>s.id-r.id))}}let kp=0;class ls{constructor(e){this.name=e,this.instances=[],this.id=kp++}static get(e,t){if(!t.length)return e;let n=t[0].instances.find(l=>l.base==e&&_p(t,l.modified));if(n)return n;let s=[],r=new Xe(e.name,s,e,t);for(let l of t)l.instances.push(r);let o=Sp(t);for(let l of e.set)if(!l.modified.length)for(let a of o)s.push(ls.get(l,a));return r}}function _p(i,e){return i.length==e.length&&i.every((t,n)=>t==e[n])}function Sp(i){let e=[[]];for(let t=0;t<i.length;t++)for(let n=0,s=e.length;n<s;n++)e.push(e[n].concat(i[t]));return e.sort((t,n)=>n.length-t.length)}function Cp(i){let e=Object.create(null);for(let t in i){let n=i[t];Array.isArray(n)||(n=[n]);for(let s of t.split(" "))if(s){let r=[],o=2,l=s;for(let u=0;;){if(l=="..."&&u>0&&u+3==s.length){o=1;break}let d=/^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(l);if(!d)throw new RangeError("Invalid path: "+s);if(r.push(d[0]=="*"?"":d[0][0]=='"'?JSON.parse(d[0]):d[0]),u+=d[0].length,u==s.length)break;let f=s[u++];if(u==s.length&&f=="!"){o=0;break}if(f!="/")throw new RangeError("Invalid path: "+s);l=s.slice(u)}let a=r.length-1,c=r[a];if(!c)throw new RangeError("Invalid path: "+s);let h=new hi(n,o,a>0?r.slice(0,a):null);e[c]=h.sort(e[c])}}return Gc.add(e)}const Gc=new K({combine(i,e){let t,n,s;for(;i||e;){if(!i||e&&i.depth>=e.depth?(s=e,e=e.next):(s=i,i=i.next),t&&t.mode==s.mode&&!s.context&&!t.context)continue;let r=new hi(s.tags,s.mode,s.context);t?t.next=r:n=r,t=r}return n}});class hi{constructor(e,t,n,s){this.tags=e,this.mode=t,this.context=n,this.next=s}get opaque(){return this.mode==0}get inherit(){return this.mode==1}sort(e){return!e||e.depth<this.depth?(this.next=e,this):(e.next=this.sort(e.next),e)}get depth(){return this.context?this.context.length:0}}hi.empty=new hi([],2,null);function Yc(i,e){let t=Object.create(null);for(let r of i)if(!Array.isArray(r.tag))t[r.tag.id]=r.class;else for(let o of r.tag)t[o.id]=r.class;let{scope:n,all:s=null}=e||{};return{style:r=>{let o=s;for(let l of r)for(let a of l.set){let c=t[a.id];if(c){o=o?o+" "+c:c;break}}return o},scope:n}}function Ap(i,e){let t=null;for(let n of i){let s=n.style(e);s&&(t=t?t+" "+s:s)}return t}function Tp(i,e,t,n=0,s=i.length){let r=new Mp(n,Array.isArray(e)?e:[e],t);r.highlightRange(i.cursor(),n,s,"",r.highlighters),r.flush(s)}class Mp{constructor(e,t,n){this.at=e,this.highlighters=t,this.span=n,this.class=""}startSpan(e,t){t!=this.class&&(this.flush(e),e>this.at&&(this.at=e),this.class=t)}flush(e){e>this.at&&this.class&&this.span(this.at,e,this.class)}highlightRange(e,t,n,s,r){let{type:o,from:l,to:a}=e;if(l>=n||a<=t)return;o.isTop&&(r=this.highlighters.filter(f=>!f.scope||f.scope(o)));let c=s,h=Ep(e)||hi.empty,u=Ap(r,h.tags);if(u&&(c&&(c+=" "),c+=u,h.mode==1&&(s+=(s?" ":"")+u)),this.startSpan(Math.max(t,l),c),h.opaque)return;let d=e.tree&&e.tree.prop(K.mounted);if(d&&d.overlay){let f=e.node.enter(d.overlay[0].from+l,1),p=this.highlighters.filter(g=>!g.scope||g.scope(d.tree.type)),m=e.firstChild();for(let g=0,b=l;;g++){let k=g<d.overlay.length?d.overlay[g]:null,v=k?k.from+l:a,I=Math.max(t,b),C=Math.min(n,v);if(I<C&&m)for(;e.from<C&&(this.highlightRange(e,I,C,s,r),this.startSpan(Math.min(C,e.to),c),!(e.to>=v||!e.nextSibling())););if(!k||v>n)break;b=k.to+l,b>t&&(this.highlightRange(f.cursor(),Math.max(t,k.from+l),Math.min(n,b),"",p),this.startSpan(Math.min(n,b),c))}m&&e.parent()}else if(e.firstChild()){d&&(s="");do if(!(e.to<=t)){if(e.from>=n)break;this.highlightRange(e,t,n,s,r),this.startSpan(Math.min(n,e.to),c)}while(e.nextSibling());e.parent()}}}function Ep(i){let e=i.type.prop(Gc);for(;e&&e.context&&!i.matchContext(e.context);)e=e.next;return e||null}const E=Xe.define,Pi=E(),Rt=E(),Ul=E(Rt),jl=E(Rt),It=E(),Oi=E(It),Ys=E(It),mt=E(),Gt=E(mt),dt=E(),ft=E(),Vr=E(),qn=E(Vr),Li=E(),H={comment:Pi,lineComment:E(Pi),blockComment:E(Pi),docComment:E(Pi),name:Rt,variableName:E(Rt),typeName:Ul,tagName:E(Ul),propertyName:jl,attributeName:E(jl),className:E(Rt),labelName:E(Rt),namespace:E(Rt),macroName:E(Rt),literal:It,string:Oi,docString:E(Oi),character:E(Oi),attributeValue:E(Oi),number:Ys,integer:E(Ys),float:E(Ys),bool:E(It),regexp:E(It),escape:E(It),color:E(It),url:E(It),keyword:dt,self:E(dt),null:E(dt),atom:E(dt),unit:E(dt),modifier:E(dt),operatorKeyword:E(dt),controlKeyword:E(dt),definitionKeyword:E(dt),moduleKeyword:E(dt),operator:ft,derefOperator:E(ft),arithmeticOperator:E(ft),logicOperator:E(ft),bitwiseOperator:E(ft),compareOperator:E(ft),updateOperator:E(ft),definitionOperator:E(ft),typeOperator:E(ft),controlOperator:E(ft),punctuation:Vr,separator:E(Vr),bracket:qn,angleBracket:E(qn),squareBracket:E(qn),paren:E(qn),brace:E(qn),content:mt,heading:Gt,heading1:E(Gt),heading2:E(Gt),heading3:E(Gt),heading4:E(Gt),heading5:E(Gt),heading6:E(Gt),contentSeparator:E(mt),list:E(mt),quote:E(mt),emphasis:E(mt),strong:E(mt),link:E(mt),monospace:E(mt),strikethrough:E(mt),inserted:E(),deleted:E(),changed:E(),invalid:E(),meta:Li,documentMeta:E(Li),annotation:E(Li),processingInstruction:E(Li),definition:Xe.defineModifier("definition"),constant:Xe.defineModifier("constant"),function:Xe.defineModifier("function"),standard:Xe.defineModifier("standard"),local:Xe.defineModifier("local"),special:Xe.defineModifier("special")};for(let i in H){let e=H[i];e instanceof Xe&&(e.name=i)}Yc([{tag:H.link,class:"tok-link"},{tag:H.heading,class:"tok-heading"},{tag:H.emphasis,class:"tok-emphasis"},{tag:H.strong,class:"tok-strong"},{tag:H.keyword,class:"tok-keyword"},{tag:H.atom,class:"tok-atom"},{tag:H.bool,class:"tok-bool"},{tag:H.url,class:"tok-url"},{tag:H.labelName,class:"tok-labelName"},{tag:H.inserted,class:"tok-inserted"},{tag:H.deleted,class:"tok-deleted"},{tag:H.literal,class:"tok-literal"},{tag:H.string,class:"tok-string"},{tag:H.number,class:"tok-number"},{tag:[H.regexp,H.escape,H.special(H.string)],class:"tok-string2"},{tag:H.variableName,class:"tok-variableName"},{tag:H.local(H.variableName),class:"tok-variableName tok-local"},{tag:H.definition(H.variableName),class:"tok-variableName tok-definition"},{tag:H.special(H.variableName),class:"tok-variableName2"},{tag:H.definition(H.propertyName),class:"tok-propertyName tok-definition"},{tag:H.typeName,class:"tok-typeName"},{tag:H.namespace,class:"tok-namespace"},{tag:H.className,class:"tok-className"},{tag:H.macroName,class:"tok-macroName"},{tag:H.propertyName,class:"tok-propertyName"},{tag:H.operator,class:"tok-operator"},{tag:H.comment,class:"tok-comment"},{tag:H.meta,class:"tok-meta"},{tag:H.invalid,class:"tok-invalid"},{tag:H.punctuation,class:"tok-punctuation"}]);var Js;const bn=new K;function Bp(i){return z.define({combine:i?e=>e.concat(i):void 0})}const Dp=new K;class st{constructor(e,t,n=[],s=""){this.data=e,this.name=s,te.prototype.hasOwnProperty("tree")||Object.defineProperty(te.prototype,"tree",{get(){return Ct(this)}}),this.parser=t,this.extension=[Bn.of(this),te.languageData.of((r,o,l)=>{let a=Kl(r,o,l),c=a.type.prop(bn);if(!c)return[];let h=r.facet(c),u=a.type.prop(Dp);if(u){let d=a.resolve(o-a.from,l);for(let f of u)if(f.test(d,r)){let p=r.facet(f.facet);return f.type=="replace"?p:p.concat(h)}}return h})].concat(n)}isActiveAt(e,t,n=-1){return Kl(e,t,n).type.prop(bn)==this.data}findRegions(e){let t=e.facet(Bn);if((t==null?void 0:t.data)==this.data)return[{from:0,to:e.doc.length}];if(!t||!t.allowsNesting)return[];let n=[],s=(r,o)=>{if(r.prop(bn)==this.data){n.push({from:o,to:o+r.length});return}let l=r.prop(K.mounted);if(l){if(l.tree.prop(bn)==this.data){if(l.overlay)for(let a of l.overlay)n.push({from:a.from+o,to:a.to+o});else n.push({from:o,to:o+r.length});return}else if(l.overlay){let a=n.length;if(s(l.tree,l.overlay[0].from+o),n.length>a)return}}for(let a=0;a<r.children.length;a++){let c=r.children[a];c instanceof fe&&s(c,r.positions[a]+o)}};return s(Ct(e),0),n}get allowsNesting(){return!0}}st.setState=ye.define();function Kl(i,e,t){let n=i.facet(Bn),s=Ct(i).topNode;if(!n||n.allowsNesting)for(let r=s;r;r=r.enter(e,t,be.ExcludeBuffers|be.EnterBracketed))r.type.isTop&&(s=r);return s}function Ct(i){let e=i.field(st.state,!1);return e?e.tree:fe.empty}class Pp{constructor(e){this.doc=e,this.cursorPos=0,this.string="",this.cursor=e.iter()}get length(){return this.doc.length}syncTo(e){return this.string=this.cursor.next(e-this.cursorPos).value,this.cursorPos=e+this.string.length,this.cursorPos-this.string.length}chunk(e){return this.syncTo(e),this.string}get lineChunks(){return!0}read(e,t){let n=this.cursorPos-this.string.length;return e<n||t>=this.cursorPos?this.doc.sliceString(e,t):this.string.slice(e-n,t-n)}}let Nn=null;class Mn{constructor(e,t,n=[],s,r,o,l,a){this.parser=e,this.state=t,this.fragments=n,this.tree=s,this.treeLen=r,this.viewport=o,this.skipped=l,this.scheduleOn=a,this.parse=null,this.tempSkipped=[]}static create(e,t,n){return new Mn(e,t,[],fe.empty,0,n,[],null)}startParse(){return this.parser.startParse(new Pp(this.state.doc),this.fragments)}work(e,t){return t!=null&&t>=this.state.doc.length&&(t=void 0),this.tree!=fe.empty&&this.isDone(t??this.state.doc.length)?(this.takeTree(),!0):this.withContext(()=>{var n;if(typeof e=="number"){let s=Date.now()+e;e=()=>Date.now()>s}for(this.parse||(this.parse=this.startParse()),t!=null&&(this.parse.stoppedAt==null||this.parse.stoppedAt>t)&&t<this.state.doc.length&&this.parse.stopAt(t);;){let s=this.parse.advance();if(s)if(this.fragments=this.withoutTempSkipped(tn.addTree(s,this.fragments,this.parse.stoppedAt!=null)),this.treeLen=(n=this.parse.stoppedAt)!==null&&n!==void 0?n:this.state.doc.length,this.tree=s,this.parse=null,this.treeLen<(t??this.state.doc.length))this.parse=this.startParse();else return!0;if(e())return!1}})}takeTree(){let e,t;this.parse&&(e=this.parse.parsedPos)>=this.treeLen&&((this.parse.stoppedAt==null||this.parse.stoppedAt>e)&&this.parse.stopAt(e),this.withContext(()=>{for(;!(t=this.parse.advance()););}),this.treeLen=e,this.tree=t,this.fragments=this.withoutTempSkipped(tn.addTree(this.tree,this.fragments,!0)),this.parse=null)}withContext(e){let t=Nn;Nn=this;try{return e()}finally{Nn=t}}withoutTempSkipped(e){for(let t;t=this.tempSkipped.pop();)e=Xl(e,t.from,t.to);return e}changes(e,t){let{fragments:n,tree:s,treeLen:r,viewport:o,skipped:l}=this;if(this.takeTree(),!e.empty){let a=[];if(e.iterChangedRanges((c,h,u,d)=>a.push({fromA:c,toA:h,fromB:u,toB:d})),n=tn.applyChanges(n,a),s=fe.empty,r=0,o={from:e.mapPos(o.from,-1),to:e.mapPos(o.to,1)},this.skipped.length){l=[];for(let c of this.skipped){let h=e.mapPos(c.from,1),u=e.mapPos(c.to,-1);h<u&&l.push({from:h,to:u})}}}return new Mn(this.parser,t,n,s,r,o,l,this.scheduleOn)}updateViewport(e){if(this.viewport.from==e.from&&this.viewport.to==e.to)return!1;this.viewport=e;let t=this.skipped.length;for(let n=0;n<this.skipped.length;n++){let{from:s,to:r}=this.skipped[n];s<e.to&&r>e.from&&(this.fragments=Xl(this.fragments,s,r),this.skipped.splice(n--,1))}return this.skipped.length>=t?!1:(this.reset(),!0)}reset(){this.parse&&(this.takeTree(),this.parse=null)}skipUntilInView(e,t){this.skipped.push({from:e,to:t})}static getSkippingParser(e){return new class extends Xc{createParse(t,n,s){let r=s[0].from,o=s[s.length-1].to;return{parsedPos:r,advance(){let a=Nn;if(a){for(let c of s)a.tempSkipped.push(c);e&&(a.scheduleOn=a.scheduleOn?Promise.all([a.scheduleOn,e]):e)}return this.parsedPos=o,new fe(Ne.none,[],[],o-r)},stoppedAt:null,stopAt(){}}}}}isDone(e){e=Math.min(e,this.state.doc.length);let t=this.fragments;return this.treeLen>=e&&t.length&&t[0].from==0&&t[0].to>=e}static get(){return Nn}}function Xl(i,e,t){return tn.applyChanges(i,[{fromA:e,toA:t,fromB:e,toB:t}])}class En{constructor(e){this.context=e,this.tree=e.tree}apply(e){if(!e.docChanged&&this.tree==this.context.tree)return this;let t=this.context.changes(e.changes,e.state),n=this.context.treeLen==e.startState.doc.length?void 0:Math.max(e.changes.mapPos(this.context.treeLen),t.viewport.to);return t.work(20,n)||t.takeTree(),new En(t)}static init(e){let t=Math.min(3e3,e.doc.length),n=Mn.create(e.facet(Bn).parser,e,{from:0,to:t});return n.work(20,t)||n.takeTree(),new En(n)}}st.state=jt.define({create:En.init,update(i,e){for(let t of e.effects)if(t.is(st.setState))return t.value;return e.startState.facet(Bn)!=e.state.facet(Bn)?En.init(e.state):i.apply(e)}});let Jc=i=>{let e=setTimeout(()=>i(),500);return()=>clearTimeout(e)};typeof requestIdleCallback<"u"&&(Jc=i=>{let e=-1,t=setTimeout(()=>{e=requestIdleCallback(i,{timeout:400})},100);return()=>e<0?clearTimeout(t):cancelIdleCallback(e)});const Qs=typeof navigator<"u"&&(!((Js=navigator.scheduling)===null||Js===void 0)&&Js.isInputPending)?()=>navigator.scheduling.isInputPending():null,Op=St.fromClass(class{constructor(e){this.view=e,this.working=null,this.workScheduled=0,this.chunkEnd=-1,this.chunkBudget=-1,this.work=this.work.bind(this),this.scheduleWork()}update(e){let t=this.view.state.field(st.state).context;(t.updateViewport(e.view.viewport)||this.view.viewport.to>t.treeLen)&&this.scheduleWork(),(e.docChanged||e.selectionSet)&&(this.view.hasFocus&&(this.chunkBudget+=50),this.scheduleWork()),this.checkAsyncSchedule(t)}scheduleWork(){if(this.working)return;let{state:e}=this.view,t=e.field(st.state);(t.tree!=t.context.tree||!t.context.isDone(e.doc.length))&&(this.working=Jc(this.work))}work(e){this.working=null;let t=Date.now();if(this.chunkEnd<t&&(this.chunkEnd<0||this.view.hasFocus)&&(this.chunkEnd=t+3e4,this.chunkBudget=3e3),this.chunkBudget<=0)return;let{state:n,viewport:{to:s}}=this.view,r=n.field(st.state);if(r.tree==r.context.tree&&r.context.isDone(s+1e5))return;let o=Date.now()+Math.min(this.chunkBudget,100,e&&!Qs?Math.max(25,e.timeRemaining()-5):1e9),l=r.context.treeLen<s&&n.doc.length>s+1e3,a=r.context.work(()=>Qs&&Qs()||Date.now()>o,s+(l?0:1e5));this.chunkBudget-=Date.now()-t,(a||this.chunkBudget<=0)&&(r.context.takeTree(),this.view.dispatch({effects:st.setState.of(new En(r.context))})),this.chunkBudget>0&&!(a&&!l)&&this.scheduleWork(),this.checkAsyncSchedule(r.context)}checkAsyncSchedule(e){e.scheduleOn&&(this.workScheduled++,e.scheduleOn.then(()=>this.scheduleWork()).catch(t=>vt(this.view.state,t)).then(()=>this.workScheduled--),e.scheduleOn=null)}destroy(){this.working&&this.working()}isWorking(){return!!(this.working||this.workScheduled>0)}},{eventHandlers:{focus(){this.scheduleWork()}}}),Bn=z.define({combine(i){return i.length?i[0]:null},enables:i=>[st.state,Op,q.contentAttributes.compute([i],e=>{let t=e.facet(i);return t&&t.name?{"data-language":t.name}:{}})]}),Lp=z.define(),Mo=z.define({combine:i=>{if(!i.length)return"  ";let e=i[0];if(!e||/\S/.test(e)||Array.from(e).some(t=>t!=e[0]))throw new Error("Invalid indent unit: "+JSON.stringify(i[0]));return e}});function an(i){let e=i.facet(Mo);return e.charCodeAt(0)==9?i.tabSize*e.length:e.length}function as(i,e){let t="",n=i.tabSize,s=i.facet(Mo)[0];if(s=="	"){for(;e>=n;)t+="	",e-=n;s=" "}for(let r=0;r<e;r++)t+=s;return t}function Qc(i,e){i instanceof te&&(i=new ws(i));for(let n of i.state.facet(Lp)){let s=n(i,e);if(s!==void 0)return s}let t=Ct(i.state);return t.length>=e?Rp(i,t,e):null}class ws{constructor(e,t={}){this.state=e,this.options=t,this.unit=an(e)}lineAt(e,t=1){let n=this.state.doc.lineAt(e),{simulateBreak:s,simulateDoubleBreak:r}=this.options;return s!=null&&s>=n.from&&s<=n.to?r&&s==e?{text:"",from:e}:(t<0?s<e:s<=e)?{text:n.text.slice(s-n.from),from:s}:{text:n.text.slice(0,s-n.from),from:n.from}:n}textAfterPos(e,t=1){if(this.options.simulateDoubleBreak&&e==this.options.simulateBreak)return"";let{text:n,from:s}=this.lineAt(e,t);return n.slice(e-s,Math.min(n.length,e+100-s))}column(e,t=1){let{text:n,from:s}=this.lineAt(e,t),r=this.countColumn(n,e-s),o=this.options.overrideIndentation?this.options.overrideIndentation(s):-1;return o>-1&&(r+=o-this.countColumn(n,n.search(/\S|$/))),r}countColumn(e,t=e.length){return ds(e,this.state.tabSize,t)}lineIndent(e,t=1){let{text:n,from:s}=this.lineAt(e,t),r=this.options.overrideIndentation;if(r){let o=r(s);if(o>-1)return o}return this.countColumn(n,n.search(/\S|$/))}get simulatedBreak(){return this.options.simulateBreak||null}}const Zc=new K;function Rp(i,e,t){let n=e.resolveStack(t),s=e.resolveInner(t,-1).resolve(t,0).enterUnfinishedNodesBefore(t);if(s!=n.node){let r=[];for(let o=s;o&&!(o.from<n.node.from||o.to>n.node.to||o.from==n.node.from&&o.type==n.node.type);o=o.parent)r.push(o);for(let o=r.length-1;o>=0;o--)n={node:r[o],next:n}}return eh(n,i,t)}function eh(i,e,t){for(let n=i;n;n=n.next){let s=zp(n.node);if(s)return s(Eo.create(e,t,n))}return 0}function Ip(i){return i.pos==i.options.simulateBreak&&i.options.simulateDoubleBreak}function zp(i){let e=i.type.prop(Zc);if(e)return e;let t=i.firstChild,n;if(t&&(n=t.type.prop(K.closedBy))){let s=i.lastChild,r=s&&n.indexOf(s.name)>-1;return o=>Hp(o,!0,1,void 0,r&&!Ip(o)?s.from:void 0)}return i.parent==null?qp:null}function qp(){return 0}class Eo extends ws{constructor(e,t,n){super(e.state,e.options),this.base=e,this.pos=t,this.context=n}get node(){return this.context.node}static create(e,t,n){return new Eo(e,t,n)}get textAfter(){return this.textAfterPos(this.pos)}get baseIndent(){return this.baseIndentFor(this.node)}baseIndentFor(e){let t=this.state.doc.lineAt(e.from);for(;;){let n=e.resolve(t.from);for(;n.parent&&n.parent.from==n.from;)n=n.parent;if(Np(n,e))break;t=this.state.doc.lineAt(n.from)}return this.lineIndent(t.from)}continue(){return eh(this.context.next,this.base,this.pos)}}function Np(i,e){for(let t=e;t;t=t.parent)if(i==t)return!0;return!1}function Fp(i){let e=i.node,t=e.childAfter(e.from),n=e.lastChild;if(!t)return null;let s=i.options.simulateBreak,r=i.state.doc.lineAt(t.from),o=s==null||s<=r.from?r.to:Math.min(r.to,s);for(let l=t.to;;){let a=e.childAfter(l);if(!a||a==n)return null;if(!a.type.isSkipped){if(a.from>=o)return null;let c=/^ */.exec(r.text.slice(t.to-r.from))[0].length;return{from:t.from,to:t.to+c}}l=a.to}}function Hp(i,e,t,n,s){let r=i.textAfter,o=r.match(/^\s*/)[0].length,l=n&&r.slice(o,o+n.length)==n||s==i.pos+o,a=Fp(i);return a?l?i.column(a.from):i.column(a.to):i.baseIndent+(l?0:i.unit*t)}class vs{constructor(e,t){this.specs=e;let n;function s(l){let a=Ht.newName();return(n||(n=Object.create(null)))["."+a]=l,a}const r=typeof t.all=="string"?t.all:t.all?s(t.all):void 0,o=t.scope;this.scope=o instanceof st?l=>l.prop(bn)==o.data:o?l=>l==o:void 0,this.style=Yc(e.map(l=>({tag:l.tag,class:l.class||s(Object.assign({},l,{tag:null}))})),{all:r}).style,this.module=n?new Ht(n):null,this.themeType=t.themeType}static define(e,t){return new vs(e,t||{})}}const $r=z.define(),Wp=z.define({combine(i){return i.length?[i[0]]:null}});function Zs(i){let e=i.facet($r);return e.length?e:i.facet(Wp)}function th(i,e){let t=[$p],n;return i instanceof vs&&(i.module&&t.push(q.styleModule.of(i.module)),n=i.themeType),n?t.push($r.computeN([q.darkTheme],s=>s.facet(q.darkTheme)==(n=="dark")?[i]:[])):t.push($r.of(i)),t}class Vp{constructor(e){this.markCache=Object.create(null),this.tree=Ct(e.state),this.decorations=this.buildDeco(e,Zs(e.state)),this.decoratedTo=e.viewport.to}update(e){let t=Ct(e.state),n=Zs(e.state),s=n!=Zs(e.startState),{viewport:r}=e.view,o=e.changes.mapPos(this.decoratedTo,1);t.length<r.to&&!s&&t.type==this.tree.type&&o>=r.to?(this.decorations=this.decorations.map(e.changes),this.decoratedTo=o):(t!=this.tree||e.viewportChanged||s)&&(this.tree=t,this.decorations=this.buildDeco(e.view,n),this.decoratedTo=r.to)}buildDeco(e,t){if(!t||!this.tree.length)return we.none;let n=new ii;for(let{from:s,to:r}of e.visibleRanges)Tp(this.tree,t,(o,l,a)=>{n.add(o,l,this.markCache[a]||(this.markCache[a]=we.mark({class:a})))},s,r);return n.finish()}}const $p=hs.high(St.fromClass(Vp,{decorations:i=>i.decorations})),Up=1e4,jp="()[]{}",Kp=new K;function Ur(i,e,t){let n=i.prop(e<0?K.openedBy:K.closedBy);if(n)return n;if(i.name.length==1){let s=t.indexOf(i.name);if(s>-1&&s%2==(e<0?1:0))return[t[s+e]]}return null}function jr(i){let e=i.type.prop(Kp);return e?e(i.node):i}function yn(i,e,t,n={}){let s=n.maxScanDistance||Up,r=n.brackets||jp,o=Ct(i),l=o.resolveInner(e,t);for(let a=l;a;a=a.parent){let c=Ur(a.type,t,r);if(c&&a.from<a.to){let h=jr(a);if(h&&(t>0?e>=h.from&&e<h.to:e>h.from&&e<=h.to))return Xp(i,e,t,a,h,c,r)}}return Gp(i,e,t,o,l.type,s,r)}function Xp(i,e,t,n,s,r,o){let l=n.parent,a={from:s.from,to:s.to},c=0,h=l==null?void 0:l.cursor();if(h&&(t<0?h.childBefore(n.from):h.childAfter(n.to)))do if(t<0?h.to<=n.from:h.from>=n.to){if(c==0&&r.indexOf(h.type.name)>-1&&h.from<h.to){let u=jr(h);return{start:a,end:u?{from:u.from,to:u.to}:void 0,matched:!0}}else if(Ur(h.type,t,o))c++;else if(Ur(h.type,-t,o)){if(c==0){let u=jr(h);return{start:a,end:u&&u.from<u.to?{from:u.from,to:u.to}:void 0,matched:!1}}c--}}while(t<0?h.prevSibling():h.nextSibling());return{start:a,matched:!1}}function Gp(i,e,t,n,s,r,o){let l=t<0?i.sliceDoc(e-1,e):i.sliceDoc(e,e+1),a=o.indexOf(l);if(a<0||a%2==0!=t>0)return null;let c={from:t<0?e-1:e,to:t>0?e+1:e},h=i.doc.iterRange(e,t>0?i.doc.length:0),u=0;for(let d=0;!h.next().done&&d<=r;){let f=h.value;t<0&&(d+=f.length);let p=e+d*t;for(let m=t>0?0:f.length-1,g=t>0?f.length:-1;m!=g;m+=t){let b=o.indexOf(f[m]);if(!(b<0||n.resolveInner(p+m,1).type!=s))if(b%2==0==t>0)u++;else{if(u==1)return{start:c,end:{from:p+m,to:p+m+1},matched:b>>1==a>>1};u--}}t>0&&(d+=f.length)}return h.done?{start:c,matched:!1}:null}function Gl(i,e,t,n=0,s=0){e==null&&(e=i.search(/[^\s\u00a0]/),e==-1&&(e=i.length));let r=s;for(let o=n;o<e;o++)i.charCodeAt(o)==9?r+=t-r%t:r++;return r}class nh{constructor(e,t,n,s){this.string=e,this.tabSize=t,this.indentUnit=n,this.overrideIndent=s,this.pos=0,this.start=0,this.lastColumnPos=0,this.lastColumnValue=0}eol(){return this.pos>=this.string.length}sol(){return this.pos==0}peek(){return this.string.charAt(this.pos)||void 0}next(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)}eat(e){let t=this.string.charAt(this.pos),n;if(typeof e=="string"?n=t==e:n=t&&(e instanceof RegExp?e.test(t):e(t)),n)return++this.pos,t}eatWhile(e){let t=this.pos;for(;this.eat(e););return this.pos>t}eatSpace(){let e=this.pos;for(;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>e}skipToEnd(){this.pos=this.string.length}skipTo(e){let t=this.string.indexOf(e,this.pos);if(t>-1)return this.pos=t,!0}backUp(e){this.pos-=e}column(){return this.lastColumnPos<this.start&&(this.lastColumnValue=Gl(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue}indentation(){var e;return(e=this.overrideIndent)!==null&&e!==void 0?e:Gl(this.string,null,this.tabSize)}match(e,t,n){if(typeof e=="string"){let s=o=>n?o.toLowerCase():o,r=this.string.substr(this.pos,e.length);return s(r)==s(e)?(t!==!1&&(this.pos+=e.length),!0):null}else{let s=this.string.slice(this.pos).match(e);return s&&s.index>0?null:(s&&t!==!1&&(this.pos+=s[0].length),s)}}current(){return this.string.slice(this.start,this.pos)}}function Yp(i){return{name:i.name||"",token:i.token,blankLine:i.blankLine||(()=>{}),startState:i.startState||(()=>!0),copyState:i.copyState||Jp,indent:i.indent||(()=>null),languageData:i.languageData||{},tokenTable:i.tokenTable||Po,mergeTokens:i.mergeTokens!==!1}}function Jp(i){if(typeof i!="object")return i;let e={};for(let t in i){let n=i[t];e[t]=n instanceof Array?n.slice():n}return e}const Yl=new WeakMap;class Bo extends st{constructor(e){let t=Bp(e.languageData),n=Yp(e),s,r=new class extends Xc{createParse(o,l,a){return new Zp(s,o,l,a)}};super(t,r,[],e.name),this.topNode=nm(t,this),s=this,this.streamParser=n,this.stateAfter=new K({perNode:!0}),this.tokenTable=e.tokenTable?new oh(n.tokenTable):tm}static define(e){return new Bo(e)}getIndent(e){let t,{overrideIndentation:n}=e.options;n&&(t=Yl.get(e.state),t!=null&&t<e.pos-1e4&&(t=void 0));let s=Do(this,e.node.tree,e.node.from,e.node.from,t??e.pos),r,o;if(s?(o=s.state,r=s.pos+1):(o=this.streamParser.startState(e.unit),r=e.node.from),e.pos-r>1e4)return null;for(;r<e.pos;){let a=e.state.doc.lineAt(r),c=Math.min(e.pos,a.to);if(a.length){let h=n?n(a.from):-1,u=new nh(a.text,e.state.tabSize,e.unit,h<0?void 0:h);for(;u.pos<c-a.from;)sh(this.streamParser.token,u,o)}else this.streamParser.blankLine(o,e.unit);if(c==e.pos)break;r=a.to+1}let l=e.lineAt(e.pos);return n&&t==null&&Yl.set(e.state,l.from),this.streamParser.indent(o,/^\s*(.*)/.exec(l.text)[1],e)}get allowsNesting(){return!1}}function Do(i,e,t,n,s){let r=t>=n&&t+e.length<=s&&e.prop(i.stateAfter);if(r)return{state:i.streamParser.copyState(r),pos:t+e.length};for(let o=e.children.length-1;o>=0;o--){let l=e.children[o],a=t+e.positions[o],c=l instanceof fe&&a<s&&Do(i,l,a,n,s);if(c)return c}return null}function ih(i,e,t,n,s){if(s&&t<=0&&n>=e.length)return e;!s&&t==0&&e.type==i.topNode&&(s=!0);for(let r=e.children.length-1;r>=0;r--){let o=e.positions[r],l=e.children[r],a;if(o<n&&l instanceof fe){if(!(a=ih(i,l,t-o,n-o,s)))break;return s?new fe(e.type,e.children.slice(0,r).concat(a),e.positions.slice(0,r+1),o+a.length):a}}return null}function Qp(i,e,t,n,s){for(let r of e){let o=r.from+(r.openStart?25:0),l=r.to-(r.openEnd?25:0),a=o<=t&&l>t&&Do(i,r.tree,0-r.offset,t,l),c;if(a&&a.pos<=n&&(c=ih(i,r.tree,t+r.offset,a.pos+r.offset,!1)))return{state:a.state,tree:c}}return{state:i.streamParser.startState(s?an(s):4),tree:fe.empty}}class Zp{constructor(e,t,n,s){this.lang=e,this.input=t,this.fragments=n,this.ranges=s,this.stoppedAt=null,this.chunks=[],this.chunkPos=[],this.chunk=[],this.chunkReused=void 0,this.rangeIndex=0,this.to=s[s.length-1].to;let r=Mn.get(),o=s[0].from,{state:l,tree:a}=Qp(e,n,o,this.to,r==null?void 0:r.state);this.state=l,this.parsedPos=this.chunkStart=o+a.length;for(let c=0;c<a.children.length;c++)this.chunks.push(a.children[c]),this.chunkPos.push(a.positions[c]);r&&this.parsedPos<r.viewport.from-1e5&&s.some(c=>c.from<=r.viewport.from&&c.to>=r.viewport.from)&&(this.state=this.lang.streamParser.startState(an(r.state)),r.skipUntilInView(this.parsedPos,r.viewport.from),this.parsedPos=r.viewport.from),this.moveRangeIndex()}advance(){let e=Mn.get(),t=this.stoppedAt==null?this.to:Math.min(this.to,this.stoppedAt),n=Math.min(t,this.chunkStart+512);for(e&&(n=Math.min(n,e.viewport.to));this.parsedPos<n;)this.parseLine(e);return this.chunkStart<this.parsedPos&&this.finishChunk(),this.parsedPos>=t?this.finish():e&&this.parsedPos>=e.viewport.to?(e.skipUntilInView(this.parsedPos,t),this.finish()):null}stopAt(e){this.stoppedAt=e}lineAfter(e){let t=this.input.chunk(e);if(this.input.lineChunks)t==`
`&&(t="");else{let n=t.indexOf(`
`);n>-1&&(t=t.slice(0,n))}return e+t.length<=this.to?t:t.slice(0,this.to-e)}nextLine(){let e=this.parsedPos,t=this.lineAfter(e),n=e+t.length;for(let s=this.rangeIndex;;){let r=this.ranges[s].to;if(r>=n||(t=t.slice(0,r-(n-t.length)),s++,s==this.ranges.length))break;let o=this.ranges[s].from,l=this.lineAfter(o);t+=l,n=o+l.length}return{line:t,end:n}}skipGapsTo(e,t,n){for(;;){let s=this.ranges[this.rangeIndex].to,r=e+t;if(n>0?s>r:s>=r)break;let o=this.ranges[++this.rangeIndex].from;t+=o-s}return t}moveRangeIndex(){for(;this.ranges[this.rangeIndex].to<this.parsedPos;)this.rangeIndex++}emitToken(e,t,n,s){let r=4;if(this.ranges.length>1){s=this.skipGapsTo(t,s,1),t+=s;let l=this.chunk.length;s=this.skipGapsTo(n,s,-1),n+=s,r+=this.chunk.length-l}let o=this.chunk.length-4;return this.lang.streamParser.mergeTokens&&r==4&&o>=0&&this.chunk[o]==e&&this.chunk[o+2]==t?this.chunk[o+2]=n:this.chunk.push(e,t,n,r),s}parseLine(e){let{line:t,end:n}=this.nextLine(),s=0,{streamParser:r}=this.lang,o=new nh(t,e?e.state.tabSize:4,e?an(e.state):2);if(o.eol())r.blankLine(this.state,o.indentUnit);else for(;!o.eol();){let l=sh(r.token,o,this.state);if(l&&(s=this.emitToken(this.lang.tokenTable.resolve(l),this.parsedPos+o.start,this.parsedPos+o.pos,s)),o.start>1e4)break}this.parsedPos=n,this.moveRangeIndex(),this.parsedPos<this.to&&this.parsedPos++}finishChunk(){let e=fe.build({buffer:this.chunk,start:this.chunkStart,length:this.parsedPos-this.chunkStart,nodeSet:em,topID:0,maxBufferLength:512,reused:this.chunkReused});e=new fe(e.type,e.children,e.positions,e.length,[[this.lang.stateAfter,this.lang.streamParser.copyState(this.state)]]),this.chunks.push(e),this.chunkPos.push(this.chunkStart-this.ranges[0].from),this.chunk=[],this.chunkReused=void 0,this.chunkStart=this.parsedPos}finish(){return new fe(this.lang.topNode,this.chunks,this.chunkPos,this.parsedPos-this.ranges[0].from).balance()}}function sh(i,e,t){e.start=e.pos;for(let n=0;n<10;n++){let s=i(e,t);if(e.pos>e.start)return s}throw new Error("Stream parser failed to advance stream.")}const Po=Object.create(null),ui=[Ne.none],em=new So(ui),Jl=[],Ql=Object.create(null),rh=Object.create(null);for(let[i,e]of[["variable","variableName"],["variable-2","variableName.special"],["string-2","string.special"],["def","variableName.definition"],["tag","tagName"],["attribute","attributeName"],["type","typeName"],["builtin","variableName.standard"],["qualifier","modifier"],["error","invalid"],["header","heading"],["property","propertyName"]])rh[i]=lh(Po,e);class oh{constructor(e){this.extra=e,this.table=Object.assign(Object.create(null),rh)}resolve(e){return e?this.table[e]||(this.table[e]=lh(this.extra,e)):0}}const tm=new oh(Po);function er(i,e){Jl.indexOf(i)>-1||(Jl.push(i),console.warn(e))}function lh(i,e){let t=[];for(let l of e.split(" ")){let a=[];for(let c of l.split(".")){let h=i[c]||H[c];h?typeof h=="function"?a.length?a=a.map(h):er(c,`Modifier ${c} used at start of tag`):a.length?er(c,`Tag ${c} used as modifier`):a=Array.isArray(h)?h:[h]:er(c,`Unknown highlighting tag ${c}`)}for(let c of a)t.push(c)}if(!t.length)return 0;let n=e.replace(/ /g,"_"),s=n+" "+t.map(l=>l.id),r=Ql[s];if(r)return r.id;let o=Ql[s]=Ne.define({id:ui.length,name:n,props:[Cp({[n]:t})]});return ui.push(o),o.id}function nm(i,e){let t=Ne.define({id:ui.length,name:"Document",props:[bn.add(()=>i),Zc.add(()=>n=>e.getIndent(n))],top:!0});return ui.push(t),t}de.RTL,de.LTR;const im=i=>{let{state:e}=i,t=e.doc.lineAt(e.selection.main.from),n=Lo(i.state,t.from);return n.line?sm(i):n.block?om(i):!1};function Oo(i,e){return({state:t,dispatch:n})=>{if(t.readOnly)return!1;let s=i(e,t);return s?(n(t.update(s)),!0):!1}}const sm=Oo(cm,0),rm=Oo(ah,0),om=Oo((i,e)=>ah(i,e,am(e)),0);function Lo(i,e){let t=i.languageDataAt("commentTokens",e,1);return t.length?t[0]:{}}const Fn=50;function lm(i,{open:e,close:t},n,s){let r=i.sliceDoc(n-Fn,n),o=i.sliceDoc(s,s+Fn),l=/\s*$/.exec(r)[0].length,a=/^\s*/.exec(o)[0].length,c=r.length-l;if(r.slice(c-e.length,c)==e&&o.slice(a,a+t.length)==t)return{open:{pos:n-l,margin:l&&1},close:{pos:s+a,margin:a&&1}};let h,u;s-n<=2*Fn?h=u=i.sliceDoc(n,s):(h=i.sliceDoc(n,n+Fn),u=i.sliceDoc(s-Fn,s));let d=/^\s*/.exec(h)[0].length,f=/\s*$/.exec(u)[0].length,p=u.length-f-t.length;return h.slice(d,d+e.length)==e&&u.slice(p,p+t.length)==t?{open:{pos:n+d+e.length,margin:/\s/.test(h.charAt(d+e.length))?1:0},close:{pos:s-f-t.length,margin:/\s/.test(u.charAt(p-1))?1:0}}:null}function am(i){let e=[];for(let t of i.selection.ranges){let n=i.doc.lineAt(t.from),s=t.to<=n.to?n:i.doc.lineAt(t.to);s.from>n.from&&s.from==t.to&&(s=t.to==n.to+1?n:i.doc.lineAt(t.to-1));let r=e.length-1;r>=0&&e[r].to>n.from?e[r].to=s.to:e.push({from:n.from+/^\s*/.exec(n.text)[0].length,to:s.to})}return e}function ah(i,e,t=e.selection.ranges){let n=t.map(r=>Lo(e,r.from).block);if(!n.every(r=>r))return null;let s=t.map((r,o)=>lm(e,n[o],r.from,r.to));if(i!=2&&!s.every(r=>r))return{changes:e.changes(t.map((r,o)=>s[o]?[]:[{from:r.from,insert:n[o].open+" "},{from:r.to,insert:" "+n[o].close}]))};if(i!=1&&s.some(r=>r)){let r=[];for(let o=0,l;o<s.length;o++)if(l=s[o]){let a=n[o],{open:c,close:h}=l;r.push({from:c.pos-a.open.length,to:c.pos+c.margin},{from:h.pos-h.margin,to:h.pos+a.close.length})}return{changes:r}}return null}function cm(i,e,t=e.selection.ranges){let n=[],s=-1;e:for(let{from:r,to:o}of t){let l=n.length,a=1e9,c;for(let h=r;h<=o;){let u=e.doc.lineAt(h);if(c==null&&(c=Lo(e,u.from).line,!c))continue e;if(u.from>s&&(r==o||o>u.from)){s=u.from;let d=/^\s*/.exec(u.text)[0].length,f=d==u.length,p=u.text.slice(d,d+c.length)==c?d:-1;d<u.text.length&&d<a&&(a=d),n.push({line:u,comment:p,token:c,indent:d,empty:f,single:!1})}h=u.to+1}if(a<1e9)for(let h=l;h<n.length;h++)n[h].indent<n[h].line.text.length&&(n[h].indent=a);n.length==l+1&&(n[l].single=!0)}if(i!=2&&n.some(r=>r.comment<0&&(!r.empty||r.single))){let r=[];for(let{line:l,token:a,indent:c,empty:h,single:u}of n)(u||!h)&&r.push({from:l.from+c,insert:a+" "});let o=e.changes(r);return{changes:o,selection:e.selection.map(o,1)}}else if(i!=1&&n.some(r=>r.comment>=0)){let r=[];for(let{line:o,comment:l,token:a}of n)if(l>=0){let c=o.from+l,h=c+a.length;o.text[h-o.from]==" "&&h++,r.push({from:c,to:h})}return{changes:r}}return null}const Kr=Kt.define(),hm=Kt.define(),um=z.define(),ch=z.define({combine(i){return ho(i,{minDepth:100,newGroupDelay:500,joinToEvent:(e,t)=>t},{minDepth:Math.max,newGroupDelay:Math.min,joinToEvent:(e,t)=>(n,s)=>e(n,s)||t(n,s)})}}),hh=jt.define({create(){return xt.empty},update(i,e){let t=e.state.facet(ch),n=e.annotation(Kr);if(n){let a=Ie.fromTransaction(e,n.selection),c=n.side,h=c==0?i.undone:i.done;return a?h=cs(h,h.length,t.minDepth,a):h=fh(h,e.startState.selection),new xt(c==0?n.rest:h,c==0?h:n.rest)}let s=e.annotation(hm);if((s=="full"||s=="before")&&(i=i.isolate()),e.annotation(xe.addToHistory)===!1)return e.changes.empty?i:i.addMapping(e.changes.desc);let r=Ie.fromTransaction(e),o=e.annotation(xe.time),l=e.annotation(xe.userEvent);return r?i=i.addChanges(r,o,l,t,e):e.selection&&(i=i.addSelection(e.startState.selection,o,l,t.newGroupDelay)),(s=="full"||s=="after")&&(i=i.isolate()),i},toJSON(i){return{done:i.done.map(e=>e.toJSON()),undone:i.undone.map(e=>e.toJSON())}},fromJSON(i){return new xt(i.done.map(Ie.fromJSON),i.undone.map(Ie.fromJSON))}});function dm(i={}){return[hh,ch.of(i),q.domEventHandlers({beforeinput(e,t){let n=e.inputType=="historyUndo"?uh:e.inputType=="historyRedo"?Xr:null;return n?(e.preventDefault(),n(t)):!1}})]}function xs(i,e){return function({state:t,dispatch:n}){if(!e&&t.readOnly)return!1;let s=t.field(hh,!1);if(!s)return!1;let r=s.pop(i,t,e);return r?(n(r),!0):!1}}const uh=xs(0,!1),Xr=xs(1,!1),fm=xs(0,!0),pm=xs(1,!0);class Ie{constructor(e,t,n,s,r){this.changes=e,this.effects=t,this.mapped=n,this.startSelection=s,this.selectionsAfter=r}setSelAfter(e){return new Ie(this.changes,this.effects,this.mapped,this.startSelection,e)}toJSON(){var e,t,n;return{changes:(e=this.changes)===null||e===void 0?void 0:e.toJSON(),mapped:(t=this.mapped)===null||t===void 0?void 0:t.toJSON(),startSelection:(n=this.startSelection)===null||n===void 0?void 0:n.toJSON(),selectionsAfter:this.selectionsAfter.map(s=>s.toJSON())}}static fromJSON(e){return new Ie(e.changes&&ve.fromJSON(e.changes),[],e.mapped&&kt.fromJSON(e.mapped),e.startSelection&&_.fromJSON(e.startSelection),e.selectionsAfter.map(_.fromJSON))}static fromTransaction(e,t){let n=Ye;for(let s of e.startState.facet(um)){let r=s(e);r.length&&(n=n.concat(r))}return!n.length&&e.changes.empty?null:new Ie(e.changes.invert(e.startState.doc),n,void 0,t||e.startState.selection,Ye)}static selection(e){return new Ie(void 0,Ye,void 0,void 0,e)}}function cs(i,e,t,n){let s=e+1>t+20?e-t-1:0,r=i.slice(s,e);return r.push(n),r}function mm(i,e){let t=[],n=!1;return i.iterChangedRanges((s,r)=>t.push(s,r)),e.iterChangedRanges((s,r,o,l)=>{for(let a=0;a<t.length;){let c=t[a++],h=t[a++];l>=c&&o<=h&&(n=!0)}}),n}function gm(i,e){return i.ranges.length==e.ranges.length&&i.ranges.filter((t,n)=>t.empty!=e.ranges[n].empty).length===0}function dh(i,e){return i.length?e.length?i.concat(e):i:e}const Ye=[],bm=200;function fh(i,e){if(i.length){let t=i[i.length-1],n=t.selectionsAfter.slice(Math.max(0,t.selectionsAfter.length-bm));return n.length&&n[n.length-1].eq(e)?i:(n.push(e),cs(i,i.length-1,1e9,t.setSelAfter(n)))}else return[Ie.selection([e])]}function ym(i){let e=i[i.length-1],t=i.slice();return t[i.length-1]=e.setSelAfter(e.selectionsAfter.slice(0,e.selectionsAfter.length-1)),t}function tr(i,e){if(!i.length)return i;let t=i.length,n=Ye;for(;t;){let s=wm(i[t-1],e,n);if(s.changes&&!s.changes.empty||s.effects.length){let r=i.slice(0,t);return r[t-1]=s,r}else e=s.mapped,t--,n=s.selectionsAfter}return n.length?[Ie.selection(n)]:Ye}function wm(i,e,t){let n=dh(i.selectionsAfter.length?i.selectionsAfter.map(l=>l.map(e)):Ye,t);if(!i.changes)return Ie.selection(n);let s=i.changes.map(e),r=e.mapDesc(i.changes,!0),o=i.mapped?i.mapped.composeDesc(r):r;return new Ie(s,ye.mapEffects(i.effects,e),o,i.startSelection.map(r),n)}const vm=/^(input\.type|delete)($|\.)/;class xt{constructor(e,t,n=0,s=void 0){this.done=e,this.undone=t,this.prevTime=n,this.prevUserEvent=s}isolate(){return this.prevTime?new xt(this.done,this.undone):this}addChanges(e,t,n,s,r){let o=this.done,l=o[o.length-1];return l&&l.changes&&!l.changes.empty&&e.changes&&(!n||vm.test(n))&&(!l.selectionsAfter.length&&t-this.prevTime<s.newGroupDelay&&s.joinToEvent(r,mm(l.changes,e.changes))||n=="input.type.compose")?o=cs(o,o.length-1,s.minDepth,new Ie(e.changes.compose(l.changes),dh(ye.mapEffects(e.effects,l.changes),l.effects),l.mapped,l.startSelection,Ye)):o=cs(o,o.length,s.minDepth,e),new xt(o,Ye,t,n)}addSelection(e,t,n,s){let r=this.done.length?this.done[this.done.length-1].selectionsAfter:Ye;return r.length>0&&t-this.prevTime<s&&n==this.prevUserEvent&&n&&/^select($|\.)/.test(n)&&gm(r[r.length-1],e)?this:new xt(fh(this.done,e),this.undone,t,n)}addMapping(e){return new xt(tr(this.done,e),tr(this.undone,e),this.prevTime,this.prevUserEvent)}pop(e,t,n){let s=e==0?this.done:this.undone;if(s.length==0)return null;let r=s[s.length-1],o=r.selectionsAfter[0]||(r.startSelection?r.startSelection.map(r.changes.invertedDesc,1):t.selection);if(n&&r.selectionsAfter.length)return t.update({selection:r.selectionsAfter[r.selectionsAfter.length-1],annotations:Kr.of({side:e,rest:ym(s),selection:o}),userEvent:e==0?"select.undo":"select.redo",scrollIntoView:!0});if(r.changes){let l=s.length==1?Ye:s.slice(0,s.length-1);return r.mapped&&(l=tr(l,r.mapped)),t.update({changes:r.changes,selection:r.startSelection,effects:r.effects,annotations:Kr.of({side:e,rest:l,selection:o}),filter:!1,userEvent:e==0?"undo":"redo",scrollIntoView:!0})}else return null}}xt.empty=new xt(Ye,Ye);const xm=[{key:"Mod-z",run:uh,preventDefault:!0},{key:"Mod-y",mac:"Mod-Shift-z",run:Xr,preventDefault:!0},{linux:"Ctrl-Shift-z",run:Xr,preventDefault:!0},{key:"Mod-u",run:fm,preventDefault:!0},{key:"Alt-u",mac:"Mod-Shift-u",run:pm,preventDefault:!0}];function Ln(i,e){return _.create(i.ranges.map(e),i.mainIndex)}function ot(i,e){return i.update({selection:e,scrollIntoView:!0,userEvent:"select"})}function lt({state:i,dispatch:e},t){let n=Ln(i.selection,t);return n.eq(i.selection,!0)?!1:(e(ot(i,n)),!0)}function ks(i,e){return _.cursor(e?i.to:i.from)}function ph(i,e){return lt(i,t=>t.empty?i.moveByChar(t,e):ks(t,e))}function Ee(i){return i.textDirectionAt(i.state.selection.main.head)==de.LTR}const mh=i=>ph(i,!Ee(i)),gh=i=>ph(i,Ee(i));function bh(i,e){return lt(i,t=>t.empty?i.moveByGroup(t,e):ks(t,e))}const km=i=>bh(i,!Ee(i)),_m=i=>bh(i,Ee(i));function Sm(i,e,t){if(e.type.prop(t))return!0;let n=e.to-e.from;return n&&(n>2||/[^\s,.;:]/.test(i.sliceDoc(e.from,e.to)))||e.firstChild}function _s(i,e,t){let n=Ct(i).resolveInner(e.head),s=t?K.closedBy:K.openedBy;for(let a=e.head;;){let c=t?n.childAfter(a):n.childBefore(a);if(!c)break;Sm(i,c,s)?n=c:a=t?c.to:c.from}let r=n.type.prop(s),o,l;return r&&(o=t?yn(i,n.from,1):yn(i,n.to,-1))&&o.matched?l=t?o.end.to:o.end.from:l=t?n.to:n.from,_.cursor(l,t?-1:1)}const Cm=i=>lt(i,e=>_s(i.state,e,!Ee(i))),Am=i=>lt(i,e=>_s(i.state,e,Ee(i)));function yh(i,e){return lt(i,t=>{if(!t.empty)return ks(t,e);let n=i.moveVertically(t,e);return n.head!=t.head?n:i.moveToLineBoundary(t,e)})}const wh=i=>yh(i,!1),vh=i=>yh(i,!0);function xh(i){let e=i.scrollDOM.clientHeight<i.scrollDOM.scrollHeight-2,t=0,n=0,s;if(e){for(let r of i.state.facet(q.scrollMargins)){let o=r(i);o!=null&&o.top&&(t=Math.max(o==null?void 0:o.top,t)),o!=null&&o.bottom&&(n=Math.max(o==null?void 0:o.bottom,n))}s=i.scrollDOM.clientHeight-t-n}else s=(i.dom.ownerDocument.defaultView||window).innerHeight;return{marginTop:t,marginBottom:n,selfScroll:e,height:Math.max(i.defaultLineHeight,s-5)}}function kh(i,e){let t=xh(i),{state:n}=i,s=Ln(n.selection,o=>o.empty?i.moveVertically(o,e,t.height):ks(o,e));if(s.eq(n.selection))return!1;let r;if(t.selfScroll){let o=i.coordsAtPos(n.selection.main.head),l=i.scrollDOM.getBoundingClientRect(),a=l.top+t.marginTop,c=l.bottom-t.marginBottom;o&&o.top>a&&o.bottom<c&&(r=q.scrollIntoView(s.main.head,{y:"start",yMargin:o.top-a}))}return i.dispatch(ot(n,s),{effects:r}),!0}const Zl=i=>kh(i,!1),Gr=i=>kh(i,!0);function Xt(i,e,t){let n=i.lineBlockAt(e.head),s=i.moveToLineBoundary(e,t);if(s.head==e.head&&s.head!=(t?n.to:n.from)&&(s=i.moveToLineBoundary(e,t,!1)),!t&&s.head==n.from&&n.length){let r=/^\s*/.exec(i.state.sliceDoc(n.from,Math.min(n.from+100,n.to)))[0].length;r&&e.head!=n.from+r&&(s=_.cursor(n.from+r))}return s}const Tm=i=>lt(i,e=>Xt(i,e,!0)),Mm=i=>lt(i,e=>Xt(i,e,!1)),Em=i=>lt(i,e=>Xt(i,e,!Ee(i))),Bm=i=>lt(i,e=>Xt(i,e,Ee(i))),Dm=i=>lt(i,e=>_.cursor(i.lineBlockAt(e.head).from,1)),Pm=i=>lt(i,e=>_.cursor(i.lineBlockAt(e.head).to,-1));function Om(i,e,t){let n=!1,s=Ln(i.selection,r=>{let o=yn(i,r.head,-1)||yn(i,r.head,1)||r.head>0&&yn(i,r.head-1,1)||r.head<i.doc.length&&yn(i,r.head+1,-1);if(!o||!o.end)return r;n=!0;let l=o.start.from==r.head?o.end.to:o.end.from;return _.cursor(l)});return n?(e(ot(i,s)),!0):!1}const Lm=({state:i,dispatch:e})=>Om(i,e);function Qe(i,e){let t=Ln(i.state.selection,n=>{let s=e(n);return _.range(n.anchor,s.head,s.goalColumn,s.bidiLevel||void 0,s.assoc)});return t.eq(i.state.selection)?!1:(i.dispatch(ot(i.state,t)),!0)}function _h(i,e){return Qe(i,t=>i.moveByChar(t,e))}const Sh=i=>_h(i,!Ee(i)),Ch=i=>_h(i,Ee(i));function Ah(i,e){return Qe(i,t=>i.moveByGroup(t,e))}const Rm=i=>Ah(i,!Ee(i)),Im=i=>Ah(i,Ee(i)),zm=i=>Qe(i,e=>_s(i.state,e,!Ee(i))),qm=i=>Qe(i,e=>_s(i.state,e,Ee(i)));function Th(i,e){return Qe(i,t=>i.moveVertically(t,e))}const Mh=i=>Th(i,!1),Eh=i=>Th(i,!0);function Bh(i,e){return Qe(i,t=>i.moveVertically(t,e,xh(i).height))}const ea=i=>Bh(i,!1),ta=i=>Bh(i,!0),Nm=i=>Qe(i,e=>Xt(i,e,!0)),Fm=i=>Qe(i,e=>Xt(i,e,!1)),Hm=i=>Qe(i,e=>Xt(i,e,!Ee(i))),Wm=i=>Qe(i,e=>Xt(i,e,Ee(i))),Vm=i=>Qe(i,e=>_.cursor(i.lineBlockAt(e.head).from)),$m=i=>Qe(i,e=>_.cursor(i.lineBlockAt(e.head).to)),na=({state:i,dispatch:e})=>(e(ot(i,{anchor:0})),!0),ia=({state:i,dispatch:e})=>(e(ot(i,{anchor:i.doc.length})),!0),sa=({state:i,dispatch:e})=>(e(ot(i,{anchor:i.selection.main.anchor,head:0})),!0),ra=({state:i,dispatch:e})=>(e(ot(i,{anchor:i.selection.main.anchor,head:i.doc.length})),!0),Um=({state:i,dispatch:e})=>(e(i.update({selection:{anchor:0,head:i.doc.length},userEvent:"select"})),!0),jm=({state:i,dispatch:e})=>{let t=Ss(i).map(({from:n,to:s})=>_.range(n,Math.min(s+1,i.doc.length)));return e(i.update({selection:_.create(t),userEvent:"select"})),!0},Km=({state:i,dispatch:e})=>{let t=Ln(i.selection,n=>{let s=Ct(i),r=s.resolveStack(n.from,1);if(n.empty){let o=s.resolveStack(n.from,-1);o.node.from>=r.node.from&&o.node.to<=r.node.to&&(r=o)}for(let o=r;o;o=o.next){let{node:l}=o;if((l.from<n.from&&l.to>=n.to||l.to>n.to&&l.from<=n.from)&&o.next)return _.range(l.to,l.from)}return n});return t.eq(i.selection)?!1:(e(ot(i,t)),!0)};function Dh(i,e){let{state:t}=i,n=t.selection,s=t.selection.ranges.slice();for(let r of t.selection.ranges){let o=t.doc.lineAt(r.head);if(e?o.to<i.state.doc.length:o.from>0)for(let l=r;;){let a=i.moveVertically(l,e);if(a.head<o.from||a.head>o.to){s.some(c=>c.head==a.head)||s.push(a);break}else{if(a.head==l.head)break;l=a}}}return s.length==n.ranges.length?!1:(i.dispatch(ot(t,_.create(s,s.length-1))),!0)}const Xm=i=>Dh(i,!1),Gm=i=>Dh(i,!0),Ym=({state:i,dispatch:e})=>{let t=i.selection,n=null;return t.ranges.length>1?n=_.create([t.main]):t.main.empty||(n=_.create([_.cursor(t.main.head)])),n?(e(ot(i,n)),!0):!1};function yi(i,e){if(i.state.readOnly)return!1;let t="delete.selection",{state:n}=i,s=n.changeByRange(r=>{let{from:o,to:l}=r;if(o==l){let a=e(r);a<o?(t="delete.backward",a=Ri(i,a,!1)):a>o&&(t="delete.forward",a=Ri(i,a,!0)),o=Math.min(o,a),l=Math.max(l,a)}else o=Ri(i,o,!1),l=Ri(i,l,!0);return o==l?{range:r}:{changes:{from:o,to:l},range:_.cursor(o,o<r.head?-1:1)}});return s.changes.empty?!1:(i.dispatch(n.update(s,{scrollIntoView:!0,userEvent:t,effects:t=="delete.selection"?q.announce.of(n.phrase("Selection deleted")):void 0})),!0)}function Ri(i,e,t){if(i instanceof q)for(let n of i.state.facet(q.atomicRanges).map(s=>s(i)))n.between(e,e,(s,r)=>{s<e&&r>e&&(e=t?r:s)});return e}const Ph=(i,e,t)=>yi(i,n=>{let s=n.from,{state:r}=i,o=r.doc.lineAt(s),l,a;if(t&&!e&&s>o.from&&s<o.from+200&&!/[^ \t]/.test(l=o.text.slice(0,s-o.from))){if(l[l.length-1]=="	")return s-1;let c=ds(l,r.tabSize),h=c%an(r)||an(r);for(let u=0;u<h&&l[l.length-1-u]==" ";u++)s--;a=s}else a=Me(o.text,s-o.from,e,e)+o.from,a==s&&o.number!=(e?r.doc.lines:1)?a+=e?1:-1:!e&&/[\ufe00-\ufe0f]/.test(o.text.slice(a-o.from,s-o.from))&&(a=Me(o.text,a-o.from,!1,!1)+o.from);return a}),Yr=i=>Ph(i,!1,!0),Oh=i=>Ph(i,!0,!1),Lh=(i,e)=>yi(i,t=>{let n=t.head,{state:s}=i,r=s.doc.lineAt(n),o=s.charCategorizer(n);for(let l=null;;){if(n==(e?r.to:r.from)){n==t.head&&r.number!=(e?s.doc.lines:1)&&(n+=e?1:-1);break}let a=Me(r.text,n-r.from,e)+r.from,c=r.text.slice(Math.min(n,a)-r.from,Math.max(n,a)-r.from),h=o(c);if(l!=null&&h!=l)break;(c!=" "||n!=t.head)&&(l=h),n=a}return n}),Rh=i=>Lh(i,!1),Jm=i=>Lh(i,!0),Qm=i=>yi(i,e=>{let t=i.lineBlockAt(e.head).to;return e.head<t?t:Math.min(i.state.doc.length,e.head+1)}),Zm=i=>yi(i,e=>{let t=i.moveToLineBoundary(e,!1).head;return e.head>t?t:Math.max(0,e.head-1)}),eg=i=>yi(i,e=>{let t=i.moveToLineBoundary(e,!0).head;return e.head<t?t:Math.min(i.state.doc.length,e.head+1)}),tg=({state:i,dispatch:e})=>{if(i.readOnly)return!1;let t=i.changeByRange(n=>({changes:{from:n.from,to:n.to,insert:Z.of(["",""])},range:_.cursor(n.from)}));return e(i.update(t,{scrollIntoView:!0,userEvent:"input"})),!0},ng=({state:i,dispatch:e})=>{if(i.readOnly)return!1;let t=i.changeByRange(n=>{if(!n.empty||n.from==0||n.from==i.doc.length)return{range:n};let s=n.from,r=i.doc.lineAt(s),o=s==r.from?s-1:Me(r.text,s-r.from,!1)+r.from,l=s==r.to?s+1:Me(r.text,s-r.from,!0)+r.from;return{changes:{from:o,to:l,insert:i.doc.slice(s,l).append(i.doc.slice(o,s))},range:_.cursor(l)}});return t.changes.empty?!1:(e(i.update(t,{scrollIntoView:!0,userEvent:"move.character"})),!0)};function Ss(i){let e=[],t=-1;for(let n of i.selection.ranges){let s=i.doc.lineAt(n.from),r=i.doc.lineAt(n.to);if(!n.empty&&n.to==r.from&&(r=i.doc.lineAt(n.to-1)),t>=s.number){let o=e[e.length-1];o.to=r.to,o.ranges.push(n)}else e.push({from:s.from,to:r.to,ranges:[n]});t=r.number+1}return e}function Ih(i,e,t){if(i.readOnly)return!1;let n=[],s=[];for(let r of Ss(i)){if(t?r.to==i.doc.length:r.from==0)continue;let o=i.doc.lineAt(t?r.to+1:r.from-1),l=o.length+1;if(t){n.push({from:r.to,to:o.to},{from:r.from,insert:o.text+i.lineBreak});for(let a of r.ranges)s.push(_.range(Math.min(i.doc.length,a.anchor+l),Math.min(i.doc.length,a.head+l)))}else{n.push({from:o.from,to:r.from},{from:r.to,insert:i.lineBreak+o.text});for(let a of r.ranges)s.push(_.range(a.anchor-l,a.head-l))}}return n.length?(e(i.update({changes:n,scrollIntoView:!0,selection:_.create(s,i.selection.mainIndex),userEvent:"move.line"})),!0):!1}const ig=({state:i,dispatch:e})=>Ih(i,e,!1),sg=({state:i,dispatch:e})=>Ih(i,e,!0);function zh(i,e,t){if(i.readOnly)return!1;let n=[];for(let r of Ss(i))t?n.push({from:r.from,insert:i.doc.slice(r.from,r.to)+i.lineBreak}):n.push({from:r.to,insert:i.lineBreak+i.doc.slice(r.from,r.to)});let s=i.changes(n);return e(i.update({changes:s,selection:i.selection.map(s,t?1:-1),scrollIntoView:!0,userEvent:"input.copyline"})),!0}const rg=({state:i,dispatch:e})=>zh(i,e,!1),og=({state:i,dispatch:e})=>zh(i,e,!0),lg=i=>{if(i.state.readOnly)return!1;let{state:e}=i,t=e.changes(Ss(e).map(({from:s,to:r})=>(s>0?s--:r<e.doc.length&&r++,{from:s,to:r}))),n=Ln(e.selection,s=>{let r;if(i.lineWrapping){let o=i.lineBlockAt(s.head),l=i.coordsAtPos(s.head,s.assoc||1);l&&(r=o.bottom+i.documentTop-l.bottom+i.defaultLineHeight/2)}return i.moveVertically(s,!0,r)}).map(t);return i.dispatch({changes:t,selection:n,scrollIntoView:!0,userEvent:"delete.line"}),!0};function ag(i,e){if(/\(\)|\[\]|\{\}/.test(i.sliceDoc(e-1,e+1)))return{from:e,to:e};let t=Ct(i).resolveInner(e),n=t.childBefore(e),s=t.childAfter(e),r;return n&&s&&n.to<=e&&s.from>=e&&(r=n.type.prop(K.closedBy))&&r.indexOf(s.name)>-1&&i.doc.lineAt(n.to).from==i.doc.lineAt(s.from).from&&!/\S/.test(i.sliceDoc(n.to,s.from))?{from:n.to,to:s.from}:null}const oa=qh(!1),cg=qh(!0);function qh(i){return({state:e,dispatch:t})=>{if(e.readOnly)return!1;let n=e.changeByRange(s=>{let{from:r,to:o}=s,l=e.doc.lineAt(r),a=!i&&r==o&&ag(e,r);i&&(r=o=(o<=l.to?l:e.doc.lineAt(o)).to);let c=new ws(e,{simulateBreak:r,simulateDoubleBreak:!!a}),h=Qc(c,r);for(h==null&&(h=ds(/^\s*/.exec(e.doc.lineAt(r).text)[0],e.tabSize));o<l.to&&/\s/.test(l.text[o-l.from]);)o++;a?{from:r,to:o}=a:r>l.from&&r<l.from+100&&!/\S/.test(l.text.slice(0,r))&&(r=l.from);let u=["",as(e,h)];return a&&u.push(as(e,c.lineIndent(l.from,-1))),{changes:{from:r,to:o,insert:Z.of(u)},range:_.cursor(r+1+u[1].length)}});return t(e.update(n,{scrollIntoView:!0,userEvent:"input"})),!0}}function Ro(i,e){let t=-1;return i.changeByRange(n=>{let s=[];for(let o=n.from;o<=n.to;){let l=i.doc.lineAt(o);l.number>t&&(n.empty||n.to>l.from)&&(e(l,s,n),t=l.number),o=l.to+1}let r=i.changes(s);return{changes:s,range:_.range(r.mapPos(n.anchor,1),r.mapPos(n.head,1))}})}const hg=({state:i,dispatch:e})=>{if(i.readOnly)return!1;let t=Object.create(null),n=new ws(i,{overrideIndentation:r=>{let o=t[r];return o??-1}}),s=Ro(i,(r,o,l)=>{let a=Qc(n,r.from);if(a==null)return;/\S/.test(r.text)||(a=0);let c=/^\s*/.exec(r.text)[0],h=as(i,a);(c!=h||l.from<r.from+c.length)&&(t[r.from]=a,o.push({from:r.from,to:r.from+c.length,insert:h}))});return s.changes.empty||e(i.update(s,{userEvent:"indent"})),!0},Nh=({state:i,dispatch:e})=>i.readOnly?!1:(e(i.update(Ro(i,(t,n)=>{n.push({from:t.from,insert:i.facet(Mo)})}),{userEvent:"input.indent"})),!0),Fh=({state:i,dispatch:e})=>i.readOnly?!1:(e(i.update(Ro(i,(t,n)=>{let s=/^\s*/.exec(t.text)[0];if(!s)return;let r=ds(s,i.tabSize),o=0,l=as(i,Math.max(0,r-an(i)));for(;o<s.length&&o<l.length&&s.charCodeAt(o)==l.charCodeAt(o);)o++;n.push({from:t.from+o,to:t.from+s.length,insert:l.slice(o)})}),{userEvent:"delete.dedent"})),!0),ug=i=>(i.setTabFocusMode(),!0),dg=[{key:"Ctrl-b",run:mh,shift:Sh,preventDefault:!0},{key:"Ctrl-f",run:gh,shift:Ch},{key:"Ctrl-p",run:wh,shift:Mh},{key:"Ctrl-n",run:vh,shift:Eh},{key:"Ctrl-a",run:Dm,shift:Vm},{key:"Ctrl-e",run:Pm,shift:$m},{key:"Ctrl-d",run:Oh},{key:"Ctrl-h",run:Yr},{key:"Ctrl-k",run:Qm},{key:"Ctrl-Alt-h",run:Rh},{key:"Ctrl-o",run:tg},{key:"Ctrl-t",run:ng},{key:"Ctrl-v",run:Gr}],fg=[{key:"ArrowLeft",run:mh,shift:Sh,preventDefault:!0},{key:"Mod-ArrowLeft",mac:"Alt-ArrowLeft",run:km,shift:Rm,preventDefault:!0},{mac:"Cmd-ArrowLeft",run:Em,shift:Hm,preventDefault:!0},{key:"ArrowRight",run:gh,shift:Ch,preventDefault:!0},{key:"Mod-ArrowRight",mac:"Alt-ArrowRight",run:_m,shift:Im,preventDefault:!0},{mac:"Cmd-ArrowRight",run:Bm,shift:Wm,preventDefault:!0},{key:"ArrowUp",run:wh,shift:Mh,preventDefault:!0},{mac:"Cmd-ArrowUp",run:na,shift:sa},{mac:"Ctrl-ArrowUp",run:Zl,shift:ea},{key:"ArrowDown",run:vh,shift:Eh,preventDefault:!0},{mac:"Cmd-ArrowDown",run:ia,shift:ra},{mac:"Ctrl-ArrowDown",run:Gr,shift:ta},{key:"PageUp",run:Zl,shift:ea},{key:"PageDown",run:Gr,shift:ta},{key:"Home",run:Mm,shift:Fm,preventDefault:!0},{key:"Mod-Home",run:na,shift:sa},{key:"End",run:Tm,shift:Nm,preventDefault:!0},{key:"Mod-End",run:ia,shift:ra},{key:"Enter",run:oa,shift:oa},{key:"Mod-a",run:Um},{key:"Backspace",run:Yr,shift:Yr,preventDefault:!0},{key:"Delete",run:Oh,preventDefault:!0},{key:"Mod-Backspace",mac:"Alt-Backspace",run:Rh,preventDefault:!0},{key:"Mod-Delete",mac:"Alt-Delete",run:Jm,preventDefault:!0},{mac:"Mod-Backspace",run:Zm,preventDefault:!0},{mac:"Mod-Delete",run:eg,preventDefault:!0}].concat(dg.map(i=>({mac:i.key,run:i.run,shift:i.shift}))),pg=[{key:"Alt-ArrowLeft",mac:"Ctrl-ArrowLeft",run:Cm,shift:zm},{key:"Alt-ArrowRight",mac:"Ctrl-ArrowRight",run:Am,shift:qm},{key:"Alt-ArrowUp",run:ig},{key:"Shift-Alt-ArrowUp",run:rg},{key:"Alt-ArrowDown",run:sg},{key:"Shift-Alt-ArrowDown",run:og},{key:"Mod-Alt-ArrowUp",run:Xm},{key:"Mod-Alt-ArrowDown",run:Gm},{key:"Escape",run:Ym},{key:"Mod-Enter",run:cg},{key:"Alt-l",mac:"Ctrl-l",run:jm},{key:"Mod-i",run:Km,preventDefault:!0},{key:"Mod-[",run:Fh},{key:"Mod-]",run:Nh},{key:"Mod-Alt-\\",run:hg},{key:"Shift-Mod-k",run:lg},{key:"Shift-Mod-\\",run:Lm},{key:"Mod-/",run:im},{key:"Alt-A",run:rm},{key:"Ctrl-m",mac:"Shift-Alt-m",run:ug}].concat(fg),mg={key:"Tab",run:Nh,shift:Fh},Hh="ffm-run-feedback-enabled",ze={enabled:!0};function gg(){try{const i=localStorage.getItem(Hh);i==="0"?ze.enabled=!1:i==="1"&&(ze.enabled=!0)}catch{}}function bg(){try{localStorage.setItem(Hh,ze.enabled?"1":"0")}catch{}}function yg(){return ze.enabled=!ze.enabled,bg(),ze.enabled}function la(i){const e=ze.enabled;i.setAttribute("aria-pressed",e?"true":"false"),i.setAttribute("aria-label",e?"Run sound and animations on":"Run sound and animations off"),i.classList.toggle("run-feedback-toggle--off",!e),i.title=e?"Turn off run sound and animations":"Turn on run sound and animations"}let aa=null;function wg(){return aa??(aa=new AudioContext),aa}const ca=[329.6275569128699,391.99543598174927,493.8833013781249],vg=10,xg=420,kg=3;let Ki=null,Xi=null,Jr=!1;function Qr(){Ki!==null&&(clearInterval(Ki),Ki=null),Xi=null}function Io(i){if(Qr(),!ze.enabled||(Jr=!0,window.matchMedia("(prefers-reduced-motion: reduce)").matches))return;Xi=i;const e=()=>{if(!ze.enabled){Qr();return}Xi&&Ag(Xi,kg)};e(),Ki=setInterval(e,xg)}function zo(){const i=Jr;Jr=!1,Qr(),i&&Wh()}function Wh(){if(ze.enabled)try{const i=wg();i.resume().then(()=>{const e=i.currentTime,t=.42,n=.09;for(let s=0;s<ca.length;s++){const r=ca[s],o=i.createOscillator(),l=i.createGain();o.type="triangle",o.frequency.setValueAtTime(r,e),l.gain.setValueAtTime(0,e),l.gain.linearRampToValueAtTime(n,e+.018+s*.012),l.gain.exponentialRampToValueAtTime(8e-4,e+t),o.connect(l),l.connect(i.destination),o.start(e),o.stop(e+t+.06)}})}catch{}}function Vh(i){return!(i.isComposing||i.metaKey||i.ctrlKey||i.altKey||i.key==="Tab"||i.key==="Escape"||i.key==="ArrowUp"||i.key==="ArrowDown"||i.repeat)}function _g(i,e){if(!ze.enabled||i.disabled||!Vh(e))return;const{x:t,y:n}=Cg(i);qo(t,n,{centerOnPoint:!0}),e.key==="Enter"&&Wh()}function Sg(i,e){if(!ze.enabled||!Vh(e))return;const t=i.state.selection.main.head,n=i.coordsAtPos(t);if(!n)return;const s=n.left,r=(n.top+n.bottom)/2;qo(s,r,{centerOnPoint:!0})}function Cg(i){const e=i.getBoundingClientRect(),t=window.getComputedStyle(i),n=parseFloat(t.borderLeftWidth)||0,s=parseFloat(t.paddingLeft)||0,r=i.selectionStart??0,o=document.createElement("span");o.setAttribute("aria-hidden","true"),o.style.visibility="hidden",o.style.position="absolute",o.style.whiteSpace="pre",o.style.top="0",o.style.left="0",o.style.font=t.font,o.style.fontSize=t.fontSize,o.style.fontFamily=t.fontFamily,o.style.fontWeight=t.fontWeight,o.style.letterSpacing=t.letterSpacing,o.style.fontVariant=t.fontVariant,o.style.textTransform=t.textTransform,o.textContent=i.value.slice(0,r),document.body.appendChild(o);const l=o.offsetWidth;o.remove();const a=e.left+n+s+l-i.scrollLeft,c=e.top+e.height/2;return{x:a,y:c}}function qo(i,e,t){if(!ze.enabled||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const n=document.createElement("span");n.className="run-flat-anchor",n.style.left=`${i}px`,n.style.top=`${e}px`,t!=null&&t.centerOnPoint&&(n.style.transform="translate(-50%, -50%)");const s=document.createElement("span");s.className="run-flat-particle",s.setAttribute("aria-hidden","true"),s.textContent="♭",t!=null&&t.animationDelay&&(s.style.animationDelay=t.animationDelay);const r=(Math.random()-.5)*2.25,o=-6+Math.random()*12,l=o+8+Math.random()*10;s.style.setProperty("--drift-x",`${r}rem`),s.style.setProperty("--rot-0",`${o}deg`),s.style.setProperty("--rot-1",`${l}deg`),n.appendChild(s),document.body.appendChild(n),s.addEventListener("animationend",()=>{n.remove()},{once:!0})}function Ag(i,e=vg){if(!ze.enabled||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const t=i.getBoundingClientRect();if(!(t.width<=0||t.height<=0))for(let n=0;n<e;n++){const s=t.left+Math.random()*t.width,r=t.top+t.height*(.35+Math.random()*.35);qo(s,r,{animationDelay:`${n*.045}s`})}}const Tg=new Set(["dup","drop","swap","choose","branch","ifte","eval","nop","putc","getc","putn","clock","clr","rand","exit","depth","q<","q>"]),$h=vs.define([{tag:H.comment,color:"#8a6f5f",fontStyle:"italic"},{tag:H.string,color:"#1d6e57"},{tag:H.number,color:"#b14f21"},{tag:H.keyword,color:"#7d2a10",fontWeight:"700"},{tag:H.definition(H.variableName),color:"#0d4f87",fontWeight:"700"},{tag:[H.operator,H.bracket],color:"#2a2d34"}]),Uh=q.theme({"&":{height:"100%",backgroundColor:"transparent"},"&.cm-focused":{outline:"none"},".cm-scroller":{overflow:"auto"},".cm-content":{padding:"1rem"},".cm-gutters":{backgroundColor:"transparent",color:"#7a6153",border:"none"},".cm-lineNumbers .cm-gutterElement":{padding:"0 0.55rem 0 0"},".cm-line":{padding:"0"},".cm-cursor, .cm-dropCursor":{borderLeftColor:"#201611"},".cm-selectionBackground, .cm-content ::selection":{backgroundColor:"rgba(187, 77, 29, 0.22)"}}),Mg=q.theme({".cm-content":{minHeight:"520px"}});q.theme({"&":{border:"1px solid rgba(32, 22, 17, 0.15)",borderRadius:"14px",backgroundColor:"var(--panel-strong)"},"&.cm-focused":{outline:"none"},".cm-scroller":{overflowX:"auto",overflowY:"hidden",fontFamily:'"Iosevka", "Cascadia Code", "SFMono-Regular", monospace',fontSize:"0.95rem",lineHeight:"1.55"},".cm-content":{minHeight:"44px",padding:"0.7rem 0.9rem",whiteSpace:"pre"},".cm-line":{padding:"0"},".cm-cursor, .cm-dropCursor":{borderLeftColor:"#201611"},".cm-selectionBackground, .cm-content ::selection":{backgroundColor:"rgba(187, 77, 29, 0.22)"}});const Eg=q.theme({".cm-content":{minHeight:"160px",padding:"1rem 1.2rem 1.2rem",whiteSpace:"pre"},".cm-scroller":{fontFamily:'"Iosevka", "Cascadia Code", "SFMono-Regular", monospace',fontSize:"0.92rem",lineHeight:"1.55"}}),Bg={startState(){return{inBlockComment:!1,inString:!1,inStringEscape:!1}},copyState(i){return{inBlockComment:i.inBlockComment,inString:i.inString,inStringEscape:i.inStringEscape}},token(i,e){if(e.inBlockComment){for(;!i.eol();){if(i.match("*/")){e.inBlockComment=!1;break}i.next()}return"comment"}if(e.inString){for(;!i.eol();){const n=i.next();if(e.inStringEscape){e.inStringEscape=!1;continue}if(n==="\\"){e.inStringEscape=!0;continue}if(n==="'"){e.inString=!1;break}}return"string"}if(i.eatSpace())return null;if(i.match("/*"))return e.inBlockComment=!0,"comment";if(i.peek()==="'")return i.next(),e.inString=!0,e.inStringEscape=!1,"string";if(i.match(/^q[<>](?![a-zA-Z0-9_])/i)||i.match(/^\.[a-zA-Z_][a-zA-Z0-9_]*/))return"keyword";if(i.match(/^(?:0x[0-9a-fA-F_]+|0b[01_]+|0o[0-7_]+|[0-9][0-9_]*)(?![a-zA-Z0-9_])/))return"number";if(i.match(/^[a-zA-Z_][a-zA-Z0-9_]*:(?![a-zA-Z0-9_])/))return"def";if(i.match(/^[\[\]]/))return"bracket";if(i.match(/^(?:<<|>>|[+\-*/%=<>|&~?:;()])/))return"operator";const t=i.match(/^[a-zA-Z_][a-zA-Z0-9_]*/);return t?Tg.has(t[0].toLowerCase())?"keyword":null:(i.next(),null)}},jh=Bo.define(Bg),Dg=[dm(),Fc.of([mg,...pg,...xm]),Jf(),jh,th($h)],Kh=q.domEventHandlers({keydown(i,e){Sg(e,i)}});function Xh(i,e,t){const n=t==null?void 0:t.onDocumentChange,s=new q({state:te.create({doc:e,extensions:[...Dg,dp(),tp(),q.lineWrapping,Uh,Mg,...n?[q.updateListener.of(r=>{r.docChanged&&n()})]:[],...(t==null?void 0:t.extraExtensions)??[]]}),parent:i});return{getValue(){return s.state.doc.toString()},setValue(r){s.state.doc.toString()!==r&&s.dispatch({changes:{from:0,to:s.state.doc.length,insert:r}})},focus(){s.focus()}}}function ha(i,e){const t=new q({state:te.create({doc:e,extensions:[jh,th($h),te.readOnly.of(!0),q.editable.of(!1),Uh,Eg]}),parent:i});return{getValue(){return t.state.doc.toString()},setValue(n){t.state.doc.toString()!==n&&t.dispatch({changes:{from:0,to:t.state.doc.length,insert:n}})},focus(){t.focus()}}}const Pg=`.import ../lib/prelude.ffp

/* Project Euler #1: sum multiples of 3 or 5 below 1000. */
/* http://projecteuler.net/index.php?section=problems&id=1 */

mod?: [ 3 divisor? ] [ 5 divisor? ] bi or ;

999 count [ mod? ] filter! sum! .

/* 233168 */
`,Og=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=10 */

/* Walk primes with next-prime (prelude) until past 2_000_000. Slow but exact. */

_e10: dup 2_000_000 <= [
    dup rot + swap next-prime _e10
  ] ? ;

0 2 _e10 drop . /* 142913828922 */
`,Lg=`.import ../lib/prelude.ffp

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


/* 5537376230 */`,Rg=`.import ../lib/prelude.ffp

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
drop drop . /* 837799 */`,Ig=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=16 */

digits: dup [ 10 [ % ] [ / ] bi2 digits ] ? ;

2 1000 ^ digits sum! . /* 1366 */`,zg=`!: dup 1 > [ dup 1 - ! * ] ? trim ;

trim: dup 10 % 0 = [ 10 / trim ] ? ;
five: 100_000 % ;

9 ! five . clr  /* 36288 */
10 ! five . clr  /* 36288 */
20 ! five . clr  /* 17664 */

1_000 ! trim five . clr /* 53472 */

/* Omitted: 1_000_000_000_000 ! … (expected [ 16576 ]) — factorial(10^12) is not practical here. */`,qg=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=2 */

fib: dup2 + ;
fib-up: dup 4000000 < [ fib fib-up ] ? ;

1 2 fib-up drop
[ even? ] filter! sum! .

/* 4613732 */
`,Ng=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=20 */

digits: dup [ 10 [ % ] [ / ] bi2 digits ] ? ;

100 ! digits sum! . /* 648 */
`,Fg=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=25 */

next: swap dupd + ;

c: q< q< ++ q> q> ;

n:
.m 10 1000 ^
;

r: c dup n < [ next r ] ? ;

0 1 1 r drop drop ++ . /* 4782 */`,Hg=`.import ../lib/prelude.ffp

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

600851475143 factors last! . /* 6857 */`,Wg=`.import ../lib/prelude.ffp

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
`,Vg=`.import ../lib/prelude.ffp

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
`,$g=`.import ../lib/prelude.ffp

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

/* 9110846700 */`,Ug=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=5 */

/* gcd and lcm come from prelude (math library). */

1 20 range [ lcm ] reduce! .

/* 232792560 */
`,jg=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=5 */

sum-of-squares: [ sqr + ] 0 foldl! ;
square-of-sum: sum! sqr ;

100 count square-of-sum
( 100 count sum-of-squares ) - .

/* 25164150 */`,Kg=`.import ../lib/prelude.ffp

/* Project Euler #7: find the 10001st prime. */
/* http://projecteuler.net/index.php?section=problems&id=7 */

10001 th-prime . /* 104743 */
`,Xg=`.import ../lib/prelude.ffp

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
`,Gg=`.import ../lib/prelude.ffp

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
`,Yg=`/* constants 1 2 3 */
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
`,Jg=`.import ./num.ffp

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
`,Qg=`.import ./pred.ffp

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
`,Zg=`.import ./arith.ffp
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
`,e0=`.import ./arith.ffp
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
`,t0=`.import ./arith.ffp

/*
 * Naming note: the \`i\` prefix means integer.
 * \`icbrt\` returns the integer cube root (truncated toward zero).
 */

__closer: dup2 2 ^ / over 2 * + 3 / ;
__loop: __closer dup2 > [ nip __loop ] ? ;
__cbrtn: dup 3 / __loop drop nip ;

icbrt: dup sgn swap over * dup 1 > [ __cbrtn ] ? * ;
`,n0=`
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
`,i0=`.import ../core/core.ff

__t: tuck % dup [ __t ] ? ;

gcd: dup [ __t ] ? drop ;
lcm: dup2 gcd / * ;
`,s0=`.import ../core/core.ff

__n: 20 ; /* number of digits to use for fixed-point calculations */
__s: 100000000000000000000 ; /* 10^n */
__ln2: 69314718055994530941 ; /* floor(ln(2)*10^n) */

ilb: dup 1 > [ 1 >> ilb ++ ] [ drop 0 ] branch ; /* n ilb == floor(log2(n)) */
ilog: dup 10 >= [ 10 / ilog ++ ] [ drop 0 ] branch ; /* n ilog == floor(log10(n)) */
iln: ilb __ln2 * __s / ; /* n iln == floor(ln(n)) */`,r0=`.import ./pred.ffp
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
`,o0=`.import ../core/core.ff

/* Logarithm and combinatorics */

!: dup [ dup -- ! * ] [ drop 1 ] branch ; /* n ! == n! */
nck: dup2 - ! swap ! * [ ! ] dip / ; /* n k nck == C(n,k) */

/* Knuth operators */

^^: -- dup [ [ dup ] swap times [ ^ ] ] dip times ;
^^^: -- dup [ [ dup ] swap times [ ^^ ] ] dip times ;
`,l0=`.import ./atan-core.ffp

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
; /* n half_pi == floor(10ⁿ*π/2) */`,a0=`.import ../core/core.ff
.import ./arith.ffp

/* Internal precision helpers shared by variable-precision math words. */
n->S: 10 swap ^ ; /* n n->S == 10^n */
n->S2: 2 * n->S ; /* n n->S2 == 10^(2n) */
n->K: 6 * 4 + 5 / 10 + ; /* n n->K == ceil(6*n/5)+10 */
p/q*S: n->S swap rot * swap / ; /* p q n p/q*S == floor(p*10^n/q) */

ntrunc: n->S / ; /* x n ntrunc == floor(x/10^n) */
nfrac: [ abs ] dip n->S % ; /* x n nfrac == (x - floor(x/10^n))*10^n */`,c0=`.import ../core/core.ff

/* Predicates */

negitive?: 0 < ; /* n negitive? == flag */
positive?: 0 > ; /* n positive? == flag */
divisor?: % zero? ; .inline /* n d divisor? == flag */
even?: 2 divisor? ; .inline /* n even? == flag */
odd?: even? not ; .inline /* n odd? == flag */
`,h0=`.import ./pred.ffp

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
`,u0=`.import ../core/core.ff
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
`,d0=`.import ../core/core.ff
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
`,f0=`/* Trigonometric words live here. Pi-derived constants are defined in pi.ffp. */
`,p0=`.import ./core/core.ff
.import ./math/math.ffp
.import ./string/string.ffp
.import ./seq/seq.ffp
.import ./time/time.ffp`,m0=`.import ../core/core.ff

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
`,g0=`.import ../core/core.ff

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
`,b0=`/* String output */

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
`,y0=`.import char.ffp
.import str.ffp`,w0=`.import ./core/core.ff
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
`,v0=`.import ./core/core.ff
.import ./string/string.ffp

assert: falsey? [ 0 10 'Failed' println .inline 1 exit ] ? ;
assert_eq: = assert .inline ;
assert_false: not assert .inline ;

OK: 0 '\\sOK' println clr ;

¶: clr 999 ;`,x0=`.import ./utc.ffp
`,k0=`.import ../core/core.ff
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
`,Gh=`.import ./lib/prelude.ffp

/* factorial */

fact: dup [ dup -- fact * ] [ drop 1 ] branch ;

100 fact .

/* 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000 */`,_0=`.import ./lib/math/cbrt.ffp

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
`,S0=`.import ./lib/math/sqrt.ffp

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
`,C0=`.import ./lib/math/gcd.ffp

/* Greatest common divisor and least common multiple demo. */

109876463 177777648  gcd . clr /* 1234567 */

109876463 177777648  lcm . clr /* 15822210672 */
`,A0=`.import ./lib/math/ack.ffp
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
`,T0=`.import ./lib/math/atan.ffp

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
`,M0=new Set(["../../ff/euler/euler4.ffp","../../ff/euler/euler10.ffp","../../ff/euler/euler14.ffp","../../ff/euler/euler46.ffp"]);function E0(i){const e="../../ff/lib/";if(!i.startsWith(e))throw new Error(`Unexpected library source path: ${i}`);return`/lib/${i.slice(e.length)}`}const B0=Object.assign({"../../ff/euler/euler1.ffp":Pg,"../../ff/euler/euler10.ffp":Og,"../../ff/euler/euler13.ffp":Lg,"../../ff/euler/euler14.ffp":Rg,"../../ff/euler/euler16.ffp":Ig,"../../ff/euler/euler160.ffp":zg,"../../ff/euler/euler2.ffp":qg,"../../ff/euler/euler20.ffp":Ng,"../../ff/euler/euler25.ffp":Fg,"../../ff/euler/euler3.ffp":Hg,"../../ff/euler/euler4.ffp":Wg,"../../ff/euler/euler46.ffp":Vg,"../../ff/euler/euler48.ffp":$g,"../../ff/euler/euler5.ffp":Ug,"../../ff/euler/euler6.ffp":jg,"../../ff/euler/euler7.ffp":Kg,"../../ff/euler/euler8.ffp":Xg,"../../ff/euler/euler9.ffp":Gg});function ua(i){const e=i.split("/").pop()??i,t=/^euler(\d+)\.ffp$/.exec(e);return t?[Number(t[1]),e]:[Number.POSITIVE_INFINITY,e]}const D0=Object.entries(B0).filter(([i])=>!M0.has(i)).sort((i,e)=>{const t=ua(i[0]),n=ua(e[0]);return t[0]!==n[0]?t[0]-n[0]:t[1].localeCompare(n[1])}).map(([i,e])=>({path:P0(i),label:O0(i),source:e}));function P0(i){const e=i.lastIndexOf("/");return`/examples/${e>=0?i.slice(e+1):i}`}function O0(i){const e=i.indexOf("../../ff/");return e>=0?i.slice(e+9):i}const Yh=[{path:"/examples/fact.ffp",label:"fact.ffp",source:Gh},{path:"/examples/cbrt.ffp",label:"cbrt.ffp",source:_0},{path:"/examples/sqrt.ffp",label:"sqrt.ffp",source:S0},{path:"/examples/gcd.ffp",label:"gcd.ffp",source:C0},{path:"/examples/ack.ffp",label:"ack.ffp",source:A0},{path:"/examples/pi.ffp",label:"pi.ffp",source:T0},...D0],L0=Object.assign({"../../ff/lib/core/core.ff":Yg,"../../ff/lib/math/ack.ffp":Jg,"../../ff/lib/math/arith.ffp":Qg,"../../ff/lib/math/atan-core.ffp":Zg,"../../ff/lib/math/atan.ffp":e0,"../../ff/lib/math/cbrt.ffp":t0,"../../ff/lib/math/exp.ffp":n0,"../../ff/lib/math/gcd.ffp":i0,"../../ff/lib/math/log.ffp":s0,"../../ff/lib/math/math.ffp":r0,"../../ff/lib/math/num.ffp":o0,"../../ff/lib/math/pi.ffp":l0,"../../ff/lib/math/precision.ffp":a0,"../../ff/lib/math/pred.ffp":c0,"../../ff/lib/math/primes.ffp":h0,"../../ff/lib/math/prn.ffp":u0,"../../ff/lib/math/sqrt.ffp":d0,"../../ff/lib/math/trig.ffp":f0,"../../ff/lib/prelude.ffp":p0,"../../ff/lib/seq/seq.ffp":m0,"../../ff/lib/string/char.ffp":g0,"../../ff/lib/string/str.ffp":b0,"../../ff/lib/string/string.ffp":y0,"../../ff/lib/tap.ffp":w0,"../../ff/lib/testing.ffp":v0,"../../ff/lib/time/time.ffp":x0,"../../ff/lib/time/utc.ffp":k0}),R0=Object.fromEntries(Object.entries(L0).map(([i,e])=>[E0(i),e])),Gi=Object.fromEntries(Yh.map(({path:i,source:e})=>[i,e])),Xn="__custom__",I0="/examples/fact.ffp",z0=[...Yh.map(({path:i,label:e})=>`<option value="${i}">${e}</option>`),`<option value="${Xn}">Custom</option>`].join(`
`),da=Gh;function Jh(i,e="/main.ffp"){return{[e]:i,...R0,...Gi}}const q0=["playground","repl","codetta","tutorial","help"],N0=new Set(q0);function nr(i){var t;const e=((t=i==null?void 0:i.replace(/^#/,"").split("?")[0])==null?void 0:t.trim().toLowerCase())??"";return e&&N0.has(e)?e:"playground"}function Zr(i){const e=new URLSearchParams(i.search.replace(/^\?/,"")),t=i.hash,n=t.indexOf("?");if(n!==-1){const r=new URLSearchParams(t.slice(n+1));for(const[o,l]of r)e.set(o,l)}const s=e.toString();return s?`?${s}`:""}const Ii="example";function F0(i){const e=new URLSearchParams(i.search);i.tab==="playground"?i.codeParam?(e.set("code",i.codeParam),e.delete(Ii)):i.exampleParam?(e.delete("code"),e.set(Ii,i.exampleParam)):(e.delete("code"),e.delete(Ii)):(e.delete("code"),e.delete(Ii));const t=e.toString();return`${i.pathname}#${i.tab}${t?`?${t}`:""}`}function fa(){return{output:"",preprocessed:"",ir:"",bytecode:"",compiledBytes:0,issues:[],stack:[],logs:[],exitCode:0,compileMs:0,executeMs:0,terminal:"cancelled",vmCyclesExecuted:0}}function H0(i){return{output:"",preprocessed:"",ir:"",bytecode:"",compiledBytes:0,issues:[],stack:[],logs:[i],exitCode:1,compileMs:0,executeMs:0,terminal:"error",vmCyclesExecuted:0}}class W0{constructor(){ht(this,"worker",null);ht(this,"nextRunId",1);ht(this,"pending",null);ht(this,"activeRunId",null)}ensureWorker(){this.worker||(this.worker=new Worker(new URL("/f-flat-minor/assets/ff-playground-worker-Ej_e126y.js",import.meta.url),{type:"module"}),this.worker.onmessage=e=>{this.handleMessage(e.data)})}handleMessage(e){var t,n,s,r,o,l,a,c;if(e.type==="COMPILED"){((t=this.pending)==null?void 0:t.runId)===e.runId&&(this.pending.compileMs=e.compileMs,(s=(n=this.pending).onProgress)==null||s.call(n,{vmCyclesExecuted:0,compileMs:e.compileMs,executeElapsedMs:0,preprocessed:e.preprocessed,ir:e.ir,bytecode:e.bytecode,compiledBytes:e.compiledBytes}));return}if(e.type==="PROGRESS"){if(((r=this.pending)==null?void 0:r.runId)===e.runId){const h=this.pending.compileMs;(l=(o=this.pending).onProgress)==null||l.call(o,{vmCyclesExecuted:e.vmCyclesExecuted,compileMs:h,executeElapsedMs:e.executeElapsedMs})}return}if(e.type==="ERROR"){if(((a=this.pending)==null?void 0:a.runId)!==e.runId)return;const h=this.pending;this.pending=null,this.activeRunId=null,h.resolve(H0(e.message));return}if(e.type==="RESULT"){if(((c=this.pending)==null?void 0:c.runId)!==e.runId)return;const h=this.pending;this.pending=null,this.activeRunId=null,h.resolve(e.result)}}runProgram(e){this.ensureWorker();const t=this.nextRunId++;this.activeRunId=t;let n;const s=()=>{this.cancelSoft(t),n=window.setTimeout(()=>{var o,l;if(((o=this.pending)==null?void 0:o.runId)===t&&(this.cancelHard(),((l=this.pending)==null?void 0:l.runId)===t)){const a=this.pending;this.pending=null,this.activeRunId=null,a.resolve(fa())}},750)},r=e.signal;if(r){if(r.aborted)return Promise.resolve(fa());r.addEventListener("abort",s,{once:!0})}return new Promise(o=>{this.pending={runId:t,resolve:o,onProgress:e.onProgress},this.worker.postMessage({type:"RUN",runId:t,source:e.source,stdin:e.stdin,optimize:e.optimize,filename:e.filename,yieldIntervalMs:e.yieldIntervalMs,yieldSliceMax:e.yieldSliceMax})}).finally(()=>{r&&r.removeEventListener("abort",s),window.clearTimeout(n)})}cancelSoft(e){var n;const t=e??this.activeRunId;t!==null&&((n=this.worker)==null||n.postMessage({type:"CANCEL",runId:t}))}cancelHard(){this.worker&&(this.worker.terminate(),this.worker=null)}}function V0(){var e,t,n,s,r;return!!(((n=(t=(e=globalThis.Deno)==null?void 0:e.stdout)==null?void 0:t.isTerminal)==null?void 0:n.call(t))??((r=(s=globalThis.process)==null?void 0:s.stdout)==null?void 0:r.isTTY)??!1)}function No(i,e){return V0()?`\x1B[${i}m${e}\x1B[0m`:e}function $0(i){return No(34,i)}function U0(i){return No(32,i)}function Pt(i){return No(36,i)}const y={NOP:0,CALL:1,PUTC:2,GETC:3,PUTN:5,CLOCK:6,DROP:8,PUSHR:14,PULLR:15,SHIFTL:16,SHIFTR:17,CLR:24,RAND:26,EXIT:27,DUP:33,DEPTH:35,SWAP:36,MOD:37,AND:38,STASH:40,FETCH:41,MUL:42,ADD:43,CONS:44,SUB:45,PRN:46,DIV:47,MARK:58,DEF:59,LT:60,EQ:61,GT:62,IF:63,BRA:91,KET:93,POW:94,OR:124,NOT:126},Dn={nop:y.NOP,eval:y.CALL,";":y.DEF,":":y.MARK,clr:y.CLR,rand:y.RAND,exit:y.EXIT,".":y.PRN,putc:y.PUTC,getc:y.GETC,putn:y.PUTN,clock:y.CLOCK,drop:y.DROP,swap:y.SWAP,dup:y.DUP,"<<":y.SHIFTL,">>":y.SHIFTR,"+":y.ADD,"-":y.SUB,cons:y.CONS,"*":y.MUL,"/":y.DIV,"<":y.LT,"=":y.EQ,">":y.GT,"?":y.IF,"%":y.MOD,"&":y.AND,"(":y.STASH,")":y.FETCH,"q<":y.PUSHR,"q>":y.PULLR,depth:y.DEPTH,"^":y.POW,"[":y.BRA,"]":y.KET,"|":y.OR,"~":y.NOT},pn=255,j0=i=>i,K0=i=>i,W={call:"call",push:"push"},X0=6,eo=10,G0=new Map([[BigInt(y.MARK),":"],[BigInt(y.DEF),";"],[BigInt(y.BRA),"["],[BigInt(y.KET),"]"]]);function Y0(i){return(""+i.value).padEnd(eo," ")}function J0(i,e){var t;return e?e.padEnd(eo," "):i.op===W.push&&((t=i.meta)!=null&&t.pointer)?`[${i.value}]`.padEnd(eo," "):Y0(i)}function Q0(i){return i.trim()?`/* ${i} */`:""}function Z0(i){var l,a,c;const e=((l=t1(i))==null?void 0:l.toUpperCase())||"",t=i.op===W.call?G0.get(i.value):void 0,n=t!==void 0,s=J0(i,t),r=((c=(a=i.meta)==null?void 0:a.comment)==null?void 0:c.trim())||(i.op===W.call&&!n?e:""),o=(i.op===W.call&&!t?"EVAL":"").padEnd(X0," ");return[K0(s),j0(o),Q0(r)].join(" ")}function e1(i){for(const e in Dn)if(Dn[e]===i)return e;return""}function t1(i){var e,t;if(i.op===W.call||i.op===W.push&&((e=i.meta)!=null&&e.pointer))return((t=i.meta)==null?void 0:t.name)||e1(Number(i.value))||""}function Qh(i){return i.map(Z0).join(`
`)}function n1(i){const e=[];let t=0;for(;t<i.length;){const n=i[t++]??0n,s=i[t++]??0n;n===0n?e.push({op:W.push,value:s}):e.push({op:W.call,value:s})}return e}function i1(i){return i=i.replace(/\\U([A-Fa-f0-9]{8})/g,(e,t)=>pa(t)),i=i.replace(/\\u([A-Fa-f0-9]{4})/g,(e,t)=>pa(t)),i.replace(/\\0/g,"\0").replace(/\\b/g,"\b").replace(/\\t/g,"	").replace(/\\n/g,`
`).replace(/\\v/g,"\v").replace(/\\f/g,"\f").replace(/\\r/g,"\r").replace(/\\'/g,"'").replace(/\\"/g,'"').replace(/\\s/g," ").replace(/\\\\/g,"\\")}function pa(i){let e="",t=parseInt(i,16);return t<=65535?e+=String.fromCharCode(t):t<=1114111?(t-=65536,e+=String.fromCharCode(55296|t>>10)+String.fromCharCode(56320|t&1023)):e+=`hex2Char error: Code point out of range: ${s1(t)}`,e}function s1(i){return(i+0).toString(16).toUpperCase()}const Zh="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",eu=new Map;Zh.split("").forEach(function(i,e){eu.set(i,e)});const r1=5n,tu=1n<<r1,nu=Number(tu),iu=tu-1n;function o1(i){return i.map(h1).map(u1).join("")}function l1(i){return f1(d1(i)).map(p1)}function a1(i){return i>=0n?i<<1n:(-i<<1n)+1n}function c1(i){return i&1n?-(i>>1n):i>>1n}function h1(i){if(i===0n)return[0];i=a1(i);const e=[];for(;i>0;){let t=Number(i&iu);i>>=5n,i>0&&(t|=nu),e.push(t)}return e}function u1(i){return i.map(e=>Zh[e]).join("")}function d1(i){return i.split("").map(e=>{const t=eu.get(e);if(t===void 0)throw new Error(`${i} is not a valid base64 encoded VLQ`);return t})}function f1(i){const e=[];let t=[];if(i.forEach(n=>{t.push(n),(n&nu)===0&&(e.push(t),t=[])}),t.length>0)throw new Error("Malformed VLQ sequence: The last VLQ never ended.");return e}function p1(i){const e=i.reverse().reduce((t,n)=>(t<<=5n,t|=BigInt(n)&iu,t),0n);return c1(e)}const m1="/*",g1="*/";function ir(i){if(!(i==="-"||i==="+"))try{let e=1n;return i=i.replaceAll("_",""),i.startsWith("-0")&&(e=-1n,i=i.replace("-","")),i.includes("e")||i.includes("E")?e*BigInt(+i):e*BigInt(i)}catch{return}}class Ue{constructor(e={}){this.symbols=new Map,this._nextCode=-1,this.host=e;let t;for(t in Dn)this.symbols.set(t,BigInt(Dn[t]))}static tokenize(e){return e.split(/\s+/).filter(Boolean).map(t=>{const n=ir(t);return n!==void 0?n:t})}static tokenizeWithSpans(e){const t=[],n=/\S+/g;let s=0,r=0,o=0;const l=c=>{for(;o<c;){const h=e[o];h==="\r"?(e[o+1]===`
`&&o++,s++,r=0):h===`
`?(s++,r=0):r++,o++}};let a;for(;(a=n.exec(e))!==null;){const c=a.index;l(c);const h=a[0]??"",u=ir(h);t.push({raw:h,value:u!==void 0?u:h,line:s,character:r,length:h.length,offset:c}),l(c+h.length)}return t}static compileToBase64(e){const t=e.flatMap(n=>{if(n.op===W.call&&n.value===0n)return[];const s=n.value<<1n;return[n.op===W.push?s:s|1n]});return o1(t)}nextCode(){return BigInt(this._nextCode--)}getSymbol(e){e=e.toLowerCase();let t=this.symbols.get(e);return t===void 0&&(t=this.nextCode(),this.symbols.set(e,t)),t}compileToIR(e,t=""){var h,u,d;let n=0;const s=e.length;let r="";const o=[];let l;for(;n<s;)if(l=e[n++],r=this.unwrapTokenValue(l),typeof r=="bigint")a(r);else if(r.length>1&&r.startsWith(".")){const[f]=r.split(" ");switch(f){case".push":o[o.length-1].op=W.push;break;case".call":o[o.length-1].op=W.call;break;case".inline":(h=o[o.length-1]).meta||(h.meta={}),o[o.length-1].meta.inline=!0;break;case".unsafe":(u=o[o.length-1]).meta||(u.meta={}),o[o.length-1].meta.unsafe=!0;break;case".pointer":(d=o[o.length-1]).meta||(d.meta={}),o[o.length-1].meta.pointer=!0;break;case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Compiler: .exit requires a host exit handler");case".symbols":this.symbols.forEach((p,m)=>{(this.host.log||console.log)(m,p)});break;case".words":{const p=Array.from(this.symbols,([m])=>m).join(" ");(this.host.log||console.log)(p);break}}}else if(r[0]==="'"&&r.length>1)i1(r).replace(/^'/,"").replace(/'$/,"").split("").forEach(f=>{a(f.charCodeAt(0),{comment:f})});else if(r.endsWith(":")&&r.length>1){const f=r.replace(/:$/,"");a(this.getSymbol(f),{name:`${f}`,pointer:!0}),c(y.MARK,{name:":"})}else if(r===m1){const f=l,p=[];for(;n<e.length&&(l=e[n++],r=this.unwrapTokenValue(l),r!==g1);)p.push(r);c(0n,{comment:p.join(" ")},f)}else if(r.startsWith("[")&&r.endsWith("]")){const f=r.replace(/^\[/,"").replace(/\]$/,""),p=ir(f);p!==void 0?a(p,{name:f,pointer:!0}):a(this.getSymbol(f),{name:f,pointer:!0})}else c(this.getSymbol(r),{name:r});return o;function a(f,p={},m=l){o.push({value:BigInt(f),op:W.push,meta:{...p,...Ue.toInstructionMeta(m,t)}})}function c(f,p={},m=l){o.push({value:BigInt(f),op:W.call,meta:{...p,...Ue.toInstructionMeta(m,t)}})}}unwrapTokenValue(e){return typeof e=="string"||typeof e=="bigint"?e:e.value}static toInstructionMeta(e,t){return!e||typeof e=="string"||typeof e=="bigint"?{filename:t}:{filename:t,line:e.line,character:e.character,length:e.length,offset:e.offset}}validate(e){var r,o;const t=e.slice(),n=[];let s=0;for(;s<t.length;){const l=t[s];if(l.op===W.call&&l.value===BigInt(y.DEF)){let a=0;for(a=s;a>0&&!(t[a].op===W.call&&t[a].value===BigInt(y.MARK));a--);const c=t.splice(a-1,s-a+2);(o=(r=c.at(-1))==null?void 0:r.meta)!=null&&o.unsafe||n.push(...this.validateDef(c)),s=a-1}s++}return n.push(...this.validateDef(t,"main")),n}validateDef(e,t){var h,u,d;const n=[];let s=0,r=0,o=0,l=0;const a=[0];if(!e[0])return[];t=U0(t||((u=(h=e[0].meta)==null?void 0:h.name)==null?void 0:u.replace(/^&/,""))||"main");const c=$0(((d=e[0].meta)==null?void 0:d.filename)||"-");for(;s<e.length;){const f=e[s];if(f.op===W.call){if(f.op===W.call&&f.value===BigInt(y.MARK)&&r++,f.op===W.call&&f.value===BigInt(y.DEF)&&r--,f.op===W.call&&f.value===BigInt(y.BRA)&&(o++,a.push(0)),f.op===W.call&&f.value===BigInt(y.KET)&&(o--,(a.length>1?a.pop():0)!==0&&n.push(`${c}: Unbalanced queue push ( ${Pt("q< q>")} ) in quote in ${t}`)),f.op===W.call&&(f.value===BigInt(y.PUSHR)||f.value===BigInt(y.STASH))&&(l++,a[a.length-1]++),f.op===W.call&&(f.value===BigInt(y.PULLR)||f.value===BigInt(y.FETCH))){if(a[a.length-1]===0){const m=f.value===BigInt(y.FETCH)?")":"q>";n.push(`${c}: Queue borrow ( ${Pt(m)} ) requires ${Pt(".unsafe")} in ${t} (including quotes)`)}l--,a[a.length-1]--}o<0&&n.push(`${c}: Bracket ( ${Pt("[ ]")} ) mismatch in ${t}`),r<0&&n.push(`${c}: Definition ( ${Pt(": ;")} ) mismatch in ${t}`)}s++}return o!==0&&n.push(`${c}: Unbalanced brackets ( ${Pt("[ ]")} ) in ${t}`),l!==0&&n.push(`${c}: Unbalanced queue push ( ${Pt("q< q> ( )")} ) in ${t}`),r!==0&&n.push(`${c}: Unbalanced definition ( ${Pt(": ;")} ) in ${t}`),n}}const su="FbAbbCb",b1=[{mnemonic:"NOP",syntax:"nop",stackEffect:"… nop == …",description:"No operation; does nothing.",opcode:0},{mnemonic:"EVAL",syntax:"eval",stackEffect:"[A] eval == a*",description:"Evaluates a quotation, executing its contents.",opcode:1},{mnemonic:"PUTC",syntax:"putc",stackEffect:"n putc == {prints char(n)}",description:"Prints a character given by its numeric code.",opcode:2},{mnemonic:"GETC",syntax:"getc",stackEffect:"getc == n {reads char}",description:"Reads a single character from input and pushes its code.",opcode:3},{mnemonic:"PUTN",syntax:"putn",stackEffect:"n putn == {prints n}",description:"Prints a number to output.",opcode:5},{mnemonic:"CLOCK",syntax:"clock",stackEffect:"clock == n {reads clock}",description:"Returns the current time as a Unix timestamp.",opcode:6},{mnemonic:"DROP",syntax:"drop",stackEffect:"a drop ==",description:"Removes the top value from the stack.",opcode:8},{mnemonic:"PUSHR",syntax:"q<",stackEffect:"a q< == | …a",description:"Pushes a value onto the return stack.",opcode:14},{mnemonic:"PULLR",syntax:"q>",stackEffect:"q> == a | a…",description:"Pops a value from the return stack onto the main stack.",opcode:15},{mnemonic:"SHIFTL",syntax:"<<",stackEffect:"a b << == n",description:"Left-shifts a by b bits.",opcode:16},{mnemonic:"SHIFTR",syntax:">>",stackEffect:"a b >> == n",description:"Right-shifts a by b bits.",opcode:17},{mnemonic:"CLR",syntax:"clr",stackEffect:"… clr ==",description:"Clears the entire stack.",opcode:24},{mnemonic:"RAND",syntax:"rand",stackEffect:"n rand == r {0 <= r < n}",description:"Generates a random number between 0 and n-1.",opcode:26},{mnemonic:"EXIT",syntax:"exit",stackEffect:"n exit == {exits with code n}",description:"Exits the program with the given exit code.",opcode:27},{mnemonic:"DUP",syntax:"dup",stackEffect:"a dup == a a",description:"Duplicates the top value on the stack.",opcode:33},{mnemonic:"DEPTH",syntax:"depth",stackEffect:"… depth == … n",description:"Pushes the current stack depth.",opcode:35},{mnemonic:"SWAP",syntax:"swap",stackEffect:"a b swap == b a",description:"Swaps the top two values on the stack.",opcode:36},{mnemonic:"MOD",syntax:"%",stackEffect:"a b % == n",description:"Computes the remainder of a divided by b.",opcode:37},{mnemonic:"AND",syntax:"&",stackEffect:"a b & == n",description:"Bitwise AND of a and b.",opcode:38},{mnemonic:"STASH",syntax:"(",stackEffect:"… ( == {moves stack to queue}",description:"Moves values from the stack to the queue.",opcode:40},{mnemonic:"FETCH",syntax:")",stackEffect:") == … {restores stack from queue}",description:"Moves values from the queue back to the stack.",opcode:41},{mnemonic:"MUL",syntax:"*",stackEffect:"a b * == n",description:"Multiplies a by b.",opcode:42},{mnemonic:"ADD",syntax:"+",stackEffect:"a b + == n",description:"Adds a and b together.",opcode:43},{mnemonic:"SUB",syntax:"-",stackEffect:"a b - == n",description:"Subtracts b from a.",opcode:45},{mnemonic:"DUMP",syntax:".",stackEffect:"… . == … {prints stack}",description:"Prints the entire stack to output.",opcode:46},{mnemonic:"DIV",syntax:"/",stackEffect:"a b / == n",description:"Divides a by b (integer division).",opcode:47},{mnemonic:"MARK",syntax:":",stackEffect:"n : == {begin definition(n)}",description:"Begins a new word definition with name n.",opcode:58},{mnemonic:"DEF",syntax:";",stackEffect:"; == {end definition}",description:"Ends the current word definition.",opcode:59},{mnemonic:"LT",syntax:"<",stackEffect:"a b < == flag",description:"Pushes true if a is less than b.",opcode:60},{mnemonic:"EQ",syntax:"=",stackEffect:"a b = == flag",description:"Pushes true if a equals b.",opcode:61},{mnemonic:"GT",syntax:">",stackEffect:"a b > == flag",description:"Pushes true if a is greater than b.",opcode:62},{mnemonic:"WHEN",syntax:"?",stackEffect:"flag [A] ? == a*",description:"Executes the quotation if flag is true.",opcode:63},{mnemonic:"BRA",syntax:"[",stackEffect:"[ == {begin quotation}",description:"Begins a quotation (anonymous code block).",opcode:91},{mnemonic:"KET",syntax:"]",stackEffect:"] == [A] {end quotation}",description:"Ends a quotation and pushes it to the stack.",opcode:93},{mnemonic:"POW",syntax:"^",stackEffect:"a b ^ == n",description:"Computes a raised to the power of b.",opcode:94},{mnemonic:"OR",syntax:"|",stackEffect:"a b | == n",description:"Bitwise OR of a and b.",opcode:124},{mnemonic:"NOT",syntax:"~",stackEffect:"a ~ == n'",description:"Bitwise NOT of a.",opcode:126}],y1={words:b1},ru=new Map;for(const i of y1.words)ru.set(i.opcode,i);function w1(i){return ru.get(i)}const v1=[BigInt(y.DEF),BigInt(y.KET),BigInt(y.MARK),BigInt(y.BRA)],cn=0n,hn=1n;class di{constructor(e){this.stack=[],this.queue=[],this.defs=new Map,this.symbols=new Map,this.depth=0,this.nextAnonOp=pn+1,this.traceOn=!1,this.traceFormat="human",this.traceVerbose=!1,this.traceQueueMax=8,this.traceStackMax=32,this.base=10,this.statsOn=!1,this.profileOn=!1,this.stats={system_instructions_called:0,user_instructions_called:0,max_stack_depth:0,max_queue_depth:0},this.profile={},this.platform=e,this.setup()}static fromBase64(e){return l1(e).flatMap(t=>{const n=t&1n,s=t>>1n;return[n,s]})}getStack(){return this.stack.slice()}peek(){const e=this.stack.length;if(e>0)return this.stack[e-1];throw new Error("Peek: stack underflow")}pop(){if(this.stack.length>0)return this.stack.pop();throw new Error("Pop: stack underflow")}push(e){this.stack.push(e)}poke(e){const t=this.stack.length;if(t>0){this.stack[t-1]=e;return}throw new Error("Poke: stack underflow")}clear(){this.stack.splice(0,this.stack.length)}queuePush(e,t){this.queue.push(e,t)}queueUnshift(e,t){this.queue.unshift(e,t)}queueShift(){return[this.queue.shift()??0n,this.queue.shift()??0n]}queuePop(){const e=this.queue.pop()??0n;return[this.queue.pop()??0n,e]}defineSystem(e,t){const n=BigInt(t),s=this.getName(n);if(this.defs.has(n))throw new Error(`Define: cannot redefine system word "${s}"`);this.defs.set(n,e)}defineUser(e,t){const n=this.getName(t);if(t>-1&&t<pn)throw new Error(`Define: cannot define system op "${n}"`);if(this.defs.has(t))throw t>pn?new Error(`Define: cannot redefine anon op "${n}"`):new Error(`Define: cannot redefine user op "${n}"`);this.defs.set(t,e)}callSystem(e){var s;const t=this.defs.get(e);if(typeof t=="function"){if(this.statsOn&&this.stats.system_instructions_called++,this.profileOn){const r=performance.now();t();const o=performance.now(),l=this.getName(e)||Number(e);(s=this.profile)[l]||(s[l]=[0,0]),this.profile[l][0]++,this.profile[l][1]!=0,this.profile[l][1]+=o-r;return}return t()}const n=this.getName(e)||e;throw new Error(`Call: undefined system op "${n}"`)}callUser(e){var s;const t=this.defs.get(e);if(Array.isArray(t)){if(this.statsOn&&this.stats.user_instructions_called++,this.queue.unshift(...t),this.profileOn){const r=this.getName(e,`&${e}`);(s=this.profile)[r]||(s[r]=[0,void 0]),this.profile[r][0]++}return}const n=this.getName(e)||e;throw new Error(`Call: undefined user op "${n}"`)}callOp(e){return e>-1n&&e<pn?this.callSystem(e):this.callUser(e)}loadBigIntCode(e){this.queue.push(...e)}loadIR(e){var n,s;let t=0;for(;t<e.length;){const r=e[t++];if(r.op===W.call){if(r.value===0n)continue;(n=r.meta)!=null&&n.name&&!this.symbols.has(r.value)&&this.symbols.set(r.value,(s=r.meta)==null?void 0:s.name),this.queuePush(hn,r.value)}else this.queuePush(cn,r.value)}return this.stack}runChunk(e,t){const n=this.queue;let s=!1,r=t,o=0;for(;n.length>0&&o<e;){const[l,a]=this.queueShift(),c=l===hn,h=this.stack.slice();s=!this.depth||c&&v1.includes(a),c?s?this.callOp(a):(this.push(l),this.push(a)):(s||this.push(l),this.push(a)),this.statsOn&&(this.stats.max_stack_depth=Math.max(this.stats.max_stack_depth,this.stack.length),this.stats.max_queue_depth=Math.max(this.stats.max_queue_depth,n.length/2));const u=r++;this.traceOn&&this.trace({step:u,immediate:s,tag:l,value:a,stackBefore:h,stackAfter:this.traceVerbose||this.traceFormat==="jsonl"?this.stack.slice():void 0}),o++}return r}run(){return this.runChunk(Number.POSITIVE_INFINITY,0),this.stack}async runAsync(e={}){var c;const t=e.yieldIntervalMs??160,n=e.yieldSliceMax??e.yieldEvery??655360;if(!Number.isFinite(t)||t<0)throw new Error(`runAsync: yieldIntervalMs must be a non-negative finite number (received ${t})`);if(!Number.isFinite(n)||n<1)throw new Error(`runAsync: yieldSliceMax / yieldEvery must be a positive finite number (received ${n})`);const s=e.scheduler??(()=>new Promise(h=>{globalThis.setTimeout(h,0)})),r=typeof globalThis.performance<"u"&&typeof globalThis.performance.now=="function"?()=>globalThis.performance.now():()=>globalThis.Date.now();let o=0,l=0,a=!1;for(;this.queue.length>0&&!a;){const h=r(),u=t>0?h+t:h;for(;this.queue.length>0&&!a&&!(t>0&&r()>=u);){const d=o;if(o=this.runChunk(n,o),l+=o-d,(c=e.onChunk)==null||c.call(e,{vmCyclesExecuted:l}),e.shouldContinue&&!e.shouldContinue()){a=!0;break}if(t===0)break}this.queue.length>0&&!a&&await s()}return{stack:this.stack.slice(),cancelled:a,vmCyclesExecuted:l}}trace({step:e,immediate:t,tag:n,value:s,stackBefore:r,stackAfter:o}){const l=this.createTraceEvent(e,t,n,s,r,o);if(this.traceFormat==="jsonl"){this.writeTraceLine(JSON.stringify(l));return}this.writeTraceLine(this.formatHumanTrace(l))}createTraceEvent(e,t,n,s,r,o){const l=n===hn,a=l?this.getName(s,String(s)):String(s),c=this.getQueuePreview();return{step:e,immediate:t,tag:l?"call":"literal",value:String(s),action:a,stack_before:this.limitStack(r).map(String),stack_after:o?this.limitStack(o).map(String):void 0,queue_preview:c,queue_depth:this.queue.length/2}}limitStack(e){return e.length>this.traceStackMax?e.slice(-this.traceStackMax):e}getQueuePreview(){const e=[],t=Math.max(this.traceQueueMax,0);for(let n=0;n<this.queue.length&&e.length<t;n+=2){const s=this.queue[n]??0n,r=this.queue[n+1]??0n,o=s===hn;e.push({tag:o?"call":"literal",value:String(r),action:o?this.getName(r,String(r)):String(r)})}return e}formatHumanTrace(e){const t=this.padHumanAction(e.action),n=this.formatHumanStack(e.stack_before),s=this.formatHumanQueue(e.queue_preview,e.queue_depth),r=this.layoutHumanTraceLine(e.step,n,t,s);if(this.traceVerbose){const o=this.formatHumanStack(e.stack_after??[]);return`${r}
${" ".repeat(String(e.step).length+1)}${o} | immediate=${e.immediate} tag=${e.tag} value=${e.value} stack_depth=${this.stack.length} queue_depth=${e.queue_depth}`}return r}padHumanAction(e){return e.length>=7?e:e.padStart(Math.floor((7+e.length)/2)," ").padEnd(7," ")}layoutHumanTraceLine(e,t,n,s){const r=this.getTraceTerminalWidth(),o=`${e} `;if(o.length>=r)return o.slice(0,r);const l=1,a=Math.min(n.length,Math.max(r-o.length-l*2,1)),c=Math.max(o.length+l,Math.floor((r-a)/2)),h=Math.min(c,Math.max(o.length+l,r-a-l)),u=h+a,d=o.length,f=Math.max(d,h-l),p=Math.min(r,u+l),m=r,g=Math.max(f-d,0),b=Math.max(m-p,0),k=Array.from({length:r},()=>" ");if(this.writeSegment(k,0,o,o.length),this.writeSegment(k,h,n,a),g>0){const v=this.truncateLeft(t,g);this.writeSegment(k,f-v.length,v,v.length)}if(b>0){const v=this.truncateRight(s,b);this.writeSegment(k,p,v,v.length)}return k.join("").replace(/\s+$/,"")}formatHumanStack(e){return e.length===0?"[ ]":`[ ${e.join(" ")} ]`}formatHumanQueue(e,t){const n=e.map(r=>r.tag==="call"?`&${r.action}`:r.value),s=Math.max(t-e.length,0);return s>0&&n.push(`…(+${s})`),n.length===0?"[ ]":`[ ${n.join(" ")} ]`}getTraceTerminalWidth(){var o,l,a,c,h,u,d;const t=globalThis.Deno,n=(l=(o=t==null?void 0:t.stderr)==null?void 0:o.isTerminal)!=null&&l.call(o)&&typeof t.stderr.rid=="number"?t.stderr.rid:(c=(a=t==null?void 0:t.stdout)==null?void 0:a.isTerminal)!=null&&c.call(a)&&typeof t.stdout.rid=="number"?t.stdout.rid:void 0;if(typeof n=="number")try{const f=(h=t==null?void 0:t.consoleSize)==null?void 0:h.call(t,n).columns;if(typeof f=="number"&&f>0)return f}catch{}const s=globalThis.process,r=(u=s==null?void 0:s.stderr)!=null&&u.isTTY&&typeof s.stderr.columns=="number"?s.stderr.columns:(d=s==null?void 0:s.stdout)!=null&&d.isTTY&&typeof s.stdout.columns=="number"?s.stdout.columns:void 0;return typeof r=="number"&&r>0?r:120}truncateLeft(e,t){return t<=0?"":e.length<=t?e:t===1?"…":`…${e.slice(-(t-1))}`}truncateRight(e,t){return t<=0?"":e.length<=t?e:t===1?"…":`${e.slice(0,t-1)}…`}writeSegment(e,t,n,s){if(!(s<=0))for(let r=0;r<s&&r<n.length&&t+r<e.length;r++)e[t+r]=n[r]}writeTraceLine(e){const t=new TextEncoder().encode(`${e}
`);if(this.platform.io.writeError){this.platform.io.writeError(t);return}this.platform.io.write(t)}getName(e,t=String(e)){return this.symbols.has(e)?this.symbols.get(e):String(t)}inspectValue(e){const t=this.symbols.get(e),n=e>=0n&&e<=BigInt(pn),s=this.defs.get(e),r=s!==void 0;let o;Array.isArray(s)&&(o=this.parseDefinitionTokens(s));let l,a;if(n){const c=w1(Number(e));c&&(l=c.stackEffect,a=c.description)}return{value:e,name:t,isSystem:n,isDefined:r,definition:o,stackEffect:l,description:a}}parseDefinitionTokens(e){const t=[];for(let n=0;n<e.length;n+=2){const s=e[n]??0n,r=e[n+1]??0n,o=s===hn,l=o?this.symbols.get(r):void 0,a=this.defs.has(r);t.push({value:r,tag:s,name:l,isCall:o,isDefined:a})}return t}print(){const e=this.stack.map(t=>t.toString(this.base)).join(" ");this.platform.io.write(new TextEncoder().encode(`[ ${e} ]
`))}loadSourceMap(e){Object.keys(e.symbols).forEach(t=>{this.symbols.set(BigInt(t),e.symbols[t])})}getNextAnonOp(){let e=this.nextAnonOp++;for(;this.defs.has(BigInt(e));)e=this.nextAnonOp++;return BigInt(e)}setup(){const e=new TextEncoder;let t;for(t in Dn)this.symbols.set(BigInt(Dn[t]),t);this.defineSystem(()=>{},y.NOP),this.defineSystem(()=>{const n=this.pop();this.callOp(n)},y.CALL),this.defineSystem(()=>{this.depth--;const[,n]=this.queuePop(),s=this.stack.splice(Number(n||0))||[];this.defineUser(s,this.pop())},y.DEF),this.defineSystem(()=>{this.depth--;const[,n]=this.queuePop(),s=this.stack.splice(Number(n||0))||[],r=this.getNextAnonOp();this.defineUser(s,r),this.depth>0&&this.push(0n),this.push(r)},y.KET),this.defineSystem(()=>{this.depth++;const n=this.stack.length;this.queuePush(cn,BigInt(n))},y.BRA),this.defineSystem(()=>{this.depth++;const n=this.stack.length;this.queuePush(cn,BigInt(n))},y.MARK),this.defineSystem(()=>this.clear(),y.CLR),this.defineSystem(()=>{const n=this.pop();this.platform.exit(Number(n))},y.EXIT),this.defineSystem(()=>{const n=this.pop();this.push(x1(n))},y.RAND),this.defineSystem(()=>{this.print()},y.PRN),this.defineSystem(()=>{this.push(BigInt(this.platform.now()))},y.CLOCK),this.defineSystem(()=>{const n=e.encode(String.fromCharCode(Number(this.pop())));this.platform.io.write(n)},y.PUTC),this.defineSystem(()=>{this.platform.io.setRaw&&this.platform.io.setRaw(!0);const n=this.platform.io.readByte();this.platform.io.setRaw&&this.platform.io.setRaw(!1),this.push(BigInt(n??0))},y.GETC),this.defineSystem(()=>{const n=e.encode(this.pop().toString(this.base));this.platform.io.write(n)},y.PUTN),this.defineSystem(()=>{this.pop()},y.DROP),this.defineSystem(()=>{const n=this.peek(),s=this.stack[this.stack.length-2];this.stack[this.stack.length-2]=n,this.poke(s)},y.SWAP),this.defineSystem(()=>{this.push(this.peek())},y.DUP),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]+=n},y.ADD),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]-=n},y.SUB),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]*=n},y.MUL),this.defineSystem(()=>{const n=this.pop();if(n===0n)throw new Error("DIV: Division by zero");this.stack[this.stack.length-1]/=n},y.DIV),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]%=n},y.MOD),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]<<=n},y.SHIFTL),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]>>=n},y.SHIFTR),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]&=n},y.AND),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]**=n},y.POW),this.defineSystem(()=>{this.push(this.pop()>this.pop()?1n:0n)},y.LT),this.defineSystem(()=>{this.push(this.pop()===this.pop()?1n:0n)},y.EQ),this.defineSystem(()=>{this.push(this.pop()<this.pop()?1n:0n)},y.GT),this.defineSystem(()=>{const n=this.pop();this.pop()!==0n&&this.queueUnshift(hn,n)},y.IF),this.defineSystem(()=>{this.queuePush(cn,this.pop())},y.PUSHR),this.defineSystem(()=>{const[,n]=this.queuePop();this.push(n)},y.PULLR),this.defineSystem(()=>{this.push(BigInt(this.stack.length))},y.DEPTH),this.defineSystem(()=>{const n=this.stack.length;this.stack.splice(0,n).forEach(r=>this.queuePush(cn,r)),this.queuePush(cn,BigInt(n))},y.STASH),this.defineSystem(()=>{const[,n]=this.queuePop(),s=Number(n),r=[];for(let o=0;o<s;o++){const[,l]=this.queuePop();r.unshift(l)}this.stack.unshift(...r)},y.FETCH),this.defineSystem(()=>{const n=this.pop();this.stack[this.stack.length-1]|=n},y.OR),this.defineSystem(()=>{const n=this.pop();this.push(~n)},y.NOT),this.defineSystem(()=>{const n=this.pop(),r=[0n,this.pop(),1n,n],o=this.getNextAnonOp();this.defineUser(r,o),this.depth>0&&this.push(0n),this.push(o)},y.CONS)}printProfile(){console.log(),console.log("Profile:");const e=Object.keys(this.profile).map(s=>{const r=this.profile[s][0],o=this.profile[s][1];return{name:s,calls:r,time:o,system:typeof o<"u","ops/ms":o?Math.round(r/o):""}}).sort((s,r)=>r.calls-s.calls),t=e.filter(s=>s.system),n=e.filter(s=>!s.system);console.table(t,["name","calls","ops/ms"]),console.table(n,["name","calls"]),console.log()}printStats(){console.log(),console.log("Interpreter stats:"),console.log(this.stats),console.log()}}function x1(i){const e=i,t=e.toString().length;let n="";for(;n.length<t;)n+=Math.random().toString().split(".")[1];n=n.slice(0,t);const s="1"+"0".repeat(t);return e*BigInt(n)/BigInt(s)}const zi=BigInt(y.DEF),ma=BigInt(y.KET),qi=BigInt(y.MARK),ga=BigInt(y.BRA),j=i=>(i=BigInt(i),e=>e.op===W.call&&e.value===i),un=i=>(i=BigInt(i),e=>e.op===W.push&&e.value===i),Le=i=>i.op===W.push,ba=i=>i.op===W.push&&i.value!==0n,k1=[{name:"No operation",pattern:[j(y.NOP)],replacement:()=>[]},{name:"Null Sequence - SWAP SWAP",pattern:[j(y.SWAP),j(y.SWAP)],replacement:()=>[]},{name:"Null Sequence - DUP DROP",pattern:[j(y.DUP),j(y.DROP)],replacement:()=>[]},{name:"Null Sequence - PUSHR PULLR",pattern:[j(y.PUSHR),j(y.PULLR)],replacement:()=>[]},{name:"Null Sequence - CLOCK DROP",pattern:[j(y.CLOCK),j(y.DROP)],replacement:()=>[]},{name:"Null Sequence - RAND DROP",pattern:[j(y.RAND),j(y.DROP)],replacement:()=>[]},{name:"Null Sequence - DEPTH DROP",pattern:[j(y.DEPTH),j(y.DROP)],replacement:()=>[]},{name:"Null Sequence - NOT NOT",pattern:[j(y.NOT),j(y.NOT)],replacement:()=>[]},{name:"Indirect calls - n EVAL",pattern:[Le,j(y.CALL)],replacement:i=>{var e,t;return[{op:W.call,value:i.value,meta:{name:(t=(e=i.meta)==null?void 0:e.name)==null?void 0:t.replace(/^&/,"")}}]}},{name:"Null Sequence - n DROP",pattern:[Le,j(y.DROP)],replacement:()=>[]},{name:"Constant Folding - a b ADD",pattern:[Le,Le,j(y.ADD)],replacement:(i,e)=>[{op:W.push,value:i.value+e.value}]},{name:"Algebraic Simplification - 0 ADD",pattern:[un(0),j(y.ADD)],replacement:()=>[]},{name:"Algebraic Simplification - swap ADD",pattern:[j(y.SWAP),j(y.ADD)],replacement:(i,e)=>[e]},{name:"Constant Folding - a b SUB",pattern:[Le,Le,j(y.SUB)],replacement:(i,e)=>[{op:W.push,value:i.value-e.value}]},{name:"Algebraic Simplification - 0 SUB",pattern:[un(0),j(y.SUB)],replacement:()=>[]},{name:"Constant Folding - a b MUL",pattern:[Le,Le,j(y.MUL)],replacement:(i,e)=>[{op:W.push,value:i.value*e.value}]},{name:"Algebraic Simplification - 1 MUL",pattern:[un(1),j(y.MUL)],replacement:()=>[]},{name:"Algebraic Simplification - swap MUL",pattern:[j(y.SWAP),j(y.MUL)],replacement:(i,e)=>[e]},{name:"Constant Folding - a b DIV",pattern:[Le,ba,j(y.DIV)],replacement:(i,e)=>[{op:W.push,value:i.value/e.value}]},{name:"Algebraic Simplification - 1 DIV",pattern:[un(1),j(y.DIV)],replacement:()=>[]},{name:"Constant propagation - a DUP",pattern:[Le,j(y.DUP)],replacement:i=>[i,i]},{name:"Unreachable Code - 0 &b IF",pattern:[un(0),Le,j(y.IF)],replacement:()=>[]},{name:"Flows-Of-Control Optimizations - !0 &b IF",pattern:[ba,Le,j(y.IF)],replacement:(i,e,t)=>{var n,s;return[{op:W.call,value:e.value,meta:{name:(s=(n=e.meta)==null?void 0:n.name)==null?void 0:s.replace(/^&/,"")}}]}},{name:"Null Sequence - 0 eval",pattern:[un(0),j(y.CALL)],replacement:()=>[]},{name:"Empty List - [ ]",pattern:[j(y.BRA),j(y.KET)],replacement:()=>[{op:W.push,value:0n,meta:{pointer:!0,name:"0"}}]},{name:"a q< b a> - b a",pattern:[Le,j(y.PUSHR),Le,j(y.PULLR)],replacement:(i,e,t)=>[t,i]}];class _1{constructor(){this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0},this.minOptPasses=2,this.maxOptPasses=20,this.defs=new Map,this.calledWords=new Set,this.optimized=[],this.nextAnonOp=pn+1}optimize(e){this.reset(),this.stats.pre_optimization_ir_size=e.length,this.optimized=e;let t;do t=this.optimized.length,this.optLoop();while((this.optimized.length<t||this.stats.optimization_passes<this.minOptPasses)&&this.stats.optimization_passes<this.maxOptPasses);return this.optimized=this.pullDefs(this.optimized),this.optimized=this.addReferencedWords(this.optimized),this.stats.post_optimization_ir_size=this.optimized.length,this.optimized}optLoop(){this.optimized=this.peepholeOptimization(this.optimized),this.optimized=this.getDefs(this.optimized),this.optimized=this.inlineWords(this.optimized,4),this.stats.optimization_passes++}reset(){this.optimized=[],this.defs=new Map,this.calledWords=new Set,this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0}}getDefs(e){var n;let t=0;for(;t<e.length;){const s=e[t];if(s.op===W.call){if(s.value===ma){this.stats.optimization_passes===0&&this.stats.user_defined_anon_defs++,s.meta??(s.meta={}),(n=s.meta).uid??(n.uid=this.nextAnonOp++);let r=t;for(;r-- >0;){const c=e[r];if(c.op===W.call&&c.value===ga)break}const o=BigInt(s.meta.uid),l={op:W.push,value:o,meta:{pointer:!0}},a=e.slice(r,t+1);a.unshift(l),a[1]={...a[1],value:qi,meta:{...a[1].meta,name:":"}},a[a.length-1]={...a[a.length-1],value:zi,meta:{...a[a.length-1].meta,name:";"}},this.defs.set(o,a)}else if(s.value===zi){this.stats.optimization_passes===0&&this.stats.user_defined_named_defs++;let r=t;for(;r-- >0;){const a=e[r];if(a.op===W.call&&a.value===qi)break}const o=e[r-1];o.meta||(o.meta={}),o.meta.pointer=!0;const l=e.slice(r-1,t+1);this.defs.set(o.value,l)}}t++}return e}pullDefs(e,t=!1){var r;const n=e.slice();let s=0;for(;s<n.length;){const o=n[s];if(o.op===W.call){if(o.value===ma){o.meta??(o.meta={}),(r=o.meta).uid??(r.uid=this.nextAnonOp++);const l=s;for(;s-- >0;){const u=n[s];if(u.op===W.call&&u.value===ga)break}const a=BigInt(o.meta.uid),c={op:W.push,value:a,meta:{pointer:!0}},h=n.splice(s,l-s+1,c);h.unshift(c),h[1]={...h[1],value:qi,meta:{...h[1].meta,name:":"}},h[h.length-1]={...h[h.length-1],value:zi,meta:{...h[h.length-1].meta,name:";"}},this.defs.set(a,h)}else if(o.value===zi&&!t){const l=s;for(;s-- >0;){const h=n[s];if(h.op===W.call&&h.value===qi)break}const a=n[s-1];a.meta||(a.meta={}),a.meta.pointer=!0;const c=n.splice(s-1,l-s+2);s=s-2,this.defs.set(c[0].value,c)}}s++}return n}peepholeOptimization(e){const t=e.slice();for(;;){const n=this.stats.peephole_optimizations;let s=0;for(;s<t.length;){for(const r of k1){const{pattern:o,replacement:l}=r;if(s+o.length>t.length)continue;if(o.every((c,h)=>c(t[s+h]))){this.stats.peephole_optimizations++;const c=t.slice(s,s+o.length);t.splice(s,o.length,...l(...c)),s=Math.max(0,s-o.length-1);break}}s++}if(this.stats.peephole_optimizations===n)break}return t}inlineWords(e,t=1,n=[]){return e.flatMap(s=>{var r,o,l,a;if((r=s.meta)!=null&&r.unsafe)return s;if(s.op===W.call&&this.defs.has(s.value)){if(n.includes(s.value))return s;const c=this.defs.get(s.value);if(!c)return s;const h=c[c.length-1];if((o=h.meta)!=null&&o.unsafe)return s;if((l=h.meta)!=null&&l.inline||(a=s.meta)!=null&&a.inline)return this.stats.inlined_calls++,this.inlineWords(c.slice(2,-1),1/0,n.concat(s.value));if(c.length<=t+3)return this.stats.inlined_calls++,this.inlineWords(c.slice(2,-1),t,n.concat(s.value))}return s})}addReferencedWords(e){return e.slice().forEach(t=>{var n;t.op===W.push&&((n=t.meta)!=null&&n.pointer)?this.addDef(t.value):t.op===W.call&&this.addDef(t.value)}),e}addDef(e){if(!this.calledWords.has(e)){const t=this.defs.get(e);if(t)return this.stats.post_optimization_user_defs++,this.calledWords.add(e),this.optimized.unshift(...t),this.addReferencedWords(t)}}}class Ft{constructor(e,t,n){this.imported=new Set,this.importPrefixes=new Map,this.macroPreludeReady=!1,this.rootFilename=null,this.host=e,this.engine=t.engine,this.compiler=t.compiler||new Ue,n!=null&&n.macroEngineBootstrapFile&&this.bootstrapMacroEngine(n.macroEngineBootstrapFile)}static tokenize(e){return e.split(/[\r\n]+/)}preprocess(e,t="-"){const n=this.rootFilename===null;n&&t!=="-"&&(this.rootFilename=t);try{return this.preprocessLines(e,t)}finally{n&&(this.rootFilename=null)}}preprocessLines(e,t,n){return e.map(s=>{if(s.length>1&&s[0]==="."){const[r,...o]=s.split(" ");if(r[0]==="."&&r.length>1){switch(r){case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Preprocessor: .exit requires a host exit handler");case".load":{const l=this.findFile(o.join(" "),t),a=this.host.readTextFile(l);return this.preprocessLines(Ft.tokenize(a),l)}case".import":{const l=this.findFile(o.join(" "),t);if(!this.imported.has(l)){this.imported.add(l);const a=this.host.readTextFile(l);return this.preprocessLines(Ft.tokenize(a),l,l)}return""}case".m":return this.runMacro(o.join(" "),s);case".ff":return this.runMacro(o.join(" "),s);case".ffp":{if(!this.macroPreludeReady)throw new Error("Preprocessor: .ffp requires prelude-enabled macro context");return this.runMacro(o.join(" "),s)}}return""}}return n?this.mangleImportedLine(s,n):s}).join(`
`)}findFile(e,t="-"){if(t&&t!=="-"&&!this.host.path.isAbsolute(e)){const n=this.host.path.dirname(t),s=this.host.path.resolve(n,e);if(this.host.fileExists(s))return s}if(this.host.fileExists(e))return e;throw'File not found: "'+e+'"'}bootstrapMacroEngine(e){const t=this.findFile(e),n=this.host.readTextFile(t),r=new Ft(this.host,{engine:this.engine,compiler:this.compiler}).preprocess(Ft.tokenize(n),t),o=this.compiler.compileToIR(Ue.tokenize(r),t);this.engine.loadIR(o),this.engine.run(),this.engine.clear(),this.macroPreludeReady=!0}runMacro(e,t){const n=this.compiler.compileToIR(Ue.tokenize(e));this.engine.loadIR(n),this.engine.run();const s=this.engine.getStack();return this.engine.clear(),s.map(String).join(" ")+` /* ${t} */`}mangleImportedLine(e,t){const n=this.getImportPrefix(t);return e.split(/(\s+)/).map(s=>!s||/\s+/.test(s)?s:this.mangleImportedToken(s,n)).join("")}mangleImportedToken(e,t){return e.startsWith("[__")?`[${t}${e.slice(3)}`:e.startsWith("__")?`${t}${e.slice(2)}`:e}getImportPrefix(e){const t=this.importPrefixes.get(e);if(t)return t;const s=this.getNormalizedImportPath(e).replace(/[^A-Za-z0-9]+/g,"_").replace(/^_+|_+$/g,"").replace(/_+/g,"_")||"module",r=this.hashPath(e),o=`__${s}_${r}__`;return this.importPrefixes.set(e,o),o}getNormalizedImportPath(e){if(this.rootFilename&&this.rootFilename!=="-"){const t=this.host.path.dirname(this.rootFilename),n=this.host.path.relative(t,e);if(n)return n.replace(/\\/g,"/")}return e.replace(/\\/g,"/")}hashPath(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619)>>>0;return t.toString(36)}}function Pn(i){const e=i.startsWith("/"),t=i.split("/").filter(Boolean),n=[];for(const s of t)if(s!=="."){if(s===".."){n.pop();continue}n.push(s)}return`${e?"/":""}${n.join("/")}`||(e?"/":".")}function S1(i){const e=Pn(i),t=e.lastIndexOf("/");return t<=0?e.startsWith("/")?"/":".":e.slice(0,t)}function C1(...i){const e=i.filter(Boolean).join("/").replaceAll(/\/+/g,"/");return Pn(e)}function A1(i,e){const t=Pn(i).split("/").filter(Boolean),n=Pn(e).split("/").filter(Boolean);let s=0;for(;s<t.length&&s<n.length&&t[s]===n[s];)s++;const r=t.length-s,o=n.slice(s);return Array(r).fill("..").concat(o).join("/")||"."}function ou(i){return{readTextFile(e){const t=Pn(e),n=i[t];if(typeof n!="string")throw new Error(`Virtual file not found: ${t}`);return n},fileExists(e){return typeof i[Pn(e)]=="string"},path:{isAbsolute(e){return e.startsWith("/")},dirname:S1,relative:A1,resolve:C1}}}function lu(i={}){const e=new TextDecoder,t=new TextEncoder,n=Array.from(t.encode(i.stdin??""));return{io:{write(s){var r;(r=i.onWrite)==null||r.call(i,e.decode(s))},readByte(){return n.shift()??null}},exit(s){var r;(r=i.onExit)==null||r.call(i,s)},now(){return Date.now()}}}const T1="/lib/prelude.ffp",M1="/main.ffp";function Fo(i){return su.length+i.length}function au(i){return i?`${su}${i}`:""}function ya(i,e){const t=console.log;console.log=(...n)=>{i(n.map(String).join(" "))};try{return e()}finally{console.log=t}}async function E1(i,e){const t=console.log;console.log=(...n)=>{i(n.map(String).join(" "))};try{return await e()}finally{console.log=t}}function B1(i,e,t={}){let n="";const s=[];let r=0;const o=t.filename??M1,l=lu({stdin:e,onWrite(p){n+=p},onExit(p){r=p}}),a=new Ue,c=new di(l),h=new Ue,u=new di(l),d=Jh(i,o),f=new Ft(ou(d),{engine:u,compiler:h},{macroEngineBootstrapFile:T1});return{compiler:a,engine:c,preprocessor:f,filename:o,logs:s,getOutput(){return n},getExitCode(){return r}}}function D1(i,e,t,n={}){const s=B1(i,e,n),r=performance.now(),o=ya(a=>s.logs.push(a),()=>{const a=s.preprocessor.preprocess(Ft.tokenize(i),s.filename);let c=s.compiler.compileToIR(Ue.tokenize(a),s.filename);const h=s.compiler.validate(c);t&&(c=new _1().optimize(c));const u=Qh(c),d=Ue.compileToBase64(c),f=Fo(d);return s.engine.loadIR(c),{preprocessed:a,formattedIr:u,bytecode:d,compiledBytes:f,issues:h}}),l=performance.now();return{preprocessed:o.preprocessed,ir:o.formattedIr,bytecode:o.bytecode,compiledBytes:o.compiledBytes,issues:o.issues,compileMs:l-r,execute(){const a=performance.now();ya(h=>s.logs.push(h),()=>{s.engine.run()});const c=performance.now();return{output:s.getOutput(),stack:s.engine.getStack().map(String),logs:[...s.logs],exitCode:s.getExitCode(),executeMs:c-a,cancelled:!1,vmCyclesExecuted:0}},async executeAsync(a={}){const c=performance.now(),h=await E1(d=>s.logs.push(d),async()=>await s.engine.runAsync(a)),u=performance.now();return{output:s.getOutput(),stack:s.engine.getStack().map(String),logs:[...s.logs],exitCode:s.getExitCode(),executeMs:u-c,cancelled:h.cancelled,vmCyclesExecuted:h.vmCyclesExecuted}}}}let sr=null;function P1(){return sr||(sr=new W0),sr}function O1(){if(typeof Worker>"u"||typeof window>"u")return!1;try{if(new URLSearchParams(Zr(window.location).replace(/^\?/,"")).get("worker")==="0")return!1}catch{}return!0}function wa(i){return{output:"",preprocessed:"",ir:"",bytecode:"",compiledBytes:0,issues:[],stack:[],logs:[],exitCode:1,compileMs:0,executeMs:0,terminal:"error",vmCyclesExecuted:0}}async function Ho(i,e,t,n={}){var o;const s=n.yieldIntervalMs??160,r=n.yieldSliceMax??n.yieldEvery??655360;if(O1())try{return await P1().runProgram({source:i,stdin:e,optimize:t,filename:n.filename,yieldIntervalMs:s,yieldSliceMax:r,signal:n.signal,onProgress:n.onProgress})}catch(l){const a=l instanceof Error?l.message:String(l);return{...wa(),logs:[a]}}try{const l=D1(i,e,t,{filename:n.filename}),a=l.compileMs;(o=n.onProgress)==null||o.call(n,{vmCyclesExecuted:0,compileMs:a,executeElapsedMs:0,compiledBytes:l.compiledBytes});const c=performance.now(),h=await l.executeAsync({yieldIntervalMs:s,yieldSliceMax:r,shouldContinue:()=>{var d;return!((d=n.signal)!=null&&d.aborted)},onChunk:({vmCyclesExecuted:d})=>{var f;(f=n.onProgress)==null||f.call(n,{vmCyclesExecuted:d,compileMs:a,executeElapsedMs:performance.now()-c})},scheduler:()=>new Promise(d=>{globalThis.setTimeout(d,0)})}),u=h.cancelled?"cancelled":"done";return{output:h.output,preprocessed:l.preprocessed,ir:l.ir,bytecode:l.bytecode,compiledBytes:l.compiledBytes,issues:l.issues,stack:h.stack,logs:h.logs,exitCode:h.exitCode,compileMs:l.compileMs,executeMs:h.executeMs,terminal:u,vmCyclesExecuted:h.vmCyclesExecuted}}catch(l){const a=l instanceof Error?l.message:String(l);return{...wa(),logs:[a]}}}const va="/lib/prelude.ffp";function L1(i,e){const t=console.log;console.log=(...n)=>{i(n.map(String).join(" "))};try{return e()}finally{console.log=t}}class R1{constructor(){ht(this,"compiler");ht(this,"engine");ht(this,"preprocessor");ht(this,"files");ht(this,"output","");this.reset()}reset(){this.output="",this.files=Jh("","/repl.ffp");const e=lu({onWrite:s=>{this.output+=s}});this.compiler=new Ue,this.engine=new di(e);const t=new Ue,n=new di(e);this.preprocessor=new Ft(ou(this.files),{engine:n,compiler:t},{macroEngineBootstrapFile:va}),this.execute(`.import ${va}`)}inspectValue(e){const t=BigInt(e);return this.engine.inspectValue(t)}createStackItems(){return this.engine.getStack().map((e,t)=>({value:String(e),index:t}))}execute(e){const t=e.trim(),n=[];return t?t===".reset"?(this.reset(),{output:"Session reset. Prelude reloaded.",clearTranscript:!0,logs:n,stack:this.createStackItems()}):t===".clear"?{output:"Transcript cleared.",clearTranscript:!0,logs:n,stack:this.createStackItems()}:t===".exit"||t===".quit"?{output:"Browser REPL sessions stay open. Use .reset to clear state.",logs:n,stack:this.createStackItems()}:(this.files["/repl.ffp"]=e,this.output="",L1(s=>n.push(s),()=>{try{const s=this.preprocessor.preprocess([e],"/repl.ffp"),r=this.compiler.compileToIR(Ue.tokenize(s),"/repl.ffp");return this.engine.loadIR(r),this.engine.run(),{output:this.output,logs:n,stack:this.createStackItems()}}catch(s){return{output:this.output,logs:n,stack:this.createStackItems(),error:s instanceof Error?s.message:String(s)}}})):{output:"",logs:n,stack:this.createStackItems()}}}const I1=`<main class="shell">
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
`,z1=`<div class="help-grid">
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
`;function On(i){if(!Number.isFinite(i)||i<0)return String(i);const e=Math.floor(i);if(e<1e5)return e.toLocaleString();if(e<1e6){const n=e/1e3;return n>=999.5?xa(e,1e6,"m"):`${n.toFixed(2)}k`}if(e<1e9){const n=e/1e6;return n>=999.5?xa(e,1e9,"b"):`${n.toFixed(2)}m`}return`${(e/1e9).toFixed(2)}b`}function xa(i,e,t){return`${(i/e).toFixed(2)}${t}`}const cu=[{id:"square",order:1,title:"Square",goal:"Define `square` and print the square of one number.",concepts:["definitions","dup","*","putn","cr"],source:String.raw`.load /lib/prelude.ffp

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
`,expected:"1 5 10 10 5 1",note:"`nck` does the math for each entry; the recursion only controls left-to-right order."}];function gt(i){return i.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function Ot(i,e){const t=i.querySelector(e);if(!t)throw new Error(`Missing required element: ${e}`);return t}function ka(i){return i.split(/(`[^`]+`)/g).map(e=>e.startsWith("`")&&e.endsWith("`")?`<code>${gt(e.slice(1,-1))}</code>`:gt(e)).join("")}function _a(){return new Promise(i=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>i())})})}function Hn(i){return i.map(e=>{const t=e.tone&&e.tone!=="default"?` ${e.tone}`:"",n=e.showDot?'<span class="tutorial-summary-dot" aria-hidden="true"></span>':"";return`
      <span class="tutorial-summary-item">
        <span class="tutorial-summary-label">${gt(e.label)}</span>
        <span class="tutorial-summary-value${t}">${n}${gt(e.value)}</span>
      </span>
    `}).join('<span class="tutorial-summary-separator" aria-hidden="true">|</span>')}function q1(i){const e=i.expected?`
      <div class="tutorial-guidance-block">
        <p class="tutorial-guidance-label">Expected result</p>
        <pre class="tutorial-guidance-value">${gt(i.expected)}</pre>
      </div>
    `:"",t=i.note?`
      <div class="tutorial-guidance-block">
        <p class="tutorial-guidance-label">Note</p>
        <p class="tutorial-note">${ka(i.note)}</p>
      </div>
    `:"",n=typeof i.stdin=="string"?`
      <label class="field tutorial-stdin-field">
        <span>stdin</span>
        <input data-role="stdin" type="text" value="${gt(i.stdin)}" />
      </label>
    `:"";return`
    <article class="panel tutorial-card" data-problem-id="${gt(i.id)}">
      <div class="tutorial-card-body">
        <div class="tutorial-card-header">
          <div>
            <p class="panel-label">Problem ${i.order}</p>
            <h2>${gt(i.title)}</h2>
          </div>
          <p class="tutorial-goal">${ka(i.goal)}</p>
        </div>

        <div class="tutorial-concepts" aria-label="Concepts">
          ${i.concepts.map(s=>`<span class="tutorial-concept">${gt(s)}</span>`).join("")}
        </div>

        <div class="tutorial-workbench">
          <div class="tutorial-editor-pane">
            <div class="tutorial-editor-shell">
              <div class="tutorial-editor" data-role="editor" aria-label="${gt(i.title)} source editor"></div>
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
  `}function N1(){return`
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
        ${[...cu].sort((e,t)=>e.order-t.order).map(e=>q1(e)).join("")}
      </section>
    </section>
  `}function F1(i){const e=[];return i.output&&e.push(i.output.trimEnd()),i.logs.length&&e.push(i.logs.join(`
`)),e.filter(Boolean).join(`
`)||"(no output)"}function H1(i){i.innerHTML=N1(),[...cu].sort((t,n)=>t.order-n.order).forEach(t=>{const n=Ot(i,`[data-problem-id="${t.id}"]`),s=Ot(n,"[data-role='editor']"),r=Ot(n,"[data-role='run']"),o=Ot(n,"[data-role='reset']"),l=Ot(n,"[data-role='summary']"),a=Ot(n,"[data-role='output']"),c=Ot(n,"[data-role='diagnostics']"),h=Ot(n,"[data-role='error']"),u=n.querySelector("[data-role='stdin']"),d=Xh(s,t.source,{extraExtensions:[Kh]});function f(){d.setValue(t.source),u&&typeof t.stdin=="string"&&(u.value=t.stdin),l.textContent="Ready to run.",a.textContent="Run the snippet to see output.",c.textContent="",c.hidden=!0,h.textContent="",h.hidden=!0}let p=null;r.addEventListener("click",async()=>{if(p!==null){p.abort();return}Io(r),r.textContent="Cancel",r.setAttribute("aria-label","Cancel run"),r.classList.add("is-cancel"),o.disabled=!0,u&&(u.disabled=!0),l.innerHTML=Hn([{label:"compile",value:"Running...",tone:"running",showDot:!0},{label:"execute",value:"pending",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),h.textContent="",h.hidden=!0;const m=new AbortController;p=m;try{await _a(),l.innerHTML=Hn([{label:"compile",value:"Running...",tone:"running",showDot:!0},{label:"execute",value:"pending",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),await _a();const g=await Ho(d.getValue(),(u==null?void 0:u.value)??"",!0,{signal:m.signal,onProgress:({vmCyclesExecuted:v,compileMs:I})=>{l.innerHTML=Hn([{label:"compile",value:I!==void 0?`${I.toFixed(2)} ms`:"…",tone:"running"},{label:"execute",value:`${On(v)} vm steps`,tone:"running",showDot:!0},{label:"exit",value:"pending",tone:"pending"}])}}),b=g.terminal==="cancelled"?"cancelled":g.terminal==="error"?"error":String(g.exitCode),k=g.terminal==="cancelled"?"pending":g.terminal==="error"?"error":g.exitCode===0?"success":"error";l.innerHTML=Hn([{label:"compile",value:`${g.compileMs.toFixed(2)} ms`},{label:"execute",value:`${g.executeMs.toFixed(2)} ms`},{label:"exit",value:b,tone:k},{label:"issues",value:g.issues.length===1?"1 compiler issue":`${g.issues.length} compiler issues`,tone:g.issues.length?"error":"default"},...g.vmCyclesExecuted!==void 0?[{label:"vm steps",value:On(g.vmCyclesExecuted),tone:"default"}]:[]]),a.textContent=F1(g),g.terminal==="error"?(c.textContent="",c.hidden=!0,h.textContent=g.logs.join(`
`)||"Run failed.",h.hidden=!1):g.issues.length?(c.textContent=`Compiler issues:
${g.issues.join(`
`)}`,c.hidden=!1,h.textContent="",h.hidden=!0):(c.textContent="",c.hidden=!0,h.textContent="",h.hidden=!0)}catch(g){const b=g instanceof Error?g.message:String(g);l.innerHTML=Hn([{label:"compile",value:"failed",tone:"error"},{label:"execute",value:"pending",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),a.textContent="",c.textContent="",c.hidden=!0,h.textContent=b,h.hidden=!1}finally{p=null,zo(),u&&(u.disabled=!1),r.textContent="Run",r.setAttribute("aria-label","Run"),r.classList.remove("is-cancel"),o.disabled=!1}}),o.addEventListener("click",()=>{f()}),u&&typeof t.stdin!="string"&&(u.value="")})}const W1=`---
etude: 99bottles
title: "99 Bottles of Beer"
leader: hypercubed
bytes: 543
date: 2026-04-07
---

Print the full "99 Bottles of Beer" lyrics.

This etude follows the code.golf [99 Bottles of Beer](https://code.golf/99-bottles-of-beer) hole.
`,V1=`---
etude: catalans-constant
title: "Catalan's Constant"
leader: hypercubed
bytes: 147
date: 2026-04-07
---

Print Catalan's constant to the first 1,000 decimal places after the point.

This etude follows the code.golf [Catalan's Constant](https://code.golf/catalans-constant) hole.
`,$1=`---
etude: collatz
title: "Collatz"
leader: hypercubed
bytes: 215
date: 2026-04-07
---

Print the Collatz stopping times for the numbers 1 through 1,000, one per line.

This etude follows the code.golf [Collatz](https://code.golf/collatz) hole.
`,U1=`---
etude: e-digits
title: "Digits of e"
leader: hypercubed
bytes: 1086
date: 2026-04-07
---

Print e to the first 1,000 decimal places after the point.

This etude follows the code.golf [𝑒](https://code.golf/%f0%9d%91%92) hole.
`,j1=`---
etude: fib
title: "Fibonacci"
leader: hypercubed
bytes: 74
date: 2026-04-07
---

Print the 31st Fibonacci number.

The solution defines \`fib\` with the stack effect \`n fib -> F_n\`. This etude follows the code.golf [Fibonacci](https://code.golf/fibonacci) hole.
`,K1=`---
etude: fizzbuzz
title: "FizzBuzz"
leader: hypercubed
bytes: 245
date: 2026-04-07
---

Print the numbers 1 through 100 using FizzBuzz substitutions.

The current best solution uses the unrolled approach popularized in the Rosetta Code [FizzBuzz article](https://rosettacode.org/wiki/FizzBuzz#the_unrolled_approach). This etude follows the code.golf [FizzBuzz](https://code.golf/fizz-buzz) hole.
`,X1=`---
etude: leap-years
title: "Leap Years"
leader: hypercubed
bytes: 224
date: 2026-04-07
---

Print all leap years from 1800 to 2400 inclusive.

This etude follows the code.golf [Leap Years](https://code.golf/leap-years) hole.
`,G1=`---
etude: ln-2
title: "ln 2"
leader: hypercubed
bytes: 22
date: 2026-04-07
---

Print ln(2) to the first 1,000 decimal places after the point.

This etude follows the code.golf [ln 2](https://code.golf/ln-2) hole.
`,Y1=`---
etude: pascals-triangle
title: "Pascal's Triangle"
leader: hypercubed
bytes: 263
date: 2026-04-07
---

Print the first 20 rows of Pascal's triangle.

This etude follows the code.golf [Pascal's Triangle](https://code.golf/pascals-triangle) hole.
`,J1=`---
etude: pi-digits
title: "Digits of pi"
leader: hypercubed
bytes: 929
date: 2026-04-07
---

Print pi to the first 1,000 decimal places after the point.

Including the leading \`3.\`, the output is 1,002 characters total. This etude follows the code.golf [π](https://code.golf/%cf%80) hole.
`,Q1=`---
etude: roman-to-arabic
title: "Roman to Arabic"
leader: hypercubed
bytes: 877
date: 2026-04-07
---

Convert Roman numerals to Arabic values.

The original code.golf hole is argument-driven, so this Codetta version freezes a representative sample set of Roman numerals and expected conversions. It follows the code.golf [Roman to Arabic](https://code.golf/roman-to-arabic) hole.
`,Z1=`---
etude: tower-of-hanoi
title: "Tower of Hanoi"
leader: hypercubed
bytes: 198
date: 2026-04-07
---

Print the steps needed to solve the Tower of Hanoi with 9 disks.

Each line identifies the source pole and destination pole for one move. This etude follows the code.golf [Tower of Hanoi](https://code.golf/tower-of-hanoi) hole.
`,e2=`.import ../../lib/prelude.ffp

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
`,t2=`.import ../../lib/prelude.ffp

/* Near-solution seed retained from ff/catalan.ffp. */
/* Catalan number: n cat -> C_n */

cat: dup dup 2 * swap nck swap 1 + / ;

100 cat .
`,n2=`.import ../../lib/prelude.ffp

next: dup even? [ 2 / ] [ 3 * 1 + ] branch ;
steps: dup 1 > [ next steps ++ ] [ drop 0 ] branch ;
line: dup steps putn cr ++ ;

1 [ line ] 1000 times drop
`,i2=`.import ../../lib/prelude.ffp

N: 1000 ;
E: N 1 nexp ;
E N nputn
cr
`,s2=`.import ../../lib/prelude.ffp

fib:
  dup 0 = not
  [ dup 1 = not
    [ -- dup fib swap -- fib + ] ?
  ] ? ;

31 fib putn
`,r2=`.import ../../lib/prelude.ffp

n: dup putn cr ++ ;
f: 0 'Fizz' println ++ ;
b: 0 'Buzz' println ++ ;
fb: 0 'FizzBuzz' println ++ ;
fb10: n n f n b f n n f b ;
fb15: fb10 n f n n fb ;
fb100: fb15 fb15 fb15 fb15 fb15 fb15 fb10 ;

1 fb100 drop
`,o2=`.import ../../lib/prelude.ffp
.import ../../lib/time/utc.ffp

line: dup leap-year? [ dup putn cr ] ? ++ ;

1800 [ line ] 601 times drop
`,l2=`/* Near-solution seed based on the fixed-point ln(2) helper value. */

ln2: 69314718055994530941 ;

ln2 putn
`,a2=`.import ../../lib/prelude.ffp

ps: putn sp ;

line: dup 0 swap [ dup2 ++ q< q< nck ps q> q> ] seq nck ps cr ;

0 [ dup line ++ ] 20 times
`,c2=`.import ../../lib/prelude.ffp

N: 1000 ;
P: N npi ;
P N nputn
cr
`,h2=`.import ../../lib/prelude.ffp
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
`,u2=`.import ../../lib/prelude.ffp

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
`,d2=`99 bottles of beeron the wall, 99 bottles of beer.
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
Go to the store and buy some more, 99 bottles of beeron the wall.`,f2=`0.9159655941772190150546035149323841107741493742816721342664981196217630197762547694793565129261151062485744226191961995790358988033258590594315947374811584069953320287733194605190387274781640878659090247064841521630002287276409423882599577415088163974702524820115607076448838078733704899008647751132259971343407485407553230768565335768095835260219382323950800720680355761048235733942319149829836189977069036404180862179411019175327431499782339761055122477953032487537187866582808236057022559419481809753509711315712615804242723636439850017382875977976530683700929808738874956108936597719409687268444416680462162433986483891628044828150627302274207388431172218272190472255870531908685735423498539498309919115967388464508615152499624237043745177737235177544070853846440132174839299994757244619975496197587064007474870701490937678873045869979860644874974643872062385137123927363049985035392239287879790633644032354784535851927777787270906083031994301332316712476158709792455479119092126201854803963934243
`,p2=`0
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
`,m2=`2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274274663919320030599218174135966290435729003342952605956307381323286279434907632338298807531952510190115738341879307021540891499348841675092447614606680822648001684774118537423454424371075390777449920695517027618386062613313845830007520449338265602976067371132007093287091274437470472306969772093101416928368190255151086574637721112523897844250569536967707854499699679468644549059879316368892300987931277361782154249992295763514822082698951936680331825288693984964651058209392398294887933203625094431173012381970684161403970198376793206832823764648042953118023287825098194558153017567173613320698112509961818815930416903515988885193458072738667385894228792284998920868058257492796104841984443634632449684875602336248270419786232090021609902353043699418491463140934317381436405462531520961836908887070167683964243781405927145635490613031072085103837505101157477041718986106873969655212671546889570350354
`,g2="1346269",b2=`1
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
`,y2=`1804
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
`,w2=`0.6931471805599453094172321214581765680755001343602552541206800094933936219696947156058633269964186875420014810205706857336855202357581305570326707516350759619307275708283714351903070386238916734711233501153644979552391204751726815749320651555247341395258829504530070953263666426541042391578149520437404303855008019441706416715186447128399681717845469570262716310645461502572074024816377733896385506952606683411372738737229289564935470257626520988596932019650585547647033067936544325476327449512504060694381471046899465062201677204245245296126879465461931651746813926725041038025462596568691441928716082938031727143677826548775664850856740776484514644399404614226031930967354025744460703080960850474866385231381816767514386674766478908814371419854942315199735488037516586127535291661000710535582498794147295092931138971559982056543928717000721808576102523688921324497138932037843935308877482597017155910708823683627589842589185353024363421436706118923678919237231467232172053401649256872747782344535347
`,v2=`1
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
`,x2=`3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989
`,k2=`I	1
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
`,_2=`1 3
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
`,S2="../../ff/codetta",Wo=new Set(["catalans-constant","ln-2","pascals-triangle"]);function hu(i,e){const t=/^\.\.\/\.\.\/ff\/codetta\/([^/]+)\//.exec(i);if(!t)throw new Error(`Unexpected Codetta path for ${e}: ${i}`);return t[1]}function C2(i){const e=i.replaceAll(`\r
`,`
`);if(!e.startsWith(`---
`))throw new Error("Codetta README is missing frontmatter.");const t=e.indexOf(`
---
`,4);if(t<0)throw new Error("Codetta README frontmatter is unterminated.");const n=e.slice(4,t).split(`
`),s=e.slice(t+5).trim(),r=new Map;for(const d of n){const f=d.indexOf(":");if(f<0)continue;const p=d.slice(0,f).trim(),m=d.slice(f+1).trim(),g=m.startsWith('"')&&m.endsWith('"')?m.slice(1,-1):m;r.set(p,g)}const o=r.get("etude"),l=r.get("title"),a=r.get("leader"),c=r.get("bytes"),h=r.get("date");if(!o||!l||!a||!c||!h)throw new Error("Codetta README frontmatter is missing required fields.");const u=Number(c);if(!Number.isFinite(u))throw new Error(`Invalid Codetta byte count: ${c}`);return{frontmatter:{etude:o,title:l,leader:a,bytes:u,date:h},body:s}}const A2=Object.assign({"../../ff/codetta/99bottles/README.md":W1,"../../ff/codetta/catalans-constant/README.md":V1,"../../ff/codetta/collatz/README.md":$1,"../../ff/codetta/e-digits/README.md":U1,"../../ff/codetta/fib/README.md":j1,"../../ff/codetta/fizzbuzz/README.md":K1,"../../ff/codetta/leap-years/README.md":X1,"../../ff/codetta/ln-2/README.md":G1,"../../ff/codetta/pascals-triangle/README.md":Y1,"../../ff/codetta/pi-digits/README.md":J1,"../../ff/codetta/roman-to-arabic/README.md":Q1,"../../ff/codetta/tower-of-hanoi/README.md":Z1}),uu=Object.assign({"../../ff/codetta/99bottles/solution.ffp":e2,"../../ff/codetta/catalans-constant/solution.ffp":t2,"../../ff/codetta/collatz/solution.ffp":n2,"../../ff/codetta/e-digits/solution.ffp":i2,"../../ff/codetta/fib/solution.ffp":s2,"../../ff/codetta/fizzbuzz/solution.ffp":r2,"../../ff/codetta/leap-years/solution.ffp":o2,"../../ff/codetta/ln-2/solution.ffp":l2,"../../ff/codetta/pascals-triangle/solution.ffp":a2,"../../ff/codetta/pi-digits/solution.ffp":c2,"../../ff/codetta/roman-to-arabic/solution.ffp":h2,"../../ff/codetta/tower-of-hanoi/solution.ffp":u2}),T2=Object.assign({"../../ff/codetta/99bottles/solution.out":d2,"../../ff/codetta/catalans-constant/solution.out":f2,"../../ff/codetta/collatz/solution.out":p2,"../../ff/codetta/e-digits/solution.out":m2,"../../ff/codetta/fib/solution.out":g2,"../../ff/codetta/fizzbuzz/solution.out":b2,"../../ff/codetta/leap-years/solution.out":y2,"../../ff/codetta/ln-2/solution.out":w2,"../../ff/codetta/pascals-triangle/solution.out":v2,"../../ff/codetta/pi-digits/solution.out":x2,"../../ff/codetta/roman-to-arabic/solution.out":k2,"../../ff/codetta/tower-of-hanoi/solution.out":_2}),fi=new Map;for(const i of Object.keys(uu)){const e=hu(i,"solution");if(fi.has(e))throw new Error(`Multiple Codetta solutions found for ${e}`);fi.set(e,i)}function M2(i){if(Wo.has(i))throw new Error(`Codetta solution is hidden for ${i}`);const e=fi.get(i);if(!e)throw new Error(`Missing Codetta solution for ${i}`);const t=e.slice(e.lastIndexOf("/")+1);return`/codetta/${i}/${t}`}function du(i){if(Wo.has(i))throw new Error(`Codetta solution is hidden for ${i}`);const e=fi.get(i);if(!e)throw new Error(`Missing Codetta solution for ${i}`);return e.replace(/^\.\.\/\.\.\//,"")}const E2=Object.entries(A2).map(([i,e])=>{const t=hu(i,"README.md"),n=fi.get(t),s=`${S2}/${t}/solution.out`,r=n?uu[n]:void 0,o=T2[s];if(typeof r!="string")throw new Error(`Missing Codetta solution for ${t}`);if(typeof o!="string")throw new Error(`Missing Codetta expected output for ${t}`);const{frontmatter:l,body:a}=C2(e);if(l.etude!==t)throw new Error(`Codetta README etude mismatch for ${t}: ${l.etude}`);return{id:t,title:l.title,leader:l.leader,bytes:l.bytes,date:l.date,description:a,expected:o.trimEnd(),solution:r.trimEnd()}}).filter(i=>!Wo.has(i.id)).sort((i,e)=>i.title.localeCompare(e.title)),pt=E2,B2="https://github.com/Hypercubed/f-flat-minor";function ti(i){return i.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function Sa(i){return`${B2}/edit/main/${du(i)}`}function D2(i){const e=i?Fo(i):0;return`${e} ${e===1?"byte":"bytes"}`}function Wn(i){return i.map(e=>{const t=e.tone&&e.tone!=="default"?` ${e.tone}`:"",n=e.showDot?'<span class="summary-running-dot" aria-hidden="true"></span>':"";return`
      <span class="summary-bar-item">
        <span class="label">${ti(e.label)}</span>
        <span class="value${t}">${n}${ti(e.value)}</span>
      </span>
    `}).join("")}function P2(i){if(pt.length===0)throw new Error("No Codetta entries found.");i.innerHTML=`
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
              <textarea id="codetta-attempt" class="codetta-editor" spellcheck="false"></textarea>
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
            <div class="subtabs" aria-label="Codetta program details">
              <button type="button" class="subtab is-active" data-codetta-detail-tab="output">Output</button>
              <button type="button" class="subtab" data-codetta-detail-tab="bytecode">Bytecode</button>
            </div>
            <div class="detail-panels codetta-detail-panels">
              <pre id="codetta-output" class="console codetta-output detail-panel is-active" data-codetta-detail-panel="output">(Run your attempt to compare output.)</pre>
              <pre id="codetta-bytecode" class="code-block codetta-bytecode detail-panel" data-codetta-detail-panel="bytecode">(Run your attempt to inspect bytecode.)</pre>
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
  `;const e=i.querySelector('[data-screen="list"]'),t=i.querySelector('[data-screen="detail"]'),n=i.querySelector("#codetta-etude-list"),s=i.querySelector("#codetta-back"),r=i.querySelector("#codetta-prev"),o=i.querySelector("#codetta-next"),l=i.querySelector("#codetta-title"),a=i.querySelector("#codetta-description"),c=i.querySelector("#codetta-expected"),h=i.querySelector("#codetta-leader"),u=i.querySelector("#codetta-bytes"),d=i.querySelector("#codetta-date"),f=i.querySelector("#codetta-attempt"),p=i.querySelector("#codetta-load-best"),m=i.querySelector("#codetta-byte-status"),g=i.querySelector("#codetta-run"),b=i.querySelector("#codetta-summary"),k=i.querySelector("#codetta-output"),v=i.querySelector("#codetta-bytecode"),I=i.querySelector("#codetta-bytecode-meta"),C=i.querySelector("#codetta-bytecode-count"),A=i.querySelector("#codetta-result"),x=i.querySelector("#codetta-submit"),D=i.querySelector("#codetta-submit-help"),M=i.querySelector("#codetta-issue-title"),N=i.querySelector("#codetta-issue-body"),L=i.querySelector("#codetta-copy"),P=Array.from(i.querySelectorAll("[data-codetta-detail-tab]")),V=Array.from(i.querySelectorAll("[data-codetta-detail-panel]"));if(!e||!t||!n||!s||!r||!o||!l||!a||!c||!h||!u||!d||!f||!p||!m||!g||!b||!k||!v||!I||!C||!A||!x||!D||!M||!N||!L)throw new Error("Missing Codetta UI elements.");const w={listScreen:e,detailScreen:t,listBody:n,backButton:s,prevButton:r,nextButton:o,title:l,description:a,expected:c,leader:h,bytes:u,date:d,attempt:f,loadBest:p,byteStatus:m,runButton:g,summary:b,output:k,bytecode:v,bytecodeMeta:I,bytecodeCount:C,result:A,submit:x,submitHelp:D,issueTitle:M,issueBody:N,copyButton:L,detailTabs:P,detailPanels:V};let R=pt[0],$=!1,F=null;function G(){$=!1,F=null,w.output.textContent="(Run your attempt to compare output.)",ne(""),oe(),w.byteStatus.textContent="Compiled bytes: run to compute and compare against the current best.",delete w.byteStatus.dataset.tone,w.result.textContent="Status: run required",w.result.dataset.tone="pending"}function U(S){w.detailTabs.forEach(ee=>{const pe=ee.dataset.codettaDetailTab===S;ee.classList.toggle("is-active",pe)}),w.detailPanels.forEach(ee=>{const pe=ee.dataset.codettaDetailPanel===S;ee.classList.toggle("is-active",pe)}),w.bytecodeMeta.hidden=S!=="bytecode"}function ne(S){w.bytecode.textContent=au(S)||"(Run your attempt to inspect bytecode.)",w.bytecodeCount.textContent=D2(S)}function se(S){w.runButton.disabled=S,w.runButton.textContent=S?"Running...":"▶ Run",w.runButton.setAttribute("aria-label",S?"Running Codetta attempt":"Run Codetta attempt")}function oe(){w.summary.innerHTML=Wn([{label:"compile",value:"—",tone:"pending"},{label:"execute",value:"—",tone:"pending"},{label:"vm steps",value:"—",tone:"pending"},{label:"exit",value:"—",tone:"pending"}]),w.summary.dataset.state="idle"}function Y(S){if(F=S,S===null)return w.byteStatus.textContent="Compiled bytes: run to compute and compare against the current best.",delete w.byteStatus.dataset.tone,null;const ee=S-R.bytes;return ee<0?(w.byteStatus.textContent=`Compiled bytes: ${S} ← new record candidate (${Math.abs(ee)} under ${R.bytes})`,w.byteStatus.dataset.tone="good",S):ee===0?(w.byteStatus.textContent=`Compiled bytes: ${S} ← tied with current best (${R.bytes})`,w.byteStatus.dataset.tone="neutral",S):(w.byteStatus.textContent=`Compiled bytes: ${S} ← over current best (${R.bytes})`,w.byteStatus.dataset.tone="bad",S)}function ie(S){return pt.findIndex(ee=>ee.id===S.id)}function X(){const S=ie(R);w.prevButton.disabled=S<=0,w.nextButton.disabled=S===-1||S>=pt.length-1}function re(){const S=$&&F!==null&&F<R.bytes;if(w.submit.disabled=!S,w.submitHelp.hidden=!S,!S||F===null){w.issueTitle.textContent="",w.issueBody.value="";return}const ee=Sa(R.id),pe=du(R.id);w.issueTitle.textContent=`Target file: ${pe}`,w.issueBody.value=[ee,"",`GitHub edit target: ${pe}`,`Current winning score: ${R.bytes} bytes`,`Your verified score: ${F} bytes`,"","After committing the file edit in GitHub:","1. Choose Create pull request.","2. Use the Codetta PR template.","3. Include validation notes and the new byte count."].join(`
`)}function Fe(){w.listBody.innerHTML=pt.map(S=>`
      <tr data-etude-id="${S.id}" role="button" tabindex="0">
        <td>› ${ti(S.title)}</td>
        <td>${ti(S.leader)}</td>
        <td>${S.bytes}</td>
        <td>${ti(S.date)}</td>
      </tr>
    `).join("")}function Be(S){R=S,w.title.textContent=S.title,w.description.textContent=S.description,w.expected.textContent=S.expected,w.leader.textContent=S.leader,w.bytes.textContent=String(S.bytes),w.date.textContent=S.date,w.attempt.value=S.solution,U("output"),G(),re(),X(),w.listScreen.hidden=!0,w.detailScreen.hidden=!1}function He(){w.detailScreen.hidden=!0,w.listScreen.hidden=!1}Fe(),oe(),se(!1),Be(R),He(),w.detailTabs.forEach(S=>{S.addEventListener("click",()=>{U(S.dataset.codettaDetailTab??"output")})}),w.listBody.addEventListener("click",S=>{const ee=S.target.closest("tr[data-etude-id]");if(!ee)return;const pe=pt.find(ke=>ke.id===ee.getAttribute("data-etude-id"));pe&&Be(pe)}),w.listBody.addEventListener("keydown",S=>{if(S.key!=="Enter"&&S.key!==" ")return;const ee=S.target.closest("tr[data-etude-id]");if(!ee)return;const pe=pt.find(ke=>ke.id===ee.getAttribute("data-etude-id"));pe&&(S.preventDefault(),Be(pe))}),w.backButton.addEventListener("click",He),w.prevButton.addEventListener("click",()=>{const S=ie(R);S<=0||Be(pt[S-1])}),w.nextButton.addEventListener("click",()=>{const S=ie(R);S===-1||S>=pt.length-1||Be(pt[S+1])}),w.loadBest.addEventListener("click",()=>{w.attempt.value=R.solution,G(),re()}),w.attempt.addEventListener("input",()=>{G(),re()}),w.runButton.addEventListener("click",async()=>{Io(w.runButton),se(!0),w.summary.dataset.state="running",w.summary.innerHTML=Wn([{label:"compile",value:"Running...",tone:"running",showDot:!0},{label:"execute",value:"…",tone:"pending"},{label:"vm steps",value:"…",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]);try{const S=await Ho(w.attempt.value,"",!0,{filename:M2(R.id),onProgress:({vmCyclesExecuted:je,compileMs:Ke,executeElapsedMs:Ze,bytecode:ct})=>{ct!==void 0&&ne(ct),w.summary.innerHTML=Wn([{label:"compile",value:Ke!==void 0?`${Ke.toFixed(2)} ms`:"…",tone:"running"},{label:"execute",value:Ze!==void 0?`${Ze.toFixed(2)} ms`:"…",tone:"running",showDot:!0},{label:"vm steps",value:On(je),tone:"running"},{label:"exit",value:"pending",tone:"pending"}])}}),ee=S.terminal==="cancelled"?"cancelled":S.terminal==="error"?"error":String(S.exitCode),pe=S.terminal==="cancelled"?"pending":S.terminal==="error"?"error":S.exitCode===0?"success":"error";if(w.summary.dataset.state="idle",w.summary.innerHTML=Wn([{label:"compile",value:`${S.compileMs.toFixed(2)} ms`},{label:"execute",value:`${S.executeMs.toFixed(2)} ms`},{label:"vm steps",value:S.vmCyclesExecuted!==void 0?On(S.vmCyclesExecuted):"—"},{label:"exit",value:ee,tone:pe}]),ne(S.bytecode),Y(S.compiledBytes),S.terminal==="error"){$=!1,w.output.textContent=S.logs.join(`
`)||"Run failed.",w.result.textContent="Status: error",w.result.dataset.tone="bad",re();return}const ke=S.output.trimEnd(),at=R.expected.trimEnd();$=ke===at,w.output.textContent=ke||"(no output)",w.result.textContent=$?"✓ Output matches expected":"✗ Output does not match expected",w.result.dataset.tone=$?"good":"bad",re()}catch(S){$=!1,F=null,w.output.textContent=S instanceof Error?S.message:String(S),ne(""),Y(null),w.summary.dataset.state="idle",w.summary.innerHTML=Wn([{label:"compile",value:"failed",tone:"error"},{label:"execute",value:"—",tone:"pending"},{label:"vm steps",value:"—",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),w.result.textContent="Status: error",w.result.dataset.tone="bad",re()}finally{zo(),se(!1)}}),w.submit.addEventListener("click",()=>{w.submit.disabled||window.location.assign(Sa(R.id))}),w.copyButton.addEventListener("click",async()=>{const S=w.issueBody.value;try{await navigator.clipboard.writeText(S),w.copyButton.textContent="Copied!",window.setTimeout(()=>{w.copyButton.textContent="Copy"},1200)}catch{w.issueBody.focus(),w.issueBody.select()}})}var Te=Uint8Array,$e=Uint16Array,Vo=Int32Array,Cs=new Te([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),As=new Te([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),to=new Te([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),fu=function(i,e){for(var t=new $e(31),n=0;n<31;++n)t[n]=e+=1<<i[n-1];for(var s=new Vo(t[30]),n=1;n<30;++n)for(var r=t[n];r<t[n+1];++r)s[r]=r-t[n]<<5|n;return{b:t,r:s}},pu=fu(Cs,2),mu=pu.b,no=pu.r;mu[28]=258,no[258]=28;var gu=fu(As,0),O2=gu.b,Ca=gu.r,io=new $e(32768);for(var he=0;he<32768;++he){var Lt=(he&43690)>>1|(he&21845)<<1;Lt=(Lt&52428)>>2|(Lt&13107)<<2,Lt=(Lt&61680)>>4|(Lt&3855)<<4,io[he]=((Lt&65280)>>8|(Lt&255)<<8)>>1}var _t=(function(i,e,t){for(var n=i.length,s=0,r=new $e(e);s<n;++s)i[s]&&++r[i[s]-1];var o=new $e(e);for(s=1;s<e;++s)o[s]=o[s-1]+r[s-1]<<1;var l;if(t){l=new $e(1<<e);var a=15-e;for(s=0;s<n;++s)if(i[s])for(var c=s<<4|i[s],h=e-i[s],u=o[i[s]-1]++<<h,d=u|(1<<h)-1;u<=d;++u)l[io[u]>>a]=c}else for(l=new $e(n),s=0;s<n;++s)i[s]&&(l[s]=io[o[i[s]-1]++]>>15-i[s]);return l}),Ut=new Te(288);for(var he=0;he<144;++he)Ut[he]=8;for(var he=144;he<256;++he)Ut[he]=9;for(var he=256;he<280;++he)Ut[he]=7;for(var he=280;he<288;++he)Ut[he]=8;var pi=new Te(32);for(var he=0;he<32;++he)pi[he]=5;var L2=_t(Ut,9,0),R2=_t(Ut,9,1),I2=_t(pi,5,0),z2=_t(pi,5,1),rr=function(i){for(var e=i[0],t=1;t<i.length;++t)i[t]>e&&(e=i[t]);return e},tt=function(i,e,t){var n=e/8|0;return(i[n]|i[n+1]<<8)>>(e&7)&t},or=function(i,e){var t=e/8|0;return(i[t]|i[t+1]<<8|i[t+2]<<16)>>(e&7)},$o=function(i){return(i+7)/8|0},bu=function(i,e,t){return(t==null||t>i.length)&&(t=i.length),new Te(i.subarray(e,t))},q2=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Tt=function(i,e,t){var n=new Error(e||q2[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,Tt),!t)throw n;return n},N2=function(i,e,t,n){var s=i.length,r=0;if(!s||e.f&&!e.l)return t||new Te(0);var o=!t,l=o||e.i!=2,a=e.i;o&&(t=new Te(s*3));var c=function(ee){var pe=t.length;if(ee>pe){var ke=new Te(Math.max(pe*2,ee));ke.set(t),t=ke}},h=e.f||0,u=e.p||0,d=e.b||0,f=e.l,p=e.d,m=e.m,g=e.n,b=s*8;do{if(!f){h=tt(i,u,1);var k=tt(i,u+1,3);if(u+=3,k)if(k==1)f=R2,p=z2,m=9,g=5;else if(k==2){var A=tt(i,u,31)+257,x=tt(i,u+10,15)+4,D=A+tt(i,u+5,31)+1;u+=14;for(var M=new Te(D),N=new Te(19),L=0;L<x;++L)N[to[L]]=tt(i,u+L*3,7);u+=x*3;for(var P=rr(N),V=(1<<P)-1,w=_t(N,P,1),L=0;L<D;){var R=w[tt(i,u,V)];u+=R&15;var v=R>>4;if(v<16)M[L++]=v;else{var $=0,F=0;for(v==16?(F=3+tt(i,u,3),u+=2,$=M[L-1]):v==17?(F=3+tt(i,u,7),u+=3):v==18&&(F=11+tt(i,u,127),u+=7);F--;)M[L++]=$}}var G=M.subarray(0,A),U=M.subarray(A);m=rr(G),g=rr(U),f=_t(G,m,1),p=_t(U,g,1)}else Tt(1);else{var v=$o(u)+4,I=i[v-4]|i[v-3]<<8,C=v+I;if(C>s){a&&Tt(0);break}l&&c(d+I),t.set(i.subarray(v,C),d),e.b=d+=I,e.p=u=C*8,e.f=h;continue}if(u>b){a&&Tt(0);break}}l&&c(d+131072);for(var ne=(1<<m)-1,se=(1<<g)-1,oe=u;;oe=u){var $=f[or(i,u)&ne],Y=$>>4;if(u+=$&15,u>b){a&&Tt(0);break}if($||Tt(2),Y<256)t[d++]=Y;else if(Y==256){oe=u,f=null;break}else{var ie=Y-254;if(Y>264){var L=Y-257,X=Cs[L];ie=tt(i,u,(1<<X)-1)+mu[L],u+=X}var re=p[or(i,u)&se],Fe=re>>4;re||Tt(3),u+=re&15;var U=O2[Fe];if(Fe>3){var X=As[Fe];U+=or(i,u)&(1<<X)-1,u+=X}if(u>b){a&&Tt(0);break}l&&c(d+131072);var Be=d+ie;if(d<U){var He=r-U,S=Math.min(U,Be);for(He+d<0&&Tt(3);d<S;++d)t[d]=n[He+d]}for(;d<Be;++d)t[d]=t[d-U]}}e.l=f,e.p=oe,e.b=d,e.f=h,f&&(h=1,e.m=m,e.d=p,e.n=g)}while(!h);return d!=t.length&&o?bu(t,0,d):t.subarray(0,d)},At=function(i,e,t){t<<=e&7;var n=e/8|0;i[n]|=t,i[n+1]|=t>>8},Vn=function(i,e,t){t<<=e&7;var n=e/8|0;i[n]|=t,i[n+1]|=t>>8,i[n+2]|=t>>16},lr=function(i,e){for(var t=[],n=0;n<i.length;++n)i[n]&&t.push({s:n,f:i[n]});var s=t.length,r=t.slice();if(!s)return{t:wu,l:0};if(s==1){var o=new Te(t[0].s+1);return o[t[0].s]=1,{t:o,l:1}}t.sort(function(C,A){return C.f-A.f}),t.push({s:-1,f:25001});var l=t[0],a=t[1],c=0,h=1,u=2;for(t[0]={s:-1,f:l.f+a.f,l,r:a};h!=s-1;)l=t[t[c].f<t[u].f?c++:u++],a=t[c!=h&&t[c].f<t[u].f?c++:u++],t[h++]={s:-1,f:l.f+a.f,l,r:a};for(var d=r[0].s,n=1;n<s;++n)r[n].s>d&&(d=r[n].s);var f=new $e(d+1),p=so(t[h-1],f,0);if(p>e){var n=0,m=0,g=p-e,b=1<<g;for(r.sort(function(A,x){return f[x.s]-f[A.s]||A.f-x.f});n<s;++n){var k=r[n].s;if(f[k]>e)m+=b-(1<<p-f[k]),f[k]=e;else break}for(m>>=g;m>0;){var v=r[n].s;f[v]<e?m-=1<<e-f[v]++-1:++n}for(;n>=0&&m;--n){var I=r[n].s;f[I]==e&&(--f[I],++m)}p=e}return{t:new Te(f),l:p}},so=function(i,e,t){return i.s==-1?Math.max(so(i.l,e,t+1),so(i.r,e,t+1)):e[i.s]=t},Aa=function(i){for(var e=i.length;e&&!i[--e];);for(var t=new $e(++e),n=0,s=i[0],r=1,o=function(a){t[n++]=a},l=1;l<=e;++l)if(i[l]==s&&l!=e)++r;else{if(!s&&r>2){for(;r>138;r-=138)o(32754);r>2&&(o(r>10?r-11<<5|28690:r-3<<5|12305),r=0)}else if(r>3){for(o(s),--r;r>6;r-=6)o(8304);r>2&&(o(r-3<<5|8208),r=0)}for(;r--;)o(s);r=1,s=i[l]}return{c:t.subarray(0,n),n:e}},$n=function(i,e){for(var t=0,n=0;n<e.length;++n)t+=i[n]*e[n];return t},yu=function(i,e,t){var n=t.length,s=$o(e+2);i[s]=n&255,i[s+1]=n>>8,i[s+2]=i[s]^255,i[s+3]=i[s+1]^255;for(var r=0;r<n;++r)i[s+r+4]=t[r];return(s+4+n)*8},Ta=function(i,e,t,n,s,r,o,l,a,c,h){At(e,h++,t),++s[256];for(var u=lr(s,15),d=u.t,f=u.l,p=lr(r,15),m=p.t,g=p.l,b=Aa(d),k=b.c,v=b.n,I=Aa(m),C=I.c,A=I.n,x=new $e(19),D=0;D<k.length;++D)++x[k[D]&31];for(var D=0;D<C.length;++D)++x[C[D]&31];for(var M=lr(x,7),N=M.t,L=M.l,P=19;P>4&&!N[to[P-1]];--P);var V=c+5<<3,w=$n(s,Ut)+$n(r,pi)+o,R=$n(s,d)+$n(r,m)+o+14+3*P+$n(x,N)+2*x[16]+3*x[17]+7*x[18];if(a>=0&&V<=w&&V<=R)return yu(e,h,i.subarray(a,a+c));var $,F,G,U;if(At(e,h,1+(R<w)),h+=2,R<w){$=_t(d,f,0),F=d,G=_t(m,g,0),U=m;var ne=_t(N,L,0);At(e,h,v-257),At(e,h+5,A-1),At(e,h+10,P-4),h+=14;for(var D=0;D<P;++D)At(e,h+3*D,N[to[D]]);h+=3*P;for(var se=[k,C],oe=0;oe<2;++oe)for(var Y=se[oe],D=0;D<Y.length;++D){var ie=Y[D]&31;At(e,h,ne[ie]),h+=N[ie],ie>15&&(At(e,h,Y[D]>>5&127),h+=Y[D]>>12)}}else $=L2,F=Ut,G=I2,U=pi;for(var D=0;D<l;++D){var X=n[D];if(X>255){var ie=X>>18&31;Vn(e,h,$[ie+257]),h+=F[ie+257],ie>7&&(At(e,h,X>>23&31),h+=Cs[ie]);var re=X&31;Vn(e,h,G[re]),h+=U[re],re>3&&(Vn(e,h,X>>5&8191),h+=As[re])}else Vn(e,h,$[X]),h+=F[X]}return Vn(e,h,$[256]),h+F[256]},F2=new Vo([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),wu=new Te(0),H2=function(i,e,t,n,s,r){var o=r.z||i.length,l=new Te(n+o+5*(1+Math.ceil(o/7e3))+s),a=l.subarray(n,l.length-s),c=r.l,h=(r.r||0)&7;if(e){h&&(a[0]=r.r>>3);for(var u=F2[e-1],d=u>>13,f=u&8191,p=(1<<t)-1,m=r.p||new $e(32768),g=r.h||new $e(p+1),b=Math.ceil(t/3),k=2*b,v=function(at){return(i[at]^i[at+1]<<b^i[at+2]<<k)&p},I=new Vo(25e3),C=new $e(288),A=new $e(32),x=0,D=0,M=r.i||0,N=0,L=r.w||0,P=0;M+2<o;++M){var V=v(M),w=M&32767,R=g[V];if(m[w]=R,g[V]=w,L<=M){var $=o-M;if((x>7e3||N>24576)&&($>423||!c)){h=Ta(i,a,0,I,C,A,D,N,P,M-P,h),N=x=D=0,P=M;for(var F=0;F<286;++F)C[F]=0;for(var F=0;F<30;++F)A[F]=0}var G=2,U=0,ne=f,se=w-R&32767;if($>2&&V==v(M-se))for(var oe=Math.min(d,$)-1,Y=Math.min(32767,M),ie=Math.min(258,$);se<=Y&&--ne&&w!=R;){if(i[M+G]==i[M+G-se]){for(var X=0;X<ie&&i[M+X]==i[M+X-se];++X);if(X>G){if(G=X,U=se,X>oe)break;for(var re=Math.min(se,X-2),Fe=0,F=0;F<re;++F){var Be=M-se+F&32767,He=m[Be],S=Be-He&32767;S>Fe&&(Fe=S,R=Be)}}}w=R,R=m[w],se+=w-R&32767}if(U){I[N++]=268435456|no[G]<<18|Ca[U];var ee=no[G]&31,pe=Ca[U]&31;D+=Cs[ee]+As[pe],++C[257+ee],++A[pe],L=M+G,++x}else I[N++]=i[M],++C[i[M]]}}for(M=Math.max(M,L);M<o;++M)I[N++]=i[M],++C[i[M]];h=Ta(i,a,c,I,C,A,D,N,P,M-P,h),c||(r.r=h&7|a[h/8|0]<<3,h-=7,r.h=g,r.p=m,r.i=M,r.w=L)}else{for(var M=r.w||0;M<o+c;M+=65535){var ke=M+65535;ke>=o&&(a[h/8|0]=c,ke=o),h=yu(a,h+1,i.subarray(M,ke))}r.i=o}return bu(l,0,n+$o(h)+s)},W2=function(i,e,t,n,s){if(!s&&(s={l:1},e.dictionary)){var r=e.dictionary.subarray(-32768),o=new Te(r.length+i.length);o.set(r),o.set(i,r.length),i=o,s.w=r.length}return H2(i,e.level==null?6:e.level,e.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(i.length)))*1.5):20:12+e.mem,t,n,s)};function V2(i,e){return W2(i,e||{},0,0)}function $2(i,e){return N2(i,{i:2},e,e)}var U2=typeof TextDecoder<"u"&&new TextDecoder,j2=0;try{U2.decode(wu,{stream:!0}),j2=1}catch{}const vu=new TextEncoder,xu=new TextDecoder,ro="txt.",oo="b64.",lo="c64.",Ma="bc.",K2=45,X2=70;function G2(i){for(let e=0;e<i.length;e+=1)if(i.charCodeAt(e)>127)return!1;return!0}function ku(i){let e="";for(const t of i)e+=String.fromCharCode(t);return btoa(e).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function _u(i){const e=i.replaceAll("-","+").replaceAll("_","/"),t=e.padEnd(Math.ceil(e.length/4)*4,"="),n=atob(t);return Uint8Array.from(n,s=>s.charCodeAt(0))}function Y2(i){return ku(vu.encode(i))}function J2(i){return xu.decode(_u(i))}function Q2(i){const e=V2(vu.encode(i),{level:9});return ku(e)}function Z2(i){const e=_u(i);return xu.decode($2(e))}function eb(i){return i.map(e=>e.op!==W.push?e:{...e,meta:{...e.meta,pointer:!0}})}function tb(i){const e=i.replaceAll(" ","+").replaceAll("-","+").replaceAll("_","/"),t=eb(n1(di.fromBase64(e)));return Qh(t)}const nb={encodeText(i){return`${ro}${i}`},encodeBase64(i){return`${oo}${Y2(i)}`},encodeCompressed(i){return`${lo}${Q2(i)}`}};function Ni(i,e){try{return e(i)}catch{return null}}function ib(i,e){const t={...nb,...e},n=G2(i),s=n&&i.length<=K2,r=i.length>=X2;if(s)return Ni(i,t.encodeText);if(r){const l=Ni(i,t.encodeCompressed);if(l!==null)return l}const o=Ni(i,t.encodeBase64);return o!==null?o:n?Ni(i,t.encodeText):null}function sb(i){if(i===null)return null;if(i.startsWith(ro))return i.slice(ro.length);if(i.startsWith(oo)){const e=i.slice(oo.length);try{return J2(e)}catch{return null}}if(i.startsWith(lo)){const e=i.slice(lo.length);try{return Z2(e)}catch{return null}}if(i.startsWith(Ma)){const e=i.slice(Ma.length);try{return tb(e)}catch{return null}}return null}function De(i){return i.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function ae(i,e){const t=i.querySelector(e);if(!t)throw new Error(`Missing required element: ${e}`);return t}function dn(i){i.scrollTop=i.scrollHeight}function rb(i){const e=i?Fo(i):0;return`${e} ${e===1?"byte":"bytes"}`}function ar(){return new Promise(i=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>i())})})}function Un(i){return i.map(e=>{const t=e.tone&&e.tone!=="default"?` ${e.tone}`:"",n=e.showDot?'<span class="summary-running-dot" aria-hidden="true"></span>':"";return`
      <span class="summary-bar-item">
        <span class="label">${e.label}</span>
        <span class="value${t}">${n}${De(e.value)}</span>
      </span>
    `}).join("")}function ob(){return I1.replace("{{EXAMPLE_OPTIONS}}",z0).replace("{{HELP_HTML}}",z1)}function lb(i){var jo;i.innerHTML=ob();const e=ae(i,"#run-feedback-toggle");e.addEventListener("click",()=>{yg(),la(e)}),la(e);const t=ae(i,"#source"),n=ae(i,"#stdin"),s=ae(i,"#optimize"),r=ae(i,"#example"),o=ae(i,"#run"),l=ae(i,"#summary"),a=ae(i,"#output"),c=ae(i,"#error"),h=ae(i,"#preprocessed"),u=ae(i,"#ir"),d=ae(i,"#bytecode"),f=ae(i,"#bytecode-meta"),p=ae(i,"#bytecode-count"),m=ae(i,"#repl-command"),g=ae(i,"#repl-reset"),b=ae(i,"#repl-status"),k=ae(i,"#repl-output"),v=ae(i,"#repl-stack"),I=ae(i,"#repl-depth"),C=ae(i,"#repl-inspect"),A=ae(i,"#repl-inspect-back"),x=ae(i,"#repl-inspect-close"),D=ae(i,"#repl-inspect-content"),M=ae(i,"#tutorial-root"),N=ae(i,"#codetta-root"),L=Array.from(i.querySelectorAll(".mode-tab")),P=Array.from(i.querySelectorAll(".tab-panel")),V=Array.from(i.querySelectorAll(".subtab")),w=Array.from(i.querySelectorAll(".detail-panel")),R=new URLSearchParams(Zr(window.location).replace(/^\?/,"")),$=sb(R.get("code")),F=R.get("example");let G=da,U=I0;$!=null?(G=$,U=Xn):F!==null&&F in Gi&&(G=Gi[F],U=F);let ne=nr(window.location.hash),se=!1;const oe=Xh(t,G,{extraExtensions:[Kh],onDocumentChange:()=>{se||(r.value=Xn,re())}});r.value=U;const Y=ha(h,""),ie=ha(u,"");function X(T){r.disabled=T,n.disabled=T,s.disabled=T,o.textContent=T?"Cancel":"Run Program",o.setAttribute("aria-label",T?"Cancel run":"Run program"),o.classList.toggle("is-cancel",T),l.dataset.state=T?"running":"idle"}function re(){let T=null,B=null;if(ne==="playground")if(r.value===Xn){const Rn=oe.getValue();if(Rn&&(T=ib(Rn),T===null))return}else B=r.value;const J=F0({pathname:window.location.pathname,search:Zr(window.location),tab:ne,codeParam:T,exampleParam:B}),ue=`${window.location.pathname}${window.location.hash}`;J!==ue&&window.history.replaceState(window.history.state,"",J)}function Fe(T){ne=nr(T),document.body.dataset.mode=ne,L.forEach(B=>{const J=B.dataset.tab===ne;B.classList.toggle("is-active",J)}),P.forEach(B=>{const J=B.dataset.panel===ne;B.classList.toggle("is-active",J)})}function Be(T){V.forEach(B=>{const J=B.dataset.detailTab===T;B.classList.toggle("is-active",J)}),w.forEach(B=>{const J=B.dataset.detailPanel===T;B.classList.toggle("is-active",J)}),f.hidden=T!=="bytecode"}function He(T){d.innerHTML=De(au(T)),p.textContent=rb(T)}L.forEach(T=>{T.addEventListener("click",()=>{const B=nr(T.dataset.tab);if(B===ne){re();return}window.location.hash=B})});function S(){Fe(window.location.hash),re()}window.addEventListener("hashchange",S),S(),V.forEach(T=>{T.addEventListener("click",()=>{Be(T.dataset.detailTab??"output")})}),Be(((jo=V.find(T=>T.classList.contains("is-active")))==null?void 0:jo.dataset.detailTab)??"output");let ee=null;async function pe(){document.body.dataset.ready="false",X(!0),l.innerHTML=Un([{label:"compile",value:"Running...",tone:"running",showDot:!0},{label:"execute",value:"…",tone:"pending"},{label:"vm steps",value:"…",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),c.textContent="";const T=new AbortController;ee=T,await ar();try{const B=await Ho(oe.getValue(),n.value,s.checked,{signal:T.signal,onProgress:({vmCyclesExecuted:Eu,compileMs:Ko,executeElapsedMs:Xo,preprocessed:Go,ir:Bu,bytecode:Du})=>{Go!==void 0&&(Y.setValue(Go),ie.setValue(Bu??""),He(Du??"")),l.innerHTML=Un([{label:"compile",value:Ko!==void 0?`${Ko.toFixed(2)} ms`:"…",tone:"running"},{label:"execute",value:Xo!==void 0?`${Xo.toFixed(2)} ms`:"…",tone:"running",showDot:!0},{label:"vm steps",value:On(Eu),tone:"running"},{label:"exit",value:"pending",tone:"pending"}])}}),J=B.issues.length,ue=[];B.output&&ue.push(B.output.trimEnd()),B.logs.length&&ue.push(B.logs.join(`
`));const Ps=[ue.length?ue.join(`
`):"(no output)",J?`

${J} compiler issue(s):
${B.issues.join(`
`)}`:""].join(""),Os=B.terminal==="cancelled"?"cancelled":B.terminal==="error"?"error":String(B.exitCode),Ls=B.terminal==="cancelled"?"pending":B.terminal==="error"?"error":B.exitCode===0?"success":"error",Mu=[{label:"compile",value:`${B.compileMs.toFixed(2)} ms`},{label:"execute",value:`${B.executeMs.toFixed(2)} ms`},{label:"vm steps",value:B.vmCyclesExecuted!==void 0?On(B.vmCyclesExecuted):"—"},{label:"exit",value:Os,tone:Ls}];l.innerHTML=Un(Mu),B.terminal==="error"?(a.innerHTML="",c.innerHTML=De(B.logs.join(`
`)||"Run failed."),Y.setValue(""),ie.setValue(""),He(""),dn(c)):(a.innerHTML=De(Ps),c.textContent="",Y.setValue(B.preprocessed),ie.setValue(B.ir),He(B.bytecode),dn(a))}catch(B){const J=B instanceof Error?B.message:String(B);l.innerHTML=Un([{label:"compile",value:"failed",tone:"error"},{label:"execute",value:"—",tone:"pending"},{label:"vm steps",value:"—",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),a.innerHTML="",c.innerHTML=De(J),Y.setValue(""),ie.setValue(""),He(""),dn(c)}finally{ee=null,zo(),X(!1),document.body.dataset.ready="true"}}function ke(){l.innerHTML=Un([{label:"compile",value:"—",tone:"pending"},{label:"execute",value:"—",tone:"pending"},{label:"vm steps",value:"—",tone:"pending"},{label:"exit",value:"—",tone:"pending"}]),l.dataset.state="idle",a.innerHTML=De("(Click Run Program to execute.)"),c.textContent="",Y.setValue(""),ie.setValue(""),He(""),document.body.dataset.ready="true"}const at=new R1,je=["Core library loaded. Try defining words, evaluating quotes, or printing values."],Ke=[];let Ze=-1;const ct=[];let et=-1,Ts,Ms=!1;function wi(T){Ms=T,m.disabled=T,g.disabled=T,b.hidden=!T,b.setAttribute("aria-hidden",String(!T))}function Cu(T){const B=T.trim();return B.length>0&&![".clear",".exit",".quit"].includes(B)}function Es(T){if(I.textContent=`depth: ${T.length}`,!T.length){v.innerHTML='<li class="repl-stack-empty">(empty stack)</li>',dn(v);return}v.innerHTML=T.map(B=>`
          <li class="repl-stack-row" data-value="${De(B.value)}">
            <span class="repl-stack-index">${B.index}:</span>
            <code class="repl-stack-value">${De(B.value)}</code>
          </li>
        `).join(""),dn(v)}function Bs(){k.innerHTML=De(je.join(`

`)),dn(k)}async function Au(){if(Ms)return;const T=m.value,B=Cu(T);B&&(wi(!0),await ar());try{const J=at.execute(T);J.clearTranscript&&je.splice(0,je.length),T.trim()&&(Ke.push(T),Ze=Ke.length),je.push(`ff> ${T}`),J.output.trim()&&je.push(J.output.trimEnd()),J.logs.length&&je.push(J.logs.join(`
`)),J.error&&(je.push(`Error: ${J.error}`),v.classList.add("is-error"),Ts!==void 0&&window.clearTimeout(Ts),Ts=window.setTimeout(()=>{v.classList.remove("is-error")},500)),je.push(`[ ${J.stack.map(ue=>ue.value).join(" ")} ]`),Es(J.stack),Bs(),m.value=""}finally{B&&wi(!1),m.focus()}}function Ds(T){if(T===null){C.classList.remove("is-visible");return}const B=[],J=et>0;if(B.push('<div class="inspect-header">'),B.push(`<code class="inspect-value">${De(String(T.value))}</code>`),T.name&&B.push(`<span class="inspect-name-label">KNOWN AS:</span><span class="inspect-name-value">${De(T.name)}</span>`),T.isSystem)B.push('<span class="inspect-tag system">system</span>');else if(T.isDefined){const ue=!T.name&&T.value>255n;B.push(`<span class="inspect-tag ${ue?"quote":"user"}">${ue?"quote":"user-defined"}</span>`)}if(B.push("</div>"),T.isSystem&&(T.stackEffect||T.description)&&(B.push('<div class="inspect-vocabulary">'),T.stackEffect&&B.push(`<div class="inspect-stack-effect"><code>${De(T.stackEffect)}</code></div>`),T.description&&B.push(`<div class="inspect-description">${De(T.description)}</div>`),B.push("</div>")),T.definition&&T.definition.length>0){B.push('<div class="inspect-label">Definition:</div>'),B.push('<div class="inspect-definition">');for(const ue of T.definition){const Rn=ue.name??String(ue.value),Ps=ue.isCall?"token-call":"token-literal",Os=ue.isCall||ue.isDefined?"inspectable":"",Ls=ue.isCall||ue.isDefined?"Click to inspect":"Literal value";B.push(`<span class="inspect-token ${Ps} ${Os}" data-value="${De(String(ue.value))}" title="${Ls}">${De(Rn)}</span>`)}B.push("</div>")}else!T.isSystem&&!T.isDefined&&B.push('<div class="inspect-note">Plain value (not a word)</div>');D.innerHTML=B.join(""),A.disabled=!J,x.style.display="inline-block",C.classList.add("is-visible")}function Uo(T){et<ct.length-1&&ct.splice(et+1),ct.push(T),et++,Ds(T)}function Tu(){et>0?(et--,Ds(ct[et])):et===0&&(ct.length=0,et=-1,Ds(null))}r.addEventListener("change",()=>{if(r.value===Xn){re(),ke();return}se=!0,oe.setValue(Gi[r.value]??da),se=!1,re(),ke()}),o.addEventListener("click",()=>{if(ee!==null){ee.abort();return}Io(o),re(),pe()}),s.addEventListener("change",()=>{re(),ke()}),m.addEventListener("keydown",T=>{if(_g(m,T),T.key==="Enter"){T.preventDefault(),Au();return}if(T.key==="ArrowUp"){if(T.preventDefault(),!Ke.length)return;Ze=Math.max(0,Ze-1),m.value=Ke[Ze]??"",m.setSelectionRange(m.value.length,m.value.length);return}if(T.key==="ArrowDown"){if(T.preventDefault(),!Ke.length)return;Ze=Math.min(Ke.length,Ze+1),m.value=Ke[Ze]??"",m.setSelectionRange(m.value.length,m.value.length)}}),g.addEventListener("click",async()=>{if(!Ms){wi(!0),await ar();try{at.reset(),je.splice(0,je.length,"Session reset. Prelude reloaded."),Ke.splice(0,Ke.length),Ze=0,Es([]),Bs(),m.value=""}finally{wi(!1),m.focus()}}}),v.addEventListener("click",T=>{const B=T.target.closest(".repl-stack-row");if(!B)return;const J=B.getAttribute("data-value");if(!J)return;const ue=at.inspectValue(J);ct.length=0,et=-1,Uo(ue)}),D.addEventListener("click",T=>{const B=T.target.closest(".inspect-token.inspectable");if(!B)return;const J=B.getAttribute("data-value");if(!J)return;const ue=at.inspectValue(J);Uo(ue)}),A.addEventListener("click",()=>{Tu()}),x.addEventListener("click",()=>{ct.length=0,et=-1,C.classList.remove("is-visible")}),ke(),H1(M),P2(N),Es([]),Bs(),m.focus()}gg();const Su=document.querySelector("#app");if(!Su)throw new Error("Missing #app root");lb(Su);
