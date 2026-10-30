<script lang="ts">
  import type { ImageAnnotation } from '$lib/components/image-annotations';
  let { src, alt, ratio, annotations = [] }: {
    src: string;
    alt: string;
    ratio: number;
    annotations?: ImageAnnotation[];
  } = $props();
</script>

<div class="portfolio-image-stage" style:--image-ratio={ratio}>
  <img {src} {alt} loading="eager" />
  {#each annotations as annotation (annotation.id)}
    <span class="portfolio-image-translation"
      style:left={`${annotation.x}%`} style:top={`${annotation.y}%`}
      style:width={`${annotation.width}%`} style:height={`${annotation.height}%`}
    >{annotation.text}</span>
  {/each}
</div>

<style>
  .portfolio-image-stage {
    position: relative;
    width: 100%;
    max-width: calc(var(--portfolio-image-height, 90mm) * var(--image-ratio));
    margin: 0 auto;
    container-type: inline-size;
  }
  .portfolio-image-stage > img {
    display: block;
    width: 100% !important;
    height: auto !important;
    max-height: none !important;
  }
  .portfolio-image-translation {
    position: absolute;
    display: block;
    box-sizing: border-box;
    padding: 0 1px;
    background: #fff;
    color: #172033;
    font-family: Arial, sans-serif;
    font-size: 1.1cqw;
    line-height: 1.1;
    overflow: hidden;
    overflow-wrap: anywhere;
  }
</style>
