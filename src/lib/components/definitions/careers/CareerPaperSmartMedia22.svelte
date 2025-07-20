<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='paper-smart-media22'
  title={m.career_title_paper_smartmedia22()}
  startsAt={{ year: 2022, month: 6 }}
>
  {m.career_details_paper_smartmedia22()}<br />
  {m.career_authors_paper_smartmedia22()}
</CareerItem>
