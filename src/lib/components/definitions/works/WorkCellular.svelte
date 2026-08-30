<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='works-cellular'
  title={m.career_title_works_cellular()}
>
  <ul>
    <li>
      <ExternalLink href='https://github.com/ShapeLayer/cellular'>GitHub</ExternalLink>
      <ExternalLink href='https://cellular-codemetrics.pages.dev'>{m.career_contents_works_cellular_viewer()}</ExternalLink>
    </li>
    <li>{m.career_details_works_cellular_li_1()}</li>
    <li>{m.career_details_works_cellular_li_2()}</li>
    <li>{m.career_details_works_cellular_li_3()}</li>
  </ul>
</CareerItem>
