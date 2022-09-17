var app=function(){"use strict";function e(){}function t(e){return e()}function s(){return Object.create(null)}function n(e){e.forEach(t)}function l(e){return"function"==typeof e}function a(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function o(e,t){e.appendChild(t)}function r(e,t,s){e.insertBefore(t,s||null)}function i(e){e.parentNode.removeChild(e)}function c(e){return document.createElement(e)}function d(e){return document.createTextNode(e)}function u(){return d(" ")}function h(e,t,s){null==s?e.removeAttribute(t):e.getAttribute(t)!==s&&e.setAttribute(t,s)}let p;function f(e){p=e}function v(e){(function(){if(!p)throw new Error("Function called outside component initialization");return p})().$$.on_mount.push(e)}const _=[],m=[],g=[],x=[],b=Promise.resolve();let $=!1;function z(e){g.push(e)}const y=new Set;let j=0;function S(){const e=p;do{for(;j<_.length;){const e=_[j];j++,f(e),E(e.$$)}for(f(null),_.length=0,j=0;m.length;)m.pop()();for(let e=0;e<g.length;e+=1){const t=g[e];y.has(t)||(y.add(t),t())}g.length=0}while(_.length);for(;x.length;)x.pop()();$=!1,y.clear(),f(e)}function E(e){if(null!==e.fragment){e.update(),n(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(z)}}const A=new Set;function w(e,t){e&&e.i&&(A.delete(e),e.i(t))}function C(e,t,s,n){if(e&&e.o){if(A.has(e))return;A.add(e),undefined.c.push((()=>{A.delete(e),n&&(s&&e.d(1),n())})),e.o(t)}}function q(e){e&&e.c()}function T(e,s,a,o){const{fragment:r,on_mount:i,on_destroy:c,after_update:d}=e.$$;r&&r.m(s,a),o||z((()=>{const s=i.map(t).filter(l);c?c.push(...s):n(s),e.$$.on_mount=[]})),d.forEach(z)}function k(e,t){const s=e.$$;null!==s.fragment&&(n(s.on_destroy),s.fragment&&s.fragment.d(t),s.on_destroy=s.fragment=null,s.ctx=[])}function L(e,t){-1===e.$$.dirty[0]&&(_.push(e),$||($=!0,b.then(S)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function I(t,l,a,o,r,c,d,u=[-1]){const h=p;f(t);const v=t.$$={fragment:null,ctx:null,props:c,update:e,not_equal:r,bound:s(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(l.context||(h?h.$$.context:[])),callbacks:s(),dirty:u,skip_bound:!1,root:l.target||h.$$.root};d&&d(v.root);let _=!1;if(v.ctx=a?a(t,l.props||{},((e,s,...n)=>{const l=n.length?n[0]:s;return v.ctx&&r(v.ctx[e],v.ctx[e]=l)&&(!v.skip_bound&&v.bound[e]&&v.bound[e](l),_&&L(t,e)),s})):[],v.update(),_=!0,n(v.before_update),v.fragment=!!o&&o(v.ctx),l.target){if(l.hydrate){const e=function(e){return Array.from(e.childNodes)}(l.target);v.fragment&&v.fragment.l(e),e.forEach(i)}else v.fragment&&v.fragment.c();l.intro&&w(t.$$.fragment),T(t,l.target,l.anchor,l.customElement),S()}f(h)}class R{$destroy(){k(this,1),this.$destroy=e}$on(e,t){const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(t),()=>{const e=s.indexOf(t);-1!==e&&s.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function M(t){let s;return{c(){s=c("header"),s.innerHTML='<div class="hero svelte-7fp1qj"><div class="hero__wrapper svelte-7fp1qj"><h1 class="hero__content pseudo svelte-7fp1qj">CREATES A WORLD<br/>\n        BY <span id="hero__trans-target-1" class="highlight svelte-7fp1qj">LAYERING</span><br/>\n        VARIOUS <span id="hero__trans-target-2" class="highlight svelte-7fp1qj">SHAPES.</span></h1> \n      <h1 id="hero__layer-shape" class="hero__content svelte-7fp1qj"><a class="no-hover svelte-7fp1qj" href="#profile">CREATES A WORLD<br/>BY <span id="hero__trans-target-1" class="highlight svelte-7fp1qj">LAYERING</span><br/>VARIOUS <span id="hero__trans-target-2" class="highlight svelte-7fp1qj">SHAPES.</span></a></h1> \n      <h1 id="hero__shape-layer" class="hero__content svelte-7fp1qj"><a class="no-hover svelte-7fp1qj" href="#profile">CREATES A WORLD<br/>BY <span id="hero__trans-target-1" class="highlight svelte-7fp1qj">SHAPING</span><br/>VARIOUS <span id="hero__trans-target-2" class="highlight svelte-7fp1qj">LAYERS.</span></a></h1></div></div>',h(s,"class","svelte-7fp1qj")},m(e,t){r(e,s,t)},p:e,i:e,o:e,d(e){e&&i(s)}}}function O(e){return v((()=>function(){let e=0;setInterval((()=>{e=(e+1)%2,document.querySelector("#hero__layer-shape").style.opacity=1-e,document.querySelector("#hero__shape-layer").style.opacity=e}),2500)}())),[]}class H extends R{constructor(e){super(),I(this,e,O,M,a,{})}}function P(t){let s;return{c(){s=c("section"),s.innerHTML='<div class="profile__content"><div class="profile__intro"><h3 class="profile__name subsubtitle">PARK &quot;SHAPELAYER&quot; JONGHYEON</h3> \n      <h2 class="profile__overview subtitle">개발자가 멋있었던 아이_</h2> \n      <p class="svelte-19h2xjl"><br/></p> \n      <p class="svelte-19h2xjl">입원 생활로 하루 하루를 보내던 09년 여름,<br/>옆 침대 대학생 형을 따라다니며 프로그래밍을 구경하던 아이</p> \n      <p class="svelte-19h2xjl">마인크래프트가 인생의 낙이었던 14년,<br/>마인크래프트 플러그인 개발자들을 따라하며 &quot;멋진 사람&quot;을 꿈꾼 소년</p> \n      <p class="svelte-19h2xjl">웹 프로그래밍이 고된 수험의 쉼표였던 20년,<br/>친구들에 둘러싸여 무언가를 만들었던 학생</p> \n      <p class="svelte-19h2xjl">그리고 오늘에 이르른.</p> \n      <p class="svelte-19h2xjl"><br/></p> \n      <p class="svelte-19h2xjl">안녕하세요. 학생과 개발자 사이, 박종현입니다.</p></div> \n    <div class="profile__links"><ul class="enums"><li><a href="mailto:belline0124@gmail.com" class="svelte-19h2xjl">belline0124@gmail.com</a></li> \n        <li><a href="https://www.instagram.com/__jong.hyeon__/" target="_blank" class="svelte-19h2xjl">instagram</a></li></ul> \n      <ul class="enums"><li><a href="https://github.com/ShapeLayer" target="_blank" class="svelte-19h2xjl">github</a></li> \n        <li><a href="https://velog.io/@shapelayer" target="_blank" class="svelte-19h2xjl">velog</a></li> \n        <li><a href="https://www.credly.com/users/jonghyeon" target="_blank" class="svelte-19h2xjl">credly</a></li> \n        <li><a href="https://solved.ac/profile/belline0124" target="_blank" class="svelte-19h2xjl">solved.ac</a></li></ul></div></div>',h(s,"id","profile"),h(s,"class","profile svelte-19h2xjl")},m(e,t){r(e,s,t)},p:e,i:e,o:e,d(e){e&&i(s)}}}class N extends R{constructor(e){super(),I(this,e,null,P,a,{})}}function Y(t){let s;return{c(){s=c("span"),s.textContent="nn%, 전역까지 dd일",h(s,"id","military-dday")},m(e,t){r(e,s,t)},p:e,i:e,o:e,d(e){e&&i(s)}}}const B=new Date("2022-07-04"),D=new Date("2024-01-03");function F(e){let t=new Date,s=D-B,n=D-t,l=Math.floor(n/864e5);return`${Math.max(100*(1-n/s),0).toFixed(2)}%, 전역까지 ${l}일`}function W(e){return v((()=>function(){const e=document.getElementById("military-dday");e.innerText=F(),setInterval((()=>{e.innerText=F()}),1e4)}())),[]}class V extends R{constructor(e){super(),I(this,e,W,Y,a,{})}}function G(t){let s,n,l,a,p,f,v,_,m,g,x,b,$,z,y,j,S,E,A,L,I,R,M,O,H,P,N,Y;return z=new V({}),{c(){s=c("section"),n=c("div"),l=c("h3"),l.textContent="CAREERS",a=u(),p=c("h2"),p.textContent="그동안의 발자취_",f=u(),v=c("div"),_=c("ul"),m=c("li"),g=d("대한민국 육군 기술행정병 네트워크운용/정비 분과 "),x=c("span"),x.textContent="2022.07-2024.01",b=c("br"),$=d("\n          ⇒ 경기도 파주시 소재지 근무 "),q(z.$$.fragment),y=c("br"),j=u(),S=c("div"),S.innerHTML='<h3 class="subtitle svelte-13zdxo0">EDUCATION</h3> \n      <ul><li class="svelte-13zdxo0">숭덕고등학교 <span class="datetime svelte-13zdxo0">2018.03-2021.02</span></li> \n        <li class="svelte-13zdxo0">전남대학교 컴퓨터정보통신공학과 학부과정 21학번 <span class="datetime svelte-13zdxo0">2021.03-</span></li></ul>',E=u(),A=c("div"),A.innerHTML='<h3 class="subtitle svelte-13zdxo0">WORK</h3> \n      <ul><li class="svelte-13zdxo0">전남대학교 지능영상미디어인터페이스 연구실 <span class="datetime svelte-13zdxo0">2021.06-2022.07</span></li></ul>',L=u(),I=c("div"),I.innerHTML='<h3 class="subtitle svelte-13zdxo0">PROJECTS</h3> \n      <ul><li class="svelte-13zdxo0"><a href="https://name.ho9.me" target="_blank">악질 이름 생성기</a>  <span class="datetime svelte-13zdxo0">2020.05</span><br/>\n          ⇒ 개인 프로젝트</li> \n        <li class="svelte-13zdxo0">청각장애인을 위한 지능형 전시해설 문자/한국수어 변환 기술 개발 <span class="datetime svelte-13zdxo0">2021.06-2022.07</span><br/>\n          ⇒ 연구실 연구과제 // 클라이언트 개발</li> \n        <li class="svelte-13zdxo0"><a href="https://hccc2022.github.io" target="_blank">2022 호남 대학간 침해 대응 대회 2022 대회 사이트</a>  <span class="datetime svelte-13zdxo0">2022.06</span><br/>\n          ⇒ 아웃소싱 // 프론트엔드 디자인 및 개발</li> \n        <li class="svelte-13zdxo0"><a href="https://iwfcv2023.github.io">IW-FCV 2023 학회 정보 사이트</a>  <span class="datetime svelte-13zdxo0">2022.05-2022.07</span><br/>\n          ⇒ 아웃소싱 // 프론트엔드 디자인 및 개발</li> \n        <li class="svelte-13zdxo0">그 외 프로젝트들은 <a href="https://github.com/ShapeLayer" target="_blank">Github</a>를 참조하세요.</li></ul>',R=u(),M=c("div"),M.innerHTML='<h3 class="subtitle svelte-13zdxo0">ACHIEVEMENTS</h3> \n      <ul><li class="svelte-13zdxo0">전남대학교 창업아이템경진대회 입선 <span class="datetime svelte-13zdxo0">2021.12</span></li> \n        <li class="svelte-13zdxo0">The 2021 ICPC Asia Seoul Regional Contest 53<sup>th</sup>  <span class="datetime svelte-13zdxo0">2021.11.13</span></li> \n        <li class="svelte-13zdxo0">자연스러운 수어 애니메이션을 위한 FBX 파일 결합 알고리즘 <span class="datetime svelte-13zdxo0">2021.11</span><br/>\n          ⇒ 연구과제 논문 // 공동저자<br/>\n          ⇒ 한국스마트미디어학회 2021 춘계 학술대회. 정종호, 고영민, 박종현, 이칠우, 김대진.</li> \n        <li class="svelte-13zdxo0">자연스러운 애니메이션을 위한 수어 애니메이션 생성 알고리즘 고도화 <span class="datetime svelte-13zdxo0">2022.06</span><br/>\n          ⇒ 연구과제 논문 // 공동저자<br/>\n          ⇒ 한국스마트미디어학회 2022 종합학술대회. 정종호, 박종현, 나광일, 성홍념, 황희재, 이칠우</li></ul>',O=u(),H=c("div"),H.innerHTML='<h3 class="subtitle svelte-13zdxo0">ACTIVITIES</h3> \n      <ul><li class="svelte-13zdxo0">2019 광주SW체험축전 &quot;한글코드로 만드는 디스코드 챗봇&quot; 체험 부스 운영 <span class="datetime svelte-13zdxo0">2019.05</span><br/>\n          ⇒ 체험 축전 // 기획, 운영 및 개발</li> \n        <li class="svelte-13zdxo0">전남대학교 게임개발동아리 PIMM <span class="datetime svelte-13zdxo0">2021.03-</span></li> \n        <li class="svelte-13zdxo0">전남대학교 소프트웨어 개발동아리 Stolio <span class="datetime svelte-13zdxo0">2022.03-</span></li></ul>',P=u(),N=c("div"),N.innerHTML='<h3 class="subtitle svelte-13zdxo0">CERTIFICATES</h3> \n      <ul><li class="svelte-13zdxo0">TOEIC 805 <span class="datetime svelte-13zdxo0">2021.08.08</span></li> \n        <li class="svelte-13zdxo0">AWS Certified Cloud Practitioner</li> \n        <li class="svelte-13zdxo0">SQL 개발자</li> \n        <li class="svelte-13zdxo0">YBM Coding Specialist Professional I</li></ul>',h(l,"class","subsubtitle"),h(p,"class","subtitle"),h(x,"class","datetime svelte-13zdxo0"),h(m,"class","svelte-13zdxo0"),h(v,"id","careers__military"),h(v,"class","careers__sections svelte-13zdxo0"),h(S,"id","careers__education"),h(S,"class","careers__sections svelte-13zdxo0"),h(A,"id","careers__education"),h(A,"class","careers__sections svelte-13zdxo0"),h(I,"id","careers__procects"),h(I,"class","careers__sections svelte-13zdxo0"),h(M,"id","careers__achievements"),h(M,"class","careers__sections svelte-13zdxo0"),h(H,"id","careers__activities"),h(H,"class","careers__sections svelte-13zdxo0"),h(N,"id","careers__certificates"),h(N,"class","careers__sections svelte-13zdxo0"),h(n,"class","careers__content svelte-13zdxo0"),h(s,"class","careers svelte-13zdxo0")},m(e,t){r(e,s,t),o(s,n),o(n,l),o(n,a),o(n,p),o(n,f),o(n,v),o(v,_),o(_,m),o(m,g),o(m,x),o(m,b),o(m,$),T(z,m,null),o(m,y),o(n,j),o(n,S),o(n,E),o(n,A),o(n,L),o(n,I),o(n,R),o(n,M),o(n,O),o(n,H),o(n,P),o(n,N),Y=!0},p:e,i(e){Y||(w(z.$$.fragment,e),Y=!0)},o(e){C(z.$$.fragment,e),Y=!1},d(e){e&&i(s),k(z)}}}class U extends R{constructor(e){super(),I(this,e,null,G,a,{})}}function J(t){let s;return{c(){s=c("footer"),s.innerHTML='<div class="footer__content"><p class="badges"><a class="no-hover" href="http://unicode.org/consortium/adopted-characters.html#b1F30C" target="_blank"><img id="unicode-sponser" src="https://www.unicode.org/consortium/aacimg/badges/bronze-1F30C.png" alt="Unicode Consortium Official Bronze Sponser" class="svelte-1qhkztf"/></a></p> \n    <p class="copy">© Park Jonghyeon / ShapeLayer.</p> \n    <p><a href="https://github.com/ShapeLayer/jonghyeon.me" target="_blank">ShapeLayer/jonghyeon.me</a></p></div>',h(s,"class","svelte-1qhkztf")},m(e,t){r(e,s,t)},p:e,i:e,o:e,d(e){e&&i(s)}}}class K extends R{constructor(e){super(),I(this,e,null,J,a,{})}}function Q(t){let s,n,l,a,d,p,f,v,_,m,g,x,b;return n=new H({}),a=new N({}),v=new U({}),x=new K({}),{c(){s=c("main"),q(n.$$.fragment),l=u(),q(a.$$.fragment),d=u(),p=c("hr"),f=u(),q(v.$$.fragment),_=u(),m=c("hr"),g=u(),q(x.$$.fragment),h(p,"class","section-divider"),h(m,"class","section-divider")},m(e,t){r(e,s,t),T(n,s,null),o(s,l),T(a,s,null),o(s,d),o(s,p),o(s,f),T(v,s,null),o(s,_),o(s,m),o(s,g),T(x,s,null),b=!0},p:e,i(e){b||(w(n.$$.fragment,e),w(a.$$.fragment,e),w(v.$$.fragment,e),w(x.$$.fragment,e),b=!0)},o(e){C(n.$$.fragment,e),C(a.$$.fragment,e),C(v.$$.fragment,e),C(x.$$.fragment,e),b=!1},d(e){e&&i(s),k(n),k(a),k(v),k(x)}}}return new class extends R{constructor(e){super(),I(this,e,null,Q,a,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
