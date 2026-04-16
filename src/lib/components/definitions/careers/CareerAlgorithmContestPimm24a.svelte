<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='algorithm-contest-pimm-24a'
  title={m.career_title_algorithm_contest_pimm24a()}
  startsAt={{ year: 2024, month: 3 }}
>
  {m.career_details_algorithm_contest_pimm24a()}
  {#snippet detailContent()}
  <CareerItemDetailContent
    title={m.career_contents_algorithm_contest_pimm24a_title()}
    subtitle={m.career_contents_algorithm_contest_pimm24a_subtitle()}
  >
    <style>
      #pimmparty24a-content ul {
        list-style: disc;
        padding-left: 1em;
      }
      #pimmparty24a-content li {
        margin: .25em 0;
      }
    </style>
    <div id="pimmparty24a-content" class="content">
      <span>{m.problems()} <ExternalLink href='https://archive.is/Ddg9H'>(archive.is)</ExternalLink></span>
      <ul>
        <li><ExternalLink href='https://archive.is/no6Iz'>{m.career_contents_algorithm_contest_pimm24a_prob_a()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/Qap90'>{m.career_contents_algorithm_contest_pimm24a_prob_b()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/LG22S'>{m.career_contents_algorithm_contest_pimm24a_prob_c()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/tmlIn'>{m.career_contents_algorithm_contest_pimm24a_prob_d()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/xwZK9'>{m.career_contents_algorithm_contest_pimm24a_prob_e()} ({m.set_problem()})</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/Owi0B'>{m.career_contents_algorithm_contest_pimm24a_prob_f()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/9GgiP'>{m.career_contents_algorithm_contest_pimm24a_prob_g()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/tmlIn'>{m.career_contents_algorithm_contest_pimm24a_prob_h()}</ExternalLink></li>
        <li><ExternalLink href='https://archive.is/16FCI'>{m.career_contents_algorithm_contest_pimm24a_prob_i()}</ExternalLink></li>
      </ul>
      <p><br /></p>
      <p>
        <ExternalLink href="https://blog.jonghyeon.me/posts/2024-03-13-rewinding-2024-1-pimm-party/">
          {m.see_more()}: {m.extlink_post_title_rewinding_2024_1_pimm_party()}
        </ExternalLink>
        <ExternalLink href="https://www.acmicpc.net/contest/view/1247">
          {m.contest_page()}
        </ExternalLink>
        <ExternalLink href="https://archive.is/sx5QG">
          (archive.is)
        </ExternalLink>
      </p>
    </div>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
