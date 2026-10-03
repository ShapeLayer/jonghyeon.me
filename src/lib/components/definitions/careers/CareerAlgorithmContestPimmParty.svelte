<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
  import CareerItemDetailSubsection from '$lib/components/CareerItemDetailSubsection.svelte';
  import CareerProjectSummary from '$lib/components/CareerProjectSummary.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
  import ZoomableImage from '$lib/components/ZoomableImage.svelte';
  import CareerProjectGFMDescConvWebUI from '$lib/assets/CareerProjectGfmToPolygonDesc.png';
  import { asset } from '$app/paths';
  import { getLocale } from '$lib/paraglide/runtime';

  const aiReportHref = asset(getLocale() === 'ko' ? '/files/pimm25a-ai.pdf' : '/files/pimm25a-ai-en.pdf');
</script>

<style>
  .pimmparty-content {
    margin: 1em 0;
  }
</style>

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
    <CareerProjectSummary>
      <ul>
        <li>{m.career_contents_algorithm_contest_pimm_party_li_0()}</li>
        <li>{m.career_contents_algorithm_contest_pimm_party_li_1()}</li>
      </ul>
    </CareerProjectSummary>

    <CareerItemDetailSubsection id="algorithm-contest-ai-abuse-report" title={m.career_contents_algorithm_contest_pimm_party_ai_abuse_title()}>
      <CareerProjectSummary tech={["GraphCodeBERT"]}>
        <ul>
          <li>{m.career_contents_algorithm_contest_pimm_party_ai_abuse_li_0()}</li>
          <li>{m.career_contents_algorithm_contest_pimm_party_ai_abuse_li_1()}</li>
          <li>{m.career_contents_algorithm_contest_pimm_party_ai_abuse_li_2()}</li>
        </ul>
        <p><ExternalLink href={aiReportHref}>{m.detail_pimm_ai_report_pdf()}</ExternalLink></p>
      </CareerProjectSummary>
    </CareerItemDetailSubsection>

    <CareerItemDetailSubsection itemId="project-gfm2polygon-statement" title={m.career_contents_algorithm_contest_pimm_party_gfm2polygon_title()}>
      <CareerProjectSummary tech={["C", "C++", "cmark-gfm", "WASM"]}>
        <ul>
          <li>{m.career_contents_algorithm_contest_pimm_party_gfm2polygon_li_0()}</li>
          <li>{m.career_contents_algorithm_contest_pimm_party_gfm2polygon_li_1()}</li>
        </ul>
        <ZoomableImage src={CareerProjectGFMDescConvWebUI} alt='Web UI' />
        <p>
          <ExternalLink href='https://github.com/ShapeLayer/gfm2polygon-statement'>GitHub</ExternalLink> <ExternalLink href='https://gfm-online-judge-description-tool.pages.dev/'>{m.career_contents_algorithm_contest_pimm_party_web_editor()}</ExternalLink>
        </p>
      </CareerProjectSummary>
    </CareerItemDetailSubsection>

    <CareerItemDetailSubsection itemId="works-turbo-waffle" title={m.career_contents_algorithm_contest_pimm_party_turbo_waffle_title()}>
      <CareerProjectSummary tech={["Node.js", "Puppeteer", "Nunjucks"]}>
        <ul>
          <li>{m.career_contents_algorithm_contest_pimm_party_turbo_waffle_li_0()}</li>
          <li>{m.career_contents_algorithm_contest_pimm_party_turbo_waffle_li_1()}</li>
        </ul>
        <p>
          <ExternalLink href='https://github.com/ShapeLayer/turbo-waffle'>GitHub</ExternalLink>
          <ExternalLink href={asset('/files/pimm23.pdf')}>{m.career_contents_algorithm_contest_pimm_party_turbo_waffle_pdf()}</ExternalLink>
        </p>
      </CareerProjectSummary>
    </CareerItemDetailSubsection>

    <style>
      .pimmparty-content ul {
        list-style: disc;
        padding-left: 1em;
      }
      .pimmparty-content li {
        margin: .25em 0;
      }
    </style>

    <CareerItemDetailSubsection id='algorithm-contest-pimm-detailed' title={m.career_contents_algorithm_contest_pimm_detailed_title()}>
      <div class="pimmparty-content content">
        <span>{m.career_contents_algorithm_contest_pimm23_title()}</span>
        <ul>
          <li>{m.problems()} <ExternalLink href='https://archive.is/16FCI'>(archive.is)</ExternalLink></li>
          <li><ExternalLink href='https://archive.is/LG22S'>{m.set_problem()}: {m.career_contents_algorithm_contest_pimm23_prob_c()}</ExternalLink></li>
          <li><ExternalLink href="https://blog.jonghyeon.me/posts/2023-09-05-rewinding-2023-pimm-party/">{m.extlink_post_title_rewinding_2023_pimm_party()}</ExternalLink></li>
          <li><ExternalLink href="https://archive.is/52Ktp">{m.contest_page()} (archive.is)</ExternalLink></li>
        </ul>
      </div>

      <div class="pimmparty-content content">
        <span>{m.career_contents_algorithm_contest_pimm24a_title()}</span>
        <ul>
          <li><span>{m.problems()} <ExternalLink href='https://archive.is/Ddg9H'>(archive.is)</ExternalLink></span></li>
          <li><ExternalLink href='https://archive.is/xwZK9'>{m.set_problem()}: {m.career_contents_algorithm_contest_pimm24a_prob_e()}</ExternalLink></li>
          <li><ExternalLink href="https://blog.jonghyeon.me/posts/2024-03-13-rewinding-2024-1-pimm-party/">{m.extlink_post_title_rewinding_2024_1_pimm_party()}</ExternalLink></li>
          <li><ExternalLink href="https://archive.is/sx5QG">{m.contest_page()} (archive.is)</ExternalLink></li>
        </ul>
      </div>

      <div class="pimmparty-content content">
        <span>{m.career_contents_algorithm_contest_pimm24b_title()}</span>
        <ul>
          <li>{m.problems()} <ExternalLink href='https://archive.is/wEz1b'>(archive.is)</ExternalLink></li>
          <li><ExternalLink href="https://blog.jonghyeon.me/posts/2024-09-23-rewinding-2024-2-pimm-party/">{m.extlink_post_title_rewinding_2024_2_pimm_party()}</ExternalLink></li>
          <li><ExternalLink href="https://archive.is/Kn3m0">{m.contest_page()} (archive.is)</ExternalLink></li>
        </ul>
      </div>
      
      <div class="pimmparty-content content">
        <span>{m.career_contents_algorithm_contest_pimm25a_title()}</span>
        <ul>
          <li>{m.problems()} <ExternalLink href='https://archive.is/BRS4E'>(archive.is)</ExternalLink></li>
          <li><ExternalLink href="https://blog.jonghyeon.me/posts/2025-04-15-till-its-over/">{m.extlink_post_title_rewinding_2025_1_pimm_party()}</ExternalLink></li>
          <li><ExternalLink href="https://archive.is/MUAgn">{m.contest_page()} (archive.is)</ExternalLink></li>
        </ul>
      </div>
    </CareerItemDetailSubsection>
  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
