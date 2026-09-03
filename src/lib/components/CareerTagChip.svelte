<script lang="ts">
  import { getContext } from 'svelte';
  import type { CareerTag } from '$lib/models/careers';

  let {
    tag,
    variant = 'list'
  }: {
    tag: CareerTag;
    /** 'list' sits under an item in the career list, 'detail' inside a detail popup. */
    variant?: 'list' | 'detail';
  } = $props();

  interface CareerPopupRequest {
    pendingId: string | null;
    request: (id: string) => void;
    clear: () => void;
  }
  const popupRequest = getContext<CareerPopupRequest | undefined>('career-popup-request');

  /** Opens the referenced item's popup instead of bubbling into the chip's own career item. */
  const onClickHandler = (event: MouseEvent) => {
    if (!tag.opensItemId) return;
    event.stopPropagation();
    popupRequest?.request(tag.opensItemId);
  };
</script>

<style>
  .career-tag {
    position: relative;
    font-size: .7em;
    font-style: normal;
    line-height: 1;
    padding: .4em .55em;
    cursor: default;
  }
  .career-tag.clickable {
    cursor: pointer;
  }
  .career-tag.detail {
    font-size: .75em;
    padding: .45em .65em;
  }

  /* General tags: full pill shape. */
  .career-tag.general {
    border-radius: 999px;
  }

  /* Stack tags (tech labels): a tighter, badge-like curvature instead of a pill. */
  .career-tag.stack {
    border-radius: 4px;
  }

  /* A custom-styled tooltip rather than the browser's native `title` bubble, so it can carry the site's own look.
     Scoped to [data-tooltip] so tags without a description (e.g. bare stack labels) render no tooltip at all. */
  .career-tag[data-tooltip]::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    width: max-content;
    max-width: 16em;
    padding: .55em .75em;
    border-radius: 6px;
    background: var(--base-fg-color);
    color: var(--base-bg-color);
    font-size: 1.2em;
    font-weight: normal;
    line-height: 1.45;
    text-align: left;
    white-space: normal;
    box-shadow: 0 6px 16px rgba(0, 0, 0, .2);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    /* The tooltip is positioned above the tag, so animate from farther above it.
       Starting below would make the tooltip cover its own arrow during the transition. */
    transform: translate(-50%, -4px);
    transition: opacity .15s ease, transform .15s ease;
    z-index: 30;
  }
  .career-tag.detail[data-tooltip]::after { font-size: 1.15em; }
  .career-tag[data-tooltip]::before {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    border: 5px solid transparent;
    border-top-color: var(--base-fg-color);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translate(-50%, -4px);
    transition: opacity .15s ease, transform .15s ease;
    z-index: 31;
  }
  .career-tag[data-tooltip]:hover::after, .career-tag[data-tooltip]:hover::before,
  .career-tag[data-tooltip]:focus-visible::after, .career-tag[data-tooltip]:focus-visible::before {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, 0);
  }

  /* The first tag in a row sits at the left edge of the content column, so a centered tooltip
     can overflow off-screen to the left. Anchor it to the chip's left edge instead. */
  .career-tag:first-child[data-tooltip]::after {
    left: 0;
    transform: translate(0, -4px);
  }
  .career-tag:first-child[data-tooltip]::before {
    left: .9em;
    transform: translate(0, -4px);
  }
  .career-tag:first-child[data-tooltip]:hover::after, .career-tag:first-child[data-tooltip]:hover::before,
  .career-tag:first-child[data-tooltip]:focus-visible::after, .career-tag:first-child[data-tooltip]:focus-visible::before {
    transform: translate(0, 0);
  }
</style>

<span
  class="career-tag"
  class:stack={tag.kind === 'stack'}
  class:general={tag.kind !== 'stack'}
  class:detail={variant === 'detail'}
  class:clickable={Boolean(tag.opensItemId)}
  style:background-color={tag.backgroundColor}
  style:color={tag.foregroundColor}
  data-tooltip={tag.description ? tag.description() : undefined}
  role={tag.opensItemId ? 'button' : undefined}
  tabindex={tag.opensItemId ? 0 : undefined}
  onclick={onClickHandler}
  onkeydown={(event) => (event.key === 'Enter' || event.key === ' ') && onClickHandler(event as unknown as MouseEvent)}
>{tag.displayName()}</span>
