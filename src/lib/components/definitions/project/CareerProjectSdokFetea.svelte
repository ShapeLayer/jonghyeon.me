<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem id='project-sdok-fetea' title={m.career_title_project_sdok_fetea()}>
  <ul>
    <li><ExternalLink href="https://github.com/shapelayer/petitionapplication-py">GitHub</ExternalLink></li>
    <li>{m.career_details_project_sdok_fetea_li_0()}</li>
    <li>{m.career_details_project_sdok_fetea_li_1()}</li>
    <li>{m.career_details_project_sdok_fetea_li_2()}</li>
    <li>{m.career_details_project_sdok_fetea_li_3()}</li>
  </ul>
</CareerItem>
