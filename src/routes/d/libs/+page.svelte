<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import CareerItemDetailContent from '$lib/components/CareerItemDetailContent.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>

<svelte:head>
  <title>{m.detail_libs_title()} · {m.park_jong_hyeon()}</title>
  <meta name="description" content={m.detail_libs_description()} />
</svelte:head>

<CareerItemDetailContent title={m.detail_libs_title()}>
  <p class="introduction">{m.detail_libs_intro()}</p>
  <ul class="link-list">
    <li>
      <ExternalLink href="https://github.com/ShapeLayer/namumark">ShapeLayer/namumark</ExternalLink>
      <ul>
        <li>{m.detail_libs_namumark()}</li>
        <li><ExternalLink href="https://github.com/ShapeLayer/namumark-editor-ast-experimental">ShapeLayer/namumark-editor-ast-experimental</ExternalLink></li>
      </ul>
    </li>
  </ul>
  <ul class="link-list">
    <li>
      <ExternalLink href="https://github.com/ShapeLayer/gfm2polygon-statement">ShapeLayer/gfm2polygon-statement</ExternalLink>
      <ul>
        <li>{m.detail_libs_gfm2polygon()}</li>
        <li><ExternalLink href="https://github.com/ShapeLayer/gfm-online-judge-description-tool">ShapeLayer/gfm-online-judge-description-tool</ExternalLink></li>
      </ul>
    </li>
  </ul>
  <ul class="link-list">
    <li>
      <ExternalLink href="https://github.com/ShapeLayer/hannlp">ShapeLayer/hannlp</ExternalLink>
      <ul>
        <li>{m.detail_libs_hannlp_cran()}</li>
        <li>{m.detail_libs_hannlp_class()}</li>
        <li>{m.detail_libs_hannlp_java()}</li>
        <li>{m.detail_libs_hannlp_rewrite()}</li>
      </ul>
    </li>
  </ul>
  <ul class="link-list">
    <li>
      <ExternalLink href="https://github.com/ShapeLayer/kilo-goal-plugin">ShapeLayer/kilo-goal-plugin</ExternalLink>
      <ul>
        <li>{m.detail_kilo_goal()}</li>
      </ul>
    </li>
  </ul>
  <ul class="link-list">
    <li>
      <ExternalLink href="https://github.com/ShapeLayer/furiruby">ShapeLayer/furiruby</ExternalLink>
      <ul>
        <li>{m.detail_libs_furiruby()}</li>
      </ul>
    </li>
    <li><ExternalLink href="https://github.com/ShapeLayer/ucpc-solutions__typst">ShapeLayer/ucpc-solutions__typst</ExternalLink></li>
  </ul>
</CareerItemDetailContent>

<style>
  .introduction { margin: 0; }
  .link-list { padding-left: 1em; }
  .link-list li { margin: 0.5em 0; overflow-wrap: anywhere; }
  .link-list ul { margin-top: 0.35em; }
</style>
