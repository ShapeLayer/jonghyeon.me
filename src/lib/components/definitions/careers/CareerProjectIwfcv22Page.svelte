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
    title={m.career_content_project_iwfcv22_page_title()}
    subtitle="{m.jekyll()}"
  ></CareerItemDetailContent>
  {/snippet}
</CareerItem>
