<script lang="ts">
  import { type Snippet, getContext, setContext } from 'svelte';
  import { m } from '$lib/paraglide/messages';
  import Popup from '$lib/components/Popup.svelte';
  import CareerTagList from '$lib/components/CareerTagList.svelte';
  import type { Date as CareerDate } from '$lib/models/date';
  import { getCareerItem, getCareerTags, matchesCareerPeriod, matchesCareerTags } from '$lib/models/careers';

  interface CareerListControls {
    selectedTagIdentifiers: string[];
    periodFilter: { start?: CareerDate; end?: CareerDate } | undefined;
    isFiltered: boolean;
    orderOf: (id: string) => number;
  }

  interface CareerPopupRequest {
    pendingId: string | null;
    request: (id: string) => void;
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

  const onClickHandler = () => {
    if (detailContent) popupComponent?.open();
    else isExpanded = !isExpanded;
  };

  /** A tag elsewhere on the page (e.g. a project tag) can ask to open this item's popup. */
  const popupRequest = getContext<CareerPopupRequest | undefined>('career-popup-request');
  $effect(() => {
    if (detailContent && popupRequest?.pendingId === id) {
      popupComponent?.open();
      popupRequest.clear();
    }
  });
</script>

<style>
  .career-item {
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
  .career-detail-icon {
    position: relative;
    cursor: help;
  }
  .career-detail-icon[data-tooltip]::after {
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
  .career-detail-icon[data-tooltip]:hover::after,
  .career-detail-icon[data-tooltip]:focus-visible::after {
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
<div id={id} class:interactive={Boolean(detailContent) || tags.length > 0} class:has-detail={Boolean(detailContent)} class="career-item" bind:this={rootElement} onclick={onClickHandler} role="button" tabindex="0" onkeydown={(event) => (event.key === 'Enter' || event.key === ' ') && onClickHandler()}>
  <div class="career-item-wrapper">
    <div class="career-summary">
      <span class="career-title">
        <span class="career-title-content" class:expired>
          {title}
          {#if detailContent}
            <span class="material-symbols-outlined career-detail-icon" style="font-size: 1em; vertical-align: middle;" data-tooltip={m.career_detail_tooltip()} aria-label={m.career_detail_tooltip()}>right_panel_close</span>
          {/if}
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
