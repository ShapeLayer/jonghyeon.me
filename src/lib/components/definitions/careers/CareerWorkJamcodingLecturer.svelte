<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
	import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
</script>

<CareerItem
  id='work-jamcoding-lecturer'
  title={m.career_title_work_jamcoding_lecturer()}
  startsAt={{ year: 2024, month: 1 }}
  current={true}
>
  {#snippet detailContent()}
    <CareerItemDetailContent
      title='잼코딩학원 광주캠퍼스 파트타임 강사'
    >
      <style>
        #jamcoding-map {
          display: flex;
          justify-content: center;
          margin: 1em 0;
        }
        #jamcoding-description ul { list-style-type: disc; padding-left: 1em; margin-top: -1em; }
        #jamcoding-description li { margin: .2em 0; }
      </style>
      <div id="jamcoding-map">
        <!-- * 카카오맵 - 지도퍼가기 -->
        <!-- 1. 지도 노드 -->
        <div id="daumRoughmapContainer1753716027568" class="root_daum_roughmap root_daum_roughmap_landing"></div>

        <!--
          2. 설치 스크립트
          * 지도 퍼가기 서비스를 2개 이상 넣을 경우, 설치 스크립트는 하나만 삽입합니다.
        -->
        <!-- Defined at /src/routes/+layout.svelte -->
        
        <!-- 3. 실행 스크립트 -->
        <script charset="UTF-8">
          new daum.roughmap.Lander({
            "timestamp" : "1753716027568",
            "key" : "62i3huihfxg",
            "mapWidth" : "500",
            "mapHeight" : "300"
          }).render();
        </script>
      </div>
      <div id="jamcoding-description">
        <p>광주광역시 소재 코딩 학원, 잼코딩학원 광주봉선캠퍼스, <del>광주수완캠퍼스</del><sup>영업 종료</sup>에서 컴퓨터와 프로그래밍을 가르치고 있습니다. 주로 프로그래밍 언어 문법과 알고리즘 문제해결 수업을 진행합니다.</p>
        <p><br /></p>
        <p>주요 출강 수업 목록</p>
        <ul>
          <li>C 프로그래밍 문법</li>
          <li>Java 프로그래밍 문법</li>
          <li>C# 프로그래밍 문법</li>
          <li>Python 프로그래밍 문법</li>
          <li>게임제작 로블록스 + Lua 프로그래밍</li>
          <li>게임제작 유니티 + C#</li>
          <li>알고리즘 문제해결(C++, Python)</li>
        </ul>
      </div>
    </CareerItemDetailContent>
  {/snippet}
</CareerItem>
