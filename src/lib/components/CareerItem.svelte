<script lang="ts">
  import type { Snippet } from 'svelte';
  import { m } from '$lib/paraglide/messages';
  import type { Date } from '$lib/models/date';

  interface Props {
    children: Snippet;
    id: string;
    title: string;
    startsAt?: Date;
    endsAt?: Date;
    current?: boolean;
  }
  let {
    children,
    id,
    title,
    startsAt,
    endsAt,
    current = false
  }: Props = $props();

  let datetime: string = $derived(
    `${startsAt?.year}${startsAt?.month ? `.${String(startsAt.month).padStart(2, '0')}` : ''}${startsAt?.day ? `.${String(startsAt.day).padStart(2, '0')}` : ''}` + 
    `${endsAt || current ? '-' : ''}`+ 
    `${endsAt ? `${endsAt.year}${endsAt.month ? `.${String(endsAt.month).padStart(2, '0')}` : ''}${endsAt.day ? `.${String(endsAt.day).padStart(2, '0')}` : ''}` : current ? m.present() : ''}`
  );
</script>

<style>
  .career-item {
    position: relative;
    padding-left: 1em;
    margin: .1em 0;
  }
  .career-item::before {
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

<div id={id} class="career-item">
  <div class="career-summary">
    <span class="career-title">{title}</span>
    <div class="career-datetime">{datetime}</div>
  </div>
  <p class="career-detail">
    {@render children?.()}
  </p>
</div>
