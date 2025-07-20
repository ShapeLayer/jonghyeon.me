<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='work-roka'
  title={m.career_title_work_roka()}
  startsAt={{ year: 2022, month: 7 }}
  endsAt={{ year: 2024, month: 1 }}
>
  {m.career_details_work_roka()}
</CareerItem>
