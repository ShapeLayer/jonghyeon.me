<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='algorithm-contest-pimm-25a'
  title={m.career_title_algorithm_contest_pimm25a()}
  startsAt={{ year: 2025, month: 3 }}
>
  {m.career_details_algorithm_contest_pimm25a()}

  {#snippet detailContent()}
  <CareerItemDetailContent
    title={m.career_contents_algorithm_contest_pimm25a_title()}
    subtitle={m.career_contents_algorithm_contest_pimm25a_subtitle()}
  >
    <style>
      #pimmparty25a-content ul {
        list-style: disc;
        padding-left: 1em;
      }
      #pimmparty25a-content li {
        margin: .25em 0;
      }
    </style>
    <div id="pimmparty25a-content" class="content">
      <span>{m.problems()} <ExternalLink href='https://archive.is/BRS4E'>(archive.is)</ExternalLink></span>
      <ul>
        <li><ExternalLink href='https://archive.is/LkM2k'>{m.career_contents_algorithm_contest_pimm25a_prob_a()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/FOKUv'>{m.career_contents_algorithm_contest_pimm25a_prob_b()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/u5pJd'>{m.career_contents_algorithm_contest_pimm25a_prob_c()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/VLo9g'>{m.career_contents_algorithm_contest_pimm25a_prob_d()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/9CJmD'>{m.career_contents_algorithm_contest_pimm25a_prob_e()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/pznBo'>{m.career_contents_algorithm_contest_pimm25a_prob_f()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/vPlFy'>{m.career_contents_algorithm_contest_pimm25a_prob_g()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/Wvk5B'>{m.career_contents_algorithm_contest_pimm25a_prob_h()}</ExternalLink></li>
      </ul>
      <p><br /></p>
      <p>
        <ExternalLink href="https://blog.jonghyeon.me/posts/2025-04-15-till-its-over/">
          {m.see_more()}: {m.extlink_post_title_rewinding_2025_1_pimm_party()}
        </ExternalLink>
        <ExternalLink href="https://www.acmicpc.net/contest/view/1463">
          {m.contest_page()}
        </ExternalLink>
        <ExternalLink href="https://archive.is/MUAgn">
          (archive.is)
        </ExternalLink>
      </p>
    </div>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
