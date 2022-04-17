<script lang="ts">
  import SectionHeader from '../../components/profile/SectionHeader.svelte';
  import SectionBody from '../../components/profile/SectionBody.svelte';
</script>

<div class="desc-root">
  <SectionHeader>Hi there</SectionHeader>
  <SectionBody>
    <div>
      안녕하세요. 박종현입니다.<br>
      누구에게나 자랑스럽게 내세울 수 있는 멋진 프로젝트를 만들기 위해 부단히 노력하고 있습니다.
    </div>
    <div>
      <a href="https://github.com/ShapeLayer" target="_blank">Github</a> | <a href="https://instagram.com/__jong.hyeon__" target="_blank">Instagram</a>
    </div>
  </SectionBody>
  <SectionHeader>Overview</SectionHeader>
  <SectionBody>
    <ul>
      <li>숭덕고등학교 졸업 <i>18.03 - 21.02</i></li>
      <li>전남대학교 컴퓨터정보통신공학과 재학 <i>21.03 -</i></li>
      <li>전남대학교 지능영상미디어인터페이스연구실 <i>21.06 -</i></li>
    </ul>
  </SectionBody>
  <SectionHeader>Projects & Contributions</SectionHeader>
  <SectionBody>
    <ul>
      <li><b>openNAMU</b> <i>18.xx</i></li>
      <li><b>숭덕고 갤러리</b> <i>18.08 - 19.02</i></li>
      <li><b>hangulcord</b> 광주SW체험축전 체험부스 운영 <i>19.04 - 19.05</i></li>
      <li><b>악질 이름 생성기</b> <i>20.05 - 21.05</i></li>
      <li><b>Advanced Sticky Note</b> <i>21.03 - 21.06</i></li>
      <div class="li-lineheight-divs" />
      <li>이것들 외에 크고 작은 토이 프로젝트를 일구어나가고 있습니다. 제 깃허브에서 한번 확인해보세요.</li>
    </ul>
  </SectionBody>
  <SectionHeader>Footprints</SectionHeader>
  <SectionBody>
    <ul>
      <li><i>박종현</i> <i>02.01 -</i></li>
      <li>숭덕고등학교 <i>18.03 - 21.02</i></li>
      <li>전남대학교 컴퓨터정보통신공학과 학부과정 <i>21.03 - </i></li>
      <li>전남대학교 게임 개발 동아리 PIMM <i>21.03 -</i></li>
      <li>전남대학교 지능영상미디어/인터페이스연구실 연구생 <i>21.07 -</i></li>
      <li>전남대학교 AI융합대학 소프트웨어 개발 동아리 Stolio <i>22.03 - </i></li>
    </ul>
    : Activities & Trainings
    <ul>
      <li>2019 광주SW체험축전 "한글코드로 만드는 디스코드 챗봇" 체험 부스 운영 <i>19.05</i></li>
      <li>고등학교 학교간협력교육과정 게임 프로그래밍 과정 수료 <i>20.04 - 20.07</i></li>
      <li>콘텐츠아카데미 정규과정(게임제작) 수료 <i>21.07 - 21.08</i></li>
      <li>ACM ICPC Korea Regional Ranked <i>21.10 - 21.11</i></li>
      <li>전남대학교 창업아이템경진대회 입선 <i>21.11 - 21.12</i></li>
      <li>"청각장애인을 위한 지능형 전시해설 문자/한국수어 변환 기술개발" 연구과제 참여 <i>21.10 - </i></li>
    </ul>
    : Certificates & Language Tests
    <ul>
      <li>TOEIC 815 <i>21.08.08</i></li>
      <li>AWS Certified Cloud Practitioner <i>22.01.25</i></li>
      <li>SQL 개발자 <i>21.10.01</i></li>
      <li>Coding Specialist Professional I(1급) <i>21.07.18</i></li>
    <ul>
  </SectionBody>
</div>

<style lang="scss">
  div.desc-root {
    margin: 30px auto;
    width: 100%;
    max-width: 720px;
  }
  div.li-lineheight-divs {
    margin: 0;
    margin-top: 1em;
  }
  ul {
    list-style-position: outside;
    list-style-type: "::  ";
  }
  i {
    color: #9f9c94;
  }
</style>