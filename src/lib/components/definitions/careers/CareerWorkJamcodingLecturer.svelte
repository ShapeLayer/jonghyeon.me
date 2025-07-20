<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='work-jamcoding-lecturer'
  title={m.career_title_work_jamcoding_lecturer()}
  startsAt={{ year: 2024, month: 1 }}
  current={true}
/>
