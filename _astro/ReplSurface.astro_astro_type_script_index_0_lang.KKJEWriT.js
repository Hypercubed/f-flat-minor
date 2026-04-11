import{_ as W,c as U,d as K,e as N,f as z,g as G,h as J,i as Q,j as X,k as Y,l as Z,m as ee,n as te,o as se,p as ie,q as le,r as ne,t as ae,u as re,v as ce,w as pe,x as oe,y as ue,z as fe,B as de,C as _e,F as he,G as me,H as ve,I as be,J as ge,K as R,L as P,P as ke,M as ye,b as r,A as m,D as y,N as Se}from"./runtime.B7Xu26Qz.js";const we=Object.assign({"../../../ff/lib/core/core.ff":be,"../../../ff/lib/math/ack.ffp":ve,"../../../ff/lib/math/arith.ffp":me,"../../../ff/lib/math/atan-core.ffp":he,"../../../ff/lib/math/atan-shared.ffp":_e,"../../../ff/lib/math/atan.ffp":de,"../../../ff/lib/math/atanh-core.ffp":fe,"../../../ff/lib/math/atanh.ffp":ue,"../../../ff/lib/math/cbrt.ffp":oe,"../../../ff/lib/math/exp.ffp":pe,"../../../ff/lib/math/gcd.ffp":ce,"../../../ff/lib/math/log.ffp":re,"../../../ff/lib/math/math.ffp":ae,"../../../ff/lib/math/num.ffp":ne,"../../../ff/lib/math/pi.ffp":le,"../../../ff/lib/math/precision.ffp":ie,"../../../ff/lib/math/pred.ffp":se,"../../../ff/lib/math/primes.ffp":te,"../../../ff/lib/math/prn.ffp":ee,"../../../ff/lib/math/sqrt.ffp":Z,"../../../ff/lib/math/trig.ffp":Y,"../../../ff/lib/prelude.ffp":X,"../../../ff/lib/seq/seq.ffp":Q,"../../../ff/lib/string/char.ffp":J,"../../../ff/lib/string/str.ffp":G,"../../../ff/lib/string/string.ffp":z,"../../../ff/lib/tap.ffp":N,"../../../ff/lib/testing.ffp":K,"../../../ff/lib/time/time.ffp":U,"../../../ff/lib/time/utc.ffp":W});function $e(e){const t="/ff/lib/",l=e.indexOf(t);if(l===-1)throw new Error(`Unexpected library source path: ${e}`);return`/lib/${e.slice(l+t.length)}`}const Ee=Object.fromEntries(Object.entries(we).map(([e,t])=>[$e(e),t]));function Ie(e="",t="/repl.ffp"){return{[t]:e,...Ee}}const Le=["/lib"];function Re(e,t){const l=console.log;console.log=(...i)=>{e(i.map(String).join(" "))};try{return t()}finally{console.log=l}}class Ce{compiler;engine;preprocessor;files;output="";constructor(){this.reset()}reset(){this.output="",this.files=Ie();const t=ge({onWrite:n=>{this.output+=n}});this.compiler=new R,this.engine=new P(t);const l=new R,i=new P(t);this.preprocessor=new ke(ye(this.files),{engine:i,compiler:l},{macroEngineBootstrapFile:"<prelude>",stdlibRoots:Le}),this.execute(".import <prelude>")}inspectValue(t){return this.engine.inspectValue(BigInt(t))}createStackItems(){return this.engine.getStack().map((t,l)=>({value:String(t),index:l}))}execute(t){const l=t.trim(),i=[];return l?l===".reset"?(this.reset(),{output:"Session reset. Prelude reloaded.",clearTranscript:!0,logs:i,stack:this.createStackItems()}):l===".clear"?{output:"Transcript cleared.",clearTranscript:!0,logs:i,stack:this.createStackItems()}:l===".exit"||l===".quit"?{output:"Browser REPL sessions stay open. Use .reset to clear state.",logs:i,stack:this.createStackItems()}:(this.files["/repl.ffp"]=t,this.output="",Re(n=>i.push(n),()=>{try{const n=this.preprocessor.preprocess([t],"/repl.ffp"),_=this.compiler.compileToIR(R.tokenize(n),"/repl.ffp");return this.engine.loadIR(_),this.engine.run(),{output:this.output,logs:i,stack:this.createStackItems()}}catch(n){return{output:this.output,logs:i,stack:this.createStackItems(),error:n instanceof Error?n.message:String(n)}}})):{output:"",logs:i,stack:this.createStackItems()}}}function Te(){return r`
    <section class="repl-layout">
      <div class="panel repl-pane">
        <div class="panel-header repl-pane-header">
          <div>
            <p class="eyebrow">REPL</p>
            <h2>Persistent session</h2>
          </div>
          <button id="repl-reset" class="ghost-button" type="button">Reset Session</button>
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

          <section class="repl-inspect-panel" id="repl-inspect">
            <div class="repl-inspect-header">
              <button id="repl-inspect-back" class="inspect-back" type="button" disabled>&larr; Back</button>
              <span class="inspect-title">Inspector</span>
              <button id="repl-inspect-close" class="inspect-close" type="button">X</button>
            </div>
            <div id="repl-inspect-content" class="repl-inspect-content">
              <div class="inspect-placeholder">Click a stack value to inspect</div>
            </div>
          </section>

          <label class="field repl-input-field" for="repl-command">
            <span>Command</span>
            <input id="repl-command" type="text" autocomplete="off" placeholder="Type code and press Enter" />
          </label>
          <div class="repl-hint">Tip: use ↑ and ↓ for command history.</div>
        </div>
      </div>

      <div class="panel repl-pane">
        <div class="panel-header">
          <div>
            <p class="eyebrow">Console</p>
            <h2>Output & logs</h2>
          </div>
          <span id="repl-status" class="repl-status" aria-live="polite" hidden>
            <span class="repl-status-dot" aria-hidden="true"></span>
            Running...
          </span>
        </div>
        <pre id="repl-output" class="console is-wrapped repl-console"></pre>
        <div class="detail-meta detail-footer repl-output-footer">
          <span class="label">Output</span>
          <label id="repl-output-wrap-toggle" class="toggle output-wrap-toggle">
            <input id="repl-output-wrap" type="checkbox" checked />
            <span>Wrap Output</span>
          </label>
        </div>
      </div>
    </section>
  `}function xe(e){return e.length?r`${e.map(t=>r`
      <li class="repl-stack-row" data-value="${t.value}">
        <span class="repl-stack-index">${t.index}:</span>
        <code class="repl-stack-value">${t.value}</code>
      </li>
    `)}`:r`<li class="repl-stack-empty">(empty stack)</li>`}function qe(e){const t=!e.name&&e.value>255n,l=e.definition&&e.definition.length>0?r`
          <div class="inspect-label">Definition:</div>
          <div class="inspect-definition">
            ${e.definition.map(i=>{const n=i.name??String(i.value),_=i.isCall?"token-call":"token-literal",h=i.isCall||i.isDefined?"inspectable":"",S=i.isCall||i.isDefined?"Click to inspect":"Literal value";return r`
                <span
                  class="inspect-token ${_} ${h}"
                  data-value="${String(i.value)}"
                  title="${S}"
                >${n}</span>
              `})}
          </div>
        `:!e.isSystem&&!e.isDefined?r`<div class="inspect-note">Plain value (not a word)</div>`:m;return r`
    <div class="inspect-header">
      <code class="inspect-value">${String(e.value)}</code>
      ${e.name?r`<span class="inspect-name-label">KNOWN AS:</span><span class="inspect-name-value">${e.name}</span>`:m}
      ${e.isSystem?r`<span class="inspect-tag system">system</span>`:e.isDefined?r`<span class="inspect-tag ${t?"quote":"user"}">${t?"quote":"user-defined"}</span>`:m}
    </div>
    ${e.isSystem&&(e.stackEffect||e.description)?r`
          <div class="inspect-vocabulary">
            ${e.stackEffect?r`<div class="inspect-stack-effect"><code>${e.stackEffect}</code></div>`:m}
            ${e.description?r`<div class="inspect-description">${e.description}</div>`:m}
          </div>
        `:m}
    ${l}
  `}function p(e,t,l="required element"){const i=e.querySelector(t);if(!i)throw new Error(`Missing ${l}: ${t}`);return i}function A(e){e.scrollTop=e.scrollHeight}function B(){return new Promise(e=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>e())})})}function De(e){if(e.dataset.mounted==="true")return;y(Te(),e),e.dataset.mounted="true";const t=p(e,"#repl-command"),l=p(e,"#repl-reset"),i=p(e,"#repl-status"),n=p(e,"#repl-output"),_=p(e,"#repl-output-wrap"),h=p(e,"#repl-stack"),S=p(e,"#repl-depth"),w=p(e,"#repl-inspect"),C=p(e,"#repl-inspect-back"),T=p(e,"#repl-inspect-close"),x=p(e,"#repl-inspect-content"),b=new Ce,o=["Core library loaded. Try defining words, evaluating quotes, or printing values."],u=[];let d=-1;const v=[];let f=-1,$,E=!1;function g(s){E=s,t.disabled=s,l.disabled=s,i.hidden=!s,i.setAttribute("aria-hidden",String(!s))}function j(s){const c=s.trim();return c.length>0&&![".clear",".exit",".quit"].includes(c)}function I(s){S.textContent=`depth: ${s.length}`,y(xe(s),h),A(h)}function L(){y(r`${o.join(`

`)}`,n),A(n)}function q(s){n.classList.toggle("is-wrapped",s)}function D(s){if(s===null){w.classList.remove("is-visible");return}y(qe(s),x),C.disabled=f<=0,T.style.display="inline-block",w.classList.add("is-visible")}function O(s){f<v.length-1&&v.splice(f+1),v.push(s),f++,D(s)}function k(){v.length=0,f=-1,w.classList.remove("is-visible")}function H(){if(f>0){f--,D(v[f]??null);return}f===0&&k()}async function V(){if(E)return;const s=t.value,c=j(s);c&&(g(!0),await B());try{const a=b.execute(s);a.clearTranscript&&o.splice(0,o.length),s.trim()&&(u.push(s),d=u.length),o.push(`ff> ${s}`),a.output.trim()&&o.push(a.output.trimEnd()),a.logs.length&&o.push(a.logs.join(`
`)),a.error&&(o.push(`Error: ${a.error}`),h.classList.add("is-error"),$!==void 0&&window.clearTimeout($),$=window.setTimeout(()=>{h.classList.remove("is-error")},500)),o.push(`[ ${a.stack.map(M=>M.value).join(" ")} ]`),I(a.stack),L(),t.value=""}finally{c&&g(!1),t.focus()}}t.addEventListener("keydown",s=>{if(Se(t,s),s.key==="Enter"){s.preventDefault(),V();return}if(s.key==="ArrowUp"){if(s.preventDefault(),!u.length)return;d=Math.max(0,d-1),t.value=u[d]??"",t.setSelectionRange(t.value.length,t.value.length);return}if(s.key==="ArrowDown"){if(s.preventDefault(),!u.length)return;d=Math.min(u.length,d+1),t.value=u[d]??"",t.setSelectionRange(t.value.length,t.value.length)}}),l.addEventListener("click",async()=>{if(!E){g(!0),await B();try{b.reset(),o.splice(0,o.length,"Session reset. Prelude reloaded."),u.splice(0,u.length),d=0,I([]),L(),t.value="",k()}finally{g(!1),t.focus()}}}),_.addEventListener("change",()=>{q(_.checked)}),h.addEventListener("click",s=>{const c=s.target.closest(".repl-stack-row");if(!c)return;const a=c.getAttribute("data-value");a&&(k(),O(b.inspectValue(a)))}),x.addEventListener("click",s=>{const c=s.target.closest(".inspect-token.inspectable");if(!c)return;const a=c.getAttribute("data-value");a&&O(b.inspectValue(a))}),C.addEventListener("click",()=>{H()}),T.addEventListener("click",()=>{k()}),I([]),q(_.checked),L(),t.focus()}const F=document.querySelector("#repl-surface-root");F instanceof HTMLElement&&De(F);
