<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
  import CareerItemDetailSubsection from '$lib/components/CareerItemDetailSubsection.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<CareerItem
  id='algorithm-contest-pimm-party'
  title={m.career_title_algorithm_contest_pimm_party()}
>
  <ul>
    <li>{m.career_details_algorithm_contest_pimm_party()}</li>
    <li>{m.career_details_algorithm_contest_pimm_party_question_writing_23_24a()}</li>
  </ul>
  {#snippet detailContent()}
  <CareerItemDetailContent
    title={m.career_contents_algorithm_contest_pimm_party_title()}
    subtitle={m.career_contents_algorithm_contest_pimm_party_subtitle()}
  >
    <style>
      .pimmparty-content ul {
        list-style: disc;
        padding-left: 1em;
      }
      .pimmparty-content li {
        margin: .25em 0;
      }
    </style>

    <CareerItemDetailSubsection id='algorithm-contest-pimm-23' title={m.career_contents_algorithm_contest_pimm23_title()} subtitle={m.career_details_algorithm_contest_pimm23()}>
      <div class="pimmparty-content content">
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
    </CareerItemDetailSubsection>

    <CareerItemDetailSubsection id='algorithm-contest-pimm-24a' title={m.career_contents_algorithm_contest_pimm24a_title()} subtitle={m.career_details_algorithm_contest_pimm24a()}>
      <div class="pimmparty-content content">
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
    </CareerItemDetailSubsection>

    <CareerItemDetailSubsection id='algorithm-contest-pimm-24b' title={m.career_contents_algorithm_contest_pimm24b_title()} subtitle={m.career_details_algorithm_contest_pimm24b()}>
      <div class="pimmparty-content content">
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
    </CareerItemDetailSubsection>

    <CareerItemDetailSubsection id='algorithm-contest-pimm-25a' title={m.career_contents_algorithm_contest_pimm25a_title()} subtitle={m.career_details_algorithm_contest_pimm25a()}>
      <div class="pimmparty-content content">
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
    </CareerItemDetailSubsection>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
