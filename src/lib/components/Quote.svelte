<script lang="ts">
  import type { Snippet } from 'svelte';
  import ExternalLink from './ExternalLink.svelte';

  let {
    children,
    sourceTitle,
    sourceUrl
  }: {
    children: Snippet;
    sourceTitle?: string;
    sourceUrl?: string;
  } = $props();
</script>

<figure>
  <blockquote cite={sourceUrl}>
    {@render children()}
  </blockquote>
  {#if sourceTitle}
    <figcaption>
      <cite>
        {#if sourceUrl}
          <ExternalLink href={sourceUrl}>{sourceTitle}</ExternalLink>
        {:else}
          {sourceTitle}
        {/if}
      </cite>
    </figcaption>
  {/if}
</figure>

<style>
  figure {
    margin: 1.5em 0;
    padding-inline-start: 1.25em;
    border-inline-start: 3px solid var(--base-bg-color-darker);
    line-height: 1.6;
    color: var(--base-fg-color-brighter);
    font-size: 0.8em;
    overflow-wrap: anywhere;
  }

  blockquote {
    margin: 0;
  }

  figcaption {
    margin-top: 0.75em;
    font-size: 0.9em;
    color: var(--base-fg-color-brighter);
  }

  cite {
    font-style: normal;
  }
</style>
