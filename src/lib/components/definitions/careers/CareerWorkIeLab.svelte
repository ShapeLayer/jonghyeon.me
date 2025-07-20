<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='work-imagelab'
  title={m.career_title_work_imagelab()}
  startsAt={{ year: 2024, month: 3 }}
  endsAt={{ year: 2025, month: 2 }}
>
  {m.advisor_prof()}: {m.kim_jin_young()}
  <ExternalLink href="https://ieeexplore.ieee.org/author/38185528600">({m.ieee_author_data()})</ExternalLink>
</CareerItem>
