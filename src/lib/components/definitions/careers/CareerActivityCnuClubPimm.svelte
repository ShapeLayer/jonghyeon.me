<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='activity-cnu-club-pimm'
  title={m.career_title_activity_cnu_club_pimm()}
  startsAt={{ year: 2021, month: 3 }}
  current={true}
>
  {m.career_details_activity_cnu_club_pimm_lead()}
</CareerItem>
