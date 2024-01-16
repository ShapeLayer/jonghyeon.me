<script lang="ts">
  import MilDaliy from '../components/Military/Daliy.svelte'
  import CareersSection from '../components/Careers/CareersSection.svelte'
  import CareersSectionContent from '../components/Careers/CareersSectionContent.svelte'
  import MilLeftServiceDuration from '../components/Military/LeftServiceDuration.svelte'
  import MilRank from '../components/Military/Rank.svelte'
  import BlogFeedList from '../components/RecentActivities/BlogFeedList.svelte'
</script>

<section class="careers">
  <div class="careers__content">
    <h3 class="subsubtitle">CAREERS</h3>
    <h2 class="subtitle">그동안의 발자취_</h2>
    <CareersSection id='careers__now'>
      <CareersSectionContent 
        name='잼코딩학원 광주캠퍼스 파트타임 강사'
        date='2024.01-'
      >
        ⇒ 광주봉선/광주수완: 강사/보조강사
      </CareersSectionContent>
    </CareersSection>
    <CareersSection id='careers__education' title='EDUCATION'>
      <CareersSectionContent 
        name='숭덕고등학교'
        date='2018.03-2021.02'
      />
      <CareersSectionContent
        name='전남대학교 컴퓨터정보통신공학과 학부과정'
        date='2021.03-'
      />
    </CareersSection>
    <CareersSection id='careers__education' title='WORK'>
      <CareersSectionContent 
        name='전남대학교 지능영상미디어인터페이스 연구실'
        date='2021.06-2022.07'
      >
        ⇒ 지도교수: 이칠우 <a href="https://ieeexplore.ieee.org/author/37292814300" target="_blank" rel="noreferrer">(IEEE author information)</a>
      </CareersSectionContent>
      <CareersSectionContent
        name='대한민국 육군 병장 만기전역'
        date='2022.07-2024.01'
      />
    </CareersSection>
    <CareersSection id='careers__projects' title='PROJECTS'>
      <CareersSectionContent 
        name='악질 이름 생성기'
        date='2020.05'
        url='https://name.ho9.me'
      >
        ⇒ 개인 프로젝트
      </CareersSectionContent>
      <CareersSectionContent
        name='청각장애인을 위한 지능형 전시해설 문자/한국수어 변환 기술 개발'
        date='2021.06-2022.07'
      >
        ⇒ 연구실 연구과제 // 클라이언트 개발
      </CareersSectionContent>
      <CareersSectionContent
        name='2022 호남 대학간 침해 대응 대회 2022 대회 사이트'
        date='2022.06'
        url='https://hccc2022.github.io'
      >
        ⇒ 아웃소싱 // 프론트엔드 디자인 및 개발
      </CareersSectionContent>
      <CareersSectionContent
        name='IW-FCV 2023 학회 정보 사이트'
        date='2022.05-2022.07'
        url='https://iwfcv2023.github.io'
      >
        ⇒ 아웃소싱 // 초기 프론트엔드 디자인 및 개발
      </CareersSectionContent>
      <CareersSectionContent>
        그 외 프로젝트들은 <a href="https://github.com/ShapeLayer" target="_blank" rel="noreferrer">Github</a>를 참조하세요.
      </CareersSectionContent>
    </CareersSection>
    <CareersSection id='careers__achievements' title='ACHIEVEMENTS'>
      <CareersSectionContent
        name='전남대학교 창업아이템경진대회 입선'
        date='2021.12'
      />
      <CareersSectionContent
        name='The 2021 ICPC Asia Seoul Regional Contest 53th'
        date='2021.11.13'
      />
      <CareersSectionContent
        name='자연스러운 수어 애니메이션을 위한 FBX 파일 결합 알고리즘'
        date='2021.11'
      >
        ⇒ 연구과제 논문 // 공동저자<br>
        ⇒ 한국스마트미디어학회 2021 춘계 학술대회. 정종호, 고영민, 박종현, 이칠우, 김대진.
      </CareersSectionContent>
      <CareersSectionContent
        name='자연스러운 애니메이션을 위한 수어 애니메이션 생성 알고리즘 고도화'
        date='2022.06'
      >
        ⇒ 연구과제 논문 // 공동저자<br>
        ⇒ 한국스마트미디어학회 2022 종합학술대회. 정종호, 박종현, 나광일, 성홍념, 황희재, 이칠우
      </CareersSectionContent>
    </CareersSection>
    <CareersSection id='careers__activities' title='ACTIVITIES'>
      <CareersSectionContent
        name='2019 광주SW체험축전 "한글코드로 만드는 디스코드 챗봇" 체험 부스 운영'
        date='2019.05'
      >
        ⇒ 체험 축전 // 총괄
      </CareersSectionContent>
      <CareersSectionContent
        name='전남대학교 게임개발동아리 PIMM'
        date='2021.03-'
      />
      <CareersSectionContent
        name='전남대학교 소프트웨어 개발동아리 Stolio'
        date='2022.03-2022.06'
      >
        ⇒ 동아리 개설 참여 // 동아리 운영 집행 및 프로젝트 리딩
      </CareersSectionContent>
      <CareersSectionContent
        name='"2023 전남대학교 PIMM 알고리즘 파티" 대회 개최'
        date='2023.09'
      >
        ⇒ 커뮤니티 오픈 컨테스트 // 총괄
      </CareersSectionContent>
    </CareersSection>
    <CareersSection id='careers__certificates' title='CERTIFICATES'>
      <CareersSectionContent
        name='TOEIC 805'
        date='2021.08.08'
      />
      <CareersSectionContent
        name='AWS Certification'
        url='https://www.credly.com/users/jonghyeon/badges'
      >
        ⇒ Cloud Practitioner<br>
        ⇒ Developer - Associate
      </CareersSectionContent>
      <CareersSectionContent
        name='SQL 개발자'
      />
      <CareersSectionContent
        name='네트워크관리사 2급'
      />
      <CareersSectionContent
        name='YBM Coding Specialist Professional I'
      />
    </CareersSection>
    <!--<CareersSection id='careers__recent_activities' title='RECENT'>
      <BlogFeedList />
    </CareersSection>-->
    
  </div>
</section>

<style lang="scss">
section.careers {
  div.careers__content {
    div {
      margin: 0 1em;
    }
  }
}
</style>
