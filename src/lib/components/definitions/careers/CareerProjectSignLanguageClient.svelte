<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='proejct-sign-language-client'
  title={m.career_title_project_sign_language_client()}
  startsAt={{ year: 2021, month: 6 }}
  endsAt={{ year: 2022, month: 7 }}
>
  {m.career_details_project_sign_language_client()}
</CareerItem>
