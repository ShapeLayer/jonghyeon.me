<script lang="ts">
  import { getLocale } from '$lib/paraglide/runtime';
  import type { ImageAnnotation } from '$lib/components/image-annotations';
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

  // Pixel bounds include the screenshot margins; convert once to image-relative percentages.
  const e2eUseRegion = (id: string, x: number, y: number, width: number, height: number, text: string): ImageAnnotation => ({
    id, x: x / 1190 * 100, y: y / 992 * 100, width: width / 1190 * 100, height: height / 992 * 100, text
  });
  const e2eUseAnnotations = $derived(getLocale() === 'ko' ? [] : [
    e2eUseRegion('title', 322, 49, 182, 23, m.career_image_ktas_e2e_use_title()),
    e2eUseRegion('start', 249, 81, 739, 38, m.career_image_ktas_e2e_use_start()),
    e2eUseRegion('core_modified', 311, 143, 95, 21, m.career_image_ktas_e2e_use_core_modified()),
    e2eUseRegion('undo', 797, 152, 70, 24, m.career_image_ktas_e2e_use_undo()),
    e2eUseRegion('changes', 884, 151, 88, 25, m.career_image_ktas_e2e_use_changes()),
    e2eUseRegion('work_1m4s', 249, 251, 99, 22, m.career_image_ktas_e2e_use_work_1m4s()),
    e2eUseRegion('timeout_fix', 249, 293, 737, 45, m.career_image_ktas_e2e_use_timeout_fix()),
    e2eUseRegion('work_2m44s', 249, 384, 108, 22, m.career_image_ktas_e2e_use_work_2m44s()),
    e2eUseRegion('collision_fix', 249, 425, 737, 45, m.career_image_ktas_e2e_use_collision_fix()),
    e2eUseRegion('runner_modified', 311, 495, 203, 21, m.career_image_ktas_e2e_use_runner_modified()),
    e2eUseRegion('undo_second', 797, 503, 70, 24, m.career_image_ktas_e2e_use_undo_second()),
    e2eUseRegion('changes_second', 884, 502, 88, 25, m.career_image_ktas_e2e_use_changes_second()),
    e2eUseRegion('work_44s', 249, 602, 84, 22, m.career_image_ktas_e2e_use_work_44s()),
    e2eUseRegion('rerun', 249, 643, 676, 23, m.career_image_ktas_e2e_use_rerun()),
    e2eUseRegion('work_1m3s', 249, 713, 99, 22, m.career_image_ktas_e2e_use_work_1m3s()),
    e2eUseRegion('progress', 249, 754, 737, 44, m.career_image_ktas_e2e_use_progress()),
    e2eUseRegion('prompt', 261, 813, 120, 23, m.career_image_ktas_e2e_use_prompt()),
    e2eUseRegion('approve', 316, 866, 72, 22, m.career_image_ktas_e2e_use_approve()),
  ]);

  // Console screenshot bounds are measured on the original 1505 × 1087 image.
  const e2eConsoleRegion = (id: string, x: number, y: number, width: number, height: number, text: string): ImageAnnotation => ({
    id, x: x / 1505 * 100, y: y / 1087 * 100, width: width / 1505 * 100, height: height / 1087 * 100, text
  });
  const e2eConsoleAnnotations = $derived(getLocale() === 'ko' ? [] : [
    e2eConsoleRegion('browser_title', 211, 48, 114, 20, m.career_image_ktas_e2e_console_browser_title()),
    e2eConsoleRegion('gemini', 1313, 48, 124, 20, m.career_image_ktas_e2e_console_gemini()),
    e2eConsoleRegion('verify', 1340, 90, 56, 22, m.career_image_ktas_e2e_console_verify()),
    e2eConsoleRegion('title', 66, 136, 97, 24, m.career_image_ktas_e2e_console_title()),
    e2eConsoleRegion('connection', 187, 136, 148, 22, m.career_image_ktas_e2e_console_connection()),
    e2eConsoleRegion('control_none', 359, 136, 56, 22, m.career_image_ktas_e2e_console_control_none()),
    e2eConsoleRegion('refresh', 1310, 136, 55, 24, m.career_image_ktas_e2e_console_refresh()),
    e2eConsoleRegion('capture', 1377, 136, 56, 24, m.career_image_ktas_e2e_console_capture()),
    e2eConsoleRegion('player_view', 64, 190, 74, 22, m.career_image_ktas_e2e_console_player_view()),
    e2eConsoleRegion('build_run', 64, 309, 55, 22, m.career_image_ktas_e2e_console_build_run()),
    e2eConsoleRegion('single_instance', 77, 377, 81, 23, m.career_image_ktas_e2e_console_single_instance()),
    e2eConsoleRegion('run', 160, 413, 29, 22, m.career_image_ktas_e2e_console_run()),
    e2eConsoleRegion('prepare', 95, 450, 54, 22, m.career_image_ktas_e2e_console_prepare()),
    e2eConsoleRegion('terminate', 205, 450, 54, 22, m.career_image_ktas_e2e_console_terminate()),
    e2eConsoleRegion('state_logs', 1063, 190, 91, 22, m.career_image_ktas_e2e_console_state_logs()),
    e2eConsoleRegion('scene', 1072, 224, 108, 18, m.career_image_ktas_e2e_console_scene()),
    e2eConsoleRegion('control_state', 1072, 242, 126, 18, m.career_image_ktas_e2e_console_control_state()),
    e2eConsoleRegion('players', 1072, 260, 150, 18, m.career_image_ktas_e2e_console_players()),
    e2eConsoleRegion('input_context', 1072, 277, 126, 18, m.career_image_ktas_e2e_console_input_context()),
    e2eConsoleRegion('observation_json', 1087, 316, 88, 23, m.career_image_ktas_e2e_console_observation_json()),
    e2eConsoleRegion('search', 1073, 355, 56, 23, m.career_image_ktas_e2e_console_search()),
    e2eConsoleRegion('all_logs', 1357, 355, 57, 23, m.career_image_ktas_e2e_console_all_logs()),
    e2eConsoleRegion('player_name', 520, 475, 47, 13, m.career_image_ktas_e2e_console_player_name()),
    e2eConsoleRegion('tutorial', 648, 522, 42, 15, m.career_image_ktas_e2e_console_tutorial()),
    e2eConsoleRegion('play', 652, 548, 34, 15, m.career_image_ktas_e2e_console_play()),
    e2eConsoleRegion('settings', 581, 574, 27, 15, m.career_image_ktas_e2e_console_settings()),
    e2eConsoleRegion('quit', 732, 574, 27, 15, m.career_image_ktas_e2e_console_quit()),
    e2eConsoleRegion('fps', 309, 864, 225, 21, m.career_image_ktas_e2e_console_fps()),
    e2eConsoleRegion('camera_lock', 559, 864, 213, 21, m.career_image_ktas_e2e_console_camera_lock()),
    e2eConsoleRegion('take_control', 309, 918, 56, 23, m.career_image_ktas_e2e_console_take_control()),
    e2eConsoleRegion('return_ai', 386, 918, 57, 23, m.career_image_ktas_e2e_console_return_ai()),
    e2eConsoleRegion('camera', 472, 918, 63, 23, m.career_image_ktas_e2e_console_camera()),
    e2eConsoleRegion('record', 557, 918, 55, 23, m.career_image_ktas_e2e_console_record()),
    e2eConsoleRegion('release', 642, 918, 83, 23, m.career_image_ktas_e2e_console_release()),
    e2eConsoleRegion('selected_text', 795, 918, 136, 23, m.career_image_ktas_e2e_console_selected_text()),
    e2eConsoleRegion('send_text', 951, 918, 77, 23, m.career_image_ktas_e2e_console_send_text()),
    e2eConsoleRegion('input_waiting', 302, 951, 147, 21, m.career_image_ktas_e2e_console_input_waiting()),
    e2eConsoleRegion('movement_help', 673, 951, 260, 21, m.career_image_ktas_e2e_console_movement_help()),
    e2eConsoleRegion('controls_help', 300, 974, 52, 21, m.career_image_ktas_e2e_console_controls_help()),
    e2eConsoleRegion('logs_tab', 1083, 974, 49, 18, m.career_image_ktas_e2e_console_logs_tab()),
    e2eConsoleRegion('ai_tab', 1181, 974, 42, 18, m.career_image_ktas_e2e_console_ai_tab()),
    e2eConsoleRegion('tests_tab', 1276, 974, 36, 18, m.career_image_ktas_e2e_console_tests_tab()),
    e2eConsoleRegion('artifacts_tab', 1370, 974, 35, 18, m.career_image_ktas_e2e_console_artifacts_tab()),
  ]);
</script>

<style>
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
              <br />
              <ZoomableImage src={CareerProjectKtasGraphEditor} alt='KTAS Trainer Graph Editor' width={1554} height={1025} />
            </li>
            <li>
              {m.career_contents_project_ktas_trainer_li_2()}
              <br />
              <div class="image-row">
                <ZoomableImage src={CareerProjectKtasE2eConsole} alt='KTAS Trainer E2E Console' width={1505} height={1087} annotations={e2eConsoleAnnotations} />
                <ZoomableImage src={CareerProjectKtasE2eUse} alt='KTAS Trainer E2E Use' width={1190} height={992} annotations={e2eUseAnnotations} />
              </div>
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
