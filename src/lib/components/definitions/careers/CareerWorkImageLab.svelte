<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='work-imagelab'
  title={m.career_title_work_imagelab()}
>
  {m.advisor_prof()}: {m.lee_chil_woo()}
  <ExternalLink href="https://ieeexplore.ieee.org/author/37292814300">({m.ieee_author_data()})</ExternalLink>
</CareerItem>
