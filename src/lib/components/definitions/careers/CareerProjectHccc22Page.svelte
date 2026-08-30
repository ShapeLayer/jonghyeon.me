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
    <li>{m.career_details_project_hccc22_page()}</li>
    <li><ExternalLink href='https://hccc2022.github.io'>{m.extlink_site_name_hccc22()}</ExternalLink></li>
  </ul>
</CareerItem>
