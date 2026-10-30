<script lang="ts">
  import PortfolioImage from '$lib/components/PortfolioImage.svelte';
  import { getE2eUseAnnotations, getE2eConsoleAnnotations, getGfmAnnotations } from '$lib/models/portfolio-image-annotations';
  import cellularRunner from '$lib/assets/CareerProjectCellularRunner.png';
  import cellularViewer from '$lib/assets/CareerProjectCellularViewer.png';
  import { asset } from '$app/paths';
  import { getLocale } from '$lib/paraglide/runtime';
  import graphEditor from '$lib/assets/CareerProjectKtasGraphEditor.png';
  import e2eConsole from '$lib/assets/CareerProjectKtasE2eConsole.png';
  import e2eUse from '$lib/assets/CareerProjectKtasE2eUse.png';
  import namumarkEditor from '$lib/assets/CareerProjectNamumarkEditorAstExperimental.png';
  import gfmWebUI from '$lib/assets/CareerProjectGfmToPolygonDesc.png';
  import { m } from '$lib/paraglide/messages';

  let { id }: { id: string } = $props();
</script>

<!-- Editorial summaries for the PDF; the website keeps its full detail content. -->
{#if id === 'project-ktas-trainer'}
  <ul>
    <li>{m.career_contents_project_ktas_trainer_li_4()}: {m.career_contents_project_ktas_trainer_li_5()}</li>
    <li>{m.career_contents_project_ktas_trainer_scenario_dsl()}. {m.career_contents_project_ktas_trainer_scenario_editor()}</li>
    <li>{m.career_contents_project_ktas_trainer_testing_mcp()}. {m.career_contents_project_ktas_trainer_testing_automation()}</li>
  </ul>
  <p><a href="https://www.youtube.com/watch?v=NR-BYGcniVg&amp;t=499">{m.career_contents_project_ktas_trainer_video_title()}</a></p>
  <div class="portfolio-gallery">
    <figure class="portfolio-feature-image">
      <PortfolioImage src={graphEditor} alt="KTAS Trainer GraphView scenario editor" ratio={1554 / 1025} />
      <figcaption>KTAS Trainer · GraphView</figcaption>
    </figure>
    <figure>
      <PortfolioImage src={e2eConsole} alt="KTAS Trainer E2E test console" ratio={1505 / 1087} annotations={getE2eConsoleAnnotations()} />
      <figcaption>KTAS Trainer · E2E Console</figcaption>
    </figure>
    <figure>
      <PortfolioImage src={e2eUse} alt="KTAS Trainer automated E2E test execution" ratio={1190 / 992} annotations={getE2eUseAnnotations()} />
      <figcaption>KTAS Trainer · E2E / MCP</figcaption>
    </figure>
  </div>
{:else if id === 'works-cellular'}
  <div class="portfolio-gallery">
    <figure><PortfolioImage src={cellularRunner} alt="Cellular Runner" ratio={868 / 700} /><figcaption>Cellular · Runner</figcaption></figure>
    <figure><PortfolioImage src={cellularViewer} alt="Cellular Viewer" ratio={1280 / 1056} /><figcaption>Cellular · Viewer</figcaption></figure>
  </div>
{:else if id === 'algorithm-contest-operations'}
  <ul>
    <li>{m.career_contents_algorithm_contest_pimm_party_ai_abuse_li_0()}</li>
    <li>{m.career_contents_algorithm_contest_pimm_party_ai_abuse_li_2()}</li>
  </ul>
  <p><a href={asset(getLocale() === 'ko' ? '/files/pimm25a-ai.pdf' : '/files/pimm25a-ai-en.pdf')}>{m.detail_pimm_ai_report_pdf()}</a></p>
{:else if id === 'project-sign-language-client'}
  <ul>
    <li>{m.portfolio_sign_language_role()}</li>
    <li>{m.portfolio_sign_language_mapping()}</li>
  </ul>
  <ul>
    <li>{m.career_title_paper_smartmedia21()} · {m.career_details_paper_smartmedia21()}</li>
    <li>{m.career_title_paper_smartmedia22()} · {m.career_details_paper_smartmedia22()}</li>
  </ul>
  <h4 class="portfolio-challenges-title">{m.portfolio_sign_language_challenges()}</h4>
  <ul>
    <li>{m.portfolio_sign_language_position()}</li>
    <li>{m.portfolio_sign_language_transition()}</li>
    <li>{m.portfolio_sign_language_solution()}</li>
  </ul>
{:else if id === 'project-namumark'}
  <figure class="portfolio-project-image">
    <PortfolioImage src={namumarkEditor} alt="Namumark AST experimental editor and HTML preview" ratio={2352 / 1864} />
    <figcaption>Namumark · AST Experimental Editor</figcaption>
  </figure>
{:else if id === 'project-gfm2polygon-statement'}
  <figure class="portfolio-project-image">
    <PortfolioImage src={gfmWebUI} alt="GFM to Polygon Statement web UI" ratio={1280 / 1025} annotations={getGfmAnnotations()} />
    <figcaption>GFM to Polygon Statement · Web UI</figcaption>
  </figure>
{/if}
