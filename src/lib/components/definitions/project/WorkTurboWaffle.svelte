<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import { getContext } from 'svelte';
  const portfolio = getContext<{ enabled: boolean }>('career-portfolio');
  import CareerItem from '$lib/components/CareerItem.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='works-turbo-waffle'
  title={m.career_title_works_turbo_waffle()}
>
  <ul>
    {#if portfolio?.enabled}
      <li>{m.career_contents_algorithm_contest_pimm_party_turbo_waffle_li_0()}</li>
    {/if}
    <li><ExternalLink href='https://github.com/ShapeLayer/turbo-waffle'>GitHub</ExternalLink></li>
    <li>{m.career_details_works_turbo_waffle_li_0()}</li>
    <li>{m.career_details_works_turbo_waffle_li_1()}</li>
    <li>{m.career_details_works_turbo_waffle_li_2()}</li>
    {#if portfolio?.enabled}
      <li>{m.portfolio_turbo_waffle_output()}: <ExternalLink href="https://github.com/pimm-dev/2023-algorithm-party-editorial/">2023 Algorithm Party Editorial</ExternalLink></li>
    {/if}
  </ul>
</CareerItem>
