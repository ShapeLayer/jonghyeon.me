<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='project-hccc22-page'
  title={m.career_title_project_hccc22_page()}
>
  <ul>
    <li><ExternalLink href='https://hccc2022.github.io'>{m.extlink_site_name_hccc22()}</ExternalLink></li>
    <li>{m.career_details_project_hccc22_page_li_1()}</li>
    <li>{m.career_details_project_hccc22_page_li_2()}</li>
    <li>{m.career_details_project_hccc22_page_li_3()}</li>
  </ul>
</CareerItem>
