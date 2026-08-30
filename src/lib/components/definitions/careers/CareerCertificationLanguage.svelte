<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='certification-language'
  title={m.career_title_certification_language()}
  hideDatetime
>
  <ul>
    <li><s>{m.career_title_certification_toeic()}</s> {m.career_details_certifications_experied()}</li>
    <li>{m.career_title_certification_jlpt()}</li>
    <li>{m.career_title_certification_opic()}</li>
  </ul>
</CareerItem>
