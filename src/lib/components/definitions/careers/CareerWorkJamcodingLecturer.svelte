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
      title={m.career_contents_work_jamcoding_lecturer_title()}
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
        <p>{m.career_contents_work_jamcoding_lecturer_body_1()}</p>
        <p><br /></p>
        <p>{m.career_contents_work_jamcoding_lecturer_body_2_title()}</p>
        <ul>
          <li>{m.career_contents_work_jamcoding_lecturer_body_2_li_0()}</li>
          <li>{m.career_contents_work_jamcoding_lecturer_body_2_li_1()}</li>
          <li>{m.career_contents_work_jamcoding_lecturer_body_2_li_2()}</li>
          <li>{m.career_contents_work_jamcoding_lecturer_body_2_li_3()}</li>
          <li>{m.career_contents_work_jamcoding_lecturer_body_2_li_4()}</li>
          <li>{m.career_contents_work_jamcoding_lecturer_body_2_li_5()}</li>
          <li>{m.career_contents_work_jamcoding_lecturer_body_2_li_6()}</li>
        </ul>
      </div>
    </CareerItemDetailContent>
  {/snippet}
</CareerItem>
