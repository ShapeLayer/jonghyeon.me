<script lang="ts">
  import { getContext } from 'svelte';
  import type { CareerTag } from '$lib/models/careers';
  import type { CareerTagDisplayModes, CareerTagDisplayMode } from '$lib/models/presets';
  import CareerTagChip from '$lib/components/CareerTagChip.svelte';

  let {
    tags,
    variant = 'list',
    expanded = true
  }: {
    tags: CareerTag[];
    /** 'list' sits under an item in the career list, 'detail' inside a detail popup. */
    variant?: 'list' | 'detail';
    /** Whether the non-stack row is shown; stack tags render regardless. */
    expanded?: boolean;
  } = $props();

  const displayModes = getContext<{ modes: CareerTagDisplayModes } | undefined>('career-tag-display-modes');
  let alwaysMode = $derived(displayModes?.modes.always ?? 'always');
  let collapseMode = $derived(displayModes?.modes.collapse ?? 'collapse');

  /** Stack tags (tech labels) and project tags share one row and are always visible,
      project tags trailing at the end of that same line. */
  let alwaysVisibleTags = $derived([
    ...tags.filter((tag) => tag.kind === 'stack'),
    ...tags.filter((tag) => tag.kind === 'project')
  ]);
  let otherTags = $derived(tags.filter((tag) => tag.kind !== 'stack' && tag.kind !== 'project'));
  const isShown = (mode: CareerTagDisplayMode) => mode === 'always' || (mode === 'collapse' && expanded);
  let visibleTagCount = $derived((isShown(alwaysMode) ? alwaysVisibleTags.length : 0) + (isShown(collapseMode) ? otherTags.length : 0));
</script>

<style>
  .career-tag-rows {
    display: flex;
    flex-direction: column;
    gap: .35em;
    margin: .2em 0;
  }
  .career-tag-rows.detail {
    gap: .45em;
    margin: .4em 0;
  }
  .career-tags {
    display: flex;
    flex-wrap: wrap;
    gap: .35em;
  }
  .career-tags.detail {
    gap: .45em;
  }
</style>

{#snippet tagRow(rowTags: CareerTag[])}
  <div class="career-tags" class:detail={variant === 'detail'}>
    {#each rowTags as tag (tag.identifier)}
      <CareerTagChip {tag} {variant} />
    {/each}
  </div>
{/snippet}

{#if visibleTagCount}
  <div class="career-tag-rows" class:detail={variant === 'detail'} aria-label="Career tags">
    {#if isShown(alwaysMode) && alwaysVisibleTags.length}{@render tagRow(alwaysVisibleTags)}{/if}
    {#if isShown(collapseMode) && otherTags.length}{@render tagRow(otherTags)}{/if}
  </div>
{/if}
