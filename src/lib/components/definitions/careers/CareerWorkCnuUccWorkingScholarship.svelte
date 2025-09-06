<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='work-cnu-ucc-working-scholarship'
  title={m.career_title_work_cnu_ucc_working_scholarship()}
  startsAt={{ year: 2025, month: 3 }}
  endsAt={{ year: 2025, month: 8 }}
>
  {m.career_details_work_cnu_ucc_working_scholarship()}
</CareerItem>
