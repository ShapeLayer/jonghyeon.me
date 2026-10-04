<script lang="ts">
  import type { ImageAnnotation } from '$lib/components/image-annotations';
  import { m } from '$lib/paraglide/messages';
  import PimmAnomalyFormula from '$lib/components/PimmAnomalyFormula.svelte';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
  import CareerItemDetailSubsection from '$lib/components/CareerItemDetailSubsection.svelte';
  import CareerProjectSummary from '$lib/components/CareerProjectSummary.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
  import ZoomableImage from '$lib/components/ZoomableImage.svelte';
  import CareerProjectGFMDescConvWebUI from '$lib/assets/CareerProjectGfmToPolygonDesc.png';
  import CareerAlgorithmContestGist from '$lib/assets/CareerAlgorithmContestGist-cover.webp';
  import { asset } from '$app/paths';
  import { getLocale } from '$lib/paraglide/runtime';

  const aiReportHref = asset(getLocale() === 'ko' ? '/files/pimm25a-ai.pdf' : '/files/pimm25a-ai-en.pdf');

  // Bounds include the black margins of the original 1280 × 1025 screenshot.
  const gfmRegion = (id: string, x: number, y: number, width: number, height: number, text: string): ImageAnnotation => ({
    id, x: x / 1280 * 100, y: y / 1025 * 100, width: width / 1280 * 100, height: height / 1025 * 100, text
  });
  const gfmAnnotations = $derived(getLocale() === 'ko' ? [] : [
    gfmRegion('gemini-0', 1059, 46, 151, 25, m.career_image_gfm_polygon_gemini()),
    gfmRegion('plan-1', 98, 327, 525, 61, m.career_image_gfm_polygon_plan()),
    gfmRegion('question-2', 98, 407, 190, 22, m.career_image_gfm_polygon_question()),
    gfmRegion('input-3', 98, 447, 52, 23, m.career_image_gfm_polygon_input()),
    gfmRegion('jonghyeon_date-4', 98, 487, 376, 23, m.career_image_gfm_polygon_jonghyeon_date()),
    gfmRegion('yeongdo_date-5', 98, 527, 376, 23, m.career_image_gfm_polygon_yeongdo_date()),
    gfmRegion('parameters-6', 98, 568, 521, 42, m.career_image_gfm_polygon_parameters()),
    gfmRegion('actions-7', 98, 629, 454, 24, m.career_image_gfm_polygon_actions()),
    gfmRegion('leave_action-8', 98, 670, 522, 42, m.career_image_gfm_polygon_leave_action()),
    gfmRegion('discipline_action-9', 98, 712, 522, 41, m.career_image_gfm_polygon_discipline_action()),
    gfmRegion('nco_action-10', 98, 752, 522, 42, m.career_image_gfm_polygon_nco_action()),
    gfmRegion('output-11', 98, 811, 54, 24, m.career_image_gfm_polygon_output()),
    gfmRegion('result-12', 98, 851, 323, 26, m.career_image_gfm_polygon_result()),
    gfmRegion('early_discharge-13', 656, 361, 405, 26, m.career_image_gfm_polygon_early_discharge()),
    gfmRegion('disciplinary_training-14', 656, 442, 523, 44, m.career_image_gfm_polygon_disciplinary_training()),
    gfmRegion('fixed_term_nco-15', 656, 543, 523, 44, m.career_image_gfm_polygon_fixed_term_nco()),
    gfmRegion('plan-16', 656, 665, 523, 63, m.career_image_gfm_polygon_plan()),
    gfmRegion('question-17', 656, 766, 190, 25, m.career_image_gfm_polygon_question()),
    gfmRegion('input-18', 699, 807, 32, 24, m.career_image_gfm_polygon_input()),
    gfmRegion('jonghyeon_date-19', 656, 847, 375, 26, m.career_image_gfm_polygon_jonghyeon_date()),
  ]);
</script>

<style>
  .algorithm-contest-content {
    margin: 1em 0;
  }
</style>

<CareerItem
  id='algorithm-contest-operations'
  title={m.career_title_algorithm_contest_operations()}
>
  <ul>
    <li>{m.career_details_algorithm_contest_pimm_party()}</li>
    <li>{m.career_details_algorithm_contest_pimm_party_question_writing_23_24a()}</li>
  </ul>
  {#snippet detailContent()}
  <CareerItemDetailContent
    id="algorithm-contest-operations-detail"
    title={m.career_title_algorithm_contest_operations()}
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
          <li>{m.career_contents_algorithm_contest_pimm_party_ai_abuse_li_1()}<PimmAnomalyFormula /></li>
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
        <ZoomableImage src={CareerProjectGFMDescConvWebUI} alt='Web UI' width={1280} height={1025} annotations={gfmAnnotations} />
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
      .algorithm-contest-content ul {
        list-style: disc;
        padding-left: 1em;
      }
      .algorithm-contest-content li {
        margin: .25em 0;
      }
      .gist-cover-wrapper {
        display: flex;
        justify-content: center;
      }
    </style>

    <CareerItemDetailSubsection id='algorithm-contest-pimm-detailed' title={m.career_contents_algorithm_contest_pimm_detailed_title()}>
      <div class="algorithm-contest-content content">
        <span>{m.career_contents_algorithm_contest_pimm23_title()}</span>
        <ul>
          <li><ExternalLink href="https://archive.is/52Ktp">{m.contest_page()} (archive.is)</ExternalLink></li>
          <li><ExternalLink href='https://archive.is/16FCI'>{m.problems()} (archive.is)</ExternalLink></li>
          <li><ExternalLink href='https://archive.is/LG22S'>{m.set_problem()}: {m.career_contents_algorithm_contest_pimm23_prob_c()}</ExternalLink></li>
          <li><ExternalLink href="https://blog.jonghyeon.me/posts/2023-09-05-rewinding-2023-pimm-party/">{m.extlink_post_title_rewinding_2023_pimm_party()}</ExternalLink></li>
        </ul>
      </div>

      <div class="algorithm-contest-content content">
        <span>{m.career_contents_algorithm_contest_pimm24a_title()}</span>
        <ul>
          <li><ExternalLink href="https://archive.is/sx5QG">{m.contest_page()} (archive.is)</ExternalLink></li>
          <li><ExternalLink href='https://archive.is/Ddg9H'>{m.problems()} (archive.is)</ExternalLink></li>
          <li><ExternalLink href='https://archive.is/xwZK9'>{m.set_problem()}: {m.career_contents_algorithm_contest_pimm24a_prob_e()}</ExternalLink></li>
          <li><ExternalLink href="https://blog.jonghyeon.me/posts/2024-03-13-rewinding-2024-1-pimm-party/">{m.extlink_post_title_rewinding_2024_1_pimm_party()}</ExternalLink></li>
        </ul>
      </div>

      <div class="algorithm-contest-content content">
        <span>{m.career_contents_algorithm_contest_pimm24b_title()}</span>
        <ul>
          <li><ExternalLink href="https://archive.is/Kn3m0">{m.contest_page()} (archive.is)</ExternalLink></li>
          <li><ExternalLink href='https://archive.is/wEz1b'>{m.problems()} (archive.is)</ExternalLink></li>
          <li><ExternalLink href="https://blog.jonghyeon.me/posts/2024-09-23-rewinding-2024-2-pimm-party/">{m.extlink_post_title_rewinding_2024_2_pimm_party()}</ExternalLink></li>
        </ul>
      </div>
      
      <div class="algorithm-contest-content content">
        <span>{m.career_contents_algorithm_contest_pimm25a_title()}</span>
        <ul>
          <li><ExternalLink href="https://archive.is/MUAgn">{m.contest_page()} (archive.is)</ExternalLink></li>
          <li><ExternalLink href='https://archive.is/BRS4E'>{m.problems()} (archive.is)</ExternalLink></li>
          <li><ExternalLink href="https://blog.jonghyeon.me/posts/2025-04-15-till-its-over/">{m.extlink_post_title_rewinding_2025_1_pimm_party()}</ExternalLink></li>
        </ul>
      </div>

      <div id="detail-algorithm-contest-gist" class="algorithm-contest-content content">
        <span>{m.career_contents_algorithm_contest_gist_title()}</span>

        <ul>
          <li><ExternalLink href='https://archive.is/suENW'>{m.contest_page()} (archive.is)</ExternalLink></li>
          <li><ExternalLink href='https://archive.is/suENW'>{m.problems()} (archive.is)</ExternalLink></li>
          <li>{m.set_problem()}: <ExternalLink href='https://archive.is/VfYfn'>{m.career_contents_algorithm_contest_gist_prob_b()} </ExternalLink></li>
          <li><ExternalLink href='https://m.etnews.com/20240719000005'>{m.etnews()}</ExternalLink></li>
        </ul>
        <div class="gist-cover-wrapper">
          <ZoomableImage src={CareerAlgorithmContestGist} alt={m.career_contents_algorithm_contest_gist_title()} displayWidth="80%" />
        </div>
      </div>
    </CareerItemDetailSubsection>

  </CareerItemDetailContent>
  {/snippet}
</CareerItem>
