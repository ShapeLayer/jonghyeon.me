<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
	import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='career-project-prefix-gen'
  title={m.career_title_project_prefix_generator()}
  startsAt={{ year: 2020, month: 5 }}
>
  {m.career_details_project_prefix_generator()}
  {#snippet detailContent()}
  <CareerItemDetailContent
    title="악질이름생성기"
    subtitle="HTML, CSS, JavaScript"
  >
    <div class="content">
      <p>2019-2020년 경 유행했던 &lt;엄준식 밈&gt;을 자동 생성하는 온라인 도구입니다.</p>
      <p>고등학생 시기, 학교간협력교육과정 &lt;게임프로그래밍&gt; 과목의 기말고사 대체과제를 구상하면서 테스트 삼아 작성한 것을 웹 규격으로 배포한 것입니다.</p>
      <p><br /></p>
      <p>당시 네이버에서 서비스중이던 연령별 실시간 검색어 랭킹에서 10대 부문, 20대 부문에서 각각 1위를 기록했습니다.</p>
      <p><br /></p>
      <p>{m.see_more()}: <ExternalLink href="https://blog.jonghyeon.me/posts/2020-05-14-reviewing-prefix-generator/">&lt;악질 이름 생성기를 되돌아보며&gt;</ExternalLink></p>
    </div>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
