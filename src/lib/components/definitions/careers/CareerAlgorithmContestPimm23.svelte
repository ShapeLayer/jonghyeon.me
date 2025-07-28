<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='algorithm-contest-pimm-23'
  title={m.career_title_algorithm_contest_pimm23()}
  startsAt={{ year: 2023, month: 9 }}
>
  {m.career_details_algorithm_contest_pimm23()}
  {#snippet detailContent()}
  <CareerItemDetailContent
    title='<2023 전남대학교 PIMM 알고리즘 파티> 대회'
    subtitle='백준 온라인 저지, 오픈 콘테스트'
  >
    <p>
      <ExternalLink href="https://blog.jonghyeon.me/posts/2023-09-05-rewinding-2023-pimm-party/">
        더 알아보기
      </ExternalLink>
      <ExternalLink href="https://www.acmicpc.net/contest/view/1095">
        대회 페이지
      </ExternalLink>
    </p>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
