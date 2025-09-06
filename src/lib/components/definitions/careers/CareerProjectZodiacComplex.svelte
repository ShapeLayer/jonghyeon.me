<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
	import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
  import CareerProjectZodiacComplexCover from '$lib/assets/CareerProjectZodiacComplex-cover.webp';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='project-zodiac-complex'
  title={m.career_title_project_zodiac_complex()}
  startsAt={{ year: 2025, month: 7 }}
  endsAt={{ year: 2025, month: 8 }}
>
  {m.career_details_project_zodiac_complex()}
  {#snippet detailContent()}
    <CareerItemDetailContent
      title={m.career_title_project_zodiac_complex()}
      subtitle='Unity, C#, Naninovel'
    >
      <div class="content" id="career-project-zodiac-complex-cover">
        <p>
          <img src={CareerProjectZodiacComplexCover} alt=""/><br />
        </p>
      </div>
      <div class="content" id="zodiac-complex">
        <p>비주얼 노벨 게임 &lt;별자리 콤플렉스&gt; 개발 마지막 단계에 투입되어 품질 관리 및 핫픽스 작업 중의 기술 지원에 투입되었습니다.</p>
        <p>최종 납기일에 가깝게 투입되어 많은 내용을 작업한 것은 아니나, 주요 시스템의 치명적인 버그들을 추적하여 이를 수정하는 데 기술지원하였습니다.</p>
      </div>
      <div class="content">
        더 알아보기: <ExternalLink href='https://store.onstove.com/ko/games/102108'>Stove Store</ExternalLink>
    </CareerItemDetailContent>
  {/snippet}
</CareerItem>
