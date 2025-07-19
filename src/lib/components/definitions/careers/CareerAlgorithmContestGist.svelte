<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='algorithm-contest-gist'
  title={m.career_title_algorithm_contest_gist()}
  startsAt={{ year: 2024, month: 5 }}
>
  {m.career_details_algorithm_contest_gist()}
</CareerItem>
