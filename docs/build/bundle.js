var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function s(e){e.forEach(t)}function l(e){return"function"==typeof e}function o(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function r(e,t,n,s){if(e){const l=c(e,t,n,s);return e[0](l)}}function c(e,t,n,s){return e[1]&&s?function(e,t){for(const n in t)e[n]=t[n];return e}(n.ctx.slice(),e[1](s(t))):n.ctx}function i(e,t,n,s){if(e[2]&&s){const l=e[2](s(n));if(void 0===t.dirty)return l;if("object"==typeof l){const e=[],n=Math.max(t.dirty.length,l.length);for(let s=0;s<n;s+=1)e[s]=t.dirty[s]|l[s];return e}return t.dirty|l}return t.dirty}function a(e,t,n,s,l,o){if(l){const r=c(t,n,s,o);e.p(r,l)}}function $(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let e=0;e<n;e++)t[e]=-1;return t}return-1}function u(e){return null==e?"":e}function f(e,t){e.appendChild(t)}function d(e,t,n){e.insertBefore(t,n||null)}function p(e){e.parentNode.removeChild(e)}function m(e){return document.createElement(e)}function g(e){return document.createTextNode(e)}function h(){return g(" ")}function b(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function v(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}let y;function x(e){y=e}const k=[],w=[],_=[],T=[],M=Promise.resolve();let C=!1;function S(e){_.push(e)}const L=new Set;let q=0;function A(){const e=y;do{for(;q<k.length;){const e=k[q];q++,x(e),H(e.$$)}for(x(null),k.length=0,q=0;w.length;)w.pop()();for(let e=0;e<_.length;e+=1){const t=_[e];L.has(t)||(L.add(t),t())}_.length=0}while(k.length);for(;T.length;)T.pop()();C=!1,L.clear(),x(e)}function H(e){if(null!==e.fragment){e.update(),s(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(S)}}const R=new Set;function P(e,t){e&&e.i&&(R.delete(e),e.i(t))}function j(e,t,n,s){if(e&&e.o){if(R.has(e))return;R.add(e),undefined.c.push((()=>{R.delete(e),s&&(n&&e.d(1),s())})),e.o(t)}}function E(e){e&&e.c()}function I(e,n,o,r){const{fragment:c,on_mount:i,on_destroy:a,after_update:$}=e.$$;c&&c.m(n,o),r||S((()=>{const n=i.map(t).filter(l);a?a.push(...n):s(n),e.$$.on_mount=[]})),$.forEach(S)}function D(e,t){const n=e.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function N(e,t){-1===e.$$.dirty[0]&&(k.push(e),C||(C=!0,M.then(A)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function O(t,l,o,r,c,i,a,$=[-1]){const u=y;x(t);const f=t.$$={fragment:null,ctx:null,props:i,update:e,not_equal:c,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(l.context||(u?u.$$.context:[])),callbacks:n(),dirty:$,skip_bound:!1,root:l.target||u.$$.root};a&&a(f.root);let d=!1;if(f.ctx=o?o(t,l.props||{},((e,n,...s)=>{const l=s.length?s[0]:n;return f.ctx&&c(f.ctx[e],f.ctx[e]=l)&&(!f.skip_bound&&f.bound[e]&&f.bound[e](l),d&&N(t,e)),n})):[],f.update(),d=!0,s(f.before_update),f.fragment=!!r&&r(f.ctx),l.target){if(l.hydrate){const e=function(e){return Array.from(e.childNodes)}(l.target);f.fragment&&f.fragment.l(e),e.forEach(p)}else f.fragment&&f.fragment.c();l.intro&&P(t.$$.fragment),I(t,l.target,l.anchor,l.customElement),A()}x(u)}class F{$destroy(){D(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function W(e){let t,n,s;const l=e[2].default,o=r(l,e,e[1],null);return{c(){t=m("div"),o&&o.c(),b(t,"class",n=u("highlighter__"+e[0])+" svelte-1evu84x")},m(e,n){d(e,t,n),o&&o.m(t,null),s=!0},p(e,[r]){o&&o.p&&(!s||2&r)&&a(o,l,e,e[1],s?i(l,e[1],r,null):$(e[1]),null),(!s||1&r&&n!==(n=u("highlighter__"+e[0])+" svelte-1evu84x"))&&b(t,"class",n)},i(e){s||(P(o,e),s=!0)},o(e){j(o,e),s=!1},d(e){e&&p(t),o&&o.d(e)}}}function z(e,t,n){let{$$slots:s={},$$scope:l}=t,{type:o}=t;return e.$$set=e=>{"type"in e&&n(0,o=e.type),"$$scope"in e&&n(1,l=e.$$scope)},[o,l,s]}class B extends F{constructor(e){super(),O(this,e,z,W,o,{type:0})}}function J(e){const t=new Date;return new Date(e.getTime()-t.getTime())}function U(e){let t;return{c(){t=g('Park, "ShapeLayer" Jonghyeon')},m(e,n){d(e,t,n)},d(e){e&&p(t)}}}function G(e){let t;return{c(){t=g("layering")},m(e,n){d(e,t,n)},d(e){e&&p(t)}}}function K(e){let t;return{c(){t=g("shapes.")},m(e,n){d(e,t,n)},d(e){e&&p(t)}}}function Q(e){let t;return{c(){t=g("shaping")},m(e,n){d(e,t,n)},d(e){e&&p(t)}}}function V(e){let t;return{c(){t=g("layers.")},m(e,n){d(e,t,n)},d(e){e&&p(t)}}}function X(e){let t,n,s,l,o,r,c,i,a,$,u,y,x,k,w,_,T,M,C,S,L,q,A,H,R,N,O,F,W,z,J,X;return l=new B({props:{type:"inline",$$slots:{default:[U]},$$scope:{ctx:e}}}),u=new B({props:{type:"title",$$slots:{default:[G]},$$scope:{ctx:e}}}),x=new B({props:{type:"title",$$slots:{default:[K]},$$scope:{ctx:e}}}),C=new B({props:{type:"title",$$slots:{default:[Q]},$$scope:{ctx:e}}}),L=new B({props:{type:"title",$$slots:{default:[V]},$$scope:{ctx:e}}}),{c(){t=m("headerRoot"),n=m("div"),s=m("h1"),E(l.$$.fragment),o=h(),r=m("div"),c=m("h2"),i=g("Creates a world"),a=m("br"),$=g("\n        by "),E(u.$$.fragment),y=g(" various "),E(x.$$.fragment),k=h(),w=m("h2"),_=g("Creates a world"),T=m("br"),M=g("\n        by "),E(C.$$.fragment),S=g(" various "),E(L.$$.fragment),q=h(),A=m("p"),A.innerHTML="전남대학교 컴퓨터정보통신공학과<br/>\n    @ 지능영상미디어인터페이스연구실",H=h(),R=m("p"),N=g("군 복무 D-"),O=g(e[0]),F=g(", 제대까지 D-"),W=g(e[1]),z=m("br"),J=g("as 네트워크운용정비 병과"),b(s,"class","svelte-1wer314"),b(c,"id","headerRoot__layer-shape"),b(c,"class","svelte-1wer314"),b(w,"id","headerRoot__shape-layer"),b(w,"class","headerRoot__h2-variation svelte-1wer314"),b(r,"class","headerRoot__h2-wrapper svelte-1wer314"),b(A,"class","svelte-1wer314"),b(R,"class","svelte-1wer314"),b(n,"class","headerRoot__wrapper svelte-1wer314"),b(t,"class","svelte-1wer314")},m(e,p){d(e,t,p),f(t,n),f(n,s),I(l,s,null),f(n,o),f(n,r),f(r,c),f(c,i),f(c,a),f(c,$),I(u,c,null),f(c,y),I(x,c,null),f(r,k),f(r,w),f(w,_),f(w,T),f(w,M),I(C,w,null),f(w,S),I(L,w,null),f(n,q),f(n,A),f(n,H),f(n,R),f(R,N),f(R,O),f(R,F),f(R,W),f(R,z),f(R,J),X=!0},p(e,[t]){const n={};16&t&&(n.$$scope={dirty:t,ctx:e}),l.$set(n);const s={};16&t&&(s.$$scope={dirty:t,ctx:e}),u.$set(s);const o={};16&t&&(o.$$scope={dirty:t,ctx:e}),x.$set(o);const r={};16&t&&(r.$$scope={dirty:t,ctx:e}),C.$set(r);const c={};16&t&&(c.$$scope={dirty:t,ctx:e}),L.$set(c),(!X||1&t)&&v(O,e[0]),(!X||2&t)&&v(W,e[1])},i(e){X||(P(l.$$.fragment,e),P(u.$$.fragment,e),P(x.$$.fragment,e),P(C.$$.fragment,e),P(L.$$.fragment,e),X=!0)},o(e){j(l.$$.fragment,e),j(u.$$.fragment,e),j(x.$$.fragment,e),j(C.$$.fragment,e),j(L.$$.fragment,e),X=!1},d(e){e&&p(t),D(l),D(u),D(x),D(C),D(L)}}}function Y(e,t,n){let s,l,o=0;return setInterval((()=>{o=(o+1)%2,document.querySelector("#headerRoot__layer-shape").style.opacity=1-o,document.querySelector("#headerRoot__shape-layer").style.opacity=o}),5e3),n(0,s=Math.floor(J(new Date("2022-07-12T12:00:00.000+09:00")).getTime()/864e5)),n(1,l=Math.floor(J(new Date("2024-01-08T12:00:00.000+09:00")).getTime()/864e5)),[s,l]}class Z extends F{constructor(e){super(),O(this,e,Y,X,o,{})}}function ee(e){let t,n,s;const l=e[1].default,o=r(l,e,e[0],null);return{c(){t=m("div"),n=m("span"),o&&o.c(),b(n,"class","svelte-1u9c8hg"),b(t,"class","svelte-1u9c8hg")},m(e,l){d(e,t,l),f(t,n),o&&o.m(n,null),s=!0},p(e,[t]){o&&o.p&&(!s||1&t)&&a(o,l,e,e[0],s?i(l,e[0],t,null):$(e[0]),null)},i(e){s||(P(o,e),s=!0)},o(e){j(o,e),s=!1},d(e){e&&p(t),o&&o.d(e)}}}function te(e,t,n){let{$$slots:s={},$$scope:l}=t;return e.$$set=e=>{"$$scope"in e&&n(0,l=e.$$scope)},[l,s]}class ne extends F{constructor(e){super(),O(this,e,te,ee,o,{})}}function se(e){let t,n;const s=e[1].default,l=r(s,e,e[0],null);return{c(){t=m("div"),l&&l.c(),b(t,"class","svelte-e9ovlj")},m(e,s){d(e,t,s),l&&l.m(t,null),n=!0},p(e,[t]){l&&l.p&&(!n||1&t)&&a(l,s,e,e[0],n?i(s,e[0],t,null):$(e[0]),null)},i(e){n||(P(l,e),n=!0)},o(e){j(l,e),n=!1},d(e){e&&p(t),l&&l.d(e)}}}function le(e,t,n){let{$$slots:s={},$$scope:l}=t;return e.$$set=e=>{"$$scope"in e&&n(0,l=e.$$scope)},[l,s]}class oe extends F{constructor(e){super(),O(this,e,le,se,o,{})}}function re(e){let t;return{c(){t=g("Hi there")},m(e,n){d(e,t,n)},d(e){e&&p(t)}}}function ce(t){let n,s,l;return{c(){n=m("div"),n.innerHTML="안녕하세요. 박종현입니다.<br/>\n      누구에게나 자랑스럽게 내세울 수 있는 멋진 프로젝트를 만들기 위해 부단히 노력하고 있습니다.",s=h(),l=m("div"),l.innerHTML='<a href="https://github.com/ShapeLayer" target="_blank">Github</a> | <a href="https://instagram.com/__jong.hyeon__" target="_blank">Instagram</a>'},m(e,t){d(e,n,t),d(e,s,t),d(e,l,t)},p:e,d(e){e&&p(n),e&&p(s),e&&p(l)}}}function ie(e){let t;return{c(){t=g("Overview")},m(e,n){d(e,t,n)},d(e){e&&p(t)}}}function ae(t){let n;return{c(){n=m("ul"),n.innerHTML='<li>숭덕고등학교 졸업 <i class="svelte-3okb6e">18.03 - 21.02</i></li> \n      <li>전남대학교 컴퓨터정보통신공학과 재학 <i class="svelte-3okb6e">21.03 -</i></li> \n      <li>전남대학교 지능영상미디어인터페이스연구실 <i class="svelte-3okb6e">21.06 -</i></li>',b(n,"class","svelte-3okb6e")},m(e,t){d(e,n,t)},p:e,d(e){e&&p(n)}}}function $e(e){let t;return{c(){t=g("Projects & Contributions")},m(e,n){d(e,t,n)},d(e){e&&p(t)}}}function ue(t){let n;return{c(){n=m("ul"),n.innerHTML='<li><b>openNAMU</b>  <i class="svelte-3okb6e">18.xx</i></li> \n      <li><b>숭덕고 갤러리</b>  <i class="svelte-3okb6e">18.08 - 19.02</i></li> \n      <li><b>hangulcord</b> 광주SW체험축전 체험부스 운영 <i class="svelte-3okb6e">19.04 - 19.05</i></li> \n      <li><b>악질 이름 생성기</b>  <i class="svelte-3okb6e">20.05 - 21.05</i></li> \n      <li><b>Advanced Sticky Note</b>  <i class="svelte-3okb6e">21.03 - 21.06</i></li> \n      <div class="li-lineheight-divs svelte-3okb6e"></div> \n      <li>이것들 외에 크고 작은 토이 프로젝트를 일구어나가고 있습니다. 제 깃허브에서 한번 확인해보세요.</li>',b(n,"class","svelte-3okb6e")},m(e,t){d(e,n,t)},p:e,d(e){e&&p(n)}}}function fe(e){let t;return{c(){t=g("Footprints")},m(e,n){d(e,t,n)},d(e){e&&p(t)}}}function de(t){let n,s,l,o,r;return{c(){n=m("ul"),n.innerHTML='<li><i class="svelte-3okb6e">박종현</i>  <i class="svelte-3okb6e">02.01 -</i></li> \n      <li>숭덕고등학교 <i class="svelte-3okb6e">18.03 - 21.02</i></li> \n      <li>전남대학교 컴퓨터정보통신공학과 학부과정 <i class="svelte-3okb6e">21.03 -</i></li> \n      <li>전남대학교 게임 개발 동아리 PIMM <i class="svelte-3okb6e">21.03 -</i></li> \n      <li>전남대학교 지능영상미디어/인터페이스연구실 연구생 <i class="svelte-3okb6e">21.07 -</i></li> \n      <li>전남대학교 AI융합대학 소프트웨어 개발 동아리 Stolio <i class="svelte-3okb6e">22.03 -</i></li>',s=g("\n    : Activities & Trainings\n    "),l=m("ul"),l.innerHTML='<li>2019 광주SW체험축전 &quot;한글코드로 만드는 디스코드 챗봇&quot; 체험 부스 운영 <i class="svelte-3okb6e">19.05</i></li> \n      <li>고등학교 학교간협력교육과정 게임 프로그래밍 과정 수료 <i class="svelte-3okb6e">20.04 - 20.07</i></li> \n      <li>콘텐츠아카데미 정규과정(게임제작) 수료 <i class="svelte-3okb6e">21.07 - 21.08</i></li> \n      <li>ACM ICPC Korea Regional Ranked <i class="svelte-3okb6e">21.10 - 21.11</i></li> \n      <li>전남대학교 창업아이템경진대회 입선 <i class="svelte-3okb6e">21.11 - 21.12</i></li> \n      <li>&quot;청각장애인을 위한 지능형 전시해설 문자/한국수어 변환 기술개발&quot; 연구과제 참여 <i class="svelte-3okb6e">21.10 -</i></li>',o=g("\n    : Certificates & Language Tests\n    "),r=m("ul"),r.innerHTML='<li>TOEIC 815 <i class="svelte-3okb6e">21.08.08</i></li> \n      <li>AWS Certified Cloud Practitioner <i class="svelte-3okb6e">22.01.25</i></li> \n      <li>SQL 개발자 <i class="svelte-3okb6e">21.10.01</i></li> \n      <li>Coding Specialist Professional I(1급) <i class="svelte-3okb6e">21.07.18</i></li> \n    <ul class="svelte-3okb6e"></ul>',b(n,"class","svelte-3okb6e"),b(l,"class","svelte-3okb6e"),b(r,"class","svelte-3okb6e")},m(e,t){d(e,n,t),d(e,s,t),d(e,l,t),d(e,o,t),d(e,r,t)},p:e,d(e){e&&p(n),e&&p(s),e&&p(l),e&&p(o),e&&p(r)}}}function pe(e){let t,n,s,l,o,r,c,i,a,$,u,g,v,y,x,k,w;return n=new ne({props:{$$slots:{default:[re]},$$scope:{ctx:e}}}),l=new oe({props:{$$slots:{default:[ce]},$$scope:{ctx:e}}}),r=new ne({props:{$$slots:{default:[ie]},$$scope:{ctx:e}}}),i=new oe({props:{$$slots:{default:[ae]},$$scope:{ctx:e}}}),$=new ne({props:{$$slots:{default:[$e]},$$scope:{ctx:e}}}),g=new oe({props:{$$slots:{default:[ue]},$$scope:{ctx:e}}}),y=new ne({props:{$$slots:{default:[fe]},$$scope:{ctx:e}}}),k=new oe({props:{$$slots:{default:[de]},$$scope:{ctx:e}}}),{c(){t=m("div"),E(n.$$.fragment),s=h(),E(l.$$.fragment),o=h(),E(r.$$.fragment),c=h(),E(i.$$.fragment),a=h(),E($.$$.fragment),u=h(),E(g.$$.fragment),v=h(),E(y.$$.fragment),x=h(),E(k.$$.fragment),b(t,"class","desc-root svelte-3okb6e")},m(e,p){d(e,t,p),I(n,t,null),f(t,s),I(l,t,null),f(t,o),I(r,t,null),f(t,c),I(i,t,null),f(t,a),I($,t,null),f(t,u),I(g,t,null),f(t,v),I(y,t,null),f(t,x),I(k,t,null),w=!0},p(e,[t]){const s={};1&t&&(s.$$scope={dirty:t,ctx:e}),n.$set(s);const o={};1&t&&(o.$$scope={dirty:t,ctx:e}),l.$set(o);const c={};1&t&&(c.$$scope={dirty:t,ctx:e}),r.$set(c);const a={};1&t&&(a.$$scope={dirty:t,ctx:e}),i.$set(a);const u={};1&t&&(u.$$scope={dirty:t,ctx:e}),$.$set(u);const f={};1&t&&(f.$$scope={dirty:t,ctx:e}),g.$set(f);const d={};1&t&&(d.$$scope={dirty:t,ctx:e}),y.$set(d);const p={};1&t&&(p.$$scope={dirty:t,ctx:e}),k.$set(p)},i(e){w||(P(n.$$.fragment,e),P(l.$$.fragment,e),P(r.$$.fragment,e),P(i.$$.fragment,e),P($.$$.fragment,e),P(g.$$.fragment,e),P(y.$$.fragment,e),P(k.$$.fragment,e),w=!0)},o(e){j(n.$$.fragment,e),j(l.$$.fragment,e),j(r.$$.fragment,e),j(i.$$.fragment,e),j($.$$.fragment,e),j(g.$$.fragment,e),j(y.$$.fragment,e),j(k.$$.fragment,e),w=!1},d(e){e&&p(t),D(n),D(l),D(r),D(i),D($),D(g),D(y),D(k)}}}class me extends F{constructor(e){super(),O(this,e,null,pe,o,{})}}function ge(t){let n;return{c(){n=m("div"),n.innerHTML='<a class="no-deco svelte-q7c1qr" href="http://unicode.org/consortium/adopted-characters.html#b1F30C" target="_blank"><img alt="Unicode Consortium Bronze Sponser" src="https://www.unicode.org/consortium/aacimg/badges/bronze-1F30C.png" class="svelte-q7c1qr"/></a><br/>\n  © Powered with ❤️ <br/>\n  by Park, Jonghyeon / ShapeLayer.',b(n,"class","svelte-q7c1qr")},m(e,t){d(e,n,t)},p:e,i:e,o:e,d(e){e&&p(n)}}}class he extends F{constructor(e){super(),O(this,e,null,ge,o,{})}}function be(t){let n,s,l,o,r,c,i;return s=new Z({}),o=new me({}),c=new he({}),{c(){n=m("main"),E(s.$$.fragment),l=h(),E(o.$$.fragment),r=h(),E(c.$$.fragment),b(n,"class","svelte-1ja2pop")},m(e,t){d(e,n,t),I(s,n,null),f(n,l),I(o,n,null),f(n,r),I(c,n,null),i=!0},p:e,i(e){i||(P(s.$$.fragment,e),P(o.$$.fragment,e),P(c.$$.fragment,e),i=!0)},o(e){j(s.$$.fragment,e),j(o.$$.fragment,e),j(c.$$.fragment,e),i=!1},d(e){e&&p(n),D(s),D(o),D(c)}}}return new class extends F{constructor(e){super(),O(this,e,null,be,o,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
