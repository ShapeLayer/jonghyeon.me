var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function r(t){t.forEach(e)}function s(t){return"function"==typeof t}function o(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function a(t,e,n,r){if(t){const s=c(t,e,n,r);return t[0](s)}}function c(t,e,n,r){return t[1]&&r?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](r(e))):n.ctx}function l(t,e,n,r){if(t[2]&&r){const s=t[2](r(n));if(void 0===e.dirty)return s;if("object"==typeof s){const t=[],n=Math.max(e.dirty.length,s.length);for(let r=0;r<n;r+=1)t[r]=e.dirty[r]|s[r];return t}return e.dirty|s}return e.dirty}function $(t,e,n,r,s,o){if(s){const a=c(e,n,r,o);t.p(a,s)}}function i(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}function u(t,e){t.appendChild(e)}function f(t,e,n){t.insertBefore(e,n||null)}function p(t){t.parentNode.removeChild(t)}function d(t){return document.createElement(t)}function m(t){return document.createTextNode(t)}function g(){return m(" ")}function h(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function _(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function x(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}let y;function v(t){y=t}function b(t){(function(){if(!y)throw new Error("Function called outside component initialization");return y})().$$.on_mount.push(t)}const w=[],j=[],E=[],S=[],A=Promise.resolve();let C=!1;function k(t){E.push(t)}const q=new Set;let T=0;function I(){const t=y;do{for(;T<w.length;){const t=w[T];T++,v(t),R(t.$$)}for(v(null),w.length=0,T=0;j.length;)j.pop()();for(let t=0;t<E.length;t+=1){const e=E[t];q.has(e)||(q.add(e),e())}E.length=0}while(w.length);for(;S.length;)S.pop()();C=!1,q.clear(),v(t)}function R(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(k)}}const L=new Set;function O(t,e){t&&t.i&&(L.delete(t),t.i(e))}function D(t,e,n,r){if(t&&t.o){if(L.has(t))return;L.add(t),undefined.c.push((()=>{L.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}else r&&r()}function M(t){t&&t.c()}function P(t,n,o,a){const{fragment:c,after_update:l}=t.$$;c&&c.m(n,o),a||k((()=>{const n=t.$$.on_mount.map(e).filter(s);t.$$.on_destroy?t.$$.on_destroy.push(...n):r(n),t.$$.on_mount=[]})),l.forEach(k)}function N(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function H(t,e){-1===t.$$.dirty[0]&&(w.push(t),C||(C=!0,A.then(I)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Y(e,s,o,a,c,l,$,i=[-1]){const u=y;v(e);const f=e.$$={fragment:null,ctx:[],props:l,update:t,not_equal:c,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(s.context||(u?u.$$.context:[])),callbacks:n(),dirty:i,skip_bound:!1,root:s.target||u.$$.root};$&&$(f.root);let d=!1;if(f.ctx=o?o(e,s.props||{},((t,n,...r)=>{const s=r.length?r[0]:n;return f.ctx&&c(f.ctx[t],f.ctx[t]=s)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](s),d&&H(e,t)),n})):[],f.update(),d=!0,r(f.before_update),f.fragment=!!a&&a(f.ctx),s.target){if(s.hydrate){const t=function(t){return Array.from(t.childNodes)}(s.target);f.fragment&&f.fragment.l(t),t.forEach(p)}else f.fragment&&f.fragment.c();s.intro&&O(e.$$.fragment),P(e,s.target,s.anchor,s.customElement),I()}v(u)}class B{$destroy(){N(this,1),this.$destroy=t}$on(e,n){if(!s(n))return t;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const t=r.indexOf(n);-1!==t&&r.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function F(e){let n;return{c(){n=d("header"),n.innerHTML='<div class="hero svelte-7fp1qj"><div class="hero__wrapper svelte-7fp1qj"><h1 class="hero__content pseudo svelte-7fp1qj">CREATES A WORLD<br/>\n        BY <span id="hero__trans-target-1" class="highlight svelte-7fp1qj">LAYERING</span><br/>\n        VARIOUS <span id="hero__trans-target-2" class="highlight svelte-7fp1qj">SHAPES.</span></h1> \n      <h1 id="hero__layer-shape" class="hero__content svelte-7fp1qj"><a class="no-hover svelte-7fp1qj" href="#profile">CREATES A WORLD<br/>BY <span id="hero__trans-target-1" class="highlight svelte-7fp1qj">LAYERING</span><br/>VARIOUS <span id="hero__trans-target-2" class="highlight svelte-7fp1qj">SHAPES.</span></a></h1> \n      <h1 id="hero__shape-layer" class="hero__content svelte-7fp1qj"><a class="no-hover svelte-7fp1qj" href="#profile">CREATES A WORLD<br/>BY <span id="hero__trans-target-1" class="highlight svelte-7fp1qj">SHAPING</span><br/>VARIOUS <span id="hero__trans-target-2" class="highlight svelte-7fp1qj">LAYERS.</span></a></h1></div></div>',_(n,"class","svelte-7fp1qj")},m(t,e){f(t,n,e)},p:t,i:t,o:t,d(t){t&&p(n)}}}function W(t){return b((()=>function(){let t=0;setInterval((()=>{t=(t+1)%2,document.querySelector("#hero__layer-shape").style.opacity=1-t,document.querySelector("#hero__shape-layer").style.opacity=t}),2500)}())),[]}class V extends B{constructor(t){super(),Y(this,t,W,F,o,{})}}function z(e){let n;return{c(){n=d("section"),n.innerHTML='<div class="profile__content"><div class="profile__intro"><h3 class="profile__name subsubtitle">PARK &quot;SHAPELAYER&quot; JONGHYEON</h3> \n      <h2 class="profile__overview subtitle">개발자가 멋있었던 아이_</h2> \n      <p class="svelte-19h2xjl"><br/></p> \n      <p class="svelte-19h2xjl">입원 생활로 하루 하루를 보내던 09년 여름,<br/>옆 침대 대학생 형을 따라다니며 프로그래밍을 구경하던 아이</p> \n      <p class="svelte-19h2xjl">마인크래프트가 인생의 낙이었던 14년,<br/>마인크래프트 플러그인 개발자들을 따라하며 &quot;멋진 사람&quot;을 꿈꾼 소년</p> \n      <p class="svelte-19h2xjl">웹 프로그래밍이 고된 수험의 쉼표였던 20년,<br/>친구들에 둘러싸여 무언가를 만들었던 학생</p> \n      <p class="svelte-19h2xjl">그리고 오늘에 이르른.</p> \n      <p class="svelte-19h2xjl"><br/></p> \n      <p class="svelte-19h2xjl">안녕하세요. 학생과 개발자 사이, 박종현입니다.</p></div> \n    <div class="profile__links"><ul class="enums"><li><a href="mailto:me@jonghyeon.me" class="svelte-19h2xjl">me@jonghyeon.me</a></li> \n        <li><a href="https://www.instagram.com/__jong.hyeon__/" target="_blank" class="svelte-19h2xjl">instagram</a></li></ul> \n      <ul class="enums"><li><a href="https://github.com/ShapeLayer" target="_blank" class="svelte-19h2xjl">github</a></li> \n        <li><a href="https://blog.jonghyeon.me" target="_blank" class="svelte-19h2xjl">blog</a></li> \n        <li><a href="https://www.credly.com/users/jonghyeon" target="_blank" class="svelte-19h2xjl">credly</a></li> \n        <li><a href="https://solved.ac/profile/belline0124" target="_blank" class="svelte-19h2xjl">solved.ac</a></li></ul></div></div>',_(n,"id","profile"),_(n,"class","profile svelte-19h2xjl")},m(t,e){f(t,n,e)},p:t,i:t,o:t,d(t){t&&p(n)}}}class G extends B{constructor(t){super(),Y(this,t,null,z,o,{})}}function U(t){let e,n;return{c(){e=d("h3"),n=m(t[1]),_(e,"class","subtitle svelte-1u4nv5d")},m(t,r){f(t,e,r),u(e,n)},p(t,e){2&e&&x(n,t[1])},d(t){t&&p(e)}}}function J(t){let e,n,r,s,o,c=""!==t[1]&&U(t);const m=t[3].default,h=a(m,t,t[2],null);return{c(){e=d("div"),c&&c.c(),n=g(),r=d("ul"),h&&h.c(),_(e,"id",s=t[0]?t[0]:null),_(e,"class","careers__sections svelte-1u4nv5d")},m(t,s){f(t,e,s),c&&c.m(e,null),u(e,n),u(e,r),h&&h.m(r,null),o=!0},p(t,[r]){""!==t[1]?c?c.p(t,r):(c=U(t),c.c(),c.m(e,n)):c&&(c.d(1),c=null),h&&h.p&&(!o||4&r)&&$(h,m,t,t[2],o?l(m,t[2],r,null):i(t[2]),null),(!o||1&r&&s!==(s=t[0]?t[0]:null))&&_(e,"id",s)},i(t){o||(O(h,t),o=!0)},o(t){D(h,t),o=!1},d(t){t&&p(e),c&&c.d(),h&&h.d(t)}}}function K(t,e,n){let{$$slots:r={},$$scope:s}=e,{id:o}=e,{title:a=""}=e;return t.$$set=t=>{"id"in t&&n(0,o=t.id),"title"in t&&n(1,a=t.title),"$$scope"in t&&n(2,s=t.$$scope)},[o,a,s,r]}class Q extends B{constructor(t){super(),Y(this,t,K,J,o,{id:0,title:1})}}function X(t){let e;return{c(){e=m(t[0])},m(t,n){f(t,e,n)},p(t,n){1&n&&x(e,t[0])},d(t){t&&p(e)}}}function Z(t){let e,n;return{c(){e=d("a"),n=m(t[0]),_(e,"href",t[2]),_(e,"target","_blank")},m(t,r){f(t,e,r),u(e,n)},p(t,r){1&r&&x(n,t[0]),4&r&&_(e,"href",t[2])},d(t){t&&p(e)}}}function tt(t){let e;return{c(){e=d("br")},m(t,n){f(t,e,n)},d(t){t&&p(e)}}}function et(t){let e,n,r,s,o,c,h;function y(t,e){return""!==t[2]?Z:X}let v=y(t),b=v(t),w=""!==t[0]&&tt();const j=t[4].default,E=a(j,t,t[3],null);return{c(){e=d("li"),b.c(),n=g(),r=d("span"),s=m(t[1]),o=g(),w&&w.c(),c=g(),E&&E.c(),_(r,"class","datetime svelte-hyrn7w"),_(e,"class","svelte-hyrn7w")},m(t,a){f(t,e,a),b.m(e,null),u(e,n),u(e,r),u(r,s),u(e,o),w&&w.m(e,null),u(e,c),E&&E.m(e,null),h=!0},p(t,[r]){v===(v=y(t))&&b?b.p(t,r):(b.d(1),b=v(t),b&&(b.c(),b.m(e,n))),(!h||2&r)&&x(s,t[1]),""!==t[0]?w||(w=tt(),w.c(),w.m(e,c)):w&&(w.d(1),w=null),E&&E.p&&(!h||8&r)&&$(E,j,t,t[3],h?l(j,t[3],r,null):i(t[3]),null)},i(t){h||(O(E,t),h=!0)},o(t){D(E,t),h=!1},d(t){t&&p(e),b.d(),w&&w.d(),E&&E.d(t)}}}function nt(t,e,n){let{$$slots:r={},$$scope:s}=e,{name:o=""}=e,{date:a=""}=e,{url:c=""}=e;return t.$$set=t=>{"name"in t&&n(0,o=t.name),"date"in t&&n(1,a=t.date),"url"in t&&n(2,c=t.url),"$$scope"in t&&n(3,s=t.$$scope)},[o,a,c,s,r]}class rt extends B{constructor(t){super(),Y(this,t,nt,et,o,{name:0,date:1,url:2})}}function st(e){let n,s,o,a,c,l,$,i;return{c(){n=d("span"),s=m(e[1]),o=m("일 남음, \n  "),a=d("span"),c=m(e[0]),l=m("%"),_(a,"id","percentage-displayer"),_(n,"id","military-left-service-duration")},m(t,r){f(t,n,r),u(n,s),u(n,o),u(n,a),u(a,c),u(a,l),$||(i=[h(a,"mouseover",e[2]),h(a,"mouseout",e[3]),h(a,"focus",e[2]),h(a,"blur",e[3])],$=!0)},p(t,[e]){2&e&&x(s,t[1]),1&e&&x(c,t[0])},i:t,o:t,d(t){t&&p(n),$=!1,r(i)}}}function ot(t,e,n){let r,s,o,a=(new Date).getTime();const c=new Date("2022-07-04").getTime(),l=new Date("2024-01-03").getTime(),$=l-c;let i,u=6e4,f=2;const p=()=>{n(4,a=(new Date).getTime())},d=(t,e)=>{clearInterval(i),i=setInterval(t,e)},m=()=>{p()},g=()=>{2==f?_():(n(5,f--,f),m())},h=()=>{12==f?x():(n(5,f++,f),m())},_=()=>{u=6e4,d(m,u)},x=()=>{u=30,d(m,u)},y=()=>{u=30,d(h,u)},v=()=>{u=30,d(g,u)};return b((()=>{p()})),t.$$.update=()=>{16&t.$$.dirty&&n(6,r=l-a),64&t.$$.dirty&&n(1,s=Math.ceil(r/864e5)),96&t.$$.dirty&&n(0,o=Math.max(100*(1-r/$),0).toFixed(f))},[o,s,y,v,a,f,r]}class at extends B{constructor(t){super(),Y(this,t,ot,st,o,{})}}function ct(e){let n,r;return{c(){n=d("span"),r=m(e[0]),_(n,"id","military-rank")},m(t,e){f(t,n,e),u(n,r)},p(t,[e]){1&e&&x(r,t[0])},i:t,o:t,d(t){t&&p(n)}}}const lt=["이병","일병","상병","병장"];function $t(t,e,n){let r;const s=new Date("2022-07-04").getTime(),o=(new Date).getTime(),a=new Date(o-s).getMonth();return b((()=>{n(0,r=a<3?lt[0]:a<9?lt[1]:a<15?lt[2]:lt[3])})),[r]}class it extends B{constructor(t){super(),Y(this,t,$t,ct,o,{})}}function ut(e){let n,r,s,o,a,c,l,$;return r=new it({}),o=new at({props:{starts:"2022-07-04",ends:"2024-01-03"}}),{c(){n=m("⇒ "),M(r.$$.fragment),s=m(", "),M(o.$$.fragment),a=d("br"),c=m("\n        ⇒ "),l=d("a"),l.textContent="[포스트] 커리어를 잠시 중단하며",_(l,"href","https://blog.jonghyeon.me/posts/2022-07-04-pausing-carrer/"),_(l,"target","_blank")},m(t,e){f(t,n,e),P(r,t,e),f(t,s,e),P(o,t,e),f(t,a,e),f(t,c,e),f(t,l,e),$=!0},p:t,i(t){$||(O(r.$$.fragment,t),O(o.$$.fragment,t),$=!0)},o(t){D(r.$$.fragment,t),D(o.$$.fragment,t),$=!1},d(t){t&&p(n),N(r,t),t&&p(s),N(o,t),t&&p(a),t&&p(c),t&&p(l)}}}function ft(t){let e,n;return e=new rt({props:{name:"대한민국 육군 통신병 @파주",date:"2022.07-2024.01",$$slots:{default:[ut]},$$scope:{ctx:t}}}),{c(){M(e.$$.fragment)},m(t,r){P(e,t,r),n=!0},p(t,n){const r={};1&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r)},i(t){n||(O(e.$$.fragment,t),n=!0)},o(t){D(e.$$.fragment,t),n=!1},d(t){N(e,t)}}}function pt(e){let n,r,s,o;return n=new rt({props:{name:"숭덕고등학교",date:"2018.03-2021.02"}}),s=new rt({props:{name:"전남대학교 컴퓨터정보통신공학과 학부과정",date:"2021.03-"}}),{c(){M(n.$$.fragment),r=g(),M(s.$$.fragment)},m(t,e){P(n,t,e),f(t,r,e),P(s,t,e),o=!0},p:t,i(t){o||(O(n.$$.fragment,t),O(s.$$.fragment,t),o=!0)},o(t){D(n.$$.fragment,t),D(s.$$.fragment,t),o=!1},d(t){N(n,t),t&&p(r),N(s,t)}}}function dt(e){let n,r;return n=new rt({props:{name:"전남대학교 지능영상미디어인터페이스 연구실",date:"2021.06-2022.07"}}),{c(){M(n.$$.fragment)},m(t,e){P(n,t,e),r=!0},p:t,i(t){r||(O(n.$$.fragment,t),r=!0)},o(t){D(n.$$.fragment,t),r=!1},d(t){N(n,t)}}}function mt(t){let e;return{c(){e=m("⇒ 개인 프로젝트")},m(t,n){f(t,e,n)},d(t){t&&p(e)}}}function gt(t){let e;return{c(){e=m("⇒ 연구실 연구과제 // 클라이언트 개발")},m(t,n){f(t,e,n)},d(t){t&&p(e)}}}function ht(t){let e;return{c(){e=m("⇒ 아웃소싱 // 프론트엔드 디자인 및 개발")},m(t,n){f(t,e,n)},d(t){t&&p(e)}}}function _t(t){let e;return{c(){e=m("⇒ 아웃소싱 // 초기 프론트엔드 디자인 및 개발")},m(t,n){f(t,e,n)},d(t){t&&p(e)}}}function xt(e){let n,r,s;return{c(){n=m("그 외 프로젝트들은 "),r=d("a"),r.textContent="Github",s=m("를 참조하세요."),_(r,"href","https://github.com/ShapeLayer"),_(r,"target","_blank")},m(t,e){f(t,n,e),f(t,r,e),f(t,s,e)},p:t,d(t){t&&p(n),t&&p(r),t&&p(s)}}}function yt(t){let e,n,r,s,o,a,c,l,$,i;return e=new rt({props:{name:"악질 이름 생성기",date:"2020.05",url:"https://name.ho9.me",$$slots:{default:[mt]},$$scope:{ctx:t}}}),r=new rt({props:{name:"청각장애인을 위한 지능형 전시해설 문자/한국수어 변환 기술 개발",date:"2021.06-2022.07",$$slots:{default:[gt]},$$scope:{ctx:t}}}),o=new rt({props:{name:"2022 호남 대학간 침해 대응 대회 2022 대회 사이트",date:"2022.06",url:"https://hccc2022.github.io",$$slots:{default:[ht]},$$scope:{ctx:t}}}),c=new rt({props:{name:"IW-FCV 2023 학회 정보 사이트",date:"2022.05-2022.07",url:"https://iwfcv2023.github.io",$$slots:{default:[_t]},$$scope:{ctx:t}}}),$=new rt({props:{$$slots:{default:[xt]},$$scope:{ctx:t}}}),{c(){M(e.$$.fragment),n=g(),M(r.$$.fragment),s=g(),M(o.$$.fragment),a=g(),M(c.$$.fragment),l=g(),M($.$$.fragment)},m(t,u){P(e,t,u),f(t,n,u),P(r,t,u),f(t,s,u),P(o,t,u),f(t,a,u),P(c,t,u),f(t,l,u),P($,t,u),i=!0},p(t,n){const s={};1&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s);const a={};1&n&&(a.$$scope={dirty:n,ctx:t}),r.$set(a);const l={};1&n&&(l.$$scope={dirty:n,ctx:t}),o.$set(l);const i={};1&n&&(i.$$scope={dirty:n,ctx:t}),c.$set(i);const u={};1&n&&(u.$$scope={dirty:n,ctx:t}),$.$set(u)},i(t){i||(O(e.$$.fragment,t),O(r.$$.fragment,t),O(o.$$.fragment,t),O(c.$$.fragment,t),O($.$$.fragment,t),i=!0)},o(t){D(e.$$.fragment,t),D(r.$$.fragment,t),D(o.$$.fragment,t),D(c.$$.fragment,t),D($.$$.fragment,t),i=!1},d(t){N(e,t),t&&p(n),N(r,t),t&&p(s),N(o,t),t&&p(a),N(c,t),t&&p(l),N($,t)}}}function vt(e){let n,r,s;return{c(){n=m("⇒ 연구과제 논문 // 공동저자"),r=d("br"),s=m("\n        ⇒ 한국스마트미디어학회 2021 춘계 학술대회. 정종호, 고영민, 박종현, 이칠우, 김대진.")},m(t,e){f(t,n,e),f(t,r,e),f(t,s,e)},p:t,d(t){t&&p(n),t&&p(r),t&&p(s)}}}function bt(e){let n,r,s;return{c(){n=m("⇒ 연구과제 논문 // 공동저자"),r=d("br"),s=m("\n        ⇒ 한국스마트미디어학회 2022 종합학술대회. 정종호, 박종현, 나광일, 성홍념, 황희재, 이칠우")},m(t,e){f(t,n,e),f(t,r,e),f(t,s,e)},p:t,d(t){t&&p(n),t&&p(r),t&&p(s)}}}function wt(t){let e,n,r,s,o,a,c,l;return e=new rt({props:{name:"전남대학교 창업아이템경진대회 입선",date:"2021.12"}}),r=new rt({props:{name:"The 2021 ICPC Asia Seoul Regional Contest 53th",date:"2021.11.13"}}),o=new rt({props:{name:"자연스러운 수어 애니메이션을 위한 FBX 파일 결합 알고리즘",date:"2021.11",$$slots:{default:[vt]},$$scope:{ctx:t}}}),c=new rt({props:{name:"자연스러운 애니메이션을 위한 수어 애니메이션 생성 알고리즘 고도화",date:"2022.06",$$slots:{default:[bt]},$$scope:{ctx:t}}}),{c(){M(e.$$.fragment),n=g(),M(r.$$.fragment),s=g(),M(o.$$.fragment),a=g(),M(c.$$.fragment)},m(t,$){P(e,t,$),f(t,n,$),P(r,t,$),f(t,s,$),P(o,t,$),f(t,a,$),P(c,t,$),l=!0},p(t,e){const n={};1&e&&(n.$$scope={dirty:e,ctx:t}),o.$set(n);const r={};1&e&&(r.$$scope={dirty:e,ctx:t}),c.$set(r)},i(t){l||(O(e.$$.fragment,t),O(r.$$.fragment,t),O(o.$$.fragment,t),O(c.$$.fragment,t),l=!0)},o(t){D(e.$$.fragment,t),D(r.$$.fragment,t),D(o.$$.fragment,t),D(c.$$.fragment,t),l=!1},d(t){N(e,t),t&&p(n),N(r,t),t&&p(s),N(o,t),t&&p(a),N(c,t)}}}function jt(t){let e;return{c(){e=m("⇒ 체험 축전 // 기획, 운영 및 개발")},m(t,n){f(t,e,n)},d(t){t&&p(e)}}}function Et(t){let e;return{c(){e=m("⇒ 동아리 개설 참여 // 동아리 활동 자문 및 프로젝트 리딩")},m(t,n){f(t,e,n)},d(t){t&&p(e)}}}function St(t){let e,n,r,s,o,a;return e=new rt({props:{name:'2019 광주SW체험축전 "한글코드로 만드는 디스코드 챗봇" 체험 부스 운영',date:"2019.05",$$slots:{default:[jt]},$$scope:{ctx:t}}}),r=new rt({props:{name:"전남대학교 게임개발동아리 PIMM",date:"2021.03-2022.06"}}),o=new rt({props:{name:"전남대학교 소프트웨어 개발동아리 Stolio",date:"2022.03-2022.06",$$slots:{default:[Et]},$$scope:{ctx:t}}}),{c(){M(e.$$.fragment),n=g(),M(r.$$.fragment),s=g(),M(o.$$.fragment)},m(t,c){P(e,t,c),f(t,n,c),P(r,t,c),f(t,s,c),P(o,t,c),a=!0},p(t,n){const r={};1&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r);const s={};1&n&&(s.$$scope={dirty:n,ctx:t}),o.$set(s)},i(t){a||(O(e.$$.fragment,t),O(r.$$.fragment,t),O(o.$$.fragment,t),a=!0)},o(t){D(e.$$.fragment,t),D(r.$$.fragment,t),D(o.$$.fragment,t),a=!1},d(t){N(e,t),t&&p(n),N(r,t),t&&p(s),N(o,t)}}}function At(e){let n,r,s;return{c(){n=m("⇒ Cloud Practitioner"),r=d("br"),s=m("\n        ⇒ Developer - Associate")},m(t,e){f(t,n,e),f(t,r,e),f(t,s,e)},p:t,d(t){t&&p(n),t&&p(r),t&&p(s)}}}function Ct(t){let e,n,r,s,o,a,c,l;return e=new rt({props:{name:"TOEIC 805",date:"2021.08.08"}}),r=new rt({props:{name:"AWS Certification",url:"https://www.credly.com/users/jonghyeon/badges",$$slots:{default:[At]},$$scope:{ctx:t}}}),o=new rt({props:{name:"SQL 개발자"}}),c=new rt({props:{name:"YBM Coding Specialist Professional I"}}),{c(){M(e.$$.fragment),n=g(),M(r.$$.fragment),s=g(),M(o.$$.fragment),a=g(),M(c.$$.fragment)},m(t,$){P(e,t,$),f(t,n,$),P(r,t,$),f(t,s,$),P(o,t,$),f(t,a,$),P(c,t,$),l=!0},p(t,e){const n={};1&e&&(n.$$scope={dirty:e,ctx:t}),r.$set(n)},i(t){l||(O(e.$$.fragment,t),O(r.$$.fragment,t),O(o.$$.fragment,t),O(c.$$.fragment,t),l=!0)},o(t){D(e.$$.fragment,t),D(r.$$.fragment,t),D(o.$$.fragment,t),D(c.$$.fragment,t),l=!1},d(t){N(e,t),t&&p(n),N(r,t),t&&p(s),N(o,t),t&&p(a),N(c,t)}}}function kt(t){let e,n,r,s,o,a,c,l,$,i,m,h,x,y,v,b,w,j,E,S;return c=new Q({props:{id:"careers__military",$$slots:{default:[ft]},$$scope:{ctx:t}}}),$=new Q({props:{id:"careers__education",title:"EDUCATION",$$slots:{default:[pt]},$$scope:{ctx:t}}}),m=new Q({props:{id:"careers__education",title:"WORK",$$slots:{default:[dt]},$$scope:{ctx:t}}}),x=new Q({props:{id:"careers__projects",title:"PROJECTS",$$slots:{default:[yt]},$$scope:{ctx:t}}}),v=new Q({props:{id:"careers__achievements",title:"ACHIEVEMENTS",$$slots:{default:[wt]},$$scope:{ctx:t}}}),w=new Q({props:{id:"careers__activities",title:"ACTIVITIES",$$slots:{default:[St]},$$scope:{ctx:t}}}),E=new Q({props:{id:"careers__certificates",title:"CERTIFICATES",$$slots:{default:[Ct]},$$scope:{ctx:t}}}),{c(){e=d("section"),n=d("div"),r=d("h3"),r.textContent="CAREERS",s=g(),o=d("h2"),o.textContent="그동안의 발자취_",a=g(),M(c.$$.fragment),l=g(),M($.$$.fragment),i=g(),M(m.$$.fragment),h=g(),M(x.$$.fragment),y=g(),M(v.$$.fragment),b=g(),M(w.$$.fragment),j=g(),M(E.$$.fragment),_(r,"class","subsubtitle"),_(o,"class","subtitle"),_(n,"class","careers__content svelte-1hsl7ax"),_(e,"class","careers svelte-1hsl7ax")},m(t,p){f(t,e,p),u(e,n),u(n,r),u(n,s),u(n,o),u(n,a),P(c,n,null),u(n,l),P($,n,null),u(n,i),P(m,n,null),u(n,h),P(x,n,null),u(n,y),P(v,n,null),u(n,b),P(w,n,null),u(n,j),P(E,n,null),S=!0},p(t,[e]){const n={};1&e&&(n.$$scope={dirty:e,ctx:t}),c.$set(n);const r={};1&e&&(r.$$scope={dirty:e,ctx:t}),$.$set(r);const s={};1&e&&(s.$$scope={dirty:e,ctx:t}),m.$set(s);const o={};1&e&&(o.$$scope={dirty:e,ctx:t}),x.$set(o);const a={};1&e&&(a.$$scope={dirty:e,ctx:t}),v.$set(a);const l={};1&e&&(l.$$scope={dirty:e,ctx:t}),w.$set(l);const i={};1&e&&(i.$$scope={dirty:e,ctx:t}),E.$set(i)},i(t){S||(O(c.$$.fragment,t),O($.$$.fragment,t),O(m.$$.fragment,t),O(x.$$.fragment,t),O(v.$$.fragment,t),O(w.$$.fragment,t),O(E.$$.fragment,t),S=!0)},o(t){D(c.$$.fragment,t),D($.$$.fragment,t),D(m.$$.fragment,t),D(x.$$.fragment,t),D(v.$$.fragment,t),D(w.$$.fragment,t),D(E.$$.fragment,t),S=!1},d(t){t&&p(e),N(c),N($),N(m),N(x),N(v),N(w),N(E)}}}class qt extends B{constructor(t){super(),Y(this,t,null,kt,o,{})}}function Tt(e){let n;return{c(){n=d("footer"),n.innerHTML='<div class="footer__content"><p class="badges"><a class="no-hover" href="http://unicode.org/consortium/adopted-characters.html#b1F30C" target="_blank"><img id="unicode-sponser" src="https://www.unicode.org/consortium/aacimg/badges/bronze-1F30C.png" alt="Unicode Consortium Official Bronze Sponser" class="svelte-1qhkztf"/></a></p> \n    <p class="copy">© Park Jonghyeon / ShapeLayer.</p> \n    <p><a href="https://github.com/ShapeLayer/jonghyeon.me" target="_blank">ShapeLayer/jonghyeon.me</a></p></div>',_(n,"class","svelte-1qhkztf")},m(t,e){f(t,n,e)},p:t,i:t,o:t,d(t){t&&p(n)}}}class It extends B{constructor(t){super(),Y(this,t,null,Tt,o,{})}}function Rt(e){let n,r,s,o,a,c,l,$,i,m,h,x,y;return r=new V({}),o=new G({}),$=new qt({}),x=new It({}),{c(){n=d("main"),M(r.$$.fragment),s=g(),M(o.$$.fragment),a=g(),c=d("hr"),l=g(),M($.$$.fragment),i=g(),m=d("hr"),h=g(),M(x.$$.fragment),_(c,"class","section-divider"),_(m,"class","section-divider")},m(t,e){f(t,n,e),P(r,n,null),u(n,s),P(o,n,null),u(n,a),u(n,c),u(n,l),P($,n,null),u(n,i),u(n,m),u(n,h),P(x,n,null),y=!0},p:t,i(t){y||(O(r.$$.fragment,t),O(o.$$.fragment,t),O($.$$.fragment,t),O(x.$$.fragment,t),y=!0)},o(t){D(r.$$.fragment,t),D(o.$$.fragment,t),D($.$$.fragment,t),D(x.$$.fragment,t),y=!1},d(t){t&&p(n),N(r),N(o),N($),N(x)}}}return new class extends B{constructor(t){super(),Y(this,t,null,Rt,o,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
