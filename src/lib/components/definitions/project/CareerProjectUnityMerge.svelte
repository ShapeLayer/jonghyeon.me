<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem id='project-unity-merge' title={m.career_title_project_unity_merge()}>
  <ul>
    <li><ExternalLink href='https://github.com/ShapeLayer/unity-merge'>GitHub</ExternalLink></li>
    <li>{m.career_details_project_unity_merge_li_0()}</li>
    <li>{m.career_details_project_unity_merge_li_1()}</li>
  </ul>
</CareerItem>
