<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='activity-cnu-club-stolio'
  title={m.career_title_activity_cnu_club_stolio()}
  startsAt={{ year: 2022, month: 3 }}
  endsAt={{ year: 2025, month: 12 }}
>
  {m.career_details_activity_cnu_club_stolio_lead()}
</CareerItem>
