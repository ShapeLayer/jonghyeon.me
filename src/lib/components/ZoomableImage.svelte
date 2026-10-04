<script lang="ts">
  import { onMount } from 'svelte';
  import type {
    ImageAnnotation,
    ZoomableImage as ZoomableImageElement
  } from '@shapelayer/zoomable-image';
  import { m } from '$lib/paraglide/messages';

  interface Props {
    annotations?: ImageAnnotation[];
    src: string;
    alt: string;
    width?: number;
    height?: number;
    displayWidth?: string;
    caption?: string;
  }
  let { src, alt, width, height, displayWidth, caption, annotations = [] }: Props = $props();
  let element: ZoomableImageElement | undefined = $state();
  let registered = $state(false);

  onMount(() => {
    let mounted = true;
    void import('@shapelayer/zoomable-image').then(({ defineZoomableImage }) => {
      if (!mounted) return;
      defineZoomableImage();
      registered = true;
    });
    return () => {
      mounted = false;
    };
  });

  $effect(() => {
    if (!registered || !element) return;
    element.annotations = annotations;
    element.labels = {
      open: m.image_viewer_open(),
      close: m.image_viewer_close(),
      zoomIn: m.image_viewer_zoom_in(),
      zoomOut: m.image_viewer_zoom_out()
    };
  });
</script>

<zoomable-image
  bind:this={element}
  {src}
  {alt}
  {width}
  {height}
  caption={caption ?? ''}
  display-width={displayWidth}
  style:width={displayWidth}
>
  <!-- Visible before hydration and when JavaScript is disabled; hidden by the component's shadow tree. -->
  <img {src} {alt} {width} {height} loading="lazy" />
</zoomable-image>

<style>
  zoomable-image {
    display: block;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
