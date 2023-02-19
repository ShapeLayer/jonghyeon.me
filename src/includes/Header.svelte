<header>
  <div class="hero">
    <div class="hero__wrapper">
      <h1 class="hero__content pseudo">
        CREATES A WORLD<br>
        BY <span id="hero__trans-target-1" class="highlight">LAYERING</span><br>
        VARIOUS <span id="hero__trans-target-2" class="highlight">SHAPES.</span>
      </h1>
      <h1 id="hero__layer-shape" class="hero__content"><a class="no-hover" href="#profile">CREATES A WORLD<br>BY <span id="hero__trans-target-1" class="highlight">LAYERING</span><br>VARIOUS <span id="hero__trans-target-2" class="highlight">SHAPES.</span></a></h1>
      <h1 id="hero__shape-layer" class="hero__content"><a class="no-hover"  href="#profile">CREATES A WORLD<br>BY <span id="hero__trans-target-1" class="highlight">SHAPING</span><br>VARIOUS <span id="hero__trans-target-2" class="highlight">LAYERS.</span></a></h1>
    </div>
  </div>
</header>

<style lang="scss">
header {
  display: flex;
  position: relative;
  width: 100%;
  height: 90vh;
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
        a {
          color: var(--base-header-fg-color);
          text-decoration: none;
          box-sizing: inherit;

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
}
</style>

<script lang="ts">
  import { onMount } from 'svelte';

  function startHeaderTransition() {
    let headerMottoSwitch = 0;
    setInterval(() => {
      headerMottoSwitch = (headerMottoSwitch + 1) % 2;
      document.querySelector('#hero__layer-shape').style.opacity = 1 - headerMottoSwitch;
      document.querySelector('#hero__shape-layer').style.opacity = headerMottoSwitch;
    }, 2500);
  }

  onMount(() => startHeaderTransition())
</script>