<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
</script>

<CareerItem
  id='certification-computer'
  title={m.career_title_certification_computer()}
  hideDatetime
>
  <ul>
    <li>{m.career_title_certification_cos_pro()}</li>
    <li>{m.career_title_certification_sqld()}</li>
    <li>{m.career_title_certification_network_manager()}</li>
  </ul>
</CareerItem>
