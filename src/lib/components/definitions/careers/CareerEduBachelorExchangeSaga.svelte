<script lang="ts">
  import { m } from '$lib/paraglide/messages.js';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='edu-bachelor-exchange-sage'
  title={m.career_title_edu_bachelor_exchange_sage()}
  startsAt={{ year: 2025, month: 9 }}
  endsAt={{ year: 2026, month: 2 }}
>
{m.career_details_edu_bachelor_exchange_sage()}
</CareerItem>
