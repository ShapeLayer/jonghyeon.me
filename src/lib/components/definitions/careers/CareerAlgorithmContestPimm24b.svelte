<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='algorithm-contest-pimm-24b'
  title={m.career_title_algorithm_contest_pimm24b()}
  startsAt={{ year: 2024, month: 9 }}
>
  {m.career_details_algorithm_contest_pimm24b()}
  {#snippet detailContent()}
  <CareerItemDetailContent
    title={m.career_contents_algorithm_contest_pimm24b_title()}
    subtitle={m.career_contents_algorithm_contest_pimm24b_subtitle()}
  >
    <style>
      #pimmparty24b-content ul {
        list-style: disc;
        padding-left: 1em;
      }
      #pimmparty24b-content li {
        margin: .25em 0;
      }
    </style>
    <div id="pimmparty24b-content" class="content">
      <span>{m.problems()} <ExternalLink href='https://archive.is/wEz1b'>(archive.is)</ExternalLink></span>
      <ul>
        <li><ExternalLink href='https://archive.is/QIlmw'>{m.career_contents_algorithm_contest_pimm24b_prob_a()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/USZpi'>{m.career_contents_algorithm_contest_pimm24b_prob_b()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/mBDP2'>{m.career_contents_algorithm_contest_pimm24b_prob_c()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/08Xts'>{m.career_contents_algorithm_contest_pimm24b_prob_d()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/f2WHw'>{m.career_contents_algorithm_contest_pimm24b_prob_e()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/9ufy0'>{m.career_contents_algorithm_contest_pimm24b_prob_f()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/qaPJ6'>{m.career_contents_algorithm_contest_pimm24b_prob_g()}</ExternalLink></li>
      </ul>
      <p><br /></p>
      <p>
        <ExternalLink href="https://blog.jonghyeon.me/posts/2024-09-23-rewinding-2024-2-pimm-party/">
          {m.see_more()}: {m.extlink_post_title_rewinding_2024_2_pimm_party()}
        </ExternalLink>
        <ExternalLink href="https://www.acmicpc.net/contest/view/1357">
          {m.contest_page()}
        </ExternalLink>
        <ExternalLink href="https://archive.is/Kn3m0">
          (archive.is)
        </ExternalLink>
      </p>
    </div>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
