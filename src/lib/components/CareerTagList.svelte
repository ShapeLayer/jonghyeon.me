<script lang="ts">
  import { getContext } from 'svelte';
  import type { CareerTag } from '$lib/models/careers';
  import type { CareerDetailTagVisibility, CareerTagDisplayModes, CareerTagDisplayMode } from '$lib/models/presets';
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
  let primaryMode = $derived(displayModes?.modes.primary ?? 'always');
  let secondaryMode = $derived(displayModes?.modes.secondary ?? 'collapse');

  /** Stack tags (tech labels) and project tags share one row and are always visible,
      project tags trailing at the end of that same line. */
  let primaryTags = $derived([
    ...tags.filter((tag) => tag.kind === 'stack'),
    ...tags.filter((tag) => tag.kind === 'project')
  ]);
  let secondaryTags = $derived(tags.filter((tag) => tag.kind !== 'stack' && tag.kind !== 'project'));
  const isShown = (mode: CareerTagDisplayMode) => mode === 'always' || (mode === 'collapse' && expanded);

  /** Detail popups follow their own visibility preset instead of the list's display modes. */
  const detailVisibility = getContext<{ visibility: CareerDetailTagVisibility } | undefined>('career-detail-tag-visibility');
  const isShownInDetail = (tag: CareerTag, groupShown: boolean) => {
    const { show = [], hide = [] } = detailVisibility?.visibility ?? {};
    if (show.includes(tag.identifier)) return true;
    if (hide.includes(tag.identifier)) return false;
    if (show.includes(tag.kind)) return true;
    if (hide.includes(tag.kind)) return false;
    return groupShown;
  };
  const visibleRow = (rowTags: CareerTag[], mode: CareerTagDisplayMode, detailGroupShown: boolean) =>
    variant === 'detail' ? rowTags.filter((tag) => isShownInDetail(tag, detailGroupShown)) : isShown(mode) ? rowTags : [];
  let shownPrimaryTags = $derived(visibleRow(primaryTags, primaryMode, detailVisibility?.visibility.primary ?? true));
  let shownSecondaryTags = $derived(visibleRow(secondaryTags, secondaryMode, detailVisibility?.visibility.secondary ?? true));
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

{#if shownPrimaryTags.length || shownSecondaryTags.length}
  <div class="career-tag-rows" class:detail={variant === 'detail'} aria-label="Career tags">
    {#if shownPrimaryTags.length}{@render tagRow(shownPrimaryTags)}{/if}
    {#if shownSecondaryTags.length}{@render tagRow(shownSecondaryTags)}{/if}
  </div>
{/if}
