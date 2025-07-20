<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    children,
    href,
  }: {
    children: Snippet;
    href: string;
  } = $props();
</script>

<svelte:head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=open_in_new" />
</svelte:head>

<style>
  span {
    vertical-align: middle;
  }
</style>

<a href="{href}" class="external-link" target="_blank" rel="noopener noreferrer">
  {@render children()}
  <span class="material-symbols-outlined" style="font-size: 1em;">open_in_new</span>
</a>
