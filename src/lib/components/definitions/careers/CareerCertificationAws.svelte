<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='certification-aws'
  title={m.career_title_certification_aws()}
  hideDatetime
>
  <ul>
    <li><s>{m.career_details_certification_aws_ccp()}</s> {m.career_details_certifications_experied()}</li>
    <li><s>{m.career_details_certification_aws_da()}</s> {m.career_details_certifications_experied()}</li>
  </ul>
</CareerItem>
