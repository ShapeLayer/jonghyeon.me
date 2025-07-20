<script lang="ts">
  import { onMount } from 'svelte';
  import { getLocale, setLocale } from '$lib/paraglide/runtime';
  import { derived } from 'svelte/store';
  import { render } from 'svelte/server';


  const renderCurrentLocale = () => {
    const locale = getLocale();
    switch (locale) {
      case 'en':
        return '🇺🇸';
      case 'ko':
        return '🇰🇷';
      return '🌐';
    }
  }

  const init = () => {

  }

  let locale = $derived(renderCurrentLocale());

  onMount(init);
</script>

<div class="locale-selector">
  <button
    id="locale-selector-button"
    type="button"
    aria-haspopup="listbox"
    aria-expanded="false"
  >
    <span>{locale}</span>
    <svg viewBox="0 0 16 16">
      <path fill-rule="evenodd"
            d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
            clip-rule="evenodd"/>
    </svg>
  </button>

  <ul role="listbox" aria-labelledby="listbox-button">
    <li role="option" aria-selected="true">🇺🇸</li>
    <li role="option">🇰🇷</li>
  </ul>
</div>
