<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItem from '$lib/components/CareerItem.svelte';
  import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
  import CareerItemDetailSubsection from '$lib/components/CareerItemDetailSubsection.svelte';
  import CareerProjectSummary from '$lib/components/CareerProjectSummary.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<style>
  .video-embed {
    width: 100%;
    aspect-ratio: 16 / 9;
  }

  .video-embed iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
  }
</style>

<CareerItem id='project-ktas-trainer' title={m.career_title_project_ktas_trainer()}>
  <ul>
    <li>{m.career_details_project_ktas_trainer_li_0()}</li>
    <li>{m.career_details_project_ktas_trainer_li_1()}</li>
  </ul>
  {#snippet detailContent()}
    <CareerItemDetailContent title={m.career_title_project_ktas_trainer()}>
      <CareerProjectSummary tech={["C#", "Unity", "FishNet", "GraphView", "ONNX", "SupertonicTTS", "CI", "MCP"]}>
        <ul>
          <li>{m.career_contents_project_ktas_trainer_li_0()}</li>
          <li>{m.career_contents_project_ktas_trainer_li_1()}</li>
          <li>{m.career_contents_project_ktas_trainer_li_2()}</li>
        </ul>
      </CareerProjectSummary>
      <div class="video-embed">
        <iframe
          src="https://www.youtube.com/embed/NR-BYGcniVg?si=Wm_jLckYICz0KO3A&amp;start=499"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>

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
            <ExternalLink href='https://cellular-codemetrics.pages.dev'>{m.career_contents_works_cellular_viewer()}</ExternalLink>
          </p>
        </CareerProjectSummary>
      </CareerItemDetailSubsection>
    </CareerItemDetailContent>
  {/snippet}
</CareerItem>
