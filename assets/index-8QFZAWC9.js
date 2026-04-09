var Dm=Object.defineProperty;var Bm=(n,e,t)=>e in n?Dm(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var qt=(n,e,t)=>Bm(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();let Ho=[],vh=[];(()=>{let n="lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map(e=>e?parseInt(e,36):1);for(let e=0,t=0;e<n.length;e++)(e%2?vh:Ho).push(t=t+n[e])})();function Lm(n){if(n<768)return!1;for(let e=0,t=Ho.length;;){let i=e+t>>1;if(n<Ho[i])t=i;else if(n>=vh[i])e=i+1;else return!0;if(e==t)return!1}}function nu(n){return n>=127462&&n<=127487}const iu=8205;function Om(n,e,t=!0,i=!0){return(t?Sh:Rm)(n,e,i)}function Sh(n,e,t){if(e==n.length)return e;e&&_h(n.charCodeAt(e))&&Ch(n.charCodeAt(e-1))&&e--;let i=Gs(n,e);for(e+=ru(i);e<n.length;){let r=Gs(n,e);if(i==iu||r==iu||t&&Lm(r))e+=ru(r),i=r;else if(nu(r)){let s=0,o=e-2;for(;o>=0&&nu(Gs(n,o));)s++,o-=2;if(s%2==0)break;e+=2}else break}return e}function Rm(n,e,t){for(;e>0;){let i=Sh(n,e-2,t);if(i<e)return i;e--}return 0}function Gs(n,e){let t=n.charCodeAt(e);if(!Ch(t)||e+1==n.length)return t;let i=n.charCodeAt(e+1);return _h(i)?(t-55296<<10)+(i-56320)+65536:t}function _h(n){return n>=56320&&n<57344}function Ch(n){return n>=55296&&n<56320}function ru(n){return n<65536?1:2}class de{lineAt(e){if(e<0||e>this.length)throw new RangeError(`Invalid position ${e} in document of length ${this.length}`);return this.lineInner(e,!1,1,0)}line(e){if(e<1||e>this.lines)throw new RangeError(`Invalid line number ${e} in ${this.lines}-line document`);return this.lineInner(e,!0,1,0)}replace(e,t,i){[e,t]=pi(this,e,t);let r=[];return this.decompose(0,e,r,2),i.length&&i.decompose(0,i.length,r,3),this.decompose(t,this.length,r,1),Kt.from(r,this.length-(t-e)+i.length)}append(e){return this.replace(this.length,this.length,e)}slice(e,t=this.length){[e,t]=pi(this,e,t);let i=[];return this.decompose(e,t,i,0),Kt.from(i,t-e)}eq(e){if(e==this)return!0;if(e.length!=this.length||e.lines!=this.lines)return!1;let t=this.scanIdentical(e,1),i=this.length-this.scanIdentical(e,-1),r=new ji(this),s=new ji(e);for(let o=t,l=t;;){if(r.next(o),s.next(o),o=0,r.lineBreak!=s.lineBreak||r.done!=s.done||r.value!=s.value)return!1;if(l+=r.value.length,r.done||l>=i)return!0}}iter(e=1){return new ji(this,e)}iterRange(e,t=this.length){return new Ah(this,e,t)}iterLines(e,t){let i;if(e==null)i=this.iter();else{t==null&&(t=this.lines+1);let r=this.line(e).from;i=this.iterRange(r,Math.max(r,t==this.lines+1?this.length:t<=1?0:this.line(t-1).to))}return new Th(i)}toString(){return this.sliceString(0)}toJSON(){let e=[];return this.flatten(e),e}constructor(){}static of(e){if(e.length==0)throw new RangeError("A document must have at least one line");return e.length==1&&!e[0]?de.empty:e.length<=32?new Ie(e):Kt.from(Ie.split(e,[]))}}class Ie extends de{constructor(e,t=zm(e)){super(),this.text=e,this.length=t}get lines(){return this.text.length}get children(){return null}lineInner(e,t,i,r){for(let s=0;;s++){let o=this.text[s],l=r+o.length;if((t?i:l)>=e)return new Fm(r,l,i,o);r=l+1,i++}}decompose(e,t,i,r){let s=e<=0&&t>=this.length?this:new Ie(su(this.text,e,t),Math.min(t,this.length)-Math.max(0,e));if(r&1){let o=i.pop(),l=Gr(s.text,o.text.slice(),0,s.length);if(l.length<=32)i.push(new Ie(l,o.length+s.length));else{let a=l.length>>1;i.push(new Ie(l.slice(0,a)),new Ie(l.slice(a)))}}else i.push(s)}replace(e,t,i){if(!(i instanceof Ie))return super.replace(e,t,i);[e,t]=pi(this,e,t);let r=Gr(this.text,Gr(i.text,su(this.text,0,e)),t),s=this.length+i.length-(t-e);return r.length<=32?new Ie(r,s):Kt.from(Ie.split(r,[]),s)}sliceString(e,t=this.length,i=`
`){[e,t]=pi(this,e,t);let r="";for(let s=0,o=0;s<=t&&o<this.text.length;o++){let l=this.text[o],a=s+l.length;s>e&&o&&(r+=i),e<a&&t>s&&(r+=l.slice(Math.max(0,e-s),t-s)),s=a+1}return r}flatten(e){for(let t of this.text)e.push(t)}scanIdentical(){return 0}static split(e,t){let i=[],r=-1;for(let s of e)i.push(s),r+=s.length+1,i.length==32&&(t.push(new Ie(i,r)),i=[],r=-1);return r>-1&&t.push(new Ie(i,r)),t}}class Kt extends de{constructor(e,t){super(),this.children=e,this.length=t,this.lines=0;for(let i of e)this.lines+=i.lines}lineInner(e,t,i,r){for(let s=0;;s++){let o=this.children[s],l=r+o.length,a=i+o.lines-1;if((t?a:l)>=e)return o.lineInner(e,t,i,r);r=l+1,i=a+1}}decompose(e,t,i,r){for(let s=0,o=0;o<=t&&s<this.children.length;s++){let l=this.children[s],a=o+l.length;if(e<=a&&t>=o){let u=r&((o<=e?1:0)|(a>=t?2:0));o>=e&&a<=t&&!u?i.push(l):l.decompose(e-o,t-o,i,u)}o=a+1}}replace(e,t,i){if([e,t]=pi(this,e,t),i.lines<this.lines)for(let r=0,s=0;r<this.children.length;r++){let o=this.children[r],l=s+o.length;if(e>=s&&t<=l){let a=o.replace(e-s,t-s,i),u=this.lines-o.lines+a.lines;if(a.lines<u>>4&&a.lines>u>>6){let c=this.children.slice();return c[r]=a,new Kt(c,this.length-(t-e)+i.length)}return super.replace(s,l,a)}s=l+1}return super.replace(e,t,i)}sliceString(e,t=this.length,i=`
`){[e,t]=pi(this,e,t);let r="";for(let s=0,o=0;s<this.children.length&&o<=t;s++){let l=this.children[s],a=o+l.length;o>e&&s&&(r+=i),e<a&&t>o&&(r+=l.sliceString(e-o,t-o,i)),o=a+1}return r}flatten(e){for(let t of this.children)t.flatten(e)}scanIdentical(e,t){if(!(e instanceof Kt))return 0;let i=0,[r,s,o,l]=t>0?[0,0,this.children.length,e.children.length]:[this.children.length-1,e.children.length-1,-1,-1];for(;;r+=t,s+=t){if(r==o||s==l)return i;let a=this.children[r],u=e.children[s];if(a!=u)return i+a.scanIdentical(u,t);i+=a.length+1}}static from(e,t=e.reduce((i,r)=>i+r.length+1,-1)){let i=0;for(let d of e)i+=d.lines;if(i<32){let d=[];for(let p of e)p.flatten(d);return new Ie(d,t)}let r=Math.max(32,i>>5),s=r<<1,o=r>>1,l=[],a=0,u=-1,c=[];function h(d){let p;if(d.lines>s&&d instanceof Kt)for(let m of d.children)h(m);else d.lines>o&&(a>o||!a)?(f(),l.push(d)):d instanceof Ie&&a&&(p=c[c.length-1])instanceof Ie&&d.lines+p.lines<=32?(a+=d.lines,u+=d.length+1,c[c.length-1]=new Ie(p.text.concat(d.text),p.length+1+d.length)):(a+d.lines>r&&f(),a+=d.lines,u+=d.length+1,c.push(d))}function f(){a!=0&&(l.push(c.length==1?c[0]:Kt.from(c,u)),u=-1,a=c.length=0)}for(let d of e)h(d);return f(),l.length==1?l[0]:new Kt(l,t)}}de.empty=new Ie([""],0);function zm(n){let e=-1;for(let t of n)e+=t.length+1;return e}function Gr(n,e,t=0,i=1e9){for(let r=0,s=0,o=!0;s<n.length&&r<=i;s++){let l=n[s],a=r+l.length;a>=t&&(a>i&&(l=l.slice(0,i-r)),r<t&&(l=l.slice(t-r)),o?(e[e.length-1]+=l,o=!1):e.push(l)),r=a+1}return e}function su(n,e,t){return Gr(n,[""],e,t)}class ji{constructor(e,t=1){this.dir=t,this.done=!1,this.lineBreak=!1,this.value="",this.nodes=[e],this.offsets=[t>0?1:(e instanceof Ie?e.text.length:e.children.length)<<1]}nextInner(e,t){for(this.done=this.lineBreak=!1;;){let i=this.nodes.length-1,r=this.nodes[i],s=this.offsets[i],o=s>>1,l=r instanceof Ie?r.text.length:r.children.length;if(o==(t>0?l:0)){if(i==0)return this.done=!0,this.value="",this;t>0&&this.offsets[i-1]++,this.nodes.pop(),this.offsets.pop()}else if((s&1)==(t>0?0:1)){if(this.offsets[i]+=t,e==0)return this.lineBreak=!0,this.value=`
`,this;e--}else if(r instanceof Ie){let a=r.text[o+(t<0?-1:0)];if(this.offsets[i]+=t,a.length>Math.max(0,e))return this.value=e==0?a:t>0?a.slice(e):a.slice(0,a.length-e),this;e-=a.length}else{let a=r.children[o+(t<0?-1:0)];e>a.length?(e-=a.length,this.offsets[i]+=t):(t<0&&this.offsets[i]--,this.nodes.push(a),this.offsets.push(t>0?1:(a instanceof Ie?a.text.length:a.children.length)<<1))}}}next(e=0){return e<0&&(this.nextInner(-e,-this.dir),e=this.value.length),this.nextInner(e,this.dir)}}class Ah{constructor(e,t,i){this.value="",this.done=!1,this.cursor=new ji(e,t>i?-1:1),this.pos=t>i?e.length:0,this.from=Math.min(t,i),this.to=Math.max(t,i)}nextInner(e,t){if(t<0?this.pos<=this.from:this.pos>=this.to)return this.value="",this.done=!0,this;e+=Math.max(0,t<0?this.pos-this.to:this.from-this.pos);let i=t<0?this.pos-this.from:this.to-this.pos;e>i&&(e=i),i-=e;let{value:r}=this.cursor.next(e);return this.pos+=(r.length+e)*t,this.value=r.length<=i?r:t<0?r.slice(r.length-i):r.slice(0,i),this.done=!this.value,this}next(e=0){return e<0?e=Math.max(e,this.from-this.pos):e>0&&(e=Math.min(e,this.to-this.pos)),this.nextInner(e,this.cursor.dir)}get lineBreak(){return this.cursor.lineBreak&&this.value!=""}}class Th{constructor(e){this.inner=e,this.afterBreak=!0,this.value="",this.done=!1}next(e=0){let{done:t,lineBreak:i,value:r}=this.inner.next(e);return t&&this.afterBreak?(this.value="",this.afterBreak=!1):t?(this.done=!0,this.value=""):i?this.afterBreak?this.value="":(this.afterBreak=!0,this.next()):(this.value=r,this.afterBreak=!1),this}get lineBreak(){return!1}}typeof Symbol<"u"&&(de.prototype[Symbol.iterator]=function(){return this.iter()},ji.prototype[Symbol.iterator]=Ah.prototype[Symbol.iterator]=Th.prototype[Symbol.iterator]=function(){return this});class Fm{constructor(e,t,i,r){this.from=e,this.to=t,this.number=i,this.text=r}get length(){return this.to-this.from}}function pi(n,e,t){return e=Math.max(0,Math.min(n.length,e)),[e,Math.max(e,Math.min(n.length,t))]}function Xe(n,e,t=!0,i=!0){return Om(n,e,t,i)}function Nm(n){return n>=56320&&n<57344}function qm(n){return n>=55296&&n<56320}function Hm(n,e){let t=n.charCodeAt(e);if(!qm(t)||e+1==n.length)return t;let i=n.charCodeAt(e+1);return Nm(i)?(t-55296<<10)+(i-56320)+65536:t}function $m(n){return n<65536?1:2}const $o=/\r\n?|\n/;var wt=(function(n){return n[n.Simple=0]="Simple",n[n.TrackDel=1]="TrackDel",n[n.TrackBefore=2]="TrackBefore",n[n.TrackAfter=3]="TrackAfter",n})(wt||(wt={}));class Jt{constructor(e){this.sections=e}get length(){let e=0;for(let t=0;t<this.sections.length;t+=2)e+=this.sections[t];return e}get newLength(){let e=0;for(let t=0;t<this.sections.length;t+=2){let i=this.sections[t+1];e+=i<0?this.sections[t]:i}return e}get empty(){return this.sections.length==0||this.sections.length==2&&this.sections[1]<0}iterGaps(e){for(let t=0,i=0,r=0;t<this.sections.length;){let s=this.sections[t++],o=this.sections[t++];o<0?(e(i,r,s),r+=s):r+=o,i+=s}}iterChangedRanges(e,t=!1){Wo(this,e,t)}get invertedDesc(){let e=[];for(let t=0;t<this.sections.length;){let i=this.sections[t++],r=this.sections[t++];r<0?e.push(i,r):e.push(r,i)}return new Jt(e)}composeDesc(e){return this.empty?e:e.empty?this:Eh(this,e)}mapDesc(e,t=!1){return e.empty?this:Vo(this,e,t)}mapPos(e,t=-1,i=wt.Simple){let r=0,s=0;for(let o=0;o<this.sections.length;){let l=this.sections[o++],a=this.sections[o++],u=r+l;if(a<0){if(u>e)return s+(e-r);s+=l}else{if(i!=wt.Simple&&u>=e&&(i==wt.TrackDel&&r<e&&u>e||i==wt.TrackBefore&&r<e||i==wt.TrackAfter&&u>e))return null;if(u>e||u==e&&t<0&&!l)return e==r||t<0?s:s+a;s+=a}r=u}if(e>r)throw new RangeError(`Position ${e} is out of range for changeset of length ${r}`);return s}touchesRange(e,t=e){for(let i=0,r=0;i<this.sections.length&&r<=t;){let s=this.sections[i++],o=this.sections[i++],l=r+s;if(o>=0&&r<=t&&l>=e)return r<e&&l>t?"cover":!0;r=l}return!1}toString(){let e="";for(let t=0;t<this.sections.length;){let i=this.sections[t++],r=this.sections[t++];e+=(e?" ":"")+i+(r>=0?":"+r:"")}return e}toJSON(){return this.sections}static fromJSON(e){if(!Array.isArray(e)||e.length%2||e.some(t=>typeof t!="number"))throw new RangeError("Invalid JSON representation of ChangeDesc");return new Jt(e)}static create(e){return new Jt(e)}}class Fe extends Jt{constructor(e,t){super(e),this.inserted=t}apply(e){if(this.length!=e.length)throw new RangeError("Applying change set to a document with the wrong length");return Wo(this,(t,i,r,s,o)=>e=e.replace(r,r+(i-t),o),!1),e}mapDesc(e,t=!1){return Vo(this,e,t,!0)}invert(e){let t=this.sections.slice(),i=[];for(let r=0,s=0;r<t.length;r+=2){let o=t[r],l=t[r+1];if(l>=0){t[r]=l,t[r+1]=o;let a=r>>1;for(;i.length<a;)i.push(de.empty);i.push(o?e.slice(s,s+o):de.empty)}s+=o}return new Fe(t,i)}compose(e){return this.empty?e:e.empty?this:Eh(this,e,!0)}map(e,t=!1){return e.empty?this:Vo(this,e,t,!0)}iterChanges(e,t=!1){Wo(this,e,t)}get desc(){return Jt.create(this.sections)}filter(e){let t=[],i=[],r=[],s=new nr(this);e:for(let o=0,l=0;;){let a=o==e.length?1e9:e[o++];for(;l<a||l==a&&s.len==0;){if(s.done)break e;let c=Math.min(s.len,a-l);je(r,c,-1);let h=s.ins==-1?-1:s.off==0?s.ins:0;je(t,c,h),h>0&&wn(i,t,s.text),s.forward(c),l+=c}let u=e[o++];for(;l<u;){if(s.done)break e;let c=Math.min(s.len,u-l);je(t,c,-1),je(r,c,s.ins==-1?-1:s.off==0?s.ins:0),s.forward(c),l+=c}}return{changes:new Fe(t,i),filtered:Jt.create(r)}}toJSON(){let e=[];for(let t=0;t<this.sections.length;t+=2){let i=this.sections[t],r=this.sections[t+1];r<0?e.push(i):r==0?e.push([i]):e.push([i].concat(this.inserted[t>>1].toJSON()))}return e}static of(e,t,i){let r=[],s=[],o=0,l=null;function a(c=!1){if(!c&&!r.length)return;o<t&&je(r,t-o,-1);let h=new Fe(r,s);l=l?l.compose(h.map(l)):h,r=[],s=[],o=0}function u(c){if(Array.isArray(c))for(let h of c)u(h);else if(c instanceof Fe){if(c.length!=t)throw new RangeError(`Mismatched change set length (got ${c.length}, expected ${t})`);a(),l=l?l.compose(c.map(l)):c}else{let{from:h,to:f=h,insert:d}=c;if(h>f||h<0||f>t)throw new RangeError(`Invalid change range ${h} to ${f} (in doc of length ${t})`);let p=d?typeof d=="string"?de.of(d.split(i||$o)):d:de.empty,m=p.length;if(h==f&&m==0)return;h<o&&a(),h>o&&je(r,h-o,-1),je(r,f-h,m),wn(s,r,p),o=f}}return u(e),a(!l),l}static empty(e){return new Fe(e?[e,-1]:[],[])}static fromJSON(e){if(!Array.isArray(e))throw new RangeError("Invalid JSON representation of ChangeSet");let t=[],i=[];for(let r=0;r<e.length;r++){let s=e[r];if(typeof s=="number")t.push(s,-1);else{if(!Array.isArray(s)||typeof s[0]!="number"||s.some((o,l)=>l&&typeof o!="string"))throw new RangeError("Invalid JSON representation of ChangeSet");if(s.length==1)t.push(s[0],0);else{for(;i.length<r;)i.push(de.empty);i[r]=de.of(s.slice(1)),t.push(s[0],i[r].length)}}}return new Fe(t,i)}static createSet(e,t){return new Fe(e,t)}}function je(n,e,t,i=!1){if(e==0&&t<=0)return;let r=n.length-2;r>=0&&t<=0&&t==n[r+1]?n[r]+=e:r>=0&&e==0&&n[r]==0?n[r+1]+=t:i?(n[r]+=e,n[r+1]+=t):n.push(e,t)}function wn(n,e,t){if(t.length==0)return;let i=e.length-2>>1;if(i<n.length)n[n.length-1]=n[n.length-1].append(t);else{for(;n.length<i;)n.push(de.empty);n.push(t)}}function Wo(n,e,t){let i=n.inserted;for(let r=0,s=0,o=0;o<n.sections.length;){let l=n.sections[o++],a=n.sections[o++];if(a<0)r+=l,s+=l;else{let u=r,c=s,h=de.empty;for(;u+=l,c+=a,a&&i&&(h=h.append(i[o-2>>1])),!(t||o==n.sections.length||n.sections[o+1]<0);)l=n.sections[o++],a=n.sections[o++];e(r,u,s,c,h),r=u,s=c}}}function Vo(n,e,t,i=!1){let r=[],s=i?[]:null,o=new nr(n),l=new nr(e);for(let a=-1;;){if(o.done&&l.len||l.done&&o.len)throw new Error("Mismatched change set lengths");if(o.ins==-1&&l.ins==-1){let u=Math.min(o.len,l.len);je(r,u,-1),o.forward(u),l.forward(u)}else if(l.ins>=0&&(o.ins<0||a==o.i||o.off==0&&(l.len<o.len||l.len==o.len&&!t))){let u=l.len;for(je(r,l.ins,-1);u;){let c=Math.min(o.len,u);o.ins>=0&&a<o.i&&o.len<=c&&(je(r,0,o.ins),s&&wn(s,r,o.text),a=o.i),o.forward(c),u-=c}l.next()}else if(o.ins>=0){let u=0,c=o.len;for(;c;)if(l.ins==-1){let h=Math.min(c,l.len);u+=h,c-=h,l.forward(h)}else if(l.ins==0&&l.len<c)c-=l.len,l.next();else break;je(r,u,a<o.i?o.ins:0),s&&a<o.i&&wn(s,r,o.text),a=o.i,o.forward(o.len-c)}else{if(o.done&&l.done)return s?Fe.createSet(r,s):Jt.create(r);throw new Error("Mismatched change set lengths")}}}function Eh(n,e,t=!1){let i=[],r=t?[]:null,s=new nr(n),o=new nr(e);for(let l=!1;;){if(s.done&&o.done)return r?Fe.createSet(i,r):Jt.create(i);if(s.ins==0)je(i,s.len,0,l),s.next();else if(o.len==0&&!o.done)je(i,0,o.ins,l),r&&wn(r,i,o.text),o.next();else{if(s.done||o.done)throw new Error("Mismatched change set lengths");{let a=Math.min(s.len2,o.len),u=i.length;if(s.ins==-1){let c=o.ins==-1?-1:o.off?0:o.ins;je(i,a,c,l),r&&c&&wn(r,i,o.text)}else o.ins==-1?(je(i,s.off?0:s.len,a,l),r&&wn(r,i,s.textBit(a))):(je(i,s.off?0:s.len,o.off?0:o.ins,l),r&&!o.off&&wn(r,i,o.text));l=(s.ins>a||o.ins>=0&&o.len>a)&&(l||i.length>u),s.forward2(a),o.forward(a)}}}}class nr{constructor(e){this.set=e,this.i=0,this.next()}next(){let{sections:e}=this.set;this.i<e.length?(this.len=e[this.i++],this.ins=e[this.i++]):(this.len=0,this.ins=-2),this.off=0}get done(){return this.ins==-2}get len2(){return this.ins<0?this.len:this.ins}get text(){let{inserted:e}=this.set,t=this.i-2>>1;return t>=e.length?de.empty:e[t]}textBit(e){let{inserted:t}=this.set,i=this.i-2>>1;return i>=t.length&&!e?de.empty:t[i].slice(this.off,e==null?void 0:this.off+e)}forward(e){e==this.len?this.next():(this.len-=e,this.off+=e)}forward2(e){this.ins==-1?this.forward(e):e==this.ins?this.next():(this.ins-=e,this.off+=e)}}class zn{constructor(e,t,i){this.from=e,this.to=t,this.flags=i}get anchor(){return this.flags&32?this.to:this.from}get head(){return this.flags&32?this.from:this.to}get empty(){return this.from==this.to}get assoc(){return this.flags&8?-1:this.flags&16?1:0}get bidiLevel(){let e=this.flags&7;return e==7?null:e}get goalColumn(){let e=this.flags>>6;return e==16777215?void 0:e}map(e,t=-1){let i,r;return this.empty?i=r=e.mapPos(this.from,t):(i=e.mapPos(this.from,1),r=e.mapPos(this.to,-1)),i==this.from&&r==this.to?this:new zn(i,r,this.flags)}extend(e,t=e,i=0){if(e<=this.anchor&&t>=this.anchor)return O.range(e,t,void 0,void 0,i);let r=Math.abs(e-this.anchor)>Math.abs(t-this.anchor)?e:t;return O.range(this.anchor,r,void 0,void 0,i)}eq(e,t=!1){return this.anchor==e.anchor&&this.head==e.head&&this.goalColumn==e.goalColumn&&(!t||!this.empty||this.assoc==e.assoc)}toJSON(){return{anchor:this.anchor,head:this.head}}static fromJSON(e){if(!e||typeof e.anchor!="number"||typeof e.head!="number")throw new RangeError("Invalid JSON representation for SelectionRange");return O.range(e.anchor,e.head)}static create(e,t,i){return new zn(e,t,i)}}class O{constructor(e,t){this.ranges=e,this.mainIndex=t}map(e,t=-1){return e.empty?this:O.create(this.ranges.map(i=>i.map(e,t)),this.mainIndex)}eq(e,t=!1){if(this.ranges.length!=e.ranges.length||this.mainIndex!=e.mainIndex)return!1;for(let i=0;i<this.ranges.length;i++)if(!this.ranges[i].eq(e.ranges[i],t))return!1;return!0}get main(){return this.ranges[this.mainIndex]}asSingle(){return this.ranges.length==1?this:new O([this.main],0)}addRange(e,t=!0){return O.create([e].concat(this.ranges),t?0:this.mainIndex+1)}replaceRange(e,t=this.mainIndex){let i=this.ranges.slice();return i[t]=e,O.create(i,this.mainIndex)}toJSON(){return{ranges:this.ranges.map(e=>e.toJSON()),main:this.mainIndex}}static fromJSON(e){if(!e||!Array.isArray(e.ranges)||typeof e.main!="number"||e.main>=e.ranges.length)throw new RangeError("Invalid JSON representation for EditorSelection");return new O(e.ranges.map(t=>zn.fromJSON(t)),e.main)}static single(e,t=e){return new O([O.range(e,t)],0)}static create(e,t=0){if(e.length==0)throw new RangeError("A selection needs at least one range");for(let i=0,r=0;r<e.length;r++){let s=e[r];if(s.empty?s.from<=i:s.from<i)return O.normalized(e.slice(),t);i=s.to}return new O(e,t)}static cursor(e,t=0,i,r){return zn.create(e,e,(t==0?0:t<0?8:16)|(i==null?7:Math.min(6,i))|(r??16777215)<<6)}static range(e,t,i,r,s){let o=(i??16777215)<<6|(r==null?7:Math.min(6,r));return!s&&e!=t&&(s=t<e?1:-1),t<e?zn.create(t,e,48|o):zn.create(e,t,(s?s<0?8:16:0)|o)}static normalized(e,t=0){let i=e[t];e.sort((r,s)=>r.from-s.from),t=e.indexOf(i);for(let r=1;r<e.length;r++){let s=e[r],o=e[r-1];if(s.empty?s.from<=o.to:s.from<o.to){let l=o.from,a=Math.max(s.to,o.to);r<=t&&t--,e.splice(--r,2,s.anchor>s.head?O.range(a,l):O.range(l,a))}}return new O(e,t)}}function Mh(n,e){for(let t of n.ranges)if(t.to>e)throw new RangeError("Selection points outside of document")}let ea=0;class K{constructor(e,t,i,r,s){this.combine=e,this.compareInput=t,this.compare=i,this.isStatic=r,this.id=ea++,this.default=e([]),this.extensions=typeof s=="function"?s(this):s}get reader(){return this}static define(e={}){return new K(e.combine||(t=>t),e.compareInput||((t,i)=>t===i),e.compare||(e.combine?(t,i)=>t===i:ta),!!e.static,e.enables)}of(e){return new Yr([],this,0,e)}compute(e,t){if(this.isStatic)throw new Error("Can't compute a static facet");return new Yr(e,this,1,t)}computeN(e,t){if(this.isStatic)throw new Error("Can't compute a static facet");return new Yr(e,this,2,t)}from(e,t){return t||(t=i=>i),this.compute([e],i=>t(i.field(e)))}}function ta(n,e){return n==e||n.length==e.length&&n.every((t,i)=>t===e[i])}class Yr{constructor(e,t,i,r){this.dependencies=e,this.facet=t,this.type=i,this.value=r,this.id=ea++}dynamicSlot(e){var t;let i=this.value,r=this.facet.compareInput,s=this.id,o=e[s]>>1,l=this.type==2,a=!1,u=!1,c=[];for(let h of this.dependencies)h=="doc"?a=!0:h=="selection"?u=!0:(((t=e[h.id])!==null&&t!==void 0?t:1)&1)==0&&c.push(e[h.id]);return{create(h){return h.values[o]=i(h),1},update(h,f){if(a&&f.docChanged||u&&(f.docChanged||f.selection)||Uo(h,c)){let d=i(h);if(l?!ou(d,h.values[o],r):!r(d,h.values[o]))return h.values[o]=d,1}return 0},reconfigure:(h,f)=>{let d,p=f.config.address[s];if(p!=null){let m=ls(f,p);if(this.dependencies.every(b=>b instanceof K?f.facet(b)===h.facet(b):b instanceof En?f.field(b,!1)==h.field(b,!1):!0)||(l?ou(d=i(h),m,r):r(d=i(h),m)))return h.values[o]=m,0}else d=i(h);return h.values[o]=d,1}}}}function ou(n,e,t){if(n.length!=e.length)return!1;for(let i=0;i<n.length;i++)if(!t(n[i],e[i]))return!1;return!0}function Uo(n,e){let t=!1;for(let i of e)Ki(n,i)&1&&(t=!0);return t}function Wm(n,e,t){let i=t.map(a=>n[a.id]),r=t.map(a=>a.type),s=i.filter(a=>!(a&1)),o=n[e.id]>>1;function l(a){let u=[];for(let c=0;c<i.length;c++){let h=ls(a,i[c]);if(r[c]==2)for(let f of h)u.push(f);else u.push(h)}return e.combine(u)}return{create(a){for(let u of i)Ki(a,u);return a.values[o]=l(a),1},update(a,u){if(!Uo(a,s))return 0;let c=l(a);return e.compare(c,a.values[o])?0:(a.values[o]=c,1)},reconfigure(a,u){let c=Uo(a,i),h=u.config.facets[e.id],f=u.facet(e);if(h&&!c&&ta(t,h))return a.values[o]=f,0;let d=l(a);return e.compare(d,f)?(a.values[o]=f,0):(a.values[o]=d,1)}}}const Sr=K.define({static:!0});class En{constructor(e,t,i,r,s){this.id=e,this.createF=t,this.updateF=i,this.compareF=r,this.spec=s,this.provides=void 0}static define(e){let t=new En(ea++,e.create,e.update,e.compare||((i,r)=>i===r),e);return e.provide&&(t.provides=e.provide(t)),t}create(e){let t=e.facet(Sr).find(i=>i.field==this);return((t==null?void 0:t.create)||this.createF)(e)}slot(e){let t=e[this.id]>>1;return{create:i=>(i.values[t]=this.create(i),1),update:(i,r)=>{let s=i.values[t],o=this.updateF(s,r);return this.compareF(s,o)?0:(i.values[t]=o,1)},reconfigure:(i,r)=>{let s=i.facet(Sr),o=r.facet(Sr),l;return(l=s.find(a=>a.field==this))&&l!=o.find(a=>a.field==this)?(i.values[t]=l.create(i),1):r.config.address[this.id]!=null?(i.values[t]=r.field(this),0):(i.values[t]=this.create(i),1)}}}init(e){return[this,Sr.of({field:this,create:e})]}get extension(){return this}}const Rn={lowest:4,low:3,default:2,high:1,highest:0};function Ii(n){return e=>new Ph(e,n)}const Cs={highest:Ii(Rn.highest),high:Ii(Rn.high),default:Ii(Rn.default),low:Ii(Rn.low),lowest:Ii(Rn.lowest)};class Ph{constructor(e,t){this.inner=e,this.prec=t}}class mr{of(e){return new jo(this,e)}reconfigure(e){return mr.reconfigure.of({compartment:this,extension:e})}get(e){return e.config.compartments.get(this)}}class jo{constructor(e,t){this.compartment=e,this.inner=t}}class os{constructor(e,t,i,r,s,o){for(this.base=e,this.compartments=t,this.dynamicSlots=i,this.address=r,this.staticValues=s,this.facets=o,this.statusTemplate=[];this.statusTemplate.length<i.length;)this.statusTemplate.push(0)}staticFacet(e){let t=this.address[e.id];return t==null?e.default:this.staticValues[t>>1]}static resolve(e,t,i){let r=[],s=Object.create(null),o=new Map;for(let f of Vm(e,t,o))f instanceof En?r.push(f):(s[f.facet.id]||(s[f.facet.id]=[])).push(f);let l=Object.create(null),a=[],u=[];for(let f of r)l[f.id]=u.length<<1,u.push(d=>f.slot(d));let c=i==null?void 0:i.config.facets;for(let f in s){let d=s[f],p=d[0].facet,m=c&&c[f]||[];if(d.every(b=>b.type==0))if(l[p.id]=a.length<<1|1,ta(m,d))a.push(i.facet(p));else{let b=p.combine(d.map(g=>g.value));a.push(i&&p.compare(b,i.facet(p))?i.facet(p):b)}else{for(let b of d)b.type==0?(l[b.id]=a.length<<1|1,a.push(b.value)):(l[b.id]=u.length<<1,u.push(g=>b.dynamicSlot(g)));l[p.id]=u.length<<1,u.push(b=>Wm(b,p,d))}}let h=u.map(f=>f(l));return new os(e,o,h,l,a,s)}}function Vm(n,e,t){let i=[[],[],[],[],[]],r=new Map;function s(o,l){let a=r.get(o);if(a!=null){if(a<=l)return;let u=i[a].indexOf(o);u>-1&&i[a].splice(u,1),o instanceof jo&&t.delete(o.compartment)}if(r.set(o,l),Array.isArray(o))for(let u of o)s(u,l);else if(o instanceof jo){if(t.has(o.compartment))throw new RangeError("Duplicate use of compartment in extensions");let u=e.get(o.compartment)||o.inner;t.set(o.compartment,u),s(u,l)}else if(o instanceof Ph)s(o.inner,o.prec);else if(o instanceof En)i[l].push(o),o.provides&&s(o.provides,l);else if(o instanceof Yr)i[l].push(o),o.facet.extensions&&s(o.facet.extensions,Rn.default);else{let u=o.extension;if(!u)throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);s(u,l)}}return s(n,Rn.default),i.reduce((o,l)=>o.concat(l))}function Ki(n,e){if(e&1)return 2;let t=e>>1,i=n.status[t];if(i==4)throw new Error("Cyclic dependency between fields and/or facets");if(i&2)return i;n.status[t]=4;let r=n.computeSlot(n,n.config.dynamicSlots[t]);return n.status[t]=2|r}function ls(n,e){return e&1?n.config.staticValues[e>>1]:n.values[e>>1]}const Ih=K.define(),Ko=K.define({combine:n=>n.some(e=>e),static:!0}),Dh=K.define({combine:n=>n.length?n[0]:void 0,static:!0}),Bh=K.define(),Lh=K.define(),Oh=K.define(),Rh=K.define({combine:n=>n.length?n[0]:!1});class Mn{constructor(e,t){this.type=e,this.value=t}static define(){return new Um}}class Um{of(e){return new Mn(this,e)}}class jm{constructor(e){this.map=e}of(e){return new Be(this,e)}}class Be{constructor(e,t){this.type=e,this.value=t}map(e){let t=this.type.map(this.value,e);return t===void 0?void 0:t==this.value?this:new Be(this.type,t)}is(e){return this.type==e}static define(e={}){return new jm(e.map||(t=>t))}static mapEffects(e,t){if(!e.length)return e;let i=[];for(let r of e){let s=r.map(t);s&&i.push(s)}return i}}Be.reconfigure=Be.define();Be.appendConfig=Be.define();class Ne{constructor(e,t,i,r,s,o){this.startState=e,this.changes=t,this.selection=i,this.effects=r,this.annotations=s,this.scrollIntoView=o,this._doc=null,this._state=null,i&&Mh(i,t.newLength),s.some(l=>l.type==Ne.time)||(this.annotations=s.concat(Ne.time.of(Date.now())))}static create(e,t,i,r,s,o){return new Ne(e,t,i,r,s,o)}get newDoc(){return this._doc||(this._doc=this.changes.apply(this.startState.doc))}get newSelection(){return this.selection||this.startState.selection.map(this.changes)}get state(){return this._state||this.startState.applyTransaction(this),this._state}annotation(e){for(let t of this.annotations)if(t.type==e)return t.value}get docChanged(){return!this.changes.empty}get reconfigured(){return this.startState.config!=this.state.config}isUserEvent(e){let t=this.annotation(Ne.userEvent);return!!(t&&(t==e||t.length>e.length&&t.slice(0,e.length)==e&&t[e.length]=="."))}}Ne.time=Mn.define();Ne.userEvent=Mn.define();Ne.addToHistory=Mn.define();Ne.remote=Mn.define();function Km(n,e){let t=[];for(let i=0,r=0;;){let s,o;if(i<n.length&&(r==e.length||e[r]>=n[i]))s=n[i++],o=n[i++];else if(r<e.length)s=e[r++],o=e[r++];else return t;!t.length||t[t.length-1]<s?t.push(s,o):t[t.length-1]<o&&(t[t.length-1]=o)}}function zh(n,e,t){var i;let r,s,o;return t?(r=e.changes,s=Fe.empty(e.changes.length),o=n.changes.compose(e.changes)):(r=e.changes.map(n.changes),s=n.changes.mapDesc(e.changes,!0),o=n.changes.compose(r)),{changes:o,selection:e.selection?e.selection.map(s):(i=n.selection)===null||i===void 0?void 0:i.map(r),effects:Be.mapEffects(n.effects,r).concat(Be.mapEffects(e.effects,s)),annotations:n.annotations.length?n.annotations.concat(e.annotations):e.annotations,scrollIntoView:n.scrollIntoView||e.scrollIntoView}}function Xo(n,e,t){let i=e.selection,r=ai(e.annotations);return e.userEvent&&(r=r.concat(Ne.userEvent.of(e.userEvent))),{changes:e.changes instanceof Fe?e.changes:Fe.of(e.changes||[],t,n.facet(Dh)),selection:i&&(i instanceof O?i:O.single(i.anchor,i.head)),effects:ai(e.effects),annotations:r,scrollIntoView:!!e.scrollIntoView}}function Fh(n,e,t){let i=Xo(n,e.length?e[0]:{},n.doc.length);e.length&&e[0].filter===!1&&(t=!1);for(let s=1;s<e.length;s++){e[s].filter===!1&&(t=!1);let o=!!e[s].sequential;i=zh(i,Xo(n,e[s],o?i.changes.newLength:n.doc.length),o)}let r=Ne.create(n,i.changes,i.selection,i.effects,i.annotations,i.scrollIntoView);return Gm(t?Xm(r):r)}function Xm(n){let e=n.startState,t=!0;for(let r of e.facet(Bh)){let s=r(n);if(s===!1){t=!1;break}Array.isArray(s)&&(t=t===!0?s:Km(t,s))}if(t!==!0){let r,s;if(t===!1)s=n.changes.invertedDesc,r=Fe.empty(e.doc.length);else{let o=n.changes.filter(t);r=o.changes,s=o.filtered.mapDesc(o.changes).invertedDesc}n=Ne.create(e,r,n.selection&&n.selection.map(s),Be.mapEffects(n.effects,s),n.annotations,n.scrollIntoView)}let i=e.facet(Lh);for(let r=i.length-1;r>=0;r--){let s=i[r](n);s instanceof Ne?n=s:Array.isArray(s)&&s.length==1&&s[0]instanceof Ne?n=s[0]:n=Fh(e,ai(s),!1)}return n}function Gm(n){let e=n.startState,t=e.facet(Oh),i=n;for(let r=t.length-1;r>=0;r--){let s=t[r](n);s&&Object.keys(s).length&&(i=zh(i,Xo(e,s,n.changes.newLength),!0))}return i==n?n:Ne.create(e,n.changes,n.selection,i.effects,i.annotations,i.scrollIntoView)}const Ym=[];function ai(n){return n==null?Ym:Array.isArray(n)?n:[n]}var an=(function(n){return n[n.Word=0]="Word",n[n.Space=1]="Space",n[n.Other=2]="Other",n})(an||(an={}));const Qm=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;let Go;try{Go=new RegExp("[\\p{Alphabetic}\\p{Number}_]","u")}catch{}function Jm(n){if(Go)return Go.test(n);for(let e=0;e<n.length;e++){let t=n[e];if(/\w/.test(t)||t>""&&(t.toUpperCase()!=t.toLowerCase()||Qm.test(t)))return!0}return!1}function Zm(n){return e=>{if(!/\S/.test(e))return an.Space;if(Jm(e))return an.Word;for(let t=0;t<n.length;t++)if(e.indexOf(n[t])>-1)return an.Word;return an.Other}}class pe{constructor(e,t,i,r,s,o){this.config=e,this.doc=t,this.selection=i,this.values=r,this.status=e.statusTemplate.slice(),this.computeSlot=s,o&&(o._state=this);for(let l=0;l<this.config.dynamicSlots.length;l++)Ki(this,l<<1);this.computeSlot=null}field(e,t=!0){let i=this.config.address[e.id];if(i==null){if(t)throw new RangeError("Field is not present in this state");return}return Ki(this,i),ls(this,i)}update(...e){return Fh(this,e,!0)}applyTransaction(e){let t=this.config,{base:i,compartments:r}=t;for(let l of e.effects)l.is(mr.reconfigure)?(t&&(r=new Map,t.compartments.forEach((a,u)=>r.set(u,a)),t=null),r.set(l.value.compartment,l.value.extension)):l.is(Be.reconfigure)?(t=null,i=l.value):l.is(Be.appendConfig)&&(t=null,i=ai(i).concat(l.value));let s;t?s=e.startState.values.slice():(t=os.resolve(i,r,this),s=new pe(t,this.doc,this.selection,t.dynamicSlots.map(()=>null),(a,u)=>u.reconfigure(a,this),null).values);let o=e.startState.facet(Ko)?e.newSelection:e.newSelection.asSingle();new pe(t,e.newDoc,o,s,(l,a)=>a.update(l,e),e)}replaceSelection(e){return typeof e=="string"&&(e=this.toText(e)),this.changeByRange(t=>({changes:{from:t.from,to:t.to,insert:e},range:O.cursor(t.from+e.length)}))}changeByRange(e){let t=this.selection,i=e(t.ranges[0]),r=this.changes(i.changes),s=[i.range],o=ai(i.effects);for(let l=1;l<t.ranges.length;l++){let a=e(t.ranges[l]),u=this.changes(a.changes),c=u.map(r);for(let f=0;f<l;f++)s[f]=s[f].map(c);let h=r.mapDesc(u,!0);s.push(a.range.map(h)),r=r.compose(c),o=Be.mapEffects(o,c).concat(Be.mapEffects(ai(a.effects),h))}return{changes:r,selection:O.create(s,t.mainIndex),effects:o}}changes(e=[]){return e instanceof Fe?e:Fe.of(e,this.doc.length,this.facet(pe.lineSeparator))}toText(e){return de.of(e.split(this.facet(pe.lineSeparator)||$o))}sliceDoc(e=0,t=this.doc.length){return this.doc.sliceString(e,t,this.lineBreak)}facet(e){let t=this.config.address[e.id];return t==null?e.default:(Ki(this,t),ls(this,t))}toJSON(e){let t={doc:this.sliceDoc(),selection:this.selection.toJSON()};if(e)for(let i in e){let r=e[i];r instanceof En&&this.config.address[r.id]!=null&&(t[i]=r.spec.toJSON(this.field(e[i]),this))}return t}static fromJSON(e,t={},i){if(!e||typeof e.doc!="string")throw new RangeError("Invalid JSON representation for EditorState");let r=[];if(i){for(let s in i)if(Object.prototype.hasOwnProperty.call(e,s)){let o=i[s],l=e[s];r.push(o.init(a=>o.spec.fromJSON(l,a)))}}return pe.create({doc:e.doc,selection:O.fromJSON(e.selection),extensions:t.extensions?r.concat([t.extensions]):r})}static create(e={}){let t=os.resolve(e.extensions||[],new Map),i=e.doc instanceof de?e.doc:de.of((e.doc||"").split(t.staticFacet(pe.lineSeparator)||$o)),r=e.selection?e.selection instanceof O?e.selection:O.single(e.selection.anchor,e.selection.head):O.single(0);return Mh(r,i.length),t.staticFacet(Ko)||(r=r.asSingle()),new pe(t,i,r,t.dynamicSlots.map(()=>null),(s,o)=>o.create(s),null)}get tabSize(){return this.facet(pe.tabSize)}get lineBreak(){return this.facet(pe.lineSeparator)||`
`}get readOnly(){return this.facet(Rh)}phrase(e,...t){for(let i of this.facet(pe.phrases))if(Object.prototype.hasOwnProperty.call(i,e)){e=i[e];break}return t.length&&(e=e.replace(/\$(\$|\d*)/g,(i,r)=>{if(r=="$")return"$";let s=+(r||1);return!s||s>t.length?i:t[s-1]})),e}languageDataAt(e,t,i=-1){let r=[];for(let s of this.facet(Ih))for(let o of s(this,t,i))Object.prototype.hasOwnProperty.call(o,e)&&r.push(o[e]);return r}charCategorizer(e){let t=this.languageDataAt("wordChars",e);return Zm(t.length?t[0]:"")}wordAt(e){let{text:t,from:i,length:r}=this.doc.lineAt(e),s=this.charCategorizer(e),o=e-i,l=e-i;for(;o>0;){let a=Xe(t,o,!1);if(s(t.slice(a,o))!=an.Word)break;o=a}for(;l<r;){let a=Xe(t,l);if(s(t.slice(l,a))!=an.Word)break;l=a}return o==l?null:O.range(o+i,l+i)}}pe.allowMultipleSelections=Ko;pe.tabSize=K.define({combine:n=>n.length?n[0]:4});pe.lineSeparator=Dh;pe.readOnly=Rh;pe.phrases=K.define({compare(n,e){let t=Object.keys(n),i=Object.keys(e);return t.length==i.length&&t.every(r=>n[r]==e[r])}});pe.languageData=Ih;pe.changeFilter=Bh;pe.transactionFilter=Lh;pe.transactionExtender=Oh;mr.reconfigure=Be.define();function na(n,e,t={}){let i={};for(let r of n)for(let s of Object.keys(r)){let o=r[s],l=i[s];if(l===void 0)i[s]=o;else if(!(l===o||o===void 0))if(Object.hasOwnProperty.call(t,s))i[s]=t[s](l,o);else throw new Error("Config merge conflict for field "+s)}for(let r in e)i[r]===void 0&&(i[r]=e[r]);return i}class Hn{eq(e){return this==e}range(e,t=e){return Yo.create(e,t,this)}}Hn.prototype.startSide=Hn.prototype.endSide=0;Hn.prototype.point=!1;Hn.prototype.mapMode=wt.TrackDel;function ia(n,e){return n==e||n.constructor==e.constructor&&n.eq(e)}let Yo=class Nh{constructor(e,t,i){this.from=e,this.to=t,this.value=i}static create(e,t,i){return new Nh(e,t,i)}};function Qo(n,e){return n.from-e.from||n.value.startSide-e.value.startSide}class ra{constructor(e,t,i,r){this.from=e,this.to=t,this.value=i,this.maxPoint=r}get length(){return this.to[this.to.length-1]}findIndex(e,t,i,r=0){let s=i?this.to:this.from;for(let o=r,l=s.length;;){if(o==l)return o;let a=o+l>>1,u=s[a]-e||(i?this.value[a].endSide:this.value[a].startSide)-t;if(a==o)return u>=0?o:l;u>=0?l=a:o=a+1}}between(e,t,i,r){for(let s=this.findIndex(t,-1e9,!0),o=this.findIndex(i,1e9,!1,s);s<o;s++)if(r(this.from[s]+e,this.to[s]+e,this.value[s])===!1)return!1}map(e,t){let i=[],r=[],s=[],o=-1,l=-1;for(let a=0;a<this.value.length;a++){let u=this.value[a],c=this.from[a]+e,h=this.to[a]+e,f,d;if(c==h){let p=t.mapPos(c,u.startSide,u.mapMode);if(p==null||(f=d=p,u.startSide!=u.endSide&&(d=t.mapPos(c,u.endSide),d<f)))continue}else if(f=t.mapPos(c,u.startSide),d=t.mapPos(h,u.endSide),f>d||f==d&&u.startSide>0&&u.endSide<=0)continue;(d-f||u.endSide-u.startSide)<0||(o<0&&(o=f),u.point&&(l=Math.max(l,d-f)),i.push(u),r.push(f-o),s.push(d-o))}return{mapped:i.length?new ra(r,s,i,l):null,pos:o}}}class fe{constructor(e,t,i,r){this.chunkPos=e,this.chunk=t,this.nextLayer=i,this.maxPoint=r}static create(e,t,i,r){return new fe(e,t,i,r)}get length(){let e=this.chunk.length-1;return e<0?0:Math.max(this.chunkEnd(e),this.nextLayer.length)}get size(){if(this.isEmpty)return 0;let e=this.nextLayer.size;for(let t of this.chunk)e+=t.value.length;return e}chunkEnd(e){return this.chunkPos[e]+this.chunk[e].length}update(e){let{add:t=[],sort:i=!1,filterFrom:r=0,filterTo:s=this.length}=e,o=e.filter;if(t.length==0&&!o)return this;if(i&&(t=t.slice().sort(Qo)),this.isEmpty)return t.length?fe.of(t):this;let l=new qh(this,null,-1).goto(0),a=0,u=[],c=new ir;for(;l.value||a<t.length;)if(a<t.length&&(l.from-t[a].from||l.startSide-t[a].value.startSide)>=0){let h=t[a++];c.addInner(h.from,h.to,h.value)||u.push(h)}else l.rangeIndex==1&&l.chunkIndex<this.chunk.length&&(a==t.length||this.chunkEnd(l.chunkIndex)<t[a].from)&&(!o||r>this.chunkEnd(l.chunkIndex)||s<this.chunkPos[l.chunkIndex])&&c.addChunk(this.chunkPos[l.chunkIndex],this.chunk[l.chunkIndex])?l.nextChunk():((!o||r>l.to||s<l.from||o(l.from,l.to,l.value))&&(c.addInner(l.from,l.to,l.value)||u.push(Yo.create(l.from,l.to,l.value))),l.next());return c.finishInner(this.nextLayer.isEmpty&&!u.length?fe.empty:this.nextLayer.update({add:u,filter:o,filterFrom:r,filterTo:s}))}map(e){if(e.empty||this.isEmpty)return this;let t=[],i=[],r=-1;for(let o=0;o<this.chunk.length;o++){let l=this.chunkPos[o],a=this.chunk[o],u=e.touchesRange(l,l+a.length);if(u===!1)r=Math.max(r,a.maxPoint),t.push(a),i.push(e.mapPos(l));else if(u===!0){let{mapped:c,pos:h}=a.map(l,e);c&&(r=Math.max(r,c.maxPoint),t.push(c),i.push(h))}}let s=this.nextLayer.map(e);return t.length==0?s:new fe(i,t,s||fe.empty,r)}between(e,t,i){if(!this.isEmpty){for(let r=0;r<this.chunk.length;r++){let s=this.chunkPos[r],o=this.chunk[r];if(t>=s&&e<=s+o.length&&o.between(s,e-s,t-s,i)===!1)return}this.nextLayer.between(e,t,i)}}iter(e=0){return rr.from([this]).goto(e)}get isEmpty(){return this.nextLayer==this}static iter(e,t=0){return rr.from(e).goto(t)}static compare(e,t,i,r,s=-1){let o=e.filter(h=>h.maxPoint>0||!h.isEmpty&&h.maxPoint>=s),l=t.filter(h=>h.maxPoint>0||!h.isEmpty&&h.maxPoint>=s),a=lu(o,l,i),u=new Di(o,a,s),c=new Di(l,a,s);i.iterGaps((h,f,d)=>au(u,h,c,f,d,r)),i.empty&&i.length==0&&au(u,0,c,0,0,r)}static eq(e,t,i=0,r){r==null&&(r=999999999);let s=e.filter(c=>!c.isEmpty&&t.indexOf(c)<0),o=t.filter(c=>!c.isEmpty&&e.indexOf(c)<0);if(s.length!=o.length)return!1;if(!s.length)return!0;let l=lu(s,o),a=new Di(s,l,0).goto(i),u=new Di(o,l,0).goto(i);for(;;){if(a.to!=u.to||!Jo(a.active,u.active)||a.point&&(!u.point||!ia(a.point,u.point)))return!1;if(a.to>r)return!0;a.next(),u.next()}}static spans(e,t,i,r,s=-1){let o=new Di(e,null,s).goto(t),l=t,a=o.openStart;for(;;){let u=Math.min(o.to,i);if(o.point){let c=o.activeForPoint(o.to),h=o.pointFrom<t?c.length+1:o.point.startSide<0?c.length:Math.min(c.length,a);r.point(l,u,o.point,c,h,o.pointRank),a=Math.min(o.openEnd(u),c.length)}else u>l&&(r.span(l,u,o.active,a),a=o.openEnd(u));if(o.to>i)return a+(o.point&&o.to>i?1:0);l=o.to,o.next()}}static of(e,t=!1){let i=new ir;for(let r of e instanceof Yo?[e]:t?eg(e):e)i.add(r.from,r.to,r.value);return i.finish()}static join(e){if(!e.length)return fe.empty;let t=e[e.length-1];for(let i=e.length-2;i>=0;i--)for(let r=e[i];r!=fe.empty;r=r.nextLayer)t=new fe(r.chunkPos,r.chunk,t,Math.max(r.maxPoint,t.maxPoint));return t}}fe.empty=new fe([],[],null,-1);function eg(n){if(n.length>1)for(let e=n[0],t=1;t<n.length;t++){let i=n[t];if(Qo(e,i)>0)return n.slice().sort(Qo);e=i}return n}fe.empty.nextLayer=fe.empty;class ir{finishChunk(e){this.chunks.push(new ra(this.from,this.to,this.value,this.maxPoint)),this.chunkPos.push(this.chunkStart),this.chunkStart=-1,this.setMaxPoint=Math.max(this.setMaxPoint,this.maxPoint),this.maxPoint=-1,e&&(this.from=[],this.to=[],this.value=[])}constructor(){this.chunks=[],this.chunkPos=[],this.chunkStart=-1,this.last=null,this.lastFrom=-1e9,this.lastTo=-1e9,this.from=[],this.to=[],this.value=[],this.maxPoint=-1,this.setMaxPoint=-1,this.nextLayer=null}add(e,t,i){this.addInner(e,t,i)||(this.nextLayer||(this.nextLayer=new ir)).add(e,t,i)}addInner(e,t,i){let r=e-this.lastTo||i.startSide-this.last.endSide;if(r<=0&&(e-this.lastFrom||i.startSide-this.last.startSide)<0)throw new Error("Ranges must be added sorted by `from` position and `startSide`");return r<0?!1:(this.from.length==250&&this.finishChunk(!0),this.chunkStart<0&&(this.chunkStart=e),this.from.push(e-this.chunkStart),this.to.push(t-this.chunkStart),this.last=i,this.lastFrom=e,this.lastTo=t,this.value.push(i),i.point&&(this.maxPoint=Math.max(this.maxPoint,t-e)),!0)}addChunk(e,t){if((e-this.lastTo||t.value[0].startSide-this.last.endSide)<0)return!1;this.from.length&&this.finishChunk(!0),this.setMaxPoint=Math.max(this.setMaxPoint,t.maxPoint),this.chunks.push(t),this.chunkPos.push(e);let i=t.value.length-1;return this.last=t.value[i],this.lastFrom=t.from[i]+e,this.lastTo=t.to[i]+e,!0}finish(){return this.finishInner(fe.empty)}finishInner(e){if(this.from.length&&this.finishChunk(!1),this.chunks.length==0)return e;let t=fe.create(this.chunkPos,this.chunks,this.nextLayer?this.nextLayer.finishInner(e):e,this.setMaxPoint);return this.from=null,t}}function lu(n,e,t){let i=new Map;for(let s of n)for(let o=0;o<s.chunk.length;o++)s.chunk[o].maxPoint<=0&&i.set(s.chunk[o],s.chunkPos[o]);let r=new Set;for(let s of e)for(let o=0;o<s.chunk.length;o++){let l=i.get(s.chunk[o]);l!=null&&(t?t.mapPos(l):l)==s.chunkPos[o]&&!(t!=null&&t.touchesRange(l,l+s.chunk[o].length))&&r.add(s.chunk[o])}return r}class qh{constructor(e,t,i,r=0){this.layer=e,this.skip=t,this.minPoint=i,this.rank=r}get startSide(){return this.value?this.value.startSide:0}get endSide(){return this.value?this.value.endSide:0}goto(e,t=-1e9){return this.chunkIndex=this.rangeIndex=0,this.gotoInner(e,t,!1),this}gotoInner(e,t,i){for(;this.chunkIndex<this.layer.chunk.length;){let r=this.layer.chunk[this.chunkIndex];if(!(this.skip&&this.skip.has(r)||this.layer.chunkEnd(this.chunkIndex)<e||r.maxPoint<this.minPoint))break;this.chunkIndex++,i=!1}if(this.chunkIndex<this.layer.chunk.length){let r=this.layer.chunk[this.chunkIndex].findIndex(e-this.layer.chunkPos[this.chunkIndex],t,!0);(!i||this.rangeIndex<r)&&this.setRangeIndex(r)}this.next()}forward(e,t){(this.to-e||this.endSide-t)<0&&this.gotoInner(e,t,!0)}next(){for(;;)if(this.chunkIndex==this.layer.chunk.length){this.from=this.to=1e9,this.value=null;break}else{let e=this.layer.chunkPos[this.chunkIndex],t=this.layer.chunk[this.chunkIndex],i=e+t.from[this.rangeIndex];if(this.from=i,this.to=e+t.to[this.rangeIndex],this.value=t.value[this.rangeIndex],this.setRangeIndex(this.rangeIndex+1),this.minPoint<0||this.value.point&&this.to-this.from>=this.minPoint)break}}setRangeIndex(e){if(e==this.layer.chunk[this.chunkIndex].value.length){if(this.chunkIndex++,this.skip)for(;this.chunkIndex<this.layer.chunk.length&&this.skip.has(this.layer.chunk[this.chunkIndex]);)this.chunkIndex++;this.rangeIndex=0}else this.rangeIndex=e}nextChunk(){this.chunkIndex++,this.rangeIndex=0,this.next()}compare(e){return this.from-e.from||this.startSide-e.startSide||this.rank-e.rank||this.to-e.to||this.endSide-e.endSide}}class rr{constructor(e){this.heap=e}static from(e,t=null,i=-1){let r=[];for(let s=0;s<e.length;s++)for(let o=e[s];!o.isEmpty;o=o.nextLayer)o.maxPoint>=i&&r.push(new qh(o,t,i,s));return r.length==1?r[0]:new rr(r)}get startSide(){return this.value?this.value.startSide:0}goto(e,t=-1e9){for(let i of this.heap)i.goto(e,t);for(let i=this.heap.length>>1;i>=0;i--)Ys(this.heap,i);return this.next(),this}forward(e,t){for(let i of this.heap)i.forward(e,t);for(let i=this.heap.length>>1;i>=0;i--)Ys(this.heap,i);(this.to-e||this.value.endSide-t)<0&&this.next()}next(){if(this.heap.length==0)this.from=this.to=1e9,this.value=null,this.rank=-1;else{let e=this.heap[0];this.from=e.from,this.to=e.to,this.value=e.value,this.rank=e.rank,e.value&&e.next(),Ys(this.heap,0)}}}function Ys(n,e){for(let t=n[e];;){let i=(e<<1)+1;if(i>=n.length)break;let r=n[i];if(i+1<n.length&&r.compare(n[i+1])>=0&&(r=n[i+1],i++),t.compare(r)<0)break;n[i]=t,n[e]=r,e=i}}class Di{constructor(e,t,i){this.minPoint=i,this.active=[],this.activeTo=[],this.activeRank=[],this.minActive=-1,this.point=null,this.pointFrom=0,this.pointRank=0,this.to=-1e9,this.endSide=0,this.openStart=-1,this.cursor=rr.from(e,t,i)}goto(e,t=-1e9){return this.cursor.goto(e,t),this.active.length=this.activeTo.length=this.activeRank.length=0,this.minActive=-1,this.to=e,this.endSide=t,this.openStart=-1,this.next(),this}forward(e,t){for(;this.minActive>-1&&(this.activeTo[this.minActive]-e||this.active[this.minActive].endSide-t)<0;)this.removeActive(this.minActive);this.cursor.forward(e,t)}removeActive(e){_r(this.active,e),_r(this.activeTo,e),_r(this.activeRank,e),this.minActive=uu(this.active,this.activeTo)}addActive(e){let t=0,{value:i,to:r,rank:s}=this.cursor;for(;t<this.activeRank.length&&(s-this.activeRank[t]||r-this.activeTo[t])>0;)t++;Cr(this.active,t,i),Cr(this.activeTo,t,r),Cr(this.activeRank,t,s),e&&Cr(e,t,this.cursor.from),this.minActive=uu(this.active,this.activeTo)}next(){let e=this.to,t=this.point;this.point=null;let i=this.openStart<0?[]:null;for(;;){let r=this.minActive;if(r>-1&&(this.activeTo[r]-this.cursor.from||this.active[r].endSide-this.cursor.startSide)<0){if(this.activeTo[r]>e){this.to=this.activeTo[r],this.endSide=this.active[r].endSide;break}this.removeActive(r),i&&_r(i,r)}else if(this.cursor.value)if(this.cursor.from>e){this.to=this.cursor.from,this.endSide=this.cursor.startSide;break}else{let s=this.cursor.value;if(!s.point)this.addActive(i),this.cursor.next();else if(t&&this.cursor.to==this.to&&this.cursor.from<this.cursor.to)this.cursor.next();else{this.point=s,this.pointFrom=this.cursor.from,this.pointRank=this.cursor.rank,this.to=this.cursor.to,this.endSide=s.endSide,this.cursor.next(),this.forward(this.to,this.endSide);break}}else{this.to=this.endSide=1e9;break}}if(i){this.openStart=0;for(let r=i.length-1;r>=0&&i[r]<e;r--)this.openStart++}}activeForPoint(e){if(!this.active.length)return this.active;let t=[];for(let i=this.active.length-1;i>=0&&!(this.activeRank[i]<this.pointRank);i--)(this.activeTo[i]>e||this.activeTo[i]==e&&this.active[i].endSide>=this.point.endSide)&&t.push(this.active[i]);return t.reverse()}openEnd(e){let t=0;for(let i=this.activeTo.length-1;i>=0&&this.activeTo[i]>e;i--)t++;return t}}function au(n,e,t,i,r,s){n.goto(e),t.goto(i);let o=i+r,l=i,a=i-e,u=!!s.boundChange;for(let c=!1;;){let h=n.to+a-t.to,f=h||n.endSide-t.endSide,d=f<0?n.to+a:t.to,p=Math.min(d,o);if(n.point||t.point?(n.point&&t.point&&ia(n.point,t.point)&&Jo(n.activeForPoint(n.to),t.activeForPoint(t.to))||s.comparePoint(l,p,n.point,t.point),c=!1):(c&&s.boundChange(l),p>l&&!Jo(n.active,t.active)&&s.compareRange(l,p,n.active,t.active),u&&p<o&&(h||n.openEnd(d)!=t.openEnd(d))&&(c=!0)),d>o)break;l=d,f<=0&&n.next(),f>=0&&t.next()}}function Jo(n,e){if(n.length!=e.length)return!1;for(let t=0;t<n.length;t++)if(n[t]!=e[t]&&!ia(n[t],e[t]))return!1;return!0}function _r(n,e){for(let t=e,i=n.length-1;t<i;t++)n[t]=n[t+1];n.pop()}function Cr(n,e,t){for(let i=n.length-1;i>=e;i--)n[i+1]=n[i];n[e]=t}function uu(n,e){let t=-1,i=1e9;for(let r=0;r<e.length;r++)(e[r]-i||n[r].endSide-n[t].endSide)<0&&(t=r,i=e[r]);return t}function As(n,e,t=n.length){let i=0;for(let r=0;r<t&&r<n.length;)n.charCodeAt(r)==9?(i+=e-i%e,r++):(i++,r=Xe(n,r));return i}function tg(n,e,t,i){for(let r=0,s=0;;){if(s>=e)return r;if(r==n.length)break;s+=n.charCodeAt(r)==9?t-s%t:1,r=Xe(n,r)}return n.length}const Zo="ͼ",cu=typeof Symbol>"u"?"__"+Zo:Symbol.for(Zo),el=typeof Symbol>"u"?"__styleSet"+Math.floor(Math.random()*1e8):Symbol("styleSet"),hu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{};class vn{constructor(e,t){this.rules=[];let{finish:i}=t||{};function r(o){return/^@/.test(o)?[o]:o.split(/,\s*/)}function s(o,l,a,u){let c=[],h=/^@(\w+)\b/.exec(o[0]),f=h&&h[1]=="keyframes";if(h&&l==null)return a.push(o[0]+";");for(let d in l){let p=l[d];if(/&/.test(d))s(d.split(/,\s*/).map(m=>o.map(b=>m.replace(/&/,b))).reduce((m,b)=>m.concat(b)),p,a);else if(p&&typeof p=="object"){if(!h)throw new RangeError("The value of a property ("+d+") should be a primitive value.");s(r(d),p,c,f)}else p!=null&&c.push(d.replace(/_.*/,"").replace(/[A-Z]/g,m=>"-"+m.toLowerCase())+": "+p+";")}(c.length||f)&&a.push((i&&!h&&!u?o.map(i):o).join(", ")+" {"+c.join(" ")+"}")}for(let o in e)s(r(o),e[o],this.rules)}getRules(){return this.rules.join(`
`)}static newName(){let e=hu[cu]||1;return hu[cu]=e+1,Zo+e.toString(36)}static mount(e,t,i){let r=e[el],s=i&&i.nonce;r?s&&r.setNonce(s):r=new ng(e,s),r.mount(Array.isArray(t)?t:[t],e)}}let fu=new Map;class ng{constructor(e,t){let i=e.ownerDocument||e,r=i.defaultView;if(!e.head&&e.adoptedStyleSheets&&r.CSSStyleSheet){let s=fu.get(i);if(s)return e[el]=s;this.sheet=new r.CSSStyleSheet,fu.set(i,this)}else this.styleTag=i.createElement("style"),t&&this.styleTag.setAttribute("nonce",t);this.modules=[],e[el]=this}mount(e,t){let i=this.sheet,r=0,s=0;for(let o=0;o<e.length;o++){let l=e[o],a=this.modules.indexOf(l);if(a<s&&a>-1&&(this.modules.splice(a,1),s--,a=-1),a==-1){if(this.modules.splice(s++,0,l),i)for(let u=0;u<l.rules.length;u++)i.insertRule(l.rules[u],r++)}else{for(;s<a;)r+=this.modules[s++].rules.length;r+=l.rules.length,s++}}if(i)t.adoptedStyleSheets.indexOf(this.sheet)<0&&(t.adoptedStyleSheets=[this.sheet,...t.adoptedStyleSheets]);else{let o="";for(let a=0;a<this.modules.length;a++)o+=this.modules[a].getRules()+`
`;this.styleTag.textContent=o;let l=t.head||t;this.styleTag.parentNode!=l&&l.insertBefore(this.styleTag,l.firstChild)}}setNonce(e){this.styleTag&&this.styleTag.getAttribute("nonce")!=e&&this.styleTag.setAttribute("nonce",e)}}var Sn={8:"Backspace",9:"Tab",10:"Enter",12:"NumLock",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",44:"PrintScreen",45:"Insert",46:"Delete",59:";",61:"=",91:"Meta",92:"Meta",106:"*",107:"+",108:",",109:"-",110:".",111:"/",144:"NumLock",145:"ScrollLock",160:"Shift",161:"Shift",162:"Control",163:"Control",164:"Alt",165:"Alt",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},sr={48:")",49:"!",50:"@",51:"#",52:"$",53:"%",54:"^",55:"&",56:"*",57:"(",59:":",61:"+",173:"_",186:":",187:"+",188:"<",189:"_",190:">",191:"?",192:"~",219:"{",220:"|",221:"}",222:'"'},ig=typeof navigator<"u"&&/Mac/.test(navigator.platform),rg=typeof navigator<"u"&&/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);for(var We=0;We<10;We++)Sn[48+We]=Sn[96+We]=String(We);for(var We=1;We<=24;We++)Sn[We+111]="F"+We;for(var We=65;We<=90;We++)Sn[We]=String.fromCharCode(We+32),sr[We]=String.fromCharCode(We);for(var Qs in Sn)sr.hasOwnProperty(Qs)||(sr[Qs]=Sn[Qs]);function sg(n){var e=ig&&n.metaKey&&n.shiftKey&&!n.ctrlKey&&!n.altKey||rg&&n.shiftKey&&n.key&&n.key.length==1||n.key=="Unidentified",t=!e&&n.key||(n.shiftKey?sr:Sn)[n.keyCode]||n.key||"Unidentified";return t=="Esc"&&(t="Escape"),t=="Del"&&(t="Delete"),t=="Left"&&(t="ArrowLeft"),t=="Up"&&(t="ArrowUp"),t=="Right"&&(t="ArrowRight"),t=="Down"&&(t="ArrowDown"),t}let et=typeof navigator<"u"?navigator:{userAgent:"",vendor:"",platform:""},tl=typeof document<"u"?document:{documentElement:{style:{}}};const nl=/Edge\/(\d+)/.exec(et.userAgent),Hh=/MSIE \d/.test(et.userAgent),il=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(et.userAgent),Ts=!!(Hh||il||nl),du=!Ts&&/gecko\/(\d+)/i.test(et.userAgent),Js=!Ts&&/Chrome\/(\d+)/.exec(et.userAgent),og="webkitFontSmoothing"in tl.documentElement.style,rl=!Ts&&/Apple Computer/.test(et.vendor),pu=rl&&(/Mobile\/\w+/.test(et.userAgent)||et.maxTouchPoints>2);var V={mac:pu||/Mac/.test(et.platform),windows:/Win/.test(et.platform),linux:/Linux|X11/.test(et.platform),ie:Ts,ie_version:Hh?tl.documentMode||6:il?+il[1]:nl?+nl[1]:0,gecko:du,gecko_version:du?+(/Firefox\/(\d+)/.exec(et.userAgent)||[0,0])[1]:0,chrome:!!Js,chrome_version:Js?+Js[1]:0,ios:pu,android:/Android\b/.test(et.userAgent),webkit_version:og?+(/\bAppleWebKit\/(\d+)/.exec(et.userAgent)||[0,0])[1]:0,safari:rl,safari_version:rl?+(/\bVersion\/(\d+(\.\d+)?)/.exec(et.userAgent)||[0,0])[1]:0,tabSize:tl.documentElement.style.tabSize!=null?"tab-size":"-moz-tab-size"};function sa(n,e){for(let t in n)t=="class"&&e.class?e.class+=" "+n.class:t=="style"&&e.style?e.style+=";"+n.style:e[t]=n[t];return e}const as=Object.create(null);function oa(n,e,t){if(n==e)return!0;n||(n=as),e||(e=as);let i=Object.keys(n),r=Object.keys(e);if(i.length-0!=r.length-0)return!1;for(let s of i)if(s!=t&&(r.indexOf(s)==-1||n[s]!==e[s]))return!1;return!0}function lg(n,e){for(let t=n.attributes.length-1;t>=0;t--){let i=n.attributes[t].name;e[i]==null&&n.removeAttribute(i)}for(let t in e){let i=e[t];t=="style"?n.style.cssText=i:n.getAttribute(t)!=i&&n.setAttribute(t,i)}}function mu(n,e,t){let i=!1;if(e)for(let r in e)t&&r in t||(i=!0,r=="style"?n.style.cssText="":n.removeAttribute(r));if(t)for(let r in t)e&&e[r]==t[r]||(i=!0,r=="style"?n.style.cssText=t[r]:n.setAttribute(r,t[r]));return i}function ag(n){let e=Object.create(null);for(let t=0;t<n.attributes.length;t++){let i=n.attributes[t];e[i.name]=i.value}return e}class Es{eq(e){return!1}updateDOM(e,t,i){return!1}compare(e){return this==e||this.constructor==e.constructor&&this.eq(e)}get estimatedHeight(){return-1}get lineBreaks(){return 0}ignoreEvent(e){return!0}coordsAt(e,t,i){return null}get isHidden(){return!1}get editable(){return!1}destroy(e){}}var Ve=(function(n){return n[n.Text=0]="Text",n[n.WidgetBefore=1]="WidgetBefore",n[n.WidgetAfter=2]="WidgetAfter",n[n.WidgetRange=3]="WidgetRange",n})(Ve||(Ve={}));class Oe extends Hn{constructor(e,t,i,r){super(),this.startSide=e,this.endSide=t,this.widget=i,this.spec=r}get heightRelevant(){return!1}static mark(e){return new gr(e)}static widget(e){let t=Math.max(-1e4,Math.min(1e4,e.side||0)),i=!!e.block;return t+=i&&!e.inlineOrder?t>0?3e8:-4e8:t>0?1e8:-1e8,new $n(e,t,t,i,e.widget||null,!1)}static replace(e){let t=!!e.block,i,r;if(e.isBlockGap)i=-5e8,r=4e8;else{let{start:s,end:o}=$h(e,t);i=(s?t?-3e8:-1:5e8)-1,r=(o?t?2e8:1:-6e8)+1}return new $n(e,i,r,t,e.widget||null,!0)}static line(e){return new br(e)}static set(e,t=!1){return fe.of(e,t)}hasHeight(){return this.widget?this.widget.estimatedHeight>-1:!1}}Oe.none=fe.empty;class gr extends Oe{constructor(e){let{start:t,end:i}=$h(e);super(t?-1:5e8,i?1:-6e8,null,e),this.tagName=e.tagName||"span",this.attrs=e.class&&e.attributes?sa(e.attributes,{class:e.class}):e.class?{class:e.class}:e.attributes||as}eq(e){return this==e||e instanceof gr&&this.tagName==e.tagName&&oa(this.attrs,e.attrs)}range(e,t=e){if(e>=t)throw new RangeError("Mark decorations may not be empty");return super.range(e,t)}}gr.prototype.point=!1;class br extends Oe{constructor(e){super(-2e8,-2e8,null,e)}eq(e){return e instanceof br&&this.spec.class==e.spec.class&&oa(this.spec.attributes,e.spec.attributes)}range(e,t=e){if(t!=e)throw new RangeError("Line decoration ranges must be zero-length");return super.range(e,t)}}br.prototype.mapMode=wt.TrackBefore;br.prototype.point=!0;class $n extends Oe{constructor(e,t,i,r,s,o){super(t,i,s,e),this.block=r,this.isReplace=o,this.mapMode=r?t<=0?wt.TrackBefore:wt.TrackAfter:wt.TrackDel}get type(){return this.startSide!=this.endSide?Ve.WidgetRange:this.startSide<=0?Ve.WidgetBefore:Ve.WidgetAfter}get heightRelevant(){return this.block||!!this.widget&&(this.widget.estimatedHeight>=5||this.widget.lineBreaks>0)}eq(e){return e instanceof $n&&ug(this.widget,e.widget)&&this.block==e.block&&this.startSide==e.startSide&&this.endSide==e.endSide}range(e,t=e){if(this.isReplace&&(e>t||e==t&&this.startSide>0&&this.endSide<=0))throw new RangeError("Invalid range for replacement decoration");if(!this.isReplace&&t!=e)throw new RangeError("Widget decorations can only have zero-length ranges");return super.range(e,t)}}$n.prototype.point=!0;function $h(n,e=!1){let{inclusiveStart:t,inclusiveEnd:i}=n;return t==null&&(t=n.inclusive),i==null&&(i=n.inclusive),{start:t??e,end:i??e}}function ug(n,e){return n==e||!!(n&&e&&n.compare(e))}function ui(n,e,t,i=0){let r=t.length-1;r>=0&&t[r]+i>=n?t[r]=Math.max(t[r],e):t.push(n,e)}class or extends Hn{constructor(e,t){super(),this.tagName=e,this.attributes=t}eq(e){return e==this||e instanceof or&&this.tagName==e.tagName&&oa(this.attributes,e.attributes)}static create(e){return new or(e.tagName,e.attributes||as)}static set(e,t=!1){return fe.of(e,t)}}or.prototype.startSide=or.prototype.endSide=-1;function lr(n){let e;return n.nodeType==11?e=n.getSelection?n:n.ownerDocument:e=n,e.getSelection()}function sl(n,e){return e?n==e||n.contains(e.nodeType!=1?e.parentNode:e):!1}function Xi(n,e){if(!e.anchorNode)return!1;try{return sl(n,e.anchorNode)}catch{return!1}}function Qr(n){return n.nodeType==3?ar(n,0,n.nodeValue.length).getClientRects():n.nodeType==1?n.getClientRects():[]}function Gi(n,e,t,i){return t?gu(n,e,t,i,-1)||gu(n,e,t,i,1):!1}function _n(n){for(var e=0;;e++)if(n=n.previousSibling,!n)return e}function us(n){return n.nodeType==1&&/^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(n.nodeName)}function gu(n,e,t,i,r){for(;;){if(n==t&&e==i)return!0;if(e==(r<0?0:cn(n))){if(n.nodeName=="DIV")return!1;let s=n.parentNode;if(!s||s.nodeType!=1)return!1;e=_n(n)+(r<0?0:1),n=s}else if(n.nodeType==1){if(n=n.childNodes[e+(r<0?-1:0)],n.nodeType==1&&n.contentEditable=="false")return!1;e=r<0?cn(n):0}else return!1}}function cn(n){return n.nodeType==3?n.nodeValue.length:n.childNodes.length}function cs(n,e){let t=e?n.left:n.right;return{left:t,right:t,top:n.top,bottom:n.bottom}}function cg(n){let e=n.visualViewport;return e?{left:0,right:e.width,top:0,bottom:e.height}:{left:0,right:n.innerWidth,top:0,bottom:n.innerHeight}}function Wh(n,e){let t=e.width/n.offsetWidth,i=e.height/n.offsetHeight;return(t>.995&&t<1.005||!isFinite(t)||Math.abs(e.width-n.offsetWidth)<1)&&(t=1),(i>.995&&i<1.005||!isFinite(i)||Math.abs(e.height-n.offsetHeight)<1)&&(i=1),{scaleX:t,scaleY:i}}function hg(n,e,t,i,r,s,o,l){let a=n.ownerDocument,u=a.defaultView||window;for(let c=n,h=!1;c&&!h;)if(c.nodeType==1){let f,d=c==a.body,p=1,m=1;if(d)f=cg(u);else{if(/^(fixed|sticky)$/.test(getComputedStyle(c).position)&&(h=!0),c.scrollHeight<=c.clientHeight&&c.scrollWidth<=c.clientWidth){c=c.assignedSlot||c.parentNode;continue}let S=c.getBoundingClientRect();({scaleX:p,scaleY:m}=Wh(c,S)),f={left:S.left,right:S.left+c.clientWidth*p,top:S.top,bottom:S.top+c.clientHeight*m}}let b=0,g=0;if(r=="nearest")e.top<f.top?(g=e.top-(f.top+o),t>0&&e.bottom>f.bottom+g&&(g=e.bottom-f.bottom+o)):e.bottom>f.bottom&&(g=e.bottom-f.bottom+o,t<0&&e.top-g<f.top&&(g=e.top-(f.top+o)));else{let S=e.bottom-e.top,v=f.bottom-f.top;g=(r=="center"&&S<=v?e.top+S/2-v/2:r=="start"||r=="center"&&t<0?e.top-o:e.bottom-v+o)-f.top}if(i=="nearest"?e.left<f.left?(b=e.left-(f.left+s),t>0&&e.right>f.right+b&&(b=e.right-f.right+s)):e.right>f.right&&(b=e.right-f.right+s,t<0&&e.left<f.left+b&&(b=e.left-(f.left+s))):b=(i=="center"?e.left+(e.right-e.left)/2-(f.right-f.left)/2:i=="start"==l?e.left-s:e.right-(f.right-f.left)+s)-f.left,b||g)if(d)u.scrollBy(b,g);else{let S=0,v=0;if(g){let D=c.scrollTop;c.scrollTop+=g/m,v=(c.scrollTop-D)*m}if(b){let D=c.scrollLeft;c.scrollLeft+=b/p,S=(c.scrollLeft-D)*p}e={left:e.left-S,top:e.top-v,right:e.right-S,bottom:e.bottom-v},S&&Math.abs(S-b)<1&&(i="nearest"),v&&Math.abs(v-g)<1&&(r="nearest")}if(d)break;(e.top<f.top||e.bottom>f.bottom||e.left<f.left||e.right>f.right)&&(e={left:Math.max(e.left,f.left),right:Math.min(e.right,f.right),top:Math.max(e.top,f.top),bottom:Math.min(e.bottom,f.bottom)}),c=c.assignedSlot||c.parentNode}else if(c.nodeType==11)c=c.host;else break}function Vh(n,e=!0){let t=n.ownerDocument,i=null,r=null;for(let s=n.parentNode;s&&!(s==t.body||(!e||i)&&r);)if(s.nodeType==1)!r&&s.scrollHeight>s.clientHeight&&(r=s),e&&!i&&s.scrollWidth>s.clientWidth&&(i=s),s=s.assignedSlot||s.parentNode;else if(s.nodeType==11)s=s.host;else break;return{x:i,y:r}}class fg{constructor(){this.anchorNode=null,this.anchorOffset=0,this.focusNode=null,this.focusOffset=0}eq(e){return this.anchorNode==e.anchorNode&&this.anchorOffset==e.anchorOffset&&this.focusNode==e.focusNode&&this.focusOffset==e.focusOffset}setRange(e){let{anchorNode:t,focusNode:i}=e;this.set(t,Math.min(e.anchorOffset,t?cn(t):0),i,Math.min(e.focusOffset,i?cn(i):0))}set(e,t,i,r){this.anchorNode=e,this.anchorOffset=t,this.focusNode=i,this.focusOffset=r}}let On=null;V.safari&&V.safari_version>=26&&(On=!1);function Uh(n){if(n.setActive)return n.setActive();if(On)return n.focus(On);let e=[];for(let t=n;t&&(e.push(t,t.scrollTop,t.scrollLeft),t!=t.ownerDocument);t=t.parentNode);if(n.focus(On==null?{get preventScroll(){return On={preventScroll:!0},!0}}:void 0),!On){On=!1;for(let t=0;t<e.length;){let i=e[t++],r=e[t++],s=e[t++];i.scrollTop!=r&&(i.scrollTop=r),i.scrollLeft!=s&&(i.scrollLeft=s)}}}let bu;function ar(n,e,t=e){let i=bu||(bu=document.createRange());return i.setEnd(n,t),i.setStart(n,e),i}function ci(n,e,t,i){let r={key:e,code:e,keyCode:t,which:t,cancelable:!0};i&&({altKey:r.altKey,ctrlKey:r.ctrlKey,shiftKey:r.shiftKey,metaKey:r.metaKey}=i);let s=new KeyboardEvent("keydown",r);s.synthetic=!0,n.dispatchEvent(s);let o=new KeyboardEvent("keyup",r);return o.synthetic=!0,n.dispatchEvent(o),s.defaultPrevented||o.defaultPrevented}function dg(n){for(;n;){if(n&&(n.nodeType==9||n.nodeType==11&&n.host))return n;n=n.assignedSlot||n.parentNode}return null}function pg(n,e){let t=e.focusNode,i=e.focusOffset;if(!t||e.anchorNode!=t||e.anchorOffset!=i)return!1;for(i=Math.min(i,cn(t));;)if(i){if(t.nodeType!=1)return!1;let r=t.childNodes[i-1];r.contentEditable=="false"?i--:(t=r,i=cn(t))}else{if(t==n)return!0;i=_n(t),t=t.parentNode}}function jh(n){return n instanceof Window?n.pageYOffset>Math.max(0,n.document.documentElement.scrollHeight-n.innerHeight-4):n.scrollTop>Math.max(1,n.scrollHeight-n.clientHeight-4)}function Kh(n,e){for(let t=n,i=e;;){if(t.nodeType==3&&i>0)return{node:t,offset:i};if(t.nodeType==1&&i>0){if(t.contentEditable=="false")return null;t=t.childNodes[i-1],i=cn(t)}else if(t.parentNode&&!us(t))i=_n(t),t=t.parentNode;else return null}}function Xh(n,e){for(let t=n,i=e;;){if(t.nodeType==3&&i<t.nodeValue.length)return{node:t,offset:i};if(t.nodeType==1&&i<t.childNodes.length){if(t.contentEditable=="false")return null;t=t.childNodes[i],i=0}else if(t.parentNode&&!us(t))i=_n(t)+1,t=t.parentNode;else return null}}class Lt{constructor(e,t,i=!0){this.node=e,this.offset=t,this.precise=i}static before(e,t){return new Lt(e.parentNode,_n(e),t)}static after(e,t){return new Lt(e.parentNode,_n(e)+1,t)}}var _e=(function(n){return n[n.LTR=0]="LTR",n[n.RTL=1]="RTL",n})(_e||(_e={}));const Wn=_e.LTR,la=_e.RTL;function Gh(n){let e=[];for(let t=0;t<n.length;t++)e.push(1<<+n[t]);return e}const mg=Gh("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"),gg=Gh("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"),ol=Object.create(null),Ht=[];for(let n of["()","[]","{}"]){let e=n.charCodeAt(0),t=n.charCodeAt(1);ol[e]=t,ol[t]=-e}function Yh(n){return n<=247?mg[n]:1424<=n&&n<=1524?2:1536<=n&&n<=1785?gg[n-1536]:1774<=n&&n<=2220?4:8192<=n&&n<=8204?256:64336<=n&&n<=65023?4:1}const bg=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;class Gt{get dir(){return this.level%2?la:Wn}constructor(e,t,i){this.from=e,this.to=t,this.level=i}side(e,t){return this.dir==t==e?this.to:this.from}forward(e,t){return e==(this.dir==t)}static find(e,t,i,r){let s=-1;for(let o=0;o<e.length;o++){let l=e[o];if(l.from<=t&&l.to>=t){if(l.level==i)return o;(s<0||(r!=0?r<0?l.from<t:l.to>t:e[s].level>l.level))&&(s=o)}}if(s<0)throw new RangeError("Index out of range");return s}}function Qh(n,e){if(n.length!=e.length)return!1;for(let t=0;t<n.length;t++){let i=n[t],r=e[t];if(i.from!=r.from||i.to!=r.to||i.direction!=r.direction||!Qh(i.inner,r.inner))return!1}return!0}const we=[];function yg(n,e,t,i,r){for(let s=0;s<=i.length;s++){let o=s?i[s-1].to:e,l=s<i.length?i[s].from:t,a=s?256:r;for(let u=o,c=a,h=a;u<l;u++){let f=Yh(n.charCodeAt(u));f==512?f=c:f==8&&h==4&&(f=16),we[u]=f==4?2:f,f&7&&(h=f),c=f}for(let u=o,c=a,h=a;u<l;u++){let f=we[u];if(f==128)u<l-1&&c==we[u+1]&&c&24?f=we[u]=c:we[u]=256;else if(f==64){let d=u+1;for(;d<l&&we[d]==64;)d++;let p=u&&c==8||d<t&&we[d]==8?h==1?1:8:256;for(let m=u;m<d;m++)we[m]=p;u=d-1}else f==8&&h==1&&(we[u]=1);c=f,f&7&&(h=f)}}}function wg(n,e,t,i,r){let s=r==1?2:1;for(let o=0,l=0,a=0;o<=i.length;o++){let u=o?i[o-1].to:e,c=o<i.length?i[o].from:t;for(let h=u,f,d,p;h<c;h++)if(d=ol[f=n.charCodeAt(h)])if(d<0){for(let m=l-3;m>=0;m-=3)if(Ht[m+1]==-d){let b=Ht[m+2],g=b&2?r:b&4?b&1?s:r:0;g&&(we[h]=we[Ht[m]]=g),l=m;break}}else{if(Ht.length==189)break;Ht[l++]=h,Ht[l++]=f,Ht[l++]=a}else if((p=we[h])==2||p==1){let m=p==r;a=m?0:1;for(let b=l-3;b>=0;b-=3){let g=Ht[b+2];if(g&2)break;if(m)Ht[b+2]|=2;else{if(g&4)break;Ht[b+2]|=4}}}}}function kg(n,e,t,i){for(let r=0,s=i;r<=t.length;r++){let o=r?t[r-1].to:n,l=r<t.length?t[r].from:e;for(let a=o;a<l;){let u=we[a];if(u==256){let c=a+1;for(;;)if(c==l){if(r==t.length)break;c=t[r++].to,l=r<t.length?t[r].from:e}else if(we[c]==256)c++;else break;let h=s==1,f=(c<e?we[c]:i)==1,d=h==f?h?1:2:i;for(let p=c,m=r,b=m?t[m-1].to:n;p>a;)p==b&&(p=t[--m].from,b=m?t[m-1].to:n),we[--p]=d;a=c}else s=u,a++}}}function ll(n,e,t,i,r,s,o){let l=i%2?2:1;if(i%2==r%2)for(let a=e,u=0;a<t;){let c=!0,h=!1;if(u==s.length||a<s[u].from){let m=we[a];m!=l&&(c=!1,h=m==16)}let f=!c&&l==1?[]:null,d=c?i:i+1,p=a;e:for(;;)if(u<s.length&&p==s[u].from){if(h)break e;let m=s[u];if(!c)for(let b=m.to,g=u+1;;){if(b==t)break e;if(g<s.length&&s[g].from==b)b=s[g++].to;else{if(we[b]==l)break e;break}}if(u++,f)f.push(m);else{m.from>a&&o.push(new Gt(a,m.from,d));let b=m.direction==Wn!=!(d%2);al(n,b?i+1:i,r,m.inner,m.from,m.to,o),a=m.to}p=m.to}else{if(p==t||(c?we[p]!=l:we[p]==l))break;p++}f?ll(n,a,p,i+1,r,f,o):a<p&&o.push(new Gt(a,p,d)),a=p}else for(let a=t,u=s.length;a>e;){let c=!0,h=!1;if(!u||a>s[u-1].to){let m=we[a-1];m!=l&&(c=!1,h=m==16)}let f=!c&&l==1?[]:null,d=c?i:i+1,p=a;e:for(;;)if(u&&p==s[u-1].to){if(h)break e;let m=s[--u];if(!c)for(let b=m.from,g=u;;){if(b==e)break e;if(g&&s[g-1].to==b)b=s[--g].from;else{if(we[b-1]==l)break e;break}}if(f)f.push(m);else{m.to<a&&o.push(new Gt(m.to,a,d));let b=m.direction==Wn!=!(d%2);al(n,b?i+1:i,r,m.inner,m.from,m.to,o),a=m.from}p=m.from}else{if(p==e||(c?we[p-1]!=l:we[p-1]==l))break;p--}f?ll(n,p,a,i+1,r,f,o):p<a&&o.push(new Gt(p,a,d)),a=p}}function al(n,e,t,i,r,s,o){let l=e%2?2:1;yg(n,r,s,i,l),wg(n,r,s,i,l),kg(r,s,i,l),ll(n,r,s,e,t,i,o)}function xg(n,e,t){if(!n)return[new Gt(0,0,e==la?1:0)];if(e==Wn&&!t.length&&!bg.test(n))return Jh(n.length);if(t.length)for(;n.length>we.length;)we[we.length]=256;let i=[],r=e==Wn?0:1;return al(n,r,r,t,0,n.length,i),i}function Jh(n){return[new Gt(0,n,0)]}let Zh="";function vg(n,e,t,i,r){var s;let o=i.head-n.from,l=Gt.find(e,o,(s=i.bidiLevel)!==null&&s!==void 0?s:-1,i.assoc),a=e[l],u=a.side(r,t);if(o==u){let f=l+=r?1:-1;if(f<0||f>=e.length)return null;a=e[l=f],o=a.side(!r,t),u=a.side(r,t)}let c=Xe(n.text,o,a.forward(r,t));(c<a.from||c>a.to)&&(c=u),Zh=n.text.slice(Math.min(o,c),Math.max(o,c));let h=l==(r?e.length-1:0)?null:e[l+(r?1:-1)];return h&&c==u&&h.level+(r?0:1)<a.level?O.cursor(h.side(!r,t)+n.from,h.forward(r,t)?1:-1,h.level):O.cursor(c+n.from,a.forward(r,t)?-1:1,a.level)}function Sg(n,e,t){for(let i=e;i<t;i++){let r=Yh(n.charCodeAt(i));if(r==1)return Wn;if(r==2||r==4)return la}return Wn}const ef=K.define(),tf=K.define(),nf=K.define(),rf=K.define(),ul=K.define(),sf=K.define(),of=K.define(),aa=K.define(),ua=K.define(),lf=K.define({combine:n=>n.some(e=>e)}),af=K.define({combine:n=>n.some(e=>e)}),uf=K.define();class hi{constructor(e,t="nearest",i="nearest",r=5,s=5,o=!1){this.range=e,this.y=t,this.x=i,this.yMargin=r,this.xMargin=s,this.isSnapshot=o}map(e){return e.empty?this:new hi(this.range.map(e),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}clip(e){return this.range.to<=e.doc.length?this:new hi(O.cursor(e.doc.length),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}}const Ar=Be.define({map:(n,e)=>n.map(e)}),cf=Be.define();function Yt(n,e,t){let i=n.facet(rf);i.length?i[0](e):window.onerror&&window.onerror(String(e),t,void 0,void 0,e)||(t?console.error(t+":",e):console.error(e))}const ln=K.define({combine:n=>n.length?n[0]:!0});let _g=0;const ri=K.define({combine(n){return n.filter((e,t)=>{for(let i=0;i<t;i++)if(n[i].plugin==e.plugin)return!1;return!0})}});class en{constructor(e,t,i,r,s){this.id=e,this.create=t,this.domEventHandlers=i,this.domEventObservers=r,this.baseExtensions=s(this),this.extension=this.baseExtensions.concat(ri.of({plugin:this,arg:void 0}))}of(e){return this.baseExtensions.concat(ri.of({plugin:this,arg:e}))}static define(e,t){const{eventHandlers:i,eventObservers:r,provide:s,decorations:o}=t||{};return new en(_g++,e,i,r,l=>{let a=[];return o&&a.push(Ms.of(u=>{let c=u.plugin(l);return c?o(c):Oe.none})),s&&a.push(s(l)),a})}static fromClass(e,t){return en.define((i,r)=>new e(i,r),t)}}class Zs{constructor(e){this.spec=e,this.mustUpdate=null,this.value=null}get plugin(){return this.spec&&this.spec.plugin}update(e){if(this.value){if(this.mustUpdate){let t=this.mustUpdate;if(this.mustUpdate=null,this.value.update)try{this.value.update(t)}catch(i){if(Yt(t.state,i,"CodeMirror plugin crashed"),this.value.destroy)try{this.value.destroy()}catch{}this.deactivate()}}}else if(this.spec)try{this.value=this.spec.plugin.create(e,this.spec.arg)}catch(t){Yt(e.state,t,"CodeMirror plugin crashed"),this.deactivate()}return this}destroy(e){var t;if(!((t=this.value)===null||t===void 0)&&t.destroy)try{this.value.destroy()}catch(i){Yt(e.state,i,"CodeMirror plugin crashed")}}deactivate(){this.spec=this.value=null}}const hf=K.define(),ca=K.define(),Ms=K.define(),ff=K.define(),ha=K.define(),yr=K.define(),df=K.define();function yu(n,e){let t=n.state.facet(df);if(!t.length)return t;let i=t.map(s=>s instanceof Function?s(n):s),r=[];return fe.spans(i,e.from,e.to,{point(){},span(s,o,l,a){let u=s-e.from,c=o-e.from,h=r;for(let f=l.length-1;f>=0;f--,a--){let d=l[f].spec.bidiIsolate,p;if(d==null&&(d=Sg(e.text,u,c)),a>0&&h.length&&(p=h[h.length-1]).to==u&&p.direction==d)p.to=c,h=p.inner;else{let m={from:u,to:c,direction:d,inner:[]};h.push(m),h=m.inner}}}}),r}const pf=K.define();function mf(n){let e=0,t=0,i=0,r=0;for(let s of n.state.facet(pf)){let o=s(n);o&&(o.left!=null&&(e=Math.max(e,o.left)),o.right!=null&&(t=Math.max(t,o.right)),o.top!=null&&(i=Math.max(i,o.top)),o.bottom!=null&&(r=Math.max(r,o.bottom)))}return{left:e,right:t,top:i,bottom:r}}const Wi=K.define();class Tt{constructor(e,t,i,r){this.fromA=e,this.toA=t,this.fromB=i,this.toB=r}join(e){return new Tt(Math.min(this.fromA,e.fromA),Math.max(this.toA,e.toA),Math.min(this.fromB,e.fromB),Math.max(this.toB,e.toB))}addToSet(e){let t=e.length,i=this;for(;t>0;t--){let r=e[t-1];if(!(r.fromA>i.toA)){if(r.toA<i.fromA)break;i=i.join(r),e.splice(t-1,1)}}return e.splice(t,0,i),e}static extendWithRanges(e,t){if(t.length==0)return e;let i=[];for(let r=0,s=0,o=0;;){let l=r<e.length?e[r].fromB:1e9,a=s<t.length?t[s]:1e9,u=Math.min(l,a);if(u==1e9)break;let c=u+o,h=u,f=c;for(;;)if(s<t.length&&t[s]<=h){let d=t[s+1];s+=2,h=Math.max(h,d);for(let p=r;p<e.length&&e[p].fromB<=h;p++)o=e[p].toA-e[p].toB;f=Math.max(f,d+o)}else if(r<e.length&&e[r].fromB<=h){let d=e[r++];h=Math.max(h,d.toB),f=Math.max(f,d.toA),o=d.toA-d.toB}else break;i.push(new Tt(c,f,u,h))}return i}}class hs{constructor(e,t,i){this.view=e,this.state=t,this.transactions=i,this.flags=0,this.startState=e.state,this.changes=Fe.empty(this.startState.doc.length);for(let s of i)this.changes=this.changes.compose(s.changes);let r=[];this.changes.iterChangedRanges((s,o,l,a)=>r.push(new Tt(s,o,l,a))),this.changedRanges=r}static create(e,t,i){return new hs(e,t,i)}get viewportChanged(){return(this.flags&4)>0}get viewportMoved(){return(this.flags&8)>0}get heightChanged(){return(this.flags&2)>0}get geometryChanged(){return this.docChanged||(this.flags&18)>0}get focusChanged(){return(this.flags&1)>0}get docChanged(){return!this.changes.empty}get selectionSet(){return this.transactions.some(e=>e.selection)}get empty(){return this.flags==0&&this.transactions.length==0}}const Cg=[];class Ee{constructor(e,t,i=0){this.dom=e,this.length=t,this.flags=i,this.parent=null,e.cmTile=this}get breakAfter(){return this.flags&1}get children(){return Cg}isWidget(){return!1}get isHidden(){return!1}isComposite(){return!1}isLine(){return!1}isText(){return!1}isBlock(){return!1}get domAttrs(){return null}sync(e){if(this.flags|=2,this.flags&4){this.flags&=-5;let t=this.domAttrs;t&&lg(this.dom,t)}}toString(){return this.constructor.name+(this.children.length?`(${this.children})`:"")+(this.breakAfter?"#":"")}destroy(){this.parent=null}setDOM(e){this.dom=e,e.cmTile=this}get posAtStart(){return this.parent?this.parent.posBefore(this):0}get posAtEnd(){return this.posAtStart+this.length}posBefore(e,t=this.posAtStart){let i=t;for(let r of this.children){if(r==e)return i;i+=r.length+r.breakAfter}throw new RangeError("Invalid child in posBefore")}posAfter(e){return this.posBefore(e)+e.length}covers(e){return!0}coordsIn(e,t){return null}domPosFor(e,t){let i=_n(this.dom),r=this.length?e>0:t>0;return new Lt(this.parent.dom,i+(r?1:0),e==0||e==this.length)}markDirty(e){this.flags&=-3,e&&(this.flags|=4),this.parent&&this.parent.flags&2&&this.parent.markDirty(!1)}get overrideDOMText(){return null}get root(){for(let e=this;e;e=e.parent)if(e instanceof Is)return e;return null}static get(e){return e.cmTile}}class Ps extends Ee{constructor(e){super(e,0),this._children=[]}isComposite(){return!0}get children(){return this._children}get lastChild(){return this.children.length?this.children[this.children.length-1]:null}append(e){this.children.push(e),e.parent=this}sync(e){if(this.flags&2)return;super.sync(e);let t=this.dom,i=null,r,s=(e==null?void 0:e.node)==t?e:null,o=0;for(let l of this.children){if(l.sync(e),o+=l.length+l.breakAfter,r=i?i.nextSibling:t.firstChild,s&&r!=l.dom&&(s.written=!0),l.dom.parentNode==t)for(;r&&r!=l.dom;)r=wu(r);else t.insertBefore(l.dom,r);i=l.dom}for(r=i?i.nextSibling:t.firstChild,s&&r&&(s.written=!0);r;)r=wu(r);this.length=o}}function wu(n){let e=n.nextSibling;return n.parentNode.removeChild(n),e}class Is extends Ps{constructor(e,t){super(t),this.view=e}owns(e){for(;e;e=e.parent)if(e==this)return!0;return!1}isBlock(){return!0}nearest(e){for(;;){if(!e)return null;let t=Ee.get(e);if(t&&this.owns(t))return t;e=e.parentNode}}blockTiles(e){for(let t=[],i=this,r=0,s=0;;)if(r==i.children.length){if(!t.length)return;i=i.parent,i.breakAfter&&s++,r=t.pop()}else{let o=i.children[r++];if(o instanceof un)t.push(r),i=o,r=0;else{let l=s+o.length,a=e(o,s);if(a!==void 0)return a;s=l+o.breakAfter}}}resolveBlock(e,t){let i,r=-1,s,o=-1;if(this.blockTiles((l,a)=>{let u=a+l.length;if(e>=a&&e<=u){if(l.isWidget()&&t>=-1&&t<=1){if(l.flags&32)return!0;l.flags&16&&(i=void 0)}(a<e||e==u&&(t<-1?l.length:l.covers(1)))&&(!i||!l.isWidget()&&i.isWidget())&&(i=l,r=e-a),(u>e||e==a&&(t>1?l.length:l.covers(-1)))&&(!s||!l.isWidget()&&s.isWidget())&&(s=l,o=e-a)}}),!i&&!s)throw new Error("No tile at position "+e);return i&&t<0||!s?{tile:i,offset:r}:{tile:s,offset:o}}}class un extends Ps{constructor(e,t){super(e),this.wrapper=t}isBlock(){return!0}covers(e){return this.children.length?e<0?this.children[0].covers(-1):this.lastChild.covers(1):!1}get domAttrs(){return this.wrapper.attributes}static of(e,t){let i=new un(t||document.createElement(e.tagName),e);return t||(i.flags|=4),i}}class mi extends Ps{constructor(e,t){super(e),this.attrs=t}isLine(){return!0}static start(e,t,i){let r=new mi(t||document.createElement("div"),e);return(!t||!i)&&(r.flags|=4),r}get domAttrs(){return this.attrs}resolveInline(e,t,i){let r=null,s=-1,o=null,l=-1;function a(c,h){for(let f=0,d=0;f<c.children.length&&d<=h;f++){let p=c.children[f],m=d+p.length;m>=h&&(p.isComposite()?a(p,h-d):(!o||o.isHidden&&(t>0||i&&Tg(o,p)))&&(m>h||p.flags&32)?(o=p,l=h-d):(d<h||p.flags&16&&!p.isHidden)&&(r=p,s=h-d)),d=m}}a(this,e);let u=(t<0?r:o)||r||o;return u?{tile:u,offset:u==r?s:l}:null}coordsIn(e,t){let i=this.resolveInline(e,t,!0);return i?i.tile.coordsIn(Math.max(0,i.offset),t):Ag(this)}domIn(e,t){let i=this.resolveInline(e,t);if(i){let{tile:r,offset:s}=i;if(this.dom.contains(r.dom))return r.isText()?new Lt(r.dom,Math.min(r.dom.nodeValue.length,s)):r.domPosFor(s,r.flags&16?1:r.flags&32?-1:t);let o=i.tile.parent,l=!1;for(let a of o.children){if(l)return new Lt(a.dom,0);a==i.tile&&(l=!0)}}return new Lt(this.dom,0)}}function Ag(n){let e=n.dom.lastChild;if(!e)return n.dom.getBoundingClientRect();let t=Qr(e);return t[t.length-1]||null}function Tg(n,e){let t=n.coordsIn(0,1),i=e.coordsIn(0,1);return t&&i&&i.top<t.bottom}class ut extends Ps{constructor(e,t){super(e),this.mark=t}get domAttrs(){return this.mark.attrs}static of(e,t){let i=new ut(t||document.createElement(e.tagName),e);return t||(i.flags|=4),i}}class Fn extends Ee{constructor(e,t){super(e,t.length),this.text=t}sync(e){this.flags&2||(super.sync(e),this.dom.nodeValue!=this.text&&(e&&e.node==this.dom&&(e.written=!0),this.dom.nodeValue=this.text))}isText(){return!0}toString(){return JSON.stringify(this.text)}coordsIn(e,t){let i=this.dom.nodeValue.length;e>i&&(e=i);let r=e,s=e,o=0;e==0&&t<0||e==i&&t>=0?V.chrome||V.gecko||(e?(r--,o=1):s<i&&(s++,o=-1)):t<0?r--:s<i&&s++;let l=ar(this.dom,r,s).getClientRects();if(!l.length)return null;let a=l[(o?o<0:t>=0)?0:l.length-1];return V.safari&&!o&&a.width==0&&(a=Array.prototype.find.call(l,u=>u.width)||a),o?cs(a,o<0):a||null}static of(e,t){let i=new Fn(t||document.createTextNode(e),e);return t||(i.flags|=2),i}}class Vn extends Ee{constructor(e,t,i,r){super(e,t,r),this.widget=i}isWidget(){return!0}get isHidden(){return this.widget.isHidden}covers(e){return this.flags&48?!1:(this.flags&(e<0?64:128))>0}coordsIn(e,t){return this.coordsInWidget(e,t,!1)}coordsInWidget(e,t,i){let r=this.widget.coordsAt(this.dom,e,t);if(r)return r;if(i)return cs(this.dom.getBoundingClientRect(),this.length?e==0:t<=0);{let s=this.dom.getClientRects(),o=null;if(!s.length)return null;let l=this.flags&16?!0:this.flags&32?!1:e>0;for(let a=l?s.length-1:0;o=s[a],!(e>0?a==0:a==s.length-1||o.top<o.bottom);a+=l?-1:1);return cs(o,!l)}}get overrideDOMText(){if(!this.length)return de.empty;let{root:e}=this;if(!e)return de.empty;let t=this.posAtStart;return e.view.state.doc.slice(t,t+this.length)}destroy(){super.destroy(),this.widget.destroy(this.dom)}static of(e,t,i,r,s){return s||(s=e.toDOM(t),e.editable||(s.contentEditable="false")),new Vn(s,i,e,r)}}class fs extends Ee{constructor(e){let t=document.createElement("img");t.className="cm-widgetBuffer",t.setAttribute("aria-hidden","true"),super(t,0,e)}get isHidden(){return!0}get overrideDOMText(){return de.empty}coordsIn(e){return this.dom.getBoundingClientRect()}}class Eg{constructor(e){this.index=0,this.beforeBreak=!1,this.parents=[],this.tile=e}advance(e,t,i){let{tile:r,index:s,beforeBreak:o,parents:l}=this;for(;e||t>0;)if(r.isComposite())if(o){if(!e)break;i&&i.break(),e--,o=!1}else if(s==r.children.length){if(!e&&!l.length)break;i&&i.leave(r),o=!!r.breakAfter,{tile:r,index:s}=l.pop(),s++}else{let a=r.children[s],u=a.breakAfter;(t>0?a.length<=e:a.length<e)&&(!i||i.skip(a,0,a.length)!==!1||!a.isComposite)?(o=!!u,s++,e-=a.length):(l.push({tile:r,index:s}),r=a,s=0,i&&a.isComposite()&&i.enter(a))}else if(s==r.length)o=!!r.breakAfter,{tile:r,index:s}=l.pop(),s++;else if(e){let a=Math.min(e,r.length-s);i&&i.skip(r,s,s+a),e-=a,s+=a}else break;return this.tile=r,this.index=s,this.beforeBreak=o,this}get root(){return this.parents.length?this.parents[0].tile:this.tile}}class Mg{constructor(e,t,i,r){this.from=e,this.to=t,this.wrapper=i,this.rank=r}}class Pg{constructor(e,t,i){this.cache=e,this.root=t,this.blockWrappers=i,this.curLine=null,this.lastBlock=null,this.afterWidget=null,this.pos=0,this.wrappers=[],this.wrapperPos=0}addText(e,t,i,r){var s;this.flushBuffer();let o=this.ensureMarks(t,i),l=o.lastChild;if(l&&l.isText()&&!(l.flags&8)&&l.length+e.length<512){this.cache.reused.set(l,2);let a=o.children[o.children.length-1]=new Fn(l.dom,l.text+e);a.parent=o}else o.append(r||Fn.of(e,(s=this.cache.find(Fn))===null||s===void 0?void 0:s.dom));this.pos+=e.length,this.afterWidget=null}addComposition(e,t){let i=this.curLine;i.dom!=t.line.dom&&(i.setDOM(this.cache.reused.has(t.line)?eo(t.line.dom):t.line.dom),this.cache.reused.set(t.line,2));let r=i;for(let l=t.marks.length-1;l>=0;l--){let a=t.marks[l],u=r.lastChild;if(u instanceof ut&&u.mark.eq(a.mark))u.dom!=a.dom&&u.setDOM(eo(a.dom)),r=u;else{if(this.cache.reused.get(a)){let h=Ee.get(a.dom);h&&h.setDOM(eo(a.dom))}let c=ut.of(a.mark,a.dom);r.append(c),r=c}this.cache.reused.set(a,2)}let s=Ee.get(e.text);s&&this.cache.reused.set(s,2);let o=new Fn(e.text,e.text.nodeValue);o.flags|=8,r.append(o)}addInlineWidget(e,t,i){let r=this.afterWidget&&e.flags&48&&(this.afterWidget.flags&48)==(e.flags&48);r||this.flushBuffer();let s=this.ensureMarks(t,i);!r&&!(e.flags&16)&&s.append(this.getBuffer(1)),s.append(e),this.pos+=e.length,this.afterWidget=e}addMark(e,t,i){this.flushBuffer(),this.ensureMarks(t,i).append(e),this.pos+=e.length,this.afterWidget=null}addBlockWidget(e){this.getBlockPos().append(e),this.pos+=e.length,this.lastBlock=e,this.endLine()}continueWidget(e){let t=this.afterWidget||this.lastBlock;t.length+=e,this.pos+=e}addLineStart(e,t){var i;e||(e=gf);let r=mi.start(e,t||((i=this.cache.find(mi))===null||i===void 0?void 0:i.dom),!!t);this.getBlockPos().append(this.lastBlock=this.curLine=r)}addLine(e){this.getBlockPos().append(e),this.pos+=e.length,this.lastBlock=e,this.endLine()}addBreak(){this.lastBlock.flags|=1,this.endLine(),this.pos++}addLineStartIfNotCovered(e){this.blockPosCovered()||this.addLineStart(e)}ensureLine(e){this.curLine||this.addLineStart(e)}ensureMarks(e,t){var i;let r=this.curLine;for(let s=e.length-1;s>=0;s--){let o=e[s],l;if(t>0&&(l=r.lastChild)&&l instanceof ut&&l.mark.eq(o))r=l,t--;else{let a=ut.of(o,(i=this.cache.find(ut,u=>u.mark.eq(o)))===null||i===void 0?void 0:i.dom);r.append(a),r=a,t=0}}return r}endLine(){if(this.curLine){this.flushBuffer();let e=this.curLine.lastChild;(!e||!ku(this.curLine,!1)||e.dom.nodeName!="BR"&&e.isWidget()&&!(V.ios&&ku(this.curLine,!0)))&&this.curLine.append(this.cache.findWidget(to,0,32)||new Vn(to.toDOM(),0,to,32)),this.curLine=this.afterWidget=null}}updateBlockWrappers(){this.wrapperPos>this.pos+1e4&&(this.blockWrappers.goto(this.pos),this.wrappers.length=0);for(let e=this.wrappers.length-1;e>=0;e--)this.wrappers[e].to<this.pos&&this.wrappers.splice(e,1);for(let e=this.blockWrappers;e.value&&e.from<=this.pos;e.next())if(e.to>=this.pos){let t=new Mg(e.from,e.to,e.value,e.rank),i=this.wrappers.length;for(;i>0&&(this.wrappers[i-1].rank-t.rank||this.wrappers[i-1].to-t.to)<0;)i--;this.wrappers.splice(i,0,t)}this.wrapperPos=this.pos}getBlockPos(){var e;this.updateBlockWrappers();let t=this.root;for(let i of this.wrappers){let r=t.lastChild;if(i.from<this.pos&&r instanceof un&&r.wrapper.eq(i.wrapper))t=r;else{let s=un.of(i.wrapper,(e=this.cache.find(un,o=>o.wrapper.eq(i.wrapper)))===null||e===void 0?void 0:e.dom);t.append(s),t=s}}return t}blockPosCovered(){let e=this.lastBlock;return e!=null&&!e.breakAfter&&(!e.isWidget()||(e.flags&160)>0)}getBuffer(e){let t=2|(e<0?16:32),i=this.cache.find(fs,void 0,1);return i&&(i.flags=t),i||new fs(t)}flushBuffer(){this.afterWidget&&!(this.afterWidget.flags&32)&&(this.afterWidget.parent.append(this.getBuffer(-1)),this.afterWidget=null)}}class Ig{constructor(e){this.skipCount=0,this.text="",this.textOff=0,this.cursor=e.iter()}skip(e){this.textOff+e<=this.text.length?this.textOff+=e:(this.skipCount+=e-(this.text.length-this.textOff),this.text="",this.textOff=0)}next(e){if(this.textOff==this.text.length){let{value:r,lineBreak:s,done:o}=this.cursor.next(this.skipCount);if(this.skipCount=0,o)throw new Error("Ran out of text content when drawing inline views");this.text=r;let l=this.textOff=Math.min(e,r.length);return s?null:r.slice(0,l)}let t=Math.min(this.text.length,this.textOff+e),i=this.text.slice(this.textOff,t);return this.textOff=t,i}}const ds=[Vn,mi,Fn,ut,fs,un,Is];for(let n=0;n<ds.length;n++)ds[n].bucket=n;class Dg{constructor(e){this.view=e,this.buckets=ds.map(()=>[]),this.index=ds.map(()=>0),this.reused=new Map}add(e){let t=e.constructor.bucket,i=this.buckets[t];i.length<6?i.push(e):i[this.index[t]=(this.index[t]+1)%6]=e}find(e,t,i=2){let r=e.bucket,s=this.buckets[r],o=this.index[r];for(let l=s.length-1;l>=0;l--){let a=(l+o)%s.length,u=s[a];if((!t||t(u))&&!this.reused.has(u))return s.splice(a,1),a<o&&this.index[r]--,this.reused.set(u,i),u}return null}findWidget(e,t,i){let r=this.buckets[0];if(r.length)for(let s=0,o=0;;s++){if(s==r.length){if(o)return null;o=1,s=0}let l=r[s];if(!this.reused.has(l)&&(o==0?l.widget.compare(e):l.widget.constructor==e.constructor&&e.updateDOM(l.dom,this.view,l.widget)))return r.splice(s,1),s<this.index[0]&&this.index[0]--,l.widget==e&&l.length==t&&(l.flags&497)==i?(this.reused.set(l,1),l):(this.reused.set(l,2),new Vn(l.dom,t,e,l.flags&-498|i))}}reuse(e){return this.reused.set(e,1),e}maybeReuse(e,t=2){if(!this.reused.has(e))return this.reused.set(e,t),e.dom}clear(){for(let e=0;e<this.buckets.length;e++)this.buckets[e].length=this.index[e]=0}}class Bg{constructor(e,t,i,r,s){this.view=e,this.decorations=r,this.disallowBlockEffectsFor=s,this.openWidget=!1,this.openMarks=0,this.cache=new Dg(e),this.text=new Ig(e.state.doc),this.builder=new Pg(this.cache,new Is(e,e.contentDOM),fe.iter(i)),this.cache.reused.set(t,2),this.old=new Eg(t),this.reuseWalker={skip:(o,l,a)=>{if(this.cache.add(o),o.isComposite())return!1},enter:o=>this.cache.add(o),leave:()=>{},break:()=>{}}}run(e,t){let i=t&&this.getCompositionContext(t.text);for(let r=0,s=0,o=0;;){let l=o<e.length?e[o++]:null,a=l?l.fromA:this.old.root.length;if(a>r){let u=a-r;this.preserve(u,!o,!l),r=a,s+=u}if(!l)break;t&&l.fromA<=t.range.fromA&&l.toA>=t.range.toA?(this.forward(l.fromA,t.range.fromA,t.range.fromA<t.range.toA?1:-1),this.emit(s,t.range.fromB),this.cache.clear(),this.builder.addComposition(t,i),this.text.skip(t.range.toB-t.range.fromB),this.forward(t.range.fromA,l.toA),this.emit(t.range.toB,l.toB)):(this.forward(l.fromA,l.toA),this.emit(s,l.toB)),s=l.toB,r=l.toA}return this.builder.curLine&&this.builder.endLine(),this.builder.root}preserve(e,t,i){let r=Rg(this.old),s=this.openMarks;this.old.advance(e,i?1:-1,{skip:(o,l,a)=>{if(o.isWidget())if(this.openWidget)this.builder.continueWidget(a-l);else{let u=a>0||l<o.length?Vn.of(o.widget,this.view,a-l,o.flags&496,this.cache.maybeReuse(o)):this.cache.reuse(o);u.flags&256?(u.flags&=-2,this.builder.addBlockWidget(u)):(this.builder.ensureLine(null),this.builder.addInlineWidget(u,r,s),s=r.length)}else if(o.isText())this.builder.ensureLine(null),!l&&a==o.length&&!this.cache.reused.has(o)?this.builder.addText(o.text,r,s,this.cache.reuse(o)):(this.cache.add(o),this.builder.addText(o.text.slice(l,a),r,s)),s=r.length;else if(o.isLine())o.flags&=-2,this.cache.reused.set(o,1),this.builder.addLine(o);else if(o instanceof fs)this.cache.add(o);else if(o instanceof ut)this.builder.ensureLine(null),this.builder.addMark(o,r,s),this.cache.reused.set(o,1),s=r.length;else return!1;this.openWidget=!1},enter:o=>{o.isLine()?this.builder.addLineStart(o.attrs,this.cache.maybeReuse(o)):(this.cache.add(o),o instanceof ut&&r.unshift(o.mark)),this.openWidget=!1},leave:o=>{o.isLine()?r.length&&(r.length=s=0):o instanceof ut&&(r.shift(),s=Math.min(s,r.length))},break:()=>{this.builder.addBreak(),this.openWidget=!1}}),this.text.skip(e)}emit(e,t){let i=null,r=this.builder,s=0,o=fe.spans(this.decorations,e,t,{point:(l,a,u,c,h,f)=>{if(u instanceof $n){if(this.disallowBlockEffectsFor[f]){if(u.block)throw new RangeError("Block decorations may not be specified via plugins");if(a>this.view.state.doc.lineAt(l).to)throw new RangeError("Decorations that replace line breaks may not be specified via plugins")}if(s=c.length,h>c.length)r.continueWidget(a-l);else{let d=u.widget||(u.block?gi.block:gi.inline),p=Lg(u),m=this.cache.findWidget(d,a-l,p)||Vn.of(d,this.view,a-l,p);u.block?(u.startSide>0&&r.addLineStartIfNotCovered(i),r.addBlockWidget(m)):(r.ensureLine(i),r.addInlineWidget(m,c,h))}i=null}else i=Og(i,u);a>l&&this.text.skip(a-l)},span:(l,a,u,c)=>{for(let h=l;h<a;){let f=this.text.next(Math.min(512,a-h));f==null?(r.addLineStartIfNotCovered(i),r.addBreak(),h++):(r.ensureLine(i),r.addText(f,u,h==l?c:u.length),h+=f.length),i=null}}});r.addLineStartIfNotCovered(i),this.openWidget=o>s,this.openMarks=o}forward(e,t,i=1){t-e<=10?this.old.advance(t-e,i,this.reuseWalker):(this.old.advance(5,-1,this.reuseWalker),this.old.advance(t-e-10,-1),this.old.advance(5,i,this.reuseWalker))}getCompositionContext(e){let t=[],i=null;for(let r=e.parentNode;;r=r.parentNode){let s=Ee.get(r);if(r==this.view.contentDOM)break;s instanceof ut?t.push(s):s!=null&&s.isLine()?i=s:s instanceof un||(r.nodeName=="DIV"&&!i&&r!=this.view.contentDOM?i=new mi(r,gf):i||t.push(ut.of(new gr({tagName:r.nodeName.toLowerCase(),attributes:ag(r)}),r)))}return{line:i,marks:t}}}function ku(n,e){let t=i=>{for(let r of i.children)if((e?r.isText():r.length)||t(r))return!0;return!1};return t(n)}function Lg(n){let e=n.isReplace?(n.startSide<0?64:0)|(n.endSide>0?128:0):n.startSide>0?32:16;return n.block&&(e|=256),e}const gf={class:"cm-line"};function Og(n,e){let t=e.spec.attributes,i=e.spec.class;return!t&&!i||(n||(n={class:"cm-line"}),t&&sa(t,n),i&&(n.class+=" "+i)),n}function Rg(n){let e=[];for(let t=n.parents.length;t>1;t--){let i=t==n.parents.length?n.tile:n.parents[t].tile;i instanceof ut&&e.push(i.mark)}return e}function eo(n){let e=Ee.get(n);return e&&e.setDOM(n.cloneNode()),n}class gi extends Es{constructor(e){super(),this.tag=e}eq(e){return e.tag==this.tag}toDOM(){return document.createElement(this.tag)}updateDOM(e){return e.nodeName.toLowerCase()==this.tag}get isHidden(){return!0}}gi.inline=new gi("span");gi.block=new gi("div");const to=new class extends Es{toDOM(){return document.createElement("br")}get isHidden(){return!0}get editable(){return!0}};class xu{constructor(e){this.view=e,this.decorations=[],this.blockWrappers=[],this.dynamicDecorationMap=[!1],this.domChanged=null,this.hasComposition=null,this.editContextFormatting=Oe.none,this.lastCompositionAfterCursor=!1,this.minWidth=0,this.minWidthFrom=0,this.minWidthTo=0,this.impreciseAnchor=null,this.impreciseHead=null,this.forceSelection=!1,this.lastUpdate=Date.now(),this.updateDeco(),this.tile=new Is(e,e.contentDOM),this.updateInner([new Tt(0,0,0,e.state.doc.length)],null)}update(e){var t;let i=e.changedRanges;this.minWidth>0&&i.length&&(i.every(({fromA:c,toA:h})=>h<this.minWidthFrom||c>this.minWidthTo)?(this.minWidthFrom=e.changes.mapPos(this.minWidthFrom,1),this.minWidthTo=e.changes.mapPos(this.minWidthTo,1)):this.minWidth=this.minWidthFrom=this.minWidthTo=0),this.updateEditContextFormatting(e);let r=-1;this.view.inputState.composing>=0&&!this.view.observer.editContext&&(!((t=this.domChanged)===null||t===void 0)&&t.newSel?r=this.domChanged.newSel.head:!Ug(e.changes,this.hasComposition)&&!e.selectionSet&&(r=e.state.selection.main.head));let s=r>-1?Fg(this.view,e.changes,r):null;if(this.domChanged=null,this.hasComposition){let{from:c,to:h}=this.hasComposition;i=new Tt(c,h,e.changes.mapPos(c,-1),e.changes.mapPos(h,1)).addToSet(i.slice())}this.hasComposition=s?{from:s.range.fromB,to:s.range.toB}:null,(V.ie||V.chrome)&&!s&&e&&e.state.doc.lines!=e.startState.doc.lines&&(this.forceSelection=!0);let o=this.decorations,l=this.blockWrappers;this.updateDeco();let a=Hg(o,this.decorations,e.changes);a.length&&(i=Tt.extendWithRanges(i,a));let u=Wg(l,this.blockWrappers,e.changes);return u.length&&(i=Tt.extendWithRanges(i,u)),s&&!i.some(c=>c.fromA<=s.range.fromA&&c.toA>=s.range.toA)&&(i=s.range.addToSet(i.slice())),this.tile.flags&2&&i.length==0?!1:(this.updateInner(i,s),e.transactions.length&&(this.lastUpdate=Date.now()),!0)}updateInner(e,t){this.view.viewState.mustMeasureContent=!0;let{observer:i}=this.view;i.ignore(()=>{if(t||e.length){let o=this.tile,l=new Bg(this.view,o,this.blockWrappers,this.decorations,this.dynamicDecorationMap);t&&Ee.get(t.text)&&l.cache.reused.set(Ee.get(t.text),2),this.tile=l.run(e,t),cl(o,l.cache.reused)}this.tile.dom.style.height=this.view.viewState.contentHeight/this.view.scaleY+"px",this.tile.dom.style.flexBasis=this.minWidth?this.minWidth+"px":"";let s=V.chrome||V.ios?{node:i.selectionRange.focusNode,written:!1}:void 0;this.tile.sync(s),s&&(s.written||i.selectionRange.focusNode!=s.node||!this.tile.dom.contains(s.node))&&(this.forceSelection=!0),this.tile.dom.style.height=""});let r=[];if(this.view.viewport.from||this.view.viewport.to<this.view.state.doc.length)for(let s of this.tile.children)s.isWidget()&&s.widget instanceof no&&r.push(s.dom);i.updateGaps(r)}updateEditContextFormatting(e){this.editContextFormatting=this.editContextFormatting.map(e.changes);for(let t of e.transactions)for(let i of t.effects)i.is(cf)&&(this.editContextFormatting=i.value)}updateSelection(e=!1,t=!1){(e||!this.view.observer.selectionRange.focusNode)&&this.view.observer.readSelectionRange();let{dom:i}=this.tile,r=this.view.root.activeElement,s=r==i,o=!s&&!(this.view.state.facet(ln)||i.tabIndex>-1)&&Xi(i,this.view.observer.selectionRange)&&!(r&&i.contains(r));if(!(s||t||o))return;let l=this.forceSelection;this.forceSelection=!1;let a=this.view.state.selection.main,u,c;if(a.empty?c=u=this.inlineDOMNearPos(a.anchor,a.assoc||1):(c=this.inlineDOMNearPos(a.head,a.head==a.from?1:-1),u=this.inlineDOMNearPos(a.anchor,a.anchor==a.from?1:-1)),V.gecko&&a.empty&&!this.hasComposition&&zg(u)){let f=document.createTextNode("");this.view.observer.ignore(()=>u.node.insertBefore(f,u.node.childNodes[u.offset]||null)),u=c=new Lt(f,0),l=!0}let h=this.view.observer.selectionRange;(l||!h.focusNode||(!Gi(u.node,u.offset,h.anchorNode,h.anchorOffset)||!Gi(c.node,c.offset,h.focusNode,h.focusOffset))&&!this.suppressWidgetCursorChange(h,a))&&(this.view.observer.ignore(()=>{V.android&&V.chrome&&i.contains(h.focusNode)&&Vg(h.focusNode,i)&&(i.blur(),i.focus({preventScroll:!0}));let f=lr(this.view.root);if(f)if(a.empty){if(V.gecko){let d=Ng(u.node,u.offset);if(d&&d!=3){let p=(d==1?Kh:Xh)(u.node,u.offset);p&&(u=new Lt(p.node,p.offset))}}f.collapse(u.node,u.offset),a.bidiLevel!=null&&f.caretBidiLevel!==void 0&&(f.caretBidiLevel=a.bidiLevel)}else if(f.extend){f.collapse(u.node,u.offset);try{f.extend(c.node,c.offset)}catch{}}else{let d=document.createRange();a.anchor>a.head&&([u,c]=[c,u]),d.setEnd(c.node,c.offset),d.setStart(u.node,u.offset),f.removeAllRanges(),f.addRange(d)}o&&this.view.root.activeElement==i&&(i.blur(),r&&r.focus())}),this.view.observer.setSelectionRange(u,c)),this.impreciseAnchor=u.precise?null:new Lt(h.anchorNode,h.anchorOffset),this.impreciseHead=c.precise?null:new Lt(h.focusNode,h.focusOffset)}suppressWidgetCursorChange(e,t){return this.hasComposition&&t.empty&&Gi(e.focusNode,e.focusOffset,e.anchorNode,e.anchorOffset)&&this.posFromDOM(e.focusNode,e.focusOffset)==t.head}enforceCursorAssoc(){if(this.hasComposition)return;let{view:e}=this,t=e.state.selection.main,i=lr(e.root),{anchorNode:r,anchorOffset:s}=e.observer.selectionRange;if(!i||!t.empty||!t.assoc||!i.modify)return;let o=this.lineAt(t.head,t.assoc);if(!o)return;let l=o.posAtStart;if(t.head==l||t.head==l+o.length)return;let a=this.coordsAt(t.head,-1),u=this.coordsAt(t.head,1);if(!a||!u||a.bottom>u.top)return;let c=this.domAtPos(t.head+t.assoc,t.assoc);i.collapse(c.node,c.offset),i.modify("move",t.assoc<0?"forward":"backward","lineboundary"),e.observer.readSelectionRange();let h=e.observer.selectionRange;e.docView.posFromDOM(h.anchorNode,h.anchorOffset)!=t.from&&i.collapse(r,s)}posFromDOM(e,t){let i=this.tile.nearest(e);if(!i)return this.tile.dom.compareDocumentPosition(e)&2?0:this.view.state.doc.length;let r=i.posAtStart;if(i.isComposite()){let s;if(e==i.dom)s=i.dom.childNodes[t];else{let o=cn(e)==0?0:t==0?-1:1;for(;;){let l=e.parentNode;if(l==i.dom)break;o==0&&l.firstChild!=l.lastChild&&(e==l.firstChild?o=-1:o=1),e=l}o<0?s=e:s=e.nextSibling}if(s==i.dom.firstChild)return r;for(;s&&!Ee.get(s);)s=s.nextSibling;if(!s)return r+i.length;for(let o=0,l=r;;o++){let a=i.children[o];if(a.dom==s)return l;l+=a.length+a.breakAfter}}else return i.isText()?e==i.dom?r+t:r+(t?i.length:0):r}domAtPos(e,t){let{tile:i,offset:r}=this.tile.resolveBlock(e,t);return i.isWidget()?i.domPosFor(e,t):i.domIn(r,t)}inlineDOMNearPos(e,t){let i,r=-1,s=!1,o,l=-1,a=!1;return this.tile.blockTiles((u,c)=>{if(u.isWidget()){if(u.flags&32&&c>=e)return!0;u.flags&16&&(s=!0)}else{let h=c+u.length;if(c<=e&&(i=u,r=e-c,s=h<e),h>=e&&!o&&(o=u,l=e-c,a=c>e),c>e&&o)return!0}}),!i&&!o?this.domAtPos(e,t):(s&&o?i=null:a&&i&&(o=null),i&&t<0||!o?i.domIn(r,t):o.domIn(l,t))}coordsAt(e,t){let{tile:i,offset:r}=this.tile.resolveBlock(e,t);return i.isWidget()?i.widget instanceof no?null:i.coordsInWidget(r,t,!0):i.coordsIn(r,t)}lineAt(e,t){let{tile:i}=this.tile.resolveBlock(e,t);return i.isLine()?i:null}coordsForChar(e){let{tile:t,offset:i}=this.tile.resolveBlock(e,1);if(!t.isLine())return null;function r(s,o){if(s.isComposite())for(let l of s.children){if(l.length>=o){let a=r(l,o);if(a)return a}if(o-=l.length,o<0)break}else if(s.isText()&&o<s.length){let l=Xe(s.text,o);if(l==o)return null;let a=ar(s.dom,o,l).getClientRects();for(let u=0;u<a.length;u++){let c=a[u];if(u==a.length-1||c.top<c.bottom&&c.left<c.right)return c}}return null}return r(t,i)}measureVisibleLineHeights(e){let t=[],{from:i,to:r}=e,s=this.view.contentDOM.clientWidth,o=s>Math.max(this.view.scrollDOM.clientWidth,this.minWidth)+1,l=-1,a=this.view.textDirection==_e.LTR,u=0,c=(h,f,d)=>{for(let p=0;p<h.children.length&&!(f>r);p++){let m=h.children[p],b=f+m.length,g=m.dom.getBoundingClientRect(),{height:S}=g;if(d&&!p&&(u+=g.top-d.top),m instanceof un)b>i&&c(m,f,g);else if(f>=i&&(u>0&&t.push(-u),t.push(S+u),u=0,o)){let v=m.dom.lastChild,D=v?Qr(v):[];if(D.length){let A=D[D.length-1],k=a?A.right-g.left:g.right-A.left;k>l&&(l=k,this.minWidth=s,this.minWidthFrom=f,this.minWidthTo=b)}}d&&p==h.children.length-1&&(u+=d.bottom-g.bottom),f=b+m.breakAfter}};return c(this.tile,0,null),t}textDirectionAt(e){let{tile:t}=this.tile.resolveBlock(e,1);return getComputedStyle(t.dom).direction=="rtl"?_e.RTL:_e.LTR}measureTextSize(){let e=this.tile.blockTiles(o=>{if(o.isLine()&&o.children.length&&o.length<=20){let l=0,a;for(let u of o.children){if(!u.isText()||/[^ -~]/.test(u.text))return;let c=Qr(u.dom);if(c.length!=1)return;l+=c[0].width,a=c[0].height}if(l)return{lineHeight:o.dom.getBoundingClientRect().height,charWidth:l/o.length,textHeight:a}}});if(e)return e;let t=document.createElement("div"),i,r,s;return t.className="cm-line",t.style.width="99999px",t.style.position="absolute",t.textContent="abc def ghi jkl mno pqr stu",this.view.observer.ignore(()=>{this.tile.dom.appendChild(t);let o=Qr(t.firstChild)[0];i=t.getBoundingClientRect().height,r=o&&o.width?o.width/27:7,s=o&&o.height?o.height:i,t.remove()}),{lineHeight:i,charWidth:r,textHeight:s}}computeBlockGapDeco(){let e=[],t=this.view.viewState;for(let i=0,r=0;;r++){let s=r==t.viewports.length?null:t.viewports[r],o=s?s.from-1:this.view.state.doc.length;if(o>i){let l=(t.lineBlockAt(o).bottom-t.lineBlockAt(i).top)/this.view.scaleY;e.push(Oe.replace({widget:new no(l),block:!0,inclusive:!0,isBlockGap:!0}).range(i,o))}if(!s)break;i=s.to+1}return Oe.set(e)}updateDeco(){let e=1,t=this.view.state.facet(Ms).map(s=>(this.dynamicDecorationMap[e++]=typeof s=="function")?s(this.view):s),i=!1,r=this.view.state.facet(ha).map((s,o)=>{let l=typeof s=="function";return l&&(i=!0),l?s(this.view):s});for(r.length&&(this.dynamicDecorationMap[e++]=i,t.push(fe.join(r))),this.decorations=[this.editContextFormatting,...t,this.computeBlockGapDeco(),this.view.viewState.lineGapDeco];e<this.decorations.length;)this.dynamicDecorationMap[e++]=!1;this.blockWrappers=this.view.state.facet(ff).map(s=>typeof s=="function"?s(this.view):s)}scrollIntoView(e){var t;if(e.isSnapshot){let c=this.view.viewState.lineBlockAt(e.range.head);this.view.scrollDOM.scrollTop=c.top-e.yMargin,this.view.scrollDOM.scrollLeft=e.xMargin;return}for(let c of this.view.state.facet(uf))try{if(c(this.view,e.range,e))return!0}catch(h){Yt(this.view.state,h,"scroll handler")}let{range:i}=e,r=this.coordsAt(i.head,(t=i.assoc)!==null&&t!==void 0?t:i.empty?0:i.head>i.anchor?-1:1),s;if(!r)return;!i.empty&&(s=this.coordsAt(i.anchor,i.anchor>i.head?-1:1))&&(r={left:Math.min(r.left,s.left),top:Math.min(r.top,s.top),right:Math.max(r.right,s.right),bottom:Math.max(r.bottom,s.bottom)});let o=mf(this.view),l={left:r.left-o.left,top:r.top-o.top,right:r.right+o.right,bottom:r.bottom+o.bottom},{offsetWidth:a,offsetHeight:u}=this.view.scrollDOM;if(hg(this.view.scrollDOM,l,i.head<i.anchor?-1:1,e.x,e.y,Math.max(Math.min(e.xMargin,a),-a),Math.max(Math.min(e.yMargin,u),-u),this.view.textDirection==_e.LTR),window.visualViewport&&window.innerHeight-window.visualViewport.height>1&&(r.top>window.pageYOffset+window.visualViewport.offsetTop+window.visualViewport.height||r.bottom<window.pageYOffset+window.visualViewport.offsetTop)){let c=this.view.docView.lineAt(i.head,1);c&&c.dom.scrollIntoView({block:"nearest"})}}lineHasWidget(e){let t=i=>i.isWidget()||i.children.some(t);return t(this.tile.resolveBlock(e,1).tile)}destroy(){cl(this.tile)}}function cl(n,e){let t=e==null?void 0:e.get(n);if(t!=1){t==null&&n.destroy();for(let i of n.children)cl(i,e)}}function zg(n){return n.node.nodeType==1&&n.node.firstChild&&(n.offset==0||n.node.childNodes[n.offset-1].contentEditable=="false")&&(n.offset==n.node.childNodes.length||n.node.childNodes[n.offset].contentEditable=="false")}function bf(n,e){let t=n.observer.selectionRange;if(!t.focusNode)return null;let i=Kh(t.focusNode,t.focusOffset),r=Xh(t.focusNode,t.focusOffset),s=i||r;if(r&&i&&r.node!=i.node){let l=Ee.get(r.node);if(!l||l.isText()&&l.text!=r.node.nodeValue)s=r;else if(n.docView.lastCompositionAfterCursor){let a=Ee.get(i.node);!a||a.isText()&&a.text!=i.node.nodeValue||(s=r)}}if(n.docView.lastCompositionAfterCursor=s!=i,!s)return null;let o=e-s.offset;return{from:o,to:o+s.node.nodeValue.length,node:s.node}}function Fg(n,e,t){let i=bf(n,t);if(!i)return null;let{node:r,from:s,to:o}=i,l=r.nodeValue;if(/[\n\r]/.test(l)||n.state.doc.sliceString(i.from,i.to)!=l)return null;let a=e.invertedDesc;return{range:new Tt(a.mapPos(s),a.mapPos(o),s,o),text:r}}function Ng(n,e){return n.nodeType!=1?0:(e&&n.childNodes[e-1].contentEditable=="false"?1:0)|(e<n.childNodes.length&&n.childNodes[e].contentEditable=="false"?2:0)}let qg=class{constructor(){this.changes=[]}compareRange(e,t){ui(e,t,this.changes)}comparePoint(e,t){ui(e,t,this.changes)}boundChange(e){ui(e,e,this.changes)}};function Hg(n,e,t){let i=new qg;return fe.compare(n,e,t,i),i.changes}class $g{constructor(){this.changes=[]}compareRange(e,t){ui(e,t,this.changes)}comparePoint(){}boundChange(e){ui(e,e,this.changes)}}function Wg(n,e,t){let i=new $g;return fe.compare(n,e,t,i),i.changes}function Vg(n,e){for(let t=n;t&&t!=e;t=t.assignedSlot||t.parentNode)if(t.nodeType==1&&t.contentEditable=="false")return!0;return!1}function Ug(n,e){let t=!1;return e&&n.iterChangedRanges((i,r)=>{i<e.to&&r>e.from&&(t=!0)}),t}class no extends Es{constructor(e){super(),this.height=e}toDOM(){let e=document.createElement("div");return e.className="cm-gap",this.updateDOM(e),e}eq(e){return e.height==this.height}updateDOM(e){return e.style.height=this.height+"px",!0}get editable(){return!0}get estimatedHeight(){return this.height}ignoreEvent(){return!1}}function jg(n,e,t=1){let i=n.charCategorizer(e),r=n.doc.lineAt(e),s=e-r.from;if(r.length==0)return O.cursor(e);s==0?t=1:s==r.length&&(t=-1);let o=s,l=s;t<0?o=Xe(r.text,s,!1):l=Xe(r.text,s);let a=i(r.text.slice(o,l));for(;o>0;){let u=Xe(r.text,o,!1);if(i(r.text.slice(u,o))!=a)break;o=u}for(;l<r.length;){let u=Xe(r.text,l);if(i(r.text.slice(l,u))!=a)break;l=u}return O.range(o+r.from,l+r.from)}function Kg(n,e,t,i,r){let s=Math.round((i-e.left)*n.defaultCharacterWidth);if(n.lineWrapping&&t.height>n.defaultLineHeight*1.5){let l=n.viewState.heightOracle.textHeight,a=Math.floor((r-t.top-(n.defaultLineHeight-l)*.5)/l);s+=a*n.viewState.heightOracle.lineLength}let o=n.state.sliceDoc(t.from,t.to);return t.from+tg(o,s,n.state.tabSize)}function hl(n,e,t){let i=n.lineBlockAt(e);if(Array.isArray(i.type)){let r;for(let s of i.type){if(s.from>e)break;if(!(s.to<e)){if(s.from<e&&s.to>e)return s;(!r||s.type==Ve.Text&&(r.type!=s.type||(t<0?s.from<e:s.to>e)))&&(r=s)}}return r||i}return i}function Xg(n,e,t,i){let r=hl(n,e.head,e.assoc||-1),s=!i||r.type!=Ve.Text||!(n.lineWrapping||r.widgetLineBreaks)?null:n.coordsAtPos(e.assoc<0&&e.head>r.from?e.head-1:e.head);if(s){let o=n.dom.getBoundingClientRect(),l=n.textDirectionAt(r.from),a=n.posAtCoords({x:t==(l==_e.LTR)?o.right-1:o.left+1,y:(s.top+s.bottom)/2});if(a!=null)return O.cursor(a,t?-1:1)}return O.cursor(t?r.to:r.from,t?-1:1)}function vu(n,e,t,i){let r=n.state.doc.lineAt(e.head),s=n.bidiSpans(r),o=n.textDirectionAt(r.from);for(let l=e,a=null;;){let u=vg(r,s,o,l,t),c=Zh;if(!u){if(r.number==(t?n.state.doc.lines:1))return l;c=`
`,r=n.state.doc.line(r.number+(t?1:-1)),s=n.bidiSpans(r),u=n.visualLineSide(r,!t)}if(a){if(!a(c))return l}else{if(!i)return u;a=i(c)}l=u}}function Gg(n,e,t){let i=n.state.charCategorizer(e),r=i(t);return s=>{let o=i(s);return r==an.Space&&(r=o),r==o}}function Yg(n,e,t,i){let r=e.head,s=t?1:-1;if(r==(t?n.state.doc.length:0))return O.cursor(r,e.assoc);let o=e.goalColumn,l,a=n.contentDOM.getBoundingClientRect(),u=n.coordsAtPos(r,e.assoc||((e.empty?t:e.head==e.from)?1:-1)),c=n.documentTop;if(u)o==null&&(o=u.left-a.left),l=s<0?u.top:u.bottom;else{let p=n.viewState.lineBlockAt(r);o==null&&(o=Math.min(a.right-a.left,n.defaultCharacterWidth*(r-p.from))),l=(s<0?p.top:p.bottom)+c}let h=a.left+o,f=n.viewState.heightOracle.textHeight>>1,d=i??f;for(let p=0;;p+=f){let m=l+(d+p)*s,b=fl(n,{x:h,y:m},!1,s);if(t?m>a.bottom:m<a.top)return O.cursor(b.pos,b.assoc);let g=n.coordsAtPos(b.pos,b.assoc),S=g?(g.top+g.bottom)/2:0;if(!g||(t?S>l:S<l))return O.cursor(b.pos,b.assoc,void 0,o)}}function Yi(n,e,t){for(;;){let i=0;for(let r of n)r.between(e-1,e+1,(s,o,l)=>{if(e>s&&e<o){let a=i||t||(e-s<o-e?-1:1);e=a<0?s:o,i=a}});if(!i)return e}}function yf(n,e){let t=null;for(let i=0;i<e.ranges.length;i++){let r=e.ranges[i],s=null;if(r.empty){let o=Yi(n,r.from,0);o!=r.from&&(s=O.cursor(o,-1))}else{let o=Yi(n,r.from,-1),l=Yi(n,r.to,1);(o!=r.from||l!=r.to)&&(s=O.range(r.from==r.anchor?o:l,r.from==r.head?o:l))}s&&(t||(t=e.ranges.slice()),t[i]=s)}return t?O.create(t,e.mainIndex):e}function io(n,e,t){let i=Yi(n.state.facet(yr).map(r=>r(n)),t.from,e.head>t.from?-1:1);return i==t.from?t:O.cursor(i,i<t.from?1:-1)}class Xt{constructor(e,t){this.pos=e,this.assoc=t}}function fl(n,e,t,i){let r=n.contentDOM.getBoundingClientRect(),s=r.top+n.viewState.paddingTop,{x:o,y:l}=e,a=l-s,u;for(;;){if(a<0)return new Xt(0,1);if(a>n.viewState.docHeight)return new Xt(n.state.doc.length,-1);if(u=n.elementAtHeight(a),i==null)break;if(u.type==Ve.Text){if(i<0?u.to<n.viewport.from:u.from>n.viewport.to)break;let f=n.docView.coordsAt(i<0?u.from:u.to,i>0?-1:1);if(f&&(i<0?f.top<=a+s:f.bottom>=a+s))break}let h=n.viewState.heightOracle.textHeight/2;a=i>0?u.bottom+h:u.top-h}if(n.viewport.from>=u.to||n.viewport.to<=u.from){if(t)return null;if(u.type==Ve.Text){let h=Kg(n,r,u,o,l);return new Xt(h,h==u.from?1:-1)}}if(u.type!=Ve.Text)return a<(u.top+u.bottom)/2?new Xt(u.from,1):new Xt(u.to,-1);let c=n.docView.lineAt(u.from,2);return(!c||c.length!=u.length)&&(c=n.docView.lineAt(u.from,-2)),new Qg(n,o,l,n.textDirectionAt(u.from)).scanTile(c,u.from)}class Qg{constructor(e,t,i,r){this.view=e,this.x=t,this.y=i,this.baseDir=r,this.line=null,this.spans=null}bidiSpansAt(e){return(!this.line||this.line.from>e||this.line.to<e)&&(this.line=this.view.state.doc.lineAt(e),this.spans=this.view.bidiSpans(this.line)),this}baseDirAt(e,t){let{line:i,spans:r}=this.bidiSpansAt(e);return r[Gt.find(r,e-i.from,-1,t)].level==this.baseDir}dirAt(e,t){let{line:i,spans:r}=this.bidiSpansAt(e);return r[Gt.find(r,e-i.from,-1,t)].dir}bidiIn(e,t){let{spans:i,line:r}=this.bidiSpansAt(e);return i.length>1||i.length&&(i[0].level!=this.baseDir||i[0].to+r.from<t)}scan(e,t){let i=0,r=e.length-1,s=new Set,o=this.bidiIn(e[0],e[r]),l,a,u=-1,c=1e9,h;e:for(;i<r;){let d=r-i,p=i+r>>1;t:if(s.has(p)){let b=i+Math.floor(Math.random()*d);for(let g=0;g<d;g++){if(!s.has(b)){p=b;break t}b++,b==r&&(b=i)}break e}s.add(p);let m=t(p);if(m)for(let b=0;b<m.length;b++){let g=m[b],S=0;if(!(g.width==0&&m.length>1)){if(g.bottom<this.y)(!l||l.bottom<g.bottom)&&(l=g),S=1;else if(g.top>this.y)(!a||a.top>g.top)&&(a=g),S=-1;else{let v=g.left>this.x?this.x-g.left:g.right<this.x?this.x-g.right:0,D=Math.abs(v);D<c&&(u=p,c=D,h=g),v&&(S=v<0==(this.baseDir==_e.LTR)?-1:1)}S==-1&&(!o||this.baseDirAt(e[p],1))?r=p:S==1&&(!o||this.baseDirAt(e[p+1],-1))&&(i=p+1)}}}if(!h){let d=l&&(!a||this.y-l.bottom<a.top-this.y)?l:a;return this.y=(d.top+d.bottom)/2,this.scan(e,t)}let f=(o?this.dirAt(e[u],1):this.baseDir)==_e.LTR;return{i:u,after:this.x>(h.left+h.right)/2==f}}scanText(e,t){let i=[];for(let s=0;s<e.length;s=Xe(e.text,s))i.push(t+s);i.push(t+e.length);let r=this.scan(i,s=>{let o=i[s]-t,l=i[s+1]-t;return ar(e.dom,o,l).getClientRects()});return r.after?new Xt(i[r.i+1],-1):new Xt(i[r.i],1)}scanTile(e,t){if(!e.length)return new Xt(t,1);if(e.children.length==1){let l=e.children[0];if(l.isText())return this.scanText(l,t);if(l.isComposite())return this.scanTile(l,t)}let i=[t];for(let l=0,a=t;l<e.children.length;l++)i.push(a+=e.children[l].length);let r=this.scan(i,l=>{let a=e.children[l];return a.flags&48?null:(a.dom.nodeType==1?a.dom:ar(a.dom,0,a.length)).getClientRects()}),s=e.children[r.i],o=i[r.i];return s.isText()?this.scanText(s,o):s.isComposite()?this.scanTile(s,o):r.after?new Xt(i[r.i+1],-1):new Xt(o,1)}}const ti="￿";class Jg{constructor(e,t){this.points=e,this.view=t,this.text="",this.lineSeparator=t.state.facet(pe.lineSeparator)}append(e){this.text+=e}lineBreak(){this.text+=ti}readRange(e,t){if(!e)return this;let i=e.parentNode;for(let r=e;;){this.findPointBefore(i,r);let s=this.text.length;this.readNode(r);let o=Ee.get(r),l=r.nextSibling;if(l==t){o!=null&&o.breakAfter&&!l&&i!=this.view.contentDOM&&this.lineBreak();break}let a=Ee.get(l);(o&&a?o.breakAfter:(o?o.breakAfter:us(r))||us(l)&&(r.nodeName!="BR"||o!=null&&o.isWidget())&&this.text.length>s)&&!e1(l,t)&&this.lineBreak(),r=l}return this.findPointBefore(i,t),this}readTextNode(e){let t=e.nodeValue;for(let i of this.points)i.node==e&&(i.pos=this.text.length+Math.min(i.offset,t.length));for(let i=0,r=this.lineSeparator?null:/\r\n?|\n/g;;){let s=-1,o=1,l;if(this.lineSeparator?(s=t.indexOf(this.lineSeparator,i),o=this.lineSeparator.length):(l=r.exec(t))&&(s=l.index,o=l[0].length),this.append(t.slice(i,s<0?t.length:s)),s<0)break;if(this.lineBreak(),o>1)for(let a of this.points)a.node==e&&a.pos>this.text.length&&(a.pos-=o-1);i=s+o}}readNode(e){let t=Ee.get(e),i=t&&t.overrideDOMText;if(i!=null){this.findPointInside(e,i.length);for(let r=i.iter();!r.next().done;)r.lineBreak?this.lineBreak():this.append(r.value)}else e.nodeType==3?this.readTextNode(e):e.nodeName=="BR"?e.nextSibling&&this.lineBreak():e.nodeType==1&&this.readRange(e.firstChild,null)}findPointBefore(e,t){for(let i of this.points)i.node==e&&e.childNodes[i.offset]==t&&(i.pos=this.text.length)}findPointInside(e,t){for(let i of this.points)(e.nodeType==3?i.node==e:e.contains(i.node))&&(i.pos=this.text.length+(Zg(e,i.node,i.offset)?t:0))}}function Zg(n,e,t){for(;;){if(!e||t<cn(e))return!1;if(e==n)return!0;t=_n(e)+1,e=e.parentNode}}function e1(n,e){let t;for(;!(n==e||!n);n=n.nextSibling){let i=Ee.get(n);if(!(i!=null&&i.isWidget()))return!1;i&&(t||(t=[])).push(i)}if(t)for(let i of t){let r=i.overrideDOMText;if(r!=null&&r.length)return!1}return!0}class Su{constructor(e,t){this.node=e,this.offset=t,this.pos=-1}}class t1{constructor(e,t,i,r){this.typeOver=r,this.bounds=null,this.text="",this.domChanged=t>-1;let{impreciseHead:s,impreciseAnchor:o}=e.docView,l=e.state.selection;if(e.state.readOnly&&t>-1)this.newSel=null;else if(t>-1&&(this.bounds=wf(e.docView.tile,t,i,0))){let a=s||o?[]:i1(e),u=new Jg(a,e);u.readRange(this.bounds.startDOM,this.bounds.endDOM),this.text=u.text,this.newSel=r1(a,this.bounds.from)}else{let a=e.observer.selectionRange,u=s&&s.node==a.focusNode&&s.offset==a.focusOffset||!sl(e.contentDOM,a.focusNode)?l.main.head:e.docView.posFromDOM(a.focusNode,a.focusOffset),c=o&&o.node==a.anchorNode&&o.offset==a.anchorOffset||!sl(e.contentDOM,a.anchorNode)?l.main.anchor:e.docView.posFromDOM(a.anchorNode,a.anchorOffset),h=e.viewport;if((V.ios||V.chrome)&&l.main.empty&&u!=c&&(h.from>0||h.to<e.state.doc.length)){let f=Math.min(u,c),d=Math.max(u,c),p=h.from-f,m=h.to-d;(p==0||p==1||f==0)&&(m==0||m==-1||d==e.state.doc.length)&&(u=0,c=e.state.doc.length)}if(e.inputState.composing>-1&&l.ranges.length>1)this.newSel=l.replaceRange(O.range(c,u));else if(e.lineWrapping&&c==u&&!(l.main.empty&&l.main.head==u)&&e.inputState.lastTouchTime>Date.now()-100){let f=e.coordsAtPos(u,-1),d=0;f&&(d=e.inputState.lastTouchY<=f.bottom?-1:1),this.newSel=O.create([O.cursor(u,d)])}else this.newSel=O.single(c,u)}}}function wf(n,e,t,i){if(n.isComposite()){let r=-1,s=-1,o=-1,l=-1;for(let a=0,u=i,c=i;a<n.children.length;a++){let h=n.children[a],f=u+h.length;if(u<e&&f>t)return wf(h,e,t,u);if(f>=e&&r==-1&&(r=a,s=u),u>t&&h.dom.parentNode==n.dom){o=a,l=c;break}c=f,u=f+h.breakAfter}return{from:s,to:l<0?i+n.length:l,startDOM:(r?n.children[r-1].dom.nextSibling:null)||n.dom.firstChild,endDOM:o<n.children.length&&o>=0?n.children[o].dom:null}}else return n.isText()?{from:i,to:i+n.length,startDOM:n.dom,endDOM:n.dom.nextSibling}:null}function kf(n,e){let t,{newSel:i}=e,{state:r}=n,s=r.selection.main,o=n.inputState.lastKeyTime>Date.now()-100?n.inputState.lastKeyCode:-1;if(e.bounds){let{from:l,to:a}=e.bounds,u=s.from,c=null;(o===8||V.android&&e.text.length<a-l)&&(u=s.to,c="end");let h=r.doc.sliceString(l,a,ti),f,d;!s.empty&&s.from>=l&&s.to<=a&&(e.typeOver||h!=e.text)&&h.slice(0,s.from-l)==e.text.slice(0,s.from-l)&&h.slice(s.to-l)==e.text.slice(f=e.text.length-(h.length-(s.to-l)))?t={from:s.from,to:s.to,insert:de.of(e.text.slice(s.from-l,f).split(ti))}:(d=xf(h,e.text,u-l,c))&&(V.chrome&&o==13&&d.toB==d.from+2&&e.text.slice(d.from,d.toB)==ti+ti&&d.toB--,t={from:l+d.from,to:l+d.toA,insert:de.of(e.text.slice(d.from,d.toB).split(ti))})}else i&&(!n.hasFocus&&r.facet(ln)||ps(i,s))&&(i=null);if(!t&&!i)return!1;if((V.mac||V.android)&&t&&t.from==t.to&&t.from==s.head-1&&/^\. ?$/.test(t.insert.toString())&&n.contentDOM.getAttribute("autocorrect")=="off"?(i&&t.insert.length==2&&(i=O.single(i.main.anchor-1,i.main.head-1)),t={from:t.from,to:t.to,insert:de.of([t.insert.toString().replace("."," ")])}):r.doc.lineAt(s.from).to<s.to&&n.docView.lineHasWidget(s.to)&&n.inputState.insertingTextAt>Date.now()-50?t={from:s.from,to:s.to,insert:r.toText(n.inputState.insertingText)}:V.chrome&&t&&t.from==t.to&&t.from==s.head&&t.insert.toString()==`
 `&&n.lineWrapping&&(i&&(i=O.single(i.main.anchor-1,i.main.head-1)),t={from:s.from,to:s.to,insert:de.of([" "])}),t)return fa(n,t,i,o);if(i&&!ps(i,s)){let l=!1,a="select";return n.inputState.lastSelectionTime>Date.now()-50&&(n.inputState.lastSelectionOrigin=="select"&&(l=!0),a=n.inputState.lastSelectionOrigin,a=="select.pointer"&&(i=yf(r.facet(yr).map(u=>u(n)),i))),n.dispatch({selection:i,scrollIntoView:l,userEvent:a}),!0}else return!1}function fa(n,e,t,i=-1){if(V.ios&&n.inputState.flushIOSKey(e))return!0;let r=n.state.selection.main;if(V.android&&(e.to==r.to&&(e.from==r.from||e.from==r.from-1&&n.state.sliceDoc(e.from,r.from)==" ")&&e.insert.length==1&&e.insert.lines==2&&ci(n.contentDOM,"Enter",13)||(e.from==r.from-1&&e.to==r.to&&e.insert.length==0||i==8&&e.insert.length<e.to-e.from&&e.to>r.head)&&ci(n.contentDOM,"Backspace",8)||e.from==r.from&&e.to==r.to+1&&e.insert.length==0&&ci(n.contentDOM,"Delete",46)))return!0;let s=e.insert.toString();n.inputState.composing>=0&&n.inputState.composing++;let o,l=()=>o||(o=n1(n,e,t));return n.state.facet(sf).some(a=>a(n,e.from,e.to,s,l))||n.dispatch(l()),!0}function n1(n,e,t){let i,r=n.state,s=r.selection.main,o=-1;if(e.from==e.to&&e.from<s.from||e.from>s.to){let a=e.from<s.from?-1:1,u=a<0?s.from:s.to,c=Yi(r.facet(yr).map(h=>h(n)),u,a);e.from==c&&(o=c)}if(o>-1)i={changes:e,selection:O.cursor(e.from+e.insert.length,-1)};else if(e.from>=s.from&&e.to<=s.to&&e.to-e.from>=(s.to-s.from)/3&&(!t||t.main.empty&&t.main.from==e.from+e.insert.length)&&n.inputState.composing<0){let a=s.from<e.from?r.sliceDoc(s.from,e.from):"",u=s.to>e.to?r.sliceDoc(e.to,s.to):"";i=r.replaceSelection(n.state.toText(a+e.insert.sliceString(0,void 0,n.state.lineBreak)+u))}else{let a=r.changes(e),u=t&&t.main.to<=a.newLength?t.main:void 0;if(r.selection.ranges.length>1&&(n.inputState.composing>=0||n.inputState.compositionPendingChange)&&e.to<=s.to+10&&e.to>=s.to-10){let c=n.state.sliceDoc(e.from,e.to),h,f=t&&bf(n,t.main.head);if(f){let p=e.insert.length-(e.to-e.from);h={from:f.from,to:f.to-p}}else h=n.state.doc.lineAt(s.head);let d=s.to-e.to;i=r.changeByRange(p=>{if(p.from==s.from&&p.to==s.to)return{changes:a,range:u||p.map(a)};let m=p.to-d,b=m-c.length;if(n.state.sliceDoc(b,m)!=c||m>=h.from&&b<=h.to)return{range:p};let g=r.changes({from:b,to:m,insert:e.insert}),S=p.to-s.to;return{changes:g,range:u?O.range(Math.max(0,u.anchor+S),Math.max(0,u.head+S)):p.map(g)}})}else i={changes:a,selection:u&&r.selection.replaceRange(u)}}let l="input.type";return(n.composing||n.inputState.compositionPendingChange&&n.inputState.compositionEndedAt>Date.now()-50)&&(n.inputState.compositionPendingChange=!1,l+=".compose",n.inputState.compositionFirstChange&&(l+=".start",n.inputState.compositionFirstChange=!1)),r.update(i,{userEvent:l,scrollIntoView:!0})}function xf(n,e,t,i){let r=Math.min(n.length,e.length),s=0;for(;s<r&&n.charCodeAt(s)==e.charCodeAt(s);)s++;if(s==r&&n.length==e.length)return null;let o=n.length,l=e.length;for(;o>0&&l>0&&n.charCodeAt(o-1)==e.charCodeAt(l-1);)o--,l--;if(i=="end"){let a=Math.max(0,s-Math.min(o,l));t-=o+a-s}if(o<s&&n.length<e.length){let a=t<=s&&t>=o?s-t:0;s-=a,l=s+(l-o),o=s}else if(l<s){let a=t<=s&&t>=l?s-t:0;s-=a,o=s+(o-l),l=s}return{from:s,toA:o,toB:l}}function i1(n){let e=[];if(n.root.activeElement!=n.contentDOM)return e;let{anchorNode:t,anchorOffset:i,focusNode:r,focusOffset:s}=n.observer.selectionRange;return t&&(e.push(new Su(t,i)),(r!=t||s!=i)&&e.push(new Su(r,s))),e}function r1(n,e){if(n.length==0)return null;let t=n[0].pos,i=n.length==2?n[1].pos:t;return t>-1&&i>-1?O.single(t+e,i+e):null}function ps(n,e){return e.head==n.main.head&&e.anchor==n.main.anchor}class s1{setSelectionOrigin(e){this.lastSelectionOrigin=e,this.lastSelectionTime=Date.now()}constructor(e){this.view=e,this.lastKeyCode=0,this.lastKeyTime=0,this.lastTouchTime=0,this.lastTouchX=0,this.lastTouchY=0,this.lastFocusTime=0,this.lastScrollTop=0,this.lastScrollLeft=0,this.lastWheelEvent=0,this.pendingIOSKey=void 0,this.tabFocusMode=-1,this.lastSelectionOrigin=null,this.lastSelectionTime=0,this.lastContextMenu=0,this.scrollHandlers=[],this.handlers=Object.create(null),this.composing=-1,this.compositionFirstChange=null,this.compositionEndedAt=0,this.compositionPendingKey=!1,this.compositionPendingChange=!1,this.insertingText="",this.insertingTextAt=0,this.mouseSelection=null,this.draggedContent=null,this.handleEvent=this.handleEvent.bind(this),this.notifiedFocused=e.hasFocus,V.safari&&e.contentDOM.addEventListener("input",()=>null),V.gecko&&k1(e.contentDOM.ownerDocument)}handleEvent(e){!d1(this.view,e)||this.ignoreDuringComposition(e)||e.type=="keydown"&&this.keydown(e)||(this.view.updateState!=0?Promise.resolve().then(()=>this.runHandlers(e.type,e)):this.runHandlers(e.type,e))}runHandlers(e,t){let i=this.handlers[e];if(i){for(let r of i.observers)r(this.view,t);for(let r of i.handlers){if(t.defaultPrevented)break;if(r(this.view,t)){t.preventDefault();break}}}}ensureHandlers(e){let t=o1(e),i=this.handlers,r=this.view.contentDOM;for(let s in t)if(s!="scroll"){let o=!t[s].handlers.length,l=i[s];l&&o!=!l.handlers.length&&(r.removeEventListener(s,this.handleEvent),l=null),l||r.addEventListener(s,this.handleEvent,{passive:o})}for(let s in i)s!="scroll"&&!t[s]&&r.removeEventListener(s,this.handleEvent);this.handlers=t}keydown(e){if(this.lastKeyCode=e.keyCode,this.lastKeyTime=Date.now(),e.keyCode==9&&this.tabFocusMode>-1&&(!this.tabFocusMode||Date.now()<=this.tabFocusMode))return!0;if(this.tabFocusMode>0&&e.keyCode!=27&&Sf.indexOf(e.keyCode)<0&&(this.tabFocusMode=-1),V.android&&V.chrome&&!e.synthetic&&(e.keyCode==13||e.keyCode==8))return this.view.observer.delayAndroidKey(e.key,e.keyCode),!0;let t;return V.ios&&!e.synthetic&&!e.altKey&&!e.metaKey&&!e.shiftKey&&((t=vf.find(i=>i.keyCode==e.keyCode))&&!e.ctrlKey||l1.indexOf(e.key)>-1&&e.ctrlKey)?(this.pendingIOSKey=t||e,setTimeout(()=>this.flushIOSKey(),250),!0):(e.keyCode!=229&&this.view.observer.forceFlush(),!1)}flushIOSKey(e){let t=this.pendingIOSKey;return!t||t.key=="Enter"&&e&&e.from<e.to&&/^\S+$/.test(e.insert.toString())?!1:(this.pendingIOSKey=void 0,ci(this.view.contentDOM,t.key,t.keyCode,t instanceof KeyboardEvent?t:void 0))}ignoreDuringComposition(e){return!/^key/.test(e.type)||e.synthetic?!1:this.composing>0?!0:V.safari&&!V.ios&&this.compositionPendingKey&&Date.now()-this.compositionEndedAt<100?(this.compositionPendingKey=!1,!0):!1}startMouseSelection(e){this.mouseSelection&&this.mouseSelection.destroy(),this.mouseSelection=e}update(e){this.view.observer.update(e),this.mouseSelection&&this.mouseSelection.update(e),this.draggedContent&&e.docChanged&&(this.draggedContent=this.draggedContent.map(e.changes)),e.transactions.length&&(this.lastKeyCode=this.lastSelectionTime=0)}destroy(){this.mouseSelection&&this.mouseSelection.destroy()}}function _u(n,e){return(t,i)=>{try{return e.call(n,i,t)}catch(r){Yt(t.state,r)}}}function o1(n){let e=Object.create(null);function t(i){return e[i]||(e[i]={observers:[],handlers:[]})}for(let i of n){let r=i.spec,s=r&&r.plugin.domEventHandlers,o=r&&r.plugin.domEventObservers;if(s)for(let l in s){let a=s[l];a&&t(l).handlers.push(_u(i.value,a))}if(o)for(let l in o){let a=o[l];a&&t(l).observers.push(_u(i.value,a))}}for(let i in zt)t(i).handlers.push(zt[i]);for(let i in ft)t(i).observers.push(ft[i]);return e}const vf=[{key:"Backspace",keyCode:8,inputType:"deleteContentBackward"},{key:"Enter",keyCode:13,inputType:"insertParagraph"},{key:"Enter",keyCode:13,inputType:"insertLineBreak"},{key:"Delete",keyCode:46,inputType:"deleteContentForward"}],l1="dthko",Sf=[16,17,18,20,91,92,224,225],Tr=6;function Er(n){return Math.max(0,n)*.7+8}function a1(n,e){return Math.max(Math.abs(n.clientX-e.clientX),Math.abs(n.clientY-e.clientY))}class u1{constructor(e,t,i,r){this.view=e,this.startEvent=t,this.style=i,this.mustSelect=r,this.scrollSpeed={x:0,y:0},this.scrolling=-1,this.lastEvent=t,this.scrollParents=Vh(e.contentDOM),this.atoms=e.state.facet(yr).map(o=>o(e));let s=e.contentDOM.ownerDocument;s.addEventListener("mousemove",this.move=this.move.bind(this)),s.addEventListener("mouseup",this.up=this.up.bind(this)),this.extend=t.shiftKey,this.multiple=e.state.facet(pe.allowMultipleSelections)&&c1(e,t),this.dragging=f1(e,t)&&Af(t)==1?null:!1}start(e){this.dragging===!1&&this.select(e)}move(e){if(e.buttons==0)return this.destroy();if(this.dragging||this.dragging==null&&a1(this.startEvent,e)<10)return;this.select(this.lastEvent=e);let t=0,i=0,r=0,s=0,o=this.view.win.innerWidth,l=this.view.win.innerHeight;this.scrollParents.x&&({left:r,right:o}=this.scrollParents.x.getBoundingClientRect()),this.scrollParents.y&&({top:s,bottom:l}=this.scrollParents.y.getBoundingClientRect());let a=mf(this.view);e.clientX-a.left<=r+Tr?t=-Er(r-e.clientX):e.clientX+a.right>=o-Tr&&(t=Er(e.clientX-o)),e.clientY-a.top<=s+Tr?i=-Er(s-e.clientY):e.clientY+a.bottom>=l-Tr&&(i=Er(e.clientY-l)),this.setScrollSpeed(t,i)}up(e){this.dragging==null&&this.select(this.lastEvent),this.dragging||e.preventDefault(),this.destroy()}destroy(){this.setScrollSpeed(0,0);let e=this.view.contentDOM.ownerDocument;e.removeEventListener("mousemove",this.move),e.removeEventListener("mouseup",this.up),this.view.inputState.mouseSelection=this.view.inputState.draggedContent=null}setScrollSpeed(e,t){this.scrollSpeed={x:e,y:t},e||t?this.scrolling<0&&(this.scrolling=setInterval(()=>this.scroll(),50)):this.scrolling>-1&&(clearInterval(this.scrolling),this.scrolling=-1)}scroll(){let{x:e,y:t}=this.scrollSpeed;e&&this.scrollParents.x&&(this.scrollParents.x.scrollLeft+=e,e=0),t&&this.scrollParents.y&&(this.scrollParents.y.scrollTop+=t,t=0),(e||t)&&this.view.win.scrollBy(e,t),this.dragging===!1&&this.select(this.lastEvent)}select(e){let{view:t}=this,i=yf(this.atoms,this.style.get(e,this.extend,this.multiple));(this.mustSelect||!i.eq(t.state.selection,this.dragging===!1))&&this.view.dispatch({selection:i,userEvent:"select.pointer"}),this.mustSelect=!1}update(e){e.transactions.some(t=>t.isUserEvent("input.type"))?this.destroy():this.style.update(e)&&setTimeout(()=>this.select(this.lastEvent),20)}}function c1(n,e){let t=n.state.facet(ef);return t.length?t[0](e):V.mac?e.metaKey:e.ctrlKey}function h1(n,e){let t=n.state.facet(tf);return t.length?t[0](e):V.mac?!e.altKey:!e.ctrlKey}function f1(n,e){let{main:t}=n.state.selection;if(t.empty)return!1;let i=lr(n.root);if(!i||i.rangeCount==0)return!0;let r=i.getRangeAt(0).getClientRects();for(let s=0;s<r.length;s++){let o=r[s];if(o.left<=e.clientX&&o.right>=e.clientX&&o.top<=e.clientY&&o.bottom>=e.clientY)return!0}return!1}function d1(n,e){if(!e.bubbles)return!0;if(e.defaultPrevented)return!1;for(let t=e.target,i;t!=n.contentDOM;t=t.parentNode)if(!t||t.nodeType==11||(i=Ee.get(t))&&i.isWidget()&&!i.isHidden&&i.widget.ignoreEvent(e))return!1;return!0}const zt=Object.create(null),ft=Object.create(null),_f=V.ie&&V.ie_version<15||V.ios&&V.webkit_version<604;function p1(n){let e=n.dom.parentNode;if(!e)return;let t=e.appendChild(document.createElement("textarea"));t.style.cssText="position: fixed; left: -10000px; top: 10px",t.focus(),setTimeout(()=>{n.focus(),t.remove(),Cf(n,t.value)},50)}function Ds(n,e,t){for(let i of n.facet(e))t=i(t,n);return t}function Cf(n,e){e=Ds(n.state,aa,e);let{state:t}=n,i,r=1,s=t.toText(e),o=s.lines==t.selection.ranges.length;if(dl!=null&&t.selection.ranges.every(a=>a.empty)&&dl==s.toString()){let a=-1;i=t.changeByRange(u=>{let c=t.doc.lineAt(u.from);if(c.from==a)return{range:u};a=c.from;let h=t.toText((o?s.line(r++).text:e)+t.lineBreak);return{changes:{from:c.from,insert:h},range:O.cursor(u.from+h.length)}})}else o?i=t.changeByRange(a=>{let u=s.line(r++);return{changes:{from:a.from,to:a.to,insert:u.text},range:O.cursor(a.from+u.length)}}):i=t.replaceSelection(s);n.dispatch(i,{userEvent:"input.paste",scrollIntoView:!0})}ft.scroll=n=>{n.inputState.lastScrollTop=n.scrollDOM.scrollTop,n.inputState.lastScrollLeft=n.scrollDOM.scrollLeft};ft.wheel=ft.mousewheel=n=>{n.inputState.lastWheelEvent=Date.now()};zt.keydown=(n,e)=>(n.inputState.setSelectionOrigin("select"),e.keyCode==27&&n.inputState.tabFocusMode!=0&&(n.inputState.tabFocusMode=Date.now()+2e3),!1);ft.touchstart=(n,e)=>{let t=n.inputState,i=e.targetTouches[0];t.lastTouchTime=Date.now(),i&&(t.lastTouchX=i.clientX,t.lastTouchY=i.clientY),t.setSelectionOrigin("select.pointer")};ft.touchmove=n=>{n.inputState.setSelectionOrigin("select.pointer")};zt.mousedown=(n,e)=>{if(n.observer.flush(),n.inputState.lastTouchTime>Date.now()-2e3)return!1;let t=null;for(let i of n.state.facet(nf))if(t=i(n,e),t)break;if(!t&&e.button==0&&(t=g1(n,e)),t){let i=!n.hasFocus;n.inputState.startMouseSelection(new u1(n,e,t,i)),i&&n.observer.ignore(()=>{Uh(n.contentDOM);let s=n.root.activeElement;s&&!s.contains(n.contentDOM)&&s.blur()});let r=n.inputState.mouseSelection;if(r)return r.start(e),r.dragging===!1}else n.inputState.setSelectionOrigin("select.pointer");return!1};function Cu(n,e,t,i){if(i==1)return O.cursor(e,t);if(i==2)return jg(n.state,e,t);{let r=n.docView.lineAt(e,t),s=n.state.doc.lineAt(r?r.posAtEnd:e),o=r?r.posAtStart:s.from,l=r?r.posAtEnd:s.to;return l<n.state.doc.length&&l==s.to&&l++,O.range(o,l)}}const m1=V.ie&&V.ie_version<=11;let Au=null,Tu=0,Eu=0;function Af(n){if(!m1)return n.detail;let e=Au,t=Eu;return Au=n,Eu=Date.now(),Tu=!e||t>Date.now()-400&&Math.abs(e.clientX-n.clientX)<2&&Math.abs(e.clientY-n.clientY)<2?(Tu+1)%3:1}function g1(n,e){let t=n.posAndSideAtCoords({x:e.clientX,y:e.clientY},!1),i=Af(e),r=n.state.selection;return{update(s){s.docChanged&&(t.pos=s.changes.mapPos(t.pos),r=r.map(s.changes))},get(s,o,l){let a=n.posAndSideAtCoords({x:s.clientX,y:s.clientY},!1),u,c=Cu(n,a.pos,a.assoc,i);if(t.pos!=a.pos&&!o){let h=Cu(n,t.pos,t.assoc,i),f=Math.min(h.from,c.from),d=Math.max(h.to,c.to);c=f<c.from?O.range(f,d,c.assoc):O.range(d,f,c.assoc)}return o?r.replaceRange(r.main.extend(c.from,c.to,c.assoc)):l&&i==1&&r.ranges.length>1&&(u=b1(r,a.pos))?u:l?r.addRange(c):O.create([c])}}}function b1(n,e){for(let t=0;t<n.ranges.length;t++){let{from:i,to:r}=n.ranges[t];if(i<=e&&r>=e)return O.create(n.ranges.slice(0,t).concat(n.ranges.slice(t+1)),n.mainIndex==t?0:n.mainIndex-(n.mainIndex>t?1:0))}return null}zt.dragstart=(n,e)=>{let{selection:{main:t}}=n.state;if(e.target.draggable){let r=n.docView.tile.nearest(e.target);if(r&&r.isWidget()){let s=r.posAtStart,o=s+r.length;(s>=t.to||o<=t.from)&&(t=O.range(s,o))}}let{inputState:i}=n;return i.mouseSelection&&(i.mouseSelection.dragging=!0),i.draggedContent=t,e.dataTransfer&&(e.dataTransfer.setData("Text",Ds(n.state,ua,n.state.sliceDoc(t.from,t.to))),e.dataTransfer.effectAllowed="copyMove"),!1};zt.dragend=n=>(n.inputState.draggedContent=null,!1);function Mu(n,e,t,i){if(t=Ds(n.state,aa,t),!t)return;let r=n.posAtCoords({x:e.clientX,y:e.clientY},!1),{draggedContent:s}=n.inputState,o=i&&s&&h1(n,e)?{from:s.from,to:s.to}:null,l={from:r,insert:t},a=n.state.changes(o?[o,l]:l);n.focus(),n.dispatch({changes:a,selection:{anchor:a.mapPos(r,-1),head:a.mapPos(r,1)},userEvent:o?"move.drop":"input.drop"}),n.inputState.draggedContent=null}zt.drop=(n,e)=>{if(!e.dataTransfer)return!1;if(n.state.readOnly)return!0;let t=e.dataTransfer.files;if(t&&t.length){let i=Array(t.length),r=0,s=()=>{++r==t.length&&Mu(n,e,i.filter(o=>o!=null).join(n.state.lineBreak),!1)};for(let o=0;o<t.length;o++){let l=new FileReader;l.onerror=s,l.onload=()=>{/[\x00-\x08\x0e-\x1f]{2}/.test(l.result)||(i[o]=l.result),s()},l.readAsText(t[o])}return!0}else{let i=e.dataTransfer.getData("Text");if(i)return Mu(n,e,i,!0),!0}return!1};zt.paste=(n,e)=>{if(n.state.readOnly)return!0;n.observer.flush();let t=_f?null:e.clipboardData;return t?(Cf(n,t.getData("text/plain")||t.getData("text/uri-list")),!0):(p1(n),!1)};function y1(n,e){let t=n.dom.parentNode;if(!t)return;let i=t.appendChild(document.createElement("textarea"));i.style.cssText="position: fixed; left: -10000px; top: 10px",i.value=e,i.focus(),i.selectionEnd=e.length,i.selectionStart=0,setTimeout(()=>{i.remove(),n.focus()},50)}function w1(n){let e=[],t=[],i=!1;for(let r of n.selection.ranges)r.empty||(e.push(n.sliceDoc(r.from,r.to)),t.push(r));if(!e.length){let r=-1;for(let{from:s}of n.selection.ranges){let o=n.doc.lineAt(s);o.number>r&&(e.push(o.text),t.push({from:o.from,to:Math.min(n.doc.length,o.to+1)})),r=o.number}i=!0}return{text:Ds(n,ua,e.join(n.lineBreak)),ranges:t,linewise:i}}let dl=null;zt.copy=zt.cut=(n,e)=>{if(!Xi(n.contentDOM,n.observer.selectionRange))return!1;let{text:t,ranges:i,linewise:r}=w1(n.state);if(!t&&!r)return!1;dl=r?t:null,e.type=="cut"&&!n.state.readOnly&&n.dispatch({changes:i,scrollIntoView:!0,userEvent:"delete.cut"});let s=_f?null:e.clipboardData;return s?(s.clearData(),s.setData("text/plain",t),!0):(y1(n,t),!1)};const Tf=Mn.define();function Ef(n,e){let t=[];for(let i of n.facet(of)){let r=i(n,e);r&&t.push(r)}return t.length?n.update({effects:t,annotations:Tf.of(!0)}):null}function Mf(n){setTimeout(()=>{let e=n.hasFocus;if(e!=n.inputState.notifiedFocused){let t=Ef(n.state,e);t?n.dispatch(t):n.update([])}},10)}ft.focus=n=>{n.inputState.lastFocusTime=Date.now(),!n.scrollDOM.scrollTop&&(n.inputState.lastScrollTop||n.inputState.lastScrollLeft)&&(n.scrollDOM.scrollTop=n.inputState.lastScrollTop,n.scrollDOM.scrollLeft=n.inputState.lastScrollLeft),Mf(n)};ft.blur=n=>{n.observer.clearSelectionRange(),Mf(n)};ft.compositionstart=ft.compositionupdate=n=>{n.observer.editContext||(n.inputState.compositionFirstChange==null&&(n.inputState.compositionFirstChange=!0),n.inputState.composing<0&&(n.inputState.composing=0))};ft.compositionend=n=>{n.observer.editContext||(n.inputState.composing=-1,n.inputState.compositionEndedAt=Date.now(),n.inputState.compositionPendingKey=!0,n.inputState.compositionPendingChange=n.observer.pendingRecords().length>0,n.inputState.compositionFirstChange=null,V.chrome&&V.android?n.observer.flushSoon():n.inputState.compositionPendingChange?Promise.resolve().then(()=>n.observer.flush()):setTimeout(()=>{n.inputState.composing<0&&n.docView.hasComposition&&n.update([])},50))};ft.contextmenu=n=>{n.inputState.lastContextMenu=Date.now()};zt.beforeinput=(n,e)=>{var t,i;if((e.inputType=="insertText"||e.inputType=="insertCompositionText")&&(n.inputState.insertingText=e.data,n.inputState.insertingTextAt=Date.now()),e.inputType=="insertReplacementText"&&n.observer.editContext){let s=(t=e.dataTransfer)===null||t===void 0?void 0:t.getData("text/plain"),o=e.getTargetRanges();if(s&&o.length){let l=o[0],a=n.posAtDOM(l.startContainer,l.startOffset),u=n.posAtDOM(l.endContainer,l.endOffset);return fa(n,{from:a,to:u,insert:n.state.toText(s)},null),!0}}let r;if(V.chrome&&V.android&&(r=vf.find(s=>s.inputType==e.inputType))&&(n.observer.delayAndroidKey(r.key,r.keyCode),r.key=="Backspace"||r.key=="Delete")){let s=((i=window.visualViewport)===null||i===void 0?void 0:i.height)||0;setTimeout(()=>{var o;(((o=window.visualViewport)===null||o===void 0?void 0:o.height)||0)>s+10&&n.hasFocus&&(n.contentDOM.blur(),n.focus())},100)}return V.ios&&e.inputType=="deleteContentForward"&&n.observer.flushSoon(),V.safari&&e.inputType=="insertText"&&n.inputState.composing>=0&&setTimeout(()=>ft.compositionend(n,e),20),!1};const Pu=new Set;function k1(n){Pu.has(n)||(Pu.add(n),n.addEventListener("copy",()=>{}),n.addEventListener("cut",()=>{}))}const Iu=["pre-wrap","normal","pre-line","break-spaces"];let bi=!1;function Du(){bi=!1}class x1{constructor(e){this.lineWrapping=e,this.doc=de.empty,this.heightSamples={},this.lineHeight=14,this.charWidth=7,this.textHeight=14,this.lineLength=30}heightForGap(e,t){let i=this.doc.lineAt(t).number-this.doc.lineAt(e).number+1;return this.lineWrapping&&(i+=Math.max(0,Math.ceil((t-e-i*this.lineLength*.5)/this.lineLength))),this.lineHeight*i}heightForLine(e){return this.lineWrapping?(1+Math.max(0,Math.ceil((e-this.lineLength)/Math.max(1,this.lineLength-5))))*this.lineHeight:this.lineHeight}setDoc(e){return this.doc=e,this}mustRefreshForWrapping(e){return Iu.indexOf(e)>-1!=this.lineWrapping}mustRefreshForHeights(e){let t=!1;for(let i=0;i<e.length;i++){let r=e[i];r<0?i++:this.heightSamples[Math.floor(r*10)]||(t=!0,this.heightSamples[Math.floor(r*10)]=!0)}return t}refresh(e,t,i,r,s,o){let l=Iu.indexOf(e)>-1,a=Math.abs(t-this.lineHeight)>.3||this.lineWrapping!=l||Math.abs(i-this.charWidth)>.1;if(this.lineWrapping=l,this.lineHeight=t,this.charWidth=i,this.textHeight=r,this.lineLength=s,a){this.heightSamples={};for(let u=0;u<o.length;u++){let c=o[u];c<0?u++:this.heightSamples[Math.floor(c*10)]=!0}}return a}}class v1{constructor(e,t){this.from=e,this.heights=t,this.index=0}get more(){return this.index<this.heights.length}}class Bt{constructor(e,t,i,r,s){this.from=e,this.length=t,this.top=i,this.height=r,this._content=s}get type(){return typeof this._content=="number"?Ve.Text:Array.isArray(this._content)?this._content:this._content.type}get to(){return this.from+this.length}get bottom(){return this.top+this.height}get widget(){return this._content instanceof $n?this._content.widget:null}get widgetLineBreaks(){return typeof this._content=="number"?this._content:0}join(e){let t=(Array.isArray(this._content)?this._content:[this]).concat(Array.isArray(e._content)?e._content:[e]);return new Bt(this.from,this.length+e.length,this.top,this.height+e.height,t)}}var ve=(function(n){return n[n.ByPos=0]="ByPos",n[n.ByHeight=1]="ByHeight",n[n.ByPosNoHeight=2]="ByPosNoHeight",n})(ve||(ve={}));const Jr=.001;class nt{constructor(e,t,i=2){this.length=e,this.height=t,this.flags=i}get outdated(){return(this.flags&2)>0}set outdated(e){this.flags=(e?2:0)|this.flags&-3}setHeight(e){this.height!=e&&(Math.abs(this.height-e)>Jr&&(bi=!0),this.height=e)}replace(e,t,i){return nt.of(i)}decomposeLeft(e,t){t.push(this)}decomposeRight(e,t){t.push(this)}applyChanges(e,t,i,r){let s=this,o=i.doc;for(let l=r.length-1;l>=0;l--){let{fromA:a,toA:u,fromB:c,toB:h}=r[l],f=s.lineAt(a,ve.ByPosNoHeight,i.setDoc(t),0,0),d=f.to>=u?f:s.lineAt(u,ve.ByPosNoHeight,i,0,0);for(h+=d.to-u,u=d.to;l>0&&f.from<=r[l-1].toA;)a=r[l-1].fromA,c=r[l-1].fromB,l--,a<f.from&&(f=s.lineAt(a,ve.ByPosNoHeight,i,0,0));c+=f.from-a,a=f.from;let p=da.build(i.setDoc(o),e,c,h);s=ms(s,s.replace(a,u,p))}return s.updateHeight(i,0)}static empty(){return new yt(0,0,0)}static of(e){if(e.length==1)return e[0];let t=0,i=e.length,r=0,s=0;for(;;)if(t==i)if(r>s*2){let l=e[t-1];l.break?e.splice(--t,1,l.left,null,l.right):e.splice(--t,1,l.left,l.right),i+=1+l.break,r-=l.size}else if(s>r*2){let l=e[i];l.break?e.splice(i,1,l.left,null,l.right):e.splice(i,1,l.left,l.right),i+=2+l.break,s-=l.size}else break;else if(r<s){let l=e[t++];l&&(r+=l.size)}else{let l=e[--i];l&&(s+=l.size)}let o=0;return e[t-1]==null?(o=1,t--):e[t]==null&&(o=1,i++),new _1(nt.of(e.slice(0,t)),o,nt.of(e.slice(i)))}}function ms(n,e){return n==e?n:(n.constructor!=e.constructor&&(bi=!0),e)}nt.prototype.size=1;const S1=Oe.replace({});class Pf extends nt{constructor(e,t,i){super(e,t),this.deco=i,this.spaceAbove=0}mainBlock(e,t){return new Bt(t,this.length,e+this.spaceAbove,this.height-this.spaceAbove,this.deco||0)}blockAt(e,t,i,r){return this.spaceAbove&&e<i+this.spaceAbove?new Bt(r,0,i,this.spaceAbove,S1):this.mainBlock(i,r)}lineAt(e,t,i,r,s){let o=this.mainBlock(r,s);return this.spaceAbove?this.blockAt(0,i,r,s).join(o):o}forEachLine(e,t,i,r,s,o){e<=s+this.length&&t>=s&&o(this.lineAt(0,ve.ByPos,i,r,s))}setMeasuredHeight(e){let t=e.heights[e.index++];t<0?(this.spaceAbove=-t,t=e.heights[e.index++]):this.spaceAbove=0,this.setHeight(t)}updateHeight(e,t=0,i=!1,r){return r&&r.from<=t&&r.more&&this.setMeasuredHeight(r),this.outdated=!1,this}toString(){return`block(${this.length})`}}class yt extends Pf{constructor(e,t,i){super(e,t,null),this.collapsed=0,this.widgetHeight=0,this.breaks=0,this.spaceAbove=i}mainBlock(e,t){return new Bt(t,this.length,e+this.spaceAbove,this.height-this.spaceAbove,this.breaks)}replace(e,t,i){let r=i[0];return i.length==1&&(r instanceof yt||r instanceof $e&&r.flags&4)&&Math.abs(this.length-r.length)<10?(r instanceof $e?r=new yt(r.length,this.height,this.spaceAbove):r.height=this.height,this.outdated||(r.outdated=!1),r):nt.of(i)}updateHeight(e,t=0,i=!1,r){return r&&r.from<=t&&r.more?this.setMeasuredHeight(r):(i||this.outdated)&&(this.spaceAbove=0,this.setHeight(Math.max(this.widgetHeight,e.heightForLine(this.length-this.collapsed))+this.breaks*e.lineHeight)),this.outdated=!1,this}toString(){return`line(${this.length}${this.collapsed?-this.collapsed:""}${this.widgetHeight?":"+this.widgetHeight:""})`}}class $e extends nt{constructor(e){super(e,0)}heightMetrics(e,t){let i=e.doc.lineAt(t).number,r=e.doc.lineAt(t+this.length).number,s=r-i+1,o,l=0;if(e.lineWrapping){let a=Math.min(this.height,e.lineHeight*s);o=a/s,this.length>s+1&&(l=(this.height-a)/(this.length-s-1))}else o=this.height/s;return{firstLine:i,lastLine:r,perLine:o,perChar:l}}blockAt(e,t,i,r){let{firstLine:s,lastLine:o,perLine:l,perChar:a}=this.heightMetrics(t,r);if(t.lineWrapping){let u=r+(e<t.lineHeight?0:Math.round(Math.max(0,Math.min(1,(e-i)/this.height))*this.length)),c=t.doc.lineAt(u),h=l+c.length*a,f=Math.max(i,e-h/2);return new Bt(c.from,c.length,f,h,0)}else{let u=Math.max(0,Math.min(o-s,Math.floor((e-i)/l))),{from:c,length:h}=t.doc.line(s+u);return new Bt(c,h,i+l*u,l,0)}}lineAt(e,t,i,r,s){if(t==ve.ByHeight)return this.blockAt(e,i,r,s);if(t==ve.ByPosNoHeight){let{from:d,to:p}=i.doc.lineAt(e);return new Bt(d,p-d,0,0,0)}let{firstLine:o,perLine:l,perChar:a}=this.heightMetrics(i,s),u=i.doc.lineAt(e),c=l+u.length*a,h=u.number-o,f=r+l*h+a*(u.from-s-h);return new Bt(u.from,u.length,Math.max(r,Math.min(f,r+this.height-c)),c,0)}forEachLine(e,t,i,r,s,o){e=Math.max(e,s),t=Math.min(t,s+this.length);let{firstLine:l,perLine:a,perChar:u}=this.heightMetrics(i,s);for(let c=e,h=r;c<=t;){let f=i.doc.lineAt(c);if(c==e){let p=f.number-l;h+=a*p+u*(e-s-p)}let d=a+u*f.length;o(new Bt(f.from,f.length,h,d,0)),h+=d,c=f.to+1}}replace(e,t,i){let r=this.length-t;if(r>0){let s=i[i.length-1];s instanceof $e?i[i.length-1]=new $e(s.length+r):i.push(null,new $e(r-1))}if(e>0){let s=i[0];s instanceof $e?i[0]=new $e(e+s.length):i.unshift(new $e(e-1),null)}return nt.of(i)}decomposeLeft(e,t){t.push(new $e(e-1),null)}decomposeRight(e,t){t.push(null,new $e(this.length-e-1))}updateHeight(e,t=0,i=!1,r){let s=t+this.length;if(r&&r.from<=t+this.length&&r.more){let o=[],l=Math.max(t,r.from),a=-1;for(r.from>t&&o.push(new $e(r.from-t-1).updateHeight(e,t));l<=s&&r.more;){let c=e.doc.lineAt(l).length;o.length&&o.push(null);let h=r.heights[r.index++],f=0;h<0&&(f=-h,h=r.heights[r.index++]),a==-1?a=h:Math.abs(h-a)>=Jr&&(a=-2);let d=new yt(c,h,f);d.outdated=!1,o.push(d),l+=c+1}l<=s&&o.push(null,new $e(s-l).updateHeight(e,l));let u=nt.of(o);return(a<0||Math.abs(u.height-this.height)>=Jr||Math.abs(a-this.heightMetrics(e,t).perLine)>=Jr)&&(bi=!0),ms(this,u)}else(i||this.outdated)&&(this.setHeight(e.heightForGap(t,t+this.length)),this.outdated=!1);return this}toString(){return`gap(${this.length})`}}class _1 extends nt{constructor(e,t,i){super(e.length+t+i.length,e.height+i.height,t|(e.outdated||i.outdated?2:0)),this.left=e,this.right=i,this.size=e.size+i.size}get break(){return this.flags&1}blockAt(e,t,i,r){let s=i+this.left.height;return e<s?this.left.blockAt(e,t,i,r):this.right.blockAt(e,t,s,r+this.left.length+this.break)}lineAt(e,t,i,r,s){let o=r+this.left.height,l=s+this.left.length+this.break,a=t==ve.ByHeight?e<o:e<l,u=a?this.left.lineAt(e,t,i,r,s):this.right.lineAt(e,t,i,o,l);if(this.break||(a?u.to<l:u.from>l))return u;let c=t==ve.ByPosNoHeight?ve.ByPosNoHeight:ve.ByPos;return a?u.join(this.right.lineAt(l,c,i,o,l)):this.left.lineAt(l,c,i,r,s).join(u)}forEachLine(e,t,i,r,s,o){let l=r+this.left.height,a=s+this.left.length+this.break;if(this.break)e<a&&this.left.forEachLine(e,t,i,r,s,o),t>=a&&this.right.forEachLine(e,t,i,l,a,o);else{let u=this.lineAt(a,ve.ByPos,i,r,s);e<u.from&&this.left.forEachLine(e,u.from-1,i,r,s,o),u.to>=e&&u.from<=t&&o(u),t>u.to&&this.right.forEachLine(u.to+1,t,i,l,a,o)}}replace(e,t,i){let r=this.left.length+this.break;if(t<r)return this.balanced(this.left.replace(e,t,i),this.right);if(e>this.left.length)return this.balanced(this.left,this.right.replace(e-r,t-r,i));let s=[];e>0&&this.decomposeLeft(e,s);let o=s.length;for(let l of i)s.push(l);if(e>0&&Bu(s,o-1),t<this.length){let l=s.length;this.decomposeRight(t,s),Bu(s,l)}return nt.of(s)}decomposeLeft(e,t){let i=this.left.length;if(e<=i)return this.left.decomposeLeft(e,t);t.push(this.left),this.break&&(i++,e>=i&&t.push(null)),e>i&&this.right.decomposeLeft(e-i,t)}decomposeRight(e,t){let i=this.left.length,r=i+this.break;if(e>=r)return this.right.decomposeRight(e-r,t);e<i&&this.left.decomposeRight(e,t),this.break&&e<r&&t.push(null),t.push(this.right)}balanced(e,t){return e.size>2*t.size||t.size>2*e.size?nt.of(this.break?[e,null,t]:[e,t]):(this.left=ms(this.left,e),this.right=ms(this.right,t),this.setHeight(e.height+t.height),this.outdated=e.outdated||t.outdated,this.size=e.size+t.size,this.length=e.length+this.break+t.length,this)}updateHeight(e,t=0,i=!1,r){let{left:s,right:o}=this,l=t+s.length+this.break,a=null;return r&&r.from<=t+s.length&&r.more?a=s=s.updateHeight(e,t,i,r):s.updateHeight(e,t,i),r&&r.from<=l+o.length&&r.more?a=o=o.updateHeight(e,l,i,r):o.updateHeight(e,l,i),a?this.balanced(s,o):(this.height=this.left.height+this.right.height,this.outdated=!1,this)}toString(){return this.left+(this.break?" ":"-")+this.right}}function Bu(n,e){let t,i;n[e]==null&&(t=n[e-1])instanceof $e&&(i=n[e+1])instanceof $e&&n.splice(e-1,3,new $e(t.length+1+i.length))}const C1=5;class da{constructor(e,t){this.pos=e,this.oracle=t,this.nodes=[],this.lineStart=-1,this.lineEnd=-1,this.covering=null,this.writtenTo=e}get isCovered(){return this.covering&&this.nodes[this.nodes.length-1]==this.covering}span(e,t){if(this.lineStart>-1){let i=Math.min(t,this.lineEnd),r=this.nodes[this.nodes.length-1];r instanceof yt?r.length+=i-this.pos:(i>this.pos||!this.isCovered)&&this.nodes.push(new yt(i-this.pos,-1,0)),this.writtenTo=i,t>i&&(this.nodes.push(null),this.writtenTo++,this.lineStart=-1)}this.pos=t}point(e,t,i){if(e<t||i.heightRelevant){let r=i.widget?i.widget.estimatedHeight:0,s=i.widget?i.widget.lineBreaks:0;r<0&&(r=this.oracle.lineHeight);let o=t-e;i.block?this.addBlock(new Pf(o,r,i)):(o||s||r>=C1)&&this.addLineDeco(r,s,o)}else t>e&&this.span(e,t);this.lineEnd>-1&&this.lineEnd<this.pos&&(this.lineEnd=this.oracle.doc.lineAt(this.pos).to)}enterLine(){if(this.lineStart>-1)return;let{from:e,to:t}=this.oracle.doc.lineAt(this.pos);this.lineStart=e,this.lineEnd=t,this.writtenTo<e&&((this.writtenTo<e-1||this.nodes[this.nodes.length-1]==null)&&this.nodes.push(this.blankContent(this.writtenTo,e-1)),this.nodes.push(null)),this.pos>e&&this.nodes.push(new yt(this.pos-e,-1,0)),this.writtenTo=this.pos}blankContent(e,t){let i=new $e(t-e);return this.oracle.doc.lineAt(e).to==t&&(i.flags|=4),i}ensureLine(){this.enterLine();let e=this.nodes.length?this.nodes[this.nodes.length-1]:null;if(e instanceof yt)return e;let t=new yt(0,-1,0);return this.nodes.push(t),t}addBlock(e){this.enterLine();let t=e.deco;t&&t.startSide>0&&!this.isCovered&&this.ensureLine(),this.nodes.push(e),this.writtenTo=this.pos=this.pos+e.length,t&&t.endSide>0&&(this.covering=e)}addLineDeco(e,t,i){let r=this.ensureLine();r.length+=i,r.collapsed+=i,r.widgetHeight=Math.max(r.widgetHeight,e),r.breaks+=t,this.writtenTo=this.pos=this.pos+i}finish(e){let t=this.nodes.length==0?null:this.nodes[this.nodes.length-1];this.lineStart>-1&&!(t instanceof yt)&&!this.isCovered?this.nodes.push(new yt(0,-1,0)):(this.writtenTo<this.pos||t==null)&&this.nodes.push(this.blankContent(this.writtenTo,this.pos));let i=e;for(let r of this.nodes)r instanceof yt&&r.updateHeight(this.oracle,i),i+=r?r.length:1;return this.nodes}static build(e,t,i,r){let s=new da(i,e);return fe.spans(t,i,r,s,0),s.finish(i)}}function A1(n,e,t){let i=new T1;return fe.compare(n,e,t,i,0),i.changes}class T1{constructor(){this.changes=[]}compareRange(){}comparePoint(e,t,i,r){(e<t||i&&i.heightRelevant||r&&r.heightRelevant)&&ui(e,t,this.changes,5)}}function E1(n,e){let t=n.getBoundingClientRect(),i=n.ownerDocument,r=i.defaultView||window,s=Math.max(0,t.left),o=Math.min(r.innerWidth,t.right),l=Math.max(0,t.top),a=Math.min(r.innerHeight,t.bottom);for(let u=n.parentNode;u&&u!=i.body;)if(u.nodeType==1){let c=u,h=window.getComputedStyle(c);if((c.scrollHeight>c.clientHeight||c.scrollWidth>c.clientWidth)&&h.overflow!="visible"){let f=c.getBoundingClientRect();s=Math.max(s,f.left),o=Math.min(o,f.right),l=Math.max(l,f.top),a=Math.min(u==n.parentNode?r.innerHeight:a,f.bottom)}u=h.position=="absolute"||h.position=="fixed"?c.offsetParent:c.parentNode}else if(u.nodeType==11)u=u.host;else break;return{left:s-t.left,right:Math.max(s,o)-t.left,top:l-(t.top+e),bottom:Math.max(l,a)-(t.top+e)}}function M1(n){let e=n.getBoundingClientRect(),t=n.ownerDocument.defaultView||window;return e.left<t.innerWidth&&e.right>0&&e.top<t.innerHeight&&e.bottom>0}function P1(n,e){let t=n.getBoundingClientRect();return{left:0,right:t.right-t.left,top:e,bottom:t.bottom-(t.top+e)}}class ro{constructor(e,t,i,r){this.from=e,this.to=t,this.size=i,this.displaySize=r}static same(e,t){if(e.length!=t.length)return!1;for(let i=0;i<e.length;i++){let r=e[i],s=t[i];if(r.from!=s.from||r.to!=s.to||r.size!=s.size)return!1}return!0}draw(e,t){return Oe.replace({widget:new I1(this.displaySize*(t?e.scaleY:e.scaleX),t)}).range(this.from,this.to)}}class I1 extends Es{constructor(e,t){super(),this.size=e,this.vertical=t}eq(e){return e.size==this.size&&e.vertical==this.vertical}toDOM(){let e=document.createElement("div");return this.vertical?e.style.height=this.size+"px":(e.style.width=this.size+"px",e.style.height="2px",e.style.display="inline-block"),e}get estimatedHeight(){return this.vertical?this.size:-1}}class Lu{constructor(e,t){this.view=e,this.state=t,this.pixelViewport={left:0,right:window.innerWidth,top:0,bottom:0},this.inView=!0,this.paddingTop=0,this.paddingBottom=0,this.contentDOMWidth=0,this.contentDOMHeight=0,this.editorHeight=0,this.editorWidth=0,this.scaleX=1,this.scaleY=1,this.scrollOffset=0,this.scrolledToBottom=!1,this.scrollAnchorPos=0,this.scrollAnchorHeight=-1,this.scaler=Ou,this.scrollTarget=null,this.printing=!1,this.mustMeasureContent=!0,this.defaultTextDirection=_e.LTR,this.visibleRanges=[],this.mustEnforceCursorAssoc=!1;let i=t.facet(ca).some(r=>typeof r!="function"&&r.class=="cm-lineWrapping");this.heightOracle=new x1(i),this.stateDeco=Ru(t),this.heightMap=nt.empty().applyChanges(this.stateDeco,de.empty,this.heightOracle.setDoc(t.doc),[new Tt(0,0,0,t.doc.length)]);for(let r=0;r<2&&(this.viewport=this.getViewport(0,null),!!this.updateForViewport());r++);this.updateViewportLines(),this.lineGaps=this.ensureLineGaps([]),this.lineGapDeco=Oe.set(this.lineGaps.map(r=>r.draw(this,!1))),this.scrollParent=e.scrollDOM,this.computeVisibleRanges()}updateForViewport(){let e=[this.viewport],{main:t}=this.state.selection;for(let i=0;i<=1;i++){let r=i?t.head:t.anchor;if(!e.some(({from:s,to:o})=>r>=s&&r<=o)){let{from:s,to:o}=this.lineBlockAt(r);e.push(new Mr(s,o))}}return this.viewports=e.sort((i,r)=>i.from-r.from),this.updateScaler()}updateScaler(){let e=this.scaler;return this.scaler=this.heightMap.height<=7e6?Ou:new pa(this.heightOracle,this.heightMap,this.viewports),e.eq(this.scaler)?0:2}updateViewportLines(){this.viewportLines=[],this.heightMap.forEachLine(this.viewport.from,this.viewport.to,this.heightOracle.setDoc(this.state.doc),0,0,e=>{this.viewportLines.push(Vi(e,this.scaler))})}update(e,t=null){this.state=e.state;let i=this.stateDeco;this.stateDeco=Ru(this.state);let r=e.changedRanges,s=Tt.extendWithRanges(r,A1(i,this.stateDeco,e?e.changes:Fe.empty(this.state.doc.length))),o=this.heightMap.height,l=this.scrolledToBottom?null:this.scrollAnchorAt(this.scrollOffset);Du(),this.heightMap=this.heightMap.applyChanges(this.stateDeco,e.startState.doc,this.heightOracle.setDoc(this.state.doc),s),(this.heightMap.height!=o||bi)&&(e.flags|=2),l?(this.scrollAnchorPos=e.changes.mapPos(l.from,-1),this.scrollAnchorHeight=l.top):(this.scrollAnchorPos=-1,this.scrollAnchorHeight=o);let a=s.length?this.mapViewport(this.viewport,e.changes):this.viewport;(t&&(t.range.head<a.from||t.range.head>a.to)||!this.viewportIsAppropriate(a))&&(a=this.getViewport(0,t));let u=a.from!=this.viewport.from||a.to!=this.viewport.to;this.viewport=a,e.flags|=this.updateForViewport(),(u||!e.changes.empty||e.flags&2)&&this.updateViewportLines(),(this.lineGaps.length||this.viewport.to-this.viewport.from>4e3)&&this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps,e.changes))),e.flags|=this.computeVisibleRanges(e.changes),t&&(this.scrollTarget=t),!this.mustEnforceCursorAssoc&&(e.selectionSet||e.focusChanged)&&e.view.lineWrapping&&e.state.selection.main.empty&&e.state.selection.main.assoc&&!e.state.facet(af)&&(this.mustEnforceCursorAssoc=!0)}measure(){let{view:e}=this,t=e.contentDOM,i=window.getComputedStyle(t),r=this.heightOracle,s=i.whiteSpace;this.defaultTextDirection=i.direction=="rtl"?_e.RTL:_e.LTR;let o=this.heightOracle.mustRefreshForWrapping(s)||this.mustMeasureContent==="refresh",l=t.getBoundingClientRect(),a=o||this.mustMeasureContent||this.contentDOMHeight!=l.height;this.contentDOMHeight=l.height,this.mustMeasureContent=!1;let u=0,c=0;if(l.width&&l.height){let{scaleX:A,scaleY:k}=Wh(t,l);(A>.005&&Math.abs(this.scaleX-A)>.005||k>.005&&Math.abs(this.scaleY-k)>.005)&&(this.scaleX=A,this.scaleY=k,u|=16,o=a=!0)}let h=(parseInt(i.paddingTop)||0)*this.scaleY,f=(parseInt(i.paddingBottom)||0)*this.scaleY;(this.paddingTop!=h||this.paddingBottom!=f)&&(this.paddingTop=h,this.paddingBottom=f,u|=18),this.editorWidth!=e.scrollDOM.clientWidth&&(r.lineWrapping&&(a=!0),this.editorWidth=e.scrollDOM.clientWidth,u|=16);let d=Vh(this.view.contentDOM,!1).y;d!=this.scrollParent&&(this.scrollParent=d,this.scrollAnchorHeight=-1,this.scrollOffset=0);let p=this.getScrollOffset();this.scrollOffset!=p&&(this.scrollAnchorHeight=-1,this.scrollOffset=p),this.scrolledToBottom=jh(this.scrollParent||e.win);let m=(this.printing?P1:E1)(t,this.paddingTop),b=m.top-this.pixelViewport.top,g=m.bottom-this.pixelViewport.bottom;this.pixelViewport=m;let S=this.pixelViewport.bottom>this.pixelViewport.top&&this.pixelViewport.right>this.pixelViewport.left;if(S!=this.inView&&(this.inView=S,S&&(a=!0)),!this.inView&&!this.scrollTarget&&!M1(e.dom))return 0;let v=l.width;if((this.contentDOMWidth!=v||this.editorHeight!=e.scrollDOM.clientHeight)&&(this.contentDOMWidth=l.width,this.editorHeight=e.scrollDOM.clientHeight,u|=16),a){let A=e.docView.measureVisibleLineHeights(this.viewport);if(r.mustRefreshForHeights(A)&&(o=!0),o||r.lineWrapping&&Math.abs(v-this.contentDOMWidth)>r.charWidth){let{lineHeight:k,charWidth:T,textHeight:B}=e.docView.measureTextSize();o=k>0&&r.refresh(s,k,T,B,Math.max(5,v/T),A),o&&(e.docView.minWidth=0,u|=16)}b>0&&g>0?c=Math.max(b,g):b<0&&g<0&&(c=Math.min(b,g)),Du();for(let k of this.viewports){let T=k.from==this.viewport.from?A:e.docView.measureVisibleLineHeights(k);this.heightMap=(o?nt.empty().applyChanges(this.stateDeco,de.empty,this.heightOracle,[new Tt(0,0,0,e.state.doc.length)]):this.heightMap).updateHeight(r,0,o,new v1(k.from,T))}bi&&(u|=2)}let D=!this.viewportIsAppropriate(this.viewport,c)||this.scrollTarget&&(this.scrollTarget.range.head<this.viewport.from||this.scrollTarget.range.head>this.viewport.to);return D&&(u&2&&(u|=this.updateScaler()),this.viewport=this.getViewport(c,this.scrollTarget),u|=this.updateForViewport()),(u&2||D)&&this.updateViewportLines(),(this.lineGaps.length||this.viewport.to-this.viewport.from>4e3)&&this.updateLineGaps(this.ensureLineGaps(o?[]:this.lineGaps,e)),u|=this.computeVisibleRanges(),this.mustEnforceCursorAssoc&&(this.mustEnforceCursorAssoc=!1,e.docView.enforceCursorAssoc()),u}get visibleTop(){return this.scaler.fromDOM(this.pixelViewport.top)}get visibleBottom(){return this.scaler.fromDOM(this.pixelViewport.bottom)}getViewport(e,t){let i=.5-Math.max(-.5,Math.min(.5,e/1e3/2)),r=this.heightMap,s=this.heightOracle,{visibleTop:o,visibleBottom:l}=this,a=new Mr(r.lineAt(o-i*1e3,ve.ByHeight,s,0,0).from,r.lineAt(l+(1-i)*1e3,ve.ByHeight,s,0,0).to);if(t){let{head:u}=t.range;if(u<a.from||u>a.to){let c=Math.min(this.editorHeight,this.pixelViewport.bottom-this.pixelViewport.top),h=r.lineAt(u,ve.ByPos,s,0,0),f;t.y=="center"?f=(h.top+h.bottom)/2-c/2:t.y=="start"||t.y=="nearest"&&u<a.from?f=h.top:f=h.bottom-c,a=new Mr(r.lineAt(f-1e3/2,ve.ByHeight,s,0,0).from,r.lineAt(f+c+1e3/2,ve.ByHeight,s,0,0).to)}}return a}mapViewport(e,t){let i=t.mapPos(e.from,-1),r=t.mapPos(e.to,1);return new Mr(this.heightMap.lineAt(i,ve.ByPos,this.heightOracle,0,0).from,this.heightMap.lineAt(r,ve.ByPos,this.heightOracle,0,0).to)}viewportIsAppropriate({from:e,to:t},i=0){if(!this.inView)return!0;let{top:r}=this.heightMap.lineAt(e,ve.ByPos,this.heightOracle,0,0),{bottom:s}=this.heightMap.lineAt(t,ve.ByPos,this.heightOracle,0,0),{visibleTop:o,visibleBottom:l}=this;return(e==0||r<=o-Math.max(10,Math.min(-i,250)))&&(t==this.state.doc.length||s>=l+Math.max(10,Math.min(i,250)))&&r>o-2*1e3&&s<l+2*1e3}mapLineGaps(e,t){if(!e.length||t.empty)return e;let i=[];for(let r of e)t.touchesRange(r.from,r.to)||i.push(new ro(t.mapPos(r.from),t.mapPos(r.to),r.size,r.displaySize));return i}ensureLineGaps(e,t){let i=this.heightOracle.lineWrapping,r=i?1e4:2e3,s=r>>1,o=r<<1;if(this.defaultTextDirection!=_e.LTR&&!i)return[];let l=[],a=(c,h,f,d)=>{if(h-c<s)return;let p=this.state.selection.main,m=[p.from];p.empty||m.push(p.to);for(let g of m)if(g>c&&g<h){a(c,g-10,f,d),a(g+10,h,f,d);return}let b=B1(e,g=>g.from>=f.from&&g.to<=f.to&&Math.abs(g.from-c)<s&&Math.abs(g.to-h)<s&&!m.some(S=>g.from<S&&g.to>S));if(!b){if(h<f.to&&t&&i&&t.visibleRanges.some(v=>v.from<=h&&v.to>=h)){let v=t.moveToLineBoundary(O.cursor(h),!1,!0).head;v>c&&(h=v)}let g=this.gapSize(f,c,h,d),S=i||g<2e6?g:2e6;b=new ro(c,h,g,S)}l.push(b)},u=c=>{if(c.length<o||c.type!=Ve.Text)return;let h=D1(c.from,c.to,this.stateDeco);if(h.total<o)return;let f=this.scrollTarget?this.scrollTarget.range.head:null,d,p;if(i){let m=r/this.heightOracle.lineLength*this.heightOracle.lineHeight,b,g;if(f!=null){let S=Ir(h,f),v=((this.visibleBottom-this.visibleTop)/2+m)/c.height;b=S-v,g=S+v}else b=(this.visibleTop-c.top-m)/c.height,g=(this.visibleBottom-c.top+m)/c.height;d=Pr(h,b),p=Pr(h,g)}else{let m=h.total*this.heightOracle.charWidth,b=r*this.heightOracle.charWidth,g=0;if(m>2e6)for(let k of e)k.from>=c.from&&k.from<c.to&&k.size!=k.displaySize&&k.from*this.heightOracle.charWidth+g<this.pixelViewport.left&&(g=k.size-k.displaySize);let S=this.pixelViewport.left+g,v=this.pixelViewport.right+g,D,A;if(f!=null){let k=Ir(h,f),T=((v-S)/2+b)/m;D=k-T,A=k+T}else D=(S-b)/m,A=(v+b)/m;d=Pr(h,D),p=Pr(h,A)}d>c.from&&a(c.from,d,c,h),p<c.to&&a(p,c.to,c,h)};for(let c of this.viewportLines)Array.isArray(c.type)?c.type.forEach(u):u(c);return l}gapSize(e,t,i,r){let s=Ir(r,i)-Ir(r,t);return this.heightOracle.lineWrapping?e.height*s:r.total*this.heightOracle.charWidth*s}updateLineGaps(e){ro.same(e,this.lineGaps)||(this.lineGaps=e,this.lineGapDeco=Oe.set(e.map(t=>t.draw(this,this.heightOracle.lineWrapping))))}computeVisibleRanges(e){let t=this.stateDeco;this.lineGaps.length&&(t=t.concat(this.lineGapDeco));let i=[];fe.spans(t,this.viewport.from,this.viewport.to,{span(s,o){i.push({from:s,to:o})},point(){}},20);let r=0;if(i.length!=this.visibleRanges.length)r=12;else for(let s=0;s<i.length&&!(r&8);s++){let o=this.visibleRanges[s],l=i[s];(o.from!=l.from||o.to!=l.to)&&(r|=4,e&&e.mapPos(o.from,-1)==l.from&&e.mapPos(o.to,1)==l.to||(r|=8))}return this.visibleRanges=i,r}lineBlockAt(e){return e>=this.viewport.from&&e<=this.viewport.to&&this.viewportLines.find(t=>t.from<=e&&t.to>=e)||Vi(this.heightMap.lineAt(e,ve.ByPos,this.heightOracle,0,0),this.scaler)}lineBlockAtHeight(e){return e>=this.viewportLines[0].top&&e<=this.viewportLines[this.viewportLines.length-1].bottom&&this.viewportLines.find(t=>t.top<=e&&t.bottom>=e)||Vi(this.heightMap.lineAt(this.scaler.fromDOM(e),ve.ByHeight,this.heightOracle,0,0),this.scaler)}getScrollOffset(){return(this.scrollParent==this.view.scrollDOM?this.scrollParent.scrollTop:(this.scrollParent?this.scrollParent.getBoundingClientRect().top:0)-this.view.contentDOM.getBoundingClientRect().top)*this.scaleY}scrollAnchorAt(e){let t=this.lineBlockAtHeight(e+8);return t.from>=this.viewport.from||this.viewportLines[0].top-e>200?t:this.viewportLines[0]}elementAtHeight(e){return Vi(this.heightMap.blockAt(this.scaler.fromDOM(e),this.heightOracle,0,0),this.scaler)}get docHeight(){return this.scaler.toDOM(this.heightMap.height)}get contentHeight(){return this.docHeight+this.paddingTop+this.paddingBottom}}class Mr{constructor(e,t){this.from=e,this.to=t}}function D1(n,e,t){let i=[],r=n,s=0;return fe.spans(t,n,e,{span(){},point(o,l){o>r&&(i.push({from:r,to:o}),s+=o-r),r=l}},20),r<e&&(i.push({from:r,to:e}),s+=e-r),{total:s,ranges:i}}function Pr({total:n,ranges:e},t){if(t<=0)return e[0].from;if(t>=1)return e[e.length-1].to;let i=Math.floor(n*t);for(let r=0;;r++){let{from:s,to:o}=e[r],l=o-s;if(i<=l)return s+i;i-=l}}function Ir(n,e){let t=0;for(let{from:i,to:r}of n.ranges){if(e<=r){t+=e-i;break}t+=r-i}return t/n.total}function B1(n,e){for(let t of n)if(e(t))return t}const Ou={toDOM(n){return n},fromDOM(n){return n},scale:1,eq(n){return n==this}};function Ru(n){let e=n.facet(Ms).filter(i=>typeof i!="function"),t=n.facet(ha).filter(i=>typeof i!="function");return t.length&&e.push(fe.join(t)),e}class pa{constructor(e,t,i){let r=0,s=0,o=0;this.viewports=i.map(({from:l,to:a})=>{let u=t.lineAt(l,ve.ByPos,e,0,0).top,c=t.lineAt(a,ve.ByPos,e,0,0).bottom;return r+=c-u,{from:l,to:a,top:u,bottom:c,domTop:0,domBottom:0}}),this.scale=(7e6-r)/(t.height-r);for(let l of this.viewports)l.domTop=o+(l.top-s)*this.scale,o=l.domBottom=l.domTop+(l.bottom-l.top),s=l.bottom}toDOM(e){for(let t=0,i=0,r=0;;t++){let s=t<this.viewports.length?this.viewports[t]:null;if(!s||e<s.top)return r+(e-i)*this.scale;if(e<=s.bottom)return s.domTop+(e-s.top);i=s.bottom,r=s.domBottom}}fromDOM(e){for(let t=0,i=0,r=0;;t++){let s=t<this.viewports.length?this.viewports[t]:null;if(!s||e<s.domTop)return i+(e-r)/this.scale;if(e<=s.domBottom)return s.top+(e-s.domTop);i=s.bottom,r=s.domBottom}}eq(e){return e instanceof pa?this.scale==e.scale&&this.viewports.length==e.viewports.length&&this.viewports.every((t,i)=>t.from==e.viewports[i].from&&t.to==e.viewports[i].to):!1}}function Vi(n,e){if(e.scale==1)return n;let t=e.toDOM(n.top),i=e.toDOM(n.bottom);return new Bt(n.from,n.length,t,i-t,Array.isArray(n._content)?n._content.map(r=>Vi(r,e)):n._content)}const Dr=K.define({combine:n=>n.join(" ")}),pl=K.define({combine:n=>n.indexOf(!0)>-1}),ml=vn.newName(),If=vn.newName(),Df=vn.newName(),Bf={"&light":"."+If,"&dark":"."+Df};function gl(n,e,t){return new vn(e,{finish(i){return/&/.test(i)?i.replace(/&\w*/,r=>{if(r=="&")return n;if(!t||!t[r])throw new RangeError(`Unsupported selector: ${r}`);return t[r]}):n+" "+i}})}const L1=gl("."+ml,{"&":{position:"relative !important",boxSizing:"border-box","&.cm-focused":{outline:"1px dotted #212121"},display:"flex !important",flexDirection:"column"},".cm-scroller":{display:"flex !important",alignItems:"flex-start !important",fontFamily:"monospace",lineHeight:1.4,height:"100%",overflowX:"auto",position:"relative",zIndex:0,overflowAnchor:"none"},".cm-content":{margin:0,flexGrow:2,flexShrink:0,display:"block",whiteSpace:"pre",wordWrap:"normal",boxSizing:"border-box",minHeight:"100%",padding:"4px 0",outline:"none","&[contenteditable=true]":{WebkitUserModify:"read-write-plaintext-only"}},".cm-lineWrapping":{whiteSpace_fallback:"pre-wrap",whiteSpace:"break-spaces",wordBreak:"break-word",overflowWrap:"anywhere",flexShrink:1},"&light .cm-content":{caretColor:"black"},"&dark .cm-content":{caretColor:"white"},".cm-line":{display:"block",padding:"0 2px 0 6px"},".cm-layer":{position:"absolute",left:0,top:0,contain:"size style","& > *":{position:"absolute"}},"&light .cm-selectionBackground":{background:"#d9d9d9"},"&dark .cm-selectionBackground":{background:"#222"},"&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#d7d4f0"},"&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#233"},".cm-cursorLayer":{pointerEvents:"none"},"&.cm-focused > .cm-scroller > .cm-cursorLayer":{animation:"steps(1) cm-blink 1.2s infinite"},"@keyframes cm-blink":{"0%":{},"50%":{opacity:0},"100%":{}},"@keyframes cm-blink2":{"0%":{},"50%":{opacity:0},"100%":{}},".cm-cursor, .cm-dropCursor":{borderLeft:"1.2px solid black",marginLeft:"-0.6px",pointerEvents:"none"},".cm-cursor":{display:"none"},"&dark .cm-cursor":{borderLeftColor:"#ddd"},".cm-selectionHandle":{backgroundColor:"currentColor",width:"1.5px"},".cm-selectionHandle-start::before, .cm-selectionHandle-end::before":{content:'""',backgroundColor:"inherit",borderRadius:"50%",width:"8px",height:"8px",position:"absolute",left:"-3.25px"},".cm-selectionHandle-start::before":{top:"-8px"},".cm-selectionHandle-end::before":{bottom:"-8px"},".cm-dropCursor":{position:"absolute"},"&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor":{display:"block"},".cm-iso":{unicodeBidi:"isolate"},".cm-announced":{position:"fixed",top:"-10000px"},"@media print":{".cm-announced":{display:"none"}},"&light .cm-activeLine":{backgroundColor:"#cceeff44"},"&dark .cm-activeLine":{backgroundColor:"#99eeff33"},"&light .cm-specialChar":{color:"red"},"&dark .cm-specialChar":{color:"#f78"},".cm-gutters":{flexShrink:0,display:"flex",height:"100%",boxSizing:"border-box",zIndex:200},".cm-gutters-before":{insetInlineStart:0},".cm-gutters-after":{insetInlineEnd:0},"&light .cm-gutters":{backgroundColor:"#f5f5f5",color:"#6c6c6c",border:"0px solid #ddd","&.cm-gutters-before":{borderRightWidth:"1px"},"&.cm-gutters-after":{borderLeftWidth:"1px"}},"&dark .cm-gutters":{backgroundColor:"#333338",color:"#ccc"},".cm-gutter":{display:"flex !important",flexDirection:"column",flexShrink:0,boxSizing:"border-box",minHeight:"100%",overflow:"hidden"},".cm-gutterElement":{boxSizing:"border-box"},".cm-lineNumbers .cm-gutterElement":{padding:"0 3px 0 5px",minWidth:"20px",textAlign:"right",whiteSpace:"nowrap"},"&light .cm-activeLineGutter":{backgroundColor:"#e2f2ff"},"&dark .cm-activeLineGutter":{backgroundColor:"#222227"},".cm-panels":{boxSizing:"border-box",position:"sticky",left:0,right:0,zIndex:300},"&light .cm-panels":{backgroundColor:"#f5f5f5",color:"black"},"&light .cm-panels-top":{borderBottom:"1px solid #ddd"},"&light .cm-panels-bottom":{borderTop:"1px solid #ddd"},"&dark .cm-panels":{backgroundColor:"#333338",color:"white"},".cm-dialog":{padding:"2px 19px 4px 6px",position:"relative","& label":{fontSize:"80%"}},".cm-dialog-close":{position:"absolute",top:"3px",right:"4px",backgroundColor:"inherit",border:"none",font:"inherit",fontSize:"14px",padding:"0"},".cm-tab":{display:"inline-block",overflow:"hidden",verticalAlign:"bottom"},".cm-widgetBuffer":{verticalAlign:"text-top",height:"1em",width:0,display:"inline"},".cm-placeholder":{color:"#888",display:"inline-block",verticalAlign:"top",userSelect:"none"},".cm-highlightSpace":{backgroundImage:"radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",backgroundPosition:"center"},".cm-highlightTab":{backgroundImage:`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,backgroundSize:"auto 100%",backgroundPosition:"right 90%",backgroundRepeat:"no-repeat"},".cm-trailingSpace":{backgroundColor:"#ff332255"},".cm-button":{verticalAlign:"middle",color:"inherit",fontSize:"70%",padding:".2em 1em",borderRadius:"1px"},"&light .cm-button":{backgroundImage:"linear-gradient(#eff1f5, #d9d9df)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#b4b4b4, #d0d3d6)"}},"&dark .cm-button":{backgroundImage:"linear-gradient(#393939, #111)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#111, #333)"}},".cm-textfield":{verticalAlign:"middle",color:"inherit",fontSize:"70%",border:"1px solid silver",padding:".2em .5em"},"&light .cm-textfield":{backgroundColor:"white"},"&dark .cm-textfield":{border:"1px solid #555",backgroundColor:"inherit"}},Bf),O1={childList:!0,characterData:!0,subtree:!0,attributes:!0,characterDataOldValue:!0},so=V.ie&&V.ie_version<=11;class R1{constructor(e){this.view=e,this.active=!1,this.editContext=null,this.selectionRange=new fg,this.selectionChanged=!1,this.delayedFlush=-1,this.resizeTimeout=-1,this.queue=[],this.delayedAndroidKey=null,this.flushingAndroidKey=-1,this.lastChange=0,this.scrollTargets=[],this.intersection=null,this.resizeScroll=null,this.intersecting=!1,this.gapIntersection=null,this.gaps=[],this.printQuery=null,this.parentCheck=-1,this.dom=e.contentDOM,this.observer=new MutationObserver(t=>{for(let i of t)this.queue.push(i);(V.ie&&V.ie_version<=11||V.ios&&e.composing)&&t.some(i=>i.type=="childList"&&i.removedNodes.length||i.type=="characterData"&&i.oldValue.length>i.target.nodeValue.length)?this.flushSoon():this.flush()}),window.EditContext&&V.android&&e.constructor.EDIT_CONTEXT!==!1&&!(V.chrome&&V.chrome_version<126)&&(this.editContext=new F1(e),e.state.facet(ln)&&(e.contentDOM.editContext=this.editContext.editContext)),so&&(this.onCharData=t=>{this.queue.push({target:t.target,type:"characterData",oldValue:t.prevValue}),this.flushSoon()}),this.onSelectionChange=this.onSelectionChange.bind(this),this.onResize=this.onResize.bind(this),this.onPrint=this.onPrint.bind(this),this.onScroll=this.onScroll.bind(this),window.matchMedia&&(this.printQuery=window.matchMedia("print")),typeof ResizeObserver=="function"&&(this.resizeScroll=new ResizeObserver(()=>{var t;((t=this.view.docView)===null||t===void 0?void 0:t.lastUpdate)<Date.now()-75&&this.onResize()}),this.resizeScroll.observe(e.scrollDOM)),this.addWindowListeners(this.win=e.win),this.start(),typeof IntersectionObserver=="function"&&(this.intersection=new IntersectionObserver(t=>{this.parentCheck<0&&(this.parentCheck=setTimeout(this.listenForScroll.bind(this),1e3)),t.length>0&&t[t.length-1].intersectionRatio>0!=this.intersecting&&(this.intersecting=!this.intersecting,this.intersecting!=this.view.inView&&this.onScrollChanged(document.createEvent("Event")))},{threshold:[0,.001]}),this.intersection.observe(this.dom),this.gapIntersection=new IntersectionObserver(t=>{t.length>0&&t[t.length-1].intersectionRatio>0&&this.onScrollChanged(document.createEvent("Event"))},{})),this.listenForScroll(),this.readSelectionRange()}onScrollChanged(e){this.view.inputState.runHandlers("scroll",e),this.intersecting&&this.view.measure()}onScroll(e){this.intersecting&&this.flush(!1),this.editContext&&this.view.requestMeasure(this.editContext.measureReq),this.onScrollChanged(e)}onResize(){this.resizeTimeout<0&&(this.resizeTimeout=setTimeout(()=>{this.resizeTimeout=-1,this.view.requestMeasure()},50))}onPrint(e){(e.type=="change"||!e.type)&&!e.matches||(this.view.viewState.printing=!0,this.view.measure(),setTimeout(()=>{this.view.viewState.printing=!1,this.view.requestMeasure()},500))}updateGaps(e){if(this.gapIntersection&&(e.length!=this.gaps.length||this.gaps.some((t,i)=>t!=e[i]))){this.gapIntersection.disconnect();for(let t of e)this.gapIntersection.observe(t);this.gaps=e}}onSelectionChange(e){let t=this.selectionChanged;if(!this.readSelectionRange()||this.delayedAndroidKey)return;let{view:i}=this,r=this.selectionRange;if(i.state.facet(ln)?i.root.activeElement!=this.dom:!Xi(this.dom,r))return;let s=r.anchorNode&&i.docView.tile.nearest(r.anchorNode);if(s&&s.isWidget()&&s.widget.ignoreEvent(e)){t||(this.selectionChanged=!1);return}(V.ie&&V.ie_version<=11||V.android&&V.chrome)&&!i.state.selection.main.empty&&r.focusNode&&Gi(r.focusNode,r.focusOffset,r.anchorNode,r.anchorOffset)?this.flushSoon():this.flush(!1)}readSelectionRange(){let{view:e}=this,t=lr(e.root);if(!t)return!1;let i=V.safari&&e.root.nodeType==11&&e.root.activeElement==this.dom&&z1(this.view,t)||t;if(!i||this.selectionRange.eq(i))return!1;let r=Xi(this.dom,i);return r&&!this.selectionChanged&&e.inputState.lastFocusTime>Date.now()-200&&e.inputState.lastTouchTime<Date.now()-300&&pg(this.dom,i)?(this.view.inputState.lastFocusTime=0,e.docView.updateSelection(),!1):(this.selectionRange.setRange(i),r&&(this.selectionChanged=!0),!0)}setSelectionRange(e,t){this.selectionRange.set(e.node,e.offset,t.node,t.offset),this.selectionChanged=!1}clearSelectionRange(){this.selectionRange.set(null,0,null,0)}listenForScroll(){this.parentCheck=-1;let e=0,t=null;for(let i=this.dom;i;)if(i.nodeType==1)!t&&e<this.scrollTargets.length&&this.scrollTargets[e]==i?e++:t||(t=this.scrollTargets.slice(0,e)),t&&t.push(i),i=i.assignedSlot||i.parentNode;else if(i.nodeType==11)i=i.host;else break;if(e<this.scrollTargets.length&&!t&&(t=this.scrollTargets.slice(0,e)),t){for(let i of this.scrollTargets)i.removeEventListener("scroll",this.onScroll);for(let i of this.scrollTargets=t)i.addEventListener("scroll",this.onScroll)}}ignore(e){if(!this.active)return e();try{return this.stop(),e()}finally{this.start(),this.clear()}}start(){this.active||(this.observer.observe(this.dom,O1),so&&this.dom.addEventListener("DOMCharacterDataModified",this.onCharData),this.active=!0)}stop(){this.active&&(this.active=!1,this.observer.disconnect(),so&&this.dom.removeEventListener("DOMCharacterDataModified",this.onCharData))}clear(){this.processRecords(),this.queue.length=0,this.selectionChanged=!1}delayAndroidKey(e,t){var i;if(!this.delayedAndroidKey){let r=()=>{let s=this.delayedAndroidKey;s&&(this.clearDelayedAndroidKey(),this.view.inputState.lastKeyCode=s.keyCode,this.view.inputState.lastKeyTime=Date.now(),!this.flush()&&s.force&&ci(this.dom,s.key,s.keyCode))};this.flushingAndroidKey=this.view.win.requestAnimationFrame(r)}(!this.delayedAndroidKey||e=="Enter")&&(this.delayedAndroidKey={key:e,keyCode:t,force:this.lastChange<Date.now()-50||!!(!((i=this.delayedAndroidKey)===null||i===void 0)&&i.force)})}clearDelayedAndroidKey(){this.win.cancelAnimationFrame(this.flushingAndroidKey),this.delayedAndroidKey=null,this.flushingAndroidKey=-1}flushSoon(){this.delayedFlush<0&&(this.delayedFlush=this.view.win.requestAnimationFrame(()=>{this.delayedFlush=-1,this.flush()}))}forceFlush(){this.delayedFlush>=0&&(this.view.win.cancelAnimationFrame(this.delayedFlush),this.delayedFlush=-1),this.flush()}pendingRecords(){for(let e of this.observer.takeRecords())this.queue.push(e);return this.queue}processRecords(){let e=this.pendingRecords();e.length&&(this.queue=[]);let t=-1,i=-1,r=!1;for(let s of e){let o=this.readMutation(s);o&&(o.typeOver&&(r=!0),t==-1?{from:t,to:i}=o:(t=Math.min(o.from,t),i=Math.max(o.to,i)))}return{from:t,to:i,typeOver:r}}readChange(){let{from:e,to:t,typeOver:i}=this.processRecords(),r=this.selectionChanged&&Xi(this.dom,this.selectionRange);if(e<0&&!r)return null;e>-1&&(this.lastChange=Date.now()),this.view.inputState.lastFocusTime=0,this.selectionChanged=!1;let s=new t1(this.view,e,t,i);return this.view.docView.domChanged={newSel:s.newSel?s.newSel.main:null},s}flush(e=!0){if(this.delayedFlush>=0||this.delayedAndroidKey)return!1;e&&this.readSelectionRange();let t=this.readChange();if(!t)return this.view.requestMeasure(),!1;let i=this.view.state,r=kf(this.view,t);return this.view.state==i&&(t.domChanged||t.newSel&&!ps(this.view.state.selection,t.newSel.main))&&this.view.update([]),r}readMutation(e){let t=this.view.docView.tile.nearest(e.target);if(!t||t.isWidget())return null;if(t.markDirty(e.type=="attributes"),e.type=="childList"){let i=zu(t,e.previousSibling||e.target.previousSibling,-1),r=zu(t,e.nextSibling||e.target.nextSibling,1);return{from:i?t.posAfter(i):t.posAtStart,to:r?t.posBefore(r):t.posAtEnd,typeOver:!1}}else return e.type=="characterData"?{from:t.posAtStart,to:t.posAtEnd,typeOver:e.target.nodeValue==e.oldValue}:null}setWindow(e){e!=this.win&&(this.removeWindowListeners(this.win),this.win=e,this.addWindowListeners(this.win))}addWindowListeners(e){e.addEventListener("resize",this.onResize),this.printQuery?this.printQuery.addEventListener?this.printQuery.addEventListener("change",this.onPrint):this.printQuery.addListener(this.onPrint):e.addEventListener("beforeprint",this.onPrint),e.addEventListener("scroll",this.onScroll),e.document.addEventListener("selectionchange",this.onSelectionChange)}removeWindowListeners(e){e.removeEventListener("scroll",this.onScroll),e.removeEventListener("resize",this.onResize),this.printQuery?this.printQuery.removeEventListener?this.printQuery.removeEventListener("change",this.onPrint):this.printQuery.removeListener(this.onPrint):e.removeEventListener("beforeprint",this.onPrint),e.document.removeEventListener("selectionchange",this.onSelectionChange)}update(e){this.editContext&&(this.editContext.update(e),e.startState.facet(ln)!=e.state.facet(ln)&&(e.view.contentDOM.editContext=e.state.facet(ln)?this.editContext.editContext:null))}destroy(){var e,t,i;this.stop(),(e=this.intersection)===null||e===void 0||e.disconnect(),(t=this.gapIntersection)===null||t===void 0||t.disconnect(),(i=this.resizeScroll)===null||i===void 0||i.disconnect();for(let r of this.scrollTargets)r.removeEventListener("scroll",this.onScroll);this.removeWindowListeners(this.win),clearTimeout(this.parentCheck),clearTimeout(this.resizeTimeout),this.win.cancelAnimationFrame(this.delayedFlush),this.win.cancelAnimationFrame(this.flushingAndroidKey),this.editContext&&(this.view.contentDOM.editContext=null,this.editContext.destroy())}}function zu(n,e,t){for(;e;){let i=Ee.get(e);if(i&&i.parent==n)return i;let r=e.parentNode;e=r!=n.dom?r:t>0?e.nextSibling:e.previousSibling}return null}function Fu(n,e){let t=e.startContainer,i=e.startOffset,r=e.endContainer,s=e.endOffset,o=n.docView.domAtPos(n.state.selection.main.anchor,1);return Gi(o.node,o.offset,r,s)&&([t,i,r,s]=[r,s,t,i]),{anchorNode:t,anchorOffset:i,focusNode:r,focusOffset:s}}function z1(n,e){if(e.getComposedRanges){let r=e.getComposedRanges(n.root)[0];if(r)return Fu(n,r)}let t=null;function i(r){r.preventDefault(),r.stopImmediatePropagation(),t=r.getTargetRanges()[0]}return n.contentDOM.addEventListener("beforeinput",i,!0),n.dom.ownerDocument.execCommand("indent"),n.contentDOM.removeEventListener("beforeinput",i,!0),t?Fu(n,t):null}class F1{constructor(e){this.from=0,this.to=0,this.pendingContextChange=null,this.handlers=Object.create(null),this.composing=null,this.resetRange(e.state);let t=this.editContext=new window.EditContext({text:e.state.doc.sliceString(this.from,this.to),selectionStart:this.toContextPos(Math.max(this.from,Math.min(this.to,e.state.selection.main.anchor))),selectionEnd:this.toContextPos(e.state.selection.main.head)});this.handlers.textupdate=i=>{let r=e.state.selection.main,{anchor:s,head:o}=r,l=this.toEditorPos(i.updateRangeStart),a=this.toEditorPos(i.updateRangeEnd);e.inputState.composing>=0&&!this.composing&&(this.composing={contextBase:i.updateRangeStart,editorBase:l,drifted:!1});let u=a-l>i.text.length;l==this.from&&s<this.from?l=s:a==this.to&&s>this.to&&(a=s);let c=xf(e.state.sliceDoc(l,a),i.text,(u?r.from:r.to)-l,u?"end":null);if(!c){let f=O.single(this.toEditorPos(i.selectionStart),this.toEditorPos(i.selectionEnd));ps(f,r)||e.dispatch({selection:f,userEvent:"select"});return}let h={from:c.from+l,to:c.toA+l,insert:de.of(i.text.slice(c.from,c.toB).split(`
`))};if((V.mac||V.android)&&h.from==o-1&&/^\. ?$/.test(i.text)&&e.contentDOM.getAttribute("autocorrect")=="off"&&(h={from:l,to:a,insert:de.of([i.text.replace("."," ")])}),this.pendingContextChange=h,!e.state.readOnly){let f=this.to-this.from+(h.to-h.from+h.insert.length);fa(e,h,O.single(this.toEditorPos(i.selectionStart,f),this.toEditorPos(i.selectionEnd,f)))}this.pendingContextChange&&(this.revertPending(e.state),this.setSelection(e.state)),h.from<h.to&&!h.insert.length&&e.inputState.composing>=0&&!/[\\p{Alphabetic}\\p{Number}_]/.test(t.text.slice(Math.max(0,i.updateRangeStart-1),Math.min(t.text.length,i.updateRangeStart+1)))&&this.handlers.compositionend(i)},this.handlers.characterboundsupdate=i=>{let r=[],s=null;for(let o=this.toEditorPos(i.rangeStart),l=this.toEditorPos(i.rangeEnd);o<l;o++){let a=e.coordsForChar(o);s=a&&new DOMRect(a.left,a.top,a.right-a.left,a.bottom-a.top)||s||new DOMRect,r.push(s)}t.updateCharacterBounds(i.rangeStart,r)},this.handlers.textformatupdate=i=>{let r=[];for(let s of i.getTextFormats()){let o=s.underlineStyle,l=s.underlineThickness;if(!/none/i.test(o)&&!/none/i.test(l)){let a=this.toEditorPos(s.rangeStart),u=this.toEditorPos(s.rangeEnd);if(a<u){let c=`text-decoration: underline ${/^[a-z]/.test(o)?o+" ":o=="Dashed"?"dashed ":o=="Squiggle"?"wavy ":""}${/thin/i.test(l)?1:2}px`;r.push(Oe.mark({attributes:{style:c}}).range(a,u))}}}e.dispatch({effects:cf.of(Oe.set(r))})},this.handlers.compositionstart=()=>{e.inputState.composing<0&&(e.inputState.composing=0,e.inputState.compositionFirstChange=!0)},this.handlers.compositionend=()=>{if(e.inputState.composing=-1,e.inputState.compositionFirstChange=null,this.composing){let{drifted:i}=this.composing;this.composing=null,i&&this.reset(e.state)}};for(let i in this.handlers)t.addEventListener(i,this.handlers[i]);this.measureReq={read:i=>{this.editContext.updateControlBounds(i.contentDOM.getBoundingClientRect());let r=lr(i.root);r&&r.rangeCount&&this.editContext.updateSelectionBounds(r.getRangeAt(0).getBoundingClientRect())}}}applyEdits(e){let t=0,i=!1,r=this.pendingContextChange;return e.changes.iterChanges((s,o,l,a,u)=>{if(i)return;let c=u.length-(o-s);if(r&&o>=r.to)if(r.from==s&&r.to==o&&r.insert.eq(u)){r=this.pendingContextChange=null,t+=c,this.to+=c;return}else r=null,this.revertPending(e.state);if(s+=t,o+=t,o<=this.from)this.from+=c,this.to+=c;else if(s<this.to){if(s<this.from||o>this.to||this.to-this.from+u.length>3e4){i=!0;return}this.editContext.updateText(this.toContextPos(s),this.toContextPos(o),u.toString()),this.to+=c}t+=c}),r&&!i&&this.revertPending(e.state),!i}update(e){let t=this.pendingContextChange,i=e.startState.selection.main;this.composing&&(this.composing.drifted||!e.changes.touchesRange(i.from,i.to)&&e.transactions.some(r=>!r.isUserEvent("input.type")&&r.changes.touchesRange(this.from,this.to)))?(this.composing.drifted=!0,this.composing.editorBase=e.changes.mapPos(this.composing.editorBase)):!this.applyEdits(e)||!this.rangeIsValid(e.state)?(this.pendingContextChange=null,this.reset(e.state)):(e.docChanged||e.selectionSet||t)&&this.setSelection(e.state),(e.geometryChanged||e.docChanged||e.selectionSet)&&e.view.requestMeasure(this.measureReq)}resetRange(e){let{head:t}=e.selection.main;this.from=Math.max(0,t-1e4),this.to=Math.min(e.doc.length,t+1e4)}reset(e){this.resetRange(e),this.editContext.updateText(0,this.editContext.text.length,e.doc.sliceString(this.from,this.to)),this.setSelection(e)}revertPending(e){let t=this.pendingContextChange;this.pendingContextChange=null,this.editContext.updateText(this.toContextPos(t.from),this.toContextPos(t.from+t.insert.length),e.doc.sliceString(t.from,t.to))}setSelection(e){let{main:t}=e.selection,i=this.toContextPos(Math.max(this.from,Math.min(this.to,t.anchor))),r=this.toContextPos(t.head);(this.editContext.selectionStart!=i||this.editContext.selectionEnd!=r)&&this.editContext.updateSelection(i,r)}rangeIsValid(e){let{head:t}=e.selection.main;return!(this.from>0&&t-this.from<500||this.to<e.doc.length&&this.to-t<500||this.to-this.from>1e4*3)}toEditorPos(e,t=this.to-this.from){e=Math.min(e,t);let i=this.composing;return i&&i.drifted?i.editorBase+(e-i.contextBase):e+this.from}toContextPos(e){let t=this.composing;return t&&t.drifted?t.contextBase+(e-t.editorBase):e-this.from}destroy(){for(let e in this.handlers)this.editContext.removeEventListener(e,this.handlers[e])}}class G{get state(){return this.viewState.state}get viewport(){return this.viewState.viewport}get visibleRanges(){return this.viewState.visibleRanges}get inView(){return this.viewState.inView}get composing(){return!!this.inputState&&this.inputState.composing>0}get compositionStarted(){return!!this.inputState&&this.inputState.composing>=0}get root(){return this._root}get win(){return this.dom.ownerDocument.defaultView||window}constructor(e={}){var t;this.plugins=[],this.pluginMap=new Map,this.editorAttrs={},this.contentAttrs={},this.bidiCache=[],this.destroyed=!1,this.updateState=2,this.measureScheduled=-1,this.measureRequests=[],this.contentDOM=document.createElement("div"),this.scrollDOM=document.createElement("div"),this.scrollDOM.tabIndex=-1,this.scrollDOM.className="cm-scroller",this.scrollDOM.appendChild(this.contentDOM),this.announceDOM=document.createElement("div"),this.announceDOM.className="cm-announced",this.announceDOM.setAttribute("aria-live","polite"),this.dom=document.createElement("div"),this.dom.appendChild(this.announceDOM),this.dom.appendChild(this.scrollDOM),e.parent&&e.parent.appendChild(this.dom);let{dispatch:i}=e;this.dispatchTransactions=e.dispatchTransactions||i&&(r=>r.forEach(s=>i(s,this)))||(r=>this.update(r)),this.dispatch=this.dispatch.bind(this),this._root=e.root||dg(e.parent)||document,this.viewState=new Lu(this,e.state||pe.create(e)),e.scrollTo&&e.scrollTo.is(Ar)&&(this.viewState.scrollTarget=e.scrollTo.value.clip(this.viewState.state)),this.plugins=this.state.facet(ri).map(r=>new Zs(r));for(let r of this.plugins)r.update(this);this.observer=new R1(this),this.inputState=new s1(this),this.inputState.ensureHandlers(this.plugins),this.docView=new xu(this),this.mountStyles(),this.updateAttrs(),this.updateState=0,this.requestMeasure(),!((t=document.fonts)===null||t===void 0)&&t.ready&&document.fonts.ready.then(()=>{this.viewState.mustMeasureContent="refresh",this.requestMeasure()})}dispatch(...e){let t=e.length==1&&e[0]instanceof Ne?e:e.length==1&&Array.isArray(e[0])?e[0]:[this.state.update(...e)];this.dispatchTransactions(t,this)}update(e){if(this.updateState!=0)throw new Error("Calls to EditorView.update are not allowed while an update is in progress");let t=!1,i=!1,r,s=this.state;for(let f of e){if(f.startState!=s)throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");s=f.state}if(this.destroyed){this.viewState.state=s;return}let o=this.hasFocus,l=0,a=null;e.some(f=>f.annotation(Tf))?(this.inputState.notifiedFocused=o,l=1):o!=this.inputState.notifiedFocused&&(this.inputState.notifiedFocused=o,a=Ef(s,o),a||(l=1));let u=this.observer.delayedAndroidKey,c=null;if(u?(this.observer.clearDelayedAndroidKey(),c=this.observer.readChange(),(c&&!this.state.doc.eq(s.doc)||!this.state.selection.eq(s.selection))&&(c=null)):this.observer.clear(),s.facet(pe.phrases)!=this.state.facet(pe.phrases))return this.setState(s);r=hs.create(this,s,e),r.flags|=l;let h=this.viewState.scrollTarget;try{this.updateState=2;for(let f of e){if(h&&(h=h.map(f.changes)),f.scrollIntoView){let{main:d}=f.state.selection;h=new hi(d.empty?d:O.cursor(d.head,d.head>d.anchor?-1:1))}for(let d of f.effects)d.is(Ar)&&(h=d.value.clip(this.state))}this.viewState.update(r,h),this.bidiCache=gs.update(this.bidiCache,r.changes),r.empty||(this.updatePlugins(r),this.inputState.update(r)),t=this.docView.update(r),this.state.facet(Wi)!=this.styleModules&&this.mountStyles(),i=this.updateAttrs(),this.showAnnouncements(e),this.docView.updateSelection(t,e.some(f=>f.isUserEvent("select.pointer")))}finally{this.updateState=0}if(r.startState.facet(Dr)!=r.state.facet(Dr)&&(this.viewState.mustMeasureContent=!0),(t||i||h||this.viewState.mustEnforceCursorAssoc||this.viewState.mustMeasureContent)&&this.requestMeasure(),t&&this.docViewUpdate(),!r.empty)for(let f of this.state.facet(ul))try{f(r)}catch(d){Yt(this.state,d,"update listener")}(a||c)&&Promise.resolve().then(()=>{a&&this.state==a.startState&&this.dispatch(a),c&&!kf(this,c)&&u.force&&ci(this.contentDOM,u.key,u.keyCode)})}setState(e){if(this.updateState!=0)throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");if(this.destroyed){this.viewState.state=e;return}this.updateState=2;let t=this.hasFocus;try{for(let i of this.plugins)i.destroy(this);this.viewState=new Lu(this,e),this.plugins=e.facet(ri).map(i=>new Zs(i)),this.pluginMap.clear();for(let i of this.plugins)i.update(this);this.docView.destroy(),this.docView=new xu(this),this.inputState.ensureHandlers(this.plugins),this.mountStyles(),this.updateAttrs(),this.bidiCache=[]}finally{this.updateState=0}t&&this.focus(),this.requestMeasure()}updatePlugins(e){let t=e.startState.facet(ri),i=e.state.facet(ri);if(t!=i){let r=[];for(let s of i){let o=t.indexOf(s);if(o<0)r.push(new Zs(s));else{let l=this.plugins[o];l.mustUpdate=e,r.push(l)}}for(let s of this.plugins)s.mustUpdate!=e&&s.destroy(this);this.plugins=r,this.pluginMap.clear()}else for(let r of this.plugins)r.mustUpdate=e;for(let r=0;r<this.plugins.length;r++)this.plugins[r].update(this);t!=i&&this.inputState.ensureHandlers(this.plugins)}docViewUpdate(){for(let e of this.plugins){let t=e.value;if(t&&t.docViewUpdate)try{t.docViewUpdate(this)}catch(i){Yt(this.state,i,"doc view update listener")}}}measure(e=!0){if(this.destroyed)return;if(this.measureScheduled>-1&&this.win.cancelAnimationFrame(this.measureScheduled),this.observer.delayedAndroidKey){this.measureScheduled=-1,this.requestMeasure();return}this.measureScheduled=0,e&&this.observer.forceFlush();let t=null,i=this.viewState.scrollParent,r=this.viewState.getScrollOffset(),{scrollAnchorPos:s,scrollAnchorHeight:o}=this.viewState;Math.abs(r-this.viewState.scrollOffset)>1&&(o=-1),this.viewState.scrollAnchorHeight=-1;try{for(let l=0;;l++){if(o<0)if(jh(i||this.win))s=-1,o=this.viewState.heightMap.height;else{let d=this.viewState.scrollAnchorAt(r);s=d.from,o=d.top}this.updateState=1;let a=this.viewState.measure();if(!a&&!this.measureRequests.length&&this.viewState.scrollTarget==null)break;if(l>5){console.warn(this.measureRequests.length?"Measure loop restarted more than 5 times":"Viewport failed to stabilize");break}let u=[];a&4||([this.measureRequests,u]=[u,this.measureRequests]);let c=u.map(d=>{try{return d.read(this)}catch(p){return Yt(this.state,p),Nu}}),h=hs.create(this,this.state,[]),f=!1;h.flags|=a,t?t.flags|=a:t=h,this.updateState=2,h.empty||(this.updatePlugins(h),this.inputState.update(h),this.updateAttrs(),f=this.docView.update(h),f&&this.docViewUpdate());for(let d=0;d<u.length;d++)if(c[d]!=Nu)try{let p=u[d];p.write&&p.write(c[d],this)}catch(p){Yt(this.state,p)}if(f&&this.docView.updateSelection(!0),!h.viewportChanged&&this.measureRequests.length==0){if(this.viewState.editorHeight)if(this.viewState.scrollTarget){this.docView.scrollIntoView(this.viewState.scrollTarget),this.viewState.scrollTarget=null,o=-1;continue}else{let p=((s<0?this.viewState.heightMap.height:this.viewState.lineBlockAt(s).top)-o)/this.scaleY;if((p>1||p<-1)&&(i==this.scrollDOM||this.hasFocus||Math.max(this.inputState.lastWheelEvent,this.inputState.lastTouchTime)>Date.now()-100)){r=r+p,i?i.scrollTop+=p:this.win.scrollBy(0,p),o=-1;continue}}break}}}finally{this.updateState=0,this.measureScheduled=-1}if(t&&!t.empty)for(let l of this.state.facet(ul))l(t)}get themeClasses(){return ml+" "+(this.state.facet(pl)?Df:If)+" "+this.state.facet(Dr)}updateAttrs(){let e=qu(this,hf,{class:"cm-editor"+(this.hasFocus?" cm-focused ":" ")+this.themeClasses}),t={spellcheck:"false",autocorrect:"off",autocapitalize:"off",writingsuggestions:"false",translate:"no",contenteditable:this.state.facet(ln)?"true":"false",class:"cm-content",style:`${V.tabSize}: ${this.state.tabSize}`,role:"textbox","aria-multiline":"true"};this.state.readOnly&&(t["aria-readonly"]="true"),qu(this,ca,t);let i=this.observer.ignore(()=>{let r=mu(this.contentDOM,this.contentAttrs,t),s=mu(this.dom,this.editorAttrs,e);return r||s});return this.editorAttrs=e,this.contentAttrs=t,i}showAnnouncements(e){let t=!0;for(let i of e)for(let r of i.effects)if(r.is(G.announce)){t&&(this.announceDOM.textContent=""),t=!1;let s=this.announceDOM.appendChild(document.createElement("div"));s.textContent=r.value}}mountStyles(){this.styleModules=this.state.facet(Wi);let e=this.state.facet(G.cspNonce);vn.mount(this.root,this.styleModules.concat(L1).reverse(),e?{nonce:e}:void 0)}readMeasured(){if(this.updateState==2)throw new Error("Reading the editor layout isn't allowed during an update");this.updateState==0&&this.measureScheduled>-1&&this.measure(!1)}requestMeasure(e){if(this.measureScheduled<0&&(this.measureScheduled=this.win.requestAnimationFrame(()=>this.measure())),e){if(this.measureRequests.indexOf(e)>-1)return;if(e.key!=null){for(let t=0;t<this.measureRequests.length;t++)if(this.measureRequests[t].key===e.key){this.measureRequests[t]=e;return}}this.measureRequests.push(e)}}plugin(e){let t=this.pluginMap.get(e);return(t===void 0||t&&t.plugin!=e)&&this.pluginMap.set(e,t=this.plugins.find(i=>i.plugin==e)||null),t&&t.update(this).value}get documentTop(){return this.contentDOM.getBoundingClientRect().top+this.viewState.paddingTop}get documentPadding(){return{top:this.viewState.paddingTop,bottom:this.viewState.paddingBottom}}get scaleX(){return this.viewState.scaleX}get scaleY(){return this.viewState.scaleY}elementAtHeight(e){return this.readMeasured(),this.viewState.elementAtHeight(e)}lineBlockAtHeight(e){return this.readMeasured(),this.viewState.lineBlockAtHeight(e)}get viewportLineBlocks(){return this.viewState.viewportLines}lineBlockAt(e){return this.viewState.lineBlockAt(e)}get contentHeight(){return this.viewState.contentHeight}moveByChar(e,t,i){return io(this,e,vu(this,e,t,i))}moveByGroup(e,t){return io(this,e,vu(this,e,t,i=>Gg(this,e.head,i)))}visualLineSide(e,t){let i=this.bidiSpans(e),r=this.textDirectionAt(e.from),s=i[t?i.length-1:0];return O.cursor(s.side(t,r)+e.from,s.forward(!t,r)?1:-1)}moveToLineBoundary(e,t,i=!0){return Xg(this,e,t,i)}moveVertically(e,t,i){return io(this,e,Yg(this,e,t,i))}domAtPos(e,t=1){return this.docView.domAtPos(e,t)}posAtDOM(e,t=0){return this.docView.posFromDOM(e,t)}posAtCoords(e,t=!0){this.readMeasured();let i=fl(this,e,t);return i&&i.pos}posAndSideAtCoords(e,t=!0){return this.readMeasured(),fl(this,e,t)}coordsAtPos(e,t=1){this.readMeasured();let i=this.docView.coordsAt(e,t);if(!i||i.left==i.right)return i;let r=this.state.doc.lineAt(e),s=this.bidiSpans(r),o=s[Gt.find(s,e-r.from,-1,t)];return cs(i,o.dir==_e.LTR==t>0)}coordsForChar(e){return this.readMeasured(),this.docView.coordsForChar(e)}get defaultCharacterWidth(){return this.viewState.heightOracle.charWidth}get defaultLineHeight(){return this.viewState.heightOracle.lineHeight}get textDirection(){return this.viewState.defaultTextDirection}textDirectionAt(e){return!this.state.facet(lf)||e<this.viewport.from||e>this.viewport.to?this.textDirection:(this.readMeasured(),this.docView.textDirectionAt(e))}get lineWrapping(){return this.viewState.heightOracle.lineWrapping}bidiSpans(e){if(e.length>N1)return Jh(e.length);let t=this.textDirectionAt(e.from),i;for(let s of this.bidiCache)if(s.from==e.from&&s.dir==t&&(s.fresh||Qh(s.isolates,i=yu(this,e))))return s.order;i||(i=yu(this,e));let r=xg(e.text,t,i);return this.bidiCache.push(new gs(e.from,e.to,t,i,!0,r)),r}get hasFocus(){var e;return(this.dom.ownerDocument.hasFocus()||V.safari&&((e=this.inputState)===null||e===void 0?void 0:e.lastContextMenu)>Date.now()-3e4)&&this.root.activeElement==this.contentDOM}focus(){this.observer.ignore(()=>{Uh(this.contentDOM),this.docView.updateSelection()})}setRoot(e){this._root!=e&&(this._root=e,this.observer.setWindow((e.nodeType==9?e:e.ownerDocument).defaultView||window),this.mountStyles())}destroy(){this.root.activeElement==this.contentDOM&&this.contentDOM.blur();for(let e of this.plugins)e.destroy(this);this.plugins=[],this.inputState.destroy(),this.docView.destroy(),this.dom.remove(),this.observer.destroy(),this.measureScheduled>-1&&this.win.cancelAnimationFrame(this.measureScheduled),this.destroyed=!0}static scrollIntoView(e,t={}){return Ar.of(new hi(typeof e=="number"?O.cursor(e):e,t.y,t.x,t.yMargin,t.xMargin))}scrollSnapshot(){let{scrollTop:e,scrollLeft:t}=this.scrollDOM,i=this.viewState.scrollAnchorAt(e);return Ar.of(new hi(O.cursor(i.from),"start","start",i.top-e,t,!0))}setTabFocusMode(e){e==null?this.inputState.tabFocusMode=this.inputState.tabFocusMode<0?0:-1:typeof e=="boolean"?this.inputState.tabFocusMode=e?0:-1:this.inputState.tabFocusMode!=0&&(this.inputState.tabFocusMode=Date.now()+e)}static domEventHandlers(e){return en.define(()=>({}),{eventHandlers:e})}static domEventObservers(e){return en.define(()=>({}),{eventObservers:e})}static theme(e,t){let i=vn.newName(),r=[Dr.of(i),Wi.of(gl(`.${i}`,e))];return t&&t.dark&&r.push(pl.of(!0)),r}static baseTheme(e){return Cs.lowest(Wi.of(gl("."+ml,e,Bf)))}static findFromDOM(e){var t;let i=e.querySelector(".cm-content"),r=i&&Ee.get(i)||Ee.get(e);return((t=r==null?void 0:r.root)===null||t===void 0?void 0:t.view)||null}}G.styleModule=Wi;G.inputHandler=sf;G.clipboardInputFilter=aa;G.clipboardOutputFilter=ua;G.scrollHandler=uf;G.focusChangeEffect=of;G.perLineTextDirection=lf;G.exceptionSink=rf;G.updateListener=ul;G.editable=ln;G.mouseSelectionStyle=nf;G.dragMovesSelection=tf;G.clickAddsSelectionRange=ef;G.decorations=Ms;G.blockWrappers=ff;G.outerDecorations=ha;G.atomicRanges=yr;G.bidiIsolatedRanges=df;G.scrollMargins=pf;G.darkTheme=pl;G.cspNonce=K.define({combine:n=>n.length?n[0]:""});G.contentAttributes=ca;G.editorAttributes=hf;G.lineWrapping=G.contentAttributes.of({class:"cm-lineWrapping"});G.announce=Be.define();const N1=4096,Nu={};class gs{constructor(e,t,i,r,s,o){this.from=e,this.to=t,this.dir=i,this.isolates=r,this.fresh=s,this.order=o}static update(e,t){if(t.empty&&!e.some(s=>s.fresh))return e;let i=[],r=e.length?e[e.length-1].dir:_e.LTR;for(let s=Math.max(0,e.length-10);s<e.length;s++){let o=e[s];o.dir==r&&!t.touchesRange(o.from,o.to)&&i.push(new gs(t.mapPos(o.from,1),t.mapPos(o.to,-1),o.dir,o.isolates,!1,o.order))}return i}}function qu(n,e,t){for(let i=n.state.facet(e),r=i.length-1;r>=0;r--){let s=i[r],o=typeof s=="function"?s(n):s;o&&sa(o,t)}return t}const q1=V.mac?"mac":V.windows?"win":V.linux?"linux":"key";function H1(n,e){const t=n.split(/-(?!$)/);let i=t[t.length-1];i=="Space"&&(i=" ");let r,s,o,l;for(let a=0;a<t.length-1;++a){const u=t[a];if(/^(cmd|meta|m)$/i.test(u))l=!0;else if(/^a(lt)?$/i.test(u))r=!0;else if(/^(c|ctrl|control)$/i.test(u))s=!0;else if(/^s(hift)?$/i.test(u))o=!0;else if(/^mod$/i.test(u))e=="mac"?l=!0:s=!0;else throw new Error("Unrecognized modifier name: "+u)}return r&&(i="Alt-"+i),s&&(i="Ctrl-"+i),l&&(i="Meta-"+i),o&&(i="Shift-"+i),i}function Br(n,e,t){return e.altKey&&(n="Alt-"+n),e.ctrlKey&&(n="Ctrl-"+n),e.metaKey&&(n="Meta-"+n),t!==!1&&e.shiftKey&&(n="Shift-"+n),n}const $1=Cs.default(G.domEventHandlers({keydown(n,e){return j1(W1(e.state),n,e,"editor")}})),Lf=K.define({enables:$1}),Hu=new WeakMap;function W1(n){let e=n.facet(Lf),t=Hu.get(e);return t||Hu.set(e,t=U1(e.reduce((i,r)=>i.concat(r),[]))),t}let yn=null;const V1=4e3;function U1(n,e=q1){let t=Object.create(null),i=Object.create(null),r=(o,l)=>{let a=i[o];if(a==null)i[o]=l;else if(a!=l)throw new Error("Key binding "+o+" is used both as a regular binding and as a multi-stroke prefix")},s=(o,l,a,u,c)=>{var h,f;let d=t[o]||(t[o]=Object.create(null)),p=l.split(/ (?!$)/).map(g=>H1(g,e));for(let g=1;g<p.length;g++){let S=p.slice(0,g).join(" ");r(S,!0),d[S]||(d[S]={preventDefault:!0,stopPropagation:!1,run:[v=>{let D=yn={view:v,prefix:S,scope:o};return setTimeout(()=>{yn==D&&(yn=null)},V1),!0}]})}let m=p.join(" ");r(m,!1);let b=d[m]||(d[m]={preventDefault:!1,stopPropagation:!1,run:((f=(h=d._any)===null||h===void 0?void 0:h.run)===null||f===void 0?void 0:f.slice())||[]});a&&b.run.push(a),u&&(b.preventDefault=!0),c&&(b.stopPropagation=!0)};for(let o of n){let l=o.scope?o.scope.split(" "):["editor"];if(o.any)for(let u of l){let c=t[u]||(t[u]=Object.create(null));c._any||(c._any={preventDefault:!1,stopPropagation:!1,run:[]});let{any:h}=o;for(let f in c)c[f].run.push(d=>h(d,bl))}let a=o[e]||o.key;if(a)for(let u of l)s(u,a,o.run,o.preventDefault,o.stopPropagation),o.shift&&s(u,"Shift-"+a,o.shift,o.preventDefault,o.stopPropagation)}return t}let bl=null;function j1(n,e,t,i){bl=e;let r=sg(e),s=Hm(r,0),o=$m(s)==r.length&&r!=" ",l="",a=!1,u=!1,c=!1;yn&&yn.view==t&&yn.scope==i&&(l=yn.prefix+" ",Sf.indexOf(e.keyCode)<0&&(u=!0,yn=null));let h=new Set,f=b=>{if(b){for(let g of b.run)if(!h.has(g)&&(h.add(g),g(t)))return b.stopPropagation&&(c=!0),!0;b.preventDefault&&(b.stopPropagation&&(c=!0),u=!0)}return!1},d=n[i],p,m;return d&&(f(d[l+Br(r,e,!o)])?a=!0:o&&(e.altKey||e.metaKey||e.ctrlKey)&&!(V.windows&&e.ctrlKey&&e.altKey)&&!(V.mac&&e.altKey&&!(e.ctrlKey||e.metaKey))&&(p=Sn[e.keyCode])&&p!=r?(f(d[l+Br(p,e,!0)])||e.shiftKey&&(m=sr[e.keyCode])!=r&&m!=p&&f(d[l+Br(m,e,!1)]))&&(a=!0):o&&e.shiftKey&&f(d[l+Br(r,e,!0)])&&(a=!0),!a&&f(d._any)&&(a=!0)),u&&(a=!0),a&&c&&e.stopPropagation(),bl=null,a}class Nn{constructor(e,t,i,r,s){this.className=e,this.left=t,this.top=i,this.width=r,this.height=s}draw(){let e=document.createElement("div");return e.className=this.className,this.adjust(e),e}update(e,t){return t.className!=this.className?!1:(this.adjust(e),!0)}adjust(e){e.style.left=this.left+"px",e.style.top=this.top+"px",this.width!=null&&(e.style.width=this.width+"px"),e.style.height=this.height+"px"}eq(e){return this.left==e.left&&this.top==e.top&&this.width==e.width&&this.height==e.height&&this.className==e.className}static forRange(e,t,i){if(i.empty){let r=e.coordsAtPos(i.head,i.assoc||1);if(!r)return[];let s=Of(e);return[new Nn(t,r.left-s.left,r.top-s.top,null,r.bottom-r.top)]}else return K1(e,t,i)}}function Of(n){let e=n.scrollDOM.getBoundingClientRect();return{left:(n.textDirection==_e.LTR?e.left:e.right-n.scrollDOM.clientWidth*n.scaleX)-n.scrollDOM.scrollLeft*n.scaleX,top:e.top-n.scrollDOM.scrollTop*n.scaleY}}function $u(n,e,t,i){let r=n.coordsAtPos(e,t*2);if(!r)return i;let s=n.dom.getBoundingClientRect(),o=(r.top+r.bottom)/2,l=n.posAtCoords({x:s.left+1,y:o}),a=n.posAtCoords({x:s.right-1,y:o});return l==null||a==null?i:{from:Math.max(i.from,Math.min(l,a)),to:Math.min(i.to,Math.max(l,a))}}function K1(n,e,t){if(t.to<=n.viewport.from||t.from>=n.viewport.to)return[];let i=Math.max(t.from,n.viewport.from),r=Math.min(t.to,n.viewport.to),s=n.textDirection==_e.LTR,o=n.contentDOM,l=o.getBoundingClientRect(),a=Of(n),u=o.querySelector(".cm-line"),c=u&&window.getComputedStyle(u),h=l.left+(c?parseInt(c.paddingLeft)+Math.min(0,parseInt(c.textIndent)):0),f=l.right-(c?parseInt(c.paddingRight):0),d=hl(n,i,1),p=hl(n,r,-1),m=d.type==Ve.Text?d:null,b=p.type==Ve.Text?p:null;if(m&&(n.lineWrapping||d.widgetLineBreaks)&&(m=$u(n,i,1,m)),b&&(n.lineWrapping||p.widgetLineBreaks)&&(b=$u(n,r,-1,b)),m&&b&&m.from==b.from&&m.to==b.to)return S(v(t.from,t.to,m));{let A=m?v(t.from,null,m):D(d,!1),k=b?v(null,t.to,b):D(p,!0),T=[];return(m||d).to<(b||p).from-(m&&b?1:0)||d.widgetLineBreaks>1&&A.bottom+n.defaultLineHeight/2<k.top?T.push(g(h,A.bottom,f,k.top)):A.bottom<k.top&&n.elementAtHeight((A.bottom+k.top)/2).type==Ve.Text&&(A.bottom=k.top=(A.bottom+k.top)/2),S(A).concat(T).concat(S(k))}function g(A,k,T,B){return new Nn(e,A-a.left,k-a.top,Math.max(0,T-A),B-k)}function S({top:A,bottom:k,horizontal:T}){let B=[];for(let I=0;I<T.length;I+=2)B.push(g(T[I],A,T[I+1],k));return B}function v(A,k,T){let B=1e9,I=-1e9,x=[];function P($,q,X,_,U){let j=n.coordsAtPos($,$==T.to?-2:2),y=n.coordsAtPos(X,X==T.from?2:-2);!j||!y||(B=Math.min(j.top,y.top,B),I=Math.max(j.bottom,y.bottom,I),U==_e.LTR?x.push(s&&q?h:j.left,s&&_?f:y.right):x.push(!s&&_?h:y.left,!s&&q?f:j.right))}let E=A??T.from,W=k??T.to;for(let $ of n.visibleRanges)if($.to>E&&$.from<W)for(let q=Math.max($.from,E),X=Math.min($.to,W);;){let _=n.state.doc.lineAt(q);for(let U of n.bidiSpans(_)){let j=U.from+_.from,y=U.to+_.from;if(j>=X)break;y>q&&P(Math.max(j,q),A==null&&j<=E,Math.min(y,X),k==null&&y>=W,U.dir)}if(q=_.to+1,q>=X)break}return x.length==0&&P(E,A==null,W,k==null,n.textDirection),{top:B,bottom:I,horizontal:x}}function D(A,k){let T=l.top+(k?A.top:A.bottom);return{top:T,bottom:T,horizontal:[]}}}function X1(n,e){return n.constructor==e.constructor&&n.eq(e)}class G1{constructor(e,t){this.view=e,this.layer=t,this.drawn=[],this.scaleX=1,this.scaleY=1,this.measureReq={read:this.measure.bind(this),write:this.draw.bind(this)},this.dom=e.scrollDOM.appendChild(document.createElement("div")),this.dom.classList.add("cm-layer"),t.above&&this.dom.classList.add("cm-layer-above"),t.class&&this.dom.classList.add(t.class),this.scale(),this.dom.setAttribute("aria-hidden","true"),this.setOrder(e.state),e.requestMeasure(this.measureReq),t.mount&&t.mount(this.dom,e)}update(e){e.startState.facet(Zr)!=e.state.facet(Zr)&&this.setOrder(e.state),(this.layer.update(e,this.dom)||e.geometryChanged)&&(this.scale(),e.view.requestMeasure(this.measureReq))}docViewUpdate(e){this.layer.updateOnDocViewUpdate!==!1&&e.requestMeasure(this.measureReq)}setOrder(e){let t=0,i=e.facet(Zr);for(;t<i.length&&i[t]!=this.layer;)t++;this.dom.style.zIndex=String((this.layer.above?150:-1)-t)}measure(){return this.layer.markers(this.view)}scale(){let{scaleX:e,scaleY:t}=this.view;(e!=this.scaleX||t!=this.scaleY)&&(this.scaleX=e,this.scaleY=t,this.dom.style.transform=`scale(${1/e}, ${1/t})`)}draw(e){if(e.length!=this.drawn.length||e.some((t,i)=>!X1(t,this.drawn[i]))){let t=this.dom.firstChild,i=0;for(let r of e)r.update&&t&&r.constructor&&this.drawn[i].constructor&&r.update(t,this.drawn[i])?(t=t.nextSibling,i++):this.dom.insertBefore(r.draw(),t);for(;t;){let r=t.nextSibling;t.remove(),t=r}this.drawn=e,V.safari&&V.safari_version>=26&&(this.dom.style.display=this.dom.firstChild?"":"none")}}destroy(){this.layer.destroy&&this.layer.destroy(this.dom,this.view),this.dom.remove()}}const Zr=K.define();function Rf(n){return[en.define(e=>new G1(e,n)),Zr.of(n)]}const yi=K.define({combine(n){return na(n,{cursorBlinkRate:1200,drawRangeCursor:!0,iosSelectionHandles:!0},{cursorBlinkRate:(e,t)=>Math.min(e,t),drawRangeCursor:(e,t)=>e||t})}});function Y1(n={}){return[yi.of(n),Q1,J1,Z1,af.of(!0)]}function zf(n){return n.startState.facet(yi)!=n.state.facet(yi)}const Q1=Rf({above:!0,markers(n){let{state:e}=n,t=e.facet(yi),i=[];for(let r of e.selection.ranges){let s=r==e.selection.main;if(r.empty||t.drawRangeCursor&&!(s&&V.ios&&t.iosSelectionHandles)){let o=s?"cm-cursor cm-cursor-primary":"cm-cursor cm-cursor-secondary",l=r.empty?r:O.cursor(r.head,r.assoc);for(let a of Nn.forRange(n,o,l))i.push(a)}}return i},update(n,e){n.transactions.some(i=>i.selection)&&(e.style.animationName=e.style.animationName=="cm-blink"?"cm-blink2":"cm-blink");let t=zf(n);return t&&Wu(n.state,e),n.docChanged||n.selectionSet||t},mount(n,e){Wu(e.state,n)},class:"cm-cursorLayer"});function Wu(n,e){e.style.animationDuration=n.facet(yi).cursorBlinkRate+"ms"}const J1=Rf({above:!1,markers(n){let e=[],{main:t,ranges:i}=n.state.selection;for(let r of i)if(!r.empty)for(let s of Nn.forRange(n,"cm-selectionBackground",r))e.push(s);if(V.ios&&!t.empty&&n.state.facet(yi).iosSelectionHandles){for(let r of Nn.forRange(n,"cm-selectionHandle cm-selectionHandle-start",O.cursor(t.from,1)))e.push(r);for(let r of Nn.forRange(n,"cm-selectionHandle cm-selectionHandle-end",O.cursor(t.to,1)))e.push(r)}return e},update(n,e){return n.docChanged||n.selectionSet||n.viewportChanged||zf(n)},class:"cm-selectionLayer"}),Z1=Cs.highest(G.theme({".cm-line":{"& ::selection, &::selection":{backgroundColor:"transparent !important"},caretColor:"transparent !important"},".cm-content":{caretColor:"transparent !important","& :focus":{caretColor:"initial !important","&::selection, & ::selection":{backgroundColor:"Highlight !important"}}}}));function e0(){return n0}const t0=Oe.line({class:"cm-activeLine"}),n0=en.fromClass(class{constructor(n){this.decorations=this.getDeco(n)}update(n){(n.docChanged||n.selectionSet)&&(this.decorations=this.getDeco(n.view))}getDeco(n){let e=-1,t=[];for(let i of n.state.selection.ranges){let r=n.lineBlockAt(i.head);r.from>e&&(t.push(t0.range(r.from)),e=r.from)}return Oe.set(t)}},{decorations:n=>n.decorations});class Un extends Hn{compare(e){return this==e||this.constructor==e.constructor&&this.eq(e)}eq(e){return!1}destroy(e){}}Un.prototype.elementClass="";Un.prototype.toDOM=void 0;Un.prototype.mapMode=wt.TrackBefore;Un.prototype.startSide=Un.prototype.endSide=-1;Un.prototype.point=!0;const oo=K.define(),i0=K.define(),es=K.define(),Vu=K.define({combine:n=>n.some(e=>e)});function r0(n){return[s0]}const s0=en.fromClass(class{constructor(n){this.view=n,this.domAfter=null,this.prevViewport=n.viewport,this.dom=document.createElement("div"),this.dom.className="cm-gutters cm-gutters-before",this.dom.setAttribute("aria-hidden","true"),this.dom.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.gutters=n.state.facet(es).map(e=>new ju(n,e)),this.fixed=!n.state.facet(Vu);for(let e of this.gutters)e.config.side=="after"?this.getDOMAfter().appendChild(e.dom):this.dom.appendChild(e.dom);this.fixed&&(this.dom.style.position="sticky"),this.syncGutters(!1),n.scrollDOM.insertBefore(this.dom,n.contentDOM)}getDOMAfter(){return this.domAfter||(this.domAfter=document.createElement("div"),this.domAfter.className="cm-gutters cm-gutters-after",this.domAfter.setAttribute("aria-hidden","true"),this.domAfter.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.domAfter.style.position=this.fixed?"sticky":"",this.view.scrollDOM.appendChild(this.domAfter)),this.domAfter}update(n){if(this.updateGutters(n)){let e=this.prevViewport,t=n.view.viewport,i=Math.min(e.to,t.to)-Math.max(e.from,t.from);this.syncGutters(i<(t.to-t.from)*.8)}if(n.geometryChanged){let e=this.view.contentHeight/this.view.scaleY+"px";this.dom.style.minHeight=e,this.domAfter&&(this.domAfter.style.minHeight=e)}this.view.state.facet(Vu)!=!this.fixed&&(this.fixed=!this.fixed,this.dom.style.position=this.fixed?"sticky":"",this.domAfter&&(this.domAfter.style.position=this.fixed?"sticky":"")),this.prevViewport=n.view.viewport}syncGutters(n){let e=this.dom.nextSibling;n&&(this.dom.remove(),this.domAfter&&this.domAfter.remove());let t=fe.iter(this.view.state.facet(oo),this.view.viewport.from),i=[],r=this.gutters.map(s=>new o0(s,this.view.viewport,-this.view.documentPadding.top));for(let s of this.view.viewportLineBlocks)if(i.length&&(i=[]),Array.isArray(s.type)){let o=!0;for(let l of s.type)if(l.type==Ve.Text&&o){yl(t,i,l.from);for(let a of r)a.line(this.view,l,i);o=!1}else if(l.widget)for(let a of r)a.widget(this.view,l)}else if(s.type==Ve.Text){yl(t,i,s.from);for(let o of r)o.line(this.view,s,i)}else if(s.widget)for(let o of r)o.widget(this.view,s);for(let s of r)s.finish();n&&(this.view.scrollDOM.insertBefore(this.dom,e),this.domAfter&&this.view.scrollDOM.appendChild(this.domAfter))}updateGutters(n){let e=n.startState.facet(es),t=n.state.facet(es),i=n.docChanged||n.heightChanged||n.viewportChanged||!fe.eq(n.startState.facet(oo),n.state.facet(oo),n.view.viewport.from,n.view.viewport.to);if(e==t)for(let r of this.gutters)r.update(n)&&(i=!0);else{i=!0;let r=[];for(let s of t){let o=e.indexOf(s);o<0?r.push(new ju(this.view,s)):(this.gutters[o].update(n),r.push(this.gutters[o]))}for(let s of this.gutters)s.dom.remove(),r.indexOf(s)<0&&s.destroy();for(let s of r)s.config.side=="after"?this.getDOMAfter().appendChild(s.dom):this.dom.appendChild(s.dom);this.gutters=r}return i}destroy(){for(let n of this.gutters)n.destroy();this.dom.remove(),this.domAfter&&this.domAfter.remove()}},{provide:n=>G.scrollMargins.of(e=>{let t=e.plugin(n);if(!t||t.gutters.length==0||!t.fixed)return null;let i=t.dom.offsetWidth*e.scaleX,r=t.domAfter?t.domAfter.offsetWidth*e.scaleX:0;return e.textDirection==_e.LTR?{left:i,right:r}:{right:i,left:r}})});function Uu(n){return Array.isArray(n)?n:[n]}function yl(n,e,t){for(;n.value&&n.from<=t;)n.from==t&&e.push(n.value),n.next()}class o0{constructor(e,t,i){this.gutter=e,this.height=i,this.i=0,this.cursor=fe.iter(e.markers,t.from)}addElement(e,t,i){let{gutter:r}=this,s=(t.top-this.height)/e.scaleY,o=t.height/e.scaleY;if(this.i==r.elements.length){let l=new Ff(e,o,s,i);r.elements.push(l),r.dom.appendChild(l.dom)}else r.elements[this.i].update(e,o,s,i);this.height=t.bottom,this.i++}line(e,t,i){let r=[];yl(this.cursor,r,t.from),i.length&&(r=r.concat(i));let s=this.gutter.config.lineMarker(e,t,r);s&&r.unshift(s);let o=this.gutter;r.length==0&&!o.config.renderEmptyElements||this.addElement(e,t,r)}widget(e,t){let i=this.gutter.config.widgetMarker(e,t.widget,t),r=i?[i]:null;for(let s of e.state.facet(i0)){let o=s(e,t.widget,t);o&&(r||(r=[])).push(o)}r&&this.addElement(e,t,r)}finish(){let e=this.gutter;for(;e.elements.length>this.i;){let t=e.elements.pop();e.dom.removeChild(t.dom),t.destroy()}}}class ju{constructor(e,t){this.view=e,this.config=t,this.elements=[],this.spacer=null,this.dom=document.createElement("div"),this.dom.className="cm-gutter"+(this.config.class?" "+this.config.class:"");for(let i in t.domEventHandlers)this.dom.addEventListener(i,r=>{let s=r.target,o;if(s!=this.dom&&this.dom.contains(s)){for(;s.parentNode!=this.dom;)s=s.parentNode;let a=s.getBoundingClientRect();o=(a.top+a.bottom)/2}else o=r.clientY;let l=e.lineBlockAtHeight(o-e.documentTop);t.domEventHandlers[i](e,l,r)&&r.preventDefault()});this.markers=Uu(t.markers(e)),t.initialSpacer&&(this.spacer=new Ff(e,0,0,[t.initialSpacer(e)]),this.dom.appendChild(this.spacer.dom),this.spacer.dom.style.cssText+="visibility: hidden; pointer-events: none")}update(e){let t=this.markers;if(this.markers=Uu(this.config.markers(e.view)),this.spacer&&this.config.updateSpacer){let r=this.config.updateSpacer(this.spacer.markers[0],e);r!=this.spacer.markers[0]&&this.spacer.update(e.view,0,0,[r])}let i=e.view.viewport;return!fe.eq(this.markers,t,i.from,i.to)||(this.config.lineMarkerChange?this.config.lineMarkerChange(e):!1)}destroy(){for(let e of this.elements)e.destroy()}}class Ff{constructor(e,t,i,r){this.height=-1,this.above=0,this.markers=[],this.dom=document.createElement("div"),this.dom.className="cm-gutterElement",this.update(e,t,i,r)}update(e,t,i,r){this.height!=t&&(this.height=t,this.dom.style.height=t+"px"),this.above!=i&&(this.dom.style.marginTop=(this.above=i)?i+"px":""),l0(this.markers,r)||this.setMarkers(e,r)}setMarkers(e,t){let i="cm-gutterElement",r=this.dom.firstChild;for(let s=0,o=0;;){let l=o,a=s<t.length?t[s++]:null,u=!1;if(a){let c=a.elementClass;c&&(i+=" "+c);for(let h=o;h<this.markers.length;h++)if(this.markers[h].compare(a)){l=h,u=!0;break}}else l=this.markers.length;for(;o<l;){let c=this.markers[o++];if(c.toDOM){c.destroy(r);let h=r.nextSibling;r.remove(),r=h}}if(!a)break;a.toDOM&&(u?r=r.nextSibling:this.dom.insertBefore(a.toDOM(e),r)),u&&o++}this.dom.className=i,this.markers=t}destroy(){this.setMarkers(null,[])}}function l0(n,e){if(n.length!=e.length)return!1;for(let t=0;t<n.length;t++)if(!n[t].compare(e[t]))return!1;return!0}const a0=K.define(),u0=K.define(),si=K.define({combine(n){return na(n,{formatNumber:String,domEventHandlers:{}},{domEventHandlers(e,t){let i=Object.assign({},e);for(let r in t){let s=i[r],o=t[r];i[r]=s?(l,a,u)=>s(l,a,u)||o(l,a,u):o}return i}})}});class lo extends Un{constructor(e){super(),this.number=e}eq(e){return this.number==e.number}toDOM(){return document.createTextNode(this.number)}}function ao(n,e){return n.state.facet(si).formatNumber(e,n.state)}const c0=es.compute([si],n=>({class:"cm-lineNumbers",renderEmptyElements:!1,markers(e){return e.state.facet(a0)},lineMarker(e,t,i){return i.some(r=>r.toDOM)?null:new lo(ao(e,e.state.doc.lineAt(t.from).number))},widgetMarker:(e,t,i)=>{for(let r of e.state.facet(u0)){let s=r(e,t,i);if(s)return s}return null},lineMarkerChange:e=>e.startState.facet(si)!=e.state.facet(si),initialSpacer(e){return new lo(ao(e,Ku(e.state.doc.lines)))},updateSpacer(e,t){let i=ao(t.view,Ku(t.view.state.doc.lines));return i==e.number?e:new lo(i)},domEventHandlers:n.facet(si).domEventHandlers,side:"before"}));function h0(n={}){return[si.of(n),r0(),c0]}function Ku(n){let e=9;for(;e<n;)e=e*10+9;return e}const f0=1024;let d0=0;class uo{constructor(e,t){this.from=e,this.to=t}}class ce{constructor(e={}){this.id=d0++,this.perNode=!!e.perNode,this.deserialize=e.deserialize||(()=>{throw new Error("This node type doesn't define a deserialize function")}),this.combine=e.combine||null}add(e){if(this.perNode)throw new RangeError("Can't add per-node props to node types");return typeof e!="function"&&(e=dt.match(e)),t=>{let i=e(t);return i===void 0?null:[this,i]}}}ce.closedBy=new ce({deserialize:n=>n.split(" ")});ce.openedBy=new ce({deserialize:n=>n.split(" ")});ce.group=new ce({deserialize:n=>n.split(" ")});ce.isolate=new ce({deserialize:n=>{if(n&&n!="rtl"&&n!="ltr"&&n!="auto")throw new RangeError("Invalid value for isolate: "+n);return n||"auto"}});ce.contextHash=new ce({perNode:!0});ce.lookAhead=new ce({perNode:!0});ce.mounted=new ce({perNode:!0});class Qi{constructor(e,t,i,r=!1){this.tree=e,this.overlay=t,this.parser=i,this.bracketed=r}static get(e){return e&&e.props&&e.props[ce.mounted.id]}}const p0=Object.create(null);class dt{constructor(e,t,i,r=0){this.name=e,this.props=t,this.id=i,this.flags=r}static define(e){let t=e.props&&e.props.length?Object.create(null):p0,i=(e.top?1:0)|(e.skipped?2:0)|(e.error?4:0)|(e.name==null?8:0),r=new dt(e.name||"",t,e.id,i);if(e.props){for(let s of e.props)if(Array.isArray(s)||(s=s(r)),s){if(s[0].perNode)throw new RangeError("Can't store a per-node prop on a node type");t[s[0].id]=s[1]}}return r}prop(e){return this.props[e.id]}get isTop(){return(this.flags&1)>0}get isSkipped(){return(this.flags&2)>0}get isError(){return(this.flags&4)>0}get isAnonymous(){return(this.flags&8)>0}is(e){if(typeof e=="string"){if(this.name==e)return!0;let t=this.prop(ce.group);return t?t.indexOf(e)>-1:!1}return this.id==e}static match(e){let t=Object.create(null);for(let i in e)for(let r of i.split(" "))t[r]=e[i];return i=>{for(let r=i.prop(ce.group),s=-1;s<(r?r.length:0);s++){let o=t[s<0?i.name:r[s]];if(o)return o}}}}dt.none=new dt("",Object.create(null),0,8);class ma{constructor(e){this.types=e;for(let t=0;t<e.length;t++)if(e[t].id!=t)throw new RangeError("Node type ids should correspond to array positions when creating a node set")}extend(...e){let t=[];for(let i of this.types){let r=null;for(let s of e){let o=s(i);if(o){r||(r=Object.assign({},i.props));let l=o[1],a=o[0];a.combine&&a.id in r&&(l=a.combine(r[a.id],l)),r[a.id]=l}}t.push(r?new dt(i.name,r,i.id,i.flags):i)}return new ma(t)}}const Lr=new WeakMap,Xu=new WeakMap;var De;(function(n){n[n.ExcludeBuffers=1]="ExcludeBuffers",n[n.IncludeAnonymous=2]="IncludeAnonymous",n[n.IgnoreMounts=4]="IgnoreMounts",n[n.IgnoreOverlays=8]="IgnoreOverlays",n[n.EnterBracketed=16]="EnterBracketed"})(De||(De={}));class Ce{constructor(e,t,i,r,s){if(this.type=e,this.children=t,this.positions=i,this.length=r,this.props=null,s&&s.length){this.props=Object.create(null);for(let[o,l]of s)this.props[typeof o=="number"?o:o.id]=l}}toString(){let e=Qi.get(this);if(e&&!e.overlay)return e.tree.toString();let t="";for(let i of this.children){let r=i.toString();r&&(t&&(t+=","),t+=r)}return this.type.name?(/\W/.test(this.type.name)&&!this.type.isError?JSON.stringify(this.type.name):this.type.name)+(t.length?"("+t+")":""):t}cursor(e=0){return new kl(this.topNode,e)}cursorAt(e,t=0,i=0){let r=Lr.get(this)||this.topNode,s=new kl(r);return s.moveTo(e,t),Lr.set(this,s._tree),s}get topNode(){return new Mt(this,0,0,null)}resolve(e,t=0){let i=ur(Lr.get(this)||this.topNode,e,t,!1);return Lr.set(this,i),i}resolveInner(e,t=0){let i=ur(Xu.get(this)||this.topNode,e,t,!0);return Xu.set(this,i),i}resolveStack(e,t=0){return b0(this,e,t)}iterate(e){let{enter:t,leave:i,from:r=0,to:s=this.length}=e,o=e.mode||0,l=(o&De.IncludeAnonymous)>0;for(let a=this.cursor(o|De.IncludeAnonymous);;){let u=!1;if(a.from<=s&&a.to>=r&&(!l&&a.type.isAnonymous||t(a)!==!1)){if(a.firstChild())continue;u=!0}for(;u&&i&&(l||!a.type.isAnonymous)&&i(a),!a.nextSibling();){if(!a.parent())return;u=!0}}}prop(e){return e.perNode?this.props?this.props[e.id]:void 0:this.type.prop(e)}get propValues(){let e=[];if(this.props)for(let t in this.props)e.push([+t,this.props[t]]);return e}balance(e={}){return this.children.length<=8?this:ya(dt.none,this.children,this.positions,0,this.children.length,0,this.length,(t,i,r)=>new Ce(this.type,t,i,r,this.propValues),e.makeTree||((t,i,r)=>new Ce(dt.none,t,i,r)))}static build(e){return y0(e)}}Ce.empty=new Ce(dt.none,[],[],0);class ga{constructor(e,t){this.buffer=e,this.index=t}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.index-2]}get size(){return this.buffer[this.index-1]}get pos(){return this.index}next(){this.index-=4}fork(){return new ga(this.buffer,this.index)}}class Cn{constructor(e,t,i){this.buffer=e,this.length=t,this.set=i}get type(){return dt.none}toString(){let e=[];for(let t=0;t<this.buffer.length;)e.push(this.childString(t)),t=this.buffer[t+3];return e.join(",")}childString(e){let t=this.buffer[e],i=this.buffer[e+3],r=this.set.types[t],s=r.name;if(/\W/.test(s)&&!r.isError&&(s=JSON.stringify(s)),e+=4,i==e)return s;let o=[];for(;e<i;)o.push(this.childString(e)),e=this.buffer[e+3];return s+"("+o.join(",")+")"}findChild(e,t,i,r,s){let{buffer:o}=this,l=-1;for(let a=e;a!=t&&!(Nf(s,r,o[a+1],o[a+2])&&(l=a,i>0));a=o[a+3]);return l}slice(e,t,i){let r=this.buffer,s=new Uint16Array(t-e),o=0;for(let l=e,a=0;l<t;){s[a++]=r[l++],s[a++]=r[l++]-i;let u=s[a++]=r[l++]-i;s[a++]=r[l++]-e,o=Math.max(o,u)}return new Cn(s,o,this.set)}}function Nf(n,e,t,i){switch(n){case-2:return t<e;case-1:return i>=e&&t<e;case 0:return t<e&&i>e;case 1:return t<=e&&i>e;case 2:return i>e;case 4:return!0}}function ur(n,e,t,i){for(var r;n.from==n.to||(t<1?n.from>=e:n.from>e)||(t>-1?n.to<=e:n.to<e);){let o=!i&&n instanceof Mt&&n.index<0?null:n.parent;if(!o)return n;n=o}let s=i?0:De.IgnoreOverlays;if(i)for(let o=n,l=o.parent;l;o=l,l=o.parent)o instanceof Mt&&o.index<0&&((r=l.enter(e,t,s))===null||r===void 0?void 0:r.from)!=o.from&&(n=l);for(;;){let o=n.enter(e,t,s);if(!o)return n;n=o}}class qf{cursor(e=0){return new kl(this,e)}getChild(e,t=null,i=null){let r=Gu(this,e,t,i);return r.length?r[0]:null}getChildren(e,t=null,i=null){return Gu(this,e,t,i)}resolve(e,t=0){return ur(this,e,t,!1)}resolveInner(e,t=0){return ur(this,e,t,!0)}matchContext(e){return wl(this.parent,e)}enterUnfinishedNodesBefore(e){let t=this.childBefore(e),i=this;for(;t;){let r=t.lastChild;if(!r||r.to!=t.to)break;r.type.isError&&r.from==r.to?(i=t,t=r.prevSibling):t=r}return i}get node(){return this}get next(){return this.parent}}class Mt extends qf{constructor(e,t,i,r){super(),this._tree=e,this.from=t,this.index=i,this._parent=r}get type(){return this._tree.type}get name(){return this._tree.type.name}get to(){return this.from+this._tree.length}nextChild(e,t,i,r,s=0){for(let o=this;;){for(let{children:l,positions:a}=o._tree,u=t>0?l.length:-1;e!=u;e+=t){let c=l[e],h=a[e]+o.from,f;if(!(!(s&De.EnterBracketed&&c instanceof Ce&&(f=Qi.get(c))&&!f.overlay&&f.bracketed&&i>=h&&i<=h+c.length)&&!Nf(r,i,h,h+c.length))){if(c instanceof Cn){if(s&De.ExcludeBuffers)continue;let d=c.findChild(0,c.buffer.length,t,i-h,r);if(d>-1)return new kn(new m0(o,c,e,h),null,d)}else if(s&De.IncludeAnonymous||!c.type.isAnonymous||ba(c)){let d;if(!(s&De.IgnoreMounts)&&(d=Qi.get(c))&&!d.overlay)return new Mt(d.tree,h,e,o);let p=new Mt(c,h,e,o);return s&De.IncludeAnonymous||!p.type.isAnonymous?p:p.nextChild(t<0?c.children.length-1:0,t,i,r,s)}}}if(s&De.IncludeAnonymous||!o.type.isAnonymous||(o.index>=0?e=o.index+t:e=t<0?-1:o._parent._tree.children.length,o=o._parent,!o))return null}}get firstChild(){return this.nextChild(0,1,0,4)}get lastChild(){return this.nextChild(this._tree.children.length-1,-1,0,4)}childAfter(e){return this.nextChild(0,1,e,2)}childBefore(e){return this.nextChild(this._tree.children.length-1,-1,e,-2)}prop(e){return this._tree.prop(e)}enter(e,t,i=0){let r;if(!(i&De.IgnoreOverlays)&&(r=Qi.get(this._tree))&&r.overlay){let s=e-this.from,o=i&De.EnterBracketed&&r.bracketed;for(let{from:l,to:a}of r.overlay)if((t>0||o?l<=s:l<s)&&(t<0||o?a>=s:a>s))return new Mt(r.tree,r.overlay[0].from+this.from,-1,this)}return this.nextChild(0,1,e,t,i)}nextSignificantParent(){let e=this;for(;e.type.isAnonymous&&e._parent;)e=e._parent;return e}get parent(){return this._parent?this._parent.nextSignificantParent():null}get nextSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index+1,1,0,4):null}get prevSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index-1,-1,0,4):null}get tree(){return this._tree}toTree(){return this._tree}toString(){return this._tree.toString()}}function Gu(n,e,t,i){let r=n.cursor(),s=[];if(!r.firstChild())return s;if(t!=null){for(let o=!1;!o;)if(o=r.type.is(t),!r.nextSibling())return s}for(;;){if(i!=null&&r.type.is(i))return s;if(r.type.is(e)&&s.push(r.node),!r.nextSibling())return i==null?s:[]}}function wl(n,e,t=e.length-1){for(let i=n;t>=0;i=i.parent){if(!i)return!1;if(!i.type.isAnonymous){if(e[t]&&e[t]!=i.name)return!1;t--}}return!0}class m0{constructor(e,t,i,r){this.parent=e,this.buffer=t,this.index=i,this.start=r}}class kn extends qf{get name(){return this.type.name}get from(){return this.context.start+this.context.buffer.buffer[this.index+1]}get to(){return this.context.start+this.context.buffer.buffer[this.index+2]}constructor(e,t,i){super(),this.context=e,this._parent=t,this.index=i,this.type=e.buffer.set.types[e.buffer.buffer[i]]}child(e,t,i){let{buffer:r}=this.context,s=r.findChild(this.index+4,r.buffer[this.index+3],e,t-this.context.start,i);return s<0?null:new kn(this.context,this,s)}get firstChild(){return this.child(1,0,4)}get lastChild(){return this.child(-1,0,4)}childAfter(e){return this.child(1,e,2)}childBefore(e){return this.child(-1,e,-2)}prop(e){return this.type.prop(e)}enter(e,t,i=0){if(i&De.ExcludeBuffers)return null;let{buffer:r}=this.context,s=r.findChild(this.index+4,r.buffer[this.index+3],t>0?1:-1,e-this.context.start,t);return s<0?null:new kn(this.context,this,s)}get parent(){return this._parent||this.context.parent.nextSignificantParent()}externalSibling(e){return this._parent?null:this.context.parent.nextChild(this.context.index+e,e,0,4)}get nextSibling(){let{buffer:e}=this.context,t=e.buffer[this.index+3];return t<(this._parent?e.buffer[this._parent.index+3]:e.buffer.length)?new kn(this.context,this._parent,t):this.externalSibling(1)}get prevSibling(){let{buffer:e}=this.context,t=this._parent?this._parent.index+4:0;return this.index==t?this.externalSibling(-1):new kn(this.context,this._parent,e.findChild(t,this.index,-1,0,4))}get tree(){return null}toTree(){let e=[],t=[],{buffer:i}=this.context,r=this.index+4,s=i.buffer[this.index+3];if(s>r){let o=i.buffer[this.index+1];e.push(i.slice(r,s,o)),t.push(0)}return new Ce(this.type,e,t,this.to-this.from)}toString(){return this.context.buffer.childString(this.index)}}function Hf(n){if(!n.length)return null;let e=0,t=n[0];for(let s=1;s<n.length;s++){let o=n[s];(o.from>t.from||o.to<t.to)&&(t=o,e=s)}let i=t instanceof Mt&&t.index<0?null:t.parent,r=n.slice();return i?r[e]=i:r.splice(e,1),new g0(r,t)}class g0{constructor(e,t){this.heads=e,this.node=t}get next(){return Hf(this.heads)}}function b0(n,e,t){let i=n.resolveInner(e,t),r=null;for(let s=i instanceof Mt?i:i.context.parent;s;s=s.parent)if(s.index<0){let o=s.parent;(r||(r=[i])).push(o.resolve(e,t)),s=o}else{let o=Qi.get(s.tree);if(o&&o.overlay&&o.overlay[0].from<=e&&o.overlay[o.overlay.length-1].to>=e){let l=new Mt(o.tree,o.overlay[0].from+s.from,-1,s);(r||(r=[i])).push(ur(l,e,t,!1))}}return r?Hf(r):i}class kl{get name(){return this.type.name}constructor(e,t=0){if(this.buffer=null,this.stack=[],this.index=0,this.bufferNode=null,this.mode=t&~De.EnterBracketed,e instanceof Mt)this.yieldNode(e);else{this._tree=e.context.parent,this.buffer=e.context;for(let i=e._parent;i;i=i._parent)this.stack.unshift(i.index);this.bufferNode=e,this.yieldBuf(e.index)}}yieldNode(e){return e?(this._tree=e,this.type=e.type,this.from=e.from,this.to=e.to,!0):!1}yieldBuf(e,t){this.index=e;let{start:i,buffer:r}=this.buffer;return this.type=t||r.set.types[r.buffer[e]],this.from=i+r.buffer[e+1],this.to=i+r.buffer[e+2],!0}yield(e){return e?e instanceof Mt?(this.buffer=null,this.yieldNode(e)):(this.buffer=e.context,this.yieldBuf(e.index,e.type)):!1}toString(){return this.buffer?this.buffer.buffer.childString(this.index):this._tree.toString()}enterChild(e,t,i){if(!this.buffer)return this.yield(this._tree.nextChild(e<0?this._tree._tree.children.length-1:0,e,t,i,this.mode));let{buffer:r}=this.buffer,s=r.findChild(this.index+4,r.buffer[this.index+3],e,t-this.buffer.start,i);return s<0?!1:(this.stack.push(this.index),this.yieldBuf(s))}firstChild(){return this.enterChild(1,0,4)}lastChild(){return this.enterChild(-1,0,4)}childAfter(e){return this.enterChild(1,e,2)}childBefore(e){return this.enterChild(-1,e,-2)}enter(e,t,i=this.mode){return this.buffer?i&De.ExcludeBuffers?!1:this.enterChild(1,e,t):this.yield(this._tree.enter(e,t,i))}parent(){if(!this.buffer)return this.yieldNode(this.mode&De.IncludeAnonymous?this._tree._parent:this._tree.parent);if(this.stack.length)return this.yieldBuf(this.stack.pop());let e=this.mode&De.IncludeAnonymous?this.buffer.parent:this.buffer.parent.nextSignificantParent();return this.buffer=null,this.yieldNode(e)}sibling(e){if(!this.buffer)return this._tree._parent?this.yield(this._tree.index<0?null:this._tree._parent.nextChild(this._tree.index+e,e,0,4,this.mode)):!1;let{buffer:t}=this.buffer,i=this.stack.length-1;if(e<0){let r=i<0?0:this.stack[i]+4;if(this.index!=r)return this.yieldBuf(t.findChild(r,this.index,-1,0,4))}else{let r=t.buffer[this.index+3];if(r<(i<0?t.buffer.length:t.buffer[this.stack[i]+3]))return this.yieldBuf(r)}return i<0?this.yield(this.buffer.parent.nextChild(this.buffer.index+e,e,0,4,this.mode)):!1}nextSibling(){return this.sibling(1)}prevSibling(){return this.sibling(-1)}atLastNode(e){let t,i,{buffer:r}=this;if(r){if(e>0){if(this.index<r.buffer.buffer.length)return!1}else for(let s=0;s<this.index;s++)if(r.buffer.buffer[s+3]<this.index)return!1;({index:t,parent:i}=r)}else({index:t,_parent:i}=this._tree);for(;i;{index:t,_parent:i}=i)if(t>-1)for(let s=t+e,o=e<0?-1:i._tree.children.length;s!=o;s+=e){let l=i._tree.children[s];if(this.mode&De.IncludeAnonymous||l instanceof Cn||!l.type.isAnonymous||ba(l))return!1}return!0}move(e,t){if(t&&this.enterChild(e,0,4))return!0;for(;;){if(this.sibling(e))return!0;if(this.atLastNode(e)||!this.parent())return!1}}next(e=!0){return this.move(1,e)}prev(e=!0){return this.move(-1,e)}moveTo(e,t=0){for(;(this.from==this.to||(t<1?this.from>=e:this.from>e)||(t>-1?this.to<=e:this.to<e))&&this.parent(););for(;this.enterChild(1,e,t););return this}get node(){if(!this.buffer)return this._tree;let e=this.bufferNode,t=null,i=0;if(e&&e.context==this.buffer)e:for(let r=this.index,s=this.stack.length;s>=0;){for(let o=e;o;o=o._parent)if(o.index==r){if(r==this.index)return o;t=o,i=s+1;break e}r=this.stack[--s]}for(let r=i;r<this.stack.length;r++)t=new kn(this.buffer,t,this.stack[r]);return this.bufferNode=new kn(this.buffer,t,this.index)}get tree(){return this.buffer?null:this._tree._tree}iterate(e,t){for(let i=0;;){let r=!1;if(this.type.isAnonymous||e(this)!==!1){if(this.firstChild()){i++;continue}this.type.isAnonymous||(r=!0)}for(;;){if(r&&t&&t(this),r=this.type.isAnonymous,!i)return;if(this.nextSibling())break;this.parent(),i--,r=!0}}}matchContext(e){if(!this.buffer)return wl(this.node.parent,e);let{buffer:t}=this.buffer,{types:i}=t.set;for(let r=e.length-1,s=this.stack.length-1;r>=0;s--){if(s<0)return wl(this._tree,e,r);let o=i[t.buffer[this.stack[s]]];if(!o.isAnonymous){if(e[r]&&e[r]!=o.name)return!1;r--}}return!0}}function ba(n){return n.children.some(e=>e instanceof Cn||!e.type.isAnonymous||ba(e))}function y0(n){var e;let{buffer:t,nodeSet:i,maxBufferLength:r=f0,reused:s=[],minRepeatType:o=i.types.length}=n,l=Array.isArray(t)?new ga(t,t.length):t,a=i.types,u=0,c=0;function h(A,k,T,B,I,x){let{id:P,start:E,end:W,size:$}=l,q=c,X=u;if($<0)if(l.next(),$==-1){let re=s[P];T.push(re),B.push(E-A);return}else if($==-3){u=P;return}else if($==-4){c=P;return}else throw new RangeError(`Unrecognized record size: ${$}`);let _=a[P],U,j,y=E-A;if(W-E<=r&&(j=b(l.pos-k,I))){let re=new Uint16Array(j.size-j.skip),ne=l.pos-j.size,w=re.length;for(;l.pos>ne;)w=g(j.start,re,w);U=new Cn(re,W-j.start,i),y=j.start-A}else{let re=l.pos-$;l.next();let ne=[],w=[],oe=P>=o?P:-1,Q=0,ie=W;for(;l.pos>re;)oe>=0&&l.id==oe&&l.size>=0?(l.end<=ie-r&&(p(ne,w,E,Q,l.end,ie,oe,q,X),Q=ne.length,ie=l.end),l.next()):x>2500?f(E,re,ne,w):h(E,re,ne,w,oe,x+1);if(oe>=0&&Q>0&&Q<ne.length&&p(ne,w,E,Q,E,ie,oe,q,X),ne.reverse(),w.reverse(),oe>-1&&Q>0){let Me=d(_,X);U=ya(_,ne,w,0,ne.length,0,W-E,Me,Me)}else U=m(_,ne,w,W-E,q-W,X)}T.push(U),B.push(y)}function f(A,k,T,B){let I=[],x=0,P=-1;for(;l.pos>k;){let{id:E,start:W,end:$,size:q}=l;if(q>4)l.next();else{if(P>-1&&W<P)break;P<0&&(P=$-r),I.push(E,W,$),x++,l.next()}}if(x){let E=new Uint16Array(x*4),W=I[I.length-2];for(let $=I.length-3,q=0;$>=0;$-=3)E[q++]=I[$],E[q++]=I[$+1]-W,E[q++]=I[$+2]-W,E[q++]=q;T.push(new Cn(E,I[2]-W,i)),B.push(W-A)}}function d(A,k){return(T,B,I)=>{let x=0,P=T.length-1,E,W;if(P>=0&&(E=T[P])instanceof Ce){if(!P&&E.type==A&&E.length==I)return E;(W=E.prop(ce.lookAhead))&&(x=B[P]+E.length+W)}return m(A,T,B,I,x,k)}}function p(A,k,T,B,I,x,P,E,W){let $=[],q=[];for(;A.length>B;)$.push(A.pop()),q.push(k.pop()+T-I);A.push(m(i.types[P],$,q,x-I,E-x,W)),k.push(I-T)}function m(A,k,T,B,I,x,P){if(x){let E=[ce.contextHash,x];P=P?[E].concat(P):[E]}if(I>25){let E=[ce.lookAhead,I];P=P?[E].concat(P):[E]}return new Ce(A,k,T,B,P)}function b(A,k){let T=l.fork(),B=0,I=0,x=0,P=T.end-r,E={size:0,start:0,skip:0};e:for(let W=T.pos-A;T.pos>W;){let $=T.size;if(T.id==k&&$>=0){E.size=B,E.start=I,E.skip=x,x+=4,B+=4,T.next();continue}let q=T.pos-$;if($<0||q<W||T.start<P)break;let X=T.id>=o?4:0,_=T.start;for(T.next();T.pos>q;){if(T.size<0)if(T.size==-3||T.size==-4)X+=4;else break e;else T.id>=o&&(X+=4);T.next()}I=_,B+=$,x+=X}return(k<0||B==A)&&(E.size=B,E.start=I,E.skip=x),E.size>4?E:void 0}function g(A,k,T){let{id:B,start:I,end:x,size:P}=l;if(l.next(),P>=0&&B<o){let E=T;if(P>4){let W=l.pos-(P-4);for(;l.pos>W;)T=g(A,k,T)}k[--T]=E,k[--T]=x-A,k[--T]=I-A,k[--T]=B}else P==-3?u=B:P==-4&&(c=B);return T}let S=[],v=[];for(;l.pos>0;)h(n.start||0,n.bufferStart||0,S,v,-1,0);let D=(e=n.length)!==null&&e!==void 0?e:S.length?v[0]+S[0].length:0;return new Ce(a[n.topID],S.reverse(),v.reverse(),D)}const Yu=new WeakMap;function ts(n,e){if(!n.isAnonymous||e instanceof Cn||e.type!=n)return 1;let t=Yu.get(e);if(t==null){t=1;for(let i of e.children){if(i.type!=n||!(i instanceof Ce)){t=1;break}t+=ts(n,i)}Yu.set(e,t)}return t}function ya(n,e,t,i,r,s,o,l,a){let u=0;for(let p=i;p<r;p++)u+=ts(n,e[p]);let c=Math.ceil(u*1.5/8),h=[],f=[];function d(p,m,b,g,S){for(let v=b;v<g;){let D=v,A=m[v],k=ts(n,p[v]);for(v++;v<g;v++){let T=ts(n,p[v]);if(k+T>=c)break;k+=T}if(v==D+1){if(k>c){let T=p[D];d(T.children,T.positions,0,T.children.length,m[D]+S);continue}h.push(p[D])}else{let T=m[v-1]+p[v-1].length-A;h.push(ya(n,p,m,D,v,A,T,null,a))}f.push(A+S-s)}}return d(e,t,i,r,0),(l||a)(h,f,o)}class qn{constructor(e,t,i,r,s=!1,o=!1){this.from=e,this.to=t,this.tree=i,this.offset=r,this.open=(s?1:0)|(o?2:0)}get openStart(){return(this.open&1)>0}get openEnd(){return(this.open&2)>0}static addTree(e,t=[],i=!1){let r=[new qn(0,e.length,e,0,!1,i)];for(let s of t)s.to>e.length&&r.push(s);return r}static applyChanges(e,t,i=128){if(!t.length)return e;let r=[],s=1,o=e.length?e[0]:null;for(let l=0,a=0,u=0;;l++){let c=l<t.length?t[l]:null,h=c?c.fromA:1e9;if(h-a>=i)for(;o&&o.from<h;){let f=o;if(a>=f.from||h<=f.to||u){let d=Math.max(f.from,a)-u,p=Math.min(f.to,h)-u;f=d>=p?null:new qn(d,p,f.tree,f.offset+u,l>0,!!c)}if(f&&r.push(f),o.to>h)break;o=s<e.length?e[s++]:null}if(!c)break;a=c.toA,u=c.toA-c.toB}return r}}class $f{startParse(e,t,i){return typeof e=="string"&&(e=new w0(e)),i=i?i.length?i.map(r=>new uo(r.from,r.to)):[new uo(0,0)]:[new uo(0,e.length)],this.createParse(e,t||[],i)}parse(e,t,i){let r=this.startParse(e,t,i);for(;;){let s=r.advance();if(s)return s}}}class w0{constructor(e){this.string=e}get length(){return this.string.length}chunk(e){return this.string.slice(e)}get lineChunks(){return!1}read(e,t){return this.string.slice(e,t)}}new ce({perNode:!0});let k0=0;class Ct{constructor(e,t,i,r){this.name=e,this.set=t,this.base=i,this.modified=r,this.id=k0++}toString(){let{name:e}=this;for(let t of this.modified)t.name&&(e=`${t.name}(${e})`);return e}static define(e,t){let i=typeof e=="string"?e:"?";if(e instanceof Ct&&(t=e),t!=null&&t.base)throw new Error("Can not derive from a modified tag");let r=new Ct(i,[],null,[]);if(r.set.push(r),t)for(let s of t.set)r.set.push(s);return r}static defineModifier(e){let t=new bs(e);return i=>i.modified.indexOf(t)>-1?i:bs.get(i.base||i,i.modified.concat(t).sort((r,s)=>r.id-s.id))}}let x0=0;class bs{constructor(e){this.name=e,this.instances=[],this.id=x0++}static get(e,t){if(!t.length)return e;let i=t[0].instances.find(l=>l.base==e&&v0(t,l.modified));if(i)return i;let r=[],s=new Ct(e.name,r,e,t);for(let l of t)l.instances.push(s);let o=S0(t);for(let l of e.set)if(!l.modified.length)for(let a of o)r.push(bs.get(l,a));return s}}function v0(n,e){return n.length==e.length&&n.every((t,i)=>t==e[i])}function S0(n){let e=[[]];for(let t=0;t<n.length;t++)for(let i=0,r=e.length;i<r;i++)e.push(e[i].concat(n[t]));return e.sort((t,i)=>i.length-t.length)}function _0(n){let e=Object.create(null);for(let t in n){let i=n[t];Array.isArray(i)||(i=[i]);for(let r of t.split(" "))if(r){let s=[],o=2,l=r;for(let h=0;;){if(l=="..."&&h>0&&h+3==r.length){o=1;break}let f=/^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(l);if(!f)throw new RangeError("Invalid path: "+r);if(s.push(f[0]=="*"?"":f[0][0]=='"'?JSON.parse(f[0]):f[0]),h+=f[0].length,h==r.length)break;let d=r[h++];if(h==r.length&&d=="!"){o=0;break}if(d!="/")throw new RangeError("Invalid path: "+r);l=r.slice(h)}let a=s.length-1,u=s[a];if(!u)throw new RangeError("Invalid path: "+r);let c=new cr(i,o,a>0?s.slice(0,a):null);e[u]=c.sort(e[u])}}return Wf.add(e)}const Wf=new ce({combine(n,e){let t,i,r;for(;n||e;){if(!n||e&&n.depth>=e.depth?(r=e,e=e.next):(r=n,n=n.next),t&&t.mode==r.mode&&!r.context&&!t.context)continue;let s=new cr(r.tags,r.mode,r.context);t?t.next=s:i=s,t=s}return i}});class cr{constructor(e,t,i,r){this.tags=e,this.mode=t,this.context=i,this.next=r}get opaque(){return this.mode==0}get inherit(){return this.mode==1}sort(e){return!e||e.depth<this.depth?(this.next=e,this):(e.next=this.sort(e.next),e)}get depth(){return this.context?this.context.length:0}}cr.empty=new cr([],2,null);function Vf(n,e){let t=Object.create(null);for(let s of n)if(!Array.isArray(s.tag))t[s.tag.id]=s.class;else for(let o of s.tag)t[o.id]=s.class;let{scope:i,all:r=null}=e||{};return{style:s=>{let o=r;for(let l of s)for(let a of l.set){let u=t[a.id];if(u){o=o?o+" "+u:u;break}}return o},scope:i}}function C0(n,e){let t=null;for(let i of n){let r=i.style(e);r&&(t=t?t+" "+r:r)}return t}function A0(n,e,t,i=0,r=n.length){let s=new T0(i,Array.isArray(e)?e:[e],t);s.highlightRange(n.cursor(),i,r,"",s.highlighters),s.flush(r)}class T0{constructor(e,t,i){this.at=e,this.highlighters=t,this.span=i,this.class=""}startSpan(e,t){t!=this.class&&(this.flush(e),e>this.at&&(this.at=e),this.class=t)}flush(e){e>this.at&&this.class&&this.span(this.at,e,this.class)}highlightRange(e,t,i,r,s){let{type:o,from:l,to:a}=e;if(l>=i||a<=t)return;o.isTop&&(s=this.highlighters.filter(d=>!d.scope||d.scope(o)));let u=r,c=E0(e)||cr.empty,h=C0(s,c.tags);if(h&&(u&&(u+=" "),u+=h,c.mode==1&&(r+=(r?" ":"")+h)),this.startSpan(Math.max(t,l),u),c.opaque)return;let f=e.tree&&e.tree.prop(ce.mounted);if(f&&f.overlay){let d=e.node.enter(f.overlay[0].from+l,1),p=this.highlighters.filter(b=>!b.scope||b.scope(f.tree.type)),m=e.firstChild();for(let b=0,g=l;;b++){let S=b<f.overlay.length?f.overlay[b]:null,v=S?S.from+l:a,D=Math.max(t,g),A=Math.min(i,v);if(D<A&&m)for(;e.from<A&&(this.highlightRange(e,D,A,r,s),this.startSpan(Math.min(A,e.to),u),!(e.to>=v||!e.nextSibling())););if(!S||v>i)break;g=S.to+l,g>t&&(this.highlightRange(d.cursor(),Math.max(t,S.from+l),Math.min(i,g),"",p),this.startSpan(Math.min(i,g),u))}m&&e.parent()}else if(e.firstChild()){f&&(r="");do if(!(e.to<=t)){if(e.from>=i)break;this.highlightRange(e,t,i,r,s),this.startSpan(Math.min(i,e.to),u)}while(e.nextSibling());e.parent()}}}function E0(n){let e=n.type.prop(Wf);for(;e&&e.context&&!n.matchContext(e.context);)e=e.next;return e||null}const H=Ct.define,Or=H(),gn=H(),Qu=H(gn),Ju=H(gn),bn=H(),Rr=H(bn),co=H(bn),Vt=H(),Dn=H(Vt),$t=H(),Wt=H(),xl=H(),Bi=H(xl),zr=H(),J={comment:Or,lineComment:H(Or),blockComment:H(Or),docComment:H(Or),name:gn,variableName:H(gn),typeName:Qu,tagName:H(Qu),propertyName:Ju,attributeName:H(Ju),className:H(gn),labelName:H(gn),namespace:H(gn),macroName:H(gn),literal:bn,string:Rr,docString:H(Rr),character:H(Rr),attributeValue:H(Rr),number:co,integer:H(co),float:H(co),bool:H(bn),regexp:H(bn),escape:H(bn),color:H(bn),url:H(bn),keyword:$t,self:H($t),null:H($t),atom:H($t),unit:H($t),modifier:H($t),operatorKeyword:H($t),controlKeyword:H($t),definitionKeyword:H($t),moduleKeyword:H($t),operator:Wt,derefOperator:H(Wt),arithmeticOperator:H(Wt),logicOperator:H(Wt),bitwiseOperator:H(Wt),compareOperator:H(Wt),updateOperator:H(Wt),definitionOperator:H(Wt),typeOperator:H(Wt),controlOperator:H(Wt),punctuation:xl,separator:H(xl),bracket:Bi,angleBracket:H(Bi),squareBracket:H(Bi),paren:H(Bi),brace:H(Bi),content:Vt,heading:Dn,heading1:H(Dn),heading2:H(Dn),heading3:H(Dn),heading4:H(Dn),heading5:H(Dn),heading6:H(Dn),contentSeparator:H(Vt),list:H(Vt),quote:H(Vt),emphasis:H(Vt),strong:H(Vt),link:H(Vt),monospace:H(Vt),strikethrough:H(Vt),inserted:H(),deleted:H(),changed:H(),invalid:H(),meta:zr,documentMeta:H(zr),annotation:H(zr),processingInstruction:H(zr),definition:Ct.defineModifier("definition"),constant:Ct.defineModifier("constant"),function:Ct.defineModifier("function"),standard:Ct.defineModifier("standard"),local:Ct.defineModifier("local"),special:Ct.defineModifier("special")};for(let n in J){let e=J[n];e instanceof Ct&&(e.name=n)}Vf([{tag:J.link,class:"tok-link"},{tag:J.heading,class:"tok-heading"},{tag:J.emphasis,class:"tok-emphasis"},{tag:J.strong,class:"tok-strong"},{tag:J.keyword,class:"tok-keyword"},{tag:J.atom,class:"tok-atom"},{tag:J.bool,class:"tok-bool"},{tag:J.url,class:"tok-url"},{tag:J.labelName,class:"tok-labelName"},{tag:J.inserted,class:"tok-inserted"},{tag:J.deleted,class:"tok-deleted"},{tag:J.literal,class:"tok-literal"},{tag:J.string,class:"tok-string"},{tag:J.number,class:"tok-number"},{tag:[J.regexp,J.escape,J.special(J.string)],class:"tok-string2"},{tag:J.variableName,class:"tok-variableName"},{tag:J.local(J.variableName),class:"tok-variableName tok-local"},{tag:J.definition(J.variableName),class:"tok-variableName tok-definition"},{tag:J.special(J.variableName),class:"tok-variableName2"},{tag:J.definition(J.propertyName),class:"tok-propertyName tok-definition"},{tag:J.typeName,class:"tok-typeName"},{tag:J.namespace,class:"tok-namespace"},{tag:J.className,class:"tok-className"},{tag:J.macroName,class:"tok-macroName"},{tag:J.propertyName,class:"tok-propertyName"},{tag:J.operator,class:"tok-operator"},{tag:J.comment,class:"tok-comment"},{tag:J.meta,class:"tok-meta"},{tag:J.invalid,class:"tok-invalid"},{tag:J.punctuation,class:"tok-punctuation"}]);var ho;const oi=new ce;function M0(n){return K.define({combine:n?e=>e.concat(n):void 0})}const P0=new ce;class Ot{constructor(e,t,i=[],r=""){this.data=e,this.name=r,pe.prototype.hasOwnProperty("tree")||Object.defineProperty(pe.prototype,"tree",{get(){return tn(this)}}),this.parser=t,this.extension=[xi.of(this),pe.languageData.of((s,o,l)=>{let a=Zu(s,o,l),u=a.type.prop(oi);if(!u)return[];let c=s.facet(u),h=a.type.prop(P0);if(h){let f=a.resolve(o-a.from,l);for(let d of h)if(d.test(f,s)){let p=s.facet(d.facet);return d.type=="replace"?p:p.concat(c)}}return c})].concat(i)}isActiveAt(e,t,i=-1){return Zu(e,t,i).type.prop(oi)==this.data}findRegions(e){let t=e.facet(xi);if((t==null?void 0:t.data)==this.data)return[{from:0,to:e.doc.length}];if(!t||!t.allowsNesting)return[];let i=[],r=(s,o)=>{if(s.prop(oi)==this.data){i.push({from:o,to:o+s.length});return}let l=s.prop(ce.mounted);if(l){if(l.tree.prop(oi)==this.data){if(l.overlay)for(let a of l.overlay)i.push({from:a.from+o,to:a.to+o});else i.push({from:o,to:o+s.length});return}else if(l.overlay){let a=i.length;if(r(l.tree,l.overlay[0].from+o),i.length>a)return}}for(let a=0;a<s.children.length;a++){let u=s.children[a];u instanceof Ce&&r(u,s.positions[a]+o)}};return r(tn(e),0),i}get allowsNesting(){return!0}}Ot.setState=Be.define();function Zu(n,e,t){let i=n.facet(xi),r=tn(n).topNode;if(!i||i.allowsNesting)for(let s=r;s;s=s.enter(e,t,De.ExcludeBuffers|De.EnterBracketed))s.type.isTop&&(r=s);return r}function tn(n){let e=n.field(Ot.state,!1);return e?e.tree:Ce.empty}class I0{constructor(e){this.doc=e,this.cursorPos=0,this.string="",this.cursor=e.iter()}get length(){return this.doc.length}syncTo(e){return this.string=this.cursor.next(e-this.cursorPos).value,this.cursorPos=e+this.string.length,this.cursorPos-this.string.length}chunk(e){return this.syncTo(e),this.string}get lineChunks(){return!0}read(e,t){let i=this.cursorPos-this.string.length;return e<i||t>=this.cursorPos?this.doc.sliceString(e,t):this.string.slice(e-i,t-i)}}let Li=null;class wi{constructor(e,t,i=[],r,s,o,l,a){this.parser=e,this.state=t,this.fragments=i,this.tree=r,this.treeLen=s,this.viewport=o,this.skipped=l,this.scheduleOn=a,this.parse=null,this.tempSkipped=[]}static create(e,t,i){return new wi(e,t,[],Ce.empty,0,i,[],null)}startParse(){return this.parser.startParse(new I0(this.state.doc),this.fragments)}work(e,t){return t!=null&&t>=this.state.doc.length&&(t=void 0),this.tree!=Ce.empty&&this.isDone(t??this.state.doc.length)?(this.takeTree(),!0):this.withContext(()=>{var i;if(typeof e=="number"){let r=Date.now()+e;e=()=>Date.now()>r}for(this.parse||(this.parse=this.startParse()),t!=null&&(this.parse.stoppedAt==null||this.parse.stoppedAt>t)&&t<this.state.doc.length&&this.parse.stopAt(t);;){let r=this.parse.advance();if(r)if(this.fragments=this.withoutTempSkipped(qn.addTree(r,this.fragments,this.parse.stoppedAt!=null)),this.treeLen=(i=this.parse.stoppedAt)!==null&&i!==void 0?i:this.state.doc.length,this.tree=r,this.parse=null,this.treeLen<(t??this.state.doc.length))this.parse=this.startParse();else return!0;if(e())return!1}})}takeTree(){let e,t;this.parse&&(e=this.parse.parsedPos)>=this.treeLen&&((this.parse.stoppedAt==null||this.parse.stoppedAt>e)&&this.parse.stopAt(e),this.withContext(()=>{for(;!(t=this.parse.advance()););}),this.treeLen=e,this.tree=t,this.fragments=this.withoutTempSkipped(qn.addTree(this.tree,this.fragments,!0)),this.parse=null)}withContext(e){let t=Li;Li=this;try{return e()}finally{Li=t}}withoutTempSkipped(e){for(let t;t=this.tempSkipped.pop();)e=ec(e,t.from,t.to);return e}changes(e,t){let{fragments:i,tree:r,treeLen:s,viewport:o,skipped:l}=this;if(this.takeTree(),!e.empty){let a=[];if(e.iterChangedRanges((u,c,h,f)=>a.push({fromA:u,toA:c,fromB:h,toB:f})),i=qn.applyChanges(i,a),r=Ce.empty,s=0,o={from:e.mapPos(o.from,-1),to:e.mapPos(o.to,1)},this.skipped.length){l=[];for(let u of this.skipped){let c=e.mapPos(u.from,1),h=e.mapPos(u.to,-1);c<h&&l.push({from:c,to:h})}}}return new wi(this.parser,t,i,r,s,o,l,this.scheduleOn)}updateViewport(e){if(this.viewport.from==e.from&&this.viewport.to==e.to)return!1;this.viewport=e;let t=this.skipped.length;for(let i=0;i<this.skipped.length;i++){let{from:r,to:s}=this.skipped[i];r<e.to&&s>e.from&&(this.fragments=ec(this.fragments,r,s),this.skipped.splice(i--,1))}return this.skipped.length>=t?!1:(this.reset(),!0)}reset(){this.parse&&(this.takeTree(),this.parse=null)}skipUntilInView(e,t){this.skipped.push({from:e,to:t})}static getSkippingParser(e){return new class extends $f{createParse(t,i,r){let s=r[0].from,o=r[r.length-1].to;return{parsedPos:s,advance(){let a=Li;if(a){for(let u of r)a.tempSkipped.push(u);e&&(a.scheduleOn=a.scheduleOn?Promise.all([a.scheduleOn,e]):e)}return this.parsedPos=o,new Ce(dt.none,[],[],o-s)},stoppedAt:null,stopAt(){}}}}}isDone(e){e=Math.min(e,this.state.doc.length);let t=this.fragments;return this.treeLen>=e&&t.length&&t[0].from==0&&t[0].to>=e}static get(){return Li}}function ec(n,e,t){return qn.applyChanges(n,[{fromA:e,toA:t,fromB:e,toB:t}])}class ki{constructor(e){this.context=e,this.tree=e.tree}apply(e){if(!e.docChanged&&this.tree==this.context.tree)return this;let t=this.context.changes(e.changes,e.state),i=this.context.treeLen==e.startState.doc.length?void 0:Math.max(e.changes.mapPos(this.context.treeLen),t.viewport.to);return t.work(20,i)||t.takeTree(),new ki(t)}static init(e){let t=Math.min(3e3,e.doc.length),i=wi.create(e.facet(xi).parser,e,{from:0,to:t});return i.work(20,t)||i.takeTree(),new ki(i)}}Ot.state=En.define({create:ki.init,update(n,e){for(let t of e.effects)if(t.is(Ot.setState))return t.value;return e.startState.facet(xi)!=e.state.facet(xi)?ki.init(e.state):n.apply(e)}});let Uf=n=>{let e=setTimeout(()=>n(),500);return()=>clearTimeout(e)};typeof requestIdleCallback<"u"&&(Uf=n=>{let e=-1,t=setTimeout(()=>{e=requestIdleCallback(n,{timeout:400})},100);return()=>e<0?clearTimeout(t):cancelIdleCallback(e)});const fo=typeof navigator<"u"&&(!((ho=navigator.scheduling)===null||ho===void 0)&&ho.isInputPending)?()=>navigator.scheduling.isInputPending():null,D0=en.fromClass(class{constructor(e){this.view=e,this.working=null,this.workScheduled=0,this.chunkEnd=-1,this.chunkBudget=-1,this.work=this.work.bind(this),this.scheduleWork()}update(e){let t=this.view.state.field(Ot.state).context;(t.updateViewport(e.view.viewport)||this.view.viewport.to>t.treeLen)&&this.scheduleWork(),(e.docChanged||e.selectionSet)&&(this.view.hasFocus&&(this.chunkBudget+=50),this.scheduleWork()),this.checkAsyncSchedule(t)}scheduleWork(){if(this.working)return;let{state:e}=this.view,t=e.field(Ot.state);(t.tree!=t.context.tree||!t.context.isDone(e.doc.length))&&(this.working=Uf(this.work))}work(e){this.working=null;let t=Date.now();if(this.chunkEnd<t&&(this.chunkEnd<0||this.view.hasFocus)&&(this.chunkEnd=t+3e4,this.chunkBudget=3e3),this.chunkBudget<=0)return;let{state:i,viewport:{to:r}}=this.view,s=i.field(Ot.state);if(s.tree==s.context.tree&&s.context.isDone(r+1e5))return;let o=Date.now()+Math.min(this.chunkBudget,100,e&&!fo?Math.max(25,e.timeRemaining()-5):1e9),l=s.context.treeLen<r&&i.doc.length>r+1e3,a=s.context.work(()=>fo&&fo()||Date.now()>o,r+(l?0:1e5));this.chunkBudget-=Date.now()-t,(a||this.chunkBudget<=0)&&(s.context.takeTree(),this.view.dispatch({effects:Ot.setState.of(new ki(s.context))})),this.chunkBudget>0&&!(a&&!l)&&this.scheduleWork(),this.checkAsyncSchedule(s.context)}checkAsyncSchedule(e){e.scheduleOn&&(this.workScheduled++,e.scheduleOn.then(()=>this.scheduleWork()).catch(t=>Yt(this.view.state,t)).then(()=>this.workScheduled--),e.scheduleOn=null)}destroy(){this.working&&this.working()}isWorking(){return!!(this.working||this.workScheduled>0)}},{eventHandlers:{focus(){this.scheduleWork()}}}),xi=K.define({combine(n){return n.length?n[0]:null},enables:n=>[Ot.state,D0,G.contentAttributes.compute([n],e=>{let t=e.facet(n);return t&&t.name?{"data-language":t.name}:{}})]}),B0=K.define(),wa=K.define({combine:n=>{if(!n.length)return"  ";let e=n[0];if(!e||/\S/.test(e)||Array.from(e).some(t=>t!=e[0]))throw new Error("Invalid indent unit: "+JSON.stringify(n[0]));return e}});function jn(n){let e=n.facet(wa);return e.charCodeAt(0)==9?n.tabSize*e.length:e.length}function ys(n,e){let t="",i=n.tabSize,r=n.facet(wa)[0];if(r=="	"){for(;e>=i;)t+="	",e-=i;r=" "}for(let s=0;s<e;s++)t+=r;return t}function jf(n,e){n instanceof pe&&(n=new Bs(n));for(let i of n.state.facet(B0)){let r=i(n,e);if(r!==void 0)return r}let t=tn(n.state);return t.length>=e?L0(n,t,e):null}class Bs{constructor(e,t={}){this.state=e,this.options=t,this.unit=jn(e)}lineAt(e,t=1){let i=this.state.doc.lineAt(e),{simulateBreak:r,simulateDoubleBreak:s}=this.options;return r!=null&&r>=i.from&&r<=i.to?s&&r==e?{text:"",from:e}:(t<0?r<e:r<=e)?{text:i.text.slice(r-i.from),from:r}:{text:i.text.slice(0,r-i.from),from:i.from}:i}textAfterPos(e,t=1){if(this.options.simulateDoubleBreak&&e==this.options.simulateBreak)return"";let{text:i,from:r}=this.lineAt(e,t);return i.slice(e-r,Math.min(i.length,e+100-r))}column(e,t=1){let{text:i,from:r}=this.lineAt(e,t),s=this.countColumn(i,e-r),o=this.options.overrideIndentation?this.options.overrideIndentation(r):-1;return o>-1&&(s+=o-this.countColumn(i,i.search(/\S|$/))),s}countColumn(e,t=e.length){return As(e,this.state.tabSize,t)}lineIndent(e,t=1){let{text:i,from:r}=this.lineAt(e,t),s=this.options.overrideIndentation;if(s){let o=s(r);if(o>-1)return o}return this.countColumn(i,i.search(/\S|$/))}get simulatedBreak(){return this.options.simulateBreak||null}}const Kf=new ce;function L0(n,e,t){let i=e.resolveStack(t),r=e.resolveInner(t,-1).resolve(t,0).enterUnfinishedNodesBefore(t);if(r!=i.node){let s=[];for(let o=r;o&&!(o.from<i.node.from||o.to>i.node.to||o.from==i.node.from&&o.type==i.node.type);o=o.parent)s.push(o);for(let o=s.length-1;o>=0;o--)i={node:s[o],next:i}}return Xf(i,n,t)}function Xf(n,e,t){for(let i=n;i;i=i.next){let r=R0(i.node);if(r)return r(ka.create(e,t,i))}return 0}function O0(n){return n.pos==n.options.simulateBreak&&n.options.simulateDoubleBreak}function R0(n){let e=n.type.prop(Kf);if(e)return e;let t=n.firstChild,i;if(t&&(i=t.type.prop(ce.closedBy))){let r=n.lastChild,s=r&&i.indexOf(r.name)>-1;return o=>q0(o,!0,1,void 0,s&&!O0(o)?r.from:void 0)}return n.parent==null?z0:null}function z0(){return 0}class ka extends Bs{constructor(e,t,i){super(e.state,e.options),this.base=e,this.pos=t,this.context=i}get node(){return this.context.node}static create(e,t,i){return new ka(e,t,i)}get textAfter(){return this.textAfterPos(this.pos)}get baseIndent(){return this.baseIndentFor(this.node)}baseIndentFor(e){let t=this.state.doc.lineAt(e.from);for(;;){let i=e.resolve(t.from);for(;i.parent&&i.parent.from==i.from;)i=i.parent;if(F0(i,e))break;t=this.state.doc.lineAt(i.from)}return this.lineIndent(t.from)}continue(){return Xf(this.context.next,this.base,this.pos)}}function F0(n,e){for(let t=e;t;t=t.parent)if(n==t)return!0;return!1}function N0(n){let e=n.node,t=e.childAfter(e.from),i=e.lastChild;if(!t)return null;let r=n.options.simulateBreak,s=n.state.doc.lineAt(t.from),o=r==null||r<=s.from?s.to:Math.min(s.to,r);for(let l=t.to;;){let a=e.childAfter(l);if(!a||a==i)return null;if(!a.type.isSkipped){if(a.from>=o)return null;let u=/^ */.exec(s.text.slice(t.to-s.from))[0].length;return{from:t.from,to:t.to+u}}l=a.to}}function q0(n,e,t,i,r){let s=n.textAfter,o=s.match(/^\s*/)[0].length,l=i&&s.slice(o,o+i.length)==i||r==n.pos+o,a=N0(n);return a?l?n.column(a.from):n.column(a.to):n.baseIndent+(l?0:n.unit*t)}class Ls{constructor(e,t){this.specs=e;let i;function r(l){let a=vn.newName();return(i||(i=Object.create(null)))["."+a]=l,a}const s=typeof t.all=="string"?t.all:t.all?r(t.all):void 0,o=t.scope;this.scope=o instanceof Ot?l=>l.prop(oi)==o.data:o?l=>l==o:void 0,this.style=Vf(e.map(l=>({tag:l.tag,class:l.class||r(Object.assign({},l,{tag:null}))})),{all:s}).style,this.module=i?new vn(i):null,this.themeType=t.themeType}static define(e,t){return new Ls(e,t||{})}}const vl=K.define(),H0=K.define({combine(n){return n.length?[n[0]]:null}});function po(n){let e=n.facet(vl);return e.length?e:n.facet(H0)}function Gf(n,e){let t=[W0],i;return n instanceof Ls&&(n.module&&t.push(G.styleModule.of(n.module)),i=n.themeType),i?t.push(vl.computeN([G.darkTheme],r=>r.facet(G.darkTheme)==(i=="dark")?[n]:[])):t.push(vl.of(n)),t}class $0{constructor(e){this.markCache=Object.create(null),this.tree=tn(e.state),this.decorations=this.buildDeco(e,po(e.state)),this.decoratedTo=e.viewport.to}update(e){let t=tn(e.state),i=po(e.state),r=i!=po(e.startState),{viewport:s}=e.view,o=e.changes.mapPos(this.decoratedTo,1);t.length<s.to&&!r&&t.type==this.tree.type&&o>=s.to?(this.decorations=this.decorations.map(e.changes),this.decoratedTo=o):(t!=this.tree||e.viewportChanged||r)&&(this.tree=t,this.decorations=this.buildDeco(e.view,i),this.decoratedTo=s.to)}buildDeco(e,t){if(!t||!this.tree.length)return Oe.none;let i=new ir;for(let{from:r,to:s}of e.visibleRanges)A0(this.tree,t,(o,l,a)=>{i.add(o,l,this.markCache[a]||(this.markCache[a]=Oe.mark({class:a})))},r,s);return i.finish()}}const W0=Cs.high(en.fromClass($0,{decorations:n=>n.decorations})),V0=1e4,U0="()[]{}",j0=new ce;function Sl(n,e,t){let i=n.prop(e<0?ce.openedBy:ce.closedBy);if(i)return i;if(n.name.length==1){let r=t.indexOf(n.name);if(r>-1&&r%2==(e<0?1:0))return[t[r+e]]}return null}function _l(n){let e=n.type.prop(j0);return e?e(n.node):n}function li(n,e,t,i={}){let r=i.maxScanDistance||V0,s=i.brackets||U0,o=tn(n),l=o.resolveInner(e,t);for(let a=l;a;a=a.parent){let u=Sl(a.type,t,s);if(u&&a.from<a.to){let c=_l(a);if(c&&(t>0?e>=c.from&&e<c.to:e>c.from&&e<=c.to))return K0(n,e,t,a,c,u,s)}}return X0(n,e,t,o,l.type,r,s)}function K0(n,e,t,i,r,s,o){let l=i.parent,a={from:r.from,to:r.to},u=0,c=l==null?void 0:l.cursor();if(c&&(t<0?c.childBefore(i.from):c.childAfter(i.to)))do if(t<0?c.to<=i.from:c.from>=i.to){if(u==0&&s.indexOf(c.type.name)>-1&&c.from<c.to){let h=_l(c);return{start:a,end:h?{from:h.from,to:h.to}:void 0,matched:!0}}else if(Sl(c.type,t,o))u++;else if(Sl(c.type,-t,o)){if(u==0){let h=_l(c);return{start:a,end:h&&h.from<h.to?{from:h.from,to:h.to}:void 0,matched:!1}}u--}}while(t<0?c.prevSibling():c.nextSibling());return{start:a,matched:!1}}function X0(n,e,t,i,r,s,o){let l=t<0?n.sliceDoc(e-1,e):n.sliceDoc(e,e+1),a=o.indexOf(l);if(a<0||a%2==0!=t>0)return null;let u={from:t<0?e-1:e,to:t>0?e+1:e},c=n.doc.iterRange(e,t>0?n.doc.length:0),h=0;for(let f=0;!c.next().done&&f<=s;){let d=c.value;t<0&&(f+=d.length);let p=e+f*t;for(let m=t>0?0:d.length-1,b=t>0?d.length:-1;m!=b;m+=t){let g=o.indexOf(d[m]);if(!(g<0||i.resolveInner(p+m,1).type!=r))if(g%2==0==t>0)h++;else{if(h==1)return{start:u,end:{from:p+m,to:p+m+1},matched:g>>1==a>>1};h--}}t>0&&(f+=d.length)}return c.done?{start:u,matched:!1}:null}function tc(n,e,t,i=0,r=0){e==null&&(e=n.search(/[^\s\u00a0]/),e==-1&&(e=n.length));let s=r;for(let o=i;o<e;o++)n.charCodeAt(o)==9?s+=t-s%t:s++;return s}class Yf{constructor(e,t,i,r){this.string=e,this.tabSize=t,this.indentUnit=i,this.overrideIndent=r,this.pos=0,this.start=0,this.lastColumnPos=0,this.lastColumnValue=0}eol(){return this.pos>=this.string.length}sol(){return this.pos==0}peek(){return this.string.charAt(this.pos)||void 0}next(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)}eat(e){let t=this.string.charAt(this.pos),i;if(typeof e=="string"?i=t==e:i=t&&(e instanceof RegExp?e.test(t):e(t)),i)return++this.pos,t}eatWhile(e){let t=this.pos;for(;this.eat(e););return this.pos>t}eatSpace(){let e=this.pos;for(;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>e}skipToEnd(){this.pos=this.string.length}skipTo(e){let t=this.string.indexOf(e,this.pos);if(t>-1)return this.pos=t,!0}backUp(e){this.pos-=e}column(){return this.lastColumnPos<this.start&&(this.lastColumnValue=tc(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue}indentation(){var e;return(e=this.overrideIndent)!==null&&e!==void 0?e:tc(this.string,null,this.tabSize)}match(e,t,i){if(typeof e=="string"){let r=o=>i?o.toLowerCase():o,s=this.string.substr(this.pos,e.length);return r(s)==r(e)?(t!==!1&&(this.pos+=e.length),!0):null}else{let r=this.string.slice(this.pos).match(e);return r&&r.index>0?null:(r&&t!==!1&&(this.pos+=r[0].length),r)}}current(){return this.string.slice(this.start,this.pos)}}function G0(n){return{name:n.name||"",token:n.token,blankLine:n.blankLine||(()=>{}),startState:n.startState||(()=>!0),copyState:n.copyState||Y0,indent:n.indent||(()=>null),languageData:n.languageData||{},tokenTable:n.tokenTable||Sa,mergeTokens:n.mergeTokens!==!1}}function Y0(n){if(typeof n!="object")return n;let e={};for(let t in n){let i=n[t];e[t]=i instanceof Array?i.slice():i}return e}const nc=new WeakMap;class xa extends Ot{constructor(e){let t=M0(e.languageData),i=G0(e),r,s=new class extends $f{createParse(o,l,a){return new J0(r,o,l,a)}};super(t,s,[],e.name),this.topNode=tb(t,this),r=this,this.streamParser=i,this.stateAfter=new ce({perNode:!0}),this.tokenTable=e.tokenTable?new ed(i.tokenTable):eb}static define(e){return new xa(e)}getIndent(e){let t,{overrideIndentation:i}=e.options;i&&(t=nc.get(e.state),t!=null&&t<e.pos-1e4&&(t=void 0));let r=va(this,e.node.tree,e.node.from,e.node.from,t??e.pos),s,o;if(r?(o=r.state,s=r.pos+1):(o=this.streamParser.startState(e.unit),s=e.node.from),e.pos-s>1e4)return null;for(;s<e.pos;){let a=e.state.doc.lineAt(s),u=Math.min(e.pos,a.to);if(a.length){let c=i?i(a.from):-1,h=new Yf(a.text,e.state.tabSize,e.unit,c<0?void 0:c);for(;h.pos<u-a.from;)Jf(this.streamParser.token,h,o)}else this.streamParser.blankLine(o,e.unit);if(u==e.pos)break;s=a.to+1}let l=e.lineAt(e.pos);return i&&t==null&&nc.set(e.state,l.from),this.streamParser.indent(o,/^\s*(.*)/.exec(l.text)[1],e)}get allowsNesting(){return!1}}function va(n,e,t,i,r){let s=t>=i&&t+e.length<=r&&e.prop(n.stateAfter);if(s)return{state:n.streamParser.copyState(s),pos:t+e.length};for(let o=e.children.length-1;o>=0;o--){let l=e.children[o],a=t+e.positions[o],u=l instanceof Ce&&a<r&&va(n,l,a,i,r);if(u)return u}return null}function Qf(n,e,t,i,r){if(r&&t<=0&&i>=e.length)return e;!r&&t==0&&e.type==n.topNode&&(r=!0);for(let s=e.children.length-1;s>=0;s--){let o=e.positions[s],l=e.children[s],a;if(o<i&&l instanceof Ce){if(!(a=Qf(n,l,t-o,i-o,r)))break;return r?new Ce(e.type,e.children.slice(0,s).concat(a),e.positions.slice(0,s+1),o+a.length):a}}return null}function Q0(n,e,t,i,r){for(let s of e){let o=s.from+(s.openStart?25:0),l=s.to-(s.openEnd?25:0),a=o<=t&&l>t&&va(n,s.tree,0-s.offset,t,l),u;if(a&&a.pos<=i&&(u=Qf(n,s.tree,t+s.offset,a.pos+s.offset,!1)))return{state:a.state,tree:u}}return{state:n.streamParser.startState(r?jn(r):4),tree:Ce.empty}}class J0{constructor(e,t,i,r){this.lang=e,this.input=t,this.fragments=i,this.ranges=r,this.stoppedAt=null,this.chunks=[],this.chunkPos=[],this.chunk=[],this.chunkReused=void 0,this.rangeIndex=0,this.to=r[r.length-1].to;let s=wi.get(),o=r[0].from,{state:l,tree:a}=Q0(e,i,o,this.to,s==null?void 0:s.state);this.state=l,this.parsedPos=this.chunkStart=o+a.length;for(let u=0;u<a.children.length;u++)this.chunks.push(a.children[u]),this.chunkPos.push(a.positions[u]);s&&this.parsedPos<s.viewport.from-1e5&&r.some(u=>u.from<=s.viewport.from&&u.to>=s.viewport.from)&&(this.state=this.lang.streamParser.startState(jn(s.state)),s.skipUntilInView(this.parsedPos,s.viewport.from),this.parsedPos=s.viewport.from),this.moveRangeIndex()}advance(){let e=wi.get(),t=this.stoppedAt==null?this.to:Math.min(this.to,this.stoppedAt),i=Math.min(t,this.chunkStart+512);for(e&&(i=Math.min(i,e.viewport.to));this.parsedPos<i;)this.parseLine(e);return this.chunkStart<this.parsedPos&&this.finishChunk(),this.parsedPos>=t?this.finish():e&&this.parsedPos>=e.viewport.to?(e.skipUntilInView(this.parsedPos,t),this.finish()):null}stopAt(e){this.stoppedAt=e}lineAfter(e){let t=this.input.chunk(e);if(this.input.lineChunks)t==`
`&&(t="");else{let i=t.indexOf(`
`);i>-1&&(t=t.slice(0,i))}return e+t.length<=this.to?t:t.slice(0,this.to-e)}nextLine(){let e=this.parsedPos,t=this.lineAfter(e),i=e+t.length;for(let r=this.rangeIndex;;){let s=this.ranges[r].to;if(s>=i||(t=t.slice(0,s-(i-t.length)),r++,r==this.ranges.length))break;let o=this.ranges[r].from,l=this.lineAfter(o);t+=l,i=o+l.length}return{line:t,end:i}}skipGapsTo(e,t,i){for(;;){let r=this.ranges[this.rangeIndex].to,s=e+t;if(i>0?r>s:r>=s)break;let o=this.ranges[++this.rangeIndex].from;t+=o-r}return t}moveRangeIndex(){for(;this.ranges[this.rangeIndex].to<this.parsedPos;)this.rangeIndex++}emitToken(e,t,i,r){let s=4;if(this.ranges.length>1){r=this.skipGapsTo(t,r,1),t+=r;let l=this.chunk.length;r=this.skipGapsTo(i,r,-1),i+=r,s+=this.chunk.length-l}let o=this.chunk.length-4;return this.lang.streamParser.mergeTokens&&s==4&&o>=0&&this.chunk[o]==e&&this.chunk[o+2]==t?this.chunk[o+2]=i:this.chunk.push(e,t,i,s),r}parseLine(e){let{line:t,end:i}=this.nextLine(),r=0,{streamParser:s}=this.lang,o=new Yf(t,e?e.state.tabSize:4,e?jn(e.state):2);if(o.eol())s.blankLine(this.state,o.indentUnit);else for(;!o.eol();){let l=Jf(s.token,o,this.state);if(l&&(r=this.emitToken(this.lang.tokenTable.resolve(l),this.parsedPos+o.start,this.parsedPos+o.pos,r)),o.start>1e4)break}this.parsedPos=i,this.moveRangeIndex(),this.parsedPos<this.to&&this.parsedPos++}finishChunk(){let e=Ce.build({buffer:this.chunk,start:this.chunkStart,length:this.parsedPos-this.chunkStart,nodeSet:Z0,topID:0,maxBufferLength:512,reused:this.chunkReused});e=new Ce(e.type,e.children,e.positions,e.length,[[this.lang.stateAfter,this.lang.streamParser.copyState(this.state)]]),this.chunks.push(e),this.chunkPos.push(this.chunkStart-this.ranges[0].from),this.chunk=[],this.chunkReused=void 0,this.chunkStart=this.parsedPos}finish(){return new Ce(this.lang.topNode,this.chunks,this.chunkPos,this.parsedPos-this.ranges[0].from).balance()}}function Jf(n,e,t){e.start=e.pos;for(let i=0;i<10;i++){let r=n(e,t);if(e.pos>e.start)return r}throw new Error("Stream parser failed to advance stream.")}const Sa=Object.create(null),hr=[dt.none],Z0=new ma(hr),ic=[],rc=Object.create(null),Zf=Object.create(null);for(let[n,e]of[["variable","variableName"],["variable-2","variableName.special"],["string-2","string.special"],["def","variableName.definition"],["tag","tagName"],["attribute","attributeName"],["type","typeName"],["builtin","variableName.standard"],["qualifier","modifier"],["error","invalid"],["header","heading"],["property","propertyName"]])Zf[n]=td(Sa,e);class ed{constructor(e){this.extra=e,this.table=Object.assign(Object.create(null),Zf)}resolve(e){return e?this.table[e]||(this.table[e]=td(this.extra,e)):0}}const eb=new ed(Sa);function mo(n,e){ic.indexOf(n)>-1||(ic.push(n),console.warn(e))}function td(n,e){let t=[];for(let l of e.split(" ")){let a=[];for(let u of l.split(".")){let c=n[u]||J[u];c?typeof c=="function"?a.length?a=a.map(c):mo(u,`Modifier ${u} used at start of tag`):a.length?mo(u,`Tag ${u} used as modifier`):a=Array.isArray(c)?c:[c]:mo(u,`Unknown highlighting tag ${u}`)}for(let u of a)t.push(u)}if(!t.length)return 0;let i=e.replace(/ /g,"_"),r=i+" "+t.map(l=>l.id),s=rc[r];if(s)return s.id;let o=rc[r]=dt.define({id:hr.length,name:i,props:[_0({[i]:t})]});return hr.push(o),o.id}function tb(n,e){let t=dt.define({id:hr.length,name:"Document",props:[oi.add(()=>n),Kf.add(()=>i=>e.getIndent(i))],top:!0});return hr.push(t),t}_e.RTL,_e.LTR;const nb=n=>{let{state:e}=n,t=e.doc.lineAt(e.selection.main.from),i=Ca(n.state,t.from);return i.line?ib(n):i.block?sb(n):!1};function _a(n,e){return({state:t,dispatch:i})=>{if(t.readOnly)return!1;let r=n(e,t);return r?(i(t.update(r)),!0):!1}}const ib=_a(ab,0),rb=_a(nd,0),sb=_a((n,e)=>nd(n,e,lb(e)),0);function Ca(n,e){let t=n.languageDataAt("commentTokens",e,1);return t.length?t[0]:{}}const Oi=50;function ob(n,{open:e,close:t},i,r){let s=n.sliceDoc(i-Oi,i),o=n.sliceDoc(r,r+Oi),l=/\s*$/.exec(s)[0].length,a=/^\s*/.exec(o)[0].length,u=s.length-l;if(s.slice(u-e.length,u)==e&&o.slice(a,a+t.length)==t)return{open:{pos:i-l,margin:l&&1},close:{pos:r+a,margin:a&&1}};let c,h;r-i<=2*Oi?c=h=n.sliceDoc(i,r):(c=n.sliceDoc(i,i+Oi),h=n.sliceDoc(r-Oi,r));let f=/^\s*/.exec(c)[0].length,d=/\s*$/.exec(h)[0].length,p=h.length-d-t.length;return c.slice(f,f+e.length)==e&&h.slice(p,p+t.length)==t?{open:{pos:i+f+e.length,margin:/\s/.test(c.charAt(f+e.length))?1:0},close:{pos:r-d-t.length,margin:/\s/.test(h.charAt(p-1))?1:0}}:null}function lb(n){let e=[];for(let t of n.selection.ranges){let i=n.doc.lineAt(t.from),r=t.to<=i.to?i:n.doc.lineAt(t.to);r.from>i.from&&r.from==t.to&&(r=t.to==i.to+1?i:n.doc.lineAt(t.to-1));let s=e.length-1;s>=0&&e[s].to>i.from?e[s].to=r.to:e.push({from:i.from+/^\s*/.exec(i.text)[0].length,to:r.to})}return e}function nd(n,e,t=e.selection.ranges){let i=t.map(s=>Ca(e,s.from).block);if(!i.every(s=>s))return null;let r=t.map((s,o)=>ob(e,i[o],s.from,s.to));if(n!=2&&!r.every(s=>s))return{changes:e.changes(t.map((s,o)=>r[o]?[]:[{from:s.from,insert:i[o].open+" "},{from:s.to,insert:" "+i[o].close}]))};if(n!=1&&r.some(s=>s)){let s=[];for(let o=0,l;o<r.length;o++)if(l=r[o]){let a=i[o],{open:u,close:c}=l;s.push({from:u.pos-a.open.length,to:u.pos+u.margin},{from:c.pos-c.margin,to:c.pos+a.close.length})}return{changes:s}}return null}function ab(n,e,t=e.selection.ranges){let i=[],r=-1;e:for(let{from:s,to:o}of t){let l=i.length,a=1e9,u;for(let c=s;c<=o;){let h=e.doc.lineAt(c);if(u==null&&(u=Ca(e,h.from).line,!u))continue e;if(h.from>r&&(s==o||o>h.from)){r=h.from;let f=/^\s*/.exec(h.text)[0].length,d=f==h.length,p=h.text.slice(f,f+u.length)==u?f:-1;f<h.text.length&&f<a&&(a=f),i.push({line:h,comment:p,token:u,indent:f,empty:d,single:!1})}c=h.to+1}if(a<1e9)for(let c=l;c<i.length;c++)i[c].indent<i[c].line.text.length&&(i[c].indent=a);i.length==l+1&&(i[l].single=!0)}if(n!=2&&i.some(s=>s.comment<0&&(!s.empty||s.single))){let s=[];for(let{line:l,token:a,indent:u,empty:c,single:h}of i)(h||!c)&&s.push({from:l.from+u,insert:a+" "});let o=e.changes(s);return{changes:o,selection:e.selection.map(o,1)}}else if(n!=1&&i.some(s=>s.comment>=0)){let s=[];for(let{line:o,comment:l,token:a}of i)if(l>=0){let u=o.from+l,c=u+a.length;o.text[c-o.from]==" "&&c++,s.push({from:u,to:c})}return{changes:s}}return null}const Cl=Mn.define(),ub=Mn.define(),cb=K.define(),id=K.define({combine(n){return na(n,{minDepth:100,newGroupDelay:500,joinToEvent:(e,t)=>t},{minDepth:Math.max,newGroupDelay:Math.min,joinToEvent:(e,t)=>(i,r)=>e(i,r)||t(i,r)})}}),rd=En.define({create(){return Qt.empty},update(n,e){let t=e.state.facet(id),i=e.annotation(Cl);if(i){let a=ct.fromTransaction(e,i.selection),u=i.side,c=u==0?n.undone:n.done;return a?c=ws(c,c.length,t.minDepth,a):c=ld(c,e.startState.selection),new Qt(u==0?i.rest:c,u==0?c:i.rest)}let r=e.annotation(ub);if((r=="full"||r=="before")&&(n=n.isolate()),e.annotation(Ne.addToHistory)===!1)return e.changes.empty?n:n.addMapping(e.changes.desc);let s=ct.fromTransaction(e),o=e.annotation(Ne.time),l=e.annotation(Ne.userEvent);return s?n=n.addChanges(s,o,l,t,e):e.selection&&(n=n.addSelection(e.startState.selection,o,l,t.newGroupDelay)),(r=="full"||r=="after")&&(n=n.isolate()),n},toJSON(n){return{done:n.done.map(e=>e.toJSON()),undone:n.undone.map(e=>e.toJSON())}},fromJSON(n){return new Qt(n.done.map(ct.fromJSON),n.undone.map(ct.fromJSON))}});function hb(n={}){return[rd,id.of(n),G.domEventHandlers({beforeinput(e,t){let i=e.inputType=="historyUndo"?sd:e.inputType=="historyRedo"?Al:null;return i?(e.preventDefault(),i(t)):!1}})]}function Os(n,e){return function({state:t,dispatch:i}){if(!e&&t.readOnly)return!1;let r=t.field(rd,!1);if(!r)return!1;let s=r.pop(n,t,e);return s?(i(s),!0):!1}}const sd=Os(0,!1),Al=Os(1,!1),fb=Os(0,!0),db=Os(1,!0);class ct{constructor(e,t,i,r,s){this.changes=e,this.effects=t,this.mapped=i,this.startSelection=r,this.selectionsAfter=s}setSelAfter(e){return new ct(this.changes,this.effects,this.mapped,this.startSelection,e)}toJSON(){var e,t,i;return{changes:(e=this.changes)===null||e===void 0?void 0:e.toJSON(),mapped:(t=this.mapped)===null||t===void 0?void 0:t.toJSON(),startSelection:(i=this.startSelection)===null||i===void 0?void 0:i.toJSON(),selectionsAfter:this.selectionsAfter.map(r=>r.toJSON())}}static fromJSON(e){return new ct(e.changes&&Fe.fromJSON(e.changes),[],e.mapped&&Jt.fromJSON(e.mapped),e.startSelection&&O.fromJSON(e.startSelection),e.selectionsAfter.map(O.fromJSON))}static fromTransaction(e,t){let i=Et;for(let r of e.startState.facet(cb)){let s=r(e);s.length&&(i=i.concat(s))}return!i.length&&e.changes.empty?null:new ct(e.changes.invert(e.startState.doc),i,void 0,t||e.startState.selection,Et)}static selection(e){return new ct(void 0,Et,void 0,void 0,e)}}function ws(n,e,t,i){let r=e+1>t+20?e-t-1:0,s=n.slice(r,e);return s.push(i),s}function pb(n,e){let t=[],i=!1;return n.iterChangedRanges((r,s)=>t.push(r,s)),e.iterChangedRanges((r,s,o,l)=>{for(let a=0;a<t.length;){let u=t[a++],c=t[a++];l>=u&&o<=c&&(i=!0)}}),i}function mb(n,e){return n.ranges.length==e.ranges.length&&n.ranges.filter((t,i)=>t.empty!=e.ranges[i].empty).length===0}function od(n,e){return n.length?e.length?n.concat(e):n:e}const Et=[],gb=200;function ld(n,e){if(n.length){let t=n[n.length-1],i=t.selectionsAfter.slice(Math.max(0,t.selectionsAfter.length-gb));return i.length&&i[i.length-1].eq(e)?n:(i.push(e),ws(n,n.length-1,1e9,t.setSelAfter(i)))}else return[ct.selection([e])]}function bb(n){let e=n[n.length-1],t=n.slice();return t[n.length-1]=e.setSelAfter(e.selectionsAfter.slice(0,e.selectionsAfter.length-1)),t}function go(n,e){if(!n.length)return n;let t=n.length,i=Et;for(;t;){let r=yb(n[t-1],e,i);if(r.changes&&!r.changes.empty||r.effects.length){let s=n.slice(0,t);return s[t-1]=r,s}else e=r.mapped,t--,i=r.selectionsAfter}return i.length?[ct.selection(i)]:Et}function yb(n,e,t){let i=od(n.selectionsAfter.length?n.selectionsAfter.map(l=>l.map(e)):Et,t);if(!n.changes)return ct.selection(i);let r=n.changes.map(e),s=e.mapDesc(n.changes,!0),o=n.mapped?n.mapped.composeDesc(s):s;return new ct(r,Be.mapEffects(n.effects,e),o,n.startSelection.map(s),i)}const wb=/^(input\.type|delete)($|\.)/;class Qt{constructor(e,t,i=0,r=void 0){this.done=e,this.undone=t,this.prevTime=i,this.prevUserEvent=r}isolate(){return this.prevTime?new Qt(this.done,this.undone):this}addChanges(e,t,i,r,s){let o=this.done,l=o[o.length-1];return l&&l.changes&&!l.changes.empty&&e.changes&&(!i||wb.test(i))&&(!l.selectionsAfter.length&&t-this.prevTime<r.newGroupDelay&&r.joinToEvent(s,pb(l.changes,e.changes))||i=="input.type.compose")?o=ws(o,o.length-1,r.minDepth,new ct(e.changes.compose(l.changes),od(Be.mapEffects(e.effects,l.changes),l.effects),l.mapped,l.startSelection,Et)):o=ws(o,o.length,r.minDepth,e),new Qt(o,Et,t,i)}addSelection(e,t,i,r){let s=this.done.length?this.done[this.done.length-1].selectionsAfter:Et;return s.length>0&&t-this.prevTime<r&&i==this.prevUserEvent&&i&&/^select($|\.)/.test(i)&&mb(s[s.length-1],e)?this:new Qt(ld(this.done,e),this.undone,t,i)}addMapping(e){return new Qt(go(this.done,e),go(this.undone,e),this.prevTime,this.prevUserEvent)}pop(e,t,i){let r=e==0?this.done:this.undone;if(r.length==0)return null;let s=r[r.length-1],o=s.selectionsAfter[0]||(s.startSelection?s.startSelection.map(s.changes.invertedDesc,1):t.selection);if(i&&s.selectionsAfter.length)return t.update({selection:s.selectionsAfter[s.selectionsAfter.length-1],annotations:Cl.of({side:e,rest:bb(r),selection:o}),userEvent:e==0?"select.undo":"select.redo",scrollIntoView:!0});if(s.changes){let l=r.length==1?Et:r.slice(0,r.length-1);return s.mapped&&(l=go(l,s.mapped)),t.update({changes:s.changes,selection:s.startSelection,effects:s.effects,annotations:Cl.of({side:e,rest:l,selection:o}),filter:!1,userEvent:e==0?"undo":"redo",scrollIntoView:!0})}else return null}}Qt.empty=new Qt(Et,Et);const kb=[{key:"Mod-z",run:sd,preventDefault:!0},{key:"Mod-y",mac:"Mod-Shift-z",run:Al,preventDefault:!0},{linux:"Ctrl-Shift-z",run:Al,preventDefault:!0},{key:"Mod-u",run:fb,preventDefault:!0},{key:"Alt-u",mac:"Mod-Shift-u",run:db,preventDefault:!0}];function Ai(n,e){return O.create(n.ranges.map(e),n.mainIndex)}function Ft(n,e){return n.update({selection:e,scrollIntoView:!0,userEvent:"select"})}function Nt({state:n,dispatch:e},t){let i=Ai(n.selection,t);return i.eq(n.selection,!0)?!1:(e(Ft(n,i)),!0)}function Rs(n,e){return O.cursor(e?n.to:n.from)}function ad(n,e){return Nt(n,t=>t.empty?n.moveByChar(t,e):Rs(t,e))}function Ye(n){return n.textDirectionAt(n.state.selection.main.head)==_e.LTR}const ud=n=>ad(n,!Ye(n)),cd=n=>ad(n,Ye(n));function hd(n,e){return Nt(n,t=>t.empty?n.moveByGroup(t,e):Rs(t,e))}const xb=n=>hd(n,!Ye(n)),vb=n=>hd(n,Ye(n));function Sb(n,e,t){if(e.type.prop(t))return!0;let i=e.to-e.from;return i&&(i>2||/[^\s,.;:]/.test(n.sliceDoc(e.from,e.to)))||e.firstChild}function zs(n,e,t){let i=tn(n).resolveInner(e.head),r=t?ce.closedBy:ce.openedBy;for(let a=e.head;;){let u=t?i.childAfter(a):i.childBefore(a);if(!u)break;Sb(n,u,r)?i=u:a=t?u.to:u.from}let s=i.type.prop(r),o,l;return s&&(o=t?li(n,i.from,1):li(n,i.to,-1))&&o.matched?l=t?o.end.to:o.end.from:l=t?i.to:i.from,O.cursor(l,t?-1:1)}const _b=n=>Nt(n,e=>zs(n.state,e,!Ye(n))),Cb=n=>Nt(n,e=>zs(n.state,e,Ye(n)));function fd(n,e){return Nt(n,t=>{if(!t.empty)return Rs(t,e);let i=n.moveVertically(t,e);return i.head!=t.head?i:n.moveToLineBoundary(t,e)})}const dd=n=>fd(n,!1),pd=n=>fd(n,!0);function md(n){let e=n.scrollDOM.clientHeight<n.scrollDOM.scrollHeight-2,t=0,i=0,r;if(e){for(let s of n.state.facet(G.scrollMargins)){let o=s(n);o!=null&&o.top&&(t=Math.max(o==null?void 0:o.top,t)),o!=null&&o.bottom&&(i=Math.max(o==null?void 0:o.bottom,i))}r=n.scrollDOM.clientHeight-t-i}else r=(n.dom.ownerDocument.defaultView||window).innerHeight;return{marginTop:t,marginBottom:i,selfScroll:e,height:Math.max(n.defaultLineHeight,r-5)}}function gd(n,e){let t=md(n),{state:i}=n,r=Ai(i.selection,o=>o.empty?n.moveVertically(o,e,t.height):Rs(o,e));if(r.eq(i.selection))return!1;let s;if(t.selfScroll){let o=n.coordsAtPos(i.selection.main.head),l=n.scrollDOM.getBoundingClientRect(),a=l.top+t.marginTop,u=l.bottom-t.marginBottom;o&&o.top>a&&o.bottom<u&&(s=G.scrollIntoView(r.main.head,{y:"start",yMargin:o.top-a}))}return n.dispatch(Ft(i,r),{effects:s}),!0}const sc=n=>gd(n,!1),Tl=n=>gd(n,!0);function Pn(n,e,t){let i=n.lineBlockAt(e.head),r=n.moveToLineBoundary(e,t);if(r.head==e.head&&r.head!=(t?i.to:i.from)&&(r=n.moveToLineBoundary(e,t,!1)),!t&&r.head==i.from&&i.length){let s=/^\s*/.exec(n.state.sliceDoc(i.from,Math.min(i.from+100,i.to)))[0].length;s&&e.head!=i.from+s&&(r=O.cursor(i.from+s))}return r}const Ab=n=>Nt(n,e=>Pn(n,e,!0)),Tb=n=>Nt(n,e=>Pn(n,e,!1)),Eb=n=>Nt(n,e=>Pn(n,e,!Ye(n))),Mb=n=>Nt(n,e=>Pn(n,e,Ye(n))),Pb=n=>Nt(n,e=>O.cursor(n.lineBlockAt(e.head).from,1)),Ib=n=>Nt(n,e=>O.cursor(n.lineBlockAt(e.head).to,-1));function Db(n,e,t){let i=!1,r=Ai(n.selection,s=>{let o=li(n,s.head,-1)||li(n,s.head,1)||s.head>0&&li(n,s.head-1,1)||s.head<n.doc.length&&li(n,s.head+1,-1);if(!o||!o.end)return s;i=!0;let l=o.start.from==s.head?o.end.to:o.end.from;return O.cursor(l)});return i?(e(Ft(n,r)),!0):!1}const Bb=({state:n,dispatch:e})=>Db(n,e);function Pt(n,e){let t=Ai(n.state.selection,i=>{let r=e(i);return O.range(i.anchor,r.head,r.goalColumn,r.bidiLevel||void 0,r.assoc)});return t.eq(n.state.selection)?!1:(n.dispatch(Ft(n.state,t)),!0)}function bd(n,e){return Pt(n,t=>n.moveByChar(t,e))}const yd=n=>bd(n,!Ye(n)),wd=n=>bd(n,Ye(n));function kd(n,e){return Pt(n,t=>n.moveByGroup(t,e))}const Lb=n=>kd(n,!Ye(n)),Ob=n=>kd(n,Ye(n)),Rb=n=>Pt(n,e=>zs(n.state,e,!Ye(n))),zb=n=>Pt(n,e=>zs(n.state,e,Ye(n)));function xd(n,e){return Pt(n,t=>n.moveVertically(t,e))}const vd=n=>xd(n,!1),Sd=n=>xd(n,!0);function _d(n,e){return Pt(n,t=>n.moveVertically(t,e,md(n).height))}const oc=n=>_d(n,!1),lc=n=>_d(n,!0),Fb=n=>Pt(n,e=>Pn(n,e,!0)),Nb=n=>Pt(n,e=>Pn(n,e,!1)),qb=n=>Pt(n,e=>Pn(n,e,!Ye(n))),Hb=n=>Pt(n,e=>Pn(n,e,Ye(n))),$b=n=>Pt(n,e=>O.cursor(n.lineBlockAt(e.head).from)),Wb=n=>Pt(n,e=>O.cursor(n.lineBlockAt(e.head).to)),ac=({state:n,dispatch:e})=>(e(Ft(n,{anchor:0})),!0),uc=({state:n,dispatch:e})=>(e(Ft(n,{anchor:n.doc.length})),!0),cc=({state:n,dispatch:e})=>(e(Ft(n,{anchor:n.selection.main.anchor,head:0})),!0),hc=({state:n,dispatch:e})=>(e(Ft(n,{anchor:n.selection.main.anchor,head:n.doc.length})),!0),Vb=({state:n,dispatch:e})=>(e(n.update({selection:{anchor:0,head:n.doc.length},userEvent:"select"})),!0),Ub=({state:n,dispatch:e})=>{let t=Fs(n).map(({from:i,to:r})=>O.range(i,Math.min(r+1,n.doc.length)));return e(n.update({selection:O.create(t),userEvent:"select"})),!0},jb=({state:n,dispatch:e})=>{let t=Ai(n.selection,i=>{let r=tn(n),s=r.resolveStack(i.from,1);if(i.empty){let o=r.resolveStack(i.from,-1);o.node.from>=s.node.from&&o.node.to<=s.node.to&&(s=o)}for(let o=s;o;o=o.next){let{node:l}=o;if((l.from<i.from&&l.to>=i.to||l.to>i.to&&l.from<=i.from)&&o.next)return O.range(l.to,l.from)}return i});return t.eq(n.selection)?!1:(e(Ft(n,t)),!0)};function Cd(n,e){let{state:t}=n,i=t.selection,r=t.selection.ranges.slice();for(let s of t.selection.ranges){let o=t.doc.lineAt(s.head);if(e?o.to<n.state.doc.length:o.from>0)for(let l=s;;){let a=n.moveVertically(l,e);if(a.head<o.from||a.head>o.to){r.some(u=>u.head==a.head)||r.push(a);break}else{if(a.head==l.head)break;l=a}}}return r.length==i.ranges.length?!1:(n.dispatch(Ft(t,O.create(r,r.length-1))),!0)}const Kb=n=>Cd(n,!1),Xb=n=>Cd(n,!0),Gb=({state:n,dispatch:e})=>{let t=n.selection,i=null;return t.ranges.length>1?i=O.create([t.main]):t.main.empty||(i=O.create([O.cursor(t.main.head)])),i?(e(Ft(n,i)),!0):!1};function wr(n,e){if(n.state.readOnly)return!1;let t="delete.selection",{state:i}=n,r=i.changeByRange(s=>{let{from:o,to:l}=s;if(o==l){let a=e(s);a<o?(t="delete.backward",a=Fr(n,a,!1)):a>o&&(t="delete.forward",a=Fr(n,a,!0)),o=Math.min(o,a),l=Math.max(l,a)}else o=Fr(n,o,!1),l=Fr(n,l,!0);return o==l?{range:s}:{changes:{from:o,to:l},range:O.cursor(o,o<s.head?-1:1)}});return r.changes.empty?!1:(n.dispatch(i.update(r,{scrollIntoView:!0,userEvent:t,effects:t=="delete.selection"?G.announce.of(i.phrase("Selection deleted")):void 0})),!0)}function Fr(n,e,t){if(n instanceof G)for(let i of n.state.facet(G.atomicRanges).map(r=>r(n)))i.between(e,e,(r,s)=>{r<e&&s>e&&(e=t?s:r)});return e}const Ad=(n,e,t)=>wr(n,i=>{let r=i.from,{state:s}=n,o=s.doc.lineAt(r),l,a;if(t&&!e&&r>o.from&&r<o.from+200&&!/[^ \t]/.test(l=o.text.slice(0,r-o.from))){if(l[l.length-1]=="	")return r-1;let u=As(l,s.tabSize),c=u%jn(s)||jn(s);for(let h=0;h<c&&l[l.length-1-h]==" ";h++)r--;a=r}else a=Xe(o.text,r-o.from,e,e)+o.from,a==r&&o.number!=(e?s.doc.lines:1)?a+=e?1:-1:!e&&/[\ufe00-\ufe0f]/.test(o.text.slice(a-o.from,r-o.from))&&(a=Xe(o.text,a-o.from,!1,!1)+o.from);return a}),El=n=>Ad(n,!1,!0),Td=n=>Ad(n,!0,!1),Ed=(n,e)=>wr(n,t=>{let i=t.head,{state:r}=n,s=r.doc.lineAt(i),o=r.charCategorizer(i);for(let l=null;;){if(i==(e?s.to:s.from)){i==t.head&&s.number!=(e?r.doc.lines:1)&&(i+=e?1:-1);break}let a=Xe(s.text,i-s.from,e)+s.from,u=s.text.slice(Math.min(i,a)-s.from,Math.max(i,a)-s.from),c=o(u);if(l!=null&&c!=l)break;(u!=" "||i!=t.head)&&(l=c),i=a}return i}),Md=n=>Ed(n,!1),Yb=n=>Ed(n,!0),Qb=n=>wr(n,e=>{let t=n.lineBlockAt(e.head).to;return e.head<t?t:Math.min(n.state.doc.length,e.head+1)}),Jb=n=>wr(n,e=>{let t=n.moveToLineBoundary(e,!1).head;return e.head>t?t:Math.max(0,e.head-1)}),Zb=n=>wr(n,e=>{let t=n.moveToLineBoundary(e,!0).head;return e.head<t?t:Math.min(n.state.doc.length,e.head+1)}),e2=({state:n,dispatch:e})=>{if(n.readOnly)return!1;let t=n.changeByRange(i=>({changes:{from:i.from,to:i.to,insert:de.of(["",""])},range:O.cursor(i.from)}));return e(n.update(t,{scrollIntoView:!0,userEvent:"input"})),!0},t2=({state:n,dispatch:e})=>{if(n.readOnly)return!1;let t=n.changeByRange(i=>{if(!i.empty||i.from==0||i.from==n.doc.length)return{range:i};let r=i.from,s=n.doc.lineAt(r),o=r==s.from?r-1:Xe(s.text,r-s.from,!1)+s.from,l=r==s.to?r+1:Xe(s.text,r-s.from,!0)+s.from;return{changes:{from:o,to:l,insert:n.doc.slice(r,l).append(n.doc.slice(o,r))},range:O.cursor(l)}});return t.changes.empty?!1:(e(n.update(t,{scrollIntoView:!0,userEvent:"move.character"})),!0)};function Fs(n){let e=[],t=-1;for(let i of n.selection.ranges){let r=n.doc.lineAt(i.from),s=n.doc.lineAt(i.to);if(!i.empty&&i.to==s.from&&(s=n.doc.lineAt(i.to-1)),t>=r.number){let o=e[e.length-1];o.to=s.to,o.ranges.push(i)}else e.push({from:r.from,to:s.to,ranges:[i]});t=s.number+1}return e}function Pd(n,e,t){if(n.readOnly)return!1;let i=[],r=[];for(let s of Fs(n)){if(t?s.to==n.doc.length:s.from==0)continue;let o=n.doc.lineAt(t?s.to+1:s.from-1),l=o.length+1;if(t){i.push({from:s.to,to:o.to},{from:s.from,insert:o.text+n.lineBreak});for(let a of s.ranges)r.push(O.range(Math.min(n.doc.length,a.anchor+l),Math.min(n.doc.length,a.head+l)))}else{i.push({from:o.from,to:s.from},{from:s.to,insert:n.lineBreak+o.text});for(let a of s.ranges)r.push(O.range(a.anchor-l,a.head-l))}}return i.length?(e(n.update({changes:i,scrollIntoView:!0,selection:O.create(r,n.selection.mainIndex),userEvent:"move.line"})),!0):!1}const n2=({state:n,dispatch:e})=>Pd(n,e,!1),i2=({state:n,dispatch:e})=>Pd(n,e,!0);function Id(n,e,t){if(n.readOnly)return!1;let i=[];for(let s of Fs(n))t?i.push({from:s.from,insert:n.doc.slice(s.from,s.to)+n.lineBreak}):i.push({from:s.to,insert:n.lineBreak+n.doc.slice(s.from,s.to)});let r=n.changes(i);return e(n.update({changes:r,selection:n.selection.map(r,t?1:-1),scrollIntoView:!0,userEvent:"input.copyline"})),!0}const r2=({state:n,dispatch:e})=>Id(n,e,!1),s2=({state:n,dispatch:e})=>Id(n,e,!0),o2=n=>{if(n.state.readOnly)return!1;let{state:e}=n,t=e.changes(Fs(e).map(({from:r,to:s})=>(r>0?r--:s<e.doc.length&&s++,{from:r,to:s}))),i=Ai(e.selection,r=>{let s;if(n.lineWrapping){let o=n.lineBlockAt(r.head),l=n.coordsAtPos(r.head,r.assoc||1);l&&(s=o.bottom+n.documentTop-l.bottom+n.defaultLineHeight/2)}return n.moveVertically(r,!0,s)}).map(t);return n.dispatch({changes:t,selection:i,scrollIntoView:!0,userEvent:"delete.line"}),!0};function l2(n,e){if(/\(\)|\[\]|\{\}/.test(n.sliceDoc(e-1,e+1)))return{from:e,to:e};let t=tn(n).resolveInner(e),i=t.childBefore(e),r=t.childAfter(e),s;return i&&r&&i.to<=e&&r.from>=e&&(s=i.type.prop(ce.closedBy))&&s.indexOf(r.name)>-1&&n.doc.lineAt(i.to).from==n.doc.lineAt(r.from).from&&!/\S/.test(n.sliceDoc(i.to,r.from))?{from:i.to,to:r.from}:null}const fc=Dd(!1),a2=Dd(!0);function Dd(n){return({state:e,dispatch:t})=>{if(e.readOnly)return!1;let i=e.changeByRange(r=>{let{from:s,to:o}=r,l=e.doc.lineAt(s),a=!n&&s==o&&l2(e,s);n&&(s=o=(o<=l.to?l:e.doc.lineAt(o)).to);let u=new Bs(e,{simulateBreak:s,simulateDoubleBreak:!!a}),c=jf(u,s);for(c==null&&(c=As(/^\s*/.exec(e.doc.lineAt(s).text)[0],e.tabSize));o<l.to&&/\s/.test(l.text[o-l.from]);)o++;a?{from:s,to:o}=a:s>l.from&&s<l.from+100&&!/\S/.test(l.text.slice(0,s))&&(s=l.from);let h=["",ys(e,c)];return a&&h.push(ys(e,u.lineIndent(l.from,-1))),{changes:{from:s,to:o,insert:de.of(h)},range:O.cursor(s+1+h[1].length)}});return t(e.update(i,{scrollIntoView:!0,userEvent:"input"})),!0}}function Aa(n,e){let t=-1;return n.changeByRange(i=>{let r=[];for(let o=i.from;o<=i.to;){let l=n.doc.lineAt(o);l.number>t&&(i.empty||i.to>l.from)&&(e(l,r,i),t=l.number),o=l.to+1}let s=n.changes(r);return{changes:r,range:O.range(s.mapPos(i.anchor,1),s.mapPos(i.head,1))}})}const u2=({state:n,dispatch:e})=>{if(n.readOnly)return!1;let t=Object.create(null),i=new Bs(n,{overrideIndentation:s=>{let o=t[s];return o??-1}}),r=Aa(n,(s,o,l)=>{let a=jf(i,s.from);if(a==null)return;/\S/.test(s.text)||(a=0);let u=/^\s*/.exec(s.text)[0],c=ys(n,a);(u!=c||l.from<s.from+u.length)&&(t[s.from]=a,o.push({from:s.from,to:s.from+u.length,insert:c}))});return r.changes.empty||e(n.update(r,{userEvent:"indent"})),!0},Bd=({state:n,dispatch:e})=>n.readOnly?!1:(e(n.update(Aa(n,(t,i)=>{i.push({from:t.from,insert:n.facet(wa)})}),{userEvent:"input.indent"})),!0),Ld=({state:n,dispatch:e})=>n.readOnly?!1:(e(n.update(Aa(n,(t,i)=>{let r=/^\s*/.exec(t.text)[0];if(!r)return;let s=As(r,n.tabSize),o=0,l=ys(n,Math.max(0,s-jn(n)));for(;o<r.length&&o<l.length&&r.charCodeAt(o)==l.charCodeAt(o);)o++;i.push({from:t.from+o,to:t.from+r.length,insert:l.slice(o)})}),{userEvent:"delete.dedent"})),!0),c2=n=>(n.setTabFocusMode(),!0),h2=[{key:"Ctrl-b",run:ud,shift:yd,preventDefault:!0},{key:"Ctrl-f",run:cd,shift:wd},{key:"Ctrl-p",run:dd,shift:vd},{key:"Ctrl-n",run:pd,shift:Sd},{key:"Ctrl-a",run:Pb,shift:$b},{key:"Ctrl-e",run:Ib,shift:Wb},{key:"Ctrl-d",run:Td},{key:"Ctrl-h",run:El},{key:"Ctrl-k",run:Qb},{key:"Ctrl-Alt-h",run:Md},{key:"Ctrl-o",run:e2},{key:"Ctrl-t",run:t2},{key:"Ctrl-v",run:Tl}],f2=[{key:"ArrowLeft",run:ud,shift:yd,preventDefault:!0},{key:"Mod-ArrowLeft",mac:"Alt-ArrowLeft",run:xb,shift:Lb,preventDefault:!0},{mac:"Cmd-ArrowLeft",run:Eb,shift:qb,preventDefault:!0},{key:"ArrowRight",run:cd,shift:wd,preventDefault:!0},{key:"Mod-ArrowRight",mac:"Alt-ArrowRight",run:vb,shift:Ob,preventDefault:!0},{mac:"Cmd-ArrowRight",run:Mb,shift:Hb,preventDefault:!0},{key:"ArrowUp",run:dd,shift:vd,preventDefault:!0},{mac:"Cmd-ArrowUp",run:ac,shift:cc},{mac:"Ctrl-ArrowUp",run:sc,shift:oc},{key:"ArrowDown",run:pd,shift:Sd,preventDefault:!0},{mac:"Cmd-ArrowDown",run:uc,shift:hc},{mac:"Ctrl-ArrowDown",run:Tl,shift:lc},{key:"PageUp",run:sc,shift:oc},{key:"PageDown",run:Tl,shift:lc},{key:"Home",run:Tb,shift:Nb,preventDefault:!0},{key:"Mod-Home",run:ac,shift:cc},{key:"End",run:Ab,shift:Fb,preventDefault:!0},{key:"Mod-End",run:uc,shift:hc},{key:"Enter",run:fc,shift:fc},{key:"Mod-a",run:Vb},{key:"Backspace",run:El,shift:El,preventDefault:!0},{key:"Delete",run:Td,preventDefault:!0},{key:"Mod-Backspace",mac:"Alt-Backspace",run:Md,preventDefault:!0},{key:"Mod-Delete",mac:"Alt-Delete",run:Yb,preventDefault:!0},{mac:"Mod-Backspace",run:Jb,preventDefault:!0},{mac:"Mod-Delete",run:Zb,preventDefault:!0}].concat(h2.map(n=>({mac:n.key,run:n.run,shift:n.shift}))),d2=[{key:"Alt-ArrowLeft",mac:"Ctrl-ArrowLeft",run:_b,shift:Rb},{key:"Alt-ArrowRight",mac:"Ctrl-ArrowRight",run:Cb,shift:zb},{key:"Alt-ArrowUp",run:n2},{key:"Shift-Alt-ArrowUp",run:r2},{key:"Alt-ArrowDown",run:i2},{key:"Shift-Alt-ArrowDown",run:s2},{key:"Mod-Alt-ArrowUp",run:Kb},{key:"Mod-Alt-ArrowDown",run:Xb},{key:"Escape",run:Gb},{key:"Mod-Enter",run:a2},{key:"Alt-l",mac:"Ctrl-l",run:Ub},{key:"Mod-i",run:jb,preventDefault:!0},{key:"Mod-[",run:Ld},{key:"Mod-]",run:Bd},{key:"Mod-Alt-\\",run:u2},{key:"Shift-Mod-k",run:o2},{key:"Shift-Mod-\\",run:Bb},{key:"Mod-/",run:nb},{key:"Alt-A",run:rb},{key:"Ctrl-m",mac:"Shift-Alt-m",run:c2}].concat(f2),p2={key:"Tab",run:Bd,shift:Ld},Od="ffm-run-feedback-enabled",ht={enabled:!0};function m2(){try{const n=localStorage.getItem(Od);n==="0"?ht.enabled=!1:n==="1"&&(ht.enabled=!0)}catch{}}function g2(){try{localStorage.setItem(Od,ht.enabled?"1":"0")}catch{}}function b2(){return ht.enabled=!ht.enabled,g2(),ht.enabled}function dc(n){const e=ht.enabled;n.setAttribute("aria-pressed",e?"true":"false"),n.setAttribute("aria-label",e?"Run sound and animations on":"Run sound and animations off"),n.classList.toggle("run-feedback-toggle--off",!e),n.title=e?"Turn off run sound and animations":"Turn on run sound and animations"}let pc=null;function y2(){return pc??(pc=new AudioContext),pc}const mc=[329.6275569128699,391.99543598174927,493.8833013781249],w2=10,k2=420,x2=3;let ns=null,is=null,Ml=!1;function Pl(){ns!==null&&(clearInterval(ns),ns=null),is=null}function Ta(n){if(Pl(),!ht.enabled||(Ml=!0,window.matchMedia("(prefers-reduced-motion: reduce)").matches))return;is=n;const e=()=>{if(!ht.enabled){Pl();return}is&&C2(is,x2)};e(),ns=setInterval(e,k2)}function Ea(){const n=Ml;Ml=!1,Pl(),n&&Rd()}function Rd(){if(ht.enabled)try{const n=y2();n.resume().then(()=>{const e=n.currentTime,t=.42,i=.09;for(let r=0;r<mc.length;r++){const s=mc[r],o=n.createOscillator(),l=n.createGain();o.type="triangle",o.frequency.setValueAtTime(s,e),l.gain.setValueAtTime(0,e),l.gain.linearRampToValueAtTime(i,e+.018+r*.012),l.gain.exponentialRampToValueAtTime(8e-4,e+t),o.connect(l),l.connect(n.destination),o.start(e),o.stop(e+t+.06)}})}catch{}}function zd(n){return!(n.isComposing||n.metaKey||n.ctrlKey||n.altKey||n.key==="Tab"||n.key==="Escape"||n.key==="ArrowUp"||n.key==="ArrowDown"||n.repeat)}function v2(n,e){if(!ht.enabled||n.disabled||!zd(e))return;const{x:t,y:i}=_2(n);Ma(t,i,{centerOnPoint:!0}),e.key==="Enter"&&Rd()}function S2(n,e){if(!ht.enabled||!zd(e))return;const t=n.state.selection.main.head,i=n.coordsAtPos(t);if(!i)return;const r=i.left,s=(i.top+i.bottom)/2;Ma(r,s,{centerOnPoint:!0})}function _2(n){const e=n.getBoundingClientRect(),t=window.getComputedStyle(n),i=parseFloat(t.borderLeftWidth)||0,r=parseFloat(t.paddingLeft)||0,s=n.selectionStart??0,o=document.createElement("span");o.setAttribute("aria-hidden","true"),o.style.visibility="hidden",o.style.position="absolute",o.style.whiteSpace="pre",o.style.top="0",o.style.left="0",o.style.font=t.font,o.style.fontSize=t.fontSize,o.style.fontFamily=t.fontFamily,o.style.fontWeight=t.fontWeight,o.style.letterSpacing=t.letterSpacing,o.style.fontVariant=t.fontVariant,o.style.textTransform=t.textTransform,o.textContent=n.value.slice(0,s),document.body.appendChild(o);const l=o.offsetWidth;o.remove();const a=e.left+i+r+l-n.scrollLeft,u=e.top+e.height/2;return{x:a,y:u}}function Ma(n,e,t){if(!ht.enabled||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const i=document.createElement("span");i.className="run-flat-anchor",i.style.left=`${n}px`,i.style.top=`${e}px`,t!=null&&t.centerOnPoint&&(i.style.transform="translate(-50%, -50%)");const r=document.createElement("span");r.className="run-flat-particle",r.setAttribute("aria-hidden","true"),r.textContent="♭",t!=null&&t.animationDelay&&(r.style.animationDelay=t.animationDelay);const s=(Math.random()-.5)*2.25,o=-6+Math.random()*12,l=o+8+Math.random()*10;r.style.setProperty("--drift-x",`${s}rem`),r.style.setProperty("--rot-0",`${o}deg`),r.style.setProperty("--rot-1",`${l}deg`),i.appendChild(r),document.body.appendChild(i),r.addEventListener("animationend",()=>{i.remove()},{once:!0})}function C2(n,e=w2){if(!ht.enabled||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const t=n.getBoundingClientRect();if(!(t.width<=0||t.height<=0))for(let i=0;i<e;i++){const r=t.left+Math.random()*t.width,s=t.top+t.height*(.35+Math.random()*.35);Ma(r,s,{animationDelay:`${i*.045}s`})}}const A2=new Set(["dup","drop","swap","choose","branch","ifte","eval","nop","putc","getc","putn","clock","clr","rand","exit","depth","q<","q>"]),Fd=Ls.define([{tag:J.comment,color:"#8a6f5f",fontStyle:"italic"},{tag:J.string,color:"#1d6e57"},{tag:J.number,color:"#b14f21"},{tag:J.keyword,color:"#7d2a10",fontWeight:"700"},{tag:J.definition(J.variableName),color:"#0d4f87",fontWeight:"700"},{tag:[J.operator,J.bracket],color:"#2a2d34"}]),Nd=G.theme({"&":{height:"100%",backgroundColor:"transparent"},"&.cm-focused":{outline:"none"},".cm-scroller":{overflow:"auto"},".cm-content":{padding:"1rem"},".cm-gutters":{backgroundColor:"transparent",color:"#7a6153",border:"none"},".cm-lineNumbers .cm-gutterElement":{padding:"0 0.55rem 0 0"},".cm-line":{padding:"0"},".cm-cursor, .cm-dropCursor":{borderLeftColor:"#201611"},".cm-selectionBackground, .cm-content ::selection":{backgroundColor:"rgba(187, 77, 29, 0.22)"}}),T2=G.theme({".cm-content":{minHeight:"520px"}});G.theme({"&":{border:"1px solid rgba(32, 22, 17, 0.15)",borderRadius:"14px",backgroundColor:"var(--panel-strong)"},"&.cm-focused":{outline:"none"},".cm-scroller":{overflowX:"auto",overflowY:"hidden",fontFamily:'"Iosevka", "Cascadia Code", "SFMono-Regular", monospace',fontSize:"0.95rem",lineHeight:"1.55"},".cm-content":{minHeight:"44px",padding:"0.7rem 0.9rem",whiteSpace:"pre"},".cm-line":{padding:"0"},".cm-cursor, .cm-dropCursor":{borderLeftColor:"#201611"},".cm-selectionBackground, .cm-content ::selection":{backgroundColor:"rgba(187, 77, 29, 0.22)"}});const E2=G.theme({".cm-content":{minHeight:"160px",padding:"1rem 1.2rem 1.2rem"},".cm-content:not(.cm-lineWrapping)":{whiteSpace:"pre"},".cm-scroller":{fontFamily:'"Iosevka", "Cascadia Code", "SFMono-Regular", monospace',fontSize:"0.92rem",lineHeight:"1.55"}}),M2={startState(){return{inBlockComment:!1,inString:!1,inStringEscape:!1}},copyState(n){return{inBlockComment:n.inBlockComment,inString:n.inString,inStringEscape:n.inStringEscape}},token(n,e){if(e.inBlockComment){for(;!n.eol();){if(n.match("*/")){e.inBlockComment=!1;break}n.next()}return"comment"}if(e.inString){for(;!n.eol();){const i=n.next();if(e.inStringEscape){e.inStringEscape=!1;continue}if(i==="\\"){e.inStringEscape=!0;continue}if(i==="'"){e.inString=!1;break}}return"string"}if(n.eatSpace())return null;if(n.match("/*"))return e.inBlockComment=!0,"comment";if(n.peek()==="'")return n.next(),e.inString=!0,e.inStringEscape=!1,"string";if(n.match(/^q[<>](?![a-zA-Z0-9_])/i)||n.match(/^\.[a-zA-Z_][a-zA-Z0-9_]*/))return"keyword";if(n.match(/^(?:0x[0-9a-fA-F_]+|0b[01_]+|0o[0-7_]+|[0-9][0-9_]*)(?![a-zA-Z0-9_])/))return"number";if(n.match(/^[a-zA-Z_][a-zA-Z0-9_]*:(?![a-zA-Z0-9_])/))return"def";if(n.match(/^[\[\]]/))return"bracket";if(n.match(/^(?:<<|>>|[+\-*/%=<>|&~?:;()])/))return"operator";const t=n.match(/^[a-zA-Z_][a-zA-Z0-9_]*/);return t?A2.has(t[0].toLowerCase())?"keyword":null:(n.next(),null)}},qd=xa.define(M2),P2=[hb(),Lf.of([p2,...d2,...kb]),Y1(),qd,Gf(Fd)],Pa=G.domEventHandlers({keydown(n,e){S2(e,n)}});function Ia(n,e,t){const i=t==null?void 0:t.onDocumentChange,r=new G({state:pe.create({doc:e,extensions:[...P2,h0(),e0(),G.lineWrapping,Nd,T2,...i?[G.updateListener.of(s=>{s.docChanged&&i()})]:[],...(t==null?void 0:t.extraExtensions)??[]]}),parent:n});return{getValue(){return r.state.doc.toString()},setValue(s){r.state.doc.toString()!==s&&r.dispatch({changes:{from:0,to:r.state.doc.length,insert:s}})},focus(){r.focus()}}}function gc(n,e){const t=new mr,i=new G({state:pe.create({doc:e,extensions:[t.of([]),qd,Gf(Fd),pe.readOnly.of(!0),G.editable.of(!1),Nd,E2]}),parent:n});return{getValue(){return i.state.doc.toString()},setValue(r){i.state.doc.toString()!==r&&i.dispatch({changes:{from:0,to:i.state.doc.length,insert:r}})},focus(){i.focus()},setWrapped(r){i.dispatch({effects:t.reconfigure(r?G.lineWrapping:[])})}}}const I2=`.import ../lib/prelude.ffp

/* Project Euler #1: sum multiples of 3 or 5 below 1000. */
/* http://projecteuler.net/index.php?section=problems&id=1 */

mod?: [ 3 divisor? ] [ 5 divisor? ] bi or ;

999 count [ mod? ] filter! sum! .

/* 233168 */
`,D2=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=10 */

/* Walk primes with next-prime (prelude) until past 2_000_000. Slow but exact. */

_e10: dup 2_000_000 <= [
    dup rot + swap next-prime _e10
  ] ? ;

0 2 _e10 drop . /* 142913828922 */
`,B2=`.import ../lib/prelude.ffp

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


/* 5537376230 */`,L2=`.import ../lib/prelude.ffp

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
drop drop . /* 837799 */`,O2=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=16 */

digits: dup [ 10 [ % ] [ / ] bi2 digits ] ? ;

2 1000 ^ digits sum! . /* 1366 */`,R2=`!: dup 1 > [ dup 1 - ! * ] ? trim ;

trim: dup 10 % 0 = [ 10 / trim ] ? ;
five: 100_000 % ;

9 ! five . clr  /* 36288 */
10 ! five . clr  /* 36288 */
20 ! five . clr  /* 17664 */

1_000 ! trim five . clr /* 53472 */

/* Omitted: 1_000_000_000_000 ! … (expected [ 16576 ]) — factorial(10^12) is not practical here. */`,z2=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=2 */

fib: dup2 + ;
fib-up: dup 4000000 < [ fib fib-up ] ? ;

1 2 fib-up drop
[ even? ] filter! sum! .

/* 4613732 */
`,F2=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=20 */

digits: dup [ 10 [ % ] [ / ] bi2 digits ] ? ;

100 ! digits sum! . /* 648 */
`,N2=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=25 */

next: swap dupd + ;

c: q< q< ++ q> q> ;

n:
.m 10 1000 ^
;

r: c dup n < [ next r ] ? ;

0 1 1 r drop drop ++ . /* 4782 */`,q2=`.import ../lib/prelude.ffp

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

600851475143 factors last! . /* 6857 */`,H2=`.import ../lib/prelude.ffp

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
`,$2=`.import ../lib/prelude.ffp

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
`,W2=`.import ../lib/prelude.ffp

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

/* 9110846700 */`,V2=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=5 */

/* gcd and lcm come from prelude (math library). */

1 20 range [ lcm ] reduce! .

/* 232792560 */
`,U2=`.import ../lib/prelude.ffp

/* http://projecteuler.net/index.php?section=problems&id=5 */

sum-of-squares: [ sqr + ] 0 foldl! ;
square-of-sum: sum! sqr ;

100 count square-of-sum
( 100 count sum-of-squares ) - .

/* 25164150 */`,j2=`.import ../lib/prelude.ffp

/* Project Euler #7: find the 10001st prime. */
/* http://projecteuler.net/index.php?section=problems&id=7 */

10001 th-prime . /* 104743 */
`,K2=`.import ../lib/prelude.ffp

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
`,X2=`.import ../lib/prelude.ffp

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
`,G2=`/* constants 1 2 3 */
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
`,Y2=`.import ./num.ffp

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
`,Q2=`.import ./pred.ffp

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
`,J2=`.import ./arith.ffp
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
`,Z2=`.import ./arith.ffp
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
`,ey=`.import ./arith.ffp

/*
 * Naming note: the \`i\` prefix means integer.
 * \`icbrt\` returns the integer cube root (truncated toward zero).
 */

__closer: dup2 2 ^ / over 2 * + 3 / ;
__loop: __closer dup2 > [ nip __loop ] ? ;
__cbrtn: dup 3 / __loop drop nip ;

icbrt: dup sgn swap over * dup 1 > [ __cbrtn ] ? * ;
`,ty=`
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
`,ny=`.import ../core/core.ff

__t: tuck % dup [ __t ] ? ;

gcd: dup [ __t ] ? drop ;
lcm: dup2 gcd / * ;
`,iy=`.import ../core/core.ff

__n: 20 ; /* number of digits to use for fixed-point calculations */
__s: 100000000000000000000 ; /* 10^n */
__ln2: 69314718055994530941 ; /* floor(ln(2)*10^n) */

ilb: dup 1 > [ 1 >> ilb ++ ] [ drop 0 ] branch ; /* n ilb == floor(log2(n)) */
ilog: dup 10 >= [ 10 / ilog ++ ] [ drop 0 ] branch ; /* n ilog == floor(log10(n)) */
iln: ilb __ln2 * __s / ; /* n iln == floor(ln(n)) */`,ry=`.import ./pred.ffp
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
`,sy=`.import ../core/core.ff

/* Logarithm and combinatorics */

!: dup [ dup -- ! * ] [ drop 1 ] branch ; /* n ! == n! */
nck: dup2 - ! swap ! * [ ! ] dip / ; /* n k nck == C(n,k) */

/* Knuth operators */

^^: -- dup [ [ dup ] swap times [ ^ ] ] dip times ;
^^^: -- dup [ [ dup ] swap times [ ^^ ] ] dip times ;
`,oy=`.import ./atan-core.ffp

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
; /* n half_pi == floor(10ⁿ*π/2) */`,ly=`.import ../core/core.ff
.import ./arith.ffp

/* Internal precision helpers shared by variable-precision math words. */
n->S: 10 swap ^ ; /* n n->S == 10^n */
n->S2: 2 * n->S ; /* n n->S2 == 10^(2n) */
n->K: 6 * 4 + 5 / 10 + ; /* n n->K == ceil(6*n/5)+10 */
p/q*S: n->S swap rot * swap / ; /* p q n p/q*S == floor(p*10^n/q) */

ntrunc: n->S / ; /* x n ntrunc == floor(x/10^n) */
nfrac: [ abs ] dip n->S % ; /* x n nfrac == (x - floor(x/10^n))*10^n */`,ay=`.import ../core/core.ff

/* Predicates */

negitive?: 0 < ; /* n negitive? == flag */
positive?: 0 > ; /* n positive? == flag */
divisor?: % zero? ; .inline /* n d divisor? == flag */
even?: 2 divisor? ; .inline /* n even? == flag */
odd?: even? not ; .inline /* n odd? == flag */
`,uy=`.import ./pred.ffp

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
`,cy=`.import ../core/core.ff
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
`,hy=`.import ../core/core.ff
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
`,fy=`/* Trigonometric words live here. Pi-derived constants are defined in pi.ffp. */
`,dy=`.import ./core/core.ff
.import ./math/math.ffp
.import ./string/string.ffp
.import ./seq/seq.ffp
.import ./time/time.ffp`,py=`.import ../core/core.ff

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
`,my=`.import ../core/core.ff

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
`,gy=`/* String output */

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
`,by=`.import char.ffp
.import str.ffp`,yy=`.import ./core/core.ff
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
`,wy=`.import ./core/core.ff
.import ./string/string.ffp

assert: falsey? [ 0 10 'Failed' println .inline 1 exit ] ? ;
assert_eq: = assert .inline ;
assert_false: not assert .inline ;

OK: 0 '\\sOK' println clr ;

¶: clr 999 ;`,ky=`.import ./utc.ffp
`,xy=`.import ../core/core.ff
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
`,Hd=`.import ./lib/prelude.ffp

/* factorial */

fact: dup [ dup -- fact * ] [ drop 1 ] branch ;

100 fact .

/* 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000 */`,vy=`.import ./lib/math/cbrt.ffp

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
`,Sy=`.import ./lib/math/sqrt.ffp

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
`,_y=`.import ./lib/math/gcd.ffp

/* Greatest common divisor and least common multiple demo. */

109876463 177777648  gcd . clr /* 1234567 */

109876463 177777648  lcm . clr /* 15822210672 */
`,Cy=`.import ./lib/math/ack.ffp
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
`,Ay=`.import ./lib/math/atan.ffp

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
`,Ty=new Set(["../../ff/euler/euler4.ffp","../../ff/euler/euler10.ffp","../../ff/euler/euler14.ffp","../../ff/euler/euler46.ffp"]);function Ey(n){const e="../../ff/lib/";if(!n.startsWith(e))throw new Error(`Unexpected library source path: ${n}`);return`/lib/${n.slice(e.length)}`}const My=Object.assign({"../../ff/euler/euler1.ffp":I2,"../../ff/euler/euler10.ffp":D2,"../../ff/euler/euler13.ffp":B2,"../../ff/euler/euler14.ffp":L2,"../../ff/euler/euler16.ffp":O2,"../../ff/euler/euler160.ffp":R2,"../../ff/euler/euler2.ffp":z2,"../../ff/euler/euler20.ffp":F2,"../../ff/euler/euler25.ffp":N2,"../../ff/euler/euler3.ffp":q2,"../../ff/euler/euler4.ffp":H2,"../../ff/euler/euler46.ffp":$2,"../../ff/euler/euler48.ffp":W2,"../../ff/euler/euler5.ffp":V2,"../../ff/euler/euler6.ffp":U2,"../../ff/euler/euler7.ffp":j2,"../../ff/euler/euler8.ffp":K2,"../../ff/euler/euler9.ffp":X2});function bc(n){const e=n.split("/").pop()??n,t=/^euler(\d+)\.ffp$/.exec(e);return t?[Number(t[1]),e]:[Number.POSITIVE_INFINITY,e]}const Py=Object.entries(My).filter(([n])=>!Ty.has(n)).sort((n,e)=>{const t=bc(n[0]),i=bc(e[0]);return t[0]!==i[0]?t[0]-i[0]:t[1].localeCompare(i[1])}).map(([n,e])=>({path:Iy(n),label:Dy(n),source:e}));function Iy(n){const e=n.lastIndexOf("/");return`/examples/${e>=0?n.slice(e+1):n}`}function Dy(n){const e=n.indexOf("../../ff/");return e>=0?n.slice(e+9):n}const $d=[{path:"/examples/fact.ffp",label:"fact.ffp",source:Hd},{path:"/examples/cbrt.ffp",label:"cbrt.ffp",source:vy},{path:"/examples/sqrt.ffp",label:"sqrt.ffp",source:Sy},{path:"/examples/gcd.ffp",label:"gcd.ffp",source:_y},{path:"/examples/ack.ffp",label:"ack.ffp",source:Cy},{path:"/examples/pi.ffp",label:"pi.ffp",source:Ay},...Py],By=Object.assign({"../../ff/lib/core/core.ff":G2,"../../ff/lib/math/ack.ffp":Y2,"../../ff/lib/math/arith.ffp":Q2,"../../ff/lib/math/atan-core.ffp":J2,"../../ff/lib/math/atan.ffp":Z2,"../../ff/lib/math/cbrt.ffp":ey,"../../ff/lib/math/exp.ffp":ty,"../../ff/lib/math/gcd.ffp":ny,"../../ff/lib/math/log.ffp":iy,"../../ff/lib/math/math.ffp":ry,"../../ff/lib/math/num.ffp":sy,"../../ff/lib/math/pi.ffp":oy,"../../ff/lib/math/precision.ffp":ly,"../../ff/lib/math/pred.ffp":ay,"../../ff/lib/math/primes.ffp":uy,"../../ff/lib/math/prn.ffp":cy,"../../ff/lib/math/sqrt.ffp":hy,"../../ff/lib/math/trig.ffp":fy,"../../ff/lib/prelude.ffp":dy,"../../ff/lib/seq/seq.ffp":py,"../../ff/lib/string/char.ffp":my,"../../ff/lib/string/str.ffp":gy,"../../ff/lib/string/string.ffp":by,"../../ff/lib/tap.ffp":yy,"../../ff/lib/testing.ffp":wy,"../../ff/lib/time/time.ffp":ky,"../../ff/lib/time/utc.ffp":xy}),Ly=Object.fromEntries(Object.entries(By).map(([n,e])=>[Ey(n),e])),rs=Object.fromEntries($d.map(({path:n,source:e})=>[n,e])),Ui="__custom__",Oy="/examples/fact.ffp",Ry=[...$d.map(({path:n,label:e})=>`<option value="${n}">${e}</option>`),`<option value="${Ui}">Custom</option>`].join(`
`),yc=Hd;function Wd(n,e="/main.ffp"){return{[e]:n,...Ly,...rs}}const zy=["playground","repl","codetta","tutorial","help"],Fy=new Set(zy);function bo(n){var t;const e=((t=n==null?void 0:n.replace(/^#/,"").split("?")[0])==null?void 0:t.trim().toLowerCase())??"";return e&&Fy.has(e)?e:"playground"}function Il(n){const e=new URLSearchParams(n.search.replace(/^\?/,"")),t=n.hash,i=t.indexOf("?");if(i!==-1){const s=new URLSearchParams(t.slice(i+1));for(const[o,l]of s)e.set(o,l)}const r=e.toString();return r?`?${r}`:""}const Nr="example";function Ny(n){const e=new URLSearchParams(n.search);n.tab==="playground"?n.codeParam?(e.set("code",n.codeParam),e.delete(Nr)):n.exampleParam?(e.delete("code"),e.set(Nr,n.exampleParam)):(e.delete("code"),e.delete(Nr)):(e.delete("code"),e.delete(Nr));const t=e.toString();return`${n.pathname}#${n.tab}${t?`?${t}`:""}`}function wc(){return{output:"",preprocessed:"",ir:"",bytecode:"",compiledBytes:0,issues:[],stack:[],logs:[],exitCode:0,compileMs:0,executeMs:0,terminal:"cancelled",vmCyclesExecuted:0}}function qy(n){return{output:"",preprocessed:"",ir:"",bytecode:"",compiledBytes:0,issues:[],stack:[],logs:[n],exitCode:1,compileMs:0,executeMs:0,terminal:"error",vmCyclesExecuted:0}}class Hy{constructor(){qt(this,"worker",null);qt(this,"nextRunId",1);qt(this,"pending",null);qt(this,"activeRunId",null)}ensureWorker(){this.worker||(this.worker=new Worker(new URL("/f-flat-minor/assets/ff-playground-worker-Ej_e126y.js",import.meta.url),{type:"module"}),this.worker.onmessage=e=>{this.handleMessage(e.data)})}handleMessage(e){var t,i,r,s,o,l,a,u;if(e.type==="COMPILED"){((t=this.pending)==null?void 0:t.runId)===e.runId&&(this.pending.compileMs=e.compileMs,(r=(i=this.pending).onProgress)==null||r.call(i,{vmCyclesExecuted:0,compileMs:e.compileMs,executeElapsedMs:0,preprocessed:e.preprocessed,ir:e.ir,bytecode:e.bytecode,compiledBytes:e.compiledBytes}));return}if(e.type==="PROGRESS"){if(((s=this.pending)==null?void 0:s.runId)===e.runId){const c=this.pending.compileMs;(l=(o=this.pending).onProgress)==null||l.call(o,{vmCyclesExecuted:e.vmCyclesExecuted,compileMs:c,executeElapsedMs:e.executeElapsedMs})}return}if(e.type==="ERROR"){if(((a=this.pending)==null?void 0:a.runId)!==e.runId)return;const c=this.pending;this.pending=null,this.activeRunId=null,c.resolve(qy(e.message));return}if(e.type==="RESULT"){if(((u=this.pending)==null?void 0:u.runId)!==e.runId)return;const c=this.pending;this.pending=null,this.activeRunId=null,c.resolve(e.result)}}runProgram(e){this.ensureWorker();const t=this.nextRunId++;this.activeRunId=t;let i;const r=()=>{this.cancelSoft(t),i=window.setTimeout(()=>{var o,l;if(((o=this.pending)==null?void 0:o.runId)===t&&(this.cancelHard(),((l=this.pending)==null?void 0:l.runId)===t)){const a=this.pending;this.pending=null,this.activeRunId=null,a.resolve(wc())}},750)},s=e.signal;if(s){if(s.aborted)return Promise.resolve(wc());s.addEventListener("abort",r,{once:!0})}return new Promise(o=>{this.pending={runId:t,resolve:o,onProgress:e.onProgress},this.worker.postMessage({type:"RUN",runId:t,source:e.source,stdin:e.stdin,optimize:e.optimize,filename:e.filename,yieldIntervalMs:e.yieldIntervalMs,yieldSliceMax:e.yieldSliceMax})}).finally(()=>{s&&s.removeEventListener("abort",r),window.clearTimeout(i)})}cancelSoft(e){var i;const t=e??this.activeRunId;t!==null&&((i=this.worker)==null||i.postMessage({type:"CANCEL",runId:t}))}cancelHard(){this.worker&&(this.worker.terminate(),this.worker=null)}}function $y(){var e,t,i,r,s;return!!(((i=(t=(e=globalThis.Deno)==null?void 0:e.stdout)==null?void 0:t.isTerminal)==null?void 0:i.call(t))??((s=(r=globalThis.process)==null?void 0:r.stdout)==null?void 0:s.isTTY)??!1)}function Da(n,e){return $y()?`\x1B[${n}m${e}\x1B[0m`:e}function Wy(n){return Da(34,n)}function Vy(n){return Da(32,n)}function fn(n){return Da(36,n)}const C={NOP:0,CALL:1,PUTC:2,GETC:3,PUTN:5,CLOCK:6,DROP:8,PUSHR:14,PULLR:15,SHIFTL:16,SHIFTR:17,CLR:24,RAND:26,EXIT:27,DUP:33,DEPTH:35,SWAP:36,MOD:37,AND:38,STASH:40,FETCH:41,MUL:42,ADD:43,CONS:44,SUB:45,PRN:46,DIV:47,MARK:58,DEF:59,LT:60,EQ:61,GT:62,IF:63,BRA:91,KET:93,POW:94,OR:124,NOT:126},vi={nop:C.NOP,eval:C.CALL,";":C.DEF,":":C.MARK,clr:C.CLR,rand:C.RAND,exit:C.EXIT,".":C.PRN,putc:C.PUTC,getc:C.GETC,putn:C.PUTN,clock:C.CLOCK,drop:C.DROP,swap:C.SWAP,dup:C.DUP,"<<":C.SHIFTL,">>":C.SHIFTR,"+":C.ADD,"-":C.SUB,cons:C.CONS,"*":C.MUL,"/":C.DIV,"<":C.LT,"=":C.EQ,">":C.GT,"?":C.IF,"%":C.MOD,"&":C.AND,"(":C.STASH,")":C.FETCH,"q<":C.PUSHR,"q>":C.PULLR,depth:C.DEPTH,"^":C.POW,"[":C.BRA,"]":C.KET,"|":C.OR,"~":C.NOT},ni=255,Uy=n=>n,jy=n=>n,te={call:"call",push:"push"},Ky=6,Dl=10,Xy=new Map([[BigInt(C.MARK),":"],[BigInt(C.DEF),";"],[BigInt(C.BRA),"["],[BigInt(C.KET),"]"]]);function Gy(n){return(""+n.value).padEnd(Dl," ")}function Yy(n,e){var t;return e?e.padEnd(Dl," "):n.op===te.push&&((t=n.meta)!=null&&t.pointer)?`[${n.value}]`.padEnd(Dl," "):Gy(n)}function Qy(n){return n.trim()?`/* ${n} */`:""}function Jy(n){var l,a,u;const e=((l=ew(n))==null?void 0:l.toUpperCase())||"",t=n.op===te.call?Xy.get(n.value):void 0,i=t!==void 0,r=Yy(n,t),s=((u=(a=n.meta)==null?void 0:a.comment)==null?void 0:u.trim())||(n.op===te.call&&!i?e:""),o=(n.op===te.call&&!t?"EVAL":"").padEnd(Ky," ");return[jy(r),Uy(o),Qy(s)].join(" ")}function Zy(n){for(const e in vi)if(vi[e]===n)return e;return""}function ew(n){var e,t;if(n.op===te.call||n.op===te.push&&((e=n.meta)!=null&&e.pointer))return((t=n.meta)==null?void 0:t.name)||Zy(Number(n.value))||""}function Vd(n){return n.map(Jy).join(`
`)}function tw(n){const e=[];let t=0;for(;t<n.length;){const i=n[t++]??0n,r=n[t++]??0n;i===0n?e.push({op:te.push,value:r}):e.push({op:te.call,value:r})}return e}function nw(n){return n=n.replace(/\\U([A-Fa-f0-9]{8})/g,(e,t)=>kc(t)),n=n.replace(/\\u([A-Fa-f0-9]{4})/g,(e,t)=>kc(t)),n.replace(/\\0/g,"\0").replace(/\\b/g,"\b").replace(/\\t/g,"	").replace(/\\n/g,`
`).replace(/\\v/g,"\v").replace(/\\f/g,"\f").replace(/\\r/g,"\r").replace(/\\'/g,"'").replace(/\\"/g,'"').replace(/\\s/g," ").replace(/\\\\/g,"\\")}function kc(n){let e="",t=parseInt(n,16);return t<=65535?e+=String.fromCharCode(t):t<=1114111?(t-=65536,e+=String.fromCharCode(55296|t>>10)+String.fromCharCode(56320|t&1023)):e+=`hex2Char error: Code point out of range: ${iw(t)}`,e}function iw(n){return(n+0).toString(16).toUpperCase()}const Ud="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",jd=new Map;Ud.split("").forEach(function(n,e){jd.set(n,e)});const rw=5n,Kd=1n<<rw,Xd=Number(Kd),Gd=Kd-1n;function sw(n){return n.map(uw).map(cw).join("")}function ow(n){return fw(hw(n)).map(dw)}function lw(n){return n>=0n?n<<1n:(-n<<1n)+1n}function aw(n){return n&1n?-(n>>1n):n>>1n}function uw(n){if(n===0n)return[0];n=lw(n);const e=[];for(;n>0;){let t=Number(n&Gd);n>>=5n,n>0&&(t|=Xd),e.push(t)}return e}function cw(n){return n.map(e=>Ud[e]).join("")}function hw(n){return n.split("").map(e=>{const t=jd.get(e);if(t===void 0)throw new Error(`${n} is not a valid base64 encoded VLQ`);return t})}function fw(n){const e=[];let t=[];if(n.forEach(i=>{t.push(i),(i&Xd)===0&&(e.push(t),t=[])}),t.length>0)throw new Error("Malformed VLQ sequence: The last VLQ never ended.");return e}function dw(n){const e=n.reverse().reduce((t,i)=>(t<<=5n,t|=BigInt(i)&Gd,t),0n);return aw(e)}const pw="/*",mw="*/";function yo(n){if(!(n==="-"||n==="+"))try{let e=1n;return n=n.replaceAll("_",""),n.startsWith("-0")&&(e=-1n,n=n.replace("-","")),n.includes("e")||n.includes("E")?e*BigInt(+n):e*BigInt(n)}catch{return}}class xt{constructor(e={}){this.symbols=new Map,this._nextCode=-1,this.host=e;let t;for(t in vi)this.symbols.set(t,BigInt(vi[t]))}static tokenize(e){return e.split(/\s+/).filter(Boolean).map(t=>{const i=yo(t);return i!==void 0?i:t})}static tokenizeWithSpans(e){const t=[],i=/\S+/g;let r=0,s=0,o=0;const l=u=>{for(;o<u;){const c=e[o];c==="\r"?(e[o+1]===`
`&&o++,r++,s=0):c===`
`?(r++,s=0):s++,o++}};let a;for(;(a=i.exec(e))!==null;){const u=a.index;l(u);const c=a[0]??"",h=yo(c);t.push({raw:c,value:h!==void 0?h:c,line:r,character:s,length:c.length,offset:u}),l(u+c.length)}return t}static compileToBase64(e){const t=e.flatMap(i=>{if(i.op===te.call&&i.value===0n)return[];const r=i.value<<1n;return[i.op===te.push?r:r|1n]});return sw(t)}nextCode(){return BigInt(this._nextCode--)}getSymbol(e){e=e.toLowerCase();let t=this.symbols.get(e);return t===void 0&&(t=this.nextCode(),this.symbols.set(e,t)),t}compileToIR(e,t=""){var c,h,f;let i=0;const r=e.length;let s="";const o=[];let l;for(;i<r;)if(l=e[i++],s=this.unwrapTokenValue(l),typeof s=="bigint")a(s);else if(s.length>1&&s.startsWith(".")){const[d]=s.split(" ");switch(d){case".push":o[o.length-1].op=te.push;break;case".call":o[o.length-1].op=te.call;break;case".inline":(c=o[o.length-1]).meta||(c.meta={}),o[o.length-1].meta.inline=!0;break;case".unsafe":(h=o[o.length-1]).meta||(h.meta={}),o[o.length-1].meta.unsafe=!0;break;case".pointer":(f=o[o.length-1]).meta||(f.meta={}),o[o.length-1].meta.pointer=!0;break;case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Compiler: .exit requires a host exit handler");case".symbols":this.symbols.forEach((p,m)=>{(this.host.log||console.log)(m,p)});break;case".words":{const p=Array.from(this.symbols,([m])=>m).join(" ");(this.host.log||console.log)(p);break}}}else if(s[0]==="'"&&s.length>1)nw(s).replace(/^'/,"").replace(/'$/,"").split("").forEach(d=>{a(d.charCodeAt(0),{comment:d})});else if(s.endsWith(":")&&s.length>1){const d=s.replace(/:$/,"");a(this.getSymbol(d),{name:`${d}`,pointer:!0}),u(C.MARK,{name:":"})}else if(s===pw){const d=l,p=[];for(;i<e.length&&(l=e[i++],s=this.unwrapTokenValue(l),s!==mw);)p.push(s);u(0n,{comment:p.join(" ")},d)}else if(s.startsWith("[")&&s.endsWith("]")){const d=s.replace(/^\[/,"").replace(/\]$/,""),p=yo(d);p!==void 0?a(p,{name:d,pointer:!0}):a(this.getSymbol(d),{name:d,pointer:!0})}else u(this.getSymbol(s),{name:s});return o;function a(d,p={},m=l){o.push({value:BigInt(d),op:te.push,meta:{...p,...xt.toInstructionMeta(m,t)}})}function u(d,p={},m=l){o.push({value:BigInt(d),op:te.call,meta:{...p,...xt.toInstructionMeta(m,t)}})}}unwrapTokenValue(e){return typeof e=="string"||typeof e=="bigint"?e:e.value}static toInstructionMeta(e,t){return!e||typeof e=="string"||typeof e=="bigint"?{filename:t}:{filename:t,line:e.line,character:e.character,length:e.length,offset:e.offset}}validate(e){var s,o;const t=e.slice(),i=[];let r=0;for(;r<t.length;){const l=t[r];if(l.op===te.call&&l.value===BigInt(C.DEF)){let a=0;for(a=r;a>0&&!(t[a].op===te.call&&t[a].value===BigInt(C.MARK));a--);const u=t.splice(a-1,r-a+2);(o=(s=u.at(-1))==null?void 0:s.meta)!=null&&o.unsafe||i.push(...this.validateDef(u)),r=a-1}r++}return i.push(...this.validateDef(t,"main")),i}validateDef(e,t){var c,h,f;const i=[];let r=0,s=0,o=0,l=0;const a=[0];if(!e[0])return[];t=Vy(t||((h=(c=e[0].meta)==null?void 0:c.name)==null?void 0:h.replace(/^&/,""))||"main");const u=Wy(((f=e[0].meta)==null?void 0:f.filename)||"-");for(;r<e.length;){const d=e[r];if(d.op===te.call){if(d.op===te.call&&d.value===BigInt(C.MARK)&&s++,d.op===te.call&&d.value===BigInt(C.DEF)&&s--,d.op===te.call&&d.value===BigInt(C.BRA)&&(o++,a.push(0)),d.op===te.call&&d.value===BigInt(C.KET)&&(o--,(a.length>1?a.pop():0)!==0&&i.push(`${u}: Unbalanced queue push ( ${fn("q< q>")} ) in quote in ${t}`)),d.op===te.call&&(d.value===BigInt(C.PUSHR)||d.value===BigInt(C.STASH))&&(l++,a[a.length-1]++),d.op===te.call&&(d.value===BigInt(C.PULLR)||d.value===BigInt(C.FETCH))){if(a[a.length-1]===0){const m=d.value===BigInt(C.FETCH)?")":"q>";i.push(`${u}: Queue borrow ( ${fn(m)} ) requires ${fn(".unsafe")} in ${t} (including quotes)`)}l--,a[a.length-1]--}o<0&&i.push(`${u}: Bracket ( ${fn("[ ]")} ) mismatch in ${t}`),s<0&&i.push(`${u}: Definition ( ${fn(": ;")} ) mismatch in ${t}`)}r++}return o!==0&&i.push(`${u}: Unbalanced brackets ( ${fn("[ ]")} ) in ${t}`),l!==0&&i.push(`${u}: Unbalanced queue push ( ${fn("q< q> ( )")} ) in ${t}`),s!==0&&i.push(`${u}: Unbalanced definition ( ${fn(": ;")} ) in ${t}`),i}}const Yd="FbAbbCb",gw=[{mnemonic:"NOP",syntax:"nop",stackEffect:"… nop == …",description:"No operation; does nothing.",opcode:0},{mnemonic:"EVAL",syntax:"eval",stackEffect:"[A] eval == a*",description:"Evaluates a quotation, executing its contents.",opcode:1},{mnemonic:"PUTC",syntax:"putc",stackEffect:"n putc == {prints char(n)}",description:"Prints a character given by its numeric code.",opcode:2},{mnemonic:"GETC",syntax:"getc",stackEffect:"getc == n {reads char}",description:"Reads a single character from input and pushes its code.",opcode:3},{mnemonic:"PUTN",syntax:"putn",stackEffect:"n putn == {prints n}",description:"Prints a number to output.",opcode:5},{mnemonic:"CLOCK",syntax:"clock",stackEffect:"clock == n {reads clock}",description:"Returns the current time as a Unix timestamp.",opcode:6},{mnemonic:"DROP",syntax:"drop",stackEffect:"a drop ==",description:"Removes the top value from the stack.",opcode:8},{mnemonic:"PUSHR",syntax:"q<",stackEffect:"a q< == | …a",description:"Pushes a value onto the return stack.",opcode:14},{mnemonic:"PULLR",syntax:"q>",stackEffect:"q> == a | a…",description:"Pops a value from the return stack onto the main stack.",opcode:15},{mnemonic:"SHIFTL",syntax:"<<",stackEffect:"a b << == n",description:"Left-shifts a by b bits.",opcode:16},{mnemonic:"SHIFTR",syntax:">>",stackEffect:"a b >> == n",description:"Right-shifts a by b bits.",opcode:17},{mnemonic:"CLR",syntax:"clr",stackEffect:"… clr ==",description:"Clears the entire stack.",opcode:24},{mnemonic:"RAND",syntax:"rand",stackEffect:"n rand == r {0 <= r < n}",description:"Generates a random number between 0 and n-1.",opcode:26},{mnemonic:"EXIT",syntax:"exit",stackEffect:"n exit == {exits with code n}",description:"Exits the program with the given exit code.",opcode:27},{mnemonic:"DUP",syntax:"dup",stackEffect:"a dup == a a",description:"Duplicates the top value on the stack.",opcode:33},{mnemonic:"DEPTH",syntax:"depth",stackEffect:"… depth == … n",description:"Pushes the current stack depth.",opcode:35},{mnemonic:"SWAP",syntax:"swap",stackEffect:"a b swap == b a",description:"Swaps the top two values on the stack.",opcode:36},{mnemonic:"MOD",syntax:"%",stackEffect:"a b % == n",description:"Computes the remainder of a divided by b.",opcode:37},{mnemonic:"AND",syntax:"&",stackEffect:"a b & == n",description:"Bitwise AND of a and b.",opcode:38},{mnemonic:"STASH",syntax:"(",stackEffect:"… ( == {moves stack to queue}",description:"Moves values from the stack to the queue.",opcode:40},{mnemonic:"FETCH",syntax:")",stackEffect:") == … {restores stack from queue}",description:"Moves values from the queue back to the stack.",opcode:41},{mnemonic:"MUL",syntax:"*",stackEffect:"a b * == n",description:"Multiplies a by b.",opcode:42},{mnemonic:"ADD",syntax:"+",stackEffect:"a b + == n",description:"Adds a and b together.",opcode:43},{mnemonic:"SUB",syntax:"-",stackEffect:"a b - == n",description:"Subtracts b from a.",opcode:45},{mnemonic:"DUMP",syntax:".",stackEffect:"… . == … {prints stack}",description:"Prints the entire stack to output.",opcode:46},{mnemonic:"DIV",syntax:"/",stackEffect:"a b / == n",description:"Divides a by b (integer division).",opcode:47},{mnemonic:"MARK",syntax:":",stackEffect:"n : == {begin definition(n)}",description:"Begins a new word definition with name n.",opcode:58},{mnemonic:"DEF",syntax:";",stackEffect:"; == {end definition}",description:"Ends the current word definition.",opcode:59},{mnemonic:"LT",syntax:"<",stackEffect:"a b < == flag",description:"Pushes true if a is less than b.",opcode:60},{mnemonic:"EQ",syntax:"=",stackEffect:"a b = == flag",description:"Pushes true if a equals b.",opcode:61},{mnemonic:"GT",syntax:">",stackEffect:"a b > == flag",description:"Pushes true if a is greater than b.",opcode:62},{mnemonic:"WHEN",syntax:"?",stackEffect:"flag [A] ? == a*",description:"Executes the quotation if flag is true.",opcode:63},{mnemonic:"BRA",syntax:"[",stackEffect:"[ == {begin quotation}",description:"Begins a quotation (anonymous code block).",opcode:91},{mnemonic:"KET",syntax:"]",stackEffect:"] == [A] {end quotation}",description:"Ends a quotation and pushes it to the stack.",opcode:93},{mnemonic:"POW",syntax:"^",stackEffect:"a b ^ == n",description:"Computes a raised to the power of b.",opcode:94},{mnemonic:"OR",syntax:"|",stackEffect:"a b | == n",description:"Bitwise OR of a and b.",opcode:124},{mnemonic:"NOT",syntax:"~",stackEffect:"a ~ == n'",description:"Bitwise NOT of a.",opcode:126}],bw={words:gw},Qd=new Map;for(const n of bw.words)Qd.set(n.opcode,n);function yw(n){return Qd.get(n)}const ww=[BigInt(C.DEF),BigInt(C.KET),BigInt(C.MARK),BigInt(C.BRA)],Yn=0n,Qn=1n;class fr{constructor(e){this.stack=[],this.queue=[],this.defs=new Map,this.symbols=new Map,this.depth=0,this.nextAnonOp=ni+1,this.traceOn=!1,this.traceFormat="human",this.traceVerbose=!1,this.traceQueueMax=8,this.traceStackMax=32,this.base=10,this.statsOn=!1,this.profileOn=!1,this.stats={system_instructions_called:0,user_instructions_called:0,max_stack_depth:0,max_queue_depth:0},this.profile={},this.platform=e,this.setup()}static fromBase64(e){return ow(e).flatMap(t=>{const i=t&1n,r=t>>1n;return[i,r]})}getStack(){return this.stack.slice()}peek(){const e=this.stack.length;if(e>0)return this.stack[e-1];throw new Error("Peek: stack underflow")}pop(){if(this.stack.length>0)return this.stack.pop();throw new Error("Pop: stack underflow")}push(e){this.stack.push(e)}poke(e){const t=this.stack.length;if(t>0){this.stack[t-1]=e;return}throw new Error("Poke: stack underflow")}clear(){this.stack.splice(0,this.stack.length)}queuePush(e,t){this.queue.push(e,t)}queueUnshift(e,t){this.queue.unshift(e,t)}queueShift(){return[this.queue.shift()??0n,this.queue.shift()??0n]}queuePop(){const e=this.queue.pop()??0n;return[this.queue.pop()??0n,e]}defineSystem(e,t){const i=BigInt(t),r=this.getName(i);if(this.defs.has(i))throw new Error(`Define: cannot redefine system word "${r}"`);this.defs.set(i,e)}defineUser(e,t){const i=this.getName(t);if(t>-1&&t<ni)throw new Error(`Define: cannot define system op "${i}"`);if(this.defs.has(t))throw t>ni?new Error(`Define: cannot redefine anon op "${i}"`):new Error(`Define: cannot redefine user op "${i}"`);this.defs.set(t,e)}callSystem(e){var r;const t=this.defs.get(e);if(typeof t=="function"){if(this.statsOn&&this.stats.system_instructions_called++,this.profileOn){const s=performance.now();t();const o=performance.now(),l=this.getName(e)||Number(e);(r=this.profile)[l]||(r[l]=[0,0]),this.profile[l][0]++,this.profile[l][1]!=0,this.profile[l][1]+=o-s;return}return t()}const i=this.getName(e)||e;throw new Error(`Call: undefined system op "${i}"`)}callUser(e){var r;const t=this.defs.get(e);if(Array.isArray(t)){if(this.statsOn&&this.stats.user_instructions_called++,this.queue.unshift(...t),this.profileOn){const s=this.getName(e,`&${e}`);(r=this.profile)[s]||(r[s]=[0,void 0]),this.profile[s][0]++}return}const i=this.getName(e)||e;throw new Error(`Call: undefined user op "${i}"`)}callOp(e){return e>-1n&&e<ni?this.callSystem(e):this.callUser(e)}loadBigIntCode(e){this.queue.push(...e)}loadIR(e){var i,r;let t=0;for(;t<e.length;){const s=e[t++];if(s.op===te.call){if(s.value===0n)continue;(i=s.meta)!=null&&i.name&&!this.symbols.has(s.value)&&this.symbols.set(s.value,(r=s.meta)==null?void 0:r.name),this.queuePush(Qn,s.value)}else this.queuePush(Yn,s.value)}return this.stack}runChunk(e,t){const i=this.queue;let r=!1,s=t,o=0;for(;i.length>0&&o<e;){const[l,a]=this.queueShift(),u=l===Qn,c=this.stack.slice();r=!this.depth||u&&ww.includes(a),u?r?this.callOp(a):(this.push(l),this.push(a)):(r||this.push(l),this.push(a)),this.statsOn&&(this.stats.max_stack_depth=Math.max(this.stats.max_stack_depth,this.stack.length),this.stats.max_queue_depth=Math.max(this.stats.max_queue_depth,i.length/2));const h=s++;this.traceOn&&this.trace({step:h,immediate:r,tag:l,value:a,stackBefore:c,stackAfter:this.traceVerbose||this.traceFormat==="jsonl"?this.stack.slice():void 0}),o++}return s}run(){return this.runChunk(Number.POSITIVE_INFINITY,0),this.stack}async runAsync(e={}){var u;const t=e.yieldIntervalMs??160,i=e.yieldSliceMax??e.yieldEvery??655360;if(!Number.isFinite(t)||t<0)throw new Error(`runAsync: yieldIntervalMs must be a non-negative finite number (received ${t})`);if(!Number.isFinite(i)||i<1)throw new Error(`runAsync: yieldSliceMax / yieldEvery must be a positive finite number (received ${i})`);const r=e.scheduler??(()=>new Promise(c=>{globalThis.setTimeout(c,0)})),s=typeof globalThis.performance<"u"&&typeof globalThis.performance.now=="function"?()=>globalThis.performance.now():()=>globalThis.Date.now();let o=0,l=0,a=!1;for(;this.queue.length>0&&!a;){const c=s(),h=t>0?c+t:c;for(;this.queue.length>0&&!a&&!(t>0&&s()>=h);){const f=o;if(o=this.runChunk(i,o),l+=o-f,(u=e.onChunk)==null||u.call(e,{vmCyclesExecuted:l}),e.shouldContinue&&!e.shouldContinue()){a=!0;break}if(t===0)break}this.queue.length>0&&!a&&await r()}return{stack:this.stack.slice(),cancelled:a,vmCyclesExecuted:l}}trace({step:e,immediate:t,tag:i,value:r,stackBefore:s,stackAfter:o}){const l=this.createTraceEvent(e,t,i,r,s,o);if(this.traceFormat==="jsonl"){this.writeTraceLine(JSON.stringify(l));return}this.writeTraceLine(this.formatHumanTrace(l))}createTraceEvent(e,t,i,r,s,o){const l=i===Qn,a=l?this.getName(r,String(r)):String(r),u=this.getQueuePreview();return{step:e,immediate:t,tag:l?"call":"literal",value:String(r),action:a,stack_before:this.limitStack(s).map(String),stack_after:o?this.limitStack(o).map(String):void 0,queue_preview:u,queue_depth:this.queue.length/2}}limitStack(e){return e.length>this.traceStackMax?e.slice(-this.traceStackMax):e}getQueuePreview(){const e=[],t=Math.max(this.traceQueueMax,0);for(let i=0;i<this.queue.length&&e.length<t;i+=2){const r=this.queue[i]??0n,s=this.queue[i+1]??0n,o=r===Qn;e.push({tag:o?"call":"literal",value:String(s),action:o?this.getName(s,String(s)):String(s)})}return e}formatHumanTrace(e){const t=this.padHumanAction(e.action),i=this.formatHumanStack(e.stack_before),r=this.formatHumanQueue(e.queue_preview,e.queue_depth),s=this.layoutHumanTraceLine(e.step,i,t,r);if(this.traceVerbose){const o=this.formatHumanStack(e.stack_after??[]);return`${s}
${" ".repeat(String(e.step).length+1)}${o} | immediate=${e.immediate} tag=${e.tag} value=${e.value} stack_depth=${this.stack.length} queue_depth=${e.queue_depth}`}return s}padHumanAction(e){return e.length>=7?e:e.padStart(Math.floor((7+e.length)/2)," ").padEnd(7," ")}layoutHumanTraceLine(e,t,i,r){const s=this.getTraceTerminalWidth(),o=`${e} `;if(o.length>=s)return o.slice(0,s);const l=1,a=Math.min(i.length,Math.max(s-o.length-l*2,1)),u=Math.max(o.length+l,Math.floor((s-a)/2)),c=Math.min(u,Math.max(o.length+l,s-a-l)),h=c+a,f=o.length,d=Math.max(f,c-l),p=Math.min(s,h+l),m=s,b=Math.max(d-f,0),g=Math.max(m-p,0),S=Array.from({length:s},()=>" ");if(this.writeSegment(S,0,o,o.length),this.writeSegment(S,c,i,a),b>0){const v=this.truncateLeft(t,b);this.writeSegment(S,d-v.length,v,v.length)}if(g>0){const v=this.truncateRight(r,g);this.writeSegment(S,p,v,v.length)}return S.join("").replace(/\s+$/,"")}formatHumanStack(e){return e.length===0?"[ ]":`[ ${e.join(" ")} ]`}formatHumanQueue(e,t){const i=e.map(s=>s.tag==="call"?`&${s.action}`:s.value),r=Math.max(t-e.length,0);return r>0&&i.push(`…(+${r})`),i.length===0?"[ ]":`[ ${i.join(" ")} ]`}getTraceTerminalWidth(){var o,l,a,u,c,h,f;const t=globalThis.Deno,i=(l=(o=t==null?void 0:t.stderr)==null?void 0:o.isTerminal)!=null&&l.call(o)&&typeof t.stderr.rid=="number"?t.stderr.rid:(u=(a=t==null?void 0:t.stdout)==null?void 0:a.isTerminal)!=null&&u.call(a)&&typeof t.stdout.rid=="number"?t.stdout.rid:void 0;if(typeof i=="number")try{const d=(c=t==null?void 0:t.consoleSize)==null?void 0:c.call(t,i).columns;if(typeof d=="number"&&d>0)return d}catch{}const r=globalThis.process,s=(h=r==null?void 0:r.stderr)!=null&&h.isTTY&&typeof r.stderr.columns=="number"?r.stderr.columns:(f=r==null?void 0:r.stdout)!=null&&f.isTTY&&typeof r.stdout.columns=="number"?r.stdout.columns:void 0;return typeof s=="number"&&s>0?s:120}truncateLeft(e,t){return t<=0?"":e.length<=t?e:t===1?"…":`…${e.slice(-(t-1))}`}truncateRight(e,t){return t<=0?"":e.length<=t?e:t===1?"…":`${e.slice(0,t-1)}…`}writeSegment(e,t,i,r){if(!(r<=0))for(let s=0;s<r&&s<i.length&&t+s<e.length;s++)e[t+s]=i[s]}writeTraceLine(e){const t=new TextEncoder().encode(`${e}
`);if(this.platform.io.writeError){this.platform.io.writeError(t);return}this.platform.io.write(t)}getName(e,t=String(e)){return this.symbols.has(e)?this.symbols.get(e):String(t)}inspectValue(e){const t=this.symbols.get(e),i=e>=0n&&e<=BigInt(ni),r=this.defs.get(e),s=r!==void 0;let o;Array.isArray(r)&&(o=this.parseDefinitionTokens(r));let l,a;if(i){const u=yw(Number(e));u&&(l=u.stackEffect,a=u.description)}return{value:e,name:t,isSystem:i,isDefined:s,definition:o,stackEffect:l,description:a}}parseDefinitionTokens(e){const t=[];for(let i=0;i<e.length;i+=2){const r=e[i]??0n,s=e[i+1]??0n,o=r===Qn,l=o?this.symbols.get(s):void 0,a=this.defs.has(s);t.push({value:s,tag:r,name:l,isCall:o,isDefined:a})}return t}print(){const e=this.stack.map(t=>t.toString(this.base)).join(" ");this.platform.io.write(new TextEncoder().encode(`[ ${e} ]
`))}loadSourceMap(e){Object.keys(e.symbols).forEach(t=>{this.symbols.set(BigInt(t),e.symbols[t])})}getNextAnonOp(){let e=this.nextAnonOp++;for(;this.defs.has(BigInt(e));)e=this.nextAnonOp++;return BigInt(e)}setup(){const e=new TextEncoder;let t;for(t in vi)this.symbols.set(BigInt(vi[t]),t);this.defineSystem(()=>{},C.NOP),this.defineSystem(()=>{const i=this.pop();this.callOp(i)},C.CALL),this.defineSystem(()=>{this.depth--;const[,i]=this.queuePop(),r=this.stack.splice(Number(i||0))||[];this.defineUser(r,this.pop())},C.DEF),this.defineSystem(()=>{this.depth--;const[,i]=this.queuePop(),r=this.stack.splice(Number(i||0))||[],s=this.getNextAnonOp();this.defineUser(r,s),this.depth>0&&this.push(0n),this.push(s)},C.KET),this.defineSystem(()=>{this.depth++;const i=this.stack.length;this.queuePush(Yn,BigInt(i))},C.BRA),this.defineSystem(()=>{this.depth++;const i=this.stack.length;this.queuePush(Yn,BigInt(i))},C.MARK),this.defineSystem(()=>this.clear(),C.CLR),this.defineSystem(()=>{const i=this.pop();this.platform.exit(Number(i))},C.EXIT),this.defineSystem(()=>{const i=this.pop();this.push(kw(i))},C.RAND),this.defineSystem(()=>{this.print()},C.PRN),this.defineSystem(()=>{this.push(BigInt(this.platform.now()))},C.CLOCK),this.defineSystem(()=>{const i=e.encode(String.fromCharCode(Number(this.pop())));this.platform.io.write(i)},C.PUTC),this.defineSystem(()=>{this.platform.io.setRaw&&this.platform.io.setRaw(!0);const i=this.platform.io.readByte();this.platform.io.setRaw&&this.platform.io.setRaw(!1),this.push(BigInt(i??0))},C.GETC),this.defineSystem(()=>{const i=e.encode(this.pop().toString(this.base));this.platform.io.write(i)},C.PUTN),this.defineSystem(()=>{this.pop()},C.DROP),this.defineSystem(()=>{const i=this.peek(),r=this.stack[this.stack.length-2];this.stack[this.stack.length-2]=i,this.poke(r)},C.SWAP),this.defineSystem(()=>{this.push(this.peek())},C.DUP),this.defineSystem(()=>{const i=this.pop();this.stack[this.stack.length-1]+=i},C.ADD),this.defineSystem(()=>{const i=this.pop();this.stack[this.stack.length-1]-=i},C.SUB),this.defineSystem(()=>{const i=this.pop();this.stack[this.stack.length-1]*=i},C.MUL),this.defineSystem(()=>{const i=this.pop();if(i===0n)throw new Error("DIV: Division by zero");this.stack[this.stack.length-1]/=i},C.DIV),this.defineSystem(()=>{const i=this.pop();this.stack[this.stack.length-1]%=i},C.MOD),this.defineSystem(()=>{const i=this.pop();this.stack[this.stack.length-1]<<=i},C.SHIFTL),this.defineSystem(()=>{const i=this.pop();this.stack[this.stack.length-1]>>=i},C.SHIFTR),this.defineSystem(()=>{const i=this.pop();this.stack[this.stack.length-1]&=i},C.AND),this.defineSystem(()=>{const i=this.pop();this.stack[this.stack.length-1]**=i},C.POW),this.defineSystem(()=>{this.push(this.pop()>this.pop()?1n:0n)},C.LT),this.defineSystem(()=>{this.push(this.pop()===this.pop()?1n:0n)},C.EQ),this.defineSystem(()=>{this.push(this.pop()<this.pop()?1n:0n)},C.GT),this.defineSystem(()=>{const i=this.pop();this.pop()!==0n&&this.queueUnshift(Qn,i)},C.IF),this.defineSystem(()=>{this.queuePush(Yn,this.pop())},C.PUSHR),this.defineSystem(()=>{const[,i]=this.queuePop();this.push(i)},C.PULLR),this.defineSystem(()=>{this.push(BigInt(this.stack.length))},C.DEPTH),this.defineSystem(()=>{const i=this.stack.length;this.stack.splice(0,i).forEach(s=>this.queuePush(Yn,s)),this.queuePush(Yn,BigInt(i))},C.STASH),this.defineSystem(()=>{const[,i]=this.queuePop(),r=Number(i),s=[];for(let o=0;o<r;o++){const[,l]=this.queuePop();s.unshift(l)}this.stack.unshift(...s)},C.FETCH),this.defineSystem(()=>{const i=this.pop();this.stack[this.stack.length-1]|=i},C.OR),this.defineSystem(()=>{const i=this.pop();this.push(~i)},C.NOT),this.defineSystem(()=>{const i=this.pop(),s=[0n,this.pop(),1n,i],o=this.getNextAnonOp();this.defineUser(s,o),this.depth>0&&this.push(0n),this.push(o)},C.CONS)}printProfile(){console.log(),console.log("Profile:");const e=Object.keys(this.profile).map(r=>{const s=this.profile[r][0],o=this.profile[r][1];return{name:r,calls:s,time:o,system:typeof o<"u","ops/ms":o?Math.round(s/o):""}}).sort((r,s)=>s.calls-r.calls),t=e.filter(r=>r.system),i=e.filter(r=>!r.system);console.table(t,["name","calls","ops/ms"]),console.table(i,["name","calls"]),console.log()}printStats(){console.log(),console.log("Interpreter stats:"),console.log(this.stats),console.log()}}function kw(n){const e=n,t=e.toString().length;let i="";for(;i.length<t;)i+=Math.random().toString().split(".")[1];i=i.slice(0,t);const r="1"+"0".repeat(t);return e*BigInt(i)/BigInt(r)}const qr=BigInt(C.DEF),xc=BigInt(C.KET),Hr=BigInt(C.MARK),vc=BigInt(C.BRA),ae=n=>(n=BigInt(n),e=>e.op===te.call&&e.value===n),Jn=n=>(n=BigInt(n),e=>e.op===te.push&&e.value===n),lt=n=>n.op===te.push,Sc=n=>n.op===te.push&&n.value!==0n,xw=[{name:"No operation",pattern:[ae(C.NOP)],replacement:()=>[]},{name:"Null Sequence - SWAP SWAP",pattern:[ae(C.SWAP),ae(C.SWAP)],replacement:()=>[]},{name:"Null Sequence - DUP DROP",pattern:[ae(C.DUP),ae(C.DROP)],replacement:()=>[]},{name:"Null Sequence - PUSHR PULLR",pattern:[ae(C.PUSHR),ae(C.PULLR)],replacement:()=>[]},{name:"Null Sequence - CLOCK DROP",pattern:[ae(C.CLOCK),ae(C.DROP)],replacement:()=>[]},{name:"Null Sequence - RAND DROP",pattern:[ae(C.RAND),ae(C.DROP)],replacement:()=>[]},{name:"Null Sequence - DEPTH DROP",pattern:[ae(C.DEPTH),ae(C.DROP)],replacement:()=>[]},{name:"Null Sequence - NOT NOT",pattern:[ae(C.NOT),ae(C.NOT)],replacement:()=>[]},{name:"Indirect calls - n EVAL",pattern:[lt,ae(C.CALL)],replacement:n=>{var e,t;return[{op:te.call,value:n.value,meta:{name:(t=(e=n.meta)==null?void 0:e.name)==null?void 0:t.replace(/^&/,"")}}]}},{name:"Null Sequence - n DROP",pattern:[lt,ae(C.DROP)],replacement:()=>[]},{name:"Constant Folding - a b ADD",pattern:[lt,lt,ae(C.ADD)],replacement:(n,e)=>[{op:te.push,value:n.value+e.value}]},{name:"Algebraic Simplification - 0 ADD",pattern:[Jn(0),ae(C.ADD)],replacement:()=>[]},{name:"Algebraic Simplification - swap ADD",pattern:[ae(C.SWAP),ae(C.ADD)],replacement:(n,e)=>[e]},{name:"Constant Folding - a b SUB",pattern:[lt,lt,ae(C.SUB)],replacement:(n,e)=>[{op:te.push,value:n.value-e.value}]},{name:"Algebraic Simplification - 0 SUB",pattern:[Jn(0),ae(C.SUB)],replacement:()=>[]},{name:"Constant Folding - a b MUL",pattern:[lt,lt,ae(C.MUL)],replacement:(n,e)=>[{op:te.push,value:n.value*e.value}]},{name:"Algebraic Simplification - 1 MUL",pattern:[Jn(1),ae(C.MUL)],replacement:()=>[]},{name:"Algebraic Simplification - swap MUL",pattern:[ae(C.SWAP),ae(C.MUL)],replacement:(n,e)=>[e]},{name:"Constant Folding - a b DIV",pattern:[lt,Sc,ae(C.DIV)],replacement:(n,e)=>[{op:te.push,value:n.value/e.value}]},{name:"Algebraic Simplification - 1 DIV",pattern:[Jn(1),ae(C.DIV)],replacement:()=>[]},{name:"Constant propagation - a DUP",pattern:[lt,ae(C.DUP)],replacement:n=>[n,n]},{name:"Unreachable Code - 0 &b IF",pattern:[Jn(0),lt,ae(C.IF)],replacement:()=>[]},{name:"Flows-Of-Control Optimizations - !0 &b IF",pattern:[Sc,lt,ae(C.IF)],replacement:(n,e,t)=>{var i,r;return[{op:te.call,value:e.value,meta:{name:(r=(i=e.meta)==null?void 0:i.name)==null?void 0:r.replace(/^&/,"")}}]}},{name:"Null Sequence - 0 eval",pattern:[Jn(0),ae(C.CALL)],replacement:()=>[]},{name:"Empty List - [ ]",pattern:[ae(C.BRA),ae(C.KET)],replacement:()=>[{op:te.push,value:0n,meta:{pointer:!0,name:"0"}}]},{name:"a q< b a> - b a",pattern:[lt,ae(C.PUSHR),lt,ae(C.PULLR)],replacement:(n,e,t)=>[t,n]}];class vw{constructor(){this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0},this.minOptPasses=2,this.maxOptPasses=20,this.defs=new Map,this.calledWords=new Set,this.optimized=[],this.nextAnonOp=ni+1}optimize(e){this.reset(),this.stats.pre_optimization_ir_size=e.length,this.optimized=e;let t;do t=this.optimized.length,this.optLoop();while((this.optimized.length<t||this.stats.optimization_passes<this.minOptPasses)&&this.stats.optimization_passes<this.maxOptPasses);return this.optimized=this.pullDefs(this.optimized),this.optimized=this.addReferencedWords(this.optimized),this.stats.post_optimization_ir_size=this.optimized.length,this.optimized}optLoop(){this.optimized=this.peepholeOptimization(this.optimized),this.optimized=this.getDefs(this.optimized),this.optimized=this.inlineWords(this.optimized,4),this.stats.optimization_passes++}reset(){this.optimized=[],this.defs=new Map,this.calledWords=new Set,this.stats={pre_optimization_ir_size:0,post_optimization_ir_size:0,user_defined_anon_defs:0,user_defined_named_defs:0,post_optimization_user_defs:0,inlined_calls:0,peephole_optimizations:0,optimization_passes:0}}getDefs(e){var i;let t=0;for(;t<e.length;){const r=e[t];if(r.op===te.call){if(r.value===xc){this.stats.optimization_passes===0&&this.stats.user_defined_anon_defs++,r.meta??(r.meta={}),(i=r.meta).uid??(i.uid=this.nextAnonOp++);let s=t;for(;s-- >0;){const u=e[s];if(u.op===te.call&&u.value===vc)break}const o=BigInt(r.meta.uid),l={op:te.push,value:o,meta:{pointer:!0}},a=e.slice(s,t+1);a.unshift(l),a[1]={...a[1],value:Hr,meta:{...a[1].meta,name:":"}},a[a.length-1]={...a[a.length-1],value:qr,meta:{...a[a.length-1].meta,name:";"}},this.defs.set(o,a)}else if(r.value===qr){this.stats.optimization_passes===0&&this.stats.user_defined_named_defs++;let s=t;for(;s-- >0;){const a=e[s];if(a.op===te.call&&a.value===Hr)break}const o=e[s-1];o.meta||(o.meta={}),o.meta.pointer=!0;const l=e.slice(s-1,t+1);this.defs.set(o.value,l)}}t++}return e}pullDefs(e,t=!1){var s;const i=e.slice();let r=0;for(;r<i.length;){const o=i[r];if(o.op===te.call){if(o.value===xc){o.meta??(o.meta={}),(s=o.meta).uid??(s.uid=this.nextAnonOp++);const l=r;for(;r-- >0;){const h=i[r];if(h.op===te.call&&h.value===vc)break}const a=BigInt(o.meta.uid),u={op:te.push,value:a,meta:{pointer:!0}},c=i.splice(r,l-r+1,u);c.unshift(u),c[1]={...c[1],value:Hr,meta:{...c[1].meta,name:":"}},c[c.length-1]={...c[c.length-1],value:qr,meta:{...c[c.length-1].meta,name:";"}},this.defs.set(a,c)}else if(o.value===qr&&!t){const l=r;for(;r-- >0;){const c=i[r];if(c.op===te.call&&c.value===Hr)break}const a=i[r-1];a.meta||(a.meta={}),a.meta.pointer=!0;const u=i.splice(r-1,l-r+2);r=r-2,this.defs.set(u[0].value,u)}}r++}return i}peepholeOptimization(e){const t=e.slice();for(;;){const i=this.stats.peephole_optimizations;let r=0;for(;r<t.length;){for(const s of xw){const{pattern:o,replacement:l}=s;if(r+o.length>t.length)continue;if(o.every((u,c)=>u(t[r+c]))){this.stats.peephole_optimizations++;const u=t.slice(r,r+o.length);t.splice(r,o.length,...l(...u)),r=Math.max(0,r-o.length-1);break}}r++}if(this.stats.peephole_optimizations===i)break}return t}inlineWords(e,t=1,i=[]){return e.flatMap(r=>{var s,o,l,a;if((s=r.meta)!=null&&s.unsafe)return r;if(r.op===te.call&&this.defs.has(r.value)){if(i.includes(r.value))return r;const u=this.defs.get(r.value);if(!u)return r;const c=u[u.length-1];if((o=c.meta)!=null&&o.unsafe)return r;if((l=c.meta)!=null&&l.inline||(a=r.meta)!=null&&a.inline)return this.stats.inlined_calls++,this.inlineWords(u.slice(2,-1),1/0,i.concat(r.value));if(u.length<=t+3)return this.stats.inlined_calls++,this.inlineWords(u.slice(2,-1),t,i.concat(r.value))}return r})}addReferencedWords(e){return e.slice().forEach(t=>{var i;t.op===te.push&&((i=t.meta)!=null&&i.pointer)?this.addDef(t.value):t.op===te.call&&this.addDef(t.value)}),e}addDef(e){if(!this.calledWords.has(e)){const t=this.defs.get(e);if(t)return this.stats.post_optimization_user_defs++,this.calledWords.add(e),this.optimized.unshift(...t),this.addReferencedWords(t)}}}class xn{constructor(e,t,i){this.imported=new Set,this.importPrefixes=new Map,this.macroPreludeReady=!1,this.rootFilename=null,this.host=e,this.engine=t.engine,this.compiler=t.compiler||new xt,i!=null&&i.macroEngineBootstrapFile&&this.bootstrapMacroEngine(i.macroEngineBootstrapFile)}static tokenize(e){return e.split(/[\r\n]+/)}preprocess(e,t="-"){const i=this.rootFilename===null;i&&t!=="-"&&(this.rootFilename=t);try{return this.preprocessLines(e,t)}finally{i&&(this.rootFilename=null)}}preprocessLines(e,t,i){return e.map(r=>{if(r.length>1&&r[0]==="."){const[s,...o]=r.split(" ");if(s[0]==="."&&s.length>1){switch(s){case".exit":if(this.host.exit){this.host.exit();break}throw new Error("Preprocessor: .exit requires a host exit handler");case".load":{const l=this.findFile(o.join(" "),t),a=this.host.readTextFile(l);return this.preprocessLines(xn.tokenize(a),l)}case".import":{const l=this.findFile(o.join(" "),t);if(!this.imported.has(l)){this.imported.add(l);const a=this.host.readTextFile(l);return this.preprocessLines(xn.tokenize(a),l,l)}return""}case".m":return this.runMacro(o.join(" "),r);case".ff":return this.runMacro(o.join(" "),r);case".ffp":{if(!this.macroPreludeReady)throw new Error("Preprocessor: .ffp requires prelude-enabled macro context");return this.runMacro(o.join(" "),r)}}return""}}return i?this.mangleImportedLine(r,i):r}).join(`
`)}findFile(e,t="-"){if(t&&t!=="-"&&!this.host.path.isAbsolute(e)){const i=this.host.path.dirname(t),r=this.host.path.resolve(i,e);if(this.host.fileExists(r))return r}if(this.host.fileExists(e))return e;throw'File not found: "'+e+'"'}bootstrapMacroEngine(e){const t=this.findFile(e),i=this.host.readTextFile(t),s=new xn(this.host,{engine:this.engine,compiler:this.compiler}).preprocess(xn.tokenize(i),t),o=this.compiler.compileToIR(xt.tokenize(s),t);this.engine.loadIR(o),this.engine.run(),this.engine.clear(),this.macroPreludeReady=!0}runMacro(e,t){const i=this.compiler.compileToIR(xt.tokenize(e));this.engine.loadIR(i),this.engine.run();const r=this.engine.getStack();return this.engine.clear(),r.map(String).join(" ")+` /* ${t} */`}mangleImportedLine(e,t){const i=this.getImportPrefix(t);return e.split(/(\s+)/).map(r=>!r||/\s+/.test(r)?r:this.mangleImportedToken(r,i)).join("")}mangleImportedToken(e,t){return e.startsWith("[__")?`[${t}${e.slice(3)}`:e.startsWith("__")?`${t}${e.slice(2)}`:e}getImportPrefix(e){const t=this.importPrefixes.get(e);if(t)return t;const r=this.getNormalizedImportPath(e).replace(/[^A-Za-z0-9]+/g,"_").replace(/^_+|_+$/g,"").replace(/_+/g,"_")||"module",s=this.hashPath(e),o=`__${r}_${s}__`;return this.importPrefixes.set(e,o),o}getNormalizedImportPath(e){if(this.rootFilename&&this.rootFilename!=="-"){const t=this.host.path.dirname(this.rootFilename),i=this.host.path.relative(t,e);if(i)return i.replace(/\\/g,"/")}return e.replace(/\\/g,"/")}hashPath(e){let t=2166136261;for(let i=0;i<e.length;i++)t^=e.charCodeAt(i),t=Math.imul(t,16777619)>>>0;return t.toString(36)}}function Si(n){const e=n.startsWith("/"),t=n.split("/").filter(Boolean),i=[];for(const r of t)if(r!=="."){if(r===".."){i.pop();continue}i.push(r)}return`${e?"/":""}${i.join("/")}`||(e?"/":".")}function Sw(n){const e=Si(n),t=e.lastIndexOf("/");return t<=0?e.startsWith("/")?"/":".":e.slice(0,t)}function _w(...n){const e=n.filter(Boolean).join("/").replaceAll(/\/+/g,"/");return Si(e)}function Cw(n,e){const t=Si(n).split("/").filter(Boolean),i=Si(e).split("/").filter(Boolean);let r=0;for(;r<t.length&&r<i.length&&t[r]===i[r];)r++;const s=t.length-r,o=i.slice(r);return Array(s).fill("..").concat(o).join("/")||"."}function Jd(n){return{readTextFile(e){const t=Si(e),i=n[t];if(typeof i!="string")throw new Error(`Virtual file not found: ${t}`);return i},fileExists(e){return typeof n[Si(e)]=="string"},path:{isAbsolute(e){return e.startsWith("/")},dirname:Sw,relative:Cw,resolve:_w}}}function Zd(n={}){const e=new TextDecoder,t=new TextEncoder,i=Array.from(t.encode(n.stdin??""));return{io:{write(r){var s;(s=n.onWrite)==null||s.call(n,e.decode(r))},readByte(){return i.shift()??null}},exit(r){var s;(s=n.onExit)==null||s.call(n,r)},now(){return Date.now()}}}const Aw="/lib/prelude.ffp",Tw="/main.ffp";function Ba(n){return Yd.length+n.length}function ep(n){return n?`${Yd}${n}`:""}function _c(n,e){const t=console.log;console.log=(...i)=>{n(i.map(String).join(" "))};try{return e()}finally{console.log=t}}async function Ew(n,e){const t=console.log;console.log=(...i)=>{n(i.map(String).join(" "))};try{return await e()}finally{console.log=t}}function Mw(n,e,t={}){let i="";const r=[];let s=0;const o=t.filename??Tw,l=Zd({stdin:e,onWrite(p){i+=p},onExit(p){s=p}}),a=new xt,u=new fr(l),c=new xt,h=new fr(l),f=Wd(n,o),d=new xn(Jd(f),{engine:h,compiler:c},{macroEngineBootstrapFile:Aw});return{compiler:a,engine:u,preprocessor:d,filename:o,logs:r,getOutput(){return i},getExitCode(){return s}}}function Pw(n,e,t,i={}){const r=Mw(n,e,i),s=performance.now(),o=_c(a=>r.logs.push(a),()=>{const a=r.preprocessor.preprocess(xn.tokenize(n),r.filename);let u=r.compiler.compileToIR(xt.tokenize(a),r.filename);const c=r.compiler.validate(u);t&&(u=new vw().optimize(u));const h=Vd(u),f=xt.compileToBase64(u),d=Ba(f);return r.engine.loadIR(u),{preprocessed:a,formattedIr:h,bytecode:f,compiledBytes:d,issues:c}}),l=performance.now();return{preprocessed:o.preprocessed,ir:o.formattedIr,bytecode:o.bytecode,compiledBytes:o.compiledBytes,issues:o.issues,compileMs:l-s,execute(){const a=performance.now();_c(c=>r.logs.push(c),()=>{r.engine.run()});const u=performance.now();return{output:r.getOutput(),stack:r.engine.getStack().map(String),logs:[...r.logs],exitCode:r.getExitCode(),executeMs:u-a,cancelled:!1,vmCyclesExecuted:0}},async executeAsync(a={}){const u=performance.now(),c=await Ew(f=>r.logs.push(f),async()=>await r.engine.runAsync(a)),h=performance.now();return{output:r.getOutput(),stack:r.engine.getStack().map(String),logs:[...r.logs],exitCode:r.getExitCode(),executeMs:h-u,cancelled:c.cancelled,vmCyclesExecuted:c.vmCyclesExecuted}}}}let wo=null;function Iw(){return wo||(wo=new Hy),wo}function Dw(){if(typeof Worker>"u"||typeof window>"u")return!1;try{if(new URLSearchParams(Il(window.location).replace(/^\?/,"")).get("worker")==="0")return!1}catch{}return!0}function Cc(n){return{output:"",preprocessed:"",ir:"",bytecode:"",compiledBytes:0,issues:[],stack:[],logs:[],exitCode:1,compileMs:0,executeMs:0,terminal:"error",vmCyclesExecuted:0}}async function La(n,e,t,i={}){var o;const r=i.yieldIntervalMs??160,s=i.yieldSliceMax??i.yieldEvery??655360;if(Dw())try{return await Iw().runProgram({source:n,stdin:e,optimize:t,filename:i.filename,yieldIntervalMs:r,yieldSliceMax:s,signal:i.signal,onProgress:i.onProgress})}catch(l){const a=l instanceof Error?l.message:String(l);return{...Cc(),logs:[a]}}try{const l=Pw(n,e,t,{filename:i.filename}),a=l.compileMs;(o=i.onProgress)==null||o.call(i,{vmCyclesExecuted:0,compileMs:a,executeElapsedMs:0,compiledBytes:l.compiledBytes});const u=performance.now(),c=await l.executeAsync({yieldIntervalMs:r,yieldSliceMax:s,shouldContinue:()=>{var f;return!((f=i.signal)!=null&&f.aborted)},onChunk:({vmCyclesExecuted:f})=>{var d;(d=i.onProgress)==null||d.call(i,{vmCyclesExecuted:f,compileMs:a,executeElapsedMs:performance.now()-u})},scheduler:()=>new Promise(f=>{globalThis.setTimeout(f,0)})}),h=c.cancelled?"cancelled":"done";return{output:c.output,preprocessed:l.preprocessed,ir:l.ir,bytecode:l.bytecode,compiledBytes:l.compiledBytes,issues:l.issues,stack:c.stack,logs:c.logs,exitCode:c.exitCode,compileMs:l.compileMs,executeMs:c.executeMs,terminal:h,vmCyclesExecuted:c.vmCyclesExecuted}}catch(l){const a=l instanceof Error?l.message:String(l);return{...Cc(),logs:[a]}}}const Ac="/lib/prelude.ffp";function Bw(n,e){const t=console.log;console.log=(...i)=>{n(i.map(String).join(" "))};try{return e()}finally{console.log=t}}class Lw{constructor(){qt(this,"compiler");qt(this,"engine");qt(this,"preprocessor");qt(this,"files");qt(this,"output","");this.reset()}reset(){this.output="",this.files=Wd("","/repl.ffp");const e=Zd({onWrite:r=>{this.output+=r}});this.compiler=new xt,this.engine=new fr(e);const t=new xt,i=new fr(e);this.preprocessor=new xn(Jd(this.files),{engine:i,compiler:t},{macroEngineBootstrapFile:Ac}),this.execute(`.import ${Ac}`)}inspectValue(e){const t=BigInt(e);return this.engine.inspectValue(t)}createStackItems(){return this.engine.getStack().map((e,t)=>({value:String(e),index:t}))}execute(e){const t=e.trim(),i=[];return t?t===".reset"?(this.reset(),{output:"Session reset. Prelude reloaded.",clearTranscript:!0,logs:i,stack:this.createStackItems()}):t===".clear"?{output:"Transcript cleared.",clearTranscript:!0,logs:i,stack:this.createStackItems()}:t===".exit"||t===".quit"?{output:"Browser REPL sessions stay open. Use .reset to clear state.",logs:i,stack:this.createStackItems()}:(this.files["/repl.ffp"]=e,this.output="",Bw(r=>i.push(r),()=>{try{const r=this.preprocessor.preprocess([e],"/repl.ffp"),s=this.compiler.compileToIR(xt.tokenize(r),"/repl.ffp");return this.engine.loadIR(s),this.engine.run(),{output:this.output,logs:i,stack:this.createStackItems()}}catch(r){return{output:this.output,logs:i,stack:this.createStackItems(),error:r instanceof Error?r.message:String(r)}}})):{output:"",logs:i,stack:this.createStackItems()}}}const Ow=`<main class="shell">
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
`,Rw=`<div class="help-grid">
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
`;function _i(n){if(!Number.isFinite(n)||n<0)return String(n);const e=Math.floor(n);if(e<1e5)return e.toLocaleString();if(e<1e6){const i=e/1e3;return i>=999.5?Tc(e,1e6,"m"):`${i.toFixed(2)}k`}if(e<1e9){const i=e/1e6;return i>=999.5?Tc(e,1e9,"b"):`${i.toFixed(2)}m`}return`${(e/1e9).toFixed(2)}b`}function Tc(n,e,t){return`${(n/e).toFixed(2)}${t}`}const tp=[{id:"square",order:1,title:"Square",goal:"Define `square` and print the square of one number.",concepts:["definitions","dup","*","putn","cr"],source:String.raw`.load /lib/prelude.ffp

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
`,expected:"1 5 10 10 5 1",note:"`nck` does the math for each entry; the recursion only controls left-to-right order."}];function jt(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function dn(n,e){const t=n.querySelector(e);if(!t)throw new Error(`Missing required element: ${e}`);return t}function Ec(n){return n.split(/(`[^`]+`)/g).map(e=>e.startsWith("`")&&e.endsWith("`")?`<code>${jt(e.slice(1,-1))}</code>`:jt(e)).join("")}function Mc(){return new Promise(n=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>n())})})}function Ri(n){return n.map(e=>{const t=e.tone&&e.tone!=="default"?` ${e.tone}`:"",i=e.showDot?'<span class="tutorial-summary-dot" aria-hidden="true"></span>':"";return`
      <span class="tutorial-summary-item">
        <span class="tutorial-summary-label">${jt(e.label)}</span>
        <span class="tutorial-summary-value${t}">${i}${jt(e.value)}</span>
      </span>
    `}).join('<span class="tutorial-summary-separator" aria-hidden="true">|</span>')}function zw(n){const e=n.expected?`
      <div class="tutorial-guidance-block">
        <p class="tutorial-guidance-label">Expected result</p>
        <pre class="tutorial-guidance-value">${jt(n.expected)}</pre>
      </div>
    `:"",t=n.note?`
      <div class="tutorial-guidance-block">
        <p class="tutorial-guidance-label">Note</p>
        <p class="tutorial-note">${Ec(n.note)}</p>
      </div>
    `:"",i=typeof n.stdin=="string"?`
      <label class="field tutorial-stdin-field">
        <span>stdin</span>
        <input data-role="stdin" type="text" value="${jt(n.stdin)}" />
      </label>
    `:"";return`
    <article class="panel tutorial-card" data-problem-id="${jt(n.id)}">
      <div class="tutorial-card-body">
        <div class="tutorial-card-header">
          <div>
            <p class="panel-label">Problem ${n.order}</p>
            <h2>${jt(n.title)}</h2>
          </div>
          <p class="tutorial-goal">${Ec(n.goal)}</p>
        </div>

        <div class="tutorial-concepts" aria-label="Concepts">
          ${n.concepts.map(r=>`<span class="tutorial-concept">${jt(r)}</span>`).join("")}
        </div>

        <div class="tutorial-workbench">
          <div class="tutorial-editor-pane">
            <div class="tutorial-editor-shell">
              <div class="tutorial-editor" data-role="editor" aria-label="${jt(n.title)} source editor"></div>
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
  `}function Fw(){return`
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
        ${[...tp].sort((e,t)=>e.order-t.order).map(e=>zw(e)).join("")}
      </section>
    </section>
  `}function Nw(n){const e=[];return n.output&&e.push(n.output.trimEnd()),n.logs.length&&e.push(n.logs.join(`
`)),e.filter(Boolean).join(`
`)||"(no output)"}function qw(n){n.innerHTML=Fw(),[...tp].sort((t,i)=>t.order-i.order).forEach(t=>{const i=dn(n,`[data-problem-id="${t.id}"]`),r=dn(i,"[data-role='editor']"),s=dn(i,"[data-role='run']"),o=dn(i,"[data-role='reset']"),l=dn(i,"[data-role='summary']"),a=dn(i,"[data-role='output']"),u=dn(i,"[data-role='diagnostics']"),c=dn(i,"[data-role='error']"),h=i.querySelector("[data-role='stdin']"),f=Ia(r,t.source,{extraExtensions:[Pa]});function d(){f.setValue(t.source),h&&typeof t.stdin=="string"&&(h.value=t.stdin),l.textContent="Ready to run.",a.textContent="Run the snippet to see output.",u.textContent="",u.hidden=!0,c.textContent="",c.hidden=!0}let p=null;s.addEventListener("click",async()=>{if(p!==null){p.abort();return}Ta(s),s.textContent="Cancel",s.setAttribute("aria-label","Cancel run"),s.classList.add("is-cancel"),o.disabled=!0,h&&(h.disabled=!0),l.innerHTML=Ri([{label:"compile",value:"Running...",tone:"running",showDot:!0},{label:"execute",value:"pending",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),c.textContent="",c.hidden=!0;const m=new AbortController;p=m;try{await Mc(),l.innerHTML=Ri([{label:"compile",value:"Running...",tone:"running",showDot:!0},{label:"execute",value:"pending",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),await Mc();const b=await La(f.getValue(),(h==null?void 0:h.value)??"",!0,{signal:m.signal,onProgress:({vmCyclesExecuted:v,compileMs:D})=>{l.innerHTML=Ri([{label:"compile",value:D!==void 0?`${D.toFixed(2)} ms`:"…",tone:"running"},{label:"execute",value:`${_i(v)} vm steps`,tone:"running",showDot:!0},{label:"exit",value:"pending",tone:"pending"}])}}),g=b.terminal==="cancelled"?"cancelled":b.terminal==="error"?"error":String(b.exitCode),S=b.terminal==="cancelled"?"pending":b.terminal==="error"?"error":b.exitCode===0?"success":"error";l.innerHTML=Ri([{label:"compile",value:`${b.compileMs.toFixed(2)} ms`},{label:"execute",value:`${b.executeMs.toFixed(2)} ms`},{label:"exit",value:g,tone:S},{label:"issues",value:b.issues.length===1?"1 compiler issue":`${b.issues.length} compiler issues`,tone:b.issues.length?"error":"default"},...b.vmCyclesExecuted!==void 0?[{label:"vm steps",value:_i(b.vmCyclesExecuted),tone:"default"}]:[]]),a.textContent=Nw(b),b.terminal==="error"?(u.textContent="",u.hidden=!0,c.textContent=b.logs.join(`
`)||"Run failed.",c.hidden=!1):b.issues.length?(u.textContent=`Compiler issues:
${b.issues.join(`
`)}`,u.hidden=!1,c.textContent="",c.hidden=!0):(u.textContent="",u.hidden=!0,c.textContent="",c.hidden=!0)}catch(b){const g=b instanceof Error?b.message:String(b);l.innerHTML=Ri([{label:"compile",value:"failed",tone:"error"},{label:"execute",value:"pending",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),a.textContent="",u.textContent="",u.hidden=!0,c.textContent=g,c.hidden=!1}finally{p=null,Ea(),h&&(h.disabled=!1),s.textContent="Run",s.setAttribute("aria-label","Run"),s.classList.remove("is-cancel"),o.disabled=!1}}),o.addEventListener("click",()=>{d()}),h&&typeof t.stdin!="string"&&(h.value="")})}const Hw=`---
etude: 99bottles
title: "99 Bottles of Beer"
leader: hypercubed
bytes: 543
date: 2026-04-07
---

Print the full "99 Bottles of Beer" lyrics.

This etude follows the code.golf [99 Bottles of Beer](https://code.golf/99-bottles-of-beer) hole.
`,$w=`---
etude: catalans-constant
title: "Catalan's Constant"
leader: hypercubed
bytes: 147
date: 2026-04-07
---

Print Catalan's constant to the first 1,000 decimal places after the point.

This etude follows the code.golf [Catalan's Constant](https://code.golf/catalans-constant) hole.
`,Ww=`---
etude: collatz
title: "Collatz"
leader: hypercubed
bytes: 215
date: 2026-04-07
---

Print the Collatz stopping times for the numbers 1 through 1,000, one per line.

This etude follows the code.golf [Collatz](https://code.golf/collatz) hole.
`,Vw=`---
etude: e-digits
title: "Digits of e"
leader: hypercubed
bytes: 1086
date: 2026-04-07
---

Print e to the first 1,000 decimal places after the point.

This etude follows the code.golf [𝑒](https://code.golf/%f0%9d%91%92) hole.
`,Uw=`---
etude: fib
title: "Fibonacci"
leader: hypercubed
bytes: 74
date: 2026-04-07
---

Print the 31st Fibonacci number.

The solution defines \`fib\` with the stack effect \`n fib -> F_n\`. This etude follows the code.golf [Fibonacci](https://code.golf/fibonacci) hole.
`,jw=`---
etude: fizzbuzz
title: "FizzBuzz"
leader: hypercubed
bytes: 245
date: 2026-04-07
---

Print the numbers 1 through 100 using FizzBuzz substitutions.

The current best solution uses the unrolled approach popularized in the Rosetta Code [FizzBuzz article](https://rosettacode.org/wiki/FizzBuzz#the_unrolled_approach). This etude follows the code.golf [FizzBuzz](https://code.golf/fizz-buzz) hole.
`,Kw=`---
etude: leap-years
title: "Leap Years"
leader: hypercubed
bytes: 224
date: 2026-04-07
---

Print all leap years from 1800 to 2400 inclusive.

This etude follows the code.golf [Leap Years](https://code.golf/leap-years) hole.
`,Xw=`---
etude: ln-2
title: "ln 2"
leader: hypercubed
bytes: 22
date: 2026-04-07
---

Print ln(2) to the first 1,000 decimal places after the point.

This etude follows the code.golf [ln 2](https://code.golf/ln-2) hole.
`,Gw=`---
etude: pascals-triangle
title: "Pascal's Triangle"
leader: hypercubed
bytes: 263
date: 2026-04-07
---

Print the first 20 rows of Pascal's triangle.

This etude follows the code.golf [Pascal's Triangle](https://code.golf/pascals-triangle) hole.
`,Yw=`---
etude: pi-digits
title: "Digits of pi"
leader: hypercubed
bytes: 929
date: 2026-04-07
---

Print pi to the first 1,000 decimal places after the point.

Including the leading \`3.\`, the output is 1,002 characters total. This etude follows the code.golf [π](https://code.golf/%cf%80) hole.
`,Qw=`---
etude: roman-to-arabic
title: "Roman to Arabic"
leader: hypercubed
bytes: 877
date: 2026-04-07
---

Convert Roman numerals to Arabic values.

The original code.golf hole is argument-driven, so this Codetta version freezes a representative sample set of Roman numerals and expected conversions. It follows the code.golf [Roman to Arabic](https://code.golf/roman-to-arabic) hole.
`,Jw=`---
etude: tower-of-hanoi
title: "Tower of Hanoi"
leader: hypercubed
bytes: 198
date: 2026-04-07
---

Print the steps needed to solve the Tower of Hanoi with 9 disks.

Each line identifies the source pole and destination pole for one move. This etude follows the code.golf [Tower of Hanoi](https://code.golf/tower-of-hanoi) hole.
`,Zw=`.import ../../lib/prelude.ffp

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
`,ek=`.import ../../lib/prelude.ffp

/* Near-solution seed retained from ff/catalan.ffp. */
/* Catalan number: n cat -> C_n */

cat: dup dup 2 * swap nck swap 1 + / ;

100 cat .
`,tk=`.import ../../lib/prelude.ffp

next: dup even? [ 2 / ] [ 3 * 1 + ] branch ;
steps: dup 1 > [ next steps ++ ] [ drop 0 ] branch ;
line: dup steps putn cr ++ ;

1 [ line ] 1000 times drop
`,nk=`.import ../../lib/prelude.ffp

N: 1000 ;
E: N 1 nexp ;
E N nputn
cr
`,ik=`.import ../../lib/prelude.ffp

fib:
  dup 0 = not
  [ dup 1 = not
    [ -- dup fib swap -- fib + ] ?
  ] ? ;

31 fib putn
`,rk=`.import ../../lib/prelude.ffp

n: dup putn cr ++ ;
f: 0 'Fizz' println ++ ;
b: 0 'Buzz' println ++ ;
fb: 0 'FizzBuzz' println ++ ;
fb10: n n f n b f n n f b ;
fb15: fb10 n f n n fb ;
fb100: fb15 fb15 fb15 fb15 fb15 fb15 fb10 ;

1 fb100 drop
`,sk=`.import ../../lib/prelude.ffp
.import ../../lib/time/utc.ffp

line: dup leap-year? [ dup putn cr ] ? ++ ;

1800 [ line ] 601 times drop
`,ok=`/* Near-solution seed based on the fixed-point ln(2) helper value. */

ln2: 69314718055994530941 ;

ln2 putn
`,lk=`.import ../../lib/prelude.ffp

ps: putn sp ;

line: dup 0 swap [ dup2 ++ q< q< nck ps q> q> ] seq nck ps cr ;

0 [ dup line ++ ] 20 times
`,ak=`.import ../../lib/prelude.ffp

N: 1000 ;
P: N npi ;
P N nputn
cr
`,uk=`.import ../../lib/prelude.ffp
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
`,ck=`.import ../../lib/prelude.ffp

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
`,hk=`99 bottles of beeron the wall, 99 bottles of beer.
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
Go to the store and buy some more, 99 bottles of beeron the wall.`,fk=`0.9159655941772190150546035149323841107741493742816721342664981196217630197762547694793565129261151062485744226191961995790358988033258590594315947374811584069953320287733194605190387274781640878659090247064841521630002287276409423882599577415088163974702524820115607076448838078733704899008647751132259971343407485407553230768565335768095835260219382323950800720680355761048235733942319149829836189977069036404180862179411019175327431499782339761055122477953032487537187866582808236057022559419481809753509711315712615804242723636439850017382875977976530683700929808738874956108936597719409687268444416680462162433986483891628044828150627302274207388431172218272190472255870531908685735423498539498309919115967388464508615152499624237043745177737235177544070853846440132174839299994757244619975496197587064007474870701490937678873045869979860644874974643872062385137123927363049985035392239287879790633644032354784535851927777787270906083031994301332316712476158709792455479119092126201854803963934243
`,dk=`0
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
`,pk=`2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274274663919320030599218174135966290435729003342952605956307381323286279434907632338298807531952510190115738341879307021540891499348841675092447614606680822648001684774118537423454424371075390777449920695517027618386062613313845830007520449338265602976067371132007093287091274437470472306969772093101416928368190255151086574637721112523897844250569536967707854499699679468644549059879316368892300987931277361782154249992295763514822082698951936680331825288693984964651058209392398294887933203625094431173012381970684161403970198376793206832823764648042953118023287825098194558153017567173613320698112509961818815930416903515988885193458072738667385894228792284998920868058257492796104841984443634632449684875602336248270419786232090021609902353043699418491463140934317381436405462531520961836908887070167683964243781405927145635490613031072085103837505101157477041718986106873969655212671546889570350354
`,mk="1346269",gk=`1
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
`,bk=`1804
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
`,yk=`0.6931471805599453094172321214581765680755001343602552541206800094933936219696947156058633269964186875420014810205706857336855202357581305570326707516350759619307275708283714351903070386238916734711233501153644979552391204751726815749320651555247341395258829504530070953263666426541042391578149520437404303855008019441706416715186447128399681717845469570262716310645461502572074024816377733896385506952606683411372738737229289564935470257626520988596932019650585547647033067936544325476327449512504060694381471046899465062201677204245245296126879465461931651746813926725041038025462596568691441928716082938031727143677826548775664850856740776484514644399404614226031930967354025744460703080960850474866385231381816767514386674766478908814371419854942315199735488037516586127535291661000710535582498794147295092931138971559982056543928717000721808576102523688921324497138932037843935308877482597017155910708823683627589842589185353024363421436706118923678919237231467232172053401649256872747782344535347
`,wk=`1
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
`,kk=`3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989
`,xk=`I	1
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
`,vk=`1 3
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
`,Sk="../../ff/codetta",Oa=new Set(["catalans-constant","ln-2"]);function np(n,e){const t=/^\.\.\/\.\.\/ff\/codetta\/([^/]+)\//.exec(n);if(!t)throw new Error(`Unexpected Codetta path for ${e}: ${n}`);return t[1]}function _k(n){const e=n.replaceAll(`\r
`,`
`);if(!e.startsWith(`---
`))throw new Error("Codetta README is missing frontmatter.");const t=e.indexOf(`
---
`,4);if(t<0)throw new Error("Codetta README frontmatter is unterminated.");const i=e.slice(4,t).split(`
`),r=e.slice(t+5).trim(),s=new Map;for(const f of i){const d=f.indexOf(":");if(d<0)continue;const p=f.slice(0,d).trim(),m=f.slice(d+1).trim(),b=m.startsWith('"')&&m.endsWith('"')?m.slice(1,-1):m;s.set(p,b)}const o=s.get("etude"),l=s.get("title"),a=s.get("leader"),u=s.get("bytes"),c=s.get("date");if(!o||!l||!a||!u||!c)throw new Error("Codetta README frontmatter is missing required fields.");const h=Number(u);if(!Number.isFinite(h))throw new Error(`Invalid Codetta byte count: ${u}`);return{frontmatter:{etude:o,title:l,leader:a,bytes:h,date:c},body:r}}const Ck=Object.assign({"../../ff/codetta/99bottles/README.md":Hw,"../../ff/codetta/catalans-constant/README.md":$w,"../../ff/codetta/collatz/README.md":Ww,"../../ff/codetta/e-digits/README.md":Vw,"../../ff/codetta/fib/README.md":Uw,"../../ff/codetta/fizzbuzz/README.md":jw,"../../ff/codetta/leap-years/README.md":Kw,"../../ff/codetta/ln-2/README.md":Xw,"../../ff/codetta/pascals-triangle/README.md":Gw,"../../ff/codetta/pi-digits/README.md":Yw,"../../ff/codetta/roman-to-arabic/README.md":Qw,"../../ff/codetta/tower-of-hanoi/README.md":Jw}),ip=Object.assign({"../../ff/codetta/99bottles/solution.ffp":Zw,"../../ff/codetta/catalans-constant/solution.ffp":ek,"../../ff/codetta/collatz/solution.ffp":tk,"../../ff/codetta/e-digits/solution.ffp":nk,"../../ff/codetta/fib/solution.ffp":ik,"../../ff/codetta/fizzbuzz/solution.ffp":rk,"../../ff/codetta/leap-years/solution.ffp":sk,"../../ff/codetta/ln-2/solution.ffp":ok,"../../ff/codetta/pascals-triangle/solution.ffp":lk,"../../ff/codetta/pi-digits/solution.ffp":ak,"../../ff/codetta/roman-to-arabic/solution.ffp":uk,"../../ff/codetta/tower-of-hanoi/solution.ffp":ck}),Ak=Object.assign({"../../ff/codetta/99bottles/solution.out":hk,"../../ff/codetta/catalans-constant/solution.out":fk,"../../ff/codetta/collatz/solution.out":dk,"../../ff/codetta/e-digits/solution.out":pk,"../../ff/codetta/fib/solution.out":mk,"../../ff/codetta/fizzbuzz/solution.out":gk,"../../ff/codetta/leap-years/solution.out":bk,"../../ff/codetta/ln-2/solution.out":yk,"../../ff/codetta/pascals-triangle/solution.out":wk,"../../ff/codetta/pi-digits/solution.out":kk,"../../ff/codetta/roman-to-arabic/solution.out":xk,"../../ff/codetta/tower-of-hanoi/solution.out":vk}),dr=new Map;for(const n of Object.keys(ip)){const e=np(n,"solution");if(dr.has(e))throw new Error(`Multiple Codetta solutions found for ${e}`);dr.set(e,n)}function Tk(n){if(Oa.has(n))throw new Error(`Codetta solution is hidden for ${n}`);const e=dr.get(n);if(!e)throw new Error(`Missing Codetta solution for ${n}`);const t=e.slice(e.lastIndexOf("/")+1);return`/codetta/${n}/${t}`}function rp(n){if(Oa.has(n))throw new Error(`Codetta solution is hidden for ${n}`);const e=dr.get(n);if(!e)throw new Error(`Missing Codetta solution for ${n}`);return e.replace(/^\.\.\/\.\.\//,"")}const Ek=Object.entries(Ck).map(([n,e])=>{const t=np(n,"README.md"),i=dr.get(t),r=`${Sk}/${t}/solution.out`,s=i?ip[i]:void 0,o=Ak[r];if(typeof s!="string")throw new Error(`Missing Codetta solution for ${t}`);if(typeof o!="string")throw new Error(`Missing Codetta expected output for ${t}`);const{frontmatter:l,body:a}=_k(e);if(l.etude!==t)throw new Error(`Codetta README etude mismatch for ${t}: ${l.etude}`);return{id:t,title:l.title,leader:l.leader,bytes:l.bytes,date:l.date,description:a,expected:o.trimEnd(),solution:s.trimEnd()}}).filter(n=>!Oa.has(n.id)).sort((n,e)=>n.title.localeCompare(e.title)),Mk={};function Ra(n,e){const t=Mk,i=typeof t.includeImageAlt=="boolean"?t.includeImageAlt:!0,r=typeof t.includeHtml=="boolean"?t.includeHtml:!0;return sp(n,i,r)}function sp(n,e,t){if(Pk(n)){if("value"in n)return n.type==="html"&&!t?"":n.value;if(e&&"alt"in n&&n.alt)return n.alt;if("children"in n)return Pc(n.children,e,t)}return Array.isArray(n)?Pc(n,e,t):""}function Pc(n,e,t){const i=[];let r=-1;for(;++r<n.length;)i[r]=sp(n[r],e,t);return i.join("")}function Pk(n){return!!(n&&typeof n=="object")}const Ic=document.createElement("i");function za(n){const e="&"+n+";";Ic.innerHTML=e;const t=Ic.textContent;return t.charCodeAt(t.length-1)===59&&n!=="semi"||t===e?!1:t}function vt(n,e,t,i){const r=n.length;let s=0,o;if(e<0?e=-e>r?0:r+e:e=e>r?r:e,t=t>0?t:0,i.length<1e4)o=Array.from(i),o.unshift(e,t),n.splice(...o);else for(t&&n.splice(e,t);s<i.length;)o=i.slice(s,s+1e4),o.unshift(e,0),n.splice(...o),s+=1e4,e+=1e4}function At(n,e){return n.length>0?(vt(n,n.length,0,e),n):e}const Dc={}.hasOwnProperty;function op(n){const e={};let t=-1;for(;++t<n.length;)Ik(e,n[t]);return e}function Ik(n,e){let t;for(t in e){const r=(Dc.call(n,t)?n[t]:void 0)||(n[t]={}),s=e[t];let o;if(s)for(o in s){Dc.call(r,o)||(r[o]=[]);const l=s[o];Dk(r[o],Array.isArray(l)?l:l?[l]:[])}}}function Dk(n,e){let t=-1;const i=[];for(;++t<e.length;)(e[t].add==="after"?n:i).push(e[t]);vt(n,0,0,i)}function lp(n,e){const t=Number.parseInt(n,e);return t<9||t===11||t>13&&t<32||t>126&&t<160||t>55295&&t<57344||t>64975&&t<65008||(t&65535)===65535||(t&65535)===65534||t>1114111?"�":String.fromCodePoint(t)}function Rt(n){return n.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const tt=In(/[A-Za-z]/),Ge=In(/[\dA-Za-z]/),Bk=In(/[#-'*+\--9=?A-Z^-~]/);function ks(n){return n!==null&&(n<32||n===127)}const Bl=In(/\d/),Lk=In(/[\dA-Fa-f]/),Ok=In(/[!-/:-@[-`{-~]/);function Y(n){return n!==null&&n<-2}function ke(n){return n!==null&&(n<0||n===32)}function ue(n){return n===-2||n===-1||n===32}const Ns=In(new RegExp("\\p{P}|\\p{S}","u")),Kn=In(/\s/);function In(n){return e;function e(t){return t!==null&&t>-1&&n.test(String.fromCharCode(t))}}function Ti(n){const e=[];let t=-1,i=0,r=0;for(;++t<n.length;){const s=n.charCodeAt(t);let o="";if(s===37&&Ge(n.charCodeAt(t+1))&&Ge(n.charCodeAt(t+2)))r=2;else if(s<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(s))||(o=String.fromCharCode(s));else if(s>55295&&s<57344){const l=n.charCodeAt(t+1);s<56320&&l>56319&&l<57344?(o=String.fromCharCode(s,l),r=1):o="�"}else o=String.fromCharCode(s);o&&(e.push(n.slice(i,t),encodeURIComponent(o)),i=t+r+1,o=""),r&&(t+=r,r=0)}return e.join("")+n.slice(i)}function he(n,e,t,i){const r=i?i-1:Number.POSITIVE_INFINITY;let s=0;return o;function o(a){return ue(a)?(n.enter(t),l(a)):e(a)}function l(a){return ue(a)&&s++<r?(n.consume(a),l):(n.exit(t),e(a))}}const Rk={tokenize:zk};function zk(n){const e=n.attempt(this.parser.constructs.contentInitial,i,r);let t;return e;function i(l){if(l===null){n.consume(l);return}return n.enter("lineEnding"),n.consume(l),n.exit("lineEnding"),he(n,e,"linePrefix")}function r(l){return n.enter("paragraph"),s(l)}function s(l){const a=n.enter("chunkText",{contentType:"text",previous:t});return t&&(t.next=a),t=a,o(l)}function o(l){if(l===null){n.exit("chunkText"),n.exit("paragraph"),n.consume(l);return}return Y(l)?(n.consume(l),n.exit("chunkText"),s):(n.consume(l),o)}}const Fk={tokenize:Nk},Bc={tokenize:qk};function Nk(n){const e=this,t=[];let i=0,r,s,o;return l;function l(v){if(i<t.length){const D=t[i];return e.containerState=D[1],n.attempt(D[0].continuation,a,u)(v)}return u(v)}function a(v){if(i++,e.containerState._closeFlow){e.containerState._closeFlow=void 0,r&&S();const D=e.events.length;let A=D,k;for(;A--;)if(e.events[A][0]==="exit"&&e.events[A][1].type==="chunkFlow"){k=e.events[A][1].end;break}g(i);let T=D;for(;T<e.events.length;)e.events[T][1].end={...k},T++;return vt(e.events,A+1,0,e.events.slice(D)),e.events.length=T,u(v)}return l(v)}function u(v){if(i===t.length){if(!r)return f(v);if(r.currentConstruct&&r.currentConstruct.concrete)return p(v);e.interrupt=!!(r.currentConstruct&&!r._gfmTableDynamicInterruptHack)}return e.containerState={},n.check(Bc,c,h)(v)}function c(v){return r&&S(),g(i),f(v)}function h(v){return e.parser.lazy[e.now().line]=i!==t.length,o=e.now().offset,p(v)}function f(v){return e.containerState={},n.attempt(Bc,d,p)(v)}function d(v){return i++,t.push([e.currentConstruct,e.containerState]),f(v)}function p(v){if(v===null){r&&S(),g(0),n.consume(v);return}return r=r||e.parser.flow(e.now()),n.enter("chunkFlow",{_tokenizer:r,contentType:"flow",previous:s}),m(v)}function m(v){if(v===null){b(n.exit("chunkFlow"),!0),g(0),n.consume(v);return}return Y(v)?(n.consume(v),b(n.exit("chunkFlow")),i=0,e.interrupt=void 0,l):(n.consume(v),m)}function b(v,D){const A=e.sliceStream(v);if(D&&A.push(null),v.previous=s,s&&(s.next=v),s=v,r.defineSkip(v.start),r.write(A),e.parser.lazy[v.start.line]){let k=r.events.length;for(;k--;)if(r.events[k][1].start.offset<o&&(!r.events[k][1].end||r.events[k][1].end.offset>o))return;const T=e.events.length;let B=T,I,x;for(;B--;)if(e.events[B][0]==="exit"&&e.events[B][1].type==="chunkFlow"){if(I){x=e.events[B][1].end;break}I=!0}for(g(i),k=T;k<e.events.length;)e.events[k][1].end={...x},k++;vt(e.events,B+1,0,e.events.slice(T)),e.events.length=k}}function g(v){let D=t.length;for(;D-- >v;){const A=t[D];e.containerState=A[1],A[0].exit.call(e,n)}t.length=v}function S(){r.write([null]),s=void 0,r=void 0,e.containerState._closeFlow=void 0}}function qk(n,e,t){return he(n,n.attempt(this.parser.constructs.document,e,t),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function Ci(n){if(n===null||ke(n)||Kn(n))return 1;if(Ns(n))return 2}function qs(n,e,t){const i=[];let r=-1;for(;++r<n.length;){const s=n[r].resolveAll;s&&!i.includes(s)&&(e=s(e,t),i.push(s))}return e}const Ll={name:"attention",resolveAll:Hk,tokenize:$k};function Hk(n,e){let t=-1,i,r,s,o,l,a,u,c;for(;++t<n.length;)if(n[t][0]==="enter"&&n[t][1].type==="attentionSequence"&&n[t][1]._close){for(i=t;i--;)if(n[i][0]==="exit"&&n[i][1].type==="attentionSequence"&&n[i][1]._open&&e.sliceSerialize(n[i][1]).charCodeAt(0)===e.sliceSerialize(n[t][1]).charCodeAt(0)){if((n[i][1]._close||n[t][1]._open)&&(n[t][1].end.offset-n[t][1].start.offset)%3&&!((n[i][1].end.offset-n[i][1].start.offset+n[t][1].end.offset-n[t][1].start.offset)%3))continue;a=n[i][1].end.offset-n[i][1].start.offset>1&&n[t][1].end.offset-n[t][1].start.offset>1?2:1;const h={...n[i][1].end},f={...n[t][1].start};Lc(h,-a),Lc(f,a),o={type:a>1?"strongSequence":"emphasisSequence",start:h,end:{...n[i][1].end}},l={type:a>1?"strongSequence":"emphasisSequence",start:{...n[t][1].start},end:f},s={type:a>1?"strongText":"emphasisText",start:{...n[i][1].end},end:{...n[t][1].start}},r={type:a>1?"strong":"emphasis",start:{...o.start},end:{...l.end}},n[i][1].end={...o.start},n[t][1].start={...l.end},u=[],n[i][1].end.offset-n[i][1].start.offset&&(u=At(u,[["enter",n[i][1],e],["exit",n[i][1],e]])),u=At(u,[["enter",r,e],["enter",o,e],["exit",o,e],["enter",s,e]]),u=At(u,qs(e.parser.constructs.insideSpan.null,n.slice(i+1,t),e)),u=At(u,[["exit",s,e],["enter",l,e],["exit",l,e],["exit",r,e]]),n[t][1].end.offset-n[t][1].start.offset?(c=2,u=At(u,[["enter",n[t][1],e],["exit",n[t][1],e]])):c=0,vt(n,i-1,t-i+3,u),t=i+u.length-c-2;break}}for(t=-1;++t<n.length;)n[t][1].type==="attentionSequence"&&(n[t][1].type="data");return n}function $k(n,e){const t=this.parser.constructs.attentionMarkers.null,i=this.previous,r=Ci(i);let s;return o;function o(a){return s=a,n.enter("attentionSequence"),l(a)}function l(a){if(a===s)return n.consume(a),l;const u=n.exit("attentionSequence"),c=Ci(a),h=!c||c===2&&r||t.includes(a),f=!r||r===2&&c||t.includes(i);return u._open=!!(s===42?h:h&&(r||!f)),u._close=!!(s===42?f:f&&(c||!h)),e(a)}}function Lc(n,e){n.column+=e,n.offset+=e,n._bufferIndex+=e}const Wk={name:"autolink",tokenize:Vk};function Vk(n,e,t){let i=0;return r;function r(d){return n.enter("autolink"),n.enter("autolinkMarker"),n.consume(d),n.exit("autolinkMarker"),n.enter("autolinkProtocol"),s}function s(d){return tt(d)?(n.consume(d),o):d===64?t(d):u(d)}function o(d){return d===43||d===45||d===46||Ge(d)?(i=1,l(d)):u(d)}function l(d){return d===58?(n.consume(d),i=0,a):(d===43||d===45||d===46||Ge(d))&&i++<32?(n.consume(d),l):(i=0,u(d))}function a(d){return d===62?(n.exit("autolinkProtocol"),n.enter("autolinkMarker"),n.consume(d),n.exit("autolinkMarker"),n.exit("autolink"),e):d===null||d===32||d===60||ks(d)?t(d):(n.consume(d),a)}function u(d){return d===64?(n.consume(d),c):Bk(d)?(n.consume(d),u):t(d)}function c(d){return Ge(d)?h(d):t(d)}function h(d){return d===46?(n.consume(d),i=0,c):d===62?(n.exit("autolinkProtocol").type="autolinkEmail",n.enter("autolinkMarker"),n.consume(d),n.exit("autolinkMarker"),n.exit("autolink"),e):f(d)}function f(d){if((d===45||Ge(d))&&i++<63){const p=d===45?f:h;return n.consume(d),p}return t(d)}}const kr={partial:!0,tokenize:Uk};function Uk(n,e,t){return i;function i(s){return ue(s)?he(n,r,"linePrefix")(s):r(s)}function r(s){return s===null||Y(s)?e(s):t(s)}}const ap={continuation:{tokenize:Kk},exit:Xk,name:"blockQuote",tokenize:jk};function jk(n,e,t){const i=this;return r;function r(o){if(o===62){const l=i.containerState;return l.open||(n.enter("blockQuote",{_container:!0}),l.open=!0),n.enter("blockQuotePrefix"),n.enter("blockQuoteMarker"),n.consume(o),n.exit("blockQuoteMarker"),s}return t(o)}function s(o){return ue(o)?(n.enter("blockQuotePrefixWhitespace"),n.consume(o),n.exit("blockQuotePrefixWhitespace"),n.exit("blockQuotePrefix"),e):(n.exit("blockQuotePrefix"),e(o))}}function Kk(n,e,t){const i=this;return r;function r(o){return ue(o)?he(n,s,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(o):s(o)}function s(o){return n.attempt(ap,e,t)(o)}}function Xk(n){n.exit("blockQuote")}const up={name:"characterEscape",tokenize:Gk};function Gk(n,e,t){return i;function i(s){return n.enter("characterEscape"),n.enter("escapeMarker"),n.consume(s),n.exit("escapeMarker"),r}function r(s){return Ok(s)?(n.enter("characterEscapeValue"),n.consume(s),n.exit("characterEscapeValue"),n.exit("characterEscape"),e):t(s)}}const cp={name:"characterReference",tokenize:Yk};function Yk(n,e,t){const i=this;let r=0,s,o;return l;function l(h){return n.enter("characterReference"),n.enter("characterReferenceMarker"),n.consume(h),n.exit("characterReferenceMarker"),a}function a(h){return h===35?(n.enter("characterReferenceMarkerNumeric"),n.consume(h),n.exit("characterReferenceMarkerNumeric"),u):(n.enter("characterReferenceValue"),s=31,o=Ge,c(h))}function u(h){return h===88||h===120?(n.enter("characterReferenceMarkerHexadecimal"),n.consume(h),n.exit("characterReferenceMarkerHexadecimal"),n.enter("characterReferenceValue"),s=6,o=Lk,c):(n.enter("characterReferenceValue"),s=7,o=Bl,c(h))}function c(h){if(h===59&&r){const f=n.exit("characterReferenceValue");return o===Ge&&!za(i.sliceSerialize(f))?t(h):(n.enter("characterReferenceMarker"),n.consume(h),n.exit("characterReferenceMarker"),n.exit("characterReference"),e)}return o(h)&&r++<s?(n.consume(h),c):t(h)}}const Oc={partial:!0,tokenize:Jk},Rc={concrete:!0,name:"codeFenced",tokenize:Qk};function Qk(n,e,t){const i=this,r={partial:!0,tokenize:A};let s=0,o=0,l;return a;function a(k){return u(k)}function u(k){const T=i.events[i.events.length-1];return s=T&&T[1].type==="linePrefix"?T[2].sliceSerialize(T[1],!0).length:0,l=k,n.enter("codeFenced"),n.enter("codeFencedFence"),n.enter("codeFencedFenceSequence"),c(k)}function c(k){return k===l?(o++,n.consume(k),c):o<3?t(k):(n.exit("codeFencedFenceSequence"),ue(k)?he(n,h,"whitespace")(k):h(k))}function h(k){return k===null||Y(k)?(n.exit("codeFencedFence"),i.interrupt?e(k):n.check(Oc,m,D)(k)):(n.enter("codeFencedFenceInfo"),n.enter("chunkString",{contentType:"string"}),f(k))}function f(k){return k===null||Y(k)?(n.exit("chunkString"),n.exit("codeFencedFenceInfo"),h(k)):ue(k)?(n.exit("chunkString"),n.exit("codeFencedFenceInfo"),he(n,d,"whitespace")(k)):k===96&&k===l?t(k):(n.consume(k),f)}function d(k){return k===null||Y(k)?h(k):(n.enter("codeFencedFenceMeta"),n.enter("chunkString",{contentType:"string"}),p(k))}function p(k){return k===null||Y(k)?(n.exit("chunkString"),n.exit("codeFencedFenceMeta"),h(k)):k===96&&k===l?t(k):(n.consume(k),p)}function m(k){return n.attempt(r,D,b)(k)}function b(k){return n.enter("lineEnding"),n.consume(k),n.exit("lineEnding"),g}function g(k){return s>0&&ue(k)?he(n,S,"linePrefix",s+1)(k):S(k)}function S(k){return k===null||Y(k)?n.check(Oc,m,D)(k):(n.enter("codeFlowValue"),v(k))}function v(k){return k===null||Y(k)?(n.exit("codeFlowValue"),S(k)):(n.consume(k),v)}function D(k){return n.exit("codeFenced"),e(k)}function A(k,T,B){let I=0;return x;function x(q){return k.enter("lineEnding"),k.consume(q),k.exit("lineEnding"),P}function P(q){return k.enter("codeFencedFence"),ue(q)?he(k,E,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(q):E(q)}function E(q){return q===l?(k.enter("codeFencedFenceSequence"),W(q)):B(q)}function W(q){return q===l?(I++,k.consume(q),W):I>=o?(k.exit("codeFencedFenceSequence"),ue(q)?he(k,$,"whitespace")(q):$(q)):B(q)}function $(q){return q===null||Y(q)?(k.exit("codeFencedFence"),T(q)):B(q)}}}function Jk(n,e,t){const i=this;return r;function r(o){return o===null?t(o):(n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),s)}function s(o){return i.parser.lazy[i.now().line]?t(o):e(o)}}const ko={name:"codeIndented",tokenize:ex},Zk={partial:!0,tokenize:tx};function ex(n,e,t){const i=this;return r;function r(u){return n.enter("codeIndented"),he(n,s,"linePrefix",5)(u)}function s(u){const c=i.events[i.events.length-1];return c&&c[1].type==="linePrefix"&&c[2].sliceSerialize(c[1],!0).length>=4?o(u):t(u)}function o(u){return u===null?a(u):Y(u)?n.attempt(Zk,o,a)(u):(n.enter("codeFlowValue"),l(u))}function l(u){return u===null||Y(u)?(n.exit("codeFlowValue"),o(u)):(n.consume(u),l)}function a(u){return n.exit("codeIndented"),e(u)}}function tx(n,e,t){const i=this;return r;function r(o){return i.parser.lazy[i.now().line]?t(o):Y(o)?(n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),r):he(n,s,"linePrefix",5)(o)}function s(o){const l=i.events[i.events.length-1];return l&&l[1].type==="linePrefix"&&l[2].sliceSerialize(l[1],!0).length>=4?e(o):Y(o)?r(o):t(o)}}const nx={name:"codeText",previous:rx,resolve:ix,tokenize:sx};function ix(n){let e=n.length-4,t=3,i,r;if((n[t][1].type==="lineEnding"||n[t][1].type==="space")&&(n[e][1].type==="lineEnding"||n[e][1].type==="space")){for(i=t;++i<e;)if(n[i][1].type==="codeTextData"){n[t][1].type="codeTextPadding",n[e][1].type="codeTextPadding",t+=2,e-=2;break}}for(i=t-1,e++;++i<=e;)r===void 0?i!==e&&n[i][1].type!=="lineEnding"&&(r=i):(i===e||n[i][1].type==="lineEnding")&&(n[r][1].type="codeTextData",i!==r+2&&(n[r][1].end=n[i-1][1].end,n.splice(r+2,i-r-2),e-=i-r-2,i=r+2),r=void 0);return n}function rx(n){return n!==96||this.events[this.events.length-1][1].type==="characterEscape"}function sx(n,e,t){let i=0,r,s;return o;function o(h){return n.enter("codeText"),n.enter("codeTextSequence"),l(h)}function l(h){return h===96?(n.consume(h),i++,l):(n.exit("codeTextSequence"),a(h))}function a(h){return h===null?t(h):h===32?(n.enter("space"),n.consume(h),n.exit("space"),a):h===96?(s=n.enter("codeTextSequence"),r=0,c(h)):Y(h)?(n.enter("lineEnding"),n.consume(h),n.exit("lineEnding"),a):(n.enter("codeTextData"),u(h))}function u(h){return h===null||h===32||h===96||Y(h)?(n.exit("codeTextData"),a(h)):(n.consume(h),u)}function c(h){return h===96?(n.consume(h),r++,c):r===i?(n.exit("codeTextSequence"),n.exit("codeText"),e(h)):(s.type="codeTextData",u(h))}}class ox{constructor(e){this.left=e?[...e]:[],this.right=[]}get(e){if(e<0||e>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+e+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return e<this.left.length?this.left[e]:this.right[this.right.length-e+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(e,t){const i=t??Number.POSITIVE_INFINITY;return i<this.left.length?this.left.slice(e,i):e>this.left.length?this.right.slice(this.right.length-i+this.left.length,this.right.length-e+this.left.length).reverse():this.left.slice(e).concat(this.right.slice(this.right.length-i+this.left.length).reverse())}splice(e,t,i){const r=t||0;this.setCursor(Math.trunc(e));const s=this.right.splice(this.right.length-r,Number.POSITIVE_INFINITY);return i&&zi(this.left,i),s.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(e){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(e)}pushMany(e){this.setCursor(Number.POSITIVE_INFINITY),zi(this.left,e)}unshift(e){this.setCursor(0),this.right.push(e)}unshiftMany(e){this.setCursor(0),zi(this.right,e.reverse())}setCursor(e){if(!(e===this.left.length||e>this.left.length&&this.right.length===0||e<0&&this.left.length===0))if(e<this.left.length){const t=this.left.splice(e,Number.POSITIVE_INFINITY);zi(this.right,t.reverse())}else{const t=this.right.splice(this.left.length+this.right.length-e,Number.POSITIVE_INFINITY);zi(this.left,t.reverse())}}}function zi(n,e){let t=0;if(e.length<1e4)n.push(...e);else for(;t<e.length;)n.push(...e.slice(t,t+1e4)),t+=1e4}function hp(n){const e={};let t=-1,i,r,s,o,l,a,u;const c=new ox(n);for(;++t<c.length;){for(;t in e;)t=e[t];if(i=c.get(t),t&&i[1].type==="chunkFlow"&&c.get(t-1)[1].type==="listItemPrefix"&&(a=i[1]._tokenizer.events,s=0,s<a.length&&a[s][1].type==="lineEndingBlank"&&(s+=2),s<a.length&&a[s][1].type==="content"))for(;++s<a.length&&a[s][1].type!=="content";)a[s][1].type==="chunkText"&&(a[s][1]._isInFirstContentOfListItem=!0,s++);if(i[0]==="enter")i[1].contentType&&(Object.assign(e,lx(c,t)),t=e[t],u=!0);else if(i[1]._container){for(s=t,r=void 0;s--;)if(o=c.get(s),o[1].type==="lineEnding"||o[1].type==="lineEndingBlank")o[0]==="enter"&&(r&&(c.get(r)[1].type="lineEndingBlank"),o[1].type="lineEnding",r=s);else if(!(o[1].type==="linePrefix"||o[1].type==="listItemIndent"))break;r&&(i[1].end={...c.get(r)[1].start},l=c.slice(r,t),l.unshift(i),c.splice(r,t-r+1,l))}}return vt(n,0,Number.POSITIVE_INFINITY,c.slice(0)),!u}function lx(n,e){const t=n.get(e)[1],i=n.get(e)[2];let r=e-1;const s=[];let o=t._tokenizer;o||(o=i.parser[t.contentType](t.start),t._contentTypeTextTrailing&&(o._contentTypeTextTrailing=!0));const l=o.events,a=[],u={};let c,h,f=-1,d=t,p=0,m=0;const b=[m];for(;d;){for(;n.get(++r)[1]!==d;);s.push(r),d._tokenizer||(c=i.sliceStream(d),d.next||c.push(null),h&&o.defineSkip(d.start),d._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=!0),o.write(c),d._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=void 0)),h=d,d=d.next}for(d=t;++f<l.length;)l[f][0]==="exit"&&l[f-1][0]==="enter"&&l[f][1].type===l[f-1][1].type&&l[f][1].start.line!==l[f][1].end.line&&(m=f+1,b.push(m),d._tokenizer=void 0,d.previous=void 0,d=d.next);for(o.events=[],d?(d._tokenizer=void 0,d.previous=void 0):b.pop(),f=b.length;f--;){const g=l.slice(b[f],b[f+1]),S=s.pop();a.push([S,S+g.length-1]),n.splice(S,2,g)}for(a.reverse(),f=-1;++f<a.length;)u[p+a[f][0]]=p+a[f][1],p+=a[f][1]-a[f][0]-1;return u}const ax={resolve:cx,tokenize:hx},ux={partial:!0,tokenize:fx};function cx(n){return hp(n),n}function hx(n,e){let t;return i;function i(l){return n.enter("content"),t=n.enter("chunkContent",{contentType:"content"}),r(l)}function r(l){return l===null?s(l):Y(l)?n.check(ux,o,s)(l):(n.consume(l),r)}function s(l){return n.exit("chunkContent"),n.exit("content"),e(l)}function o(l){return n.consume(l),n.exit("chunkContent"),t.next=n.enter("chunkContent",{contentType:"content",previous:t}),t=t.next,r}}function fx(n,e,t){const i=this;return r;function r(o){return n.exit("chunkContent"),n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),he(n,s,"linePrefix")}function s(o){if(o===null||Y(o))return t(o);const l=i.events[i.events.length-1];return!i.parser.constructs.disable.null.includes("codeIndented")&&l&&l[1].type==="linePrefix"&&l[2].sliceSerialize(l[1],!0).length>=4?e(o):n.interrupt(i.parser.constructs.flow,t,e)(o)}}function fp(n,e,t,i,r,s,o,l,a){const u=a||Number.POSITIVE_INFINITY;let c=0;return h;function h(g){return g===60?(n.enter(i),n.enter(r),n.enter(s),n.consume(g),n.exit(s),f):g===null||g===32||g===41||ks(g)?t(g):(n.enter(i),n.enter(o),n.enter(l),n.enter("chunkString",{contentType:"string"}),m(g))}function f(g){return g===62?(n.enter(s),n.consume(g),n.exit(s),n.exit(r),n.exit(i),e):(n.enter(l),n.enter("chunkString",{contentType:"string"}),d(g))}function d(g){return g===62?(n.exit("chunkString"),n.exit(l),f(g)):g===null||g===60||Y(g)?t(g):(n.consume(g),g===92?p:d)}function p(g){return g===60||g===62||g===92?(n.consume(g),d):d(g)}function m(g){return!c&&(g===null||g===41||ke(g))?(n.exit("chunkString"),n.exit(l),n.exit(o),n.exit(i),e(g)):c<u&&g===40?(n.consume(g),c++,m):g===41?(n.consume(g),c--,m):g===null||g===32||g===40||ks(g)?t(g):(n.consume(g),g===92?b:m)}function b(g){return g===40||g===41||g===92?(n.consume(g),m):m(g)}}function dp(n,e,t,i,r,s){const o=this;let l=0,a;return u;function u(d){return n.enter(i),n.enter(r),n.consume(d),n.exit(r),n.enter(s),c}function c(d){return l>999||d===null||d===91||d===93&&!a||d===94&&!l&&"_hiddenFootnoteSupport"in o.parser.constructs?t(d):d===93?(n.exit(s),n.enter(r),n.consume(d),n.exit(r),n.exit(i),e):Y(d)?(n.enter("lineEnding"),n.consume(d),n.exit("lineEnding"),c):(n.enter("chunkString",{contentType:"string"}),h(d))}function h(d){return d===null||d===91||d===93||Y(d)||l++>999?(n.exit("chunkString"),c(d)):(n.consume(d),a||(a=!ue(d)),d===92?f:h)}function f(d){return d===91||d===92||d===93?(n.consume(d),l++,h):h(d)}}function pp(n,e,t,i,r,s){let o;return l;function l(f){return f===34||f===39||f===40?(n.enter(i),n.enter(r),n.consume(f),n.exit(r),o=f===40?41:f,a):t(f)}function a(f){return f===o?(n.enter(r),n.consume(f),n.exit(r),n.exit(i),e):(n.enter(s),u(f))}function u(f){return f===o?(n.exit(s),a(o)):f===null?t(f):Y(f)?(n.enter("lineEnding"),n.consume(f),n.exit("lineEnding"),he(n,u,"linePrefix")):(n.enter("chunkString",{contentType:"string"}),c(f))}function c(f){return f===o||f===null||Y(f)?(n.exit("chunkString"),u(f)):(n.consume(f),f===92?h:c)}function h(f){return f===o||f===92?(n.consume(f),c):c(f)}}function Ji(n,e){let t;return i;function i(r){return Y(r)?(n.enter("lineEnding"),n.consume(r),n.exit("lineEnding"),t=!0,i):ue(r)?he(n,i,t?"linePrefix":"lineSuffix")(r):e(r)}}const dx={name:"definition",tokenize:mx},px={partial:!0,tokenize:gx};function mx(n,e,t){const i=this;let r;return s;function s(d){return n.enter("definition"),o(d)}function o(d){return dp.call(i,n,l,t,"definitionLabel","definitionLabelMarker","definitionLabelString")(d)}function l(d){return r=Rt(i.sliceSerialize(i.events[i.events.length-1][1]).slice(1,-1)),d===58?(n.enter("definitionMarker"),n.consume(d),n.exit("definitionMarker"),a):t(d)}function a(d){return ke(d)?Ji(n,u)(d):u(d)}function u(d){return fp(n,c,t,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(d)}function c(d){return n.attempt(px,h,h)(d)}function h(d){return ue(d)?he(n,f,"whitespace")(d):f(d)}function f(d){return d===null||Y(d)?(n.exit("definition"),i.parser.defined.push(r),e(d)):t(d)}}function gx(n,e,t){return i;function i(l){return ke(l)?Ji(n,r)(l):t(l)}function r(l){return pp(n,s,t,"definitionTitle","definitionTitleMarker","definitionTitleString")(l)}function s(l){return ue(l)?he(n,o,"whitespace")(l):o(l)}function o(l){return l===null||Y(l)?e(l):t(l)}}const bx={name:"hardBreakEscape",tokenize:yx};function yx(n,e,t){return i;function i(s){return n.enter("hardBreakEscape"),n.consume(s),r}function r(s){return Y(s)?(n.exit("hardBreakEscape"),e(s)):t(s)}}const wx={name:"headingAtx",resolve:kx,tokenize:xx};function kx(n,e){let t=n.length-2,i=3,r,s;return n[i][1].type==="whitespace"&&(i+=2),t-2>i&&n[t][1].type==="whitespace"&&(t-=2),n[t][1].type==="atxHeadingSequence"&&(i===t-1||t-4>i&&n[t-2][1].type==="whitespace")&&(t-=i+1===t?2:4),t>i&&(r={type:"atxHeadingText",start:n[i][1].start,end:n[t][1].end},s={type:"chunkText",start:n[i][1].start,end:n[t][1].end,contentType:"text"},vt(n,i,t-i+1,[["enter",r,e],["enter",s,e],["exit",s,e],["exit",r,e]])),n}function xx(n,e,t){let i=0;return r;function r(c){return n.enter("atxHeading"),s(c)}function s(c){return n.enter("atxHeadingSequence"),o(c)}function o(c){return c===35&&i++<6?(n.consume(c),o):c===null||ke(c)?(n.exit("atxHeadingSequence"),l(c)):t(c)}function l(c){return c===35?(n.enter("atxHeadingSequence"),a(c)):c===null||Y(c)?(n.exit("atxHeading"),e(c)):ue(c)?he(n,l,"whitespace")(c):(n.enter("atxHeadingText"),u(c))}function a(c){return c===35?(n.consume(c),a):(n.exit("atxHeadingSequence"),l(c))}function u(c){return c===null||c===35||ke(c)?(n.exit("atxHeadingText"),l(c)):(n.consume(c),u)}}const vx=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],zc=["pre","script","style","textarea"],Sx={concrete:!0,name:"htmlFlow",resolveTo:Ax,tokenize:Tx},_x={partial:!0,tokenize:Mx},Cx={partial:!0,tokenize:Ex};function Ax(n){let e=n.length;for(;e--&&!(n[e][0]==="enter"&&n[e][1].type==="htmlFlow"););return e>1&&n[e-2][1].type==="linePrefix"&&(n[e][1].start=n[e-2][1].start,n[e+1][1].start=n[e-2][1].start,n.splice(e-2,2)),n}function Tx(n,e,t){const i=this;let r,s,o,l,a;return u;function u(w){return c(w)}function c(w){return n.enter("htmlFlow"),n.enter("htmlFlowData"),n.consume(w),h}function h(w){return w===33?(n.consume(w),f):w===47?(n.consume(w),s=!0,m):w===63?(n.consume(w),r=3,i.interrupt?e:y):tt(w)?(n.consume(w),o=String.fromCharCode(w),b):t(w)}function f(w){return w===45?(n.consume(w),r=2,d):w===91?(n.consume(w),r=5,l=0,p):tt(w)?(n.consume(w),r=4,i.interrupt?e:y):t(w)}function d(w){return w===45?(n.consume(w),i.interrupt?e:y):t(w)}function p(w){const oe="CDATA[";return w===oe.charCodeAt(l++)?(n.consume(w),l===oe.length?i.interrupt?e:E:p):t(w)}function m(w){return tt(w)?(n.consume(w),o=String.fromCharCode(w),b):t(w)}function b(w){if(w===null||w===47||w===62||ke(w)){const oe=w===47,Q=o.toLowerCase();return!oe&&!s&&zc.includes(Q)?(r=1,i.interrupt?e(w):E(w)):vx.includes(o.toLowerCase())?(r=6,oe?(n.consume(w),g):i.interrupt?e(w):E(w)):(r=7,i.interrupt&&!i.parser.lazy[i.now().line]?t(w):s?S(w):v(w))}return w===45||Ge(w)?(n.consume(w),o+=String.fromCharCode(w),b):t(w)}function g(w){return w===62?(n.consume(w),i.interrupt?e:E):t(w)}function S(w){return ue(w)?(n.consume(w),S):x(w)}function v(w){return w===47?(n.consume(w),x):w===58||w===95||tt(w)?(n.consume(w),D):ue(w)?(n.consume(w),v):x(w)}function D(w){return w===45||w===46||w===58||w===95||Ge(w)?(n.consume(w),D):A(w)}function A(w){return w===61?(n.consume(w),k):ue(w)?(n.consume(w),A):v(w)}function k(w){return w===null||w===60||w===61||w===62||w===96?t(w):w===34||w===39?(n.consume(w),a=w,T):ue(w)?(n.consume(w),k):B(w)}function T(w){return w===a?(n.consume(w),a=null,I):w===null||Y(w)?t(w):(n.consume(w),T)}function B(w){return w===null||w===34||w===39||w===47||w===60||w===61||w===62||w===96||ke(w)?A(w):(n.consume(w),B)}function I(w){return w===47||w===62||ue(w)?v(w):t(w)}function x(w){return w===62?(n.consume(w),P):t(w)}function P(w){return w===null||Y(w)?E(w):ue(w)?(n.consume(w),P):t(w)}function E(w){return w===45&&r===2?(n.consume(w),X):w===60&&r===1?(n.consume(w),_):w===62&&r===4?(n.consume(w),re):w===63&&r===3?(n.consume(w),y):w===93&&r===5?(n.consume(w),j):Y(w)&&(r===6||r===7)?(n.exit("htmlFlowData"),n.check(_x,ne,W)(w)):w===null||Y(w)?(n.exit("htmlFlowData"),W(w)):(n.consume(w),E)}function W(w){return n.check(Cx,$,ne)(w)}function $(w){return n.enter("lineEnding"),n.consume(w),n.exit("lineEnding"),q}function q(w){return w===null||Y(w)?W(w):(n.enter("htmlFlowData"),E(w))}function X(w){return w===45?(n.consume(w),y):E(w)}function _(w){return w===47?(n.consume(w),o="",U):E(w)}function U(w){if(w===62){const oe=o.toLowerCase();return zc.includes(oe)?(n.consume(w),re):E(w)}return tt(w)&&o.length<8?(n.consume(w),o+=String.fromCharCode(w),U):E(w)}function j(w){return w===93?(n.consume(w),y):E(w)}function y(w){return w===62?(n.consume(w),re):w===45&&r===2?(n.consume(w),y):E(w)}function re(w){return w===null||Y(w)?(n.exit("htmlFlowData"),ne(w)):(n.consume(w),re)}function ne(w){return n.exit("htmlFlow"),e(w)}}function Ex(n,e,t){const i=this;return r;function r(o){return Y(o)?(n.enter("lineEnding"),n.consume(o),n.exit("lineEnding"),s):t(o)}function s(o){return i.parser.lazy[i.now().line]?t(o):e(o)}}function Mx(n,e,t){return i;function i(r){return n.enter("lineEnding"),n.consume(r),n.exit("lineEnding"),n.attempt(kr,e,t)}}const Px={name:"htmlText",tokenize:Ix};function Ix(n,e,t){const i=this;let r,s,o;return l;function l(y){return n.enter("htmlText"),n.enter("htmlTextData"),n.consume(y),a}function a(y){return y===33?(n.consume(y),u):y===47?(n.consume(y),A):y===63?(n.consume(y),v):tt(y)?(n.consume(y),B):t(y)}function u(y){return y===45?(n.consume(y),c):y===91?(n.consume(y),s=0,p):tt(y)?(n.consume(y),S):t(y)}function c(y){return y===45?(n.consume(y),d):t(y)}function h(y){return y===null?t(y):y===45?(n.consume(y),f):Y(y)?(o=h,_(y)):(n.consume(y),h)}function f(y){return y===45?(n.consume(y),d):h(y)}function d(y){return y===62?X(y):y===45?f(y):h(y)}function p(y){const re="CDATA[";return y===re.charCodeAt(s++)?(n.consume(y),s===re.length?m:p):t(y)}function m(y){return y===null?t(y):y===93?(n.consume(y),b):Y(y)?(o=m,_(y)):(n.consume(y),m)}function b(y){return y===93?(n.consume(y),g):m(y)}function g(y){return y===62?X(y):y===93?(n.consume(y),g):m(y)}function S(y){return y===null||y===62?X(y):Y(y)?(o=S,_(y)):(n.consume(y),S)}function v(y){return y===null?t(y):y===63?(n.consume(y),D):Y(y)?(o=v,_(y)):(n.consume(y),v)}function D(y){return y===62?X(y):v(y)}function A(y){return tt(y)?(n.consume(y),k):t(y)}function k(y){return y===45||Ge(y)?(n.consume(y),k):T(y)}function T(y){return Y(y)?(o=T,_(y)):ue(y)?(n.consume(y),T):X(y)}function B(y){return y===45||Ge(y)?(n.consume(y),B):y===47||y===62||ke(y)?I(y):t(y)}function I(y){return y===47?(n.consume(y),X):y===58||y===95||tt(y)?(n.consume(y),x):Y(y)?(o=I,_(y)):ue(y)?(n.consume(y),I):X(y)}function x(y){return y===45||y===46||y===58||y===95||Ge(y)?(n.consume(y),x):P(y)}function P(y){return y===61?(n.consume(y),E):Y(y)?(o=P,_(y)):ue(y)?(n.consume(y),P):I(y)}function E(y){return y===null||y===60||y===61||y===62||y===96?t(y):y===34||y===39?(n.consume(y),r=y,W):Y(y)?(o=E,_(y)):ue(y)?(n.consume(y),E):(n.consume(y),$)}function W(y){return y===r?(n.consume(y),r=void 0,q):y===null?t(y):Y(y)?(o=W,_(y)):(n.consume(y),W)}function $(y){return y===null||y===34||y===39||y===60||y===61||y===96?t(y):y===47||y===62||ke(y)?I(y):(n.consume(y),$)}function q(y){return y===47||y===62||ke(y)?I(y):t(y)}function X(y){return y===62?(n.consume(y),n.exit("htmlTextData"),n.exit("htmlText"),e):t(y)}function _(y){return n.exit("htmlTextData"),n.enter("lineEnding"),n.consume(y),n.exit("lineEnding"),U}function U(y){return ue(y)?he(n,j,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(y):j(y)}function j(y){return n.enter("htmlTextData"),o(y)}}const Fa={name:"labelEnd",resolveAll:Ox,resolveTo:Rx,tokenize:zx},Dx={tokenize:Fx},Bx={tokenize:Nx},Lx={tokenize:qx};function Ox(n){let e=-1;const t=[];for(;++e<n.length;){const i=n[e][1];if(t.push(n[e]),i.type==="labelImage"||i.type==="labelLink"||i.type==="labelEnd"){const r=i.type==="labelImage"?4:2;i.type="data",e+=r}}return n.length!==t.length&&vt(n,0,n.length,t),n}function Rx(n,e){let t=n.length,i=0,r,s,o,l;for(;t--;)if(r=n[t][1],s){if(r.type==="link"||r.type==="labelLink"&&r._inactive)break;n[t][0]==="enter"&&r.type==="labelLink"&&(r._inactive=!0)}else if(o){if(n[t][0]==="enter"&&(r.type==="labelImage"||r.type==="labelLink")&&!r._balanced&&(s=t,r.type!=="labelLink")){i=2;break}}else r.type==="labelEnd"&&(o=t);const a={type:n[s][1].type==="labelLink"?"link":"image",start:{...n[s][1].start},end:{...n[n.length-1][1].end}},u={type:"label",start:{...n[s][1].start},end:{...n[o][1].end}},c={type:"labelText",start:{...n[s+i+2][1].end},end:{...n[o-2][1].start}};return l=[["enter",a,e],["enter",u,e]],l=At(l,n.slice(s+1,s+i+3)),l=At(l,[["enter",c,e]]),l=At(l,qs(e.parser.constructs.insideSpan.null,n.slice(s+i+4,o-3),e)),l=At(l,[["exit",c,e],n[o-2],n[o-1],["exit",u,e]]),l=At(l,n.slice(o+1)),l=At(l,[["exit",a,e]]),vt(n,s,n.length,l),n}function zx(n,e,t){const i=this;let r=i.events.length,s,o;for(;r--;)if((i.events[r][1].type==="labelImage"||i.events[r][1].type==="labelLink")&&!i.events[r][1]._balanced){s=i.events[r][1];break}return l;function l(f){return s?s._inactive?h(f):(o=i.parser.defined.includes(Rt(i.sliceSerialize({start:s.end,end:i.now()}))),n.enter("labelEnd"),n.enter("labelMarker"),n.consume(f),n.exit("labelMarker"),n.exit("labelEnd"),a):t(f)}function a(f){return f===40?n.attempt(Dx,c,o?c:h)(f):f===91?n.attempt(Bx,c,o?u:h)(f):o?c(f):h(f)}function u(f){return n.attempt(Lx,c,h)(f)}function c(f){return e(f)}function h(f){return s._balanced=!0,t(f)}}function Fx(n,e,t){return i;function i(h){return n.enter("resource"),n.enter("resourceMarker"),n.consume(h),n.exit("resourceMarker"),r}function r(h){return ke(h)?Ji(n,s)(h):s(h)}function s(h){return h===41?c(h):fp(n,o,l,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(h)}function o(h){return ke(h)?Ji(n,a)(h):c(h)}function l(h){return t(h)}function a(h){return h===34||h===39||h===40?pp(n,u,t,"resourceTitle","resourceTitleMarker","resourceTitleString")(h):c(h)}function u(h){return ke(h)?Ji(n,c)(h):c(h)}function c(h){return h===41?(n.enter("resourceMarker"),n.consume(h),n.exit("resourceMarker"),n.exit("resource"),e):t(h)}}function Nx(n,e,t){const i=this;return r;function r(l){return dp.call(i,n,s,o,"reference","referenceMarker","referenceString")(l)}function s(l){return i.parser.defined.includes(Rt(i.sliceSerialize(i.events[i.events.length-1][1]).slice(1,-1)))?e(l):t(l)}function o(l){return t(l)}}function qx(n,e,t){return i;function i(s){return n.enter("reference"),n.enter("referenceMarker"),n.consume(s),n.exit("referenceMarker"),r}function r(s){return s===93?(n.enter("referenceMarker"),n.consume(s),n.exit("referenceMarker"),n.exit("reference"),e):t(s)}}const Hx={name:"labelStartImage",resolveAll:Fa.resolveAll,tokenize:$x};function $x(n,e,t){const i=this;return r;function r(l){return n.enter("labelImage"),n.enter("labelImageMarker"),n.consume(l),n.exit("labelImageMarker"),s}function s(l){return l===91?(n.enter("labelMarker"),n.consume(l),n.exit("labelMarker"),n.exit("labelImage"),o):t(l)}function o(l){return l===94&&"_hiddenFootnoteSupport"in i.parser.constructs?t(l):e(l)}}const Wx={name:"labelStartLink",resolveAll:Fa.resolveAll,tokenize:Vx};function Vx(n,e,t){const i=this;return r;function r(o){return n.enter("labelLink"),n.enter("labelMarker"),n.consume(o),n.exit("labelMarker"),n.exit("labelLink"),s}function s(o){return o===94&&"_hiddenFootnoteSupport"in i.parser.constructs?t(o):e(o)}}const xo={name:"lineEnding",tokenize:Ux};function Ux(n,e){return t;function t(i){return n.enter("lineEnding"),n.consume(i),n.exit("lineEnding"),he(n,e,"linePrefix")}}const ss={name:"thematicBreak",tokenize:jx};function jx(n,e,t){let i=0,r;return s;function s(u){return n.enter("thematicBreak"),o(u)}function o(u){return r=u,l(u)}function l(u){return u===r?(n.enter("thematicBreakSequence"),a(u)):i>=3&&(u===null||Y(u))?(n.exit("thematicBreak"),e(u)):t(u)}function a(u){return u===r?(n.consume(u),i++,a):(n.exit("thematicBreakSequence"),ue(u)?he(n,l,"whitespace")(u):l(u))}}const at={continuation:{tokenize:Yx},exit:Jx,name:"list",tokenize:Gx},Kx={partial:!0,tokenize:Zx},Xx={partial:!0,tokenize:Qx};function Gx(n,e,t){const i=this,r=i.events[i.events.length-1];let s=r&&r[1].type==="linePrefix"?r[2].sliceSerialize(r[1],!0).length:0,o=0;return l;function l(d){const p=i.containerState.type||(d===42||d===43||d===45?"listUnordered":"listOrdered");if(p==="listUnordered"?!i.containerState.marker||d===i.containerState.marker:Bl(d)){if(i.containerState.type||(i.containerState.type=p,n.enter(p,{_container:!0})),p==="listUnordered")return n.enter("listItemPrefix"),d===42||d===45?n.check(ss,t,u)(d):u(d);if(!i.interrupt||d===49)return n.enter("listItemPrefix"),n.enter("listItemValue"),a(d)}return t(d)}function a(d){return Bl(d)&&++o<10?(n.consume(d),a):(!i.interrupt||o<2)&&(i.containerState.marker?d===i.containerState.marker:d===41||d===46)?(n.exit("listItemValue"),u(d)):t(d)}function u(d){return n.enter("listItemMarker"),n.consume(d),n.exit("listItemMarker"),i.containerState.marker=i.containerState.marker||d,n.check(kr,i.interrupt?t:c,n.attempt(Kx,f,h))}function c(d){return i.containerState.initialBlankLine=!0,s++,f(d)}function h(d){return ue(d)?(n.enter("listItemPrefixWhitespace"),n.consume(d),n.exit("listItemPrefixWhitespace"),f):t(d)}function f(d){return i.containerState.size=s+i.sliceSerialize(n.exit("listItemPrefix"),!0).length,e(d)}}function Yx(n,e,t){const i=this;return i.containerState._closeFlow=void 0,n.check(kr,r,s);function r(l){return i.containerState.furtherBlankLines=i.containerState.furtherBlankLines||i.containerState.initialBlankLine,he(n,e,"listItemIndent",i.containerState.size+1)(l)}function s(l){return i.containerState.furtherBlankLines||!ue(l)?(i.containerState.furtherBlankLines=void 0,i.containerState.initialBlankLine=void 0,o(l)):(i.containerState.furtherBlankLines=void 0,i.containerState.initialBlankLine=void 0,n.attempt(Xx,e,o)(l))}function o(l){return i.containerState._closeFlow=!0,i.interrupt=void 0,he(n,n.attempt(at,e,t),"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(l)}}function Qx(n,e,t){const i=this;return he(n,r,"listItemIndent",i.containerState.size+1);function r(s){const o=i.events[i.events.length-1];return o&&o[1].type==="listItemIndent"&&o[2].sliceSerialize(o[1],!0).length===i.containerState.size?e(s):t(s)}}function Jx(n){n.exit(this.containerState.type)}function Zx(n,e,t){const i=this;return he(n,r,"listItemPrefixWhitespace",i.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function r(s){const o=i.events[i.events.length-1];return!ue(s)&&o&&o[1].type==="listItemPrefixWhitespace"?e(s):t(s)}}const Fc={name:"setextUnderline",resolveTo:e3,tokenize:t3};function e3(n,e){let t=n.length,i,r,s;for(;t--;)if(n[t][0]==="enter"){if(n[t][1].type==="content"){i=t;break}n[t][1].type==="paragraph"&&(r=t)}else n[t][1].type==="content"&&n.splice(t,1),!s&&n[t][1].type==="definition"&&(s=t);const o={type:"setextHeading",start:{...n[i][1].start},end:{...n[n.length-1][1].end}};return n[r][1].type="setextHeadingText",s?(n.splice(r,0,["enter",o,e]),n.splice(s+1,0,["exit",n[i][1],e]),n[i][1].end={...n[s][1].end}):n[i][1]=o,n.push(["exit",o,e]),n}function t3(n,e,t){const i=this;let r;return s;function s(u){let c=i.events.length,h;for(;c--;)if(i.events[c][1].type!=="lineEnding"&&i.events[c][1].type!=="linePrefix"&&i.events[c][1].type!=="content"){h=i.events[c][1].type==="paragraph";break}return!i.parser.lazy[i.now().line]&&(i.interrupt||h)?(n.enter("setextHeadingLine"),r=u,o(u)):t(u)}function o(u){return n.enter("setextHeadingLineSequence"),l(u)}function l(u){return u===r?(n.consume(u),l):(n.exit("setextHeadingLineSequence"),ue(u)?he(n,a,"lineSuffix")(u):a(u))}function a(u){return u===null||Y(u)?(n.exit("setextHeadingLine"),e(u)):t(u)}}const n3={tokenize:i3};function i3(n){const e=this,t=n.attempt(kr,i,n.attempt(this.parser.constructs.flowInitial,r,he(n,n.attempt(this.parser.constructs.flow,r,n.attempt(ax,r)),"linePrefix")));return t;function i(s){if(s===null){n.consume(s);return}return n.enter("lineEndingBlank"),n.consume(s),n.exit("lineEndingBlank"),e.currentConstruct=void 0,t}function r(s){if(s===null){n.consume(s);return}return n.enter("lineEnding"),n.consume(s),n.exit("lineEnding"),e.currentConstruct=void 0,t}}const r3={resolveAll:gp()},s3=mp("string"),o3=mp("text");function mp(n){return{resolveAll:gp(n==="text"?l3:void 0),tokenize:e};function e(t){const i=this,r=this.parser.constructs[n],s=t.attempt(r,o,l);return o;function o(c){return u(c)?s(c):l(c)}function l(c){if(c===null){t.consume(c);return}return t.enter("data"),t.consume(c),a}function a(c){return u(c)?(t.exit("data"),s(c)):(t.consume(c),a)}function u(c){if(c===null)return!0;const h=r[c];let f=-1;if(h)for(;++f<h.length;){const d=h[f];if(!d.previous||d.previous.call(i,i.previous))return!0}return!1}}}function gp(n){return e;function e(t,i){let r=-1,s;for(;++r<=t.length;)s===void 0?t[r]&&t[r][1].type==="data"&&(s=r,r++):(!t[r]||t[r][1].type!=="data")&&(r!==s+2&&(t[s][1].end=t[r-1][1].end,t.splice(s+2,r-s-2),r=s+2),s=void 0);return n?n(t,i):t}}function l3(n,e){let t=0;for(;++t<=n.length;)if((t===n.length||n[t][1].type==="lineEnding")&&n[t-1][1].type==="data"){const i=n[t-1][1],r=e.sliceStream(i);let s=r.length,o=-1,l=0,a;for(;s--;){const u=r[s];if(typeof u=="string"){for(o=u.length;u.charCodeAt(o-1)===32;)l++,o--;if(o)break;o=-1}else if(u===-2)a=!0,l++;else if(u!==-1){s++;break}}if(e._contentTypeTextTrailing&&t===n.length&&(l=0),l){const u={type:t===n.length||a||l<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:s?o:i.start._bufferIndex+o,_index:i.start._index+s,line:i.end.line,column:i.end.column-l,offset:i.end.offset-l},end:{...i.end}};i.end={...u.start},i.start.offset===i.end.offset?Object.assign(i,u):(n.splice(t,0,["enter",u,e],["exit",u,e]),t+=2)}t++}return n}const a3={42:at,43:at,45:at,48:at,49:at,50:at,51:at,52:at,53:at,54:at,55:at,56:at,57:at,62:ap},u3={91:dx},c3={[-2]:ko,[-1]:ko,32:ko},h3={35:wx,42:ss,45:[Fc,ss],60:Sx,61:Fc,95:ss,96:Rc,126:Rc},f3={38:cp,92:up},d3={[-5]:xo,[-4]:xo,[-3]:xo,33:Hx,38:cp,42:Ll,60:[Wk,Px],91:Wx,92:[bx,up],93:Fa,95:Ll,96:nx},p3={null:[Ll,r3]},m3={null:[42,95]},g3={null:[]},b3=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:m3,contentInitial:u3,disable:g3,document:a3,flow:h3,flowInitial:c3,insideSpan:p3,string:f3,text:d3},Symbol.toStringTag,{value:"Module"}));function y3(n,e,t){let i={_bufferIndex:-1,_index:0,line:t&&t.line||1,column:t&&t.column||1,offset:t&&t.offset||0};const r={},s=[];let o=[],l=[];const a={attempt:T(A),check:T(k),consume:S,enter:v,exit:D,interrupt:T(k,{interrupt:!0})},u={code:null,containerState:{},defineSkip:m,events:[],now:p,parser:n,previous:null,sliceSerialize:f,sliceStream:d,write:h};let c=e.tokenize.call(u,a);return e.resolveAll&&s.push(e),u;function h(P){return o=At(o,P),b(),o[o.length-1]!==null?[]:(B(e,0),u.events=qs(s,u.events,u),u.events)}function f(P,E){return k3(d(P),E)}function d(P){return w3(o,P)}function p(){const{_bufferIndex:P,_index:E,line:W,column:$,offset:q}=i;return{_bufferIndex:P,_index:E,line:W,column:$,offset:q}}function m(P){r[P.line]=P.column,x()}function b(){let P;for(;i._index<o.length;){const E=o[i._index];if(typeof E=="string")for(P=i._index,i._bufferIndex<0&&(i._bufferIndex=0);i._index===P&&i._bufferIndex<E.length;)g(E.charCodeAt(i._bufferIndex));else g(E)}}function g(P){c=c(P)}function S(P){Y(P)?(i.line++,i.column=1,i.offset+=P===-3?2:1,x()):P!==-1&&(i.column++,i.offset++),i._bufferIndex<0?i._index++:(i._bufferIndex++,i._bufferIndex===o[i._index].length&&(i._bufferIndex=-1,i._index++)),u.previous=P}function v(P,E){const W=E||{};return W.type=P,W.start=p(),u.events.push(["enter",W,u]),l.push(W),W}function D(P){const E=l.pop();return E.end=p(),u.events.push(["exit",E,u]),E}function A(P,E){B(P,E.from)}function k(P,E){E.restore()}function T(P,E){return W;function W($,q,X){let _,U,j,y;return Array.isArray($)?ne($):"tokenize"in $?ne([$]):re($);function re(ie){return Me;function Me(Ae){const Pe=Ae!==null&&ie[Ae],Re=Ae!==null&&ie.null,Qe=[...Array.isArray(Pe)?Pe:Pe?[Pe]:[],...Array.isArray(Re)?Re:Re?[Re]:[]];return ne(Qe)(Ae)}}function ne(ie){return _=ie,U=0,ie.length===0?X:w(ie[U])}function w(ie){return Me;function Me(Ae){return y=I(),j=ie,ie.partial||(u.currentConstruct=ie),ie.name&&u.parser.constructs.disable.null.includes(ie.name)?Q():ie.tokenize.call(E?Object.assign(Object.create(u),E):u,a,oe,Q)(Ae)}}function oe(ie){return P(j,y),q}function Q(ie){return y.restore(),++U<_.length?w(_[U]):X}}}function B(P,E){P.resolveAll&&!s.includes(P)&&s.push(P),P.resolve&&vt(u.events,E,u.events.length-E,P.resolve(u.events.slice(E),u)),P.resolveTo&&(u.events=P.resolveTo(u.events,u))}function I(){const P=p(),E=u.previous,W=u.currentConstruct,$=u.events.length,q=Array.from(l);return{from:$,restore:X};function X(){i=P,u.previous=E,u.currentConstruct=W,u.events.length=$,l=q,x()}}function x(){i.line in r&&i.column<2&&(i.column=r[i.line],i.offset+=r[i.line]-1)}}function w3(n,e){const t=e.start._index,i=e.start._bufferIndex,r=e.end._index,s=e.end._bufferIndex;let o;if(t===r)o=[n[t].slice(i,s)];else{if(o=n.slice(t,r),i>-1){const l=o[0];typeof l=="string"?o[0]=l.slice(i):o.shift()}s>0&&o.push(n[r].slice(0,s))}return o}function k3(n,e){let t=-1;const i=[];let r;for(;++t<n.length;){const s=n[t];let o;if(typeof s=="string")o=s;else switch(s){case-5:{o="\r";break}case-4:{o=`
`;break}case-3:{o=`\r
`;break}case-2:{o=e?" ":"	";break}case-1:{if(!e&&r)continue;o=" ";break}default:o=String.fromCharCode(s)}r=s===-2,i.push(o)}return i.join("")}function x3(n){const i={constructs:op([b3,...(n||{}).extensions||[]]),content:r(Rk),defined:[],document:r(Fk),flow:r(n3),lazy:{},string:r(s3),text:r(o3)};return i;function r(s){return o;function o(l){return y3(i,s,l)}}}function v3(n){for(;!hp(n););return n}const Nc=/[\0\t\n\r]/g;function S3(){let n=1,e="",t=!0,i;return r;function r(s,o,l){const a=[];let u,c,h,f,d;for(s=e+(typeof s=="string"?s.toString():new TextDecoder(o||void 0).decode(s)),h=0,e="",t&&(s.charCodeAt(0)===65279&&h++,t=void 0);h<s.length;){if(Nc.lastIndex=h,u=Nc.exec(s),f=u&&u.index!==void 0?u.index:s.length,d=s.charCodeAt(f),!u){e=s.slice(h);break}if(d===10&&h===f&&i)a.push(-3),i=void 0;else switch(i&&(a.push(-5),i=void 0),h<f&&(a.push(s.slice(h,f)),n+=f-h),d){case 0:{a.push(65533),n++;break}case 9:{for(c=Math.ceil(n/4)*4,a.push(-2);n++<c;)a.push(-1);break}case 10:{a.push(-4),n=1;break}default:i=!0,n=1}h=f+1}return l&&(i&&a.push(-5),e&&a.push(e),a.push(null)),a}}const _3=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function bp(n){return n.replace(_3,C3)}function C3(n,e,t){if(e)return e;if(t.charCodeAt(0)===35){const r=t.charCodeAt(1),s=r===120||r===88;return lp(t.slice(s?2:1),s?16:10)}return za(t)||n}function Zi(n){return!n||typeof n!="object"?"":"position"in n||"type"in n?qc(n.position):"start"in n||"end"in n?qc(n):"line"in n||"column"in n?Ol(n):""}function Ol(n){return Hc(n&&n.line)+":"+Hc(n&&n.column)}function qc(n){return Ol(n&&n.start)+"-"+Ol(n&&n.end)}function Hc(n){return n&&typeof n=="number"?n:1}const yp={}.hasOwnProperty;function A3(n,e,t){return e&&typeof e=="object"&&(t=e,e=void 0),T3(t)(v3(x3(t).document().write(S3()(n,e,!0))))}function T3(n){const e={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:s(rt),autolinkProtocol:I,autolinkEmail:I,atxHeading:s(R),blockQuote:s(Re),characterEscape:I,characterReference:I,codeFenced:s(Qe),codeFencedFenceInfo:o,codeFencedFenceMeta:o,codeIndented:s(Qe,o),codeText:s(ze,o),codeTextData:I,data:I,codeFlowValue:I,definition:s(it),definitionDestinationString:o,definitionLabelString:o,definitionTitleString:o,emphasis:s(gt),hardBreakEscape:s(be),hardBreakTrailing:s(be),htmlFlow:s(Te,o),htmlFlowData:I,htmlText:s(Te,o),htmlTextData:I,image:s(He),label:o,link:s(rt),listItem:s(St),listItemValue:f,listOrdered:s(st,h),listUnordered:s(st),paragraph:s(Ue),reference:w,referenceString:o,resourceDestinationString:o,resourceTitleString:o,setextHeading:s(R),strong:s(Mi),thematicBreak:s(Gn)},exit:{atxHeading:a(),atxHeadingSequence:A,autolink:a(),autolinkEmail:Pe,autolinkProtocol:Ae,blockQuote:a(),characterEscapeValue:x,characterReferenceMarkerHexadecimal:Q,characterReferenceMarkerNumeric:Q,characterReferenceValue:ie,characterReference:Me,codeFenced:a(b),codeFencedFence:m,codeFencedFenceInfo:d,codeFencedFenceMeta:p,codeFlowValue:x,codeIndented:a(g),codeText:a(q),codeTextData:x,data:x,definition:a(),definitionDestinationString:D,definitionLabelString:S,definitionTitleString:v,emphasis:a(),hardBreakEscape:a(E),hardBreakTrailing:a(E),htmlFlow:a(W),htmlFlowData:x,htmlText:a($),htmlTextData:x,image:a(_),label:j,labelText:U,lineEnding:P,link:a(X),listItem:a(),listOrdered:a(),listUnordered:a(),paragraph:a(),referenceString:oe,resourceDestinationString:y,resourceTitleString:re,resource:ne,setextHeading:a(B),setextHeadingLineSequence:T,setextHeadingText:k,strong:a(),thematicBreak:a()}};wp(e,(n||{}).mdastExtensions||[]);const t={};return i;function i(M){let F={type:"root",children:[]};const Z={stack:[F],tokenStack:[],config:e,enter:l,exit:u,buffer:o,resume:c,data:t},le=[];let me=-1;for(;++me<M.length;)if(M[me][1].type==="listOrdered"||M[me][1].type==="listUnordered")if(M[me][0]==="enter")le.push(me);else{const ot=le.pop();me=r(M,ot,me)}for(me=-1;++me<M.length;){const ot=e[M[me][0]];yp.call(ot,M[me][1].type)&&ot[M[me][1].type].call(Object.assign({sliceSerialize:M[me][2].sliceSerialize},Z),M[me][1])}if(Z.tokenStack.length>0){const ot=Z.tokenStack[Z.tokenStack.length-1];(ot[1]||$c).call(Z,void 0,ot[0])}for(F.position={start:pn(M.length>0?M[0][1].start:{line:1,column:1,offset:0}),end:pn(M.length>0?M[M.length-2][1].end:{line:1,column:1,offset:0})},me=-1;++me<e.transforms.length;)F=e.transforms[me](F)||F;return F}function r(M,F,Z){let le=F-1,me=-1,ot=!1,rn,_t,L,N;for(;++le<=Z;){const ee=M[le];switch(ee[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{ee[0]==="enter"?me++:me--,N=void 0;break}case"lineEndingBlank":{ee[0]==="enter"&&(rn&&!N&&!me&&!L&&(L=le),N=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:N=void 0}if(!me&&ee[0]==="enter"&&ee[1].type==="listItemPrefix"||me===-1&&ee[0]==="exit"&&(ee[1].type==="listUnordered"||ee[1].type==="listOrdered")){if(rn){let ge=le;for(_t=void 0;ge--;){const Je=M[ge];if(Je[1].type==="lineEnding"||Je[1].type==="lineEndingBlank"){if(Je[0]==="exit")continue;_t&&(M[_t][1].type="lineEndingBlank",ot=!0),Je[1].type="lineEnding",_t=ge}else if(!(Je[1].type==="linePrefix"||Je[1].type==="blockQuotePrefix"||Je[1].type==="blockQuotePrefixWhitespace"||Je[1].type==="blockQuoteMarker"||Je[1].type==="listItemIndent"))break}L&&(!_t||L<_t)&&(rn._spread=!0),rn.end=Object.assign({},_t?M[_t][1].start:ee[1].end),M.splice(_t||le,0,["exit",rn,ee[2]]),le++,Z++}if(ee[1].type==="listItemPrefix"){const ge={type:"listItem",_spread:!1,start:Object.assign({},ee[1].start),end:void 0};rn=ge,M.splice(le,0,["enter",ge,ee[2]]),le++,Z++,L=void 0,N=!0}}}return M[F][1]._spread=ot,Z}function s(M,F){return Z;function Z(le){l.call(this,M(le),le),F&&F.call(this,le)}}function o(){this.stack.push({type:"fragment",children:[]})}function l(M,F,Z){this.stack[this.stack.length-1].children.push(M),this.stack.push(M),this.tokenStack.push([F,Z||void 0]),M.position={start:pn(F.start),end:void 0}}function a(M){return F;function F(Z){M&&M.call(this,Z),u.call(this,Z)}}function u(M,F){const Z=this.stack.pop(),le=this.tokenStack.pop();if(le)le[0].type!==M.type&&(F?F.call(this,M,le[0]):(le[1]||$c).call(this,M,le[0]));else throw new Error("Cannot close `"+M.type+"` ("+Zi({start:M.start,end:M.end})+"): it’s not open");Z.position.end=pn(M.end)}function c(){return Ra(this.stack.pop())}function h(){this.data.expectingFirstListItemValue=!0}function f(M){if(this.data.expectingFirstListItemValue){const F=this.stack[this.stack.length-2];F.start=Number.parseInt(this.sliceSerialize(M),10),this.data.expectingFirstListItemValue=void 0}}function d(){const M=this.resume(),F=this.stack[this.stack.length-1];F.lang=M}function p(){const M=this.resume(),F=this.stack[this.stack.length-1];F.meta=M}function m(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function b(){const M=this.resume(),F=this.stack[this.stack.length-1];F.value=M.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function g(){const M=this.resume(),F=this.stack[this.stack.length-1];F.value=M.replace(/(\r?\n|\r)$/g,"")}function S(M){const F=this.resume(),Z=this.stack[this.stack.length-1];Z.label=F,Z.identifier=Rt(this.sliceSerialize(M)).toLowerCase()}function v(){const M=this.resume(),F=this.stack[this.stack.length-1];F.title=M}function D(){const M=this.resume(),F=this.stack[this.stack.length-1];F.url=M}function A(M){const F=this.stack[this.stack.length-1];if(!F.depth){const Z=this.sliceSerialize(M).length;F.depth=Z}}function k(){this.data.setextHeadingSlurpLineEnding=!0}function T(M){const F=this.stack[this.stack.length-1];F.depth=this.sliceSerialize(M).codePointAt(0)===61?1:2}function B(){this.data.setextHeadingSlurpLineEnding=void 0}function I(M){const Z=this.stack[this.stack.length-1].children;let le=Z[Z.length-1];(!le||le.type!=="text")&&(le=Pi(),le.position={start:pn(M.start),end:void 0},Z.push(le)),this.stack.push(le)}function x(M){const F=this.stack.pop();F.value+=this.sliceSerialize(M),F.position.end=pn(M.end)}function P(M){const F=this.stack[this.stack.length-1];if(this.data.atHardBreak){const Z=F.children[F.children.length-1];Z.position.end=pn(M.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&e.canContainEols.includes(F.type)&&(I.call(this,M),x.call(this,M))}function E(){this.data.atHardBreak=!0}function W(){const M=this.resume(),F=this.stack[this.stack.length-1];F.value=M}function $(){const M=this.resume(),F=this.stack[this.stack.length-1];F.value=M}function q(){const M=this.resume(),F=this.stack[this.stack.length-1];F.value=M}function X(){const M=this.stack[this.stack.length-1];if(this.data.inReference){const F=this.data.referenceType||"shortcut";M.type+="Reference",M.referenceType=F,delete M.url,delete M.title}else delete M.identifier,delete M.label;this.data.referenceType=void 0}function _(){const M=this.stack[this.stack.length-1];if(this.data.inReference){const F=this.data.referenceType||"shortcut";M.type+="Reference",M.referenceType=F,delete M.url,delete M.title}else delete M.identifier,delete M.label;this.data.referenceType=void 0}function U(M){const F=this.sliceSerialize(M),Z=this.stack[this.stack.length-2];Z.label=bp(F),Z.identifier=Rt(F).toLowerCase()}function j(){const M=this.stack[this.stack.length-1],F=this.resume(),Z=this.stack[this.stack.length-1];if(this.data.inReference=!0,Z.type==="link"){const le=M.children;Z.children=le}else Z.alt=F}function y(){const M=this.resume(),F=this.stack[this.stack.length-1];F.url=M}function re(){const M=this.resume(),F=this.stack[this.stack.length-1];F.title=M}function ne(){this.data.inReference=void 0}function w(){this.data.referenceType="collapsed"}function oe(M){const F=this.resume(),Z=this.stack[this.stack.length-1];Z.label=F,Z.identifier=Rt(this.sliceSerialize(M)).toLowerCase(),this.data.referenceType="full"}function Q(M){this.data.characterReferenceType=M.type}function ie(M){const F=this.sliceSerialize(M),Z=this.data.characterReferenceType;let le;Z?(le=lp(F,Z==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):le=za(F);const me=this.stack[this.stack.length-1];me.value+=le}function Me(M){const F=this.stack.pop();F.position.end=pn(M.end)}function Ae(M){x.call(this,M);const F=this.stack[this.stack.length-1];F.url=this.sliceSerialize(M)}function Pe(M){x.call(this,M);const F=this.stack[this.stack.length-1];F.url="mailto:"+this.sliceSerialize(M)}function Re(){return{type:"blockquote",children:[]}}function Qe(){return{type:"code",lang:null,meta:null,value:""}}function ze(){return{type:"inlineCode",value:""}}function it(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function gt(){return{type:"emphasis",children:[]}}function R(){return{type:"heading",depth:0,children:[]}}function be(){return{type:"break"}}function Te(){return{type:"html",value:""}}function He(){return{type:"image",title:null,url:"",alt:null}}function rt(){return{type:"link",title:null,url:"",children:[]}}function st(M){return{type:"list",ordered:M.type==="listOrdered",start:null,spread:M._spread,children:[]}}function St(M){return{type:"listItem",spread:M._spread,checked:null,children:[]}}function Ue(){return{type:"paragraph",children:[]}}function Mi(){return{type:"strong",children:[]}}function Pi(){return{type:"text",value:""}}function Gn(){return{type:"thematicBreak"}}}function pn(n){return{line:n.line,column:n.column,offset:n.offset}}function wp(n,e){let t=-1;for(;++t<e.length;){const i=e[t];Array.isArray(i)?wp(n,i):E3(n,i)}}function E3(n,e){let t;for(t in e)if(yp.call(e,t))switch(t){case"canContainEols":{const i=e[t];i&&n[t].push(...i);break}case"transforms":{const i=e[t];i&&n[t].push(...i);break}case"enter":case"exit":{const i=e[t];i&&Object.assign(n[t],i);break}}}function $c(n,e){throw n?new Error("Cannot close `"+n.type+"` ("+Zi({start:n.start,end:n.end})+"): a different token (`"+e.type+"`, "+Zi({start:e.start,end:e.end})+") is open"):new Error("Cannot close document, a token (`"+e.type+"`, "+Zi({start:e.start,end:e.end})+") is still open")}function M3(n){const e=this;e.parser=t;function t(i){return A3(i,{...e.data("settings"),...n,extensions:e.data("micromarkExtensions")||[],mdastExtensions:e.data("fromMarkdownExtensions")||[]})}}const Wc={}.hasOwnProperty;function kp(n,e){const t=e||{};function i(r,...s){let o=i.invalid;const l=i.handlers;if(r&&Wc.call(r,n)){const a=String(r[n]);o=Wc.call(l,a)?l[a]:i.unknown}if(o)return o.call(this,r,...s)}return i.handlers=t.handlers||{},i.invalid=t.invalid,i.unknown=t.unknown,i}const P3={}.hasOwnProperty;function xp(n,e){let t=-1,i;if(e.extensions)for(;++t<e.extensions.length;)xp(n,e.extensions[t]);for(i in e)if(P3.call(e,i))switch(i){case"extensions":break;case"unsafe":{Vc(n[i],e[i]);break}case"join":{Vc(n[i],e[i]);break}case"handlers":{I3(n[i],e[i]);break}default:n.options[i]=e[i]}return n}function Vc(n,e){e&&n.push(...e)}function I3(n,e){e&&Object.assign(n,e)}function D3(n,e,t,i){const r=t.enter("blockquote"),s=t.createTracker(i);s.move("> "),s.shift(2);const o=t.indentLines(t.containerFlow(n,s.current()),B3);return r(),o}function B3(n,e,t){return">"+(t?"":" ")+n}function vp(n,e){return Uc(n,e.inConstruct,!0)&&!Uc(n,e.notInConstruct,!1)}function Uc(n,e,t){if(typeof e=="string"&&(e=[e]),!e||e.length===0)return t;let i=-1;for(;++i<e.length;)if(n.includes(e[i]))return!0;return!1}function jc(n,e,t,i){let r=-1;for(;++r<t.unsafe.length;)if(t.unsafe[r].character===`
`&&vp(t.stack,t.unsafe[r]))return/[ \t]/.test(i.before)?"":" ";return`\\
`}function L3(n,e){const t=String(n);let i=t.indexOf(e),r=i,s=0,o=0;if(typeof e!="string")throw new TypeError("Expected substring");for(;i!==-1;)i===r?++s>o&&(o=s):s=1,r=i+e.length,i=t.indexOf(e,r);return o}function Rl(n,e){return!!(e.options.fences===!1&&n.value&&!n.lang&&/[^ \r\n]/.test(n.value)&&!/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(n.value))}function O3(n){const e=n.options.fence||"`";if(e!=="`"&&e!=="~")throw new Error("Cannot serialize code with `"+e+"` for `options.fence`, expected `` ` `` or `~`");return e}function R3(n,e,t,i){const r=O3(t),s=n.value||"",o=r==="`"?"GraveAccent":"Tilde";if(Rl(n,t)){const h=t.enter("codeIndented"),f=t.indentLines(s,z3);return h(),f}const l=t.createTracker(i),a=r.repeat(Math.max(L3(s,r)+1,3)),u=t.enter("codeFenced");let c=l.move(a);if(n.lang){const h=t.enter(`codeFencedLang${o}`);c+=l.move(t.safe(n.lang,{before:c,after:" ",encode:["`"],...l.current()})),h()}if(n.lang&&n.meta){const h=t.enter(`codeFencedMeta${o}`);c+=l.move(" "),c+=l.move(t.safe(n.meta,{before:c,after:`
`,encode:["`"],...l.current()})),h()}return c+=l.move(`
`),s&&(c+=l.move(s+`
`)),c+=l.move(a),u(),c}function z3(n,e,t){return(t?"":"    ")+n}function Na(n){const e=n.options.quote||'"';if(e!=='"'&&e!=="'")throw new Error("Cannot serialize title with `"+e+"` for `options.quote`, expected `\"`, or `'`");return e}function F3(n,e,t,i){const r=Na(t),s=r==='"'?"Quote":"Apostrophe",o=t.enter("definition");let l=t.enter("label");const a=t.createTracker(i);let u=a.move("[");return u+=a.move(t.safe(t.associationId(n),{before:u,after:"]",...a.current()})),u+=a.move("]: "),l(),!n.url||/[\0- \u007F]/.test(n.url)?(l=t.enter("destinationLiteral"),u+=a.move("<"),u+=a.move(t.safe(n.url,{before:u,after:">",...a.current()})),u+=a.move(">")):(l=t.enter("destinationRaw"),u+=a.move(t.safe(n.url,{before:u,after:n.title?" ":`
`,...a.current()}))),l(),n.title&&(l=t.enter(`title${s}`),u+=a.move(" "+r),u+=a.move(t.safe(n.title,{before:u,after:r,...a.current()})),u+=a.move(r),l()),o(),u}function N3(n){const e=n.options.emphasis||"*";if(e!=="*"&&e!=="_")throw new Error("Cannot serialize emphasis with `"+e+"` for `options.emphasis`, expected `*`, or `_`");return e}function An(n){return"&#x"+n.toString(16).toUpperCase()+";"}function xs(n,e,t){const i=Ci(n),r=Ci(e);return i===void 0?r===void 0?t==="_"?{inside:!0,outside:!0}:{inside:!1,outside:!1}:r===1?{inside:!0,outside:!0}:{inside:!1,outside:!0}:i===1?r===void 0?{inside:!1,outside:!1}:r===1?{inside:!0,outside:!0}:{inside:!1,outside:!1}:r===void 0?{inside:!1,outside:!1}:r===1?{inside:!0,outside:!1}:{inside:!1,outside:!1}}Sp.peek=q3;function Sp(n,e,t,i){const r=N3(t),s=t.enter("emphasis"),o=t.createTracker(i),l=o.move(r);let a=o.move(t.containerPhrasing(n,{after:r,before:l,...o.current()}));const u=a.charCodeAt(0),c=xs(i.before.charCodeAt(i.before.length-1),u,r);c.inside&&(a=An(u)+a.slice(1));const h=a.charCodeAt(a.length-1),f=xs(i.after.charCodeAt(0),h,r);f.inside&&(a=a.slice(0,-1)+An(h));const d=o.move(r);return s(),t.attentionEncodeSurroundingInfo={after:f.outside,before:c.outside},l+a+d}function q3(n,e,t){return t.options.emphasis||"*"}const Hs=(function(n){if(n==null)return V3;if(typeof n=="function")return $s(n);if(typeof n=="object")return Array.isArray(n)?H3(n):$3(n);if(typeof n=="string")return W3(n);throw new Error("Expected function, string, or object as test")});function H3(n){const e=[];let t=-1;for(;++t<n.length;)e[t]=Hs(n[t]);return $s(i);function i(...r){let s=-1;for(;++s<e.length;)if(e[s].apply(this,r))return!0;return!1}}function $3(n){const e=n;return $s(t);function t(i){const r=i;let s;for(s in n)if(r[s]!==e[s])return!1;return!0}}function W3(n){return $s(e);function e(t){return t&&t.type===n}}function $s(n){return e;function e(t,i,r){return!!(U3(t)&&n.call(this,t,typeof i=="number"?i:void 0,r||void 0))}}function V3(){return!0}function U3(n){return n!==null&&typeof n=="object"&&"type"in n}const _p=[],j3=!0,zl=!1,K3="skip";function Cp(n,e,t,i){let r;typeof e=="function"&&typeof t!="function"?(i=t,t=e):r=e;const s=Hs(r),o=i?-1:1;l(n,void 0,[])();function l(a,u,c){const h=a&&typeof a=="object"?a:{};if(typeof h.type=="string"){const d=typeof h.tagName=="string"?h.tagName:typeof h.name=="string"?h.name:void 0;Object.defineProperty(f,"name",{value:"node ("+(a.type+(d?"<"+d+">":""))+")"})}return f;function f(){let d=_p,p,m,b;if((!e||s(a,u,c[c.length-1]||void 0))&&(d=X3(t(a,c)),d[0]===zl))return d;if("children"in a&&a.children){const g=a;if(g.children&&d[0]!==K3)for(m=(i?g.children.length:-1)+o,b=c.concat(g);m>-1&&m<g.children.length;){const S=g.children[m];if(p=l(S,m,b)(),p[0]===zl)return p;m=typeof p[1]=="number"?p[1]:m+o}}return d}}}function X3(n){return Array.isArray(n)?n:typeof n=="number"?[j3,n]:n==null?_p:[n]}function Ap(n,e,t,i){let r,s,o;typeof e=="function"&&typeof t!="function"?(s=void 0,o=e,r=t):(s=e,o=t,r=i),Cp(n,s,l,r);function l(a,u){const c=u[u.length-1],h=c?c.children.indexOf(a):void 0;return o(a,h,c)}}function Tp(n,e){let t=!1;return Ap(n,function(i){if("value"in i&&/\r?\n|\r/.test(i.value)||i.type==="break")return t=!0,zl}),!!((!n.depth||n.depth<3)&&Ra(n)&&(e.options.setext||t))}function G3(n,e,t,i){const r=Math.max(Math.min(6,n.depth||1),1),s=t.createTracker(i);if(Tp(n,t)){const c=t.enter("headingSetext"),h=t.enter("phrasing"),f=t.containerPhrasing(n,{...s.current(),before:`
`,after:`
`});return h(),c(),f+`
`+(r===1?"=":"-").repeat(f.length-(Math.max(f.lastIndexOf("\r"),f.lastIndexOf(`
`))+1))}const o="#".repeat(r),l=t.enter("headingAtx"),a=t.enter("phrasing");s.move(o+" ");let u=t.containerPhrasing(n,{before:"# ",after:`
`,...s.current()});return/^[\t ]/.test(u)&&(u=An(u.charCodeAt(0))+u.slice(1)),u=u?o+" "+u:o,t.options.closeAtx&&(u+=" "+o),a(),l(),u}Ep.peek=Y3;function Ep(n){return n.value||""}function Y3(){return"<"}Mp.peek=Q3;function Mp(n,e,t,i){const r=Na(t),s=r==='"'?"Quote":"Apostrophe",o=t.enter("image");let l=t.enter("label");const a=t.createTracker(i);let u=a.move("![");return u+=a.move(t.safe(n.alt,{before:u,after:"]",...a.current()})),u+=a.move("]("),l(),!n.url&&n.title||/[\0- \u007F]/.test(n.url)?(l=t.enter("destinationLiteral"),u+=a.move("<"),u+=a.move(t.safe(n.url,{before:u,after:">",...a.current()})),u+=a.move(">")):(l=t.enter("destinationRaw"),u+=a.move(t.safe(n.url,{before:u,after:n.title?" ":")",...a.current()}))),l(),n.title&&(l=t.enter(`title${s}`),u+=a.move(" "+r),u+=a.move(t.safe(n.title,{before:u,after:r,...a.current()})),u+=a.move(r),l()),u+=a.move(")"),o(),u}function Q3(){return"!"}Pp.peek=J3;function Pp(n,e,t,i){const r=n.referenceType,s=t.enter("imageReference");let o=t.enter("label");const l=t.createTracker(i);let a=l.move("![");const u=t.safe(n.alt,{before:a,after:"]",...l.current()});a+=l.move(u+"]["),o();const c=t.stack;t.stack=[],o=t.enter("reference");const h=t.safe(t.associationId(n),{before:a,after:"]",...l.current()});return o(),t.stack=c,s(),r==="full"||!u||u!==h?a+=l.move(h+"]"):r==="shortcut"?a=a.slice(0,-1):a+=l.move("]"),a}function J3(){return"!"}Ip.peek=Z3;function Ip(n,e,t){let i=n.value||"",r="`",s=-1;for(;new RegExp("(^|[^`])"+r+"([^`]|$)").test(i);)r+="`";for(/[^ \r\n]/.test(i)&&(/^[ \r\n]/.test(i)&&/[ \r\n]$/.test(i)||/^`|`$/.test(i))&&(i=" "+i+" ");++s<t.unsafe.length;){const o=t.unsafe[s],l=t.compilePattern(o);let a;if(o.atBreak)for(;a=l.exec(i);){let u=a.index;i.charCodeAt(u)===10&&i.charCodeAt(u-1)===13&&u--,i=i.slice(0,u)+" "+i.slice(a.index+1)}}return r+i+r}function Z3(){return"`"}function Dp(n,e){const t=Ra(n);return!!(!e.options.resourceLink&&n.url&&!n.title&&n.children&&n.children.length===1&&n.children[0].type==="text"&&(t===n.url||"mailto:"+t===n.url)&&/^[a-z][a-z+.-]+:/i.test(n.url)&&!/[\0- <>\u007F]/.test(n.url))}Bp.peek=ev;function Bp(n,e,t,i){const r=Na(t),s=r==='"'?"Quote":"Apostrophe",o=t.createTracker(i);let l,a;if(Dp(n,t)){const c=t.stack;t.stack=[],l=t.enter("autolink");let h=o.move("<");return h+=o.move(t.containerPhrasing(n,{before:h,after:">",...o.current()})),h+=o.move(">"),l(),t.stack=c,h}l=t.enter("link"),a=t.enter("label");let u=o.move("[");return u+=o.move(t.containerPhrasing(n,{before:u,after:"](",...o.current()})),u+=o.move("]("),a(),!n.url&&n.title||/[\0- \u007F]/.test(n.url)?(a=t.enter("destinationLiteral"),u+=o.move("<"),u+=o.move(t.safe(n.url,{before:u,after:">",...o.current()})),u+=o.move(">")):(a=t.enter("destinationRaw"),u+=o.move(t.safe(n.url,{before:u,after:n.title?" ":")",...o.current()}))),a(),n.title&&(a=t.enter(`title${s}`),u+=o.move(" "+r),u+=o.move(t.safe(n.title,{before:u,after:r,...o.current()})),u+=o.move(r),a()),u+=o.move(")"),l(),u}function ev(n,e,t){return Dp(n,t)?"<":"["}Lp.peek=tv;function Lp(n,e,t,i){const r=n.referenceType,s=t.enter("linkReference");let o=t.enter("label");const l=t.createTracker(i);let a=l.move("[");const u=t.containerPhrasing(n,{before:a,after:"]",...l.current()});a+=l.move(u+"]["),o();const c=t.stack;t.stack=[],o=t.enter("reference");const h=t.safe(t.associationId(n),{before:a,after:"]",...l.current()});return o(),t.stack=c,s(),r==="full"||!u||u!==h?a+=l.move(h+"]"):r==="shortcut"?a=a.slice(0,-1):a+=l.move("]"),a}function tv(){return"["}function qa(n){const e=n.options.bullet||"*";if(e!=="*"&&e!=="+"&&e!=="-")throw new Error("Cannot serialize items with `"+e+"` for `options.bullet`, expected `*`, `+`, or `-`");return e}function nv(n){const e=qa(n),t=n.options.bulletOther;if(!t)return e==="*"?"-":"*";if(t!=="*"&&t!=="+"&&t!=="-")throw new Error("Cannot serialize items with `"+t+"` for `options.bulletOther`, expected `*`, `+`, or `-`");if(t===e)throw new Error("Expected `bullet` (`"+e+"`) and `bulletOther` (`"+t+"`) to be different");return t}function iv(n){const e=n.options.bulletOrdered||".";if(e!=="."&&e!==")")throw new Error("Cannot serialize items with `"+e+"` for `options.bulletOrdered`, expected `.` or `)`");return e}function Op(n){const e=n.options.rule||"*";if(e!=="*"&&e!=="-"&&e!=="_")throw new Error("Cannot serialize rules with `"+e+"` for `options.rule`, expected `*`, `-`, or `_`");return e}function rv(n,e,t,i){const r=t.enter("list"),s=t.bulletCurrent;let o=n.ordered?iv(t):qa(t);const l=n.ordered?o==="."?")":".":nv(t);let a=e&&t.bulletLastUsed?o===t.bulletLastUsed:!1;if(!n.ordered){const c=n.children?n.children[0]:void 0;if((o==="*"||o==="-")&&c&&(!c.children||!c.children[0])&&t.stack[t.stack.length-1]==="list"&&t.stack[t.stack.length-2]==="listItem"&&t.stack[t.stack.length-3]==="list"&&t.stack[t.stack.length-4]==="listItem"&&t.indexStack[t.indexStack.length-1]===0&&t.indexStack[t.indexStack.length-2]===0&&t.indexStack[t.indexStack.length-3]===0&&(a=!0),Op(t)===o&&c){let h=-1;for(;++h<n.children.length;){const f=n.children[h];if(f&&f.type==="listItem"&&f.children&&f.children[0]&&f.children[0].type==="thematicBreak"){a=!0;break}}}}a&&(o=l),t.bulletCurrent=o;const u=t.containerFlow(n,i);return t.bulletLastUsed=o,t.bulletCurrent=s,r(),u}function sv(n){const e=n.options.listItemIndent||"one";if(e!=="tab"&&e!=="one"&&e!=="mixed")throw new Error("Cannot serialize items with `"+e+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return e}function ov(n,e,t,i){const r=sv(t);let s=t.bulletCurrent||qa(t);e&&e.type==="list"&&e.ordered&&(s=(typeof e.start=="number"&&e.start>-1?e.start:1)+(t.options.incrementListMarker===!1?0:e.children.indexOf(n))+s);let o=s.length+1;(r==="tab"||r==="mixed"&&(e&&e.type==="list"&&e.spread||n.spread))&&(o=Math.ceil(o/4)*4);const l=t.createTracker(i);l.move(s+" ".repeat(o-s.length)),l.shift(o);const a=t.enter("listItem"),u=t.indentLines(t.containerFlow(n,l.current()),c);return a(),u;function c(h,f,d){return f?(d?"":" ".repeat(o))+h:(d?s:s+" ".repeat(o-s.length))+h}}function lv(n,e,t,i){const r=t.enter("paragraph"),s=t.enter("phrasing"),o=t.containerPhrasing(n,i);return s(),r(),o}const av=Hs(["break","delete","emphasis","footnote","footnoteReference","image","imageReference","inlineCode","inlineMath","link","linkReference","mdxJsxTextElement","mdxTextExpression","strong","text","textDirective"]);function uv(n,e,t,i){return(n.children.some(function(o){return av(o)})?t.containerPhrasing:t.containerFlow).call(t,n,i)}function cv(n){const e=n.options.strong||"*";if(e!=="*"&&e!=="_")throw new Error("Cannot serialize strong with `"+e+"` for `options.strong`, expected `*`, or `_`");return e}Rp.peek=hv;function Rp(n,e,t,i){const r=cv(t),s=t.enter("strong"),o=t.createTracker(i),l=o.move(r+r);let a=o.move(t.containerPhrasing(n,{after:r,before:l,...o.current()}));const u=a.charCodeAt(0),c=xs(i.before.charCodeAt(i.before.length-1),u,r);c.inside&&(a=An(u)+a.slice(1));const h=a.charCodeAt(a.length-1),f=xs(i.after.charCodeAt(0),h,r);f.inside&&(a=a.slice(0,-1)+An(h));const d=o.move(r+r);return s(),t.attentionEncodeSurroundingInfo={after:f.outside,before:c.outside},l+a+d}function hv(n,e,t){return t.options.strong||"*"}function fv(n,e,t,i){return t.safe(n.value,i)}function dv(n){const e=n.options.ruleRepetition||3;if(e<3)throw new Error("Cannot serialize rules with repetition `"+e+"` for `options.ruleRepetition`, expected `3` or more");return e}function pv(n,e,t){const i=(Op(t)+(t.options.ruleSpaces?" ":"")).repeat(dv(t));return t.options.ruleSpaces?i.slice(0,-1):i}const Ha={blockquote:D3,break:jc,code:R3,definition:F3,emphasis:Sp,hardBreak:jc,heading:G3,html:Ep,image:Mp,imageReference:Pp,inlineCode:Ip,link:Bp,linkReference:Lp,list:rv,listItem:ov,paragraph:lv,root:uv,strong:Rp,text:fv,thematicBreak:pv},mv=[gv];function gv(n,e,t,i){if(e.type==="code"&&Rl(e,i)&&(n.type==="list"||n.type===e.type&&Rl(n,i)))return!1;if("spread"in t&&typeof t.spread=="boolean")return n.type==="paragraph"&&(n.type===e.type||e.type==="definition"||e.type==="heading"&&Tp(e,i))?void 0:t.spread?1:0}const Bn=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"],bv=[{character:"	",after:"[\\r\\n]",inConstruct:"phrasing"},{character:"	",before:"[\\r\\n]",inConstruct:"phrasing"},{character:"	",inConstruct:["codeFencedLangGraveAccent","codeFencedLangTilde"]},{character:"\r",inConstruct:["codeFencedLangGraveAccent","codeFencedLangTilde","codeFencedMetaGraveAccent","codeFencedMetaTilde","destinationLiteral","headingAtx"]},{character:`
`,inConstruct:["codeFencedLangGraveAccent","codeFencedLangTilde","codeFencedMetaGraveAccent","codeFencedMetaTilde","destinationLiteral","headingAtx"]},{character:" ",after:"[\\r\\n]",inConstruct:"phrasing"},{character:" ",before:"[\\r\\n]",inConstruct:"phrasing"},{character:" ",inConstruct:["codeFencedLangGraveAccent","codeFencedLangTilde"]},{character:"!",after:"\\[",inConstruct:"phrasing",notInConstruct:Bn},{character:'"',inConstruct:"titleQuote"},{atBreak:!0,character:"#"},{character:"#",inConstruct:"headingAtx",after:`(?:[\r
]|$)`},{character:"&",after:"[#A-Za-z]",inConstruct:"phrasing"},{character:"'",inConstruct:"titleApostrophe"},{character:"(",inConstruct:"destinationRaw"},{before:"\\]",character:"(",inConstruct:"phrasing",notInConstruct:Bn},{atBreak:!0,before:"\\d+",character:")"},{character:")",inConstruct:"destinationRaw"},{atBreak:!0,character:"*",after:`(?:[ 	\r
*])`},{character:"*",inConstruct:"phrasing",notInConstruct:Bn},{atBreak:!0,character:"+",after:`(?:[ 	\r
])`},{atBreak:!0,character:"-",after:`(?:[ 	\r
-])`},{atBreak:!0,before:"\\d+",character:".",after:`(?:[ 	\r
]|$)`},{atBreak:!0,character:"<",after:"[!/?A-Za-z]"},{character:"<",after:"[!/?A-Za-z]",inConstruct:"phrasing",notInConstruct:Bn},{character:"<",inConstruct:"destinationLiteral"},{atBreak:!0,character:"="},{atBreak:!0,character:">"},{character:">",inConstruct:"destinationLiteral"},{atBreak:!0,character:"["},{character:"[",inConstruct:"phrasing",notInConstruct:Bn},{character:"[",inConstruct:["label","reference"]},{character:"\\",after:"[\\r\\n]",inConstruct:"phrasing"},{character:"]",inConstruct:["label","reference"]},{atBreak:!0,character:"_"},{character:"_",inConstruct:"phrasing",notInConstruct:Bn},{atBreak:!0,character:"`"},{character:"`",inConstruct:["codeFencedLangGraveAccent","codeFencedMetaGraveAccent"]},{character:"`",inConstruct:"phrasing",notInConstruct:Bn},{atBreak:!0,character:"~"}];function yv(n){return n.label||!n.identifier?n.label||"":bp(n.identifier)}function wv(n){if(!n._compiled){const e=(n.atBreak?"[\\r\\n][\\t ]*":"")+(n.before?"(?:"+n.before+")":"");n._compiled=new RegExp((e?"("+e+")":"")+(/[|\\{}()[\]^$+*?.-]/.test(n.character)?"\\":"")+n.character+(n.after?"(?:"+n.after+")":""),"g")}return n._compiled}function kv(n,e,t){const i=e.indexStack,r=n.children||[],s=[];let o=-1,l=t.before,a;i.push(-1);let u=e.createTracker(t);for(;++o<r.length;){const c=r[o];let h;if(i[i.length-1]=o,o+1<r.length){let p=e.handle.handlers[r[o+1].type];p&&p.peek&&(p=p.peek),h=p?p(r[o+1],n,e,{before:"",after:"",...u.current()}).charAt(0):""}else h=t.after;s.length>0&&(l==="\r"||l===`
`)&&c.type==="html"&&(s[s.length-1]=s[s.length-1].replace(/(\r?\n|\r)$/," "),l=" ",u=e.createTracker(t),u.move(s.join("")));let f=e.handle(c,n,e,{...u.current(),after:h,before:l});a&&a===f.slice(0,1)&&(f=An(a.charCodeAt(0))+f.slice(1));const d=e.attentionEncodeSurroundingInfo;e.attentionEncodeSurroundingInfo=void 0,a=void 0,d&&(s.length>0&&d.before&&l===s[s.length-1].slice(-1)&&(s[s.length-1]=s[s.length-1].slice(0,-1)+An(l.charCodeAt(0))),d.after&&(a=h)),u.move(f),s.push(f),l=f.slice(-1)}return i.pop(),s.join("")}function xv(n,e,t){const i=e.indexStack,r=n.children||[],s=e.createTracker(t),o=[];let l=-1;for(i.push(-1);++l<r.length;){const a=r[l];i[i.length-1]=l,o.push(s.move(e.handle(a,n,e,{before:`
`,after:`
`,...s.current()}))),a.type!=="list"&&(e.bulletLastUsed=void 0),l<r.length-1&&o.push(s.move(vv(a,r[l+1],n,e)))}return i.pop(),o.join("")}function vv(n,e,t,i){let r=i.join.length;for(;r--;){const s=i.join[r](n,e,t,i);if(s===!0||s===1)break;if(typeof s=="number")return`
`.repeat(1+s);if(s===!1)return`

<!---->

`}return`

`}const Sv=/\r?\n|\r/g;function _v(n,e){const t=[];let i=0,r=0,s;for(;s=Sv.exec(n);)o(n.slice(i,s.index)),t.push(s[0]),i=s.index+s[0].length,r++;return o(n.slice(i)),t.join("");function o(l){t.push(e(l,r,!l))}}function Cv(n,e,t){const i=(t.before||"")+(e||"")+(t.after||""),r=[],s=[],o={};let l=-1;for(;++l<n.unsafe.length;){const c=n.unsafe[l];if(!vp(n.stack,c))continue;const h=n.compilePattern(c);let f;for(;f=h.exec(i);){const d="before"in c||!!c.atBreak,p="after"in c,m=f.index+(d?f[1].length:0);r.includes(m)?(o[m].before&&!d&&(o[m].before=!1),o[m].after&&!p&&(o[m].after=!1)):(r.push(m),o[m]={before:d,after:p})}}r.sort(Av);let a=t.before?t.before.length:0;const u=i.length-(t.after?t.after.length:0);for(l=-1;++l<r.length;){const c=r[l];c<a||c>=u||c+1<u&&r[l+1]===c+1&&o[c].after&&!o[c+1].before&&!o[c+1].after||r[l-1]===c-1&&o[c].before&&!o[c-1].before&&!o[c-1].after||(a!==c&&s.push(Kc(i.slice(a,c),"\\")),a=c,/[!-/:-@[-`{-~]/.test(i.charAt(c))&&(!t.encode||!t.encode.includes(i.charAt(c)))?s.push("\\"):(s.push(An(i.charCodeAt(c))),a++))}return s.push(Kc(i.slice(a,u),t.after)),s.join("")}function Av(n,e){return n-e}function Kc(n,e){const t=/\\(?=[!-/:-@[-`{-~])/g,i=[],r=[],s=n+e;let o=-1,l=0,a;for(;a=t.exec(s);)i.push(a.index);for(;++o<i.length;)l!==i[o]&&r.push(n.slice(l,i[o])),r.push("\\"),l=i[o];return r.push(n.slice(l)),r.join("")}function Tv(n){const e=n||{},t=e.now||{};let i=e.lineShift||0,r=t.line||1,s=t.column||1;return{move:a,current:o,shift:l};function o(){return{now:{line:r,column:s},lineShift:i}}function l(u){i+=u}function a(u){const c=u||"",h=c.split(/\r?\n|\r/g),f=h[h.length-1];return r+=h.length-1,s=h.length===1?s+f.length:1+f.length+i,c}}function Ev(n,e){const t=e||{},i={associationId:yv,containerPhrasing:Dv,containerFlow:Bv,createTracker:Tv,compilePattern:wv,enter:s,handlers:{...Ha},handle:void 0,indentLines:_v,indexStack:[],join:[...mv],options:{},safe:Lv,stack:[],unsafe:[...bv]};xp(i,t),i.options.tightDefinitions&&i.join.push(Iv),i.handle=kp("type",{invalid:Mv,unknown:Pv,handlers:i.handlers});let r=i.handle(n,void 0,i,{before:`
`,after:`
`,now:{line:1,column:1},lineShift:0});return r&&r.charCodeAt(r.length-1)!==10&&r.charCodeAt(r.length-1)!==13&&(r+=`
`),r;function s(o){return i.stack.push(o),l;function l(){i.stack.pop()}}}function Mv(n){throw new Error("Cannot handle value `"+n+"`, expected node")}function Pv(n){const e=n;throw new Error("Cannot handle unknown node `"+e.type+"`")}function Iv(n,e){if(n.type==="definition"&&n.type===e.type)return 0}function Dv(n,e){return kv(n,this,e)}function Bv(n,e){return xv(n,this,e)}function Lv(n,e){return Cv(this,n,e)}function Ov(n){const e=this;e.compiler=t;function t(i){return Ev(i,{...e.data("settings"),...n,extensions:e.data("toMarkdownExtensions")||[]})}}function Xc(n){if(n)throw n}function Rv(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var vo,Gc;function zv(){if(Gc)return vo;Gc=1;var n=Object.prototype.hasOwnProperty,e=Object.prototype.toString,t=Object.defineProperty,i=Object.getOwnPropertyDescriptor,r=function(u){return typeof Array.isArray=="function"?Array.isArray(u):e.call(u)==="[object Array]"},s=function(u){if(!u||e.call(u)!=="[object Object]")return!1;var c=n.call(u,"constructor"),h=u.constructor&&u.constructor.prototype&&n.call(u.constructor.prototype,"isPrototypeOf");if(u.constructor&&!c&&!h)return!1;var f;for(f in u);return typeof f>"u"||n.call(u,f)},o=function(u,c){t&&c.name==="__proto__"?t(u,c.name,{enumerable:!0,configurable:!0,value:c.newValue,writable:!0}):u[c.name]=c.newValue},l=function(u,c){if(c==="__proto__")if(n.call(u,c)){if(i)return i(u,c).value}else return;return u[c]};return vo=function a(){var u,c,h,f,d,p,m=arguments[0],b=1,g=arguments.length,S=!1;for(typeof m=="boolean"&&(S=m,m=arguments[1]||{},b=2),(m==null||typeof m!="object"&&typeof m!="function")&&(m={});b<g;++b)if(u=arguments[b],u!=null)for(c in u)h=l(m,c),f=l(u,c),m!==f&&(S&&f&&(s(f)||(d=r(f)))?(d?(d=!1,p=h&&r(h)?h:[]):p=h&&s(h)?h:{},o(m,{name:c,newValue:a(S,p,f)})):typeof f<"u"&&o(m,{name:c,newValue:f}));return m},vo}var Fv=zv();const So=Rv(Fv);function Fl(n){if(typeof n!="object"||n===null)return!1;const e=Object.getPrototypeOf(n);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in n)&&!(Symbol.iterator in n)}function Nv(){const n=[],e={run:t,use:i};return e;function t(...r){let s=-1;const o=r.pop();if(typeof o!="function")throw new TypeError("Expected function as last argument, not "+o);l(null,...r);function l(a,...u){const c=n[++s];let h=-1;if(a){o(a);return}for(;++h<r.length;)(u[h]===null||u[h]===void 0)&&(u[h]=r[h]);r=u,c?qv(c,l)(...u):o(null,...u)}}function i(r){if(typeof r!="function")throw new TypeError("Expected `middelware` to be a function, not "+r);return n.push(r),e}}function qv(n,e){let t;return i;function i(...o){const l=n.length>o.length;let a;l&&o.push(r);try{a=n.apply(this,o)}catch(u){const c=u;if(l&&t)throw c;return r(c)}l||(a&&a.then&&typeof a.then=="function"?a.then(s,r):a instanceof Error?r(a):s(a))}function r(o,...l){t||(t=!0,e(o,...l))}function s(o){r(null,o)}}class pt extends Error{constructor(e,t,i){super(),typeof t=="string"&&(i=t,t=void 0);let r="",s={},o=!1;if(t&&("line"in t&&"column"in t?s={place:t}:"start"in t&&"end"in t?s={place:t}:"type"in t?s={ancestors:[t],place:t.position}:s={...t}),typeof e=="string"?r=e:!s.cause&&e&&(o=!0,r=e.message,s.cause=e),!s.ruleId&&!s.source&&typeof i=="string"){const a=i.indexOf(":");a===-1?s.ruleId=i:(s.source=i.slice(0,a),s.ruleId=i.slice(a+1))}if(!s.place&&s.ancestors&&s.ancestors){const a=s.ancestors[s.ancestors.length-1];a&&(s.place=a.position)}const l=s.place&&"start"in s.place?s.place.start:s.place;this.ancestors=s.ancestors||void 0,this.cause=s.cause||void 0,this.column=l?l.column:void 0,this.fatal=void 0,this.file="",this.message=r,this.line=l?l.line:void 0,this.name=Zi(s.place)||"1:1",this.place=s.place||void 0,this.reason=this.message,this.ruleId=s.ruleId||void 0,this.source=s.source||void 0,this.stack=o&&s.cause&&typeof s.cause.stack=="string"?s.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}pt.prototype.file="";pt.prototype.name="";pt.prototype.reason="";pt.prototype.message="";pt.prototype.stack="";pt.prototype.column=void 0;pt.prototype.line=void 0;pt.prototype.ancestors=void 0;pt.prototype.cause=void 0;pt.prototype.fatal=void 0;pt.prototype.place=void 0;pt.prototype.ruleId=void 0;pt.prototype.source=void 0;const Ut={basename:Hv,dirname:$v,extname:Wv,join:Vv,sep:"/"};function Hv(n,e){if(e!==void 0&&typeof e!="string")throw new TypeError('"ext" argument must be a string');xr(n);let t=0,i=-1,r=n.length,s;if(e===void 0||e.length===0||e.length>n.length){for(;r--;)if(n.codePointAt(r)===47){if(s){t=r+1;break}}else i<0&&(s=!0,i=r+1);return i<0?"":n.slice(t,i)}if(e===n)return"";let o=-1,l=e.length-1;for(;r--;)if(n.codePointAt(r)===47){if(s){t=r+1;break}}else o<0&&(s=!0,o=r+1),l>-1&&(n.codePointAt(r)===e.codePointAt(l--)?l<0&&(i=r):(l=-1,i=o));return t===i?i=o:i<0&&(i=n.length),n.slice(t,i)}function $v(n){if(xr(n),n.length===0)return".";let e=-1,t=n.length,i;for(;--t;)if(n.codePointAt(t)===47){if(i){e=t;break}}else i||(i=!0);return e<0?n.codePointAt(0)===47?"/":".":e===1&&n.codePointAt(0)===47?"//":n.slice(0,e)}function Wv(n){xr(n);let e=n.length,t=-1,i=0,r=-1,s=0,o;for(;e--;){const l=n.codePointAt(e);if(l===47){if(o){i=e+1;break}continue}t<0&&(o=!0,t=e+1),l===46?r<0?r=e:s!==1&&(s=1):r>-1&&(s=-1)}return r<0||t<0||s===0||s===1&&r===t-1&&r===i+1?"":n.slice(r,t)}function Vv(...n){let e=-1,t;for(;++e<n.length;)xr(n[e]),n[e]&&(t=t===void 0?n[e]:t+"/"+n[e]);return t===void 0?".":Uv(t)}function Uv(n){xr(n);const e=n.codePointAt(0)===47;let t=jv(n,!e);return t.length===0&&!e&&(t="."),t.length>0&&n.codePointAt(n.length-1)===47&&(t+="/"),e?"/"+t:t}function jv(n,e){let t="",i=0,r=-1,s=0,o=-1,l,a;for(;++o<=n.length;){if(o<n.length)l=n.codePointAt(o);else{if(l===47)break;l=47}if(l===47){if(!(r===o-1||s===1))if(r!==o-1&&s===2){if(t.length<2||i!==2||t.codePointAt(t.length-1)!==46||t.codePointAt(t.length-2)!==46){if(t.length>2){if(a=t.lastIndexOf("/"),a!==t.length-1){a<0?(t="",i=0):(t=t.slice(0,a),i=t.length-1-t.lastIndexOf("/")),r=o,s=0;continue}}else if(t.length>0){t="",i=0,r=o,s=0;continue}}e&&(t=t.length>0?t+"/..":"..",i=2)}else t.length>0?t+="/"+n.slice(r+1,o):t=n.slice(r+1,o),i=o-r-1;r=o,s=0}else l===46&&s>-1?s++:s=-1}return t}function xr(n){if(typeof n!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(n))}const Kv={cwd:Xv};function Xv(){return"/"}function Nl(n){return!!(n!==null&&typeof n=="object"&&"href"in n&&n.href&&"protocol"in n&&n.protocol&&n.auth===void 0)}function Gv(n){if(typeof n=="string")n=new URL(n);else if(!Nl(n)){const e=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+n+"`");throw e.code="ERR_INVALID_ARG_TYPE",e}if(n.protocol!=="file:"){const e=new TypeError("The URL must be of scheme file");throw e.code="ERR_INVALID_URL_SCHEME",e}return Yv(n)}function Yv(n){if(n.hostname!==""){const i=new TypeError('File URL host must be "localhost" or empty on darwin');throw i.code="ERR_INVALID_FILE_URL_HOST",i}const e=n.pathname;let t=-1;for(;++t<e.length;)if(e.codePointAt(t)===37&&e.codePointAt(t+1)===50){const i=e.codePointAt(t+2);if(i===70||i===102){const r=new TypeError("File URL path must not include encoded / characters");throw r.code="ERR_INVALID_FILE_URL_PATH",r}}return decodeURIComponent(e)}const _o=["history","path","basename","stem","extname","dirname"];class Qv{constructor(e){let t;e?Nl(e)?t={path:e}:typeof e=="string"||Jv(e)?t={value:e}:t=e:t={},this.cwd="cwd"in t?"":Kv.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let i=-1;for(;++i<_o.length;){const s=_o[i];s in t&&t[s]!==void 0&&t[s]!==null&&(this[s]=s==="history"?[...t[s]]:t[s])}let r;for(r in t)_o.includes(r)||(this[r]=t[r])}get basename(){return typeof this.path=="string"?Ut.basename(this.path):void 0}set basename(e){Ao(e,"basename"),Co(e,"basename"),this.path=Ut.join(this.dirname||"",e)}get dirname(){return typeof this.path=="string"?Ut.dirname(this.path):void 0}set dirname(e){Yc(this.basename,"dirname"),this.path=Ut.join(e||"",this.basename)}get extname(){return typeof this.path=="string"?Ut.extname(this.path):void 0}set extname(e){if(Co(e,"extname"),Yc(this.dirname,"extname"),e){if(e.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(e.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=Ut.join(this.dirname,this.stem+(e||""))}get path(){return this.history[this.history.length-1]}set path(e){Nl(e)&&(e=Gv(e)),Ao(e,"path"),this.path!==e&&this.history.push(e)}get stem(){return typeof this.path=="string"?Ut.basename(this.path,this.extname):void 0}set stem(e){Ao(e,"stem"),Co(e,"stem"),this.path=Ut.join(this.dirname||"",e+(this.extname||""))}fail(e,t,i){const r=this.message(e,t,i);throw r.fatal=!0,r}info(e,t,i){const r=this.message(e,t,i);return r.fatal=void 0,r}message(e,t,i){const r=new pt(e,t,i);return this.path&&(r.name=this.path+":"+r.name,r.file=this.path),r.fatal=!1,this.messages.push(r),r}toString(e){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(e||void 0).decode(this.value)}}function Co(n,e){if(n&&n.includes(Ut.sep))throw new Error("`"+e+"` cannot be a path: did not expect `"+Ut.sep+"`")}function Ao(n,e){if(!n)throw new Error("`"+e+"` cannot be empty")}function Yc(n,e){if(!n)throw new Error("Setting `"+e+"` requires `path` to be set too")}function Jv(n){return!!(n&&typeof n=="object"&&"byteLength"in n&&"byteOffset"in n)}const Zv=(function(n){const i=this.constructor.prototype,r=i[n],s=function(){return r.apply(s,arguments)};return Object.setPrototypeOf(s,i),s}),eS={}.hasOwnProperty;class $a extends Zv{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=Nv()}copy(){const e=new $a;let t=-1;for(;++t<this.attachers.length;){const i=this.attachers[t];e.use(...i)}return e.data(So(!0,{},this.namespace)),e}data(e,t){return typeof e=="string"?arguments.length===2?(Mo("data",this.frozen),this.namespace[e]=t,this):eS.call(this.namespace,e)&&this.namespace[e]||void 0:e?(Mo("data",this.frozen),this.namespace=e,this):this.namespace}freeze(){if(this.frozen)return this;const e=this;for(;++this.freezeIndex<this.attachers.length;){const[t,...i]=this.attachers[this.freezeIndex];if(i[0]===!1)continue;i[0]===!0&&(i[0]=void 0);const r=t.call(e,...i);typeof r=="function"&&this.transformers.use(r)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(e){this.freeze();const t=$r(e),i=this.parser||this.Parser;return To("parse",i),i(String(t),t)}process(e,t){const i=this;return this.freeze(),To("process",this.parser||this.Parser),Eo("process",this.compiler||this.Compiler),t?r(void 0,t):new Promise(r);function r(s,o){const l=$r(e),a=i.parse(l);i.run(a,l,function(c,h,f){if(c||!h||!f)return u(c);const d=h,p=i.stringify(d,f);iS(p)?f.value=p:f.result=p,u(c,f)});function u(c,h){c||!h?o(c):s?s(h):t(void 0,h)}}}processSync(e){let t=!1,i;return this.freeze(),To("processSync",this.parser||this.Parser),Eo("processSync",this.compiler||this.Compiler),this.process(e,r),Jc("processSync","process",t),i;function r(s,o){t=!0,Xc(s),i=o}}run(e,t,i){Qc(e),this.freeze();const r=this.transformers;return!i&&typeof t=="function"&&(i=t,t=void 0),i?s(void 0,i):new Promise(s);function s(o,l){const a=$r(t);r.run(e,a,u);function u(c,h,f){const d=h||e;c?l(c):o?o(d):i(void 0,d,f)}}}runSync(e,t){let i=!1,r;return this.run(e,t,s),Jc("runSync","run",i),r;function s(o,l){Xc(o),r=l,i=!0}}stringify(e,t){this.freeze();const i=$r(t),r=this.compiler||this.Compiler;return Eo("stringify",r),Qc(e),r(e,i)}use(e,...t){const i=this.attachers,r=this.namespace;if(Mo("use",this.frozen),e!=null)if(typeof e=="function")a(e,t);else if(typeof e=="object")Array.isArray(e)?l(e):o(e);else throw new TypeError("Expected usable value, not `"+e+"`");return this;function s(u){if(typeof u=="function")a(u,[]);else if(typeof u=="object")if(Array.isArray(u)){const[c,...h]=u;a(c,h)}else o(u);else throw new TypeError("Expected usable value, not `"+u+"`")}function o(u){if(!("plugins"in u)&&!("settings"in u))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");l(u.plugins),u.settings&&(r.settings=So(!0,r.settings,u.settings))}function l(u){let c=-1;if(u!=null)if(Array.isArray(u))for(;++c<u.length;){const h=u[c];s(h)}else throw new TypeError("Expected a list of plugins, not `"+u+"`")}function a(u,c){let h=-1,f=-1;for(;++h<i.length;)if(i[h][0]===u){f=h;break}if(f===-1)i.push([u,...c]);else if(c.length>0){let[d,...p]=c;const m=i[f][1];Fl(m)&&Fl(d)&&(d=So(!0,m,d)),i[f]=[u,d,...p]}}}}const tS=new $a().freeze();function To(n,e){if(typeof e!="function")throw new TypeError("Cannot `"+n+"` without `parser`")}function Eo(n,e){if(typeof e!="function")throw new TypeError("Cannot `"+n+"` without `compiler`")}function Mo(n,e){if(e)throw new Error("Cannot call `"+n+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function Qc(n){if(!Fl(n)||typeof n.type!="string")throw new TypeError("Expected node, got `"+n+"`")}function Jc(n,e,t){if(!t)throw new Error("`"+n+"` finished async. Use `"+e+"` instead")}function $r(n){return nS(n)?n:new Qv(n)}function nS(n){return!!(n&&typeof n=="object"&&"message"in n&&"messages"in n)}function iS(n){return typeof n=="string"||rS(n)}function rS(n){return!!(n&&typeof n=="object"&&"byteLength"in n&&"byteOffset"in n)}const sS=tS().use(M3).use(Ov).freeze();function vs(n,e){const t=String(n);if(typeof e!="string")throw new TypeError("Expected character");let i=0,r=t.indexOf(e);for(;r!==-1;)i++,r=t.indexOf(e,r+e.length);return i}function oS(n){if(typeof n!="string")throw new TypeError("Expected a string");return n.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}function lS(n,e,t){const r=Hs((t||{}).ignore||[]),s=aS(e);let o=-1;for(;++o<s.length;)Cp(n,"text",l);function l(u,c){let h=-1,f;for(;++h<c.length;){const d=c[h],p=f?f.children:void 0;if(r(d,p?p.indexOf(d):void 0,f))return;f=d}if(f)return a(u,c)}function a(u,c){const h=c[c.length-1],f=s[o][0],d=s[o][1];let p=0;const b=h.children.indexOf(u);let g=!1,S=[];f.lastIndex=0;let v=f.exec(u.value);for(;v;){const D=v.index,A={index:v.index,input:v.input,stack:[...c,u]};let k=d(...v,A);if(typeof k=="string"&&(k=k.length>0?{type:"text",value:k}:void 0),k===!1?f.lastIndex=D+1:(p!==D&&S.push({type:"text",value:u.value.slice(p,D)}),Array.isArray(k)?S.push(...k):k&&S.push(k),p=D+v[0].length,g=!0),!f.global)break;v=f.exec(u.value)}return g?(p<u.value.length&&S.push({type:"text",value:u.value.slice(p)}),h.children.splice(b,1,...S)):S=[u],b+S.length}}function aS(n){const e=[];if(!Array.isArray(n))throw new TypeError("Expected find and replace tuple or list of tuples");const t=!n[0]||Array.isArray(n[0])?n:[n];let i=-1;for(;++i<t.length;){const r=t[i];e.push([uS(r[0]),cS(r[1])])}return e}function uS(n){return typeof n=="string"?new RegExp(oS(n),"g"):n}function cS(n){return typeof n=="function"?n:function(){return n}}const Po="phrasing",Io=["autolink","link","image","label"];function hS(){return{transforms:[yS],enter:{literalAutolink:dS,literalAutolinkEmail:Do,literalAutolinkHttp:Do,literalAutolinkWww:Do},exit:{literalAutolink:bS,literalAutolinkEmail:gS,literalAutolinkHttp:pS,literalAutolinkWww:mS}}}function fS(){return{unsafe:[{character:"@",before:"[+\\-.\\w]",after:"[\\-.\\w]",inConstruct:Po,notInConstruct:Io},{character:".",before:"[Ww]",after:"[\\-.\\w]",inConstruct:Po,notInConstruct:Io},{character:":",before:"[ps]",after:"\\/",inConstruct:Po,notInConstruct:Io}]}}function dS(n){this.enter({type:"link",title:null,url:"",children:[]},n)}function Do(n){this.config.enter.autolinkProtocol.call(this,n)}function pS(n){this.config.exit.autolinkProtocol.call(this,n)}function mS(n){this.config.exit.data.call(this,n);const e=this.stack[this.stack.length-1];e.type,e.url="http://"+this.sliceSerialize(n)}function gS(n){this.config.exit.autolinkEmail.call(this,n)}function bS(n){this.exit(n)}function yS(n){lS(n,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,wS],[new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)","gu"),kS]],{ignore:["link","linkReference"]})}function wS(n,e,t,i,r){let s="";if(!zp(r)||(/^w/i.test(e)&&(t=e+t,e="",s="http://"),!xS(t)))return!1;const o=vS(t+i);if(!o[0])return!1;const l={type:"link",title:null,url:s+e+o[0],children:[{type:"text",value:e+o[0]}]};return o[1]?[l,{type:"text",value:o[1]}]:l}function kS(n,e,t,i){return!zp(i,!0)||/[-\d_]$/.test(t)?!1:{type:"link",title:null,url:"mailto:"+e+"@"+t,children:[{type:"text",value:e+"@"+t}]}}function xS(n){const e=n.split(".");return!(e.length<2||e[e.length-1]&&(/_/.test(e[e.length-1])||!/[a-zA-Z\d]/.test(e[e.length-1]))||e[e.length-2]&&(/_/.test(e[e.length-2])||!/[a-zA-Z\d]/.test(e[e.length-2])))}function vS(n){const e=/[!"&'),.:;<>?\]}]+$/.exec(n);if(!e)return[n,void 0];n=n.slice(0,e.index);let t=e[0],i=t.indexOf(")");const r=vs(n,"(");let s=vs(n,")");for(;i!==-1&&r>s;)n+=t.slice(0,i+1),t=t.slice(i+1),i=t.indexOf(")"),s++;return[n,t]}function zp(n,e){const t=n.input.charCodeAt(n.index-1);return(n.index===0||Kn(t)||Ns(t))&&(!e||t!==47)}Fp.peek=IS;function SS(){this.buffer()}function _S(n){this.enter({type:"footnoteReference",identifier:"",label:""},n)}function CS(){this.buffer()}function AS(n){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},n)}function TS(n){const e=this.resume(),t=this.stack[this.stack.length-1];t.type,t.identifier=Rt(this.sliceSerialize(n)).toLowerCase(),t.label=e}function ES(n){this.exit(n)}function MS(n){const e=this.resume(),t=this.stack[this.stack.length-1];t.type,t.identifier=Rt(this.sliceSerialize(n)).toLowerCase(),t.label=e}function PS(n){this.exit(n)}function IS(){return"["}function Fp(n,e,t,i){const r=t.createTracker(i);let s=r.move("[^");const o=t.enter("footnoteReference"),l=t.enter("reference");return s+=r.move(t.safe(t.associationId(n),{after:"]",before:s})),l(),o(),s+=r.move("]"),s}function DS(){return{enter:{gfmFootnoteCallString:SS,gfmFootnoteCall:_S,gfmFootnoteDefinitionLabelString:CS,gfmFootnoteDefinition:AS},exit:{gfmFootnoteCallString:TS,gfmFootnoteCall:ES,gfmFootnoteDefinitionLabelString:MS,gfmFootnoteDefinition:PS}}}function BS(n){let e=!1;return n&&n.firstLineBlank&&(e=!0),{handlers:{footnoteDefinition:t,footnoteReference:Fp},unsafe:[{character:"[",inConstruct:["label","phrasing","reference"]}]};function t(i,r,s,o){const l=s.createTracker(o);let a=l.move("[^");const u=s.enter("footnoteDefinition"),c=s.enter("label");return a+=l.move(s.safe(s.associationId(i),{before:a,after:"]"})),c(),a+=l.move("]:"),i.children&&i.children.length>0&&(l.shift(4),a+=l.move((e?`
`:" ")+s.indentLines(s.containerFlow(i,l.current()),e?Np:LS))),u(),a}}function LS(n,e,t){return e===0?n:Np(n,e,t)}function Np(n,e,t){return(t?"":"    ")+n}const OS=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"];qp.peek=qS;function RS(){return{canContainEols:["delete"],enter:{strikethrough:FS},exit:{strikethrough:NS}}}function zS(){return{unsafe:[{character:"~",inConstruct:"phrasing",notInConstruct:OS}],handlers:{delete:qp}}}function FS(n){this.enter({type:"delete",children:[]},n)}function NS(n){this.exit(n)}function qp(n,e,t,i){const r=t.createTracker(i),s=t.enter("strikethrough");let o=r.move("~~");return o+=t.containerPhrasing(n,{...r.current(),before:o,after:"~"}),o+=r.move("~~"),s(),o}function qS(){return"~"}function HS(n){return n.length}function $S(n,e){const t=e||{},i=(t.align||[]).concat(),r=t.stringLength||HS,s=[],o=[],l=[],a=[];let u=0,c=-1;for(;++c<n.length;){const m=[],b=[];let g=-1;for(n[c].length>u&&(u=n[c].length);++g<n[c].length;){const S=WS(n[c][g]);if(t.alignDelimiters!==!1){const v=r(S);b[g]=v,(a[g]===void 0||v>a[g])&&(a[g]=v)}m.push(S)}o[c]=m,l[c]=b}let h=-1;if(typeof i=="object"&&"length"in i)for(;++h<u;)s[h]=Zc(i[h]);else{const m=Zc(i);for(;++h<u;)s[h]=m}h=-1;const f=[],d=[];for(;++h<u;){const m=s[h];let b="",g="";m===99?(b=":",g=":"):m===108?b=":":m===114&&(g=":");let S=t.alignDelimiters===!1?1:Math.max(1,a[h]-b.length-g.length);const v=b+"-".repeat(S)+g;t.alignDelimiters!==!1&&(S=b.length+S+g.length,S>a[h]&&(a[h]=S),d[h]=S),f[h]=v}o.splice(1,0,f),l.splice(1,0,d),c=-1;const p=[];for(;++c<o.length;){const m=o[c],b=l[c];h=-1;const g=[];for(;++h<u;){const S=m[h]||"";let v="",D="";if(t.alignDelimiters!==!1){const A=a[h]-(b[h]||0),k=s[h];k===114?v=" ".repeat(A):k===99?A%2?(v=" ".repeat(A/2+.5),D=" ".repeat(A/2-.5)):(v=" ".repeat(A/2),D=v):D=" ".repeat(A)}t.delimiterStart!==!1&&!h&&g.push("|"),t.padding!==!1&&!(t.alignDelimiters===!1&&S==="")&&(t.delimiterStart!==!1||h)&&g.push(" "),t.alignDelimiters!==!1&&g.push(v),g.push(S),t.alignDelimiters!==!1&&g.push(D),t.padding!==!1&&g.push(" "),(t.delimiterEnd!==!1||h!==u-1)&&g.push("|")}p.push(t.delimiterEnd===!1?g.join("").replace(/ +$/,""):g.join(""))}return p.join(`
`)}function WS(n){return n==null?"":String(n)}function Zc(n){const e=typeof n=="string"?n.codePointAt(0):0;return e===67||e===99?99:e===76||e===108?108:e===82||e===114?114:0}function VS(){return{enter:{table:US,tableData:eh,tableHeader:eh,tableRow:KS},exit:{codeText:XS,table:jS,tableData:Bo,tableHeader:Bo,tableRow:Bo}}}function US(n){const e=n._align;this.enter({type:"table",align:e.map(function(t){return t==="none"?null:t}),children:[]},n),this.data.inTable=!0}function jS(n){this.exit(n),this.data.inTable=void 0}function KS(n){this.enter({type:"tableRow",children:[]},n)}function Bo(n){this.exit(n)}function eh(n){this.enter({type:"tableCell",children:[]},n)}function XS(n){let e=this.resume();this.data.inTable&&(e=e.replace(/\\([\\|])/g,GS));const t=this.stack[this.stack.length-1];t.type,t.value=e,this.exit(n)}function GS(n,e){return e==="|"?e:n}function YS(n){const e=n||{},t=e.tableCellPadding,i=e.tablePipeAlign,r=e.stringLength,s=t?" ":"|";return{unsafe:[{character:"\r",inConstruct:"tableCell"},{character:`
`,inConstruct:"tableCell"},{atBreak:!0,character:"|",after:"[	 :-]"},{character:"|",inConstruct:"tableCell"},{atBreak:!0,character:":",after:"-"},{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{inlineCode:f,table:o,tableCell:a,tableRow:l}};function o(d,p,m,b){return u(c(d,m,b),d.align)}function l(d,p,m,b){const g=h(d,m,b),S=u([g]);return S.slice(0,S.indexOf(`
`))}function a(d,p,m,b){const g=m.enter("tableCell"),S=m.enter("phrasing"),v=m.containerPhrasing(d,{...b,before:s,after:s});return S(),g(),v}function u(d,p){return $S(d,{align:p,alignDelimiters:i,padding:t,stringLength:r})}function c(d,p,m){const b=d.children;let g=-1;const S=[],v=p.enter("table");for(;++g<b.length;)S[g]=h(b[g],p,m);return v(),S}function h(d,p,m){const b=d.children;let g=-1;const S=[],v=p.enter("tableRow");for(;++g<b.length;)S[g]=a(b[g],d,p,m);return v(),S}function f(d,p,m){let b=Ha.inlineCode(d,p,m);return m.stack.includes("tableCell")&&(b=b.replace(/\|/g,"\\$&")),b}}function QS(){return{exit:{taskListCheckValueChecked:th,taskListCheckValueUnchecked:th,paragraph:ZS}}}function JS(){return{unsafe:[{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{listItem:e4}}}function th(n){const e=this.stack[this.stack.length-2];e.type,e.checked=n.type==="taskListCheckValueChecked"}function ZS(n){const e=this.stack[this.stack.length-2];if(e&&e.type==="listItem"&&typeof e.checked=="boolean"){const t=this.stack[this.stack.length-1];t.type;const i=t.children[0];if(i&&i.type==="text"){const r=e.children;let s=-1,o;for(;++s<r.length;){const l=r[s];if(l.type==="paragraph"){o=l;break}}o===t&&(i.value=i.value.slice(1),i.value.length===0?t.children.shift():t.position&&i.position&&typeof i.position.start.offset=="number"&&(i.position.start.column++,i.position.start.offset++,t.position.start=Object.assign({},i.position.start)))}}this.exit(n)}function e4(n,e,t,i){const r=n.children[0],s=typeof n.checked=="boolean"&&r&&r.type==="paragraph",o="["+(n.checked?"x":" ")+"] ",l=t.createTracker(i);s&&l.move(o);let a=Ha.listItem(n,e,t,{...i,...l.current()});return s&&(a=a.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,u)),a;function u(c){return c+o}}function t4(){return[hS(),DS(),RS(),VS(),QS()]}function n4(n){return{extensions:[fS(),BS(n),zS(),YS(n),JS()]}}const i4={tokenize:u4,partial:!0},Hp={tokenize:c4,partial:!0},$p={tokenize:h4,partial:!0},Wp={tokenize:f4,partial:!0},r4={tokenize:d4,partial:!0},Vp={name:"wwwAutolink",tokenize:l4,previous:jp},Up={name:"protocolAutolink",tokenize:a4,previous:Kp},hn={name:"emailAutolink",tokenize:o4,previous:Xp},nn={};function s4(){return{text:nn}}let Ln=48;for(;Ln<123;)nn[Ln]=hn,Ln++,Ln===58?Ln=65:Ln===91&&(Ln=97);nn[43]=hn;nn[45]=hn;nn[46]=hn;nn[95]=hn;nn[72]=[hn,Up];nn[104]=[hn,Up];nn[87]=[hn,Vp];nn[119]=[hn,Vp];function o4(n,e,t){const i=this;let r,s;return o;function o(h){return!ql(h)||!Xp.call(i,i.previous)||Wa(i.events)?t(h):(n.enter("literalAutolink"),n.enter("literalAutolinkEmail"),l(h))}function l(h){return ql(h)?(n.consume(h),l):h===64?(n.consume(h),a):t(h)}function a(h){return h===46?n.check(r4,c,u)(h):h===45||h===95||Ge(h)?(s=!0,n.consume(h),a):c(h)}function u(h){return n.consume(h),r=!0,a}function c(h){return s&&r&&tt(i.previous)?(n.exit("literalAutolinkEmail"),n.exit("literalAutolink"),e(h)):t(h)}}function l4(n,e,t){const i=this;return r;function r(o){return o!==87&&o!==119||!jp.call(i,i.previous)||Wa(i.events)?t(o):(n.enter("literalAutolink"),n.enter("literalAutolinkWww"),n.check(i4,n.attempt(Hp,n.attempt($p,s),t),t)(o))}function s(o){return n.exit("literalAutolinkWww"),n.exit("literalAutolink"),e(o)}}function a4(n,e,t){const i=this;let r="",s=!1;return o;function o(h){return(h===72||h===104)&&Kp.call(i,i.previous)&&!Wa(i.events)?(n.enter("literalAutolink"),n.enter("literalAutolinkHttp"),r+=String.fromCodePoint(h),n.consume(h),l):t(h)}function l(h){if(tt(h)&&r.length<5)return r+=String.fromCodePoint(h),n.consume(h),l;if(h===58){const f=r.toLowerCase();if(f==="http"||f==="https")return n.consume(h),a}return t(h)}function a(h){return h===47?(n.consume(h),s?u:(s=!0,a)):t(h)}function u(h){return h===null||ks(h)||ke(h)||Kn(h)||Ns(h)?t(h):n.attempt(Hp,n.attempt($p,c),t)(h)}function c(h){return n.exit("literalAutolinkHttp"),n.exit("literalAutolink"),e(h)}}function u4(n,e,t){let i=0;return r;function r(o){return(o===87||o===119)&&i<3?(i++,n.consume(o),r):o===46&&i===3?(n.consume(o),s):t(o)}function s(o){return o===null?t(o):e(o)}}function c4(n,e,t){let i,r,s;return o;function o(u){return u===46||u===95?n.check(Wp,a,l)(u):u===null||ke(u)||Kn(u)||u!==45&&Ns(u)?a(u):(s=!0,n.consume(u),o)}function l(u){return u===95?i=!0:(r=i,i=void 0),n.consume(u),o}function a(u){return r||i||!s?t(u):e(u)}}function h4(n,e){let t=0,i=0;return r;function r(o){return o===40?(t++,n.consume(o),r):o===41&&i<t?s(o):o===33||o===34||o===38||o===39||o===41||o===42||o===44||o===46||o===58||o===59||o===60||o===63||o===93||o===95||o===126?n.check(Wp,e,s)(o):o===null||ke(o)||Kn(o)?e(o):(n.consume(o),r)}function s(o){return o===41&&i++,n.consume(o),r}}function f4(n,e,t){return i;function i(l){return l===33||l===34||l===39||l===41||l===42||l===44||l===46||l===58||l===59||l===63||l===95||l===126?(n.consume(l),i):l===38?(n.consume(l),s):l===93?(n.consume(l),r):l===60||l===null||ke(l)||Kn(l)?e(l):t(l)}function r(l){return l===null||l===40||l===91||ke(l)||Kn(l)?e(l):i(l)}function s(l){return tt(l)?o(l):t(l)}function o(l){return l===59?(n.consume(l),i):tt(l)?(n.consume(l),o):t(l)}}function d4(n,e,t){return i;function i(s){return n.consume(s),r}function r(s){return Ge(s)?t(s):e(s)}}function jp(n){return n===null||n===40||n===42||n===95||n===91||n===93||n===126||ke(n)}function Kp(n){return!tt(n)}function Xp(n){return!(n===47||ql(n))}function ql(n){return n===43||n===45||n===46||n===95||Ge(n)}function Wa(n){let e=n.length,t=!1;for(;e--;){const i=n[e][1];if((i.type==="labelLink"||i.type==="labelImage")&&!i._balanced){t=!0;break}if(i._gfmAutolinkLiteralWalkedInto){t=!1;break}}return n.length>0&&!t&&(n[n.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),t}const p4={tokenize:v4,partial:!0};function m4(){return{document:{91:{name:"gfmFootnoteDefinition",tokenize:w4,continuation:{tokenize:k4},exit:x4}},text:{91:{name:"gfmFootnoteCall",tokenize:y4},93:{name:"gfmPotentialFootnoteCall",add:"after",tokenize:g4,resolveTo:b4}}}}function g4(n,e,t){const i=this;let r=i.events.length;const s=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]);let o;for(;r--;){const a=i.events[r][1];if(a.type==="labelImage"){o=a;break}if(a.type==="gfmFootnoteCall"||a.type==="labelLink"||a.type==="label"||a.type==="image"||a.type==="link")break}return l;function l(a){if(!o||!o._balanced)return t(a);const u=Rt(i.sliceSerialize({start:o.end,end:i.now()}));return u.codePointAt(0)!==94||!s.includes(u.slice(1))?t(a):(n.enter("gfmFootnoteCallLabelMarker"),n.consume(a),n.exit("gfmFootnoteCallLabelMarker"),e(a))}}function b4(n,e){let t=n.length;for(;t--;)if(n[t][1].type==="labelImage"&&n[t][0]==="enter"){n[t][1];break}n[t+1][1].type="data",n[t+3][1].type="gfmFootnoteCallLabelMarker";const i={type:"gfmFootnoteCall",start:Object.assign({},n[t+3][1].start),end:Object.assign({},n[n.length-1][1].end)},r={type:"gfmFootnoteCallMarker",start:Object.assign({},n[t+3][1].end),end:Object.assign({},n[t+3][1].end)};r.end.column++,r.end.offset++,r.end._bufferIndex++;const s={type:"gfmFootnoteCallString",start:Object.assign({},r.end),end:Object.assign({},n[n.length-1][1].start)},o={type:"chunkString",contentType:"string",start:Object.assign({},s.start),end:Object.assign({},s.end)},l=[n[t+1],n[t+2],["enter",i,e],n[t+3],n[t+4],["enter",r,e],["exit",r,e],["enter",s,e],["enter",o,e],["exit",o,e],["exit",s,e],n[n.length-2],n[n.length-1],["exit",i,e]];return n.splice(t,n.length-t+1,...l),n}function y4(n,e,t){const i=this,r=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]);let s=0,o;return l;function l(h){return n.enter("gfmFootnoteCall"),n.enter("gfmFootnoteCallLabelMarker"),n.consume(h),n.exit("gfmFootnoteCallLabelMarker"),a}function a(h){return h!==94?t(h):(n.enter("gfmFootnoteCallMarker"),n.consume(h),n.exit("gfmFootnoteCallMarker"),n.enter("gfmFootnoteCallString"),n.enter("chunkString").contentType="string",u)}function u(h){if(s>999||h===93&&!o||h===null||h===91||ke(h))return t(h);if(h===93){n.exit("chunkString");const f=n.exit("gfmFootnoteCallString");return r.includes(Rt(i.sliceSerialize(f)))?(n.enter("gfmFootnoteCallLabelMarker"),n.consume(h),n.exit("gfmFootnoteCallLabelMarker"),n.exit("gfmFootnoteCall"),e):t(h)}return ke(h)||(o=!0),s++,n.consume(h),h===92?c:u}function c(h){return h===91||h===92||h===93?(n.consume(h),s++,u):u(h)}}function w4(n,e,t){const i=this,r=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]);let s,o=0,l;return a;function a(p){return n.enter("gfmFootnoteDefinition")._container=!0,n.enter("gfmFootnoteDefinitionLabel"),n.enter("gfmFootnoteDefinitionLabelMarker"),n.consume(p),n.exit("gfmFootnoteDefinitionLabelMarker"),u}function u(p){return p===94?(n.enter("gfmFootnoteDefinitionMarker"),n.consume(p),n.exit("gfmFootnoteDefinitionMarker"),n.enter("gfmFootnoteDefinitionLabelString"),n.enter("chunkString").contentType="string",c):t(p)}function c(p){if(o>999||p===93&&!l||p===null||p===91||ke(p))return t(p);if(p===93){n.exit("chunkString");const m=n.exit("gfmFootnoteDefinitionLabelString");return s=Rt(i.sliceSerialize(m)),n.enter("gfmFootnoteDefinitionLabelMarker"),n.consume(p),n.exit("gfmFootnoteDefinitionLabelMarker"),n.exit("gfmFootnoteDefinitionLabel"),f}return ke(p)||(l=!0),o++,n.consume(p),p===92?h:c}function h(p){return p===91||p===92||p===93?(n.consume(p),o++,c):c(p)}function f(p){return p===58?(n.enter("definitionMarker"),n.consume(p),n.exit("definitionMarker"),r.includes(s)||r.push(s),he(n,d,"gfmFootnoteDefinitionWhitespace")):t(p)}function d(p){return e(p)}}function k4(n,e,t){return n.check(kr,e,n.attempt(p4,e,t))}function x4(n){n.exit("gfmFootnoteDefinition")}function v4(n,e,t){const i=this;return he(n,r,"gfmFootnoteDefinitionIndent",5);function r(s){const o=i.events[i.events.length-1];return o&&o[1].type==="gfmFootnoteDefinitionIndent"&&o[2].sliceSerialize(o[1],!0).length===4?e(s):t(s)}}function S4(n){let t=(n||{}).singleTilde;const i={name:"strikethrough",tokenize:s,resolveAll:r};return t==null&&(t=!0),{text:{126:i},insideSpan:{null:[i]},attentionMarkers:{null:[126]}};function r(o,l){let a=-1;for(;++a<o.length;)if(o[a][0]==="enter"&&o[a][1].type==="strikethroughSequenceTemporary"&&o[a][1]._close){let u=a;for(;u--;)if(o[u][0]==="exit"&&o[u][1].type==="strikethroughSequenceTemporary"&&o[u][1]._open&&o[a][1].end.offset-o[a][1].start.offset===o[u][1].end.offset-o[u][1].start.offset){o[a][1].type="strikethroughSequence",o[u][1].type="strikethroughSequence";const c={type:"strikethrough",start:Object.assign({},o[u][1].start),end:Object.assign({},o[a][1].end)},h={type:"strikethroughText",start:Object.assign({},o[u][1].end),end:Object.assign({},o[a][1].start)},f=[["enter",c,l],["enter",o[u][1],l],["exit",o[u][1],l],["enter",h,l]],d=l.parser.constructs.insideSpan.null;d&&vt(f,f.length,0,qs(d,o.slice(u+1,a),l)),vt(f,f.length,0,[["exit",h,l],["enter",o[a][1],l],["exit",o[a][1],l],["exit",c,l]]),vt(o,u-1,a-u+3,f),a=u+f.length-2;break}}for(a=-1;++a<o.length;)o[a][1].type==="strikethroughSequenceTemporary"&&(o[a][1].type="data");return o}function s(o,l,a){const u=this.previous,c=this.events;let h=0;return f;function f(p){return u===126&&c[c.length-1][1].type!=="characterEscape"?a(p):(o.enter("strikethroughSequenceTemporary"),d(p))}function d(p){const m=Ci(u);if(p===126)return h>1?a(p):(o.consume(p),h++,d);if(h<2&&!t)return a(p);const b=o.exit("strikethroughSequenceTemporary"),g=Ci(p);return b._open=!g||g===2&&!!m,b._close=!m||m===2&&!!g,l(p)}}}class _4{constructor(){this.map=[]}add(e,t,i){C4(this,e,t,i)}consume(e){if(this.map.sort(function(s,o){return s[0]-o[0]}),this.map.length===0)return;let t=this.map.length;const i=[];for(;t>0;)t-=1,i.push(e.slice(this.map[t][0]+this.map[t][1]),this.map[t][2]),e.length=this.map[t][0];i.push(e.slice()),e.length=0;let r=i.pop();for(;r;){for(const s of r)e.push(s);r=i.pop()}this.map.length=0}}function C4(n,e,t,i){let r=0;if(!(t===0&&i.length===0)){for(;r<n.map.length;){if(n.map[r][0]===e){n.map[r][1]+=t,n.map[r][2].push(...i);return}r+=1}n.map.push([e,t,i])}}function A4(n,e){let t=!1;const i=[];for(;e<n.length;){const r=n[e];if(t){if(r[0]==="enter")r[1].type==="tableContent"&&i.push(n[e+1][1].type==="tableDelimiterMarker"?"left":"none");else if(r[1].type==="tableContent"){if(n[e-1][1].type==="tableDelimiterMarker"){const s=i.length-1;i[s]=i[s]==="left"?"center":"right"}}else if(r[1].type==="tableDelimiterRow")break}else r[0]==="enter"&&r[1].type==="tableDelimiterRow"&&(t=!0);e+=1}return i}function T4(){return{flow:{null:{name:"table",tokenize:E4,resolveAll:M4}}}}function E4(n,e,t){const i=this;let r=0,s=0,o;return l;function l(x){let P=i.events.length-1;for(;P>-1;){const $=i.events[P][1].type;if($==="lineEnding"||$==="linePrefix")P--;else break}const E=P>-1?i.events[P][1].type:null,W=E==="tableHead"||E==="tableRow"?k:a;return W===k&&i.parser.lazy[i.now().line]?t(x):W(x)}function a(x){return n.enter("tableHead"),n.enter("tableRow"),u(x)}function u(x){return x===124||(o=!0,s+=1),c(x)}function c(x){return x===null?t(x):Y(x)?s>1?(s=0,i.interrupt=!0,n.exit("tableRow"),n.enter("lineEnding"),n.consume(x),n.exit("lineEnding"),d):t(x):ue(x)?he(n,c,"whitespace")(x):(s+=1,o&&(o=!1,r+=1),x===124?(n.enter("tableCellDivider"),n.consume(x),n.exit("tableCellDivider"),o=!0,c):(n.enter("data"),h(x)))}function h(x){return x===null||x===124||ke(x)?(n.exit("data"),c(x)):(n.consume(x),x===92?f:h)}function f(x){return x===92||x===124?(n.consume(x),h):h(x)}function d(x){return i.interrupt=!1,i.parser.lazy[i.now().line]?t(x):(n.enter("tableDelimiterRow"),o=!1,ue(x)?he(n,p,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(x):p(x))}function p(x){return x===45||x===58?b(x):x===124?(o=!0,n.enter("tableCellDivider"),n.consume(x),n.exit("tableCellDivider"),m):A(x)}function m(x){return ue(x)?he(n,b,"whitespace")(x):b(x)}function b(x){return x===58?(s+=1,o=!0,n.enter("tableDelimiterMarker"),n.consume(x),n.exit("tableDelimiterMarker"),g):x===45?(s+=1,g(x)):x===null||Y(x)?D(x):A(x)}function g(x){return x===45?(n.enter("tableDelimiterFiller"),S(x)):A(x)}function S(x){return x===45?(n.consume(x),S):x===58?(o=!0,n.exit("tableDelimiterFiller"),n.enter("tableDelimiterMarker"),n.consume(x),n.exit("tableDelimiterMarker"),v):(n.exit("tableDelimiterFiller"),v(x))}function v(x){return ue(x)?he(n,D,"whitespace")(x):D(x)}function D(x){return x===124?p(x):x===null||Y(x)?!o||r!==s?A(x):(n.exit("tableDelimiterRow"),n.exit("tableHead"),e(x)):A(x)}function A(x){return t(x)}function k(x){return n.enter("tableRow"),T(x)}function T(x){return x===124?(n.enter("tableCellDivider"),n.consume(x),n.exit("tableCellDivider"),T):x===null||Y(x)?(n.exit("tableRow"),e(x)):ue(x)?he(n,T,"whitespace")(x):(n.enter("data"),B(x))}function B(x){return x===null||x===124||ke(x)?(n.exit("data"),T(x)):(n.consume(x),x===92?I:B)}function I(x){return x===92||x===124?(n.consume(x),B):B(x)}}function M4(n,e){let t=-1,i=!0,r=0,s=[0,0,0,0],o=[0,0,0,0],l=!1,a=0,u,c,h;const f=new _4;for(;++t<n.length;){const d=n[t],p=d[1];d[0]==="enter"?p.type==="tableHead"?(l=!1,a!==0&&(nh(f,e,a,u,c),c=void 0,a=0),u={type:"table",start:Object.assign({},p.start),end:Object.assign({},p.end)},f.add(t,0,[["enter",u,e]])):p.type==="tableRow"||p.type==="tableDelimiterRow"?(i=!0,h=void 0,s=[0,0,0,0],o=[0,t+1,0,0],l&&(l=!1,c={type:"tableBody",start:Object.assign({},p.start),end:Object.assign({},p.end)},f.add(t,0,[["enter",c,e]])),r=p.type==="tableDelimiterRow"?2:c?3:1):r&&(p.type==="data"||p.type==="tableDelimiterMarker"||p.type==="tableDelimiterFiller")?(i=!1,o[2]===0&&(s[1]!==0&&(o[0]=o[1],h=Wr(f,e,s,r,void 0,h),s=[0,0,0,0]),o[2]=t)):p.type==="tableCellDivider"&&(i?i=!1:(s[1]!==0&&(o[0]=o[1],h=Wr(f,e,s,r,void 0,h)),s=o,o=[s[1],t,0,0])):p.type==="tableHead"?(l=!0,a=t):p.type==="tableRow"||p.type==="tableDelimiterRow"?(a=t,s[1]!==0?(o[0]=o[1],h=Wr(f,e,s,r,t,h)):o[1]!==0&&(h=Wr(f,e,o,r,t,h)),r=0):r&&(p.type==="data"||p.type==="tableDelimiterMarker"||p.type==="tableDelimiterFiller")&&(o[3]=t)}for(a!==0&&nh(f,e,a,u,c),f.consume(e.events),t=-1;++t<e.events.length;){const d=e.events[t];d[0]==="enter"&&d[1].type==="table"&&(d[1]._align=A4(e.events,t))}return n}function Wr(n,e,t,i,r,s){const o=i===1?"tableHeader":i===2?"tableDelimiter":"tableData",l="tableContent";t[0]!==0&&(s.end=Object.assign({},ii(e.events,t[0])),n.add(t[0],0,[["exit",s,e]]));const a=ii(e.events,t[1]);if(s={type:o,start:Object.assign({},a),end:Object.assign({},a)},n.add(t[1],0,[["enter",s,e]]),t[2]!==0){const u=ii(e.events,t[2]),c=ii(e.events,t[3]),h={type:l,start:Object.assign({},u),end:Object.assign({},c)};if(n.add(t[2],0,[["enter",h,e]]),i!==2){const f=e.events[t[2]],d=e.events[t[3]];if(f[1].end=Object.assign({},d[1].end),f[1].type="chunkText",f[1].contentType="text",t[3]>t[2]+1){const p=t[2]+1,m=t[3]-t[2]-1;n.add(p,m,[])}}n.add(t[3]+1,0,[["exit",h,e]])}return r!==void 0&&(s.end=Object.assign({},ii(e.events,r)),n.add(r,0,[["exit",s,e]]),s=void 0),s}function nh(n,e,t,i,r){const s=[],o=ii(e.events,t);r&&(r.end=Object.assign({},o),s.push(["exit",r,e])),i.end=Object.assign({},o),s.push(["exit",i,e]),n.add(t+1,0,s)}function ii(n,e){const t=n[e],i=t[0]==="enter"?"start":"end";return t[1][i]}const P4={name:"tasklistCheck",tokenize:D4};function I4(){return{text:{91:P4}}}function D4(n,e,t){const i=this;return r;function r(a){return i.previous!==null||!i._gfmTasklistFirstContentOfListItem?t(a):(n.enter("taskListCheck"),n.enter("taskListCheckMarker"),n.consume(a),n.exit("taskListCheckMarker"),s)}function s(a){return ke(a)?(n.enter("taskListCheckValueUnchecked"),n.consume(a),n.exit("taskListCheckValueUnchecked"),o):a===88||a===120?(n.enter("taskListCheckValueChecked"),n.consume(a),n.exit("taskListCheckValueChecked"),o):t(a)}function o(a){return a===93?(n.enter("taskListCheckMarker"),n.consume(a),n.exit("taskListCheckMarker"),n.exit("taskListCheck"),l):t(a)}function l(a){return Y(a)?e(a):ue(a)?n.check({tokenize:B4},e,t)(a):t(a)}}function B4(n,e,t){return he(n,i,"whitespace");function i(r){return r===null?t(r):e(r)}}function L4(n){return op([s4(),m4(),S4(n),T4(),I4()])}const O4={};function R4(n){const e=this,t=n||O4,i=e.data(),r=i.micromarkExtensions||(i.micromarkExtensions=[]),s=i.fromMarkdownExtensions||(i.fromMarkdownExtensions=[]),o=i.toMarkdownExtensions||(i.toMarkdownExtensions=[]);r.push(L4(t)),s.push(t4()),o.push(n4(t))}function z4(n,e){const t={type:"element",tagName:"blockquote",properties:{},children:n.wrap(n.all(e),!0)};return n.patch(e,t),n.applyData(e,t)}function F4(n,e){const t={type:"element",tagName:"br",properties:{},children:[]};return n.patch(e,t),[n.applyData(e,t),{type:"text",value:`
`}]}function N4(n,e){const t=e.value?e.value+`
`:"",i={},r=e.lang?e.lang.split(/\s+/):[];r.length>0&&(i.className=["language-"+r[0]]);let s={type:"element",tagName:"code",properties:i,children:[{type:"text",value:t}]};return e.meta&&(s.data={meta:e.meta}),n.patch(e,s),s=n.applyData(e,s),s={type:"element",tagName:"pre",properties:{},children:[s]},n.patch(e,s),s}function q4(n,e){const t={type:"element",tagName:"del",properties:{},children:n.all(e)};return n.patch(e,t),n.applyData(e,t)}function H4(n,e){const t={type:"element",tagName:"em",properties:{},children:n.all(e)};return n.patch(e,t),n.applyData(e,t)}function $4(n,e){const t=typeof n.options.clobberPrefix=="string"?n.options.clobberPrefix:"user-content-",i=String(e.identifier).toUpperCase(),r=Ti(i.toLowerCase()),s=n.footnoteOrder.indexOf(i);let o,l=n.footnoteCounts.get(i);l===void 0?(l=0,n.footnoteOrder.push(i),o=n.footnoteOrder.length):o=s+1,l+=1,n.footnoteCounts.set(i,l);const a={type:"element",tagName:"a",properties:{href:"#"+t+"fn-"+r,id:t+"fnref-"+r+(l>1?"-"+l:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(o)}]};n.patch(e,a);const u={type:"element",tagName:"sup",properties:{},children:[a]};return n.patch(e,u),n.applyData(e,u)}function W4(n,e){const t={type:"element",tagName:"h"+e.depth,properties:{},children:n.all(e)};return n.patch(e,t),n.applyData(e,t)}function V4(n,e){if(n.options.allowDangerousHtml){const t={type:"raw",value:e.value};return n.patch(e,t),n.applyData(e,t)}}function Gp(n,e){const t=e.referenceType;let i="]";if(t==="collapsed"?i+="[]":t==="full"&&(i+="["+(e.label||e.identifier)+"]"),e.type==="imageReference")return[{type:"text",value:"!["+e.alt+i}];const r=n.all(e),s=r[0];s&&s.type==="text"?s.value="["+s.value:r.unshift({type:"text",value:"["});const o=r[r.length-1];return o&&o.type==="text"?o.value+=i:r.push({type:"text",value:i}),r}function U4(n,e){const t=String(e.identifier).toUpperCase(),i=n.definitionById.get(t);if(!i)return Gp(n,e);const r={src:Ti(i.url||""),alt:e.alt};i.title!==null&&i.title!==void 0&&(r.title=i.title);const s={type:"element",tagName:"img",properties:r,children:[]};return n.patch(e,s),n.applyData(e,s)}function j4(n,e){const t={src:Ti(e.url)};e.alt!==null&&e.alt!==void 0&&(t.alt=e.alt),e.title!==null&&e.title!==void 0&&(t.title=e.title);const i={type:"element",tagName:"img",properties:t,children:[]};return n.patch(e,i),n.applyData(e,i)}function K4(n,e){const t={type:"text",value:e.value.replace(/\r?\n|\r/g," ")};n.patch(e,t);const i={type:"element",tagName:"code",properties:{},children:[t]};return n.patch(e,i),n.applyData(e,i)}function X4(n,e){const t=String(e.identifier).toUpperCase(),i=n.definitionById.get(t);if(!i)return Gp(n,e);const r={href:Ti(i.url||"")};i.title!==null&&i.title!==void 0&&(r.title=i.title);const s={type:"element",tagName:"a",properties:r,children:n.all(e)};return n.patch(e,s),n.applyData(e,s)}function G4(n,e){const t={href:Ti(e.url)};e.title!==null&&e.title!==void 0&&(t.title=e.title);const i={type:"element",tagName:"a",properties:t,children:n.all(e)};return n.patch(e,i),n.applyData(e,i)}function Y4(n,e,t){const i=n.all(e),r=t?Q4(t):Yp(e),s={},o=[];if(typeof e.checked=="boolean"){const c=i[0];let h;c&&c.type==="element"&&c.tagName==="p"?h=c:(h={type:"element",tagName:"p",properties:{},children:[]},i.unshift(h)),h.children.length>0&&h.children.unshift({type:"text",value:" "}),h.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:e.checked,disabled:!0},children:[]}),s.className=["task-list-item"]}let l=-1;for(;++l<i.length;){const c=i[l];(r||l!==0||c.type!=="element"||c.tagName!=="p")&&o.push({type:"text",value:`
`}),c.type==="element"&&c.tagName==="p"&&!r?o.push(...c.children):o.push(c)}const a=i[i.length-1];a&&(r||a.type!=="element"||a.tagName!=="p")&&o.push({type:"text",value:`
`});const u={type:"element",tagName:"li",properties:s,children:o};return n.patch(e,u),n.applyData(e,u)}function Q4(n){let e=!1;if(n.type==="list"){e=n.spread||!1;const t=n.children;let i=-1;for(;!e&&++i<t.length;)e=Yp(t[i])}return e}function Yp(n){const e=n.spread;return e??n.children.length>1}function J4(n,e){const t={},i=n.all(e);let r=-1;for(typeof e.start=="number"&&e.start!==1&&(t.start=e.start);++r<i.length;){const o=i[r];if(o.type==="element"&&o.tagName==="li"&&o.properties&&Array.isArray(o.properties.className)&&o.properties.className.includes("task-list-item")){t.className=["contains-task-list"];break}}const s={type:"element",tagName:e.ordered?"ol":"ul",properties:t,children:n.wrap(i,!0)};return n.patch(e,s),n.applyData(e,s)}function Z4(n,e){const t={type:"element",tagName:"p",properties:{},children:n.all(e)};return n.patch(e,t),n.applyData(e,t)}function e5(n,e){const t={type:"root",children:n.wrap(n.all(e))};return n.patch(e,t),n.applyData(e,t)}function t5(n,e){const t={type:"element",tagName:"strong",properties:{},children:n.all(e)};return n.patch(e,t),n.applyData(e,t)}const Qp=Zp("end"),Jp=Zp("start");function Zp(n){return e;function e(t){const i=t&&t.position&&t.position[n]||{};if(typeof i.line=="number"&&i.line>0&&typeof i.column=="number"&&i.column>0)return{line:i.line,column:i.column,offset:typeof i.offset=="number"&&i.offset>-1?i.offset:void 0}}}function n5(n){const e=Jp(n),t=Qp(n);if(e&&t)return{start:e,end:t}}function i5(n,e){const t=n.all(e),i=t.shift(),r=[];if(i){const o={type:"element",tagName:"thead",properties:{},children:n.wrap([i],!0)};n.patch(e.children[0],o),r.push(o)}if(t.length>0){const o={type:"element",tagName:"tbody",properties:{},children:n.wrap(t,!0)},l=Jp(e.children[1]),a=Qp(e.children[e.children.length-1]);l&&a&&(o.position={start:l,end:a}),r.push(o)}const s={type:"element",tagName:"table",properties:{},children:n.wrap(r,!0)};return n.patch(e,s),n.applyData(e,s)}function r5(n,e,t){const i=t?t.children:void 0,s=(i?i.indexOf(e):1)===0?"th":"td",o=t&&t.type==="table"?t.align:void 0,l=o?o.length:e.children.length;let a=-1;const u=[];for(;++a<l;){const h=e.children[a],f={},d=o?o[a]:void 0;d&&(f.align=d);let p={type:"element",tagName:s,properties:f,children:[]};h&&(p.children=n.all(h),n.patch(h,p),p=n.applyData(h,p)),u.push(p)}const c={type:"element",tagName:"tr",properties:{},children:n.wrap(u,!0)};return n.patch(e,c),n.applyData(e,c)}function s5(n,e){const t={type:"element",tagName:"td",properties:{},children:n.all(e)};return n.patch(e,t),n.applyData(e,t)}const ih=9,rh=32;function o5(n){const e=String(n),t=/\r?\n|\r/g;let i=t.exec(e),r=0;const s=[];for(;i;)s.push(sh(e.slice(r,i.index),r>0,!0),i[0]),r=i.index+i[0].length,i=t.exec(e);return s.push(sh(e.slice(r),r>0,!1)),s.join("")}function sh(n,e,t){let i=0,r=n.length;if(e){let s=n.codePointAt(i);for(;s===ih||s===rh;)i++,s=n.codePointAt(i)}if(t){let s=n.codePointAt(r-1);for(;s===ih||s===rh;)r--,s=n.codePointAt(r-1)}return r>i?n.slice(i,r):""}function l5(n,e){const t={type:"text",value:o5(String(e.value))};return n.patch(e,t),n.applyData(e,t)}function a5(n,e){const t={type:"element",tagName:"hr",properties:{},children:[]};return n.patch(e,t),n.applyData(e,t)}const u5={blockquote:z4,break:F4,code:N4,delete:q4,emphasis:H4,footnoteReference:$4,heading:W4,html:V4,imageReference:U4,image:j4,inlineCode:K4,linkReference:X4,link:G4,listItem:Y4,list:J4,paragraph:Z4,root:e5,strong:t5,table:i5,tableCell:s5,tableRow:r5,text:l5,thematicBreak:a5,toml:Vr,yaml:Vr,definition:Vr,footnoteDefinition:Vr};function Vr(){}const em=-1,Ws=0,er=1,Ss=2,Va=3,Ua=4,ja=5,Ka=6,tm=7,nm=8,oh=typeof self=="object"?self:globalThis,c5=(n,e)=>{const t=(r,s)=>(n.set(s,r),r),i=r=>{if(n.has(r))return n.get(r);const[s,o]=e[r];switch(s){case Ws:case em:return t(o,r);case er:{const l=t([],r);for(const a of o)l.push(i(a));return l}case Ss:{const l=t({},r);for(const[a,u]of o)l[i(a)]=i(u);return l}case Va:return t(new Date(o),r);case Ua:{const{source:l,flags:a}=o;return t(new RegExp(l,a),r)}case ja:{const l=t(new Map,r);for(const[a,u]of o)l.set(i(a),i(u));return l}case Ka:{const l=t(new Set,r);for(const a of o)l.add(i(a));return l}case tm:{const{name:l,message:a}=o;return t(new oh[l](a),r)}case nm:return t(BigInt(o),r);case"BigInt":return t(Object(BigInt(o)),r);case"ArrayBuffer":return t(new Uint8Array(o).buffer,o);case"DataView":{const{buffer:l}=new Uint8Array(o);return t(new DataView(l),o)}}return t(new oh[s](o),r)};return i},lh=n=>c5(new Map,n)(0),Zn="",{toString:h5}={},{keys:f5}=Object,Fi=n=>{const e=typeof n;if(e!=="object"||!n)return[Ws,e];const t=h5.call(n).slice(8,-1);switch(t){case"Array":return[er,Zn];case"Object":return[Ss,Zn];case"Date":return[Va,Zn];case"RegExp":return[Ua,Zn];case"Map":return[ja,Zn];case"Set":return[Ka,Zn];case"DataView":return[er,t]}return t.includes("Array")?[er,t]:t.includes("Error")?[tm,t]:[Ss,t]},Ur=([n,e])=>n===Ws&&(e==="function"||e==="symbol"),d5=(n,e,t,i)=>{const r=(o,l)=>{const a=i.push(o)-1;return t.set(l,a),a},s=o=>{if(t.has(o))return t.get(o);let[l,a]=Fi(o);switch(l){case Ws:{let c=o;switch(a){case"bigint":l=nm,c=o.toString();break;case"function":case"symbol":if(n)throw new TypeError("unable to serialize "+a);c=null;break;case"undefined":return r([em],o)}return r([l,c],o)}case er:{if(a){let f=o;return a==="DataView"?f=new Uint8Array(o.buffer):a==="ArrayBuffer"&&(f=new Uint8Array(o)),r([a,[...f]],o)}const c=[],h=r([l,c],o);for(const f of o)c.push(s(f));return h}case Ss:{if(a)switch(a){case"BigInt":return r([a,o.toString()],o);case"Boolean":case"Number":case"String":return r([a,o.valueOf()],o)}if(e&&"toJSON"in o)return s(o.toJSON());const c=[],h=r([l,c],o);for(const f of f5(o))(n||!Ur(Fi(o[f])))&&c.push([s(f),s(o[f])]);return h}case Va:return r([l,o.toISOString()],o);case Ua:{const{source:c,flags:h}=o;return r([l,{source:c,flags:h}],o)}case ja:{const c=[],h=r([l,c],o);for(const[f,d]of o)(n||!(Ur(Fi(f))||Ur(Fi(d))))&&c.push([s(f),s(d)]);return h}case Ka:{const c=[],h=r([l,c],o);for(const f of o)(n||!Ur(Fi(f)))&&c.push(s(f));return h}}const{message:u}=o;return r([l,{name:a,message:u}],o)};return s},ah=(n,{json:e,lossy:t}={})=>{const i=[];return d5(!(e||t),!!e,new Map,i)(n),i},_s=typeof structuredClone=="function"?(n,e)=>e&&("json"in e||"lossy"in e)?lh(ah(n,e)):structuredClone(n):(n,e)=>lh(ah(n,e));function p5(n,e){const t=[{type:"text",value:"↩"}];return e>1&&t.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(e)}]}),t}function m5(n,e){return"Back to reference "+(n+1)+(e>1?"-"+e:"")}function g5(n){const e=typeof n.options.clobberPrefix=="string"?n.options.clobberPrefix:"user-content-",t=n.options.footnoteBackContent||p5,i=n.options.footnoteBackLabel||m5,r=n.options.footnoteLabel||"Footnotes",s=n.options.footnoteLabelTagName||"h2",o=n.options.footnoteLabelProperties||{className:["sr-only"]},l=[];let a=-1;for(;++a<n.footnoteOrder.length;){const u=n.footnoteById.get(n.footnoteOrder[a]);if(!u)continue;const c=n.all(u),h=String(u.identifier).toUpperCase(),f=Ti(h.toLowerCase());let d=0;const p=[],m=n.footnoteCounts.get(h);for(;m!==void 0&&++d<=m;){p.length>0&&p.push({type:"text",value:" "});let S=typeof t=="string"?t:t(a,d);typeof S=="string"&&(S={type:"text",value:S}),p.push({type:"element",tagName:"a",properties:{href:"#"+e+"fnref-"+f+(d>1?"-"+d:""),dataFootnoteBackref:"",ariaLabel:typeof i=="string"?i:i(a,d),className:["data-footnote-backref"]},children:Array.isArray(S)?S:[S]})}const b=c[c.length-1];if(b&&b.type==="element"&&b.tagName==="p"){const S=b.children[b.children.length-1];S&&S.type==="text"?S.value+=" ":b.children.push({type:"text",value:" "}),b.children.push(...p)}else c.push(...p);const g={type:"element",tagName:"li",properties:{id:e+"fn-"+f},children:n.wrap(c,!0)};n.patch(u,g),l.push(g)}if(l.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:s,properties:{..._s(o),id:"footnote-label"},children:[{type:"text",value:r}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:n.wrap(l,!0)},{type:"text",value:`
`}]}}const Hl={}.hasOwnProperty,b5={};function y5(n,e){const t=e||b5,i=new Map,r=new Map,s=new Map,o={...u5,...t.handlers},l={all:u,applyData:k5,definitionById:i,footnoteById:r,footnoteCounts:s,footnoteOrder:[],handlers:o,one:a,options:t,patch:w5,wrap:v5};return Ap(n,function(c){if(c.type==="definition"||c.type==="footnoteDefinition"){const h=c.type==="definition"?i:r,f=String(c.identifier).toUpperCase();h.has(f)||h.set(f,c)}}),l;function a(c,h){const f=c.type,d=l.handlers[f];if(Hl.call(l.handlers,f)&&d)return d(l,c,h);if(l.options.passThrough&&l.options.passThrough.includes(f)){if("children"in c){const{children:m,...b}=c,g=_s(b);return g.children=l.all(c),g}return _s(c)}return(l.options.unknownHandler||x5)(l,c,h)}function u(c){const h=[];if("children"in c){const f=c.children;let d=-1;for(;++d<f.length;){const p=l.one(f[d],c);if(p){if(d&&f[d-1].type==="break"&&(!Array.isArray(p)&&p.type==="text"&&(p.value=uh(p.value)),!Array.isArray(p)&&p.type==="element")){const m=p.children[0];m&&m.type==="text"&&(m.value=uh(m.value))}Array.isArray(p)?h.push(...p):h.push(p)}}}return h}}function w5(n,e){n.position&&(e.position=n5(n))}function k5(n,e){let t=e;if(n&&n.data){const i=n.data.hName,r=n.data.hChildren,s=n.data.hProperties;if(typeof i=="string")if(t.type==="element")t.tagName=i;else{const o="children"in t?t.children:[t];t={type:"element",tagName:i,properties:{},children:o}}t.type==="element"&&s&&Object.assign(t.properties,_s(s)),"children"in t&&t.children&&r!==null&&r!==void 0&&(t.children=r)}return t}function x5(n,e){const t=e.data||{},i="value"in e&&!(Hl.call(t,"hProperties")||Hl.call(t,"hChildren"))?{type:"text",value:e.value}:{type:"element",tagName:"div",properties:{},children:n.all(e)};return n.patch(e,i),n.applyData(e,i)}function v5(n,e){const t=[];let i=-1;for(e&&t.push({type:"text",value:`
`});++i<n.length;)i&&t.push({type:"text",value:`
`}),t.push(n[i]);return e&&n.length>0&&t.push({type:"text",value:`
`}),t}function uh(n){let e=0,t=n.charCodeAt(e);for(;t===9||t===32;)e++,t=n.charCodeAt(e);return n.slice(e)}function ch(n,e){const t=y5(n,e),i=t.one(n,void 0),r=g5(t),s=Array.isArray(i)?{type:"root",children:i}:i||{type:"root",children:[]};return r&&s.children.push({type:"text",value:`
`},r),s}function S5(n,e){return n&&"run"in n?async function(t,i){const r=ch(t,{file:i,...e});await n.run(r,i)}:function(t,i){return ch(t,{file:i,...n||e})}}const _5=["area","base","basefont","bgsound","br","col","command","embed","frame","hr","image","img","input","keygen","link","meta","param","source","track","wbr"];class vr{constructor(e,t,i){this.normal=t,this.property=e,i&&(this.space=i)}}vr.prototype.normal={};vr.prototype.property={};vr.prototype.space=void 0;function im(n,e){const t={},i={};for(const r of n)Object.assign(t,r.property),Object.assign(i,r.normal);return new vr(t,i,e)}function $l(n){return n.toLowerCase()}class mt{constructor(e,t){this.attribute=t,this.property=e}}mt.prototype.attribute="";mt.prototype.booleanish=!1;mt.prototype.boolean=!1;mt.prototype.commaOrSpaceSeparated=!1;mt.prototype.commaSeparated=!1;mt.prototype.defined=!1;mt.prototype.mustUseProperty=!1;mt.prototype.number=!1;mt.prototype.overloadedBoolean=!1;mt.prototype.property="";mt.prototype.spaceSeparated=!1;mt.prototype.space=void 0;let C5=0;const se=Xn(),Le=Xn(),Wl=Xn(),z=Xn(),xe=Xn(),fi=Xn(),bt=Xn();function Xn(){return 2**++C5}const Vl=Object.freeze(Object.defineProperty({__proto__:null,boolean:se,booleanish:Le,commaOrSpaceSeparated:bt,commaSeparated:fi,number:z,overloadedBoolean:Wl,spaceSeparated:xe},Symbol.toStringTag,{value:"Module"})),Lo=Object.keys(Vl);class Xa extends mt{constructor(e,t,i,r){let s=-1;if(super(e,t),hh(this,"space",r),typeof i=="number")for(;++s<Lo.length;){const o=Lo[s];hh(this,Lo[s],(i&Vl[o])===Vl[o])}}}Xa.prototype.defined=!0;function hh(n,e,t){t&&(n[e]=t)}function Ei(n){const e={},t={};for(const[i,r]of Object.entries(n.properties)){const s=new Xa(i,n.transform(n.attributes||{},i),r,n.space);n.mustUseProperty&&n.mustUseProperty.includes(i)&&(s.mustUseProperty=!0),e[i]=s,t[$l(i)]=i,t[$l(s.attribute)]=i}return new vr(e,t,n.space)}const rm=Ei({properties:{ariaActiveDescendant:null,ariaAtomic:Le,ariaAutoComplete:null,ariaBusy:Le,ariaChecked:Le,ariaColCount:z,ariaColIndex:z,ariaColSpan:z,ariaControls:xe,ariaCurrent:null,ariaDescribedBy:xe,ariaDetails:null,ariaDisabled:Le,ariaDropEffect:xe,ariaErrorMessage:null,ariaExpanded:Le,ariaFlowTo:xe,ariaGrabbed:Le,ariaHasPopup:null,ariaHidden:Le,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:xe,ariaLevel:z,ariaLive:null,ariaModal:Le,ariaMultiLine:Le,ariaMultiSelectable:Le,ariaOrientation:null,ariaOwns:xe,ariaPlaceholder:null,ariaPosInSet:z,ariaPressed:Le,ariaReadOnly:Le,ariaRelevant:null,ariaRequired:Le,ariaRoleDescription:xe,ariaRowCount:z,ariaRowIndex:z,ariaRowSpan:z,ariaSelected:Le,ariaSetSize:z,ariaSort:null,ariaValueMax:z,ariaValueMin:z,ariaValueNow:z,ariaValueText:null,role:null},transform(n,e){return e==="role"?e:"aria-"+e.slice(4).toLowerCase()}});function sm(n,e){return e in n?n[e]:e}function om(n,e){return sm(n,e.toLowerCase())}const A5=Ei({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:fi,acceptCharset:xe,accessKey:xe,action:null,allow:null,allowFullScreen:se,allowPaymentRequest:se,allowUserMedia:se,alt:null,as:null,async:se,autoCapitalize:null,autoComplete:xe,autoFocus:se,autoPlay:se,blocking:xe,capture:null,charSet:null,checked:se,cite:null,className:xe,cols:z,colSpan:null,content:null,contentEditable:Le,controls:se,controlsList:xe,coords:z|fi,crossOrigin:null,data:null,dateTime:null,decoding:null,default:se,defer:se,dir:null,dirName:null,disabled:se,download:Wl,draggable:Le,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:se,formTarget:null,headers:xe,height:z,hidden:Wl,high:z,href:null,hrefLang:null,htmlFor:xe,httpEquiv:xe,id:null,imageSizes:null,imageSrcSet:null,inert:se,inputMode:null,integrity:null,is:null,isMap:se,itemId:null,itemProp:xe,itemRef:xe,itemScope:se,itemType:xe,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:se,low:z,manifest:null,max:null,maxLength:z,media:null,method:null,min:null,minLength:z,multiple:se,muted:se,name:null,nonce:null,noModule:se,noValidate:se,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:se,optimum:z,pattern:null,ping:xe,placeholder:null,playsInline:se,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:se,referrerPolicy:null,rel:xe,required:se,reversed:se,rows:z,rowSpan:z,sandbox:xe,scope:null,scoped:se,seamless:se,selected:se,shadowRootClonable:se,shadowRootDelegatesFocus:se,shadowRootMode:null,shape:null,size:z,sizes:null,slot:null,span:z,spellCheck:Le,src:null,srcDoc:null,srcLang:null,srcSet:null,start:z,step:null,style:null,tabIndex:z,target:null,title:null,translate:null,type:null,typeMustMatch:se,useMap:null,value:Le,width:z,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:xe,axis:null,background:null,bgColor:null,border:z,borderColor:null,bottomMargin:z,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:se,declare:se,event:null,face:null,frame:null,frameBorder:null,hSpace:z,leftMargin:z,link:null,longDesc:null,lowSrc:null,marginHeight:z,marginWidth:z,noResize:se,noHref:se,noShade:se,noWrap:se,object:null,profile:null,prompt:null,rev:null,rightMargin:z,rules:null,scheme:null,scrolling:Le,standby:null,summary:null,text:null,topMargin:z,valueType:null,version:null,vAlign:null,vLink:null,vSpace:z,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:se,disableRemotePlayback:se,prefix:null,property:null,results:z,security:null,unselectable:null},space:"html",transform:om}),T5=Ei({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:bt,accentHeight:z,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:z,amplitude:z,arabicForm:null,ascent:z,attributeName:null,attributeType:null,azimuth:z,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:z,by:null,calcMode:null,capHeight:z,className:xe,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:z,diffuseConstant:z,direction:null,display:null,dur:null,divisor:z,dominantBaseline:null,download:se,dx:null,dy:null,edgeMode:null,editable:null,elevation:z,enableBackground:null,end:null,event:null,exponent:z,externalResourcesRequired:null,fill:null,fillOpacity:z,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:fi,g2:fi,glyphName:fi,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:z,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:z,horizOriginX:z,horizOriginY:z,id:null,ideographic:z,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:z,k:z,k1:z,k2:z,k3:z,k4:z,kernelMatrix:bt,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:z,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:z,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:z,overlineThickness:z,paintOrder:null,panose1:null,path:null,pathLength:z,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:xe,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:z,pointsAtY:z,pointsAtZ:z,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:bt,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:bt,rev:bt,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:bt,requiredFeatures:bt,requiredFonts:bt,requiredFormats:bt,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:z,specularExponent:z,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:z,strikethroughThickness:z,string:null,stroke:null,strokeDashArray:bt,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:z,strokeOpacity:z,strokeWidth:null,style:null,surfaceScale:z,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:bt,tabIndex:z,tableValues:null,target:null,targetX:z,targetY:z,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:bt,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:z,underlineThickness:z,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:z,values:null,vAlphabetic:z,vMathematical:z,vectorEffect:null,vHanging:z,vIdeographic:z,version:null,vertAdvY:z,vertOriginX:z,vertOriginY:z,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:z,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:sm}),lm=Ei({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(n,e){return"xlink:"+e.slice(5).toLowerCase()}}),am=Ei({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:om}),um=Ei({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(n,e){return"xml:"+e.slice(3).toLowerCase()}}),E5=/[A-Z]/g,fh=/-[a-z]/g,M5=/^data[-\w.:]+$/i;function P5(n,e){const t=$l(e);let i=e,r=mt;if(t in n.normal)return n.property[n.normal[t]];if(t.length>4&&t.slice(0,4)==="data"&&M5.test(e)){if(e.charAt(4)==="-"){const s=e.slice(5).replace(fh,D5);i="data"+s.charAt(0).toUpperCase()+s.slice(1)}else{const s=e.slice(4);if(!fh.test(s)){let o=s.replace(E5,I5);o.charAt(0)!=="-"&&(o="-"+o),e="data"+o}}r=Xa}return new r(i,e)}function I5(n){return"-"+n.toLowerCase()}function D5(n){return n.charAt(1).toUpperCase()}const B5=im([rm,A5,lm,am,um],"html"),cm=im([rm,T5,lm,am,um],"svg"),L5=/["&'<>`]/g,O5=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,R5=/[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g,z5=/[|\\{}()[\]^$+*?.]/g,dh=new WeakMap;function F5(n,e){if(n=n.replace(e.subset?N5(e.subset):L5,i),e.subset||e.escapeOnly)return n;return n.replace(O5,t).replace(R5,i);function t(r,s,o){return e.format((r.charCodeAt(0)-55296)*1024+r.charCodeAt(1)-56320+65536,o.charCodeAt(s+2),e)}function i(r,s,o){return e.format(r.charCodeAt(0),o.charCodeAt(s+1),e)}}function N5(n){let e=dh.get(n);return e||(e=q5(n),dh.set(n,e)),e}function q5(n){const e=[];let t=-1;for(;++t<n.length;)e.push(n[t].replace(z5,"\\$&"));return new RegExp("(?:"+e.join("|")+")","g")}const H5=/[\dA-Fa-f]/;function $5(n,e,t){const i="&#x"+n.toString(16).toUpperCase();return t&&e&&!H5.test(String.fromCharCode(e))?i:i+";"}const W5=/\d/;function V5(n,e,t){const i="&#"+String(n);return t&&e&&!W5.test(String.fromCharCode(e))?i:i+";"}const U5=["AElig","AMP","Aacute","Acirc","Agrave","Aring","Atilde","Auml","COPY","Ccedil","ETH","Eacute","Ecirc","Egrave","Euml","GT","Iacute","Icirc","Igrave","Iuml","LT","Ntilde","Oacute","Ocirc","Ograve","Oslash","Otilde","Ouml","QUOT","REG","THORN","Uacute","Ucirc","Ugrave","Uuml","Yacute","aacute","acirc","acute","aelig","agrave","amp","aring","atilde","auml","brvbar","ccedil","cedil","cent","copy","curren","deg","divide","eacute","ecirc","egrave","eth","euml","frac12","frac14","frac34","gt","iacute","icirc","iexcl","igrave","iquest","iuml","laquo","lt","macr","micro","middot","nbsp","not","ntilde","oacute","ocirc","ograve","ordf","ordm","oslash","otilde","ouml","para","plusmn","pound","quot","raquo","reg","sect","shy","sup1","sup2","sup3","szlig","thorn","times","uacute","ucirc","ugrave","uml","uuml","yacute","yen","yuml"],Oo={nbsp:" ",iexcl:"¡",cent:"¢",pound:"£",curren:"¤",yen:"¥",brvbar:"¦",sect:"§",uml:"¨",copy:"©",ordf:"ª",laquo:"«",not:"¬",shy:"­",reg:"®",macr:"¯",deg:"°",plusmn:"±",sup2:"²",sup3:"³",acute:"´",micro:"µ",para:"¶",middot:"·",cedil:"¸",sup1:"¹",ordm:"º",raquo:"»",frac14:"¼",frac12:"½",frac34:"¾",iquest:"¿",Agrave:"À",Aacute:"Á",Acirc:"Â",Atilde:"Ã",Auml:"Ä",Aring:"Å",AElig:"Æ",Ccedil:"Ç",Egrave:"È",Eacute:"É",Ecirc:"Ê",Euml:"Ë",Igrave:"Ì",Iacute:"Í",Icirc:"Î",Iuml:"Ï",ETH:"Ð",Ntilde:"Ñ",Ograve:"Ò",Oacute:"Ó",Ocirc:"Ô",Otilde:"Õ",Ouml:"Ö",times:"×",Oslash:"Ø",Ugrave:"Ù",Uacute:"Ú",Ucirc:"Û",Uuml:"Ü",Yacute:"Ý",THORN:"Þ",szlig:"ß",agrave:"à",aacute:"á",acirc:"â",atilde:"ã",auml:"ä",aring:"å",aelig:"æ",ccedil:"ç",egrave:"è",eacute:"é",ecirc:"ê",euml:"ë",igrave:"ì",iacute:"í",icirc:"î",iuml:"ï",eth:"ð",ntilde:"ñ",ograve:"ò",oacute:"ó",ocirc:"ô",otilde:"õ",ouml:"ö",divide:"÷",oslash:"ø",ugrave:"ù",uacute:"ú",ucirc:"û",uuml:"ü",yacute:"ý",thorn:"þ",yuml:"ÿ",fnof:"ƒ",Alpha:"Α",Beta:"Β",Gamma:"Γ",Delta:"Δ",Epsilon:"Ε",Zeta:"Ζ",Eta:"Η",Theta:"Θ",Iota:"Ι",Kappa:"Κ",Lambda:"Λ",Mu:"Μ",Nu:"Ν",Xi:"Ξ",Omicron:"Ο",Pi:"Π",Rho:"Ρ",Sigma:"Σ",Tau:"Τ",Upsilon:"Υ",Phi:"Φ",Chi:"Χ",Psi:"Ψ",Omega:"Ω",alpha:"α",beta:"β",gamma:"γ",delta:"δ",epsilon:"ε",zeta:"ζ",eta:"η",theta:"θ",iota:"ι",kappa:"κ",lambda:"λ",mu:"μ",nu:"ν",xi:"ξ",omicron:"ο",pi:"π",rho:"ρ",sigmaf:"ς",sigma:"σ",tau:"τ",upsilon:"υ",phi:"φ",chi:"χ",psi:"ψ",omega:"ω",thetasym:"ϑ",upsih:"ϒ",piv:"ϖ",bull:"•",hellip:"…",prime:"′",Prime:"″",oline:"‾",frasl:"⁄",weierp:"℘",image:"ℑ",real:"ℜ",trade:"™",alefsym:"ℵ",larr:"←",uarr:"↑",rarr:"→",darr:"↓",harr:"↔",crarr:"↵",lArr:"⇐",uArr:"⇑",rArr:"⇒",dArr:"⇓",hArr:"⇔",forall:"∀",part:"∂",exist:"∃",empty:"∅",nabla:"∇",isin:"∈",notin:"∉",ni:"∋",prod:"∏",sum:"∑",minus:"−",lowast:"∗",radic:"√",prop:"∝",infin:"∞",ang:"∠",and:"∧",or:"∨",cap:"∩",cup:"∪",int:"∫",there4:"∴",sim:"∼",cong:"≅",asymp:"≈",ne:"≠",equiv:"≡",le:"≤",ge:"≥",sub:"⊂",sup:"⊃",nsub:"⊄",sube:"⊆",supe:"⊇",oplus:"⊕",otimes:"⊗",perp:"⊥",sdot:"⋅",lceil:"⌈",rceil:"⌉",lfloor:"⌊",rfloor:"⌋",lang:"〈",rang:"〉",loz:"◊",spades:"♠",clubs:"♣",hearts:"♥",diams:"♦",quot:'"',amp:"&",lt:"<",gt:">",OElig:"Œ",oelig:"œ",Scaron:"Š",scaron:"š",Yuml:"Ÿ",circ:"ˆ",tilde:"˜",ensp:" ",emsp:" ",thinsp:" ",zwnj:"‌",zwj:"‍",lrm:"‎",rlm:"‏",ndash:"–",mdash:"—",lsquo:"‘",rsquo:"’",sbquo:"‚",ldquo:"“",rdquo:"”",bdquo:"„",dagger:"†",Dagger:"‡",permil:"‰",lsaquo:"‹",rsaquo:"›",euro:"€"},j5=["cent","copy","divide","gt","lt","not","para","times"],hm={}.hasOwnProperty,Ul={};let jr;for(jr in Oo)hm.call(Oo,jr)&&(Ul[Oo[jr]]=jr);const K5=/[^\dA-Za-z]/;function X5(n,e,t,i){const r=String.fromCharCode(n);if(hm.call(Ul,r)){const s=Ul[r],o="&"+s;return t&&U5.includes(s)&&!j5.includes(s)&&(!i||e&&e!==61&&K5.test(String.fromCharCode(e)))?o:o+";"}return""}function G5(n,e,t){let i=$5(n,e,t.omitOptionalSemicolons),r;if((t.useNamedReferences||t.useShortestReferences)&&(r=X5(n,e,t.omitOptionalSemicolons,t.attribute)),(t.useShortestReferences||!r)&&t.useShortestReferences){const s=V5(n,e,t.omitOptionalSemicolons);s.length<i.length&&(i=s)}return r&&(!t.useShortestReferences||r.length<i.length)?r:i}function di(n,e){return F5(n,Object.assign({format:G5},e))}const Y5=/^>|^->|<!--|-->|--!>|<!-$/g,Q5=[">"],J5=["<",">"];function Z5(n,e,t,i){return i.settings.bogusComments?"<?"+di(n.value,Object.assign({},i.settings.characterReferences,{subset:Q5}))+">":"<!--"+n.value.replace(Y5,r)+"-->";function r(s){return di(s,Object.assign({},i.settings.characterReferences,{subset:J5}))}}function e6(n,e,t,i){return"<!"+(i.settings.upperDoctype?"DOCTYPE":"doctype")+(i.settings.tightDoctype?"":" ")+"html>"}function t6(n,e){const t=e||{};return(n[n.length-1]===""?[...n,""]:n).join((t.padRight?" ":"")+","+(t.padLeft===!1?"":" ")).trim()}function n6(n){return n.join(" ").trim()}const i6=/[ \t\n\f\r]/g;function Ga(n){return typeof n=="object"?n.type==="text"?ph(n.value):!1:ph(n)}function ph(n){return n.replace(i6,"")===""}const qe=dm(1),fm=dm(-1),r6=[];function dm(n){return e;function e(t,i,r){const s=t?t.children:r6;let o=(i||0)+n,l=s[o];if(!r)for(;l&&Ga(l);)o+=n,l=s[o];return l}}const s6={}.hasOwnProperty;function pm(n){return e;function e(t,i,r){return s6.call(n,t.tagName)&&n[t.tagName](t,i,r)}}const Ya=pm({body:l6,caption:Ro,colgroup:Ro,dd:h6,dt:c6,head:Ro,html:o6,li:u6,optgroup:f6,option:d6,p:a6,rp:mh,rt:mh,tbody:m6,td:gh,tfoot:g6,th:gh,thead:p6,tr:b6});function Ro(n,e,t){const i=qe(t,e,!0);return!i||i.type!=="comment"&&!(i.type==="text"&&Ga(i.value.charAt(0)))}function o6(n,e,t){const i=qe(t,e);return!i||i.type!=="comment"}function l6(n,e,t){const i=qe(t,e);return!i||i.type!=="comment"}function a6(n,e,t){const i=qe(t,e);return i?i.type==="element"&&(i.tagName==="address"||i.tagName==="article"||i.tagName==="aside"||i.tagName==="blockquote"||i.tagName==="details"||i.tagName==="div"||i.tagName==="dl"||i.tagName==="fieldset"||i.tagName==="figcaption"||i.tagName==="figure"||i.tagName==="footer"||i.tagName==="form"||i.tagName==="h1"||i.tagName==="h2"||i.tagName==="h3"||i.tagName==="h4"||i.tagName==="h5"||i.tagName==="h6"||i.tagName==="header"||i.tagName==="hgroup"||i.tagName==="hr"||i.tagName==="main"||i.tagName==="menu"||i.tagName==="nav"||i.tagName==="ol"||i.tagName==="p"||i.tagName==="pre"||i.tagName==="section"||i.tagName==="table"||i.tagName==="ul"):!t||!(t.type==="element"&&(t.tagName==="a"||t.tagName==="audio"||t.tagName==="del"||t.tagName==="ins"||t.tagName==="map"||t.tagName==="noscript"||t.tagName==="video"))}function u6(n,e,t){const i=qe(t,e);return!i||i.type==="element"&&i.tagName==="li"}function c6(n,e,t){const i=qe(t,e);return!!(i&&i.type==="element"&&(i.tagName==="dt"||i.tagName==="dd"))}function h6(n,e,t){const i=qe(t,e);return!i||i.type==="element"&&(i.tagName==="dt"||i.tagName==="dd")}function mh(n,e,t){const i=qe(t,e);return!i||i.type==="element"&&(i.tagName==="rp"||i.tagName==="rt")}function f6(n,e,t){const i=qe(t,e);return!i||i.type==="element"&&i.tagName==="optgroup"}function d6(n,e,t){const i=qe(t,e);return!i||i.type==="element"&&(i.tagName==="option"||i.tagName==="optgroup")}function p6(n,e,t){const i=qe(t,e);return!!(i&&i.type==="element"&&(i.tagName==="tbody"||i.tagName==="tfoot"))}function m6(n,e,t){const i=qe(t,e);return!i||i.type==="element"&&(i.tagName==="tbody"||i.tagName==="tfoot")}function g6(n,e,t){return!qe(t,e)}function b6(n,e,t){const i=qe(t,e);return!i||i.type==="element"&&i.tagName==="tr"}function gh(n,e,t){const i=qe(t,e);return!i||i.type==="element"&&(i.tagName==="td"||i.tagName==="th")}const y6=pm({body:x6,colgroup:v6,head:k6,html:w6,tbody:S6});function w6(n){const e=qe(n,-1);return!e||e.type!=="comment"}function k6(n){const e=new Set;for(const i of n.children)if(i.type==="element"&&(i.tagName==="base"||i.tagName==="title")){if(e.has(i.tagName))return!1;e.add(i.tagName)}const t=n.children[0];return!t||t.type==="element"}function x6(n){const e=qe(n,-1,!0);return!e||e.type!=="comment"&&!(e.type==="text"&&Ga(e.value.charAt(0)))&&!(e.type==="element"&&(e.tagName==="meta"||e.tagName==="link"||e.tagName==="script"||e.tagName==="style"||e.tagName==="template"))}function v6(n,e,t){const i=fm(t,e),r=qe(n,-1,!0);return t&&i&&i.type==="element"&&i.tagName==="colgroup"&&Ya(i,t.children.indexOf(i),t)?!1:!!(r&&r.type==="element"&&r.tagName==="col")}function S6(n,e,t){const i=fm(t,e),r=qe(n,-1);return t&&i&&i.type==="element"&&(i.tagName==="thead"||i.tagName==="tbody")&&Ya(i,t.children.indexOf(i),t)?!1:!!(r&&r.type==="element"&&r.tagName==="tr")}const Kr={name:[[`	
\f\r &/=>`.split(""),`	
\f\r "&'/=>\``.split("")],[`\0	
\f\r "&'/<=>`.split(""),`\0	
\f\r "&'/<=>\``.split("")]],unquoted:[[`	
\f\r &>`.split(""),`\0	
\f\r "&'<=>\``.split("")],[`\0	
\f\r "&'<=>\``.split(""),`\0	
\f\r "&'<=>\``.split("")]],single:[["&'".split(""),"\"&'`".split("")],["\0&'".split(""),"\0\"&'`".split("")]],double:[['"&'.split(""),"\"&'`".split("")],['\0"&'.split(""),"\0\"&'`".split("")]]};function _6(n,e,t,i){const r=i.schema,s=r.space==="svg"?!1:i.settings.omitOptionalTags;let o=r.space==="svg"?i.settings.closeEmptyElements:i.settings.voids.includes(n.tagName.toLowerCase());const l=[];let a;r.space==="html"&&n.tagName==="svg"&&(i.schema=cm);const u=C6(i,n.properties),c=i.all(r.space==="html"&&n.tagName==="template"?n.content:n);return i.schema=r,c&&(o=!1),(u||!s||!y6(n,e,t))&&(l.push("<",n.tagName,u?" "+u:""),o&&(r.space==="svg"||i.settings.closeSelfClosing)&&(a=u.charAt(u.length-1),(!i.settings.tightSelfClosing||a==="/"||a&&a!=='"'&&a!=="'")&&l.push(" "),l.push("/")),l.push(">")),l.push(c),!o&&(!s||!Ya(n,e,t))&&l.push("</"+n.tagName+">"),l.join("")}function C6(n,e){const t=[];let i=-1,r;if(e){for(r in e)if(e[r]!==null&&e[r]!==void 0){const s=A6(n,r,e[r]);s&&t.push(s)}}for(;++i<t.length;){const s=n.settings.tightAttributes?t[i].charAt(t[i].length-1):void 0;i!==t.length-1&&s!=='"'&&s!=="'"&&(t[i]+=" ")}return t.join("")}function A6(n,e,t){const i=P5(n.schema,e),r=n.settings.allowParseErrors&&n.schema.space==="html"?0:1,s=n.settings.allowDangerousCharacters?0:1;let o=n.quote,l;if(i.overloadedBoolean&&(t===i.attribute||t==="")?t=!0:(i.boolean||i.overloadedBoolean)&&(typeof t!="string"||t===i.attribute||t==="")&&(t=!!t),t==null||t===!1||typeof t=="number"&&Number.isNaN(t))return"";const a=di(i.attribute,Object.assign({},n.settings.characterReferences,{subset:Kr.name[r][s]}));return t===!0||(t=Array.isArray(t)?(i.commaSeparated?t6:n6)(t,{padLeft:!n.settings.tightCommaSeparatedLists}):String(t),n.settings.collapseEmptyAttributes&&!t)?a:(n.settings.preferUnquoted&&(l=di(t,Object.assign({},n.settings.characterReferences,{attribute:!0,subset:Kr.unquoted[r][s]}))),l!==t&&(n.settings.quoteSmart&&vs(t,o)>vs(t,n.alternative)&&(o=n.alternative),l=o+di(t,Object.assign({},n.settings.characterReferences,{subset:(o==="'"?Kr.single:Kr.double)[r][s],attribute:!0}))+o),a+(l&&"="+l))}const T6=["<","&"];function mm(n,e,t,i){return t&&t.type==="element"&&(t.tagName==="script"||t.tagName==="style")?n.value:di(n.value,Object.assign({},i.settings.characterReferences,{subset:T6}))}function E6(n,e,t,i){return i.settings.allowDangerousHtml?n.value:mm(n,e,t,i)}function M6(n,e,t,i){return i.all(n)}const P6=kp("type",{invalid:I6,unknown:D6,handlers:{comment:Z5,doctype:e6,element:_6,raw:E6,root:M6,text:mm}});function I6(n){throw new Error("Expected node, not `"+n+"`")}function D6(n){const e=n;throw new Error("Cannot compile unknown node `"+e.type+"`")}const B6={},L6={},O6=[];function R6(n,e){const t=e||B6,i=t.quote||'"',r=i==='"'?"'":'"';if(i!=='"'&&i!=="'")throw new Error("Invalid quote `"+i+"`, expected `'` or `\"`");return{one:z6,all:F6,settings:{omitOptionalTags:t.omitOptionalTags||!1,allowParseErrors:t.allowParseErrors||!1,allowDangerousCharacters:t.allowDangerousCharacters||!1,quoteSmart:t.quoteSmart||!1,preferUnquoted:t.preferUnquoted||!1,tightAttributes:t.tightAttributes||!1,upperDoctype:t.upperDoctype||!1,tightDoctype:t.tightDoctype||!1,bogusComments:t.bogusComments||!1,tightCommaSeparatedLists:t.tightCommaSeparatedLists||!1,tightSelfClosing:t.tightSelfClosing||!1,collapseEmptyAttributes:t.collapseEmptyAttributes||!1,allowDangerousHtml:t.allowDangerousHtml||!1,voids:t.voids||_5,characterReferences:t.characterReferences||L6,closeSelfClosing:t.closeSelfClosing||!1,closeEmptyElements:t.closeEmptyElements||!1},schema:t.space==="svg"?cm:B5,quote:i,alternative:r}.one(Array.isArray(n)?{type:"root",children:n}:n,void 0,void 0)}function z6(n,e,t){return P6(n,e,t,this)}function F6(n){const e=[],t=n&&n.children||O6;let i=-1;for(;++i<t.length;)e[i]=this.one(t[i],i,n);return e.join("")}function N6(n){const e=this,t={...e.data("settings"),...n};e.compiler=i;function i(r){return R6(r,t)}}function q6(n){return n.replace(/[\t ]+$/u,"")}function jl(n){return n.trimEnd().split(/\r?\n/u).map(q6).join(`
`)}function H6(n,e){return jl(n)===jl(e)}const It=Ek,$6="https://github.com/Hypercubed/f-flat-minor",W6=sS().use(R4).use(S5).use(N6);function tr(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function V6(n){const e=n.replaceAll(`\r
`,`
`).trim();return e?String(W6.processSync(e)).replaceAll("<a ",'<a target="_blank" rel="noreferrer" '):""}function bh(n){return`${$6}/edit/main/${rp(n)}`}function U6(n){const e=n?Ba(n):0;return`${e} ${e===1?"byte":"bytes"}`}function Ni(n){return n.map(e=>{const t=e.tone&&e.tone!=="default"?` ${e.tone}`:"",i=e.showDot?'<span class="summary-running-dot" aria-hidden="true"></span>':"";return`
      <span class="summary-bar-item">
        <span class="label">${tr(e.label)}</span>
        <span class="value${t}">${i}${tr(e.value)}</span>
      </span>
    `}).join("")}function j6(n,e){const t=n.querySelector(e);if(!t)throw new Error(`Missing Codetta UI element: ${e}`);return t}function K6(n){var gt;if(It.length===0)throw new Error("No Codetta entries found.");n.innerHTML=`
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
              <div id="codetta-description" class="codetta-description"></div>
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
  `;const e=n.querySelector('[data-screen="list"]'),t=n.querySelector('[data-screen="detail"]'),i=n.querySelector("#codetta-etude-list"),r=n.querySelector("#codetta-back"),s=n.querySelector("#codetta-prev"),o=n.querySelector("#codetta-next"),l=n.querySelector("#codetta-title"),a=n.querySelector("#codetta-description"),u=n.querySelector("#codetta-expected"),c=n.querySelector("#codetta-leader"),h=n.querySelector("#codetta-bytes"),f=n.querySelector("#codetta-date"),d=j6(n,"#codetta-attempt"),p=n.querySelector("#codetta-load-best"),m=n.querySelector("#codetta-byte-status"),b=n.querySelector("#codetta-run"),g=n.querySelector("#codetta-summary"),S=n.querySelector("#codetta-output"),v=n.querySelector("#codetta-output-wrap"),D=n.querySelector("#codetta-output-wrap-toggle"),A=n.querySelector("#codetta-bytecode"),k=n.querySelector("#codetta-bytecode-meta"),T=n.querySelector("#codetta-bytecode-count"),B=n.querySelector("#codetta-result"),I=n.querySelector("#codetta-submit"),x=n.querySelector("#codetta-submit-help"),P=n.querySelector("#codetta-issue-title"),E=n.querySelector("#codetta-issue-body"),W=n.querySelector("#codetta-copy"),$=Array.from(n.querySelectorAll("[data-codetta-detail-tab]")),q=Array.from(n.querySelectorAll("[data-codetta-detail-panel]"));if(!e||!t||!i||!r||!s||!o||!l||!a||!u||!c||!h||!f||!p||!m||!b||!g||!S||!v||!D||!A||!k||!T||!B||!I||!x||!P||!E||!W)throw new Error("Missing Codetta UI elements.");const X=Ia(d,((gt=It[0])==null?void 0:gt.solution)??"",{extraExtensions:[Pa],onDocumentChange:()=>{re(),Re()}}),_={listScreen:e,detailScreen:t,listBody:i,backButton:r,prevButton:s,nextButton:o,title:l,description:a,expected:u,leader:c,bytes:h,date:f,attemptEditor:X,loadBest:p,byteStatus:m,runButton:b,summary:g,output:S,outputWrap:v,outputWrapToggle:D,bytecode:A,bytecodeMeta:k,bytecodeCount:T,result:B,submit:I,submitHelp:x,issueTitle:P,issueBody:E,copyButton:W,detailTabs:$,detailPanels:q};let U=It[0],j=!1,y=null;function re(){j=!1,y=null,_.output.textContent="(Run your attempt to compare output.)",w(""),ie(),_.byteStatus.textContent="Compiled bytes: run to compute and compare against the current best.",delete _.byteStatus.dataset.tone,_.result.textContent="Status: run required",_.result.dataset.tone="pending"}function ne(R){_.detailTabs.forEach(be=>{const Te=be.dataset.codettaDetailTab===R;be.classList.toggle("is-active",Te)}),_.detailPanels.forEach(be=>{const Te=be.dataset.codettaDetailPanel===R;be.classList.toggle("is-active",Te)}),_.outputWrapToggle.hidden=R==="bytecode",_.bytecodeMeta.hidden=R!=="bytecode"}function w(R){_.bytecode.textContent=ep(R)||"(Run your attempt to inspect bytecode.)",_.bytecodeCount.textContent=U6(R)}function oe(R){_.output.classList.toggle("is-wrapped",R)}oe(_.outputWrap.checked),_.outputWrap.addEventListener("change",()=>{oe(_.outputWrap.checked)});function Q(R){_.runButton.disabled=R,_.runButton.textContent=R?"Running...":"▶ Run",_.runButton.setAttribute("aria-label",R?"Running Codetta attempt":"Run Codetta attempt")}function ie(){_.summary.innerHTML=Ni([{label:"compile",value:"—",tone:"pending"},{label:"execute",value:"—",tone:"pending"},{label:"vm steps",value:"—",tone:"pending"},{label:"exit",value:"—",tone:"pending"}]),_.summary.dataset.state="idle"}function Me(R){if(y=R,R===null)return _.byteStatus.textContent="Compiled bytes: run to compute and compare against the current best.",delete _.byteStatus.dataset.tone,null;const be=R-U.bytes;return be<0?(_.byteStatus.textContent=`Compiled bytes: ${R} ← new record candidate (${Math.abs(be)} under ${U.bytes})`,_.byteStatus.dataset.tone="good",R):be===0?(_.byteStatus.textContent=`Compiled bytes: ${R} ← tied with current best (${U.bytes})`,_.byteStatus.dataset.tone="neutral",R):(_.byteStatus.textContent=`Compiled bytes: ${R} ← over current best (${U.bytes})`,_.byteStatus.dataset.tone="bad",R)}function Ae(R){return It.findIndex(be=>be.id===R.id)}function Pe(){const R=Ae(U);_.prevButton.disabled=R<=0,_.nextButton.disabled=R===-1||R>=It.length-1}function Re(){const R=j&&y!==null&&y<U.bytes;if(_.submit.disabled=!R,_.submitHelp.hidden=!R,!R||y===null){_.issueTitle.textContent="",_.issueBody.value="";return}const be=bh(U.id),Te=rp(U.id);_.issueTitle.textContent=`Target file: ${Te}`,_.issueBody.value=[be,"",`GitHub edit target: ${Te}`,`Current winning score: ${U.bytes} bytes`,`Your verified score: ${y} bytes`,"","After committing the file edit in GitHub:","1. Choose Create pull request.","2. Use the Codetta PR template.","3. Include validation notes and the new byte count."].join(`
`)}function Qe(){_.listBody.innerHTML=It.map(R=>`
      <tr data-etude-id="${R.id}" role="button" tabindex="0">
        <td>› ${tr(R.title)}</td>
        <td>${tr(R.leader)}</td>
        <td>${R.bytes}</td>
        <td>${tr(R.date)}</td>
      </tr>
    `).join("")}function ze(R){U=R,_.title.textContent=R.title,_.description.innerHTML=V6(R.description),_.expected.textContent=R.expected,_.leader.textContent=R.leader,_.bytes.textContent=String(R.bytes),_.date.textContent=R.date,_.attemptEditor.setValue(R.solution),ne("output"),re(),Re(),Pe(),_.listScreen.hidden=!0,_.detailScreen.hidden=!1,_.attemptEditor.focus()}function it(){_.detailScreen.hidden=!0,_.listScreen.hidden=!1}Qe(),ie(),Q(!1),ze(U),it(),_.detailTabs.forEach(R=>{R.addEventListener("click",()=>{ne(R.dataset.codettaDetailTab??"output")})}),_.listBody.addEventListener("click",R=>{const be=R.target.closest("tr[data-etude-id]");if(!be)return;const Te=It.find(He=>He.id===be.getAttribute("data-etude-id"));Te&&ze(Te)}),_.listBody.addEventListener("keydown",R=>{if(R.key!=="Enter"&&R.key!==" ")return;const be=R.target.closest("tr[data-etude-id]");if(!be)return;const Te=It.find(He=>He.id===be.getAttribute("data-etude-id"));Te&&(R.preventDefault(),ze(Te))}),_.backButton.addEventListener("click",it),_.prevButton.addEventListener("click",()=>{const R=Ae(U);R<=0||ze(It[R-1])}),_.nextButton.addEventListener("click",()=>{const R=Ae(U);R===-1||R>=It.length-1||ze(It[R+1])}),_.loadBest.addEventListener("click",()=>{_.attemptEditor.setValue(U.solution),_.attemptEditor.focus()}),_.runButton.addEventListener("click",async()=>{Ta(_.runButton),Q(!0),_.summary.dataset.state="running",_.summary.innerHTML=Ni([{label:"compile",value:"Running...",tone:"running",showDot:!0},{label:"execute",value:"…",tone:"pending"},{label:"vm steps",value:"…",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]);try{const R=await La(_.attemptEditor.getValue(),"",!0,{filename:Tk(U.id),onProgress:({vmCyclesExecuted:rt,compileMs:st,executeElapsedMs:St,bytecode:Ue})=>{Ue!==void 0&&w(Ue),_.summary.innerHTML=Ni([{label:"compile",value:st!==void 0?`${st.toFixed(2)} ms`:"…",tone:"running"},{label:"execute",value:St!==void 0?`${St.toFixed(2)} ms`:"…",tone:"running",showDot:!0},{label:"vm steps",value:_i(rt),tone:"running"},{label:"exit",value:"pending",tone:"pending"}])}}),be=R.terminal==="cancelled"?"cancelled":R.terminal==="error"?"error":String(R.exitCode),Te=R.terminal==="cancelled"?"pending":R.terminal==="error"?"error":R.exitCode===0?"success":"error";if(_.summary.dataset.state="idle",_.summary.innerHTML=Ni([{label:"compile",value:`${R.compileMs.toFixed(2)} ms`},{label:"execute",value:`${R.executeMs.toFixed(2)} ms`},{label:"vm steps",value:R.vmCyclesExecuted!==void 0?_i(R.vmCyclesExecuted):"—"},{label:"exit",value:be,tone:Te}]),w(R.bytecode),Me(R.compiledBytes),R.terminal==="error"){j=!1,_.output.textContent=R.logs.join(`
`)||"Run failed.",_.result.textContent="Status: error",_.result.dataset.tone="bad",Re();return}const He=jl(R.output);j=H6(R.output,U.expected),_.output.textContent=He||"(no output)",_.result.textContent=j?"✓ Output matches expected":"✗ Output does not match expected",_.result.dataset.tone=j?"good":"bad",Re()}catch(R){j=!1,y=null,_.output.textContent=R instanceof Error?R.message:String(R),w(""),Me(null),_.summary.dataset.state="idle",_.summary.innerHTML=Ni([{label:"compile",value:"failed",tone:"error"},{label:"execute",value:"—",tone:"pending"},{label:"vm steps",value:"—",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),_.result.textContent="Status: error",_.result.dataset.tone="bad",Re()}finally{Ea(),Q(!1)}}),_.submit.addEventListener("click",()=>{_.submit.disabled||window.location.assign(bh(U.id))}),_.copyButton.addEventListener("click",async()=>{const R=_.issueBody.value;try{await navigator.clipboard.writeText(R),_.copyButton.textContent="Copied!",window.setTimeout(()=>{_.copyButton.textContent="Copy"},1200)}catch{_.issueBody.focus(),_.issueBody.select()}})}var Ke=Uint8Array,kt=Uint16Array,Qa=Int32Array,Vs=new Ke([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Us=new Ke([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Kl=new Ke([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),gm=function(n,e){for(var t=new kt(31),i=0;i<31;++i)t[i]=e+=1<<n[i-1];for(var r=new Qa(t[30]),i=1;i<30;++i)for(var s=t[i];s<t[i+1];++s)r[s]=s-t[i]<<5|i;return{b:t,r}},bm=gm(Vs,2),ym=bm.b,Xl=bm.r;ym[28]=258,Xl[258]=28;var wm=gm(Us,0),X6=wm.b,yh=wm.r,Gl=new kt(32768);for(var Se=0;Se<32768;++Se){var mn=(Se&43690)>>1|(Se&21845)<<1;mn=(mn&52428)>>2|(mn&13107)<<2,mn=(mn&61680)>>4|(mn&3855)<<4,Gl[Se]=((mn&65280)>>8|(mn&255)<<8)>>1}var Zt=(function(n,e,t){for(var i=n.length,r=0,s=new kt(e);r<i;++r)n[r]&&++s[n[r]-1];var o=new kt(e);for(r=1;r<e;++r)o[r]=o[r-1]+s[r-1]<<1;var l;if(t){l=new kt(1<<e);var a=15-e;for(r=0;r<i;++r)if(n[r])for(var u=r<<4|n[r],c=e-n[r],h=o[n[r]-1]++<<c,f=h|(1<<c)-1;h<=f;++h)l[Gl[h]>>a]=u}else for(l=new kt(i),r=0;r<i;++r)n[r]&&(l[r]=Gl[o[n[r]-1]++]>>15-n[r]);return l}),Tn=new Ke(288);for(var Se=0;Se<144;++Se)Tn[Se]=8;for(var Se=144;Se<256;++Se)Tn[Se]=9;for(var Se=256;Se<280;++Se)Tn[Se]=7;for(var Se=280;Se<288;++Se)Tn[Se]=8;var pr=new Ke(32);for(var Se=0;Se<32;++Se)pr[Se]=5;var G6=Zt(Tn,9,0),Y6=Zt(Tn,9,1),Q6=Zt(pr,5,0),J6=Zt(pr,5,1),zo=function(n){for(var e=n[0],t=1;t<n.length;++t)n[t]>e&&(e=n[t]);return e},Dt=function(n,e,t){var i=e/8|0;return(n[i]|n[i+1]<<8)>>(e&7)&t},Fo=function(n,e){var t=e/8|0;return(n[t]|n[t+1]<<8|n[t+2]<<16)>>(e&7)},Ja=function(n){return(n+7)/8|0},km=function(n,e,t){return(t==null||t>n.length)&&(t=n.length),new Ke(n.subarray(e,t))},Z6=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],on=function(n,e,t){var i=new Error(e||Z6[n]);if(i.code=n,Error.captureStackTrace&&Error.captureStackTrace(i,on),!t)throw i;return i},e8=function(n,e,t,i){var r=n.length,s=0;if(!r||e.f&&!e.l)return t||new Ke(0);var o=!t,l=o||e.i!=2,a=e.i;o&&(t=new Ke(r*3));var u=function(Qe){var ze=t.length;if(Qe>ze){var it=new Ke(Math.max(ze*2,Qe));it.set(t),t=it}},c=e.f||0,h=e.p||0,f=e.b||0,d=e.l,p=e.d,m=e.m,b=e.n,g=r*8;do{if(!d){c=Dt(n,h,1);var S=Dt(n,h+1,3);if(h+=3,S)if(S==1)d=Y6,p=J6,m=9,b=5;else if(S==2){var k=Dt(n,h,31)+257,T=Dt(n,h+10,15)+4,B=k+Dt(n,h+5,31)+1;h+=14;for(var I=new Ke(B),x=new Ke(19),P=0;P<T;++P)x[Kl[P]]=Dt(n,h+P*3,7);h+=T*3;for(var E=zo(x),W=(1<<E)-1,$=Zt(x,E,1),P=0;P<B;){var q=$[Dt(n,h,W)];h+=q&15;var v=q>>4;if(v<16)I[P++]=v;else{var X=0,_=0;for(v==16?(_=3+Dt(n,h,3),h+=2,X=I[P-1]):v==17?(_=3+Dt(n,h,7),h+=3):v==18&&(_=11+Dt(n,h,127),h+=7);_--;)I[P++]=X}}var U=I.subarray(0,k),j=I.subarray(k);m=zo(U),b=zo(j),d=Zt(U,m,1),p=Zt(j,b,1)}else on(1);else{var v=Ja(h)+4,D=n[v-4]|n[v-3]<<8,A=v+D;if(A>r){a&&on(0);break}l&&u(f+D),t.set(n.subarray(v,A),f),e.b=f+=D,e.p=h=A*8,e.f=c;continue}if(h>g){a&&on(0);break}}l&&u(f+131072);for(var y=(1<<m)-1,re=(1<<b)-1,ne=h;;ne=h){var X=d[Fo(n,h)&y],w=X>>4;if(h+=X&15,h>g){a&&on(0);break}if(X||on(2),w<256)t[f++]=w;else if(w==256){ne=h,d=null;break}else{var oe=w-254;if(w>264){var P=w-257,Q=Vs[P];oe=Dt(n,h,(1<<Q)-1)+ym[P],h+=Q}var ie=p[Fo(n,h)&re],Me=ie>>4;ie||on(3),h+=ie&15;var j=X6[Me];if(Me>3){var Q=Us[Me];j+=Fo(n,h)&(1<<Q)-1,h+=Q}if(h>g){a&&on(0);break}l&&u(f+131072);var Ae=f+oe;if(f<j){var Pe=s-j,Re=Math.min(j,Ae);for(Pe+f<0&&on(3);f<Re;++f)t[f]=i[Pe+f]}for(;f<Ae;++f)t[f]=t[f-j]}}e.l=d,e.p=ne,e.b=f,e.f=c,d&&(c=1,e.m=m,e.d=p,e.n=b)}while(!c);return f!=t.length&&o?km(t,0,f):t.subarray(0,f)},sn=function(n,e,t){t<<=e&7;var i=e/8|0;n[i]|=t,n[i+1]|=t>>8},qi=function(n,e,t){t<<=e&7;var i=e/8|0;n[i]|=t,n[i+1]|=t>>8,n[i+2]|=t>>16},No=function(n,e){for(var t=[],i=0;i<n.length;++i)n[i]&&t.push({s:i,f:n[i]});var r=t.length,s=t.slice();if(!r)return{t:vm,l:0};if(r==1){var o=new Ke(t[0].s+1);return o[t[0].s]=1,{t:o,l:1}}t.sort(function(A,k){return A.f-k.f}),t.push({s:-1,f:25001});var l=t[0],a=t[1],u=0,c=1,h=2;for(t[0]={s:-1,f:l.f+a.f,l,r:a};c!=r-1;)l=t[t[u].f<t[h].f?u++:h++],a=t[u!=c&&t[u].f<t[h].f?u++:h++],t[c++]={s:-1,f:l.f+a.f,l,r:a};for(var f=s[0].s,i=1;i<r;++i)s[i].s>f&&(f=s[i].s);var d=new kt(f+1),p=Yl(t[c-1],d,0);if(p>e){var i=0,m=0,b=p-e,g=1<<b;for(s.sort(function(k,T){return d[T.s]-d[k.s]||k.f-T.f});i<r;++i){var S=s[i].s;if(d[S]>e)m+=g-(1<<p-d[S]),d[S]=e;else break}for(m>>=b;m>0;){var v=s[i].s;d[v]<e?m-=1<<e-d[v]++-1:++i}for(;i>=0&&m;--i){var D=s[i].s;d[D]==e&&(--d[D],++m)}p=e}return{t:new Ke(d),l:p}},Yl=function(n,e,t){return n.s==-1?Math.max(Yl(n.l,e,t+1),Yl(n.r,e,t+1)):e[n.s]=t},wh=function(n){for(var e=n.length;e&&!n[--e];);for(var t=new kt(++e),i=0,r=n[0],s=1,o=function(a){t[i++]=a},l=1;l<=e;++l)if(n[l]==r&&l!=e)++s;else{if(!r&&s>2){for(;s>138;s-=138)o(32754);s>2&&(o(s>10?s-11<<5|28690:s-3<<5|12305),s=0)}else if(s>3){for(o(r),--s;s>6;s-=6)o(8304);s>2&&(o(s-3<<5|8208),s=0)}for(;s--;)o(r);s=1,r=n[l]}return{c:t.subarray(0,i),n:e}},Hi=function(n,e){for(var t=0,i=0;i<e.length;++i)t+=n[i]*e[i];return t},xm=function(n,e,t){var i=t.length,r=Ja(e+2);n[r]=i&255,n[r+1]=i>>8,n[r+2]=n[r]^255,n[r+3]=n[r+1]^255;for(var s=0;s<i;++s)n[r+s+4]=t[s];return(r+4+i)*8},kh=function(n,e,t,i,r,s,o,l,a,u,c){sn(e,c++,t),++r[256];for(var h=No(r,15),f=h.t,d=h.l,p=No(s,15),m=p.t,b=p.l,g=wh(f),S=g.c,v=g.n,D=wh(m),A=D.c,k=D.n,T=new kt(19),B=0;B<S.length;++B)++T[S[B]&31];for(var B=0;B<A.length;++B)++T[A[B]&31];for(var I=No(T,7),x=I.t,P=I.l,E=19;E>4&&!x[Kl[E-1]];--E);var W=u+5<<3,$=Hi(r,Tn)+Hi(s,pr)+o,q=Hi(r,f)+Hi(s,m)+o+14+3*E+Hi(T,x)+2*T[16]+3*T[17]+7*T[18];if(a>=0&&W<=$&&W<=q)return xm(e,c,n.subarray(a,a+u));var X,_,U,j;if(sn(e,c,1+(q<$)),c+=2,q<$){X=Zt(f,d,0),_=f,U=Zt(m,b,0),j=m;var y=Zt(x,P,0);sn(e,c,v-257),sn(e,c+5,k-1),sn(e,c+10,E-4),c+=14;for(var B=0;B<E;++B)sn(e,c+3*B,x[Kl[B]]);c+=3*E;for(var re=[S,A],ne=0;ne<2;++ne)for(var w=re[ne],B=0;B<w.length;++B){var oe=w[B]&31;sn(e,c,y[oe]),c+=x[oe],oe>15&&(sn(e,c,w[B]>>5&127),c+=w[B]>>12)}}else X=G6,_=Tn,U=Q6,j=pr;for(var B=0;B<l;++B){var Q=i[B];if(Q>255){var oe=Q>>18&31;qi(e,c,X[oe+257]),c+=_[oe+257],oe>7&&(sn(e,c,Q>>23&31),c+=Vs[oe]);var ie=Q&31;qi(e,c,U[ie]),c+=j[ie],ie>3&&(qi(e,c,Q>>5&8191),c+=Us[ie])}else qi(e,c,X[Q]),c+=_[Q]}return qi(e,c,X[256]),c+_[256]},t8=new Qa([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),vm=new Ke(0),n8=function(n,e,t,i,r,s){var o=s.z||n.length,l=new Ke(i+o+5*(1+Math.ceil(o/7e3))+r),a=l.subarray(i,l.length-r),u=s.l,c=(s.r||0)&7;if(e){c&&(a[0]=s.r>>3);for(var h=t8[e-1],f=h>>13,d=h&8191,p=(1<<t)-1,m=s.p||new kt(32768),b=s.h||new kt(p+1),g=Math.ceil(t/3),S=2*g,v=function(gt){return(n[gt]^n[gt+1]<<g^n[gt+2]<<S)&p},D=new Qa(25e3),A=new kt(288),k=new kt(32),T=0,B=0,I=s.i||0,x=0,P=s.w||0,E=0;I+2<o;++I){var W=v(I),$=I&32767,q=b[W];if(m[$]=q,b[W]=$,P<=I){var X=o-I;if((T>7e3||x>24576)&&(X>423||!u)){c=kh(n,a,0,D,A,k,B,x,E,I-E,c),x=T=B=0,E=I;for(var _=0;_<286;++_)A[_]=0;for(var _=0;_<30;++_)k[_]=0}var U=2,j=0,y=d,re=$-q&32767;if(X>2&&W==v(I-re))for(var ne=Math.min(f,X)-1,w=Math.min(32767,I),oe=Math.min(258,X);re<=w&&--y&&$!=q;){if(n[I+U]==n[I+U-re]){for(var Q=0;Q<oe&&n[I+Q]==n[I+Q-re];++Q);if(Q>U){if(U=Q,j=re,Q>ne)break;for(var ie=Math.min(re,Q-2),Me=0,_=0;_<ie;++_){var Ae=I-re+_&32767,Pe=m[Ae],Re=Ae-Pe&32767;Re>Me&&(Me=Re,q=Ae)}}}$=q,q=m[$],re+=$-q&32767}if(j){D[x++]=268435456|Xl[U]<<18|yh[j];var Qe=Xl[U]&31,ze=yh[j]&31;B+=Vs[Qe]+Us[ze],++A[257+Qe],++k[ze],P=I+U,++T}else D[x++]=n[I],++A[n[I]]}}for(I=Math.max(I,P);I<o;++I)D[x++]=n[I],++A[n[I]];c=kh(n,a,u,D,A,k,B,x,E,I-E,c),u||(s.r=c&7|a[c/8|0]<<3,c-=7,s.h=b,s.p=m,s.i=I,s.w=P)}else{for(var I=s.w||0;I<o+u;I+=65535){var it=I+65535;it>=o&&(a[c/8|0]=u,it=o),c=xm(a,c+1,n.subarray(I,it))}s.i=o}return km(l,0,i+Ja(c)+r)},i8=function(n,e,t,i,r){if(!r&&(r={l:1},e.dictionary)){var s=e.dictionary.subarray(-32768),o=new Ke(s.length+n.length);o.set(s),o.set(n,s.length),n=o,r.w=s.length}return n8(n,e.level==null?6:e.level,e.mem==null?r.l?Math.ceil(Math.max(8,Math.min(13,Math.log(n.length)))*1.5):20:12+e.mem,t,i,r)};function r8(n,e){return i8(n,e||{},0,0)}function s8(n,e){return e8(n,{i:2},e,e)}var o8=typeof TextDecoder<"u"&&new TextDecoder,l8=0;try{o8.decode(vm,{stream:!0}),l8=1}catch{}const Sm=new TextEncoder,_m=new TextDecoder,Ql="txt.",Jl="b64.",Zl="c64.",xh="bc.",a8=45,u8=70;function c8(n){for(let e=0;e<n.length;e+=1)if(n.charCodeAt(e)>127)return!1;return!0}function Cm(n){let e="";for(const t of n)e+=String.fromCharCode(t);return btoa(e).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function Am(n){const e=n.replaceAll("-","+").replaceAll("_","/"),t=e.padEnd(Math.ceil(e.length/4)*4,"="),i=atob(t);return Uint8Array.from(i,r=>r.charCodeAt(0))}function h8(n){return Cm(Sm.encode(n))}function f8(n){return _m.decode(Am(n))}function d8(n){const e=r8(Sm.encode(n),{level:9});return Cm(e)}function p8(n){const e=Am(n);return _m.decode(s8(e))}function m8(n){return n.map(e=>e.op!==te.push?e:{...e,meta:{...e.meta,pointer:!0}})}function g8(n){const e=n.replaceAll(" ","+").replaceAll("-","+").replaceAll("_","/"),t=m8(tw(fr.fromBase64(e)));return Vd(t)}const b8={encodeText(n){return`${Ql}${n}`},encodeBase64(n){return`${Jl}${h8(n)}`},encodeCompressed(n){return`${Zl}${d8(n)}`}};function Xr(n,e){try{return e(n)}catch{return null}}function y8(n,e){const t={...b8,...e},i=c8(n),r=i&&n.length<=a8,s=n.length>=u8;if(r)return Xr(n,t.encodeText);if(s){const l=Xr(n,t.encodeCompressed);if(l!==null)return l}const o=Xr(n,t.encodeBase64);return o!==null?o:i?Xr(n,t.encodeText):null}function w8(n){if(n===null)return null;if(n.startsWith(Ql))return n.slice(Ql.length);if(n.startsWith(Jl)){const e=n.slice(Jl.length);try{return f8(e)}catch{return null}}if(n.startsWith(Zl)){const e=n.slice(Zl.length);try{return p8(e)}catch{return null}}if(n.startsWith(xh)){const e=n.slice(xh.length);try{return g8(e)}catch{return null}}return null}function Ze(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function ye(n,e){const t=n.querySelector(e);if(!t)throw new Error(`Missing required element: ${e}`);return t}function ei(n){n.scrollTop=n.scrollHeight}function k8(n){const e=n?Ba(n):0;return`${e} ${e===1?"byte":"bytes"}`}function qo(){return new Promise(n=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>n())})})}function $i(n){return n.map(e=>{const t=e.tone&&e.tone!=="default"?` ${e.tone}`:"",i=e.showDot?'<span class="summary-running-dot" aria-hidden="true"></span>':"";return`
      <span class="summary-bar-item">
        <span class="label">${e.label}</span>
        <span class="value${t}">${i}${Ze(e.value)}</span>
      </span>
    `}).join("")}function x8(){return Ow.replace("{{EXAMPLE_OPTIONS}}",Ry).replace("{{HELP_HTML}}",Rw)}function v8(n){var _t;n.innerHTML=x8();const e=ye(n,"#run-feedback-toggle");e.addEventListener("click",()=>{b2(),dc(e)}),dc(e);const t=ye(n,"#source"),i=ye(n,"#stdin"),r=ye(n,"#optimize"),s=ye(n,"#example"),o=ye(n,"#run"),l=ye(n,"#summary"),a=ye(n,"#output"),u=ye(n,"#output-wrap"),c=ye(n,"#output-wrap-toggle"),h=ye(n,"#error"),f=ye(n,"#preprocessed"),d=ye(n,"#ir"),p=ye(n,"#bytecode"),m=ye(n,"#bytecode-meta"),b=ye(n,"#bytecode-count"),g=ye(n,"#repl-command"),S=ye(n,"#repl-reset"),v=ye(n,"#repl-status"),D=ye(n,"#repl-output"),A=ye(n,"#repl-stack"),k=ye(n,"#repl-depth"),T=ye(n,"#repl-inspect"),B=ye(n,"#repl-inspect-back"),I=ye(n,"#repl-inspect-close"),x=ye(n,"#repl-inspect-content"),P=ye(n,"#tutorial-root"),E=ye(n,"#codetta-root"),W=Array.from(n.querySelectorAll(".mode-tab")),$=Array.from(n.querySelectorAll(".tab-panel")),q=Array.from(n.querySelectorAll(".subtab")),X=Array.from(n.querySelectorAll(".detail-panel")),_=new URLSearchParams(Il(window.location).replace(/^\?/,"")),U=w8(_.get("code")),j=_.get("example");let y=yc,re=Oy;U!=null?(y=U,re=Ui):j!==null&&j in rs&&(y=rs[j],re=j);let ne=bo(window.location.hash),w=!1;const oe=Ia(t,y,{extraExtensions:[Pa],onDocumentChange:()=>{w||(s.value=Ui,Pe())}});s.value=re;const Q=gc(f,""),ie=gc(d,"");function Me(L){a.classList.toggle("is-wrapped",L),Q.setWrapped(L),ie.setWrapped(L)}function Ae(L){s.disabled=L,i.disabled=L,r.disabled=L,o.textContent=L?"Cancel":"Run Program",o.setAttribute("aria-label",L?"Cancel run":"Run program"),o.classList.toggle("is-cancel",L),l.dataset.state=L?"running":"idle"}function Pe(){let L=null,N=null;if(ne==="playground")if(s.value===Ui){const Je=oe.getValue();if(Je&&(L=y8(Je),L===null))return}else N=s.value;const ee=Ny({pathname:window.location.pathname,search:Il(window.location),tab:ne,codeParam:L,exampleParam:N}),ge=`${window.location.pathname}${window.location.hash}`;ee!==ge&&window.history.replaceState(window.history.state,"",ee)}function Re(L){ne=bo(L),document.body.dataset.mode=ne,W.forEach(N=>{const ee=N.dataset.tab===ne;N.classList.toggle("is-active",ee)}),$.forEach(N=>{const ee=N.dataset.panel===ne;N.classList.toggle("is-active",ee)})}function Qe(L){q.forEach(N=>{const ee=N.dataset.detailTab===L;N.classList.toggle("is-active",ee)}),X.forEach(N=>{const ee=N.dataset.detailPanel===L;N.classList.toggle("is-active",ee)}),c.hidden=L==="bytecode",m.hidden=L!=="bytecode"}function ze(L){p.innerHTML=Ze(ep(L)),b.textContent=k8(L)}W.forEach(L=>{L.addEventListener("click",()=>{const N=bo(L.dataset.tab);if(N===ne){Pe();return}window.location.hash=N})});function it(){Re(window.location.hash),Pe()}window.addEventListener("hashchange",it),it(),q.forEach(L=>{L.addEventListener("click",()=>{Qe(L.dataset.detailTab??"output")})}),Me(u.checked),u.addEventListener("change",()=>{Me(u.checked)}),Qe(((_t=q.find(L=>L.classList.contains("is-active")))==null?void 0:_t.dataset.detailTab)??"output");let gt=null;async function R(){document.body.dataset.ready="false",Ae(!0),l.innerHTML=$i([{label:"compile",value:"Running...",tone:"running",showDot:!0},{label:"execute",value:"…",tone:"pending"},{label:"vm steps",value:"…",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),h.textContent="";const L=new AbortController;gt=L,await qo();try{const N=await La(oe.getValue(),i.value,r.checked,{signal:L.signal,onProgress:({vmCyclesExecuted:Mm,compileMs:Za,executeElapsedMs:eu,preprocessed:tu,ir:Pm,bytecode:Im})=>{tu!==void 0&&(Q.setValue(tu),ie.setValue(Pm??""),ze(Im??"")),l.innerHTML=$i([{label:"compile",value:Za!==void 0?`${Za.toFixed(2)} ms`:"…",tone:"running"},{label:"execute",value:eu!==void 0?`${eu.toFixed(2)} ms`:"…",tone:"running",showDot:!0},{label:"vm steps",value:_i(Mm),tone:"running"},{label:"exit",value:"pending",tone:"pending"}])}}),ee=N.issues.length,ge=[];N.output&&ge.push(N.output.trimEnd()),N.logs.length&&ge.push(N.logs.join(`
`));const js=[ge.length?ge.join(`
`):"(no output)",ee?`

${ee} compiler issue(s):
${N.issues.join(`
`)}`:""].join(""),Ks=N.terminal==="cancelled"?"cancelled":N.terminal==="error"?"error":String(N.exitCode),Xs=N.terminal==="cancelled"?"pending":N.terminal==="error"?"error":N.exitCode===0?"success":"error",Em=[{label:"compile",value:`${N.compileMs.toFixed(2)} ms`},{label:"execute",value:`${N.executeMs.toFixed(2)} ms`},{label:"vm steps",value:N.vmCyclesExecuted!==void 0?_i(N.vmCyclesExecuted):"—"},{label:"exit",value:Ks,tone:Xs}];l.innerHTML=$i(Em),N.terminal==="error"?(a.innerHTML="",h.innerHTML=Ze(N.logs.join(`
`)||"Run failed."),Q.setValue(""),ie.setValue(""),ze(""),ei(h)):(a.innerHTML=Ze(js),h.textContent="",Q.setValue(N.preprocessed),ie.setValue(N.ir),ze(N.bytecode),ei(a))}catch(N){const ee=N instanceof Error?N.message:String(N);l.innerHTML=$i([{label:"compile",value:"failed",tone:"error"},{label:"execute",value:"—",tone:"pending"},{label:"vm steps",value:"—",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),a.innerHTML="",h.innerHTML=Ze(ee),Q.setValue(""),ie.setValue(""),ze(""),ei(h)}finally{gt=null,Ea(),Ae(!1),document.body.dataset.ready="true"}}function be(){l.innerHTML=$i([{label:"compile",value:"—",tone:"pending"},{label:"execute",value:"—",tone:"pending"},{label:"vm steps",value:"—",tone:"pending"},{label:"exit",value:"—",tone:"pending"}]),l.dataset.state="idle",a.innerHTML=Ze("(Click Run Program to execute.)"),h.textContent="",Q.setValue(""),ie.setValue(""),ze(""),document.body.dataset.ready="true"}const Te=new Lw,He=["Core library loaded. Try defining words, evaluating quotes, or printing values."],rt=[];let st=-1;const St=[];let Ue=-1,Mi,Pi=!1;function Gn(L){Pi=L,g.disabled=L,S.disabled=L,v.hidden=!L,v.setAttribute("aria-hidden",String(!L))}function M(L){const N=L.trim();return N.length>0&&![".clear",".exit",".quit"].includes(N)}function F(L){if(k.textContent=`depth: ${L.length}`,!L.length){A.innerHTML='<li class="repl-stack-empty">(empty stack)</li>',ei(A);return}A.innerHTML=L.map(N=>`
          <li class="repl-stack-row" data-value="${Ze(N.value)}">
            <span class="repl-stack-index">${N.index}:</span>
            <code class="repl-stack-value">${Ze(N.value)}</code>
          </li>
        `).join(""),ei(A)}function Z(){D.innerHTML=Ze(He.join(`

`)),ei(D)}async function le(){if(Pi)return;const L=g.value,N=M(L);N&&(Gn(!0),await qo());try{const ee=Te.execute(L);ee.clearTranscript&&He.splice(0,He.length),L.trim()&&(rt.push(L),st=rt.length),He.push(`ff> ${L}`),ee.output.trim()&&He.push(ee.output.trimEnd()),ee.logs.length&&He.push(ee.logs.join(`
`)),ee.error&&(He.push(`Error: ${ee.error}`),A.classList.add("is-error"),Mi!==void 0&&window.clearTimeout(Mi),Mi=window.setTimeout(()=>{A.classList.remove("is-error")},500)),He.push(`[ ${ee.stack.map(ge=>ge.value).join(" ")} ]`),F(ee.stack),Z(),g.value=""}finally{N&&Gn(!1),g.focus()}}function me(L){if(L===null){T.classList.remove("is-visible");return}const N=[],ee=Ue>0;if(N.push('<div class="inspect-header">'),N.push(`<code class="inspect-value">${Ze(String(L.value))}</code>`),L.name&&N.push(`<span class="inspect-name-label">KNOWN AS:</span><span class="inspect-name-value">${Ze(L.name)}</span>`),L.isSystem)N.push('<span class="inspect-tag system">system</span>');else if(L.isDefined){const ge=!L.name&&L.value>255n;N.push(`<span class="inspect-tag ${ge?"quote":"user"}">${ge?"quote":"user-defined"}</span>`)}if(N.push("</div>"),L.isSystem&&(L.stackEffect||L.description)&&(N.push('<div class="inspect-vocabulary">'),L.stackEffect&&N.push(`<div class="inspect-stack-effect"><code>${Ze(L.stackEffect)}</code></div>`),L.description&&N.push(`<div class="inspect-description">${Ze(L.description)}</div>`),N.push("</div>")),L.definition&&L.definition.length>0){N.push('<div class="inspect-label">Definition:</div>'),N.push('<div class="inspect-definition">');for(const ge of L.definition){const Je=ge.name??String(ge.value),js=ge.isCall?"token-call":"token-literal",Ks=ge.isCall||ge.isDefined?"inspectable":"",Xs=ge.isCall||ge.isDefined?"Click to inspect":"Literal value";N.push(`<span class="inspect-token ${js} ${Ks}" data-value="${Ze(String(ge.value))}" title="${Xs}">${Ze(Je)}</span>`)}N.push("</div>")}else!L.isSystem&&!L.isDefined&&N.push('<div class="inspect-note">Plain value (not a word)</div>');x.innerHTML=N.join(""),B.disabled=!ee,I.style.display="inline-block",T.classList.add("is-visible")}function ot(L){Ue<St.length-1&&St.splice(Ue+1),St.push(L),Ue++,me(L)}function rn(){Ue>0?(Ue--,me(St[Ue])):Ue===0&&(St.length=0,Ue=-1,me(null))}s.addEventListener("change",()=>{if(s.value===Ui){Pe(),be();return}w=!0,oe.setValue(rs[s.value]??yc),w=!1,Pe(),be()}),o.addEventListener("click",()=>{if(gt!==null){gt.abort();return}Ta(o),Pe(),R()}),r.addEventListener("change",()=>{Pe(),be()}),g.addEventListener("keydown",L=>{if(v2(g,L),L.key==="Enter"){L.preventDefault(),le();return}if(L.key==="ArrowUp"){if(L.preventDefault(),!rt.length)return;st=Math.max(0,st-1),g.value=rt[st]??"",g.setSelectionRange(g.value.length,g.value.length);return}if(L.key==="ArrowDown"){if(L.preventDefault(),!rt.length)return;st=Math.min(rt.length,st+1),g.value=rt[st]??"",g.setSelectionRange(g.value.length,g.value.length)}}),S.addEventListener("click",async()=>{if(!Pi){Gn(!0),await qo();try{Te.reset(),He.splice(0,He.length,"Session reset. Prelude reloaded."),rt.splice(0,rt.length),st=0,F([]),Z(),g.value=""}finally{Gn(!1),g.focus()}}}),A.addEventListener("click",L=>{const N=L.target.closest(".repl-stack-row");if(!N)return;const ee=N.getAttribute("data-value");if(!ee)return;const ge=Te.inspectValue(ee);St.length=0,Ue=-1,ot(ge)}),x.addEventListener("click",L=>{const N=L.target.closest(".inspect-token.inspectable");if(!N)return;const ee=N.getAttribute("data-value");if(!ee)return;const ge=Te.inspectValue(ee);ot(ge)}),B.addEventListener("click",()=>{rn()}),I.addEventListener("click",()=>{St.length=0,Ue=-1,T.classList.remove("is-visible")}),be(),qw(P),K6(E),F([]),Z(),g.focus()}m2();const Tm=document.querySelector("#app");if(!Tm)throw new Error("Missing #app root");v8(Tm);
