<script lang="ts">
  import { type Snippet, getContext } from 'svelte';
  import type { CareerTag } from '$lib/models/careers';

  let {
    title,
    subtitle,
    children
  }: {
    title: string;
    subtitle?: string;
    children?: Snippet;
  } = $props();
  const tags = getContext<CareerTag[]>('career-tags') ?? [];
</script>

<style>
  h2 {
    margin: 0;
    font-size: 1.5em;
  }
  h3 {
    margin: 0;
    font-size: .9em;
    font-style: italic;
    font-weight: normal;
    color: gray;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin: 1em 0;
    overflow: hidden;
  }
  .career-tags {
    display: flex;
    flex-wrap: wrap;
    gap: .45em;
    margin: .8em 0 0;
  }
  .career-tag {
    border-radius: 999px;
    font-size: .75em;
    line-height: 1;
    padding: .45em .65em;
  }
  :global(.content p) {
    line-height: 1.6;
    margin-bottom: 1.2em;
  }
</style>

<div>
  <h2>{title}</h2>
  {#if subtitle}
    <h3>{subtitle}</h3>
  {/if}
  {#if tags.length}
    <div class="career-tags" aria-label="Career tags">
      {#each tags as tag (tag.identifier)}
        <span class="career-tag" style:background-color={tag.backgroundColor} style:color={tag.foregroundColor} title={tag.description()}>{tag.displayName()}</span>
      {/each}
    </div>
  {/if}
  <div class="content">
  {#if children}
    {@render children()}
  {/if}
  </div>
</div>
