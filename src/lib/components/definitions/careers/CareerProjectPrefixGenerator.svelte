<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='career-project-prefix-gen'
  title={m.career_title_project_prefix_generator()}
  startsAt={{ year: 2020, month: 5 }}
>
  {m.career_details_project_prefix_generator()}
</CareerItem>
