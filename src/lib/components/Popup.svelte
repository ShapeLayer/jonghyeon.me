<script lang="ts">
  import { type Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
  }
  let { children }: Props = $props();

  let isOpen = $state<boolean>(false);
  let dimElement: HTMLDivElement | null = $state(null);
  let contentWrapperElement: HTMLDivElement | null = $state(null);

  const open = () => {
    if (!dimElement) return;
    isOpen = true;
    dimElement.style.pointerEvents = 'auto';
    dimElement.style.opacity = '1';
    dimElement.style.cursor = 'pointer';

    if (!contentWrapperElement) return;
    contentWrapperElement.style.left = '0';
  }
  const close = () => {
    if (!dimElement) return;
    isOpen = false;
    dimElement.style.opacity = '0';
    dimElement.style.pointerEvents = 'none';
    dimElement.style.cursor = 'default';
    
    if (!contentWrapperElement) return;
    contentWrapperElement.style.left = '-100vw';
  }

  export { open, close };
</script>

<style>
  button {
    cursor: pointer;
  }
  dim {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 11;
    transition: opacity .2s;
    pointer-events: none;
    opacity: 0;
  }
  .popup-content-wrapper {
    position: fixed;
    top: 0;
    left: -100vw;
    max-width: 600px;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    z-index: 12;
    transition: left .5s;
    background-color: white;
  }
  .popup-content {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 3em 2em;
    text-align: left;
    max-width: 600px;
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
  }
  .popup-header {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
  .close-button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    padding: .5em;
    margin: 0;
    border-radius: 4px;
    transition: background-color .2s;
  }
  .close-button:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
</style>

<!-- Defined at root layout
<svelte:head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=close" />
</svelte:head>
-->

<div class="popup">
  <dim bind:this={dimElement} onclick={close}></dim>
  <div bind:this={contentWrapperElement} class="popup-content-wrapper">
    <div class="popup-content">
      <div class="popup-header">
        <button class="close-button" onclick={close}>
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
    {#if children}
      {@render children()}
    {/if}
    </div>
  </div>
</div>
