<script lang="ts">
  import type { Snippet } from 'svelte';
  import CareerTagList from '$lib/components/CareerTagList.svelte';
  import { getCareerSubItemTags } from '$lib/models/careers';

  let {
    id,
    title,
    subtitle,
    children
  }: {
    /** Sub-entry id declared on the parent item, which is where its tags come from. */
    id: string;
    title: string;
    subtitle?: string;
    children?: Snippet;
  } = $props();
  const tags = getCareerSubItemTags(id);
</script>

<style>
  .subsection {
    margin: 1.6em 0 0;
    padding-top: 1.2em;
    border-top: 1px solid rgba(0, 0, 0, .1);
    flex-direction: column;
  }
  h3 {
    margin: 0;
    font-size: 1.1em;
  }
  h4 {
    margin: .2em 0 0;
    font-size: .85em;
    font-style: italic;
    font-weight: normal;
    color: gray;
  }
</style>

<section class="subsection" {id}>
  <h3>{title}</h3>
  {#if subtitle}
    <h4>{subtitle}</h4>
  {/if}
  <CareerTagList {tags} variant="detail" />
  {#if children}
    {@render children()}
  {/if}
</section>
