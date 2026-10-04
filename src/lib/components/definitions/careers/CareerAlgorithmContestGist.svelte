<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='algorithm-contest-gist'
  title={m.career_title_algorithm_contest_gist()}
  detailTargetId="algorithm-contest-operations"
  detailTargetAnchor="detail-algorithm-contest-gist"
>
  <ul>
    <li>{m.career_details_algorithm_contest_gist()}</li>
    <li><ExternalLink href='https://m.etnews.com/20240719000005'>{m.etnews()}</ExternalLink></li>
  </ul>
</CareerItem>
