<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
	import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
  import CareerAlgorithmContestGistCover from '$lib/assets/CareerAlgorithmContestGist-cover.webp';
</script>

<CareerItem
  id='algorithm-contest-gist'
  title={m.career_title_algorithm_contest_gist()}
  startsAt={{ year: 2024, month: 5 }}
>
  {m.career_details_algorithm_contest_gist()}
  {#snippet detailContent()}
  <CareerItemDetailContent
    title='<2024 GIST 알고리즘 마스터즈> 대회'
    subtitle='광주지역 대학생 연합 프로그래밍 대회'
  >
    <style>
      .career-algorithm-contest-gist-cover img {
        max-width: 100%;
        height: auto;
      }
    </style>
    <div class="career-algorithm-contest-gist-cover">
      <p>
        <img src={CareerAlgorithmContestGistCover} alt="" /><br />
        Source: <ExternalLink href='https://m.etnews.com/20240719000005'>전자신문</ExternalLink>
      </p>
    </div>
    <div class="content">
      <p>광주지역 대학생을 대상으로 &lt;2024 GIST 알고리즘 마스터즈&gt; 대회를 개최하고 운영했습니다.</p>
      <p>문제 출제와 검수에 저를 포함하여, 광주과학기술원, 전남대학교, 한양대학교 재학생이 참여하였고, 온사이트 대회 현장에서도 진행 스태프로서 대회 진행, 현장 소요 대응, 참가자 감독 등의 역할을 수행했습니다.</p>
      <p><br /></p>
      <p>관련 기사: <ExternalLink href='https://m.etnews.com/20240719000005'>전자신문</ExternalLink></p>
    </div>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
