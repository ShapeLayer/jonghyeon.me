<script lang="ts">
  import LocaleSelector from "$lib/components/LocaleSelector.svelte";

  let scrollY: number = 0;
  let localeSelectorNavElement: HTMLElement | null = null;

  const handleScrollY = (e?: Event) => {
    if (scrollY < 100) {
      localeSelectorNavElement.style.display = 'none';
    } else {
      localeSelectorNavElement.style.display = 'block';
    }
  }
</script>

<svelte:window
  bind:scrollY={scrollY}
  onscroll={handleScrollY}
/>

<style>
  .locale-selector-nav {
    position: fixed;
    display: none;
    top: 1rem;
    right: 1rem;
    z-index: 1000;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 0.5rem;
    padding: 0.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
</style>

<div class="locale-selector-nav" bind:this={localeSelectorNavElement}>
  <LocaleSelector />
</div>
