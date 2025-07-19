<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';
  import CareerItem from '$lib/components/CareerItem.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='work-ielab'
  title={m.career_title_work_imagelab()}
  startsAt={{ year: 2021, month: 6 }}
  endsAt={{ year: 2022, month: 7 }}
>
  {m.advisor_prof()}: {m.lee_chil_woo()}
  <ExternalLink href="https://ieeexplore.ieee.org/author/37292814300">({m.ieee_data()})</ExternalLink>
</CareerItem>
