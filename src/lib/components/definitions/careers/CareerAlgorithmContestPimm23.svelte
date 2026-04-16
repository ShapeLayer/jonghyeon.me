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
    <style>
      #pimmparty23-content ul {
        list-style: disc;
        padding-left: 1em;
      }
      #pimmparty23-content li {
        margin: .25em 0;
      }
    </style>
    <div id="pimmparty23-content" class="content">
      <span>{m.problems()} <ExternalLink href='https://archive.is/16FCI'>(archive.is)</ExternalLink></span>
      <ul>
        <li><ExternalLink href='https://archive.is/no6Iz'>{m.career_contents_algorithm_contest_pimm23_prob_a()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/Qap90'>{m.career_contents_algorithm_contest_pimm23_prob_b()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/LG22S'>{m.career_contents_algorithm_contest_pimm23_prob_c()} ({m.set_problem()})</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/tmlIn'>{m.career_contents_algorithm_contest_pimm23_prob_d()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/xwZK9'>{m.career_contents_algorithm_contest_pimm23_prob_e()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/Owi0B'>{m.career_contents_algorithm_contest_pimm23_prob_f()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/9GgiP'>{m.career_contents_algorithm_contest_pimm23_prob_g()}</ExternalLink></li>
      </ul>
      <p><br /></p>
      <p>
        <ExternalLink href="https://blog.jonghyeon.me/posts/2023-09-05-rewinding-2023-pimm-party/">
          {m.see_more()}: {m.extlink_post_title_rewinding_2023_pimm_party()}
        </ExternalLink>
        <ExternalLink href="https://www.acmicpc.net/contest/view/1095">
          {m.contest_page()}
        </ExternalLink>
        <ExternalLink href="https://archive.is/52Ktp">
          (archive.is)
        </ExternalLink>
      </p>
    </div>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
