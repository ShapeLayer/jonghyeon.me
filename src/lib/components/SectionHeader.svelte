<!-- Usage
<SectionHeader>
  Main Title
  {#snippet subtitle()}Subtitle{/snippet}
</SectionHeader>
-->

<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    children,
    subtitle,
    fontSize,
  }: {
    children: Snippet
    subtitle?: Snippet
    fontSize?: string
  } = $props();
</script>

<style>
  sup {
    margin-left: .2em;
    font-weight: normal;
    vertical-align: inherit;
  }
</style>

<div>
  <h2 style="{fontSize ? `font-size: ${fontSize}` : ''}">
    {@render children()}
    {#if subtitle}
    <sup>
      {@render subtitle()}
    </sup>
    {/if}
  </h2>
</div>
