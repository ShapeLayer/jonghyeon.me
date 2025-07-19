<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='project-hccc22-page'
  title={m.career_title_project_hccc22_page()}
  startsAt={{ year: 2022, month: 6 }}
>
  {m.career_details_project_hccc22_page()}
</CareerItem>
