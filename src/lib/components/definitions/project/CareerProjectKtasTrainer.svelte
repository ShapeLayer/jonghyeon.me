<script lang="ts">
  import { getE2eUseAnnotations, getE2eConsoleAnnotations } from '$lib/models/portfolio-image-annotations';
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
  import CareerItemDetailSubsection from '$lib/components/CareerItemDetailSubsection.svelte';
  import CareerProjectSummary from '$lib/components/CareerProjectSummary.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
  import ZoomableImage from '$lib/components/ZoomableImage.svelte';
  import CareerProjectKtasGraphEditor from '$lib/assets/CareerProjectKtasGraphEditor.png';
  import CareerProjectKtasE2eConsole from '$lib/assets/CareerProjectKtasE2eConsole.png';
  import CareerProjectKtasE2eUse from '$lib/assets/CareerProjectKtasE2eUse.png';
  import CareerProjectCellularRunner from '$lib/assets/CareerProjectCellularRunner.png';
  import CareerProjectCellularViewer from '$lib/assets/CareerProjectCellularViewer.png';

  const e2eUseAnnotations = $derived(getE2eUseAnnotations());
  const e2eConsoleAnnotations = $derived(getE2eConsoleAnnotations());

</script>

<svelte:head>
  <link href="https://fonts.cdnfonts.com/css/times-new-roman" rel="stylesheet" />
</svelte:head>

<style>
  .paper-authors {
    margin: 1.5em 0;
    font-family: 'Times New Roman', Times, serif;
    font-size: .8em;
    text-align: center;
    line-height: 1.5;
  }

  .paper-title {
    margin: 0 0 1em;
    font-size: 1.2em;
    font-weight: bold;
  }

  .paper-names {
    margin: 0 0 .75em;
  }

  .paper-author {
    display: inline-block;
    white-space: nowrap;
  }

  .paper-self {
    text-decoration-line: underline;
    text-decoration-style: dotted;
    text-underline-offset: .2em;
  }

  .paper-name-mask {
    display: inline-block;
    width: 3em;
    height: .75em;
    margin-right: .25em;
    background: currentColor;
  }

  .paper-wrapper {
    margin: 1.5em 0;
  }

  .paper-status {
    margin: 0 0 .5em;
  }

  .paper-status,
  .paper-team {
    font-size: .65em;
    opacity: .7;
  }

  .paper-wrapper:has(.paper-major-highlight:hover) .paper-team {
    color: inherit;
    opacity: 1;
  }

  .paper-team {
    display: flex;
    align-items: center;
    gap: .4em;
    margin: .5em 0;
  }

  .paper-team svg {
    width: 1.2em;
    height: 1.2em;
    flex-shrink: 0;
  }

  .paper-affiliations {
    font-size: .9em;
    font-style: italic;
    line-height: 1.2;
  }

  .paper-affiliations p {
    margin: .1em 0;
  }

  .paper-major-highlight {
    background: rgba(250, 204, 21, .35);
    color: inherit;
    border-radius: .15em;
    padding: 0 .1em;
    position: relative;
  }

  .video-embed {
    width: 100%;
    aspect-ratio: 16 / 9;
    margin: .5em 0;
  }

  .video-embed iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
  }

  .image-row {
    display: flex;
    gap: .5em;
    margin: .5em 0;
    align-items: center;
  }
  .image-row > :global(*) {
    flex: 1 1 0;
  }
  @media (max-width: 600px) {
    .image-row {
      flex-direction: column;
    }
  }
</style>

<CareerItem id='project-ktas-trainer' title={m.career_title_project_ktas_trainer()}>
  <ul>
    <li>{m.career_details_project_ktas_trainer_li_0()}</li>
    <li>{m.career_details_project_ktas_trainer_li_1()}</li>
  </ul>
  {#snippet detailContent()}
    <CareerItemDetailContent title={m.career_title_project_ktas_trainer()}>
      <CareerItemDetailSubsection>
        <div class="paper-wrapper">
          <p class="paper-status">{m.career_contents_project_ktas_trainer_paper_status()}</p>
          <div class="paper-authors" lang="en">
            <p class="paper-title">Development and Evaluation of a Unity-Based Virtual Simulation Program for Hospital-Based Disaster Nursing</p>
            <p class="paper-names">
              {#each [['Kang', '1'], ['Jonghyeon Park', '2'], ['Yoo', '3'], ['Kang', '4'], ['Lee', '3'], ['Cho', '5*']] as [name, affiliation], index}
                <span class="paper-author">{#if index !== 1}<span class="paper-name-mask" role="img" aria-label="Given name redacted"></span>{/if}<span class:paper-self={index === 1}>{name}</span><sup>{affiliation}</sup></span>{index < 5 ? ', ' : ''}
              {/each}
            </p>
            <div class="paper-affiliations">
              <p><sup>1</sup> Registered <mark class="paper-major-highlight">Nurse</mark>, Samsung Medical Center, South Korea</p>
              <p class="paper-self"><sup>2</sup> Undergraduate student, Department of <mark class="paper-major-highlight">Computer Engineering</mark>, College of Engineering, Chonnam National University, South Korea</p>
              <p><sup>3</sup> Graducated Student, College of <mark class="paper-major-highlight">Nursing</mark>, Chonnam National University, South Korea</p>
              <p><sup>4</sup> Registered <mark class="paper-major-highlight">Nurse</mark>, Asan Medical Center, South Korea</p>
              <p><sup>5</sup> Assoicate Professor, College of <mark class="paper-major-highlight">Nursing</mark>, Chonnam National University, South Korea</p>
            </div>
          </div>
          <p class="paper-team">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="7" r="4" />
              <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
            </svg>
            <span>{m.career_contents_project_ktas_trainer_paper_team()}</span>
          </p>
        </div>
        <div class="video-embed">
          <iframe
            src="https://www.youtube.com/embed/NR-BYGcniVg?si=Wm_jLckYICz0KO3A&amp;start=499"
            title={m.career_contents_project_ktas_trainer_video_title()}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <CareerProjectSummary tech={["C#", "Unity", "FishNet", "GraphView", "ONNX", "SupertonicTTS", "CI", "MCP"]}>
          <ul>
            <br />
            <li>{m.career_contents_project_ktas_trainer_li_0()}</li>
            <li>{m.career_contents_project_ktas_trainer_li_3()}</li>
            <br />
            <li>
              {m.career_contents_project_ktas_trainer_li_4()}
              <ul>
                <li>{m.career_contents_project_ktas_trainer_li_5()}</li>
              </ul>
            </li>
            <li>
              {m.career_contents_project_ktas_trainer_li_6()}
              <ul>
                <li>{m.career_contents_project_ktas_trainer_li_7()}</li>
                <li>{m.career_contents_project_ktas_trainer_li_8()}</li>
              </ul>
            </li>
            <br />
            <li>
              {m.career_contents_project_ktas_trainer_li_1()}
              <ul>
                <li>{m.career_contents_project_ktas_trainer_scenario_problem()}</li>
                <li>{m.career_contents_project_ktas_trainer_scenario_dsl()}</li>
                <li>{m.career_contents_project_ktas_trainer_scenario_editor()}</li>
              </ul>
              <br />
              <ZoomableImage src={CareerProjectKtasGraphEditor} alt='KTAS Trainer Graph Editor' width={1554} height={1025} />
            </li>
            <li>
              {m.career_contents_project_ktas_trainer_li_2()}
              <ul>
                <li>{m.career_contents_project_ktas_trainer_testing_mcp()}</li>
                <li>{m.career_contents_project_ktas_trainer_testing_automation()}</li>
              </ul>
              <br />
              <ZoomableImage src={CareerProjectKtasE2eConsole} alt='KTAS Trainer E2E Console' width={1505} height={1087} annotations={e2eConsoleAnnotations} />
              <ZoomableImage src={CareerProjectKtasE2eUse} alt='KTAS Trainer E2E Use' width={1190} height={992} annotations={e2eUseAnnotations} />
            </li>
          </ul>
        </CareerProjectSummary>
      </CareerItemDetailSubsection>

      <CareerItemDetailSubsection itemId="project-unity-merge" title={m.career_title_project_unity_merge()}>
        <CareerProjectSummary tech={["C++"]}>
          <ul>
            <li>{m.career_details_project_unity_merge_li_0()}</li>
            <li>{m.career_details_project_unity_merge_li_1()}</li>
          </ul>
          <p><ExternalLink href='https://github.com/ShapeLayer/unity-merge'>GitHub</ExternalLink></p>
        </CareerProjectSummary>
      </CareerItemDetailSubsection>

      <CareerItemDetailSubsection itemId="works-cellular" title={m.career_title_works_cellular()}>
        <CareerProjectSummary tech={["Rust", "TypeScript"]}>
          <ul>
            <li>{m.career_details_works_cellular_li_1()}</li>
            <li>{m.career_details_works_cellular_li_2()}</li>
            <li>{m.career_details_works_cellular_li_3()}</li>
          </ul>
          <p>
            <ExternalLink href='https://github.com/ShapeLayer/cellular'>GitHub</ExternalLink>
            <ExternalLink href='https://cellular-codemetrics.pages.dev'>{m.career_contents_works_cellular_viewer()} : https://cellular-codemetrics.pages.dev</ExternalLink>
          </p>
        </CareerProjectSummary>
        <div class="image-row">
          <ZoomableImage src={CareerProjectCellularRunner} alt='Cellular Runner' width={868} height={700} />
          <ZoomableImage src={CareerProjectCellularViewer} alt='Cellular Viewer' width={1280} height={1056} />
        </div>
      </CareerItemDetailSubsection>
    </CareerItemDetailContent>
  {/snippet}
</CareerItem>
