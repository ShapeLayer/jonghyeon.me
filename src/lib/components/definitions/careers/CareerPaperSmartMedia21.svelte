<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='paper-smart-media21'
  title={m.career_title_paper_smartmedia21()}
  startsAt={{ year: 2021, month: 11 }}
>
  {m.career_details_paper_smartmedia21()}<br />
  {m.career_authors_paper_smartmedia21()}
</CareerItem>
