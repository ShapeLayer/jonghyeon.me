<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='certification-sqld'
  title={m.career_title_certification_sqld()}
  startsAt={{ year: 2021, month: 10, day: 1 }}
/>
