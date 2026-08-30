<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
</script>

<CareerItem
  id='proejct-sign-language-client'
  title={m.career_title_project_sign_language_client()}
>
  {m.career_details_project_sign_language_client()}
</CareerItem>
