<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
	import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
</script>

<CareerItem
  id='project-iwfcv22-page'
  title={m.career_title_project_iwfcv22_page()}
  startsAt={{ year: 2022, month: 6 }}
>
  {m.career_details_project_iwfcv22_page()}
  {#snippet detailContent()}
  <CareerItemDetailContent
    title="International Workshop on Frontiers of Computer Vision 2023 학회 정보 사이트"
    subtitle="Jekyll"
  ></CareerItemDetailContent>
  {/snippet}
</CareerItem>
