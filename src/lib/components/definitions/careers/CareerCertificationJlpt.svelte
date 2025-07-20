<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='certification-jlpt'
  title={m.career_title_certification_jlpt()}
  startsAt={{ year: 2024, month: 8, day: 13 }}
/>
