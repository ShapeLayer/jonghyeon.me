<script lang="ts">
  import { onMount } from 'svelte';
  import { getLocale, setLocale, type Locale } from '$lib/paraglide/runtime';
  import type { ListContent } from '$lib/models/listContent';

  let localeSelectorButton: HTMLButtonElement | undefined;
  let localeSelectorButtonAriaExpanded: boolean = $state(false);
  const localeSelections: {bind: HTMLLIElement | undefined, value: ListContent & {locale: Locale}}[] = $state([
    // { bind: undefined, value: { id: 'locale-selection-global', content: '🌐', role: 'option', ariaSelected: false , locale: 'en'}},
    { bind: undefined, value: { id: 'locale-selection-en', content: '🇺🇸 English', role: 'option', ariaSelected: false, locale: 'en' }},
    { bind: undefined, value: { id: 'locale-selection-ko', content: '🇰🇷 한국어', role: 'option', ariaSelected: false, locale: 'ko' }},
  ]);

  const renderCurrentLocale = () => {
    const locale: Locale = getLocale();
    switch (locale) {
      case 'en':
        return '🌐  English';
      case 'ko':
        return '🌐  한국어';
    }
  }
  
  const onSelectorButtonClick = () => {
    if (!localeSelectorButton) return;
    localeSelectorButtonAriaExpanded = !localeSelectorButtonAriaExpanded;
    if (!localeSelectorButtonAriaExpanded) localeSelections[0].bind?.focus();
  }

  const onSelectorOptionClick = (e: HTMLLIElement | undefined, locale: Locale) => {
    localeSelections.forEach(each => each.bind?.setAttribute('aria-selected', 'false'));
    e?.setAttribute('aria-selected', 'true');

    setLocale(locale);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('user-locale-preference', locale);
    }

    localeSelectorButtonAriaExpanded = false;
  }

  const initSelectorHighLight = () => {
    let currentLocale: Locale = getLocale();
    localeSelections.forEach(each => {
      console.log(each.value.locale, currentLocale, each.value.locale === currentLocale);
      if (each.value.locale === currentLocale) {
        each.value.ariaSelected = true;
      }
    });
  }

  const init = () => {
    initSelectorHighLight();
  }

  let locale = $derived(renderCurrentLocale());

  onMount(init);
</script>

<style>
  .locale-selector {
    position: relative;
    width: 120px;
  }
  .locale-selector button {
    display: grid;
    grid-template-columns: 1fr 20px;
    align-items: center;
    width: 100%;
    padding: 6px 10px;
    font-size: 14px;
    background: #fff;
    border: 1px solid #a3a3a3;
    border-radius: 6px;
    cursor: pointer;
    transition: border-color .15s;
  }
  .locale-selector button:focus-visible,
  .locale-selector button[aria-expanded="true"] {
    border-color: #4f46e5;
    outline: 2px solid #4f46e5;
    outline-offset: -2px;
  }
  .locale-selector button svg {
    width: 16px;
    height: 16px;
    justify-self: end;
    fill: #6b7280;
  }

  .locale-selector ul {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 224px;
    overflow: auto;
    background: #fff;
    border: 1px solid #0000000d;
    border-radius: 6px;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05);
    list-style: none;
    font-size: 14px;
    z-index: 50;
    display: none;  /* hidden by default */
  }
  .locale-selector button[aria-expanded="true"] + ul {
    display:block;  /* show when button is open */
  }

  .locale-selector li {
    padding: 8px 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .locale-selector li:hover,
  .locale-selector li[aria-selected="true"] {
    background: #f3f4f6;
  }
  .locale-selector li[aria-selected="true"] {
    font-weight: 600;
  }
</style>

<div class="locale-selector">
  <button
    id="locale-selector-button"
    type="button"
    aria-haspopup="listbox"
    aria-expanded={localeSelectorButtonAriaExpanded}
    onclick={onSelectorButtonClick}
    bind:this={localeSelectorButton}
  >
    <span>{locale}</span>
    <svg viewBox="0 0 16 16">
      <path fill-rule="evenodd"
            d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
            clip-rule="evenodd"/>
    </svg>
  </button>

  <ul role="listbox" aria-labelledby="listbox-button">
    {#each localeSelections as eachLocale}
    <li
      id={eachLocale.value.id ?? ''}
      role={eachLocale.value.role ?? ''}
      aria-selected={`${eachLocale.value.ariaSelected ?? false}`}
      onclick={() => onSelectorOptionClick(eachLocale.bind, eachLocale.value.locale)}
      bind:this={eachLocale.bind}
    >{eachLocale.value.content}</li>
    {/each}
  </ul>
</div>
