<script lang="ts">
  import '../app.css';
  
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { setLocale } from '$lib/paraglide/runtime';
  import { m } from '$lib/paraglide/messages';

  import GoogleAnalytics from '$lib/includes/GoogleAnalytics.svelte';

  let { children } = $props();
  
  /* start i18n support */
  const initLocale = () => {
    if (browser) {
      // Check if user has manually set a locale preference
      const savedLocale = localStorage.getItem('user-locale-preference');
      
      if (savedLocale) {
        // User has a saved preference, use it
        setLocale(savedLocale as any);
      } else {
        // No saved preference, auto-detect from browser
        let language = window.navigator.language;
        if (language.includes('ko') || language.includes('kr')) {
          setLocale('ko');
        } else if (language.includes('ja') || language.includes('jp')) {
          setLocale('ja');
        } else if (language.includes('en')) {
          setLocale('en');
        } else {
          // Default to English if no specific locale is detected
          setLocale('en');
        }
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
  <title>{m.park_jong_hyeon()} (@ShapeLayer)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Reenie+Beanie&display=swap" rel="stylesheet">
</svelte:head>

<GoogleAnalytics />

{@render children()}
