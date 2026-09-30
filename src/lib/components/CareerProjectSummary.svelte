<script lang="ts">
  import type { Snippet } from 'svelte';

  let { tech = [], children }: { tech?: string[]; children?: Snippet } = $props();
</script>

<style>
  .project-summary :global(p) {
    margin: 0 0 .6em;
    line-height: 1.6;
  }
  .project-summary :global(ul) {
    margin: 0 0 .6em;
    padding-left: 1em;
  }
  .project-summary :global(li) {
    margin: .15em 0;
    line-height: 1.6;
  }
  .project-summary .tech-stack {
    margin: 0;
    color: gray;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
    font-size: .8em;
    line-height: 1.6;
    display: flex;
    flex-wrap: wrap;
    column-gap: 1.3ch;
  }
</style>

<div class="project-summary">
  {#if children}
    {@render children()}
  {/if}
  <!--{#if tech.length}
    <p class="tech-stack">{#each tech as item}<span>{item}</span>{/each}</p>
  {/if}-->
</div>
