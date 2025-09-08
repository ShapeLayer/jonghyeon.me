<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
	import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
</script>

<CareerItem
  id='project-hccc22-page'
  title={m.career_title_project_hccc22_page()}
  startsAt={{ year: 2022, month: 6 }}
>
  {m.career_details_project_hccc22_page()}
  {#snippet detailContent()}
  <CareerItemDetailContent
    title="2022 호남 대학간 침해 대응 대회 2022 대회 사이트"
    subtitle="Jekyll"
  ></CareerItemDetailContent>
  {/snippet}
</CareerItem>
