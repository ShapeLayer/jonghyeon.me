<script lang="ts">
  import type { Snippet } from 'svelte';
  import CareerTagList from '$lib/components/CareerTagList.svelte';
  import { getCareerSubItemTags } from '$lib/models/careers';

  let {
    id,
    title,
    subtitle,
    divider = true,
    children
  }: {
    /** Sub-entry id declared on the parent item, which is where its tags come from. */
    id: string;
    title: string;
    subtitle?: string;
    /** Whether to draw the separator above this subsection. */
    divider?: boolean;
    children?: Snippet;
  } = $props();
  const tags = getCareerSubItemTags(id);
</script>

<style>
  .subsection {
    margin: .65em 0 .35em;
    padding-top: .75em;
    flex-direction: column;
  }
  .subsection.with-divider {
    border-top: 1px solid rgba(0, 0, 0, .1);
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

<section class="subsection" class:with-divider={divider} {id}>
  <h3>{title}</h3>
  {#if subtitle}
    <h4>{subtitle}</h4>
  {/if}
  <CareerTagList {tags} variant="detail" />
  {#if children}
    {@render children()}
  {/if}
</section>
