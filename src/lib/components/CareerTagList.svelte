<script lang="ts">
  import type { CareerTag } from '$lib/models/careers';
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

  /** Stack tags (tech labels) and project tags share one row and are always visible,
      project tags trailing at the end of that same line. */
  let alwaysVisibleTags = $derived([
    ...tags.filter((tag) => tag.kind === 'stack'),
    ...tags.filter((tag) => tag.kind === 'project')
  ]);
  let otherTags = $derived(tags.filter((tag) => tag.kind !== 'stack' && tag.kind !== 'project'));
  let visibleTagCount = $derived(alwaysVisibleTags.length + (expanded ? otherTags.length : 0));
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
    margin: .8em 0 0;
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
    {#if alwaysVisibleTags.length}{@render tagRow(alwaysVisibleTags)}{/if}
    {#if expanded && otherTags.length}{@render tagRow(otherTags)}{/if}
  </div>
{/if}
