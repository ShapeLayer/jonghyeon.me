var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function r(t){t.forEach(e)}function s(t){return"function"==typeof t}function o(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e,n,r){if(t){const s=a(t,e,n,r);return t[0](s)}}function a(t,e,n,r){return t[1]&&r?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](r(e))):n.ctx}function l(t,e,n,r){if(t[2]&&r){const s=t[2](r(n));if(void 0===e.dirty)return s;if("object"==typeof s){const t=[],n=Math.max(e.dirty.length,s.length);for(let r=0;r<n;r+=1)t[r]=e.dirty[r]|s[r];return t}return e.dirty|s}return e.dirty}function $(t,e,n,r,s,o){if(s){const c=a(e,n,r,o);t.p(c,s)}}function i(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}function u(t,e){t.appendChild(e)}function f(t,e,n){t.insertBefore(e,n||null)}function p(t){t.parentNode&&t.parentNode.removeChild(t)}function d(t){return document.createElement(t)}function m(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function g(t){return document.createTextNode(t)}function h(){return g(" ")}function _(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function x(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function y(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}let v;function w(t){v=t}function b(t){(function(){if(!v)throw new Error("Function called outside component initialization");return v})().$$.on_mount.push(t)}const E=[],S=[],A=[],j=[],C=Promise.resolve();let k=!1;function q(t){A.push(t)}const T=new Set;let I=0;function R(){if(0!==I)return;const t=v;do{try{for(;I<E.length;){const t=E[I];I++,w(t),L(t.$$)}}catch(t){throw E.length=0,I=0,t}for(w(null),E.length=0,I=0;S.length;)S.pop()();for(let t=0;t<A.length;t+=1){const e=A[t];T.has(e)||(T.add(e),e())}A.length=0}while(E.length);for(;j.length;)j.pop()();k=!1,T.clear(),w(t)}function L(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(q)}}const O=new Set;let D;function M(t,e){t&&t.i&&(O.delete(t),t.i(e))}function N(t,e,n,r){if(t&&t.o){if(O.has(t))return;O.add(t),D.c.push((()=>{O.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}else r&&r()}function P(t){t&&t.c()}function H(t,n,o,c){const{fragment:a,after_update:l}=t.$$;a&&a.m(n,o),c||q((()=>{const n=t.$$.on_mount.map(e).filter(s);t.$$.on_destroy?t.$$.on_destroy.push(...n):r(n),t.$$.on_mount=[]})),l.forEach(q)}function Y(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function B(t,e){-1===t.$$.dirty[0]&&(E.push(t),k||(k=!0,C.then(R)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function F(e,s,o,c,a,l,$,i=[-1]){const u=v;w(e);const f=e.$$={fragment:null,ctx:[],props:l,update:t,not_equal:a,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(s.context||(u?u.$$.context:[])),callbacks:n(),dirty:i,skip_bound:!1,root:s.target||u.$$.root};$&&$(f.root);let d=!1;if(f.ctx=o?o(e,s.props||{},((t,n,...r)=>{const s=r.length?r[0]:n;return f.ctx&&a(f.ctx[t],f.ctx[t]=s)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](s),d&&B(e,t)),n})):[],f.update(),d=!0,r(f.before_update),f.fragment=!!c&&c(f.ctx),s.target){if(s.hydrate){const t=function(t){return Array.from(t.childNodes)}(s.target);f.fragment&&f.fragment.l(t),t.forEach(p)}else f.fragment&&f.fragment.c();s.intro&&M(e.$$.fragment),H(e,s.target,s.anchor,s.customElement),R()}w(u)}class W{$destroy(){Y(this,1),this.$destroy=t}$on(e,n){if(!s(n))return t;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const t=r.indexOf(n);-1!==t&&r.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function V(e){let n,r,s;return{c(){n=m("svg"),r=m("rect"),s=m("circle"),x(r,"x","1"),x(r,"y","1"),x(r,"width","20"),x(r,"height","40"),x(r,"rx","10"),x(r,"fill","transparent"),x(r,"stroke-width","2"),x(r,"stroke","white"),x(r,"class","svelte-9u8yu7"),x(s,"id","circle"),x(s,"cx","11"),x(s,"cy","11"),x(s,"r","5"),x(s,"class","css-1xwg794 svelte-9u8yu7"),x(n,"xmlns","http://www.w3.org/2000/svg"),x(n,"viewBox","0 0 22 42"),x(n,"class","css-361ppy")},m(t,e){f(t,n,e),u(n,r),u(n,s)},p:t,i:t,o:t,d(t){t&&p(n)}}}class z extends W{constructor(t){super(),F(this,t,null,V,o,{})}}function G(e){let n,r,s,o,c,a;return c=new z({}),{c(){n=d("header"),r=d("div"),r.innerHTML='<div class="hero__wrapper svelte-1gc3qd7"><h1 class="hero__content pseudo svelte-1gc3qd7">CREATES A WORLD<br/>\n        BY <span id="hero__trans-target-1" class="highlight svelte-1gc3qd7">LAYERING</span><br/>\n        VARIOUS <span id="hero__trans-target-2" class="highlight svelte-1gc3qd7">SHAPES.</span></h1> \n      <h1 id="hero__layer-shape" class="hero__content svelte-1gc3qd7"><a class="no-hover svelte-1gc3qd7" href="#profile">CREATES A WORLD<br/>BY <span id="hero__trans-target-1" class="highlight svelte-1gc3qd7">LAYERING</span><br/>VARIOUS <span id="hero__trans-target-2" class="highlight svelte-1gc3qd7">SHAPES.</span></a></h1> \n      <h1 id="hero__shape-layer" class="hero__content svelte-1gc3qd7"><a class="no-hover svelte-1gc3qd7" href="#profile">CREATES A WORLD<br/>BY <span id="hero__trans-target-1" class="highlight svelte-1gc3qd7">SHAPING</span><br/>VARIOUS <span id="hero__trans-target-2" class="highlight svelte-1gc3qd7">LAYERS.</span></a></h1></div>',s=h(),o=d("div"),P(c.$$.fragment),x(r,"class","hero svelte-1gc3qd7"),x(o,"class","scroll-guide svelte-1gc3qd7"),x(n,"class","svelte-1gc3qd7")},m(t,e){f(t,n,e),u(n,r),u(n,s),u(n,o),H(c,o,null),a=!0},p:t,i(t){a||(M(c.$$.fragment,t),a=!0)},o(t){N(c.$$.fragment,t),a=!1},d(t){t&&p(n),Y(c)}}}function U(t){return b((()=>function(){let t=0;setInterval((()=>{t=(t+1)%2,document.querySelector("#hero__layer-shape").style.opacity=1-t,document.querySelector("#hero__shape-layer").style.opacity=t}),2500)}())),[]}class J extends W{constructor(t){super(),F(this,t,U,G,o,{})}}function K(e){let n;return{c(){n=d("section"),n.innerHTML='<div class="profile__content"><div class="profile__intro"><h3 class="profile__name subsubtitle">PARK &quot;SHAPELAYER&quot; JONGHYEON</h3> \n      <h2 class="profile__overview subtitle">개발자가 멋있었던 아이_</h2> \n      <p class="svelte-19h2xjl"><br/></p> \n      <p class="svelte-19h2xjl">입원 생활로 하루 하루를 보내던 09년 여름,<br/>옆 침대 대학생 형을 따라다니며 프로그래밍을 구경하던 아이</p> \n      <p class="svelte-19h2xjl">마인크래프트가 인생의 낙이었던 14년,<br/>마인크래프트 플러그인 개발자들을 따라하며 &quot;멋진 사람&quot;을 꿈꾼 소년</p> \n      <p class="svelte-19h2xjl">웹 프로그래밍이 고된 수험의 쉼표였던 20년,<br/>친구들에 둘러싸여 무언가를 만들었던 학생</p> \n      <p class="svelte-19h2xjl">그리고 오늘에 이르른.</p> \n      <p class="svelte-19h2xjl"><br/></p> \n      <p class="svelte-19h2xjl">안녕하세요. 학생과 개발자 사이, 박종현입니다.</p></div> \n    <div class="profile__links"><ul class="enums"><li><a href="mailto:me@jonghyeon.me" class="svelte-19h2xjl">me@jonghyeon.me</a></li> \n        <li><a href="https://www.instagram.com/__jong.hyeon__/" target="_blank" rel="noreferrer" class="svelte-19h2xjl">instagram</a></li></ul> \n      <ul class="enums"><li><a href="https://github.com/ShapeLayer" target="_blank" rel="noreferrer" class="svelte-19h2xjl">github</a></li> \n        <li><a href="https://blog.jonghyeon.me" target="_blank" rel="noreferrer" class="svelte-19h2xjl">blog</a></li> \n        <li><a href="https://www.credly.com/users/jonghyeon" target="_blank" rel="noreferrer" class="svelte-19h2xjl">credly</a></li> \n        <li><a href="https://solved.ac/profile/belline0124" target="_blank" rel="noreferrer" class="svelte-19h2xjl">solved.ac</a></li></ul></div></div>',x(n,"id","profile"),x(n,"class","profile svelte-19h2xjl")},m(t,e){f(t,n,e)},p:t,i:t,o:t,d(t){t&&p(n)}}}class Q extends W{constructor(t){super(),F(this,t,null,K,o,{})}}function X(t){let e,n;return{c(){e=d("h3"),n=g(t[1]),x(e,"class","subtitle svelte-1u4nv5d")},m(t,r){f(t,e,r),u(e,n)},p(t,e){2&e&&y(n,t[1])},d(t){t&&p(e)}}}function Z(t){let e,n,r,s,o,a=""!==t[1]&&X(t);const m=t[3].default,g=c(m,t,t[2],null);return{c(){e=d("div"),a&&a.c(),n=h(),r=d("ul"),g&&g.c(),x(e,"id",s=t[0]?t[0]:null),x(e,"class","careers__sections svelte-1u4nv5d")},m(t,s){f(t,e,s),a&&a.m(e,null),u(e,n),u(e,r),g&&g.m(r,null),o=!0},p(t,[r]){""!==t[1]?a?a.p(t,r):(a=X(t),a.c(),a.m(e,n)):a&&(a.d(1),a=null),g&&g.p&&(!o||4&r)&&$(g,m,t,t[2],o?l(m,t[2],r,null):i(t[2]),null),(!o||1&r&&s!==(s=t[0]?t[0]:null))&&x(e,"id",s)},i(t){o||(M(g,t),o=!0)},o(t){N(g,t),o=!1},d(t){t&&p(e),a&&a.d(),g&&g.d(t)}}}function tt(t,e,n){let{$$slots:r={},$$scope:s}=e,{id:o}=e,{title:c=""}=e;return t.$$set=t=>{"id"in t&&n(0,o=t.id),"title"in t&&n(1,c=t.title),"$$scope"in t&&n(2,s=t.$$scope)},[o,c,s,r]}class et extends W{constructor(t){super(),F(this,t,tt,Z,o,{id:0,title:1})}}function nt(t){let e;return{c(){e=g(t[0])},m(t,n){f(t,e,n)},p(t,n){1&n&&y(e,t[0])},d(t){t&&p(e)}}}function rt(t){let e,n;return{c(){e=d("a"),n=g(t[0]),x(e,"href",t[2]),x(e,"target","_blank"),x(e,"rel","noreferrer")},m(t,r){f(t,e,r),u(e,n)},p(t,r){1&r&&y(n,t[0]),4&r&&x(e,"href",t[2])},d(t){t&&p(e)}}}function st(t){let e;return{c(){e=d("br")},m(t,n){f(t,e,n)},d(t){t&&p(e)}}}function ot(t){let e,n,r,s,o,a,m;function _(t,e){return""!==t[2]?rt:nt}let v=_(t),w=v(t),b=""!==t[0]&&st();const E=t[4].default,S=c(E,t,t[3],null);return{c(){e=d("li"),w.c(),n=h(),r=d("span"),s=g(t[1]),o=h(),b&&b.c(),a=h(),S&&S.c(),x(r,"class","datetime svelte-hyrn7w"),x(e,"class","svelte-hyrn7w")},m(t,c){f(t,e,c),w.m(e,null),u(e,n),u(e,r),u(r,s),u(e,o),b&&b.m(e,null),u(e,a),S&&S.m(e,null),m=!0},p(t,[r]){v===(v=_(t))&&w?w.p(t,r):(w.d(1),w=v(t),w&&(w.c(),w.m(e,n))),(!m||2&r)&&y(s,t[1]),""!==t[0]?b||(b=st(),b.c(),b.m(e,a)):b&&(b.d(1),b=null),S&&S.p&&(!m||8&r)&&$(S,E,t,t[3],m?l(E,t[3],r,null):i(t[3]),null)},i(t){m||(M(S,t),m=!0)},o(t){N(S,t),m=!1},d(t){t&&p(e),w.d(),b&&b.d(),S&&S.d(t)}}}function ct(t,e,n){let{$$slots:r={},$$scope:s}=e,{name:o=""}=e,{date:c=""}=e,{url:a=""}=e;return t.$$set=t=>{"name"in t&&n(0,o=t.name),"date"in t&&n(1,c=t.date),"url"in t&&n(2,a=t.url),"$$scope"in t&&n(3,s=t.$$scope)},[o,c,a,s,r]}class at extends W{constructor(t){super(),F(this,t,ct,ot,o,{name:0,date:1,url:2})}}function lt(e){let n,s,o,c,a,l,$,i;return{c(){n=d("span"),s=g(e[1]),o=g("일 남음, \n  "),c=d("span"),a=g(e[0]),l=g("%"),x(c,"id","percentage-displayer"),x(n,"id","military-left-service-duration")},m(t,r){f(t,n,r),u(n,s),u(n,o),u(n,c),u(c,a),u(c,l),$||(i=[_(c,"mouseover",e[2]),_(c,"mouseout",e[3]),_(c,"focus",e[2]),_(c,"blur",e[3])],$=!0)},p(t,[e]){2&e&&y(s,t[1]),1&e&&y(a,t[0])},i:t,o:t,d(t){t&&p(n),$=!1,r(i)}}}const $t="2022-07-04",it="2024-01-03",ut=6e4,ft=30,pt=ut,dt=2,mt=12,gt=dt;function ht(t,e,n){let r,s,o,c=(new Date).getTime();const a=new Date($t).getTime(),l=new Date(it).getTime(),$=l-a;let i,u=pt,f=gt;const p=()=>{n(4,c=(new Date).getTime())},d=(t,e)=>{clearInterval(i),i=setInterval(t,e)},m=()=>{p()},g=()=>{f==dt?_():(n(5,f--,f),m())},h=()=>{f==mt?x():(n(5,f++,f),m())},_=()=>{u=ut,d(m,u)},x=()=>{u=ft,d(m,u)},y=()=>{u=ft,d(h,u)},v=()=>{u=ft,d(g,u)};return b((()=>{p()})),t.$$.update=()=>{16&t.$$.dirty&&n(6,r=l-c),64&t.$$.dirty&&n(1,s=Math.ceil(r/864e5)),96&t.$$.dirty&&n(0,o=Math.max(100*(1-r/$),0).toFixed(f))},[o,s,y,v,c,f,r]}class _t extends W{constructor(t){super(),F(this,t,ht,lt,o,{})}}function xt(e){let n,r;return{c(){n=d("span"),r=g(e[0]),x(n,"id","military-rank")},m(t,e){f(t,n,e),u(n,r)},p(t,[e]){1&e&&y(r,t[0])},i:t,o:t,d(t){t&&p(n)}}}const yt="2022-07-04",vt=["이병","일병","상병","병장"];function wt(t,e,n){let r;const s=new Date(yt).getTime(),o=(new Date).getTime(),c=new Date(o-s).getMonth();return b((()=>{n(0,r=c<3?vt[0]:c<9?vt[1]:c<15?vt[2]:vt[3])})),[r]}class bt extends W{constructor(t){super(),F(this,t,wt,xt,o,{})}}function Et(e){let n,r,s,o,c,a,l,$;return r=new bt({}),o=new _t({props:{starts:"2022-07-04",ends:"2024-01-03"}}),{c(){n=g("⇒ "),P(r.$$.fragment),s=g(", "),P(o.$$.fragment),c=d("br"),a=g("\n        ⇒ "),l=d("a"),l.textContent="[포스트] 커리어를 잠시 중단하며",x(l,"href","https://blog.jonghyeon.me/posts/2022-07-04-pausing-carrer/"),x(l,"target","_blank"),x(l,"rel","noreferrer")},m(t,e){f(t,n,e),H(r,t,e),f(t,s,e),H(o,t,e),f(t,c,e),f(t,a,e),f(t,l,e),$=!0},p:t,i(t){$||(M(r.$$.fragment,t),M(o.$$.fragment,t),$=!0)},o(t){N(r.$$.fragment,t),N(o.$$.fragment,t),$=!1},d(t){t&&p(n),Y(r,t),t&&p(s),Y(o,t),t&&p(c),t&&p(a),t&&p(l)}}}function St(t){let e,n;return e=new at({props:{name:"대한민국 육군 통신병 @파주",date:"2022.07-2024.01",$$slots:{default:[Et]},$$scope:{ctx:t}}}),{c(){P(e.$$.fragment)},m(t,r){H(e,t,r),n=!0},p(t,n){const r={};1&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r)},i(t){n||(M(e.$$.fragment,t),n=!0)},o(t){N(e.$$.fragment,t),n=!1},d(t){Y(e,t)}}}function At(e){let n,r,s,o;return n=new at({props:{name:"숭덕고등학교",date:"2018.03-2021.02"}}),s=new at({props:{name:"전남대학교 컴퓨터정보통신공학과 학부과정",date:"2021.03-"}}),{c(){P(n.$$.fragment),r=h(),P(s.$$.fragment)},m(t,e){H(n,t,e),f(t,r,e),H(s,t,e),o=!0},p:t,i(t){o||(M(n.$$.fragment,t),M(s.$$.fragment,t),o=!0)},o(t){N(n.$$.fragment,t),N(s.$$.fragment,t),o=!1},d(t){Y(n,t),t&&p(r),Y(s,t)}}}function jt(e){let n,r;return n=new at({props:{name:"전남대학교 지능영상미디어인터페이스 연구실",date:"2021.06-2022.07"}}),{c(){P(n.$$.fragment)},m(t,e){H(n,t,e),r=!0},p:t,i(t){r||(M(n.$$.fragment,t),r=!0)},o(t){N(n.$$.fragment,t),r=!1},d(t){Y(n,t)}}}function Ct(t){let e;return{c(){e=g("⇒ 개인 프로젝트")},m(t,n){f(t,e,n)},d(t){t&&p(e)}}}function kt(t){let e;return{c(){e=g("⇒ 연구실 연구과제 // 클라이언트 개발")},m(t,n){f(t,e,n)},d(t){t&&p(e)}}}function qt(t){let e;return{c(){e=g("⇒ 아웃소싱 // 프론트엔드 디자인 및 개발")},m(t,n){f(t,e,n)},d(t){t&&p(e)}}}function Tt(t){let e;return{c(){e=g("⇒ 아웃소싱 // 초기 프론트엔드 디자인 및 개발")},m(t,n){f(t,e,n)},d(t){t&&p(e)}}}function It(e){let n,r,s;return{c(){n=g("그 외 프로젝트들은 "),r=d("a"),r.textContent="Github",s=g("를 참조하세요."),x(r,"href","https://github.com/ShapeLayer"),x(r,"target","_blank"),x(r,"rel","noreferrer")},m(t,e){f(t,n,e),f(t,r,e),f(t,s,e)},p:t,d(t){t&&p(n),t&&p(r),t&&p(s)}}}function Rt(t){let e,n,r,s,o,c,a,l,$,i;return e=new at({props:{name:"악질 이름 생성기",date:"2020.05",url:"https://name.ho9.me",$$slots:{default:[Ct]},$$scope:{ctx:t}}}),r=new at({props:{name:"청각장애인을 위한 지능형 전시해설 문자/한국수어 변환 기술 개발",date:"2021.06-2022.07",$$slots:{default:[kt]},$$scope:{ctx:t}}}),o=new at({props:{name:"2022 호남 대학간 침해 대응 대회 2022 대회 사이트",date:"2022.06",url:"https://hccc2022.github.io",$$slots:{default:[qt]},$$scope:{ctx:t}}}),a=new at({props:{name:"IW-FCV 2023 학회 정보 사이트",date:"2022.05-2022.07",url:"https://iwfcv2023.github.io",$$slots:{default:[Tt]},$$scope:{ctx:t}}}),$=new at({props:{$$slots:{default:[It]},$$scope:{ctx:t}}}),{c(){P(e.$$.fragment),n=h(),P(r.$$.fragment),s=h(),P(o.$$.fragment),c=h(),P(a.$$.fragment),l=h(),P($.$$.fragment)},m(t,u){H(e,t,u),f(t,n,u),H(r,t,u),f(t,s,u),H(o,t,u),f(t,c,u),H(a,t,u),f(t,l,u),H($,t,u),i=!0},p(t,n){const s={};1&n&&(s.$$scope={dirty:n,ctx:t}),e.$set(s);const c={};1&n&&(c.$$scope={dirty:n,ctx:t}),r.$set(c);const l={};1&n&&(l.$$scope={dirty:n,ctx:t}),o.$set(l);const i={};1&n&&(i.$$scope={dirty:n,ctx:t}),a.$set(i);const u={};1&n&&(u.$$scope={dirty:n,ctx:t}),$.$set(u)},i(t){i||(M(e.$$.fragment,t),M(r.$$.fragment,t),M(o.$$.fragment,t),M(a.$$.fragment,t),M($.$$.fragment,t),i=!0)},o(t){N(e.$$.fragment,t),N(r.$$.fragment,t),N(o.$$.fragment,t),N(a.$$.fragment,t),N($.$$.fragment,t),i=!1},d(t){Y(e,t),t&&p(n),Y(r,t),t&&p(s),Y(o,t),t&&p(c),Y(a,t),t&&p(l),Y($,t)}}}function Lt(e){let n,r,s;return{c(){n=g("⇒ 연구과제 논문 // 공동저자"),r=d("br"),s=g("\n        ⇒ 한국스마트미디어학회 2021 춘계 학술대회. 정종호, 고영민, 박종현, 이칠우, 김대진.")},m(t,e){f(t,n,e),f(t,r,e),f(t,s,e)},p:t,d(t){t&&p(n),t&&p(r),t&&p(s)}}}function Ot(e){let n,r,s;return{c(){n=g("⇒ 연구과제 논문 // 공동저자"),r=d("br"),s=g("\n        ⇒ 한국스마트미디어학회 2022 종합학술대회. 정종호, 박종현, 나광일, 성홍념, 황희재, 이칠우")},m(t,e){f(t,n,e),f(t,r,e),f(t,s,e)},p:t,d(t){t&&p(n),t&&p(r),t&&p(s)}}}function Dt(t){let e,n,r,s,o,c,a,l;return e=new at({props:{name:"전남대학교 창업아이템경진대회 입선",date:"2021.12"}}),r=new at({props:{name:"The 2021 ICPC Asia Seoul Regional Contest 53th",date:"2021.11.13"}}),o=new at({props:{name:"자연스러운 수어 애니메이션을 위한 FBX 파일 결합 알고리즘",date:"2021.11",$$slots:{default:[Lt]},$$scope:{ctx:t}}}),a=new at({props:{name:"자연스러운 애니메이션을 위한 수어 애니메이션 생성 알고리즘 고도화",date:"2022.06",$$slots:{default:[Ot]},$$scope:{ctx:t}}}),{c(){P(e.$$.fragment),n=h(),P(r.$$.fragment),s=h(),P(o.$$.fragment),c=h(),P(a.$$.fragment)},m(t,$){H(e,t,$),f(t,n,$),H(r,t,$),f(t,s,$),H(o,t,$),f(t,c,$),H(a,t,$),l=!0},p(t,e){const n={};1&e&&(n.$$scope={dirty:e,ctx:t}),o.$set(n);const r={};1&e&&(r.$$scope={dirty:e,ctx:t}),a.$set(r)},i(t){l||(M(e.$$.fragment,t),M(r.$$.fragment,t),M(o.$$.fragment,t),M(a.$$.fragment,t),l=!0)},o(t){N(e.$$.fragment,t),N(r.$$.fragment,t),N(o.$$.fragment,t),N(a.$$.fragment,t),l=!1},d(t){Y(e,t),t&&p(n),Y(r,t),t&&p(s),Y(o,t),t&&p(c),Y(a,t)}}}function Mt(t){let e;return{c(){e=g("⇒ 체험 축전 // 기획, 운영 및 개발")},m(t,n){f(t,e,n)},d(t){t&&p(e)}}}function Nt(t){let e;return{c(){e=g("⇒ 동아리 개설 참여 // 동아리 운영 집행 및 프로젝트 리딩")},m(t,n){f(t,e,n)},d(t){t&&p(e)}}}function Pt(t){let e,n,r,s,o,c;return e=new at({props:{name:'2019 광주SW체험축전 "한글코드로 만드는 디스코드 챗봇" 체험 부스 운영',date:"2019.05",$$slots:{default:[Mt]},$$scope:{ctx:t}}}),r=new at({props:{name:"전남대학교 게임개발동아리 PIMM",date:"2021.03-2022.06"}}),o=new at({props:{name:"전남대학교 소프트웨어 개발동아리 Stolio",date:"2022.03-2022.06",$$slots:{default:[Nt]},$$scope:{ctx:t}}}),{c(){P(e.$$.fragment),n=h(),P(r.$$.fragment),s=h(),P(o.$$.fragment)},m(t,a){H(e,t,a),f(t,n,a),H(r,t,a),f(t,s,a),H(o,t,a),c=!0},p(t,n){const r={};1&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r);const s={};1&n&&(s.$$scope={dirty:n,ctx:t}),o.$set(s)},i(t){c||(M(e.$$.fragment,t),M(r.$$.fragment,t),M(o.$$.fragment,t),c=!0)},o(t){N(e.$$.fragment,t),N(r.$$.fragment,t),N(o.$$.fragment,t),c=!1},d(t){Y(e,t),t&&p(n),Y(r,t),t&&p(s),Y(o,t)}}}function Ht(e){let n,r,s;return{c(){n=g("⇒ Cloud Practitioner"),r=d("br"),s=g("\n        ⇒ Developer - Associate")},m(t,e){f(t,n,e),f(t,r,e),f(t,s,e)},p:t,d(t){t&&p(n),t&&p(r),t&&p(s)}}}function Yt(t){let e,n,r,s,o,c,a,l;return e=new at({props:{name:"TOEIC 805",date:"2021.08.08"}}),r=new at({props:{name:"AWS Certification",url:"https://www.credly.com/users/jonghyeon/badges",$$slots:{default:[Ht]},$$scope:{ctx:t}}}),o=new at({props:{name:"SQL 개발자"}}),a=new at({props:{name:"YBM Coding Specialist Professional I"}}),{c(){P(e.$$.fragment),n=h(),P(r.$$.fragment),s=h(),P(o.$$.fragment),c=h(),P(a.$$.fragment)},m(t,$){H(e,t,$),f(t,n,$),H(r,t,$),f(t,s,$),H(o,t,$),f(t,c,$),H(a,t,$),l=!0},p(t,e){const n={};1&e&&(n.$$scope={dirty:e,ctx:t}),r.$set(n)},i(t){l||(M(e.$$.fragment,t),M(r.$$.fragment,t),M(o.$$.fragment,t),M(a.$$.fragment,t),l=!0)},o(t){N(e.$$.fragment,t),N(r.$$.fragment,t),N(o.$$.fragment,t),N(a.$$.fragment,t),l=!1},d(t){Y(e,t),t&&p(n),Y(r,t),t&&p(s),Y(o,t),t&&p(c),Y(a,t)}}}function Bt(t){let e,n,r,s,o,c,a,l,$,i,m,g,_,y,v,w,b,E,S,A;return a=new et({props:{id:"careers__military",$$slots:{default:[St]},$$scope:{ctx:t}}}),$=new et({props:{id:"careers__education",title:"EDUCATION",$$slots:{default:[At]},$$scope:{ctx:t}}}),m=new et({props:{id:"careers__education",title:"WORK",$$slots:{default:[jt]},$$scope:{ctx:t}}}),_=new et({props:{id:"careers__projects",title:"PROJECTS",$$slots:{default:[Rt]},$$scope:{ctx:t}}}),v=new et({props:{id:"careers__achievements",title:"ACHIEVEMENTS",$$slots:{default:[Dt]},$$scope:{ctx:t}}}),b=new et({props:{id:"careers__activities",title:"ACTIVITIES",$$slots:{default:[Pt]},$$scope:{ctx:t}}}),S=new et({props:{id:"careers__certificates",title:"CERTIFICATES",$$slots:{default:[Yt]},$$scope:{ctx:t}}}),{c(){e=d("section"),n=d("div"),r=d("h3"),r.textContent="CAREERS",s=h(),o=d("h2"),o.textContent="그동안의 발자취_",c=h(),P(a.$$.fragment),l=h(),P($.$$.fragment),i=h(),P(m.$$.fragment),g=h(),P(_.$$.fragment),y=h(),P(v.$$.fragment),w=h(),P(b.$$.fragment),E=h(),P(S.$$.fragment),x(r,"class","subsubtitle"),x(o,"class","subtitle"),x(n,"class","careers__content svelte-1hsl7ax"),x(e,"class","careers svelte-1hsl7ax")},m(t,p){f(t,e,p),u(e,n),u(n,r),u(n,s),u(n,o),u(n,c),H(a,n,null),u(n,l),H($,n,null),u(n,i),H(m,n,null),u(n,g),H(_,n,null),u(n,y),H(v,n,null),u(n,w),H(b,n,null),u(n,E),H(S,n,null),A=!0},p(t,[e]){const n={};1&e&&(n.$$scope={dirty:e,ctx:t}),a.$set(n);const r={};1&e&&(r.$$scope={dirty:e,ctx:t}),$.$set(r);const s={};1&e&&(s.$$scope={dirty:e,ctx:t}),m.$set(s);const o={};1&e&&(o.$$scope={dirty:e,ctx:t}),_.$set(o);const c={};1&e&&(c.$$scope={dirty:e,ctx:t}),v.$set(c);const l={};1&e&&(l.$$scope={dirty:e,ctx:t}),b.$set(l);const i={};1&e&&(i.$$scope={dirty:e,ctx:t}),S.$set(i)},i(t){A||(M(a.$$.fragment,t),M($.$$.fragment,t),M(m.$$.fragment,t),M(_.$$.fragment,t),M(v.$$.fragment,t),M(b.$$.fragment,t),M(S.$$.fragment,t),A=!0)},o(t){N(a.$$.fragment,t),N($.$$.fragment,t),N(m.$$.fragment,t),N(_.$$.fragment,t),N(v.$$.fragment,t),N(b.$$.fragment,t),N(S.$$.fragment,t),A=!1},d(t){t&&p(e),Y(a),Y($),Y(m),Y(_),Y(v),Y(b),Y(S)}}}class Ft extends W{constructor(t){super(),F(this,t,null,Bt,o,{})}}function Wt(e){let n;return{c(){n=d("footer"),n.innerHTML='<div class="footer__content"><p class="badges"><a class="no-hover" href="http://unicode.org/consortium/adopted-characters.html#b1F30C" target="_blank" rel="noreferrer"><img id="unicode-sponser" src="https://www.unicode.org/consortium/aacimg/badges/bronze-1F30C.png" alt="Unicode Consortium Official Bronze Sponser" class="svelte-1qhkztf"/></a></p> \n    <p class="copy">© Park Jonghyeon / ShapeLayer.</p> \n    <p><a href="https://github.com/ShapeLayer/jonghyeon.me" target="_blank" rel="noreferrer">ShapeLayer/jonghyeon.me</a></p></div>',x(n,"class","svelte-1qhkztf")},m(t,e){f(t,n,e)},p:t,i:t,o:t,d(t){t&&p(n)}}}class Vt extends W{constructor(t){super(),F(this,t,null,Wt,o,{})}}function zt(e){let n,r,s,o,c,a,l,$,i,m,g,_,y;return r=new J({}),o=new Q({}),$=new Ft({}),_=new Vt({}),{c(){n=d("main"),P(r.$$.fragment),s=h(),P(o.$$.fragment),c=h(),a=d("hr"),l=h(),P($.$$.fragment),i=h(),m=d("hr"),g=h(),P(_.$$.fragment),x(a,"class","section-divider"),x(m,"class","section-divider")},m(t,e){f(t,n,e),H(r,n,null),u(n,s),H(o,n,null),u(n,c),u(n,a),u(n,l),H($,n,null),u(n,i),u(n,m),u(n,g),H(_,n,null),y=!0},p:t,i(t){y||(M(r.$$.fragment,t),M(o.$$.fragment,t),M($.$$.fragment,t),M(_.$$.fragment,t),y=!0)},o(t){N(r.$$.fragment,t),N(o.$$.fragment,t),N($.$$.fragment,t),N(_.$$.fragment,t),y=!1},d(t){t&&p(n),Y(r),Y(o),Y($),Y(_)}}}return new class extends W{constructor(t){super(),F(this,t,null,zt,o,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
