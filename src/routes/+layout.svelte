<script lang="ts">
  import '../app.css';
  
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { setLocale } from '$lib/paraglide/runtime';
  import LocaleSelector from '$lib/components/LocaleSelector.svelte';
  import LocaleSelectorNav from '$lib/components/LocaleSelectorNav.svelte';

  let { children } = $props();
  
  /* start i18n support */
  const initLocale = () => {
    if (browser) {
      switch (window.navigator.language) {
        case 'ko':
          setLocale('ko');
          break;
        case 'en':
        default:
          setLocale('en');
          break;
      }
    }
  }
  /* end i18n support */

  const init = () => {
    initLocale();
  }

  onMount(init);
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Reenie+Beanie&display=swap" rel="stylesheet">
</svelte:head>

{@render children()}
