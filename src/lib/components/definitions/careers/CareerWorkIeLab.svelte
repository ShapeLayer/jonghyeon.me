<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='work-ielab'
  title={m.career_title_work_ielab()}
>
  {m.advisor_prof()}: {m.kim_jin_young()}
  <ExternalLink href="https://ieeexplore.ieee.org/author/38185528600">({m.ieee_author_data()})</ExternalLink>
</CareerItem>
