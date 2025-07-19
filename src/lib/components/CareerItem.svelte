<script lang="ts">
  import type { Snippet } from 'svelte';
	import { m } from '$lib/paraglide/messages.js';
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
    display: flex;
    gap: .5em;
  }
  .career-datetime {
    display: flex;
    font-size: .7em;
    font-style: italic;
    align-items: center;
    color: var(--base-fg-color-brighter);
  }
  .career-detail {
    font-size: .8em;
  }
</style>

<div id={id} class="career-item">
  <p class="career-summary">
    <span class="career-title">{title}</span>
    <span class="career-datetime">
      {#if startsAt}
      <span><!-- starts at -->
        {startsAt.year}.{String(startsAt.month).padStart(2, '0')}{#if startsAt.day !== undefined}.{String(startsAt.day).padStart(2, '0')}{/if}
      </span>
      {#if current || endsAt}
      <span>-</span>
      {/if}
      
      
      <span><!-- ends at -->
        {#if endsAt}
          {endsAt.year}.{String(endsAt.month).padStart(2, '0')}
          {#if endsAt.day !== undefined}
          .{String(endsAt.day).padStart(2, '0')}
          {/if}
        {:else if current}
          {m.present()}
        {:else}
        {/if}
      </span>
      {/if}
    </span>
  </p>
  <p class="career-detail">
    {@render children?.()}
  </p>
</div>
