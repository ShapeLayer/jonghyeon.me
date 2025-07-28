<script lang="ts">
  import { type Snippet, onMount } from 'svelte';
  import { m } from '$lib/paraglide/messages';
  import type { Date } from '$lib/models/date';
  import Popup from '$lib/components/Popup.svelte';

  interface Props {
    children: Snippet;
    detailContent?: Snippet;
    id: string;
    title: string;
    startsAt?: Date;
    endsAt?: Date;
    current?: boolean;
  }
  let {
    children,
    detailContent,
    id,
    title,
    startsAt,
    endsAt,
    current = false
  }: Props = $props();

  let datetime: string = $derived(
    `${startsAt?.year ?? ''}${startsAt?.month ? `.${String(startsAt.month).padStart(2, '0')}` : ''}${startsAt?.day ? `.${String(startsAt.day).padStart(2, '0')}` : ''}` + 
    `${(endsAt || current) ? '-' : ''}`+ 
    `${endsAt ? `${endsAt.year}${endsAt.month ? `.${String(endsAt.month).padStart(2, '0')}` : ''}${endsAt.day ? `.${String(endsAt.day).padStart(2, '0')}` : ''}` : current ? m.present() : ''}`
  );

  let rootElement: HTMLDivElement | null = $state(null);
  let popupComponent: Popup | null = $state(null);

  const mountDetailContent = () => {
    if (!detailContent || !rootElement) return;
    rootElement?.classList.add('details-contained');
  }
  const onClickHandler = () => {
    popupComponent?.open();
  }

  const init = () => {
    mountDetailContent();
  }

  onMount(init);
</script>

<style>
  .career-item {
    padding: .2em .3em;
    border-radius: 4px;
    margin: .3em 0;
  }
  :global(.career-item.details-contained) {
    background-color: rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: background-color .2s;
  }
  :global(.career-item.details-contained:hover) {
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
</style>

<div
  id={id}
  class="career-item"
  bind:this={rootElement}
  onclick={onClickHandler}
>
  <div class="career-item-wrapper">
    <div class="career-summary">
      <span class="career-title">{title}</span>
      <div class="career-datetime">{datetime}</div>
    </div>
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
