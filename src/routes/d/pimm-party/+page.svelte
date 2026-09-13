<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
  import CareerItemDetailSubsection from '$lib/components/CareerItemDetailSubsection.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';

</script>

<svelte:head>
  <title>{m.career_contents_algorithm_contest_pimm_party_title()} · {m.park_jong_hyeon()}</title>
  <meta name="description" content={m.detail_pimm_description()} />
</svelte:head>

<CareerItemDetailContent
      title={m.career_contents_algorithm_contest_pimm_party_title()}
      subtitle={m.career_contents_algorithm_contest_pimm_party_subtitle()}
    >
      <section class="detail-section" aria-labelledby="events-heading">
        <h2 id="events-heading">{m.detail_section_events()}</h2>
        <div class="section-content">
          <CareerItemDetailSubsection id="algorithm-contest-pimm-23" title={m.career_contents_algorithm_contest_pimm23_title()} subtitle={m.career_details_algorithm_contest_pimm23()} divider={false}>
            <div class="contest-content">
              <ul>
                <li><span>{m.problems()} <ExternalLink href="https://archive.is/16FCI">(archive.is)</ExternalLink></span></li>
                <li>{m.set_problem()}: <ExternalLink href="https://archive.is/LG22S">{m.career_contents_algorithm_contest_pimm23_prob_c()}</ExternalLink></li>
                <li>{m.retrospective()}: <ExternalLink href="https://blog.jonghyeon.me/posts/2023-09-05-rewinding-2023-pimm-party/">{m.extlink_post_title_rewinding_2023_pimm_party()}</ExternalLink></li>
                <li>{m.contest_page()}: <ExternalLink href="https://archive.is/52Ktp">(archive.is)</ExternalLink></li>
              </ul>
            </div>
          </CareerItemDetailSubsection>

          <CareerItemDetailSubsection id="algorithm-contest-pimm-24a" title={m.career_contents_algorithm_contest_pimm24a_title()} subtitle={m.career_details_algorithm_contest_pimm24a()} divider={false}>
            <div class="contest-content">
              <ul>
                <li><span>{m.problems()} <ExternalLink href="https://archive.is/Ddg9H">(archive.is)</ExternalLink></span></li>
                <li>{m.set_problem()}: <ExternalLink href="https://archive.is/xwZK9">{m.career_contents_algorithm_contest_pimm24a_prob_e()}</ExternalLink></li>
                <li>{m.retrospective()}: <ExternalLink href="https://blog.jonghyeon.me/posts/2024-03-13-rewinding-2024-1-pimm-party/">{m.extlink_post_title_rewinding_2024_1_pimm_party()}</ExternalLink></li>
                <li>{m.contest_page()}: <ExternalLink href="https://archive.is/sx5QG">(archive.is)</ExternalLink></li>
              </ul>
            </div>
          </CareerItemDetailSubsection>

          <CareerItemDetailSubsection id="algorithm-contest-pimm-24b" title={m.career_contents_algorithm_contest_pimm24b_title()} subtitle={m.career_details_algorithm_contest_pimm24b()} divider={false}>
            <div class="contest-content">
              <ul>
                <li><span>{m.problems()} <ExternalLink href="https://archive.is/wEz1b">(archive.is)</ExternalLink></span></li>
                <li>{m.retrospective()}: <ExternalLink href="https://blog.jonghyeon.me/posts/2024-09-23-rewinding-2024-2-pimm-party/">{m.extlink_post_title_rewinding_2024_2_pimm_party()}</ExternalLink></li>
                <li>{m.contest_page()}: <ExternalLink href="https://archive.is/Kn3m0">(archive.is)</ExternalLink></li>
              </ul>
            </div>
          </CareerItemDetailSubsection>

          <CareerItemDetailSubsection id="algorithm-contest-pimm-25a" title={m.career_contents_algorithm_contest_pimm25a_title()} subtitle={m.career_details_algorithm_contest_pimm25a()} divider={false}>
            <div class="contest-content">
              <ul>
                <li><span>{m.problems()} <ExternalLink href="https://archive.is/BRS4E">(archive.is)</ExternalLink></span></li>
                <li>{m.retrospective()}: <ExternalLink href="https://blog.jonghyeon.me/posts/2025-04-15-till-its-over/">{m.extlink_post_title_rewinding_2025_1_pimm_party()}</ExternalLink></li>
                <li>{m.contest_page()}: <ExternalLink href="https://archive.is/MUAgn">(archive.is)</ExternalLink></li>
              </ul>
            </div>
          </CareerItemDetailSubsection>
        </div>
      </section>

      <section class="detail-section" aria-labelledby="projects-heading">
        <h2 id="projects-heading">{m.detail_section_projects()}</h2>
        <ul class="project-list">
          <li>
            {m.detail_pimm_turbo_waffle()}<br />
            <ExternalLink href="https://github.com/ShapeLayer/turbo-waffle">turbo-waffle</ExternalLink>
            <ul>
              <li>
                <ExternalLink href="https://github.com/pimm-dev/2023-algorithm-party-editorial/blob/main/editorial.pdf">{m.detail_pimm_editorial()}</ExternalLink>
              </li>
            </ul>
          </li>
          <li>
            {m.detail_pimm_gfm2polygon()}<br />
            <ExternalLink href="https://github.com/ShapeLayer/gfm2polygon-statement">gfm2polygon-statement</ExternalLink>
            <ul>
              <li>
                {m.detail_pimm_web_ui_wrapper()}: <ExternalLink href="https://github.com/ShapeLayer/gfm-online-judge-description-tool">gfm-online-judge-description-tool</ExternalLink>
              </li>
            </ul>
          </li>
          <li>
            {m.detail_pimm_typst_package()}<br />
            <ExternalLink href="https://typst.app/universe/package/ucpc-solutions">ucpc-solutions</ExternalLink>
          </li>
          <li>
            {m.detail_pimm_ai_report()}<br />
            <ExternalLink href="https://github.com/pimm-dev/2025-first-half-algorithm-party-editorial/blob/main/pimm25a-ai.pdf">pimm-dev/2025-first-half-algorithm-party-editorial</ExternalLink>
          </li>
        </ul>
      </section>
    </CareerItemDetailContent>

<style>
  .detail-section {
    display: block;
    width: 100%;
    max-width: none;
    margin: 1.6em 0 0;
    padding: 1.2em 0 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .detail-section > h2 {
    margin: 0;
    font-size: 1.7em;
  }

  .section-content {
    margin-top: 0.8em;
  }

  .section-content :global(.subsection) {
    margin: 0;
    padding: 1em 0;
  }

  .section-content :global(.subsection:first-child) {
    padding-top: 0;
    border-top: 0;
  }

  .section-content :global(.subsection:last-child) {
    padding-bottom: 0;
  }

  .project-list {
    margin: 0.8em 0 0;
    padding-left: 1em;
  }

  .project-list li {
    margin: 0.35em 0;
  }

  .contest-content ul {
    list-style: disc;
    padding-left: 1em;
  }

  .contest-content li {
    margin: 0.25em 0;
  }

  .contest-content p {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25em;
    margin: 0.75em 0 0;
  }

</style>
