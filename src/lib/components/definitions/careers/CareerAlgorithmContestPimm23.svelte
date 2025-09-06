<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='algorithm-contest-pimm-23'
  title={m.career_title_algorithm_contest_pimm23()}
  startsAt={{ year: 2023, month: 9 }}
>
  {m.career_details_algorithm_contest_pimm23()}
  {#snippet detailContent()}
  <CareerItemDetailContent
    title={m.career_contents_algorithm_contest_pimm23_title()}
    subtitle={m.career_contents_algorithm_contest_pimm23_subtitle()}
  >
    <p>
      <ExternalLink href="https://blog.jonghyeon.me/posts/2023-09-05-rewinding-2023-pimm-party/">
        {m.see_more()}: {m.extlink_post_title_rewinding_2023_pimm_party()}
      </ExternalLink>
      <ExternalLink href="https://www.acmicpc.net/contest/view/1095">
        {m.contest_page()}
      </ExternalLink>
    </p>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
