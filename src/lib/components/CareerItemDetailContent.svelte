<script lang="ts">
  import { type Snippet, getContext } from 'svelte';
  import CareerTagList from '$lib/components/CareerTagList.svelte';
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
  <CareerTagList {tags} variant="detail" />
  <div class="content">
  {#if children}
    {@render children()}
  {/if}
  </div>
</div>
