<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
	import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
  import CareerProjectHccc22PageCover from '$lib/assets/CareerProjectHccc22Page-cover.png';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='project-hccc22-page'
  title={m.career_title_project_hccc22_page()}
  startsAt={{ year: 2022, month: 6 }}
>
  {m.career_details_project_hccc22_page()}
  {#snippet detailContent()}
    <CareerItemDetailContent
      title={m.career_content_project_hccc22_page_title()}
      subtitle="{m.jekyll()}"
    >
      <div class="content">
        <ExternalLink href='https://hccc2022.github.io'>{m.extlink_site_name_hccc22()}</ExternalLink><br />
      </div>
      <div class="content">
        <p>
          <img src={CareerProjectHccc22PageCover} />
        </p>
      </div>
    </CareerItemDetailContent>
  {/snippet}
</CareerItem>
