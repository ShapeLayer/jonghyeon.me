<script lang="ts">
  import { type Snippet, getContext, setContext } from 'svelte';
  import { m } from '$lib/paraglide/messages';
  import Popup from '$lib/components/Popup.svelte';
  import { getCareerItem, getCareerTags, matchesCareerTags } from '$lib/models/careers';

  interface CareerListControls {
    selectedTagIdentifiers: string[];
    isFiltered: boolean;
    orderOf: (id: string) => number;
  }

  interface Props {
    children?: Snippet;
    detailContent?: Snippet;
    id: string;
    title: string;
  }
  let {
    children,
    detailContent,
    id,
    title
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
  let isVisible = $derived(matchesCareerTags(id, listControls?.selectedTagIdentifiers ?? []));
  let listOrder = $derived(listControls?.orderOf(id) ?? 0);
  /** Without the section headings the tags are what tells the items apart. */
  let showTags = $derived(tags.length > 0 && (isExpanded || Boolean(listControls?.isFiltered)));

  setContext('career-tags', tags);

  let rootElement: HTMLDivElement | null = $state(null);
  let popupComponent: Popup | null = $state(null);

  const onClickHandler = () => {
    if (detailContent) popupComponent?.open();
    else isExpanded = !isExpanded;
  };
</script>

<style>
  .career-item {
    padding: .2em .3em;
    border-radius: 4px;
    margin: .3em 0;
  }
  :global(.career-item.interactive) {
    background-color: rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: background-color .2s;
  }
  :global(.career-item.interactive:hover) {
    background-color: rgba(0, 0, 0, 0.1);
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
    font-size: 1.1em;
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
  .career-tags {
    display: flex;
    flex-wrap: wrap;
    gap: .35em;
    margin: .35em 0 0;
  }
  .career-tag {
    border-radius: 999px;
    font-size: .7em;
    font-style: normal;
    line-height: 1;
    padding: .4em .55em;
  }
</style>

<div class="career-entry" data-tags={tags.map((tag) => tag.identifier).join(' ')} style:order={listOrder} hidden={!isVisible}>
<div id={id} class:interactive={Boolean(detailContent) || tags.length > 0} class="career-item" bind:this={rootElement} onclick={onClickHandler} role="button" tabindex="0" onkeydown={(event) => (event.key === 'Enter' || event.key === ' ') && onClickHandler()}>
  <div class="career-item-wrapper">
    <div class="career-summary">
      <span class="career-title">{title}</span>
      <div class="career-datetime">{datetime}</div>
    </div>
    <p class="career-detail">
      {@render children?.()}
    </p>
    {#if showTags}
      <div class="career-tags" aria-label="Career tags">
        {#each tags as tag (tag.identifier)}
          <span class="career-tag" style:background-color={tag.backgroundColor} style:color={tag.foregroundColor} title={tag.description()}>{tag.displayName()}</span>
        {/each}
      </div>
    {/if}
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
