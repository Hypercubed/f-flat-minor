import{D as b,s as P,a as T,b as c,A as z}from"./runtime.B7Xu26Qz.js";import{r as f,m as S,t as B,a as O,b as j,n as C,o as L}from"./require-element.KNWYTPgY.js";import{w as R}from"./wait-for-paint.DX2Jcgjz.js";const V=`---
tutorial: "abs"
order: 3
title: "Absolute Value"
goal: "Build an absolute-value word and show it on a negative input."
concepts: ["comparisons","?","arithmetic","small helper words"]
note: "Only negative numbers need work, so the false path can be \\"do nothing.\\""
---
Build an absolute-value word and show it on a negative input.

Concepts: \`comparisons\`, \`?\`, \`arithmetic\`, \`small helper words\`

Only negative numbers need work, so the false path can be "do nothing."
`,W='---\ntutorial: "collatz-steps"\norder: 13\ntitle: "Collatz Step Count"\ngoal: "Count how many Collatz steps it takes to reach `1`."\nconcepts: ["helper words","branching","recursive counting"]\nnote: "`next-collatz` holds the rule, and `collatz-steps` only has to count one step at a time."\n---\nCount how many Collatz steps it takes to reach `1`.\n\nConcepts: `helper words`, `branching`, `recursive counting`\n\n`next-collatz` holds the rule, and `collatz-steps` only has to count one step at a time.\n',I='---\ntutorial: "countdown"\norder: 5\ntitle: "Countdown"\ngoal: "Print the numbers from `n` down to `0`."\nconcepts: ["recursion","branch","output","base cases"]\nnote: "Printing before the recursive call makes the sequence descend."\n---\nPrint the numbers from `n` down to `0`.\n\nConcepts: `recursion`, `branch`, `output`, `base cases`\n\nPrinting before the recursive call makes the sequence descend.\n',N='---\ntutorial: "even"\norder: 4\ntitle: "Even?"\ngoal: "Return `1` for even numbers and `0` for odd ones."\nconcepts: ["%","=","booleans","reusable predicates"]\nnote: "Even numbers are exactly the ones where dividing by `2` leaves a remainder of `0`."\n---\nReturn `1` for even numbers and `0` for odd ones.\n\nConcepts: `%`, `=`, `booleans`, `reusable predicates`\n\nEven numbers are exactly the ones where dividing by `2` leaves a remainder of `0`.\n',H='---\ntutorial: "factorial"\norder: 7\ntitle: "Factorial"\ngoal: "Compute `n!`."\nconcepts: ["recursion","branch","multiplication"]\nnote: "The whole base case is `drop 1`: when the input is `0`, replace it with `1`."\n---\nCompute `n!`.\n\nConcepts: `recursion`, `branch`, `multiplication`\n\nThe whole base case is `drop 1`: when the input is `0`, replace it with `1`.\n',U=`---
tutorial: "fibonacci"
order: 8
title: "Fibonacci"
goal: "Compute the nth Fibonacci number."
concepts: ["two recursive calls","base cases","stack reuse"]
note: "0 and 1 are already their own Fibonacci answers, so the true branch can stay empty."
---
Compute the nth Fibonacci number.

Concepts: \`two recursive calls\`, \`base cases\`, \`stack reuse\`

0 and 1 are already their own Fibonacci answers, so the true branch can stay empty.
`,G='---\ntutorial: "fizzbuzz"\norder: 12\ntitle: "FizzBuzz"\ngoal: "Print the FizzBuzz sequence from `1` to `n`."\nconcepts: ["nested branching","%","recursion","visible output"]\nnote: "This version recurses first and prints second, so the output comes out in ascending order."\n---\nPrint the FizzBuzz sequence from `1` to `n`.\n\nConcepts: `nested branching`, `%`, `recursion`, `visible output`\n\nThis version recurses first and prints second, so the output comes out in ascending order.\n',J='---\ntutorial: "gcd"\norder: 9\ntitle: "GCD"\ngoal: "Find the greatest common divisor of two integers."\nconcepts: ["Euclid\'s algorithm","%","recursion","tuck"]\nnote: "Each step replaces `(a, b)` with `(b, a % b)` until `b` becomes `0`."\n---\nFind the greatest common divisor of two integers.\n\nConcepts: `Euclid\'s algorithm`, `%`, `recursion`, `tuck`\n\nEach step replaces `(a, b)` with `(b, a % b)` until `b` becomes `0`.\n',K='---\ntutorial: "message-and-value"\norder: 2\ntitle: "Print a Message and a Value"\ngoal: "Print a short literal message followed by a computed number."\nconcepts: ["strings","prints","definitions","putn","cr"]\nnote: "`\\\\s` is how F-flat-minor writes spaces inside a string literal."\n---\nPrint a short literal message followed by a computed number.\n\nConcepts: `strings`, `prints`, `definitions`, `putn`, `cr`\n\n`\\s` is how F-flat-minor writes spaces inside a string literal.\n',Q=`---
tutorial: "numeric-palindrome"
order: 11
title: "Numeric Palindrome"
goal: "Test whether a number reads the same forward and backward."
concepts: ["helper reuse","=","decomposition by digits"]
note: "This is a good reminder that a small helper like \`reverse-digits\` pays off immediately."
---
Test whether a number reads the same forward and backward.

Concepts: \`helper reuse\`, \`=\`, \`decomposition by digits\`

This is a good reminder that a small helper like \`reverse-digits\` pays off immediately.
`,X=`---
tutorial: "pascal-row"
order: 15
title: "Pascal Row"
goal: "Print one row of Pascal's triangle."
concepts: ["recursion","formatting","nck"]
note: "\`nck\` does the math for each entry; the recursion only controls left-to-right order."
---
Print one row of Pascal's triangle.

Concepts: \`recursion\`, \`formatting\`, \`nck\`

\`nck\` does the math for each entry; the recursion only controls left-to-right order.
`,Y=`---
tutorial: "prime"
order: 14
title: "Prime?"
goal: "Ask whether a number is prime."
concepts: ["library loading","predicates","reuse"]
note: "This is a good place to reuse \`/lib/math/primes.ffp\` instead of squeezing a long primality test into the starter editor."
---
Ask whether a number is prime.

Concepts: \`library loading\`, \`predicates\`, \`reuse\`

This is a good place to reuse \`/lib/math/primes.ffp\` instead of squeezing a long primality test into the starter editor.
`,Z=`---
tutorial: "reverse-digits"
order: 10
title: "Reverse Digits"
goal: "Reverse the decimal digits of a positive integer."
concepts: ["divrem","queue helpers","accumulators","recursion"]
note: "The accumulator builds the answer as the input shrinks, and numeric leading zeros disappear naturally."
---
Reverse the decimal digits of a positive integer.

Concepts: \`divrem\`, \`queue helpers\`, \`accumulators\`, \`recursion\`

The accumulator builds the answer as the input shrinks, and numeric leading zeros disappear naturally.
`,tt='---\ntutorial: "square"\norder: 1\ntitle: "Square"\ngoal: "Define `square` and print the square of one number."\nconcepts: ["definitions","dup","*","putn","cr"]\nnote: "`dup` keeps the original input around so `*` can use it twice."\n---\nDefine `square` and print the square of one number.\n\nConcepts: `definitions`, `dup`, `*`, `putn`, `cr`\n\n`dup` keeps the original input around so `*` can use it twice.\n',et='---\ntutorial: "sum-to"\norder: 6\ntitle: "Sum 1..n"\ngoal: "Sum every integer from `1` through `n`."\nconcepts: ["recursion","+","implicit base cases"]\nnote: "When `n` reaches `0`, the quote is skipped and that `0` becomes the base value."\n---\nSum every integer from `1` through `n`.\n\nConcepts: `recursion`, `+`, `implicit base cases`\n\nWhen `n` reaches `0`, the quote is skipped and that `0` becomes the base value.\n',nt=`.import <prelude>

my-abs: dup 0 < [ -1 * ] ? ;

-42 my-abs dup putn cr drop
`,ot=`.import <prelude>

next-collatz: dup even? [ 2 / ] [ 3 * 1 + ] branch ;
collatz-steps: dup 1 > [ next-collatz collatz-steps ++ ] [ drop 0 ] branch ;

12 collatz-steps dup putn cr drop
`,rt=`.import <prelude>

countdown:
  dup putn
  dup 0 >
  [ sp -- countdown ]
  [ cr drop ]
  branch
;

5 countdown
`,it=`.import <prelude>

my-even?: 2 % 0 = ;

14 my-even? dup putn cr drop
`,st=`.import <prelude>

fact: dup [ dup -- fact * ] [ drop 1 ] branch ;

6 fact dup putn cr drop
`,at=`.import <prelude>

fib: dup 2 < [ ] [ -- dup fib swap -- fib + ] branch ;

10 fib dup putn cr drop
`,lt=`.import <prelude>

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
`,ut=`.import <prelude>

greatest-common-divisor: dup [ tuck % greatest-common-divisor ] [ drop ] branch ;

84 30 greatest-common-divisor dup putn cr drop`,ct=`.import <prelude>

square: dup * ;

0 'Square\\sof\\s7:\\s' prints
7 square putn cr
`,dt=`.import <prelude>

rev-step:
  over
  [ swap 10 divrem q< swap 10 * q> + rev-step ]
  [ nip ]
  branch
;

reverse-digits: 0 rev-step ;
palindrome?: dup reverse-digits = ;

12321 palindrome? dup putn cr drop
`,pt=`.import <prelude>

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
`,ft=`.import <prelude>

29 prime? [ '\\0prime' ] [ '\\0composite' ] branch println
`,mt=`.import <prelude>

rev-step:
  over
  [ swap 10 divrem q< swap 10 * q> + rev-step ]
  [ nip ]
  branch
;

reverse-digits: 0 rev-step ;

12034 reverse-digits dup putn cr drop
`,gt=`.import <prelude>

square: dup * ;

6 square dup putn cr drop
`,_t=`.import <prelude>

sum-to:
  dup
  [ dup -- sum-to + ]
  ?
;

8 sum-to dup putn cr drop
`,bt=`42
`,ht=`9
`,vt=`5 4 3 2 1 0
`,wt=`1
`,zt=`720
`,yt=`55
`,Et=`1
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
`,xt=`6
`,Ct=`Square of 7: 49
`,Rt=`1
`,kt=`1 5 10 10 5 1
`,$t=`prime
`,At=`43021
`,qt=`36
`,Mt=`36
`;function A(t,e){const n=/\/ff\/tutorial\/([^/]+)\//.exec(t);if(!n)throw new Error(`Unexpected tutorial path for ${e}: ${t}`);return n[1]}function Dt(t){const e=t.replaceAll(`\r
`,`
`);if(!e.startsWith(`---
`))throw new Error("Tutorial README is missing frontmatter.");const n=e.indexOf(`
---
`,4);if(n<0)throw new Error("Tutorial README frontmatter is unterminated.");const o=new Map;for(const a of e.slice(4,n).split(`
`)){const _=a.indexOf(":");if(_<0)continue;const v=a.slice(0,_).trim(),g=a.slice(_+1).trim();try{o.set(v,JSON.parse(g))}catch{o.set(v,g)}}const d=o.get("tutorial"),l=o.get("order"),p=o.get("title"),r=o.get("goal"),m=o.get("concepts"),u=o.get("note"),s=o.get("stdin");if(typeof d!="string"||typeof l!="number"||typeof p!="string"||typeof r!="string"||!Array.isArray(m)||m.some(a=>typeof a!="string")||u!==void 0&&typeof u!="string"||s!==void 0&&typeof s!="string")throw new Error("Tutorial README frontmatter is missing required fields.");return{tutorial:d,order:l,title:p,goal:r,concepts:m,note:u,stdin:s}}const Ft=Object.assign({"../../../ff/tutorial/abs/README.md":V,"../../../ff/tutorial/collatz-steps/README.md":W,"../../../ff/tutorial/countdown/README.md":I,"../../../ff/tutorial/even/README.md":N,"../../../ff/tutorial/factorial/README.md":H,"../../../ff/tutorial/fibonacci/README.md":U,"../../../ff/tutorial/fizzbuzz/README.md":G,"../../../ff/tutorial/gcd/README.md":J,"../../../ff/tutorial/message-and-value/README.md":K,"../../../ff/tutorial/numeric-palindrome/README.md":Q,"../../../ff/tutorial/pascal-row/README.md":X,"../../../ff/tutorial/prime/README.md":Y,"../../../ff/tutorial/reverse-digits/README.md":Z,"../../../ff/tutorial/square/README.md":tt,"../../../ff/tutorial/sum-to/README.md":et}),q=Object.assign({"../../../ff/tutorial/abs/solution.ffp":nt,"../../../ff/tutorial/collatz-steps/solution.ffp":ot,"../../../ff/tutorial/countdown/solution.ffp":rt,"../../../ff/tutorial/even/solution.ffp":it,"../../../ff/tutorial/factorial/solution.ffp":st,"../../../ff/tutorial/fibonacci/solution.ffp":at,"../../../ff/tutorial/fizzbuzz/solution.ffp":lt,"../../../ff/tutorial/gcd/solution.ffp":ut,"../../../ff/tutorial/message-and-value/solution.ffp":ct,"../../../ff/tutorial/numeric-palindrome/solution.ffp":dt,"../../../ff/tutorial/pascal-row/solution.ffp":pt,"../../../ff/tutorial/prime/solution.ffp":ft,"../../../ff/tutorial/reverse-digits/solution.ffp":mt,"../../../ff/tutorial/square/solution.ffp":gt,"../../../ff/tutorial/sum-to/solution.ffp":_t}),Pt=Object.assign({"../../../ff/tutorial/abs/solution.out":bt,"../../../ff/tutorial/collatz-steps/solution.out":ht,"../../../ff/tutorial/countdown/solution.out":vt,"../../../ff/tutorial/even/solution.out":wt,"../../../ff/tutorial/factorial/solution.out":zt,"../../../ff/tutorial/fibonacci/solution.out":yt,"../../../ff/tutorial/fizzbuzz/solution.out":Et,"../../../ff/tutorial/gcd/solution.out":xt,"../../../ff/tutorial/message-and-value/solution.out":Ct,"../../../ff/tutorial/numeric-palindrome/solution.out":Rt,"../../../ff/tutorial/pascal-row/solution.out":kt,"../../../ff/tutorial/prime/solution.out":$t,"../../../ff/tutorial/reverse-digits/solution.out":At,"../../../ff/tutorial/square/solution.out":qt,"../../../ff/tutorial/sum-to/solution.out":Mt}),y=new Map;for(const t of Object.keys(q)){const e=A(t,"solution.ffp");if(y.has(e))throw new Error(`Multiple tutorial solutions found for ${e}`);y.set(e,t)}function Tt(t){if(!y.get(t))throw new Error(`Missing tutorial solution for ${t}`);return`/tutorial/${t}/solution.ffp`}const M=Object.entries(Ft).map(([t,e])=>{const n=A(t,"README.md"),o=y.get(n),d=t.replace("/README.md","/solution.out"),l=o?q[o]:void 0,p=Pt[d];if(typeof l!="string")throw new Error(`Missing tutorial solution for ${n}`);if(typeof p!="string")throw new Error(`Missing tutorial expected output for ${n}`);const r=Dt(e);if(r.tutorial!==n)throw new Error(`Tutorial README slug mismatch for ${n}: ${r.tutorial}`);return{id:n,order:r.order,title:r.title,goal:r.goal,concepts:r.concepts,source:l.trimEnd(),expected:p.trimEnd(),note:r.note,stdin:r.stdin}}).sort((t,e)=>t.order-e.order||t.title.localeCompare(e.title));function k(t){return c`${t.split(/(`[^`]+`)/g).map(e=>e.startsWith("`")&&e.endsWith("`")?c`<code>${e.slice(1,-1)}</code>`:e)}`}function h(t){return c`${t.flatMap((e,n)=>{const o=e.tone&&e.tone!=="default"?` ${e.tone}`:"",d=c`
      <span class="tutorial-summary-item">
        <span class="tutorial-summary-label">${e.label}</span>
        <span class="tutorial-summary-value${o}">
          ${e.showDot?c`<span class="tutorial-summary-dot" aria-hidden="true"></span>`:z}
          ${e.value}
        </span>
      </span>
    `;return n===0?[d]:[c`<span class="tutorial-summary-separator" aria-hidden="true">|</span>`,d]})}`}function St(t){const e=t.expected?c`
        <div class="tutorial-guidance-block">
          <p class="tutorial-guidance-label">Expected result</p>
          <pre class="tutorial-guidance-value">${t.expected}</pre>
        </div>
      `:z,n=t.note?c`
        <div class="tutorial-guidance-block">
          <p class="tutorial-guidance-label">Note</p>
          <p class="tutorial-note">${k(t.note)}</p>
        </div>
      `:z,o=typeof t.stdin=="string"?c`
          <label class="field tutorial-stdin-field">
            <span>stdin</span>
            <input data-role="stdin" type="text" .value="${t.stdin}" />
          </label>
        `:z;return c`
    <article class="panel tutorial-card" data-problem-id="${t.id}">
      <div class="tutorial-card-body">
        <div class="tutorial-card-header">
          <div>
            <p class="panel-label">Problem ${t.order}</p>
            <h2>${t.title}</h2>
          </div>
          <p class="tutorial-goal">${k(t.goal)}</p>
        </div>

        <div class="tutorial-concepts" aria-label="Concepts">
          ${t.concepts.map(d=>c`<span class="tutorial-concept">${d}</span>`)}
        </div>

        <div class="tutorial-workbench">
          <div class="tutorial-editor-pane">
            <div class="tutorial-editor-shell">
              <div
                class="tutorial-editor"
                data-role="editor"
                aria-label="${t.title} source editor"
              ></div>
            </div>

            <div class="tutorial-controls">
              ${o}
              <div class="actions tutorial-actions">
                <button type="button" data-role="run" class="primary tutorial-run-btn" aria-label="Run">Run</button>
                <button type="button" data-role="reset" class="ghost-button">Reset</button>
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
          ${n}
        </div>
      </div>
    </article>
  `}function Bt(){const t=[...M].sort((e,n)=>e.order-n.order);return c`
    <section class="tutorial-list" aria-label="Tutorial problems">
      ${t.map(e=>St(e))}
    </section>
  `}function Ot(t){const e=[];return t.output&&e.push(t.output.trimEnd()),t.logs.length&&e.push(t.logs.join(`
`)),e.filter(Boolean).join(`
`)||"(no output)"}function jt(t){if(t.dataset.mounted==="true")return;t.dataset.mounted="true",b(Bt(),t),[...M].sort((n,o)=>n.order-o.order).forEach(n=>{const o=f(t,`[data-problem-id="${n.id}"]`),d=f(o,"[data-role='editor']"),l=f(o,"[data-role='run']"),p=f(o,"[data-role='reset']"),r=f(o,"[data-role='summary']"),m=f(o,"[data-role='output']"),u=f(o,"[data-role='diagnostics']"),s=f(o,"[data-role='error']"),a=o.querySelector("[data-role='stdin']"),_=S(d,n.source,{extraExtensions:[B]});function v(){_.setValue(n.source),a&&typeof n.stdin=="string"&&(a.value=n.stdin),r.textContent="Ready to run.",m.textContent="Run the snippet to see output.",u.textContent="",u.hidden=!0,s.textContent="",s.hidden=!0}let g=null;l.addEventListener("click",async()=>{if(g!==null){g.abort();return}P(l),l.textContent="Cancel",l.setAttribute("aria-label","Cancel run"),l.classList.add("is-cancel"),p.disabled=!0,a&&(a.disabled=!0),b(h([{label:"compile",value:"Running...",tone:"running",showDot:!0},{label:"execute",value:"pending",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),r),s.textContent="",s.hidden=!0;const E=new AbortController;g=E;const D=O(E);try{await R(),b(h([{label:"compile",value:"Running...",tone:"running",showDot:!0},{label:"execute",value:"pending",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),r),await R();const i=await j(_.getValue(),a?.value??"",!0,{filename:Tt(n.id),signal:E.signal,onProgress:({vmCyclesExecuted:F,compileMs:x})=>{b(h([{label:"compile",value:x!==void 0?`${x.toFixed(2)} ms`:"…",tone:"running"},{label:"execute",value:`${C(F)} vm steps`,tone:"running",showDot:!0},{label:"exit",value:"pending",tone:"pending"}]),r)}}),w=L(i);b(h([{label:"compile",value:`${i.compileMs.toFixed(2)} ms`},{label:"execute",value:`${i.executeMs.toFixed(2)} ms`},{label:"exit",value:w.value,tone:w.tone},{label:"issues",value:i.issues.length===1?"1 compiler issue":`${i.issues.length} compiler issues`,tone:i.issues.length?"error":"default"},...i.vmCyclesExecuted!==void 0?[{label:"vm steps",value:C(i.vmCyclesExecuted),tone:"default"}]:[]]),r),m.textContent=Ot(i),i.terminal==="error"?(u.textContent="",u.hidden=!0,s.textContent=i.logs.join(`
`)||"Run failed.",s.hidden=!1):i.issues.length?(u.textContent=`Compiler issues:
${i.issues.join(`
`)}`,u.hidden=!1,s.textContent="",s.hidden=!0):(u.textContent="",u.hidden=!0,s.textContent="",s.hidden=!0)}catch(i){const w=i instanceof Error?i.message:String(i);b(h([{label:"compile",value:"failed",tone:"error"},{label:"execute",value:"pending",tone:"pending"},{label:"exit",value:"pending",tone:"pending"}]),r),m.textContent="",u.textContent="",u.hidden=!0,s.textContent=w,s.hidden=!1}finally{D(),g=null,T(),a&&(a.disabled=!1),l.textContent="Run",l.setAttribute("aria-label","Run"),l.classList.remove("is-cancel"),p.disabled=!1}}),p.addEventListener("click",()=>{v()}),a&&typeof n.stdin!="string"&&(a.value="")})}function Lt(t){jt(t)}const $=document.querySelector("#tutorial-surface-root");$ instanceof HTMLElement&&Lt($);
