<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
	import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
</script>

<CareerItem
  id='proejct-sign-language-client'
  title={m.career_title_project_sign_language_client()}
  startsAt={{ year: 2021, month: 6 }}
  endsAt={{ year: 2022, month: 7 }}
>
  {m.career_details_project_sign_language_client()}
  {#snippet detailContent()}
  <CareerItemDetailContent
    title={m.career_contents_project_sign_language_client_title()}
    subtitle="{m.unity()}, {m.csharp()}"
  >
    <div class="content">
      <p>{m.career_contents_project_sign_language_client_body_1()}</p>
    </div>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
