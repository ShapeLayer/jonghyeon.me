<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<svelte:head>
  <title>{m.detail_ktas_title()} · {m.park_jong_hyeon()}</title>
  <meta name="description" content={m.detail_ktas_description()} />
</svelte:head>

<CareerItemDetailContent title={m.detail_ktas_title()}>
  <p class="introduction">{m.detail_ktas_intro()}</p>
  <ul class="link-list">
    <li>{m.detail_ktas_mirror()}: <ExternalLink href="https://github.com/jnu-triage-2025/ktas-trainer-mirror">jnu-triage-2025/ktas-trainer-mirror</ExternalLink></li>
  </ul>
  <ul class="link-list">
    <li>
      {m.detail_ktas_cellular()}
      <ul>
        <li>{m.detail_ktas_cellular_progress()}</li>
        <li><ExternalLink href="https://github.com/ShapeLayer/cellular">ShapeLayer/cellular</ExternalLink></li>
      </ul>
    </li>
  </ul>
  <ul class="link-list">
    <li>
      {m.detail_kilo_goal()}
      <ul>
        <li>{m.detail_ktas_kilo_reason()}</li>
        <li>{m.detail_ktas_kilo_limitation()}</li>
        <li><ExternalLink href="https://github.com/ShapeLayer/kilo-goal-plugin">ShapeLayer/kilo-goal-plugin</ExternalLink></li>
      </ul>
    </li>
  </ul>
  <ul class="link-list">
    <li>
      {m.detail_ktas_unity_merge()}
      <ul>
        <li>{m.detail_ktas_unity_uuid()}</li>
        <li>{m.detail_ktas_unity_tracking()}</li>
        <li>{m.detail_ktas_unity_breakage()}</li>
        <li>{m.detail_ktas_unity_solution()}</li>
        <li><ExternalLink href="https://github.com/ShapeLayer/unity-merge">ShapeLayer/unity-merge</ExternalLink></li>
      </ul>
    </li>
  </ul>
</CareerItemDetailContent>

<style>
  .introduction { margin: 0; }
  .link-list { padding-left: 1em; }
  .link-list li { margin: 0.5em 0; overflow-wrap: anywhere; }
  .link-list ul { padding-left: 1.4em; }
</style>
