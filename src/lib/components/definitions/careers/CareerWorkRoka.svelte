<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='work-roka'
  title={m.career_title_work_roka()}
>
  {m.career_details_work_roka()}
</CareerItem>
