<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='works-turbo-waffle'
  title={m.career_title_works_turbo_waffle()}
>
  <ul>
    <li>{m.career_details_works_turbo_waffle_li_0()}</li>
    <li>{m.career_details_works_turbo_waffle_li_1()}</li>
    <li>{m.career_details_works_turbo_waffle_li_2()}</li>
    <li><ExternalLink href='https://github.com/ShapeLayer/turbo-waffle'>GitHub</ExternalLink></li>
  </ul>
</CareerItem>
