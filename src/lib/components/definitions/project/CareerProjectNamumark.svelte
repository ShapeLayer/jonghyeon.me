<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem id='project-namumark' title={m.career_title_project_namumark()}>
  <ul>
    <li><ExternalLink href='https://github.com/ShapeLayer/namumark'>GitHub</ExternalLink></li>
    <li>{m.career_details_project_namumark_li_0()}</li>
    <li>{m.career_details_project_namumark_li_1()} <ExternalLink href='https://github.com/github/cmark-gfm'>github/cmark-gfm</ExternalLink></li>
    <li>{m.career_details_project_namumark_li_2()} <ExternalLink href='https://github.com/openNAMU/namumark-editor-ast-experimental'>namumark-editor-ast-experimental</ExternalLink></li>
  </ul>
</CareerItem>
