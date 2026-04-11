import{D as i,b as s,A as l}from"./runtime.CjaUsFnh.js";import{k as r,l as u}from"./require-element.BTdE50aR.js";function d(e){const t=e?u(e):0;return`${t} ${t===1?"byte":"bytes"}`}function y(e,t){i(s`${r(t)}`,e)}function b(e,t){e.textContent=d(t)}function $(e,t,o){e.textContent=r(t)||o}function m(e,t,o,a,c){for(const n of e)n.classList.toggle("is-active",a(n)===o);for(const n of t)n.classList.toggle("is-active",c(n)===o)}function B(e,t){for(const o of e){const a=`${o.dataset.detailFooter??""} ${o.dataset.codettaDetailFooter??""}`.trim().split(/\s+/);o.hidden=!a.includes(t)}}function g(e){return s`${e.map(t=>s`
      <span class="summary-bar-item">
        <span class="label">${t.label}</span>
        <span class="value${t.tone&&t.tone!=="default"?` ${t.tone}`:""}">
          ${t.showDot?s`<span class="summary-running-dot" aria-hidden="true"></span>`:l}
          ${t.value}
        </span>
      </span>
    `)}`}export{B as a,$ as b,b as c,y as d,g as r,m as s};
