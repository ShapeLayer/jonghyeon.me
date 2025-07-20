<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='certification-toeic'
  title={m.career_title_certification_toeic()}
  startsAt={{ year: 2021, month: 8, day: 8 }}
>
  {m.career_details_certifications_experied()}
</CareerItem>
