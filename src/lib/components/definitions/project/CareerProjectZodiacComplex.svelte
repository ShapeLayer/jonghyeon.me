<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='project-zodiac-complex'
  title={m.career_title_project_zodiac_complex()}
>
  <ul>
    <li><ExternalLink href='https://store.onstove.com/ko/games/102108'>{m.stove_store()}</ExternalLink></li>
    <li>{m.career_details_project_zodiac_complex_li_2()}</li>
    <li>{m.career_details_project_zodiac_complex_li_0()}</li>
    <li>{m.career_details_project_zodiac_complex_li_1()}</li>
  </ul>
</CareerItem>
