<script lang="ts">
  import { getLocale } from '$lib/paraglide/runtime';
  import { m } from '$lib/paraglide/messages';
  import { getStackShares, layoutStackTreemap, softenStackColor } from '$lib/models/stacks';

  const stacks = getStackShares();
  const regions = layoutStackTreemap(stacks, 28, 8);
  const tiles = regions.flatMap((region) =>
    Array.from({ length: region.width * region.height }, (_, index) => ({
      stack: region.stack,
      x: region.x + index % region.width,
      y: region.y + Math.floor(index / region.width)
    }))
  );
</script>

<figure class="portfolio-stack-map">
  <div class="heatmap" role="img" aria-label={m.career_tab_stack()}>
    {#each tiles as tile, index (index)}
      <span style:grid-column={tile.x + 1} style:grid-row={tile.y + 1} style:background={softenStackColor(tile.stack.color)}></span>
    {/each}
    {#each regions.filter((region) => region.width >= 3 && region.height >= 2) as region (region.stack.id)}
      <span class="region-label" style:grid-column={`${region.x + 1} / span ${region.width}`} style:grid-row={`${region.y + 1} / span ${region.height}`}><span>{region.stack.name}</span></span>
    {/each}
  </div>
  <ul class="legend" aria-label={m.career_tab_stack()}>
    {#each stacks as stack (stack.id)}
      <li><span class="swatch" style:background={softenStackColor(stack.color)}></span>{stack.name}</li>
    {/each}
  </ul>
  <figcaption>
    {m.portfolio_stack_caption_before()}<a href={`https://jonghyeon.me/?opened=stack&locale=${getLocale()}`}>jonghyeon.me</a>{m.portfolio_stack_caption_after()}
  </figcaption>
</figure>

<style>
  .portfolio-stack-map { margin: 5mm 0 7mm; break-inside: avoid; }
  .heatmap {
    display: grid;
    grid-template-columns: repeat(28, minmax(0, 1fr));
    grid-template-rows: repeat(8, minmax(0, 1fr));
    height: 42mm;
    gap: 1px;
  }
  .region-label {
    display: block;
    padding: 2px;
    overflow: hidden;
    text-align: left;
    font-size: 8pt;
    line-height: 0;
    box-sizing: border-box;
    pointer-events: none;
    z-index: 1;
  }
  .region-label span {
    display: inline-block;
    vertical-align: top;
    max-width: 100%;
    box-sizing: border-box;
    line-height: 1.2;
    padding: 2px;
    border-radius: 2px;
    background: #fffffff0;
    color: var(--base-fg-color);
    overflow-wrap: anywhere;
  }
  .legend { display: flex; flex-wrap: wrap; gap: 1mm 3mm; margin: 2mm 0; padding: 0; }
  .legend li { display: inline-flex; align-items: center; gap: 1mm; font-size: 6.5pt; margin: 0; }
  .swatch { width: 1.8mm; height: 1.8mm; }
  figcaption { font-size: 7pt; color: var(--base-fg-color-brighter); }
</style>
