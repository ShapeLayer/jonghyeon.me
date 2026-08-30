<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>
<CareerItem id='project-hannlp' title={m.career_title_project_hannlp()}>
  <ul>
    <li><ExternalLink href='https://github.com/ShapeLayer/hannlp'>GitHub</ExternalLink></li>
    <li>{m.career_details_project_hannlp_li_0()}</li>
    <li>{m.career_details_project_hannlp_li_1()}</li>
    <li>{m.career_details_project_hannlp_li_2()}</li>
  </ul>
</CareerItem>
