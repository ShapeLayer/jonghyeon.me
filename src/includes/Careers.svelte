<script lang="ts">
	import MilDDay from '../components/commons/MilDDay.svelte'
</script>

<section class="careers">
  <div class="careers__content">
    <h3 class="subsubtitle">CAREERS</h3>
    <h2 class="subtitle">그동안의 발자취_</h2>
    <div id="careers__military" class="careers__sections">
      <ul>
        <li>
          대한민국 육군 기술행정병 네트워크운용/정비 분과 <span class="datetime">2022.07-2024.01</span><br>
          ⇒ <a href="https://pause.jonghyeon.me" target="_blank">9사단 28여단 1대대 통신소대 (경기도 파주시 소재)</a> <MilDDay /><br>
        </li>
      </ul>
    </div>
    <div id="careers__education" class="careers__sections">
      <h3 class="subtitle">EDUCATION</h3>
      <ul>
        <li>숭덕고등학교 <span class="datetime">2018.03-2021.02</span></li>
        <li>전남대학교 컴퓨터정보통신공학과 학부과정 21학번 <span class="datetime">2021.03-</span></li>
      </ul>
    </div>
    <div id="careers__education" class="careers__sections">
      <h3 class="subtitle">WORK</h3>
      <ul>
        <li>전남대학교 지능영상미디어인터페이스 연구실 <span class="datetime">2021.06-2022.07</span></li>
      </ul>
    </div>
    <div id="careers__procects" class="careers__sections">
      <h3 class="subtitle">PROJECTS</h3>
      <ul>
        <li>
          <a href="https://name.ho9.me" target="_blank">악질 이름 생성기</a> <span class="datetime">2020.05</span><br>
          ⇒ 개인 프로젝트
        </li>
        <li>
          청각장애인을 위한 지능형 전시해설 문자/한국수어 변환 기술 개발 <span class="datetime">2021.06-2022.07</span><br>
          ⇒ 연구실 연구과제 // 클라이언트 개발
        </li>
        <li>
          <a href="https://hccc2022.github.io" target="_blank">2022 호남 대학간 침해 대응 대회 2022 대회 사이트</a> <span class="datetime">2022.06</span><br>
          ⇒ 아웃소싱 // 프론트엔드 디자인 및 개발
        </li>
        <li>
          <a href="https://iwfcv2023.github.io">IW-FCV 2023 학회 정보 사이트</a> <span class="datetime">2022.05-2022.07</span><br>
          ⇒ 아웃소싱 // 프론트엔드 디자인 및 개발
        </li>
        <li>그 외 프로젝트들은 <a href="https://github.com/ShapeLayer" target="_blank">Github</a>를 참조하세요.</li>
      </ul>
    </div>
    <div id="careers__achievements" class="careers__sections">
      <h3 class="subtitle">ACHIEVEMENTS</h3>
      <ul>
        <li>전남대학교 창업아이템경진대회 입선 <span class="datetime">2021.12</span></li>
        <li>The 2021 ICPC Asia Seoul Regional Contest 53<sup>th</sup> <span class="datetime">2021.11.13</span></li>
        <li>
          자연스러운 수어 애니메이션을 위한 FBX 파일 결합 알고리즘 <span class="datetime">2021.11</span><br>
          ⇒ 연구과제 논문 // 공동저자<br>
          ⇒ 한국스마트미디어학회 2021 춘계 학술대회. 정종호, 고영민, 박종현, 이칠우, 김대진.
        </li>
        <li>
          자연스러운 애니메이션을 위한 수어 애니메이션 생성 알고리즘 고도화 <span class="datetime">2022.06</span><br>
          ⇒ 연구과제 논문 // 공동저자<br>
          ⇒ 한국스마트미디어학회 2022 종합학술대회. 정종호, 박종현, 나광일, 성홍념, 황희재, 이칠우
        </li>
      </ul>
    </div>
    <div id="careers__activities" class="careers__sections">
      <h3 class="subtitle">ACTIVITIES</h3>
      <ul>
        <li>
          2019 광주SW체험축전 "한글코드로 만드는 디스코드 챗봇" 체험 부스 운영 <span class="datetime">2019.05</span><br>
          ⇒ 체험 축전 // 기획, 운영 및 개발
        </li>
        <li>전남대학교 게임개발동아리 PIMM <span class="datetime">2021.03-</span></li>
        <li>전남대학교 소프트웨어 개발동아리 Stolio <span class="datetime">2022.03-</span></li>
      </ul>
    </div>
    <div id="careers__certificates" class="careers__sections">
      <h3 class="subtitle">CERTIFICATES</h3>
      <ul>
        <li>TOEIC 805 <span class="datetime">2021.08.08</span></li>
        <li>AWS Certified Cloud Practitioner</li>
        <li>SQL 개발자</li>
        <li>YBM Coding Specialist Professional I</li>
      </ul>
    </div>
  </div>
</section>

<style lang="scss">
section.careers {
  div.careers__content {
    div {
      margin: 0 1em;

      &.careers__sections {
        margin-bottom: 2em;
        h3.subtitle {
          margin-bottom: .5em;
        }
        ul li {
          margin-bottom: .5em;

          span.datetime {
            margin-left: .2em;
            font-size: .8em;
            color: var(--base-fg-color-brighter);
            font-style: italic;
          }
        }
      }
    }
  }
}
</style>
