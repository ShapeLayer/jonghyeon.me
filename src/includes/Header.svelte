<script lang="ts" context="module">
  import ScrollGuide from '../components/Symbols/ScrollGuide.svelte'
  import smoothscroll from 'smoothscroll-polyfill';
  smoothscroll.polyfill();
</script>

<header>
  <div class="hero">
    <div class="hero__wrapper">
      <h1 class="hero__content pseudo">
        CREATES A WORLD<br>
        BY <span id="hero__trans-target-1" class="highlight">LAYERING</span><br>
        VARIOUS <span id="hero__trans-target-2" class="highlight">SHAPES.</span>
      </h1>
      <h1 id="hero__layer-shape" class="hero__content"><span on:click={ HeaderOnClickHandler } class="hero__content-wrapper no-hover">CREATES A WORLD<br>BY <span id="hero__trans-target-1" class="highlight">LAYERING</span><br>VARIOUS <span id="hero__trans-target-2" class="highlight">SHAPES.</span></span></h1>
      <h1 id="hero__shape-layer" class="hero__content"><span on:click={ HeaderOnClickHandler } class="hero__content-wrapper no-hover">CREATES A WORLD<br>BY <span id="hero__trans-target-1" class="highlight">SHAPING</span><br>VARIOUS <span id="hero__trans-target-2" class="highlight">LAYERS.</span></span></h1>
    </div>
  </div>
  <div class="scroll-guide">
    <ScrollGuide />
  </div>
</header>

<svelte:window
  on:resize={ EventHandler__OnResize }
/>

<style lang="scss">
header {
  display: flex;
  position: relative;
  width: 100%;
  height: 85vh;
  background: var(--base-header-bg-color);
  text-align: center;
  justify-content: center;
  align-items: center;

  div.hero {
    /* Media query needed */
    div.hero__wrapper {
      position: relative;
      
      h1.hero__content {
        position: absolute;
        top: 0;
        line-height: 1.4;
        transition: .3s ease-in-out;

        &.pseudo {
          position: relative;
          opacity: 0;
        }
        &#hero__shape-layer {
          opacity: 0;
        }
        span.hero__content-wrapper {
          color: var(--base-header-fg-color);
          text-decoration: none;
          box-sizing: inherit;
          cursor: pointer;

          span.highlight {
            padding: .05em .2em;
            color: var(--base-header-bg-color);
            background-color: var(--base-header-fg-color);
            border-radius: .1em;
            box-sizing: inherit;
          }
        }
      }
    }
  }
  .scroll-guide {
    position: absolute;
    bottom: 1rem;
    width: 2rem;
  }
}
</style>

<script lang="ts">
  import { onMount } from 'svelte';

  const HeaderOnClickHandler = () => {
    document.querySelector('#profile').scrollIntoView({ behavior: 'smooth' });
  }

  const startHeaderTransition = () => {
    let headerMottoSwitch = 0;
    setInterval(() => {
      headerMottoSwitch = (headerMottoSwitch + 1) % 2;
      document.querySelector('#hero__layer-shape').style.opacity = 1 - headerMottoSwitch;
      document.querySelector('#hero__shape-layer').style.opacity = headerMottoSwitch;
    }, 2500);
  }

  const EventHandler__OnResize = (e: Event) => {
    smoothscroll.polyfill();
  }

  onMount(() => startHeaderTransition());
</script>
