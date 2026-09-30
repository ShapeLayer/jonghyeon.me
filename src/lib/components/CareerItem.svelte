<script lang="ts">
  import { type Snippet, getContext, setContext } from 'svelte';
  import { m } from '$lib/paraglide/messages';
  import Popup from '$lib/components/Popup.svelte';
  import CareerTagList from '$lib/components/CareerTagList.svelte';
  import type { Date as CareerDate } from '$lib/models/date';
  import { careerDetailAnchorId, getCareerItem, getCareerTags, matchesCareerPeriod, matchesCareerTags } from '$lib/models/careers';
  import type { CareerTagDisplayModes } from '$lib/models/presets';

  interface CareerListControls {
    selectedTagIdentifiers: string[];
    periodFilter: { start?: CareerDate; end?: CareerDate } | undefined;
    isFiltered: boolean;
    orderOf: (id: string) => number;
  }

  interface CareerPopupRequest {
    pendingId: string | null;
    pendingAnchor?: string;
    request: (id: string, anchor?: string) => void;
    clear: () => void;
  }

  interface Props {
    children?: Snippet;
    detailContent?: Snippet;
    id: string;
    title: string;
    /** Struck through in the title, for a credential that's no longer valid. */
    expired?: boolean;
    /** Keeps startsAt/endsAt driving filtering and sorting, but skips rendering the date next to the title. */
    hideDatetime?: boolean;
  }
  let {
    children,
    detailContent,
    id,
    title,
    expired = false,
    hideDatetime = false
  }: Props = $props();

  /** Dates and tags of the item live in the career model, keyed by id. */
  const { startsAt, endsAt, current = false } = getCareerItem(id) ?? {};

  let datetime: string = $derived(
    `${startsAt?.year ?? ''}${startsAt?.month ? `.${String(startsAt.month).padStart(2, '0')}` : ''}${startsAt?.day ? `.${String(startsAt.day).padStart(2, '0')}` : ''}` +
    `${(endsAt || current) ? '-' : ''}`+
    `${endsAt ? `${endsAt.year}${endsAt.month ? `.${String(endsAt.month).padStart(2, '0')}` : ''}${endsAt.day ? `.${String(endsAt.day).padStart(2, '0')}` : ''}` : current ? m.present() : ''}`
  );
  const tags = getCareerTags(id);
  const tagDisplayModes = getContext<{ modes: CareerTagDisplayModes } | undefined>('career-tag-display-modes');
  let hasExpandableTags = $derived(
    (tagDisplayModes?.modes.primary === 'collapse' && tags.some((tag) => tag.kind === 'stack' || tag.kind === 'project')) ||
    ((tagDisplayModes?.modes.secondary ?? 'collapse') === 'collapse' && tags.some((tag) => tag.kind !== 'stack' && tag.kind !== 'project'))
  );
  let isExpanded = $state(false);
  const listControls = getContext<CareerListControls | undefined>('career-list-controls');
  /** Parent sections decide which default and hidden entries are mounted; filters apply to every mounted entry. */
  let isVisible = $derived(
    matchesCareerTags(id, listControls?.selectedTagIdentifiers ?? []) &&
    matchesCareerPeriod(id, listControls?.periodFilter?.start, listControls?.periodFilter?.end)
  );
  let listOrder = $derived(listControls?.orderOf(id) ?? 0);
  /** Behind the expand toggle in the default view, unless a filter already surfaced it; stack tags stay visible regardless. */
  let tagsExpanded = $derived(isExpanded || Boolean(listControls?.isFiltered));

  setContext('career-tags', tags);

  let rootElement: HTMLDivElement | null = $state(null);
  let popupComponent: Popup | null = $state(null);

  /** A tag elsewhere on the page (e.g. a project tag) can ask to open this item's popup. */
  const popupRequest = getContext<CareerPopupRequest | undefined>('career-popup-request');
  /** Items under a project tag keep their details in that project's popup, opened at their own section. */
  const detailTargetId = tags.find((tag) => tag.opensItemId && tag.opensItemId !== id)?.opensItemId;
  let hasDetail = $derived(Boolean(detailContent) || Boolean(detailTargetId));

  const onClickHandler = () => {
    if (detailContent) {
      popupComponent?.open();
    } else if (detailTargetId) {
      popupRequest?.request(detailTargetId, careerDetailAnchorId(id));
    } else if (hasExpandableTags) isExpanded = !isExpanded;
  };

  $effect(() => {
    if (detailContent && popupRequest?.pendingId === id) {
      popupComponent?.open(popupRequest.pendingAnchor);
      popupRequest.clear();
    }
  });
</script>

<style>
  .career-item {
    position: relative;
    padding: .2em .3em;
    border-radius: 4px;
    margin: .3em 0;
  }
  /* Resting state carries no shading; the fill is what the pointer reveals. */
  :global(.career-item.interactive.has-detail) {
    background-color: transparent;
    cursor: pointer;
    transition: background-color .2s;
  }
  :global(.career-item.interactive.has-detail:hover),
  :global(.career-item.interactive.has-detail:focus-visible) {
    background-color: rgba(0, 0, 0, 0.07);
  }
  .career-item-wrapper {
    position: relative;
    padding-left: 1em;
    margin: .1em 0;
  }
  .career-item-wrapper::before {
    content: "»";
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: center;
    top: 0;
    left: 0em;
    padding-top: .1em; /* font-size of .career-title is over .1em */
  }
  .career-title {
    display: inline-flex;
    align-items: center;
    gap: .2em;
    font-size: 1.1em;
  }
  .career-title-content.expired {
    text-decoration: line-through;
  }
  /* Floats over the start of the item: shrunk into the top-left corner at rest,
     grown to full size and centered on the first title line while the item is hovered. */
  .career-detail-button {
    --size: 1.7em;
    --title-line: calc(1.1em * 1.6); /* .career-title font-size × body line-height */
    position: absolute;
    top: 0;
    left: 4pt;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--size);
    height: var(--size);
    border-radius: 6px;
    background-color: var(--base-bg-color);
    color: var(--base-fg-color);
    box-shadow: 0 1px 2px rgba(0, 0, 0, .12), 0 3px 8px rgba(0, 0, 0, .14);
    cursor: pointer;
    transform: scale(.55);
    transform-origin: top left;
    transition: transform .2s ease, top .2s ease, background-color .12s ease, box-shadow .2s ease;
  }
  .career-detail-button .material-symbols-outlined {
    display: block;
    font-size: 1.15em;
    line-height: 1;
  }
  :global(.career-item.has-detail:hover) .career-detail-button,
  :global(.career-item.has-detail:focus-visible) .career-detail-button {
    top: calc(.3em + (var(--title-line) - var(--size)) / 2); /* item padding + summary offset */
    transform: scale(1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 6px 14px rgba(0, 0, 0, .18);
  }
  :global(.career-item.has-detail:active) .career-detail-button {
    background-color: var(--base-bg-color-dark);
  }
  .career-detail-button[data-tooltip]::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    width: max-content;
    padding: .55em .75em;
    border-radius: 6px;
    background: var(--base-fg-color);
    color: var(--base-bg-color);
    font-family: 'Pretendard', 'Noto Sans KR', -apple-system, sans-serif;
    font-size: .8em;
    font-weight: normal;
    line-height: 1.45;
    white-space: nowrap;
    box-shadow: 0 6px 16px rgba(0, 0, 0, .2);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    /* The tooltip is positioned above the icon; animate from farther above so
       the tooltip body does not cover the arrow while it enters. */
    transform: translate(-50%, -4px);
    transition: opacity .15s ease, transform .15s ease;
    z-index: 30;
  }
  .career-detail-button[data-tooltip]:hover::after,
  .career-detail-button[data-tooltip]:focus-visible::after {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, 0);
  }
  .career-summary {
    display: inline-block;
  }
  .career-datetime {
    display: inline-block;
    color: var(--base-fg-color-brighter);
    font-size: .7em;
    font-style: italic;
    vertical-align: middle;
    white-space: nowrap;
  }
  .career-datetime span {
    display: inline;
    padding: 0;
    margin: 0;
    vertical-align: bottom;
  }
  .career-detail {
    font-size: .8em;
  }
  @media (max-width: 600px) {
    .career-datetime {
      display: block;
    }
  }
</style>

<div class="career-entry" data-tags={tags.map((tag) => tag.identifier).join(' ')} style:order={listOrder} hidden={!isVisible}>
<div id={id} class:interactive={hasDetail || hasExpandableTags} class:has-detail={hasDetail} class="career-item" bind:this={rootElement} onclick={onClickHandler} role="button" tabindex="0" onkeydown={(event) => (event.key === 'Enter' || event.key === ' ') && onClickHandler()}>
  {#if hasDetail}
    <span class="career-detail-button" data-tooltip={m.career_detail_tooltip()} aria-label={m.career_detail_tooltip()}>
      <span class="material-symbols-outlined" aria-hidden="true">right_panel_close</span>
    </span>
  {/if}
  <div class="career-item-wrapper">
    <div class="career-summary">
      <span class="career-title">
        <span class="career-title-content" class:expired>
          {title}
        </span>
      </span>
      {#if !hideDatetime}
        <div class="career-datetime">{datetime}</div>
      {/if}
    </div>
    {#if tags.length}
      <CareerTagList {tags} expanded={tagsExpanded} />
    {/if}
    <p class="career-detail">
      {@render children?.()}
    </p>
  </div>
</div>
{#if detailContent}
  <div id={`${id}-detail`}>
    <Popup bind:this={popupComponent}>
      {@render detailContent()}
    </Popup>
  </div>
{/if}
</div>
