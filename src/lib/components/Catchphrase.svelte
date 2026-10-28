<script lang="ts">
  import { onMount } from 'svelte';
  import { createLayerField } from '$lib/graphics/layerField';
  let canvas: HTMLCanvasElement;
  let colorful: HTMLElement;
  let paused = $state(false);
  let phase = $state('LAYERS');
  const inkFilterId = $props.id();
  let inkFrame = $state(2);
  let controller: ReturnType<typeof createLayerField> | undefined;
  onMount(() => {
    controller = createLayerField(canvas, (value) => {
      phase = value;
    });
    const frames = [2, 7, 13, 5];
    let index = 0;
    const inkTimer = window.setInterval(() => {
      if (paused || document.hidden) return;
      inkFrame = frames[++index % frames.length];
    }, 150);
    // Each region follows its own randomly timed target, with smooth turns.
    const ranges = [
      [12, 88],
      [12, 88],
      [-180, 180],
      [0.65, 1.65],
      [0.6, 1.35],
      ...Array.from({ length: 6 }, () => [12, 100])
    ];
    const channels = ranges.map(([min, max]) => ({
      min,
      max,
      from: (min + max) / 2,
      to: min + Math.random() * (max - min),
      progress: 0,
      duration: 1.5 + Math.random() * 3.5
    }));
    const colors = ['#ff998b', '#ffd48a', '#b7dfb4', '#88cee0', '#a99af1', '#eea5d5'];
    let flowFrame = 0,
      previous = 0;
    function flow(now: number) {
      const dt = previous ? Math.min((now - previous) / 1000, 0.06) : 0;
      previous = now;
      if (!paused && !document.hidden) {
        const values = channels.map((channel) => {
          channel.progress += dt / (channel.duration * 3);
          if (channel.progress >= 1) {
            channel.from = channel.to;
            channel.to = channel.min + Math.random() * (channel.max - channel.min);
            channel.progress = 0;
            channel.duration = 1.5 + Math.random() * 3.5;
          }
          const t = channel.progress;
          return channel.from + (channel.to - channel.from) * t * t * (3 - 2 * t);
        });
        const weights = values.slice(5),
          total = weights.reduce((a, b) => a + b, 0);
        let edge = 0;
        const stops = colors.map((color, i) => {
          const start = edge;
          edge += (weights[i] / total) * 360;
          return `${color} ${start.toFixed(2)}deg ${edge.toFixed(2)}deg`;
        });
        colorful.style.backgroundImage = `repeating-conic-gradient(from ${values[2]}deg at ${values[0]}% ${values[1]}%, ${stops.join(',')})`;
        colorful.style.backgroundSize = `${values[3]}em ${values[4]}em`;
      }
      flowFrame = requestAnimationFrame(flow);
    }
    flowFrame = requestAnimationFrame(flow);
    return () => {
      window.clearInterval(inkTimer);
      cancelAnimationFrame(flowFrame);
      controller?.destroy();
    };
  });
  function toggleMotion() {
    paused = !paused;
    controller?.setPaused(paused);
  }
</script>

<section class="catchphrase" class:motion-paused={paused} aria-labelledby="hero-title">
  <svg class="ink-filter" aria-hidden="true" width="0" height="0">
    <defs>
      <filter
        id={inkFilterId}
        x="-15%"
        y="-25%"
        width="130%"
        height="150%"
        color-interpolation-filters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.045 0.09"
          numOctaves="2"
          seed={inkFrame}
          result="ink"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="ink"
          scale="5.5"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
  <div class="composition">
    <div class="content">
      <!--<p class="eyebrow">A CONTINUOUS STUDY OF SHAPE</p>-->
      <h1 id="hero-title">
        Shaping <em class="colorful" bind:this={colorful}>colorful</em> Layers,<br />Layering
        <em class="vivid" style:filter={`url(#${inkFilterId})`}>vivid</em> Shapes.
      </h1>
      <!--<p class="notation">From a point, to a layer.<br />From layers, to possibilities.</p>-->
    </div>
    <div class="field">
      <canvas bind:this={canvas}></canvas>
    </div>
  </div>
  <!--<div class="baseline">
    <a href="#profile">EXPLORE <span aria-hidden="true">↓</span></a>
    <button type="button" onclick={toggleMotion} aria-pressed={paused}
      >{paused ? 'RESUME MOTION' : 'PAUSE MOTION'}</button
    >
  </div>-->
</section>
<div id="profile"></div>

<style>
  .catchphrase {
    max-width: none;
    container-type: inline-size;
    position: relative;
    overflow: hidden;
    background: #191815;
    color: #f8f8f7;
    min-height: min(850px, 94svh);
    padding: 30px clamp(24px, 5vw, 88px);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
  .masthead,
  .baseline,
  .eyebrow,
  .notation,
  .field-caption {
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    font-weight: 400;
  }
  .masthead,
  .baseline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    font-size: 10px;
    letter-spacing: 1.4px;
  }
  .masthead {
    color: #c5bfb3;
  }
  .masthead span:first-child {
    letter-spacing: 3px;
    color: #f8f8f7;
  }
  .composition {
    flex: 1;
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) minmax(0, 1fr);
    align-items: center;
    gap: 16px;
    min-height: 520px;
  }
  .content {
    position: relative;
    z-index: 1;
    padding: 40px 0;
  }
  .eyebrow {
    font-size: 9px;
    letter-spacing: 1.6px;
    color: #b3aa9a;
    margin: 0 0 30px;
  }
  h1 {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(23px, 4.1cqw, 55px);
    line-height: 1.4;
    font-weight: 400;
    letter-spacing: -1.5px;
    margin: 0;
    white-space: nowrap;
  }
  em {
    font-weight: 400;
    color: #e5c18e;
  }
  .colorful {
    color: #efbbcf;
    background-image: repeating-conic-gradient(
      from 24deg at 46% 54%,
      #ff998b 0deg 52deg,
      #ffd48a 52deg 105deg,
      #b7dfb4 105deg 163deg,
      #88cee0 163deg 222deg,
      #a99af1 222deg 283deg,
      #eea5d5 283deg 360deg
    );
    background-size: 0.83em 0.72em;
    background-position: 15% 40%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    box-decoration-break: clone;
  }
  .vivid {
    display: inline-block;
    white-space: nowrap;
  }
  .ink-filter {
    position: absolute;
    pointer-events: none;
  }
  .notation {
    font-size: 10px;
    line-height: 1.9;
    color: #b9b0a0;
    margin: 32px 0 0;
  }
  .field {
    position: relative;
    min-width: 0;
    margin-left: calc(-1 * clamp(32px, 6vw, 96px));
    margin-right: -24px;
  }
  .field canvas {
    width: 100%;
    height: 480px;
    display: block;
  }
  .field-caption {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    font-size: 9px;
    letter-spacing: 1px;
    color: #b9b0a0;
    padding: 0 12px;
  }
  .baseline {
    padding-top: 18px;
    border-top: 1px solid #3b372f;
    color: #c5bfb3;
  }
  .baseline a {
    color: inherit;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 24px;
    min-height: 44px;
  }
  button {
    font: inherit;
    color: inherit;
    background: transparent;
    border: 0;
    min-height: 44px;
    padding: 0;
    cursor: pointer;
    letter-spacing: 1px;
  }
  button:hover,
  a:hover {
    color: #fff;
  }
  button:focus-visible,
  a:focus-visible {
    outline: 1px solid #e5c18e;
    outline-offset: 6px;
  }
  #profile {
    scroll-margin-top: 24px;
  }
  @media (min-width: 1600px) {
    .composition {
      max-width: 1500px;
      width: 100%;
      margin: auto;
    }
  }
  @media (max-width: 760px) {
    .catchphrase {
      min-height: 0;
      padding: 24px;
    }
    .masthead {
      font-size: 9px;
    }
    .masthead span:last-child {
      letter-spacing: 0;
      font-size: 8px;
    }
    .composition {
      grid-template-columns: 1fr;
      gap: 0;
      min-height: 0;
    }
    .content {
      padding: 60px 0 12px;
    }
    h1 {
      font-size: clamp(25px, 5.3vw, 40px);
      letter-spacing: -0.7px;
    }
    .eyebrow {
      margin-bottom: 22px;
      font-size: 8px;
    }
    .notation {
      margin-top: 22px;
    }
    .field {
      margin-inline: 0;
    }
    .field canvas {
      height: 360px;
    }
    .field-caption {
      margin-bottom: 28px;
      padding: 0;
      font-size: 8px;
    }
    .baseline {
      font-size: 9px;
    }
  }
</style>
