<script lang="ts">
  import type { Snippet } from 'svelte';
  import CareerTagList from '$lib/components/CareerTagList.svelte';
  import { careerDetailAnchorId, getCareerSubItemTags, getCareerTags } from '$lib/models/careers';

  let {
    id,
    itemId,
    title,
    subtitle,
    children
  }: {
    /** Sub-entry id declared on the parent item, which is where its tags come from. */
    id?: string;
    /** A career item whose details live here instead of in a popup of its own; it opens this popup at this section. */
    itemId?: string;
    title: string;
    subtitle?: string;
    children?: Snippet;
  } = $props();
  /** The popup's own project tag is left out, since the whole popup is about that project. */
  let tags = $derived(itemId ? getCareerTags(itemId).filter((tag) => !tag.opensItemId) : getCareerSubItemTags(id ?? ''));
  let anchorId = $derived(itemId ? careerDetailAnchorId(itemId) : id);
</script>

<style>
  .subsection {
    margin: .65em 0 .35em;
    padding-top: .75em;
    padding-inline: 0;
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

<section class="subsection" id={anchorId}>
  <h3>{title}</h3>
  {#if subtitle}
    <h4>{subtitle}</h4>
  {/if}
  <CareerTagList {tags} variant="detail" />
  {#if children}
    {@render children()}
  {/if}
</section>
