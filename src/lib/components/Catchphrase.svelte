<script lang="ts">
  import smoothscroll from 'smoothscroll-polyfill';
  import ScrollGuide from '$lib/components/ScrollGuide.svelte';

  let scrollTarget: HTMLElement | null = null;

  const onHeaderClick = () => {
    if (scrollTarget) {
      scrollTarget.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const onResizeHandler = () => {
    smoothscroll.polyfill();
  }
</script>

<style>
  .catchphrase {
    display: flex;
    position: relative;
    width: 100%;
    height: 80vh;
    background: var(--base-hero-bg-color);
    color: var(--base-hero-fg-color);
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
  }

  .catchphrase-vivid {
    height: 1.1em;
    vertical-align: middle;
    display: flex !important;
    align-items: center;
    justify-content: space-between;
  }

  .content {
    padding: 0 1em;
  }
  
  .content h1 {
    text-align: center;
    color: var(--base-hero-fg-color);
    font-family: 'Reenie Beanie', cursive;
    font-size: 3em;
    line-height: 1.5;
    padding: .2em 0;
    overflow: visible;
  }
  @media (max-width: 600px) {
    .content h1 {
      font-size: 2.5em;
    }
  }
  @media (max-width: 400px) {
    .content h1 {
      font-size: 2em;
    }
  }
  .content h1 span {
    display: block;
  }

  .scroll-guide {
    position: absolute;
    bottom: 2em;
    width: 2em;
  }

  span.colorful,
  span.vivid {
    display: inline !important;
  }
  /* colorful */
  .colorful {
    background: linear-gradient(270deg, #ff5f6d, #ffc371, #47cf73, #1fa2ff, #ff5f6d);
    background-size: 1000% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    animation: gradient-move 4s linear infinite;
    display: inline-block !important;
    padding: 0.05em 0;
  }
  @keyframes gradient-move {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
  @font-face {
    font-family: 'SangSangFlowerRoad';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_three@1.0/SangSangFlowerRoad.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'MYYeongnamnu';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/MYYeongnamnu.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  .vivid {
    overflow: hidden;
    animation: vivid-font .75s linear infinite;
    overflow: visible;
  }
  @keyframes vivid-font {
    0%, 100% {
      font-family: 'Sue Ellen Francisco', cursive;
    }
    20% {
      font-family: 'SangSangFlowerRoad', cursive;
    }
    40% {
      font-family: 'Yesteryear', cursive;
    }
    60% {
      font-family: 'MYYeongnamnu', cursive;
    }
    80% {
      font-family: 'Cabin Sketch', cursive;
    }
  }

  .hint-smooth-scroll {
    cursor: pointer;
  }
</style>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Reenie+Beanie&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Sue+Ellen+Francisco&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Yesteryear&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Cabin+Sketch&display=swap" rel="stylesheet">
</svelte:head>

<div class="catchphrase">
  <div class="content">
    <h1 class="hint-smooth-scroll" on:click={onHeaderClick}>
      <span>Shaping <span class="colorful">colorful</span> Layers,</span>
      <span class="catchphrase-vivid">Layering <span class="vivid">vivid</span> Shapes.</span>
    </h1>
  </div>
  <div class="scroll-guide hint-smooth-scroll" on:click={onHeaderClick}>
    <ScrollGuide />
  </div>
</div>

<div id="profile" bind:this={scrollTarget} />
<svelte:window on:resize={onResizeHandler} />
